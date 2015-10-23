requirejs(["Shell","FS","WebSite"], function (sh,FS,WebSite) {
    sh.copyToKernel=function (name) {
        var home=FS.get(WebSite.tonyuHome);
        var ker=home.rel("Kernel/");
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