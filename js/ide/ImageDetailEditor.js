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
    IMD.show=function (_item,baseDir, itemName) {
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
                calcRC();
                ctx.strokeStyle="magenda";
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
    function setRC() {
        cols=parseInt(v.cols.val());
        rows=parseInt(v.rows.val());
        calcWH();
        return false;
    }
    function calcWH() {
        item.pwidth=Math.floor(w/cols);
        item.pheight=Math.floor(h/rows);
        v.pwidth.val(item.pwidth);
        v.pheight.val(item.pheight);
    }
    function setWH() {
        item.pwidth=parseInt(v.pwidth.val());
        item.pheight=parseInt(v.pheight.val());
        calcRC();
        return false;
    }
    function calcRC() {
        cols=Math.floor(w/item.pwidth);
        rows=Math.floor(h/item.pheight);
        v.rows.val(rows);
        v.cols.val(cols);
    }
    function tonyu1() {

        return false;
    }
    function close() {
        d.dialog("close");
        return false;
    }
    return IMD;
});