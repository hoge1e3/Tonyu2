define(function (require, exports) {
    const urlTrailer=require("urlTrailer");
    const WebSite=require("WebSite");
    exports.load=url=>new Promise(succ=>{
        const s=document.createElement("script");
        url=(WebSite.urlAliases && WebSite.urlAliases[url])||url;
        s.setAttribute("src",urlTrailer.put(url));
        s.addEventListener("load",succ);
        document.body.appendChild(s);
        // JQuery does not work
        //$("<script>").attr({src:url}).on("load",succ).appendTo("body");
    });
});//-----
