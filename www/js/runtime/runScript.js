/*global requirejs*/
requirejs(["FS","Tonyu","IDEProject","Shell","ScriptTagFS",
			"runtime","WebSite","root","runScript_common","EditButton",
			"Debugger","SourceFiles","sysMod","ProjectFactory","CompiledProject","optionFixer"],
		function (FS,  Tonyu, IDEProject, sh, ScriptTagFS,
				rt,WebSite,root,com,EditButton,
				Debugger,SourceFiles,sysMod,F,CompiledProject,optionFixer) {
	$(function () {
		var home=FS.get(WebSite.tonyuHome);
		var ramHome=FS.get("/ram/");
		FS.mount(ramHome.path(), FS.LSFS.ramDisk() );
		var cv=com.initCanvas();


		var locs=location.href.replace(/[\?#].*/,"").split(/\//);
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
		const debuggerPrj=CompiledProject.create({dir:prjDir});
		debuggerPrj.include(sysMod);
		debuggerPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		F.addDependencyResolver((prj,spec)=>{
			if (spec.namespace==="kernel" && !spec.url && WebSite.compiledKernel) {
				return F.fromDependencySpec(prj, {
					url: WebSite.compiledKernel, namespace:spec.namespace
				});
			}
		});
		const ide={restart:NOP,stop:NOP,displayMode:NOP,jump:NOP};
		const optionFile=prjDir.rel("options.json");
		optionFixer.fixFile(optionFile);
		var idePrj=IDEProject.create({dir:prjDir,ide});//, kernelDir);
		Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);// abolish
		addImageScript().then(start).then(NOP,e=>console.error(e));
		async function start() {
			//console.log("STA-TO");
			await idePrj.fullCompile();// fullCompile exec compiled source when debugger is connected, but fails because kernel is not loaded yet
			idePrj.setDebugger(Debugger);
			//await SourceFiles.add(r).saveAs(idePrj.getOutputFile()); // does in fullCompile
			await Debugger.init(debuggerPrj);// does debuggerPrj.loadClaasses
			//console.log("RO-DO");
			Tonyu.globals.$debugger=Debugger;// does also in Debugger.init ...

			Tonyu.currentProject=Tonyu.globals.$currentProject=debuggerPrj;// does also...??
			debuggerPrj.compiler=idePrj;
			debuggerPrj.detectPlugins();
			var o=debuggerPrj.getOptions();
			if (o.compiler && o.compiler.diagnose) {
				o.compiler.diagnose=false;
				debuggerPrj.setOptions(o);
			}
			debuggerPrj.runScriptMode=true;// TODO
			Tonyu.runMode=true;//TODO
			console.log("RAWBoot");
			debuggerPrj.fixBootRunClasses();
			debuggerPrj.rawBoot(o.run.bootClass);
			EditButton.show(idePrj);
			/*prjDir.watch((type, file)=>{
				if (!file.endsWith(".tonyu")) return;
				console.log("modifai",type,file,arguments);
				idePrj.partialCompile(file).catch(e=>{
					console.error(e);
					Debugger.fire("compileError",e);
				});
			});*/
		}
		async function addImageScript() {
			const res=idePrj.getResource();
			try {
				root.BuiltinAssets=root.BuiltinAssets||{};
				const B=root.BuiltinAssets;
				//console.log("B",B);
				//console.log(res,);
				for (let im of res.images) {
					if (im.url.match(/^ls:/)) continue;
					if (!prjDir.rel(im.url).exists() && !B[im.url] && !WebSite.urlAliases[im.url]) {
						await loadScript(WebSite.scriptServer+im.url+".js");
						//console.log("BA",B);
						WebSite.urlAliases[im.url]=B[im.url];
					}
				}
			}catch(e) {

			}
		}
		function loadScript(url) {
			console.log("Loading script dynamically",url);
			return new Promise((succ,err)=>{
				var s=document.createElement("script");
	            s.src=url;
	            s.onload=succ;
				s.onerror=err;
	            document.body.appendChild(s);
			});
		}
	});
});
