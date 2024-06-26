// do not depend on ProjectFactory which is a part of BuilderClient4Sys
define(["root","plugins","sysMod","miniJSLoader"],
function (root, plugins,sysMod,JS) {
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
                    // TODO Bitarrow kernel bad knowhow
                    if (ns==="kernel" && window.WebSite && window.WebSite.compiledKernel) {
				        await JS.load(window.WebSite.compiledKernel);
                    } else {
                        await JS.load(`js/${ns}.js`);
                    }
                }
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
