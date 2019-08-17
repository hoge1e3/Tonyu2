/*global requirejs*/
requirejs(["FS","Tonyu","Tonyu.Project","Shell","ScriptTagFS",
			"runtime","WebSite","root","runScript_common","Util"],
		function (FS,  Tonyu, Tonyu_Project, sh, ScriptTagFS,
				rt,WebSite,root,com,Util) {
	$(function () {
		var prjPath=Util.getQueryString("prj");
		var cv=com.initCanvas();

		var curProjectDir=FS.resolve(prjPath);
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
