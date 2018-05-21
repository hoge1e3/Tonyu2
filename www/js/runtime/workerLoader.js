// runs on browser
define(["WorkerLib"],function (WL) {
    return workerLoader={load:function (){
        return WL.load("js/worker/workerRuntime.js");
    }};
});
