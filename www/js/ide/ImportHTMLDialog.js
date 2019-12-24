define(["exportAsScriptTags","UI","Klass","NewProjectDialog","ScriptTagFS","R"],
function (east,UI,Klass,NPD,STF,R) {
    const ImportHTMLDialog=Klass.define({
        $this:true,
        show: function (t/*,options*/) {
            t.createDOM();
            t.dom.dialog({width:800,height:600});
            //console.log("imp.dom.data",$.data(t.dom[0],"ui-dialog"));
            t.mode("src");
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:R("importFromHTML")},
                ["div",{$var:"src"},
                    ["div",R("pasteHTMLHere")],
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
            t.vars.selDir.append($("<h1>").text(R("inputFolderPathForImport")));
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
            t.vars.confirm.append(UI("div",["button",{on:{click:t.$bind.complete}},R("startImport")]));
            var o=STF.toObj();
            for (var fn in o) {
                var f=dir.rel(fn);
                var ex=f.exists()?R("ovr"):R("new");
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
            t.vars.complete.append(UI("h1",R("importComplete")));
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
