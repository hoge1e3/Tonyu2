define(["exportAsScriptTags"], function (east) {
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
    dir=FS.get(dir);
    $("#prog").val(east(dir));
});
