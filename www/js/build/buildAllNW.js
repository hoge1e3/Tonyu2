define(["genROM","dumpScript","Util","FS","Sync","Shell","WebSite"],
        function (genROM,dumpScript,Util,FS,Sync,sh,WebSite) {
    sh.build=doBuild;
    sh.build.description="Build files before commit.";
    function doBuild() {
        sh.devtool();
        var home=FS.get(WebSite.tonyuHome);
        genROM(home.rel("Kernel/"),     home.rel("js/gen/ROM_k.js"));
        genROM(home.rel("doc/"),        home.rel("js/gen/ROM_d.js"));
        genROM(home.rel("SampleROM/"),  home.rel("js/gen/ROM_s.js"));
        var ds=require("dumpScript");
        var reqConf=ds.genShim();
        window.generatedShim=reqConf;
        ds.concat({names:["fs/ROMk","fs/ROMd","fs/ROMs","ide/selProject"], outFile:"index",reqConf:reqConf});
        ds.concat({names: ["fs/ROMk","fs/ROMd","fs/ROMs","ide/editor"], outFile:"project",reqConf:reqConf});
        ds.concat({names: ["fs/ROMk","runScript"], outFile:"runScript",reqConf:reqConf});
    }
});
