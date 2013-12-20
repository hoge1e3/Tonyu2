requirejs(["Util","Wiki","TextEditor","FileList","FileMenu","FS","TextUtil"],
        function (Util,Wiki,TextEditor,FileList,FileMenu,FS,TextUtil) {
$(function () {
    var home=FS.get(Util.getQueryString("home","/Tonyu/doc/"));
    var w=Wiki($("#wikiViewArea"),home);
    var f=FileList($("#fileList"));
    var t=TextEditor($("#editorArea"));
    var prevRow=null;
    FileMenu.fileList=f;

    f.on.select=function (f) {
        if (!f.isDir()) {
            showWiki(f);
            //return true;
        }
    };
    w.on.show=function (fi) {
        //console.log("onsho "+f);
        t.open(fi);
        f.ls();
    };
    function showWiki(f) {
        //var n=f.name();
        w.show(f);// n.substring(0,n.length-4));
        prevRow=null;
    }
    f.on.displayName=function (f) {
        var n=f.name();
        if (f.endsWith(".txt")) {
            return n.substring(0,n.length-4);
        }
        return n;
    };
    f.ls(home);
    function onResize() {
        var h=$(window).height()-$("#navbar").height();
        t.setHeight(h);
    }
    $(window).resize(onResize);
    onResize();
    t.on.save=function (f) {
        //console.log("Show "+f.path());
        showWiki(f);
    };
    t.on.loop=function () {
        var p=this.caretPos();
        var row=p.row-1;
        if (prevRow==null) {
            prevRow=row;
            return;
        } else if (prevRow==row) {
            return;
        }
        prevRow=row;
        w.highlightLine(row);
    };
});
});
