define(["FS"],function (FS) {
    var Shell={};
    Shell.cp=function (from ,to ,options) {
        var f=FS.get(from);
        var t=FS.get(to);
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