define(["FS2","WebSite","NativeFS"], function (FS,WebSite,NativeFS) {
    var FS={};
    if (WebSite.isNW) {
        var nfsp=P.rel(process.cwd().replace(/\\/g,"/"), "fs/");
        var rootFS=new NativeFS(nfsp);
        FS.get=rootFS.get;
    } else {
        throw "Not support yet.";
    }
    return FS;
});