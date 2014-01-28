requirejs.setName('reqConf');
//"var reqConf="+JSON.stringify( getReq.genConf({base:"http://localhost:3002/js/", baseUrl:"js"})+";"
var reqConf={
        "shim": {
            TextEditor: {
                exports: "TextEditor"
            },
            FileMenu: {
                exports: "FileMenu"
            },
            "disp": {
                "deps": ["IndentBuffer"],
                "exports": "disp"
            },
            "Util": {
                "exports": "Util"
            },
            "Profiler": {
                "exports": "Profiler"
            },
            "TextUtil": {
                "exports": "TextUtil"
            },
            "ObjectMatcher": {
                "exports": "ObjectMatcher"
            },
            "Arrow": {
                "exports": "Arrow"
            },
            "context": {
                "exports": "context"
            },
            "IndentBuffer": {
                "exports": "IndentBuffer"
            },
            "ExpressionParser": {
                "deps": ["Parser"],
                "exports": "ExpressionParser"
            },
            "Grammar": {
                "deps": ["Parser"],
                "exports": "Grammar"
            },
            "Parser": {
                "deps": ["disp"],
                "exports": "Parser"
            },
            "TonyuLang": {
                "deps": ["Grammar", "XMLBuffer", "IndentBuffer", "disp", "Parser", "ExpressionParser", "TError"],
                "exports": "TonyuLang"
            },
            "Visitor": {
                "exports": "Visitor"
            },
            "XMLBuffer": {
                "deps": ["Parser"],
                "exports": "XMLBuffer"
            },
            "Tonyu": {
                "exports": "Tonyu"
            },
            "Tonyu.Compiler": {
                "deps": ["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer", "context", "Visitor"],
                "exports": "Tonyu.Compiler"
            },
            "fixIndent": {
                "deps": ["TonyuLang", "Visitor", "Grammar"],
                "exports": "fixIndent"
            },
            "Tonyu.TraceTbl": {
                "deps": ["Tonyu", "FS", "TError"],
                "exports": "Tonyu.TraceTbl"
            },
            "Sprites": {
                "deps": ["fukidashi", "Tonyu"],
                "exports": "Sprites"
            },
            "Key": {
                "exports": "Key"
            },
            "TextRect": {
                "exports": "TextRect"
            },
            "fukidashi": {
                "deps": ["TextRect"],
                "exports": "fukidashi"
            },
            "FS": {
                "exports": "FS"
            },
            "showErrorPos": {
                "exports": "showErrorPos"
            },
            "TError": {
                "exports": "TError"
            },
            "fs/ROMk": {
                "deps": ["FS"]
            },
            "fs/ROMd": {
                "deps": ["FS"]
            },
            "fs/ROMs": {
                "deps": ["FS"]
            },
            "FileList": {
                "deps": ["FS"],
                "exports": "FileList"
            },
            "HttpHelper": {
                "exports": "HttpHelper"
            },
            "Wiki": {
                "deps": ["HttpHelper", "Arrow", "Util"],
                "exports": "Wiki"
            },
            "ace": {
                "exports": "ace"
            },
            "fs/import": {
                deps: ["FS"]
            },
            "fs/export": {
                deps: ["Shell","FS"]
            },
            "ide/selProject": {
                deps: ["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki"]
            },
            "ide/noviceSelProject": {
                deps: ["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki"]
            }
        },
        "paths": {
            WebSite: "runtime/WebSite",
            UI:"lib/UI",
            ImageResEditor: "ide/ImageResEditor",
            reqConf: "reqConf",
            dumpScript: "lib/dumpScript",
            runScript: "runtime/runScript",
            copySample: "ide/copySample",
            "Shell": "fs/Shell",
            "ide/wikiEditor": "ide/wikiEditor",
            TextEditor: "ide/TextEditor",
            FileMenu: "fs/FileMenu",
            ImageList: "graphics/ImageList",
            "disp": "lib/disp",
            "Util": "lib/util",
            "Profiler": "lib/profiler",
            "TextUtil": "lib/TextUtil",
            "ObjectMatcher": "lang/ObjectMatcher",
            "Arrow": "help/Arrow",
            "context": "lang/context",
            "IndentBuffer": "lang/IndentBuffer",
            "ExpressionParser": "lang/ExpressionParser2",
            "Grammar": "lang/Grammar",
            "Parser": "lang/parser",
            "TonyuLang": "lang/parse_tonyu2",
            "Visitor": "lang/Visitor",
            "XMLBuffer": "lang/XMLBuffer",
            "Tonyu": "runtime/TonyuLib",
            "Tonyu.Iterator": "runtime/Iterator",
            "Tonyu.Compiler": "lang/compiler2",
            "fixIndent": "lang/indent",
            "Tonyu.TraceTbl": "runtime/TraceTbl",
            "Sprites": "graphics/Sprites",
            "Key": "runtime/Key",
            "TextRect": "graphics/TextRect",
            "fukidashi": "graphics/fukidashi",
            "FS": "fs/fs",
            "Tonyu.Project": "ide/TonyuProject",
            "showErrorPos": "ide/ErrorPos",
            "TError": "ide/TError",
            "ide/editor": "ide/editor",
            "fs/ROMk": "../fs/Tonyu/js/gen/ROM_k",
            "fs/ROMd": "../fs/Tonyu/js/gen/ROM_d",
            "fs/ROMs": "../fs/Tonyu/js/gen/ROM_s",
            "ProjectOptionsEditor": "ide/ProjectOptionsEditor",
            "FileList": "fs/FileList",
            "HttpHelper": "help/HttpHelper",
            "Wiki": "help/wiki",
            "ace": "lib/ace-noconflict/ace",
            "ide/noviceSelProject": "ide/noviceSelProject",
            "ide/noviceEditor": "ide/noviceEditor",
            PatternParser:"graphics/PatternParser",
            copyToKernel: "fs/copyToKernel",
            "foo":"bar"
        },
        "baseUrl": "js"
};
requirejs.setName('runScript');
define(["fs/ROMk","FS","Tonyu.Project","Shell","Sprites","ImageList"],
        function (romk,FS,Tonyu_Project, sh, Sprites, ImageList) {
    $(function () {
        Tonyu.defaultResource={
                images:[
                        {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
                        //{url: "http://jsrun.it/assets/6/F/y/3/6Fy3B.png", pwidth:32, pheight:32},
                        {name:"$pat_sample", url: "images/Sample.png"},
                        {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
                        //{url: "http://jsrun.it/assets/j/D/9/q/jD9qQ.png", pwidth:32, pheight:32}
                ],
                sounds:[]
        };
        Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                run: {mainClass: "Main", bootClass: "Boot"},
                kernelEditable: false
            };

        var w=$(window).width()-20;
        var h=$(window).height()-20;
        $("<canvas>").attr({width: w, height:h}).appendTo("body");
        var scrs=$("script");
        var curProjectDir=FS.get("/Tonyu/runscript/");
        if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
        var name="Main";
        scrs.each(function (){
            var s=this;
            //console.log(s.type, s.dataset.filename);
            if (s.type=="text/tonyu") {
                var fn=$(s).data("filename");
                if (fn) {
                    var f=curProjectDir.rel(fn);
                    //console.log(f);
                    var w=$(s).data("wrap");
                    if (w) {
                        w=parseInt(w);
                        f.text(unwrap(s.innerHTML, w));
                    } else {
                        f.text(s.innerHTML);
                    }
                    if ($(s).data("main")) {
                        name=f.truncExt(".tonyu");
                    }
                }
            }
        });
        var kernelDir=FS.get("/Tonyu/Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        curPrj.env.options.compiler.defaultSuperClass="Actor";
        Tonyu.setGlobal("$mainClassName", name);
        curPrj.rawRun("Boot");
        function unwrap(str, cols) {
            var lines=str.split("\n");
            var buf="";
            lines.forEach(function (line) {
                if (line.length>cols) {
                    buf+=line.substring(0,cols);
                } else {
                    buf+=line+"\n";
                }
            });
            return buf;
        }
    });
});

requirejs.setName('Tonyu.Project');
define(["Tonyu", "Tonyu.Compiler", "TError", "FS", "Tonyu.TraceTbl","ImageList", "Sprites", "Key"],
        function (Tonyu, Tonyu_Compiler, TError, FS, Tonyu_TraceTbl, ImageList, Sprites, Key) {
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
        var cur=TPR.runningThread; //Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        /*Sprites.clear();
        var cv=$("canvas")[0];
        Sprites.draw(cv);*/
    };
    TPR.rawRun=function (mainClassName) {
        TPR.compile();
        TPR.rawBoot(mainClassName);
    };
    TPR.run=function (mainClassName) {
        TPR.compile();
        TPR.boot(mainClassName);
    };
    TPR.compile=function () {
        TPR.getOptions();
        Tonyu.runMode=false;
        env.classes={};
        Tonyu.currentProject=TPR;
        Tonyu.globals.$currentProject=TPR;
        /*if (Tonyu.currentThreadGroup) Tonyu.currentThreadGroup.kill();
        delete Tonyu.currentThreadGroup;*/
        kernelDir.each(collect);
        dir.each(collect);
        function collect(f) {
            if (f.endsWith(TPR.EXT)) {
                var nb=f.truncExt(TPR.EXT);
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
                console.log("$Sprites set!");
                sp.setImageList(r);
            }
            Sprites.setImageList(r);
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
    };
    TPR.boot=function (mainClassName) {
        TPR.loadResource(function () {ld(mainClassName);});
    };
    function ld(mainClassName){
        var thg=Tonyu.threadGroup();
        var cv=$("canvas")[0];
        var mainClass=Tonyu.getClass(mainClassName);// window[mainClassName];
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        Sprites.clear();
        Sprites.drawGrid=Tonyu.noviceMode;
        Tonyu.runMode=true;
        var main=new mainClass();
        //console.log("tp",Sprites);
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
            Sprites.draw(cv);
            Sprites.checkHit();
        });
    };
    TPR.isKernel=function (className) {
        var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;
    };

    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});
requirejs.setName('Shell');
define(["FS","Util"],function (FS,Util) {
    var Shell={cwd:FS.get("/")};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir);
        return Shell.pwd();
    };
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (mustExist && !r.exists()) throw r+": no such file or directory";
        return r;
    }
    Shell.resolve=resolve;
    function resolve2(v) {
        if (typeof v!="string") return v;
        if (Util.startsWith(v,"/")) return FS.get(v);
        var c=Shell.cwd;
        while (Util.startsWith(v,"../")) {
            c=c.up();
            v=v.substring(3);
        }
        return c.rel(v);
    }
    Shell.pwd=function () {
        return Shell.cwd;
    };
    Shell.ls=function (){
        return Shell.cwd.ls();
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            console.log("cp", from ,to);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        if (f.isDir() && t.isDir()) {
            var sum=0;
            f.recursive(function (src) {
                var rel=src.relPath(f);
                var dst=t.rel(rel);
                if (options.test || options.v) {
                    console.log((dst.exists()?"[ovr]":"[new]")+dst+"<-"+src);
                }
                if (!options.test) {
                    dst.copyFrom(src);
                }
                sum++;
            });
            return sum;
        } else if (!f.isDir() && !t.isDir()) {
            t.text(f.text());
            return 1;
        } else if (!f.isDir() && t.isDir()) {
            t.rel(f.name()).text(f.text());
            return 1;
        } else {
            throw "Cannot copy directory "+f+" to file "+t;
        }
    };
    Shell.rm=function (file, options) {
        if (!options) options={};
        file=resolve(file, true);
        if (file.isDir() && options.r) {
            var dir=file;
            var sum=0;
            dir.each(function (f) {
                if (f.exists()) {
                    sum+=Shell.rm(f, options);
                }
            });
            dir.rm();
            return sum+1;
        } else {
            file.rm();
            return 1;
        }
    };
    Shell.cat=function (file) {
        file=resolve(file, true);
        console.log(file.text());
        return "";
    };
    sh=Shell;
    return Shell;
});
requirejs.setName('ImageList');
define(["PatternParser","Util","WebSite"], function (PP,Util,WebSite) {
    function IL(resImgs, onLoad) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loaded", resImg,i);
            var url=resImg.url;
            if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
            if (!Util.startsWith(url,"data")) url+="?" + new Date().getTime();
            var im=$("<img>").attr("src",url);
            im.load(function () {
                var pw,ph;
                if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
                    var x=0, y=0, w=this.width, h=this.height;
                    var r=[];
                    while (true) {
                        r.push({image:this, x:x,y:y, width:pw, height:ph});
                        x+=pw;
                        if (x+pw>w) {
                            x=0;
                            y+=ph;
                            if (y+ph>h) break;
                        }
                    }
                    resa[i]=r;
                } else {
                    var p=new PP(this);
                    resa[i]=p.parse();
                }
                resa[i].name=resImg.name;
                cnt--;
                if (cnt==0) {
                    var res=[];
                    var names={};
                    resa.forEach(function (a) {
                        names[a.name]=res.length;
                        res=res.concat(a);
                    });
                    res.names=names;
                    onLoad(res);
                }
            });
        });
    }
    return IL;
});
requirejs.setName('FS');
FS=function () {
    var FS={};
    var roms={};
    function endsWith(str,postfix) {
        return str.substring(str.length-postfix.length)===postfix;
    }
    FS.endsWith=endsWith;
    function startsWith(str,prefix) {
        return str.substring(0, prefix.length)===prefix;
    }
    function now(){
        return new Date().getTime();
    }
    FS.splitPath=splitPath;
    function splitPath(path) {
        return path.split("/");
    }
    function resolveROM(path) {
        for (var romPath in roms) {
            var pre=path.substring(0,romPath.length);
            var post=path.substring(romPath.length);
            if (pre==romPath) {
                return {rom:roms[romPath],rel:post};
            }
        }
        return null;
    }
    function lcs(path, text) {
        var r=resolveROM(path);
        if (arguments.length==2) {
            if (r) throw path+" is Read only.";
            if (text==null) delete localStorage[path];
            else return localStorage[path]=text;
        } else {
            if (r) {
                return r.rom[r.rel];
            }
            return localStorage[path];
        }
    }
    function lcsExists(path) {
        var r=resolveROM(path);
        if (r) return r.rel in r.rom;
        return path in localStorage;
    }
    function putDirInfo(path, dinfo) {
        if (path==null) throw "putDir: Null path";
        if (!isDir(path)) throw "Not a directory : "+path;
        lcs(path, JSON.stringify(dinfo));
        var ppath=up(path);
        if (ppath==null) return;
        var pdinfo=getDirInfo(ppath);
        touch(pdinfo, ppath, getName(path));
    }
    function getDirInfo(path) {
        if (path==null) throw "getDir: Null path";
        if (!endsWith(path,"/")) path+="/";
        var dinfo=lcs(path);
        try {
            dinfo=JSON.parse(dinfo);
        } catch (e) {
            dinfo={};
            lcs(path,"{}");
        }
        return dinfo;
    }
    function touch(dinfo, path, name) { // path:path of dinfo
        //if (!dinfo[name]) {
            dinfo[name]={lastUpdate:now()};
            putDirInfo(path ,dinfo);
        //}
    }
    function removeEntry(dinfo, path, name) {// path:path of dinfo
        if (dinfo[name]) {
            delete dinfo[name];
            putDirInfo(path ,dinfo);
        }
    }
    FS.orderByName=function (a,b) {
        return (a>b ? 1 : (a<b ? -1 : 0));
    };
    FS.importDir=function (exported) {
        var base=FS.get(exported.base);
        if (!exported.confirm) base.mkdir();
        var data=exported.data;
        var res=[];
        for (var i in data) {
            var p=base.path()+i;
            var f=FS.get(p);
            res.push("["+ ( f.isReadOnly() ? "ro" : f.exists() ? "exists": "new" )+ "]"+p);
            if (f.isReadOnly()) continue;
            if (!exported.confirm) {
                if (f.isDir()) {
                    var dinfo= getDirInfo(p);
                    var ovr=JSON.parse(data[i]);
                    for (var k in ovr) {
                        dinfo[k]=ovr[k];
                    }
                    putDirInfo(p, dinfo);
                } else {
                    lcs(p, data[i]);
                }
            }
        }
        return res;
    };
    FS.mountROM=function (exported) {
        roms[exported.base]=exported.data;
    };
    FS.exportDir=function (dir) {
        if (typeof dir=="string") dir=FS.get(dir);
        var res={base: dir.path()};
        var data=res.data={};
        e(dir);
        return res;
        function e(cfd) {
            var rp=cfd.relPath(dir);
            data[rp]=cfd.text();
            if (cfd.isDir()) {
                cfd.each(e);
            }
        }
    };
    FS.get=function (path) {
        if (path==null) throw "FS.get: Null path";
        if (path.isDir) return path;
        if (!isPath(path)) throw "Path must starts with '/'";
        var parent=up(path);
        var name=getName(path);
        var res;
        if (isDir(path)) {
            var dir=res={};
            dir.each=function (f) {
                dir.ls().forEach(function (n) {
                    var subd=dir.rel(n);
                    f(subd);
                });
            };
            dir.recursive=function (fun) {
                dir.each(function (f) {
                    if (f.isDir()) f.recursive(fun);
                    else fun(f);
                });
            };
            dir.ls=function (ord) {
                var dinfo=getDirInfo(path);
                var res=[];
                for (var i in dinfo) {
                    res.push(i);
                }
                if (typeof ord=="function" && res.sort) res.sort(ord);
                return res;
            };
            dir.isDir=function () {return true;};
            dir.rel=function (relPath){
                return FS.get(path+relPath);
            };
            dir.rm=function (ord) {
                if (!dir.exists()) throw path+": No such dir.";
                var lis=dir.ls(ord);
                if (lis.length>0) throw path+": Directory not empty";
                lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntry(pinfo, parent, name);
                }
            };
            dir.mkdir=function () {
                dir.touch();
                getDirInfo(path);
            };
            dir.text=function () {
                return lcs(path);
            };
            dir.obj =function () {
                return JSON.parse(dir.text());
            };
        } else {
            var file=res={};

            file.isDir=function () {return false;};
            file.rm=function () {
                if (!file.exists()) throw path+": No such file.";
                lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntry(pinfo, parent, name);
                }
            };
            file.text=function () {
                if (arguments.length==0) {
                    return lcs(path);
                } else {
                    lcs(path, arguments[0]);
                    file.touch();
                }
            };
            file.obj=function () {
                if (arguments.length==0) {
                    return JSON.parse( file.text() );
                } else {
                    file.text(JSON.stringify(arguments[0]));
                }
            };
            file.copyFrom=function (src) {
                file.text(src.text());
            };
        }
        res.relPath=function (base) {
            //  path= /a/b/c   base=/a/b/  res=c
            //  path= /a/b/c/   base=/a/b/  res=c/
            var bp=(base.path ? base.path() : base);
            if (bp.substring(bp.length-1)!="/") {
                throw bp+" is not a directory.";
            }
            if (path.substring(0,bp.length)!=bp) {
                throw path+" is not in "+bp;
            }
            return path.substring(bp.length);
        };
        res.exists=function () {
            return lcsExists(path);
        };
        res.up=function () {
            if (parent==null) return null; //  path=/
            return FS.get(parent);
        };
        res.path=function () {return path;};
        res.name=function () {return name;};
        res.truncExt=function (ext) {
            return name.substring(0,name.length-ext.length);
        };
        res.touch=function () {
            if (parent==null) return ; //  path=/
            var pinfo=getDirInfo(parent);
            touch(pinfo, parent, name);
        };
        res.isReadOnly=function () {
            var r=resolveROM(path);
            return !!r;
        };
        res.startsWith=function (pre) {
            return startsWith(name, pre);
        };
        res.endsWith=function (post) {
            return endsWith(name, post);
        };
        res.equals=function (o) {
            return (o && typeof o.path=="function" && o.path()==path);
        };
        res.toString=function (){
            return path;
        };
        return res;
    };
    function up(path) {
        if (path=="/") return null;
        var s=splitPath(path);
        var name=s[s.length-1];
        var isDir=name=="";
        if (!isDir) {
            s[s.length-1]="";
            return  s.join("/") ;
        } else {
            s.pop();
            s[s.length-1]="";
            return  s.join("/") ;
        }
    }
    function isPath(path) {
        return startsWith(path,"/");
    }
    function isDir(path) {
        return endsWith(path,"/");
    }
    function getName(path) {  //  a/b/c  => c    a/b/c/  => c/
        var patha=splitPath(path);
        if (patha[patha.length-1]=="") {
            name=patha[patha.length-2]+"/";
        } else {
            name=patha[patha.length-1];
        }
        return name;
    }
    FS.scan=function () {
        for (var path in localStorage) {
            if (!isPath(path)) continue;
            var p=up(path);
            if (p==null) continue;
            var dinfo=getDirInfo(p);
            var name=getName(path);
            touch(dinfo, p , name);
        }
    };
    FS.dump=function () {
        for (var i in localStorage) {
            console.log(i);
        }
    };
    FS.ls=function (path) {
        return FS.get(path).ls();
    };
    return FS;
}();
requirejs.setName('Tonyu');
Tonyu=function () {
    var preemptionTime=60;
    function thread() {
        var fb={enter:enter, exit:exit, steps:steps, step:step, isAlive:isAlive, isWaiting:isWaiting,
                suspend:suspend,retVal:retVal, kill:kill, waitFor: waitFor};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        var retVal;
        var _isWaiting=false;
        function isAlive() {
            return frame!=null && _isAlive;
        }
        function isWaiting() {
            return _isWaiting;
        }
        function suspend() {
            cnt=0;
        }
        function enter(frameFunc) {
            frame={prev:frame, func:frameFunc};
        }
        function step() {
            if (frame) frame.func(fb);
        }
        function exit(res) {
            frame=frame.prev;
            //if (frame) frame.res=res;
            retVal=res;
        }
        function waitFor(j) {
            _isWaiting=true;
            if (j && j.addTerminatedListener) j.addTerminatedListener(function () {
                _isWaiting=false;
                if (fb.group) fb.group.notifyResume();
                //fb.group.add(fb);
            });
        }

        function retVal() {
            return retVal;
        }
        function steps() {
            var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            //var lim=new Date().getTime()+preemptionTime;
            cnt=preemptionTime;
            //while (new Date().getTime()<lim) {
            while (cnt-->0) {
                step();
            }
            Tonyu.currentThread=sv;
        }
        function kill() {
            _isAlive=false;
        }
        return fb;
    }
    function timeout(t) {
        var res={};
        var ls=[];
        res.addTerminatedListener=function (l) {
            ls.push(l);
        };
        setTimeout(function () {
            ls.forEach(function (l) {
                l();
            });
        },t);
        return res;
    }
    function asyncResult() {
        var res=[];
        var ls=[];
        var hasRes=false;
        res.addTerminatedListener=function (l) {
            if (hasRes) l();
            else ls.push(l);
        };
        res.receiver=function () {
            hasRes=true;
            for (var i=0; i<arguments.length; i++) {
                res[i]=arguments[i];
            }
            res.notify();
        };
        res.notify=function () {
            ls.forEach(function (l) {
                l();
            });
        };
        return res;
    }
    function threadGroup() {
        var threads=[];
        var waits=[];
        var _isAlive=true;
        var thg;
        var _isWaiting=false;
        function add(thread) {
            thread.group=thg;
            threads.push(thread);
        }
        function addObj(obj) {
            var th=thread();
            th.enter(obj.fiber$main());
            add(th);
            return th;
        }
        function steps() {
            for (var i=threads.length-1; i>=0 ;i--) {
                if (threads[i].isAlive()) continue;
                threads.splice(i,1);
            }
            _isWaiting=true;
            threads.forEach(function (th){
                if (th.isWaiting()) return;
                _isWaiting=false;
                th.steps();
            });
        }
        function kill() {
            _isAlive=false;
        }
        var _interval=0, _onStepsEnd;
        function run(interval, onStepsEnd) {
            if (interval!=null) _interval=interval;
            if (onStepsEnd!=null) _onStepsEnd=onStepsEnd;
            if (!_isAlive) return;
            try {
                steps();
                if (_onStepsEnd) _onStepsEnd();
                if (!_isWaiting) {
                    setTimeout(run,_interval);
                } else {
                    //console.log("all wait!");
                }
            } catch (e) {
                if (Tonyu.onRuntimeError) {
                    Tonyu.onRuntimeError(e);
                } else {
                    alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
                }
            }
        }
        function notifyResume() {
            if (_isWaiting) {
                //console.log("resume!");
                run();
            }
        }
        return thg={add:add, addObj:addObj,  steps:steps, run:run, kill:kill, notifyResume: notifyResume};
    }
    function defunct(f) {
        if (f===Function) {
            return null;
        }
        if (typeof f=="function") {
            f.constructor=null;
        } else if (typeof f=="object"){
            for (var i in f) {
                f[i]=defunct(f[i]);
            }
        }
        return f;
    }
    function klass() {
        var parent, prot;
        if (arguments.length==1) {
            prot=arguments[0];
        }
        if (arguments.length==2) {
            parent=arguments[0];
            prot=arguments[1];
        }
        prot=defunct(prot);
        var res=(prot.initialize? prot.initialize:
            (parent? function () {
                parent.apply(this,arguments);
            }:function (){})
        );
        /*res=function () {
            if (this.initialize) {
                this.initialize.apply(this, arguments);
            }
        };*/
        res.prototype=bless(parent, prot);
        res.prototype.isTonyuObject=true;
        return res;
    }
    function bless( klass, val) {
        if (!klass) return val;
        return extend( new klass() , val);
    }
    function extend (dst, src) {
        if (src && typeof src=="object") {
            for (var i in src) {
                dst[i]=src[i];
            }
        }
        return dst;
    }
    //alert("init");
    var globals={};
    var classes={};
    function setGlobal(n,v) {
        globals[n]=v;
    }
    function getGlobal(n) {
        return globals[n];
    }
    function getClass(n) {
        return classes[n];
    }
    return Tonyu={thread:thread, threadGroup:threadGroup, klass:klass, bless:bless, extend:extend,
            globals:globals, classes:classes, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
            timeout:timeout,asyncResult:asyncResult};
}();

requirejs.setName('PatternParser');
define(["Tonyu"], function (Tonyu) {return Tonyu.klass({
	initialize: function (img) {
		this.img=img;
		this.height = img.height;
		this.width = img.width;
		var cv=this.newImage(img.width, img.height);
		var ctx=cv.getContext("2d");
		ctx.drawImage(img, 0,0);
		this.ctx=ctx;
		this.pixels=this.ctx.getImageData(0, 0, img.width, img.height).data;
		this.base=this.getPixel(0,0);
	},
	newImage: function (w,h) {
        var cv=document.createElement("canvas");
        cv.width=w;
        cv.height=h;
        return cv;
	},
	getPixel: function (x,y) {
		var imagePixelData = this.pixels;
		var ofs=(x+y*this.width)*4;
		var R = imagePixelData[0+ofs];
  		var G = imagePixelData[1+ofs];
  		var B = imagePixelData[2+ofs];
  		var A = imagePixelData[3+ofs];
  		return ((((A*256)+B)*256)+G)*256+R;
	},
	setPixel: function (x,y,p) {
	    var ofs=(x+y*this.width)*4;
	    this.pixels[0+ofs]=p & 255;
	    p=(p-(p&255))/256;
        this.pixels[1+ofs]=p & 255;
        p=(p-(p&255))/256;
        this.pixels[2+ofs]=p & 255;
        p=(p-(p&255))/256;
        this.pixels[3+ofs]=p & 255;
	},
	parse: function () {
  		try {
			console.log("parse()");
  			var res=[];// List of charpattern
			for (var y=0; y<this.height ;y++) {
				for (var x=0; x<this.width ;x++) {
					var c=this.getPixel(x, y);
					if (c!=this.base) {
						res.push(this.parse1Pattern(x,y));
					}
				}
			}
			console.log("parsed:"+res.lenth);
			return res;
  		} catch (p) {
  		    if (p.isParseError) {
  	            console.log("parse error! "+p);
  	            return {image: this.img, x:0, y:0, width:this.width, height:this.height};
  		    }
  		    throw p;
  		}
	},
  	parse1Pattern:function (x,y) {
		function hex(s){return s;}
		var trans=this.getPixel(x, y);
		var dx=x,dy=y;
		var base=this.base;
		var width=this.width, height=this.height;
		while (dx<width) {
			var pixel = this.getPixel(dx,dy);
			if (pixel!=trans) break;
			dx++;
		}
		if (dx>=width || this.getPixel(dx,dy)!=base) {
		    throw PatterParseError(dx,dy,hex(this.getPixel(dx,dy))+"!="+hex(base));
		}
		dx--;
		while (dy<height) {
			if (this.getPixel(dx,dy)!=trans) break;
			dy++;
		}
		if (dy>=height || this.getPixel(dx,dy)!=base) {
		    throw PatterParseError(dx,dy,hex(this.getPixel(dx,dy))+"!="+hex(base));
		}
		dy--;
		var sx=x+1,sy=y+1,w=dx-sx,h=dy-sy;
        console.log(sx,sy,w,h,dx,dy);
		if (w*h==0) throw PatterParseError(dx, dy,"w*h==0");

        var newim=this.newImage(w,h);
        var nc=newim.getContext("2d");
        var newImD=nc.getImageData(0,0,w,h);
		var newD=newImD.data;
		var di=0;
		for (var ey=sy ; ey<dy ; ey++) {
			for (var ex=sx ; ex<dx ; ex++) {
			    var p=this.getPixel(ex, ey);
				if (p==trans) {
					newD[di++]=0;
					newD[di++]=(0);
					newD[di++]=(0);
					newD[di++]=(0);
				} else {
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
                    p=(p-(p&255))/256;
                    newD[di++]=(p&255);
				}
			}
		}
        nc.putImageData(newImD,0,0);
		for (var yy=sy-1; yy<=dy; yy++) {
		    for (var xx=sx-1; xx<=dx; xx++) {
		        this.setPixel(xx,yy, base);
		    }
		}
		return {image:newim, x:0, y:0, width:w, height:h};
		function PatterParseError(x,y,msg) {
		    return {toString: function () {
		        return "at ("+x+","+y+") :"+msg;
		    }, isParseError:true};
		}
	}

});});
requirejs.setName('WebSite');
define([], function () {
    var loc=document.location.href;
    if (loc.match(/jsrun\.it/)) {
        return {
            urlAliases: {
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png"
            }
        };
    }
    return {
        urlAliases: {}
    };
});
requirejs.setName('fs/ROMk');
if (!localStorage.norom) {
    FS.mountROM(
{
  "base": "/Tonyu/Kernel/",
  "data": {
    "": "{\".desktop\":{\"lastUpdate\":1390392839075},\"NoviceActor.tonyu\":{\"lastUpdate\":1389925045983},\"BaseActor.tonyu\":{\"lastUpdate\":1389925069783},\"Actor.tonyu\":{\"lastUpdate\":1389925068455},\"Boot.tonyu\":{\"lastUpdate\":1390393148408},\"Sprites.tonyu\":{\"lastUpdate\":1390393149017}}",
    ".desktop": "{\"runMenuOrd\":[\"NoviceActor\",\"BaseActor\",\"Actor\",\"Boot\",\"Sprites\"]}",
    "NoviceActor.tonyu": "extends BaseActor;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n        $Sprites.add(_sprite);\n    }\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite._fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\draw(){}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}\n",
    "BaseActor.tonyu": "extends null;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\nnative fukidashi;\nnative TextRect;\n\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this);\n    }\n    if (typeof x==\"object\") Tonyu.extend(this, x);\n    else if (typeof x==\"number\") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n}\n\nnowait \\print(c) {\n    console.log(c);\n}\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\nnowait \\getkey(k) {\n    return Key.getkey(k);\n}\nnowait \\hitTo(t) {\n    return crashTo(t);\n}\nnowait \\allCrash(t) {\n    var res=[];\n    var sp=_sprite || this;\n    $Sprites.sprites.forEach(\\(s) {\n        if (s!==this && \n        s instanceof t && \n        s.crashTo(sp)) {\n            res.push(s);    \n        }\n    });\n    return res;\n}\nnowait \\crashTo(t) {\n    if (!t) return false;\n    if (typeof t==\"function\") {\n        return allCrash(t)[0];\n    }\n    if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n    }\n    //print([this, t]);\n    return (x!=null && y!=null && width && height &&\n    t && !t._isDead && t.x!=null && t.y!=null && t.width && t.height &&\n    Math.abs(x-t.x)*2<width+t.width &&\n    Math.abs(y-t.y)*2<height+t.height);\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {\n    return $currentThreadGroup; //Tonyu.currentThread.group;\n}\nnowait \\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    _isDead=true;\n}\nnowait \\hide() {\n    if (_sprite) {\n        $Sprites.remove(_sprite);\n        _sprite=null;\n    } else {\n        $Sprites.remove(this);\n    }\n}\nnowait \\rnd(r) {\n    if (typeof r==\"number\") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}\nnowait \\detectShape() {\n    if (typeof p!=\"number\") {\n        if (text) return;\n        p=0;\n    }\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    width=pImg.width;\n    height=pImg.height;\n}\n\\waitFor(f) {\n    ifwait {\n        _thread.waitFor(f);\n    }\n    update();\n}\nnowait \\isDead() {\n    return _isDead;\n}\nnowait \\draw(ctx) {\n    if (x==null || y==null) return;\n    detectShape();\n    if (pImg) {\n        ctx.drawImage(\n        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n        x-width/2, y-height/2, width, height);\n    } else if (text) {\n        if (!size) size=15;\n        if (!align) align=\"center\";\n        if (!fillStyle) fillStyle=\"white\";\n        ctx.fillStyle=fillStyle;\n        TextRect.draw(ctx, text, x, y, size, align , \"fill\");\n    }\n    if (_fukidashi) {\n        if (_fukidashi.c>0) {\n            _fukidashi.c--;\n            ctx.fillStyle=\"white\";\n            ctx.strokeStyle=\"black\";\n            fukidashi ( ctx , _fukidashi.text, \n            x, y-height/2-10, _fukidashi.size);\n        }\n    }\n}",
    "Actor.tonyu": "extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    /*if (!_sprite) {\n        _sprite=Sprites.add{owner:this};\n    }*/\n    $Sprites.add(this);\n}\n\n/*\n\\update() {\n    super.update();\n    if (_sprite) {\n        _sprite.x=x;\n        _sprite.y=y;\n        _sprite.p=p;\n    }\n}*/",
    "Boot.tonyu": "native Tonyu;\r\nnative $;\r\nnative TError;\r\nnative $LASTPOS;\r\nnative Key;\r\nnative Date;\r\nnative ImageList;\r\n\r\n\\initSprites() {\r\n    $Sprites=new Sprites();\r\n    print (\"Loading pats..\");\r\n    \r\n    var rs=Tonyu.currentProject.getResource();\r\n    var a=Tonyu.asyncResult();\r\n    ImageList( rs.images, a.receiver);\r\n    waitFor(a);\r\n    var r=a[0];\r\n    $Sprites.setImageList(r);\r\n    for (var name,val in r.names) {\r\n        Tonyu.setGlobal(name, val);\r\n    }\r\n    print (\"Loading pats done.\");\r\n    cv=$(\"canvas\")[0];\r\n}\r\n\r\n\\initThread() {\r\n    thg=Tonyu.threadGroup();\r\n    var o=Tonyu.currentProject.getOptions();\r\n    var mainClassName=o.run.mainClass;\r\n    print(\"MainClass= \"+mainClassName);\r\n    mainClass=Tonyu.getClass(mainClassName);\r\n    if (!mainClass) {\r\n        TError( $mainClassName+\" というクラスはありません\", \r\n        \"不明\" ,0).raise();\r\n    }\r\n    Tonyu.runMode=true;\r\n    $currentThreadGroup=thg;\r\n    new mainClass();\r\n}\r\n\r\ninitSprites();\r\ninitThread();\r\n$screenWidth=cv.width;\r\n$screenHeight=cv.height;\r\n$pat_fruits=30;\r\nwhile (true) {\r\n    ti=new Date().getTime();\r\n    thg.steps();\r\n    Key.update();\r\n    $screenWidth=cv.width;\r\n    $screenHeight=cv.height;\r\n    $Sprites.draw(cv);\r\n    $Sprites.checkHit();\r\n    wt=33-(new Date().getTime()-ti);\r\n    if (wt<0) wt=0;\r\n    waitFor(Tonyu.timeout(wt));\r\n}\r\n    \r\n",
    "Sprites.tonyu": "native Tonyu;\r\n\\new() {\r\n    sprites=[];\r\n    imageList=[];\r\n    hitWatchers=[];\r\n    isDrawGrid=Tonyu.noviceMode;\r\n}\r\nfunction add(s) {\r\n    sprites.push(s);\r\n    return s;\r\n}\r\nfunction remove(s) {\r\n    sprites.splice(sprites.indexOf(s),1);\r\n}\r\nfunction clear() {sprites.splice(0,sprites.length);}\r\nfunction draw(cv) {\r\n    var ctx=cv.getContext(\"2d\");\r\n    ctx.fillStyle=\"rgb(20,80,180)\";\r\n    ctx.fillRect(0,0,cv.width,cv.height);\r\n    if (isDrawGrid) drawGrid(cv);\r\n    sprites.forEach(\\(sprite) {\r\n        sprite.draw(ctx);\r\n    });\r\n}\r\nfunction checkHit() {\r\n    hitWatchers.forEach(function (w) {\r\n        sprites.forEach(function (a) {\r\n                //console.log(\"a:\",  a.owner);\r\n            var a_owner=a.owner|| a;\r\n            if (! (a_owner instanceof w.A)) return;\r\n            sprites.forEach(function (b) {\r\n                var b_owner=b.owner|| b;\r\n                if (a===b) return;\r\n                if (! (b_owner instanceof w.B)) return;\r\n                //console.log(\"b:\",  b.owner);\r\n                if (a.hitTo(b)) {\r\n                    //console.log(\"hit\", a.owner, b.owner);\r\n                    w.h(a_owner,b_owner);\r\n                }\r\n            });\r\n        });\r\n    });\r\n}\r\nfunction watchHit(typeA, typeB, onHit) {\r\n    var p={A: typeA, B:typeB, h:onHit};\r\n    //console.log(p);\r\n    hitWatchers.push(p);\r\n}\r\nfunction drawGrid(c) {\r\n    var ctx=c.getContext(\"2d\");\r\n    ctx.textBaseline=\"top\";\r\n    ctx.save();\r\n    ctx.strokeStyle=\"rgb(40,100,200)\";\r\n    for (var i=0 ; i<c.width ; i+=10) {\r\n        ctx.beginPath();\r\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n        ctx.moveTo(i,0);\r\n        ctx.lineTo(i,c.height);\r\n        ctx.closePath();\r\n        ctx.stroke();\r\n    }\r\n\r\n    for (var i=0 ; i<c.height ; i+=10) {\r\n        ctx.beginPath();\r\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n        ctx.moveTo(0,i);\r\n        ctx.lineTo(c.width,i);\r\n        ctx.closePath();\r\n        ctx.stroke();\r\n    }\r\n    ctx.fillStyle=\"white\";\r\n    ctx.font=\"15px monospaced\";\r\n    for (var i=100 ; i<c.width ; i+=100) {\r\n        ctx.fillText(i, i,0);\r\n    }\r\n    for (var i=100 ; i<c.height ; i+=100) {\r\n        ctx.fillText(i, 0,i);\r\n    }\r\n    ctx.restore();\r\n}\r\nfunction setImageList(il) {\r\n    imageList=il;\r\n}\r\nfunction getImageList() {\r\n    return imageList;\r\n}\r\n"
  }
}
    );
}
requirejs.setName('Util');
Util=function () {

function getQueryString(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return qs[1];
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}

return {getQueryString:getQueryString, endsWith: endsWith, startsWith: startsWith};
}();
requirejs.setName('Tonyu.Iterator');
define(["Tonyu"], function (T) {
   function IT(set, arity) {
       var res={};
       if (set instanceof Array) {
           res.i=0;
           if (arity==1) {
               res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=set[res.i];
                   res.i++;
                   return true;
               };
           } else {
               res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=res.i;
                   this[1]=set[res.i];
                   res.i++;
                   return true;
               };
           }
       } else if (set instanceof Object){
           res.i=0;
           var elems=[];
           if (arity==1) {
               for (var k in set) {
                   elems.push(k);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i];
                   res.i++;
                   return true;
               };
           } else {
               for (var k in set) {
                   elems.push([k, set[k]]);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i][0];
                   this[1]=elems[res.i][1];
                   res.i++;
                   return true;
               };
           }
       } else {
           console.log(set);
           throw "Cannot iterable";
       }
       return res;
   }
   Tonyu.iterator=IT;
    return IT;
});
requirejs.setName('TError');
function TError(mesg, src, pos) {
    if (typeof src=="string") {
        return {
            isTError:true,
            mesg:mesg,
            src:{name:function () { return src;}},
            pos:pos,
            toString:function (){
                return this.mesg+" at "+src+":"+this.pos;
            },
            raise: function () {
                throw this;
            }
        };
    }
    if (typeof src.name!=="function") {
        throw "src="+src+" should be file object";
    }
    return {
        isTError:true,
        mesg:mesg,src:src,pos:pos,
        toString:function (){
            return this.mesg+" at "+this.src.name()+":"+this.pos;
        },
        raise: function () {
            throw this;
        }
    };
}
requirejs.setName('Key');
Key=function () {
    var Key;
    var stats={};
    var codes={
            left: 37 , up:38 , right: 39, down:40, space:32, enter:13
        };
    function getkey(code) {
        if (typeof code=="string") {
            code=codes[code.toLowerCase()];
        }
        if (!code) return 0;
        if (stats[code]==-1) return 0;
        return stats[code];
    }
    function update() {
        for (var i in stats) {
            if (stats[i]>0) {stats[i]++;}
            if (stats[i]==-1) stats[i]=1;
        }
    }

    return Key={getkey:getkey, update:update, stats:stats, codes: codes};
}();
$(document).keydown(function (e) {
    var s=Key.stats[e.keyCode];
    if (!s) {
        Key.stats[e.keyCode]=-1;
    }
});
$(document).keyup(function (e) {
    Key.stats[e.keyCode]=0;
});
requirejs.setName('TextRect');
TextRect=function () {
 // テキストを描いて(type=="test"なら描いたふりをするだけ)， 描かれた部分の矩形領域を返す
    function draw(ctx, text, x, topY, h, align , type) {
        if (!align) align="center";
        ctx.textBaseline="top";
        setFontSize(ctx, h);
        var met=ctx.measureText(text);
        var res={y:topY, w: met.width, h:h};
        switch (align.substring(0,1).toLowerCase()) {
            case "l":
                res.x=x;
                break;
            case "r":
                res.x=x-met.width;
                break;
            case "c":
                res.x=x-met.width/2;
                break;
        }
        if (type=="fill") ctx.fillText(text, res.x,topY);
        if (type=="stroke") ctx.strokeText(text, res.x,topY);
        return res;
    }
    function setFontSize(ctx,sz) {
        var post=ctx.font.replace(/^[0-9\.]+/,"");
        ctx.font=sz+post;
    };
    return {draw:draw, setFontSize: setFontSize};
}();
requirejs.setName('ObjectMatcher');
ObjectMatcher=function () {
    var OM={};
    var VAR="$var",THIZ="$this";
    OM.v=v;
    function v(name, cond) {
        var res={};
        res[VAR]=name;
        if (cond) res[THIZ]=cond;
        return res;
    }
    OM.isVar=isVar;
    var names="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i =0 ; i<names.length ; i++) {
        var c=names.substring(i,i+1);
        OM[c]=v(c);
    }
    function isVar(o) {
        return o && o[VAR];
    }
    OM.match=function (obj, tmpl) {
        var res={};
        if (m(obj,tmpl,res)) return res;
        return null;
    };
    function m(obj, tmpl, res) {
        if (obj===tmpl) return true;
        if (obj==null) return false;
        if (typeof obj=="string" && tmpl instanceof RegExp) {
            return obj.match(tmpl);
        }
        if (typeof tmpl=="function") {
            return tmpl(obj,res);
        }
        if (typeof tmpl=="object") {
            //if (typeof obj!="object") obj={$this:obj};
            for (var i in tmpl) {
                if (i==VAR) continue;
                var oe=(i==THIZ? obj :  obj[i] );
                var te=tmpl[i];
                if (!m(oe, te, res)) return false;
            }
            if (tmpl[VAR]) {
                res[tmpl[VAR]]=obj;
            }
            return true;
        }
        return false;
    }
    return OM;
}();
requirejs.setName('IndentBuffer');
IndentBuffer=function () {
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg() {
			ai++;
			var res=args[ai];
			if (res==null) {
			    console.log(arguments);
			    throw (ai+"th null param: fmt="+fmt);
			}
			return res;
		}
		function nc(val, msg) {
		    if(val==null) throw msg;
		    return val;
		}
		while (true) {
			var i=fmt.indexOf("%");
			if (i<0) {$.buf+=fmt; break;}
			$.buf+=fmt.substring(0,i);
			i++;
			var fstr=fmt.charAt(i);
			if (fstr=="s") {
				var str=shiftArg();
				if (typeof str == "string" || typeof str =="number") {}
				else if (str==null) str="null";
				else if (str.text) str=str.text;
				$.buf+=str;
				i++;
			} else if (fstr=="d") {
                var n=shiftArg();
                if (typeof n!="number") throw (n+" is not a number: fmt="+fmt);
                $.buf+=n;
                i++;
			} else if (fstr=="n") {
				$.ln();
				i++;
			} else if (fstr=="{") {
				$.indent();
				i++;
			} else if (fstr=="}") {
				$.dedent();
				i++;
			} else if (fstr=="%") {
				$.buf+="%";
			} else if (fstr=="f") {
				shiftArg()($);
				i++;
			} else if (fstr=="v") {
			    var a=shiftArg();
			    if (!a) throw "Null %v";
                if (typeof a!="object") throw "nonobject %v:"+a;
				$.visitor.visit(a);
				i++;
            } else if (fstr=="z") {
                var place=shiftArg();
                if ("val" in place) {
                    $.buf+=place.val;
                    return;
                }
                if (!place.gen) {
                    /*place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
                    place.reg=new RegExp(place.gen,"g");
                    //place.src=place.gen;
                    place.put=function (val) {
                        this.val=val;
                        $.buf=$.buf.replace(this.reg, val);
                        return val;
                    };*/
                    $.lazy(place);
                }
                $.buf+=place.gen;
                i++;
			} else if (fstr=="j") {
                var sp_node=shiftArg();
                var sp=sp_node[0];
                var node=sp_node[1];
                var sep=false;
                if (!node.forEach) {
                    console.log(node);
                    throw node+" is not array. cannot join";
                }
                node.forEach(function (n) {
                    if (sep) $.printf(sp);
                    sep=true;
                    $.visitor.visit(n);
                });
                i++;
			} else if (fstr=="D"){
			    shiftArg();
			    i++;
			} else {
				i+=2;
			}
			fmt=fmt.substring(i);
		}
	};
	$.print=function (v) {
	    $.buf+=v;
	};
	$.printf=$;
	$.buf="";
	$.lazy=function (place) {
	    if (!place) place={};
	    place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
        place.reg=new RegExp(place.gen,"g");
        //place.src=place.gen;
        place.put=function (val) {
            this.val=val;
            $.buf=$.buf.replace(this.reg, val);
            return val;
        };
        return place;
        //return {put: function () {} };
	};
	$.ln=function () {
		$.buf+="\n"+$.indentBuf;
	};
	$.indent=function () {
		$.indentBuf+=$.indentStr;
		$.buf+="\n"+$.indentBuf;
	};
	$.dedent = function () {
		var len=$.indentStr.length;
		$.buf=$.buf.substring(0,$.buf.length-len);
		$.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
	};
	$.indentBuf="";
	$.indentStr="  ";
	return $;
};
requirejs.setName('context');
/*
 コード生成中に使う補助ライブラリ．自分の処理しているクラス，メソッド，変数などの情報を保持する
 使い方:
   c=context();
   c.enter({a:3, b:5}, function (c) {
       // この中では，c.a==3 ,  c.b==5
       console.log("a="+c.a+" b="+c.b);
       c.enter({b:6}, function (c) {
          // この中では，c.a==3 ,  c.b==6
          console.log("a="+c.a+" b="+c.b);
       });
       // c.a==3 ,  c.b==5  に戻る
       console.log("a="+c.a+" b="+c.b);

   });
 */
function context() {
    var c={};
    c.ovrFunc=function (from , to) {
        to.parent=from;
        return to;
    };
    c.enter=enter;
    return c;
    function enter(val, act) {
        var sv={};
        for (var k in val) {
            if (k.match(/^\$/)) {
                k=RegExp.rightContext;
                sv[k]=c[k];
                c[k]=c.ovrFunc(c[k], val[k]);
            } else {
                sv[k]=c[k];
                c[k]=val[k];
            }
        }
        act(c);
        for (var k in sv) {
            c[k]=sv[k];
        }
    }
}
requirejs.setName('Visitor');
Visitor = function (funcs) {
	var $={funcs:funcs};
	$.visit=function (node) {
		if ($.debug) console.log("visit ",node.type, node.pos);
		var v=(node ? funcs[node.type] :null);
		if (v) return v.call($, node);
		else if ($.def) return $.def(node);
	};
	$.replace=function (node) {
		if (!$.def) {
			$.def=function (node) {
				if (typeof node=="object"){
					for (var i in node) {
						if (node[i] && typeof node[i]=="object") {
							node[i]=$.visit(node[i]);
						}
					}
				}
				return node;
			};
		}
		return $.visit(node);
	};
	return $;
};
requirejs.setName('Tonyu.TraceTbl');
Tonyu.TraceTbl=function () {
    var TTB={};
    var POSMAX=1000000;
    var pathIdSeq=1;
    var PATHIDMAX=10000;
    var path2Id={}, id2Path=[];
    TTB.add=function (file, pos){
        var path=file.path();
        var pathId=path2Id[path];
        if (pathId==undefined) {
            pathId=pathIdSeq++;
            if (pathIdSeq>PATHIDMAX) pathIdSeq=0;
            path2Id[path]=pathId;
            id2Path[pathId]=path;
        }
        if (pos>=POSMAX) pos=POSMAX-1;
        var id=pathId*POSMAX+pos;
        return id;
    };
    TTB.decode=function (id) {
        var pos=id%POSMAX;
        var pathId=(id-pos)/POSMAX;
        var path=id2Path[pathId];
        if (path) {
            var f=FS.get(path);
            return TError("Trace info", f, pos);
        } else {
            return null;
            //return TError("Trace info", "unknown src id="+id, pos);
        }
    };
    return TTB;
};
if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
requirejs.setName('fukidashi');
// From http://jsdo.it/hoge1e4/4wCX
//  (x,y) の位置に  V（←これ何て言うんだっけ） の先端が来るようにふきだし表示
function fukidashi(ctx, text, x, y, sz) {
    var align="c";
   var theight=20;
   var margin=5;
   var r=TextRect.draw(ctx, text, x,y-theight-margin-sz, sz, align);
   ctx.beginPath();
   ctx.moveTo(x , y);
   ctx.lineTo(x+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight);
   ctx.lineTo(x+r.w/2+margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight-r.h-margin*2);
   ctx.lineTo(x-r.w/2-margin , y-theight);
   ctx.lineTo(x-margin , y-theight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
   //ctx.fillRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);
   //ctx.strokeRect(r.x-margin, r.y-margin , r.w+margin*2 , r.h+margin*2);

   var fs=ctx.fillStyle;
   ctx.fillStyle=ctx.strokeStyle;
   TextRect.draw(ctx, text, x, y-theight-margin-sz, sz, align, "fill");
   ctx.fillStyle=fs;
}

requirejs.setName('disp');
// オブジェクトの内容を表示する． デバッグ用
function disp(a) {
	var p=IndentBuffer();
	function disp2(a) {
		if (a==null) return p("null%n");
		if (typeof a == "string" )
			return p("'%s'%n",a);
		if (typeof a =="number")
			return p("%s%n",a);
		if (typeof a=="function") return p("func%n");
		if (a instanceof Array) p("[%{");
		else p("{%{");
		var c = "";
		for (var i in a) {
			p(c + i+":");
			disp2(a[i]);
		}
		if (a instanceof Array) p("%}]%n");
		else  p("%}}%n");
	}
	disp2(a);
	return p.buf;
}

requirejs.setName('Sprites');
Sprites=function () {
    var sprites=[];
    var SP;
    var imageList=[];
    function addT(s) {
        sprites.push(s);
        return s;
    }
    function add(params) {
        var s={width:32, height:32};
        s.draw=function (ctx) {
            if (s.x==null || s.y==null) return;
            if (s.p==null) s.p=0;
            s.p=Math.floor(s.p);
            var e=imageList[s.p];
            if (!e) return;
            s.width=e.width;
            s.height=e.height;
            ctx.drawImage(e.image, e.x, e.y, e.width, e.height,
                                    s.x-s.width/2, s.y-s.height/2, s.width, s.height);
            if (s.fukidashi) {
                if (s.fukidashi.c>0) {
                    s.fukidashi.c--;
                    ctx.fillStyle="white";
                    ctx.strokeStyle="black";
                    fukidashi ( ctx , s.fukidashi.text, s.x, s.y-s.height/2-10, s.fukidashi.size);
                }
            }
        };
        s.crashTo=function (t) {
            return (s.x!=null && s.y!=null && s.width && s.height &&
                    t && t.x!=null && t.y!=null && t.width && t.height &&
                    Math.abs(s.x-t.x)*2<s.width+t.width &&
                    Math.abs(s.y-t.y)*2<s.height+t.height);
        };
        s.hitTo=s.crashTo;
        s.toString=function () {
            return "spr";
        };
        Tonyu.extend(s,params);
        sprites.push(s);
        return s;
    }
    function remove(s) {
        sprites.splice(sprites.indexOf(s),1);
    }
    function clear() {sprites.splice(0,sprites.length);}
    function draw(cv) {
        var ctx=cv.getContext("2d");
        //ctx.drawImage( baseImg.image , 32,32,32,32, 50,50,32,32);
        ctx.fillStyle="rgb(20,80,180)";
        ctx.fillRect(0,0,cv.width,cv.height);
        if (SP.drawGrid) drawGrid(cv);
        //console.log("draw!");
        sprites.forEach(function (sprite) {
            sprite.draw(ctx);
        });
    }
    var hitWatchers=[];
    function checkHit() {
        hitWatchers.forEach(function (w) {
            sprites.forEach(function (a) {
                //console.log("a:",  a.owner);
                var a_owner=(a.owner? a.owner:a);
                if (! (a_owner instanceof w.A)) return;
                sprites.forEach(function (b) {
                    var b_owner=(b.owner? b.owner:b);
                    if (a===b) return;
                    if (! (b_owner instanceof w.B)) return;
                    //console.log("b:",  b.owner);
                    if (a.hitTo(b)) {
                        //console.log("hit", a.owner, b.owner);
                        w.h(a_owner,b_owner);
                    }
                });
            });
        });
    }
    function watchHit(typeA, typeB, onHit) {
        var p={A: typeA, B:typeB, h:onHit};
        //console.log(p);
        hitWatchers.push(p);
    }
    function drawGrid(c) {
        var ctx=c.getContext("2d");
        ctx.textBaseline="top";
        ctx.save();
        ctx.strokeStyle="rgb(40,100,200)";
        for (var i=0 ; i<c.width ; i+=10) {
            ctx.beginPath();
            ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
            ctx.moveTo(i,0);
            ctx.lineTo(i,c.height);
            ctx.closePath();
            ctx.stroke();
        }

        for (var i=0 ; i<c.height ; i+=10) {
            ctx.beginPath();
            ctx.lineWidth=(i % 100 ==0 ? 4 : 1);
            ctx.moveTo(0,i);
            ctx.lineTo(c.width,i);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.fillStyle="white";
        ctx.font="15px monospaced";
        for (var i=100 ; i<c.width ; i+=100) {
            ctx.fillText(i, i,0);
        }
        for (var i=100 ; i<c.height ; i+=100) {
            ctx.fillText(i, 0,i);
        }
        ctx.restore();
    }
    function setImageList(il) {
        imageList=il;
    }
    function getImageList() {
        return imageList;
    }
    return SP={add:add, addT:addT,remove:remove, draw:draw, clear:clear, sprites:sprites,
        checkHit:checkHit, watchHit:watchHit,setImageList:setImageList, getImageList:getImageList};
}();

$(function () {
    console.log("Baseimg prepare");
    // for IE
    $("#baseImg").attr("src",$("#baseImg").attr("src")+ "?" + new Date().getTime());
    //
    $("#baseImg").load(function () {
        console.log("BaseImg loaded");
        baseImg={
                image: $("#baseImg")[0],
        };
        baseImg.pwidth=32;
        baseImg.pheight=32;
        baseImg.rows=Math.floor( baseImg.image.width/baseImg.pwidth);
        console.log("BaseImg loaded rows="+baseImg.rows);
       // $(this).hide();
    });

});


requirejs.setName('Parser');
Parser=function () {
    function extend(dst, src) {
        var i;
        for(i in src){
            dst[i]=src[i];
        }
        return dst;
    }
    var $={
        consoleBuffer:"",
        options: {traceTap:false, optimizeFirst: true, profile: false ,verboseFirst: false},
        Parser: Parser,
        StringParser: StringParser,
        nc: nc
    };
    $.dispTbl=function (tbl) {
    	var buf="";
    	var h={};
    	if (!tbl) return buf;
    	for (var i in tbl) {
    		var n=tbl[i].name;
    		if (!h[n]) h[n]="";
    		h[n]+=i;
    	}
    	for (var n in h) {
    		buf+=h[n]+"->"+n+",";
    	}
    	return buf;
    }
    //var console={log:function (s) { $.consoleBuffer+=s; }};
    function _debug(s) {console.log(s);}
    function Parser(parseFunc){
        this.parse=parseFunc;
    };
    Parser.create=function(parseFunc) { // (State->State)->Parser
        return new Parser(parseFunc);
    };
    $.create=Parser.create;
    function nc(v,name) {
    	if (v==null) throw name+" is null!";
    	return v;
    }
    extend(Parser.prototype, {// class Parser
        // Parser.parse:: State->State
        except: function (f) {
        	var t=this;
        	return Parser.create(function (s) {
        		var res=t.parse(s);
        		if (!res.success) return res;
        		if (f.apply({}, res.result)) {
        			res.success=false;
        		}
        		return res;
        	}).setName("(except "+t.name+")");
        },
        noFollow: function (p) {
            var t=this;
            nc(p,"p");
            return Parser.create(function (s) {
                var res=t.parse(s);
                if (!res.success) return res;
                var res2=p.parse(res);
                res.success=!res2.success;
                return res;
            }).setName("("+t.name+" noFollow "+p.name+")");
        },
        and: function(next) {// Parser.and:: (Function|Parser)  -> Parser
        	nc(next,"next"); // next==next
        	var t=this; // Parser
            var res=Parser.create(function(s){ //s:State
            	var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                var r2=next.parse(r1); //r2:State
                if (r2.success) {
                    r2.result=r1.result.concat(r2.result); // concat===append built in func in Array
                }
                return r2;
            });
            res._first=this._first;
            return res.setName("("+this.name+" "+next.name+")");
        },
        ret: function (f) {
            nc(f,"f");
            var t=this;
            var res=Parser.create(function(s){ //s:State
                var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                var r2=r1.clone();
                r2.result=[ f.apply({}, r1.result) ];
                return r2;
            });
            res._first=this._first;
            return res;
        },
        first: function (space, ct) {
        	if (space==null) throw "Space is null2!";
        	if (typeof ct=="string") {
        		this._first={space: space, chars:ct};
        	} else {
        		this._first={space: space, tbl:ct};
        	}
        	return this;
        },
        inheritFirst: function (p) {
            this._first=p._first;
            return this;
        },
        unifyFirst: function (other) {
        	//return null;
        	var tbl={}; // tbl.* includes tbl.ALL
        	function setTbl(src) {// src:Parser
        		var cs=src._first.chars;
        		function mk(c) {
        			if (!tbl[c]) {
        				if (!tbl.ALL) tbl[c]=src;
        				else tbl[c]=tbl.ALL.orNoUnify(src);
        			} else {
        				tbl[c]=tbl[c].orNoUnify(src);
        			}
        		}
        		if (cs) {
            		for (var i=0; i<cs.length ; i++) {
            			var c=cs.substring(i,i+1);
            			mk(c);
            		}
            	} else {
        			mk("ALL");
        			for (var i in tbl) {
        				if (i==="ALL") continue;
        				tbl[i]=tbl[i].orNoUnify(src);
        			}
            	}
        	}
        	function mergeTbl() {
        		var t2=other._first.tbl;
        		if ("ALL" in t2) {
            		for (var c in tbl) {
            			tbl[c]=tbl[c].orNoUnify(other);
            		}
            		for (var c in t2) {
            			if (!tbl[c]) {
            				tbl[c]=other;
            			}
            		}
        		} else {
        			for (var c in t2) {
        				if (!tbl[c]) {
        					tbl[c]=other;
        				} else {
        					tbl[c]=tbl[c].orNoUnify(other);
        				}
        			}
        		}
        	}
        	if (!this._first) return null;
        	if (!other._first) return null;
        	var space=this._first.space;
        	if (space!==other._first.space) return null;
        	if (space==null) throw "Space is null!";
        	if (this._first.tbl) extend(tbl, this._first.tbl);
        	else setTbl(this);
        	if (other._first.tbl) mergeTbl();
        	else setTbl(other);
        	var res=Parser.create(function (s0) {
        		var s=space.parse(s0);
        		var f=s.src.str.substring(s.pos,s.pos+1);
        		//console.log("name= "+this.name+" pos="+s.pos+" fst="+f+"  tbl="+$.dispTbl(tbl));
        		if (tbl[f]) {
            		//console.log("tbl[f].name="+tbl[f].name);
            		return tbl[f].parse(s);
        		}
        		if (tbl.ALL) return tbl.ALL.parse(s);
        		s.success=false;
        		return s;
        	});
        	res.first(space, tbl).setName("("+this.name+")U("+other.name+")");
        	if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
        	return res;
        },
        or: function(other) { // Parser->Parser
        	nc(other,"other");
        	var u=($.options.optimizeFirst ? this.unifyFirst(other): null);
        	if (u) return u;
        	else return this.orNoUnify(other);
        },
        orNoUnify: function (other) {
           	var t=this;  // t:Parser
        	var res=Parser.create(function(s){
        		var r1=t.parse(s); // r1:State
        		if (!r1.success){
        			var r2=other.parse(s); // r2:State
        			return r2;
        		} else {
        		    return r1;
        		}
        	});
        	res.name="("+this.name+")|("+other.name+")";
        	return res;
        },
        setName: function (n) {
        	this.name=n;
        	return this;
        },
        profile: function () {
            if ($.options.profile) {
                this.parse=this.parse.profile(this.name);
            }
        	return this;
        },
        repN: function(min){
        	var p=this;
        	if (!min) min=0;
        	var res=Parser.create(function(s) {
        		var current=s;
        		var result=[];
        		while(true){
        			var next=p.parse(current);
        			if(!next.success) {
        				var res;
        				if (result.length>=min) {
        					res=current.clone();
        					res.result=[result];
        					res.success=true;
        					//console.log("rep0 res="+disp(res.result));
        					return res;
        				} else {
        					res=s.clone();
        					res.success=false;
        					return res;
        				}
        			} else {
        				result.push(next.result[0]);
        				current=next;
        			}
        		}
        	});
        	if (min>0) res._first=p._first;
        	return res.setName("("+p.name+" * "+min+")");
        },
        rep0: function () { return this.repN(0); },
        rep1: function () { return this.repN(1); },
        opt: function () {
        	var t=this;
        	return Parser.create(function (s) {
        		var r=t.parse(s);
        		if (r.success) {
        			return r;
        		} else {
        			s=s.clone();
        			s.success=true;
        			s.result=[null];
        			return s;
        		}
        	}).setName("("+t.name+")?");
        },
        sep1: function(sep, valuesToArray) {
        	var value=this;
        	nc(value,"value");nc(sep,"sep");
        	var tail=sep.and(value).ret(function(r1, r2) {
                if(valuesToArray) return r2;
                return {sep:r1, value:r2};
            });
            return value.and(tail.rep0()).ret(function(r1, r2){
            	var i;
                if (valuesToArray) {
            		var r=[r1];
          			for (i in r2) {
           				r.push(r2[i]);
           			}
            		return r;
            	} else {
            		return {head:r1,tails:r2};
            	}
            }).setName("(sep1 "+value.name+"~~"+sep.name+")");
        },
        sep0: function(s){
        	return this.sep1(s,true).opt().ret(function (r) {
        		if (!r) return [];
        		return r;
        	});
        },
        tap: function (msg) {
        	if (!$.options.traceTap) return this;
        	if (!msg) msg="";
        	var t=this;
        	var res=Parser.create(function(s){
        		console.log("tap:"+msg+" name:"+t.name+"  pos="+(s?s.pos:"?"));
        		var r=t.parse(s);
        		var img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
        		console.log("/tap:"+msg+" name:"+t.name+" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
        		return r;
        	});
        	res._first=this._first;
        	return res.setName("(Tap "+t.name+")");
        },
        retN: function (i) {
        	return this.ret(function () {
        		return arguments[i];
        	});
        }
    });
    function State(str) { // class State
        if (typeof str=="string") {
            this.src={str:str, maxPos:0};// maxPos is shared by all state
            this.pos=0;
            this.result=[]
            this.success=true;
        }
    };
    extend(State.prototype, {
        clone: function() {
            var s=new State();
            s.src=this.src;
            s.pos=this.pos;
            s.result=this.result.slice();
            s.success=this.success;
            return s;
        },
        updateMaxPos:function (npos) {
        	if (npos > this.src.maxPos) {
        		this.src.maxPos=npos;
        	}
        },
        isSuccess: function () {
        	return this.success;
        }
    });
    var StringParser={
        empty: Parser.create(function(state) {
        	var res=state.clone();
        	res.success=true;
        	res.result=[null]; //{length:0, isEmpty:true}];
        	return res;
        }).setName("E"),
    	fail: Parser.create(function(s){
    	    s.success=false;
    	    return s;
    	}).setName("F"),
        str: function (st) { // st:String
        	return this.strLike(function (str,pos) {
        		if (str.substring(pos, pos+st.length)===st) return {len:st.length};
        		return null;
        	});
        },
        reg: function (r) {//r: regex (must have ^ at the head)
        	if (!(r+"").match(/^\/\^/)) console.log("Waring regex should have ^ at the head:"+(r+""));
        	return this.strLike(function (str,pos) {
        		var res=r.exec( str.substring(pos) );
        		if (res) {
        			res.len=res[0].length;
        			return res;
        		}
        		return null;
        	});
        },
        strLike: function (func) {
        	// func :: str,pos, state? -> {len:int, other...}  (null for no match )
            return Parser.create(function(state){
                var str= state.src.str;
                if (str==null) throw "strLike: str is null!";
                var spos=state.pos;
                //console.log(" strlike: "+str+" pos:"+spos);
                var r1=func(str, spos, state);
                if ($.options.traceToken) console.log("pos="+spos+" r="+r1);
                if(r1) {
                	if ($.options.traceToken) console.log("str:succ");
                	r1.pos=spos;
                	r1.src=state.src; // insert 2013/05/01
                	var ns=state.clone();
                    extend(ns, {pos:spos+r1.len, success:true, result:[r1]});
                    state.updateMaxPos(ns.pos);
                    return ns;
                }else{
                	if ($.options.traceToken) console.log("str:fail");
                    state.success=false;
                    return state;
                }
            }).setName("STRLIKE");
        },
    	parse: function (parser, str) {
    		var st=new State(str);
    		return parser.parse(st);
    	}
    };
    StringParser.eof=StringParser.strLike(function (str,pos) {
    	if (pos==str.length) return {len:0};
    	return null;
    }).setName("EOF");
    $.StringParser=StringParser;

    $.lazy=function (pf) { //   ( ()->Parser ) ->Parser
    	var p=null;
    	return Parser.create(function (st) {
    		if (!p) p=pf();
    		if (!p) throw pf+" returned null!";
    		this.name=pf.name;
    		return p.parse(st);
    	}).setName("LZ");
    };
    $.addRange=function(res, newr) {
    	if (newr==null) return res;
    	if (typeof (res.pos)!="number") {
    		res.pos=newr.pos;
    		res.len=newr.len;
    		return res;
    	}
    	var newEnd=newr.pos+newr.len;
    	var curEnd=res.pos+res.len;
    	if (newr.pos<res.pos) res.pos=newr.pos;
    	if (newEnd>curEnd) res.len= newEnd-res.pos;
    	return res;
    };
    $.setRange=function (res) {
    	if (res==null || typeof res=="string" || typeof res=="number") return;
    	var exRange=$.getRange(res);
    	if (exRange!=null) return res;
    	for (var i in res) {
    		if (!res.hasOwnProperty(i)) continue;
    		var range=$.setRange(res[i]);
    		$.addRange(res,range);
    	}
    	return res;
    };

	$.getRange=function(e) {
    	if (e==null) return null;
		if (typeof e.pos!="number") return null;
		if (typeof e.len=="number") return e;
		return null;
	};
    return $;
}();

requirejs.setName('Grammar');
Grammar=function () {
	var p=Parser;

	var $=null;
	function trans(name) {
		if (typeof name=="string") return $.get(name);
		return name;
	}
	function tap(name) {
		return p.Parser.create(function (st) {
			console.log("Parsing "+name+" at "+st.pos+"  "+st.src.str.substring(st.pos, st.pos+20).replace(/[\r\n]/g,"\\n"));
			return st;
		});
	}
	$=function (name){
		var $$={};
		$$.ands=function() {
			var p=trans(arguments[0]);  //  ;
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.and( trans(arguments[i]) );
			}
			p=p.tap(name);
			$.defs[name]=p;
			var $$$={};
			$$$.autoNode=function () {
                var res=p.ret(function () {
                    var res={type:name};
                    for (var i=0 ; i<arguments.length ;i++) {
                        var e=arguments[i];
                        var rg=Parser.setRange(e);
                        Parser.addRange(res, rg);
                        res["-element"+i]=e;
                    }
                    res.toString=function () {
                        return "("+this.type+")";
                    };
                }).setName(name);
                return $.defs[name]=res;
			};
			$$$.ret=function (f) {
				if (arguments.length==0) return p;
				if (typeof f=="function") {
					return $.defs[name]=p.ret(f);
				}
				var names=[];
				var fn=function(e){return e;};
				for (var i=0 ; i<arguments.length ;i++) {
					if (typeof arguments[i]=="function") {
						fn=arguments[i];
						break;
					}
					names[i]=arguments[i];
				}
				var res=p.ret(function () {
					var res={type:name};
					res[Grammar.SUBELEMENTS]=[];
					for (var i=0 ; i<arguments.length ;i++) {
						var e=arguments[i];
						var rg=Parser.setRange(e);
						Parser.addRange(res, rg);
						if (names[i]) {
							res[names[i]]=e;
						}
						res[Grammar.SUBELEMENTS].push(e);
					}
					res.toString=function () {
						return "("+this.type+")";
					};
					return fn(res);
				}).setName(name);
				return  $.defs[name]=res;
			};
			return $$$;
		};
		$$.ors= function () {
			var p=trans(arguments[0]);
			for (var i=1 ; i<arguments.length ;i++) {
				p=p.or( trans(arguments[i]) );
			}
			return $.defs[name]=p.setName(name);
		};
		return $$;
	};

	$.defs={};
	$.get=function (name) {
		if ($.defs[name]) return $.defs[name];
		return p.lazy(function () {
			var r=$.defs[name];
		    if (!r) throw "grammar named '"+name +"' is undefined";
			return r;
		}).setName("(Lazy of "+name+")");
	};
	return $;
};
Grammar.SUBELEMENTS="[SUBELEMENTS]";
requirejs.setName('XMLBuffer');
// var b=XMLBuffer(src);
// b(node);
// console.log(b.buf);
function XMLBuffer(src) {
	var $;
	$=function (node, attrName){
		//console.log("genX: "+node+ " typeof = "+typeof node+"  pos="+node.pos+" attrName="+attrName+" ary?="+(node instanceof Array));
		if (node==null || typeof node=="string" || typeof node=="number") return;
		var r=Parser.getRange(node);
		if (r) {
			while ($.srcLen < r.pos) {
				$.src(src.substring($.srcLen, r.pos));
			}
		}
		if (node==null) return;
		if (attrName) $.tag("<attr_"+attrName+">");
		if (node.type) $.tag("<"+node.type+">");
		if (node.text) $.src(r.text);
		else {
			var n=$.orderByPos(node);
			n.forEach(function (subnode) {
				if (subnode.name && subnode.name.match(/^-/)) {
					$(subnode.value);
				} else {
					$(subnode.value, subnode.name);
				}
			});
		}
		if (r) {
			while ($.srcLen < r.pos+r.len) {
				$.src(src.substring($.srcLen, r.pos+r.len));
			}
		}
		if (node.type) $.tag("</"+node.type+">");
		if (attrName) $.tag("</attr_"+attrName+">");
	};
	$.orderByPos=XMLBuffer.orderByPos;/*function (node) {
		var res=[];
		if (node[XMLBuffer.SUBELEMENTS]) {
			node[XMLBuffer.SUBELEMENTS].forEach(function (e) {
				res.push(e);
			});
		} else {
			for (var i in node) {
				if (!node.hasOwnProperty(i)) continue;
				if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
				if (typeof(node[i].pos)!="number") continue;
				if (isNaN(parseInt(i)) && !(i+"").match(/-/)) { 			res.push({name: i, value: node[i]}); }
				else { 			res.push({value: node[i]}); }
			}
		}
		res=res.sort(function (a,b) {
			return a.value.pos-b.value.pos;
		});
		return res;
	};*/
	$.src=function (str) {
		$.buf+=str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
		$.srcLen+=str.length;
	};
	$.tag=function (str) {
		$.buf+=str;
	};

	$.buf="";
	$.srcLen=0;
	return $;
}
XMLBuffer.orderByPos=function (node) {
	var res=[];
	if (node[XMLBuffer.SUBELEMENTS]) {
		node[XMLBuffer.SUBELEMENTS].forEach(function (e) {
			res.push(e);
		});
	} else {
		for (var i in node) {
			if (!node.hasOwnProperty(i)) continue;
			if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
			if (typeof(node[i].pos)!="number") continue;
			if (isNaN(parseInt(i)) && !(i+"").match(/-/)) { 			res.push({name: i, value: node[i]}); }
			else { 			res.push({value: node[i]}); }
		}
	}
	res=res.sort(function (a,b) {
		return a.value.pos-b.value.pos;
	});
	return res;
};
XMLBuffer.SUBELEMENTS="[SUBELEMENTS]";
requirejs.setName('ExpressionParser');
// parser.js の補助ライブラリ．式の解析を担当する
function ExpressionParser() {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
	    var $={};
	    $.eq=function (o) {return type==o.type() && prio==o.prio(); };
        $.type=function (t) { if (!t) return type; else return t==type;};
	    $.prio=function () {return prio;};
	    $.toString=function () {return "["+type+":"+prio+"]"; }
	    return $;
	}
	function composite(a) {
	    var $={};
	    var e=a;
	    $.add=function (a) {
	        if (!e) {
	            e=a;
	        } else {
	            e=e.or(a);
	        }
	    };
	    $.get=function () {
	        return e;
	    };
	    return $;
	}
	function typeComposite() {
	    var built=composite();
	    //var lastOP , isBuilt;
	    var $={};
	    $.reg=function (type, prio, a) {
	        var opt=opType(type, prio);
            built.add(Parser.create(function (st) {
                if (st.src==null) console.log("st src null! at "+eg.name);
                var r=a.parse(st);
                if (r.isSuccess()) {
                    r.opType=opt;
                }
                return r;
            }).setName("(opType "+opt+" "+a.name+")").inheritFirst(a));
	    };
	    $.get=function () {return built.get();};
	    $.parse=function (st) {
	        return $.get().parse(st);
	    };
	    return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
	var trifixes=[];
	$.element=function (e) {
        prefixOrElement.reg("element", -1, e);
        element.add(e);
	};
	$.getElement=function () {return element.get();};
	$.prefix=function (prio, pre) {
	    prefixOrElement.reg("prefix", prio, pre);
	};
	$.postfix=function (prio, post) {
        postfixOrInfix.reg("postfix", prio, post);
	};
	$.infixl =function (prio, inf) {
        postfixOrInfix.reg("infixl", prio, inf);
	};
	$.infixr =function (prio, inf) {
        postfixOrInfix.reg("infixr", prio, inf);
	};
	$.infix =function (prio, inf) {
        postfixOrInfix.reg("infix", prio, inf);
	};
	$.trifixr = function (prio, tf1, tf2) {
        postfixOrInfix.reg("trifixr", prio, tf1);
        //postfixOrInfix.reg("trifixr2", prio, tf2);
        trifixes[prio]=tf2;
	};
	$.custom = function (prio, func) {
		// func :: Elem(of next higher) -> Parser
	};
	$.mkInfix=function (f) {
		$.mkInfix.def=f;
	};
	$.mkInfix.def=function (left,op,right) {
		return Parser.setRange({type:"infix", op:op, left: left, right: right});
	}
	$.mkInfixl=function (f) {
		$.mkInfixl.def=f;
	};
	$.mkInfixl.def=function (left, op , right) {
		return Parser.setRange({type:"infixl",op:op ,left:left, right:right});
	};
	$.mkInfixr=function (f) {
		$.mkInfixr.def=f;
	};
	$.mkInfixr.def=function (left, op , right) {
		return Parser.setRange({type:"infixr",op:op ,left:left, right:right});
	};
	$.mkPrefix=function (f) {
		$.mkPrefix.def=f;
	};
	$.mkPrefix.def=function (op , right) {
		return Parser.setRange({type:"prefix", op:op, right:right});
	};
	$.mkPostfix=function (f) {
		$.mkPostfix.def=f;
	};
	$.mkPostfix.def=function (left, op) {
		return Parser.setRange({type:"postfix", left:left, op:op});
	};
	$.mkTrifixr=function(f) {
	    $.mkTrifixr.def=f;
	};
	$.mkTrifixr.def=function (left, op1, mid, op2, right) {
        return Parser.setRange({type:"trifixr", left:left, op1:op1, mid:mid, op2:op2, right:right});
	};
	$.build= function () {
	    //postfixOrInfix.build();
        //prefixOrElement.build();
	    $.built= Parser.create(function (st) {
	        return parse(0,st);
	    }).setName("ExpBuilt");
	    return $.built;
	};
	function dump(st, lbl) {
	    return ;
	    var s=st.src.str;
	    console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
	            " opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);
	}
	function parse(minPrio, st) {
	    var stat=0, res=st ,  opt;
	    dump(st," start minprio= "+minPrio);
	    st=prefixOrElement.parse(st);
        dump(st," prefixorelem "+minPrio);
	    if (!st.isSuccess()) {
	        return st;
	    }
	    //p2=st.result[0];
        opt=st.opType;
	    if (opt.type("prefix") ) {
	        // st = -^elem
	        pre=st.result[0];
	        st=parse(opt.prio(), st);
	        if (!st.isSuccess()) {
	            return st;
	        }
  	        // st: Expr    st.pos = -elem^
	        var pex=$.mkPrefix.def(pre, st.result[0]);
	        res=st.clone();  //  res:Expr
	        res.result=[pex]; // res:prefixExpr  res.pos= -elem^
	        if (!st.nextPostfixOrInfix) {
	            return res;
	        }
	        // st.next =  -elem+^elem
	        st=st.nextPostfixOrInfix;  // st: postfixOrInfix
	    } else { //elem
	        //p=p2;
	        res=st.clone(); // res:elemExpr   res =  elem^
            st=postfixOrInfix.parse(st);
            if (!st.isSuccess()) {
                return res;
            }
	    }
	    // assert st:postfixOrInfix  res:Expr
	    while (true) {
	        dump(st,"st:pi"); dump(res,"res:ex");
	        opt=st.opType;
	        if (opt.prio()<minPrio) {
	            res.nextPostfixOrInfix=st;
	            return res;
	        }
	        // assert st:postfixOrInfix  res:Expr
	        if (opt.type("postfix")) {
	            // st:postfix
	            var pex=$.mkPostfix.def(res.result[0],st.result[0]);
	            res=st.clone();
	            res.result=[pex]; // res.pos= expr++^
	            dump(st, "185");
	            st=postfixOrInfix.parse(st); // st. pos= expr++--^
	            if (!st.isSuccess()) {
	                return res;
	            }
	        } else if (opt.type("infixl")){  //x+y+z
	            // st: infixl
	            var inf=st.result[0];
	            st=parse(opt.prio()+1, st);
	            if (!st.isSuccess()) {
	                return res;
	            }
	            // st: expr   st.pos=  expr+expr^
	            var pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
	            res=st.clone();
	            res.result=[pex]; //res:infixlExpr
	            if (!st.nextPostfixOrInfix) {
	                return res;
	            }
	            st=st.nextPostfixOrInfix;
	        } else if (opt.type("infixr")) { //a=^b=c
                // st: infixr
                var inf=st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  a=b=c^
                var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
                res=st.clone();
                res.result=[pex]; //res:infixrExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
            } else if (opt.type("trifixr")) { //left?^mid:right
                // st: trifixr
                var left=res.result[0];
                var inf1=st.result[0];  // inf1 =  ?
                st=parse(opt.prio()+1 ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st= expr   st.pos=  left?mid^:right
                var mid=st.result[0];
                var st=trifixes[opt.prio()].parse(st);
                // st= :      st.pos= left?mid:^right;
                if (!st.isSuccess()) {
                    return res;
                }
                var inf2= st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                var right=st.result[0];
                // st=right      st.pos= left?mid:right^;
                var pex=$.mkTrifixr.def(left, inf1 , mid, inf2, right);
                res=st.clone();
                res.result=[pex]; //res:infixrExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
	        } else { // infix
                // st: infixl
                var inf=st.result[0];
                st=parse(opt.prio()+1 ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                var pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
                res=st.clone();
                res.result=[pex]; //res:infixExpr
                if (!st.nextPostfixOrInfix) {
                    return res;
                }
                st=st.nextPostfixOrInfix;
                if (opt.prio()==st.opType.prio()) {
                    res.success=false;
                    return res;
                }
	        }
	        // assert st:postfixOrInfix  res:Expr
	    }
	}
	$.lazy = function () {
		return Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
}
requirejs.setName('TonyuLang');
/*
 * Tonyu2 の構文解析を行う．
 * TonyuLang.parse(src);
 *   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
 */
/*
sys.load("js/parser.js");
sys.load("js/ExpressionParser2.js");
sys.load("js/Grammar.js");
sys.load("js/XMLBuffer.js");
sys.load("js/IndentBuffer.js");
sys.load("js/disp.js");
sys.load("js/profiler.js");
*/


TonyuLang=function () {
	var p=Parser;
	var $={};
	var g=Grammar();
    var G=g.get;

    var sp=p.StringParser;//(str);
    var spaceRaw=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/);
    /*var space=Parser.create(function (s) {
        var res=spaceCache[s.pos];
        if (res) {
            res.success=true;
            return res;
        }
        res=spaceRaw.parse(s);
        spaceCache[s.pos]=res;
        return res;
    }).setName("space").profile();*/
    var space=spaceRaw;
    //var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\n)*)*/).setName("space").profile();
    function tk(r, f) {
        var pat;
        var fst;
        if (typeof r=="string") {
            pat=sp.str(r);
            if (r.length>0) fst=r.substring(0,1);
        } else {
            pat=sp.reg(r);
        }
        var res=space.ret(function (t) {
            //console.log(r+" - "+t.src.str.substring(t.pos, t.pos+20).replace(/\r?\n/g,""));
            return t;
        }).and(pat).ret(function(a, b) {
            if (typeof f == "function")
                return f(b);
            if (typeof f == "number")
                return b[f];
            var res={};
            res.pos=b.pos;
            res.len=b.len;
            res.text=b.src.str.substring(res.pos, res.pos+res.len);
            res.toString=function (){
                return this.text;//+"("+this.pos+")";
            };
            //res.text=str.substring(b.pos, b.pos+b.len);
            //console.log("b.text="+b.text);
            res.type="token";
            return res;
        });
        if (fst) res.first(space, fst);
        return res.setName(r+"").profile();
    }
    var reserved={"function":true, "var":true , "return":true, "typeof": true, "if":true,
                 "for":true,
                 "super": true,
                 "while":true,
                 "break":true,
                 "do":true,
                 "switch":true,
                 "try": true,
                 "catch": true,
                 "finally": true,
                 "in": true,
                 fiber:true,
                 "native": true,
                 "instanceof":true,
                 "new": true,
                 "is": true,
                 "true": true,
                 "false": true,
                 "null":true,
                 "this":true,
                 "undefined": true,
                 "usethread": true,
                 "constructor": true,
                 ifwait:true,
                 nowait:true
    };
    var num=tk(/^[0-9\.]+/).ret(function (n) {
        n.type="number";
        n.value=parseFloat(n.text);
        //console.log("n.val="+n.value);
        return n;
    }).first(space,"0123456789");
    var symbol=tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/).except(function (s) {
        return reserved.hasOwnProperty(s.text);
    }).ret(function (s) {
        s.type="symbol";return s;
    }).first(space/*,"_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$"*/).setName("symbol");
    var eqq=tk("===");
    var nee=tk("!==");
    var eq=tk("==");
    var ne=tk("!=");
    var ge=tk(">=");
    var le=tk("<=");
    var gt=tk(">");
    var lt=tk("<");
    var andand=tk("&&");
    var oror=tk("||");

    var minus=tk("-");//.first(space,"-");
    var plus=tk("+");//.first(space,"+");
    var mul=tk("*");
    var div=tk("/");
    var mod=tk("%");
    var assign=tk("=").noFollow(sp.str("="));
    var literal=tk({exec: function (s) {
        var head=s.substring(0,1);
        if (head!=='"' && head!=="'") return false;
        for (var i=1 ;i<s.length ; i++) {
            var c=s.substring(i,i+1);
            if (c===head) {
                return [s.substring(0,i+1)];
            } else if (c==="\\") {
                i++;
            }
        }
        return false;
    },toString:function(){return"/^literal";}
    }).ret(function (s) {
        s.type="literal";
        return s;
    }).first(space,"\"'");
    var regex=tk({exec: function (s) {
        if (s.substring(0,1)!=='/') return false;
        for (var i=1 ;i<s.length ; i++) {
            var c=s.substring(i,i+1);
            if (c==='/') {
                return [s.substring(0,i+1)];
            } else if (c==="\\") {
                i++;
            }
        }
        return false;
    },toString:function(){return"/^regex";}
    }).ret(function (s) {
        s.type="regex";
        return s;
    }).first(space,"/");
    function retF(n) {
        return function () {
            return arguments[n];
        };
    }

    var e=ExpressionParser() ;
    var arrayElem=g("arrayElem").ands(tk("["), e.lazy() , tk("]")).ret(null,"subscript");
    var argList=g("argList").ands(tk("("), e.lazy().sep0(tk(","),true) , tk(")")).ret(null,"args");
    var member=g("member").ands(tk(".") , symbol ).ret(null,     "name" );
    var parenExpr = g("parenExpr").ands(tk("("), e.lazy() , tk(")")).ret(null,"expr");
    var varAccess = g("varAccess").ands(symbol).ret("name");
    var objlit_l=G("objlit").first(space,"{");
    var objlitArg=g("objlitArg").ands(objlit_l).ret("obj");
    var call=g("call").ands( argList.or(objlitArg) ).ret("args");
    var scall=g("scall").ands( argList.or(objlitArg) ).ret("args");//supercall
    var newExpr = g("newExpr").ands(tk("new"),varAccess, call.opt()).ret(null, "klass","params");
    var superExpr =g("superExpr").ands(
            tk("super"), tk(".").and(symbol).ret(retF(1)).opt() , scall).ret(
            null,                 "name",                       "params");
    var reservedConst = tk("true").or(tk("false")).or(tk("null")).or(tk("undefined")).or(tk("this")).ret(function (t) {
        t.type="reservedConst";
        return t;
    });
    e.element(num);
    e.element(reservedConst);
    e.element(regex);
    e.element(literal);
    e.element(parenExpr);
    e.element(newExpr);
    e.element(superExpr);
    e.element(G("funcExpr").first(space,"f\\"));
    e.element(objlit_l);
    e.element(G("arylit").first(space,"["));
    e.element(varAccess);
    var prio=0;
    e.infixr(prio,assign);
    e.infixr(prio,tk("+="));
    e.infixr(prio,tk("-="));
    e.infixr(prio,tk("*="));
    e.infixr(prio,tk("/="));
    e.infixr(prio,tk("%="));
    e.infixr(prio,tk("|="));
    e.infixr(prio,tk("&="));
    prio++;
    e.trifixr(prio,tk("?"), tk(":"));
    prio++;
    e.infixl(prio,oror);
    prio++;
    e.infixl(prio,andand);
    prio++;
    e.infix(prio,tk("instanceof"));
    //e.infix(prio,tk("in"));
    e.infix(prio,eqq);
    e.infix(prio,nee);
    e.infix(prio,eq);
    e.infix(prio,ne);
    e.infix(prio,ge);
    e.infix(prio,le);
    e.infix(prio,gt);
    e.infix(prio,lt);
    prio++;
    e.postfix(prio+3,tk("++"));
    e.postfix(prio+3,tk("--"));
    e.infixl(prio,minus);
    e.infixl(prio,plus);
    prio++;
    e.infixl(prio,mul);
    e.infixl(prio,div);
    e.infixl(prio,mod);
    prio++;
    e.prefix(prio,tk("typeof"));
    e.prefix(prio,tk("++"));
    e.prefix(prio,tk("--"));
    e.prefix(prio,tk("+"));
    e.prefix(prio,tk("-"));
    e.prefix(prio,tk("!"));
    prio++;
//    e.postfix(prio,tk("++"));
//    e.postfix(prio,tk("--"));

    prio++;
    e.postfix(prio,call);
    e.postfix(prio,member);
    e.postfix(prio,arrayElem);
    function mki(left, op ,right) {
        var res={type:"infix",left:left,op:op,right:right};
        Parser.setRange(res);
        res.toString=function () {
            return "("+left+op+right+")";
        };
        return res;
    }
    e.mkInfixl(mki);
    e.mkInfixr(mki);
    /*e.mkPostfix(function (p) {
        return {type:"postfix", expr:p};
    });*/
    var expr=e.build().setName("expr").profile();
    var retF=function (i) { return function (){ return arguments[i];}; };

    var stmt=G("stmt").first(space);
    var exprstmt=g("exprstmt").ands(expr,tk(";")).ret("expr");
    g("compound").ands(tk("{"), stmt.rep0(),tk("}")).ret(null,"stmts") ;
    var elseP=tk("else").and(stmt).ret(retF(1));
    var returns=g("return").ands(tk("return"),expr.opt(),tk(";") ).ret(null,"value");
    var ifs=g("if").ands(tk("if"), tk("("), expr, tk(")"), stmt, elseP.opt() ).ret(null, null,"cond",null,"then","_else");
    /*var trailFor=tk(";").and(expr.opt()).and(tk(";")).and(expr.opt()).ret(function (s, cond, s2, next) {
        return {cond: cond, next:next  };
    });*/
    var forin=g("forin").ands(tk("var").opt(), symbol.sep1(tk(","),true), tk("in"), expr).ret(
                                       "isVar", "vars",null, "set" );
    var normalFor=g("normalFor").ands(stmt, expr.opt() , tk(";") , expr.opt()).ret(
                                     "init", "cond",     null, "next");
    /*var infor=expr.and(trailFor.opt()).ret(function (a,b) {
        if (b==null) return {type:"forin", expr: a};
        return {type:"normalFor", init:a, cond: b.cond, next:b.next  };
    });*/
    var infor=normalFor.or(forin);
    var fors=g("for").ands(tk("for"),tk("("), infor , tk(")"),"stmt" ).ret(
                               null,null,    "inFor", null   ,"loop");
    //var fors=g("for").ands(tk("for"),tk("("), tk("var").opt() , infor , tk(")"),"stmt" ).ret(null,null,"isVar", "inFor",null, "loop");
    var whiles=g("while").ands(tk("while"), tk("("), expr, tk(")"), "stmt").ret(null,null,"cond",null,"loop");
    var breaks=g("break").ands(tk("break"), tk(";")).ret("brk");
    var fins=g("finally").ands(tk("finally"), "stmt" ).ret(null, "stmt");
    var catchs=g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt" ).ret(null,null,"name",null, "stmt");
    var catches=g("catches").ors("catch","finally");
    var trys=g("try").ands(tk("try"),"stmt",catches.rep1() ).ret(null, "stmt","catches");
    var varDecl=g("varDecl").ands(symbol, tk("=").and(expr).ret(retF(1)).opt() ).ret("name","value");
    var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
    g("funcDeclHead").ands(
            tk("nowait").opt(),
            tk("function").or(tk("fiber")).or(tk("constructor")).or(tk("\\")).opt(),
            symbol.or(tk("new")) ,"paramDecls").ret("nowait","ftype","name","params");
    var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
    var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
    var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
    var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
    stmt=g("stmt").ors("return", "if", "for", "while", "break", "ifWait","try", "nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
    // ------- end of stmts
    var paramDecl= g("paramDecl").ands(symbol ).ret("name");
    var paramDecls=g("paramDecls").ands(tk("("), paramDecl.sep0(tk(","),true), tk(")")  ).ret(null, "params");
    g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
    var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
    var jsonElem=g("jsonElem").ands(
            symbol.or(literal),
            tk(":").and(expr).ret(function (c,v) {return v;}).opt()
    ).ret("key","value");
    var objlit=g("objlit").ands(tk("{"), jsonElem.sep0(tk(","),true),  tk("}")).ret(null, "elems");
    var arylit=g("arylit").ands(tk("["), expr.sep0(tk(","),true),  tk("]")).ret(null, "elems");
    var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).ret(null, "superClassName");
    var program=g("program").ands(ext.opt(),stmt.rep0(), space, sp.eof).ret("ext","stmts");

    for (var i in g.defs) {
        g.defs[i].profile();
    }
    $.parse = function (file) {
        if (typeof file=="string") {
            str=file;
        } else {
            str=file.text();
        }
        str+="\n"; // For end with // comment with no \n
	    //console.log("Parse Start");
		var res=sp.parse(program, str);
		//console.log("POS="+res.src.maxPos);
		if (res.isSuccess() ) {
			var node=res.result[0];
			return node;
		}
		throw TError("文法エラー", file ,  res.src.maxPos);
		//throw "ERROR\nSyntax error at "+res.src.maxPos+"\n"+res.src.str.substring(0,res.src.maxPos)+"!!HERE!!"+res.src.str.substring(res.src.maxPos);
	};
	$.genXML= function (src, node) {
		var x=XMLBuffer(src) ;
		x(node);
        return x.buf;
	};
	return $;
}();

requirejs.setName('Tonyu.Compiler');
Tonyu.Compiler=function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this.isTonyuObject?this:'not_a_tonyu_object'";
var ITER="Tonyu.iterator";
var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};
/*function compile(klass, env) {
    initClassDecls(klass, env );
    return genJS(klass, env);
}*/
function initClassDecls(klass, env ) {
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={name:"main",stmts:[]};
    // method := fiber | function
    var fields={}, methods={main: MAIN}, natives={};
    klass.decls={fields:fields, methods:methods, natives: natives};
    klass.node=node;
    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    var OM=ObjectMatcher;
    function initMethods(program) {
        var spcn=env.options.compiler.defaultSuperClass;
        var pos=0;
        var t;
        if (t=OM.match( program , {ext:{superClassName:{text:OM.T, pos:OM.P}}})) {
            spcn=t.T; //program.ext.superClassName.text;
            pos=t.P;  //program.ext.superClassName.pos;
            //console.log("Match!  "+JSON.stringify(t));
            if (spcn=="null") spcn=null;
        }
        if (spcn) {
            var spc=env.classes[spcn];
            if (!spc) throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                methods[head.name.text]={
                        nowait: !!head.nowait,
                        ftype:  head.ftype.text,
                        name:  head.name.text,
                        head:  head,
                        stmts: stmt.body.stmts
                };
            } else if (stmt.type=="nativeDecl") {
                natives[stmt.name.text]=stmt;
            } else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    // if(pass==1)
    initMethods(node);        // node=program
}


function genJS(klass, env,pass) {
    var srcFile=klass.src.tonyu; //file object

    var OM=ObjectMatcher;
    var className=getClassName(klass);
    var traceTbl=env.traceTbl;
    // method := fiber | function
    var decls=klass.decls;
    var fields=decls.fields,
        methods=decls.methods,
        natives=decls.natives;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
    var ST=ScopeTypes;
    var topLevelScope={};
    // ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
    //  キー： 変数名   値： ScopeTypesのいずれか
    var buf=IndentBuffer();
    var printf=buf.printf;
    var v=null;
    var ctx=context();
    var debug=false;
    var fiberCallTmpl={
            type:"postfix",
            op:{$var:"A",type:"call" },
            left:{type:"varAccess", name: {text:OM.T}}
         };
    var noRetFiberCallTmpl={
        expr: fiberCallTmpl
    };
    var retFiberCallTmpl={
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: fiberCallTmpl
        }
    };
    var noRetSuperFiberCallTmpl={
        expr: {type:"superExpr", $var:"S"}
    };
    var retSuperFiberCallTmpl={
            expr: {
                type: "infix",
                op: OM.O,
                left: OM.L,
                right: {type:"superExpr", $var:"S"}
            }
        };
    function getClassName(klass){
        if (typeof klass=="string") return CLASS_HEAD+klass;
        return CLASS_HEAD+klass.name;
    }
    //console.log(JSON.stringify( retFiberCallTmpl));
    function initTopLevelScope2(klass) {
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=ST.FIELD;
        }
        for (var i in decls.methods) {
            s[i]=ST.METHOD;
        }
    }
    function initTopLevelScope() {
        var s=topLevelScope;
        for (var k=klass ; k ; k=k.superClass) {
            initTopLevelScope2(k);
        }
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=ST.NATIVE;
        }
        for (var i in env.classes) {
            s[i]=ST.CLASS; //ST.NATIVE;
        }
    }
    function newScope(s) {
        var f=function (){};
        f.prototype=s;
        return new f();
    }
    function getMethod(name) {
        for (var k=klass; k ; k=k.superClass) {
            if (k.decls.methods[name]) return k.decls.methods[name];
        }
        return null;
    }

    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    function getParams(method) {
        //console.log("genparam : name="+method.name);
        if (!method.head) return [];
        var res=method.head.params.params;
        if (!res.forEach) throw method+" is not array ";
        return res;
    }
    function genParamTbl(method) {
        var r=getParams(method);
        method.scope={};
        r.forEach(function (n) { method.scope[n.text]=ST.PARAM; });
    }
    function enterV(obj, node) {
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function genSym(prefix) {
        return prefix+(Math.random()+"").replace(/\./g,"");
    }
    function varAccess(n) {
        var t=ctx.scope[n];
        if (t!=ST.NATIVE && n.match(/^\$/)) t=ST.GLOBAL; //ST.NATIVE;
        if (!t) {
            topLevelScope[n]=ST.FIELD;
            t=ST.FIELD;
        }
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD || t==ST.METHOD) {
            buf.printf("%s.%s",THIZ, n);
        } else if (t==ST.CLASS) {
            buf.printf("%s",getClassName(n));
        } else if (t==ST.GLOBAL) {
            buf.printf("%s%s",GLOBAL_HEAD, n);
        } else {
            buf.printf("%s",n);
        }
    }
    function lastPosF(node) {
        return function () {
            buf.printf("%s=%s;%n",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ));
        };
    }
    v=buf.visitor=Visitor({
        dummy: function (node) {
            buf.printf("",node);
        },
        literal: function (node) {
            buf.printf("%s",node.text);
        },
        paramDecl: function (node) {
            buf.printf("%v",node.name);
        },
        paramDecls: function (node) {
            buf.printf("(%j)",[", ",node.params]);
        },
        funcDeclHead: function (node) {
            buf.printf("function %v %v",node.name, node.params);
        },
        funcDecl: function (node) {
            this.inFunc=true;
            buf.printf("%v %v",node.head, node.body);
            this.inFunc=false;
        },
        "return": function (node) {
            if (!ctx.noWait) {
                if (node.value) {
                    buf.printf("%s.exit(%v);return;",TH,node.value);
                } else {
                    buf.printf("%s.exit(%s);return;",TH,THIZ);
                }
            } else {
                if (node.value) {
                    buf.printf("return %v;",node.value);
                } else {
                    buf.printf("return %s;",THIZ);
                }
            }
        },
        program: function (node) {
            genClass(node.stmts);
            //buf.printf("%j",["%n",node.stmts]);
        },
        number: function (node) {
            buf.printf("%s", node.value );
        },
        reservedConst: function (node) {
            if (node.text=="this") {
                buf.printf("%s",THIZ);
            } else {
                buf.printf("%s", node.text);
            }
        },
        varDecl: function (node) {
            ctx.scope[node.name.text]=ST.LOCAL;
            if (node.value) {
                buf.printf("%v = %v", node.name, node.value );
            } else {
                buf.printf("%v", node.name);
            }
        },
        varsDecl: function (node) {
            lastPosF(node)();
            if (!ctx.noWait) {
                buf.printf("%j;", [";",node.decls]);
            }else {
                buf.printf("var %j;", [",", node.decls]);
            }
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            } else {
                buf.printf("%v: %f", node.key, function () {
                    varAccess( node.key.text) ;
                });
            }
        },
        objlit: function (node) {
            buf.printf("{%j}", [",", node.elems]);
        },
        arylit: function (node) {
            buf.printf("[%j]", [",", node.elems]);
        },
        funcExpr: function (node) {
            var m,ps;
            var body=node.body;
            if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
                ps=m.P;
            } else {
                ps=[];
            }
            buf.printf("function (%j) {%{"+
                          "%f"+
                       "%}}"
                     ,
                          [",", ps],
                           fbody
            );
            function fbody() {
                var ns=newScope(ctx.scope);
                ps.forEach(function (p) {
                    ns[p.name.text]=ST.PARAM;
                });
                ctx.enter({noWait: true, scope: ns }, function () {
                    body.stmts.forEach(function (stmt) {
                        printf("%v%n", stmt);
                    });
                });
            }
        },
        parenExpr: function (node) {
            buf.printf("(%v)",node.expr);
        },
        varAccess: function (node) {
            var n=node.name.text;
            varAccess(n);
        },
        exprstmt: function (node) {//exprStmt
            var t;
            lastPosF(node)();
            if (!ctx.noWait && (t=OM.match(node,noRetFiberCallTmpl)) &&
                    ctx.scope[t.T]==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++
                );
            } else if (!ctx.noWait && (t=OM.match(node,retFiberCallTmpl)) &&
                    ctx.scope[t.T]==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                //console.log("match: ");
                //console.log(t);
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{"+
                        "%v%v%s.retVal();%n",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++,
                            t.L, t.O, TH
                );
            } else if (!ctx.noWait && (t=OM.match(node,noRetSuperFiberCallTmpl)) ) {
                var p=getClassName(klass.superClass);
                if (t.S.name) {
                    buf.printf(
                            "%s.enter( %s.prototype.%s%s( %s, %v) );%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{",
                                TH,   p,  FIBPRE, t.S.name.text,  THIZ,  t.S.params,
                                FRMPC, ctx.pc,
                                ctx.pc++
                    );
                }
            } else {
                buf.printf("%v;", node.expr );
                //buf.printf("%s=%s;%v;",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ), node.expr );
            }
        },
        infix: function (node) {
            buf.printf("%v%v%v", node.left, node.op, node.right);
        },
        trifixr:function (node) {
            buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
        },
        prefix: function (node) {
            buf.printf("%v %v", node.op, node.right);
        },
        postfix: function (node) {
            /*if (node.op.type=="objlit") {
                buf.printf("%v(%v)", node.left, node.op);
            } else {*/
                buf.printf("%v%v", node.left, node.op);
            //}
        },
        "break": function (node) {
            if (!ctx.noWait) {
                if (ctx.closestBrk) {
                    buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
                } else {
                    throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
                }
            } else {
                buf.printf("break;%n");
            }
        },
        "while": function (node) {
            lastPosF(node)();
            if (!ctx.noWait) {
                var brkpos=buf.lazy();
                var pc=ctx.pc++;
                var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
                buf.printf(
                        /*B*/
                        "%}case %d:%{" +
                        (isTrue?"%D%D%D":"if (!(%v)) { %s=%z; break; }%n") +
                        "%f%n" +
                        "%s=%s;break;%n" +
                        "%}case %f:%{",
                            pc,
                            node.cond, FRMPC, brkpos,
                            enterV({closestBrk:brkpos}, node.loop),
                            FRMPC, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("while (%v) { %v }", node.cond, node.loop);
            }
        },
        "for": function (node) {
            lastPosF(node)();
            if (node.inFor.type=="forin") {
                var itn=genSym("_it_");
                ctx.scope[itn]=ST.LOCAL;
                if (!ctx.noWait) {
                    var brkpos={};
                    var pc=ctx.pc++;
                    buf.printf(
                            "%s=%s(%v,%s);%n"+
                            "%}case %d:%{" +
                            "if (!(%s.next())) { %s=%z; break; }%n" +
                            "%f%n" +
                            "%v%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                itn, ITER, node.inFor.set, node.inFor.vars.length,
                                pc,
                                itn, FRMPC, brkpos,
                                getElemF(itn, node.inFor.isVar, node.inFor.vars),
                                node.loop,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                } else {
                    buf.printf(
                            "var %s=%s(%v,%s);%n"+
                            "while(%s.next()) {%{" +
                               "%f%n"+
                               "%v%n" +
                            "%}}",
                            itn, ITER, node.inFor.set, node.inFor.vars.length,
                            itn,
                            getElemF(itn, node.inFor.isVar, node.inFor.vars),
                            node.loop
                    );
                }

            } else {
                if (!ctx.noWait) {
                    var brkpos={};
                    var pc=ctx.pc++;
                    buf.printf(
                            "%v;%n"+
                            "%}case %d:%{" +
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "%v;%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                node.inFor.init ,
                                pc,
                                node.inFor.cond, FRMPC, brkpos,
                                node.loop,
                                node.inFor.next,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                    //brkpos.put(ctx.pc++);
                } else {
                    buf.printf(
                            "%v%n"+
                            "while(%v) {%{" +
                               "%v%n" +
                               "%v;%n" +
                            "%}}",
                            node.inFor.init ,
                            node.inFor.cond,
                                node.loop,
                                node.inFor.next
                    );
                    //buf.printf("for (%s%v) { %v }",(node.isVar?"var ":""), node.inFor, node.loop);
                }
            }
            function getElemF(itn, isVar, vars) {
                return function () {
                    //var va=(isVar?"var ":"");
                    vars.forEach(function (v,i) {
                        /*if (isVar) */ctx.scope[v.text]=ST.LOCAL;
                        buf.printf("%s=%s[%s];%n", v.text, itn, i);
                    });
                };
            }
        },
        "if": function (node) {
            if (!ctx.noWait) {
                var fipos={}, elpos={};
                if (node._else) {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "%s=%z;break;%n" +
                            "%}case %f:%{" +
                            "%v%n" +
                            /*B*/
                            "%}case %f:%{"   ,
                                node.cond, FRMPC, elpos,
                                node.then,
                                FRMPC, fipos,
                                function () { buf.print(elpos.put(ctx.pc++)); },
                                node._else,

                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );

                } else {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            /*B*/
                            "%}case %f:%{",
                                node.cond, FRMPC, fipos,
                                node.then,

                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );
                }
            } else {
                if (node._else) {
                    buf.printf("if (%v) { %v } else { %v }", node.cond, node.then, node._else);
                } else {
                    buf.printf("if (%v) { %v }", node.cond, node.then);
                }
            }
        },
        useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=ST.THVAR;
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                var ns=newScope(ctx.scope);
                ns[TH]=ST.THVAR;
                ctx.enter({scope:ns}, function () {
                    buf.printf("%v",node.then);
                });
            } else {
                if (node._else) {
                    buf.printf("%v",node._else);
                }
            }
        },
        call: function (node) {
            buf.printf("(%v)",node.args);
        },
        objlitArg: function (node) {
            buf.printf("%v",node.obj);
        },
        argList: function (node) {
            buf.printf("%j",[",",node.args]);
        },
        newExpr: function (node) {
            var p=node.params;
            if (p) {
                buf.printf("new %v%v",node.klass,p);
            } else {
                buf.printf("new %v",node.klass);
            }
        },
        scall: function (node) {
            buf.printf("[%v]",node.args);
        },
        superExpr: function (node) {
            var name;
            if (node.name) {
                name=node.name.text;
                buf.printf("%s.prototype.%s.apply( %s, %v)",
                        getClassName(klass.superClass),  name, THIZ, node.params);
            } else {
                buf.printf("%s.apply( %s, %v)",
                        getClassName(klass.superClass), THIZ, node.params);
            }
        },
        arrayElem: function (node) {
            buf.printf("[%v]",node.subscript);
        },
        member: function (node) {
            buf.printf(".%v",node.name);
        },
        symbol: function (node) {
            buf.print(node.text);
        },
        "normalFor": function (node) {
            buf.printf("%v; %v; %v", node.init, node.cond, node.next);
        },
        compound: function (node) {
            if (!ctx.noWait) {
                buf.printf("%j", ["%n",node.stmts]);
            } else {
                buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
            }
        },
        token: function (node) {
            if (node.text=="typeof") {
                buf.printf("%s ",node.text);
            } else if (node.text=="instanceof") {
                buf.printf(" %s ",node.text);
            } else {
                buf.printf("%s",node.text);
            }
        }
    });
    //v.debug=debug;
    v.def=function (node) {
        if (!node) buf.printf("/*null*/");
        else buf.printf("DEF ! type=%s",node.type);
        console.log("Err node=");
        console.log(node);
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    function genSource() {
        ctx.enter({scope:topLevelScope}, function () {
            if (klass.superClass) {
                printf("%s=Tonyu.klass(%s,{%{", getClassName(klass), getClassName(klass.superClass));
            } else {
                printf("%s=Tonyu.klass({%{", getClassName(klass));
            }
            for (var name in methods) {
                if (debug) console.log("method1", name);
                var method=methods[name];
                ctx.enter({noWait:true}, function () {
                    genFunc(method);
                });
                if (debug) console.log("method2", name);
                //v.debug=debug;
                ctx.enter({noWait:false}, function () {
                    genFiber(method);
                });
                if (debug) console.log("method3", name);
            }
            printf("%}});");
        });
    }
    function genFiber(fiber) {
        var locals={};
        //console.log("Gen fiber");
        printf(
               "%s%s :function (%j) {%{"+
                 "var %s=%s;%n"+
                 "var %s=0;%n"+
                 "%z%n"+
                 "return function (%s) {%{"+
                   "for(var %s=%d ; %s--;) {%{"+
                     "switch (%s) {%{"+
                        "%}case 0:%{"+
                        "%f" +
                        "%s.exit(%s);return;%n"+
                     "%}}%n"+
                   "%}}%n"+
                 "%}};%n"+
               "%}},%n",

               FIBPRE, fiber.name, [",",getParams(fiber)],
                   THIZ, GET_THIS,
                   FRMPC,
                   locals,
                   TH,
                   CNTV, CNTC, CNTV,
                        FRMPC,
                        // case 0:
                      fbody,
                      TH,THIZ
        );
        function fbody() {
            var ps=getParams(fiber);
            var ns=newScope(ctx.scope);
            ps.forEach(function (p) {
                ns[p.name.text]=ST.PARAM;
            });
            ctx.enter({method:fiber, scope: ns, pc:1}, function () {
                fiber.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });

                var lcl=[];
                for (var i in ctx.scope) {
                    //console.log("scp: "+i+"="+ctx.scope[i]);
                    if (ctx.scope[i]==ST.LOCAL) {
                        lcl.push(i);
                    }
                }
                if (lcl.length>0) {
                    locals.put("var "+lcl.join(", ")+";");
                } else {
                    locals.put("/*NOVAR*/");
                }
            });
        }
    }
    function genFunc(func) {
        var fname= isConstructor(func) ? "initialize" : func.name;
        printf("%s :function (%j) {%{"+
                  "var %s=%s;%n"+
                  "%f" +
               "%}},%n",
               fname, [",",getParams(func)],
               THIZ, GET_THIS,
                      fbody
        );
        function fbody() {
            var ps=getParams(func);
            var ns=newScope(ctx.scope);
            ps.forEach(function (p) {
                ns[p.name.text]=ST.PARAM;
            });
            ctx.enter({method:func, scope: ns }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function isConstructor(f) {
        return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
    }
    initTopLevelScope();
    genSource();
    klass.src.js=buf.buf;
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }

    return buf.buf;
}
return {initClassDecls:initClassDecls, genJS:genJS};
}();
if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
requirejs.start();