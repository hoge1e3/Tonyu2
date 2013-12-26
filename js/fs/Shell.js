define(["FS","Util"],function (FS,Util) {
    var Shell={cwd:FS.get("/")};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir);
        return Shell.pwd();
    };
    function resolve(v) {
        if (typeof v!="string") return v;
        if (Util.startsWith(v,"/")) return FS.get(v);
        var c=Shell.cwd;
        while (Util.startsWith(v,"../")) {
            c=c.up();
            v=v.substring(3);
        }
        return c.rel(v);
    }
    Shell.pwd=function () {
        return Shell.cwd.path();
    };
    Shell.ls=function (){
        return Shell.cwd.ls();
    };
    Shell.cp=function (from ,to ,options) {
        var f=resolve(from);
        var t=resolve(to);
        if (!options) options={};
        if (!f.exists()) throw f+": No such file or dir.";
        if (f.isDir() && t.isDir()) {
            f.recursive(function (src) {
                var rel=src.relPath(f);
                var dst=t.rel(rel);
                if (options.test || options.v) {
                    console.log((dst.exists()?"[ovr]":"[new]")+dst+"<-"+src);
                }
                if (!options.test) {
                    dst.copyFrom(src);
                }
            });
        } else {
            throw "notimpl";
        }
    };
    sh=Shell;
    return Shell;
});