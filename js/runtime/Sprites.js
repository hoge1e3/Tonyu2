Sprites=function () {
    var sprites=[];
    function add(params) {
        var s={width:32, height:32};
        s.draw=function (ctx) {
            if (s.x==null || s.y==null) return;
            if (s.p==null) s.p=0;
            s.p=Math.floor(s.p);
            var img=baseImg;

            ctx.drawImage( img.image ,
                    img.pwidth*(s.p % img.rows), img.pheight*(Math.floor(s.p/img.rows)) ,
                    img.pwidth, img.pheight,
                    s.x-s.width/2, s.y-s.height/2,
                    img.pwidth, img.pheight
                    );
            if (s.fukidashi) {
                if (s.fukidashi.c>0) {
                    s.fukidashi.c--;
                    ctx.fillStyle="white";
                    ctx.strokeStyle="black";
                    fukidashi ( ctx , s.fukidashi.text, s.x, s.y-s.height/2-10, s.fukidashi.size);
                }
            }
            /*var ary=[img.pwidth*(s.p % img.rows), img.pheight*(Math.floor(s.p/img.rows)) ,
            img.pwidth, img.pheight,
            s.x, s.y,
            img.pwidth, img.pheight];
            console.log(ary.join(","));
            */
            //ctx.drawImage( img.image, 32,32,32,32, 32,32,32,32);
        };
        s.crashTo=function (t) {
            if (s.x!=null && s.y!=null && s.width && s.height &&
                    t && t.x!=null && t.y!=null && t.width && t.height ) {
                if (Math.abs(s.x-t.x)*2<s.width+t.width &&
                    Math.abs(s.y-t.y)*2<s.height+t.height) {
                    return true;
                }
            }
            return false;
        };
        s.hitTo=s.crashTo;
        s.toString=function () {
            return "spr";
        };
        Tonyu.extend(s,params);
        sprites.push(s);
        return s;
    }
    function remove(s) {
        sprites.splice(sprites.indexOf(s),1);
    }
    function clear() {sprites.splice(0,sprites.length);}
    function draw(cv) {
        var ctx=cv.getContext("2d");
        //ctx.drawImage( baseImg.image , 32,32,32,32, 50,50,32,32);
        ctx.fillStyle="rgb(20,80,180)";
        ctx.fillRect(0,0,cv.width,cv.height);
        drawGrid(cv);
        //console.log("draw!");
        sprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
    }
    var hitWatchers=[];
    function checkHit() {
        hitWatchers.forEach(function (w) {
            sprites.forEach(function (a) {
                //console.log("a:",  a.owner);
                if (! (a.owner instanceof w.A)) return;
                sprites.forEach(function (b) {
                    if (a===b) return;
                    if (! (b.owner instanceof w.B)) return;
                    //console.log("b:",  b.owner);
                    if (a.hitTo(b)) {
                        //console.log("hit", a.owner, b.owner);
                        w.h(a.owner,b.owner);
                    }
                });
            });
        });
    }
    function watchHit(typeA, typeB, onHit) {
        var p={A: typeA, B:typeB, h:onHit};
        //console.log(p);
        hitWatchers.push(p);
    }
    return {add:add, remove:remove, draw:draw, clear:clear, sprites:sprites,
        checkHit:checkHit, watchHit:watchHit};
}();

$(function () {
    console.log("Baseimg prepare");
    // for IE
    $("#baseImg").attr("src",$("#baseImg").attr("src")+ "?" + new Date().getTime());
    //
    $("#baseImg").load(function () {
        console.log("BaseImg loaded");
        baseImg={
                image: $("#baseImg")[0],
        };
        baseImg.pwidth=32;
        baseImg.pheight=32;
        baseImg.rows=Math.floor( baseImg.image.width/baseImg.pwidth);
        console.log("BaseImg loaded rows="+baseImg.rows);
       // $(this).hide();
    });

});

function drawGrid(c) {
    var ctx=c.getContext("2d");
    ctx.save();
    ctx.strokeStyle="rgb(40,100,200)";
    for (var i=0 ; i<c.width ; i+=10) {
        ctx.beginPath();
        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
        ctx.moveTo(i,0);
        ctx.lineTo(i,c.height);
        ctx.closePath();
        ctx.stroke();
    }

    for (var i=0 ; i<c.height ; i+=10) {
        ctx.beginPath();
        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
        ctx.moveTo(0,i);
        ctx.lineTo(c.width,i);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.fillStyle="white";
    ctx.font="15px monospaced";
    for (var i=100 ; i<c.width ; i+=100) {
        ctx.fillText(i, i,15);
    }
    for (var i=100 ; i<c.height ; i+=100) {
        ctx.fillText(i, 0,i);
    }
    ctx.restore();
}

