define(["Tonyu", "FS", "ImageList",
        "thumbnail","WebSite","plugins",
        "DeferredUtil"],
        function (Tonyu, FS, ImageList,
                thumbnail,WebSite,plugins,
                DU) {
// (was TonyuProject)
return {
    /*stop:function () {
        var cur=this.runningThread; // Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=this.runningObj;
        if (main && main.stop) return main.stop();
    },*/
    rawRun:function (bootClassName) {
        if (WebSite.removeJSOutput) {
            var o=this.getOutputFile();
            if (o.exists()) o.rm();
        }
        return this.loadClasses().then(()=>{
            //TPR.compile();
            this.detectPlugins();
            this.fixBootRunClasses();
            if (!this.runScriptMode) thumbnail.set(this, 2000);
            this.rawBoot(bootClassName);
        });
    },
    getResourceFile: function () {
        return this.getDir().rel("res.json");
    },
    getResource: function () {
        var resFile=this.getResourceFile();
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
            if (chg) this.setResource(res);
            return res;
        }
        return Tonyu.defaultResource;
    },
    hasSoundResource: function () {
        var res=this.getResource();
        return res && res.sounds && res.sounds.length>0;
    },
    setResource: function (rsrc) {
        var resFile=this.getResourceFile();
        resFile.obj(rsrc);
    },
    getThumbnail: function () {
        return thumbnail.get(this);
    },
    convertBlobInfos: function (user) {
        var rsrc=this.getResource();
        var name=this.getName();
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a=Blob.isBlobURL(v);
                    if (a) {
                        o[k]=[Blob.BLOB_PATH_EXPR,user,name,a.fileName].join("/");
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        this.setResource(rsrc);
    },
    getBlobInfos: function () {
        var rsrc=this.getResource();
        var res=[];
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a=Blob.isBlobURL(v);
                    if (a) {
                        res.push(a);
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        return res;
    },
    loadResource: function (next) {
        var r=this.getResource();
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
    },
    detectPlugins: function () {
        var opt=this.getOptions();
        var plugins=opt.plugins=opt.plugins||{};
        if (!plugins.Mezonet || !plugins.PicoAudio) {
            var res=this.getResource();
            var hasMZO=false,hasMIDI=false;
            if (res.sounds) res.sounds.forEach(function (item) {
                if (item.url.match(/\.mzo/)) hasMZO=true;
                if (item.url.match(/\.midi?/)) hasMIDI=true;
            });
            if (hasMZO) this.addPlugin("Mezonet");
            else this.removePlugin("Mezonet");
            if (hasMIDI) this.addPlugin("PicoAudio");
            else this.removePlugin("PicoAudio");
        }
    },
    addPlugin: function (name) {
        var opt=this.getOptions();
        opt.plugins=opt.plugins||{};
        if (!opt.plugins[name]) {
            opt.plugins[name]=1;
            this.setOptions(opt);
        }
    },
    removePlugin: function (name) {
        var opt=this.getOptions();
        if (opt.plugins[name]) {
            delete opt.plugins[name];
            this.setOptions(opt);
        }
    },
    requestPlugin: function (name) {
        this.addPlugin(name);
        if (plugins.loaded(name)) return;
        var req=new Error("必要なプラグイン"+name+"を追加しました。もう一度実行してください");
        req.pluginName=name;
        throw req;
    },
    loadPlugins: function (onload) {
        var opt=this.getOptions();
        return plugins.loadAll(opt.plugins,onload);
    },
    fixBootRunClasses: function () {
        var opt=this.getOptions();
        if (opt.run) {
            var mc=this.fixClassName(opt.run.mainClass);
            var bc=this.fixClassName(opt.run.bootClass);
            if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                opt.run.mainClass=mc;
                opt.run.bootClass=bc;
                this.setOptions(opt);
            }
        }
    },
    fixClassName: function (className) {
        if (Tonyu.classMetas[className]) return className;
        const ns=this.getNamespace();
        console.log("NS", ns);
        let res=Tonyu.classes[ns][className];
        if (res) return `${ns}.${className}`;
        for (var k in Tonyu.classes) {
            res=Tonyu.classes[k][className];
            if (res) return `${k}.${className}`;
        }
        throw new Error(`Cannot fix className ${className}`);
    },
    rawBoot: function (bootClassName) {
        this.showProgress("Running "+bootClassName);
        this.initCanvas();
        Tonyu.run(bootClassName);
    },
    initCanvas: function () {
        Tonyu.globals.$mainCanvas=$("canvas");
    },
    /*isKernelEditable: function () {
    	return env.options.kernelEditable;
    },*/
    //TPR.getDir=function () {return dir;};
    //TPR.getName=function () { return dir.name().replace(/\/$/,""); };

    showProgress: function (m) {
        console.log("PROGRESS",m);
        /*global SplashScreen*/
        if (typeof SplashScreen!="undefined") {
            SplashScreen.progress(m);
        }
        return DU.promise(function (succ) {
            setTimeout(succ,0);
        });
    }
};
});
