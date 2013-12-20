$(function () {
    //var home=FS.get("/Tonyu/");
    //var projects=home.rel("Projects/");
    //=projects.rel("SandBox/");
    function onResize() {
        var h=$(window).height()-$("#navBar").height();
        //if ($.browser.msie)
        h-=20;
        var ph=$("#prog").height();
        var txh=ph/$("#prog").attr("rows");
        $("#prog").attr("rows", Math.floor(h/2/txh) );
        var mw=$("#mainArea").width();
        var pw=$("#prog").width();
        var txw=pw/$("#prog").attr("cols");
        $("#prog").attr("cols", Math.floor(mw/txw) );

        $("#cv").attr("height", h/2).attr("width", mw);
        cv=$("#cv")[0].getContext("2d");

        $("#helpFrame").attr("height", h);
    }
    onResize();
    $(window).resize(onResize);
    $("body")[0].spellcheck=false;
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curProjectDir=FS.get(dir);
    var curDir=curProjectDir;
    var kernelDir=FS.get("/Tonyu/Kernel/");
    var curPrj=Tonyu.Project(curProjectDir, kernelDir);
    curPrj.env.options.compiler.defaultSuperClass="BasicActor";
    var curFile=null;
    var EXT=".tonyu";
    $("#dirName").text(curDir.path());
    TextUtil.attachIndentAdaptor("prog");
    function ls() {
        $("#fileItemList").empty();
        curDir.ls().forEach(function (name) {
            var f=curDir.rel(name);
            $("<li>").append(
                $("<span>").addClass("fileItem").text( (f.isReadOnly()?"[RO]":"")+dispName(name))
            ).appendTo("#fileItemList").click(function () {
                open(f);
            });
             //$("#fileItem").tmpl({name: dispName(name)}).appendTo("#fileItemList").click(function () {

        });
    }
    function dispName(name) {
        if (name.substring(name.length-EXT.length)==EXT) return name.substring(0,name.length-EXT.length);
        return name;
    }
    ls();
    $("#newFile").click(function () {
        var name=prompt("ファイル名を入力してください");
        name=fixName(name);
        if (!name) return;
        var f=curDir.rel(name);
        if (!f.exists()) {
            f.text("");
            ls();
            open(f);
        }
    });
    function fixName(name) {
        if (name.match(/^[A-Za-z_][a-zA-Z0-9_]*$/)) {
            return name+EXT;
        }
        alert("名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．");
        return null;
    }
    $("#mvFile").click(function () {
        if (!curFile) return;
        var newName=prompt("新しいファイル名を入力してください",curFile.name());
        newName=fixName(newName);
        if (!newName) return;
        var nf=curDir.rel(newName);
        if (nf.exists()) {
            alert(newName+" は存在します");
            return;
        }
        var t=curFile.text();
        curFile.rm();
        curFile=nf;
        nf.text(t);
        ls();
        open(curFile);
    });
    $("#rmFile").click(function () {
        if (!curFile) return;
        if (!confirm(curFile.name()+"を削除しますか？")) return;
        curFile.rm();
        ls();
        curFile=null;
        close();
    });
    $("#prog").bind("keydown","F9",run);
    $(document).bind("keydown","F9",run);
    $("#run").click(run);
    var rowsOnEdit=$("#prog").attr("rows");
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        switch(mode) {
        case "run":
            showErrorPos($("#errorPos"));
            //$("#errorPos").hide();// (1000,next);
            //$("#runArea").slideDown(1000, next);
            break;
        case "compile_error":
            //$("#errorPos").show();// slideDown(1000, next);
            break;
        case "runtime_error":
            //$("#errorPos").slideDown(1000, next);
            break;
        case "edit":
            //$("#runArea").slideUp(1000);
            //$("#errorPos").slideUp(1000, next);
            break;
        }
    }
    function mimimizeTextArea(t) {
        if (t) {
            $("#prog").attr("rows",5);
        } else {
            $("#prog").attr("rows",rowsOnEdit);
        }
    }
    function run() {
        if (!curFile) {
            alert("ファイルを開いてください");
            return;
        }
        save();
        displayMode("run");
        try {
            curPrj.run(curFile.name().replace(/\.tonyu$/,"") );
        } catch(e){
            if (e.isTError) {
                showErrorPos($("#errorPos"),e);
                displayMode("compile_error");
            }else{
                throw e;
            }
        }
    }
    Tonyu.onRuntimeError=function (e) {
        var t=curPrj.env.traceTbl;
        var te=t.decode($LASTPOS);
        if (te) {
            te.mesg=e;
            showErrorPos($("#errorPos"),te);
            displayMode("runtime_error");
            if(!$.browser.msie) throw e;
        } else throw e;
    };
    $("#prog").click(function () {
        displayMode("edit");
    });
    function close() {
        $("#prog").val("");
        $("#prog").attr("disabled",true);
    }
    function fixEditorIndent() {
        $("#prog").val(fixIndent($("#prog").val()));
    }
    function save() {
        if (curFile && !curFile.isReadOnly()) {
            fixEditorIndent();
            curFile.text($("#prog").val());
        }
    }
    function open(f) {
        save();
        curFile=f;
        $("#prog").attr("disabled",false);
        $("#prog").val( f.text() );
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
    };
});
