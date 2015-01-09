define(["Tonyu", "Tonyu.Compiler", "TError", "FS", "Tonyu.TraceTbl","ImageList","StackTrace",
        "typeCheck","Blob","thumbnail"],
        function (Tonyu, Tonyu_Compiler, TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                tc,Blob,thumbnail) {
return Tonyu.Project=function (dir, kernelDir) {
    var TPR={};
    if (!kernelDir) kernelDir=FS.get("/Tonyu/Kernel/");
    var traceTbl=Tonyu.TraceTbl();
    var env={classes:{}, traceTbl:traceTbl, options:{compiler:{}} };
    TPR.EXT=".tonyu";
    TPR.NSP_KER="kernel";
    TPR.NSP_USR="user";
    function orderByInheritance(classes) {/*ENVC*/
        var added={};
        var res=[];
        var ccnt=0;
        for (var n in classes) {/*ENVC*/
            added[n]=false;
            ccnt++;
        }
        while (res.length<ccnt) {
            var p=res.length;
            for (var n in classes) {/*ENVC*/
                if (added[n]) continue;
                var c=classes[n];/*ENVC*/
                var spc=c.superClass;
                var deps=[spc];
                var ready=true;
                if (c.includes) deps=deps.concat(c.includes);
                deps.forEach(function (cl) {
                    ready=ready && (!cl || cl.builtin || added[cl.fullName]);//CFN cl.name -> cl.fullName
                });
                if (ready) {
                    res.push(c);
                    added[n]=true;
                }
            }
            if (res.length==p) throw TError( "クラスの循環参照があります", "不明" ,0);
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
        thumbnail.set(TPR, 2000);
        TPR.rawBoot(mainClassName);
    };
    /*TPR.run=function (mainClassName) {
        TPR.compile();
        TPR.boot(mainClassName);
    };*/
    TPR.compile=function () {
        console.log("Kernel editable",TPR.isKernelEditable());
    	if (TPR.isKernelEditable()) {
    		//  BaseActor  <-  Actor            <- MyActor
    		//   ^ in user     ^ only in kernel   ^ in user
    		//    => Actor does not inherit BaseActor in user but BaseActor in kernel
    		TPR.compileDir(TPR.NSP_KER,[dir, kernelDir]);
    	} else {
            if (!env.kernelClasses) TPR.compileKernel();
            TPR.compileUser();
    	}
    };
    TPR.compileKernel=function () {
    	TPR.compileDir(TPR.NSP_KER, [kernelDir]);
    	env.kernelClasses=env.classes;
    };
    TPR.compileUser=function () {
    	TPR.compileDir(TPR.NSP_USR, [dir],env.kernelClasses);
    };
    TPR.compileDir=function (nsp ,dirs, baseClasses) {
        TPR.getOptions();
        Tonyu.runMode=false;
        env.classes=Tonyu.extend({}, baseClasses || {});/*ENVC*/
        env.aliases={};
        for (var n in env.classes) {
            var cl=env.classes[n];
            env.aliases[ cl.shortName] = cl.fullName;
        }
        var skip=Tonyu.extend({}, baseClasses || {});/*ENVC*/
        Tonyu.currentProject=TPR;
        Tonyu.globals.$currentProject=TPR;
        //if (TPR.isKernelEditable()) kernelDir.each(collect);
        //cdir.each(collect);
        for (var i=dirs.length-1; i>=0 ; i--) {
            dirs[i].each(collect);
        }
        function collect(f) {
            if (f.endsWith(TPR.EXT)) {
                var nb=f.truncExt(TPR.EXT);
                var fullCn=nsp+"."+nb;
                env.classes[fullCn]={/*ENVC*/ //CFN nb->fullCn
                        name:nb,
                        fullName: fullCn,
                        shortName: nb,
                        nameSpace:nsp,
                        src:{
                            tonyu: f
                        }
                };
                env.aliases[nb]=fullCn;
                delete skip[fullCn];//CFN nb->fullCn
            }
        }
        for (var n in env.classes) {/*ENVC*/
        	if (skip[n]) continue;/*ENVC*/
            console.log("initClassDecl: "+n);
            Tonyu.Compiler.initClassDecls(env.classes[n], env);/*ENVC*/
        }
        var ord=orderByInheritance(env.classes);/*ENVC*/
        ord.forEach(function (c) {
        	if (skip[c.fullName]) return;//CFN c.name->c.fullName
            console.log("genJS :"+c.fullName);
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
    TPR.getThumbnail=function () {
        return thumbnail.get(TPR);
    };
    TPR.convertBlobInfos=function (user) {
        var rsrc=TPR.getResource();
        var name=TPR.getName();
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a;
                    if (a=Blob.isBlobURL(v)) {
                        o[k]=[Blob.BLOB_PATH_EXPR,user,name,a.fileName].join("/");
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        TPR.setResource(rsrc);
    };
    TPR.getBlobInfos=function () {
        var rsrc=TPR.getResource();
        var res=[];
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a;
                    if (a=Blob.isBlobURL(v)) {
                        res.push(a);
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        return res;
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
        TPR.fixOptions(env.options);
        return env.options;
    };
    TPR.fixOptions=function (opt) {
        if (!opt.compiler) opt.compiler={};
        opt.compiler.commentLastPos=TPR.runScriptMode || StackTrace.isAvailable();
        opt.run.mainClass=TPR.fixClassName(opt.run.mainClass);
        opt.run.bootClass=TPR.fixClassName(opt.run.bootClass);
    };
    TPR.fixClassName=function (cn) {
        if (TPR.classExists(cn)) return cn;
        var cna=cn.split(".");
        var sn=cna.pop();
        var res;
        res=TPR.NSP_USR+"."+sn;
        if (TPR.classExists(res)) return res;
        res=TPR.NSP_KER+"."+sn;
        if (TPR.classExists(res)) return res;
        return cn;
    };
    TPR.classExists=function (fullCn) {
        var cna=fullCn.split(".");
        if (cna.length==1) return false;
        var nsp=cna[0], sn=cna[1] ;
        if (TPR.isKernelEditable()) {
            if (nsp==TPR.NSP_KER) {
                if (dir.rel(sn+TPR.EXT).exists()) return true;
                if (kernelDir.rel(sn+TPR.EXT).exists()) return true;
            }
        } else {
            if (nsp==TPR.NSP_KER) {
                if (kernelDir.rel(sn+TPR.EXT).exists()) return true;
            }
            if (nsp==TPR.NSP_USR) {
                if (dir.rel(sn+TPR.EXT).exists()) return true;
            }
        }
        return false;
    };
    TPR.setOptions=function (r) {
        if (r) env.options=r;
        var resFile=dir.rel("options.json");
        resFile.obj(env.options);
    };
    TPR.rawBoot=function (mainClassName) {
        //var thg=Tonyu.threadGroup();
        var mainClass=Tonyu.getClass(mainClassName);
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        //Tonyu.runMode=true;
        var main=new mainClass();
        var th=Tonyu.thread();
        th.enter(main.fiber$main());

        TPR.runningThread=th; //thg.addObj(main);
        TPR.runningObj=main;
        $LASTPOS=0;
	th.steps();
        //thg.run(0);
    };

    TPR.isKernel=function (className) {
        var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;
    };
    TPR.isKernelEditable=function () {
    	return env.options.kernelEditable;
    };
    TPR.getDir=function () {return dir;};
    TPR.getName=function () { return dir.name().replace(/\/$/,""); };
    TPR.renameClassName=function (o,n) {// o: key of aliases
        TPR.compile();
        var cls=TPR.env.classes;/*ENVC*/
        for (var cln in cls) {/*ENVC*/
            var klass=cls[cln];/*ENVC*/
            var f=klass.src.tonyu;
            var a=klass.annotation;
            var changes=[];
            if (a && f) {
                for (var id in a) {
                    try {
                        var an=a[id];
                        var si=an.scopeInfo;
                        if (si && si.type=="class") {
                            if (si.name==o) {
                                var pos=an.node.pos;
                                var len=an.node.len;
                                var sub=f.text().substring(pos,pos+len);
                                if (sub==o) {
                                    changes.push({pos:pos,len:len});
                                    console.log(f.path(), pos, len, f.text().substring(pos-5,pos+len+5) ,"->",n);
                                }
                            }
                        }
                    } catch(e) {
                        console.log(e);
                    }
                }
                changes=changes.sort(function (a,b) {return b.pos-a.pos;});
                console.log(f.path(),changes);
                var src=f.text();
                var ssrc=src;
                changes.forEach(function (ch) {
                    src=src.substring(0,ch.pos)+n+src.substring(ch.pos+ch.len);
                });
                if (ssrc!=src && !f.isReadOnly()) {
                    console.log("Refact:",f.path(),src);
                    f.text(src);
                }
            }
        }
    };
    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});
