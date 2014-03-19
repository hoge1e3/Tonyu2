requirejs(["Shell","FS"], function (sh,FS) {
    sh.copyToKernel=function (name) {
        var ker=FS.get("/Tonyu/Kernel/");
        if (name) {
            return sh.cp( name, ker.rel(name));
        } else {
            var cps=0;
            ker.each(function (f) {
                var src=sh.cwd.rel(f.name());
                if (src.exists()) {
                    cps+=sh.cp(src, ker);
                }
            });
            return cps;
        }
    };
});