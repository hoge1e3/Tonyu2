SplashScreen=function () {
    var s=$("<span>").css({position:"absolute",
            left: 100, top:100, fontSize: 30, background: "white"
        });
    var SS={};
    SS.show=function () {
    	if (!s) return;
    	if (SS.showing) return;
    	SS.showing=true;
    	console.log("Show");
    	s.appendTo("body");
        s.text("Loading ...");
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        s.css("left",left);
        s.css("top",top);
    };
    SS.hide=function () {
    	if (!SS.showing) return;
    	s.remove();
    	SS.showing=false;
    };
    return SS;
}();