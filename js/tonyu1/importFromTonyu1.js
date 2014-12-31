requirejs(["JSZip","UI","FS","NewProjectDialog","Encoding"],
        function (JSZip,UI,FS,NPD,Encoding) {
    var dragMsg="ここにTonyu1プロジェクトフォルダのzipファイルをドラッグ＆ドロップ";
    var dragPoint=UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
        on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
    ).appendTo("body");
    function s(e) {
        e.stopPropagation();
        e.preventDefault();

    }
    function fromSJIS(zipObj) {
        var sjisArray =zipObj.asUint8Array();
        //console.log("sjis",sjisArray);
        var res= Encoding.convert(sjisArray, {
            from: 'SJIS',
            to: 'Unicode',
            type:"string"
        });
        //console.log("sjsires",res);
        return res;
    }
    var zip;
    function dropAdd(e) {
        try {
            eo=e.originalEvent;
            var file = eo.dataTransfer.files[0];
            console.log(file);
            var rd = new FileReader();
            rd.onload = function(e){
                var ary = new Uint8Array(rd.result);
                zip=new JSZip(ary);
                start(file.name.replace(/\.zip$/i,""));
            };
            rd.readAsArrayBuffer(file);
        }catch (e) {
            console.log(e);
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
    var mem;
    function start(name) {
        var diag=$("<div>").appendTo("body");
        diag.
        append($("<h1>").text("インポート先のフォルダを入力してください")).
        append( NPD.embed(FS.get("/Tonyu/Projects/"), extract ,{defName:name} ) );
    }
    var convFiles;
    var dstDir;
    var rsrc;
    function extract(dir) {
        mem={};
        rsrc=[{name:"$pat_ball1",url:"images/Ball.png"}];
        var base;
        dstDir=dir;
        for (var fn in zip.files) {
            var f=FS.get("/"+fn);
            if (f.name()=="default.tonyuprj") {
                base=f.up();
                break;
            }
        }
        convFiles={};
        for (var fn in zip.files) {
            var f=FS.get("/"+fn);
            var rp=f.relPath(base);
            var fb=zip.files[fn];
            convFiles[ dir.rel(rp).path()] = fb;
        }
        console.log(convFiles);
        for (var fn in convFiles) {
            var fb=convFiles[fn];
            var f=FS.get(fn);
            if (f.name()=="default.tonyuprj") {
                var tprj=$("<div>").html(fromSJIS( fb )).appendTo("body");
                parseTPRJ(tprj);
                break;
            }
        }
    }
    function parseTPRJ(tprj) {
        var classes=tprj.find("class");
        var pages=tprj.find("page");
        copyClasses(classes);
        copyPages(pages);
        mem[dstDir.rel("res.json")]=JSON.stringify(rsrc);
        console.log(mem);
    }
    function copyClasses(classes) {
        classes.each(function () {
            var fn=$(this).attr("src");
            var f=dstDir.rel(fn);
            console.log(f.path());
            mem[f.path()]=fromSJIS( convFiles[f.path()]);//.asText();
        });
    }
    function copyPages(pages) {
        pages.each(function () {
            var fn=$(this).attr("src");
            copyPage(dstDir.rel(fn));
        });
    }
    function copyPage(pageF) {
        var cmmlSrc=fromSJIS( convFiles[pageF.path()]); //.asText();
        var pg=$("<div>").html(cmmlSrc).appendTo("body");
        var fn="Page_"+pageF.truncExt(".cmml")+".tonyu";
        console.log("Page", fn);
        var globals=pg.find("globalvalue");
        var buf="";
        globals.each(function () {
            buf+=$(this).attr("name")+"="+$(this).attr("value")+";\n";
        });
        var gens=pg.find("generator");
        gens.each(function () {
            var a=this.attributes;
            buf+=$(this).attr("name")+"= new "+$(this).attr("classname")+"{";
            var com="";
            for (var i=0 ; i<a.length; i++) {
                var n=a[i].name;
                var r=/inst_(.*)/.exec(n);
                if (r) {
                    buf+=com+r[1]+": "+a[i].value;
                    com=", ";
                }
            }
            buf+="};\n";
        });
        mem[pageF.path()]=buf;
        var pats=pg.find("cpattern");
        pats.each(function () {
            var name=$(this).attr("name");
            name=name.replace(/^\$/,"$pat_");
            var src=$(this).attr("src");
            var o=convFiles[dstDir.rel(src).path()];
            var fn=dstDir.rel(src).name();
            //console.log("pats", o);
            var buf="";
            var a=o.asUint8Array();
            var s=btoa(String.fromCharCode.apply(null, a));
            s="data:image/png;base64,"+s;
            //$("<img>").attr("src",s).appendTo("body");
            //console.log("patss", s);
            var url="images/"+fn;
            mem[dstDir.rel(url)]=s;
            rsrc.push({name:name , url:url });
        });
    }
    function copyImages(images) {

    }
});