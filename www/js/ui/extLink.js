/*global require*/
define(["WebSite","UI","PathUtil","Util","assert","jshint"],
        function (WebSite,UI,PathUtil,Util,assert,jshint) {
    var exec = (WebSite.isNW? require('child_process').exec : function (){});
    function extLink(href,caption,options) {
        options=options||{};
        var opt=getOpt(href,options);
        //for (var k in options) opt[k]=options[k];
        return UI("a",opt,caption);
    }
    function getOpt(href,options) {
        var p=WebSite.platform;
        options=options||{};
        options.on=options.on||{};
        var afterClick=(options.on && options.on.click) || function(){};
        if (p=="win32") {
            options.href=jshint.scriptURL(";");
            options.on.click=ext("start",href,afterClick);
        } else if (p=="darwin") {
            options.href=jshint.scriptURL(";");
            options.on.click=ext("open",href,afterClick);
        } else {
            options.href=href;
            options.on.click=afterClick;
            options.target="_new";
        }
        return options;
    }
    function ext(cmd, href,afterClick) {
        return function () {
            href=href.replace(/&/g,"^&");
            exec(`${cmd} ${href}`);
            if (afterClick) afterClick();
        };
    }
    extLink.all=function () {
        if (!WebSite.isNW) return;
        $("a").each(function () {
            //var head=location.protocol+"//"+location.host+"/";
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
