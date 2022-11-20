/*global process, require, BuiltinAssets, requirejs, global */
define(["FS","Platform","root"], function (FS,Platform,root) {
	var P=FS.PathUtil;
	var loc=document.location.href;
	const WebSite=root.WebSite||{};
	root.WebSite=WebSite;
	WebSite.runType=WebSite.runType||root.WebSite_runType;
	var prot=location.protocol;
	var k;

	var VER=1668947437611;
	if (!prot.match(/^http/)) prot="https:";
	switch(WebSite.runType) {
	case "IDE":
		Object.assign(WebSite,{
			urlAliases: WebSite.urlAliases||{}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		});
		WebSite.builtinAssetNames={
			"images/Ball.png":{name:"$pat_ball", url: "images/Ball.png"},
			"images/base.png":{name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
			"images/Sample.png":{name:"$pat_sample", url: "images/Sample.png"},
			"images/inputPad.png":{name:"$pat_inputPad", url: "images/inputPad.png"},
			"images/neko.png":{name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
			"images/mapchip.png":{name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32}
		};
		if (!WebSite.pluginTop) {
			WebSite.pluginTop=WebSite.top+"/js/plugins";
		}
		WebSite.sampleImg=WebSite.top+"/images";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.mp4Disabled=WebSite.isNW;
		WebSite.tonyuHome="/Tonyu/";
		WebSite.PathSep="/";
		if (WebSite.isNW) {
			WebSite.PathSep=require("path").sep;
			WebSite.cwd=P.directorify(process.cwd().replace(/\\/g,"/"));
			//WebSite.exeDir=WebSite.execDir=P.up(P.fixSep(process.execPath)); not suitable when mac
			if (process.env.TONYU_HOME) {
				WebSite.tonyuHome=P.directorify(process.env.TONYU_HOME);
			} else {
				WebSite.tonyuHome=P.rel(WebSite.cwd,"fs/Tonyu/");
			}
			WebSite.logdir=process.env.TONYU_LOGDIR;//"C:/var/log/Tonyu/";
			WebSite.wwwDir=P.rel(WebSite.cwd,"www/");
			WebSite.platform=process.platform;
			WebSite.ffmpeg=P.rel(WebSite.cwd,(WebSite.platform=="win32"?
					"ffmpeg/bin/ffmpeg.exe":"ffmpeg/bin/ffmpeg"));
			WebSite.pkgInfo=require(P.rel(WebSite.cwd, "package.json"));
			if (process.env.TONYU_PROJECTS) {
				WebSite.projects=process.env.TONYU_PROJECTS.replace(/\\/g,"/").split(require('path').delimiter);
			} else if ( WebSite.pkgInfo && WebSite.pkgInfo.config && WebSite.pkgInfo.config.prjDirs ){
				WebSite.projects=WebSite.pkgInfo.config.prjDirs.map(function (d) {
					d=P.directorify(d);
					if (P.isAbsolute(d)) return d;
					return P.rel(WebSite.cwd,d);
				});
			} else {
				WebSite.projects=[P.rel(WebSite.cwd,"Projects/"),
					P.rel(WebSite.tonyuHome,"Projects/")];
			}
			WebSite.kernelDir=P.rel(WebSite.wwwDir,"Kernel/");
		} else {
			if (loc.match(/edit\.tonyu\.jp\/n\//)) {
				WebSite.wwwDir=prot+"//"+location.host+"/n/";
			} else {
				// Why?
				WebSite.wwwDir=prot+"//"+location.host+"/";
			}
			WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
		}
		//WebSite.kernelDir=WebSite.top+"/Kernel/";
		// kernelDir must be absolute
		WebSite.kernelDir=P.rel(WebSite.wwwDir,"Kernel/");
		// compiledKernel is URL , not file path.
		// It is correct as long as the html pages in www/ (not html/build|dev )
		WebSite.compiledKernel="Kernel/js/concat.js";   //P.rel(WebSite.kernelDir,"js/concat.js");
		WebSite.compiledTools={
			mapEditor2: "Tools/MapEditor2/js/concat.js",
		};
		setNS2DepSpec();
		if (loc.match(/localhost\/tonyu2/)) {
			WebSite.wwwDir=prot+"//"+location.host+"/tonyu2/";
			WebSite.kernelDir=WebSite.wwwDir+"Kernel/";
			WebSite.compiledKernel=WebSite.kernelDir+"js/concat.js";
			WebSite.uploadTmpUrl=prot+"//localhost/tsite/tonyu/e/cgi-bin/uploadTmp.cgi";
			WebSite.newVersionUrl=prot+"//localhost/tsite/tonyu/project/newVersion.cgi";
			WebSite.quickUploadURL=prot+"//localhost/tsite/tonyu/project/quickDone.cgi";
			WebSite.scriptServer="https://localhost/tonyu2/";
		} else {
			WebSite.uploadTmpUrl=prot+"//edit.tonyu.jp/cgi-bin/uploadTmp.cgi";
			WebSite.newVersionUrl=prot+"//www.tonyu.jp/project/newVersion.cgi";
			WebSite.quickUploadURL=prot+"//www.tonyu.jp/project/quickDone.cgi";
			WebSite.scriptServer="https://edit.tonyu.jp/";
		}
		FS.setEnvProvider(new FS.Env(WebSite));
		WebSite.sysVersion=VER;
		WebSite.version=2;
		WebSite.projectEditorURL="project2.html";
		setDefaultResource(WebSite);
		return WebSite;
	case "singleHTML":
		Object.assign(WebSite,{
			urlAliases: WebSite.urlAliases||{}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		});
		if (typeof BuiltinAssets==="object") {
			for (k in BuiltinAssets) {
				WebSite.urlAliases[k]=BuiltinAssets[k];
			}
		}

		WebSite.tonyuHome="/Tonyu/";
		WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
		if (loc.match(/localhost\/tonyu2/)) {
			WebSite.scriptServer="http://localhost/tonyu2/";
		} else {
			WebSite.scriptServer="https://edit.tonyu.jp/";
		}
		WebSite.pluginTop=WebSite.scriptServer+"js/plugins";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.PathSep="/";
		WebSite.compiledKernel=WebSite.scriptServer+"Kernel/js/concat.js";
		WebSite.compiledTools={
			mapEditor2: `${WebSite.scriptServer}Tools/MapEditor2/js/concat.js`,
		};
		setNS2DepSpec();
		FS.setEnvProvider(new FS.Env(WebSite));
		WebSite.sysVersion=VER;
		setDefaultResource(WebSite);
		return WebSite;
	case "multiHTML":
		Object.assign(WebSite,{
			urlAliases: WebSite.urlAliases||{}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		});
		WebSite.tonyuHome="/Tonyu/";
		WebSite.pluginTop=WebSite.top+"/js/plugins";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.PathSep="/";
		WebSite.mp4Disabled=WebSite.isNW;
		if (WebSite.isNW) {
			WebSite.PathSep=getPathSep();
			WebSite.cwd=P.directorify(process.cwd().replace(/\\/g,"/"));
			WebSite.platform=process.platform;
		}
		// this sets at runScript2.js
		//WebSite.compiledKernel=WebSite.top+"/js/kernel.js";
		//-------------
		FS.setEnvProvider(new FS.Env(WebSite));
		WebSite.sysVersion=VER;
		return WebSite;
	case "manual":// for BitArrow
		return WebSite;
	default:
		throw new Error("WebSite.runType is not set");
	}
	function setNS2DepSpec() {
		WebSite.ns2depspec=[
	        {namespace:"kernel", url: WebSite.compiledKernel},
	        {namespace:"mapEditor2", url: WebSite.compiledTools.mapEditor2},
	    ];
	}
	function setDefaultResource(WebSite) {
		WebSite.defaultResource={
	       images:[
	          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
	          {name:"$pat_sample", url: "images/Sample.png"},
	          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
	          {name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32}
	       ],
	       sounds:[]
	    };
	}
	//WebSite.blobPath=WebSite.serverTop+"/serveBlob";        //TODO: urlchange!
	/*WebSite.url={
		getDirInfo:WebSite.serverTop+"/getDirInfo",
		getFiles:WebSite.serverTop+"/File2LSSync",
		putFiles:WebSite.serverTop+"/LS2FileSync"
	};*/
	function getPathSep() {
		const requireTries=[
			()=>require("path"),
			()=>requirejs.nodeRequire("path"),
			()=>global.require("path")
		];
		for (let fsf of requireTries) {
			try {
				const path=fsf();
				if (typeof path.sep==="string") return path.sep;
			} catch(e){
			}
		}
		return "/";
	}
});
