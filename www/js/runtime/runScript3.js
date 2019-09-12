/*global requirejs*/
requirejs(["FS","Tonyu","Run3Project",
			"runtime","WebSite","root","runScript_common","Util","StackDecoder"],
		function (FS,  Tonyu, Run3Project,
				rt,WebSite,root,com,Util,StackDecoder) {
	$(function () {
		var prjPath=Util.getQueryString("prj");
		var cv=com.initCanvas();

		var curProjectDir=FS.resolve(prjPath);
		//sh.cd(curProjectDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		var curPrj=Run3Project.create({dir:curProjectDir});//, kernelDir);
		curPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		Tonyu.onRuntimeError=e=>{
			console.error(e);
			StackDecoder.decode(e);
		};
		//--todo abolish
		Tonyu.animationFrame=function () {
			return new Promise( function (f) {
				requestAnimationFrame(f);
			});
		};
		//----
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
