define(["Klass","UI"],function (Klass,UI) {
return RunDialog=Klass.define({
    $this:true,
    $:function (t,param) {
        // desktopEnv,  screenH, onClose
        t.param=param;
        var d=UI("div",{
                id:"runArea",
                style:"text-align : center ;overflow:hidden;",
                class:"runArea"
            },
            ["canvas",{
                $var:"cv",id:"cv",width:465,height:465,
                class:"tonyu-canvas",
                style:" margin-left : auto ; margin-right : auto ;"
            }]
        );
        t.dom=d;
        t.canvas=d.$vars.cv;
    },
    close: function (t) {
        t.dom.dialog("close");
    },
    show: function (t,reset) {
        var d=t.dom;
        var param=t.param;
        var desktopEnv=param.desktopEnv;
        if (reset) desktopEnv.runDialog={};
        t.size=desktopEnv.runDialog||(desktopEnv.runDialog={});
        var size=t.size;
        t.cv=d.$vars.cv;
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
                },
                close:function () {
                    t.opened=false;
                    t.param.onClose();
                }
            });
            t.shownOnce=true;
        } else {
            d.dialog();
        }
        t.opened=true;
        $(".ui-dialog-titlebar-close").blur();
        t.resizeCanvas(d.width(),d.height());
        console.log("Diag",size);
    },
    resizeCanvas: function (t,w,h) {
        console.log("canvas size",w,h);
        t.cv.attr("height", h).attr("width",w);
    }
});
});
