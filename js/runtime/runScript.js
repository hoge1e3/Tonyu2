define(["fs/ROMk","FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS","runtime"],
 function (romk,   FS,  Tonyu_Project, sh,      KeyEventChecker, ScriptTagFS,   rt) {
    $(function () {
        Tonyu.defaultResource={
                images:[
                        {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
                        {name:"$pat_sample", url: "images/Sample.png"},
                        {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
                ],
                sounds:[]
        };
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
        //var scrs=$("script");
        /*scrs.each(function (){
            var s=this;
            //console.log(s.type, s.dataset.filename);
            if (s.type=="text/tonyu") {
                var fn=$(s).data("filename");
                if (fn) {
                    var f=curProjectDir.rel(fn);
                    //console.log(f);
                    var w=$(s).data("wrap");
                    if (w) {
                        w=parseInt(w);
                        f.text(unwrap(s.innerHTML, w));
                    } else {
                        f.text(s.innerHTML);
                    }
                    if ($(s).data("main")) {
                        name=f.truncExt(".tonyu");
                    }
                }
            }
        });
        function unwrap(str, cols) {
            var lines=str.split("\n");
            var buf="";
            lines.forEach(function (line) {
                if (line.length>cols) {
                    buf+=line.substring(0,cols);
                } else {
                    buf+=line+"\n";
                }
            });
            return buf;
        }*/
        var curProjectDir=FS.get("/Tonyu/runscript/");
        if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
        var fo=ScriptTagFS.toObj();
        for (var fn in fo) {
        	var f=curProjectDir.rel(fn);
           	f.text(fo[fn]);
        }
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
        var kernelDir=FS.get("/Tonyu/Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        var o=curPrj.getOptions();
        curPrj.rawRun(o.run.bootClass);
    });
});
