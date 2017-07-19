define(["FS2","WebSite","NativeFS","LSFS", "PathUtil","Env","assert","SFile","RootFS"],
        function (FS,WebSite,NativeFS,LSFS, P,Env,A,SFile,RootFS) {
    var FS={};
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env(WebSite);
    if (WebSite.isNW) {
        rootFS=new RootFS(new NativeFS());
    } else {
        rootFS=new RootFS(new LSFS(localStorage));
    }
    FS.isFile=function (f) {
        return SFile.is(f);
    };
    FS.PathUtil=P;
    FS.getRootFS=function () {return rootFS;};
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
    FS.mount=function () {
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        return rootFS.unmount.apply(rootFS,arguments);
    };
    return FS;
});
