function dumpScript() {
    var scrs=$("script");
    var i=0;
    var buf="";
    var path2Name=genPath2Name();
    g();
    function g() {
        var sc=scrs[i].src;
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
        $.get(scrs[i].src,function (s) {
            if (sc.length>0 && !$(scrs[i]).data("nocat")) {
                if (!path2Name[sc]) throw "no path2name "+sc;
                buf+="requirejs.setName('"+path2Name[sc]+"');\n";
                buf+=s+"\n";
            }
            i++;
            if (i<scrs.length) g();
            else {
                buf+="requirejs.start();\n";
                //$("<textarea>").attr({rows:24,cols:120}).val(buf).appendTo("body");
                //console.log(buf);
                rsc=FS.get("/Tonyu/js/gen/runScript_concat.js");
                rsc.text(buf);
                var json= JSON.stringify( FS.exportDir("/") );
                $.ajax({
                    type:"POST",
                    url:"LS2File",
                    data:{json: json},
                    success: function (r) {
                        alert("OK: " + r);
                    }
                });
            }
        });
    }
    function genPath2Name() {
        var res={};
        for (var k in reqConf.paths) {
            var v=reqConf.paths[k];
            res[v]=k;
        }
        return res;
    }
}