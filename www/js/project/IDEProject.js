define(function (require,exports) {
    const F=require("ProjectFactory");
    //const A=require("assert");
    const BuilderClient=require("BuilderClient");
    const root=require("root");
    const sysMod=require("sysMod");
    const CP=require("CompiledProject");
    const WebSite=require("WebSite");
    const langMod=BuilderClient.langMod;
    F.addType("IDE",params=>{
        const ide=params.ide;
        const res=F.createDirBasedCore(params);
        const ns2depspec= {
            kernel: {namespace:"kernel", url: WebSite.compiledKernel}
        };
        const c=new BuilderClient(res ,{
            worker: {ns2depspec, url: "BuilderWorker.js"/*WORKER_URL*/}
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
            d.requestStop=o=>ide.stop(o);
            d.startWithAutoReload=res.startWithAutoReload;
            c.setDebugger(d);
        };
        res.getDebugger=()=>curDebugger;
        res.setDebugger=d=>{curDebugger=d;c.setDebugger(d);};
        res.compiler=c;
        res.getIframeProject=()=>{
            const ifrm=root.document.querySelector("iframe");
            if (ifrm) return ifrm.contentWindow.Project;
        };
        res.disconnectDebugger=()=>c.setDebugger();
        res.fullCompile=c.fullCompile.bind(c);
        res.partialCompile=c.partialCompile.bind(c);
        res.renameClassName=c.renameClassName.bind(c);
        res.resetFiles=c.resetFiles.bind(c);
        res.include(sysMod).include(langMod);
        res.stop=()=>{
            try {
                if (curDebugger) return curDebugger.stop();
            }catch(e) {
                //Edge: Can't execute code from a freed script
                console.error(e);
            }
        };
        console.log("res.loadClasses", res.loadClasses) ;
        return res;
    });
    exports.create=params=>F.create("IDE",params);

});
