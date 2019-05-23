// Worker Side
define(["promise","root"], function (_,root) {
    var idseq=1;
    var paths={},queue={},self=root;
    root.WorkerService={
        install: function (path, func) {
            paths[path]=func;
        },
        serv: function (path,func) {
            this.install(path,func);
        },
        ready: function () {
            root.WorkerService.isReady=true;
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
        } catch (ex) {
            sendError(ex);
        }
        function sendError(e) {
            self.postMessage({
                id:id, error:e?(e.stack||e+""):"unknown", status:"error"
            });
        }
    });
    root.WorkerService.install("WorkerService/isReady",function (){
        return root.WorkerService.isReady;
    });
    if (!root.console) {
        root.console={
            log: function () {
                root.WorkerService.reverse("console/log",Array.prototype.slice.call(arguments));
            }
        };
    }
    return root.WorkerService;
});
