// Browser Side
var idseq=0;
define(["promise","Klass","root"], function (_,Klass,root) {
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
            t.run("WorkerService/isReady").then(function (r) {
                if (r) t.ready();
            });
        },
        procReverse: function (t,e) {
            var d=e.data;
            var id=d.id;
            var path=d.path;
            var params=d.params;
            try {
                Promise.resolve(paths[path](params)).then(function (r) {
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
                t.worker.postMessage({
                    reverse: true,
                    id:id, error:e?(e.stack||e+""):"unknown", status:"error"
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
            return new Promise(function (succ) {
                if (t.isReady) return succ();
                t.readyQueue.push(succ);
            });
        },
        run: function (t, path, params) {
            return t.readyPromise().then(function() {
                return new Promise(function (succ,err) {
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
    root.WorkerService={
        Wrapper:Wrapper,
        load: function (src) {
            var w=new Worker(src);
            return new Wrapper(w);
        },
        install: function (path, func) {
            paths[path]=func;
        },
        serv: function (path,func) {
            this.install(path,func);
        }
    };
    root.WorkerService.serv("console/log", function (params){
        console.log.apply(console,params);
    });
    return root.WorkerService;
});
