// Run as worker
var base="..";
importScripts(base+"/lib/require.js",base+"/reqConf.js");
reqConf.baseUrl=base;
requirejs.config(reqConf);
requirejs(["WorkerLib","GIFWorker"],function (WL,G) {
    WL.install("test", function (params) {
        var c=params.cnt||0;
        for(var i=0;i<c;i++);
        return "toste "+c;
    });
    WL.ready();
});
