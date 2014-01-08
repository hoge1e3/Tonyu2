define(["fs/ROMk","FS","Tonyu.Project","Shell","Sprites","ImageList"],
        function (romk,FS,Tonyu_Project, sh, Sprites, ImageList) {
    $(function () {
        Tonyu.defaultResource={
                images:[
                        {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
                        //{url: "http://jsrun.it/assets/6/F/y/3/6Fy3B.png", pwidth:32, pheight:32},
                        {name:"$pat_sample", url: "images/Sample.png"},
                        {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
                        //{url: "http://jsrun.it/assets/j/D/9/q/jD9qQ.png", pwidth:32, pheight:32}
                ],
                sounds:[]
        };

        var w=$(window).width()-20;
        var h=$(window).height()-20;
        $("<canvas>").attr({width: w, height:h}).appendTo("body");
        var scrs=$("script");
        var curProjectDir=FS.get("/Tonyu/runscript/");
        if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
        var name="Main";
        scrs.each(function (){
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
        var kernelDir=FS.get("/Tonyu/Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        curPrj.env.options.compiler.defaultSuperClass="Actor";
        curPrj.run(name);
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
        }
    });
});
