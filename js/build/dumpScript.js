define(["WebSite"], function (WebSite) {
function dumpScript(options) {
	if (!options) options={};
    var scrs=$("script");
    var i=0;
    var buf="";
    buf+="// Created at "+new Date()+"\n";
    //var path2Name=genPath2Name();
    var nocats={timbre:true, genROM:true, dumpScript:true, buildAll:true, ace:true };
    g();
    function g() {
        var sc=scrs[i].src;
        var name=$(scrs[i]).data("requiremodule");
        //console.log(sc,name);
        if (sc==null || sc=="" || $(scrs[i]).data("nocat")  || !name || nocats[name]) {
        	var cont=sc;
        	if (!cont || cont=="") {
        		cont=$(scrs[i]).text().substring(0,50).replace(/\r?\n/g,"");
        	}
        	buf+="// Skipped "+cont+"\n";
        	next();
        	return;
        }
        /*
        // http: / /lcl:300/
        sc=sc.replace(/^\w+:\/\/[^\/]+\//,"");
        if (sc.match(/^fs\//)) {
            // http://localhost:3002/fs/Tonyu/js/gen/ROMk.js
            // ../fs/Tonyu/js/gen/ROMk
            sc="../"+sc;
        } else {
            sc=sc.replace(/^js\//,"");
        }
        sc=sc.replace(/\.js$/,"");
        console.log(path2Name[sc]==$(scrs[i]).data("requiremodule") , scrs[i].src, path2Name[sc], $(scrs[i]).data("requiremodule"));
        */
        $.get(scrs[i].src,function (s) {
            if (sc.length>0) {
                //if (!path2Name[sc]) throw "no path2name "+sc;
                buf+="requirejs.setName('"+name+"');\n";
                buf+=s+"\n";
            }
            next();
        });
    }
    function next() {
        i++;
        if (i<scrs.length) g();
        else {
            buf+="requirejs.start();\n";
            if (options.onend) {
            	options.onend(buf);
            	return;
            }
            genROM(FS.get("/Tonyu/Kernel/"), FS.get("/Tonyu/js/gen/ROM_k.js"));
            genROM(FS.get("/Tonyu/doc/"), FS.get("/Tonyu/js/gen/ROM_d.js"));
            genROM(FS.get("/Tonyu/SampleROM/"), FS.get("/Tonyu/js/gen/ROM_s.js"));
            rsc=FS.get("/Tonyu/js/gen/runScript_concat.js");
            rsc.text(buf);
            var json= JSON.stringify( FS.exportDir("/") );
            $.ajax({
                type:"POST",
                url:"LS2File",
                data:{json: json},
                success: function (r) {
                    alert("OK!: " + r);
                }
            });
        }
    }
    /*function genPath2Name() {
        var res={};
        for (var k in reqConf.paths) {
            var v=reqConf.paths[k];
            res[v]=k;
        }
        return res;
    }*/
}
return dumpScript;
});