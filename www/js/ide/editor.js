define(function (require) {
const R=require("R");
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
//const SourceFiles=require("SourceFiles");
const RealtimeErrorMarker=require("RealtimeErrorMarker");
const Dialogs=require("Dialogs");
const jshint=require("jshint");
const MapEditor2=require("MapEditor2");
const API=require("API");
$(function () {
    jshint.use(sh2);
    //https://codepen.io/oatssss/pen/oYxJQV?editors=0010
    if (!WebSite.isNW) {
        FS.mount(location.protocol+"//"+location.host+"/", new WebFS());
    }
    if (WebSite.serverType==="projectBoard") {
        //$.ajax("../../../a.php?Test/test").then(function (r){console.log("Session",r);});
    }
    $.get("https://edit.tonyu.jp/doc/welcome_edit.html?a").then(function (t) {
        $("#welcome").append(t);
    });
    const F=EC.f;
    const FC=(f)=>EC.f((...args)=>{ collapseMenu(); f(...args);});
    root.$LASTPOS=0;
    var mobile=WebSite.mobile || FS.get(WebSite.tonyuHome).rel("mobile.txt").exists();
    if (mobile) {
        $("#fileViewer").hide();
        $("#runAreaParent").hide();
        $("#mainArea").attr("class","col-xs-12");
        $("#mobileBar").show();
    }
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    const autoRun=Util.getQueryString("autoRun");
    var curPrjDir=FS.get(dir);
    const optionFile=curPrjDir.rel("options.json");
    optionFixer.fixFile(optionFile);
    const editors={};
    const ide={restart,stop,save,displayMode,dispName,jump,refreshRunMenu,
        editors,getCurrentEditorInfo,saveDesktopEnv,run};
    const curPrj=IDEProject.create({dir:curPrjDir,ide});//, kernelDir);
    const api=new API(curPrj);
    curPrj.api=api;
    ide.getAPIInfo=()=>api.get();
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
        // !!opt.compiler.diagnose != !!d
        if (opt.compiler.diagnose ^ d) {
            opt.compiler.diagnose=d;
            curPrj.setOptions(opt);
        }
    }
    setDiagMode(false);
    function createResFile() {
        var opt=curPrj.getOptions();
        if (opt.dontCreateRes) return;
        const resf=curPrj.getResourceFile();
        if (!resf.exists()) resf.obj(WebSite.defaultResource);
    }
    createResFile();
    const runDialogParam={
        screenH:200,
        desktopEnv: desktopEnv,
        prj: curPrjDir.path(),//???
        ide
    };
    function onResize() {
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        runDialogParam.screenH=h;
        $("#progs pre").css("height",h+"px");
        $("#fileItemList").height(h-10);
    }
    onResize();
    const em=RealtimeErrorMarker(ide);
    $("#mobileRun").click(FC(run));
    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(stop));
    KeyEventChecker.down(document,"ctrl+s",F(save));
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
    function collapseMenu() {
        let b=$("button.navbar-toggle");
        //console.log("Collape",b, b.hasClass("collapsed"));
        if (!b.is(":visible")) return;
        if (b.hasClass("collapsed")) return;
        b.click();
    }
    $("#newFile").click(FC(FM.create));
    $("#mvFile").click(FC(FM.mv));
    $("#rmFile").click(FC(FM.rm));
    $("#closeFile").click(FC(FM.close));
    $("#runDialog").click(FC(function () {
        runDialog.show(true);
    }));
    fl.ls(curPrjDir);
    refreshRunMenu();
    function refreshRunMenu() {
        let mainName="Main";
        try{
            const o=curPrj.getOptions();
            console.log("refreshRun.o",o);
            mainName=o.run.mainClass.split(".").pop();
        }catch(e){
            console.log(e);
        }
        console.log("mainName", mainName);
        const runMenuOrdWasEmpty=runMenuOrd.length==0;
        const sf=curPrj.sourceFiles();
        Object.keys(sf).forEach(function (n) {
            //if (f.endsWith(EXT)) {
                //var n=f.truncExt(EXT);
                if (runMenuOrd.indexOf(n)<0) {
                    if (runMenuOrdWasEmpty && n===mainName) {
                        runMenuOrd.unshift(n);
                    } else {
                        runMenuOrd.push(n);
                    }
                }
            //}
        });
        var i;
        for (i=runMenuOrd.length-1; i>=0 ; i--) {
            var f=sf[runMenuOrd[i]];//curPrjDir.rel(runMenuOrd[i]+EXT);
            if (!f || !f.exists()) {
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
                            $("<a>").attr("href","#").text(R("runClass",n)+(i==0?"(F9)":"")).click(FC(function () {
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
                        $("<a>").attr("href","#").text(R("stop")).click(FC(function () {
                            stop();
                        }))));
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text(R("selectMain")).click(FC(dialogs.selectMain))
                    ));
        console.log("runMenuOrd", runMenuOrd);
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
    ide.runDialog=runDialog;
    window.runDialog=runDialog;
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
            alert(R("otherCommandInProgress",cmdStat));
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
    async function run2(fullName) {
        if (typeof fullName!="string") {
            if (runMenuOrd.length==0) {
                alert(R("createAtLeastOneFile"));
                return;
            }
            fullName=`${NSP_USR}.${runMenuOrd[0]}`;// curFile.name().replace(/\.tonyu$/,"");
        }
        await save({skipCompile:false}); // quick save->run does not send the saved content to worker
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
        try {
            Log.sendLog({result:"Tonyu Build", filename: fullName});
            await curPrj.waitReady();
            await curPrj.fullCompile();
            //jshint.use(r);
            // does in fullCompile
            //await SourceFiles.add(r).saveAs(curPrj.getOutputFile());
            Log.sendLog({result:"Tonyu Run", filename: fullName});
            runDialog.show();
        } catch(e) {
            showError(e);
        } finally {
            if (root.SplashScreen) root.SplashScreen.hide();
        }
    }
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    function jump(file,row=null,col=null) {
        //alert(file+":"+row+":"+col);
        fl.select(file);
        var inf=getCurrentEditorInfo();
        if (inf) {
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog && row!=null && col!=null) prog.gotoLine(row,col);
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
            Log.sendLog({result:"Tonyu Fatal Error",detail:ee+""});
            //alert(ee);
        }
    }
    window.onerror=EC.handleException=Tonyu.onRuntimeError=ide.showError=showError;
    $("#mapEditor").click(FC(function () {
        console.log("run map");
        run("kernel.MapEditor");
    }));
    $("#mapEditor2").click(FC(function () {
        MapEditor2.prepare(ide);
    }));
    $("#search").click(FC(dialogs.search));
    KeyEventChecker.down(document,"ctrl+t",F(dialogs.search));
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
    async function save({skipCompile}={}) {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            fixEditorIndent(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                Log.sendLog({filename:curFile.path(), result:"Tonyu Save", code:{tonyu:nw}});
                curFile.text(nw);
                inf.lastTimeStamp=curFile.lastUpdate();
                if (!skipCompile && curPrj.readyState) {
                    try {
                        await curPrj.partialCompile(curFile);
                    } catch (e) {
                        em.mark(inf,e);
                    }
                }
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
    $("#mkrun").click(FC(dialogs.mkrun));
    $("#imgResEditor").click(FC(function () {
        resEditors.open("image");
    }));
    $("#soundResEditor").click(FC(function () {
        resEditors.open("sound");
    }));
    let optionsEditor;
    $("#prjOptEditor").click(FC(function () {
        optionsEditor=optionsEditor||ProjectOptionsEditor(curPrj);
        optionsEditor.show();
    }));
    //var helpd=null;
    $("#refHelp").click(FC(dialogs.helpDialog));
    window.startTutorial=F(dialogs.startTutorial);
    $("#rmPRJ").click(FC(function () {
        if (prompt(R("deleteProjectConfirm",curPrjDir),"")!="DELETE") {
            return;
        }
        sh.rm(curPrjDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(FC(function () {
        var np=prompt(R("inputNewProjectName"), curPrjDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curPrjDir.up().rel(np);
        if (npd.exists()) {
            alert(R("renamedProjectExists",npd));
            return;
        }
        sh.cp(curPrjDir,npd);
        sh.rm(curPrjDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));
    $("#editorEditor").click(FC(dialogs.editorEditor));
    $("#openFolder").click(FC(dialogs.openFolder));
    sh.curFile=function () {
        return fl.curFile();
    };
    if (root.SplashScreen) root.SplashScreen.hide();
    extLink.all();
    if (autoRun) {
        console.log("autoRun::runMenuOrd", runMenuOrd);
        run(runMenuOrd[0]);
        let file=curPrjDir.rel(runMenuOrd[0]+EXT);
        if (file.exists()) {
            const s=file.text();
            const openp=/\/\/\s*OPEN:\s*([\w\d]+)/;
            const r=openp.exec(s);
            if (r) {
                const nfile= curPrjDir.rel(r[1]+EXT);
                if (nfile.exists()) file=nfile;
            }
            fl.select(file);
        }
    }
    const cs=$("<div>").attr({"id":"compileState"}).addClass("compileState").text("").appendTo("body");
    cs.click(()=>{
        const s=curPrj.readyState;
        if (s.src && s.row && s.col) {
            ide.jump(s.src, s.row, s.col);
        }
    });
    curPrj.on("readyState", e=>{
        const s=(e.state===true ? "Ready" : (typeof e.state)==="string" ? e.state :"Error");
        console.log(e.state);
        cs.text(s);
        if (s==="Error") {
            cs.addClass("error").css({cursor:"pointer"});
        } else {
            cs.removeClass("error").css({cursor:"auto"});
        }
    });
    curPrj.fullCompile();
    $(window).on("beforeunload",function(e){
        if(fl.isModified()){
            return "保存されていないデータがあります。\nこれまでの作業を保存するためには一度実行してください。";
        }
    });
});
});
