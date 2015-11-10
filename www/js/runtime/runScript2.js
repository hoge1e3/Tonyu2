requirejs(["FS","compiledTonyuProject","Shell","runtime","WebSite","LSFS","Tonyu","NativeFS"],
        function (FS,  CPTR, sh,  rt,WebSite,LSFS,Tonyu) {
    $(function () {

        SplashScreen={hide: function () {
            $("#splash").hide();
        },show:function(){}};

        var w=$(window).width();
        var h=$(window).height();
        $("body").css({overflow:"hidden", margin:"0px"});
        var cv=$("<canvas>").attr({width: w-10, height:h-10}).appendTo("body");
        $(window).resize(onResize);
        function onResize() {
            w=$(window).width();
            h=$(window).height();
            cv.attr({width: w-10, height: h-10});
        }

        var curProjectDir;
        if (WebSite.isNW) {
            var home=location.href.replace(/^file:\/\//,"");
            if (home.match(/^\/[a-z]:/i)) {
                home=home.replace(/^\//,"");
            }
            home=FS.get(home);
            if (!home.isDir()) home=home.up();
            curProjectDir=home.rel("data/");
        } else {
            var locs=location.href.replace(/\?.*/,"").split(/\//);
            var prj=locs.pop() || "runscript";
            var user=locs.pop() || "nobody";
            var home=FS.get(WebSite.tonyuHome);
            var ramHome=FS.get("/ram/");
            FS.mount(ramHome.path(), LSFS.ramDisk() );
            curProjectDir=ramHome;
            var actualFilesDir=home.rel(user+"/"+prj+"/");
            ramHome.rel("files/").link(actualFilesDir);
        }

        /*var fo=ScriptTagFS.toObj();
        for (var fn in fo) {
            var f=curProjectDir.rel(fn);
            if (!f.isDir()) {
                var m=fo[fn];
                f.text(m.text);
                delete m.text;
                if (m.lastUpdate) f.metaInfo(m);
            }
        }*/
        loadFiles(curProjectDir);
        sh.cd(curProjectDir);
        WebSite.compiledKernel="js/kernel.js";
        var curPrj=CPTR("user", "js/concat.js",curProjectDir);
        start();
        function start() {
            Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
            var o=curPrj.getOptions();
            curPrj.runScriptMode=true;
            curPrj.run(o.run.bootClass);
        }
    });
});
