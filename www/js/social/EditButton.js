define(function (require, exports) {
    const WebSite=require("WebSite");
    const Mesg=require("Mesg");
    let sender,button;
    exports.show=function () {
        if (WebSite.useEditButton) {
            Mesg.init().then(()=>{
                button=$("<button>").text("Edit...").click(doEdit).
                css({"position":"absolute",left:0,top:0}).appendTo("body");
            });
        }
    };
    //let commOK,wnd;
    /*window.addEventListener("message",function (e) {
        console.log(e);
        if (e.data.type=="pong") {
            commOK=true;
        }
    });*/
    async function doEdit() {
        button.prop("disabled",true);
        sender=Mesg.createSender();
        const url=sender.genURL(WebSite.scriptServer);
        console.log(url);
        window.open(url);
        await sender.waitForReceiver();
        startComm();
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
        sender.postMessage({
            type:"import",
            url,
            defName,
            content:buf//"<html>"+document.querySelector("html").innerHTML+"</html>"
        });
        sender.dispose();
        sender=null;
        button.prop("disabled",false);
    }
    //exports={};
});
