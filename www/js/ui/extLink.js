define(["WebSite","UI"],function (WebSite,UI) {
    var exec = (WebSite.isNW? require('child_process').exec : function (){});
    function extLink(href,caption,options) {
        var p=WebSite.platform;
        if (p=="win32") {
            var opt={href:"javascript:;", on:{click: ext("start")}};
            if (options) for (var k in options) opt[k]=options[k];
            return UI("a",opt,caption);
        } else if (p=="darwin") {
            var opt={href:"javascript:;", on:{click: ext("open")}};
            if (options) for (var k in options) opt[k]=options[k];
            return UI("a",opt,caption);
        } else {
            return UI("a",{href:href, target:"_new"},caption);
        }
        function ext(cmd) {
            return function () {
                exec(cmd+" "+href);
            };
        }
    };
    return extLink;
});