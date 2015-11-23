define(["plugins","compiledProject"], function (plugins,CPR) {
    var CPTR=function (ns, url, dir) {
        var cpr=CPR(ns,url);
        var kernelProject=CPR("kernel", WebSite.compiledKernel);

        var m={
                getDir: function () {return dir;},
                getDependingProjects:function () {//override
                    return [kernelProject];
                },
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
                requestPlugin:function(){},
                run: function (bootClassName) {
                    var ctx={classes:Tonyu.classMetas};
                    this.loadClasses(ctx).then(function () {
                        Tonyu.run(bootClassName);
                    });
                }
        };
        for (var k in m) cpr[k]=m[k];
        return cpr;
    };
    return CPTR;
});