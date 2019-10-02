/*global requirejs, process*/
requirejs(["FS","ProjectFactory","sysMod", "Shell","runtime","WebSite","LSFS","Tonyu","root","runScript_common","miniJSLoader","plugins"],
		function (FS,  F, sysMod, sh,  rt,WebSite,LSFS,Tonyu,root,com,JS,plugins) {
	$(function () {
		root.SplashScreen={
			hide: function () {$("#splash").hide();},
			show:function(){},
			progress:function(t) {$("#splash").text(t);}
		};

		const cv=com.initCanvas();

		let curProjectDir, home, prj;
		if (WebSite.isNW) {
			var cur=process.cwd().replace(/\\/g,"/");
			prj=location.href.replace(/^chrome-extension:\/\/\w*/,"");
			home=FS.get(cur+prj);
			if (!home.isDir()) home=home.up();
			curProjectDir=home;
		} else {
			var locs=location.href.replace(/\?.*/,"").split(/\//);
			prj=locs.pop() || "runscript";
			var user=locs.pop() || "nobody";
			home=FS.get(WebSite.tonyuHome);
			var ramHome=FS.get("/ram/");
			FS.mount(ramHome.path(), LSFS.ramDisk() );
			curProjectDir=ramHome;
			var actualFilesDir=home.rel(user+"/"+prj+"/");
			ramHome.rel("files/").link(actualFilesDir);
		}
		WebSite.compiledKernel="js/kernel.js";
		if (WebSite.serverType==="BA" && window.runtimePath) {//ADDBA
			WebSite.compiledKernel=window.runtimePath+"lib/tonyu/kernel.js";
		}
		root.loadFiles(curProjectDir);
		const curPrj=F.createDirBasedCore({dir:curProjectDir});
		curPrj.include(sysMod).include({
			getDependingProjects: ()=>[],
			async loadClasses() {
				await JS.load(WebSite.compiledKernel);
				await JS.load("js/concat.js");
			},
			loadPlugins(onload) {
				var opt=this.getOptions();
				return plugins.loadAll(opt.plugins,onload);
			},
			requestPlugin:e=>e
		});

		sh.cd(curProjectDir);
		/*var curPrj=CPTR("user", "js/concat.js",curProjectDir);*/
		Tonyu.globals.$mainCanvas=cv;
		Tonyu.runMode=true;// abolish
		Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);// abolish
		start();
		function start() {
			Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
			var o=curPrj.getOptions();
			curPrj.runScriptMode=true;
			curPrj.rawRun(o.run.bootClass);
		}
	});
	//console.log("runScript2 loaded");
});
