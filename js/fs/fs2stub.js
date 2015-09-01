define(["FS2","WebSite","NativeFS","LSFS", "PathUtil","Env","assert","SFile"],
        function (FS,WebSite,NativeFS,LSFS, P,Env,A,SFile) {
    var FS={};
    var rootFS;
    var env=new Env(WebSite);
    if (WebSite.isNW) {
        var nfsp=P.rel(process.cwd().replace(/\\/g,"/"), "fs/");
        rootFS=new NativeFS(nfsp);
    } else {
        rootFS=new LSFS(localStorage);
    }
    FS.get=function () {
        return rootFS.get.apply(rootFS,arguments);
    };
    FS.resolve=function (path, base) {
        if (SFile.is(path)) return path;
        path=FS.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expand(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };
    FS.expandPath=function (path) {
        A.is(path,String);
        path=env.expand(path);
        path=path.replace(/\/+/g,"/");
        return A.is(path,P.Path);
    };
    return FS;
});