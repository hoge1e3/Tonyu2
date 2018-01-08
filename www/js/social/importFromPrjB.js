define(["FS","Util"],function (FS,Util) {
    var file=Util.getQueryString("file");
    FS.mount("http://www.tonyu.jp/","web");
    FS.mount("/ram/","ram");
    var f=FS.get("http://www.tonyu.jp/project/pages/dl.cgi?file="+file);
    var dst=FS.get("/ram/").rel(file);
    f.copyTo(dst).then(function (r) {
        console.log(r);
    },function (r) {
        console.log(r);
    });

});
