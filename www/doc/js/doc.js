$(function () {
    $("a").each(function () {
        var url=$(this).attr("href");
        if (url && !url.match(/^http/) &&
            !url.match(/\.html$/)) {
            url=url+".html";
            $(this).attr("href",url);
        }
    });
    $("body").prepend(backButton());
    $("body").append(backButton());
    function backButton() {
        return $("<div>").append(
            $("<Button>").text(String.fromCharCode(8592)+"Back").click(function () {
                history.back();
            })
        );
    }
});
