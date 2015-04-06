// Created at Mon Apr 06 2015 18:04:27 GMT+0900 (東京 (標準時))
(function () {
	var R={};
	R.def=function (reqs,func,type) {
		var m=R.getModuleInfo(R.curName);
		m.type=type;
		R.setReqs( m, reqs);
		m.func=function () {
			//console.log("reqjs ",m.name);
			return func.apply(this, R.getObjs(reqs));
		};
		R.loadIfAvailable(m);
	};
	define=function (reqs,func) {
		R.def(reqs,func,"define");
	};
	require=requirejs=function (reqs,func) {
		R.def(reqs,func,"require");
	};
	R.setReqs=function (m, reqs) {
		reqs.forEach(function (req) {
			var reqm=R.getModuleInfo(req);
			if (!reqm.loaded) {
				m.reqs[req]=reqm;
				reqm.revReqs[m.name]=m;
			}
		});
	};
	R.getModuleInfo=function (name) {
		var ms=R.modules;
		if (!ms[name]) ms[name]={name:name,reqs:{},revReqs:{}};
		return ms[name];
	};
	R.doLoad=function (name) {
		var m=R.getModuleInfo(name);
		//console.log("doLoad ",name, m.loaded, m.func);
		if (m.loaded) return m.obj;
		m.loaded=true;
		var res=null;
		if (m.func) res=m.func();
		else {
			var names=name.split(/\./);
			res=(function () {return this;})();
			names.forEach(function (name) {
				if (res) res=res[name];
			});
			if ( res==null) console.log("Warning: No obj for "+name);
		}
		if ( m.type=="define" && res==null) throw("No obj for "+name);
		m.obj=res;
		for (var i in m.revReqs) {
			R.notifyLoaded(m.revReqs[i], m.name);
		}
		return res;
	};
	R.notifyLoaded=function (revReq, loadedModuleName) {
		delete revReq.reqs[loadedModuleName];
		R.loadIfAvailable(revReq);
	};
	R.loadIfAvailable=function (m) {
		for (var i in m.reqs) {
			return;
		}
		R.doLoad(m.name);
	};
	R.getObjs=function (ary) {
		var res=[];
		ary.forEach(function (n) {
			var cur=R.doLoad(n);
			res.push(cur);
		});
		return res;
	};
	R.modules={};
	R.setName=function (n) {
		if (R.curName) {
			if (!R.getModuleInfo(R.curName).func) {
				R.doLoad(R.curName);
			}
		}
		if (n) {
			R.curName=n;
		}
	};
	requireSimulator=R;
	return R;
})();

requireSimulator.setName('WebSite');
define([], function () {
    var loc=document.location.href;
    var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
    if (loc.match(/jsrun\.it/)) {
        window.WebSite={
            urlAliases: {
                "images/Ball.png":"http://jsrun.it/assets/9/X/T/b/9XTbt.png",
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png",
                "images/inputPad.png":"http://jsrun.it/assets/r/K/T/Y/rKTY9.png"
            },top:"",devMode:devMode, pluginTop: "http://tonyuedit.appspot.com/js/plugins"
        };
    } else if (
      loc.match(/tonyuexe\.appspot\.com/) ||
      loc.match(/localhost:8887/) ||
 	  (
 	    (
 	       loc.match(/^file:/) ||
 	       loc.match(/localhost/) ||
	       loc.match(/tonyuedit\.appspot\.com/)
	    ) &&
	    loc.match(/\/html\/((dev)|(build))\//)
	  )
    ) {
        window.WebSite={
            urlAliases: {
                "images/Ball.png":"../../images/Ball.png",
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                    "images/ecl.png":"../../images/ecl.png"
            },top:"../..",devMode:devMode
        };
    } else {
        window.WebSite={
           urlAliases: {}, top: "../..",devMode:devMode
        };
    }
    if (!window.WebSite.pluginTop) {
        window.WebSite.pluginTop=window.WebSite.top+"/js/plugins";
    }
    window.WebSite.disableROM={};
	if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
	    //window.WebSite.disableROM={"ROM_d.js":true};
	}
    if (loc.match(/\.appspot\.com/) ||  loc.match(/localhost:888[87]/)) {
        window.WebSite.serverType="GAE";
    }
    if (loc.match(/localhost:3000/) ) {
        window.WebSite.serverType="Node";
    }
    if (loc.match(/tonyuexe\.appspot\.com/) ||
        loc.match(/localhost:8887/)) {
        window.WebSite.serverTop=window.WebSite.top+"/exe"; // Fix NetModule.tonyu!!
    } else {
        window.WebSite.serverTop=window.WebSite.top+"/edit";// Fix NetModule.tonyu!!
    }
    window.WebSite.sampleImg=window.WebSite.top+"/images";
    window.WebSite.blobPath=window.WebSite.serverTop+"/serveBlob";
    window.WebSite.isNW=(typeof process=="object" && process.__node_webkit);
    window.WebSite.tonyuHome="/Tonyu/";
    if (window.WebSite.isNW) {
        if (process.env.TONYU_HOME) {
            window.WebSite.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
        } else {
            window.WebSite.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
        }
    }
    return window.WebSite;
});

requireSimulator.setName('FS');
define(["WebSite"],function (WebSite) {
    if (WebSite.isNW) {
        var wfs=require("SFileNW");
        if (typeof window=="object") window.FS=wfs;
        return wfs;
    }
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
    FS.resolve=function (path, base) {
        if (base) return FS.get(FS.get(base).rel(path));
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

requireSimulator.setName('fs/ROMk');
(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{".desktop":{"lastUpdate":1424849946377},"Actor.tonyu":{"lastUpdate":1425004177938},"BaseActor.tonyu":{"lastUpdate":1428309459688},"BodyActor.tonyu":{"lastUpdate":1425555929415},"Boot.tonyu":{"lastUpdate":1425019818961},"DxChar.tonyu":{"lastUpdate":1421384204610},"EventMod.tonyu":{"lastUpdate":1425010352383},"InputDevice.tonyu":{"lastUpdate":1416890086000},"js/":{"concat.js":{"lastUpdate":1428310204290}},"Keys.tonyu":{"lastUpdate":1412697666000},"Map.tonyu":{"lastUpdate":1421122943495},"MapEditor.tonyu":{"lastUpdate":1421122943503},"MathMod.tonyu":{"lastUpdate":1424849946395},"MediaPlayer.tonyu":{"lastUpdate":1421384204625},"MML.tonyu":{"lastUpdate":1424849946399},"NoviceActor.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1428228309742},"Pad.tonyu":{"lastUpdate":1421122943510},"Panel.tonyu":{"lastUpdate":1427702417187},"ParallelMod.tonyu":{"lastUpdate":1428310177307},"PlainChar.tonyu":{"lastUpdate":1427964942819},"PlayMod.tonyu":{"lastUpdate":1425018365373},"ScaledCanvas.tonyu":{"lastUpdate":1421122943524},"SecretChar.tonyu":{"lastUpdate":1421384204695},"SpriteChar.tonyu":{"lastUpdate":1421384204710},"Sprites.tonyu":{"lastUpdate":1421122943538},"T1Line.tonyu":{"lastUpdate":1427965036844},"T1Map.tonyu":{"lastUpdate":1421384204728},"T1Page.tonyu":{"lastUpdate":1421384204737},"T1Text.tonyu":{"lastUpdate":1427965019581},"T2Body.tonyu":{"lastUpdate":1425264703379},"T2Mod.tonyu":{"lastUpdate":1425020004839},"T2World.tonyu":{"lastUpdate":1427976124069},"TextChar.tonyu":{"lastUpdate":1421384204762},"TextRectMod.tonyu":{"lastUpdate":1427702468448},"TObject.tonyu":{"lastUpdate":1421122943543},"TQuery.tonyu":{"lastUpdate":1412697666000},"WaveTable.tonyu":{"lastUpdate":1412697666000}}',
      '.desktop': '{"runMenuOrd":["Main0121","Main1023","TouchedTestMain","Main2","MapLoad","Main","AcTestM","NObjTest","NObjTest2","AcTest","AltBoot","Ball","Bar","Bounce","MapTest","MapTest2nd","SetBGCTest","Label","PanelTest","BaseActor","Panel","MathMod"]}',
      'Actor.tonyu': 'extends BaseActor;\nincludes PlayMod;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    onAppear();\n}\n\\onAppear() {\n}\n',
      'BaseActor.tonyu': 'extends null;\nincludes MathMod,EventMod,TextRectMod,ParallelMod;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\nnative FS;\nnative Array;\n\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this);\n    }\n    if (typeof x=="object") Tonyu.extend(this,x); \n    else if (typeof x=="number") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n    if (scaleX==null) scaleX=1;\n    if (rotation==null) rotation=0;\n    if (rotate==null) rotate=0;\n    if (alpha==null) alpha=255;\n    if (zOrder==null) zOrder=0;\n    if (age==null) age=0;\n    if (anim!=null && typeof anim=="object"){\n        animMode=true;\n        animFrame=0;\n    }else{\n        animMode=false;\n    }\n    if (animFps==null) animFps=1;\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}\n\nnowait \\print(pt) {\n    console.log.apply(console,arguments);\n    if($consolePanel){\n        $consolePanel.scroll(0,20);\n        $consolePanel.setFillStyle("white");\n        $consolePanel.fillText(pt,0,$consolePrintY,20,"left");\n    }\n}\n\nnowait \\setAnimFps(f){\n    this.animFps=f;\n    this.animFrame=0;\n    this.animMode=true;\n}\nnowait \\startAnim(){\n    this.animMode=true;\n}\nnowait \\stopAnim(){\n    this.animMode=false;\n}\n\\update() {\n    onUpdate();\n    if(_thread) {\n        _thread.suspend();\n    }\n}\nnowait \\onUpdate() {\n    \n}\n\\updateEx(updateT){\n    for(var updateCount=0;updateCount<updateT;updateCount++){\n        update();\n    }\n}\nnowait \\getkey(k) {\n    return $Keys.getkey(k);\n}\nnowait \\hitTo(t) {\n    return crashTo(t);\n}\nnowait \\all(c) {\n    var res=new TQuery;\n    $Sprites.sprites.forEach \\(s) {\n        if (s===this) return;\n        if (!c || s instanceof c) {\n            res.push(s);\n        }\n    };\n    return res;// new TQuery{objects:res};\n}\nnowait \\allCrash(t) {\n    var res=new TQuery;\n    var sp=this; //_sprite || this;\n    var t1=getCrashRect();\n    if (!t1) return res;\n    $Sprites.sprites.forEach(\\(s) {\n        var t2;\n        if (s!==this && \n        !s.excludeFromAll &&\n        s instanceof t && \n        (t2=s.getCrashRect()) &&\n        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n            res.push(s);    \n        }\n    });\n    return res;\n}\nnowait \\crashTo(t) {\n    if (!t) return false;\n    if (typeof t=="function") {\n        return allCrash(t)[0];\n    }\n    return crashTo1(t);\n}\nnowait \\crashTo1(t) {\n    if (!t || t._isDead) return false;\n    /*if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n    }*/\n    var t1=getCrashRect();\n    var t2=t.getCrashRect();\n    return \n    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\n    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\n    t1 && t2 &&\n    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n}\nnowait \\getCrashRect() {\n    var actWidth=width*scaleX, actHeight;\n    if(typeof scaleY==="undefined"){\n        actHeight=height*scaleX;\n    }else{\n        actHeight=height*scaleY;\n    }\n    return typeof x=="number" &&\n    typeof y=="number" &&\n    typeof width=="number" &&\n    typeof height=="number" && \n    {x,y,width:actWidth,height:actHeight};\n}\nnowait \\within(t,distance){\n    if(!t || t._isDead) return false;\n    if(Math.sqrt(Math.abs(x-t.x)*Math.abs(x-t.x)+ Math.abs(y-t.y)*Math.abs(y-t.y))<distance){\n        return true;\n    }\n    return false;\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {\n    return $currentThreadGroup; \n}\nnowait \\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    fireEvent("die");\n    _isDead=true;\n}\nnowait \\hide() {\n    /*if (_sprite) {\n        $Sprites.remove(_sprite);\n        _sprite=null;\n    } else {*/\n        //$Sprites.remove(this);\n    //}\n    if(layer && typeof layer.remove=="function"){\n        layer.remove(this);\n    }else{\n        $Sprites.remove(this);\n    }\n}\nnowait \\show(x,y,p) {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    if (x!=null) this.x=x;\n    if (y!=null) this.y=y;\n    if (p!=null) this.p=p;\n}\n\nnowait \\detectShape() {\n    if (typeof p!="number") {\n        if (text!=null) return;\n        p=0;\n    }\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    width=pImg.width;\n    height=pImg.height;\n}\n\\waitFor(f) {\n    ifwait {\n        _thread.waitFor(f);\n    }\n    update();\n}\nnowait \\isDead() {\n    return _isDead;\n}\n\nnowait \\animation(){\n    age++;\n    if(animMode && age%animFps==0){\n        p=anim[animFrame%anim.length];\n        animFrame++;\n    }\n}\nnowait \\draw(ctx) {\n    if (x==null || y==null || _isInvisible) return;\n    detectShape();\n    if (pImg) {\n        ctx.save();\n        ctx.translate(x,y);\n        //if (typeof rotate=="number" ) rotation=rotate;// 削除予定\n        //ctx.rotate(this.rotation/180*Math.PI);\n        animation();\n        if(this.rotation!=0){\n            ctx.rotate(this.rotation/180*Math.PI);\n        }else{\n            ctx.rotate(this.rotate/180*Math.PI);\n        }\n        if(typeof this.scaleY==="undefined") {\n            ctx.scale(this.scaleX,this.scaleX);\n        }else{\n            ctx.scale(this.scaleX,this.scaleY);\n        }\n        ctx.globalAlpha=this.alpha/255;\n        ctx.drawImage(\n        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n        -width/2, -height/2, width, height);\n        ctx.restore();\n    } else if (text!==null && text!==undefined) {\n        if (!size) size=15;\n        if (!align) align="center";\n        if (!fillStyle) fillStyle="white";\n        ctx.fillStyle=fillStyle;\n        ctx.globalAlpha=this.alpha/255;\n        var rect=drawTextRect(ctx, text, x, y, size, align , "fill");\n        width=rect.w;\n        height=rect.h;\n    }\n    if (_fukidashi) {\n        if (_fukidashi.c>0) {\n            _fukidashi.c--;\n            ctx.fillStyle="white";\n            ctx.strokeStyle="black";\n            fukidashi ( ctx , _fukidashi.text, \n            x, y-height/2-10, _fukidashi.size);\n        }\n    }\n}\nnowait \\asyncResult() {\n    return Tonyu.asyncResult();\n}\n\n\\screenOut(a) {\n    //オブジェクトが画面外に出たかどうかを判定します。\n    if (!a) a=0;\n    var r=0;\n    var viewX=0,viewY=0;\n    if (x<viewX+a)               r+=viewX+a-x;\n    if (y<viewY+a)               r+=viewY+a-y;\n    if (x>$screenWidth +viewX-a) r+=x-($screenWidth +viewX-a);\n    if (y>$screenHeight+viewY-a) r+=y-($screenHeight+viewY-a);\n    return r;\n}\n\\file(path) {\n    var d=Tonyu.currentProject.getDir();\n    var files=d.rel("files/");\n    return FS.get(files.rel(path)) {topDir:d};\n}\n\\waitInputDevice(fl) {\n    if (fl!==false) {\n        if (!origTG) {\n            ifwait {\n                origTG=_thread.group;\n                _thread.setGroup(null);\n            }\n        }\n        a=asyncResult();\n        $InputDevice.addOnetimeListener(a.receiver);\n        waitFor(a);\n    } else {\n        if (origTG) {\n            ifwait {\n                _thread.setGroup(origTG);\n                origTG=null;\n            }\n        }\n    }\n}\n\\redrawScreen() {\n    $Sprites.draw($Screen.buf[0]);\n    $Screen.draw();\n}\n\n// from PlainChar\n\\color(r,g,b) {\n    return "rgb("+[r,g,b].join(",")+")";\n}\n\\drawText(x,y,text,col,size) {\n    if ($debug) return;\n    if (!size) size=15;\n    if (!col) col="cyan";\n    var tp=all(T1Text).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n    }else {\n        new T1Text{x,y,text,fillStyle:col, size};  \n    }\n}\n\\drawLine(x,y,tx,ty,col) {\n    if (!col) col="white";\n    var tp=all(T1Line).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,tx,ty,col, hidden:false};\n    }else {\n        new T1Line{x,y,tx,ty,col};  \n    }\n}\n\\loadPage(page,arg){\n    all().die();\n    new page(arg);\n    die();\n}\n\n\\setVisible(v) {\n    _isInvisible=!v;\n}',
      'BodyActor.tonyu': 'extends Actor;\nincludes T2Mod;\nnative Box2D;\n\n\\getWorld() {\n    if ($t2World) return $t2World;\n    $t2World=new T2World;\n    return $t2World;\n}\n\\onAppear() {\n    world=getWorld().world;\n    scale=getWorld().scale;\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var b2BodyDef = Box2D.Dynamics.b2BodyDef;\n    var b2Body = Box2D.Dynamics.b2Body;\n    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n    var b2Fixture = Box2D.Dynamics.b2Fixture;\n    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n    \n    var fixDef = new b2FixtureDef;\n    fixDef.density = density || 1.0;\n    fixDef.friction = friction || 0.5;\n    fixDef.restitution = restitution || 0.2;\n    \n    var bodyDef = new b2BodyDef;\n    bodyDef.type = isStatic ? b2Body.b2_staticBody :\n    b2Body.b2_dynamicBody;\n    \n    bodyDef.position.x = x /scale;\n    bodyDef.position.y = y /scale;\n    shape=shape || (radius ? "circle" : "box");\n    var w=width,h=height;\n    if (!w) {\n        detectShape();\n        w=width*(scaleX||1);\n        h=height*(scaleY||scaleX||1);\n    }\n    if (shape=="box") {\n        if (!h) h=w;\n        fixDef.shape = new b2PolygonShape;\n        fixDef.shape.SetAsOrientedBox(w/2/scale, h/2/scale,\n        new b2Vec2(0,0),0);\n    } else {\n        radius=radius || w/2 || 16;\n        fixDef.shape = new b2CircleShape(\n        radius/scale\n        );\n        width=height=radius*2;\n    } \n    body=world.CreateBody(bodyDef);\n    body.CreateFixture(fixDef);\n    body.SetUserData(this);\n    body.SetAngle(rad(rotation));\n}\n\\allContact(klass) {\n    var res=[];\n    for (var c=world.GetContactList();c;c=c.GetNext()) {\n        if (c.IsTouching()) {\n            var a=c.GetFixtureA().GetBody().GetUserData();\n            var b=c.GetFixtureB().GetBody().GetUserData();\n            if (a===this) {\n                if (!klass || b===klass || b instanceof klass) {\n                    res.push(b);\n                }\n            } else if (b===this) {\n                if (!klass || a===klass || a instanceof klass) {\n                    res.push(a);\n                }\n            }\n        }\n    }\n    return res;\n}\n\\applyForce(fx,fy,px,py) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var scale=getWorld().scale;\n    var fps=60;\n    body.ApplyForce(new b2Vec2(fx ,fy),body.GetPosition());\n}\n\\applyImpulse(fx,fy,px,py) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var scale=getWorld().scale;\n    var fps=60;\n    body.ApplyImpulse(new b2Vec2(fx ,fy),body.GetPosition());\n}\n\n\\applyTorque(a) {\n    body.ApplyTorque(a);\n}\n\\moveBy(dx,dy) {\n    var pos=body.GetPosition();\n    pos.x+=dx/scale;\n    pos.y+=dy/scale;\n    body.SetPosition(pos);\n}\n\\contactTo(t) {\n    return allContact(t)[0];\n}\n\\die() {\n    super.die();\n    world.DestroyBody(body);\n}\n\\updatePos() {\n    if (!body) return;\n    var scale=getWorld().scale;\n    var pos=body.GetPosition();\n    x=pos.x*scale;\n    y=pos.y*scale;\n    rotation=deg(body.GetAngle());\n}\n\n',
      'Boot.tonyu': 'extends Actor;\nnative $;\nnative TError;\nnative $LASTPOS;\nnative Key;\nnative Date;\nnative ImageList;\nnative Tonyu;\nnative SplashScreen;\nnative Math;\n\n\\initSprites() {\n    $Sprites=new Sprites();\n    $FrontSprites=new Sprites();\n    print ("Loading plugins..");\n    var a=asyncResult();\n    $currentProject.loadPlugins(a.receiver);\n    waitFor(a);\n    print ("Loading pats..");\n    var rs=$currentProject.getResource();\n    a=asyncResult();\n    ImageList.load( rs.images, a.receiver)\n    {baseDir:$currentProject.getDir()};\n    waitFor(a);\n    var r=a[0];\n    $Sprites.setImageList(r);\n    for (var name,val in r.names) {\n        Tonyu.setGlobal(name, val);\n    }\n    print ("Loading pats done.");\n    cvj=$("canvas");\n    if (Tonyu.noviceMode) {\n        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\n    } else {\n        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\n    }\n}\n\n\n\\initThread() {\n    $mainThreadGroup=thg=Tonyu.threadGroup();\n    var o=Tonyu.currentProject.getOptions();\n    var mainClassName=o.run.mainClass;\n    print("MainClass= "+mainClassName);\n    mainClass=Tonyu.getClass(mainClassName);\n    if (!mainClass) {\n        TError( mainClassName+" というクラスはありません", \n        "不明" ,0).raise();\n    }\n    Tonyu.runMode=true;\n    $currentThreadGroup=thg;\n    new mainClass();\n}\n\\stop() {\n    fireEvent("stop");\n}\ninitSprites();\n$InputDevice=new InputDevice;\n$InputDevice.initCanvasEvents(cvj);\ninitThread();\n\n$pat_fruits=30;\n$Keys=new Keys;\n$Math=Math;\n$consolePanel=new Panel{align:"center",x:465/2,y:465/2,width:465,height:465,zOrder:-10,layer:$FrontSprites};\n$consolePrintY=465-15;\n$panel=new Panel{align:"center",x:$screenWidth/2,y:$screenHeight/2,width:$screenWidth,height:$screenHeight,zOrder:-1,layer:$FrontSprites};\nif (typeof SplashScreen!="undefined") SplashScreen.hide();\ninitFPSParams();\n\nwhile (true) {\n    thg.steps();\n    $Keys.update();\n    $InputDevice.update();\n    $screenWidth=$Screen.width;\n    $screenHeight=$Screen.height;\n    \n    doDraw=now()<deadLine;\n    if (!doDraw && frameSkipped>=maxFrameSkip) {\n        doDraw=true;\n        resetDeadLine();\n    }\n    if (doDraw) { // フレームスキップの時は描画しない\n        $Screen.fillCanvas($Screen.buf[0]);\n        $Sprites.draw($Screen.buf[0]);\n        $FrontSprites.draw($Screen.buf[0]);\n        $Screen.draw();\n        fps_fpsCnt ++;\n        frameSkipped=0;\n    } else {\n        frameSkipped++;\n    }\n    $Sprites.checkHit();\n    fps_rpsCnt ++;\n    measureFps();\n    waitFrame(); // FPS制御\n    while(paused) {\n        waitFor(Tonyu.timeout(1)); \n        if (!paused) resetDeadLine();\n    }\n}\n\nnowait \\initFPSParams() {\n    // フレームレートの設定\n    _fps = 30;\n    maxframeSkip = 5;\n    // フレームレート制御でつかう変数 //\n    frameCnt = 0;\n    resetDeadLine();\n    $Boot = this;\n    lastMeasured=now();\n    fps_fps=fps_rps=fps_fpsCnt=fps_rpsCnt=0;\n}\nnowait \\now() {\n    return new Date().getTime();\n}\nnowait \\resetDeadLine() {\n    deadLine=now()+1000/_fps;\n    frameSkipped = 0;\n}\n\n\\waitFrame() {\n    var wt=deadLine-now();\n    if (wt<1) {\n        if (wt<-1000) resetDeadLine();\n        wt=1;\n    }\n    wt=floor(wt);\n    waitFor(Tonyu.timeout(wt));\n    deadLine+=1000/_fps;\n}\n\nnowait \\getFrameRate() {\n    return _fps;\n}\n\n// Tonyu1の$System.setFrameRate() //\nnowait \\setFrameRate(fps, maxFrameSkip) {\n    _fps = fps;\n    if (typeof maxFrameSkip!="number") maxFrameSkip=5;\n    this.maxFrameSkip = maxFrameSkip;\n    resetDeadLine();\n}\n\n// FPS（計測したフレームレート）を返す //\nnowait \\getMeasuredFps() {\n    return fps_fps;\n}\n\n// RPS（計測した実行レート）を返す //\nnowait \\getMeasuredRps() {\n    return fps_rps;\n}\n\nnowait \\measureFps() {\n    if (now()>lastMeasured+1000) {\n        fps_fps=fps_fpsCnt;\n        fps_rps=fps_rpsCnt;\n        fps_fpsCnt=0;\n        fps_rpsCnt=0;\n        lastMeasured=now();\n    }\n}\n\n',
      'DxChar.tonyu': 'extends SpriteChar;\n\n\\new (xx,yy,pp,ff,sz,rt,al){\n    super(xx,yy,pp,ff);\n    scaleX=1;\n    if (sz) scaleX=sz;\n    angle=0;\n    if (rt) angle=rt;\n    alpha=255;\n    if (al) alpha=al;\n}\n\\draw(c) {\n    rotation=angle;\n    super.draw(c);\n}\n',
      'EventMod.tonyu': 'extends null;\n\n\\getEventHandlers(type) {\n    if (!_handlers) _handlers={};\n    if (!_handlers[type]) _handlers[type]=[];\n    return _handlers[type];\n}\n\\on(type, handler) {\n    getEventHandlers(type).push(handler);\n}\n\n\\fireEvent(type,args) {\n    if (!args) args=[];\n    for (var h in getEventHandlers(type)) {\n        h.apply(this,args);\n    }\n}\n',
      'InputDevice.tonyu': 'extends null;\nnative $;\nnative window;\nnative Tonyu;\n\\new() {\n    listeners=[];\n    touchEmu=true;\n}\n\\handleListeners() {\n    var l=listeners;\n    listeners=[];\n    while (l.length>0) { (l.shift())(); }\n}\n\\addOnetimeListener(l){\n    listeners.push(l);\n}\n\\initCanvasEvents(cvj) {\n    var cv=cvj[0];\n    $handleMouse=\\(e) {\n        var p=cvj.offset();\n        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\n        mp=$Screen.canvas2buf(mp);\n        $mouseX=mp.x;\n        $mouseY=mp.y;\n        if (touchEmu) {\n            $touches[0].x=mp.x;\n            $touches[0].y=mp.y;\n        }\n        handleListeners();\n    };\n    $touches=[{},{},{},{},{}];\n    $touches.findById=\\(id) {\n        for (var j=0 ; j<$touches.length ; j++) {\n            if ($touches[j].identifier==id) {\n                return $touches[j];\n            }\n        }\n    };\n    $handleTouch=\\(e) {\n        touchEmu=false;\n        var p=cvj.offset();\n        e.preventDefault();\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (!dst) {\n                for (var j=0 ; j<$touches.length ; j++) {\n                    if (!$touches[j].touched) {\n                        dst=$touches[j];\n                        dst.identifier=src.identifier;\n                        break;\n                    }\n                }\n            }\n            if (dst) {\n                mp={x:src.pageX-p.left, y:src.pageY-p.top};\n                mp=$Screen.canvas2buf(mp);\n                dst.x=mp.x;\n                dst.y=mp.y;\n                if(!dst.touched) dst.touched=1;\n            }\n        }\n        $mouseX=$touches[0].x;\n        $mouseY=$touches[0].y;\n        handleListeners();\n    };\n    $handleTouchEnd=\\(e) {\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (dst) {\n                dst.touched=0;\n                dst.identifier=-1;\n            }\n        }\n        handleListeners();\n    };\n    var handleMouse=\\(e){$handleMouse(e);};\n    var handleTouch=\\(e){$handleTouch(e);};\n    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\n    var d=$.data(cv,"events");\n    if (!d) {\n        $.data(cv,"events","true");\n        cvj.mousedown(handleMouse);\n        cvj.mousemove(handleMouse);\n        cvj.on("touchstart",handleTouch);\n        cvj.on("touchmove",handleTouch);\n        cvj.on("touchend",handleTouchEnd);\n    }\n}\n\n\\update() {\n    for (var i in $touches) {\n        if (i.touched>0) {i.touched++;}\n        if (i.touched==-1) i.touched=1;\n    }\n}',
      'Keys.tonyu': 'extends TObject;\nnative String;\nnative $;\nnative document;\n//\\new () {this.main();}\nstats={};\ncodes={\n    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\n    shift:16, ctrl:17, alt:18, mouseleft: 1\n};\nfor (var i=65 ; i<65+26; i++) {\n    codes[String.fromCharCode(i).toLowerCase()]=i;\n}\nfor (var i=48 ; i<58; i++) {\n    codes[String.fromCharCode(i)]=i;\n}\nif (!$.data(document,"key_event")) {\n    $.data(document,"key_event",true);\n    $(document).keydown \\(e) {$Keys.keydown(e);};\n    $(document).keyup \\(e) {$Keys.keyup(e);};\n    $(document).mousedown \\(e) {\n        if ($InputDevice.touchEmu) {\n            $touches[0].touched=1;\n        }\n        $Keys.keydown{keyCode:1};\n    };\n    $(document).mouseup \\(e) {\n        if ($InputDevice.touchEmu) {\n            $touches[0].touched=0;\n        }\n        $Keys.keyup{keyCode:1};\n    };\n}\nfunction getkey(code) {\n    if (typeof code=="string") {\n        code=codes[code.toLowerCase()];\n    }\n    if (!code) return 0;\n    if (stats[code]==-1) return 0;\n    if (!stats[code]) stats[code]=0;\n    return stats[code];\n}\nfunction update() {\n    for (var i in stats) {\n        if (stats[i]>0) {stats[i]++;}\n        if (stats[i]==-1) stats[i]=1;\n    }\n}\n\\keydown(e) {\n    var s=stats[e.keyCode];\n    if (!s) {\n        stats[e.keyCode]=1;\n    }\n    $InputDevice.handleListeners();\n}\n\\keyup(e) {\n    stats[e.keyCode]=0;\n    $InputDevice.handleListeners();\n}',
      'MML.tonyu': 'extends TObject;\nincludes MathMod;\nnative T;\n\nmmlBuf=[];\n\\play(mmls) {\n    mmlBuf.push(mmls);\n    if (!isPlaying()) {\n        playNext();\n    }\n}\n\\playNext() {\n    //print("play!", id(), bufferCount());\n    if (cTimeBase==null) cTimeBase=0;\n    if (m) {\n        cTimeBase+=m.currentTime;\n        //print(m.currentTime);\n    }\n    var mml=mmlBuf.shift();\n    if (!mml) {\n        m=null;\n        cTimeBase=0;\n        return;\n    }\n    mwav=$WaveTable.get(0,0).play();\n    m=T("mml", {mml}, mwav);\n    m.on("ended", playNext);\n    m.start();\n    $MMLS[id()]=this;\n}\n\\id() {\n    if (!_id) _id=rnd()+"";\n    return _id;\n}\n\\bufferCount() {\n    return mmlBuf.length;\n}\n\\isPlaying() {\n    return m;\n}\n\\currentTime() {\n    if (m) return m.currentTime+cTimeBase;\n    return -1;\n}\n\\stop() {\n    if (m) {\n        if (mwav) {\n            mwav.pause();\n            mwav.stop();\n        }\n        m.pause();\n        m.stop();\n        m=null;\n        mmlBuf=[];\n        //print("stop!", id(), bufferCount());\n        delete $MMLS[id()];\n    }\n}\n',
      'Map.tonyu': 'extends Actor;\nnative Math;\nnative $;\n\\new (param){\n    sx=0;\n    sy=0;\n    super(param);\n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    mapObj=true;\n    mapTable = [];\n    mapOnTable = [];\n    for(var j=0;j<row;j++){\n        rows = [];\n        for(var i=0;i<col;i++){\n            rows.push(-1);\n        }\n        mapTable.push(rows);\n    }\n    for(var j=0;j<row;j++){\n        rows = [];\n        for(var i=0;i<col;i++){\n            rows.push(-1);\n        }\n        mapOnTable.push(rows);\n    }\n    /*for(var i=0;i<col;i++){\n        mapTable[i]=[];\n    }*/\n    initMap();\n}\n\\initMap(){\n    if(!mapData) return;\n    for(var i=0;i<row;i++){\n        for(var j=0;j<col;j++){\n            set(j,i,mapData[i][j]);\n        }\n    }\n    if(!mapOnData) return;\n    for(var i=0;i<row;i++){\n        for(var j=0;j<col;j++){\n            setOn(j,i,mapOnData[i][j]);\n        }\n    }\n}\n\\load(dataFile){\n    baseData=file("../maps/").rel(dataFile).obj();\n    if(!baseData) baseData=file(dataFile).obj();\n    mapTable=baseData[0];\n    mapData=mapTable;\n    row=mapTable.length;\n    col=mapTable[0].length;\n    mapOnTable=baseData[1];\n    mapOnData=mapOnTable;\n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    initMap();\n}\n\\set(setCol,setRow,p){\n    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n    mapTable[setRow][setCol]=p;\n    //mapOnTable[setRow][setCol]=-1;\n    ctx=buf[0].getContext("2d");\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) {\n        ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n        return;\n    }\n    ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n    ctx.save();\n    ctx.drawImage(\n    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n    ctx.restore();\n}\n\\setOn(setCol,setRow,p){\n    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n    set(setCol,setRow,mapTable[setRow][setCol]);\n    mapOnTable[setRow][setCol]=p;\n    ctx=buf[0].getContext("2d");\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    ctx.save();\n    ctx.drawImage(\n    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n    ctx.restore();\n}\n\\setOnAt(setX,setY,p){\n    setOn(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n}\n\\setAt(setX,setY,p){\n    set(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n}\n\\get(getCol,getRow){\n    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapTable[getRow][getCol];\n    return -1;\n}\n\\getAt(getX,getY){\n    return get(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n}\n\\getOn(getCol,getRow){\n    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapOnTable[getRow][getCol];\n    return -1;\n}\n\\getOnAt(getX,getY){\n    return getOn(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n}\n\\scrollTo(scrollX,scrollY){\n    sx=-scrollX;\n    sy=-scrollY;\n}\n\\draw(ctx) {\n    pImg=buf[0];\n    ctx.save();\n    ctx.drawImage(\n    pImg, 0, 0,col*chipWidth, row*chipHeight,\n    sx, sy, col*chipWidth, row*chipHeight);\n    ctx.restore();\n}\n',
      'MapEditor.tonyu': 'extends Actor;\nnative prompt;\nloadMode=false;\nprint("Load Data?: Y or N");\nwhile(true){\n    if(getkey("y")>0){\n        loadMode=true;\n        break;\n    }\n    if(getkey("n")>0){\n        loadMode=false;\n        break;\n    }\n    update();\n}\nif(loadMode){\n    fileName=prompt("Input json file (*.json)","map.json");\n    if(fileName){\n        mapDataFile=file("../maps/").rel(fileName);\n    }\n    if(mapDataFile.obj()){\n        baseData=mapDataFile.obj();\n    }else{\n        mapDataFile=file(fileName);\n        if(mapDataFile.obj()){\n            baseData=mapDataFile.obj();\n        }\n    }\n    if(baseData==undefined){\n        print("Load failed");\n        loadMode=false;\n    }else if(baseData[0] && baseData[1]){\n        mapData=baseData[0];\n        mapOnData=baseData[1];\n    }\n}\nupdate();\n//if(mapData){\n    /*\n    print("Load Data?: Y or N");\n    while(true){\n        if(getkey("y")==1){\n            loadMode=true;\n            break;\n        }\n        if(getkey("n")==1){\n            loadMode=false;\n            break;\n        }\n    }*/\n//}\nif(!loadMode){\n    row=prompt("input row");\n    update();\n    col=prompt("input col");\n    panel=new Panel{width:col*32,height:row*32};\n    panel.x=panel.width/2+10;\n    panel.y=panel.height/2;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n    $map=new Map{row,col,chipWidth:32,chipHeight:32};\n}else{\n    if(!mapOnData){\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData};\n    }else{\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData,mapOnData};\n    }\n    panel=new Panel{width:$map.col*32,height:$map.row*32,zOrder:100};\n    panel.x=panel.width/2;\n    panel.y=panel.height/2;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n}\n$mp=new Map{row:16,col:8,chipWidth:32,chipHeight:32};\ncounter=0;\nfor(var i=0;i<16;i++){\n    for(var j=0;j<8;j++){\n        $mp.set(j,i,$pat_mapchip+counter);\n        counter++;\n    }\n}\nmode="get";\nprevMode="set";\nmapp=0;\nmx=0;\nmy=0;\nchipX=0;\nchipY=0;\nx=$screenWidth-16;\ny=$screenHeight-16;\nwhile(true){\n    p=mapp;\n    if(getkey("e")==1){\n        $mp.scrollTo(1000,1000);\n        mode="erase";\n        print(mode+" mode");\n    }\n    if(getkey("s")==1){\n        $mp.scrollTo(1000,1000);\n        if(mode=="set"){\n            mode="setOn";\n        }else{\n            mode="set";\n        }\n        print(mode+" mode");\n    }\n    if(getkey("o")==1){\n        $mp.scrollTo(1000,1000);\n        mode="setOn";\n    }\n    if(getkey("g")==1){\n        if(mode!="get"){\n            prevMode=mode;\n            $mp.scrollTo(0,0);\n            mode="get";\n            chipX=0;\n            chipY=0;\n        }else{\n            $mp.scrollTo(1000,1000);\n            mode=prevMode;\n        }\n        print(mode+" mode");\n    }\n    if(getkey("p")==1){\n        //add\n        saveFileName=prompt("input json file(*.json)","map.json");\n        /*print("mapTable=[");\n        data="[";\n        for(var i=0;i<$map.row-1;i++){\n            var tmp=[];\n            tmp=$map.mapTable[i].concat(tmp);\n            print("["+tmp+"],");\n            data+="["+tmp+"],";\n        }\n        var tmp=[];\n        tmp=$map.mapTable[i].concat(tmp);\n        print("["+tmp+"]");\n        data+="["+tmp+"]";\n        print("];");\n        data+="]";*/\n        //add\n        saveDataFile=file("../maps/").rel(saveFileName);\n        data=[$map.mapTable,$map.mapOnTable];\n        //comment\n        //mapDataFile.obj(data);\n        //add\n        saveDataFile.obj(data);\n        print(saveFileName+" Saved");\n        //mapDataFile.obj.push($map.mapOnTable);\n    }\n    if(getkey("c")==1){\n        $mp.scrollTo(1000,1000);\n        mode="spuit";\n        print(mode+" mode");\n    }\n    if(mode!="get"){\n        if(getkey("left")>0) mx=mx+8;\n        if(getkey("right")>0) mx=mx-8;\n        if(getkey("up")>0) my=my+8;\n        if(getkey("down")>0) my=my-8;\n        $map.scrollTo(mx,my);\n    }else{\n        if(getkey("left")>0) chipX=chipX+8;\n        if(getkey("right")>0) chipX=chipX-8;\n        if(getkey("up")>0) chipY=chipY+8;\n        if(getkey("down")>0) chipY=chipY-8;\n        $mp.scrollTo(chipX,chipY);\n    }\n    panel.x=panel.width/2-mx;\n    panel.y=panel.height/2-my;\n    if(mode=="set" && getkey(1)>0){\n        $map.setAt($mouseX+mx,$mouseY+my,mapp);\n        $map.setOnAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="erase" && getkey(1)>0){\n        $map.setAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="get" && getkey(1)>0){\n        mapp=$mp.getAt($mouseX+chipX,$mouseY+chipY);\n        mode=prevMode;\n        $mp.scrollTo(1000,1000);\n        print(mode+" mode");\n        updateEx(10);\n    }else if(mode=="setOn" && getkey(1)>0){\n        $map.setOnAt($mouseX+mx,$mouseY+my,mapp);\n    }else if(mode=="spuit" && getkey(1)>0){\n        mapp=$map.getAt($mouseX+mx,$mouseY+my);\n        mode="set";\n        print(mode+" mode");\n        updateEx(10);\n    }\n    update();\n}',
      'MathMod.tonyu': 'extends null;\nnative Math;\n\nnowait \\sin(d) {\n    return Math.sin(rad(d));\n}\nnowait \\cos(d) {\n    return Math.cos(rad(d));\n}\nnowait \\rad(d) {\n    return d/180*Math.PI;\n}\nnowait \\deg(d) {\n    return d/Math.PI*180;\n}\n\nnowait \\abs(v) {\n    return Math.abs(v);\n}\nnowait \\atan2(x,y) {\n    return deg(Math.atan2(x,y));\n}\nnowait \\floor(x) {\n    return Math.floor(x);\n}\nnowait \\angleDiff(a,b) {\n    var c;\n    a=floor(a);\n    b=floor(b);\n    if (a>=b) {\n        c=(a-b) % 360;\n        if (c>=180) c-=360;\n    } else {\n        c=-((b-a) % 360);\n        if (c<-180) c+=360;\n    }\n    return c;\n}\nnowait \\sqrt(t) {\n    return Math.sqrt(t);\n}\nnowait \\dist(dx,dy) {\n    if (typeof dx=="object") {\n        var t=dx;\n        dx=t.x-x;dy=t.y-y;\n    }\n    return sqrt(dx*dx+dy*dy);\n}\nnowait \\trunc(f) {\n    if(f>=0) return Math.floor(f);\n    else return Math.ceil(f);\n}\nnowait \\ceil(f){\n    return Math.ceil(f);\n}\n\nnowait \\rnd(r) {\n    if (typeof r=="number") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}',
      'MediaPlayer.tonyu': '\n\\play() {\n    \n}\n\\stop() {\n    \n}\n\\playSE() {\n    \n}\n\\setDelay(){\n    \n}\n\\setVolume(){\n    \n}',
      'NoviceActor.tonyu': 'extends BaseActor;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n        $Sprites.add(this);\n    }\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite._fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\nnowait \\draw(ctx) {\n    _sprite.draw(ctx);\n}\n\\getCrashRect() {\n    return _sprite.getCrashRect();\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}',
      'Pad.tonyu': 'extends Actor;\n\\new(opt) {\n    super(opt);\n    padImageP = $pat_inputPad;\n    jujiKey = new Actor{x:96+1, y:$screenHeight-96-1, p:padImageP+0,zOrder:-9,layer:$FrontSprites};\n    no1Key = new Actor{x:$screenWidth-96, y:$screenHeight-96, p:padImageP+1,zOrder:-9,layer:$FrontSprites};\n    jujiKey.show();\n    no1Key.show();\n    \n    jujiKeyPushU = new Actor{x:jujiKey.x, y:jujiKey.y-60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushL = new Actor{x:jujiKey.x-60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushR = new Actor{x:jujiKey.x+60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushD = new Actor{x:jujiKey.x, y:jujiKey.y+60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPush1 = new Actor{x:no1Key.x, y:no1Key.y, p:padImageP+2, scaleX:2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushU.hide();\n    jujiKeyPushL.hide();\n    jujiKeyPushR.hide();\n    jujiKeyPushD.hide();\n    jujiKeyPush1.hide();\n}\n\\die(){\n    jujiKey.die();\n    no1Key.die();\n    jujiKeyPushU.die();\n    jujiKeyPushL.die();\n    jujiKeyPushR.die();\n    jujiKeyPushD.die();\n    jujiKeyPush1.die();\n    super.die();\n}\nAPAD_DIAG_SIZE = 96;\n\\padUpdate() {\n    // 操作 //\n    keyPushL = 0;\n    keyPushR = 0;\n    keyPushU = 0;\n    keyPushD = 0;\n    keyPush1 = 0;\n    \n    padKeyNotapCnt ++;\n    for (var i=0; i<5; i++) { // タップ判定・マウス判定 //\n        var t = $touches[i];\n        if (t.touched) {\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32-64, 64+APAD_DIAG_SIZE, 64)) keyPushU = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32+64, 64+APAD_DIAG_SIZE, 64)) keyPushD = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushL = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32+64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushR = 1;\n            if (isOnRectWH(t.x, t.y, no1Key.x-64, no1Key.y-64, 128, 128)) keyPush1 = 1;\n            padKeySW = 1;\n            padKeyNotapCnt = 0;\n        }\n    }\n    \n    // カウントアップ\n    if (keyPushL) keyCntL ++; else keyCntL = 0;\n    if (keyPushR) keyCntR ++; else keyCntR = 0;\n    if (keyPushU) keyCntU ++; else keyCntU = 0;\n    if (keyPushD) keyCntD ++; else keyCntD = 0;\n    if (keyPush1) keyCnt1 ++; else keyCnt1 = 0;\n    \n    // 表示\n    if (keyPushL) jujiKeyPushL.show(); else jujiKeyPushL.hide();\n    if (keyPushR) jujiKeyPushR.show(); else jujiKeyPushR.hide();\n    if (keyPushU) jujiKeyPushU.show(); else jujiKeyPushU.hide();\n    if (keyPushD) jujiKeyPushD.show(); else jujiKeyPushD.hide();\n    if (keyPush1) jujiKeyPush1.show(); else jujiKeyPush1.hide();\n    \n}\n\n\\getPadUp()    { return keyCntU; }\n\\getPadDown()  { return keyCntD; }\n\\getPadLeft()  { return keyCntL; }\n\\getPadRight() { return keyCntR; }\n\\getPadButton(i) {\n    var value;\n    if (i == 0) value = keyCnt1;\n    return value;\n}\n\n\\getUp()    { return keyCntU; }\n\\getDown()  { return keyCntD; }\n\\getLeft()  { return keyCntL; }\n\\getRight() { return keyCntR; }\n\\getButton(i) {\n    var value;\n    if (i == 0) value = keyCnt1;\n    return value;\n}\n\n// 範囲 //\n\\isOnRect(mx, my, rx, ry, rx2, ry2) {\n    return (rx <= mx && mx < rx2 && ry <= my && my < ry2);\n}\n\n// 範囲 //\n\\isOnRectWH(mx, my, rx, ry, rw, rh) {\n    return (rx <= mx && mx < rx+rw && ry <= my && my < ry+rh);\n}\n\nwhile(true) {\n    padUpdate();\n    update();\n}',
      'Panel.tonyu': 'extends Actor;\nnative $;\nnative Math;\nnative isNaN;\n\\new(opt){\n    super(opt);\n    this.width=width;\n    this.height=height;\n    if(align==null) align="center";\n    if(alpha==null) alpha=255;\n    if(_drawn==null) _drawn=false;\n    buf=$("<canvas>").attr{width,height};\n}\n\\setPanel(width,height){\n    this.width=width;\n    this.height=height;\n    buf=$("<canvas>").attr{width,height};\n}\n\\resize(width,height){\n    setPanel(width,height);\n}\n\\getContext(){\n    _drawn=true;\n    return buf[0].getContext("2d");\n}\n\\setFillStyle(color){\n    this.fillStyle=color;\n}\n\\fillRect(x,y,rectWidth,rectHeight){\n    ctx=getContext();\n    ctx.save();\n    //ctx.clearRect(0,0,this.width,this.height);\n    ctx.fillStyle=fillStyle;\n    ctx.fillRect(x,y,rectWidth,rectHeight);\n    ctx.restore();\n}\n\\fillText(text,x,y,size,align){\n    ctx=getContext();\n    ctx.save();\n    //ctx.clearRect(0,0,this.width,this.height);\n    ctx.textAlign = align;\n    ctx.fillStyle=fillStyle;\n    ctx.font=size+"px \'Courier New\'";\n    ctx.fillText(text,x,y);\n    ctx.restore();\n}\n\\clearRect(clearX,clearY,clearW,clearH){\n    ctx=getContext();\n    ctx.save();\n    ctx.clearRect(clearX,clearY,clearW,clearH);\n    ctx.restore();\n}\n\\getPixel(getX,getY){\n    if(typeof getX=="number" && !isNaN(getX) && \n    typeof getY=="number" && !isNaN(getY)){\n        ctx=getContext();\n        imagedata=ctx.getImageData(getX,getY,1,1);\n        colordata=[imagedata.data[0],imagedata.data[1],imagedata.data[2],imagedata.data[3]];\n        //print(imagedata.data);\n    }else{\n        colordata=[0,0,0,0];\n    }\n    return(colordata);\n}\n\\scroll(scrollX,scrollY){\n    ctx=getContext();\n    ctx.save();\n    imagedata=ctx.getImageData(0,0,this.width,this.height);\n    clearRect(0,0,width,height);\n    ctx.putImageData(imagedata,-scrollX,-scrollY);\n    ctx.restore();\n}\n\\draw(ctx){\n    if(_drawn){\n        pImg=buf[0];\n        ctx.save();\n        if(align=="left"){\n            ctx.translate(x+width/2,y+height/2);\n        }else if(align=="center"){\n            ctx.translate(x,y);\n        }else if(align=="right"){\n            ctx.translate(x-width/2,y-height/2);\n        }\n        if(this.rotation!=0){\n            ctx.rotate(this.rotation/180*Math.PI);\n        }else{\n            ctx.rotate(this.rotate/180*Math.PI);\n        }\n        ctx.globalAlpha=this.alpha/255;\n        ctx.drawImage(\n        pImg, 0, 0,width,height,\n        -width/2, -height/2, width ,height);\n        ctx.restore();\n    }\n}',
      'ParallelMod.tonyu': 'native Tonyu;\nnowait \\parallel() {\n     var args=[];\n     for (var i=1; i<arguments.length; i++) {\n         args.push(arguments[i]);\n     }\n     var name=arguments[0];          \n     var thg=$currentThreadGroup;\n     var th;\n     if (thg) th=thg.addObj(this, name, args);\n     on("die") \\{th.kill();};\n     return th;\n}\n\n',
      'PlainChar.tonyu': 'extends Actor;\n\nnative Tonyu;\nnative Math;\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this,"tMain");\n        initSprite();\n    }\n    if (typeof x=="object") Tonyu.extend(this,x); \n    else if (typeof x=="number") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n}\n\\draw(c) {\n    onDraw();\n    if (_isInvisible) return;\n    super.draw(c);\n}\n\\setVisible(v) {\n    _isInvisible=!v;\n}\n\\onDraw() {\n    \n}\n\\update() {\n    onUpdate();\n    super.update();\n}\n\\onUpdate() {\n    \n}\n\\initSprite() {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    onAppear();\n}\n\\tMain() {\n    main();\n    die();\n}\n\\color(r,g,b) {\n    return "rgb("+[r,g,b].join(",")+")";\n}\n\\drawText(x,y,text,col,size) {\n    if ($debug) return;\n    if (!size) size=15;\n    if (!col) col="cyan";\n    var tp=all(T1Text).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n    }else {\n        new T1Text{x,y,text,fillStyle:col, size};  \n    }\n}\n\\drawLine(x,y,tx,ty,col) {\n    if (!col) col="white";\n    var tp=all(T1Line).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,tx,ty,col};\n    }else {\n        new T1Line{x,y,tx,ty,col};  \n    }\n}\n\\appear(t) {\n    return t;\n}\n\\trunc(f) {\n    return Math.trunc(f);\n}\n\\loadPage(page,arg){\n    all().die();\n    new page(arg);\n    die();\n}',
      'PlayMod.tonyu': 'extends BaseActor;\nnowait \\initMML() {\n    if (mmlInited) return;\n    mmlInited=true;\n    $currentProject.requestPlugin("timbre");\n    if (!$MMLS) {\n       $MMLS={};\n       $WaveTable=new WaveTable;\n       $Boot.on("stop", releaseMML);\n    }\n    on("die") \\() { play().stop(); };\n}\nnowait \\releaseMML() {\n    if ($MMLS) {\n       for (var k,v in $MMLS) {\n          v.stop();\n       }\n       $MMLS=null;\n    } \n    if ($WaveTable) {\n       $WaveTable.stop();\n       $WaveTable=null;\n    }\n}\n\\play() {\n    initMML();\n    if (!_mml) _mml=new MML;\n    if (isDead() || arguments.length==0) return _mml;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    _mml.play(mmls);\n    while (_mml.bufferCount()>2) {\n        update();\n    }\n    return _mml;\n}\nnowait \\playSE() {\n    initMML();\n    var mml=new MML;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    mml.play(mmls);\n    return mml;\n}\n',
      'ScaledCanvas.tonyu': 'extends Actor;\nnative $;\nnative Math;\n\n// canvas:phisical  buf: logical\n\\new (opt) {\n    extend(opt);\n    // canvas/ width,height\n    resize(width, height);\n    cw=canvas.width();\n    ch=canvas.height();\n    cctx=canvas[0].getContext("2d");\n    this.color="rgb(20,80,180)";\n    sx=0;\n    sy=0;\n    isDrawGrid=$Sprites.isDrawGrid;\n}\n\\resize(width,height) {\n    this.width=width;\n    this.height=height;\n    buf=$("<canvas>").attr{width,height};\n    ctx=buf[0].getContext("2d");  \n    $screenWidth=width;\n    $screenHeight=height;\n    if($panel){\n        $panel.setPanel($screenWidth,$screenHeight);\n    }\n}\n\\shouldDraw1x1(srcw,srch,dstw,dsth) {\n    // srcw=465 -> dstw=460...665\n    var larger=200;\n    var smaller=5;\n    return srcw-smaller<=dstw && dstw<=srcw+larger &&\n    srch-smaller<=dsth && dsth<=srch+larger;\n}\n\\draw() {\n    cw=canvas.width();\n    ch=canvas.height();\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    cctx.clearRect(0,0,cw,ch);\n    if (shouldDraw1x1(width,height,calcw,calch)) {\n        calcw=width;calch=height;\n    }\n    var marginw=Math.floor((cw-calcw)/2);\n    var marginh=Math.floor((ch-calch)/2);\n    cctx.drawImage(buf[0],\n    0,0,width, height, \n    marginw,marginh,calcw, calch );\n}\n\\canvas2buf(point) {\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    if (shouldDraw1x1(width,height,calcw,calch)) {\n        calcw=width;calch=height;\n    }\n    var marginw=Math.floor((cw-calcw)/2);\n    var marginh=Math.floor((ch-calch)/2);\n    \n    return {x: (point.x-marginw)/calcw*width, \n    y: (point.y-marginh)/calch*height};\n}\n\\setBGColor(color){\n    this.color=color;\n}\n\\fillCanvas(cv){\n    var ctx=cv.getContext("2d");\n    ctx.save();\n    ctx.fillStyle=$Screen.color;\n    ctx.fillStyle=color;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    ctx.restore();\n}\n\\scrollTo(scrollX,scrollY){\n    /*for(o in all()){\n        //print(o.mapObj);\n        if(o.mapObj){\n            o.scrollTo(o.sx+scrollX,o.sy+scrollY);\n        }else if(o.x!=undefined && o.y!=undefined){\n            o.x+=scrollX;\n            o.y+=scrollY;\n        }\n    }*/\n    //sx=scrollX;\n    //sy=scrollY;\n    $Sprites.scrollTo(scrollX,scrollY);\n}',
      'SecretChar.tonyu': 'extends PlainChar;\n\n\\draw(c) {\n    \n}',
      'SpriteChar.tonyu': 'extends PlainChar;\n\n\\new(x,y,p,f) {\n    super(x,y,p);\n    this.f=f;\n    if (!this.x) this.x=0;\n    if (!this.y) this.y=0;\n    if (!this.p) this.p=0;\n}\n\\draw(c) {\n    if (f) {\n        if (!scaleY) scaleY=scaleX;\n        scaleX*=-1;\n    }\n    super.draw(c);\n    if (f) scaleX*=-1;\n}',
      'Sprites.tonyu': 'extends Actor;\nnative Tonyu;\n\\new() {\n    sprites=[];\n    imageList=[];\n    hitWatchers=[];\n    isDrawGrid=Tonyu.noviceMode;\n    sx=0;\n    sy=0;\n    objId=0;\n}\nfunction add(s) {\n    if (s.__addedToSprites) return;\n    sprites.push(s);\n    if(s.__genId==null){\n        s.__genId=objId;\n        objId++;\n    }\n    s.__addedToSprites=this;\n    return s;\n}\nfunction remove(s) {\n    var idx=sprites.indexOf(s);\n    if (idx<0) return;\n    sprites.splice(idx,1);\n    delete s.__addedToSprites;\n}\nfunction clear() {sprites.splice(0,sprites.length);}\nfunction compOrder(obj1, obj2){\n    var val1=obj1.zOrder;\n    var val2=obj2.zOrder;\n    if(val1>val2){\n        return -1;\n    }else if(val1<val2){\n        return 1;\n    }else if(val1==val2){\n        if(obj1.__genId>obj2.__genId){\n            return 1;\n        }else{\n            return -1;\n        }\n        return 0;\n    }\n}\nfunction draw(cv) {\n    var ctx=cv.getContext("2d");\n    ctx.save();\n    /*\n    ctx.fillStyle=$Screen.color;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    */\n    var orderArray=[];\n    orderArray=orderArray.concat(sprites);\n    orderArray.sort(compOrder);\n    ctx.translate(-sx,-sy);\n    orderArray.forEach(\\(s){\n        s.draw(ctx);\n    });\n    ctx.restore();\n}\nfunction checkHit() {\n    hitWatchers.forEach(function (w) {\n        sprites.forEach(function (a) {\n            //console.log("a:",  a.owner);\n            var a_owner=a;//a.owner|| a;\n            if (! (a_owner instanceof w.A)) return;\n            sprites.forEach(function (b) {\n                var b_owner=b;//b.owner|| b;\n                if (a===b) return;\n                if (! (b_owner instanceof w.B)) return;\n                //console.log("b:",  b.owner);\n                if (a.crashTo1(b)) {\n                    //console.log("hit", a.owner, b.owner);\n                    w.h(a_owner,b_owner);\n                }\n            });\n        });\n    });\n}\nfunction watchHit(typeA, typeB, onHit) {\n    var p={A: typeA, B:typeB, h:onHit};\n    //console.log(p);\n    hitWatchers.push(p);\n}\nfunction drawGrid(c) {\n    var ctx=c.getContext("2d");\n    ctx.textBaseline="top";\n    ctx.save();\n    ctx.strokeStyle="rgb(40,100,200)";\n    for (var i=0 ; i<c.width ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(i,0);\n        ctx.lineTo(i,c.height);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    \n    for (var i=0 ; i<c.height ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(0,i);\n        ctx.lineTo(c.width,i);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    ctx.fillStyle="white";\n    ctx.font="15px monospaced";\n    for (var i=100 ; i<c.width ; i+=100) {\n        ctx.fillText(i, i,0);\n    }\n    for (var i=100 ; i<c.height ; i+=100) {\n        ctx.fillText(i, 0,i);\n    }\n    ctx.restore();\n}\nfunction setImageList(il) {\n    imageList=il;\n}\nfunction getImageList() {\n    return imageList;\n}\nfunction scrollTo(scrollX,scrollY){\n    sx=scrollX;\n    sy=scrollY;\n}',
      'T1Line.tonyu': 'extends Actor;\n\\draw(ctx) {\n    if (hidden) return;\n    \n    ctx.strokeStyle=col;\n    ctx.beginPath();\n    ctx.moveTo(x,y);\n    ctx.lineTo(tx,ty);\n    ctx.stroke();\n    hidden=true;\n}\n',
      'T1Map.tonyu': 'extends Map;\nnative Tonyu;\nnative $;\n\n\\setBGColor(c) {\n    $Screen.setBGColor(c);\n}\n\\load(fileName) {\n    /*\n    o={\n        "chipWidth":"32","chipHeight":"32",\n        "pTable":[{name:"$pat_aaa", p:10}, {name:"$pat_bbb","p":25} ],\n        "baseData":[\n        [//map\n        [0,6],[0,5],[1,3],\n        [1,3],[1,2],[0,5]\n        ],\n        [//mapOn\n        [-1,-1],[1,4],[0,2],\n        [-1,-1],[-1,-1],[1,8]\n        ]\n        ]\n    }\n    */\n    var f=file("../maps/").rel(fileName);\n    var o=f.obj();\n    chipWidth=o.chipWidth;\n    chipHeight=o.chipHeight;\n    baseData=o.baseData;\n    mapTable=conv(baseData[0],o.pTable);\n    mapData=mapTable;\n    row=mapTable.length;\n    col=mapTable[0].length;\n    mapOnTable=conv(baseData[1],o.pTable);\n    mapOnData=mapOnTable;\n    \n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    initMap();   \n}\n\\conv(mat, tbl) {\n    var res=[];\n    mat.forEach \\(row) {\n        var rrow=[];\n        res.push(rrow);\n        row.forEach \\(dat) {// dat:[0,20]\n            var t=tbl[dat[0]];\n            if (t) rrow.push(Tonyu.globals[t.name]+dat[1]);\n            else rrow.push(dat[1]);\n        };\n    };\n    return res;\n}',
      'T1Page.tonyu': 'extends PlainChar;\n\n\\initGlobals() {\n    $chars=$Sprites.sprites;\n    $Boot.setFrameRate(60);\n    $clBlack=color(0,0,0);\n    $clRed=color(255,0,0);\n    $clGreen=color(0,255,0);\n    $clYellow=color(255,255,0);\n    $clBlue=color(0,0,255);\n    $clPink=color(255,0,255);\n    $clAqua=color(0,255,255);\n    $clWhite=color(255,255,255);\n    $mplayer=new MediaPlayer;\n}',
      'T1Text.tonyu': 'extends Actor;\n\\draw(c) {\n    if (hidden) return;\n    c.font=size+"px \'ＭＳ Ｐゴシック\'";\n    \n    super.draw(c);\n    hidden=true;\n}\n',
      'T2Body.tonyu': 'extends BodyActor;\n',
      'T2Mod.tonyu': 'native Box2D;\n\n\\bvec(tx,ty) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    return new b2Vec2(tx/scale,ty/scale);  \n}',
      'T2World.tonyu': 'extends Actor;\n\nincludes T2Mod;\n\nnative Box2D;\nnative Tonyu;\n\\onAppear() {\n    $currentProject.requestPlugin("box2d");  \n    initWorld();\n}\nloop();\n\n\n\\initWorld() {\n    gravity=gravity || 9.8;\n    gravityX=gravityX || 0;\n    var b2World = Box2D.Dynamics.b2World;\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    scale=scale || 32;\n    world = new b2World(\n    new b2Vec2(gravityX, gravity)    //gravity\n    ,  true                 //allow sleep\n    );\n    $t2World=this;\n    $Boot.on("stop",releaseWorld);\n    on("die",releaseWorld);\n}\n\\releaseWorld() {\n    if ($t2World===this) $t2World=null;\n}\n\n\\loop() {\n    while(true) {\n        world.Step(\n        1 / $Boot.getFrameRate()  //frame-rate\n        ,  10       //velocity iterations\n        ,  10       //position iterations\n        );\n        world.DrawDebugData();\n        world.ClearForces();\n        updatePos();\n        update();\n    }\n}\n\\updatePos() {\n    for (var b=world.GetBodyList();b;b=b.GetNext()) {\n        var d=b.GetUserData();\n        if(d) d.updatePos();\n    }\n}\n',
      'TObject.tonyu': 'extends null;\nnative Tonyu;\n\\new (options) {\n    if (typeof options=="object") extend(options);\n    this.main();\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}',
      'TQuery.tonyu': 'extends TObject;\nincludes MathMod;\n\\new () {\n    length=0;\n}\n\\tonyuIterator(arity) {\n    var res={};\n    res.i=0;\n    if (arity==1) {\n        res.next=function () {\n            if (res.i>=this.length) return false;\n            res[0]=this[res.i];\n            res.i++;\n            return true;\n        };\n    } else {\n        res.next=function () {\n            if (res.i>=this.length) return false;\n            res[0]=res.i;\n            res[1]=this[res.i];\n            res.i++;\n            return true;\n        };\n    }\n    return res;\n}\n\\attr() {\n    var values;\n    if (length==0) return;\n    if (arguments.length==1 && typeof arguments[0]=="string") {\n        return this[0][arguments[0]];\n    }\n    if (arguments.length>=2) {\n        values={};\n        for (var i=0 ; i<arguments.length-1 ;i+=2) {\n            values[arguments[i]]=arguments[i+1];\n        }\n    } else {\n        values=arguments[0];\n    }\n    if (values) {\n        for (var e in this) {\n            e.extend( values);\n        }\n    }\n}\n\\genKeyfunc(key) {\n    if (typeof key!="function") {\n        return \\(o) {return o[key];};\n    } else {\n        return key;\n    }\n}\n\\maxs(key) {\n    var f=genKeyfunc(key);\n    var res,reso=new TQuery;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v>=res) {\n            if (v>res) reso=new TQuery;\n            reso.push(o);\n            res=v;\n        }\n    }\n    return reso;\n}\n\\mins(key) {\n    var f=genKeyfunc(key);\n    var res,reso=new TQuery;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v<=res) {\n            if (v<res) reso=new TQuery;\n            reso.push(o);\n            res=v;\n        }\n    }\n    return reso;\n}\n\\minObj(key) {\n    return mins(key)[0];\n}\n\\maxObj(key) {\n    return maxs(key)[0];\n}\n\\nearests(x,y) {\n    if (typeof x=="object") {y=x.y;x=x.x;}\n    return mins \\(o) {\n        return dist(o.x-x,o.y-y);\n    };\n}\n\\nearest(x,y) {\n    return nearests(x,y)[0];\n}\n\\withins(xo,yd,d) {\n    var x,y;\n    if (typeof xo=="object") {\n        x=xo.x;y=xo.y;d=yd;\n    } else {\n        x=xo;y=yd;\n    }\n    return find \\(o) {\n        return dist(o.x-x,o.y-y)<=d;\n    };\n}\n\\within(xo,yd,d) {\n    return withins(xo,yd,d).nearest();\n}\n\n\\max(key) {\n    var f=genKeyfunc(key);\n    var res;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v>res) res=v;\n    }\n    return res;\n}\n\\min(key) {\n    var f=genKeyfunc(key);\n    var res;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v<res) res=v;\n    }\n    return res;\n}\n\\push(e) {\n    this[length]=e;\n    length++;\n}\n\\size() {return length;}\n\\find(f) {\n    var no=new TQuery;\n    for (var o in this) {\n        if (f(o)) no.push(o);\n    }\n    return no;\n} \n\\apply(name, args) {\n    var res;\n    if (!args) args=[];\n    for (var o in this) {\n        var f=o[name];\n        if (typeof f=="function") {\n            res=f.apply(o, args);\n        }\n    }\n    return res;\n}\n// \\alive => find \\(o) => !o.isDead()  //  (in future)\n\\alive() {\n    return find \\(o) {\n        return !o.isDead();\n    };\n}\n\\die() {\n    var a=alive();\n    if (a.length==0) return false;\n    a.apply("die");\n    return true;\n}\n\n\\klass(k) {\n    return find \\(o) { return o instanceof k; };\n}',
      'TextChar.tonyu': 'extends PlainChar;\nnative TextRect;\n\n\\new (xx,yy,t,c,s){\n    super(xx,yy);\n    text="";\n    col=$clWhite;\n    size=20;\n    if (!this.x) this.x=0;\n    if (!this.y) this.y=0;\n    if (t) text=t;\n    if (c) fillStyle=c;\n    if (s) size=s;\n}\n\\draw(ctx) {\n    if (!size) size=15;\n    if (!align) align="left";\n    if (!fillStyle) fillStyle="white";\n    ctx.fillStyle=fillStyle;\n    ctx.globalAlpha=this.alpha/255;\n    ctx.font=size+"px \'ＭＳ Ｐゴシック\'";\n    var rect=TextRect.draw(ctx, text, x, y, size, align , "fill");\n    width=rect.w;\n    height=rect.h;\n    \n    //    fillStyle=col;\n    //super.draw(ctx);\n}',
      'TextRectMod.tonyu': 'extends null;\n\nnowait function drawTextRect(ctx, text, x, topY, h, align , type) {\n    if (!align) align="center";\n    ctx.textBaseline="top";\n    setFontSize(ctx, h);\n    var met=ctx.measureText(text);\n    var res={y:topY, w: met.width, h:h};\n    var t=align.substring(0,1).toLowerCase();\n    if (t=="l") res.x=x;\n    else if (t=="r") res.x=x-met.width;\n    else if (t=="c") res.x=x-met.width/2;\n    if (type=="fill") ctx.fillText(text, res.x,topY);\n    if (type=="stroke") ctx.strokeText(text, res.x,topY);\n    return res;\n}\nnowait function setFontSize(ctx,sz) {\n    var post=ctx.font.replace(/^[0-9\\.]+/,"");\n    ctx.font=sz+post;\n}\n\nnowait function fukidashi(ctx, text, x, y, sz) {\n    var align="c";\n    var theight=20;\n    var margin=5;\n    var r=drawTextRect(ctx, text, x,y-theight-margin-sz, sz, align);\n    ctx.beginPath();\n    ctx.moveTo(x , y);\n    ctx.lineTo(x+margin , y-theight);\n    ctx.lineTo(x+r.w/2+margin , y-theight);\n    ctx.lineTo(x+r.w/2+margin , y-theight-r.h-margin*2);\n    ctx.lineTo(x-r.w/2-margin , y-theight-r.h-margin*2);\n    ctx.lineTo(x-r.w/2-margin , y-theight);\n    ctx.lineTo(x-margin , y-theight);\n    ctx.closePath();\n    ctx.fill();\n    ctx.stroke();\n    \n    var fs=ctx.fillStyle;\n    ctx.fillStyle=ctx.strokeStyle;\n    drawTextRect(ctx, text, x, y-theight-margin-sz, sz, align, "fill");\n    ctx.fillStyle=fs;\n}\n\n',
      'WaveTable.tonyu': 'extends TObject;\nnative T;\n\nwav={};\nenv={};\n\\setWav(num, synth) {\n    wav[num]=synth;\n}\n\\setEnv(num, synth) {\n    env[num]=synth;\n}\n\\get(w,e) {\n    var synth=T("OscGen") {osc:wav[w], env:env[e], mul:0.25};\n    return synth;\n}\n\\stop() {\n    /*for (var k,v in tbl) {\n        v.pause();\n        v.stop();\n    }*/\n}\n\nif (typeof T!=="undefined") {\n    //env=T("adsr", {a:0,d:200,s:0.5,r:10});\n    env = T("env",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\n    setEnv(0, env);\n    setWav(0, T("pulse"));\n    //    synth=T("OscGen") {wave:"pulse", env, mul:0.25};\n    //set(0,synth);    \n}\n',
      'js/': '{"concat.js":{"lastUpdate":1428310204290}}',
      'js/concat.js': 'Tonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.EventMod=Tonyu.klass([],{\n  main :function _trc_func_1000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_1000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getEventHandlers :function _trc_func_1000017_2(type) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=1000048;\n    if (! _this._handlers) {\n      //$LASTPOS=1000064;\n      _this._handlers={};\n    }\n    //$LASTPOS=1000083;\n    if (! _this._handlers[type]) {\n      //$LASTPOS=1000105;\n      _this._handlers[type]=[];\n    }\n    return _this._handlers[type];\n  },\n  fiber$getEventHandlers :function _trc_func_1000017_3(_thread,type) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=1000048;\n    if (! _this._handlers) {\n      //$LASTPOS=1000064;\n      _this._handlers={};\n    }\n    //$LASTPOS=1000083;\n    if (! _this._handlers[type]) {\n      //$LASTPOS=1000105;\n      _this._handlers[type]=[];\n    }\n    _thread.retVal=_this._handlers[type];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  on :function _trc_func_1000158_4(type,handler) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=1000184;\n    _this.getEventHandlers(type).push(handler);\n  },\n  fiber$on :function _trc_func_1000158_5(_thread,type,handler) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=1000184;\n    _this.getEventHandlers(type).push(handler);\n    \n    _thread.retVal=_this;return;\n  },\n  fireEvent :function _trc_func_1000228_6(type,args) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var h;\n    var _it_1;\n    \n    //$LASTPOS=1000257;\n    if (! args) {\n      //$LASTPOS=1000268;\n      args=[];\n    }\n    //$LASTPOS=1000282;\n    _it_1=Tonyu.iterator(_this.getEventHandlers(type),1);\n    while(_it_1.next()) {\n      h=_it_1[0];\n      \n      //$LASTPOS=1000331;\n      h.apply(_this,args);\n      \n    }\n  },\n  fiber$fireEvent :function _trc_func_1000228_7(_thread,type,args) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var h;\n    var _it_1;\n    \n    //$LASTPOS=1000257;\n    if (! args) {\n      //$LASTPOS=1000268;\n      args=[];\n    }\n    //$LASTPOS=1000282;\n    _it_1=Tonyu.iterator(_this.getEventHandlers(type),1);\n    while(_it_1.next()) {\n      h=_it_1[0];\n      \n      //$LASTPOS=1000331;\n      h.apply(_this,args);\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"getEventHandlers":{"nowait":false},"on":{"nowait":false},"fireEvent":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.InputDevice=Tonyu.klass([],{\n  main :function _trc_func_2000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_2000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_2000057_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=2000071;\n    _this.listeners=[];\n    //$LASTPOS=2000090;\n    _this.touchEmu=true;\n  },\n  handleListeners :function _trc_func_2000109_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var l;\n    \n    //$LASTPOS=2000135;\n    l = _this.listeners;\n    //$LASTPOS=2000157;\n    _this.listeners=[];\n    //$LASTPOS=2000176;\n    while (l.length>0) {\n      //$LASTPOS=2000197;\n      (l.shift())();\n      \n    }\n  },\n  fiber$handleListeners :function _trc_func_2000109_4(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var l;\n    \n    //$LASTPOS=2000135;\n    l = _this.listeners;\n    //$LASTPOS=2000157;\n    _this.listeners=[];\n    //$LASTPOS=2000176;\n    while (l.length>0) {\n      //$LASTPOS=2000197;\n      (l.shift())();\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  addOnetimeListener :function _trc_func_2000218_5(l) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=2000247;\n    _this.listeners.push(l);\n  },\n  fiber$addOnetimeListener :function _trc_func_2000218_6(_thread,l) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=2000247;\n    _this.listeners.push(l);\n    \n    _thread.retVal=_this;return;\n  },\n  initCanvasEvents :function _trc_func_2000270_7(cvj) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var cv;\n    var handleMouse;\n    var handleTouch;\n    var handleTouchEnd;\n    var d;\n    \n    //$LASTPOS=2000300;\n    cv = cvj[0];\n    //$LASTPOS=2000320;\n    Tonyu.globals.$handleMouse=function (e) {\n      var p;\n      var mp;\n      \n      //$LASTPOS=2000349;\n      p = cvj.offset();\n      //$LASTPOS=2000378;\n      mp = {x: e.clientX-p.left,y: e.clientY-p.top};\n      //$LASTPOS=2000435;\n      mp=Tonyu.globals.$Screen.canvas2buf(mp);\n      //$LASTPOS=2000471;\n      Tonyu.globals.$mouseX=mp.x;\n      //$LASTPOS=2000494;\n      Tonyu.globals.$mouseY=mp.y;\n      //$LASTPOS=2000517;\n      if (_this.touchEmu) {\n        //$LASTPOS=2000546;\n        Tonyu.globals.$touches[0].x=mp.x;\n        //$LASTPOS=2000579;\n        Tonyu.globals.$touches[0].y=mp.y;\n        \n      }\n      //$LASTPOS=2000619;\n      _this.handleListeners();\n    };\n    //$LASTPOS=2000651;\n    Tonyu.globals.$touches=[{},{},{},{},{}];\n    //$LASTPOS=2000683;\n    Tonyu.globals.$touches.findById=function (id) {\n      var j;\n      \n      //$LASTPOS=2000718;\n      //$LASTPOS=2000723;\n      j = 0;\n      while(j<Tonyu.globals.$touches.length) {\n        {\n          //$LASTPOS=2000773;\n          if (Tonyu.globals.$touches[j].identifier==id) {\n            return Tonyu.globals.$touches[j];\n            \n          }\n        }\n        j++;\n      }\n    };\n    //$LASTPOS=2000883;\n    Tonyu.globals.$handleTouch=function (e) {\n      var p;\n      var ts;\n      var i;\n      var src;\n      var dst;\n      var j;\n      \n      //$LASTPOS=2000912;\n      _this.touchEmu=false;\n      //$LASTPOS=2000937;\n      p = cvj.offset();\n      //$LASTPOS=2000966;\n      e.preventDefault();\n      //$LASTPOS=2000995;\n      ts = e.originalEvent.changedTouches;\n      //$LASTPOS=2001043;\n      //$LASTPOS=2001048;\n      i = 0;\n      while(i<ts.length) {\n        {\n          //$LASTPOS=2001093;\n          src = ts[i];\n          //$LASTPOS=2001121;\n          dst = Tonyu.globals.$touches.findById(src.identifier);\n          //$LASTPOS=2001177;\n          if (! dst) {\n            //$LASTPOS=2001206;\n            //$LASTPOS=2001211;\n            j = 0;\n            while(j<Tonyu.globals.$touches.length) {\n              {\n                //$LASTPOS=2001269;\n                if (! Tonyu.globals.$touches[j].touched) {\n                  //$LASTPOS=2001322;\n                  dst=Tonyu.globals.$touches[j];\n                  //$LASTPOS=2001364;\n                  dst.identifier=src.identifier;\n                  break;\n                  \n                  \n                }\n              }\n              j++;\n            }\n            \n          }\n          //$LASTPOS=2001497;\n          if (dst) {\n            //$LASTPOS=2001525;\n            _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};\n            //$LASTPOS=2001586;\n            _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);\n            //$LASTPOS=2001630;\n            dst.x=_this.mp.x;\n            //$LASTPOS=2001659;\n            dst.y=_this.mp.y;\n            //$LASTPOS=2001688;\n            if (! dst.touched) {\n              //$LASTPOS=2001705;\n              dst.touched=1;\n            }\n            \n          }\n        }\n        i++;\n      }\n      //$LASTPOS=2001755;\n      Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;\n      //$LASTPOS=2001787;\n      Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;\n      //$LASTPOS=2001819;\n      _this.handleListeners();\n    };\n    //$LASTPOS=2001851;\n    Tonyu.globals.$handleTouchEnd=function (e) {\n      var ts;\n      var i;\n      var src;\n      var dst;\n      \n      //$LASTPOS=2001883;\n      ts = e.originalEvent.changedTouches;\n      //$LASTPOS=2001931;\n      //$LASTPOS=2001936;\n      i = 0;\n      while(i<ts.length) {\n        {\n          //$LASTPOS=2001981;\n          src = ts[i];\n          //$LASTPOS=2002009;\n          dst = Tonyu.globals.$touches.findById(src.identifier);\n          //$LASTPOS=2002065;\n          if (dst) {\n            //$LASTPOS=2002093;\n            dst.touched=0;\n            //$LASTPOS=2002125;\n            dst.identifier=- 1;\n            \n          }\n        }\n        i++;\n      }\n      //$LASTPOS=2002179;\n      _this.handleListeners();\n    };\n    //$LASTPOS=2002211;\n    handleMouse = function (e) {\n      \n      //$LASTPOS=2002232;\n      Tonyu.globals.$handleMouse(e);\n    };\n    //$LASTPOS=2002256;\n    handleTouch = function (e) {\n      \n      //$LASTPOS=2002277;\n      Tonyu.globals.$handleTouch(e);\n    };\n    //$LASTPOS=2002301;\n    handleTouchEnd = function (e) {\n      \n      //$LASTPOS=2002325;\n      Tonyu.globals.$handleTouchEnd(e);\n    };\n    //$LASTPOS=2002352;\n    d = $.data(cv,"events");\n    //$LASTPOS=2002384;\n    if (! d) {\n      //$LASTPOS=2002403;\n      $.data(cv,"events","true");\n      //$LASTPOS=2002440;\n      cvj.mousedown(handleMouse);\n      //$LASTPOS=2002477;\n      cvj.mousemove(handleMouse);\n      //$LASTPOS=2002514;\n      cvj.on("touchstart",handleTouch);\n      //$LASTPOS=2002557;\n      cvj.on("touchmove",handleTouch);\n      //$LASTPOS=2002599;\n      cvj.on("touchend",handleTouchEnd);\n      \n    }\n  },\n  fiber$initCanvasEvents :function _trc_func_2000270_8(_thread,cvj) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var cv;\n    var handleMouse;\n    var handleTouch;\n    var handleTouchEnd;\n    var d;\n    \n    //$LASTPOS=2000300;\n    cv = cvj[0];\n    \n    _thread.enter(function _trc_func_2000270_9(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=2000320;\n          Tonyu.globals.$handleMouse=function (e) {\n            var p;\n            var mp;\n            \n            //$LASTPOS=2000349;\n            p = cvj.offset();\n            //$LASTPOS=2000378;\n            mp = {x: e.clientX-p.left,y: e.clientY-p.top};\n            //$LASTPOS=2000435;\n            mp=Tonyu.globals.$Screen.canvas2buf(mp);\n            //$LASTPOS=2000471;\n            Tonyu.globals.$mouseX=mp.x;\n            //$LASTPOS=2000494;\n            Tonyu.globals.$mouseY=mp.y;\n            //$LASTPOS=2000517;\n            if (_this.touchEmu) {\n              //$LASTPOS=2000546;\n              Tonyu.globals.$touches[0].x=mp.x;\n              //$LASTPOS=2000579;\n              Tonyu.globals.$touches[0].y=mp.y;\n              \n            }\n            //$LASTPOS=2000619;\n            _this.handleListeners();\n          };\n          //$LASTPOS=2000651;\n          Tonyu.globals.$touches=[{},{},{},{},{}];\n          //$LASTPOS=2000683;\n          Tonyu.globals.$touches.findById=function (id) {\n            var j;\n            \n            //$LASTPOS=2000718;\n            //$LASTPOS=2000723;\n            j = 0;\n            while(j<Tonyu.globals.$touches.length) {\n              {\n                //$LASTPOS=2000773;\n                if (Tonyu.globals.$touches[j].identifier==id) {\n                  return Tonyu.globals.$touches[j];\n                  \n                }\n              }\n              j++;\n            }\n          };\n          //$LASTPOS=2000883;\n          Tonyu.globals.$handleTouch=function (e) {\n            var p;\n            var ts;\n            var i;\n            var src;\n            var dst;\n            var j;\n            \n            //$LASTPOS=2000912;\n            _this.touchEmu=false;\n            //$LASTPOS=2000937;\n            p = cvj.offset();\n            //$LASTPOS=2000966;\n            e.preventDefault();\n            //$LASTPOS=2000995;\n            ts = e.originalEvent.changedTouches;\n            //$LASTPOS=2001043;\n            //$LASTPOS=2001048;\n            i = 0;\n            while(i<ts.length) {\n              {\n                //$LASTPOS=2001093;\n                src = ts[i];\n                //$LASTPOS=2001121;\n                dst = Tonyu.globals.$touches.findById(src.identifier);\n                //$LASTPOS=2001177;\n                if (! dst) {\n                  //$LASTPOS=2001206;\n                  //$LASTPOS=2001211;\n                  j = 0;\n                  while(j<Tonyu.globals.$touches.length) {\n                    {\n                      //$LASTPOS=2001269;\n                      if (! Tonyu.globals.$touches[j].touched) {\n                        //$LASTPOS=2001322;\n                        dst=Tonyu.globals.$touches[j];\n                        //$LASTPOS=2001364;\n                        dst.identifier=src.identifier;\n                        break;\n                        \n                        \n                      }\n                    }\n                    j++;\n                  }\n                  \n                }\n                //$LASTPOS=2001497;\n                if (dst) {\n                  //$LASTPOS=2001525;\n                  _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};\n                  //$LASTPOS=2001586;\n                  _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);\n                  //$LASTPOS=2001630;\n                  dst.x=_this.mp.x;\n                  //$LASTPOS=2001659;\n                  dst.y=_this.mp.y;\n                  //$LASTPOS=2001688;\n                  if (! dst.touched) {\n                    //$LASTPOS=2001705;\n                    dst.touched=1;\n                  }\n                  \n                }\n              }\n              i++;\n            }\n            //$LASTPOS=2001755;\n            Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;\n            //$LASTPOS=2001787;\n            Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;\n            //$LASTPOS=2001819;\n            _this.handleListeners();\n          };\n          //$LASTPOS=2001851;\n          Tonyu.globals.$handleTouchEnd=function (e) {\n            var ts;\n            var i;\n            var src;\n            var dst;\n            \n            //$LASTPOS=2001883;\n            ts = e.originalEvent.changedTouches;\n            //$LASTPOS=2001931;\n            //$LASTPOS=2001936;\n            i = 0;\n            while(i<ts.length) {\n              {\n                //$LASTPOS=2001981;\n                src = ts[i];\n                //$LASTPOS=2002009;\n                dst = Tonyu.globals.$touches.findById(src.identifier);\n                //$LASTPOS=2002065;\n                if (dst) {\n                  //$LASTPOS=2002093;\n                  dst.touched=0;\n                  //$LASTPOS=2002125;\n                  dst.identifier=- 1;\n                  \n                }\n              }\n              i++;\n            }\n            //$LASTPOS=2002179;\n            _this.handleListeners();\n          };\n          //$LASTPOS=2002211;\n          handleMouse = function (e) {\n            \n            //$LASTPOS=2002232;\n            Tonyu.globals.$handleMouse(e);\n          };\n          //$LASTPOS=2002256;\n          handleTouch = function (e) {\n            \n            //$LASTPOS=2002277;\n            Tonyu.globals.$handleTouch(e);\n          };\n          //$LASTPOS=2002301;\n          handleTouchEnd = function (e) {\n            \n            //$LASTPOS=2002325;\n            Tonyu.globals.$handleTouchEnd(e);\n          };\n          //$LASTPOS=2002352;\n          d = $.data(cv,"events");\n          //$LASTPOS=2002384;\n          if (! d) {\n            //$LASTPOS=2002403;\n            $.data(cv,"events","true");\n            //$LASTPOS=2002440;\n            cvj.mousedown(handleMouse);\n            //$LASTPOS=2002477;\n            cvj.mousemove(handleMouse);\n            //$LASTPOS=2002514;\n            cvj.on("touchstart",handleTouch);\n            //$LASTPOS=2002557;\n            cvj.on("touchmove",handleTouch);\n            //$LASTPOS=2002599;\n            cvj.on("touchend",handleTouchEnd);\n            \n          }\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  update :function _trc_func_2002647_10() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    var _it_30;\n    \n    //$LASTPOS=2002664;\n    _it_30=Tonyu.iterator(Tonyu.globals.$touches,1);\n    while(_it_30.next()) {\n      i=_it_30[0];\n      \n      //$LASTPOS=2002699;\n      if (i.touched>0) {\n        //$LASTPOS=2002717;\n        i.touched++;\n        \n      }\n      //$LASTPOS=2002740;\n      if (i.touched==- 1) {\n        //$LASTPOS=2002759;\n        i.touched=1;\n      }\n      \n    }\n  },\n  fiber$update :function _trc_func_2002647_11(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    var _it_30;\n    \n    //$LASTPOS=2002664;\n    _it_30=Tonyu.iterator(Tonyu.globals.$touches,1);\n    while(_it_30.next()) {\n      i=_it_30[0];\n      \n      //$LASTPOS=2002699;\n      if (i.touched>0) {\n        //$LASTPOS=2002717;\n        i.touched++;\n        \n      }\n      //$LASTPOS=2002740;\n      if (i.touched==- 1) {\n        //$LASTPOS=2002759;\n        i.touched=1;\n      }\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.InputDevice,{"fullName":"kernel.InputDevice","namespace":"kernel","shortName":"InputDevice","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.MathMod=Tonyu.klass([],{\n  main :function _trc_func_3000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_3000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  sin :function _trc_func_3000031_2(d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.sin(_this.rad(d));\n  },\n  cos :function _trc_func_3000082_3(d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.cos(_this.rad(d));\n  },\n  rad :function _trc_func_3000133_4(d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return d/180*Math.PI;\n  },\n  deg :function _trc_func_3000181_5(d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return d/Math.PI*180;\n  },\n  abs :function _trc_func_3000231_6(v) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.abs(v);\n  },\n  atan2 :function _trc_func_3000277_7(x,y) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.deg(Math.atan2(x,y));\n  },\n  floor :function _trc_func_3000336_8(x) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.floor(x);\n  },\n  angleDiff :function _trc_func_3000386_9(a,b) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var c;\n    \n    //$LASTPOS=3000416;\n    c;\n    //$LASTPOS=3000428;\n    a=_this.floor(a);\n    //$LASTPOS=3000445;\n    b=_this.floor(b);\n    //$LASTPOS=3000462;\n    if (a>=b) {\n      //$LASTPOS=3000483;\n      c=(a-b)%360;\n      //$LASTPOS=3000507;\n      if (c>=180) {\n        //$LASTPOS=3000519;\n        c-=360;\n      }\n      \n    } else {\n      //$LASTPOS=3000550;\n      c=- ((b-a)%360);\n      //$LASTPOS=3000577;\n      if (c<- 180) {\n        //$LASTPOS=3000589;\n        c+=360;\n      }\n      \n    }\n    return c;\n  },\n  sqrt :function _trc_func_3000623_10(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.sqrt(t);\n  },\n  dist :function _trc_func_3000671_11(dx,dy) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var t;\n    \n    //$LASTPOS=3000698;\n    if (typeof  dx=="object") {\n      //$LASTPOS=3000734;\n      t = dx;\n      //$LASTPOS=3000753;\n      dx=t.x-_this.x;\n      //$LASTPOS=3000762;\n      dy=t.y-_this.y;\n      \n    }\n    return _this.sqrt(dx*dx+dy*dy);\n  },\n  trunc :function _trc_func_3000814_12(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=3000838;\n    if (f>=0) {\n      return Math.floor(f);\n    } else {\n      return Math.ceil(f);\n    }\n  },\n  ceil :function _trc_func_3000904_13(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.ceil(f);\n  },\n  rnd :function _trc_func_3000953_14(r) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=3000975;\n    if (typeof  r=="number") {\n      return Math.floor(Math.random()*r);\n      \n    }\n    return Math.random();\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.MathMod,{"fullName":"kernel.MathMod","namespace":"kernel","shortName":"MathMod","decls":{"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.MediaPlayer=Tonyu.klass([],{\n  main :function _trc_func_4000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_4000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  play :function _trc_func_4000002_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$play :function _trc_func_4000002_3(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  stop :function _trc_func_4000022_4() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$stop :function _trc_func_4000022_5(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  playSE :function _trc_func_4000042_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$playSE :function _trc_func_4000042_7(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  setDelay :function _trc_func_4000064_8() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$setDelay :function _trc_func_4000064_9(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  setVolume :function _trc_func_4000087_10() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$setVolume :function _trc_func_4000087_11(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.ParallelMod=Tonyu.klass([],{\n  main :function _trc_func_5000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_5000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  parallel :function _trc_func_5000015_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var args;\n    var i;\n    var name;\n    var thg;\n    var th;\n    \n    //$LASTPOS=5000042;\n    args = [];\n    //$LASTPOS=5000061;\n    //$LASTPOS=5000066;\n    i = 1;\n    while(i<arguments.length) {\n      {\n        //$LASTPOS=5000112;\n        args.push(arguments[i]);\n      }\n      i++;\n    }\n    //$LASTPOS=5000151;\n    name = arguments[0];\n    //$LASTPOS=5000190;\n    thg = Tonyu.globals.$currentThreadGroup;\n    //$LASTPOS=5000225;\n    th;\n    //$LASTPOS=5000239;\n    if (thg) {\n      //$LASTPOS=5000248;\n      th=thg.addObj(_this,name,args);\n    }\n    //$LASTPOS=5000287;\n    _this.on("die",function () {\n      \n      //$LASTPOS=5000299;\n      th.kill();\n    });\n    return th;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T2Mod=Tonyu.klass([],{\n  main :function _trc_func_6000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_6000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  bvec :function _trc_func_6000015_2(tx,ty) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b2Vec2;\n    \n    //$LASTPOS=6000034;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    return new b2Vec2(tx/_this.scale,ty/_this.scale);\n  },\n  fiber$bvec :function _trc_func_6000015_3(_thread,tx,ty) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b2Vec2;\n    \n    //$LASTPOS=6000034;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.TextRectMod=Tonyu.klass([],{\n  main :function _trc_func_7000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_7000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  drawTextRect :function _trc_func_7000017_2(ctx,text,x,topY,h,align,type) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var met;\n    var res;\n    var t;\n    \n    //$LASTPOS=7000090;\n    if (! align) {\n      //$LASTPOS=7000102;\n      align="center";\n    }\n    //$LASTPOS=7000123;\n    ctx.textBaseline="top";\n    //$LASTPOS=7000152;\n    _this.setFontSize(ctx,h);\n    //$LASTPOS=7000178;\n    met = ctx.measureText(text);\n    //$LASTPOS=7000214;\n    res = {y: topY,w: met.width,h: h};\n    //$LASTPOS=7000256;\n    t = align.substring(0,1).toLowerCase();\n    //$LASTPOS=7000303;\n    if (t=="l") {\n      //$LASTPOS=7000315;\n      res.x=x;\n    } else {\n      //$LASTPOS=7000334;\n      if (t=="r") {\n        //$LASTPOS=7000346;\n        res.x=x-met.width;\n      } else {\n        //$LASTPOS=7000375;\n        if (t=="c") {\n          //$LASTPOS=7000387;\n          res.x=x-met.width/2;\n        }\n      }\n    }\n    //$LASTPOS=7000413;\n    if (type=="fill") {\n      //$LASTPOS=7000431;\n      ctx.fillText(text,res.x,topY);\n    }\n    //$LASTPOS=7000468;\n    if (type=="stroke") {\n      //$LASTPOS=7000488;\n      ctx.strokeText(text,res.x,topY);\n    }\n    return res;\n  },\n  setFontSize :function _trc_func_7000543_3(ctx,sz) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var post;\n    \n    //$LASTPOS=7000586;\n    post = ctx.font.replace(/^[0-9\\.]+/,"");\n    //$LASTPOS=7000634;\n    ctx.font=sz+post;\n  },\n  fukidashi :function _trc_func_7000658_4(ctx,text,x,y,sz) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var align;\n    var theight;\n    var margin;\n    var r;\n    var fs;\n    \n    //$LASTPOS=7000712;\n    align = "c";\n    //$LASTPOS=7000732;\n    theight = 20;\n    //$LASTPOS=7000753;\n    margin = 5;\n    //$LASTPOS=7000772;\n    r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);\n    //$LASTPOS=7000842;\n    ctx.beginPath();\n    //$LASTPOS=7000864;\n    ctx.moveTo(x,y);\n    //$LASTPOS=7000888;\n    ctx.lineTo(x+margin,y-theight);\n    //$LASTPOS=7000927;\n    ctx.lineTo(x+r.w/2+margin,y-theight);\n    //$LASTPOS=7000972;\n    ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);\n    //$LASTPOS=7001030;\n    ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);\n    //$LASTPOS=7001088;\n    ctx.lineTo(x-r.w/2-margin,y-theight);\n    //$LASTPOS=7001133;\n    ctx.lineTo(x-margin,y-theight);\n    //$LASTPOS=7001172;\n    ctx.closePath();\n    //$LASTPOS=7001194;\n    ctx.fill();\n    //$LASTPOS=7001211;\n    ctx.stroke();\n    //$LASTPOS=7001236;\n    fs = ctx.fillStyle;\n    //$LASTPOS=7001263;\n    ctx.fillStyle=ctx.strokeStyle;\n    //$LASTPOS=7001299;\n    _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");\n    //$LASTPOS=7001372;\n    ctx.fillStyle=fs;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.TObject=Tonyu.klass([],{\n  main :function _trc_func_8000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_8000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_8000030_2(options) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=8000052;\n    if (typeof  options=="object") {\n      //$LASTPOS=8000082;\n      _this.extend(options);\n    }\n    //$LASTPOS=8000104;\n    _this.main();\n  },\n  extend :function _trc_func_8000121_3(obj) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Tonyu.extend(_this,obj);\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{\n  main :function _trc_func_9000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_9000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_9000035_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=9000049;\n    _this.length=0;\n  },\n  tonyuIterator :function _trc_func_9000061_3(arity) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    \n    //$LASTPOS=9000089;\n    res = {};\n    //$LASTPOS=9000105;\n    res.i=0;\n    //$LASTPOS=9000118;\n    if (arity==1) {\n      //$LASTPOS=9000142;\n      res.next=function () {\n        \n        //$LASTPOS=9000177;\n        if (res.i>=_this.length) {\n          return false;\n        }\n        //$LASTPOS=9000227;\n        res[0]=_this[res.i];\n        //$LASTPOS=9000259;\n        res.i++;\n        return true;\n      };\n      \n    } else {\n      //$LASTPOS=9000325;\n      res.next=function () {\n        \n        //$LASTPOS=9000360;\n        if (res.i>=_this.length) {\n          return false;\n        }\n        //$LASTPOS=9000410;\n        res[0]=res.i;\n        //$LASTPOS=9000436;\n        res[1]=_this[res.i];\n        //$LASTPOS=9000468;\n        res.i++;\n        return true;\n      };\n      \n    }\n    return res;\n  },\n  fiber$tonyuIterator :function _trc_func_9000061_4(_thread,arity) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var res;\n    \n    //$LASTPOS=9000089;\n    res = {};\n    //$LASTPOS=9000105;\n    res.i=0;\n    //$LASTPOS=9000118;\n    if (arity==1) {\n      //$LASTPOS=9000142;\n      res.next=function () {\n        \n        //$LASTPOS=9000177;\n        if (res.i>=_this.length) {\n          return false;\n        }\n        //$LASTPOS=9000227;\n        res[0]=_this[res.i];\n        //$LASTPOS=9000259;\n        res.i++;\n        return true;\n      };\n      \n    } else {\n      //$LASTPOS=9000325;\n      res.next=function () {\n        \n        //$LASTPOS=9000360;\n        if (res.i>=_this.length) {\n          return false;\n        }\n        //$LASTPOS=9000410;\n        res[0]=res.i;\n        //$LASTPOS=9000436;\n        res[1]=_this[res.i];\n        //$LASTPOS=9000468;\n        res.i++;\n        return true;\n      };\n      \n    }\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  attr :function _trc_func_9000537_5() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var values;\n    var i;\n    var e;\n    var _it_51;\n    \n    //$LASTPOS=9000551;\n    values;\n    //$LASTPOS=9000567;\n    if (_this.length==0) {\n      return _this;\n    }\n    //$LASTPOS=9000594;\n    if (arguments.length==1&&typeof  arguments[0]=="string") {\n      return _this[0][arguments[0]];\n      \n    }\n    //$LASTPOS=9000702;\n    if (arguments.length>=2) {\n      //$LASTPOS=9000737;\n      values={};\n      //$LASTPOS=9000756;\n      //$LASTPOS=9000761;\n      i = 0;\n      while(i<arguments.length-1) {\n        {\n          //$LASTPOS=9000813;\n          values[arguments[i]]=arguments[i+1];\n        }\n        i+=2;\n      }\n      \n    } else {\n      //$LASTPOS=9000881;\n      values=arguments[0];\n      \n    }\n    //$LASTPOS=9000912;\n    if (values) {\n      //$LASTPOS=9000934;\n      _it_51=Tonyu.iterator(_this,1);\n      while(_it_51.next()) {\n        e=_it_51[0];\n        \n        //$LASTPOS=9000968;\n        e.extend(values);\n        \n      }\n      \n    }\n  },\n  fiber$attr :function _trc_func_9000537_6(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var values;\n    var i;\n    var e;\n    var _it_51;\n    \n    //$LASTPOS=9000551;\n    values;\n    //$LASTPOS=9000567;\n    if (_this.length==0) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=9000594;\n    if (_arguments.length==1&&typeof  _arguments[0]=="string") {\n      _thread.retVal=_this[0][_arguments[0]];return;\n      \n      \n    }\n    //$LASTPOS=9000702;\n    if (_arguments.length>=2) {\n      //$LASTPOS=9000737;\n      values={};\n      //$LASTPOS=9000756;\n      //$LASTPOS=9000761;\n      i = 0;\n      while(i<_arguments.length-1) {\n        {\n          //$LASTPOS=9000813;\n          values[_arguments[i]]=_arguments[i+1];\n        }\n        i+=2;\n      }\n      \n    } else {\n      //$LASTPOS=9000881;\n      values=_arguments[0];\n      \n    }\n    //$LASTPOS=9000912;\n    if (values) {\n      //$LASTPOS=9000934;\n      _it_51=Tonyu.iterator(_this,1);\n      while(_it_51.next()) {\n        e=_it_51[0];\n        \n        //$LASTPOS=9000968;\n        e.extend(values);\n        \n      }\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  genKeyfunc :function _trc_func_9001005_7(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=9001028;\n    if (typeof  key!="function") {\n      return function (o) {\n        \n        return o[key];\n      };\n      \n    } else {\n      return key;\n      \n    }\n  },\n  fiber$genKeyfunc :function _trc_func_9001005_8(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=9001028;\n    if (typeof  key!="function") {\n      _thread.retVal=function (o) {\n        \n        return o[key];\n      };return;\n      \n      \n    } else {\n      _thread.retVal=key;return;\n      \n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  maxs :function _trc_func_9001137_9(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var f;\n    var res;\n    var reso;\n    var o;\n    var _it_57;\n    var v;\n    \n    //$LASTPOS=9001154;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9001181;\n    res;reso = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9001210;\n    _it_57=Tonyu.iterator(_this,1);\n    while(_it_57.next()) {\n      o=_it_57[0];\n      \n      //$LASTPOS=9001240;\n      v = f(o);\n      //$LASTPOS=9001260;\n      if (res==null||v>=res) {\n        //$LASTPOS=9001299;\n        if (v>res) {\n          //$LASTPOS=9001310;\n          reso=new Tonyu.classes.kernel.TQuery;\n        }\n        //$LASTPOS=9001339;\n        reso.push(o);\n        //$LASTPOS=9001365;\n        res=v;\n        \n      }\n      \n    }\n    return reso;\n  },\n  fiber$maxs :function _trc_func_9001137_10(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var f;\n    var res;\n    var reso;\n    var o;\n    var _it_57;\n    var v;\n    \n    //$LASTPOS=9001154;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9001181;\n    res;reso = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9001210;\n    _it_57=Tonyu.iterator(_this,1);\n    while(_it_57.next()) {\n      o=_it_57[0];\n      \n      //$LASTPOS=9001240;\n      v = f(o);\n      //$LASTPOS=9001260;\n      if (res==null||v>=res) {\n        //$LASTPOS=9001299;\n        if (v>res) {\n          //$LASTPOS=9001310;\n          reso=new Tonyu.classes.kernel.TQuery;\n        }\n        //$LASTPOS=9001339;\n        reso.push(o);\n        //$LASTPOS=9001365;\n        res=v;\n        \n      }\n      \n    }\n    _thread.retVal=reso;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  mins :function _trc_func_9001407_11(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var f;\n    var res;\n    var reso;\n    var o;\n    var _it_64;\n    var v;\n    \n    //$LASTPOS=9001424;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9001451;\n    res;reso = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9001480;\n    _it_64=Tonyu.iterator(_this,1);\n    while(_it_64.next()) {\n      o=_it_64[0];\n      \n      //$LASTPOS=9001510;\n      v = f(o);\n      //$LASTPOS=9001530;\n      if (res==null||v<=res) {\n        //$LASTPOS=9001569;\n        if (v<res) {\n          //$LASTPOS=9001580;\n          reso=new Tonyu.classes.kernel.TQuery;\n        }\n        //$LASTPOS=9001609;\n        reso.push(o);\n        //$LASTPOS=9001635;\n        res=v;\n        \n      }\n      \n    }\n    return reso;\n  },\n  fiber$mins :function _trc_func_9001407_12(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var f;\n    var res;\n    var reso;\n    var o;\n    var _it_64;\n    var v;\n    \n    //$LASTPOS=9001424;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9001451;\n    res;reso = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9001480;\n    _it_64=Tonyu.iterator(_this,1);\n    while(_it_64.next()) {\n      o=_it_64[0];\n      \n      //$LASTPOS=9001510;\n      v = f(o);\n      //$LASTPOS=9001530;\n      if (res==null||v<=res) {\n        //$LASTPOS=9001569;\n        if (v<res) {\n          //$LASTPOS=9001580;\n          reso=new Tonyu.classes.kernel.TQuery;\n        }\n        //$LASTPOS=9001609;\n        reso.push(o);\n        //$LASTPOS=9001635;\n        res=v;\n        \n      }\n      \n    }\n    _thread.retVal=reso;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  minObj :function _trc_func_9001677_13(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.mins(key)[0];\n  },\n  fiber$minObj :function _trc_func_9001677_14(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.mins(key)[0];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  maxObj :function _trc_func_9001719_15(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.maxs(key)[0];\n  },\n  fiber$maxObj :function _trc_func_9001719_16(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.maxs(key)[0];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  nearests :function _trc_func_9001761_17(x,y) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=9001782;\n    if (typeof  x=="object") {\n      //$LASTPOS=9001807;\n      y=x.y;\n      //$LASTPOS=9001813;\n      x=x.x;\n      \n    }\n    return _this.mins(function (o) {\n      \n      return _this.dist(o.x-x,o.y-y);\n    });\n  },\n  fiber$nearests :function _trc_func_9001761_18(_thread,x,y) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=9001782;\n    if (typeof  x=="object") {\n      //$LASTPOS=9001807;\n      y=x.y;\n      //$LASTPOS=9001813;\n      x=x.x;\n      \n    }\n    _thread.retVal=_this.mins(function (o) {\n      \n      return _this.dist(o.x-x,o.y-y);\n    });return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  nearest :function _trc_func_9001887_19(x,y) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.nearests(x,y)[0];\n  },\n  fiber$nearest :function _trc_func_9001887_20(_thread,x,y) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.nearests(x,y)[0];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  withins :function _trc_func_9001934_21(xo,yd,d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var x;\n    var y;\n    \n    //$LASTPOS=9001958;\n    x;y;\n    //$LASTPOS=9001971;\n    if (typeof  xo=="object") {\n      //$LASTPOS=9002006;\n      x=xo.x;\n      //$LASTPOS=9002013;\n      y=xo.y;\n      //$LASTPOS=9002020;\n      d=yd;\n      \n    } else {\n      //$LASTPOS=9002047;\n      x=xo;\n      //$LASTPOS=9002052;\n      y=yd;\n      \n    }\n    return _this.find(function (o) {\n      \n      return _this.dist(o.x-x,o.y-y)<=d;\n    });\n  },\n  fiber$withins :function _trc_func_9001934_22(_thread,xo,yd,d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var x;\n    var y;\n    \n    //$LASTPOS=9001958;\n    x;y;\n    //$LASTPOS=9001971;\n    if (typeof  xo=="object") {\n      //$LASTPOS=9002006;\n      x=xo.x;\n      //$LASTPOS=9002013;\n      y=xo.y;\n      //$LASTPOS=9002020;\n      d=yd;\n      \n    } else {\n      //$LASTPOS=9002047;\n      x=xo;\n      //$LASTPOS=9002052;\n      y=yd;\n      \n    }\n    _thread.retVal=_this.find(function (o) {\n      \n      return _this.dist(o.x-x,o.y-y)<=d;\n    });return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  within :function _trc_func_9002133_23(xo,yd,d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.withins(xo,yd,d).nearest();\n  },\n  fiber$within :function _trc_func_9002133_24(_thread,xo,yd,d) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.withins(xo,yd,d).nearest();return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  max :function _trc_func_9002194_25(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var f;\n    var res;\n    var o;\n    var _it_75;\n    var v;\n    \n    //$LASTPOS=9002210;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9002237;\n    res;\n    //$LASTPOS=9002250;\n    _it_75=Tonyu.iterator(_this,1);\n    while(_it_75.next()) {\n      o=_it_75[0];\n      \n      //$LASTPOS=9002280;\n      v = f(o);\n      //$LASTPOS=9002300;\n      if (res==null||v>res) {\n        //$LASTPOS=9002324;\n        res=v;\n      }\n      \n    }\n    return res;\n  },\n  fiber$max :function _trc_func_9002194_26(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var f;\n    var res;\n    var o;\n    var _it_75;\n    var v;\n    \n    //$LASTPOS=9002210;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9002237;\n    res;\n    //$LASTPOS=9002250;\n    _it_75=Tonyu.iterator(_this,1);\n    while(_it_75.next()) {\n      o=_it_75[0];\n      \n      //$LASTPOS=9002280;\n      v = f(o);\n      //$LASTPOS=9002300;\n      if (res==null||v>res) {\n        //$LASTPOS=9002324;\n        res=v;\n      }\n      \n    }\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  min :function _trc_func_9002355_27(key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var f;\n    var res;\n    var o;\n    var _it_81;\n    var v;\n    \n    //$LASTPOS=9002371;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9002398;\n    res;\n    //$LASTPOS=9002411;\n    _it_81=Tonyu.iterator(_this,1);\n    while(_it_81.next()) {\n      o=_it_81[0];\n      \n      //$LASTPOS=9002441;\n      v = f(o);\n      //$LASTPOS=9002461;\n      if (res==null||v<res) {\n        //$LASTPOS=9002485;\n        res=v;\n      }\n      \n    }\n    return res;\n  },\n  fiber$min :function _trc_func_9002355_28(_thread,key) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var f;\n    var res;\n    var o;\n    var _it_81;\n    var v;\n    \n    //$LASTPOS=9002371;\n    f = _this.genKeyfunc(key);\n    //$LASTPOS=9002398;\n    res;\n    //$LASTPOS=9002411;\n    _it_81=Tonyu.iterator(_this,1);\n    while(_it_81.next()) {\n      o=_it_81[0];\n      \n      //$LASTPOS=9002441;\n      v = f(o);\n      //$LASTPOS=9002461;\n      if (res==null||v<res) {\n        //$LASTPOS=9002485;\n        res=v;\n      }\n      \n    }\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  push :function _trc_func_9002516_29(e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=9002531;\n    _this[_this.length]=e;\n    //$LASTPOS=9002551;\n    _this.length++;\n  },\n  fiber$push :function _trc_func_9002516_30(_thread,e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=9002531;\n    _this[_this.length]=e;\n    //$LASTPOS=9002551;\n    _this.length++;\n    \n    _thread.retVal=_this;return;\n  },\n  size :function _trc_func_9002563_31() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.length;\n  },\n  fiber$size :function _trc_func_9002563_32(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.length;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  find :function _trc_func_9002588_33(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var no;\n    var o;\n    var _it_87;\n    \n    //$LASTPOS=9002603;\n    no = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9002626;\n    _it_87=Tonyu.iterator(_this,1);\n    while(_it_87.next()) {\n      o=_it_87[0];\n      \n      //$LASTPOS=9002656;\n      if (f(o)) {\n        //$LASTPOS=9002666;\n        no.push(o);\n      }\n      \n    }\n    return no;\n  },\n  fiber$find :function _trc_func_9002588_34(_thread,f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var no;\n    var o;\n    var _it_87;\n    \n    //$LASTPOS=9002603;\n    no = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=9002626;\n    _it_87=Tonyu.iterator(_this,1);\n    while(_it_87.next()) {\n      o=_it_87[0];\n      \n      //$LASTPOS=9002656;\n      if (f(o)) {\n        //$LASTPOS=9002666;\n        no.push(o);\n      }\n      \n    }\n    _thread.retVal=no;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  apply :function _trc_func_9002702_35(name,args) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    var o;\n    var _it_91;\n    var f;\n    \n    //$LASTPOS=9002727;\n    res;\n    //$LASTPOS=9002740;\n    if (! args) {\n      //$LASTPOS=9002751;\n      args=[];\n    }\n    //$LASTPOS=9002764;\n    _it_91=Tonyu.iterator(_this,1);\n    while(_it_91.next()) {\n      o=_it_91[0];\n      \n      //$LASTPOS=9002794;\n      f = o[name];\n      //$LASTPOS=9002817;\n      if (typeof  f=="function") {\n        //$LASTPOS=9002857;\n        res=f.apply(o,args);\n        \n      }\n      \n    }\n    return res;\n  },\n  fiber$apply :function _trc_func_9002702_36(_thread,name,args) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var res;\n    var o;\n    var _it_91;\n    var f;\n    \n    //$LASTPOS=9002727;\n    res;\n    //$LASTPOS=9002740;\n    if (! args) {\n      //$LASTPOS=9002751;\n      args=[];\n    }\n    //$LASTPOS=9002764;\n    _it_91=Tonyu.iterator(_this,1);\n    while(_it_91.next()) {\n      o=_it_91[0];\n      \n      //$LASTPOS=9002794;\n      f = o[name];\n      //$LASTPOS=9002817;\n      if (typeof  f=="function") {\n        //$LASTPOS=9002857;\n        res=f.apply(o,args);\n        \n      }\n      \n    }\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  alive :function _trc_func_9002968_37() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.find(function (o) {\n      \n      return ! o.isDead();\n    });\n  },\n  fiber$alive :function _trc_func_9002968_38(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.find(function (o) {\n      \n      return ! o.isDead();\n    });return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  die :function _trc_func_9003039_39() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var a;\n    \n    //$LASTPOS=9003052;\n    a = _this.alive();\n    //$LASTPOS=9003071;\n    if (a.length==0) {\n      return false;\n    }\n    //$LASTPOS=9003106;\n    a.apply("die");\n    return true;\n  },\n  fiber$die :function _trc_func_9003039_40(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var a;\n    \n    //$LASTPOS=9003052;\n    a = _this.alive();\n    //$LASTPOS=9003071;\n    if (a.length==0) {\n      _thread.retVal=false;return;\n      \n    }\n    //$LASTPOS=9003106;\n    a.apply("die");\n    _thread.retVal=true;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  klass :function _trc_func_9003142_41(k) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.find(function (o) {\n      \n      return o instanceof k;\n    });\n  },\n  fiber$klass :function _trc_func_9003142_42(_thread,k) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.find(function (o) {\n      \n      return o instanceof k;\n    });return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.TQuery,{"fullName":"kernel.TQuery","namespace":"kernel","shortName":"TQuery","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.WaveTable=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{\n  main :function _trc_func_10000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=10000028;\n    _this.wav={};\n    //$LASTPOS=10000036;\n    _this.env={};\n    //$LASTPOS=10000313;\n    if (typeof  T!=="undefined") {\n      //$LASTPOS=10000392;\n      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});\n      //$LASTPOS=10000460;\n      _this.setEnv(0,_this.env);\n      //$LASTPOS=10000480;\n      _this.setWav(0,T("pulse"));\n      \n    }\n  },\n  fiber$main :function _trc_func_10000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=10000028;\n    _this.wav={};\n    //$LASTPOS=10000036;\n    _this.env={};\n    \n    _thread.enter(function _trc_func_10000000_2(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=10000313;\n          if (!(typeof  T!=="undefined")) { __pc=3; break; }\n          //$LASTPOS=10000392;\n          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});\n          //$LASTPOS=10000460;\n          _this.fiber$setEnv(_thread, 0, _this.env);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=10000480;\n          _this.fiber$setWav(_thread, 0, T("pulse"));\n          __pc=2;return;\n        case 2:\n          \n        case 3:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  setWav :function _trc_func_10000044_3(num,synth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=10000070;\n    _this.wav[num]=synth;\n  },\n  fiber$setWav :function _trc_func_10000044_4(_thread,num,synth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=10000070;\n    _this.wav[num]=synth;\n    \n    _thread.retVal=_this;return;\n  },\n  setEnv :function _trc_func_10000088_5(num,synth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=10000114;\n    _this.env[num]=synth;\n  },\n  fiber$setEnv :function _trc_func_10000088_6(_thread,num,synth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=10000114;\n    _this.env[num]=synth;\n    \n    _thread.retVal=_this;return;\n  },\n  get :function _trc_func_10000132_7(w,e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var synth;\n    \n    //$LASTPOS=10000148;\n    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});\n    return synth;\n  },\n  fiber$get :function _trc_func_10000132_8(_thread,w,e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var synth;\n    \n    //$LASTPOS=10000148;\n    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});\n    _thread.retVal=synth;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  stop :function _trc_func_10000226_9() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$stop :function _trc_func_10000226_10(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.WaveTable,{"fullName":"kernel.WaveTable","namespace":"kernel","shortName":"WaveTable","decls":{"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.ParallelMod],{\n  main :function _trc_func_11000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_11000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_11000155_2(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var thg;\n    \n    //$LASTPOS=11000174;\n    if (Tonyu.runMode) {\n      //$LASTPOS=11000204;\n      thg = _this.currentThreadGroup();\n      //$LASTPOS=11000243;\n      if (thg) {\n        //$LASTPOS=11000252;\n        _this._th=thg.addObj(_this);\n      }\n      \n    }\n    //$LASTPOS=11000286;\n    if (typeof  x=="object") {\n      //$LASTPOS=11000310;\n      Tonyu.extend(_this,x);\n    } else {\n      //$LASTPOS=11000343;\n      if (typeof  x=="number") {\n        //$LASTPOS=11000378;\n        _this.x=x;\n        //$LASTPOS=11000397;\n        _this.y=y;\n        //$LASTPOS=11000416;\n        _this.p=p;\n        \n      }\n    }\n    //$LASTPOS=11000438;\n    if (_this.scaleX==null) {\n      //$LASTPOS=11000456;\n      _this.scaleX=1;\n    }\n    //$LASTPOS=11000471;\n    if (_this.rotation==null) {\n      //$LASTPOS=11000491;\n      _this.rotation=0;\n    }\n    //$LASTPOS=11000508;\n    if (_this.rotate==null) {\n      //$LASTPOS=11000526;\n      _this.rotate=0;\n    }\n    //$LASTPOS=11000541;\n    if (_this.alpha==null) {\n      //$LASTPOS=11000558;\n      _this.alpha=255;\n    }\n    //$LASTPOS=11000574;\n    if (_this.zOrder==null) {\n      //$LASTPOS=11000592;\n      _this.zOrder=0;\n    }\n    //$LASTPOS=11000607;\n    if (_this.age==null) {\n      //$LASTPOS=11000622;\n      _this.age=0;\n    }\n    //$LASTPOS=11000634;\n    if (_this.anim!=null&&typeof  _this.anim=="object") {\n      //$LASTPOS=11000685;\n      _this.animMode=true;\n      //$LASTPOS=11000709;\n      _this.animFrame=0;\n      \n    } else {\n      //$LASTPOS=11000743;\n      _this.animMode=false;\n      \n    }\n    //$LASTPOS=11000771;\n    if (_this.animFps==null) {\n      //$LASTPOS=11000790;\n      _this.animFps=1;\n    }\n  },\n  extend :function _trc_func_11000805_3(obj) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Tonyu.extend(_this,obj);\n  },\n  print :function _trc_func_11000869_4(pt) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11000894;\n    console.log.apply(console,arguments);\n    //$LASTPOS=11000937;\n    if (Tonyu.globals.$consolePanel) {\n      //$LASTPOS=11000965;\n      Tonyu.globals.$consolePanel.scroll(0,20);\n      //$LASTPOS=11001002;\n      Tonyu.globals.$consolePanel.setFillStyle("white");\n      //$LASTPOS=11001048;\n      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");\n      \n    }\n  },\n  setAnimFps :function _trc_func_11001116_5(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11001144;\n    _this.animFps=f;\n    //$LASTPOS=11001165;\n    _this.animFrame=0;\n    //$LASTPOS=11001188;\n    _this.animMode=true;\n  },\n  startAnim :function _trc_func_11001212_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11001238;\n    _this.animMode=true;\n  },\n  stopAnim :function _trc_func_11001262_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11001287;\n    _this.animMode=false;\n  },\n  update :function _trc_func_11001312_8() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11001329;\n    _this.onUpdate();\n    //$LASTPOS=11001346;\n    if (null) {\n      //$LASTPOS=11001369;\n      null.suspend();\n      \n    }\n  },\n  fiber$update :function _trc_func_11001312_9(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=11001329;\n    _this.onUpdate();\n    //$LASTPOS=11001346;\n    if (_thread) {\n      //$LASTPOS=11001369;\n      _thread.suspend();\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  onUpdate :function _trc_func_11001399_10() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  updateEx :function _trc_func_11001430_11(updateT) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var updateCount;\n    \n    //$LASTPOS=11001455;\n    //$LASTPOS=11001459;\n    updateCount = 0;\n    while(updateCount<updateT) {\n      {\n        //$LASTPOS=11001522;\n        _this.update();\n      }\n      updateCount++;\n    }\n  },\n  fiber$updateEx :function _trc_func_11001430_12(_thread,updateT) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var updateCount;\n    \n    \n    _thread.enter(function _trc_func_11001430_13(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=11001455;\n          //$LASTPOS=11001459;\n          updateCount = 0;;\n        case 1:\n          if (!(updateCount<updateT)) { __pc=3; break; }\n          //$LASTPOS=11001522;\n          _this.fiber$update(_thread);\n          __pc=2;return;\n        case 2:\n          \n          updateCount++;\n          __pc=1;break;\n        case 3:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  getkey :function _trc_func_11001543_14(k) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Tonyu.globals.$Keys.getkey(k);\n  },\n  hitTo :function _trc_func_11001596_15(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.crashTo(t);\n  },\n  all :function _trc_func_11001643_16(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    \n    //$LASTPOS=11001665;\n    res = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=11001690;\n    Tonyu.globals.$Sprites.sprites.forEach(function (s) {\n      \n      //$LASTPOS=11001731;\n      if (s===_this) {\n        return _this;\n      }\n      //$LASTPOS=11001762;\n      if (! c||s instanceof c) {\n        //$LASTPOS=11001803;\n        res.push(s);\n        \n      }\n    });\n    return res;\n  },\n  allCrash :function _trc_func_11001883_17(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    var sp;\n    var t1;\n    \n    //$LASTPOS=11001910;\n    res = new Tonyu.classes.kernel.TQuery;\n    //$LASTPOS=11001935;\n    sp = _this;\n    //$LASTPOS=11001972;\n    t1 = _this.getCrashRect();\n    //$LASTPOS=11002000;\n    if (! t1) {\n      return res;\n    }\n    //$LASTPOS=11002026;\n    Tonyu.globals.$Sprites.sprites.forEach(function (s) {\n      var t2;\n      \n      //$LASTPOS=11002067;\n      t2;\n      //$LASTPOS=11002084;\n      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n        //$LASTPOS=11002312;\n        res.push(s);\n        \n      }\n    });\n    return res;\n  },\n  crashTo :function _trc_func_11002370_18(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11002396;\n    if (! t) {\n      return false;\n    }\n    //$LASTPOS=11002423;\n    if (typeof  t=="function") {\n      return _this.allCrash(t)[0];\n      \n    }\n    return _this.crashTo1(t);\n  },\n  crashTo1 :function _trc_func_11002519_19(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var t1;\n    var t2;\n    \n    //$LASTPOS=11002546;\n    if (! t||t._isDead) {\n      return false;\n    }\n    //$LASTPOS=11002674;\n    t1 = _this.getCrashRect();\n    //$LASTPOS=11002702;\n    t2 = t.getCrashRect();\n    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n  },\n  getCrashRect :function _trc_func_11002985_20() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var actWidth;\n    var actHeight;\n    \n    //$LASTPOS=11003015;\n    actWidth = _this.width*_this.scaleX;actHeight;\n    //$LASTPOS=11003058;\n    if (typeof  _this.scaleY==="undefined") {\n      //$LASTPOS=11003100;\n      actHeight=_this.height*_this.scaleX;\n      \n    } else {\n      //$LASTPOS=11003146;\n      actHeight=_this.height*_this.scaleY;\n      \n    }\n    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};\n  },\n  within :function _trc_func_11003351_21(t,distance) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11003384;\n    if (! t||t._isDead) {\n      return false;\n    }\n    //$LASTPOS=11003423;\n    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {\n      return true;\n      \n    }\n    return false;\n  },\n  watchHit :function _trc_func_11003565_22(typeA,typeB,onHit) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11003608;\n    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {\n      \n      //$LASTPOS=11003659;\n      onHit.apply(_this,[a,b]);\n    });\n  },\n  currentThreadGroup :function _trc_func_11003697_23() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Tonyu.globals.$currentThreadGroup;\n  },\n  die :function _trc_func_11003766_24() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11003787;\n    if (_this._th) {\n      //$LASTPOS=11003807;\n      _this._th.kill();\n      \n    }\n    //$LASTPOS=11003831;\n    _this.hide();\n    //$LASTPOS=11003844;\n    _this.fireEvent("die");\n    //$LASTPOS=11003867;\n    _this._isDead=true;\n  },\n  hide :function _trc_func_11003885_25() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11004046;\n    if (_this.layer&&typeof  _this.layer.remove=="function") {\n      //$LASTPOS=11004101;\n      _this.layer.remove(_this);\n      \n    } else {\n      //$LASTPOS=11004142;\n      Tonyu.globals.$Sprites.remove(_this);\n      \n    }\n  },\n  show :function _trc_func_11004176_26(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11004203;\n    if (_this.layer&&typeof  _this.layer.add=="function") {\n      //$LASTPOS=11004255;\n      _this.layer.add(_this);\n      \n    } else {\n      //$LASTPOS=11004293;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    //$LASTPOS=11004325;\n    if (x!=null) {\n      //$LASTPOS=11004338;\n      _this.x=x;\n    }\n    //$LASTPOS=11004353;\n    if (y!=null) {\n      //$LASTPOS=11004366;\n      _this.y=y;\n    }\n    //$LASTPOS=11004381;\n    if (p!=null) {\n      //$LASTPOS=11004394;\n      _this.p=p;\n    }\n  },\n  detectShape :function _trc_func_11004410_27() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11004439;\n    if (typeof  _this.p!="number") {\n      //$LASTPOS=11004474;\n      if (_this.text!=null) {\n        return _this;\n      }\n      //$LASTPOS=11004507;\n      _this.p=0;\n      \n    }\n    //$LASTPOS=11004524;\n    _this.p=Math.floor(_this.p);\n    //$LASTPOS=11004546;\n    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];\n    //$LASTPOS=11004584;\n    if (! _this.pImg) {\n      return _this;\n    }\n    //$LASTPOS=11004608;\n    _this.width=_this.pImg.width;\n    //$LASTPOS=11004631;\n    _this.height=_this.pImg.height;\n  },\n  waitFor :function _trc_func_11004655_28(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    \n    //$LASTPOS=11004724;\n    _this.update();\n  },\n  fiber$waitFor :function _trc_func_11004655_29(_thread,f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_11004655_30(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          {\n            //$LASTPOS=11004692;\n            _thread.waitFor(f);\n          }\n          //$LASTPOS=11004724;\n          _this.fiber$update(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  isDead :function _trc_func_11004738_31() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this._isDead;\n  },\n  animation :function _trc_func_11004784_32() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11004810;\n    _this.age++;\n    //$LASTPOS=11004822;\n    if (_this.animMode&&_this.age%_this.animFps==0) {\n      //$LASTPOS=11004863;\n      _this.p=_this.anim[_this.animFrame%_this.anim.length];\n      //$LASTPOS=11004903;\n      _this.animFrame++;\n      \n    }\n  },\n  draw :function _trc_func_11004927_33(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var rect;\n    \n    //$LASTPOS=11004952;\n    if (_this.x==null||_this.y==null||_this._isInvisible) {\n      return _this;\n    }\n    //$LASTPOS=11005005;\n    _this.detectShape();\n    //$LASTPOS=11005025;\n    if (_this.pImg) {\n      //$LASTPOS=11005046;\n      ctx.save();\n      //$LASTPOS=11005067;\n      ctx.translate(_this.x,_this.y);\n      //$LASTPOS=11005211;\n      _this.animation();\n      //$LASTPOS=11005233;\n      if (_this.rotation!=0) {\n        //$LASTPOS=11005268;\n        ctx.rotate(_this.rotation/180*Math.PI);\n        \n      } else {\n        //$LASTPOS=11005336;\n        ctx.rotate(_this.rotate/180*Math.PI);\n        \n      }\n      //$LASTPOS=11005393;\n      if (typeof  _this.scaleY==="undefined") {\n        //$LASTPOS=11005445;\n        ctx.scale(_this.scaleX,_this.scaleX);\n        \n      } else {\n        //$LASTPOS=11005510;\n        ctx.scale(_this.scaleX,_this.scaleY);\n        \n      }\n      //$LASTPOS=11005566;\n      ctx.globalAlpha=_this.alpha/255;\n      //$LASTPOS=11005607;\n      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);\n      //$LASTPOS=11005739;\n      ctx.restore();\n      \n    } else {\n      //$LASTPOS=11005766;\n      if (_this.text!==null&&_this.text!==undefined) {\n        //$LASTPOS=11005814;\n        if (! _this.size) {\n          //$LASTPOS=11005825;\n          _this.size=15;\n        }\n        //$LASTPOS=11005843;\n        if (! _this.align) {\n          //$LASTPOS=11005855;\n          _this.align="center";\n        }\n        //$LASTPOS=11005880;\n        if (! _this.fillStyle) {\n          //$LASTPOS=11005896;\n          _this.fillStyle="white";\n        }\n        //$LASTPOS=11005924;\n        ctx.fillStyle=_this.fillStyle;\n        //$LASTPOS=11005958;\n        ctx.globalAlpha=_this.alpha/255;\n        //$LASTPOS=11005999;\n        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");\n        //$LASTPOS=11006070;\n        _this.width=rect.w;\n        //$LASTPOS=11006093;\n        _this.height=rect.h;\n        \n      }\n    }\n    //$LASTPOS=11006120;\n    if (_this._fukidashi) {\n      //$LASTPOS=11006147;\n      if (_this._fukidashi.c>0) {\n        //$LASTPOS=11006182;\n        _this._fukidashi.c--;\n        //$LASTPOS=11006211;\n        ctx.fillStyle="white";\n        //$LASTPOS=11006247;\n        ctx.strokeStyle="black";\n        //$LASTPOS=11006285;\n        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);\n        \n      }\n      \n    }\n  },\n  asyncResult :function _trc_func_11006392_34() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Tonyu.asyncResult();\n  },\n  screenOut :function _trc_func_11006455_35(a) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var r;\n    var viewX;\n    var viewY;\n    \n    //$LASTPOS=11006508;\n    if (! a) {\n      //$LASTPOS=11006516;\n      a=0;\n    }\n    //$LASTPOS=11006526;\n    r = 0;\n    //$LASTPOS=11006540;\n    viewX = 0;viewY = 0;\n    //$LASTPOS=11006566;\n    if (_this.x<viewX+a) {\n      //$LASTPOS=11006595;\n      r+=viewX+a-_this.x;\n    }\n    //$LASTPOS=11006614;\n    if (_this.y<viewY+a) {\n      //$LASTPOS=11006643;\n      r+=viewY+a-_this.y;\n    }\n    //$LASTPOS=11006662;\n    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {\n      //$LASTPOS=11006691;\n      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);\n    }\n    //$LASTPOS=11006726;\n    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {\n      //$LASTPOS=11006755;\n      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);\n    }\n    return r;\n  },\n  fiber$screenOut :function _trc_func_11006455_36(_thread,a) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var r;\n    var viewX;\n    var viewY;\n    \n    //$LASTPOS=11006508;\n    if (! a) {\n      //$LASTPOS=11006516;\n      a=0;\n    }\n    //$LASTPOS=11006526;\n    r = 0;\n    //$LASTPOS=11006540;\n    viewX = 0;viewY = 0;\n    //$LASTPOS=11006566;\n    if (_this.x<viewX+a) {\n      //$LASTPOS=11006595;\n      r+=viewX+a-_this.x;\n    }\n    //$LASTPOS=11006614;\n    if (_this.y<viewY+a) {\n      //$LASTPOS=11006643;\n      r+=viewY+a-_this.y;\n    }\n    //$LASTPOS=11006662;\n    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {\n      //$LASTPOS=11006691;\n      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);\n    }\n    //$LASTPOS=11006726;\n    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {\n      //$LASTPOS=11006755;\n      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);\n    }\n    _thread.retVal=r;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  file :function _trc_func_11006804_37(path) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var d;\n    var files;\n    \n    //$LASTPOS=11006823;\n    d = Tonyu.currentProject.getDir();\n    //$LASTPOS=11006865;\n    files = d.rel("files/");\n    return FS.get(files.rel(path),{topDir: d});\n  },\n  fiber$file :function _trc_func_11006804_38(_thread,path) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var d;\n    var files;\n    \n    //$LASTPOS=11006823;\n    d = Tonyu.currentProject.getDir();\n    //$LASTPOS=11006865;\n    files = d.rel("files/");\n    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  waitInputDevice :function _trc_func_11006944_39(fl) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11006972;\n    if (fl!==false) {\n      //$LASTPOS=11006999;\n      if (! _this.origTG) {\n        \n        \n      }\n      //$LASTPOS=11007151;\n      _this.a=_this.asyncResult();\n      //$LASTPOS=11007177;\n      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);\n      //$LASTPOS=11007231;\n      _this.waitFor(_this.a);\n      \n    } else {\n      //$LASTPOS=11007266;\n      if (_this.origTG) {\n        \n        \n      }\n      \n    }\n  },\n  fiber$waitInputDevice :function _trc_func_11006944_40(_thread,fl) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_11006944_41(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=11006972;\n          if (!(fl!==false)) { __pc=3; break; }\n          //$LASTPOS=11006999;\n          if (!(! _this.origTG)) { __pc=1; break; }\n          {\n            //$LASTPOS=11007053;\n            _this.origTG=_thread.group;\n            //$LASTPOS=11007092;\n            _thread.setGroup(null);\n          }\n        case 1:\n          \n          //$LASTPOS=11007151;\n          _this.a=_this.asyncResult();\n          //$LASTPOS=11007177;\n          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);\n          //$LASTPOS=11007231;\n          _this.fiber$waitFor(_thread, _this.a);\n          __pc=2;return;\n        case 2:\n          \n          __pc=5;break;\n        case 3:\n          //$LASTPOS=11007266;\n          if (!(_this.origTG)) { __pc=4; break; }\n          {\n            //$LASTPOS=11007319;\n            _thread.setGroup(_this.origTG);\n            //$LASTPOS=11007362;\n            _this.origTG=null;\n          }\n        case 4:\n          \n        case 5:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  redrawScreen :function _trc_func_11007412_42() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11007435;\n    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n    //$LASTPOS=11007471;\n    Tonyu.globals.$Screen.draw();\n  },\n  fiber$redrawScreen :function _trc_func_11007412_43(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=11007435;\n    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n    //$LASTPOS=11007471;\n    Tonyu.globals.$Screen.draw();\n    \n    _thread.retVal=_this;return;\n  },\n  color :function _trc_func_11007512_44(r,g,b) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return "rgb("+[r,g,b].join(",")+")";\n  },\n  fiber$color :function _trc_func_11007512_45(_thread,r,g,b) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  drawText :function _trc_func_11007574_46(x,y,text,col,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var tp;\n    \n    //$LASTPOS=11007610;\n    if (Tonyu.globals.$debug) {\n      return _this;\n    }\n    //$LASTPOS=11007635;\n    if (! size) {\n      //$LASTPOS=11007646;\n      size=15;\n    }\n    //$LASTPOS=11007660;\n    if (! col) {\n      //$LASTPOS=11007670;\n      col="cyan";\n    }\n    //$LASTPOS=11007687;\n    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=11007741;\n    if (tp.length>0) {\n      //$LASTPOS=11007769;\n      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});\n      \n    } else {\n      //$LASTPOS=11007848;\n      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});\n      \n    }\n  },\n  fiber$drawText :function _trc_func_11007574_47(_thread,x,y,text,col,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var tp;\n    \n    //$LASTPOS=11007610;\n    if (Tonyu.globals.$debug) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=11007635;\n    if (! size) {\n      //$LASTPOS=11007646;\n      size=15;\n    }\n    //$LASTPOS=11007660;\n    if (! col) {\n      //$LASTPOS=11007670;\n      col="cyan";\n    }\n    //$LASTPOS=11007687;\n    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=11007741;\n    if (tp.length>0) {\n      //$LASTPOS=11007769;\n      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});\n      \n    } else {\n      //$LASTPOS=11007848;\n      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  drawLine :function _trc_func_11007903_48(x,y,tx,ty,col) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var tp;\n    \n    //$LASTPOS=11007935;\n    if (! col) {\n      //$LASTPOS=11007945;\n      col="white";\n    }\n    //$LASTPOS=11007963;\n    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=11008017;\n    if (tp.length>0) {\n      //$LASTPOS=11008045;\n      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});\n      \n    } else {\n      //$LASTPOS=11008110;\n      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    }\n  },\n  fiber$drawLine :function _trc_func_11007903_49(_thread,x,y,tx,ty,col) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var tp;\n    \n    //$LASTPOS=11007935;\n    if (! col) {\n      //$LASTPOS=11007945;\n      col="white";\n    }\n    //$LASTPOS=11007963;\n    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=11008017;\n    if (tp.length>0) {\n      //$LASTPOS=11008045;\n      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});\n      \n    } else {\n      //$LASTPOS=11008110;\n      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  loadPage :function _trc_func_11008150_50(page,arg) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11008176;\n    _this.all().die();\n    //$LASTPOS=11008194;\n    new page(arg);\n    //$LASTPOS=11008214;\n    _this.die();\n  },\n  fiber$loadPage :function _trc_func_11008150_51(_thread,page,arg) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=11008176;\n    _this.all().die();\n    //$LASTPOS=11008194;\n    new page(arg);\n    //$LASTPOS=11008214;\n    _this.die();\n    \n    _thread.retVal=_this;return;\n  },\n  setVisible :function _trc_func_11008227_52(v) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=11008249;\n    _this._isInvisible=! v;\n  },\n  fiber$setVisible :function _trc_func_11008227_53(_thread,v) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=11008249;\n    _this._isInvisible=! v;\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Keys=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{\n  main :function _trc_func_12000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    \n    //$LASTPOS=12000084;\n    _this.stats={};\n    //$LASTPOS=12000094;\n    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};\n    //$LASTPOS=12000212;\n    //$LASTPOS=12000217;\n    i = 65;\n    while(i<65+26) {\n      {\n        //$LASTPOS=12000248;\n        _this.codes[String.fromCharCode(i).toLowerCase()]=i;\n      }\n      i++;\n    }\n    //$LASTPOS=12000297;\n    //$LASTPOS=12000302;\n    i = 48;\n    while(i<58) {\n      {\n        //$LASTPOS=12000330;\n        _this.codes[String.fromCharCode(i)]=i;\n      }\n      i++;\n    }\n    //$LASTPOS=12000365;\n    if (! $.data(document,"key_event")) {\n      //$LASTPOS=12000406;\n      $.data(document,"key_event",true);\n      //$LASTPOS=12000445;\n      $(document).keydown(function (e) {\n        \n        //$LASTPOS=12000471;\n        Tonyu.globals.$Keys.keydown(e);\n      });\n      //$LASTPOS=12000495;\n      $(document).keyup(function (e) {\n        \n        //$LASTPOS=12000519;\n        Tonyu.globals.$Keys.keyup(e);\n      });\n      //$LASTPOS=12000541;\n      $(document).mousedown(function (e) {\n        \n        //$LASTPOS=12000578;\n        if (Tonyu.globals.$InputDevice.touchEmu) {\n          //$LASTPOS=12000619;\n          Tonyu.globals.$touches[0].touched=1;\n          \n        }\n        //$LASTPOS=12000660;\n        Tonyu.globals.$Keys.keydown({keyCode: 1});\n      });\n      //$LASTPOS=12000697;\n      $(document).mouseup(function (e) {\n        \n        //$LASTPOS=12000732;\n        if (Tonyu.globals.$InputDevice.touchEmu) {\n          //$LASTPOS=12000773;\n          Tonyu.globals.$touches[0].touched=0;\n          \n        }\n        //$LASTPOS=12000814;\n        Tonyu.globals.$Keys.keyup({keyCode: 1});\n      });\n      \n    }\n  },\n  fiber$main :function _trc_func_12000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    \n    //$LASTPOS=12000084;\n    _this.stats={};\n    //$LASTPOS=12000094;\n    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};\n    //$LASTPOS=12000212;\n    //$LASTPOS=12000217;\n    i = 65;\n    while(i<65+26) {\n      {\n        //$LASTPOS=12000248;\n        _this.codes[String.fromCharCode(i).toLowerCase()]=i;\n      }\n      i++;\n    }\n    //$LASTPOS=12000297;\n    //$LASTPOS=12000302;\n    i = 48;\n    while(i<58) {\n      {\n        //$LASTPOS=12000330;\n        _this.codes[String.fromCharCode(i)]=i;\n      }\n      i++;\n    }\n    //$LASTPOS=12000365;\n    if (! $.data(document,"key_event")) {\n      //$LASTPOS=12000406;\n      $.data(document,"key_event",true);\n      //$LASTPOS=12000445;\n      $(document).keydown(function (e) {\n        \n        //$LASTPOS=12000471;\n        Tonyu.globals.$Keys.keydown(e);\n      });\n      //$LASTPOS=12000495;\n      $(document).keyup(function (e) {\n        \n        //$LASTPOS=12000519;\n        Tonyu.globals.$Keys.keyup(e);\n      });\n      //$LASTPOS=12000541;\n      $(document).mousedown(function (e) {\n        \n        //$LASTPOS=12000578;\n        if (Tonyu.globals.$InputDevice.touchEmu) {\n          //$LASTPOS=12000619;\n          Tonyu.globals.$touches[0].touched=1;\n          \n        }\n        //$LASTPOS=12000660;\n        Tonyu.globals.$Keys.keydown({keyCode: 1});\n      });\n      //$LASTPOS=12000697;\n      $(document).mouseup(function (e) {\n        \n        //$LASTPOS=12000732;\n        if (Tonyu.globals.$InputDevice.touchEmu) {\n          //$LASTPOS=12000773;\n          Tonyu.globals.$touches[0].touched=0;\n          \n        }\n        //$LASTPOS=12000814;\n        Tonyu.globals.$Keys.keyup({keyCode: 1});\n      });\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  getkey :function _trc_func_12000847_2(code) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=12000875;\n    if (typeof  code=="string") {\n      //$LASTPOS=12000912;\n      code=_this.codes[code.toLowerCase()];\n      \n    }\n    //$LASTPOS=12000954;\n    if (! code) {\n      return 0;\n    }\n    //$LASTPOS=12000979;\n    if (_this.stats[code]==- 1) {\n      return 0;\n    }\n    //$LASTPOS=12001014;\n    if (! _this.stats[code]) {\n      //$LASTPOS=12001032;\n      _this.stats[code]=0;\n    }\n    return _this.stats[code];\n  },\n  fiber$getkey :function _trc_func_12000847_3(_thread,code) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=12000875;\n    if (typeof  code=="string") {\n      //$LASTPOS=12000912;\n      code=_this.codes[code.toLowerCase()];\n      \n    }\n    //$LASTPOS=12000954;\n    if (! code) {\n      _thread.retVal=0;return;\n      \n    }\n    //$LASTPOS=12000979;\n    if (_this.stats[code]==- 1) {\n      _thread.retVal=0;return;\n      \n    }\n    //$LASTPOS=12001014;\n    if (! _this.stats[code]) {\n      //$LASTPOS=12001032;\n      _this.stats[code]=0;\n    }\n    _thread.retVal=_this.stats[code];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  update :function _trc_func_12001073_4() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    var _it_133;\n    \n    //$LASTPOS=12001097;\n    _it_133=Tonyu.iterator(_this.stats,1);\n    while(_it_133.next()) {\n      i=_it_133[0];\n      \n      //$LASTPOS=12001128;\n      if (_this.stats[i]>0) {\n        //$LASTPOS=12001145;\n        _this.stats[i]++;\n        \n      }\n      //$LASTPOS=12001166;\n      if (_this.stats[i]==- 1) {\n        //$LASTPOS=12001184;\n        _this.stats[i]=1;\n      }\n      \n    }\n  },\n  fiber$update :function _trc_func_12001073_5(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    var _it_133;\n    \n    //$LASTPOS=12001097;\n    _it_133=Tonyu.iterator(_this.stats,1);\n    while(_it_133.next()) {\n      i=_it_133[0];\n      \n      //$LASTPOS=12001128;\n      if (_this.stats[i]>0) {\n        //$LASTPOS=12001145;\n        _this.stats[i]++;\n        \n      }\n      //$LASTPOS=12001166;\n      if (_this.stats[i]==- 1) {\n        //$LASTPOS=12001184;\n        _this.stats[i]=1;\n      }\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  keydown :function _trc_func_12001204_6(e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var s;\n    \n    //$LASTPOS=12001222;\n    s = _this.stats[e.keyCode];\n    //$LASTPOS=12001250;\n    if (! s) {\n      //$LASTPOS=12001268;\n      _this.stats[e.keyCode]=1;\n      \n    }\n    //$LASTPOS=12001298;\n    Tonyu.globals.$InputDevice.handleListeners();\n  },\n  fiber$keydown :function _trc_func_12001204_7(_thread,e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var s;\n    \n    //$LASTPOS=12001222;\n    s = _this.stats[e.keyCode];\n    //$LASTPOS=12001250;\n    if (! s) {\n      //$LASTPOS=12001268;\n      _this.stats[e.keyCode]=1;\n      \n    }\n    //$LASTPOS=12001298;\n    Tonyu.globals.$InputDevice.handleListeners();\n    \n    _thread.retVal=_this;return;\n  },\n  keyup :function _trc_func_12001332_8(e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=12001348;\n    _this.stats[e.keyCode]=0;\n    //$LASTPOS=12001372;\n    Tonyu.globals.$InputDevice.handleListeners();\n  },\n  fiber$keyup :function _trc_func_12001332_9(_thread,e) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=12001348;\n    _this.stats[e.keyCode]=0;\n    //$LASTPOS=12001372;\n    Tonyu.globals.$InputDevice.handleListeners();\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.MML=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{\n  main :function _trc_func_13000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=13000050;\n    _this.mmlBuf=[];\n  },\n  fiber$main :function _trc_func_13000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=13000050;\n    _this.mmlBuf=[];\n    \n    _thread.retVal=_this;return;\n  },\n  play :function _trc_func_13000062_2(mmls) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=13000081;\n    _this.mmlBuf.push(mmls);\n    //$LASTPOS=13000105;\n    if (! _this.isPlaying()) {\n      //$LASTPOS=13000134;\n      _this.playNext();\n      \n    }\n  },\n  fiber$play :function _trc_func_13000062_3(_thread,mmls) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=13000081;\n    _this.mmlBuf.push(mmls);\n    \n    _thread.enter(function _trc_func_13000062_4(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=13000105;\n          if (!(! _this.isPlaying())) { __pc=2; break; }\n          //$LASTPOS=13000134;\n          _this.fiber$playNext(_thread);\n          __pc=1;return;\n        case 1:\n          \n        case 2:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  playNext :function _trc_func_13000157_5() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var mml;\n    \n    //$LASTPOS=13000220;\n    if (_this.cTimeBase==null) {\n      //$LASTPOS=13000241;\n      _this.cTimeBase=0;\n    }\n    //$LASTPOS=13000259;\n    if (_this.m) {\n      //$LASTPOS=13000277;\n      _this.cTimeBase+=_this.m.currentTime;\n      \n    }\n    //$LASTPOS=13000348;\n    mml = _this.mmlBuf.shift();\n    //$LASTPOS=13000377;\n    if (! mml) {\n      //$LASTPOS=13000398;\n      _this.m=null;\n      //$LASTPOS=13000415;\n      _this.cTimeBase=0;\n      return _this;\n      \n    }\n    //$LASTPOS=13000457;\n    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();\n    //$LASTPOS=13000495;\n    _this.m=T("mml",{mml: mml},_this.mwav);\n    //$LASTPOS=13000525;\n    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));\n    //$LASTPOS=13000555;\n    _this.m.start();\n    //$LASTPOS=13000571;\n    Tonyu.globals.$MMLS[_this.id()]=_this;\n  },\n  fiber$playNext :function _trc_func_13000157_6(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var mml;\n    \n    //$LASTPOS=13000220;\n    if (_this.cTimeBase==null) {\n      //$LASTPOS=13000241;\n      _this.cTimeBase=0;\n    }\n    //$LASTPOS=13000259;\n    if (_this.m) {\n      //$LASTPOS=13000277;\n      _this.cTimeBase+=_this.m.currentTime;\n      \n    }\n    //$LASTPOS=13000348;\n    mml = _this.mmlBuf.shift();\n    //$LASTPOS=13000377;\n    if (! mml) {\n      //$LASTPOS=13000398;\n      _this.m=null;\n      //$LASTPOS=13000415;\n      _this.cTimeBase=0;\n      _thread.retVal=_this;return;\n      \n      \n    }\n    //$LASTPOS=13000457;\n    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();\n    //$LASTPOS=13000495;\n    _this.m=T("mml",{mml: mml},_this.mwav);\n    //$LASTPOS=13000525;\n    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));\n    //$LASTPOS=13000555;\n    _this.m.start();\n    //$LASTPOS=13000571;\n    Tonyu.globals.$MMLS[_this.id()]=_this;\n    \n    _thread.retVal=_this;return;\n  },\n  id :function _trc_func_13000593_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=13000606;\n    if (! _this._id) {\n      //$LASTPOS=13000616;\n      _this._id=_this.rnd()+"";\n    }\n    return _this._id;\n  },\n  fiber$id :function _trc_func_13000593_8(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=13000606;\n    if (! _this._id) {\n      //$LASTPOS=13000616;\n      _this._id=_this.rnd()+"";\n    }\n    _thread.retVal=_this._id;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  bufferCount :function _trc_func_13000651_9() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.mmlBuf.length;\n  },\n  fiber$bufferCount :function _trc_func_13000651_10(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.mmlBuf.length;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  isPlaying :function _trc_func_13000699_11() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.m;\n  },\n  fiber$isPlaying :function _trc_func_13000699_12(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.m;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  currentTime :function _trc_func_13000733_13() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=13000755;\n    if (_this.m) {\n      return _this.m.currentTime+_this.cTimeBase;\n    }\n    return - 1;\n  },\n  fiber$currentTime :function _trc_func_13000733_14(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=13000755;\n    if (_this.m) {\n      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;\n      \n    }\n    _thread.retVal=- 1;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  stop :function _trc_func_13000814_15() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=13000829;\n    if (_this.m) {\n      //$LASTPOS=13000847;\n      if (_this.mwav) {\n        //$LASTPOS=13000872;\n        _this.mwav.pause();\n        //$LASTPOS=13000899;\n        _this.mwav.stop();\n        \n      }\n      //$LASTPOS=13000932;\n      _this.m.pause();\n      //$LASTPOS=13000952;\n      _this.m.stop();\n      //$LASTPOS=13000971;\n      _this.m=null;\n      //$LASTPOS=13000988;\n      _this.mmlBuf=[];\n      //$LASTPOS=13001056;\n      delete Tonyu.globals.$MMLS[_this.id()];\n      \n    }\n  },\n  fiber$stop :function _trc_func_13000814_16(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=13000829;\n    if (_this.m) {\n      //$LASTPOS=13000847;\n      if (_this.mwav) {\n        //$LASTPOS=13000872;\n        _this.mwav.pause();\n        //$LASTPOS=13000899;\n        _this.mwav.stop();\n        \n      }\n      //$LASTPOS=13000932;\n      _this.m.pause();\n      //$LASTPOS=13000952;\n      _this.m.stop();\n      //$LASTPOS=13000971;\n      _this.m=null;\n      //$LASTPOS=13000988;\n      _this.mmlBuf=[];\n      //$LASTPOS=13001056;\n      delete Tonyu.globals.$MMLS[_this.id()];\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{\n  main :function _trc_func_14000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_14000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  sleep :function _trc_func_14000034_2(n) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000050;\n    if (! n) {\n      //$LASTPOS=14000057;\n      n=1;\n    }\n    //$LASTPOS=14000066;\n    //$LASTPOS=14000070;\n    n;\n    while(n>0) {\n      //$LASTPOS=14000081;\n      _this.update();\n      n--;\n    }\n  },\n  fiber$sleep :function _trc_func_14000034_3(_thread,n) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=14000050;\n    if (! n) {\n      //$LASTPOS=14000057;\n      n=1;\n    }\n    \n    _thread.enter(function _trc_func_14000034_4(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=14000066;\n          //$LASTPOS=14000070;\n          n;;\n        case 1:\n          if (!(n>0)) { __pc=3; break; }\n          //$LASTPOS=14000081;\n          _this.fiber$update(_thread);\n          __pc=2;return;\n        case 2:\n          \n          n--;\n          __pc=1;break;\n        case 3:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initSprite :function _trc_func_14000093_5() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000113;\n    if (! _this._sprite) {\n      //$LASTPOS=14000137;\n      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});\n      //$LASTPOS=14000207;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n  },\n  fiber$initSprite :function _trc_func_14000093_6(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=14000113;\n    if (! _this._sprite) {\n      //$LASTPOS=14000137;\n      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});\n      //$LASTPOS=14000207;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  say :function _trc_func_14000235_7(text,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000257;\n    if (! size) {\n      //$LASTPOS=14000268;\n      size=15;\n    }\n    //$LASTPOS=14000281;\n    _this.initSprite();\n    //$LASTPOS=14000299;\n    _this._sprite._fukidashi={text: text,size: size,c: 30};\n  },\n  fiber$say :function _trc_func_14000235_8(_thread,text,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=14000257;\n    if (! size) {\n      //$LASTPOS=14000268;\n      size=15;\n    }\n    \n    _thread.enter(function _trc_func_14000235_9(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=14000281;\n          _this.fiber$initSprite(_thread);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=14000299;\n          _this._sprite._fukidashi={text: text,size: size,c: 30};\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  sprite :function _trc_func_14000350_10(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000371;\n    _this.go(x,y,p);\n  },\n  fiber$sprite :function _trc_func_14000350_11(_thread,x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_14000350_12(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=14000371;\n          _this.fiber$go(_thread, x, y, p);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  show :function _trc_func_14000384_13(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000403;\n    _this.go(x,y,p);\n  },\n  draw :function _trc_func_14000416_14(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000440;\n    _this._sprite.draw(ctx);\n  },\n  getCrashRect :function _trc_func_14000461_15() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this._sprite.getCrashRect();\n  },\n  go :function _trc_func_14000516_16(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000533;\n    _this.initSprite();\n    //$LASTPOS=14000551;\n    _this._sprite.x=x;\n    //$LASTPOS=14000568;\n    _this._sprite.y=y;\n    //$LASTPOS=14000585;\n    if (p!=null) {\n      //$LASTPOS=14000598;\n      _this._sprite.p=p;\n    }\n  },\n  fiber$go :function _trc_func_14000516_17(_thread,x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_14000516_18(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=14000533;\n          _this.fiber$initSprite(_thread);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=14000551;\n          _this._sprite.x=x;\n          //$LASTPOS=14000568;\n          _this._sprite.y=y;\n          //$LASTPOS=14000585;\n          if (p!=null) {\n            //$LASTPOS=14000598;\n            _this._sprite.p=p;\n          }\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  change :function _trc_func_14000629_19(p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=14000646;\n    _this.initSprite();\n    //$LASTPOS=14000664;\n    _this._sprite.p=p;\n  },\n  fiber$change :function _trc_func_14000629_20(_thread,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_14000629_21(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=14000646;\n          _this.fiber$initSprite(_thread);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=14000664;\n          _this._sprite.p=p;\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.NoviceActor,{"fullName":"kernel.NoviceActor","namespace":"kernel","shortName":"NoviceActor","decls":{"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.PlayMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{\n  main :function _trc_func_15000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_15000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initMML :function _trc_func_15000020_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=15000045;\n    if (_this.mmlInited) {\n      return _this;\n    }\n    //$LASTPOS=15000073;\n    _this.mmlInited=true;\n    //$LASTPOS=15000094;\n    Tonyu.globals.$currentProject.requestPlugin("timbre");\n    //$LASTPOS=15000140;\n    if (! Tonyu.globals.$MMLS) {\n      //$LASTPOS=15000162;\n      Tonyu.globals.$MMLS={};\n      //$LASTPOS=15000180;\n      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;\n      //$LASTPOS=15000214;\n      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));\n      \n    }\n    //$LASTPOS=15000256;\n    _this.on("die",function () {\n      \n      //$LASTPOS=15000272;\n      _this.play().stop();\n    });\n  },\n  releaseMML :function _trc_func_15000294_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var k;\n    var v;\n    var _it_138;\n    \n    //$LASTPOS=15000322;\n    if (Tonyu.globals.$MMLS) {\n      //$LASTPOS=15000343;\n      _it_138=Tonyu.iterator(Tonyu.globals.$MMLS,2);\n      while(_it_138.next()) {\n        k=_it_138[0];\n        v=_it_138[1];\n        \n        //$LASTPOS=15000379;\n        v.stop();\n        \n      }\n      //$LASTPOS=15000407;\n      Tonyu.globals.$MMLS=null;\n      \n    }\n    //$LASTPOS=15000432;\n    if (Tonyu.globals.$WaveTable) {\n      //$LASTPOS=15000458;\n      Tonyu.globals.$WaveTable.stop();\n      //$LASTPOS=15000485;\n      Tonyu.globals.$WaveTable=null;\n      \n    }\n  },\n  play :function _trc_func_15000513_4() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var mmls;\n    var i;\n    \n    //$LASTPOS=15000528;\n    _this.initMML();\n    //$LASTPOS=15000544;\n    if (! _this._mml) {\n      //$LASTPOS=15000555;\n      _this._mml=new Tonyu.classes.kernel.MML;\n    }\n    //$LASTPOS=15000574;\n    if (_this.isDead()||arguments.length==0) {\n      return _this._mml;\n    }\n    //$LASTPOS=15000629;\n    mmls = [];\n    //$LASTPOS=15000647;\n    //$LASTPOS=15000652;\n    i = 0;\n    while(i<arguments.length) {\n      {\n        //$LASTPOS=15000697;\n        mmls.push(arguments[i]);\n      }\n      i++;\n    }\n    //$LASTPOS=15000734;\n    _this._mml.play(mmls);\n    //$LASTPOS=15000756;\n    while (_this._mml.bufferCount()>2) {\n      //$LASTPOS=15000796;\n      _this.update();\n      \n    }\n    return _this._mml;\n  },\n  fiber$play :function _trc_func_15000513_5(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var mmls;\n    var i;\n    \n    //$LASTPOS=15000528;\n    _this.initMML();\n    //$LASTPOS=15000544;\n    if (! _this._mml) {\n      //$LASTPOS=15000555;\n      _this._mml=new Tonyu.classes.kernel.MML;\n    }\n    //$LASTPOS=15000574;\n    if (_this.isDead()||_arguments.length==0) {\n      _thread.retVal=_this._mml;return;\n      \n    }\n    //$LASTPOS=15000629;\n    mmls = [];\n    //$LASTPOS=15000647;\n    //$LASTPOS=15000652;\n    i = 0;\n    while(i<_arguments.length) {\n      {\n        //$LASTPOS=15000697;\n        mmls.push(_arguments[i]);\n      }\n      i++;\n    }\n    //$LASTPOS=15000734;\n    _this._mml.play(mmls);\n    \n    _thread.enter(function _trc_func_15000513_6(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=15000756;\n        case 1:\n          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }\n          //$LASTPOS=15000796;\n          _this.fiber$update(_thread);\n          __pc=2;return;\n        case 2:\n          \n          __pc=1;break;\n        case 3:\n          \n          _thread.exit(_this._mml);return;\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  playSE :function _trc_func_15000835_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var mml;\n    var mmls;\n    var i;\n    \n    //$LASTPOS=15000859;\n    _this.initMML();\n    //$LASTPOS=15000875;\n    mml = new Tonyu.classes.kernel.MML;\n    //$LASTPOS=15000897;\n    mmls = [];\n    //$LASTPOS=15000915;\n    //$LASTPOS=15000920;\n    i = 0;\n    while(i<arguments.length) {\n      {\n        //$LASTPOS=15000965;\n        mmls.push(arguments[i]);\n      }\n      i++;\n    }\n    //$LASTPOS=15001002;\n    mml.play(mmls);\n    return mml;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod],{\n  main :function _trc_func_16000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_16000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_16000073_2(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=16000092;\n    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);\n    //$LASTPOS=16000111;\n    if (Tonyu.runMode) {\n      //$LASTPOS=16000130;\n      _this.initSprite();\n    }\n  },\n  initSprite :function _trc_func_16000148_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=16000169;\n    if (_this.layer&&typeof  _this.layer.add=="function") {\n      //$LASTPOS=16000221;\n      _this.layer.add(_this);\n      \n    } else {\n      //$LASTPOS=16000259;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    //$LASTPOS=16000291;\n    _this.onAppear();\n  },\n  fiber$initSprite :function _trc_func_16000148_4(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=16000169;\n    if (_this.layer&&typeof  _this.layer.add=="function") {\n      //$LASTPOS=16000221;\n      _this.layer.add(_this);\n      \n    } else {\n      //$LASTPOS=16000259;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    \n    _thread.enter(function _trc_func_16000148_5(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=16000291;\n          _this.fiber$onAppear(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  onAppear :function _trc_func_16000307_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$onAppear :function _trc_func_16000307_7(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.BodyActor=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{\n  main :function _trc_func_17000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_17000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getWorld :function _trc_func_17000046_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=17000064;\n    if (Tonyu.globals.$t2World) {\n      return Tonyu.globals.$t2World;\n    }\n    //$LASTPOS=17000099;\n    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;\n    return Tonyu.globals.$t2World;\n  },\n  fiber$getWorld :function _trc_func_17000046_3(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=17000064;\n    if (Tonyu.globals.$t2World) {\n      _thread.retVal=Tonyu.globals.$t2World;return;\n      \n    }\n    //$LASTPOS=17000099;\n    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;\n    _thread.retVal=Tonyu.globals.$t2World;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  onAppear :function _trc_func_17000144_4() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b2Vec2;\n    var b2BodyDef;\n    var b2Body;\n    var b2FixtureDef;\n    var b2Fixture;\n    var b2PolygonShape;\n    var b2CircleShape;\n    var fixDef;\n    var bodyDef;\n    var w;\n    var h;\n    \n    //$LASTPOS=17000162;\n    _this.world=_this.getWorld().world;\n    //$LASTPOS=17000190;\n    _this.scale=_this.getWorld().scale;\n    //$LASTPOS=17000218;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17000261;\n    b2BodyDef = Box2D.Dynamics.b2BodyDef;\n    //$LASTPOS=17000307;\n    b2Body = Box2D.Dynamics.b2Body;\n    //$LASTPOS=17000347;\n    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n    //$LASTPOS=17000399;\n    b2Fixture = Box2D.Dynamics.b2Fixture;\n    //$LASTPOS=17000445;\n    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n    //$LASTPOS=17000509;\n    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n    //$LASTPOS=17000576;\n    fixDef = new b2FixtureDef;\n    //$LASTPOS=17000611;\n    fixDef.density=_this.density||1;\n    //$LASTPOS=17000648;\n    fixDef.friction=_this.friction||0.5;\n    //$LASTPOS=17000687;\n    fixDef.restitution=_this.restitution||0.2;\n    //$LASTPOS=17000737;\n    bodyDef = new b2BodyDef;\n    //$LASTPOS=17000770;\n    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;\n    //$LASTPOS=17000855;\n    bodyDef.position.x=_this.x/_this.scale;\n    //$LASTPOS=17000890;\n    bodyDef.position.y=_this.y/_this.scale;\n    //$LASTPOS=17000925;\n    _this.shape=_this.shape||(_this.radius?"circle":"box");\n    //$LASTPOS=17000973;\n    w = _this.width;h = _this.height;\n    //$LASTPOS=17000999;\n    if (! w) {\n      //$LASTPOS=17001017;\n      _this.detectShape();\n      //$LASTPOS=17001040;\n      w=_this.width*(_this.scaleX||1);\n      //$LASTPOS=17001069;\n      h=_this.height*(_this.scaleY||_this.scaleX||1);\n      \n    }\n    //$LASTPOS=17001109;\n    if (_this.shape=="box") {\n      //$LASTPOS=17001137;\n      if (! h) {\n        //$LASTPOS=17001145;\n        h=w;\n      }\n      //$LASTPOS=17001158;\n      fixDef.shape=new b2PolygonShape;\n      //$LASTPOS=17001201;\n      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);\n      \n    } else {\n      //$LASTPOS=17001302;\n      _this.radius=_this.radius||w/2||16;\n      //$LASTPOS=17001338;\n      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);\n      //$LASTPOS=17001412;\n      _this.width=_this.height=_this.radius*2;\n      \n    }\n    //$LASTPOS=17001446;\n    _this.body=_this.world.CreateBody(bodyDef);\n    //$LASTPOS=17001482;\n    _this.body.CreateFixture(fixDef);\n    //$LASTPOS=17001514;\n    _this.body.SetUserData(_this);\n    //$LASTPOS=17001542;\n    _this.body.SetAngle(_this.rad(_this.rotation));\n  },\n  fiber$onAppear :function _trc_func_17000144_5(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b2Vec2;\n    var b2BodyDef;\n    var b2Body;\n    var b2FixtureDef;\n    var b2Fixture;\n    var b2PolygonShape;\n    var b2CircleShape;\n    var fixDef;\n    var bodyDef;\n    var w;\n    var h;\n    \n    //$LASTPOS=17000162;\n    _this.world=_this.getWorld().world;\n    //$LASTPOS=17000190;\n    _this.scale=_this.getWorld().scale;\n    //$LASTPOS=17000218;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17000261;\n    b2BodyDef = Box2D.Dynamics.b2BodyDef;\n    //$LASTPOS=17000307;\n    b2Body = Box2D.Dynamics.b2Body;\n    //$LASTPOS=17000347;\n    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n    //$LASTPOS=17000399;\n    b2Fixture = Box2D.Dynamics.b2Fixture;\n    //$LASTPOS=17000445;\n    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n    //$LASTPOS=17000509;\n    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n    //$LASTPOS=17000576;\n    fixDef = new b2FixtureDef;\n    //$LASTPOS=17000611;\n    fixDef.density=_this.density||1;\n    //$LASTPOS=17000648;\n    fixDef.friction=_this.friction||0.5;\n    //$LASTPOS=17000687;\n    fixDef.restitution=_this.restitution||0.2;\n    //$LASTPOS=17000737;\n    bodyDef = new b2BodyDef;\n    //$LASTPOS=17000770;\n    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;\n    //$LASTPOS=17000855;\n    bodyDef.position.x=_this.x/_this.scale;\n    //$LASTPOS=17000890;\n    bodyDef.position.y=_this.y/_this.scale;\n    //$LASTPOS=17000925;\n    _this.shape=_this.shape||(_this.radius?"circle":"box");\n    //$LASTPOS=17000973;\n    w = _this.width;h = _this.height;\n    //$LASTPOS=17000999;\n    if (! w) {\n      //$LASTPOS=17001017;\n      _this.detectShape();\n      //$LASTPOS=17001040;\n      w=_this.width*(_this.scaleX||1);\n      //$LASTPOS=17001069;\n      h=_this.height*(_this.scaleY||_this.scaleX||1);\n      \n    }\n    //$LASTPOS=17001109;\n    if (_this.shape=="box") {\n      //$LASTPOS=17001137;\n      if (! h) {\n        //$LASTPOS=17001145;\n        h=w;\n      }\n      //$LASTPOS=17001158;\n      fixDef.shape=new b2PolygonShape;\n      //$LASTPOS=17001201;\n      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);\n      \n    } else {\n      //$LASTPOS=17001302;\n      _this.radius=_this.radius||w/2||16;\n      //$LASTPOS=17001338;\n      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);\n      //$LASTPOS=17001412;\n      _this.width=_this.height=_this.radius*2;\n      \n    }\n    //$LASTPOS=17001446;\n    _this.body=_this.world.CreateBody(bodyDef);\n    //$LASTPOS=17001482;\n    _this.body.CreateFixture(fixDef);\n    //$LASTPOS=17001514;\n    _this.body.SetUserData(_this);\n    //$LASTPOS=17001542;\n    _this.body.SetAngle(_this.rad(_this.rotation));\n    \n    _thread.retVal=_this;return;\n  },\n  allContact :function _trc_func_17001574_6(klass) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    var c;\n    var a;\n    var b;\n    \n    //$LASTPOS=17001599;\n    res = [];\n    //$LASTPOS=17001615;\n    //$LASTPOS=17001620;\n    c = _this.world.GetContactList();\n    while(c) {\n      {\n        //$LASTPOS=17001676;\n        if (c.IsTouching()) {\n          //$LASTPOS=17001710;\n          a = c.GetFixtureA().GetBody().GetUserData();\n          //$LASTPOS=17001769;\n          b = c.GetFixtureB().GetBody().GetUserData();\n          //$LASTPOS=17001828;\n          if (a===_this) {\n            //$LASTPOS=17001860;\n            if (! klass||b===klass||b instanceof klass) {\n              //$LASTPOS=17001929;\n              res.push(b);\n              \n            }\n            \n          } else {\n            //$LASTPOS=17001979;\n            if (b===_this) {\n              //$LASTPOS=17002011;\n              if (! klass||a===klass||a instanceof klass) {\n                //$LASTPOS=17002080;\n                res.push(a);\n                \n              }\n              \n            }\n          }\n          \n        }\n      }\n      c=c.GetNext();\n    }\n    return res;\n  },\n  fiber$allContact :function _trc_func_17001574_7(_thread,klass) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var res;\n    var c;\n    var a;\n    var b;\n    \n    //$LASTPOS=17001599;\n    res = [];\n    //$LASTPOS=17001615;\n    //$LASTPOS=17001620;\n    c = _this.world.GetContactList();\n    while(c) {\n      {\n        //$LASTPOS=17001676;\n        if (c.IsTouching()) {\n          //$LASTPOS=17001710;\n          a = c.GetFixtureA().GetBody().GetUserData();\n          //$LASTPOS=17001769;\n          b = c.GetFixtureB().GetBody().GetUserData();\n          //$LASTPOS=17001828;\n          if (a===_this) {\n            //$LASTPOS=17001860;\n            if (! klass||b===klass||b instanceof klass) {\n              //$LASTPOS=17001929;\n              res.push(b);\n              \n            }\n            \n          } else {\n            //$LASTPOS=17001979;\n            if (b===_this) {\n              //$LASTPOS=17002011;\n              if (! klass||a===klass||a instanceof klass) {\n                //$LASTPOS=17002080;\n                res.push(a);\n                \n              }\n              \n            }\n          }\n          \n        }\n      }\n      c=c.GetNext();\n    }\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  applyForce :function _trc_func_17002159_8(fx,fy,px,py) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b2Vec2;\n    var scale;\n    var fps;\n    \n    //$LASTPOS=17002190;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17002233;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002265;\n    fps = 60;\n    //$LASTPOS=17002281;\n    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());\n  },\n  fiber$applyForce :function _trc_func_17002159_9(_thread,fx,fy,px,py) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b2Vec2;\n    var scale;\n    var fps;\n    \n    //$LASTPOS=17002190;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17002233;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002265;\n    fps = 60;\n    //$LASTPOS=17002281;\n    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());\n    \n    _thread.retVal=_this;return;\n  },\n  applyImpulse :function _trc_func_17002339_10(fx,fy,px,py) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b2Vec2;\n    var scale;\n    var fps;\n    \n    //$LASTPOS=17002372;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17002415;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002447;\n    fps = 60;\n    //$LASTPOS=17002463;\n    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());\n  },\n  fiber$applyImpulse :function _trc_func_17002339_11(_thread,fx,fy,px,py) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b2Vec2;\n    var scale;\n    var fps;\n    \n    //$LASTPOS=17002372;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=17002415;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002447;\n    fps = 60;\n    //$LASTPOS=17002463;\n    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());\n    \n    _thread.retVal=_this;return;\n  },\n  applyTorque :function _trc_func_17002524_12(a) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=17002546;\n    _this.body.ApplyTorque(a);\n  },\n  fiber$applyTorque :function _trc_func_17002524_13(_thread,a) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=17002546;\n    _this.body.ApplyTorque(a);\n    \n    _thread.retVal=_this;return;\n  },\n  moveBy :function _trc_func_17002569_14(dx,dy) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var pos;\n    \n    //$LASTPOS=17002590;\n    pos = _this.body.GetPosition();\n    //$LASTPOS=17002622;\n    pos.x+=dx/_this.scale;\n    //$LASTPOS=17002643;\n    pos.y+=dy/_this.scale;\n    //$LASTPOS=17002664;\n    _this.body.SetPosition(pos);\n  },\n  fiber$moveBy :function _trc_func_17002569_15(_thread,dx,dy) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var pos;\n    \n    //$LASTPOS=17002590;\n    pos = _this.body.GetPosition();\n    //$LASTPOS=17002622;\n    pos.x+=dx/_this.scale;\n    //$LASTPOS=17002643;\n    pos.y+=dy/_this.scale;\n    //$LASTPOS=17002664;\n    _this.body.SetPosition(pos);\n    \n    _thread.retVal=_this;return;\n  },\n  contactTo :function _trc_func_17002689_16(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.allContact(t)[0];\n  },\n  fiber$contactTo :function _trc_func_17002689_17(_thread,t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.allContact(t)[0];return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  die :function _trc_func_17002736_18() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=17002749;\n    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);\n    //$LASTPOS=17002766;\n    _this.world.DestroyBody(_this.body);\n  },\n  updatePos :function _trc_func_17002793_19() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var scale;\n    var pos;\n    \n    //$LASTPOS=17002812;\n    if (! _this.body) {\n      return _this;\n    }\n    //$LASTPOS=17002835;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002867;\n    pos = _this.body.GetPosition();\n    //$LASTPOS=17002899;\n    _this.x=pos.x*scale;\n    //$LASTPOS=17002918;\n    _this.y=pos.y*scale;\n    //$LASTPOS=17002937;\n    _this.rotation=_this.deg(_this.body.GetAngle());\n  },\n  fiber$updatePos :function _trc_func_17002793_20(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var scale;\n    var pos;\n    \n    //$LASTPOS=17002812;\n    if (! _this.body) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=17002835;\n    scale = _this.getWorld().scale;\n    //$LASTPOS=17002867;\n    pos = _this.body.GetPosition();\n    //$LASTPOS=17002899;\n    _this.x=pos.x*scale;\n    //$LASTPOS=17002918;\n    _this.y=pos.y*scale;\n    //$LASTPOS=17002937;\n    _this.rotation=_this.deg(_this.body.GetAngle());\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_18000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18001406;\n    _this.initSprites();\n    //$LASTPOS=18001422;\n    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;\n    //$LASTPOS=18001453;\n    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);\n    //$LASTPOS=18001490;\n    _this.initThread();\n    //$LASTPOS=18001507;\n    Tonyu.globals.$pat_fruits=30;\n    //$LASTPOS=18001524;\n    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;\n    //$LASTPOS=18001541;\n    Tonyu.globals.$Math=Math;\n    //$LASTPOS=18001554;\n    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=18001664;\n    Tonyu.globals.$consolePrintY=465-15;\n    //$LASTPOS=18001688;\n    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=18001828;\n    if (typeof  SplashScreen!="undefined") {\n      //$LASTPOS=18001866;\n      SplashScreen.hide();\n    }\n    //$LASTPOS=18001888;\n    _this.initFPSParams();\n    //$LASTPOS=18001908;\n    while (true) {\n      //$LASTPOS=18001928;\n      _this.thg.steps();\n      //$LASTPOS=18001946;\n      Tonyu.globals.$Keys.update();\n      //$LASTPOS=18001967;\n      Tonyu.globals.$InputDevice.update();\n      //$LASTPOS=18001995;\n      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;\n      //$LASTPOS=18002028;\n      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;\n      //$LASTPOS=18002069;\n      _this.doDraw=_this.now()<_this.deadLine;\n      //$LASTPOS=18002097;\n      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {\n        //$LASTPOS=18002151;\n        _this.doDraw=true;\n        //$LASTPOS=18002173;\n        _this.resetDeadLine();\n        \n      }\n      //$LASTPOS=18002202;\n      if (_this.doDraw) {\n        //$LASTPOS=18002245;\n        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);\n        //$LASTPOS=18002290;\n        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n        //$LASTPOS=18002330;\n        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);\n        //$LASTPOS=18002375;\n        Tonyu.globals.$Screen.draw();\n        //$LASTPOS=18002400;\n        _this.fps_fpsCnt++;\n        //$LASTPOS=18002424;\n        _this.frameSkipped=0;\n        \n      } else {\n        //$LASTPOS=18002463;\n        _this.frameSkipped++;\n        \n      }\n      //$LASTPOS=18002491;\n      Tonyu.globals.$Sprites.checkHit();\n      //$LASTPOS=18002517;\n      _this.fps_rpsCnt++;\n      //$LASTPOS=18002537;\n      _this.measureFps();\n      //$LASTPOS=18002556;\n      _this.waitFrame();\n      //$LASTPOS=18002583;\n      while (_this.paused) {\n        //$LASTPOS=18002608;\n        _this.waitFor(Tonyu.timeout(1));\n        //$LASTPOS=18002645;\n        if (! _this.paused) {\n          //$LASTPOS=18002658;\n          _this.resetDeadLine();\n        }\n        \n      }\n      \n    }\n  },\n  fiber$main :function _trc_func_18000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_18000000_2(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=18001406;\n          _this.fiber$initSprites(_thread);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=18001422;\n          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;\n          //$LASTPOS=18001453;\n          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);\n          //$LASTPOS=18001490;\n          _this.fiber$initThread(_thread);\n          __pc=2;return;\n        case 2:\n          \n          //$LASTPOS=18001507;\n          Tonyu.globals.$pat_fruits=30;\n          //$LASTPOS=18001524;\n          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;\n          //$LASTPOS=18001541;\n          Tonyu.globals.$Math=Math;\n          //$LASTPOS=18001554;\n          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n          //$LASTPOS=18001664;\n          Tonyu.globals.$consolePrintY=465-15;\n          //$LASTPOS=18001688;\n          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});\n          //$LASTPOS=18001828;\n          if (typeof  SplashScreen!="undefined") {\n            //$LASTPOS=18001866;\n            SplashScreen.hide();\n          }\n          //$LASTPOS=18001888;\n          _this.initFPSParams();\n          //$LASTPOS=18001908;\n        case 3:\n          //$LASTPOS=18001928;\n          _this.thg.steps();\n          //$LASTPOS=18001946;\n          Tonyu.globals.$Keys.update();\n          //$LASTPOS=18001967;\n          Tonyu.globals.$InputDevice.update();\n          //$LASTPOS=18001995;\n          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;\n          //$LASTPOS=18002028;\n          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;\n          //$LASTPOS=18002069;\n          _this.doDraw=_this.now()<_this.deadLine;\n          //$LASTPOS=18002097;\n          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {\n            //$LASTPOS=18002151;\n            _this.doDraw=true;\n            //$LASTPOS=18002173;\n            _this.resetDeadLine();\n            \n          }\n          //$LASTPOS=18002202;\n          if (_this.doDraw) {\n            //$LASTPOS=18002245;\n            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);\n            //$LASTPOS=18002290;\n            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n            //$LASTPOS=18002330;\n            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);\n            //$LASTPOS=18002375;\n            Tonyu.globals.$Screen.draw();\n            //$LASTPOS=18002400;\n            _this.fps_fpsCnt++;\n            //$LASTPOS=18002424;\n            _this.frameSkipped=0;\n            \n          } else {\n            //$LASTPOS=18002463;\n            _this.frameSkipped++;\n            \n          }\n          //$LASTPOS=18002491;\n          Tonyu.globals.$Sprites.checkHit();\n          //$LASTPOS=18002517;\n          _this.fps_rpsCnt++;\n          //$LASTPOS=18002537;\n          _this.measureFps();\n          //$LASTPOS=18002556;\n          _this.fiber$waitFrame(_thread);\n          __pc=4;return;\n        case 4:\n          \n          //$LASTPOS=18002583;\n        case 5:\n          if (!(_this.paused)) { __pc=7; break; }\n          //$LASTPOS=18002608;\n          _this.fiber$waitFor(_thread, Tonyu.timeout(1));\n          __pc=6;return;\n        case 6:\n          \n          //$LASTPOS=18002645;\n          if (! _this.paused) {\n            //$LASTPOS=18002658;\n            _this.resetDeadLine();\n          }\n          __pc=5;break;\n        case 7:\n          \n          __pc=3;break;\n        case 8:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initSprites :function _trc_func_18000160_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var a;\n    var rs;\n    var r;\n    var name;\n    var val;\n    var _it_171;\n    \n    //$LASTPOS=18000182;\n    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();\n    //$LASTPOS=18000211;\n    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();\n    //$LASTPOS=18000245;\n    _this.print("Loading plugins..");\n    //$LASTPOS=18000279;\n    a = _this.asyncResult();\n    //$LASTPOS=18000305;\n    Tonyu.globals.$currentProject.loadPlugins(a.receiver);\n    //$LASTPOS=18000351;\n    _this.waitFor(a);\n    //$LASTPOS=18000368;\n    _this.print("Loading pats..");\n    //$LASTPOS=18000399;\n    rs = Tonyu.globals.$currentProject.getResource();\n    //$LASTPOS=18000442;\n    a=_this.asyncResult();\n    //$LASTPOS=18000464;\n    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});\n    //$LASTPOS=18000549;\n    _this.waitFor(a);\n    //$LASTPOS=18000566;\n    r = a[0];\n    //$LASTPOS=18000583;\n    Tonyu.globals.$Sprites.setImageList(r);\n    //$LASTPOS=18000614;\n    _it_171=Tonyu.iterator(r.names,2);\n    while(_it_171.next()) {\n      name=_it_171[0];\n      val=_it_171[1];\n      \n      //$LASTPOS=18000655;\n      Tonyu.setGlobal(name,val);\n      \n    }\n    //$LASTPOS=18000695;\n    _this.print("Loading pats done.");\n    //$LASTPOS=18000730;\n    _this.cvj=$("canvas");\n    //$LASTPOS=18000752;\n    if (Tonyu.noviceMode) {\n      //$LASTPOS=18000785;\n      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});\n      \n    } else {\n      //$LASTPOS=18000869;\n      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});\n      \n    }\n  },\n  fiber$initSprites :function _trc_func_18000160_4(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var a;\n    var rs;\n    var r;\n    var name;\n    var val;\n    var _it_171;\n    \n    //$LASTPOS=18000182;\n    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();\n    //$LASTPOS=18000211;\n    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();\n    //$LASTPOS=18000245;\n    _this.print("Loading plugins..");\n    //$LASTPOS=18000279;\n    a = _this.asyncResult();\n    //$LASTPOS=18000305;\n    Tonyu.globals.$currentProject.loadPlugins(a.receiver);\n    \n    _thread.enter(function _trc_func_18000160_5(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=18000351;\n          _this.fiber$waitFor(_thread, a);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=18000368;\n          _this.print("Loading pats..");\n          //$LASTPOS=18000399;\n          rs = Tonyu.globals.$currentProject.getResource();\n          //$LASTPOS=18000442;\n          a=_this.asyncResult();\n          //$LASTPOS=18000464;\n          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});\n          //$LASTPOS=18000549;\n          _this.fiber$waitFor(_thread, a);\n          __pc=2;return;\n        case 2:\n          \n          //$LASTPOS=18000566;\n          r = a[0];\n          //$LASTPOS=18000583;\n          Tonyu.globals.$Sprites.setImageList(r);\n          //$LASTPOS=18000614;\n          _it_171=Tonyu.iterator(r.names,2);\n          while(_it_171.next()) {\n            name=_it_171[0];\n            val=_it_171[1];\n            \n            //$LASTPOS=18000655;\n            Tonyu.setGlobal(name,val);\n            \n          }\n          //$LASTPOS=18000695;\n          _this.print("Loading pats done.");\n          //$LASTPOS=18000730;\n          _this.cvj=$("canvas");\n          //$LASTPOS=18000752;\n          if (Tonyu.noviceMode) {\n            //$LASTPOS=18000785;\n            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});\n            \n          } else {\n            //$LASTPOS=18000869;\n            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});\n            \n          }\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initThread :function _trc_func_18000945_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var o;\n    var mainClassName;\n    \n    //$LASTPOS=18000966;\n    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();\n    //$LASTPOS=18001013;\n    o = Tonyu.currentProject.getOptions();\n    //$LASTPOS=18001059;\n    mainClassName = o.run.mainClass;\n    //$LASTPOS=18001099;\n    _this.print("MainClass= "+mainClassName);\n    //$LASTPOS=18001140;\n    _this.mainClass=Tonyu.getClass(mainClassName);\n    //$LASTPOS=18001186;\n    if (! _this.mainClass) {\n      //$LASTPOS=18001213;\n      TError(mainClassName+" というクラスはありません","不明",0).raise();\n      \n    }\n    //$LASTPOS=18001292;\n    Tonyu.runMode=true;\n    //$LASTPOS=18001317;\n    Tonyu.globals.$currentThreadGroup=_this.thg;\n    //$LASTPOS=18001347;\n    new _this.mainClass();\n  },\n  fiber$initThread :function _trc_func_18000945_7(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var o;\n    var mainClassName;\n    \n    //$LASTPOS=18000966;\n    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();\n    //$LASTPOS=18001013;\n    o = Tonyu.currentProject.getOptions();\n    //$LASTPOS=18001059;\n    mainClassName = o.run.mainClass;\n    //$LASTPOS=18001099;\n    _this.print("MainClass= "+mainClassName);\n    //$LASTPOS=18001140;\n    _this.mainClass=Tonyu.getClass(mainClassName);\n    //$LASTPOS=18001186;\n    if (! _this.mainClass) {\n      //$LASTPOS=18001213;\n      TError(mainClassName+" というクラスはありません","不明",0).raise();\n      \n    }\n    //$LASTPOS=18001292;\n    Tonyu.runMode=true;\n    //$LASTPOS=18001317;\n    Tonyu.globals.$currentThreadGroup=_this.thg;\n    //$LASTPOS=18001347;\n    new _this.mainClass();\n    \n    _thread.retVal=_this;return;\n  },\n  stop :function _trc_func_18001368_8() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18001383;\n    _this.fireEvent("stop");\n  },\n  fiber$stop :function _trc_func_18001368_9(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_18001368_10(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=18001383;\n          _this.fiber$fireEvent(_thread, "stop");\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initFPSParams :function _trc_func_18002688_11() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18002738;\n    _this._fps=30;\n    //$LASTPOS=18002754;\n    _this.maxframeSkip=5;\n    //$LASTPOS=18002804;\n    _this.frameCnt=0;\n    //$LASTPOS=18002823;\n    _this.resetDeadLine();\n    //$LASTPOS=18002845;\n    Tonyu.globals.$Boot=_this;\n    //$LASTPOS=18002864;\n    _this.lastMeasured=_this.now();\n    //$LASTPOS=18002889;\n    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;\n  },\n  now :function _trc_func_18002934_12() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return new Date().getTime();\n  },\n  resetDeadLine :function _trc_func_18002988_13() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18003019;\n    _this.deadLine=_this.now()+1000/_this._fps;\n    //$LASTPOS=18003050;\n    _this.frameSkipped=0;\n  },\n  waitFrame :function _trc_func_18003074_14() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var wt;\n    \n    //$LASTPOS=18003094;\n    wt = _this.deadLine-_this.now();\n    //$LASTPOS=18003122;\n    if (wt<1) {\n      //$LASTPOS=18003143;\n      if (wt<- 1000) {\n        //$LASTPOS=18003157;\n        _this.resetDeadLine();\n      }\n      //$LASTPOS=18003183;\n      wt=1;\n      \n    }\n    //$LASTPOS=18003201;\n    wt=_this.floor(wt);\n    //$LASTPOS=18003220;\n    _this.waitFor(Tonyu.timeout(wt));\n    //$LASTPOS=18003253;\n    _this.deadLine+=1000/_this._fps;\n  },\n  fiber$waitFrame :function _trc_func_18003074_15(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var wt;\n    \n    //$LASTPOS=18003094;\n    wt = _this.deadLine-_this.now();\n    //$LASTPOS=18003122;\n    if (wt<1) {\n      //$LASTPOS=18003143;\n      if (wt<- 1000) {\n        //$LASTPOS=18003157;\n        _this.resetDeadLine();\n      }\n      //$LASTPOS=18003183;\n      wt=1;\n      \n    }\n    //$LASTPOS=18003201;\n    wt=_this.floor(wt);\n    \n    _thread.enter(function _trc_func_18003074_16(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=18003220;\n          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=18003253;\n          _this.deadLine+=1000/_this._fps;\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  getFrameRate :function _trc_func_18003280_17() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this._fps;\n  },\n  setFrameRate :function _trc_func_18003366_18(fps,maxFrameSkip) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18003413;\n    _this._fps=fps;\n    //$LASTPOS=18003430;\n    if (typeof  maxFrameSkip!="number") {\n      //$LASTPOS=18003465;\n      maxFrameSkip=5;\n    }\n    //$LASTPOS=18003486;\n    _this.maxFrameSkip=maxFrameSkip;\n    //$LASTPOS=18003525;\n    _this.resetDeadLine();\n  },\n  getMeasuredFps :function _trc_func_18003575_19() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.fps_fps;\n  },\n  getMeasuredRps :function _trc_func_18003654_20() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.fps_rps;\n  },\n  measureFps :function _trc_func_18003708_21() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=18003736;\n    if (_this.now()>_this.lastMeasured+1000) {\n      //$LASTPOS=18003776;\n      _this.fps_fps=_this.fps_fpsCnt;\n      //$LASTPOS=18003805;\n      _this.fps_rps=_this.fps_rpsCnt;\n      //$LASTPOS=18003834;\n      _this.fps_fpsCnt=0;\n      //$LASTPOS=18003857;\n      _this.fps_rpsCnt=0;\n      //$LASTPOS=18003880;\n      _this.lastMeasured=_this.now();\n      \n    }\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"initSprites":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_19000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_19000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_19000041_2(param) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var j;\n    var i;\n    \n    //$LASTPOS=19000060;\n    _this.sx=0;\n    //$LASTPOS=19000071;\n    _this.sy=0;\n    //$LASTPOS=19000082;\n    Tonyu.classes.kernel.Actor.apply( _this, [param]);\n    //$LASTPOS=19000101;\n    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n    //$LASTPOS=19000173;\n    _this.mapObj=true;\n    //$LASTPOS=19000191;\n    _this.mapTable=[];\n    //$LASTPOS=19000211;\n    _this.mapOnTable=[];\n    //$LASTPOS=19000233;\n    //$LASTPOS=19000237;\n    j = 0;\n    while(j<_this.row) {\n      {\n        //$LASTPOS=19000266;\n        _this.rows=[];\n        //$LASTPOS=19000286;\n        //$LASTPOS=19000290;\n        i = 0;\n        while(i<_this.col) {\n          {\n            //$LASTPOS=19000323;\n            _this.rows.push(- 1);\n          }\n          i++;\n        }\n        //$LASTPOS=19000358;\n        _this.mapTable.push(_this.rows);\n      }\n      j++;\n    }\n    //$LASTPOS=19000391;\n    //$LASTPOS=19000395;\n    j = 0;\n    while(j<_this.row) {\n      {\n        //$LASTPOS=19000424;\n        _this.rows=[];\n        //$LASTPOS=19000444;\n        //$LASTPOS=19000448;\n        i = 0;\n        while(i<_this.col) {\n          {\n            //$LASTPOS=19000481;\n            _this.rows.push(- 1);\n          }\n          i++;\n        }\n        //$LASTPOS=19000516;\n        _this.mapOnTable.push(_this.rows);\n      }\n      j++;\n    }\n    //$LASTPOS=19000616;\n    _this.initMap();\n  },\n  initMap :function _trc_func_19000631_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    var j;\n    \n    //$LASTPOS=19000648;\n    if (! _this.mapData) {\n      return _this;\n    }\n    //$LASTPOS=19000674;\n    //$LASTPOS=19000678;\n    i = 0;\n    while(i<_this.row) {\n      {\n        //$LASTPOS=19000707;\n        //$LASTPOS=19000711;\n        j = 0;\n        while(j<_this.col) {\n          {\n            //$LASTPOS=19000744;\n            _this.set(j,i,_this.mapData[i][j]);\n          }\n          j++;\n        }\n      }\n      i++;\n    }\n    //$LASTPOS=19000791;\n    if (! _this.mapOnData) {\n      return _this;\n    }\n    //$LASTPOS=19000819;\n    //$LASTPOS=19000823;\n    i = 0;\n    while(i<_this.row) {\n      {\n        //$LASTPOS=19000852;\n        //$LASTPOS=19000856;\n        j = 0;\n        while(j<_this.col) {\n          {\n            //$LASTPOS=19000889;\n            _this.setOn(j,i,_this.mapOnData[i][j]);\n          }\n          j++;\n        }\n      }\n      i++;\n    }\n  },\n  fiber$initMap :function _trc_func_19000631_4(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    var j;\n    \n    //$LASTPOS=19000648;\n    if (! _this.mapData) {\n      _thread.retVal=_this;return;\n      \n    }\n    \n    _thread.enter(function _trc_func_19000631_5(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=19000674;\n          //$LASTPOS=19000678;\n          i = 0;;\n        case 1:\n          if (!(i<_this.row)) { __pc=5; break; }\n          //$LASTPOS=19000707;\n          //$LASTPOS=19000711;\n          j = 0;;\n        case 2:\n          if (!(j<_this.col)) { __pc=4; break; }\n          //$LASTPOS=19000744;\n          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);\n          __pc=3;return;\n        case 3:\n          \n          j++;\n          __pc=2;break;\n        case 4:\n          \n          i++;\n          __pc=1;break;\n        case 5:\n          \n          //$LASTPOS=19000791;\n          if (!(! _this.mapOnData)) { __pc=6; break; }\n          _thread.exit(_this);return;\n        case 6:\n          \n          //$LASTPOS=19000819;\n          //$LASTPOS=19000823;\n          i = 0;;\n        case 7:\n          if (!(i<_this.row)) { __pc=11; break; }\n          //$LASTPOS=19000852;\n          //$LASTPOS=19000856;\n          j = 0;;\n        case 8:\n          if (!(j<_this.col)) { __pc=10; break; }\n          //$LASTPOS=19000889;\n          _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);\n          __pc=9;return;\n        case 9:\n          \n          j++;\n          __pc=8;break;\n        case 10:\n          \n          i++;\n          __pc=7;break;\n        case 11:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  load :function _trc_func_19000939_6(dataFile) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19000961;\n    _this.baseData=_this.file("../maps/").rel(dataFile).obj();\n    //$LASTPOS=19001013;\n    if (! _this.baseData) {\n      //$LASTPOS=19001027;\n      _this.baseData=_this.file(dataFile).obj();\n    }\n    //$LASTPOS=19001063;\n    _this.mapTable=_this.baseData[0];\n    //$LASTPOS=19001090;\n    _this.mapData=_this.mapTable;\n    //$LASTPOS=19001113;\n    _this.row=_this.mapTable.length;\n    //$LASTPOS=19001139;\n    _this.col=_this.mapTable[0].length;\n    //$LASTPOS=19001168;\n    _this.mapOnTable=_this.baseData[1];\n    //$LASTPOS=19001197;\n    _this.mapOnData=_this.mapOnTable;\n    //$LASTPOS=19001224;\n    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n    //$LASTPOS=19001296;\n    _this.initMap();\n  },\n  fiber$load :function _trc_func_19000939_7(_thread,dataFile) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19000961;\n    _this.baseData=_this.file("../maps/").rel(dataFile).obj();\n    //$LASTPOS=19001013;\n    if (! _this.baseData) {\n      //$LASTPOS=19001027;\n      _this.baseData=_this.file(dataFile).obj();\n    }\n    //$LASTPOS=19001063;\n    _this.mapTable=_this.baseData[0];\n    //$LASTPOS=19001090;\n    _this.mapData=_this.mapTable;\n    //$LASTPOS=19001113;\n    _this.row=_this.mapTable.length;\n    //$LASTPOS=19001139;\n    _this.col=_this.mapTable[0].length;\n    //$LASTPOS=19001168;\n    _this.mapOnTable=_this.baseData[1];\n    //$LASTPOS=19001197;\n    _this.mapOnData=_this.mapOnTable;\n    //$LASTPOS=19001224;\n    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n    \n    _thread.enter(function _trc_func_19000939_8(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=19001296;\n          _this.fiber$initMap(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  set :function _trc_func_19001311_9(setCol,setRow,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19001339;\n    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n      return _this;\n    }\n    //$LASTPOS=19001407;\n    _this.mapTable[setRow][setCol]=p;\n    //$LASTPOS=19001478;\n    _this.ctx=_this.buf[0].getContext("2d");\n    //$LASTPOS=19001512;\n    p=Math.floor(p);\n    //$LASTPOS=19001534;\n    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n    //$LASTPOS=19001572;\n    if (! _this.pImg) {\n      //$LASTPOS=19001594;\n      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      return _this;\n      \n    }\n    //$LASTPOS=19001695;\n    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n    //$LASTPOS=19001772;\n    _this.ctx.save();\n    //$LASTPOS=19001789;\n    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n    //$LASTPOS=19001933;\n    _this.ctx.restore();\n  },\n  fiber$set :function _trc_func_19001311_10(_thread,setCol,setRow,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19001339;\n    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=19001407;\n    _this.mapTable[setRow][setCol]=p;\n    //$LASTPOS=19001478;\n    _this.ctx=_this.buf[0].getContext("2d");\n    //$LASTPOS=19001512;\n    p=Math.floor(p);\n    //$LASTPOS=19001534;\n    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n    //$LASTPOS=19001572;\n    if (! _this.pImg) {\n      //$LASTPOS=19001594;\n      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      _thread.retVal=_this;return;\n      \n      \n    }\n    //$LASTPOS=19001695;\n    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n    //$LASTPOS=19001772;\n    _this.ctx.save();\n    //$LASTPOS=19001789;\n    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n    //$LASTPOS=19001933;\n    _this.ctx.restore();\n    \n    _thread.retVal=_this;return;\n  },\n  setOn :function _trc_func_19001952_11(setCol,setRow,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19001982;\n    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n      return _this;\n    }\n    //$LASTPOS=19002050;\n    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);\n    //$LASTPOS=19002100;\n    _this.mapOnTable[setRow][setCol]=p;\n    //$LASTPOS=19002135;\n    _this.ctx=_this.buf[0].getContext("2d");\n    //$LASTPOS=19002169;\n    p=Math.floor(p);\n    //$LASTPOS=19002191;\n    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n    //$LASTPOS=19002229;\n    if (! _this.pImg) {\n      return _this;\n    }\n    //$LASTPOS=19002253;\n    _this.ctx.save();\n    //$LASTPOS=19002270;\n    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n    //$LASTPOS=19002414;\n    _this.ctx.restore();\n  },\n  fiber$setOn :function _trc_func_19001952_12(_thread,setCol,setRow,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19001982;\n    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n      _thread.retVal=_this;return;\n      \n    }\n    \n    _thread.enter(function _trc_func_19001952_13(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=19002050;\n          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=19002100;\n          _this.mapOnTable[setRow][setCol]=p;\n          //$LASTPOS=19002135;\n          _this.ctx=_this.buf[0].getContext("2d");\n          //$LASTPOS=19002169;\n          p=Math.floor(p);\n          //$LASTPOS=19002191;\n          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n          //$LASTPOS=19002229;\n          if (!(! _this.pImg)) { __pc=2; break; }\n          _thread.exit(_this);return;\n        case 2:\n          \n          //$LASTPOS=19002253;\n          _this.ctx.save();\n          //$LASTPOS=19002270;\n          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n          //$LASTPOS=19002414;\n          _this.ctx.restore();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  setOnAt :function _trc_func_19002433_14(setX,setY,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19002461;\n    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);\n  },\n  fiber$setOnAt :function _trc_func_19002433_15(_thread,setX,setY,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_19002433_16(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=19002461;\n          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  setAt :function _trc_func_19002530_17(setX,setY,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19002556;\n    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);\n  },\n  fiber$setAt :function _trc_func_19002530_18(_thread,setX,setY,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_19002530_19(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=19002556;\n          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  get :function _trc_func_19002623_20(getCol,getRow) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19002649;\n    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n      return _this.mapTable[getRow][getCol];\n    }\n    return - 1;\n  },\n  fiber$get :function _trc_func_19002623_21(_thread,getCol,getRow) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19002649;\n    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n      _thread.retVal=_this.mapTable[getRow][getCol];return;\n      \n    }\n    _thread.retVal=- 1;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getAt :function _trc_func_19002757_22(getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));\n  },\n  fiber$getAt :function _trc_func_19002757_23(_thread,getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getOn :function _trc_func_19002853_24(getCol,getRow) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19002881;\n    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n      return _this.mapOnTable[getRow][getCol];\n    }\n    return - 1;\n  },\n  fiber$getOn :function _trc_func_19002853_25(_thread,getCol,getRow) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19002881;\n    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n      _thread.retVal=_this.mapOnTable[getRow][getCol];return;\n      \n    }\n    _thread.retVal=- 1;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getOnAt :function _trc_func_19002991_26(getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));\n  },\n  fiber$getOnAt :function _trc_func_19002991_27(_thread,getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  scrollTo :function _trc_func_19003091_28(scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19003124;\n    _this.sx=- scrollX;\n    //$LASTPOS=19003142;\n    _this.sy=- scrollY;\n  },\n  fiber$scrollTo :function _trc_func_19003091_29(_thread,scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=19003124;\n    _this.sx=- scrollX;\n    //$LASTPOS=19003142;\n    _this.sy=- scrollY;\n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_19003159_30(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=19003177;\n    _this.pImg=_this.buf[0];\n    //$LASTPOS=19003195;\n    ctx.save();\n    //$LASTPOS=19003212;\n    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);\n    //$LASTPOS=19003324;\n    ctx.restore();\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_20000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    var j;\n    \n    //$LASTPOS=20000032;\n    _this.loadMode=false;\n    //$LASTPOS=20000049;\n    _this.print("Load Data?: Y or N");\n    //$LASTPOS=20000079;\n    while (true) {\n      //$LASTPOS=20000097;\n      if (_this.getkey("y")>0) {\n        //$LASTPOS=20000125;\n        _this.loadMode=true;\n        break;\n        \n        \n      }\n      //$LASTPOS=20000168;\n      if (_this.getkey("n")>0) {\n        //$LASTPOS=20000196;\n        _this.loadMode=false;\n        break;\n        \n        \n      }\n      //$LASTPOS=20000240;\n      _this.update();\n      \n    }\n    //$LASTPOS=20000254;\n    if (_this.loadMode) {\n      //$LASTPOS=20000273;\n      _this.fileName=prompt("Input json file (*.json)","map.json");\n      //$LASTPOS=20000334;\n      if (_this.fileName) {\n        //$LASTPOS=20000357;\n        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n        \n      }\n      //$LASTPOS=20000413;\n      if (_this.mapDataFile.obj()) {\n        //$LASTPOS=20000445;\n        _this.baseData=_this.mapDataFile.obj();\n        \n      } else {\n        //$LASTPOS=20000494;\n        _this.mapDataFile=_this.file(_this.fileName);\n        //$LASTPOS=20000531;\n        if (_this.mapDataFile.obj()) {\n          //$LASTPOS=20000567;\n          _this.baseData=_this.mapDataFile.obj();\n          \n        }\n        \n      }\n      //$LASTPOS=20000618;\n      if (_this.baseData==undefined) {\n        //$LASTPOS=20000652;\n        _this.print("Load failed");\n        //$LASTPOS=20000683;\n        _this.loadMode=false;\n        \n      } else {\n        //$LASTPOS=20000710;\n        if (_this.baseData[0]&&_this.baseData[1]) {\n          //$LASTPOS=20000751;\n          _this.mapData=_this.baseData[0];\n          //$LASTPOS=20000781;\n          _this.mapOnData=_this.baseData[1];\n          \n        }\n      }\n      \n    }\n    //$LASTPOS=20000815;\n    _this.update();\n    //$LASTPOS=20001093;\n    if (! _this.loadMode) {\n      //$LASTPOS=20001113;\n      _this.row=prompt("input row");\n      //$LASTPOS=20001143;\n      _this.update();\n      //$LASTPOS=20001158;\n      _this.col=prompt("input col");\n      //$LASTPOS=20001188;\n      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});\n      //$LASTPOS=20001238;\n      _this.panel.x=_this.panel.width/2+10;\n      //$LASTPOS=20001269;\n      _this.panel.y=_this.panel.height/2;\n      //$LASTPOS=20001298;\n      _this.panel.setFillStyle("cyan");\n      //$LASTPOS=20001331;\n      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n      //$LASTPOS=20001382;\n      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});\n      \n    } else {\n      //$LASTPOS=20001445;\n      if (! _this.mapOnData) {\n        //$LASTPOS=20001470;\n        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});\n        \n      } else {\n        //$LASTPOS=20001582;\n        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});\n        \n      }\n      //$LASTPOS=20001695;\n      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});\n      //$LASTPOS=20001766;\n      _this.panel.x=_this.panel.width/2;\n      //$LASTPOS=20001794;\n      _this.panel.y=_this.panel.height/2;\n      //$LASTPOS=20001823;\n      _this.panel.setFillStyle("cyan");\n      //$LASTPOS=20001856;\n      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n      \n    }\n    //$LASTPOS=20001906;\n    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n    //$LASTPOS=20001961;\n    _this.counter=0;\n    //$LASTPOS=20001973;\n    //$LASTPOS=20001977;\n    i = 0;\n    while(i<16) {\n      {\n        //$LASTPOS=20002001;\n        //$LASTPOS=20002005;\n        j = 0;\n        while(j<8) {\n          {\n            //$LASTPOS=20002032;\n            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n            //$LASTPOS=20002076;\n            _this.counter++;\n          }\n          j++;\n        }\n      }\n      i++;\n    }\n    //$LASTPOS=20002098;\n    _this.mode="get";\n    //$LASTPOS=20002111;\n    _this.prevMode="set";\n    //$LASTPOS=20002128;\n    _this.mapp=0;\n    //$LASTPOS=20002137;\n    _this.mx=0;\n    //$LASTPOS=20002144;\n    _this.my=0;\n    //$LASTPOS=20002151;\n    _this.chipX=0;\n    //$LASTPOS=20002161;\n    _this.chipY=0;\n    //$LASTPOS=20002171;\n    _this.x=Tonyu.globals.$screenWidth-16;\n    //$LASTPOS=20002191;\n    _this.y=Tonyu.globals.$screenHeight-16;\n    //$LASTPOS=20002212;\n    while (true) {\n      //$LASTPOS=20002230;\n      _this.p=_this.mapp;\n      //$LASTPOS=20002243;\n      if (_this.getkey("e")==1) {\n        //$LASTPOS=20002272;\n        Tonyu.globals.$mp.scrollTo(1000,1000);\n        //$LASTPOS=20002306;\n        _this.mode="erase";\n        //$LASTPOS=20002329;\n        _this.print(_this.mode+" mode");\n        \n      }\n      //$LASTPOS=20002362;\n      if (_this.getkey("s")==1) {\n        //$LASTPOS=20002391;\n        Tonyu.globals.$mp.scrollTo(1000,1000);\n        //$LASTPOS=20002425;\n        if (_this.mode=="set") {\n          //$LASTPOS=20002455;\n          _this.mode="setOn";\n          \n        } else {\n          //$LASTPOS=20002498;\n          _this.mode="set";\n          \n        }\n        //$LASTPOS=20002530;\n        _this.print(_this.mode+" mode");\n        \n      }\n      //$LASTPOS=20002563;\n      if (_this.getkey("o")==1) {\n        //$LASTPOS=20002592;\n        Tonyu.globals.$mp.scrollTo(1000,1000);\n        //$LASTPOS=20002626;\n        _this.mode="setOn";\n        \n      }\n      //$LASTPOS=20002652;\n      if (_this.getkey("g")==1) {\n        //$LASTPOS=20002681;\n        if (_this.mode!="get") {\n          //$LASTPOS=20002711;\n          _this.prevMode=_this.mode;\n          //$LASTPOS=20002739;\n          Tonyu.globals.$mp.scrollTo(0,0);\n          //$LASTPOS=20002771;\n          _this.mode="get";\n          //$LASTPOS=20002796;\n          _this.chipX=0;\n          //$LASTPOS=20002818;\n          _this.chipY=0;\n          \n        } else {\n          //$LASTPOS=20002856;\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=20002894;\n          _this.mode=_this.prevMode;\n          \n        }\n        //$LASTPOS=20002929;\n        _this.print(_this.mode+" mode");\n        \n      }\n      //$LASTPOS=20002962;\n      if (_this.getkey("p")==1) {\n        //$LASTPOS=20003006;\n        _this.saveFileName=prompt("input json file(*.json)","map.json");\n        //$LASTPOS=20003495;\n        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n        //$LASTPOS=20003553;\n        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];\n        //$LASTPOS=20003668;\n        _this.saveDataFile.obj(_this.data);\n        //$LASTPOS=20003701;\n        _this.print(_this.saveFileName+" Saved");\n        \n      }\n      //$LASTPOS=20003793;\n      if (_this.getkey("c")==1) {\n        //$LASTPOS=20003822;\n        Tonyu.globals.$mp.scrollTo(1000,1000);\n        //$LASTPOS=20003856;\n        _this.mode="spuit";\n        //$LASTPOS=20003879;\n        _this.print(_this.mode+" mode");\n        \n      }\n      //$LASTPOS=20003912;\n      if (_this.mode!="get") {\n        //$LASTPOS=20003938;\n        if (_this.getkey("left")>0) {\n          //$LASTPOS=20003959;\n          _this.mx=_this.mx+8;\n        }\n        //$LASTPOS=20003977;\n        if (_this.getkey("right")>0) {\n          //$LASTPOS=20003999;\n          _this.mx=_this.mx-8;\n        }\n        //$LASTPOS=20004017;\n        if (_this.getkey("up")>0) {\n          //$LASTPOS=20004036;\n          _this.my=_this.my+8;\n        }\n        //$LASTPOS=20004054;\n        if (_this.getkey("down")>0) {\n          //$LASTPOS=20004075;\n          _this.my=_this.my-8;\n        }\n        //$LASTPOS=20004093;\n        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n        \n      } else {\n        //$LASTPOS=20004136;\n        if (_this.getkey("left")>0) {\n          //$LASTPOS=20004157;\n          _this.chipX=_this.chipX+8;\n        }\n        //$LASTPOS=20004181;\n        if (_this.getkey("right")>0) {\n          //$LASTPOS=20004203;\n          _this.chipX=_this.chipX-8;\n        }\n        //$LASTPOS=20004227;\n        if (_this.getkey("up")>0) {\n          //$LASTPOS=20004246;\n          _this.chipY=_this.chipY+8;\n        }\n        //$LASTPOS=20004270;\n        if (_this.getkey("down")>0) {\n          //$LASTPOS=20004291;\n          _this.chipY=_this.chipY-8;\n        }\n        //$LASTPOS=20004315;\n        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n        \n      }\n      //$LASTPOS=20004354;\n      _this.panel.x=_this.panel.width/2-_this.mx;\n      //$LASTPOS=20004385;\n      _this.panel.y=_this.panel.height/2-_this.my;\n      //$LASTPOS=20004417;\n      if (_this.mode=="set"&&_this.getkey(1)>0) {\n        //$LASTPOS=20004458;\n        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n        //$LASTPOS=20004507;\n        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n        \n      } else {\n        //$LASTPOS=20004558;\n        if (_this.mode=="erase"&&_this.getkey(1)>0) {\n          //$LASTPOS=20004601;\n          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n          \n        } else {\n          //$LASTPOS=20004650;\n          if (_this.mode=="get"&&_this.getkey(1)>0) {\n            //$LASTPOS=20004691;\n            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n            //$LASTPOS=20004745;\n            _this.mode=_this.prevMode;\n            //$LASTPOS=20004769;\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=20004803;\n            _this.print(_this.mode+" mode");\n            //$LASTPOS=20004833;\n            _this.updateEx(10);\n            \n          } else {\n            //$LASTPOS=20004858;\n            if (_this.mode=="setOn"&&_this.getkey(1)>0) {\n              //$LASTPOS=20004901;\n              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n              \n            } else {\n              //$LASTPOS=20004954;\n              if (_this.mode=="spuit"&&_this.getkey(1)>0) {\n                //$LASTPOS=20004997;\n                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n                //$LASTPOS=20005046;\n                _this.mode="set";\n                //$LASTPOS=20005067;\n                _this.print(_this.mode+" mode");\n                //$LASTPOS=20005097;\n                _this.updateEx(10);\n                \n              }\n            }\n          }\n        }\n      }\n      //$LASTPOS=20005123;\n      _this.update();\n      \n    }\n  },\n  fiber$main :function _trc_func_20000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    var j;\n    \n    //$LASTPOS=20000032;\n    _this.loadMode=false;\n    //$LASTPOS=20000049;\n    _this.print("Load Data?: Y or N");\n    \n    _thread.enter(function _trc_func_20000000_2(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=20000079;\n        case 1:\n          //$LASTPOS=20000097;\n          if (!(_this.getkey("y")>0)) { __pc=2; break; }\n          //$LASTPOS=20000125;\n          _this.loadMode=true;\n          __pc=5; break;\n          \n        case 2:\n          \n          //$LASTPOS=20000168;\n          if (!(_this.getkey("n")>0)) { __pc=3; break; }\n          //$LASTPOS=20000196;\n          _this.loadMode=false;\n          __pc=5; break;\n          \n        case 3:\n          \n          //$LASTPOS=20000240;\n          _this.fiber$update(_thread);\n          __pc=4;return;\n        case 4:\n          \n          __pc=1;break;\n        case 5:\n          \n          //$LASTPOS=20000254;\n          if (!(_this.loadMode)) { __pc=9; break; }\n          //$LASTPOS=20000273;\n          _this.fileName=prompt("Input json file (*.json)","map.json");\n          //$LASTPOS=20000334;\n          if (_this.fileName) {\n            //$LASTPOS=20000357;\n            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n            \n          }\n          //$LASTPOS=20000413;\n          if (!(_this.mapDataFile.obj())) { __pc=6; break; }\n          {\n            //$LASTPOS=20000445;\n            _this.baseData=_this.mapDataFile.obj();\n          }\n          __pc=8;break;\n        case 6:\n          //$LASTPOS=20000494;\n          _this.fiber$file(_thread, _this.fileName);\n          __pc=7;return;\n        case 7:\n          _this.mapDataFile=_thread.retVal;\n          \n          //$LASTPOS=20000531;\n          if (_this.mapDataFile.obj()) {\n            //$LASTPOS=20000567;\n            _this.baseData=_this.mapDataFile.obj();\n            \n          }\n        case 8:\n          \n          //$LASTPOS=20000618;\n          if (_this.baseData==undefined) {\n            //$LASTPOS=20000652;\n            _this.print("Load failed");\n            //$LASTPOS=20000683;\n            _this.loadMode=false;\n            \n          } else {\n            //$LASTPOS=20000710;\n            if (_this.baseData[0]&&_this.baseData[1]) {\n              //$LASTPOS=20000751;\n              _this.mapData=_this.baseData[0];\n              //$LASTPOS=20000781;\n              _this.mapOnData=_this.baseData[1];\n              \n            }\n          }\n        case 9:\n          \n          //$LASTPOS=20000815;\n          _this.fiber$update(_thread);\n          __pc=10;return;\n        case 10:\n          \n          //$LASTPOS=20001093;\n          if (!(! _this.loadMode)) { __pc=12; break; }\n          //$LASTPOS=20001113;\n          _this.row=prompt("input row");\n          //$LASTPOS=20001143;\n          _this.fiber$update(_thread);\n          __pc=11;return;\n        case 11:\n          \n          //$LASTPOS=20001158;\n          _this.col=prompt("input col");\n          //$LASTPOS=20001188;\n          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});\n          //$LASTPOS=20001238;\n          _this.panel.x=_this.panel.width/2+10;\n          //$LASTPOS=20001269;\n          _this.panel.y=_this.panel.height/2;\n          //$LASTPOS=20001298;\n          _this.panel.setFillStyle("cyan");\n          //$LASTPOS=20001331;\n          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n          //$LASTPOS=20001382;\n          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});\n          __pc=13;break;\n        case 12:\n          {\n            //$LASTPOS=20001445;\n            if (! _this.mapOnData) {\n              //$LASTPOS=20001470;\n              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});\n              \n            } else {\n              //$LASTPOS=20001582;\n              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});\n              \n            }\n            //$LASTPOS=20001695;\n            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});\n            //$LASTPOS=20001766;\n            _this.panel.x=_this.panel.width/2;\n            //$LASTPOS=20001794;\n            _this.panel.y=_this.panel.height/2;\n            //$LASTPOS=20001823;\n            _this.panel.setFillStyle("cyan");\n            //$LASTPOS=20001856;\n            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n          }\n        case 13:\n          \n          //$LASTPOS=20001906;\n          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n          //$LASTPOS=20001961;\n          _this.counter=0;\n          //$LASTPOS=20001973;\n          //$LASTPOS=20001977;\n          i = 0;\n          while(i<16) {\n            {\n              //$LASTPOS=20002001;\n              //$LASTPOS=20002005;\n              j = 0;\n              while(j<8) {\n                {\n                  //$LASTPOS=20002032;\n                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n                  //$LASTPOS=20002076;\n                  _this.counter++;\n                }\n                j++;\n              }\n            }\n            i++;\n          }\n          //$LASTPOS=20002098;\n          _this.mode="get";\n          //$LASTPOS=20002111;\n          _this.prevMode="set";\n          //$LASTPOS=20002128;\n          _this.mapp=0;\n          //$LASTPOS=20002137;\n          _this.mx=0;\n          //$LASTPOS=20002144;\n          _this.my=0;\n          //$LASTPOS=20002151;\n          _this.chipX=0;\n          //$LASTPOS=20002161;\n          _this.chipY=0;\n          //$LASTPOS=20002171;\n          _this.x=Tonyu.globals.$screenWidth-16;\n          //$LASTPOS=20002191;\n          _this.y=Tonyu.globals.$screenHeight-16;\n          //$LASTPOS=20002212;\n        case 14:\n          //$LASTPOS=20002230;\n          _this.p=_this.mapp;\n          //$LASTPOS=20002243;\n          if (_this.getkey("e")==1) {\n            //$LASTPOS=20002272;\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=20002306;\n            _this.mode="erase";\n            //$LASTPOS=20002329;\n            _this.print(_this.mode+" mode");\n            \n          }\n          //$LASTPOS=20002362;\n          if (_this.getkey("s")==1) {\n            //$LASTPOS=20002391;\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=20002425;\n            if (_this.mode=="set") {\n              //$LASTPOS=20002455;\n              _this.mode="setOn";\n              \n            } else {\n              //$LASTPOS=20002498;\n              _this.mode="set";\n              \n            }\n            //$LASTPOS=20002530;\n            _this.print(_this.mode+" mode");\n            \n          }\n          //$LASTPOS=20002563;\n          if (_this.getkey("o")==1) {\n            //$LASTPOS=20002592;\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=20002626;\n            _this.mode="setOn";\n            \n          }\n          //$LASTPOS=20002652;\n          if (_this.getkey("g")==1) {\n            //$LASTPOS=20002681;\n            if (_this.mode!="get") {\n              //$LASTPOS=20002711;\n              _this.prevMode=_this.mode;\n              //$LASTPOS=20002739;\n              Tonyu.globals.$mp.scrollTo(0,0);\n              //$LASTPOS=20002771;\n              _this.mode="get";\n              //$LASTPOS=20002796;\n              _this.chipX=0;\n              //$LASTPOS=20002818;\n              _this.chipY=0;\n              \n            } else {\n              //$LASTPOS=20002856;\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=20002894;\n              _this.mode=_this.prevMode;\n              \n            }\n            //$LASTPOS=20002929;\n            _this.print(_this.mode+" mode");\n            \n          }\n          //$LASTPOS=20002962;\n          if (_this.getkey("p")==1) {\n            //$LASTPOS=20003006;\n            _this.saveFileName=prompt("input json file(*.json)","map.json");\n            //$LASTPOS=20003495;\n            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n            //$LASTPOS=20003553;\n            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];\n            //$LASTPOS=20003668;\n            _this.saveDataFile.obj(_this.data);\n            //$LASTPOS=20003701;\n            _this.print(_this.saveFileName+" Saved");\n            \n          }\n          //$LASTPOS=20003793;\n          if (_this.getkey("c")==1) {\n            //$LASTPOS=20003822;\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=20003856;\n            _this.mode="spuit";\n            //$LASTPOS=20003879;\n            _this.print(_this.mode+" mode");\n            \n          }\n          //$LASTPOS=20003912;\n          if (_this.mode!="get") {\n            //$LASTPOS=20003938;\n            if (_this.getkey("left")>0) {\n              //$LASTPOS=20003959;\n              _this.mx=_this.mx+8;\n            }\n            //$LASTPOS=20003977;\n            if (_this.getkey("right")>0) {\n              //$LASTPOS=20003999;\n              _this.mx=_this.mx-8;\n            }\n            //$LASTPOS=20004017;\n            if (_this.getkey("up")>0) {\n              //$LASTPOS=20004036;\n              _this.my=_this.my+8;\n            }\n            //$LASTPOS=20004054;\n            if (_this.getkey("down")>0) {\n              //$LASTPOS=20004075;\n              _this.my=_this.my-8;\n            }\n            //$LASTPOS=20004093;\n            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n            \n          } else {\n            //$LASTPOS=20004136;\n            if (_this.getkey("left")>0) {\n              //$LASTPOS=20004157;\n              _this.chipX=_this.chipX+8;\n            }\n            //$LASTPOS=20004181;\n            if (_this.getkey("right")>0) {\n              //$LASTPOS=20004203;\n              _this.chipX=_this.chipX-8;\n            }\n            //$LASTPOS=20004227;\n            if (_this.getkey("up")>0) {\n              //$LASTPOS=20004246;\n              _this.chipY=_this.chipY+8;\n            }\n            //$LASTPOS=20004270;\n            if (_this.getkey("down")>0) {\n              //$LASTPOS=20004291;\n              _this.chipY=_this.chipY-8;\n            }\n            //$LASTPOS=20004315;\n            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n            \n          }\n          //$LASTPOS=20004354;\n          _this.panel.x=_this.panel.width/2-_this.mx;\n          //$LASTPOS=20004385;\n          _this.panel.y=_this.panel.height/2-_this.my;\n          //$LASTPOS=20004417;\n          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }\n          {\n            //$LASTPOS=20004458;\n            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n            //$LASTPOS=20004507;\n            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n          }\n          __pc=25;break;\n        case 15:\n          //$LASTPOS=20004558;\n          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }\n          {\n            //$LASTPOS=20004601;\n            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n          }\n          __pc=24;break;\n        case 16:\n          //$LASTPOS=20004650;\n          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }\n          //$LASTPOS=20004691;\n          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n          //$LASTPOS=20004745;\n          _this.mode=_this.prevMode;\n          //$LASTPOS=20004769;\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=20004803;\n          _this.print(_this.mode+" mode");\n          //$LASTPOS=20004833;\n          _this.fiber$updateEx(_thread, 10);\n          __pc=17;return;\n        case 17:\n          \n          __pc=23;break;\n        case 18:\n          //$LASTPOS=20004858;\n          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }\n          {\n            //$LASTPOS=20004901;\n            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n          }\n          __pc=22;break;\n        case 19:\n          //$LASTPOS=20004954;\n          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }\n          //$LASTPOS=20004997;\n          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n          //$LASTPOS=20005046;\n          _this.mode="set";\n          //$LASTPOS=20005067;\n          _this.print(_this.mode+" mode");\n          //$LASTPOS=20005097;\n          _this.fiber$updateEx(_thread, 10);\n          __pc=20;return;\n        case 20:\n          \n        case 21:\n          \n        case 22:\n          \n        case 23:\n          \n        case 24:\n          \n        case 25:\n          \n          //$LASTPOS=20005123;\n          _this.fiber$update(_thread);\n          __pc=26;return;\n        case 26:\n          \n          __pc=14;break;\n        case 27:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.MapEditor,{"fullName":"kernel.MapEditor","namespace":"kernel","shortName":"MapEditor","decls":{"methods":{"main":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Pad=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_21000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=21001202;\n    _this.APAD_DIAG_SIZE=96;\n    //$LASTPOS=21003465;\n    while (true) {\n      //$LASTPOS=21003484;\n      _this.padUpdate();\n      //$LASTPOS=21003502;\n      _this.update();\n      \n    }\n  },\n  fiber$main :function _trc_func_21000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=21001202;\n    _this.APAD_DIAG_SIZE=96;\n    \n    _thread.enter(function _trc_func_21000000_2(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=21003465;\n        case 1:\n          //$LASTPOS=21003484;\n          _this.fiber$padUpdate(_thread);\n          __pc=2;return;\n        case 2:\n          \n          //$LASTPOS=21003502;\n          _this.fiber$update(_thread);\n          __pc=3;return;\n        case 3:\n          \n          __pc=1;break;\n        case 4:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initialize :function _trc_func_21000016_3(opt) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=21000033;\n    Tonyu.classes.kernel.Actor.apply( _this, [opt]);\n    //$LASTPOS=21000050;\n    _this.padImageP=Tonyu.globals.$pat_inputPad;\n    //$LASTPOS=21000082;\n    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000183;\n    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000292;\n    _this.jujiKey.show();\n    //$LASTPOS=21000313;\n    _this.no1Key.show();\n    //$LASTPOS=21000339;\n    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000446;\n    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000553;\n    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000660;\n    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000767;\n    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n    //$LASTPOS=21000879;\n    _this.jujiKeyPushU.hide();\n    //$LASTPOS=21000905;\n    _this.jujiKeyPushL.hide();\n    //$LASTPOS=21000931;\n    _this.jujiKeyPushR.hide();\n    //$LASTPOS=21000957;\n    _this.jujiKeyPushD.hide();\n    //$LASTPOS=21000983;\n    _this.jujiKeyPush1.hide();\n  },\n  die :function _trc_func_21001008_4() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=21001021;\n    _this.jujiKey.die();\n    //$LASTPOS=21001041;\n    _this.no1Key.die();\n    //$LASTPOS=21001060;\n    _this.jujiKeyPushU.die();\n    //$LASTPOS=21001085;\n    _this.jujiKeyPushL.die();\n    //$LASTPOS=21001110;\n    _this.jujiKeyPushR.die();\n    //$LASTPOS=21001135;\n    _this.jujiKeyPushD.die();\n    //$LASTPOS=21001160;\n    _this.jujiKeyPush1.die();\n    //$LASTPOS=21001185;\n    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);\n  },\n  padUpdate :function _trc_func_21001224_5() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var i;\n    var t;\n    \n    //$LASTPOS=21001258;\n    _this.keyPushL=0;\n    //$LASTPOS=21001277;\n    _this.keyPushR=0;\n    //$LASTPOS=21001296;\n    _this.keyPushU=0;\n    //$LASTPOS=21001315;\n    _this.keyPushD=0;\n    //$LASTPOS=21001334;\n    _this.keyPush1=0;\n    //$LASTPOS=21001359;\n    _this.padKeyNotapCnt++;\n    //$LASTPOS=21001383;\n    //$LASTPOS=21001388;\n    i = 0;\n    while(i<5) {\n      {\n        //$LASTPOS=21001436;\n        t = Tonyu.globals.$touches[i];\n        //$LASTPOS=21001466;\n        if (t.touched) {\n          //$LASTPOS=21001496;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {\n            //$LASTPOS=21001593;\n            _this.keyPushU=1;\n          }\n          //$LASTPOS=21001620;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {\n            //$LASTPOS=21001717;\n            _this.keyPushD=1;\n          }\n          //$LASTPOS=21001744;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n            //$LASTPOS=21001841;\n            _this.keyPushL=1;\n          }\n          //$LASTPOS=21001868;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n            //$LASTPOS=21001965;\n            _this.keyPushR=1;\n          }\n          //$LASTPOS=21001992;\n          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {\n            //$LASTPOS=21002054;\n            _this.keyPush1=1;\n          }\n          //$LASTPOS=21002081;\n          _this.padKeySW=1;\n          //$LASTPOS=21002108;\n          _this.padKeyNotapCnt=0;\n          \n        }\n      }\n      i++;\n    }\n    //$LASTPOS=21002173;\n    if (_this.keyPushL) {\n      //$LASTPOS=21002187;\n      _this.keyCntL++;\n    } else {\n      //$LASTPOS=21002204;\n      _this.keyCntL=0;\n    }\n    //$LASTPOS=21002222;\n    if (_this.keyPushR) {\n      //$LASTPOS=21002236;\n      _this.keyCntR++;\n    } else {\n      //$LASTPOS=21002253;\n      _this.keyCntR=0;\n    }\n    //$LASTPOS=21002271;\n    if (_this.keyPushU) {\n      //$LASTPOS=21002285;\n      _this.keyCntU++;\n    } else {\n      //$LASTPOS=21002302;\n      _this.keyCntU=0;\n    }\n    //$LASTPOS=21002320;\n    if (_this.keyPushD) {\n      //$LASTPOS=21002334;\n      _this.keyCntD++;\n    } else {\n      //$LASTPOS=21002351;\n      _this.keyCntD=0;\n    }\n    //$LASTPOS=21002369;\n    if (_this.keyPush1) {\n      //$LASTPOS=21002383;\n      _this.keyCnt1++;\n    } else {\n      //$LASTPOS=21002400;\n      _this.keyCnt1=0;\n    }\n    //$LASTPOS=21002435;\n    if (_this.keyPushL) {\n      //$LASTPOS=21002449;\n      _this.jujiKeyPushL.show();\n    } else {\n      //$LASTPOS=21002475;\n      _this.jujiKeyPushL.hide();\n    }\n    //$LASTPOS=21002501;\n    if (_this.keyPushR) {\n      //$LASTPOS=21002515;\n      _this.jujiKeyPushR.show();\n    } else {\n      //$LASTPOS=21002541;\n      _this.jujiKeyPushR.hide();\n    }\n    //$LASTPOS=21002567;\n    if (_this.keyPushU) {\n      //$LASTPOS=21002581;\n      _this.jujiKeyPushU.show();\n    } else {\n      //$LASTPOS=21002607;\n      _this.jujiKeyPushU.hide();\n    }\n    //$LASTPOS=21002633;\n    if (_this.keyPushD) {\n      //$LASTPOS=21002647;\n      _this.jujiKeyPushD.show();\n    } else {\n      //$LASTPOS=21002673;\n      _this.jujiKeyPushD.hide();\n    }\n    //$LASTPOS=21002699;\n    if (_this.keyPush1) {\n      //$LASTPOS=21002713;\n      _this.jujiKeyPush1.show();\n    } else {\n      //$LASTPOS=21002739;\n      _this.jujiKeyPush1.hide();\n    }\n  },\n  fiber$padUpdate :function _trc_func_21001224_6(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var i;\n    var t;\n    \n    //$LASTPOS=21001258;\n    _this.keyPushL=0;\n    //$LASTPOS=21001277;\n    _this.keyPushR=0;\n    //$LASTPOS=21001296;\n    _this.keyPushU=0;\n    //$LASTPOS=21001315;\n    _this.keyPushD=0;\n    //$LASTPOS=21001334;\n    _this.keyPush1=0;\n    //$LASTPOS=21001359;\n    _this.padKeyNotapCnt++;\n    //$LASTPOS=21001383;\n    //$LASTPOS=21001388;\n    i = 0;\n    while(i<5) {\n      {\n        //$LASTPOS=21001436;\n        t = Tonyu.globals.$touches[i];\n        //$LASTPOS=21001466;\n        if (t.touched) {\n          //$LASTPOS=21001496;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {\n            //$LASTPOS=21001593;\n            _this.keyPushU=1;\n          }\n          //$LASTPOS=21001620;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {\n            //$LASTPOS=21001717;\n            _this.keyPushD=1;\n          }\n          //$LASTPOS=21001744;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n            //$LASTPOS=21001841;\n            _this.keyPushL=1;\n          }\n          //$LASTPOS=21001868;\n          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n            //$LASTPOS=21001965;\n            _this.keyPushR=1;\n          }\n          //$LASTPOS=21001992;\n          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {\n            //$LASTPOS=21002054;\n            _this.keyPush1=1;\n          }\n          //$LASTPOS=21002081;\n          _this.padKeySW=1;\n          //$LASTPOS=21002108;\n          _this.padKeyNotapCnt=0;\n          \n        }\n      }\n      i++;\n    }\n    //$LASTPOS=21002173;\n    if (_this.keyPushL) {\n      //$LASTPOS=21002187;\n      _this.keyCntL++;\n    } else {\n      //$LASTPOS=21002204;\n      _this.keyCntL=0;\n    }\n    //$LASTPOS=21002222;\n    if (_this.keyPushR) {\n      //$LASTPOS=21002236;\n      _this.keyCntR++;\n    } else {\n      //$LASTPOS=21002253;\n      _this.keyCntR=0;\n    }\n    //$LASTPOS=21002271;\n    if (_this.keyPushU) {\n      //$LASTPOS=21002285;\n      _this.keyCntU++;\n    } else {\n      //$LASTPOS=21002302;\n      _this.keyCntU=0;\n    }\n    //$LASTPOS=21002320;\n    if (_this.keyPushD) {\n      //$LASTPOS=21002334;\n      _this.keyCntD++;\n    } else {\n      //$LASTPOS=21002351;\n      _this.keyCntD=0;\n    }\n    //$LASTPOS=21002369;\n    if (_this.keyPush1) {\n      //$LASTPOS=21002383;\n      _this.keyCnt1++;\n    } else {\n      //$LASTPOS=21002400;\n      _this.keyCnt1=0;\n    }\n    //$LASTPOS=21002435;\n    if (_this.keyPushL) {\n      //$LASTPOS=21002449;\n      _this.jujiKeyPushL.show();\n    } else {\n      //$LASTPOS=21002475;\n      _this.jujiKeyPushL.hide();\n    }\n    //$LASTPOS=21002501;\n    if (_this.keyPushR) {\n      //$LASTPOS=21002515;\n      _this.jujiKeyPushR.show();\n    } else {\n      //$LASTPOS=21002541;\n      _this.jujiKeyPushR.hide();\n    }\n    //$LASTPOS=21002567;\n    if (_this.keyPushU) {\n      //$LASTPOS=21002581;\n      _this.jujiKeyPushU.show();\n    } else {\n      //$LASTPOS=21002607;\n      _this.jujiKeyPushU.hide();\n    }\n    //$LASTPOS=21002633;\n    if (_this.keyPushD) {\n      //$LASTPOS=21002647;\n      _this.jujiKeyPushD.show();\n    } else {\n      //$LASTPOS=21002673;\n      _this.jujiKeyPushD.hide();\n    }\n    //$LASTPOS=21002699;\n    if (_this.keyPush1) {\n      //$LASTPOS=21002713;\n      _this.jujiKeyPush1.show();\n    } else {\n      //$LASTPOS=21002739;\n      _this.jujiKeyPush1.hide();\n    }\n    \n    _thread.retVal=_this;return;\n  },\n  getPadUp :function _trc_func_21002772_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntU;\n  },\n  fiber$getPadUp :function _trc_func_21002772_8(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntU;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getPadDown :function _trc_func_21002808_9() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntD;\n  },\n  fiber$getPadDown :function _trc_func_21002808_10(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntD;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getPadLeft :function _trc_func_21002844_11() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntL;\n  },\n  fiber$getPadLeft :function _trc_func_21002844_12(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntL;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getPadRight :function _trc_func_21002880_13() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntR;\n  },\n  fiber$getPadRight :function _trc_func_21002880_14(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntR;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getPadButton :function _trc_func_21002916_15(i) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var value;\n    \n    //$LASTPOS=21002940;\n    value;\n    //$LASTPOS=21002956;\n    if (i==0) {\n      //$LASTPOS=21002968;\n      value=_this.keyCnt1;\n    }\n    return value;\n  },\n  fiber$getPadButton :function _trc_func_21002916_16(_thread,i) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var value;\n    \n    //$LASTPOS=21002940;\n    value;\n    //$LASTPOS=21002956;\n    if (i==0) {\n      //$LASTPOS=21002968;\n      value=_this.keyCnt1;\n    }\n    _thread.retVal=value;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getUp :function _trc_func_21003010_17() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntU;\n  },\n  fiber$getUp :function _trc_func_21003010_18(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntU;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getDown :function _trc_func_21003043_19() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntD;\n  },\n  fiber$getDown :function _trc_func_21003043_20(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntD;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getLeft :function _trc_func_21003076_21() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntL;\n  },\n  fiber$getLeft :function _trc_func_21003076_22(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntL;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getRight :function _trc_func_21003109_23() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.keyCntR;\n  },\n  fiber$getRight :function _trc_func_21003109_24(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.keyCntR;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  getButton :function _trc_func_21003142_25(i) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var value;\n    \n    //$LASTPOS=21003163;\n    value;\n    //$LASTPOS=21003179;\n    if (i==0) {\n      //$LASTPOS=21003191;\n      value=_this.keyCnt1;\n    }\n    return value;\n  },\n  fiber$getButton :function _trc_func_21003142_26(_thread,i) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var value;\n    \n    //$LASTPOS=21003163;\n    value;\n    //$LASTPOS=21003179;\n    if (i==0) {\n      //$LASTPOS=21003191;\n      value=_this.keyCnt1;\n    }\n    _thread.retVal=value;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  isOnRect :function _trc_func_21003243_27(mx,my,rx,ry,rx2,ry2) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);\n  },\n  fiber$isOnRect :function _trc_func_21003243_28(_thread,mx,my,rx,ry,rx2,ry2) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  isOnRectWH :function _trc_func_21003357_29(mx,my,rx,ry,rw,rh) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);\n  },\n  fiber$isOnRectWH :function _trc_func_21003357_30(_thread,mx,my,rx,ry,rw,rh) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Pad,{"fullName":"kernel.Pad","namespace":"kernel","shortName":"Pad","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Panel=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_22000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_22000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_22000056_2(opt) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000072;\n    Tonyu.classes.kernel.Actor.apply( _this, [opt]);\n    //$LASTPOS=22000089;\n    _this.width=_this.width;\n    //$LASTPOS=22000112;\n    _this.height=_this.height;\n    //$LASTPOS=22000137;\n    if (_this.align==null) {\n      //$LASTPOS=22000153;\n      _this.align="center";\n    }\n    //$LASTPOS=22000174;\n    if (_this.alpha==null) {\n      //$LASTPOS=22000190;\n      _this.alpha=255;\n    }\n    //$LASTPOS=22000206;\n    if (_this._drawn==null) {\n      //$LASTPOS=22000223;\n      _this._drawn=false;\n    }\n    //$LASTPOS=22000242;\n    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});\n  },\n  setPanel :function _trc_func_22000284_3(width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000314;\n    _this.width=width;\n    //$LASTPOS=22000337;\n    _this.height=height;\n    //$LASTPOS=22000362;\n    _this.buf=$("<canvas>").attr({width: width,height: height});\n  },\n  fiber$setPanel :function _trc_func_22000284_4(_thread,width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=22000314;\n    _this.width=width;\n    //$LASTPOS=22000337;\n    _this.height=height;\n    //$LASTPOS=22000362;\n    _this.buf=$("<canvas>").attr({width: width,height: height});\n    \n    _thread.retVal=_this;return;\n  },\n  resize :function _trc_func_22000404_5(width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000432;\n    _this.setPanel(width,height);\n  },\n  fiber$resize :function _trc_func_22000404_6(_thread,width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22000404_7(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22000432;\n          _this.fiber$setPanel(_thread, width, height);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  getContext :function _trc_func_22000460_8() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000480;\n    _this._drawn=true;\n    return _this.buf[0].getContext("2d");\n  },\n  fiber$getContext :function _trc_func_22000460_9(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=22000480;\n    _this._drawn=true;\n    _thread.retVal=_this.buf[0].getContext("2d");return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  setFillStyle :function _trc_func_22000534_10(color) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000561;\n    _this.fillStyle=color;\n  },\n  fiber$setFillStyle :function _trc_func_22000534_11(_thread,color) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=22000561;\n    _this.fillStyle=color;\n    \n    _thread.retVal=_this;return;\n  },\n  fillRect :function _trc_func_22000587_12(x,y,rectWidth,rectHeight) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000629;\n    _this.ctx=_this.getContext();\n    //$LASTPOS=22000652;\n    _this.ctx.save();\n    //$LASTPOS=22000719;\n    _this.ctx.fillStyle=_this.fillStyle;\n    //$LASTPOS=22000749;\n    _this.ctx.fillRect(x,y,rectWidth,rectHeight);\n    //$LASTPOS=22000794;\n    _this.ctx.restore();\n  },\n  fiber$fillRect :function _trc_func_22000587_13(_thread,x,y,rectWidth,rectHeight) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22000587_14(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22000629;\n          _this.fiber$getContext(_thread);\n          __pc=1;return;\n        case 1:\n          _this.ctx=_thread.retVal;\n          \n          //$LASTPOS=22000652;\n          _this.ctx.save();\n          //$LASTPOS=22000719;\n          _this.ctx.fillStyle=_this.fillStyle;\n          //$LASTPOS=22000749;\n          _this.ctx.fillRect(x,y,rectWidth,rectHeight);\n          //$LASTPOS=22000794;\n          _this.ctx.restore();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  fillText :function _trc_func_22000813_15(text,x,y,size,align) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22000850;\n    _this.ctx=_this.getContext();\n    //$LASTPOS=22000873;\n    _this.ctx.save();\n    //$LASTPOS=22000940;\n    _this.ctx.textAlign=align;\n    //$LASTPOS=22000968;\n    _this.ctx.fillStyle=_this.fillStyle;\n    //$LASTPOS=22000998;\n    _this.ctx.font=size+"px \'Courier New\'";\n    //$LASTPOS=22001037;\n    _this.ctx.fillText(text,x,y);\n    //$LASTPOS=22001066;\n    _this.ctx.restore();\n  },\n  fiber$fillText :function _trc_func_22000813_16(_thread,text,x,y,size,align) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22000813_17(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22000850;\n          _this.fiber$getContext(_thread);\n          __pc=1;return;\n        case 1:\n          _this.ctx=_thread.retVal;\n          \n          //$LASTPOS=22000873;\n          _this.ctx.save();\n          //$LASTPOS=22000940;\n          _this.ctx.textAlign=align;\n          //$LASTPOS=22000968;\n          _this.ctx.fillStyle=_this.fillStyle;\n          //$LASTPOS=22000998;\n          _this.ctx.font=size+"px \'Courier New\'";\n          //$LASTPOS=22001037;\n          _this.ctx.fillText(text,x,y);\n          //$LASTPOS=22001066;\n          _this.ctx.restore();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  clearRect :function _trc_func_22001085_18(clearX,clearY,clearW,clearH) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22001131;\n    _this.ctx=_this.getContext();\n    //$LASTPOS=22001154;\n    _this.ctx.save();\n    //$LASTPOS=22001171;\n    _this.ctx.clearRect(clearX,clearY,clearW,clearH);\n    //$LASTPOS=22001220;\n    _this.ctx.restore();\n  },\n  fiber$clearRect :function _trc_func_22001085_19(_thread,clearX,clearY,clearW,clearH) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22001085_20(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22001131;\n          _this.fiber$getContext(_thread);\n          __pc=1;return;\n        case 1:\n          _this.ctx=_thread.retVal;\n          \n          //$LASTPOS=22001154;\n          _this.ctx.save();\n          //$LASTPOS=22001171;\n          _this.ctx.clearRect(clearX,clearY,clearW,clearH);\n          //$LASTPOS=22001220;\n          _this.ctx.restore();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  getPixel :function _trc_func_22001239_21(getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22001266;\n    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {\n      //$LASTPOS=22001365;\n      _this.ctx=_this.getContext();\n      //$LASTPOS=22001392;\n      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);\n      //$LASTPOS=22001444;\n      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];\n      \n    } else {\n      //$LASTPOS=22001584;\n      _this.colordata=[0,0,0,0];\n      \n    }\n    return (_this.colordata);\n  },\n  fiber$getPixel :function _trc_func_22001239_22(_thread,getX,getY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22001239_23(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22001266;\n          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }\n          //$LASTPOS=22001365;\n          _this.fiber$getContext(_thread);\n          __pc=1;return;\n        case 1:\n          _this.ctx=_thread.retVal;\n          \n          //$LASTPOS=22001392;\n          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);\n          //$LASTPOS=22001444;\n          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];\n          __pc=3;break;\n        case 2:\n          {\n            //$LASTPOS=22001584;\n            _this.colordata=[0,0,0,0];\n          }\n        case 3:\n          \n          _thread.exit((_this.colordata));return;\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  scroll :function _trc_func_22001640_24(scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22001671;\n    _this.ctx=_this.getContext();\n    //$LASTPOS=22001694;\n    _this.ctx.save();\n    //$LASTPOS=22001711;\n    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);\n    //$LASTPOS=22001772;\n    _this.clearRect(0,0,_this.width,_this.height);\n    //$LASTPOS=22001806;\n    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);\n    //$LASTPOS=22001858;\n    _this.ctx.restore();\n  },\n  fiber$scroll :function _trc_func_22001640_25(_thread,scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_22001640_26(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=22001671;\n          _this.fiber$getContext(_thread);\n          __pc=1;return;\n        case 1:\n          _this.ctx=_thread.retVal;\n          \n          //$LASTPOS=22001694;\n          _this.ctx.save();\n          //$LASTPOS=22001711;\n          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);\n          //$LASTPOS=22001772;\n          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);\n          __pc=2;return;\n        case 2:\n          \n          //$LASTPOS=22001806;\n          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);\n          //$LASTPOS=22001858;\n          _this.ctx.restore();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  draw :function _trc_func_22001877_27(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=22001894;\n    if (_this._drawn) {\n      //$LASTPOS=22001915;\n      _this.pImg=_this.buf[0];\n      //$LASTPOS=22001937;\n      ctx.save();\n      //$LASTPOS=22001958;\n      if (_this.align=="left") {\n        //$LASTPOS=22001990;\n        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);\n        \n      } else {\n        //$LASTPOS=22002042;\n        if (_this.align=="center") {\n          //$LASTPOS=22002076;\n          ctx.translate(_this.x,_this.y);\n          \n        } else {\n          //$LASTPOS=22002111;\n          if (_this.align=="right") {\n            //$LASTPOS=22002144;\n            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);\n            \n          }\n        }\n      }\n      //$LASTPOS=22002201;\n      if (_this.rotation!=0) {\n        //$LASTPOS=22002236;\n        ctx.rotate(_this.rotation/180*Math.PI);\n        \n      } else {\n        //$LASTPOS=22002304;\n        ctx.rotate(_this.rotate/180*Math.PI);\n        \n      }\n      //$LASTPOS=22002361;\n      ctx.globalAlpha=_this.alpha/255;\n      //$LASTPOS=22002402;\n      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);\n      //$LASTPOS=22002506;\n      ctx.restore();\n      \n    }\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_23000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_23000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_23000047_2(x,y,p) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var thg;\n    \n    //$LASTPOS=23000066;\n    if (Tonyu.runMode) {\n      //$LASTPOS=23000096;\n      thg = _this.currentThreadGroup();\n      //$LASTPOS=23000135;\n      if (thg) {\n        //$LASTPOS=23000144;\n        _this._th=thg.addObj(_this,"tMain");\n      }\n      //$LASTPOS=23000183;\n      _this.initSprite();\n      \n    }\n    //$LASTPOS=23000209;\n    if (typeof  x=="object") {\n      //$LASTPOS=23000233;\n      Tonyu.extend(_this,x);\n    } else {\n      //$LASTPOS=23000266;\n      if (typeof  x=="number") {\n        //$LASTPOS=23000301;\n        _this.x=x;\n        //$LASTPOS=23000320;\n        _this.y=y;\n        //$LASTPOS=23000339;\n        _this.p=p;\n        \n      }\n    }\n  },\n  draw :function _trc_func_23000360_3(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23000376;\n    _this.onDraw();\n    //$LASTPOS=23000391;\n    if (_this._isInvisible) {\n      return _this;\n    }\n    //$LASTPOS=23000422;\n    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);\n  },\n  setVisible :function _trc_func_23000441_4(v) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23000463;\n    _this._isInvisible=! v;\n  },\n  fiber$setVisible :function _trc_func_23000441_5(_thread,v) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=23000463;\n    _this._isInvisible=! v;\n    \n    _thread.retVal=_this;return;\n  },\n  onDraw :function _trc_func_23000484_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$onDraw :function _trc_func_23000484_7(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  update :function _trc_func_23000506_8() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23000523;\n    _this.onUpdate();\n    //$LASTPOS=23000540;\n    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);\n  },\n  fiber$update :function _trc_func_23000506_9(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=23000523;\n    _this.onUpdate();\n    \n    _thread.enter(function _trc_func_23000506_10(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=23000540;\n          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  onUpdate :function _trc_func_23000560_11() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  initSprite :function _trc_func_23000584_12() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23000605;\n    if (_this.layer&&typeof  _this.layer.add=="function") {\n      //$LASTPOS=23000657;\n      _this.layer.add(_this);\n      \n    } else {\n      //$LASTPOS=23000695;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    //$LASTPOS=23000727;\n    _this.onAppear();\n  },\n  fiber$initSprite :function _trc_func_23000584_13(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=23000605;\n    if (_this.layer&&typeof  _this.layer.add=="function") {\n      //$LASTPOS=23000657;\n      _this.layer.add(_this);\n      \n    } else {\n      //$LASTPOS=23000695;\n      Tonyu.globals.$Sprites.add(_this);\n      \n    }\n    \n    _thread.enter(function _trc_func_23000584_14(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=23000727;\n          _this.fiber$onAppear(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  tMain :function _trc_func_23000743_15() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23000759;\n    _this.main();\n    //$LASTPOS=23000772;\n    _this.die();\n  },\n  fiber$tMain :function _trc_func_23000743_16(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_23000743_17(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=23000759;\n          _this.fiber$main(_thread);\n          __pc=1;return;\n        case 1:\n          \n          //$LASTPOS=23000772;\n          _this.die();\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  color :function _trc_func_23000783_18(r,g,b) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return "rgb("+[r,g,b].join(",")+")";\n  },\n  fiber$color :function _trc_func_23000783_19(_thread,r,g,b) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  drawText :function _trc_func_23000845_20(x,y,text,col,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var tp;\n    \n    //$LASTPOS=23000881;\n    if (Tonyu.globals.$debug) {\n      return _this;\n    }\n    //$LASTPOS=23000906;\n    if (! size) {\n      //$LASTPOS=23000917;\n      size=15;\n    }\n    //$LASTPOS=23000931;\n    if (! col) {\n      //$LASTPOS=23000941;\n      col="cyan";\n    }\n    //$LASTPOS=23000958;\n    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=23001012;\n    if (tp.length>0) {\n      //$LASTPOS=23001040;\n      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});\n      \n    } else {\n      //$LASTPOS=23001119;\n      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});\n      \n    }\n  },\n  fiber$drawText :function _trc_func_23000845_21(_thread,x,y,text,col,size) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var tp;\n    \n    //$LASTPOS=23000881;\n    if (Tonyu.globals.$debug) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=23000906;\n    if (! size) {\n      //$LASTPOS=23000917;\n      size=15;\n    }\n    //$LASTPOS=23000931;\n    if (! col) {\n      //$LASTPOS=23000941;\n      col="cyan";\n    }\n    //$LASTPOS=23000958;\n    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=23001012;\n    if (tp.length>0) {\n      //$LASTPOS=23001040;\n      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});\n      \n    } else {\n      //$LASTPOS=23001119;\n      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  drawLine :function _trc_func_23001174_22(x,y,tx,ty,col) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var tp;\n    \n    //$LASTPOS=23001206;\n    if (! col) {\n      //$LASTPOS=23001216;\n      col="white";\n    }\n    //$LASTPOS=23001234;\n    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=23001288;\n    if (tp.length>0) {\n      //$LASTPOS=23001316;\n      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    } else {\n      //$LASTPOS=23001367;\n      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    }\n  },\n  fiber$drawLine :function _trc_func_23001174_23(_thread,x,y,tx,ty,col) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var tp;\n    \n    //$LASTPOS=23001206;\n    if (! col) {\n      //$LASTPOS=23001216;\n      col="white";\n    }\n    //$LASTPOS=23001234;\n    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {\n      \n      return t.hidden;\n    });\n    //$LASTPOS=23001288;\n    if (tp.length>0) {\n      //$LASTPOS=23001316;\n      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    } else {\n      //$LASTPOS=23001367;\n      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  appear :function _trc_func_23001407_24(t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return t;\n  },\n  fiber$appear :function _trc_func_23001407_25(_thread,t) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=t;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  trunc :function _trc_func_23001439_26(f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return Math.trunc(f);\n  },\n  loadPage :function _trc_func_23001482_27(page,arg) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=23001508;\n    _this.all().die();\n    //$LASTPOS=23001526;\n    new page(arg);\n    //$LASTPOS=23001546;\n    _this.die();\n  },\n  fiber$loadPage :function _trc_func_23001482_28(_thread,page,arg) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=23001508;\n    _this.all().die();\n    //$LASTPOS=23001526;\n    new page(arg);\n    //$LASTPOS=23001546;\n    _this.die();\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_24000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_24000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_24000077_2(opt) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=24000095;\n    _this.extend(opt);\n    //$LASTPOS=24000142;\n    _this.resize(_this.width,_this.height);\n    //$LASTPOS=24000170;\n    _this.cw=_this.canvas.width();\n    //$LASTPOS=24000194;\n    _this.ch=_this.canvas.height();\n    //$LASTPOS=24000219;\n    _this.cctx=_this.canvas[0].getContext("2d");\n    //$LASTPOS=24000257;\n    _this.color="rgb(20,80,180)";\n    //$LASTPOS=24000291;\n    _this.sx=0;\n    //$LASTPOS=24000302;\n    _this.sy=0;\n    //$LASTPOS=24000313;\n    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;\n  },\n  resize :function _trc_func_24000349_3(width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=24000378;\n    _this.width=width;\n    //$LASTPOS=24000401;\n    _this.height=height;\n    //$LASTPOS=24000426;\n    _this.buf=$("<canvas>").attr({width: width,height: height});\n    //$LASTPOS=24000469;\n    _this.ctx=_this.buf[0].getContext("2d");\n    //$LASTPOS=24000505;\n    Tonyu.globals.$screenWidth=width;\n    //$LASTPOS=24000530;\n    Tonyu.globals.$screenHeight=height;\n    //$LASTPOS=24000557;\n    if (Tonyu.globals.$panel) {\n      //$LASTPOS=24000578;\n      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n      \n    }\n  },\n  fiber$resize :function _trc_func_24000349_4(_thread,width,height) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=24000378;\n    _this.width=width;\n    //$LASTPOS=24000401;\n    _this.height=height;\n    //$LASTPOS=24000426;\n    _this.buf=$("<canvas>").attr({width: width,height: height});\n    //$LASTPOS=24000469;\n    _this.ctx=_this.buf[0].getContext("2d");\n    //$LASTPOS=24000505;\n    Tonyu.globals.$screenWidth=width;\n    //$LASTPOS=24000530;\n    Tonyu.globals.$screenHeight=height;\n    //$LASTPOS=24000557;\n    if (Tonyu.globals.$panel) {\n      //$LASTPOS=24000578;\n      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n      \n    }\n    \n    _thread.retVal=_this;return;\n  },\n  shouldDraw1x1 :function _trc_func_24000634_5(srcw,srch,dstw,dsth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var larger;\n    var smaller;\n    \n    //$LASTPOS=24000712;\n    larger = 200;\n    //$LASTPOS=24000733;\n    smaller = 5;\n    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;\n  },\n  fiber$shouldDraw1x1 :function _trc_func_24000634_6(_thread,srcw,srch,dstw,dsth) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var larger;\n    var smaller;\n    \n    //$LASTPOS=24000712;\n    larger = 200;\n    //$LASTPOS=24000733;\n    smaller = 5;\n    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_24000853_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var calcw;\n    var calch;\n    var marginw;\n    var marginh;\n    \n    //$LASTPOS=24000868;\n    _this.cw=_this.canvas.width();\n    //$LASTPOS=24000892;\n    _this.ch=_this.canvas.height();\n    //$LASTPOS=24000917;\n    calcw = _this.ch/_this.height*_this.width;\n    //$LASTPOS=24000961;\n    calch = _this.cw/_this.width*_this.height;\n    //$LASTPOS=24001005;\n    if (calch>_this.ch) {\n      //$LASTPOS=24001019;\n      calch=_this.ch;\n    }\n    //$LASTPOS=24001034;\n    if (calcw>_this.cw) {\n      //$LASTPOS=24001048;\n      calcw=_this.cw;\n    }\n    //$LASTPOS=24001063;\n    _this.cctx.clearRect(0,0,_this.cw,_this.ch);\n    //$LASTPOS=24001095;\n    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n      //$LASTPOS=24001151;\n      calcw=_this.width;\n      //$LASTPOS=24001163;\n      calch=_this.height;\n      \n    }\n    //$LASTPOS=24001189;\n    marginw = Math.floor((_this.cw-calcw)/2);\n    //$LASTPOS=24001232;\n    marginh = Math.floor((_this.ch-calch)/2);\n    //$LASTPOS=24001275;\n    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);\n  },\n  canvas2buf :function _trc_func_24001364_8(point) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var calcw;\n    var calch;\n    var marginw;\n    var marginh;\n    \n    //$LASTPOS=24001390;\n    calcw = _this.ch/_this.height*_this.width;\n    //$LASTPOS=24001434;\n    calch = _this.cw/_this.width*_this.height;\n    //$LASTPOS=24001478;\n    if (calch>_this.ch) {\n      //$LASTPOS=24001492;\n      calch=_this.ch;\n    }\n    //$LASTPOS=24001507;\n    if (calcw>_this.cw) {\n      //$LASTPOS=24001521;\n      calcw=_this.cw;\n    }\n    //$LASTPOS=24001536;\n    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n      //$LASTPOS=24001592;\n      calcw=_this.width;\n      //$LASTPOS=24001604;\n      calch=_this.height;\n      \n    }\n    //$LASTPOS=24001630;\n    marginw = Math.floor((_this.cw-calcw)/2);\n    //$LASTPOS=24001673;\n    marginh = Math.floor((_this.ch-calch)/2);\n    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};\n  },\n  fiber$canvas2buf :function _trc_func_24001364_9(_thread,point) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var calcw;\n    var calch;\n    var marginw;\n    var marginh;\n    \n    //$LASTPOS=24001390;\n    calcw = _this.ch/_this.height*_this.width;\n    //$LASTPOS=24001434;\n    calch = _this.cw/_this.width*_this.height;\n    //$LASTPOS=24001478;\n    if (calch>_this.ch) {\n      //$LASTPOS=24001492;\n      calch=_this.ch;\n    }\n    //$LASTPOS=24001507;\n    if (calcw>_this.cw) {\n      //$LASTPOS=24001521;\n      calcw=_this.cw;\n    }\n    //$LASTPOS=24001536;\n    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n      //$LASTPOS=24001592;\n      calcw=_this.width;\n      //$LASTPOS=24001604;\n      calch=_this.height;\n      \n    }\n    //$LASTPOS=24001630;\n    marginw = Math.floor((_this.cw-calcw)/2);\n    //$LASTPOS=24001673;\n    marginh = Math.floor((_this.ch-calch)/2);\n    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  setBGColor :function _trc_func_24001810_10(color) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=24001835;\n    _this.color=color;\n  },\n  fiber$setBGColor :function _trc_func_24001810_11(_thread,color) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=24001835;\n    _this.color=color;\n    \n    _thread.retVal=_this;return;\n  },\n  fillCanvas :function _trc_func_24001857_12(cv) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var ctx;\n    \n    //$LASTPOS=24001879;\n    ctx = cv.getContext("2d");\n    //$LASTPOS=24001913;\n    ctx.save();\n    //$LASTPOS=24001930;\n    ctx.fillStyle=Tonyu.globals.$Screen.color;\n    //$LASTPOS=24001964;\n    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);\n    //$LASTPOS=24001990;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    //$LASTPOS=24002033;\n    if (_this.isDrawGrid) {\n      //$LASTPOS=24002049;\n      _this.drawGrid(cv);\n    }\n    //$LASTPOS=24002068;\n    ctx.restore();\n  },\n  fiber$fillCanvas :function _trc_func_24001857_13(_thread,cv) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var ctx;\n    \n    //$LASTPOS=24001879;\n    ctx = cv.getContext("2d");\n    //$LASTPOS=24001913;\n    ctx.save();\n    //$LASTPOS=24001930;\n    ctx.fillStyle=Tonyu.globals.$Screen.color;\n    //$LASTPOS=24001964;\n    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);\n    //$LASTPOS=24001990;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    //$LASTPOS=24002033;\n    if (_this.isDrawGrid) {\n      //$LASTPOS=24002049;\n      _this.drawGrid(cv);\n    }\n    //$LASTPOS=24002068;\n    ctx.restore();\n    \n    _thread.retVal=_this;return;\n  },\n  scrollTo :function _trc_func_24002087_14(scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=24002412;\n    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);\n  },\n  fiber$scrollTo :function _trc_func_24002087_15(_thread,scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=24002412;\n    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{\n  main :function _trc_func_25000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_25000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_25000022_2(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{\n  main :function _trc_func_26000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_26000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_26000022_2(x,y,p,f) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=26000043;\n    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);\n    //$LASTPOS=26000062;\n    _this.f=f;\n    //$LASTPOS=26000077;\n    if (! _this.x) {\n      //$LASTPOS=26000090;\n      _this.x=0;\n    }\n    //$LASTPOS=26000105;\n    if (! _this.y) {\n      //$LASTPOS=26000118;\n      _this.y=0;\n    }\n    //$LASTPOS=26000133;\n    if (! _this.p) {\n      //$LASTPOS=26000146;\n      _this.p=0;\n    }\n  },\n  draw :function _trc_func_26000160_3(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=26000176;\n    if (_this.f) {\n      //$LASTPOS=26000194;\n      if (! _this.scaleY) {\n        //$LASTPOS=26000207;\n        _this.scaleY=_this.scaleX;\n      }\n      //$LASTPOS=26000231;\n      _this.scaleX*=- 1;\n      \n    }\n    //$LASTPOS=26000255;\n    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);\n    //$LASTPOS=26000275;\n    if (_this.f) {\n      //$LASTPOS=26000282;\n      _this.scaleX*=- 1;\n    }\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_27000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_27000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_27000031_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27000045;\n    _this.sprites=[];\n    //$LASTPOS=27000062;\n    _this.imageList=[];\n    //$LASTPOS=27000081;\n    _this.hitWatchers=[];\n    //$LASTPOS=27000102;\n    _this.isDrawGrid=Tonyu.noviceMode;\n    //$LASTPOS=27000136;\n    _this.sx=0;\n    //$LASTPOS=27000147;\n    _this.sy=0;\n    //$LASTPOS=27000158;\n    _this.objId=0;\n  },\n  add :function _trc_func_27000171_3(s) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27000194;\n    if (s.__addedToSprites) {\n      return _this;\n    }\n    //$LASTPOS=27000231;\n    _this.sprites.push(s);\n    //$LASTPOS=27000253;\n    if (s.__genId==null) {\n      //$LASTPOS=27000283;\n      s.__genId=_this.objId;\n      //$LASTPOS=27000309;\n      _this.objId++;\n      \n    }\n    //$LASTPOS=27000330;\n    s.__addedToSprites=_this;\n    return s;\n  },\n  fiber$add :function _trc_func_27000171_4(_thread,s) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=27000194;\n    if (s.__addedToSprites) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=27000231;\n    _this.sprites.push(s);\n    //$LASTPOS=27000253;\n    if (s.__genId==null) {\n      //$LASTPOS=27000283;\n      s.__genId=_this.objId;\n      //$LASTPOS=27000309;\n      _this.objId++;\n      \n    }\n    //$LASTPOS=27000330;\n    s.__addedToSprites=_this;\n    _thread.retVal=s;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  remove :function _trc_func_27000374_5(s) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var idx;\n    \n    //$LASTPOS=27000400;\n    idx = _this.sprites.indexOf(s);\n    //$LASTPOS=27000433;\n    if (idx<0) {\n      return _this;\n    }\n    //$LASTPOS=27000457;\n    _this.sprites.splice(idx,1);\n    //$LASTPOS=27000485;\n    delete s.__addedToSprites;\n  },\n  fiber$remove :function _trc_func_27000374_6(_thread,s) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var idx;\n    \n    //$LASTPOS=27000400;\n    idx = _this.sprites.indexOf(s);\n    //$LASTPOS=27000433;\n    if (idx<0) {\n      _thread.retVal=_this;return;\n      \n    }\n    //$LASTPOS=27000457;\n    _this.sprites.splice(idx,1);\n    //$LASTPOS=27000485;\n    delete s.__addedToSprites;\n    \n    _thread.retVal=_this;return;\n  },\n  clear :function _trc_func_27000516_7() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27000534;\n    _this.sprites.splice(0,_this.sprites.length);\n  },\n  fiber$clear :function _trc_func_27000516_8(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=27000534;\n    _this.sprites.splice(0,_this.sprites.length);\n    \n    _thread.retVal=_this;return;\n  },\n  compOrder :function _trc_func_27000570_9(obj1,obj2) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var val1;\n    var val2;\n    \n    //$LASTPOS=27000607;\n    val1 = obj1.zOrder;\n    //$LASTPOS=27000634;\n    val2 = obj2.zOrder;\n    //$LASTPOS=27000661;\n    if (val1>val2) {\n      return - 1;\n      \n    } else {\n      //$LASTPOS=27000707;\n      if (val1<val2) {\n        return 1;\n        \n      } else {\n        //$LASTPOS=27000752;\n        if (val1==val2) {\n          //$LASTPOS=27000777;\n          if (obj1.__genId>obj2.__genId) {\n            return 1;\n            \n          } else {\n            return - 1;\n            \n          }\n          return 0;\n          \n        }\n      }\n    }\n  },\n  fiber$compOrder :function _trc_func_27000570_10(_thread,obj1,obj2) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var val1;\n    var val2;\n    \n    //$LASTPOS=27000607;\n    val1 = obj1.zOrder;\n    //$LASTPOS=27000634;\n    val2 = obj2.zOrder;\n    //$LASTPOS=27000661;\n    if (val1>val2) {\n      _thread.retVal=- 1;return;\n      \n      \n    } else {\n      //$LASTPOS=27000707;\n      if (val1<val2) {\n        _thread.retVal=1;return;\n        \n        \n      } else {\n        //$LASTPOS=27000752;\n        if (val1==val2) {\n          //$LASTPOS=27000777;\n          if (obj1.__genId>obj2.__genId) {\n            _thread.retVal=1;return;\n            \n            \n          } else {\n            _thread.retVal=- 1;return;\n            \n            \n          }\n          _thread.retVal=0;return;\n          \n          \n        }\n      }\n    }\n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_27000912_11(cv) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var ctx;\n    var orderArray;\n    \n    //$LASTPOS=27000937;\n    ctx = cv.getContext("2d");\n    //$LASTPOS=27000971;\n    ctx.save();\n    //$LASTPOS=27001116;\n    orderArray = [];\n    //$LASTPOS=27001140;\n    orderArray=orderArray.concat(_this.sprites);\n    //$LASTPOS=27001184;\n    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));\n    //$LASTPOS=27001217;\n    ctx.translate(- _this.sx,- _this.sy);\n    //$LASTPOS=27001246;\n    orderArray.forEach(function (s) {\n      \n      //$LASTPOS=27001280;\n      s.draw(ctx);\n    });\n    //$LASTPOS=27001307;\n    ctx.restore();\n  },\n  checkHit :function _trc_func_27001326_12() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27001353;\n    _this.hitWatchers.forEach(function (w) {\n      \n      //$LASTPOS=27001397;\n      _this.sprites.forEach(function (a) {\n        var a_owner;\n        \n        //$LASTPOS=27001485;\n        a_owner = a;\n        //$LASTPOS=27001527;\n        if (! (a_owner instanceof w.A)) {\n          return _this;\n        }\n        //$LASTPOS=27001580;\n        _this.sprites.forEach(function (b) {\n          var b_owner;\n          \n          //$LASTPOS=27001628;\n          b_owner = b;\n          //$LASTPOS=27001674;\n          if (a===b) {\n            return _this;\n          }\n          //$LASTPOS=27001710;\n          if (! (b_owner instanceof w.B)) {\n            return _this;\n          }\n          //$LASTPOS=27001815;\n          if (a.crashTo1(b)) {\n            //$LASTPOS=27001918;\n            w.h(a_owner,b_owner);\n            \n          }\n        });\n      });\n    });\n  },\n  fiber$checkHit :function _trc_func_27001326_13(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=27001353;\n    _this.hitWatchers.forEach(function (w) {\n      \n      //$LASTPOS=27001397;\n      _this.sprites.forEach(function (a) {\n        var a_owner;\n        \n        //$LASTPOS=27001485;\n        a_owner = a;\n        //$LASTPOS=27001527;\n        if (! (a_owner instanceof w.A)) {\n          return _this;\n        }\n        //$LASTPOS=27001580;\n        _this.sprites.forEach(function (b) {\n          var b_owner;\n          \n          //$LASTPOS=27001628;\n          b_owner = b;\n          //$LASTPOS=27001674;\n          if (a===b) {\n            return _this;\n          }\n          //$LASTPOS=27001710;\n          if (! (b_owner instanceof w.B)) {\n            return _this;\n          }\n          //$LASTPOS=27001815;\n          if (a.crashTo1(b)) {\n            //$LASTPOS=27001918;\n            w.h(a_owner,b_owner);\n            \n          }\n        });\n      });\n    });\n    \n    _thread.retVal=_this;return;\n  },\n  watchHit :function _trc_func_27002002_14(typeA,typeB,onHit) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var p;\n    \n    //$LASTPOS=27002048;\n    p = {A: typeA,B: typeB,h: onHit};\n    //$LASTPOS=27002112;\n    _this.hitWatchers.push(p);\n  },\n  drawGrid :function _trc_func_27002137_15(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var ctx;\n    var i;\n    \n    //$LASTPOS=27002165;\n    ctx = c.getContext("2d");\n    //$LASTPOS=27002198;\n    ctx.textBaseline="top";\n    //$LASTPOS=27002227;\n    ctx.save();\n    //$LASTPOS=27002244;\n    ctx.strokeStyle="rgb(40,100,200)";\n    //$LASTPOS=27002284;\n    //$LASTPOS=27002289;\n    i = 0;\n    while(i<c.width) {\n      {\n        //$LASTPOS=27002329;\n        ctx.beginPath();\n        //$LASTPOS=27002355;\n        ctx.lineWidth=(i%100==0?4:1);\n        //$LASTPOS=27002401;\n        ctx.moveTo(i,0);\n        //$LASTPOS=27002427;\n        ctx.lineTo(i,c.height);\n        //$LASTPOS=27002460;\n        ctx.closePath();\n        //$LASTPOS=27002486;\n        ctx.stroke();\n      }\n      i+=10;\n    }\n    //$LASTPOS=27002518;\n    //$LASTPOS=27002523;\n    i = 0;\n    while(i<c.height) {\n      {\n        //$LASTPOS=27002564;\n        ctx.beginPath();\n        //$LASTPOS=27002590;\n        ctx.lineWidth=(i%100==0?4:1);\n        //$LASTPOS=27002636;\n        ctx.moveTo(0,i);\n        //$LASTPOS=27002662;\n        ctx.lineTo(c.width,i);\n        //$LASTPOS=27002694;\n        ctx.closePath();\n        //$LASTPOS=27002720;\n        ctx.stroke();\n      }\n      i+=10;\n    }\n    //$LASTPOS=27002746;\n    ctx.fillStyle="white";\n    //$LASTPOS=27002774;\n    ctx.font="15px monospaced";\n    //$LASTPOS=27002807;\n    //$LASTPOS=27002812;\n    i = 100;\n    while(i<c.width) {\n      {\n        //$LASTPOS=27002855;\n        ctx.fillText(i,i,0);\n      }\n      i+=100;\n    }\n    //$LASTPOS=27002889;\n    //$LASTPOS=27002894;\n    i = 100;\n    while(i<c.height) {\n      {\n        //$LASTPOS=27002938;\n        ctx.fillText(i,0,i);\n      }\n      i+=100;\n    }\n    //$LASTPOS=27002972;\n    ctx.restore();\n  },\n  fiber$drawGrid :function _trc_func_27002137_16(_thread,c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var ctx;\n    var i;\n    \n    //$LASTPOS=27002165;\n    ctx = c.getContext("2d");\n    //$LASTPOS=27002198;\n    ctx.textBaseline="top";\n    //$LASTPOS=27002227;\n    ctx.save();\n    //$LASTPOS=27002244;\n    ctx.strokeStyle="rgb(40,100,200)";\n    //$LASTPOS=27002284;\n    //$LASTPOS=27002289;\n    i = 0;\n    while(i<c.width) {\n      {\n        //$LASTPOS=27002329;\n        ctx.beginPath();\n        //$LASTPOS=27002355;\n        ctx.lineWidth=(i%100==0?4:1);\n        //$LASTPOS=27002401;\n        ctx.moveTo(i,0);\n        //$LASTPOS=27002427;\n        ctx.lineTo(i,c.height);\n        //$LASTPOS=27002460;\n        ctx.closePath();\n        //$LASTPOS=27002486;\n        ctx.stroke();\n      }\n      i+=10;\n    }\n    //$LASTPOS=27002518;\n    //$LASTPOS=27002523;\n    i = 0;\n    while(i<c.height) {\n      {\n        //$LASTPOS=27002564;\n        ctx.beginPath();\n        //$LASTPOS=27002590;\n        ctx.lineWidth=(i%100==0?4:1);\n        //$LASTPOS=27002636;\n        ctx.moveTo(0,i);\n        //$LASTPOS=27002662;\n        ctx.lineTo(c.width,i);\n        //$LASTPOS=27002694;\n        ctx.closePath();\n        //$LASTPOS=27002720;\n        ctx.stroke();\n      }\n      i+=10;\n    }\n    //$LASTPOS=27002746;\n    ctx.fillStyle="white";\n    //$LASTPOS=27002774;\n    ctx.font="15px monospaced";\n    //$LASTPOS=27002807;\n    //$LASTPOS=27002812;\n    i = 100;\n    while(i<c.width) {\n      {\n        //$LASTPOS=27002855;\n        ctx.fillText(i,i,0);\n      }\n      i+=100;\n    }\n    //$LASTPOS=27002889;\n    //$LASTPOS=27002894;\n    i = 100;\n    while(i<c.height) {\n      {\n        //$LASTPOS=27002938;\n        ctx.fillText(i,0,i);\n      }\n      i+=100;\n    }\n    //$LASTPOS=27002972;\n    ctx.restore();\n    \n    _thread.retVal=_this;return;\n  },\n  setImageList :function _trc_func_27002991_17(il) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27003024;\n    _this.imageList=il;\n  },\n  fiber$setImageList :function _trc_func_27002991_18(_thread,il) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=27003024;\n    _this.imageList=il;\n    \n    _thread.retVal=_this;return;\n  },\n  getImageList :function _trc_func_27003042_19() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    return _this.imageList;\n  },\n  fiber$getImageList :function _trc_func_27003042_20(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    _thread.retVal=_this.imageList;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  scrollTo :function _trc_func_27003095_21(scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=27003136;\n    _this.sx=scrollX;\n    //$LASTPOS=27003153;\n    _this.sy=scrollY;\n  },\n  fiber$scrollTo :function _trc_func_27003095_22(_thread,scrollX,scrollY) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=27003136;\n    _this.sx=scrollX;\n    //$LASTPOS=27003153;\n    _this.sy=scrollY;\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_28000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_28000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_28000016_2(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=28000034;\n    if (_this.hidden) {\n      return _this;\n    }\n    //$LASTPOS=28000065;\n    ctx.strokeStyle=_this.col;\n    //$LASTPOS=28000091;\n    ctx.beginPath();\n    //$LASTPOS=28000113;\n    ctx.moveTo(_this.x,_this.y);\n    //$LASTPOS=28000135;\n    ctx.lineTo(_this.tx,_this.ty);\n    //$LASTPOS=28000159;\n    ctx.stroke();\n    //$LASTPOS=28000178;\n    _this.hidden=true;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{\n  main :function _trc_func_29000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_29000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  setBGColor :function _trc_func_29000042_2(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=29000064;\n    Tonyu.globals.$Screen.setBGColor(c);\n  },\n  fiber$setBGColor :function _trc_func_29000042_3(_thread,c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=29000064;\n    Tonyu.globals.$Screen.setBGColor(c);\n    \n    _thread.retVal=_this;return;\n  },\n  load :function _trc_func_29000091_4(fileName) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var f;\n    var o;\n    \n    //$LASTPOS=29000469;\n    f = _this.file("../maps/").rel(fileName);\n    //$LASTPOS=29000512;\n    o = f.obj();\n    //$LASTPOS=29000532;\n    _this.chipWidth=o.chipWidth;\n    //$LASTPOS=29000560;\n    _this.chipHeight=o.chipHeight;\n    //$LASTPOS=29000590;\n    _this.baseData=o.baseData;\n    //$LASTPOS=29000616;\n    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);\n    //$LASTPOS=29000658;\n    _this.mapData=_this.mapTable;\n    //$LASTPOS=29000681;\n    _this.row=_this.mapTable.length;\n    //$LASTPOS=29000707;\n    _this.col=_this.mapTable[0].length;\n    //$LASTPOS=29000736;\n    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);\n    //$LASTPOS=29000780;\n    _this.mapOnData=_this.mapOnTable;\n    //$LASTPOS=29000813;\n    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n    //$LASTPOS=29000885;\n    _this.initMap();\n  },\n  fiber$load :function _trc_func_29000091_5(_thread,fileName) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var f;\n    var o;\n    \n    //$LASTPOS=29000469;\n    f = _this.file("../maps/").rel(fileName);\n    //$LASTPOS=29000512;\n    o = f.obj();\n    //$LASTPOS=29000532;\n    _this.chipWidth=o.chipWidth;\n    //$LASTPOS=29000560;\n    _this.chipHeight=o.chipHeight;\n    //$LASTPOS=29000590;\n    _this.baseData=o.baseData;\n    \n    _thread.enter(function _trc_func_29000091_6(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=29000616;\n          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);\n          __pc=1;return;\n        case 1:\n          _this.mapTable=_thread.retVal;\n          \n          //$LASTPOS=29000658;\n          _this.mapData=_this.mapTable;\n          //$LASTPOS=29000681;\n          _this.row=_this.mapTable.length;\n          //$LASTPOS=29000707;\n          _this.col=_this.mapTable[0].length;\n          //$LASTPOS=29000736;\n          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);\n          __pc=2;return;\n        case 2:\n          _this.mapOnTable=_thread.retVal;\n          \n          //$LASTPOS=29000780;\n          _this.mapOnData=_this.mapOnTable;\n          //$LASTPOS=29000813;\n          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n          //$LASTPOS=29000885;\n          _this.fiber$initMap(_thread);\n          __pc=3;return;\n        case 3:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  conv :function _trc_func_29000903_7(mat,tbl) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var res;\n    \n    //$LASTPOS=29000926;\n    res = [];\n    //$LASTPOS=29000943;\n    mat.forEach(function (row) {\n      var rrow;\n      \n      //$LASTPOS=29000973;\n      rrow = [];\n      //$LASTPOS=29000995;\n      res.push(rrow);\n      //$LASTPOS=29001020;\n      row.forEach(function (dat) {\n        var t;\n        \n        //$LASTPOS=29001067;\n        t = tbl[dat[0]];\n        //$LASTPOS=29001099;\n        if (t) {\n          //$LASTPOS=29001106;\n          rrow.push(Tonyu.globals[t.name]+dat[1]);\n        } else {\n          //$LASTPOS=29001165;\n          rrow.push(dat[1]);\n        }\n      });\n    });\n    return res;\n  },\n  fiber$conv :function _trc_func_29000903_8(_thread,mat,tbl) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var res;\n    \n    //$LASTPOS=29000926;\n    res = [];\n    //$LASTPOS=29000943;\n    mat.forEach(function (row) {\n      var rrow;\n      \n      //$LASTPOS=29000973;\n      rrow = [];\n      //$LASTPOS=29000995;\n      res.push(rrow);\n      //$LASTPOS=29001020;\n      row.forEach(function (dat) {\n        var t;\n        \n        //$LASTPOS=29001067;\n        t = tbl[dat[0]];\n        //$LASTPOS=29001099;\n        if (t) {\n          //$LASTPOS=29001106;\n          rrow.push(Tonyu.globals[t.name]+dat[1]);\n        } else {\n          //$LASTPOS=29001165;\n          rrow.push(dat[1]);\n        }\n      });\n    });\n    _thread.retVal=res;return;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T1Map,{"fullName":"kernel.T1Map","namespace":"kernel","shortName":"T1Map","decls":{"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T1Page=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{\n  main :function _trc_func_30000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_30000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initGlobals :function _trc_func_30000022_2() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=30000044;\n    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;\n    //$LASTPOS=30000074;\n    Tonyu.globals.$Boot.setFrameRate(60);\n    //$LASTPOS=30000103;\n    Tonyu.globals.$clBlack=_this.color(0,0,0);\n    //$LASTPOS=30000131;\n    Tonyu.globals.$clRed=_this.color(255,0,0);\n    //$LASTPOS=30000159;\n    Tonyu.globals.$clGreen=_this.color(0,255,0);\n    //$LASTPOS=30000189;\n    Tonyu.globals.$clYellow=_this.color(255,255,0);\n    //$LASTPOS=30000222;\n    Tonyu.globals.$clBlue=_this.color(0,0,255);\n    //$LASTPOS=30000251;\n    Tonyu.globals.$clPink=_this.color(255,0,255);\n    //$LASTPOS=30000282;\n    Tonyu.globals.$clAqua=_this.color(0,255,255);\n    //$LASTPOS=30000313;\n    Tonyu.globals.$clWhite=_this.color(255,255,255);\n    //$LASTPOS=30000347;\n    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;\n  },\n  fiber$initGlobals :function _trc_func_30000022_3(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=30000044;\n    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;\n    //$LASTPOS=30000074;\n    Tonyu.globals.$Boot.setFrameRate(60);\n    \n    _thread.enter(function _trc_func_30000022_4(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=30000103;\n          _this.fiber$color(_thread, 0, 0, 0);\n          __pc=1;return;\n        case 1:\n          Tonyu.globals.$clBlack=_thread.retVal;\n          \n          //$LASTPOS=30000131;\n          _this.fiber$color(_thread, 255, 0, 0);\n          __pc=2;return;\n        case 2:\n          Tonyu.globals.$clRed=_thread.retVal;\n          \n          //$LASTPOS=30000159;\n          _this.fiber$color(_thread, 0, 255, 0);\n          __pc=3;return;\n        case 3:\n          Tonyu.globals.$clGreen=_thread.retVal;\n          \n          //$LASTPOS=30000189;\n          _this.fiber$color(_thread, 255, 255, 0);\n          __pc=4;return;\n        case 4:\n          Tonyu.globals.$clYellow=_thread.retVal;\n          \n          //$LASTPOS=30000222;\n          _this.fiber$color(_thread, 0, 0, 255);\n          __pc=5;return;\n        case 5:\n          Tonyu.globals.$clBlue=_thread.retVal;\n          \n          //$LASTPOS=30000251;\n          _this.fiber$color(_thread, 255, 0, 255);\n          __pc=6;return;\n        case 6:\n          Tonyu.globals.$clPink=_thread.retVal;\n          \n          //$LASTPOS=30000282;\n          _this.fiber$color(_thread, 0, 255, 255);\n          __pc=7;return;\n        case 7:\n          Tonyu.globals.$clAqua=_thread.retVal;\n          \n          //$LASTPOS=30000313;\n          _this.fiber$color(_thread, 255, 255, 255);\n          __pc=8;return;\n        case 8:\n          Tonyu.globals.$clWhite=_thread.retVal;\n          \n          //$LASTPOS=30000347;\n          Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;\n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T1Page,{"fullName":"kernel.T1Page","namespace":"kernel","shortName":"T1Page","decls":{"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T1Text=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{\n  main :function _trc_func_31000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_31000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  draw :function _trc_func_31000016_2(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=31000032;\n    if (_this.hidden) {\n      return _this;\n    }\n    //$LASTPOS=31000057;\n    c.font=_this.size+"px \'ＭＳ Ｐゴシック\'";\n    //$LASTPOS=31000097;\n    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);\n    //$LASTPOS=31000117;\n    _this.hidden=true;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{\n  main :function _trc_func_32000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_32000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{\n  main :function _trc_func_33000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=33000150;\n    _this.loop();\n  },\n  fiber$main :function _trc_func_33000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_33000000_2(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=33000150;\n          _this.fiber$loop(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  onAppear :function _trc_func_33000067_3() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=33000086;\n    Tonyu.globals.$currentProject.requestPlugin("box2d");\n    //$LASTPOS=33000133;\n    _this.initWorld();\n  },\n  fiber$onAppear :function _trc_func_33000067_4(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=33000086;\n    Tonyu.globals.$currentProject.requestPlugin("box2d");\n    \n    _thread.enter(function _trc_func_33000067_5(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=33000133;\n          _this.fiber$initWorld(_thread);\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  initWorld :function _trc_func_33000163_6() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b2World;\n    var b2Vec2;\n    \n    //$LASTPOS=33000183;\n    _this.gravity=_this.gravity||9.8;\n    //$LASTPOS=33000212;\n    _this.gravityX=_this.gravityX||0;\n    //$LASTPOS=33000241;\n    b2World = Box2D.Dynamics.b2World;\n    //$LASTPOS=33000284;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=33000328;\n    _this.scale=_this.scale||32;\n    //$LASTPOS=33000352;\n    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);\n    //$LASTPOS=33000477;\n    Tonyu.globals.$t2World=_this;\n    //$LASTPOS=33000497;\n    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));\n    //$LASTPOS=33000533;\n    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));\n  },\n  fiber$initWorld :function _trc_func_33000163_7(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b2World;\n    var b2Vec2;\n    \n    //$LASTPOS=33000183;\n    _this.gravity=_this.gravity||9.8;\n    //$LASTPOS=33000212;\n    _this.gravityX=_this.gravityX||0;\n    //$LASTPOS=33000241;\n    b2World = Box2D.Dynamics.b2World;\n    //$LASTPOS=33000284;\n    b2Vec2 = Box2D.Common.Math.b2Vec2;\n    //$LASTPOS=33000328;\n    _this.scale=_this.scale||32;\n    //$LASTPOS=33000352;\n    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);\n    //$LASTPOS=33000477;\n    Tonyu.globals.$t2World=_this;\n    //$LASTPOS=33000497;\n    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));\n    \n    _thread.enter(function _trc_func_33000163_8(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=33000533;\n          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));\n          __pc=1;return;\n        case 1:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  releaseWorld :function _trc_func_33000561_9() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=33000584;\n    if (Tonyu.globals.$t2World===_this) {\n      //$LASTPOS=33000605;\n      Tonyu.globals.$t2World=null;\n    }\n  },\n  fiber$releaseWorld :function _trc_func_33000561_10(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    //$LASTPOS=33000584;\n    if (Tonyu.globals.$t2World===_this) {\n      //$LASTPOS=33000605;\n      Tonyu.globals.$t2World=null;\n    }\n    \n    _thread.retVal=_this;return;\n  },\n  loop :function _trc_func_33000626_11() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=33000641;\n    while (true) {\n      //$LASTPOS=33000664;\n      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);\n      //$LASTPOS=33000831;\n      _this.world.DrawDebugData();\n      //$LASTPOS=33000863;\n      _this.world.ClearForces();\n      //$LASTPOS=33000893;\n      _this.updatePos();\n      //$LASTPOS=33000915;\n      _this.update();\n      \n    }\n  },\n  fiber$loop :function _trc_func_33000626_12(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.enter(function _trc_func_33000626_13(_thread) {\n      if (_thread.lastEx) __pc=_thread.catchPC;\n      for(var __cnt=100 ; __cnt--;) {\n        switch (__pc) {\n        case 0:\n          //$LASTPOS=33000641;\n        case 1:\n          //$LASTPOS=33000664;\n          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);\n          //$LASTPOS=33000831;\n          _this.world.DrawDebugData();\n          //$LASTPOS=33000863;\n          _this.world.ClearForces();\n          //$LASTPOS=33000893;\n          _this.fiber$updatePos(_thread);\n          __pc=2;return;\n        case 2:\n          \n          //$LASTPOS=33000915;\n          _this.fiber$update(_thread);\n          __pc=3;return;\n        case 3:\n          \n          __pc=1;break;\n        case 4:\n          \n          _thread.exit(_this);return;\n        }\n      }\n    });\n  },\n  updatePos :function _trc_func_33000936_14() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var b;\n    var d;\n    \n    //$LASTPOS=33000956;\n    //$LASTPOS=33000961;\n    b = _this.world.GetBodyList();\n    while(b) {\n      {\n        //$LASTPOS=33001015;\n        d = b.GetUserData();\n        //$LASTPOS=33001047;\n        if (d) {\n          //$LASTPOS=33001053;\n          d.updatePos();\n        }\n      }\n      b=b.GetNext();\n    }\n  },\n  fiber$updatePos :function _trc_func_33000936_15(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    var b;\n    var d;\n    \n    //$LASTPOS=33000956;\n    //$LASTPOS=33000961;\n    b = _this.world.GetBodyList();\n    while(b) {\n      {\n        //$LASTPOS=33001015;\n        d = b.GetUserData();\n        //$LASTPOS=33001047;\n        if (d) {\n          //$LASTPOS=33001053;\n          d.updatePos();\n        }\n      }\n      b=b.GetNext();\n    }\n    \n    _thread.retVal=_this;return;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.T2World,{"fullName":"kernel.T2World","namespace":"kernel","shortName":"T2World","decls":{"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.TextChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{\n  main :function _trc_func_34000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_34000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_34000040_2(xx,yy,t,c,s) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=34000065;\n    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);\n    //$LASTPOS=34000084;\n    _this.text="";\n    //$LASTPOS=34000098;\n    _this.col=Tonyu.globals.$clWhite;\n    //$LASTPOS=34000117;\n    _this.size=20;\n    //$LASTPOS=34000131;\n    if (! _this.x) {\n      //$LASTPOS=34000144;\n      _this.x=0;\n    }\n    //$LASTPOS=34000159;\n    if (! _this.y) {\n      //$LASTPOS=34000172;\n      _this.y=0;\n    }\n    //$LASTPOS=34000187;\n    if (t) {\n      //$LASTPOS=34000194;\n      _this.text=t;\n    }\n    //$LASTPOS=34000207;\n    if (c) {\n      //$LASTPOS=34000214;\n      _this.fillStyle=c;\n    }\n    //$LASTPOS=34000232;\n    if (s) {\n      //$LASTPOS=34000239;\n      _this.size=s;\n    }\n  },\n  draw :function _trc_func_34000251_3(ctx) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    var rect;\n    \n    //$LASTPOS=34000269;\n    if (! _this.size) {\n      //$LASTPOS=34000280;\n      _this.size=15;\n    }\n    //$LASTPOS=34000294;\n    if (! _this.align) {\n      //$LASTPOS=34000306;\n      _this.align="left";\n    }\n    //$LASTPOS=34000325;\n    if (! _this.fillStyle) {\n      //$LASTPOS=34000341;\n      _this.fillStyle="white";\n    }\n    //$LASTPOS=34000365;\n    ctx.fillStyle=_this.fillStyle;\n    //$LASTPOS=34000395;\n    ctx.globalAlpha=_this.alpha/255;\n    //$LASTPOS=34000432;\n    ctx.font=_this.size+"px \'ＭＳ Ｐゴシック\'";\n    //$LASTPOS=34000468;\n    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");\n    //$LASTPOS=34000536;\n    _this.width=rect.w;\n    //$LASTPOS=34000555;\n    _this.height=rect.h;\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});\n\nTonyu.klass.ensureNamespace(Tonyu.classes,\'kernel\');\nTonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{\n  main :function _trc_func_35000000_0() {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n  },\n  fiber$main :function _trc_func_35000000_1(_thread) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    //var _arguments=Tonyu.A(arguments);\n    var __pc=0;\n    \n    \n    _thread.retVal=_this;return;\n  },\n  initialize :function _trc_func_35000023_2(xx,yy,pp,ff,sz,rt,al) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=35000057;\n    Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);\n    //$LASTPOS=35000082;\n    _this.scaleX=1;\n    //$LASTPOS=35000097;\n    if (sz) {\n      //$LASTPOS=35000105;\n      _this.scaleX=sz;\n    }\n    //$LASTPOS=35000121;\n    _this.angle=0;\n    //$LASTPOS=35000135;\n    if (rt) {\n      //$LASTPOS=35000143;\n      _this.angle=rt;\n    }\n    //$LASTPOS=35000158;\n    _this.alpha=255;\n    //$LASTPOS=35000174;\n    if (al) {\n      //$LASTPOS=35000182;\n      _this.alpha=al;\n    }\n  },\n  draw :function _trc_func_35000196_3(c) {\n    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n    \n    //$LASTPOS=35000212;\n    _this.rotation=_this.angle;\n    //$LASTPOS=35000233;\n    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);\n  },\n  __dummy: false\n});\nTonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});\n\n',
      'options.json': '{\n    "compiler":{\n        "namespace": "kernel",\n        "commentLastPos": true,\n        "outputFile": "js/concat.js"\n    }\n}\n'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_k.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();
requireSimulator.setName('Tonyu');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function () {
return Tonyu=function () {
    var preemptionTime=60;
    function thread() {
	//var stpd=0;
        var fb={enter:enter, apply:apply,
                exit:exit, steps:steps, step:step, isAlive:isAlive, isWaiting:isWaiting,
                suspend:suspend,retVal:0/*retVal*/,tryStack:[],
                kill:kill, waitFor: waitFor,setGroup:setGroup,
                enterTry:enterTry,exitTry:exitTry,startCatch:startCatch};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        //var retVal;
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
        function apply(obj, methodName, args) {
            if (!args) args=[];
            args=[fb].concat(args);
            var pc=0;
            enter(function () {
                switch (pc){
                case 0:
                    obj["fiber$"+methodName].apply(obj,args);
                    pc=1;break;
                case 1:
                    exit();
                    pc=2;break;
                }
            });
        }
        function step() {
            if (frame) {
                try {
                    frame.func(fb);
                } catch(e) {
                    gotoCatch(e);
                }
            }
        }
        function gotoCatch(e) {
            if (fb.tryStack.length==0) throw e;
            fb.lastEx=e;
            var s=fb.tryStack.pop();
            while (frame) {
                if (s.frame===frame) {
                    fb.catchPC=s.catchPC;
                    break;
                } else {
                    frame=frame.prev;
                }
            }
        }
        function startCatch() {
            var e=fb.lastEx;
            fb.lastEx=null;
            return e;
        }
        function exit(res) {
            frame=frame.prev;
            //if (frame) frame.res=res;
            fb.retVal=res;
        }
        function enterTry(catchPC) {
            fb.tryStack.push({frame:frame,catchPC:catchPC});
        }
        function exitTry() {
            fb.tryStack.pop();
        }
        function waitFor(j) {
            _isWaiting=true;
            if (j && j.addTerminatedListener) j.addTerminatedListener(function () {
                _isWaiting=false;
                if (fb.group) fb.group.notifyResume();
                else if (isAlive()) {
                    try {
                        fb.steps();
                    }catch(e) {
                        handleEx(e);
                    }
                }
                //fb.group.add(fb);
            });
        }
	function setGroup(g) {
	    fb.group=g;
	    if (g) g.add(fb);
	}
        /*function retVal() {
            return retVal;
        }*/
        function steps() {
            //stpd++;
	    //if (stpd>5) throw new Error("Depth too much");
	    var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            //var lim=new Date().getTime()+preemptionTime;
            cnt=preemptionTime;
            //while (new Date().getTime()<lim) {
            while (cnt-->0) {
                step();
            }
	    //stpd--;
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
            if (hasRes) setTimeout(l,0);
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
        var willAdd=null;
        function add(thread) {
            thread.group=thg;
            if (willAdd) {
                willAdd.push(thread);
            } else {
                threads.push(thread);
            }
        }
        function addObj(obj, methodName,args) {
            if (!methodName) methodName="main";
            var th=thread();
            th.apply(obj,methodName,args);
            //obj["fiber$"+methodName](th);
            add(th);
            return th;
        }
        function steps() {
	    try {
		stepsNoEx();
	    } catch(e) {
		handleEx(e);
	    }
	}
        function stepsNoEx() {
            for (var i=threads.length-1; i>=0 ;i--) {
		var thr=threads[i];
                if (thr.isAlive() && thr.group===thg) continue;
                threads.splice(i,1);
            }
            _isWaiting=true;
            willAdd=[];
            threads.forEach(iter);
            while (willAdd.length>0) {
                w=willAdd;
                willAdd=[];
                w.forEach(function (th) {
                    threads.push(th);
                    iter(th);
                });
            }
            willAdd=null;
            function iter(th){
                if (th.isWaiting()) return;
                _isWaiting=false;
                th.steps();
            }
        }
        function kill() {
            _isAlive=false;
        }
        var _interval=0, _onStepsEnd;
        function notifyResume() {
            if (_isWaiting) {
                //console.log("resume!");
                //run();
            }
        }
        return thg={add:add, addObj:addObj,  steps:steps, kill:kill, notifyResume: notifyResume, threads:threads};
    }
    function handleEx(e) {
        if (Tonyu.onRuntimeError) {
            Tonyu.onRuntimeError(e);
        } else {
            alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
            throw e;
        }
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
    	var parent, prot, includes=[];
    	if (arguments.length==1) {
    		prot=arguments[0];
    	} else if (arguments.length==2 && typeof arguments[0]=="function") {
    		parent=arguments[0];
    		prot=arguments[1];
    	} else if (arguments.length==2 && arguments[0] instanceof Array) {
    		includes=arguments[0];
    		prot=arguments[1];
    	} else if (arguments.length==3) {
    		parent=arguments[0];
    		if (!parent) throw "No parent class";
    		includes=arguments[1];
    		prot=arguments[2];
    	} else {
    		console.log(arguments);
    		throw "Invalid argument spec";
    	}
    	prot=defunct(prot);
    	var res=(prot.initialize? prot.initialize:
    		(parent? function () {
    			parent.apply(this,arguments);
    		}:function (){})
    	);
    	delete prot.initialize;
    	//A includes B  B includes C  B extends D
    	//A extends E   E includes F
    	//A has methods in B,C,E,F. [Mod] A should extend D.(Thus, E should extend D(or E==D))
    	//( B shoule be treated as modules.
    	//  Module's extension indicates that includer class should also exetend the module's parent )
    	// 2015-02-27 this check is not implemented.
    	// Known examples:
    	// Actor extends BaseActor, includes PlayMod.
    	// PlayMod extends BaseActor(because use update() in play())
    	includes.forEach(function (m) {
    		if (!m.methods) throw m+" Does not have methods";
    		for (var n in m.methods) {
    			if (!(n in prot)) {
    				prot[n]=m.methods[n];
    			}
    		}
    	});
    	res.methods=prot;
    	res.prototype=bless(parent, prot);
    	res.prototype.isTonyuObject=true;
    	addMeta(res,{
    	    superClass:parent ? parent.meta : null,
    	    includes:includes.map(function(c){return c.meta;})
    	});
    	return res;
    }
    klass.addMeta=addMeta;
    function addMeta(k,m) {
        k.meta=k.meta||{};
        extend(k.meta, m);
    }
    klass.getMeta=function (k) {
        return k.meta;
    };
    klass.ensureNamespace=function (top,nsp) {
        var keys=nsp.split(".");
        var o=top;
        var i;
        for (i=0; i<keys.length; i++) {
            var k=keys[i];
            if (!o[k]) o[k]={};
            o=o[k];
        }
    };
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
        //CFN: n.split(".")
        var ns=n.split(".");
        var res=classes;
        ns.forEach(function (na) {
            if (!res) return;
            res=res[na];
        });
        if (!res && ns.length==1) {
            var found;
            for (var nn in classes) {
                var nr=classes[nn][n];
                if (nr) {
                    if (!res) { res=nr; found=nn+"."+n; }
                    else throw new Error("曖昧なクラス名： "+nn+"."+n+", "+found);
                }
            }
        }
        return res;//classes[n];
    }
    function bindFunc(t,meth) {
    	return function () {
    		return meth.apply(t,arguments);
    	};
    }
    function invokeMethod(t, name, args, objName) {
        if (!t) throw new Error(objName+"(="+t+")のメソッド "+name+"を呼び出せません");
        var f=t[name];
        if (typeof f!="function") throw new Error((objName=="this"? "": objName+".")+name+"(="+f+")はメソッドではありません");
        return f.apply(t,args);
    }
    function callFunc(f,args, fName) {
        if (typeof f!="function") throw new Error(fName+"は関数ではありません");
        return f.apply({},args);
    }
    function checkNonNull(v, name) {
        if (v!=v || v==null) throw new Error(name+"(="+v+")は初期化されていません");
        return v;
    }
    function A(args) {
        var res=[];
        for (var i=1 ; i<args.length; i++) {
            res[i-1]=args[i];
        }
        return res;
    }
    function not_a_tonyu_object(o) {
        console.log("Not a tonyu object: ",o);
        throw o+" is not a tonyu object";
    }
    function hasKey(k, obj) {
        return k in obj;
    }
    return Tonyu={thread:thread, threadGroup:threadGroup, klass:klass, bless:bless, extend:extend,
            globals:globals, classes:classes, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
            timeout:timeout,asyncResult:asyncResult,bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,
            hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
            A:A};
}();

});
requireSimulator.setName('Tonyu.Iterator');
define(["Tonyu"], function (T) {
   function IT(set, arity) {
       var res={};
       if (set.tonyuIterator) {
    	   return set.tonyuIterator(arity);
       } else if (set instanceof Array) {
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
requireSimulator.setName('IndentBuffer');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function () {
return IndentBuffer=function () {
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg() {
			ai++;
			var res=args[ai];
			if (res==null) {
			    console.log(args);
			    throw new Error(ai+"th null param: fmt="+fmt);
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
                if (typeof n!="number") throw new Error (n+" is not a number: fmt="+fmt);
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
            } else if (fstr=="l") {
                var lit=shiftArg();
                $.buf+=$.toLiteral(lit);
                i++;
			} else if (fstr=="v") {
			    var a=shiftArg();
			    if (!a) throw new Error ("Null %v");
                if (typeof a!="object") throw new Error("nonobject %v:"+a);
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
                if (!node || !node.forEach) {
                    console.log(node);
                    throw new Error (node+" is not array. cannot join fmt:"+fmt);
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
		if (!$.buf.substring($.buf.length-len).match(/^\s*$/)) {
			console.log($.buf);
			throw new Error ("Non-space truncated ");
		}
		$.buf=$.buf.substring(0,$.buf.length-len);
		$.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
	};
	$.toLiteral= function (s, quote) {
        if (!quote) quote="'";
        s = s.replace(/\\/g, "\\\\");
        s = s.replace(/\r/g, "\\r");
        s = s.replace(/\n/g, "\\n");
        if (quote=="'") s = s.replace(/'/g, "\\'");
        else s = s.replace(/"/g, '\\"');
        return quote + s + quote;
    };
	$.indentBuf="";
	$.indentStr="  ";
	return $;
};
});
requireSimulator.setName('disp');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["IndentBuffer"], function(IndentBuffer) {
// オブジェクトの内容を表示する． デバッグ用
return disp=function (a) {
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
};
});
requireSimulator.setName('Parser');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["disp"],function(disp) {
return Parser=function () {
    function extend(dst, src) {
        var i;
        for(i in src){
            dst[i]=src[i];
        }
        return dst;
    }
    var $={
        consoleBuffer:"",
        options: {traceTap:false, optimizeFirst: true, profile: false ,
        verboseFirst: false,traceFirstTbl:false},
        Parser: Parser,
        StringParser: StringParser,
        nc: nc
    };
    $.dispTbl=function (tbl) {
    	var buf="";
    	var h={};
    	if (!tbl) return buf;
    	for (var i in tbl) {// tbl:{char:Parser}   i:char
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
    	if ($.options.traceTap) {
    		this.parse=function(s){
    			console.log("tap: name="+this.name+"  pos="+(s?s.pos:"?"));
    			var r=parseFunc.apply(this,[s]);
    			var img="NOIMG";
    			if (r.src && r.src.str) {
    				img=r.src.str.substring(r.pos-3,r.pos)+"^"+r.src.str.substring(r.pos,r.pos+3);
    			}
    			if (r.src && r.src.tokens) {
					img=r.src.tokens[r.pos-1]+"["+r.src.tokens[r.pos]+"]"+r.src.tokens[r.pos+1];
    			}

    			console.log("/tap: name="+this.name+
    					" pos="+(s?s.pos:"?")+"->"+(r?r.pos:"?")+" "+img+" res="+(r?r.success:"?"));
    			return r;
    		};
    	} else {
            this.parse=parseFunc;
    	}
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
        	return this.ret(Parser.create(function (res) {
                //var res=t.parse(s);
                //if (!res.success) return res;
        		if (f.apply({}, res.result)) {
        			res.success=false;
        		}
        		return res;
        	}).setName("(except "+t.name+")"));
        },
        noFollow: function (p) {
            var t=this;
            nc(p,"p");
            return this.ret(Parser.create(function (res) {
                //var res=t.parse(s);
                //if (!res.success) return res;
                var res2=p.parse(res);
                res.success=!res2.success;
                return res;
            }).setName("("+t.name+" noFollow "+p.name+")"));
        },
        andNoUnify: function(next) {// Parser.and:: (Function|Parser)  -> Parser
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
            return res.setName("("+this.name+" "+next.name+")");
        },
        and: function(next) {// Parser.and:: Parser  -> Parser
            var res=this.andNoUnify(next);
            //if (!$.options.optimizeFirst) return res;
            if (!this._first) return res;
            var tbl=this._first.tbl;
            var ntbl={};
            //  tbl           ALL:a1  b:b1     c:c1
            //  next.tbl      ALL:a2           c:c2     d:d2
            //           ALL:a1>>next   b:b1>>next c:c1>>next
            for (var c in tbl) {
            	ntbl[c]=tbl[c].andNoUnify(next);
            }
            res=Parser.fromFirst(this._first.space, ntbl);
        	res.setName("("+this.name+" >> "+next.name+")");
            if ($.options.verboseFirst) {
            	console.log("Created aunify name=" +res.name+" tbl="+$.dispTbl(ntbl));
            }
            return res;
        },
        retNoUnify: function (f) {
            var t=this;
            var p;
            if (typeof f=="function") {
            	p=Parser.create(function (r1) {
                    var r2=r1.clone();
                    r2.result=[ f.apply({}, r1.result) ];
                    return r2;
            	}).setName("retfunc");
            } else p=f;
            var res=Parser.create(function(s){ //s:State
                var r1=t.parse(s); // r1:State
                if (!r1.success) return r1;
                return p.parse(r1);
                /*var r2=r1.clone();
                r2.result=[ f.apply({}, r1.result) ];
                return r2;*/
            }).setName("("+this.name+" >= "+p.name+")");
            return res;
        },
        ret: function(next) {// Parser.ret:: (Function|Parser)  -> Parser
        	if (!this._first) return this.retNoUnify(next);
            var tbl=this._first.tbl;
            var ntbl={};
            for (var c in tbl) {
            	ntbl[c]=tbl[c].retNoUnify(next);
            }
            res=Parser.fromFirst(this._first.space, ntbl);
        	res.setName("("+this.name+" >>= "+next.name+")");
            if ($.options.verboseFirst) {
            	console.log("Created runify name=" +res.name+" tbl="+$.dispTbl(ntbl));
            }
            return res;
        },

        /*
        this._first={space: space, chars:String};
        this._first={space: space, tbl:{char:Parser}};
	*/
        first: function (space, ct) {
        	if (!$.options.optimizeFirst) return this;
        	if (space==null) throw "Space is null2!";
        	if (typeof ct=="string") {
        	        var tbl={};
        	        for (var i=0; i<ct.length ; i++) {
        	            tbl[ct.substring(i,i+1)]=this;
        	        }
        	    //this._first={space: space, tbl:tbl};
        		return Parser.fromFirst(space,tbl).setName("(fst "+this.name+")");
//        		this._first={space: space, chars:ct};
        	} else if (ct==null) {
        		return Parser.fromFirst(space,{ALL:this}).setName("(fst "+this.name+")");
        		//this._first={space:space, tbl:{ALL:this}};
        	} else if (typeof ct=="object") {
        		throw "this._first={space: space, tbl:ct}";
        	}
        	return this;
        },
        firstTokens: function (tokens) {
        	if (!$.options.optimizeFirst) return this;
        	if (typeof tokens=="string") tokens=[tokens];
            var tbl={};
       	    if (tokens) {
       	    	var t=this;
       	        tokens.forEach(function (token) {
    	            tbl[token]=t;
    	        });
        	} else {
        		tbl.ALL=this;
        	}
    		return Parser.fromFirstTokens(tbl).setName("(fstT "+this.name+")");
        },
        unifyFirst: function (other) {
        	var thiz=this;
        	function or(a,b) {
        	     if (!a) return b;
        	     if (!b) return a;
        	     return a.orNoUnify(b).checkTbl();
        	}
        	var tbl={}; // tbl.* includes tbl.ALL
        	this.checkTbl();
        	other.checkTbl();
        	function mergeTbl() {
        	//   {except_ALL: contains_ALL}
        		var t2=other._first.tbl;
	        	//before tbl={ALL:a1, b:b1, c:c1}   t2={ALL:a2,c:c2,d:d2}
	        	//       b1 conts a1  c1 conts a1     c2 conts a2   d2 conts a2
	        	//after  tbl={ALL:a1|a2 , b:b1|a2    c:c1|c2    d:a1|d2 }
	        	var keys={};
	        	for (var k in tbl) { /*if (d) console.log("tbl.k="+k);*/ keys[k]=1;}
	        	for (var k in t2)  { /*if (d) console.log("t2.k="+k);*/ keys[k]=1;}
	        	delete keys.ALL;
	        	if (tbl.ALL || t2.ALL) {
	        	    tbl.ALL=or(tbl.ALL, t2.ALL);
	        	}
	        	for (var k in keys ) {
	        		//if (d) console.log("k="+k);
	        		//if (tbl[k] && !tbl[k].parse) throw "tbl["+k+"] = "+tbl[k];
	        		//if (t2[k] && !t2[k].parse) throw "t2["+k+"] = "+tbl[k];
	        	     if (tbl[k] && t2[k]) {
	        	         tbl[k]=or(tbl[k],t2[k]);
	        	     } else if (tbl[k] && !t2[k]) {
	        	         tbl[k]=or(tbl[k],t2.ALL);
	        	     } else if (!tbl[k] && t2[k]) {
	        	         tbl[k]=or(tbl.ALL, t2[k]);
	        	     }
	        	}
        	}
        	extend(tbl, this._first.tbl);
        	mergeTbl();
        	var res=Parser.fromFirst(this._first.space, tbl).setName("("+this.name+")U("+other.name+")");
        	if ($.options.verboseFirst) console.log("Created unify name=" +res.name+" tbl="+$.dispTbl(tbl));
        	return res;
        },
        or: function(other) { // Parser->Parser
        	nc(other,"other");
          	if (this._first && other._first &&
          			this._first.space && this._first.space===other._first.space) {
            	return this.unifyFirst(other);
          	} else {
          		if ($.options.verboseFirst) {
          			console.log("Cannot unify"+this.name+" || "+other.name+" "+this._first+" - "+other._first);
          		}
          		return this.orNoUnify(other);
          	}
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
        	if (this._first) {
        		/*var tbl=this._first.tbl;
        		for (var i in tbl) {
        			tbl[i].setName("(elm "+i+" of "+n+")");
        		}*/
        	}
        	return this;
        },
        profile: function (name) {
            if ($.options.profile) {
                this.parse=this.parse.profile(name || this.name);
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
        	//if (min>0) res._first=p._first;
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
        	return this;
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
        	/*if (this._first) {
        		var ntbl={},tbl=this._first.tbl;
        		for (var c in tbl) {
        			ntbl=tbl[c].
        		}
        	}*/
        	return res.setName("(Tap "+t.name+")");
        },
        retN: function (i) {
        	return this.ret(function () {
        		return arguments[i];
        	})
        },
        parseStr: function (str,global) {
            var st=new State(str,global);
            return this.parse(st);
        },
    	checkTbl: function () {
    		if (!this._first) return this;
    		var tbl=this._first.tbl;
    		for (var k in tbl) {
    			if (!tbl[k].parse) throw this.name+": tbl."+k+" is not a parser :"+tbl[k];
    		}
    		return this;
    	}
    });
    function State(strOrTokens, global) { // class State
        if (strOrTokens!=null) {
            this.src={maxPos:0, global:global};// maxPos is shared by all state
            if (typeof strOrTokens=="string") {
            	this.src.str=strOrTokens;
            }
            if (strOrTokens instanceof Array) {
            	this.src.tokens=strOrTokens;
            }
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
        },
        getGlobal: function () {
                if (!this.src.global) this.src.global={};
                return this.src.global;
        }
    });
    Parser.fromFirst=function (space, tbl) {
    	if (space=="TOKEN") {
    		return Parser.fromFirstTokens(tbl);
    	}
    	var res=Parser.create(function (s0) {
    		var s=space.parse(s0);
    		var f=s.src.str.substring(s.pos,s.pos+1);
    		if ($.options.traceFirstTbl) {
    			console.log(this.name+": first="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
    		}
    		if (tbl[f]) {
        		return tbl[f].parse(s);
    		}
    		if (tbl.ALL) return tbl.ALL.parse(s);
    		s.success=false;
    		return s;
    	});
    	res._first={space:space,tbl:tbl};
    	res.checkTbl();
    	return res;
    };
    Parser.fromFirstTokens=function (tbl) {
    	var res=Parser.create(function (s) {
    		var t=s.src.tokens[s.pos];
    		var f=t?t.type:null;
    		if ($.options.traceFirstTbl) {
    			console.log(this.name+": firstT="+f+" tbl="+( tbl[f]?tbl[f].name:"-") );
    		}
    		if (f!=null && tbl[f]) {
        		return tbl[f].parse(s);
    		}
    		if (tbl.ALL) return tbl.ALL.parse(s);
    		s.success=false;
    		return s;
    	});
    	res._first={space:"TOKEN",tbl:tbl};
    	res.checkTbl();
    	return res;
    };

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
        	}).setName(st);
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
        	}).setName(r+"");
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
    	parse: function (parser, str,global) {
    		var st=new State(str,global);
    		return parser.parse(st);
    	}
    };
    //  why not eof: ? because StringParser.strLike
    StringParser.eof=StringParser.strLike(function (str,pos) {
    	if (pos==str.length) return {len:0};
    	return null;
    }).setName("EOF");
    $.StringParser=StringParser;
    var TokensParser={
    	token: function (type) {
    		return Parser.create(function (s) {
        		var t=s.src.tokens[s.pos];
        		s.success=false;
        		if (!t) return s;
        		if (t.type==type) {
            		s=s.clone();
        		    s.updateMaxPos(s.pos);
			    s.pos++;
        		    s.success=true;
        		    s.result=[t];
        		}
        		return s;
        	}).setName(type).firstTokens(type);
    	},
    	parse:function (parser, tokens, global) {
    		var st=new State(tokens,global);
    		return parser.parse(st);
    	},
    	eof: Parser.create(function (s) {
            var suc=(s.pos>=s.src.tokens.length);
            s.success=suc;
    		if (suc) {
    		    s=s.clone();
    		    s.result=[{type:"EOF"}];
    		}
    	    return s;
    	}).setName("EOT")
    };
    $.TokensParser=TokensParser;
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
    	if (res==null || typeof res=="string" || typeof res=="number" || typeof res=="boolean") return;
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

});
requireSimulator.setName('Grammar');
if (typeof define!=="function") {
   define=require("requirejs").define;
}

define(["Parser"], function (Parser) {
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
return Grammar;
});
requireSimulator.setName('XMLBuffer');
// var b=XMLBuffer(src);
// b(node);
// console.log(b.buf);
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["Parser"],
function(Parser) {
XMLBuffer=function (src) {
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
return XMLBuffer;
});
requireSimulator.setName('TError');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function () {
TError=function (mesg, src, pos) {
    if (typeof src=="string") {
        return {
            isTError:true,
            mesg:mesg,
            src:{
                name:function () { return src;},
                text:function () { return src;}
            },
            pos:pos,
            toString:function (){
                return this.mesg+" at "+src+":"+this.pos;
            },
            raise: function () {
                throw this;
            }
        };
    }
    var klass=null;
    if (src && src.src) {
        klass=src;
        src=klass.src.tonyu;
    }
    if (typeof src.name!=="function") {
        throw "src="+src+" should be file object";
    }
    var rc;
    if ( (typeof (src.text))=="function") {
        var s=src.text();
        if (typeof s=="string") {
            rc=TError.calcRowCol(s,pos);
        }
    }
    return {
        isTError:true,
        mesg:mesg,src:src,pos:pos,row:rc.row, col:rc.col, klass:klass,
        toString:function (){
            return this.mesg+" at "+this.src.name()+":"+this.row+":"+this.col;
        },
        raise: function () {
            throw this;
        }
    };
};
TError.calcRowCol=function (text,pos) {
    var lines=text.split("\n");
    var pp=0,row,col;
    for (row=0;row<lines.length ; row++) {
        pp+=lines[row].length+1;
        if (pp>pos) {
            col=pos-(pp-lines[row].length);
            break;
        }
    }
    return {row:row,col:col};
};
return TError;
});
requireSimulator.setName('TT');
/*sys.load("js/parser.js");
sys.load("js/ExpressionParser2Tonyu.js");
sys.load("js/GrammarTonyu.js");
sys.load("js/XMLBuffer.js");
sys.load("js/IndentBuffer.js");
sys.load("js/disp.js");
sys.load("js/profiler.js");
*/
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["Grammar", "XMLBuffer", "IndentBuffer","disp", "Parser","TError"],
function (Grammar, XMLBuffer, IndentBuffer, disp, Parser,TError) {
return TT=function () {
	function profileTbl(parser, name) {
		var tbl=parser._first.tbl;
		for (var c in tbl) {
			tbl[c].profile();//(c+" of "+tbl[name);
		}
	}
	var sp=Parser.StringParser;
	var SAMENAME="SAMENAME";
	var DIV=1,REG=2;
    var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/).setName("space");
    function tk(r, name) {
        var pat;
        var fst;
        if (typeof r=="string") {
            pat=sp.str(r);
            if (r.length>0) fst=r.substring(0,1);
            if (!name) name=r;
        } else {
            pat=sp.reg(r);
            if (!name) name=r+"";
        }
        var res=space.and(pat).ret(function(a, b) {
            var res={};
            res.pos=b.pos;
            if (typeof res.pos!="number") throw "no pos for "+name+" "+disp(b);
            res.len=b.len;
            res.text=b.src.str.substring(res.pos, res.pos+res.len);
            if (typeof res.text!="string") throw "no text("+res.text+") for "+name+" "+disp(b);
            res.toString=function (){
                return this.text;
            };
            return res;
        });
        if (fst) res=res.first(space, fst);
        return res.setName(name);//.profile();
    }
    var parsers={},posts={};
    function dtk2(prev, name, parser, post) {
    	//console.log("2reg="+prev+" name="+name);
    	if (typeof parser=="string") parser=tk(parser);
    	parsers[prev]=or(parsers[prev], parser.ret(function (res) {
    		res.type=name;
    		return res;
    	}).setName(name) );
    }
    function dtk(prev, name, parser, post) {
    	if(name==SAMENAME) name=parser;
    	for (var m=1; m<=prev; m*=2) {
    		//prev=1  -> m=1
    		//prev=2  -> m=1x,2
    		//XXprev=3  -> m=1,2,3
    		if ((prev&m)!=0) dtk2(prev&m, name,parser,post);
    	}
    	posts[name]=post;
    }
    function or(a,b){
    	if (!a) return b;
    	return a.or(b);
    }

    var all=Parser.create(function (st) {
    	var mode=REG;
    	var res=[];
    	while (true) {
        	st=parsers[mode].parse(st);
        	if (!st.success) break;
        	var e=st.result[0];
    		mode=posts[e.type];
    		res.push(e);
    	}
    	st=space.parse(st);
    	//console.log(st.src.maxPos+"=="+st.src.str.length)
    	st.success=st.src.maxPos==st.src.str.length;
    	st.result[0]=res;
    	return st;
    });
    /*function exprHead(name, parser) {
    	dtk(REG, name, parser, DIV);
    }
    function exprMid(name, parser) {
    	dtk(DIV, name, parser, REG);
    }
    function exprTail(name, parser) {
    	dtk(DIV, name, parser, DIV);
    }*/
    var reserved={"function":true, "var":true , "return":true, "typeof": true, "if":true,
            "for":true,
            "else": true,
            "super": true,
            "while":true,
            "break":true,
            "do":true,
            "switch":true,
            "try": true,
            "catch": true,
            "finally": true,
            "throw": true,
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
            nowait:true,
            _thread:true,
            arguments:true,
            "delete": true,
            "extends":true,
            "includes":true
    };

	var num=tk(/^[0-9\.]+/).ret(function (n) {
        n.type="number";
        n.value=parseInt(n.text);
        return n;
    }).first(space,"0123456789");
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
    },toString:function(){return"literal";}
    }).first(space,"\"'");
    var regex=tk({exec: function (s) {
        if (s.substring(0,1)!=='/') return false;
        for (var i=1 ;i<s.length ; i++) {
            var c=s.substring(i,i+1);
            if (c==='/') {
                var r=/^[ig]*/.exec( s.substring(i+1) );
                return [s.substring(0,i+1+r[0].length)];
            } else if (c=="\n") {
                return false;
            } else if (c==="\\") {
                i++;
            }
        }
        return false;
    },toString:function(){return"regex";}
    }).first(space,"/");

	dtk(REG|DIV, "number", num,DIV );
	dtk(REG,  "regex" ,regex,DIV );
	dtk(REG|DIV,  "literal" ,literal,DIV );

	dtk(REG|DIV,SAMENAME ,"++",DIV );
	dtk(REG|DIV,SAMENAME ,"--",DIV );

	dtk(REG|DIV,SAMENAME ,"!==",REG );
	dtk(REG|DIV,SAMENAME ,"===",REG );
	dtk(REG|DIV,SAMENAME ,"+=",REG );
	dtk(REG|DIV,SAMENAME ,"-=",REG );
	dtk(REG|DIV,SAMENAME ,"*=",REG );
	dtk(REG|DIV,SAMENAME ,"/=",REG );
	dtk(REG|DIV,SAMENAME ,"%=",REG );
	dtk(REG|DIV,SAMENAME ,">=",REG );
	dtk(REG|DIV,SAMENAME ,"<=",REG );
	dtk(REG|DIV,SAMENAME ,"!=",REG );
	dtk(REG|DIV,SAMENAME ,"==",REG );
	dtk(REG|DIV,SAMENAME ,">>",REG );
	dtk(REG|DIV,SAMENAME ,"<<",REG );

	dtk(REG|DIV,SAMENAME ,"&&",REG );
	dtk(REG|DIV,SAMENAME ,"||",REG );


	dtk(REG|DIV,SAMENAME ,"(",REG );
	dtk(REG|DIV,SAMENAME ,")",DIV );


	dtk(REG|DIV,SAMENAME ,"[",REG );
	dtk(REG|DIV,SAMENAME ,"]",DIV );  // a[i]/3

	dtk(REG|DIV,SAMENAME ,"{",REG );
	//dtk(REG|DIV,SAMENAME ,"}",REG );  // if () { .. }  /[a-z]/.exec()
	dtk(REG|DIV,SAMENAME ,"}",DIV ); //in tonyu:  a{x:5}/3

	dtk(REG|DIV,SAMENAME ,">",REG );
	dtk(REG|DIV,SAMENAME ,"<",REG );
	dtk(REG|DIV,SAMENAME ,"+",REG );
	dtk(REG|DIV,SAMENAME ,"-",REG );
	dtk(REG|DIV, SAMENAME ,".",REG );
	dtk(REG|DIV,SAMENAME ,"?",REG );

	dtk(REG|DIV, SAMENAME ,"=",REG );
	dtk(REG|DIV, SAMENAME ,"*",REG );
	dtk(REG|DIV, SAMENAME ,"%",REG );
	dtk(DIV, SAMENAME ,"/",REG );

	dtk(DIV|REG, SAMENAME ,"^",REG );
	dtk(DIV|REG, SAMENAME ,"~",REG );

	dtk(DIV|REG, SAMENAME ,"\\",REG );
	dtk(DIV|REG, SAMENAME ,":",REG );
	dtk(DIV|REG, SAMENAME ,";",REG );
	dtk(DIV|REG, SAMENAME ,",",REG );
	dtk(REG|DIV,SAMENAME ,"!",REG );
	dtk(REG|DIV,SAMENAME ,"&",REG );
	dtk(REG|DIV,SAMENAME ,"|",REG );

    var symresv=tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/,"symresv_reg").ret(function (s) {
	s.type=(s.text=="constructor" ? "tk_constructor" :
		reserved.hasOwnProperty(s.text) ? s.text : "symbol");
	return s;
    }).first(space);
    for (var n in reserved) {
    	posts[n]=REG;
    }
    posts.tk_constructor=REG;
    posts.symbol=DIV;
    parsers[REG]=or(parsers[REG],symresv);
    parsers[DIV]=or(parsers[DIV],symresv);

//	dtk(REG|DIV, "symbol", tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/,"ident_reg").except(function (s) {
  /*      return reserved.hasOwnProperty(s.text);
    }).first(space), DIV);
    dtk(REG|DIV, "tk_constructor", "constructor", REG);
    var resvs=[];
    for (var n in reserved) {
    	if (n!="constructor") resvs.push(n);
    }
    resvs.sort(function (a,b) {
    	return b.length-a.length;
    });
    resvs.forEach(function (n) {
    	dtk(REG|DIV, SAMENAME, n, REG);
    });
*/
	//profileTbl( parsers[REG],"reg");
	//profileTbl( parsers[DIV],"div");
	//profileTbl( parsers[REG|DIV],"regdiv");
	//parsers[REG|DIV]=parsers[REG].or(parsers[DIV]);
    function parse(str) {
    	//if (str.length>100000) return;
    	var t1=new Date().getTime();
		var res=Parser.StringParser.parse(all, str);
		//console.log("Time="+(new Date().getTime()-t1));
		if (res.success) {
			/*res.result[0].forEach(function (e) {
				if (e.type=="REGEX" || e.type=="DIV") {
					console.log(e.type+"\t"+ str.substring(e.pos-5,e.pos+6));
					//console.log( e.text+"\t"+e.type+"\t"+e.pos+"-"+e.len);
				}
			});*/
		} else {
			console.log("Stopped at "+str.substring( res.src.maxPos-5, res.src.maxPos+5));
		}
		if (typeof WebSite=="object" && WebSite.devMode) {
		    window.tokenStat=window.tokenStat||{};
		    res.result[0].forEach(function (r) {
		        window.tokenStat[ r.text ]= window.tokenStat[ r.text ] || 0;
		        window.tokenStat[ r.text ]++;
		    });
		    //buf=""; for (var k in tokenStat) {  buf+=k+"\t"+tokenStat[k]+"\n"; }; buf;
		    //console.log(res);
		}
		return res;
		//console.log(Profiler.report());
		//console.log( disp(res.result[0]) );
    }
    return {parse:parse, extension:"js"};
}();

});
requireSimulator.setName('ExpressionParser');
if (typeof define!=="function") {
   define=require("requirejs").define;
}

define(["Parser"], function (Parser) {
// parser.js の補助ライブラリ．式の解析を担当する
return ExpressionParser=function () {
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
	        built.add(a.ret(Parser.create(function (r) {
                r.opType=opt;
                return r;
            })).setName("(opType "+opt+" "+a.name+")") );
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
};

});
requireSimulator.setName('TonyuLang');
if (typeof define!=="function") {
   define=require("requirejs").define;
}

/*
 * Tonyu2 の構文解析を行う．
 * TonyuLang.parse(src);
 *   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
 */
define(["Grammar", "XMLBuffer", "IndentBuffer", "TT",
        "disp", "Parser", "ExpressionParser", "TError"],
function (Grammar, XMLBuffer, IndentBuffer, TT,
        disp, Parser, ExpressionParser, TError) {
return TonyuLang=function () {
	var p=Parser;
	var $={};
	var g=Grammar();
    var G=g.get;

    var sp=p.StringParser;//(str);
    var tk=p.TokensParser.token;
    var num=tk("number").ret(function (n) {
        n.type="number";
        if (typeof n.text!="string") throw "No text for "+disp(n);
        n.value=parseFloat(n.text);
        if (isNaN(n.value)) throw "No value for "+disp(n);
        return n;
    });
    var symbol=tk("symbol");
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
    var assign=tk("=");
    var literal=tk("literal");
    var regex=tk("regex");
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
    var funcExpr_l=G("funcExpr").firstTokens(["function","\\"]);
    var funcExprArg=g("funcExprArg").ands(funcExpr_l).ret("obj");
    var objlit_l=G("objlit").firstTokens("{");
    var objlitArg=g("objlitArg").ands(objlit_l).ret("obj");
    var objOrFuncArg=objlitArg.or(funcExprArg);
    function genCallBody(argList, oof) {
    	var res=[];
    	if (argList && !argList.args) {
    		throw disp(argList);
    	}
    	if (argList) {
            var rg=Parser.getRange(argList);
            Parser.addRange(res,rg);
    	    argList.args.forEach(function (arg) {
                res.push(arg);
            });
    	}
    	oof.forEach(function (o) {
            var rg=Parser.getRange(o);
            Parser.addRange(res,rg);
    		res.push(o.obj);
    	});
    	return res;
    }
    var callBody=argList.and(objOrFuncArg.rep0()).ret(function(a,oof) {
    	return genCallBody(a,oof);
    }).or(objOrFuncArg.rep1().ret(function (oof) {
    	return genCallBody(null,oof);
    }));
    var callBodyOld=argList.or(objlitArg);
    var call=g("call").ands( callBody ).ret("args");
    var scall=g("scall").ands( callBody ).ret("args");//supercall
    var newExpr = g("newExpr").ands(tk("new"),varAccess, call.opt()).ret(null, "klass","params");
    var superExpr =g("superExpr").ands(
            tk("super"), tk(".").and(symbol).ret(retF(1)).opt() , scall).ret(
            null,                 "name",                       "params");
    var reservedConst = tk("true").or(tk("false")).
    or(tk("null")).
    or(tk("undefined")).
    or(tk("_thread")).
    or(tk("this")).
    or(tk("arguments")).ret(function (t) {
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
    e.element(funcExpr_l);
    e.element(objlit_l);
    e.element(G("arylit").firstTokens("["));
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
    e.infix(prio,tk("is"));
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
    e.prefix(prio,tk("delete"));
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

    var stmt=G("stmt").firstTokens();
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
    var throwSt=g("throw").ands(tk("throw"),expr,tk(";")).ret(null,"ex");
    var varDecl=g("varDecl").ands(symbol, tk("=").and(expr).ret(retF(1)).opt() ).ret("name","value");
    var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
    g("funcDeclHead").ands(
            tk("nowait").opt(),
            tk("function").or(tk("fiber")).or(tk("tk_constructor")).or(tk("\\")).opt(),
            symbol.or(tk("new")) , "paramDecls"
    ).ret("nowait","ftype","name","params");
    var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
    var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
    var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
    //var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
    stmt=g("stmt").ors("return", "if", "for", "while", "break", "ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
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
    var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).
	ret(null, "superClassName");
    var incl=g("includes").ands(tk("includes"), symbol.sep1(tk(","),true),tk(";")).
	ret(null, "includeClassNames");
    var program=g("program").
	ands(ext.opt(),incl.opt(),stmt.rep0(), Parser.TokensParser.eof).
	ret("ext","incl","stmts");

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
	    var tokenRes=TT.parse(str);
	    if (!tokenRes.isSuccess() ) {
	    	//return "ERROR\nToken error at "+tokenRes.src.maxPos+"\n"+
		//	str.substring(0,tokenRes.src.maxPos)+"!!HERE!!"+str.substring(tokenRes.src.maxPos);
		throw TError("文法エラー(Token)", file ,  tokenRes.src.maxPos);
	    }
	    var tokens=tokenRes.result[0];
        //console.log("Tokens: "+tokens.join(","));
	    var res=p.TokensParser.parse(program, tokens);
		//console.log("POS="+res.src.maxPos);
		if (res.isSuccess() ) {
			var node=res.result[0];
			//console.log(disp(node));
			return node;
		    //var xmlsrc=$.genXML(str, node);
		    //return "<program>"+xmlsrc+"</program>";

		}
		var lt=tokens[res.src.maxPos];
		var mp=(lt?lt.pos+lt.len: str.length);
		throw TError("文法エラー", file ,  mp );
		/*return "ERROR\nSyntax error at "+mp+"\n"+
		str.substring(0,mp)+"!!HERE!!"+str.substring(mp);*/
	};
	$.genXML= function (src, node) {
		var x=XMLBuffer(src) ;
		x(node);
        return x.buf;
	};
	$.extension="tonyu";
	return $;
}();

});
requireSimulator.setName('ObjectMatcher');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function () {
return ObjectMatcher=function () {
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
});
requireSimulator.setName('context');
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
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function () {
return context=function () {
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
};
});
requireSimulator.setName('Visitor');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define([],function (){
return Visitor = function (funcs) {
	var $={funcs:funcs, path:[]};
	$.visit=function (node) {
	    try {
	        $.path.push(node);
	        if ($.debug) console.log("visit ",node.type, node.pos);
	        var v=(node ? funcs[node.type] :null);
	        if (v) return v.call($, node);
	        else if ($.def) return $.def.call($,node);
	    } finally {
	        $.path.pop();
	    }
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
});
requireSimulator.setName('Tonyu.Compiler');
define(["Tonyu","ObjectMatcher", "TError"],
        function(Tonyu,ObjectMatcher, TError) {
    var cu={};
    Tonyu.Compiler=cu;
    var ScopeTypes={
            FIELD:"field", METHOD:"method", NATIVE:"native",//B
            LOCAL:"local", THVAR:"threadvar",
            PARAM:"param", GLOBAL:"global",
            CLASS:"class"
    };
    cu.ScopeTypes=ScopeTypes;
    var symSeq=1;//B
    function genSt(st, options) {//B
        var res={type:st};
        if (options) {
            for (var k in options) res[k]=options[k];
        }
        if (!res.name) res.name=genSym("_"+st+"_");
        return res;
    }
    cu.newScopeType=genSt;
    function stype(st) {//B
        return st ? st.type : null;
    }
    cu.getScopeType=stype;
    function newScope(s) {//B
        var f=function (){};
        f.prototype=s;
        return new f();
    }
    cu.newScope=newScope;
    function nc(o, mesg) {//B
        if (!o) throw mesg+" is null";
        return o;
    }
    cu.nullCheck=nc;
    function genSym(prefix) {//B
        return prefix+((symSeq++)+"").replace(/\./g,"");
    }
    cu.genSym=genSym;
    function annotation3(aobjs, node, aobj) {//B
        if (!node._id) {
            if (!aobjs._idseq) aobjs._idseq=0;
            node._id=++aobjs._idseq;
        }
        var res=aobjs[node._id];
        if (!res) res=aobjs[node._id]={node:node};
        if (aobj) {
            for (var i in aobj) res[i]=aobj[i];
        }
        return res;
    }
    cu.annotation=annotation3;
    function getSource(node) {//B
        return srcCont.substring(node.pos,node.pos+node.len);
    }
    cu.getSource=getSource;
    function getMethod2(klass,name) {//B
        var res=null;
        getDependingClasses(klass).forEach(function (k) {
            if (res) return;
            res=k.decls.methods[name];
        });
        return res;
    }
    cu.getMethod=getMethod2;
    function getDependingClasses(klass) {//B
        var visited={};
        var incls=[];
        var res=[];
        for (var k=klass ; k ; k=k.superClass) {
            incls=incls.concat(k.includes);
            visited[k.fullName]=true;
            res.push(k);
        }
        while (incls.length>0) {
            var k=incls.shift();
            if (visited[k.fullName]) continue;
            visited[k.fullName]=true;
            res.push(k);
            incls=incls.concat(k.includes);
        }
        return res;
    }
    cu.getDependingClasses=getDependingClasses;
    function getParams(method) {//B
        if (!method.head) return [];
        var res=method.head.params.params;
        if (!res.forEach) throw method+" is not array ";
        return res;
    }
    cu.getParams=getParams;
    return cu;

});
requireSimulator.setName('Tonyu.Compiler.JSGenerator');
if (typeof define!=="function") {//B
   define=require("requirejs").define;
}
define(["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
        "context", "Visitor","Tonyu.Compiler"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
        context, Visitor,cu) {
return cu.JSGenerator=(function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;//G
var BINDF="Tonyu.bindFunc";
var INVOKE_FUNC="Tonyu.invokeMethod";
var CALL_FUNC="Tonyu.callFunc";
var CHK_NN="Tonyu.checkNonNull";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var ITER="Tonyu.iterator";
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype=cu.getScopeType;
//var newScope=cu.newScope;
//var nc=cu.nullCheck;
//var genSym=cu.genSym;
var annotation3=cu.annotation;
var getSource=cu.getSource;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;

//-----------
function genJS(klass, env) {//B
    var srcFile=klass.src.tonyu; //file object  //S
    var buf=IndentBuffer();
    var printf=buf.printf;
    var ctx=context();
    var debug=false;
    var OM=ObjectMatcher;
    var traceTbl=env.traceTbl;
    // method := fiber | function
    var decls=klass.decls;
    var fields=decls.fields,
        methods=decls.methods,
        natives=decls.natives;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
    var ST=ScopeTypes;
    var fnSeq=0;
    var diagnose=env.options.compiler.diagnose;

    function annotation(node, aobj) {//B
        return annotation3(klass.annotation,node,aobj);
    }
    function getMethod(name) {//B
        return getMethod2(klass,name);
    }
    function getClassName(klass){// should be object or short name //G
        if (typeof klass=="string") return CLASS_HEAD+(env.aliases[klass] || klass);//CFN  CLASS_HEAD+env.aliases[klass](null check)
        if (klass.builtin) return klass.fullName;// CFN klass.fullName
        return CLASS_HEAD+klass.fullName;// CFN  klass.fullName
    }
    function getClassNames(cs){//G
        var res=[];
        cs.forEach(function (c) { res.push(getClassName(c)); });
        return res;
    }
    function enterV(obj, node) {//G
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function varAccess(n, si, an) {//G
        var t=stype(si);
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD) {
            buf.printf("%s.%s",THIZ, n);
        } else if (t==ST.METHOD) {
            if (an && an.noBind) {
                buf.printf("%s.%s",THIZ, n);
            } else {
                buf.printf("%s(%s,%s.%s)",BINDF, THIZ, THIZ, n);
            }
        } else if (t==ST.CLASS) {
            buf.printf("%s",getClassName(n));
        } else if (t==ST.GLOBAL) {
            buf.printf("%s%s",GLOBAL_HEAD, n);
        } else if (t==ST.PARAM || t==ST.LOCAL || t==ST.NATIVE) {
            buf.printf("%s",n);
        } else {
            console.log("Unknown scope type: ",t);
            throw new Error("Unknown scope type: "+t);
        }
        return si;
    }
    function noSurroundCompoundF(node) {//G
        return function () {
            noSurroundCompound.apply(this, [node]);
        };
    }
    function noSurroundCompound(node) {//G
        if (node.type=="compound") {
            ctx.enter({noWait:true},function () {
                buf.printf("%j%n", ["%n",node.stmts]);
               // buf.printf("%{%j%n%}", ["%n",node.stmts]);
            });
        } else {
            v.visit(node);
        }
    }
    function lastPosF(node) {//G
        return function () {
            buf.printf("%s%s=%s;%n", (env.options.compiler.commentLastPos?"//":""),
                    LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ));
        };
    }
    var THNode={type:"THNode"};//G
    v=buf.visitor=Visitor({//G
        THNode: function (node) {
            buf.printf(TH);
        },
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
        },
        "return": function (node) {
            if (ctx.inTry) throw TError("現実装では、tryの中にreturnは書けません",srcFile,node.pos);
            if (!ctx.noWait) {
                if (node.value) {
                    buf.printf("%s.exit(%v);return;",TH,node.value);
                } else {
                    buf.printf("%s.exit(%s);return;",TH,THIZ);
                }
            } else {
                if (ctx.threadAvail) {
                    if (node.value) {
                        buf.printf("%s.retVal=%v;return;%n",TH, node.value);
                    } else {
                        buf.printf("%s.retVal=%s;return;%n",TH, THIZ);
                    }
                } else {
                    if (node.value) {
                        buf.printf("return %v;",node.value);
                    } else {
                        buf.printf("return %s;",THIZ);
                    }

                }
            }
        },
        program: function (node) {
            genClass(node.stmts);
        },
        number: function (node) {
            buf.printf("%s", node.value );
        },
        reservedConst: function (node) {
            if (node.text=="this") {
                buf.printf("%s",THIZ);
            } else if (node.text=="arguments" && ctx.threadAvail) {
                buf.printf("%s",ARGS);
            } else if (node.text==TH) {
                buf.printf("%s", (ctx.threadAvail)?TH:"null");
            } else {
                buf.printf("%s", node.text);
            }
        },
        varDecl: function (node) {
            if (node.value) {
                buf.printf("%v = %v", node.name, node.value );
            } else {
                buf.printf("%v", node.name);
            }
        },
        varsDecl: function (node) {
            lastPosF(node)();
            buf.printf("%j;", [";",node.decls]);
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            } else {
                buf.printf("%v: %f", node.key, function () {
                    var si=varAccess( node.key.text, annotation(node).scopeInfo, annotation(node));
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
        	genFuncExpr(node);
        },
        parenExpr: function (node) {
            buf.printf("(%v)",node.expr);
        },
        varAccess: function (node) {
            var n=node.name.text;
            var si=varAccess(n,annotation(node).scopeInfo, annotation(node));
        },
        exprstmt: function (node) {//exprStmt
            var t={};
            lastPosF(node)();
            if (!ctx.noWait) {
                t=annotation(node).fiberCall || {};
            }
            if (t.type=="noRet") {
                buf.printf(
                        "%s.%s%s(%j);%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{",
                            THIZ, FIBPRE, t.N,  [", ",[THNode].concat(t.A)],
                            FRMPC, ctx.pc,
                            ctx.pc++
                );
            } else if (t.type=="ret") {
                buf.printf(
                        "%s.%s%s(%j);%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{"+
                        "%v%v%s.retVal;%n",
                            THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
                            FRMPC, ctx.pc,
                            ctx.pc++,
                            t.L, t.O, TH
                );
            } else if (t.type=="noRetSuper") {
                var p=getClassName(klass.superClass);
                    buf.printf(
                            "%s.prototype.%s%s.apply( %s, [%j]);%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{",
                             p,  FIBPRE, t.S.name.text,  THIZ,  [", ",[THNode].concat(t.A)],
                                FRMPC, ctx.pc,
                                ctx.pc++
                    );
            } else if (t.type=="retSuper") {
                    buf.printf(
                            "%s.prototype.%s%s.apply( %s, [%j]);%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{"+
                            "%v%v%s.retVal;%n",
                                p,  FIBPRE, t.S.name.text,  THIZ, [", ",[THNode].concat(t.A)],
                                FRMPC, ctx.pc,
                                ctx.pc++,
                                t.L, t.O, TH
                    );
            } else {
                buf.printf("%v;", node.expr );
            }
        },
        infix: function (node) {
            var opn=node.op.text;
            /*if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
                checkLVal(node.left);
            }*/
            if (diagnose) {
                if (opn=="+" || opn=="-" || opn=="*" ||  opn=="/" || opn=="%" ) {
                    buf.printf("%s(%v,%l)%v%s(%v,%l)", CHK_NN, node.left, getSource(node.left), node.op,
                            CHK_NN, node.right, getSource(node.right));
                    return;
                }
                if (opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
                    buf.printf("%v%v%s(%v,%l)", node.left, node.op,
                            CHK_NN, node.right, getSource(node.right));
                    return;
                }
            }
            buf.printf("%v%v%v", node.left, node.op, node.right);
        },
        trifixr:function (node) {
            buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
        },
        prefix: function (node) {
            buf.printf("%v %v", node.op, node.right);
        },
        postfix: function (node) {
            var a=annotation(node);
            if (diagnose) {
                if (a.myMethodCall) {
                    var mc=a.myMethodCall;
                    var si=mc.scopeInfo;
                    var st=stype(si);
                    if (st==ST.FIELD || st==ST.METHOD) {
                        buf.printf("%s(%s, %l, [%j], %l )", INVOKE_FUNC,THIZ, mc.name, [",",mc.args],"this");
                    } else {
                        buf.printf("%s(%v, [%j], %l)", CALL_FUNC, node.left, [",",mc.args], getSource(node.left));
                    }
                    return;
                } else if (a.othersMethodCall) {
                    var oc=a.othersMethodCall;
                    buf.printf("%s(%v, %l, [%j], %l )", INVOKE_FUNC, oc.target, oc.name, [",",oc.args],getSource(oc.target));
                    return;
                } else if (a.memberAccess) {
                    var ma=a.memberAccess;
                    buf.printf("%s(%v,%l).%s", CHK_NN, ma.target, getSource(ma.target), ma.name );
                    return;
                }
            } else if (a.myMethodCall) {
                var mc=a.myMethodCall;
                var si=mc.scopeInfo;
                var st=stype(si);
                if (st==ST.METHOD) {
                    buf.printf("%s.%s(%j)",THIZ, mc.name, [",",mc.args]);
                    return;
                }
            }
            buf.printf("%v%v", node.left, node.op);
        },
        "break": function (node) {
            if (!ctx.noWait) {
                if (ctx.inTry && ctx.exitTryOnJump) throw TError("現実装では、tryの中にbreak;は書けません",srcFile,node.pos);
                if (ctx.closestBrk) {
                    buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
                } else {
                    throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
                }
            } else {
                buf.printf("break;%n");
            }
        },
        "try": function (node) {
            var an=annotation(node);
            if (!ctx.noWait &&
                    (an.fiberCallRequired || an.hasJump || an.hasReturn)) {
                //buf.printf("/*try catch in wait mode is not yet supported*/%n");
                if (node.catches.length!=1 || node.catches[0].type!="catch") {
                    throw TError("現実装では、catch節1個のみをサポートしています",srcFile,node.pos);
                }
                var ct=node.catches[0];
                var catchPos={},finPos={};
                buf.printf("%s.enterTry(%z);%n",TH,catchPos);
                buf.printf("%f", enterV({inTry:true, exitTryOnJump:true},node.stmt) );
                buf.printf("%s.exitTry();%n",TH);
                buf.printf("%s=%z;break;%n",FRMPC,finPos);
                buf.printf("%}case %f:%{",function (){
                       buf.print(catchPos.put(ctx.pc++));
                });
                buf.printf("%s=%s.startCatch();%n",ct.name.text, TH);
                buf.printf("%s.exitTry();%n",TH);
                buf.printf("%v%n", ct.stmt);
                buf.printf("%}case %f:%{",function (){
                    buf.print(finPos.put(ctx.pc++));
                });
            } else {
                ctx.enter({noWait:true}, function () {
                    buf.printf("try {%{%f%n%}} ",
                            noSurroundCompoundF(node.stmt));
                    node.catches.forEach(v.visit);
                });
            }
        },
        "catch": function (node) {
            buf.printf("catch (%s) {%{%f%n%}}",node.name.text, noSurroundCompoundF(node.stmt));
        },
        "throw": function (node) {
            buf.printf("throw %v;%n",node.ex);
        },
        "while": function (node) {
            lastPosF(node)();
            var an=annotation(node);
            if (!ctx.noWait &&
                    (an.fiberCallRequired || an.hasReturn)) {
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
                            enterV({closestBrk:brkpos, exitTryOnJump:false}, node.loop),
                            FRMPC, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
            } else {
                ctx.enter({noWait:true},function () {
                    buf.printf("while (%v) {%{%f%n%}}", node.cond, noSurroundCompoundF(node.loop));
                });
            }
        },
        "for": function (node) {
            lastPosF(node)();
            var an=annotation(node);
            if (node.inFor.type=="forin") {
                var itn=annotation(node.inFor).iterName;
                if (!ctx.noWait &&
                        (an.fiberCallRequired || an.hasReturn)) {
                    var brkpos=buf.lazy();
                    var pc=ctx.pc++;
                    buf.printf(
                            "%s=%s(%v,%s);%n"+
                            "%}case %d:%{" +
                            "if (!(%s.next())) { %s=%z; break; }%n" +
                            "%f%n" +
                            "%f%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                itn, ITER, node.inFor.set, node.inFor.vars.length,
                                pc,
                                itn, FRMPC, brkpos,
                                getElemF(itn, node.inFor.isVar, node.inFor.vars),
                                enterV({closestBrk:brkpos, exitTryOnJump:false}, node.loop),//node.loop,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                } else {
                    ctx.enter({noWait:true},function() {
                        buf.printf(
                            "%s=%s(%v,%s);%n"+
                            "while(%s.next()) {%{" +
                            "%f%n"+
                            "%f%n" +
                            "%}}",
                            itn, ITER, node.inFor.set, node.inFor.vars.length,
                            itn,
                            getElemF(itn, node.inFor.isVar, node.inFor.vars),
                            noSurroundCompoundF(node.loop)
                        );
                    });
                }
            } else {
                if (!ctx.noWait&&
                        (an.fiberCallRequired || an.hasReturn)) {
                    var brkpos=buf.lazy();
                    var pc=ctx.pc++;
                    buf.printf(
                            "%v;%n"+
                            "%}case %d:%{" +
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%f%n" +
                            "%v;%n" +
                            "%s=%s;break;%n" +
                            "%}case %f:%{",
                                node.inFor.init ,
                                pc,
                                node.inFor.cond, FRMPC, brkpos,
                                enterV({closestBrk:brkpos,exitTryOnJump:false}, node.loop),//node.loop,
                                node.inFor.next,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                } else {
                    ctx.enter({noWait:true},function() {
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
                    });
                }
            }
            function getElemF(itn, isVar, vars) {
                return function () {
                    vars.forEach(function (v,i) {
                        buf.printf("%s=%s[%s];%n", v.text, itn, i);
                    });
                };
            }
        },
        "if": function (node) {
            lastPosF(node)();
            //buf.printf("/*FBR=%s*/",!!annotation(node).fiberCallRequired);
            var an=annotation(node);
            if (!ctx.noWait &&
                    (an.fiberCallRequired || an.hasJump || an.hasReturn)) {
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
                ctx.enter({noWait:true}, function () {
                    if (node._else) {
                        buf.printf("if (%v) {%{%f%n%}} else {%{%f%n%}}", node.cond,
                                noSurroundCompoundF(node.then),
                                noSurroundCompoundF(node._else));
                    } else {
                        buf.printf("if (%v) {%{%f%n%}}", node.cond,
                                noSurroundCompoundF(node.then));
                    }
                });
            }
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                buf.printf("%v",node.then);
            } else {
                if (node._else) {
                    buf.printf("%v",node._else);
                }
            }
        },
        call: function (node) {
        	buf.printf("(%j)", [",",node.args]);
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
        	buf.printf("[%j]", [",",node.args]);
        },
        superExpr: function (node) {
            var name;
            if (!klass.superClass) throw new Error(klass.fullName+"には親クラスがありません");
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
            var an=annotation(node);
            if (!ctx.noWait &&
                    (an.fiberCallRequired || an.hasJump || an.hasReturn) ) {
                buf.printf("%j", ["%n",node.stmts]);
            } else {
                /*if (ctx.noSurroundBrace) {
                    ctx.enter({noSurroundBrace:false,noWait:true},function () {
                        buf.printf("%{%j%n%}", ["%n",node.stmts]);
                    });
                } else {*/
                    ctx.enter({noWait:true},function () {
                        buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
                    });
                //}
            }
        },
	"typeof": function (node) {
	    buf.printf("typeof ");
	},
	"instanceof": function (node) {
	    buf.printf(" instanceof ");
	},
    "is": function (node) {
        buf.printf(" instanceof ");
    },
	regex: function (node) {
	    buf.printf("%s",node.text);
	}
    });
    var opTokens=["++", "--", "!==", "===", "+=", "-=", "*=", "/=",
		  "%=", ">=", "<=",
    "!=", "==", ">>", "<<", "&&", "||", ">", "<", "+", "?", "=", "*",
    "%", "/", "^", "~", "\\", ":", ";", ",", "!", "&", "|", "-"
	,"delete"	 ];
    opTokens.forEach(function (opt) {
	v.funcs[opt]=function (node) {
	    buf.printf("%s",opt);
	};
    });
    //v.debug=debug;
    v.def=function (node) {
        console.log("Err node=");
        console.log(node);
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    function genSource() {//G
        //annotateSource();
        /*if (env.options.compiler.asModule) {
            klass.moduleName=getClassName(klass);
            printf("if (typeof requireSimulator=='object') requireSimulator.setName(%l);%n",klass.moduleName);
            printf("//requirejs(['Tonyu'%f],function (Tonyu) {%{", function (){
                getDependingClasses(klass).forEach(function (k) {
                    printf(",%l",k.moduleName);
                });
            });
        }*/
        ctx.enter({/*scope:topLevelScope*/}, function () {
            var nspObj=CLASS_HEAD+klass.namespace;
            printf("Tonyu.klass.ensureNamespace(%s,%l);%n",CLASS_HEAD.replace(/\.$/,""), klass.namespace);
            //printf(nspObj+"="+nspObj+"||{};%n");
            if (klass.superClass) {
                printf("%s=Tonyu.klass(%s,[%s],{%{",
                        getClassName(klass),
                        getClassName(klass.superClass),
                        getClassNames(klass.includes).join(","));
            } else {
                printf("%s=Tonyu.klass([%s],{%{",
                        getClassName(klass),
                        getClassNames(klass.includes).join(","));
            }
            for (var name in methods) {
                if (debug) console.log("method1", name);
                var method=methods[name];
                //initParamsLocals(method);
                //annotateMethodFiber(method);
                ctx.enter({noWait:true, threadAvail:false}, function () {
                    genFunc(method);
                });
                if (debug) console.log("method2", name);
                //v.debug=debug;
                if (!method.nowait ) {
                    ctx.enter({noWait:false,threadAvail:true}, function () {
                        genFiber(method);
                    });
                }
                if (debug) console.log("method3", name);
            }
            printf("__dummy: false%n");
            printf("%}});%n");
        });
        printf("Tonyu.klass.addMeta(%s,%s);%n",
                getClassName(klass),JSON.stringify(digestMeta(klass)));
        //if (env.options.compiler.asModule) {
        //    printf("//%}});");
        //}
    }
    function digestMeta(klass) {//G
        var res={
                fullName: klass.fullName,
                namespace: klass.namespace,
                shortName: klass.shortName,
                decls:{methods:{}}
        };
        for (var i in klass.decls.methods) {
            res.decls.methods[i]=
            {nowait:!!klass.decls.methods[i].nowait};
        }
        return res;
    }
    function genFiber(fiber) {//G
        if (isConstructor(fiber)) return;
        var stmts=fiber.stmts;
        var noWaitStmts=[], waitStmts=[], curStmts=noWaitStmts;
        var opt=true;
        if (opt) {
            stmts.forEach(function (s) {
                if (annotation(s).fiberCallRequired) {
                    curStmts=waitStmts;
                }
                curStmts.push(s);
            });
        } else {
            waitStmts=stmts;
        }
        printf(
               "%s%s :function %s(%j) {%{"+
                 "var %s=%s;%n"+
                 "%svar %s=%s;%n"+
                 "var %s=0;%n"+
                 "%f%n"+
                 "%f%n",
               FIBPRE, fiber.name, genFn(fiber.pos), [",",[THNode].concat(fiber.params)],
                 THIZ, GET_THIS,
                 (fiber.useArgs?"":"//"), ARGS, "Tonyu.A(arguments)",
                 FRMPC,
                 genLocalsF(fiber),
                 nfbody
        );
        if (waitStmts.length>0) {
            printf(
                 "%s.enter(function %s(%s) {%{"+
                    "if (%s.lastEx) %s=%s.catchPC;%n"+
                    "for(var %s=%d ; %s--;) {%{"+
                      "switch (%s) {%{"+
                        "%}case 0:%{"+
                        "%f" +
                        "%s.exit(%s);return;%n"+
                      "%}}%n"+
                    "%}}%n"+
                 "%}});%n",
                 TH,genFn(fiber.pos),TH,
                    TH,FRMPC,TH,
                    CNTV, CNTC, CNTV,
                      FRMPC,
                        // case 0:
                        fbody,
                        TH,THIZ
            );
        } else {
            printf("%s.retVal=%s;return;%n",TH,THIZ);
        }
        printf("%}},%n");
        function nfbody() {
            ctx.enter({method:fiber, /*scope: fiber.scope,*/ noWait:true, threadAvail:true }, function () {
                noWaitStmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
        function fbody() {
            ctx.enter({method:fiber, /*scope: fiber.scope,*/
                finfo:fiber, pc:1}, function () {
                waitStmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFunc(func) {//G
        var fname= isConstructor(func) ? "initialize" : func.name;
        printf("%s :function %s(%j) {%{"+
                  "var %s=%s;%n"+
                  "%f%n" +
                  "%f" +
               "%}},%n",
               fname, genFn(func.pos), [",",func.params],
               THIZ, GET_THIS,
               	      genLocalsF(func),
                      fbody
        );
        function fbody() {
            ctx.enter({method:func, finfo:func,
                /*scope: func.scope*/ }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFuncExpr(node) {//G
        var finfo=annotation(node);// annotateSubFuncExpr(node);

        buf.printf("function (%j) {%{"+
                       "%f%n"+
                       "%f"+
                   "%}}"
                 ,
                    [",", finfo.params],
                 	genLocalsF(finfo),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, threadAvail:false,
                finfo:finfo, /*scope: finfo.scope*/ }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFn(pos) {//G
        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
    }
    function genSubFunc(node) {//G
        var finfo=annotation(node);// annotateSubFuncExpr(node);
        buf.printf("function %s(%j) {%{"+
                      "%f%n"+
                      "%f"+
                   "%}}"
                 ,
                     finfo.name,[",", finfo.params],
                  	genLocalsF(finfo),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, threadAvail:false,
                finfo:finfo, /*scope: finfo.scope*/ }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genLocalsF(finfo) {//G
        return f;
        function f() {
            ctx.enter({/*scope:finfo.scope*/}, function (){
                for (var i in finfo.locals.varDecls) {
                    buf.printf("var %s;%n",i);
                }
                for (var i in finfo.locals.subFuncDecls) {
                    genSubFunc(finfo.locals.subFuncDecls[i]);
                }
            });
        };
    }
    function isConstructor(f) {//G
        return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
    }
    genSource();//G
    klass.src.js=buf.buf;//G
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }
    return buf.buf;
}//B
return {genJS:genJS};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});
requireSimulator.setName('Tonyu.Compiler.Semantics');
if (typeof define!=="function") {//B
   define=require("requirejs").define;
}
define(["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
        "context", "Visitor","Tonyu.Compiler"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
        context, Visitor,cu) {
return cu.Semantics=(function () {
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
var genSt=cu.newScopeType;
var stype=cu.getScopeType;
var newScope=cu.newScope;
//var nc=cu.nullCheck;
var genSym=cu.genSym;
var annotation3=cu.annotation;
var getSource=cu.getSource;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;
var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
//-----------
function initClassDecls(klass, env ) {//S
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={name:"main",stmts:[],pos:0};
    // method := fiber | function
    var fields={}, methods={main: MAIN}, natives={};
    klass.decls={fields:fields, methods:methods, natives: natives};
    klass.node=node;
    /*function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }*/
    var OM=ObjectMatcher;
    function initMethods(program) {
        var spcn=env.options.compiler.defaultSuperClass;
        var pos=0;
        var t;
        if (t=OM.match( program , {ext:{superClassName:{text:OM.N, pos:OM.P}}})) {
            spcn=t.N;
            pos=t.P;
            if (spcn=="null") spcn=null;
        }
        klass.includes=[];
        if (t=OM.match( program , {incl:{includeClassNames:OM.C}})) {
            t.C.forEach(function (i) {
                var n=i.text;/*ENVC*/
                var p=i.pos;
                var incc=env.classes[env.aliases[n] || n];/*ENVC*/ //CFN env.classes[env.aliases[n]]
                if (!incc) throw TError ( "クラス "+n+"は定義されていません", s, p);
                klass.includes.push(incc);
            });
        }
        if (spcn=="Array") {
            klass.superClass={name:"Array",fullName:"Array",builtin:true};
        } else if (spcn) {
            var spc=env.classes[env.aliases[spcn] || spcn];/*ENVC*/  //CFN env.classes[env.aliases[spcn]]
            if (!spc) {
                throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            }
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                var ftype="function";
                if (head.ftype) {
                    ftype=head.ftype.text;
                    //console.log("head.ftype:",stmt);
                }
                methods[head.name.text]={
                        nowait: (!!head.nowait),
                        ftype:  ftype,
                        name:  head.name.text,
                        head:  head,
                        pos: head.pos,
                        stmts: stmt.body.stmts
                };
            } else if (stmt.type=="nativeDecl") {
                natives[stmt.name.text]=stmt;
            } else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    initMethods(node);        // node=program
}
function annotateSource2(klass, env) {//B
    var srcFile=klass.src.tonyu; //file object  //S
    var srcCont=srcFile.text();
    var OM=ObjectMatcher;
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
    var v=null;
    var ctx=context();
    var debug=false;
    var othersMethodCallTmpl={
            type:"postfix",
            left:{
                type:"postfix",
                left:OM.T,
                op:{type:"member",name:{text:OM.N}}
            },
            op:{type:"call", args:OM.A }
    };
    var memberAccessTmpl={
            type:"postfix",
            left: OM.T,
            op:{type:"member",name:{text:OM.N}}
    };
    var myMethodCallTmpl=fiberCallTmpl={
            type:"postfix",
            left:{type:"varAccess", name: {text:OM.N}},
            op:{type:"call", args:OM.A }
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
        expr: {type:"superExpr", params:{args:OM.A}, $var:"S"}
    };
    var retSuperFiberCallTmpl={
            expr: {
                type: "infix",
                op: OM.O,
                left: OM.L,
                right: {type:"superExpr", params:{args:OM.A}, $var:"S"}
            }
        };
    klass.annotation={};
    function annotation(node, aobj) {//B
        return annotation3(klass.annotation,node,aobj);
    }
    /*function assertAnnotated(node, si) {//B
        var a=annotation(node);
        if (!a.scopeInfo) {
            console.log(srcCont.substring(node.pos-5,node.pos+20));
            console.log(node, si);
            throw "Scope info not set";
        }
        if (si.type!=a.scopeInfo.type){
            console.log(srcCont.substring(node.pos-5,node.pos+20));
            console.log(node, si , a.scopeInfo);
            throw "Scope info not match";
        }
    }*/
    function initTopLevelScope2(klass) {//S
    	if (klass.builtin) return;
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=genSt(ST.FIELD,{klass:klass.name,name:i});
        }
        for (var i in decls.methods) {
            s[i]=genSt(ST.METHOD,{klass:klass.name, name:i});
        }
    }
    function initTopLevelScope() {//S
        var s=topLevelScope;
        getDependingClasses(klass).forEach(initTopLevelScope2);
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=genSt(ST.NATIVE,{name:"native::"+i});
        }
        for (var i in JSNATIVES) {
            s[i]=genSt(ST.NATIVE,{name:"native::"+i});
        }
        for (var i in env.aliases) {/*ENVC*/ //CFN  env.classes->env.aliases
            s[i]=genSt(ST.CLASS,{name:i});
        }
    }
    function inheritSuperMethod() {//S
        var d=getDependingClasses(klass);
        for (var n in klass.decls.methods) {
            var m2=klass.decls.methods[n];
            d.forEach(function (k) {
                var m=k.decls.methods[n];
                if (m && m.nowait) {
                    m2.nowait=true;
                }
            });
        }
    }
    function getMethod(name) {//B
        return getMethod2(klass,name);
    }
    function checkLVal(node) {//S
        if (node.type=="varAccess" ||
                node.type=="postfix" && (node.op.type=="member" || node.op.type=="arrayElem") ) {
            if (node.type=="varAccess") {
                annotation(node,{noBind:true});
            }
            return true;
        }
        console.log("LVal",node);
        throw TError( "'"+getSource(node)+"'は左辺には書けません．" , srcFile, node.pos);
    }
    function getScopeInfo(n) {//S
        var si=ctx.scope[n];
        var t=stype(si);
        if (!t) {
            var isg=n.match(/^\$/);
            t=isg?ST.GLOBAL:ST.FIELD;
            var opt={name:n};
            if (!isg) opt.klass=klass.name;
            si=topLevelScope[n]=genSt(t,opt);
        }
        return si;
    }
    var localsCollector=Visitor({
        varDecl: function (node) {
            ctx.locals.varDecls[node.name.text]=node;
        },
        funcDecl: function (node) {/*FDITSELFIGNORE*/
            ctx.locals.subFuncDecls[node.head.name.text]=node;
            //initParamsLocals(node);??
        },
        funcExpr: function (node) {/*FEIGNORE*/
            //initParamsLocals(node);??
        },
        "catch": function (node) {
            ctx.locals.varDecls[node.name.text]=node;
        },
        exprstmt: function (node) {
        },
        "forin": function (node) {
            var isVar=node.isVar;
            node.vars.forEach(function (v) {
                /* if (isVar) */ctx.locals.varDecls[v.text]=node;
            });
            var n=genSym("_it_");
            annotation(node, {iterName:n});
            ctx.locals.varDecls[n]=node;// ??
        }
    });
    localsCollector.def=visitSub;//S
    function visitSub(node) {//S
        var t=this;
        if (!node || typeof node!="object") return;
        var es;
        if (node instanceof Array) es=node;
        else es=node[Grammar.SUBELEMENTS];
        if (!es) {
            es=[];
            for (var i in node) {
                es.push(node[i]);
            }
        }
        es.forEach(function (e) {
            t.visit(e);
        });
    }
    function collectLocals(node) {//S
        var locals={varDecls:{}, subFuncDecls:{}};
        ctx.enter({locals:locals},function () {
            localsCollector.visit(node);
        });
        return locals;
    }
    function annotateParents(path, data) {//S
        path.forEach(function (n) {
            annotation(n,data);
        });
    }
    function fiberCallRequired(path) {//S
        if (ctx.method) ctx.method.fiberCallRequired=true;
        annotateParents(path, {fiberCallRequired:true} );
    }
    var varAccessesAnnotator=Visitor({//S
        varAccess: function (node) {
            var si=getScopeInfo(node.name.text);
            annotation(node,{scopeInfo:si});
        },
        funcDecl: function (node) {/*FDITSELFIGNORE*/
        },
        funcExpr: function (node) {/*FEIGNORE*/
            annotateSubFuncExpr(node);
        },
        jsonElem: function (node) {
            if (node.value) {
                this.visit(node.value);
            } else {
                var si=getScopeInfo(node.key.text);
                annotation(node,{scopeInfo:si});
            }
        },
        "do": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "switch": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "while": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "for": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "forin": function (node) {
            node.vars.forEach(function (v) {
                var si=getScopeInfo(v.text);
                annotation(v,{scopeInfo:si});
            });
            this.visit(node.set);
        },
        ifWait: function (node) {
            var TH="_thread";
            var t=this;
            var ns=newScope(ctx.scope);
            ns[TH]=genSt(ST.THVAR);
            ctx.enter({scope:ns}, function () {
                t.visit(node.then);
            });
            if (node._else) {
                t.visit(node._else);
            }
            fiberCallRequired(this.path);
        },
        "try": function (node) {
            ctx.finfo.useTry=true;
            this.def(node);
        },
        "return": function (node) {
            if (!ctx.noWait) annotateParents(this.path,{hasReturn:true});
            this.visit(node.value);
        },
        "break": function (node) {
            if (!ctx.jumpable) throw TError( "break； は繰り返しの中で使います." , srcFile, node.pos);
            if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
        },
        "continue": function (node) {
            if (!ctx.jumpable) throw TError( "continue； は繰り返しの中で使います." , srcFile, node.pos);
            if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
        },
        "reservedConst": function (node) {
            if (node.text=="arguments") {
                ctx.finfo.useArgs=true;
            }
        },
        postfix: function (node) {
            var t;
            this.visit(node.left);
            this.visit(node.op);
            if (t=OM.match(node, myMethodCallTmpl)) {
                var si=annotation(node.left).scopeInfo;
                annotation(node, {myMethodCall:{name:t.N,args:t.A,scopeInfo:si}});
            } else if (t=OM.match(node, othersMethodCallTmpl)) {
                annotation(node, {othersMethodCall:{target:t.T,name:t.N,args:t.A} });
            } else if (t=OM.match(node, memberAccessTmpl)) {
                annotation(node, {memberAccess:{target:t.T,name:t.N} });
            }
        },
        infix: function (node) {
            var opn=node.op.text;
            if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
                checkLVal(node.left);
            }
            this.def(node);
        },
        exprstmt: function (node) {
            var t,m;
            if (!ctx.noWait &&
                    (t=OM.match(node,noRetFiberCallTmpl)) &&
                    stype(ctx.scope[t.N])==ST.METHOD &&
                    !getMethod(t.N).nowait) {
                t.type="noRet";
                annotation(node, {fiberCall:t});
                fiberCallRequired(this.path);
            } else if (!ctx.noWait &&
                    (t=OM.match(node,retFiberCallTmpl)) &&
                    stype(ctx.scope[t.N])==ST.METHOD &&
                    !getMethod(t.N).nowait) {
                t.type="ret";
                annotation(node, {fiberCall:t});
                fiberCallRequired(this.path);
            } else if (!ctx.noWait &&
                    (t=OM.match(node,noRetSuperFiberCallTmpl)) &&
                    t.S.name) {
                m=getMethod(t.S.name.text);
                if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
                if (!m.nowait) {
                    t.type="noRetSuper";
                    t.superClass=klass.superClass;
                    annotation(node, {fiberCall:t});
                    fiberCallRequired(this.path);
                }
            } else if (!ctx.noWait &&
                    (t=OM.match(node,retSuperFiberCallTmpl)) &&
                    t.S.name) {
                m=getMethod(t.S.name.text);
                if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
                if (!m.nowait) {
                    t.type="retSuper";
                    t.superClass=klass.superClass;
                    annotation(node, {fiberCall:t});
                    fiberCallRequired(this.path);
                }
            }
            this.visit(node.expr);
        }
    });
    varAccessesAnnotator.def=visitSub;//S
    function annotateVarAccesses(node,scope) {//S
        ctx.enter({scope:scope}, function () {
            varAccessesAnnotator.visit(node);
        });
    }
    function copyLocals(locals, scope) {//S
        for (var i in locals.varDecls) {
            scope[i]=genSt(ST.LOCAL);
        }
        for (var i in locals.subFuncDecls) {
            scope[i]=genSt(ST.LOCAL);
        }
    }
    function initParamsLocals(f) {//S
        f.locals=collectLocals(f.stmts);
        f.params=getParams(f);
    }
    function annotateMethodFiber(f) {//S
        var ns=newScope(ctx.scope);
        f.params.forEach(function (p,cnt) {
            ns[p.name.text]=genSt(ST.PARAM,{
                klass:klass.name, name:f.name, no:cnt
            });
        });
        copyLocals(f.locals, ns);
        ctx.enter({method:f,finfo:f, noWait:false}, function () {
            annotateVarAccesses(f.stmts, ns);
        });
        f.scope=ns;
        annotateSubFuncExprs(f.locals, ns);
        return ns;
    }
    function annotateSource() {//S
        ctx.enter({scope:topLevelScope}, function () {
            for (var name in methods) {
                if (debug) console.log("anon method1", name);
                var method=methods[name];
                initParamsLocals(method);
                annotateMethodFiber(method);
            }
        });
    }
    function annotateSubFuncExpr(node) {//S
        var m,ps;
        var body=node.body;
        var name=(node.head.name ? node.head.name.text : "anonymous" );
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=genSt(ST.PARAM);
        });
        var locals=collectLocals(body, ns);
        copyLocals(locals,ns);
        var finfo=annotation(node);
        ctx.enter({finfo: finfo}, function () {
            annotateVarAccesses(body,ns);
        });
        var res={scope:ns, locals:locals, name:name, params:ps};
        annotation(node,res);
        annotation(node,finfo);
        annotateSubFuncExprs(locals, ns);
        return res;
    }
    function annotateSubFuncExprs(locals, scope) {//S
        ctx.enter({scope:scope}, function () {
            for (var n in locals.subFuncDecls) {
                annotateSubFuncExpr(locals.subFuncDecls[n]);
            }
        });
    }
    initTopLevelScope();//S
    inheritSuperMethod();//S
    annotateSource();
}//B
return {initClassDecls:initClassDecls, annotate:annotateSource2};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});
requireSimulator.setName('Tonyu.TraceTbl');
define(["Tonyu", "FS", "TError"],
function(Tonyu, FS, TError) {
return Tonyu.TraceTbl=function () {
    var TTB={};
    var POSMAX=1000000;
    var pathIdSeq=1;
    var PATHIDMAX=10000;
    var path2Id={}, id2Path=[];
    var path2Class={};
    TTB.add=function (klass, pos){
        var file=klass.src.tonyu;
        var path=file.path();
        var pathId=path2Id[path];
        if (pathId==undefined) {
            pathId=pathIdSeq++;
            if (pathIdSeq>PATHIDMAX) pathIdSeq=0;
            path2Id[path]=pathId;
            id2Path[pathId]=path;
        }
        path2Class[path]=klass;
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
            var klass=path2Class[path];
            return TError("Trace info", klass || f, pos);
        } else {
            return null;
            //return TError("Trace info", "unknown src id="+id, pos);
        }
    };
    return TTB;
};
//if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
});
requireSimulator.setName('ProjectCompiler');
define(["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics","Tonyu.TraceTbl","FS"],
        function (Tonyu,JSGenerator,Semantics, ttb,FS) {
var TPRC=function (dir) {
    if (!dir.rel) throw new Error("projectCompiler: "+dir+" is not dir obj");
     var TPR={env:{}};
     var traceTbl=Tonyu.TraceTbl();
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
                var spc=c.superClass;
                var deps=[spc];
                var ready=true;
                if (c.includes) deps=deps.concat(c.includes);
                deps.forEach(function (cl) {
                    ready=ready && (
                       !cl || !classes[cl.fullName] || cl.builtin || added[cl.fullName]
                    );
                });
                if (ready) {
                    res.push(c);
                    added[n]=true;
                }
            }
            if (res.length==p) throw TError( "クラスの循環参照があります", "不明" ,0);
        }
        return res;
    }
    function evalFile(f) {
        console.log("loading: "+f.path());
        /*if (typeof require=="function") return require(f.path());
        else */return new Function(f.text())();
    }
    return TPR;
}
return TPRC;
});


requireSimulator.setName('PatternParser');
define(["Tonyu"], function (Tonyu) {return Tonyu.klass({
	initialize: function (img, options) {
	    this.options=options || {};
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
			//console.log("parse()");
  			var res=[];// List of charpattern
			for (var y=0; y<this.height ;y++) {
				for (var x=0; x<this.width ;x++) {
					var c=this.getPixel(x, y);
					if (c!=this.base) {
						res.push(this.parse1Pattern(x,y));
					}
				}
			}
			//console.log("parsed:"+res.lenth);
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
        console.log("PP",sx,sy,w,h,dx,dy);
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
        if (this.options.boundsInSrc) {
            return {x:sx,y:sy,width:w,height:h};
        }
		return {image:newim, x:0, y:0, width:w, height:h};
		function PatterParseError(x,y,msg) {
		    return {toString: function () {
		        return "at ("+x+","+y+") :"+msg;
		    }, isParseError:true};
		}
	}

});});
requireSimulator.setName('Util');
Util=(function () {

function getQueryString(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return decodeURLComponentEx(qs[1]);
}
function decodeURLComponentEx(s){
    return decodeURIComponent(s.replace(/\+/g, '%20'));
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}

return {getQueryString:getQueryString, endsWith: endsWith, startsWith: startsWith};
})();

requireSimulator.setName('ImageList');
define(["PatternParser","Util","WebSite"], function (PP,Util,WebSite) {
    var cache={};
    function excludeEmpty(resImgs) {
        var r=[];
        resImgs.forEach(function (resImg,i) {
            if (!resImg || resImg.url=="") return;
            r.push(resImg);
        });
        return r;
    }
    var IL;
    IL=function (resImgs, onLoad,options) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
	    if (!options) options={};
        resImgs=excludeEmpty(resImgs);
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loading", resImg,i);
            var url=resImg.url;
            var urlKey=url;
            if (cache[urlKey]) {
            	proc.apply(cache[urlKey],[]);
            	return;
            }
            url=IL.convURL(url,options.baseDir);
            //if (!Util.startsWith(url,"data:")) url+="?" + new Date().getTime();
            var im=$("<img>");
            im.load(function () {
            	cache[urlKey]=this;
            	proc.apply(this,[]);
            });
            im.attr("src",url);
            function proc() {
                var pw,ph;
                if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
                    var x=0, y=0, w=this.width, h=this.height;
                    var r=[];
                    while (true) {
                        var rw=pw,rh=ph;
                        if (x+pw>w) rw=w-x;
                        if (y+ph>h) rh=h-y;
                        r.push({image:this, x:x,y:y, width:rw, height:rh});
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
            }
        });
    };
    IL.load=IL;
    IL.parse1=function (resImg, imgDOM, options) {
        var pw,ph;
        var res;
        if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
            var x=0, y=0, w=imgDOM.width, h=imgDOM.height;
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
            res=r;
        } else {
            var p=new PP(imgDOM,options);
            res=p.parse();
        }
        res.name=resImg.name;
        return res;
    };
	IL.convURL=function (url, baseDir) {
	    if (url==null) url="";
	    url=url.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (t,name) {
	        return WebSite[name];
	    });
        if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
	    if (Util.startsWith(url,"ls:")) {
	        var rel=url.substring("ls:".length);
	        if (!baseDir) throw new Error("Basedir not specified");
	        var f=baseDir.rel(rel);
	        if (!f.exists()) throw "ImageList file not found: "+f;
	        url=f.text();
	    }
	    return url;
	};
	window.ImageList=IL;
    return IL;
});
requireSimulator.setName('StackTrace');
define([],function (){
    var trc={};
    var pat=/_trc_func_([0-9]+)_.*[^0-9]([0-9]+):([0-9]+)[\s\)]*\r?$/;
    trc.isAvailable=function () {
        var scr=
            "({\n"+
            "    main :function _trc_func_17000000_0() {\n"+
            "      var a=(this.t.x);\n"+
            "    }\n"+
            "}).main();\n";
        var s;
        try {
            eval(scr);
        } catch (e) {
            s=e.stack;
            if (typeof s!="string") return false;
            var lines=s.split(/\n/);
            for (var i=0 ; i<lines.length; i++) {
                var p=pat.exec(lines[i]);
                if (p) return true;
            }
        }
        return false;
    };
    trc.get=function (e,ttb) {
        var s=e.stack;
        if (typeof s!="string") return false;
        var lines=s.split(/\n/);
        var res=[];
        for (var i=0 ; i<lines.length; i++) {
            var p=pat.exec(lines[i]);
            if (!p) continue;
            var id=p[1];
            var row=p[2];
            var col=p[3];
            var tri=ttb.decode(id);
            if (tri && tri.klass) {
                var str=tri.klass.src.js;
                var slines=str.split(/\n/);
                var sid=null;
                for (var j=0 ; j<slines.length && j+1<row ; j++) {
                    var lp=/\$LASTPOS=([0-9]+)/.exec(slines[j]);
                    if (lp) sid=parseInt(lp[1]);
                }
                //console.log("slines,row,sid",slines,row,sid);
                if (sid) {
                    var stri=ttb.decode(sid);
                    if (stri) res.push(stri);
                }
            }
        }
        /*$lastStackTrace=res;
        $showLastStackTrace=function () {
            console.log("StackTrace.get",res);
            //console.log("StackTrace.get",lines,res);
        };*/
        return res;
    };
    return trc;
});
requireSimulator.setName('typeCheck');
if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["Visitor"],function (Visitor) {
TypeCheck=function () {
    var ex={"[SUBELEMENTS]":1,pos:1,len:1};


    function lit(s) {
        return "'"+s+"'";
    }
    function str(o) {
        if (!o || typeof o=="number" || typeof o=="boolean") return o;
        if (typeof o=="string") return lit(o);
        if (o.DESC) return str(o.DESC);
        var keys=[];
        for (var i in o) {
            if (ex[i]) continue;
            keys.push(i);
        }
        keys=keys.sort();
        var buf="{";
        var com="";
        keys.forEach(function (key) {
            buf+=com+key+":"+str(o[key]);
            com=",";
        });
        buf+="}";
        return buf;
    }
};
return TypeCheck;
});
requireSimulator.setName('Auth');
define(["WebSite"],function (WebSite) {
    var auth={};
    auth.currentUser=function (onend) {
        $.ajax({type:"get",url:WebSite.serverTop+"/currentUser",data:{withCsrfToken:true},
            success:function (res) {
                console.log("auth.currentUser",res);
                res=JSON.parse(res);
                var u=res.user;
                if (u=="null") u=null;
                console.log("user", u, "csrfToken",res.csrfToken);
                onend(u,res.csrfToken);
            }
        });
    };
    auth.assertLogin=function (options) {
        /*if (typeof options=="function") options={complete:options};
        if (!options.confirm) options.confirm="この操作を行なうためにはログインが必要です．ログインしますか？";
        if (typeof options.confirm=="string") {
            var mesg=options.confirm;
            options.confirm=function () {
                return confirm(mesg);
            };
        }*/
        auth.currentUser(function (user,csrfToken) {
            if (user) {
                return options.success(user,csrfToken);
            }
            window.onLoggedIn=options.success;
            options.showLoginLink(WebSite.serverTop+"/login");
        });
    };
    window.Auth=auth;
    return auth;
});
requireSimulator.setName('Blob');
define(["Auth","WebSite","Util"],function (a,WebSite,Util) {
    var Blob={};
    var BLOB_PATH_EXPR="${blobPath}";
    Blob.BLOB_PATH_EXPR=BLOB_PATH_EXPR;
    Blob.upload=function(user, project, file, options) {
        var fd = new FormData(document.getElementById("fileinfo"));
        if (options.error) {
            options.error=function (r) {alert(r);};
        }
        fd.append("theFile", file);
        fd.append("user",user);
        fd.append("project",project);
        fd.append("fileName",file.name);
        $.ajax({
            type : "get",
            url : WebSite.serverTop+"/blobURL",
            success : function(url) {
                $.ajax({
                    url : url,
                    type : "POST",
                    data : fd,
                    processData : false, // jQuery がデータを処理しないよう指定
                    contentType : false, // jQuery が contentType を設定しないよう指定
                    success : function(res) {
                        console.log("Res = " + res);
                        options.success.apply({},arguments);// $("#drag").append(res);
                    },
                    error: options.error
                });
            }
        });
    };
    Blob.isBlobURL=function (url) {
        if (Util.startsWith(url,BLOB_PATH_EXPR)) {
            var a=url.split("/");
            return {user:a[1], project:a[2], fileName:a[3]};
        }
    };
    // actualURL;
    Blob.url=function(user,project,fileName) {
        return WebSite.blobPath+user+"/"+project+"/"+fileName;
    };
    Blob.uploadToExe=function (prj, options) {
        var bis=prj.getBlobInfos();
        var cnt=bis.length;
        console.log("uploadBlobToExe cnt=",cnt);
        if (cnt==0) return options.success();
        if (!options.progress) options.progress=function (cnt) {
            console.log("uploadBlobToExe cnt=",cnt);
        };
        bis.forEach(function (bi) {
            var data={csrfToken:options.csrfToken};
            for (var i in bi) data[i]=bi[i];
            $.ajax({
                type:"get",
                url: WebSite.serverTop+"/uploadBlobToExe",
                data:data,
                success: function () {
                     cnt--;
                     if (cnt==0) return options.success();
                     else options.progress(cnt);
                },
                error:options.error
             });
        });
    };
    return Blob;
});
requireSimulator.setName('ImageRect');
define([],function () {
    function draw(img, canvas) {
        if (typeof img=="string") {
            var i=new Image();
            var res=null;
            var callback=null;
            var onld=function (clb) {
                if (clb) callback=clb;
                if (callback && res) {
                    callback(res);
                }
            };
            i.onload=function () {
                res=draw(i,canvas);
                onld();
            };
            i.src=img;
            return onld;
        }
        var cw=canvas.width;
        var ch=canvas.height;
        var cctx=canvas.getContext("2d");
        var width=img.width;
        var height=img.height;
        var calcw=ch/height*width; // calch=ch
        var calch=cw/width*height; // calcw=cw
        if (calch>ch) calch=ch;
        if (calcw>cw) calcw=cw;
        cctx.clearRect(0,0,cw,ch);
        var marginw=Math.floor((cw-calcw)/2);
        var marginh=Math.floor((ch-calch)/2);
        cctx.drawImage(img,
                0,0,width, height,
                marginw,marginh,calcw, calch );
        return {left: marginw, top:marginh, width:calcw, height:calch,src:img};
    }
    return draw;
});
requireSimulator.setName('thumbnail');
define(["ImageRect"],function (IR) {
    var TN={};
    var createThumbnail;
    var NAME="$icon_thumbnail";
    TN.set=function (prj,delay) {
        setTimeout(function () { crt(prj);} ,delay);
    };
    TN.get=function (prj) {
        var f=TN.file(prj);
        if (!f.exists()) return null;
        return f.text();
    };
    TN.file=function (prj) {
        var prjdir=prj.getDir();
        var imfile= prjdir.rel("images/").rel("icon_thumbnail.png");
        //console.log("Thumb file=",imfile.path(),imfile.exists());
        return imfile;
    };
    function crt(prj) {
        try {
            var img=Tonyu.globals.$Screen.buf[0];
            var cv=$("<canvas>").attr({width:100,height:100});
            IR(img, cv[0]);
            var url=cv[0].toDataURL();
            //window.open(url);
            var rsrc=prj.getResource();
            var prjdir=prj.getDir();
            var imfile=TN.file(prj);
            imfile.text(url);
            var item={
                name:NAME,
                pwidth:100,pheight:100,url:"ls:"+imfile.relPath(prjdir)
            };
            var imgs=rsrc.images;
            var add=false;
            for (var i=0 ; i<imgs.length ; i++) {
                if (imgs[i].name==NAME) {
                    imgs[i]=item;
                    add=true;
                }
            }
            if (!add) imgs.push(item);

            prj.setResource(rsrc);
            console.log("setRSRC",rsrc);
        } catch (e) {
            console.log("Create thumbnail failed",e);
        }
    };
    return TN;
});
requireSimulator.setName('plugins');
define(["WebSite"],function (WebSite){
    var plugins={};
    var installed= {
        box2d:{src: "Box2dWeb-2.1.a.3.min.js",detection:/T2Body/,symbol:"Box2D" },
        timbre: {src:"timbre.js",detection:/\bplay(SE)?\b/,symbol:"T" }
    };
    plugins.detectNeeded=function (src,res) {
        for (var name in installed) {
            var r=installed[name].detection.exec(src);
            if (r) res[name]=1;
        }
        return res;
    };
    plugins.loaded=function (name) {
        var i=installed[name];
        if (!i) throw new Error("plugin not found: "+name);
        return window[i.symbol];
    };
    plugins.loadAll=function (names,options) {
        options=convOpt(options);
        var namea=[];
        for (var name in names) {
            if (installed[name] && !plugins.loaded(name)) {
                namea.push(name);
            }
        }
        var i=0;
        console.log("loading plugins",namea);
        loadNext();
        function loadNext() {
            if (i>=namea.length) options.onload();
            else plugins.load(namea[i++],loadNext);
        }
    };
    function convOpt(options) {
        if (typeof options=="function") options={onload:options};
        if (!options) options={};
        if (!options.onload) options.onload=function (){};
        return options;
    }
    plugins.load=function (name,options) {
        var i=installed[name];
        if (!i) throw new Error("plugin not found: "+name);
        options=convOpt(options);
        var src=WebSite.pluginTop+"/"+i.src;
        $.getScript(src, options.onload);
    };
    plugins.request=function (name) {
        if (plugins.loaded(name)) return;
        var req=new Error("Plugin "+name+" required");
        req.pluginName=name;
    };
    return plugins;
});
requireSimulator.setName('Tonyu.Project');
define(["Tonyu", "ProjectCompiler", "TError", "FS", "Tonyu.TraceTbl","ImageList","StackTrace",
        "typeCheck","Blob","thumbnail","WebSite","plugins", "Tonyu.Compiler.Semantics", "Tonyu.Compiler.JSGenerator"],
        function (Tonyu, ProjectCompiler, TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                tc,Blob,thumbnail,WebSite,plugins, Semantics, JSGenerator) {
return Tonyu.Project=function (dir, kernelDir) {
    var TPR=ProjectCompiler(dir);
    var kernelProject=ProjectCompiler(kernelDir);
    var _super=Tonyu.extend({},TPR);
    var home=FS.get(WebSite.tonyuHome);
    if (!kernelDir) kernelDir=home.rel("Kernel/");
    var traceTbl=Tonyu.TraceTbl();
    var env={classes:{}, traceTbl:traceTbl, options:{compiler:{}} };
    TPR.EXT=".tonyu";
    TPR.NSP_KER="kernel";
    TPR.NSP_USR="user";
    function orderByInheritance(classes) {/*ENVC*/
        var added={};
        var res=[];
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
                var spc=c.superClass;
                var deps=[spc];
                var ready=true;
                if (c.includes) deps=deps.concat(c.includes);
                deps.forEach(function (cl) {
                    ready=ready && (!cl || cl.builtin || added[cl.fullName]);//CFN cl.name -> cl.fullName
                });
                if (ready) {
                    res.push(c);
                    added[n]=true;
                }
            }
            if (res.length==p) throw TError( "クラスの循環参照があります", "不明" ,0);
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
        var cur=TPR.runningThread; // Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=TPR.runningObj;
        if (main && main.stop) main.stop();
    };
    TPR.rawRun=function (mainClassName) {
        TPR.loadClasses();
        //TPR.compile();
        if (!TPR.runScriptMode) thumbnail.set(TPR, 2000);
        TPR.rawBoot(mainClassName);
    };
    /*TPR.compile=function () {
        console.log("Kernel editable",TPR.isKernelEditable());
    	if (TPR.isKernelEditable()) {
    		//  BaseActor  <-  Actor            <- MyActor
    		//   ^ in user     ^ only in kernel   ^ in user
    		//    => Actor does not inherit BaseActor in user but BaseActor in kernel
    		TPR.compileDir(TPR.NSP_KER,[dir, kernelDir]);
    	} else {
            if (!env.kernelClasses) TPR.compileKernel();
            TPR.compileUser();
    	}
    };
    TPR.compileKernel=function () {
    	TPR.compileDir(TPR.NSP_KER, [kernelDir]);
    	env.kernelClasses=env.classes;
    };
    TPR.compileUser=function () {
    	TPR.compileDir(TPR.NSP_USR, [dir],env.kernelClasses);
    };
    TPR.compileDir=function (nsp ,dirs, baseClasses) {
        TPR.getOptions();
        Tonyu.runMode=false;
        env.classes=Tonyu.extend({}, baseClasses || {});
        env.aliases={};
        for (var n in env.classes) {
            var cl=env.classes[n];
            env.aliases[ cl.shortName] = cl.fullName;
        }
        var skip=Tonyu.extend({}, baseClasses || {});
        Tonyu.currentProject=TPR;
        Tonyu.globals.$currentProject=TPR;
        //if (TPR.isKernelEditable()) kernelDir.each(collect);
        //cdir.each(collect);
        for (var i=dirs.length-1; i>=0 ; i--) {
            dirs[i].each(collect);
        }
        function collect(f) {
            if (f.endsWith(TPR.EXT)) {
                var nb=f.truncExt(TPR.EXT);
                var fullCn=nsp+"."+nb;
                env.classes[fullCn]={ //CFN nb->fullCn
                        name:nb,
                        fullName: fullCn,
                        shortName: nb,
                        namespace:nsp,
                        src:{
                            tonyu: f
                        }
                };
                env.aliases[nb]=fullCn;
                delete skip[fullCn];//CFN nb->fullCn
            }
        }
        for (var n in env.classes) {
        	if (skip[n]) continue;
            console.log("initClassDecl: "+n);
            //Tonyu.Compiler.initClassDecls(env.classes[n], env);
            Semantics.initClassDecls(env.classes[n], env);
        }
        var ord=orderByInheritance(env.classes);
        ord.forEach(function (c) {
            if (skip[c.fullName]) return;//CFN c.name->c.fullName
            console.log("annotate :"+c.fullName);
            Semantics.annotate(c, env);
        });
        ord.forEach(function (c) {
        	if (skip[c.fullName]) return;//CFN c.name->c.fullName
            console.log("genJS :"+c.fullName);
            //Tonyu.Compiler.genJS(c, env);
            JSGenerator.genJS(c, env);
            try {
                eval(c.src.js);
            } catch(e){
                console.log(c.src.js);
                throw e;
            }
        });
    };*/
    TPR.getResource=function () {
        var resFile=dir.rel("res.json");
        if (resFile.exists()) return resFile.obj();
        return Tonyu.defaultResource;
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
    TPR.getOptions=function () {
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
    TPR.fixOptions=function (opt) {
        if (!opt.compiler) opt.compiler={};
        opt.compiler.commentLastPos=TPR.runScriptMode || StackTrace.isAvailable();
        opt.run.mainClass=TPR.fixClassName(opt.run.mainClass);
        opt.run.bootClass=TPR.fixClassName(opt.run.bootClass);
        if (!opt.plugins) {
            opt.plugins={};
            dir.each(function (f) {
                if (f.endsWith(TPR.EXT)) {
                    plugins.detectNeeded(  f.text(), opt.plugins);
                }
            });
        }
    };
    TPR.requestPlugin=function (name) {
        if (plugins.loaded(name)) return;
        var opt=TPR.getOptions();
        opt.plugins[name]=1;
        TPR.setOptions(opt);
        var req=new Error("必要なプラグイン"+name+"を追加しました。もう一度実行してください");
        req.pluginName=name;
        throw req;
    };
    TPR.loadPlugins=function (onload) {
        var opt=TPR.getOptions();
        plugins.loadAll(opt.plugins,onload);
    };
    TPR.fixClassName=function (cn) {
        if (TPR.classExists(cn)) return cn;
        var cna=cn.split(".");
        var sn=cna.pop();
        var res;
        res=TPR.NSP_USR+"."+sn;
        if (TPR.classExists(res)) return res;
        res=TPR.NSP_KER+"."+sn;
        if (TPR.classExists(res)) return res;
        return cn;
    };
    TPR.classExists=function (fullCn) {
        var cna=fullCn.split(".");
        if (cna.length==1) return false;
        var nsp=cna[0], sn=cna[1] ;
        if (TPR.isKernelEditable()) {
            if (nsp==TPR.NSP_KER) {
                if (dir.rel(sn+TPR.EXT).exists()) return true;
                if (kernelDir.rel(sn+TPR.EXT).exists()) return true;
            }
        } else {
            if (nsp==TPR.NSP_KER) {
                if (kernelDir.rel(sn+TPR.EXT).exists()) return true;
            }
            if (nsp==TPR.NSP_USR) {
                if (dir.rel(sn+TPR.EXT).exists()) return true;
            }
        }
        return false;
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
    TPR.rawBoot=function (mainClassName) {
        //var thg=Tonyu.threadGroup();
        var mainClass=Tonyu.getClass(mainClassName);
        if (!mainClass) throw TError( mainClassName+" というクラスはありません", "不明" ,0);
        // Tonyu.runMode=true;
        var main=new mainClass();
        var th=Tonyu.thread();
        th.apply(main,"main");
        //main.fiber$main(th);

        TPR.runningThread=th; //thg.addObj(main);
        TPR.runningObj=main;
        $LASTPOS=0;
	th.steps();
        //thg.run(0);
    };

    TPR.isKernel=function (className) {
        var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;
    };
    TPR.isKernelEditable=function () {
    	return env.options.kernelEditable;
    };
    TPR.getDir=function () {return dir;};
    TPR.getName=function () { return dir.name().replace(/\/$/,""); };
    TPR.renameClassName=function (o,n) {// o: key of aliases
        TPR.compile();
        var cls=TPR.env.classes;/*ENVC*/
        for (var cln in cls) {/*ENVC*/
            var klass=cls[cln];/*ENVC*/
            var f=klass.src.tonyu;
            var a=klass.annotation;
            var changes=[];
            if (a && f) {
                for (var id in a) {
                    try {
                        var an=a[id];
                        var si=an.scopeInfo;
                        if (si && si.type=="class") {
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
            }
        }
    };
    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});

requireSimulator.setName('Shell');
define(["FS","Util","WebSite"],function (FS,Util,WebSite) {
    var Shell={cwd:FS.get("/")};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir,true);
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
        /*while (Util.startsWith(v,"../")) {
            c=c.up();
            v=v.substring(3);
        }*/
        return c.rel(v);
    }
    Shell.pwd=function () {
        return Shell.cwd+"";
    };
    Shell.ls=function (dir){
    	if (!dir) dir=Shell.cwd;
    	else dir=resolve(dir, true);
        return dir.ls();
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            Shell.echo("cp", from ,to);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        if (f.isDir() && t.isDir()) {
            var sum=0;
            f.recursive(function (src) {
                var rel=src.relPath(f);
                var dst=t.rel(rel);
                if (options.test || options.v) {
                    Shell.echo((dst.exists()?"[ovr]":"[new]")+dst+"<-"+src);
                }
                if (!options.test) {
                    dst.copyFrom(src,options);
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
        if (options.notrash) {
            file=resolve(file, false);
            file.removeWithoutTrash();
            return 1;
        }
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
    Shell.cat=function (file,options) {
        file=resolve(file, true);
        Shell.echo(file.text());
        //else return file.text();
    };
    Shell.resolve=function (file) {
	if (!file) file=".";
	file=resolve(file);
	return file;
    };
    Shell.grep=function (pattern, file, options) {
        file=resolve(file, true);
        if (!options) options={};
        if (!options.res) options.res=[];
        if (file.isDir()) {
            file.each(function (e) {
                Shell.grep(pattern, e, options);
            });
        } else {
            if (typeof pattern=="string") {
                file.lines().forEach(function (line, i) {
                    if (line.indexOf(pattern)>=0) {
                        report(file, i+1, line);
                    }
                });
            }
        }
        return options.res;
        function report(file, lineNo, line) {
            if (options.res) {
                options.res.push({file:file, lineNo:lineNo,line:line});
            }
            Shell.echo(file+"("+lineNo+"): "+line);

        }
    };
    Shell.touch=function (f) {
    	f=resolve(f);
    	f.text(f.exists() ? f.text() : "");
    	return 1;
    };
    Shell.setout=function (ui) {
        Shell.outUI=ui;
    };
    Shell.echo=function () {
        console.log.apply(console,arguments);
        if (Shell.outUI && Shell.outUI.log) Shell.outUI.log.apply(Shell.outUI,arguments);
    };
    Shell.err=function () {
        console.log.apply(console,arguments);
        if (Shell.outUI && Shell.outUI.err) Shell.outUI.err.apply(Shell.outUI,arguments);
    };

    Shell.prompt=function () {};
    Shell.ASYNC={r:"SH_ASYNC"};
    Shell.help=function () {
        for (var k in Shell) {
            var c=Shell[k];
            if (typeof c=="function") {
                Shell.echo(k+(c.description?" - "+c.description:""));
            }
        }
    };
    sh=Shell;
    if (WebSite.isNW) {
        sh.devtool=function () { require('nw.gui').Window.get().showDevTools();}
    }
    return Shell;
});

requireSimulator.setName('KeyEventChecker');
define([],function () {
	var KEC={};
	KEC.down=function (elem, name, handler) {
		if (!(elem instanceof $)) elem=$(elem);
		elem.bind("keydown", function (e) {
			if (KEC.is(e, name)) {
				return handler.call(elem[0],e);
			}
		});
	};
	KEC.is=function (e,name) {
		name=name.toLowerCase();
		e = e.originalEvent || e;
		var s="";
		if (e.altKey) {
			s+="alt+";
		}
		if (e.ctrlKey) {
			s+="ctrl+";
		}
		if (e.shiftKey) {
			s+="shift+";
		}
		if (e.keyCode>=112 && e.keyCode<=123) {
			s+="f"+(e.keyCode-111);
		} else {
			s+=String.fromCharCode(e.keyCode);
		}
		s=s.toLowerCase();
		//console.log(s);
		return name==s;
	};
	return KEC;
});
requireSimulator.setName('ScriptTagFS');
define([],function () {
	var STF={};
	STF.toObj=function () {
	    var scrs=$("script");
	    var res={};
	    scrs.each(function (){
	        var s=this;
	        if (s.type=="text/tonyu") {
	            var fn=$(s).data("filename");
	            if (fn) {
	                var l=parseInt($(s).data("lastupdate"));
	                var w=$(s).data("wrap");
	                if (w) {
	                    w=parseInt(w);
	                    res[fn]={lastUpdate:l, text:unwrap(s.innerHTML, w)};
	                } else {
	                    res[fn]={lastUpdate:l, text:s.innerHTML};
	                }
	            }
	        }
	    });
	    return res;
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
	};
	return STF;
});
requireSimulator.setName('runtime');
requirejs(["ImageList"/*,"TextRect","fukidashi"*/], function () {

});
requireSimulator.setName('runScript');
requirejs(["FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS","runtime","WebSite"],
        function (FS,  Tonyu_Project, sh,      KeyEventChecker, ScriptTagFS,   rt,WebSite) {
    $(function () {
        var home=FS.get(WebSite.tonyuHome);
        Tonyu.defaultResource={
                images:[
                        {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
                        {name:"$pat_sample", url: "images/Sample.png"},
                        {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
                        ],
                        sounds:[]
        };
        SplashScreen={hide: function () {
            $("#splash").hide();
        },show:function(){}};
        var w=$(window).width();
        var h=$(window).height();
        $("body").css({overflow:"hidden", margin:"0px"});
        var cv=$("<canvas>").attr({width: w, height:h}).appendTo("body");
        $(window).resize(onResize);
        function onResize() {
            w=$(window).width();
            h=$(window).height();
            cv.attr({width: w, height: h});
        }
        var locs=location.href.replace(/\?.*/,"").split(/\//);
        var loc=locs.pop();
        if (loc.length<0) locs="runscript";
        var curProjectDir=home.rel(loc+"/");
        //if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
        var fo=ScriptTagFS.toObj();
        for (var fn in fo) {
            var f=curProjectDir.rel(fn);
            if (!f.isDir()) {
                f.useRAMDisk();
                var m=fo[fn];
                f.text(m.text);
                delete m.text;
                if (m.lastUpdate) f.metaInfo(m);
            }
        }
        sh.cd(curProjectDir);
        var main="Main";
        var scrs=$("script");
        scrs.each(function (){
            var s=this;
            if (s.type=="text/tonyu") {
                var fn=$(s).data("filename");
                if (fn) {
                    var f=curProjectDir.rel(fn);
                    if ($(s).data("main")) {
                        main=f.truncExt(".tonyu");
                    }
                }
            }
        });
        Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                run: {mainClass: main, bootClass: "Boot"},
                kernelEditable: false
        };
        var kernelDir=home.rel("Kernel/");
        var curPrj=Tonyu_Project(curProjectDir, kernelDir);
        Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
        var o=curPrj.getOptions();
        if (o.compiler && o.compiler.diagnose) {
            o.compiler.diagnose=false;
            curPrj.setOptions(o);
        }
        curPrj.runScriptMode=true;
        curPrj.rawRun(o.run.bootClass);
    });
});

requireSimulator.setName();
