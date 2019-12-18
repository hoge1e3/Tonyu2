define(["root","WebSite"], function (root,WebSite) {
    root.SplashScreen={
        hide: function () {$("#splash").hide();},
        show:function(){},
        progress:function(t) {$("#splash .progress").text(t);}
    };
    return {
        initCanvas: function (doResize) {
            function getMargin() {
                return 0;
            }

            var margin = getMargin();
            var w=$(window).width();
            var h=$(window).height();
            $("body").css({overflow:"hidden", margin:"0px"});
            var cv=$("<canvas>").attr({width: w-margin, height:h-margin, class:"tonyu-canvas"}).appendTo("body");

            var u = navigator.userAgent.toLowerCase();
            if (doResize==null) {
                doResize=(u.indexOf("iphone") == -1 &&
                    u.indexOf("ipad") == -1 &&
                    u.indexOf("ipod") == -1
                ) && (!window.parent || window === window.parent);
                if (WebSite.doResize!=null) doResize=WebSite.doResize;
            }
            if (doResize) {
                $(window).resize(onResize);
            }
            function onResize() {
                var margin = getMargin();
                w=$(window).width();
                h=$(window).height();
                cv.attr({width: w-margin, height: h-margin});
            }
            return cv;
        }
    };
});
