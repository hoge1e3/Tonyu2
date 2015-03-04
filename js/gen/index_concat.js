// Created at Wed Mar 04 2015 17:42:51 GMT+0900 (東京 (標準時))
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
            },top:"",devMode:devMode
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
                if (ramDiskUsage=="ALL") return
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
      '': '{".desktop":{"lastUpdate":1424849946377},"Actor.tonyu":{"lastUpdate":1425004177938},"BaseActor.tonyu":{"lastUpdate":1425018531557},"BodyActor.tonyu":{"lastUpdate":1425265847796},"Boot.tonyu":{"lastUpdate":1425019818961},"DxChar.tonyu":{"lastUpdate":1421384204610},"EventMod.tonyu":{"lastUpdate":1425010352383},"InputDevice.tonyu":{"lastUpdate":1416890086000},"Keys.tonyu":{"lastUpdate":1412697666000},"Map.tonyu":{"lastUpdate":1421122943495},"MapEditor.tonyu":{"lastUpdate":1421122943503},"MathMod.tonyu":{"lastUpdate":1424849946395},"MediaPlayer.tonyu":{"lastUpdate":1421384204625},"MML.tonyu":{"lastUpdate":1424849946399},"NoviceActor.tonyu":{"lastUpdate":1412697666000},"Pad.tonyu":{"lastUpdate":1421122943510},"Panel.tonyu":{"lastUpdate":1424849946404},"PlainChar.tonyu":{"lastUpdate":1421384204651},"PlayMod.tonyu":{"lastUpdate":1425018365373},"ScaledCanvas.tonyu":{"lastUpdate":1421122943524},"SecretChar.tonyu":{"lastUpdate":1421384204695},"SpriteChar.tonyu":{"lastUpdate":1421384204710},"Sprites.tonyu":{"lastUpdate":1421122943538},"T1Line.tonyu":{"lastUpdate":1421384204718},"T1Map.tonyu":{"lastUpdate":1421384204728},"T1Page.tonyu":{"lastUpdate":1421384204737},"T1Text.tonyu":{"lastUpdate":1421384204745},"T2Body.tonyu":{"lastUpdate":1425264703379},"T2Mod.tonyu":{"lastUpdate":1425020004839},"T2World.tonyu":{"lastUpdate":1425266002500},"TextChar.tonyu":{"lastUpdate":1421384204762},"TObject.tonyu":{"lastUpdate":1421122943543},"TQuery.tonyu":{"lastUpdate":1412697666000},"WaveTable.tonyu":{"lastUpdate":1412697666000}}',
      '.desktop': '{"runMenuOrd":["Main0121","Main1023","TouchedTestMain","Main2","MapLoad","Main","AcTestM","NObjTest","NObjTest2","AcTest","AltBoot","Ball","Bar","Bounce","MapTest","MapTest2nd","SetBGCTest","Label","PanelTest","BaseActor","Panel","MathMod"]}',
      'Actor.tonyu': 
        'extends BaseActor;\n'+
        'includes PlayMod;\n'+
        'native Sprites;\n'+
        'native Tonyu;\n'+
        '\n'+
        '\\new(x,y,p) {\n'+
        '    super(x,y,p);\n'+
        '    if (Tonyu.runMode) initSprite();\n'+
        '}\n'+
        '\\initSprite() {\n'+
        '    if(layer && typeof layer.add=="function"){\n'+
        '        layer.add(this);\n'+
        '    }else{\n'+
        '        $Sprites.add(this);\n'+
        '    }\n'+
        '    onAppear();\n'+
        '}\n'+
        '\\onAppear() {\n'+
        '}\n'
      ,
      'BaseActor.tonyu': 
        'extends null;\n'+
        'includes MathMod,EventMod;\n'+
        'native Tonyu;\n'+
        'native Key;\n'+
        'native console;\n'+
        'native Math;\n'+
        'native fukidashi;\n'+
        'native TextRect;\n'+
        'native FS;\n'+
        'native Array;\n'+
        '\n'+
        '\\new(x,y,p) {\n'+
        '    if (Tonyu.runMode) {\n'+
        '        var thg=currentThreadGroup();\n'+
        '        if (thg) _th=thg.addObj(this);\n'+
        '    }\n'+
        '    if (typeof x=="object") Tonyu.extend(this,x); \n'+
        '    else if (typeof x=="number") {\n'+
        '        this.x=x;\n'+
        '        this.y=y;\n'+
        '        this.p=p;\n'+
        '    }\n'+
        '    if (scaleX==null) scaleX=1;\n'+
        '    if (rotation==null) rotation=0;\n'+
        '    if (rotate==null) rotate=0;\n'+
        '    if (alpha==null) alpha=255;\n'+
        '    if (zOrder==null) zOrder=0;\n'+
        '    if (age==null) age=0;\n'+
        '    if (anim!=null && typeof anim=="object"){\n'+
        '        animMode=true;\n'+
        '        animFrame=0;\n'+
        '    }else{\n'+
        '        animMode=false;\n'+
        '    }\n'+
        '    if (animFps==null) animFps=1;\n'+
        '}\n'+
        'nowait \\extend(obj) {\n'+
        '    return Tonyu.extend(this,obj);\n'+
        '}\n'+
        '\n'+
        'nowait \\print(pt) {\n'+
        '    console.log.apply(console,arguments);\n'+
        '    if($consolePanel){\n'+
        '        $consolePanel.scroll(0,20);\n'+
        '        $consolePanel.setFillStyle("white");\n'+
        '        $consolePanel.fillText(pt,0,$consolePrintY,20,"left");\n'+
        '    }\n'+
        '}\n'+
        '\n'+
        'nowait \\setAnimFps(f){\n'+
        '    this.animFps=f;\n'+
        '    this.animFrame=0;\n'+
        '    this.animMode=true;\n'+
        '}\n'+
        'nowait \\startAnim(){\n'+
        '    this.animMode=true;\n'+
        '}\n'+
        'nowait \\stopAnim(){\n'+
        '    this.animMode=false;\n'+
        '}\n'+
        '\\update() {\n'+
        '    onUpdate();\n'+
        '    if(_thread) {\n'+
        '        _thread.suspend();\n'+
        '    }\n'+
        '}\n'+
        'nowait \\onUpdate() {\n'+
        '    \n'+
        '}\n'+
        '\\updateEx(updateT){\n'+
        '    for(var updateCount=0;updateCount<updateT;updateCount++){\n'+
        '        update();\n'+
        '    }\n'+
        '}\n'+
        'nowait \\getkey(k) {\n'+
        '    return $Keys.getkey(k);\n'+
        '}\n'+
        'nowait \\hitTo(t) {\n'+
        '    return crashTo(t);\n'+
        '}\n'+
        'nowait \\all(c) {\n'+
        '    var res=new TQuery;\n'+
        '    $Sprites.sprites.forEach \\(s) {\n'+
        '        if (s===this) return;\n'+
        '        if (!c || s instanceof c) {\n'+
        '            res.push(s);\n'+
        '        }\n'+
        '    };\n'+
        '    return res;// new TQuery{objects:res};\n'+
        '}\n'+
        'nowait \\allCrash(t) {\n'+
        '    var res=new TQuery;\n'+
        '    var sp=this; //_sprite || this;\n'+
        '    var t1=getCrashRect();\n'+
        '    if (!t1) return res;\n'+
        '    $Sprites.sprites.forEach(\\(s) {\n'+
        '        var t2;\n'+
        '        if (s!==this && \n'+
        '        !s.excludeFromAll &&\n'+
        '        s instanceof t && \n'+
        '        (t2=s.getCrashRect()) &&\n'+
        '        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n'+
        '        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n'+
        '            res.push(s);    \n'+
        '        }\n'+
        '    });\n'+
        '    return res;\n'+
        '}\n'+
        'nowait \\crashTo(t) {\n'+
        '    if (!t) return false;\n'+
        '    if (typeof t=="function") {\n'+
        '        return allCrash(t)[0];\n'+
        '    }\n'+
        '    return crashTo1(t);\n'+
        '}\n'+
        'nowait \\crashTo1(t) {\n'+
        '    if (!t || t._isDead) return false;\n'+
        '    /*if (_sprite && t._sprite) {\n'+
        '        return _sprite.crashTo(t._sprite);\n'+
        '    }*/\n'+
        '    var t1=getCrashRect();\n'+
        '    var t2=t.getCrashRect();\n'+
        '    return \n'+
        '    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\n'+
        '    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\n'+
        '    t1 && t2 &&\n'+
        '    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n'+
        '    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n'+
        '}\n'+
        'nowait \\getCrashRect() {\n'+
        '    var actWidth=width*scaleX, actHeight;\n'+
        '    if(typeof scaleY==="undefined"){\n'+
        '        actHeight=height*scaleX;\n'+
        '    }else{\n'+
        '        actHeight=height*scaleY;\n'+
        '    }\n'+
        '    return typeof x=="number" &&\n'+
        '    typeof y=="number" &&\n'+
        '    typeof width=="number" &&\n'+
        '    typeof height=="number" && \n'+
        '    {x,y,width:actWidth,height:actHeight};\n'+
        '}\n'+
        'nowait \\within(t,distance){\n'+
        '    if(!t || t._isDead) return false;\n'+
        '    if(Math.sqrt(Math.abs(x-t.x)*Math.abs(x-t.x)+ Math.abs(y-t.y)*Math.abs(y-t.y))<distance){\n'+
        '        return true;\n'+
        '    }\n'+
        '    return false;\n'+
        '}\n'+
        'nowait \\watchHit(typeA,typeB,onHit) {\n'+
        '    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n'+
        '        onHit.apply(this,[a,b]);\n'+
        '    });\n'+
        '}\n'+
        'nowait \\currentThreadGroup() {\n'+
        '    return $currentThreadGroup; \n'+
        '}\n'+
        'nowait \\die() {\n'+
        '    if (_th) {\n'+
        '        _th.kill();\n'+
        '    }\n'+
        '    hide();\n'+
        '    fireEvent("die");\n'+
        '    _isDead=true;\n'+
        '}\n'+
        'nowait \\hide() {\n'+
        '    /*if (_sprite) {\n'+
        '        $Sprites.remove(_sprite);\n'+
        '        _sprite=null;\n'+
        '    } else {*/\n'+
        '        //$Sprites.remove(this);\n'+
        '    //}\n'+
        '    if(layer && typeof layer.remove=="function"){\n'+
        '        layer.remove(this);\n'+
        '    }else{\n'+
        '        $Sprites.remove(this);\n'+
        '    }\n'+
        '}\n'+
        'nowait \\show(x,y,p) {\n'+
        '    if(layer && typeof layer.add=="function"){\n'+
        '        layer.add(this);\n'+
        '    }else{\n'+
        '        $Sprites.add(this);\n'+
        '    }\n'+
        '    if (x!=null) this.x=x;\n'+
        '    if (y!=null) this.y=y;\n'+
        '    if (p!=null) this.p=p;\n'+
        '}\n'+
        '\n'+
        'nowait \\detectShape() {\n'+
        '    if (typeof p!="number") {\n'+
        '        if (text!=null) return;\n'+
        '        p=0;\n'+
        '    }\n'+
        '    p=Math.floor(p);\n'+
        '    pImg=$Sprites.getImageList()[p];\n'+
        '    if (!pImg) return;\n'+
        '    width=pImg.width;\n'+
        '    height=pImg.height;\n'+
        '}\n'+
        '\\waitFor(f) {\n'+
        '    ifwait {\n'+
        '        _thread.waitFor(f);\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        'nowait \\isDead() {\n'+
        '    return _isDead;\n'+
        '}\n'+
        '\n'+
        'nowait \\animation(){\n'+
        '    age++;\n'+
        '    if(animMode && age%animFps==0){\n'+
        '        p=anim[animFrame%anim.length];\n'+
        '        animFrame++;\n'+
        '    }\n'+
        '}\n'+
        'nowait \\draw(ctx) {\n'+
        '    if (x==null || y==null || _isInvisible) return;\n'+
        '    detectShape();\n'+
        '    if (pImg) {\n'+
        '        ctx.save();\n'+
        '        ctx.translate(x,y);\n'+
        '        //if (typeof rotate=="number" ) rotation=rotate;// 削除予定\n'+
        '        //ctx.rotate(this.rotation/180*Math.PI);\n'+
        '        animation();\n'+
        '        if(this.rotation!=0){\n'+
        '            ctx.rotate(this.rotation/180*Math.PI);\n'+
        '        }else{\n'+
        '            ctx.rotate(this.rotate/180*Math.PI);\n'+
        '        }\n'+
        '        if(typeof this.scaleY==="undefined") {\n'+
        '            ctx.scale(this.scaleX,this.scaleX);\n'+
        '        }else{\n'+
        '            ctx.scale(this.scaleX,this.scaleY);\n'+
        '        }\n'+
        '        ctx.globalAlpha=this.alpha/255;\n'+
        '        ctx.drawImage(\n'+
        '        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n'+
        '        -width/2, -height/2, width, height);\n'+
        '        ctx.restore();\n'+
        '    } else if (text!==null && text!==undefined) {\n'+
        '        if (!size) size=15;\n'+
        '        if (!align) align="center";\n'+
        '        if (!fillStyle) fillStyle="white";\n'+
        '        ctx.fillStyle=fillStyle;\n'+
        '        ctx.globalAlpha=this.alpha/255;\n'+
        '        var rect=TextRect.draw(ctx, text, x, y, size, align , "fill");\n'+
        '        width=rect.w;\n'+
        '        height=rect.h;\n'+
        '    }\n'+
        '    if (_fukidashi) {\n'+
        '        if (_fukidashi.c>0) {\n'+
        '            _fukidashi.c--;\n'+
        '            ctx.fillStyle="white";\n'+
        '            ctx.strokeStyle="black";\n'+
        '            fukidashi ( ctx , _fukidashi.text, \n'+
        '            x, y-height/2-10, _fukidashi.size);\n'+
        '        }\n'+
        '    }\n'+
        '}\n'+
        'nowait \\asyncResult() {\n'+
        '    return Tonyu.asyncResult();\n'+
        '}\n'+
        '\n'+
        '\\screenOut(a) {\n'+
        '    //オブジェクトが画面外に出たかどうかを判定します。\n'+
        '    if (!a) a=0;\n'+
        '    var r=0;\n'+
        '    var viewX=0,viewY=0;\n'+
        '    if (x<viewX+a)               r+=viewX+a-x;\n'+
        '    if (y<viewY+a)               r+=viewY+a-y;\n'+
        '    if (x>$screenWidth +viewX-a) r+=x-($screenWidth +viewX-a);\n'+
        '    if (y>$screenHeight+viewY-a) r+=y-($screenHeight+viewY-a);\n'+
        '    return r;\n'+
        '}\n'+
        '\\file(path) {\n'+
        '    var d=Tonyu.currentProject.getDir();\n'+
        '    var files=d.rel("files/");\n'+
        '    return FS.get(files.rel(path)) {topDir:d};\n'+
        '}\n'+
        '\\waitInputDevice(fl) {\n'+
        '    if (fl!==false) {\n'+
        '        if (!origTG) {\n'+
        '            ifwait {\n'+
        '                origTG=_thread.group;\n'+
        '                _thread.setGroup(null);\n'+
        '            }\n'+
        '        }\n'+
        '        a=asyncResult();\n'+
        '        $InputDevice.addOnetimeListener(a.receiver);\n'+
        '        waitFor(a);\n'+
        '    } else {\n'+
        '        if (origTG) {\n'+
        '            ifwait {\n'+
        '                _thread.setGroup(origTG);\n'+
        '                origTG=null;\n'+
        '            }\n'+
        '        }\n'+
        '    }\n'+
        '}\n'+
        '\\redrawScreen() {\n'+
        '    $Sprites.draw($Screen.buf[0]);\n'+
        '    $Screen.draw();\n'+
        '}\n'+
        '\n'+
        '// from PlainChar\n'+
        '\\color(r,g,b) {\n'+
        '    return "rgb("+[r,g,b].join(",")+")";\n'+
        '}\n'+
        '\\drawText(x,y,text,col,size) {\n'+
        '    if ($debug) return;\n'+
        '    if (!size) size=15;\n'+
        '    if (!col) col="cyan";\n'+
        '    var tp=all(T1Text).find \\(t) {return t.hidden;};\n'+
        '    if (tp.length>0) {\n'+
        '        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n'+
        '    }else {\n'+
        '        new T1Text{x,y,text,fillStyle:col, size};  \n'+
        '    }\n'+
        '}\n'+
        '\\drawLine(x,y,tx,ty,col) {\n'+
        '    if (!col) col="white";\n'+
        '    var tp=all(T1Line).find \\(t) {return t.hidden;};\n'+
        '    if (tp.length>0) {\n'+
        '        tp[0].extend{x,y,tx,ty,col};\n'+
        '    }else {\n'+
        '        new T1Line{x,y,tx,ty,col};  \n'+
        '    }\n'+
        '}\n'+
        '\\loadPage(page,arg){\n'+
        '    all().die();\n'+
        '    new page(arg);\n'+
        '    die();\n'+
        '}\n'+
        '\n'+
        '\\setVisible(v) {\n'+
        '    _isInvisible=!v;\n'+
        '}'
      ,
      'BodyActor.tonyu': 
        'includes T2Mod;\n'+
        'native Box2D;\n'+
        '\n'+
        '\\getWorld() {\n'+
        '    if ($t2World) return $t2World;\n'+
        '    $t2World=new T2World;\n'+
        '    return $t2World;\n'+
        '}\n'+
        '\\onAppear() {\n'+
        '    world=getWorld().world;\n'+
        '    scale=getWorld().scale;\n'+
        '    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n'+
        '    var b2BodyDef = Box2D.Dynamics.b2BodyDef;\n'+
        '    var b2Body = Box2D.Dynamics.b2Body;\n'+
        '    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n'+
        '    var b2Fixture = Box2D.Dynamics.b2Fixture;\n'+
        '    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n'+
        '    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n'+
        '    \n'+
        '    var fixDef = new b2FixtureDef;\n'+
        '    fixDef.density = density || 1.0;\n'+
        '    fixDef.friction = friction || 0.5;\n'+
        '    fixDef.restitution = restitution || 0.2;\n'+
        '    \n'+
        '    var bodyDef = new b2BodyDef;\n'+
        '    bodyDef.type = isStatic ? b2Body.b2_staticBody :\n'+
        '    b2Body.b2_dynamicBody;\n'+
        '    \n'+
        '    bodyDef.position.x = x /scale;\n'+
        '    bodyDef.position.y = y /scale;\n'+
        '    shape=shape || (radius ? "circle" : "box");\n'+
        '    var w=width,h=height;\n'+
        '    if (!w) {\n'+
        '        detectShape();\n'+
        '        w=width*(scaleX||1);\n'+
        '        h=height*(scaleY||scaleX||1);\n'+
        '    }\n'+
        '    if (shape=="box") {\n'+
        '        if (!h) h=w;\n'+
        '        fixDef.shape = new b2PolygonShape;\n'+
        '        fixDef.shape.SetAsOrientedBox(w/2/scale, h/2/scale,\n'+
        '        new b2Vec2(0,0),0);\n'+
        '    } else {\n'+
        '        radius=radius || w/2 || 16;\n'+
        '        fixDef.shape = new b2CircleShape(\n'+
        '        radius/scale\n'+
        '        );\n'+
        '        width=height=radius*2;\n'+
        '    } \n'+
        '    body=world.CreateBody(bodyDef);\n'+
        '    body.CreateFixture(fixDef);\n'+
        '    body.SetUserData(this);\n'+
        '    body.SetAngle(rad(rotation));\n'+
        '}\n'+
        '\\allContact(klass) {\n'+
        '    var res=[];\n'+
        '    for (var c=world.GetContactList();c;c=c.GetNext()) {\n'+
        '        if (c.IsTouching()) {\n'+
        '            var a=c.GetFixtureA().GetBody().GetUserData();\n'+
        '            var b=c.GetFixtureB().GetBody().GetUserData();\n'+
        '            if (a===this) {\n'+
        '                if (!klass || b===klass || b instanceof klass) {\n'+
        '                    res.push(b);\n'+
        '                }\n'+
        '            } else if (b===this) {\n'+
        '                if (!klass || a===klass || a instanceof klass) {\n'+
        '                    res.push(a);\n'+
        '                }\n'+
        '            }\n'+
        '        }\n'+
        '    }\n'+
        '    return res;\n'+
        '}\n'+
        '\\applyForce(fx,fy,px,py) {\n'+
        '    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n'+
        '    var scale=getWorld().scale;\n'+
        '    var fps=60;\n'+
        '    body.ApplyForce(new b2Vec2(fx ,fy),body.GetPosition());\n'+
        '}\n'+
        '\\applyImpulse(fx,fy,px,py) {\n'+
        '    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n'+
        '    var scale=getWorld().scale;\n'+
        '    var fps=60;\n'+
        '    body.ApplyImpulse(new b2Vec2(fx ,fy),body.GetPosition());\n'+
        '}\n'+
        '\n'+
        '\\applyTorque(a) {\n'+
        '    body.ApplyTorque(a);\n'+
        '}\n'+
        '\\moveBy(dx,dy) {\n'+
        '    var pos=body.GetPosition();\n'+
        '    pos.x+=dx/scale;\n'+
        '    pos.y+=dy/scale;\n'+
        '    body.SetPosition(pos);\n'+
        '}\n'+
        '\\contactTo(t) {\n'+
        '    return allContact(t)[0];\n'+
        '}\n'+
        '\\die() {\n'+
        '    super.die();\n'+
        '    world.DestroyBody(body);\n'+
        '}\n'+
        '\\updatePos() {\n'+
        '    if (!body) return;\n'+
        '    var scale=getWorld().scale;\n'+
        '    var pos=body.GetPosition();\n'+
        '    x=pos.x*scale;\n'+
        '    y=pos.y*scale;\n'+
        '    rotation=deg(body.GetAngle());\n'+
        '}\n'+
        '\n'
      ,
      'Boot.tonyu': 
        'extends Actor;\n'+
        'native $;\n'+
        'native TError;\n'+
        'native $LASTPOS;\n'+
        'native Key;\n'+
        'native Date;\n'+
        'native ImageList;\n'+
        'native Tonyu;\n'+
        'native SplashScreen;\n'+
        'native Math;\n'+
        '\n'+
        '\\initSprites() {\n'+
        '    $Sprites=new Sprites();\n'+
        '    $FrontSprites=new Sprites();\n'+
        '    print ("Loading plugins..");\n'+
        '    var a=asyncResult();\n'+
        '    $currentProject.loadPlugins(a.receiver);\n'+
        '    waitFor(a);\n'+
        '    print ("Loading pats..");\n'+
        '    var rs=$currentProject.getResource();\n'+
        '    a=asyncResult();\n'+
        '    ImageList.load( rs.images, a.receiver)\n'+
        '    {baseDir:$currentProject.getDir()};\n'+
        '    waitFor(a);\n'+
        '    var r=a[0];\n'+
        '    $Sprites.setImageList(r);\n'+
        '    for (var name,val in r.names) {\n'+
        '        Tonyu.setGlobal(name, val);\n'+
        '    }\n'+
        '    print ("Loading pats done.");\n'+
        '    cvj=$("canvas");\n'+
        '    if (Tonyu.noviceMode) {\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\n'+
        '    } else {\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\n'+
        '    }\n'+
        '}\n'+
        '\n'+
        '\n'+
        '\\initThread() {\n'+
        '    $mainThreadGroup=thg=Tonyu.threadGroup();\n'+
        '    var o=Tonyu.currentProject.getOptions();\n'+
        '    var mainClassName=o.run.mainClass;\n'+
        '    print("MainClass= "+mainClassName);\n'+
        '    mainClass=Tonyu.getClass(mainClassName);\n'+
        '    if (!mainClass) {\n'+
        '        TError( mainClassName+" というクラスはありません", \n'+
        '        "不明" ,0).raise();\n'+
        '    }\n'+
        '    Tonyu.runMode=true;\n'+
        '    $currentThreadGroup=thg;\n'+
        '    new mainClass();\n'+
        '}\n'+
        '\\stop() {\n'+
        '    fireEvent("stop");\n'+
        '}\n'+
        'initSprites();\n'+
        '$InputDevice=new InputDevice;\n'+
        '$InputDevice.initCanvasEvents(cvj);\n'+
        'initThread();\n'+
        '\n'+
        '$pat_fruits=30;\n'+
        '$Keys=new Keys;\n'+
        '$Math=Math;\n'+
        '$consolePanel=new Panel{align:"center",x:465/2,y:465/2,width:465,height:465,zOrder:-10,layer:$FrontSprites};\n'+
        '$consolePrintY=465-15;\n'+
        '$panel=new Panel{align:"center",x:$screenWidth/2,y:$screenHeight/2,width:$screenWidth,height:$screenHeight,zOrder:-1,layer:$FrontSprites};\n'+
        'if (typeof SplashScreen!="undefined") SplashScreen.hide();\n'+
        'initFPSParams();\n'+
        '\n'+
        'while (true) {\n'+
        '    thg.steps();\n'+
        '    $Keys.update();\n'+
        '    $InputDevice.update();\n'+
        '    $screenWidth=$Screen.width;\n'+
        '    $screenHeight=$Screen.height;\n'+
        '    \n'+
        '    doDraw=now()<deadLine;\n'+
        '    if (!doDraw && frameSkipped>=maxFrameSkip) {\n'+
        '        doDraw=true;\n'+
        '        resetDeadLine();\n'+
        '    }\n'+
        '    if (doDraw) { // フレームスキップの時は描画しない\n'+
        '        $Screen.fillCanvas($Screen.buf[0]);\n'+
        '        $Sprites.draw($Screen.buf[0]);\n'+
        '        $FrontSprites.draw($Screen.buf[0]);\n'+
        '        $Screen.draw();\n'+
        '        fps_fpsCnt ++;\n'+
        '        frameSkipped=0;\n'+
        '    } else {\n'+
        '        frameSkipped++;\n'+
        '    }\n'+
        '    $Sprites.checkHit();\n'+
        '    fps_rpsCnt ++;\n'+
        '    measureFps();\n'+
        '    waitFrame(); // FPS制御\n'+
        '    while(paused) {\n'+
        '        waitFor(Tonyu.timeout(1)); \n'+
        '        if (!paused) resetDeadLine();\n'+
        '    }\n'+
        '}\n'+
        '\n'+
        'nowait \\initFPSParams() {\n'+
        '    // フレームレートの設定\n'+
        '    _fps = 30;\n'+
        '    maxframeSkip = 5;\n'+
        '    // フレームレート制御でつかう変数 //\n'+
        '    frameCnt = 0;\n'+
        '    resetDeadLine();\n'+
        '    $Boot = this;\n'+
        '    lastMeasured=now();\n'+
        '    fps_fps=fps_rps=fps_fpsCnt=fps_rpsCnt=0;\n'+
        '}\n'+
        'nowait \\now() {\n'+
        '    return new Date().getTime();\n'+
        '}\n'+
        'nowait \\resetDeadLine() {\n'+
        '    deadLine=now()+1000/_fps;\n'+
        '    frameSkipped = 0;\n'+
        '}\n'+
        '\n'+
        '\\waitFrame() {\n'+
        '    var wt=deadLine-now();\n'+
        '    if (wt<1) {\n'+
        '        if (wt<-1000) resetDeadLine();\n'+
        '        wt=1;\n'+
        '    }\n'+
        '    wt=floor(wt);\n'+
        '    waitFor(Tonyu.timeout(wt));\n'+
        '    deadLine+=1000/_fps;\n'+
        '}\n'+
        '\n'+
        'nowait \\getFrameRate() {\n'+
        '    return _fps;\n'+
        '}\n'+
        '\n'+
        '// Tonyu1の$System.setFrameRate() //\n'+
        'nowait \\setFrameRate(fps, maxFrameSkip) {\n'+
        '    _fps = fps;\n'+
        '    if (typeof maxFrameSkip!="number") maxFrameSkip=5;\n'+
        '    this.maxFrameSkip = maxFrameSkip;\n'+
        '    resetDeadLine();\n'+
        '}\n'+
        '\n'+
        '// FPS（計測したフレームレート）を返す //\n'+
        'nowait \\getMeasuredFps() {\n'+
        '    return fps_fps;\n'+
        '}\n'+
        '\n'+
        '// RPS（計測した実行レート）を返す //\n'+
        'nowait \\getMeasuredRps() {\n'+
        '    return fps_rps;\n'+
        '}\n'+
        '\n'+
        'nowait \\measureFps() {\n'+
        '    if (now()>lastMeasured+1000) {\n'+
        '        fps_fps=fps_fpsCnt;\n'+
        '        fps_rps=fps_rpsCnt;\n'+
        '        fps_fpsCnt=0;\n'+
        '        fps_rpsCnt=0;\n'+
        '        lastMeasured=now();\n'+
        '    }\n'+
        '}\n'+
        '\n'
      ,
      'DxChar.tonyu': 
        'extends SpriteChar;\n'+
        '\n'+
        '\\new (xx,yy,pp,ff,sz,rt,al){\n'+
        '    super(xx,yy,pp,ff);\n'+
        '    scaleX=1;\n'+
        '    if (sz) scaleX=sz;\n'+
        '    angle=0;\n'+
        '    if (rt) angle=rt;\n'+
        '    alpha=255;\n'+
        '    if (al) alpha=al;\n'+
        '}\n'+
        '\\draw(c) {\n'+
        '    rotation=angle;\n'+
        '    super.draw(c);\n'+
        '}\n'
      ,
      'EventMod.tonyu': 
        'extends null;\n'+
        '\n'+
        '\\getEventHandlers(type) {\n'+
        '    if (!_handlers) _handlers={};\n'+
        '    if (!_handlers[type]) _handlers[type]=[];\n'+
        '    return _handlers[type];\n'+
        '}\n'+
        '\\on(type, handler) {\n'+
        '    getEventHandlers(type).push(handler);\n'+
        '}\n'+
        '\n'+
        '\\fireEvent(type,args) {\n'+
        '    if (!args) args=[];\n'+
        '    for (var h in getEventHandlers(type)) {\n'+
        '        h.apply(this,args);\n'+
        '    }\n'+
        '}\n'
      ,
      'InputDevice.tonyu': 
        'extends null;\n'+
        'native $;\n'+
        'native window;\n'+
        'native Tonyu;\n'+
        '\\new() {\n'+
        '    listeners=[];\n'+
        '    touchEmu=true;\n'+
        '}\n'+
        '\\handleListeners() {\n'+
        '    var l=listeners;\n'+
        '    listeners=[];\n'+
        '    while (l.length>0) { (l.shift())(); }\n'+
        '}\n'+
        '\\addOnetimeListener(l){\n'+
        '    listeners.push(l);\n'+
        '}\n'+
        '\\initCanvasEvents(cvj) {\n'+
        '    var cv=cvj[0];\n'+
        '    $handleMouse=\\(e) {\n'+
        '        var p=cvj.offset();\n'+
        '        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\n'+
        '        mp=$Screen.canvas2buf(mp);\n'+
        '        $mouseX=mp.x;\n'+
        '        $mouseY=mp.y;\n'+
        '        if (touchEmu) {\n'+
        '            $touches[0].x=mp.x;\n'+
        '            $touches[0].y=mp.y;\n'+
        '        }\n'+
        '        handleListeners();\n'+
        '    };\n'+
        '    $touches=[{},{},{},{},{}];\n'+
        '    $touches.findById=\\(id) {\n'+
        '        for (var j=0 ; j<$touches.length ; j++) {\n'+
        '            if ($touches[j].identifier==id) {\n'+
        '                return $touches[j];\n'+
        '            }\n'+
        '        }\n'+
        '    };\n'+
        '    $handleTouch=\\(e) {\n'+
        '        touchEmu=false;\n'+
        '        var p=cvj.offset();\n'+
        '        e.preventDefault();\n'+
        '        var ts=e.originalEvent.changedTouches;\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\n'+
        '            var src=ts[i];\n'+
        '            var dst=$touches.findById(src.identifier);\n'+
        '            if (!dst) {\n'+
        '                for (var j=0 ; j<$touches.length ; j++) {\n'+
        '                    if (!$touches[j].touched) {\n'+
        '                        dst=$touches[j];\n'+
        '                        dst.identifier=src.identifier;\n'+
        '                        break;\n'+
        '                    }\n'+
        '                }\n'+
        '            }\n'+
        '            if (dst) {\n'+
        '                mp={x:src.pageX-p.left, y:src.pageY-p.top};\n'+
        '                mp=$Screen.canvas2buf(mp);\n'+
        '                dst.x=mp.x;\n'+
        '                dst.y=mp.y;\n'+
        '                if(!dst.touched) dst.touched=1;\n'+
        '            }\n'+
        '        }\n'+
        '        $mouseX=$touches[0].x;\n'+
        '        $mouseY=$touches[0].y;\n'+
        '        handleListeners();\n'+
        '    };\n'+
        '    $handleTouchEnd=\\(e) {\n'+
        '        var ts=e.originalEvent.changedTouches;\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\n'+
        '            var src=ts[i];\n'+
        '            var dst=$touches.findById(src.identifier);\n'+
        '            if (dst) {\n'+
        '                dst.touched=0;\n'+
        '                dst.identifier=-1;\n'+
        '            }\n'+
        '        }\n'+
        '        handleListeners();\n'+
        '    };\n'+
        '    var handleMouse=\\(e){$handleMouse(e);};\n'+
        '    var handleTouch=\\(e){$handleTouch(e);};\n'+
        '    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\n'+
        '    var d=$.data(cv,"events");\n'+
        '    if (!d) {\n'+
        '        $.data(cv,"events","true");\n'+
        '        cvj.mousedown(handleMouse);\n'+
        '        cvj.mousemove(handleMouse);\n'+
        '        cvj.on("touchstart",handleTouch);\n'+
        '        cvj.on("touchmove",handleTouch);\n'+
        '        cvj.on("touchend",handleTouchEnd);\n'+
        '    }\n'+
        '}\n'+
        '\n'+
        '\\update() {\n'+
        '    for (var i in $touches) {\n'+
        '        if (i.touched>0) {i.touched++;}\n'+
        '        if (i.touched==-1) i.touched=1;\n'+
        '    }\n'+
        '}'
      ,
      'Keys.tonyu': 
        'extends TObject;\n'+
        'native String;\n'+
        'native $;\n'+
        'native document;\n'+
        '//\\new () {this.main();}\n'+
        'stats={};\n'+
        'codes={\n'+
        '    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\n'+
        '    shift:16, ctrl:17, alt:18, mouseleft: 1\n'+
        '};\n'+
        'for (var i=65 ; i<65+26; i++) {\n'+
        '    codes[String.fromCharCode(i).toLowerCase()]=i;\n'+
        '}\n'+
        'for (var i=48 ; i<58; i++) {\n'+
        '    codes[String.fromCharCode(i)]=i;\n'+
        '}\n'+
        'if (!$.data(document,"key_event")) {\n'+
        '    $.data(document,"key_event",true);\n'+
        '    $(document).keydown \\(e) {$Keys.keydown(e);};\n'+
        '    $(document).keyup \\(e) {$Keys.keyup(e);};\n'+
        '    $(document).mousedown \\(e) {\n'+
        '        if ($InputDevice.touchEmu) {\n'+
        '            $touches[0].touched=1;\n'+
        '        }\n'+
        '        $Keys.keydown{keyCode:1};\n'+
        '    };\n'+
        '    $(document).mouseup \\(e) {\n'+
        '        if ($InputDevice.touchEmu) {\n'+
        '            $touches[0].touched=0;\n'+
        '        }\n'+
        '        $Keys.keyup{keyCode:1};\n'+
        '    };\n'+
        '}\n'+
        'function getkey(code) {\n'+
        '    if (typeof code=="string") {\n'+
        '        code=codes[code.toLowerCase()];\n'+
        '    }\n'+
        '    if (!code) return 0;\n'+
        '    if (stats[code]==-1) return 0;\n'+
        '    if (!stats[code]) stats[code]=0;\n'+
        '    return stats[code];\n'+
        '}\n'+
        'function update() {\n'+
        '    for (var i in stats) {\n'+
        '        if (stats[i]>0) {stats[i]++;}\n'+
        '        if (stats[i]==-1) stats[i]=1;\n'+
        '    }\n'+
        '}\n'+
        '\\keydown(e) {\n'+
        '    var s=stats[e.keyCode];\n'+
        '    if (!s) {\n'+
        '        stats[e.keyCode]=1;\n'+
        '    }\n'+
        '    $InputDevice.handleListeners();\n'+
        '}\n'+
        '\\keyup(e) {\n'+
        '    stats[e.keyCode]=0;\n'+
        '    $InputDevice.handleListeners();\n'+
        '}'
      ,
      'MML.tonyu': 
        'extends TObject;\n'+
        'includes MathMod;\n'+
        'native T;\n'+
        '\n'+
        'mmlBuf=[];\n'+
        '\\play(mmls) {\n'+
        '    mmlBuf.push(mmls);\n'+
        '    if (!isPlaying()) {\n'+
        '        playNext();\n'+
        '    }\n'+
        '}\n'+
        '\\playNext() {\n'+
        '    //print("play!", id(), bufferCount());\n'+
        '    if (cTimeBase==null) cTimeBase=0;\n'+
        '    if (m) {\n'+
        '        cTimeBase+=m.currentTime;\n'+
        '        //print(m.currentTime);\n'+
        '    }\n'+
        '    var mml=mmlBuf.shift();\n'+
        '    if (!mml) {\n'+
        '        m=null;\n'+
        '        cTimeBase=0;\n'+
        '        return;\n'+
        '    }\n'+
        '    mwav=$WaveTable.get(0,0).play();\n'+
        '    m=T("mml", {mml}, mwav);\n'+
        '    m.on("ended", playNext);\n'+
        '    m.start();\n'+
        '    $MMLS[id()]=this;\n'+
        '}\n'+
        '\\id() {\n'+
        '    if (!_id) _id=rnd()+"";\n'+
        '    return _id;\n'+
        '}\n'+
        '\\bufferCount() {\n'+
        '    return mmlBuf.length;\n'+
        '}\n'+
        '\\isPlaying() {\n'+
        '    return m;\n'+
        '}\n'+
        '\\currentTime() {\n'+
        '    if (m) return m.currentTime+cTimeBase;\n'+
        '    return -1;\n'+
        '}\n'+
        '\\stop() {\n'+
        '    if (m) {\n'+
        '        if (mwav) {\n'+
        '            mwav.pause();\n'+
        '            mwav.stop();\n'+
        '        }\n'+
        '        m.pause();\n'+
        '        m.stop();\n'+
        '        m=null;\n'+
        '        mmlBuf=[];\n'+
        '        //print("stop!", id(), bufferCount());\n'+
        '        delete $MMLS[id()];\n'+
        '    }\n'+
        '}\n'
      ,
      'Map.tonyu': 
        'extends Actor;\n'+
        'native Math;\n'+
        'native $;\n'+
        '\\new (param){\n'+
        '    sx=0;\n'+
        '    sy=0;\n'+
        '    super(param);\n'+
        '    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n'+
        '    mapObj=true;\n'+
        '    mapTable = [];\n'+
        '    mapOnTable = [];\n'+
        '    for(var j=0;j<row;j++){\n'+
        '        rows = [];\n'+
        '        for(var i=0;i<col;i++){\n'+
        '            rows.push(-1);\n'+
        '        }\n'+
        '        mapTable.push(rows);\n'+
        '    }\n'+
        '    for(var j=0;j<row;j++){\n'+
        '        rows = [];\n'+
        '        for(var i=0;i<col;i++){\n'+
        '            rows.push(-1);\n'+
        '        }\n'+
        '        mapOnTable.push(rows);\n'+
        '    }\n'+
        '    /*for(var i=0;i<col;i++){\n'+
        '        mapTable[i]=[];\n'+
        '    }*/\n'+
        '    initMap();\n'+
        '}\n'+
        '\\initMap(){\n'+
        '    if(!mapData) return;\n'+
        '    for(var i=0;i<row;i++){\n'+
        '        for(var j=0;j<col;j++){\n'+
        '            set(j,i,mapData[i][j]);\n'+
        '        }\n'+
        '    }\n'+
        '    if(!mapOnData) return;\n'+
        '    for(var i=0;i<row;i++){\n'+
        '        for(var j=0;j<col;j++){\n'+
        '            setOn(j,i,mapOnData[i][j]);\n'+
        '        }\n'+
        '    }\n'+
        '}\n'+
        '\\load(dataFile){\n'+
        '    baseData=file("../maps/").rel(dataFile).obj();\n'+
        '    if(!baseData) baseData=file(dataFile).obj();\n'+
        '    mapTable=baseData[0];\n'+
        '    mapData=mapTable;\n'+
        '    row=mapTable.length;\n'+
        '    col=mapTable[0].length;\n'+
        '    mapOnTable=baseData[1];\n'+
        '    mapOnData=mapOnTable;\n'+
        '    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n'+
        '    initMap();\n'+
        '}\n'+
        '\\set(setCol,setRow,p){\n'+
        '    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n'+
        '    mapTable[setRow][setCol]=p;\n'+
        '    //mapOnTable[setRow][setCol]=-1;\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    p=Math.floor(p);\n'+
        '    pImg=$Sprites.getImageList()[p];\n'+
        '    if (!pImg) {\n'+
        '        ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n'+
        '        return;\n'+
        '    }\n'+
        '    ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n'+
        '    ctx.save();\n'+
        '    ctx.drawImage(\n'+
        '    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n'+
        '    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\setOn(setCol,setRow,p){\n'+
        '    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n'+
        '    set(setCol,setRow,mapTable[setRow][setCol]);\n'+
        '    mapOnTable[setRow][setCol]=p;\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    p=Math.floor(p);\n'+
        '    pImg=$Sprites.getImageList()[p];\n'+
        '    if (!pImg) return;\n'+
        '    ctx.save();\n'+
        '    ctx.drawImage(\n'+
        '    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n'+
        '    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\setOnAt(setX,setY,p){\n'+
        '    setOn(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n'+
        '}\n'+
        '\\setAt(setX,setY,p){\n'+
        '    set(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n'+
        '}\n'+
        '\\get(getCol,getRow){\n'+
        '    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapTable[getRow][getCol];\n'+
        '    return -1;\n'+
        '}\n'+
        '\\getAt(getX,getY){\n'+
        '    return get(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n'+
        '}\n'+
        '\\getOn(getCol,getRow){\n'+
        '    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapOnTable[getRow][getCol];\n'+
        '    return -1;\n'+
        '}\n'+
        '\\getOnAt(getX,getY){\n'+
        '    return getOn(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n'+
        '}\n'+
        '\\scrollTo(scrollX,scrollY){\n'+
        '    sx=-scrollX;\n'+
        '    sy=-scrollY;\n'+
        '}\n'+
        '\\draw(ctx) {\n'+
        '    pImg=buf[0];\n'+
        '    ctx.save();\n'+
        '    ctx.drawImage(\n'+
        '    pImg, 0, 0,col*chipWidth, row*chipHeight,\n'+
        '    sx, sy, col*chipWidth, row*chipHeight);\n'+
        '    ctx.restore();\n'+
        '}\n'
      ,
      'MapEditor.tonyu': 
        'extends Actor;\n'+
        'native prompt;\n'+
        'loadMode=false;\n'+
        'print("Load Data?: Y or N");\n'+
        'while(true){\n'+
        '    if(getkey("y")>0){\n'+
        '        loadMode=true;\n'+
        '        break;\n'+
        '    }\n'+
        '    if(getkey("n")>0){\n'+
        '        loadMode=false;\n'+
        '        break;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        'if(loadMode){\n'+
        '    fileName=prompt("Input json file (*.json)","map.json");\n'+
        '    if(fileName){\n'+
        '        mapDataFile=file("../maps/").rel(fileName);\n'+
        '    }\n'+
        '    if(mapDataFile.obj()){\n'+
        '        baseData=mapDataFile.obj();\n'+
        '    }else{\n'+
        '        mapDataFile=file(fileName);\n'+
        '        if(mapDataFile.obj()){\n'+
        '            baseData=mapDataFile.obj();\n'+
        '        }\n'+
        '    }\n'+
        '    if(baseData==undefined){\n'+
        '        print("Load failed");\n'+
        '        loadMode=false;\n'+
        '    }else if(baseData[0] && baseData[1]){\n'+
        '        mapData=baseData[0];\n'+
        '        mapOnData=baseData[1];\n'+
        '    }\n'+
        '}\n'+
        'update();\n'+
        '//if(mapData){\n'+
        '    /*\n'+
        '    print("Load Data?: Y or N");\n'+
        '    while(true){\n'+
        '        if(getkey("y")==1){\n'+
        '            loadMode=true;\n'+
        '            break;\n'+
        '        }\n'+
        '        if(getkey("n")==1){\n'+
        '            loadMode=false;\n'+
        '            break;\n'+
        '        }\n'+
        '    }*/\n'+
        '//}\n'+
        'if(!loadMode){\n'+
        '    row=prompt("input row");\n'+
        '    update();\n'+
        '    col=prompt("input col");\n'+
        '    panel=new Panel{width:col*32,height:row*32};\n'+
        '    panel.x=panel.width/2+10;\n'+
        '    panel.y=panel.height/2;\n'+
        '    panel.setFillStyle("cyan");\n'+
        '    panel.fillRect(0,0,panel.width,panel.height);\n'+
        '    $map=new Map{row,col,chipWidth:32,chipHeight:32};\n'+
        '}else{\n'+
        '    if(!mapOnData){\n'+
        '        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData};\n'+
        '    }else{\n'+
        '        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData,mapOnData};\n'+
        '    }\n'+
        '    panel=new Panel{width:$map.col*32,height:$map.row*32,zOrder:100};\n'+
        '    panel.x=panel.width/2;\n'+
        '    panel.y=panel.height/2;\n'+
        '    panel.setFillStyle("cyan");\n'+
        '    panel.fillRect(0,0,panel.width,panel.height);\n'+
        '}\n'+
        '$mp=new Map{row:16,col:8,chipWidth:32,chipHeight:32};\n'+
        'counter=0;\n'+
        'for(var i=0;i<16;i++){\n'+
        '    for(var j=0;j<8;j++){\n'+
        '        $mp.set(j,i,$pat_mapchip+counter);\n'+
        '        counter++;\n'+
        '    }\n'+
        '}\n'+
        'mode="get";\n'+
        'prevMode="set";\n'+
        'mapp=0;\n'+
        'mx=0;\n'+
        'my=0;\n'+
        'chipX=0;\n'+
        'chipY=0;\n'+
        'x=$screenWidth-16;\n'+
        'y=$screenHeight-16;\n'+
        'while(true){\n'+
        '    p=mapp;\n'+
        '    if(getkey("e")==1){\n'+
        '        $mp.scrollTo(1000,1000);\n'+
        '        mode="erase";\n'+
        '        print(mode+" mode");\n'+
        '    }\n'+
        '    if(getkey("s")==1){\n'+
        '        $mp.scrollTo(1000,1000);\n'+
        '        if(mode=="set"){\n'+
        '            mode="setOn";\n'+
        '        }else{\n'+
        '            mode="set";\n'+
        '        }\n'+
        '        print(mode+" mode");\n'+
        '    }\n'+
        '    if(getkey("o")==1){\n'+
        '        $mp.scrollTo(1000,1000);\n'+
        '        mode="setOn";\n'+
        '    }\n'+
        '    if(getkey("g")==1){\n'+
        '        if(mode!="get"){\n'+
        '            prevMode=mode;\n'+
        '            $mp.scrollTo(0,0);\n'+
        '            mode="get";\n'+
        '            chipX=0;\n'+
        '            chipY=0;\n'+
        '        }else{\n'+
        '            $mp.scrollTo(1000,1000);\n'+
        '            mode=prevMode;\n'+
        '        }\n'+
        '        print(mode+" mode");\n'+
        '    }\n'+
        '    if(getkey("p")==1){\n'+
        '        //add\n'+
        '        saveFileName=prompt("input json file(*.json)","map.json");\n'+
        '        /*print("mapTable=[");\n'+
        '        data="[";\n'+
        '        for(var i=0;i<$map.row-1;i++){\n'+
        '            var tmp=[];\n'+
        '            tmp=$map.mapTable[i].concat(tmp);\n'+
        '            print("["+tmp+"],");\n'+
        '            data+="["+tmp+"],";\n'+
        '        }\n'+
        '        var tmp=[];\n'+
        '        tmp=$map.mapTable[i].concat(tmp);\n'+
        '        print("["+tmp+"]");\n'+
        '        data+="["+tmp+"]";\n'+
        '        print("];");\n'+
        '        data+="]";*/\n'+
        '        //add\n'+
        '        saveDataFile=file("../maps/").rel(saveFileName);\n'+
        '        data=[$map.mapTable,$map.mapOnTable];\n'+
        '        //comment\n'+
        '        //mapDataFile.obj(data);\n'+
        '        //add\n'+
        '        saveDataFile.obj(data);\n'+
        '        print(saveFileName+" Saved");\n'+
        '        //mapDataFile.obj.push($map.mapOnTable);\n'+
        '    }\n'+
        '    if(getkey("c")==1){\n'+
        '        $mp.scrollTo(1000,1000);\n'+
        '        mode="spuit";\n'+
        '        print(mode+" mode");\n'+
        '    }\n'+
        '    if(mode!="get"){\n'+
        '        if(getkey("left")>0) mx=mx+8;\n'+
        '        if(getkey("right")>0) mx=mx-8;\n'+
        '        if(getkey("up")>0) my=my+8;\n'+
        '        if(getkey("down")>0) my=my-8;\n'+
        '        $map.scrollTo(mx,my);\n'+
        '    }else{\n'+
        '        if(getkey("left")>0) chipX=chipX+8;\n'+
        '        if(getkey("right")>0) chipX=chipX-8;\n'+
        '        if(getkey("up")>0) chipY=chipY+8;\n'+
        '        if(getkey("down")>0) chipY=chipY-8;\n'+
        '        $mp.scrollTo(chipX,chipY);\n'+
        '    }\n'+
        '    panel.x=panel.width/2-mx;\n'+
        '    panel.y=panel.height/2-my;\n'+
        '    if(mode=="set" && getkey(1)>0){\n'+
        '        $map.setAt($mouseX+mx,$mouseY+my,mapp);\n'+
        '        $map.setOnAt($mouseX+mx,$mouseY+my,-1);\n'+
        '    }else if(mode=="erase" && getkey(1)>0){\n'+
        '        $map.setAt($mouseX+mx,$mouseY+my,-1);\n'+
        '    }else if(mode=="get" && getkey(1)>0){\n'+
        '        mapp=$mp.getAt($mouseX+chipX,$mouseY+chipY);\n'+
        '        mode=prevMode;\n'+
        '        $mp.scrollTo(1000,1000);\n'+
        '        print(mode+" mode");\n'+
        '        updateEx(10);\n'+
        '    }else if(mode=="setOn" && getkey(1)>0){\n'+
        '        $map.setOnAt($mouseX+mx,$mouseY+my,mapp);\n'+
        '    }else if(mode=="spuit" && getkey(1)>0){\n'+
        '        mapp=$map.getAt($mouseX+mx,$mouseY+my);\n'+
        '        mode="set";\n'+
        '        print(mode+" mode");\n'+
        '        updateEx(10);\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      'MathMod.tonyu': 
        'extends null;\n'+
        'native Math;\n'+
        '\n'+
        'nowait \\sin(d) {\n'+
        '    return Math.sin(rad(d));\n'+
        '}\n'+
        'nowait \\cos(d) {\n'+
        '    return Math.cos(rad(d));\n'+
        '}\n'+
        'nowait \\rad(d) {\n'+
        '    return d/180*Math.PI;\n'+
        '}\n'+
        'nowait \\deg(d) {\n'+
        '    return d/Math.PI*180;\n'+
        '}\n'+
        '\n'+
        'nowait \\abs(v) {\n'+
        '    return Math.abs(v);\n'+
        '}\n'+
        'nowait \\atan2(x,y) {\n'+
        '    return deg(Math.atan2(x,y));\n'+
        '}\n'+
        'nowait \\floor(x) {\n'+
        '    return Math.floor(x);\n'+
        '}\n'+
        'nowait \\angleDiff(a,b) {\n'+
        '    var c;\n'+
        '    a=floor(a);\n'+
        '    b=floor(b);\n'+
        '    if (a>=b) {\n'+
        '        c=(a-b) % 360;\n'+
        '        if (c>=180) c-=360;\n'+
        '    } else {\n'+
        '        c=-((b-a) % 360);\n'+
        '        if (c<-180) c+=360;\n'+
        '    }\n'+
        '    return c;\n'+
        '}\n'+
        'nowait \\sqrt(t) {\n'+
        '    return Math.sqrt(t);\n'+
        '}\n'+
        'nowait \\dist(dx,dy) {\n'+
        '    if (typeof dx=="object") {\n'+
        '        var t=dx;\n'+
        '        dx=t.x-x;dy=t.y-y;\n'+
        '    }\n'+
        '    return sqrt(dx*dx+dy*dy);\n'+
        '}\n'+
        'nowait \\trunc(f) {\n'+
        '    if(f>=0) return Math.floor(f);\n'+
        '    else return Math.ceil(f);\n'+
        '}\n'+
        'nowait \\ceil(f){\n'+
        '    return Math.ceil(f);\n'+
        '}\n'+
        '\n'+
        'nowait \\rnd(r) {\n'+
        '    if (typeof r=="number") {\n'+
        '        return Math.floor(Math.random()*r);\n'+
        '    }\n'+
        '    return Math.random();\n'+
        '}'
      ,
      'MediaPlayer.tonyu': 
        '\n'+
        '\\play() {\n'+
        '    \n'+
        '}\n'+
        '\\stop() {\n'+
        '    \n'+
        '}\n'+
        '\\playSE() {\n'+
        '    \n'+
        '}\n'+
        '\\setDelay(){\n'+
        '    \n'+
        '}\n'+
        '\\setVolume(){\n'+
        '    \n'+
        '}'
      ,
      'NoviceActor.tonyu': 
        'extends BaseActor;\n'+
        'native Tonyu;\n'+
        '\n'+
        '\\sleep(n) {\n'+
        '    if(!n) n=1;\n'+
        '    for(n;n>0;n--) update();\n'+
        '}\n'+
        '\\initSprite() {\n'+
        '    if (!_sprite) {\n'+
        '        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n'+
        '        $Sprites.add(this);\n'+
        '    }\n'+
        '}\n'+
        '\\say(text,size) {\n'+
        '    if (!size) size=15;\n'+
        '    initSprite();\n'+
        '    _sprite._fukidashi={text:text, size:size, c:30};\n'+
        '}\n'+
        '\\sprite(x,y,p) {\n'+
        '    go(x,y,p);\n'+
        '}\n'+
        '\\show(x,y,p) {\n'+
        '    go(x,y,p);\n'+
        '}\n'+
        'nowait \\draw(ctx) {\n'+
        '    _sprite.draw(ctx);\n'+
        '}\n'+
        '\\getCrashRect() {\n'+
        '    return _sprite.getCrashRect();\n'+
        '}\n'+
        '\\go(x,y,p) {\n'+
        '    initSprite();\n'+
        '    _sprite.x=x;\n'+
        '    _sprite.y=y;\n'+
        '    if (p!=null) _sprite.p=p;\n'+
        '    //update();\n'+
        '}\n'+
        '\\change(p) {\n'+
        '    initSprite();\n'+
        '    _sprite.p=p;\n'+
        '}'
      ,
      'Pad.tonyu': 
        'extends Actor;\n'+
        '\\new(opt) {\n'+
        '    super(opt);\n'+
        '    padImageP = $pat_inputPad;\n'+
        '    jujiKey = new Actor{x:96+1, y:$screenHeight-96-1, p:padImageP+0,zOrder:-9,layer:$FrontSprites};\n'+
        '    no1Key = new Actor{x:$screenWidth-96, y:$screenHeight-96, p:padImageP+1,zOrder:-9,layer:$FrontSprites};\n'+
        '    jujiKey.show();\n'+
        '    no1Key.show();\n'+
        '    \n'+
        '    jujiKeyPushU = new Actor{x:jujiKey.x, y:jujiKey.y-60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n'+
        '    jujiKeyPushL = new Actor{x:jujiKey.x-60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n'+
        '    jujiKeyPushR = new Actor{x:jujiKey.x+60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n'+
        '    jujiKeyPushD = new Actor{x:jujiKey.x, y:jujiKey.y+60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n'+
        '    jujiKeyPush1 = new Actor{x:no1Key.x, y:no1Key.y, p:padImageP+2, scaleX:2, zOrder:-10,layer:$FrontSprites};\n'+
        '    jujiKeyPushU.hide();\n'+
        '    jujiKeyPushL.hide();\n'+
        '    jujiKeyPushR.hide();\n'+
        '    jujiKeyPushD.hide();\n'+
        '    jujiKeyPush1.hide();\n'+
        '}\n'+
        '\\die(){\n'+
        '    jujiKey.die();\n'+
        '    no1Key.die();\n'+
        '    jujiKeyPushU.die();\n'+
        '    jujiKeyPushL.die();\n'+
        '    jujiKeyPushR.die();\n'+
        '    jujiKeyPushD.die();\n'+
        '    jujiKeyPush1.die();\n'+
        '    super.die();\n'+
        '}\n'+
        'APAD_DIAG_SIZE = 96;\n'+
        '\\padUpdate() {\n'+
        '    // 操作 //\n'+
        '    keyPushL = 0;\n'+
        '    keyPushR = 0;\n'+
        '    keyPushU = 0;\n'+
        '    keyPushD = 0;\n'+
        '    keyPush1 = 0;\n'+
        '    \n'+
        '    padKeyNotapCnt ++;\n'+
        '    for (var i=0; i<5; i++) { // タップ判定・マウス判定 //\n'+
        '        var t = $touches[i];\n'+
        '        if (t.touched) {\n'+
        '            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32-64, 64+APAD_DIAG_SIZE, 64)) keyPushU = 1;\n'+
        '            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32+64, 64+APAD_DIAG_SIZE, 64)) keyPushD = 1;\n'+
        '            if (isOnRectWH(t.x, t.y, jujiKey.x-32-64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushL = 1;\n'+
        '            if (isOnRectWH(t.x, t.y, jujiKey.x-32+64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushR = 1;\n'+
        '            if (isOnRectWH(t.x, t.y, no1Key.x-64, no1Key.y-64, 128, 128)) keyPush1 = 1;\n'+
        '            padKeySW = 1;\n'+
        '            padKeyNotapCnt = 0;\n'+
        '        }\n'+
        '    }\n'+
        '    \n'+
        '    // カウントアップ\n'+
        '    if (keyPushL) keyCntL ++; else keyCntL = 0;\n'+
        '    if (keyPushR) keyCntR ++; else keyCntR = 0;\n'+
        '    if (keyPushU) keyCntU ++; else keyCntU = 0;\n'+
        '    if (keyPushD) keyCntD ++; else keyCntD = 0;\n'+
        '    if (keyPush1) keyCnt1 ++; else keyCnt1 = 0;\n'+
        '    \n'+
        '    // 表示\n'+
        '    if (keyPushL) jujiKeyPushL.show(); else jujiKeyPushL.hide();\n'+
        '    if (keyPushR) jujiKeyPushR.show(); else jujiKeyPushR.hide();\n'+
        '    if (keyPushU) jujiKeyPushU.show(); else jujiKeyPushU.hide();\n'+
        '    if (keyPushD) jujiKeyPushD.show(); else jujiKeyPushD.hide();\n'+
        '    if (keyPush1) jujiKeyPush1.show(); else jujiKeyPush1.hide();\n'+
        '    \n'+
        '}\n'+
        '\n'+
        '\\getPadUp()    { return keyCntU; }\n'+
        '\\getPadDown()  { return keyCntD; }\n'+
        '\\getPadLeft()  { return keyCntL; }\n'+
        '\\getPadRight() { return keyCntR; }\n'+
        '\\getPadButton(i) {\n'+
        '    var value;\n'+
        '    if (i == 0) value = keyCnt1;\n'+
        '    return value;\n'+
        '}\n'+
        '\n'+
        '\\getUp()    { return keyCntU; }\n'+
        '\\getDown()  { return keyCntD; }\n'+
        '\\getLeft()  { return keyCntL; }\n'+
        '\\getRight() { return keyCntR; }\n'+
        '\\getButton(i) {\n'+
        '    var value;\n'+
        '    if (i == 0) value = keyCnt1;\n'+
        '    return value;\n'+
        '}\n'+
        '\n'+
        '// 範囲 //\n'+
        '\\isOnRect(mx, my, rx, ry, rx2, ry2) {\n'+
        '    return (rx <= mx && mx < rx2 && ry <= my && my < ry2);\n'+
        '}\n'+
        '\n'+
        '// 範囲 //\n'+
        '\\isOnRectWH(mx, my, rx, ry, rw, rh) {\n'+
        '    return (rx <= mx && mx < rx+rw && ry <= my && my < ry+rh);\n'+
        '}\n'+
        '\n'+
        'while(true) {\n'+
        '    padUpdate();\n'+
        '    update();\n'+
        '}'
      ,
      'Panel.tonyu': 
        'extends Actor;\n'+
        'native $;\n'+
        'native Math;\n'+
        'native isNaN;\n'+
        '\\new(opt){\n'+
        '    super(opt);\n'+
        '    this.width=width;\n'+
        '    this.height=height;\n'+
        '    if(align==null) align="center";\n'+
        '    if(alpha==null) alpha=255;\n'+
        '    buf=$("<canvas>").attr{width,height};\n'+
        '}\n'+
        '\\setPanel(width,height){\n'+
        '    this.width=width;\n'+
        '    this.height=height;\n'+
        '    buf=$("<canvas>").attr{width,height};\n'+
        '}\n'+
        '\\setFillStyle(color){\n'+
        '    this.fillStyle=color;\n'+
        '}\n'+
        '\\fillRect(x,y,rectWidth,rectHeight){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    //ctx.clearRect(0,0,this.width,this.height);\n'+
        '    ctx.fillStyle=fillStyle;\n'+
        '    ctx.fillRect(x,y,rectWidth,rectHeight);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\fillText(text,x,y,size,align){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    //ctx.clearRect(0,0,this.width,this.height);\n'+
        '    ctx.textAlign = align;\n'+
        '    ctx.fillStyle=fillStyle;\n'+
        '    ctx.font=size+"px \'Courier New\'";\n'+
        '    ctx.fillText(text,x,y);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\clearRect(clearX,clearY,clearW,clearH){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    ctx.clearRect(clearX,clearY,clearW,clearH);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\getPixel(getX,getY){\n'+
        '    if(typeof getX=="number" && !isNaN(getX) && \n'+
        '    typeof getY=="number" && !isNaN(getY)){\n'+
        '        ctx=buf[0].getContext("2d");\n'+
        '        imagedata=ctx.getImageData(getX,getY,1,1);\n'+
        '        colordata=[imagedata.data[0],imagedata.data[1],imagedata.data[2],imagedata.data[3]];\n'+
        '        //print(imagedata.data);\n'+
        '    }else{\n'+
        '        colordata=[0,0,0,0];\n'+
        '    }\n'+
        '    return(colordata);\n'+
        '}\n'+
        '\\scroll(scrollX,scrollY){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    imagedata=ctx.getImageData(0,0,this.width,this.height);\n'+
        '    clearRect(0,0,width,height);\n'+
        '    ctx.putImageData(imagedata,-scrollX,-scrollY);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\draw(ctx){\n'+
        '    pImg=buf[0];\n'+
        '    ctx.save();\n'+
        '    if(align=="left"){\n'+
        '        ctx.translate(x+width/2,y+height/2);\n'+
        '    }else if(align=="center"){\n'+
        '        ctx.translate(x,y);\n'+
        '    }else if(align=="right"){\n'+
        '        ctx.translate(x-width/2,y-height/2);\n'+
        '    }\n'+
        '    if(this.rotation!=0){\n'+
        '        ctx.rotate(this.rotation/180*Math.PI);\n'+
        '    }else{\n'+
        '        ctx.rotate(this.rotate/180*Math.PI);\n'+
        '    }\n'+
        '    ctx.globalAlpha=this.alpha/255;\n'+
        '    ctx.drawImage(\n'+
        '    pImg, 0, 0,width,height,\n'+
        '    -width/2, -height/2, width ,height);\n'+
        '    ctx.restore();\n'+
        '}'
      ,
      'PlainChar.tonyu': 
        'native Tonyu;\n'+
        'native Math;\n'+
        '\\new(x,y,p) {\n'+
        '    if (Tonyu.runMode) {\n'+
        '        var thg=currentThreadGroup();\n'+
        '        if (thg) _th=thg.addObj(this,"tMain");\n'+
        '        initSprite();\n'+
        '    }\n'+
        '    if (typeof x=="object") Tonyu.extend(this,x); \n'+
        '    else if (typeof x=="number") {\n'+
        '        this.x=x;\n'+
        '        this.y=y;\n'+
        '        this.p=p;\n'+
        '    }\n'+
        '}\n'+
        '\\draw(c) {\n'+
        '    onDraw();\n'+
        '    if (_isInvisible) return;\n'+
        '    super.draw(c);\n'+
        '}\n'+
        '\\setVisible(v) {\n'+
        '    _isInvisible=!v;\n'+
        '}\n'+
        '\\onDraw() {\n'+
        '    \n'+
        '}\n'+
        '\\update() {\n'+
        '    onUpdate();\n'+
        '    super.update();\n'+
        '}\n'+
        '\\onUpdate() {\n'+
        '    \n'+
        '}\n'+
        '\\initSprite() {\n'+
        '    if(layer && typeof layer.add=="function"){\n'+
        '        layer.add(this);\n'+
        '    }else{\n'+
        '        $Sprites.add(this);\n'+
        '    }\n'+
        '    onAppear();\n'+
        '}\n'+
        '\\tMain() {\n'+
        '    main();\n'+
        '    die();\n'+
        '}\n'+
        '\\color(r,g,b) {\n'+
        '    return "rgb("+[r,g,b].join(",")+")";\n'+
        '}\n'+
        '\\drawText(x,y,text,col,size) {\n'+
        '    if ($debug) return;\n'+
        '    if (!size) size=15;\n'+
        '    if (!col) col="cyan";\n'+
        '    var tp=all(T1Text).find \\(t) {return t.hidden;};\n'+
        '    if (tp.length>0) {\n'+
        '        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n'+
        '    }else {\n'+
        '        new T1Text{x,y,text,fillStyle:col, size};  \n'+
        '    }\n'+
        '}\n'+
        '\\drawLine(x,y,tx,ty,col) {\n'+
        '    if (!col) col="white";\n'+
        '    var tp=all(T1Line).find \\(t) {return t.hidden;};\n'+
        '    if (tp.length>0) {\n'+
        '        tp[0].extend{x,y,tx,ty,col};\n'+
        '    }else {\n'+
        '        new T1Line{x,y,tx,ty,col};  \n'+
        '    }\n'+
        '}\n'+
        '\\appear(t) {\n'+
        '    return t;\n'+
        '}\n'+
        '\\trunc(f) {\n'+
        '    return Math.trunc(f);\n'+
        '}\n'+
        '\\loadPage(page,arg){\n'+
        '    all().die();\n'+
        '    new page(arg);\n'+
        '    die();\n'+
        '}'
      ,
      'PlayMod.tonyu': 
        'extends BaseActor;\n'+
        'nowait \\initMML() {\n'+
        '    if (mmlInited) return;\n'+
        '    mmlInited=true;\n'+
        '    $currentProject.requestPlugin("timbre");\n'+
        '    if (!$MMLS) {\n'+
        '       $MMLS={};\n'+
        '       $WaveTable=new WaveTable;\n'+
        '       $Boot.on("stop", releaseMML);\n'+
        '    }\n'+
        '    on("die") \\() { play().stop(); };\n'+
        '}\n'+
        'nowait \\releaseMML() {\n'+
        '    if ($MMLS) {\n'+
        '       for (var k,v in $MMLS) {\n'+
        '          v.stop();\n'+
        '       }\n'+
        '       $MMLS=null;\n'+
        '    } \n'+
        '    if ($WaveTable) {\n'+
        '       $WaveTable.stop();\n'+
        '       $WaveTable=null;\n'+
        '    }\n'+
        '}\n'+
        '\\play() {\n'+
        '    initMML();\n'+
        '    if (!_mml) _mml=new MML;\n'+
        '    if (isDead() || arguments.length==0) return _mml;\n'+
        '    var mmls=[];\n'+
        '    for (var i=0; i<arguments.length; i++) {\n'+
        '        mmls.push(arguments[i]);\n'+
        '    }\n'+
        '    _mml.play(mmls);\n'+
        '    while (_mml.bufferCount()>2) {\n'+
        '        update();\n'+
        '    }\n'+
        '    return _mml;\n'+
        '}\n'+
        'nowait \\playSE() {\n'+
        '    initMML();\n'+
        '    var mml=new MML;\n'+
        '    var mmls=[];\n'+
        '    for (var i=0; i<arguments.length; i++) {\n'+
        '        mmls.push(arguments[i]);\n'+
        '    }\n'+
        '    mml.play(mmls);\n'+
        '    return mml;\n'+
        '}\n'
      ,
      'ScaledCanvas.tonyu': 
        'extends Actor;\n'+
        'native $;\n'+
        'native Math;\n'+
        '\n'+
        '// canvas:phisical  buf: logical\n'+
        '\\new (opt) {\n'+
        '    extend(opt);\n'+
        '    // canvas/ width,height\n'+
        '    resize(width, height);\n'+
        '    cw=canvas.width();\n'+
        '    ch=canvas.height();\n'+
        '    cctx=canvas[0].getContext("2d");\n'+
        '    this.color="rgb(20,80,180)";\n'+
        '    sx=0;\n'+
        '    sy=0;\n'+
        '    isDrawGrid=$Sprites.isDrawGrid;\n'+
        '}\n'+
        '\\resize(width,height) {\n'+
        '    this.width=width;\n'+
        '    this.height=height;\n'+
        '    buf=$("<canvas>").attr{width,height};\n'+
        '    ctx=buf[0].getContext("2d");  \n'+
        '    $screenWidth=width;\n'+
        '    $screenHeight=height;\n'+
        '    if($panel){\n'+
        '        $panel.setPanel($screenWidth,$screenHeight);\n'+
        '    }\n'+
        '}\n'+
        '\\shouldDraw1x1(srcw,srch,dstw,dsth) {\n'+
        '    // srcw=465 -> dstw=460...665\n'+
        '    var larger=200;\n'+
        '    var smaller=5;\n'+
        '    return srcw-smaller<=dstw && dstw<=srcw+larger &&\n'+
        '    srch-smaller<=dsth && dsth<=srch+larger;\n'+
        '}\n'+
        '\\draw() {\n'+
        '    cw=canvas.width();\n'+
        '    ch=canvas.height();\n'+
        '    var calcw=ch/height*width; // calch=ch\n'+
        '    var calch=cw/width*height; // calcw=cw\n'+
        '    if (calch>ch) calch=ch;\n'+
        '    if (calcw>cw) calcw=cw;\n'+
        '    cctx.clearRect(0,0,cw,ch);\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\n'+
        '        calcw=width;calch=height;\n'+
        '    }\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\n'+
        '    var marginh=Math.floor((ch-calch)/2);\n'+
        '    cctx.drawImage(buf[0],\n'+
        '    0,0,width, height, \n'+
        '    marginw,marginh,calcw, calch );\n'+
        '}\n'+
        '\\canvas2buf(point) {\n'+
        '    var calcw=ch/height*width; // calch=ch\n'+
        '    var calch=cw/width*height; // calcw=cw\n'+
        '    if (calch>ch) calch=ch;\n'+
        '    if (calcw>cw) calcw=cw;\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\n'+
        '        calcw=width;calch=height;\n'+
        '    }\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\n'+
        '    var marginh=Math.floor((ch-calch)/2);\n'+
        '    \n'+
        '    return {x: (point.x-marginw)/calcw*width, \n'+
        '    y: (point.y-marginh)/calch*height};\n'+
        '}\n'+
        '\\setBGColor(color){\n'+
        '    this.color=color;\n'+
        '}\n'+
        '\\fillCanvas(cv){\n'+
        '    var ctx=cv.getContext("2d");\n'+
        '    ctx.save();\n'+
        '    ctx.fillStyle=$Screen.color;\n'+
        '    ctx.fillStyle=color;\n'+
        '    ctx.fillRect(0,0,cv.width,cv.height);\n'+
        '    if (isDrawGrid) drawGrid(cv);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\scrollTo(scrollX,scrollY){\n'+
        '    /*for(o in all()){\n'+
        '        //print(o.mapObj);\n'+
        '        if(o.mapObj){\n'+
        '            o.scrollTo(o.sx+scrollX,o.sy+scrollY);\n'+
        '        }else if(o.x!=undefined && o.y!=undefined){\n'+
        '            o.x+=scrollX;\n'+
        '            o.y+=scrollY;\n'+
        '        }\n'+
        '    }*/\n'+
        '    //sx=scrollX;\n'+
        '    //sy=scrollY;\n'+
        '    $Sprites.scrollTo(scrollX,scrollY);\n'+
        '}'
      ,
      'SecretChar.tonyu': 
        'extends PlainChar;\n'+
        '\n'+
        '\\draw(c) {\n'+
        '    \n'+
        '}'
      ,
      'SpriteChar.tonyu': 
        'extends PlainChar;\n'+
        '\n'+
        '\\new(x,y,p,f) {\n'+
        '    super(x,y,p);\n'+
        '    this.f=f;\n'+
        '    if (!this.x) this.x=0;\n'+
        '    if (!this.y) this.y=0;\n'+
        '    if (!this.p) this.p=0;\n'+
        '}\n'+
        '\\draw(c) {\n'+
        '    if (f) {\n'+
        '        if (!scaleY) scaleY=scaleX;\n'+
        '        scaleX*=-1;\n'+
        '    }\n'+
        '    super.draw(c);\n'+
        '    if (f) scaleX*=-1;\n'+
        '}'
      ,
      'Sprites.tonyu': 
        'extends Actor;\n'+
        'native Tonyu;\n'+
        '\\new() {\n'+
        '    sprites=[];\n'+
        '    imageList=[];\n'+
        '    hitWatchers=[];\n'+
        '    isDrawGrid=Tonyu.noviceMode;\n'+
        '    sx=0;\n'+
        '    sy=0;\n'+
        '    objId=0;\n'+
        '}\n'+
        'function add(s) {\n'+
        '    if (s.__addedToSprites) return;\n'+
        '    sprites.push(s);\n'+
        '    if(s.__genId==null){\n'+
        '        s.__genId=objId;\n'+
        '        objId++;\n'+
        '    }\n'+
        '    s.__addedToSprites=this;\n'+
        '    return s;\n'+
        '}\n'+
        'function remove(s) {\n'+
        '    var idx=sprites.indexOf(s);\n'+
        '    if (idx<0) return;\n'+
        '    sprites.splice(idx,1);\n'+
        '    delete s.__addedToSprites;\n'+
        '}\n'+
        'function clear() {sprites.splice(0,sprites.length);}\n'+
        'function compOrder(obj1, obj2){\n'+
        '    var val1=obj1.zOrder;\n'+
        '    var val2=obj2.zOrder;\n'+
        '    if(val1>val2){\n'+
        '        return -1;\n'+
        '    }else if(val1<val2){\n'+
        '        return 1;\n'+
        '    }else if(val1==val2){\n'+
        '        if(obj1.__genId>obj2.__genId){\n'+
        '            return 1;\n'+
        '        }else{\n'+
        '            return -1;\n'+
        '        }\n'+
        '        return 0;\n'+
        '    }\n'+
        '}\n'+
        'function draw(cv) {\n'+
        '    var ctx=cv.getContext("2d");\n'+
        '    ctx.save();\n'+
        '    /*\n'+
        '    ctx.fillStyle=$Screen.color;\n'+
        '    ctx.fillRect(0,0,cv.width,cv.height);\n'+
        '    if (isDrawGrid) drawGrid(cv);\n'+
        '    */\n'+
        '    var orderArray=[];\n'+
        '    orderArray=orderArray.concat(sprites);\n'+
        '    orderArray.sort(compOrder);\n'+
        '    ctx.translate(-sx,-sy);\n'+
        '    orderArray.forEach(\\(s){\n'+
        '        s.draw(ctx);\n'+
        '    });\n'+
        '    ctx.restore();\n'+
        '}\n'+
        'function checkHit() {\n'+
        '    hitWatchers.forEach(function (w) {\n'+
        '        sprites.forEach(function (a) {\n'+
        '            //console.log("a:",  a.owner);\n'+
        '            var a_owner=a;//a.owner|| a;\n'+
        '            if (! (a_owner instanceof w.A)) return;\n'+
        '            sprites.forEach(function (b) {\n'+
        '                var b_owner=b;//b.owner|| b;\n'+
        '                if (a===b) return;\n'+
        '                if (! (b_owner instanceof w.B)) return;\n'+
        '                //console.log("b:",  b.owner);\n'+
        '                if (a.crashTo1(b)) {\n'+
        '                    //console.log("hit", a.owner, b.owner);\n'+
        '                    w.h(a_owner,b_owner);\n'+
        '                }\n'+
        '            });\n'+
        '        });\n'+
        '    });\n'+
        '}\n'+
        'function watchHit(typeA, typeB, onHit) {\n'+
        '    var p={A: typeA, B:typeB, h:onHit};\n'+
        '    //console.log(p);\n'+
        '    hitWatchers.push(p);\n'+
        '}\n'+
        'function drawGrid(c) {\n'+
        '    var ctx=c.getContext("2d");\n'+
        '    ctx.textBaseline="top";\n'+
        '    ctx.save();\n'+
        '    ctx.strokeStyle="rgb(40,100,200)";\n'+
        '    for (var i=0 ; i<c.width ; i+=10) {\n'+
        '        ctx.beginPath();\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n'+
        '        ctx.moveTo(i,0);\n'+
        '        ctx.lineTo(i,c.height);\n'+
        '        ctx.closePath();\n'+
        '        ctx.stroke();\n'+
        '    }\n'+
        '    \n'+
        '    for (var i=0 ; i<c.height ; i+=10) {\n'+
        '        ctx.beginPath();\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n'+
        '        ctx.moveTo(0,i);\n'+
        '        ctx.lineTo(c.width,i);\n'+
        '        ctx.closePath();\n'+
        '        ctx.stroke();\n'+
        '    }\n'+
        '    ctx.fillStyle="white";\n'+
        '    ctx.font="15px monospaced";\n'+
        '    for (var i=100 ; i<c.width ; i+=100) {\n'+
        '        ctx.fillText(i, i,0);\n'+
        '    }\n'+
        '    for (var i=100 ; i<c.height ; i+=100) {\n'+
        '        ctx.fillText(i, 0,i);\n'+
        '    }\n'+
        '    ctx.restore();\n'+
        '}\n'+
        'function setImageList(il) {\n'+
        '    imageList=il;\n'+
        '}\n'+
        'function getImageList() {\n'+
        '    return imageList;\n'+
        '}\n'+
        'function scrollTo(scrollX,scrollY){\n'+
        '    sx=scrollX;\n'+
        '    sy=scrollY;\n'+
        '}'
      ,
      'T1Line.tonyu': 
        '\\draw(ctx) {\n'+
        '    if (hidden) return;\n'+
        '    \n'+
        '    ctx.strokeStyle=col;\n'+
        '    ctx.beginPath();\n'+
        '    ctx.moveTo(x,y);\n'+
        '    ctx.lineTo(tx,ty);\n'+
        '    ctx.stroke();\n'+
        '    hidden=true;\n'+
        '}\n'
      ,
      'T1Map.tonyu': 
        'extends Map;\n'+
        'native Tonyu;\n'+
        'native $;\n'+
        '\n'+
        '\\setBGColor(c) {\n'+
        '    $Screen.setBGColor(c);\n'+
        '}\n'+
        '\\load(fileName) {\n'+
        '    /*\n'+
        '    o={\n'+
        '        "chipWidth":"32","chipHeight":"32",\n'+
        '        "pTable":[{name:"$pat_aaa", p:10}, {name:"$pat_bbb","p":25} ],\n'+
        '        "baseData":[\n'+
        '        [//map\n'+
        '        [0,6],[0,5],[1,3],\n'+
        '        [1,3],[1,2],[0,5]\n'+
        '        ],\n'+
        '        [//mapOn\n'+
        '        [-1,-1],[1,4],[0,2],\n'+
        '        [-1,-1],[-1,-1],[1,8]\n'+
        '        ]\n'+
        '        ]\n'+
        '    }\n'+
        '    */\n'+
        '    var f=file("../maps/").rel(fileName);\n'+
        '    var o=f.obj();\n'+
        '    chipWidth=o.chipWidth;\n'+
        '    chipHeight=o.chipHeight;\n'+
        '    baseData=o.baseData;\n'+
        '    mapTable=conv(baseData[0],o.pTable);\n'+
        '    mapData=mapTable;\n'+
        '    row=mapTable.length;\n'+
        '    col=mapTable[0].length;\n'+
        '    mapOnTable=conv(baseData[1],o.pTable);\n'+
        '    mapOnData=mapOnTable;\n'+
        '    \n'+
        '    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n'+
        '    initMap();   \n'+
        '}\n'+
        '\\conv(mat, tbl) {\n'+
        '    var res=[];\n'+
        '    mat.forEach \\(row) {\n'+
        '        var rrow=[];\n'+
        '        res.push(rrow);\n'+
        '        row.forEach \\(dat) {// dat:[0,20]\n'+
        '            var t=tbl[dat[0]];\n'+
        '            if (t) rrow.push(Tonyu.globals[t.name]+dat[1]);\n'+
        '            else rrow.push(dat[1]);\n'+
        '        };\n'+
        '    };\n'+
        '    return res;\n'+
        '}'
      ,
      'T1Page.tonyu': 
        'extends PlainChar;\n'+
        '\n'+
        '\\initGlobals() {\n'+
        '    $chars=$Sprites.sprites;\n'+
        '    $Boot.setFrameRate(60);\n'+
        '    $clBlack=color(0,0,0);\n'+
        '    $clRed=color(255,0,0);\n'+
        '    $clGreen=color(0,255,0);\n'+
        '    $clYellow=color(255,255,0);\n'+
        '    $clBlue=color(0,0,255);\n'+
        '    $clPink=color(255,0,255);\n'+
        '    $clAqua=color(0,255,255);\n'+
        '    $clWhite=color(255,255,255);\n'+
        '    $mplayer=new MediaPlayer;\n'+
        '}'
      ,
      'T1Text.tonyu': 
        '\\draw(c) {\n'+
        '    if (hidden) return;\n'+
        '    c.font=size+"px \'ＭＳ Ｐゴシック\'";\n'+
        '    \n'+
        '    super.draw(c);\n'+
        '    hidden=true;\n'+
        '}'
      ,
      'T2Body.tonyu': 
        'extends BodyActor;\n'
      ,
      'T2Mod.tonyu': 
        'native Box2D;\n'+
        '\n'+
        '\\bvec(tx,ty) {\n'+
        '    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n'+
        '    return new b2Vec2(tx/scale,ty/scale);  \n'+
        '}'
      ,
      'T2World.tonyu': 
        'includes T2Mod;\n'+
        '\n'+
        'native Box2D;\n'+
        'native Tonyu;\n'+
        '\\onAppear() {\n'+
        '    $currentProject.requestPlugin("box2d");  \n'+
        '    initWorld();\n'+
        '}\n'+
        'loop();\n'+
        '\n'+
        '\n'+
        '\\initWorld() {\n'+
        '    gravity=gravity || 9.8;\n'+
        '    gravityX=gravityX || 0;\n'+
        '    var b2World = Box2D.Dynamics.b2World;\n'+
        '    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n'+
        '    scale=scale || 32;\n'+
        '    world = new b2World(\n'+
        '    new b2Vec2(gravityX, gravity)    //gravity\n'+
        '    ,  true                 //allow sleep\n'+
        '    );\n'+
        '    $t2World=this;\n'+
        '    $Boot.on("stop",releaseWorld);\n'+
        '    on("die",releaseWorld);\n'+
        '}\n'+
        '\\releaseWorld() {\n'+
        '    if ($t2World===this) $t2World=null;\n'+
        '}\n'+
        '\n'+
        '\\loop() {\n'+
        '    while(true) {\n'+
        '        world.Step(\n'+
        '        1 / $Boot.getFrameRate()  //frame-rate\n'+
        '        ,  10       //velocity iterations\n'+
        '        ,  10       //position iterations\n'+
        '        );\n'+
        '        world.DrawDebugData();\n'+
        '        world.ClearForces();\n'+
        '        updatePos();\n'+
        '        update();\n'+
        '    }\n'+
        '}\n'+
        '\\updatePos() {\n'+
        '    for (var b=world.GetBodyList();b;b=b.GetNext()) {\n'+
        '        var d=b.GetUserData();\n'+
        '        if(d) d.updatePos();\n'+
        '    }\n'+
        '}\n'
      ,
      'TObject.tonyu': 
        'extends null;\n'+
        'native Tonyu;\n'+
        '\\new (options) {\n'+
        '    if (typeof options=="object") extend(options);\n'+
        '    this.main();\n'+
        '}\n'+
        'nowait \\extend(obj) {\n'+
        '    return Tonyu.extend(this,obj);\n'+
        '}'
      ,
      'TQuery.tonyu': 
        'extends TObject;\n'+
        'includes MathMod;\n'+
        '\\new () {\n'+
        '    length=0;\n'+
        '}\n'+
        '\\tonyuIterator(arity) {\n'+
        '    var res={};\n'+
        '    res.i=0;\n'+
        '    if (arity==1) {\n'+
        '        res.next=function () {\n'+
        '            if (res.i>=this.length) return false;\n'+
        '            res[0]=this[res.i];\n'+
        '            res.i++;\n'+
        '            return true;\n'+
        '        };\n'+
        '    } else {\n'+
        '        res.next=function () {\n'+
        '            if (res.i>=this.length) return false;\n'+
        '            res[0]=res.i;\n'+
        '            res[1]=this[res.i];\n'+
        '            res.i++;\n'+
        '            return true;\n'+
        '        };\n'+
        '    }\n'+
        '    return res;\n'+
        '}\n'+
        '\\attr() {\n'+
        '    var values;\n'+
        '    if (length==0) return;\n'+
        '    if (arguments.length==1 && typeof arguments[0]=="string") {\n'+
        '        return this[0][arguments[0]];\n'+
        '    }\n'+
        '    if (arguments.length>=2) {\n'+
        '        values={};\n'+
        '        for (var i=0 ; i<arguments.length-1 ;i+=2) {\n'+
        '            values[arguments[i]]=arguments[i+1];\n'+
        '        }\n'+
        '    } else {\n'+
        '        values=arguments[0];\n'+
        '    }\n'+
        '    if (values) {\n'+
        '        for (var e in this) {\n'+
        '            e.extend( values);\n'+
        '        }\n'+
        '    }\n'+
        '}\n'+
        '\\genKeyfunc(key) {\n'+
        '    if (typeof key!="function") {\n'+
        '        return \\(o) {return o[key];};\n'+
        '    } else {\n'+
        '        return key;\n'+
        '    }\n'+
        '}\n'+
        '\\maxs(key) {\n'+
        '    var f=genKeyfunc(key);\n'+
        '    var res,reso=new TQuery;\n'+
        '    for (var o in this) {\n'+
        '        var v=f(o);\n'+
        '        if (res==null || v>=res) {\n'+
        '            if (v>res) reso=new TQuery;\n'+
        '            reso.push(o);\n'+
        '            res=v;\n'+
        '        }\n'+
        '    }\n'+
        '    return reso;\n'+
        '}\n'+
        '\\mins(key) {\n'+
        '    var f=genKeyfunc(key);\n'+
        '    var res,reso=new TQuery;\n'+
        '    for (var o in this) {\n'+
        '        var v=f(o);\n'+
        '        if (res==null || v<=res) {\n'+
        '            if (v<res) reso=new TQuery;\n'+
        '            reso.push(o);\n'+
        '            res=v;\n'+
        '        }\n'+
        '    }\n'+
        '    return reso;\n'+
        '}\n'+
        '\\minObj(key) {\n'+
        '    return mins(key)[0];\n'+
        '}\n'+
        '\\maxObj(key) {\n'+
        '    return maxs(key)[0];\n'+
        '}\n'+
        '\\nearests(x,y) {\n'+
        '    if (typeof x=="object") {y=x.y;x=x.x;}\n'+
        '    return mins \\(o) {\n'+
        '        return dist(o.x-x,o.y-y);\n'+
        '    };\n'+
        '}\n'+
        '\\nearest(x,y) {\n'+
        '    return nearests(x,y)[0];\n'+
        '}\n'+
        '\\withins(xo,yd,d) {\n'+
        '    var x,y;\n'+
        '    if (typeof xo=="object") {\n'+
        '        x=xo.x;y=xo.y;d=yd;\n'+
        '    } else {\n'+
        '        x=xo;y=yd;\n'+
        '    }\n'+
        '    return find \\(o) {\n'+
        '        return dist(o.x-x,o.y-y)<=d;\n'+
        '    };\n'+
        '}\n'+
        '\\within(xo,yd,d) {\n'+
        '    return withins(xo,yd,d).nearest();\n'+
        '}\n'+
        '\n'+
        '\\max(key) {\n'+
        '    var f=genKeyfunc(key);\n'+
        '    var res;\n'+
        '    for (var o in this) {\n'+
        '        var v=f(o);\n'+
        '        if (res==null || v>res) res=v;\n'+
        '    }\n'+
        '    return res;\n'+
        '}\n'+
        '\\min(key) {\n'+
        '    var f=genKeyfunc(key);\n'+
        '    var res;\n'+
        '    for (var o in this) {\n'+
        '        var v=f(o);\n'+
        '        if (res==null || v<res) res=v;\n'+
        '    }\n'+
        '    return res;\n'+
        '}\n'+
        '\\push(e) {\n'+
        '    this[length]=e;\n'+
        '    length++;\n'+
        '}\n'+
        '\\size() {return length;}\n'+
        '\\find(f) {\n'+
        '    var no=new TQuery;\n'+
        '    for (var o in this) {\n'+
        '        if (f(o)) no.push(o);\n'+
        '    }\n'+
        '    return no;\n'+
        '} \n'+
        '\\apply(name, args) {\n'+
        '    var res;\n'+
        '    if (!args) args=[];\n'+
        '    for (var o in this) {\n'+
        '        var f=o[name];\n'+
        '        if (typeof f=="function") {\n'+
        '            res=f.apply(o, args);\n'+
        '        }\n'+
        '    }\n'+
        '    return res;\n'+
        '}\n'+
        '// \\alive => find \\(o) => !o.isDead()  //  (in future)\n'+
        '\\alive() {\n'+
        '    return find \\(o) {\n'+
        '        return !o.isDead();\n'+
        '    };\n'+
        '}\n'+
        '\\die() {\n'+
        '    var a=alive();\n'+
        '    if (a.length==0) return false;\n'+
        '    a.apply("die");\n'+
        '    return true;\n'+
        '}\n'+
        '\n'+
        '\\klass(k) {\n'+
        '    return find \\(o) { return o instanceof k; };\n'+
        '}'
      ,
      'TextChar.tonyu': 
        'extends PlainChar;\n'+
        'native TextRect;\n'+
        '\n'+
        '\\new (xx,yy,t,c,s){\n'+
        '    super(xx,yy);\n'+
        '    text="";\n'+
        '    col=$clWhite;\n'+
        '    size=20;\n'+
        '    if (!this.x) this.x=0;\n'+
        '    if (!this.y) this.y=0;\n'+
        '    if (t) text=t;\n'+
        '    if (c) fillStyle=c;\n'+
        '    if (s) size=s;\n'+
        '}\n'+
        '\\draw(ctx) {\n'+
        '    if (!size) size=15;\n'+
        '    if (!align) align="left";\n'+
        '    if (!fillStyle) fillStyle="white";\n'+
        '    ctx.fillStyle=fillStyle;\n'+
        '    ctx.globalAlpha=this.alpha/255;\n'+
        '    ctx.font=size+"px \'ＭＳ Ｐゴシック\'";\n'+
        '    var rect=TextRect.draw(ctx, text, x, y, size, align , "fill");\n'+
        '    width=rect.w;\n'+
        '    height=rect.h;\n'+
        '    \n'+
        '    //    fillStyle=col;\n'+
        '    //super.draw(ctx);\n'+
        '}'
      ,
      'WaveTable.tonyu': 
        'extends TObject;\n'+
        'native T;\n'+
        '\n'+
        'wav={};\n'+
        'env={};\n'+
        '\\setWav(num, synth) {\n'+
        '    wav[num]=synth;\n'+
        '}\n'+
        '\\setEnv(num, synth) {\n'+
        '    env[num]=synth;\n'+
        '}\n'+
        '\\get(w,e) {\n'+
        '    var synth=T("OscGen") {osc:wav[w], env:env[e], mul:0.25};\n'+
        '    return synth;\n'+
        '}\n'+
        '\\stop() {\n'+
        '    /*for (var k,v in tbl) {\n'+
        '        v.pause();\n'+
        '        v.stop();\n'+
        '    }*/\n'+
        '}\n'+
        '\n'+
        'if (typeof T!=="undefined") {\n'+
        '    //env=T("adsr", {a:0,d:200,s:0.5,r:10});\n'+
        '    env = T("env",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\n'+
        '    setEnv(0, env);\n'+
        '    setWav(0, T("pulse"));\n'+
        '    //    synth=T("OscGen") {wave:"pulse", env, mul:0.25};\n'+
        '    //set(0,synth);    \n'+
        '}\n'
      
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_k.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();
requireSimulator.setName('fs/ROMd');
(function () {
  var rom={
    base: '/Tonyu/doc/',
    data: {
      '': '{"images/":{".png":{"lastUpdate":1425458230258},"3d.png":{"lastUpdate":1425458230256},"ren1.png":{"lastUpdate":1425458230257},"ren2.png":{"lastUpdate":1425458230258},"tonyu2Logo.png":{"lastUpdate":1425458230258},"分割数指定の設定.png":{"lastUpdate":1425458230000},"画像の挿入.png":{"lastUpdate":1425458230259}},"index.txt":{"lastUpdate":1425457943378},"novice/":{"crash.txt":{"lastUpdate":1415480274000},"dec.txt":{"lastUpdate":1415480274000},"firstRun.txt":{"lastUpdate":1415480274000},"getkey.txt":{"lastUpdate":1415480274000},"inc.txt":{"lastUpdate":1415480274000},"index.txt":{"lastUpdate":1415480274000},"item.txt":{"lastUpdate":1415480274000},"key.txt":{"lastUpdate":1415480274000},"left.txt":{"lastUpdate":1415480274000},"new.txt":{"lastUpdate":1415480274000},"newFile.txt":{"lastUpdate":1415480274000},"param.txt":{"lastUpdate":1415480274000},"projectIndex.txt":{"lastUpdate":1415480274000},"say.txt":{"lastUpdate":1415480274000},"say2.txt":{"lastUpdate":1415480274000},"sleep.txt":{"lastUpdate":1415480274000},"sprite.txt":{"lastUpdate":1415480274000},"spriteMove.txt":{"lastUpdate":1415480274000},"toc.json":{"lastUpdate":1415480274000},"trouble1.txt":{"lastUpdate":1415480274000},"true.txt":{"lastUpdate":1415480274000},"udlr.txt":{"lastUpdate":1415480274000},"variable.txt":{"lastUpdate":1415480274000},"variable2.txt":{"lastUpdate":1415480274000},"variable3.txt":{"lastUpdate":1415480274000},"while.txt":{"lastUpdate":1415480274000},"xy.txt":{"lastUpdate":1415480274000}},"projectIndex.txt":{"lastUpdate":1425457126000},"tonyu2/":{"$mouseX, $mouseY.txt":{"lastUpdate":1425457126000},"$screenWidth,$screenHeight.txt":{"lastUpdate":1425457126000},"$touches.txt":{"lastUpdate":1425457126000},"$touches2.txt":{"lastUpdate":1425457126000},"3Dキャラの出現.txt":{"lastUpdate":1425457126000},"3Dキャラの移動.txt":{"lastUpdate":1425457126000},"3Dキャラの表示.txt":{"lastUpdate":1425457126000},"3D弾を打つ.txt":{"lastUpdate":1425457126000},"3D背景.txt":{"lastUpdate":1425457126000},"Actor.txt":{"lastUpdate":1425457126000},"all.txt":{"lastUpdate":1425457126000},"allCrash.txt":{"lastUpdate":1425457126000},"api.txt":{"lastUpdate":1425457126000},"asyncResult.txt":{"lastUpdate":1425457126000},"BaseActor.txt":{"lastUpdate":1425457126000},"Boot.txt":{"lastUpdate":1425457126000},"classDef.txt":{"lastUpdate":1425457126000},"clearRect.txt":{"lastUpdate":1425457126000},"console.txt":{"lastUpdate":1425457126000},"cpats.txt":{"lastUpdate":1425457126000},"crashTo.txt":{"lastUpdate":1425457126000},"crashTo1.txt":{"lastUpdate":1425457126000},"die.txt":{"lastUpdate":1425457126000},"diffTonyu1.txt":{"lastUpdate":1425457126000},"draw.txt":{"lastUpdate":1425457126000},"extend.txt":{"lastUpdate":1425457126000},"file.txt":{"lastUpdate":1425457126000},"fillRect.txt":{"lastUpdate":1425457126000},"fillText.txt":{"lastUpdate":1425457126000},"forin.txt":{"lastUpdate":1425457126000},"frame.txt":{"lastUpdate":1425457126000},"FS.each.txt":{"lastUpdate":1425457126000},"FS.exists.txt":{"lastUpdate":1425457126000},"FS.obj.txt":{"lastUpdate":1425457126000},"FS.recursive.txt":{"lastUpdate":1425457126000},"FS.rel.txt":{"lastUpdate":1425457126000},"FS.text.txt":{"lastUpdate":1425457126000},"fs.txt":{"lastUpdate":1425457126000},"get.txt":{"lastUpdate":1425457126000},"getAt.txt":{"lastUpdate":1425457126000},"getButton.txt":{"lastUpdate":1425457126000},"getCrashRect.txt":{"lastUpdate":1425457126000},"getDown.txt":{"lastUpdate":1425457126000},"getkey.txt":{"lastUpdate":1425457126000},"getLeft.txt":{"lastUpdate":1425457126000},"getPixel.txt":{"lastUpdate":1425457126000},"getRight.txt":{"lastUpdate":1425457126000},"getUp.txt":{"lastUpdate":1425457126000},"hide.txt":{"lastUpdate":1425457126000},"ide.txt":{"lastUpdate":1425457126000},"index.txt":{"lastUpdate":1425457126000},"isDead.txt":{"lastUpdate":1425457126000},"kernel.txt":{"lastUpdate":1425457126000},"lang.txt":{"lastUpdate":1425457126000},"login.txt":{"lastUpdate":1425457126000},"Map.txt":{"lastUpdate":1425457126000},"mapEditor.txt":{"lastUpdate":1425457126000},"mapGet.txt":{"lastUpdate":1425457126000},"mapscrollTo.txt":{"lastUpdate":1425457126000},"MathMod.txt":{"lastUpdate":1425457126000},"onUpdate.txt":{"lastUpdate":1425457126000},"options.txt":{"lastUpdate":1425457126000},"Pad.txt":{"lastUpdate":1425457126000},"Panel.txt":{"lastUpdate":1425457126000},"play.txt":{"lastUpdate":1425457126000},"playSE.txt":{"lastUpdate":1425457126000},"png.txt":{"lastUpdate":1425457126000},"print.txt":{"lastUpdate":1425457126000},"resize.txt":{"lastUpdate":1425457126000},"rnd.txt":{"lastUpdate":1425457126000},"ScaledCanvas.txt":{"lastUpdate":1425457126000},"scrollTo.txt":{"lastUpdate":1425457126000},"set.txt":{"lastUpdate":1425457126000},"setAt.txt":{"lastUpdate":1425457126000},"setBGColor.txt":{"lastUpdate":1425457126000},"setFillStyle.txt":{"lastUpdate":1425457126000},"setFrameRate.txt":{"lastUpdate":1425457126000},"setPanel.txt":{"lastUpdate":1425457126000},"show.txt":{"lastUpdate":1425457126000},"sugar.txt":{"lastUpdate":1425457126000},"super.txt":{"lastUpdate":1425457126000},"t1compats.txt":{"lastUpdate":1425457126000},"TQuery.alive.txt":{"lastUpdate":1425457126000},"TQuery.apply.txt":{"lastUpdate":1425457126000},"TQuery.attr.txt":{"lastUpdate":1425457126000},"TQuery.die.txt":{"lastUpdate":1425457126000},"TQuery.find.txt":{"lastUpdate":1425457126000},"TQuery.minmax.txt":{"lastUpdate":1425457126000},"TQuery.txt":{"lastUpdate":1425457126000},"update.txt":{"lastUpdate":1425457126000},"updateEx.txt":{"lastUpdate":1425457126000},"waitFor.txt":{"lastUpdate":1425457126000},"waitmode.txt":{"lastUpdate":1425457126000},"あたり判定をつける.txt":{"lastUpdate":1425457126000},"すべてのオブジェクトを消す.txt":{"lastUpdate":1425457126000},"すべてのキャラクタに同じ動作を行なう.txt":{"lastUpdate":1425457126000},"とある計算.txt":{"lastUpdate":1425457126000},"オブジェクトに動きを追加.txt":{"lastUpdate":1425457126000},"オブジェクトに動きを追加する.txt":{"lastUpdate":1425457126000},"オブジェクトに名前を付けて値を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトに連続でぶつからないようにする.txt":{"lastUpdate":1425457126000},"オブジェクトのグラフィックを変える.txt":{"lastUpdate":1425457126000},"オブジェクトのグラフィックを変更する.txt":{"lastUpdate":1425457126000},"オブジェクトの大きさ、傾き、透明度を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトの大きさや傾き、透明度を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトの奥行きの設定.txt":{"lastUpdate":1425457126000},"オブジェクトをランダムな位置に表示する.txt":{"lastUpdate":1425457126000},"オブジェクトを動かす.txt":{"lastUpdate":1425457126000},"オブジェクトを宣言する際に値を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトを消す.txt":{"lastUpdate":1425457126000},"オブジェクトを移動させる.txt":{"lastUpdate":1425457126000},"オブジェクトを表示する.txt":{"lastUpdate":1425457126000},"キャラクターを配置する.txt":{"lastUpdate":1425457126000},"クリックした時に動作をする.txt":{"lastUpdate":1425457126000},"ジャンプして着地する.txt":{"lastUpdate":1425457126000},"ジャンプして落ちる.txt":{"lastUpdate":1425457126000},"スコアを表示する.txt":{"lastUpdate":1425457126000},"タッチした位置にオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"チュートリアル.txt":{"lastUpdate":1425457126000},"テキストオブジェクトとして時間を表示する.txt":{"lastUpdate":1425457126000},"フレーム数を計り、そこから時間を計算する.txt":{"lastUpdate":1425457126000},"プログラムでマップを描く.txt":{"lastUpdate":1425457126000},"マウスの位置にオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"マウスクリックで力加減を判定する.txt":{"lastUpdate":1425457126000},"マップを描く.txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符).txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符)との同期.txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符)の同期.txt":{"lastUpdate":1425457126000},"ラインパネルと曲の同期.txt":{"lastUpdate":1425457126000},"ラインパネルの作成.txt":{"lastUpdate":1425457126000},"リトライする.txt":{"lastUpdate":1425457126000},"上下左右に移動させる.txt":{"lastUpdate":1425457126000},"乱数を使う.txt":{"lastUpdate":1425457126000},"他のオブジェクトを消す.txt":{"lastUpdate":1425457126000},"前へ.txt":{"lastUpdate":1425457126000},"力加減の判定方法.txt":{"lastUpdate":1425457126000},"力加減を弾に適用する.txt":{"lastUpdate":1425457126000},"効果音を鳴らす.txt":{"lastUpdate":1425457126000},"宣言する際にオブジェクトの値を設定する.txt":{"lastUpdate":1425457126000},"左右に移動させる.txt":{"lastUpdate":1425457126000},"座標を指定してオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"座標を指定する.txt":{"lastUpdate":1425457126000},"弾を撃つ.txt":{"lastUpdate":1425457126000},"当たり判定で壁にぶつかる.txt":{"lastUpdate":1425457126000},"当たり判定で当たったオブジェクトを消す.txt":{"lastUpdate":1425457126000},"当たり判定で敵に当たったらプレイヤーを消す.txt":{"lastUpdate":1425457126000},"当たり判定の大きさを変える.txt":{"lastUpdate":1425457126000},"当たり判定を変更する.txt":{"lastUpdate":1425457126000},"拡張機能.txt":{"lastUpdate":1425457126000},"文字をテキストオブジェクトとして表示する.txt":{"lastUpdate":1425457126000},"文字を画面下部に表示する.txt":{"lastUpdate":1425457126000},"文字を表示する.txt":{"lastUpdate":1425457126000},"時間を計る.txt":{"lastUpdate":1425457126000},"曲の作成.txt":{"lastUpdate":1425457126000},"曲の演奏時間の取得.txt":{"lastUpdate":1425457126000},"曲の演奏時間の図り方.txt":{"lastUpdate":1425457126000},"曲の演奏時間の図り方、タイミングチャート.txt":{"lastUpdate":1425457126000},"特定のオブジェクトの値を設定する.txt":{"lastUpdate":1425457126000},"特定の位置をクリックした時に動作をする.txt":{"lastUpdate":1425457126000},"特定の複数のオブジェクトに同じ動作を行う.txt":{"lastUpdate":1425457126000},"用途別リファレンス.txt":{"lastUpdate":1425457126000},"画像の挿入.txt":{"lastUpdate":1425457126000},"画面の上からランダムにオブジェクトを降らせる.txt":{"lastUpdate":1425457126000},"画面の上からランダムにキャラを降らせる.txt":{"lastUpdate":1425457126000},"画面端から出ないようにする.txt":{"lastUpdate":1425457126000},"疑似3D表示を行う.txt":{"lastUpdate":1425457126000},"確率でオブジェクトを出現させる.txt":{"lastUpdate":1425457126000},"確率でキャラを出現させる.txt":{"lastUpdate":1425457126000},"自分自身を消す.txt":{"lastUpdate":1425457126000},"自機の出現.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを出す.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを動かす.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"評価方法(1).txt":{"lastUpdate":1425457126000},"評価方法(2).txt":{"lastUpdate":1425457126000},"音ゲームの作成の仕方.txt":{"lastUpdate":1425457126000},"音符を降らせる.txt":{"lastUpdate":1425457126000}},"チュートリアル.txt":{"lastUpdate":1425457126000}}',
      'images/': '{".png":{"lastUpdate":1425458230258},"3d.png":{"lastUpdate":1425458230256},"ren1.png":{"lastUpdate":1425458230257},"ren2.png":{"lastUpdate":1425458230258},"tonyu2Logo.png":{"lastUpdate":1425458230258},"分割数指定の設定.png":{"lastUpdate":1425458230000},"画像の挿入.png":{"lastUpdate":1425458230259}}',
      'images/.png': 'data:image/png;base64,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',
      'images/3d.png': 'data:image/png;base64,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',
      'images/ren1.png': 'data:image/png;base64,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',
      'images/ren2.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfoAAAGACAIAAADKzje5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADSySURBVHhe7d0NtBzlfd/xTQAbYwzEsROc2A0OJZGdF5STk1iljq3EbaImcaK6ISahtcVxoygOPkdxk4a0dmiMC0EhkgCB4ErowtXLFRJwARkULAshEBLBBDAu3GLKueHIrqDmII5NrcNxc9zfzv/ZR8/O287s293Z+X7OHOl5nnlmdnfmzm9mZ3Z3GvsffnT/gb9/4MAj9z94aO/+g3sfePhLDxzQ8MX7H/LDfXsfZGBgYGAYtSEMaotuZbiSXHmuVFe2K+EfOvTYgUf+4eG//4eGC/oHHt6zL0r2L+3XsHvPPg33fvH+e+9jYGBgYBjt4Yv3W2hbgCvJledKdR/6Dx78skK/oaZmyu990Of7rt17NNx9z30a7vrCfXfu+jsGBgYGhtEclNIW1xbdPv3t2P946D/8aMMFfZTymkATz+zafcdd99x+5xc07JzZZcOOO+5mYGBgYBipwfLZ4lq5rfRWhlv0K9Ut9L/0wAFL/Ib2A7fe+XcMDAwMDGM53Pel/Zb4De0EVP8eAGDsKN51TG+J39CRP3EPAGNJ8d48saPE3/tg4/Y7v0DcA8BYUrzrmF6Jv3vPvsatt91J3APAWFK833HXPXffc9+9993f2LbjDuIeAMaS4n3nzK6ZXbt1gN/YMr2DuAeAsaR4v/W2mTvu+oIO8BtTW7cT9wAwlhTv23bcvnPm7jt37W5MTm0l7gFgLCnet27fueP2O2d23dvYOLmZuAeAsaR4n9q2Y/vOmdvv/EJjw6Yp4h4AxlIz7rfeum3HHbfNfKExcdMtxD0AjCXF++TUtm233r7zjl2NGzfeTNwDwFiyuN+6/bYdd9xN3APA2FK8b5ra6uJ+/cQm4h4AxlIz7m/ZumV6J3EPAOPM4n7zth07br+LuAeAsUXcA0AtEPcAUAvEPQDUAnEPALVA3ANALRD3AFALxD0A1AJxDwC1QNwDQC0Q9wBQC8Q9ANQCcQ8AtUDcA0AtEPcAUAvEPQDUQizubyLuMSAvvfTSCy+88Oqrr7o6gOGK4n5LFPd3EvfoxvT0dJEQv+qqqxqNxqFDh1w9m/YKHRXvFtLzdCOyle0Z48al0Q6vYx+P/SL6jrhHTxTfCnF59tlnXVMGi3sFmatnUAebYT71dKVcNk9v7969bkS2sj1j3Lg0WgLqUPAF6gnYDIF+Ie7Rkw9/+MMFs6lg3OsQWD2zREnYpJ6uKY3rlB33K1ascF1brF3K9oyxUa5ry2c+8xlrVIfYC7RREnugJ5980mYI9Atxj+5NT08rpxRYrt7y6quvKi5jFGfqrElcPeAmKyAKxiZXz+A6Zcd98kGtXaxavGdM6ig7oleIu3pA74psEn+qBxgQ4h5d8iclfE4p9+++++5wVEE2eYwOb5WPsVPYboJgEu0/1C32psF1Ssx5aHGvqUK2X0yNey0xjUruMoG+I+5Rmp2OsLMQlu9isSVKt96P7v0xr4SnNVxTK2o1ytXbc9k1Zcd9jrI9Y9y4NGHcN192xBaLRrl6JOtMjtpt92ZU7nhyDPCIe5QWnm62Fp/OWTkliid1KB5Pfv8hSkBrdPUgasNu/q2Aq89f3DczO5A8urduWcKeRkvYdgxJfo8L5FO833TzlqltO269jbhHMeEx9aFDhxSydsFWoeZ6RJTsIdtJqL+rR/JPWCvjNGdx9Ywct25h6rlO2XGvgmtqsXaxavGeMamj9ErVmIx7zTwmuWMweoFq17/qYD1t92ly9rKAR9yjG4ppCyCxQiyhLOA6SuZajB5Is1JBiRae4bGxnh3Xq7NC3xLT2FhPKWntKrimFmsXqxbvGWOj9LpCtqtTwXXK2CtIcsdgdGiffCb+lXLqH0UQ9+iSEjZ5Vsez2NKeIIq7JtsraBKrJhMwSTNRxqlP8zGi5LWCuB5RxNsZbX+uw/cX16nFz0Gdm08iYO1StmeMG5dG07pOrW56gTH2PYawZz6bj7g6kI24R/fsrI5y3M7JKCJ97iu5NCqMLQtKtVs12cFYvvvs9tRokxjr6SoteibKfT0ZV8+O+xxle8boSWaxpWTcLDIkF0sWW6ri6kA24h5dUnjZAbs/cWwH7BMTEyor3VQOY8uCSe1WTXYw4akYUQe7PGBjXWvruNjKlvLPBl/rtXZx9RYf4upvc/CsXcr29NzoTuy12Bz06mKKvOkJ+f2iqwPZiHt0yYImvEDqD6st16ycL5lr2nko8pS2YXx7NmfLRD0BdQ4PmT1Nbly9RS32uMlRxdkcxNVbXGsn9tBWtglDttyKx73NRwvE1YFsxD3KUR4pjPxBpcpi+euparHVkaZ18y3DptVRv6sXNtC4t0URil2uMPZmKHUOUiru+/JyUB/EPcrJyXGLMyvbOZkwtmyUJrdqx1xTLDZnl+B3LbEY9XI+h56Vj27KbKmn3V09myZUN/+SQzaHLJrQ9ctluxP96+pALuIepSmMlMVKMYts48Z973sTExMKUxsVxlYs+5IdYnw0l1VknrG4t8Yc/mmLa8qI+7Bn7CWHbA5Zcl6C5y9ydPEuB/VE3KMnljji6i2W5h0ViebkxdJU9hFG6Tru3Yza2ZsJFVzXTnFvo+yMTce4d5WAOqu9Y9xr/jYHuzAOFEHcoxv2bSbLJqNGBa5dPlU5HJWji2jO4h+x67h3lXbJyLbO4urtbJR9/MamDU862cLx3awcKhL3/pK45uyagAKIe3TD4iYW99oHqJB6vGmjTOpnaZKqGPdK+XCUTRvyj2tVdYixNxMqWLckLT07Za89q2sCiiHu0Y0orOJxbz9ykLxy6M88mILHpD6alX0qd+TPZedkpbpZHxVcU8QaXaWd5qZRBePeLxCr2rR606N2k/wCQaqsl+CzXv8W3GsCHnGP0sJjWCtI2B4mkU8oY0evRRLfR3NZ8xj3/vqBLYHktJ4abf+kfWRzPxDRgrJTZKlR7pckWY/uEPcoTXnUjLRE3Puq/4aURZhaFHyWfRplib9ixYr8zPLRrAlV7qj3o/voOcbZ89cLcV1z494/B0tkTa5yOK1op2gXOayn3/P5810apXJy4ZD16BFxj9IsNJVlKkcB1WSjlHfKMiv7Q10llDLOZ5/KllziOydlRXMWvxOyJ5YqP+5zFIx7C3Gfy1YNp7WF4KnqL97KxMSEGxHRgnIjgnsMaIlphknsA9ARcY/SLJV0BKqyZZDYKOMPbMUfjfq4tw4+8RVkqVE1/LiPYjPOclYF1zU77tXH2vUOxh/mSzitPQG99tTjd1Fnmza84u3nnEPzdL2BDMQ9SrM8sjM2ljVioyRMuvCMTRj3okNXf8QaBqLno1kTqtyRf9yu495V2un5x56edRZXb7EX6GPXn5xRix7OL4fUlE8KD+01ic0qB3GPjoh7dMOHkQubtLiPfSIzFvdGOZiVzj6ay+oi7ovQS7ZpPTci4hNZL981RUfl/hx9F/wlEKAviHv0xCVTkH2KRWVcMqpS4z6Hj2ZNqHJHvRzdF+TfjoidywrZEwiPyo2d2wmnLYKjdfQdcY+eKFuNq2dTPqpbwVMZoh1DFOPNn99xTZ2op+Q8xJOtn10LL5D2EcfjGGVR3G+e2nbrrbfNEPcAMLaIewCoBeIeAGqBuAeAWiDuAaAWiHsAqIW2uL/+RuIeAMaT4n3j5Oaprbdu30ncA8D4Iu4BoBaIewCoBeIeAGqBuAeAWiDuAaAWiHsAqAXiHgBqgbgHgFog7gGgFoh7AKgF4h4AaoG4B4BaIO4BoBaIewCoBeIeAGqBuAeAWiDuAaAWiHsAqAXiHgBqIRb3G4l7ABhLUdxPTW3dTtwDwDgj7jtrNBqu1F4Oxdqzuklqz4KzTaU+HbsVn4+4ej+Ec8ufc/GeWYrPP0t3j9vRgGZbynCeQ/go+Y+Y1VPlULJFrKeEZeNbYqOSPcsqNYfeH25AiPs8ttrClZe1ImPtOes7tWfB2ebI71l8PqLOpfon2RzE1SOuqcW1pj1cfjVLfrciM/F9VCjSv6DUWSUb+/iISR1nrg4xbkSLa21xrRHXlNFoXGur3VUisbGu1CrHOhs1xlijH2sFLxyVHFtEqamSnaOHbeNGDBdxn8fWil83WSsp2Z6zOnNGGXXI4TqV1PWEvQgfNHrubVX7NyYc68WqMdF0bdyIdjntSW5cJ653OzeuxbW2s3br4CVbckSzKdfflQI2E+NbrBCT7JDsGbaoHKvavzHhWJMshy2h2OT6twibpAtZ09psc7h+gdTG4SDu89gKM7Gq8d1Sx3rWzbimiG+xggmrOaNK0YSeb7GCiVV7FD2OY1XfHla9sENMODZfx25F5uP7qFCkf0xykqyWIj07Kj5JkZ6xPr4atqeWVfBi7WHVCzsk2Sixctji+VG+4P8NCyZW7Vrx+eT07NeT6Q5xn8mvGCvk/GsFz1rE1SOuKeKaWnMIC5JVlljVpDYajfJcU9A/tbGPUucZa1Q15BvDgq/mKNVHhVg5ycaWFZswdT7WmBwVtqROWFDOg+ZIPnr4r5dTjY0yyf4h3+gLMclG3zP8N6yGBRONb3L1bvk5ZM3N2o1rapfVPjTEfWfhSrJy+G9YkNQOXqwlOWFYkLL9Tc5UkjMT/etZe5t7l7txjcbye13DeWufi8Z977m157nWiOsXzN9Y1bOW8N9kwVdzhH1U9lxTxDV1mlvHDlliE2bNx9qTY5OTZ3E9MqR2sAlDbkQkp1qwpwomtepZS/hvfkFSyyrEJBt9TyuIlaORrjHtD7j5f0vwBx3M39Xbhe2pfaJJ27gRQ0TcdxauGyuE/4YFSe3gxVqSE4YFKdvfKzUT/Wus0cSq0VbQ2jR8+fjmoia/4TT5GYbzsUaTbBHfGBZ8NUfHPuqQ08fGeq61pCIT+j7Jzl0/bkzqfPJnnjM2NiqrqoKVfYtYo0m2iG/0BSv7FskqS1Y1WRCVjaub5B+wWtpC3kmZtl04Ntkzmjql0ZWGpS3ur7uBuI8L11OskNWeWpCwbFLHqpDD97GChGUvtadJTps6B2lrb98MWptJ6//2tE+dbVj15bBnrNEXfDUUNqZ2COV3iI1VNb9/qoKT5HTr4kGTsmaSP/Pizyq1Gv7rhVVfTu0fFqxsBQnLJuoYbxRr9GPDqiRbWpJ/wGqR+HG9K2XzfZpTt/ePVUM5owZB8b5h09QtW7ZP7yDu20Vrrbky/CpJrfqCr0pqOWw0yZaYrA6p8w/5xuTYrHkmtfVMxL3VbDOJHdvbhOHksZawEPKNYcFXQ2FjVtmkTu4VmXlqn5B1KNgtVcdpi+h6/gUnTHazlvBfE2sJCyHf6AtW9i0Slr1YN18N2Sjx5bDRS/0DDkM/dapUzSlaz8RaYnwHL6vngBD3ndkq8SsmpyAqh1xrJL+aqos+vT+o19ZZG0TrfW+8fN7y5bGNJZL6WGpMtoctyXJ+f8ma3CRbQvljRR2KzyGnZ/GZdKeX+RccG+uWXzVqTLaHLbGyVWONrhSIOh7vGf4bFkysGpf5B9z8K1fed5g8TeokqU+vi5n3grjvLGv1pK4/k9OSM1VSF33CavKxiszQpPS0I55IcKDf3Cp8+IfUzZUCWY3GytYovpzaaPKrkmyJ6aVDkYdTS7IxlD+2o47zlx47RI/Q1iHZP9kiWY3GytYoYaOxcjSyjY0NWaMfawUTqya0/QFHlZbor1z/R2OKyuoftlu57Jx7R9x35tdKWPBlCcsmv6U5caJDquLdPNcUCavJsUnWx7imAtpP8xwXzsTmKa4ecU0R3+ILvmysRVy9JbUllGwx1tm4poAbkTZ/E+sW8u05fUzHDjlsWnH1dm5cLte1xbV2ej5ZfcJG6yOuHnFNEd/iC1b2Bc9aQtZoY41vDNko45oCbkQk6w/Yc9O0c+MCWe2edfBc6xAR9+iNe8sLVFOd/oCJewCoBeIeAGqBuAeAWiDuAaAWiHsAqAXiHgBqgbgHgFog7gGgFoh7AKgF4h4AaoG4B4BaIO4BoBaIewCohVjcbyDuAWAsteJ+enrHHcQ9AIwt4h4AaoG4B4BaIO4BoBaIewCoBeIeAGqBuAeAWiDuAaAW2uJ+3XriHgDGk8X9zZuntxH3ADDGiHsAqAXiHgBqgbgHgFog7gGgFoj7ymg0Gq5UA2P8Ymu1HjFSiPvKIO6T1K0gN8EI6PHJjNRrQbUQ95Vh23kzulqsfSzZq7OXaaw9Jtme2jNszJpVKZpJFtcj4pqKcdMEijcCRRD3pd27XFvc8ntdbYCaGZDgxo0d9/LauXHZkn1Spwobi8w2RpPEuBGtUa5STPH+qT3LPhzgEfddiAJ/KInv1WojL/5ikz1Tpw0b+7gku5tV8ak6vhagFOK+O8+tPU/b3ZASv1ZbeKkXq84FuQkKzL9jB1O8WxGud7uw3boludFAAcR91zonfsppn2bTeWufs4rNweTNx3WJuKbi7K2I6bx7Cns3+efaQfhSgsfptARS2ByMa8qW7JM6VdjYcbbdPW5x+dNqbCo3ureHRs0R973olPiJtAuyLpo2zMWM2cQ2b19VwVg1XfsTyH6QFNHzK5b20aMc7xo+aPsTkGZD9lxjL8dXVTBW9Yq0SNiY2iGmY58iM8lSfNrUnr08NGqOuO9RfuK3Z3pb1uXnnpPcttViXD1P7NFLSeR0ppRHCV5bzhKIS76o6IU2uXpCclRq57AxZ25efp8icxB1K8tN2ZJskdRGoAjiPk+UecVkZFiUdqkJH43Jzj7RWFeKNHtHLbH2TG2PXU5KhGdJe5SwrW18dtrHXlT0Wju/2OTY1P5hY/4MvZxuBeeQyqbt5Tn08uioOeK+R1Ga5SRjkHbJrAt2Jx2yVT1cqfgGHz10scxu15bQnaQ+SvhSc5dAquIvVmMLchMUXno53QrOIclPGJtD1gzDdpWNqwPlEfe9iJKsQ6L6tMvOOptN9nxiG3nRbT7I2VIKhrKT9ijtbQWWQKDUi02OTe0fNubP0Cv7uPnUPzaJr8baQzmjgC4Q912zkO589OzSbm1u1mUnYQ/bfHOmpQ/vS08Uvb72CWKvptASiJR9scn+qXMIG2Mdsh4xq93kjw2pp3WOTZLaGJM/FigrFvcTxH0xRbM+EiWohFmntuNVl4epSajpXKm82LM8/pjRM0p7wOxnkjlJ/FHSFk3aEkijLq5UTLJ/6hxijWG17CN6HSdUh7BPsn+yJaZjB6CUKO5vuXnztm07bifuC7LwKpj1TakTWCw6uTmo8a5UXtujhMGf+gLaekf8E8uaxLTyPJLyYoovMnVzpU5SexZp9NXij5VKkxefg+8ZTuULWTp2AIoj7kvLz71UXUwSo+lTudElRale7vl0MUmo1BKwl5bkRrckW6RgY3N23S69GJuVuHoG16n8M7EOSW40UBhxPwS9p31/NZ9PyafTxSSh/i+BrLwL21X2XNPQuYfv9ASK9AF6RNwPXHRc3Omk9RA1n0/Jp9PFJKFRWwJAPRH3AFALxD0A1AJxDwC1QNwDQC0Q9wBQC8Q9ANQCcQ8AtaB4n7jplsmpbVtvJe4BYHwR9wBQC8Q9ANQCcQ8AtUDcA0AtEPcAUAvEPQDUAnEPALVA3ANALRD3AFALxD0A1AJxDwC1QNwDQC0Q9wBQC8Q9ANRCFPc3R3F/G3EPAGOLuAeAWiDuAaAWiHsAqAXiHgBqgbgHgFog7gGgFoh7AKgF4h4AaoG4B4BaIO4radmyZa4EAMUQ95XUaDRcCQCKaYv7a68n7quBuAdQluL9xo03b5ratmU7cV8dxD2AsmoZ9/cuV1xGzlv7nGurFj11V4I5vk4ru1KBAath3CsYKh8ICjVXQptxWLnAgNQv7sciEIj7VIQ9kIO4ryTiPoXW7PJ7XRlAQv3i/rm153EyZ/w0VythD+SpX9xbMjhVzX09dVdCJFinDWIfSFXHuB8DyjRXAoBiiPtKIu4BlDU/cX/4m6+5EnJlLSjivj5ePPodVwJ6M+y4f+Xbr6/bNXvhqv2vHfuua0I2LauLr3/kqblXXL0lNe5f/+4/7Xhw7vzL97Fsx4ZWpTaWK3d+VRuOawK6Nby4tzDS3+6W+59X2bWik8e+9vLyaw5eNv2V8CgvGfcHn3npotUHYt0wBrSxaJPRXpwNBz0aUtwrgxRGv/6Xexi6HpZ+bu+ex79hyzOMey3bz25+XB2UCJdMPsYwloN2+VrFOlriRCi6Nryj++ePfEt/tZ+eeHT28KuuCQXo7fzE7me1nd/z6GHXlDi6f+CpI+qgHaoKT829wjBmg1a91i/bDnoUi/sbBxf35uAzL+kP98qdX+VtaRE6nNcx++Se52Kn45Mnc/xb/h0PzrkmjIXkzh7oThT3k5umtm7ZvnMYcS8KppmDL3A5sQjFfeqb99RLtfLKt19fPfM0y3ZsaFVq/80KRV/MQ9yjd1lxDwBZiPtKIu4BlEXcVxJxD6As4r6SiHsAZRH3lUTcAyiLuK8k4h5AWcR9JRH3AMoi7iuJuAdQFnFfScQ9gLKI+0oi7gGURdxXEnEPoCzivpKIewBlEfeVRNwDKKst7q+5jrivBuIeQFmK9xs2TG66ZeuWaeK+Ooh7AGUR95VE3AMoi7ivJOIeQFnEfSUR9wDKIu4ribgHUBZxX0nEPYCyiPtKIu4BlEXcVxJxD6As4r6SiHsAZRH3lUTcAyiLuK8k4h5AWcR9JRH3AMqKxf0NxH0lEPcAyoriftOmW7Zsmd5B3FcGcQ+gLOK+koh7AGUR95VE3AMoi7ivJOIeQFnEfSUR92Pv9e/+01Nzr2iYOfjC+//dyvf+2h8t+vhVGt7xU4u19uXc95zjugLFEPeVRNyPh9nDryrQ9zz+jS33P6/hksnHNFy4av+v/+WepZ/ba9WJ3c+e88GP3fynF9z/J7+oYe5TZ3z94lM08DeAsoj7SmJTr4rD33xNgX7wmZcs0C+b/ooSfPk1BxXoGj498aiqq2eetrF2OP/Kt193E7dodVvEhwN/AyiLuK8kNvXRoXS2mN7x4JwiW9ltR+UW6Ep2lZXyFujKffXUPsBNXAxxj74g7iuJTX2Y/Gn0ex49rMie2P2sBfr5l+9ToF+4ar9VJ/c8p7F7Hv+GdXYT9wNxj74g7iuJTb3vnj/yLWX0A08dscPwz25+XAl+0eoDCnR/Gn3drlmNmjn4ggX6a8e+6yYeMOIefUHcVxKbehdePPodZfRjX3vZAv3KnV9Vgl98/SN21kUFVdVoY9VNnTWJm3heEffoC+K+ktjUU+lw24677TS6DsbtqNwCXYfqKuuw3QJdB/LqqYN6N/EII+7RF8R9JdV5U7dAtw8vTu55zgLdPrx4/uX7rGqn0e959LB1dlNWFnGPviDuK2m8N3U7je4/vGin0f2HFy3Q7cOLOoq3QE9+eHGcEPfoi7a4v3odcV8NVd/U/YcXLdDtNPqnJx61QLfT6P7Di3YaveyHF8cJcY++ULyv37Dpppu3bN5G3FfH6G/q4W8AKLL9hxeXfm6vAt1/eNEC3U6jzx5+1U2MdsQ9+oK4r6QR2dQL/gaARvkPL2o34CZGYcQ9+oK4r6Shber2GwD+w4vd/QYAekTcoy+I+0rq46Ze5DcA/IcXu/sNAPSIuEdfzFvcP/HEEytXrlwcWLFixe7du91o5Cq7qVugz9dvAKBHxD36Yh7ifmZmZsGCBQsXLlyzZs2+wPr165csWXLmmWeq4LoiQ3JTz/kNAA0W6PP1GwDoEXGPvhhq3B87dmxpZHZ21jUlHDlyRIf5ixYtOnr0qGtC5MWj33nPe96rjTzmh955tgJ9lH8DAD3SWo5lvQY1utFAMcOL+7m5OYW4Du1dPdehQ4d0+K9JXL0e/G8A2IcXk78BoC38/z19T2xgsx97xD36Ykhxr+N6xfcTTzzh6gXY7kEH+64+LizQ838DwD68mPwNAOK+noh79MWQ4n7ZsmWTk5OuUti+ffuWLFmiXYWrV8TgfgOAuK8n4n50FFns6jOaa2cYca+Deh3au0pJK1euXLNmjauMjNhvANiHF4fwGwD6G4plvYbR/MNCH2kVx7JeA+t9XhRf7CO4goYR92VP44SOHDly1llnDf8Av9RvANiHF4fwGwD6A4plvQY2+7GnVRzLeg2s96HRos7hOlVBLO7X9z3uZ2dnFyxY4CpdueCCC6anp12lr+w3APyHFy3BR/k3APS3Fct6DdX6g0MXtIpjWa+B9T404aKOLfZqrYVW3G8eVNxfGnGVrkxOTi5btsxVSkr9DQB/AyP7DQD/4UUL9FH+DQD9bSnft/7Nn5+74Mc1/NWn/sNrj8+w2Y89rWLl+wMXnvwbZ5/wU2/7/l/5sRPu/p2TWe9DEy7q2GJPXQsju2oGHvdLlizp8buy+e8PuvgNgErcwCiV/owW/+LPnvbm5pGdnPyGk37irB9VwY3GmNIqvvpfv/GMk78vWu1Np72xWXajMWDhoo4t9tRRyVWTbJkXA4/7Xk7cm6NHj/7wPztHMW2/AeA/vFjD3wDQH81b3vwm/euddOKJ+teNbtfjmyqMDq3i06N8j9m3b5/rgUHSonalRHCnjor1MamNQzbwuD/zzDN7/+z8ks/s/s3/9qWPfP7+ZasP/PF1h9bdPXvbw//49Zf/rxtdG/qLSeVGt8tqR+XYWk7q+gNvKMUt7gy+jxUkLHupjUM28LhfsGBBzk8mFHHs2LF3nfsrl00/+buXP/BvL7v/967cf/4V+37z0ua5mt+4dM9vf+5LF60+8AdXP7z6jqdvuPd/2umaEf/xAH8CSoP/gGbHxuePfKv5x6Uj+pNP/cGzzrXhtDPPtj8j/41c66kWtScbU3tWqFFr1s7L2Tu5wTXq0X3jzMEX5rcxWu3N9X7OBz9mw1nv+4ha3vSmN6VO/plLL0s26m/J3gdruHLnV0e2UXyjBtc0xEbliSul0WJ3pXZhe2qfrAmHqVDcaxvwC2XHg+6HDR772svJRvW0k+YaVs88rZbFixdfu6354cWwMbVnVuP0F7/iGy+b/srE7me1Pv7wmod94yeufvhz2568aM1DH7nsft+o4bc/t1dvBS5a/ZBv+ezmJyxJiz/6IBpTF13HRr1w/cWceOIJivhFH7/Khvf+2h/Zn5ECMeypFrUnG1N7VqiRuA/j/sQTT0ydXD2Tjf6zxRr8h4ZHsFF8owbXNMTG8JkkabG7UrZYnyKTDEehuNf24BdK/tFoUu/fk5qZmVm6dKmrtOhBlZ4Xrtqvg4IHnmo7WaQno7H6K5/84nMrJ/5+xbXNr7Mq+n9/1X4NF/x183OWv/1Xe/9045eVI+EZf+WLm8Wo0t/NO898m/713v7W0/WvG90uqx2VE63qFO9+97tdj3Ya5UrotyLLNtZndFZHobjvxb59+3SA7ypdWbFiRdZPIuvoQFmvxD//8n3rds0qst2IBB0Eaax9xF77if+86csfvaJ5pffjf/uQ3hZcfP0jn1hz4D+ude8Y/BGl3xPk7/CHRn83X9+/ZdG5C1SQBT/+rv/xhRtVcKPbZbWjcrQq7aM4Mddcc43r0U6jXAn9VnDZRuvHcU0jYOBxL71crT127NhZZ53VcXKl+T2PHlZGX7T6gA7Yc95txCjHleaKdfvAj30kX3uCT61/5D9t/PKfb2rmvsorb3Q/kGAf1bcfjrefMBvmnkB/Ov6rVVawshvdbqT+ztALrcqPvufE095wPPFPOan5rxudkDMKdTaMuF+zZs3KlStdpaSy07549Ds7Hpxbfs1BBffMwRde6eo7U3aeyj73ad/Mst9OUOHTGx5dfcfTV+58Sv+uuv2rzZb2n8rRWwdNpYfWHDS4OfaJNmPivoa0Kr9+8SmrfvkNb40+ev/mkxp/8gvNvHejE1j1SDWMuNcR+qJFi7r49L0O6hcuXNjdO4Pnj3xrYvezF67a/9nNj+95/Bs6/HcjeqD4ti/o2i/R652EUt6+yaXHuvbu2dse+sepvf9LHVRVowbbE1ifK6Ov72pvZHuC18v/HoM2Y+K+hrQq/W8nfPoXT9KgQs76ZdUj1TDiXubm5hTcpW5QpZ3E4sWLDx065OrdUkD7i7oHn3nJtfaPvzKsKNeuxQ727ZfrLd+1s9n75P9++Jn/Y1cO/NfE7B2D7Qn8z2faniBr56TNmLivIa1K4h69G1Lcy+7du3WMX/AGVdoxKOv7eKdyu6irVFXu69h80CfcY1eGFeh6XIW7nfBRox3j6y2I7S38j+PbnsC+MKx3D+GeQPstbcbEfQ1pVRL36N3w4l5mZ2d1jL9mzZr8HzSenp5esGBB78f1qV759uv3PHpYx+AKU2Vo8Yu6faF8V7jrccMrw9oTqGwn/e1rYnaexz7/6vcEeuugzTg17lO/XMY2Pza0Kol79G6ocS86bF+5cqXSXP/GzuZrZ3DFFVdo1AUXXND77y50ZF+usYu62gF0d1G3L+zK8J7odoaxK8P242524VdPWJtxatzbVHYtwd8BUe2a1vYEQ96rob+0Kol79K4Z9xObNk5unto6lLg3c3NzOsbXkb7+Lj0F/SWXXNLjLy50QUfc63bN6hBboanM7eIK6oAopu3KsF34tTT/wCc3Lfr4VVpc53zwY28/+xd+8Kxzzzj9dDdBxM4jaVAfv//QXk3T+h/xty+XPfDUEfYElaBVSdyjd/MT96HR+dPUgfDqmad1dKx/lbOudcTYuX6Lch37K7v9Eb2/MqwOeseQXLDak9meYEf0Y9Hqr6lsT6BBZQ3hl8tG/2vGNaFVSdyjd8R9nDJRYacktYu6IxV5P/OzP6XFFaPG1CvDGpW8MuxmlMb2BPYRI5uJXVrQML9fLoNWJXGP3hH3meyiriJPx7+KudiF0HmhZfXQMxs0+IKV3eh2ai91ZTiHwl3d7Htn9p0D/+Uy2xPY3Ab05TJoVRL36B1x39nhb76mLLto9QFFmyKvL9/Y6o6WVam4d6V2xa8Muwly2Z7A5hb7cpm9t7A9QS9fLoNWJXGP3hH3JSjadGx7/uX7lJIPPHVk+MmlZdV73GdRFievDNu3wOyEvsaqj+tdgL23sD1B6pfL7GKDBtsTzON+dMRpVRL36B1x342Dz7ykqLpw1X4dug7zoq6WVddxf+/yxnlrn7Pyc2vPayy/1/5vadaT7Mqw/86wMlphbZ/wiV0ZdhMUY7O1iw0abE+Q+uUy2xOUnf+Y0eoh7tE74r57Ohr1F3V1/DuETzRqWf37P/g3Pu7/8E8+cvm1n8xagPH243mvlI9KakkP+Q7sEz5Z3xnWgXyRK8NZXmz/cpntCWz+dtXBzjhpsHcbddgTaFUS9+jdQOJ+8eLF+oMbnFG7I7MSR8e/y685qEFJN7iLunrtZ/7oD94w/Rcq3PXgVae+5RT9q7Ib3S7R3sr7VtpHLdJV5KexszdaAllXhu2T/l2fBLOrDnbGSYO927A9gf9ymY2yS9CjcHW9L7SSiHv0jqP7ftIBvpLOTkcM4qKulpUO589Z8C4VfulDP6ej++Inc8Ry/njaO30O/RjLaDuDb5/0T70y3ON7I/soqgaLe7sEbZcfxuDLZVo9Pu7/+OdP+ot/QdyjG8T9QChQ7KKuAk754lp7pmWlfH/f+39aBR3m733i+lJxH+X98uWxtG/SiIHlfQYtovDKsN4YKZp7uTKcxU49adDbDs3Wdjn2cH5PYI9o1yG6Owc1UFqVPu5/9z0nrv7QG4h7dIG4HyxlvfJFub965unew0vLSvm+6Y6/VEGH+SqXi/so1v0V26jSMuSwz2CXcPt+ZTiL3xPYI9p1CDsHpSHcE8zvl8u0foh79I64Hwa7qKvsuKjkvRVjtKzuevCq3zr/l37kXW8/Z8G7Fv/qz+/c89dZCzC1vdurs/NpoFeGc4R7gtQvl9nXjO1klAY32QBoVRL36F0U9zdtnJya2norcT9wL7burahBMVH2KFXL6off8dYTTjxBBXPGW9+if93odint83DOZoAGfWU4hw7zNWf7mrGdjNJgewLbCdkT8HuCHp+DViVxj94R9/NDB/iKCcsmHfgXvKirZZXKjY4cOnRo4cKFKlj70qVL169fH42pheFcGc5hOyF7An5PYM/BrkzYWSl7R1JwT6BVSdyjd8T9PNMGryNB5b5S4GCneytqWaVyo1ss4tW+b9++s846K/9mMjWh5Zy8MmyfobKz8/26MpzDrkzYWSl7R+L3BKlfLvMHAVqVxD16R9yPBB3iKQW0tZ9/+b512fdW1LI64wdO1b/em055o/51o1ueeOIJpbzadZg/MzPjWpFgX+mys/OxK8OWvP29Mpwj9ctl9jVjHQos+vhVf/YXV67/s09o+K33nErcozvE/WjRAd09rXsrJi/qalldfu0n3/ZDZ6ggbz71TSv/6++p4EYHVq5cqfYlS5a4OgqzK8OWvKlXhtWuDkP7vKZ2Nj/23kVvP/sXzvngxzS88dS3Riu/ccZpp7oeCRrrSkCAuB9R/qKuUkY7ADvA1LKyD1+GQ+oCPHLkiA7wY7eHRC/8lWE7+s66MlzwMkzXli1bNjk56SoZ2KaQirgfdUqZddG9FT8b3Zo8lvUashbg3NycK2FgkleG7QyMCgO6Mkzco2vEfWU89rWXS8U95pEifkBXhol7dI24rxLivtL6cmWYuEfXiPsqyYp7JYWixHVCpZS9Mtxr3NsP4kXsG3etH0ptGq/v4SGOuK8SLatY1mtQoxLhota9FYfwqUEMQdaV4Q9/5Pe6j/tmnIc/mRSVj+e9mnzyYwzNc9wfPXp00aJFK1euVME1Idvpp5+mLTlGjTZ2Nrq3ohLhsnm6tyIGTfvy3/3oR6enp109g/4qXCmm/SeTWjnf+p+0H3fzGfeK+MWLFz8RUYHELy5ze44cjO6taD/D+dgQ762IQfjnP70g2q3Hqd31SNBYV4pJxL3VLOdJ+7E3b3F/7NixJUuW+PtS7d69e+nSpXzdv6DM7Tmgo/s9wb0Vh/a1IPRXM9rvXHp8+Om3NT7//mYh+28gc5Q/gZMsp98IAWNlfuJesa5wV8S7ekRvUS+44AJXQa4ice+9Et1b8eLrH1k+4HsrYhD6GfeiQ/qW4EC/mf0+/DGu5iHuU7PerFmzZuXKla6CbNpWXamMw617K9pF3UF//xN90QzmPsZ9hvbTPBhPbXG/9tphxL2yPud3uy655JIrrrjCVZChu7j37KLu+a17K3JRd5QNI+6bB/ek/fhTvF9/400bNk3dsmUocV/kU8NF+tRcj3HvKeuV+Beu2r+6H/dWxCAMI+5RD0ON+4I5nnO2B6a/2/NrrXsr2kXdwd36A10g7tEvw4v7FStWFL+tkhJ/0aJF/KBjlgFtz3ZRd3nr3opc1B0FxD36ZUhxf2nEVYo5evTowoUL+VnHVIPennWAr8N8+0kvHfhzUXceEffol2HEfRdZb5T1OsY/cuSIq6NlaNvzU8G9FR94ihUxD4h79MvA477rrDd84TbVkLfn16N7K9o3ddftmuWi7jAR9+iXwcb95OTksmXLXKVbfOE2ab62Z7u34iWTj6XeWxGDQNyjXwYY933JesMXbmPmfXsO7604c/AFfoZzcIh79Ess7q/vV9z3MesNX7gNjc72/PyRb03sfvbC6N6KXNQdBOIe/RLF/cYo7rf3Le5nZmaWLl3qKv3DF269EdyeH/vay/6i7sFnXnKt6Fk87n/yrY0rP0Dcowv9j/uBnmrnC7dmZLdnu6h72fRXlPvrds3OHn7VjUC34nH/Q6c0Jn6VuEcX+hz3Q7isumTJEr5wO/rb8yvffv2eRw9/euLRi1Yf2HL/81zU7Rpxj37pZ9zv27dPWTzoj9Bo/osXLz506JCr11KFtucXj35HcW8Xdbm3Yhdc3O/4cGPdh47HvarEPUrqW9wP8wPyepRFixbNzs66ev1UcXt+/si3/L0V9zz+DX6GsyAX94r4Hzi5sfU3XNy/7x3EPcrqW9xfeumlw/wy1Nzc3Jo1a1ylfiq9PR985qXVM09zb8WCXNxrWPLuxofPbsb9J36m8e7TiXuU1be4xzCNwfYc3ltRR/3cWzHL8bifXNJ480lu+Pz7iXuURdxX0jhtz3ZR1+6tuOX+5/kZzpjjca9Bx/XyS+9slol7lETcV9JYbs+Hv/ma4p57K8Y0892yXkf0P/EDjZNOaHzq51Lj/ujRo/YLsjZKZX5eECHivpLGMu49f2/Fy6a/wr0VXdz/l/c1TntDsyynnNT4w3P1v+vRMjs7e+aZZx47dsxGLVy4MOcuoagh4r6Skpv6WDr4zEv+3oq1vajbzPfJJY1TTmwWPCV+2t/AihUrLr30Uo2anp5W3LtWIELcV1Lqpj6u7N6KdlG3hvdWbIb7b53dOOH7m4V2rkfgyJEjZ5xxhkbpMJ+bwSGGuK+k1E197IX3Vtzx4FxNLuo2c/2db2n+m+B6tFuzZo1G9fcHCjEeiPtKytrUa0IH+JN7nrN7K479Rd1mrsfO5LS4Hu2OHTu2YMECLtIiibivpKxNvW6emnvFLuqO8b0Vm7n+w6c0/01wPRIG/UMmqCjivpJyNvV68vdWXD3z9JjdW7GZ6+f9SPPfBNcDKIa4ryQ29VR2UXfM7q3YzPU1v2wfxTnu5ObpHdcDKIa4ryQ29Xz+3ooaqn5vxWa437m08a9+7Hjin/j9jQVv1f+uB1BMW9yvuYa4rwY29YJ0gG/3VtQhf0XvrdjMd/tW7e/8ROOE72tWF70j/weQgVSK9+tu2Dixaepm4r5C2NTLemrulYreW7GZ7xb3sYG/AZRE3FcSm3p3/L0Vz798X1XurUjco1+I+0piU+/Ra8e+6++tOOIXdYl79AtxX0ls6v3iL+qO7L0ViXv0C3FfSWzqfefvrfjZzY+P1L0ViXv0C3FfSWzqg/PY1162eyuOyEVd4h79QtxXEpv6oPmLujren997KxL36BfivpLY1IfG31vxotUH5uXeisQ9+iUW99cR95XApj58Cvrw3opDu6hL3KNforjfMLHplpu3TBP3lcGmPo/s3ooXrto/nHsrEvfoF+K+ktjUR4HdW9F+hnNw91Yk7tEvxH0lsamPDh3dh/dW7PtFXeIe/ULcV9Lc3JwrYWTYvRUvvv6R/t5bkbhHvxD3QJ/5eyvaRd0ef4aTuEe/EPfAoNhFXX9vxe4u6hL36BfiHhg4u7fihav2d3FvReIe/ULcA0Pi761oF3UL/gwncY9+Ie6BYbOLuv7eivkXdYl79AtxD8wbu7fiRasP5NxbkbhHvxD3wPwL7634wFNHXGuEuEe/EPfAqLCf4bRv6q7bNWsXdYl79AtxD4wcu7fiJZOPXbT6wE9+6BOnbl8Wz3oNxD1KIu6B0fXi0e+c/S8v+MDlO99/xfRZE5e+cefvE/foGnEPjLRTT3+Lkv20M89+76/90Qc+uemkk09VVdTuegDFEPcAUAvEPQDUAnEPALVA3ANALRD3AFALbXG/+mriHgDGk+J93foNN950y+Rm4h4AxhdxDwC1QNwDQC0Q9wBQC8Q9ANQCcQ8AtRCL+3XEPQCMpVbc3zy5eRtxDwBji7gHgFog7gGgFtrifu211xP3ADCWFO/X3bBhw6ap5m/mEPcAMK4U79ffuNHF/dXr1hP3ADCWLO43Tk7dsmV745rrbiDuAWAsKd5v2LBp482bp7Zub1x7/Y3EPQCMJcX7jRsnN92ydWrbrY3rbthA3APAWFK8T9x0y+TU1i3TOxvrJzYR9wAwlhTvGyeb12m3br+tceNNNxP3ADCWFO92JmfbjtsbCn7VGRgYGBjGctCh/Zbpndt3zjQU/Bs2Ta2f2LRu/cTV69avvnrd36y++sqr1vz1qr+9/Mqr/vsVqz5/xZWXXc7AwMDAMHKD8lkpraxWYiu3ld7KcCW58lyprmz3h/Y7br+rMbV1uyX+DRuU+Buuue6GtdderwmuWnPN36xeq2HV367VXBgYGBgYRm1QPltQK7GV20pvZbiSXHnusn7r9q3bb9Oh/c6ZXQ2VVJ+c2rpxcurGm27WDuG6GzZoz6BptIvQxJb+DAwMDAyjNlhEK6ujlJ9QeivDleTKc6X68ay/4+477rrn/wNxPJDbVALOeAAAAABJRU5ErkJggg==',
      'images/tonyu2Logo.png': 'data:image/png;base64,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',
      'images/分割数指定の設定.png': 'data:image/png;base64,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',
      'images/画像の挿入.png': 'data:image/png;base64,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',
      'index.txt': 
        '\n'+
        '* サンプルを見る\n'+
        '\n'+
        '左の[[@blink プロジェクト一覧>#prjItemList]]からサンプルを選びます\n'+
        '\n'+
        '* 新しくプロジェクトを作る\n'+
        '\n'+
        '-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n'+
        '- プロジェクトの名前を入力してください\n'+
        '\n'+
        '* リファレンス\n'+
        '\n'+
        '-[[チュートリアル>tonyu2/チュートリアル]]\n'+
        '-[[用途別リファレンス>tonyu2/用途別リファレンス]]\n'+
        '-[[APIリファレンス>tonyu2/index]]\n'+
        '[[別ウィンドウで見る>http://tonyuedit.appspot.com/edit/doc/index.html]] \n'+
        '\n'+
        '* プロジェクトの保存について\n'+
        '\n'+
        '-作成したプロジェクトは今使っているブラウザ(localStorage)に保存されます．\n'+
        '-[[@blink ログイン>#login]]をすると，サーバにプロジェクトを保存し，他のブラウザとプロジェクトを共有できます．\n'+
        '-- GoogleまたはTwitterのアカウントが必要です\n'+
        '-ログイン後[[@blink メニューのログイン>#login]]から[[@blink プロジェクトの同期>#syncProjects]]を選ぶと，プロジェクトが同期されます\n'+
        '-- 同期には数分間かかることがあります\n'+
        '-- サンプルプロジェクト（1_Animation ～ 14_File）は同期されません．\n'+
        '\n'+
        '.'
      ,
      'novice/': '{"crash.txt":{"lastUpdate":1415480274000},"dec.txt":{"lastUpdate":1415480274000},"firstRun.txt":{"lastUpdate":1415480274000},"getkey.txt":{"lastUpdate":1415480274000},"inc.txt":{"lastUpdate":1415480274000},"index.txt":{"lastUpdate":1415480274000},"item.txt":{"lastUpdate":1415480274000},"key.txt":{"lastUpdate":1415480274000},"left.txt":{"lastUpdate":1415480274000},"new.txt":{"lastUpdate":1415480274000},"newFile.txt":{"lastUpdate":1415480274000},"param.txt":{"lastUpdate":1415480274000},"projectIndex.txt":{"lastUpdate":1415480274000},"say.txt":{"lastUpdate":1415480274000},"say2.txt":{"lastUpdate":1415480274000},"sleep.txt":{"lastUpdate":1415480274000},"sprite.txt":{"lastUpdate":1415480274000},"spriteMove.txt":{"lastUpdate":1415480274000},"toc.json":{"lastUpdate":1415480274000},"trouble1.txt":{"lastUpdate":1415480274000},"true.txt":{"lastUpdate":1415480274000},"udlr.txt":{"lastUpdate":1415480274000},"variable.txt":{"lastUpdate":1415480274000},"variable2.txt":{"lastUpdate":1415480274000},"variable3.txt":{"lastUpdate":1415480274000},"while.txt":{"lastUpdate":1415480274000},"xy.txt":{"lastUpdate":1415480274000}}',
      'novice/crash.txt': 
        '*キャラクタの衝突判定をしましょう\n'+
        '\n'+
        '次に，猫(Cat)がリンゴ(Apple)にぶつかると，リンゴを取る（リンゴが消える）ようにしてみましょう．\n'+
        '\n'+
        '[[@cfrag watchHit]] という命令を使うと，２つのキャラクタがぶつかったときに，\n'+
        '特定の命令を実行することができます．\n'+
        '\n'+
        '[[@plistref addw]]の[[@editadd]]で示した部分を追加してみましょう．\n'+
        '（まだプログラムは実行しないでください）\n'+
        '\n'+
        '<<code Game addw\n'+
        'siro=new Cat;\n'+
        'siro.say("いただきまーす");\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        'watchHit(Cat, Apple, hitCatApple);[[@editadd]]\n'+
        '>>\n'+
        '\n'+
        '[[@cfrag watchHit(Cat, Apple, hitCatApple)]]と書くと，\n'+
        '猫（[[@cfrag Cat]]）とリンゴ（[[@cfrag Apple]]）がぶつかったときに，\n'+
        '[[@cfrag hitCatApple]] という命令が実行されるようになります．\n'+
        '\n'+
        'ところで，[[@cfrag hitCatApple]] ってどんな命令でしょうか？\n'+
        '実はこの時点ではそんな命令はありません．この命令は自分で作ってあげる必要があります．\n'+
        'さらに[[@plistref addf]]のように追加してみましょう．\n'+
        '\n'+
        '<<code Game addf\n'+
        'siro=new Cat;\n'+
        'siro.say("いただきまーす");\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        'watchHit(Cat, Apple, hitCatApple);\n'+
        'function hitCatApple(cat,apple) {[[@editadd]]\n'+
        '    apple.hide();[[@editadd]]\n'+
        '}[[@editadd]]\n'+
        '>>\n'+
        '\n'+
        '実行すると，猫とリンゴが触れたときにリンゴが消えるようになります．\n'+
        '\n'+
        '最後に書いた[[@cfrag function]] で始まる部分は，\n'+
        '自分で新しい命令を作るための書き方です．\n'+
        'ここでは，[[@cfrag hitCatApple]]という名前の命令を作っています．\n'+
        'その後ろにある[[@cfrag (cat, apple)]] という部分は，この命令を実行するに\n'+
        'あたって，必要な情報を受け取るためのものです．\n'+
        'ここでは，「どのキャラクタと，どのキャラクタがぶつかったか」という情報を受け取り，\n'+
        'それぞれに，[[@cfrag cat]] と [[@cfrag apple]] という名前をつけています．\n'+
        '\n'+
        '[[@cfrag cat]] は，もちろん最初に作った猫ですが，\n'+
        'もうひとつの[[@cfrag apple]] は，そのとき猫に触れていたリンゴです．\n'+
        'それは[[@cfrag apple1]] かもしれないし，\n'+
        '[[@cfrag apple2]] かもしれませんが，とにかく猫が触れていたほうのリンゴに，[[@cfrag apple]]という名前がつけられます．\n'+
        '\n'+
        'そして，その[[@cfrag apple]] に， [[@cfrag apple.hide()]] という命令を行っています．これは，そのキャラクタ（ここでは[[@cfrag apple]]）を隠す（画面から見えなくする）命令です．\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'novice/dec.txt': 
        '*画像を左方向にも動かしてみましょう\n'+
        '\n'+
        '今まで，猫の画像は左から右にしか動いていませんでしたが，右から左にも動かすことが\n'+
        'できます．\n'+
        '\n'+
        '<<code Cat dec\n'+
        'x=300;\n'+
        'while(true) {\n'+
        '   go(x,100);sleep();\n'+
        '   x-=10;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'ここに出てきた[[@cfrag x-=10]]は，「xの値を10減らす」という命令です．\n'
      ,
      'novice/firstRun.txt': 
        '* プログラムを実行しましょう\n'+
        '\n'+
        '実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\n'+
        '\n'+
        '[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\n'+
        '\n'+
        '[[実行結果>firstRunRes.png]]\n'+
        '\n'+
        '[[うまくいかないときは>trouble1]]\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'novice/getkey.txt': '[[projectIndex]]',
      'novice/inc.txt': 
        '* 変数の値を増やしてみましょう\n'+
        '\n'+
        'さて，さきほどのプログラムをもう一度みてみましょう，\n'+
        '\n'+
        '<<code Cat 50to60\n'+
        'x=50;\n'+
        'go(x,100);sleep();\n'+
        'x=60;\n'+
        'go(x,100);sleep();\n'+
        '>>\n'+
        '\n'+
        '[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\n'+
        '[[@cfrag x=60;]]で，xに60覚えさせています．\n'+
        '\n'+
        'ここでは，\n'+
        '「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\n'+
        'という書き方を紹介します．\n'+
        '\n'+
        '<<code Cat 50to60inc\n'+
        'x=50;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        '>>\n'+
        '\n'+
        '[[@cfrag x+=10;]]という書き方が出てきました．これは\n'+
        '「今覚えているxの値に，10を足す」という意味です．\n'+
        '\n'+
        '[[@plistref 50to60inc]]では，\n'+
        '[[@cfrag x+=10;]]が実行される時点では，\n'+
        'xは50を覚えていますので，\n'+
        '[[@cfrag x+=10;]]が実行されると，50に10を足した値である\n'+
        '60を新しくxに覚えさせます．結果として，\n'+
        '[[@plistref 50to60inc]]は，\n'+
        '[[@plistref 50to60]]と同じ結果になります．\n'+
        '\n'+
        'これを利用して，xを100まで増やしながら，絵を動かしてみましょう．\n'+
        '\n'+
        '<<code Cat 50to100inc\n'+
        'x=50;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        '>>'
      ,
      'novice/index.txt': 
        '\n'+
        '\n'+
        '* プログラミングを始めましょう\n'+
        '\n'+
        '- まず，プロジェクトを作ります．\n'+
        '-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n'+
        '- プロジェクトの名前を入力してください\n'+
        '-- 半角文字で入力します\n'+
        '-- ここでは  Hello と入力してみましょう\n'+
        '\n'
      ,
      'novice/item.txt': 
        '* アイテムを配置しましょう\n'+
        '\n'+
        '猫を動かして，リンゴのアイテムを取るゲームを作ってみましょう．\n'+
        '\n'+
        'まず，アイテムのためのプログラムを作成します．\n'+
        '\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n'+
        '- ファイル名を入力します\n'+
        '-- ここでは Apple と入力してみます\n'+
        '\n'+
        '<<code Apple\n'+
        'go(200,150);\n'+
        '>>\n'+
        '\n'+
        '[[@blink 実行>#run]]メニューから，「Appleを実行」選びましょう．\n'+
        'すると，今まで通り猫の画像が表示されます．\n'+
        '\n'+
        'これを，リンゴの画像にしてみましょう．\n'+
        '\n'+
        '<<code Apple\n'+
        'change($pat_fruits);\n'+
        'go(200,150);\n'+
        '>>\n'+
        '\n'+
        '[[@cfrag change]]という命令は，画像の絵柄を変える命令です．\n'+
        '( ) 内に書くのは，絵柄の名前を指定します．[[@cfrag $pat_fruits]] は，\n'+
        '標準に用意されているリンゴの画像データを指します．\n'+
        '\n'+
        '\n'
      ,
      'novice/key.txt': 
        '* キーボードを使って絵を動かしましょう\n'+
        '\n'+
        'さきほどのプログラムでは，猫が勝手に外にでていってしまうので\n'+
        'キーボードを使って好きな方向に動くようにしてみましょう\n'+
        '\n'+
        '<<code Cat getkey\n'+
        'x=50;\n'+
        'y=100;\n'+
        'while(true) {\n'+
        '   k=getkey("right");\n'+
        '   if (k>0) {\n'+
        '      x+=10;\n'+
        '   }\n'+
        '   go(x,y);sleep();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行したら，まず，猫のいる画面をクリックしてください．\n'+
        'そのあと，右矢印キーを押すと，猫が右に動きます．\n'+
        '\n'+
        'ここでは，新しく2つの命令が出てきました．\n'+
        '\n'+
        'まず[[@cfrag getkey]]は，キーが押されているかを判定する命令です．\n'+
        '[[@cfrag k=getkey("right"); ]]は，右矢印キーが押されているかを判定し，判定結果を変数kに書き込みます．\n'+
        '-もし右矢印キーが押されていなければ，変数kに0を書き込みます．\n'+
        '-もし右矢印キーが押されていれば，変数kに0より大きい値を書き込みます（押されている時間が長いほど大きい値になります）．\n'+
        '\n'+
        'そして， [[@cfrag if]]という命令も登場しました．これは，次のような形式で使います．\n'+
        '\n'+
        '<<code\n'+
        'if ([[@arg 条件]]) {\n'+
        '  [[@arg 命令]]\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '-[[@arg 条件]]が成り立つ（正しい）ときに，  [[@arg 命令]]を実行します．\n'+
        '-[[@arg 条件]]が成り立たない（正しくない）ときには，[[@arg 命令]]を実行しません．\n'+
        '\n'+
        'ここでは，[[@arg 条件]]の部分に[[@cfrag k>0]]，[[@arg 命令]] の部分に[[@cfrag x+=10]] と書いてあります．つまり，\n'+
        '\n'+
        '-[[@cfrag k>0]]が成り立つ（正しい）ときに，  [[@cfrag x+=10;]]を実行します．\n'+
        '-[[@cfrag k>0]]が成り立たない（正しくない）ときには，[[@cfrag x+=10;]]を実行しません．\n'+
        '\n'+
        '[[@cfrag k>0]]が成り立つのは，右キーが押されているときです．また，[[@cfrag x+=10;]]は，右に移動する命令ですので，次のように動作します\n'+
        '\n'+
        '-右キーが押されているならば，右に動きます．\n'+
        '-右キーが押されていないならば，右に移動しません．\n'
      ,
      'novice/left.txt': 
        '*ゲームクリアの判定をしましょう\n'+
        '\n'+
        'すべてのリンゴを取ったら，猫が「ごちそうさま」といって，\n'+
        'ゲームクリアになるようにしましょう．\n'+
        '\n'+
        'それには，「リンゴがあといくつ残っているか」を数える必要があります．\n'+
        'そこで，リンゴの残り数を表す[[@cfrag left]]という変数を用意します．\n'+
        'リンゴは2つあるので，2を覚えさせておきます．\n'+
        '\n'+
        '[[@plistref addl]]の[[@editadd]]の部分を追加しましょう．\n'+
        '\n'+
        '<<code Game addl\n'+
        'siro=new Cat;\n'+
        'siro.say("いただきまーす");\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        'watchHit(Cat, Apple, hitCatApple);\n'+
        'left=2;[[@editadd]]\n'+
        'function hitCatApple(cat,apple) {\n'+
        '    apple.hide();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'さらに，リンゴを取った時に，[[@cfrag left]]の値を減らします．\n'+
        '\n'+
        '<<code\n'+
        '変数名--; \n'+
        '>>\n'+
        'と書くと，変数の値を1減らすことができます．\n'+
        '\n'+
        '<<code Game(hitCatApple内部のみ) adddec\n'+
        'function hitCatApple(cat,apple) {\n'+
        '    apple.hide();\n'+
        '    left--;[[@editadd]]\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'さらに，[[@cfrag left]] が0になったときに，猫に「ごちそうさま」というメッセージを表示させます．\n'+
        '\n'+
        '<<code Game(hitCatApple内部のみ) addif\n'+
        'function hitCatApple(cat,apple) {\n'+
        '    apple.hide();\n'+
        '    left--;\n'+
        '    if (left<=0) {[[@editadd]]\n'+
        '        cat.say("ごちそうさま");[[@editadd]]\n'+
        '    }[[@editadd]]\n'+
        '}\n'+
        '>>\n'
      ,
      'novice/new.txt': 
        '*複数のキャラクタを配置しましょう\n'+
        '\n'+
        'さて，Appleを実行すると，リンゴが表示されますが，猫は出てこなくなってしまいました．ゲームには，猫とリンゴが同時に出てくる必要があります．\n'+
        '\n'+
        'そこで「リンゴと猫を置く」ための別のプログラムを作りましょう．\n'+
        '\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n'+
        '- ファイル名を入力します\n'+
        '-- ここでは Game と入力してみます\n'+
        '\n'+
        'Gameに，次のように入力してみましょう．\n'+
        '\n'+
        '<<code Game\n'+
        'new Cat;\n'+
        'new Apple;\n'+
        '>>\n'+
        '\n'+
        '[[@blink 実行>#run]]メニューから，「Gameを実行」選びましょう．\n'+
        'すると，猫とリンゴが同じ画面に表示されます．\n'+
        '\n'+
        'ここで出てきた[[@cfrag new]] という命令は，\n'+
        '新しくキャラクタを作るための命令です．\n'+
        '\n'+
        '次のように，[[@arg プログラム名]]を指定します．\n'+
        '新しく出現したキャラクタは，\n'+
        '指定された[[@arg プログラム名]]のプログラムを実行します．\n'+
        '\n'+
        '<<code\n'+
        'new [[@arg プログラム名]];\n'+
        '>>\n'+
        '\n'+
        'なお，今後はしばらく Game を実行していきますので「実行する」と書いてあったら，\n'+
        '[[@blink 実行>#run]]メニューから，「Gameを実行」選ぶようにしてください．\n'+
        'F9キーを押すと，前回実行したプログラムと同じプログラムが実行されるので便利です．\n'
      ,
      'novice/newFile.txt': 
        '* 新しくファイルを作りましょう\n'+
        '\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n'+
        '- ファイル名を入力します\n'+
        '-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\n'+
        '-- ここでは Cat と入力してみます(後で猫の画像が登場します）\n'+
        '\n'+
        '* ファイルを編集しましょう\n'+
        '\n'+
        '- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\n'+
        '- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\n'+
        '\n'+
        '<<code Cat first\n'+
        'go(50,100);\n'+
        '>>'
      ,
      'novice/param.txt': 
        '*複数のキャラクタを配置しましょう(2)\n'+
        '\n'+
        '猫とリンゴが表示できたので，\n'+
        '今度はリンゴを2つ置いてみましょう．それには，Gameを次のようにすればよさそうですね．\n'+
        '\n'+
        '<<code Game g1\n'+
        'new Cat;\n'+
        'new Apple;\n'+
        'new Apple;\n'+
        '>>\n'+
        '\n'+
        '実行すると... あれ？リンゴは1つしか表示されません．\n'+
        '\n'+
        'ここで，Appleのプログラムを確認してみましょう．\n'+
        '\n'+
        '<<code Apple\n'+
        'change($pat_fruits);\n'+
        'go(200,150);\n'+
        '>>\n'+
        '\n'+
        'Appleでは，リンゴを(200,150)の位置に移動させる，と書いてあります．\n'+
        '\n'+
        '実は，リンゴは2つできているのですが，どちらも(200,150)という\n'+
        'ピッタリ同じ位置に重なっているので\n'+
        '１つにしか見えないのです．\n'+
        '\n'+
        'それでは，2つのリンゴを違う位置に表示させましょう．\n'+
        'それには，リンゴの位置が(200,150)ではなく，リンゴごとに変わるようにすればよいでしょう．つまり，200や150という「数」が「変わる」ようにする... そうです「変数」を使えばよいのです．\n'+
        '\n'+
        'そこで，Appleの[[@cfrag 200]]と[[@cfrag 150]] を，それぞれ変数[[@cfrag x]]と[[@cfrag y]]に置き換えてみましょう．\n'+
        '\n'+
        '<<code Apple xy1\n'+
        'change($pat_fruits);\n'+
        'go(x,y);\n'+
        '>>\n'+
        '\n'+
        '実行すると... あれ！今度はリンゴが1つも出てきません．\n'+
        '\n'+
        'なぜかというと，[[@plistref xy1]]の状態では，変数 x や y は何も値を覚えていないため，[[@cfrag go(x,y)]]と命令されても，どこに表示していいかわからないからです．\n'+
        '\n'+
        'かといって，[[@plistref xy1]]に[[@cfrag x=200]]や[[@cfrag y=150]]などの，変数に値を覚えさせる命令を書くわけにもいきません．なぜなら，xやy の値はリンゴごとに違っていなければならないからです．\n'+
        '\n'+
        'そこで，ここでは，Appleではなく，Gameのほうでリンゴに具体的なx や y の値を設定させます． \n'+
        '\n'+
        'まず，Gameを次のように書き換えます．まだ実行はしないでください．\n'+
        '\n'+
        '<<code Game\n'+
        'new Cat;\n'+
        'apple1=new Apple;\n'+
        'apple2=new Apple;\n'+
        '>>\n'+
        '\n'+
        '[[@plistref g1]]と変わったのは，[[@cfrag new Apple]]の前に，\n'+
        '[[@cfrag apple1=]]と[[@cfrag apple2=]]がついたところです．\n'+
        '\n'+
        '[[@cfrag apple1=new Apple;]]は，新しくできたリンゴのキャラクタに「apple1」という名前をつけています．同様に，2つ目のリンゴのキャラクタに「apple2」という名前をつけています．\n'+
        '\n'+
        '名前をつけることによって，それらのキャラクタに命令をしたり，キャラクタがもっている変数の値を変更させることができます．\n'+
        '\n'+
        '<<code Game a1a2\n'+
        'new Cat;\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        '>>\n'+
        '\n'+
        '実行すると，今度はちゃんとリンゴが2つ表示されますね．\n'+
        '\n'+
        '[[@cfrag apple1.x=200;]] という命令は，その1行上で新しく作ったリンゴのキャラクタ，つまりapple1 がもっている x という変数に 200 を覚えさせています．\n'+
        '\n'+
        '今，「キャラクタがもっている変数」という表現をしましたが，変数は名前が同じでも，キャラクタごとに違う値をもたせる（覚えさせる）ことができます．\n'+
        '例えば，[[@plistref a1a2]]では，apple1 の もっている変数xの値は200ですが，apple2 がもっている変数x は300になっています．\n'+
        '\n'+
        '[[キャラクタごとに変数の値は異なる>apple1apple2.png]]\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'novice/projectIndex.txt': 
        '\n'+
        '* 目次\n'+
        '\n'+
        '<<toc\n'+
        '-[[新しくファイルを作りましょう>newFile]]\n'+
        '-[[プログラムを実行しましょう>firstRun]]\n'+
        '-[[値を変えてみましょう>sprite]]\n'+
        '-[[画像を動かしてみましょう>spriteMove]]\n'+
        '-[[画像をもっと長い時間動かしてみましょう>variable]]\n'+
        '-[[画像をもっと楽に動かしましょう>variable2]]\n'+
        '-[[変数の値を変えてみましょう>variable3]]\n'+
        '-[[変数の値を増やしてみましょう>inc]]\n'+
        '-[[繰り返しを使ってプログラムを短くしましょう>while]]\n'+
        '-[[ずっと繰り返すようにしましょう>true]]\n'+
        '-[[画像を左方向に動かしてみましょう>dec]]\n'+
        '-[[画像を縦や斜めにも動かしてみましょう>xy]]\n'+
        '-[[画像をキーボードで動かしましょう>key]]\n'+
        '-[[画像をキーボードで上下左右に動かしましょう>udlr]]\n'+
        '-[[アイテムを配置しましょう>item]]\n'+
        '-[[複数のキャラクタを配置しましょう>new]]\n'+
        '-[[複数のキャラクタを配置しましょう(2)>param]]\n'+
        '-[[メッセージを表示しましょう>say2]]\n'+
        '-[[キャラクタの衝突判定をしましょう>crash]]\n'+
        '-[[ゲームクリアの判定をしましょう>left]]\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'novice/say.txt': 
        '[[前へ>sprite]]\n'+
        '\n'+
        '* メッセージを表示させてみましょう．\n'+
        '\n'+
        'プログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\n'+
        '\n'+
        '@@@@\n'+
        'go(50,100);\n'+
        'say("こんにちは!!");\n'+
        '@@@@\n'+
        '\n'+
        '注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\n'+
        '\n'+
        '[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\n'+
        '\n'+
        '[[次へ>sleep]]'
      ,
      'novice/say2.txt': 
        '* メッセージを表示しましょう．\n'+
        '\n'+
        'ゲームスタートしたときに，\n'+
        '猫に[[@figref itadaki.png]]のようなメッセージを表示させてみましょう．\n'+
        '\n'+
        '[[メッセージの表示>itadaki.png]]\n'+
        '\n'+
        '\n'+
        'それにはまず，猫に名前をつける必要があります．\n'+
        'なんでもかまいませんが，白いので[[@cfrag siro]] と名前をつけましょう．\n'+
        '\n'+
        '<<code Game\n'+
        'siro=new Cat;\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        '>>\n'+
        '\n'+
        'そして，[[@cfrag siro]]にメッセージを表示させます．\n'+
        'メッセージを表示するには，[[@cfrag say]]という命令を使います．\n'+
        '\n'+
        '<<code Game itadaki\n'+
        'siro=new Cat;\n'+
        'siro.say("いただきまーす");\n'+
        'apple1=new Apple;\n'+
        'apple1.x=200;\n'+
        'apple1.y=150;\n'+
        'apple2=new Apple;\n'+
        'apple2.x=300;\n'+
        'apple2.y=100;\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '命令を実行するとき，実行する相手のキャラクタを指定するときは次の形式を使います．\n'+
        '\n'+
        '<<code\n'+
        'キャラクタ名 . 命令名 ( 引数  )\n'+
        '>>\n'+
        '\n'+
        '[[@plistref itadaki]] では，キャラクタ名は [[@cfrag siro]]，\n'+
        ' 命令名は[[@cfrag say]] です．つまり[[@cfrag siro]] に対して，\n'+
        '[[@cfrag say]]という命令を行わせています．\n'+
        '\n'+
        'そして，引数の部分に，表示させるメッセージである[[@cfrag "いただきまーす"]] という文字列（文字が並んだもの）を指定しています．文字列は [[@cfrag "]]で囲む点に注意してください．'
      ,
      'novice/sleep.txt': 
        '[[前へ>say]]\n'+
        '\n'+
        '*メッセージを順番に表示させてみましょう\n'+
        '\n'+
        'プログラムは上から順番に実行されます．\n'+
        '\n'+
        '今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\n'+
        '[[@plistref nonsleep]]を入力します．\n'+
        '\n'+
        '@@@@nonsleep\n'+
        'go(50,100);\n'+
        'say("こんにちは");\n'+
        'say("さようなら");\n'+
        '@@@@\n'+
        '\n'+
        '実行してみましょう.\n'+
        '\n'+
        '[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\n'+
        '\n'+
        'あれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\n'+
        '\n'+
        '実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\n'+
        '\n'+
        '- 猫の絵を表示する\n'+
        '- 「こんにちは」と表示する\n'+
        '- 「さようなら」と表示する\n'+
        '\n'+
        'と実行したのです．しかし，コンピュータはとても高速に動作しているので\n'+
        '「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\n'+
        'と表示してしまっています．\n'+
        '\n'+
        'これでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\n'+
        '\n'+
        '@@@@sleep\n'+
        'go(50,100);\n'+
        'say("こんにちは");\n'+
        'sleep(30); // 追加\n'+
        'say("さようなら");\n'+
        '@@@@\n'+
        '\n'+
        '実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\n'+
        '\n'+
        '[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\n'+
        'つまり，プログラムの実行を少し待ってもらいます．\n'+
        '後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\n'+
        'フレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\n'+
        '\n'+
        'sleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\n'+
        '\n'+
        '- 猫の絵を表示する\n'+
        '- 「こんにちは」と表示する\n'+
        '- 30フレーム（1秒ほど）待つ\n'+
        '- 「さようなら」と表示する\n'+
        '\n'+
        '\n'+
        '[[次へ>spriteMove]]'
      ,
      'novice/sprite.txt': 
        '* 値を変えてみましょう\n'+
        '\n'+
        'プログラムは，命令を実行します．\n'+
        'ここでは，go という命令を使って，画面に絵を表示させています．\n'+
        '\n'+
        '@@@@\n'+
        'go(50,100);\n'+
        '@@@@\n'+
        '\n'+
        'ここで， 50 や 100 などの数値を別の数値に変えてみましょう\n'+
        '\n'+
        '@@@@\n'+
        'go(150,100);\n'+
        '@@@@\n'+
        '\n'+
        'もう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\n'+
        '\n'+
        '画面上の位置を決めるには，2つの数値が必要になります．\n'+
        'それは，「横の位置」と「縦の位置」です．\n'+
        '-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\n'+
        '-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\n'+
        '\n'+
        '横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\n'+
        '\n'+
        '(横の位置,縦の位置)\n'+
        '\n'+
        'という形式であらわします．\n'+
        '\n'+
        '例えば(50,100) という座標は，次のような位置をあらわします．\n'+
        '-画面左端から50ピクセル離れた位置\n'+
        '-画面上端から100ピクセル離れた位置\n'+
        '\n'+
        '[[座標>50_100.png]]\n'+
        '\n'+
        'いろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\n'+
        '\n'+
        '[[位置と座標>coords.png]]\n'+
        '\n'+
        'ここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\n'+
        '\n'+
        '命令は，次のような形式で書きます．\n'+
        '\n'+
        '<<code\n'+
        '命令の名前 ( 引数 , 引数 ...);\n'+
        '>>\n'+
        '引数（ひきすう）とは，命令を行うときに必要な情報をあらわします．\n'+
        '\n'+
        '例えば，[[@cfrag go(100,50);]] は [[@cfrag go]]という名前の命令を，\n'+
        '100 と 50 という2つの引数（どこに移動するか，という情報）を\n'+
        '使って行います．'
      ,
      'novice/spriteMove.txt': 
        '* 画像を動かしてみましょう\n'+
        '\n'+
        'go 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\n'+
        'これを利用して，画像を少しずつ違う位置に動かしていき，\n'+
        '猫が動くアニメーションを作ってみましょう．\n'+
        '\n'+
        '<<code Cat now\n'+
        'go(50,100);\n'+
        'go(60,100);\n'+
        'go(70,100);\n'+
        'go(80,100);\n'+
        'go(90,100);\n'+
        'go(100,100);\n'+
        '>>\n'+
        '\n'+
        '実行すると... 猫が動いていないようですね．いきなり(100,100)の\n'+
        '位置に表示されたようです．\n'+
        '\n'+
        '[[[[@plistref now]]の実行結果>noWaitCat.png]]\n'+
        '\n'+
        '実は，猫はちゃんと(50,100)の位置から始まって，(60,100)  (70,100) \n'+
        '(80,100)  (90,100) と少しずつ動きながら\n'+
        '(100,100)の位置まで移動したのですが，\n'+
        'コンピュータは，とても素早く命令を実行するため，\n'+
        '途中の動作が見えなかったのです．\n'+
        '\n'+
        'そこで，命令の実行を少しゆっくりに実行してもらいます．\n'+
        '[[@cfrag sleep]] という命令を使うと，途中で実行を待つことができます．\n'+
        '\n'+
        '<<code Cat now2\n'+
        'go(50,100);sleep();\n'+
        'go(60,100);sleep();\n'+
        'go(70,100);sleep();\n'+
        'go(80,100);sleep();\n'+
        'go(90,100);sleep();\n'+
        'go(100,100);sleep();\n'+
        '>>\n'+
        '\n'+
        '今度は，猫が少しずつ動く様子が見えると思います．\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'novice/toc.json': '["projectIndex","newFile","firstRun","sprite","spriteMove","variable","variable2","variable3","inc","while","true","dec","xy","key","udlr","item","new","param","say2","crash","left"]',
      'novice/trouble1.txt': 
        'プログラムを書き間違えていると，エラーが表示されます．\n'+
        '\n'+
        '[[文法エラー>syntaxError.png]]\n'+
        '\n'+
        '[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\n'+
        'セミコロンを追加して，再度実行してください．\n'+
        '\n'+
        '[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(goo ではなく go ）\n'+
        '正しい命令になおしてください．\n'+
        '\n'+
        '[[命令の名前が違うエラー>runtimeError.png]]\n'+
        '\n'+
        'なお，命令の名前は大文字と小文字が区別されます．[[@cfrag go]]の代わりに[[@cfrag Go]]と書くことはできません．\n'+
        '\n'+
        '[[戻る>firstRun]]'
      ,
      'novice/true.txt': 
        '* ずっと繰り返すようにしましょう\n'+
        '\n'+
        'さきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\n'+
        '\n'+
        'ゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\n'+
        '\n'+
        '<<code Cat true\n'+
        'x=50;\n'+
        'while(true) {\n'+
        '   go(x,100);sleep();\n'+
        '   x+=10;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\n'+
        '\n'+
        'もう一度F9を押せば，また同じ動きを見ることができます．\n'+
        '\n'+
        'while文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．'
      ,
      'novice/udlr.txt': 
        '* 画像をキーボードで上下左右に動かしましょう\n'+
        '\n'+
        'さきほどのキーボードを使って右に動かす仕組みを使って，\n'+
        '画像を上下左右に動かしましょう\n'+
        '\n'+
        '<<code Cat k\n'+
        'x=50;\n'+
        'y=100;\n'+
        'while(true) {\n'+
        '   k=getkey("right");\n'+
        '   if (k>0) {\n'+
        '      x+=10;\n'+
        '   }\n'+
        '   k=getkey("left");\n'+
        '   if (k>0) {\n'+
        '      x-=10;\n'+
        '   }\n'+
        '   k=getkey("down");\n'+
        '   if (k>0) {\n'+
        '      y+=10;\n'+
        '   }\n'+
        '   k=getkey("up");\n'+
        '   if (k>0) {\n'+
        '      y-=10;\n'+
        '   }\n'+
        '   go(x,y);sleep();\n'+
        '}\n'+
        '>>'
      ,
      'novice/variable.txt': 
        '* 画像をもっと長い時間動かしてみましょう\n'+
        '\n'+
        'さきほどの実行したプログラム([[@plistref 50_100]]は，\n'+
        '横の位置を50 から始めて，100まで動かしました．\n'+
        '\n'+
        '@@@@\n'+
        'go(50,100);sleep();\n'+
        'go(60,100);sleep();\n'+
        'go(70,100);sleep();\n'+
        'go(80,100);sleep();\n'+
        'go(90,100);sleep();\n'+
        'go(100,100);sleep();\n'+
        '@@@@\n'+
        '\n'+
        '今度はもっと遠くまで動かしてみましょう．\n'+
        '例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\n'+
        'sleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\n'+
        '\n'+
        '[[300まで動かすプログラム>50_300.png]]\n'+
        '\n'+
        '実行してみましょう．さっきよりも長く動きますね．\n'
      ,
      'novice/variable2.txt': 
        '* 画像をもっと楽に動かしましょう\n'+
        '\n'+
        'しかし，前のプログラムは書くのが大変です．\n'+
        'そこで，もう少し簡単に書くための工夫を行います．\n'+
        '\n'+
        'さきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\n'+
        '\n'+
        '@@@@\n'+
        'go(50,100);sleep();\n'+
        'go(60,100);sleep();\n'+
        'go(70,100);sleep();\n'+
        'go(80,100);sleep();\n'+
        '// 以下略\n'+
        '@@@@\n'+
        '\n'+
        '\n'+
        'ここで，「変数」という仕組みを紹介します．\n'+
        '変数とは，文字通り「変わる数」のことです．\n'+
        '\n'+
        '今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\n'+
        'そこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\n'+
        '\n'+
        'もったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\n'+
        '\n'+
        '@@@@\n'+
        'go(x,100);\n'+
        '@@@@\n'+
        '\n'+
        'ここで出てきた x が変数です．\n'+
        '\n'+
        '「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\n'+
        '\n'+
        'ところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\n'+
        '何が入っているのかは，最初に変数を使う前に決めないといけません．\n'+
        '\n'+
        '次のように[[@cfrag x=50;]]を追加してみましょう．\n'+
        '\n'+
        '@@@@firstVar\n'+
        'x=50;\n'+
        'go(x,100);\n'+
        '@@@@\n'+
        '\n'+
        'ここで[[@blink 実行>#run]]してみましょう．\n'+
        '[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\n'+
        '\n'+
        '[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\n'+
        '\n'+
        '[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\n'+
        '\n'+
        '@@@@\n'+
        'go(x,100);\n'+
        '@@@@\n'+
        'を実行すると\n'+
        '@@@@\n'+
        'go(50,100);\n'+
        '@@@@\n'+
        'を実行したのと同じ結果が得られます．'
      ,
      'novice/variable3.txt': 
        '*変数の値を変えてみましょう．\n'+
        '\n'+
        'さて，変数を使って，猫を右方向に動かしてみたいと思います．\n'+
        '[[@plistref c5060]]のように変更しましょう\n'+
        '（動いている様子が見えるように，[[@cfrag sleep();]]も忘れずにつけてください．）\n'+
        '\n'+
        '<<code Cat c5060\n'+
        'x=50;\n'+
        'go(x,100);sleep();\n'+
        'x=60;\n'+
        'go(x,100);sleep();\n'+
        '>>\n'+
        '\n'+
        'このプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\n'+
        'つまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\n'+
        '\n'+
        'そして，xに60を覚えさせています．\n'+
        '\n'+
        'このとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\n'+
        '実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\n'+
        '\n'+
        'つまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\n'+
        '[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\n'
      ,
      'novice/while.txt': 
        '* 繰り返しを使ってプログラムを短くしましょう\n'+
        '\n'+
        'さきほどのプログラムをよく見てみましょう．\n'+
        '\n'+
        '<<code Cat 50to100inc\n'+
        'x=50;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        'go(x,100);sleep();\n'+
        '>>\n'+
        '\n'+
        '最初の[[@cfrag x=50;]]を除いて，あとはずっと\n'+
        '\n'+
        '<<code \n'+
        'go(x,100);sleep();\n'+
        'x+=10;\n'+
        '>>\n'+
        'が繰り返されていることがわかります．\n'+
        '\n'+
        'このように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\n'+
        'と指示することによって，プログラムをもっと短くすることができます．\n'+
        '\n'+
        '[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\n'+
        '\n'+
        '<<code Cat firstWhile\n'+
        'x=50;\n'+
        'while (x<=100) {\n'+
        '  go(x,100);sleep();\n'+
        '  x+=10;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行してみると，先ほど同じように動きます．\n'+
        '\n'+
        'ここでは，「while文」という書き方を用いています．これは，次のような形式で使います\n'+
        '\n'+
        '<<code while文の書式\n'+
        'while([[@arg 条件]]) {\n'+
        '   [[@arg 動作]]\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\n'+
        '- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\n'+
        '\n'+
        '[[@plistref firstWhile]]の動作は，次のようになります．\n'+
        '\n'+
        '- [[@cfrag x=50;]] 変数xに50を覚えさせる\n'+
        '- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\n'+
        '-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\n'+
        '-- [[@cfrag x+=10;]] xを10増やす\n'+
        '\n'+
        'さて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\n'+
        '\n'+
        '<<code Cat w300\n'+
        'x=50;\n'+
        'while (x<=300) {\n'+
        '  go(x,100);sleep();\n'+
        '  x+=10;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\n'+
        'つまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\n'+
        '\n'+
        '以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\n'+
        'かなり楽になりました．'
      ,
      'novice/xy.txt': 
        '*画像を縦や斜めにも動かしてみましょう\n'+
        '\n'+
        '今まで，猫の画像は横にしか動きませんでしたが，縦にも動かすことができます．\n'+
        '\n'+
        '<<code Cat y\n'+
        'y=50;\n'+
        'while (true) {\n'+
        '  y+=10;\n'+
        '  go(100,y);sleep();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行してみると，猫の画像が上から下に移動します．\n'+
        '\n'+
        'さらに，横と縦に同時に動かすこともできます\n'+
        '\n'+
        '<<code Cat xy\n'+
        'y=50;\n'+
        'x=100;\n'+
        'while (true) {\n'+
        '  y+=10;\n'+
        '  x+=10;\n'+
        '  go(x,y);sleep();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行してみると，猫の画像が左上から右下に斜めに移動します．\n'+
        '\n'+
        '[[@plistref xy]]のように，\n'+
        '変数は同時に2つ使うこともできます．\n'+
        '\n'+
        '変数を区別するために，それぞれの変数には名前が必要になります．ここでは x と y \n'+
        'という名前の変数を使っています．\n'+
        '\n'+
        '名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．'
      ,
      'projectIndex.txt': 
        '[[tonyu2Logo.png]]\n'
      ,
      'tonyu2/': '{"$mouseX, $mouseY.txt":{"lastUpdate":1425457126000},"$screenWidth,$screenHeight.txt":{"lastUpdate":1425457126000},"$touches.txt":{"lastUpdate":1425457126000},"$touches2.txt":{"lastUpdate":1425457126000},"3Dキャラの出現.txt":{"lastUpdate":1425457126000},"3Dキャラの移動.txt":{"lastUpdate":1425457126000},"3Dキャラの表示.txt":{"lastUpdate":1425457126000},"3D弾を打つ.txt":{"lastUpdate":1425457126000},"3D背景.txt":{"lastUpdate":1425457126000},"Actor.txt":{"lastUpdate":1425457126000},"all.txt":{"lastUpdate":1425457126000},"allCrash.txt":{"lastUpdate":1425457126000},"api.txt":{"lastUpdate":1425457126000},"asyncResult.txt":{"lastUpdate":1425457126000},"BaseActor.txt":{"lastUpdate":1425457126000},"Boot.txt":{"lastUpdate":1425457126000},"classDef.txt":{"lastUpdate":1425457126000},"clearRect.txt":{"lastUpdate":1425457126000},"console.txt":{"lastUpdate":1425457126000},"cpats.txt":{"lastUpdate":1425457126000},"crashTo.txt":{"lastUpdate":1425457126000},"crashTo1.txt":{"lastUpdate":1425457126000},"die.txt":{"lastUpdate":1425457126000},"diffTonyu1.txt":{"lastUpdate":1425457126000},"draw.txt":{"lastUpdate":1425457126000},"extend.txt":{"lastUpdate":1425457126000},"file.txt":{"lastUpdate":1425457126000},"fillRect.txt":{"lastUpdate":1425457126000},"fillText.txt":{"lastUpdate":1425457126000},"forin.txt":{"lastUpdate":1425457126000},"frame.txt":{"lastUpdate":1425457126000},"FS.each.txt":{"lastUpdate":1425457126000},"FS.exists.txt":{"lastUpdate":1425457126000},"FS.obj.txt":{"lastUpdate":1425457126000},"FS.recursive.txt":{"lastUpdate":1425457126000},"FS.rel.txt":{"lastUpdate":1425457126000},"FS.text.txt":{"lastUpdate":1425457126000},"fs.txt":{"lastUpdate":1425457126000},"get.txt":{"lastUpdate":1425457126000},"getAt.txt":{"lastUpdate":1425457126000},"getButton.txt":{"lastUpdate":1425457126000},"getCrashRect.txt":{"lastUpdate":1425457126000},"getDown.txt":{"lastUpdate":1425457126000},"getkey.txt":{"lastUpdate":1425457126000},"getLeft.txt":{"lastUpdate":1425457126000},"getPixel.txt":{"lastUpdate":1425457126000},"getRight.txt":{"lastUpdate":1425457126000},"getUp.txt":{"lastUpdate":1425457126000},"hide.txt":{"lastUpdate":1425457126000},"ide.txt":{"lastUpdate":1425457126000},"index.txt":{"lastUpdate":1425457126000},"isDead.txt":{"lastUpdate":1425457126000},"kernel.txt":{"lastUpdate":1425457126000},"lang.txt":{"lastUpdate":1425457126000},"login.txt":{"lastUpdate":1425457126000},"Map.txt":{"lastUpdate":1425457126000},"mapEditor.txt":{"lastUpdate":1425457126000},"mapGet.txt":{"lastUpdate":1425457126000},"mapscrollTo.txt":{"lastUpdate":1425457126000},"MathMod.txt":{"lastUpdate":1425457126000},"onUpdate.txt":{"lastUpdate":1425457126000},"options.txt":{"lastUpdate":1425457126000},"Pad.txt":{"lastUpdate":1425457126000},"Panel.txt":{"lastUpdate":1425457126000},"play.txt":{"lastUpdate":1425457126000},"playSE.txt":{"lastUpdate":1425457126000},"png.txt":{"lastUpdate":1425457126000},"print.txt":{"lastUpdate":1425457126000},"resize.txt":{"lastUpdate":1425457126000},"rnd.txt":{"lastUpdate":1425457126000},"ScaledCanvas.txt":{"lastUpdate":1425457126000},"scrollTo.txt":{"lastUpdate":1425457126000},"set.txt":{"lastUpdate":1425457126000},"setAt.txt":{"lastUpdate":1425457126000},"setBGColor.txt":{"lastUpdate":1425457126000},"setFillStyle.txt":{"lastUpdate":1425457126000},"setFrameRate.txt":{"lastUpdate":1425457126000},"setPanel.txt":{"lastUpdate":1425457126000},"show.txt":{"lastUpdate":1425457126000},"sugar.txt":{"lastUpdate":1425457126000},"super.txt":{"lastUpdate":1425457126000},"t1compats.txt":{"lastUpdate":1425457126000},"TQuery.alive.txt":{"lastUpdate":1425457126000},"TQuery.apply.txt":{"lastUpdate":1425457126000},"TQuery.attr.txt":{"lastUpdate":1425457126000},"TQuery.die.txt":{"lastUpdate":1425457126000},"TQuery.find.txt":{"lastUpdate":1425457126000},"TQuery.minmax.txt":{"lastUpdate":1425457126000},"TQuery.txt":{"lastUpdate":1425457126000},"update.txt":{"lastUpdate":1425457126000},"updateEx.txt":{"lastUpdate":1425457126000},"waitFor.txt":{"lastUpdate":1425457126000},"waitmode.txt":{"lastUpdate":1425457126000},"あたり判定をつける.txt":{"lastUpdate":1425457126000},"すべてのオブジェクトを消す.txt":{"lastUpdate":1425457126000},"すべてのキャラクタに同じ動作を行なう.txt":{"lastUpdate":1425457126000},"とある計算.txt":{"lastUpdate":1425457126000},"オブジェクトに動きを追加.txt":{"lastUpdate":1425457126000},"オブジェクトに動きを追加する.txt":{"lastUpdate":1425457126000},"オブジェクトに名前を付けて値を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトに連続でぶつからないようにする.txt":{"lastUpdate":1425457126000},"オブジェクトのグラフィックを変える.txt":{"lastUpdate":1425457126000},"オブジェクトのグラフィックを変更する.txt":{"lastUpdate":1425457126000},"オブジェクトの大きさ、傾き、透明度を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトの大きさや傾き、透明度を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトの奥行きの設定.txt":{"lastUpdate":1425457126000},"オブジェクトをランダムな位置に表示する.txt":{"lastUpdate":1425457126000},"オブジェクトを動かす.txt":{"lastUpdate":1425457126000},"オブジェクトを宣言する際に値を設定する.txt":{"lastUpdate":1425457126000},"オブジェクトを消す.txt":{"lastUpdate":1425457126000},"オブジェクトを移動させる.txt":{"lastUpdate":1425457126000},"オブジェクトを表示する.txt":{"lastUpdate":1425457126000},"キャラクターを配置する.txt":{"lastUpdate":1425457126000},"クリックした時に動作をする.txt":{"lastUpdate":1425457126000},"ジャンプして着地する.txt":{"lastUpdate":1425457126000},"ジャンプして落ちる.txt":{"lastUpdate":1425457126000},"スコアを表示する.txt":{"lastUpdate":1425457126000},"タッチした位置にオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"チュートリアル.txt":{"lastUpdate":1425457126000},"テキストオブジェクトとして時間を表示する.txt":{"lastUpdate":1425457126000},"フレーム数を計り、そこから時間を計算する.txt":{"lastUpdate":1425457126000},"プログラムでマップを描く.txt":{"lastUpdate":1425457126000},"マウスの位置にオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"マウスクリックで力加減を判定する.txt":{"lastUpdate":1425457126000},"マップを描く.txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符).txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符)との同期.txt":{"lastUpdate":1425457126000},"ラインパネルと曲(音符)の同期.txt":{"lastUpdate":1425457126000},"ラインパネルと曲の同期.txt":{"lastUpdate":1425457126000},"ラインパネルの作成.txt":{"lastUpdate":1425457126000},"リトライする.txt":{"lastUpdate":1425457126000},"上下左右に移動させる.txt":{"lastUpdate":1425457126000},"乱数を使う.txt":{"lastUpdate":1425457126000},"他のオブジェクトを消す.txt":{"lastUpdate":1425457126000},"前へ.txt":{"lastUpdate":1425457126000},"力加減の判定方法.txt":{"lastUpdate":1425457126000},"力加減を弾に適用する.txt":{"lastUpdate":1425457126000},"効果音を鳴らす.txt":{"lastUpdate":1425457126000},"宣言する際にオブジェクトの値を設定する.txt":{"lastUpdate":1425457126000},"左右に移動させる.txt":{"lastUpdate":1425457126000},"座標を指定してオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"座標を指定する.txt":{"lastUpdate":1425457126000},"弾を撃つ.txt":{"lastUpdate":1425457126000},"当たり判定で壁にぶつかる.txt":{"lastUpdate":1425457126000},"当たり判定で当たったオブジェクトを消す.txt":{"lastUpdate":1425457126000},"当たり判定で敵に当たったらプレイヤーを消す.txt":{"lastUpdate":1425457126000},"当たり判定の大きさを変える.txt":{"lastUpdate":1425457126000},"当たり判定を変更する.txt":{"lastUpdate":1425457126000},"拡張機能.txt":{"lastUpdate":1425457126000},"文字をテキストオブジェクトとして表示する.txt":{"lastUpdate":1425457126000},"文字を画面下部に表示する.txt":{"lastUpdate":1425457126000},"文字を表示する.txt":{"lastUpdate":1425457126000},"時間を計る.txt":{"lastUpdate":1425457126000},"曲の作成.txt":{"lastUpdate":1425457126000},"曲の演奏時間の取得.txt":{"lastUpdate":1425457126000},"曲の演奏時間の図り方.txt":{"lastUpdate":1425457126000},"曲の演奏時間の図り方、タイミングチャート.txt":{"lastUpdate":1425457126000},"特定のオブジェクトの値を設定する.txt":{"lastUpdate":1425457126000},"特定の位置をクリックした時に動作をする.txt":{"lastUpdate":1425457126000},"特定の複数のオブジェクトに同じ動作を行う.txt":{"lastUpdate":1425457126000},"用途別リファレンス.txt":{"lastUpdate":1425457126000},"画像の挿入.txt":{"lastUpdate":1425457126000},"画面の上からランダムにオブジェクトを降らせる.txt":{"lastUpdate":1425457126000},"画面の上からランダムにキャラを降らせる.txt":{"lastUpdate":1425457126000},"画面端から出ないようにする.txt":{"lastUpdate":1425457126000},"疑似3D表示を行う.txt":{"lastUpdate":1425457126000},"確率でオブジェクトを出現させる.txt":{"lastUpdate":1425457126000},"確率でキャラを出現させる.txt":{"lastUpdate":1425457126000},"自分自身を消す.txt":{"lastUpdate":1425457126000},"自機の出現.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを出す.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを動かす.txt":{"lastUpdate":1425457126000},"複数のオブジェクトを表示する.txt":{"lastUpdate":1425457126000},"評価方法(1).txt":{"lastUpdate":1425457126000},"評価方法(2).txt":{"lastUpdate":1425457126000},"音ゲームの作成の仕方.txt":{"lastUpdate":1425457126000},"音符を降らせる.txt":{"lastUpdate":1425457126000}}',
      'tonyu2/$mouseX, $mouseY.txt': 
        '[[api]]\n'+
        '\n'+
        '*$mouseX/$mouseY\n'+
        '\n'+
        'マウスカーソルまたはタッチパネルの0番目の指のx,y座標を返します．'
      ,
      'tonyu2/$screenWidth,$screenHeight.txt': 
        '[[api]]\n'+
        '*$screenWidth,$screenHeight\n'+
        'それぞれ画面の右端と下端の座標を返します。\n'+
        '\n'+
        '使用例は[[オブジェクトに動きを追加]]などにあります。'
      ,
      'tonyu2/$touches.txt': 
        '[[api]]\n'+
        '\n'+
        '* $touches\n'+
        '\n'+
        'タッチパネルのタッチされた座標を返します．\n'+
        '\n'+
        '[[@cfrag $touches[i] ]]は，i番目（0が最初の指）の指がタッチした場所についての情報を格納するオブジェクトです．\n'+
        '\n'+
        '-[[@cfrag $touches[i].x]]と[[@cfrag $touches[i].y]]は，タッチされた場所のx,y座標です．\n'+
        '-[[@cfrag $touches[i].touched]]は，今その場所がタッチされたばかりなら[[@cfrag 1]]，タッチされ続けていればその[[@cfrag フレーム数]]，タッチされていなければ[[@cfrag 0]]を返します(2014/11/25 仕様変更)\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/$touches2.txt': 
        '[[api]]\n'
      ,
      'tonyu2/3Dキャラの出現.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・3Dキャラクターの出現\n'+
        '\n'+
        'Mainクラスに以下を書き込む\n'+
        '\n'+
        '<<codeMain\n'+
        'while(true){\n'+
        '    //キャラ出現率10％\n'+
        '    if (rnd(100)<10) {\n'+
        '        new Chara2{ ox:rnd(500)-250,oy:rnd(500)-250,z:1000 ,p:0,zOrder:0};\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '3D表示を行うためプレイヤーから物体までの距離を設定していく。\n'+
        '\n'+
        'ｚはキャラまでの距離を表しており、今回では1000としている。\n'+
        '\n'+
        'ox,oyは出現位置です。\n'+
        '-なぜ500や250などの大きい値を設定しているかというと、初期位置の変化をわかりやすくするためです。\n'+
        '\n'+
        '--近くの物体が１ｍ動くと動いたことはすぐにわかるが遠くの物体が１ｍ動いた場合はどうだろう？動いた気がする程度の物だろう。しかし遠くの物でも１００ｍ動いた場合はある程度はっきりわかることでしょう.\n'+
        '\n'+
        '-今回のキャラは1000先に出現したため、大きく場所の変動を行っている。\n'+
        '\n'+
        '前　[[3Dキャラの表示]]　次　[[3D弾を打つ]]\n'+
        '\n'+
        '追加要素　[[自機の出現と移動>自機の出現]]'
      ,
      'tonyu2/3Dキャラの移動.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        'キャラの出現を行ったため今度はカーソルキーでの移動を行う\n'+
        'ファイル「Pchara」を作成し下記を打ち込む。\n'+
        '\n'+
        '\n'+
        '<<codePchara\n'+
        '　　extends ThreeD;\n'+
        'while(true){       \n'+
        '    threeD();\n'+
        '      \n'+
        '    if(getkey("right")>0)	ox+=1000; //右キーを押したとき右に移動\n'+
        '    if(getkey("left")>0)	ox-=1000;\n'+
        '    if(getkey("up")>0){                   //上キーを押したとき上と奥側に移動\n'+
        '        oy-=300; \n'+
        '        z+=200;\n'+
        '    }\n'+
        '    if(getkey("down")>0){	\n'+
        '        oy+=300; \n'+
        '        z-=200;\n'+
        '        \n'+
        '    }\n'+
        '    update(); \n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'Mainのループ外に下記を書き込む\n'+
        '\n'+
        '<<codeMain\n'+
        '\n'+
        '  new Pchara{ ox:0,oy:10000,z:4000 ,p:2,zOrder:1,ptime};\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '画面下部にオブジェクトが現れカーソルキーで移動できる\n'+
        '\n'+
        '\n'+
        '今後移動はox,oyを使用する'
      ,
      'tonyu2/3Dキャラの表示.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '\n'+
        '*・3Dキャラの表示\n'+
        '\n'+
        '3Dの計算を関数化する\n'+
        '\n'+
        'メニューからファイルを選び、新規をクリック\n'+
        '\n'+
        'ファイル名「Main」で製作する\n'+
        '\n'+
        '同じように「ThreeD」ファイルを作る\n'+
        '\n'+
        '<<codeThreeD\n'+
        'function threeD(){\n'+
        '    hs=50*10/(50+z);      //大きさの計算\n'+
        '    scaleX = hs*0.2;            //大きさの代入\n'+
        '    \n'+
        '    y=oy*50/(50+z)+$screenHeight/2;\n'+
        '    x=ox*50/(50+z)+$screenWidth/2;\n'+
        '    zOrder=z;\n'+
        '    //ox,oy,zを使いx,yの位置を計算して代入する\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'ox,oy,zを[[３Dの計算>とある計算]]にあてはめ値を変化させるとあたかも3Dの世界にいるかのようにキャラが飛び出してくる。\n'+
        '\n'+
        '「Chara2」ファイルを作成する。\n'+
        '\n'+
        '<<codeChara2\n'+
        'extends ThreeD;\n'+
        'while(true){   \n'+
        '    threeD();  \n'+
        '    \n'+
        '    z-=10;  \n'+
        '    \n'+
        '    if(z<0){\n'+
        '        die();\n'+
        '    }   \n'+
        '    update(); \n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'キャラがプレイヤーに向かってくる処理を行う。\n'+
        '\n'+
        'zを-10ずつ行う事で向こうから手前に向かってくる。\n'+
        '\n'+
        'そして画面と重なったら消す処理を行っている。\n'+
        '\n'+
        '移動させたいキャラのクラスに上記のように書き込む。\n'+
        '\n'+
        'これだけではエラーが起きるため[[3Dキャラの出現]]でMainクラスに書き込んでいく。\n'+
        '\n'+
        '次　[[3Dキャラの出現]]\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/3D弾を打つ.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・3D弾を撃つ\n'+
        '\n'+
        '前回ではキャラを表示させたためゲームらしくするために弾を撃たせたい。\n'+
        '\n'+
        'メインのループ内に下記を打ち込む\n'+
        '左クリックをしたときnew Shotを実行する。\n'+
        '\n'+
        '<<codeMain\n'+
        'if(getkey(1)==1){\n'+
        '        new Shot{ ox:0,oy:0,z:0 ,p:2,zOrder:1};\n'+
        '    //左クリックをしたときnew Shotを実行する。\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '「Shot」ファイルを作成し下記を打ち込む。\n'+
        '\n'+
        '<<codeShot\n'+
        'extends ThreeD;\n'+
        'mx=$mouseX-$screenWidth/2;\n'+
        'my=$mouseY-$screenHeight/2;\n'+
        'while(true){\n'+
        '    ox=mx;\n'+
        '    oy=my;  \n'+
        '    threeD();　//前回の処理を再利用する。\n'+
        '    z+=10;\n'+
        '    zOrder=z;\n'+
        '    /*\n'+
        '    弾を撃つためメインのｚは手前に来るように0前後の値を入れ向こう側に移動するようにｚをプラスしていく。\n'+
        '    */   \n'+
        '    if(z>2000){\n'+
        '        die(); //ある程度弾が向こうに行ったら消す\n'+
        '    }  \n'+
        '    update(); // 追加\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行するとマウスでクリックした所にオブジェクトが出現し奥に移動していく。\n'+
        '\n'+
        '\n'+
        '前　[[3Dキャラの出現]]　次　[[あたり判定をつける]] '
      ,
      'tonyu2/3D背景.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・3D背景\n'+
        '\n'+
        'Mainクラスのループ外に下記を打ち込む\n'+
        '<<codeMain\n'+
        '  $Screen.setBGColor("black");\n'+
        '  frame=0;\n'+
        '>>\n'+
        '\n'+
        'Mainクラスのループ内に下記を打ち込む \n'+
        '\n'+
        '<<codeMain\n'+
        '   frame++;\n'+
        '    if(frame%2 == 0){\n'+
        '        new Star{ ox:rnd(10000)-5000,oy:rnd(10000)-5000,z:5000 ,p:3,zOrder:2};\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '「Star」ファイルを作成し下記を打ち込む。\n'+
        '\n'+
        '<<codeStar\n'+
        '  extends ThreeD;\n'+
        '  while(true){\n'+
        '    threeD();\n'+
        '    z-=100;\n'+
        '    \n'+
        '    if(z<0){\n'+
        '        die();\n'+
        '    }\n'+
        '    update(); // 追加\n'+
        '  }\n'+
        '>>\n'+
        '\n'+
        '黒い背景を星が流れているように見える\n'+
        '\n'+
        '前　[[あたり判定をつける]]'
      ,
      'tonyu2/Actor.txt': 
        '[[api]]\n'+
        '\n'+
        '*Actorクラス\n'+
        '\n'+
        '画面に表示されるオブジェクトの基本クラスです．\n'+
        '\n'+
        '継承：  [[BaseActor]]\n'+
        '\n'+
        '※ほとんどのメソッドはBaseActorに宣言されています．\n'+
        '\n'+
        '**コンストラクタ\n'+
        '\n'+
        '<<code\n'+
        '\\new(x,y,p)\n'+
        '>>\n'+
        '\n'+
        '引数の仕様は[[BaseActor]]の処理と同じです．\n'+
        'BaseActorと同様，mainメソッドの動作を行うよう[[スレッド>thread]]を作成します．\n'+
        '\n'+
        'また，コンストラクタが呼ばれた時点で自分自身を画面に表示します．\n'+
        '\n'+
        '**initSprite\n'+
        '\n'+
        '自分自身を画面に表示します．\n'+
        'コンストラクタから自動的に呼ばれるので，通常は呼び出す必要はありません．\n'+
        '\n'
      ,
      'tonyu2/BaseActor.txt': 
        '[[api]]\n'+
        '\n'+
        '*BaseActor\n'+
        '\n'+
        '画面に表示されるオブジェクトの基本クラスです．実際には[[Actor]]を継承してクラスを作成してください．\n'+
        '\n'+
        '* コンストラクタ(1)\n'+
        '\n'+
        '<<code\n'+
        '\\new(params)\n'+
        '>>\n'+
        '\n'+
        'paramsにはオブジェクトを指定します．paramsの値をフィールドに書き込みます\n'+
        '\n'+
        '例： \n'+
        '<<code\n'+
        '// MyActorはBaseActorの子クラスとする\n'+
        'a=new MyActor{x:50,y:30, power:20, hp:50};\n'+
        '// a.x=50  a.y=30 a.power=20  a.hp=50 となる\n'+
        '>>\n'+
        '\n'+
        '* コンストラクタ(2)\n'+
        '\n'+
        '<<code\n'+
        '\\new(x,y,p)\n'+
        '>>\n'+
        '\n'+
        'x,y,pの値をフィールドに書き込みます\n'+
        '\n'+
        '* フィールド\n'+
        '\n'+
        '-x : オブジェクトのx座標をあらわします[[使用例>座標を指定してオブジェクトを表示する]]\n'+
        '-y : オブジェクトのy座標をあらわします[[使用例>座標を指定してオブジェクトを表示する]]\n'+
        '-p : 表示する[[画像の番号>cpats]]をあらわします。 [[使用例>オブジェクトのグラフィックを変える]]\n'+
        '-text : textに値がセットされると，文字を表示します（キャラクタパターンは表示されなくなります）\n'+
        '--size : 文字の大きさをあらわします\n'+
        '--fillStyle : 文字の色などをあらわします(JavascriptのCanvasにおけるfillStyleと同じ書式です）\n'+
        '--align:  "center" "left" "right"のいずれかを指定します．xの値であらわされる横位置がそれぞれ文字の中央，左端，右端になるように表示します．\n'+
        '-zOrder : オブジェクト同士が重なった場合、この値が小さい方が手前に表示されます。[[使用例>オブジェクトの奥行きの設定]]\n'+
        '-alpha : 表示する画像の透明度を指定します(255-0)。[[使用例>オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '-scaleX : オブジェクトの横方向の拡大率を指定します．scaleYが未定義の場合は縦方向にもscaleXの拡大率が適用されます。[[使用例>オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '-scaleY : オブジェクトの縦方向の拡大率を指定します\n'+
        '-rotation : オブジェクトの回転を指定します．右回りで指定した値の角度回転します。[[使用例>オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '\n'+
        '\n'+
        '* メソッド\n'+
        '\n'+
        '-[[update]]\n'+
        '-[[updateEx]]\n'+
        '-[[onUpdate]]\n'+
        '-[[getkey]]\n'+
        '-[[crashTo]]\n'+
        '-[[crashTo1]]\n'+
        '-[[allCrash]]\n'+
        '-[[all]]\n'+
        '-[[getCrashRect]]\n'+
        '-[[die]]\n'+
        '-[[isDead]] \n'+
        '-[[hide]]\n'+
        '-[[show]]\n'+
        '-[[rnd]]\n'+
        '-[[draw]]\n'+
        '-[[extend]]\n'+
        '-[[print]]\n'+
        '-[[file]]\n'+
        '-[[asyncResult]]\n'+
        '-[[waitFor]]\n'+
        '-[[play]]\n'+
        '-[[playSE]]\n'+
        '-[[currentThreadGroup]]\n'+
        '-[[detectShape]]\n'+
        '-[[hitTo]]\n'+
        '-[[watchHit]]\n'+
        '-[[MathMod]]モジュールクラスがもつメソッド\n'+
        '\n'+
        '-[[color]]\n'+
        '-[[]]'
      ,
      'tonyu2/Boot.txt': 
        '[[api]]\n'+
        '\n'+
        '*Bootクラス\n'+
        '\n'+
        'プログラム実行時に最初に起動するクラスです．次のような動作を行います．\n'+
        'これらの処理は実行時に自動的に行われるので，通常は呼び出す必要はありません．\n'+
        '\n'+
        '-画面の初期化\n'+
        '-マウス・タッチイベントの初期化\n'+
        '-[[スレッド]]の初期化\n'+
        '-Mainクラスのオブジェクトの配置\n'+
        '-メインループ\n'+
        '--スレッドの実行\n'+
        '--描画\n'+
        '\n'+
        '-[[setFrameRate]]\n'
      ,
      'tonyu2/FS.each.txt': 
        '[[file]]\n'+
        '\n'+
        '*FS.each メソッド\n'+
        '\n'+
        'ディレクトリ直下のすべてのファイルまたはディレクトリに対して処理を行います．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'fs.each(func)\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]]があらわすディレクトリ直下のすべてのファイルまたはディレクトリに対して，関数[[@arg func]]を実行します．[[@arg func]]の第1引数にそれぞれのファイルまたはディレクトリをあらわすFSオブジェクトが渡されます．\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/FS.exists.txt': 
        '[[file]]\n'+
        '\n'+
        '*FS.exitsメソッド\n'+
        '\n'+
        'ファイルまたはディレクトリが存在するかどうかを返します\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'fs.exits()\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]]があらわすファイルまたはディレクトリが存在すれば[[@cfrag true]]を，なければ[[@cfrag false]]を返します'
      ,
      'tonyu2/FS.obj.txt': 
        '[[file]]\n'+
        '\n'+
        '* FS.objメソッド\n'+
        '\n'+
        'ファイルに対して，オブジェクトデータ（JSON形式の文字列）を読み書きします．\n'+
        '\n'+
        '**読み出し\n'+
        '\n'+
        '<<code\n'+
        'fs.obj()\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]] があらわすファイルの内容をJSON形式で解釈し，そのオブジェクトを返します．\n'+
        '-ファイルが存在しない場合，[[@cfrag null]]を返します\n'+
        '\n'+
        '**書き込み\n'+
        '\n'+
        '<<code\n'+
        'fs.obj(o)\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]]があらわすファイルにオブジェクト[[@arg o]] のJSON表現を書き込みます．\n'+
        '-ファイルが存在しない場合，ファイルが自動的に新規作成されます．\n'+
        '-ファイルが存在する場合，これまでのファイルの内容は削除され，新しくオブジェクトが上書きされます．\n'+
        '\n'
      ,
      'tonyu2/FS.recursive.txt': 
        '[[file]]\n'+
        '\n'+
        '*FS.recursiveメソッド\n'+
        '\n'+
        'ディレクトリとそのサブディレクトリ内にあるすべてのファイルに対して処理を行います．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'fs.recursive(func)\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]]があらわすディレクトリ内とそのサブディレクトリ内にあるすべてのファイルに対して，[[@arg func]]を実行します．[[@arg func]]の第１引数に各ファイルのFSオブジェクトが渡されます．（ディレクトリに対しては[[@arg func]]を実行しません）\n'+
        '\n'
      ,
      'tonyu2/FS.rel.txt': 
        '[[file]]\n'+
        '\n'+
        '*FS.relメソッド\n'+
        '\n'+
        'このディレクトリを基準に，相対パスによって指定のされるファイルまたはディレクトリを取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'fs.rel(path)\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]]があらわすディレクトリを基準に，相対パス[[@arg path]]で指定されたファイルまたはディレクトリをあらわす新しいFSオブジェクトを返します．\n'+
        '\n'+
        'ディレクトリを取得しようとする場合，[[@arg path]]の末尾は / で終わる必要があります．\n'
      ,
      'tonyu2/FS.text.txt': 
        '[[file]]\n'+
        '\n'+
        '* FS.text メソッド\n'+
        '\n'+
        'ファイルに対して，文字列データを読み書きします．\n'+
        '\n'+
        '**読み出し\n'+
        '\n'+
        '<<code\n'+
        'fs.text()\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]] があらわすファイルの内容を文字列で返します．\n'+
        '-ファイルが存在しない場合，[[@cfrag undefined]]を返します\n'+
        '\n'+
        '**書き込み\n'+
        '\n'+
        '<<code\n'+
        'fs.text(t)\n'+
        '>>\n'+
        '\n'+
        '[[@arg fs]] があらわすファイルに文字列[[@arg t]] を書き込みます．\n'+
        '-ファイルが存在しない場合，ファイルが自動的に新規作成されます．\n'+
        '-ファイルが存在する場合，これまでのファイルの内容は削除され，新しく文字列が上書きされます．\n'+
        '\n'
      ,
      'tonyu2/Map.txt': 
        '[[api]]\n'+
        '\n'+
        '*Mapクラス\n'+
        '\n'+
        'マップの表示クラスです．\n'+
        '* コンストラクタ\n'+
        '\n'+
        '<<code\n'+
        '\\new(param)\n'+
        '>>\n'+
        '\n'+
        'paramでマップのチップサイズとその個数を指定します．\n'+
        '\n'+
        '例： \n'+
        '<<code\n'+
        '// 16*16のチップを横に15，縦に10並べる\n'+
        '$map=new Map{chipWidth:16,chipHeight:16, col:15, row:10};\n'+
        '>>\n'+
        '\n'+
        '*メソッド\n'+
        '-[[set]]\n'+
        '-[[setAt]]\n'+
        '-[[get]]\n'+
        '-[[getAt]]\n'+
        '-[[scrollTo]]\n'
      ,
      'tonyu2/MathMod.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*MathModモジュールクラス\n'+
        '\n'+
        '数学関数を提供するモジュールクラスです．\n'+
        '\n'+
        '-sin(d), cos(d)\n'+
        '-- 角度d（度数法）の正弦，余弦を返します\n'+
        '-rad(d)\n'+
        '-- 角度d（度数法）をラジアンに変換します\n'+
        '-deg(r)\n'+
        '-- 角度r（ラジアン）を度数法に変換します\n'+
        '-atan2(y,x)\n'+
        '-- 線分(0,0)-(x,y)とx軸のなす角を度数法で返します\n'+
        '-- ※yが先，xが後です．\n'+
        '-abs(v)\n'+
        '-- 絶対値 |v| を返します\n'+
        '-floor(x)\n'+
        '-- xを超えない最大の整数を返します\n'+
        '-sqrt(t)\n'+
        '-- 平方根 √t を返します\n'+
        '-dist(dx,dy)\n'+
        '-- 線分(0,0)-(dx,dy)の長さを返します\n'+
        '-dist(obj)\n'+
        '-- オブジェクト obj とこのオブジェクト間の距離を返します\n'+
        '-angleDiff(a,b)\n'+
        '-- 角度a-b と同じ向きを持つ、-180 から 179 までの角度を返します．\n'+
        '-- angleDiff(a,b)の値が正のとき、a から b に 至るには 左回り（aを減らす)が近く、負のときは右回り(aを増やす) のほうが近くなります．\n'+
        '-ceil(f)\n'+
        '--f以上の最小の整数を返します．\n'+
        '-trunc(f)\n'+
        '--fの小数点を除いた値を返します．\n'+
        '--fが正の値の場合、floorと同じ値を返し、fが負の値の場合、ceilと同じ値を返します．\n'
      ,
      'tonyu2/Pad.txt': 
        '[[api]]\n'+
        '*Padクラス\n'+
        '\n'+
        'パッドのクラスです．\n'+
        '\n'+
        'newでパッドを表示することができます．表示させた時の画面サイズに準拠して画面下部に自動的に表示されます．\n'+
        '\n'+
        '\n'+
        '例： \n'+
        '<<code\n'+
        'pad=new Pad();\n'+
        '>>\n'+
        '\n'+
        '*メソッド\n'+
        '\n'+
        '-[[getUp]]\n'+
        '-[[getDown]]\n'+
        '-[[getLeft]]\n'+
        '-[[getRight]]\n'+
        '-[[getButton]]\n'+
        '\n'
      ,
      'tonyu2/Panel.txt': 
        '[[api]]\n'+
        '*Panelクラス\n'+
        '\n'+
        'パネルの表示クラスです．Bootクラスで$panelがスクリーン幅に合わせて初期化されています．\n'+
        '* コンストラクタ\n'+
        '\n'+
        '<<code\n'+
        '\\new(param)\n'+
        '>>\n'+
        '\n'+
        'paramでパネルの横幅と縦幅を設定します．paramに何も与えずにsetPanelメソッドを使用してサイズを設定することもできます．\n'+
        '\n'+
        '例： \n'+
        '<<code\n'+
        'panel=new Panel();\n'+
        '>>\n'+
        '\n'+
        '*メソッド\n'+
        '\n'+
        '-[[setPanel]]\n'+
        '-[[setFillStyle]]\n'+
        '-[[fillRect]]\n'+
        '-[[fillText]]\n'+
        '-[[clearRect]]\n'+
        '-[[getPixel]]\n'
      ,
      'tonyu2/ScaledCanvas.txt': 
        '[[api]]\n'+
        '\n'+
        '*ScaledCanvasクラス\n'+
        '\n'+
        'ゲーム画面をあらわすオブジェクトです．[[Boot]]クラスで[[@cfrag $Screen]] というオブジェクトで初期化されます．\n'+
        '\n'+
        '**メソッド\n'+
        '\n'+
        '-[[resize]]\n'+
        '-[[setBGColor]]\n'+
        '\n'+
        ' '
      ,
      'tonyu2/TQuery.alive.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '* TQuery.alive メソッド\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているActorのうち，生きている（[[die]]メソッドが1回も呼ばれていない）ものだけを格納した新しいTQueryオブジェクトを返します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        't.alive()\n'+
        '>>\n'+
        '\n'+
        '**戻り値\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているActorのうち，生きているものだけを格納した新しいTQueryオブジェクト\n'+
        '\n'
      ,
      'tonyu2/TQuery.apply.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '*TQuery.applyメソッド\n'+
        '\n'+
        'このTQueryオブジェクトが指すすべてのActorに対して，指定されたメソッドを呼びます．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        't.apply(name, args)\n'+
        '>>\n'+
        '\n'+
        'すべてのActorについて，\n'+
        '[[@arg name]]で指定されたをメソッドを，配列[[@arg args]]で指定された引数を渡して呼び出します．\n'+
        '\n'+
        '**戻り値\n'+
        '\n'+
        '一番最後にメソッドが呼び出されたActorに対するメソッドの戻り値．メソッドが呼ばれたActorがなければ[[@cfrag undefined]]．\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/TQuery.attr.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '*TQuery.attrメソッド\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているActorについて，フィールドの読み込みまたは書き込みを行います．\n'+
        '\n'+
        '** 書式1\n'+
        '\n'+
        '<<code\n'+
        't.attr(key)\n'+
        '>>\n'+
        '\n'+
        '最初のActor ( [[@cfrag t[0] ]] ) の，[[@arg key]] で指定した名前をもつフィールドの値を読み出します\n'+
        '\n'+
        '** 書式2\n'+
        '\n'+
        '<<code\n'+
        't.attr(key1, value1, key2, value2 ...)\n'+
        '>>\n'+
        '\n'+
        'すべてのActorについて，[[@arg key]] と [[@arg value]]  の組で表されるフィールドを書き込みます．\n'+
        '\n'+
        '** 書式3\n'+
        '\n'+
        '<<code\n'+
        't.attr(obj)\n'+
        '>>\n'+
        '\n'+
        'すべてのActorについて，[[@arg obj]](通常はオブジェクトリテラルで指定)で指定されたオブジェクトの内容をフィールドに書き込みます．\n'+
        '\n'
      ,
      'tonyu2/TQuery.die.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '*TQuery.dieメソッド\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているすべての「生きている」Actorに対して，[[die]]メソッドを呼びます．\n'+
        '\n'+
        '※「生きている」Actorとは，dieメソッドが一度も呼ばれていないActorを指す\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        't.die()\n'+
        '>>\n'+
        '\n'+
        '**戻り値\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているすべてのActorのうち，少なくとも1つが「生きている」Actorであれば [[@cfrag true]] ，そうでなければ[[@cfrag false]]\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/TQuery.find.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '*TQuery.find\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているActorのうち，指定された条件に合うものだけを格納した新しいTQueryオブジェクトを返します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        't.find(f)\n'+
        '>>\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているActorそれぞれについて，\n'+
        '第1引数にそのActorを渡して関数[[@arg f]] を呼び出し，\n'+
        '[[@cfrag true]]相当の値が返されたActorだけを格納した新しいTQueryオブジェクト\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/TQuery.minmax.txt': 
        '[[TQuery]]\n'+
        '\n'+
        '*TQuery.min / TQuery.max メソッド\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているすべてのActorのうち，指定された値の最小（最大）値を返します．\n'+
        '\n'+
        '** 書式1\n'+
        '\n'+
        '<<code\n'+
        't.min(key)\n'+
        '>>\n'+
        '<<code\n'+
        't.max(key)\n'+
        '>>\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているすべてのActorにおける，\n'+
        '[[@arg key]](文字列)で指定された名前をもつフィールドの値の最小（最大）値\n'+
        '\n'+
        '** 書式2\n'+
        '\n'+
        '<<code\n'+
        't.min(func)\n'+
        '>>\n'+
        '<<code\n'+
        't.max(func)\n'+
        '>>\n'+
        '\n'+
        'このTQueryオブジェクトが格納しているすべてのActorについて，そえｒぞれ\n'+
        'そのActorを第1引数に渡して[[@arg func]](関数)を呼び出した結果の最小（最大）値\n'
      ,
      'tonyu2/TQuery.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*TQuery\n'+
        '\n'+
        '[[all]]メソッド， [[allCrash]]メソッドなどで返されるオブジェクトです．複数の[[Actor]]に対して一斉に動作を行わせることができます．\n'+
        '\n'+
        '* 要素数・要素へのアクセス\n'+
        '\n'+
        'TQueryオブジェクトに格納しているActorの個数は[[@cfrag .length]]で取得します．\n'+
        '\n'+
        '各Actorへは[[@cfrag [添字] ]]でアクセスします．\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        'a=all(Enemy);\n'+
        'print("敵の数=", a.length);\n'+
        'if (a.length>0) print("最初の敵のx座標",a[0].x);\n'+
        '>>\n'+
        '\n'+
        '* for ... in の使用\n'+
        '\n'+
        'for ... in を使って各Actorへに同じ処理を一斉に行うことができます．\n'+
        '\n'+
        '<<code\n'+
        'for (e in all(Enemy)) {\n'+
        '   e.die();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '* メソッド\n'+
        '\n'+
        '-[[die>TQuery.die]]\n'+
        '-[[alive>TQuery.alive]]\n'+
        '-[[attr>TQuery.attr]]\n'+
        '-[[find>TQuery.find]]\n'+
        '-[[apply>TQuery.apply]]\n'+
        '-[[min, max>TQuery.minmax]]\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/all.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*allメソッド\n'+
        '\n'+
        '自分以外のすべてのオブジェクト（あるいは，指定されたクラスのオブジェクト）をあらわす[[TQuery]]オブジェクトを取得します．\n'+
        '\n'+
        '**書式1\n'+
        '\n'+
        '自分以外のすべてのオブジェクトをあらわすTQueryオブジェクトを返します．\n'+
        '\n'+
        '<<code\n'+
        'all()\n'+
        '>>\n'+
        '\n'+
        '[[@arg Class]]で指定されたクラスのオブジェクト（自分以外）をあらわすTQueryオブジェクトを返します．\n'+
        '\n'+
        '<<code\n'+
        'all(Class)\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/allCrash.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '* allCrashメソッド\n'+
        '\n'+
        '指定されたクラスのオブジェクトのうち，自分と衝突しているすべてのオブジェクトをあらわす[[TQuery]]オブジェクトを返します．\n'+
        '\n'+
        '**書式\n'+
        '<<code\n'+
        'allCrash(Class)\n'+
        '>>\n'+
        '\n'+
        '[[@arg Class]]で指定されたクラスのオブジェクトのうち，自分と衝突しているすべてのオブジェクトをあらわす[[TQuery]]オブジェクトを返します．\n'+
        '\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '<<code\n'+
        '    // このオブジェクトがTargetクラスのオブジェクトとぶつかっていたら，\n'+
        '    // そのオブジェクトを消す\n'+
        '    for (t in allCrash(Target)) {\n'+
        '        t.die();\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '上の例は，次のように書くこともできます．\n'+
        '\n'+
        '<<code\n'+
        '    // このオブジェクトがTargetクラスのオブジェクトとぶつかっていたら，\n'+
        '    // そのオブジェクトを消す\n'+
        '    allCrash(Target).die();\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/api.txt': 
        '[[index]]\n'+
        '\n'+
        '*標準クラス\n'+
        '\n'+
        'Tonyu2で最初から使えるクラス群です．[[ファイルシステム>fs]]上の/Tonyu/Kernel/ で定義されています．\n'+
        '\n'+
        '-[[Actor]]\n'+
        '-[[BaseActor]]\n'+
        '-[[Boot]]\n'+
        '-[[Sprites]]\n'+
        '-[[ScaledCanvas]]\n'+
        '-[[NoviceActor]]\n'+
        '-[[MathMod]]\n'+
        '-[[Map]]\n'+
        '-[[Panel]]\n'+
        '-[[Pad]]\n'+
        '-[[Tonyu1互換クラス>t1compats]]\n'+
        '\n'+
        '*グローバル変数\n'+
        '\n'+
        '-[[$Screen>ScaledCanvas]]\n'+
        '-[[$mouseX, $mouseY]]\n'+
        '-[[$touches]]\n'+
        '-[[$screenWidth,$screenHeight]]\n'+
        '\n'+
        '\n'+
        '*[[用途別リファレンス]]\n'+
        '-[[チュートリアル]]\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/asyncResult.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*asyncResultメソッド\n'+
        '\n'+
        'AsyncResultオブジェクトを作成します\n'+
        '\n'+
        'AsyncResultオブジェクトは，ajaxなどの「非同期で実行を行い，結果をコールバック関数で受け取る」形式のメソッド（非同期メソッド）を[[待機可能モード>waitmode]]で扱うためのオブジェクトです．\n'+
        '\n'+
        '**使い方\n'+
        '\n'+
        '※必ず待機可能モードで実行してください．\n'+
        '\n'+
        '-asyncResult()メソッドで，AsyncResultオブジェクトを作成します．これを[[@cfrag a]]とします．\n'+
        '-非同期メソッドを呼び出します． このとき，[[@cfrag a.receiver]] をコールバック関数として渡します．\n'+
        '-[[waitFor]]メソッドを呼び出します．非同期メソッドが結果を返すまで処理を待機します．\n'+
        '-非同期メソッドの結果が[[@cfrag a[n]]]に返されます．[[@cfrag a[n]]]はコールバック関数に渡された第n引数（0が最初の引数）です．\n'+
        '\n'+
        '**使用例\n'+
        '\n'+
        '<<code\n'+
        'native $;\n'+
        '//asyncResultオブジェクトを作成\n'+
        'a=asyncResult();\n'+
        '//jqueryのgetメソッドを呼び出す．コールバック関数に a.receiverを指定\n'+
        '$.get("http://tonyuedit.appspot.com/edit/", a.receiver);\n'+
        '//getメソッドが終わるまで待つ\n'+
        'waitFor(a);\n'+
        '//結果がa[0]に返される\n'+
        'print(a[0]);\n'+
        '>>\n'
      ,
      'tonyu2/classDef.txt': 
        '[[lang]]\n'+
        '\n'+
        '*クラス定義\n'+
        '\n'+
        'Tonyu2では，1つの[[ファイル>fs]]に1つのクラスを定義します．\n'+
        '\n'+
        '-ファイル名は <<クラス名>>.tonyu という形式になります．\n'+
        '-- 例えば，Hello.tonyu という名前のファイルは，Hello という名前のクラスを定義します．\n'+
        '-クラスを定義するための構文（例えば，Javaの[[@cfrag class クラス名 {...  }]]など）はありません．\n'+
        '- ファイルには，次のいずれかを複数記述できます．\n'+
        '--継承宣言\n'+
        '--組み込み宣言\n'+
        '--native宣言\n'+
        '--mainメソッドの処理内容\n'+
        '--非mainメソッドの定義\n'+
        '- 定義された(Tonyu2の)クラスは，Javascriptのいわゆる「クラス」(function+prototypeによるメソッド定義）として機能します．\n'+
        '\n'+
        '**継承宣言\n'+
        '\n'+
        'このクラスの親クラスを設定します．ファイルの先頭に次のように宣言します\n'+
        '\n'+
        '<<code 継承宣言の書式\n'+
        'extends 親クラス名;\n'+
        '>>\n'+
        '\n'+
        '-継承宣言を省略すると，[[プロジェクト設定>options]]によって設定されている親クラスを自動的に継承します．\n'+
        '-親クラス名 に [[@cfrag null]]を設定すると，親クラスがないクラスになります．\n'+
        '-継承は，JavaScriptの一般的な継承の方法（このクラスを表す関数オブジェクトのprototypeが，親クラスのオブジェクトになる）で行われます．\n'+
        '\n'+
        '**組み込み宣言\n'+
        '\n'+
        'このクラスに組み込むクラス（モジュールクラス）を設定します．ファイルの先頭，または継承宣言続いて次のように宣言します\n'+
        '\n'+
        '<<code 継承宣言の書式\n'+
        'includes モジュールクラス名[, モジュールクラス名...];\n'+
        '>>\n'+
        '\n'+
        '-このクラスでは，組み込んだモジュールクラスがもつメソッドを利用できます．\n'+
        '-組み込みは継承とは異なり，複数のクラスを組み込むことができます\n'+
        '-モジュールクラスの実体は通常のクラスと同じ方法で作成します．\n'+
        '-モジュールクラスが他のモジュールクラスを組み込んでいる場合，組み込んだ先のクラスでもそれらのモジュールクラスのメソッドが組み込まれます．\n'+
        '-モジュールクラスが他のクラスを継承している場合，組み込んだ先のクラスもそのモジュールの親クラスを継承している必要があります．\n'+
        '-組み込みは，モジュールクラスがもつメソッドの一覧を，このクラスの関数オブジェクトのprototypeオブジェクトに追記する方式で行われます．継承とは異なり，[[@cfrag instanceof]]演算子によって検査されるオブジェクトのクラスが，特定のモジュールクラスを組み込んでいるかどうかは判定できません．\n'+
        '\n'+
        '**native宣言\n'+
        '\n'+
        'native宣言は，Tonyu2のプログラムからJavascriptのネイティブオブジェクトにアクセスするために用います．ファイル中で次のように宣言します．\n'+
        '\n'+
        '<<code native宣言の書式\n'+
        'native 変数名;\n'+
        '>>\n'+
        '\n'+
        '- 指定された変数名を，このファイル中ではJavascriptのトップレベルスコープ（一般的にはwindowオブジェクト）に定義されている変数の値として扱います．\n'+
        '- 親クラスに書いてあるnative宣言は子クラスには適用されません．必要に応じて子クラスにも同じnative宣言を書く必要があります．\n'+
        '\n'+
        '**mainメソッドの処理内容\n'+
        '\n'+
        'mainメソッドは，mainという名前をもつメソッドです．[[Actor]]クラスなどでは，オブジェクトが出現してから停止するまでの動作を記述するのに用いられます．\n'+
        '\n'+
        'ファイルのトップレベル（メソッド定義に囲まれていない部分）に書かれた文はmainメソッドの内容として定義されます．\n'+
        '\n'+
        'mainメソッドは引数を受け取ることはできません．\n'+
        '\n'+
        '**非mainメソッドの定義\n'+
        '\n'+
        '名前がmainでないメソッドは非mainメソッドです．\n'+
        '\n'+
        'ファイルのトップレベルにおいて次の形式で定義します．\n'+
        '\n'+
        '<<code メソッド定義 methodef\n'+
        'function メソッド名(引数リスト) {\n'+
        '   処理内容\n'+
        '}\n'+
        '>>\n'+
        '※function の代わりに \\ が使用可能です（[[拡張構文>sugar]]参照)\n'+
        '\n'+
        '*変数の種類\n'+
        '\n'+
        '-引数\n'+
        '--１つのメソッドに渡される値です．メソッド宣言の引数リストに記述されます．１回のメソッド呼び出しが終わると破棄されます．\n'+
        '-ローカル変数\n'+
        '--メソッド宣言の処理中でvar で宣言されます．１回のメソッド呼び出しが終わると破棄されます．\n'+
        '-グローバル変数\n'+
        '--名前が$で始まる変数はグローバル変数です．すべてのTonyu2オブジェクトから直接参照できます．\n'+
        '--Javascriptからは[[@cfrag Tonyu.globals.グローバル変数名]]で参照できます．\n'+
        '-クラス変数\n'+
        '--現在のプロジェクトおよび[[標準ライブラリ>api]]で定義されているクラス名と同じ名前の変数はクラス変数です．そのクラスをあらわす関数オブジェクトを参照します．\n'+
        '--Javascriptからは[[@cfrag Tonyu.classes.クラス変数名]]で参照できます．\n'+
        '-native変数\n'+
        '--native宣言によって宣言された名前の変数です．Javascriptのトップレベルスコープにおける同名の変数を参照します．\n'+
        '-フィールド\n'+
        '--そのクラスのオブジェクトがもつ値です．上のどれにもあてはまらない変数はフィールドとして解釈されます．\n'+
        '--Javascriptではいわゆる[[@cfrag this.x]]という形式で参照されるものです．Tonyu2でもこの方式でも参照できます．\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '<<code MyClass.tonyu example\n'+
        'extends Actor;\n'+
        'native alert;\n'+
        '// main関数\n'+
        'x=3;\n'+
        'rate=5;\n'+
        'y=mult(x);\n'+
        'alert(y); // 15\n'+
        '// main関数終わり\n'+
        '\\mult(a) {\n'+
        '  var res=a*rate;\n'+
        '  return res;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '-クラス名はMyClass\n'+
        '-親クラスはActor\n'+
        '-Javascriptの [[@cfrag alert]] 関数を利用する\n'+
        '-[[@cfrag x,rate,y]] はフィールド\n'+
        '-multメソッドを定義\n'+
        '-- [[@cfrag a]]は引数，[[@cfrag res]]はローカル変数，[[@cfrag rate]]はフィールド'
      ,
      'tonyu2/clearRect.txt': 
        '[[Panel]]\n'+
        '\n'+
        '*clearRectメソッド\n'+
        '\n'+
        'パネルから指定した四角形の範囲を消します．\n'+
        '\n'+
        '<<code\n'+
        'panel.clearRect(x,y,clearW,clearH);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-x : パネル内から消す左上のx座標をあらわします\n'+
        '-y : パネル内から消す左上のy座標をあらわします\n'+
        '-clearW : パネルから消す範囲の横幅をあらわします\n'+
        '-clearH : パネルから消す範囲の縦幅をあらわします\n'
      ,
      'tonyu2/console.txt': 
        '[[print]]\n'+
        '\n'+
        '*コンソール\n'+
        '\n'+
        'Tonyu2のコンソールは，JavaScriptのコンソールと同じです．次のキーで表示できます．\n'+
        '\n'+
        '-Chrome/Firefox: Ctrl+Shift+J\n'+
        '-IE: F12\n'+
        '\n'
      ,
      'tonyu2/cpats.txt': 
        '[[ide]]\n'+
        '\n'+
        '\n'+
        '*画像リスト\n'+
        '\n'+
        'メニュー階層： ウィンドウ → 画像リスト\n'+
        '\n'+
        'オブジェクトに用いるキャラクタパターン（画像）を追加します．\n'+
        '\n'+
        '一番上の「ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加」に\n'+
        '画像ファイルをドラッグ＆ドロップするか，一番下の「追加」ボタンを押して，各項目を設定します．\n'+
        '\n'+
        '※300KBを超える画像を追加するには，[[ログイン>login]]が必要です\n'+
        '\n'+
        '-名前\n'+
        '--この画像につける名前です．名前は$ で始めます．先頭のキャラクタパターンの番号を指す数値が同名の[[グローバル変数]]に入ります．\n'+
        '--ファイルを追加した時点で自動的に設定されますが、変更することが可能です．\n'+
        '-URL  \n'+
        '-- 画像のURLを記述します．通常は自動的に設定されるので変更する必要はありません．\n'+
        '-画像の分割方法\n'+
        '--分割数指定：画像内を決められた区画数で分割する場合，こちらを選びます．例えば5x4と入力すると、横を5分割、縦を4分割して計20個の画像に分割されます\n'+
        '--1パターンの大きさ指定：画像内を決められた大きさで分割する場合，こちらを選びます．例えば32x32と入力すると、1個あたり 32ピクセルx32ピクセル の画像に分割されます\n'+
        '--Tonyu1互換： Tonyu1で利用されている画像をそのまま使う場合はこちらを選びます\n'+
        '--- URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1互換」は使えません．\n'+
        '\n'+
        'キャラクタパターンには，それぞれキャラクタパターン番号が割り振られます．\n'+
        '[[変数p>BaseActor]]にキャラクタパターン番号を代入することでそのキャラクタパターンを表示できます．\n'+
        '\n'+
        ' 例えば， $pat_balls という名前の画像ファイルの中の，4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n'+
        '<<code\n'+
        '    p=$pat_balls + 4; \n'+
        '>>\n'+
        '    とします．\n'+
        '\n'+
        '*例1 - 最初から用意されている画像を用いる\n'+
        '\n'+
        '[[使用例>オブジェクトのグラフィックを変える]]\n'+
        '\n'+
        '*例2 - 独自の画像を追加する\n'+
        '\n'+
        '※ [[$pat_ballsという名前の画像>http://jsrun.it/assets/w/K/x/V/wKxV7.png]]を追加してから実行してください。\n'+
        '\n'+
        '<<code Main\n'+
        't=0;\n'+
        'while(true) {\n'+
        '    if (t%5==0) {\n'+
        '        // 新しく作るBall オブジェクトの変数pに，\n'+
        '        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\n'+
        '        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\n'+
        '    }\n'+
        '    t++;\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '<<code Ball\n'+
        'while(y<$screenHeight) {\n'+
        '    y+=6;\n'+
        '    update();\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/crashTo.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*crashToメソッド\n'+
        '\n'+
        '他のオブジェクトと衝突しているかを判定します．\n'+
        '\n'+
        '**書式1\n'+
        '\n'+
        '<<code\n'+
        'crashTo(obj)\n'+
        '>>\n'+
        '\n'+
        'このオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\n'+
        '\n'+
        '*書式2\n'+
        '\n'+
        '<<code\n'+
        'crashTo(Class)\n'+
        '>>\n'+
        '\n'+
        'このオブジェクトが[[@arg Class]]で指定されるクラスのオブジェクトのうちどれかと衝突していれば，そのうちどれか1つのオブジェクトを返します．そうでなければ[[@cfrag null]]を返します\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '<<code\n'+
        '// $playerというオブジェクトにぶつかっていたら，$playerを消します\n'+
        'if (crashTo($player)) {\n'+
        '   $player.die();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '*参考\n'+
        '\n'+
        '-[[crashTo1]]\n'+
        '-[[allCrash]]\n'+
        '-[[getCrashRect]]\n'
      ,
      'tonyu2/crashTo1.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*crashTo1メソッド\n'+
        '\n'+
        '[[crashTo]]メソッドと同様，衝突判定を行います．引数にはオブジェクトのみを指定ことができ，クラスは指定できません．引数の種類判定がない分，[[crashTo]]より若干処理速度が速くなります\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'crashTo1(obj)\n'+
        '>>\n'+
        '\n'+
        'このオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\n'
      ,
      'tonyu2/die.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*dieメソッド\n'+
        '\n'+
        'オブジェクトを画面から消去し，処理を中断します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'die();\n'+
        '>>\n'
      ,
      'tonyu2/diffTonyu1.txt': 
        '[[index]]\n'+
        '\n'+
        '* Tonyu1 と Tonyu2 の違い\n'+
        '\n'+
        'ここでは，従来のTonyu System（Tonyu1）とTonyu System 2（Tonyu2）の違いを説明します．\n'+
        '\n'+
        '** 親クラス\n'+
        '\n'+
        '-[[@cfrag extends]] は省略可能です。省略すると[[Actor]]クラスを継承します。\n'+
        '-Tonyu1 の SpriteChar, DxChar, TextChar, SecretChar はActorクラスで代用可能です\n'+
        '-- Actorクラスのオブジェクトのフィールド[[@cfrag x]], [[@cfrag y]] に値を設定するとSpriteCharと同等\n'+
        '-- [[@cfrag alpha]], [[@cfrag rotation]], [[@cfrag scaleX]], [[@cfrag scaleY]]に値を設定すると DxCharと同等\n'+
        '-- [[@cfrag text]]に値を設定すると TextCharと同等\n'+
        '-- いずれも設定しないか，[[@cfrag p]]に-1を設定すると SecretCharと同等\n'+
        '\n'+
        '-PanelCharクラスは，Actorクラスのオブジェクトに[[Panel]]クラスのオブジェクトを作成させることで代用します．\n'+
        '-FrameManagerは未実装です．最初に実行させるクラス（たいてい「Main」などの名前をもつクラス）に，フレームが実行されるごとの処理を記述してください．\n'+
        '\n'+
        '** mainメソッド処理終了時の動作\n'+
        '\n'+
        'mainメソッドが終了してもオブジェクトは消えません．明示的に[[die]]メソッドを呼び出して下さい．\n'+
        '\n'+
        'この仕様により，「表示だけを行なう，何も動作しないオブジェクト」をActorクラスを継承せずとも作成可能です．（Tonyu1では，明示的にクラスを作成し，waitメソッドを呼び出す必要があります）\n'+
        '\n'+
        '例：\n'+
        '<<code\n'+
        'new Actor{p:$pat_BG, x:$screenWidth/2, y:$screenHeight/2}; // 背景\n'+
        'new Actor{text:"タイトル", x:200, y:200}; // タイトルのテキスト\n'+
        '>>\n'+
        '\n'+
        '**オブジェクトの生成と出現\n'+
        '\n'+
        'Tonyu1ではオブジェクトの生成は[[@plistref t1new]]のように，オブジェクトの種類によって指定されたフィールド（SpriteCharならx,y,p）の値を渡して生成していました．\n'+
        '\n'+
        '<<code Main t1new\n'+
        'new Player(100,220,12);\n'+
        '>>\n'+
        '\n'+
        '指定されたフィールド以外の値を渡す場合，[[@plistref t1new2]]のように，生成したオブジェクトを一旦変数に入れ，別の文を追加する必要がありました．\n'+
        '<<code Main t1new2\n'+
        '$player=new Player(100,220,12);\n'+
        '$player.life=5;\n'+
        '>>\n'+
        '\n'+
        'Tonyu2では，[[@plistref t2new]]のようにすべてのフィールドをオブジェクト生成時に一文で渡せるようになりました．\n'+
        '\n'+
        '<<code Main t2new\n'+
        'new Player{x:100, y:220,p:12, life:5};\n'+
        '>>\n'+
        '\n'+
        '※Tonyu2でも，[[@plistref t1new]]のようにx,y,pを渡すことは可能です．\n'+
        '\n'+
        'また，Tonyu1ではオブジェクトを実際に出現させるには[[@plistref t1appear]]のようにappearメソッドを呼び出す必要がありましたが，Tonyu2では不要になっています．\n'+
        '\n'+
        '<<code Main t1appear\n'+
        'appear(new Player(100,220,12));\n'+
        '>>\n'+
        '\n'+
        '**当たり判定の機能拡張\n'+
        '\n'+
        '- [[crashTo]]メソッドにクラスを渡すことが可能になりました\n'+
        '--画面中の特定のクラスのオブジェクトのうちどれか１つ以上に衝突しているかどうかが判定できます\n'+
        '--戻り値は衝突したオブジェクトのうちどれか１つになります．\n'+
        '\n'+
        '** オブジェクトの一括操作機能の追加\n'+
        '\n'+
        '- 複数のオブジェクトに同じ操作を適用させる命令が追加されました\n'+
        '--[[all]]メソッド ： 画面上のすべてのオブジェクトや，特定のクラスのすべてのオブジェクトに対して操作を行う\n'+
        '--[[allCrash]]メソッド： 衝突しているすべてのオブジェクトに対して操作を行う\n'+
        '\n'+
        '**タッチパネル・マルチタッチ対応\n'+
        '\n'+
        '-[[$touches]] \n'+
        '\n'+
        '**メソッド・フィールドの変更点\n'+
        '\n'+
        '- [[getkey]]メソッド\n'+
        '--（上位互換）引数に数値以外にキー名をあらわす文字列が渡せます\n'+
        '- angle → [[@cfrag rotation]]\n'+
        '-- （名称変更） \n'+
        '- 画面の大きさ変更\n'+
        '-- （仕様変更）Tonyu1では，$screenWidth,$screenHeightに代入することで画面の大きさを変更していましたが，Tonyu2 では[[$Screen.resize>resize]]を用います\n'+
        '- ファイルアクセス\n'+
        '-- （仕様変更）Tonyu1では，FileReader, FileWriterクラスを用いてファイルにアクセスしましたが，Tonyu2では[[file]]メソッドを用います．\n'+
        '\n'+
        '\n'+
        '\n'+
        '.'
      ,
      'tonyu2/draw.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*drawメソッド\n'+
        '\n'+
        'オブジェクトが描画される時に自動的に呼び出されます．ユーザのプログラムからは通常呼び出す必要はありません．\n'+
        '\n'+
        '*書式\n'+
        '\n'+
        '<<code\n'+
        'draw(ctx)\n'+
        '>>\n'+
        '\n'+
        'ctxに，描画先のcanvasオブジェクトのコンテキスト(canvas.getContext("2d")で取得)を渡します．\n'+
        '\n'+
        '*オーバーライド\n'+
        '\n'+
        'drawメソッドをオーバーライドすると，オブジェクトの表示方法をカスタマイズできます．\n'+
        '\n'+
        '例\n'+
        '<<code\n'+
        '\\draw(ctx) {\n'+
        '   // この中では、ctxを用いて画面への描画が可能。描画方法はHTML5のCanvasに準拠。\n'+
        '   // 例：赤い四角形を表示\n'+
        '   ctx.fillStyle="red";\n'+
        '   ctx.fillRect(x,y,20,20);\n'+
        '}\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/extend.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*extendメソッド\n'+
        '\n'+
        'オブジェクトを受け取り，それらの属性値を書き込みます．\n'+
        '\n'+
        '**書式\n'+
        '<<code\n'+
        'extend(obj)\n'+
        '>>\n'+
        '[[@arg obj]]（通常はオブジェクトリテラルを用いる）のもつ値をすべて自分自身に書き込みます．\n'+
        '\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        'extend{x:5, y:10, score:20};\n'+
        '// x=5 y=10 score=20 になる\n'+
        'print (x);\n'+
        'print (y);\n'+
        'print (score);\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/file.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*file メソッド\n'+
        '\n'+
        'ファイルシステム(FS)オブジェクトを取得します．\n'+
        'FSオブジェクトは，[[ファイルシステム>fs]]へのアクセスを提供します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'file([[@arg path]])\n'+
        '>>\n'+
        '\n'+
        '-pathに，次のディレクトリからの相対パスを指定します．\n'+
        '--現在のプロジェクトディレクトリ/files\n'+
        '-ディレクトリを指定する場合，pathの末尾に必ず / をつけて下さい\n'+
        '-fileメソッドによって取得されたFSオブジェクトがアクセス可能な範囲は，このプロジェクトディレクトリとそのサブディレクトリ内のファイル・ディレクトリのみです．\n'+
        '\n'+
        'FSオブジェクトには，次のメソッドが提供されます\n'+
        '\n'+
        '-[[text>FS.text]]\n'+
        '-[[obj>FS.obj]]\n'+
        '-[[each>FS.each]]\n'+
        '-[[recursive>FS.recursive]]\n'+
        '-[[rel>FS.rel]]\n'+
        '-[[exists>FS.exists]]\n'+
        '-[[isDir>FS.isDir]]\n'+
        '-[[rm>FS.rm]]\n'+
        '-[[path>FS.path]]\n'+
        '-[[name>FS.name]]\n'+
        '-[[endsWith>FS.endsWith]]\n'+
        '-[[copyFrom>FS.copyFrom]]\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/fillRect.txt': 
        '[[Panel]]\n'+
        '\n'+
        '*fillRectメソッド\n'+
        '\n'+
        'パネルに四角形を描画します．\n'+
        '\n'+
        '<<code\n'+
        'panel.fillRect(x,y,rectWidth,rectHeight);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-x : 四角形を描き始めるパネル内のx座標をあらわします\n'+
        '-y : 四角形を描き始めるパネル内のy座標をあらわします\n'+
        '-rectWidth : 描画する四角形の横幅をあらわします\n'+
        '-rectHeight : 描画する四角形の縦幅をあらわします\n'
      ,
      'tonyu2/fillText.txt': 
        '[[Panel]]\n'+
        '\n'+
        '*fillTextメソッド\n'+
        '\n'+
        'パネルに文字列を描画します．\n'+
        '\n'+
        '<<code\n'+
        'panel.fillText(text,x,y,size,align);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-text : 表示させたい文字列をあらわします\n'+
        '-x : 文字を書くパネル内のx座標をあらわします\n'+
        '-y : 文字を書くパネル内のy座標をあらわします\n'+
        '-size : 描画する文字のサイズあらわします\n'+
        '-align : 文字を描画する位置をあらわします\n'+
        '\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        'panel.fillText("text",50,50,30,"center");\n'+
        '>>'
      ,
      'tonyu2/forin.txt': 
        '[[lang]]\n'+
        '\n'+
        '* for(..in..)の動作\n'+
        '\n'+
        '[[@cfrag for (e in set)]] はJavaScriptとは動作が異なります．\n'+
        '\n'+
        '-setが配列または[[TQuery]]オブジェクトの場合，eには（添字ではなく）値を入れながら繰り返します．\n'+
        '-setがオブジェクトの場合，eには(キーではなく）値を入れながら繰り返します．\n'+
        '\n'+
        'また，[[@cfrag for (k,v in set)]]という構文があります． \n'+
        '\n'+
        '-setがオブジェクトの場合，kにキー，vに値を入れながら繰り返します．\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/frame.txt': 
        '[[update]]\n'+
        '\n'+
        '*フレーム\n'+
        '\n'+
        'フレームとは，ゲームの画面1枚が表示されるまでの動作を指します．\n'+
        '1つのフレーム（1フレーム）の動作は次の構成されます．\n'+
        '\n'+
        '-各オブジェクトの移動\n'+
        '-各オブジェクトの表示\n'+
        '\n'+
        'ゲーム全体は，フレームが1秒間に数十回(30～60程度．この数値をfpsと呼びます）動作して進行していきます．\n'+
        '\n'+
        'Tonyu2では，各オブジェクトに[[スレッド>thread]]が割り当てられており，1フレームごとにスレッドが少しずつ実行されていきます．\n'+
        '\n'+
        'スレッドの実行中に[[update]]メソッドが呼ばれるとそのフレームでの処理を終了させ，他のオブジェクトのスレッドに動作を譲ります．\n'+
        '\n'
      ,
      'tonyu2/fs.txt': 
        '[[index]]\n'+
        '*ファイルシステム\n'+
        '\n'+
        '-Tonyu2 は，WebブラウザのJavascriptだけで動作するように設計されています．\n'+
        '-プログラムなどを保存・読み出しするために，サーバとの通信は行わず，localStorage を用いています．\n'+
        '-localStorageでは，単純なキー/値の格納・読み出しの仕組みだけが提供されていますが，Tonyu2は，localStorage上でディレクトリ構造を再現するためのライブラリ(fs.js)を搭載しています．\n'+
        '--詳細は[[fs.js>https://github.com/hoge1e3/Tonyu2/blob/master/js/fs/fs.js]] のプログラムを参照してください．\n'+
        '--ファイルを直接操作するための[[シェル>sh]]も用意されています．\n'+
        '\n'+
        '*注意点\n'+
        '\n'+
        'プログラムがlocalStorageに保存されるため，他のPCや他のWebブラウザではプログラムは共有されません．\n'+
        '\n'+
        '今のところ，他のWebブラウザ等とプログラムを送受信するには，\n'+
        '-[[jsdo.itへのインポート・エクスポート>jsdoit]]を用いる\n'+
        '-[[ログイン>login]]を行い，[[ファイルの同期>sync]]を行う\n'
      ,
      'tonyu2/get.txt': 
        '[[Map]]\n'+
        '*getメソッド\n'+
        '\n'+
        '指定したマップ上の座標に対応するマップパターンを取得します．\n'+
        '\n'+
        '<<code\n'+
        'map.get(getCol,getRow);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-getCol : パターンを取得するx座標をあらわします\n'+
        '-getRow : パターンを取得するy座標をあらわします\n'
      ,
      'tonyu2/getAt.txt': 
        '[[Map]]\n'+
        '*getAtメソッド\n'+
        '\n'+
        '指定した画面上の座標に対応するマップパターンを取得します．\n'+
        '\n'+
        '<<code\n'+
        'map.getAt(getX,getY);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-getX : パターンを取得するx座標をあらわします\n'+
        '-getY : パターンを取得するy座標をあらわします\n'
      ,
      'tonyu2/getButton.txt': 
        '[[Pad]]\n'+
        '*getButtonメソッド\n'+
        '\n'+
        'パッドのボタンの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'pad.getButton(i);\n'+
        '>>\n'+
        '\n'+
        '-iに取得するボタンの番号を渡します．現在表示される1ボタンは、0が割り当てられています．\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/getCrashRect.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*getCrashRect\n'+
        '\n'+
        '当たり判定に使う矩形領域を返します．\n'+
        '[[crashTo]]，[[crashTo1]]，[[allCrash]]で用いられます\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'getCrashRect()\n'+
        '>>\n'+
        '\n'+
        'このオブジェクトの当たり判定に使う矩形領域を返します．\n'+
        '\n'+
        '戻り値を[[@arg r]]とすると：\n'+
        '-([[@arg r]].x,[[@arg r]].y)が矩形領域の中心位置です（左上ではありません）\n'+
        '-[[@arg r]].widthと[[@arg r]].heightが，矩形領域の幅と高さです．\n'+
        '\n'+
        '**オーバライド\n'+
        '\n'+
        'デフォルトのgetCrashRectは，画像の大きさを基準に当たり判定を計算しますが，\n'+
        'getCrashRectをオーバーライドすると，当たり判定の大きさを変更できます．\n'+
        '\n'+
        '[[@plistref chg]]の例では，当たり判定の大きさを5*5に設定しています．\n'+
        '\n'+
        '<<code ChangeCrashRect.tonyu chg\n'+
        '\\getCrashRect() {\n'+
        '   return {x,y,width:5, height:5};\n'+
        '}\n'+
        '>>\n'
      ,
      'tonyu2/getDown.txt': 
        '[[Pad]]\n'+
        '*getDownメソッド\n'+
        '\n'+
        'パッドの下キーの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'pad.getDown();\n'+
        '>>\n'+
        '\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/getLeft.txt': 
        '[[Pad]]\n'+
        '*getLeftメソッド\n'+
        '\n'+
        'パッドの左キーの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'pad.getLeft();\n'+
        '>>\n'+
        '\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/getPixel.txt': 
        '[[Panel]]\n'+
        '\n'+
        '*getPixelメソッド\n'+
        '\n'+
        'パネル内の指定された座標の色を取得します．\n'+
        '\n'+
        '<<code\n'+
        'panel.getPixel(x,y);\n'+
        '//パネルのx,y座標のrgbaを配列で返します．\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-x : 色を取得したいx座標をあらわします\n'+
        '-y : 色を取得したいy座標をあらわします\n'
      ,
      'tonyu2/getRight.txt': 
        '[[Pad]]\n'+
        '*getRightメソッド\n'+
        '\n'+
        'パッドの右キーの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'pad.getRight();\n'+
        '>>\n'+
        '\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/getUp.txt': 
        '[[Pad]]\n'+
        '*getUpメソッド\n'+
        '\n'+
        'パッドの上キーの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'pad.getUp();\n'+
        '>>\n'+
        '\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/getkey.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*getkeyメソッド\n'+
        '\n'+
        'キーの押下状態を取得します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'getkey(code);\n'+
        '>>\n'+
        '\n'+
        '-code に調べたいキーのキーコード（数値）またはキーの名前（文字列）を指定します．\n'+
        '-キーの状態に応じて次の数値を返します\n'+
        '-- 0: 押されていない\n'+
        '-- 1: 押されたばかり\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\n'+
        '\n'+
        '* キーの名前とキーコード一覧\n'+
        '\n'+
        '<<code\n'+
        'left: 37 , up:38 , right: 39, down:40, \n'+
        'space:32, enter:13, shift:16, ctrl:17, alt:18, \n'+
        'A-Z: 65-90,  0-9: 48-57,  mouseleft: 1\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/hide.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*hideメソッド\n'+
        '\n'+
        'オブジェクトを非表示にします．\n'+
        '[[die]]メソッドと異なり，動作は続きます．再び表示するときは[[show]]メソッドを用います．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'hide();\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/ide.txt': 
        '[[index]]\n'+
        '\n'+
        '*プロジェクト選択画面(index.html)\n'+
        '\n'+
        '-「新規」ボタンでプロジェクトを作成します．作成すると自動的にプロジェクト編集画面に移動します．\n'+
        '-既存のプロジェクトを選択して，プロジェクト編集画面に移動します．\n'+
        '-「ログイン」メニューから[[ログイン>login]]と[[ファイルの同期>sync]]ができます．\n'+
        '\n'+
        '*プロジェクト編集画面(project.html)\n'+
        '\n'+
        '**メニュー\n'+
        '\n'+
        '-Home\n'+
        '-- プロジェクト選択画面に戻ります．\n'+
        '-ファイル\n'+
        '-- 新規作成\n'+
        '---新しくTonyu2のクラス（=ファイル）を作成します．\n'+
        '-- 名前変更\n'+
        '---現在開いているクラスの名前を変更します．\n'+
        '-- 削除\n'+
        '---現在開いているクラスを削除します．\n'+
        '--初期状態に戻す\n'+
        '---現在開いているプロジェクトが[[サンプルプロジェクト>samples]]の場合，プロジェクトを初期状態に戻します．\n'+
        '--このプロジェクト自身を削除\n'+
        '--- プロジェクト全体を削除します．\n'+
        '\n'+
        '-実行\n'+
        '-- ～を実行\n'+
        '--- 指定されたクラスのオブジェクトを1つ作成し，実行を始めます．\n'+
        '--停止\n'+
        '--- プログラムを停止させます．\n'+
        '-ツール\n'+
        '--[[マップエディタ>mapEditor]]\n'+
        '---マップエディタを起動します．\n'+
        '-ウィンドウ\n'+
        '--[[画像リスト>cpats]]\n'+
        '--[[プロジェクト オプション>options]]\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/index.txt': 
        '[[トップへ>../index]]\n'+
        '\n'+
        '*Tonyu2 リファレンス\n'+
        '\n'+
        '-[[チュートリアル]]\n'+
        '-[[言語仕様>lang]]\n'+
        '-[[標準ライブラリ>api]]\n'+
        '--[[用途別リファレンス]]\n'+
        '-[[開発環境>ide]]\n'+
        '-[[ファイルシステム>fs]]\n'+
        '-[[Tonyu1 と Tonyu2 の違い>diffTonyu1]]\n'+
        '\n'+
        '-[[トップへ>../index]]\n'+
        '\n'+
        '.'
      ,
      'tonyu2/isDead.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*isDeadメソッド\n'+
        '\n'+
        'オブジェクトに[[die]]メソッドが呼ばれたかどうかを返します\n'+
        '\n'+
        '<<code\n'+
        'b=isDead();\n'+
        '>>\n'+
        '\n'+
        'このオブジェクトにdieメソッドが呼ばれていれば，[[@arg b]]に[[@cfrag true]]を，そうでなければ[[@cfrag false]]を返します．\n'+
        '\n'
      ,
      'tonyu2/kernel.txt': 
        '[[api]]\n'+
        '\n'+
        '*カーネル\n'+
        '\n'+
        'Tonyu2の標準ライブラリです．\n'+
        '[[ファイルシステム>fs]]上の/Tonyu/Kernel/ で定義されています．'
      ,
      'tonyu2/lang.txt': 
        '[[index]]\n'+
        '\n'+
        '*言語仕様\n'+
        '\n'+
        '-Tonyu2は，そのプログラムをJavaScriptに変換してから実行します．\n'+
        '-Tonyu2で用いられる値やオブジェクトはJavaScriptの値やオブジェクトそのものです．そのため，Tonyu2からJavaScriptのオブジェクトを操作したり，JavaScriptからTonyu2のオブジェクトを操作したりできます．\n'+
        '\n'+
        'Tonyu2 の言語仕様は，基本的にはJavaScriptの言語仕様に準じますが，JavaScriptとは次のような違いがあります．\n'+
        '\n'+
        '-[[ファイル>fs]]全体が１つの[[クラス定義>classDef]]になります．\n'+
        '-親クラスのメソッド・コンストラクタ呼び出しは[[super]]を用います\n'+
        '-「待機可能モード」「待機不能モード」という2つの[[動作モード>waitmode]]があります．\n'+
        '-[[拡張構文>sugar]]があります\n'+
        '-[[for (.. in ..)>forin]]の挙動が違います\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/login.txt': 
        '[[ide]]\n'+
        '\n'+
        '* ログイン\n'+
        '\n'+
        '-[[@blink ログイン>#login]]をすると，サーバにプロジェクトを保存し，他のブラウザとプロジェクトを共有できます．\n'+
        '-- GoogleまたはTwitterのアカウントが必要です\n'+
        '-ログインするには，トップページ(http://tonyuedit.appspot.com/)を開き，メニューの「ログイン」を選びます．\n'+
        '--ログイン語は，メニューのログイン部分がユーザ名に変わります\n'+
        '-ログイン後[[@blink メニューのログイン>#login]]から[[@blink プロジェクトの同期>#syncProjects]]を選ぶと，プロジェクトが同期されます\n'+
        '-- 同期には数分間かかることがあります\n'+
        '-- サンプルプロジェクト（1_Animation ～ 14_File）は同期されません．\n'
      ,
      'tonyu2/mapEditor.txt': 
        '[[ide]]\n'+
        '\n'+
        '[[用途別リファレンス]]\n'+
        '\n'+
        '*マップエディタ\n'+
        '\n'+
        'マップエディタは，ゲーム中に使用するマップを描くためのツールです．\n'+
        '主な使用の流れは次の通り\n'+
        '\n'+
        '-画像リストに $pat_mapchip を追加\n'+
        '\n'+
        '-ツールからマップエディタを選択\n'+
        '\n'+
        '-Load Data?: Y or Nと表示されるので、すでに作ったマップをもとに改造する場合はキーボードのyを、新しくつくる場合はnを押す\n'+
        '\n'+
        '--nを押した場合、プロンプトが出るので、それぞれ入力する\n'+
        '---"input row"→縦に設置するチップの個数\n'+
        '---"input col"→横に設置するチップの個数\n'+
        '\n'+
        '--yを押した場合、プロンプトが出るので、ロードするファイルの名前を入力する。\n'+
        '---入力されたファイルが存在しないと、Load Failedと表示され、nを押した場合の動作に移動する\n'+
        '\n'+
        '-画面にマップチップがでるので、設置したいチップをクリックする\n'+
        '\n'+
        '-マップチップが消え、コンソールにset modeと表示される\n'+
        '--水色の範囲がマップの範囲なので、その中の任意の箇所をクリックすると選択中のチップが設置される\n'+
        '--マップはカーソルキーを使って上下左右に動かすことができるので、マップが画面より大きい場合などは適宜動かしてください\n'+
        '\n'+
        '-他のチップを選択したい場合はキーボードのgを押す。すると、get modeと表示され、マップチップが再び出てくるので設置したいチップを選びなおす\n'+
        '\n'+
        '-誤って設置したチップを消したい場合は、キーボードのeを押すと、erase modeと表示され、クリックした位置に設置されているチップを消すことができる\n'+
        '\n'+
        '-完成したマップをファイルに保存するときは、キーボードのpを押す。プロンプトが表示されるので、セーブするファイル名(例：stage1.json)を入力してOKを押す\n'+
        '\n'+
        '\n'+
        '*描いたマップをプログラム内で使用する\n'+
        '\n'+
        '<<code Main\n'+
        '$map=new Map{chipWidth:32,chipHeight:32};\n'+
        '$map.load("stage1.json");\n'+
        '>>\n'
      ,
      'tonyu2/mapGet.txt': 
        '[[用途別リファレンス]]\n'+
        '*マップチップを取得する\n'+
        '\n'+
        '*☆マップの配列を指定して取得する\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '//事前にマップを作っておく\n'+
        '//get(マップ配列のx番目,マップ配列のy番目);\n'+
        'chip=$map.get(2,3);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '*☆画面の座標を指定して取得する\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '//事前にマップを作っておく\n'+
        '//getAt(スクリーンのx座標,スクリーンのy座標);\n'+
        'chip=$map.getAt($mouseX,$mouseY);\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/mapscrollTo.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '*マップをスクロールさせる\n'+
        '\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '//事前にマップを作っておく\n'+
        'i=0;\n'+
        'while(true){\n'+
        '    $map.scrollTo(i,0);\n'+
        '    i++;\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-scrollTo(xの元の位置からの移動距離,yの元の位置からの移動距離);\n'+
        '\n'+
        '元の位置からの移動距離を指定するため、今まで移動した距離を覚えておく必要がある．\n'+
        '\n'+
        'スクリーン全体をスクロールさせる場合は、$Screen.scrollTo(sx,sy);を使用する．'
      ,
      'tonyu2/onUpdate.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*onUpdateメソッド\n'+
        '\n'+
        '[[update]]、[[updateEx]]が呼び出されたときにしたい処理をユーザが定義するメソッドです．\n'+
        '\n'+
        '詳しい処理内容については[[フレーム>frame]]を参照してください．\n'+
        '\n'+
        '*書式\n'+
        '\n'+
        '<<code\n'+
        'onUpdate();\n'+
        '>>\n'+
        '※onUpdateは[[update]]メソッドから自動的に呼び出されます．ユーザが直接呼び出す必要はありません．\n'+
        '\n'+
        '*例1\n'+
        '<<code\n'+
        'function onUpdate(){\n'+
        '    print("onUpdate");\n'+
        '}\n'+
        '>>\n'+
        'このように書くと、[[update]]の度に"onUpdate"という文字列がコンソールに表示されます．'
      ,
      'tonyu2/options.txt': 
        '[[ide]]\n'+
        '\n'+
        '*プロジェクト オプション\n'+
        '\n'+
        'プロジェクトオプションは，通常は操作する必要はありません．主にTonyu2自身の開発時に設定を変える場合に用います．\n'+
        '\n'+
        '-デフォルトの親クラス\n'+
        '-- [[クラスの定義>classDef]]において， extends を省略したときに継承される親クラスです．通常は[[Actor]]に設定します．\n'+
        '-実行\n'+
        '-- Mainクラス\n'+
        '--- 実行するときに最初に作成されるオブジェクトのクラスです．通常，「実行」メニューで最後に選ばれたクラスになっています．\n'+
        '-- Bootクラス\n'+
        '--- Mainクラスより前に，プログラム全体の初期化を行うクラスです．通常は[[Boot]]クラスです．ここに別のクラスを指定することで，初期化方法をカスタマイズできます．\n'+
        '-Kernelの開発を行う\n'+
        '-- 通常，ファイル →  新規 を選び，クラス名を入力したときに，それが[[標準ライブラリ>api]]に存在するクラス名と同名である場合は作成ができません\n'+
        '-- このチェックをonにすることで標準ライブラリと同名のクラスを作成できます．さらに，新規作成時に標準ライブラリにある同名のクラスの内容が現在のプロジェクトフォルダにコピーされます．\n'+
        '-- 標準ライブラリと同名のクラスの内容を変更することで，標準ライブラリの挙動を変更できます．ただし，変更が有効なのはこのプロジェクトのみです．\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/play.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*playメソッド\n'+
        '\n'+
        '音楽の演奏または停止を行います．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'play(mml1, mml2, ...)\n'+
        '>>\n'+
        '\n'+
        'mml に，音楽を演奏するための文字列を指定します．\n'+
        '書き方は，[[timbre.jsのMML>http://mohayonao.github.io/timbre.js/ja/mml.html]]\n'+
        'を参照してください．\n'+
        '\n'+
        'playメソッドを連続して実行すると，\n'+
        '最初に実行したplayメソッドの音楽の演奏が終わってから，\n'+
        '次の音楽が演奏されます．．\n'+
        '\n'+
        '例：\n'+
        '\n'+
        '<<code\n'+
        '// ドレミとミファソの和音を演奏し，それが終わったら\n'+
        'play("cde","efg");\n'+
        '// ミレドとソファミの和音を演奏する\n'+
        'play("edc","gfe");\n'+
        '>>\n'+
        '\n'+
        '**音楽の停止\n'+
        '\n'+
        '自分が鳴らしている音楽を止めるには次のようにします．\n'+
        '\n'+
        '<<code\n'+
        'play().stop()\n'+
        '>>\n'+
        '\n'+
        'あるいは，[[die]]メソッドを呼び出すと停止します．\n'+
        '\n'+
        '注意：音楽は，それぞれのオブジェクトが独立に鳴らすことができます．\n'+
        'そのため，音楽を鳴らしているオブジェクトを指定して止める必要があります．\n'+
        '例えば，自分以外のオブジェクト[[@cfrag a]]が演奏中であれば，次のようにします．\n'+
        '\n'+
        '<<code\n'+
        'a.play().stop()\n'+
        '>>\n'+
        'あるいは\n'+
        '<<code\n'+
        'a.die()\n'+
        '>>\n'+
        '\n'+
        '**演奏時間の取得\n'+
        '\n'+
        '演奏開始からの経過時間を取得するには，次のcurrentTimeメソッドを使います．\n'+
        '<<code\n'+
        'c.play().currentTime()\n'+
        '>>\n'+
        'ここで，cは演奏中のオブジェクトを指します．\n'+
        '\n'+
        '例：\n'+
        '<<code BGMObj\n'+
        'while (true) {\n'+
        '    play("cdefgfedc");\n'+
        '}\n'+
        '>>\n'+
        '<<code CurTimeDisp\n'+
        'c=new BGMObj;\n'+
        'while (true) {\n'+
        '    print(c.play().currentTime());\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '**参照\n'+
        '\n'+
        '[[playSE]] 　[[用途別リファレンス]]\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/playSE.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*playSEメソッド\n'+
        '\n'+
        '音楽を演奏しますが，[[play]]メソッドと異なり，演奏が終了するのを待ちません．\n'+
        '\n'+
        '書式はplayメソッドと同じです．\n'+
        '\n'+
        '**参照\n'+
        '\n'+
        '[[play]]メソッド\n'
      ,
      'tonyu2/png.txt': 
        '[[画像の挿入]]\n'
      ,
      'tonyu2/print.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*printメソッド\n'+
        '\n'+
        '[[コンソール>console]]に値を表示します．(JavaScriptのconsole.logと同じ)\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'print(value...);\n'+
        '>>\n'+
        'value（複数指定可）の値をコンソールに表示します．\n'+
        '\n'
      ,
      'tonyu2/resize.txt': 
        '[[ScaledCanvas]]\n'+
        '\n'+
        '*$Screen.resizeメソッド\n'+
        '\n'+
        'ゲーム画面のサイズを変更します．\n'+
        '\n'+
        '<<code\n'+
        '$Screen.resize(w,h);\n'+
        '>>\n'+
        '\n'+
        'wとh に画面幅と高さを指定します．\n'+
        '\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '<<code\n'+
        '$Screen.resize(500,300);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '※実際の画面（Canvas）の大きさが変わるのではなく，画面内に表示される仮想画面の大きさが変わります．\n'
      ,
      'tonyu2/rnd.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*rndメソッド\n'+
        '\n'+
        '乱数を返します\n'+
        '\n'+
        '*書式1\n'+
        '\n'+
        '<<code\n'+
        'rnd()\n'+
        '>>\n'+
        '\n'+
        '0以上1未満の実数乱数を返します\n'+
        '\n'+
        '*書式2\n'+
        '\n'+
        '<<code\n'+
        'rnd(n)\n'+
        '>>\n'+
        '\n'+
        '0以上n未満の整数乱数を返します\n'+
        '\n'+
        '*ヒント\n'+
        '\n'+
        'a以上b未満の実数乱数を返すには，次の式を用います．\n'+
        '\n'+
        '<<code\n'+
        'rnd()*(b-a)+a\n'+
        '>>\n'+
        '\n'+
        'a以上b未満の整数乱数を返すには，次の式を用います．\n'+
        '\n'+
        '<<code\n'+
        'rnd(b-a)+a\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/scrollTo.txt': 
        '[[Map]]\n'+
        '*scrollToメソッド\n'+
        '\n'+
        'マップをスクロールします．\n'+
        '\n'+
        '<<code\n'+
        'map.scrollTo(scrollX,scrollY);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '-scrollX : 最初の位置からずらすx座標をあらわします\n'+
        '-scrollY : 最初の位置からずらすy座標をあらわします\n'+
        '\n'+
        '最初の位置から右方向にscrollXドット，下方向にscrollYドットずらして表示します．左や上にずらす場合はscrollXとscrollYを負の値にします．'
      ,
      'tonyu2/set.txt': 
        '[[Map]]\n'+
        '*setメソッド\n'+
        '\n'+
        'マップにチップをはめ込みます．\n'+
        '一番左上のチップを(0,0)，その右隣のチップを(1,0)として指定された座標のパターンを設定します．\n'+
        '\n'+
        '<<code\n'+
        'map.set(setCol,setRow,p);\n'+
        '//マップのsetCol，setRow座標のパターンをpに設定します．\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-setCol : セットするx座標をあらわします\n'+
        '-setRow : セットするy座標をあらわします\n'+
        '-p : 表示するパターンの番号をあらわします \n'
      ,
      'tonyu2/setAt.txt': 
        '[[Map]]\n'+
        '*setAtメソッド\n'+
        '\n'+
        '指定した画面上の座標にマップパターンを設定します．\n'+
        '\n'+
        '<<code\n'+
        'map.setAt(setX,setY,p);\n'+
        '//画面のsetX，setY座標のパターンをpに設定します．\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-setX : セットする画面のx座標をあらわします\n'+
        '-setY : セットする画面のy座標をあらわします\n'+
        '-p : 表示するパターンの番号をあらわします \n'
      ,
      'tonyu2/setBGColor.txt': 
        '[[ScaledCanvas]]\n'+
        '\n'+
        '*$Screen.setBGColor メソッド\n'+
        '\n'+
        '画面の背景色を変更します．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        '$Screen.setBGColor(c)\n'+
        '>>\n'+
        '\n'+
        '[[@arg c]]は，画面の背景色をあらわす文字列（HTMLの色指定方法に準ずる）を指定します．\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        '$Screen.setBGColor("black");\n'+
        '>>\n'+
        '\n'+
        '<<code\n'+
        '$Screen.setBGColor("#ffeedd");\n'+
        '>>\n'+
        '\n'+
        '<<code\n'+
        '$Screen.setBGColor("rgb(200,100,50)");\n'+
        '>>'
      ,
      'tonyu2/setFillStyle.txt': 
        '[[Panel]]\n'+
        '*setFillStyleメソッド\n'+
        '\n'+
        'パネルの色を設定します．\n'+
        '\n'+
        '\n'+
        '<<code\n'+
        'panel.setFillStyle(color)\n'+
        '>>\n'+
        '\n'+
        '[[@arg color]]は，画面の背景色をあらわす文字列（HTMLの色指定方法に準ずる）を指定します．\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        'panel.setFillStyle("green");\n'+
        '>>\n'+
        '\n'+
        '<<code\n'+
        'panel.setFillStyle("#ffeedd");\n'+
        '>>\n'+
        '\n'+
        '<<code\n'+
        'panel.setFillStyle("rgb(200,100,50)");\n'+
        '>>'
      ,
      'tonyu2/setFrameRate.txt': 
        '[[Boot]]\n'+
        '*setFrameRateメソッド\n'+
        '\n'+
        'FPSを変更します．初期状態ではFPS=30です．\n'+
        '\n'+
        '**書式\n'+
        '\n'+
        '<<code\n'+
        'setFrameRate(fps,frameSkipMax)\n'+
        '>>\n'+
        '\n'+
        'fpsにゲームのFPS、frameSkipMaxに処理落ちした場合にスキップするフレーム数の最大値を渡します（何も渡さない場合は5になります）．\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '<<code\n'+
        '$Boot.setFrameRate(60);\n'+
        '// FPSを60に設定します\n'+
        '>>'
      ,
      'tonyu2/setPanel.txt': 
        '[[Panel]]\n'+
        '*setPanelメソッド\n'+
        '\n'+
        'パネルのサイズを設定します．\n'+
        '\n'+
        '<<code\n'+
        'panel.setPanel(width,height);\n'+
        '//パネルのサイズをwidth*heightに設定します．\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-width : パネルの横幅をあらわします\n'+
        '-height : パネルの縦幅をあらわします\n'
      ,
      'tonyu2/show.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*showメソッド\n'+
        '\n'+
        'オブジェクトを表示します．\n'+
        '\n'+
        '*書式\n'+
        '\n'+
        '<<code\n'+
        'show(x,y,p)\n'+
        '>>\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/sugar.txt': 
        '[[lang]]\n'+
        '\n'+
        '*拡張構文\n'+
        '\n'+
        '** \\ による関数・メソッド定義\n'+
        '\n'+
        '-[[@cfrag function]] と書く代わりに [[@cfrag \\]] と書くことができます．[[@plistref fun]]と[[@plistref back]]は等価です．\n'+
        '\n'+
        '<<code functionでメソッド定義 fun\n'+
        'function a(x,y) {\n'+
        '   return x+y;\n'+
        '}\n'+
        '>>\n'+
        '<<code \\でメソッド定義 back\n'+
        '\\a(x,y) {\n'+
        '   return x+y;\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '-無名関数にも使えます．\n'+
        '\n'+
        '<<code\n'+
        'onComplete=\\(evt) { alert("Complete") };\n'+
        '>>\n'+
        '\n'+
        '**引数渡しにおける()の省略\n'+
        '\n'+
        '関数・メソッド呼び出し時に，引数がオブジェクトリテラルまたは関数リテラルのみで構成される場合，()を省略できます．\n'+
        '\n'+
        '<<code\n'+
        '$("a").attr{target:"_top"};\n'+
        '// $("a").attr({target:"_top"}); と等価\n'+
        '\n'+
        '$("a").click \\(e) { alert("click"); };\n'+
        '// $("a").click(\\(e) { alert("click"); }); と等価\n'+
        '\n'+
        '>>\n'+
        '\n'+
        'また，通常の引数リスト＋オブジェクトリテラルまたは関数リテラルのみで構成される引数リストを組み合わせて書くこともできます\n'+
        '\n'+
        '<<code\n'+
        'sh.cp("src.txt","dst.txt") {v:true};\n'+
        '// sh.cp("src.txt","dst.txt",{v:true}); と等価\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '**オブジェクトリテラルの省略記法\n'+
        '\n'+
        '[[@cfrag {x:x}]]のように，属性名と値が同じ場合，[[@cfrag {x}]]と記述できます．\n'+
        '\n'
      ,
      'tonyu2/super.txt': 
        '[[lang]]\n'+
        '\n'+
        '*super\n'+
        '\n'+
        '**親クラスのコンストラクタを呼ぶ\n'+
        '\n'+
        '<<code\n'+
        'super(引数)\n'+
        '>>\n'+
        '\n'+
        '**親クラスと子クラスに同じ名前のメソッドがある場合，親クラスのメソッドを呼ぶ\n'+
        '\n'+
        '<<code\n'+
        'super.メソッド名(引数)\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/t1compats.txt': 
        '[[api]]\n'+
        '\n'+
        '* Tonyu1互換クラス\n'+
        '\n'+
        'Tonyu1で開発したアプリケーションを動作させるために必要なクラス群です。\n'+
        '\n'+
        '-[[PlainChar]]\n'+
        '-[[SpriteChar]]\n'+
        '-[[DxChar]]\n'+
        '-[[TextChar]]\n'+
        '-[[SecretChar]]\n'+
        '-[[T1Map]]\n'+
        '-[[T1Page]]\n'+
        '-[[MediaPlayer]]\n'+
        '\n'
      ,
      'tonyu2/update.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*updateメソッド\n'+
        '\n'+
        '現在の処理を中断し，描画などの処理を行います．\n'+
        '\n'+
        '詳しい処理内容については[[フレーム>frame]]を参照してください．\n'+
        '\n'+
        '*書式\n'+
        '\n'+
        '<<code\n'+
        'update();\n'+
        '>>\n'+
        '\n'+
        '使用例は、[[オブジェクトに動きを追加]]にあります。\n'+
        '\n'+
        '*その他\n'+
        '\n'+
        'このメソッドは待機系メソッドです．待機不能モードでは何も動作を行いません．（詳細は[[動作モード>waitmode]]を参照してください）\n'
      ,
      'tonyu2/updateEx.txt': 
        '[[BaseActor]]\n'+
        '\n'+
        '*updateExメソッド\n'+
        '\n'+
        '現在の処理を中断し，描画などの処理を行うupdateメソッドを複数フレームにわたり行います．\n'+
        '\n'+
        '\n'+
        '*書式\n'+
        '\n'+
        '<<code\n'+
        '// 5フレーム待機\n'+
        'updateEx(5);\n'+
        '>>\n'+
        '\n'+
        '*その他\n'+
        '\n'+
        'このメソッドは待機系メソッドです．待機不能モードでは何も動作を行いません．（詳細は[[動作モード>waitmode]]を参照してください）'
      ,
      'tonyu2/waitFor.txt': 
        '[[asyncResult]]\n'+
        '\n'+
        '*waitForメソッド\n'+
        '\n'+
        '使い方は[[asyncResult]]を参照してください．\n'
      ,
      'tonyu2/waitmode.txt': 
        '[[lang]]\n'+
        '\n'+
        '*動作モード\n'+
        '\n'+
        'Tonyu2には「待機可能モード」と「待機不能モード」という2つの動作モードがあります．\n'+
        '\n'+
        '** 待機可能モード\n'+
        '\n'+
        '待機可能モードで動作している間は，[[update]]などの，途中で動作を中断する（つまり，プログラムの動作を待機状態にする）メソッド（これを「待機系メソッド」と呼びます）が呼ばれたときに，一旦処理を中断し，描画や入力状態の更新などの処理を行います．\n'+
        '\n'+
        '待機可能モードで動作する条件として，次のものがあります\n'+
        '\n'+
        '-[[Actor]]クラスを継承したオブジェクトでは，mainメソッドは待機可能モードで動作します．\n'+
        '--ただし，mainメソッドから呼び出される他のメソッドが待機可能モードで動作しない場合もあります．次の条件を参照してください．\n'+
        '-待機可能モードで動作している間に，次のいずれかの形式をもつ文から呼び出されるメソッドは，待機可能モードで動作します．ただし，メソッド名はそのオブジェクト自身がもつメソッドを指しており，それが待機不能メソッド（後述）でない場合に限ります．\n'+
        '-- [[@cfrag メソッド名(引数...); ]]\n'+
        '-- [[@cfrag 戻り値=メソッド名(引数...); ]]\n'+
        '\n'+
        '**待機不能モード\n'+
        '\n'+
        '上で述べた条件にあてはまらない場合，「待機不能モード」で動作します．\n'+
        '待機不能モードでは，待機系メソッドが呼ばれても，途中で動作を中断しません．例えば，待機不能モード中にupdateメソッドが呼ばれても，何も動作を行いません．\n'+
        '\n'+
        '**待機不能メソッド\n'+
        '\n'+
        '待機可能モードでは，待機不能モードより動作が遅くなることがあります．そこで，待機系メソッドが呼び出されないことが明らかな場合，必ず待機不能モードで動作したほうが効率がよくなります．このようなメソッドを「待機不能メソッド」と呼びます．\n'+
        '\n'+
        '待機不能メソッドは，メソッドの定義の先頭に[[@cfrag nowait]]キーワードを追加して定義します．\n'+
        '\n'+
        '<<code\n'+
        'nowait \\myNoWaitMethod(arg1,arg2) {\n'+
        '\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '**例\n'+
        '\n'+
        '<<code\n'+
        '\n'+
        'method1();        //待機可能モードで動作\n'+
        'a=method1();      //待機可能モードで動作\n'+
        'a=10+method1();   //待機不能モードで動作\n'+
        'other.method1();  //待機不能モードで動作\n'+
        'method2();        //待機不能モードで動作\n'+
        '\n'+
        '\\method1() {\n'+
        '   for (i=0 ; i<20 ; i++) {\n'+
        '      x++;\n'+
        '      update(); // 待機可能モードなら，ここで待機する\n'+
        '   }\n'+
        '   return x;\n'+
        '}\n'+
        'nowait \\method2() {\n'+
        '   for (i=0 ; i<20 ; i++) {\n'+
        '      x--;\n'+
        '      update(); // ここでは待機しない\n'+
        '   }\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/あたり判定をつける.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・あたり判定をつける\n'+
        '\n'+
        'Shotクラスのループ外に下記を打ち込む\n'+
        '<<code\n'+
        '  thit=0;\n'+
        '>>\n'+
        '\n'+
        'Shotクラスのループ内に下記を打ち込む \n'+
        '<<codeShot\n'+
        '\n'+
        '    for(c in all(chara2)){\n'+
        '        if(abs(ox-c.ox)<50 && abs(oy-c.oy)<50 && abs(z-c.z)<50){//あたり判定\n'+
        '            c.hit = c.hit+1;//chara2のヒットカウントに1プラス\n'+
        '            thit = thit+1;\n'+
        '        }\n'+
        '    }\n'+
        '\n'+
        '\n'+
        '\n'+
        '    if(thit>=1){\n'+
        '        break;\n'+
        '    }\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '<<codechara2クラスループ外に\n'+
        '　　hit=0;\n'+
        '>>\n'+
        '<<codechara2クラスループ内に\n'+
        '　　if(hit >= 1){\n'+
        '        break;\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '以上を打ち込むと弾とchara2がその場で停止する。\n'+
        '\n'+
        '前　[[3D弾を打つ]] 次　[[3D背景]]\n'+
        '\n'+
        '追加要素　[[力加減の判定方法]]　　　　　　\n'
      ,
      'tonyu2/すべてのオブジェクトを消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '*すべてのオブジェクトを消す\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'new Enemy{x:100, y:100, p:4};\n'+
        'new Enemy{x:100, y:200, p:4};\n'+
        'new Enemy{x:100, y:300, p:4};\n'+
        'while(true){\n'+
        '    if(getkey("space")==1){\n'+
        '        all().die();\n'+
        '        die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        'スペースキーを押すとすべてのオブジェクトが消える。\n'+
        '\n'+
        '※all().die()...自身以外のオブジェクトをすべて消す。\n'+
        '\n'+
        'すべてのオブジェクトを消すのを利用すれば[[ゲームを繰り返し遊ぶ>リトライする]]プログラムなども実現できる。'
      ,
      'tonyu2/すべてのキャラクタに同じ動作を行なう.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '<<code\n'+
        'for (e in all(Enemy)) {\n'+
        '   // ここにeに対する処理\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/とある計算.txt': 
        '[[3Dキャラの表示]]\n'+
        '\n'+
        '**とある計算\n'+
        '\n'+
        '練習問題１の計算を解いてみると拡大率の変化推移の答えが出る。\n'+
        '\n'+
        '練習問題２の計算を解くとキャラが近づいた時の移動値の変化推移の答えが出る。\n'+
        '\n'+
        '\n'+
        '[[ren1.png]]\n'+
        '\n'+
        '\n'+
        'c:c+z=hs:h\n'+
        '\n'+
        'ch=hs(c+z)\n'+
        '\n'+
        'hs=c*h/(c+z)              \n'+
        '\n'+
        '-問１ 答え  hs=c*h/(c+z)\n'+
        '\n'+
        '\n'+
        '[[ren2.png]]\n'+
        '\n'+
        '\n'+
        '\n'+
        'c:(c+z)=ys:oy\n'+
        '\n'+
        'ys*(c+z)=c*oy\n'+
        '\n'+
        'ys = oy*c / (c+z)\n'+
        '\n'+
        '-問２　答え　ys = oy*c / (c+z)\n'+
        '\n'
      ,
      'tonyu2/オブジェクトに動きを追加.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>座標を指定してオブジェクトを表示する]]←　→[[次へ>複数のオブジェクトを出す]]\n'+
        '*オブジェクトに動きを追加する\n'+
        '\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'オブジェクトの座標の値を加算することでそれが画面にも反映されます。\n'+
        '-ここではxを加算し続けることでオブジェクトが右に動きます。\n'+
        '-[[update]]()は実行を一時停止させる命令で、while文の中に書いておかないと処理が重くなって動きを確認できなくなります。\n'+
        '\n'+
        'もう一度メニューの新規→ファイルで，今度はChara2 というファイルを作成してみましょう\n'+
        '\n'+
        '<<code Chara2\n'+
        'x=100;\n'+
        'y=200;\n'+
        'vy=0;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  y+=vy;\n'+
        '  vy+=0.1;\n'+
        '  if(y>$screenHeight){\n'+
        '    y=$screenHeight;\n'+
        '    vy=-vy;\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'メニューの実行→Chara2を実行を選ぶと、オブジェクトが跳ねる様子が見えます。\n'+
        '\n'+
        'こちらではvyというy方向の加速度を設定しその値をyに加えることで、\n'+
        '重力によって落下し、画面下部に触れると跳ねるような動きを再現しています。\n'+
        '\n'+
        'プログラム中に出てくる[[$screenHeight>$screenWidth,$screenHeight]] は、\n'+
        '画面の高さをあらわす変数です。\n'
      ,
      'tonyu2/オブジェクトに動きを追加する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*オブジェクトに動きを追加する\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'オブジェクトの座標の値を加算することでそれが反映される。ここではxを加算し続けることで右に動くオブジェクトを作成している。update()は実行を一瞬停止させる命令で、while文の中に書いておかないと処理の速度が早すぎてオブジェクトの動きを目で確認できない。\n'+
        '\n'+
        'もう一度メニューの新規→ファイルで，今度はChara2 というファイルを作成する\n'+
        '\n'+
        '<<code Chara2\n'+
        'x=100;\n'+
        'y=200;\n'+
        'vy=0;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  y+=vy;\n'+
        '  vy+=0.1;\n'+
        '  if(y>$screenHeight){\n'+
        '    y=$screenHeight;\n'+
        '    vy=-vy;\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        'メニューの実行→Chara2を実行を選ぶ\n'+
        '\n'+
        'こちらではvyというy方向の加速度を設定し、yに加えることで右に動きながら画面下部に触れると跳ねるオブジェクトを作成している。\n'
      ,
      'tonyu2/オブジェクトに名前を付けて値を設定する.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>複数のオブジェクトを出す]]←　→[[次へ>オブジェクトを宣言する際に値を設定する]]\n'+
        '\n'+
        '*オブジェクトに名前を付けて値を設定する\n'+
        '\n'+
        '[[@cfrag 名前=new ファイル名;]]\n'+
        'のように、作成したオブジェクトに名前を付けることで、そのオブジェクトに値を設定することができます。\n'+
        '\n'+
        'Mainを[[@plistref name]]のように変更します：\n'+
        '\n'+
        '<<code Main name\n'+
        'a=new Chara1;\n'+
        'a.x=100;\n'+
        'a.y=100;\n'+
        'b=new Chara1;\n'+
        'b.x=100;\n'+
        'b.y=200;\n'+
        '>>\n'+
        '\n'+
        'Chara1は、前ページの先頭2行（[[@cfrag x=100;]]と[[@cfrag y=100;]]）を削除してください。\n'+
        '\n'+
        '<<code Chara1 c1\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '実行すると、Chara1 のオブジェクトが違う場所に2つ表示されます。\n'+
        '\n'+
        '[[@plistref name]] では、Chara1のオブジェクトを2つ作り、それぞれa,bという名前をつけています。\n'+
        '\n'+
        '[[@cfrag a.x]] のように[[@cfrag オブジェクトの名前 . 変数名 ]]で、そのオブジェクトの変数に値を代入したり、読み出したりできます。\n'
      ,
      'tonyu2/オブジェクトに連続でぶつからないようにする.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[時間を計る]]\n'+
        '*フレーム数を条件にオブジェクトとの接触時の処理を書く\n'+
        '\n'+
        '<<code Main\n'+
        '$effectLimit=0;\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight;\n'+
        'p=0;\n'+
        'new Item{x:rnd($screenWidth),y:0,vy:3,p:8};\n'+
        'new Item{x:rnd($screenWidth),y:0,vy:3,p:8};\n'+
        'new Item{x:rnd($screenWidth),y:0,vy:3,p:8};\n'+
        'while(true){\n'+
        '    x=$mouseX;\n'+
        '    y=$mouseY;\n'+
        '    $effectLimit--;\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Item\n'+
        'while(y<$screenHeight){\n'+
        '    y+=vy;\n'+
        '    if(crashTo(Main) && $effectLimit<0){\n'+
        '        $effectLimit=90;\n'+
        '        die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        'die();\n'+
        '>>\n'+
        '\n'+
        '$effectLimitは0から始まり毎フレーム1ずつ減少している。\n'+
        '\n'+
        'Itemに接触した時、$effectLimitの値が0未満であれば値が90になりItemは消える。\n'+
        '\n'+
        '$effectLimitの値が0未満でなければItemに触れても接触時の処理は行われないため、2個目以降のItemは90フレーム＝3秒経過するまで触れても消えない。\n'+
        '\n'
      ,
      'tonyu2/オブジェクトのグラフィックを変える.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>オブジェクトの大きさや傾き、透明度を設定する]]← → [[次へ>オブジェクトの奥行きの設定]]\n'+
        '\n'+
        '*オブジェクトのグラフィックを変更する\n'+
        '\n'+
        '[[p>BaseActor]]という変数に値を代入すると、オブジェクトの画像を変更できます。\n'+
        'pの値の使い方や、独自の画像を使う方法については[[画像リスト>cpats]]を参照してください。\n'+
        '\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, p:$pat_base+2};\n'+
        'new Chara1{x:100, y:200, p:$pat_base+5};\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  rotation++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'
      ,
      'tonyu2/オブジェクトのグラフィックを変更する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*オブジェクトのグラフィックを変更する\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, p:$pat_base+2};\n'+
        'new Chara1{x:100, y:200, p:$pat_base+5};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        '（変更なし）\n'+
        '>>\n'+
        'オブジェクトの画像はpという変数によって管理されている。\n'+
        '画像データについては[[画像リスト>cpats]]を参照。'
      ,
      'tonyu2/オブジェクトの大きさ、傾き、透明度を設定する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '**オブジェクトの大きさ、傾き、透明度を設定する\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, scaleX:2};\n'+
        'new Chara1{x:200, y:200, rotation:45};\n'+
        'new Chara1{x:300, y:300, alpha:128};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  rotation++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'オブジェクトの大きさ、傾き、透明度はそれぞれscaleX、rotate、alphaで管理されている。これらの値も加減算することで回転や拡大などをさせることができる。\n'
      ,
      'tonyu2/オブジェクトの大きさや傾き、透明度を設定する.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>オブジェクトを宣言する際に値を設定する]]←　→[[次へ>オブジェクトのグラフィックを変える]]\n'+
        '**オブジェクトの大きさ、傾き、透明度を設定する\n'+
        '\n'+
        'オブジェクトの大きさ、傾き、透明度はそれぞれ[[scaleX、rotate、alpha>BaseActor]]で管理されています。これらの値も加減算することで回転や拡大などをさせたり、半透明のオブジェクトを表示させたりすることができます。\n'+
        '\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, scaleX:2};\n'+
        'new Chara1{x:200, y:200, rotation:45};\n'+
        'new Chara1{x:300, y:300, alpha:128};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  rotation++;\n'+
        '  update();\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/オブジェクトの奥行きの設定.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>オブジェクトのグラフィックを変える]]←　→ [[用途別リファレンス]]へ\n'+
        '\n'+
        '*オブジェクトに奥行きを設定する\n'+
        '\n'+
        '[[zOrder>BaseActor]]の値を設定することでオブジェクトの奥行きを決められます。値が小さいほど手前に表示されます。\n'+
        '\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, p:0, zOrder:0};\n'+
        'new Chara1{x:100, y:116, p:5, zOrder:1};\n'+
        'new Chara1{x:100, y:132, p:9, zOrder:2};\n'+
        '\n'+
        'new Chara1{x:200, y:100, p:0, zOrder:0};\n'+
        'new Chara1{x:200, y:116, p:5, zOrder:2};\n'+
        'new Chara1{x:200, y:132, p:9, zOrder:1};\n'+
        '\n'+
        'new Chara1{x:300, y:100, p:0, zOrder:1};\n'+
        'new Chara1{x:300, y:116, p:5, zOrder:0};\n'+
        'new Chara1{x:300, y:132, p:9, zOrder:2};\n'+
        '>>\n'+
        '\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  rotation++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '以上でチュートリアルは終了です。さらなる情報は[[用途別リファレンス]]にまとめています。\n'
      ,
      'tonyu2/オブジェクトをランダムな位置に表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[乱数を使う]]\n'+
        '*オブジェクトをランダムな位置に表示する\n'+
        '<<code Main\n'+
        'new Chara1{x:rnd($screenWidth),y:rnd($screenHeight),p:1};\n'+
        'new Chara1{x:rnd($screenWidth),y:rnd($screenHeight),p:2};\n'+
        'new Chara1{x:rnd($screenWidth),y:rnd($screenHeight),p:3};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        '何も書かないでよい\n'+
        '>>\n'+
        '実行すると画面上にランダムで3つのオブジェクトが表示される。\n'
      ,
      'tonyu2/オブジェクトを動かす.txt': 
        '[[用途別リファレンス]]\n'+
        '*getkey()という命令を使う\n'+
        '\n'+
        '**キー入力でオブジェクトを動かす\n'+
        'getkey()...()内のキーが押されているか判定する。押している間、値が増え続ける。\n'+
        '-0=押されていない\n'+
        '-1=押された\n'+
        '-2以上=押されたまま\n'+
        '\n'+
        'ダブルコーテーション("")でキーを指定する。\n'+
        'right,left,down,upで矢印キー、a～zでそれぞれのキーに対応している。\n'+
        '\n'+
        '[[上下左右に移動させる]]\n'+
        '\n'+
        '[[ジャンプして落ちる]]\n'+
        '\n'+
        '[[弾を撃つ]]\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '*マウスでオブジェクトを動かす\n'+
        'getkey()は左クリックがmouseleft、右クリックがmouserightで使用できる。オブジェクトをクリックした時に命令を実行したい場合はオブジェクトの座標と画像の大きさをマウスの位置で条件として指定すると良い。\n'+
        '\n'+
        '[[マウスの位置にオブジェクトを表示する]]\n'+
        '\n'+
        '[[クリックした時に動作をする]]\n'+
        '\n'+
        '[[特定の位置をクリックした時に動作をする]]\n'+
        '\n'+
        '\n'+
        '\n'+
        '\n'+
        '*タッチでオブジェクトを動かす\n'+
        '$touches[0]にタッチに関する値が入っている。タッチ非対応のPCなどから操作する場合はマウスの左クリックが対応している。\n'+
        '\n'+
        '[[タッチした位置にオブジェクトを表示する]]\n'
      ,
      'tonyu2/オブジェクトを宣言する際に値を設定する.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>オブジェクトに名前を付けて値を設定する]]←　→[[次へ>オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '\n'+
        '*オブジェクトの生成と値の設定を同時に行なう\n'+
        '\n'+
        '[[前ページ>オブジェクトに名前を付けて値を設定する]]のMainクラスは、[[@plistref main]]のように短く書くことができます：\n'+
        '\n'+
        '<<code Main main\n'+
        'new Chara1{x:100, y:100};\n'+
        'c=new Chara1{x:100, y:200};\n'+
        '>>\n'+
        '\n'+
        '[[@cfrag new クラス名{変数名:値, ....}]]で、オブジェクトを生成すると同時に変数の値も設定できます。\n'+
        '\n'+
        '使用する記号に [[@cfrag {}]]や[[@cfrag :]]など、普段あまり使わないものが含まれているので注意してください。\n'+
        '\n'+
        'なお、Chara1は前ページと同じです：\n'+
        '\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/オブジェクトを消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '*die()という命令を使う\n'+
        '※この命令で消されたオブジェクトは実行を停止する。\n'+
        '\n'+
        '[[自分自身を消す]]\n'+
        '\n'+
        '[[他のオブジェクトを消す]]\n'+
        '\n'+
        '[[当たり判定で当たったオブジェクトを消す]]\n'+
        '\n'+
        '[[当たり判定で敵に当たったらプレイヤーを消す]]\n'+
        '\n'+
        '[[すべてのオブジェクトを消す]]'
      ,
      'tonyu2/オブジェクトを移動させる.txt': 
        '[[オブジェクトを表示する]]\n'+
        'オブジェクト'
      ,
      'tonyu2/オブジェクトを表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '*オブジェクトを表示する\n'+
        '\n'+
        '--[[座標を指定してオブジェクトを表示する]]\n'+
        '--[[オブジェクトに動きを追加]]\n'+
        '--[[複数のオブジェクトを出す]]\n'+
        '--[[オブジェクトに名前を付けて値を設定する]]\n'+
        '--[[オブジェクトを宣言する際に値を設定する]]\n'+
        '--[[オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '--[[オブジェクトのグラフィックを変える]]\n'+
        '--[[特定の複数のオブジェクトに同じ動作を行う]]\n'+
        '--[[オブジェクトの奥行きの設定]]\n'
      ,
      'tonyu2/キャラクターを配置する.txt': 
        '[[api]]\n'
      ,
      'tonyu2/クリックした時に動作をする.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*クリックした時に動作をする\n'+
        '<<code\n'+
        'while(true){\n'+
        '  if(getkey("mouseleft")==1){\n'+
        '    $Score+=10;\n'+
        '  }\n'+
        'update();\n'+
        '}\n'+
        '>>\n'+
        '左クリックした時に$Scoreを10増やす。'
      ,
      'tonyu2/ジャンプして着地する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '\n'+
        '[[ジャンプして落ちる]]\n'+
        '*☆ジャンプしてオブジェクトに着地する\n'+
        '\n'+
        '<<code Main\n'+
        'x=150;\n'+
        'y=$screenHeight-48;\n'+
        'vy=0;\n'+
        'p=5;\n'+
        'roop=0;\n'+
        'new Block{x:x, y:$screenHeight-16};\n'+
        'while(roop<5){\n'+
        '  new Block{x:rnd($screenWidth), y:$screenHeight-16};\n'+
        '  roop++;\n'+
        '}\n'+
        'while(true){\n'+
        '  hantei=crashTo(Block);\n'+
        '  if(!hantei){\n'+
        '    vy++;\n'+
        '    y+=vy;\n'+
        '  }else{\n'+
        '    vy=0;\n'+
        '  }\n'+
        '  if(getkey("right")>0)	x+=3;\n'+
        '  if(getkey("left")>0)	x-=3;\n'+
        '  if(getkey("z")==1 && vy>=0){\n'+
        '    vy=-15;\n'+
        '    y+=vy;\n'+
        '    while(true){\n'+
        '      if(getkey("right")>0) x+=3;\n'+
        '      if(getkey("left")>0)  x-=3;\n'+
        '      vy++;\n'+
        '      y+=vy;\n'+
        '      hantei=crashTo(Block)\n'+
        '      if(hantei){\n'+
        '        break;\n'+
        '      }\n'+
        '      update();\n'+
        '    }\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Block\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '\n'+
        '最初にプレイヤーの下とランダムに5つの足場を表示し、左右に動きzキーでジャンプするプレイヤーを出現させる。当たり判定の値をhanteiに代入し、足場に触れてない間は落下させ、足場に触れている間は落下しないようにする。\n'+
        '\n'+
        '*☆ジャンプしてマップに着地する\n'+
        '\n'+
        '<<code Main\n'+
        '//事前にマップを作っておく\n'+
        'x=16;\n'+
        'y=$screenHeight-48;\n'+
        'vy=0;\n'+
        'p=5;\n'+
        'while(true){\n'+
        '    if(map.getAt(x,y+16)==-1){\n'+
        '        vy++;\n'+
        '        y+=vy;\n'+
        '    }else{\n'+
        '        vy=0;\n'+
        '    }\n'+
        '    if(getkey("right")>0)	x+=3;\n'+
        '    if(getkey("left")>0)	x-=3;\n'+
        '    if(getkey("z")==1 && vy>=0){\n'+
        '        vy=-15;\n'+
        '        y+=vy;\n'+
        '        while(true){\n'+
        '            if(getkey("right")>0) x+=3;\n'+
        '            if(getkey("left")>0)  x-=3;\n'+
        '            vy++;\n'+
        '            y+=vy;\n'+
        '            //マップに着地した場合。ここは1としているが、マップの床のチップ番号を入れる\n'+
        '            if(map.getAt(x,y+16)==1){\n'+
        '                break;\n'+
        '            }\n'+
        '            update();\n'+
        '        }\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        'マップを描画し、左右に動きzキーでジャンプするプレイヤーを出現させる。当たり判定は、プレイヤーの真下がブロックであるかどうか（ここでは、画像番号1を足場に設定しているため、画像番号1であるかどうか）を調べ、ブロックに触れてない間は落下させ、ブロックに触れている間は落下しないようにする。'
      ,
      'tonyu2/ジャンプして落ちる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*ジャンプして落ちる\n'+
        '\n'+
        '<<code\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while(true){\n'+
        '  if(getkey("z")==1){\n'+
        '    vy=-15;\n'+
        '    y+=vy;\n'+
        '    while(true){\n'+
        '      vy++;\n'+
        '      y+=vy;\n'+
        '      update();\n'+
        '    }\n'+
        '  }\n'+
        '}\n'+
        '>>\n'+
        'zキーを押すと跳ねて落下していく。\n'+
        '\n'+
        '地面に着地する動作については[[ジャンプして着地する]]を参照。'
      ,
      'tonyu2/スコアを表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[文字を表示する]]\n'+
        '\n'+
        '[[文字をテキストオブジェクトとして表示する]]\n'+
        '\n'+
        '<<code Main\n'+
        '$score=0;\n'+
        'new Score;\n'+
        'while(true){\n'+
        '  if(getkey("z")==1) $score+=10;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Score\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while(true) {\n'+
        '  text="Score:"+$score;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'zキーを押すとscoreが10増える。\n'
      ,
      'tonyu2/タッチした位置にオブジェクトを表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*タッチした位置にオブジェクトを表示する\n'+
        '<<code\n'+
        'while(true){\n'+
        '    if($touches[0].touched){\n'+
        '        x=$touches[0].x;\n'+
        '        y=$touches[0].y;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '$touches[0].touchedでタッチされているかどうかの判定を行う。\n'+
        '-touched=true...タッチされていない\n'+
        '-touched=false...タッチされている\n'+
        'また、タッチした座標はそれぞれ$touches[0].xと$touches[0].yに入っている。'
      ,
      'tonyu2/チュートリアル.txt': 
        '[[api]]\n'+
        '*チュートリアル\n'+
        '-[[座標を指定してオブジェクトを表示する]]\n'+
        '-[[オブジェクトに動きを追加]]\n'+
        '-[[複数のオブジェクトを出す]]\n'+
        '-[[オブジェクトに名前を付けて値を設定する]]\n'+
        '-[[オブジェクトを宣言する際に値を設定する]]\n'+
        '-[[オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '-[[オブジェクトのグラフィックを変える]]\n'+
        '-[[オブジェクトの奥行きの設定]]\n'
      ,
      'tonyu2/テキストオブジェクトとして時間を表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[時間を計る]]\n'+
        '*テキストオブジェクトとして時間を表示する\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '$time=0;\n'+
        'new Text{x:100,y:100};\n'+
        'while(true){\n'+
        '    $time++;\n'+
        '    update();\n'+
        '}\n'+
        '\n'+
        '・Text.Tonyu\n'+
        'while(true){\n'+
        '    text=floor($time/30);\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        'print()で表示すると画面が埋まってしまうため、テキストオブジェクトとして表示することで一箇所に時間を表示できる。\n'
      ,
      'tonyu2/フレーム数を計り、そこから時間を計算する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[時間を計る]]\n'+
        '*フレーム数から時間を計算する\n'+
        '<<code\n'+
        'time=0;\n'+
        'while(true){\n'+
        '  time++;\n'+
        '  print(floor(time/30));\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'Tonyu System2のfpsは30なので毎フレーム1ずつ増加するtimeを30で割ることで1秒を計ることが出来る。\n'+
        '\n'+
        '※print()...()内の文字を画面下に表示する。過去に表示したものは新しいものの上にずらして表示される。\n'+
        '\n'+
        '※floor()...()内を整数表示する。\n'
      ,
      'tonyu2/プログラムでマップを描く.txt': 
        '[[用途別リファレンス]]\n'+
        '*プログラム内でマップを描く\n'+
        '\n'+
        '*☆マップをはじめから作る場合\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '$map=new Map{chipWidth:32,chipHeight:32,row:10,col:10};\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '*☆マップの配列を指定して描く\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '//事前にマップを作っておく\n'+
        '//set(マップ配列のx番目,マップ配列のy番目,チップ);\n'+
        '$map.set(2,3,$pat_base+2);\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '*☆画面の座標を指定して描く\n'+
        '<<code\n'+
        '・Main.Tonyu\n'+
        '//事前にマップを作っておく\n'+
        '//setAt(スクリーンのx座標,スクリーンのy座標,チップ);\n'+
        '$map.setAt($mouseX,$mouseY,$pat_base+2);\n'+
        '>>\n'+
        '\n'
      ,
      'tonyu2/マウスの位置にオブジェクトを表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*マウスの位置にオブジェクトを表示する\n'+
        '<<code\n'+
        'while(true){\n'+
        '  x=$mouseX;\n'+
        '  y=$mouseY;\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/マウスクリックで力加減を判定する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '新しいファイル「PowerLabel」を作成する\n'+
        'Mainファイルのループ外に下記を打ち込む\n'+
        '\n'+
        '<<codeMain\n'+
        '\n'+
        '    ptime =0;   \n'+
        '    power = new PowerLabel{x:80,y:380,size:20};\n'+
        '    power.text = "";\n'+
        '\n'+
        '>>\n'+
        '\n'+
        'Mainファイルのループ内に下記を打ち込む\n'+
        '\n'+
        '<<code\n'+
        '\n'+
        '   power.text  = "power gauge"+floor(ptime);\n'+
        '   if(getkey("mouseleft")>=2){\n'+
        '            ptime+=1;//左クリックした時にptimeに＋１していく\n'+
        '   }\n'+
        '   if(getkey("mouseleft")==0 && ptime>0){\n'+
        '            //左クリックを離した時new Shotを実行する。\n'+
        '            new Shot{ ox:0,oy:20000,z:3000 ,p:2,zOrder:1,ptime};  \n'+
        '            ptime=0;//ptimeを０にする\n'+
        '   }\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '以前の3D弾を打つ　↓のプログラムはデリートして構わない\n'+
        '\n'+
        '<<codeMain\n'+
        'if(getkey(1)==1){\n'+
        '        new Shot{ ox:230,oy:200,z:2000 ,p:2,zOrder:1};\n'+
        '    //左クリックをしたときnew Shotを実行する。\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '以上を打ち込むと左クリックし続けるとパワーゲージが溜まっていき離すと弾が発射される処理が行われる。'
      ,
      'tonyu2/マップを描く.txt': 
        '[[api]]\n'+
        '*☆マップを描く\n'
      ,
      'tonyu2/ラインパネルと曲(音符).txt': 
        '[[用途別リファレンス]]\n'
      ,
      'tonyu2/ラインパネルと曲(音符)との同期.txt': 
        '[[用途別リファレンス]]\n'
      ,
      'tonyu2/ラインパネルと曲(音符)の同期.txt': 
        '[[用途別リファレンス]]\n'+
        '***ラインパネルと曲(音符)の同期\n'+
        '-既にOnpuクラスとLineクラスに書かれているが、以下の文で作成したラインのyの位置が$screenHeight*3/4の位置しているため、その位置÷2000ms(2秒）で音符の1拍目が自作したラインの中心に常に当たるようになる。\n'+
        '\n'+
        '\n'+
        '\n'+
        '<<code Onpu\n'+
        'while(true){\n'+
        '    t=$c.play().currentTime();\n'+
        '    y=(t-start)*($screenHeight*3/4)/2000;\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Line\n'+
        '$linePanel=new Panel{x:$screenWidth/2, \n'+
        'y:$screenHeight*3/4};\n'+
        '>>\n'+
        '\n'+
        '前へ  [[ラインパネルの作成]] 次へ　[[評価方法(1)]]'
      ,
      'tonyu2/ラインパネルと曲の同期.txt': 
        '[[ラインパネルの作成]]\n'
      ,
      'tonyu2/ラインパネルの作成.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***ラインパネルの作成\n'+
        '\n'+
        'ラインパネル(タッチして得点を得る部分)を作成する。\n'+
        '\n'+
        '**ラインパネルの作成の仕方\n'+
        '(例)\n'+
        '<<code Line\n'+
        '$linePanel=new Panel{x:$screenWidth/2, \n'+
        'y:$screenHeight*3/4};\n'+
        '$linePanel.setPanel($screenWidth,30);\n'+
        '\n'+
        '$linePanel.setFillStyle("yellow");\n'+
        '$linePanel.fillRect(0,0,$screenWidth,30);\n'+
        '>>\n'+
        '\n'+
        '<<code Main\n'+
        'new Line;\n'+
        '>>\n'+
        '-MainでLineクラスを呼び出す。\n'+
        '*解説\n'+
        '-まずPanelを作り、その中心の点の座標を設定する。例ではxを画面の横幅の中心、yを画面の縦幅の上から3/4の位置に設定している。\n'+
        '\n'+
        '-次にsetPanelでそのPanelの大きさを設定する。例ではwidthを画面の横幅全て、heightを30の長さで設定している。\n'+
        '\n'+
        '-そしてsetFillStyleで色を設定する。例ではyellow(黄)としている。\n'+
        '\n'+
        '-最後にfillRectでPanelの書き始めのx,yを指定し、指定した場所からの横幅と縦幅を設定し、四角形を描写する。例では書き始めのx,yをPanelの左上に設定し、横幅を端から端まで、縦幅を上から30という長さで設定している。\n'+
        '\n'+
        '前へ [[音符を降らせる]]　次へ [[ラインパネルと曲(音符)の同期]]'
      ,
      'tonyu2/リトライする.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[キャラクターを消す]]\n'+
        '\n'+
        '[[すべてのオブジェクトを消す]]\n'+
        '*Main全体をwhileで囲う\n'+
        '<<code Main\n'+
        'while(true){\n'+
        '//プレイヤーの配置などの初期設定\n'+
        '  p=new Player{x:300,y:300,HP:1};\n'+
        '  e=new Enemy{x:100,y:100,p:5};\n'+
        '  l=new Label{x:230,y:400,text:"GAMESTART"};\n'+
        '//初期設定ここまで\n'+
        '\n'+
        '  while(true){\n'+
        '    if(p.HP==0)l.text="GAMEOVER rを押すとリトライ";\n'+
        '    if(p.HP==0 && getkey("r")==1) {\n'+
        '      all().die();\n'+
        '      break;\n'+
        '    }\n'+
        '    update();\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Player\n'+
        'while(true){\n'+
        '  if(getkey("right")>0)	x+=3;\n'+
        '  if(getkey("left")>0)	x-=3;\n'+
        '  if(getkey("down")>0)	y+=3;\n'+
        '  if(getkey("up")>0)	y-=3;\n'+
        '  if(crashTo(Enemy))    HP-=1;\n'+
        '  if(HP==0)             die();\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '<<code Label\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '\n'+
        'ゲームの初期設定などを再度行うためにプログラム全体をループさせる事で、ゲームオーバーになった後に再度ゲームを実行してゲームを繰り返しプレイする事が出来る。\n'
      ,
      'tonyu2/上下左右に移動させる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '\n'+
        '*上下左右に移動させる\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while(true){\n'+
        '  if(getkey("right")>0)	x+=3;\n'+
        '  if(getkey("left")>0)	x-=3;\n'+
        '  if(getkey("down")>0)	y+=3;\n'+
        '  if(getkey("up")>0)	y-=3;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '画面中央に表示されているオブジェクトを矢印キーの上下左右で動かすことができる。\n'+
        '\n'+
        '※このままでは画面端より外側にはみ出すことができてしまう。画面外に出ないようにするためには[[画面端から出ないようにする]]設定が必要。\n'+
        '\n'+
        '※壁などの障害物にぶつかったら止まるようにするには[[当たり判定で壁にぶつかる]]ようにする。'
      ,
      'tonyu2/乱数を使う.txt': 
        '[[用途別リファレンス]]\n'+
        '*rnd()で値を指定する\n'+
        '※rnd()...0～()内の中でランダムに1つ値を選択する\n'+
        '\n'+
        '[[オブジェクトをランダムな位置に表示する]]\n'+
        '\n'+
        '[[画面の上からランダムにキャラを降らせる]]\n'+
        '\n'+
        '[[確率でオブジェクトを出現させる]]'
      ,
      'tonyu2/他のオブジェクトを消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '*他のオブジェクトを消す\n'+
        '<<code Main\n'+
        '$enemy=new Enemy{x:100, y:100};\n'+
        '$enemy2=new Enemy{x:100, y:200};\n'+
        'new Enemy{x:100, y:300};\n'+
        'while(true){\n'+
        '  if(getkey("z")) $enemy.die();\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        'zキーを押すと$enemyだけが消える。「Enemy.die()」のようにクラス名を指定してdieをすることは出来ないので注意。\n'+
        '\n'+
        '※～.die()...～で指定したオブジェクトを消す。\n'
      ,
      'tonyu2/前へ.txt': 
        '[[複数のオブジェクトを出す]]\n'
      ,
      'tonyu2/力加減の判定方法.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・力加減の判定方法\n'+
        '\n'+
        '新規ファイル作成　ファイル名「PowerLabel」\n'+
        'mainファイルのループ外に下記を打ち込む\n'+
        '\n'+
        '<<codemainループ外　　\n'+
        '　　ptime =0;\n'+
        '    power = new PowerLabel{x:80,y:50,size:20};\n'+
        '    power.text = "";\n'+
        '\n'+
        '>>\n'+
        '\n'+
        'mainファイルのループ内に下記を打ち込む\n'+
        '\n'+
        '<<codemainループ内　\n'+
        '　　power.text  = "power gauge"+floor(ptime);\n'+
        '\n'+
        '　　　　if(getkey("mouseleft")>=2){\n'+
        '            ptime+=1; //左クリックするとptimeに＋1していく\n'+
        '        }\n'+
        '        if(getkey("mouseleft")==0 && ptime>0){\n'+
        '            //左クリックを離した時new Shotを実行する。\n'+
        '            new Shot{ ox:0,oy:0,z:0 ,p:2,zOrder:1,ptime};\n'+
        '            \n'+
        '            ptime=0;\n'+
        '        }\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '実行し、左クリックするとパワーゲージがたまり離すと弾を撃ちパワーゲージを0にする\n'+
        '\n'+
        '\n'+
        '\n'+
        '以前のプログラム↓　の左クリックすると弾が出る処理はコメント化しても消しても構わない\n'+
        '\n'+
        '\n'+
        '<<code\n'+
        '　　if(getkey(1)==1){\n'+
        '        new Shot{ ox:0,oy:0,z:0 ,p:2,zOrder:1};\n'+
        '    //左クリックをしたときnew Shotを実行する。\n'+
        '    }\n'+
        '>>\n'+
        '\n'+
        '前　[[あたり判定をつける]]　\n'+
        '次　[[力加減を弾に適用する]]　\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/力加減を弾に適用する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '**・力加減を弾に適用する\n'+
        '\n'+
        '\n'+
        'Shotファイルのループ外に下記を打ち込む\n'+
        '\n'+
        '<<codeShot\n'+
        '\n'+
        '  vy=-ptime*2;\n'+
        '  mx=mx*0.25;\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '\n'+
        'Shotファイルのループ内に下記を打ち込む\n'+
        '\n'+
        '<<codeShot\n'+
        '\n'+
        ' 　 ox+=mx;\n'+
        '    oy+=vy;\n'+
        '    vy+=2;\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '以前の下記↓のプログラムはコメント化するか消す。\n'+
        '\n'+
        '<<codeShot\n'+
        '\n'+
        '  ox=mx;\n'+
        '  oy=my;\n'+
        '    \n'+
        '\n'+
        '>>\n'+
        '\n'+
        'マウスクリックした長さによって放物線を描く弾の軌道が異なる処理を行う。\n'+
        '\n'+
        '\n'+
        '前　[[力加減の判定方法]]　\n'
      ,
      'tonyu2/効果音を鳴らす.txt': 
        '[[用途別リファレンス]]\n'
      ,
      'tonyu2/宣言する際にオブジェクトの値を設定する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*宣言する際にオブジェクトの値を設定する\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100};\n'+
        'c=new Chara1{x:100, y:200};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '「new ～」でファイルを呼び出す際に{}でくくることで値を設定できる。[[名前を付けて呼び出す>特定のオブジェクトの値を設定する]]のと併用もできる。\n'+
        '\n'+
        '{}や:など、書き方が特殊なので注意。'
      ,
      'tonyu2/左右に移動させる.txt': 
        '[[画面端から出ないようにする]]\n'
      ,
      'tonyu2/座標を指定してオブジェクトを表示する.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '→[[次へ>オブジェクトに動きを追加]]\n'+
        '\n'+
        '*新しいクラス（プログラムファイル）を作成する\n'+
        '\n'+
        'メニューのファイル→新規を選び，クラス名（ここではChara1とする）を入力します。\n'+
        '\n'+
        '*座標を指定してオブジェクトを表示する\n'+
        '\n'+
        '次のプログラムを入力します。\n'+
        '\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        '>>\n'+
        '\n'+
        'メニューの「実行」→「Chara1を実行」 を選ぶと、[[xとy>BaseActor]]で指定された位置にオブジェクトが表示されます。'
      ,
      'tonyu2/座標を指定する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*座標を指定する\n'+
        '\n'+
        'メニューのファイル→新規を選び，クラス名（ここではChara1とする）を入力し，次のプログラムを入力する．\n'+
        '\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        '>>\n'+
        '座標を指定して実行(メニューの実行→Chara1を実行)するとその位置にオブジェクトが表示される。'
      ,
      'tonyu2/弾を撃つ.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*弾を撃つ\n'+
        '<<code Main\n'+
        'if(getkey("space")==1){\n'+
        '  $b = new Bullet;\n'+
        '  $b.x=x;\n'+
        '  $b.y=y;\n'+
        '  $b.p=25;\n'+
        '}\n'+
        '>>\n'+
        '<<code Bullet\n'+
        'while(y>0){\n'+
        '  y=y-4;\n'+
        '  update();\n'+
        '}\n'+
        'die();\n'+
        '>>\n'+
        'スペースキーを押すとBulletオブジェクトが出現する。\n'+
        '\n'+
        'Bulletは画面上端に到達するまで上に移動していき、上端に到達すると消える。'
      ,
      'tonyu2/当たり判定で壁にぶつかる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '\n'+
        '[[上下左右に移動させる]]\n'+
        '\n'+
        '*当たり判定で壁にぶつかる\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100, p:5};\n'+
        'new Chara1{x:100, y:132, p:5};\n'+
        'new Chara1{x:100, y:164, p:5};\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while(true){\n'+
        '  if(getkey("right")>0){\n'+
        '    x+=3;\n'+
        '    if(crashTo(Chara1)){\n'+
        '      x-=3;\n'+
        '    }\n'+
        '  }\n'+
        '  if(getkey("left")>0){\n'+
        '    x-=3;\n'+
        '    if(crashTo(Chara1)){\n'+
        '      x+=3;\n'+
        '    }\n'+
        '  }\n'+
        '  if(getkey("down")>0){\n'+
        '    y+=3;\n'+
        '    if(crashTo(Chara1)){\n'+
        '      y-=3;\n'+
        '    }\n'+
        '  }\n'+
        '  if(getkey("up")>0){\n'+
        '    y-=3;\n'+
        '    if(crashTo(Chara1)){\n'+
        '      y+=3;\n'+
        '    }\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '<<code Chara1\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '\n'+
        '上下左右に動かせる中央のオブジェクトがChara1とぶつかると押し戻されるようにし、重なることができないようにする。\n'+
        '\n'+
        '※crashTo()...()内のオブジェクトと当たり判定を行い値を返す。\n'+
        '-当たってる=true\n'+
        '-当たってない=false'
      ,
      'tonyu2/当たり判定で当たったオブジェクトを消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '*当たり判定で当たったオブジェクトを消す\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'new Enemy{x:100, y:100, p:4};\n'+
        'new Enemy{x:100, y:200, p:4};\n'+
        'new Enemy{x:100, y:300, p:4};\n'+
        'while(true){\n'+
        '    if(getkey("right")>0)	x+=3;\n'+
        '    if(getkey("left")>0)	x-=3;\n'+
        '    if(getkey("down")>0)	y+=3;\n'+
        '    if(getkey("up")>0)	y-=3;\n'+
        '    e=crashTo(Enemy);\n'+
        '    if(e){\n'+
        '        e.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '上下左右に動かせる中央のオブジェクトにぶつかったEnemyが消える。\n'+
        '\n'+
        '※crashTo()...()内のオブジェクトと当たり判定を行い値を返す。\n'+
        '-当たってる=true\n'+
        '-当たってない=false\n'+
        '\n'+
        '当たり判定を変更するにはgetCrashRect()という命令を使う。\n'+
        '\n'+
        '→[[当たり判定を変更する]]'
      ,
      'tonyu2/当たり判定で敵に当たったらプレイヤーを消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '*当たり判定で当たったらプレイヤーを消す\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'new Enemy{x:100, y:100, p:4};\n'+
        'new Enemy{x:100, y:200, p:4};\n'+
        'new Enemy{x:100, y:300, p:4};\n'+
        'while(true){\n'+
        '    if(getkey("right")>0)	x+=3;\n'+
        '    if(getkey("left")>0)	x-=3;\n'+
        '    if(getkey("down")>0)	y+=3;\n'+
        '    if(getkey("up")>0)	y-=3;\n'+
        '    e=crashTo(Enemy);\n'+
        '    if(e){\n'+
        '        die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '上下左右に動かせる中央のオブジェクトがEnemyにぶつかると自身が消える。\n'
      ,
      'tonyu2/当たり判定の大きさを変える.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '<<code\n'+
        '//当たり判定の大きさを5*5に設定する\n'+
        '\\getCrashRect() {\n'+
        '   return {x,y,width:5, height:5};\n'+
        '}\n'+
        '>>\n'
      ,
      'tonyu2/当たり判定を変更する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '\n'+
        '[[当たり判定で当たったオブジェクトを消す]]\n'+
        '*当たり判定を変更する\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        '\\getCrashRect() {\n'+
        '  return {x,y,width:5, height:5};\n'+
        '}\n'+
        'new Enemy{x:100, y:100, p:4};\n'+
        'new Enemy{x:100, y:200, p:4};\n'+
        'new Enemy{x:100, y:300, p:4};\n'+
        'while(true){\n'+
        '  if(getkey("right")>0)	x+=3;\n'+
        '  if(getkey("left")>0)	x-=3;\n'+
        '  if(getkey("down")>0)	y+=3;\n'+
        '  if(getkey("up")>0)	y-=3;\n'+
        '  e=crashTo(Enemy);\n'+
        '  if(e){\n'+
        '    e.die();\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Enemy\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '\\getCrashRect()...オブジェクトの当たり判定をreturnで返した値に変更する。\n'
      ,
      'tonyu2/拡張機能.txt': 
        '[[用途別リファレンス]]\n'+
        '***拡張機能\n'+
        '**ここでは＋αの機能を説明する。\n'+
        '\n'+
        '-画像のx軸の位置をランダムに設定する。\n'+
        '-変数xに乱数を格納したい場合、下記の例のようにすればよい。\n'+
        '<<code (例)\n'+
        'x=rnd($screenwidth);\n'+
        '>>\n'+
        '\n'+
        '-例のxの値には、最大で画面の横幅までの値がランダムに入る。\n'+
        '\n'+
        '前へ [[評価方法(2)]]\n'
      ,
      'tonyu2/文字をテキストオブジェクトとして表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[文字を表示する]]\n'+
        '*文字をテキストオブジェクトとして表示する\n'+
        '<<code Main\n'+
        'new Txt{x:100, y:100, text:"文字A"};\n'+
        'new Txt{x:100, y:200, text:"文字B", fillStyle:"black"};\n'+
        'new Txt{x:100, y:300, text:"文字C", size:50};\n'+
        '>>\n'+
        '<<code Txt\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        'textという変数を設定するとそのオブジェクトはテキストオブジェクトとして扱われる。fillStyleで文字の色、sizeで文字の大きさを設定できる。\n'+
        '\n'+
        'ゲームのスコアを表示する際などによく使う。→[[スコアを表示する]]'
      ,
      'tonyu2/文字を画面下部に表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[文字を表示する]]\n'+
        '*文字を画面下部に表示する\n'+
        '<<code\n'+
        'x=100;\n'+
        'print("ここに文字が出ます");\n'+
        'print(x);\n'+
        'print("x="+x);\n'+
        '>>\n'+
        'print()...()内の文字を画面下部に出力する。変数などはそのまま出力でき、ダブルコーテーションで囲うと文字列になる。次のprint()が実行されると前の文字は上にずれて表示される。'
      ,
      'tonyu2/文字を表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '*文字を表示する\n'+
        '[[文字を画面下部に表示する]]\n'+
        '\n'+
        '[[文字をテキストオブジェクトとして表示する]]\n'
      ,
      'tonyu2/時間を計る.txt': 
        '[[用途別リファレンス]]\n'+
        '*時間を計る\n'+
        '[[フレーム数を計り、そこから時間を計算する]]\n'+
        '\n'+
        '[[テキストオブジェクトとして時間を表示する]]\n'+
        '\n'+
        '[[オブジェクトに連続でぶつからないようにする]]'
      ,
      'tonyu2/曲の作成.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '別途リンク 　[[play]] [[playSE]]\n'+
        '\n'+
        '***曲の作成\n'+
        '\n'+
        'ここでは音の出し方から曲を完成するまでの流れを説明する。\n'+
        'Tonyu system2でのテンポは120なので1分間に4分音符が120回分打てるということになる。\n'+
        '\n'+
        'なので\n'+
        '60(秒)÷120＝500ms(0.5秒)となる。\n'+
        '\n'+
        '\n'+
        'なのでここでは 2秒 = 1小節と考える。\n'+
        '\n'+
        '**音符の設定\n'+
        '-ド=c レ=d ミ=e ファ=f ソ=g ラ=a シ=b\n'+
        '\n'+
        '<<code (例)\n'+
        ' play("c"); //ドの音を鳴らす\n'+
        '>> \n'+
        '\n'+
        '-連続で音を鳴らす\n'+
        '<<code (例)\n'+
        'play("cd"); //ド→レと連続鳴らす\n'+
        '>>\n'+
        '\n'+
        '-c○=ドの音を○分音符で鳴らす\n'+
        '<<code (例)\n'+
        'play("c4"); //ドの音を4分音符で鳴らす\n'+
        '>>\n'+
        '\n'+
        '-休符を置く\n'+
        '<<code (例)\n'+
        'play("r1"); //全休符を置く\n'+
        '>>\n'+
        '-l(英字のエル)○=指定がない場合○分音符\n'+
        '\n'+
        '<<code (例)\n'+
        'play("l4 c"); //特に指定がなければ4分音符分の長さのドを鳴らす\n'+
        '>>\n'+
        ' \n'+
        '- <...1オクターブ上がる\n'+
        '- >...1オクターブ下がる\n'+
        '<<code (例)\n'+
        'play("cd<cd"); //<の後が1オクターブ上がる\n'+
        '>>\n'+
        '\n'+
        '-同時に音を鳴らす\n'+
        '<<code (例)\n'+
        ' play("a","c") = ラとドを同時に鳴らす\n'+
        '>>\n'+
        '\n'+
        '-半音上げるためには+、半音下げるためには-を音の後に書く\n'+
        '<<code (例)\n'+
        'play("a-","a+"); //ドのフラット、ドのシャープを鳴らす\n'+
        '>>\n'+
        '\n'+
        '-デフォルトのオクターブ（音階）はo4\n'+
        '-オクターブとはある音階を基準とした、音の高さの異なる同名の音階までの音程のこと\n'+
        '-つまり音階を変えたい場合は次のように設定する\n'+
        '\n'+
        '<<code(例)\n'+
        'play("o3cdef"); //1オクターブ(音階)下げてドレミファと鳴らす\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '-効果音を作る。\n'+
        '<<code(例)\n'+
        'playSE("l40o5<ccccccccccccccr2cccccccccccccc");   //着信音\n'+
        'playSE("o5l28e<c");// 決定音\n'+
        '>>\n'+
        '-作った効果音をplayの後にSEとつける。\n'+
        '-任意の場所に効果音をつけることができる。\n'+
        '前へ 曲の作成 次へ 画像の挿入\n'+
        '\n'+
        '**プログラム文\n'+
        '(例：キラキラ星)                                    \n'+
        '\n'+
        '別にStarクラス(自作した曲のクラス)を作成し、Mainクラスから呼び出せるようにする。\n'+
        '<<code Star\n'+
        'play("r1");\n'+
        'play("l4 ccggaag2ffeeddc2","l4 eeeeffe2ddcc>ab<g2","r1r1r1r2/1e2");\n'+
        'play("l4 ggffeed2ggffeed2","l4 eeddcc>b2 <l4eeddcc>b2");\n'+
        'play("l4 ccggaag2ffeeddc2","l4 r1a8b8<c8>a8g2r8/1f8g8f8r8/1e8g8e8r8/1d8g8d8c2");\n'+
        '>>\n'+
        '\n'+
        '<<code Main\n'+
        '$c=new Star;\n'+
        '>> \n'+
        '-MainでStarクラスを呼び出す。\n'+
        '\n'+
        '次へ　[[画像の挿入]]'
      ,
      'tonyu2/曲の演奏時間の取得.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***曲の演奏時間の取得\n'+
        '\n'+
        '曲を作成したら、次にその曲の演奏時間（タイミングチャート）を測定する。\n'+
        'ある一定のタイミングで音符を降らし、特定の場所に音符を重ねるためには演奏時間を測定しなければならない。なのでここでは演奏時間の取得の仕方を説明する。\n'+
        '\n'+
        '\n'+
        '\n'+
        '**演奏時間の取得\n'+
        '\n'+
        '演奏開始からの経過時間を取得するには，次のCurrentTimeメソッドを使う。\n'+
        '<<code (例)\n'+
        'c.play().currentTime();\n'+
        '>>\n'+
        '-ここで，cは演奏中のオブジェクトを指す。\n'+
        '\n'+
        '<<code BGMObj(例)\n'+
        'while (true) {\n'+
        '    play("cdefgabc<");\n'+
        '}\n'+
        '>>\n'+
        '-本来while文は、update();が必要であるが、play命令はplay文の中の演奏が終わるまで実行していくため、省略しても良い。\n'+
        '-例ではドレミファソラシドと演奏する。\n'+
        '\n'+
        '<<code CurrentTime(例)\n'+
        'c=new BGMObj;\n'+
        'while (true) {\n'+
        '    print(c.play().currentTime());\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '-例ではBGMObjクラスを呼び出し、BGMObjの演奏時間を取得する。\n'+
        '\n'+
        '\n'+
        '<<code Main\n'+
        'new CurrentTime;\n'+
        '>>\n'+
        '\n'+
        '<<code CurrentTime(例)\n'+
        'size=50;\n'+
        'x=100;\n'+
        'y=100;\n'+
        'text=0;\n'+
        '\n'+
        'while(true){\n'+
        'ct=$c.play().currentTime();\n'+
        'if(ct>-1){\n'+
        '　　　text=(floor(ct/100));\n'+
        '}\n'+
        '}\n'+
        '>>\n'+
        '-演奏時間を画面に表示する。\n'+
        '-MainでCurrentTimeクラスを呼び出す。\n'+
        '\n'+
        '参照メソッド [[play]] \n'+
        '\n'+
        '前へ [[画像の挿入]]　次へ [[音符を降らせる]]'
      ,
      'tonyu2/曲の演奏時間の図り方.txt': 
        '[[ラインと曲の同期]]\n'
      ,
      'tonyu2/曲の演奏時間の図り方、タイミングチャート.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '曲を作成したら、次にその曲の演奏時間（タイミングチャート）を図る。\n'+
        'ある一定にタイミングで音を降らし、特定の場所に音符を落とすためには演奏時間を図り、それに伴いどこのタイミングで一拍としての音符を降らせるかどうかということになる。\n'+
        '\n'+
        '\n'+
        '\n'+
        '**ラインの作成の仕方\n'+
        '(例)\n'+
        '<<code\n'+
        '$linePanel=new Panel{x:$screenWidth/2, y:$screenHeight*3/4};\n'+
        '//xはスクリーンの横幅の真ん中の点を描写し、\n'+
        'yはスクリーンの縦幅の3/4の点を表示する\n'+
        '$linePanel.setPanel($screenWidth,30);\n'+
        '//xの点からの長さを決める(スクリーンの横幅)、\n'+
        'yの点からの長さを決める(30の長さ)\n'+
        '\n'+
        '$linePanel.setFillStyle("blue");\n'+
        '//パネルの色を設定する(今回は青)\n'+
        '$linePanel.fillRect(0,0,465,20);\n'+
        '//1つ目の数値はパネル内のxの座標を表示する(0)、\n'+
        '2つ目の数値はパネル内のyの座標を表示する(0)、\n'+
        '//3つ目の数値は四角形の横幅の長さを設定する(465)、\n'+
        '4つ目の数値は四角形の縦幅の長さを表示する(20)\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '**演奏時間の取得\n'+
        '\n'+
        '演奏開始からの経過時間を取得するには，次のcurrentTimeメソッドを使います．\n'+
        '<<code\n'+
        'c.play().currentTime()\n'+
        '>>\n'+
        'ここで，cは演奏中のオブジェクトを指します．\n'+
        '\n'+
        '例：\n'+
        '<<code BGMObj\n'+
        'while (true) {\n'+
        '    play("cdefgfedc");\n'+
        '}\n'+
        '>>\n'+
        '<<code CurTimeDisp\n'+
        'c=new BGMObj;\n'+
        'while (true) {\n'+
        '    print(c.play().currentTime());\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '\n'+
        '参照メソッド [[play]] [[]]'
      ,
      'tonyu2/特定のオブジェクトの値を設定する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*特定のオブジェクトの値を設定する\n'+
        '\n'+
        '<<code Main\n'+
        'a=new Chara1;\n'+
        'a.x=100;\n'+
        'a.y=100;\n'+
        'b=new Chara1;\n'+
        'b.x=100;\n'+
        'b.y=200;\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'ファイル呼び出しの際に呼び出したオブジェクトに名前を付けることでそれぞれの値を設定することができる。'
      ,
      'tonyu2/特定の位置をクリックした時に動作をする.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '*特定の位置をクリックした時に動作をする\n'+
        '<<code\n'+
        'while(true){\n'+
        '  if(getkey("mouseleft")==1 && $mouseX>=60 && 　　　　$mouseX<=124 && $mouseY>=100 && $mouseY<=164){\n'+
        '    $Score+=30;\n'+
        '  }\n'+
        'update();\n'+
        '}\n'+
        '>>\n'+
        'xが60以上124以下、yが100以上164以下の位置を左クリックすると$Scoreが30増える。指定した範囲の中にオブジェクトを配置したりする事でボタンのように扱うこともできる。'
      ,
      'tonyu2/特定の複数のオブジェクトに同じ動作を行う.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*特定の複数のオブジェクトに同じ動作を行う\n'+
        '<<code Main\n'+
        'new Chara1{x:100, y:100};\n'+
        'new Chara1{x:200, y:100};\n'+
        'new Chara2{x:300, y:100};\n'+
        'while(true){\n'+
        '    for (c in all(Chara1)) {\n'+
        '        c.x++;\n'+
        '        c.y++;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Chara1\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '<<code Chara2\n'+
        '何も書かなくてよい\n'+
        '>>\n'+
        '\n'+
        'for(~ in all(オブジェクト名))で指定したオブジェクトすべてに同じ命令を与えることができる。'
      ,
      'tonyu2/用途別リファレンス.txt': 
        '[[api]]\n'+
        '\n'+
        '*用途別リファレンス\n'+
        '\n'+
        '-[[チュートリアル(オブジェクトを表示する・動かす)>チュートリアル]]\n'+
        '--[[座標を指定してオブジェクトを表示する]]\n'+
        '--[[オブジェクトに動きを追加]]\n'+
        '--[[複数のオブジェクトを出す]]\n'+
        '--[[オブジェクトに名前を付けて値を設定する]]\n'+
        '--[[オブジェクトを宣言する際に値を設定する]]\n'+
        '--[[オブジェクトの大きさや傾き、透明度を設定する]]\n'+
        '--[[オブジェクトのグラフィックを変える]]\n'+
        '--[[オブジェクトの奥行きの設定]]\n'+
        '\n'+
        '-[[文字を表示する]]\n'+
        '--[[コンソールに文字を表示する>文字を画面下部に表示する]]\n'+
        '--[[文字をテキストオブジェクトとして表示する]]\n'+
        '---[[スコアを表示する]]\n'+
        '\n'+
        '-[[キーボード、マウス、タッチパネルでオブジェクトを動かす>オブジェクトを動かす]]\n'+
        '--[[上下左右に移動させる]]\n'+
        '---[[画面端から出ないようにする]]\n'+
        '---[[当たり判定で壁にぶつかる]]\n'+
        '--[[ジャンプして落ちる]]\n'+
        '---[[ジャンプして着地する]]\n'+
        '--[[弾を撃つ]]\n'+
        '--[[マウスの位置にオブジェクトを表示する]]\n'+
        '--[[クリックした時に動作をする]]\n'+
        '--[[特定の位置をクリックした時に動作をする]]\n'+
        '--[[タッチした位置にオブジェクトを表示する]]\n'+
        '\n'+
        '-[[オブジェクトを消す]]\n'+
        '--[[自分自身を消す]]\n'+
        '--[[他のオブジェクトを消す]]\n'+
        '--[[当たり判定で当たったオブジェクトを消す]]\n'+
        '---[[当たり判定を変更する]]\n'+
        '--[[当たり判定で敵に当たったらプレイヤーを消す]]\n'+
        '--[[すべてのオブジェクトを消す]]\n'+
        '---[[リトライする]]\n'+
        '\n'+
        '-[[乱数を使う]]\n'+
        '--[[オブジェクトをランダムな位置に表示する]]\n'+
        '--[[画面の上からランダムにキャラを降らせる]]\n'+
        '--[[確率でオブジェクトを出現させる]]\n'+
        '\n'+
        '-[[時間を計る]]\n'+
        '--[[フレーム数を計り、そこから時間を計算する]]\n'+
        '--[[テキストオブジェクトとして時間を表示する]]\n'+
        '--[[オブジェクトに連続でぶつからないようにする]]\n'+
        '\n'+
        '-マップを描く\n'+
        '--[[マップエディタでマップを描く>mapEditor]]\n'+
        '--[[プログラムでマップを描く]]\n'+
        '--[[マップチップを取得する>mapGet]]\n'+
        '--[[マップをスクロールさせる>mapscrollTo]]\n'+
        '\n'+
        '-[[疑似3D表示を行う]]\n'+
        '--[[3Dキャラの表示]]\n'+
        '---[[3Dの計算>とある計算]]\n'+
        '--[[3Dキャラの出現]]\n'+
        '---[[自機の出現と移動>自機の出現]]　　\n'+
        '--[[3D弾を打つ]]\n'+
        '---[[あたり判定をつける]] \n'+
        '-3D改造のヒント\n'+
        '--[[力加減の判定方法]]　　　　　　\n'+
        '---[[力加減を弾に適用する]]　\n'+
        '\n'+
        '\n'+
        '-[[音ゲームの作成の仕方]]\n'+
        '--[[曲の作成]]\n'+
        '--[[画像の挿入]]\n'+
        '--[[曲の演奏時間の取得]]\n'+
        '---[[音符を降らせる]]\n'+
        '--[[ラインパネルの作成]]\n'+
        '---[[ラインパネルと曲(音符)の同期]]\n'+
        '--[[評価方法(1)]]\n'+
        '---[[評価方法(2)]]\n'+
        '--[[拡張機能]]'
      ,
      'tonyu2/画像の挿入.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***画像の挿入\n'+
        '\n'+
        '音ゲームにはタップする画像(ここでは音符)を挿入しないといけない。\n'+
        'なので最初にOnpuクラスを作成する。\n'+
        '-ファイル→新規→Onpuと入力\n'+
        '-Tonyu System2のウインドウを選び、画像リストを表示。\n'+
        '-画像リストに追加したい画像をドラッグ&ドロップして追加。\n'+
        '--ここでは$pat_maruの画像を使用する。$pat_maruは分割せずに使用するので、分割数指定が1×1の大きさになっているか確認する。※画像リストに元々入っているsample画像を使用する場合は変更しない。\n'+
        '-$pat_maruの画像はDropboxにあるので、リンク先からダウンロードする。[[https://www.dropbox.com/s/azgv1xpf7t7bl1g/maru.png?dl=0]]\n'+
        '\n'+
        '      (このときファイル形式はpng形式で保存する)\n'+
        '\n'+
        '[[画像の挿入>画像の挿入.png]]\n'+
        '-完了を押し、プログラム文に次のように記す。\n'+
        '\n'+
        '<<code Onpu(例)\n'+
        'x=$screenWidth/2;\n'+
        'y=0;\n'+
        'zOrder=0;\n'+
        'scaleX=0.3;\n'+
        'p=$pat_maru;\n'+
        '\n'+
        '>>\n'+
        '-例ではx,yの初期位置を画面の横幅の中心、画面の縦幅の中心としている。\n'+
        '<<code Main(例)\n'+
        'new Onpu;\n'+
        '>>\n'+
        '-MainでOnpuクラスを呼び出す。これで図1で挿入した画像を画面に表示させることができる。\n'+
        '\n'+
        '\n'+
        '前へ [[曲の作成]]　次へ [[曲の演奏時間の取得]]'
      ,
      'tonyu2/画面の上からランダムにオブジェクトを降らせる.txt': 
        '[[乱数を使う]]\n'
      ,
      'tonyu2/画面の上からランダムにキャラを降らせる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[乱数を使う]]\n'+
        '*画面の上からランダムにキャラを降らせる\n'+
        '<<code Main\n'+
        'new Chara1{x:rnd($screenWidth),y:0,p:1};\n'+
        'new Chara1{x:rnd($screenWidth),y:0,p:1};\n'+
        'new Chara1{x:rnd($screenWidth),y:0,p:1};\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  y+=4;\n'+
        '  if(y>$screenHeight){\n'+
        '    y=0;\n'+
        '    x=rnd($screenWidth);\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '実行すると画面の上部からオブジェクトが3つ落ちてきて、Chara1が画面下端に到達した時yを0にしてxを再度ランダムに決めている。\n'
      ,
      'tonyu2/画面端から出ないようにする.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを動かす]]\n'+
        '\n'+
        '[[上下左右に移動させる]]\n'+
        '\n'+
        '*キャラが画面端から出ないようにする\n'+
        '<<code Main\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while(true){\n'+
        '  if(getkey("right")>0)	x+=3;\n'+
        '  if(getkey("left")>0)	x-=3;\n'+
        '  if(getkey("down")>0)	y+=3;\n'+
        '  if(getkey("up")>0)	y-=3;\n'+
        '  if(x<0)            x=0;\n'+
        '  if(x>$screenWidth) x=$screenWidth;\n'+
        '  if(y<0)            y=0;\n'+
        '  if(y>$screenHeight)y=$screenHeight;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '画面端(左がx=0,右がx=$screenWidth,上がy=0,下がy=$screenHeight)を設定して、それを超えそうになったら画面端に戻るようにする。'
      ,
      'tonyu2/疑似3D表示を行う.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '\n'+
        '*・DEMO画面\n'+
        '\n'+
        '[[3d.png]]\n'
      ,
      'tonyu2/確率でオブジェクトを出現させる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[乱数を使う]]\n'+
        '\n'+
        '*確率でオブジェクトを出現させる\n'+
        '\n'+
        '<<code　Main\n'+
        'while(true){\n'+
        '  if(rnd(100)<5){\n'+
        '    new Chara1{x:rnd($screenWidth),y:0,p:1};\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  y+=4;\n'+
        '  if(y>$screenHeight){\n'+
        '    die();\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '毎フレーム0～99の値をランダムに決めて、それが5未満(1/20の確率)ならば画面の上部からオブジェクトが落ちてくる。\n'
      ,
      'tonyu2/確率でキャラを出現させる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[乱数を使う]]\n'+
        '\n'+
        '*確率でオブジェクトを出現させる\n'+
        '\n'+
        '<<code　Main\n'+
        'while(true){\n'+
        '  if(rnd(100)<5){\n'+
        '    new Chara1{x:rnd($screenWidth),y:0,p:1};\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'while(true){\n'+
        '  y+=4;\n'+
        '  if(y>$screenHeight){\n'+
        '    die();\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '毎フレーム0～99の値をランダムに決めて、それが5未満(1/20の確率)ならば画面の上部からオブジェクトが落ちてくる。'
      ,
      'tonyu2/自分自身を消す.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを消す]]\n'+
        '*自分自身を消す\n'+
        '<<code Main\n'+
        'x=100;\n'+
        'y=100;\n'+
        'while(true){\n'+
        '  if(getkey("z")==1) die();\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        'zキーを押すと消える。消えた後は実行を停止するので消えた後の処理は別のファイルに書く。\n'+
        '\n'+
        '※die()...自身を消す。\n'+
        '\n'+
        '<<code Main\n'+
        'x=100;\n'+
        'y-100;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  if(x>$screenWidth) die();\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '右方向に動くオブジェクトが画面右端に到達すると消える。オブジェクトは画面外に出ても実行はされているため、あまり多くのオブジェクトを表示したままにしておくと処理が遅くなってしまうので必要のなくなったオブジェクトは消すとよい。\n'
      ,
      'tonyu2/自機の出現.txt': 
        '[[3Dキャラの出現]]\n'+
        '\n'+
        '自分で動かすオブジェクトを表示するため、\n'+
        '新しいファイル「Pchara」を作成する。\n'+
        '\n'+
        'メインのループ外に下記を書き込む\n'+
        '<<code\n'+
        '  new Pchara{ ox:0,oy:150,z:0 ,p:2,zOrder:1};\n'+
        '>>\n'+
        '\n'+
        'オブジェクトをカーソルキーで動かすため、\n'+
        'ファイル「Pchara」に下記を書き込む\n'+
        '\n'+
        '<<code\n'+
        '\n'+
        'extends ThreeD;\n'+
        'while(true){\n'+
        '\n'+
        '    threeD();\n'+
        '    \n'+
        '    \n'+
        '    if(getkey("right")>0){\n'+
        '	ox+=10;\n'+
        '    }\n'+
        '    if(getkey("left")>0){\n'+
        '	ox-=10;\n'+
        '    }\n'+
        '    if(getkey("up")>0){\n'+
        '        oy-=5; \n'+
        '        //z+=3;\n'+
        '    }\n'+
        '    if(getkey("down")>0){	\n'+
        '        oy+=5; \n'+
        '        //z-=3;       \n'+
        '    }    \n'+
        '    update(); // 追加\n'+
        '}\n'+
        '>>\n'+
        '\n'+
        '\n'+
        '画面の真ん中にオブジェクトが出現しカーソルキーで動かすことができる\n'+
        '\n'+
        '移動に関してはox,oyの値を変えることでオブジェクトの移動速度などを変更することができる。\n'+
        '\n'+
        'up down　での　z軸移動はお好みで追加したり消したりしてよい\n'+
        '\n'+
        '前　[[3Dキャラの出現]]\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      'tonyu2/複数のオブジェクトを出す.txt': 
        '[[チュートリアル]]\n'+
        '\n'+
        '[[前へ>オブジェクトに動きを追加]]←　→[[次へ>オブジェクトに名前を付けて値を設定する]]\n'+
        '\n'+
        '*複数のオブジェクトを作る\n'+
        '\n'+
        '先ほどの例で作ったChara1とChara2を両方出現させるには、別にMainというファイルを作成します。\n'+
        '<<code Main\n'+
        'new Chara1;\n'+
        'new Chara2;\n'+
        '>>\n'+
        '\n'+
        '「new ファイル名」と呼び出すと、そのファイル（クラス）のオブジェクトが作られ、そのファイル中に書いてある動作を実行します。\n'+
        '\n'+
        'Chara1とChara2 の内容は先程までと一緒です。\n'+
        '\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Chara2\n'+
        'x=100;\n'+
        'y=200;\n'+
        'vy=0;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  y+=vy;\n'+
        '  vy+=0.1;\n'+
        '  if(y>$screenHeight){\n'+
        '    y=$screenHeight;\n'+
        '    vy=-vy;\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>'
      ,
      'tonyu2/複数のオブジェクトを動かす.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '<<code Main\n'+
        'new Chara1;\n'+
        'new Chara2;\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '<<code Chara2\n'+
        'x=100;\n'+
        'y=200;\n'+
        'vy=0;\n'+
        'while(true){\n'+
        '  x++;\n'+
        '  y+=vy;\n'+
        '  vy+=0.1;\n'+
        '  if(y>$screenHeight){\n'+
        '    y=$screenHeight;\n'+
        '    vy=-vy;\n'+
        '  }\n'+
        '  update();\n'+
        '}\n'+
        '>>\n'+
        '「new ～」で呼び出したファイルはその中に書いてある動作を実行する。\n'
      ,
      'tonyu2/複数のオブジェクトを表示する.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '*複数のオブジェクトを表示する\n'+
        '<<code Main\n'+
        'new Chara1;\n'+
        'new Chara2;\n'+
        '>>\n'+
        '<<code Chara1\n'+
        'x=100;\n'+
        'y=100;\n'+
        '>>\n'+
        '<<code Chara2\n'+
        'x=100;\n'+
        'y=200;\n'+
        '>>\n'+
        '作成したファイルは「new ～」で呼び出すことができる。\n'
      ,
      'tonyu2/評価方法(1).txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***評価方法(1)\n'+
        '-評価方法として、ここではcool(300点),good(200点),bad(0点)とする。\n'+
        '評価方法(1)ではスコアの表示方法を書き記す。coolやgoodなどの評価の分け方は、評価方法(2)で書いていく。\n'+
        '\n'+
        '<<code Scorerabel\n'+
        '$score=0;\n'+
        'x=80;\n'+
        'y=400;\n'+
        'while(1) {\n'+
        '    text="Score:"+$score;\n'+
        '    size=30;\n'+
        '    fillStyle="orange";\n'+
        '    update();\n'+
        '    \n'+
        '}\n'+
        '>>\n'+
        '-Scorerabelクラスを作成し、画面にスコアを表示する。\n'+
        '-$scoreにスコアを入れておく。\n'+
        '前へ [[ラインパネルと曲(音符)の同期]] 次へ [[評価方法(2)]]'
      ,
      'tonyu2/評価方法(2).txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***評価方法(2)\n'+
        '\n'+
        '-ここでは既に前のページで作成したOnpuクラスに、更に追加することによって、coolやbadなどの評価を分けることができることを書き記している。\n'+
        '\n'+
        '-「追加」と書かれている行を追加する。\n'+
        '\n'+
        '<<code Onpu(追加)\n'+
        'beforeTouched=false; //追加\n'+
        'start=$c.play().currentTime();\n'+
        'while(y<$screenHeight){\n'+
        '    t=$c.play().currentTime();\n'+
        '    y=(t-start)*($screenHeight*3/4)/2000;\n'+
        '\n'+
        '//ここから\n'+
        'if($touches[0].touched && !beforeTouched && abs($linePanel.y-y)<43) {\n'+
        '        \n'+
        '        print("            "+$linePanel.y-y);\n'+
        '        die();\n'+
        '        if(abs($linePanel.y-y)<10){\n'+
        '            $score=$score+300;\n'+
        '            print("cool");\n'+
        '        }\n'+
        '        else if(abs($linePanel.y-y)<30){\n'+
        '            $score=$score+200;\n'+
        '            print("good");\n'+
        '        }\n'+
        '        \n'+
        '        else{\n'+
        '            $score=$score+0;\n'+
        '            print("bad");\n'+
        '        }\n'+
        '        \n'+
        '        \n'+
        '    }\n'+
        '    \n'+
        '    beforeTouched=$touches[0].touched;\n'+
        '//ここまで追加\n'+
        '    update();\n'+
        '}\n'+
        '\n'+
        'die();\n'+
        'print("miss");\n'+
        '\n'+
        '\n'+
        '>>\n'+
        '\n'+
        '**解説\n'+
        '-$touches[0].touchedだけだとタッチされたままでも反応してしまうのでbeforeTouchedで前のフレームでタッチされたかどうかの判定を入れておき、if文の条件式に加えることによってタッチされたかどうかという判定を作ることができる。\n'+
        '-タッチされたとき、音符のyとラインのyの差の絶対値を取って得点を決める。上記では、yの範囲が10未満の場合はcool、30未満の場合はgood、43未満の場合はbad、タッチしないで画面下まで音符が落ちた時はmissを表示させるようにした。\n'+
        '前へ [[評価方法(1)]] 　次へ [[拡張機能]]'
      ,
      'tonyu2/音ゲームの作成の仕方.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[api]]\n'+
        '\n'+
        '音ゲームの作成の仕方は主に3つ必要である。\n'+
        '\n'+
        '1．[[曲の作成]]\n'+
        '\n'+
        '-Tonyu system2ではまだmp3,mp4などのファイルに対応していないためここでは自作してもらうことになる。\n'+
        '-Tonyu system2では1小節=2秒で曲を作成する。\n'+
        '\n'+
        '2. [[曲に合わせて音符を降らせる(タイミングチャート)>曲の演奏時間の取得]]\n'+
        '-自作した曲に合わせて音符を降らせるためには、曲全体の演奏時間を測定する。\n'+
        '\n'+
        '-測定した曲全体の演奏時間を元に、音符を降らせる。\n'+
        '\n'+
        '3. ある一定のラインに丁度音符が着くように設定する。\n'+
        '\n'+
        '-ラインを設定し、ラインと音符がタイミングよく重なるようにする。\n'+
        '\n'+
        '4.評価をする。\n'+
        '\n'+
        '-プレイヤーがタッチしたとき、音符とラインの距離に応じて評価をする。\n'+
        '\n'+
        '--[[曲の作成]]\n'+
        '--[[曲の演奏時間の取得]]\n'+
        '--[[ラインパネルと曲(音符)の同期]]\n'+
        '--[[評価方法(1)]]\n'
      ,
      'tonyu2/音符を降らせる.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '***音符を降らせる\n'+
        '-ここでは演奏時間を画面に表示し、音符の個数とそれぞれの次の音符が降ってくるまでの待ち時間を設定し、音符を画面中心の上から降らせるようにする。\n'+
        '\n'+
        '例)キラキラ星の音符の個数と待ち時間\n'+
        '<<code currentTime(例)\n'+
        'a=[1/4,1/4,1/4,1/4,1/4,1/4,1/2,1/4,1/4,1/4,1/4,1/4,1/4,1/2,\n'+
        '1/4,1/4,1/4,1/4,1/4,1/4,1/2,1/4,1/4,1/4,1/4,1/4,1/4,1/2,\n'+
        '1/4,1/4,1/4,1/4,1/4,1/4,1/2,1/4,1/4,1/4,1/4,1/4,1/4];\n'+
        '>>\n'+
        '-音符1つ1つの長さを設定する。\n'+
        '-それぞれ2000=1/1(全音符),1000=1/2(2分音符),500=1/4(4分音符),250=1/8(8分音符)と設定できる。\n'+
        '-キラキラ星は12小節、42音なのでそれに合わせて音符を設定すれば曲の終わりまで音符を降らせることができる。\n'+
        '-最後の音は次の音がないので設定する必要がない。\n'+
        '<<code currentTime(例)\n'+
        'h=0;\n'+
        'next=0;\n'+
        'while (true) {\n'+
        't=$c.play().currentTime();\n'+
        'ct=$c.play().currentTime();\n'+
        'if(ct>-1){\n'+
        '　　　text=(floor(ct/100));\n'+
        '}\n'+
        '    if (t>next) {\n'+
        '        new Onpu;\n'+
        '        next+=a[h]*2000;\n'+
        '        h=h+1;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '>>\n'+
        '-曲データに対応する音符の長さを設定した、数値の配列aを作成する。\n'+
        '-nextには次の音符が画面に降ってくる時間が入っている。\n'+
        '-hはaの配列の何番目を指している。\n'+
        '-例えば、1番目はa[0]なので、1/4*2000=500msが次の音符の待ち時間となる。\n'+
        '<<code Onpu(例)\n'+
        'zOrder=0;\n'+
        'scaleX=0.3;\n'+
        '\n'+
        'start=$c.play().currentTime();\n'+
        'while(y<$screenHeight){\n'+
        '    t=$c.play().currentTime();\n'+
        '    y=(t-start)*($screenHeight*3/4)/2000;\n'+
        '}\n'+
        'die();\n'+
        '>>\n'+
        '\n'+
        '-scaleXは画像の大きさを設定している。\n'+
        '-Onpuクラスの画像のx,yの初期位置は設定したので、ここでは音符を画面中心の上から下まで降らすという処理を行っている。\n'+
        '-tに演奏時間を取得させる。\n'+
        '-startは音符が降り始めた時間を表す。\n'+
        '-t-startとは(現在の演奏時間)-(音符が降り始めた時間)。その式に(画面の縦幅*3/4)/2000ms(2秒)を掛け算し、2秒で画面の縦幅の3/4の位置にくるように音符のy軸を設定する。\n'+
        '\n'+
        '\n'+
        '前へ [[曲の演奏時間の取得]]　次へ [[ラインパネルの作成]]'
      ,
      'チュートリアル.txt': '[[index]]'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_d.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();
requireSimulator.setName('fs/ROMs');
(function () {
  var rom={
    base: '/Tonyu/SampleROM/',
    data: {
      '': '{"10_MultiTouch/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499962000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499960342},"res.json":{"lastUpdate":1424499962378},"Touch.tonyu":{"lastUpdate":1412697666000}},"11_Resize/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499952000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499950223},"res.json":{"lastUpdate":1424499952266}},"12_Sound/":{".desktop":{"lastUpdate":1425004349219},"images/":{"icon_thumbnail.png":{"lastUpdate":1425006025000}},"Main.tonyu":{"lastUpdate":1425004349203},"MMLTest.tonyu":{"lastUpdate":1425004300853},"options.json":{"lastUpdate":1425006022983},"res.json":{"lastUpdate":1425006025013}},"13_DX/":{".desktop":{"lastUpdate":1412697666000},"DX.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424496830000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424496828360},"res.json":{"lastUpdate":1424496830416}},"14_File/":{".desktop":{"lastUpdate":1412697666000},"files/":{"save.json":{"lastUpdate":1412697666000}},"images/":{"icon_thumbnail.png":{"lastUpdate":1418560247000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1421821648235},"res.json":{"lastUpdate":1418560247000}},"15_Box2D/":{".desktop":{"lastUpdate":1424914245000},"Ball.tonyu":{"lastUpdate":1425265923944},"Block.tonyu":{"lastUpdate":1425264800572},"images/":{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}},"Main.tonyu":{"lastUpdate":1425264825713},"options.json":{"lastUpdate":1425020514000},"res.json":{"lastUpdate":1425020516000}},"1_Animation/":{".desktop":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500074000}},"options.json":{"lastUpdate":1424500071401},"res.json":{"lastUpdate":1424500074096}},"2_MultipleObj/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500055000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500053785},"res.json":{"lastUpdate":1424500055823}},"3_NewParam/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500047000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500045123},"res.json":{"lastUpdate":1424500047165}},"4_getkey/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500037000}},"options.json":{"lastUpdate":1424500035583},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500037615}},"5_Chase/":{".desktop":{"lastUpdate":1412697666000},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500026000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500024423},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500026489}},"6_Shot/":{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1424137052043},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500012000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500010312},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500012360}},"7_Text/":{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1421821648455},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499998000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499996424},"Player.tonyu":{"lastUpdate":1418128263000},"res.json":{"lastUpdate":1424499998482},"Status.tonyu":{"lastUpdate":1412697666000}},"8_Patterns/":{".desktop":{"lastUpdate":1412697666000},"Ball.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499984000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499982309},"res.json":{"lastUpdate":1424499984350}},"9_Mouse/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499971000}},"MouseChaser.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499969681},"res.json":{"lastUpdate":1424499971712}}}',
      '10_MultiTouch/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499962000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499960342},"res.json":{"lastUpdate":1424499962378},"Touch.tonyu":{"lastUpdate":1412697666000}}',
      '10_MultiTouch/.desktop': '{"runMenuOrd":["Main","Touch"]}',
      '10_MultiTouch/Main.tonyu': 
        'new Touch{index:0}; //0番目のタッチ位置を表示するオブジェクト\n'+
        'new Touch{index:1}; //1番目のタッチ位置を表示するオブジェクト\n'+
        '\n'
      ,
      '10_MultiTouch/Touch.tonyu': 
        'size=30;\n'+
        'while (true) {\n'+
        '    // $touchesに，タッチされた場所の座標をあらわすオブジェクト{x,y}\n'+
        '    // の配列が入ります．\n'+
        '    var t=$touches[index];\n'+
        '    if (t.touched) {//index番目の指がタッチされていれば\n'+
        '        x=t.x;\n'+
        '        y=t.y;\n'+
        '        text="touch #"+index;\n'+
        '    } else{\n'+
        '        text="Not touched";\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '10_MultiTouch/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499962000}}',
      '10_MultiTouch/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEYklEQVR4Xu2ceWjTZxzGn9STDS2obT2GTg1YbKkK3vNgiraJxbNqoR6gTuc9VmQeWEHRCSJbrZsKG0i9qlaLUFuNeJ+1rlSpdzanrVttwdV5dhjrL68m1AsSYeRRnt8/geTN+3vy+eR5f/99bc2G59ZAFw0Bm4TQuDBBJITLh4SQ+ZAQCWEjQJZHzxAJISNAFkcNkRAyAmRx1BAJISNAFkcNkRAyAmRx1BAJISNAFkcNkZD/l0DHNo1w6eb9oG7yzaj2+HHX7298Z1DXSHybZIdj/inz2d/ZDrRIyg9q72AXf3QNub3Tgfp1w9AyKQ+3tjtwsKgC41acw8HVfTAw9QT+sj5vOToff26NR+W9anSbfgRLJkZjxrB2sKe4cP/xU8OwMmeIn2XEiL3YkNoFQ3s1l5Bg/2Gd7eEodt/z/5udPaJQeOUfZKV19wspuHwXI9IK/Fuv/joWqetLkLuiFxIXnjbvr53TCbPWnMf3U2Kw4JeLakiwInzrXxcS3y0SRdeqXhFy1hI0fPEZNKgXhpjPG6NfXFNzZNUWcisrAU7rqGoV0RD7Cysk5H2FfNqwDm5Yx1GrMfkotY6so8WVGLus0BxZEeEN0Cy8vjmybm5LQGVVNbpOPwzfM6S2kD3LeiL7+G1scpX6o+gZ8r5WPuDvfXQP9Q/YhYkuIWQGJURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcmoY0/qQu/n30YrxeINeqabGYt6HkjaXJAz5D1qEyJH9pvR4uQ/qsOCz69RIevBzdF8jeoVxDI+TOLieiRuUFzOKPLfFol7L/lfUJ3aPw89zOmJlejEaW4JVfxZo17s2DYR/nCnjvUC6kEGKzAeXZTjPprWxHAlLXlWCSow2e/OcxMxCH9GyOvWfKUbHbaYZWHkvvC48HyMhxY2FKNLxDKn2Xa9UXWLLxMk5fvOufu5g2IRpLM6+EknPA96YQ4k3rbUj8dydxtfQBHld7zFRQ77BKr5BES0iuJSRjdhxmZ1wwP87XkBNr+qPPnKPmvXJrjzphlt2X17NnNaZ1voGWAVMJ4UIqIfbxLlzPHIwfst3oHdMERe4qqwk1mJrYFq2T9xlpE1f+hp/mdoLNqpX3OKotxDtv8eETD65mDkKHCQeQs7QH8gruYPnkjogcGfhxGEIfmigXSvhvuzdNQ9jAhCqPhISK/DvuKyESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aQibkOZXc8HAHcyHiAAAAAElFTkSuQmCC',
      '10_MultiTouch/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '10_MultiTouch/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '11_Resize/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499952000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499950223},"res.json":{"lastUpdate":1424499952266}}',
      '11_Resize/.desktop': '{"runMenuOrd":["Main","Bounce"]}',
      '11_Resize/Bounce.tonyu': 
        'x=rnd($screenWidth);\n'+
        'y=rnd($screenHeight);\n'+
        'vx=spd();\n'+
        'vy=spd();\n'+
        'while (true) {\n'+
        '    x+=vx;\n'+
        '    y+=vy;\n'+
        '    if (x<0) {\n'+
        '        x=0;\n'+
        '        vx=spd();\n'+
        '    }\n'+
        '    if (y<0) {\n'+
        '        y=0;\n'+
        '        vy=spd();\n'+
        '    }\n'+
        '    if (x>$screenWidth) {\n'+
        '        x=$screenWidth;\n'+
        '        vx=-spd();\n'+
        '    }\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-spd();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '\\spd() {\n'+
        '    return rnd()*10;\n'+
        '}'
      ,
      '11_Resize/Main.tonyu': 
        'for (i=0; i<20 ;i++) {\n'+
        '    new Bounce();\n'+
        '}\n'+
        'text="↑ Portrait   → Landscape";\n'+
        'size=20;\n'+
        'while (true) {\n'+
        '    x=$screenWidth/2;\n'+
        '    y=$screenHeight/2;\n'+
        '    if (getkey("right")==1) {\n'+
        '        // ゲーム画面のサイズを変更（横長）\n'+
        '        $Screen.resize(400,300);\n'+
        '    }\n'+
        '    if (getkey("up")==1) {\n'+
        '        // ゲーム画面のサイズを変更（縦長）\n'+
        '        $Screen.resize(300,400);\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '11_Resize/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499952000}}',
      '11_Resize/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '11_Resize/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '11_Resize/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '12_Sound/': '{".desktop":{"lastUpdate":1425004349219},"images/":{"icon_thumbnail.png":{"lastUpdate":1425006025000}},"Main.tonyu":{"lastUpdate":1425004349203},"MMLTest.tonyu":{"lastUpdate":1425004300853},"options.json":{"lastUpdate":1425006022983},"res.json":{"lastUpdate":1425006025013}}',
      '12_Sound/.desktop': '{"runMenuOrd":["Main","MMLTest","SETest"]}',
      '12_Sound/MMLTest.tonyu': 
        'x=200; y=150;\n'+
        'size=40;\n'+
        'while (true) {\n'+
        '    text="oo";\n'+
        '    play("l8cde4",">l8c4ge");\n'+
        '    text="^^";\n'+
        '    play("l8edc4",">l8e4dc");\n'+
        '}'
      ,
      '12_Sound/Main.tonyu': 
        'm=new MMLTest;\n'+
        '\n'+
        'text="Space:SE  S:Stop";\n'+
        'x=200; y=200;\n'+
        'while (true) {\n'+
        '    if (getkey(32)==1) {\n'+
        '        playSE("l16<ceg");\n'+
        '    }\n'+
        '    if (getkey("s")==1) {\n'+
        '        m.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '12_Sound/images/': '{"icon_thumbnail.png":{"lastUpdate":1425006025000}}',
      '12_Sound/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADcElEQVR4Xu2XS0hUYQCFz9VJE6FEelhohpKg2JAFMoEMPS0LKjLMoCwKTKlFoFELRYwkKERrIYXRRiQpkizJwkLRMIVE3UQPLEnTsECCMnzMTNOFonazuDrnwnE3cOf3+7+Pw8wYS/Y1+6A/GgOGgtC0MEEUhKuHgpD1UBAFYTNAxqPPEAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDhaiIKQGSDD0UIUJHADYQ4DpXnJaO4aQ8/rCfONrpRo7HbF4FL9G0xOeQI/zCZP0i4kfEEI3tZlIj73MWqL0/Bu+DtCQg0krIhEfmUfhm7vQNKRVkzPem2iOjBM2iAVx1Nws2UIH8YmzZuM3s0y5a8+9MR8nZEajZ3pMSi59Sqwm9rkKdog2e6ViFsagep7g4hcGIqXN7ZgesaD9flt8Hh9OHtwDYbHf6KhbcQmqgPDpA3yG/+TfxVhjhD4fD4s2//IvNF44y4YhoGpGS9ic1oCu6WNnqIOYiOPlqEqiGUqrTlIQazxaNkpCmKZSmsOClqQnppN2FvyArVFaYgId5gf3J8nprA8KhwFVX24UrAWD/0/CAv3JOBAeQ/O5Sbh9LWBv7e+fDIV9U+HMTD4DeXHktHYOYoTWfG40z6CsqPJiPV/Q2vv/4rC6n5rTM3TKUEL8qBiI7LLunH/ggutvV/gTFwEZ8JibCt+jrzMVahpeo9Zjw8d1W5sLepE1Snnf0E6r7rhPtPhDwk8q8ww37cuMQqHt8ehrvUjGkrT/b9hfiDrfNc8qbTm3wQtyB/8posu/1K6rbnNP6f0Xt+MDQVtlp871wcGPchcX9Bu5ysIWTEFURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDhaiIKQGSDD0UIUhMwAGY4WoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WghZkF8K8Gxwhl4g+QAAAABJRU5ErkJggg==',
      '12_Sound/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false,"plugins":{"timbre":1}}',
      '12_Sound/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '13_DX/': '{".desktop":{"lastUpdate":1412697666000},"DX.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424496830000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424496828360},"res.json":{"lastUpdate":1424496830416}}',
      '13_DX/.desktop': '{"runMenuOrd":["Main","DX"]}',
      '13_DX/DX.tonyu': 
        '\n'+
        'while (true) {\n'+
        '    rotate++;\n'+
        '    update();\n'+
        '}'
      ,
      '13_DX/Main.tonyu': 
        '// scaleX: 拡大率\n'+
        '// scaleY: 縦の拡大率（省略するとscaleXと同じ値)\n'+
        '// alpha: 透過度\n'+
        '// rotate: 回転角度\n'+
        'new DX{x:150, y:200, p:2, scaleX:2};\n'+
        'new DX{x:50, y:200, p:5, scaleX:2, scaleY:1};\n'+
        'new DX{x:200, y:150, p:3, alpha:128,rotate:90};\n'+
        '\n'+
        '\n'
      ,
      '13_DX/images/': '{"icon_thumbnail.png":{"lastUpdate":1424496830000}}',
      '13_DX/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '13_DX/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '13_DX/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '14_File/': '{".desktop":{"lastUpdate":1412697666000},"files/":{"save.json":{"lastUpdate":1412697666000}},"images/":{"icon_thumbnail.png":{"lastUpdate":1418560247000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1421821648235},"res.json":{"lastUpdate":1418560247000}}',
      '14_File/.desktop': '{"runMenuOrd":["Main"]}',
      '14_File/Main.tonyu': 
        'saveDataFile=file("save.json");\n'+
        'saveData=saveDataFile.obj();\n'+
        'if (!saveData) saveData={count:0};\n'+
        'saveData.count++;\n'+
        'saveDataFile.obj(saveData);\n'+
        'x=200;y=20;size=20;\n'+
        'text="count="+saveData.count+" F9:inc SPACE:reset";\n'+
        'while (true) {\n'+
        '    if (getkey("space")==1) {\n'+
        '        saveDataFile.rm();\n'+
        '        text="Reset ! press F9";\n'+
        '    }\n'+
        '    update();    \n'+
        '}\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      '14_File/files/': '{"save.json":{"lastUpdate":1412697666000}}',
      '14_File/files/save.json': '{"count":1}',
      '14_File/images/': '{"icon_thumbnail.png":{"lastUpdate":1418560247000}}',
      '14_File/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADdElEQVR4Xu2VXWjNcRyHvyfHy9Tm7bC8nJoLio5WI0mIJnJBy9VwIbuxK3eLC7uaQkrKDRcmF2alJJTIIkoSRZ3IS1nNS1hqUwiF/6lzOnah6bNPnbbnf7NO+32ec/7P8z9bKtN05VdwVYyBFEEqpkXhgxCksnoQpMJ6EGTMBjmzb2nsPPSwdP+95zZG3bZrhdcXO1ZEU/u90u9ydTWR7x38b1c1k9Mx+OVnide6eX6cuPxq2JxNy2vj6v33wz7vODgi/0M6di2K9tNPIzNlQvQPfI/tjdno6ukriHn0ciCOnn8Rx/fU/xWk/OZvH1sTB7uelWSUB6n+I3lv88LY3/kkjuzORdvJfKTHpeJUW0OBl4ROrmLsDctmxfUHH0qukvdJrkR0dmZV9H38Wni9ZeXsuHT3XczNTIo3/d+iYcHUqJ02cXQESYQd7n4e06vHx6fPP2Lr6jlx4c7byHc2Rq6lJ5In919Bhn5Dhj55B1oWF4IUfxb55eeKgZMzyZWcX1ufiVuP+0vHyoPsWJ+Nszf6onndvOi++TpWLZkR1VXp0RHE8dUdq8wR+ZM1VuU57psgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x/Q3F3pYcAf1P3QAAAAASUVORK5CYII=',
      '14_File/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '14_File/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '15_Box2D/': '{".desktop":{"lastUpdate":1424914245000},"Ball.tonyu":{"lastUpdate":1425265923944},"Block.tonyu":{"lastUpdate":1425264800572},"images/":{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}},"Main.tonyu":{"lastUpdate":1425264825713},"options.json":{"lastUpdate":1425020514000},"res.json":{"lastUpdate":1425020516000}}',
      '15_Box2D/.desktop': '{"runMenuOrd":["Main","B2Body"]}',
      '15_Box2D/Ball.tonyu': 
        'extends BodyActor;\n'+
        '\n'+
        'while(y<450) {\n'+
        '    // 物理オブジェクトにぶつかっていれば\n'+
        '    if (c=contactTo()) {\n'+
        '        // スペースキーを押したときに上に瞬間的な力を加える\n'+
        '        if (getkey("space")==1) applyImpulse(0,-5);\n'+
        '    }\n'+
        '    // 左右キーを押したときにゆっくりと力を加える\n'+
        '    if (getkey("left")) applyForce(-5,0);\n'+
        '    if (getkey("right")) applyForce(5,0);\n'+
        '    update();\n'+
        '}\n'+
        'die();'
      ,
      '15_Box2D/Block.tonyu': 
        'extends BodyActor;\n'+
        'while(!screenOut()) {\n'+
        '    update();   \n'+
        '}\n'+
        'die();'
      ,
      '15_Box2D/Main.tonyu': 
        '// 物理エンジンの利用\n'+
        '// BodyActorクラスまたはBodyActorクラスを継承したオブジェクトを置く\n'+
        '\n'+
        'print("Use ← → and Space");\n'+
        '// プレイヤー（ボール)  shape: 丸い形状の物体\n'+
        'new Ball{x:100,y:50,shape:"circle",p:12};\n'+
        '// 床  isStatic:true  動かない物体\n'+
        'new T2Body{x:230,y:400,p:$pat_floor+0,\n'+
        'scaleX:10,scaleY:1,isStatic:true};\n'+
        '\n'+
        'while (true) {\n'+
        '    new Block{x:rnd()*400,y:0,p:$pat_floor,\n'+
        '    scaleX:3,scaleY:1,rotation:rnd(360)};\n'+
        '    updateEx(60);\n'+
        '}\n'
      ,
      '15_Box2D/images/': '{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}}',
      '15_Box2D/images/aoi.png': 'data:image/png;base64,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',
      '15_Box2D/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '15_Box2D/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false,"plugins":{"box2d":1}}',
      '15_Box2D/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"},{"pwidth":32,"pheight":32,"name":"$pat_floor","url":"ls:images/aoi.png"}],"sounds":[]}',
      '1_Animation/': '{".desktop":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500074000}},"options.json":{"lastUpdate":1424500071401},"res.json":{"lastUpdate":1424500074096}}',
      '1_Animation/.desktop': '{"runMenuOrd":["GoRight"]}',
      '1_Animation/GoRight.tonyu': 
        '// メニューの実行 → GoRightを実行を選んでください\n'+
        '\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\n'+
        'x=100;\n'+
        'y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '1_Animation/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500074000}}',
      '1_Animation/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACWklEQVR4Xu2XvU4UYRhGn2+NBaVxG7wCEwuNrQU1naFA7e1MbGzpKIw/wQITC6GgArc03oE1ib0JYKBa2BXchSwDu6uxoaCfOcWZG3hPzpknkyntx9+m8cEYKAbBtPgPYhBWD4PAehjEIDQDMB6/IQa5bmBhbjZLL+7k4eI2TE/9OI0v5GfnUfLvT2h0c5Ru6ebo/DRPnvbrNwG52GiQ9U7Jg3I/45RcTIfpl5PsVXt5tv0y7ZU1iKJ6MRoN8nVzNr0b/eyXg1SDKq8O3iWTccZnl2m//VSvCci1RoNsbM5kmEH2W928//U5RzlOq2rlYnCe228+QhTVi9FokOXOYSZlkl7p5cPul/wZnWQ6nmZyVrmQet+Dq2v35g9z9/mPbO18z7D/O7derzaFgrjb6EIQBmAQBjEIzAAMx4UYBGYAhuNCDAIzAMNxIQaBGYDhuBCDwAzAcFyIQWAGYDguxCAwAzAcF2IQmAEYjgsxCMwADMeFGARmAIbjQgwCMwDDcSEGgRmA4bgQg8AMwHBciEFgBmA4LsQgMAMwHBdiEJgBGI4LMQjMAAzHhRgEZgCG40IMAjMAw3EhBoEZgOG4EIPADMBwXIhBYAZgOC7EIDADMBwXYhCYARiOCzEIzAAMx4UYBGYAhuNCDAIzAMNxIQaBGYDhuBCDwAzAcFyIQWAGYDguxCAwAzAcF2IQmAEYjgsxCMwADMeFGARmAIbjQgwCMwDDcSEGgRmA4bgQg8AMwHBciEFgBmA4LsQgMAMwHBdiEJgBGI4LMQjMAAzHhRgEZgCG40JgQf4CBVklcPg7vVEAAAAASUVORK5CYII=',
      '1_Animation/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"GoRight","bootClass":"kernel.Boot"},"kernelEditable":true}',
      '1_Animation/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '2_MultipleObj/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500055000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500053785},"res.json":{"lastUpdate":1424500055823}}',
      '2_MultipleObj/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '2_MultipleObj/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        'x=100;\n'+
        'y=250;\n'+
        '// pに値を設定すると，キャラクタパターンを変更します．\n'+
        '// 今のところ，キャラクタパターンは次のもので固定されています．\n'+
        '// images/base.png   images/Sample.png\n'+
        'p=8;\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n'+
        '// $ がついている変数はグローバル変数です。\n'+
        'while (x<$screenWidth) {\n'+
        '    x+=2;\n'+
        '    y+=vy;\n'+
        '    vy+=1;\n'+
        '    // $screenHeight ： 画面幅をあらわします。\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-vy;\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '2_MultipleObj/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\n'+
        'x=100;\n'+
        'y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '2_MultipleObj/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '\n'+
        '// new クラス名  でオブジェクトを出現させます。\n'+
        'new Bounce;\n'+
        'new GoRight;\n'+
        '\n'+
        '// [!=Tonyu1]new の後ろの() は省略可能です\n'+
        '// [!=Tonyu1]appear は不要です\n'+
        '// [!=Tonyu1] オブジェクトを画面上で設計する機能は未実装です。'
      ,
      '2_MultipleObj/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500055000}}',
      '2_MultipleObj/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADMklEQVR4Xu2cPWgTYQCG37s0SEUwIXGoq9AqKjUdiuDgKDpJBbU6OOimFIoIHTLp4E9FBxUHdXCqRuwgIjg7lkIL4qLR2hSH/DY/jeld7s5TEAe3K9y9B2/2y/fc8+TlyHJG9uRbD/rQGDAUhKbFHxAF4eqhIGQ9FERB2AyQ8egZoiD/G5g4OoT85d0YO71Ipid8nMgX8rlwBPD/CfWSPZSNMqqbGzhzth6+CZITIw3yrGDgkDEKBwZsr4O60cSKtYLJxSlk7z0lURQuRqRB3swNoZaoo2SswWpbuLo2C7gOnG4f2TuPwzVBclqkQZ7PDaKDNkpmGXe/P0EV6zAtE3Z7E5nbD0kUhYsRaZAbhQpcw0XNqOH+t5do9ZrwHA9u19JCwv0d/Dtt//EK9l5awouvH9CpN5C++SAqFIpzI10IhQEyCAVREDIDZDhaiIKQGSDD0UIUhMwAGY4WoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDixXEjp9QlYfRtVB/57TJM4du4dmdbgOLEKMnPtME7lUtiecOCaJpobfhD/rabNvonzF98Ht0B0ZayC5KfHcXAkhVrXwb7MAH76UcZvLcMYsJFZrhBpDY4SqyAz02PIDafR8Lah2LKRn1+F7dpI9nvYufQjuAWiK2MV5MrUOIb3pLDuPzsqfQPXXxVhei7cXgfpj2UircFRYhXk921OXMhh10gWbdfEo/lPfhAHiVYHO4qt4BaIroxdkL/uDkyOYmFhFYNfGkQ6t44S2yBbv3XOb1AQsi4KoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADOcXCoxwcLHqOIQAAAAASUVORK5CYII=',
      '2_MultipleObj/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '2_MultipleObj/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '3_NewParam/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500047000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500045123},"res.json":{"lastUpdate":1424500047165}}',
      '3_NewParam/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '3_NewParam/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\n'+
        '//x=100;\n'+
        '//y=250;\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n'+
        '// $ がついている変数はグローバル変数です。\n'+
        'while (x<$screenWidth) {\n'+
        '    x+=2;\n'+
        '    y+=vy;\n'+
        '    vy+=1;\n'+
        '    // $screenHeight ： 画面幅をあらわします。\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-vy;\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '3_NewParam/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\n'+
        '//x=100;\n'+
        '//y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '3_NewParam/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '\n'+
        '// new クラス名{パラメタ} で、指定したフィールドの値をもつ\n'+
        '// オブジェクトを出現させます。\n'+
        'new Bounce{x:100, y:220,p:12};\n'+
        'new Bounce{x:200, y:120,p:15};\n'+
        'new GoRight{x:50, y:80,p:4};\n'+
        '\n'+
        '// [!=Tonyu1] 従来通り，x,y,pを渡して初期化する方法も使えますが，\n'+
        '// 上の方法が推奨されます\n'+
        '//   new Bounce(100,220,12);'
      ,
      '3_NewParam/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500047000}}',
      '3_NewParam/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEXUlEQVR4Xu2cTWhUZxSG33tvMkmIpooxiT+bIlhCVCJIsSSUQje6SWuhbkUKggu1VdSFEkPpQoRuXBQ3ltKNC0nbpLpzU6EU6yJgCCpETRxMdPKjmSQ3M+P98RsXXRrhnEzO0HeWyZz3e+/z5EyGkDte85c3UvBhhoBHIWZcvC1CIbZ8UIgxHxRCIdYIGOvD3yEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVmfFNiT32+d4nZ+DNzuLzScfG7tsu3XUhUxe3go0tSH1fQSFBST5EOnMNLzFRWy6zL/0L/ejoC7keW8d0oUS4o0tqKkNEE3lMPJdD4pRjJ6tA8v1+d9/X11ItrfBbUYBwewEorXNGO/7GouFGFFag/1tv5sG3r/zYyy9TPF6wsfh5M6qdFUXMnF0EZ5fAtzLFJZiPPrlDOJSgjD2sX/z4Kpc5Psc+u/BbjRtA14Np8gPeVgYifHVun/eZ1T1OepCyu0mvxhGPJ9HnfulPnTzJyTua/tab6gW1wy71f4J2j7zUd+xhPydNcjdLmF+JMFCtoDD7fc0j1o2a0WElE/1keLF7j/Rfncvpmtali2ymk/4Y0MXNnYA9esDzGeB4liEcDTG1MQcjux4UNFqKyakolchPKw/7MIHmwKkDQnSMMXSc7cduRJmiuM4/pF76a3gg0Ic7P5nuxFlMggCwL0ZRBSGyIcvMdZ0H5e2rK2gDv6Tw3+wrzz8ELF7JxglMbz6aeQan+KH1nUVlVE+jBtSceTvPpBCKMQYAWN1uCEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVocbQiHGCBirww2hEGMEjNXhhlCIMQLG6nBDKMQYAWN1uCEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVocbQiHGCBirww2hEDmBJz+PoQh3IymyiKJH6DzyjTzUSELVbcjDq6NIvB53w5y70zcZRDG9h6Qwis5jvUaQympUlZBfT/+FPR3NKJU+RcYrwK+97WQMIyqNY9fxCzISRqarSsjVMwPo3l6H2tpmxFGEgjeFJM26Dyp4is4TF40gldWoKiEHuobQd+hvZIIGJ8SDH+QRF2fw7EWIfd//KCNhZLqqhJSZ3b10DvVr3GemxDXu/vcCHk+mGH/SiG+v9RlBKqtRdULKl3v91HknI8Lcqwxy0404P3BWRsHQdFUKMcRPvQqFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/69Buu98xwFIgeowAAAABJRU5ErkJggg==',
      '3_NewParam/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '3_NewParam/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '4_getkey/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500037000}},"options.json":{"lastUpdate":1424500035583},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500037615}}',
      '4_getkey/.desktop': '{"runMenuOrd":["Player"]}',
      '4_getkey/Player.tonyu': 
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    update();\n'+
        '}'
      ,
      '4_getkey/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500037000}}',
      '4_getkey/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACxElEQVR4Xu2cvWqTARiF36/agnEQwaEg6tDV2clREEXF0RvwEtQLEKTq0AsQJ0ExLehQnBRcXBxcxKGDLroo6Y+iaWo0n8ELEA70lOPHk2Q8PTk8T99kS3Pk8mpbPGIINAiJcfF3CEKyfCAkzAdCEJJGIGwP3yEICSMQNocLQUgYgbA5XAhCwgiEzeFCEBJGIGwOF4KQMAJhc7gQhIQRCJvDhSAkjEDYHC4EIWEEwuZwIQgJIxA2hwtBSBiBsDlcCELCCITN4UIQEkYgbA4XgpAwAmFzuBCEhBEIm8OFICSMQNgcLgQhYQTC5nAhCAkjEDaHC0FIGIGwOVwIQsIIhM3hQhASRiBsTqcv5M61hbp+930Y8n/P6ZyQkwu9erJ4qqod11YzrI1963Xv0ZdaWR79F2I6J2S1P18n2qM1ma36/utbrU9+1PbsZl28/bh6ry/FS+mckKfL8zVoB7VTwzo+c6xOv7tSzc9Jzb08W71XFxCy1wQe9g/VZrNRHyef6saHpekvgk1fw9819+LcVMj5vZ4jv1/nLmSx/7VG7XZt7f9cN9ceVDt9jnfGdeD5makQPrLk/5Dd+IOrK29qfWZQ998+q3bU1uGlW9WMDu5Gtb2jcxdiJ2Z+A4SYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYuY8QsyA1XqEqMTMeYSYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYuY8QsyA1XqEqMTMeYSYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYub8H65hIXD/RcmmAAAAAElFTkSuQmCC',
      '4_getkey/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Player","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '4_getkey/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '5_Chase/': '{".desktop":{"lastUpdate":1412697666000},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500026000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500024423},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500026489}}',
      '5_Chase/.desktop': '{"runMenuOrd":["Main","Player","Chaser"]}',
      '5_Chase/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '5_Chase/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '5_Chase/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    update();\n'+
        '}'
      ,
      '5_Chase/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500026000}}',
      '5_Chase/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAERElEQVR4Xu2cXYgVZRzGn3dWWxI3tt0NEQyKINELQUKx1QtBo4Jil4K67YMgSmxFLLroJkTLqz4IZYvCIpI90ZUgS0uQQl/0QZkVrq12dF3dPZ4P9xzn7JkzM80JpCDIeeG8h2fyOdfv+5/n/f3mYS7OMGZg+HAM/WgIGAmhcfFXEAnh8iEhZD4kRELYCJDl0TNEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHGcNeWfnGtx7x3Lc+sw42ZG547RdyMPrluO1kTUwJkZYMggLHroKITa8exQztTo3DYJ0bRfyy1Nb0bMK6IZBvQH4RYNozuDw0FfYNVwhODJ3hLYLOfX8FsSFRMY5D3PHi5gZLSAwEcphDSNDl7hpEKRru5CTT2xBwzeIpw1Ovz+D2vE6Ii9AqVnFNgm5pvK2C/npnq2IYw8oLUJ+NI/LM/NoNgNUUMf24eI1A13vC9oupAX09u6l+PCmQRTGz+Ps9EU8++Dc9c459fmdCEl9dS38FwEJIbspJERCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJCQdgfvXL0Pr3S4zHePINyU8eei7dBszvoquISuX9eDoi4OI+rsQesnXB/M+/Cs3oDv5j/6h3Jf49mIp48j/Oz6dkFX9PTjy6GAiw2DxigiNKwblz6v4YcckXtlUxO8DTQnpJIHVAz2YeGwjqoUYfj7CiZEphK23IEMfuzfN4ZSEdFIHsLJ3KT657254NQ8L5z1MvjyFIA5QD+vYu3EWkxLSWSGtq02s34z+oBt+JcbU67+hiRBVE2DbA7OdD9PhK9I9Q/55/vdu3ID5Q1PYPvT/F3H13NRCOnxzUlxOQig0/B1CQiSEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQyQkPYHNa/tw8KW1qDTLKHYV8fjOPE6fCdMPyOBK2oYcy61Gb7gEWAzMRz6qYSn5wFANE4XP8PbTd2UQdbrItEJyuYHkk05l3IYViJIXgd668AEOXhhDFITo2zea7nQZXEUr5OPcLah6l/FHM48T5XPYf+kjLAoXEPtN9O7Zn0HU6SLTCnkjtwA/WkApeXZ8Wv4C47PfwwSN5I3GBm7edyDd6TK4ilZIi+VzYz+jYir4ev5XHDvzI5IvBaJv75sZxJw+MrWQq8e489UxnHzhkfSnyvDKTAjJMF/r6BJijcztBglxy9d6uoRYI3O7QULc8rWeLiHWyNxukBC3fK2nS4g1MrcbJMQtX+vpEmKNzO0GCXHL13q6hFgjc7tBQtzytZ4uIdbI3G6QELd8radLiDUytxskxC1f6+l/AkBO1XD8v5/zAAAAAElFTkSuQmCC',
      '5_Chase/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '5_Chase/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '6_Shot/': '{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1424137052043},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500012000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500010312},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500012360}}',
      '6_Shot/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet"]}',
      '6_Shot/Bullet.tonyu': 
        'while (y>0) {\n'+
        '    y-=8;\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n'+
        '    // 衝突しているかを判定します．\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n'+
        '    c=crashTo(Chaser);\n'+
        '    // どのCheseオブジェクトとも衝突していない \n'+
        '    //      -> c==undefined\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n'+
        '    if (c) {\n'+
        '        c.die();\n'+
        '        die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\n'+
        'die();\n'+
        '\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n'+
        '次の書き方もあります.\n'+
        '\n'+
        'for (var c in allCrash(Chaser)) {\n'+
        '    c.die();\n'+
        '    die();\n'+
        '}\n'+
        '*/\n'+
        '\n'+
        '\n'+
        '/*\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\n'+
        'for (t in $chars) {\n'+
        '    if (t is Chaser && crashTo(t)) {\n'+
        '        \n'+
        '    }\n'+
        '}\n'+
        '\n'+
        '*/'
      ,
      '6_Shot/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '6_Shot/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '6_Shot/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n'+
        '    // (押しっぱなしでは撃てないようにする)\n'+
        '    if (getkey("space")==1) {\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n'+
        '        new Bullet{x,y};\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '6_Shot/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500012000}}',
      '6_Shot/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEXUlEQVR4Xu2ZXYhUZRzGn/OxGwSW2kqI1VImpCFkdRHaRRdLdWGwBFl0YVAEBQolBILZRWWmCKL2tZZ7Vdp+IBTSx0bWhVEUISpkSaXppLi786E7e+bMzPnorOBtsO/47j5nePZc7cX/fZ/z+51nDvOO09V7KIX+aAg4EkLj4koQCeHyISFkPiREQtgIkOXRO0RCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxcllQwqf9iCZ8OAVgUUbvyZD2lqcXAn5+/WH4HV3wu/w4Y3FCKsJnHIHgksRln440hoJkulcCTnzwsMIGynm3JUiqXuIasAXK4+igQgvry6RIG0tRq6EnN/wKBq1FMHZGB0LfPzy+Ck0O1KUoypeemysNRIk07kScmJtD/yai2bJg3NjjJPPnkE9jlD1anhx9QUSpK3FyJWQNQtvwabblyGcdLJ3h49T7x5HHMf4bEkFB+8OWiNBMp0rIVeZXe/4ONz1CHaMfIfhFe0h4uq95VIIycNsJYaEWMFqvmjuhPw+/ADuX/szqkFiftfEk7kRsnfTUvTctwBh9p3jUlLGeFJE38clHPo8IsY7/Wi5EPLeYII73MW42Z2HetRA4FzG5XQS2/75AD++8sT075p4IhdCBobmIysGRjsv4s60Gw/+8TSazTqSoI6u7XuJ8U4/Wi6E9A92wnVcjKdF/ItzeO3cR3CCGGktwry39kz/roknciFky2AZcBNUkyrOZ9fOP/dn/3pAJmWuhMzW45XimYM/oRIXse9EduTeALrebq92TJHNRUNm6xGYjX0lZDao/8+eEiIhZATI4qghEjKzBA6/fy+e2/IbThfCmd3YcLe2bcj6J2/FhjWLEToNlOMKStm1u38MI1/GhqhmZqwthewZaGKFfw/mONchzI5YQi9AJa3ih8qv2P78bTND1nCXthRyYGgu3MjFmDeKJW43Xr2wG9+Uv0c8WcdN27jPvtpSSP9QJ7zUQ9EpZWdfBWw+23flmCUNsrOvrdzf7ttSyNaBCuAD1XgChbSQnX0dgDt11WLc8KaEGH6amo/1DTtwYxdH/CPZu6OEfce+gpP9wJgdGGP+GxJiTtZwsnfdJJavmkDoT2AU49h1cv/UsV12XJ/qI8uQ6TUZW/7UX1jUexyfHP02e5m/c03WtL1IW75DbEOzub6E2KRrsLaEGECzOSIhNukarC0hBtBsjkiITboGa0uIATSbIxJik67B2hJiAM3miITYpGuwtoQYQLM5IiE26RqsLSEG0GyOSIhNugZr/wfkW99w+x+EqgAAAABJRU5ErkJggg==',
      '6_Shot/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '6_Shot/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '7_Text/': '{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1421821648455},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499998000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499996424},"Player.tonyu":{"lastUpdate":1418128263000},"res.json":{"lastUpdate":1424499998482},"Status.tonyu":{"lastUpdate":1412697666000}}',
      '7_Text/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet","Status"]}',
      '7_Text/Bullet.tonyu': 
        'while (y>0) {\n'+
        '    y-=8;\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n'+
        '    // 衝突しているかを判定します．\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n'+
        '    c=crashTo(Chaser);\n'+
        '    // どのCheseオブジェクトとも衝突していない \n'+
        '    //      -> c==undefined\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n'+
        '    if (c) {\n'+
        '        c.die();\n'+
        '        die();\n'+
        '        $score+=10;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\n'+
        'die();\n'+
        '\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n'+
        '次の書き方もあります.\n'+
        '\n'+
        'for (var c in allCrash(Chaser)) {\n'+
        '  c.die();\n'+
        '  die();\n'+
        '}\n'+
        '*/\n'+
        '\n'+
        '\n'+
        '/*\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\n'+
        'for (t in $chars) {\n'+
        '  if (t is Chaser && crashTo(t)) {\n'+
        '     \n'+
        '  }\n'+
        '}\n'+
        '\n'+
        '*/'
      ,
      '7_Text/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '        \n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '7_Text/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$score=0;\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};\n'+
        'new Status;\n'
      ,
      '7_Text/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n'+
        '    // (押しっぱなしでは撃てないようにする)\n'+
        '    if (getkey("space")==1) {\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n'+
        '        new Bullet{x,y};\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '7_Text/Status.tonyu': 
        '// 変数textに値を設定すると，テキストを表示するオブジェクトになります．\n'+
        'text="Score:";\n'+
        'fillStyle="white";\n'+
        'size=40;\n'+
        'align="center";\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while (!$player.isDead()) {\n'+
        '    text="Score:"+$score;\n'+
        '    update();\n'+
        '}\n'+
        'text="Game Over";\n'
      ,
      '7_Text/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499998000}}',
      '7_Text/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '7_Text/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '7_Text/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '8_Patterns/': '{".desktop":{"lastUpdate":1412697666000},"Ball.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499984000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499982309},"res.json":{"lastUpdate":1424499984350}}',
      '8_Patterns/.desktop': '{"runMenuOrd":["Main","Ball"]}',
      '8_Patterns/Ball.tonyu': 
        '// 実行-> Main を実行\n'+
        'while (y<$screenHeight) {\n'+
        '    y+=3;\n'+
        '    update();\n'+
        '}\n'+
        'die();\n'
      ,
      '8_Patterns/Main.tonyu': 
        '// 実行-> Main を実行\n'+
        '/* ウィンドウ → 画像リストから オブジェクトに用いるキャラクタパターン\n'+
        '     を追加できます．\n'+
        '   画像はpngまたはgifを指定してください．\n'+
        '   \n'+
        '  「パターン解析方法」は次の中から選びます\n'+
        '    Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合は\n'+
        '                           こちらを選びます．※\n'+
        '    固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って\n'+
        '                   描かれた画像の場合，こちらを選びます．\n'+
        '  「URL」欄には，URLを書くか，ローカルファイルをドラッグ＆ドロップします\n'+
        '    ※： URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」\n'+
        '         は使えません．\n'+
        '         \n'+
        '    これらの画像は，変数pに値を代入することで使えます．\n'+
        '    例えば， $pat_chr という名前の画像ファイルの中の，\n'+
        '    4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n'+
        '    p=$pat_chr + 4; \n'+
        '    とします．\n'+
        '*/\n'+
        't=0;\n'+
        'while(true) {\n'+
        '    if (t%5==0) {\n'+
        '        // 新しく作るBall オブジェクトの変数pに，\n'+
        '        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\n'+
        '        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\n'+
        '    }\n'+
        '    t++;\n'+
        '    update();\n'+
        '}'
      ,
      '8_Patterns/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499984000}}',
      '8_Patterns/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '8_Patterns/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '8_Patterns/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_balls","url":"data:image/png;base64,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"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '9_Mouse/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499971000}},"MouseChaser.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499969681},"res.json":{"lastUpdate":1424499971712}}',
      '9_Mouse/.desktop': '{"runMenuOrd":["MouseChaser"]}',
      '9_Mouse/MouseChaser.tonyu': 
        'while(true) {\n'+
        '    x=$mouseX;\n'+
        '    y=$mouseY;\n'+
        '    update();\n'+
        '}'
      ,
      '9_Mouse/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499971000}}',
      '9_Mouse/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAC5UlEQVR4Xu2VvW/MARzGn2vaoTkiXhaxGEwGTAwi5T9gMkhEYuulJiGRWIzasFlsRjEYjBKTwSYd2CrpgouL1ssp7sWFxfz0nt73ks/d/Dy/5z6f+941Dpx/NhSvMgQaCCnj4u8QhNTygZBiPhCCkGoEiu3hPwQhxQgUm8OFIKQYgWJzuBCEFCNQbA4XgpBiBIrN4UIQUoxAsTlcCEKKESg2hwtBSDECxeZwIQgpRqDYHC4EIcUIFJvDhSCkGIFic7gQhIyHwKPbJ3T62G51tKlXax+0dLM9nuIJt0zdhSycm9Xy0lE1B/MaDvv6oq429Emf9V1XLm/o94+5CSPd3uOnTsiZhVkttpr6NdzS4ZlD6s5s6db6ip63X2r/vRXp5/z2iEw4PZVCrrX2qNPoaH30vvHuvtQbaNAdaN/yXYTs9Bfq5Nm+Li329LXxTW191J21h1JfGnZ72ouQndbx73kXrrd18NT70X/Hph68fTK6EGlu9biaT69OZtAYnzp1P1n/f/YjF9/o9fCFdj1ujRHJZKumWshk0WWejpAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7v1D679IXCl8CcSAAAAAElFTkSuQmCC',
      '9_Mouse/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"MouseChaser","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '9_Mouse/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_s.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();
requireSimulator.setName('HttpHelper');
function HttpHelper(options) {
    var $h={};
    var lineMark=options.lineMark;
    $h.buf=$("<div>");
    $h.bufs=[$h.buf];
    $h.maxLineNo=-1;
    $h.cur=function () {
        return $h.bufs[$h.bufs.length-1];
    };
    function mon(s) {
        if (typeof s=="string") return s;
        if (!s[0]) throw s+ " is not jquery obj";
        return "<"+s[0].tagName+">"+s.html()+"</"+s[0].tagName+">";
    }
    $h.p=function (s) {
        if (typeof s=="string") {
            if (s.length>0) {
                s=$("<span>").text(s);
            } else {
                s=null;
            }
        }
        //console.log("Append - "+mon(s)+" to "+mon($h.cur()));
        if ($h.cur()) {
            if ($h.lineNo>$h.maxLineNo) {
                $h.maxLineNo=$h.lineNo;
                $h.cur().append($("<a>").attr({id:lineMark+"-"+$h.lineNo, name:lineMark+"-"+$h.lineNo}));
            }
            if (s) $h.cur().append(s);
        } else {
            console.log("Warning - Stack underflow");
        }
    };
    $h.enter=function (s) {
        //console.log("Enter - "+s+"  size="+$h.bufs.length);
        if (typeof s=="string") s=$(s);
        $h.bufs.push(s);
    };
    $h.exit=function () {
        var s=$h.bufs.pop();
        $h.p(s);
        //console.log("Exit - "+s.html()+"  size="+$h.bufs.length);
    };
    $h.h=function (s) {
        return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    };
    return $h;
}
requireSimulator.setName('Arrow');
Arrow=function () {
    var A={};
    A.show=function (t) {
        if (typeof t=="string") t=$(t);
        if (t.length==0) return false;
        var b=$.data(t[0],"blinking");
        if (b=="t") return;
        $.data(t[0],"blinking","t");
        var cnt=3;
        function on() {
            t.addClass("tutorial-highlight");
            setTimeout(off,200);
        }
        function off() {
            t.removeClass("tutorial-highlight");
            if (cnt-->0) setTimeout(on,200);
            else clear();
        }
        on();
        function clear() {
            cnt=0;
            $.data(t[0],"blinking","f");
        }
        t.click(function () {
            clear();
        });
    };
    A.showOld=function (t) {
        if (typeof t=="string") t=$(t);
        if (t.length==0) return false;
        var p=t.offset();
        var arrow=$("<img>").attr({src:"images/arrow0.png"}).css(
                {font: "40px", position: "absolute", left:p.left, top:p.top+t.height(), color:"red", zIndex:1000,
                    "z-index":1000}).
                appendTo("body");
        var cnt=0;
        function up() {
            if (!arrow) return;
            arrow.attr({ src:"images/arrow"+cnt+".png" });
            cnt=(cnt+1)%4;
        }
        setInterval(up,250);
        t.click(function () {
           if (!arrow) return;
           arrow.remove();
           arrow=null;
        });
        return true;
    };
    return A;
}();
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

requireSimulator.setName('Log');
define(["FS","WebSite"], function (fs,WebSite) {
    var Log={};
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return FS.get("/var/log/").rel(y+"/").rel(m+"/").rel(y+"-"+m+"-"+da+".log");
    };
    Log.append=function (line) {
        if (WebSite.isNW) return;
        var f=Log.curFile();
        //console.log(Log, "append "+f);
        var t=(f.exists()?f.text():"");
        f.text(t+line+"\n");
    };
    function mul(con) {
        return con.replace(/\n/g,"\n|");
    }
    Log.d=function (tag,con) {
        Log.append(new Date()+": ["+tag+"]"+mul(con));
    };
    Log.e=function (tag,con) {
        Log.append(new Date()+": ERROR["+tag+"]"+mul(con));
    };
    return Log;
});
requireSimulator.setName('exceptionCatcher');
define([], function () {
    var res={};
    res.f=function (f) {
        if (typeof f=="function") {
            if (f.isTrcf) return f;
            var r=function () {
                if (res.handleException && !res.enter) {
                    try {
                        res.enter=true;
                        return f.apply(this,arguments);
                    } catch (e) {
                        res.handleException(e);
                    } finally {
                        res.enter=false;
                    }
                } else {
                    return f.apply(this,arguments);
                }
            };
            r.isTrcf=true;
            return r;
        } else if(typeof f=="object") {
            for (var k in f) {
                f[k]=res.f(f[k]);
            }
            return f;
        }
    };
    //res.handleException=function (){};
    return res;
});
requireSimulator.setName('UI');
define(["Util","exceptionCatcher"],function (Util, EC) {
    var UI={};
    var F=EC.f;
    UI=function () {
        var expr=[];
        for (var i=0 ; i<arguments.length ; i++) {
            expr[i]=arguments[i];
        }
        var listeners=[];
        var $vars={};
        var $edits=[];
        var res=parse(expr);
        res.$edits=$edits;
        res.$vars=$vars;
        $edits.load=function (model) {
            $edits.model=model;
            $edits.forEach(function (edit) {
                $edits.writeToJq(edit.params.$edit, edit.jq);
            });
        };
        $edits.writeToJq=function ($edit, jq) {
        	var m=$edits.model;
            if (!m) return;
            var name = $edit.name;
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                m=m[a[i]];
            }
            m=$edit.type.toVal(m);
            if (jq.attr("type")=="checkbox") {
                jq.prop("checked",!!m);
            } else {
                jq.val(m);
            }
        };
        $edits.validator={
       		errors:{},
       		show: function () {
       			if ($vars.validationMessage) {
       				$vars.validationMessage.empty();
       				for (var name in this.errors) {
       					$vars.validationMessage.append(UI("div", this.errors[name].mesg));
       				}
       			}
       			if ($vars.OKButton) {
       				var ok=true;
       				for (var name in this.errors) {
       					ok=false;
       				}
       				$vars.OKButton.attr("disabled", !ok);
       			}
       		},
       		on: {
       			validate: function () {}
       		},
       		addError: function (name, mesg, jq) {
       			this.errors[name]={mesg:mesg, jq:jq};
       			this.show();
       		},
       		removeError: function (name) {
       			delete this.errors[name];
       			this.show();
       		},
       		allOK: function () {
       			for (var i in this.errors) {
       				delete this.errors[i];
       			}
       			this.show();
       		},
       		isValid: function () {
       		    var res=true;
       		    for (var i in this.errors) res=false;
       		    return res;
       		}
        };
        $edits.writeToModel=function ($edit, val ,jq) {
            var m=$edits.model;
        	//console.log($edit, m);
            if (!m) return;
            var name = $edit.name;
            try {
                val=$edit.type.fromVal(val);
            } catch (e) {
            	$edits.validator.addError(name, e, jq);
            	//$edits.validator.errors[name]={mesg:e, jq:jq};
                //$edits.validator.change(name, e, jq);
                return;
            }
            $edits.validator.removeError(name);
            /*
            if ($edits.validator.errors[name]) {
                delete $edits.validator.errors[name];
                $edits.validator.change(name, null, jq);
            }*/
            var a=name.split(".");
            for (var i=0 ; i<a.length ;i++) {
                if (i==a.length-1) {
                    if ($edits.on.writeToModel(name,val)) {

                    } else {
                        m[a[i]]=val;
                    }
                } else {
                    m=m[a[i]];
                }
            }
            $edits.validator.on.validate.call($edits.validator, $edits.model);
        };
        $edits.on={};
        $edits.on.writeToModel= function (name, val) {};

        if (listeners.length>0) {
            setTimeout(F(l),10);
        }
        function l() {
            listeners.forEach(function (li) {
                li();
            });
            setTimeout(F(l),10);
        }
        return res;
        function parse(expr) {
            if (expr instanceof Array) return parseArray(expr);
            else if (typeof expr=="string") return parseString(expr);
            else return expr;
        }
        function parseArray(a) {
            var tag=a[0];
            var i=1;
            var res=$("<"+tag+">");
            if (typeof a[i]=="object" && !(a[i] instanceof Array) && !(a[i] instanceof $) ) {
                parseAttr(res, a[i],tag);
                i++;
            }
            while (i<a.length) {
                res.append(parse(a[i]));
                i++;
            }
            return res;
        }
        function parseAttr(jq, o, tag) {
            if (o.$var) {
                $vars[o.$var]=jq;
            }
            if (o.$edit) {
                if (typeof o.$edit=="string") {
                    o.$edit={name: o.$edit, type: UI.types.String};
                }
                if (!o.on) o.on={};
                o.on.realtimechange=F(function (val) {
                    $edits.writeToModel(o.$edit, val, jq);
                });
                if (!$vars[o.$edit.name]) $vars[o.$edit.name]=jq;
                $edits.push({jq:jq,params:o});
            }
            for (var k in o) {
                if (k=="on") {
                    for (var e in o.on) on(e, o.on[e]);
                } else if (k=="css") {
                    jq.css(o[k]);
                } else if (!Util.startsWith(k,"$")){
                    jq.attr(k,o[k]);
                }
            }
            function on(eType, li) {
                if (eType=="enterkey") {
                    jq.on("keypress",F(function (ev) {
                        if (ev.which==13) li.apply(jq,arguments);
                    }));
                } else if (eType=="realtimechange") {
                    var first=true, prev;
                    listeners.push(function () {
                        var cur;
                        if (o.type=="checkbox") {
                            cur=!!jq.prop("checked");
                        } else {
                            cur=jq.val();
                        }
                        if (first || prev!=cur) {
                            li.apply(jq,[cur,prev]);
                            prev=cur;
                        }
                        first=false;
                    });
                } else {
                    jq.on(eType, F(li));
                }
            }
        }
        function parseString(str) {
            return $("<span>").text(str);
        }
    };
    UI.types={
       String: {
           toVal: function (val) {
               return val;
           },
           fromVal: function (val) {
               return val;
           }
       },
       Number: {
           toVal: function (val) {
               return val+"";
           },
           fromVal: function (val) {
               return parseFloat(val);
           }
       }
   };
    return UI;
});

requireSimulator.setName('Wiki');
define(["HttpHelper", "Arrow", "Util","WebSite","Log","UI","FS"],
function (HttpHelper, Arrow, Util, WebSite,Log,UI,FS) {
return Wiki=function (placeHolder, home, options, plugins) {
    var W={};
    var refers={figures:"図", plists: "リスト"};
    var SEQ="__seq__";
    var LINEMARK="marker_"+Math.floor(Math.random()*100000);
    var on={};
    var history=[];
    var EXT=".txt";
    if (!options) options={};
    if (home && !home.isDir()) throw home+": not a dir";
    var cwd,tocFile;
    W.on=on;
    W.cd=function (dir) {
    	cwd=dir;
    	tocFile=cwd.rel("toc.json");
    };
    if (home) W.cd(home);
    W.parse=function (body,name,file) {
        var ctx={};
        var $h=HttpHelper({lineMark:LINEMARK});
        ctx.out=$h;
        ctx.name=name;
        ctx.lines=body.split(/\r?\n/);
        ctx.lineNo=0;
        ctx.ul=0;
        ctx.beginMark="[[";
        ctx.endMark="]]";
        ctx.blocks=[];
        var figInfo=refInfo("figures");
        var plistInfo=refInfo("plists");
        //ctx.figures={};
        //ctx.figseq=1;
        var toc=[];
        if (tocFile && tocFile.exists()) toc=tocFile.obj();
        var idx=toc.indexOf(name);
        if (idx>=0) {
            var navBar="";
            var prev=toc[idx-1];
            if (prev) navBar+="[[前へ>"+prev+"]]";
            var next=toc[idx+1];
            if (next) navBar+=" - [[次へ>"+next+"]]";
            var top=toc[0];
            if (idx!=0) navBar+=" - [[目次>"+top+"]]";
            ctx.lines.unshift(navBar);
            ctx.lines.push(navBar);
        }
        ctx.lines.forEach(parseLine);
        function refInfo(type) {// figures / plists
            ctx[type]={};
            var seq=1;
            var res=function (name, register) {
                var fi=ctx[type][name];
                if (!fi) {
                    fi={
                        refs:[]
                    };
                    //console.log("reg "+type+" "+name);
                    ctx[type][name]=fi;
                }
                if (register) {
                    fi.no=seq++;
                    fi.name=refers[type]+fi.no;// 図 / リスト
                    fi.refs.forEach(function (e) {
                        e.text(fi.name);
                    });
                }
                return fi;
            };
            return res;
        }

        return $h.buf;
        function parseLine(line) {
            $h.lineNo=ctx.lineNo;
            function unul(to) {
                if (to==null) to=0;
                while (ctx.ul>to) {
                    ctx.ul--;
                    $h.exit();//$.p("</ul>");
                }
            }
            var uld=0;
            if (line.match(/^-+/)) {
                uld=RegExp.lastMatch.length;
            }
            if (uld>ctx.ul) {
                while(uld>ctx.ul) {
                    ctx.ul++;
                    $h.enter("<ul>");
                }
            } else unul(uld);
            line=line.substring(uld);
            if (uld>0) $h.enter("<li>");
            if (line.match(/^\*+/)) {
                var r=RegExp.rightContext;
                //unul();
                var h="h"+RegExp.lastMatch.length;
                $h.enter("<"+h+">");//$.p("<"+h+">");
                parseLink(r);
                $h.exit();// $.p("</"+h+">\n");
            } else if (line.match(/^$/)) {
                unul();
                $h.p($("<p>")); //$.p("<p>\n");
            } else if (line.match(/^<<toc(.*)/)) {
                ctx.toc=[ctx.name];
                ctx.blocks.push({name: "toc", exit: function () {
                    if (tocFile && !tocFile.isReadOnly()) tocFile.obj(ctx.toc);
                    ctx.toc=null;
                }});
            } else if (line.match(/^<<code(.*)/)) {
                var s=RegExp.$1;
                s=s.replace(/^ */,"");
                if (s.length>0) {
                    var ss=s.split(/ /,2);
                    var label, fn;
                    if (ss.length==2) {
                        fn=ss[0];
                        label=ss[1];
                        var pi=plistInfo(label, true);
                        $h.p($("<div>").addClass("plist").text(pi.name+" "+fn));
                    } else {
                        $h.p($("<div>").addClass("plist").text(ss));
                    }
                }
                $h.enter("<pre>");
                ctx.blocks.push({name: "code", exit: function () {$h.exit();}});
            } else if (line.match(/^>>/)) {
                var b=ctx.blocks.pop();
                if (b && b.exit) b.exit(ctx);
            } else if (line.match(/^@@@@(.*)/)) {
                //unul();
                if (ctx.pclose) $h.exit();//$.p("</pre>");
                else {
                    if (RegExp.$1.length>0) {
                        var pi=plistInfo(RegExp.$1, true);
                        $h.p($("<div>").addClass("plist").text(pi.name));
                    }
                    $h.enter("<pre>");
                }
                ctx.pclose=!ctx.pclose;
            } else {
                //unul();
                parseLink(line);
                $h.p("\n");
            }
            if (uld>0) $h.exit();
            ctx.lineNo++;
        }
        function parseLink(line) {
            var w=(typeof line=="string"?
                    WikiBraces(line, ctx.beginMark,ctx.endMark)
                    : line);
            w.forEach(function (e) {
                if (typeof e=="string") {
                    $h.p(e);
                } else {
                    procLink(e);
                }
            });
            function procLink(e) {
                var name=e.text();
                var a;
                if (name.match(/^@blink ([^>]+)>([^\s]+)/)) {
                    caption=RegExp.$1;
                    var target=RegExp.$2;
                    a=$("<span>").addClass("clickable").text(caption).hover(function () {
                        var a;
                        if (parent && parent.Arrow) a=parent.Arrow;
                        if (Arrow) a=Arrow;
                        if (a) a.show( target );
                    });
                } else if (name.match(/^@plistref (.*)/)) {
                    var label=RegExp.$1;
                    //console.log("fi.l ="+label);
                    var fi=plistInfo(label);
                    //console.log("fi = "+fi.name);
                    a=$("<strong>").text(fi.name);
                    fi.refs.push(a);
                } else if (name.match(/^@editadd/)) {
                    $h.p($("<img>").attr("src",WebSite.top+"/images/editAdd.png"));
                } else if (name.match(/^@figref (.*)/)) {
                    var fi=figInfo(RegExp.$1);
                    a=$("<strong>").text(fi.name);
                    fi.refs.push(a);
                } else if (name.match(/^@cfrag (.*)/)) {
                    var code=RegExp.$1
                    a=$("<code>");
                    $h.enter(a);
                    parseLink(code);
                    $h.exit();
                } else if (name.match(/^@arg (.*)/)) {
                    var varn=RegExp.$1
                    a=$("<i>");
                    $h.enter(a);
                    parseLink(varn);
                    $h.exit();
                } else {
                    var cn=e.split(">",2);
                    if (cn.length==2) {
                        name=cn[1]+"";
                        caption=cn[0];
                    } else caption=name;
                    if (ctx.toc) ctx.toc.push(name);
                    if (name.match(/\.(png|jpg|gif)$/) && !name.match(/^http/)) {
                        var fi=figInfo(name, true);
                        a=$("<div>").addClass("figure").append(
                                  imageHolder(name)
                           );
                        $h.enter(a);
                        $h.enter($("<div>"));
                        $h.p(refers.figures+fi.no+".");
                        parseLink(caption); //$h.p(caption);
                        $h.exit();
                        $h.exit();
                    } else {
                    	if (name.match(/^https?:\/\//)) {
                    		a=$("<a>").attr({href:name,target:"ext"}).text(caption);
                    	} else {
                    		var f=W.resolveFile(name);
                    		if (!f.exists() && (f.isReadOnly() || !options.editMode)) {
                    			a=$("<span>").text(caption);
                    		} else {
                    		    if (options.useAnchor) {
                    		       // a=$("<a>").attr({href:"wiki.html?file="+f.path()}).text(caption);
                                    a=$("<a>").attr({href:f.relPath(file.up()).replace(/\.txt$/,".html")}).text(caption);
                                    //a=$("<a>").attr({href:"?file="+f.path()}).text(caption);
                    		    } else {
                                    a=$("<span>").addClass("clickable").text(caption).click(function () {
                                        W.show(f);
                                    });
                    		    }
                    			if (!f.exists()) a.addClass("notexist");
                    		}
                    	}
                    }
                }
                $h.p(a);
            }
        }
    };
    function imageHolder(name) {
        var res,imfile;
        if (W.builtinImages[name]) {
            return $("<div>").append( $("<img>").attr("src", WebSite.top+"/doc/images/"+name) );
        } else {
            res=UI("div", {style:"margin:10px; padding:10px; border:solid black 1px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},
                    "ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加"
            );
            var thome=FS.get(WebSite.tonyuHome);
            imfile=thome.rel("doc/images/").rel(name);
            if (imfile.exists()) {
                res.empty().append(UI("img",{src:imfile.text() }));
            }
            return res;
        }
        function s(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        function dropAdd(e) {
            if (!options.editMode) return;
            var eo=e.originalEvent;
            var file = eo.dataTransfer.files[0];
            if(!file.type.match(/image\/(png|gif|jpg)/)[1]) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var fileContent = reader.result;
                imfile.text(fileContent);
                res.empty().append(UI("img",{src:fileContent}));
            };
            reader.readAsDataURL(file);
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }
    W.resolveFile=function (name) {
        var f;
        if (name.isDir) f=name;
        else if (cwd && name.substring(0,1)!="/") f=cwd.rel(name+EXT);
        else f=FS.get(name);
        return f;
    };
    W.show=function (nameOrFile) {
        var f=W.resolveFile(nameOrFile);
        if (!options.editMode) Log.d("wiki","show "+f);
    	W.cd(f.up());
		var fn=f.truncExt(EXT);
    	if (!f.exists() && !f.isReadOnly() && options.editMode) {
    		var p=history[history.length-1];
    		if (p) f.text("[["+p.truncExt(EXT)+"]]\n");
    		else f.text("");
    	}
    	if ( f.exists()) {
    		var ht=W.parse(f.text(), fn, f);
    		placeHolder.empty();
    		placeHolder.scrollTop(0);
    		placeHolder.append(ht);
    		placeHolder.append($("<div>").css({height:"100px"}).text(""));
    		//console.log("wikijs.on.show",f+"");
    		if (on.show) on.show.apply(W, [f,fn]);
    		history.push(f);
    	} else {
    		alert(nameOrFile+" というページはありません");
    		//placeHolder.text(name+" not found.");
    	}
    	return;
    };
    W.back=function () {
        var f=history.pop();
        if (f) show(f);
    };
    var curLined;
    W.highlightLine=function (row) { // row:0 origin
        var e=$("#"+LINEMARK+"-"+row);
        if (e.length==0) return;
        if (curLined) {
            curLined.removeClass("wiki-cur-line");
        }
        curLined=e.next();
        curLined.addClass("wiki-cur-line");
        var t=e.position().top;
        var area=placeHolder;
        if (t<0) {
            area.scrollTop(area.scrollTop()+(t-10)/2);
        }
        var h=area.height()-100;
        if (t>h) {
            area.scrollTop(area.scrollTop()+(t-h+10)/2);
        }
        function mark(startElem) {
            var e=startElem.next();
            while (e.length>0) {
                if (Util.startsWith( e.attr("id"), LINEMARK)) break;

            }
        }
    };
    W.builtinImages={
            "50_100.png":1,
            "50_160.png":1,
            "50_300.png":1,
            "apple1apple2.png":1,
            "coords.png":1,
            "copy60_100.png":1,
            "firstRunRes.png":1,
            "firstVarRes.png":1,
            "itadaki.png":1,
            "noWaitCat.png":1,
            "runtimeError.png":1,
            "sample.png":1,
            "sayonara.png":1,
            "syntaxError.png":1
    };
    return W;
    function WikiBraces(str, begin ,end) {
        var c=0;
        function init() {
            var w=[];
            while(true) {
                var i=str.indexOf(begin,c);
                var j=str.indexOf(end,c);
                if (j>=0 && (i<0 || i>j)) {  // ]]
                    w.push(str.substring(c,j));
                    c=j;  // ]] は含めずおわり
                    break;
                }
                if (i<0) {  // [[ ]] なし
                    w.push(str.substring(c));
                    c=str.length;
                    break;
                }
                // [[
                w.push(str.substring(c,i));
                c=i+begin.length;
                var we=init();
                we.hasBrace=true;
                if (c<str.length) {  // ]] あり
                    c+=end.length;
                }
                w.push(we);
            }
            bless(w);
            return w;
        }
        function bless(w) {
            w.split=function (sp, lim) {
                if (lim==1) return this;
                var res=[], cur=bless([]);
                this.forEach(function (e) {
                    if (typeof e=="string") {
                        var i =e.indexOf(sp);
                        if (res.length>=lim) i=-1;
                        if (i>=0) {  //  ,bbb   aaa,bbb
                            if (i>0) {  //   aaa,bbb
                                var s=e.substring(0,i); // aaa
                                cur.push(s);
                            }
                            i+=sp.length;   //  bbb  bbb
                            if (cur.length!=1) res.push(cur);
                            else res.push(cur[0]);
                            cur=bless([]);
                            if (i<e.length) {  // ,bbb
                                var s=e.substring(i) ;
                                cur.push(s);
                            }
                        } else {  //aaabbb
                            cur.push(e);
                        }
                    } else {
                        cur.push(e);
                    }
                });
                if (cur.length!=1) res.push(cur);
                else res.push(cur[0]);
                return res;
            };
            w.text=function (includeBrace) {
               var res=(this.hasBrace && includeBrace ? begin :"");
               this.forEach(function (e) {
                   if (typeof e=="string") {
                       res+=e;
                   } else {
                       res+=e.text(true);
                   }
               });
               res+=(this.hasBrace && includeBrace ? end :"");
               return res;
            };
            w.toString=function () {
                return this.text(true);
            };
            return w;
        }
        return init(0);
    };
};
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

requireSimulator.setName('Shell2');
define(["Shell","UI","FS","Util"], function (sh,UI,FS,Util) {
    var res={};
    res.show=function (dir) {
        var d=res.embed(dir);
        d.dialog({width:600,height:500});
    };
    res.embed=function (dir) {
        if (!res.d) {
            res.d=UI("div",{title:"Shell"},["div",{$var:"inner"},"Type 'help' to show commands.",["br"]]);
            res.inner=res.d.$vars.inner;
            sh.prompt();
        }
        var d=res.d;
        return d;
    };
    sh.cls=function () {
        res.d.$vars.inner.empty();
    };
    sh.prompt=function () {
        var line=UI("div",
            ["input",{$var:"cmd",size:40,on:{keydown: kd}}],
            ["pre",{$var:"out","class":"shell out"},["div",{$var:"cand","class":"shell cand"}]]
        );
        var cmd=line.$vars.cmd;
        var out=line.$vars.out;
        var cand=line.$vars.cand;
        sh.setout({log:function () {
            var a=[];
            for (var i=0; i<arguments.length; i++) {
                a.push(arguments[i]);
            }
            out.append(a.join(" ")+"\n");
        },err:function (e) {
            out.append(UI("div",{"class": "shell error"},e,["br"],["pre",e.stack]));
        }});
        line.appendTo(res.inner);
        cmd.focus();
        res.inner.closest(".ui-dialog-content").scrollTop(res.inner.height());
        return sh.ASYNC;
        function kd(e) {
            //var eo=e.originalEvent();
            //console.log(e.which);
            if (e.which==9) {
                e.stopPropagation();
                e.preventDefault();
                comp();
                return false;
            }
            if (e.which==13) {
                cand.empty();
                exec(cmd.val());
            }
        }
        function exec() {
            var c=cmd.val().replace(/^ */,"").replace(/ *$/,"");
            if (c.length==0) return;
            var cs=c.split(/ +/);
            var cn=cs.shift();
            var f=sh[cn];
            if (typeof f!="function") return out.append(cn+": command not found.");
            try {
                var args=[],options=null;
                cs.forEach(function (ce) {
                    var opt=/^-([A-Za-z_0-9]+)(=(.*))?/.exec(ce);
                    if (opt) {
                        if (!options) options={};
                        options[opt[1]]=opt[3]!=null ? opt[3] : 1;
                    } else args.push(ce);
                });
                if (options) args.push(options);
                var sres=f.apply(sh, args);
                if (sres===sh.ASYNC) return;
                if (typeof sres=="object") {
                    if (sres instanceof Array) {
                        var table=UI("table");
                        var tr=null;
                        var cnt=0;
                        sres.forEach(function (r) {
                            if (!tr) tr=UI("tr").appendTo(table);
                            tr.append(UI("td",r));
                            cnt++;if(cnt%3==0) tr=null;
                        });
                        table.appendTo(out);
                    } else {
                        out.append(JSON.stringify(sres));
                    }
                } else {
                    out.append(sres);
                }
                sh.prompt();
            } catch(e) {
                sh.err(e);
                //out.append(UI("div",{"class": "shell error"},e,["br"],["pre",e.stack]));
                sh.prompt();
            }
        }
        function comp(){
            var c=cmd.val();
            var cs=c.split(" ");
            var fn=cs.pop();
            var canda=[];
            if (cs.length==0) {
                for (var k in sh) {
                    if (typeof sh[k]=="function" && Util.startsWith(k, fn)) {
                        canda.push(k);
                    }
                }
            } else {
                var f=sh.resolve(fn,false);
                //console.log(fn,f);
                if (!f) return;
                var d=(f.isDir() ? f : f.up());
                d.each(function (e) {
                    if ( Util.startsWith(e.path(), f.path()) ) {
                        canda.push(e.name());
                    }
                });
            }
            if (canda.length==1) {
                var fns=fn.split("/");
                fns.pop();
                fns.push(canda[0]);
                cs.push(fns.join("/"));
                cmd.val(cs.join(" "));
                cand.empty();
            } else {
                cand.text(canda.join(", "));
            }
            //console.log(canda);
            //cmd.val(cmd.val()+"hokan");
        }
    };
    sh.window=function () {
        res.show(sh.cwd);
    };
    sh.atest=function (a,b,options) {
        console.log(a,b,options);
    };
    return res;
});
requireSimulator.setName('copySample');
define(["Shell","FS","WebSite"],function (sh,fs,WebSite) {
    var home=FS.get(WebSite.tonyuHome);
    var samples=home.rel("SampleROM/");
    var projects=home.rel("Projects/");
    function all() {
        if (!samples.exists()) return;
        samples.ls().forEach(cs);
    }
    function available(dir) {
        var n=dir.name();
        return samples.rel(n).exists() && projects.equals(dir.up());
    }

    function cs(n) {
        if (!n) return all();
        var src=samples.rel(n);
        var dst=projects.rel(n);
        //console.log(n,src,dst,dst.exists());
        if (src.exists() && !dst.exists()) {
            sh.cp(src,dst);//,{v:1});
        }
    }
    cs.available=available;
    cs.all=all;
    return cs;
});
requireSimulator.setName('NewProjectDialog');
define(["UI"], function (UI) {
    var res={};
	res.show=function (prjDir, onOK,options) {
    	var d=res.embed(prjDir,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjDir, onOK, options) {
	    if (!options) options={};
        if (!res.d) {
            var FType={
                    fromVal: function (val){
                        return val=="" ? null : FS.get(val);
                    },
                    toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"新規プロジェクト"},
        			["div",
        			 ["span","プロジェクト名"],
        			 ["input",{$edit:"name",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
         			["div",
        			 ["span","親フォルダ"],
        			 ["input",{$edit:{name:"parentDir",type:FType}}]],
        			 ["div",
        			   ["span","作成先フォルダ："],
        			   ["span",{$var:"dstDir"}]
        			  ],
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
        }
        var d=res.d;
        var model={name:options.defName||"", parentDir:prjDir};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		} else {
    			this.allOK();
    		}
    		model.dstDir=model.parentDir.rel(model.name+"/");
    		d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    if (d.$edits.validator.isValid()) {
                onOK(model.dstDir);
    	    }
    	};
    	return d;
    };
    return res;
});

requireSimulator.setName('requestFragment');
define(["WebSite"],function (WebSite) {
    var FR={};
    FR.ajax=function (options) {
        var THRESH=options.THRESH || 1000*800;
        var d=options.data;
        if (typeof d!="object") throw "Data should be object: "+d;
        d=JSON.stringify(d);
        if (!options.redirectTo && (WebSite.serverType!="GAE" || d.length<THRESH)) return $.ajax(options);
        var frags=[];
        var cnt=0;
        var id=Math.random();
        while (d.length>0) {
            frags.push(d.substring(0,THRESH));
            d=d.substring(THRESH);

        }
        var len=frags.length;
        var sent=0;
        var waitTime=1000;
        function addRedir(p) {
            if (options.redirectTo) p.redirectTo=options.redirectTo;
            return p;
        }
        frags.forEach(function (frag,i) {
            $.ajax({type:"post",url:WebSite.top+"/edit/sendFragment",data:addRedir({
                id:id, seq:i, len:len, content:frag
            }),success: function (res) {
                console.log("sendFrag",res,i);//,frag);
                sent++;
                if (sent>=len) setTimeout(runFrag,waitTime);
            }, error: options.error
            });
        });
        function runFrag() {
            $.ajax({type:"post",url:WebSite.top+"/edit/runFragments",data:addRedir({id:id}),
                success: function (res) {
                    //console.log("runFrag res1=",res,arguments.length);
                    if (typeof res=="string") {
                        if (res.match(/^notCompleted:([\-\d]+)\/([\-\d]+)$/)) {
                            console.log("notcomp",res);
                            waitTime*=2;
                            setTimeout(runFrag,waitTime);
                            return;
                        }
                    }
                    options.success(res);
                },
                error: options.error,
                complete: options.complete
            });
        }

    };

    return FR;
});
requireSimulator.setName('Sync');
define(["FS","Shell","requestFragment","WebSite"],function (FS,sh,rf,WebSite) {
    var Sync={};
    sh.sync=function () {
        // sync options:o onend:f     local=remote=cwd
        // sync dir:s|file options:o onend:f  local=remote=dir
        // sync local:s|file remote:s|file options:o onend:f
        var local,remote,options,onend=function(){};
        var i=0;
        if (typeof arguments[i]=="string" || isFile(arguments[i])) {
            local=sh.resolve(arguments[i], true);
            i++;
            if (typeof arguments[i]=="string" || isFile(arguments[i])) {
                remote=sh.resolve(arguments[i], false);
                i++;
            }
        }
        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
        if (typeof arguments[i]=="function") { onend=arguments[i]; i++;}
        if (!local) remote=local=sh.cwd;
        if (options && options.onend) options.onend=promptAfter(options.onend);
        if (!remote) remote=local;
        sh.echo("sync args=",local,remote,options,onend);
        Sync.sync(local,remote,options,promptAfter(onend));
        return sh.ASYNC;
        function promptAfter(f) {
            return function () {
                //alert("pro");
                if (f) f.apply({},arguments);
                sh.prompt();
            };
        }
    };
    function isFile(v) {
        return v && v.isDir;
    }
    Sync.sync=function () {
        // sync dir:file options:o onend:f  local=remote=dir
        // sync local:file remote:file options:o onend:f
        var local,remote,options,onend;
        var i=0;
        if (isFile(arguments[i])) {
            local=arguments[i];
            i++;
            if (isFile(arguments[i])) {
                remote=arguments[i];
                i++;
            }
        }
        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
        if (typeof arguments[i]=="function") { onend=arguments[i]; i++;}

        if (!local) throw "Sync.sync: Local dir must be specified as file object";
        if (!remote) remote=local;
        if (!options) options={};
        if (!onend && options.onend) onend=options.onend;
        if (options.test) options.v=1;
        n0();
        var uploads={},downloads=[],visited={};
        function status(name, param) {
            sh.echo("Status: "+name+" param:",param);
            if (options.onstatus) {
                options.onstatus(name, param);
            }
        }
        function onError() {
            if (options.onerror) {
                options.onerror.apply(this, arguments);
            }
        }
        function n0() {
            var req={base:remote.path(),excludes:JSON.stringify(options.excludes)};
            status("getDirInfo", req);
            $.ajax({
                type:"get",
                url:WebSite.top+"/edit/getDirInfo",
                data:req,
                success:n1,
                error:onError
            });
        }
        function n1(info) {
            info=JSON.parse(info);
            if (options.v) sh.echo("getDirInfo",info);
            var base=local;//FS.get(info.base);
            var data=info.data;
            for (var rel in data) {
                var file=base.rel(rel);
                var lcm=file.metaInfo();
                var rmm=data[rel];
                cmp(file,rel,lcm,rmm);
            }
            local.recursive(function (file) {
                var lcm=file.metaInfo();
                var rel=file.relPath(local);
                var rmm=data[rel];
                cmp(file,rel,lcm,rmm);
            },{includeTrashed:true, excludes:options.excludes});
            if (options.v) {
                sh.echo("uploads:",uploads);
                sh.echo("downloads:",downloads);
            }

            var req={base:remote.path(),paths:JSON.stringify(downloads)};
            status("File2LSSync", req);
            $.ajax({
                type:"post",
                url:WebSite.top+"/edit/File2LSSync",
                data:req,
                success:n2,
                error:onError
            });
        }
        function n2(dlData) {
            sh.echo("dlData=",dlData);
            dlData=JSON.parse(dlData);
            if (options.v) sh.echo("dlData:",dlData);
            var base=local;//FS.get(dlData.base);
            if (options.test) return;
            for (var rel in dlData.data) {
                var dlf=base.rel(rel);
                var d=dlData.data[rel];
                //if (options.v) sh.echo(dlf.path(), d);
                if (d.trashed) {
                    if (dlf.exists()) dlf.rm();
                } else {
                    dlf.text(d.text);
                }
                delete d.text;
                dlf.metaInfo(d);
            }
            var req={base:remote.path(),data:JSON.stringify(uploads)};
            req.pathInfo="/LS2FileSync";
            status("LS2FileSync", req);
            rf.ajax({
                type:"post",
                url:WebSite.top+"/edit/LS2FileSync",
                data:req,
                success:n3,
                error:onError
            });
        }
        function n3(res){
            if (options.v) sh.echo("LS2FileSync res=",res);
            var upds=[];
            for (var i in uploads) upds.push(i);
            res={msg:res,uploads:upds,downloads: downloads};
            //if (options.v) sh.echo("onend",onend);
            if (typeof onend=="function") onend(res);
        }
        function cmp(f,rel,lcm,rmm) {
            if (visited[rel]) return ;
            visited[rel]=1;
            if (rmm && (!lcm || lcm.lastUpdate<rmm.lastUpdate)) {
                downloads.push(rel);
                if (options.v)
                    sh.echo((!lcm?"New":"")+
                            "Download "+f+
                            " trash="+!!rmm.trashed);
            } else if (lcm && (!rmm || lcm.lastUpdate>rmm.lastUpdate)) {
                var o={text:f.text()};
                var m=f.metaInfo();
                for (var i in m) o[i]=m[i];
                uploads[rel]=o;
                if (options.v)
                    sh.echo((!rmm?"New":"")+
                            "Upload "+f+
                            " trash="+!!lcm.trashed);
            }

        }
    };
    sh.rsh=function () {
        var a=[];
        for (var i=0; i<arguments.length; i++) a[i]=arguments[i];
        $.ajax({
            url:WebSite.top+"/edit/rsh",
            data:{args:JSON.stringify(a)},
            success:function (r) {
                sh.echo(r);
            },error:function (req,e,mesg) {
                sh.err(mesg);
            },complete:function (){
                sh.prompt();
            }
        });
        return sh.ASYNC;
    };
    return Sync;
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
requireSimulator.setName('zip');
define(["FS","Shell"],function (FS,sh) {
    if (typeof JSZip=="undefined") return {};
    var zip={};
    zip.zip=function (dir,options) {
        var zip = new JSZip();
        function loop(dst, dir) {
            dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name());
                    loop(sf, f);
                } else {
                    dst.file(f.name(),f.text());
                }
            });
        }
        loop(zip, dir);
        //zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        var content = zip.generate({type:"blob"});
        return content;
    };
    if (typeof saveAs!="undefined") {
        sh.dlzip=function (dir) {
            dir=sh.resolve(dir);
            var content=zip.zip(dir);
            saveAs(content, dir.name().replace(/\//g,"")+".zip");
        }
    }
    return zip;
});
requireSimulator.setName('ide/selProject');
requirejs(["FS","Wiki","Shell","Shell2",
           "copySample","NewProjectDialog","UI","Sync","Auth","zip","requestFragment","WebSite"],
  function (FS, Wiki,   sh,sh2,
            copySample,  NPD,           UI, Sync, Auth,zip,requestFragment,WebSite) {
$(function () {

    copySample();
    var home=FS.get(WebSite.tonyuHome);
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        var d=[];
        curDir.each(function (f) {
            if (!f.isDir()) return;
            var l=f.lastUpdate();
            var r=f.rel("options.json");
            if (r.exists()) {
                l=r.lastUpdate();
            }
            d.push([f,l]);
        });
        d=d.sort(function (a,b) {
            return b[1]-a[1];
        });
        d.forEach(function (e) {
            var f=e[0];
            var name=f.name();

            if (!f.isDir()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"project.html?dir="+f.path()},
                     ["img",{$var:"t",src:"../../images/nowprint.png"}],
                     ["div", name]
                     ]);
            u.appendTo("#prjItemList");
            setTimeout(function () {
                var tn=f.rel("images/").rel("icon_thumbnail.png");
                //console.log(tn.path());
                if (tn.exists()) {
                    u.$vars.t.attr("src",tn.text());
                }
            },10);
            //$("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    Auth.currentUser(function (r){
        if (r) {
            $(".while-logged-out").hide();
            $("#login").text(r);
        } else {
            $(".while-logged-in").hide();
        }
    });
    var w=Wiki($("#wikiViewArea"), home.rel("doc/"));
    var syncDoc=false;
    if (WebSite.devMode) {
        Sync.sync(home,{v:1});
    } else if (WebSite.disableROM["ROM_d.js"]) {
        syncDoc=true;
        Sync.sync(home.rel("doc/"),{v:1, excludes:[home.rel("doc/html/").path()],
            onend:function () {
            if (home.rel("doc/index.txt").exists()) {
                w.show("index");
            }
        }});
    }
    if (!syncDoc) w.show("index");


    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    ls();
    SplashScreen.hide();
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
});
});

requireSimulator.setName();
