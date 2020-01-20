define(["exportAsScriptTags","UI","Klass","root","R"],
function (east,UI,Klass,root,R) {
    root.ExportHTMLDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            //var dir=t.prj.getDir();
            t.options=options||{IE:false};
            t.prj.removeThumbnail();
            t.createDOM();
            t.dom.dialog({width:800,height:400});
            t.write();
        },
        write: function (t) {
            var dir=t.prj.getDir();
            t.prog.val("");
            setTimeout(function () {
                var buf=east(dir,t.options);
                t.prog.val(buf);
            },10);
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:R("generateSingleHTML")},
                ["div",R("thisIsExecutableInSingleHTML")],
                ["div",
                    ["input", {id:"ie",$var:"IE",$edit:"IE",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},R("runnableInIE11")],
                ],
                ["div",
                    ["input", {id:"ie",$var:"editButton",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},R("showEditButton")],
                ],
                ["textarea",{$var:"prog",rows:20,cols:60,placeholder:"Please wait..."}]
            );
            t.dom.$edits.load(t.options);
            t.dom.$vars.IE.on("change",()=> {
                t.options.IE=t.dom.$vars.IE.prop("checked");
                t.write();
            });
            t.dom.$vars.editButton.on("change",()=> {
                t.options.editButton=t.dom.$vars.editButton.prop("checked");
                t.write();
            });

            t.prog=t.dom.$vars.prog;
            return t.dom;
        }
    });
    return root.ExportHTMLDialog;
});
