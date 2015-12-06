define(["WebSite","UI"],function (WebSite,UI) {
    var exec = (WebSite.isNW? require('child_process').exec : function (){});
    function extLink(href,caption,options) {
        var p=WebSite.platform;
        var opt;
        if (p=="win32") {
            opt={href:"javascript:;", on:{click: ext("start")}};
        } else if (p=="darwin") {
            opt={href:"javascript:;", on:{click: ext("open")}};
        } else {
            opt={href:href, target:"_new"};
        }
        if (options) for (var k in options) opt[k]=options[k];
        return UI("a",opt,caption);
        function ext(cmd) {
            return function () {
                exec(cmd+" "+href);
            };
        }
    };
    return extLink;
});