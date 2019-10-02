define(function (require, exports, module) {
    exports.load=url=>new Promise(succ=>{
        const s=document.createElement("script");
        s.setAttribute("src",url);
        s.addEventListener("load",succ);
        document.body.appendChild(s);
        // JQuery does not work
        //$("<script>").attr({src:url}).on("load",succ).appendTo("body");
    });
});//-----
