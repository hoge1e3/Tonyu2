define(["UI","ImageList","ImageRect","PatternParser","WebSite","Assets","R"],
        function (UI,ImageList,ImageRect,PP,WebSite,Assets,R) {
    var d=UI("div",{title:R("imageDetails")},
            ["div",
             ["div","URL:",["span",{$var:"url"}]],//,size:40,on:{change:setURL}}]],
             ["a",{$var:"openImg",target:"_blank"},"画像を確認..."],
             ["canvas",{$edit:"cv",width:500,height:250,on:{mousemove:cvMouse,mousedown:cvClick}}] ],
             ["form",{$var:"theForm"},
               ["div",radio("single"),R("singlePicture")],
               ["div",radio("rc"),R("rowsAndColumns"),
                ["input",{$var:"cols",size:5,on:{realtimechange:setRC,focus:selRC}}],"x",
                ["input",{$var:"rows",size:5,on:{realtimechange:setRC,focus:selRC}}]],
               ["div",radio("wh"),R("chipWidthAndHeight"),
                ["input",{$var:"pwidth",size:5,on:{realtimechange:setWH,focus:selWH}}],"x",
                ["input",{$var:"pheight",size:5,on:{realtimechange:setWH,focus:selWH}}]],
               ["div",radio("t1"),R("compatibleWithTonyu1"),
                 ["button",{on:{click:tonyu1}},R("parse")]],
               ["div",R("chipNo"),["input",{$var:"patName"}] ],
               ["button",{on:{click:close}},"OK"]]
    );
    function radio(v) {
        return UI("input",{type:"radio",name:"type",value:v,on:{
            click:function (){selval(v);}
        }});
    }
    function selval(v) {
        switch (v) {
        case "single":
            if (!item) return false;
            cols=1;//nNan( parseInt(v.cols.val()) ,cols);
            rows=1;//nNan( parseInt(v.rows.val()) ,rows);
            calcWH();
            setWH();//?
            redrawImage();
            return false;
        case "rc":
            return setRC();
        case "wh":
            return setWH();
        }
    }
    var v=d.$vars;
    var w,h,rows,cols;
    var IMD={};
    var item;
    var srcImg;
    var onclose;
    var canvasRect;
    var chipRects, curChipIndex=-1;
    var curItemName;
    /*function setURL() {
        if (item) item.url=v.url.val();
    }*/
    function selRC() {
        v.theForm[0].type.value="rc";
    }
    function selWH() {
        v.theForm[0].type.value="wh";
    }
    function selSingle() {
        v.theForm[0].type.value="single";
    }
    IMD.show=function (_item, prj, itemName, options) {
        if (!options) options={};
        onclose=options.onclose;
        item=_item;
        curItemName=itemName;
        d.dialog({width:600,height:520});
        v.url.text(item.url);
        var url=Assets.resolve(item.url, prj);
        if (WebSite.serverType==="BA") {
            v.openImg.show().attr("href",url);
        } else {
            v.openImg.hide();
        }
        if (WebSite.isNW) {
            var path;
            // NW.jsでWebSite.urlAliasesが空っぽ！
            // とりあえずテキトウに実装
            var urlAliases = {
                "images/Ball.png":"www/images/Ball.png",
                "images/base.png":"www/images/base.png",
                "images/Sample.png":"www/images/Sample.png",
                "images/neko.png":"www/images/neko.png",
                "images/mapchip.png":"www/images/mapchip.png",
                "images/sound.png":"www/images/sound.png",
                "images/sound_ogg.png":"www/images/sound_ogg.png",
                "images/sound_mp3.png":"www/images/sound_mp3.png",
                "images/sound_mp4.png":"www/images/sound_mp4.png",
                "images/sound_m4a.png":"www/images/sound_m4a.png",
                "images/sound_mid.png":"www/images/sound_mid.png",
                "images/sound_wav.png":"www/images/sound_wav.png",
                "images/ecl.png":"www/images/ecl.png"
            };
            try {
                path=urlAliases[item.url];
                if(!path)path=url;
            }catch(e) {
                path=url;
            }
            //var urlScript = "javascript:nw.Window.open('"+path+"', {}, function(w) {w.y=20;w.width=700;w.height=600;})";
            //v.openImg.attr("href",urlScript);
        } else {
            //v.openImg.attr("href",url);
        }

        ImageRect(url, v.cv[0])(function (res) {
            canvasRect=res;
            console.log(res);
            srcImg=res.src;
            w=srcImg.width;
            h=srcImg.height;
            if (item.type=="single") {
                selSingle();
            } else if (item.pwidth && item.pheight) {
                v.pwidth.val(item.pwidth);
                v.pheight.val(item.pheight);
                calcRC();
                selWH();
            } else {
                v.theForm[0].type.value="t1";
            }
            drawFrame();
        });
    };
    function redrawImage() {
        var ctx=v.cv[0].getContext("2d");
        var r=canvasRect;
        if (!r) return;
        if (!srcImg) return;
        ctx.clearRect( r.left, r.top, r.width, r.height);
        ctx.drawImage(srcImg, 0,0,w,h, r.left, r.top, r.width, r.height);
        drawFrame();
    }
    function drawFrame() {
        var rects=ImageList.parse1(item, srcImg, {boundsInSrc:true});
//        console.log("drawFrame", rects);
        var ctx=v.cv[0].getContext("2d");
        rects.forEach(function (r) {
            rect(ctx,calcRect(r));
        });
        chipRects=rects;
    }
    function inRect(point,rect) {
        return rect.left<= point.x && point.x<= rect.left+rect.width &&
               rect.top<=point.y && point.y<=rect.top+rect.height ;
    }
    function calcRect(r) { // rect in srcImg:{x,y,width,height}
        var s={};  // returns rect in canvas(v.cv):{left,top,width,hegiht};
        var scaleX=canvasRect.width/w;
        var scaleY=canvasRect.height/h;
        s.left=canvasRect.left+r.x*scaleX;
        s.top=canvasRect.top+r.y*scaleY;
        s.width=r.width*scaleX;
        s.height=r.height*scaleY;
        return s;
    }
    function cvMouse(e) {
        var ctx=v.cv[0].getContext("2d");
        var o=v.cv.offset();
        var p={x:e.pageX-o.left, y:e.pageY-o.top};
        if (!chipRects) {
            console.log("cvMouse");
            return;
        }
        chipRects.forEach(function (r,i) {
            var cr=calcRect(r);
            //console.log(p.x, p.y, cr);
            if (inRect(p,cr )) {
                var pc=chipRects[curChipIndex];
                if (pc) {
                    var pcr=calcRect(pc);
                    rect(ctx,pcr);
                }
                curChipIndex=i;
                rect(ctx,cr,"#ff0");
            }
        });
    }
    function cvClick() {
        var pc=chipRects[curChipIndex];
        if (pc) {
            var pv=curItemName+"+"+curChipIndex;
            v.patName.val(pv);
            copyToClipboard(pv);
        }
    }
    function rect(ctx,rect,col) {
        ctx.strokeStyle=col || "#f0f";
        ctx.beginPath();
        ctx.moveTo(rect.left,rect.top);
        ctx.lineTo(rect.left+rect.width,rect.top);
        ctx.lineTo(rect.left+rect.width,rect.top+rect.height);
        ctx.lineTo(rect.left,rect.top+rect.height);
        ctx.closePath();
        ctx.stroke();
    }
    function nNan(val,def) {
        if (val===val) return val;
        return def;
    }
    function setRC() {
        if (v.theForm[0].type.value!="rc") return false;
        if (!item) return false;
        //console.log("setRC");
        cols=nNan( parseInt(v.cols.val()) ,cols);
        rows=nNan( parseInt(v.rows.val()) ,rows);
        calcWH();
        redrawImage();
        return false;
    }
    function calcWH() {
        if (!item) return false;
        item.type="wh";
        item.pwidth=nNan( Math.floor(w/cols), w);//item.pwidth);
        item.pheight=nNan( Math.floor(h/rows), h);//item.pheight);
        console.log("calcWH",item);
        v.pwidth.val(item.pwidth);
        v.pheight.val(item.pheight);
    }
    function setWH() {
        if (v.theForm[0].type.value!="wh") return false;
        if (!item) return false;
        //console.log("setWH",item);
        item.type="wh";
        item.pwidth=nNan( parseInt(v.pwidth.val()), item.pwidth);
        item.pheight=nNan( parseInt(v.pheight.val()), item.pheight);
        calcRC();
        redrawImage();
        return false;
    }
    function calcRC() {
        if (!item) return false;
        cols=nNan( Math.floor(w/item.pwidth),cols);
        rows=nNan( Math.floor(h/item.pheight),rows);
        v.rows.val(rows);
        v.cols.val(cols);
    }
    function tonyu1() {
        if (!item) return false;
        delete item.pwidth;
        delete item.pheight;
        item.type="t1";
        v.theForm[0].type.value="t1";
        try {
            redrawImage();
        } catch (e) {
            alert(e);
        }
        /*var p=new PP(srcImg);
        p.parse();
        */
        return false;
    }
    function close() {
        d.dialog("close");
        if (onclose) onclose();
        return false;
    }
    function copyToClipboard(value) {
        if (!WebSite.isNW) return;
        var gui = require('nw.gui');
        var clipboard = gui.Clipboard.get();
        clipboard.set(value, 'text');
    }

    return IMD;
});
