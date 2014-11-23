define(["Wiki","FS","Util"], function (Wiki,FS,Util) {
    var w=Wiki($("body"),FS.get("/Tonyu/doc/"),{useAnchor:true});
    var f=Util.getQueryString("file");
    if (!f) f="/Tonyu/doc/index.txt";
    f=FS.get(f);
    w.show(f);
});