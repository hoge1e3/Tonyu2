define(["WebSite","UI","PathUtil","Util","assert"],
        function (WebSite,UI,PathUtil,Util,assert) {
    var exec = (WebSite.isNW? require('child_process').exec : function (){});
    function extLink(href,caption,options) {
        var opt=getOpt(href);
        if (options) for (var k in options) opt[k]=options[k];
        return UI("a",opt,caption);
    };
    function getOpt(href) {
        var p=WebSite.platform;
        var opt;
        if (p=="win32") {
            opt={href:"javascript:;", on:{click: ext("start",href)}};
        } else if (p=="darwin") {
            opt={href:"javascript:;", on:{click: ext("open",href)}};
        } else {
            opt={href:href, target:"_new"};
        }
        return opt;
    }
    function ext(cmd, href) {
        return function () {
            exec(cmd+" "+href);
        };
    }
    extLink.all=function () {
        if (!WebSite.isNW) return;
        $("a").each(function () {
            var head=location.protocol+"//"+location.host+"/";
            var a=$(this);
            var href=a.attr("href");
            //console.log("href",href);
            if (href.match(/^http/) ) {
                var opt=assert.is( getOpt(href),
                        {href:String,on:{click:Function}} );
                a.attr("href",opt.href);
                a.click(opt.on.click);
            }
        });
    };
    return extLink;
});