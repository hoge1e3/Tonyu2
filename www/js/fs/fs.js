define(["WebSite","SFileNW","Env","PathUtil","assert","SFile"],function (WebSite,wfs,Env,P,A,SFile) {
    if (wfs && wfs.get) {
        //var wfs=require("SFileNW");
        if (typeof window=="object") window.FS=wfs;
        return wfs;
    }
    var env=new Env(WebSite);
    // Media Mask
    var MM_RAM=1, MM_LS=2, MM_MIX=3;
    var ramDisk={},ramDiskUsage=null;
    if (typeof localStorage=="undefined" || localStorage==null) {
        console.log("FS: Using RAMDisk");
        ramDiskUsage="ALL";
    }
    var FS={};
    if (typeof window=="object") window.FS=FS;
    FS.ramDisk=ramDisk;
    FS.ramDiskUsage=ramDiskUsage;

    var roms={},romParents={};
    var SEP="/";
    FS.roms=roms;
    FS.romParents=romParents;
    function extend(dst,src) {
        if (!src) return;
        for (var i in src) dst[i]=src[i];
    }
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
        var res=path.split(SEP);
        if (res[res.length-1]=="") {
            res[res.length-2]+=SEP;
            res.pop();
        }
        return res;
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
    function isReadonly(path) {
        return resolveROM(path);
    }
    function getLocalStorage(path) {
        if (isUsingRAMDisk(path)) {
            return ramDisk;
        }
        return localStorage;
    }
    function lcs(path, text) {
        var ls=getLocalStorage(path);
        var r=resolveROM(path);
        if (arguments.length==2) {
            if (r) throw new Error(path+" is Read only.");
            if (text==null) delete ls[path];
            else return ls[path]=text;
        } else {
            if (r) {
                return r.rom[r.rel];
            }
            return ls[path];
        }
    }
    function lcsExists(path) {
        var ls=getLocalStorage(path);
        var r=resolveROM(path);
        if (r) return r.rel in r.rom;
        return path in ls;
    }

    function putDirInfo(path, dinfo, trashed, media) {
        // trashed: putDirInfo is caused by trashing the file/dir.
        // if media==MM_RAM, dinfo should be only in ram, otherwise it shoule be only in localStorage
        if (path==null) throw new Error( "putDir: Null path");
        if (!isDir(path)) throw  new Error("Not a directory : "+path);
        if (media==MM_RAM) {
            ramDisk[path]=dinfo;
        } else {
            lcs(path, JSON.stringify(dinfo));
        }
        var ppath=up(path);
        if (ppath==null) return;
        var pdinfo=getDirInfo(ppath, media);
        touch(pdinfo, ppath, getName(path), trashed, media);
    }
    function isUsingRAMDisk(path) {
        if (ramDiskUsage=="ALL") return true;
        if (typeof ramDiskUsage=="object") {
            if (ramDiskUsage) {
                return path in ramDiskUsage;
            }
        }
        return false;
    }
    function getDirInfo(path ,getMask) {
        //    var MM_RAM=1, MM_LS=2;
        if (path==null) throw  new Error("getDir: Null path");
        if (!endsWith(path,SEP)) path+=SEP;
        var dinfo={},r={};
        if (getMask & MM_RAM) {
            r=ramDisk[path] || {};
        }
        if (getMask & MM_LS) {
            try {
                var dinfos=lcs(path);
                if (dinfos) {
                    dinfo=JSON.parse(dinfos);
                }
            } catch (e) {
                console.log("dinfo err : "+path+" - "+dinfo);
            }
        }
        extend(dinfo, r);
        extend(dinfo, romParents[path]);
        for (var i in dinfo) {
            if (typeof dinfo[i]=="number") {
                dinfo[i]={lastUpdate:dinfo[i]};
            }
        }
        return dinfo;
    }
    function touch(dinfo, path, name, trashed, media) {
        // media : MM_RAM or MM_LS
        // path:path of dinfo
        // trashed: this touch is caused by trashing the file/dir.
        if (!dinfo[name]) {
            dinfo[name]={};
            if (trashed) dinfo[name].trashed=true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate=now();
        putDirInfo(path ,dinfo, trashed,media);
    }
    function removeEntry(dinfo, path, name,media) {// path:path of dinfo
        if (dinfo[name]) {
            dinfo[name]={lastUpdate:now(),trashed:true};
            //delete dinfo[name];
            putDirInfo(path ,dinfo, true, media);
        }
    }
    function removeEntryWithoutTrash(dinfo, path, name, media) {// path:path of dinfo
        if (dinfo[name]) {
            delete dinfo[name];
            putDirInfo(path ,dinfo, true, media);
        }
    }
    FS.orderByNewest=function (af,bf) {
        if (!af || !bf || !af.lastUpdate || !bf.lastUpdate) return 0;
        var a=af.lastUpdate();
        var b=bf.lastUpdate();
        return (a<b ? 1 : (a>b ? -1 : 0));
    };
    FS.orderByName=function (a,b) {
        if (a.name && b.name) {
            a=a.name();
            b=b.name();
        }
        return (a>b ? 1 : (a<b ? -1 : 0));
    };
    FS.orderByNumberedName=function (a,b) {
        if (a.name && b.name) {
            a=a.name();
            b=b.name();
        }
        function splitByNums(s) {
            var array=[];
            var pnum=/^[0-9]*/, pNnum=/^[^0-9]*/;
            while (s) {
                s.match(pNnum);
                array.push(RegExp.lastMatch);
                s=s.replace(pNnum,"");
                if (!s) break;
                s.match(pnum);
                var v=parseInt(RegExp.lastMatch);
                array.push(v);
                s=s.replace(pnum,"");
            }
            return array;
        }
        var aa=splitByNums(a);
        var bb=splitByNums(b);
        var i;
        for (i=0 ; i<aa.length ; i++) {
            if (i>=bb.length) return 1; // a = 123_abc2   b=123_abc
            if (aa[i]>bb[i]) return 1;
            if (aa[i]<bb[i]) return -1;
        }
        if (i<bb.length) return -1;  // a = 123_abc   b=123_abc2
        return 0;
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
                    var dinfo= getDirInfo(p, MM_LS);
                    var ovr=JSON.parse(data[i]);
                    for (var k in ovr) {
                        dinfo[k]=ovr[k];
                    }
                    putDirInfo(p, dinfo,false, MM_LS);
                } else {
                    lcs(p, data[i]);
                }
            }
        }
        return res;
    };
    FS.mountROM=function (exported) {
        console.log("ROM mouted on ",exported.base);
        roms[exported.base]=exported.data;

        var ps=splitPath(exported.base);
        var n=ps.pop();
        var p=ps.join(SEP)+SEP;
        if (!romParents[p]) romParents[p]={};
        romParents[p][n]={lastUpdate:new Date().getTime()};
    };
    var DONOTEXPORT="DONOTEXPORT";
    FS.exportDir=function (dir,options) {
        if (!options) options={};
        if (typeof dir=="string") dir=FS.get(dir);
        var res={base: dir.path()};
        var data=res.data={};
        e(dir);
        return res;
        function e(cfd) {
            var rp=cfd.relPath(dir);
            data[rp]=cfd.text();
            if (!options.keepCR) data[rp]=data[rp].replace(/\r/g,"");
            if (cfd.isDir()) {
                if (cfd.rel(DONOTEXPORT).exists()) return;
                cfd.each(e);
            }
        }
    };
    /*FS.resolve=function (path, base) {
        if (base) return FS.get(FS.get(base).rel(path));
        return FS.get(path);
    };*/
    FS.expandPath=function () {
        return env.expandPath.apply(env,arguments);
    };
    FS.resolve=function (path, base) {
        if (SFile.is(path)) return path;
        path=env.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expandPath(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };

    FS.get=function (path, securityDomain) {
        if (!securityDomain) securityDomain={};
        if (path==null) throw  new Error("FS.get: Null path");
        if (path.isDir) return path;
        if (securityDomain.topDir && !startsWith(path,securityDomain.topDir)) {
            throw  new Error(path+" is out of securtyDomain");
        }
        if (!isPath(path)) throw  new Error(path+": Path must starts with '/'");
        var parent=up(path);
        var name=getName(path);
        var res;
        if (isDir(path)) {
            var dir=res={};
            dir.files=function (f,options) {
                var res=[];
                dir.each(function (f) {
                    res.add(f);
                },options);
                return res;
            };
            dir.each=function (f,options) {
                dir.ls(options).forEach(function (n) {
                    var subd=dir.rel(n);
                    f(subd);
                });
            };
            dir.recursive=function (fun,options) {
                dir.each(function (f) {
                    if (f.isDir()) f.recursive(fun);
                    else fun(f);
                },options);
            };
            dir.listFiles=function (options) {
                var ord;
                if (typeof options=="function") ord=options;
                options=dir.convertOptions(options);
                if (!ord) ord=options.order;
                var dinfo=getDirInfo(path,MM_MIX);
                var res=[];
                for (var i in dinfo) {
                    if (!options.includeTrashed && dinfo[i].trashed) continue;
                    if (options.excludes[path+i] ) continue;
                    res.push(dir.rel(i));
                }
                if (typeof ord=="function" && res.sort) res.sort(ord);
                return res;
            };
            dir.ls=function (options) {
                var res=dir.listFiles(options);
                var r=[];
                res.forEach(function (f) {
                    r.push(f.name());
                });
                return r;
            };
            dir.convertOptions=function(options) {
                if (!options) options={};
                if (!options.excludes) options.excludes={};
                if (options.excludes instanceof Array) {
                    var excludes={};
                    options.excludes.forEach(function (e) {
                        if (startsWith(e,"/")) {
                            excludes[e]=1;
                        } else {
                            excludes[path+e]=1;
                        }
                    });
                    options.excludes=excludes;
                }
                return options;
            };
            dir.isDir=function () {return true;};
            dir.rel=function (relPath){
                var paths=splitPath(relPath);
                var resPath=dir.path();
                resPath=resPath.replace(/\/$/,"");
                paths.forEach(function (n) {
                    if (n==".." || n=="../") resPath=up(resPath);
                    else {
                        resPath=resPath.replace(/\/$/,"");
                        resPath+=SEP+(n=="."||n=="./" ? "": n);
                    }
                });
                return FS.get(resPath, securityDomain);
            };
            dir.rm=function () {
                if (!dir.exists()) throw  new Error(path+": No such dir.");
                var lis=dir.ls();
                if (lis.length>0) throw  new Error(path+": Directory not empty");
                //lcs(path, null);
                if (parent!=null) {
                    var r=dir.mediaType();
                    var pinfo=getDirInfo(parent,r);
                    removeEntry(pinfo, parent, name,r);
                }
            };
            dir.removeWithoutTrash=function() {
                var r=dir.mediaType();
                dir.each(function (f) {
                    f.removeWithoutTrash();
                },{includeTrashed:true});
                lcs(path,null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent,r);
                    removeEntryWithoutTrash(pinfo, parent, name,r);
                }
            };
            dir.mkdir=function () {
                dir.touch();
                //getDirInfo(path,r);
            };
            dir.text=function () {
                return lcs(path);
            };
            dir.obj =function () {
                return JSON.parse(dir.text());
            };
            dir.exists=function () {
                if (path=="/") return true;
                var pinfo=getDirInfo(parent,MM_MIX);
                return pinfo && pinfo[name] && !pinfo[name].trashed;
            };
            dir.mediaType=function () {
                return (ramDisk[path] && !localStorage[path]) ? MM_RAM :MM_LS;
            };
        } else {
            var file=res={};

            file.isDir=function () {return false;};
            file.rm=function () {
                if (!file.exists()) throw new Error( path+": No such file.");
                lcs(path, null);
                if (parent!=null) {
                    var r=file.mediaType();
                    var pinfo=getDirInfo(parent,r);
                    removeEntry(pinfo, parent, name,r);
                }
            };
            file.removeWithoutTrash=function () {
                if (!file.exists() && !file.isTrashed()) throw new Error( path+": No such file.");
                lcs(path, null);
                if (parent!=null) {
                    var r=file.mediaType();
                    var pinfo=getDirInfo(parent,r);
                    removeEntryWithoutTrash(pinfo, parent, name,r);
                }
            }
            file.text=function () {
                if (arguments.length==0) {
                    return lcs(path);
                } else {
                    lcs(path, arguments[0]);
                    file.touch();
                }
            };
            file.lines=function () {
                return file.text().split("\n");
            };
            file.obj=function () {
                if (arguments.length==0) {
                    var t=file.text();
                    if (!t) return null;
                    return JSON.parse(t);
                } else {
                    file.text(JSON.stringify(arguments[0]));
                }
            };
            file.copyFrom=function (src, options) {
                file.text(src.text());
                if (options.a) file.metaInfo(src.metaInfo());
            };
            file.exists=function () {
                return lcsExists(path);
            };
            file.useRAMDisk=function () {
                // currently file only
                if (ramDiskUsage=="ALL") return file;
                ramDiskUsage=ramDiskUsage||{};
                ramDiskUsage[path]=true;
                return file;
            };
            file.mediaType=function () {
                return isUsingRAMDisk(path)?MM_RAM:MM_LS;
            };
        }
        res.relPath=function (base) {
            //  path= /a/b/c   base=/a/b/  res=c
            //  path= /a/b/c/   base=/a/b/  res=c/
            //  path= /a/b/c/   base=/a/b/c/d  res= ../
            //  path= /a/b/c/   base=/a/b/e/f  res= ../../c/
            var bp=(base.path ? base.path() : base);
            if (bp.substring(bp.length-1)!=SEP) {
                throw  new Error(bp+" is not a directory.");
            }
            if (path.substring(0,bp.length)!=bp) {
                return "../"+res.relPath(base.up());
                //throw path+" is not in "+bp;
            }
            return path.substring(bp.length);
        };
        res.isTrashed=function () {
            var m=res.metaInfo();
            if (!m) return false;
            return m.trashed;
        };
        res.metaInfo=function () {
            if (parent!=null) {
                var pinfo;
                if (arguments.length==0) {
                    pinfo=getDirInfo(parent,MM_MIX);
                    return pinfo[name];
                } else {
                    var media=res.mediaType();
                    pinfo=getDirInfo(parent,media);
                    pinfo[name]=arguments[0];
                    putDirInfo(parent, pinfo, pinfo[name].trashed, media);
                }
            }
            return {};
        };
        res.lastUpdate=function () {
            return res.metaInfo().lastUpdate;
        };
        res.up=function () {
            if (parent==null) return null; //  path=/
            return FS.get(parent, securityDomain);
        };
        res.path=function () {return path;};
        res.name=function () {return name;};
        res.truncExt=function (ext) {
            return name.substring(0,name.length-ext.length);
        };
        res.touch=function () {
            if (parent==null) return ; //  path=/
            var r=res.mediaType();
            var pinfo=getDirInfo(parent,r);
            touch(pinfo, parent, name, false, r);
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
        res.isSFile=function (){return true;};
        return res;
    };
    function up(path) {
        if (path==SEP) return null;
        //                       path=/a/b/c/               /a/b/c
        var s=splitPath(path);  //  s=["","a","b","c/"]     ["","a","b","c"]
        s[s.length-1]=""; //        s=["","a","b",""]       ["","a","b",""]
        return  s.join(SEP) ;  //     /a/b/                 /a/b/
    }
    function isPath(path) {
        return startsWith(path,SEP);
    }
    function isDir(path) {
        return endsWith(path,SEP);
    }
    function getName(path) {  //  a/b/c  => c    a/b/c/  => c/
        var patha=splitPath(path);
        return patha[patha.length-1];
        /*
        if (patha[patha.length-1]=="") {
            name=patha[patha.length-2]+SEP;
        } else {
            name=patha[patha.length-1];
        }
        return name;*/
    }
    FS.scan=function () {
        for (var path in localStorage) {
            if (!isPath(path)) continue;
            var p=up(path);
            if (p==null) continue;
            var dinfo=getDirInfo(p, MM_LS);
            var name=getName(path);
            touch(dinfo, p , name, dinfo[name] && dinfo[name].trashed, MM_LS);
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
});
