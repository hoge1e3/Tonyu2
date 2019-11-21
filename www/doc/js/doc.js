$(function () {
    $("a").each(function () {
        var url=$(this).attr("href");
        if (url && !url.match(/^http/) &&
            !url.match(/\.html$/)) {
            var anc="";
            url=url.replace(/#.*$/, function (a) { anc=a;return "";});
            url=url+".html"+anc;
            $(this).attr("href",url);
        }
        if (url && url.match(/^http/) && typeof process!=="undefined") {
            $(this).attr("href","javascript:;");
            var appended;
            $(this).click(function () {
                if (appended) return;
                $(this).after("("+ url +")");
                appended=true;
            });
        }
    });
    if (location.href.match(/tonyuedit.appspot.com/)) {
      location.href="http://www.tonyu.jp/project/pages/e/doc/";
    }
});
