define(["UI","Shell","R"], function (UI,sh,R) {
    var res={};
    res.show=function (ide, onLineClick) {
        var d=res.embed(ide,onLineClick);
        d.dialog({width:600});
    };
    res.embed=function (ide, onLineClick) {
        if (!res.d) {
            res.d=UI("div",{title:R("find")},
                    ["div",
                     ["span",R("wordToFind")],
                     ["input",{$edit:"word",on:{enterkey:function () {
                         res.d.start();
                     }}}]],
                     ["div", {$var:"validationMessage", css:{color:"red"}}],
                     ["button", {$var:"OKButton", on:{click: function () {
                         res.d.start();
                     }}}, R("find")],
                     ["div",{style:"overflow-y:scroll; height:200px"},
                      ["table",{$var:"searchRes"}]]
            );
        }
        var d=res.d;
        var model={word:""};
        d.$edits.load(model);
        d.start=function () {
            const files=ide.project.sourceFiles();
            d.$vars.searchRes.empty();
            const doLineClickF=l=>()=>doLineClick(l);
            for (let fileName in files) {
                const file=files[fileName];
                let lineNo=0;
                for (let line of file.lines()) {
                    lineNo++;
                    if (line.indexOf(model.word)<0) continue;
                    d.$vars.searchRes.append(
                            UI("tr",
                                    ["td",{on:{click:doLineClickF({file,lineNo,line})}},file.name()+"("+lineNo+")"],
                                    ["td",{on:{click:doLineClickF({file,lineNo,line})}},line]
                            ));
                }
            }
            function doLineClick(l) {
                if (onLineClick) onLineClick(l);
            }
        };
        return d;
    };
    return res;
});
