define(["UI","Shell"], function (UI,sh) {
    var res={};
    res.show=function (prjDir, onLineClick) {
        var d=res.embed(prjDir,onLineClick);
        d.dialog({width:600});
    };
    res.embed=function (prjDir, onLineClick) {
        if (!res.d) {
            res.d=UI("div",{title:"検索"},
                    ["div",
                     ["span","検索語"],
                     ["input",{$edit:"word",on:{enterkey:function () {
                         res.d.start();
                     }}}]],
                     ["div", {$var:"validationMessage", css:{color:"red"}}],
                     ["button", {$var:"OKButton", on:{click: function () {
                         res.d.start();
                     }}}, "検索"],
                     ["div",{style:"overflow-y:scroll; height:200px"},
                      ["table",{$var:"searchRes"}]]
            );
        }
        var d=res.d;
        var model={word:""};
        d.$edits.load(model);
        d.start=function () {
            d.$vars.searchRes.empty();
            var sres=sh.grep(model.word, prjDir);
            sres.forEach(function (l) {
                if (l.file.name()=="concat.js") {
                    return;
                }
                d.$vars.searchRes.append(
                        UI("tr",
                                ["td",{on:{click:doLineClick}},l.file.name()+"("+l.lineNo+")"],
                                ["td",{on:{click:doLineClick}},l.line]
                        ));
                function doLineClick() {
                    if (onLineClick) onLineClick(l);
                }
            });
        };
        return d;
    };
    return res;
});
