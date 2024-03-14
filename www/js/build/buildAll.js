define(["genROM","Util","FS","Shell","WebSite"],
        function (genROM,Util,FS,sh,WebSite) {
    var build=Util.getQueryString("build",0);
    if (build) {
        $(doBuild);
    }
    sh.build=WebSite.isNW?doBuildNW:function(){throw"NOT support";};
    sh.build.description="Build files before commit.";
    function doBuildNW(options) {
        options=options||{};
        if (!options.d) {
            var home=FS.get(WebSite.tonyuHome);
            var genHome=FS.get(FS.expandPath("${cwd}/www/"));
            embedVersion(genHome.rel("js/runtime/TonyuLib.js"));
            //genROM(home.rel("Kernel/"),     genHome.rel("js/gen/ROM_k.js"));
            //genROM(home.rel("doc/"),        genHome.rel("js/gen/ROM_d.js"));
            //genROM(home.rel("SampleROM/"),  genHome.rel("js/gen/ROM_s.js"));
            var ds=require("dumpScript");
            var reqConf=ds.genShim();
            window.generatedShim=reqConf;
            ds.concat({names:["selProject"], outFile:"index",reqConf:reqConf});
            ds.concat({names:["editor"], outFile:"project",reqConf:reqConf});
            ds.concat({names:["runScript"], outFile:"runScript",reqConf:reqConf});
            ds.concat({names:["runScript2"], outFile:"runScript2",reqConf:reqConf});
            ds.concat({names:["runScript3"], outFile:"runScript3",reqConf:reqConf});
        }
        sh.echo("To compile documents, type:");
        sh.echo("wiki2serv ../fs/Tonyu/doc/ ../www/doc/");
    }
    function embedVersion(f) {
        var r=f.text().replace(/(VERSION:)([0-9]+)(,\/\/EMBED_VERSION)/, function (t,a,b,c) {
            return a+new Date().getTime()+c;
        });
        f.text(r);
    }
});
