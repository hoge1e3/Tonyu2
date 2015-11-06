define(["plugins","compiledProject"], function (plugins,CPR) {
    var CPTR=function (ns, url, dir) {
        var cpr=CPR(ns,url);
        var m={
                getDir: function () {return dir;},
                getOptions: function () {
                    var resFile=this.getDir().rel("options.json");
                    return resFile.obj();
                },
                getResource: function () {
                    var resFile=this.getDir().rel("res.json");
                    return resFile.obj();
                },
                loadPlugins: function (onload) {
                    var opt=this.getOptions();
                    return plugins.loadAll(opt.plugins,onload);
                },
                run: function (bootClassName) {
                    this.loadClasses().then(function () {
                        Tonyu.run(bootClassName);
                    });
                }
        };
        for (var k in m) cpr[k]=m[k];
        return cpr;
    };
    return CPR;
});