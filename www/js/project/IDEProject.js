define(function (require,exports) {
    const F=require("ProjectFactory");
    //const A=require("assert");
    const BuilderClient=require("BuilderClient");
    const root=require("root");
    const sysMod=require("sysMod");
    const CP=require("CompiledProject");
    const WebSite=require("WebSite");
    const R=require("R");
    const EventHandler=require("EventHandler");
    const langMod=BuilderClient.langMod;
    const NS2DepSpec=BuilderClient.NS2DepSpec;
    //console.log(BuilderClient);
    const ns2depspec=WebSite.ns2depspec;
    exports.ns2depspec=ns2depspec;
    F.addType("IDE",params=>{
        const ide=params.ide;
        const res=F.createDirBasedCore(params);
        const c=new BuilderClient(res ,{
            worker: {ns2depspec, url: "BuilderWorker.js"/*WORKER_URL*/},
            locale:R.getLocale()
        });
        const n=new NS2DepSpec(ns2depspec);
        F.addDependencyResolver((prj,spec)=>{
            const s=n.has(spec.namespace);
            if (s) {
                return CP.create(s);
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
        const handler=new EventHandler();
        res.on=function (...args){return handler.on(...args);};
        res.fire=function (...args){return handler.fire(...args);};
        res.readyState=true;
        res.setReadyState=function (state) {
            this.readyState=state;
            this.fire("readyState",{state});
        };
        res.waitReady=function (g=true) {
            return new Promise(s=>{
                if (this.readyState===g) s(g);
                console.log("wait until ",this.readyState,"->",g);
                const r=this.on("readyState", e=>{
                    console.log("State change",e);
                    if (e.state===g) {
                        r.remove();
                        s(e);
                    }
                });
            });
        };
        const cMethods=["fullCompile","clean","partialCompile","renameClassName","resetFiles"];
        for (let _cMethod of cMethods) {
            const cMethod=_cMethod;
            res[cMethod]=async function (...args) {
                try {
                    this.setReadyState(cMethod);
                    const res=await c[cMethod](...args);
                    return res;
                } finally {
                    this.setReadyState(true);
                }
            };
        }
        /*res.fullCompile=c.fullCompile.bind(c);
        res.clean=c.clean.bind(c);
        res.partialCompile=c.partialCompile.bind(c);
        res.renameClassName=c.renameClassName.bind(c);
        res.resetFiles=c.resetFiles.bind(c);
        */
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
