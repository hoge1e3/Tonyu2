if (typeof importScripts!=="undefined") {
    // Worker Side
    define(["promise"], function (_) {
        var idseq=1;
        var paths={},queue={};
        WorkerLib={
            install: function (path, func) {
                paths[path]=func;
            },
            ready: function () {
                WorkerLib.isReady=true;
                self.postMessage({ready:true});
            },
            reverse: function (path, params) {
                var id=idseq++;
                return new Promise(function (succ,err) {
                    queue[id]=function (e) {
                        if (e.status=="ok") {
                            succ(e.result);
                        } else {
                            err(e.error);
                        }
                    };
                    self.postMessage({
                        reverse: true,
                        id: id,
                        path: path,
                        params: params
                    });

                });
            }
        };
        self.addEventListener("message", function (e) {
            var d=e.data;
            var id=d.id;
            var context={id:id};
            if (d.reverse) {
                queue[d.id](d);
                delete queue[d.id];
                return;
            }
            try {
                Promise.resolve( paths[d.path](d.params,context) ).then(function (r) {
                    self.postMessage({
                        id:id, result:r, status:"ok"
                    });
                },sendError);
            } catch (e) {
                sendError(e);
            }
            function sendError(e) {
                self.postMessage({
                    id:id, error:e, status:"error"
                });
            }
        });
        WorkerLib.install("WorkerLib/isReady",function (){
            return WorkerLib.isReady;
        });
        return WorkerLib;
    });
} else {
    // Browser Side
    var idseq=0;
    define(["DeferredUtil","Klass"], function (DU,Klass) {
        var Wrapper=Klass.define({
            $this:"t",
            $: function (t,worker) {
                t.idseq=1;
                t.queue={};
                t.worker=worker;
                t.readyQueue=[];
                worker.addEventListener("message",function (e) {
                    var d=e.data;
                    if (d.reverse) {
                        t.procReverse(e);
                    } else if (d.ready) {
                        t.ready();
                    } else if (d.id) {
                        t.queue[d.id](d);
                        delete t.queue[d.id];
                    }
                });
                t.run("WorkerLib/isReady", function (r) {
                    if (r) t.ready();
                });
            },
            procReverse: function (t,e) {
                var d=e.data;
                var id=d.id;
                var path=d.path;
                var params=d.params;
                try {
                    DU.promise(paths[path](params)).then(function (r) {
                        t.worker.postMessage({
                            reverse:true,
                            status:"ok",
                            id:id,
                            result: r
                        });
                    },sendError);
                } catch(err) {
                    sendError(err);
                }
                function sendError(e) {
                    self.postMessage({
                        reverse: true,
                        id:id, error:e, status:"error"
                    });
                }
            },
            ready: function (t) {
                if (t.isReady) return;
                t.isReady=true;
                console.log("Worker is ready!");
                t.readyQueue.forEach(function (f){ f();});
            },
            readyPromise: function (t) {
                return DU.promise(function (succ) {
                    if (t.isReady) return succ();
                    t.readyQueue.push(succ);
                });
            },
            run: function (t, path, params) {
                return t.readyPromise().then(function() {
                    return DU.promise(function (succ,err) {
                        var id=t.idseq++;
                        t.queue[id]=function (e) {
                            //console.log("Status",e);
                            if (e.status=="ok") {
                                succ(e.result);
                            } else {
                                err(e.error);
                            }
                        };
                        t.worker.postMessage({
                            id: id,
                            path: path,
                            params: params
                        });
                    });
                });
            }
        });
        var paths={};
        WorkerLib={
            Wrapper:Wrapper,
            load: function (src) {
                var w=new Worker(src);
                return new Wrapper(w);
            },
            install: function (path, func) {
                paths[path]=func;
            }
        };
        return WorkerLib;
    });
}
