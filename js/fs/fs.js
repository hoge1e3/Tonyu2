FS=function () {
    var FS={};
    var roms={};
    var SEP="/";
    FS.roms=roms;
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
        if (!endsWith(path,SEP)) path+=SEP;
        var dinfo=lcs(path);
        try {
            dinfo=JSON.parse(dinfo);
        } catch (e) {
            if (!isReadonly(path)) {
                lcs(path,"{}");
            } else {
            	console.log("dinfo err : "+path+" - "+dinfo);
            }
            dinfo={};
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
    FS.orderByNumberedName=function (a,b) {
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
            if (cfd.isDir()) {
            	if (cfd.rel(DONOTEXPORT).exists()) return;
                cfd.each(e);
            }
        }
    };
    FS.get=function (path) {
        if (path==null) throw "FS.get: Null path";
        if (path.isDir) return path;
        if (!isPath(path)) throw path+": Path must starts with '/'";
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
                return FS.get(resPath);
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
            file.lines=function () {
            	return file.text().split("\n");
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
            if (bp.substring(bp.length-1)!=SEP) {
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
        if (path==SEP) return null;
        //                       path=/a/b/c/               /a/b/c
        var s=splitPath(path);  //  s=["","a","b","c/"]     ["","a","b","c"]
        s[s.length-1]=""; //        s=["","a","b",""]       ["","a","b",""]
        return  s.join(SEP) ;  //     /a/b/                 /a/b/

        /*var name=s[s.length-1];
        var isDir=endsWith(name, SEP);
        if (!isDir) {
        	// path=/a/b/c
        	// s=["a", "b", "c"]
            s[s.length-1]=""; // s=["a","b",""]
            return  s.join(SEP) ;  // /a/b/
        } else {
        	// path=/a/b/c/
        	// s=["a", "b", "c/"]
        	//s.pop();
            s[s.length-1]="";     // s=["a", "b", ""]
            return  s.join(SEP) ;  // /a/b/
        }*/
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