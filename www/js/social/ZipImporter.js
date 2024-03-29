define(["Klass","FS","Util","DragDrop","DeferredUtil","UI","R"],
function (Klass,FS,Util,DD,DU,UI,R) {
    FS.mount("/ram/","ram");
    //var zip=FS.zip;
    var tmpDir=FS.get("/ram/");
    var ZipImporter=Klass.define({
        $: function (dir, elem, options) {
            options=options||{};
            var t=this;
            t.elem=elem;
            if (typeof dir==="function") {
                t.getDir=dir;
            } else {
                t.getDir=function (){return dir;};
            }
            t.onFileSelect=options.onFileSelect;
            t.onComplete=options.onComplete;
            if (t.elem) t.prepareDragDrop();    
        },
        getTmpDir() {
            return tmpDir.rel(this.getDir().name());
        },
        fileButton() {
            const t=this;
            const finput=$("<input>").attr({name:"file",type:"file",multi:false});
            finput.on("input",(e)=>{
                //console.log(e);
                //console.log();
                const f=finput[0].files[0];
                const rd=new FileReader();
                rd.addEventListener("load",(r)=>{
                    let name=FS.PathUtil.name(finput.val());
                    //console.log(name, rd.result);
                    let zipf=tmpDir.rel(name);
                    zipf.dataURL(rd.result);
                    if (t.onFileSelect) t.onFileSelect({file:zipf});
                    t.unzip(zipf,{from:"fileInput"}).then(ctx=>{
                        t.closeDialog();
                        t.onComplete(ctx);
                    });
                });
                rd.readAsDataURL(f);

            });
            return $("<form>").append(finput);
        },
        prepareDragDrop: function () {
            var t=this;
            DD.accept(t.elem, t.getTmpDir(), {
                onComplete: function (status) {
                    t.showDialog();
                    var ctx={imported:0, from:"dragDrop"};
                    t.acceptDrag(status,ctx).then(function () {
                        t.closeDialog();
                        if (t.onComplete) t.onComplete(ctx);
                    },function (e) {
                        t.closeDialog();
                        console.error(e);
                        alert(e);
                    });
                }
            });
        },
        acceptDrag: function (status,ctx) {
            var t=this;
            return DU.each(status,function(k,s) {
                //s.file;
                //s.status;
                if (s.status==="uploaded" && s.file.ext()===".zip") {
                    return t.unzip(s.file,ctx);
                }
            });
        },
        showDialog: function (mesg) {
            var t=this;
            mesg=mesg||R("importingFromZip");
            if (!t.dialog) {
                t.dialog=UI("div",{title:R("importFromZip")},
                    ["span",{$var:"mesg"}, mesg]
                );
                t.mesg=t.dialog.$vars.mesg;
            } else {
                t.mesg.text(mesg);
            }
            if (!t.dialogOpened) {
                t.dialog.dialog({modal:true});
            }
            t.dialogOpened=true;
        },
        closeDialog: function () {
            var t=this;
            if (t.dialog) {
                t.dialog.dialog("close");
                t.dialogOpened=false;
            }
        },
        unzip: function (file,ctx) {
            // ctx.dstDir is set when fromPrjB, /Tonyu/Project/prjfile_0.00/
            var t=this;
            t.showDialog(R("unzipping",file.name()));
            var zipexdir=t.getTmpDir().rel(file.truncExt()+"/");
            const shouldSkip=(file)=>file.path().match(/\.git\b/);
            var opt={
                progress: function (file) {
                    //if (shouldSkip(file)) return;
                    t.showDialog(R("unzipping",file.name()));
                    return new Promise( s=> setTimeout(s,0));//DU.timeout(0);
                },
                onCheckFile(file, content) {
                    if (shouldSkip(file)) return false;
                    return file; 
                }
            };
            return FS.zip.unzip(file, zipexdir,opt ).then(function () {
                if (ctx.rel) {
                    zipexdir=zipexdir.rel(ctx.rel);
                    if (!zipexdir.exists()) {
                        return ctx;
                    }
                }
                return t.traverse(zipexdir,ctx);
            }).then(function (ctx) {
                if (ctx.from==="prjB" && ctx.imported===0) throw new Error(
                    R("doesNotContainTonyu2Project",file.name())
                );
                return ctx;
            });
        },
        traverse: function (zipexdir,ctx) {
            var t=this;
            ctx=ctx||{};
            ctx.imported=ctx.imported||0;
            return zipexdir.each(function (f) {
                t.showDialog(R("checking",f.name()));
                console.log("traverse",f.path());
                if (f.isDir()) {
                    return t.traverse(f,ctx);
                } else if (f.name()==="options.json") {
                    ctx.imported++;
                    return t.importFrom(f.up(),ctx);
                }
            }).then(function (){
                return ctx;
            });
        },
        importFrom: function (src,ctx) {
            var t=this;
            var dst;
            if (ctx.dstDir) {
                dst=ctx.dstDir;
            } else {
                const dstParent=t.getDir();
                var nameT=FS.PathUtil.truncSEP(src.name());
                if (nameT==="src") {
                    nameT=FS.PathUtil.truncSEP(src.up().name());
                }
                var name=nameT+"/";
                dst=dstParent.rel(name);
                var i=2;
                while (dst.exists()) {
                    name=nameT+i+"/";
                    i++;
                    dst=dstParent.rel(name);
                }
            }
            t.showDialog(R("copying",src.name(),dst.name()));
            console.log("importFrom",src.path(), "to", dst.path());
            return src.copyTo(dst).then(function () {
                if (t.prjID) {
                    var options=dst.rel("options.json");
                    if (options.exists()) {
                        var optobj=options.obj();
                        optobj.info=optobj.info||{};
                        optobj.info.prjID=t.prjID;
                        options.obj(optobj);
                    }
                }
            });
        },
        checkFromPrjB: function () {
            var t=this;
            var file=Util.getQueryString("fromPrjB");
            var prjID=Util.getQueryString("prjID");
            t.prjID=prjID;
            console.log("checkFromPrjB",file);
            if (file) {
                const dstDir=t.getDir().rel(file.replace(/\.zip$/i,"/"));
                if (dstDir.exists() ){
                    console.log(dstDir+" already exists ");
                    return 0;
                }
                FS.mount("https://edit.tonyu.jp/","web");
                var ctx={from:"prjB", imported:0, dstDir:dstDir, rel:"src/"};
                return t.fromPrjB(file,ctx).then(function (r) {
                    t.closeDialog();
                    if (t.onComplete) t.onComplete(ctx);
                    return r;
                },function (e) {
                    t.closeDialog();
                    alert(e);
                    console.error(e);
                });
            }
        },
        fromPrjB: function (fileName,ctx) {
            var t=this;
            var f=FS.get("https://edit.tonyu.jp/cgi-bin/dl.cgi?file="+fileName);
            var tmp=FS.get("/ram/").rel(fileName);
            t.showDialog(R("downloadFromProjectBoard",fileName));
            return f.copyTo(tmp).then(function (/*r*/) {
                return t.unzip(tmp,ctx);
            });
        }
    });
    return ZipImporter;
});
