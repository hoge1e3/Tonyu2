define(["FS","Util"], function (FS,Util) {
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
    var main=Util.getQueryString("main", "Main");
    var buf="";
    dir=FS.get(dir);
    dir.each(function (f) {
        var rel=f.relPath(dir);
        var name=f.truncExt(".tonyu");
        var m=(name==main?" data-main='true'":"");
        buf+="<script type='text/tonyu' data-filename='"+rel+"' "+m+">";
        buf+=f.text();
        buf+="</script>\n\n";
    });
    $("<textarea>").attr({cols:80, rows:24}).val(buf).appendTo("body");
});