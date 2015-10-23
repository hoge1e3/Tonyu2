TextEditor=function (elem, options) {
    var fn=$("<div>");
    var text=$("<textarea>").css({width:"100%", height:"100px"});
    var height;
    var orig;
    var curF;
    var cnt=0;
    var _isModified=false;
    var thiz;
    var on={};
    elem.append(fn).append(text);
    function open(f) {
        if (isModified()) save();
        curF=f;
        fn.text(f.path());
        text.val(orig=f.text());
        if (height) setHeight(height);
    }
    function setHeight(h) {
        height=h;
        var th=h-fn.height();
        text.css({height:th+"px"});
    }
    function loop() {
        if (curF) {
            if (orig!=text.val()) {
                setModified(true);
            }
            if (isModified()) {
                cnt++;
                if (cnt>10) {
                    save();
                    cnt=0;
                }
            }
            refreshStatus();
            if (on.loop) on.loop.apply(thiz);
        }
    }
    setInterval(loop,100);
    function save() {
        if (curF) {
            curF.text(text.val());
            setModified(false);
            orig=curF.text();
            cnt=0;
            if (on.save) {
                on.save(curF);
            }
        }
    }
    function setModified(m) {
        if (curF) {
            _isModified=m;
            refreshStatus();
        }
    }
    function refreshStatus() {
        if (!curF) return;
        var p=caretPos();
        fn.text((_isModified?"*":"") + curF.path() + " - "+p.row+":"+p.col);
    }
    function caretPos() {
        var index=TextUtil.getCaretPos(text[0]);
        r=TextUtil.caretPos2RowCol(text[0],index);
        r.index=index;
        return r;
    }
    function isModified(m) {return _isModified;}
    return thiz={open:open, setHeight:setHeight, on:on,save:{},textarea:text,caretPos:caretPos};
};