define(["FS","Util"], function (FS,Util) {
    var east=function (dir,options) {
        options=options||{};
        var excludes=options.excludes||{};
        var includeJSScript=options.includeJSScript;
        var buf="";
        if (includeJSScript) {
            buf+='<script src="http://tonyuedit.appspot.com/js/lib/jquery-1.10.1.js" language="text/javascript"></script>\n';
            buf+='<script src="http://tonyuedit.appspot.com/js/gen/runScript_concat.min.js" language="text/javascript"></script>\n';
        }
        buf+="<div id='splash' style='position:relative'>\n";
        buf+="<!--ここに，ロード中に表示する内容を記述できます-->\n";
        buf+="</div>\n";
        buf+="<!--\n";
        buf+="このプログラムをTonyuの開発環境で編集するには，\n";
        buf+="http://tonyuedit.appspot.com/html/build/importFromJsdoit.html\n";
        buf+="を開きます．\n";
        buf+="-->\n";
        var nonTonyu=[];
        //dir=FS.get(dir);
        dir.recursive(function (f) {
            var rel=f.relPath(dir);
            if (excludes[rel]) return;
            if (!f.endsWith(".tonyu")) {
                nonTonyu.push(f);
                return;
            }
            //var name=f.truncExt(".tonyu");
            var m="";//(name==main?" data-main='true'":"");
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"'"+lu+">";
            buf+=f.text();
            buf+="</script>\n\n";
        },{excludes:["files/"]});
        nonTonyu.forEach(function (f) {
            var rel=f.relPath(dir);
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"' data-wrap='80'"+lu+">";
            buf+=wrap(f.text(),80);
            buf+="</script>\n\n";
        });
        return buf;
        function wrap(str, cols) {
            var lines=str.split("\n");
            var buf="";
            lines.forEach(function (line) {
                while (true) {
                    if (line.length>cols) {
                        buf+=line.substring(0,cols)+"\\\n";
                        line=line.substring(cols);
                    } else {
                        buf+=line+"\n";
                        break;
                    }
                }
                return buf;
            });
            return buf;
        }
    };
    return east;
});
