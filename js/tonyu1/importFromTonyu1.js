requirejs(["JSZip","UI","FS","NewProjectDialog","Encoding","T1Map"],
        function (JSZip,UI,FS,NPD,Encoding,T1Map) {
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
        rsrc={
                images:[{name:"$pat_ball1",url:"images/Ball.png"}],
                sounds:[]
        };
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
        //console.log(mem);
        cpTmp("SpriteChar");
        cpTmp("PlainChar");
        cpTmp("TextChar");
        cpTmp("SecretChar");
        cpTmp("DxChar");
        cpTmp("T1Text");
        cpTmp("T1Line");
        cpTmp("T1Map");
        cpTmp("T1Page");
        cpTmp("MediaPlayer");
        cpTmp("Boot");
        console.log(mem);
        //console.log(JSON.stringify(mem));
        for (var fn in mem) {
            FS.get(fn).text(mem[fn]);
        }
    }
    function cpTmp(fn) {
        mem[dstDir.rel(fn+".tonyu")]=FS.get("/Tonyu/Projects/Tonyu1/").
        rel(fn+".tonyu").text();
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
        var buf="extends T1Page;\n";
        buf+="initGlobals();\n";
        globals.each(function () {
            buf+=$(this).attr("name")+"="+$(this).attr("value")+";\n";
        });
        buf+="$Screen.resize($screenWidth,$screenHeight);\n";
        var pats=pg.find("cpattern");
        copyImages(pats);

        var gens=pg.find("generator");
        gens.each(function () {
            var a=this.attributes;
            var klass=$(this).attr("classname");
            if (klass=="Map") {
                buf+=genMap( $(this) );
                return;
            }
            buf+=$(this).attr("name")+"= new "+klass+"{";
            var com="";
            for (var i=0 ; i<a.length; i++) {
                var n=a[i].name;
                var r=/inst_(.*)/.exec(n);
                if (r) {
                    buf+=com+r[1]+": "+val(a[i].value);
                    com=", ";
                }
            }
            buf+="};\n";
        });
        mem[dstDir.rel(fn).path()]=buf;
    }
    function val(v) {
        return v.replace(/%22/g,"\"");
    }
    function genMap(map) {
        console.log("map", map);
        var src=map.attr("src");
        var mapF=convFiles[dstDir.rel(src)];
        var ary=mapF.asUint8Array();
        var pwidth=map.attr("inst_pwidth");
        var pheight=map.attr("inst_pheight");
        var width=map.attr("inst_width");
        var height=map.attr("inst_height");
        console.log(pwidth, pheight, width, height,ary);
        var buf="";
        var mapFile=dstDir.rel("maps/").rel(dstDir.rel(src).name());
        buf+=T1Map(pwidth, pheight, width, height,ary,mapFile, mem);
        return buf;
    }
    function copyImages(pats) {
        pats.each(function () {
            var name=$(this).attr("name");
            //name=name.replace(/^\$/,"$pat_");
            var src=$(this).attr("src");
            var imgFile=dstDir.rel(src).path();
            var o=convFiles[imgFile];
            if (!o) {
                console.log(convFiles);
                throw "Image file not found :"+imgFile;
            }
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
            rsrc.images.push({name:name , url:"ls:"+url });
        });

    }
});