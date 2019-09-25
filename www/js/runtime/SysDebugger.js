define(function (require,exports,module) {
    const Debugger=require("Debugger");
    require("ImageList");
    require("T2MediaLib");
    require("UIDiag");
    const root=require("root");
    const Tonyu=require("Tonyu");
    const FS=Debugger.FS;
    const F=Debugger.ProjectFactory;
    const WebSite=require("WebSite");
    const sysMod=require("sysMod");
    F.addDependencyResolver((prj,spec)=>{
        if (spec.namespace==="kernel") {
            return F.create("compiled",{namespace:"kernel",url:WebSite.compiledKernel});
        }
    });
    Debugger.on("runtimeError",evt=>{
        console.log(evt.stack.map(s=>s+"").join("\n"));
    });
    Tonyu.globals.$mainCanvas=$("#cv");
    Tonyu.runMode=true;
    Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);
    start();
    async function start() {
        const prjDir=FS.get(getQueryString("prj"));
        const prj=Debugger.ProjectFactory.create("compiled",{dir:prjDir});
        prj.include(sysMod);
        await Debugger.init(prj,Tonyu);
        const opt=prj.getOptions();
        console.log("opt",opt);
        //await prj.loadClasses();
        const boot=opt.run.bootClass|| getQueryString("boot");
        console.log("boot",boot);
        if (boot) Debugger.create(boot);
    }
    function getQueryString(key, default_)
    {
       if (default_==null) default_="";
       key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
       var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
       var qs = regex.exec(window.location.href);
       if(qs == null)
        return default_;
       else
        return decodeURLComponentEx(qs[1]);
    }
    function decodeURLComponentEx(s){
        return decodeURIComponent(s.replace(/\+/g, '%20'));
    }

});
