$(function () {
    $("a").each(function () {
        var url=$(this).attr("href");
        if (url && !url.match(/^http/) &&
            !url.match(/\.html$/)) {
            url=url+".html";
            $(this).attr("href",url);
        }
    });
});
