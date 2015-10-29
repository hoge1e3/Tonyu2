define([], function () {
    var WD={};
    WD.create=function (home, options) {
        options=options || {title:"help",topPage:"index"};
        if (!options.height) {
            options.height=$(window).height()*0.7;
        }
        if (!options.width) options.width=500;
        var ifrm=$("<iframe>").attr({
            "class":"wikiDialog",frameBorder:0,
            src:home//, width:options.width+100, height:options.height
        });
        var d=$("<div>").attr({"class":"wikiDialog",title:options.title}).append(ifrm);
        return {
            show: function () {
                d.dialog({
                    width:options.width, height:options.height,
                    resize:function (e,ui){
                        //ifrm.width(ui.size.width-50);
                        //ifrm.height(ui.size.height-50);
                    }
                });
            }
        };
    };
    return WD;
});