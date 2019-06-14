requirejs(["FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS",
			"runtime","WebSite","LSFS"],
		function (FS,  Tonyu_Project, sh,      KeyEventChecker, ScriptTagFS,
				rt,WebSite,LSFS) {
	$(function () {
		var home=FS.get(WebSite.tonyuHome);
		var ramHome=FS.get("/ram/");
		FS.mount(ramHome.path(), LSFS.ramDisk() );
		Tonyu.defaultResource={
				images:[
						{name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
						{name:"$pat_sample", url: "images/Sample.png"},
						{name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
						],
						sounds:[]
		};
		SplashScreen={
			hide: function () {$("#splash").hide();},
			show:function(){},
			progress:function(t) {$("#splash .progress").text(t);}
		};

		function getMargin() {
			return 0;
		}

		var margin = getMargin();
		var w=$(window).width();
		var h=$(window).height();
		$("body").css({overflow:"hidden", margin:"0px"});
		var cv=$("<canvas>").attr({width: w-margin, height: h-margin,class:"tonyu-canvas"}).appendTo("body");

		var u = navigator.userAgent.toLowerCase();
		if ((u.indexOf("iphone") == -1
			&& u.indexOf("ipad") == -1
			&& u.indexOf("ipod") == -1
		) && (!window.parent || window === window.parent) ) {
			$(window).resize(onResize);
			function onResize() {
				var margin = getMargin();
				w=$(window).width();
				h=$(window).height();
				cv.attr({width: w-margin, height: h-margin});
			}
		}

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
		var curPrj=Tonyu_Project(curProjectDir);//, kernelDir);
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
