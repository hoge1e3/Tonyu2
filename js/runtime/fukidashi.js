// From http://jsdo.it/hoge1e4/4wCX
//  (x,y) の位置に  V（←これ何て言うんだっけ） の先端が来るようにふきだし表示
function fukidashi(ctx, text, x, y, sz) {
    var align="c";
   var theight=20;
   var margin=5;
   var r=textGetRect(ctx, text, x,y-theight-margin-sz, sz, align);
   ctx.beginPath();
   ctx.moveTo(x , y);
   ctx.lineTo(x+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight);
   ctx.lineTo(x-margin , y-theight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
   //ctx.fillRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);
   //ctx.strokeRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);

   var fs=ctx.fillStyle;
   ctx.fillStyle=ctx.strokeStyle;
   textGetRect(ctx, text, x, y-theight-margin-sz, sz, align, "fill");
   ctx.fillStyle=fs;
}
// 現在のフォントのベースラインを取得する方法がわからないので決め打ち
var BASE_LINE=0.85;
// テキストを描いて(type=="test"なら描いたふりをするだけ)， 描かれた部分の矩形領域を返す
function textGetRect(ctx, text, x, topY, h, align , type) {
    if (!align) align="center";
    setFontSize(ctx, h);
    var met=ctx.measureText(text);
    var res={y:topY, w: met.width, h:h};
    switch (align.substring(0,1).toLowerCase()) {
        case "l":
            res.x=x;
            break;
        case "r":
            res.x=x-met.width;
            break;
        case "c":
            res.x=x-met.width/2;
            break;
    }
    if (type=="fill") ctx.fillText(text, res.x,topY+h*BASE_LINE);
    if (type=="stroke") ctx.strokeText(text, res.x,topY+h*BASE_LINE);
    return res;
}
setFontSize=function (ctx,sz) {
    var post=ctx.font.replace(/^[0-9\.]+/,"");
    ctx.font=sz+post;
};
