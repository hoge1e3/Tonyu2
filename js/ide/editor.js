requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project",
           "copySample","Shell","Shell2","ImageResEditor","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "WikiDialog","runtime", "KernelDiffDialog","Sync","searchDialog","StackTrace","syncWithKernel",
           "UI"
          ],
function (romk, romd, roms,  Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, Wiki, Tonyu_Project,
          copySample,sh,sh2, ImgResEdit,ProjectOptionsEditor, ctk, KeyEventChecker,
          WikiDialog, rt , KDD,Sync,searchDialog,StackTrace,swk,
          UI
          ) {

$(function () {
    copySample();
    //if (!Tonyu.ide) Tonyu.ide={};
    var kernelDir=FS.get("/Tonyu/Kernel/");
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curProjectDir=FS.get(dir);
    var curPrj=Tonyu_Project(curProjectDir, kernelDir);
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
    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        screenH=h;
        var rw=$("#runArea").width();
        $("#progs pre").css("height",h+"px");
        $("#cv").attr("height", h).attr("width", rw);
        cv=$("#cv")[0].getContext("2d");
        $("#fileItemList").height(h);
    }
    onResize();
    var editors={};

    KeyEventChecker.down(document,"F9",run);
    KeyEventChecker.down(document,"F2",stop);
    KeyEventChecker.down(document,"ctrl+s",function (e) {
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    });
    $(window).resize(onResize);
    $("body")[0].spellcheck=false;
    sh.cd(curProjectDir);

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


    fl.ls(curProjectDir);
    refreshRunMenu();
    KeyEventChecker.down(document,"Alt+Ctrl+D",function () {
        //var curFile=fl.curFile();
        //if (!curFile) return;
        KDD.show(curProjectDir, kernelDir);// DiffDialog.show(curFile,kernelDir.rel(curFile.name()));
    });
    sh.kernelDiff=function () {
        KDD.show(curProjectDir, kernelDir);
    };
    sh.kernelDiff.description="Compare Kernel file and this project.";
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
                                if (ii>0) {
				    runMenuOrd.splice(ii, 1);
                                    runMenuOrd.unshift(n);
                                    refreshRunMenu();
				    saveDesktopEnv();
				}
                            })));
            i++;
        });
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("停止(F2)").click(function () {
                            stop();
                        })));
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
            break;
        }
    }
    function stop() {
        curPrj.stop();
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
        if (typeof SplashScreen!="undefined") SplashScreen.show();
        setTimeout(function () {
            try {
                var o=curPrj.getOptions();
                if (o.run.mainClass!=name) {
                    o.run.mainClass=name;
                    curPrj.setOptions();
                }
                curPrj.rawRun(o.run.bootClass);
            } catch(e){
                if (e.isTError) {
                    console.log("showErr: run");

                    showErrorPos($("#errorPos"),e);
                    displayMode("compile_error");
                }else{
                    Tonyu.onRuntimeError(e);
                    /*if (e.stack) {
                        console.log("stack trace:",e.stack);
                    }
                    throw e;*/
                }
            }
        },0);
    }
    Tonyu.onRuntimeError=function (e) {
        Tonyu.globals.$lastError=e;
        var t=curPrj.env.traceTbl;
        var trc=StackTrace.get(e,t);
        var te=((trc && trc[0]) ? trc[0] : t.decode($LASTPOS));
        console.log("onRunTimeError:stackTrace",e.stack);
        if (te) {
            te.mesg=e;
            var diag=showErrorPos($("#errorPos"),te);
            displayMode("runtime_error");
            $("#errorPos").find(".quickFix").append(
                    UI("button",{on:{click: function () {
                        setDiagMode(true);
                        diag.dialog("close");
                        run();
                    }}},"診断モードで実行しなおす"));
            stop();
            //var userAgent = window.navigator.userAgent.toLowerCase();
            //if(userAgent.indexOf('msie')<0) throw e;
        } else throw e;
    };
    $("#mapEditor").click(function () {
        console.log("run map");
        run("MapEditor");
    });
    $("#search").click(function () {
        console.log("src diag");
        searchDialog.show(curProjectDir,function (info){
            fl.select(info.file);
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(info.lineNo);
            },50);
        });
    });
    function close(rm) {
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        i.editor.destroy();
        i.dom.remove();
    }
    function fixEditorIndent(prog) {
        var cur=prog.getCursorPosition();
        prog.setValue(fixIndent( prog.getValue() ));
        prog.clearSelection();
        prog.moveCursorTo(cur.row, cur.column);
    }
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            fixEditorIndent(prog);
            curFile.text(prog.getValue());
        }
        fl.setModified(false);
    }
    function watchModified() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
    	var prog=inf.editor;//getCurrentEditor();
    	fl.setModified(curFile.text()!=prog.getValue());
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
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
            prog.setTheme("ace/theme/eclipse");
            prog.getSession().setMode("ace/mode/tonyu");
            editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(function () {
                displayMode("edit");
            });
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            curDOM=progDOM;
        } else {
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
        }
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
    };
    //var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    //w.show("projectIndex");

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
    $("#restore").click(restore);
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
    }
    $("#imgResEditor").click(function () {
        ImgResEdit(curPrj);
    });
    $("#prjOptEditor").click(function () {
        ProjectOptionsEditor(curPrj);
    });
    var helpd=null;
    $("#refHelp").click(function () {
    	if (!helpd) helpd=WikiDialog.create(FS.get("/Tonyu/doc/tonyu2/"));
    	helpd.show();
    });
    if (typeof progBar=="object") {progBar.clear();}
    $("#rmPRJ").click(function () {
        if (prompt(curProjectDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curProjectDir,{r:1});
        document.location.href="index.html";
    });
    $("#mvPRJ").click(function () {
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
    });
    $("#editorEditor").click(function () {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||12);
        desktopEnv.editorFontSize=parseInt(s);
        prog.setFontSize(desktopEnv.editorFontSize||12);
        saveDesktopEnv();
    });
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    curPrj.compileKernel();
    SplashScreen.hide();
});
});
