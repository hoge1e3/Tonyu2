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
        s.text("Please wait...");
        var top=$(window).height()/2-s.height()/2;
        var left=$(window).width()/2-s.width()/2;
        s.css("left",left);
        s.css("top",top);
    };
    var cnt=0;
    setInterval(function () {
        s.text("Please wait"+(cnt%2==0?"...":""));
        cnt++;
    },100);
    SS.hide=function () {
    	if (!SS.showing) return;
    	console.log("Hide");
    	s.remove();
    	SS.showing=false;
    };
    return SS;
}();