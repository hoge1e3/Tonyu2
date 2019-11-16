define(function (require,exports, module) {
const UI=require("UI");
module.exports=class {
    constructor(param) {
        const t=this;
        // desktopEnv,  screenH, onClose
        t.param=param;
        var d=UI("div",{
                id:"runArea",
                style:"text-align : center ;overflow:hidden;",
                class:"runArea"
            },
            ["iframe",{
                $var:"iframe",id:"iframe",src:"about:blank",width:465,height:465,
                class:"tonyu-canvas",
                style:" margin-left : auto ; margin-right : auto ;"
            }]
        );
        t.dom=d;
        t.iframe=d.$vars.iframe;
    }
    close() {
        this.forceClose=true;
        this.dom.dialog("close");
        this.forceClose=false;
    }
    show(reset) {
        const t=this;
        var d=t.dom;
        var param=t.param;
        var desktopEnv=param.desktopEnv;
        if (reset) desktopEnv.runDialog={};
        t.size=desktopEnv.runDialog||(desktopEnv.runDialog={});
        var size=t.size;
        t.iframe=d.$vars.iframe;
        size.width=size.width||($(window).width()-100)/2-20;
        size.height=size.height||param.screenH-20;
        if (!t.shownOnce || reset) {
            console.log("DIag::show",size);
            d.dialog({
                width:size.width,
                height:size.height,
                position:size.top?
                {
                    my: "left top",
                    at: "left+"+size.left+" top+"+size.top
                }:
                {my:"right top",at:"right-10 bottom+10",of:$("#navBar")},
                resize:function (e,ngeom) {
                    size.width=d.width();
                    size.height=d.height();
                    t.resizeCanvas(d.width(),d.height());
                    if (ngeom) {
                        size.width=ngeom.size.width;
                        size.height=ngeom.size.height;
                        size.left=ngeom.position.left;
                        size.top=ngeom.position.top;
                        t.modified=true;
                    }
                },
                drag: function (e,ngeom) {
                    if (ngeom) {
                        size.left=ngeom.position.left;
                        size.top=ngeom.position.top;
                        t.modified=true;
                    }
                    t.iframe.focus();
                },
                close:function () {
                    t.opened=false;
                    if (t.param.onClose) t.param.onClose();
                    t.iframe.attr("src","about:blank");
                },
                beforeClose: function () {
                    if (t.forceClose) return true;
                    t.param.ide.stop({closeAfterStop:true});
                    return false;
                },
                focus: function () {
                    console.log("fo-casu");

                }
            });
            t.shownOnce=true;
        } else {
            d.dialog();
        }
        t.titleBar=d.closest(".ui-widget").find(".ui-dialog-title");
        t.autoReloadCheck=UI("input",{type:"checkbox",on:{change}});
        t.titleBar.append(UI("span",t.autoReloadCheck,"自動再実行"));
        t.iframe.attr("src","debug.html?prj="+param.prj);
        t.opened=true;
        $(".ui-dialog-titlebar-close").blur();
        t.iframe.focus();
        t.resizeCanvas(d.width(),d.height());
        console.log("Diag",size);
        function change() {
            try {
                const ch=t.autoReloadCheck.prop("checked");
                console.log(ch);
                t.iframeGlobals().$Boot.autoReload=ch;
            }catch(e){
                console.log(e);
            }
        }
        setInterval(()=>{
            try {
                t.autoReloadCheck.prop("checked",!!t.iframeGlobals().$Boot.autoReload);
            }catch(e){
                console.log(e);
            }
        },1000);
    }
    resizeCanvas(w,h) {
        //console.log("canvas size",w,h);
        this.iframe.attr("height", h).attr("width",w);
        try {
            this.iframeGlobals().$mainCanvas.attr("height", h).attr("width",w);
        }catch(e) {
            console.log(e);
        }
    }
    iframeGlobals() {
        return this.iframe[0].contentWindow.Tonyu.globals;
    }
};
});
