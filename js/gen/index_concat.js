// Created at Tue Nov 25 2014 13:25:39 GMT+0900 (東京 (標準時))
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

requireSimulator.setName('FS');
FS=function () {
	var ramDisk=null;
	if (typeof localStorage=="undefined" || localStorage==null) {
		console.log("FS: Using RAMDisk");
		ramDisk={};
	}
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
    	if (ramDisk) return lcsRAM(path, text);
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
    	if (ramDisk) return lcsExistsRAM(path);
        var r=resolveROM(path);
        if (r) return r.rel in r.rom;
        return path in localStorage;
    }
    function lcsRAM(path, text) {
        var r=resolveROM(path);
        if (arguments.length==2) {
            if (r) throw path+" is Read only.";
            if (text==null) delete ramDisk[path];
            else return ramDisk[path]=text;
        } else {
            if (r) {
                return r.rom[r.rel];
            }
            return ramDisk[path];
        }
    }
    function lcsExistsRAM(path) {
        var r=resolveROM(path);
        if (r) return r.rel in r.rom;
        return path in ramDisk;
    }

    function putDirInfo(path, dinfo, trashed) {
        // trashed: putDirInfo is caused by trashing the file/dir.
	if (path==null) throw "putDir: Null path";
        if (!isDir(path)) throw "Not a directory : "+path;
        lcs(path, JSON.stringify(dinfo));
        var ppath=up(path);
        if (ppath==null) return;
        var pdinfo=getDirInfo(ppath);
        touch(pdinfo, ppath, getName(path), trashed);
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
	for (var i in dinfo) {
	    if (typeof dinfo[i]=="number") {
		dinfo[i]={lastUpdate:dinfo[i]};
	    }
	}
        return dinfo;
    }
    function touch(dinfo, path, name, trashed) {
	// path:path of dinfo
	// trashed: this touch is caused by trashing the file/dir.
	if (!dinfo[name]) {
	    dinfo[name]={};
	    if (trashed) dinfo[name].trashed=true;
	}
	if (!trashed) delete dinfo[name].trashed;
	dinfo[name].lastUpdate=now();
	/*if (trashed && (!dinfo[name] || dinfo[name].trashed)) {
	    dinfo[name]={lastUpdate:now(),trashed:true};
        } else {
            dinfo[name]={lastUpdate:now()};
	}*/
	putDirInfo(path ,dinfo, trashed);
    }
    function removeEntry(dinfo, path, name) {// path:path of dinfo
        if (dinfo[name]) {
	    dinfo[name]={lastUpdate:now(),trashed:true};
            //delete dinfo[name];
            putDirInfo(path ,dinfo, true);
        }
    }
    function removeEntryWithoutTrash(dinfo, path, name) {// path:path of dinfo
        if (dinfo[name]) {
            delete dinfo[name];
            putDirInfo(path ,dinfo, true);
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
                    var dinfo= getDirInfo(p);
                    var ovr=JSON.parse(data[i]);
                    for (var k in ovr) {
                        dinfo[k]=ovr[k];
                    }
                    putDirInfo(p, dinfo,false);
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
        if (path==null) throw "FS.get: Null path";
        if (path.isDir) return path;
        if (securityDomain.topDir && !startsWith(path,securityDomain.topDir)) {
        	throw path+" is out of securtyDomain";
        }
        if (!isPath(path)) throw path+": Path must starts with '/'";
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
                var dinfo=getDirInfo(path);
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
                if (!dir.exists()) throw path+": No such dir.";
                var lis=dir.ls();
                if (lis.length>0) throw path+": Directory not empty";
                //lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntry(pinfo, parent, name);
                }
            };
            dir.removeWithoutTrash=function() {
                dir.each(function (f) {
                    f.removeWithoutTrash();
                },{includeTrashed:true});
                lcs(path,null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntryWithoutTrash(pinfo, parent, name);
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
	    dir.exists=function () {
		if (path=="/") return true;
		var pinfo=getDirInfo(parent);
		return pinfo && pinfo[name] && !pinfo[name].trashed;
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
            file.removeWithoutTrash=function () {
                if (!file.exists() && !file.isTrashed()) throw path+": No such file.";
                lcs(path, null);
                if (parent!=null) {
                    var pinfo=getDirInfo(parent);
                    removeEntryWithoutTrash(pinfo, parent, name);
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
        res.isTrashed=function () {
            var m=res.metaInfo();
            if (!m) return false;
            return m.trashed;
        };
        res.metaInfo=function () {
            if (parent!=null) {
                var pinfo=getDirInfo(parent);
                if (arguments.length==0) {
                    return pinfo[name];
                } else {
                    pinfo[name]=arguments[0];
                    putDirInfo(parent, pinfo, pinfo[name].trashed);
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
            var pinfo=getDirInfo(parent);
            touch(pinfo, parent, name, false);
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
            touch(dinfo, p , name, dinfo[name] && dinfo[name].trashed);
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

requireSimulator.setName('WebSite');
define([], function () {
    var loc=document.location.href;
    var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
    if (loc.match(/jsrun\.it/)) {
        window.WebSite={
            urlAliases: {
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
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                    "images/ecl.png":"../../images/ecl.png"
            },top:"../../",devMode:devMode
        };
    } else {
        window.WebSite={
           urlAliases: {}, top: "../../",devMode:devMode
        };
    }
    window.WebSite.disableROM={};
	if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
	    window.WebSite.disableROM={"ROM_d.js":true};
	}
    if (loc.match(/\.appspot\.com/) ||  loc.match(/localhost:888[87]/)) {
        window.WebSite.serverType="GAE";
    }
    if (loc.match(/localhost:3000/) ) {
        window.WebSite.serverType="Node";
    }
    if (loc.match(/tonyuexe\.appspot\.com/) ||
        loc.match(/localhost:8887/)) {
        window.WebSite.serverTop=window.WebSite.top+"exe/";
    } else {
        window.WebSite.serverTop=window.WebSite.top+"edit/";
    }
    window.WebSite.sampleImg=window.WebSite.top+"images";
    window.WebSite.blobPath=window.WebSite.serverTop+"serveBlob";

    return window.WebSite;
});

requireSimulator.setName('fs/ROMk');
(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{".desktop":{"lastUpdate":1416889517768},"Actor.tonyu":{"lastUpdate":1414051292629},"BaseActor.tonyu":{"lastUpdate":1416889517769},"Boot.tonyu":{"lastUpdate":1416889517769},"Keys.tonyu":{"lastUpdate":1411529063832},"Map.tonyu":{"lastUpdate":1412840047455},"MathMod.tonyu":{"lastUpdate":1400120164000},"MML.tonyu":{"lastUpdate":1407216015130},"NoviceActor.tonyu":{"lastUpdate":1411021950732},"ScaledCanvas.tonyu":{"lastUpdate":1414051292632},"Sprites.tonyu":{"lastUpdate":1416889517770},"TObject.tonyu":{"lastUpdate":1400120164000},"TQuery.tonyu":{"lastUpdate":1403517241136},"WaveTable.tonyu":{"lastUpdate":1400120164000},"Panel.tonyu":{"lastUpdate":1414051292634},"MapEditor.tonyu":{"lastUpdate":1413954028924},"InputDevice.tonyu":{"lastUpdate":1416889517771},"Pad.tonyu":{"lastUpdate":1414554218357}}',
      '.desktop': '{"runMenuOrd":["TouchedTestMain","Main1023","Main2","MapLoad","Main","AcTestM","NObjTest","NObjTest2","AcTest","AltBoot","Ball","Bar","Bounce","MapTest","MapTest2nd","SetBGCTest","Label","PanelTest","Boot","InputDevice","Sprites","BaseActor"]}',
      'Actor.tonyu': 
        'extends BaseActor;\n'+
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
        'includes MathMod;\n'+
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
        '    ifwait {\n'+
        '        _thread.suspend();\n'+
        '    }\n'+
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
        '    play().stop();\n'+
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
        'nowait \\rnd(r) {\n'+
        '    if (typeof r=="number") {\n'+
        '        return Math.floor(Math.random()*r);\n'+
        '    }\n'+
        '    return Math.random();\n'+
        '}\n'+
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
        '    if (x==null || y==null) return;\n'+
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
        '\\play() {\n'+
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
        '    var mml=new MML;\n'+
        '    var mmls=[];\n'+
        '    for (var i=0; i<arguments.length; i++) {\n'+
        '        mmls.push(arguments[i]);\n'+
        '    }\n'+
        '    mml.play(mmls);\n'+
        '    return mml;\n'+
        '}'
      ,
      'Boot.tonyu': 
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
        '    print ("Loading pats..");\n'+
        '    var rs=$currentProject.getResource();\n'+
        '    var a=asyncResult();\n'+
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
        '    \n'+
        '    for (var k,v in $MMLS) {\n'+
        '        v.stop();\n'+
        '    }\n'+
        '    $WaveTable.stop();\n'+
        '}\n'+
        'initSprites();\n'+
        '$InputDevice=new InputDevice;\n'+
        '$InputDevice.initCanvasEvents(cvj);\n'+
        'initThread();\n'+
        '\n'+
        '$pat_fruits=30;\n'+
        '$Keys=new Keys;\n'+
        '$MMLS={};\n'+
        '$Math=Math;\n'+
        '$WaveTable=new WaveTable;\n'+
        '$consolePanel=new Panel{align:"center",x:465/2,y:465/2,width:465,height:465,zOrder:-10,layer:$FrontSprites};\n'+
        '$consolePrintY=465-15;\n'+
        '$panel=new Panel{align:"center",x:$screenWidth/2,y:$screenHeight/2,width:$screenWidth,height:$screenHeight,zOrder:-1,layer:$FrontSprites};\n'+
        'if (typeof SplashScreen!="undefined") SplashScreen.hide();\n'+
        'while (true) {\n'+
        '    ti=new Date().getTime();\n'+
        '    thg.steps();\n'+
        '    $Keys.update();\n'+
        '    $InputDevice.update();\n'+
        '    $screenWidth=$Screen.width;\n'+
        '    $screenHeight=$Screen.height;\n'+
        '    $Screen.fillCanvas($Screen.buf[0]);\n'+
        '    $Sprites.draw($Screen.buf[0]);\n'+
        '    $FrontSprites.draw($Screen.buf[0]);\n'+
        '    $Screen.draw();\n'+
        '    $Sprites.checkHit();\n'+
        '    wt=33-(new Date().getTime()-ti);\n'+
        '    if (wt<0) wt=0;\n'+
        '    waitFor(Tonyu.timeout(wt));\n'+
        '}'
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
        '\\sin(d) {\n'+
        '    return Math.sin(rad(d));\n'+
        '}\n'+
        '\\cos(d) {\n'+
        '    return Math.cos(rad(d));\n'+
        '}\n'+
        '\\rad(d) {\n'+
        '    return d/180*Math.PI;\n'+
        '}\n'+
        '\\deg(d) {\n'+
        '    return d/Math.PI*180;\n'+
        '}\n'+
        '\n'+
        '\\abs(v) {\n'+
        '    return Math.abs(v);\n'+
        '}\n'+
        '\\atan2(x,y) {\n'+
        '    return deg(Math.atan2(x,y));\n'+
        '}\n'+
        '\\floor(x) {\n'+
        '    return Math.floor(x);\n'+
        '}\n'+
        '\\angleDiff(a,b) {\n'+
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
        '\\sqrt(t) {\n'+
        '    return Math.sqrt(t);\n'+
        '}\n'+
        '\\dist(dx,dy) {\n'+
        '    if (typeof dx=="object") {\n'+
        '        var t=dx;\n'+
        '        dx=t.x-x;dy=t.y-y;\n'+
        '    }\n'+
        '    return sqrt(dx*dx+dy*dy);\n'+
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
        'native $;\n'+
        'native Math;\n'+
        'native isNaN;\n'+
        '\\new(opt){\n'+
        '    super(opt);\n'+
        '    this.width=width;\n'+
        '    this.height=height;\n'+
        '    if(align==null) align="center";\n'+
        '    buf=$("<canvas>").attr{width,height};\n'+
        '}\n'+
        '\\setPanel(width,height){\n'+
        '    this.width=width;\n'+
        '    this.height=height;\n'+
        '    buf=$("<canvas>").attr{width,height};\n'+
        '}\n'+
        '\\setFillStyle(color){\n'+
        '    this.color=color;\n'+
        '}\n'+
        '\\fillRect(x,y,rectWidth,rectHeight){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    //ctx.clearRect(0,0,this.width,this.height);\n'+
        '    ctx.fillStyle=color;\n'+
        '    ctx.fillRect(x,y,rectWidth,rectHeight);\n'+
        '    ctx.restore();\n'+
        '}\n'+
        '\\fillText(text,x,y,size,align){\n'+
        '    ctx=buf[0].getContext("2d");\n'+
        '    ctx.save();\n'+
        '    //ctx.clearRect(0,0,this.width,this.height);\n'+
        '    ctx.textAlign = align;\n'+
        '    ctx.fillStyle=color;\n'+
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
        '    ctx.drawImage(\n'+
        '    pImg, 0, 0,width,height,\n'+
        '    -width/2, -height/2, width ,height);\n'+
        '    ctx.restore();\n'+
        '}'
      ,
      'ScaledCanvas.tonyu': 
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
      'Sprites.tonyu': 
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
      'TObject.tonyu': 
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
  if (WebSite.devMode || WebSite.disableROM['ROM_k.js']) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();
requireSimulator.setName('fs/ROMd');
(function () {
  var rom={
    base: '/Tonyu/doc/',
    data: {
      '': '{"index.txt":{"lastUpdate":1414046735157},"novice/":{"lastUpdate":1414049394769},"projectIndex.txt":{"lastUpdate":1410937811102},"tonyu2/":{"lastUpdate":1416888904340},"images/":{"lastUpdate":1416888904199},"チュートリアル.txt":{"lastUpdate":1415167881257}}',
      'images/': '{"test.png":{"lastUpdate":1416732107619,"trashed":true},"toste.png":{"lastUpdate":1416732107620,"trashed":true},"3d.png":{"lastUpdate":1411541273574},"ren1.png":{"lastUpdate":1411539723811},"ren2.png":{"lastUpdate":1411539726654},"tonyu2Logo.png":{"lastUpdate":1410937763853},"画像の挿入.png":{"lastUpdate":1415251744940}}',
      'images/3d.png': 'data:image/png;base64,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',
      'images/ren1.png': 'data:image/png;base64,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',
      'images/ren2.png': 'data:image/png;base64,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',
      'images/tonyu2Logo.png': 'data:image/png;base64,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',
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
        '-[[リファレンス>tonyu2/index]]\n'+
        '\n'+
        '* チュートリアル\n'+
        '\n'+
        '-[[チュートリアル>tonyu2/チュートリアル]]\n'+
        '\n'+
        '* ヘルプ集\n'+
        '\n'+
        '-[[用途別リファレンス>tonyu2/用途別リファレンス]]を参照\n'+
        '\n'+
        '\n'+
        '* プロジェクトの保存について\n'+
        '\n'+
        '-作成したプロジェクトは今使っているブラウザ(localStorage)に保存されます．\n'+
        '-[[@blink ログイン>#login]]をすると，サーバにプロジェクトを保存し，他のブラウザとプロジェクトを共有できます．\n'+
        '-- GoogleまたはTwitterのアカウントが必要です\n'+
        '-ログイン後[[@blink メニューのログイン>#login]]から[[@blink プロジェクトの同期>#syncProjects]]を選ぶと，プロジェクトが同期されます\n'+
        '-- 同期には数分間かかることがあります\n'+
        '-- サンプルプロジェクト（1_Animation ～ 14_File）は同期されません．\n'
      ,
      'novice/': '{"crash.txt":{"lastUpdate":1400120163000},"dec.txt":{"lastUpdate":1414030684663},"firstRun.txt":{"lastUpdate":1400120163000},"getkey.txt":{"lastUpdate":1400120163000},"inc.txt":{"lastUpdate":1400120163000},"index.txt":{"lastUpdate":1400120163000},"item.txt":{"lastUpdate":1400120163000},"key.txt":{"lastUpdate":1400120163000},"left.txt":{"lastUpdate":1400120163000},"new.txt":{"lastUpdate":1400120163000},"newFile.txt":{"lastUpdate":1400120163000},"param.txt":{"lastUpdate":1400120163000},"projectIndex.txt":{"lastUpdate":1400120163000},"say.txt":{"lastUpdate":1400120163000},"say2.txt":{"lastUpdate":1400120163000},"sleep.txt":{"lastUpdate":1400120163000},"sprite.txt":{"lastUpdate":1400120163000},"spriteMove.txt":{"lastUpdate":1400120163000},"toc.json":{"lastUpdate":1400120163000},"trouble1.txt":{"lastUpdate":1400120163000},"true.txt":{"lastUpdate":1400120163000},"udlr.txt":{"lastUpdate":1400120163000},"variable.txt":{"lastUpdate":1400120163000},"variable2.txt":{"lastUpdate":1400120163000},"variable3.txt":{"lastUpdate":1400120163000},"while.txt":{"lastUpdate":1400120163000},"xy.txt":{"lastUpdate":1400120163000}}',
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
      'tonyu2/': '{"$mouseX, $mouseY.txt":{"lastUpdate":1400120163000},"$touches.txt":{"lastUpdate":1400120163000},"Actor.txt":{"lastUpdate":1400120163000},"all.txt":{"lastUpdate":1400120163000},"allCrash.txt":{"lastUpdate":1400120163000},"api.txt":{"lastUpdate":1414553502637},"asyncResult.txt":{"lastUpdate":1400120163000},"BaseActor.txt":{"lastUpdate":1401255240110},"Boot.txt":{"lastUpdate":1401941267461},"classDef.txt":{"lastUpdate":1400120163000},"console.txt":{"lastUpdate":1400120163000},"cpats.txt":{"lastUpdate":1414045685739},"crashTo.txt":{"lastUpdate":1400120164000},"crashTo1.txt":{"lastUpdate":1400120164000},"die.txt":{"lastUpdate":1400120164000},"draw.txt":{"lastUpdate":1400120164000},"extend.txt":{"lastUpdate":1400120164000},"file.txt":{"lastUpdate":1400120164000},"forin.txt":{"lastUpdate":1400120164000},"frame.txt":{"lastUpdate":1401255298602},"FS.each.txt":{"lastUpdate":1400120164000},"FS.exists.txt":{"lastUpdate":1400120164000},"FS.obj.txt":{"lastUpdate":1400120164000},"FS.recursive.txt":{"lastUpdate":1400120164000},"FS.rel.txt":{"lastUpdate":1400120164000},"FS.text.txt":{"lastUpdate":1400120164000},"fs.txt":{"lastUpdate":1413340858008},"get.txt":{"lastUpdate":1401255650741},"getAt.txt":{"lastUpdate":1401255658905},"getCrashRect.txt":{"lastUpdate":1400120164000},"getkey.txt":{"lastUpdate":1400120164000},"hide.txt":{"lastUpdate":1400120164000},"ide.txt":{"lastUpdate":1413340960285},"index.txt":{"lastUpdate":1415764060485},"isDead.txt":{"lastUpdate":1400120164000},"kernel.txt":{"lastUpdate":1400120164000},"lang.txt":{"lastUpdate":1400120164000},"Map.txt":{"lastUpdate":1401255487455},"MathMod.txt":{"lastUpdate":1400120164000},"options.txt":{"lastUpdate":1400120164000},"play.txt":{"lastUpdate":1413445367173},"playSE.txt":{"lastUpdate":1400120164000},"print.txt":{"lastUpdate":1400120164000},"resize.txt":{"lastUpdate":1400120164000},"rnd.txt":{"lastUpdate":1400120164000},"ScaledCanvas.txt":{"lastUpdate":1401255697009},"scrollTo.txt":{"lastUpdate":1401255664750},"set.txt":{"lastUpdate":1401255540844},"setBGColor.txt":{"lastUpdate":1401255686147},"show.txt":{"lastUpdate":1400120164000},"sugar.txt":{"lastUpdate":1400120164000},"super.txt":{"lastUpdate":1400120164000},"TQuery.alive.txt":{"lastUpdate":1400120164000},"TQuery.apply.txt":{"lastUpdate":1400120164000},"TQuery.attr.txt":{"lastUpdate":1400120164000},"TQuery.die.txt":{"lastUpdate":1400120164000},"TQuery.find.txt":{"lastUpdate":1400120164000},"TQuery.minmax.txt":{"lastUpdate":1400120164000},"TQuery.txt":{"lastUpdate":1400120164000},"update.txt":{"lastUpdate":1401255209313},"waitFor.txt":{"lastUpdate":1400120164000},"waitmode.txt":{"lastUpdate":1400120164000},"updateEx.txt":{"lastUpdate":1401255346149},"setAt.txt":{"lastUpdate":1401255643995},"Panel.txt":{"lastUpdate":1401945627455},"setPanel.txt":{"lastUpdate":1401941697100},"setFillStyle.txt":{"lastUpdate":1401941975499},"fillRect.txt":{"lastUpdate":1401942274402},"fillText.txt":{"lastUpdate":1401942864666},"clearRect.txt":{"lastUpdate":1401943178040},"getPixel.txt":{"lastUpdate":1402467081226},"$screenWidth,$screenHeight.txt":{"lastUpdate":1411538810273},"$touches2.txt":{"lastUpdate":1411535023757},"3Dキャラの出現.txt":{"lastUpdate":1415778447750},"3Dキャラの移動.txt":{"lastUpdate":1414044673449},"3Dキャラの表示.txt":{"lastUpdate":1415778543701},"3D弾を打つ.txt":{"lastUpdate":1415869512247},"mapEditor.txt":{"lastUpdate":1413340524950},"mapGet.txt":{"lastUpdate":1412226147683},"あたり判定をつける.txt":{"lastUpdate":1415869637687},"すべてのオブジェクトを消す.txt":{"lastUpdate":1412235883736},"すべてのキャラクタに同じ動作を行なう.txt":{"lastUpdate":1412144639559},"とある計算.txt":{"lastUpdate":1412835918753},"オブジェクトに動きを追加する.txt":{"lastUpdate":1413953354705},"オブジェクトに連続でぶつからないようにする.txt":{"lastUpdate":1412230882740},"オブジェクトのグラフィックを変更する.txt":{"lastUpdate":1413282871932},"オブジェクトの大きさ、傾き、透明度を設定する.txt":{"lastUpdate":1413274806742},"オブジェクトをランダムな位置に表示する.txt":{"lastUpdate":1412235972285},"オブジェクトを動かす.txt":{"lastUpdate":1415766246955},"オブジェクトを消す.txt":{"lastUpdate":1413433714190},"オブジェクトを移動させる.txt":{"lastUpdate":1412232259327},"オブジェクトを表示する.txt":{"lastUpdate":1415767921388},"キャラクターを配置する.txt":{"lastUpdate":1411461645336},"クリックした時に動作をする.txt":{"lastUpdate":1412236840777},"ジャンプして着地する.txt":{"lastUpdate":1415159343713},"ジャンプして落ちる.txt":{"lastUpdate":1412236810786},"スコアを表示する.txt":{"lastUpdate":1412238209105},"タッチした位置にオブジェクトを表示する.txt":{"lastUpdate":1412743970087},"テキストオブジェクトとして時間を表示する.txt":{"lastUpdate":1412230831107},"フレーム数を計り、そこから時間を計算する.txt":{"lastUpdate":1412230734436},"プログラムでマップを描く.txt":{"lastUpdate":1412226138563},"マウスの位置にオブジェクトを表示する.txt":{"lastUpdate":1412236834408},"マップを描く.txt":{"lastUpdate":1411023209657},"ラインと曲の同期.txt":{"trashed":true,"lastUpdate":1415174327677},"リトライする.txt":{"lastUpdate":1413964379367},"乱数を使う.txt":{"lastUpdate":1412235977010},"他のオブジェクトを消す.txt":{"lastUpdate":1413445971694},"宣言する際にオブジェクトの値を設定する.txt":{"lastUpdate":1413274251860},"左右に移動させる.txt":{"lastUpdate":1415766479314},"座標を指定する.txt":{"lastUpdate":1413339807062},"弾を撃つ.txt":{"lastUpdate":1412236822048},"当たり判定で当たったオブジェクトを消す.txt":{"lastUpdate":1412235873709},"当たり判定の大きさを変える.txt":{"lastUpdate":1412144938854},"当たり判定を変更する.txt":{"lastUpdate":1412236246179},"文字をテキストオブジェクトとして表示する.txt":{"lastUpdate":1412237896594},"文字を画面下部に表示する.txt":{"lastUpdate":1412237387049},"文字を表示する.txt":{"lastUpdate":1412236970336},"時間を計る.txt":{"lastUpdate":1412230841009},"曲の作成.txt":{"lastUpdate":1416467370213},"曲の演奏時間の図り方、タイミングチャート.txt":{"lastUpdate":1413967648861},"特定のオブジェクトの値を設定する.txt":{"lastUpdate":1413274212665},"特定の位置をクリックした時に動作をする.txt":{"lastUpdate":1412236848024},"特定の複数のオブジェクトに同じ動作を行う.txt":{"lastUpdate":1414046556018},"用途別リファレンス.txt":{"lastUpdate":1416472804117},"画面の上からランダムにオブジェクトを降らせる.txt":{"lastUpdate":1412230059939},"画面の上からランダムにキャラを降らせる.txt":{"lastUpdate":1412230084340},"疑似3D表示を行う.txt":{"lastUpdate":1413348952980},"確率でオブジェクトを出現させる.txt":{"lastUpdate":1412230135469},"確率でキャラを出現させる.txt":{"lastUpdate":1412230051717},"自分自身を消す.txt":{"lastUpdate":1413959461504},"複数のオブジェクトを動かす.txt":{"lastUpdate":1412233528778},"複数のオブジェクトを表示する.txt":{"lastUpdate":1412233389141},"音ゲームの作成の仕方.txt":{"lastUpdate":1415248589868},"3D背景.txt":{"lastUpdate":1415869940775},"getButton.txt":{"lastUpdate":1414554877663},"getDown.txt":{"lastUpdate":1414554816600},"getLeft.txt":{"lastUpdate":1414554823999},"getRight.txt":{"lastUpdate":1414554834218},"getUp.txt":{"lastUpdate":1414554793818},"login.txt":{"lastUpdate":1413341068538},"mapscrollTo.txt":{"lastUpdate":1414564487512},"Pad.txt":{"lastUpdate":1414553877054},"オブジェクトに動きを追加.txt":{"lastUpdate":1414044368553},"オブジェクトに名前を付けて値を設定する.txt":{"lastUpdate":1414045385814},"オブジェクトのグラフィックを変える.txt":{"lastUpdate":1414046606679},"オブジェクトの大きさや傾き、透明度を設定する.txt":{"lastUpdate":1414045757302},"オブジェクトの奥行きの設定.txt":{"lastUpdate":1415767978729},"オブジェクトを宣言する際に値を設定する.txt":{"lastUpdate":1414045499092},"チュートリアル.txt":{"lastUpdate":1414045652378},"マウスクリックで力加減を判定する.txt":{"lastUpdate":1413874532161},"ラインパネルと曲(音符).txt":{"lastUpdate":1415176173490},"ラインパネルと曲(音符)との同期.txt":{"lastUpdate":1415176239671},"ラインパネルと曲(音符)の同期.txt":{"lastUpdate":1415765767222},"ラインパネルと曲の同期.txt":{"lastUpdate":1415176188724},"ラインパネルの作成.txt":{"lastUpdate":1415765610537},"上下左右に移動させる.txt":{"lastUpdate":1415766635369},"前へ.txt":{"lastUpdate":1414044161750},"力加減の判定方法.txt":{"lastUpdate":1415778720178},"力加減を弾に適用する.txt":{"lastUpdate":1415766297496},"効果音を鳴らす.txt":{"lastUpdate":1416467723461},"座標を指定してオブジェクトを表示する.txt":{"lastUpdate":1414044380654},"当たり判定で壁にぶつかる.txt":{"lastUpdate":1415767319737},"当たり判定で敵に当たったらプレイヤーを消す.txt":{"lastUpdate":1413352541473},"拡張機能.txt":{"lastUpdate":1416473571318},"曲の演奏時間の取得.txt":{"lastUpdate":1416472593101},"曲の演奏時間の図り方.txt":{"lastUpdate":1415173492418},"画像の挿入.txt":{"lastUpdate":1416471290932},"画面端から出ないようにする.txt":{"lastUpdate":1415767298852},"自機の出現.txt":{"lastUpdate":1415778578057},"複数のオブジェクトを出す.txt":{"lastUpdate":1414044790582},"評価方法(1).txt":{"lastUpdate":1415766024465},"評価方法(2).txt":{"lastUpdate":1415768247267},"音符を降らせる.txt":{"lastUpdate":1416466620632}}',
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
        'それぞれ画面の右端と下端の座標を返します。'
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
        '-[[@cfrag $touches[i].touched]]は，今その場所がタッチされていれば[[@cfrag true]]，タッチされていなければ[[@cfrag false]]を返します\n'+
        '\n'+
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
        '-x : オブジェクトのx座標をあらわします\n'+
        '-y : オブジェクトのy座標をあらわします\n'+
        '-p : 表示する[[キャラクタパターン]]の番号をあらわします \n'+
        '-text : textに値がセットされると，文字を表示します（キャラクタパターンは表示されなくなります）\n'+
        '--size : 文字の大きさをあらわします\n'+
        '--fillStyle : 文字の色などをあらわします(JavascriptのCanvasにおけるfillStyleと同じ書式です）\n'+
        '--align:  "center" "left" "right"のいずれかを指定します．xの値であらわされる横位置がそれぞれ文字の中央，左端，右端になるように表示します．\n'+
        '\n'+
        '* メソッド\n'+
        '\n'+
        '-[[update]]\n'+
        '-[[updateEx]]\n'+
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
        '-[[MathMod]]モジュールクラスがもつメソッド\n'
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
        '\n'
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
        '-atan2(x,y)\n'+
        '-- 線分(0,0)-(x,y)とx軸のなす角を度数法で返します\n'+
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
        '\n'
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
        'パネルの表示クラスです．\n'+
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
        '\n'+
        '*グローバル変数\n'+
        '\n'+
        '-[[$Screen>ScaledCanvas]]\n'+
        '-[[$mouseX, $mouseY]]\n'+
        '-[[$touches]]\n'+
        '-[[$screenWidth,$screenHeight]]\n'+
        '\n'+
        '*[[チュートリアル]]\n'+
        '\n'+
        '*[[用途別リファレンス]]\n'+
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
        '-モジュールクラスが他のクラスを継承していても，組み込んだ先のクラスではその親クラスのメソッドは組み込まれません．\n'+
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
        '[[チュートリアル]]\n'+
        '\n'+
        '[[オブジェクトのグラフィックを変更する]]\n'+
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
        '--通常は，URLを指定すると自動的に設定されます．\n'+
        '-URL  \n'+
        '-- 画像のURLを記述します．はpng,jpgまたはgifを指定してください．\n'+
        '-1個の大きさ\n'+
        '--  固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って描かれた画像の場合，こちらを選びます．\n'+
        '-- Tonyu1互換 ： Tonyu1で利用されている画像をそのまま使う場合はこちらを選びます\n'+
        '--- URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1互換」は使えません．\n'+
        '\n'+
        'キャラクタパターンには，それぞれキャラクタパターン番号が割り振られます．\n'+
        '変数pにキャラクタパターン番号を代入することでそのキャラクタパターンを表示できます．\n'+
        '\n'+
        ' 例えば， $pat_chr という名前の画像ファイルの中の，4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n'+
        '<<code\n'+
        '    p=$pat_chr + 4; \n'+
        '>>\n'+
        '    とします．\n'+
        '\n'+
        '*例\n'+
        '\n'+
        '※ $pat_ballsという名前の画像が追加されているものとします．\n'+
        '<<code\n'+
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
        '>>\n'
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
        '   // 赤い四角形を表示\n'+
        '   ctx.fillStyle="red";\n'+
        '   ctx.fillRect(x,y,20,20);\n'+
        '}\n'+
        '>>\n'+
        '\n'+
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
        '\n'+
        '-[[トップへ>../index]]\n'
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
        '*その他\n'+
        '\n'+
        'このメソッドは待機系メソッドです．待機不能モードでは何も動作を行いません．（詳細は[[動作モード>waitmode]]を参照してください）'
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
        '[[前へ>オブジェクトの大きさや傾き、透明度を設定する]]←\n'+
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
        'オブジェクトの大きさ、傾き、透明度はそれぞれscaleX、rotate、alphaで管理されている。これらの値も加減算することで回転や拡大などをさせることができる。'
      ,
      'tonyu2/オブジェクトの奥行きの設定.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '[[オブジェクトを表示する]]\n'+
        '\n'+
        '*オブジェクトに奥行きを設定する\n'+
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
        '何も書かなくてよい\n'+
        '>>\n'+
        '\n'+
        'zOrderの値を設定することでオブジェクトの奥行きを決められる。値が小さいほど手前に表示される。'
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
        '「new ～」でファイルを呼び出す際に{}でくくることで値を設定できる。\n'+
        '\n'+
        '{}や:など、書き方が特殊なので注意。'
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
        '-[[座標を指定する]]\n'+
        '-[[オブジェクトに動きを追加する]]\n'+
        '-[[複数のオブジェクトを動かす]]\n'+
        '-[[特定のオブジェクトの値を設定する]]\n'+
        '-[[宣言する際にオブジェクトの値を設定する]]\n'+
        '-[[オブジェクトの大きさ、傾き、透明度を設定する]]\n'+
        '-[[オブジェクトのグラフィックを変更する]]\n'+
        '-[[特定の複数のオブジェクトに同じ動作を行う]]\n'+
        '-[[オブジェクトの奥行きの設定]]\n'
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
        '-[[オブジェクトのグラフィックを変える]]\n'
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
        '\n'+
        '\n'
      ,
      'tonyu2/力加減を弾に適用する.txt': 
        '[[用途別リファレンス]]\n'+
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
        '-例のxの値には、最大で画面の横幅までの値がランダムに入る。\n'
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
        '[[用途別リファレンス]]\n'+
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
        '-[[オブジェクトを表示する]]\n'+
        '--[[座標を指定する]]\n'+
        '--[[オブジェクトに動きを追加する]]\n'+
        '--[[複数のオブジェクトを動かす]]\n'+
        '--[[特定のオブジェクトの値を設定する]]\n'+
        '--[[宣言する際にオブジェクトの値を設定する]]\n'+
        '--[[オブジェクトの大きさ、傾き、透明度を設定する]]\n'+
        '--[[オブジェクトのグラフィックを変更する]]\n'+
        '--[[特定の複数のオブジェクトに同じ動作を行う]]\n'+
        '--☆[[オブジェクトの奥行きの設定]]\n'+
        '\n'+
        '-[[文字を表示する]]\n'+
        '--[[文字を画面下部に表示する]]\n'+
        '--[[文字をテキストオブジェクトとして表示する]]\n'+
        '----[[スコアを表示する]]\n'+
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
        '--[[拡張機能]]\n'
      ,
      'tonyu2/画像の挿入.txt': 
        '[[用途別リファレンス]]\n'+
        '\n'+
        '音ゲームにはタップする画像(ここでは音符)を挿入しないといけない。\n'+
        'なので最初にOnpuクラスを作成する。\n'+
        '-ファイル→新規→Onpuと入力\n'+
        '-Tonyu System2のウインドウを選び、画像リストを表示。\n'+
        '-画像リストに追加したい画像をドラッグ&ドロップして追加。\n'+
        '-画像を選択し、分割数指定が1×1の大きさになっているか確認する。※ここでは$pat_maruの画像データ自体が大きいので1×1としているが、画像リストに元々入っているsample画像は、大きさを設定しなくてもいいので、sampleでは変更しない。\n'+
        '-$pat_maruの画像はDropboxにあるので、リンク先からダウンロードする。\n'+
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
        '*複数のオブジェクトを出す\n'+
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
        '「new ～」で呼び出したファイルはその中に書いてある動作を実行する。'
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
        '前へ [[評価方法(1)]]'
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
  if (WebSite.devMode || WebSite.disableROM['ROM_d.js']) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();
requireSimulator.setName('fs/ROMs');
(function () {
  var rom={
    base: '/Tonyu/SampleROM/',
    data: {
      '': '{"10_MultiTouch/":{"lastUpdate":1400646750379},"11_Resize/":{"lastUpdate":1400646750380},"12_Sound/":{"lastUpdate":1400646750380},"13_DX/":{"lastUpdate":1400646750381},"14_File/":{"lastUpdate":1400646750381},"1_Animation/":{"lastUpdate":1400646750382},"2_MultipleObj/":{"lastUpdate":1400646750382},"3_NewParam/":{"lastUpdate":1400646750382},"4_getkey/":{"lastUpdate":1400646750383},"5_Chase/":{"lastUpdate":1400646750384},"6_Shot/":{"lastUpdate":1400646750384},"7_Text/":{"lastUpdate":1400646750385},"8_Patterns/":{"lastUpdate":1400646750385},"9_Mouse/":{"lastUpdate":1400646750386}}',
      '10_MultiTouch/': '{".desktop":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000},"Touch.tonyu":{"lastUpdate":1400120165000}}',
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
      '10_MultiTouch/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '11_Resize/': '{".desktop":{"lastUpdate":1400120165000},"Bounce.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000}}',
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
      '11_Resize/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '12_Sound/': '{".desktop":{"lastUpdate":1400120165000},"MMLTest.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000},"SETest.tonyu":{"lastUpdate":1400120165000}}',
      '12_Sound/.desktop': '{"runMenuOrd":["SETest","MMLTest"]}',
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
      '12_Sound/SETest.tonyu': 
        'm=new MMLTest;\n'+
        '\n'+
        'text="Press Space or \'S\'";\n'+
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
      '12_Sound/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"SETest","bootClass":"Boot"},"kernelEditable":false}',
      '13_DX/': '{".desktop":{"lastUpdate":1400120165000},"DX.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000}}',
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
      '13_DX/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '14_File/': '{".desktop":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000}}',
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
      '14_File/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '1_Animation/': '{".desktop":{"lastUpdate":1400120165000},"GoRight.tonyu":{"lastUpdate":1400120165000}}',
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
      '2_MultipleObj/': '{".desktop":{"lastUpdate":1400120165000},"Bounce.tonyu":{"lastUpdate":1400120165000},"GoRight.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000}}',
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
      '3_NewParam/': '{".desktop":{"lastUpdate":1400120165000},"Bounce.tonyu":{"lastUpdate":1400120165000},"GoRight.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000}}',
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
      '4_getkey/': '{".desktop":{"lastUpdate":1400120165000},"Player.tonyu":{"lastUpdate":1400120165000}}',
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
      '5_Chase/': '{".desktop":{"lastUpdate":1400120165000},"Chaser.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"Player.tonyu":{"lastUpdate":1400120165000}}',
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
      '6_Shot/': '{".desktop":{"lastUpdate":1400120165000},"Bullet.tonyu":{"lastUpdate":1400120165000},"Chaser.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"Player.tonyu":{"lastUpdate":1400120165000}}',
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
      '7_Text/': '{".desktop":{"lastUpdate":1400120165000},"Bullet.tonyu":{"lastUpdate":1400120165000},"Chaser.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"Player.tonyu":{"lastUpdate":1400120165000},"Status.tonyu":{"lastUpdate":1400120165000}}',
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
      '8_Patterns/': '{".desktop":{"lastUpdate":1400120165000},"Ball.tonyu":{"lastUpdate":1400120165000},"Main.tonyu":{"lastUpdate":1400120165000},"res.json":{"lastUpdate":1400120165000}}',
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
      '8_Patterns/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_balls","url":"data:image/png;base64,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"}],"sounds":[]}',
      '9_Mouse/': '{".desktop":{"lastUpdate":1400120165000},"MouseChaser.tonyu":{"lastUpdate":1400120165000},"options.json":{"lastUpdate":1400120165000}}',
      '9_Mouse/.desktop': '{"runMenuOrd":["MouseChaser"]}',
      '9_Mouse/MouseChaser.tonyu': 
        'while(true) {\n'+
        '    x=$mouseX;\n'+
        '    y=$mouseY;\n'+
        '    update();\n'+
        '}'
      ,
      '9_Mouse/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"MouseChaser","bootClass":"Boot"},"kernelEditable":false}'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_s.js']) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
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
define(["FS"], function () {
    var Log={};
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return FS.get("/var/log/").rel(y+"/").rel(m+"/").rel(y+"-"+m+"-"+da+".log");
    };
    Log.append=function (line) {
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
requireSimulator.setName('UI');
define(["Util"],function (Util) {
    var UI={};
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
            setTimeout(l,10);
        }
        function l() {
            listeners.forEach(function (li) {
                li();
            });
            setTimeout(l,10);
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
                o.on.realtimechange=function (val) {
                    $edits.writeToModel(o.$edit, val, jq);
                };
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
                    jq.on("keypress",function (ev) {
                        if (ev.which==13) li.apply(jq,arguments);
                    });
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
                    jq.on(eType, li);
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
define(["HttpHelper", "Arrow", "Util","WebSite","Log","UI"],
function (HttpHelper, Arrow, Util, WebSite,Log,UI) {
return Wiki=function (placeHolder, home, options, plugins) {
    var W={};
    var refers={figures:"図", plists: "リスト"};
    var SEQ="__seq__";
    var LINEMARK="marker_"+Math.floor(Math.random()*100000);
    var on={};
    var history=[];
    var EXT=".txt";
    if (!options) options={};
    if (!home.isDir()) throw home+": not a dir";
    var cwd;
    W.on=on;
    W.cd=function (dir) {
    	cwd=dir;
    	tocFile=cwd.rel("toc.json");
    };
    W.cd(home);
    W.parse=function (body,name) {
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
        if (tocFile.exists()) toc=tocFile.obj();
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
                    if (!tocFile.isReadOnly()) tocFile.obj(ctx.toc);
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
                    $h.p($("<img>").attr("src",WebSite.top+"images/editAdd.png"));
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
                    if (name.match(/\.(png|jpg|gif)$/)) {
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
                    		        a=$("<a>").attr({href:"wiki.html?file="+f.path()}).text(caption);
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
            return $("<div>").append( $("<img>").attr("src", WebSite.top+"doc/images/"+name) );
        } else {
            res=UI("div", {style:"margin:10px; padding:10px; border:solid black 1px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},
                    "ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加"
            );
            imfile=FS.get("/Tonyu/doc/images/").rel(name);
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
        else f=cwd.rel(name+EXT);
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
    		var ht=W.parse(f.text(), fn);
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
define(["FS","Util"],function (FS,Util) {
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
define(["Shell","FS"],function (sh,fs) {
    var samples=FS.get("/Tonyu/SampleROM/");
    var projects=FS.get("/Tonyu/Projects/");
    function all() {
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
        if (!dst.exists()) {
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
	res.show=function (prjDir, onOK) {
    	var d=res.embed(prjDir,onOK);
    	d.dialog({width:600});
	};
	res.embed=function (prjDir, onOK) {
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
        			 ["input",{$edit:"name",on:{enterkey:function () {
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
        var model={name:"", parentDir:prjDir};
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
    		onOK(model.dstDir);
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
            $.ajax({type:"post",url:WebSite.top+"edit/sendFragment",data:addRedir({
                id:id, seq:i, len:len, content:frag
            }),success: function (res) {
                console.log("sendFrag",res,i);//,frag);
                sent++;
                if (sent>=len) setTimeout(runFrag,waitTime);
            }, error: options.error
            });
        });
        function runFrag() {
            $.ajax({type:"post",url:WebSite.top+"edit/runFragments",data:addRedir({id:id}),
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
                url:WebSite.top+"edit/getDirInfo",
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
                url:WebSite.top+"edit/File2LSSync",
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
                url:WebSite.top+"edit/LS2FileSync",
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
            url:WebSite.top+"edit/rsh",
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
        $.ajax({type:"get",url:WebSite.serverTop+"currentUser",data:{withCsrfToken:true},
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
            options.showLoginLink(WebSite.serverTop+"login");
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
requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki","Shell","Shell2",
           "copySample","NewProjectDialog","UI","Sync","Auth","zip","requestFragment"],
  function (romk, romd, roms,               FS, Wiki,   sh,sh2,
            copySample,  NPD,           UI, Sync, Auth,zip,requestFragment) {
$(function () {
    copySample();
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNewest).forEach(function (name) {
            var f=curDir.rel(name);
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
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    var syncDoc=false;
    if (WebSite.devMode) {
        Sync.sync(FS.get("/Tonyu/"),{v:1});
    } else if (WebSite.disableROM["ROM_d.js"]) {
        syncDoc=true;
        Sync.sync(FS.get("/Tonyu/doc/"),{v:1, onend:function () {
            if (FS.get("/Tonyu/doc/index.txt").exists()) {
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
});
});

requireSimulator.setName();
