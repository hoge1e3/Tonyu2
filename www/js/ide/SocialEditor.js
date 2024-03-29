define(function (require, exports, module) {
    const UI=require("UI");
    const R=require("R");
    /*const IDEProject=require("IDEProject");
    const WebSite=require("WebSite");
    const jshint=require("jshint");*/
    module.exports=class {
        constructor(prj, options) {
            this.options=options;
            this.prj=prj;
        }
        createElem() {
            this.elem=this.elem||UI("div",{title:R("socialEditor")},
                ["h1", R("socialEditor")],
                    ["div",R("title"),
                        ["input",{$var:"title", on:{input:this.onEditTitle.bind(this)}}]],
                ["h1", R("importOption")],
                    ["div",R("projectName"),
                        ["input",{$var:"prjName", on:{input:this.onEditPrjName.bind(this)}}]],
                    ["div", R("whenPrjDirExists"),
                        ["select", {$var:"whenPrjDirExists" , on:{input:this.onEditOP.bind(this)}},
                            ["option",{value:"selectPolicy"},R("selectPolicy")],
                            ["option",{value:"selectOtherFolder"},R("selectOtherFolder")],
                            ["option",{value:"openTheProjectWithoutOverwrite"},R("openTheProjectWithoutOverwrite")],
                        ]
                    ]
            );
            const v=this.elem.$vars;
            this.ui_title=v.title;
            this.ui_prjName=v.prjName;
            this.ui_overwritePolicy=v.whenPrjDirExists;
            return this.elem;
        }
        load(opt) {
            this.createElem();
            this.popt=opt;
            this.popt.social=this.popt.social||{
                prjName: this.prj.getDir().name().replace(/\//,"")
            };
            const sopt=this.popt.social;
            sopt.title=sopt.title||sopt.prjName;
            sopt.whenPrjDirExists=sopt.whenPrjDirExists||"selectPolicy";
            this.ui_title.val(sopt.title);
            this.ui_prjName.val(sopt.prjName);
            this.ui_overwritePolicy.val(sopt.whenPrjDirExists);
        }
        update() {
            const popt=this.popt;
            if (!popt) return;
            this.prj.setOptions(popt);
        }
        show(opt) {
            const e=this.createElem();
            this.load(opt);
            e.dialog({width:600,height:400,close:this.update.bind(this)});
        }
        onEditTitle() {
            const sopt=this.popt.social;
            //const syncTP=sopt.title===sopt.prjName;
            const nv=this.ui_title.val();
            sopt.title=nv;
            /*if (syncTP) {
                this.ui_prjName.val(nv);
                this.popt.title=nv;
            }*/
        }
        onEditPrjName() {
            const sopt=this.popt.social;
            //const syncTP=sopt.title===sopt.prjName;
            const nv=this.ui_prjName.val();
            sopt.prjName=nv;
            /*if (syncTP) {
                this.ui_title.val(nv);
                this.popt.prjName=nv;
            }*/
        }
        onEditOP() {
            const sopt=this.popt.social;
            const nv=this.ui_overwritePolicy.val();
            sopt.whenPrjDirExists=nv;
        }
    };
});
