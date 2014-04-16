// Created at Wed Apr 16 2014 17:49:21 GMT+0900 (東京 (標準時))
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
                return FS.get(resPath, securityDomain);
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
requireSimulator.setName('WebSite');
define([], function () {
    var loc=document.location.href;
    var devMode=!!loc.match(/dev\/[^\/]+\.html/);
    if (loc.match(/jsrun\.it/)) {
        return window.WebSite={
            urlAliases: {
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png"
            },top:"",devMode:devMode
        };
    }
    if (loc.match(/localhost/) || loc.match(/tonyuedit\.appspot\.com/)) {
        return window.WebSite={
            urlAliases: {
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png"
            },top:"../../",devMode:devMode
        };
    }

    return window.WebSite={
        urlAliases: {}, top: "../../",devMode:devMode
    };
});
requireSimulator.setName('fs/ROMk');
(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{".desktop":1397119075000,"Actor.tonyu":1397119075000,"BaseActor.tonyu":1397119075000,"Boot.tonyu":1397119075000,"Keys.tonyu":1397119075000,"Map.tonyu":1397636169000,"MathMod.tonyu":1397119075000,"MML.tonyu":1397119075000,"NoviceActor.tonyu":1397119075000,"ScaledCanvas.tonyu":1397119075000,"Sprites.tonyu":1397119075000,"TObject.tonyu":1397119075000,"TQuery.tonyu":1397119075000,"WaveTable.tonyu":1397119075000}',
      '.desktop': '{"runMenuOrd":["AcTestM","NObjTest","SETest","MMLTest","KeyTest","NObjTest2","AcTest","NoviceActor","Actor","Boot","AltBoot","Keys","TObject","WaveTable","MML","BaseActor","TQuery","ScaledCanvas","MathMod"]}',
      'Actor.tonyu': 
        'extends BaseActor;\r\n'+
        'native Sprites;\r\n'+
        'native Tonyu;\r\n'+
        '\r\n'+
        '\\new(x,y,p) {\r\n'+
        '    super(x,y,p);\r\n'+
        '    if (Tonyu.runMode) initSprite();\r\n'+
        '}\r\n'+
        '\\initSprite() {\r\n'+
        '    /*if (!_sprite) {\r\n'+
        '        _sprite=Sprites.add{owner:this};\r\n'+
        '    }*/\r\n'+
        '    $Sprites.add(this);\r\n'+
        '}\r\n'+
        '\r\n'+
        '/*\r\n'+
        '\\update() {\r\n'+
        '    super.update();\r\n'+
        '    if (_sprite) {\r\n'+
        '        _sprite.x=x;\r\n'+
        '        _sprite.y=y;\r\n'+
        '        _sprite.p=p;\r\n'+
        '    }\r\n'+
        '}*/'
      ,
      'BaseActor.tonyu': 
        'extends null;\r\n'+
        'includes MathMod;\r\n'+
        'native Tonyu;\r\n'+
        'native Key;\r\n'+
        'native console;\r\n'+
        'native Math;\r\n'+
        'native fukidashi;\r\n'+
        'native TextRect;\r\n'+
        '\r\n'+
        '\\new(x,y,p) {\r\n'+
        '    if (Tonyu.runMode) {\r\n'+
        '        var thg=currentThreadGroup();\r\n'+
        '        if (thg) _th=thg.addObj(this);\r\n'+
        '    }\r\n'+
        '    if (typeof x=="object") Tonyu.extend(this,x); \r\n'+
        '    else if (typeof x=="number") {\r\n'+
        '        this.x=x;\r\n'+
        '        this.y=y;\r\n'+
        '        this.p=p;\r\n'+
        '    }\r\n'+
        '    if (scaleX==null) scaleX=1;\r\n'+
        '    if (rotate==null) rotate=0;\r\n'+
        '    if (alpha==null) alpha=255;\r\n'+
        '}\r\n'+
        'nowait \\extend(obj) {\r\n'+
        '    return Tonyu.extend(this,obj);\r\n'+
        '}\r\n'+
        '\r\n'+
        'nowait \\print() {\r\n'+
        '    console.log.apply(console,arguments);\r\n'+
        '}\r\n'+
        '\\update() {\r\n'+
        '    ifwait {\r\n'+
        '        _thread.suspend();\r\n'+
        '    }\r\n'+
        '}\r\n'+
        'nowait \\getkey(k) {\r\n'+
        '    return $Keys.getkey(k);\r\n'+
        '}\r\n'+
        'nowait \\hitTo(t) {\r\n'+
        '    return crashTo(t);\r\n'+
        '}\r\n'+
        'nowait \\all(c) {\r\n'+
        '    var res=new TQuery;\r\n'+
        '    $Sprites.sprites.forEach \\(s) {\r\n'+
        '        if (s===this) return;\r\n'+
        '        if (!c || s instanceof c) {\r\n'+
        '            res.push(s);\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    return res;// new TQuery{objects:res};\r\n'+
        '}\r\n'+
        'nowait \\allCrash(t) {\r\n'+
        '    var res=new TQuery;\r\n'+
        '    var sp=this; //_sprite || this;\r\n'+
        '    var t1=getCrashRect();\r\n'+
        '    if (!t1) return res;\r\n'+
        '    $Sprites.sprites.forEach(\\(s) {\r\n'+
        '        var t2;\r\n'+
        '        if (s!==this && \r\n'+
        '        s instanceof t && \r\n'+
        '        (t2=s.getCrashRect()) &&\r\n'+
        '        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\r\n'+
        '        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\r\n'+
        '            res.push(s);    \r\n'+
        '        }\r\n'+
        '    });\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        'nowait \\crashTo(t) {\r\n'+
        '    if (!t) return false;\r\n'+
        '    if (typeof t=="function") {\r\n'+
        '        return allCrash(t)[0];\r\n'+
        '    }\r\n'+
        '    return crashTo1(t);\r\n'+
        '}\r\n'+
        'nowait \\crashTo1(t) {\r\n'+
        '    if (!t || t._isDead) return false;\r\n'+
        '/*if (_sprite && t._sprite) {\r\n'+
        '        return _sprite.crashTo(t._sprite);\r\n'+
        '}*/\r\n'+
        '    var t1=getCrashRect();\r\n'+
        '    var t2=t.getCrashRect();\r\n'+
        '    return \r\n'+
        '    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\r\n'+
        '    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\r\n'+
        '    t1 && t2 &&\r\n'+
        '    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\r\n'+
        '    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\r\n'+
        '}\r\n'+
        'nowait \\getCrashRect() {\r\n'+
        '    var actWidth=width*scaleX, actHeight;\r\n'+
        '    if(typeof scaleY==="undefined"){\r\n'+
        '        actHeight=height*scaleX;\r\n'+
        '    }else{\r\n'+
        '        actHeight=height*scaleY;\r\n'+
        '    }\r\n'+
        '    return typeof x=="number" &&\r\n'+
        '    typeof y=="number" &&\r\n'+
        '    typeof width=="number" &&\r\n'+
        '    typeof height=="number" && \r\n'+
        '    {x,y,width:actWidth,height:actHeight};\r\n'+
        '}\r\n'+
        'nowait \\watchHit(typeA,typeB,onHit) {\r\n'+
        '    $Sprites.watchHit(typeA , typeB, \\(a,b) {\r\n'+
        '        onHit.apply(this,[a,b]);\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'nowait \\currentThreadGroup() {\r\n'+
        '    return $currentThreadGroup; \r\n'+
        '}\r\n'+
        'nowait \\die() {\r\n'+
        '    if (_th) {\r\n'+
        '        _th.kill();\r\n'+
        '    }\r\n'+
        '    hide();\r\n'+
        '    play().stop();\r\n'+
        '    _isDead=true;\r\n'+
        '}\r\n'+
        'nowait \\hide() {\r\n'+
        '/*if (_sprite) {\r\n'+
        '        $Sprites.remove(_sprite);\r\n'+
        '        _sprite=null;\r\n'+
        '} else {*/\r\n'+
        '    $Sprites.remove(this);\r\n'+
        '//}\r\n'+
        '}\r\n'+
        'nowait \\show(x,y,p) {\r\n'+
        '    $Sprites.add(this);\r\n'+
        '    if (x!=null) this.x=x;\r\n'+
        '    if (y!=null) this.y=y;\r\n'+
        '    if (p!=null) this.p=p;\r\n'+
        '}\r\n'+
        '\r\n'+
        'nowait \\rnd(r) {\r\n'+
        '    if (typeof r=="number") {\r\n'+
        '        return Math.floor(Math.random()*r);\r\n'+
        '    }\r\n'+
        '    return Math.random();\r\n'+
        '}\r\n'+
        'nowait \\detectShape() {\r\n'+
        '    if (typeof p!="number") {\r\n'+
        '        if (text!=null) return;\r\n'+
        '        p=0;\r\n'+
        '    }\r\n'+
        '    p=Math.floor(p);\r\n'+
        '    pImg=$Sprites.getImageList()[p];\r\n'+
        '    if (!pImg) return;\r\n'+
        '    width=pImg.width;\r\n'+
        '    height=pImg.height;\r\n'+
        '}\r\n'+
        '\\waitFor(f) {\r\n'+
        '    ifwait {\r\n'+
        '        _thread.waitFor(f);\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        'nowait \\isDead() {\r\n'+
        '    return _isDead;\r\n'+
        '}\r\n'+
        'nowait \\draw(ctx) {\r\n'+
        '    if (x==null || y==null) return;\r\n'+
        '    detectShape();\r\n'+
        '    if (pImg) {\r\n'+
        '        ctx.save();\r\n'+
        '        ctx.translate(x,y);\r\n'+
        '        ctx.rotate(this.rotate/180*Math.PI);\r\n'+
        '        if(typeof this.scaleY==="undefined") {\r\n'+
        '            ctx.scale(this.scaleX,this.scaleX);\r\n'+
        '        }else{\r\n'+
        '            ctx.scale(this.scaleX,this.scaleY);\r\n'+
        '        }\r\n'+
        '        ctx.globalAlpha=this.alpha/255;\r\n'+
        '        ctx.drawImage(\r\n'+
        '        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '        -width/2, -height/2, width, height);\r\n'+
        '        ctx.restore();\r\n'+
        '    } else if (text) {\r\n'+
        '        if (!size) size=15;\r\n'+
        '        if (!align) align="center";\r\n'+
        '        if (!fillStyle) fillStyle="white";\r\n'+
        '        ctx.fillStyle=fillStyle;\r\n'+
        '        var rect=TextRect.draw(ctx, text, x, y, size, align , "fill");\r\n'+
        '        width=rect.w;\r\n'+
        '        height=rect.h;\r\n'+
        '    }\r\n'+
        '    if (_fukidashi) {\r\n'+
        '        if (_fukidashi.c>0) {\r\n'+
        '            _fukidashi.c--;\r\n'+
        '            ctx.fillStyle="white";\r\n'+
        '            ctx.strokeStyle="black";\r\n'+
        '            fukidashi ( ctx , _fukidashi.text, \r\n'+
        '            x, y-height/2-10, _fukidashi.size);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '}\r\n'+
        'nowait \\asyncResult() {\r\n'+
        '    return Tonyu.asyncResult();\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\screenOut(a) {\r\n'+
        '//オブジェクトが画面外に出たかどうかを判定します。\r\n'+
        '    if (!a) a=0;\r\n'+
        '    var r=0;\r\n'+
        '    var viewX=0,viewY=0;\r\n'+
        '    if (x<viewX+a)               r+=viewX+a-x;\r\n'+
        '    if (y<viewY+a)               r+=viewY+a-y;\r\n'+
        '    if (x>$screenWidth +viewX-a) r+=x-($screenWidth +viewX-a);\r\n'+
        '    if (y>$screenHeight+viewY-a) r+=y-($screenHeight+viewY-a);\r\n'+
        '    return r;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\play() {\r\n'+
        '    if (!_mml) _mml=new MML;\r\n'+
        '    if (isDead() || arguments.length==0) return _mml;\r\n'+
        '    var mmls=[];\r\n'+
        '    for (var i=0; i<arguments.length; i++) {\r\n'+
        '        mmls.push(arguments[i]);\r\n'+
        '    }\r\n'+
        '    _mml.play(mmls);\r\n'+
        '    while (_mml.bufferCount()>2) {\r\n'+
        '        update();\r\n'+
        '    }\r\n'+
        '    return _mml;\r\n'+
        '}\r\n'+
        'nowait \\playSE() {\r\n'+
        '    var mml=new MML;\r\n'+
        '    var mmls=[];\r\n'+
        '    for (var i=0; i<arguments.length; i++) {\r\n'+
        '        mmls.push(arguments[i]);\r\n'+
        '    }\r\n'+
        '    mml.play(mmls);\r\n'+
        '    return mml;\r\n'+
        '}'
      ,
      'Boot.tonyu': 
        'native $;\r\n'+
        'native TError;\r\n'+
        'native $LASTPOS;\r\n'+
        'native Key;\r\n'+
        'native Date;\r\n'+
        'native ImageList;\r\n'+
        'native Tonyu;\r\n'+
        'native SplashScreen;\r\n'+
        '\r\n'+
        '\\initSprites() {\r\n'+
        '    $Sprites=new Sprites();\r\n'+
        '    print ("Loading pats..");\r\n'+
        '    var rs=$currentProject.getResource();\r\n'+
        '    var a=asyncResult();\r\n'+
        '    ImageList( rs.images, a.receiver);\r\n'+
        '    waitFor(a);\r\n'+
        '    var r=a[0];\r\n'+
        '    $Sprites.setImageList(r);\r\n'+
        '    for (var name,val in r.names) {\r\n'+
        '        Tonyu.setGlobal(name, val);\r\n'+
        '    }\r\n'+
        '    print ("Loading pats done.");\r\n'+
        '    cvj=$("canvas");\r\n'+
        '    if (Tonyu.noviceMode) {\r\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\r\n'+
        '    } else {\r\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\initCanvasEvents() {\r\n'+
        '    cv=cvj[0];\r\n'+
        '    $handleMouse=\\(e) {\r\n'+
        '        var p=cvj.offset();\r\n'+
        '        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\r\n'+
        '        mp=$Screen.canvas2buf(mp);\r\n'+
        '        $mouseX=mp.x;//e.clientX-p.left;\r\n'+
        '        $mouseY=mp.y;//e.clientY-p.top;\r\n'+
        '    };\r\n'+
        '    $touches=[{},{},{},{},{}];\r\n'+
        '    $touches.findById=\\(id) {\r\n'+
        '        for (var j=0 ; j<$touches.length ; j++) {\r\n'+
        '            if ($touches[j].identifier==id) {\r\n'+
        '                return $touches[j];\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    $handleTouch=\\(e) {\r\n'+
        '        var p=cvj.offset();\r\n'+
        '        e.preventDefault();\r\n'+
        '        var ts=e.originalEvent.changedTouches;\r\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\r\n'+
        '            var src=ts[i];\r\n'+
        '            var dst=$touches.findById(src.identifier);\r\n'+
        '            if (!dst) {\r\n'+
        '                for (var j=0 ; j<$touches.length ; j++) {\r\n'+
        '                    if (!$touches[j].touched) {\r\n'+
        '                        dst=$touches[j];\r\n'+
        '                        dst.identifier=src.identifier;\r\n'+
        '                        break;\r\n'+
        '                    }\r\n'+
        '                }\r\n'+
        '            }\r\n'+
        '            if (dst) {\r\n'+
        '                mp={x:src.pageX-p.left, y:src.pageY-p.top};\r\n'+
        '                mp=$Screen.canvas2buf(mp);\r\n'+
        '                dst.x=mp.x;//src.pageX-p.left;\r\n'+
        '                dst.y=mp.y;//src.pageY-p.top;\r\n'+
        '                dst.touched=true;\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '        $mouseX=$touches[0].x;\r\n'+
        '        $mouseY=$touches[0].y;\r\n'+
        '    };\r\n'+
        '    $handleTouchEnd=\\(e) {\r\n'+
        '        var ts=e.originalEvent.changedTouches;\r\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\r\n'+
        '            var src=ts[i];\r\n'+
        '            var dst=$touches.findById(src.identifier);\r\n'+
        '            if (dst) {\r\n'+
        '                dst.touched=false;\r\n'+
        '                dst.identifier=-1;\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    var handleMouse=\\(e){$handleMouse(e);};\r\n'+
        '    var handleTouch=\\(e){$handleTouch(e);};\r\n'+
        '    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\r\n'+
        '    var d=$.data(cv,"events");\r\n'+
        '    if (!d) {\r\n'+
        '        $.data(cv,"events","true");\r\n'+
        '        cvj.mousedown(handleMouse);\r\n'+
        '        cvj.mousemove(handleMouse);\r\n'+
        '        cvj.on("touchstart",handleTouch);\r\n'+
        '        cvj.on("touchmove",handleTouch);\r\n'+
        '        cvj.on("touchend",handleTouchEnd);\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\initThread() {\r\n'+
        '    thg=Tonyu.threadGroup();\r\n'+
        '    var o=Tonyu.currentProject.getOptions();\r\n'+
        '    var mainClassName=o.run.mainClass;\r\n'+
        '    print("MainClass= "+mainClassName);\r\n'+
        '    mainClass=Tonyu.getClass(mainClassName);\r\n'+
        '    if (!mainClass) {\r\n'+
        '        TError( mainClassName+" というクラスはありません", \r\n'+
        '        "不明" ,0).raise();\r\n'+
        '    }\r\n'+
        '    Tonyu.runMode=true;\r\n'+
        '    $currentThreadGroup=thg;\r\n'+
        '    new mainClass();\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    //print("STOP!!");\r\n'+
        '    for (var k,v in $MMLS) {\r\n'+
        '        v.stop();\r\n'+
        '    }\r\n'+
        '    $WaveTable.stop();\r\n'+
        '}\r\n'+
        'initSprites();\r\n'+
        'initCanvasEvents();\r\n'+
        'initThread();\r\n'+
        '\r\n'+
        '$pat_fruits=30;\r\n'+
        '$Keys=new Keys;\r\n'+
        '$MMLS={};\r\n'+
        '$WaveTable=new WaveTable;\r\n'+
        'if (typeof SplashScreen!="undefined") SplashScreen.hide();\r\n'+
        'while (true) {\r\n'+
        '    ti=new Date().getTime();\r\n'+
        '    thg.steps();\r\n'+
        '    $Keys.update();\r\n'+
        '    $screenWidth=$Screen.width;\r\n'+
        '    $screenHeight=$Screen.height;\r\n'+
        '    $Sprites.draw($Screen.buf[0]);\r\n'+
        '    $Screen.draw();\r\n'+
        '    $Sprites.checkHit();\r\n'+
        '    wt=33-(new Date().getTime()-ti);\r\n'+
        '    if (wt<0) wt=0;\r\n'+
        '    waitFor(Tonyu.timeout(wt));\r\n'+
        '}'
      ,
      'Keys.tonyu': 
        'extends TObject;\r\n'+
        'native String;\r\n'+
        'native $;\r\n'+
        'native document;\r\n'+
        '//\\new () {this.main();}\r\n'+
        'stats={};\r\n'+
        'codes={\r\n'+
        '    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\r\n'+
        '    shift:16, ctrl:17, alt:18, mouseleft: 1\r\n'+
        '};\r\n'+
        'for (var i=65 ; i<65+26; i++) {\r\n'+
        '    codes[String.fromCharCode(i).toLowerCase()]=i;\r\n'+
        '}\r\n'+
        'for (var i=48 ; i<58; i++) {\r\n'+
        '    codes[String.fromCharCode(i)]=i;\r\n'+
        '}\r\n'+
        'if (!$.data(document,"key_event")) {\r\n'+
        '    $.data(document,"key_event",true);\r\n'+
        '    $(document).keydown \\(e) {$Keys.keydown(e);};\r\n'+
        '    $(document).keyup \\(e) {$Keys.keyup(e);};\r\n'+
        '    $(document).mousedown \\(e) {\r\n'+
        '        $Keys.keydown{keyCode:1};\r\n'+
        '    };\r\n'+
        '    $(document).mouseup \\(e) {\r\n'+
        '        $Keys.keyup{keyCode:1};\r\n'+
        '    };\r\n'+
        '}\r\n'+
        'function getkey(code) {\r\n'+
        '    if (typeof code=="string") {\r\n'+
        '        code=codes[code.toLowerCase()];\r\n'+
        '    }\r\n'+
        '    if (!code) return 0;\r\n'+
        '    if (stats[code]==-1) return 0;\r\n'+
        '    if (!stats[code]) stats[code]=0;\r\n'+
        '    return stats[code];\r\n'+
        '}\r\n'+
        'function update() {\r\n'+
        '    for (var i in stats) {\r\n'+
        '        if (stats[i]>0) {stats[i]++;}\r\n'+
        '        if (stats[i]==-1) stats[i]=1;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\keydown(e) {\r\n'+
        '    var s=stats[e.keyCode];\r\n'+
        '    if (!s) {\r\n'+
        '        stats[e.keyCode]=-1;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\keyup(e) {\r\n'+
        '    stats[e.keyCode]=0;\r\n'+
        '}'
      ,
      'Map.tonyu': 
        'native Math;\r\n'+
        'native $;\r\n'+
        '\\new (param){\r\n'+
        '    sx=0;\r\n'+
        '    sy=0;\r\n'+
        '    super(param);\r\n'+
        '    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\r\n'+
        '    mapTable = [];\r\n'+
        '    for(var j=0;j<row;j++){\r\n'+
        '        rows = [];\r\n'+
        '        for(var i=0;i<col;i++){\r\n'+
        '            rows.push(-1);\r\n'+
        '        }\r\n'+
        '        mapTable.push(rows);\r\n'+
        '    }\r\n'+
        '/*for(var i=0;i<col;i++){\r\n'+
        '        mapTable[i]=[];\r\n'+
        '}*/\r\n'+
        '    \r\n'+
        '}\r\n'+
        '\r\n'+
        '\\set(setCol,setRow,p){\r\n'+
        '    if(setCol>col || setRow>row || setCol<0 || setRow<0) return;\r\n'+
        '    mapTable[setRow][setCol]=p;\r\n'+
        '    ctx=buf[0].getContext("2d");\r\n'+
        '    p=Math.floor(p);\r\n'+
        '    pImg=$Sprites.getImageList()[p];\r\n'+
        '    if (!pImg) {\r\n'+
        '        ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\r\n'+
        '        return;\r\n'+
        '    }\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.drawImage(\r\n'+
        '    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\r\n'+
        '    ctx.restore();\r\n'+
        '}\r\n'+
        '\\get(getCol,getRow){\r\n'+
        '    if(getCol>col || getRow>row || getCol<0 || getRow<0) return;\r\n'+
        '    return mapTable[getRow][getCol];\r\n'+
        '}\r\n'+
        '\\getAt(getX,getY){\r\n'+
        '    return get(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\r\n'+
        '}\r\n'+
        '\\scrollTo(scrollX,scrollY){\r\n'+
        '    sx=scrollX;\r\n'+
        '    sy=scrollY;\r\n'+
        '}\r\n'+
        '\\draw(ctx) {\r\n'+
        '    pImg=buf[0];\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.drawImage(\r\n'+
        '    pImg, 0, 0,col*chipWidth, row*chipHeight,\r\n'+
        '    sx, sy, col*chipWidth, row*chipHeight);\r\n'+
        '    ctx.restore();\r\n'+
        '    /*for(var i=0;i<row;i++){\r\n'+
        '        for(var j=0;j<col;j++){\r\n'+
        '            p=Math.floor(get(j,i));\r\n'+
        '            pImg=$Sprites.getImageList()[p];\r\n'+
        '            if (!pImg) return;\r\n'+
        '            ctx.save();\r\n'+
        '            ctx.drawImage(\r\n'+
        '            pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '            j*chipWidth, i*chipHeight, chipWidth, chipHeight);\r\n'+
        '            ctx.restore();\r\n'+
        '            if($screenWidth<j*chipWidth) break;\r\n'+
        '        }\r\n'+
        '        if($screenHeight<i*chipHeight) break;\r\n'+
        '    }*/\r\n'+
        '}\r\n'
      ,
      'MathMod.tonyu': 
        'extends null;\r\n'+
        'native Math;\r\n'+
        '\r\n'+
        '\\sin(d) {\r\n'+
        '    return Math.sin(rad(d));\r\n'+
        '}\r\n'+
        '\\cos(d) {\r\n'+
        '    return Math.cos(rad(d));\r\n'+
        '}\r\n'+
        '\\rad(d) {\r\n'+
        '    return d/180*Math.PI;\r\n'+
        '}\r\n'+
        '\\deg(d) {\r\n'+
        '    return d/Math.PI*180;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\abs(v) {\r\n'+
        '    return Math.abs(v);\r\n'+
        '}\r\n'+
        '\\atan2(x,y) {\r\n'+
        '    return deg(Math.atan2(x,y));\r\n'+
        '}\r\n'+
        '\\floor(x) {\r\n'+
        '    return Math.floor(x);\r\n'+
        '}\r\n'+
        '\\angleDiff(a,b) {\r\n'+
        '    var c;\r\n'+
        '    a=floor(a);\r\n'+
        '    b=floor(b);\r\n'+
        '    if (a>=b) {\r\n'+
        '        c=(a-b) % 360;\r\n'+
        '        if (c>=180) c-=360;\r\n'+
        '    } else {\r\n'+
        '        c=-((b-a) % 360);\r\n'+
        '        if (c<-180) c+=360;\r\n'+
        '    }\r\n'+
        '    return c;\r\n'+
        '}\r\n'+
        '\\sqrt(t) {\r\n'+
        '    return Math.sqrt(t);\r\n'+
        '}\r\n'+
        '\\dist(dx,dy) {\r\n'+
        '    if (typeof dx=="object") {\r\n'+
        '        var t=dx;\r\n'+
        '        dx=t.x-x;dy=t.y-y;\r\n'+
        '    }\r\n'+
        '    return sqrt(dx*dx+dy*dy);\r\n'+
        '}'
      ,
      'MML.tonyu': 
        'extends TObject;\r\n'+
        'native T;\r\n'+
        '\r\n'+
        'mmlBuf=[];\r\n'+
        '\\play(mmls) {\r\n'+
        '    mmlBuf.push(mmls);\r\n'+
        '    if (!isPlaying()) {\r\n'+
        '        playNext();\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\playNext() {\r\n'+
        '    //print("play!", id(), bufferCount());\r\n'+
        '    var mml=mmlBuf.shift();\r\n'+
        '    if (!mml) {\r\n'+
        '        m=null;\r\n'+
        '        return;\r\n'+
        '    }\r\n'+
        '    mwav=$WaveTable.get(0,0).play();\r\n'+
        '    m=T("mml", {mml}, mwav);\r\n'+
        '    m.on("ended", playNext);\r\n'+
        '    m.start();\r\n'+
        '    $MMLS[id()]=this;\r\n'+
        '}\r\n'+
        '\\id() {\r\n'+
        '    if (!_id) _id=rnd()+"";\r\n'+
        '    return _id;\r\n'+
        '}\r\n'+
        '\\bufferCount() {\r\n'+
        '    return mmlBuf.length;\r\n'+
        '}\r\n'+
        '\\isPlaying() {\r\n'+
        '    return m;\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    if (m) {\r\n'+
        '        if (mwav) {\r\n'+
        '            mwav.pause();\r\n'+
        '            mwav.stop();\r\n'+
        '        }\r\n'+
        '        m.pause();\r\n'+
        '        m.stop();\r\n'+
        '        m=null;\r\n'+
        '        mmlBuf=[];\r\n'+
        '        //print("stop!", id(), bufferCount());\r\n'+
        '        delete $MMLS[id()];\r\n'+
        '    }\r\n'+
        '}\r\n'
      ,
      'NoviceActor.tonyu': 
        'extends BaseActor;\r\n'+
        'native Tonyu;\r\n'+
        '\r\n'+
        '\\sleep(n) {\r\n'+
        '    if(!n) n=1;\r\n'+
        '    for(n;n>0;n--) update();\r\n'+
        '}\r\n'+
        '\\initSprite() {\r\n'+
        '    if (!_sprite) {\r\n'+
        '        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\r\n'+
        '        $Sprites.add(this);\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\say(text,size) {\r\n'+
        '    if (!size) size=15;\r\n'+
        '    initSprite();\r\n'+
        '    _sprite._fukidashi={text:text, size:size, c:30};\r\n'+
        '}\r\n'+
        '\\sprite(x,y,p) {\r\n'+
        '    go(x,y,p);\r\n'+
        '}\r\n'+
        '\\show(x,y,p) {\r\n'+
        '    go(x,y,p);\r\n'+
        '}\r\n'+
        'nowait \\draw(ctx) {\r\n'+
        '    _sprite.draw(ctx);\r\n'+
        '}\r\n'+
        '\\getCrashRect() {\r\n'+
        '    return _sprite.getCrashRect();\r\n'+
        '}\r\n'+
        '\\go(x,y,p) {\r\n'+
        '    initSprite();\r\n'+
        '    _sprite.x=x;\r\n'+
        '    _sprite.y=y;\r\n'+
        '    if (p!=null) _sprite.p=p;\r\n'+
        '    //update();\r\n'+
        '}\r\n'+
        '\\change(p) {\r\n'+
        '    initSprite();\r\n'+
        '    _sprite.p=p;\r\n'+
        '}'
      ,
      'ScaledCanvas.tonyu': 
        'native $;\r\n'+
        'native Math;\r\n'+
        '\r\n'+
        '// canvas:phisical  buf: logical\r\n'+
        '\\new (opt) {\r\n'+
        '    extend(opt);\r\n'+
        '    // canvas/ width,height\r\n'+
        '    resize(width, height);\r\n'+
        '    cw=canvas.width();\r\n'+
        '    ch=canvas.height();\r\n'+
        '    cctx=canvas[0].getContext("2d");\r\n'+
        '    this.color="rgb(20,80,180)";\r\n'+
        '}\r\n'+
        '\\resize(width,height) {\r\n'+
        '    this.width=width;\r\n'+
        '    this.height=height;\r\n'+
        '    buf=$("<canvas>").attr{width,height};\r\n'+
        '    ctx=buf[0].getContext("2d");  \r\n'+
        '    $screenWidth=width;\r\n'+
        '    $screenHeight=height;\r\n'+
        '}\r\n'+
        '\\shouldDraw1x1(srcw,srch,dstw,dsth) {\r\n'+
        '    // srcw=465 -> dstw=460...665\r\n'+
        '    var larger=200;\r\n'+
        '    var smaller=5;\r\n'+
        '    return srcw-smaller<=dstw && dstw<=srcw+larger &&\r\n'+
        '    srch-smaller<=dsth && dsth<=srch+larger;\r\n'+
        '}\r\n'+
        '\\draw() {\r\n'+
        '    cw=canvas.width();\r\n'+
        '    ch=canvas.height();\r\n'+
        '    var calcw=ch/height*width; // calch=ch\r\n'+
        '    var calch=cw/width*height; // calcw=cw\r\n'+
        '    if (calch>ch) calch=ch;\r\n'+
        '    if (calcw>cw) calcw=cw;\r\n'+
        '    cctx.clearRect(0,0,cw,ch);\r\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\r\n'+
        '        calcw=width;calch=height;\r\n'+
        '    }\r\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\r\n'+
        '    var marginh=Math.floor((ch-calch)/2);\r\n'+
        '    cctx.drawImage(buf[0],\r\n'+
        '    0,0,width, height, \r\n'+
        '    marginw,marginh,calcw, calch );\r\n'+
        '}\r\n'+
        '\\canvas2buf(point) {\r\n'+
        '    var calcw=ch/height*width; // calch=ch\r\n'+
        '    var calch=cw/width*height; // calcw=cw\r\n'+
        '    if (calch>ch) calch=ch;\r\n'+
        '    if (calcw>cw) calcw=cw;\r\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\r\n'+
        '        calcw=width;calch=height;\r\n'+
        '    }\r\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\r\n'+
        '    var marginh=Math.floor((ch-calch)/2);\r\n'+
        '\r\n'+
        '    return {x: (point.x-marginw)/calcw*width, \r\n'+
        '    y: (point.y-marginh)/calch*height};\r\n'+
        '}\r\n'+
        '\\setBGColor(color){\r\n'+
        '    this.color=color;\r\n'+
        '}'
      ,
      'Sprites.tonyu': 
        'native Tonyu;\r\n'+
        '\\new() {\r\n'+
        '    sprites=[];\r\n'+
        '    imageList=[];\r\n'+
        '    hitWatchers=[];\r\n'+
        '    isDrawGrid=Tonyu.noviceMode;\r\n'+
        '}\r\n'+
        'function add(s) {\r\n'+
        '    if (s.__addedToSprites) return;\r\n'+
        '    sprites.push(s);\r\n'+
        '    s.__addedToSprites=this;\r\n'+
        '    return s;\r\n'+
        '}\r\n'+
        'function remove(s) {\r\n'+
        '    var idx=sprites.indexOf(s);\r\n'+
        '    if (idx<0) return;\r\n'+
        '    sprites.splice(idx,1);\r\n'+
        '    delete s.__addedToSprites;\r\n'+
        '}\r\n'+
        'function clear() {sprites.splice(0,sprites.length);}\r\n'+
        'function draw(cv) {\r\n'+
        '    var ctx=cv.getContext("2d");\r\n'+
        '    ctx.fillStyle=$Screen.color;\r\n'+
        '    ctx.fillRect(0,0,cv.width,cv.height);\r\n'+
        '    if (isDrawGrid) drawGrid(cv);\r\n'+
        '    sprites.forEach(\\(sprite) {\r\n'+
        '        sprite.draw(ctx);\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'function checkHit() {\r\n'+
        '    hitWatchers.forEach(function (w) {\r\n'+
        '        sprites.forEach(function (a) {\r\n'+
        '                //console.log("a:",  a.owner);\r\n'+
        '            var a_owner=a;//a.owner|| a;\r\n'+
        '            if (! (a_owner instanceof w.A)) return;\r\n'+
        '            sprites.forEach(function (b) {\r\n'+
        '                var b_owner=b;//b.owner|| b;\r\n'+
        '                if (a===b) return;\r\n'+
        '                if (! (b_owner instanceof w.B)) return;\r\n'+
        '                //console.log("b:",  b.owner);\r\n'+
        '                if (a.crashTo1(b)) {\r\n'+
        '                    //console.log("hit", a.owner, b.owner);\r\n'+
        '                    w.h(a_owner,b_owner);\r\n'+
        '                }\r\n'+
        '            });\r\n'+
        '        });\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'function watchHit(typeA, typeB, onHit) {\r\n'+
        '    var p={A: typeA, B:typeB, h:onHit};\r\n'+
        '    //console.log(p);\r\n'+
        '    hitWatchers.push(p);\r\n'+
        '}\r\n'+
        'function drawGrid(c) {\r\n'+
        '    var ctx=c.getContext("2d");\r\n'+
        '    ctx.textBaseline="top";\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.strokeStyle="rgb(40,100,200)";\r\n'+
        '    for (var i=0 ; i<c.width ; i+=10) {\r\n'+
        '        ctx.beginPath();\r\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n'+
        '        ctx.moveTo(i,0);\r\n'+
        '        ctx.lineTo(i,c.height);\r\n'+
        '        ctx.closePath();\r\n'+
        '        ctx.stroke();\r\n'+
        '    }\r\n'+
        '\r\n'+
        '    for (var i=0 ; i<c.height ; i+=10) {\r\n'+
        '        ctx.beginPath();\r\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n'+
        '        ctx.moveTo(0,i);\r\n'+
        '        ctx.lineTo(c.width,i);\r\n'+
        '        ctx.closePath();\r\n'+
        '        ctx.stroke();\r\n'+
        '    }\r\n'+
        '    ctx.fillStyle="white";\r\n'+
        '    ctx.font="15px monospaced";\r\n'+
        '    for (var i=100 ; i<c.width ; i+=100) {\r\n'+
        '        ctx.fillText(i, i,0);\r\n'+
        '    }\r\n'+
        '    for (var i=100 ; i<c.height ; i+=100) {\r\n'+
        '        ctx.fillText(i, 0,i);\r\n'+
        '    }\r\n'+
        '    ctx.restore();\r\n'+
        '}\r\n'+
        'function setImageList(il) {\r\n'+
        '    imageList=il;\r\n'+
        '}\r\n'+
        'function getImageList() {\r\n'+
        '    return imageList;\r\n'+
        '}'
      ,
      'TObject.tonyu': 
        'native Tonyu;\r\n'+
        '\\new (options) {\r\n'+
        '    if (typeof options=="object") extend(options);\r\n'+
        '    this.main();\r\n'+
        '}\r\n'+
        'nowait \\extend(obj) {\r\n'+
        '    return Tonyu.extend(this,obj);\r\n'+
        '}'
      ,
      'TQuery.tonyu': 
        'extends TObject;\r\n'+
        '\\new () {\r\n'+
        '    length=0;\r\n'+
        '}\r\n'+
        '\\tonyuIterator(arity) {\r\n'+
        '    var res={};\r\n'+
        '    res.i=0;\r\n'+
        '    if (arity==1) {\r\n'+
        '        res.next=function () {\r\n'+
        '            if (res.i>=this.length) return false;\r\n'+
        '            res[0]=this[res.i];\r\n'+
        '            res.i++;\r\n'+
        '            return true;\r\n'+
        '        };\r\n'+
        '    } else {\r\n'+
        '        res.next=function () {\r\n'+
        '            if (res.i>=this.length) return false;\r\n'+
        '            res[0]=res.i;\r\n'+
        '            res[1]=this[res.i];\r\n'+
        '            res.i++;\r\n'+
        '            return true;\r\n'+
        '        };\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\attr() {\r\n'+
        '    var values;\r\n'+
        '    if (length==0) return;\r\n'+
        '    if (arguments.length==1 && typeof arguments[0]=="string") {\r\n'+
        '        return this[0][arguments[0]];\r\n'+
        '    }\r\n'+
        '    if (arguments.length>=2) {\r\n'+
        '        values={};\r\n'+
        '        for (var i=0 ; i<arguments.length-1 ;i+=2) {\r\n'+
        '            values[arguments[i]]=arguments[i+1];\r\n'+
        '        }\r\n'+
        '    } else {\r\n'+
        '        values=arguments[0];\r\n'+
        '    }\r\n'+
        '    if (values) {\r\n'+
        '        for (var e in this) {\r\n'+
        '            e.extend( values);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\genKeyfunc(key) {\r\n'+
        '    if (typeof key!="function") {\r\n'+
        '        return \\(o) {return o[key];};\r\n'+
        '    } else {\r\n'+
        '        return key;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\max(key) {\r\n'+
        '    var f=genKeyfunc(key);\r\n'+
        '    var res;\r\n'+
        '    for (var o in this) {\r\n'+
        '        var v=f(o);\r\n'+
        '        if (res==null || v>res) res=v;\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\min(key) {\r\n'+
        '    var f=genKeyfunc(key);\r\n'+
        '    var res;\r\n'+
        '    for (var o in this) {\r\n'+
        '        var v=f(o);\r\n'+
        '        if (res==null || v<res) res=v;\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\push(e) {\r\n'+
        '    this[length]=e;\r\n'+
        '    length++;\r\n'+
        '}\r\n'+
        '\\size() {return length;}\r\n'+
        '\\find(f) {\r\n'+
        '    var no=new TQuery;\r\n'+
        '    for (var o in this) {\r\n'+
        '        if (f(o)) no.push(o);\r\n'+
        '    }\r\n'+
        '    return no;\r\n'+
        '} \r\n'+
        '\\apply(name, args) {\r\n'+
        '    var res;\r\n'+
        '    if (!args) args=[];\r\n'+
        '    for (var o in this) {\r\n'+
        '        var f=o[name];\r\n'+
        '        if (typeof f=="function") {\r\n'+
        '            res=f.apply(o, args);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '// \\alive => find \\(o) => !o.isDead()  //  (in future)\r\n'+
        '\\alive() {\r\n'+
        '    return find \\(o) {\r\n'+
        '        return !o.isDead();\r\n'+
        '    };\r\n'+
        '}\r\n'+
        '\\die() {\r\n'+
        '    var a=alive();\r\n'+
        '    if (a.length==0) return false;\r\n'+
        '    a.apply("die");\r\n'+
        '    return true;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\klass(k) {\r\n'+
        '    return find \\(o) { return o instanceof k; };\r\n'+
        '}'
      ,
      'WaveTable.tonyu': 
        'extends TObject;\r\n'+
        'native T;\r\n'+
        '\r\n'+
        'wav={};\r\n'+
        'env={};\r\n'+
        '\\setWav(num, synth) {\r\n'+
        '    wav[num]=synth;\r\n'+
        '}\r\n'+
        '\\setEnv(num, synth) {\r\n'+
        '    env[num]=synth;\r\n'+
        '}\r\n'+
        '\\get(w,e) {\r\n'+
        '    var synth=T("OscGen") {osc:wav[w], env:env[e], mul:0.25};\r\n'+
        '    return synth;\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    /*for (var k,v in tbl) {\r\n'+
        '        v.pause();\r\n'+
        '        v.stop();\r\n'+
        '    }*/\r\n'+
        '}\r\n'+
        '\r\n'+
        'if (typeof T!=="undefined") {\r\n'+
        '    //env=T("adsr", {a:0,d:200,s:0.5,r:10});\r\n'+
        '    env = T("env",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\r\n'+
        '    setEnv(0, env);\r\n'+
        '    setWav(0, T("pulse"));\r\n'+
        '    //    synth=T("OscGen") {wave:"pulse", env, mul:0.25};\r\n'+
        '    //set(0,synth);    \r\n'+
        '}\r\n'
      
    }
  };
  if (WebSite.devMode) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();
requireSimulator.setName('fs/ROMd');
(function () {
  var rom={
    base: '/Tonyu/doc/',
    data: {
      '': '{"index.txt":{"lastUpdate":1397638103410},"novice/":{"lastUpdate":1397637120272},"projectIndex.txt":1397119075000,"tonyu2/":{"lastUpdate":1397638123811}}',
      'index.txt': 
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
        '-[[リファレンス>tonyu2/index]]\n'
      ,
      'novice/': '{"crash.txt":1397119075000,"dec.txt":1397119075000,"firstRun.txt":1397119075000,"getkey.txt":1397119075000,"inc.txt":1397119075000,"index.txt":1397119075000,"item.txt":1397119075000,"key.txt":1397119075000,"left.txt":1397119075000,"new.txt":1397119075000,"newFile.txt":1397119075000,"param.txt":1397119075000,"projectIndex.txt":1397119075000,"say.txt":1397119075000,"say2.txt":1397119075000,"sleep.txt":1397119075000,"sprite.txt":1397119075000,"spriteMove.txt":1397119075000,"toc.json":1397119075000,"trouble1.txt":1397119075000,"true.txt":1397119075000,"udlr.txt":1397119075000,"variable.txt":1397119075000,"variable2.txt":1397119075000,"variable3.txt":1397119075000,"while.txt":1397119075000,"xy.txt":1397119075000}',
      'novice/crash.txt': 
        '*キャラクタの衝突判定をしましょう\r\n'+
        '\r\n'+
        '次に，猫(Cat)がリンゴ(Apple)にぶつかると，リンゴを取る（リンゴが消える）ようにしてみましょう．\r\n'+
        '\r\n'+
        '[[@cfrag watchHit]] という命令を使うと，２つのキャラクタがぶつかったときに，\r\n'+
        '特定の命令を実行することができます．\r\n'+
        '\r\n'+
        '[[@plistref addw]]の[[@editadd]]で示した部分を追加してみましょう．\r\n'+
        '（まだプログラムは実行しないでください）\r\n'+
        '\r\n'+
        '<<code Game addw\r\n'+
        'siro=new Cat;\r\n'+
        'siro.say("いただきまーす");\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        'watchHit(Cat, Apple, hitCatApple);[[@editadd]]\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@cfrag watchHit(Cat, Apple, hitCatApple)]]と書くと，\r\n'+
        '猫（[[@cfrag Cat]]）とリンゴ（[[@cfrag Apple]]）がぶつかったときに，\r\n'+
        '[[@cfrag hitCatApple]] という命令が実行されるようになります．\r\n'+
        '\r\n'+
        'ところで，[[@cfrag hitCatApple]] ってどんな命令でしょうか？\r\n'+
        '実はこの時点ではそんな命令はありません．この命令は自分で作ってあげる必要があります．\r\n'+
        'さらに[[@plistref addf]]のように追加してみましょう．\r\n'+
        '\r\n'+
        '<<code Game addf\r\n'+
        'siro=new Cat;\r\n'+
        'siro.say("いただきまーす");\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        'watchHit(Cat, Apple, hitCatApple);\r\n'+
        'function hitCatApple(cat,apple) {[[@editadd]]\r\n'+
        '    apple.hide();[[@editadd]]\r\n'+
        '}[[@editadd]]\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると，猫とリンゴが触れたときにリンゴが消えるようになります．\r\n'+
        '\r\n'+
        '最後に書いた[[@cfrag function]] で始まる部分は，\r\n'+
        '自分で新しい命令を作るための書き方です．\r\n'+
        'ここでは，[[@cfrag hitCatApple]]という名前の命令を作っています．\r\n'+
        'その後ろにある[[@cfrag (cat, apple)]] という部分は，この命令を実行するに\r\n'+
        'あたって，必要な情報を受け取るためのものです．\r\n'+
        'ここでは，「どのキャラクタと，どのキャラクタがぶつかったか」という情報を受け取り，\r\n'+
        'それぞれに，[[@cfrag cat]] と [[@cfrag apple]] という名前をつけています．\r\n'+
        '\r\n'+
        '[[@cfrag cat]] は，もちろん最初に作った猫ですが，\r\n'+
        'もうひとつの[[@cfrag apple]] は，そのとき猫に触れていたリンゴです．\r\n'+
        'それは[[@cfrag apple1]] かもしれないし，\r\n'+
        '[[@cfrag apple2]] かもしれませんが，とにかく猫が触れていたほうのリンゴに，[[@cfrag apple]]という名前がつけられます．\r\n'+
        '\r\n'+
        'そして，その[[@cfrag apple]] に， [[@cfrag apple.hide()]] という命令を行っています．これは，そのキャラクタ（ここでは[[@cfrag apple]]）を隠す（画面から見えなくする）命令です．\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/dec.txt': 
        '*画像を左方向にも動かしてみましょう\r\n'+
        '\r\n'+
        '今まで，猫の画像は左から右にしか動いていませんでしたが，右から左にも動かすことが\r\n'+
        'できます．\r\n'+
        '\r\n'+
        '<<code Cat dec\r\n'+
        'x=300;\r\n'+
        'while(true) {\r\n'+
        '   go(x,100);sleep();\r\n'+
        '   x-=10;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        'ここに出てきた[[@cfrag x-=10]]は，「xの値を10減らす」という命令です．\r\n'
      ,
      'novice/firstRun.txt': 
        '* プログラムを実行しましょう\r\n'+
        '\r\n'+
        '実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\r\n'+
        '\r\n'+
        '[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\r\n'+
        '\r\n'+
        '[[実行結果>firstRunRes.png]]\r\n'+
        '\r\n'+
        '[[うまくいかないときは>trouble1]]\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/getkey.txt': '[[projectIndex]]',
      'novice/inc.txt': 
        '* 変数の値を増やしてみましょう\r\n'+
        '\r\n'+
        'さて，さきほどのプログラムをもう一度みてみましょう，\r\n'+
        '\r\n'+
        '<<code Cat 50to60\r\n'+
        'x=50;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x=60;\r\n'+
        'go(x,100);sleep();\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\r\n'+
        '[[@cfrag x=60;]]で，xに60覚えさせています．\r\n'+
        '\r\n'+
        'ここでは，\r\n'+
        '「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\r\n'+
        'という書き方を紹介します．\r\n'+
        '\r\n'+
        '<<code Cat 50to60inc\r\n'+
        'x=50;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@cfrag x+=10;]]という書き方が出てきました．これは\r\n'+
        '「今覚えているxの値に，10を足す」という意味です．\r\n'+
        '\r\n'+
        '[[@plistref 50to60inc]]では，\r\n'+
        '[[@cfrag x+=10;]]が実行される時点では，\r\n'+
        'xは50を覚えていますので，\r\n'+
        '[[@cfrag x+=10;]]が実行されると，50に10を足した値である\r\n'+
        '60を新しくxに覚えさせます．結果として，\r\n'+
        '[[@plistref 50to60inc]]は，\r\n'+
        '[[@plistref 50to60]]と同じ結果になります．\r\n'+
        '\r\n'+
        'これを利用して，xを100まで増やしながら，絵を動かしてみましょう．\r\n'+
        '\r\n'+
        '<<code Cat 50to100inc\r\n'+
        'x=50;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        '>>'
      ,
      'novice/index.txt': 
        '\r\n'+
        '\r\n'+
        '* プログラミングを始めましょう\r\n'+
        '\r\n'+
        '- まず，プロジェクトを作ります．\r\n'+
        '-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\r\n'+
        '- プロジェクトの名前を入力してください\r\n'+
        '-- 半角文字で入力します\r\n'+
        '-- ここでは  Hello と入力してみましょう\r\n'+
        '\r\n'
      ,
      'novice/item.txt': 
        '* アイテムを配置しましょう\r\n'+
        '\r\n'+
        '猫を動かして，リンゴのアイテムを取るゲームを作ってみましょう．\r\n'+
        '\r\n'+
        'まず，アイテムのためのプログラムを作成します．\r\n'+
        '\r\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\r\n'+
        '- ファイル名を入力します\r\n'+
        '-- ここでは Apple と入力してみます\r\n'+
        '\r\n'+
        '<<code Apple\r\n'+
        'go(200,150);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@blink 実行>#run]]メニューから，「Appleを実行」選びましょう．\r\n'+
        'すると，今まで通り猫の画像が表示されます．\r\n'+
        '\r\n'+
        'これを，リンゴの画像にしてみましょう．\r\n'+
        '\r\n'+
        '<<code Apple\r\n'+
        'change($pat_fruits);\r\n'+
        'go(200,150);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@cfrag change]]という命令は，画像の絵柄を変える命令です．\r\n'+
        '( ) 内に書くのは，絵柄の名前を指定します．[[@cfrag $pat_fruits]] は，\r\n'+
        '標準に用意されているリンゴの画像データを指します．\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/key.txt': 
        '* キーボードを使って絵を動かしましょう\r\n'+
        '\r\n'+
        'さきほどのプログラムでは，猫が勝手に外にでていってしまうので\r\n'+
        'キーボードを使って好きな方向に動くようにしてみましょう\r\n'+
        '\r\n'+
        '<<code Cat getkey\r\n'+
        'x=50;\r\n'+
        'y=100;\r\n'+
        'while(true) {\r\n'+
        '   k=getkey("right");\r\n'+
        '   if (k>0) {\r\n'+
        '      x+=10;\r\n'+
        '   }\r\n'+
        '   go(x,y);sleep();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行したら，まず，猫のいる画面をクリックしてください．\r\n'+
        'そのあと，右矢印キーを押すと，猫が右に動きます．\r\n'+
        '\r\n'+
        'ここでは，新しく2つの命令が出てきました．\r\n'+
        '\r\n'+
        'まず[[@cfrag getkey]]は，キーが押されているかを判定する命令です．\r\n'+
        '[[@cfrag k=getkey("right"); ]]は，右矢印キーが押されているかを判定し，判定結果を変数kに書き込みます．\r\n'+
        '-もし右矢印キーが押されていなければ，変数kに0を書き込みます．\r\n'+
        '-もし右矢印キーが押されていれば，変数kに0より大きい値を書き込みます（押されている時間が長いほど大きい値になります）．\r\n'+
        '\r\n'+
        'そして， [[@cfrag if]]という命令も登場しました．これは，次のような形式で使います．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'if ([[@arg 条件]]) {\r\n'+
        '  [[@arg 命令]]\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-[[@arg 条件]]が成り立つ（正しい）ときに，  [[@arg 命令]]を実行します．\r\n'+
        '-[[@arg 条件]]が成り立たない（正しくない）ときには，[[@arg 命令]]を実行しません．\r\n'+
        '\r\n'+
        'ここでは，[[@arg 条件]]の部分に[[@cfrag k>0]]，[[@arg 命令]] の部分に[[@cfrag x+=10]] と書いてあります．つまり，\r\n'+
        '\r\n'+
        '-[[@cfrag k>0]]が成り立つ（正しい）ときに，  [[@cfrag x+=10;]]を実行します．\r\n'+
        '-[[@cfrag k>0]]が成り立たない（正しくない）ときには，[[@cfrag x+=10;]]を実行しません．\r\n'+
        '\r\n'+
        '[[@cfrag k>0]]が成り立つのは，右キーが押されているときです．また，[[@cfrag x+=10;]]は，右に移動する命令ですので，次のように動作します\r\n'+
        '\r\n'+
        '-右キーが押されているならば，右に動きます．\r\n'+
        '-右キーが押されていないならば，右に移動しません．\r\n'
      ,
      'novice/left.txt': 
        '*ゲームクリアの判定をしましょう\r\n'+
        '\r\n'+
        'すべてのリンゴを取ったら，猫が「ごちそうさま」といって，\r\n'+
        'ゲームクリアになるようにしましょう．\r\n'+
        '\r\n'+
        'それには，「リンゴがあといくつ残っているか」を数える必要があります．\r\n'+
        'そこで，リンゴの残り数を表す[[@cfrag left]]という変数を用意します．\r\n'+
        'リンゴは2つあるので，2を覚えさせておきます．\r\n'+
        '\r\n'+
        '[[@plistref addl]]の[[@editadd]]の部分を追加しましょう．\r\n'+
        '\r\n'+
        '<<code Game addl\r\n'+
        'siro=new Cat;\r\n'+
        'siro.say("いただきまーす");\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        'watchHit(Cat, Apple, hitCatApple);\r\n'+
        'left=2;[[@editadd]]\r\n'+
        'function hitCatApple(cat,apple) {\r\n'+
        '    apple.hide();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        'さらに，リンゴを取った時に，[[@cfrag left]]の値を減らします．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '変数名--; \r\n'+
        '>>\r\n'+
        'と書くと，変数の値を1減らすことができます．\r\n'+
        '\r\n'+
        '<<code Game(hitCatApple内部のみ) adddec\r\n'+
        'function hitCatApple(cat,apple) {\r\n'+
        '    apple.hide();\r\n'+
        '    left--;[[@editadd]]\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        'さらに，[[@cfrag left]] が0になったときに，猫に「ごちそうさま」というメッセージを表示させます．\r\n'+
        '\r\n'+
        '<<code Game(hitCatApple内部のみ) addif\r\n'+
        'function hitCatApple(cat,apple) {\r\n'+
        '    apple.hide();\r\n'+
        '    left--;\r\n'+
        '    if (left<=0) {[[@editadd]]\r\n'+
        '        cat.say("ごちそうさま");[[@editadd]]\r\n'+
        '    }[[@editadd]]\r\n'+
        '}\r\n'+
        '>>\r\n'
      ,
      'novice/new.txt': 
        '*複数のキャラクタを配置しましょう\r\n'+
        '\r\n'+
        'さて，Appleを実行すると，リンゴが表示されますが，猫は出てこなくなってしまいました．ゲームには，猫とリンゴが同時に出てくる必要があります．\r\n'+
        '\r\n'+
        'そこで「リンゴと猫を置く」ための別のプログラムを作りましょう．\r\n'+
        '\r\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\r\n'+
        '- ファイル名を入力します\r\n'+
        '-- ここでは Game と入力してみます\r\n'+
        '\r\n'+
        'Gameに，次のように入力してみましょう．\r\n'+
        '\r\n'+
        '<<code Game\r\n'+
        'new Cat;\r\n'+
        'new Apple;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@blink 実行>#run]]メニューから，「Gameを実行」選びましょう．\r\n'+
        'すると，猫とリンゴが同じ画面に表示されます．\r\n'+
        '\r\n'+
        'ここで出てきた[[@cfrag new]] という命令は，\r\n'+
        '新しくキャラクタを作るための命令です．\r\n'+
        '\r\n'+
        '次のように，[[@arg プログラム名]]を指定します．\r\n'+
        '新しく出現したキャラクタは，\r\n'+
        '指定された[[@arg プログラム名]]のプログラムを実行します．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'new [[@arg プログラム名]];\r\n'+
        '>>\r\n'+
        '\r\n'+
        'なお，今後はしばらく Game を実行していきますので「実行する」と書いてあったら，\r\n'+
        '[[@blink 実行>#run]]メニューから，「Gameを実行」選ぶようにしてください．\r\n'+
        'F9キーを押すと，前回実行したプログラムと同じプログラムが実行されるので便利です．\r\n'
      ,
      'novice/newFile.txt': 
        '* 新しくファイルを作りましょう\r\n'+
        '\r\n'+
        '- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\r\n'+
        '- ファイル名を入力します\r\n'+
        '-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\r\n'+
        '-- ここでは Cat と入力してみます(後で猫の画像が登場します）\r\n'+
        '\r\n'+
        '* ファイルを編集しましょう\r\n'+
        '\r\n'+
        '- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\r\n'+
        '- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\r\n'+
        '\r\n'+
        '<<code Cat first\r\n'+
        'go(50,100);\r\n'+
        '>>'
      ,
      'novice/param.txt': 
        '*複数のキャラクタを配置しましょう(2)\r\n'+
        '\r\n'+
        '猫とリンゴが表示できたので，\r\n'+
        '今度はリンゴを2つ置いてみましょう．それには，Gameを次のようにすればよさそうですね．\r\n'+
        '\r\n'+
        '<<code Game g1\r\n'+
        'new Cat;\r\n'+
        'new Apple;\r\n'+
        'new Apple;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると... あれ？リンゴは1つしか表示されません．\r\n'+
        '\r\n'+
        'ここで，Appleのプログラムを確認してみましょう．\r\n'+
        '\r\n'+
        '<<code Apple\r\n'+
        'change($pat_fruits);\r\n'+
        'go(200,150);\r\n'+
        '>>\r\n'+
        '\r\n'+
        'Appleでは，リンゴを(200,150)の位置に移動させる，と書いてあります．\r\n'+
        '\r\n'+
        '実は，リンゴは2つできているのですが，どちらも(200,150)という\r\n'+
        'ピッタリ同じ位置に重なっているので\r\n'+
        '１つにしか見えないのです．\r\n'+
        '\r\n'+
        'それでは，2つのリンゴを違う位置に表示させましょう．\r\n'+
        'それには，リンゴの位置が(200,150)ではなく，リンゴごとに変わるようにすればよいでしょう．つまり，200や150という「数」が「変わる」ようにする... そうです「変数」を使えばよいのです．\r\n'+
        '\r\n'+
        'そこで，Appleの[[@cfrag 200]]と[[@cfrag 150]] を，それぞれ変数[[@cfrag x]]と[[@cfrag y]]に置き換えてみましょう．\r\n'+
        '\r\n'+
        '<<code Apple xy1\r\n'+
        'change($pat_fruits);\r\n'+
        'go(x,y);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると... あれ！今度はリンゴが1つも出てきません．\r\n'+
        '\r\n'+
        'なぜかというと，[[@plistref xy1]]の状態では，変数 x や y は何も値を覚えていないため，[[@cfrag go(x,y)]]と命令されても，どこに表示していいかわからないからです．\r\n'+
        '\r\n'+
        'かといって，[[@plistref xy1]]に[[@cfrag x=200]]や[[@cfrag y=150]]などの，変数に値を覚えさせる命令を書くわけにもいきません．なぜなら，xやy の値はリンゴごとに違っていなければならないからです．\r\n'+
        '\r\n'+
        'そこで，ここでは，Appleではなく，Gameのほうでリンゴに具体的なx や y の値を設定させます． \r\n'+
        '\r\n'+
        'まず，Gameを次のように書き換えます．まだ実行はしないでください．\r\n'+
        '\r\n'+
        '<<code Game\r\n'+
        'new Cat;\r\n'+
        'apple1=new Apple;\r\n'+
        'apple2=new Apple;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@plistref g1]]と変わったのは，[[@cfrag new Apple]]の前に，\r\n'+
        '[[@cfrag apple1=]]と[[@cfrag apple2=]]がついたところです．\r\n'+
        '\r\n'+
        '[[@cfrag apple1=new Apple;]]は，新しくできたリンゴのキャラクタに「apple1」という名前をつけています．同様に，2つ目のリンゴのキャラクタに「apple2」という名前をつけています．\r\n'+
        '\r\n'+
        '名前をつけることによって，それらのキャラクタに命令をしたり，キャラクタがもっている変数の値を変更させることができます．\r\n'+
        '\r\n'+
        '<<code Game a1a2\r\n'+
        'new Cat;\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると，今度はちゃんとリンゴが2つ表示されますね．\r\n'+
        '\r\n'+
        '[[@cfrag apple1.x=200;]] という命令は，その1行上で新しく作ったリンゴのキャラクタ，つまりapple1 がもっている x という変数に 200 を覚えさせています．\r\n'+
        '\r\n'+
        '今，「キャラクタがもっている変数」という表現をしましたが，変数は名前が同じでも，キャラクタごとに違う値をもたせる（覚えさせる）ことができます．\r\n'+
        '例えば，[[@plistref a1a2]]では，apple1 の もっている変数xの値は200ですが，apple2 がもっている変数x は300になっています．\r\n'+
        '\r\n'+
        '[[キャラクタごとに変数の値は異なる>apple1apple2.png]]\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/projectIndex.txt': 
        '\r\n'+
        '* 目次\r\n'+
        '\r\n'+
        '<<toc\r\n'+
        '-[[新しくファイルを作りましょう>newFile]]\r\n'+
        '-[[プログラムを実行しましょう>firstRun]]\r\n'+
        '-[[値を変えてみましょう>sprite]]\r\n'+
        '-[[画像を動かしてみましょう>spriteMove]]\r\n'+
        '-[[画像をもっと長い時間動かしてみましょう>variable]]\r\n'+
        '-[[画像をもっと楽に動かしましょう>variable2]]\r\n'+
        '-[[変数の値を変えてみましょう>variable3]]\r\n'+
        '-[[変数の値を増やしてみましょう>inc]]\r\n'+
        '-[[繰り返しを使ってプログラムを短くしましょう>while]]\r\n'+
        '-[[ずっと繰り返すようにしましょう>true]]\r\n'+
        '-[[画像を左方向に動かしてみましょう>dec]]\r\n'+
        '-[[画像を縦や斜めにも動かしてみましょう>xy]]\r\n'+
        '-[[画像をキーボードで動かしましょう>key]]\r\n'+
        '-[[画像をキーボードで上下左右に動かしましょう>udlr]]\r\n'+
        '-[[アイテムを配置しましょう>item]]\r\n'+
        '-[[複数のキャラクタを配置しましょう>new]]\r\n'+
        '-[[複数のキャラクタを配置しましょう(2)>param]]\r\n'+
        '-[[メッセージを表示しましょう>say2]]\r\n'+
        '-[[キャラクタの衝突判定をしましょう>crash]]\r\n'+
        '-[[ゲームクリアの判定をしましょう>left]]\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/say.txt': 
        '[[前へ>sprite]]\r\n'+
        '\r\n'+
        '* メッセージを表示させてみましょう．\r\n'+
        '\r\n'+
        'プログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(50,100);\r\n'+
        'say("こんにちは!!");\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        '注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\r\n'+
        '\r\n'+
        '[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\r\n'+
        '\r\n'+
        '[[次へ>sleep]]'
      ,
      'novice/say2.txt': 
        '* メッセージを表示しましょう．\r\n'+
        '\r\n'+
        'ゲームスタートしたときに，\r\n'+
        '猫に[[@figref itadaki.png]]のようなメッセージを表示させてみましょう．\r\n'+
        '\r\n'+
        '[[メッセージの表示>itadaki.png]]\r\n'+
        '\r\n'+
        '\r\n'+
        'それにはまず，猫に名前をつける必要があります．\r\n'+
        'なんでもかまいませんが，白いので[[@cfrag siro]] と名前をつけましょう．\r\n'+
        '\r\n'+
        '<<code Game\r\n'+
        'siro=new Cat;\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        '>>\r\n'+
        '\r\n'+
        'そして，[[@cfrag siro]]にメッセージを表示させます．\r\n'+
        'メッセージを表示するには，[[@cfrag say]]という命令を使います．\r\n'+
        '\r\n'+
        '<<code Game itadaki\r\n'+
        'siro=new Cat;\r\n'+
        'siro.say("いただきまーす");\r\n'+
        'apple1=new Apple;\r\n'+
        'apple1.x=200;\r\n'+
        'apple1.y=150;\r\n'+
        'apple2=new Apple;\r\n'+
        'apple2.x=300;\r\n'+
        'apple2.y=100;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '命令を実行するとき，実行する相手のキャラクタを指定するときは次の形式を使います．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'キャラクタ名 . 命令名 ( 引数  )\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@plistref itadaki]] では，キャラクタ名は [[@cfrag siro]]，\r\n'+
        ' 命令名は[[@cfrag say]] です．つまり[[@cfrag siro]] に対して，\r\n'+
        '[[@cfrag say]]という命令を行わせています．\r\n'+
        '\r\n'+
        'そして，引数の部分に，表示させるメッセージである[[@cfrag "いただきまーす"]] という文字列（文字が並んだもの）を指定しています．文字列は [[@cfrag "]]で囲む点に注意してください．'
      ,
      'novice/sleep.txt': 
        '[[前へ>say]]\r\n'+
        '\r\n'+
        '*メッセージを順番に表示させてみましょう\r\n'+
        '\r\n'+
        'プログラムは上から順番に実行されます．\r\n'+
        '\r\n'+
        '今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\r\n'+
        '[[@plistref nonsleep]]を入力します．\r\n'+
        '\r\n'+
        '@@@@nonsleep\r\n'+
        'go(50,100);\r\n'+
        'say("こんにちは");\r\n'+
        'say("さようなら");\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        '実行してみましょう.\r\n'+
        '\r\n'+
        '[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\r\n'+
        '\r\n'+
        'あれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\r\n'+
        '\r\n'+
        '実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\r\n'+
        '\r\n'+
        '- 猫の絵を表示する\r\n'+
        '- 「こんにちは」と表示する\r\n'+
        '- 「さようなら」と表示する\r\n'+
        '\r\n'+
        'と実行したのです．しかし，コンピュータはとても高速に動作しているので\r\n'+
        '「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\r\n'+
        'と表示してしまっています．\r\n'+
        '\r\n'+
        'これでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\r\n'+
        '\r\n'+
        '@@@@sleep\r\n'+
        'go(50,100);\r\n'+
        'say("こんにちは");\r\n'+
        'sleep(30); // 追加\r\n'+
        'say("さようなら");\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        '実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\r\n'+
        '\r\n'+
        '[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\r\n'+
        'つまり，プログラムの実行を少し待ってもらいます．\r\n'+
        '後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\r\n'+
        'フレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\r\n'+
        '\r\n'+
        'sleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\r\n'+
        '\r\n'+
        '- 猫の絵を表示する\r\n'+
        '- 「こんにちは」と表示する\r\n'+
        '- 30フレーム（1秒ほど）待つ\r\n'+
        '- 「さようなら」と表示する\r\n'+
        '\r\n'+
        '\r\n'+
        '[[次へ>spriteMove]]'
      ,
      'novice/sprite.txt': 
        '* 値を変えてみましょう\r\n'+
        '\r\n'+
        'プログラムは，命令を実行します．\r\n'+
        'ここでは，go という命令を使って，画面に絵を表示させています．\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(50,100);\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        'ここで， 50 や 100 などの数値を別の数値に変えてみましょう\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(150,100);\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        'もう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\r\n'+
        '\r\n'+
        '画面上の位置を決めるには，2つの数値が必要になります．\r\n'+
        'それは，「横の位置」と「縦の位置」です．\r\n'+
        '-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\r\n'+
        '-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\r\n'+
        '\r\n'+
        '横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\r\n'+
        '\r\n'+
        '(横の位置,縦の位置)\r\n'+
        '\r\n'+
        'という形式であらわします．\r\n'+
        '\r\n'+
        '例えば(50,100) という座標は，次のような位置をあらわします．\r\n'+
        '-画面左端から50ピクセル離れた位置\r\n'+
        '-画面上端から100ピクセル離れた位置\r\n'+
        '\r\n'+
        '[[座標>50_100.png]]\r\n'+
        '\r\n'+
        'いろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\r\n'+
        '\r\n'+
        '[[位置と座標>coords.png]]\r\n'+
        '\r\n'+
        'ここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\r\n'+
        '\r\n'+
        '命令は，次のような形式で書きます．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '命令の名前 ( 引数 , 引数 ...);\r\n'+
        '>>\r\n'+
        '引数（ひきすう）とは，命令を行うときに必要な情報をあらわします．\r\n'+
        '\r\n'+
        '例えば，[[@cfrag go(100,50);]] は [[@cfrag go]]という名前の命令を，\r\n'+
        '100 と 50 という2つの引数（どこに移動するか，という情報）を\r\n'+
        '使って行います．'
      ,
      'novice/spriteMove.txt': 
        '* 画像を動かしてみましょう\r\n'+
        '\r\n'+
        'go 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\r\n'+
        'これを利用して，画像を少しずつ違う位置に動かしていき，\r\n'+
        '猫が動くアニメーションを作ってみましょう．\r\n'+
        '\r\n'+
        '<<code Cat now\r\n'+
        'go(50,100);\r\n'+
        'go(60,100);\r\n'+
        'go(70,100);\r\n'+
        'go(80,100);\r\n'+
        'go(90,100);\r\n'+
        'go(100,100);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると... 猫が動いていないようですね．いきなり(100,100)の\r\n'+
        '位置に表示されたようです．\r\n'+
        '\r\n'+
        '[[[[@plistref now]]の実行結果>noWaitCat.png]]\r\n'+
        '\r\n'+
        '実は，猫はちゃんと(50,100)の位置から始まって，(60,100)  (70,100) \r\n'+
        '(80,100)  (90,100) と少しずつ動きながら\r\n'+
        '(100,100)の位置まで移動したのですが，\r\n'+
        'コンピュータは，とても素早く命令を実行するため，\r\n'+
        '途中の動作が見えなかったのです．\r\n'+
        '\r\n'+
        'そこで，命令の実行を少しゆっくりに実行してもらいます．\r\n'+
        '[[@cfrag sleep]] という命令を使うと，途中で実行を待つことができます．\r\n'+
        '\r\n'+
        '<<code Cat now2\r\n'+
        'go(50,100);sleep();\r\n'+
        'go(60,100);sleep();\r\n'+
        'go(70,100);sleep();\r\n'+
        'go(80,100);sleep();\r\n'+
        'go(90,100);sleep();\r\n'+
        'go(100,100);sleep();\r\n'+
        '>>\r\n'+
        '\r\n'+
        '今度は，猫が少しずつ動く様子が見えると思います．\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'novice/toc.json': '["projectIndex","newFile","firstRun","sprite","spriteMove","variable","variable2","variable3","inc","while","true","dec","xy","key","udlr","item","new","param","say2","crash","left"]',
      'novice/trouble1.txt': 
        'プログラムを書き間違えていると，エラーが表示されます．\r\n'+
        '\r\n'+
        '[[文法エラー>syntaxError.png]]\r\n'+
        '\r\n'+
        '[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\r\n'+
        'セミコロンを追加して，再度実行してください．\r\n'+
        '\r\n'+
        '[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(goo ではなく go ）\r\n'+
        '正しい命令になおしてください．\r\n'+
        '\r\n'+
        '[[命令の名前が違うエラー>runtimeError.png]]\r\n'+
        '\r\n'+
        'なお，命令の名前は大文字と小文字が区別されます．[[@cfrag go]]の代わりに[[@cfrag Go]]と書くことはできません．\r\n'+
        '\r\n'+
        '[[戻る>firstRun]]'
      ,
      'novice/true.txt': 
        '* ずっと繰り返すようにしましょう\r\n'+
        '\r\n'+
        'さきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\r\n'+
        '\r\n'+
        'ゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\r\n'+
        '\r\n'+
        '<<code Cat true\r\n'+
        'x=50;\r\n'+
        'while(true) {\r\n'+
        '   go(x,100);sleep();\r\n'+
        '   x+=10;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\r\n'+
        '\r\n'+
        'もう一度F9を押せば，また同じ動きを見ることができます．\r\n'+
        '\r\n'+
        'while文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．'
      ,
      'novice/udlr.txt': 
        '* 画像をキーボードで上下左右に動かしましょう\r\n'+
        '\r\n'+
        'さきほどのキーボードを使って右に動かす仕組みを使って，\r\n'+
        '画像を上下左右に動かしましょう\r\n'+
        '\r\n'+
        '<<code Cat k\r\n'+
        'x=50;\r\n'+
        'y=100;\r\n'+
        'while(true) {\r\n'+
        '   k=getkey("right");\r\n'+
        '   if (k>0) {\r\n'+
        '      x+=10;\r\n'+
        '   }\r\n'+
        '   k=getkey("left");\r\n'+
        '   if (k>0) {\r\n'+
        '      x-=10;\r\n'+
        '   }\r\n'+
        '   k=getkey("down");\r\n'+
        '   if (k>0) {\r\n'+
        '      y+=10;\r\n'+
        '   }\r\n'+
        '   k=getkey("up");\r\n'+
        '   if (k>0) {\r\n'+
        '      y-=10;\r\n'+
        '   }\r\n'+
        '   go(x,y);sleep();\r\n'+
        '}\r\n'+
        '>>'
      ,
      'novice/variable.txt': 
        '* 画像をもっと長い時間動かしてみましょう\r\n'+
        '\r\n'+
        'さきほどの実行したプログラム([[@plistref 50_100]]は，\r\n'+
        '横の位置を50 から始めて，100まで動かしました．\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(50,100);sleep();\r\n'+
        'go(60,100);sleep();\r\n'+
        'go(70,100);sleep();\r\n'+
        'go(80,100);sleep();\r\n'+
        'go(90,100);sleep();\r\n'+
        'go(100,100);sleep();\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        '今度はもっと遠くまで動かしてみましょう．\r\n'+
        '例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\r\n'+
        'sleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\r\n'+
        '\r\n'+
        '[[300まで動かすプログラム>50_300.png]]\r\n'+
        '\r\n'+
        '実行してみましょう．さっきよりも長く動きますね．\r\n'
      ,
      'novice/variable2.txt': 
        '* 画像をもっと楽に動かしましょう\r\n'+
        '\r\n'+
        'しかし，前のプログラムは書くのが大変です．\r\n'+
        'そこで，もう少し簡単に書くための工夫を行います．\r\n'+
        '\r\n'+
        'さきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(50,100);sleep();\r\n'+
        'go(60,100);sleep();\r\n'+
        'go(70,100);sleep();\r\n'+
        'go(80,100);sleep();\r\n'+
        '// 以下略\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        '\r\n'+
        'ここで，「変数」という仕組みを紹介します．\r\n'+
        '変数とは，文字通り「変わる数」のことです．\r\n'+
        '\r\n'+
        '今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\r\n'+
        'そこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\r\n'+
        '\r\n'+
        'もったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(x,100);\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        'ここで出てきた x が変数です．\r\n'+
        '\r\n'+
        '「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\r\n'+
        '\r\n'+
        'ところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\r\n'+
        '何が入っているのかは，最初に変数を使う前に決めないといけません．\r\n'+
        '\r\n'+
        '次のように[[@cfrag x=50;]]を追加してみましょう．\r\n'+
        '\r\n'+
        '@@@@firstVar\r\n'+
        'x=50;\r\n'+
        'go(x,100);\r\n'+
        '@@@@\r\n'+
        '\r\n'+
        'ここで[[@blink 実行>#run]]してみましょう．\r\n'+
        '[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\r\n'+
        '\r\n'+
        '[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\r\n'+
        '\r\n'+
        '[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\r\n'+
        '\r\n'+
        '@@@@\r\n'+
        'go(x,100);\r\n'+
        '@@@@\r\n'+
        'を実行すると\r\n'+
        '@@@@\r\n'+
        'go(50,100);\r\n'+
        '@@@@\r\n'+
        'を実行したのと同じ結果が得られます．'
      ,
      'novice/variable3.txt': 
        '*変数の値を変えてみましょう．\r\n'+
        '\r\n'+
        'さて，変数を使って，猫を右方向に動かしてみたいと思います．\r\n'+
        '[[@plistref c5060]]のように変更しましょう\r\n'+
        '（動いている様子が見えるように，[[@cfrag sleep();]]も忘れずにつけてください．）\r\n'+
        '\r\n'+
        '<<code Cat c5060\r\n'+
        'x=50;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x=60;\r\n'+
        'go(x,100);sleep();\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\r\n'+
        'つまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\r\n'+
        '\r\n'+
        'そして，xに60を覚えさせています．\r\n'+
        '\r\n'+
        'このとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\r\n'+
        '実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\r\n'+
        '\r\n'+
        'つまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\r\n'+
        '[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\r\n'
      ,
      'novice/while.txt': 
        '* 繰り返しを使ってプログラムを短くしましょう\r\n'+
        '\r\n'+
        'さきほどのプログラムをよく見てみましょう．\r\n'+
        '\r\n'+
        '<<code Cat 50to100inc\r\n'+
        'x=50;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        'go(x,100);sleep();\r\n'+
        '>>\r\n'+
        '\r\n'+
        '最初の[[@cfrag x=50;]]を除いて，あとはずっと\r\n'+
        '\r\n'+
        '<<code \r\n'+
        'go(x,100);sleep();\r\n'+
        'x+=10;\r\n'+
        '>>\r\n'+
        'が繰り返されていることがわかります．\r\n'+
        '\r\n'+
        'このように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\r\n'+
        'と指示することによって，プログラムをもっと短くすることができます．\r\n'+
        '\r\n'+
        '[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\r\n'+
        '\r\n'+
        '<<code Cat firstWhile\r\n'+
        'x=50;\r\n'+
        'while (x<=100) {\r\n'+
        '  go(x,100);sleep();\r\n'+
        '  x+=10;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行してみると，先ほど同じように動きます．\r\n'+
        '\r\n'+
        'ここでは，「while文」という書き方を用いています．これは，次のような形式で使います\r\n'+
        '\r\n'+
        '<<code while文の書式\r\n'+
        'while([[@arg 条件]]) {\r\n'+
        '   [[@arg 動作]]\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\r\n'+
        '- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\r\n'+
        '\r\n'+
        '[[@plistref firstWhile]]の動作は，次のようになります．\r\n'+
        '\r\n'+
        '- [[@cfrag x=50;]] 変数xに50を覚えさせる\r\n'+
        '- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\r\n'+
        '-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\r\n'+
        '-- [[@cfrag x+=10;]] xを10増やす\r\n'+
        '\r\n'+
        'さて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\r\n'+
        '\r\n'+
        '<<code Cat w300\r\n'+
        'x=50;\r\n'+
        'while (x<=300) {\r\n'+
        '  go(x,100);sleep();\r\n'+
        '  x+=10;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\r\n'+
        'つまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\r\n'+
        '\r\n'+
        '以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\r\n'+
        'かなり楽になりました．'
      ,
      'novice/xy.txt': 
        '*画像を縦や斜めにも動かしてみましょう\r\n'+
        '\r\n'+
        '今まで，猫の画像は横にしか動きませんでしたが，縦にも動かすことができます．\r\n'+
        '\r\n'+
        '<<code Cat y\r\n'+
        'y=50;\r\n'+
        'while (true) {\r\n'+
        '  y+=10;\r\n'+
        '  go(100,y);sleep();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行してみると，猫の画像が上から下に移動します．\r\n'+
        '\r\n'+
        'さらに，横と縦に同時に動かすこともできます\r\n'+
        '\r\n'+
        '<<code Cat xy\r\n'+
        'y=50;\r\n'+
        'x=100;\r\n'+
        'while (true) {\r\n'+
        '  y+=10;\r\n'+
        '  x+=10;\r\n'+
        '  go(x,y);sleep();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '実行してみると，猫の画像が左上から右下に斜めに移動します．\r\n'+
        '\r\n'+
        '[[@plistref xy]]のように，\r\n'+
        '変数は同時に2つ使うこともできます．\r\n'+
        '\r\n'+
        '変数を区別するために，それぞれの変数には名前が必要になります．ここでは x と y \r\n'+
        'という名前の変数を使っています．\r\n'+
        '\r\n'+
        '名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．'
      ,
      'projectIndex.txt': '',
      'tonyu2/': '{"$mouseX, $mouseY.txt":{"lastUpdate":1397637145831},"$touches.txt":{"lastUpdate":1397637150059},"Actor.txt":{"lastUpdate":1397637313340},"all.txt":1397119076000,"allCrash.txt":{"lastUpdate":1397637204337},"api.txt":{"lastUpdate":1397637247201},"asyncResult.txt":1397119076000,"BaseActor.txt":1397119075000,"Boot.txt":1397119075000,"classDef.txt":1397119076000,"console.txt":1397119076000,"cpats.txt":1397119076000,"crashTo.txt":1397119076000,"crashTo1.txt":1397119076000,"die.txt":1397119076000,"draw.txt":1397119076000,"extend.txt":1397119076000,"forin.txt":1397119076000,"frame.txt":1397119076000,"fs.txt":1397119076000,"getCrashRect.txt":1397119076000,"getkey.txt":1397119076000,"hide.txt":1397119076000,"ide.txt":1397119076000,"index.txt":{"lastUpdate":1397637218111},"isDead.txt":1397119076000,"kernel.txt":1397119076000,"lang.txt":1397119076000,"MathMod.txt":1397119075000,"options.txt":1397119076000,"play.txt":1397119076000,"playSE.txt":1397119076000,"print.txt":1397119076000,"resize.txt":1397119076000,"rnd.txt":1397119076000,"ScaledCanvas.txt":1397119075000,"setBGColor.txt":1397119076000,"show.txt":1397119076000,"sugar.txt":1397119076000,"super.txt":1397119076000,"TQuery.alive.txt":1397119075000,"TQuery.apply.txt":1397119075000,"TQuery.attr.txt":1397119075000,"TQuery.die.txt":1397119075000,"TQuery.find.txt":1397119075000,"TQuery.minmax.txt":1397119075000,"TQuery.txt":1397119075000,"update.txt":{"lastUpdate":1397637287043},"waitFor.txt":1397119076000,"waitmode.txt":1397119076000,"Map.txt":{"lastUpdate":1397638123810}}',
      'tonyu2/$mouseX, $mouseY.txt': 
        '[[api]]\n'+
        '\n'+
        '*$mouseX/$mouseY\n'+
        '\n'+
        'マウスカーソルまたはタッチパネルの0番目の指のx,y座標を返します．'
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
      'tonyu2/all.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*allメソッド\r\n'+
        '\r\n'+
        '自分以外のすべてのオブジェクト（あるいは，指定されたクラスのオブジェクト）をあらわす[[TQuery]]オブジェクトを取得します．\r\n'+
        '\r\n'+
        '**書式1\r\n'+
        '\r\n'+
        '自分以外のすべてのオブジェクトをあらわすTQueryオブジェクトを返します．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'all()\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@arg Class]]で指定されたクラスのオブジェクト（自分以外）をあらわすTQueryオブジェクトを返します．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'all(Class)\r\n'+
        '>>\r\n'+
        '\r\n'
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
        '\n'+
        '*グローバル変数\n'+
        '\n'+
        '-[[$Screen>ScaledCanvas]]\n'+
        '-[[$mouseX, $mouseY]]\n'+
        '-[[$touches]]\n'
      ,
      'tonyu2/asyncResult.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*asyncResultメソッド\r\n'+
        '\r\n'+
        'AsyncResultオブジェクトを作成します\r\n'+
        '\r\n'+
        'AsyncResultオブジェクトは，ajaxなどの「非同期で実行を行い，結果をコールバック関数で受け取る」形式のメソッド（非同期メソッド）を[[待機可能モード>waitmode]]で扱うためのオブジェクトです．\r\n'+
        '\r\n'+
        '**使い方\r\n'+
        '\r\n'+
        '※必ず待機可能モードで実行してください．\r\n'+
        '\r\n'+
        '-asyncResult()メソッドで，AsyncResultオブジェクトを作成します．これを[[@cfrag a]]とします．\r\n'+
        '-非同期メソッドを呼び出します． このとき，[[@cfrag a.receiver]] をコールバック関数として渡します．\r\n'+
        '-[[waitFor]]メソッドを呼び出します．非同期メソッドが結果を返すまで処理を待機します．\r\n'+
        '-非同期メソッドの結果が[[@cfrag a[n]]]に返されます．[[@cfrag a[n]]]はコールバック関数に渡された第n引数（0が最初の引数）です．\r\n'+
        '\r\n'+
        '**使用例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'native $;\r\n'+
        '//asyncResultオブジェクトを作成\r\n'+
        'a=asyncResult();\r\n'+
        '//jqueryのgetメソッドを呼び出す．コールバック関数に a.receiverを指定\r\n'+
        '$.get("http://tonyuedit.appspot.com/edit/", a.receiver);\r\n'+
        '//getメソッドが終わるまで待つ\r\n'+
        'waitFor(a);\r\n'+
        '//結果がa[0]に返される\r\n'+
        'print(a[0]);\r\n'+
        '>>\r\n'
      ,
      'tonyu2/BaseActor.txt': 
        '[[api]]\r\n'+
        '\r\n'+
        '*BaseActor\r\n'+
        '\r\n'+
        '画面に表示されるオブジェクトの基本クラスです．実際には[[Actor]]を継承してクラスを作成してください．\r\n'+
        '\r\n'+
        '* コンストラクタ(1)\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '\\new(params)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'paramsにはオブジェクトを指定します．paramsの値をフィールドに書き込みます\r\n'+
        '\r\n'+
        '例： \r\n'+
        '<<code\r\n'+
        '// MyActorはBaseActorの子クラスとする\r\n'+
        'a=new MyActor{x:50,y:30, power:20, hp:50};\r\n'+
        '// a.x=50  a.y=30 a.power=20  a.hp=50 となる\r\n'+
        '>>\r\n'+
        '\r\n'+
        '* コンストラクタ(2)\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '\\new(x,y,p)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'x,y,pの値をフィールドに書き込みます\r\n'+
        '\r\n'+
        '* フィールド\r\n'+
        '\r\n'+
        '-x : オブジェクトのx座標をあらわします\r\n'+
        '-y : オブジェクトのy座標をあらわします\r\n'+
        '-p : 表示する[[キャラクタパターン]]の番号をあらわします \r\n'+
        '-text : textに値がセットされると，文字を表示します（キャラクタパターンは表示されなくなります）\r\n'+
        '--size : 文字の大きさをあらわします\r\n'+
        '--fillStyle : 文字の色などをあらわします(JavascriptのCanvasにおけるfillStyleと同じ書式です）\r\n'+
        '--align:  "center" "left" "right"のいずれかを指定します．xの値であらわされる横位置がそれぞれ文字の中央，左端，右端になるように表示します．\r\n'+
        '\r\n'+
        '* メソッド\r\n'+
        '\r\n'+
        '-[[update]]\r\n'+
        '-[[getkey]]\r\n'+
        '-[[crashTo]]\r\n'+
        '-[[crashTo1]]\r\n'+
        '-[[allCrash]]\r\n'+
        '-[[all]]\r\n'+
        '-[[getCrashRect]]\r\n'+
        '-[[die]]\r\n'+
        '-[[isDead]] \r\n'+
        '-[[hide]]\r\n'+
        '-[[show]]\r\n'+
        '-[[rnd]]\r\n'+
        '-[[draw]]\r\n'+
        '-[[extend]]\r\n'+
        '-[[print]]\r\n'+
        '-[[asyncResult]]\r\n'+
        '-[[waitFor]]\r\n'+
        '-[[play]]\r\n'+
        '-[[playSE]]\r\n'+
        '-[[currentThreadGroup]]\r\n'+
        '-[[detectShape]]\r\n'+
        '-[[hitTo]]\r\n'+
        '-[[watchHit]]\r\n'+
        '-[[MathMod]]モジュールクラスがもつメソッド\r\n'
      ,
      'tonyu2/Boot.txt': 
        '[[api]]\r\n'+
        '\r\n'+
        '*Bootクラス\r\n'+
        '\r\n'+
        'プログラム実行時に最初に起動するクラスです．次のような動作を行います．\r\n'+
        'これらの処理は実行時に自動的に行われるので，通常は呼び出す必要はありません．\r\n'+
        '\r\n'+
        '-画面の初期化\r\n'+
        '-マウス・タッチイベントの初期化\r\n'+
        '-[[スレッド]]の初期化\r\n'+
        '-Mainクラスのオブジェクトの配置\r\n'+
        '-メインループ\r\n'+
        '--スレッドの実行\r\n'+
        '--描画\r\n'+
        '\r\n'
      ,
      'tonyu2/classDef.txt': 
        '[[lang]]\r\n'+
        '\r\n'+
        '*クラス定義\r\n'+
        '\r\n'+
        'Tonyu2では，1つの[[ファイル>fs]]に1つのクラスを定義します．\r\n'+
        '\r\n'+
        '-ファイル名は <<クラス名>>.tonyu という形式になります．\r\n'+
        '-- 例えば，Hello.tonyu という名前のファイルは，Hello という名前のクラスを定義します．\r\n'+
        '-クラスを定義するための構文（例えば，Javaの[[@cfrag class クラス名 {...  }]]など）はありません．\r\n'+
        '- ファイルには，次のいずれかを複数記述できます．\r\n'+
        '--継承宣言\r\n'+
        '--組み込み宣言\r\n'+
        '--native宣言\r\n'+
        '--mainメソッドの処理内容\r\n'+
        '--非mainメソッドの定義\r\n'+
        '- 定義された(Tonyu2の)クラスは，Javascriptのいわゆる「クラス」(function+prototypeによるメソッド定義）として機能します．\r\n'+
        '\r\n'+
        '**継承宣言\r\n'+
        '\r\n'+
        'このクラスの親クラスを設定します．ファイルの先頭に次のように宣言します\r\n'+
        '\r\n'+
        '<<code 継承宣言の書式\r\n'+
        'extends 親クラス名;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-継承宣言を省略すると，[[プロジェクト設定>options]]によって設定されている親クラスを自動的に継承します．\r\n'+
        '-親クラス名 に [[@cfrag null]]を設定すると，親クラスがないクラスになります．\r\n'+
        '-継承は，JavaScriptの一般的な継承の方法（このクラスを表す関数オブジェクトのprototypeが，親クラスのオブジェクトになる）で行われます．\r\n'+
        '\r\n'+
        '**組み込み宣言\r\n'+
        '\r\n'+
        'このクラスに組み込むクラス（モジュールクラス）を設定します．ファイルの先頭，または継承宣言続いて次のように宣言します\r\n'+
        '\r\n'+
        '<<code 継承宣言の書式\r\n'+
        'includes モジュールクラス名[, モジュールクラス名...];\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-このクラスでは，組み込んだモジュールクラスがもつメソッドを利用できます．\r\n'+
        '-組み込みは継承とは異なり，複数のクラスを組み込むことができます\r\n'+
        '-モジュールクラスの実体は通常のクラスと同じ方法で作成します．\r\n'+
        '-モジュールクラスが他のモジュールクラスを組み込んでいる場合，組み込んだ先のクラスでもそれらのモジュールクラスのメソッドが組み込まれます．\r\n'+
        '-モジュールクラスが他のクラスを継承していても，組み込んだ先のクラスではその親クラスのメソッドは組み込まれません．\r\n'+
        '-組み込みは，モジュールクラスがもつメソッドの一覧を，このクラスの関数オブジェクトのprototypeオブジェクトに追記する方式で行われます．継承とは異なり，[[@cfrag instanceof]]演算子によって検査されるオブジェクトのクラスが，特定のモジュールクラスを組み込んでいるかどうかは判定できません．\r\n'+
        '\r\n'+
        '**native宣言\r\n'+
        '\r\n'+
        'native宣言は，Tonyu2のプログラムからJavascriptのネイティブオブジェクトにアクセスするために用います．ファイル中で次のように宣言します．\r\n'+
        '\r\n'+
        '<<code native宣言の書式\r\n'+
        'native 変数名;\r\n'+
        '>>\r\n'+
        '\r\n'+
        '- 指定された変数名を，このファイル中ではJavascriptのトップレベルスコープ（一般的にはwindowオブジェクト）に定義されている変数の値として扱います．\r\n'+
        '- 親クラスに書いてあるnative宣言は子クラスには適用されません．必要に応じて子クラスにも同じnative宣言を書く必要があります．\r\n'+
        '\r\n'+
        '**mainメソッドの処理内容\r\n'+
        '\r\n'+
        'mainメソッドは，mainという名前をもつメソッドです．[[Actor]]クラスなどでは，オブジェクトが出現してから停止するまでの動作を記述するのに用いられます．\r\n'+
        '\r\n'+
        'ファイルのトップレベル（メソッド定義に囲まれていない部分）に書かれた文はmainメソッドの内容として定義されます．\r\n'+
        '\r\n'+
        'mainメソッドは引数を受け取ることはできません．\r\n'+
        '\r\n'+
        '**非mainメソッドの定義\r\n'+
        '\r\n'+
        '名前がmainでないメソッドは非mainメソッドです．\r\n'+
        '\r\n'+
        'ファイルのトップレベルにおいて次の形式で定義します．\r\n'+
        '\r\n'+
        '<<code メソッド定義 methodef\r\n'+
        'function メソッド名(引数リスト) {\r\n'+
        '   処理内容\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '※function の代わりに \\ が使用可能です（[[拡張構文>sugar]]参照)\r\n'+
        '\r\n'+
        '*変数の種類\r\n'+
        '\r\n'+
        '-引数\r\n'+
        '--１つのメソッドに渡される値です．メソッド宣言の引数リストに記述されます．１回のメソッド呼び出しが終わると破棄されます．\r\n'+
        '-ローカル変数\r\n'+
        '--メソッド宣言の処理中でvar で宣言されます．１回のメソッド呼び出しが終わると破棄されます．\r\n'+
        '-グローバル変数\r\n'+
        '--名前が$で始まる変数はグローバル変数です．すべてのTonyu2オブジェクトから直接参照できます．\r\n'+
        '--Javascriptからは[[@cfrag Tonyu.globals.グローバル変数名]]で参照できます．\r\n'+
        '-クラス変数\r\n'+
        '--現在のプロジェクトおよび[[標準ライブラリ>api]]で定義されているクラス名と同じ名前の変数はクラス変数です．そのクラスをあらわす関数オブジェクトを参照します．\r\n'+
        '--Javascriptからは[[@cfrag Tonyu.classes.クラス変数名]]で参照できます．\r\n'+
        '-native変数\r\n'+
        '--native宣言によって宣言された名前の変数です．Javascriptのトップレベルスコープにおける同名の変数を参照します．\r\n'+
        '-フィールド\r\n'+
        '--そのクラスのオブジェクトがもつ値です．上のどれにもあてはまらない変数はフィールドとして解釈されます．\r\n'+
        '--Javascriptではいわゆる[[@cfrag this.x]]という形式で参照されるものです．Tonyu2でもこの方式でも参照できます．\r\n'+
        '\r\n'+
        '*例\r\n'+
        '\r\n'+
        '<<code MyClass.tonyu example\r\n'+
        'extends Actor;\r\n'+
        'native alert;\r\n'+
        '// main関数\r\n'+
        'x=3;\r\n'+
        'rate=5;\r\n'+
        'y=mult(x);\r\n'+
        'alert(y); // 15\r\n'+
        '// main関数終わり\r\n'+
        '\\mult(a) {\r\n'+
        '  var res=a*rate;\r\n'+
        '  return res;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-クラス名はMyClass\r\n'+
        '-親クラスはActor\r\n'+
        '-Javascriptの [[@cfrag alert]] 関数を利用する\r\n'+
        '-[[@cfrag x,rate,y]] はフィールド\r\n'+
        '-multメソッドを定義\r\n'+
        '-- [[@cfrag a]]は引数，[[@cfrag res]]はローカル変数，[[@cfrag rate]]はフィールド'
      ,
      'tonyu2/console.txt': 
        '[[print]]\r\n'+
        '\r\n'+
        '*コンソール\r\n'+
        '\r\n'+
        'Tonyu2のコンソールは，JavaScriptのコンソールと同じです．次のキーで表示できます．\r\n'+
        '\r\n'+
        '-Chrome/Firefox: Ctrl+Shift+J\r\n'+
        '-IE: F12\r\n'+
        '\r\n'
      ,
      'tonyu2/cpats.txt': 
        '[[ide]]\r\n'+
        '\r\n'+
        '*画像リスト\r\n'+
        '\r\n'+
        'メニュー階層： ウィンドウ → 画像リスト\r\n'+
        '\r\n'+
        'オブジェクトに用いるキャラクタパターン（画像）を追加します．\r\n'+
        '\r\n'+
        '一番下の「追加」ボタンを押し，各項目を設定します．\r\n'+
        '\r\n'+
        '-名前\r\n'+
        '--この画像につける名前です．名前は$ で始めます．先頭のキャラクタパターンの番号を指す数値が同名の[[グローバル変数]]に入ります．\r\n'+
        '--通常は，URLを指定すると自動的に設定されます．\r\n'+
        '-URL  \r\n'+
        '-- 画像のURLを記述します．はpngまたはgifを指定してください．\r\n'+
        '-- URL欄にローカルの画像ファイルをドラッグ＆ドロップすると，その画像をあらわすURL（Base64エンコーディング）が自動的に設定されます．\r\n'+
        '-パターン解析方法\r\n'+
        '-- Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合はこちらを選びます\r\n'+
        '--- URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」は使えません．\r\n'+
        '--  固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って描かれた画像の場合，こちらを選びます．\r\n'+
        '\r\n'+
        'キャラクタパターンには，それぞれキャラクタパターン番号が割り振られます．\r\n'+
        '変数pにキャラクタパターン番号を代入することでそのキャラクタパターンを表示できます．\r\n'+
        '\r\n'+
        ' 例えば， $pat_chr という名前の画像ファイルの中の，4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\r\n'+
        '<<code\r\n'+
        '    p=$pat_chr + 4; \r\n'+
        '>>\r\n'+
        '    とします．\r\n'+
        '\r\n'+
        '*例\r\n'+
        '\r\n'+
        '※ $pat_ballsという名前の画像が追加されているものとします．\r\n'+
        '<<code\r\n'+
        't=0;\r\n'+
        'while(true) {\r\n'+
        '    if (t%5==0) {\r\n'+
        '        // 新しく作るBall オブジェクトの変数pに，\r\n'+
        '        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\r\n'+
        '        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\r\n'+
        '    }\r\n'+
        '    t++;\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/crashTo.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*crashToメソッド\r\n'+
        '\r\n'+
        '他のオブジェクトと衝突しているかを判定します．\r\n'+
        '\r\n'+
        '**書式1\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'crashTo(obj)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\r\n'+
        '\r\n'+
        '*書式2\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'crashTo(Class)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このオブジェクトが[[@arg Class]]で指定されるクラスのオブジェクトのうちどれかと衝突していれば，そのうちどれか1つのオブジェクトを返します．そうでなければ[[@cfrag null]]を返します\r\n'+
        '\r\n'+
        '*例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '// $playerというオブジェクトにぶつかっていたら，$playerを消します\r\n'+
        'if (crashTo($player)) {\r\n'+
        '   $player.die();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '*参考\r\n'+
        '\r\n'+
        '-[[crashTo1]]\r\n'+
        '-[[allCrash]]\r\n'+
        '-[[getCrashRect]]\r\n'
      ,
      'tonyu2/crashTo1.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*crashTo1メソッド\r\n'+
        '\r\n'+
        '[[crashTo]]メソッドと同様，衝突判定を行います．引数にはオブジェクトのみを指定ことができ，クラスは指定できません．引数の種類判定がない分，[[crashTo]]より若干処理速度が速くなります\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'crashTo1(obj)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このオブジェクトが[[@arg obj]]と衝突していれば[[@cfrag true]]，そうでなければ[[@cfrag false]]を返します．\r\n'
      ,
      'tonyu2/die.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*dieメソッド\r\n'+
        '\r\n'+
        'オブジェクトを画面から消去し，処理を中断します．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'die();\r\n'+
        '>>\r\n'
      ,
      'tonyu2/draw.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*drawメソッド\r\n'+
        '\r\n'+
        'オブジェクトが描画される時に自動的に呼び出されます．ユーザのプログラムからは通常呼び出す必要はありません．\r\n'+
        '\r\n'+
        '*書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'draw(ctx)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'ctxに，描画先のcanvasオブジェクトのコンテキスト(canvas.getContext("2d")で取得)を渡します．\r\n'+
        '\r\n'+
        '*オーバーライド\r\n'+
        '\r\n'+
        'drawメソッドをオーバーライドすると，オブジェクトの表示方法をカスタマイズできます．\r\n'+
        '\r\n'+
        '例\r\n'+
        '<<code\r\n'+
        '\\draw(ctx) {\r\n'+
        '   // 赤い四角形を表示\r\n'+
        '   ctx.fillStyle="red";\r\n'+
        '   ctx.fillRect(x,y,20,20);\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/extend.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*extendメソッド\r\n'+
        '\r\n'+
        'オブジェクトを受け取り，それらの属性値を書き込みます．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '<<code\r\n'+
        'extend(obj)\r\n'+
        '>>\r\n'+
        '[[@arg obj]]（通常はオブジェクトリテラルを用いる）のもつ値をすべて自分自身に書き込みます．\r\n'+
        '\r\n'+
        '\r\n'+
        '**例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'extend{x:5, y:10, score:20};\r\n'+
        '// x=5 y=10 score=20 になる\r\n'+
        'print (x);\r\n'+
        'print (y);\r\n'+
        'print (score);\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/forin.txt': 
        '[[lang]]\r\n'+
        '\r\n'+
        '* for(..in..)の動作\r\n'+
        '\r\n'+
        '[[@cfrag for (e in set)]] はJavaScriptとは動作が異なります．\r\n'+
        '\r\n'+
        '-setが配列または[[TQuery]]オブジェクトの場合，eには（添字ではなく）値を入れながら繰り返します．\r\n'+
        '-setがオブジェクトの場合，eには(キーではなく）値を入れながら繰り返します．\r\n'+
        '\r\n'+
        'また，[[@cfrag for (k,v in set)]]という構文があります． \r\n'+
        '\r\n'+
        '-setがオブジェクトの場合，kにキー，vに値を入れながら繰り返します．\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/frame.txt': 
        '[[update]]\r\n'+
        '\r\n'+
        '*フレーム\r\n'+
        '\r\n'+
        'フレームとは，ゲームの画面1枚が表示されるまでの動作を指します．\r\n'+
        '1つのフレーム（1フレーム）の動作は次の構成されます．\r\n'+
        '\r\n'+
        '-各オブジェクトの移動\r\n'+
        '-各オブジェクトの表示\r\n'+
        '\r\n'+
        'ゲーム全体は，フレームが1秒間に数十回(30～60程度．この数値をfpsと呼びます）動作して進行していきます．\r\n'+
        '\r\n'+
        'Tonyu2では，各オブジェクトに[[スレッド>thread]]が割り当てられており，1フレームごとにスレッドが少しずつ実行されていきます．\r\n'+
        '\r\n'+
        'スレッドの実行中に[[update]]メソッドが呼ばれるとそのフレームでの処理を終了させ，他のオブジェクトのスレッドに動作を譲ります．\r\n'+
        '\r\n'
      ,
      'tonyu2/fs.txt': 
        '[[index]]\r\n'+
        '*ファイルシステム\r\n'+
        '\r\n'+
        '-Tonyu2 は，WebブラウザのJavascriptだけで動作するように設計されています．\r\n'+
        '-プログラムなどを保存・読み出しするために，サーバとの通信は行わず，localStorage を用いています．\r\n'+
        '-localStorageでは，単純なキー/値の格納・読み出しの仕組みだけが提供されていますが，Tonyu2は，localStorage上でディレクトリ構造を再現するためのライブラリ(fs.js)を搭載しています．\r\n'+
        '--詳細は[[fs.js>https://github.com/hoge1e3/Tonyu2/blob/master/js/fs/fs.js]] のプログラムを参照してください．\r\n'+
        '--ファイルを直接操作するための[[シェル>sh]]も用意されています．\r\n'+
        '\r\n'+
        '*注意点\r\n'+
        '\r\n'+
        'プログラムがlocalStorageに保存されるため，他のPCや他のWebブラウザではプログラムは共有されません．\r\n'+
        '\r\n'+
        '今のところ，他のWebブラウザ等とプログラムを送受信するには，[[jsdo.itへのインポート・エクスポート>jsdoit]]を用いてください．\r\n'+
        '\r\n'
      ,
      'tonyu2/getCrashRect.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*getCrashRect\r\n'+
        '\r\n'+
        '当たり判定に使う矩形領域を返します．\r\n'+
        '[[crashTo]]，[[crashTo1]]，[[allCrash]]で用いられます\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'getCrashRect()\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このオブジェクトの当たり判定に使う矩形領域を返します．\r\n'+
        '\r\n'+
        '戻り値を[[@arg r]]とすると：\r\n'+
        '-([[@arg r]].x,[[@arg r]].y)が矩形領域の中心位置です（左上ではありません）\r\n'+
        '-[[@arg r]].widthと[[@arg r]].heightが，矩形領域の幅と高さです．\r\n'+
        '\r\n'+
        '**オーバライド\r\n'+
        '\r\n'+
        'デフォルトのgetCrashRectは，画像の大きさを基準に当たり判定を計算しますが，\r\n'+
        'getCrashRectをオーバーライドすると，当たり判定の大きさを変更できます．\r\n'+
        '\r\n'+
        '[[@plistref chg]]の例では，当たり判定の大きさを5*5に設定しています．\r\n'+
        '\r\n'+
        '<<code ChangeCrashRect.tonyu chg\r\n'+
        '\\getCrashRect() {\r\n'+
        '   return {x,y,width:5, height:5};\r\n'+
        '}\r\n'+
        '>>\r\n'
      ,
      'tonyu2/getkey.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*getkeyメソッド\r\n'+
        '\r\n'+
        'キーの押下状態を取得します．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'getkey(code);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-code に調べたいキーのキーコード（数値）またはキーの名前（文字列）を指定します．\r\n'+
        '-キーの状態に応じて次の数値を返します\r\n'+
        '-- 0: 押されていない\r\n'+
        '-- 1: 押されたばかり\r\n'+
        '-- 2以上:  押しっぱなしになっている（押されて続けているフレーム数）\r\n'+
        '\r\n'+
        '* キーの名前とキーコード一覧\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'left: 37 , up:38 , right: 39, down:40, \r\n'+
        'space:32, enter:13, shift:16, ctrl:17, alt:18, \r\n'+
        'A-Z: 65-90,  0-9: 48-57,  mouseleft: 1\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/hide.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*hideメソッド\r\n'+
        '\r\n'+
        'オブジェクトを非表示にします．\r\n'+
        '[[die]]メソッドと異なり，動作は続きます．再び表示するときは[[show]]メソッドを用います．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'hide();\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/ide.txt': 
        '[[index]]\r\n'+
        '\r\n'+
        '*プロジェクト選択画面(index.html)\r\n'+
        '\r\n'+
        '-「新規」ボタンでプロジェクトを作成します．作成すると自動的にプロジェクト編集画面に移動します．\r\n'+
        '-既存のプロジェクトを選択して，プロジェクト編集画面に移動します．\r\n'+
        '\r\n'+
        '*プロジェクト編集画面(project.html)\r\n'+
        '\r\n'+
        '**メニュー\r\n'+
        '\r\n'+
        '-Home\r\n'+
        '-- プロジェクト選択画面に戻ります．\r\n'+
        '-ファイル\r\n'+
        '-- 新規作成\r\n'+
        '---新しくTonyu2のクラス（=ファイル）を作成します．\r\n'+
        '-- 名前変更\r\n'+
        '---現在開いているクラスの名前を変更します．\r\n'+
        '-- 削除\r\n'+
        '---現在開いているクラスを削除します．\r\n'+
        '--初期状態に戻す\r\n'+
        '---現在開いているプロジェクトが[[サンプルプロジェクト>samples]]の場合，プロジェクトを初期状態に戻します．\r\n'+
        '--このプロジェクト自身を削除\r\n'+
        '--- プロジェクト全体を削除します．\r\n'+
        '\r\n'+
        '-実行\r\n'+
        '-- ～を実行\r\n'+
        '--- 指定されたクラスのオブジェクトを1つ作成し，実行を始めます．\r\n'+
        '--停止\r\n'+
        '--- プログラムを停止させます．\r\n'+
        '-ウィンドウ\r\n'+
        '--[[画像リスト>cpats]]\r\n'+
        '--[[プロジェクト オプション>options]]\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/index.txt': 
        '*Tonyu2 リファレンス\n'+
        '\n'+
        '-[[言語仕様>lang]]\n'+
        '-[[標準ライブラリ>api]]\n'+
        '-[[開発環境>ide]]\n'+
        '-[[ファイルシステム>fs]]\n'+
        '\n'+
        '-[[トップへ>../index]]\n'
      ,
      'tonyu2/isDead.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*isDeadメソッド\r\n'+
        '\r\n'+
        'オブジェクトに[[die]]メソッドが呼ばれたかどうかを返します\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'b=isDead();\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このオブジェクトにdieメソッドが呼ばれていれば，[[@arg b]]に[[@cfrag true]]を，そうでなければ[[@cfrag false]]を返します．\r\n'+
        '\r\n'
      ,
      'tonyu2/kernel.txt': 
        '[[api]]\r\n'+
        '\r\n'+
        '*カーネル\r\n'+
        '\r\n'+
        'Tonyu2の標準ライブラリです．\r\n'+
        '[[ファイルシステム>fs]]上の/Tonyu/Kernel/ で定義されています．'
      ,
      'tonyu2/lang.txt': 
        '[[index]]\r\n'+
        '\r\n'+
        '*言語仕様\r\n'+
        '\r\n'+
        '-Tonyu2は，そのプログラムをJavaScriptに変換してから実行します．\r\n'+
        '-Tonyu2で用いられる値やオブジェクトはJavaScriptの値やオブジェクトそのものです．そのため，Tonyu2からJavaScriptのオブジェクトを操作したり，JavaScriptからTonyu2のオブジェクトを操作したりできます．\r\n'+
        '\r\n'+
        'Tonyu2 の言語仕様は，基本的にはJavaScriptの言語仕様に準じますが，JavaScriptとは次のような違いがあります．\r\n'+
        '\r\n'+
        '-[[ファイル>fs]]全体が１つの[[クラス定義>classDef]]になります．\r\n'+
        '-親クラスのメソッド・コンストラクタ呼び出しは[[super]]を用います\r\n'+
        '-「待機可能モード」「待機不能モード」という2つの[[動作モード>waitmode]]があります．\r\n'+
        '-[[拡張構文>sugar]]があります\r\n'+
        '-[[for (.. in ..)>forin]]の挙動が違います\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/MathMod.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*MathModモジュールクラス\r\n'+
        '\r\n'+
        '数学関数を提供するモジュールクラスです．\r\n'+
        '\r\n'+
        '-sin(d), cos(d)\r\n'+
        '-- 角度d（度数法）の正弦，余弦を返します\r\n'+
        '-rad(d)\r\n'+
        '-- 角度d（度数法）をラジアンに変換します\r\n'+
        '-deg(r)\r\n'+
        '-- 角度r（ラジアン）を度数法に変換します\r\n'+
        '-atan2(x,y)\r\n'+
        '-- 線分(0,0)-(x,y)とx軸のなす角を度数法で返します\r\n'+
        '-abs(v)\r\n'+
        '-- 絶対値 |v| を返します\r\n'+
        '-floor(x)\r\n'+
        '-- xを超えない最大の整数を返します\r\n'+
        '-sqrt(t)\r\n'+
        '-- 平方根 √t を返します\r\n'+
        '-dist(dx,dy)\r\n'+
        '-- 線分(0,0)-(dx,dy)の長さを返します\r\n'+
        '-dist(obj)\r\n'+
        '-- オブジェクト obj とこのオブジェクト間の距離を返します\r\n'+
        '-angleDiff(a,b)\r\n'+
        '-- 角度a-b と同じ向きを持つ、-180 から 179 までの角度を返します．\r\n'+
        '-- angleDiff(a,b)の値が正のとき、a から b に 至るには 左回り（aを減らす)が近く、負のときは右回り(aを増やす) のほうが近くなります．\r\n'+
        '\r\n'
      ,
      'tonyu2/options.txt': 
        '[[ide]]\r\n'+
        '\r\n'+
        '*プロジェクト オプション\r\n'+
        '\r\n'+
        'プロジェクトオプションは，通常は操作する必要はありません．主にTonyu2自身の開発時に設定を変える場合に用います．\r\n'+
        '\r\n'+
        '-デフォルトの親クラス\r\n'+
        '-- [[クラスの定義>classDef]]において， extends を省略したときに継承される親クラスです．通常は[[Actor]]に設定します．\r\n'+
        '-実行\r\n'+
        '-- Mainクラス\r\n'+
        '--- 実行するときに最初に作成されるオブジェクトのクラスです．通常，「実行」メニューで最後に選ばれたクラスになっています．\r\n'+
        '-- Bootクラス\r\n'+
        '--- Mainクラスより前に，プログラム全体の初期化を行うクラスです．通常は[[Boot]]クラスです．ここに別のクラスを指定することで，初期化方法をカスタマイズできます．\r\n'+
        '-Kernelの開発を行う\r\n'+
        '-- 通常，ファイル →  新規 を選び，クラス名を入力したときに，それが[[標準ライブラリ>api]]に存在するクラス名と同名である場合は作成ができません\r\n'+
        '-- このチェックをonにすることで標準ライブラリと同名のクラスを作成できます．さらに，新規作成時に標準ライブラリにある同名のクラスの内容が現在のプロジェクトフォルダにコピーされます．\r\n'+
        '-- 標準ライブラリと同名のクラスの内容を変更することで，標準ライブラリの挙動を変更できます．ただし，変更が有効なのはこのプロジェクトのみです．\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/play.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*playメソッド\r\n'+
        '\r\n'+
        '音楽の演奏または停止を行います．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'play(mml1, mml2, ...)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'mml に，音楽を演奏するための文字列を指定します．\r\n'+
        '書き方は，[[timbre.jsのMML>http://mohayonao.github.io/timbre.js/ja/mml.html]]\r\n'+
        'を参照してください．\r\n'+
        '\r\n'+
        'playメソッドを連続して実行すると，\r\n'+
        '最初に実行したplayメソッドの音楽の演奏が終わってから，\r\n'+
        '次の音楽が演奏されます．．\r\n'+
        '\r\n'+
        '例：\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '// ドレミとミファソの和音を演奏し，それが終わったら\r\n'+
        'play("cde","efg");\r\n'+
        '// ミレドとソファミの和音を演奏する\r\n'+
        'play("edc","gfe");\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**音楽の停止\r\n'+
        '\r\n'+
        '自分が鳴らしている音楽を止めるには次のようにします．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'play().stop()\r\n'+
        '>>\r\n'+
        '\r\n'+
        'あるいは，[[die]]メソッドを呼び出すと停止します．\r\n'+
        '\r\n'+
        '注意：音楽は，それぞれのオブジェクトが独立に鳴らすことができます．\r\n'+
        'そのため，音楽を鳴らしているオブジェクトを指定して止める必要があります．\r\n'+
        '例えば，自分以外のオブジェクト[[@cfrag a]]が演奏中であれば，次のようにします．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'a.play().stop()\r\n'+
        '>>\r\n'+
        'あるいは\r\n'+
        '<<code\r\n'+
        'a.die()\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '**参照\r\n'+
        '\r\n'+
        '[[playSE]]\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/playSE.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*playSEメソッド\r\n'+
        '\r\n'+
        '音楽を演奏しますが，[[play]]メソッドと異なり，演奏が終了するのを待ちません．\r\n'+
        '\r\n'+
        '書式はplayメソッドと同じです．\r\n'+
        '\r\n'+
        '**参照\r\n'+
        '\r\n'+
        '[[play]]メソッド\r\n'
      ,
      'tonyu2/print.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*printメソッド\r\n'+
        '\r\n'+
        '[[コンソール>console]]に値を表示します．(JavaScriptのconsole.logと同じ)\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'print(value...);\r\n'+
        '>>\r\n'+
        'value（複数指定可）の値をコンソールに表示します．\r\n'+
        '\r\n'
      ,
      'tonyu2/resize.txt': 
        '[[ScaledCanvas]]\r\n'+
        '\r\n'+
        '*$Screen.resizeメソッド\r\n'+
        '\r\n'+
        'ゲーム画面のサイズを変更します．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.resize(w,h);\r\n'+
        '>>\r\n'+
        '\r\n'+
        'wとh に画面幅と高さを指定します．\r\n'+
        '\r\n'+
        '\r\n'+
        '*例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.resize(500,300);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '※実際の画面（Canvas）の大きさが変わるのではなく，画面内に表示される仮想画面の大きさが変わります．\r\n'
      ,
      'tonyu2/rnd.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*rndメソッド\r\n'+
        '\r\n'+
        '乱数を返します\r\n'+
        '\r\n'+
        '*書式1\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'rnd()\r\n'+
        '>>\r\n'+
        '\r\n'+
        '0以上1未満の実数乱数を返します\r\n'+
        '\r\n'+
        '*書式2\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'rnd(n)\r\n'+
        '>>\r\n'+
        '\r\n'+
        '0以上n未満の整数乱数を返します\r\n'+
        '\r\n'+
        '*ヒント\r\n'+
        '\r\n'+
        'a以上b未満の実数乱数を返すには，次の式を用います．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'rnd()*(b-a)+a\r\n'+
        '>>\r\n'+
        '\r\n'+
        'a以上b未満の整数乱数を返すには，次の式を用います．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'rnd(b-a)+a\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/ScaledCanvas.txt': 
        '[[api]]\r\n'+
        '\r\n'+
        '*ScaledCanvasクラス\r\n'+
        '\r\n'+
        'ゲーム画面をあらわすオブジェクトです．[[Boot]]クラスで[[@cfrag $Screen]] というオブジェクトで初期化されます．\r\n'+
        '\r\n'+
        '**メソッド\r\n'+
        '\r\n'+
        '-[[resize]]\r\n'+
        '-[[setBGColor]]\r\n'+
        '\r\n'+
        ' '
      ,
      'tonyu2/setBGColor.txt': 
        '[[ScaledCanvas]]\r\n'+
        '\r\n'+
        '*$Screen.setBGColor メソッド\r\n'+
        '\r\n'+
        '画面の背景色を変更します．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.setBGColor(c)\r\n'+
        '>>\r\n'+
        '\r\n'+
        '[[@arg c]]は，画面の背景色をあらわす文字列（HTMLの色指定方法に準ずる）を指定します．\r\n'+
        '\r\n'+
        '**例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.setBGColor("black");\r\n'+
        '>>\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.setBGColor("#ffeedd");\r\n'+
        '>>\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$Screen.setBGColor("rgb(200,100,50)");\r\n'+
        '>>'
      ,
      'tonyu2/show.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*showメソッド\r\n'+
        '\r\n'+
        'オブジェクトを表示します．\r\n'+
        '\r\n'+
        '*書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'show(x,y,p)\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/sugar.txt': 
        '[[lang]]\r\n'+
        '\r\n'+
        '*拡張構文\r\n'+
        '\r\n'+
        '** \\ による関数・メソッド定義\r\n'+
        '\r\n'+
        '-[[@cfrag function]] と書く代わりに [[@cfrag \\]] と書くことができます．[[@plistref fun]]と[[@plistref back]]は等価です．\r\n'+
        '\r\n'+
        '<<code functionでメソッド定義 fun\r\n'+
        'function a(x,y) {\r\n'+
        '   return x+y;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '<<code \\でメソッド定義 back\r\n'+
        '\\a(x,y) {\r\n'+
        '   return x+y;\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '-無名関数にも使えます．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'onComplete=\\(evt) { alert("Complete") };\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**引数渡しにおける()の省略\r\n'+
        '\r\n'+
        '関数・メソッド呼び出し時に，引数がオブジェクトリテラルまたは関数リテラルのみで構成される場合，()を省略できます．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '$("a").attr{target:"_top"};\r\n'+
        '// $("a").attr({target:"_top"}); と等価\r\n'+
        '\r\n'+
        '$("a").click \\(e) { alert("click"); };\r\n'+
        '// $("a").click(\\(e) { alert("click"); }); と等価\r\n'+
        '\r\n'+
        '>>\r\n'+
        '\r\n'+
        'また，通常の引数リスト＋オブジェクトリテラルまたは関数リテラルのみで構成される引数リストを組み合わせて書くこともできます\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'sh.cp("src.txt","dst.txt") {v:true};\r\n'+
        '// sh.cp("src.txt","dst.txt",{v:true}); と等価\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '**オブジェクトリテラルの省略記法\r\n'+
        '\r\n'+
        '[[@cfrag {x:x}]]のように，属性名と値が同じ場合，[[@cfrag {x}]]と記述できます．\r\n'+
        '\r\n'
      ,
      'tonyu2/super.txt': 
        '[[lang]]\r\n'+
        '\r\n'+
        '*super\r\n'+
        '\r\n'+
        '**親クラスのコンストラクタを呼ぶ\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'super(引数)\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**親クラスと子クラスに同じ名前のメソッドがある場合，親クラスのメソッドを呼ぶ\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'super.メソッド名(引数)\r\n'+
        '>>\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.alive.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '* TQuery.alive メソッド\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているActorのうち，生きている（[[die]]メソッドが1回も呼ばれていない）ものだけを格納した新しいTQueryオブジェクトを返します．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.alive()\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**戻り値\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているActorのうち，生きているものだけを格納した新しいTQueryオブジェクト\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.apply.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '*TQuery.applyメソッド\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが指すすべてのActorに対して，指定されたメソッドを呼びます．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.apply(name, args)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'すべてのActorについて，\r\n'+
        '[[@arg name]]で指定されたをメソッドを，配列[[@arg args]]で指定された引数を渡して呼び出します．\r\n'+
        '\r\n'+
        '**戻り値\r\n'+
        '\r\n'+
        '一番最後にメソッドが呼び出されたActorに対するメソッドの戻り値．メソッドが呼ばれたActorがなければ[[@cfrag undefined]]．\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.attr.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '*TQuery.attrメソッド\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているActorについて，フィールドの読み込みまたは書き込みを行います．\r\n'+
        '\r\n'+
        '** 書式1\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.attr(key)\r\n'+
        '>>\r\n'+
        '\r\n'+
        '最初のActor ( [[@cfrag t[0] ]] ) の，[[@arg key]] で指定した名前をもつフィールドの値を読み出します\r\n'+
        '\r\n'+
        '** 書式2\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.attr(key1, value1, key2, value2 ...)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'すべてのActorについて，[[@arg key]] と [[@arg value]]  の組で表されるフィールドを書き込みます．\r\n'+
        '\r\n'+
        '** 書式3\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.attr(obj)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'すべてのActorについて，[[@arg obj]](通常はオブジェクトリテラルで指定)で指定されたオブジェクトの内容をフィールドに書き込みます．\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.die.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '*TQuery.dieメソッド\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているすべての「生きている」Actorに対して，[[die]]メソッドを呼びます．\r\n'+
        '\r\n'+
        '※「生きている」Actorとは，dieメソッドが一度も呼ばれていないActorを指す\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.die()\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**戻り値\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているすべてのActorのうち，少なくとも1つが「生きている」Actorであれば [[@cfrag true]] ，そうでなければ[[@cfrag false]]\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.find.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '*TQuery.find\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているActorのうち，指定された条件に合うものだけを格納した新しいTQueryオブジェクトを返します．\r\n'+
        '\r\n'+
        '**書式\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.find(f)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているActorそれぞれについて，\r\n'+
        '第1引数にそのActorを渡して関数[[@arg f]] を呼び出し，\r\n'+
        '[[@cfrag true]]相当の値が返されたActorだけを格納した新しいTQueryオブジェクト\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/TQuery.minmax.txt': 
        '[[TQuery]]\r\n'+
        '\r\n'+
        '*TQuery.min / TQuery.max メソッド\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているすべてのActorのうち，指定された値の最小（最大）値を返します．\r\n'+
        '\r\n'+
        '** 書式1\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.min(key)\r\n'+
        '>>\r\n'+
        '<<code\r\n'+
        't.max(key)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているすべてのActorにおける，\r\n'+
        '[[@arg key]](文字列)で指定された名前をもつフィールドの値の最小（最大）値\r\n'+
        '\r\n'+
        '** 書式2\r\n'+
        '\r\n'+
        '<<code\r\n'+
        't.min(func)\r\n'+
        '>>\r\n'+
        '<<code\r\n'+
        't.max(func)\r\n'+
        '>>\r\n'+
        '\r\n'+
        'このTQueryオブジェクトが格納しているすべてのActorについて，そえｒぞれ\r\n'+
        'そのActorを第1引数に渡して[[@arg func]](関数)を呼び出した結果の最小（最大）値\r\n'
      ,
      'tonyu2/TQuery.txt': 
        '[[BaseActor]]\r\n'+
        '\r\n'+
        '*TQuery\r\n'+
        '\r\n'+
        '[[all]]メソッド， [[allCrash]]メソッドなどで返されるオブジェクトです．複数の[[Actor]]に対して一斉に動作を行わせることができます．\r\n'+
        '\r\n'+
        '* 要素数・要素へのアクセス\r\n'+
        '\r\n'+
        'TQueryオブジェクトに格納しているActorの個数は[[@cfrag .length]]で取得します．\r\n'+
        '\r\n'+
        '各Actorへは[[@cfrag [添字] ]]でアクセスします．\r\n'+
        '\r\n'+
        '**例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'a=all(Enemy);\r\n'+
        'print("敵の数=", a.length);\r\n'+
        'if (a.length>0) print("最初の敵のx座標",a[0].x);\r\n'+
        '>>\r\n'+
        '\r\n'+
        '* for ... in の使用\r\n'+
        '\r\n'+
        'for ... in を使って各Actorへに同じ処理を一斉に行うことができます．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'for (e in all(Enemy)) {\r\n'+
        '   e.die();\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '* メソッド\r\n'+
        '\r\n'+
        '-[[die>TQuery.die]]\r\n'+
        '-[[alive>TQuery.alive]]\r\n'+
        '-[[attr>TQuery.attr]]\r\n'+
        '-[[find>TQuery.find]]\r\n'+
        '-[[apply>TQuery.apply]]\r\n'+
        '-[[min, max>TQuery.minmax]]\r\n'+
        '\r\n'+
        '\r\n'
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
      'tonyu2/waitFor.txt': 
        '[[asyncResult]]\r\n'+
        '\r\n'+
        '*waitForメソッド\r\n'+
        '\r\n'+
        '使い方は[[asyncResult]]を参照してください．\r\n'
      ,
      'tonyu2/waitmode.txt': 
        '[[lang]]\r\n'+
        '\r\n'+
        '*動作モード\r\n'+
        '\r\n'+
        'Tonyu2には「待機可能モード」と「待機不能モード」という2つの動作モードがあります．\r\n'+
        '\r\n'+
        '** 待機可能モード\r\n'+
        '\r\n'+
        '待機可能モードで動作している間は，[[update]]などの，途中で動作を中断する（つまり，プログラムの動作を待機状態にする）メソッド（これを「待機系メソッド」と呼びます）が呼ばれたときに，一旦処理を中断し，描画や入力状態の更新などの処理を行います．\r\n'+
        '\r\n'+
        '待機可能モードで動作する条件として，次のものがあります\r\n'+
        '\r\n'+
        '-[[Actor]]クラスを継承したオブジェクトでは，mainメソッドは待機可能モードで動作します．\r\n'+
        '--ただし，mainメソッドから呼び出される他のメソッドが待機可能モードで動作しない場合もあります．次の条件を参照してください．\r\n'+
        '-待機可能モードで動作している間に，次のいずれかの形式をもつ文から呼び出されるメソッドは，待機可能モードで動作します．ただし，メソッド名はそのオブジェクト自身がもつメソッドを指しており，それが待機不能メソッド（後述）でない場合に限ります．\r\n'+
        '-- [[@cfrag メソッド名(引数...); ]]\r\n'+
        '-- [[@cfrag 戻り値=メソッド名(引数...); ]]\r\n'+
        '\r\n'+
        '**待機不能モード\r\n'+
        '\r\n'+
        '上で述べた条件にあてはまらない場合，「待機不能モード」で動作します．\r\n'+
        '待機不能モードでは，待機系メソッドが呼ばれても，途中で動作を中断しません．例えば，待機不能モード中にupdateメソッドが呼ばれても，何も動作を行いません．\r\n'+
        '\r\n'+
        '**待機不能メソッド\r\n'+
        '\r\n'+
        '待機可能モードでは，待機不能モードより動作が遅くなることがあります．そこで，待機系メソッドが呼び出されないことが明らかな場合，必ず待機不能モードで動作したほうが効率がよくなります．このようなメソッドを「待機不能メソッド」と呼びます．\r\n'+
        '\r\n'+
        '待機不能メソッドは，メソッドの定義の先頭に[[@cfrag nowait]]キーワードを追加して定義します．\r\n'+
        '\r\n'+
        '<<code\r\n'+
        'nowait \\myNoWaitMethod(arg1,arg2) {\r\n'+
        '\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '**例\r\n'+
        '\r\n'+
        '<<code\r\n'+
        '\r\n'+
        'method1();        //待機可能モードで動作\r\n'+
        'a=method1();      //待機可能モードで動作\r\n'+
        'a=10+method1();   //待機不能モードで動作\r\n'+
        'other.method1();  //待機不能モードで動作\r\n'+
        'method2();        //待機不能モードで動作\r\n'+
        '\r\n'+
        '\\method1() {\r\n'+
        '   for (i=0 ; i<20 ; i++) {\r\n'+
        '      x++;\r\n'+
        '      update(); // 待機可能モードなら，ここで待機する\r\n'+
        '   }\r\n'+
        '   return x;\r\n'+
        '}\r\n'+
        'nowait \\method2() {\r\n'+
        '   for (i=0 ; i<20 ; i++) {\r\n'+
        '      x--;\r\n'+
        '      update(); // ここでは待機しない\r\n'+
        '   }\r\n'+
        '}\r\n'+
        '>>\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'+
        '\r\n'
      ,
      'tonyu2/Map.txt': 
        '[[api]]\n'+
        '\n'+
        '*Mapクラス\n'+
        '\n'+
        'Mapのクラスです。'
      
    }
  };
  if (WebSite.devMode) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();
requireSimulator.setName('fs/ROMs');
(function () {
  var rom={
    base: '/Tonyu/SampleROM/',
    data: {
      '': '{"10_MultiTouch/":{"lastUpdate":1397637120283},"11_Resize/":{"lastUpdate":1397637120284},"12_Sound/":{"lastUpdate":1397637120284},"13_DX/":{"lastUpdate":1397637120284},"1_Animation/":{"lastUpdate":1397637120285},"2_MultipleObj/":{"lastUpdate":1397637120285},"3_NewParam/":{"lastUpdate":1397637120286},"4_getkey/":{"lastUpdate":1397637120286},"5_Chase/":{"lastUpdate":1397637120286},"6_Shot/":{"lastUpdate":1397637120287},"7_Text/":{"lastUpdate":1397637120287},"8_Patterns/":{"lastUpdate":1397637120288},"9_Mouse/":{"lastUpdate":1397637120288}}',
      '10_MultiTouch/': '{".desktop":1397119075000,"Main.tonyu":1397119075000,"options.json":1397119075000,"Touch.tonyu":1397119075000}',
      '10_MultiTouch/.desktop': '{"runMenuOrd":["Main","Touch"]}',
      '10_MultiTouch/Main.tonyu': 
        'new Touch{index:0}; //0番目のタッチ位置を表示するオブジェクト\r\n'+
        'new Touch{index:1}; //1番目のタッチ位置を表示するオブジェクト\r\n'+
        '\r\n'
      ,
      '10_MultiTouch/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '10_MultiTouch/Touch.tonyu': 
        'size=30;\r\n'+
        'while (true) {\r\n'+
        '    // $touchesに，タッチされた場所の座標をあらわすオブジェクト{x,y}\r\n'+
        '    // の配列が入ります．\r\n'+
        '    var t=$touches[index];\r\n'+
        '    if (t.touched) {//index番目の指がタッチされていれば\r\n'+
        '        x=t.x;\r\n'+
        '        y=t.y;\r\n'+
        '        text="touch #"+index;\r\n'+
        '    } else{\r\n'+
        '        text="Not touched";\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '11_Resize/': '{".desktop":1397119075000,"Bounce.tonyu":1397119075000,"Main.tonyu":1397119075000,"options.json":1397119075000}',
      '11_Resize/.desktop': '{"runMenuOrd":["Main","Bounce"]}',
      '11_Resize/Bounce.tonyu': 
        'x=rnd($screenWidth);\r\n'+
        'y=rnd($screenHeight);\r\n'+
        'vx=spd();\r\n'+
        'vy=spd();\r\n'+
        'while (true) {\r\n'+
        '    x+=vx;\r\n'+
        '    y+=vy;\r\n'+
        '    if (x<0) {\r\n'+
        '        x=0;\r\n'+
        '        vx=spd();\r\n'+
        '    }\r\n'+
        '    if (y<0) {\r\n'+
        '        y=0;\r\n'+
        '        vy=spd();\r\n'+
        '    }\r\n'+
        '    if (x>$screenWidth) {\r\n'+
        '        x=$screenWidth;\r\n'+
        '        vx=-spd();\r\n'+
        '    }\r\n'+
        '    if (y>$screenHeight) {\r\n'+
        '        y=$screenHeight;\r\n'+
        '        vy=-spd();\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '\\spd() {\r\n'+
        '    return rnd()*10;\r\n'+
        '}'
      ,
      '11_Resize/Main.tonyu': 
        'for (i=0; i<20 ;i++) {\r\n'+
        '    new Bounce();\r\n'+
        '}\r\n'+
        'text="↑ Portrait   → Landscape";\r\n'+
        'size=20;\r\n'+
        'while (true) {\r\n'+
        '    x=$screenWidth/2;\r\n'+
        '    y=$screenHeight/2;\r\n'+
        '    if (getkey("right")==1) {\r\n'+
        '        // ゲーム画面のサイズを変更（横長）\r\n'+
        '        $Screen.resize(400,300);\r\n'+
        '    }\r\n'+
        '    if (getkey("up")==1) {\r\n'+
        '        // ゲーム画面のサイズを変更（縦長）\r\n'+
        '        $Screen.resize(300,400);\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '11_Resize/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '12_Sound/': '{".desktop":1397119075000,"MMLTest.tonyu":1397119075000,"options.json":1397119075000,"SETest.tonyu":1397119075000}',
      '12_Sound/.desktop': '{"runMenuOrd":["SETest","MMLTest"]}',
      '12_Sound/MMLTest.tonyu': 
        'x=200; y=150;\r\n'+
        'size=40;\r\n'+
        'while (true) {\r\n'+
        '    text="oo";\r\n'+
        '    play("l8cde4",">l8c4ge");\r\n'+
        '    text="^^";\r\n'+
        '    play("l8edc4",">l8e4dc");\r\n'+
        '}'
      ,
      '12_Sound/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"SETest","bootClass":"Boot"},"kernelEditable":false}',
      '12_Sound/SETest.tonyu': 
        'm=new MMLTest;\r\n'+
        '\r\n'+
        'text="Press Space or \'S\'";\r\n'+
        'x=200; y=200;\r\n'+
        'while (true) {\r\n'+
        '    if (getkey(32)==1) {\r\n'+
        '        playSE("l16<ceg");\r\n'+
        '    }\r\n'+
        '    if (getkey("s")==1) {\r\n'+
        '        m.die();\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '13_DX/': '{".desktop":1397119075000,"DX.tonyu":1397119075000,"Main.tonyu":1397119075000,"options.json":1397119075000}',
      '13_DX/.desktop': '{"runMenuOrd":["Main","DX"]}',
      '13_DX/DX.tonyu': 
        '\r\n'+
        'while (true) {\r\n'+
        '    rotate++;\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '13_DX/Main.tonyu': 
        '// scaleX: 拡大率\r\n'+
        '// scaleY: 縦の拡大率（省略するとscaleXと同じ値)\r\n'+
        '// alpha: 透過度\r\n'+
        '// rotate: 回転角度\r\n'+
        'new DX{x:150, y:200, p:2, scaleX:2};\r\n'+
        'new DX{x:50, y:200, p:5, scaleX:2, scaleY:1};\r\n'+
        'new DX{x:200, y:150, p:3, alpha:128,rotate:90};\r\n'+
        '\r\n'+
        '\r\n'
      ,
      '13_DX/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '1_Animation/': '{".desktop":1397119075000,"GoRight.tonyu":1397119075000}',
      '1_Animation/.desktop': '{"runMenuOrd":["GoRight"]}',
      '1_Animation/GoRight.tonyu': 
        '// メニューの実行 → GoRightを実行を選んでください\r\n'+
        '\r\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\r\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\r\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\r\n'+
        'x=100;\r\n'+
        'y=50;\r\n'+
        '// $screenWidth ： 画面幅をあらわします。\r\n'+
        'while (x<$screenWidth) { \r\n'+
        '    x++;\r\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '2_MultipleObj/': '{".desktop":1397119075000,"Bounce.tonyu":1397119075000,"GoRight.tonyu":1397119075000,"Main.tonyu":1397119075000}',
      '2_MultipleObj/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '2_MultipleObj/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        'x=100;\r\n'+
        'y=250;\r\n'+
        '// pに値を設定すると，キャラクタパターンを変更します．\r\n'+
        '// 今のところ，キャラクタパターンは次のもので固定されています．\r\n'+
        '// images/base.png   images/Sample.png\r\n'+
        'p=8;\r\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\r\n'+
        '// $ がついている変数はグローバル変数です。\r\n'+
        'while (x<$screenWidth) {\r\n'+
        '    x+=2;\r\n'+
        '    y+=vy;\r\n'+
        '    vy+=1;\r\n'+
        '    // $screenHeight ： 画面幅をあらわします。\r\n'+
        '    if (y>$screenHeight) {\r\n'+
        '        y=$screenHeight;\r\n'+
        '        vy=-vy;\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '2_MultipleObj/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\r\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\r\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\r\n'+
        'x=100;\r\n'+
        'y=50;\r\n'+
        '// $screenWidth ： 画面幅をあらわします。\r\n'+
        'while (x<$screenWidth) { \r\n'+
        '    x++;\r\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '2_MultipleObj/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        '\r\n'+
        '// new クラス名  でオブジェクトを出現させます。\r\n'+
        'new Bounce;\r\n'+
        'new GoRight;\r\n'+
        '\r\n'+
        '// [!=Tonyu1]new の後ろの() は省略可能です\r\n'+
        '// [!=Tonyu1]appear は不要です\r\n'+
        '// [!=Tonyu1] オブジェクトを画面上で設計する機能は未実装です。'
      ,
      '3_NewParam/': '{".desktop":1397119075000,"Bounce.tonyu":1397119075000,"GoRight.tonyu":1397119075000,"Main.tonyu":1397119075000}',
      '3_NewParam/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '3_NewParam/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\r\n'+
        '//x=100;\r\n'+
        '//y=250;\r\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\r\n'+
        '// $ がついている変数はグローバル変数です。\r\n'+
        'while (x<$screenWidth) {\r\n'+
        '    x+=2;\r\n'+
        '    y+=vy;\r\n'+
        '    vy+=1;\r\n'+
        '    // $screenHeight ： 画面幅をあらわします。\r\n'+
        '    if (y>$screenHeight) {\r\n'+
        '        y=$screenHeight;\r\n'+
        '        vy=-vy;\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '3_NewParam/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\r\n'+
        '//x=100;\r\n'+
        '//y=50;\r\n'+
        '// $screenWidth ： 画面幅をあらわします。\r\n'+
        'while (x<$screenWidth) { \r\n'+
        '    x++;\r\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '3_NewParam/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\r\n'+
        '\r\n'+
        '// new クラス名{パラメタ} で、指定したフィールドの値をもつ\r\n'+
        '// オブジェクトを出現させます。\r\n'+
        'new Bounce{x:100, y:220,p:12};\r\n'+
        'new Bounce{x:200, y:120,p:15};\r\n'+
        'new GoRight{x:50, y:80,p:4};\r\n'+
        '\r\n'+
        '// [!=Tonyu1] 従来通り，x,y,pを渡して初期化する方法も使えますが，\r\n'+
        '// 上の方法が推奨されます\r\n'+
        '//   new Bounce(100,220,12);'
      ,
      '4_getkey/': '{".desktop":1397119075000,"Player.tonyu":1397119075000}',
      '4_getkey/.desktop': '{"runMenuOrd":["Player"]}',
      '4_getkey/Player.tonyu': 
        'x=200;\r\n'+
        'y=200;\r\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\r\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\r\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\r\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\r\n'+
        '    if (getkey("up")) y-=8;\r\n'+
        '    if (getkey("down")) y+=8;\r\n'+
        '    if (getkey("left")) x-=8;\r\n'+
        '    if (getkey("right")) x+=8;\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '5_Chase/': '{".desktop":1397119075000,"Chaser.tonyu":1397119075000,"Main.tonyu":1397119075000,"Player.tonyu":1397119075000}',
      '5_Chase/.desktop': '{"runMenuOrd":["Main","Player","Chaser"]}',
      '5_Chase/Chaser.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\r\n'+
        'while (true) {\r\n'+
        '    if (x<$player.x) x+=2;\r\n'+
        '    if (x>$player.x) x-=2;\r\n'+
        '    if (y<$player.y) y+=2;\r\n'+
        '    if (y>$player.y) y-=2;\r\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\r\n'+
        '    if (crashTo($player)) {\r\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\r\n'+
        '        // そのオブジェクトの処理も停止させます．\r\n'+
        '        $player.die();\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '5_Chase/Main.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\r\n'+
        '$player=new Player;\r\n'+
        'new Chaser{x:20,y:20,p:5};\r\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '5_Chase/Player.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        'x=200;\r\n'+
        'y=200;\r\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\r\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\r\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\r\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\r\n'+
        '    if (getkey("up")) y-=8;\r\n'+
        '    if (getkey("down")) y+=8;\r\n'+
        '    if (getkey("left")) x-=8;\r\n'+
        '    if (getkey("right")) x+=8;\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '6_Shot/': '{".desktop":1397119075000,"Bullet.tonyu":1397119075000,"Chaser.tonyu":1397119075000,"Main.tonyu":1397119075000,"Player.tonyu":1397119075000}',
      '6_Shot/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet"]}',
      '6_Shot/Bullet.tonyu': 
        'while (y>0) {\r\n'+
        '    y-=8;\r\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\r\n'+
        '    // 衝突しているかを判定します．\r\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\r\n'+
        '    c=crashTo(Chaser);\r\n'+
        '    // どのCheseオブジェクトとも衝突していない \r\n'+
        '    //      -> c==undefined\r\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \r\n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\r\n'+
        '    if (c) {\r\n'+
        '        c.die();\r\n'+
        '        die();\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\r\n'+
        'die();\r\n'+
        '\r\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\r\n'+
        '次の書き方もあります.\r\n'+
        '\r\n'+
        'for (var c in allCrash(Chaser)) {\r\n'+
        '  c.die();\r\n'+
        '  die();\r\n'+
        '}\r\n'+
        '*/\r\n'+
        '\r\n'+
        '\r\n'+
        '/*\r\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\r\n'+
        'for (t in $chars) {\r\n'+
        '  if (t is Chaser && crashTo(t)) {\r\n'+
        '     \r\n'+
        '  }\r\n'+
        '}\r\n'+
        '\r\n'+
        '*/'
      ,
      '6_Shot/Chaser.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\r\n'+
        'while (true) {\r\n'+
        '    if (x<$player.x) x+=2;\r\n'+
        '    if (x>$player.x) x-=2;\r\n'+
        '    if (y<$player.y) y+=2;\r\n'+
        '    if (y>$player.y) y-=2;\r\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\r\n'+
        '    if (crashTo($player)) {\r\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\r\n'+
        '        // そのオブジェクトの処理も停止させます．\r\n'+
        '        $player.die();\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '6_Shot/Main.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\r\n'+
        '$player=new Player;\r\n'+
        'new Chaser{x:20,y:20,p:5};\r\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '6_Shot/Player.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        'x=200;\r\n'+
        'y=200;\r\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\r\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\r\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\r\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\r\n'+
        '    if (getkey("up")) y-=8;\r\n'+
        '    if (getkey("down")) y+=8;\r\n'+
        '    if (getkey("left")) x-=8;\r\n'+
        '    if (getkey("right")) x+=8;\r\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\r\n'+
        '    // (押しっぱなしでは撃てないようにする)\r\n'+
        '    if (getkey("space")==1) {\r\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\r\n'+
        '        new Bullet{x,y};\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '7_Text/': '{".desktop":1397119075000,"Bullet.tonyu":1397119075000,"Chaser.tonyu":1397119075000,"Main.tonyu":1397119075000,"Player.tonyu":1397119075000,"Status.tonyu":1397119075000}',
      '7_Text/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet","Status"]}',
      '7_Text/Bullet.tonyu': 
        'while (y>0) {\r\n'+
        '    y-=8;\r\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\r\n'+
        '    // 衝突しているかを判定します．\r\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\r\n'+
        '    c=crashTo(Chaser);\r\n'+
        '    // どのCheseオブジェクトとも衝突していない \r\n'+
        '    //      -> c==undefined\r\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \r\n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\r\n'+
        '    if (c) {\r\n'+
        '        c.die();\r\n'+
        '        die();\r\n'+
        '        $score+=10;\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\r\n'+
        'die();\r\n'+
        '\r\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\r\n'+
        '次の書き方もあります.\r\n'+
        '\r\n'+
        'for (var c in allCrash(Chaser)) {\r\n'+
        '  c.die();\r\n'+
        '  die();\r\n'+
        '}\r\n'+
        '*/\r\n'+
        '\r\n'+
        '\r\n'+
        '/*\r\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\r\n'+
        'for (t in $chars) {\r\n'+
        '  if (t is Chaser && crashTo(t)) {\r\n'+
        '     \r\n'+
        '  }\r\n'+
        '}\r\n'+
        '\r\n'+
        '*/'
      ,
      '7_Text/Chaser.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\r\n'+
        'while (true) {\r\n'+
        '    if (x<$player.x) x+=2;\r\n'+
        '    if (x>$player.x) x-=2;\r\n'+
        '    if (y<$player.y) y+=2;\r\n'+
        '    if (y>$player.y) y-=2;\r\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\r\n'+
        '    if (crashTo($player)) {\r\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\r\n'+
        '        // そのオブジェクトの処理も停止させます．\r\n'+
        '        $player.die();\r\n'+
        '        \r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '7_Text/Main.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\r\n'+
        '$score=0;\r\n'+
        '$player=new Player;\r\n'+
        'new Chaser{x:20,y:20,p:5};\r\n'+
        'new Chaser{x:300,y:250,p:5};\r\n'+
        'new Status;\r\n'
      ,
      '7_Text/Player.tonyu': 
        '// 実行 → Mainを実行\r\n'+
        '\r\n'+
        'x=200;\r\n'+
        'y=200;\r\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\r\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\r\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\r\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\r\n'+
        '    if (getkey("up")) y-=8;\r\n'+
        '    if (getkey("down")) y+=8;\r\n'+
        '    if (getkey("left")) x-=8;\r\n'+
        '    if (getkey("right")) x+=8;\r\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\r\n'+
        '    // (押しっぱなしでは撃てないようにする)\r\n'+
        '    if (getkey("space")==1) {\r\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\r\n'+
        '        new Bullet{x,y};\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '7_Text/Status.tonyu': 
        '// 変数textに値を設定すると，テキストを表示するオブジェクトになります．\r\n'+
        'text="Score:";\r\n'+
        'fillStyle="white";\r\n'+
        'size=40;\r\n'+
        'align="center";\r\n'+
        'x=$screenWidth/2;\r\n'+
        'y=$screenHeight/2;\r\n'+
        'while (!$player.isDead()) {\r\n'+
        '    text="Score:"+$score;\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        'text="Game Over";\r\n'
      ,
      '8_Patterns/': '{".desktop":1397119075000,"Ball.tonyu":1397119075000,"Main.tonyu":1397119075000,"res.json":1397119075000}',
      '8_Patterns/.desktop': '{"runMenuOrd":["Main","Ball"]}',
      '8_Patterns/Ball.tonyu': 
        '// 実行-> Main を実行\r\n'+
        'while (y<$screenHeight) {\r\n'+
        '    y+=3;\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        'die();\r\n'
      ,
      '8_Patterns/Main.tonyu': 
        '// 実行-> Main を実行\r\n'+
        '/* ウィンドウ → 画像リストから オブジェクトに用いるキャラクタパターン\r\n'+
        '     を追加できます．\r\n'+
        '   画像はpngまたはgifを指定してください．\r\n'+
        '   \r\n'+
        '  「パターン解析方法」は次の中から選びます\r\n'+
        '    Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合は\r\n'+
        '                           こちらを選びます．※\r\n'+
        '    固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って\r\n'+
        '                   描かれた画像の場合，こちらを選びます．\r\n'+
        '  「URL」欄には，URLを書くか，ローカルファイルをドラッグ＆ドロップします\r\n'+
        '    ※： URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」\r\n'+
        '         は使えません．\r\n'+
        '         \r\n'+
        '    これらの画像は，変数pに値を代入することで使えます．\r\n'+
        '    例えば， $pat_chr という名前の画像ファイルの中の，\r\n'+
        '    4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\r\n'+
        '    p=$pat_chr + 4; \r\n'+
        '    とします．\r\n'+
        '*/\r\n'+
        't=0;\r\n'+
        'while(true) {\r\n'+
        '    if (t%5==0) {\r\n'+
        '        // 新しく作るBall オブジェクトの変数pに，\r\n'+
        '        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\r\n'+
        '        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\r\n'+
        '    }\r\n'+
        '    t++;\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '8_Patterns/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_balls","url":"data:image/png;base64,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"}],"sounds":[]}',
      '9_Mouse/': '{".desktop":1397119075000,"MouseChaser.tonyu":1397119075000,"options.json":1397119075000}',
      '9_Mouse/.desktop': '{"runMenuOrd":["MouseChaser"]}',
      '9_Mouse/MouseChaser.tonyu': 
        'while(true) {\r\n'+
        '    x=$mouseX;\r\n'+
        '    y=$mouseY;\r\n'+
        '    update();\r\n'+
        '}'
      ,
      '9_Mouse/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"MouseChaser","bootClass":"Boot"},"kernelEditable":false}'
    }
  };
  if (WebSite.devMode) {
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
requireSimulator.setName('Wiki');
Wiki=function (placeHolder, home, options, plugins) {
    var W={};
    var refers={figures:"図", plists: "リスト"};
    var SEQ="__seq__";
    var LINEMARK="marker_"+Math.floor(Math.random()*100000);
    var on={};
    var history=[];
    var EXT=".txt";
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
                                $("<div>").append(  $("<img>").attr("src", WebSite.top+"doc/images/"+name) )
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
                    		if (!f.exists() && f.isReadOnly()) {
                    			a=$("<span>").text(caption);
                    		} else {
                    			a=$("<span>").addClass("clickable").text(caption).click(function () {
                    				W.show(f);
                    			});
                    			if (!f.exists()) a.addClass("notexist");
                    		}
                    	}
                    }
                }
                $h.p(a);
            }
        }
    };
    W.resolveFile=function (name) {
        var f;
        if (name.isDir) f=name;
        else f=cwd.rel(name+EXT);
        return f;
    };
    W.show=function (nameOrFile) {
    	var f=W.resolveFile(nameOrFile);
    	W.cd(f.up());
		var fn=f.truncExt(EXT);
    	if (!f.exists() && !f.isReadOnly()) {
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
    Shell.grep=function (pattern, file, options) {
    	file=resolve(file, true);
    	if (!options) options={};
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
    	function report(file, lineNo, line) {
			if (options.res) {
				options.res.push({file:file, lineNo:lineNo,line:line});
			} else {
				console.log(file+"("+lineNo+"): "+line);
			}
    	}
    };
    Shell.touch=function (f) {
    	f=resolve(f);
    	f.text(f.exists() ? f.text() : "");
    	return 1;
    };
    sh=Shell;
    return Shell;
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
            if (typeof a[i]=="object" && !(a[i] instanceof Array) ) {
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
        			 ["input",{$edit:"name"}]],
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
requireSimulator.setName('ide/selProject');
requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki","Shell","copySample","NewProjectDialog","UI"],
  function (romk, romd, roms,           FS, Wiki,   sh,      copySample,  NPD,           UI) {
$(function () {
    copySample();
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNumberedName).forEach(function (name) {
            var f=curDir.rel(name);
            UI("li", {"class":"file"}, ["a", {href:"project.html?dir="+f.path()}, name]).appendTo("#prjItemList");
            //$("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    	/*
        var n=prompt("新しいプロジェクトの名前","");
        if (!n) return;
        n+="/";
        var prjDir=projects.rel(n);
        prjDir.mkdir();
        document.location.href="project.html?dir="+prjDir.path();
        */
    });
    ls();
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    w.show("index");
    SplashScreen.hide();
});
});

requireSimulator.setName();
