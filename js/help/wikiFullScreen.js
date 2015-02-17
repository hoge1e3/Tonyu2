define(["Wiki","FS","Util","WebSite"], function (Wiki,FS,Util,WebSite) {
    var home=FS.get(WebSite.tonyuHome);
    var w=Wiki($("body"),home.rel("doc/"),{useAnchor:true});
    var f=Util.getQueryString("file");
    if (!f) f=home.rel("doc/index.txt");
    else FS.get(f);
    w.show(f);
});