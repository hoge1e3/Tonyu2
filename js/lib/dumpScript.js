function dumpScript() {
    var scrs=$("script");
    var i=0;
    var buf="";
    var path2Name=genPath2Name();
    g();
    function g() {
        var sc=scrs[i].src;
        sc=sc.replace(/^.*\/js\//,"").replace(/\.js$/,"");
        $.get(scrs[i].src,function (s) {
            if (sc.length>0 && !sc.match(/jquery/) && !sc.match(/require/) ) {
                if (!path2Name[sc]) throw "no path2name "+sc;
                buf+="requirejs.setName('"+path2Name[sc]+"');\n";
                buf+=s+"\n";
            }
            i++;
            if (i<scrs.length) g();
            else {
                buf+="requirejs.start();\n";
                $("<textarea>").attr({rows:24,cols:120}).val(buf).appendTo("body");
                //console.log(buf);
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