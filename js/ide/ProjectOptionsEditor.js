define(["UI"], function (UI) {
    return function (TPR) {
        var opt=TPR.getOptions();
        //opt.id=Math.random();
        console.log("Project got",opt);
        /*   Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                bootClass: "Boot",
                kernelEditable: false
             };
         */
        if (!TPR.odiag) {
            TPR.odiag=UI("div",{title:"プロジェクト オプション"},
                    ["h5","コンパイラ"],
                    ["div", "デフォルトの親クラス",
                     ["input", {$edit: "compiler.defaultSuperClass"}]],
                     ["h5","実行"],
                     ["div", "Main クラス", ["input", {$edit: "run.mainClass"}] ],
                     ["div", "Boot クラス", ["input", {$edit: "run.bootClass"}] ],
                     ["h5","開発"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "kernelEditable"}],
                      "Kernelの開発を行う"]
            );
        }
        TPR.odiag.$edits.load(opt);
        TPR.odiag.dialog({
            width: 600,
            buttons: {
                OK: function () {
                    TPR.odiag.dialog("close");
                    console.log("Project opt Saved ",opt);
                    TPR.setOptions();
                    console.log("new opt ",TPR.getOptions());
                }
            }
        });
    };
});