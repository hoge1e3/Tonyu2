// Run as worker
var base="..";
importScripts(base+"/lib/require.js",base+"/reqConf.js");
reqConf.baseUrl=base;
requirejs.config(reqConf);
requirejs(["WorkerLib","GIFWorker"],function (WL,G) {
    WL.install("test", function () {
        return "toste";
    });
    WL.ready();
});
