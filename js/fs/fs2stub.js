define(["FS2","WebSite","NativeFS","LSFS", "PathUtil","Env","assert","SFile"],
        function (FS,WebSite,NativeFS,LSFS, P,Env,A,SFile) {
    var FS={};
    var rootFS;
    var env=new Env(WebSite);
    if (WebSite.isNW) {
        var nfsp=process.env.TONYU_FS_HOME || P.rel(process.cwd().replace(/\\/g,"/"), "www/fs/");
        console.log("nfsp",nfsp);
        rootFS=new NativeFS(nfsp);
    } else {
        rootFS=new LSFS(localStorage);
    }
    FS.get=function () {
        return rootFS.get.apply(rootFS,arguments);
    };
    FS.expandPath=function () {
        return env.expandPath.apply(env,arguments);
    };
    FS.resolve=function (path, base) {
        if (SFile.is(path)) return path;
        path=env.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expandPath(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };
    return FS;
});