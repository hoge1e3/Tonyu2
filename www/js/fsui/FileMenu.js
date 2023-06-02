define(function (require,exports,module) {
const UI=require("UI");
//const EC=require("exceptionCatcher");
//const F=EC.f;
const kernelChecker=require("kernelChecker");
const root=require("root");
const R=require("R");

module.exports=function (ide) {
    const FM={};
    const EXT=ide.project.getEXT();
    const curPrjDir=ide.project.getDir();
    let files={};
    function refreshFiles() {
        files=ide.project.sourceFiles();
    }
    function open(f){
        if (typeof FM.fileList=="object") {
            FM.fileList.select(f);
        }
    }
    function getCurFile() {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curFile();
        }
        throw "FM.fileList is missing";
    }
    FM.dialog=function (title, name, onend) {
    	return FM.dialogOpt({title:title, name:name, onend:onend});
    };
    FM.dialogOpt=function (options) {
    	var title=options.title;
    	var name=options.name || "";
        var onend=options.onend || function (){};
        //var t;
        if (!FM.d) FM.d=UI(["div"], {title: title},
             ["div",R("inputFileName")],
             ["div",["input", {
                 $var: "name",
                 on:{
                	 enterkey:function () {
                		 FM.d.$vars.done();
                	 },
                	 realtimechange: function (f) {
                		 FM.d.$vars.chg(f,v.dir.val());
                	 }
                 }
             }]],
            ["div",R("destinationFolder")],
            ["div",["input",{
                $var:"dir",
                on:{
                    enterkey:function () {
                        FM.d.$vars.done();
                    },
                 	realtimechange: function (d) {
                        FM.d.$vars.chg(v.name.val(),d);
                    }}}]],
             ["div",{$var:"extra"}],
             ["div",{$var:"msg"}],
            ["button", {$var:"b", on:{click: function () {
            	FM.d.$vars.done();
       	 	}}}, "OK"]
        );
        FM.d.attr({title:title});
        var v=FM.d.$vars;
        //console.log(name);
        v.name.val(name);
        v.dir.val(folderName(FM.fileList.curDir()));
        FM.d.dialog({title:title});
        var r=null;
        v.done=function() {
            if (!r || !r.ok) return;
            //clearInterval(t);
            onend(r.file);
            FM.d.dialog("close");
        };
        v.chg=function (file,dir) {
            r=fixName(file,dir);
            if (r.ok && r.file.exists()) r={ok:false, reason:R("fileExists",r.file.name())};
            if (r.ok && files[r.file.truncExt()] && options.action!=="mv") {
                r={ok:false, reason:R("fileExistsInOtherFolder",r.file.name())};
            }
            if (r.ok && !r.file.up().exists()) {
                r.note=(r.note||"")+R("ThisFolderWillBeCreated");
            }
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
        v.extra.empty();
        if (options.extraUI) {
            options.extraUI(v.extra);
        }
    };
    FM.create=function () {
        save();
        refreshFiles();
        FM.dialogOpt({title:R("newFile"), action:"create", onend:function (f) {
            if (!f.exists()) {
                createContent(f); //f.text("");
                ls(f.up());
                open(f);
                resetFiles();// See https://github.com/hoge1e3/tonyu2-compiler/commit/04ef9c655943b261eea47ed1f49b16c16797f564
            }
        }});
    };
    FM.mv=function () {
        save();
        const curFile=getCurFile();
        if (!curFile) return;
        var oldName=displayName(curFile);
        refreshFiles();
        FM.dialogOpt({title:R("renameFile"), name:oldName, curFile, action:"mv", extraUI:mvExtraUI, onend:async function (nf) {
            if (!nf) return;
            const doRefactor=curFile.name()!==nf.name() && refactorUI.$vars.chk.prop("checked");
            if (doRefactor) {
                return await refactor(curFile,nf);
            }
            reloadFromFiles();
            const t=curFile.text();
            const nfd=nf.up();
            if (!nfd.exists()) nfd.mkdir();
            nf.text(t);
            curFile.rm();
            close(curFile);
            ls(nfd);
            open(nf);
            resetFiles();
        }});
    };
    let refactorUI;
    function mvExtraUI(d) {
        refactorUI=UI("div",["input",{type:"checkbox",$var:"chk",checked:"true",value:"chked"}],R("refactorClassName"));
        d.append(refactorUI);
    }
    async function refactor(old,_new) {
        var oldCN=old.truncExt(EXT);
        var newCN=_new.truncExt(EXT);
        try {
            const ren=await ide.project.renameClassName(oldCN,newCN);
            console.log("REN",ren);
            ls();
            open(_new);
        } catch(e) {
            alert(R("someFilesHaveErrorOnRefactor"));
            console.error(e);
            console.log(e);
        }
        refactorUI=null;
        if (root.SplashScreen) root.SplashScreen.hide();
    }
    FM.rm=function (){
        save();
        var curFile=getCurFile();
        if (!curFile) return;
        if (!confirm(R("deleteFileConfirm",curFile.name()))) return;
        curFile.rm();
        ls();
        close(curFile);
        resetFiles();
    };
    function createContent(f) {
        f.text("");
    }
    function displayName(f) {
        var r=ide.dispName(f);
        if (r) {
            return r;
        }
        return f.name();
    }
    function resetFiles() {
        ide.project.resetFiles();
    }
    function ls(dir){
        FM.fileList.ls(dir);
        ide.refreshRunMenu();
    }
    function save(){
        ide.save();
    }
    function close(rm) { // rm or mv
        const editors=ide.editors;
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            i.editor.destroy();
            i.dom.remove();
            ide.fileList.tabs.close(rm);
            delete editors[rm.path()];
            let remains;
            for (remains in editors);
            if (!remains) $("#welcome").show();
            else open(editors[remains].file);
        }
    }
    FM.close=function () {
        var inf=ide.getCurrentEditorInfo();
        if (inf) {
            close(inf.file);
        }
    };
    function folderName(dir) {
        var ndir=dir.relPath(curPrjDir).replace(/[\/\\].*/,"");
        return ndir;
    }
    function fixName(name,dirName) {
        //const fl=FM.fileList;
        var upcased=false;
        //if (name=="aaaa") throw new Error("iikagen name error "+EC.enter);
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            //var dir=fl.curDir();
            var sysdir={images:1, sounds:1, js:1, files:1, static:1 ,maps:1};
            //var ndir=folderName(dir);
            //console.log("ndir",ndir);
            if (sysdir[dirName]) {
                return {ok:false, reason:R("cannotUseFolderManagedByProject",dirName)};
            }
            if (isKernel(name)) {
                return {ok:false, reason:R("cannotUseKernelFiles",name)};
            }
            const dir=dirName===""? curPrjDir: curPrjDir.rel(dirName+"/");
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: dir.rel(name+EXT), note: R("upCased",name)};
            }
            return {ok:true, file: dir.rel(name+EXT)};
        } else {
            return {ok:false, reason:R("namingNotice")};
        }
    }
    function isKernel(n) {
        return kernelChecker.isKernel(n);
    }
    function reloadFromFiles() {
        const editors=ide.editors;
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

    return FM;
};
});
