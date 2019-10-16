// do not depend on ProjectFactory which is a part of BuilderClient4Sys
define(["root","plugins","sysMod","miniJSLoader","WebSite"],
function (root, plugins,sysMod,JS,WebSite) {
    // used by runScript2
    return function (dir) {
        const res={
            getDir:()=>dir,
            resolve(rdir){return this.getDir().rel(rdir);},
            getOptions(opt) {return this.getOptionsFile().obj();},
            getOptionsFile() {return this.getDir().rel("options.json");},
            setOptions(opt) {return this.getOptionsFile().obj(opt);},
            getOutputFile(lang) {return this.getDir().rel("js/concat.js");},
            getEXT:()=>".tonyu",
            sourceFiles:()=>[],
			getDependingProjects: ()=>[],
			async loadClasses() {
				await JS.load(WebSite.compiledKernel);
				await JS.load("js/concat.js");
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
