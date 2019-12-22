define(["UI","GlobalDialog","R"], function (UI,GlobalDialog,R) {
    return function (TPR) {
        const opt=TPR.getOptions();
        if (!TPR.odiag) {
            TPR.odiag=UI("div",{title:R("projectOptions")},
                    ["h5",R("compiler")],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.diagnose"}],
                     R("diagMode")],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.noLoopCheck"}],
                     R("disableInfiniteLoopCheck")],
                     ["div",
                      ["input", {type:"checkbox", $edit: "compiler.field_strict"}],
                      R("requireFieldDeclaration")],
                    ["div", R("defaultSuperClass"),
                     ["input", {$edit: "compiler.defaultSuperClass"}]],
                     ["h5",R("runtimes")],
                     ["div", R("mainClass"), ["input", {$edit: "run.mainClass"}] ],
                     ["div", R("bootClass"), ["input", {$edit: "run.bootClass"}] ],
                     ["div", R("globalVariables"),["button", {on:{click: editG}},R("edit")] ],
                     ["h5","開発"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "kernelEditable"}],
                      "Kernelの開発を行う"],
                      ["div", {$var:"validationMessage", css:{color:"red"}}]
            );
        }
        var gdiag=new GlobalDialog(TPR);
        function editG() {
          gdiag.show();
        }
        TPR.odiag.$edits.load(opt);
        TPR.odiag.dialog({
            width: 600,
            buttons: {
                OK: function () {
                    TPR.odiag.dialog("close");
                    //console.log("Project opt Saved ",JSON.stringify(opt));
                    TPR.setOptions(opt);
                    TPR.resetFiles();// does requestRebuild() by BuilderWorker
                    //console.log("new opt ",JSON.stringify(TPR.getOptions()));
                }
            }
        });
    };
});
