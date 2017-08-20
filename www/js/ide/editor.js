requirejs(["Util", "Tonyu", "FS", "PathUtil","FileList", "FileMenu",
           "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project",
           /*"copySample",*/"Shell","Shell2","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "IFrameDialog",/*"WikiDialog",*/"runtime", "KernelDiffDialog","Sync","searchDialog","StackTrace","syncWithKernel",
           "UI","ResEditor","WebSite","exceptionCatcher","Tonyu.TraceTbl",
           "Log","MainClassDialog","DeferredUtil","NWMenu",
           "ProjectCompiler","compiledProject","mkrunDiag","zip","LSFS","WebFS",
           "extLink","DiagAdjuster"
          ],
function (Util, Tonyu, FS, PathUtil, FileList, FileMenu,
          showErrorPos, fixIndent, Wiki, Tonyu_Project,
          /*copySample,*/sh,sh2, ProjectOptionsEditor, ctk, KeyEventChecker,
          IFrameDialog,/*WikiDialog,*/ rt , KDD,Sync,searchDialog,StackTrace,swk,
          UI,ResEditor,WebSite,EC,TTB,
          Log,MainClassDialog,DU,NWMenu,
          TPRC,CPPRJ,mkrunDiag,zip,LSFS,WebFS,
          extLink,DiagAdjuster
          ) {
$(function () {
    if (!WebSite.isNW) {
        FS.mount(location.protocol+"//"+location.host+"/", new WebFS);
    }
    /*
    location.href
"chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/index.html"
window.open("chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/Explode/index.html")
    */

    var F=EC.f;
    $LASTPOS=0;
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
    if (WebSite.kernelDir && !PathUtil.isURL(WebSite.kernelDir)){
        kernelDir=FS.get(WebSite.kernelDir);//home.rel("Kernel/");
        if (kernelDir.exists()) {
            TPRC(kernelDir).loadClasses().fail(function (e) {
                console.log(e);
                alert("Kernel compile error!");
            });
        }
    }
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curPrjDir=curProjectDir=FS.get(dir);
    var curPrj=Tonyu_Project(curProjectDir);//, kernelDir);
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    var EXT=curPrj.EXT;
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;
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
          {name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32},
          {name:"$pat_inputPad", url: "images/inputPad.png"}
       ],
       sounds:[]
    };
    if (location.href.match(/^file/)) {
       Tonyu.defaultResource.images.splice(1,1);
    }
    Tonyu.defaultOptions={
        compiler: { defaultSuperClass: "Actor"},
        run: {mainClass: "Main", bootClass: "Boot"},
        kernelEditable: false
    };
    setDiagMode(false);
    //ImageList(Tonyu.defaultResource.images, Sprites.setImageList);

    var screenH;
    var runDialogMode,dialogClosed;
    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        screenH=h;
        if (!runDialogMode) resizeCanvas($("#runArea").width(),screenH);
        $("#progs pre").css("height",h+"px");
        $("#fileItemList").height(h);
    }
    function resizeCanvas(w,h) {
        console.log("canvas size",w,h);
        $("#cv").attr("height", h).attr("width",w);
        cv=$("#cv")[0].getContext("2d");
    }
    onResize();
    $("#runDialog").click(F(showRunDialog));
    //var rszt;
    /*var da=new DiagAdjuster($("#runArea"));
    da.afterResize=function (d) {
        //resizeCanvas(d.width(),d.height());
    };*/
    var dialogSize={};
    function showRunDialog() {
        runDialogMode=true;
        $("#mainArea").removeClass("col-xs-6").addClass("col-xs-11");
        var d=$("#runArea");
        //$("#runArea").css({height:screenH-100});
        dialogSize.w=dialogSize.w||$(window).width()-100;
        dialogSize.h=dialogSize.h||screenH;
        $("#runArea").dialog({
            width:dialogSize.w,
            height:dialogSize.h,
            resize:function () {
                dialogSize.w=d.width();
                dialogSize.h=d.height();
                resizeCanvas(d.width(),d.height());
            },//da.handleResizeF(),
            close:function () {dialogClosed=true;stop();}
        });
        resizeCanvas(d.width(),d.height());
        //da.handleResize();
        console.log("Diag",dialogSize);
        //resizeCanvas(w,screenH-100);
    }

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
    sh.cd(curProjectDir);

    var fl=FileList($(mobile?"#fileSel":"#fileItemList"),{
        topDir: curProjectDir,
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
    FM.on.close=close;
    FM.on.ls=ls;
    FM.on.validateName=fixName;
    FM.on.createContent=function (f) {
        var k=curPrj.isKernel(f.truncExt(EXT));
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
    FM.on.mv=function (old,_new) {
        if (!refactorUI) return;

        //alert(oldCN+"=>"+newCN);
        return $.when(save()).then(function () {
            if (refactorUI.$vars.chk.prop("checked")) {
                var oldCN=old.truncExt(EXT);
                var newCN=_new.truncExt(EXT);
                return curPrj.renameClassName(oldCN,newCN);
            }
        }).then(function () {
            refactorUI=null;
            return reloadFromFiles();
        }).fail(function (e) {
            alert("プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．");
            console.log(e);
            return false;
        });
        //close(old);  does in FileMenu
    };
    F(FM.on);
    fl.ls(curProjectDir);
    refreshRunMenu();
    /*KeyEventChecker.down(document,"Alt+Ctrl+D",function () {
        //var curFile=fl.curFile();
        //if (!curFile) return;
        KDD.show(curProjectDir, kernelDir);// DiffDialog.show(curFile,kernelDir.rel(curFile.name()));
    });
    sh.kernelDiff=function () {
        KDD.show(curProjectDir, kernelDir);
    };
    sh.kernelDiff.description="Compare Kernel file and this project.";*/
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
            if (ii>=15) return;
            $("#runMenu").append(
                    $("<li>").append(
                            $("<a>").attr("href","#").text(n+"を実行"+(i==0?"(F9)":"")).click(F(function () {
                                if (typeof n!="string") {console.log(n); alert("not a string2: "+n);}
                                run(n);
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
        $("#exportToJsdoit").attr("href", "exportToJsdoit.html?dir="+curProjectDir.path());//+"&main="+runMenuOrd[0]);
        $("#exportToExe").attr("href", "exportToExe.html?dir="+curProjectDir.path());//+"&main="+runMenuOrd[0]);
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT)) return f.truncExt(EXT);
        return null;
    }
    function fixName(name, options) {
        var upcased=false;
        //if (name=="aaaa") throw new Error("iikagen name error "+EC.enter);
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            if (curPrj.isKernel(name)) {
                if (curPrj.getOptions().kernelEditable) {
                    return {ok:true, file: curProjectDir.rel(name+EXT),
                        note: options.action=="create"? "Kernelから"+name+"をコピーします" :""};
                } else {
                    return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
                }
            }
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
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
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            showErrorPos($("#errorPos"));
            //$("#errorPos").hide();// (1000,next);
            //$("#runArea").slideDown(1000, next);
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").show().attr("class","col-xs-12");
                $("#mainArea").hide();//attr("class","col-xs-12");
                onResize();
            }
            if (runDialogMode && dialogClosed) {
                showRunDialog();
            }
            break;
        case "compile_error":
            //$("#errorPos").show();// slideDown(1000, next);
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "runtime_error":
            //$("#errorPos").slideDown(1000, next);
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "edit":
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
    function stop() {
        curPrj.stop();
        displayMode("edit");
    }
    //\run
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
        Log.dumpProject(curProjectDir);
        if (typeof SplashScreen!="undefined") SplashScreen.show();
        var o=curPrj.getOptions();
        if (o.run.mainClass!=name) {
            o.run.mainClass=name;
            curPrj.setOptions();
        }
        curPrjDir.touch();
        curPrj.rawRun(o.run.bootClass).fail(function (e) {
            if (e.isTError) {
                console.log("showErr: run");

                showErrorPos($("#errorPos"),e);
                displayMode("compile_error");
            }else{
                Tonyu.onRuntimeError(e);
            }
        }).done(function () {
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
        });
    }
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=EC.handleException=Tonyu.onRuntimeError=function (e) {
        Tonyu.globals.$lastError=e;
        var t=curPrj.env.traceTbl;
        var te;
        var tid = t.find(e) || t.decode($LASTPOS); // user.Main:234
        if (tid) {
            te=curPrj.decodeTrace(tid);
        }
        console.log("onRunTimeError:stackTrace1",e.stack,te,$LASTPOS);
        /*var trc;//=StackTrace.get(e,t);
        var te=((trc && trc[0]) ? trc[0] : t.decode($LASTPOS));
        console.log("onRunTimeError:stackTrace1",e.stack,te,$LASTPOS);
        if (te) {
            te=curPrj.decodeTrace(te);
        }
        console.log("onRunTimeError:stackTrace2",te,$LASTPOS);*/
        if (te) {
            te.mesg=e;
            if (e.pluginName) {
                alert(e.message);
            } else {
                var diag=showErrorPos($("#errorPos"),te);
                displayMode("runtime_error");
                $("#errorPos").find(".quickFix").append(
                        UI("button",{on:{click: function () {
                            setDiagMode(true);
                            diag.dialog("close");
                            run();
                        }}},"診断モードで実行しなおす"));
            }
            stop();
            //var userAgent = window.navigator.userAgent.toLowerCase();
            //if(userAgent.indexOf('msie')<0) throw e;
        } else {
            UI("div",{title:"Error"},e+"",["pre",e.stack]).dialog({width:800});
            stop();
            //alertOnce(e);
            //throw e;
        }
    };
    $("#mapEditor").click(F(function () {
        console.log("run map");
        run("MapEditor");
    }));
    $("#search").click(F(function () {
        console.log("src diag");
        searchDialog.show(curProjectDir,function (info){
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
        save();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        if (!inf) {
            var progDOM=$("<pre>").css("height", screenH+"px").text(f.text()).appendTo("#progs");
            var prog=ace.edit(progDOM[0]);
            window.lastEditor=prog;
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
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
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
    };

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
    /*$("#restore").click(F(restore));
    function restore() {
        var n=curProjectDir.name();
        if (!copySample.available(curProjectDir)) {
            return alert("このプロジェクトは初期状態に戻せません");
        };
        if (confirm(curProjectDir+" を初期状態に戻しますか？")) {
            sh.rm(curProjectDir,{r:1});
            copySample(n);
            ls();
        }
    }*/
    $("#mkrun").click(F(function () {
        if (WebSite.isNW) {
            mkrunDiag.show(curPrj,
                    FS.get(WebSite.cwd).rel("Runtimes/").rel( curProjectDir.name()) );
        } else {
            var mkram=FS.get("/mkram/");
            if (mkram.exists()) mkram.rm({r:1});
            FS.mount(mkram.path(), LSFS.ramDisk() );
            mkrunDiag.show(curPrj, mkram.rel(curProjectDir.name()), {
                hiddenFolder:true,
                onEnd:function () {
                    FS.unmount(mkram.path());
                }
            });
        }
    }));
    $("#imgResEditor").click(F(function () {
        //ImgResEdit(curPrj);
        ResEditor(curPrj,"image");
    }));
    $("#soundResEditor").click(F(function () {
        ResEditor(curPrj,"sound");
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
    if (typeof progBar=="object") {progBar.clear();}
    $("#rmPRJ").click(F(function () {
        if (prompt(curProjectDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curProjectDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(F(function () {
        var np=prompt("新しいプロジェクトの名前を入れてください", curProjectDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curProjectDir.up().rel(np);
        if (npd.exists()) {
            alert(npd+" はすでに存在します");
            return;
        }
        sh.cp(curProjectDir,npd);
        sh.rm(curProjectDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));
    $("#editorEditor").click(F(function () {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||12);
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||12);
        saveDesktopEnv();
    }));
    $("#openFolder").click(F(function () {
        var f=curPrjDir;
        var gui = require("nw.gui");//(global.nwDispatcher||global.nw).requireNwGui();
        gui.Shell.showItemInFolder(f.path().replace(/\//g,"\\"));
    }));
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    //curPrj.compileKernel();
    SplashScreen.hide();
    if (curPrj.getBlobInfos().length>0) {
        var ld=UI("div",{title:"ログイン"},["div","このプロジェクトを正常に動作させるにはログインが必要です"]);
        Auth.assertLogin({
            showLoginLink:function (u) {
                ld.append(UI("a",{href:u,target:"login",style:"font-size: 20px;"},"ログインする"));
            },
            success:function () {
                ld.dialog("close");
            }
        });
        ld.dialog({modal:true});
    }
    extLink.all();
});
});
