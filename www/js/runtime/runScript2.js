requirejs(["FS","compiledTonyuProject","Shell","ScriptTagFS","runtime","WebSite"],
        function (FS,  CPTR, sh, ScriptTagFS,   rt,WebSite) {
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

        var locs=location.href.replace(/\?.*/,"").split(/\//);
        var prj=locs.pop() || "runscript";
        var user=locs.pop() || "nobody";
        var home=FS.get(WebSite.tonyuHome);
        var ramHome=FS.get("/ram/");
        FS.mount(ramHome.path(), LSFS.ramDisk() );
        var curProjectDir=ramHome;
        var actualFilesDir=home.rel(user+"/"+prj+"/");
        ramHome.rel("files/").link(actualFilesDir);
        var fo=ScriptTagFS.toObj();
        for (var fn in fo) {
            var f=curProjectDir.rel(fn);
            if (!f.isDir()) {
                var m=fo[fn];
                f.text(m.text);
                delete m.text;
                if (m.lastUpdate) f.metaInfo(m);
            }
        }
        sh.cd(curProjectDir);
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
