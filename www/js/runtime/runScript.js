/*global requirejs*/
requirejs(["FS","Tonyu","IDEProject","Shell","ScriptTagFS",
			"runtime","WebSite","root","runScript_common"],
		function (FS,  Tonyu, IDEProject, sh, ScriptTagFS,
				rt,WebSite,root,com) {
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
		root.SplashScreen={
			hide: function () {$("#splash").hide();},
			show:function(){},
			progress:function(t) {$("#splash .progress").text(t);}
		};

		var cv=com.initCanvas();


		var locs=location.href.replace(/\?.*/,"").split(/\//);
		var prj=locs.pop() || "runscript";
		var user=locs.pop() || "nobody";
		//if (prjloc.length<0) locs="runscript";
		var curProjectDir=ramHome;
		var actualFilesDir=home.rel(user+"/"+prj+"/");
		ramHome.rel("files/").link(actualFilesDir);
		//if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
		var fo=ScriptTagFS.toObj();
		for (var fn in fo) {
			var f=curProjectDir.rel(fn);
			if (!f.isDir()) {
				var m=fo[fn];
				f.text(m.text);
				delete m.text;
				if (m.lastUpdate) f.metaInfo(m);
			}
		}
		sh.cd(curProjectDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		const NOP=e=>e;
		const ide={restart:NOP,stop:NOP,displayMode:NOP,jump:NOP};
		var curPrj=IDEProject.create({dir:curProjectDir,ide});//, kernelDir);
		curPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		start();
		function start() {
			Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
			curPrj.detectPlugins();
			var o=curPrj.getOptions();
			if (o.compiler && o.compiler.diagnose) {
				o.compiler.diagnose=false;
				curPrj.setOptions(o);
			}
			curPrj.runScriptMode=true;
			curPrj.rawRun(o.run.bootClass);
		}
	});
});
