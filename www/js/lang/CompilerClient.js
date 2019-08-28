define(function (require, exports, module) {
const root=require("root");
const Worker=root.Worker;
const WS=require("WorkerServiceB");
// SourceFiles is managed within run3.html, not this side(IDE)
//const SourceFiles=require("../lang/SourceFiles");
//const FS=(root.parent && root.parent.FS) || root.FS;

class Compiler {
    constructor(dir,config) {
        config=config||Compiler.config;
        this.dir=dir;
        this.w=new WS.Wrapper(new Worker(config.worker.url+"?"+Math.random()));
        this.config=config;
        //this.SourceFiles=config.SourceFiles;
    }
    async init() {
        if (this.inited) return;
        const files=this.dir.exportAsObject({
            excludesF: f=>f.ext()!==".tonyu" && f.name()!=="options.json"
        });
        await this.w.run("compiler/init",{files,ns2resource: this.config.ns2resource});
        this.inited=true;
    }
    async fullCompile() {
        await this.init();
        const compres=await this.w.run("compiler/fullCompile");
        console.log("compres",compres);
        if (this.onCompiled) this.onCompiled(compres);
        return compres;
    }
    async partialCompile(f) {
        const files={};files[f.relPath(this.dir)]=f.text();
        await this.init();
        const compres=await this.w.run("compiler/postChange",{files});
        console.log(compres);
        if (this.onCompiled) this.onCompiled(compres);
        return compres;
    }
    async run() {
        await this.init();
        await this.fullCompile();
        this.dir.watch(async (e,f)=>{
            console.log(e,f.path());
            if (f.ext()===".tonyu") {
                const nsraw=await this.partialCompile(f);
                //if (this.onCompiled) this.onCompiled(nsraw);

                //if (root.Tonyu.globals.$restart) root.Tonyu.globals.$restart();
            }
        });
    }
}
root.TonyuCompiler=Compiler;
module.exports=Compiler;
});
