define(["UI","extLink","mkrun","Tonyu","zip"], function (UI,extLink,mkrun,Tonyu,zip) {
    var res={};
    res.show=function (prj,dest,options) {
        var d=res.embed(prj,dest,options);
        d.dialog({width:800,height:300});
    };
    res.embed=function (prj,dest,options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"ランタイム作成"},
                   ["span", {$var:"hiddenFolder"},
                    ["div",
                         ["label",{"for":"dest"},"出力フォルダ"],["br"],
                         ["input", {id:"dest",$edit:"dest",size:60}]
                    ],
                    ["div",
                         ["input", {id:"src",$edit:"zip",type:"checkbox"}],
                         ["label",{"for":"zip"},"ZIP圧縮したものを保存する"]
                    ]],
                    ["div",
                       ["input", {id:"src",$edit:"src",type:"checkbox"}],
                       ["label",{"for":"src"},"ソースを添付する"]
                    ],
                    ["button", {$var:"OKButton", on:{click: function () {
                         res.run();
                    }}}, "作成"]
            );
        }
        res.d.$vars.OKButton.prop("disabled", false);
        if (options.hiddenFolder) {
            res.d.$vars.hiddenFolder.hide();
        } else {
            res.d.$vars.hiddenFolder.show();
        }
        var model={dest:dest.path(), src:true, zip:true};
        res.d.$edits.load(model);
        res.run=function () {
            res.d.$vars.OKButton.prop("disabled", true);
            return mkrun.run(prj, FS.get(model.dest), {copySrc:model.src}).then(function () {
                if (model.zip) {
                    zip.dlzip(FS.get(model.dest));
                }
                UIDiag.alert(UI("div",
                         ["p",(options.hiddenFolder?"":
                         ["a",{href:"javascript:;",style:"color: blue;",on:{click:openFolder}},model.dest+"に"]),
                         "ランタイムを作成しました。"],
                         ["p","次のいずれかの方法でWebアプリとして公開することができます。"],
                         ["ul",
                         ["li",(model.zip?"解凍した":"")+"フォルダをお手持ちのWebサーバにアップロードする"],
                         ["li",(model.zip?"保存したZIPファイルを":"上のフォルダをZIPで圧縮したものを"),
                          extLink("http://hoge1e3.sakura.ne.jp/tonyu/project/",
                                  "プロジェクトボード",{style:"color: blue;"}),
                          "にアップロードする"]]
                        ),{width:"auto"}
                );
                res.d.$vars.OKButton.prop("disabled", false);
                if (res.d.dialog) res.d.dialog("close");
                if (options.onEnd) options.onEnd();
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
