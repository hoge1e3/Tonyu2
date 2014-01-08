define(["FS","Util"], function (FS,Util) {
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
    var main=Util.getQueryString("main", "Main");
    var buf="";
    var nonTonyu=[];
    dir=FS.get(dir);
    dir.each(function (f) {
        if (!f.endsWith(".tonyu")) {
            nonTonyu.push(f);
            return;
        }
        var rel=f.relPath(dir);
        var name=f.truncExt(".tonyu");
        var m=(name==main?" data-main='true'":"");
        buf+="<script type='text/tonyu' data-filename='"+rel+"'"+m+">";
        buf+=f.text();
        buf+="</script>\n\n";
    });
    nonTonyu.forEach(function (f) {
        var rel=f.relPath(dir);
        buf+="<script type='text/tonyu' data-filename='"+rel+"' data-wrap='80'>";
        buf+=wrap(f.text(),80);
        buf+="</script>\n\n";
    });

    $("<textarea>").attr({cols:100, rows:24}).val(buf).appendTo("body");
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
});