FileMenu=function () {
    var FM={on:{}};
    FM.on.validateName=function (n) {
        return n;
    };
    FM.on.close=function () {};
    FM.on.open=function (f){
        if (typeof FileList=="object") {
            FileList.open(f);
        }
    };
    FM.on.ls=function () {
        if (typeof FileList=="object") {
            FileList.ls();
        }
    };
    FM.on.getCurFile=function () {
        if (typeof FileList=="object") {
            return FileList.curFile();
        }
        throw "on.getCurFile is missing";
    };
    $(function () {
        $("#newFile").click(function () {
            var name=prompt("ファイル名を入力してください");
            name=FM.on.validateName(name);
            if (!name) return;
            var f=curDir.rel(name);
            if (!f.exists()) {
                f.text("");
                FM.on.ls();
                FM.on.open(f);
            }
        });
        $("#mvFile").click(function () {
            var curFile=FM.on.getCurFile();
            if (!curFile) return;
            var newName=prompt("新しいファイル名を入力してください",curFile.name());
            newName=FM.on.validateName(newName);
            if (!newName) return;
            var nf=curDir.rel(newName);
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
        });
        $("#rmFile").click(function () {
            var curFile=FM.on.getCurFile();
            if (!curFile) return;
            if (!confirm(curFile.name()+"を削除しますか？")) return;
            curFile.rm();
            FM.on.ls();
            curFile=null;
            FM.on.close();
        });
    });
    return FM;
};