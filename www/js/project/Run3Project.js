define(function (require,exports,module) {
    const F=require("ProjectFactory");
    //const Compiler=require("CompilerClient");
    const root=require("root");
    const WebSite=require("WebSite");
    const sysMod=require("sysMod");
    const langMod=require("langMod");
    const SourceFiles=require("SourceFiles");
    const CompiledProject=require("CompiledProject");
    F.addDependencyResolver((prj, spec)=>{
        if (spec.namespace==="kernel") {
            return CompiledProject.create({
                namespace:spec.namespace,
                url:WebSite.compiledKernel
            });
        }
    });
    F.addType("run3",params=> {
        const res=F.createDirBasedCore(params);
        res.include({
            async loadClasses () {
                await this.loadDependingClasses();
                const c=SourceFiles.add(this.getOutputFile().text());
                await c.exec();
            },
            async exec(srcraw) {
                console.log("Recving src",srcraw);
                await this.loadDependingClasses();
                const src=SourceFiles.add(srcraw);
                await src.exec();
            }
        }).include(langMod).include(sysMod);
        root.Project=res;
        return res;
    });
    exports.create=params=>F.create("run3",params);
});
