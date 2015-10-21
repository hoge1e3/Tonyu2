requirejs(["fs/ROMk","fs/ROMd","fs/ROMs","ace", "Util", "Tonyu", "FS", "FileList", "FileMenu",
                         "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project","runtime"],
function (romk, romd , roms, ace, Util, Tonyu, FS, FileList, FileMenu,
        showErrorPos, fixIndent, Wiki, Tonyu_Project,runtime) {
$(function () {
    Tonyu.noviceMode=true;
    Tonyu.defaultResource={
            images:[{url: "images/neko.png", pwidth:32, pheight:32}]
    };
    Tonyu.defaultOptions={
            compiler: { defaultSuperClass: "NoviceActor"},
            run: {mainClass: "Main", bootClass: "Boot"},
            kernelEditable: false
        };

    //ImageList(Tonyu.defaultResource.images, Sprites.setImageList);
    function onResize() {
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        var mw=$("#mainArea").width();
        $("#prog").css("height",h/2+"px");
        $("#cv").attr("height", h/2).attr("width", mw);
        $("#wikiViewArea").css("height", h);
        cv=$("#cv")[0].getContext("2d");
    }
    onResize();
    var prog=ace.edit("prog");
    prog.setTheme("ace/theme/eclipse");
    prog.getSession().setMode("ace/mode/tonyu");
    prog.commands.addCommands([{
        name: "run",
        bindKey: {win: "F9", mac: "F9"},
        exec: function(editor, line) {
            run();
        }
    }]);
    var closedMsg="←左のリストからファイルを選択してください．\nファイルがない場合はメニューの「ファイル」→「新規」を選んでください";
    prog.setValue(closedMsg);
    prog.setReadOnly(true);
    prog.clearSelection();

    $(window).resize(onResize);
    $("body")[0].spellcheck=false;
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curProjectDir=FS.get(dir);
    var fl=FileList($("#fileItemList"),{
        topDir: curProjectDir,
        on:{
            select: open,
            displayName: dispName
        }
    });
    var FM=FileMenu();
    FM.fileList=fl;
    $("#newFile").click(FM.create);
    $("#mvFile").click(FM.mv);
    $("#rmFile").click(FM.rm);
    FM.on.close=close;
    FM.on.ls=ls;
    var vnorg=FM.on.validateName;
    FM.on.validateName=fixName;
    FM.on.displayName=function (f) {
        var r=dispName(f);
        if (r) {
            if (f.endsWith(EXT)) return {
                name: r, mode:EXT
            };
            return r;
        }
        return f.name();
    };

    var kernelDir=FS.get("/Tonyu/Kernel/");
    var curPrj=Tonyu_Project(curProjectDir, kernelDir);
    //curPrj.env.options.compiler.defaultSuperClass="NoviceActor";
    var EXT=".tonyu";
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;
    fl.ls(curProjectDir);
    refreshRunMenu();
    function ls(){
        fl.ls(curProjectDir);
        refreshRunMenu();
    }
    function refreshRunMenu() {
        curProjectDir.each(function (f) {
            if (f.endsWith(EXT)) {
                var n=f.truncExt(EXT);
                if (runMenuOrd.indexOf(n)<0) {
                    runMenuOrd.push(n);
                }
            }
        });
        var i;
        for (i=runMenuOrd.length-1; i>=0 ; i--) {
            var f=curProjectDir.rel(runMenuOrd[i]+EXT);
            if (!f.exists()) {
                runMenuOrd.splice(i,1);
            }
        }
        $("#runMenu").empty();
        i=0;
        runMenuOrd.forEach(function(n) {
            var ii=i;
            if (typeof n!="string") {console.log(n); alert("not a string: "+n);}
            $("#runMenu").append(
                    $("<li>").append(
                            $("<a>").attr("href","#").text(n+"を実行"+(i==0?"(F9)":"")).click(function () {
                                if (typeof n!="string") {console.log(n); alert("not a string2: "+n);}
                                run(n);
                                runMenuOrd.splice(ii, 1);
                                runMenuOrd.unshift(n);
                                refreshRunMenu();
                            })));
            i++;
        });
        saveDesktopEnv();
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT)) return f.truncExt(EXT);
        return null;
    }
    function fixName(name) {
        if (name.match(/^[A-Za-z_][a-zA-Z0-9_]*$/)) {
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
        }
    }

    $("#prog").bind("keydown","F9",run);
    $(document).bind("keydown","F9",run);
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        switch(mode) {
        case "run":
            prog.blur();
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
        /*if (t) {
            $("#prog").attr("rows",5);
        } else {
            $("#prog").attr("rows",rowsOnEdit);
        }*/
    }
    function run(name) {
        curPrj.stop();
        if (typeof name!="string") {
            if (runMenuOrd.length==0) {
                alert("ファイルを作成してください");
                return;
            }
            name=runMenuOrd[0];// curFile.name().replace(/\.tonyu$/,"");
        }
        if (typeof name!="string") {console.log(name); alert("not a string3: "+name);}
        save();
        displayMode("run");
        try {
            var o=curPrj.getOptions();
            o.run.mainClass=name;
            curPrj.setOptions();
            //Tonyu.setGlobal("$mainClassName", name);
            curPrj.rawRun(o.run.bootClass);

            //curPrj.rawRun("Boot");
            //curPrj.run(name);
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
        prog.setValue(closedMsg);
        prog.setReadOnly(true);
    }
    function fixEditorIndent() {
        var cur=prog.getCursorPosition();
        prog.setValue(fixIndent( prog.getValue() ));
        prog.clearSelection();
        prog.moveCursorTo(cur.row, cur.column);
    }
    function save() {
        var curFile=fl.curFile();
        if (curFile && !curFile.isReadOnly()) {
            fixEditorIndent();
            curFile.text(prog.getValue());
        }
    }
    function open(f) {
        if (f.isDir()) {
            return;
        }
        save();
        prog.setValue( f.text(),0 );
        prog.setReadOnly(false);
        prog.clearSelection();
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
    };
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/novice/"));
    w.show("projectIndex");

    function loadDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        return desktopEnv=res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }


    /*$("#newFile").click(function () {
    var name=prompt("ファイル名を入力してください","");
    name=fixName(name);
    if (!name) return;
    var f=fl.curDir().rel(name);
    if (!f.exists()) {
        f.text("");
        ls();
        open(f);
    }
});*/
    /*$("#mvFile").click(function () {
        if (!curFile) return;
        var fix;
        var name=curFile.name();
        if (curFile.endsWith(EXT)) {
            fix=true;
            name=curFile.truncExt(EXT);
        } else {
            fix=false;
            name=curFile.name();
        }
        var newName=prompt("新しいファイル名を入力してください",name);
        if (fix) newName=fixName(newName);
        if (!newName) return;
        var nf=fl.curDir().rel(newName);
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
    });*/

});
});
