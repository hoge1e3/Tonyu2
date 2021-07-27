/* global requirejs*/
requirejs(["JSZip","UI","FS","NewProjectDialog","Encoding","T1Map","WebSite"],
        function (JSZip,UI,FS,NPD,Encoding,T1Map,WebSite) {
    var home=FS.get(WebSite.tonyuHome);

    var dragMsg="ここにTonyu1プロジェクトフォルダのzipファイルをドラッグ＆ドロップ";
    /*var dragPoint=*/UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
        on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
    ).appendTo("body");
    function s(e) {
        e.stopPropagation();
        e.preventDefault();

    }
    async function fromSJIS(zipObj) {
        var sjisArray =await zipObj.async("Uint8Array");//asUint8Array();
        //console.log("sjis",sjisArray);
        var res= Encoding.convert(sjisArray, {
            from: 'SJIS',
            to: 'Unicode',
            type:"string"
        });
        //console.log("sjsires",res);
        return res;
    }
    let zip;
    function dropAdd(e) {
        try {
            const eo=e.originalEvent;
            var file = eo.dataTransfer.files[0];
            console.log(file);
            var rd = new FileReader();
            rd.onload = async function(){
                var ary = new Uint8Array(rd.result);
                zip=await JSZip.loadAsync(ary);//new JSZip(ary);
                start(file.name.replace(/\.zip$/i,""));
            };
            rd.readAsArrayBuffer(file);
        }catch (ex) {
            console.log(ex);
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
        append( NPD.embed(home.rel("Projects/"), extract ,{defName:name} ) );
    }
    var convFiles;
    var dstDir;
    var rsrc;
    var kerDev=false;
    async function extract(dir) {
        mem={};
        rsrc={
                images:[{name:"$pat_ball1",url:"images/Ball.png"}],
                sounds:[]
        };
        var base;
        dstDir=dir;
        //console.log(dstDir);
        const defp=/\/default\.tonyuprj$/;
        for (var fn in zip.files) {
            //var f=FS.get("/"+fn);
            if (fn.match(defp)) {
                base=fn.replace(defp,"/");//f.up();
                break;
            }
        }
        console.log("base",base);
        convFiles={};
        for (let fn in zip.files) {
            //const f=FS.get("/"+fn);
            var rp=fn.substring(base.length);// f.relPath(base);
            console.log(rp);
            var fb=zip.files[fn];
            convFiles[ dir.rel(rp).path()] = fb;
        }
        console.log(convFiles);
        for (let fn in convFiles) {
            const fb=convFiles[fn];
            const f=FS.get(fn);
            if (f.name()=="default.tonyuprj") {
                var tprj=$("<div>").html(await fromSJIS( fb )).appendTo("body");
                await parseTPRJ(tprj);
                break;
            }
        }
    }
    async function parseTPRJ(tprj) {
        var classes=tprj.find("class");
        var pages=tprj.find("page");
        await copyClasses(classes);
        await copyPages(pages);
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
        setOptions();
        //cpTmp("Boot");
        console.log(mem);
        //console.log(JSON.stringify(mem));
        for (var fn in mem) {
            FS.get(fn).text(mem[fn]);
        }
        console.log("Complete");
    }
    function setOptions(){
        mem[dstDir.rel("options.json")]=JSON.stringify({
            "compiler":{
                "defaultSuperClass":"kernel.Actor",
                //"commentLastPos":true,
                "diagnose":false
            },
            "run":{
                "mainClass":"user.Page_index",
                "bootClass":"kernel.Boot"
            },
            "kernelEditable":kerDev
        });
    }
    function cpTmp(fn) {
        var t1=home.rel("Projects/Tonyu1/");
        fn+=".tonyu";
        if (t1.rel(fn).exists()) {
            mem[dstDir.rel(fn)]=t1.rel(fn).text();
            kerDev=true;
        }
    }
    function domArray(jq) {
        const res=[];
        jq.each(function () {res.push(this);});
        return res;
    }
    async function copyClasses(classes) {
        for (const classDOM of domArray(classes)) {
            var fn=$(classDOM).attr("src");
            var f=dstDir.rel(fn);
            console.log(f.path());
            mem[f.path()]=await fromSJIS( convFiles[f.path()]);//.asText();
        }
    }
    function copyPages(pages) {
        pages.each(function () {
            var fn=$(this).attr("src");
            copyPage(dstDir.rel(fn));
        });
    }
    async function copyPage(pageF) {
        var cmmlSrc=await fromSJIS( convFiles[pageF.path()]); //.asText();
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
        await copyImages(pats);

        var gens=pg.find("generator");
        for (let gen of domArray(gens)) {
            var a=gen.attributes;
            var klass=$(gen).attr("classname");
            if (klass=="Map") {
                buf+=await genMap( $(gen) );
                continue;
            }
            buf+=$(gen).attr("name")+"= new "+klass+"{";
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
        }
        mem[dstDir.rel(fn).path()]=buf;
    }
    function val(v) {
        return v.replace(/%22/g,"\"");
    }
    async function genMap(map) {
        console.log("map", map);
        var src=map.attr("src");
        var mapF=convFiles[dstDir.rel(src)];
        var ary=await mapF.async("Uint8Array");
        var pwidth=map.attr("inst_pwidth");
        var pheight=map.attr("inst_pheight");
        var width=map.attr("inst_width");
        var height=map.attr("inst_height");
        //console.log(pwidth, pheight, width, height,ary);
        var buf="";
        var mapFile=dstDir.rel("maps/").rel(dstDir.rel(src).name());
        buf+=T1Map(pwidth, pheight, width, height,ary,mapFile, mem);
        return buf;
    }
    async function copyImages(pats) {
        console.log(pats);
        for (let pat of domArray(pats)) {
            var name=$(pat).attr("name");
            //name=name.replace(/^\$/,"$pat_");
            var src=$(pat).attr("src");
            var imgFile=dstDir.rel(src).path();
            var o=convFiles[imgFile];
            if (!o) {
                console.log(convFiles);
                throw "Image file not found :"+imgFile;
            }
            var fn=dstDir.rel(src).name();
            console.log("pats", imgFile);
            //var buf="";
            var a=await o.async("Uint8Array");
            var s=btoa(String.fromCharCode.apply(null, a));
            s="data:image/png;base64,"+s;
            //$("<img>").attr("src",s).appendTo("body");
            //console.log("patss", s);
            var url="images/"+fn;
            mem[dstDir.rel(url)]=s;
            rsrc.images.push({name:name , url:"ls:"+url });
        }
        console.log("Img" , rsrc);
    }
});
