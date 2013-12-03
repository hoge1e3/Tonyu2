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
    TPR.run=function (mainClassName) {
        env.classes={};
        Tonyu.currentProject=TPR;
        if (TPR.currentThreadGroup) TPR.currentThreadGroup.kill();
        delete TPR.currentThreadGroup;
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
            initClassDecls(env.classes[n], env);
        }
        var ord=orderByInheritance(env.classes);
        ord.forEach(function (c) {
            console.log("genJS :"+c.name);
            genJS(c, env);
            //console.log(c.src.js);
            eval(c.src.js);
        });
        var thg=Tonyu.threadGroup();
        var main=new window[mainClassName]();
        if (!main) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        thg.addObj(main);
        TPR.currentThreadGroup=thg;
        $LASTPOS=0;
        Sprites.clear();
        thg.run(33, function () {
            Key.update();
            Sprites.draw($("canvas")[0]);
        });
    };
    return TPR;
};
