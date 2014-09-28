define(["WebSite","Log"],function (WebSite,Log) {
return function showErrorPos(elem, err) {
    var mesg, src, pos;
    if (!err) {
        close();
        return;
    }
    if (err.isTError) {
        mesg=err.mesg;
        src=err.src;
        pos=err.pos;
    } else {
        src={name:function (){return "不明";}};
        pos=0;
        mesg=err;
    }
    function close(){
        elem.empty();
    }
    close();
    var mesgd=$("<div>").text(mesg+" 場所："+src.name()+(typeof pos=="object"?":"+pos.row+":"+pos.col:""));
    //mesgd.append($("<button>").text("閉じる").click(close));
    elem.append(mesgd);
    elem.append($("<div>").attr("class","quickFix"));
    var str=src.text();
    if (str && typeof pos=="object") {
        var npos=0;
        var lines=str.split(/\n/);
        for (var i=0 ; i<lines.length && i+1<pos.row ; i++) {
            npos+=lines[i].length;
        }
        npos+=pos.col;
        pos=npos;
    }
    var srcd=$("<pre>");
    srcd.append($("<span>").text(str.substring(0,pos)));
    srcd.append($("<img>").attr("src",WebSite.top+"images/ecl.png"));
    srcd.append($("<span>").text(str.substring(pos)));
    elem.append(srcd);
    //elem.attr("title",mesg+" 場所："+src.name());
    elem.attr("title","エラー");
    elem.dialog({width:600,height:400});
    Log.d("error", mesg+"\nat "+src+":"+err.pos+"\n"+str.substring(0,err.pos)+"!!HERE!!"+str.substring(err.pos));
};
});