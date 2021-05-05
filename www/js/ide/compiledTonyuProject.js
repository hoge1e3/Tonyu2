// do not depend on ProjectFactory which is a part of BuilderClient4Sys
define(["root","plugins","sysMod","miniJSLoader","WebSite"],
function (root, plugins,sysMod,JS,WebSite) {
    // used by runScript2
    return function (dir) {
        const res={
            getDir:()=>dir,
            resolve(rdir){return this.getDir().rel(rdir);},
            getOptions(/*opt*/) {return this.getOptionsFile().obj();},
            getOptionsFile() {return this.getDir().rel("options.json");},
            setOptions(opt) {return this.getOptionsFile().obj(opt);},
            getOutputFile(/*lang*/) {
                const ns=this.getNamespace();
                return this.getDir().rel(`js/${ns}.js`);
            },
            getEXT:()=>".tonyu",
            sourceFiles:()=>[],
			getDependingProjects: ()=>[],
			async loadClasses() {
                const opt=this.getOptions();
                for (let dep of [...opt.compiler.dependingProjects, {namespace:this.getNamespace()}]) {
                    const ns=dep.namespace;
                    await JS.load(`js/${ns}.js`);
                }
				//await JS.load(WebSite.compiledKernel);
			},
			getNamespace() {
				var opt=this.getOptions();
				if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
				return "user";
			},
			requestPlugin:e=>e
		};
        Object.assign(res,sysMod);
        return res;
    };
});
