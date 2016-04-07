requirejs(["Util","Wiki","TextEditor","FileList","FileMenu","FS","TextUtil","WebSite"],
        function (Util,Wiki,TextEditor,FileList,FileMenu,FS,TextUtil,WebSite) {
$(function () {
    var thome=FS.get(WebSite.tonyuHome);
    var home=FS.get(Util.getQueryString("home",thome.rel("doc/").path()));
    var w=Wiki($("#wikiViewArea"),home,{editMode:true});
    var f=FileList($("#fileList"));
    var t=TextEditor($("#editorArea"));
    var prevRow=null;
    var FM=FileMenu();
    FM.fileList=f;
    $("#newFile").click(FM.create);
    $("#mvFile").click(FM.mv);
    $("#rmFile").click(FM.rm);

    var showfl=false;
    f.on.select=function (file) {
        if (!file.isDir()) {
        	if (!showfl) showWiki(file);
            //return true;
        } else {
            f.ls();
        }
    };
    w.on.show=function (file) {
        //console.log("onsho "+f);
        t.open(file);
        //f.ls();
    	showfl=true;
    	f.select(file);
    	showfl=false;
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
        $("#wikiViewArea").height(h);
        $("#fileList").height(h);
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
        //w.highlightLine(row);
    };
});
});
