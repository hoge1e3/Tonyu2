define(["exportAsScriptTags","UI","Klass","root"], function (east,UI,Klass,root) {
    root.ExportHTMLDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            var dir=t.prj.getDir();
            t.options=options||{IE:false};
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
            t.dom=UI("div",{title:"HTML生成"},
                ["div","このHTMLをcodepenなどのJS共有サイトに張り付けて実行できます．"],
                ["div",
                    ["input", {id:"ie",$edit:"IE",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},"Internet Explorer 11でも動作させる（一部機能が使えない可能性があります）"],
                ],
                ["textarea",{$var:"prog",rows:20,cols:60,placeholder:"Please wait..."}]
            );
            t.dom.$edits.load(t.options);
            t.dom.$edits.on.writeToModel=r=>t.write();
            t.prog=t.dom.$vars.prog;
            return t.dom;
        }
    });
    return root.ExportHTMLDialog;
});
