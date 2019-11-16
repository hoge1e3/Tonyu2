define(function (require,exports,module) {
const UI=require("UI");
//const EC=require("exceptionCatcher");
//const F=EC.f;
const kernelChecker=require("kernelChecker");
const root=require("root");

module.exports=function (ide) {
    const FM={};
    const EXT=ide.project.getEXT();
    const curPrjDir=ide.project.getDir();
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
        FM.d.dialog({title:title});
        var r=null;
        v.done=function() {
            if (!r || !r.ok) return;
            //clearInterval(t);
            onend(r.file);
            FM.d.dialog("close");
        };
        v.chg=function (s) {
            r=fixName(s,options);
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
        v.extra.empty();
        if (options.extraUI) {
            options.extraUI(v.extra);
        }
    };

    FM.create=function () {
        save();
        FM.dialogOpt({title:"新規作成", action:"create", onend:function (f) {
            if (!f.exists()) {
                createContent(f); //f.text("");
                ls();
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
        FM.dialogOpt({title:"名前変更", name:oldName, action:"mv", extraUI:mvExtraUI, onend:async function (nf) {
            if (!nf) return;
            const doRefactor=refactorUI.$vars.chk.prop("checked");
            if (doRefactor) {
                return await refactor(curFile,nf);
            }
            reloadFromFiles();
            var t=curFile.text();
            curFile.rm();
            close(curFile);
            nf.text(t);
            ls();
            open(nf);
            resetFiles();
        }});
    };
    let refactorUI;
    function mvExtraUI(d) {
        refactorUI=UI("div",["input",{type:"checkbox",$var:"chk",checked:"true",value:"chked"}],"プログラム中のクラス名も変更する");
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
            alert("プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．");
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
        if (!confirm(curFile.name()+"を削除しますか？")) return;
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
    function fixName(name/*, options*/) {
        const fl=FM.fileList;
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
                return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
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
