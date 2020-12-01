define(["UI","Shell","R"], function (UI,sh,R) {
    var res={};
    res.show=function (ide, onLineClick) {
        var d=res.embed(ide,onLineClick);
        d.dialog({width:600});
    };
    res.embed=function (ide, onLineClick) {
        const files=ide.project.sourceFiles();
        if (!res.d) {
            res.d=UI("div",{title:R("find")},
                    ["div",
                     ["span",R("wordToFind")],
                     ["input",{$var:"word",$edit:"word",on:{input: function () {
                         res.d.fileNames();
                     },enterkey:function () {
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
        var word=res.d.$vars.word;
        word.val("");
        //var model={word:""};
        //d.$edits.load(model);
        d.fileNames=function () {
            d.$vars.searchRes.empty();
            const doLineClickF=l=>()=>doLineClick(l);
            for (let fileName in files) {
                const file=files[fileName];
                /*console.log(file.truncExt().toLowerCase(),
                model.word.toLowerCase(),
                file.truncExt().toLowerCase().indexOf(model.word.toLowerCase()));*/
                if (file.truncExt().toLowerCase().indexOf(word.val().toLowerCase())>=0) {
                    const file=files[fileName];
                    const lineNo=-1;
                    const line=R("filenameMatched");
                    d.$vars.searchRes.append(
                            UI("tr",
                                    ["td",{on:{click:doLineClickF({file,lineNo,line})}},file.name()],
                                    ["td",{on:{click:doLineClickF({file,lineNo,line})}},line]
                            ));
                }
            }
            function doLineClick(l) {
                if (onLineClick) onLineClick(l);
            }
        };
        d.start=function () {
            d.$vars.searchRes.empty();
            const doLineClickF=l=>()=>doLineClick(l);
            for (let fileName in files) {
                const file=files[fileName];
                let lineNo=0;
                for (let line of file.lines()) {
                    lineNo++;
                    if (line.indexOf(word.val())<0) continue;
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
