define(function(require, exports, module) {
    const UI = require("UI");
    const R = require("R");
    const PopupWindow = require("PopupWindow");
    class DebugDialog {
        constructor(param) {
            const t = this;
            // desktopEnv,  screenH, onClose
            t.param = param;
            var d = UI("div", {
                id: "runArea",
                style: "text-align : center ;overflow:hidden;",
                class: "runArea"
            },
                ["iframe", {
                    $var: "iframe", id: "iframe", src: "about:blank", width: 465, height: 465,
                    class: "tonyu-canvas",
                    style: " margin-left : auto ; margin-right : auto ; border: 0px;"
                }]
            );
            t.dom = d;
            t.iframe = d.$vars.iframe;
            t.project = param.ide.project;
            //t.savedFeature="popup";
        }
        close() {
            this.forceClose = true;
            this.dom.dialog("close");
            this.forceClose = false;
        }
        resize(size) {
            // size: {left,top,width,height};
            this.show(false, size);
        }
        show(reset, size) {
            const t = this;
            let param = t.param;
            var d = t.dom;
            var desktopEnv = param.desktopEnv;
            if(desktopEnv.runInSeparateWindow) {
                if (t.openedWindow) {
                    t.openedWindow.reopen();
                } else {
                    t.openedWindow=new PopupWindow("debug.html?prj=" + param.prj);
                }
                return;
            }
            const doResize=!!size;
            if (reset || !desktopEnv.runDialog) desktopEnv.runDialog = {};
            size=Object.assign(desktopEnv.runDialog, size||{});
            t.size=size;
            t.iframe = d.$vars.iframe;
            size.width = size.width || ($(window).width() - 100) / 2 - 20;
            size.height = size.height || param.screenH - 20;
            if (!t.shownOnce || reset || doResize) {
                console.log("DIag::show", size);
                d.dialog({
                    width: size.width,
                    height: size.height,
                    position: size.top ?
                        {
                            my: "left top",
                            at: "left+" + size.left + " top+" + size.top,
                            of: $("#navBar")
                        } :
                        { my: "right top", at: "right-10 bottom+10", of: $("#navBar") },
                    resize: function(e, ngeom) {
                        size.width = d.width();
                        size.height = d.height();
                        t.resizeCanvas(d.width(), d.height());
                        if (ngeom) {
                            size.width = ngeom.size.width;
                            size.height = ngeom.size.height;
                            size.left = ngeom.position.left;
                            size.top = ngeom.position.top;
                            t.modified = true;
                        }
                    },
                    drag: function(e, ngeom) {
                        if (ngeom) {
                            size.left = ngeom.position.left;
                            size.top = ngeom.position.top;
                            t.modified = true;
                        }
                        t.focusToIframe();
                    },
                    close: function() {
                        t.opened = false;
                        //if (t.cloned) t.cloned.close();
                        console.log("t.param.onClose",t.param.onClose);
                        if (t.param.onClose) t.param.onClose();
                        t.iframe.attr("src", "about:blank");
                    },
                    beforeClose: function() {
                        if (t.param.isCloned) return true;
                        if (t.forceClose) return true;
                        t.param.ide.stop({ closeAfterStop: true });
                        return false;
                    },
                    focus: function() {
                        console.log("fo-casu");

                    }
                });
                if (!t.shownOnce) {
                    t.titleArea = d.closest(".ui-widget").find(".ui-dialog-title");
                    t.autoReloadCheck = UI("input", { type: "checkbox", on: { change } });
                    if (!t.param.isCloned) t.cloneButton = UI("button", { on: { click: t.clone.bind(t) } }, "+");
                    else t.cloneButton="(clone)";
                    t.titleArea.append(UI("span", t.autoReloadCheck, R("autoReload"), t.cloneButton));
                    d.closest(".ui-widget").find(".ui-dialog-titlebar").click(() => t.focusToIframe());
                }
                t.shownOnce = true;
            } else {
                d.dialog();
            }
            if (!reset && !doResize) t.iframe.attr("src", "debug.html?prj=" + param.prj+(t.param.isCloned? "&nodebug=1":""));
            t.opened = true;
            $(".ui-dialog-titlebar-close").blur();
            t.focusToIframe();
            t.resizeCanvas(d.width(), d.height());
            console.log("Diag", size);
            function change() {
                try {
                    const ch = t.autoReloadCheck.prop("checked");
                    //console.log(ch);
                    t.iframeGlobals().$Boot.autoReload = ch;
                    t.project.startWithAutoReload = ch;
                } catch (e) {
                    console.log(e);
                }
            }
            /*setInterval(()=>{
                try {
                    const ar=t.iframeGlobals().$Boot.autoReload;
                    t.autoReloadCheck.prop("checked",!!ar);
                    if (ar===true) t.iframeGlobals.$autoReloadWasTrue=ar;
                }catch(e){
                    console.log(e);
                }
            },1000);*/
            if (this.cloned) this.cloned.show();
        }
        clone() {
            const p = Object.assign({}, this.param);
            if (p.desktopEnv && p.desktopEnv.runDialog) {
                p.desktopEnv = {
                    runDialog: Object.assign({}, p.desktopEnv.runDialog)
                };
                p.desktopEnv.runDialog.left += 30;
                p.desktopEnv.runDialog.top += 30;
            }
            p.isCloned=true;
            //p.onClose=()=>this.close();
            const cloned = new DebugDialog(p);
            cloned.show();
        }
        resizeCanvas(w, h) {
            //console.log("canvas size",w,h);
            this.iframe.attr("height", h).attr("width", w);
            try {
                this.iframeGlobals().$mainCanvas.attr("height", h).attr("width", w);
            } catch (e) {
                console.log(e);
            }
        }
        iframeGlobals() {
            return this.iframe[0].contentWindow.Tonyu.globals;
        }
        focusToIframe() {
            try {
                this.iframe[0].contentWindow.focus();
            } catch (e) {
                console.log(e);
            }
        }
    }
    module.exports = DebugDialog;
});
