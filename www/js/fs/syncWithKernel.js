requirejs(["Shell","FS","WebSite"], function (sh,FS,WebSite) {
    sh.syncWithKernel=function (name) {
        var home=FS.get(WebSite.tonyuHome);
        var ker=home.rel("Kernel/");
        if (name) {
            var prj=sh.resolve(name);
            var inKer=ker.rel(name);
            if (prj.lastUpdate()>inKer.lastUpdate()) {
                sh.cp(prj, inKer,{v:1});
                return 1;
            }
            if (prj.lastUpdate()<inKer.lastUpdate()) {
                sh.cp(inKer,prj,{v:1});
                return 1;
            }
            return 0;
            //return sh.cp( name, ker.rel(name));
        } else {
            var cps=0;
            ker.each(function (f) {
                var src=sh.resolve(f.name());
                if (src.exists()) {
                    cps+= sh.syncWithKernel(f.name());
                }
            });
            return cps;
        }
    };
});