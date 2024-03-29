define(function (require, exports) {
    const WebSite=require("WebSite");
    const Mesg=require("Mesg");
    let sender,button,thePrj;
    exports.show=function (prj) {
        thePrj=prj;
        if (WebSite.useEditButton) {
            Mesg.init().then(()=>{
                /*
                <button style="position:absolute; left: 10px; top:10px; opacity:75%; padding:5px 10px 5px 10px;">
                    <div style="font-size: 20px">🖊</div>
                    <div>Edit</div>
                </button>*/
                button=$("<button>").
                html(`<div style="font-size: 20px">🖊</div><div>Edit</div>`).
                click(()=>doEdit(prj)).
                css({"position":"absolute",left:10,top:10,opacity:"75%",padding:"5px 10px 5px 10px"}).
                appendTo("body");
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
    exports.openEditor=()=>doEdit(thePrj);
    async function doEdit(prj) {
        button.prop("disabled",true);
        sender=Mesg.createSender();
        const url=sender.genURL(WebSite.scriptServer);
        console.log(url);
        window.open(url);
        await sender.waitForReceiver();
        startComm(prj);
    }
    function startComm(prj) {
        let sopt={};
        try {
            sopt=prj.getOptions().social||{};
        }catch(e) {
        }
        console.log(sopt);
        let buf="";
        $("script").each(function () {
            if ($(this).attr("data-filename")) buf+=$(this).prop("outerHTML")+"\n";
        });
        let url=location.href;
        const link=document.querySelector('link[rel="canonical"]');
        if (link) url=link.href;
        const chompQS=s=>url.match(/run\.tonyu\.jp/)?s:s.replace(/\?.*/,"");
        let defName="";
        if (sopt.prjName) {
            defName=sopt.prjName;
        }else {
            defName=chompQS(url).replace(/\/$/,"").replace(/.html?$/i,"");
            defName.replace(/([a-zA-Z0-9\-\._]+)$/,(_0,_1)=>{
                defName=_1;
            });
            defName=defName.replace(/[^a-zA-Z0-9\-\.\_]/g,"");
        }
        if (defName==="") defName="example";
        const whenPrjDirExists=sopt.whenPrjDirExists;
        sender.postMessage({
            type:"import",
            url,
            defName,whenPrjDirExists,
            content:buf//"<html>"+document.querySelector("html").innerHTML+"</html>"
        });
        sender.dispose();
        sender=null;
        button.prop("disabled",false);
    }
    //exports={};
});
