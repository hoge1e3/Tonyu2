define(function (require, exports) {
    const WebSite=require("WebSite");
    exports.show=function () {
        if (WebSite.useEditButton) {
            $("<button>").text("Edit...").click(doEdit).
            css({"position":"absolute",left:0,top:0}).appendTo("body");
        }
    };
    let commOK,wnd;
    window.addEventListener("message",function (e) {
        console.log(e);
        if (e.data.type=="pong") {
            commOK=true;
        }
    });
    function doEdit() {
        commOK=false;
        wnd=window.open(WebSite.scriptServer);
        sendPing();
    }
    function sendPing() {
        wnd.postMessage({type:"ping"}, WebSite.scriptServer.replace(/\/tonyu2\/?/,""));
        if (!commOK) setTimeout(sendPing,500);
        else startComm();
    }
    function startComm() {
        let buf="";
        $("script").each(function () {
            if ($(this).attr("data-filename")) buf+=$(this).prop("outerHTML")+"\n";
        });
        let url=location.href;
        const link=document.querySelector('link[rel="canonical"]');
        if (link) url=link.href;
        let defName=url.replace(/\/$/,"").replace(/.html?$/i,"");
        defName.replace(/([a-zA-Z0-9\-]+)$/,(_0,_1)=>{
            defName=_1;
        });
        defName=defName.replace(/[^a-zA-Z0-9\-]/g,"");

        wnd.postMessage({
            type:"import",
            url,
            defName,
            content:buf//"<html>"+document.querySelector("html").innerHTML+"</html>"
        },WebSite.scriptServer);
    }
    //exports={};
});
