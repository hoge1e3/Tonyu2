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
                doResize = true;
                // "…(iPhone; CPU iPhone OS 15_4 like Mac OS X)…"の"15"を抜き出す
                var iOSver = parseInt(u.substring(u.lastIndexOf(" ", u.indexOf("_")-1)+1, u.indexOf("_"))); // iOSのバージョン
                if (isNaN(iOSver)) iOSver = 15;

                // iOSの12まではiframe内でresizeするとバグるので無効化(heightが永遠と伸びるバグ)
                if ((u.indexOf("iphone") != -1 || u.indexOf("ipad") != -1 || u.indexOf("ipod") != -1) &&
                    iOSver <= 12 &&
                    (!window.parent || window != window.parent) // iframe時(一応window.parentが有効かもチェック)
                ) {
                    doResize = false;
                }
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
