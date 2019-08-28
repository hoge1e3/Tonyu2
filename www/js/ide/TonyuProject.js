define(["Tonyu", "ProjectCompiler", "TError", "FS", "Tonyu.TraceTbl","ImageList","StackTrace",
        "Blob","thumbnail","WebSite","plugins", //"Tonyu.Compiler.Semantics", "Tonyu.Compiler.JSGenerator",
        "DeferredUtil","compiledProject"],
        function (Tonyu, ProjectCompiler, TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                Blob,thumbnail,WebSite,plugins,// Semantics, JSGenerator,
                DU,CPRJ) {
Tonyu.Project=function (dir, kernelDir) {
  // Difference from projectCompiler:
  //   TonyuProject Defines Tonyu 'System' (the game engine) specific projects
  //   such as resource management, booting.
    var TPR=ProjectCompiler(dir);
    var _super=Tonyu.extend({},TPR);
    TPR.EXT=".tonyu";
    TPR.NSP_KER="kernel";
    TPR.NSP_USR="user";
    var kernelProject;
    if (!kernelDir) {
        kernelProject=CPRJ(TPR.NSP_KER, WebSite.compiledKernel);
    } else {
        kernelProject=ProjectCompiler(kernelDir);
    }
    var traceTbl=Tonyu.TraceTbl;//();
    var env={classes:Tonyu.classMetas, traceTbl:traceTbl, options:{compiler:{}} };
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
        var cur=TPR.runningThread; // Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=TPR.runningObj;
        if (main && main.stop) return main.stop();
    };
    TPR.rawRun=function (bootClassName) {
        if (WebSite.removeJSOutput) {
            var o=TPR.getOutputFile();
            if (o.exists()) o.rm();
        }
        return TPR.loadClasses().then(DU.throwF(function () {
            //TPR.compile();
            TPR.detectPlugins();
            TPR.fixBootRunClasses();
            if (!TPR.runScriptMode) thumbnail.set(TPR, 2000);
            TPR.rawBoot(bootClassName);
        }));
    };
    TPR.getResource=function () {
        var resFile=dir.rel("res.json");
        if (resFile.exists()) {
            var res=resFile.obj();
            var chg=false;
            for (var imgSnd in res) {
                var ary=res[imgSnd];
                for (var i=ary.length-1; i>=0 ;i--) {
                    if (!ary[i].url) {
                        ary.splice(i,1);
                        chg=true;
                    }
                }
            }
            if (chg) TPR.setResource(res);
            return res;
        }
        return Tonyu.defaultResource;
    };
    TPR.hasSoundResource=function () {
        var res=TPR.getResource();
        return res && res.sounds && res.sounds.length>0;
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
    TPR.getOptions=function () {//override
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
    TPR.fixOptions=function (opt) {//override
        if (!opt.compiler) opt.compiler={};
        opt.compiler.commentLastPos=TPR.runScriptMode || StackTrace.isAvailable();
        if (!opt.plugins) {
            opt.plugins={};
            /*dir.each(function (f) {
                if (f.endsWith(TPR.EXT)) {
                    plugins.detectNeeded(  f.text(), opt.plugins);
                }
            });*/
        }
    };
    TPR.detectPlugins=function () {
        var opt=TPR.getOptions();
        var plugins=opt.plugins=opt.plugins||{};
        if (!plugins.Mezonet || !plugins.PicoAudio) {
            var res=TPR.getResource();
            var hasMZO=false,hasMIDI=false;
            if (res.sounds) res.sounds.forEach(function (item) {
                if (item.url.match(/\.mzo/)) hasMZO=true;
                if (item.url.match(/\.midi?/)) hasMIDI=true;
            });
            if (hasMZO) TPR.addPlugin("Mezonet");
            else TPR.removePlugin("Mezonet");
            if (hasMIDI) TPR.addPlugin("PicoAudio");
            else TPR.removePlugin("PicoAudio");
        }
    };
    TPR.addPlugin=function (name) {
        var opt=TPR.getOptions();
        if (!opt.plugins[name]) {
            opt.plugins[name]=1;
            TPR.setOptions(opt);
        }
    };
    TPR.removePlugin=function (name) {
        var opt=TPR.getOptions();
        if (opt.plugins[name]) {
            delete opt.plugins[name];
            TPR.setOptions(opt);
        }
    };
    TPR.requestPlugin=function (name) {
        TPR.addPlugin(name);
        if (plugins.loaded(name)) return;
        var req=new Error("必要なプラグイン"+name+"を追加しました。もう一度実行してください");
        req.pluginName=name;
        throw req;
    };
    TPR.loadPlugins=function (onload) {
        var opt=TPR.getOptions();
        return plugins.loadAll(opt.plugins,onload);
    };

    TPR.fixBootRunClasses=function () {
        var opt=TPR.getOptions();
        if (opt.run) {
            var mc=TPR.fixClassName(opt.run.mainClass);
            var bc=TPR.fixClassName(opt.run.bootClass);
            if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                opt.run.mainClass=mc;
                opt.run.bootClass=bc;
                TPR.setOptions(opt);
            }
        }
    };
    TPR.fixClassName=function (cn) {
        //if (TPR.classExists(cn)) return cn;
        if (Tonyu.getClass(cn)) return cn;
        var cna=cn.split(".");
        var sn=cna.pop();
        var res;
        res=TPR.NSP_USR+"."+sn;
        if (Tonyu.getClass(res)) return res;
        //if (TPR.classExists(res)) return res;
        res=TPR.NSP_KER+"."+sn;
        if (Tonyu.getClass(res)) return res;
        //if (TPR.classExists(res)) return res;
        return cn;
    };
    TPR.getNamespace=function () {//override
        var opt=TPR.getOptions();
        if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
        if (TPR.isKernelEditable()) return TPR.NSP_KER;
        return TPR.NSP_USR;
    };
    TPR.getDependingProjects=function () {//override
        return [kernelProject];
    };
    TPR.getOutputFile=function () {//override
        var opt=TPR.getOptions();
        if (opt.compiler.outputFile) return FS.resolve(opt.compiler.outputFile);
        return dir.rel("js/concat.js");
    };
    TPR.setOptions=function (r) {
        if (r) env.options=r;
        var resFile=dir.rel("options.json");
        var old=resFile.exists() ? resFile.text() : "";
        var nw=JSON.stringify(env.options);
        if (old!=nw) {
            console.log("update option",old,nw);
            resFile.text(nw);
        }
    };
    TPR.rawBoot=function (bootClassName) {
        TPR.showProgress("Running "+bootClassName);
        TPR.initCanvas();
        Tonyu.run(bootClassName);
    };
    TPR.initCanvas=function () {
        Tonyu.globals.$mainCanvas=$("canvas");
    };
    TPR.srcExists=function (className, dir) {
        var r=null;
        dir.recursive(function (e) {
            if (e.truncExt(TPR.EXT)===className) {
                r=e;
            }
        });
        return r;
    };
    TPR.isKernel=function (className) {
        if (kernelDir) return TPR.srcExists(className, kernelDir);
        return env.classes[TPR.NSP_KER+"."+className] ||
            Tonyu.getClass(TPR.NSP_KER+"."+className);
    };
    TPR.isKernelEditable=function () {
    	return env.options.kernelEditable;
    };
    //TPR.getDir=function () {return dir;};
    //TPR.getName=function () { return dir.name().replace(/\/$/,""); };
    TPR.renameClassName=function (o,n) {// o: key of aliases
        return TPR.compile({noIncremental:true}).then(function () {
            var cls=TPR.env.classes;/*ENVC*/
            for (var cln in cls) {/*ENVC*/
                var klass=cls[cln];/*ENVC*/
                var f=klass.src ? klass.src.tonyu : null;
                var a=klass.annotation;
                var changes=[];
                if (a && f) {
                    console.log("Check", cln);
                    for (var id in a) {
                        try {
                            var an=a[id];
                            var si=an.scopeInfo;
                            if (si && si.type=="class") {
                                //console.log("si.type==class",an,si);
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
                } else {
                    console.log("No Check", cln);
                }
            }
        });
    };
    TPR.showProgress=function (m) {
        console.log("PROGRESS",m);
        if (typeof SplashScreen!="undefined") {
            SplashScreen.progress(m);
        }
        return DU.promise(function (succ) {
            setTimeout(succ,0);
        });
    };
    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
return Tonyu.Project;
});
