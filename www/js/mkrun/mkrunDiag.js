define(["UI","mkrun","Tonyu"], function (UI,mkrun,Tonyu) {
    var res={};
    res.show=function (prj,dest) {
        var d=res.embed(prj,dest);
        d.dialog({width:800,height:300});
    };
    res.embed=function (prj,dest) {
        if (!res.d) {
            res.d=UI("div",{title:"ランタイム作成"},
                    ["div","出力フォルダ"],
                    ["div",["input", {$edit:"dest",size:60}]],
                     ["button", {$var:"OKButton", on:{click: function () {
                         res.run();
                     }}}, "作成"]
            );
        }
        var model={dest:dest};
        res.d.$edits.load(model);
        res.run=function () {
            mkrun.run(prj, FS.get(model.dest));
            alert(model.dest+"にランタイムを作成しました。");
            if (res.d.dialog) res.d.dialog("close");
        };
        return res.d;
    };
    return res;
});