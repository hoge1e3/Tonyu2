define(function (require/*,exports,module*/) {
    const Debugger=require("Debugger");
    const runtime=require("runtime");
    const Tonyu=require("Tonyu");
    const root=require("root");
    const FS=require("FS");
    const F=require("ProjectFactory");
    const CompiledProject=require("CompiledProject");
    const WebSite=require("WebSite");
    const sysMod=require("sysMod");
    const KeyEventChecker=require("KeyEventChecker");
    const runScript_common=require("runScript_common");
    const thumbnail=require("thumbnail");
    const jshint=require("jshint");
    const Profiler=require("profiler2");
    const ns2depspec=WebSite.ns2depspec;
    Debugger.Profiler=Profiler;
    jshint.use(runtime);// UIDiag etc... needed
    F.addDependencyResolver((prj,spec)=>{
        const s=ns2depspec.filter(s=>s.namespace===spec.namespace)[0];
        if (s) {
            return F.create("compiled", s);
        }
        /*if (spec.namespace==="kernel") {
            return F.create("compiled",{namespace:"kernel",url:WebSite.compiledKernel});
        }*/
    });
    /*Debugger.on("runtimeError",evt=>{
        console.log(evt.stack.map(s=>s+"").join("\n"));
    });*/

    const cv=runScript_common.initCanvas();
    Tonyu.globals.$mainCanvas=cv;
    Tonyu.runMode=true;
    Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);
    start();
    /*function traverseParent() {
        let p;
        for (p=root.parent; p && !p.tonyu ; p=p.parent);
        return p;
    }*/
    async function start() {
        const prjDir=FS.get(getQueryString("prj")||root.Tonyu_StartProject);
        const prj=CompiledProject.create({dir:prjDir});
        prj.include(sysMod);
        await Debugger.init(prj);// sets $currentProject=prj
        let parent=root.parent;//traverseParent();
        try {
            prj.compiler=parent.Tonyu.globals.$currentProject;// TODO: compiler->compilablePrj?
            // It is likely I wanted to use from Tonyu like this:  $currentProject.compiler.partialCompile();
        } catch(e){console.log(e);}
        try {
            if (!getQueryString("nodebug")) {
                parent.onTonyuDebuggerReady(Debugger);
            }
        } catch(e) {console.log(e);}
        window.onerror=function (a,b,c,d,e) {
            //console.log(...arguments);
            if (e && e.stack) Tonyu.onRuntimeError(e);
        };
        const opt=prj.getOptions();
        console.log("opt",opt);
        //await prj.loadClasses();
        const boot=opt.run.bootClass|| getQueryString("boot");
        console.log("boot",boot);
        if (boot) {
            Tonyu.runningObj=Debugger.create(boot);
            Debugger.stop=()=>Tonyu.runningObj.stop();
            KeyEventChecker.down(document,"F2",()=>Debugger.requestStop() );
            thumbnail.set(prj, 2000);
        }
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
