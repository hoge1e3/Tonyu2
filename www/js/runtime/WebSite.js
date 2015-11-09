define([], function () {
    var loc=document.location.href;
    var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
    var WebSite;
    if (loc.match(/jsrun\.it/)) {
        WebSite={
            urlAliases: {
                "images/Ball.png":"http://jsrun.it/assets/9/X/T/b/9XTbt.png",
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/f/D/z/z/fDzze.png",//"http://jsrun.it/assets/j/D/9/q/jD9qQ.png",
                "images/mapchip.png":"http://jsrun.it/assets/f/u/N/v/fuNvz.png",
                "images/inputPad.png":"http://jsrun.it/assets/r/K/T/Y/rKTY9.png"
            },top:"",devMode:devMode, pluginTop: "http://tonyuedit.appspot.com/js/plugins",
            removeJSOutput:true
        };
    } else if (
      loc.match(/tonyuexe\.appspot\.com/) ||
      loc.match(/localhost:8887/) ||
 	  (
 	    /*(
 	       loc.match(/^file:/) ||
 	       loc.match(/localhost/) ||
	       loc.match(/tonyuedit\.appspot\.com/)
	    ) &&*/
	    loc.match(/\/html\/((dev)|(build))\//)
	  )
    ) {
        WebSite={
            urlAliases: {
                "images/Ball.png":"../../images/Ball.png",
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                "images/sound.png":"../../images/sound.png",
                    "images/ecl.png":"../../images/ecl.png"
            },top:"../..",devMode:devMode
        };
    } else {
        WebSite={
           urlAliases: {}, top: ".",devMode:devMode
        };
    }
    // from https://w3g.jp/blog/js_browser_sniffing2015
    var u=window.navigator.userAgent.toLowerCase();
    WebSite.tablet=(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
    || u.indexOf("ipad") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
    || u.indexOf("kindle") != -1
    || u.indexOf("silk") != -1
    || u.indexOf("playbook") != -1;
    WebSite.mobile=(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
    || u.indexOf("iphone") != -1
    || u.indexOf("ipod") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
    || u.indexOf("blackberry") != -1;

    if (!WebSite.pluginTop) {
        WebSite.pluginTop=WebSite.top+"/js/plugins";
    }
    WebSite.disableROM={};
	if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
	    //WebSite.disableROM={"ROM_d.js":true};
	}
    if (loc.match(/\.appspot\.com/) ||  loc.match(/localhost:888[87]/)) {
        WebSite.serverType="GAE";
    }
    if (loc.match(/localhost:3000/) ) {
        WebSite.serverType="Node";
    }
    if (loc.match(/tonyuexe\.appspot\.com/) ||
        loc.match(/localhost:8887/)) {
        WebSite.serverTop=WebSite.top+"/exe"; // Fix NetModule.tonyu!!
    } else {
        WebSite.serverTop=WebSite.top+"/edit";// Fix NetModule.tonyu!!
    }
    WebSite.sampleImg=WebSite.top+"/images";
    WebSite.blobPath=WebSite.serverTop+"/serveBlob";        //TODO: urlchange!
    WebSite.isNW=(typeof process=="object" && process.__node_webkit);
    WebSite.mp3Disabled=WebSite.isNW;
    WebSite.tonyuHome="/Tonyu/";
    WebSite.url={
        getDirInfo:WebSite.serverTop+"/getDirInfo",
        getFiles:WebSite.serverTop+"/File2LSSync",
        putFiles:WebSite.serverTop+"/LS2FileSync"
    };
    if (WebSite.isNW) {
        WebSite.cwd=process.cwd().replace(/\\/g,"/").replace(/\/?$/,"/");
        if (process.env.TONYU_HOME) {
            WebSite.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/").replace(/\/?$/,"/");
        } else {
            WebSite.tonyuHome=WebSite.cwd+"fs/Tonyu/";
        }
        WebSite.logdir="/var/log/Tonyu/";
        WebSite.wwwDir=WebSite.cwd+"www/";
        WebSite.kernelDir=WebSite.wwwDir+"Kernel/";
        WebSite.ffmpeg=WebSite.cwd+("ffmpeg/bin/ffmpeg.exe");
    }
    if (loc.match(/tonyuedit\.appspot\.com/) ||
        loc.match(/localhost:888/) ||
        WebSite.isNW) {
        WebSite.compiledKernel=WebSite.top+"/Kernel/js/concat.js";
    } else {
        WebSite.compiledKernel="http://tonyuexe.appspot.com/Kernel/js/concat.js";
    }
    return window.WebSite=WebSite;
});
