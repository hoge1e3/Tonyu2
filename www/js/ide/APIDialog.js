define(function (require, exports, module) {
    const UI=require("UI");
    const R=require("R");
    /*const IDEProject=require("IDEProject");
    const WebSite=require("WebSite");
    const jshint=require("jshint");*/
    module.exports=class {
        constructor(api, options) {
            this.options=options;
            this.api=api;
        }
        createElem() {
            this.elem=this.elem||UI("div",{title:R("ApiInfo")},
                ["h1", R("Websocket")],
                    ["div",R("service"),
                        ["select",{$var:"wsService", name:"wsService"},
                            ["option",{value:"ScaleDrone"},"ScaleDrone"],
                        ]],
                    ["div",R("ApiKey"),
                        ["input",{$var:"wsKey"}]],
            );
            const v=this.elem.$vars;
            this.ui_wsService=v.wsService;
            this.ui_wsKey=v.wsKey;
            return this.elem;
        }
        load() {
            this.createElem();
            const conf=this.api.get();
            if (conf.webSocket) {
                const ws=conf.webSocket;
                this.ui_wsService.val(ws.service||"ScaleDrone");
                this.ui_wsKey.val(ws.key);
            }
            this.conf=conf;
        }
        update() {
            const conf=this.conf;
            if (!conf) return;
            if (!conf.webSocket) conf.webSocket={};
            const ws=conf.webSocket;
            ws.service=this.ui_wsService.val();
            ws.key=this.ui_wsKey.val();
            console.log("Save conf",conf);
            this.api.set(conf);
        }
        show() {
            const e=this.createElem();
            this.load();
            e.dialog({width:600,height:400,close:this.update.bind(this)});
        }

    };
});
