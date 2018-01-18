define(["Klass","FS","Util","DragDrop","DeferredUtil","UI"],
function (Klass,FS,Util,DD,DU,UI) {
    FS.mount("/ram/","ram");
    var zip=FS.zip;
    var tmpDir=FS.get("/ram/");
    var ZipImporter=Klass.define({
        $: function (dir, elem, options) {
            var t=this;
            t.elem=elem;
            t.dir=dir;
            t.tmpDir=tmpDir.rel(dir.name());
            options=options||{};
            t.onComplete=options.onComplete;
            DD.accept(elem, t.tmpDir, {
                onComplete: function (status) {
                    t.dialog=UI("div",{title:"Zipからインポート"},
                        ["span",{$var:"mesg"}, "ZIPからインポート中です..."]
                    ).dialog({modal:true});
                    t.mesg=t.dialog.$vars.mesg;
                    t.acceptDrag(status).then(function () {
                        t.dialog.dialog("close");
                        if (t.onComplete) t.onComplete(status);
                    },function (e) {
                        t.dialog.dialog("close");
                        console.error(e);
                    });
                }
            });
        },
        acceptDrag: function (status) {
            var t=this;
            return DU.each(status,function(k,s) {
                //s.file;
                //s.status;
                if (s.status==="uploaded" && s.file.ext()===".zip") {
                    return t.unzip(s.file);
                }
            });
        },
        unzip: function (file) {
            var t=this;
            t.mesg.text(file.name()+"を展開中...");
            var zipexdir=t.tmpDir.rel(file.truncExt()+"/");
            return FS.zip.unzip(file, zipexdir ).then(function () {
                return t.traverse(zipexdir);
            });
        },
        traverse: function (zipexdir) {
            var t=this;
            return zipexdir.each(function (f) {
                t.mesg.text(f.name()+"をチェック中...");
                console.log("traverse",f.path());
                if (f.isDir()) {
                    return t.traverse(f);
                } else if (f.name()==="options.json") {
                    return t.importFrom(f.up());
                }
            });
        },
        importFrom: function (src) {
            var t=this;
            var dstParent=t.dir;
            var nameT=FS.PathUtil.truncSEP(src.name());
            if (nameT==="src") {
                nameT=FS.PathUtil.truncSEP(src.up().name());
            }
            var name=nameT+"/";
            var dst=dstParent.rel(name);
            t.mesg.text(src.name()+ "から"+ dst.name()+"にコピー");
            console.log("importFrom",src.path(), "to", dst.path());
            var i=2;
            while (dst.exists()) {
                name=nameT+i+"/";
                i++;
                dst=dstParent.rel(name);
            }
            return src.copyTo(dst);
        },
        checkFromPrjB: function () {
            var t=this;
            var file=Util.getQueryString("fromPrjB");
            if (file) {
                FS.mount("http://www.tonyu.jp/","web");
                return t.fromPrjB(file);
            }
        },
        fromPrjB: function (fileName) {
            var t=this;
            var f=FS.get("http://www.tonyu.jp/project/pages/dl.cgi?userOnly=1&file="+file);
            var dst=FS.get("/ram/").rel(file);
            f.copyTo(dst).then(function (r) {
                return t.unzip(dst);
            });
        }
    });
    return ZipImporter;
});
