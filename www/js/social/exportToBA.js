define(function (require,exports,module){
//--- begin define
const mkrun=require("mkrun");
const Sync=require("Sync");
const WebSite=require("WebSite");
const FS=require("FS");
const R=require("R");
exports.run=async (prj)=>{
    const SS=(window.SplashScreen|| {
        show(){},
        hide(){},
    });
    SS.show();
    try {
        prj.removeThumbnail();
        const tmp=mkrun.tmpDir();
        await mkrun.run(prj, tmp,{WebSite:{
            pubURLOfPrj: WebSite.pubURLOfPrj_service,
            runtime: WebSite.baRuntime_service,
        }});
        await Sync.sync(tmp, FS.get(WebSite.pubDirOfPrj), {excludes:["images/","sounds/"]});
        const runURL=WebSite.pubURLOfPrj_service;
        console.log("open",runURL);
        const cv=$("<div>");
        cv.dialog();
        cv.append($("<div>").append(
            $("<a>").attr({target:"runit",href:runURL}).text(R("openURLInNewWindow"))
        ));
        cv.append($("<div>").qrcode({width:200,height:200,text:runURL}));    
    } finally {
        SS.hide();
    }
};

//---- end define
});
