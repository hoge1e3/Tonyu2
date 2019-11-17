define(function (require) {
const Util=require("Util");
const Tonyu=require("Tonyu");
const FS=require("FS");
const FileList=require("FileList");
const FileMenu=require("FileMenu");
const ErrorDialog=require("ErrorDialog");
const fixIndent=require("fixIndent");
const ProjectOptionsEditor=require("ProjectOptionsEditor");
const KeyEventChecker=require("KeyEventChecker");
const sh=require("Shell");
const sh2=require("Shell2");// Open shell
const ResEditors=require("ResEditors");
const WebSite=require("WebSite");
const EC=require("exceptionCatcher");
const Log=require("Log");
const WebFS=require("WebFS");
const extLink=require("extLink");
const DebugDialog=require("DebugDialog");
const root=require("root");
const IDEProject=require("IDEProject");
const optionFixer=require("optionFixer");
const SourceFiles=require("SourceFiles");
const RealtimeErrorMarker=require("RealtimeErrorMarker");
const Dialogs=require("Dialogs");
const jshint=require("jshint");
$(function () {
    jshint.use(sh2);
    //https://codepen.io/oatssss/pen/oYxJQV?editors=0010
    if (!WebSite.isNW) {
        FS.mount(location.protocol+"//"+location.host+"/", new WebFS());
    }
    if (WebSite.serverType==="projectBoard") {
        $.ajax("../../../a.php?Test/test").then(function (r){console.log("Session",r);});
    }
    $.get("https://edit.tonyu.jp/doc/welcome_edit.html?a").then(function (t) {
        $("#welcome").append(t);
    });
    var F=EC.f;
    root.$LASTPOS=0;
    var mobile=WebSite.mobile || FS.get(WebSite.tonyuHome).rel("mobile.txt").exists();
    if (mobile) {
        $("#fileViewer").hide();
        $("#runAreaParent").hide();
        $("#mainArea").attr("class","col-xs-12");
        $("#fileSel").show();
    }
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curPrjDir=FS.get(dir);
    const optionFile=curPrjDir.rel("options.json");
    optionFixer.fixFile(optionFile);
    const editors={};
    const ide={restart,stop,save,displayMode,dispName,jump,refreshRunMenu,
        editors,getCurrentEditorInfo,saveDesktopEnv,run};
    const curPrj=IDEProject.create({dir:curPrjDir,ide});//, kernelDir);
    ide.project=curPrj;
    const EXT=curPrj.getEXT();
    const NSP_USR=curPrj.getNamespace();
    root.curPrj=curPrj;
    const resEditors=new ResEditors(curPrj);
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    const desktopEnv=loadDesktopEnv();
    ide.desktopEnv=desktopEnv;
    const runMenuOrd=desktopEnv.runMenuOrd;
    //const exportHTMLDialog=new ExportHTMLDialog(curPrj);
    function setDiagMode(d) {
        var opt=curPrj.getOptions();
        if (opt.compiler.diagnose!=d) {
            opt.compiler.diagnose=d;
            curPrj.setOptions(opt);
        }
    }
    Tonyu.defaultResource={
       images:[
          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
          {name:"$pat_sample", url: "images/Sample.png"},
          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
          {name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32}
       ],
       sounds:[]
    };
    const resf=curPrj.getResourceFile();
    if (!resf.exists()) resf.obj(Tonyu.defaultResource);
    setDiagMode(false);
    const runDialogParam={
        screenH:200,
        desktopEnv: desktopEnv,
        prj: curPrjDir.path(),
        ide
    };
    function onResize() {
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        runDialogParam.screenH=h;
        $("#progs pre").css("height",h+"px");
        $("#fileItemList").height(h);
    }
    onResize();
    RealtimeErrorMarker(ide);
    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(stop));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    $(window).resize(F(onResize));
    $("body")[0].spellcheck=false;
    sh.cd(curPrjDir);
    var fl=FileList($(mobile?"#fileSel":"#fileItemList"),{
        topDir: curPrjDir,
        ide,
        runDialogParam,
        on:{
            displayName: dispName
        }
    });
    var FM=FileMenu(ide);
    FM.fileList=fl;
    ide.fileList=fl;
    ide.fileMenu=FM;
    const dialogs=Dialogs(ide);
    $("#newFile").click(F(FM.create));
    $("#mvFile").click(F(FM.mv));
    $("#rmFile").click(F(FM.rm));
    $("#closeFile").click(F(FM.close));
    $("#runDialog").click(F(function () {
        runDialog.show(true);
    }));
    fl.ls(curPrjDir);
    refreshRunMenu();
    function refreshRunMenu() {
        curPrjDir.each(function (f) {
            if (f.endsWith(EXT)) {
                var n=f.truncExt(EXT);
                if (runMenuOrd.indexOf(n)<0) {
                    runMenuOrd.push(n);
                }
            }
        });
        var i;
        for (i=runMenuOrd.length-1; i>=0 ; i--) {
            var f=curPrjDir.rel(runMenuOrd[i]+EXT);
            if (!f.exists()) {
                runMenuOrd.splice(i,1);
            }
        }
        $("#runMenu").empty();
        i=0;
        runMenuOrd.forEach(function(n) {
            var ii=i;
            if (typeof n!="string") {console.log(n); alert("not a string: "+n);}
            if (ii>=15) return;
            $("#runMenu").append(
                    $("<li>").append(
                            $("<a>").attr("href","#").text(n+"を実行"+(i==0?"(F9)":"")).click(F(function () {
                                if (typeof n!="string") {console.log(n); alert("not a string2: "+n);}
                                run(`${NSP_USR}.${n}`);
                                if (ii>0) {
                                    runMenuOrd.splice(ii, 1);
                                    runMenuOrd.unshift(n);
                                    refreshRunMenu();
                                    saveDesktopEnv();
                                }
                            }))));
            i++;
        });
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("停止(F2)").click(F(function () {
                            stop();
                        }))));
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("実行するファイルを選択...").click(F(dialogs.selectMain))
                    ));
        //saveDesktopEnv();
        //$("#exportToJsdoit").attr("href", "exportToJsdoit.html?dir="+curPrjDir.path());//+"&main="+runMenuOrd[0]);
        //$("#exportToExe").attr("href", "exportToExe.html?dir="+curPrjDir.path());//+"&main="+runMenuOrd[0]);
    }
    $("#exportToJsdoit").attr("href", jshint.scriptURL(";")).click(dialogs.exportHTML);
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT)) return f.truncExt(EXT);
        return null;
    }
    function getCurrentEditorInfo() {
        var f=fl.curFile();
        if (!f) return null;
        return editors[f.path()];
    }
    function getCurrentEditor() {
        var i=getCurrentEditorInfo();
        if (i) return i.editor;
        return null;
    }
    const runDialog=new DebugDialog(runDialogParam);
    function displayMode(mode/*, next*/) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            errorDialog.close();
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").show().attr("class","col-xs-12");
                $("#mainArea").hide();//attr("class","col-xs-12");
                onResize();
            }
            if (!runDialog.opened) {
                runDialog.show();
            }
            break;
        case "compile_error":
            if (root.SplashScreen) root.SplashScreen.hide();
            break;
        case "runtime_error":
            if (root.SplashScreen) root.SplashScreen.hide();
            break;
        case "edit":
            if (runDialog.modified) {
                delete runDialog.modified;
                saveDesktopEnv();
            }
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").hide();//.attr("class","col-xs-12");
                $("#mainArea").show();//attr("class","col-xs-12");
            }
            break;
        }
    }
    let cmdStat;
    function setCmdStat(c) {
        console.log("setCmtStat",cmdStat,"to",c);
        if (c && cmdStat) {
            alert("他のコマンド("+cmdStat+")が実行されているのでお待ちください．\n"+
                "しばらくたってもこのメッセージが出る場合，一旦Homeに戻ってください．");
            return;
        }
        cmdStat=c;
        return c;
    }
    function stop(opt) {
        if (!setCmdStat("stop")) return;
        return $.when(curPrj.stop()).then(function () {
            curPrj.disconnectDebugger();
            displayMode("edit");
            console.log("Boot stopped");
            if (opt && opt.closeAfterStop) runDialog.close();
        }).finally(function () {
            setCmdStat();
        });
    }
    //\run
    function run(name) {
        if (!setCmdStat("run")) return;
        return $.when(curPrj.stop()).then(function () {
            return run2(name);
        }).catch(Tonyu.onRuntimeError).finally(function () {
            setCmdStat();
        });
    }
    function run2(fullName) {
        if (typeof fullName!="string") {
            if (runMenuOrd.length==0) {
                alert("ファイルを作成してください");
                return;
            }
            fullName=`${NSP_USR}.${runMenuOrd[0]}`;// curFile.name().replace(/\.tonyu$/,"");
        }
        save();
        curPrj.initCanvas=function () {
            displayMode("run");
            Tonyu.globals.$mainCanvas=runDialog.canvas;
        };
        Log.dumpProject(curPrjDir);
        if (root.SplashScreen) root.SplashScreen.show();
        var o=curPrj.getOptions();
        if (o.run.mainClass!=fullName) {
            o.run.mainClass=fullName;
            curPrj.setOptions(o);
        }
        curPrjDir.touch();
        return curPrj.fullCompile().then(async r=>{
            await SourceFiles.add(r).saveAs(curPrj.getOutputFile());
            runDialog.show();
        },showError).finally(function () {
            if (root.SplashScreen) root.SplashScreen.hide();
        });
    }
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    function jump(file,row,col) {
        //alert(file+":"+row+":"+col);
        fl.select(file);
        var inf=getCurrentEditorInfo();
        if (inf) {
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(row,col);
            },50);
        }
    }
    function restart(){
        stop();
        runDialog.close();
        setTimeout(run,100);
    }
    //var pluginAdded={};
    const errorDialog=new ErrorDialog(ide);
    function showError(e) {
        try{
            errorDialog.show(e);
        } catch(ee) {
            console.log(ee);
            stop();
            //alert(ee);
        }
    }
    window.onerror=EC.handleException=Tonyu.onRuntimeError=ide.showError=showError;
    $("#mapEditor").click(F(function () {
        console.log("run map");
        run("kernel.MapEditor");
    }));
    $("#search").click(F(dialogs.search));
    function fixEditorIndent(prog) {
        var cur=prog.getCursorPosition();
        var orig=prog.getValue();
        var fixed=fixIndent( orig );
        if (orig!=fixed) {
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            fixEditorIndent(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
                curPrj.partialCompile(curFile).catch(Tonyu.onRunTimeError);
                inf.lastTimeStamp=curFile.lastUpdate();
            }
        }
        fl.setModified(false);
    }
    function watchModified() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        if (!inf.file.exists()) return;
        if (inf.lastTimeStamp<inf.file.lastUpdate()) {
            inf.editor.setValue(inf.file.text());
            inf.editor.clearSelection();
            inf.lastTimeStamp=inf.file.lastUpdate();
        }
    	fl.setModified(inf.file.text()!=inf.editor.getValue());
    }
    setInterval(watchModified,1000);
    function loadDesktopEnv() {
        var d=curPrjDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        //desktopEnv=res;
        return res;
    }
    function saveDesktopEnv() {
        var d=curPrjDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    $("#mkrun").click(F(dialogs.mkrun));
    $("#imgResEditor").click(F(function () {
        resEditors.open("image");
    }));
    $("#soundResEditor").click(F(function () {
        resEditors.open("sound");
    }));
    $("#prjOptEditor").click(F(function () {
        ProjectOptionsEditor(curPrj);
    }));
    //var helpd=null;
    $("#refHelp").click(F(dialogs.helpDialog));
    window.startTutorial=F(dialogs.startTutorial);
    $("#rmPRJ").click(F(function () {
        if (prompt(curPrjDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curPrjDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(F(function () {
        var np=prompt("新しいプロジェクトの名前を入れてください", curPrjDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curPrjDir.up().rel(np);
        if (npd.exists()) {
            alert(npd+" はすでに存在します");
            return;
        }
        sh.cp(curPrjDir,npd);
        sh.rm(curPrjDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));
    $("#editorEditor").click(F(dialogs.editorEditor));
    $("#openFolder").click(F(dialogs.openFolder));
    sh.curFile=function () {
        return fl.curFile();
    };
    if (root.SplashScreen) root.SplashScreen.hide();
    extLink.all();
});
});
