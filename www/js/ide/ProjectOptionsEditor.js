define(["UI","GlobalDialog","R","DependencyEditor"],
function (UI,GlobalDialog,R,DependencyEditor) {
    return function (prj) {
        const res={
            show, prj, requestReload
        };
        const odiag=UI("div",{title:R("projectOptions")},
                    ["h5",R("compiler")],
                    /*["div",
                     ["input", {type:"checkbox", $edit: "compiler.diagnose"}],
                     R("diagMode")],*/
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
                     ["div", R("dependencyEditor"),["button", {on:{click: editD}},R("edit")] ],
                     /*["h5","開発"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "kernelEditable"}],
                      "Kernelの開発を行う"],*/
                      ["div", {$var:"validationMessage", css:{color:"red"}}]
            );
        let opt;
        const gdiag=new GlobalDialog(prj);
        function editG() {
            gdiag.show(opt);
        }
        const ddiag=new DependencyEditor(res);
        function editD() {
            ddiag.load(opt);
            ddiag.show();
        }
        function show() {
            opt=prj.getOptions();
            odiag.$edits.load(opt);
            odiag.dialog({
                width: 600,
                buttons: {
                    OK: close
                },
                close
            });
        }
        let reloadRequested;
        function close() {
            odiag.dialog("close");
            //console.log("Project opt Saved ",JSON.stringify(opt));
            prj.setOptions(opt);
            prj.resetFiles();// does requestRebuild() by BuilderWorker
            //console.log("new opt ",JSON.stringify(prj.getOptions()));
            if (reloadRequested) {
                reloadRequested=false;
                if (confirm(R("reloadRequested"))) {
                    location.reload();
                }
            }
        }
        function requestReload() {
            reloadRequested=true;
        }
        return res;
    };
});
