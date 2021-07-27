define(["exportAsScriptTags","UI","Klass","NewProjectDialog","ScriptTagFS","R"],
function (east,UI,Klass,NPD,STF,R) {
    const ImportHTMLDialog=Klass.define({
        $this:true,
        show: function (t,options) {
            options=options||{};
            t.createDOM();
            t.dom.dialog({width:800,height:600});
            //console.log("imp.dom.data",$.data(t.dom[0],"ui-dialog"));
            t.mode("src");
            const src=($("#importing").length && $("#importing").val())||
                options.content;
            if (src) {
                console.log(src);
                t.vars.prog.val(src);
                $("#importing").remove();
                t.selDir({defName:options.defName, whenPrjDirExists: options.whenPrjDirExists});
            }
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
        selDir: function (t,options) {
            options=options||{};
            if (options.defName) {
                const defDir=t.prjDirs[0].rel(options.defName.replace(/\/$/,"")+"/");
                t.confirm(defDir, options.whenPrjDirExists);
                return;
            }
            //t.vars.selDir.empty();
            if (!t.selDirShown) {
                t.vars.selDir.append($("<h1>").text(R("inputFolderPathForImport")));
                t.vars.selDir.append( NPD.embed(
                    t.prjDirs[0],t.$bind.confirm,{defName: options.defName}
                ));
                t.selDirShown=true;
            }
            t.mode("selDir");
        },
        confirm: function confirm(t,dir, whenPrjDirExists) {
            t.dst=dir;
            var s=t.vars.prog.val();
            var buf="";
            s.split("\n").forEach(function (l) {
                if (!l.match(/<script[^>]*src[^>]*javascript/)) {
                    buf+=l+"\n";
                }
            });
            console.log("buf",buf);
            t.vars.files.html(buf);
            t.mode("confirm");
            t.vars.confirm.empty();
            t.vars.confirm.append(UI("div",R("followingFilesWillBeOverwritten")));
            var o=STF.toObj();
            let hasOvr;
            for (var fn in o) {
                var f=dir.rel(fn);
                const w=willBeOverwritten(f, o[fn].text);
                if (w) {
                    hasOvr=true;
                    t.vars.confirm.append(UI("div", f.path()));
                }
                //var ex=f.exists()?R("ovr"):R("new");
                //t.vars.confirm.append(UI("div","[", ex,"]", f.path()));
            }
            t.vars.confirm.append(UI("div",["button",{on:{click:t.$bind.selDir}},R("selectOtherFolder")]));
            t.vars.confirm.append(UI("div",["button",{on:{click:t.$bind.complete}},R("overwriteTheseFiles")]));
            t.vars.confirm.append(UI("div",["button",{on:{click:doNotOverwrite}},R("openTheProjectWithoutOverwrite")]));
            if (!hasOvr) {
                t.complete();
            } else {
                switch (whenPrjDirExists) {
                    case "selectOtherFolder":
                        t.selDir();
                        break;
                    case "openTheProjectWithoutOverwrite":
                        doNotOverwrite();
                        break;
                }
            }
            function doNotOverwrite() {
                t.onComplete({dir});
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
            t.onComplete({dir});
        },
        mode:function mode(t,n) {
            ["src","selDir","confirm","complete"].forEach(function (k) {
                t.vars[k].hide();
            });
            t.vars[n].show();
        }
    });
    function willBeOverwritten(f, text) {
        if (!f.exists()) return false;
        return (f.text()!==text);
    }
    return ImportHTMLDialog;
});
