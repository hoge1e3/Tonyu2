Tonyu.Project=function (dir, kernelDir) {
    var TPR={};
    var traceTbl=Tonyu.TraceTbl();
    var env={classes:{}, traceTbl:traceTbl, options:{compiler:{}} };
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
                if (!spc || added[spc.name]) {
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
        if (Tonyu.currentThreadGroup) Tonyu.currentThreadGroup.kill();
        /*Sprites.clear();
        var cv=$("canvas")[0];
        Sprites.draw(cv);*/
    };
    TPR.run=function (mainClassName) {
        TPR.compile();
        TPR.boot(mainClassName);
    };
    TPR.compile=function () {
        Tonyu.runMode=false;
        env.classes={};
        Tonyu.currentProject=TPR;
        if (Tonyu.currentThreadGroup) Tonyu.currentThreadGroup.kill();
        delete Tonyu.currentThreadGroup;
        dir.each(collect);
        kernelDir.each(collect);
        function collect(f) {
            var n=f.name();
            if (FS.endsWith(n, ".tonyu")) {
                var nb=n.replace(/\.tonyu$/,"");
                env.classes[nb]={
                        name:nb,
                        src:{
                            tonyu: f
                        }
                };
            }
        }
        for (var n in env.classes) {
            console.log("initClassDecl: "+n);
            Tonyu.Compiler.initClassDecls(env.classes[n], env);
        }
        var ord=orderByInheritance(env.classes);
        ord.forEach(function (c) {
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
    TPR.boot=function (mainClassName) {
        var thg=Tonyu.threadGroup();
        var cv=$("canvas")[0];
        var mainClass=window[mainClassName];
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        Sprites.clear();
        Sprites.drawGrid=Tonyu.noviceMode;
        Tonyu.runMode=true;
        var main=new mainClass();
        //console.log("tp",Sprites);
        thg.addObj(main);
        //TPR.currentThreadGroup=
        Tonyu.currentThreadGroup=thg;
        $LASTPOS=0;

        $pat_fruits=30;
        $screenWidth=cv.width;
        $screenHeight=cv.height;
        thg.run(33, function () {
            Key.update();
            $screenWidth=cv.width;
            $screenHeight=cv.height;
            Sprites.draw(cv);
            Sprites.checkHit();
        });
    };
    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
