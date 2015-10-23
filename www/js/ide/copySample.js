define(["Shell","FS","WebSite"],function (sh,FS,WebSite) {
    var home=FS.get(WebSite.tonyuHome);
    var samples=home.rel("SampleROM/");
    var projects=home.rel("Projects/");
    function all() {
        if (!samples.exists()) return;
        samples.ls().forEach(cs);
    }
    function available(dir) {
        var n=dir.name();
        return samples.rel(n).exists() && projects.equals(dir.up());
    }

    function cs(n) {
        if (!n) return all();
        var src=samples.rel(n);
        var dst=projects.rel(n);
        //console.log(n,src,dst,dst.exists());
        if (src.exists() && !dst.exists()) {
            sh.cp(src,dst);//,{v:1});
        }
    }
    cs.available=available;
    cs.all=all;
    return cs;
});