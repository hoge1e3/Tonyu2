define(["exportAsScriptTags","UI","Klass"], function (east,UI,Klass) {
    Klass.define({
        $this:"t",
        createDOM:function (t) {

        },
        
    })
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
    dir=FS.get(dir);
    $("#prog").val(east(dir,{
        excludes:{"js/concat.js":1,"js/concat.js.map":1},
         includeJSScript:true
     }));
});
