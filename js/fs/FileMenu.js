FileMenu=function () {
    var FM={on:{}};
    FM.on.validateName=function (name, mode) {
        return name;
    };
    FM.on.displayName=function (f) {
        // return String or {name:String  ,mode:String }
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
    FM.create=function (mode) {
        var name=prompt("ファイル名を入力してください","");
        name=FM.on.validateName(name, mode);
        if (!name) return;
        var f=FM.on.getCurDir().rel(name);
        if (!f.exists()) {
            f.text("");
            FM.on.ls();
            FM.on.open(f);
        }
    };
    FM.mv=function () {
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        var oldNameD=FM.on.displayName(curFile);
        var oldName,  mode;
        if (typeof oldNameD=="string") oldName=oldNameD;
        else { oldName=oldNameD.name; mode=oldNameD.mode;}
        var newName=prompt("新しいファイル名を入力してください",oldName);
        newName=FM.on.validateName(newName, mode);
        if (!newName) return;
        var nf=FM.on.getCurDir().rel(newName);
        if (nf.exists()) {
            alert(newName+" は存在します");
            return;
        }
        var t=curFile.text();
        curFile.rm();
        curFile=nf;
        nf.text(t);
        FM.on.ls();
        FM.on.open(curFile);
    };
    FM.rm=function (){
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        if (!confirm(curFile.name()+"を削除しますか？")) return;
        curFile.rm();
        FM.on.ls();
        FM.on.close();
    };
    $(function () {
        $("#newFile").click(FM.create);
        $("#mvFile").click(FM.mv);
        $("#rmFile").click(FM.rm);
    });
    return FM;
}();