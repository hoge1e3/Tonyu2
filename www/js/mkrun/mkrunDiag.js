define(["UI","extLink","mkrun","Tonyu","zip"], function (UI,extLink,mkrun,Tonyu,zip) {
    var res={};
    res.show=function (prj,dest,options) {
        var d=res.embed(prj,dest,options);
        d.dialog({width:800,height:400});
    };
    res.embed=function (prj,/*dest,*/options) {
        options=options||{};
        var dest=options.dest;
        if (!res.d) {
            res.d=UI("div",{title:"ランタイム作成"},
                  // ["span", {$var:"hiddenFolder"},
                  ["form",{action:"javascript:;",$var:"form",name:"mkrunform"},
                ["h1","出力方法"],
                    ["div",
                        ["input", {id:"src",type:"radio",name:"outtype",value:"zip"}],
                        ["label",{"for":"outtype"},"ZIP圧縮したものを保存する"]
                    ],//],
                    ["div",
                        ["input", {id:"src",type:"radio",name:"outtype",value:"prj"}],
                        ["label",{"for":"outtype"},"プロジェクトボードにアップロードする"]
                    ],//],
                    ["div",{$var:"folder"},
                        ["input",{type:"radio",name:"outtype",value:"dir"}],
                        ["label",{"for":"dest"},"次のフォルダに出力："],["br"],
                        ["input", {id:"dest",$edit:"dest",size:60}]
                    ],
                ["h1","オプション"],
                    ["div",
                        ["input", {id:"src",$edit:"src",type:"checkbox"}],
                        ["label",{"for":"src"},"ソースを添付する"],
                        ["div",
                        {"class":"srcwarn"},
                        "ソースを添付すると，アップロードしたファイルを"+
                        "プロジェクトボード上で直接編集できます．"]
                    ],
                    ["button", {$var:"OKButton", on:{click: function () {
                         res.run();
                    }}}, "作成"]
                ]
            );
        }
        res.d.$vars.OKButton.prop("disabled", false);
        if (!options.dest) {
            res.d.$vars.folder.hide();
        } else {
            res.d.$vars.folder.show();
        }
        var model={dest:dest?dest.path():"", src:true, zip:true};
        var form=res.d.$vars.form[0];
        var outtype=form.outtype;
        outtype.value="zip";
        res.d.$edits.load(model);
        res.run=function () {
            var type=outtype.value;
            res.d.$vars.OKButton.prop("disabled", true);
            var opt={copySrc:model.src};
            if (type==="dir") opt.dest=FS.get(model.dest);
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
                    ["p",
                    ["a",{href:"javascript:;",
                    style:"color: blue;",on:{click:openFolder}},model.dest],
                    "にランタイムを作成しました。"],
                    ["p","次のいずれかの方法でWebアプリとして公開することができます。"],
                    ["ul",
                    ["li","フォルダをお手持ちのWebサーバにアップロードする"],
                    ["li","上のフォルダをZIPで圧縮したものを",
                      extLink("http://www.tonyu.jp/project/",
                              "プロジェクトボード",{style:"color: blue;"}),
                    "にアップロードする"]]
                    ),{width:"auto"}
                );
                break;
                case "zip":
                UIDiag.alert(UI("div",
                    ["p","ランタイムを作成しました。"],
                    ["p","次のいずれかの方法でWebアプリとして公開することができます。"],
                    ["ul",
                    ["li","解凍したフォルダをお手持ちのWebサーバにアップロードする"],
                    ["li","保存したZIPファイルを",
                      extLink("http://www.tonyu.jp/project/",
                              "プロジェクトボード",{style:"color: blue;"}),
                    "にアップロードする"]]
                    ),{width:"auto"}
                );
                break;
                case "prj":
                var diag;
                diag=UI("div",
                    ["p",["strong","まだアップロードは完了していません"]],
                    ["p",
                      extLink("http://www.tonyu.jp/project/newVersion.cgi?tmpFile="+r.tmpFileName,
                        "新規バージョンページ",{
                            style:"color: blue;",
                            on:{
                                click: function () {
                                    diag.$vars.button.prop("disabled", false);
                                }
                            }
                        }),
                        "に必要事項を記入して，アップロードを完了させてください"
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
                res.d.$vars.OKButton.prop("disabled", false);
                if (res.d.dialog) res.d.dialog("close");
                if (options.onEnd) options.onEnd();
            }).then(function (){},function (e) {
              console.error(e);
              alert(e);
            });
            function openFolder() {
                var f=FS.get(model.dest);
                var gui = require("nw.gui");//nwDispatcher.requireNwGui();
                gui.Shell.showItemInFolder(f.path().replace(/\//g,"\\"));
            }
        };
        return res.d;
    };
    return res;
});
