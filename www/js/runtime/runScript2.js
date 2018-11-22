requirejs(["FS","compiledTonyuProject","Shell","runtime","WebSite","LSFS","Tonyu","NativeFS"],
		function (FS,  CPTR, sh,  rt,WebSite,LSFS,Tonyu) {
	$(function () {

		SplashScreen={
			hide: function () {$("#splash").hide();},
			show:function(){},
			progress:function(t) {$("#splash").text(t);}
		};

		function getMargin() {
			return 0;
		}

		var margin = getMargin();
		var w=$(window).width();
		var h=$(window).height();
		$("body").css({overflow:"hidden", margin:"0px"});
		var cv=$("<canvas>").attr({width: w-margin, height:h-margin, class:"tonyu-canvas"}).appendTo("body");
		Tonyu.globals.$mainCanvas=cv;

		var u = navigator.userAgent.toLowerCase();
		if ((u.indexOf("iphone") == -1
			&& u.indexOf("ipad") == -1
			&& u.indexOf("ipod") == -1
			) && (!window.parent || window === window.parent)) {
			$(window).resize(onResize);
			function onResize() {
				var margin = getMargin();
				w=$(window).width();
				h=$(window).height();
				cv.attr({width: w-margin, height: h-margin});
			}
		}

		var curProjectDir;
		if (WebSite.isNW) {
			var cur=process.cwd().replace(/\\/g,"/");
			var prj=location.href.replace(/^chrome-extension:\/\/\w*/,"");
			home=FS.get(cur+prj);
			if (!home.isDir()) home=home.up();
			curProjectDir=home;
		} else {
			var locs=location.href.replace(/\?.*/,"").split(/\//);
			var prj=locs.pop() || "runscript";
			var user=locs.pop() || "nobody";
			var home=FS.get(WebSite.tonyuHome);
			var ramHome=FS.get("/ram/");
			FS.mount(ramHome.path(), LSFS.ramDisk() );
			curProjectDir=ramHome;
			var actualFilesDir=home.rel(user+"/"+prj+"/");
			ramHome.rel("files/").link(actualFilesDir);
		}

		loadFiles(curProjectDir);
		sh.cd(curProjectDir);
		WebSite.compiledKernel="js/kernel.js";
		if (WebSite.serverType==="BA" && window.runtimePath) {//ADDBA
			WebSite.compiledKernel=window.runtimePath+"lib/tonyu/kernel.js";
		}
		var curPrj=CPTR("user", "js/concat.js",curProjectDir);
		start();
		function start() {
			Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
			var o=curPrj.getOptions();
			curPrj.runScriptMode=true;
			curPrj.run(o.run.bootClass);
		}
	});
});
