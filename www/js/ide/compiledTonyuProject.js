define(["root","plugins"], function (root, plugins) {
    // used by runScript2
    return function (factory, cpr) {
        const Tonyu=root.Tonyu;
        var kernelProject=factory.create("compiled",{
            namespace:"kernel",
            url: root.WebSite.compiledKernel
        });
        var m={
                getDir: function () {return this.dir;},
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
});
