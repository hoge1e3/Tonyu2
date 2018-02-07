$(function () {
    $("a").each(function () {
        var url=$(this).attr("href");
        if (url && !url.match(/^http/) &&
            !url.match(/\.html$/)) {
            url=url+".html";
            $(this).attr("href",url);
        }
    });
    if (location.href.match(/tonyuedit.appspot.com/)) {
        location.href="http://www.tonyu.jp/project/pages/e/doc/";
    }
});
