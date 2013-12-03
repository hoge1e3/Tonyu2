function showErrorPos(elem, err) {
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
    var mesgd=$("<div>").text(mesg+" 場所："+src.name());
    mesgd.append($("<button>").text("閉じる").click(close));
    elem.append(mesgd);
    var str=src.text();
    var srcd=$("<pre>");
    srcd.append($("<span>").text(str.substring(0,pos)));
    srcd.append($("<img>").attr("src","images/ecl.png"));
    srcd.append($("<span>").text(str.substring(pos)));
    elem.append(srcd);
}