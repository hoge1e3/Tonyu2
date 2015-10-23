define(["T2MediaLib"],function (T2MediaLib) {
    SoundDiag={};
    SoundDiag.show=function (/*cv,*/ onSelect) {
        var bsty={fontSize:"2em"};
        onSelect=onSelect||function (){};
        var d=$("<div>").css({position:"absolute", left:100,top:100}).append(
                $("<button>").css(bsty).text("Sound on").click(soundOn)
        ).append(
                $("<button>").css(bsty).text("Sound off").click(soundOff)
        ).appendTo("body");
        function soundOn() {
            T2MediaLib.init();
            T2MediaLib.disabled=false;
            T2MediaLib.activate();
            console.log("Sound ON");
            d.remove();
            onSelect();
        }
        function soundOff() {
            T2MediaLib.disabled=true;
            console.log("Sound OFF");
            d.remove();
            onSelect();
        }
        /*var ctx=cv[0].getContext("2d");
        var w=cv.width(),h=cv.height();
        var size=30;
        ctx.fillStyle="black";
        ctx.font=size+"px monospace";
        drawCenter("Sound on",h/3);
        drawCenter("Sound off",h/3*2);
        cv.on("click", func);
        function func(e) {
            if (e.originalEvent.y<h/2) {

            } else {

            }
        }
        function drawCenter(text,y) {
            var t=ctx.measureText(text);
            ctx.fillText(text, w/2-t.width/2, y+size/2);
        }*/
    };
    return SoundDiag;
});