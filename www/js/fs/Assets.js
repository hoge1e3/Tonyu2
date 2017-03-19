define(["WebSite","Util","Tonyu"],function (WebSite,Util,Tonyu) {
    var Assets={};
    Assets.resolve=function (url, baseDir) {
        if (url==null) url="";
        url=url.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (t,name) {
            return WebSite[name];
        });
        if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
        if (Util.startsWith(url,"ls:")) {
            var rel=url.substring("ls:".length);
            if (!baseDir) throw new Error("Basedir not specified");
            var f=baseDir.rel(rel);
            if (!f.exists()) throw new Error("Resource file not found: "+f);
            if (WebSite.mp3Disabled && rel.match(/\.(mp3|mp4|m4a)$/)) {
                var oggf=baseDir.rel(rel.replace(/\.(mp3|mp4|m4a)$/,".ogg"));
                if (oggf.exists()) {
                    f=oggf;
                }
            }
            url=f.getURL();
        }
        return url;
    };
    Tonyu.Assets=Assets;
    return Assets;
});