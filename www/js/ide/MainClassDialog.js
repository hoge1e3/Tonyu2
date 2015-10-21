define(["UI"],function (UI) {
    var res={};
    res.show=function (prj, options) {
        var d=res.embed(prj, options);
        d.dialog({width:600});
        return d;
    };
    res.embed=function (prj, options) {
        if (!options) options={};

        if (!res.d) {
            res.d=UI("div",{title:"実行するクラスを選択"},
                    ["div",
                          ["select",{$var:"mainClass"}],
                          ["div", {$var:"validationMessage", css:{color:"red"}}],
                          ["button", {$var:"OKButton", on:{click: function () {
                              res.d.done(false);
                          }}}, "OK"],
                          ["button", {$var:"RunButton", on:{click: function () {
                              res.d.done(true);
                          }}}, "実行"]
                    ]
            );
        }
        var d=res.d;
        var v=res.d.$vars;
        prj.getDir();

        var opt=prj.getOptions();

        d.done=function (run) {
            opt.run.mainClass=v.mainClass.val();
            prj.setOptions(opt);
            if (options.on && options.on.done) {
                options.on.done(v.mainClass.val(),run);
            }
            d.dialog("close");
        };

        return d;
    };
    return res;
});