requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project",
           "copySample","Shell","ImageResEditor","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "WikiDialog","runtime", "KernelDiffDialog","Sync","searchDialog"
          ],
function (romk, romd, roms,  Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, Wiki, Tonyu_Project,
          copySample,sh, ImgResEdit,ProjectOptionsEditor, ctk, KeyEventChecker,
          WikiDialog, rt , KDD,Sync,searchDialog
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

    Tonyu.defaultResource={
       images:[
          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
          {name:"$pat_sample", url: "images/Sample.png"},
          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32}
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
    //ImageList(Tonyu.defaultResource.images, Sprites.setImageList);

    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        var rw=$("#runArea").width();
        $("#prog").css("height",h+"px");
        $("#cv").attr("height", h).attr("width", rw);
        cv=$("#cv")[0].getContext("2d");
        $("#fileItemList").height(h);
    }
    onResize();
    var prog=ace.edit("prog");
    if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
    prog.setTheme("ace/theme/eclipse");
    prog.getSession().setMode("ace/mode/tonyu");

    KeyEventChecker.down(document,"F9",run);
    KeyEventChecker.down(document,"F2",stop);
    KeyEventChecker.down(document,"ctrl+s",function (e) {
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    });


    var closedMsg="←左のリストからファイルを選択してください．\nファイルがない場合はメニューの「ファイル」→「新規」を選んでください";
    prog.setValue(closedMsg);
    prog.setReadOnly(true);
    prog.clearSelection();

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
    FM.on.close=close;
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
        if (name.match(/^[A-Za-z_][a-zA-Z0-9_]*$/)) {
            if (curPrj.isKernel(name)) {
                if (curPrj.getOptions().kernelEditable) {
                    return {ok:true, file: curProjectDir.rel(name+EXT),
                        note: options.action=="create"? "Kernelから"+name+"をコピーします" :""};
                } else {
                    return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
                }
            }
            if (name.match(/^[a-z]/)) {
                name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
        }
    }
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
		    if (e.stack) {
			console.log("stack trace:",e.stack);
		    }
		    throw e;
                }
            }
        },0);
    }
    Tonyu.onRuntimeError=function (e) {
        Tonyu.globals.$lastError=e;
        var t=curPrj.env.traceTbl;
        var te=t.decode($LASTPOS);
        if (te) {
            te.mesg=e;
            showErrorPos($("#errorPos"),te);
            displayMode("runtime_error");
            console.log("showErr: onRunTimeErr",e.stack);
            stop();
            //var userAgent = window.navigator.userAgent.toLowerCase();
            //if(userAgent.indexOf('msie')<0) throw e;
        } else throw e;
    };
    $("#prog").click(function () {
        displayMode("edit");
    });
    $("#mapEditor").click(function () {
        console.log("run map");
        run("MapEditor");
    });
    $("#search").click(function () {
	console.log("src diag");
	searchDialog.show(curProjectDir,function (info){
	    fl.select(info.file);
	    setTimeout(function () {
		prog.gotoLine(info.lineNo);
	    },0);
	});
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
        //console.log(curFile+"Saved ");
        if (curFile && !curFile.isReadOnly()) {
            fixEditorIndent();
            curFile.text(prog.getValue());
        }
        fl.setModified(false);
    }
    function watchModified() {
    	var curFile=fl.curFile();
    	if (!curFile) return;
    	fl.setModified(curFile.text()!=prog.getValue());
    }
    setInterval(watchModified,1000);
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile
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
