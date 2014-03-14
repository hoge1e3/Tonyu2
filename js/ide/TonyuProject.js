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
                if (!spc || spc.builtin || added[spc.name]) {
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
    /*TPR.run=function (mainClassName) {
        TPR.compile();
        TPR.boot(mainClassName);
    };*/
    TPR.compile=function () {
    	if (!env.kernelClasses) TPR.compileKernel();
    	TPR.compileUser();
    };
    TPR.compileKernel=function () {
    	TPR.compileDir(kernelDir);
    	env.kernelClasses=env.classes;
    };
    TPR.compileUser=function () {
    	TPR.compileDir(dir,env.kernelClasses);
    };
    TPR.compileDir=function (cdir, baseClasses) {
        TPR.getOptions();
        Tonyu.runMode=false;
        env.classes=Tonyu.extend({}, baseClasses || {});
        var skip=Tonyu.extend({}, baseClasses || {});
        Tonyu.currentProject=TPR;
        Tonyu.globals.$currentProject=TPR;
        //kernelDir.each(collect);
        cdir.each(collect);
        function collect(f) {
            if (f.endsWith(TPR.EXT)) {
                var nb=f.truncExt(TPR.EXT);
                env.classes[nb]={
                        name:nb,
                        src:{
                            tonyu: f
                        }
                };
                delete skip[nb];
            }
        }
        for (var n in env.classes) {
        	if (skip[n]) continue;
            console.log("initClassDecl: "+n);
            Tonyu.Compiler.initClassDecls(env.classes[n], env);
        }
        var ord=orderByInheritance(env.classes);
        ord.forEach(function (c) {
        	if (skip[c.name]) return;
            console.log("genJS :"+c.name);
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
/*    TPR.boot=function (mainClassName) {
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
    };*/
    TPR.isKernel=function (className) {
        var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;
    };

    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});