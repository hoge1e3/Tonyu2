requirejs(["FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS","runtime","WebSite","SoundDiag"],
        function (FS,  Tonyu_Project, sh,      KeyEventChecker, ScriptTagFS,   rt,WebSite) {
    $(function () {
        var home=FS.get(WebSite.tonyuHome);
        Tonyu.defaultResource={
                images:[
                        {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
                        {name:"$pat_sample", url: "images/Sample.png"},
                        {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
                        ],
                        sounds:[]
        };
        SplashScreen={hide: function () {
            $("#splash").hide();
        },show:function(){}};
        var w=$(window).width();
        var h=$(window).height();
        $("body").css({overflow:"hidden", margin:"0px"});
        var cv=$("<canvas>").attr({width: w, height:h}).appendTo("body");
        $(window).resize(onResize);
        function onResize() {
            w=$(window).width();
            h=$(window).height();
            cv.attr({width: w, height: h});
        }
        var locs=location.href.replace(/\?.*/,"").split(/\//);
        var loc=locs.pop();
        if (loc.length<0) locs="runscript";
        var curProjectDir=home.rel(loc+"/");
        //if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
        var fo=ScriptTagFS.toObj();
        for (var fn in fo) {
            var f=curProjectDir.rel(fn);
            if (!f.isDir()) {
                var m=fo[fn];
                if (fn=="js/concat.js") {
                    if (f.exists() && f.lastUpdate()>m.lastUpdate) {
                        continue;
                    }
                } else {
                    f.useRAMDisk();
                }
                f.text(m.text);
                delete m.text;
                if (m.lastUpdate) f.metaInfo(m);
            }
        }
        sh.cd(curProjectDir);
        var main="Main";
        var scrs=$("script");
        scrs.each(function (){
            var s=this;
            if (s.type=="text/tonyu") {
                var fn=$(s).data("filename");
                if (fn) {
                    var f=curProjectDir.rel(fn);
                    if ($(s).data("main")) {
                        main=f.truncExt(".tonyu");
                    }
                }
            }
        });
        Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                run: {mainClass: main, bootClass: "Boot"},
                kernelEditable: false
        };
        var kernelDir=home.rel("Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        /*cv[0].addEventListener('touchstart', mediaIni);
        window.addEventListener('touchstart', mediaIni);
        function mediaIni() {
            T2MediaLib.init();
            T2MediaLib.activate();
            cv[0].removeEventListener('touchstart', mediaIni);
            window.removeEventListener('touchstart',mediaIni);
        }*/
        /*if (curPrj.hasSoundResource()) {
            SoundDiag.show(start);
        } else {*/
            start();
        //}
        function start() {
            Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
            var o=curPrj.getOptions();
            if (o.compiler && o.compiler.diagnose) {
                o.compiler.diagnose=false;
                curPrj.setOptions(o);
            }
            curPrj.runScriptMode=true;
            curPrj.rawRun(o.run.bootClass);
        }
    });
});
