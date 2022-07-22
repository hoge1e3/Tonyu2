define(["UI","UIDiag","WebSite","extLink","mkrun","Tonyu","zip","DeferredUtil","FS","root","jshint","R"],
function (UI,UIDiag, WebSite, extLink,mkrun,Tonyu,zip,DU,FS,root,jshint,R) {
    var res={};
    res.show=function (prj,dest,options) {
        var d=res.embed(prj,dest,options);
        d.dialog({width:800,height:400});
    };
    res.embed=function (prj,/*dest,*/options) {
        options=options||{};
        var dest=options.dest;
        var onComplete=options.onComplete||(function(){});
        var ote={
            click: function () {
                if (outtype.value==="dir") {
                    vars.dest.prop("disabled",false);
                } else {
                    vars.dest.prop("disabled",true);
                }
            }
        };
        if (!res.d) {
            res.d=UI("div",{title:R("createExecutable")},
                  // ["span", {$var:"hiddenFolder"},
                  ["form",{action:jshint.scriptURL(";"),$var:"form",name:"mkrunform"},
                ["h1",R("howToOutput")],
                    ["div",
                        ["input", {type:"radio",name:"outtype",value:"zip",on:ote}],
                        ["label",{"for":"outtype"},R("saveExecutableAsZip")]
                    ],//],
                    ["div",
                        ["input", {type:"radio",name:"outtype",value:"prj",on:ote}],
                        ["label",{"for":"outtype"},R("uploadToProjectBoard")]
                    ],//],
                    ["div",{$var:"folder"},
                        ["input",{type:"radio",name:"outtype",value:"dir",on:ote}],
                        ["label",{"for":"dest"},R("saveExecutableAtFolder")],["br"],
                        ["input", {$var:"dest",id:"dest",$edit:"dest",size:60}]
                    ],
                ["h1",R("executableOptions")],
                    ["div",
                        ["input", {id:"src",$edit:"src",type:"checkbox"}],
                        ["label",{"for":"src"},R("attachSourceFiles")],
                        ["div",
                        {"class":"srcwarn"},
                        R("ifSourceFilesAreAttached")+
                        R("ItCanBeEditableInProjectBoard")]
                    ],
                    ["button", {$var:"OKButton", on:{click: function () {
                         res.run();
                    }}}, R("createExecutable")],
                    ["span",{$var:"progress"}]
                ]
            );
        }
        var vars=res.d.$vars;
        vars.OKButton.prop("disabled", false);
        if (!options.dest) {
            vars.folder.hide();
        } else {
            vars.folder.show();
        }
        var model={dest:(dest && dest.path)?dest.path():(dest||""), src:true, zip:true,IE:false};
        var form=vars.form[0];
        var outtype=form.outtype;
        vars.dest.prop("disabled",true);
        outtype.value="zip";
        res.d.$edits.load(model);
        res.run=function () {
            var type=outtype.value;
            res.d.$vars.OKButton.prop("disabled", true);
            var opt={copySrc:model.src};
            opt.progress=function (f) {
                vars.progress.text(f.name());
                return DU.timeout(0);
            };
            if (type==="dir") opt.dest=FS.get(FS.PathUtil.directorify(model.dest));
            return mkrun.run2(prj,type, opt ).then(function (r) {
                /*if (outtype.value==="zip") {
                    zip.zip(FS.get(model.dest)).then(function () {
                        console.log("ZIPPED?");
                    },function (e) {
                        console.log(e.stack);
                    });
                }*/
                switch(type) {
                case "dir":
                UIDiag.alert(UI("div",
                    ["p",R("runtimeCreatedAt"),
                    ["a",{href:jshint.scriptURL(";"),
                    style:"color: blue;",on:{click:openFolder}},model.dest],
                    ],
                    ["p",R("youCanPublishThisExecutableAsWebApplicationBy")],
                    ["ul",
                    ["li",R("uploadTheFolderIntoYourWebSite")],
                    ["li",R("uploadZippedFileInto"),
                      extLink("http://www.tonyu.jp/project/",
                              R("projectBoard"),{style:"color: blue;"}),
                    R("afterProjectBoard")]]
                    ),{width:"auto"}
                );
                break;
                case "zip":
                UIDiag.alert(UI("div",
                    ["p",R("executableCreated")],
                    ["p",R("youCanPublishThisExecutableAsWebApplicationBy")],
                    ["ul",
                    ["li",R("uploadTheExtractedFolderIntoYourWebSite")],
                    ["li",R("uploadTheZipFileInto"),
                      extLink("http://www.tonyu.jp/project/",
                              R("projectBoard"),{style:"color: blue;"}),
                    R("afterProjectBoard")]]
                    ),{width:"auto"}
                );
                break;
                case "prj":
                var diag;
                diag=UI("div",
                    ["p",["strong",R("uploadHasNotBeenDoneYet")]],
                    ["p",
                      extLink(WebSite.newVersionUrl+"?tmpFile="+r.tmpFileName,
                        R("youHaveToDescribeAboutThisVersion"),{
                            style:"color: blue;",
                            on:{
                                click: function () {
                                    diag.$vars.button.prop("disabled", false);
                                }
                            }
                        }),
                        R("toCompleteTheUpload")
                    ],
                    ["button",{
                        $var:"button",
                        on:{
                            click: function () {
                                diag.dialog("close");
                                diag.remove();
                            }
                        }
                    },"OK"]
                );
                diag.$vars.button.prop("disabled", true);
                diag.dialog();
                break;
                }
                onComplete({type:type,config:model});
                res.d.$vars.OKButton.prop("disabled", false);
                if (res.d.dialog) res.d.dialog("close");
                if (options.onEnd) options.onEnd();
            }).then(function (){},function (e) {
              console.error(e);
              alert(e);
            });
            function openFolder() {
                var f=FS.get(model.dest);
                var gui = root.require("nw.gui");//nwDispatcher.requireNwGui();
                gui.Shell.showItemInFolder(f.path().replace(/\//g,"\\"));
            }
        };
        return res.d;
    };
    return res;
});
