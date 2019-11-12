define(["UI","GlobalDialog"], function (UI,GlobalDialog) {
    return function (TPR) {
        const opt=TPR.getOptions();
        if (!TPR.odiag) {
            TPR.odiag=UI("div",{title:"プロジェクト オプション"},
                    ["h5","コンパイラ"],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.diagnose"}],
                     "診断モード(速度が落ちますが，プログラムの不具合を見つけやすくします)"],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.noLoopCheck"}],
                     "無限ループチェックをしない（チェックすると速度が速くなることがあります）"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "compiler.field_strict"}],
                      "フィールド宣言を明示的に行う(var n; のような宣言が必要になります)"],
                    ["div", "デフォルトの親クラス",
                     ["input", {$edit: "compiler.defaultSuperClass"}]],
                     ["h5","実行"],
                     ["div", "Main クラス", ["input", {$edit: "run.mainClass"}] ],
                     ["div", "Boot クラス", ["input", {$edit: "run.bootClass"}] ],
                     ["div", "グローバル変数",["button", {on:{click: editG}},"編集..."] ],
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
