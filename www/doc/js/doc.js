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
    $.getScript("https://run.tonyu.jp/curses.js.php").then(function () {
        var curSes=window.curSes || localStorage.curSes;
        if (!curSes) localStorage.curSes="S"+Math.random();
        //console.log(curSes);
        $.get("../cgi-bin/upl.php",{url:location.href, ses:curSes  });
    });
});
