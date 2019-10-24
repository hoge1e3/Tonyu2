/*global requirejs, require*/
requirejs(["Util", "Tonyu", "FS", "PathUtil","FileList", "FileMenu",
           "ErrorDialog", "fixIndent", "Wiki",
           "Shell","Shell2","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "IFrameDialog","runtime", "KernelDiffDialog","Sync","searchDialog","syncWithKernel",
           "UI","ResEditors","WebSite","exceptionCatcher",
           "Log","MainClassDialog","DeferredUtil","NWMenu",
           "mkrunDiag","zip","LSFS","WebFS",
           "extLink","DiagAdjuster","ExportHTMLDialog","DebugDialog","GlobalDialog",
           "root","IDEProject","optionFixer","SourceFiles","kernelChecker"
          ],
function (Util, Tonyu, FS, PathUtil, FileList, FileMenu,
          ErrorDialog, fixIndent, Wiki,
          sh,sh2, ProjectOptionsEditor, ctk, KeyEventChecker,
          IFrameDialog, rt , KDD,Sync,searchDialog,swk,
          UI,ResEditors,WebSite,EC,
          Log,MainClassDialog,DU,NWMenu,
          mkrunDiag,zip,LSFS,WebFS,
          extLink,DiagAdjuster,ExportHTMLDialog,DebugDialog,GlobalDialog,
          root,IDEProject,optionFixer,SourceFiles,kernelChecker
          ) {
$(function () {
    if (!WebSite.isNW) {
        FS.mount(location.protocol+"//"+location.host+"/", new WebFS());
    }
    if (WebSite.serverType==="projectBoard") {
        $.ajax("../../../a.php?Test/test").then(function (r){console.log("Session",r);});
    }
    $.get("https://edit.tonyu.jp/doc/welcome_edit.html?a").then(function (t) {
        $("#welcome").append(t);
    });

    /*
    location.href
"chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/index.html"
window.open("chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/Explode/index.html")
    */

    var F=EC.f;
    root.$LASTPOS=0;
    //copySample();
    var mobile=WebSite.mobile || FS.get(WebSite.tonyuHome).rel("mobile.txt").exists();
    if (mobile) {
        $("#fileViewer").hide();
        $("#runAreaParent").hide();
        $("#mainArea").attr("class","col-xs-12");
        $("#fileSel").show();
    }
    var home=FS.get(WebSite.tonyuHome);
    //if (!Tonyu.ide)  Tonyu.ide={};
    var kernelDir;
    /*if (WebSite.kernelDir && !PathUtil.isURL(WebSite.kernelDir)){
        kernelDir=FS.get(WebSite.kernelDir);//home.rel("Kernel/");
        if (kernelDir.exists()) {
            TPRC(kernelDir).loadClasses().fail(function (e) {
                console.log(e);
                alert("Kernel compile error!");
            });
        }
    }*/
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curPrjDir=FS.get(dir);
    const optionFile=curPrjDir.rel("options.json");
    optionFixer.fixFile(optionFile);
    //var curProjectDir=curPrjDir;
    //console.log("F",F,root);
    const ide={restart,stop,displayMode,jump};
    const curPrj=IDEProject.create({dir:curPrjDir,ide});//, kernelDir);
    ide.project=curPrj;
    const NSP_USR=curPrj.getNamespace();

    root.curPrj=curPrj;
    var resEditors=new ResEditors(curPrj);
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    var EXT=curPrj.getEXT();
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;
    var exportHTMLDialog=new ExportHTMLDialog(curPrj);
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
    /*if (location.href.match(/^file/)) {
       Tonyu.defaultResource.images.splice(1,1);
   }*/

    setDiagMode(false);
    //var screenH;
    //var runDialogMode,dialogClosed;
    var runDialogParam={
        screenH:200,
        onClose: stop,
        desktopEnv: desktopEnv,
        prj: curPrjDir.path()
    };
    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        runDialogParam.screenH=h;
        //if (!runDialogMode) resizeCanvas($("#runArea").width(),screenH);
        $("#progs pre").css("height",h+"px");
        $("#fileItemList").height(h);
    }
    onResize();
    var editors={};
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
        on:{
            select: F(open),
            displayName: dispName
        }
    });
    var FM=FileMenu();
    FM.fileList=fl;
    $("#newFile").click(F(FM.create));
    $("#mvFile").click(F(FM.mv));
    $("#rmFile").click(F(FM.rm));
    $("#closeFile").click(F(function () {
        var inf=getCurrentEditorInfo();
        if (inf) {
            close(inf.file);
        }
    }));
    $("#runDialog").click(F(function () {
        runDialog.show(true);
    }));

    FM.on.close=close;
    FM.on.ls=ls;
    FM.on.validateName=fixName;
    FM.on.createContent=function (f) {
        var k=isKernel(f.truncExt(EXT));
        if (k) {
            f.text(k.text());
        } else {
            f.text("");
        }
    };
    FM.on.displayName=function (f) {
        var r=dispName(f);
        if (r) {
            return r;
        }
        return f.name();
    };
    var refactorUI;
    FM.on.mvExtraUI=function (d) {
        refactorUI=UI("div",["input",{type:"checkbox",$var:"chk",checked:"true",value:"chked"}],"プログラム中のクラス名も変更する");
        d.append(refactorUI);
    };
    FM.on.mv=async function (old,_new) {
        if (!refactorUI) return;
        const refactor=refactorUI.$vars.chk.prop("checked");
        await save();
        if (refactor) {
            var oldCN=old.truncExt(EXT);
            var newCN=_new.truncExt(EXT);
            try {
                const ren=await curPrj.renameClassName(oldCN,newCN);
                console.log("REN",ren);
                FM.on.ls();
                FM.on.open(_new);
            } catch(e) {
                alert("プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．");
                console.error(e);
                console.log(e);
            }
        } else {
            reloadFromFiles();
        }
        refactorUI=null;
        if (root.SplashScreen) root.SplashScreen.hide();
        console.log("REN2",!refactor);
        return !refactor;
    };
    F(FM.on);
    fl.ls(curPrjDir);
    refreshRunMenu();
    function ls(){
        fl.ls(curPrjDir);
        refreshRunMenu();
    }
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
                        $("<a>").attr("href","#").text("実行するファイルを選択...").click(F(function () {
                            var diag=MainClassDialog.show(curPrj,{on:{done:function (n,dorun) {
                                var ii=runMenuOrd.indexOf(n);
                                if (ii>0) {
                                    runMenuOrd.splice(ii, 1);
                                    runMenuOrd.unshift(n);
                                    refreshRunMenu();
                                    saveDesktopEnv();
                                }
                                if (dorun) run(n);
                            }}});
                            diag.$vars.mainClass.empty();
                            runMenuOrd.forEach(function (m) {
                                diag.$vars.mainClass.append(UI("option",{value:m},m));
                            });
                        }))));

        //saveDesktopEnv();
        $("#exportToJsdoit").attr("href", "javascriptoo".replace("oo",":;")).click(function () {
            exportHTMLDialog.show({
                excludes:{"js/concat.js":1,"js/concat.js.map":1},
                includeJSScript:true
            });
        });
        //$("#exportToJsdoit").attr("href", "exportToJsdoit.html?dir="+curPrjDir.path());//+"&main="+runMenuOrd[0]);
        $("#exportToExe").attr("href", "exportToExe.html?dir="+curPrjDir.path());//+"&main="+runMenuOrd[0]);
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT)) return f.truncExt(EXT);
        return null;
    }
    function isKernel(n) {
        return kernelChecker.isKernel(n);
    }
    function fixName(name, options) {
        var upcased=false;
        //if (name=="aaaa") throw new Error("iikagen name error "+EC.enter);
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            var dir=fl.curDir();
            var sysdir={files:1, static:1 ,maps:1};
            if (sysdir[dir.relPath(curPrjDir).replace(/\/*/,"")]) {
                return {ok:false, reason:dir.name()+"はシステムで利用されているフォルダなので使用できません"};
            }
            if (isKernel(name)) {
                /*if (curPrj.getOptions().kernelEditable) {
                    return {ok:true, file: dir.rel(name+EXT),
                        note: options.action=="create"? "Kernelから"+name+"をコピーします" :""};
                } else {*/
                    return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
                //}
            }
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: dir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: dir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
        }
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
    var runDialog=new DebugDialog(runDialogParam);
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            errorDialog.close();
            //showErrorPos($("#errorPos"));
            //$("#errorPos").hide();// (1000,next);
            //$("#runArea").slideDown(1000, next);
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
            //$("#errorPos").show();// slideDown(1000, next);
            if (root.SplashScreen) root.SplashScreen.hide();
            break;
        case "runtime_error":
            //$("#errorPos").slideDown(1000, next);
            if (root.SplashScreen) root.SplashScreen.hide();
            break;
        case "edit":
            if (runDialog.modified) {
                delete runDialog.modified;
                saveDesktopEnv();
            }
            //$("#runArea").slideUp(1000);
            //$("#errorPos").slideUp(1000, next);
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").hide();//.attr("class","col-xs-12");
                $("#mainArea").show();//attr("class","col-xs-12");
            }
            break;
        }
    }
    var cmdrun;
    function setCmdStat(c) {
        if (c && cmdrun) {
            alert("他のコマンド("+cmdrun+")が実行されているのでお待ちください．\n"+
                "しばらくたってもこのメッセージが出る場合，一旦Homeに戻ってください．");
            return;
        }
        cmdrun=c;
        return c;
    }
    function stop() {
        if (!setCmdStat("stop")) return;
        return $.when(curPrj.stop()).then(function () {
            curPrj.disconnectDebugger();
            displayMode("edit");
            console.log("Boot stopped");
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
    $("#search").click(F(function () {
        console.log("src diag");
        searchDialog.show(curPrjDir,function (info){
            fl.select(info.file);
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(info.lineNo);
            },50);
        });
    }));
    function close(rm) { // rm or mv
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            i.editor.destroy();
            i.dom.remove();
            delete editors[rm.path()];
            var remains;
            for (var k in editors) remains=true;
            if (!remains) $("#welcome").show();
        }
    }
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
    function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
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
    var curDOM;
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile
        if (f.isDir()) {
            return;
        }
        $("#welcome").hide();
        save();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        if (!inf) {
            var progDOM=$("<pre>").css("height", runDialogParam.screenH+"px").text(f.text()).appendTo("#progs");
            var prog=root.ace.edit(progDOM[0]);
            window.lastEditor=prog;
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
            else prog.setFontSize(16);
            prog.setTheme("ace/theme/eclipse");
            prog.getSession().setMode("ace/mode/tonyu");
            inf=editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(F(function () {
                displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            try {
                prog.commands.removeCommand("toggleFoldWidget");
                prog.setOptions({fixedWidthGutter:true});
            }catch(e){}// F2

            curDOM=progDOM;
        } else {
            if (inf.lastTimeStamp<inf.file.lastUpdate()) {
                inf.editor.setValue(inf.file.text());
                inf.editor.clearSelection();
                inf.lastTimeStamp=inf.file.lastUpdate();
            }
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
        }
        inf.lastTimeStamp=inf.file.lastUpdate();
    }

    function loadDesktopEnv() {
        var d=curPrjDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        desktopEnv=res;
        return res;
    }
    function saveDesktopEnv() {
        var d=curPrjDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    $("#mkrun").click(F(function () {
        var dest;
        if (WebSite.isNW) {
            if (desktopEnv && desktopEnv.runtimeConfig) {
                dest=desktopEnv.runtimeConfig.dest;
            } else {
                dest=FS.get(WebSite.cwd).rel("Runtimes/").rel( curPrjDir.name());
            }
            mkrunDiag.show(curPrj,{
                dest: dest,
                onComplete: function (e) {
                    if (e.type==="dir" && desktopEnv) {
                        desktopEnv.runtimeConfig=e.config;
                        saveDesktopEnv();
                    }
                }
            });
        } else {
            mkrunDiag.show(curPrj, {
                hiddenFolder:true,
                onEnd:function () {}
            });
        }
    }));
    $("#imgResEditor").click(F(function () {
        resEditors.open("image");
    }));
    $("#soundResEditor").click(F(function () {
        resEditors.open("sound");
    }));
    $("#prjOptEditor").click(F(function () {
        ProjectOptionsEditor(curPrj);
    }));
    var helpd=null;
    $("#refHelp").click(F(function () {
    	//if (!helpd) helpd=WikiDialog.create(home.rel("doc/tonyu2/"));
        if (!helpd) helpd=IFrameDialog.create(WebSite.top+"/doc/index.html");
    	helpd.show();
    }));
    window.startTutorial=F(function () {
        if (!helpd) helpd=IFrameDialog.create(WebSite.top+"/doc/tutorial.html");
    	helpd.show();
    });
    //if (typeof progBar=="object") {progBar.clear();}
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
    $("#editorEditor").click(F(function () {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||16);
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||16);
        saveDesktopEnv();
    }));
    $("#openFolder").click(F(function () {
        var f=curPrjDir;
        var gui = require("nw.gui");//(global.nwDispatcher||global.nw).requireNwGui();
        gui.Shell.showItemInFolder(f.path().replace(/\//g,require("path").sep));
    }));
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    if (root.SplashScreen) root.SplashScreen.hide();
    extLink.all();
});
});
