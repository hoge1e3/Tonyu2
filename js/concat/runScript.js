requirejs.setName('reqConf');
//"var reqConf="+JSON.stringify( getReq.genConf({base:"http://localhost:3002/js/", baseUrl:"js"})+";"
var reqConf={
        "shim": {
            /*"ide/wikiEditor": {
                 deps: ["Wiki","TextEditor","FileList","FileMenu","FS","TextUtil"]
            },*/
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
            "Tonyu.Project": {
                "deps": ["Tonyu", "Tonyu.Compiler", "TError", "FS", "Sprites", "Key", "Tonyu.TraceTbl"],
                "exports": "Tonyu.Project"
            },
            "showErrorPos": {
                "exports": "showErrorPos"
            },
            "TError": {
                "exports": "TError"
            },
            /*"ide/noviceEditor": {
                "deps": ["fs/ROM","ace", "Util", "Tonyu", "FS", "FileList", "FileMenu",
                         "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project","ImageList"]
            },
            "ide/editor": {
                "deps": ["fs/ROM","ace", "Util", "Tonyu", "FS", "FileList", "FileMenu",
                         "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project"]
            },*/
            "fs/ROM": {
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
                deps: ["fs/ROM", "FS","Wiki"]
            },
            "ide/noviceSelProject": {
                deps: ["fs/ROM", "FS","Wiki"]
            }
        },
        "paths": {
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
            "fs/ROM": "fs/ROM",
            "FileList": "fs/FileList",
            "HttpHelper": "help/HttpHelper",
            "Wiki": "help/wiki",
            "ace": "lib/ace-noconflict/ace",
            "ide/noviceSelProject": "ide/noviceSelProject",
            "ide/noviceEditor": "ide/noviceEditor",
            PatternParser:"graphics/PatternParser",
            "foo":"bar"
        },
        "baseUrl": "js"
};
requirejs.setName('dumpScript');
function dumpScript() {
    var scrs=$("script");
    var i=0;
    var buf="";
    var path2Name=genPath2Name();
    g();
    function g() {
        var sc=scrs[i].src;
        sc=sc.replace(/^.*\/js\//,"").replace(/\.js$/,"");
        $.get(scrs[i].src,function (s) {
            if (sc.length>0 && !sc.match(/jquery/) && !sc.match(/require/) ) {
                if (!path2Name[sc]) throw "no path2name "+sc;
                buf+="requirejs.setName('"+path2Name[sc]+"');\n";
                buf+=s+"\n";
            }
            i++;
            if (i<scrs.length) g();
            else {
                buf+="requirejs.start();\n";
                $("<textarea>").attr({rows:24,cols:120}).val(buf).appendTo("body");
                //console.log(buf);
            }
        });
    }
    function genPath2Name() {
        var res={};
        for (var k in reqConf.paths) {
            var v=reqConf.paths[k];
            res[v]=k;
        }
        return res;
    }
}
requirejs.setName('runScript');
define(["fs/ROM","FS","Tonyu.Project","Shell","Sprites","ImageList"],
        function (rom,FS,Tonyu_Project, sh, Sprites, ImageList) {
    $(function () {
        ImageList([
                   //base
                   {url: "http://jsrun.it/assets/6/F/y/3/6Fy3B.png", pwidth:32, pheight:32},
                   //sample
                   {url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAABTCAYAAAAxzvMdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAj7SURBVHhe7ZgBbhu7DkW7tLe0Lq07y6+SMGWoI/LKIyuYbx3g1B6RV9YUIgr019vhcJA4w3I4iJxhORxEzrAcDiJnWA4HkW5Yfv369eOqUHa3FZTZrQLlXtGMMywXraDMbhUo94pmnGG5aAVlvqn0ZAp5Bcq9ohldlTaYcdUeCpTdbQVlvqzqqsU+CpR7RTO6Km0w46o9FCi72wrKvJvVHjHZT4Fyz/D377eHpL2eYUZXpQ1mXLWHAmVnXLVHBmVaCtevOthXgXIrXHXpV+1TmdFVaYMZV+2hQNkZV+2RQZmWwvWrDvZVoNxVn3mpn7V3RlelDWZctYcCZVWNP3/+YF21osu0NVpf4WBvhZi5arzM7e+5/7vOfrc+0zMGJqOr0gYzrtpDgbKqxhmWD2Lmiv4S29/v3KCYdc/qgcnoqrTBjKv2UKCsqrF9WJptfVTzWt9ML9QUKPeIcVD473fm9+relQOT0VVpgxlX7aFAWVXjR4al2WpK3Ut9zaKuQLlZtUFpzv5e3b9qYDK6Km0w46o9FCiravzYsDRbPfbYWib1+7WgAuVmjcPia/9sPbO/V/ffblg8VFdVoayq8aPD0mw9V6V9nQqUm3HusrZepV/t+3DFwGR0VdpA1UN1VRXKqho/PizN1veotF9QgXIzPnZRs0yrze3548Myc5k8VCdpf5WYm9E4/7J8QLnKt9//vdsu6eii/g7a2ke9ZTJj//d9onaOvw/vUk9lRleN4TMsuRWU+bLVV0n7f6pAuZE2JNFW85c5XvLva+037XftO61938fb1n3t7x+oz1RmdNUYPsOSW0GZd1vNS2uZoz1ABcpFaUDQxt/PlvEX+t/Fbr/n9Wtc90Nh3z+LspbPzOiqMTy6TNTroVpca55hcY7Wo9D3398/vu3vVKCc2Q3DSMM/f373l71tOWdyju+Nkv/O0ZvRVWNYHRYi1v2z+ZLD0tZHPlhvwzIaGAXM0eUc2cien2k76wPiOyd01RjOLnN8JkYZ8wwLOOpJsquHBS/lyEb2/GzbeR+0e++ErhrD1bAoxIz3DMsan/Evi4kXtGnENf+8y3ZOUXpHM6Or+mC7SPEyrcDvd+U3fGZW4/9hWGxQnjUs0ffL2YgXltZ22s4G0juMzOiqPniGpbaCMl+2+kWzITEVKKf494+Pi9qIl/cn/DwTnVUxo6v6oF1ku1Arof1NFZ+Z1Yi/PWsFZTpb34TVvyRRBcqptv/pqsSL/YC0d5TOqJrRVX3QX2a7VCsY7W2q+MysRvztWSsok9oylZRLVKDcjHRpf0I624wZXdUH6UKvYLS3qeIzsxrxt2etoExqy4xyWS1RgXKz0uXdKZ1p1oyu6oPxQtvFukK2r6niM7Ma8bdnrfjqbd9V3f6d1D/yM6Pw7TcuSJd4h3SWR8zoqj4YL7RdrCtk+5oqPjOrEX971oou09ZofYWDvRVi5op0mZ8pneFRM7qqD8YLbRfrCtm+porPPOKqPTIo01JfUn3WYj8Fyq2QLvcK6bdWmNFVfXB0mZtGfPaMes3R/io+84ir9sigzJetXvVUCnsoUO4Z0sVXpL2eYUZXjWEaFDP2e+K6f/Zmg1gRcz9hBWW+qfRkCnkFyr2iGV01hmeGZWTW9/LDskEFyr2iGV2VNtitCmV3W0GZ3SpQ7hXN0G/m4fDinGE5HETOsBwOImdYDgeRMyyHg8gZlsNBpBsW+u+03apQdrcVlNltBvXv9i6cYbloBWV2m0H9u70LZ1guWkGZ3WZQ/27vwhmWi1ZQZrcZ1L/bu7BsWHzWf7fnhl/LVKHsaqvfqaDMbjOof7d3oTspvYw364lQj6IKZXdbQZndZlD/bu9Cd1J6mZEzWL/P2veoCmUrs1ysxWeygjK7zaD+3d6F7qTxJfyzX38U2i+qQtmRxqjmvzd8PbOCMuRM76wZ1L/bu9CdlF6m6WseqseeCPV7VShLUi+tmQbVohWU2W0G9e/2LnQnpZfxGvad6rRGzPZHYo6c7fOfhu+LVlAm6rHnWPfPs2ZQ/27vQnfS0cvYZyPWKy0TiX2mCmW9Sk+mQTWzgjLRCPWYVZ3MoP7d3oXupPQyptXtM9MYrXuUHiLmokrPyAj1NCso4yWo74oZ1D+jh+qKd6E7Kb1MM6up2h4R6lOIuWdoUK1ZQRnvCF/3/aO1zAzqz1Sh7Mi70J2UXqaZ1VQz1D6Pz0SrumJE6YlQxozYWuwj1b5mBvVXGrTm8fXMu9CddPQy2bOqz0Vin4LPVM72mwbVmhWU8RpUW2UG9Wd6lHXFu9CddPQy/nOFkaw2wmdWa/sbsW5WUMaM2Frsu2oG9WcaVHvUu9CddPQytH7FSFYb4TPP0lPVCcqYHqqvMoP6Mx/JVN6F7qSjl6H1GW0P/+mJvQo+s0q/r8f3eCsoY3qoPvKR/hHUn2lQzazq0bvQnXT0MvT9ikRWI/x+0ViPzyN9n8f3eCso4zXse6yPnO0dQf2Vj+ZG3oXupKOXoXXVmI/4GtVHxBzp8c+xzztiptegjNcT13yfUhuZQf2KPuu/P+Jd6E4aX4K+P+oItS8Sc9ERvu77vR57jj22nkGZqIfqUbXPzKD+SsvZZ/w+613oTkov08xqlYb/HqH+Cp+JjqDepuG/e2K/WUGZ6IhR3dasXplB/bu9C91J6WXMqp45YqY3Msra54jY643EerSCMiNVKJuZQf27vQvdSellzNm6PWf4flOFst4MpZ96ohWUiVqf/yR8ZsYM6t/tXehOSi/jVXqiFbP9Rsx5V2F7xf3NCsrsNoP6d3sXupPSy0TVPnME9TZVKEvOQnuMrKDMbjOof7d3oTspvQxpUI0kqK+pQtlKyxGxV7GCMrvNoP7d3oXupPQyipSNa4av2adXJeZmvJo3Kyiz2wzq3+1d6E5KL6NqeSPWo6MeFcrutoIyu82g/t3ehe6k9DK7VaHsbisos9sM6t/tXdg+LMpvqFB2txWU2W0G9e/2LnQnpZfZrQpld1tBmd1mUP9u78IZlotWUGa3GdS/27twn5MeDj/MGZbDQeQMy+EgcoblcBA5w3I4iJxhORwk3t7+B7UT9juF4xt3AAAAAElFTkSuQmCC"},
                   //{url: "http://jsrun.it/assets/s/V/S/l/sVSlZ.png"},
                   //neko
                   {url: "http://jsrun.it/assets/j/D/9/q/jD9qQ.png", pwidth:32, pheight:32}
                 ],Sprites.setImageList);

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
                    f.text(s.innerHTML);
                    if ($(s).data("main")) {
                        name=f.truncExt(".tonyu");
                    }
                }
            }
        });
        var kernelDir=FS.get("/Tonyu/Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        curPrj.env.options.compiler.defaultSuperClass="Actor";
        curPrj.run(name);

    });
});

requirejs.setName('Shell');
define(["FS","Util"],function (FS,Util) {
    var Shell={cwd:FS.get("/")};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir);
        return Shell.pwd();
    };
    function resolve(v) {
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
        return Shell.cwd.path();
    };
    Shell.ls=function (){
        return Shell.cwd.ls();
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            console.log("cp", from ,to);
        }
        var f=resolve(from);
        var t=resolve(to);
        if (!f.exists()) throw f+": No such file or dir.";
        if (f.isDir() && t.isDir()) {
            f.recursive(function (src) {
                var rel=src.relPath(f);
                var dst=t.rel(rel);
                if (options.test || options.v) {
                    console.log((dst.exists()?"[ovr]":"[new]")+dst+"<-"+src);
                }
                if (!options.test) {
                    dst.copyFrom(src);
                }
            });
        } else {
            throw "notimpl";
        }
    };
    Shell.rm=function (file, options) {
        if (!options) options={};
        file=resolve(file);
        if (file.isDir() && options.r) {
            var dir=file;
            dir.each(function (f) {
                if (f.exists()) {
                    Shell.rm(f, options);
                }
            });
            dir.rm();
        } else {
            file.rm();
        }
    };
    sh=Shell;
    return Shell;
});
requirejs.setName('ImageList');
define(["PatternParser","Util"], function (PP,Util) {
    function IL(resImgs, onLoad) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loaded", resImg,i);
            var url=resImg.url;
            if (Util.startsWith(url,"http")) url+="?" + new Date().getTime();
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
                cnt--;
                if (cnt==0) {
                    var res=[];
                    resa.forEach(function (a) {
                        res=res.concat(a);
                    });
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
requirejs.setName('Tonyu');
Tonyu=function () {
    var preemptionTime=60;
    function thread() {
        var fb={enter:enter, exit:exit, steps:steps, step:step, isAlive:isAlive,
                suspend:suspend,retVal:retVal, kill:kill};
        var frame=null;
        var isAlive=true;
        var cnt=0;
        var retVal;
        function isAlive() {
            return frame!=null && isAlive;
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
        function retVal() {
            return retVal;
        }
        function steps() {
            //var lim=new Date().getTime()+preemptionTime;
            cnt=preemptionTime;
            //while (new Date().getTime()<lim) {
            while (cnt-->0) {
                step();
            }
        }
        function kill() {
            isAlive=false;
        }
        return fb;
    }
    function threadGroup() {
        var threads=[];
        var isAlive=true;
        function add(thread) {
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
            threads.forEach(function (th){
                th.steps();
            });
        }
        function kill() {
            isAlive=false;
        }
        function run(wait, onStepsEnd) {
            if (!isAlive) return;
            if(!wait) wait=0;
            try {
                //console.log("step..");
                steps();
                if (onStepsEnd) onStepsEnd();
                setTimeout(function () {
                    run(wait,onStepsEnd);
                },wait);
            } catch (e) {
                /*var tb=TraceTbl.decode($LASTPOS);
                if (tb) {
                    tb.mesg=e;
                    e=tb;
                }*/
                if (Tonyu.onRuntimeError) {
                    Tonyu.onRuntimeError(e);
                } else {
                    alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
                }
            }
        }
        return {add:add, addObj:addObj,  steps:steps, run:run, kill:kill};
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
    return Tonyu={thread:thread, threadGroup:threadGroup, klass:klass, bless:bless, extend:extend};
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
       } else {

       }
       return res;
   }
   Tonyu.iterator=IT;
    return IT;
});
requirejs.setName('TError');
function TError(mesg, src, pos) {
    if (typeof src=="string") {
        return {isTError:true, mesg:mesg,src:{name:function () { return src;}},pos:pos, toString:function (){
            return this.mesg+" at "+src+":"+this.pos;
        }};
    }
    if (typeof src.name!=="function") {
        throw "src="+src+" should be file object";
    }
    return {isTError:true, mesg:mesg,src:src,pos:pos, toString:function (){
        return this.mesg+" at "+this.src.name()+":"+this.pos;
    }};
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
requirejs.setName('fs/ROM');
/*
 rom on:
   delete localStorage.norom
 rom off:
   localStorage.norom=1
*/
if (!localStorage.norom) {
FS.mountROM(
        {"base":"/Tonyu/Kernel/","data":{"":"{\"NObjTest.tonyu\":{\"lastUpdate\":1387528337834},\".desktop\":{\"lastUpdate\":1388739985172},\"NObjTest2.tonyu\":{\"lastUpdate\":1388112059908},\"NoviceActor.tonyu\":{\"lastUpdate\":1388489817353},\"BaseActor.tonyu\":{\"lastUpdate\":1388740007281},\"Actor.tonyu\":{\"lastUpdate\":1388740007938},\"AcTest.tonyu\":{\"lastUpdate\":1388489927114},\"AcTestM.tonyu\":{\"lastUpdate\":1388489926005}}","NObjTest.tonyu":"native console;\nnative alert;\n\n\\move(p) {\n    x+=p.vx;\n    y+=p.vy;\n}\n\nx=100;\ny=100;\nvy=0;vx=0;\nt=new NObjTest2{x:200, y: 50};\nwatchHit(NObjTest, NObjTest2, onH);\nwhile (true) {\n    if (getkey(\"left\")) vx=-2;\n    if (getkey(\"Right\")) vx=2;\n    if (getkey(\"up\")==1) vy=-2;\n    y+=vy;\n    vy+=0.1;\n    move{vx,vy};\n    // console.log(x+\",\"+y);\n    go(x,y);\n    sleep();\n    /*if (crashTo(t)) {\n    t.hide();\n    }*/\n}\n\\onH(a,b) {\n    b.hide();\n    a.vy=5;\n}",".desktop":"{\"runMenuOrd\":[\"AcTestM\",\"NObjTest\",\"NObjTest2\",\"AcTest\",\"NoviceActor\",\"BaseActor\",\"Actor\"]}","NObjTest2.tonyu":"change(10);\ngo(x,y);\n","NoviceActor.tonyu":"extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) _sprite=Sprites.add{owner:this};\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite.fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}\n","BaseActor.tonyu":"extends null;\nnative Sprites;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\n\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this);\n    }\n    if (typeof x==\"object\") Tonyu.extend(this, x);\n    else if (typeof x==\"number\") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n}\n\nnowait \\print(c) {\n    console.log(c);\n}\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\nnowait \\getkey(k) {\n    return Key.getkey(k);\n}\nnowait \\crashTo(t) {\n    return hitTo(t);\n}\nnowait \\allCrash(t) {\n    var res=[];\n    if (!_sprite) return res;\n    Sprites.sprites.forEach(\\(s) {\n        //print (s.owner instanceof t);\n        if (s.owner!=this && \n        s.owner instanceof t && \n        s.crashTo(_sprite)) {\n            res.push(s.owner);    \n        }\n    });\n    return res;\n}\nnowait \\hitTo(t) {\n    if (!_sprite) return false;\n    if (typeof t==\"function\") {\n        return allCrash(t)[0];\n    }\n    if (t._sprite) {\n        return _sprite.crashTo(t._sprite);\n    }\n    return false;\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {\n    return Tonyu.currentThreadGroup;\n}\nnowait \\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    isDead=true;\n}\nnowait \\hide() {\n    Sprites.remove(_sprite);\n    _sprite=null;\n}\nnowait \\rnd(r) {\n    if (typeof r==\"number\") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}\n","Actor.tonyu":"extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=Sprites.add{owner:this};\n    }\n}\n\n\\update() {\n    super.update();\n    if (_sprite) {\n        _sprite.x=x;\n        _sprite.y=y;\n        _sprite.p=p;\n    }\n}","AcTest.tonyu":"extends Actor;\n\nif (!vx) vx=0;\nif (!vy) vy=0;\nwhile (true) {\n    x+=vx;\n    y+=vy;\n    c=crashTo(AcTest);\n    if (c) {\n        if (x>c.x) {\n            vx=5; \n            c.vx=-5;\n        } else {\n            vx=-5; \n            c.vx=5;\n        }\n        print(\"Hit!!\");\n    }\n    update();\n}","AcTestM.tonyu":"extends Actor;\nnew AcTest{x:10, y:100, vx:5, vy:0, p:0};\nnew AcTest{x:320, y:100, vx:-5, vy:0, p:10};\nnew AcTest(50,150,3);\n\n/*\nwatchHit(AcTest,AcTest,\\(a,b) {\nif (a.x>b.x) {\na.vx=5; \nb.vx=-5;\n} else {\na.vx=-5; \nb.vx=5;\n}\nprint(\"Hit!\");\n});*/"}}
        );
}
if (!localStorage.norom) {
FS.mountROM(
        {"base":"/Tonyu/doc/","data":{"":"{\"novice/\":{\"lastUpdate\":1387516352865},\"index.txt\":{\"lastUpdate\":1388122984101}}","novice/":"{\"true.txt\":1387515762325,\"left.txt\":1387515762370,\"sleep.txt\":1387515762327,\"udlr.txt\":1387515762360,\"variable.txt\":1387515762334,\"while.txt\":1387515762342,\"variable3.txt\":1387515762345,\"xy.txt\":1387515762346,\"index.txt\":1387515762348,\"variable2.txt\":1387515762349,\"item.txt\":1387515762362,\"key.txt\":1387515762356,\"getkey.txt\":1387515762355,\"projectIndex.txt\":1387515762359,\"inc.txt\":1387515762326,\"firstRun.txt\":1387515762329,\"sprite.txt\":1387515762332,\"trouble1.txt\":1387515762330,\"dec.txt\":1387515762339,\"param.txt\":1387515762365,\"newFile.txt\":1387515762351,\"say.txt\":1387515762352,\"say2.txt\":1387515762368,\"new.txt\":1387515762364,\"toc.json\":{\"lastUpdate\":1387516352865},\"spriteMove.txt\":1387515762358,\"crash.txt\":1387515762367}","novice/true.txt":"* ずっと繰り返すようにしましょう\n\nさきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\n\nゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\n\n<<code Cat true\nx=50;\nwhile(true) {\n   go(x,100);sleep();\n   x+=10;\n}\n>>\n\n実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\n\nもう一度F9を押せば，また同じ動きを見ることができます．\n\nwhile文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．","novice/left.txt":"*ゲームクリアの判定をしましょう\n\nすべてのリンゴを取ったら，猫が「ごちそうさま」といって，\nゲームクリアになるようにしましょう．\n\nそれには，「リンゴがあといくつ残っているか」を数える必要があります．\nそこで，リンゴの残り数を表す[[@cfrag left]]という変数を用意します．\nリンゴは2つあるので，2を覚えさせておきます．\n\n[[@plistref addl]]の[[@editadd]]の部分を追加しましょう．\n\n<<code Game addl\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nleft=2;[[@editadd]]\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n}\n>>\n\nさらに，リンゴを取った時に，[[@cfrag left]]の値を減らします．\n\n<<code\n変数名--; \n>>\nと書くと，変数の値を1減らすことができます．\n\n<<code Game(hitCatApple内部のみ) adddec\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;[[@editadd]]\n}\n>>\n\nさらに，[[@cfrag left]] が0になったときに，猫に「ごちそうさま」というメッセージを表示させます．\n\n<<code Game(hitCatApple内部のみ) addif\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;\n    if (left<=0) {[[@editadd]]\n        cat.say(\"ごちそうさま\");[[@editadd]]\n    }[[@editadd]]\n}\n>>\n","novice/sleep.txt":"[[前へ>say]]\n\n*メッセージを順番に表示させてみましょう\n\nプログラムは上から順番に実行されます．\n\n今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\n[[@plistref nonsleep]]を入力します．\n\n@@@@nonsleep\ngo(50,100);\nsay(\"こんにちは\");\nsay(\"さようなら\");\n@@@@\n\n実行してみましょう.\n\n[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\n\nあれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\n\n実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 「さようなら」と表示する\n\nと実行したのです．しかし，コンピュータはとても高速に動作しているので\n「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\nと表示してしまっています．\n\nこれでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\n\n@@@@sleep\ngo(50,100);\nsay(\"こんにちは\");\nsleep(30); // 追加\nsay(\"さようなら\");\n@@@@\n\n実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\n\n[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\nつまり，プログラムの実行を少し待ってもらいます．\n後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\nフレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\n\nsleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 30フレーム（1秒ほど）待つ\n- 「さようなら」と表示する\n\n\n[[次へ>spriteMove]]","novice/udlr.txt":"* 画像をキーボードで上下左右に動かしましょう\n\nさきほどのキーボードを使って右に動かす仕組みを使って，\n画像を上下左右に動かしましょう\n\n<<code Cat k\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   k=getkey(\"left\");\n   if (k>0) {\n      x-=10;\n   }\n   k=getkey(\"down\");\n   if (k>0) {\n      y+=10;\n   }\n   k=getkey(\"up\");\n   if (k>0) {\n      y-=10;\n   }\n   go(x,y);sleep();\n}\n>>","novice/variable.txt":"* 画像をもっと長い時間動かしてみましょう\n\nさきほどの実行したプログラム([[@plistref 50_100]]は，\n横の位置を50 から始めて，100まで動かしました．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n@@@@\n\n今度はもっと遠くまで動かしてみましょう．\n例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\nsleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\n\n[[300まで動かすプログラム>50_300.png]]\n\n実行してみましょう．さっきよりも長く動きますね．\n","novice/while.txt":"* 繰り返しを使ってプログラムを短くしましょう\n\nさきほどのプログラムをよく見てみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n最初の[[@cfrag x=50;]]を除いて，あとはずっと\n\n<<code \ngo(x,100);sleep();\nx+=10;\n>>\nが繰り返されていることがわかります．\n\nこのように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\nと指示することによって，プログラムをもっと短くすることができます．\n\n[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\n\n<<code Cat firstWhile\nx=50;\nwhile (x<=100) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n実行してみると，先ほど同じように動きます．\n\nここでは，「while文」という書き方を用いています．これは，次のような形式で使います\n\n<<code while文の書式\nwhile([[@arg 条件]]) {\n   [[@arg 動作]]\n}\n>>\n\n- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\n- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\n\n[[@plistref firstWhile]]の動作は，次のようになります．\n\n- [[@cfrag x=50;]] 変数xに50を覚えさせる\n- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\n-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\n-- [[@cfrag x+=10;]] xを10増やす\n\nさて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\n\n<<code Cat w300\nx=50;\nwhile (x<=300) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\nつまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\n\n以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\nかなり楽になりました．","novice/variable3.txt":"*変数の値を変えてみましょう．\n\nさて，変数を使って，猫を右方向に動かしてみたいと思います．\n[[@plistref c5060]]のように変更しましょう\n（動いている様子が見えるように，[[@cfrag sleep();]]も忘れずにつけてください．）\n\n<<code Cat c5060\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\nこのプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\nつまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\n\nそして，xに60を覚えさせています．\n\nこのとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\n実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\n\nつまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\n[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\n","novice/xy.txt":"*画像を縦や斜めにも動かしてみましょう\n\n今まで，猫の画像は横にしか動きませんでしたが，縦にも動かすことができます．\n\n<<code Cat y\ny=50;\nwhile (true) {\n  y+=10;\n  go(100,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が上から下に移動します．\n\nさらに，横と縦に同時に動かすこともできます\n\n<<code Cat xy\ny=50;\nx=100;\nwhile (true) {\n  y+=10;\n  x+=10;\n  go(x,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が左上から右下に斜めに移動します．\n\n[[@plistref xy]]のように，\n変数は同時に2つ使うこともできます．\n\n変数を区別するために，それぞれの変数には名前が必要になります．ここでは x と y \nという名前の変数を使っています．\n\n名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．","novice/index.txt":"\n\n* プログラミングを始めましょう\n\n- まず，プロジェクトを作ります．\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n-- 半角文字で入力します\n-- ここでは  Hello と入力してみましょう\n\n","novice/variable2.txt":"* 画像をもっと楽に動かしましょう\n\nしかし，前のプログラムは書くのが大変です．\nそこで，もう少し簡単に書くための工夫を行います．\n\nさきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\n// 以下略\n@@@@\n\n\nここで，「変数」という仕組みを紹介します．\n変数とは，文字通り「変わる数」のことです．\n\n今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\nそこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\n\nもったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\n\n@@@@\ngo(x,100);\n@@@@\n\nここで出てきた x が変数です．\n\n「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\n\nところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\n何が入っているのかは，最初に変数を使う前に決めないといけません．\n\n次のように[[@cfrag x=50;]]を追加してみましょう．\n\n@@@@firstVar\nx=50;\ngo(x,100);\n@@@@\n\nここで[[@blink 実行>#run]]してみましょう．\n[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\n\n[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\n\n[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\n\n@@@@\ngo(x,100);\n@@@@\nを実行すると\n@@@@\ngo(50,100);\n@@@@\nを実行したのと同じ結果が得られます．","novice/item.txt":"* アイテムを配置しましょう\n\n猫を動かして，リンゴのアイテムを取るゲームを作ってみましょう．\n\nまず，アイテムのためのプログラムを作成します．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Apple と入力してみます\n\n<<code Apple\ngo(200,150);\n>>\n\n[[@blink 実行>#run]]メニューから，「Appleを実行」選びましょう．\nすると，今まで通り猫の画像が表示されます．\n\nこれを，リンゴの画像にしてみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\n[[@cfrag change]]という命令は，画像の絵柄を変える命令です．\n( ) 内に書くのは，絵柄の名前を指定します．[[@cfrag $pat_fruits]] は，\n標準に用意されているリンゴの画像データを指します．\n\n\n","novice/key.txt":"* キーボードを使って絵を動かしましょう\n\nさきほどのプログラムでは，猫が勝手に外にでていってしまうので\nキーボードを使って好きな方向に動くようにしてみましょう\n\n<<code Cat getkey\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   go(x,y);sleep();\n}\n>>\n\n実行したら，まず，猫のいる画面をクリックしてください．\nそのあと，右矢印キーを押すと，猫が右に動きます．\n\nここでは，新しく2つの命令が出てきました．\n\nまず[[@cfrag getkey]]は，キーが押されているかを判定する命令です．\n[[@cfrag k=getkey(\"right\"); ]]は，右矢印キーが押されているかを判定し，判定結果を変数kに書き込みます．\n-もし右矢印キーが押されていなければ，変数kに0を書き込みます．\n-もし右矢印キーが押されていれば，変数kに0より大きい値を書き込みます（押されている時間が長いほど大きい値になります）．\n\nそして， [[@cfrag if]]という命令も登場しました．これは，次のような形式で使います．\n\n<<code\nif ([[@arg 条件]]) {\n  [[@arg 命令]]\n}\n>>\n\n-[[@arg 条件]]が成り立つ（正しい）ときに，  [[@arg 命令]]を実行します．\n-[[@arg 条件]]が成り立たない（正しくない）ときには，[[@arg 命令]]を実行しません．\n\nここでは，[[@arg 条件]]の部分に[[@cfrag k>0]]，[[@arg 命令]] の部分に[[@cfrag x+=10]] と書いてあります．つまり，\n\n-[[@cfrag k>0]]が成り立つ（正しい）ときに，  [[@cfrag x+=10;]]を実行します．\n-[[@cfrag k>0]]が成り立たない（正しくない）ときには，[[@cfrag x+=10;]]を実行しません．\n\n[[@cfrag k>0]]が成り立つのは，右キーが押されているときです．また，[[@cfrag x+=10;]]は，右に移動する命令ですので，次のように動作します\n\n-右キーが押されているならば，右に動きます．\n-右キーが押されていないならば，右に移動しません．\n","novice/getkey.txt":"[[projectIndex]]","novice/projectIndex.txt":"\n* 目次\n\n<<toc\n-[[新しくファイルを作りましょう>newFile]]\n-[[プログラムを実行しましょう>firstRun]]\n-[[値を変えてみましょう>sprite]]\n-[[画像を動かしてみましょう>spriteMove]]\n-[[画像をもっと長い時間動かしてみましょう>variable]]\n-[[画像をもっと楽に動かしましょう>variable2]]\n-[[変数の値を変えてみましょう>variable3]]\n-[[変数の値を増やしてみましょう>inc]]\n-[[繰り返しを使ってプログラムを短くしましょう>while]]\n-[[ずっと繰り返すようにしましょう>true]]\n-[[画像を左方向に動かしてみましょう>dec]]\n-[[画像を縦や斜めにも動かしてみましょう>xy]]\n-[[画像をキーボードで動かしましょう>key]]\n-[[画像をキーボードで上下左右に動かしましょう>udlr]]\n-[[アイテムを配置しましょう>item]]\n-[[複数のキャラクタを配置しましょう>new]]\n-[[複数のキャラクタを配置しましょう(2)>param]]\n-[[メッセージを表示しましょう>say2]]\n-[[キャラクタの衝突判定をしましょう>crash]]\n-[[ゲームクリアの判定をしましょう>left]]\n>>\n\n\n\n\n\n\n\n","novice/inc.txt":"* 変数の値を増やしてみましょう\n\nさて，さきほどのプログラムをもう一度みてみましょう，\n\n<<code Cat 50to60\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\n[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\n[[@cfrag x=60;]]で，xに60覚えさせています．\n\nここでは，\n「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\nという書き方を紹介します．\n\n<<code Cat 50to60inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n[[@cfrag x+=10;]]という書き方が出てきました．これは\n「今覚えているxの値に，10を足す」という意味です．\n\n[[@plistref 50to60inc]]では，\n[[@cfrag x+=10;]]が実行される時点では，\nxは50を覚えていますので，\n[[@cfrag x+=10;]]が実行されると，50に10を足した値である\n60を新しくxに覚えさせます．結果として，\n[[@plistref 50to60inc]]は，\n[[@plistref 50to60]]と同じ結果になります．\n\nこれを利用して，xを100まで増やしながら，絵を動かしてみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>","novice/firstRun.txt":"* プログラムを実行しましょう\n\n実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\n\n[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\n\n[[実行結果>firstRunRes.png]]\n\n[[うまくいかないときは>trouble1]]\n\n\n\n\n\n\n","novice/sprite.txt":"* 値を変えてみましょう\n\nプログラムは，命令を実行します．\nここでは，go という命令を使って，画面に絵を表示させています．\n\n@@@@\ngo(50,100);\n@@@@\n\nここで， 50 や 100 などの数値を別の数値に変えてみましょう\n\n@@@@\ngo(150,100);\n@@@@\n\nもう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\n\n画面上の位置を決めるには，2つの数値が必要になります．\nそれは，「横の位置」と「縦の位置」です．\n-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\n-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\n\n横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\n\n(横の位置,縦の位置)\n\nという形式であらわします．\n\n例えば(50,100) という座標は，次のような位置をあらわします．\n-画面左端から50ピクセル離れた位置\n-画面上端から100ピクセル離れた位置\n\n[[座標>50_100.png]]\n\nいろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\n\n[[位置と座標>coords.png]]\n\nここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\n\n命令は，次のような形式で書きます．\n\n<<code\n命令の名前 ( 引数 , 引数 ...);\n>>\n引数（ひきすう）とは，命令を行うときに必要な情報をあらわします．\n\n例えば，[[@cfrag go(100,50);]] は [[@cfrag go]]という名前の命令を，\n100 と 50 という2つの引数（どこに移動するか，という情報）を\n使って行います．","novice/trouble1.txt":"プログラムを書き間違えていると，エラーが表示されます．\n\n[[文法エラー>syntaxError.png]]\n\n[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\nセミコロンを追加して，再度実行してください．\n\n[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(goo ではなく go ）\n正しい命令になおしてください．\n\n[[命令の名前が違うエラー>runtimeError.png]]\n\nなお，命令の名前は大文字と小文字が区別されます．[[@cfrag go]]の代わりに[[@cfrag Go]]と書くことはできません．\n\n[[戻る>firstRun]]","novice/dec.txt":"*画像を左方向にも動かしてみましょう\n\n今まで，猫の画像は左から右にしか動いていませんでしたが，右から左にも動かすことが\nできます．\n\n<<code Cat dec\nx=300;\nwhile(true) {\n   go(x,100);sleep();\n   x-=10;\n}\n>>\n\nここに出てきた[[@cfrag x-=10]]は，「xの値を10減らす」という命令です．\n","novice/param.txt":"*複数のキャラクタを配置しましょう(2)\n\n猫とリンゴが表示できたので，\n今度はリンゴを2つ置いてみましょう．それには，Gameを次のようにすればよさそうですね．\n\n<<code Game g1\nnew Cat;\nnew Apple;\nnew Apple;\n>>\n\n実行すると... あれ？リンゴは1つしか表示されません．\n\nここで，Appleのプログラムを確認してみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\nAppleでは，リンゴを(200,150)の位置に移動させる，と書いてあります．\n\n実は，リンゴは2つできているのですが，どちらも(200,150)という\nピッタリ同じ位置に重なっているので\n１つにしか見えないのです．\n\nそれでは，2つのリンゴを違う位置に表示させましょう．\nそれには，リンゴの位置が(200,150)ではなく，リンゴごとに変わるようにすればよいでしょう．つまり，200や150という「数」が「変わる」ようにする... そうです「変数」を使えばよいのです．\n\nそこで，Appleの[[@cfrag 200]]と[[@cfrag 150]] を，それぞれ変数[[@cfrag x]]と[[@cfrag y]]に置き換えてみましょう．\n\n<<code Apple xy1\nchange($pat_fruits);\ngo(x,y);\n>>\n\n実行すると... あれ！今度はリンゴが1つも出てきません．\n\nなぜかというと，[[@plistref xy1]]の状態では，変数 x や y は何も値を覚えていないため，[[@cfrag go(x,y)]]と命令されても，どこに表示していいかわからないからです．\n\nかといって，[[@plistref xy1]]に[[@cfrag x=200]]や[[@cfrag y=150]]などの，変数に値を覚えさせる命令を書くわけにもいきません．なぜなら，xやy の値はリンゴごとに違っていなければならないからです．\n\nそこで，ここでは，Appleではなく，Gameのほうでリンゴに具体的なx や y の値を設定させます． \n\nまず，Gameを次のように書き換えます．まだ実行はしないでください．\n\n<<code Game\nnew Cat;\napple1=new Apple;\napple2=new Apple;\n>>\n\n[[@plistref g1]]と変わったのは，[[@cfrag new Apple]]の前に，\n[[@cfrag apple1=]]と[[@cfrag apple2=]]がついたところです．\n\n[[@cfrag apple1=new Apple;]]は，新しくできたリンゴのキャラクタに「apple1」という名前をつけています．同様に，2つ目のリンゴのキャラクタに「apple2」という名前をつけています．\n\n名前をつけることによって，それらのキャラクタに命令をしたり，キャラクタがもっている変数の値を変更させることができます．\n\n<<code Game a1a2\nnew Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n実行すると，今度はちゃんとリンゴが2つ表示されますね．\n\n[[@cfrag apple1.x=200;]] という命令は，その1行上で新しく作ったリンゴのキャラクタ，つまりapple1 がもっている x という変数に 200 を覚えさせています．\n\n今，「キャラクタがもっている変数」という表現をしましたが，変数は名前が同じでも，キャラクタごとに違う値をもたせる（覚えさせる）ことができます．\n例えば，[[@plistref a1a2]]では，apple1 の もっている変数xの値は200ですが，apple2 がもっている変数x は300になっています．\n\n[[キャラクタごとに変数の値は異なる>apple1apple2.png]]\n\n\n\n","novice/newFile.txt":"* 新しくファイルを作りましょう\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\n-- ここでは Cat と入力してみます(後で猫の画像が登場します）\n\n* ファイルを編集しましょう\n\n- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\n- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\n\n<<code Cat first\ngo(50,100);\n>>","novice/say.txt":"[[前へ>sprite]]\n\n* メッセージを表示させてみましょう．\n\nプログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\n\n@@@@\ngo(50,100);\nsay(\"こんにちは!!\");\n@@@@\n\n注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\n\n[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\n\n[[次へ>sleep]]","novice/say2.txt":"* メッセージを表示しましょう．\n\nゲームスタートしたときに，\n猫に[[@figref itadaki.png]]のようなメッセージを表示させてみましょう．\n\n[[メッセージの表示>itadaki.png]]\n\n\nそれにはまず，猫に名前をつける必要があります．\nなんでもかまいませんが，白いので[[@cfrag siro]] と名前をつけましょう．\n\n<<code Game\nsiro=new Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\nそして，[[@cfrag siro]]にメッセージを表示させます．\nメッセージを表示するには，[[@cfrag say]]という命令を使います．\n\n<<code Game itadaki\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n\n命令を実行するとき，実行する相手のキャラクタを指定するときは次の形式を使います．\n\n<<code\nキャラクタ名 . 命令名 ( 引数  )\n>>\n\n[[@plistref itadaki]] では，キャラクタ名は [[@cfrag siro]]，\n 命令名は[[@cfrag say]] です．つまり[[@cfrag siro]] に対して，\n[[@cfrag say]]という命令を行わせています．\n\nそして，引数の部分に，表示させるメッセージである[[@cfrag \"いただきまーす\"]] という文字列（文字が並んだもの）を指定しています．文字列は [[@cfrag \"]]で囲む点に注意してください．","novice/new.txt":"*複数のキャラクタを配置しましょう\n\nさて，Appleを実行すると，リンゴが表示されますが，猫は出てこなくなってしまいました．ゲームには，猫とリンゴが同時に出てくる必要があります．\n\nそこで「リンゴと猫を置く」ための別のプログラムを作りましょう．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Game と入力してみます\n\nGameに，次のように入力してみましょう．\n\n<<code Game\nnew Cat;\nnew Apple;\n>>\n\n[[@blink 実行>#run]]メニューから，「Gameを実行」選びましょう．\nすると，猫とリンゴが同じ画面に表示されます．\n\nここで出てきた[[@cfrag new]] という命令は，\n新しくキャラクタを作るための命令です．\n\n次のように，[[@arg プログラム名]]を指定します．\n新しく出現したキャラクタは，\n指定された[[@arg プログラム名]]のプログラムを実行します．\n\n<<code\nnew [[@arg プログラム名]];\n>>\n\nなお，今後はしばらく Game を実行していきますので「実行する」と書いてあったら，\n[[@blink 実行>#run]]メニューから，「Gameを実行」選ぶようにしてください．\nF9キーを押すと，前回実行したプログラムと同じプログラムが実行されるので便利です．\n","novice/toc.json":"[\"projectIndex\",\"newFile\",\"firstRun\",\"sprite\",\"spriteMove\",\"variable\",\"variable2\",\"variable3\",\"inc\",\"while\",\"true\",\"dec\",\"xy\",\"key\",\"udlr\",\"item\",\"new\",\"param\",\"say2\",\"crash\",\"left\"]","novice/spriteMove.txt":"* 画像を動かしてみましょう\n\ngo 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\nこれを利用して，画像を少しずつ違う位置に動かしていき，\n猫が動くアニメーションを作ってみましょう．\n\n<<code Cat now\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\ngo(90,100);\ngo(100,100);\n>>\n\n実行すると... 猫が動いていないようですね．いきなり(100,100)の\n位置に表示されたようです．\n\n[[[[@plistref now]]の実行結果>noWaitCat.png]]\n\n実は，猫はちゃんと(50,100)の位置から始まって，(60,100)  (70,100) \n(80,100)  (90,100) と少しずつ動きながら\n(100,100)の位置まで移動したのですが，\nコンピュータは，とても素早く命令を実行するため，\n途中の動作が見えなかったのです．\n\nそこで，命令の実行を少しゆっくりに実行してもらいます．\n[[@cfrag sleep]] という命令を使うと，途中で実行を待つことができます．\n\n<<code Cat now2\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n>>\n\n今度は，猫が少しずつ動く様子が見えると思います．\n\n\n\n\n\n","novice/crash.txt":"*キャラクタの衝突判定をしましょう\n\n次に，猫(Cat)がリンゴ(Apple)にぶつかると，リンゴを取る（リンゴが消える）ようにしてみましょう．\n\n[[@cfrag watchHit]] という命令を使うと，２つのキャラクタがぶつかったときに，\n特定の命令を実行することができます．\n\n[[@plistref addw]]の[[@editadd]]で示した部分を追加してみましょう．\n（まだプログラムは実行しないでください）\n\n<<code Game addw\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);[[@editadd]]\n>>\n\n[[@cfrag watchHit(Cat, Apple, hitCatApple)]]と書くと，\n猫（[[@cfrag Cat]]）とリンゴ（[[@cfrag Apple]]）がぶつかったときに，\n[[@cfrag hitCatApple]] という命令が実行されるようになります．\n\nところで，[[@cfrag hitCatApple]] ってどんな命令でしょうか？\n実はこの時点ではそんな命令はありません．この命令は自分で作ってあげる必要があります．\nさらに[[@plistref addf]]のように追加してみましょう．\n\n<<code Game addf\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nfunction hitCatApple(cat,apple) {[[@editadd]]\n    apple.hide();[[@editadd]]\n}[[@editadd]]\n>>\n\n実行すると，猫とリンゴが触れたときにリンゴが消えるようになります．\n\n最後に書いた[[@cfrag function]] で始まる部分は，\n自分で新しい命令を作るための書き方です．\nここでは，[[@cfrag hitCatApple]]という名前の命令を作っています．\nその後ろにある[[@cfrag (cat, apple)]] という部分は，この命令を実行するに\nあたって，必要な情報を受け取るためのものです．\nここでは，「どのキャラクタと，どのキャラクタがぶつかったか」という情報を受け取り，\nそれぞれに，[[@cfrag cat]] と [[@cfrag apple]] という名前をつけています．\n\n[[@cfrag cat]] は，もちろん最初に作った猫ですが，\nもうひとつの[[@cfrag apple]] は，そのとき猫に触れていたリンゴです．\nそれは[[@cfrag apple1]] かもしれないし，\n[[@cfrag apple2]] かもしれませんが，とにかく猫が触れていたほうのリンゴに，[[@cfrag apple]]という名前がつけられます．\n\nそして，その[[@cfrag apple]] に， [[@cfrag apple.hide()]] という命令を行っています．これは，そのキャラクタ（ここでは[[@cfrag apple]]）を隠す（画面から見えなくする）命令です．\n\n\n\n\n","index.txt":"* サンプルを見る\n\n左の[[@blink プロジェクト一覧>#prjItemList]]からサンプルを選びます\n\n* 新しくプロジェクトを作る\n\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n"}}
        );
}

if (!localStorage.norom) {
    FS.mountROM(
            {"base":"/Tonyu/SampleROM/","data":{"":"{\"6_Shot/\":{\"lastUpdate\":1388123276922},\"1_Animation/\":{\"lastUpdate\":1388123314900},\"3_NewParam/\":{\"lastUpdate\":1388123276922},\"2_MultipleObj/\":{\"lastUpdate\":1388123335478},\"4_getkey/\":{\"lastUpdate\":1388123276922},\"5_Chase/\":{\"lastUpdate\":1388123276938}}","6_Shot/":"{\"Chaser.tonyu\":1388122397075,\".desktop\":1388122397070,\"Main.tonyu\":1388122397076,\"Player.tonyu\":1388122397074,\"Bullet.tonyu\":1388122397080}","6_Shot/Chaser.tonyu":"// 実行 → Mainを実行\n\n// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\nwhile (true) {\n    if (x<$player.x) x+=2;\n    if (x>$player.x) x-=2;\n    if (y<$player.y) y+=2;\n    if (y>$player.y) y-=2;\n    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n    if (crashTo($player)) {\n        // die メソッドは，オブジェクトを消滅させます．\n        // そのオブジェクトの処理も停止させます．\n        $player.die();\n    }\n    update();\n}","6_Shot/.desktop":"{\"runMenuOrd\":[\"Main\",\"Player\",\"Chaser\",\"Bullet\"]}","6_Shot/Main.tonyu":"// 実行 → Mainを実行\n\n// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n$player=new Player;\nnew Chaser{x:20,y:20,p:5};\nnew Chaser{x:300,y:250,p:5};","6_Shot/Player.tonyu":"// 実行 → Mainを実行\n\nx=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n    // (押しっぱなしでは撃てないようにする)\n    if (getkey(\"space\")==1) {\n        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n        new Bullet{x,y};\n    }\n    update();\n}","6_Shot/Bullet.tonyu":"while (y>0) {\n    y-=8;\n    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n    // 衝突しているかを判定します．\n    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n    c=crashTo(Chaser);\n    // どのCheseオブジェクトとも衝突していない \n    //      -> c==undefined\n    // 1つ以上のChaseオブジェクトと衝突している \n    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n    if (c) {\n        c.die();\n        die();\n    }\n    update();\n}\n// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\ndie();\n\n/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n次の書き方もあります.\n\nfor (var c in allCrash(Chaser)) {\n  c.die();\n  die();\n}\n*/\n\n\n/*\n[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\nfor (t in $chars) {\n  if (t is Chaser && crashTo(t)) {\n     \n  }\n}\n\n*/","1_Animation/":"{\".desktop\":{\"lastUpdate\":1388123314900},\"GoRight.tonyu\":{\"lastUpdate\":1388123314743}}","1_Animation/.desktop":"{\"runMenuOrd\":[\"GoRight\"]}","1_Animation/GoRight.tonyu":"// メニューの実行 → GoRightを実行を選んでください\n\n//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n// xとyに値を設定すると、その場所にスプライトを表示します\nx=100;\ny=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。","3_NewParam/":"{\".desktop\":1388122397034,\"Bounce.tonyu\":1388122397038,\"Main.tonyu\":1388122397044,\"GoRight.tonyu\":1388122397041}","3_NewParam/.desktop":"{\"runMenuOrd\":[\"Main\",\"Bounce\",\"GoRight\"]}","3_NewParam/Bounce.tonyu":"// 実行 → Main を実行を選んでください。\n// xとy の値はここで設定せず、Mainから受け取ります\n//x=100;\n//y=250;\nvy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n// $ がついている変数はグローバル変数です。\nwhile (x<$screenWidth) {\n    x+=2;\n    y+=vy;\n    vy+=1;\n    // $screenHeight ： 画面幅をあらわします。\n    if (y>$screenHeight) {\n        y=$screenHeight;\n        vy=-vy;\n    }\n    update();\n}","3_NewParam/Main.tonyu":"// 実行 → Main を実行を選んでください。\n\n// new クラス名{パラメタ} で、指定したフィールドの値をもつ\n// オブジェクトを出現させます。\nnew Bounce{x:100, y:220,p:12};\nnew Bounce{x:200, y:120,p:15};\nnew GoRight{x:50, y:80,p:4};\n\n// [!=Tonyu1] 従来通り，x,y,pを渡して初期化する方法も使えますが，\n// 上の方法が推奨されます\n//   new Bounce(100,220,12);","3_NewParam/GoRight.tonyu":"// 実行 → Main を実行を選んでください。\n// xとy の値はここで設定せず、Mainから受け取ります\n//x=100;\n//y=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。","2_MultipleObj/":"{\".desktop\":{\"lastUpdate\":1388123335478},\"Bounce.tonyu\":{\"lastUpdate\":1388123332368},\"Main.tonyu\":{\"lastUpdate\":1388123332947},\"GoRight.tonyu\":{\"lastUpdate\":1388123335368}}","2_MultipleObj/.desktop":"{\"runMenuOrd\":[\"Main\",\"Bounce\",\"GoRight\"]}","2_MultipleObj/Bounce.tonyu":"// 実行 → Main を実行を選んでください。\nx=100;\ny=250;\n// pに値を設定すると，キャラクタパターンを変更します．\n// 今のところ，キャラクタパターンは次のもので固定されています．\n// images/base.png   images/Sample.png\np=8;\nvy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n// $ がついている変数はグローバル変数です。\nwhile (x<$screenWidth) {\n    x+=2;\n    y+=vy;\n    vy+=1;\n    // $screenHeight ： 画面幅をあらわします。\n    if (y>$screenHeight) {\n        y=$screenHeight;\n        vy=-vy;\n    }\n    update();\n}","2_MultipleObj/Main.tonyu":"// 実行 → Main を実行を選んでください。\n\n// new クラス名  でオブジェクトを出現させます。\nnew Bounce;\nnew GoRight;\n\n// [!=Tonyu1]new の後ろの() は省略可能です\n// [!=Tonyu1]appear は不要です\n// [!=Tonyu1] オブジェクトを画面上で設計する機能は未実装です。","2_MultipleObj/GoRight.tonyu":"// 実行 → Main を実行を選んでください。\n//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n// xとyに値を設定すると、その場所にスプライトを表示します\nx=100;\ny=50;\n// $screenWidth ： 画面幅をあらわします。\nwhile (x<$screenWidth) { \n    x++;\n    // 1フレームの動作が終わったら update(); を呼び出してください。\n    update();\n}\n//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。","4_getkey/":"{\".desktop\":1388122397047,\"Player.tonyu\":1388122397051}","4_getkey/.desktop":"{\"runMenuOrd\":[\"Player\"]}","4_getkey/Player.tonyu":"x=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    update();\n}","5_Chase/":"{\"Chaser.tonyu\":1388122397062,\".desktop\":1388122397055,\"Main.tonyu\":1388122397066,\"Player.tonyu\":1388122397059}","5_Chase/Chaser.tonyu":"// 実行 → Mainを実行\n\n// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\nwhile (true) {\n    if (x<$player.x) x+=2;\n    if (x>$player.x) x-=2;\n    if (y<$player.y) y+=2;\n    if (y>$player.y) y-=2;\n    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n    if (crashTo($player)) {\n        // die メソッドは，オブジェクトを消滅させます．\n        // そのオブジェクトの処理も停止させます．\n        $player.die();\n    }\n    update();\n}","5_Chase/.desktop":"{\"runMenuOrd\":[\"Main\",\"Player\",\"Chaser\"]}","5_Chase/Main.tonyu":"// 実行 → Mainを実行\n\n// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n$player=new Player;\nnew Chaser{x:20,y:20,p:5};\nnew Chaser{x:300,y:250,p:5};","5_Chase/Player.tonyu":"// 実行 → Mainを実行\n\nx=200;\ny=200;\nwhile (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n    // getkey(キーの名前) で，キーの押した状態が取得できます．\n    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n    if (getkey(\"up\")) y-=8;\n    if (getkey(\"down\")) y+=8;\n    if (getkey(\"left\")) x-=8;\n    if (getkey(\"right\")) x+=8;\n    update();\n}"}}
    );
}

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

requirejs.setName('Sprites');
Sprites=function () {
    var sprites=[];
    var SP;
    var imageList=[];
    function add(params) {
        var s={width:32, height:32};
        s.draw=function (ctx) {
            if (s.x==null || s.y==null) return;
            if (s.p==null) s.p=0;
            s.p=Math.floor(s.p);
            //var img=baseImg;
            var e=imageList[s.p];
            if (!e) return;
            s.width=e.width;
            s.height=e.height;
            ctx.drawImage(e.image, e.x, e.y, e.width, e.height,
                                    s.x-s.width/2, s.y-s.height/2, s.width, s.height);
            /*
            ctx.drawImage( img.image ,
                    img.pwidth*(s.p % img.rows), img.pheight*(Math.floor(s.p/img.rows)) ,
                    img.pwidth, img.pheight,
                    s.x-s.width/2, s.y-s.height/2,
                    img.pwidth, img.pheight
                    );*/
            if (s.fukidashi) {
                if (s.fukidashi.c>0) {
                    s.fukidashi.c--;
                    ctx.fillStyle="white";
                    ctx.strokeStyle="black";
                    fukidashi ( ctx , s.fukidashi.text, s.x, s.y-s.height/2-10, s.fukidashi.size);
                }
            }
            /*var ary=[img.pwidth*(s.p % img.rows), img.pheight*(Math.floor(s.p/img.rows)) ,
            img.pwidth, img.pheight,
            s.x, s.y,
            img.pwidth, img.pheight];
            console.log(ary.join(","));
            */
            //ctx.drawImage( img.image, 32,32,32,32, 32,32,32,32);
        };
        s.crashTo=function (t) {
            if (s.x!=null && s.y!=null && s.width && s.height &&
                    t && t.x!=null && t.y!=null && t.width && t.height ) {
                if (Math.abs(s.x-t.x)*2<s.width+t.width &&
                    Math.abs(s.y-t.y)*2<s.height+t.height) {
                    return true;
                }
            }
            return false;
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
                if (! (a.owner instanceof w.A)) return;
                sprites.forEach(function (b) {
                    if (a===b) return;
                    if (! (b.owner instanceof w.B)) return;
                    //console.log("b:",  b.owner);
                    if (a.hitTo(b)) {
                        //console.log("hit", a.owner, b.owner);
                        w.h(a.owner,b.owner);
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
    return SP={add:add, remove:remove, draw:draw, clear:clear, sprites:sprites,
        checkHit:checkHit, watchHit:watchHit,setImageList:setImageList};
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
                if (isNaN(parseInt(i)) && !(i+"").match(/-/)) {             res.push({name: i, value: node[i]}); }
                else {          res.push({value: node[i]}); }
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
            if (isNaN(parseInt(i)) && !(i+"").match(/-/)) {             res.push({name: i, value: node[i]}); }
            else {          res.push({value: node[i]}); }
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
            } else if (opt.type("infixr")) { //a=b=c
                // st: infixr
                var inf=st.result[0];
                st=parse(opt.prio() ,st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
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
    var scall=g("scall").ands( argList.or(objlitArg) ).ret("args");
    var newExpr = g("newExpr").ands(tk("new"),symbol, call.opt()).ret(null, "name","params");
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
var GET_THIS="this.isTonyuObject?this:'not_a_tonyu_object'";
var ITER="Tonyu.iterator";
var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param"};
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
        return klass.name;
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
            s[i]=ST.NATIVE;
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
        if (n.match(/^\$/)) t=ST.NATIVE;
        if (!t) {
            topLevelScope[n]=ST.FIELD;
            t=ST.FIELD;
        }
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD || t==ST.METHOD) {
            buf.printf("%s.%s",THIZ, n);
        } else {
            buf.printf("%s",n);
        }
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
                buf.printf("%s.exit(%v);return;",TH,node.value);
            } else {
                buf.printf("return %v;",node.value);
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
                buf.printf("%s=%s;%v;",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ), node.expr );
            }
        },
        infix: function (node) {
            buf.printf("%v%v%v", node.left, node.op, node.right);
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
            if (node.inFor.type=="forin") {
                var itn=genSym("_it_");
                ctx.scope[itn]=ST.LOCAL;
                if (!ctx.noWait) {
                    var brkpos={};
                    var pc=ctx.pc++;
                    buf.printf(
                            "%s=%s(%v,%s);%n"+
                            /*B*/
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
                            /*B*/
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
                buf.printf("new %v%v",node.name,p);
            } else {
                buf.printf("new %v",node.name);
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
                printf("%s=Tonyu.klass(%s,{%{", className, getClassName(klass.superClass));
            } else {
                printf("%s=Tonyu.klass({%{", className);
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
requirejs.setName('Tonyu.Project');
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

requirejs.start();
