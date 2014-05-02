// Created at Thu Mar 06 2014 11:09:25 GMT+0900 (東京 (標準時))
// Skipped http://localhost:3002/js/lib/jquery-1.10.1.js
// Skipped http://localhost:3002/js/lib/jquery.tmpl.js
// Skipped http://localhost:3002/js/lib/jquery.hotkeys.js
// Skipped http://localhost:3002/js/lib/jquery-ui.js
// Skipped http://localhost:3002/js/lib/SplashScreen.js
// Skipped http://localhost:3002/js/reqConf.js
// Skipped http://localhost:3002/js/lib/require.js
// Skipped //var progBar=ProgressBar(42);$(function () { Sp
requirejs.setName('ide/editor');
requirejs(["fs/ROMk","fs/ROMd","fs/ROMs","ace", "Util", "Tonyu", "FS", "FileList", "FileMenu",
           "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project",
           "copySample","Shell","ImageResEditor","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "WikiDialog","runtime", "KernelDiffDialog"
          ],
function (romk, romd, roms, ace, Util, Tonyu, FS, FileList, FileMenu,
          showErrorPos, fixIndent, Wiki, Tonyu_Project,
          copySample,sh, ImgResEdit,ProjectOptionsEditor, ctk, KeyEventChecker,
          WikiDialog, rt , KDD
          ) {

$(function () {
    copySample();
    //if (!Tonyu.ide) Tonyu.ide={};
    Tonyu.defaultResource={
       images:[
          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
          {name:"$pat_sample", url: "images/Sample.png"},
          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32}
       ],
       sounds:[]
    };
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
    }
    onResize();
    var prog=ace.edit("prog");
    prog.setTheme("ace/theme/eclipse");
    prog.getSession().setMode("ace/mode/tonyu");
    /*prog.commands.addCommands([{
        name: "run",
        bindKey: {win: "F9", mac: "F9"},
        exec: function(editor, line) {
            run();
        }
    }]);*/
    /*KeyEventChecker.down(document,"Ctrl+E",function (e) {
    	alert("E");
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    });*/
    KeyEventChecker.down(document,"F9",run);
    //$("#prog").bind("keydown","F9",run);
    //$(document).bind("keydown","F9",run);
    /*prog.commands.addCommands([{
        name: "stop",
        bindKey: {win: "F2", mac: "F2"},
        exec: function(editor, line) {
            stop();
        }
    }]);*/
    //$("#prog").bind("keydown","F2",stop);
    //$(document).bind("keydown","F2",stop);
    KeyEventChecker.down(document,"F2",stop);


    /*$(document).bind("keydown","ctrl+shift+e",function (e) {
    	alert(e);
    	e.preventDefault();
    	e.stopPropagation();
    	return false;
    	//if (e.originalEvent)
    });*/

    var closedMsg="←左のリストからファイルを選択してください．\nファイルがない場合はメニューの「ファイル」→「新規」を選んでください";
    prog.setValue(closedMsg);
    prog.setReadOnly(true);
    prog.clearSelection();

    $(window).resize(onResize);
    $("body")[0].spellcheck=false;
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curProjectDir=FS.get(dir);
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

    var kernelDir=FS.get("/Tonyu/Kernel/");
    var curPrj=Tonyu_Project(curProjectDir, kernelDir);
    var EXT=curPrj.EXT;
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;
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
                                runMenuOrd.splice(ii, 1);
                                runMenuOrd.unshift(n);
                                refreshRunMenu();
                            })));
            i++;
        });
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("停止(F2)").click(function () {
                            stop();
                        })));
        saveDesktopEnv();
        $("#exportToJsdoit").attr("href", "exportToJsdoit.html?dir="+curProjectDir.path());//+"&main="+runMenuOrd[0]);
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
        try {
            var o=curPrj.getOptions();
            o.run.mainClass=name;
            curPrj.setOptions();
            //Tonyu.setGlobal("$mainClassName", name);
            curPrj.rawRun(o.run.bootClass);
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
            var userAgent = window.navigator.userAgent.toLowerCase();
            if(userAgent.indexOf('msie')<0) throw e;
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
        //console.log(curFile+"Saved ");
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
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    SplashScreen.hide();
});
});

// Skipped http://localhost:3002/js/build/buildAll.js
// Skipped http://localhost:3002/js/build/genROM.js
// Skipped http://localhost:3002/js/build/dumpScript.js
requirejs.setName('Util');
Util=function () {

function getQueryString(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return qs[1];
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}

return {getQueryString:getQueryString, endsWith: endsWith, startsWith: startsWith};
}();
requirejs.setName('FS');
FS=function () {
    var FS={};
    var roms={};
    var SEP="/";
    FS.roms=roms;
    function endsWith(str,postfix) {
        return str.substring(str.length-postfix.length)===postfix;
    }
    FS.endsWith=endsWith;
    function startsWith(str,prefix) {
        return str.substring(0, prefix.length)===prefix;
    }
    function now(){
        return new Date().getTime();
    }
    FS.splitPath=splitPath;
    function splitPath(path) {
    	var res=path.split(SEP);
    	if (res[res.length-1]=="") {
    		res[res.length-2]+=SEP;
    		res.pop();
   		}
        return res;
    }
    function resolveROM(path) {
        for (var romPath in roms) {
            var pre=path.substring(0,romPath.length);
            var post=path.substring(romPath.length);
            if (pre==romPath) {
                return {rom:roms[romPath],rel:post};
            }
        }
        return null;
    }
    function isReadonly(path) {
    	return resolveROM(path);
    }
    function lcs(path, text) {
        var r=resolveROM(path);
        if (arguments.length==2) {
            if (r) throw path+" is Read only.";
            if (text==null) delete localStorage[path];
            else return localStorage[path]=text;
        } else {
            if (r) {
                return r.rom[r.rel];
            }
            return localStorage[path];
        }
    }
    function lcsExists(path) {
        var r=resolveROM(path);
        if (r) return r.rel in r.rom;
        return path in localStorage;
    }
    function putDirInfo(path, dinfo) {
        if (path==null) throw "putDir: Null path";
        if (!isDir(path)) throw "Not a directory : "+path;
        lcs(path, JSON.stringify(dinfo));
        var ppath=up(path);
        if (ppath==null) return;
        var pdinfo=getDirInfo(ppath);
        touch(pdinfo, ppath, getName(path));
    }
    function getDirInfo(path) {
        if (path==null) throw "getDir: Null path";
        if (!endsWith(path,SEP)) path+=SEP;
        var dinfo=lcs(path);
        try {
            dinfo=JSON.parse(dinfo);
        } catch (e) {
            if (!isReadonly(path)) {
                lcs(path,"{}");
            } else {
            	console.log("dinfo err : "+path+" - "+dinfo);
            }
            dinfo={};
        }
        return dinfo;
    }
    function touch(dinfo, path, name) { // path:path of dinfo
        //if (!dinfo[name]) {
            dinfo[name]={lastUpdate:now()};
            putDirInfo(path ,dinfo);
        //}
    }
    function removeEntry(dinfo, path, name) {// path:path of dinfo
        if (dinfo[name]) {
            delete dinfo[name];
            putDirInfo(path ,dinfo);
        }
    }
    FS.orderByName=function (a,b) {
        return (a>b ? 1 : (a<b ? -1 : 0));
    };
    FS.orderByNumberedName=function (a,b) {
        function splitByNums(s) {
            var array=[];
            var pnum=/^[0-9]*/, pNnum=/^[^0-9]*/;
            while (s) {
                s.match(pNnum);
                array.push(RegExp.lastMatch);
                s=s.replace(pNnum,"");
                if (!s) break;
                s.match(pnum);
                var v=parseInt(RegExp.lastMatch);
                array.push(v);
                s=s.replace(pnum,"");
            }
            return array;
        }
        var aa=splitByNums(a);
        var bb=splitByNums(b);
        var i;
        for (i=0 ; i<aa.length ; i++) {
            if (i>=bb.length) return 1; // a = 123_abc2   b=123_abc
            if (aa[i]>bb[i]) return 1;
            if (aa[i]<bb[i]) return -1;
        }
        if (i<bb.length) return -1;  // a = 123_abc   b=123_abc2
        return 0;
    };
    FS.importDir=function (exported) {
        var base=FS.get(exported.base);
        if (!exported.confirm) base.mkdir();
        var data=exported.data;
        var res=[];
        for (var i in data) {
            var p=base.path()+i;
            var f=FS.get(p);
            res.push("["+ ( f.isReadOnly() ? "ro" : f.exists() ? "exists": "new" )+ "]"+p);
            if (f.isReadOnly()) continue;
            if (!exported.confirm) {
                if (f.isDir()) {
                    var dinfo= getDirInfo(p);
                    var ovr=JSON.parse(data[i]);
                    for (var k in ovr) {
                        dinfo[k]=ovr[k];
                    }
                    putDirInfo(p, dinfo);
                } else {
                    lcs(p, data[i]);
                }
            }
        }
        return res;
    };
    FS.mountROM=function (exported) {
        roms[exported.base]=exported.data;
    };
    var DONOTEXPORT="DONOTEXPORT";
    FS.exportDir=function (dir,options) {
    	if (!options) options={};
        if (typeof dir=="string") dir=FS.get(dir);
        var res={base: dir.path()};
        var data=res.data={};
        e(dir);
        return res;
        function e(cfd) {
            var rp=cfd.relPath(dir);
            data[rp]=cfd.text();
            if (cfd.isDir()) {
            	if (cfd.rel(DONOTEXPORT).exists()) return;
                cfd.each(e);
            }
        }
    };
    FS.get=function (path, securityDomain) {
    	if (!securityDomain) securityDomain={};
        if (path==null) throw "FS.get: Null path";
        if (path.isDir) return path;
        if (securityDomain.topDir && !startsWith(path,securityDomain.topDir)) {
        	throw path+" is out of securtyDomain";
        }
        if (!isPath(path)) throw path+": Path must starts with '/'";
        var parent=up(path);
        var name=getName(path);
        var res;
        if (isDir(path)) {
            var dir=res={};
            dir.each=function (f) {
                dir.ls().forEach(function (n) {
                    var subd=dir.rel(n);
                    f(subd);
                });
            };
            dir.recursive=function (fun) {
                dir.each(function (f) {
                    if (f.isDir()) f.recursive(fun);
                    else fun(f);
                });
            };
            dir.ls=function (ord) {
                var dinfo=getDirInfo(path);
                var res=[];
                for (var i in dinfo) {
                    res.push(i);
                }
                if (typeof ord=="function" && res.sort) res.sort(ord);
                return res;
            };
            dir.isDir=function () {return true;};
            dir.rel=function (relPath){
            	var paths=splitPath(relPath);
            	var resPath=dir.path();
            	resPath=resPath.replace(/\/$/,"");
            	paths.forEach(function (n) {
            		if (n==".." || n=="../") resPath=up(resPath);
            		else {
                    	resPath=resPath.replace(/\/$/,"");
            			resPath+=SEP+(n=="."||n=="./" ? "": n);
            		}
            	});
                return FS.get(resPath, securityDomain);
            };
            dir.rm=function (ord) {
                if (!dir.exists()) throw path+": No such dir.";
                var lis=dir.ls(ord);
                if (lis.length>0) throw path+": Directory not empty";
                lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntry(pinfo, parent, name);
                }
            };
            dir.mkdir=function () {
                dir.touch();
                getDirInfo(path);
            };
            dir.text=function () {
                return lcs(path);
            };
            dir.obj =function () {
                return JSON.parse(dir.text());
            };
        } else {
            var file=res={};

            file.isDir=function () {return false;};
            file.rm=function () {
                if (!file.exists()) throw path+": No such file.";
                lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntry(pinfo, parent, name);
                }
            };
            file.text=function () {
                if (arguments.length==0) {
                    return lcs(path);
                } else {
                    lcs(path, arguments[0]);
                    file.touch();
                }
            };
            file.lines=function () {
            	return file.text().split("\n");
            };
            file.obj=function () {
                if (arguments.length==0) {
                    return JSON.parse( file.text() );
                } else {
                    file.text(JSON.stringify(arguments[0]));
                }
            };
            file.copyFrom=function (src) {
                file.text(src.text());
            };
        }
        res.relPath=function (base) {
            //  path= /a/b/c   base=/a/b/  res=c
            //  path= /a/b/c/   base=/a/b/  res=c/
            var bp=(base.path ? base.path() : base);
            if (bp.substring(bp.length-1)!=SEP) {
                throw bp+" is not a directory.";
            }
            if (path.substring(0,bp.length)!=bp) {
                throw path+" is not in "+bp;
            }
            return path.substring(bp.length);
        };
        res.exists=function () {
            return lcsExists(path);
        };
        res.up=function () {
            if (parent==null) return null; //  path=/
            return FS.get(parent, securityDomain);
        };
        res.path=function () {return path;};
        res.name=function () {return name;};
        res.truncExt=function (ext) {
            return name.substring(0,name.length-ext.length);
        };
        res.touch=function () {
            if (parent==null) return ; //  path=/
            var pinfo=getDirInfo(parent);
            touch(pinfo, parent, name);
        };
        res.isReadOnly=function () {
            var r=resolveROM(path);
            return !!r;
        };
        res.startsWith=function (pre) {
            return startsWith(name, pre);
        };
        res.endsWith=function (post) {
            return endsWith(name, post);
        };
        res.equals=function (o) {
            return (o && typeof o.path=="function" && o.path()==path);
        };
        res.toString=function (){
            return path;
        };
        return res;
    };
    function up(path) {
        if (path==SEP) return null;
        //                       path=/a/b/c/               /a/b/c
        var s=splitPath(path);  //  s=["","a","b","c/"]     ["","a","b","c"]
        s[s.length-1]=""; //        s=["","a","b",""]       ["","a","b",""]
        return  s.join(SEP) ;  //     /a/b/                 /a/b/

        /*var name=s[s.length-1];
        var isDir=endsWith(name, SEP);
        if (!isDir) {
        	// path=/a/b/c
        	// s=["a", "b", "c"]
            s[s.length-1]=""; // s=["a","b",""]
            return  s.join(SEP) ;  // /a/b/
        } else {
        	// path=/a/b/c/
        	// s=["a", "b", "c/"]
        	//s.pop();
            s[s.length-1]="";     // s=["a", "b", ""]
            return  s.join(SEP) ;  // /a/b/
        }*/
    }
    function isPath(path) {
        return startsWith(path,SEP);
    }
    function isDir(path) {
        return endsWith(path,SEP);
    }
    function getName(path) {  //  a/b/c  => c    a/b/c/  => c/
        var patha=splitPath(path);
        return patha[patha.length-1];
        /*
        if (patha[patha.length-1]=="") {
            name=patha[patha.length-2]+SEP;
        } else {
            name=patha[patha.length-1];
        }
        return name;*/
    }
    FS.scan=function () {
        for (var path in localStorage) {
            if (!isPath(path)) continue;
            var p=up(path);
            if (p==null) continue;
            var dinfo=getDirInfo(p);
            var name=getName(path);
            touch(dinfo, p , name);
        }
    };
    FS.dump=function () {
        for (var i in localStorage) {
            console.log(i);
        }
    };
    FS.ls=function (path) {
        return FS.get(path).ls();
    };
    return FS;
}();
requirejs.setName('Tonyu.Project');
define(["Tonyu", "Tonyu.Compiler", "TError", "FS", "Tonyu.TraceTbl","ImageList",  "Key"],
        function (Tonyu, Tonyu_Compiler, TError, FS, Tonyu_TraceTbl, ImageList, Key) {
return Tonyu.Project=function (dir, kernelDir) {
    var TPR={};
    var traceTbl=Tonyu.TraceTbl();
    var env={classes:{}, traceTbl:traceTbl, options:{compiler:{}} };
    TPR.EXT=".tonyu";
    function orderByInheritance(classes) {
        var added={};
        var res=[];
        var ccnt=0;
        for (var n in classes) {
            added[n]=false;
            ccnt++;
        }
        var lpc=0;
        while (res.length<ccnt) {
            for (var n in classes) {
                if (added[n]) continue;
                var c=classes[n];
                var spc=c.superClass;
                if (!spc || added[spc.name]) {
                    res.push(c);
                    added[n]=true;
                }
            }
            lpc++;
            if (lpc>100) throw TError( "クラスの循環参照があります", "不明" ,0);
        }
        return res;
    }
    TPR.env=env;
    TPR.dumpJS=function (n) {
        function dumpn(n) {
            console.log("Class "+n+":\n"+env.classes[n].src.js);
        }
        if (n) dumpn(n);
        else {
            for (var n in env.classes) dumpn(n);
        }
    };
    TPR.stop=function () {
        var cur=TPR.runningThread; //Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=TPR.runningObj;
        if (main && main.stop) main.stop();
    };
    TPR.rawRun=function (mainClassName) {
        TPR.compile();
        TPR.rawBoot(mainClassName);
    };
    TPR.run=function (mainClassName) {
        TPR.compile();
        TPR.boot(mainClassName);
    };
    TPR.compile=function () {
        TPR.getOptions();
        Tonyu.runMode=false;
        env.classes={};
        Tonyu.currentProject=TPR;
        Tonyu.globals.$currentProject=TPR;
        /*if (Tonyu.currentThreadGroup) Tonyu.currentThreadGroup.kill();
        delete Tonyu.currentThreadGroup;*/
        kernelDir.each(collect);
        dir.each(collect);
        function collect(f) {
            if (f.endsWith(TPR.EXT)) {
                var nb=f.truncExt(TPR.EXT);
                env.classes[nb]={
                        name:nb,
                        src:{
                            tonyu: f
                        }
                };
            }
        }
        for (var n in env.classes) {
            //console.log("initClassDecl: "+n);
            Tonyu.Compiler.initClassDecls(env.classes[n], env);
        }
        var ord=orderByInheritance(env.classes);
        ord.forEach(function (c) {
            //console.log("genJS :"+c.name);
            Tonyu.Compiler.genJS(c, env);
            try {
                eval(c.src.js);
            } catch(e){
                console.log(c.src.js);
                throw e;
            }
        });
    };
    TPR.getResource=function () {
        var resFile=dir.rel("res.json");
        if (resFile.exists()) return resFile.obj();
        return Tonyu.defaultResource;
    };
    TPR.setResource=function (rsrc) {
        var resFile=dir.rel("res.json");
        resFile.obj(rsrc);
    };
    TPR.loadResource=function (next) {
        var r=TPR.getResource();
        ImageList( r.images, function (r) {
            var sp=Tonyu.getGlobal("$Sprites");
            if (sp) {
                //console.log("$Sprites set!");
                sp.setImageList(r);
            }
            //Sprites.setImageList(r);
            for (var i in r.names) {
                Tonyu.setGlobal(i, r.names[i]);
            }
            if (next) next();
        });
    };
    TPR.getOptions=function () {
        env.options=null;
        var resFile=dir.rel("options.json");
        if (resFile.exists()) env.options=resFile.obj();
        if (env.options && !env.options.run) env.options=null;
        if (!env.options) {
            env.options=Tonyu.defaultOptions;
        }
        return env.options;
    };
    TPR.setOptions=function (r) {
        if (r) env.options=r;
        var resFile=dir.rel("options.json");
        resFile.obj(env.options);
    };
    TPR.rawBoot=function (mainClassName) {
        var thg=Tonyu.threadGroup();
        var mainClass=Tonyu.getClass(mainClassName);// window[mainClassName];
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        //Tonyu.runMode=true;
        var main=new mainClass();
        TPR.runningThread=thg.addObj(main);
        $LASTPOS=0;
        thg.run(0);
        TPR.runningObj=main;
    };
    TPR.boot=function (mainClassName) {
        TPR.loadResource(function () {ld(mainClassName);});
    };
    function ld(mainClassName){
        var thg=Tonyu.threadGroup();
        var cv=$("canvas")[0];
        var mainClass=Tonyu.getClass(mainClassName);// window[mainClassName];
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        //Sprites.clear();
        //Sprites.drawGrid=Tonyu.noviceMode;
        Tonyu.runMode=true;
        var main=new mainClass();
        thg.addObj(main);
        //TPR.currentThreadGroup=
        Tonyu.setGlobal("$currentThreadGroup",thg);
        $LASTPOS=0;

        Tonyu.setGlobal("$pat_fruits",30);
        Tonyu.setGlobal("$screenWidth",cv.width);
        Tonyu.setGlobal("$screenHeight",cv.height);
        thg.run(33, function () {
            Key.update();
            $screenWidth=cv.width;
            $screenHeight=cv.height;
            //Sprites.draw(cv);
            //Sprites.checkHit();
        });
    };
    TPR.isKernel=function (className) {
        var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;
    };

    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});
requirejs.setName('copySample');
define(["Shell","FS"],function (sh,fs) {
    var samples=FS.get("/Tonyu/SampleROM/");
    var projects=FS.get("/Tonyu/Projects/");
    function all() {
        samples.ls().forEach(cs);
    }
    function available(dir) {
        var n=dir.name();
        return samples.rel(n).exists() && projects.equals(dir.up());
    }

    function cs(n) {
        if (!n) return all();
        var src=samples.rel(n);
        var dst=projects.rel(n);
        //console.log(n,src,dst,dst.exists());
        if (!dst.exists()) {
            sh.cp(src,dst);//,{v:1});
        }
    }
    cs.available=available;
    cs.all=all;
    return cs;
});
requirejs.setName('Shell');
define(["FS","Util"],function (FS,Util) {
    var Shell={cwd:FS.get("/")};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir);
        return Shell.pwd();
    };
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (mustExist && !r.exists()) throw r+": no such file or directory";
        return r;
    }
    Shell.resolve=resolve;
    function resolve2(v) {
        if (typeof v!="string") return v;
        if (Util.startsWith(v,"/")) return FS.get(v);
        var c=Shell.cwd;
        /*while (Util.startsWith(v,"../")) {
            c=c.up();
            v=v.substring(3);
        }*/
        return c.rel(v);
    }
    Shell.pwd=function () {
        return Shell.cwd+"";
    };
    Shell.ls=function (dir){
    	if (!dir) dir=Shell.cwd;
    	else dir=resolve(dir, true);
        return dir.ls();
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            console.log("cp", from ,to);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        if (f.isDir() && t.isDir()) {
            var sum=0;
            f.recursive(function (src) {
                var rel=src.relPath(f);
                var dst=t.rel(rel);
                if (options.test || options.v) {
                    console.log((dst.exists()?"[ovr]":"[new]")+dst+"<-"+src);
                }
                if (!options.test) {
                    dst.copyFrom(src);
                }
                sum++;
            });
            return sum;
        } else if (!f.isDir() && !t.isDir()) {
            t.text(f.text());
            return 1;
        } else if (!f.isDir() && t.isDir()) {
            t.rel(f.name()).text(f.text());
            return 1;
        } else {
            throw "Cannot copy directory "+f+" to file "+t;
        }
    };
    Shell.rm=function (file, options) {
        if (!options) options={};
        file=resolve(file, true);
        if (file.isDir() && options.r) {
            var dir=file;
            var sum=0;
            dir.each(function (f) {
                if (f.exists()) {
                    sum+=Shell.rm(f, options);
                }
            });
            dir.rm();
            return sum+1;
        } else {
            file.rm();
            return 1;
        }
    };
    Shell.cat=function (file) {
        file=resolve(file, true);
        console.log(file.text());
        return "";
    };
    Shell.grep=function (pattern, file, options) {
    	file=resolve(file, true);
    	if (!options) options={};
    	if (file.isDir()) {
    		file.each(function (e) {
    			Shell.grep(pattern, e, options);
    		});
    	} else {
			if (typeof pattern=="string") {
	    		file.lines().forEach(function (line, i) {
	    			if (line.indexOf(pattern)>=0) {
	    				report(file, i+1, line);
	    			}
	    		});
			}
    	}
    	function report(file, lineNo, line) {
			if (options.res) {
				options.res.push({file:file, lineNo:lineNo,line:line});
			} else {
				console.log(file+"("+lineNo+"): "+line);
			}
    	}
    };
    Shell.touch=function (f) {
    	f=resolve(f);
    	f.text(f.exists() ? f.text() : "");
    	return 1;
    };
    sh=Shell;
    return Shell;
});
requirejs.setName('ImageResEditor');
define(["FS","Tonyu","UI"], function (FS, Tonyu, UI) {
    var ImageResEditor=function (prj) {
        var d=UI("div", {title:"画像リスト"});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var itemUIs=[];
        if (!rsrc) prj.setResource();
        function reload() {
            d.empty();
            UI("div","※「URL」欄に画像ファイル(png/gif)をドラッグ＆ドロップできます．").appendTo(d);
            rsrc=prj.getResource();
            var ims=rsrc.images;
            ims.forEach(function (im){
                var itemUI=imgItem(im);
                itemUIs.push(itemUI);
                itemUI.appendTo(d);
            });
            d.append(UI("button", {on:{click:add}}, "追加"));
            function imgItem(im) {
                var isFix=!!(im.pwidth && im.pheight);
                var res=UI("div",
                        ["div", "名前: ", ["input", {$var:"name", size:12,value:im.name}],
                                "URL: ", ["input",{$var:"url", size:30,value:im.url,
                                    on:{dragover: s, dragenter: s, drop:drop}}],
                                ["button",{on:{click:del}}, "削除"]],
                        ["div", "パターン解析方法",
                            ["select", {$var:"ptype"},
                              ["option",{value:"t1",  selected:!isFix}, "Tonyu1フォーマット"],
                              ["option",{value:"fix", selected:isFix}, "固定サイズ"]],
                            ["span", "大きさ",
                               ["input", {$var:"pwidth", size:3, value:im.pwidth}],"x",
                               ["input", {$var:"pheight",size:3, value:im.pheight}]],
                            ["hr"]
                        ]
                );
                function s(e) {
                    e.stopPropagation();
                    e.preventDefault();

                }
                var v=res.$vars;
                v.data=im;
                function drop(e) {
                    eo=e.originalEvent;
                    var file = eo.dataTransfer.files[0];
                    if(!file.type.match(/image\/(png|gif)/)[1]) {
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        v.url.val(fileContent);
                    }
                    reader.readAsDataURL(file);
                    e.stopPropagation();
                    e.preventDefault();
                    if (!v.name.val()) v.name.val("$pat_"+file.name.replace(/\.(png|gif)$/,"").replace(/\W/g,"_"));
                    return false;
                }
                function del() {
                    for (var i=ims.length-1; i>=0 ; i--) {
                        if (ims[i]===im) {
                            ims.splice(i,1);
                            break;
                        }
                    }
                    update();
                }
                return res;
            }
            function add() {
                ims.push({});
                update();
            }
        }
        function update() {
            itemUIs.forEach(function (itemUI) {
                var v=itemUI.$vars;
                var im=v.data;
                im.name=v.name.val();
                im.url=v.url.val();
                im.pwidth=toi(v.pwidth.val());
                im.pheight=toi(v.pheight.val());
            });
            prj.setResource(rsrc);
            reload();
        }
        function toi(s) {
            if (!s || s=="") return undefined;
            return parseInt(s);
        }
        reload();
        d.dialog({
            modal:true,
            width: 600,
            height: 400,
            buttons: {
                OK: function(){
                    update();
                    $(this).dialog('close');
                }
            }
        });
    };
    return ImageResEditor;
});
requirejs.setName('ProjectOptionsEditor');
define(["UI"], function (UI) {
    return function (TPR) {
        var opt=TPR.getOptions();
        //opt.id=Math.random();
        //console.log("Project got",opt);
        /*   Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                bootClass: "Boot",
                kernelEditable: false
             };
         */
        var FType={
                fromVal: function (val){
                    return val;
                },
                toVal: function (v){ return val;}
        };
        if (!TPR.odiag) {
            TPR.odiag=UI("div",{title:"プロジェクト オプション"},
                    ["h5","コンパイラ"],
                    ["div", "デフォルトの親クラス",
                     ["input", {$edit: "compiler.defaultSuperClass"}]],
                     ["h5","実行"],
                     ["div", "Main クラス", ["input", {$edit: "run.mainClass"}] ],
                     ["div", "Boot クラス", ["input", {$edit: "run.bootClass"}] ],
                     ["h5","開発"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "kernelEditable"}],
                      "Kernelの開発を行う"],
                      ["div", {$var:"validationMessage", css:{color:"red"}}]
            );
        }
        TPR.odiag.$edits.load(opt);
        TPR.odiag.dialog({
            width: 600,
            buttons: {
                OK: function () {
                    TPR.odiag.dialog("close");
                    //console.log("Project opt Saved ",JSON.stringify(opt));
                    TPR.setOptions();
                    //console.log("new opt ",JSON.stringify(TPR.getOptions()));
                }
            }
        });
    };
});
requirejs.setName('copyToKernel');
define(["Shell","FS"], function (sh,FS) {
    sh.copyToKernel=function (name) {
        var ker=FS.get("/Tonyu/Kernel/");
        if (name) {
            return sh.cp( name, ker.rel(name));
        } else {
            var cps=0;
            ker.each(function (f) {
                var src=sh.cwd.rel(f.name());
                if (src.exists()) {
                    cps+=sh.cp(src, ker);
                }
            });
        }
    };
});
requirejs.setName('KeyEventChecker');
define([],function () {
	var KEC={};
	KEC.down=function (elem, name, handler) {
		if (!(elem instanceof $)) elem=$(elem);
		elem.bind("keydown", function (e) {
			if (KEC.is(e, name)) {
				return handler.call(elem[0],e);
			}
		});
	};
	KEC.is=function (e,name) {
		name=name.toLowerCase();
		e = e.originalEvent || e;
		var s="";
		if (e.altKey) {
			s+="alt+";
		}
		if (e.ctrlKey) {
			s+="ctrl+";
		}
		if (e.shiftKey) {
			s+="shift+";
		}
		if (e.keyCode>=112 && e.keyCode<=123) {
			s+="f"+(e.keyCode-111);
		} else {
			s+=String.fromCharCode(e.keyCode);
		}
		s=s.toLowerCase();
		//console.log(s);
		return name==s;
	};
	return KEC;
});
requirejs.setName('WikiDialog');
define(["Wiki"],function (W) {
	var WD={};
	WD.create=function (home, options) {
		options=options || {title:"help",topPage:"index"};
		var d=$("<div>").attr({title:options.title});
		var w=W(d,home, options);
		if (options.topPage) w.show(options.topPage);
		if (!options.height) {
			options.height=$(window).height()*0.7;
		}
		if (!options.width) options.width=500;
		return {
			show: function (name) {
				if (name) w.show(name);
				d.dialog({width:options.width, height:options.height});
			}
		};
	};
	return WD;
});
requirejs.setName('runtime');
define(["ImageList","TextRect","fukidashi","timbre"], function () {

});
requirejs.setName('KernelDiffDialog');
define(["UI","DiffDialog"], function (UI,dd) {
    var res={};
	res.show=function (devDir, kernelDir , options) {
    	var d=res.embed(devDir, kernelDir, options);
    	d.dialog({width:250,height:400});
	};
	res.embed=function (devDir, kernelDir, options) {
        if (!res.d) {
        	res.d=UI("div",{title:"Kernel比較"},
        			["div", {$var:"out"}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.refresh();
                 }}}, "更新"]
            );
        }
        var d=res.d;
    	res.refresh=function () {
    		var out=d.$vars.out;
    		out.empty();
    		kernelDir.each(function (kerf) {
    			var devf=devDir.rel(kerf.relPath(kernelDir));
    			if (kerf.endsWith(".tonyu") && devf.exists()) {
    				if (kerf.text()==devf.text()) {
    					out.append(UI("div",kerf.name(),"(同一)"));
    				} else {
    					out.append(UI("div",
    							["a",{href:"javascript:;",on:{click:openDiagF(devf, kerf)}}, kerf.name()]
    					));
    				}
    			}
    		});
    	};
    	res.refresh();
    	return d;
    };
    function openDiagF(a,b) {
    	return function () {
    		dd.show(a,b);
    	};
    }
    return res;
});
// Skipped http://localhost:3002/js/lib/ace-noconflict/ace.js
requirejs.setName('Tonyu');
Tonyu=function () {
    var preemptionTime=60;
    function thread() {
        var fb={enter:enter, exit:exit, steps:steps, step:step, isAlive:isAlive, isWaiting:isWaiting,
                suspend:suspend,retVal:retVal, kill:kill, waitFor: waitFor};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        var retVal;
        var _isWaiting=false;
        function isAlive() {
            return frame!=null && _isAlive;
        }
        function isWaiting() {
            return _isWaiting;
        }
        function suspend() {
            cnt=0;
        }
        function enter(frameFunc) {
            frame={prev:frame, func:frameFunc};
        }
        function step() {
            if (frame) frame.func(fb);
        }
        function exit(res) {
            frame=frame.prev;
            //if (frame) frame.res=res;
            retVal=res;
        }
        function waitFor(j) {
            _isWaiting=true;
            if (j && j.addTerminatedListener) j.addTerminatedListener(function () {
                _isWaiting=false;
                if (fb.group) fb.group.notifyResume();
                //fb.group.add(fb);
            });
        }

        function retVal() {
            return retVal;
        }
        function steps() {
            var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            //var lim=new Date().getTime()+preemptionTime;
            cnt=preemptionTime;
            //while (new Date().getTime()<lim) {
            while (cnt-->0) {
                step();
            }
            Tonyu.currentThread=sv;
        }
        function kill() {
            _isAlive=false;
        }
        return fb;
    }
    function timeout(t) {
        var res={};
        var ls=[];
        res.addTerminatedListener=function (l) {
            ls.push(l);
        };
        setTimeout(function () {
            ls.forEach(function (l) {
                l();
            });
        },t);
        return res;
    }
    function asyncResult() {
        var res=[];
        var ls=[];
        var hasRes=false;
        res.addTerminatedListener=function (l) {
            if (hasRes) l();
            else ls.push(l);
        };
        res.receiver=function () {
            hasRes=true;
            for (var i=0; i<arguments.length; i++) {
                res[i]=arguments[i];
            }
            res.notify();
        };
        res.notify=function () {
            ls.forEach(function (l) {
                l();
            });
        };
        return res;
    }
    function threadGroup() {
        var threads=[];
        var waits=[];
        var _isAlive=true;
        var thg;
        var _isWaiting=false;
        function add(thread) {
            thread.group=thg;
            threads.push(thread);
        }
        function addObj(obj) {
            var th=thread();
            th.enter(obj.fiber$main());
            add(th);
            return th;
        }
        function steps() {
            for (var i=threads.length-1; i>=0 ;i--) {
                if (threads[i].isAlive()) continue;
                threads.splice(i,1);
            }
            _isWaiting=true;
            threads.forEach(function (th){
                if (th.isWaiting()) return;
                _isWaiting=false;
                th.steps();
            });
        }
        function kill() {
            _isAlive=false;
        }
        var _interval=0, _onStepsEnd;
        function run(interval, onStepsEnd) {
            if (interval!=null) _interval=interval;
            if (onStepsEnd!=null) _onStepsEnd=onStepsEnd;
            if (!_isAlive) return;
            try {
                steps();
                if (_onStepsEnd) _onStepsEnd();
                if (!_isWaiting) {
                    setTimeout(run,_interval);
                } else {
                    //console.log("all wait!");
                }
            } catch (e) {
                if (Tonyu.onRuntimeError) {
                    Tonyu.onRuntimeError(e);
                } else {
                    alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
                }
            }
        }
        function notifyResume() {
            if (_isWaiting) {
                //console.log("resume!");
                run();
            }
        }
        return thg={add:add, addObj:addObj,  steps:steps, run:run, kill:kill, notifyResume: notifyResume};
    }
    function defunct(f) {
        if (f===Function) {
            return null;
        }
        if (typeof f=="function") {
            f.constructor=null;
        } else if (typeof f=="object"){
            for (var i in f) {
                f[i]=defunct(f[i]);
            }
        }
        return f;
    }
    function klass() {
        var parent, prot;
        if (arguments.length==1) {
            prot=arguments[0];
        }
        if (arguments.length==2) {
            parent=arguments[0];
            prot=arguments[1];
        }
        prot=defunct(prot);
        var res=(prot.initialize? prot.initialize:
            (parent? function () {
                parent.apply(this,arguments);
            }:function (){})
        );
        /*res=function () {
            if (this.initialize) {
                this.initialize.apply(this, arguments);
            }
        };*/
        res.prototype=bless(parent, prot);
        res.prototype.isTonyuObject=true;
        return res;
    }
    function bless( klass, val) {
        if (!klass) return val;
        return extend( new klass() , val);
    }
    function extend (dst, src) {
        if (src && typeof src=="object") {
            for (var i in src) {
                dst[i]=src[i];
            }
        }
        return dst;
    }
    //alert("init");
    var globals={};
    var classes={};
    function setGlobal(n,v) {
        globals[n]=v;
    }
    function getGlobal(n) {
        return globals[n];
    }
    function getClass(n) {
        return classes[n];
    }
    function bindFunc(t,meth) {
    	return function () {
    		return meth.apply(t,arguments);
    	};
    }
    function A(args) {
        var res=[];
        for (var i=0 ; i<args.length; i++) {
            res[i]=args[i];
        }
        return res;
    }
    function not_a_tonyu_object(o) {
        console.log(o);
        throw o+" is not a tonyu object";
    }
    return Tonyu={thread:thread, threadGroup:threadGroup, klass:klass, bless:bless, extend:extend,
            globals:globals, classes:classes, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
            timeout:timeout,asyncResult:asyncResult,bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object, A:A};
}();

requirejs.setName('FileMenu');
define(["UI","FS"], function (UI,FS) {
var FileMenu=function () {
    var FM={on:{}};
    FM.on.validateName=function (name,action) {
        if (!name) return {ok:false, reason:"ファイル名を入力してください"};
        // return {ok:true, file:File } || {ok: false, reason:String}
        var curDir=FM.on.getCurDir();
        var f=curDir.rel(name);
        return {ok: true, file: f};
    };
    FM.on.displayName=function (f) {
        return f.name();
    };
    FM.on.close=function () {};
    FM.on.open=function (f){
        if (typeof FM.fileList=="object") {
            FM.fileList.select(f);
        }
    };
    FM.on.ls=function () {
        if (typeof FM.fileList=="object") {
            FM.fileList.ls();
        }
    };
    FM.on.getCurFile=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curFile();
        }
        throw "on.getCurFile is missing";
    };
    FM.on.getCurDir=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curDir();
        }
        throw "on.getCurDir is missing";
    };
    FM.on.createContent=function (f) {
        return f.text("");
    };
    FM.onMenuStart=function (){};
    FM.dialog=function (title, name, onend) {
    	return FM.dialogOpt({title:title, name:name, onend:onend});
    };
    FM.dialogOpt=function (options) {
    	var title=options.title;
    	var name=options.name || "";
    	var onend=options.onend || function (){};
        //var t;
        if (!FM.d) FM.d=UI(["div"], {title: title},
             "ファイル名を入力してください",["br"],
             ["input", {
                 $var: "name",
                 on:{
                	 enterkey:function () {
                		 FM.d.$vars.done();
                	 },
                	 realtimechange: function (v) {
                		 FM.d.$vars.chg(v);
                	 }
                 }
             }],
             ["br"],
             ["div",{$var:"msg"}],
            ["button", {$var:"b", on:{click: function () {
            	FM.d.$vars.done();
       	 	}}}, "OK"]
        );
        FM.d.attr({title:title});
        var v=FM.d.$vars;
        //console.log(name);
        v.name.val(name);
        FM.d.dialog({title:title});
        var r=null;
        v.done=function() {
            if (!r || !r.ok) return;
            //clearInterval(t);
            onend(r.file);
            FM.d.dialog("close");
        };
        v.chg=function (s) {
            r=FM.on.validateName(s,options);
            if (r.ok && r.file.exists()) r={ok:false, reason:s+"は存在します"};
            if (!r.ok) {
                v.msg.css({"color":"red"});
                v.msg.text(r.reason);
                v.b.attr("disabled",true);
            } else {
                v.msg.css({"color":"blue"});
                v.msg.text(r.note || "");
                v.b.removeAttr("disabled");
            }
        };

    };

    FM.create=function () {
        FM.onMenuStart("create");
        FM.dialogOpt({title:"新規作成", action:"create", onend:function (f) {
            if (!f.exists()) {
                FM.on.createContent(f); //f.text("");
                FM.on.ls();
                FM.on.open(f);
            }
        }});
    };
    FM.mv=function () {
        FM.onMenuStart("mv");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        var oldName=FM.on.displayName(curFile);
        /*var oldName,  mode;
        if (typeof oldNameD=="string") oldName=oldNameD;
        else { oldName=oldNameD.name; mode=oldNameD.mode;}*/
        FM.dialogOpt({title:"名前変更", name:oldName, action:"mv", onend:function (nf) {
            if (!nf) return;
            var t=curFile.text();
            curFile.rm();
            curFile=nf;
            nf.text(t);
            FM.on.ls();
            FM.on.open(curFile);
        }});
    };
    FM.rm=function (){
        FM.onMenuStart("rm");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        if (!confirm(curFile.name()+"を削除しますか？")) return;
        curFile.rm();
        FM.on.ls();
        FM.on.close();
    };
    /*$(function () {
        $("#newFile").click(FM.create);
        $("#mvFile").click(FM.mv);
        $("#rmFile").click(FM.rm);
    });*/
    return FM;
};
return FileMenu;

});

requirejs.setName('WebSite');
define([], function () {
    var loc=document.location.href;
    if (loc.match(/jsrun\.it/)) {
        return window.WebSite={
            urlAliases: {
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png"
            },top:""
        };
    }
    if (loc.match(/localhost/) || loc.match(/tonyuedit\.appspot\.com/)) {
        return window.WebSite={
            urlAliases: {
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png"
            },top:"../../"
        };
    }

    return window.WebSite={
        urlAliases: {}, top: "../../"
    };
});
requirejs.setName('Visitor');
Visitor = function (funcs) {
	var $={funcs:funcs};
	$.visit=function (node) {
		if ($.debug) console.log("visit ",node.type, node.pos);
		var v=(node ? funcs[node.type] :null);
		if (v) return v.call($, node);
		else if ($.def) return $.def.call($,node);
	};
	$.replace=function (node) {
		if (!$.def) {
			$.def=function (node) {
				if (typeof node=="object"){
					for (var i in node) {
						if (node[i] && typeof node[i]=="object") {
							node[i]=$.visit(node[i]);
						}
					}
				}
				return node;
			};
		}
		return $.visit(node);
	};
	return $;
};
requirejs.setName('HttpHelper');
function HttpHelper(options) {
    var $h={};
    var lineMark=options.lineMark;
    $h.buf=$("<div>");
    $h.bufs=[$h.buf];
    $h.maxLineNo=-1;
    $h.cur=function () {
        return $h.bufs[$h.bufs.length-1];
    };
    function mon(s) {
        if (typeof s=="string") return s;
        if (!s[0]) throw s+ " is not jquery obj";
        return "<"+s[0].tagName+">"+s.html()+"</"+s[0].tagName+">";
    }
    $h.p=function (s) {
        if (typeof s=="string") {
            if (s.length>0) {
                s=$("<span>").text(s);
            } else {
                s=null;
            }
        }
        //console.log("Append - "+mon(s)+" to "+mon($h.cur()));
        if ($h.cur()) {
            if ($h.lineNo>$h.maxLineNo) {
                $h.maxLineNo=$h.lineNo;
                $h.cur().append($("<a>").attr({id:lineMark+"-"+$h.lineNo, name:lineMark+"-"+$h.lineNo}));
            }
            if (s) $h.cur().append(s);
        } else {
            console.log("Warning - Stack underflow");
        }
    };
    $h.enter=function (s) {
        //console.log("Enter - "+s+"  size="+$h.bufs.length);
        if (typeof s=="string") s=$(s);
        $h.bufs.push(s);
    };
    $h.exit=function () {
        var s=$h.bufs.pop();
        $h.p(s);
        //console.log("Exit - "+s.html()+"  size="+$h.bufs.length);
    };
    $h.h=function (s) {
        return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    };
    return $h;
}
requirejs.setName('Arrow');
Arrow=function () {
    var A={};
    A.show=function (t) {
        if (typeof t=="string") t=$(t);
        if (t.length==0) return false;
        var b=$.data(t[0],"blinking");
        if (b=="t") return;
        $.data(t[0],"blinking","t");
        var cnt=3;
        function on() {
            t.addClass("tutorial-highlight");
            setTimeout(off,200);
        }
        function off() {
            t.removeClass("tutorial-highlight");
            if (cnt-->0) setTimeout(on,200);
            else clear();
        }
        on();
        function clear() {
            cnt=0;
            $.data(t[0],"blinking","f");
        }
        t.click(function () {
            clear();
        });
    };
    A.showOld=function (t) {
        if (typeof t=="string") t=$(t);
        if (t.length==0) return false;
        var p=t.offset();
        var arrow=$("<img>").attr({src:"images/arrow0.png"}).css(
                {font: "40px", position: "absolute", left:p.left, top:p.top+t.height(), color:"red", zIndex:1000,
                    "z-index":1000}).
                appendTo("body");
        var cnt=0;
        function up() {
            if (!arrow) return;
            arrow.attr({ src:"images/arrow"+cnt+".png" });
            cnt=(cnt+1)%4;
        }
        setInterval(up,250);
        t.click(function () {
           if (!arrow) return;
           arrow.remove();
           arrow=null;
        });
        return true;
    };
    return A;
}();
requirejs.setName('IndentBuffer');
IndentBuffer=function () {
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg() {
			ai++;
			var res=args[ai];
			if (res==null) {
			    console.log(arguments);
			    throw (ai+"th null param: fmt="+fmt);
			}
			return res;
		}
		function nc(val, msg) {
		    if(val==null) throw msg;
		    return val;
		}
		while (true) {
			var i=fmt.indexOf("%");
			if (i<0) {$.buf+=fmt; break;}
			$.buf+=fmt.substring(0,i);
			i++;
			var fstr=fmt.charAt(i);
			if (fstr=="s") {
				var str=shiftArg();
				if (typeof str == "string" || typeof str =="number") {}
				else if (str==null) str="null";
				else if (str.text) str=str.text;
				$.buf+=str;
				i++;
			} else if (fstr=="d") {
                var n=shiftArg();
                if (typeof n!="number") throw (n+" is not a number: fmt="+fmt);
                $.buf+=n;
                i++;
			} else if (fstr=="n") {
				$.ln();
				i++;
			} else if (fstr=="{") {
				$.indent();
				i++;
			} else if (fstr=="}") {
				$.dedent();
				i++;
			} else if (fstr=="%") {
				$.buf+="%";
			} else if (fstr=="f") {
				shiftArg()($);
				i++;
			} else if (fstr=="v") {
			    var a=shiftArg();
			    if (!a) throw "Null %v";
                if (typeof a!="object") throw "nonobject %v:"+a;
				$.visitor.visit(a);
				i++;
            } else if (fstr=="z") {
                var place=shiftArg();
                if ("val" in place) {
                    $.buf+=place.val;
                    return;
                }
                if (!place.gen) {
                    /*place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
                    place.reg=new RegExp(place.gen,"g");
                    //place.src=place.gen;
                    place.put=function (val) {
                        this.val=val;
                        $.buf=$.buf.replace(this.reg, val);
                        return val;
                    };*/
                    $.lazy(place);
                }
                $.buf+=place.gen;
                i++;
			} else if (fstr=="j") {
                var sp_node=shiftArg();
                var sp=sp_node[0];
                var node=sp_node[1];
                var sep=false;
                if (!node || !node.forEach) {
                    console.log(node);
                    throw node+" is not array. cannot join fmt:"+fmt;
                }
                node.forEach(function (n) {
                    if (sep) $.printf(sp);
                    sep=true;
                    $.visitor.visit(n);
                });
                i++;
			} else if (fstr=="D"){
			    shiftArg();
			    i++;
			} else {
				i+=2;
			}
			fmt=fmt.substring(i);
		}
	};
	$.print=function (v) {
	    $.buf+=v;
	};
	$.printf=$;
	$.buf="";
	$.lazy=function (place) {
	    if (!place) place={};
	    place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
        place.reg=new RegExp(place.gen,"g");
        //place.src=place.gen;
        place.put=function (val) {
            this.val=val;
            $.buf=$.buf.replace(this.reg, val);
            return val;
        };
        return place;
        //return {put: function () {} };
	};
	$.ln=function () {
		$.buf+="\n"+$.indentBuf;
	};
	$.indent=function () {
		$.indentBuf+=$.indentStr;
		$.buf+="\n"+$.indentBuf;
	};
	$.dedent = function () {
		var len=$.indentStr.length;
		$.buf=$.buf.substring(0,$.buf.length-len);
		$.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
	};
	$.indentBuf="";
	$.indentStr="  ";
	return $;
};
requirejs.setName('TError');
function TError(mesg, src, pos) {
    if (typeof src=="string") {
        return {
            isTError:true,
            mesg:mesg,
            src:{name:function () { return src;}},
            pos:pos,
            toString:function (){
                return this.mesg+" at "+src+":"+this.pos;
            },
            raise: function () {
                throw this;
            }
        };
    }
    if (typeof src.name!=="function") {
        throw "src="+src+" should be file object";
    }
    return {
        isTError:true,
        mesg:mesg,src:src,pos:pos,
        toString:function (){
            return this.mesg+" at "+this.src.name()+":"+this.pos;
        },
        raise: function () {
            throw this;
        }
    };
}
requirejs.setName('fs/ROMk');
if (!localStorage.norom) {
    FS.mountROM(
{
  "base": "/Tonyu/Kernel/",
  "data": {
    "": "{\".desktop\":{\"lastUpdate\":1393999411753},\"NoviceActor.tonyu\":{\"lastUpdate\":1393999411754},\"BaseActor.tonyu\":{\"lastUpdate\":1394009686488},\"Actor.tonyu\":{\"lastUpdate\":1393999411755},\"Boot.tonyu\":{\"lastUpdate\":1393999411756},\"Sprites.tonyu\":{\"lastUpdate\":1393469207288},\"ScaledCanvas.tonyu\":{\"lastUpdate\":1393469207288},\"Keys.tonyu\":{\"lastUpdate\":1393999411756},\"MML.tonyu\":{\"lastUpdate\":1393999411757},\"WaveTable.tonyu\":{\"lastUpdate\":1393999411757},\"TObject.tonyu\":{\"lastUpdate\":1393999411758}}",
    ".desktop": "{\"runMenuOrd\":[\"SETest\",\"AcTestM\",\"MMLTest\",\"KeyTest\",\"NObjTest\",\"NObjTest2\",\"AcTest\",\"NoviceActor\",\"Actor\",\"Boot\",\"AltBoot\",\"Keys\",\"BaseActor\",\"TObject\",\"WaveTable\",\"MML\"]}",
    "NoviceActor.tonyu": "extends BaseActor;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n        $Sprites.add(this);\n    }\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite._fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\nnowait \\draw(ctx) {\n    _sprite.draw(ctx);\n}\n\\getCrashRect() {\n    return _sprite.getCrashRect();\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}",
    "BaseActor.tonyu": "extends null;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\nnative fukidashi;\nnative TextRect;\n\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this);\n    }\n    if (typeof x==\"object\") Tonyu.extend(this,x); \n    else if (typeof x==\"number\") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n    if (scaleX==null) scaleX=1;\n    if (rotate==null) rotate=0;\n    if (alpha==null) alpha=255;\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}\n\nnowait \\print() {\n    console.log.apply(console,arguments);\n}\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\nnowait \\getkey(k) {\n    return $Keys.getkey(k);\n}\nnowait \\hitTo(t) {\n    return crashTo(t);\n}\nnowait \\allCrash(t) {\n    var res=[];\n    var sp=this; //_sprite || this;\n    var t1=getCrashRect();\n    if (!t1) return res;\n    $Sprites.sprites.forEach(\\(s) {\n        var t2;\n        if (s!==this && \n        s instanceof t && \n        (t2=s.getCrashRect()) &&\n        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n            res.push(s);    \n        }\n    });\n    return res;\n}\nnowait \\crashTo(t) {\n    if (!t) return false;\n    if (typeof t==\"function\") {\n        return allCrash(t)[0];\n    }\n    return crashTo1(t);\n}\nnowait \\crashTo1(t) {\n    if (!t || t._isDead) return false;\n/*if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n}*/\n    var t1=getCrashRect();\n    var t2=t.getCrashRect();\n    return \n    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\n    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\n    t1 && t2 &&\n    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n}\nnowait \\getCrashRect() {\n    var actWidth=width*scaleX, actHeight;\n    if(typeof scaleY===\"undefined\"){\n        actHeight=height*scaleX;\n    }else{\n        actHeight=height*scaleY;\n    }\n    return typeof x==\"number\" &&\n    typeof y==\"number\" &&\n    typeof width==\"number\" &&\n    typeof height==\"number\" && \n    {x,y,width:actWidth,height:actHeight};\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {\n    return $currentThreadGroup; \n}\nnowait \\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    play().stop();\n    _isDead=true;\n}\nnowait \\hide() {\n/*if (_sprite) {\n        $Sprites.remove(_sprite);\n        _sprite=null;\n} else {*/\n    $Sprites.remove(this);\n//}\n}\nnowait \\show(x,y,p) {\n    $Sprites.add(this);\n    if (x!=null) this.x=x;\n    if (y!=null) this.y=y;\n    if (p!=null) this.p=p;\n}\n\nnowait \\rnd(r) {\n    if (typeof r==\"number\") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}\nnowait \\detectShape() {\n    if (typeof p!=\"number\") {\n        if (text) return;\n        p=0;\n    }\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    width=pImg.width;\n    height=pImg.height;\n}\n\\waitFor(f) {\n    ifwait {\n        _thread.waitFor(f);\n    }\n    update();\n}\nnowait \\isDead() {\n    return _isDead;\n}\nnowait \\draw(ctx) {\n    if (x==null || y==null) return;\n    detectShape();\n    if (pImg) {\n        ctx.save();\n        ctx.translate(x,y);\n        ctx.rotate(this.rotate/180*Math.PI);\n        if(typeof this.scaleY===\"undefined\") {\n            ctx.scale(this.scaleX,this.scaleX);\n        }else{\n            ctx.scale(this.scaleX,this.scaleY);\n        }\n        ctx.globalAlpha=this.alpha/255;\n        ctx.drawImage(\n        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n        -width/2, -height/2, width, height);\n        ctx.restore();\n    } else if (text) {\n        if (!size) size=15;\n        if (!align) align=\"center\";\n        if (!fillStyle) fillStyle=\"white\";\n        ctx.fillStyle=fillStyle;\n        var rect=TextRect.draw(ctx, text, x, y, size, align , \"fill\");\n        width=rect.w;\n        height=rect.h;\n    }\n    if (_fukidashi) {\n        if (_fukidashi.c>0) {\n            _fukidashi.c--;\n            ctx.fillStyle=\"white\";\n            ctx.strokeStyle=\"black\";\n            fukidashi ( ctx , _fukidashi.text, \n            x, y-height/2-10, _fukidashi.size);\n        }\n    }\n}\nnowait \\asyncResult() {\n    return Tonyu.asyncResult();\n}\n\\play() {\n    if (!_mml) _mml=new MML;\n    if (isDead() || arguments.length==0) return _mml;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    _mml.play(mmls);\n    while (_mml.bufferCount()>2) {\n        update();\n    }\n    return _mml;\n}\nnowait \\playSE() {\n    var mml=new MML;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    mml.play(mmls);\n    return mml;\n}",
    "Actor.tonyu": "extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    /*if (!_sprite) {\n        _sprite=Sprites.add{owner:this};\n    }*/\n    $Sprites.add(this);\n}\n\n/*\n\\update() {\n    super.update();\n    if (_sprite) {\n        _sprite.x=x;\n        _sprite.y=y;\n        _sprite.p=p;\n    }\n}*/",
    "Boot.tonyu": "native $;\nnative TError;\nnative $LASTPOS;\nnative Key;\nnative Date;\nnative ImageList;\nnative Tonyu;\n\n\\initSprites() {\n    $Sprites=new Sprites();\n    print (\"Loading pats..\");\n    var rs=$currentProject.getResource();\n    var a=asyncResult();\n    ImageList( rs.images, a.receiver);\n    waitFor(a);\n    var r=a[0];\n    $Sprites.setImageList(r);\n    for (var name,val in r.names) {\n        Tonyu.setGlobal(name, val);\n    }\n    print (\"Loading pats done.\");\n    cvj=$(\"canvas\");\n    if (Tonyu.noviceMode) {\n        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\n    } else {\n        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\n    }\n}\n\\initCanvasEvents() {\n    cv=cvj[0];\n    $handleMouse=\\(e) {\n        var p=cvj.offset();\n        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\n        mp=$Screen.canvas2buf(mp);\n        $mouseX=mp.x;//e.clientX-p.left;\n        $mouseY=mp.y;//e.clientY-p.top;\n    };\n    $touches=[{},{},{},{},{}];\n    $touches.findById=\\(id) {\n        for (var j=0 ; j<$touches.length ; j++) {\n            if ($touches[j].identifier==id) {\n                return $touches[j];\n            }\n        }\n    };\n    $handleTouch=\\(e) {\n        var p=cvj.offset();\n        e.preventDefault();\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (!dst) {\n                for (var j=0 ; j<$touches.length ; j++) {\n                    if (!$touches[j].touched) {\n                        dst=$touches[j];\n                        dst.identifier=src.identifier;\n                        break;\n                    }\n                }\n            }\n            if (dst) {\n                mp={x:src.pageX-p.left, y:src.pageY-p.top};\n                mp=$Screen.canvas2buf(mp);\n                dst.x=mp.x;//src.pageX-p.left;\n                dst.y=mp.y;//src.pageY-p.top;\n                dst.touched=true;\n            }\n        }\n        $mouseX=$touches[0].x;\n        $mouseY=$touches[0].y;\n    };\n    $handleTouchEnd=\\(e) {\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (dst) {\n                dst.touched=false;\n                dst.identifier=-1;\n            }\n        }\n    };\n    var handleMouse=\\(e){$handleMouse(e);};\n    var handleTouch=\\(e){$handleTouch(e);};\n    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\n    var d=$.data(cv,\"events\");\n    if (!d) {\n        $.data(cv,\"events\",\"true\");\n        cvj.mousedown(handleMouse);\n        cvj.mousemove(handleMouse);\n        cvj.on(\"touchstart\",handleTouch);\n        cvj.on(\"touchmove\",handleTouch);\n        cvj.on(\"touchend\",handleTouchEnd);\n    }\n}\n\n\\initThread() {\n    thg=Tonyu.threadGroup();\n    var o=Tonyu.currentProject.getOptions();\n    var mainClassName=o.run.mainClass;\n    print(\"MainClass= \"+mainClassName);\n    mainClass=Tonyu.getClass(mainClassName);\n    if (!mainClass) {\n        TError( mainClassName+\" というクラスはありません\", \n        \"不明\" ,0).raise();\n    }\n    Tonyu.runMode=true;\n    $currentThreadGroup=thg;\n    new mainClass();\n}\n\\stop() {\n    //print(\"STOP!!\");\n    for (var k,v in $MMLS) {\n        v.stop();\n    }\n    $WaveTable.stop();\n}\ninitSprites();\ninitCanvasEvents();\ninitThread();\n$screenWidth=cv.width;\n$screenHeight=cv.height;\n$pat_fruits=30;\n$Keys=new Keys;\n$MMLS={};\n$WaveTable=new WaveTable;\nwhile (true) {\n    ti=new Date().getTime();\n    thg.steps();\n    $Keys.update();\n    $screenWidth=$Screen.width;\n    $screenHeight=$Screen.height;\n    $Sprites.draw($Screen.buf[0]);\n    $Screen.draw();\n    $Sprites.checkHit();\n    wt=33-(new Date().getTime()-ti);\n    if (wt<0) wt=0;\n    waitFor(Tonyu.timeout(wt));\n}",
    "Sprites.tonyu": "native Tonyu;\n\\new() {\n    sprites=[];\n    imageList=[];\n    hitWatchers=[];\n    isDrawGrid=Tonyu.noviceMode;\n}\nfunction add(s) {\n    if (s.__addedToSprites) return;\n    sprites.push(s);\n    s.__addedToSprites=this;\n    return s;\n}\nfunction remove(s) {\n    sprites.splice(sprites.indexOf(s),1);\n    delete s.__addedToSprites;\n}\nfunction clear() {sprites.splice(0,sprites.length);}\nfunction draw(cv) {\n    var ctx=cv.getContext(\"2d\");\n    ctx.fillStyle=$Screen.color;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    sprites.forEach(\\(sprite) {\n        sprite.draw(ctx);\n    });\n}\nfunction checkHit() {\n    hitWatchers.forEach(function (w) {\n        sprites.forEach(function (a) {\n                //console.log(\"a:\",  a.owner);\n            var a_owner=a;//a.owner|| a;\n            if (! (a_owner instanceof w.A)) return;\n            sprites.forEach(function (b) {\n                var b_owner=b;//b.owner|| b;\n                if (a===b) return;\n                if (! (b_owner instanceof w.B)) return;\n                //console.log(\"b:\",  b.owner);\n                if (a.crashTo1(b)) {\n                    //console.log(\"hit\", a.owner, b.owner);\n                    w.h(a_owner,b_owner);\n                }\n            });\n        });\n    });\n}\nfunction watchHit(typeA, typeB, onHit) {\n    var p={A: typeA, B:typeB, h:onHit};\n    //console.log(p);\n    hitWatchers.push(p);\n}\nfunction drawGrid(c) {\n    var ctx=c.getContext(\"2d\");\n    ctx.textBaseline=\"top\";\n    ctx.save();\n    ctx.strokeStyle=\"rgb(40,100,200)\";\n    for (var i=0 ; i<c.width ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(i,0);\n        ctx.lineTo(i,c.height);\n        ctx.closePath();\n        ctx.stroke();\n    }\n\n    for (var i=0 ; i<c.height ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(0,i);\n        ctx.lineTo(c.width,i);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    ctx.fillStyle=\"white\";\n    ctx.font=\"15px monospaced\";\n    for (var i=100 ; i<c.width ; i+=100) {\n        ctx.fillText(i, i,0);\n    }\n    for (var i=100 ; i<c.height ; i+=100) {\n        ctx.fillText(i, 0,i);\n    }\n    ctx.restore();\n}\nfunction setImageList(il) {\n    imageList=il;\n}\nfunction getImageList() {\n    return imageList;\n}",
    "ScaledCanvas.tonyu": "native $;\n\n// canvas:phisical  buf: logical\n\\new (opt) {\n    extend(opt);\n    // canvas/ width,height\n    resize(width, height);\n    cw=canvas.width();\n    ch=canvas.height();\n    cctx=canvas[0].getContext(\"2d\");\n    this.color=\"rgb(20,80,180)\";\n}\n\\resize(width,height) {\n    this.width=width;\n    this.height=height;\n    buf=$(\"<canvas>\").attr{width,height};\n    ctx=buf[0].getContext(\"2d\");  \n}\n\\draw() {\n    cw=canvas.width();\n    ch=canvas.height();\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    cctx.clearRect(0,0,cw,ch);\n    cctx.drawImage(buf[0],\n    0,0,width, height, \n    0,0,calcw, calch );\n}\n\\canvas2buf(point) {\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    return {x: point.x/calcw*width, y: point.y/calch*height};\n}\n\\setBGColor(color){\n    this.color=color;\n}",
    "Keys.tonyu": "extends TObject;\nnative String;\nnative $;\nnative document;\n//\\new () {this.main();}\nstats={};\ncodes={\n    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\n    shift:16, ctrl:17, alt:18, mouseleft: 1\n};\nfor (var i=65 ; i<65+26; i++) {\n    codes[String.fromCharCode(i).toLowerCase()]=i;\n}\nfor (var i=48 ; i<58; i++) {\n    codes[String.fromCharCode(i)]=i;\n}\nif (!$.data(document,\"key_event\")) {\n    $.data(document,\"key_event\",true);\n    $(document).keydown \\(e) {$Keys.keydown(e);};\n    $(document).keyup \\(e) {$Keys.keyup(e);};\n    $(document).mousedown \\(e) {\n        $Keys.keydown{keyCode:1};\n    };\n    $(document).mouseup \\(e) {\n        $Keys.keyup{keyCode:1};\n    };\n}\nfunction getkey(code) {\n    if (typeof code==\"string\") {\n        code=codes[code.toLowerCase()];\n    }\n    if (!code) return 0;\n    if (stats[code]==-1) return 0;\n    if (!stats[code]) stats[code]=0;\n    return stats[code];\n}\nfunction update() {\n    for (var i in stats) {\n        if (stats[i]>0) {stats[i]++;}\n        if (stats[i]==-1) stats[i]=1;\n    }\n}\n\\keydown(e) {\n    var s=stats[e.keyCode];\n    if (!s) {\n        stats[e.keyCode]=-1;\n    }\n}\n\\keyup(e) {\n    stats[e.keyCode]=0;\n}",
    "MML.tonyu": "extends TObject;\nnative T;\n\nmmlBuf=[];\n\\play(mmls) {\n    mmlBuf.push(mmls);\n    if (!isPlaying()) {\n        playNext();\n    }\n}\n\\playNext() {\n    //print(\"play!\", id(), bufferCount());\n    var mml=mmlBuf.shift();\n    if (!mml) {\n        m=null;\n        return;\n    }\n    mwav=$WaveTable.get(0,0).play();\n    m=T(\"mml\", {mml}, mwav);\n    m.on(\"ended\", playNext);\n    m.start();\n    $MMLS[id()]=this;\n}\n\\id() {\n    if (!_id) _id=rnd()+\"\";\n    return _id;\n}\n\\bufferCount() {\n    return mmlBuf.length;\n}\n\\isPlaying() {\n    return m;\n}\n\\stop() {\n    if (m) {\n        if (mwav) {\n            mwav.pause();\n            mwav.stop();\n        }\n        m.pause();\n        m.stop();\n        m=null;\n        mmlBuf=[];\n        //print(\"stop!\", id(), bufferCount());\n        delete $MMLS[id()];\n    }\n}\n",
    "WaveTable.tonyu": "extends TObject;\nnative T;\n\nwav={};\nenv={};\n\\setWav(num, synth) {\n    wav[num]=synth;\n}\n\\setEnv(num, synth) {\n    env[num]=synth;\n}\n\\get(w,e) {\n    var synth=T(\"OscGen\") {osc:wav[w], env:env[e], mul:0.25};\n    return synth;\n}\n\\stop() {\n    /*for (var k,v in tbl) {\n        v.pause();\n        v.stop();\n    }*/\n}\n\nif (typeof T!==\"undefined\") {\n    //env=T(\"adsr\", {a:0,d:200,s:0.5,r:10});\n    env = T(\"env\",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\n    setEnv(0, env);\n    setWav(0, T(\"pulse\"));\n    //    synth=T(\"OscGen\") {wave:\"pulse\", env, mul:0.25};\n    //set(0,synth);    \n}\n",
    "TObject.tonyu": "\\new () {this.main();}"
  }
}
    );
}
requirejs.setName('fs/ROMd');
if (!localStorage.norom) {
    FS.mountROM(
{
  "base": "/Tonyu/doc/",
  "data": {
    "": "{\"novice/\":{\"lastUpdate\":1393935607129},\"index.txt\":{\"lastUpdate\":1392869454452},\"tonyu2/\":{\"lastUpdate\":1393999485311}}",
    "novice/": "{\"true.txt\":1387515762325,\"left.txt\":1387515762370,\"sleep.txt\":1387515762327,\"udlr.txt\":1387515762360,\"variable.txt\":1387515762334,\"while.txt\":1387515762342,\"variable3.txt\":1387515762345,\"xy.txt\":1387515762346,\"index.txt\":1387515762348,\"variable2.txt\":1387515762349,\"item.txt\":1387515762362,\"key.txt\":1387515762356,\"getkey.txt\":1387515762355,\"projectIndex.txt\":1387515762359,\"inc.txt\":1387515762326,\"firstRun.txt\":1387515762329,\"sprite.txt\":1387515762332,\"trouble1.txt\":1387515762330,\"dec.txt\":1387515762339,\"param.txt\":1387515762365,\"newFile.txt\":1387515762351,\"say.txt\":1387515762352,\"say2.txt\":1387515762368,\"new.txt\":1387515762364,\"toc.json\":{\"lastUpdate\":1393935607129},\"spriteMove.txt\":1387515762358,\"crash.txt\":1387515762367}",
    "novice/true.txt": "* ずっと繰り返すようにしましょう\n\nさきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\n\nゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\n\n<<code Cat true\nx=50;\nwhile(true) {\n   go(x,100);sleep();\n   x+=10;\n}\n>>\n\n実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\n\nもう一度F9を押せば，また同じ動きを見ることができます．\n\nwhile文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．",
    "novice/left.txt": "*ゲームクリアの判定をしましょう\n\nすべてのリンゴを取ったら，猫が「ごちそうさま」といって，\nゲームクリアになるようにしましょう．\n\nそれには，「リンゴがあといくつ残っているか」を数える必要があります．\nそこで，リンゴの残り数を表す[[@cfrag left]]という変数を用意します．\nリンゴは2つあるので，2を覚えさせておきます．\n\n[[@plistref addl]]の[[@editadd]]の部分を追加しましょう．\n\n<<code Game addl\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nleft=2;[[@editadd]]\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n}\n>>\n\nさらに，リンゴを取った時に，[[@cfrag left]]の値を減らします．\n\n<<code\n変数名--; \n>>\nと書くと，変数の値を1減らすことができます．\n\n<<code Game(hitCatApple内部のみ) adddec\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;[[@editadd]]\n}\n>>\n\nさらに，[[@cfrag left]] が0になったときに，猫に「ごちそうさま」というメッセージを表示させます．\n\n<<code Game(hitCatApple内部のみ) addif\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;\n    if (left<=0) {[[@editadd]]\n        cat.say(\"ごちそうさま\");[[@editadd]]\n    }[[@editadd]]\n}\n>>\n",
    "novice/sleep.txt": "[[前へ>say]]\n\n*メッセージを順番に表示させてみましょう\n\nプログラムは上から順番に実行されます．\n\n今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\n[[@plistref nonsleep]]を入力します．\n\n@@@@nonsleep\ngo(50,100);\nsay(\"こんにちは\");\nsay(\"さようなら\");\n@@@@\n\n実行してみましょう.\n\n[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\n\nあれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\n\n実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 「さようなら」と表示する\n\nと実行したのです．しかし，コンピュータはとても高速に動作しているので\n「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\nと表示してしまっています．\n\nこれでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\n\n@@@@sleep\ngo(50,100);\nsay(\"こんにちは\");\nsleep(30); // 追加\nsay(\"さようなら\");\n@@@@\n\n実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\n\n[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\nつまり，プログラムの実行を少し待ってもらいます．\n後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\nフレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\n\nsleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 30フレーム（1秒ほど）待つ\n- 「さようなら」と表示する\n\n\n[[次へ>spriteMove]]",
    "novice/udlr.txt": "* 画像をキーボードで上下左右に動かしましょう\n\nさきほどのキーボードを使って右に動かす仕組みを使って，\n画像を上下左右に動かしましょう\n\n<<code Cat k\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   k=getkey(\"left\");\n   if (k>0) {\n      x-=10;\n   }\n   k=getkey(\"down\");\n   if (k>0) {\n      y+=10;\n   }\n   k=getkey(\"up\");\n   if (k>0) {\n      y-=10;\n   }\n   go(x,y);sleep();\n}\n>>",
    "novice/variable.txt": "* 画像をもっと長い時間動かしてみましょう\n\nさきほどの実行したプログラム([[@plistref 50_100]]は，\n横の位置を50 から始めて，100まで動かしました．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n@@@@\n\n今度はもっと遠くまで動かしてみましょう．\n例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\nsleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\n\n[[300まで動かすプログラム>50_300.png]]\n\n実行してみましょう．さっきよりも長く動きますね．\n",
    "novice/while.txt": "* 繰り返しを使ってプログラムを短くしましょう\n\nさきほどのプログラムをよく見てみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n最初の[[@cfrag x=50;]]を除いて，あとはずっと\n\n<<code \ngo(x,100);sleep();\nx+=10;\n>>\nが繰り返されていることがわかります．\n\nこのように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\nと指示することによって，プログラムをもっと短くすることができます．\n\n[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\n\n<<code Cat firstWhile\nx=50;\nwhile (x<=100) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n実行してみると，先ほど同じように動きます．\n\nここでは，「while文」という書き方を用いています．これは，次のような形式で使います\n\n<<code while文の書式\nwhile([[@arg 条件]]) {\n   [[@arg 動作]]\n}\n>>\n\n- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\n- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\n\n[[@plistref firstWhile]]の動作は，次のようになります．\n\n- [[@cfrag x=50;]] 変数xに50を覚えさせる\n- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\n-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\n-- [[@cfrag x+=10;]] xを10増やす\n\nさて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\n\n<<code Cat w300\nx=50;\nwhile (x<=300) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\nつまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\n\n以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\nかなり楽になりました．",
    "novice/variable3.txt": "*変数の値を変えてみましょう．\n\nさて，変数を使って，猫を右方向に動かしてみたいと思います．\n[[@plistref c5060]]のように変更しましょう\n（動いている様子が見えるように，[[@cfrag sleep();]]も忘れずにつけてください．）\n\n<<code Cat c5060\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\nこのプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\nつまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\n\nそして，xに60を覚えさせています．\n\nこのとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\n実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\n\nつまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\n[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\n",
    "novice/xy.txt": "*画像を縦や斜めにも動かしてみましょう\n\n今まで，猫の画像は横にしか動きませんでしたが，縦にも動かすことができます．\n\n<<code Cat y\ny=50;\nwhile (true) {\n  y+=10;\n  go(100,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が上から下に移動します．\n\nさらに，横と縦に同時に動かすこともできます\n\n<<code Cat xy\ny=50;\nx=100;\nwhile (true) {\n  y+=10;\n  x+=10;\n  go(x,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が左上から右下に斜めに移動します．\n\n[[@plistref xy]]のように，\n変数は同時に2つ使うこともできます．\n\n変数を区別するために，それぞれの変数には名前が必要になります．ここでは x と y \nという名前の変数を使っています．\n\n名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．",
    "novice/index.txt": "\n\n* プログラミングを始めましょう\n\n- まず，プロジェクトを作ります．\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n-- 半角文字で入力します\n-- ここでは  Hello と入力してみましょう\n\n",
    "novice/variable2.txt": "* 画像をもっと楽に動かしましょう\n\nしかし，前のプログラムは書くのが大変です．\nそこで，もう少し簡単に書くための工夫を行います．\n\nさきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\n// 以下略\n@@@@\n\n\nここで，「変数」という仕組みを紹介します．\n変数とは，文字通り「変わる数」のことです．\n\n今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\nそこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\n\nもったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\n\n@@@@\ngo(x,100);\n@@@@\n\nここで出てきた x が変数です．\n\n「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\n\nところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\n何が入っているのかは，最初に変数を使う前に決めないといけません．\n\n次のように[[@cfrag x=50;]]を追加してみましょう．\n\n@@@@firstVar\nx=50;\ngo(x,100);\n@@@@\n\nここで[[@blink 実行>#run]]してみましょう．\n[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\n\n[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\n\n[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\n\n@@@@\ngo(x,100);\n@@@@\nを実行すると\n@@@@\ngo(50,100);\n@@@@\nを実行したのと同じ結果が得られます．",
    "novice/item.txt": "* アイテムを配置しましょう\n\n猫を動かして，リンゴのアイテムを取るゲームを作ってみましょう．\n\nまず，アイテムのためのプログラムを作成します．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Apple と入力してみます\n\n<<code Apple\ngo(200,150);\n>>\n\n[[@blink 実行>#run]]メニューから，「Appleを実行」選びましょう．\nすると，今まで通り猫の画像が表示されます．\n\nこれを，リンゴの画像にしてみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\n[[@cfrag change]]という命令は，画像の絵柄を変える命令です．\n( ) 内に書くのは，絵柄の名前を指定します．[[@cfrag $pat_fruits]] は，\n標準に用意されているリンゴの画像データを指します．\n\n\n",
    "novice/key.txt": "* キーボードを使って絵を動かしましょう\n\nさきほどのプログラムでは，猫が勝手に外にでていってしまうので\nキーボードを使って好きな方向に動くようにしてみましょう\n\n<<code Cat getkey\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   go(x,y);sleep();\n}\n>>\n\n実行したら，まず，猫のいる画面をクリックしてください．\nそのあと，右矢印キーを押すと，猫が右に動きます．\n\nここでは，新しく2つの命令が出てきました．\n\nまず[[@cfrag getkey]]は，キーが押されているかを判定する命令です．\n[[@cfrag k=getkey(\"right\"); ]]は，右矢印キーが押されているかを判定し，判定結果を変数kに書き込みます．\n-もし右矢印キーが押されていなければ，変数kに0を書き込みます．\n-もし右矢印キーが押されていれば，変数kに0より大きい値を書き込みます（押されている時間が長いほど大きい値になります）．\n\nそして， [[@cfrag if]]という命令も登場しました．これは，次のような形式で使います．\n\n<<code\nif ([[@arg 条件]]) {\n  [[@arg 命令]]\n}\n>>\n\n-[[@arg 条件]]が成り立つ（正しい）ときに，  [[@arg 命令]]を実行します．\n-[[@arg 条件]]が成り立たない（正しくない）ときには，[[@arg 命令]]を実行しません．\n\nここでは，[[@arg 条件]]の部分に[[@cfrag k>0]]，[[@arg 命令]] の部分に[[@cfrag x+=10]] と書いてあります．つまり，\n\n-[[@cfrag k>0]]が成り立つ（正しい）ときに，  [[@cfrag x+=10;]]を実行します．\n-[[@cfrag k>0]]が成り立たない（正しくない）ときには，[[@cfrag x+=10;]]を実行しません．\n\n[[@cfrag k>0]]が成り立つのは，右キーが押されているときです．また，[[@cfrag x+=10;]]は，右に移動する命令ですので，次のように動作します\n\n-右キーが押されているならば，右に動きます．\n-右キーが押されていないならば，右に移動しません．\n",
    "novice/getkey.txt": "[[projectIndex]]",
    "novice/projectIndex.txt": "\n* 目次\n\n<<toc\n-[[新しくファイルを作りましょう>newFile]]\n-[[プログラムを実行しましょう>firstRun]]\n-[[値を変えてみましょう>sprite]]\n-[[画像を動かしてみましょう>spriteMove]]\n-[[画像をもっと長い時間動かしてみましょう>variable]]\n-[[画像をもっと楽に動かしましょう>variable2]]\n-[[変数の値を変えてみましょう>variable3]]\n-[[変数の値を増やしてみましょう>inc]]\n-[[繰り返しを使ってプログラムを短くしましょう>while]]\n-[[ずっと繰り返すようにしましょう>true]]\n-[[画像を左方向に動かしてみましょう>dec]]\n-[[画像を縦や斜めにも動かしてみましょう>xy]]\n-[[画像をキーボードで動かしましょう>key]]\n-[[画像をキーボードで上下左右に動かしましょう>udlr]]\n-[[アイテムを配置しましょう>item]]\n-[[複数のキャラクタを配置しましょう>new]]\n-[[複数のキャラクタを配置しましょう(2)>param]]\n-[[メッセージを表示しましょう>say2]]\n-[[キャラクタの衝突判定をしましょう>crash]]\n-[[ゲームクリアの判定をしましょう>left]]\n>>\n\n\n\n\n\n\n\n",
    "novice/inc.txt": "* 変数の値を増やしてみましょう\n\nさて，さきほどのプログラムをもう一度みてみましょう，\n\n<<code Cat 50to60\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\n[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\n[[@cfrag x=60;]]で，xに60覚えさせています．\n\nここでは，\n「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\nという書き方を紹介します．\n\n<<code Cat 50to60inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n[[@cfrag x+=10;]]という書き方が出てきました．これは\n「今覚えているxの値に，10を足す」という意味です．\n\n[[@plistref 50to60inc]]では，\n[[@cfrag x+=10;]]が実行される時点では，\nxは50を覚えていますので，\n[[@cfrag x+=10;]]が実行されると，50に10を足した値である\n60を新しくxに覚えさせます．結果として，\n[[@plistref 50to60inc]]は，\n[[@plistref 50to60]]と同じ結果になります．\n\nこれを利用して，xを100まで増やしながら，絵を動かしてみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>",
    "novice/firstRun.txt": "* プログラムを実行しましょう\n\n実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\n\n[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\n\n[[実行結果>firstRunRes.png]]\n\n[[うまくいかないときは>trouble1]]\n\n\n\n\n\n\n",
    "novice/sprite.txt": "* 値を変えてみましょう\n\nプログラムは，命令を実行します．\nここでは，go という命令を使って，画面に絵を表示させています．\n\n@@@@\ngo(50,100);\n@@@@\n\nここで， 50 や 100 などの数値を別の数値に変えてみましょう\n\n@@@@\ngo(150,100);\n@@@@\n\nもう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\n\n画面上の位置を決めるには，2つの数値が必要になります．\nそれは，「横の位置」と「縦の位置」です．\n-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\n-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\n\n横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\n\n(横の位置,縦の位置)\n\nという形式であらわします．\n\n例えば(50,100) という座標は，次のような位置をあらわします．\n-画面左端から50ピクセル離れた位置\n-画面上端から100ピクセル離れた位置\n\n[[座標>50_100.png]]\n\nいろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\n\n[[位置と座標>coords.png]]\n\nここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\n\n命令は，次のような形式で書きます．\n\n<<code\n命令の名前 ( 引数 , 引数 ...);\n>>\n引数（ひきすう）とは，命令を行うときに必要な情報をあらわします．\n\n例えば，[[@cfrag go(100,50);]] は [[@cfrag go]]という名前の命令を，\n100 と 50 という2つの引数（どこに移動するか，という情報）を\n使って行います．",
    "novice/trouble1.txt": "プログラムを書き間違えていると，エラーが表示されます．\n\n[[文法エラー>syntaxError.png]]\n\n[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\nセミコロンを追加して，再度実行してください．\n\n[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(goo ではなく go ）\n正しい命令になおしてください．\n\n[[命令の名前が違うエラー>runtimeError.png]]\n\nなお，命令の名前は大文字と小文字が区別されます．[[@cfrag go]]の代わりに[[@cfrag Go]]と書くことはできません．\n\n[[戻る>firstRun]]",
    "novice/dec.txt": "*画像を左方向にも動かしてみましょう\n\n今まで，猫の画像は左から右にしか動いていませんでしたが，右から左にも動かすことが\nできます．\n\n<<code Cat dec\nx=300;\nwhile(true) {\n   go(x,100);sleep();\n   x-=10;\n}\n>>\n\nここに出てきた[[@cfrag x-=10]]は，「xの値を10減らす」という命令です．\n",
    "novice/param.txt": "*複数のキャラクタを配置しましょう(2)\n\n猫とリンゴが表示できたので，\n今度はリンゴを2つ置いてみましょう．それには，Gameを次のようにすればよさそうですね．\n\n<<code Game g1\nnew Cat;\nnew Apple;\nnew Apple;\n>>\n\n実行すると... あれ？リンゴは1つしか表示されません．\n\nここで，Appleのプログラムを確認してみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\nAppleでは，リンゴを(200,150)の位置に移動させる，と書いてあります．\n\n実は，リンゴは2つできているのですが，どちらも(200,150)という\nピッタリ同じ位置に重なっているので\n１つにしか見えないのです．\n\nそれでは，2つのリンゴを違う位置に表示させましょう．\nそれには，リンゴの位置が(200,150)ではなく，リンゴごとに変わるようにすればよいでしょう．つまり，200や150という「数」が「変わる」ようにする... そうです「変数」を使えばよいのです．\n\nそこで，Appleの[[@cfrag 200]]と[[@cfrag 150]] を，それぞれ変数[[@cfrag x]]と[[@cfrag y]]に置き換えてみましょう．\n\n<<code Apple xy1\nchange($pat_fruits);\ngo(x,y);\n>>\n\n実行すると... あれ！今度はリンゴが1つも出てきません．\n\nなぜかというと，[[@plistref xy1]]の状態では，変数 x や y は何も値を覚えていないため，[[@cfrag go(x,y)]]と命令されても，どこに表示していいかわからないからです．\n\nかといって，[[@plistref xy1]]に[[@cfrag x=200]]や[[@cfrag y=150]]などの，変数に値を覚えさせる命令を書くわけにもいきません．なぜなら，xやy の値はリンゴごとに違っていなければならないからです．\n\nそこで，ここでは，Appleではなく，Gameのほうでリンゴに具体的なx や y の値を設定させます． \n\nまず，Gameを次のように書き換えます．まだ実行はしないでください．\n\n<<code Game\nnew Cat;\napple1=new Apple;\napple2=new Apple;\n>>\n\n[[@plistref g1]]と変わったのは，[[@cfrag new Apple]]の前に，\n[[@cfrag apple1=]]と[[@cfrag apple2=]]がついたところです．\n\n[[@cfrag apple1=new Apple;]]は，新しくできたリンゴのキャラクタに「apple1」という名前をつけています．同様に，2つ目のリンゴのキャラクタに「apple2」という名前をつけています．\n\n名前をつけることによって，それらのキャラクタに命令をしたり，キャラクタがもっている変数の値を変更させることができます．\n\n<<code Game a1a2\nnew Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n実行すると，今度はちゃんとリンゴが2つ表示されますね．\n\n[[@cfrag apple1.x=200;]] という命令は，その1行上で新しく作ったリンゴのキャラクタ，つまりapple1 がもっている x という変数に 200 を覚えさせています．\n\n今，「キャラクタがもっている変数」という表現をしましたが，変数は名前が同じでも，キャラクタごとに違う値をもたせる（覚えさせる）ことができます．\n例えば，[[@plistref a1a2]]では，apple1 の もっている変数xの値は200ですが，apple2 がもっている変数x は300になっています．\n\n[[キャラクタごとに変数の値は異なる>apple1apple2.png]]\n\n\n\n",
    "novice/newFile.txt": "* 新しくファイルを作りましょう\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\n-- ここでは Cat と入力してみます(後で猫の画像が登場します）\n\n* ファイルを編集しましょう\n\n- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\n- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\n\n<<code Cat first\ngo(50,100);\n>>",
    "novice/say.txt": "[[前へ>sprite]]\n\n* メッセージを表示させてみましょう．\n\nプログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\n\n@@@@\ngo(50,100);\nsay(\"こんにちは!!\");\n@@@@\n\n注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\n\n[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\n\n[[次へ>sleep]]",
    "novice/say2.txt": "* メッセージを表示しましょう．\n\nゲームスタートしたときに，\n猫に[[@figref itadaki.png]]のようなメッセージを表示させてみましょう．\n\n[[メッセージの表示>itadaki.png]]\n\n\nそれにはまず，猫に名前をつける必要があります．\nなんでもかまいませんが，白いので[[@cfrag siro]] と名前をつけましょう．\n\n<<code Game\nsiro=new Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\nそして，[[@cfrag siro]]にメッセージを表示させます．\nメッセージを表示するには，[[@cfrag say]]という命令を使います．\n\n<<code Game itadaki\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n\n命令を実行するとき，実行する相手のキャラクタを指定するときは次の形式を使います．\n\n<<code\nキャラクタ名 . 命令名 ( 引数  )\n>>\n\n[[@plistref itadaki]] では，キャラクタ名は [[@cfrag siro]]，\n 命令名は[[@cfrag say]] です．つまり[[@cfrag siro]] に対して，\n[[@cfrag say]]という命令を行わせています．\n\nそして，引数の部分に，表示させるメッセージである[[@cfrag \"いただきまーす\"]] という文字列（文字が並んだもの）を指定しています．文字列は [[@cfrag \"]]で囲む点に注意してください．",
    "novice/new.txt": "*複数のキャラクタを配置しましょう\n\nさて，Appleを実行すると，リンゴが表示されますが，猫は出てこなくなってしまいました．ゲームには，猫とリンゴが同時に出てくる必要があります．\n\nそこで「リンゴと猫を置く」ための別のプログラムを作りましょう．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Game と入力してみます\n\nGameに，次のように入力してみましょう．\n\n<<code Game\nnew Cat;\nnew Apple;\n>>\n\n[[@blink 実行>#run]]メニューから，「Gameを実行」選びましょう．\nすると，猫とリンゴが同じ画面に表示されます．\n\nここで出てきた[[@cfrag new]] という命令は，\n新しくキャラクタを作るための命令です．\n\n次のように，[[@arg プログラム名]]を指定します．\n新しく出現したキャラクタは，\n指定された[[@arg プログラム名]]のプログラムを実行します．\n\n<<code\nnew [[@arg プログラム名]];\n>>\n\nなお，今後はしばらく Game を実行していきますので「実行する」と書いてあったら，\n[[@blink 実行>#run]]メニューから，「Gameを実行」選ぶようにしてください．\nF9キーを押すと，前回実行したプログラムと同じプログラムが実行されるので便利です．\n",
    "novice/toc.json": "[\"projectIndex\",\"newFile\",\"firstRun\",\"sprite\",\"spriteMove\",\"variable\",\"variable2\",\"variable3\",\"inc\",\"while\",\"true\",\"dec\",\"xy\",\"key\",\"udlr\",\"item\",\"new\",\"param\",\"say2\",\"crash\",\"left\"]",
    "novice/spriteMove.txt": "* 画像を動かしてみましょう\n\ngo 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\nこれを利用して，画像を少しずつ違う位置に動かしていき，\n猫が動くアニメーションを作ってみましょう．\n\n<<code Cat now\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\ngo(90,100);\ngo(100,100);\n>>\n\n実行すると... 猫が動いていないようですね．いきなり(100,100)の\n位置に表示されたようです．\n\n[[[[@plistref now]]の実行結果>noWaitCat.png]]\n\n実は，猫はちゃんと(50,100)の位置から始まって，(60,100)  (70,100) \n(80,100)  (90,100) と少しずつ動きながら\n(100,100)の位置まで移動したのですが，\nコンピュータは，とても素早く命令を実行するため，\n途中の動作が見えなかったのです．\n\nそこで，命令の実行を少しゆっくりに実行してもらいます．\n[[@cfrag sleep]] という命令を使うと，途中で実行を待つことができます．\n\n<<code Cat now2\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n>>\n\n今度は，猫が少しずつ動く様子が見えると思います．\n\n\n\n\n\n",
    "novice/crash.txt": "*キャラクタの衝突判定をしましょう\n\n次に，猫(Cat)がリンゴ(Apple)にぶつかると，リンゴを取る（リンゴが消える）ようにしてみましょう．\n\n[[@cfrag watchHit]] という命令を使うと，２つのキャラクタがぶつかったときに，\n特定の命令を実行することができます．\n\n[[@plistref addw]]の[[@editadd]]で示した部分を追加してみましょう．\n（まだプログラムは実行しないでください）\n\n<<code Game addw\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);[[@editadd]]\n>>\n\n[[@cfrag watchHit(Cat, Apple, hitCatApple)]]と書くと，\n猫（[[@cfrag Cat]]）とリンゴ（[[@cfrag Apple]]）がぶつかったときに，\n[[@cfrag hitCatApple]] という命令が実行されるようになります．\n\nところで，[[@cfrag hitCatApple]] ってどんな命令でしょうか？\n実はこの時点ではそんな命令はありません．この命令は自分で作ってあげる必要があります．\nさらに[[@plistref addf]]のように追加してみましょう．\n\n<<code Game addf\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nfunction hitCatApple(cat,apple) {[[@editadd]]\n    apple.hide();[[@editadd]]\n}[[@editadd]]\n>>\n\n実行すると，猫とリンゴが触れたときにリンゴが消えるようになります．\n\n最後に書いた[[@cfrag function]] で始まる部分は，\n自分で新しい命令を作るための書き方です．\nここでは，[[@cfrag hitCatApple]]という名前の命令を作っています．\nその後ろにある[[@cfrag (cat, apple)]] という部分は，この命令を実行するに\nあたって，必要な情報を受け取るためのものです．\nここでは，「どのキャラクタと，どのキャラクタがぶつかったか」という情報を受け取り，\nそれぞれに，[[@cfrag cat]] と [[@cfrag apple]] という名前をつけています．\n\n[[@cfrag cat]] は，もちろん最初に作った猫ですが，\nもうひとつの[[@cfrag apple]] は，そのとき猫に触れていたリンゴです．\nそれは[[@cfrag apple1]] かもしれないし，\n[[@cfrag apple2]] かもしれませんが，とにかく猫が触れていたほうのリンゴに，[[@cfrag apple]]という名前がつけられます．\n\nそして，その[[@cfrag apple]] に， [[@cfrag apple.hide()]] という命令を行っています．これは，そのキャラクタ（ここでは[[@cfrag apple]]）を隠す（画面から見えなくする）命令です．\n\n\n\n\n",
    "index.txt": "* サンプルを見る\n\n左の[[@blink プロジェクト一覧>#prjItemList]]からサンプルを選びます\n\n* 新しくプロジェクトを作る\n\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n\n* リファレンス\n\n-[[リファレンス>tonyu2/index]]\n",
    "tonyu2/": "{\"index.txt\":{\"lastUpdate\":1392869584327},\"lang.txt\":{\"lastUpdate\":1392707927268},\"fs.txt\":{\"lastUpdate\":1392103001573},\"sugar.txt\":{\"lastUpdate\":1392110815047},\"waitmode.txt\":{\"lastUpdate\":1392345488813},\"api.txt\":{\"lastUpdate\":1392973009007},\"Actor.txt\":{\"lastUpdate\":1392214830161},\"BaseActor.txt\":{\"lastUpdate\":1393921732818},\"update.txt\":{\"lastUpdate\":1392358195081},\"classDef.txt\":{\"lastUpdate\":1392345631228},\"frame.txt\":{\"lastUpdate\":1392358186176},\"ScaledCanvas.txt\":{\"lastUpdate\":1393470634464},\"getkey.txt\":{\"lastUpdate\":1393470926862},\"crashTo.txt\":{\"lastUpdate\":1392700986255},\"allCrash.txt\":{\"lastUpdate\":1392689586893},\"getCrashRect.txt\":{\"lastUpdate\":1392701116311},\"crashTo1.txt\":{\"lastUpdate\":1392700995145},\"die.txt\":{\"lastUpdate\":1392693366942},\"isDead.txt\":{\"lastUpdate\":1392693474100},\"hide.txt\":{\"lastUpdate\":1392700848961},\"show.txt\":{\"lastUpdate\":1392700902957},\"rnd.txt\":{\"lastUpdate\":1392701292615},\"draw.txt\":{\"lastUpdate\":1392701592956},\"extend.txt\":{\"lastUpdate\":1392701825602},\"print.txt\":{\"lastUpdate\":1392703099009},\"console.txt\":{\"lastUpdate\":1392703197227},\"asyncResult.txt\":{\"lastUpdate\":1392704305168},\"waitFor.txt\":{\"lastUpdate\":1392704348467},\"forin.txt\":{\"lastUpdate\":1392704692777},\"super.txt\":{\"lastUpdate\":1392704906597},\"resize.txt\":{\"lastUpdate\":1392705695014},\"ide.txt\":{\"lastUpdate\":1392707777855},\"cpats.txt\":{\"lastUpdate\":1392706547246},\"options.txt\":{\"lastUpdate\":1392707707764},\"$mouseX/\":{\"lastUpdate\":1392972986031},\"$touches.txt\":{\"lastUpdate\":1392709858131},\"Boot.txt\":{\"lastUpdate\":1392869817146},\"$mouseX, $mouseY.txt\":{\"lastUpdate\":1392973016049},\"setBGColor.txt\":{\"lastUpdate\":1393470888545},\"play.txt\":{\"lastUpdate\":1393999485309},\"playSE.txt\":{\"lastUpdate\":1393921558094}}",
    "tonyu2/index.txt": "*Tonyu2 リファレンス\n\n-[[言語仕様>lang]]\n-[[標準ライブラリ>api]]\n-[[開発環境>ide]]\n-[[ファイルシステム>fs]]\n\n-[[トップへ>../index]]\n",
    "tonyu2/lang.txt": "[[index]]\n\n*言語仕様\n\n-Tonyu2は，そのプログラムをJavaScriptに変換してから実行します．\n-Tonyu2で用いられる値やオブジェクトはJavaScriptの値やオブジェクトそのものです．そのため，Tonyu2からJavaScriptのオブジェクトを操作したり，JavaScriptからTonyu2のオブジェクトを操作したりできます．\n\nTonyu2 の言語仕様は，基本的にはJavaScriptの言語仕様に準じますが，JavaScriptとは次のような違いがあります．\n\n-[[ファイル>fs]]全体が１つの[[クラス定義>classDef]]になります．\n-親クラスのメソッド・コンストラクタ呼び出しは[[super]]を用います\n-「待機可能モード」「待機不能モード」という2つの[[動作モード>waitmode]]があります．\n-[[拡張構文>sugar]]があります\n-[[for (.. in ..)>forin]]の挙動が違います\n\n\n\n\n",
    "tonyu2/fs.txt": "[[index]]\n*ファイルシステム\n\n-Tonyu2 は，WebブラウザのJavascriptだけで動作するように設計されています．\n-プログラムなどを保存・読み出しするために，サーバとの通信は行わず，localStorage を用いています．\n-localStorageでは，単純なキー/値の格納・読み出しの仕組みだけが提供されていますが，Tonyu2は，localStorage上でディレクトリ構造を再現するためのライブラリ(fs.js)を搭載しています．\n--詳細は[[fs.js>https://github.com/hoge1e3/Tonyu2/blob/master/js/fs/fs.js]] のプログラムを参照してください．\n--ファイルを直接操作するための[[シェル>sh]]も用意されています．\n\n*注意点\n\nプログラムがlocalStorageに保存されるため，他のPCや他のWebブラウザではプログラムは共有されません．\n\n今のところ，他のWebブラウザ等とプログラムを送受信するには，[[jsdo.itへのインポート・エクスポート>jsdoit]]を用いてください．\n\n",
    "tonyu2/sugar.txt": "[[lang]]\n\n*拡張構文\n\n** \\ による関数・メソッド定義\n\n-[[@cfrag function]] と書く代わりに [[@cfrag \\]] と書くことができます．[[@plistref fun]]と[[@plistref back]]は等価です．\n\n<<code functionでメソッド定義 fun\nfunction a(x,y) {\n   return x+y;\n}\n>>\n<<code \\でメソッド定義 back\n\\a(x,y) {\n   return x+y;\n}\n>>\n\n-無名関数にも使えます．\n\n<<code\nonComplete=\\(evt) { alert(\"Complete\") };\n>>\n\n**引数渡しにおける()の省略\n\n関数・メソッド呼び出し時に，オブジェクトリテラルで書かれた引数１つだけを渡す場合，()を省略できます．\n\n<<code\n$(\"a\").attr{target:\"_top\"};\n// $(\"a\").attr({target:\"_top\"}); と等価\n>>\n\n**オブジェクトリテラルの省略記法\n\n[[@cfrag {x:x}]]のように，属性名と値が同じ場合，[[@cfrag {x}]]と記述できます．\n\n\n",
    "tonyu2/waitmode.txt": "[[lang]]\n\n*動作モード\n\nTonyu2には「待機可能モード」と「待機不能モード」という2つの動作モードがあります．\n\n** 待機可能モード\n\n待機可能モードで動作している間は，[[update]]などの，途中で動作を中断する（つまり，プログラムの動作を待機状態にする）メソッド（これを「待機系メソッド」と呼びます）が呼ばれたときに，一旦処理を中断し，描画や入力状態の更新などの処理を行います．\n\n待機可能モードで動作する条件として，次のものがあります\n\n-[[Actor]]クラスを継承したオブジェクトでは，mainメソッドは待機可能モードで動作します．\n--ただし，mainメソッドから呼び出される他のメソッドが待機可能モードで動作しない場合もあります．次の条件を参照してください．\n-待機可能モードで動作している間に，次のいずれかの形式をもつ文から呼び出されるメソッドは，待機可能モードで動作します．ただし，メソッド名はそのオブジェクト自身がもつメソッドを指しており，それが待機不能メソッド（後述）でない場合に限ります．\n-- [[@cfrag メソッド名(引数...); ]]\n-- [[@cfrag 戻り値=メソッド名(引数...); ]]\n\n**待機不能モード\n\n上で述べた条件にあてはまらない場合，「待機不能モード」で動作します．\n待機不能モードでは，待機系メソッドが呼ばれても，途中で動作を中断しません．例えば，待機不能モード中にupdateメソッドが呼ばれても，何も動作を行いません．\n\n**待機不能メソッド\n\n待機可能モードでは，待機不能モードより動作が遅くなることがあります．そこで，待機系メソッドが呼び出されないことが明らかな場合，必ず待機不能モードで動作したほうが効率がよくなります．このようなメソッドを「待機不能メソッド」と呼びます．\n\n待機不能メソッドは，メソッドの定義の先頭に[[@cfrag nowait]]キーワードを追加して定義します．\n\n<<code\nnowait \\myNoWaitMethod(arg1,arg2) {\n\n}\n>>\n\n**例\n\n<<code\n\nmethod1();        //待機可能モードで動作\na=method1();      //待機可能モードで動作\na=10+method1();   //待機不能モードで動作\nother.method1();  //待機不能モードで動作\nmethod2();        //待機不能モードで動作\n\n\\method1() {\n   for (i=0 ; i<20 ; i++) {\n      x++;\n      update(); // 待機可能モードなら，ここで待機する\n   }\n   return x;\n}\nnowait \\method2() {\n   for (i=0 ; i<20 ; i++) {\n      x--;\n      update(); // ここでは待機しない\n   }\n}\n>>\n\n\n\n\n\n\n",
    "tonyu2/api.txt": "[[index]]\n\n*標準クラス\n\nTonyu2で最初から使えるクラス群です．[[ファイルシステム>fs]]上の/Tonyu/Kernel/ で定義されています．\n\n-[[Actor]]\n-[[BaseActor]]\n-[[Boot]]\n-[[Sprites]]\n-[[ScaledCanvas]]\n-[[NoviceActor]]\n\n*グローバル変数\n\n-[[$Screen>ScaledCanvas]]\n-[[$mouseX, $mouseY]]\n-[[$touches]]\n",
    "tonyu2/Actor.txt": "[[api]]\n\n*Actorクラス\n\n画面に表示されるオブジェクトの基本クラスです．\n\n継承：  [[BaseActor]]\n\n※ほとんどのメソッドはBaseActorに宣言されています．\n\n**コンストラクタ\n\n<<code\n\\new(x,y,p)\n>>\n\n引数の仕様は[[BaseActor]]の処理と同じです．\nBaseActorと同様，mainメソッドの動作を行うよう[[スレッド>thread]]を作成します．\n\nまた，コンストラクタが呼ばれた時点で自分自身を画面に表示します．\n\n**initSprite\n\n自分自身を画面に表示します．\nコンストラクタから自動的に呼ばれるので，通常は呼び出す必要はありません．\n\n",
    "tonyu2/BaseActor.txt": "[[api]]\n\n*BaseActor\n\n画面に表示されるオブジェクトの基本クラスです．実際には[[Actor]]を継承してクラスを作成してください．\n\n* コンストラクタ(1)\n\n<<code\n\\new(params)\n>>\n\nparamsにはオブジェクトを指定します．paramsの値をフィールドに書き込みます\n\n例： \n<<code\n// MyActorはBaseActorの子クラスとする\na=new MyActor{x:50,y:30, power:20, hp:50};\n// a.x=50  a.y=30 a.power=20  a.hp=50 となる\n>>\n\n* コンストラクタ(2)\n\n<<code\n\\new(x,y,p)\n>>\n\nx,y,pの値をフィールドに書き込みます\n\n* フィールド\n\n-x : オブジェクトのx座標をあらわします\n-y : オブジェクトのy座標をあらわします\n-p : 表示する[[キャラクタパターン]]の番号をあらわします \n-text : textに値がセットされると，文字を表示します（キャラクタパターンは表示されなくなります）\n--size : 文字の大きさをあらわします\n--fillStyle : 文字の色などをあらわします(JavascriptのCanvasにおけるfillStyleと同じ書式です）\n--align:  \"center\" \"left\" \"right\"のいずれかを指定します．xの値であらわされる横位置がそれぞれ文字の中央，左端，右端になるように表示します．\n\n* メソッド\n\n-[[update]]\n-[[getkey]]\n-[[crashTo]]\n-[[crashTo1]]\n-[[allCrash]]\n-[[getCrashRect]]\n-[[die]]\n-[[isDead]] \n-[[hide]]\n-[[show]]\n-[[rnd]]\n-[[draw]]\n-[[extend]]\n-[[print]]\n-[[asyncResult]]\n-[[waitFor]]\n-[[play]]\n-[[playSE]]\n-[[currentThreadGroup]]\n-[[detectShape]]\n-[[hitTo]]\n-[[watchHit]]\n\n",
    "tonyu2/update.txt": "[[BaseActor]]\n\n*updateメソッド\n\n現在の処理を中断し，描画などの処理を行います．\n\n詳しい処理内容については[[フレーム>frame]]を参照してください．\n\n*書式\n\n<<code\nupdate();\n>>\n\n*その他\n\nこのメソッドは待機系メソッドです．待機不能モードでは何も動作を行いません．（詳細は[[動作モード>waitmode]]を参照してください）",
    "tonyu2/classDef.txt": "[[lang]]\n\n*クラス定義\n\nTonyu2では，1つの[[ファイル>fs]]に1つのクラスを定義します．\n\n-ファイル名は <<クラス名>>.tonyu という形式になります．\n-- 例えば，Hello.tonyu という名前のファイルは，Hello という名前のクラスを定義します．\n-クラスを定義するための構文（例えば，Javaの[[@cfrag class クラス名 {...  }]]など）はありません．\n- ファイルには，次のいずれかを記述します．\n--継承宣言\n--native宣言\n--mainメソッドの処理内容\n--非mainメソッドの定義\n- 定義された(Tonyu2の)クラスは，Javascriptのいわゆる「クラス」(function+prototypeによるメソッド定義）として機能します．\n\n**継承宣言\n\nこのクラスの親クラスを設定します．ファイルの先頭に次のように宣言します\n\n<<code 継承宣言の書式\nextends 親クラス名;\n>>\n\n-継承宣言を省略すると，[[プロジェクト設定>options]]によって設定されている親クラスを自動的に継承します．\n-親クラス名 に [[@cfrag null]]を設定すると，親クラスがないクラスになります．\n\n**native宣言\n\nnative宣言は，Tonyu2のプログラムからJavascriptのネイティブオブジェクトにアクセスするために用います．ファイル中で次のように宣言します．\n\n<<code native宣言の書式\nnative 変数名;\n>>\n\n- 指定された変数名を，このファイル中ではJavascriptのトップレベルスコープ（一般的にはwindowオブジェクト）に定義されている変数の値として扱います．\n- 親クラスに書いてあるnative宣言は子クラスには適用されません．必要に応じて子クラスにも同じnative宣言を書く必要があります．\n\n**mainメソッドの処理内容\n\nmainメソッドは，mainという名前をもつメソッドです．[[Actor]]クラスなどでは，オブジェクトが出現してから停止するまでの動作を記述するのに用いられます．\n\nファイルのトップレベル（メソッド定義に囲まれていない部分）に書かれた文はmainメソッドの内容として定義されます．\n\nmainメソッドは引数を受け取ることはできません．\n\n**非mainメソッドの定義\n\n名前がmainでないメソッドは非mainメソッドです．\n\nファイルのトップレベルにおいて次の形式で定義します．\n\n<<code メソッド定義 methodef\nfunction メソッド名(引数リスト) {\n   処理内容\n}\n>>\n※function の代わりに \\ が使用可能です（[[拡張構文>sugar]]参照)\n\n*変数の種類\n\n-引数\n--１つのメソッドに渡される値です．メソッド宣言の引数リストに記述されます．１回のメソッド呼び出しが終わると破棄されます．\n-ローカル変数\n--メソッド宣言の処理中でvar で宣言されます．１回のメソッド呼び出しが終わると破棄されます．\n-グローバル変数\n--名前が$で始まる変数はグローバル変数です．すべてのTonyu2オブジェクトから直接参照できます．\n--Javascriptからは[[@cfrag Tonyu.globals.グローバル変数名]]で参照できます．\n-クラス変数\n--現在のプロジェクトおよび[[標準ライブラリ>api]]で定義されているクラス名と同じ名前の変数はクラス変数です．そのクラスをあらわす関数オブジェクトを参照します．\n--Javascriptからは[[@cfrag Tonyu.classes.クラス変数名]]で参照できます．\n-native変数\n--native宣言によって宣言された名前の変数です．Javascriptのトップレベルスコープにおける同名の変数を参照します．\n-フィールド\n--そのクラスのオブジェクトがもつ値です．上のどれにもあてはまらない変数はフィールドとして解釈されます．\n--Javascriptではいわゆる[[@cfrag this.x]]という形式で参照されるものです．\n\n*例\n\n<<code MyClass.tonyu example\nextends Actor;\nnative alert;\n// main関数\nx=3;\nrate=5;\ny=mult(x);\nalert(y); // 15\n// main関数終わり\n\\mult(a) {\n  var res=a*rate;\n  return res;\n}\n>>\n\n-クラス名はMyClass\n-親クラスはActor\n-Javascriptの [[@cfrag alert]] 関数を利用する\n-[[@cfrag x,rate,y]] はフィールド\n-multメソッドを定義\n-- [[@cfrag a]]は引数，[[@cfrag res]]はローカル変数，[[@cfrag rate]]はフィールド",
    "tonyu2/frame.txt": "[[update]]\n\n*フレーム\n\nフレームとは，ゲームの画面1枚が表示されるまでの動作を指します．\n1つのフレーム（1フレーム）の動作は次の構成されます．\n\n-各オブジェクトの移動\n-各オブジェクトの表示\n\nゲーム全体は，フレームが1秒間に数十回(30～60程度．この数値をfpsと呼びます）動作して進行していきます．\n\nTonyu2では，各オブジェクトに[[スレッド>thread]]が割り当てられており，1フレームごとにスレッドが少しずつ実行されていきます．\n\nスレッドの実行中に[[update]]メソッドが呼ばれるとそのフレームでの処理を終了させ，他のオブジェクトのスレッドに動作を譲ります．\n\n",
    "tonyu2/ScaledCanvas.txt": "[[api]]\n\n*ScaledCanvasクラス\n\nゲーム画面をあらわすオブジェクトです．[[Boot]]クラスで[[@cfrag $Screen]] というオブジェクトで初期化されます．\n\n**メソッド\n\n-[[resize]]\n-[[setBGColor]]\n\n ",
    "tonyu2/getkey.txt": "[[BaseActor]]\n\n*getkeyメソッド\n\nキーの押下状態を取得します．\n\n**書式\n\n<<code\ngetkey(code);\n>>\n\n-code に調べたいキーのキーコード（数値）またはキーの名前（文字列）を指定します．\n-キーの状態に応じて次の数値を返します\n-- 0: 押されていない\n-- 1: 押されたばかり\n-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n\n* キーの名前とキーコード一覧\n\n<<code\nleft: 37 , up:38 , right: 39, down:40, \nspace:32, enter:13, shift:16, ctrl:17, alt:18, \nA-Z: 65-90,  0-9: 48-57,  mouseleft: 1\n>>\n\n",
    "tonyu2/crashTo.txt": "[[BaseActor]]\n\n*crashToメソッド\n\n他のオブジェクトと衝突しているかを判定します．\n\n**書式1\n\n<<code\ncrashTo(obj)\n>>\n\nこのオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\n\n*書式2\n\n<<code\ncrashTo(Class)\n>>\n\nこのオブジェクトが[[@arg Class]]で指定されるクラスのオブジェクトのうちどれかと衝突していれば，そのうちどれか1つのオブジェクトを返します．そうでなければ[[@cfrag null]]を返します\n\n*例\n\n<<code\n// $playerというオブジェクトにぶつかっていたら，$playerを消します\nif (crashTo($player)) {\n   $player.die();\n}\n>>\n\n*参考\n\n-[[crashTo1]]\n-[[allCrash]]\n-[[getCrashRect]]\n",
    "tonyu2/allCrash.txt": "[[BaseActor]]\n\n* allCrashメソッド\n\n指定されたクラスのオブジェクトのうち，自分と衝突しているすべてのオブジェクトを配列で返します．\n\n**書式\n<<code\nallCrash(Class)\n>>\n\n[[@arg Class]]で指定されたクラスのオブジェクトのうち，自分と衝突しているすべてのオブジェクトを配列で返します．\n\n\n*例\n\n<<code\n    // このオブジェクトがTargetクラスのオブジェクトとぶつかっていたら，\n    // そのオブジェクトを消す\n    for (t in allCrash(Target)) {\n        t.die();\n    }\n>>\n",
    "tonyu2/getCrashRect.txt": "[[BaseActor]]\n\n*getCrashRect\n\n当たり判定に使う矩形領域を返します．[[crashTo]]，[[crashTo1]]，[[allCrash]]で用いられます\n\n**書式\n\n<<code\ngetCrashRect()\n>>\n\nこのオブジェクトの当たり判定に使う矩形領域を返します．\n\n戻り値を[[@arg r]]とすると：\n-([[@arg r]].x,[[@arg r]].y)が矩形領域の中心位置です（左上ではありません）\n-[[@arg r]].widthと[[@arg r]].heightが，矩形領域の幅と高さです．\n\n**オーバライド\n\nデフォルトのgetCrashRectは，画像の大きさを基準に当たり判定を計算しますが，\ngetCrashRectをオーバーライドすると，当たり判定の大きさを変更できます．\n\n[[@plistref chg]]の例では，当たり判定の大きさを5*5に設定しています．\n\n<<code ChangeCrashRect.tonyu chg\n\\getCrashRect() {\n   return {x,y,width:5, height:5};\n}\n>>\n",
    "tonyu2/crashTo1.txt": "[[BaseActor]]\n\n*crashTo1メソッド\n\n[[crashTo]]メソッドと同様，衝突判定を行います．引数にはオブジェクトのみを指定ことができ，クラスは指定できません．引数の種類判定がない分，[[crashTo]]より若干処理速度が速くなります\n\n**書式\n\n<<code\ncrashTo1(obj)\n>>\n\nこのオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\n",
    "tonyu2/die.txt": "[[BaseActor]]\n\n*dieメソッド\n\nオブジェクトを画面から消去し，処理を中断します．\n\n**書式\n\n<<code\ndie();\n>>\n",
    "tonyu2/isDead.txt": "[[BaseActor]]\n\n*isDeadメソッド\n\nオブジェクトに[[die]]メソッドが呼ばれたかどうかを返します\n\n<<code\nb=isDead();\n>>\n\nこのオブジェクトにdieメソッドが呼ばれていれば，[[@arg b]]に[[@cfrag true]]を，そうでなければ[[@cfrag false]]を返します．\n\n",
    "tonyu2/hide.txt": "[[BaseActor]]\n\n*hideメソッド\n\nオブジェクトを非表示にします．\n[[die]]メソッドと異なり，動作は続きます．再び表示するときは[[show]]メソッドを用います．\n\n**書式\n\n<<code\nhide();\n>>\n\n",
    "tonyu2/show.txt": "[[BaseActor]]\n\n*showメソッド\n\nオブジェクトを表示します．\n\n*書式\n\n<<code\nshow(x,y,p)\n>>\n\n\n",
    "tonyu2/rnd.txt": "[[BaseActor]]\n\n*rndメソッド\n\n乱数を返します\n\n*書式1\n\n<<code\nrnd()\n>>\n\n0以上1未満の実数乱数を返します\n\n*書式2\n\n<<code\nrnd(n)\n>>\n\n0以上n未満の整数乱数を返します\n\n*ヒント\n\na以上b未満の実数乱数を返すには，次の式を用います．\n\n<<code\nrnd()*(b-a)+a\n>>\n\na以上b未満の整数乱数を返すには，次の式を用います．\n\n<<code\nrnd(b-a)+a\n>>\n\n",
    "tonyu2/draw.txt": "[[BaseActor]]\n\n*drawメソッド\n\nオブジェクトが描画される時に自動的に呼び出されます．ユーザのプログラムからは通常呼び出す必要はありません．\n\n*書式\n\n<<code\ndraw(ctx)\n>>\n\nctxに，描画先のcanvasオブジェクトのコンテキスト(canvas.getContext(\"2d\")で取得)を渡します．\n\n*オーバーライド\n\ndrawメソッドをオーバーライドすると，オブジェクトの表示方法をカスタマイズできます．\n\n例\n<<code\n\\draw(ctx) {\n   // 赤い四角形を表示\n   ctx.fillStyle=\"red\";\n   ctx.fillRect(x,y,20,20);\n}\n>>\n\n\n",
    "tonyu2/extend.txt": "[[BaseActor]]\n\n*extendメソッド\n\nオブジェクトを受け取り，それらの属性値を書き込みます．\n\n**書式\n<<code\nextend(obj)\n>>\n[[@arg obj]]のもつ値をすべて自分自身に書き込みます．\n\n\n**例\n\n<<code\nextend{x:5, y:10, score:20};\n// x=5 y=10 score=20 になる\nprint (x);\nprint (y);\nprint (score);\n>>\n\n",
    "tonyu2/print.txt": "[[BaseActor]]\n\n*printメソッド\n\n[[コンソール>console]]に値を表示します．(JavaScriptのconsole.logと同じ)\n\n**書式\n\n<<code\nprint(value...);\n>>\nvalue（複数指定可）の値をコンソールに表示します．\n\n",
    "tonyu2/console.txt": "[[print]]\n\n*コンソール\n\nTonyu2のコンソールは，JavaScriptのコンソールと同じです．次のキーで表示できます．\n\n-Chrome/Firefox: Ctrl+Shift+J\n-IE: F12\n\n",
    "tonyu2/asyncResult.txt": "[[BaseActor]]\n\n*asyncResultメソッド\n\nAsyncResultオブジェクトを作成します\n\nAsyncResultオブジェクトは，ajaxなどの「非同期で実行を行い，結果をコールバック関数で受け取る」形式のメソッド（非同期メソッド）を[[待機可能モード>waitmode]]で扱うためのオブジェクトです．\n\n**使い方\n\n※必ず待機可能モードで実行してください．\n\n-asyncResult()メソッドで，AsyncResultオブジェクトを作成します．これを[[@cfrag a]]とします．\n-非同期メソッドを呼び出します． このとき，[[@cfrag a.receiver]] をコールバック関数として渡します．\n-[[waitFor]]メソッドを呼び出します．非同期メソッドが結果を返すまで処理を待機します．\n-非同期メソッドの結果が[[@cfrag a[n]]]に返されます．[[@cfrag a[n]]]はコールバック関数に渡された第n引数（0が最初の引数）です．\n\n**使用例\n\n<<code\nnative $;\n//asyncResultオブジェクトを作成\na=asyncResult();\n//jqueryのgetメソッドを呼び出す．コールバック関数に a.receiverを指定\n$.get(\"http://tonyuedit.appspot.com/edit/\", a.receiver);\n//getメソッドが終わるまで待つ\nwaitFor(a);\n//結果がa[0]に返される\nprint(a[0]);\n>>\n",
    "tonyu2/waitFor.txt": "[[asyncResult]]\n\n*waitForメソッド\n\n使い方は[[asyncResult]]を参照してください．\n",
    "tonyu2/forin.txt": "[[lang]]\n\n* for(..in..)の動作\n\n[[@cfrag for (e in set)]] はJavaScriptとは動作が異なります．\n\n-setが配列の場合，eには（添字ではなく）値を入れながら繰り返します．\n-setがオブジェクトの場合，eには(キーではなく）値を入れながら繰り返します．\n\nまた，[[@cfrag for (k,v in set)]]という構文があります． \n\n-setがオブジェクトの場合，kにキー，vに値を入れながら繰り返します．\n\n\n\n",
    "tonyu2/super.txt": "[[lang]]\n\n*super\n\n**親クラスのコンストラクタを呼ぶ\n\n<<code\nsuper(引数)\n>>\n\n**親クラスと子クラスに同じ名前のメソッドがある場合，親クラスのメソッドを呼ぶ\n\n<<code\nsuper.メソッド名(引数)\n>>\n\n",
    "tonyu2/resize.txt": "[[ScaledCanvas]]\n\n*$Screen.resizeメソッド\n\nゲーム画面のサイズを変更します．\n\n<<code\n$Screen.resize(w,h);\n>>\n\nwとh に画面幅と高さを指定します．\n\n\n*例\n\n<<code\n$Screen.resize(500,300);\n>>\n\n\n※実際の画面（Canvas）の大きさが変わるのではなく，画面内に表示される仮想画面の大きさが変わります．\n",
    "tonyu2/ide.txt": "[[index]]\n\n*プロジェクト選択画面(index.html)\n\n-「新規」ボタンでプロジェクトを作成します．作成すると自動的にプロジェクト編集画面に移動します．\n-既存のプロジェクトを選択して，プロジェクト編集画面に移動します．\n\n*プロジェクト編集画面(project.html)\n\n**メニュー\n\n-Home\n-- プロジェクト選択画面に戻ります．\n-ファイル\n-- 新規作成\n---新しくTonyu2のクラス（=ファイル）を作成します．\n-- 名前変更\n---現在開いているクラスの名前を変更します．\n-- 削除\n---現在開いているクラスを削除します．\n--初期状態に戻す\n---現在開いているプロジェクトが[[サンプルプロジェクト>samples]]の場合，プロジェクトを初期状態に戻します．\n--このプロジェクト自身を削除\n--- プロジェクト全体を削除します．\n\n-実行\n-- ～を実行\n--- 指定されたクラスのオブジェクトを1つ作成し，実行を始めます．\n--停止\n--- プログラムを停止させます．\n-ウィンドウ\n--[[画像リスト>cpats]]\n--[[プロジェクト オプション>options]]\n\n\n",
    "tonyu2/cpats.txt": "[[ide]]\n\n*画像リスト\n\nメニュー階層： ウィンドウ → 画像リスト\n\nオブジェクトに用いるキャラクタパターン（画像）を追加します．\n\n一番下の「追加」ボタンを押し，各項目を設定します．\n\n-名前\n--この画像につける名前です．名前は$ で始めます．先頭のキャラクタパターンの番号を指す数値が同名の[[グローバル変数]]に入ります．\n--通常は，URLを指定すると自動的に設定されます．\n-URL  \n-- 画像のURLを記述します．はpngまたはgifを指定してください．\n-- URL欄にローカルの画像ファイルをドラッグ＆ドロップすると，その画像をあらわすURL（Base64エンコーディング）が自動的に設定されます．\n-パターン解析方法\n-- Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合はこちらを選びます\n--- URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」は使えません．\n--  固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って描かれた画像の場合，こちらを選びます．\n\nキャラクタパターンには，それぞれキャラクタパターン番号が割り振られます．\n変数pにキャラクタパターン番号を代入することでそのキャラクタパターンを表示できます．\n\n 例えば， $pat_chr という名前の画像ファイルの中の，4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n<<code\n    p=$pat_chr + 4; \n>>\n    とします．\n\n*例\n\n※ $pat_ballsという名前の画像が追加されているものとします．\n<<code\nt=0;\nwhile(true) {\n    if (t%5==0) {\n        // 新しく作るBall オブジェクトの変数pに，\n        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\n        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\n    }\n    t++;\n    update();\n}\n>>\n\n",
    "tonyu2/options.txt": "[[ide]]\n\n*プロジェクト オプション\n\nプロジェクトオプションは，通常は操作する必要はありません．主にTonyu2自身の開発時に設定を変える場合に用います．\n\n-デフォルトの親クラス\n-- [[クラスの定義>classDef]]において， extends を省略したときに継承される親クラスです．通常は[[Actor]]に設定します．\n-実行\n-- Mainクラス\n--- 実行するときに最初に作成されるオブジェクトのクラスです．通常，「実行」メニューで最後に選ばれたクラスになっています．\n-- Bootクラス\n--- Mainクラスより前に，プログラム全体の初期化を行うクラスです．通常は[[Boot]]クラスです．ここに別のクラスを指定することで，初期化方法をカスタマイズできます．\n-Kernelの開発を行う\n-- 通常，ファイル →  新規 を選び，クラス名を入力したときに，それが[[標準ライブラリ>api]]に存在するクラス名と同名である場合は作成ができません\n-- このチェックをonにすることで標準ライブラリと同名のクラスを作成できます．さらに，新規作成時に標準ライブラリにある同名のクラスの内容が現在のプロジェクトフォルダにコピーされます．\n-- 標準ライブラリと同名のクラスの内容を変更することで，標準ライブラリの挙動を変更できます．ただし，変更が有効なのはこのプロジェクトのみです．\n\n\n\n\n\n",
    "tonyu2/$mouseX/": "{}",
    "tonyu2/$touches.txt": "[[api]]\n\n* $touches\n\nタッチパネルのタッチされた座標を返します．\n\n[[@cfrag $touches[i] ]]は，i番目（0が最初の指）の指がタッチした場所についての情報を格納するオブジェクトです．\n\n-[[@cfrag $touches[i].x]]と[[@cfrag $touches[i].y]]は，タッチされた場所のx,y座標です．\n-[[@cfrag $touches[i].touched]]は，今その場所がタッチされていれば[[@cfrag true]]，タッチされていなければ[[@cfrag false]]を返します\n\n\n\n",
    "tonyu2/Boot.txt": "[[api]]\n\n*Bootクラス\n\nプログラム実行時に最初に起動するクラスです．次のような動作を行います．\nこれらの処理は実行時に自動的に行われるので，通常は呼び出す必要はありません．\n\n-画面の初期化\n-マウス・タッチイベントの初期化\n-[[スレッド]]の初期化\n-Mainクラスのオブジェクトの配置\n-メインループ\n--スレッドの実行\n--描画\n\n",
    "tonyu2/$mouseX, $mouseY.txt": "[[api]]\n\n*$mouseX/$mouseY\n\nマウスカーソルまたはタッチパネルの0番目の指のx,y座標を返します．",
    "tonyu2/setBGColor.txt": "[[ScaledCanvas]]\n\n*$Screen.setBGColor メソッド\n\n画面の背景色を変更します．\n\n**書式\n\n<<code\n$Screen.setBGColor(c)\n>>\n\n[[@arg c]]は，画面の背景色をあらわす文字列（HTMLの色指定方法に準ずる）を指定します．\n\n**例\n\n<<code\n$Screen.setBGColor(\"black\");\n>>\n\n<<code\n$Screen.setBGColor(\"#ffeedd\");\n>>\n\n<<code\n$Screen.setBGColor(\"rgb(200,100,50)\");\n>>",
    "tonyu2/play.txt": "[[BaseActor]]\n\n*playメソッド\n\n音楽の演奏または停止を行います．\n\n**書式\n\n<<code\nplay(mml1, mml2, ...)\n>>\n\nmml に，音楽を演奏するための文字列を指定します．\n書き方は，[[timbre.jsのMML>http://mohayonao.github.io/timbre.js/ja/mml.html]]\nを参照してください．\n\nplayメソッドを連続して実行すると，\n最初に実行したplayメソッドの音楽の演奏が終わってから，\n次の音楽が演奏されます．．\n\n例：\n\n<<code\n// ドレミとミファソの和音を演奏し，それが終わったら\nplay(\"cde\",\"efg\");\n// ミレドとソファミの和音を演奏する\nplay(\"edc\",\"gfe\");\n>>\n\n**音楽の停止\n\n自分が鳴らしている音楽を止めるには次のようにします．\n\n<<code\nplay().stop()\n>>\n\nあるいは，[[die]]メソッドを呼び出すと停止します．\n\n注意：音楽は，それぞれのオブジェクトが独立に鳴らすことができます．\nそのため，音楽を鳴らしているオブジェクトを指定して止める必要があります．\n例えば，自分以外のオブジェクト[[@cfrag a]]が演奏中であれば，次のようにします．\n\n<<code\na.play().stop()\n>>\nあるいは\n<<code\na.die()\n>>\n\n\n**参照\n\n[[playSE]]\n\n\n\n",
    "tonyu2/playSE.txt": "[[BaseActor]]\n\n*playSEメソッド\n\n音楽を演奏しますが，[[play]]メソッドと異なり，演奏が終了するのを待ちません．\n\n書式はplayメソッドと同じです．\n\n**参照\n\n[[play]]メソッド\n"
  }
}
    );
}
requirejs.setName('fs/ROMs');
if (!localStorage.norom) {
    FS.mountROM(
{
  "base": "/Tonyu/SampleROM/",
  "data": {
    "": "{\"6_Shot/\":{\"lastUpdate\":1388123276922},\"1_Animation/\":{\"lastUpdate\":1389065333049},\"3_NewParam/\":{\"lastUpdate\":1388123276922},\"2_MultipleObj/\":{\"lastUpdate\":1388123335478},\"4_getkey/\":{\"lastUpdate\":1388123276922},\"5_Chase/\":{\"lastUpdate\":1388123276938},\"7_Text/\":{\"lastUpdate\":1388839315004},\"8_Patterns/\":{\"lastUpdate\":1389234681200},\"9_Mouse/\":{\"lastUpdate\":1390990648793},\"10_MultiTouch/\":{\"lastUpdate\":1391665218222},\"11_Resize/\":{\"lastUpdate\":1391840453472},\"12_Sound/\":{\"lastUpdate\":1394010189397},\"13_DX/\":{\"lastUpdate\":1394010202056}}",
    "6_Shot/": "{\"Chaser.tonyu\":1388122397075,\".desktop\":1388122397070,\"Main.tonyu\":1388122397076,\"Player.tonyu\":1388122397074,\"Bullet.tonyu\":1388122397080}",
    "6_Shot/Chaser.tonyu": "// 実行 → Mainを実行\n\n// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\nwhile (true) {\n    if (x<$player.x) x+=2;\n    if (x>$player.x) x-=2;\n    if (y<$player.y) y+=2;\n    if (y>$player.y) y-=2;\n    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n    if (crashTo($player)) {\n        // die メソッドは，オブジェクトを消滅させます．\n        // そのオブジェクトの処理も停止させます．\n        $player.die();\n    }\n    update();\n}",
    "6_Shot/.desktop": "{\"runMenuOrd\":[\"Main\",\"Player\",\"Chaser\",\"Bullet\"]}",
    "6_Shot/Main.tonyu": "// 実行 → Mainを実行\n\n// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n$player=new Player;\nnew Chaser{x:20,y:20,p:5};\nnew Chaser{x:300,y:250,p:5};",
    "6_Shot/Player.tonyu": "// 実行 → Mainを実行\n\nx=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n    // (押しっぱなしでは撃てないようにする)\n    if (getkey(\"space\")==1) {\n        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n        new Bullet{x,y};\n    }\n    update();\n}",
    "6_Shot/Bullet.tonyu": "while (y>0) {\n    y-=8;\n    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n    // 衝突しているかを判定します．\n    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n    c=crashTo(Chaser);\n    // どのCheseオブジェクトとも衝突していない \n    //      -> c==undefined\n    // 1つ以上のChaseオブジェクトと衝突している \n    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n    if (c) {\n        c.die();\n        die();\n    }\n    update();\n}\n// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\ndie();\n\n/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n次の書き方もあります.\n\nfor (var c in allCrash(Chaser)) {\n  c.die();\n  die();\n}\n*/\n\n\n/*\n[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\nfor (t in $chars) {\n  if (t is Chaser && crashTo(t)) {\n     \n  }\n}\n\n*/",
    "1_Animation/": "{\".desktop\":{\"lastUpdate\":1389065333049},\"GoRight.tonyu\":{\"lastUpdate\":1388123314743}}",
    "1_Animation/.desktop": "{\"runMenuOrd\":[\"GoRight\"]}",
    "1_Animation/GoRight.tonyu": "// メニューの実行 → GoRightを実行を選んでください\n\n//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n// xとyに値を設定すると、その場所にスプライトを表示します\nx=100;\ny=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。",
    "3_NewParam/": "{\".desktop\":1388122397034,\"Bounce.tonyu\":1388122397038,\"Main.tonyu\":1388122397044,\"GoRight.tonyu\":1388122397041}",
    "3_NewParam/.desktop": "{\"runMenuOrd\":[\"Main\",\"Bounce\",\"GoRight\"]}",
    "3_NewParam/Bounce.tonyu": "// 実行 → Main を実行を選んでください。\n// xとy の値はここで設定せず、Mainから受け取ります\n//x=100;\n//y=250;\nvy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n// $ がついている変数はグローバル変数です。\nwhile (x<$screenWidth) {\n    x+=2;\n    y+=vy;\n    vy+=1;\n    // $screenHeight ： 画面幅をあらわします。\n    if (y>$screenHeight) {\n        y=$screenHeight;\n        vy=-vy;\n    }\n    update();\n}",
    "3_NewParam/Main.tonyu": "// 実行 → Main を実行を選んでください。\n\n// new クラス名{パラメタ} で、指定したフィールドの値をもつ\n// オブジェクトを出現させます。\nnew Bounce{x:100, y:220,p:12};\nnew Bounce{x:200, y:120,p:15};\nnew GoRight{x:50, y:80,p:4};\n\n// [!=Tonyu1] 従来通り，x,y,pを渡して初期化する方法も使えますが，\n// 上の方法が推奨されます\n//   new Bounce(100,220,12);",
    "3_NewParam/GoRight.tonyu": "// 実行 → Main を実行を選んでください。\n// xとy の値はここで設定せず、Mainから受け取ります\n//x=100;\n//y=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。",
    "2_MultipleObj/": "{\".desktop\":{\"lastUpdate\":1388123335478},\"Bounce.tonyu\":{\"lastUpdate\":1388123332368},\"Main.tonyu\":{\"lastUpdate\":1388123332947},\"GoRight.tonyu\":{\"lastUpdate\":1388123335368}}",
    "2_MultipleObj/.desktop": "{\"runMenuOrd\":[\"Main\",\"Bounce\",\"GoRight\"]}",
    "2_MultipleObj/Bounce.tonyu": "// 実行 → Main を実行を選んでください。\nx=100;\ny=250;\n// pに値を設定すると，キャラクタパターンを変更します．\n// 今のところ，キャラクタパターンは次のもので固定されています．\n// images/base.png   images/Sample.png\np=8;\nvy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n// $ がついている変数はグローバル変数です。\nwhile (x<$screenWidth) {\n    x+=2;\n    y+=vy;\n    vy+=1;\n    // $screenHeight ： 画面幅をあらわします。\n    if (y>$screenHeight) {\n        y=$screenHeight;\n        vy=-vy;\n    }\n    update();\n}",
    "2_MultipleObj/Main.tonyu": "// 実行 → Main を実行を選んでください。\n\n// new クラス名  でオブジェクトを出現させます。\nnew Bounce;\nnew GoRight;\n\n// [!=Tonyu1]new の後ろの() は省略可能です\n// [!=Tonyu1]appear は不要です\n// [!=Tonyu1] オブジェクトを画面上で設計する機能は未実装です。",
    "2_MultipleObj/GoRight.tonyu": "// 実行 → Main を実行を選んでください。\n//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n// xとyに値を設定すると、その場所にスプライトを表示します\nx=100;\ny=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。",
    "4_getkey/": "{\".desktop\":1388122397047,\"Player.tonyu\":1388122397051}",
    "4_getkey/.desktop": "{\"runMenuOrd\":[\"Player\"]}",
    "4_getkey/Player.tonyu": "x=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    update();\n}",
    "5_Chase/": "{\"Chaser.tonyu\":1388122397062,\".desktop\":1388122397055,\"Main.tonyu\":1388122397066,\"Player.tonyu\":1388122397059}",
    "5_Chase/Chaser.tonyu": "// 実行 → Mainを実行\n\n// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\nwhile (true) {\n    if (x<$player.x) x+=2;\n    if (x>$player.x) x-=2;\n    if (y<$player.y) y+=2;\n    if (y>$player.y) y-=2;\n    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n    if (crashTo($player)) {\n        // die メソッドは，オブジェクトを消滅させます．\n        // そのオブジェクトの処理も停止させます．\n        $player.die();\n    }\n    update();\n}",
    "5_Chase/.desktop": "{\"runMenuOrd\":[\"Main\",\"Player\",\"Chaser\"]}",
    "5_Chase/Main.tonyu": "// 実行 → Mainを実行\n\n// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n$player=new Player;\nnew Chaser{x:20,y:20,p:5};\nnew Chaser{x:300,y:250,p:5};",
    "5_Chase/Player.tonyu": "// 実行 → Mainを実行\n\nx=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    update();\n}",
    "7_Text/": "{\".desktop\":{\"lastUpdate\":1388839315004},\"Player.tonyu\":{\"lastUpdate\":1388839302191},\"Chaser.tonyu\":{\"lastUpdate\":1388839302191},\"Main.tonyu\":{\"lastUpdate\":1388839302191},\"Bullet.tonyu\":{\"lastUpdate\":1388839314754},\"Status.tonyu\":{\"lastUpdate\":1388839302191}}",
    "7_Text/.desktop": "{\"runMenuOrd\":[\"Main\",\"Player\",\"Chaser\",\"Bullet\",\"Status\"]}",
    "7_Text/Player.tonyu": "// 実行 → Mainを実行\n\nx=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n    // (押しっぱなしでは撃てないようにする)\n    if (getkey(\"space\")==1) {\n        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n        new Bullet{x,y};\n    }\n    update();\n}",
    "7_Text/Chaser.tonyu": "// 実行 → Mainを実行\n\n// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\nwhile (true) {\n    if (x<$player.x) x+=2;\n    if (x>$player.x) x-=2;\n    if (y<$player.y) y+=2;\n    if (y>$player.y) y-=2;\n    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n    if (crashTo($player)) {\n        // die メソッドは，オブジェクトを消滅させます．\n        // そのオブジェクトの処理も停止させます．\n        $player.die();\n        \n    }\n    update();\n}",
    "7_Text/Main.tonyu": "// 実行 → Mainを実行\r\n\r\n// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\r\n$score=0;\r\n$player=new Player;\r\nnew Chaser{x:20,y:20,p:5};\r\nnew Chaser{x:300,y:250,p:5};\r\nnew Status;\r\n",
    "7_Text/Bullet.tonyu": "while (y>0) {\n    y-=8;\n    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n    // 衝突しているかを判定します．\n    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n    c=crashTo(Chaser);\n    // どのCheseオブジェクトとも衝突していない \n    //      -> c==undefined\n    // 1つ以上のChaseオブジェクトと衝突している \n    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n    if (c) {\n        c.die();\n        die();\n        $score+=10;\n    }\n    update();\n}\n// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\ndie();\n\n/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n次の書き方もあります.\n\nfor (var c in allCrash(Chaser)) {\n  c.die();\n  die();\n}\n*/\n\n\n/*\n[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\nfor (t in $chars) {\n  if (t is Chaser && crashTo(t)) {\n     \n  }\n}\n\n*/",
    "7_Text/Status.tonyu": "// 変数textに値を設定すると，テキストを表示するオブジェクトになります．\ntext=\"Score:\";\nfillStyle=\"white\";\nsize=40;\nalign=\"center\";\nx=$screenWidth/2;\ny=$screenHeight/2;\nwhile (!$player.isDead()) {\n    text=\"Score:\"+$score;\n    update();\n}\ntext=\"Game Over\";\n",
    "8_Patterns/": "{\".desktop\":{\"lastUpdate\":1389234681200},\"res.json\":{\"lastUpdate\":1389069801146},\"Ball.tonyu\":{\"lastUpdate\":1389068922757},\"Main.tonyu\":{\"lastUpdate\":1389234351121}}",
    "8_Patterns/.desktop": "{\"runMenuOrd\":[\"Main\",\"Ball\"]}",
    "8_Patterns/res.json": "{\"images\":[{\"name\":\"$pat_base\",\"url\":\"images/base.png\",\"pwidth\":32,\"pheight\":32},{\"name\":\"$pat_balls\",\"url\":\"data:image/png;base64,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\"}],\"sounds\":[]}",
    "8_Patterns/Ball.tonyu": "// 実行-> Main を実行\nwhile (y<$screenHeight) {\n    y+=3;\n    update();\n}\ndie();\n",
    "8_Patterns/Main.tonyu": "// 実行-> Main を実行\n/* ウィンドウ → 画像リストから オブジェクトに用いるキャラクタパターン\n     を追加できます．\n   画像はpngまたはgifを指定してください．\n   \n  「パターン解析方法」は次の中から選びます\n    Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合は\n                           こちらを選びます．※\n    固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って\n                   描かれた画像の場合，こちらを選びます．\n  「URL」欄には，URLを書くか，ローカルファイルをドラッグ＆ドロップします\n    ※： URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」\n         は使えません．\n         \n    これらの画像は，変数pに値を代入することで使えます．\n    例えば， $pat_chr という名前の画像ファイルの中の，\n    4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n    p=$pat_chr + 4; \n    とします．\n*/\nt=0;\nwhile(true) {\n    if (t%5==0) {\n        // 新しく作るBall オブジェクトの変数pに，\n        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\n        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\n    }\n    t++;\n    update();\n}",
    "9_Mouse/": "{\".desktop\":{\"lastUpdate\":1390990634093},\"MouseChaser.tonyu\":{\"lastUpdate\":1390990648790},\"options.json\":{\"lastUpdate\":1390990648793}}",
    "9_Mouse/.desktop": "{\"runMenuOrd\":[\"MouseChaser\"]}",
    "9_Mouse/MouseChaser.tonyu": "while(true) {\n    x=$mouseX;\n    y=$mouseY;\n    update();\n}",
    "9_Mouse/options.json": "{\"compiler\":{\"defaultSuperClass\":\"Actor\"},\"run\":{\"mainClass\":\"MouseChaser\",\"bootClass\":\"Boot\"},\"kernelEditable\":false}",
    "10_MultiTouch/": "{\".desktop\":{\"lastUpdate\":1391665210053},\"Main.tonyu\":{\"lastUpdate\":1391665210061},\"Touch.tonyu\":{\"lastUpdate\":1391665218212},\"options.json\":{\"lastUpdate\":1391665218222}}",
    "10_MultiTouch/.desktop": "{\"runMenuOrd\":[\"Main\",\"Touch\"]}",
    "10_MultiTouch/Main.tonyu": "new Touch{index:0}; //0番目のタッチ位置を表示するオブジェクト\nnew Touch{index:1}; //1番目のタッチ位置を表示するオブジェクト\n\n",
    "10_MultiTouch/Touch.tonyu": "size=30;\nwhile (true) {\n    // $touchesに，タッチされた場所の座標をあらわすオブジェクト{x,y}\n    // の配列が入ります．\n    var t=$touches[index];\n    if (t.touched) {//index番目の指がタッチされていれば\n        x=t.x;\n        y=t.y;\n        text=\"touch #\"+index;\n    } else{\n        text=\"Not touched\";\n    }\n    update();\n}",
    "10_MultiTouch/options.json": "{\"compiler\":{\"defaultSuperClass\":\"Actor\"},\"run\":{\"mainClass\":\"Main\",\"bootClass\":\"Boot\"},\"kernelEditable\":false}",
    "11_Resize/": "{\".desktop\":{\"lastUpdate\":1391839772692},\"Main.tonyu\":{\"lastUpdate\":1391840453465},\"Bounce.tonyu\":{\"lastUpdate\":1391839924325},\"options.json\":{\"lastUpdate\":1391840453472}}",
    "11_Resize/.desktop": "{\"runMenuOrd\":[\"Main\",\"Bounce\"]}",
    "11_Resize/Main.tonyu": "for (i=0; i<20 ;i++) {\n    new Bounce();\n}\ntext=\"↑ Portrait   → Landscape\";\nsize=20;\nwhile (true) {\n    x=$screenWidth/2;\n    y=$screenHeight/2;\n    if (getkey(\"right\")==1) {\n        // ゲーム画面のサイズを変更（横長）\n        $Screen.resize(400,300);\n    }\n    if (getkey(\"up\")==1) {\n        // ゲーム画面のサイズを変更（縦長）\n        $Screen.resize(300,400);\n    }\n    update();\n}",
    "11_Resize/Bounce.tonyu": "x=rnd($screenWidth);\ny=rnd($screenHeight);\nvx=spd();\nvy=spd();\nwhile (true) {\n    x+=vx;\n    y+=vy;\n    if (x<0) {\n        x=0;\n        vx=spd();\n    }\n    if (y<0) {\n        y=0;\n        vy=spd();\n    }\n    if (x>$screenWidth) {\n        x=$screenWidth;\n        vx=-spd();\n    }\n    if (y>$screenHeight) {\n        y=$screenHeight;\n        vy=-spd();\n    }\n    update();\n}\n\\spd() {\n    return rnd()*10;\n}",
    "11_Resize/options.json": "{\"compiler\":{\"defaultSuperClass\":\"Actor\"},\"run\":{\"mainClass\":\"Main\",\"bootClass\":\"Boot\"},\"kernelEditable\":false}",
    "12_Sound/": "{\".desktop\":{\"lastUpdate\":1394010189393},\"MMLTest.tonyu\":{\"lastUpdate\":1394010189394},\"SETest.tonyu\":{\"lastUpdate\":1394010189396},\"options.json\":{\"lastUpdate\":1394010189397}}",
    "12_Sound/.desktop": "{\"runMenuOrd\":[\"SETest\",\"MMLTest\"]}",
    "12_Sound/MMLTest.tonyu": "x=200; y=150;\nsize=40;\nwhile (true) {\n    text=\"oo\";\n    play(\"l8cde4\",\">l8c4ge\");\n    text=\"^^\";\n    play(\"l8edc4\",\">l8e4dc\");\n}",
    "12_Sound/SETest.tonyu": "m=new MMLTest;\n\ntext=\"Press Space or 'S'\";\nx=200; y=200;\nwhile (true) {\n    if (getkey(32)==1) {\n        playSE(\"l16<ceg\");\n    }\n    if (getkey(\"s\")==1) {\n        m.die();\n    }\n    update();\n}",
    "12_Sound/options.json": "{\"compiler\":{\"defaultSuperClass\":\"Actor\"},\"run\":{\"mainClass\":\"SETest\",\"bootClass\":\"Boot\"},\"kernelEditable\":false}",
    "13_DX/": "{\".desktop\":{\"lastUpdate\":1394010202052},\"Main.tonyu\":{\"lastUpdate\":1394010202053},\"DX.tonyu\":{\"lastUpdate\":1394010202054},\"options.json\":{\"lastUpdate\":1394010202056}}",
    "13_DX/.desktop": "{\"runMenuOrd\":[\"Main\",\"DX\"]}",
    "13_DX/Main.tonyu": "// scaleX: 拡大率\n// scaleY: 縦の拡大率（省略するとscaleXと同じ値)\n// alpha: 透過度\n// rotate: 回転角度\nnew DX{x:150, y:200, p:2, scaleX:2};\nnew DX{x:50, y:200, p:5, scaleX:2, scaleY:1};\nnew DX{x:200, y:150, p:3, alpha:128,rotate:90};\n\n\n",
    "13_DX/DX.tonyu": "\nwhile (true) {\n    rotate++;\n    update();\n}",
    "13_DX/options.json": "{\"compiler\":{\"defaultSuperClass\":\"Actor\"},\"run\":{\"mainClass\":\"Main\",\"bootClass\":\"Boot\"},\"kernelEditable\":false}"
  }
}
    );
}
requirejs.setName('FileList');
function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    if (!options) options={};
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir};
    var path=$("<div>");
    var items=$("<div>");
    function item(f) {
    	var res=$();
    	if (!f) return res;
    	var fn=f.path();
    	items.find("span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==fn) {
    			res=t;
    		}
    	});
    	return res;
    }
    elem.append(path).append(items);
    function select(f) {
        if (FL.on.select && FL.on.select(f)) return;
        if (f.isDir()) {
            ls(f);
        } else {
        	item(_curFile).removeClass("selected");
            _curFile=f;
            item(_curFile).addClass("selected");
        }
    }
    function ls(dir) {
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.path());
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            $("<li>").append(
                    $("<span>").addClass("fileItem").text("..")
            ).appendTo(items).click(function () {
                select(p);
            });
        }
        if (_curFile && !_curFile.exists()) {
            _curFile=null;
        }
        _curDir.each(function (f) {
            var n=displayName(f);
            if (!n) return;
            var s=$("<span>").addClass("fileItem").text( (f.isReadOnly()?"[RO]":"")+n).data("filename",f.path());
            if (_curFile && _curFile.path()==f.path()) { s.addClass("selected");}
            $("<li>").append(s).appendTo(items).click(function () {
                select(f);
            });
        });
    }
    function displayName(f) {
        if (FL.on.displayName) return FL.on.displayName.apply(FL, arguments );
        return f.name();
    }
    function curFile() {
        return _curFile;
    }
    function curDir() {
        return _curDir;
    }
    return FL;
}
requirejs.setName('ImageList');
define(["PatternParser","Util","WebSite"], function (PP,Util,WebSite) {
    function IL(resImgs, onLoad) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            //console.log("loaded", resImg,i);
            var url=resImg.url;
            if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
            if (!Util.startsWith(url,"data")) url+="?" + new Date().getTime();
            var im=$("<img>").attr("src",url);
            im.load(function () {
                var pw,ph;
                if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
                    var x=0, y=0, w=this.width, h=this.height;
                    var r=[];
                    while (true) {
                        r.push({image:this, x:x,y:y, width:pw, height:ph});
                        x+=pw;
                        if (x+pw>w) {
                            x=0;
                            y+=ph;
                            if (y+ph>h) break;
                        }
                    }
                    resa[i]=r;
                } else {
                    var p=new PP(this);
                    resa[i]=p.parse();
                }
                resa[i].name=resImg.name;
                cnt--;
                if (cnt==0) {
                    var res=[];
                    var names={};
                    resa.forEach(function (a) {
                        names[a.name]=res.length;
                        res=res.concat(a);
                    });
                    res.names=names;
                    onLoad(res);
                }
            });
        });
    }
    return IL;
});
requirejs.setName('UI');
define(["Util"],function (Util) {
    var UI={};
    UI=function () {
        var expr=[];
        for (var i=0 ; i<arguments.length ; i++) {
            expr[i]=arguments[i];
        }
        var listeners=[];
        var $vars={};
        var $edits=[];
        var res=parse(expr);
        res.$edits=$edits;
        res.$vars=$vars;
        $edits.load=function (model) {
            $edits.model=model;
            $edits.forEach(function (edit) {
                $edits.writeToJq(edit.params.$edit, edit.jq);
            });
        };
        $edits.writeToJq=function ($edit, jq) {
        	var m=$edits.model;
            if (!m) return;
            var name = $edit.name;
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                m=m[a[i]];
            }
            m=$edit.type.toVal(m);
            if (jq.attr("type")=="checkbox") {
                jq.prop("checked",!!m);
            } else {
                jq.val(m);
            }
        };
        $edits.validator={
       		errors:{},
       		show: function () {
       			if ($vars.validationMessage) {
       				$vars.validationMessage.empty();
       				for (var name in this.errors) {
       					$vars.validationMessage.append(UI("div", this.errors[name].mesg));
       				}
       			}
       			if ($vars.OKButton) {
       				var ok=true;
       				for (var name in this.errors) {
       					ok=false;
       				}
       				$vars.OKButton.attr("disabled", !ok);
       			}
       		},
       		on: {
       			validate: function () {}
       		},
       		addError: function (name, mesg, jq) {
       			this.errors[name]={mesg:mesg, jq:jq};
       			this.show();
       		},
       		removeError: function (name) {
       			delete this.errors[name];
       			this.show();
       		},
       		allOK: function () {
       			for (var i in this.errors) {
       				delete this.errors[i];
       			}
       			this.show();
       		}
        };
        $edits.writeToModel=function ($edit, val ,jq) {
            var m=$edits.model;
        	//console.log($edit, m);
            if (!m) return;
            var name = $edit.name;
            try {
                val=$edit.type.fromVal(val);
            } catch (e) {
            	$edits.validator.addError(name, e, jq);
            	//$edits.validator.errors[name]={mesg:e, jq:jq};
                //$edits.validator.change(name, e, jq);
                return;
            }
            $edits.validator.removeError(name);
            /*
            if ($edits.validator.errors[name]) {
                delete $edits.validator.errors[name];
                $edits.validator.change(name, null, jq);
            }*/
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                if (i==a.length-1) {
                    if ($edits.on.writeToModel(name,val)) {

                    } else {
                        m[a[i]]=val;
                    }
                } else {
                    m=m[a[i]];
                }
            }
            $edits.validator.on.validate.call($edits.validator, $edits.model);
        };
        $edits.on={};
        $edits.on.writeToModel= function (name, val) {};

        if (listeners.length>0) {
            setTimeout(l,10);
        }
        function l() {
            listeners.forEach(function (li) {
                li();
            });
            setTimeout(l,10);
        }
        return res;
        function parse(expr) {
            if (expr instanceof Array) return parseArray(expr);
            else if (typeof expr=="string") return parseString(expr);
            else return expr;
        }
        function parseArray(a) {
            var tag=a[0];
            var i=1;
            var res=$("<"+tag+">");
            if (typeof a[i]=="object" && !(a[i] instanceof Array) ) {
                parseAttr(res, a[i],tag);
                i++;
            }
            while (i<a.length) {
                res.append(parse(a[i]));
                i++;
            }
            return res;
        }
        function parseAttr(jq, o, tag) {
            if (o.$var) {
                $vars[o.$var]=jq;
            }
            if (o.$edit) {
                if (typeof o.$edit=="string") {
                    o.$edit={name: o.$edit, type: UI.types.String};
                }
                if (!o.on) o.on={};
                o.on.realtimechange=function (val) {
                    $edits.writeToModel(o.$edit, val, jq);
                };
                if (!$vars[o.$edit.name]) $vars[o.$edit.name]=jq;
                $edits.push({jq:jq,params:o});
            }
            for (var k in o) {
                if (k=="on") {
                    for (var e in o.on) on(e, o.on[e]);
                } else if (k=="css") {
                    jq.css(o[k]);
                } else if (!Util.startsWith(k,"$")){
                    jq.attr(k,o[k]);
                }
            }
            function on(eType, li) {
                if (eType=="enterkey") {
                    jq.on("keypress",function (ev) {
                        if (ev.which==13) li.apply(jq,arguments);
                    });
                } else if (eType=="realtimechange") {
                    var first=true, prev;
                    listeners.push(function () {
                        var cur;
                        if (o.type=="checkbox") {
                            cur=!!jq.prop("checked");
                        } else {
                            cur=jq.val();
                        }
                        if (first || prev!=cur) {
                            li.apply(jq,[cur,prev]);
                            prev=cur;
                        }
                        first=false;
                    });
                } else {
                    jq.on(eType, li);
                }
            }
        }
        function parseString(str) {
            return $("<span>").text(str);
        }
    };
    UI.types={
       String: {
           toVal: function (val) {
               return val;
           },
           fromVal: function (val) {
               return val;
           }
       },
       Number: {
           toVal: function (val) {
               return val+"";
           },
           fromVal: function (val) {
               return parseFloat(val);
           }
       }
   };
    return UI;
});

requirejs.setName('Tonyu.Iterator');
define(["Tonyu"], function (T) {
   function IT(set, arity) {
       var res={};
       if (set instanceof Array) {
           res.i=0;
           if (arity==1) {
               res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=set[res.i];
                   res.i++;
                   return true;
               };
           } else {
               res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=res.i;
                   this[1]=set[res.i];
                   res.i++;
                   return true;
               };
           }
       } else if (set instanceof Object){
           res.i=0;
           var elems=[];
           if (arity==1) {
               for (var k in set) {
                   elems.push(k);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i];
                   res.i++;
                   return true;
               };
           } else {
               for (var k in set) {
                   elems.push([k, set[k]]);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i][0];
                   this[1]=elems[res.i][1];
                   res.i++;
                   return true;
               };
           }
       } else {
           console.log(set);
           throw "Cannot iterable";
       }
       return res;
   }
   Tonyu.iterator=IT;
    return IT;
});
requirejs.setName('Key');
Key=function () {
    var Key;
    var stats={};
    var codes={
            left: 37 , up:38 , right: 39, down:40, space:32, enter:13,
            shift:16, ctrl:17, alt:18
        };
    for (var i=65 ; i<65+26; i++) {
    	codes[String.fromCharCode(i).toLowerCase()]=i;
    }
    for (var i=48 ; i<58; i++) {
    	codes[String.fromCharCode(i)]=i;
    }
    function getkey(code) {
        if (typeof code=="string") {
            code=codes[code.toLowerCase()];
        }
        if (!code) return 0;
        if (stats[code]==-1) return 0;
        return stats[code];
    }
    function update() {
        for (var i in stats) {
            if (stats[i]>0) {stats[i]++;}
            if (stats[i]==-1) stats[i]=1;
        }
    }

    return Key={getkey:getkey, update:update, stats:stats, codes: codes};
}();
$(document).keydown(function (e) {
    var s=Key.stats[e.keyCode];
    if (!s) {
    	Key.stats[e.keyCode]=-1;
    }
});
$(document).keyup(function (e) {
    Key.stats[e.keyCode]=0;
});
requirejs.setName('DiffDialog');
define(["UI","difflib","diffview"], function (UI,difflib,diffview) {
    var res={};
	res.show=function (baseFile, newFile, options) {
    	var d=res.embed(baseFile, newFile, options);
    	d.dialog({width:600,height:500});
	};
	res.embed=function (baseFile, newFile, options) {
        if (!res.d) {
            var FType={
                    fromVal: function (val){
                        return val=="" ? null : FS.get(val);
                    },
                    toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"比較"},
        			["div",
        			 ["span","元のファイル"],
        			 ["input",{$edit:{name:"baseFile",type:FType},size:60}],["br"],
                     ["span","新しいファイル"],
                     ["input",{$var:"newFile",$edit:{name:"newFile",type:FType},size:60}]
        			],
                    ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.done();
                 }}}, "比較"],
      			["div",{$var: "diffoutput", css:{height:"350px", overflow:"scroll"}}]
            );
        }
        var d=res.d;
        var model={baseFile:baseFile , newFile:newFile};
        d.$edits.load(model);
        function isValidFile(f) {
            return f && !f.isDir() && f.exists() ;
        }
    	d.$edits.validator.on.validate=function (model) {
    	    if (!isValidFile(model.newFile)  ) {
    	        this.addError("new",newFile+"は存在しないか，ディレクトリです");
    	    } else if (!isValidFile(model.baseFile)  ) {
                this.addError("base",baseFile+"は存在しないか，ディレクトリです");
    	    } else {
    	        this.allOK();
    	    }
    	    /*
    	    if ( isValidFile(model.baseFile) && !isValidFile(model.newFile)  ) {
    	        model.newFile=(model.newFile ? model.newFile.rel(model.baseFile.name()) : model.baseFile) ;
    	        d.$vars.newFile.val(model.newFile+"");
    	    }*/
    	};
    	res.done=function () {
    	    var base = difflib.stringAsLines(model.baseFile.text());
    	    var newtxt = difflib.stringAsLines(model.newFile.text());

    	    var sm = new difflib.SequenceMatcher(base, newtxt);

    	    // get the opcodes from the SequenceMatcher instance
    	    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    	    // in order to yield the new text
    	    var opcodes = sm.get_opcodes();
    	    var diffoutputdiv = d.$vars.diffoutput[0];
    	    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    	    //var contextSize = $("contextSize").value;
    	    contextSize = null; //contextSize ? contextSize : null;

    	    // build the diff view and add it to the current DOM
    	    diffoutputdiv.appendChild(diffview.buildView({
    	        baseTextLines: base,
    	        newTextLines: newtxt,
    	        opcodes: opcodes,
    	        // set the display titles for each resource
    	        baseTextName: model.baseFile+"",
    	        newTextName: model.newFile+"",
    	        contextSize: contextSize,
    	        viewType: 1 //$("inline").checked ? 1 : 0
    	    }));

    		//onOK();
    	};
    	if (isValidFile(model.baseFile) && isValidFile(model.newFile)) {
    		res.done();
    	}
    	return d;
    };
    return res;
});
requirejs.setName('showErrorPos');
function showErrorPos(elem, err) {
    var mesg, src, pos;
    if (!err) {
        close();
        return;
    }
    if (err.isTError) {
        mesg=err.mesg;
        src=err.src;
        pos=err.pos;
    } else {
        src={name:function (){return "不明";}};
        pos=0;
        mesg=err;
    }
    function close(){
        elem.empty();
    }
    close();
    var mesgd=$("<div>").text(mesg+" 場所："+src.name());
    mesgd.append($("<button>").text("閉じる").click(close));
    elem.append(mesgd);
    var str=src.text();
    var srcd=$("<pre>");
    srcd.append($("<span>").text(str.substring(0,pos)));
    srcd.append($("<img>").attr("src",WebSite.top+"images/ecl.png"));
    srcd.append($("<span>").text(str.substring(pos)));
    elem.append(srcd);
}
requirejs.setName('Wiki');
Wiki=function (placeHolder, home, options, plugins) {
    var W={};
    var refers={figures:"図", plists: "リスト"};
    var SEQ="__seq__";
    var LINEMARK="marker_"+Math.floor(Math.random()*100000);
    var on={};
    var history=[];
    var EXT=".txt";
    if (!home.isDir()) throw home+": not a dir";
    var cwd;
    W.on=on;
    W.cd=function (dir) {
    	cwd=dir;
    	tocFile=cwd.rel("toc.json");
    };
    W.cd(home);
    W.parse=function (body,name) {
        var ctx={};
        var $h=HttpHelper({lineMark:LINEMARK});
        ctx.out=$h;
        ctx.name=name;
        ctx.lines=body.split(/\r?\n/);
        ctx.lineNo=0;
        ctx.ul=0;
        ctx.beginMark="[[";
        ctx.endMark="]]";
        ctx.blocks=[];
        var figInfo=refInfo("figures");
        var plistInfo=refInfo("plists");
        //ctx.figures={};
        //ctx.figseq=1;
        var toc=[];
        if (tocFile.exists()) toc=tocFile.obj();
        var idx=toc.indexOf(name);
        if (idx>=0) {
            var navBar="";
            var prev=toc[idx-1];
            if (prev) navBar+="[[前へ>"+prev+"]]";
            var next=toc[idx+1];
            if (next) navBar+=" - [[次へ>"+next+"]]";
            var top=toc[0];
            if (idx!=0) navBar+=" - [[目次>"+top+"]]";
            ctx.lines.unshift(navBar);
            ctx.lines.push(navBar);
        }
        ctx.lines.forEach(parseLine);
        function refInfo(type) {// figures / plists
            ctx[type]={};
            var seq=1;
            var res=function (name, register) {
                var fi=ctx[type][name];
                if (!fi) {
                    fi={
                        refs:[]
                    };
                    //console.log("reg "+type+" "+name);
                    ctx[type][name]=fi;
                }
                if (register) {
                    fi.no=seq++;
                    fi.name=refers[type]+fi.no;// 図 / リスト
                    fi.refs.forEach(function (e) {
                        e.text(fi.name);
                    });
                }
                return fi;
            };
            return res;
        }

        return $h.buf;
        function parseLine(line) {
            $h.lineNo=ctx.lineNo;
            function unul(to) {
                if (to==null) to=0;
                while (ctx.ul>to) {
                    ctx.ul--;
                    $h.exit();//$.p("</ul>");
                }
            }
            var uld=0;
            if (line.match(/^-+/)) {
                uld=RegExp.lastMatch.length;
            }
            if (uld>ctx.ul) {
                while(uld>ctx.ul) {
                    ctx.ul++;
                    $h.enter("<ul>");
                }
            } else unul(uld);
            line=line.substring(uld);
            if (uld>0) $h.enter("<li>");
            if (line.match(/^\*+/)) {
                var r=RegExp.rightContext;
                //unul();
                var h="h"+RegExp.lastMatch.length;
                $h.enter("<"+h+">");//$.p("<"+h+">");
                parseLink(r);
                $h.exit();// $.p("</"+h+">\n");
            } else if (line.match(/^$/)) {
                unul();
                $h.p($("<p>")); //$.p("<p>\n");
            } else if (line.match(/^<<toc(.*)/)) {
                ctx.toc=[ctx.name];
                ctx.blocks.push({name: "toc", exit: function () {
                    if (!tocFile.isReadOnly()) tocFile.obj(ctx.toc);
                    ctx.toc=null;
                }});
            } else if (line.match(/^<<code(.*)/)) {
                var s=RegExp.$1;
                s=s.replace(/^ */,"");
                if (s.length>0) {
                    var ss=s.split(/ /,2);
                    var label, fn;
                    if (ss.length==2) {
                        fn=ss[0];
                        label=ss[1];
                        var pi=plistInfo(label, true);
                        $h.p($("<div>").addClass("plist").text(pi.name+" "+fn));
                    } else {
                        $h.p($("<div>").addClass("plist").text(ss));
                    }
                }
                $h.enter("<pre>");
                ctx.blocks.push({name: "code", exit: function () {$h.exit();}});
            } else if (line.match(/^>>/)) {
                var b=ctx.blocks.pop();
                if (b && b.exit) b.exit(ctx);
            } else if (line.match(/^@@@@(.*)/)) {
                //unul();
                if (ctx.pclose) $h.exit();//$.p("</pre>");
                else {
                    if (RegExp.$1.length>0) {
                        var pi=plistInfo(RegExp.$1, true);
                        $h.p($("<div>").addClass("plist").text(pi.name));
                    }
                    $h.enter("<pre>");
                }
                ctx.pclose=!ctx.pclose;
            } else {
                //unul();
                parseLink(line);
                $h.p("\n");
            }
            if (uld>0) $h.exit();
            ctx.lineNo++;
        }
        function parseLink(line) {
            var w=(typeof line=="string"?
                    WikiBraces(line, ctx.beginMark,ctx.endMark)
                    : line);
            w.forEach(function (e) {
                if (typeof e=="string") {
                    $h.p(e);
                } else {
                    procLink(e);
                }
            });
            function procLink(e) {
                var name=e.text();
                var a;
                if (name.match(/^@blink ([^>]+)>([^\s]+)/)) {
                    caption=RegExp.$1;
                    var target=RegExp.$2;
                    a=$("<span>").addClass("clickable").text(caption).hover(function () {
                        var a;
                        if (parent && parent.Arrow) a=parent.Arrow;
                        if (Arrow) a=Arrow;
                        if (a) a.show( target );
                    });
                } else if (name.match(/^@plistref (.*)/)) {
                    var label=RegExp.$1;
                    //console.log("fi.l ="+label);
                    var fi=plistInfo(label);
                    //console.log("fi = "+fi.name);
                    a=$("<strong>").text(fi.name);
                    fi.refs.push(a);
                } else if (name.match(/^@editadd/)) {
                    $h.p($("<img>").attr("src",WebSite.top+"images/editAdd.png"));
                } else if (name.match(/^@figref (.*)/)) {
                    var fi=figInfo(RegExp.$1);
                    a=$("<strong>").text(fi.name);
                    fi.refs.push(a);
                } else if (name.match(/^@cfrag (.*)/)) {
                    var code=RegExp.$1
                    a=$("<code>");
                    $h.enter(a);
                    parseLink(code);
                    $h.exit();
                } else if (name.match(/^@arg (.*)/)) {
                    var varn=RegExp.$1
                    a=$("<i>");
                    $h.enter(a);
                    parseLink(varn);
                    $h.exit();
                } else {
                    var cn=e.split(">",2);
                    if (cn.length==2) {
                        name=cn[1]+"";
                        caption=cn[0];
                    } else caption=name;
                    if (ctx.toc) ctx.toc.push(name);
                    if (name.match(/\.(png|jpg|gif)$/)) {
                        var fi=figInfo(name, true);
                        a=$("<div>").addClass("figure").append(
                                $("<div>").append(  $("<img>").attr("src", WebSite.top+"doc/images/"+name) )
                           );
                        $h.enter(a);
                        $h.enter($("<div>"));
                        $h.p(refers.figures+fi.no+".");
                        parseLink(caption); //$h.p(caption);
                        $h.exit();
                        $h.exit();
                    } else {
                    	if (name.match(/^https?:\/\//)) {
                    		a=$("<a>").attr({href:name,target:"ext"}).text(caption);
                    	} else {
                    		var f=W.resolveFile(name);
                    		if (!f.exists() && f.isReadOnly()) {
                    			a=$("<span>").text(caption);
                    		} else {
                    			a=$("<span>").addClass("clickable").text(caption).click(function () {
                    				W.show(f);
                    			});
                    			if (!f.exists()) a.addClass("notexist");
                    		}
                    	}
                    }
                }
                $h.p(a);
            }
        }
    };
    W.resolveFile=function (name) {
        var f;
        if (name.isDir) f=name;
        else f=cwd.rel(name+EXT);
        return f;
    };
    W.show=function (nameOrFile) {
    	var f=W.resolveFile(nameOrFile);
    	W.cd(f.up());
		var fn=f.truncExt(EXT);
    	if (!f.exists() && !f.isReadOnly()) {
    		var p=history[history.length-1];
    		if (p) f.text("[["+p.truncExt(EXT)+"]]\n");
    		else f.text("");
    	}
    	if ( f.exists()) {
    		var ht=W.parse(f.text(), fn);
    		placeHolder.empty();
    		placeHolder.scrollTop(0);
    		placeHolder.append(ht);
    		placeHolder.append($("<div>").css({height:"100px"}).text(""));
    		//console.log("wikijs.on.show",f+"");
    		if (on.show) on.show.apply(W, [f,fn]);
    		history.push(f);
    	} else {
    		alert(nameOrFile+" というページはありません");
    		//placeHolder.text(name+" not found.");
    	}
    	return;
    };
    W.back=function () {
        var f=history.pop();
        if (f) show(f);
    };
    var curLined;
    W.highlightLine=function (row) { // row:0 origin
        var e=$("#"+LINEMARK+"-"+row);
        if (e.length==0) return;
        if (curLined) {
            curLined.removeClass("wiki-cur-line");
        }
        curLined=e.next();
        curLined.addClass("wiki-cur-line");
        var t=e.position().top;
        var area=placeHolder;
        if (t<0) {
            area.scrollTop(area.scrollTop()+(t-10)/2);
        }
        var h=area.height()-100;
        if (t>h) {
            area.scrollTop(area.scrollTop()+(t-h+10)/2);
        }
        function mark(startElem) {
            var e=startElem.next();
            while (e.length>0) {
                if (Util.startsWith( e.attr("id"), LINEMARK)) break;

            }
        }
    };
    return W;
    function WikiBraces(str, begin ,end) {
        var c=0;
        function init() {
            var w=[];
            while(true) {
                var i=str.indexOf(begin,c);
                var j=str.indexOf(end,c);
                if (j>=0 && (i<0 || i>j)) {  // ]]
                    w.push(str.substring(c,j));
                    c=j;  // ]] は含めずおわり
                    break;
                }
                if (i<0) {  // [[ ]] なし
                    w.push(str.substring(c));
                    c=str.length;
                    break;
                }
                // [[
                w.push(str.substring(c,i));
                c=i+begin.length;
                var we=init();
                we.hasBrace=true;
                if (c<str.length) {  // ]] あり
                    c+=end.length;
                }
                w.push(we);
            }
            bless(w);
            return w;
        }
        function bless(w) {
            w.split=function (sp, lim) {
                if (lim==1) return this;
                var res=[], cur=bless([]);
                this.forEach(function (e) {
                    if (typeof e=="string") {
                        var i =e.indexOf(sp);
                        if (res.length>=lim) i=-1;
                        if (i>=0) {  //  ,bbb   aaa,bbb
                            if (i>0) {  //   aaa,bbb
                                var s=e.substring(0,i); // aaa
                                cur.push(s);
                            }
                            i+=sp.length;   //  bbb  bbb
                            if (cur.length!=1) res.push(cur);
                            else res.push(cur[0]);
                            cur=bless([]);
                            if (i<e.length) {  // ,bbb
                                var s=e.substring(i) ;
                                cur.push(s);
                            }
                        } else {  //aaabbb
                            cur.push(e);
                        }
                    } else {
                        cur.push(e);
                    }
                });
                if (cur.length!=1) res.push(cur);
                else res.push(cur[0]);
                return res;
            };
            w.text=function (includeBrace) {
               var res=(this.hasBrace && includeBrace ? begin :"");
               this.forEach(function (e) {
                   if (typeof e=="string") {
                       res+=e;
                   } else {
                       res+=e.text(true);
                   }
               });
               res+=(this.hasBrace && includeBrace ? end :"");
               return res;
            };
            w.toString=function () {
                return this.text(true);
            };
            return w;
        }
        return init(0);
    };
};

requirejs.setName('disp');
// オブジェクトの内容を表示する． デバッグ用
function disp(a) {
	var p=IndentBuffer();
	function disp2(a) {
		if (a==null) return p("null%n");
		if (typeof a == "string" )
			return p("'%s'%n",a);
		if (typeof a =="number")
			return p("%s%n",a);
		if (typeof a=="function") return p("func%n");
		if (a instanceof Array) p("[%{");
		else p("{%{");
		var c = "";
		for (var i in a) {
			p(c + i+":");
			disp2(a[i]);
		}
		if (a instanceof Array) p("%}]%n");
		else  p("%}}%n");
	}
	disp2(a);
	return p.buf;
}

requirejs.setName('ObjectMatcher');
ObjectMatcher=function () {
    var OM={};
    var VAR="$var",THIZ="$this";
    OM.v=v;
    function v(name, cond) {
        var res={};
        res[VAR]=name;
        if (cond) res[THIZ]=cond;
        return res;
    }
    OM.isVar=isVar;
    var names="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i =0 ; i<names.length ; i++) {
        var c=names.substring(i,i+1);
        OM[c]=v(c);
    }
    function isVar(o) {
        return o && o[VAR];
    }
    OM.match=function (obj, tmpl) {
        var res={};
        if (m(obj,tmpl,res)) return res;
        return null;
    };
    function m(obj, tmpl, res) {
        if (obj===tmpl) return true;
        if (obj==null) return false;
        if (typeof obj=="string" && tmpl instanceof RegExp) {
            return obj.match(tmpl);
        }
        if (typeof tmpl=="function") {
            return tmpl(obj,res);
        }
        if (typeof tmpl=="object") {
            //if (typeof obj!="object") obj={$this:obj};
            for (var i in tmpl) {
                if (i==VAR) continue;
                var oe=(i==THIZ? obj :  obj[i] );
                var te=tmpl[i];
                if (!m(oe, te, res)) return false;
            }
            if (tmpl[VAR]) {
                res[tmpl[VAR]]=obj;
            }
            return true;
        }
        return false;
    }
    return OM;
}();
requirejs.setName('context');
/*
 コード生成中に使う補助ライブラリ．自分の処理しているクラス，メソッド，変数などの情報を保持する
 使い方:
   c=context();
   c.enter({a:3, b:5}, function (c) {
       // この中では，c.a==3 ,  c.b==5
       console.log("a="+c.a+" b="+c.b);
       c.enter({b:6}, function (c) {
          // この中では，c.a==3 ,  c.b==6
          console.log("a="+c.a+" b="+c.b);
       });
       // c.a==3 ,  c.b==5  に戻る
       console.log("a="+c.a+" b="+c.b);

   });
 */
function context() {
    var c={};
    c.ovrFunc=function (from , to) {
        to.parent=from;
        return to;
    };
    c.enter=enter;
    return c;
    function enter(val, act) {
        var sv={};
        for (var k in val) {
            if (k.match(/^\$/)) {
                k=RegExp.rightContext;
                sv[k]=c[k];
                c[k]=c.ovrFunc(c[k], val[k]);
            } else {
                sv[k]=c[k];
                c[k]=val[k];
            }
        }
        act(c);
        for (var k in sv) {
            c[k]=sv[k];
        }
    }
}
requirejs.setName('TextRect');
TextRect=function () {
 // テキストを描いて(type=="test"なら描いたふりをするだけ)， 描かれた部分の矩形領域を返す
    function draw(ctx, text, x, topY, h, align , type) {
        if (!align) align="center";
        ctx.textBaseline="top";
        setFontSize(ctx, h);
        var met=ctx.measureText(text);
        var res={y:topY, w: met.width, h:h};
        switch (align.substring(0,1).toLowerCase()) {
            case "l":
                res.x=x;
                break;
            case "r":
                res.x=x-met.width;
                break;
            case "c":
                res.x=x-met.width/2;
                break;
        }
        if (type=="fill") ctx.fillText(text, res.x,topY);
        if (type=="stroke") ctx.strokeText(text, res.x,topY);
        return res;
    }
    function setFontSize(ctx,sz) {
        var post=ctx.font.replace(/^[0-9\.]+/,"");
        ctx.font=sz+post;
    };
    return {draw:draw, setFontSize: setFontSize};
}();
// Skipped http://localhost:3002/js/lib/timbre.js
requirejs.setName('Tonyu.TraceTbl');
Tonyu.TraceTbl=function () {
    var TTB={};
    var POSMAX=1000000;
    var pathIdSeq=1;
    var PATHIDMAX=10000;
    var path2Id={}, id2Path=[];
    TTB.add=function (file, pos){
        var path=file.path();
        var pathId=path2Id[path];
        if (pathId==undefined) {
            pathId=pathIdSeq++;
            if (pathIdSeq>PATHIDMAX) pathIdSeq=0;
            path2Id[path]=pathId;
            id2Path[pathId]=path;
        }
        if (pos>=POSMAX) pos=POSMAX-1;
        var id=pathId*POSMAX+pos;
        return id;
    };
    TTB.decode=function (id) {
        var pos=id%POSMAX;
        var pathId=(id-pos)/POSMAX;
        var path=id2Path[pathId];
        if (path) {
            var f=FS.get(path);
            return TError("Trace info", f, pos);
        } else {
            return null;
            //return TError("Trace info", "unknown src id="+id, pos);
        }
    };
    return TTB;
};
if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
requirejs.setName('PatternParser');
define(["Tonyu"], function (Tonyu) {return Tonyu.klass({
	initialize: function (img) {
		this.img=img;
		this.height = img.height;
		this.width = img.width;
		var cv=this.newImage(img.width, img.height);
		var ctx=cv.getContext("2d");
		ctx.drawImage(img, 0,0);
		this.ctx=ctx;
		this.pixels=this.ctx.getImageData(0, 0, img.width, img.height).data;
		this.base=this.getPixel(0,0);
	},
	newImage: function (w,h) {
        var cv=document.createElement("canvas");
        cv.width=w;
        cv.height=h;
        return cv;
	},
	getPixel: function (x,y) {
		var imagePixelData = this.pixels;
		var ofs=(x+y*this.width)*4;
		var R = imagePixelData[0+ofs];
  		var G = imagePixelData[1+ofs];
  		var B = imagePixelData[2+ofs];
  		var A = imagePixelData[3+ofs];
  		return ((((A*256)+B)*256)+G)*256+R;
	},
	setPixel: function (x,y,p) {
	    var ofs=(x+y*this.width)*4;
	    this.pixels[0+ofs]=p & 255;
	    p=(p-(p&255))/256;
        this.pixels[1+ofs]=p & 255;
        p=(p-(p&255))/256;
        this.pixels[2+ofs]=p & 255;
        p=(p-(p&255))/256;
        this.pixels[3+ofs]=p & 255;
	},
	parse: function () {
  		try {
			//console.log("parse()");
  			var res=[];// List of charpattern
			for (var y=0; y<this.height ;y++) {
				for (var x=0; x<this.width ;x++) {
					var c=this.getPixel(x, y);
					if (c!=this.base) {
						res.push(this.parse1Pattern(x,y));
					}
				}
			}
			//console.log("parsed:"+res.lenth);
			return res;
  		} catch (p) {
  		    if (p.isParseError) {
  	            console.log("parse error! "+p);
  	            return {image: this.img, x:0, y:0, width:this.width, height:this.height};
  		    }
  		    throw p;
  		}
	},
  	parse1Pattern:function (x,y) {
		function hex(s){return s;}
		var trans=this.getPixel(x, y);
		var dx=x,dy=y;
		var base=this.base;
		var width=this.width, height=this.height;
		while (dx<width) {
			var pixel = this.getPixel(dx,dy);
			if (pixel!=trans) break;
			dx++;
		}
		if (dx>=width || this.getPixel(dx,dy)!=base) {
		    throw PatterParseError(dx,dy,hex(this.getPixel(dx,dy))+"!="+hex(base));
		}
		dx--;
		while (dy<height) {
			if (this.getPixel(dx,dy)!=trans) break;
			dy++;
		}
		if (dy>=height || this.getPixel(dx,dy)!=base) {
		    throw PatterParseError(dx,dy,hex(this.getPixel(dx,dy))+"!="+hex(base));
		}
		dy--;
		var sx=x+1,sy=y+1,w=dx-sx,h=dy-sy;
        //console.log(sx,sy,w,h,dx,dy);
		if (w*h==0) throw PatterParseError(dx, dy,"w*h==0");

        var newim=this.newImage(w,h);
        var nc=newim.getContext("2d");
        var newImD=nc.getImageData(0,0,w,h);
		var newD=newImD.data;
		var di=0;
		for (var ey=sy ; ey<dy ; ey++) {
			for (var ex=sx ; ex<dx ; ex++) {
			    var p=this.getPixel(ex, ey);
				if (p==trans) {
					newD[di++]=0;
					newD[di++]=(0);
					newD[di++]=(0);
					newD[di++]=(0);
				} else {
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
				}
			}
		}
        nc.putImageData(newImD,0,0);
		for (var yy=sy-1; yy<=dy; yy++) {
		    for (var xx=sx-1; xx<=dx; xx++) {
		        this.setPixel(xx,yy, base);
		    }
		}
		return {image:newim, x:0, y:0, width:w, height:h};
		function PatterParseError(x,y,msg) {
		    return {toString: function () {
		        return "at ("+x+","+y+") :"+msg;
		    }, isParseError:true};
		}
	}

});});
requirejs.setName('Parser');
Parser=function () {
    function extend(dst, src) {
        var i;
        for(i in src){
            dst[i]=src[i];
        }
        return dst;
    }
    var $={
        consoleBuffer:"",
        options: {traceTap:false, optimizeFirst: true, profile: false ,verboseFirst: false},
        Parser: Parser,
        StringParser: StringParser,
        nc: nc
    };
    $.dispTbl=function (tbl) {
    	var buf="";
    	var h={};
    	if (!tbl) return buf;
    	for (var i in tbl) {
    		var n=tbl[i].name;
    		if (!h[n]) h[n]="";
    		h[n]+=i;
    	}
    	for (var n in h) {
    		buf+=h[n]+"->"+n+",";
    	}
    	return buf;
    }
    //var console={log:function (s) { $.consoleBuffer+=s; }};
    function _debug(s) {console.log(s);}
    function Parser(parseFunc){
        this.parse=parseFunc;
    };
    Parser.create=function(parseFunc) { // (State->State)->Parser
        return new Parser(parseFunc);
    };
    $.create=Parser.create;
    function nc(v,name) {
    	if (v==null) throw name+" is null!";
    	return v;
    }
    extend(Parser.prototype, {// class Parser
        // Parser.parse:: State->State
        except: function (f) {
        	var t=this;
        	return Parser.create(function (s) {
        		var res=t.parse(s);
        		if (!res.success) return res;
        		if (f.apply({}, res.result)) {
        			res.success=false;
        		}
        		return res;
        	}).setName("(except "+t.name+")");
        },
        noFollow: function (p) {
            var t=this;
            nc(p,"p");
            return Parser.create(function (s) {
                var res=t.parse(s);
                if (!res.success) return res;
                var res2=p.parse(res);
                res.success=!res2.success;
                return res;
            }).setName("("+t.name+" noFollow "+p.name+")");
        },
        and: function(next) {// Parser.and:: (Function|Parser)  -> Parser
        	nc(next,"next"); // next==next
        	var t=this; // Parser
            var res=Parser.create(function(s){ //s:State
            	var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                var r2=next.parse(r1); //r2:State
                if (r2.success) {
                    r2.result=r1.result.concat(r2.result); // concat===append built in func in Array
                }
                return r2;
            });
            res._first=this._first;
            return res.setName("("+this.name+" "+next.name+")");
        },
        ret: function (f) {
            nc(f,"f");
            var t=this;
            var res=Parser.create(function(s){ //s:State
                var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                var r2=r1.clone();
                r2.result=[ f.apply({}, r1.result) ];
                return r2;
            });
            res._first=this._first;
            return res;
        },
        first: function (space, ct) {
        	if (space==null) throw "Space is null2!";
        	if (typeof ct=="string") {
        		this._first={space: space, chars:ct};
        	} else {
        		this._first={space: space, tbl:ct};
        	}
        	return this;
        },
        inheritFirst: function (p) {
            this._first=p._first;
            return this;
        },
        unifyFirst: function (other) {
        	//return null;
        	var tbl={}; // tbl.* includes tbl.ALL
        	function setTbl(src) {// src:Parser
        		var cs=src._first.chars;
        		function mk(c) {
        			if (!tbl[c]) {
        				if (!tbl.ALL) tbl[c]=src;
        				else tbl[c]=tbl.ALL.orNoUnify(src);
        			} else {
        				tbl[c]=tbl[c].orNoUnify(src);
        			}
        		}
        		if (cs) {
            		for (var i=0; i<cs.length ; i++) {
            			var c=cs.substring(i,i+1);
            			mk(c);
            		}
            	} else {
        			mk("ALL");
        			for (var i in tbl) {
        				if (i==="ALL") continue;
        				tbl[i]=tbl[i].orNoUnify(src);
        			}
            	}
        	}
        	function mergeTbl() {
        		var t2=other._first.tbl;
        		if ("ALL" in t2) {
            		for (var c in tbl) {
            			tbl[c]=tbl[c].orNoUnify(other);
            		}
            		for (var c in t2) {
            			if (!tbl[c]) {
            				tbl[c]=other;
            			}
            		}
        		} else {
        			for (var c in t2) {
        				if (!tbl[c]) {
        					tbl[c]=other;
        				} else {
        					tbl[c]=tbl[c].orNoUnify(other);
        				}
        			}
        		}
        	}
        	if (!this._first) return null;
        	if (!other._first) return null;
        	var space=this._first.space;
        	if (space!==other._first.space) return null;
        	if (space==null) throw "Space is null!";
        	if (this._first.tbl) extend(tbl, this._first.tbl);
        	else setTbl(this);
        	if (other._first.tbl) mergeTbl();
        	else setTbl(other);
        	var res=Parser.create(function (s0) {
        		var s=space.parse(s0);
        		var f=s.src.str.substring(s.pos,s.pos+1);
        		//console.log("name= "+this.name+" pos="+s.pos+" fst="+f+"  tbl="+$.dispTbl(tbl));
        		if (tbl[f]) {
            		//console.log("tbl[f].name="+tbl[f].name);
            		return tbl[f].parse(s);
        		}
        		if (tbl.ALL) return tbl.ALL.parse(s);
        		s.success=false;
        		return s;
        	});
        	res.first(space, tbl).setName("("+this.name+")U("+other.name+")");
        	if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
        	return res;
        },
        or: function(other) { // Parser->Parser
        	nc(other,"other");
        	var u=($.options.optimizeFirst ? this.unifyFirst(other): null);
        	if (u) return u;
        	else return this.orNoUnify(other);
        },
        orNoUnify: function (other) {
           	var t=this;  // t:Parser
        	var res=Parser.create(function(s){
        		var r1=t.parse(s); // r1:State
        		if (!r1.success){
        			var r2=other.parse(s); // r2:State
        			return r2;
        		} else {
        		    return r1;
        		}
        	});
        	res.name="("+this.name+")|("+other.name+")";
        	return res;
        },
        setName: function (n) {
        	this.name=n;
        	return this;
        },
        profile: function () {
            if ($.options.profile) {
                this.parse=this.parse.profile(this.name);
            }
        	return this;
        },
        repN: function(min){
        	var p=this;
        	if (!min) min=0;
        	var res=Parser.create(function(s) {
        		var current=s;
        		var result=[];
        		while(true){
        			var next=p.parse(current);
        			if(!next.success) {
        				var res;
        				if (result.length>=min) {
        					res=current.clone();
        					res.result=[result];
        					res.success=true;
        					//console.log("rep0 res="+disp(res.result));
        					return res;
        				} else {
        					res=s.clone();
        					res.success=false;
        					return res;
        				}
        			} else {
        				result.push(next.result[0]);
        				current=next;
        			}
        		}
        	});
        	if (min>0) res._first=p._first;
        	return res.setName("("+p.name+" * "+min+")");
        },
        rep0: function () { return this.repN(0); },
        rep1: function () { return this.repN(1); },
        opt: function () {
        	var t=this;
        	return Parser.create(function (s) {
        		var r=t.parse(s);
        		if (r.success) {
        			return r;
        		} else {
        			s=s.clone();
        			s.success=true;
        			s.result=[null];
        			return s;
        		}
        	}).setName("("+t.name+")?");
        },
        sep1: function(sep, valuesToArray) {
        	var value=this;
        	nc(value,"value");nc(sep,"sep");
        	var tail=sep.and(value).ret(function(r1, r2) {
                if(valuesToArray) return r2;
                return {sep:r1, value:r2};
            });
            return value.and(tail.rep0()).ret(function(r1, r2){
            	var i;
                if (valuesToArray) {
            		var r=[r1];
          			for (i in r2) {
           				r.push(r2[i]);
           			}
            		return r;
            	} else {
            		return {head:r1,tails:r2};
            	}
            }).setName("(sep1 "+value.name+"~~"+sep.name+")");
        },
        sep0: function(s){
        	return this.sep1(s,true).opt().ret(function (r) {
        		if (!r) return [];
        		return r;
        	});
        },
        tap: function (msg) {
        	if (!$.options.traceTap) return this;
        	if (!msg) msg="";
        	var t=this;
        	var res=Parser.create(function(s){
        		console.log("tap:"+msg+" name:"+t.name+"  pos="+(s?s.pos:"?"));
        		var r=t.parse(s);
        		var img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
        		console.log("/tap:"+msg+" name:"+t.name+" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
        		return r;
        	});
        	res._first=this._first;
        	return res.setName("(Tap "+t.name+")");
        },
        retN: function (i) {
        	return this.ret(function () {
        		return arguments[i];
        	});
        }
    });
    function State(str) { // class State
        if (typeof str=="string") {
            this.src={str:str, maxPos:0};// maxPos is shared by all state
            this.pos=0;
            this.result=[]
            this.success=true;
        }
    };
    extend(State.prototype, {
        clone: function() {
            var s=new State();
            s.src=this.src;
            s.pos=this.pos;
            s.result=this.result.slice();
            s.success=this.success;
            return s;
        },
        updateMaxPos:function (npos) {
        	if (npos > this.src.maxPos) {
        		this.src.maxPos=npos;
        	}
        },
        isSuccess: function () {
        	return this.success;
        }
    });
    var StringParser={
        empty: Parser.create(function(state) {
        	var res=state.clone();
        	res.success=true;
        	res.result=[null]; //{length:0, isEmpty:true}];
        	return res;
        }).setName("E"),
    	fail: Parser.create(function(s){
    	    s.success=false;
    	    return s;
    	}).setName("F"),
        str: function (st) { // st:String
        	return this.strLike(function (str,pos) {
        		if (str.substring(pos, pos+st.length)===st) return {len:st.length};
        		return null;
        	});
        },
        reg: function (r) {//r: regex (must have ^ at the head)
        	if (!(r+"").match(/^\/\^/)) console.log("Waring regex should have ^ at the head:"+(r+""));
        	return this.strLike(function (str,pos) {
        		var res=r.exec( str.substring(pos) );
        		if (res) {
        			res.len=res[0].length;
        			return res;
        		}
        		return null;
        	});
        },
        strLike: function (func) {
        	// func :: str,pos, state? -> {len:int, other...}  (null for no match )
            return Parser.create(function(state){
                var str= state.src.str;
                if (str==null) throw "strLike: str is null!";
                var spos=state.pos;
                //console.log(" strlike: "+str+" pos:"+spos);
                var r1=func(str, spos, state);
                if ($.options.traceToken) console.log("pos="+spos+" r="+r1);
                if(r1) {
                	if ($.options.traceToken) console.log("str:succ");
                	r1.pos=spos;
                	r1.src=state.src; // insert 2013/05/01
                	var ns=state.clone();
                    extend(ns, {pos:spos+r1.len, success:true, result:[r1]});
                    state.updateMaxPos(ns.pos);
                    return ns;
                }else{
                	if ($.options.traceToken) console.log("str:fail");
                    state.success=false;
                    return state;
                }
            }).setName("STRLIKE");
        },
    	parse: function (parser, str) {
    		var st=new State(str);
    		return parser.parse(st);
    	}
    };
    StringParser.eof=StringParser.strLike(function (str,pos) {
    	if (pos==str.length) return {len:0};
    	return null;
    }).setName("EOF");
    $.StringParser=StringParser;

    $.lazy=function (pf) { //   ( ()->Parser ) ->Parser
    	var p=null;
    	return Parser.create(function (st) {
    		if (!p) p=pf();
    		if (!p) throw pf+" returned null!";
    		this.name=pf.name;
    		return p.parse(st);
    	}).setName("LZ");
    };
    $.addRange=function(res, newr) {
    	if (newr==null) return res;
    	if (typeof (res.pos)!="number") {
    		res.pos=newr.pos;
    		res.len=newr.len;
    		return res;
    	}
    	var newEnd=newr.pos+newr.len;
    	var curEnd=res.pos+res.len;
    	if (newr.pos<res.pos) res.pos=newr.pos;
    	if (newEnd>curEnd) res.len= newEnd-res.pos;
    	return res;
    };
    $.setRange=function (res) {
    	if (res==null || typeof res=="string" || typeof res=="number") return;
    	var exRange=$.getRange(res);
    	if (exRange!=null) return res;
    	for (var i in res) {
    		if (!res.hasOwnProperty(i)) continue;
    		var range=$.setRange(res[i]);
    		$.addRange(res,range);
    	}
    	return res;
    };

	$.getRange=function(e) {
    	if (e==null) return null;
		if (typeof e.pos!="number") return null;
		if (typeof e.len=="number") return e;
		return null;
	};
    return $;
}();

requirejs.setName('fukidashi');
// From http://jsdo.it/hoge1e4/4wCX
//  (x,y) の位置に  V（←これ何て言うんだっけ） の先端が来るようにふきだし表示
function fukidashi(ctx, text, x, y, sz) {
    var align="c";
   var theight=20;
   var margin=5;
   var r=TextRect.draw(ctx, text, x,y-theight-margin-sz, sz, align);
   ctx.beginPath();
   ctx.moveTo(x , y);
   ctx.lineTo(x+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight);
   ctx.lineTo(x-margin , y-theight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
   //ctx.fillRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);
   //ctx.strokeRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);

   var fs=ctx.fillStyle;
   ctx.fillStyle=ctx.strokeStyle;
   TextRect.draw(ctx, text, x, y-theight-margin-sz, sz, align, "fill");
   ctx.fillStyle=fs;
}

requirejs.setName('difflib');
/***
This is part of jsdifflib v1.0. <http://snowtide.com/jsdifflib>

Copyright (c) 2007, Snowtide Informatics Systems, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this
		list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
		this list of conditions and the following disclaimer in the documentation
		and/or other materials provided with the distribution.
	* Neither the name of the Snowtide Informatics Systems nor the names of its
		contributors may be used to endorse or promote products derived from this
		software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
***/
/* Author: Chas Emerick <cemerick@snowtide.com> */
__whitespace = {" ":true, "\t":true, "\n":true, "\f":true, "\r":true};

difflib = {
	defaultJunkFunction: function (c) {
		return __whitespace.hasOwnProperty(c);
	},
	
	stripLinebreaks: function (str) { return str.replace(/^[\n\r]*|[\n\r]*$/g, ""); },
	
	stringAsLines: function (str) {
		var lfpos = str.indexOf("\n");
		var crpos = str.indexOf("\r");
		var linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? "\n" : "\r";
		
		var lines = str.split(linebreak);
		for (var i = 0; i < lines.length; i++) {
			lines[i] = difflib.stripLinebreaks(lines[i]);
		}
		
		return lines;
	},
	
	// iteration-based reduce implementation
	__reduce: function (func, list, initial) {
		if (initial != null) {
			var value = initial;
			var idx = 0;
		} else if (list) {
			var value = list[0];
			var idx = 1;
		} else {
			return null;
		}
		
		for (; idx < list.length; idx++) {
			value = func(value, list[idx]);
		}
		
		return value;
	},
	
	// comparison function for sorting lists of numeric tuples
	__ntuplecomp: function (a, b) {
		var mlen = Math.max(a.length, b.length);
		for (var i = 0; i < mlen; i++) {
			if (a[i] < b[i]) return -1;
			if (a[i] > b[i]) return 1;
		}
		
		return a.length == b.length ? 0 : (a.length < b.length ? -1 : 1);
	},
	
	__calculate_ratio: function (matches, length) {
		return length ? 2.0 * matches / length : 1.0;
	},
	
	// returns a function that returns true if a key passed to the returned function
	// is in the dict (js object) provided to this function; replaces being able to
	// carry around dict.has_key in python...
	__isindict: function (dict) {
		return function (key) { return dict.hasOwnProperty(key); };
	},
	
	// replacement for python's dict.get function -- need easy default values
	__dictget: function (dict, key, defaultValue) {
		return dict.hasOwnProperty(key) ? dict[key] : defaultValue;
	},	
	
	SequenceMatcher: function (a, b, isjunk) {
		this.set_seqs = function (a, b) {
			this.set_seq1(a);
			this.set_seq2(b);
		}
		
		this.set_seq1 = function (a) {
			if (a == this.a) return;
			this.a = a;
			this.matching_blocks = this.opcodes = null;
		}
		
		this.set_seq2 = function (b) {
			if (b == this.b) return;
			this.b = b;
			this.matching_blocks = this.opcodes = this.fullbcount = null;
			this.__chain_b();
		}
		
		this.__chain_b = function () {
			var b = this.b;
			var n = b.length;
			var b2j = this.b2j = {};
			var populardict = {};
			for (var i = 0; i < b.length; i++) {
				var elt = b[i];
				if (b2j.hasOwnProperty(elt)) {
					var indices = b2j[elt];
					if (n >= 200 && indices.length * 100 > n) {
						populardict[elt] = 1;
						delete b2j[elt];
					} else {
						indices.push(i);
					}
				} else {
					b2j[elt] = [i];
				}
			}
	
			for (var elt in populardict) {
				if (populardict.hasOwnProperty(elt)) {
					delete b2j[elt];
				}
			}
			
			var isjunk = this.isjunk;
			var junkdict = {};
			if (isjunk) {
				for (var elt in populardict) {
					if (populardict.hasOwnProperty(elt) && isjunk(elt)) {
						junkdict[elt] = 1;
						delete populardict[elt];
					}
				}
				for (var elt in b2j) {
					if (b2j.hasOwnProperty(elt) && isjunk(elt)) {
						junkdict[elt] = 1;
						delete b2j[elt];
					}
				}
			}
	
			this.isbjunk = difflib.__isindict(junkdict);
			this.isbpopular = difflib.__isindict(populardict);
		}
		
		this.find_longest_match = function (alo, ahi, blo, bhi) {
			var a = this.a;
			var b = this.b;
			var b2j = this.b2j;
			var isbjunk = this.isbjunk;
			var besti = alo;
			var bestj = blo;
			var bestsize = 0;
			var j = null;
	
			var j2len = {};
			var nothing = [];
			for (var i = alo; i < ahi; i++) {
				var newj2len = {};
				var jdict = difflib.__dictget(b2j, a[i], nothing);
				for (var jkey in jdict) {
					if (jdict.hasOwnProperty(jkey)) {
						j = jdict[jkey];
						if (j < blo) continue;
						if (j >= bhi) break;
						newj2len[j] = k = difflib.__dictget(j2len, j - 1, 0) + 1;
						if (k > bestsize) {
							besti = i - k + 1;
							bestj = j - k + 1;
							bestsize = k;
						}
					}
				}
				j2len = newj2len;
			}
	
			while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]) {
				besti--;
				bestj--;
				bestsize++;
			}
				
			while (besti + bestsize < ahi && bestj + bestsize < bhi &&
					!isbjunk(b[bestj + bestsize]) &&
					a[besti + bestsize] == b[bestj + bestsize]) {
				bestsize++;
			}
	
			while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]) {
				besti--;
				bestj--;
				bestsize++;
			}
			
			while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) &&
					a[besti + bestsize] == b[bestj + bestsize]) {
				bestsize++;
			}
	
			return [besti, bestj, bestsize];
		}
		
		this.get_matching_blocks = function () {
			if (this.matching_blocks != null) return this.matching_blocks;
			var la = this.a.length;
			var lb = this.b.length;
	
			var queue = [[0, la, 0, lb]];
			var matching_blocks = [];
			var alo, ahi, blo, bhi, qi, i, j, k, x;
			while (queue.length) {
				qi = queue.pop();
				alo = qi[0];
				ahi = qi[1];
				blo = qi[2];
				bhi = qi[3];
				x = this.find_longest_match(alo, ahi, blo, bhi);
				i = x[0];
				j = x[1];
				k = x[2];
	
				if (k) {
					matching_blocks.push(x);
					if (alo < i && blo < j)
						queue.push([alo, i, blo, j]);
					if (i+k < ahi && j+k < bhi)
						queue.push([i + k, ahi, j + k, bhi]);
				}
			}
			
			matching_blocks.sort(difflib.__ntuplecomp);
	
			var i1 = j1 = k1 = block = 0;
			var non_adjacent = [];
			for (var idx in matching_blocks) {
				if (matching_blocks.hasOwnProperty(idx)) {
					block = matching_blocks[idx];
					i2 = block[0];
					j2 = block[1];
					k2 = block[2];
					if (i1 + k1 == i2 && j1 + k1 == j2) {
						k1 += k2;
					} else {
						if (k1) non_adjacent.push([i1, j1, k1]);
						i1 = i2;
						j1 = j2;
						k1 = k2;
					}
				}
			}
			
			if (k1) non_adjacent.push([i1, j1, k1]);
	
			non_adjacent.push([la, lb, 0]);
			this.matching_blocks = non_adjacent;
			return this.matching_blocks;
		}
		
		this.get_opcodes = function () {
			if (this.opcodes != null) return this.opcodes;
			var i = 0;
			var j = 0;
			var answer = [];
			this.opcodes = answer;
			var block, ai, bj, size, tag;
			var blocks = this.get_matching_blocks();
			for (var idx in blocks) {
				if (blocks.hasOwnProperty(idx)) {
					block = blocks[idx];
					ai = block[0];
					bj = block[1];
					size = block[2];
					tag = '';
					if (i < ai && j < bj) {
						tag = 'replace';
					} else if (i < ai) {
						tag = 'delete';
					} else if (j < bj) {
						tag = 'insert';
					}
					if (tag) answer.push([tag, i, ai, j, bj]);
					i = ai + size;
					j = bj + size;
					
					if (size) answer.push(['equal', ai, i, bj, j]);
				}
			}
			
			return answer;
		}
		
		// this is a generator function in the python lib, which of course is not supported in javascript
		// the reimplementation builds up the grouped opcodes into a list in their entirety and returns that.
		this.get_grouped_opcodes = function (n) {
			if (!n) n = 3;
			var codes = this.get_opcodes();
			if (!codes) codes = [["equal", 0, 1, 0, 1]];
			var code, tag, i1, i2, j1, j2;
			if (codes[0][0] == 'equal') {
				code = codes[0];
				tag = code[0];
				i1 = code[1];
				i2 = code[2];
				j1 = code[3];
				j2 = code[4];
				codes[0] = [tag, Math.max(i1, i2 - n), i2, Math.max(j1, j2 - n), j2];
			}
			if (codes[codes.length - 1][0] == 'equal') {
				code = codes[codes.length - 1];
				tag = code[0];
				i1 = code[1];
				i2 = code[2];
				j1 = code[3];
				j2 = code[4];
				codes[codes.length - 1] = [tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)];
			}
	
			var nn = n + n;
			var group = [];
			var groups = [];
			for (var idx in codes) {
				if (codes.hasOwnProperty(idx)) {
					code = codes[idx];
					tag = code[0];
					i1 = code[1];
					i2 = code[2];
					j1 = code[3];
					j2 = code[4];
					if (tag == 'equal' && i2 - i1 > nn) {
						group.push([tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)]);
						groups.push(group);
						group = [];
						i1 = Math.max(i1, i2-n);
						j1 = Math.max(j1, j2-n);
					}
					
					group.push([tag, i1, i2, j1, j2]);
				}
			}
			
			if (group && !(group.length == 1 && group[0][0] == 'equal')) groups.push(group)
			
			return groups;
		}
		
		this.ratio = function () {
			matches = difflib.__reduce(
							function (sum, triple) { return sum + triple[triple.length - 1]; },
							this.get_matching_blocks(), 0);
			return difflib.__calculate_ratio(matches, this.a.length + this.b.length);
		}
		
		this.quick_ratio = function () {
			var fullbcount, elt;
			if (this.fullbcount == null) {
				this.fullbcount = fullbcount = {};
				for (var i = 0; i < this.b.length; i++) {
					elt = this.b[i];
					fullbcount[elt] = difflib.__dictget(fullbcount, elt, 0) + 1;
				}
			}
			fullbcount = this.fullbcount;
	
			var avail = {};
			var availhas = difflib.__isindict(avail);
			var matches = numb = 0;
			for (var i = 0; i < this.a.length; i++) {
				elt = this.a[i];
				if (availhas(elt)) {
					numb = avail[elt];
				} else {
					numb = difflib.__dictget(fullbcount, elt, 0);
				}
				avail[elt] = numb - 1;
				if (numb > 0) matches++;
			}
			
			return difflib.__calculate_ratio(matches, this.a.length + this.b.length);
		}
		
		this.real_quick_ratio = function () {
			var la = this.a.length;
			var lb = this.b.length;
			return _calculate_ratio(Math.min(la, lb), la + lb);
		}
		
		this.isjunk = isjunk ? isjunk : difflib.defaultJunkFunction;
		this.a = this.b = null;
		this.set_seqs(a, b);
	}
};


requirejs.setName('diffview');
/*
This is part of jsdifflib v1.0. <http://github.com/cemerick/jsdifflib>

Copyright 2007 - 2011 Chas Emerick <cemerick@snowtide.com>. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Chas Emerick ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Chas Emerick OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Chas Emerick.
*/
diffview = {
	/**
	 * Builds and returns a visual diff view.  The single parameter, `params', should contain
	 * the following values:
	 *
	 * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
	 * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
	 * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
	 * - baseTextName: the title to be displayed above the base text listing in the diff view; defaults
	 *	   to "Base Text"
	 * - newTextName: the title to be displayed above the new text listing in the diff view; defaults
	 *	   to "New Text"
	 * - contextSize: the number of lines of context to show around differences; by default, all lines
	 *	   are shown
	 * - viewType: if 0, a side-by-side diff view is generated (default); if 1, an inline diff view is
	 *	   generated
	 */
	buildView: function (params) {
		var baseTextLines = params.baseTextLines;
		var newTextLines = params.newTextLines;
		var opcodes = params.opcodes;
		var baseTextName = params.baseTextName ? params.baseTextName : "Base Text";
		var newTextName = params.newTextName ? params.newTextName : "New Text";
		var contextSize = params.contextSize;
		var inline = (params.viewType == 0 || params.viewType == 1) ? params.viewType : 0;

		if (baseTextLines == null)
			throw "Cannot build diff view; baseTextLines is not defined.";
		if (newTextLines == null)
			throw "Cannot build diff view; newTextLines is not defined.";
		if (!opcodes)
			throw "Canno build diff view; opcodes is not defined.";
		
		function celt (name, clazz) {
			var e = document.createElement(name);
			e.className = clazz;
			return e;
		}
		
		function telt (name, text) {
			var e = document.createElement(name);
			e.appendChild(document.createTextNode(text));
			return e;
		}
		
		function ctelt (name, clazz, text) {
			var e = document.createElement(name);
			e.className = clazz;
			e.appendChild(document.createTextNode(text));
			return e;
		}
	
		var tdata = document.createElement("thead");
		var node = document.createElement("tr");
		tdata.appendChild(node);
		if (inline) {
			node.appendChild(document.createElement("th"));
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", baseTextName + " vs. " + newTextName));
		} else {
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", baseTextName));
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", newTextName));
		}
		tdata = [tdata];
		
		var rows = [];
		var node2;
		
		/**
		 * Adds two cells to the given row; if the given row corresponds to a real
		 * line number (based on the line index tidx and the endpoint of the 
		 * range in question tend), then the cells will contain the line number
		 * and the line of text from textLines at position tidx (with the class of
		 * the second cell set to the name of the change represented), and tidx + 1 will
		 * be returned.	 Otherwise, tidx is returned, and two empty cells are added
		 * to the given row.
		 */
		function addCells (row, tidx, tend, textLines, change) {
			if (tidx < tend) {
				row.appendChild(telt("th", (tidx + 1).toString()));
				row.appendChild(ctelt("td", change, textLines[tidx].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")));
				return tidx + 1;
			} else {
				row.appendChild(document.createElement("th"));
				row.appendChild(celt("td", "empty"));
				return tidx;
			}
		}
		
		function addCellsInline (row, tidx, tidx2, textLines, change) {
			row.appendChild(telt("th", tidx == null ? "" : (tidx + 1).toString()));
			row.appendChild(telt("th", tidx2 == null ? "" : (tidx2 + 1).toString()));
			row.appendChild(ctelt("td", change, textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")));
		}
		
		for (var idx = 0; idx < opcodes.length; idx++) {
			code = opcodes[idx];
			change = code[0];
			var b = code[1];
			var be = code[2];
			var n = code[3];
			var ne = code[4];
			var rowcnt = Math.max(be - b, ne - n);
			var toprows = [];
			var botrows = [];
			for (var i = 0; i < rowcnt; i++) {
				// jump ahead if we've alredy provided leading context or if this is the first range
				if (contextSize && opcodes.length > 1 && ((idx > 0 && i == contextSize) || (idx == 0 && i == 0)) && change=="equal") {
					var jump = rowcnt - ((idx == 0 ? 1 : 2) * contextSize);
					if (jump > 1) {
						toprows.push(node = document.createElement("tr"));
						
						b += jump;
						n += jump;
						i += jump - 1;
						node.appendChild(telt("th", "..."));
						if (!inline) node.appendChild(ctelt("td", "skip", ""));
						node.appendChild(telt("th", "..."));
						node.appendChild(ctelt("td", "skip", ""));
						
						// skip last lines if they're all equal
						if (idx + 1 == opcodes.length) {
							break;
						} else {
							continue;
						}
					}
				}
				
				toprows.push(node = document.createElement("tr"));
				if (inline) {
					if (change == "insert") {
						addCellsInline(node, null, n++, newTextLines, change);
					} else if (change == "replace") {
						botrows.push(node2 = document.createElement("tr"));
						if (b < be) addCellsInline(node, b++, null, baseTextLines, "delete");
						if (n < ne) addCellsInline(node2, null, n++, newTextLines, "insert");
					} else if (change == "delete") {
						addCellsInline(node, b++, null, baseTextLines, change);
					} else {
						// equal
						addCellsInline(node, b++, n++, baseTextLines, change);
					}
				} else {
					b = addCells(node, b, be, baseTextLines, change);
					n = addCells(node, n, ne, newTextLines, change);
				}
			}

			for (var i = 0; i < toprows.length; i++) rows.push(toprows[i]);
			for (var i = 0; i < botrows.length; i++) rows.push(botrows[i]);
		}
		
		rows.push(node = ctelt("th", "author", "diff view generated by "));
		node.setAttribute("colspan", inline ? 3 : 4);
		node.appendChild(node2 = telt("a", "jsdifflib"));
		node2.setAttribute("href", "http://github.com/cemerick/jsdifflib");
		
		tdata.push(node = document.createElement("tbody"));
		for (var idx in rows) rows.hasOwnProperty(idx) && node.appendChild(rows[idx]);
		
		node = celt("table", "diff" + (inline ? " inlinediff" : ""));
		for (var idx in tdata) tdata.hasOwnProperty(idx) && node.appendChild(tdata[idx]);
		return node;
	}
};


requirejs.setName('Grammar');
Grammar=function () {
	var p=Parser;

	var $=null;
	function trans(name) {
		if (typeof name=="string") return $.get(name);
		return name;
	}
	function tap(name) {
		return p.Parser.create(function (st) {
			console.log("Parsing "+name+" at "+st.pos+"  "+st.src.str.substring(st.pos, st.pos+20).replace(/[\r\n]/g,"\\n"));
			return st;
		});
	}
	$=function (name){
		var $$={};
		$$.ands=function() {
			var p=trans(arguments[0]);  //  ;
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.and( trans(arguments[i]) );
			}
			p=p.tap(name);
			$.defs[name]=p;
			var $$$={};
			$$$.autoNode=function () {
                var res=p.ret(function () {
                    var res={type:name};
                    for (var i=0 ; i<arguments.length ;i++) {
                        var e=arguments[i];
                        var rg=Parser.setRange(e);
                        Parser.addRange(res, rg);
                        res["-element"+i]=e;
                    }
                    res.toString=function () {
                        return "("+this.type+")";
                    };
                }).setName(name);
                return $.defs[name]=res;
			};
			$$$.ret=function (f) {
				if (arguments.length==0) return p;
				if (typeof f=="function") {
					return $.defs[name]=p.ret(f);
				}
				var names=[];
				var fn=function(e){return e;};
				for (var i=0 ; i<arguments.length ;i++) {
					if (typeof arguments[i]=="function") {
						fn=arguments[i];
						break;
					}
					names[i]=arguments[i];
				}
				var res=p.ret(function () {
					var res={type:name};
					res[Grammar.SUBELEMENTS]=[];
					for (var i=0 ; i<arguments.length ;i++) {
						var e=arguments[i];
						var rg=Parser.setRange(e);
						Parser.addRange(res, rg);
						if (names[i]) {
							res[names[i]]=e;
						}
						res[Grammar.SUBELEMENTS].push(e);
					}
					res.toString=function () {
						return "("+this.type+")";
					};
					return fn(res);
				}).setName(name);
				return  $.defs[name]=res;
			};
			return $$$;
		};
		$$.ors= function () {
			var p=trans(arguments[0]);
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.or( trans(arguments[i]) );
			}
			return $.defs[name]=p.setName(name);
		};
		return $$;
	};

	$.defs={};
	$.get=function (name) {
		if ($.defs[name]) return $.defs[name];
		return p.lazy(function () {
			var r=$.defs[name];
		    if (!r) throw "grammar named '"+name +"' is undefined";
			return r;
		}).setName("(Lazy of "+name+")");
	};
	return $;
};
Grammar.SUBELEMENTS="[SUBELEMENTS]";
requirejs.setName('XMLBuffer');
// var b=XMLBuffer(src);
// b(node);
// console.log(b.buf);
function XMLBuffer(src) {
	var $;
	$=function (node, attrName){
		//console.log("genX: "+node+ " typeof = "+typeof node+"  pos="+node.pos+" attrName="+attrName+" ary?="+(node instanceof Array));
		if (node==null || typeof node=="string" || typeof node=="number") return;
		var r=Parser.getRange(node);
		if (r) {
			while ($.srcLen < r.pos) {
				$.src(src.substring($.srcLen, r.pos));
			}
		}
		if (node==null) return;
		if (attrName) $.tag("<attr_"+attrName+">");
		if (node.type) $.tag("<"+node.type+">");
		if (node.text) $.src(r.text);
		else {
			var n=$.orderByPos(node);
			n.forEach(function (subnode) {
				if (subnode.name && subnode.name.match(/^-/)) {
					$(subnode.value);
				} else {
					$(subnode.value, subnode.name);
				}
			});
		}
		if (r) {
			while ($.srcLen < r.pos+r.len) {
				$.src(src.substring($.srcLen, r.pos+r.len));
			}
		}
		if (node.type) $.tag("</"+node.type+">");
		if (attrName) $.tag("</attr_"+attrName+">");
	};
	$.orderByPos=XMLBuffer.orderByPos;/*function (node) {
		var res=[];
		if (node[XMLBuffer.SUBELEMENTS]) {
			node[XMLBuffer.SUBELEMENTS].forEach(function (e) {
				res.push(e);
			});
		} else {
			for (var i in node) {
				if (!node.hasOwnProperty(i)) continue;
				if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
				if (typeof(node[i].pos)!="number") continue;
				if (isNaN(parseInt(i)) && !(i+"").match(/-/)) { 			res.push({name: i, value: node[i]}); }
				else { 			res.push({value: node[i]}); }
			}
		}
		res=res.sort(function (a,b) {
			return a.value.pos-b.value.pos;
		});
		return res;
	};*/
	$.src=function (str) {
		$.buf+=str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
		$.srcLen+=str.length;
	};
	$.tag=function (str) {
		$.buf+=str;
	};

	$.buf="";
	$.srcLen=0;
	return $;
}
XMLBuffer.orderByPos=function (node) {
	var res=[];
	if (node[XMLBuffer.SUBELEMENTS]) {
		node[XMLBuffer.SUBELEMENTS].forEach(function (e) {
			res.push(e);
		});
	} else {
		for (var i in node) {
			if (!node.hasOwnProperty(i)) continue;
			if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
			if (typeof(node[i].pos)!="number") continue;
			if (isNaN(parseInt(i)) && !(i+"").match(/-/)) { 			res.push({name: i, value: node[i]}); }
			else { 			res.push({value: node[i]}); }
		}
	}
	res=res.sort(function (a,b) {
		return a.value.pos-b.value.pos;
	});
	return res;
};
XMLBuffer.SUBELEMENTS="[SUBELEMENTS]";
requirejs.setName('ExpressionParser');
// parser.js の補助ライブラリ．式の解析を担当する
function ExpressionParser() {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
	    var $={};
	    $.eq=function (o) {return type==o.type() && prio==o.prio(); };
        $.type=function (t) { if (!t) return type; else return t==type;};
	    $.prio=function () {return prio;};
	    $.toString=function () {return "["+type+":"+prio+"]"; }
	    return $;
	}
	function composite(a) {
	    var $={};
	    var e=a;
	    $.add=function (a) {
	        if (!e) {
	            e=a;
	        } else {
	            e=e.or(a);
	        }
	    };
	    $.get=function () {
	        return e;
	    };
	    return $;
	}
	function typeComposite() {
	    var built=composite();
	    //var lastOP , isBuilt;
	    var $={};
	    $.reg=function (type, prio, a) {
	        var opt=opType(type, prio);
            built.add(Parser.create(function (st) {
                if (st.src==null) console.log("st src null! at "+eg.name);
                var r=a.parse(st);
                if (r.isSuccess()) {
                    r.opType=opt;
                }
                return r;
            }).setName("(opType "+opt+" "+a.name+")").inheritFirst(a));
	    };
	    $.get=function () {return built.get();};
	    $.parse=function (st) {
	        return $.get().parse(st);
	    };
	    return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
	var trifixes=[];
	$.element=function (e) {
        prefixOrElement.reg("element", -1, e);
        element.add(e);
	};
	$.getElement=function () {return element.get();};
	$.prefix=function (prio, pre) {
	    prefixOrElement.reg("prefix", prio, pre);
	};
	$.postfix=function (prio, post) {
        postfixOrInfix.reg("postfix", prio, post);
	};
	$.infixl =function (prio, inf) {
        postfixOrInfix.reg("infixl", prio, inf);
	};
	$.infixr =function (prio, inf) {
        postfixOrInfix.reg("infixr", prio, inf);
	};
	$.infix =function (prio, inf) {
        postfixOrInfix.reg("infix", prio, inf);
	};
	$.trifixr = function (prio, tf1, tf2) {
        postfixOrInfix.reg("trifixr", prio, tf1);
        //postfixOrInfix.reg("trifixr2", prio, tf2);
        trifixes[prio]=tf2;
	};
	$.custom = function (prio, func) {
		// func :: Elem(of next higher) -> Parser
	};
	$.mkInfix=function (f) {
		$.mkInfix.def=f;
	};
	$.mkInfix.def=function (left,op,right) {
		return Parser.setRange({type:"infix", op:op, left: left, right: right});
	}
	$.mkInfixl=function (f) {
		$.mkInfixl.def=f;
	};
	$.mkInfixl.def=function (left, op , right) {
		return Parser.setRange({type:"infixl",op:op ,left:left, right:right});
	};
	$.mkInfixr=function (f) {
		$.mkInfixr.def=f;
	};
	$.mkInfixr.def=function (left, op , right) {
		return Parser.setRange({type:"infixr",op:op ,left:left, right:right});
	};
	$.mkPrefix=function (f) {
		$.mkPrefix.def=f;
	};
	$.mkPrefix.def=function (op , right) {
		return Parser.setRange({type:"prefix", op:op, right:right});
	};
	$.mkPostfix=function (f) {
		$.mkPostfix.def=f;
	};
	$.mkPostfix.def=function (left, op) {
		return Parser.setRange({type:"postfix", left:left, op:op});
	};
	$.mkTrifixr=function(f) {
	    $.mkTrifixr.def=f;
	};
	$.mkTrifixr.def=function (left, op1, mid, op2, right) {
        return Parser.setRange({type:"trifixr", left:left, op1:op1, mid:mid, op2:op2, right:right});
	};
	$.build= function () {
	    //postfixOrInfix.build();
        //prefixOrElement.build();
	    $.built= Parser.create(function (st) {
	        return parse(0,st);
	    }).setName("ExpBuilt");
	    return $.built;
	};
	function dump(st, lbl) {
	    return ;
	    var s=st.src.str;
	    console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
	            " opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);
	}
	function parse(minPrio, st) {
	    var stat=0, res=st ,  opt;
	    dump(st," start minprio= "+minPrio);
	    st=prefixOrElement.parse(st);
        dump(st," prefixorelem "+minPrio);
	    if (!st.isSuccess()) {
	        return st;
	    }
	    //p2=st.result[0];
        opt=st.opType;
	    if (opt.type("prefix") ) {
	        // st = -^elem
	        pre=st.result[0];
	        st=parse(opt.prio(), st);
	        if (!st.isSuccess()) {
	            return st;
	        }
  	        // st: Expr    st.pos = -elem^
	        var pex=$.mkPrefix.def(pre, st.result[0]);
	        res=st.clone();  //  res:Expr
	        res.result=[pex]; // res:prefixExpr  res.pos= -elem^
	        if (!st.nextPostfixOrInfix) {
	            return res;
	        }
	        // st.next =  -elem+^elem
	        st=st.nextPostfixOrInfix;  // st: postfixOrInfix
	    } else { //elem
	        //p=p2;
	        res=st.clone(); // res:elemExpr   res =  elem^
            st=postfixOrInfix.parse(st);
            if (!st.isSuccess()) {
                return res;
            }
	    }
	    // assert st:postfixOrInfix  res:Expr
	    while (true) {
	        dump(st,"st:pi"); dump(res,"res:ex");
	        opt=st.opType;
	        if (opt.prio()<minPrio) {
	            res.nextPostfixOrInfix=st;
	            return res;
	        }
	        // assert st:postfixOrInfix  res:Expr
	        if (opt.type("postfix")) {
	            // st:postfix
	            var pex=$.mkPostfix.def(res.result[0],st.result[0]);
	            res=st.clone();
	            res.result=[pex]; // res.pos= expr++^
	            dump(st, "185");
	            st=postfixOrInfix.parse(st); // st. pos= expr++--^
	            if (!st.isSuccess()) {
	                return res;
	            }
	        } else if (opt.type("infixl")){  //x+y+z
	            // st: infixl
	            var inf=st.result[0];
	            st=parse(opt.prio()+1, st);
	            if (!st.isSuccess()) {
	                return res;
	            }
	            // st: expr   st.pos=  expr+expr^
	            var pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
	            res=st.clone();
	            res.result=[pex]; //res:infixlExpr
	            if (!st.nextPostfixOrInfix) {
	                return res;
	            }
	            st=st.nextPostfixOrInfix;
	        } else if (opt.type("infixr")) { //a=^b=c
                // st: infixr
                var inf=st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  a=b=c^
                var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
                res=st.clone();
                res.result=[pex]; //res:infixrExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
            } else if (opt.type("trifixr")) { //left?^mid:right
                // st: trifixr
                var left=res.result[0];
                var inf1=st.result[0];  // inf1 =  ?
                st=parse(opt.prio()+1 ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st= expr   st.pos=  left?mid^:right
                var mid=st.result[0];
                var st=trifixes[opt.prio()].parse(st);
                // st= :      st.pos= left?mid:^right;
                if (!st.isSuccess()) {
                    return res;
                }
                var inf2= st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                var right=st.result[0];
                // st=right      st.pos= left?mid:right^;
                var pex=$.mkTrifixr.def(left, inf1 , mid, inf2, right);
                res=st.clone();
                res.result=[pex]; //res:infixrExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
	        } else { // infix
                // st: infixl
                var inf=st.result[0];
                st=parse(opt.prio()+1 ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                var pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
                res=st.clone();
                res.result=[pex]; //res:infixExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
                if (opt.prio()==st.opType.prio()) {
                    res.success=false;
                    return res;
                }
	        }
	        // assert st:postfixOrInfix  res:Expr
	    }
	}
	$.lazy = function () {
		return Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
}
requirejs.setName('TonyuLang');
/*
 * Tonyu2 の構文解析を行う．
 * TonyuLang.parse(src);
 *   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
 */
/*
sys.load("js/parser.js");
sys.load("js/ExpressionParser2.js");
sys.load("js/Grammar.js");
sys.load("js/XMLBuffer.js");
sys.load("js/IndentBuffer.js");
sys.load("js/disp.js");
sys.load("js/profiler.js");
*/


TonyuLang=function () {
	var p=Parser;
	var $={};
	var g=Grammar();
    var G=g.get;

    var sp=p.StringParser;//(str);
    var spaceRaw=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/);
    /*var space=Parser.create(function (s) {
        var res=spaceCache[s.pos];
        if (res) {
            res.success=true;
            return res;
        }
        res=spaceRaw.parse(s);
        spaceCache[s.pos]=res;
        return res;
    }).setName("space").profile();*/
    var space=spaceRaw;
    //var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\n)*)*/).setName("space").profile();
    function tk(r, f) {
        var pat;
        var fst;
        if (typeof r=="string") {
            pat=sp.str(r);
            if (r.length>0) fst=r.substring(0,1);
        } else {
            pat=sp.reg(r);
        }
        var res=space.ret(function (t) {
            //console.log(r+" - "+t.src.str.substring(t.pos, t.pos+20).replace(/\r?\n/g,""));
            return t;
        }).and(pat).ret(function(a, b) {
            if (typeof f == "function")
                return f(b);
            if (typeof f == "number")
                return b[f];
            var res={};
            res.pos=b.pos;
            res.len=b.len;
            res.text=b.src.str.substring(res.pos, res.pos+res.len);
            res.toString=function (){
                return this.text;//+"("+this.pos+")";
            };
            //res.text=str.substring(b.pos, b.pos+b.len);
            //console.log("b.text="+b.text);
            res.type="token";
            return res;
        });
        if (fst) res.first(space, fst);
        return res.setName(r+"").profile();
    }
    var reserved={"function":true, "var":true , "return":true, "typeof": true, "if":true,
                 "for":true,
                 "super": true,
                 "while":true,
                 "break":true,
                 "do":true,
                 "switch":true,
                 "try": true,
                 "catch": true,
                 "finally": true,
                 "in": true,
                 fiber:true,
                 "native": true,
                 "instanceof":true,
                 "new": true,
                 "is": true,
                 "true": true,
                 "false": true,
                 "null":true,
                 "this":true,
                 "undefined": true,
                 "usethread": true,
                 "constructor": true,
                 ifwait:true,
                 nowait:true,
                 arguments:true,
                 "delete": true
    };
    var num=tk(/^[0-9\.]+/).ret(function (n) {
        n.type="number";
        n.value=parseFloat(n.text);
        //console.log("n.val="+n.value);
        return n;
    }).first(space,"0123456789");
    var symbol=tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/).except(function (s) {
        return reserved.hasOwnProperty(s.text);
    }).ret(function (s) {
        s.type="symbol";return s;
    }).first(space/*,"_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$"*/).setName("symbol");
    var eqq=tk("===");
    var nee=tk("!==");
    var eq=tk("==");
    var ne=tk("!=");
    var ge=tk(">=");
    var le=tk("<=");
    var gt=tk(">");
    var lt=tk("<");
    var andand=tk("&&");
    var oror=tk("||");

    var minus=tk("-");//.first(space,"-");
    var plus=tk("+");//.first(space,"+");
    var mul=tk("*");
    var div=tk("/");
    var mod=tk("%");
    var assign=tk("=").noFollow(sp.str("="));
    var literal=tk({exec: function (s) {
        var head=s.substring(0,1);
        if (head!=='"' && head!=="'") return false;
        for (var i=1 ;i<s.length ; i++) {
            var c=s.substring(i,i+1);
            if (c===head) {
                return [s.substring(0,i+1)];
            } else if (c==="\\") {
                i++;
            }
        }
        return false;
    },toString:function(){return"/^literal";}
    }).ret(function (s) {
        s.type="literal";
        return s;
    }).first(space,"\"'");
    var regex=tk({exec: function (s) {
        if (s.substring(0,1)!=='/') return false;
        for (var i=1 ;i<s.length ; i++) {
            var c=s.substring(i,i+1);
            if (c==='/') {
                return [s.substring(0,i+1)];
            } else if (c==="\\") {
                i++;
            }
        }
        return false;
    },toString:function(){return"/^regex";}
    }).ret(function (s) {
        s.type="regex";
        return s;
    }).first(space,"/");
    function retF(n) {
        return function () {
            return arguments[n];
        };
    }

    var e=ExpressionParser() ;
    var arrayElem=g("arrayElem").ands(tk("["), e.lazy() , tk("]")).ret(null,"subscript");
    var argList=g("argList").ands(tk("("), e.lazy().sep0(tk(","),true) , tk(")")).ret(null,"args");
    var member=g("member").ands(tk(".") , symbol ).ret(null,     "name" );
    var parenExpr = g("parenExpr").ands(tk("("), e.lazy() , tk(")")).ret(null,"expr");
    var varAccess = g("varAccess").ands(symbol).ret("name");
    var funcExpr_l=G("funcExpr").first(space,"f\\");
    var funcExprArg=g("funcExprArg").ands(funcExpr_l).ret("obj");
    var objlit_l=G("objlit").first(space,"{");
    var objlitArg=g("objlitArg").ands(objlit_l).ret("obj");
    var objOrFuncArg=objlitArg.or(funcExprArg);
    function genCallBody(argList, oof) {
    	var res=[];
    	if (argList) argList.args.forEach(function (arg) {
    		res.push(arg);
    	});
    	oof.forEach(function (o) {
    		res.push(o.obj);
    	});
    	return res;
    }
    var callBody=argList.and(objOrFuncArg.rep0()).ret(function(a,oof) {
    	return genCallBody(a,oof);
    }).or(objOrFuncArg.rep1().ret(function (oof) {
    	return genCallBody(null,oof);
    }));
    var callBodyOld=argList.or(objlitArg);
    var call=g("call").ands( callBody ).ret("args");
    var scall=g("scall").ands( callBody ).ret("args");//supercall
    var newExpr = g("newExpr").ands(tk("new"),varAccess, call.opt()).ret(null, "klass","params");
    var superExpr =g("superExpr").ands(
            tk("super"), tk(".").and(symbol).ret(retF(1)).opt() , scall).ret(
            null,                 "name",                       "params");
    var reservedConst = tk("true").or(tk("false")).
    or(tk("null")).
    or(tk("undefined")).
    or(tk("this")).
    or(tk("arguments")).ret(function (t) {
        t.type="reservedConst";
        return t;
    });
    e.element(num);
    e.element(reservedConst);
    e.element(regex);
    e.element(literal);
    e.element(parenExpr);
    e.element(newExpr);
    e.element(superExpr);
    e.element(funcExpr_l);
    e.element(objlit_l);
    e.element(G("arylit").first(space,"["));
    e.element(varAccess);
    var prio=0;
    e.infixr(prio,assign);
    e.infixr(prio,tk("+="));
    e.infixr(prio,tk("-="));
    e.infixr(prio,tk("*="));
    e.infixr(prio,tk("/="));
    e.infixr(prio,tk("%="));
    e.infixr(prio,tk("|="));
    e.infixr(prio,tk("&="));
    prio++;
    e.trifixr(prio,tk("?"), tk(":"));
    prio++;
    e.infixl(prio,oror);
    prio++;
    e.infixl(prio,andand);
    prio++;
    e.infix(prio,tk("instanceof"));
    //e.infix(prio,tk("in"));
    e.infix(prio,eqq);
    e.infix(prio,nee);
    e.infix(prio,eq);
    e.infix(prio,ne);
    e.infix(prio,ge);
    e.infix(prio,le);
    e.infix(prio,gt);
    e.infix(prio,lt);
    prio++;
    e.postfix(prio+3,tk("++"));
    e.postfix(prio+3,tk("--"));
    e.infixl(prio,minus);
    e.infixl(prio,plus);
    prio++;
    e.infixl(prio,mul);
    e.infixl(prio,div);
    e.infixl(prio,mod);
    prio++;
    e.prefix(prio,tk("typeof"));
    e.prefix(prio,tk("delete"));
    e.prefix(prio,tk("++"));
    e.prefix(prio,tk("--"));
    e.prefix(prio,tk("+"));
    e.prefix(prio,tk("-"));
    e.prefix(prio,tk("!"));
    prio++;
//    e.postfix(prio,tk("++"));
//    e.postfix(prio,tk("--"));

    prio++;
    e.postfix(prio,call);
    e.postfix(prio,member);
    e.postfix(prio,arrayElem);
    function mki(left, op ,right) {
        var res={type:"infix",left:left,op:op,right:right};
        Parser.setRange(res);
        res.toString=function () {
            return "("+left+op+right+")";
        };
        return res;
    }
    e.mkInfixl(mki);
    e.mkInfixr(mki);
    /*e.mkPostfix(function (p) {
        return {type:"postfix", expr:p};
    });*/
    var expr=e.build().setName("expr").profile();
    var retF=function (i) { return function (){ return arguments[i];}; };

    var stmt=G("stmt").first(space);
    var exprstmt=g("exprstmt").ands(expr,tk(";")).ret("expr");
    g("compound").ands(tk("{"), stmt.rep0(),tk("}")).ret(null,"stmts") ;
    var elseP=tk("else").and(stmt).ret(retF(1));
    var returns=g("return").ands(tk("return"),expr.opt(),tk(";") ).ret(null,"value");
    var ifs=g("if").ands(tk("if"), tk("("), expr, tk(")"), stmt, elseP.opt() ).ret(null, null,"cond",null,"then","_else");
    /*var trailFor=tk(";").and(expr.opt()).and(tk(";")).and(expr.opt()).ret(function (s, cond, s2, next) {
        return {cond: cond, next:next  };
    });*/
    var forin=g("forin").ands(tk("var").opt(), symbol.sep1(tk(","),true), tk("in"), expr).ret(
                                       "isVar", "vars",null, "set" );
    var normalFor=g("normalFor").ands(stmt, expr.opt() , tk(";") , expr.opt()).ret(
                                     "init", "cond",     null, "next");
    /*var infor=expr.and(trailFor.opt()).ret(function (a,b) {
        if (b==null) return {type:"forin", expr: a};
        return {type:"normalFor", init:a, cond: b.cond, next:b.next  };
    });*/
    var infor=normalFor.or(forin);
    var fors=g("for").ands(tk("for"),tk("("), infor , tk(")"),"stmt" ).ret(
                               null,null,    "inFor", null   ,"loop");
    //var fors=g("for").ands(tk("for"),tk("("), tk("var").opt() , infor , tk(")"),"stmt" ).ret(null,null,"isVar", "inFor",null, "loop");
    var whiles=g("while").ands(tk("while"), tk("("), expr, tk(")"), "stmt").ret(null,null,"cond",null,"loop");
    var breaks=g("break").ands(tk("break"), tk(";")).ret("brk");
    var fins=g("finally").ands(tk("finally"), "stmt" ).ret(null, "stmt");
    var catchs=g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt" ).ret(null,null,"name",null, "stmt");
    var catches=g("catches").ors("catch","finally");
    var trys=g("try").ands(tk("try"),"stmt",catches.rep1() ).ret(null, "stmt","catches");
    var varDecl=g("varDecl").ands(symbol, tk("=").and(expr).ret(retF(1)).opt() ).ret("name","value");
    var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
    g("funcDeclHead").ands(
            tk("nowait").opt(),
            tk("function").or(tk("fiber")).or(tk("constructor")).or(tk("\\")).opt(),
            symbol.or(tk("new")) ,"paramDecls").ret("nowait","ftype","name","params");
    var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
    var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
    var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
    var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
    stmt=g("stmt").ors("return", "if", "for", "while", "break", "ifWait","try", "nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
    // ------- end of stmts
    var paramDecl= g("paramDecl").ands(symbol ).ret("name");
    var paramDecls=g("paramDecls").ands(tk("("), paramDecl.sep0(tk(","),true), tk(")")  ).ret(null, "params");
    g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
    var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
    var jsonElem=g("jsonElem").ands(
            symbol.or(literal),
            tk(":").and(expr).ret(function (c,v) {return v;}).opt()
    ).ret("key","value");
    var objlit=g("objlit").ands(tk("{"), jsonElem.sep0(tk(","),true),  tk("}")).ret(null, "elems");
    var arylit=g("arylit").ands(tk("["), expr.sep0(tk(","),true),  tk("]")).ret(null, "elems");
    var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).ret(null, "superClassName");
    var program=g("program").ands(ext.opt(),stmt.rep0(), space, sp.eof).ret("ext","stmts");

    for (var i in g.defs) {
        g.defs[i].profile();
    }
    $.parse = function (file) {
        if (typeof file=="string") {
            str=file;
        } else {
            str=file.text();
        }
        str+="\n"; // For end with // comment with no \n
	    //console.log("Parse Start");
		var res=sp.parse(program, str);
		//console.log("POS="+res.src.maxPos);
		if (res.isSuccess() ) {
			var node=res.result[0];
			return node;
		}
		throw TError("文法エラー", file ,  res.src.maxPos);
		//throw "ERROR\nSyntax error at "+res.src.maxPos+"\n"+res.src.str.substring(0,res.src.maxPos)+"!!HERE!!"+res.src.str.substring(res.src.maxPos);
	};
	$.genXML= function (src, node) {
		var x=XMLBuffer(src) ;
		x(node);
        return x.buf;
	};
	return $;
}();

requirejs.setName('fixIndent');
function fixIndent(str, indentStr) {
    if (!indentStr) indentStr="    ";
    var incdec={"{":1, "}":-1};
    var linfo=[];
    try {
        var node=TonyuLang.parse(str);
        var v=Visitor({
            token: function (node) {
                var r=pos2RC(str, node.pos);
                if (!linfo[r.row]) linfo[r.row]="";
                if (incdec[node.text]) {
                    if (incdec[node.text]) linfo[r.row]+=node.text;
                }
            }
        });
        v.def=function (node) {
            if (!node || typeof node!="object") return;
            if (node[Grammar.SUBELEMENTS]) {
                node[Grammar.SUBELEMENTS].forEach(function (e) {
                    v.visit(e);
                });
                return;
            }
            for (var i in node) {
                if (node.hasOwnProperty(i)) {
                    v.visit(node[i]);
                }
            }
        };
        v.visit(node);
    }catch(e) {
        var r={row:0, col:0};
        var len=str.length;
        for (var i=0 ; i<len ;i++) {
            var c=str.substring(i,i+1);
            if (incdec[c]) {
                if (!linfo[r.row]) linfo[r.row]="";
                if(incdec[c]) linfo[r.row]+=incdec[c];
            } else if (c=="\n") {
                r.row++;
                r.col=0;
            } else {
                r.col++;
            }
        }
    }
    var res="";
    var lines=str.split("\n");
    var curDepth=0;
    var row=0;
    lines.forEach(function (line) {
        if (linfo[row]!=null) {
            line=line.replace(/^\s*/,"");
            linfo[row].match(/^(\}*)/);
            var closes=RegExp.$1.length;
            linfo[row].match(/(\{*)$/);
            var opens=RegExp.$1.length;
            curDepth-=closes;
            line=indStr()+line;
            curDepth+=opens;
        }
        res+=line+"\n";
        row++;
    });
    res=res.replace(/\n$/,"");
    return res;
    function indStr() {
        var res="";
        for (var i=0 ;i<curDepth ;i++) {
            res+=indentStr;
        }
        return res;
    }
    function pos2RC(str, pos) {
        var res={row:0, col:0};
        var len=Math.min(str.length,pos);
        for (var i=0 ; i<len ;i++) {
            if (str.substring(i,i+1)=="\n") {
                res.row++;
                res.col=0;
            } else {
                res.col++;
            }
        }
        return res;
    }
}

requirejs.setName('Tonyu.Compiler');
Tonyu.Compiler=function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;
var BINDF="Tonyu.bindFunc";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var ITER="Tonyu.iterator";
var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};
/*function compile(klass, env) {
    initClassDecls(klass, env );
    return genJS(klass, env);
}*/
function initClassDecls(klass, env ) {
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={name:"main",stmts:[]};
    // method := fiber | function
    var fields={}, methods={main: MAIN}, natives={};
    klass.decls={fields:fields, methods:methods, natives: natives};
    klass.node=node;
    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    var OM=ObjectMatcher;
    function initMethods(program) {
        var spcn=env.options.compiler.defaultSuperClass;
        var pos=0;
        var t;
        if (t=OM.match( program , {ext:{superClassName:{text:OM.T, pos:OM.P}}})) {
            spcn=t.T; //program.ext.superClassName.text;
            pos=t.P;  //program.ext.superClassName.pos;
            //console.log("Match!  "+JSON.stringify(t));
            if (spcn=="null") spcn=null;
        }
        if (spcn) {
            var spc=env.classes[spcn];
            if (!spc) throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                methods[head.name.text]={
                        nowait: !!head.nowait,
                        ftype:  head.ftype.text,
                        name:  head.name.text,
                        head:  head,
                        stmts: stmt.body.stmts
                };
            } else if (stmt.type=="nativeDecl") {
                natives[stmt.name.text]=stmt;
            } else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    // if(pass==1)
    initMethods(node);        // node=program
}


function genJS(klass, env,pass) {
    var srcFile=klass.src.tonyu; //file object

    var OM=ObjectMatcher;
    var className=getClassName(klass);
    var traceTbl=env.traceTbl;
    // method := fiber | function
    var decls=klass.decls;
    var fields=decls.fields,
        methods=decls.methods,
        natives=decls.natives;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
    var ST=ScopeTypes;
    var topLevelScope={};
    // ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
    //  キー： 変数名   値： ScopeTypesのいずれか
    var buf=IndentBuffer();
    var printf=buf.printf;
    var v=null;
    var ctx=context();
    var debug=false;
    var fiberCallTmpl={
            type:"postfix",
            op:{$var:"A",type:"call" },
            left:{type:"varAccess", name: {text:OM.T}}
         };
    var noRetFiberCallTmpl={
        expr: fiberCallTmpl
    };
    var retFiberCallTmpl={
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: fiberCallTmpl
        }
    };
    var noRetSuperFiberCallTmpl={
        expr: {type:"superExpr", $var:"S"}
    };
    var retSuperFiberCallTmpl={
            expr: {
                type: "infix",
                op: OM.O,
                left: OM.L,
                right: {type:"superExpr", $var:"S"}
            }
        };
    function getClassName(klass){
        if (typeof klass=="string") return CLASS_HEAD+klass;
        return CLASS_HEAD+klass.name;
    }
    //console.log(JSON.stringify( retFiberCallTmpl));
    function initTopLevelScope2(klass) {
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=ST.FIELD;
        }
        for (var i in decls.methods) {
            s[i]=ST.METHOD;
        }
    }
    function initTopLevelScope() {
        var s=topLevelScope;
        for (var k=klass ; k ; k=k.superClass) {
            initTopLevelScope2(k);
        }
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=ST.NATIVE;
        }
        for (var i in env.classes) {
            s[i]=ST.CLASS; //ST.NATIVE;
        }
    }
    function newScope(s) {
        var f=function (){};
        f.prototype=s;
        return new f();
    }
    function getMethod(name) {
        for (var k=klass; k ; k=k.superClass) {
            if (k.decls.methods[name]) return k.decls.methods[name];
        }
        return null;
    }

    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    function getParams(method) {
        //console.log("genparam : name="+method.name);
        if (!method.head) return [];
        var res=method.head.params.params;
        if (!res.forEach) throw method+" is not array ";
        return res;
    }
    function genParamTbl(method) {
        var r=getParams(method);
        method.scope={};
        r.forEach(function (n) { method.scope[n.text]=ST.PARAM; });
    }
    function enterV(obj, node) {
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function genSym(prefix) {
        return prefix+(Math.random()+"").replace(/\./g,"");
    }
    function varAccess(n, postfixIsCall) {
        var t=ctx.scope[n];
        if (t!=ST.NATIVE && n.match(/^\$/)) t=ST.GLOBAL; //ST.NATIVE;
        if (!t) {
            topLevelScope[n]=ST.FIELD;
            t=ST.FIELD;
        }
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD) {
            buf.printf("%s.%s",THIZ, n);
        } else if (t==ST.METHOD) {
        	if (postfixIsCall) {
                buf.printf("%s.%s",THIZ, n);
        	} else {
                buf.printf("%s(%s,%s.%s)",BINDF, THIZ, THIZ, n);
        	}
        } else if (t==ST.CLASS) {
            buf.printf("%s",getClassName(n));
        } else if (t==ST.GLOBAL) {
            buf.printf("%s%s",GLOBAL_HEAD, n);
        } else {
            buf.printf("%s",n);
        }
    }
    function lastPosF(node) {
        return function () {
            buf.printf("%s=%s;%n",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ));
        };
    }
    v=buf.visitor=Visitor({
        dummy: function (node) {
            buf.printf("",node);
        },
        literal: function (node) {
            buf.printf("%s",node.text);
        },
        paramDecl: function (node) {
            buf.printf("%v",node.name);
        },
        paramDecls: function (node) {
            buf.printf("(%j)",[", ",node.params]);
        },
        funcDeclHead: function (node) {
            buf.printf("function %v %v",node.name, node.params);
        },
        funcDecl: function (node) {
        	//genSubFunc(node);
        },
        "return": function (node) {
            if (!ctx.noWait) {
                if (node.value) {
                    buf.printf("%s.exit(%v);return;",TH,node.value);
                } else {
                    buf.printf("%s.exit(%s);return;",TH,THIZ);
                }
            } else {
                if (node.value) {
                    buf.printf("return %v;",node.value);
                } else {
                    buf.printf("return %s;",THIZ);
                }
            }
        },
        program: function (node) {
            genClass(node.stmts);
            //buf.printf("%j",["%n",node.stmts]);
        },
        number: function (node) {
            buf.printf("%s", node.value );
        },
        reservedConst: function (node) {
            if (node.text=="this") {
                buf.printf("%s",THIZ);
            } else if (node.text=="arguments" && !ctx.noWait) {
                buf.printf("%s",ARGS);
            } else {
                buf.printf("%s", node.text);
            }
        },
        varDecl: function (node) {
            ctx.scope[node.name.text]=ST.LOCAL;
            if (node.value) {
                buf.printf("%v = %v", node.name, node.value );
            } else {
                buf.printf("%v", node.name);
            }
        },
        varsDecl: function (node) {
            lastPosF(node)();
            //if (!ctx.noWait) {
                buf.printf("%j;", [";",node.decls]);
            /*}else {
                buf.printf("var %j;", [",", node.decls]);
            }*/
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            } else {
                buf.printf("%v: %f", node.key, function () {
                    varAccess( node.key.text,false) ;
                });
            }
        },
        objlit: function (node) {
            buf.printf("{%j}", [",", node.elems]);
        },
        arylit: function (node) {
            buf.printf("[%j]", [",", node.elems]);
        },
        funcExpr: function (node) {
        	genFuncExpr(node);
        },
        parenExpr: function (node) {
            buf.printf("(%v)",node.expr);
        },
        varAccess: function (node) {
            var n=node.name.text;
            varAccess(n,false);
        },
        exprstmt: function (node) {//exprStmt
            var t;
            lastPosF(node)();
            if (!ctx.noWait && (t=OM.match(node,noRetFiberCallTmpl)) &&
                    ctx.scope[t.T]==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++
                );
            } else if (!ctx.noWait && (t=OM.match(node,retFiberCallTmpl)) &&
                    ctx.scope[t.T]==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                //console.log("match: ");
                //console.log(t);
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{"+
                        "%v%v%s.retVal();%n",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++,
                            t.L, t.O, TH
                );
            } else if (!ctx.noWait && (t=OM.match(node,noRetSuperFiberCallTmpl)) ) {
                var p=getClassName(klass.superClass);
                if (t.S.name) {
                    buf.printf(
                            "%s.enter( %s.prototype.%s%s( %s, %v) );%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{",
                                TH,   p,  FIBPRE, t.S.name.text,  THIZ,  t.S.params,
                                FRMPC, ctx.pc,
                                ctx.pc++
                    );
                }
            } else {
                buf.printf("%v;", node.expr );
                //buf.printf("%s=%s;%v;",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ), node.expr );
            }
        },
        infix: function (node) {
            buf.printf("%v%v%v", node.left, node.op, node.right);
        },
        trifixr:function (node) {
            buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
        },
        prefix: function (node) {
            buf.printf("%v %v", node.op, node.right);
        },
        postfix: function (node) {
            if (OM.match(node, {left:{type:"varAccess"}, op:{type:"call"} })) {
            	varAccess(node.left.name.text,true);
                buf.printf("%v", node.op);
            } else {
                buf.printf("%v%v", node.left, node.op);
            }
        },
        "break": function (node) {
            if (!ctx.noWait) {
                if (ctx.closestBrk) {
                    buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
                } else {
                    throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
                }
            } else {
                buf.printf("break;%n");
            }
        },
        "while": function (node) {
            lastPosF(node)();
            if (!ctx.noWait) {
                var brkpos=buf.lazy();
                var pc=ctx.pc++;
                var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
                buf.printf(
                        /*B*/
                        "%}case %d:%{" +
                        (isTrue?"%D%D%D":"if (!(%v)) { %s=%z; break; }%n") +
                        "%f%n" +
                        "%s=%s;break;%n" +
                        "%}case %f:%{",
                            pc,
                            node.cond, FRMPC, brkpos,
                            enterV({closestBrk:brkpos}, node.loop),
                            FRMPC, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("while (%v) { %v }", node.cond, node.loop);
            }
        },
        "for": function (node) {
            lastPosF(node)();
            if (node.inFor.type=="forin") {
                var itn=genSym("_it_");
                ctx.scope[itn]=ST.LOCAL;
                if (!ctx.noWait) {
                    var brkpos={};
                    var pc=ctx.pc++;
                    buf.printf(
                            "%s=%s(%v,%s);%n"+
                            "%}case %d:%{" +
                            "if (!(%s.next())) { %s=%z; break; }%n" +
                            "%f%n" +
                            "%v%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                itn, ITER, node.inFor.set, node.inFor.vars.length,
                                pc,
                                itn, FRMPC, brkpos,
                                getElemF(itn, node.inFor.isVar, node.inFor.vars),
                                node.loop,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                } else {
                    buf.printf(
                            "var %s=%s(%v,%s);%n"+
                            "while(%s.next()) {%{" +
                               "%f%n"+
                               "%v%n" +
                            "%}}",
                            itn, ITER, node.inFor.set, node.inFor.vars.length,
                            itn,
                            getElemF(itn, node.inFor.isVar, node.inFor.vars),
                            node.loop
                    );
                }

            } else {
                if (!ctx.noWait) {
                    var brkpos={};
                    var pc=ctx.pc++;
                    buf.printf(
                            "%v;%n"+
                            "%}case %d:%{" +
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "%v;%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                node.inFor.init ,
                                pc,
                                node.inFor.cond, FRMPC, brkpos,
                                node.loop,
                                node.inFor.next,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                    //brkpos.put(ctx.pc++);
                } else {
                    buf.printf(
                            "%v%n"+
                            "while(%v) {%{" +
                               "%v%n" +
                               "%v;%n" +
                            "%}}",
                            node.inFor.init ,
                            node.inFor.cond,
                                node.loop,
                                node.inFor.next
                    );
                    //buf.printf("for (%s%v) { %v }",(node.isVar?"var ":""), node.inFor, node.loop);
                }
            }
            function getElemF(itn, isVar, vars) {
                return function () {
                    //var va=(isVar?"var ":"");
                    vars.forEach(function (v,i) {
                        /*if (isVar) */ctx.scope[v.text]=ST.LOCAL;
                        buf.printf("%s=%s[%s];%n", v.text, itn, i);
                    });
                };
            }
        },
        "if": function (node) {
            if (!ctx.noWait) {
                var fipos={}, elpos={};
                if (node._else) {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "%s=%z;break;%n" +
                            "%}case %f:%{" +
                            "%v%n" +
                            /*B*/
                            "%}case %f:%{"   ,
                                node.cond, FRMPC, elpos,
                                node.then,
                                FRMPC, fipos,
                                function () { buf.print(elpos.put(ctx.pc++)); },
                                node._else,

                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );

                } else {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            /*B*/
                            "%}case %f:%{",
                                node.cond, FRMPC, fipos,
                                node.then,

                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );
                }
            } else {
                if (node._else) {
                    buf.printf("if (%v) { %v } else { %v }", node.cond, node.then, node._else);
                } else {
                    buf.printf("if (%v) { %v }", node.cond, node.then);
                }
            }
        },
        useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=ST.THVAR;
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                var ns=newScope(ctx.scope);
                ns[TH]=ST.THVAR;
                ctx.enter({scope:ns}, function () {
                    buf.printf("%v",node.then);
                });
            } else {
                if (node._else) {
                    buf.printf("%v",node._else);
                }
            }
        },
        call: function (node) {
        	buf.printf("(%j)", [",",node.args]);
        	//buf.printf("(%v)",node.args);
        },
        objlitArg: function (node) {
            buf.printf("%v",node.obj);
        },
        argList: function (node) {
            buf.printf("%j",[",",node.args]);
        },
        newExpr: function (node) {
            var p=node.params;
            if (p) {
                buf.printf("new %v%v",node.klass,p);
            } else {
                buf.printf("new %v",node.klass);
            }
        },
        scall: function (node) {
        	buf.printf("[%j]", [",",node.args]);
        	//buf.printf("[%v]",node.args);
        },
        superExpr: function (node) {
            var name;
            if (node.name) {
                name=node.name.text;
                buf.printf("%s.prototype.%s.apply( %s, %v)",
                        getClassName(klass.superClass),  name, THIZ, node.params);
            } else {
                buf.printf("%s.apply( %s, %v)",
                        getClassName(klass.superClass), THIZ, node.params);
            }
        },
        arrayElem: function (node) {
            buf.printf("[%v]",node.subscript);
        },
        member: function (node) {
            buf.printf(".%v",node.name);
        },
        symbol: function (node) {
            buf.print(node.text);
        },
        "normalFor": function (node) {
            buf.printf("%v; %v; %v", node.init, node.cond, node.next);
        },
        compound: function (node) {
            if (!ctx.noWait) {
                buf.printf("%j", ["%n",node.stmts]);
            } else {
                buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
            }
        },
        token: function (node) {
            if (node.text=="typeof") {
                buf.printf("%s ",node.text);
            } else if (node.text=="instanceof") {
                buf.printf(" %s ",node.text);
            } else {
                buf.printf("%s",node.text);
            }
        }
    });
    //v.debug=debug;
    v.def=function (node) {
        if (!node) buf.printf("/*null*/");
        else buf.printf("DEF ! type=%s",node.type);
        console.log("Err node=");
        console.log(node);
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    var scopeChecker=Visitor({
    	varDecl: function (node) {
    		ctx.locals.varDecls[node.name.text]=node;
            //console.log("varDecl!", node.name.text);
    		//ctx.scope[node.name.text]=ST.LOCAL;
    	},
    	funcDecl: function (node) {/*FDITSELFIGNORE*/
    		ctx.locals.subFuncDecls[node.head.name.text]=node;
    		//console.log("funcDecl!", node);
            //ctx.scope[node.head.name.text]=ST.LOCAL;
    	},
        funcExpr: function (node) {/*FEIGNORE*/
        },
        exprstmt: function (node) {
        }
    });
    scopeChecker.def=function (node) {
    	var t=this;
    	if (!node) return;
    	var es;
    	if (node instanceof Array) es=node;
    	else es=node[Grammar.SUBELEMENTS];
    	if (!es) {
        	return;
    	}
    	es.forEach(function (e) {
    		t.visit(e);
    	});
    };
    function checkLocals(node, scope) {
    	var locals={varDecls:{}, subFuncDecls:{}};
    	ctx.enter({locals:locals},function () {
        	scopeChecker.visit(node);
    	});
    	//buf.print("/*");
    	for (var i in locals.varDecls) {
    		scope[i]=ST.LOCAL;
    		//buf.printf("%s,",i);
    	}
    	for (var i in locals.subFuncDecls) {
    		scope[i]=ST.LOCAL;
    		//buf.printf("%s,",i);
    	}
    	//buf.print("*/");
    	return locals;
    }
    function genLocalsF(locals,scope) {
    	return f;
    	function f() {
    		ctx.enter({scope:scope}, function (){
    			for (var i in locals.varDecls) {
    				buf.printf("var %s;%n",i);
    			}
    			for (var i in locals.subFuncDecls) {
    				genSubFunc(locals.subFuncDecls[i]);
    			}
    		});
    	};
    }
    /*function checkLocalsF(node) {
    	return function () {
    		return checkLocals(node);
    	};
    }*/
    function genSource() {
        ctx.enter({scope:topLevelScope}, function () {
            if (klass.superClass) {
                printf("%s=Tonyu.klass(%s,{%{", getClassName(klass), getClassName(klass.superClass));
            } else {
                printf("%s=Tonyu.klass({%{", getClassName(klass));
            }
            for (var name in methods) {
                if (debug) console.log("method1", name);
                var method=methods[name];
                ctx.enter({noWait:true}, function () {
                    genFunc(method);
                });
                if (debug) console.log("method2", name);
                //v.debug=debug;
                ctx.enter({noWait:false}, function () {
                    genFiber(method);
                });
                if (debug) console.log("method3", name);
            }
            printf("%}});");
        });
    }
    function genFiber(fiber) {
    	//var locals={};
        //console.log("Gen fiber");
        var ps=getParams(fiber);
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=ST.PARAM;
        });
        var locals=checkLocals(fiber.stmts , ns);
        printf(
               "%s%s :function (%j) {%{"+
                 "var %s=%s;%n"+
                 "var %s=%s;%n"+
                 "var %s=0;%n"+
                 "%f%n"+
//                 "%z%n"+
                 "return function (%s) {%{"+
                   "for(var %s=%d ; %s--;) {%{"+
                     "switch (%s) {%{"+
                        "%}case 0:%{"+
                        "%f" +
                        "%s.exit(%s);return;%n"+
                     "%}}%n"+
                   "%}}%n"+
                 "%}};%n"+
               "%}},%n",

               FIBPRE, fiber.name, [",",getParams(fiber)],
                   THIZ, GET_THIS,
                   ARGS, "arguments",
                   FRMPC,
                   genLocalsF(locals, ns),
//                   locals,
                   TH,
                   CNTV, CNTC, CNTV,
                        FRMPC,
                        // case 0:
                      fbody,
                      TH,THIZ
        );
        function fbody() {
            ctx.enter({method:fiber, scope: ns, pc:1}, function () {
                fiber.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
                /*
                var lcl=[];
                for (var i in ctx.scope) {
                    //console.log("scp: "+i+"="+ctx.scope[i]);
                    if (ctx.scope[i]==ST.LOCAL) {
                        lcl.push(i);
                    }
                }
                if (lcl.length>0) {
                    locals.put("var "+lcl.join(", ")+";");
                } else {*/
//                    locals.put("/*NOVAR*/");
                 //}
            });
        }
    }
    function genFunc(func) {
        var fname= isConstructor(func) ? "initialize" : func.name;
        var ps=getParams(func);
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=ST.PARAM;
        });
        var locals=checkLocals(func.stmts,ns);
        printf("%s :function (%j) {%{"+
                  "var %s=%s;%n"+
                  "%f%n" +
                  "%f" +
               "%}},%n",
               fname, [",",getParams(func)],
               THIZ, GET_THIS,
               	      genLocalsF(locals, ns),
                      fbody
        );
        function fbody() {
            ctx.enter({method:func, scope: ns }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFuncExpr(node) {
        var m,ps;
        var body=node.body;
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=ST.PARAM;
        });
        var locals=checkLocals(body, ns);
        buf.printf("function (%j) {%{"+
                       "%f%n"+
                       "%f"+
                   "%}}"
                 ,
                    [",", ps],
                 	genLocalsF(locals, ns),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, scope: ns }, function () {
                body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genSubFunc(node) {
    	var m,ps;
        var body=node.body;
        var name=node.head.name.text;
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=ST.PARAM;
        });
        var locals=checkLocals(body, ns);
        buf.printf("function %s(%j) {%{"+
                      "%f%n"+
                      "%f"+
                   "%}}"
                 ,
                     name,[",", ps],
                  	genLocalsF(locals,ns),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, scope: ns }, function () {
                body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }

    function isConstructor(f) {
        return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
    }
    initTopLevelScope();
    genSource();
    klass.src.js=buf.buf;
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }

    return buf.buf;
}
return {initClassDecls:initClassDecls, genJS:genJS};
}();
if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
// Skipped http://localhost:3002/js/lib/ace-noconflict/theme-eclipse.js
// Skipped http://localhost:3002/js/lib/ace-noconflict/mode-tonyu.js
// Skipped http://localhost:3002/js/lib/bootstrap.min.js
requirejs.start();
