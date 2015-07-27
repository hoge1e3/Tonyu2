define(["T2MediaLib"],function (T2MediaLib) {
    SoundDiag={};
    SoundDiag.show=function (cv, onSelect) {
        onSelect=onSelect||function (){};
        var ctx=cv[0].getContext("2d");
        var w=cv.width(),h=cv.height();
        var size=30;
        ctx.fillStyle="black";
        ctx.font=size+"px monospace";
        drawCenter("Sound on",h/3);
        drawCenter("Sound off",h/3*2);
        cv.on("click", function (e) {
            if (e.originalEvent.y<h/2) {
                T2MediaLib.init();
                ctx.fillStyle="red";
                T2MediaLib.disabled=false;
                T2MediaLib.activate();
                drawCenter("Sound on",h/3);
                console.log("Sound ON");
                onSelect();
            } else {
                T2MediaLib.disabled=true;
                ctx.fillStyle="red";
                console.log("Sound OFF");
                drawCenter("Sound off",h/3*2);
                onSelect();
            }
        });
        function drawCenter(text,y) {
            var t=ctx.measureText(text);
            ctx.fillText(text, w/2-t.width/2, y+size/2);
        }
    };
    return SoundDiag;
});