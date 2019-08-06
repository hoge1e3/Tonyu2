define(["exportAsScriptTags","UI","Klass"], function (east,UI,Klass) {
    ExportHTMLDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            var dir=t.prj.getDir();
            t.createDOM();
            t.dom.dialog({width:800,height:400});
            setTimeout(function () {
                var buf=east(dir,options);
                t.prog.val(buf);
            },0);
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:"HTML生成"},
                ["div","このHTMLをcodepenなどのJS共有サイトに張り付けて実行できます．"],
                ["textarea",{$var:"prog",rows:20,cols:60,placeholder:"Please wait..."}]
            );
            t.prog=t.dom.$vars.prog;
            return t.dom;
        }
    });
    return ExportHTMLDialog;
});
