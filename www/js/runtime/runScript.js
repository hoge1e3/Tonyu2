/*global requirejs*/
requirejs(["FS","Tonyu","IDEProject","Shell","ScriptTagFS",
			"runtime","WebSite","root","runScript_common",
			"Debugger","SourceFiles","sysMod"],
		function (FS,  Tonyu, IDEProject, sh, ScriptTagFS,
				rt,WebSite,root,com,
				Debugger,SourceFiles,sysMod) {
	$(function () {
		var home=FS.get(WebSite.tonyuHome);
		var ramHome=FS.get("/ram/");
		FS.mount(ramHome.path(), FS.LSFS.ramDisk() );
		Tonyu.defaultResource={
				images:[
						{name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
						{name:"$pat_sample", url: "images/Sample.png"},
						{name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
						],
						sounds:[]
		};
		
		var cv=com.initCanvas();


		var locs=location.href.replace(/\?.*/,"").split(/\//);
		var prjPath=locs.pop() || "runscript";
		var user=locs.pop() || "nobody";
		//if (prjloc.length<0) locs="runscript";
		var prjDir=ramHome;
		var actualFilesDir=home.rel(user+"/"+prjPath+"/");
		ramHome.rel("files/").link(actualFilesDir);
		//if (prjDir.exists()) sh.rm(prjDir,{r:1});
		var fo=ScriptTagFS.toObj();
		for (var fn in fo) {
			var f=prjDir.rel(fn);
			if (!f.isDir()) {
				var m=fo[fn];
				f.text(m.text);
				delete m.text;
				if (m.lastUpdate) f.metaInfo(m);
			}
		}
		sh.cd(prjDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		const NOP=e=>e;
		const debuggerPrj=Debugger.ProjectFactory.create("compiled",{dir:prjDir});
		debuggerPrj.include(sysMod);
		debuggerPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		Debugger.ProjectFactory.addDependencyResolver((prj,spec)=>{
			if (spec.namespace==="kernel" && !spec.url && WebSite.compiledKernel) {
				return Debugger.ProjectFactory.fromDependencySpec(prj, {
					url: WebSite.compiledKernel, namespace:spec.namespace
				});
			}
		});
		const ide={restart:NOP,stop:NOP,displayMode:NOP,jump:NOP};
		var idePrj=IDEProject.create({dir:prjDir,ide});//, kernelDir);
		Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);// abolish

		start().then(NOP,e=>console.error(e));
		async function start() {
			//console.log("STA-TO");
			const r=await idePrj.fullCompile();// fullCompile exec compiled source when debugger is connected, but fails because kernel is not loaded yet
			idePrj.setDebugger(Debugger);
			//await SourceFiles.add(r).saveAs(idePrj.getOutputFile()); // does in fullCompile
			await Debugger.init(debuggerPrj, Tonyu);// does debuggerPrj.loadClaasses
			//console.log("RO-DO");
			Tonyu.globals.$debugger=Debugger;

			Tonyu.currentProject=Tonyu.globals.$currentProject=debuggerPrj;
			debuggerPrj.detectPlugins();
			var o=debuggerPrj.getOptions();
			if (o.compiler && o.compiler.diagnose) {
				o.compiler.diagnose=false;
				debuggerPrj.setOptions(o);
			}
			debuggerPrj.runScriptMode=true;// TODO
			Tonyu.runMode=true;//TODO
			console.log("RAWBoot");
			debuggerPrj.rawBoot(o.run.bootClass);
			prjDir.watch((type, file)=>{
				if (!file.endsWith(".tonyu")) return;
				console.log("modifai",type,file,arguments);
				idePrj.partialCompile(file).catch(e=>{
					console.error(e);
				});
			});
		}
	});
});
