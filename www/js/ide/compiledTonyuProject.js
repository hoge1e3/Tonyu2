define(["root","plugins","ProjectFactory","sysMod","miniJSLoader","WebSite"],
function (root, plugins,F,sysMod,JS,WebSite) {
    // used by runScript2
    return function (dir) {
        const res=F.createDirBasedCore({dir});
		res.include(sysMod).include({
			getDependingProjects: ()=>[],
			async loadClasses() {
				await JS.load(WebSite.compiledKernel);
				await JS.load("js/concat.js");
			},
			loadPlugins(onload) {
				var opt=this.getOptions();
				return plugins.loadAll(opt.plugins,onload);
			},
			getNamespace() {
				var opt=this.getOptions();
				if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
				return "user";
			},
			requestPlugin:e=>e
		});
        return res;
    };
});
