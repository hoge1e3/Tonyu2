define(["UI"],function (UI) {
    var Columns={};
    Columns.make=function () {
        var div=UI("div",{"class":"container"});
        var row=UI("div",{"class":"row"});
        var res=[];
        for (var i=0; i<arguments.length ; i++) {
            var col=UI.apply(UI,arguments[i]);
            res.push(col);
            row.append(col);
        }
        div.append(row);
        $("body").append(div);
        return res;
    };
    return Columns;
});
