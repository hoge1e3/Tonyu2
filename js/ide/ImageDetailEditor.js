define(["UI","ImageList","ImageRect"],function (UI,ImageList,ImageRect) {
    var d=UI("div",{title:"画像詳細"},
            ["div",
             ["canvas",{$edit:"cv",width:500,height:300}] ],
             ["form",
              ["div",radio("rc"),"分割数指定：",
               ["input",{$var:"cols",size:5,on:{realtimechange:setRC}}],"x",
               ["input",{$var:"rows",size:5,on:{realtimechange:setRC}}]],
               ["div",radio("wh"),"1パターンの大きさ指定：",
                ["input",{$var:"pwidth",size:5,on:{realtimechange:setWH}}],"x",
                ["input",{$var:"pheight",size:5,on:{realtimechange:setWH}}]],
               ["div",radio("t1"),"Tonyu1互換",
                 ["button",{on:{click:tonyu1}},"解析"]],
               ["button",{on:{click:close}},"OK"]]
    );
    function radio(v) {
        return UI("input",{type:"radio",name:"type",value:v});
    }
    var v=d.$vars;
    var w,h,rows,cols;
    var IMD={};
    var item;
    var onclose;
    IMD.show=function (_item,baseDir, itemName, options) {
        if (!options) options={};
        onclose=options.onclose;
        item=_item;
        d.dialog({width:600,height:500});
        var url=ImageList.convURL(item.url,baseDir);
        ImageRect(url, v.cv[0])(function (res) {
            console.log(res);
            var im=res.src;
            w=im.width;
            h=im.height;
            var ctx=v.cv[0].getContext("2d");
            if (item.pwidth && item.pheight) {
                v.pwidth.val(item.pwidth);
                v.pheight.val(item.pheight);
                calcRC();
                ctx.strokeStyle="#f0f";
                ctx.beginPath();
                ctx.moveTo(res.left,res.top);
                ctx.lineTo(res.left+res.width,res.top);
                ctx.lineTo(res.left+res.width,res.top+res.height);
                ctx.lineTo(res.left,res.top+res.height);
                ctx.closePath();
                ctx.stroke();
            }
        });
    };
    function nNan(val,def) {
        if (val===val) return val;
        return def;
    }
    function setRC() {
        if (!item) return false;
        //console.log("setRC");
        cols=nNan( parseInt(v.cols.val()) ,cols);
        rows=nNan( parseInt(v.rows.val()) ,rows);
        calcWH();
        return false;
    }
    function calcWH() {
        if (!item) return false;
        item.pwidth=nNan( Math.floor(w/cols), item.pwidth);
        item.pheight=nNan( Math.floor(h/rows), item.pheight);
        v.pwidth.val(item.pwidth);
        v.pheight.val(item.pheight);
    }
    function setWH() {
        if (!item) return false;
        //console.log("setWH");
        item.pwidth=nNan( parseInt(v.pwidth.val()), item.pwidth);
        item.pheight=nNan( parseInt(v.pheight.val()), item.pheight);
        calcRC();
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

        return false;
    }
    function close() {
        d.dialog("close");
        if (onclose) onclose();
        return false;
    }
    return IMD;
});