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
            var home=FS.get(WebSite.tonyuHome);
            genROM(home.rel("Kernel/"),     home.rel("js/gen/ROM_k.js"));
            genROM(home.rel("doc/"),        home.rel("js/gen/ROM_d.js"));
            genROM(home.rel("SampleROM/"),  home.rel("js/gen/ROM_s.js"));
            rsc=home.rel("js/gen/runScript_concat.js");
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