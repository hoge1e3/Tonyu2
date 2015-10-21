function ProgressBar(max) {
    var s=null;
    $(function () {
        s=$("<span>").appendTo("body").css({position:"absolute",
            left: 100, top:100, fontSize: 30, background: "white"
        });
        //console.log("Loaded");
    });
    var PB={};
    PB.set=function (c) {
        if (s) {
            s.text("Loading "+c+"/"+max);
            var top=$(window).height()/2-s.height()/2;
            var left=$(window).width()/2-s.width()/2;
            s.css("left",left);
            s.css("top",top);
        }
        if (c>=max) PB.clear();
        //console.log(c);
    };
    var t;
    PB.clear=function () {
        if (s) s.remove();
        clearInterval(t);
    };
    t=setInterval(function (){
        PB.set($("script").length);
    },0);
    return PB;
}