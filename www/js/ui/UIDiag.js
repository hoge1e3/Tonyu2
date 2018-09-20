define(["UI"],function (UI) {
    var UIDiag={};
    function parseMesg(mesg,defTitle) {
        if (typeof mesg==="string" || ( (typeof $!=="undefined") && mesg instanceof $)) return {
            title:mesg.title||defTitle,
            body:mesg
        };
        return mesg;
    }
    UIDiag.confirm=function (mesg) {
        mesg=parseMesg(mesg,"確認");
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["button",{on:{click:sendF(true)}},"OK"],
                ["button",{on:{click:sendF(false)}},"キャンセル"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    UIDiag.alert=function (mesg) {
        mesg=parseMesg(mesg,"確認");
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["button",{on:{click:sendF(true)}},"OK"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    // Compat with $InputBox
    UIDiag.open=function(title,prompt,_default, left, top, width, height) {
        return UIDiag.prompt({title:title,body:prompt},_default,{
            left:left, top:top, width:width, height:height
        });
    };
    UIDiag.getStatus=function () {return UIDiag.status;};
    UIDiag.getText=function () {return UIDiag.resultValue;};
    //---
    UIDiag.prompt=function (mesg,value,geom) {
        mesg=parseMesg(mesg,"入力");
        geom=geom||{};
        if (typeof geom.left==="number" && typeof geom.top==="number") {
            position={my:"left top",at:"left+"+geom.left+" top+"+geom.top, of:"body"};
        } else {
            position={of:"body",at:"center",my:"center"};
        }
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["input",{on:{enterkey:ok},$var:"val", value:value}],["br"],
                ["button",{on:{click:ok}},"OK"],
                ["button",{on:{click:cancel}},"キャンセル"]).dialog({
                    width:geom.width||"auto",
                    height:geom.height||"auto",
                    position:position,
                    close:function (){
                        di.dialog("close");
                        d.resolve();
                    }
                });
        setTimeout(function () {
            di.$vars.val.focus();
            //console.log("FOcus");
        },10);
        UIDiag.status=0;
        var d=$.Deferred();
        function ok() {
            UIDiag.status=1;
            var r=di.$vars.val.val();
            UIDiag.resultValue=r;
            d.resolve(r);
            di.dialog("close");
            di.remove();
        }
        function cancel() {
            UIDiag.status=2;
            di.dialog("close");
            di.remove();
            d.resolve();
        }
        return d.promise();

    };
    if (typeof window!="undefined") window.UIDiag=UIDiag;
    return UIDiag;
});
