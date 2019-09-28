define(function (require,exports,module) {
    const F=require("ProjectFactory");
    //const A=require("assert");
    const BuilderClient=require("BuilderClient");
    const root=require("root");
    const sysMod=require("sysMod");
    const langMod=require("langMod");
    const CP=require("CompiledProject");
    const WebSite=require("WebSite");
    /*F.addDependencyResolver((prj,spec)=> {
        if (spec.namespace) {

        }
    });*/
    F.addType("IDE",params=>{
        const ide=params.ide;
        const res=F.createDirBasedCore(params);
        const ns2depspec= {
            kernel: {namespace:"kernel", url: WebSite.compiledKernel}
        };
        const c=new BuilderClient(res ,{
            worker: {ns2depspec, url: "BuilderWorker.js"}
        });
        F.addDependencyResolver((prj,spec)=>{
            if (ns2depspec[spec.namespace]) {
                return CP.create(ns2depspec[spec.namespace]);
            }
        });
        c.onCompiled=function (src) {
            console.log("Sending src",src);
            const rp=res.getIframeProject();
            if (rp) rp.exec(src).catch(e=>console.error(e));
        };
        let curDebugger;
        root.onTonyuDebuggerReady=d=>{
            d.on("runtimeError",e=>{
                console.log("runt",e.stack.map(s=>s+"").join("\n"));
                ide.showError(e);
            });
            curDebugger=d;
            c.setDebugger(d);
        };
        res.compiler=c;
        res.getIframeProject=()=>{
            const ifrm=root.document.querySelector("iframe");
            if (ifrm) return ifrm.contentWindow.Project;
        };
        res.disconnectDebugger=()=>c.setDebugger();
        res.fullCompile=c.fullCompile.bind(c);
        res.partialCompile=c.partialCompile.bind(c);
        res.include(sysMod).include(langMod);
        res.stop=()=>curDebugger && curDebugger.stop();
        /*res.getOutputFile=function () {
            // relative path in outputFile will fail old version
            var opt=this.getOptions();
            var o=opt.compiler.outputFile||"js/concat.js";
            var outF=this.resolve(opt.compiler.outputFile);
            return outF;
        };*/
        console.log("res.loadClasses", res.loadClasses) ;
        /*Object.assign(res,{
            async loadClasses() {
                await this.loadDependingClasses();

            }
        });*/
        return res;
    });
    exports.create=params=>F.create("IDE",params);

});
