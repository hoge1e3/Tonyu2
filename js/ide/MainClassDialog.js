define(["UI"],function (UI) {
    var res={};
    res.show=function (prj, options) {
        var d=res.embed(prj, options);
        d.dialog({width:600});
    };
    res.embed=function (prj, options) {
        if (!options) options={};

        if (!res.d) {
            res.d=UI("div",{title:"実行するクラスを選択"},
                    ["div",
                          ["select",{$var:"mainClass"}],
                          ["div", {$var:"validationMessage", css:{color:"red"}}],
                          ["button", {$var:"OKButton", on:{click: function () {
                              res.d.done();
                          }}}, "OK"]
                          ["button", {$var:"RunButton", on:{click: function () {
                              res.d.run();
                          }}}, "実行"]
                    ]
            );
        }
        var d=res.d;
        var e=res.d.$edits;
        prj.getDir();

        var opt=prj.getOptions();

        d.done=function () {
            opt.run.mainClass=e.mainClass.val();
            prj.setOptions(opt);
        };
        d.run=function () {
            d.done();
            prj.rawRun();
        };
        return d;
    };
    return res;
});