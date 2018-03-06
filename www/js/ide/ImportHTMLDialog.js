define(["exportAsScriptTags","UI","Klass","NewProjectDialog","ScriptTagFS"],
function (east,UI,Klass,NPD,STF) {
    ImportHTMLDialog=Klass.define({
        $this:"t",
        show: function (t,options) {
            t.createDOM();
            t.dom.dialog({width:800,height:600});
            //console.log("imp.dom.data",$.data(t.dom[0],"ui-dialog"));
            t.mode("src");
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:"HTMLからインポート"},
                ["div",{$var:"src"},
                    ["div","ここにHTMLを貼り付けます"],
                    ["div",["button",{on:{click:t.$bind.selDir}},"Next->"]],
                    ["div",
                        ["textarea",{
                            $var:"prog",rows:20,cols:60,
                            placeholder:"Paste HTML Here"
                        }]
                    ],
                    ["div",["button",{on:{click:t.$bind.selDir}},"Next->"]]
                ],
                ["div",{$var:"selDir"}],
                ["div",{$var:"confirm"}],
                ["div",{$var:"complete"}],
                ["div",{$var:"files",css:{display:"none"}}]
            );
            //t.dom.__ID=Math.random();
            //console.log("createDOM",t.dom);
            t.vars=t.dom.$vars;
            return t.dom;
        },
        selDir: function (t) {
            t.vars.selDir.empty();
            t.vars.selDir.append($("<h1>").text("インポート先のフォルダを入力してください"));
            t.vars.selDir.append( NPD.embed(
                t.prjDirs[0],t.$bind.confirm,{}
            ));
            t.mode("selDir");
        },
        confirm: function confirm(t,dir) {
            t.dst=dir;
            var s=t.vars.prog.val();
            var buf="";
            s.split("\n").forEach(function (l) {
                if (!l.match(/<script[^>]*src[^>]*javascript/)) {
                    buf+=l+"\n";
                }
            });
            t.vars.files.html(buf);
            t.mode("confirm");
            t.vars.confirm.empty();
            t.vars.confirm.append(UI("div",["button",{on:{click:t.$bind.complete}},"インポート開始"]));
            var o=STF.toObj();
            for (var fn in o) {
                var f=dir.rel(fn);
                var ex=f.exists()?"上書":"新規";
                t.vars.confirm.append(UI("div","[", ex,"]", f.path()));
            }
        },
        complete: function run(t) {
            var dir=t.dst;
            t.mode("complete");
            var o=STF.toObj();
            for (var fn in o) {
                var f=dir.rel(fn);
                f.text(o[fn].text);
            }
            t.vars.complete.empty();
            t.vars.complete.append(UI("h1","インポート完了"));
            /*t.vars.complete.append(UI("div",
                ["a",{href:"project.html?dir="+dst.path()},
                dst.path()+"を開く"]
            ));*/
            //console.log("close",t.dom);
            //console.log("imp.dom.data2",$.data(t.dom[0],"ui-dialog"));
            t.dom.dialog("close");
            t.onComplete();
        },
        mode:function mode(t,n) {
            ["src","selDir","confirm","complete"].forEach(function (k) {
                t.vars[k].hide();
            });
            t.vars[n].show();
        }
    });
    return ImportHTMLDialog;
});
