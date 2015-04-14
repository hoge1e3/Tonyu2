define(["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics","Tonyu.TraceTbl","FS"],
        function (Tonyu,JSGenerator,Semantics, ttb,FS) {
var TPRC=function (dir) {
    if (!dir.rel) throw new Error("projectCompiler: "+dir+" is not dir obj");
     var TPR={env:{}};
     var traceTbl=Tonyu.TraceTbl;//();
     TPR.env.traceTbl=traceTbl;
     TPR.EXT=".tonyu";
     TPR.getOptionsFile=function () {
         var resFile=dir.rel("options.json");
         return resFile;
     };
     TPR.getOptions=function () {
         var env=TPR.env;
         env.options={};
         var resFile=TPR.getOptionsFile();
         if (resFile.exists()) env.options=resFile.obj();
         TPR.fixOptions(env.options);
         return env.options;
     };
     TPR.fixOptions=function (opt) {
         if (!opt.compiler) opt.compiler={};
         //if (!opt.srcPath) opt.srcPath={"user": "."};
         //opt.compiler.commentLastPos=TPR.runScriptMode || StackTrace.isAvailable();
         //opt.run.mainClass=TPR.fixClassName(opt.run.mainClass);
         //opt.run.bootClass=TPR.fixClassName(opt.run.bootClass);
     };
     TPR.resolve=function (rdir){
         if (rdir instanceof Array) {
             var res=[];
             rdir.forEach(function (e) {
                 res.push(TPR.resolve(e));
             });
             return res;
         }
         if (typeof rdir=="string") {
             return FS.resolve(rdir, dir.path());
         }
         if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
         return rdir;
     };
     TPR.shouldCompile=function () {
         var outF=TPR.getOutputFile();
         if (!outF.exists()) {
             return true;
         }
         if (outF.isReadOnly()) return false;
         var outLast=outF.lastUpdate();
         //console.log("Outf last="+new Date(outLast));
         var sf=TPR.sourceFiles();
         for (var i in sf) {
             var f=sf[i];
             var l=f.lastUpdate();
             if (l>outLast) {
                 console.log("Should compile: ", f.name()+" last="+new Date(l));
                 return true;
             }
         }
         var resFile=TPR.getOptionsFile();
         if (resFile.exists() && resFile.lastUpdate()>outLast) {
             console.log("Should compile: ", resFile.name()+" last="+new Date(resFile.lastUpdate()));
             return true;
         }
         return false;
     };
     TPR.getNamespace=function () {
         var opt=TPR.getOptions();
         return opt.compiler.namespace;
     };
     TPR.getOutputFile=function (lang) {
         var opt=TPR.getOptions();
         console.log("Loaded option: ",dir,opt);
         var outF=TPR.resolve(opt.compiler.outputFile);
         if (outF.isDir()) {
             throw new Error("out: directory style not supported");
         }
         return outF;
     };
     // Difference of ctx and env:  env is of THIS project. ctx is of cross-project
     TPR.loadClasses=function (ctx/*or options(For external call)*/) {
         Tonyu.runMode=false;
         console.log("LoadClasses: "+dir.path());
         ctx=initCtx(ctx);
         var visited=ctx.visited||{};
         var classes=ctx.classes||{};
         if (visited[TPR.path()]) return;
         visited[TPR.path()]=true;
         var myNsp=TPR.getNamespace();
         TPR.getDependingProjects().forEach(function (p) {
             if (p.getNamespace()==myNsp) return;
             p.loadClasses(ctx);
         });
         if (TPR.shouldCompile()) {
             TPR.compile(ctx);
         } else {
             var outF=TPR.getOutputFile("js");
             evalFile(outF);
             var ns=TPR.getNamespace();
             var cls=Tonyu.classes;
             ns.split(".").forEach(function (c) {
                 cls=cls[c];
                 if (!cls) throw new Error("namespace Not found :"+ns);
             });
             for (var cln in cls) {
                 var cl=cls[cln];
                 var m=Tonyu.klass.getMeta(cl);
                 classes[m.fullName]=m;
             }
         }
     };
     function initCtx(ctx) {
         var env=TPR.env;
         if (!ctx) ctx={};
         if (!ctx.visited) {
             ctx={visited:{}, classes:(env.classes=env.classes||{}),options:ctx};
         }
         return ctx;
     }
     TPR.compile=function (ctx/*or options(For external call)*/) {
         Tonyu.runMode=false;
         console.log("Compile: "+dir.path());
         ctx=initCtx(ctx);
         var dp=TPR.getDependingProjects();
         var myNsp=TPR.getNamespace();
         dp.forEach(function (dprj) {
             var nsp=dprj.getNamespace();
             if (nsp!=myNsp) {
                 dprj.loadClasses(ctx);
             }
         });
         var dirs=TPR.sourceDirs();
         TPR.compileDir(myNsp ,dirs, ctx);
     };
     TPR.compileDir=function (nsp ,dirs, ctx) {
         var baseClasses=ctx.classes;
         var ctxOpt=ctx.options;
         dirs=TPR.resolve(dirs);
         var env=TPR.env;
         env.aliases={};
         env.classes=baseClasses;
         for (var n in baseClasses) {
             var cl=baseClasses[n];
             env.aliases[ cl.shortName] = cl.fullName;
         }
         var newClasses={};
         //Tonyu.currentProject=TPR;
         //Tonyu.globals.$currentProject=TPR;
         //console.log(dirs);
         var sf=TPR.sourceFiles(nsp,dirs);
         for (var shortCn in sf) {
             var f=sf[shortCn];
             var fullCn=nsp+"."+shortCn;
             newClasses[fullCn]=baseClasses[fullCn]={
                     fullName: fullCn,
                     shortName: shortCn,
                     namespace:nsp,
                     src:{
                         tonyu: f
                     }
             };
             env.aliases[shortCn]=fullCn;
         }
         for (var n in newClasses) {
             console.log("initClassDecl: "+n);
             Semantics.initClassDecls(newClasses[n], env);/*ENVC*/
         }
         var ord=orderByInheritance(newClasses);/*ENVC*/
         ord.forEach(function (c) {
             console.log("annotate :"+c.fullName);
             Semantics.annotate(c, env);
         });
         TPR.concatJS(ord);
     };
     TPR.concatJS=function (ord) {
         var env=TPR.env;
         var cbuf="";
         ord.forEach(function (c) {
             console.log("concatJS :"+c.fullName);
             JSGenerator.genJS(c, env);
             cbuf+=c.src.js+"\n";
         });
         var outf=TPR.getOutputFile();
         outf.text(cbuf);
         evalFile(outf);
     };
     TPR.getDependingProjects=function () {
         var opt=TPR.getOptions();
         var dp=opt.compiler.dependingProjects || [];
         return dp.map(function (dprj) {
             var prjDir=TPR.resolve(dprj);
             return TPRC(prjDir);
         });
     };
     TPR.dir=dir;
     TPR.path=function () {return dir.path();};

     TPR.sourceFiles=function (nsp,dirs) {
         nsp=nsp || TPR.getNamespace();
         dirs=dirs || TPR.sourceDirs();
         var res={};
         for (var i=dirs.length-1; i>=0 ; i--) {
             dirs[i].recursive(collect);
         }
         function collect(f) {
             if (f.endsWith(TPR.EXT)) {
                 var nb=f.truncExt(TPR.EXT);
                 res[nb]=f;
             }
         }
         return res;
     };
     TPR.sourceDirs=function () {
         var dp=TPR.getDependingProjects();
         var myNsp=TPR.getNamespace();
         var dirs=[dir];
         dp.forEach(function (dprj) {
             var nsp=dprj.getNamespace();
             if (nsp==myNsp) {
                 dirs.push(dprj.dir);
             }
         });
         return dirs;
     };
    function orderByInheritance(classes) {/*ENVC*/
        var added={};
        var res=[];
        var crumbs={};
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
                var deps=dep1(c);
                //var ready=true;
                /*deps.forEach(function (cl) {
                    ready=ready && (
                       !cl || !classes[cl.fullName] || cl.builtin || added[cl.fullName]
                    );
                });*/
                if (deps.length==0) {
                    res.push(c);
                    added[n]=true;
                }
            }
            if (res.length==p) {
                var loop=[];
                for (var n in classes) {
                    if (!added[n]) {
                        loop=detectLoop(classes[n]) || [];
                        break;
                    }
                }
                throw TError( "次のクラス間に循環参照があります: "+loop.join("->"), "不明" ,0);
            }
        }
        function dep1(c) {
            var spc=c.superClass;
            var deps=spc ? [spc]:[] ;
            if (c.includes) deps=deps.concat(c.includes);
            deps=deps.filter(function (cl) {
                return cl && classes[cl.fullName] && !cl.builtin && !added[cl.fullName];
            });
            return deps;
        }
        function detectLoop(c, prev){
            //  A->B->C->A
            // c[B]=A  c[C]=B   c[A]=C
            console.log("detectloop",c.fullName);
            if (crumbs[c.fullName]) {   // c[A]
                console.log("Detected: ",c.fullName, crumbs, crumbs[c.fullName]);
                var n=c.fullName;
                var loop=[];
                do {
                    loop.unshift(n);    // A      C       B
                    n=crumbs[n];        // C      B       A
                } while(n!=c.fullName);
                loop.unshift(c.fullName);
                return loop;
            }
            if (prev) crumbs[c.fullName]=prev.fullName;
            var deps=dep1(c),res;
            deps.forEach(function (d) {
                if (res) return;
                var r=detectLoop(d,c);
                if (r) res=r;
            });
            delete crumbs[c.fullName];
            return res;
        }
        return res;
    }
    function evalFile(f) {
        console.log("loading: "+f.path());
        /*if (typeof require=="function") return require(f.path());
        else */
        var lastEvaled=new Function(f.text());
        traceTbl.addSource(f.path(),lastEvaled+"");
        //f.rel("../"+f.name()+".dump").text(lastEvaled+"");
        return lastEvaled();
    }
    TPR.decodeTrace=function (desc) { // user.Test:123
        var a=desc.split(":");
        var cl=a[0],pos=parseInt(a[1]);
        var cls=cl.split(".");
        var sn=cls.pop();
        var nsp=cls.join(".");
        if (nsp==TPR.getNamespace()) {
            var sf=TPR.sourceFiles();
            for (var i in sf) {
                if (sn==i) {
                    return TError("Trace info", sf[i], pos);
                }
            }
        }
    };
    return TPR;
}
return TPRC;
});

