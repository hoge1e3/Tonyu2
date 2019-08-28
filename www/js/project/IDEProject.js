define(function (require,exports,module) {
    const F=require("ProjectFactory");
    const Compiler=require("CompilerClient");
    const root=require("root");
    const sysMod=require("sysMod");
    const langMod=require("langMod");
    /*F.addDependencyResolver((prj,spec)=> {
        if (spec.namespace) {

        }
    });*/
    F.addType("IDE",params=>{
        const res=F.createDirBasedCore(params);
        const c=new Compiler(params.dir,{
            ns2resource: {
                kernel: root.WebSite.compiledKernel
            },
            worker: {url: "CompilerWorker.js"}
        });
        c.onCompiled=function (src) {
            console.log("Sending src",src);
            const rp=res.getIframeProject();
            if (rp) rp.exec(src).catch(e=>console.error(e));
        };
        res.compiler=c;
        res.getIframeProject=()=>{
            const ifrm=root.document.querySelector("iframe");
            if (ifrm) return ifrm.contentWindow.Project;
        };
        res.delegate(c).include(sysMod).include(langMod);
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
