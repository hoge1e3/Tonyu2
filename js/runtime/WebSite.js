define([], function () {
    var loc=document.location.href;
    var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
    if (loc.match(/jsrun\.it/)) {
        window.WebSite={
            urlAliases: {
                "images/Ball.png":"http://jsrun.it/assets/9/X/T/b/9XTbt.png",
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png",
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
        window.WebSite={
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
        window.WebSite={
           urlAliases: {}, top: "../..",devMode:devMode
        };
    }
    if (!window.WebSite.pluginTop) {
        window.WebSite.pluginTop=window.WebSite.top+"/js/plugins";
    }
    window.WebSite.disableROM={};
	if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
	    //window.WebSite.disableROM={"ROM_d.js":true};
	}
    if (loc.match(/\.appspot\.com/) ||  loc.match(/localhost:888[87]/)) {
        window.WebSite.serverType="GAE";
    }
    if (loc.match(/localhost:3000/) ) {
        window.WebSite.serverType="Node";
    }
    if (loc.match(/tonyuexe\.appspot\.com/) ||
        loc.match(/localhost:8887/)) {
        window.WebSite.serverTop=window.WebSite.top+"/exe"; // Fix NetModule.tonyu!!
    } else {
        window.WebSite.serverTop=window.WebSite.top+"/edit";// Fix NetModule.tonyu!!
    }
    window.WebSite.sampleImg=window.WebSite.top+"/images";
    window.WebSite.blobPath=window.WebSite.serverTop+"/serveBlob";        //TODO: urlchange!
    window.WebSite.isNW=(typeof process=="object" && process.__node_webkit);
    window.WebSite.tonyuHome="/Tonyu/";
    if (window.WebSite.isNW) {
        if (process.env.TONYU_HOME) {
            window.WebSite.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
        } else {
            window.WebSite.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
        }
    }
    return window.WebSite;
});
