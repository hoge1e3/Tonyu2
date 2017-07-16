// Created at Sun Jul 16 2017 16:16:46 GMT+0900 (東京 (標準時))
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
	define=function () {
		var a=Array.prototype.slice.call(arguments);
		if (typeof a[0]==="string") R.curName=a.shift();
		var reqs=a.shift();
		var func=a.shift();
		R.def(reqs,func,"define");
	};
	define.amd={jQuery:true};
	/*require=*/requirejs=function (reqs,func) {
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

requireSimulator.setName('extend');
define([],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
   };
});

requireSimulator.setName('assert');
define([],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    var $a;
    Assertion.prototype={
        _regedType:{},
        registerType: function (name,t) {
            this._regedType[name]=t;
        },
        MODE_STRICT:"strict",
        MODE_DEFENSIVE:"defensive",
        MODE_BOOL:"bool",
        fail:function () {
            var a=$a(arguments);
            var value=a.shift();
            a=flatten(a);
            a=this.failMesg.concat(value).concat(a).concat(["mode",this._mode]);
            console.log.apply(console,a);
            if (this.isDefensive()) return value;
            if (this.isBool()) return false;
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) return this.fail(t,failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) return this.fail(a,"!==",b);
            return this.isBool()?true:a;
        },
        ne: function (a,b) {
            if (a===b) return this.fail(a,"===",b);
            return this.isBool()?true:a;
        },
        isset: function (a, n) {
            if (a==null) return this.fail(a, (n||"")+" is null/undef");
            return this.isBool()?true:a;
        },
        is: function (value,type) {
            var t=type,v=value;
            if (t==null) {
                return this.fail(value, "assert.is: type must be set");
                // return t; Why!!!!???? because is(args,[String,Number])
            }
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return this.isBool()?true:value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    return this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    var na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    if (t[i]==null) {
                        console.log("WOW!7", v[i],t[i]);
                    }
                    na.is(v[i],t[i]);
                }
                return this.isBool()?true:value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return this.isBool()?true:value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return this.isBool()?true:value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return this.isBool()?true:value;
            }
            if (t===Function) {
                this.assert(typeof v=="function",[v,"should be a function"]);
                return this.isBool()?true:value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return this.isBool()?true:value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    var na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return this.isBool()?true:value;
            }
            if (typeof t=="string") {
                var ty=this._regedType[t];
                if (ty) return this.is(value,ty);
                //console.log("assertion Warning:","unregistered type:", t, "value:",value);
                return this.isBool()?true:value;
            }
            return this.fail(value, "Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        },
        setMode:function (mode) {
            this._mode=mode;
        },
        isDefensive:function () {
            return this._mode===this.MODE_DEFENSIVE;
        },
        isBool:function () {
            return this._mode===this.MODE_BOOL;
        },
        isStrict:function () {
            return !this.isDefensive() && !this.isBool();
        }
    };
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion();
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    ["setMode","isDefensive","is","isset","ne","eq","ensureError"].forEach(function (m) {
        assert[m]=function () {
            try {
                return top[m].apply(top,arguments);
            } catch(e) {
                console.log(e.stack);
                //if (top.isDefensive()) return arguments[0];
                //if (top.isBool()) return false;
                throw new Error(e.message);
            }
        };
    });
    assert.fail=top.fail.bind(top);
    assert.MODE_STRICT=top.MODE_STRICT;
    assert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;
    assert.MODE_BOOL=top.MODE_BOOL;
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.opt=function (t) {
        return assert.f(function (v) {
            return v==null || v instanceof t;
        });
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };
    return assert;
});

requireSimulator.setName('PathUtil');
define(["assert"],function (assert) {
function endsWith(str,postfix) {
    assert.is(arguments,[String,String]);
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    assert.is(arguments,[String,String]);
    return str.substring(0, prefix.length)===prefix;
}
var driveLetter=/^([a-zA-Z]):/;
var url=/^([a-z]+):\/\/\/?([^\/]+)\//;
var PathUtil;
var Path=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isPath(s) , [s, " is not a path"]);
});
var Absolute=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isAbsolutePath(s) , [s, " is not a absolute path"]);
});
var Relative=assert.f(function (s) {
    this.is(s,String);
    this.assert( !PathUtil.isAbsolutePath(s) , [s, " is not a relative path"]);
});

var Dir=assert.f(function (s) {
    this.is(s,Path);
    this.assert( PathUtil.isDir(s) , [s, " is not a directory path"]);
});
var AbsDir=assert.and(Dir,Absolute);
var File=assert.f(function (s) {
    this.is(s,Path);
    this.assert( !PathUtil.isDir(s) , [s, " is not a file path"]);
});

var SEP="/";
PathUtil={
    Path: Path,Absolute:Absolute, Relative:Relative, Dir:Dir,File:File,
    AbsDir:AbsDir,
    SEP: SEP,
    endsWith: endsWith, startsWith:startsWith,
    hasDriveLetter: function (path) {
        return driveLetter.exec(path);
    },
    isURL: function (path) {
        var r=url.exec(path);
        if (!r) return;
        return {protocol:r[1], hostPort:r[2], path:SEP+path.substring(r[0].length)  };
    },
    isPath: function (path) {
    	assert.is(arguments,[String]);
		return true;//!path.match(/\/\//);
    },
    isRelativePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) && !PathUtil.isAbsolutePath(path);
    },
    isAbsolutePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) &&
		(PathUtil.startsWith(path,SEP) || PathUtil.hasDriveLetter(path) ||  PathUtil.isURL(path));
    },
    isDir: function (path) {
        path=PathUtil.fixSep(path);
		assert.is(arguments,[Path]);
        return endsWith(path,SEP);
    },
    fixSep: function (path) {
        assert.is(arguments,[String]);
        return assert.is( path.replace(/\\/g,"/"), Path);
    },
    directorify: function (path) {
        path=PathUtil.fixSep(path);
        if (PathUtil.isDir(path)) return path;
        return assert.is(path+SEP, Dir);
    },
    filify: function (path) {
        path=PathUtil.fixSep(path);
        if (!PathUtil.isDir(path)) return path;
        return assert.is(path.substring(0,path.length-1),File);
    },
	splitPath: function (path) {
		assert.is(arguments,[Path]);
		var u;
		if (u=this.isURL(path)) {
		    var p=this.splitPath(u.path);
		    p[0]=u.protocol+"://"+u.hostPort;
		    return p;
		}
		path=path.replace(/\/+/g,SEP);
	    var res=path.split(SEP);
        if (res[res.length-1]=="") {
            res[res.length-2]+=SEP;
            res.pop();
        }
        return res;
    },
    name: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.splitPath(path).pop();
    },
    ext: function(path) {
		assert.is(arguments,[String]);
        var n = PathUtil.name(path);
        var r = (/\.[a-zA-Z0-9]+$/).exec(n);
        if (r) return r[0];
        return null;
    },
    truncExt: function(path, ext) {
		assert.is(path,String);
        var name = PathUtil.name(path);
        ext=ext || PathUtil.ext(path);
        assert.is(ext,String);
        return name.substring(0, name.length - ext.length);
    },
    truncSEP: function (path) {
		assert.is(arguments,[Path]);
		if (!PathUtil.isDir(path)) return path;
		return path.substring(0,path.length-1);
    },
    endsWith: function(path, postfix) {
		assert.is(arguments,[String,String]);
        return endsWith(PathUtil.name(path), postfix);
    },
    parent: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.up(path);
    },
    rel: function(path,relPath) {
        if (relPath=="") return path;
		assert.is(arguments,[AbsDir, Relative]);
    	var paths=PathUtil.splitPath(relPath);
        var resPath=path;
        resPath=resPath.replace(/\/$/,"");
        var t=PathUtil;
        paths.forEach(function (n) {
             if (n==".." || n=="../") resPath=t.up(resPath);
             else {
                 resPath=resPath.replace(/\/$/,"");
                 resPath+=SEP+(n=="."||n=="./" ? "": n);
             }
        });
        return resPath;
    },
    relPath: function(path,base) {
		assert.is(arguments,[Absolute,Absolute]);
        if (path.substring(0,base.length)!=base) {
            return "../"+PathUtil.relPath(path, this.up(base));
        }
        return path.substring(base.length);
    },
    up: function(path) {
        path=PathUtil.fixSep(path);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
PathUtil.isAbsolute=PathUtil.isAbsolutePath;
PathUtil.isRelative=PathUtil.isRelativePath;
if (typeof window=="object") window.PathUtil=PathUtil;
return PathUtil;
});
requireSimulator.setName('MIMETypes');
define([], function () {
   return {
      ".png":"image/png",
      ".gif":"image/gif",
      ".jpeg":"image/jpeg",
      ".jpg":"image/jpeg",
      ".ico":"image/icon",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".mp4":"video/mp4",
      ".m4a":"audio/x-m4a",
      ".mid":"audio/mid",
      ".midi":"audio/mid",
      ".wav":"audio/wav",
      ".txt":"text/plain",
      ".html":"text/html",
      ".htm":"text/html",
      ".css":"text/css",
      ".js":"text/javascript",
      ".json":"text/json",
      ".zip":"application/zip",
      ".swf":"application/x-shockwave-flash",
      ".pdf":"application/pdf",
      ".doc":"application/word",
      ".xls":"application/excel",
      ".ppt":"application/powerpoint",
      '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.docm':'application/vnd.ms-word.document.macroEnabled.12',
      '.dotx':'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      '.dotm':'application/vnd.ms-word.template.macroEnabled.12',
      '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xlsm':'application/vnd.ms-excel.sheet.macroEnabled.12',
      '.xltx':'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      '.xltm':'application/vnd.ms-excel.template.macroEnabled.12',
      '.xlsb':'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
      '.xlam':'application/vnd.ms-excel.addin.macroEnabled.12',
      '.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.pptm':'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      '.potx':'application/vnd.openxmlformats-officedocument.presentationml.template',
      '.potm':'application/vnd.ms-powerpoint.template.macroEnabled.12',
      '.ppsx':'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      '.ppsm':'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
      '.ppam':'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      ".tonyu":"text/tonyu"
   };
});
requireSimulator.setName('FS2');
define(["extend","PathUtil","MIMETypes","assert"],function (extend, P, M,assert){
    var FS=function () {
    };
    var fstypes={};
    FS.addFSType=function (name,fsgen) {
        fstypes[name]=fsgen;
    };
    FS.availFSTypes=function () {
        return fstypes;
    };
    function stub(n) {
        throw new Error (n+" is STUB!");
    }
    extend(FS.prototype, {
        err: function (path, mesg) {
            throw new Error(path+": "+mesg);
        },
        fstype:function () {
            return "Unknown";
        },
        isReadOnly: function (path, options) {// mainly for check ENTIRELY read only
            stub("isReadOnly");
        },
        supportsSync: function () {
            return true;
        },
        resolveFS:function (path, options) {
            assert(this.getRootFS()!==this);
            return this.getRootFS().resolveFS(path);
        },
        mounted: function (rootFS, mountPoint ) {
            //assert.is(arguments,[FS,P.AbsDir]);
            this.rootFS=rootFS;
            this.mountPoint=mountPoint;
        },
        inMyFS:function (path) {
            return !this.mountPoint || P.startsWith(path, this.mountPoint);
        },
        /*dirFromFstab: function (path, options) {
            assert.is(path, P.AbsDir);
            var res=(options||{}).res || [];
            this.fstab().forEach(function (tb) {
                if (P.up( tb.path )==path) res.push(P.name(tb.path));
            });
            return res;
        },*/
        getRootFS: function () {
            return assert( this.rootFS, "rootFS is not set" );
        },
        //-------- end of mouting
        //-------- spec
        getReturnTypes: function (path, options) {
            //{getContent:String|DataURL|ArrayBuffer|OutputStream|Writer
            //   ,opendir:Array|...}
            stub("");
        },
        //-------  for file
        getContent: function (path, options) {
            // options:{type:String|DataURL|ArrayBuffer|OutputStream|Writer}
            // succ : [type],
            stub("getContent");
        },
        getContentAsync: function (path, options) {
            if (!this.supportsSync()) stub("getContentAsync");
            return $.when(this.getContent.apply(this,arguments));
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        setContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("setContentAsync");
            return $.when(content).then(function (content) {
                return $.when(t.setContent(path,content,options));
            });
        },
        getMetaInfo: function (path, options) {
            stub("");
        },
        setMetaInfo: function (path, info, options) {
            stub("");
        },
        mkdir: function (path, options) {
            stub("mkdir");
        },
        touch: function (path) {
            stub("touch");
        },
        exists: function (path, options) {
            // exists return false if path is existent by follwing symlink
            stub("exists");
        },
        opendir: function (path, options) {
            //ret: [String] || Stream<string> // https://nodejs.org/api/stream.html#stream_class_stream_readable
            stub("opendir");
        },
        cp: function(path, dst, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertExist(path);
            options=options||{};
            var srcIsDir=this.isDir(path);
            var dstfs=this.getRootFS().resolveFS(dst);
            var dstIsDir=dstfs.isDir(dst);
            if (!srcIsDir && !dstIsDir) {
                if (this.supportsSync() && dstfs.supportsSync()) {
                    var cont=this.getContent(path);
                    var res=dstfs.setContent(dst,cont);
                    if (options.a) {
                        dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                    }
                    return res;
                } else {
                    return dstfs.setContentAsync(
                            dst,
                            this.getContentAsync(path)
                    ).then(function (res) {
                        if (options.a) {
                            return dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                        }
                        return res;
                    });
                }
            } else {
                throw new Error("only file to file supports");
            }
        },
        mv: function (path,to,options) {
            this.cp(path,to,options);
            return this.rm(path,{r:true});
        },
        rm:function (path, options) {
            stub("");
        },
        link: function (path, to, options) {
            throw new Error("ln "+to+" "+path+" : This FS not support link.");
        },
        getURL: function (path) {
            stub("");
        }
    });
    //res=[]; for (var k in a) { res.push(k); } res;
    FS.delegateMethods=function (prototype,  methods) {
        for (var n in methods) {
            (function (n){
                assert.ne(n,"inMyFS");
                prototype[n]=function () {
                    var path=arguments[0];
                    assert.is(path,P.Absolute);
                    var fs=this.resolveFS(path);
                    //console.log(n, f.fs===this  ,f.fs, this);
                    if (fs!==this) {
                        //arguments[0]=f.path;
                        return fs[n].apply(fs, arguments);
                    } else {
                        return methods[n].apply(this, arguments);
                    }
                };
            })(n);
        }
    };
    FS.delegateMethods(FS.prototype, {
        assertWriteable: function (path) {
            if (this.isReadOnly(path)) this.err(path, "read only.");
        },
        getContentType: function (path, options) {
            var e=(P.ext(path)+"").toLowerCase();
            return M[e] || (options||{}).def || "text/plain";
        },
        isText:function (path) {
            var m=this.getContentType(path);
            return P.startsWith( m, "text");
        },
        assertExist: function (path, options) {
            if (!this.exists(path, options)) {
                this.err(path, ": No such "+(P.isDir(path)?"directory":"file"));
            }
        },
        isDir: function (path,options) {
            return P.isDir(path);
        },
        find: function (path, options) {
            assert.is(arguments,[P.Absolute]);
            var ls=this.opendir(path, options);
            var t=this;
            var res=[path];
            ls.forEach(function (e) {
                var ep=P.rel(path, e);
                if (P.isDir(ep)) {
                    var fs=t.resolveFS(ep);
                    res=res.concat(
                            fs.find( ep ,options)
                    );
                } else {
                    res.push( ep );//getPathFromRootFS
                }
            });
            return res;
        },
        resolveLink: function (path) {
            assert.is(path,P.Absolute);
            // returns non-link path
            // ln -s /a/b/ /c/d/
            // resolveLink /a/b/    ->  /a/b/
            // resolveLink /c/d/e/f -> /a/b/e/f
            // resolveLink /c/d/non_existent -> /a/b/non_existent
            // isLink      /c/d/    -> /a/b/
            // isLink      /c/d/e/f -> null
            // ln /testdir/ /ram/files/
            // resolveLink /ram/files/sub/test2.txt -> /testdir/sub/test2.txt
            // path=/ram/files/test.txt
            for (var p=path ; p ; p=P.up(p)) {
                assert(!this.mountPoint || P.startsWith(p, this.mountPoint), p+" is out of mountPoint. path="+path);
                var l=this.isLink(p);  // p=/ram/files/ l=/testdir/
                if (l) {
                    assert(l!=p,"l==p=="+l);
                    //        /testdir/    test.txt
                    var np=P.rel(l,P.relPath(path, p));  //   /testdir/test.txt
                    assert(np!=path,"np==path=="+np);
                    return assert.is(this.getRootFS().resolveFS(np).resolveLink(np),P.Absolute)  ;
                }
                if (this.exists(p)) return path;
            }
            return path;
        },
        isLink: function (path) {
            return null;
        }//,
        /*get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }*/
    });
    return FS;
});

requireSimulator.setName('WebSite');
define(["PathUtil"], function (P) {
    var loc=document.location.href;
    var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
    var WebSite;
    if (loc.match(/jsrun\.it/)) {
        WebSite={
            urlAliases: {
                "images/Ball.png":"http://jsrun.it/assets/9/X/T/b/9XTbt.png",
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/f/D/z/z/fDzze.png",//"http://jsrun.it/assets/j/D/9/q/jD9qQ.png",
                "images/mapchip.png":"http://jsrun.it/assets/f/u/N/v/fuNvz.png",
                "images/inputPad.png":"http://jsrun.it/assets/r/K/T/Y/rKTY9.png"
            },top:"",devMode:devMode, pluginTop: "http://tonyuedit.appspot.com/js/plugins",
            removeJSOutput:true
        };
    } else if (
      loc.match(/tonyuexe\.appspot\.com/) ||
      loc.match(/localhost:8887/) ||
 	  (
 	    /*(
 	       loc.match(/^file:/) ||
 	       loc.match(/localhost/) ||
	       loc.match(/tonyuedit\.appspot\.com/)
	    ) &&*/
	    loc.match(/\/html\/((dev)|(build))\//)
	  )
    ) {
        WebSite={
            urlAliases: {
                "images/Ball.png":"../../images/Ball.png",
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                "images/sound.png":"../../images/sound.png",
                "images/sound_ogg.png":"../../images/sound_ogg.png",
                "images/sound_mp3.png":"../../images/sound_mp3.png",
                "images/sound_mp4.png":"../../images/sound_mp4.png",
                "images/sound_m4a.png":"../../images/sound_m4a.png",
                "images/sound_mid.png":"../../images/sound_mid.png",
                "images/sound_wav.png":"../../images/sound_wav.png",
                    "images/ecl.png":"../../images/ecl.png"
            },top:"../..",devMode:devMode
        };
    } else {
        WebSite={
           urlAliases: {}, top: ".",devMode:devMode
        };
    }
    // from https://w3g.jp/blog/js_browser_sniffing2015
    var u=window.navigator.userAgent.toLowerCase();
    WebSite.tablet=(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
    || u.indexOf("ipad") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
    || u.indexOf("kindle") != -1
    || u.indexOf("silk") != -1
    || u.indexOf("playbook") != -1;
    WebSite.mobile=(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
    || u.indexOf("iphone") != -1
    || u.indexOf("ipod") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
    || u.indexOf("blackberry") != -1;

    if (!WebSite.pluginTop) {
        WebSite.pluginTop=WebSite.top+"/js/plugins";
    }
    WebSite.disableROM={};
	if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
	    //WebSite.disableROM={"ROM_d.js":true};
	}
    if (loc.match(/\.appspot\.com/) ||  loc.match(/localhost:888[87]/)) {
        WebSite.serverType="GAE";
    }
    if (loc.match(/localhost:3000/) ) {
        WebSite.serverType="Node";
    }
    if (loc.match(/tonyuexe\.appspot\.com/) ||
        loc.match(/localhost:8887/)) {
        WebSite.serverTop=WebSite.top+"/exe"; // Fix NetModule.tonyu!!
    } else {
        WebSite.serverTop=WebSite.top+"/edit";// Fix NetModule.tonyu!!
    }
    WebSite.sampleImg=WebSite.top+"/images";
    WebSite.blobPath=WebSite.serverTop+"/serveBlob";        //TODO: urlchange!
    WebSite.isNW=(typeof process=="object" && process.__node_webkit);
    WebSite.mp3Disabled=WebSite.isNW;
    WebSite.tonyuHome="/Tonyu/";
    WebSite.url={
        getDirInfo:WebSite.serverTop+"/getDirInfo",
        getFiles:WebSite.serverTop+"/File2LSSync",
        putFiles:WebSite.serverTop+"/LS2FileSync"
    };
    if (WebSite.isNW) {
        WebSite.cwd=P.directorify(process.cwd());
        //WebSite.exeDir=WebSite.execDir=P.up(P.fixSep(process.execPath)); not suitable when mac
        if (process.env.TONYU_HOME) {
            WebSite.tonyuHome=P.directorify(process.env.TONYU_HOME);
        } else {
            WebSite.tonyuHome=P.rel(WebSite.cwd,"fs/Tonyu/");
        }
        WebSite.logdir=process.env.TONYU_LOGDIR;//"C:/var/log/Tonyu/";
        WebSite.wwwDir=P.rel(WebSite.cwd,"www/");
        WebSite.platform=process.platform;
        WebSite.ffmpeg=P.rel(WebSite.cwd,(WebSite.platform=="win32"?
                "ffmpeg/bin/ffmpeg.exe":"ffmpeg/bin/ffmpeg"));
        WebSite.pkgInfo=require(P.rel(WebSite.cwd, "package.json"));
        if (process.env.TONYU_PROJECTS) {
            WebSite.projects=process.env.TONYU_PROJECTS.replace(/\\/g,"/").split(require('path').delimiter);
        } else if ( WebSite.pkgInfo && WebSite.pkgInfo.config && WebSite.pkgInfo.config.prjDirs ){
            WebSite.projects=WebSite.pkgInfo.config.prjDirs.map(function (d) {
                d=P.directorify(d);
                if (P.isAbsolute(d)) return d;
                return P.rel(WebSite.cwd,d);
            });
        } else {
            WebSite.projects=[P.rel(WebSite.cwd,"Projects/"),
                              P.rel(WebSite.tonyuHome,"Projects/")];
        }
        WebSite.kernelDir=P.rel(WebSite.wwwDir,"Kernel/");
    } else {
        WebSite.wwwDir=location.protocol+"//"+location.host+"/";
        WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
    }
    if (loc.match(/tonyuedit\.appspot\.com/) ||
        loc.match(/localhost:888/)) {
        WebSite.kernelDir=location.protocol+"//"+location.host+"/Kernel/";
    }
    if (loc.match(/tonyuedit\.appspot\.com/) ||
        loc.match(/localhost:888/) ||
        WebSite.isNW) {
        WebSite.compiledKernel=WebSite.top+"/Kernel/js/concat.js";
    } else {
        WebSite.compiledKernel="http://tonyuexe.appspot.com/Kernel/js/concat.js";
    }
    return window.WebSite=WebSite;
});

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
// From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
function Base64_To_ArrayBuffer(base64){
    base64=base64.replace(/[\n=]/g,"");
    var dic = new Object();
    dic[0x41]= 0; dic[0x42]= 1; dic[0x43]= 2; dic[0x44]= 3; dic[0x45]= 4; dic[0x46]= 5; dic[0x47]= 6; dic[0x48]= 7; dic[0x49]= 8; dic[0x4a]= 9; dic[0x4b]=10; dic[0x4c]=11; dic[0x4d]=12; dic[0x4e]=13; dic[0x4f]=14; dic[0x50]=15;
    dic[0x51]=16; dic[0x52]=17; dic[0x53]=18; dic[0x54]=19; dic[0x55]=20; dic[0x56]=21; dic[0x57]=22; dic[0x58]=23; dic[0x59]=24; dic[0x5a]=25; dic[0x61]=26; dic[0x62]=27; dic[0x63]=28; dic[0x64]=29; dic[0x65]=30; dic[0x66]=31;
    dic[0x67]=32; dic[0x68]=33; dic[0x69]=34; dic[0x6a]=35; dic[0x6b]=36; dic[0x6c]=37; dic[0x6d]=38; dic[0x6e]=39; dic[0x6f]=40; dic[0x70]=41; dic[0x71]=42; dic[0x72]=43; dic[0x73]=44; dic[0x74]=45; dic[0x75]=46; dic[0x76]=47;
    dic[0x77]=48; dic[0x78]=49; dic[0x79]=50; dic[0x7a]=51; dic[0x30]=52; dic[0x31]=53; dic[0x32]=54; dic[0x33]=55; dic[0x34]=56; dic[0x35]=57; dic[0x36]=58; dic[0x37]=59; dic[0x38]=60; dic[0x39]=61; dic[0x2b]=62; dic[0x2f]=63;
    var num = base64.length;
    var n = 0;
    var b = 0;
    var e;

    if(!num) return (new ArrayBuffer(0));
    //if(num < 4) return null;
    //if(num % 4) return null;

    // AA     12    1
    // AAA    18    2
    // AAAA   24    3
    // AAAAA  30    3
    // AAAAAA 36    4
    // num*6/8
    e = Math.floor(num / 4 * 3);
    if(base64.charAt(num - 1) == '=') e -= 1;
    if(base64.charAt(num - 2) == '=') e -= 1;

    var ary_buffer = new ArrayBuffer( e );
    var ary_u8 = new Uint8Array( ary_buffer );
    var i = 0;
    var p = 0;
    while(p < e){
        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));//return null;
        n = (b << 2);
        i ++;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
        ary_u8[p] = n | ((b >> 4) & 0x3);
        n = (b & 0x0f) << 4;
        i ++;
        p ++;
        if(p >= e) break;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
        ary_u8[p] = n | ((b >> 2) & 0xf);
        n = (b & 0x03) << 6;
        i ++;
        p ++;
        if(p >= e) break;

        b = dic[base64.charCodeAt(i)];
        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
        ary_u8[p] = n | b;
        i ++;
        p ++;
    }
    function fail(m) {
        console.log(m);
        console.log(base64,i);
        throw new Error(m);
    }
    return ary_buffer;
}

function Base64_From_ArrayBuffer(ary_buffer){
    var dic = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
    ];
    var base64 = "";
    var ary_u8 = new Uint8Array( ary_buffer );
    var num = ary_u8.length;
    var n = 0;
    var b = 0;

    var i = 0;
    while(i < num){
        b = ary_u8[i];
        base64 += dic[(b >> 2)];
        n = (b & 0x03) << 4;
        i ++;
        if(i >= num) break;

        b = ary_u8[i];
        base64 += dic[n | (b >> 4)];
        n = (b & 0x0f) << 2;
        i ++;
        if(i >= num) break;

        b = ary_u8[i];
        base64 += dic[n | (b >> 6)];
        base64 += dic[(b & 0x3f)];
        i ++;
    }

    var m = num % 3;
    if(m){
        base64 += dic[n];
    }
    if(m == 1){
        base64 += "==";
    }else if(m == 2){
        base64 += "=";
    }
    return base64;
}

function privatize(o){
    if (o.__privatized) return o;
    var res={__privatized:true};
    for (var n in o) {
        (function (n) {
            var m=o[n];
            if (n.match(/^_/)) return;
            if (typeof m!="function") return;
            res[n]=function () {
                var r=m.apply(o,arguments);
                return r;
            };
        })(n);
    }
    return res;
}
function hasNodeBuffer() {
    return typeof Buffer!="undefined";
}
function isNodeBuffer(data) {
    return (hasNodeBuffer() && data instanceof Buffer);
}
function isBuffer(data) {
    return data instanceof ArrayBuffer || isNodeBuffer(data);
}
function utf8bytes2str(bytes) {
    var e=[];
    for (var i=0 ; i<bytes.length ; i++) {
         e.push("%"+("0"+bytes[i].toString(16)).slice(-2));
    }
    try {
        return decodeURIComponent(e.join(""));
    } catch (er) {
        console.log(e.join(""));
        throw er;
    }
}
function str2utf8bytes(str, binType) {
    var e=encodeURIComponent(str);
    var r=/^%(..)/;
    var a=[];
    var ad=0;
    for (var i=0 ; i<e.length; i++) {
        var m=r.exec( e.substring(i));
        if (m) {
            a.push(parseInt("0x"+m[1]));
            i+=m[0].length-1;
        } else a.push(e.charCodeAt(i));
    }
    return (typeof Buffer!="undefined" && binType===Buffer ? new Buffer(a) : new Uint8Array(a).buffer);
}

return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    Base64_To_ArrayBuffer:Base64_To_ArrayBuffer,
    Base64_From_ArrayBuffer:Base64_From_ArrayBuffer,
    utf8bytes2str: utf8bytes2str,
    str2utf8bytes: str2utf8bytes,
    privatize: privatize,
    hasNodeBuffer:hasNodeBuffer,
    isNodeBuffer: isNodeBuffer,
    isBuffer: isBuffer
};
})();

requireSimulator.setName('DataURL');
define(["extend","assert","Util"],function (extend,assert,Util) {
    var A=Util.hasNodeBuffer() ? Buffer :ArrayBuffer;
    var isNodeBuffer=Util.isNodeBuffer;
    var isBuffer=Util.isBuffer;
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
          this.binType=contentType || A;
          this.dataURL2bin(data);
      } else if (data && isBuffer(data.buffer)) {
          this.buffer=data.buffer;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else if (isBuffer(data)) {
          this.buffer=data;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else {
          console.log(arguments);
          assert.fail("Invalid args: ",arguments);
      }
   };
   DataURL.isBuffer=isBuffer;
   extend(DataURL.prototype,{
      bin2dataURL: function (b, contentType) {
          assert(isBuffer(b));
          assert.is(contentType,String);
  	     var head=this.dataHeader(contentType);
	     var base64=Base64_From_ArrayBuffer(b);
	     assert.is(base64,String);
	     return this.url=head+base64;
	  },
	  dataURL2bin: function (dataURL) {
          assert.is(arguments,[String]);
	      var reg=/^data:([^;]+);base64,/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Base64_To_ArrayBuffer(dataURL.substring(r[0].length) , this.binType);
          return assert.is(this.buffer , this.binType);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

	function Base64_To_ArrayBuffer(base64, binType){
	    var A=binType;
	    base64=base64.replace(/[\n=]/g,"");
	    var dic = new Object();
	    dic[0x41]= 0; dic[0x42]= 1; dic[0x43]= 2; dic[0x44]= 3; dic[0x45]= 4; dic[0x46]= 5; dic[0x47]= 6; dic[0x48]= 7; dic[0x49]= 8; dic[0x4a]= 9; dic[0x4b]=10; dic[0x4c]=11; dic[0x4d]=12; dic[0x4e]=13; dic[0x4f]=14; dic[0x50]=15;
	    dic[0x51]=16; dic[0x52]=17; dic[0x53]=18; dic[0x54]=19; dic[0x55]=20; dic[0x56]=21; dic[0x57]=22; dic[0x58]=23; dic[0x59]=24; dic[0x5a]=25; dic[0x61]=26; dic[0x62]=27; dic[0x63]=28; dic[0x64]=29; dic[0x65]=30; dic[0x66]=31;
	    dic[0x67]=32; dic[0x68]=33; dic[0x69]=34; dic[0x6a]=35; dic[0x6b]=36; dic[0x6c]=37; dic[0x6d]=38; dic[0x6e]=39; dic[0x6f]=40; dic[0x70]=41; dic[0x71]=42; dic[0x72]=43; dic[0x73]=44; dic[0x74]=45; dic[0x75]=46; dic[0x76]=47;
	    dic[0x77]=48; dic[0x78]=49; dic[0x79]=50; dic[0x7a]=51; dic[0x30]=52; dic[0x31]=53; dic[0x32]=54; dic[0x33]=55; dic[0x34]=56; dic[0x35]=57; dic[0x36]=58; dic[0x37]=59; dic[0x38]=60; dic[0x39]=61; dic[0x2b]=62; dic[0x2f]=63;
	    var num = base64.length;
	    var n = 0;
	    var b = 0;
	    var e;

	    if(!num) return (new A(0));
	    //if(num < 4) return null;
	    //if(num % 4) return null;

	    // AA     12    1
	    // AAA    18    2
	    // AAAA   24    3
	    // AAAAA  30    3
	    // AAAAAA 36    4
	    // num*6/8
	    e = Math.floor(num / 4 * 3);
	    if(base64.charAt(num - 1) == '=') e -= 1;
	    if(base64.charAt(num - 2) == '=') e -= 1;

	    var ary_buffer = new A( e );
	    var ary_u8 = (Util.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer ));
	    var i = 0;
	    var p = 0;
	    while(p < e){
	        b = dic[base64.charCodeAt(i)];
	        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));//return null;
	        n = (b << 2);
	        i ++;

	        b = dic[base64.charCodeAt(i)];
	        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | ((b >> 4) & 0x3);
	        /*if (p==0) {
	            console.log("WOW!", n | ((b >> 4) & 0x3), ary_u8[p]);
	        }*/
	        n = (b & 0x0f) << 4;
	        i ++;
	        p ++;
	        if(p >= e) break;

	        b = dic[base64.charCodeAt(i)];
	        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
	        ary_u8[p] = n | ((b >> 2) & 0xf);
	        n = (b & 0x03) << 6;
	        i ++;
	        p ++;
	        if(p >= e) break;

	        b = dic[base64.charCodeAt(i)];
	        if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
	        ary_u8[p] = n | b;
	        i ++;
	        p ++;
	    }
	    function fail(m) {
	        console.log(m);
	        console.log(base64,i);
	        throw new Error(m);
	    }
        //console.log("WOW!", ary_buffer[0],ary_u8[0], ary_buffer===ary_u8.buffer);
	    if (binType===Uint8Array) {
	        return ary_u8;
	    }
	    return ary_buffer;
	}
	function Base64_From_ArrayBuffer(ary_buffer){
		var dic = [
			'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
			'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
			'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
			'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
		];
		var base64 = "";
		var ary_u8 = Util.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer );
		var num = ary_u8.length;
		var n = 0;
		var b = 0;

		var i = 0;
		while(i < num){
			b = ary_u8[i];
			base64 += dic[(b >> 2)];
			n = (b & 0x03) << 4;
			i ++;
			if(i >= num) break;

			b = ary_u8[i];
			base64 += dic[n | (b >> 4)];
			n = (b & 0x0f) << 2;
			i ++;
			if(i >= num) break;

			b = ary_u8[i];
			base64 += dic[n | (b >> 6)];
			base64 += dic[(b & 0x3f)];
			i ++;
		}

		var m = num % 3;
		if(m){
			base64 += dic[n];
		}
		if(m == 1){
			base64 += "==";
		}else if(m == 2){
			base64 += "=";
		}
		return base64;
	}
    return DataURL;
});
requireSimulator.setName('Content');
define(["DataURL","Util","assert"],function (DataURL,Util,assert) {
    var Content=function () {};
    var isNodeBuffer=Util.isNodeBuffer;
    var isBuffer=Util.isBuffer;

    Content.plainText=function (s,contentType){
        var b=new Content;
        b.contentType=contentType||"text/plain";
        b.plain=s;
        return b;
    };
    Content.url=function (s) {
        var b=new Content;
        b.url=s;
        return b;
    };
    Content.buffer2ArrayBuffer = function (a) {
        if (Util.isBuffer(a)) {
            return assert(new Uint8Array(a).buffer,"n2a: buf is not set");
        }
        return assert(a,"n2a: a is not set");
    };
    Content.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return assert(a,"a2n: a is not set");
    };

    Content.bin=function (bin, contentType) {
        assert(contentType, "contentType should be set");
        var b=new Content;
        if (bin && isBuffer(bin.buffer)) {
            b.arrayBuffer=bin.buffer;
        } else if (Util.isNodeBuffer(bin)) {
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.arrayBuffer=bin;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };

    var p=Content.prototype;
    p.toBin = function (binType) {
        binType=binType || (Util.hasNodeBuffer() ? Buffer: ArrayBuffer);
        if (this.nodeBuffer) {
            if (binType===Buffer) {
                return this.nodeBuffer;
            } else {
                return this.arrayBuffer=( Content.buffer2ArrayBuffer(this.nodeBuffer) );
            }
        } else if (this.arrayBuffer) {
            if (binType===ArrayBuffer) {
                return this.arrayBuffer;
            } else {
                return this.nodeBuffer=( Content.arrayBuffer2Buffer(this.arrayBuffer) );
            }
        } else if (this.url) {
            var d=new DataURL(this.url, binType);
            return this.setBuffer(d.buffer);
        } else if (this.plain!=null) {
            return this.setBuffer( Util.str2utf8bytes(this.plain, binType) );
        }
        throw new Error("No data");
    };
    p.setBuffer=function (b) {
        assert(b,"b is not set");
        if (Util.isNodeBuffer(b)) {
            return this.nodeBuffer=b;
        } else {
            return this.arrayBuffer=b;
        }
    };
    p.toArrayBuffer=function () {
        return this.toBin(ArrayBuffer);
    };
    p.toNodeBuffer=function () {
        return this.toBin(Buffer);
    };
    p.toURL=function () {
        if (this.url) {
            return this.url;
        } else {
            if (!this.arrayBuffer && this.plain!=null) {
                this.arrayBuffer=Util.str2utf8bytes(this.plain,ArrayBuffer);
            }
            if (this.arrayBuffer || this.nodeBuffer) {
                var d=new DataURL(this.arrayBuffer || this.nodeBuffer,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.plain!=null) {
            return this.plain;
        } else {
            if (this.url && !this.hasBin() ) {
                var d=new DataURL(this.url,ArrayBuffer);
                this.arrayBuffer=d.buffer;
            }
            if (this.hasBin()) {
                return this.plain=Util.utf8bytes2str(
                        this.nodeBuffer || new Uint8Array(this.arrayBuffer)
                );
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.nodeBuffer || this.arrayBuffer;};
    p.hasNodeBuffer= function () {return this.nodeBuffer;}
    p.hasArrayBuffer= function () {return this.arrayBuffer;}
    return Content;
});
/*
requirejs(["Content"], function (C) {
   var s="てすとabc";
   var c1=C.plainText(s);
   test(c1,[s]);

   function test(c,path) {
       var p=c.toPlainText();
       var u=c.toURL();
       var a=c.toArrayBuffer();
       var n=c.toNodeBuffer();
       console.log(path,"->",p,u,a,n);
       var c1=C.plainText(p);
       var c2=C.url(u);
       var c3=C.bin(a,"text/plain");
       var c4=C.bin(n,"text/plain");
       if (path.length<2) {
           test(c1, path.concat([p]));
           test(c2, path.concat([u]));
           test(c3, path.concat([a]));
           test(c4, path.concat([n]));
       }

   }

});
*/
requireSimulator.setName('NativeFS');
define(["FS2","assert","PathUtil","extend","MIMETypes","DataURL","Content"],
        function (FS,A,P,extend,MIME,DataURL,Content) {
    var available=(typeof process=="object" && process.__node_webkit);
    if (!available) {
        return function () {
            throw new Error("This system not suppert native FS");
        };
    }
    var assert=A;
    var fs=require("fs");
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    var hasDriveLetter=P.hasDriveLetter(process.cwd());
    NativeFS.available=true;
    var SEP=P.SEP;
    var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS;
    Pro.toNativePath = function (path) {
        // rootPoint: on NativePath   C:/jail/
        // mountPoint: on VirtualFS   /mnt/natfs/
        if (!this.rootPoint) return path;
        A.is(path, P.Absolute);
        A(this.inMyFS(path),path+" is not fs of "+this);
        return P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return a;
    };

    /*Pro.isText=function (path) {
        var e=P.ext(path);
        var m=MIME[e];
        return P.startsWith( m, "text");
    };*/
    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
        if (this.mountPoint) {
            return P.startsWith(path, this.mountPoint)
        } else {
//            console.log(path, hasDriveLetter , P.hasDriveLetter(path));
            return !( !!hasDriveLetter ^ !!P.hasDriveLetter(path));
        }
    };
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
            assert.is(arguments,[String]);
            return {
                getContent: ArrayBuffer, opendir:[String]
            };
        },
        getContent: function (path, options) {
            options=options||{};
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            this.assertExist(path);
            if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            }
        },
        setContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.writeFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.writeFileSync(np, content.toPlainText());
            }
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, options);
            var s=this.stat(path);
            s.lastUpdate=s.mtime.getTime();
            return s;
        },
        setMetaInfo: function(path, info, options) {

            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            if (this.exists(path)){
                if (this.isDir(path)) {
                    return;
                } else {
                    throw new Error(this+" is a file. not a dir.");
                }
            }
            this.assertWriteable(path);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            fs.mkdirSync(np);
            return this.assertExist(np);
        },
        opendir: function (path, options) {
            assert.is(arguments,[String]);
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np).map(function (e) {
                var s=fs.statSync(ts+SEP+e);
                var ss=s.isDirectory()?SEP:"";
                return e+ss;
            });
            var res=[]; //this.dirFromFstab(path);
            return assert.is(res.concat(r),Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            options=options||{};
            this.assertExist(path);
            var np=this.toNativePath(path);
            if (this.isDir(path)) {
                return fs.rmdirSync(np);
            } else {
                return fs.unlinkSync(np);
            }
        },
        exists: function (path, options) {
            var np=this.toNativePath(path);
            return fs.existsSync(np);
        },
        isDir: function (path) {
            if (!this.exists(path)) {
                return P.isDir(path);
            }
            return this.stat(path).isDirectory();
        },
        /*link: function(path, to, options) {
        }//TODO
        isLink:
        */
        touch: function (path) {
            if (!this.exists(path) && this.isDir(path)) {
                this.mkdir(path);
            } else if (this.exists(path) /*&& !this.isDir(path)*/ ) {
                // TODO(setlastupdate)
                fs.utimesSync(path,Date.now()/1000,Date.now()/1000);
            }
        },
        getURL:function (path) {
            return "file:///"+path.replace(/\\/g,"/");
        }
    });
    return NativeFS;
});
requireSimulator.setName('LSFS');
define(["FS2","PathUtil","extend","assert","Util","Content"],
        function(FS,P,extend,assert,Util,Content) {
    var LSFS = function(storage,options) {
    	this.storage=storage;
    	this.options=options||{};
    };
    var isDir = P.isDir.bind(P);
    var up = P.up.bind(P);
    var endsWith= P.endsWith.bind(P);
    //var getName = P.name.bind(P);
    var Path=P.Path;
    var Absolute=P.Absolute;
    var SEP= P.SEP;
    function now(){
        return new Date().getTime();
    }
    LSFS.ramDisk=function () {
        var s={};
        s[P.SEP]="{}";
        return new LSFS(s);
    };
    FS.addFSType("localStorage",function (path, options) {
        return new LSFS(localStorage);
    });
    FS.addFSType("ram",function (path, options) {
        return LSFS.ramDisk();
    });

    LSFS.now=now;
    LSFS.prototype=new FS;
    //private methods
    LSFS.prototype.resolveKey=function (path) {
        assert.is(path,P.Absolute);
        if (this.mountPoint) {
            return P.SEP+P.relPath(path,this.mountPoint);//FromMountPoint(path);
        } else {
            return path;
        }
    };
    LSFS.prototype.getItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        return this.storage[key];
    };
    LSFS.prototype.setItem=function (path, value) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        /*if (key.indexOf("..")>=0) {
            console.log(path,key,value);
        }*/
        assert(key.indexOf("..")<0);
        assert(P.startsWith(key,P.SEP));
        this.storage[key]=value;
    };
    LSFS.prototype.removeItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        delete this.storage[key];
    };
    LSFS.prototype.itemExists=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        return key in this.storage;
    };
    /*LSFS.prototype.inMyFS=function (path){
        return !this.mountPoint || P.startsWith(path, this.mountPoint);
    };*/
    LSFS.prototype.getDirInfo=function getDirInfo(path) {
        assert.is(arguments,[P.AbsDir]);
        if (path == null) throw new Error("getDir: Null path");
        if (!endsWith(path, SEP)) path += SEP;
        assert(this.inMyFS(path));
        var dinfo = {};
        try {
            var dinfos = this.getItem(path);
            if (dinfos) {
                dinfo = JSON.parse(dinfos);
            }
        } catch (e) {
            console.log("dinfo err : " , path , dinfos);
        }
        return dinfo;
    };
    LSFS.prototype.putDirInfo=function putDirInfo(path, dinfo, trashed) {
  	    assert.is(arguments,[P.AbsDir, Object]);
  	    if (!isDir(path)) throw new Error("Not a directory : " + path);
  	    assert(this.inMyFS(path));
  	    this.setItem(path, JSON.stringify(dinfo));
        var ppath = up(path);
        if (ppath == null) return;
        if (!this.inMyFS(ppath)) {
            //assert(this.getRootFS()!==this);
            //this.getRootFS().resolveFS(ppath).touch(ppath);
            return;
        }
        var pdinfo = this.getDirInfo(ppath);
        this._touch(pdinfo, ppath, P.name(path), trashed);
    };
    LSFS.prototype._touch=function _touch(dinfo, path, name, trashed) {
        // path:path of dinfo
        // trashed: this touch is caused by trashing the file/dir.
        assert.is(arguments,[Object, String, String]);
        assert(this.inMyFS(path));
        if (!dinfo[name]) {
            dinfo[name] = {};
            if (trashed) dinfo[name].trashed = true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate = now();
        this.putDirInfo(path, dinfo, trashed);
    };
    LSFS.prototype.removeEntry=function removeEntry(dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            dinfo[name] = {
                lastUpdate: now(),
                trashed: true
            };
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.removeEntryWithoutTrash=function (dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            delete dinfo[name];
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.isRAM=function (){
        return this.storage!==localStorage;
    };
    LSFS.prototype.fstype=function () {
        return (this.isRAM() ? "ramDisk" : "localStorage" );
    };

    // public methods (with resolve fs)
    FS.delegateMethods(LSFS.prototype, {
        isReadOnly: function () {return this.options.readOnly;},
        getReturnTypes: function(path, options) {
            assert.is(arguments,[String]);
            return {
                getContent: String, opendir:[String]
            };
        },
        getContent: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertExist(path); // Do not use this??( because it does not follow symlinks)
            var c;
            if (this.isText(path)) {
                c=Content.plainText(this.getItem(path));
            } else {
                c=Content.url(this.getItem(path));
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            if (this.isText(path)) {
                this.setItem(path, content.toPlainText());
            } else {
                this.setItem(path, content.toURL());
            }
            this.touch(path);
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, {includeTrashed:true});
            assert.is(arguments,[Absolute]);
            if (path==P.SEP) {
                return {};
            }
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return {};
            }
            var name=P.name(path);
            assert.is(parent,P.AbsDir);
            var pinfo=this.getDirInfo(parent);
            return assert(pinfo[name]);
        },
        setMetaInfo: function(path, info, options) {
            assert.is(arguments,[String,Object]);
            this.assertWriteable(path);
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return;
            }
            var pinfo=this.getDirInfo(parent);
            var name=P.name(path);
            pinfo[name]=info;
            this.putDirInfo(parent, pinfo, pinfo[name].trashed);
        },
        mkdir: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
			this.touch(path);
        },
        opendir: function(path, options) {
            assert.is(arguments,[String]);
            //succ: iterator<string> // next()
            // options: {includeTrashed:Boolean}
            options=options||{};
            var inf=this.getDirInfo(path);
            var res=[]; //this.dirFromFstab(path);
            for (var i in inf) {
                assert(inf[i]);
                if (!inf[i].trashed || options.includeTrashed) res.push(i);
            }
            return assert.is(res,Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            this.assertWriteable(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) {
                throw new Error(path+": cannot remove. It is root of this FS.");
            }
            this.assertExist(path,{includeTrashed:options.noTrash });
            if (P.isDir(path)) {
                var lis=this.opendir(path);
                if (lis.length>0) {
                    this.err(path,"Directory not empty");
                }
                if (options.noTrash) {
                    this.removeItem(path);
                }
            } else {
                this.removeItem(path);
            }
            var pinfo=this.getDirInfo(parent);
            if (options.noTrash) {
                this.removeEntryWithoutTrash(pinfo, parent, P.name(path) );
            } else {
                this.removeEntry(pinfo, parent, P.name(path) );
            }
        },
        exists: function (path,options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            var name=P.name(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) return true;
            var pinfo=this.getDirInfo(parent);
            var res=pinfo[name];
            if (res && res.trashed && this.itemExists(path)) {
                if (this.isDir(path)) {

                } else {
                    //assert.fail("Inconsistent "+path+": trashed, but remains in storage");
                }
            }
            if (!res && this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": not exists in metadata, but remains in storage");
            }
            if (res && !res.trashed && !res.link && !this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": exists in metadata, but not in storage");
            }
            if (res && !options.includeTrashed) {
                res=!res.trashed;
            }
            return !!res;
        },
        link: function(path, to, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertWriteable(path);
            if (this.exists(path)) this.err(path,"file exists");
            if (P.isDir(path) && !P.isDir(to)) {
                this.err(path," can not link to file "+to);
            }
            if (!P.isDir(path) && P.isDir(to)) {
                this.err(path," can not link to directory "+to);
            }
            var m={};//assert(this.getMetaInfo(path));
            m.link=to;
            m.lastUpdate=now();
            this.setMetaInfo(path, m);
            //console.log(this.getMetaInfo(path));
            //console.log(this.storage);
            //console.log(this.getMetaInfo(P.up(path)));
            assert(this.exists(path));
            assert(this.isLink(path));
        },
        isLink: function (path) {
            assert.is(arguments,[P.Absolute]);
            if (!this.exists(path)) return null;
            var m=assert(this.getMetaInfo(path));
            return m.link;
        },
        touch: function (path) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
            if (!this.itemExists(path)) {
                if (P.isDir(path)) {
                    this.setItem(path,"{}");
                } else {
                    this.setItem(path,"");
                }
            }
            var parent=up(path);
            if (parent!=null) {
                if (this.inMyFS(parent)) {
                    var pinfo=this.getDirInfo(parent);
                    this._touch(pinfo, parent , P.name(path), false);
                } else {
                    assert(this.getRootFS()!==this);
                    this.getRootFS().resolveFS(parent).touch(parent);
                }
            }
        },
        getURL: function (path) {
            return this.getContent(path).toURL();
        }
    });
    return LSFS;

});
requireSimulator.setName('Env');
define(["assert","PathUtil"],function (A,P) {
    var Env=function (value) {
        this.value=value;
    };
    Env.prototype={
            expand:function (str) {
                A.is(str,String);
                var t=this;
                return str.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (a,key) {
                    return t.get(key);
                });
            },
            expandPath:function (path) {
                A.is(path,String);
                path=this.expand(path);
                path=path.replace(/\/+/g,"/");
                path=path.replace(/^[a-z][a-z]+:\//, function (r) { return r+"/"; } );
                return A.is(path,P.Path);
            },
            get: function (key) {
                return this.value[key];
            },
            set: function (key, value) {
                this.value[key]=value;
            }
    };
    return Env;
});
requireSimulator.setName('SFile');
define(["extend","assert","PathUtil","Util","Content","FS2"],
function (extend,A,P,Util,Content,FS2) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    //A(fs && fs.getReturnTypes, fs);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    this.act={};// path/fs after follwed symlink
    this.act.path=this.fs.resolveLink(path);
    this.act.fs=rootFS.resolveFS(this.act.path);
    A.is(this.act, {fs:FS2, path:P.Absolute});
    if (this.isDir() && !P.isDir(path)) {
        this._path+=P.SEP;
    }
};
SFile.is=function (path) {
    return path && typeof (path.isSFile)=="function" && path.isSFile();
};
function getPath(f) {
    if (SFile.is(f)) {
        return f.path();
    } else {
        A.is(f,P.Absolute);
        return f;
    }
}
SFile.prototype={
    isSFile: function (){return true;},
    setPolicy: function (p) {
        if (this.policy) throw new Error("policy already set");
        this.policy=p;
        return this._clone();
    },
    getPolicy: function (p) {
        return this.policy;
    },
    _clone: function (){
        return this._resolve(this.path());
    },
    _resolve: function (path, options) {
        var res;
        options=options||{};
        if (SFile.is(path)) {
            res=path;
        } else {
            A.is(path,P.Absolute);
            var topdir;
            var policy=options.policy || this.policy;
            if (policy && (topdir=policy.topDir)) {
                if (topdir.path) topdir=topdir.path();
                if (!P.startsWith(path, topdir)) {
                    throw new Error(path+": cannot access. Restricted to "+topdir);
                }
            }
            res=new SFile(this.rootFS, path);
            res.policy=policy;
        }
        if (res.policy) {
            return Util.privatize(res);
        } else {
            return res;
        }
    },
    contains: function (file) {
        A(SFile.is(file),file+" shoud be a SFile object.");
        if (!this.isDir()) return false;
        return P.startsWith( file.path(), this.path());
    },
    path: function () {
        return this._path;
    },
    name: function () {
        return P.name(this.path());
    },
    truncExt: function (ext) {
        return P.truncExt(this.path(),ext);
    },
    ext: function () {
        return P.ext(this.path());
    },
    relPath: function (base) {
        // base should be SFile or Path from rootFS
        var bp=(base.path ?
                base.path() :
                base );
        return P.relPath(this.path(), A.is(bp,P.Absolute) );
    },
    up:function () {
        var pathR=this.path();
        var pa=P.up(pathR);
        if (pa==null) return null;
        return this._resolve(pa);
    },
    rel: function (relPath) {
        A.is(relPath, P.Relative);
        this.assertDir();
        var pathR=this.path();
        return this._resolve(P.rel(pathR, relPath));
    },
    startsWith: function (pre) {
        return P.startsWith(this.name(),pre);
    },
    endsWith: function (post) {
        return P.endsWith(this.name(),post);
    },
    equals:function (o) {
        return (o && typeof o.path=="function" && o.path()==this.path());
    },
    toString:function (){
        return this.path();
    },
    //Common
    touch: function () {
        this.act.fs.touch(this.act.path);
    },
    isReadOnly: function () {
        return this.act.fs.isReadOnly(this.act.path);
    },
    isTrashed:function () {
        var m=this.metaInfo();
        if (!m) return false;
        return m.trashed;
    },
    metaInfo: function () {
        if (arguments.length==0) {
            return this.getMetaInfo.apply(this,arguments);
        } else {
            return this.setMetaInfo.apply(this,arguments);
        }
    },
    getMetaInfo: function (options) {
        return this.act.fs.getMetaInfo(this.act.path,options);
    },
    setMetaInfo: function (info, options) {
        return this.act.fs.setMetaInfo(this.act.path,info, options);
    },
    lastUpdate:function () {
        A(this.exists());
        return this.metaInfo().lastUpdate;
    },
    exists: function (options) {
        options=options||{};
        var p=this.fs.exists(this.path(),options);
        if (p || options.noFollowLink) {
            return p;
        } else {
            return this.act.fs.exists(this.act.path,{noFollowLink:true});
        }
    },
    rm: function (options) {
        //   ln /test/c /a/b/
        //   rm a/b/c/
        //   rm a/b/c/d
        options=options||{};
        if (this.isLink()) {
            return this.fs.rm(this.path(),options);
        }
        /*if (!this.exists({noFollowLink:true})) {
            return this.act.fs.rm(this.act.path, options);
        }*/
        if (this.isDir() && (options.recursive||options.r)) {
            this.each(function (f) {
                f.rm(options);
            });
        }
        return this.act.fs.rm(this.act.path, options);
        //var pathT=this.path();
        //this.fs.rm(pathT, options);
    },
    removeWithoutTrash: function (options) {
        options=options||{};
        options.noTrash=true;
        this.rm(options);
    },
    isDir: function () {
        return this.act.fs.isDir(this.act.path);
    },
    // File
    text:function () {
        if (arguments.length>0) {
            this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        if (this.isText()) {
            this.act.fs.setContent(this.act.path, Content.plainText(t));
        } else {
            this.act.fs.setContent(this.act.path, Content.url(t));
        }
    },
    getContent: function (f) {
        if (typeof f=="function") {
            return this.act.fs.getContentAsync(this.act.path).then(f);
        }
        return this.act.fs.getContent(this.act.path);
    },
    setContent: function (c) {
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function () {
        if (this.isText()) {
            return this.act.fs.getContent(this.act.path).toPlainText();
        } else {
            return this.act.fs.getContent(this.act.path).toURL();
        }
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function () {
        return this.act.fs.getContentType(this.act.path);
    },
    setBytes:function (b) {
        return this.act.fs.setContent(this.act.path, Content.bin(b,this.contentType()));
    },
    getBytes:function (options) {
        options=options||{};
        return this.act.fs.getContent(this.act.path).toBin(options.binType);
    },
    getURL: function () {
        return this.act.fs.getURL(this.act.path);
    },
    lines:function () {
        return this.text().replace(/\r/g,"").split("\n");
    },
    obj: function () {
        var file=this;
        if (arguments.length==0) {
            var t=file.text();
            if (!t) return null;
            return JSON.parse(t);
        } else {
            file.text(JSON.stringify(A.is(arguments[0],Object) ));
        }
    },
    copyFrom: function (src, options) {
        return src.copyTo(this,options);
    },
    copyTo: function (dst, options) {
        A(dst && dst.isSFile(),dst+" is not a file");
        var src=this;
        var options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            A(!dst.isDir(), dst+" is a directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir to file");
        } else if (!srcIsDir && !dstIsDir) {
            if (options.echo) options.echo(src+" -> "+dst);
            var res=this.act.fs.cp(this.act.path, dst.getResolvedLinkPath(),options);
            if (options.a) {
                dst.setMetaInfo(src.getMetaInfo());
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir);
            src.each(function (s) {
                dst.rel(s.name()).copyFrom(s, options);
            });
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        var res=this.copyFrom(src,options);
        src.rm({recursive:true});
        return res;
    },
    // Dir
    assertDir:function () {
        A.is(this.path(),P.Dir);
        return this;
    },
    /*files:function (f,options) {
        var dir=this.assertDir();
        var res=[];
        this.each(function (f) {
            res.add(f);
        },options);
        return res;
    },*/
    each:function (f,options) {
        var dir=this.assertDir();
        dir.listFiles(options).forEach(f);
    },
    recursive:function (fun,options) {
        var dir=this.assertDir();
        dir.each(function (f) {
            if (f.isDir()) f.recursive(fun);
            else fun(f);
        },options);
    },
    listFiles:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var path=this.path();
        var ord;
        if (typeof options=="function") ord=options;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        var di=this.act.fs.opendir(this.act.path, options);
        var res=[];
        for (var i=0;i<di.length; i++) {
            var name=di[i];
            //if (!options.includeTrashed && dinfo[i].trashed) continue;
            if (options.excludes[path+name] ) continue;
            res.push(dir.rel(name));
        }
        if (typeof ord=="function" && res.sort) res.sort(ord);
        return res;
    },
    ls:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var res=dir.listFiles(options);
        return res.map(function (f) {
            return f.name();
        });
    },
    convertOptions:function(options) {
        var dir=this.assertDir();
        var pathR=this.path();
        if (!options) options={};
        if (!options.excludes) options.excludes={};
        if (options.excludes instanceof Array) {
            var excludes={};
            options.excludes.forEach(function (e) {
                if (P.startsWith(e,"/")) {
                    excludes[e]=1;
                } else {
                    excludes[pathR+e]=1;
                }
            });
            options.excludes=excludes;
        }
        return A.is(options,{excludes:{}});
    },
    mkdir: function () {
        this.touch();
    },
    link: function (to,options) {// % ln to path
        if (this.exists()) throw new Error(this.path()+": exists.");
        return this.act.fs.link(this.act.path,to.path(),options);
    },
    resolveLink:function () {
        return this._resolve(this.act.path);
    },
    isLink: function () {
        return this.fs.isLink(this.path());
    },
    getResolvedLinkPath: function () {
        return this.act.path;
    }
};
return SFile;
});

requireSimulator.setName('RootFS');
define(["assert","FS2","PathUtil","SFile"], function (assert,FS,P,SFile) {
    var RootFS=function (defaultFS){
        assert.is(defaultFS,FS);
        this.mount(null, defaultFS);
    };
    var dst=RootFS.prototype;
    var p={
            err: function (path, mesg) {
                throw new Error(path+": "+mesg);
            },
            // mounting
            fstab: function () {
                return this._fstab=this._fstab||[];//[{fs:this, path:P.SEP}];
            },
            unmount: function (path, options) {
                assert.is(arguments,[P.AbsDir] );
                var t=this.fstab();
                console.log(t);
                for (var i=0; i<t.length; i++) {
                    if (t[i].mountPoint==path) {
                        t.splice(i,1);
                        return true;
                    }
                }
                return false;
            },
            availFSTypes:function (){
                return FS.availFSTypes();
            },
            mount: function (path, fs, options) {
                if (typeof fs=="string") {
                    var fact=assert( FS.availFSTypes()[fs] ,"fstype "+fs+" is undefined.");
                    fs=fact(path, options||{});
                }
                assert.is(fs,FS);
                fs.mounted(this, path);
                this.fstab().unshift(fs);
            },
            resolveFS:function (path, options) {
                assert.is(path,P.Absolute);
                var res;
                this.fstab().forEach(function (fs) {
                    if (res) return;
                    if (fs.inMyFS(path)) {
                        res=fs;
                    }
                });
                if (!res) this.err(path,"Cannot resolve");
                return assert.is(res,FS);
            },
            get: function (path) {
                assert.is(path,P.Absolute);
                return new SFile(this.resolveFS(path), path);
            }
    };
    for (var i in p) {
        dst[i]=p[i];
    }
    return RootFS;
});
requireSimulator.setName('FS');
define(["FS2","WebSite","NativeFS","LSFS", "PathUtil","Env","assert","SFile","RootFS"],
        function (FS,WebSite,NativeFS,LSFS, P,Env,A,SFile,RootFS) {
    var FS={};
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env(WebSite);
    if (WebSite.isNW) {
        rootFS=new RootFS(new NativeFS());
    } else {
        rootFS=new RootFS(new LSFS(localStorage));
    }
    FS.getRootFS=function () {return rootFS;};
    FS.get=function () {
        return rootFS.get.apply(rootFS,arguments);
    };
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
    FS.mount=function () {
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        return rootFS.unmount.apply(rootFS,arguments);
    };
    return FS;
});
requireSimulator.setName('plugins');
define(["WebSite"],function (WebSite){
    var plugins={};
    var installed= {
        box2d:{src: "Box2dWeb-2.1.a.3.min.js",detection:/BodyActor/,symbol:"Box2D" },
        timbre: {src:"timbre.js",detection:/\bplay(SE)?\b/,symbol:"T" }
    };
    plugins.installed=installed;
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
        setTimeout(loadNext,0);
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
        if (location.href.match(/^file:/)) {
            $("<script>").attr("src",src).appendTo("body");
            setTimeout(options.onload,500);
        } else {
            $.getScript(src, options.onload);
        }
    };
    plugins.request=function (name) {
        if (plugins.loaded(name)) return;
        var req=new Error("Plugin "+name+" required");
        req.pluginName=name;
    };
    return plugins;
});
requireSimulator.setName('DeferredUtil');
define([], function () {
    var DU;
    DU={
            ensureDefer: function (v) {
                var d=new $.Deferred;
                var isDeferred;
                $.when(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            d.resolve(r);
                        },0);
                    } else {
                        d.resolve(r);
                    }
                }).fail(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            d.reject(r);
                        },0);
                    } else {
                        d.reject(r);
                    }
                });
                isDeferred=true;
                return d.promise();
            },
            directPromise:function (v) {
                var d=new $.Deferred;
                setTimeout(function () {d.resolve(v);},0);
                return d.promise();
            },
            then: function (f) {
                return DU.directPromise().then(f);
            },
            timeout:function (timeout) {
                var d=new $.Deferred;
                setTimeout(function () {d.resolve();},timeout);
                return d.promise();
            },
            funcPromise:function (f) {
                var d=new $.Deferred;
                f(function (v) {
                    d.resolve(v);
                },function (e) {
                    d.reject(e);
                });
                return d.promise();
            },
            throwPromise:function (e) {
                var d=new $.Deferred;
                setTimeout(function () {
                    d.reject(e);
                }, 0);
                return d.promise();
            },
            throwF: function (f) {
                return function () {
                    try {
                        return f.apply(this,arguments);
                    } catch(e) {
                        console.log(e,e.stack);
                        return DU.throwPromise(e);
                    }
                };
            },
            each: function (set,f) {
                if (set instanceof Array) {
                    return DU.loop(function (i) {
                        if (i>=set.length) return DU.brk();
                        return $.when(f(set[i],i)).then(function () {
                            return i+1;
                        });
                    },0);
                } else {
                    var objs=[];
                    for (var i in set) {
                        objs.push({k:i,v:set[i]});
                    }
                    return DU.each(objs,function (e) {
                        return f(e.k, e.v);
                    });
                }
            },
            loop: function (f,r) {
                return DU.directPromise(r).then(DU.throwF(function () {
                    var r=f.apply(this,arguments);
                    if (r.DU_BRK) return r.res;
                    return $.when(r).then(function (r) {
                        return DU.loop(f,r);
                    });
                }));
            },
            brk: function (res) {
                return {DU_BRK:true,res:res};
            }
    };
    return DU;
});
requireSimulator.setName('compiledProject');
define(["DeferredUtil"], function (DU) {
    var CPR=function (ns, url) {
        return {
            getNamespace:function () {return ns;},
            sourceDir: function () {return null;},
            getDependingProjects: function () {return [];},// virtual
            loadDependingClasses: function (ctx) {
                //Same as projectCompiler /TPR/this/ (XXXX)
                var task=DU.directPromise();
                var myNsp=this.getNamespace();
                this.getDependingProjects().forEach(function (p) {
                    if (p.getNamespace()==myNsp) return;
                    task=task.then(function () {
                        return p.loadClasses(ctx);
                    });
                });
                return task;
            },
            loadClasses: function (ctx) {
                console.log("Load compiled classes ns=",ns,"url=",url);
                var d=new $.Deferred;
                var head = document.getElementsByTagName("head")[0] || document.documentElement;
                var script = document.createElement("script");
                script.src = url;
                var done = false;
                script.onload = script.onreadystatechange = function() {
                    if ( !done && (!this.readyState ||
                            this.readyState === "loaded" || this.readyState === "complete") ) {
                        done = true;
                        script.onload = script.onreadystatechange = null;
                        if ( head && script.parentNode ) {
                            head.removeChild( script );
                        }
                        console.log("Done Load compiled classes ns=",ns,"url=",url,Tonyu.classes);
                        //same as projectCompiler (XXXX)
                        /*var cls=Tonyu.classes;
                        ns.split(".").forEach(function (c) {
                            if (cls) cls=cls[c];
                            // comment out : when empty concat.js
                            //if (!cls) throw new Error("namespace Not found :"+ns);
                        });
                        if (cls) {
                            for (var cln in cls) {
                                var cl=cls[cln];
                                var m=Tonyu.klass.getMeta(cl);
                                ctx.classes[m.fullName]=m;
                            }
                        }*/
                        //------------------XXXX
                        d.resolve();
                    }
                };
                this.loadDependingClasses(ctx).then(function () {
                    head.insertBefore( script, head.firstChild );
                });
                return d.promise();
            }
        }
    };
    return CPR;
});
requireSimulator.setName('compiledTonyuProject');
define(["plugins","compiledProject"], function (plugins,CPR) {
    var CPTR=function (ns, url, dir) {
        var cpr=CPR(ns,url);
        var kernelProject=CPR("kernel", WebSite.compiledKernel);

        var m={
                getDir: function () {return dir;},
                getDependingProjects:function () {//override
                    return [kernelProject];
                },
                getOptions: function () {
                    var resFile=this.getDir().rel("options.json");
                    return resFile.obj();
                },
                getResource: function () {
                    var resFile=this.getDir().rel("res.json");
                    return resFile.obj();
                },
                loadPlugins: function (onload) {
                    var opt=this.getOptions();
                    return plugins.loadAll(opt.plugins,onload);
                },
                requestPlugin:function(){},
                run: function (bootClassName) {
                    var ctx={classes:Tonyu.classMetas};
                    this.loadClasses(ctx).then(function () {
                        Tonyu.run(bootClassName);
                    });
                }
        };
        for (var k in m) cpr[k]=m[k];
        return cpr;
    };
    return CPTR;
});
requireSimulator.setName('Shell');
define(["FS","Util","WebSite","PathUtil","assert"],
        function (FS,Util,WebSite,PathUtil,assert) {
    var Shell={};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir,true);
        return Shell.pwd();
    };
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (mustExist && !r.exists()) throw r+": no such file or directory";
        return r;
    }

    Shell.mount=function (options, path) {
        //var r=resolve(path);
        if (!options || !options.t) {
            var fst=[];
            for (var k in FS.getRootFS().availFSTypes()) {
                fst.push(k);
            }
            sh.err("-t=("+fst.join("|")+") should be specified.");
            return;
        }
        FS.mount(path,options.t, options);
    };
    Shell.unmount=function (path) {
        FS.unmount(path);
    };
    Shell.fstab=function () {
        var rfs=FS.getRootFS();
        var t=rfs.fstab();
        var sh=this;
        //sh.echo(rfs.fstype()+"\t"+"<Root>");
        t.forEach(function (fs) {
            sh.echo(fs.fstype()+"\t"+(fs.mountPoint||""));
        });
    }
    Shell.resolve=resolve;
    function resolve2(v) {
        if (typeof v!="string") return v;
        if (PathUtil.isAbsolutePath(v)) return FS.get(v);
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
            options.echo=Shell.echo.bind(Shell);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        return f.copyTo(t,options);
    };
    Shell.ln=function (to , from ,options) {
        var f=resolve(from);
        var t=resolve(to, true);
        if (f.isDir() && f.exists()) {
            f=f.rel(t.name());
        }
        if (f.exists()) {
            throw new Error(f+" exists");
        }
        return f.link(t,options);
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
        return Shell.echo(file.getContent(function (c) {
            if (file.isText()) {
                return c.toPlainText();
            } else {
                return c.toURL();
            }
        }));
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

requireSimulator.setName('Class');
define(["assert"],function (A) {
    function Class() {
        var superClass,defs;
        if (arguments.length==2) {
            superClass=A.is(arguments[0],Function);
            defs=A.is(arguments[1],Object);
        } else if (arguments.length==1) {
            superClass=Object;
            defs=A.is(arguments[0],Object);
        }
        var c=defs.initialize || function (){};
        var p=c.prototype;
        for (var m in defs) {
            p[m]=defs[m];
        }
        p.callSuper=function () {
            var a=[];
            for (var i=0; arguments.length;i++) {
                a.push(arguments[i]);
            }
            var n=A.is(a.shift(),String);
            var f=A.is(superClass.prototype[n], Function);
            return f.apply(this,a);
        };
        return c;
    }
    return Class;
});
requireSimulator.setName('Tonyu.Thread');
define(["DeferredUtil","Class"],function (DU,Class) {
    var cnts={enterC:{},exitC:0};
    try {window.cnts=cnts;}catch(e){}
    var TonyuThread=Class({
        initialize: function TonyuThread() {
            this.frame=null;
            this._isDead=false;
            //this._isAlive=true;
            this.cnt=0;
            this._isWaiting=false;
            this.fSuspended=false;
            this.tryStack=[];
            this.preemptionTime=60;
            this.onEndHandlers=[];
            this.onTerminateHandlers=[];
            this.age=0; // inc if object pooled
        },
        isAlive:function isAlive() {
            return !this.isDead();
            //return this.frame!=null && this._isAlive;
        },
        isDead: function () {
            return this._isDead=this._isDead || (this.frame==null) ||
            (this._threadGroup && (
                    this._threadGroup.objectPoolAge!=this.tGrpObjectPoolAge ||
                    this._threadGroup.isDeadThreadGroup()
            ));
        },
        setThreadGroup: function setThreadGroup(g) {// g:TonyuThread
            this._threadGroup=g;
            this.tGrpObjectPoolAge=g.objectPoolAge;
            //if (g) g.add(fb);
        },
        isWaiting:function isWaiting() {
            return this._isWaiting;
        },
        suspend:function suspend() {
            this.fSuspended=true;
            this.cnt=0;
        },
        enter:function enter(frameFunc) {
            //var n=frameFunc.name;
            //cnts.enterC[n]=(cnts.enterC[n]||0)+1;
            this.frame={prev:this.frame, func:frameFunc};
        },
        apply:function apply(obj, methodName, args) {
            if (!args) args=[];
            var method;
            if (typeof methodName=="string") {
                method=obj["fiber$"+methodName];
                if (!method) {
                    throw new Error("メソッド"+methodName+"が見つかりません");
                }
            }
            if (typeof methodName=="function") {
                method=methodName.fiber;
            }
            args=[this].concat(args);
            var pc=0;
            return this.enter(function (th) {
                switch (pc){
                case 0:
                    method.apply(obj,args);
                    pc=1;break;
                case 1:
                    th.termStatus="success";
                    th.notifyEnd(th.retVal);
                    args[0].exit();
                    pc=2;break;
                }
            });
        },
        notifyEnd:function (r) {
            this.onEndHandlers.forEach(function (e) {
                e(r);
            });
            this.notifyTermination({status:"success",value:r});
        },
        notifyTermination:function (tst) {
            this.onTerminateHandlers.forEach(function (e) {
                e(tst);
            });
        },
        on: function (type,f) {
            if (type==="end"||type==="success") this.onEndHandlers.push(f);
            if (type==="terminate") {
                this.onTerminateHandlers.push(f);
                if (this.handleEx) delete this.handleEx;
            }
        },
        promise: function () {
            var fb=this;
            return DU.funcPromise(function (succ,err) {
                fb.on("terminate",function (st) {
                    if (st.status==="success") {
                        succ(st.value);
                    } else if (st.status==="exception"){
                        err(st.exception);
                    } else {
                        err(new Error(st.status));
                    }
                });
            });
        },
        then: function (succ,err) {
            if (err) return this.proimse().then(succ,err);
            else return this.proimse().then(succ);
        },
        fail: function (err) {
            return this.promise().fail(err);
        },
        gotoCatch: function gotoCatch(e) {
            var fb=this;
            if (fb.tryStack.length==0) {
                fb.termStatus="exception";
                fb.kill();
                if (fb.handleEx) fb.handleEx(e);
                else fb.notifyTermination({status:"exception",exception:e});
                return;
            }
            fb.lastEx=e;
            var s=fb.tryStack.pop();
            while (fb.frame) {
                if (s.frame===fb.frame) {
                    fb.catchPC=s.catchPC;
                    break;
                } else {
                    fb.frame=fb.frame.prev;
                }
            }
        },
        startCatch: function startCatch() {
            var fb=this;
            var e=fb.lastEx;
            fb.lastEx=null;
            return e;
        },
        exit: function exit(res) {
            //cnts.exitC++;
            this.frame=(this.frame ? this.frame.prev:null);
            this.retVal=res;
        },
        enterTry: function enterTry(catchPC) {
            var fb=this;
            fb.tryStack.push({frame:fb.frame,catchPC:catchPC});
        },
        exitTry: function exitTry() {
            var fb=this;
            fb.tryStack.pop();
        },
        waitEvent: function waitEvent(obj,eventSpec) { // eventSpec=[EventType, arg1, arg2....]
            var fb=this;
            fb.suspend();
            if (!obj.on) return;
            var h;
            eventSpec=eventSpec.concat(function () {
                fb.lastEvent=arguments;
                fb.retVal=arguments[0];
                h.remove();
                fb.steps();
            });
            h=obj.on.apply(obj, eventSpec);
        },
        runAsync: function runAsync(f) {
            var fb=this;
            var succ=function () {
                fb.retVal=arguments;
                fb.steps();
            };
            var err=function () {
                var msg="";
                for (var i=0; i<arguments.length; i++) {
                    msg+=arguments[i]+",";
                }
                if (msg.length==0) msg="Async fail";
                var e=new Error(msg);
                e.args=arguments;
                fb.gotoCatch(e);
                fb.steps();
            };
            fb.suspend();
            setTimeout(function () {
                f(succ,err);
            },0);
        },
        waitFor: function waitFor(j) {
            var fb=this;
            fb._isWaiting=true;
            fb.suspend();
            if (j instanceof TonyuThread) j=j.promise();
            return DU.ensureDefer(j).then(function (r) {
                fb.retVal=r;
                fb.steps();
            }).fail(function (e) {
                if (e instanceof Error) {
                    fb.gotoCatch(e);
                } else {
                    var re=new Error(e);
                    re.original=e;
                    fb.gotoCatch(re);
                }
                fb.steps();
            });
        },
        resume: function (retVal) {
            this.retVal=retVal;
            this.steps();
        },
        steps: function steps() {
            var fb=this;
            if (fb.isDead()) return;
            var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            fb.cnt=fb.preemptionTime;
            fb.preempted=false;
            fb.fSuspended=false;
            while (fb.cnt>0 && fb.frame) {
                try {
                    //while (new Date().getTime()<lim) {
                    while (fb.cnt-->0 && fb.frame) {
                        fb.frame.func(fb);
                    }
                    fb.preempted= (!fb.fSuspended) && fb.isAlive();
                } catch(e) {
                    fb.gotoCatch(e);
                }
            }
            Tonyu.currentThread=sv;
        },
        kill: function kill() {
            var fb=this;
            //fb._isAlive=false;
            fb._isDead=true;
            fb.frame=null;
            if (!fb.termStatus) {
                fb.termStatus="killed";
                fb.notifyTermination({status:"killed"});
            }
        },
        clearFrame: function clearFrame() {
            this.frame=null;
            this.tryStack=[];
        }
    });
    return TonyuThread;
});

requireSimulator.setName('Tonyu.Iterator');
define(["Class"], function (Class) {
    var ArrayValueIterator=Class({
        initialize: function ArrayValueIterator(set) {
            this.set=set;
            this.i=0;
        },
        next:function () {
            if (this.i>=this.set.length) return false;
            this[0]=this.set[this.i];
            this.i++;
            return true;
        }
    });
    var ArrayKeyValueIterator=Class({
        initialize: function ArrayKeyValueIterator(set) {
            this.set=set;
            this.i=0;
        },
        next:function () {
            if (this.i>=this.set.length) return false;
            this[0]=this.i;
            this[1]=this.set[this.i];
            this.i++;
            return true;
        }
    });
    var ObjectKeyIterator=Class({
        initialize: function ObjectKeyIterator(set) {
            this.elems=[];
            for (var k in set) {
                this.elems.push(k);
            }
            this.i=0;
        },
        next:function () {
            if (this.i>=this.elems.length) return false;
            this[0]=this.elems[this.i];
            this.i++;
            return true;
        }
    });
    var ObjectKeyValueIterator=Class({
        initialize: function ObjectKeyValueIterator(set) {
            this.elems=[];
            for (var k in set) {
                this.elems.push([k,set[k]]);
            }
            this.i=0;
        },
        next:function () {
            if (this.i>=this.elems.length) return false;
            this[0]=this.elems[this.i][0];
            this[1]=this.elems[this.i][1];
            this.i++;
            return true;
        }
    });


    function IT(set, arity) {
        //var res={};
       if (set.tonyuIterator) {
    	   return set.tonyuIterator(arity);
       } else if (set instanceof Array) {
           //res.i=0;
           if (arity==1) {
               return new ArrayValueIterator(set);
               /*res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=set[res.i];
                   res.i++;
                   return true;
               };*/
           } else {
               return new ArrayKeyValueIterator(set);
               /*res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=res.i;
                   this[1]=set[res.i];
                   res.i++;
                   return true;
               };*/
           }
       } else if (set instanceof Object){
           //res.i=0;
           //var elems=[];
           if (arity==1) {
               return new ObjectKeyIterator(set);
               /*for (var k in set) {
                   elems.push(k);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i];
                   res.i++;
                   return true;
               };*/
           } else {
               return new ObjectKeyValueIterator(set);
               /*for (var k in set) {
                   elems.push([k, set[k]]);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i][0];
                   this[1]=elems[res.i][1];
                   res.i++;
                   return true;
               };*/
           }
       } else {
           console.log(set);
           throw new Error(set+" is not iterable");
       }
       return res;
   }

//   Tonyu.iterator=IT;
    return IT;
});
requireSimulator.setName('Tonyu');
if (typeof define!=="function") {
    define=require("requirejs").define;
}
define(["assert","Tonyu.Thread","Tonyu.Iterator","DeferredUtil"],
        function (assert,TT,IT,DU) {
return Tonyu=function () {
    var preemptionTime=60;
    function thread() {
        var t=new TT;
        t.handleEx=handleEx;
        return t;
    }
    function timeout(t) {
        return DU.funcPromise(function (s) {
            setTimeout(s,t);
        });
    }
    function animationFrame() {
        return DU.funcPromise( function (f) {
            requestAnimationFrame(f);
        });
    }

    function handleEx(e) {
        if (Tonyu.onRuntimeError) {
            Tonyu.onRuntimeError(e);
        } else {
            if (typeof $LASTPOS=="undefined") $LASTPOS=0;
            alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
            console.log(e.stack);
            throw e;
        }
    }
    klass=function () {
        alert("この関数は古くなりました。コンパイルをやり直してください。 Deprecated. compile again.");
        throw new Error("この関数は古くなりました。コンパイルをやり直してください。 Deprecated. compile again.");
    };
    klass.addMeta=addMeta;
    function addMeta(fn,m) {
        assert.is(arguments,[String,Object]);
        return extend(klass.getMeta(fn), m);
    }
    klass.removeMeta=function (n) {
        delete classMetas[n];
    };
    klass.getMeta=function (k) {// Class or fullName
        if (typeof k=="function") {
            return k.meta;
        } else if (typeof k=="string"){
            var mm = classMetas[k];
            if (!mm) classMetas[k]=mm={};
            return mm;
        }
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
        return o;
    };
    Function.prototype.constructor=function () {
        throw new Error("This method should not be called");
    };
    klass.define=function (params) {
        // fullName, shortName,namspace, superclass, includes, methods:{name/fiber$name: func}, decls
        var parent=params.superclass;
        var includes=params.includes;
        var fullName=params.fullName;
        var shortName=params.shortName;
        var namespace=params.namespace;
        var methods=params.methods;
        var decls=params.decls;
        var nso=klass.ensureNamespace(Tonyu.classes, namespace);
        var prot=methods;
        var init=prot.initialize;
        delete prot.initialize;
        var res;
        res=(init?
            /*(parent? function () {
                if (!(this instanceof res)) useNew(fullName);
                if (Tonyu.runMode) init.apply(this,arguments);
                else parent.apply(this,arguments);
            }:function () {
                if (!(this instanceof res)) useNew(fullName);
                if (Tonyu.runMode) init.apply(this,arguments);
            })*/
            function () {
                if (!(this instanceof res)) useNew(fullName);
                init.apply(this,arguments);
            }:
            (parent? function () {
                if (!(this instanceof res)) useNew(fullName);
                parent.apply(this,arguments);
            }:function (){
                if (!(this instanceof res)) useNew(fullName);
            })
        );
        nso[shortName]=res;
        res.methods=prot;
        includes.forEach(function (m) {
            if (!m.methods) throw m+" Does not have methods";
            for (var n in m.methods) {
                if (!(n in prot)) {
                    prot[n]=m.methods[n];
                }
            }
        });
        var props={};
        var propReg=/^__([gs]et)ter__(.*)$/;
        for (var k in prot) {
            if (k.match(/^fiber\$/)) continue;
            if (prot["fiber$"+k]) {
                prot[k].fiber=prot["fiber$"+k];
                prot[k].fiber.methodInfo={name:k,klass:res,fiber:true};
            }
            prot[k].methodInfo={name:k,klass:res};
            var r=propReg.exec(k);
            if (r) {
                props[r[2]]=props[r[2]]||{};
                props[r[2]][r[1]]=prot[k];
            }
        }
        res.prototype=bless(parent, prot);
        res.prototype.isTonyuObject=true;
        for (var k in props) {
            Object.defineProperty(res.prototype, k , props[k]);
        }
        res.meta=addMeta(fullName,{
            fullName:fullName,shortName:shortName,namepsace:namespace,decls:decls,
            superclass:parent ? parent.meta : null,func:res,
            includes:includes.map(function(c){return c.meta;})
        });
        var m=klass.getMeta(res);
        res.prototype.getClassInfo=function () {
            return m;
        };
        return res;
    };
    klass.isSourceChanged=function (k) {
        k=k.meta||k;
        if (k.src && k.src.tonyu) {
            if (!k.nodeTimestamp) return true;
            return k.src.tonyu.lastUpdate()> k.nodeTimestamp;
        }
        return false;
    };
    klass.shouldCompile=function (k) {
        k=k.meta||k;
        if (klass.isSourceChanged(k)) return true;
        var dks=klass.getDependingClasses(k);
        for (var i=0 ; i<dks.length ;i++) {
            if (klass.shouldCompile(dks[i])) return true;
        }
    };
    klass.getDependingClasses=function (k) {
        k=k.meta||k;
        var res=[];
        if (k.superclass) res=[k.superclass];
        if (k.includes) res=res.concat(k.includes);
        return res;
    };
    function bless( klass, val) {
        if (!klass) return val;
        return extend( Object.create(klass.prototype) , val);
        //return extend( new klass() , val);
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
    var classes={};// classes.namespace.classname= function
    var classMetas={}; // classes.namespace.classname.meta ( or env.classes / ctx.classes)
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
        if (typeof meth!="function") return meth;
        var res=function () {
            return meth.apply(t,arguments);
        };
        res.methodInfo=Tonyu.extend({thiz:t},meth.methodInfo||{});
        if (meth.fiber) {
            res.fiber=function fiber_func() {
                return meth.fiber.apply(t,arguments);
            };
            res.fiber.methodInfo=Tonyu.extend({thiz:t},meth.fiber.methodInfo||{});
        }
        return res;
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
    function useNew(c) {
        throw new Error("クラス名"+c+"はnewをつけて呼び出して下さい。");
    }
    function not_a_tonyu_object(o) {
        console.log("Not a tonyu object: ",o);
        throw new Error(o+" is not a tonyu object");
    }
    function hasKey(k, obj) {
        return k in obj;
    }
    function run(bootClassName) {
        var bootClass=getClass(bootClassName);
        if (!bootClass) throw new Error( bootClassName+" というクラスはありません");
        Tonyu.runMode=true;
        var boot=new bootClass();
        var th=thread();
        th.apply(boot,"main");
        var TPR;
        if (TPR=Tonyu.currentProject) {
            TPR.runningThread=th;
            TPR.runningObj=boot;
        }
        $LASTPOS=0;
        th.steps();
    }
    return Tonyu={thread:thread, /*threadGroup:threadGroup,*/ klass:klass, bless:bless, extend:extend,
            globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
            timeout:timeout,animationFrame:animationFrame, /*asyncResult:asyncResult,*/
            bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,
            hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
            run:run,iterator:IT,
            VERSION:1500189381377,//EMBED_VERSION
            A:A};
}();
});
requireSimulator.setName('PatternParser');
define(["Tonyu"], function (Tonyu) {
    var PP=function (img, options) {
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
    };
    Tonyu.extend(PP.prototype,{
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
                    return [{image: this.img, x:0, y:0, width:this.width, height:this.height}];
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

    });
    return PP;
});
requireSimulator.setName('Assets');
define(["WebSite","Util","Tonyu"],function (WebSite,Util,Tonyu) {
    var Assets={};
    Assets.resolve=function (url, baseDir) {
        if (url==null) url="";
        url=url.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (t,name) {
            return WebSite[name];
        });
        if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
        if (Util.startsWith(url,"ls:")) {
            var rel=url.substring("ls:".length);
            if (!baseDir) throw new Error("Basedir not specified");
            var f=baseDir.rel(rel);
            if (!f.exists()) throw new Error("Resource file not found: "+f);
            if (WebSite.mp3Disabled && rel.match(/\.(mp3|mp4|m4a)$/)) {
                var oggf=baseDir.rel(rel.replace(/\.(mp3|mp4|m4a)$/,".ogg"));
                if (oggf.exists()) {
                    f=oggf;
                }
            }
            url=f.getURL();
        }
        return url;
    };
    Tonyu.Assets=Assets;
    return Assets;
});
requireSimulator.setName('ImageList');
define(["PatternParser","Util","Assets","assert"], function (PP,Util,Assets,assert) {
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
        if (cnt==0) setTimeout(function () {
            var res=[];
            res.names={};
            onLoad(res);
        },0);
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
                if (resImg.type=="single") {
                    resa[i]=[{image:this, x:0,y:0, width:this.width, height:this.height}];
                } else if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
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
                assert.is(resa[i],Array);
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
        return assert.is(res,Array);
    };
	IL.convURL=function (url, baseDir) {
	    /*if (url==null) url="";
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
	    return url;*/
	    return Assets.resolve(url, baseDir);
	};
	window.ImageList=IL;
    return IL;
});
requireSimulator.setName('PicoAudio');
var PicoAudio = (function(){
	function PicoAudio(_audioContext, _picoAudio){
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = _audioContext ? _audioContext : new AudioContext();
		this.settings = {
			masterVolume: 1,
			generateVolume: 0.15,
			tempo: 120,
			basePitch: 440,
			resolution: 480,
			hashLength: this.isAndroid() ? 25 : 50,
			hashBuffer: 2,
			isWebMIDI: false,
			WebMIDIPortOutputs: null,
			WebMIDIPortOutput: null,
			WebMIDIPort: -1, // -1:auto
			WebMIDIPortSysEx: true, // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない？)
			isReverb: !this.isAndroid(), // Android以外はリバーブON
			reverbVolume: 1.5,
			isChorus: true,
			chorusVolume: 0.5,
			isCC111: true,
			dramMaxPlayLength: 0.5, // ドラムで一番長い音の秒数
			loop: false
		};
		this.trigger = { isNoteTrigger: true, noteOn: function(){}, noteOff: function(){}, songEnd: function(){} };
		this.states = { isPlaying: false, playIndex:0, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0 };
		this.hashedDataList = [];
		this.hashedMessageList = [];
		this.channels = [];
		this.tempoTrack = [{ timing:0, value:120 },{ timing:0, value:120 }];
		this.cc111Time = -1;
		for(var i=0; i<17; i++)
			this.channels.push([0,0,1]);
		if(_picoAudio && _picoAudio.whitenoise){ // 使いまわし
			this.whitenoise = _picoAudio.whitenoise;
		} else {
			this.whitenoise = this.context.createBuffer(2, this.context.sampleRate, this.context.sampleRate);
			for (var ch=0; ch<2; ch++){
				for (var i=0; i<this.context.sampleRate; i++){
					this.whitenoise.getChannelData(ch)[i] = Math.random() * 2 - 1;
				}
			}
		}
		// リアルタイムで音量変更するためにdestination前にgainNodeを一つ噛ませる
		this.masterGainNode = this.context.createGain();
		this.masterGainNode.gain.value = this.settings.masterVolume;
		// リバーブ用のインパルス応答音声データ作成（てきとう）
		if(_picoAudio && _picoAudio.impulseResponse){ // 使いまわし
			this.impulseResponse = _picoAudio.impulseResponse;
		} else {
			var sampleLength = this.context.sampleRate*3.5;
			this.impulseResponse = this.context.createBuffer(2, sampleLength, this.context.sampleRate);
			for(var ch = 0; ch<2; ch++){
				var buf = this.impulseResponse.getChannelData(ch);
				for (var i = 0; i<sampleLength; i++) {
					var v = ((sampleLength-i)/sampleLength);
					var s = i/this.context.sampleRate;
					var r = i/sampleLength;
					var d = (s < 0.030 ? 0 : v)
					*(s >= 0.030 && s < 0.031 ? v*2 : v)
					*(s >= 0.040 && s < 0.042 ? v*1.5 : v)
					*(s >= 0.050 && s < 0.054 ? v*1.25 : v)
					*Math.random()*0.2*Math.pow((v-0.030), 4);
					buf[i] = d;
				}
			}
		}
		// リバーブ用（convolverは重いので１つだけ作成）
		if(false && _picoAudio && _picoAudio.convolver){ // 使いまわし→リバーブの音量をミュートにできないので使いまわししない
			this.convolver = _picoAudio.convolver;
		} else {
			//for (var i=0; i<16; i++) {
			this.convolver = this.context.createConvolver();
			this.convolver.buffer = this.impulseResponse;
			this.convolver.normalize = false;
			this.convolverGainNode = this.context.createGain();
			this.convolverGainNode.gain.value = this.settings.reverbVolume;
			this.convolver.connect(this.convolverGainNode);
			this.convolverGainNode.connect(this.masterGainNode);
			this.masterGainNode.connect(this.context.destination);
			//}
		}
		
		if(false && _picoAudio && _picoAudio.chorusDelayNode){ // 使いまわし→コーラスの音量をミュートにできないので使いまわししない
			this.chorusDelayNode = _picoAudio.chorusDelayNode;
		} else {
			//for (var i=0; i<16; i++) {
			this.chorusDelayNode = this.context.createDelay();
			this.chorusGainNode = this.context.createGain();
			this.chorusOscillator = this.context.createOscillator();
			this.chorusLfoGainNode = this.context.createGain();
			this.chorusDelayNode.delayTime.value = 0.025;
			this.chorusLfoGainNode.gain.value = 0.010; 
			this.chorusOscillator.frequency.value = 0.05; 
			this.chorusGainNode.gain.value = this.settings.chorusVolume;
			this.chorusOscillator.connect(this.chorusLfoGainNode);
			this.chorusLfoGainNode.connect(this.chorusDelayNode.delayTime);
			this.chorusDelayNode.connect(this.chorusGainNode);
			this.chorusGainNode.connect(this.masterGainNode);
			this.masterGainNode.connect(this.context.destination);
			this.chorusOscillator.start(0);
			//}
		}
		
		this.onSongEndListener = null;
	}

	PicoAudio.prototype.createNote = function(option){
		var nonStop = false;
		if(option.channel){
			switch(this.channels[option.channel][1]/10 || option.instrument){
				case 0.2:
				case 12: case 13: case 45: case 55:
					nonStop = true;
					break; // ピッチカート系減衰は後でstopさせる
			}
		}
		var note = this.createBaseNote(option, true, false, nonStop);
		var oscillator = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
		var noiseCutGainNode = note.noiseCutGainNode;
		var isPizzicato = false;
		var that = this;
		// 音色別の音色振り分け 書き方(ry
		switch(this.channels[note.channel][0]/10 || option.instrument){
			// Sine
			case 0.1:
			case  6: case 15: case 24: case 26: case 46: case 50: case 51:
			case 52: case 53: case 54: case 82: case 85: case 86:
			{
				oscillator.type = "sine";
				gainNode.gain.value *= 1.5;
				break;
			}
			// Square
			case 0.2:
			case  4: case 12: case 13: case 16: case 19: case 20: case 32: case 34: case 45: case 48: case 49:
			case 55: case 56: case 57: case 61: case 62: case 63: case 71: case 72: case 73: case 74: case 75:
			case 76: case 77: case 78: case 79: case 80: case 84:
			{
				oscillator.type = "square";
				gainNode.gain.value *= 0.8;
				break;
			}
			// Sawtooth
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  7: case 17: case 18: case 21: case 22: case 23:
			case 27: case 28: case 29: case 30: case 36: case 37: case 38: case 39: case 40: case 41: case 42:
			case 43: case 44: case 47: case 59: case 64: case 65: case 66: case 67: case 68: case 69: case 70:
			case 71: case 82: case 87:
			{
				oscillator.type = "sawtooth";
				break;
			}
			// Triangle
			case 0.4:
			case  8: case  9: case 10: case 11: case 14: case 25: case 31: case 33: case 35: case 58: case 60:
			case 83: case 88: case 89: case 90: case 91: case 92: case 93: case 94: case 95:
			{
				oscillator.type = "triangle";
				gainNode.gain.value *= 1.5;
				break;
			}
			// Other - Square
			default:{
				oscillator.type = "square";
			}
		}
		// 音色別の減衰　書き方ミスったなあ
		switch(this.channels[note.channel][1]/10 || option.instrument){
			// 
			case 0.2:
			case 12: case 13: case 45: case 55:
			{
				isPizzicato = true;
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+0.2);
				that.stopAudioNode(oscillator, note.start+0.5, gainNode);
				break;
			}
			// ピアノ程度に伸ばす系
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  9: case 11: case 14: case 15:
			case 32: case 36: case 37: case 46: case 47:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.setValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.5+note.velocity*3);
				break;
			}
			// ギター系
			case 0.4:
			case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 34:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.0+note.velocity*4);
				break;
			}
			// 減衰していくけど終わらない系
			case 0.5:
			case 4: case 5: case 7: case 8: case 10: case 33: case 35:
			{
				gainNode.gain.value *= 1.0;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.setValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+2.0+note.velocity*10);
				break;
			}
			// 再生しない系
			case 119:
			{
				gainNode.gain.value = 0;
				that.stopAudioNode(oscillator, 0, gainNode);
			}
			default:{
				//gainNode.gain.setValueAtTime(note.velocity, note.start);
			}
		}

		if((oscillator.type == "sine" || oscillator.type == "triangle")
			&& !isPizzicato && note.stop - note.start > 0.01){
			// 終わり際に少し減衰しノイズ削減
			noiseCutGainNode.gain.setValueAtTime(1, note.stop-0.005);
			noiseCutGainNode.gain.linearRampToValueAtTime(0, note.stop);
		}
		return function(){
			that.stopAudioNode(oscillator, 0, gainNode);
		};
	};

	PicoAudio.prototype.createPercussionNote = function(option){
		var note = this.createBaseNote(option, false);
		var source = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
		var start = note.start;
		var stop = note.stop;
		var velocity = note.velocity * ((option.expression ? option.expression[0].value : 100) / 127);
		var note2 = this.createBaseNote(option, false, true);
		var oscillator = note2.oscillator;
		var gainNode2 = note2.gainNode;
		var panNode2 = note2.panNode;
		var that = this;
		switch(option.pitch){
			// Bass drum
			case 35:
			case 36:
				// w
				gainNode.gain.value = velocity*0.6;
				source.playbackRate.value = 0.02;
				that.stopAudioNode(source, start+0.07, gainNode);
				// s
				gainNode2.gain.value = velocity*1.1;
				oscillator.frequency.setValueAtTime(120, start);
				oscillator.frequency.linearRampToValueAtTime(50, start+0.07);
				that.stopAudioNode(oscillator, start+0.07, gainNode2);
				break;
			// Snare
			case 38:
			case 40:
				// w
				source.playbackRate.value = 0.7;
				that.stopAudioNode(source, start+0.05, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.05);
				oscillator.frequency.setValueAtTime(300, start);
				oscillator.frequency.linearRampToValueAtTime(200, start+0.05);
				that.stopAudioNode(oscillator, start+0.05, gainNode2);
				break;
			// Toms
			case 41: case 43: case 45:
			case 47: case 48: case 50:
				// w
				source.playbackRate.value = 0.01;
				that.stopAudioNode(source, start+0.1, gainNode);
				// s
				oscillator.type = "square";
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.01, start+0.1);
				oscillator.frequency.setValueAtTime(150+20*(option.pitch-40), start);
				oscillator.frequency.linearRampToValueAtTime(50+20*(option.pitch-40), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// Close Hihat
			case 42:
			case 44:
				source.playbackRate.value = 1.5;
				that.stopAudioNode(source, start+0.02, gainNode);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Open Hihat
			case 46:
				source.playbackRate.value = 1.5;
				that.stopAudioNode(source, start+0.3, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal
			case 49: case 51: case 52:
			case 53: case 55: case 57:
				source.playbackRate.value = 1.2;
				that.stopAudioNode(source, start+0.5, gainNode);
				gainNode.gain.setValueAtTime(velocity*1, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal2
			case 51:
				source.playbackRate.value = 1.1;
				that.stopAudioNode(source, start+0.4, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.8, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.4);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal3
			case 59:
				source.playbackRate.value = 1.8;
				that.stopAudioNode(source, start+0.3, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Bongo
			case 60: case 61:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(400-40*(option.pitch-60), start);
				oscillator.frequency.linearRampToValueAtTime(450-40*(option.pitch-60), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// mute Conga
			case 62:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.03);
				oscillator.frequency.setValueAtTime(200, start);
				oscillator.frequency.linearRampToValueAtTime(250, start+0.03);
				that.stopAudioNode(oscillator, start+0.03, gainNode2);
				break;
			// open Conga
			case 63: case 64:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(200-30*(option.pitch-63), start);
				oscillator.frequency.linearRampToValueAtTime(250-30*(option.pitch-63), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// Cowbell, Claves
			case 56:
			case 75:
				// w
				source.playbackRate.value = 0.01;
				that.stopAudioNode(source, start+0.1, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(1000+48*(option.pitch-56), start);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// mute triangle
			case 80:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.2);
				that.stopAudioNode(source, start+0.05, gainNode);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.7, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.2);
				oscillator.frequency.setValueAtTime(6000, start);
				that.stopAudioNode(oscillator, start+0.05, gainNode2);
				break;
			// open triangle
			case 81:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				that.stopAudioNode(source, start+0.5, gainNode);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.3);
				oscillator.frequency.setValueAtTime(6000, start);
				that.stopAudioNode(oscillator, start+0.3, gainNode2);
				break;
			default:
				source.playbackRate.value = option.pitch/69*2;
				that.stopAudioNode(source, start+0.05, gainNode);
				that.stopAudioNode(oscillator, 0, gainNode2);
		}
		return function(){
			that.stopAudioNode(source, 0, gainNode);
			that.stopAudioNode(oscillator, 0, gainNode2);
		};
	};

	PicoAudio.prototype.createBaseNote = function(option, isExpression, nonChannel, nonStop){
		var settings = this.settings;
		var context = this.context;
		var songStartTime = this.states.startTime;
		var start = this.getTime(option.start) + songStartTime;
		var stop = this.getTime(option.stop) + songStartTime;
		var pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
		var channel = nonChannel ? 0 : (option.channel || 0);
		var velocity = (option.velocity) * Number(nonChannel ? 1 : (this.channels[channel][2] || 1)) * settings.generateVolume;
		var oscillator = channel!=9 ? context.createOscillator() : context.createBufferSource();
		var panNode = context.createStereoPanner ? context.createStereoPanner() : 
				context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
		var gainNode = context.createGain();
		var noiseCutGainNode = context.createGain();
		var that = this;
		
		if(!context.createStereoPanner && context.createPanner) {
			// iOS, Old Browser
			var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
			if(panValue > 1.0) panValue = 1.0;
			var panAngle = panValue * 90;
			var panX = Math.sin(panAngle * (Math.PI / 180));
			var panZ = -Math.cos(panAngle * (Math.PI / 180));
			panNode.panningModel = "equalpower";
			panNode.setPosition(panX, 0, panZ);
		} else if(context.createStereoPanner){
			var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
			if(panValue > 1.0) panValue = 1.0;
			panNode.pan.value = panValue;
		}
		
		gainNode.gain.value = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
		if(channel!=9){
			oscillator.type = option.type || "sine";
			oscillator.detune.value = 0;
			oscillator.frequency.value = pitch;
			option.pitchBend ? option.pitchBend.forEach(function(p){
				oscillator.frequency.setValueAtTime(
					settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
		} else {
			oscillator.loop = true;
			oscillator.buffer = this.whitenoise
		}
		if(isExpression){
			option.expression ? option.expression.forEach(function(p){
				gainNode.gain.setValueAtTime(
					velocity * (p.value / 127),
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
		}
		if(context.createStereoPanner || context.createPanner){
			var firstPan = true;
			if(context.createStereoPanner) {
				option.pan ? option.pan.forEach(function(p){
					if(firstPan){
						firstPan = false;
						return;
					}
					var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
					if(v > 1.0) v = 1.0;
					panNode.pan.setValueAtTime(
						v,
						that.getTime(p.timing) + songStartTime
					);
				}) : false;
			} else if(context.createPanner){
				if(panNode.positionX) {
					// Old Browser
					option.pan ? option.pan.forEach(function(p){
						if(firstPan){
							firstPan = false;
							return;
						}
						var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
						if(v > 1.0) v = 1.0;
						var a = v * 90;
						var x = Math.sin(a * (Math.PI / 180));
						var z = -Math.cos(a * (Math.PI / 180));
						panNode.positionX.setValueAtTime(x, that.getTime(p.timing) + songStartTime);
						panNode.positionY.setValueAtTime(0, that.getTime(p.timing) + songStartTime);
						panNode.positionZ.setValueAtTime(z, that.getTime(p.timing) + songStartTime);
					}) : false;
				} else {
					// iOS
					// setValueAtTimeが使えないためsetTimeoutでパンの動的変更
					option.pan ? option.pan.forEach(function(p){
						if(firstPan){
							firstPan = false;
							return;
						}
						var reservePan = setTimeout(function(){
							that.clearFunc("pan", reservePan)
							var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
							if(v > 1.0) v = 1.0;
							var a = v * 90;
							var x = Math.sin(a * (Math.PI / 180));
							var z = -Math.cos(a * (Math.PI / 180));
							panNode.setPosition(x, 0, z);
						}, (that.getTime(p.timing) + songStartTime - context.currentTime) * 1000);
						that.pushFunc({
							pan: reservePan,
							stopFunc: function(){ clearTimeout(reservePan); }
						});
					}) : false;
				}
			}
			oscillator.connect(panNode);
			panNode.connect(gainNode);
		} else {
			oscillator.connect(gainNode);
		}
		gainNode.connect(noiseCutGainNode);
		noiseCutGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(context.destination);
		
		if(channel!=9 && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)){
			var modulationOscillator = context.createOscillator();
			var modulationGainNode = context.createGain();
			firstPan = true;
			option.modulation ? option.modulation.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var m = p.value / 127;
				if(m > 1.0) m = 1.0;
				modulationGainNode.gain.setValueAtTime(
					pitch * 10 / 440 * m,
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
			var m = option.modulation ? option.modulation[0].value / 127 : 0;
			if(m > 1.0) m = 1.0;
			modulationGainNode.gain.value = pitch * 10 / 440 * m;
			modulationOscillator.frequency.value = 6;
			modulationOscillator.connect(modulationGainNode);
			modulationGainNode.connect(oscillator.frequency);
		}
		
		if(this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)){
			var convolver = this.convolver;
			var masterGainNode = this.masterGainNode;
			var convolverGainNode = context.createGain();
			firstPan = true;
			option.reverb ? option.reverb.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var r = p.value / 127;
				if(r > 1.0) r = 1.0;
				convolverGainNode.gain.setValueAtTime(
					r,
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
			var r = option.reverb ? option.reverb[0].value / 127 : 0;
			if(r > 1.0) r = 1.0;
			convolverGainNode.gain.value = r;
			gainNode.connect(convolverGainNode);
			convolverGainNode.connect(convolver);
		}
		
		if(this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)){
			var chorusDelayNode = this.chorusDelayNode;
			var masterGainNode = this.masterGainNode;
			var chorusGainNode = context.createGain();
			firstPan = true;
			option.chorus ? option.chorus.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var c = p.value / 127;
				if(c > 1.0) c = 1.0;
				chorusGainNode.gain.setValueAtTime(
					c,
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
			var c = option.chorus ? option.chorus[0].value / 127 : 0;
			if(c > 1.0) c = 1.0;
			chorusGainNode.gain.value = c;
			gainNode.connect(chorusGainNode);
			chorusGainNode.connect(chorusDelayNode);
		}
		
		if(modulationOscillator){
			modulationOscillator.start(start);
			this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
		}
		
		oscillator.start(start);
		if(channel!=9 && !nonChannel && !nonStop){
			this.stopAudioNode(oscillator, stop, gainNode);
		}
		
		return {
			start: start,
			stop: stop,
			pitch: pitch,
			channel: channel,
			velocity: velocity,
			oscillator: oscillator,
			panNode: panNode,
			gainNode: gainNode,
			noiseCutGainNode: noiseCutGainNode
		};
	};

	PicoAudio.prototype.startWebMIDI = function(){
		var outputs;
		var that = this;
		if(!navigator.requestMIDIAccess) return;
		// 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
		// 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する
		var sysEx = this.settings.WebMIDIPortSysEx;
		var midiAccessSuccess = function(midiAccess){
			outputs = midiAccess.outputs;
			that.settings.WebMIDIPortOutputs = outputs;
			var output;
			if(that.settings.WebMIDIPort==-1){
				that.settings.WebMIDIPortOutputs.forEach(function(o){
					if(!output) output = o;
				});
			} else {
				output = that.settings.WebMIDIPortOutputs.get(settings.WebMIDIPort);
			}
			that.settings.WebMIDIPortOutput = output;
			that.settings.WebMIDIPortSysEx = sysEx;
			if(output){
				output.open();
				that.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す
			}
			return outputs;
		};
		var midiAccessFailure = function(err){
			console.log(err);
			if(sysEx){
				sysEx = false;
				navigator.requestMIDIAccess({sysex: sysEx})
					.then(midiAccessSuccess)
					.catch(midiAccessFailure);
			}
		};
		navigator.requestMIDIAccess({sysex: sysEx})
			.then(midiAccessSuccess)
			.catch(midiAccessFailure);
		// 終了時に鳴らしている音を切る
		window.addEventListener('unload', function(e) {
			for(var t=0; t<16; t++){
				that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
				for(var i=0; i<128; i++){
					that.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
				}
			}
		});
	};

	PicoAudio.prototype.initStatus = function(isSongLooping, isLight){
		if(this.settings.isWebMIDI){ // initStatus()連打の対策
			if(this.states.webMIDIWaitState!=null) return;
		}
		this.stop(isSongLooping);
		var tempwebMIDIStopTime = this.states.webMIDIStopTime;
		this.states = { isPlaying: false, playIndex:0, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0 };
		this.states.webMIDIStopTime = tempwebMIDIStopTime; // 値を初期化しない
		if(this.settings.isWebMIDI && !isLight){
			if(isSongLooping)
				return;
			if(this.settings.WebMIDIPortOutput==null){
				this.startWebMIDI();
				return;
			}
			if(this.settings.WebMIDIPortSysEx){
				// GM1システム・オン
				this.settings.WebMIDIPortOutput.send([0xF0, 0x7E, 0x7F, 0x09, 0x01, 0xF7]);
			} else {
				// SysExの使用が拒否されているので、できる限り設定値を初期値に戻す
				for(var t=0; t<16; t++){
					this.settings.WebMIDIPortOutput.send([0xC0+t, 0]);
					this.settings.WebMIDIPortOutput.send([0xE0+t, 0, 64]);
					// ピッチあたりのずれがひどくなる場合がある　よくわからない
					this.settings.WebMIDIPortOutput.send([0xB0+t, 100, 0]);
					this.settings.WebMIDIPortOutput.send([0xB0+t, 101, 0]);
					this.settings.WebMIDIPortOutput.send([0xB0+t, 6, 2]); //pitchbend
					this.settings.WebMIDIPortOutput.send([0xB0+t, 100, 1]);
					this.settings.WebMIDIPortOutput.send([0xB0+t, 96, 0]); 
					this.settings.WebMIDIPortOutput.send([0xB0+t, 97, 64]);　//tuning?
					this.settings.WebMIDIPortOutput.send([0xB0+t, 7, 100]); // volume
					this.settings.WebMIDIPortOutput.send([0xB0+t, 10, 64]); // pan
					this.settings.WebMIDIPortOutput.send([0xB0+t, 11, 127]); // expression
					//this.settings.WebMIDIPortOutput.send([0xB0+t, 91, 40]); // リバーブ以外のエフェクトに設定される場合がありそうなのでコメントアウト
					//this.settings.WebMIDIPortOutput.send([0xB0+t, 93, 0]); // コーラス以外のエフェクトに設定されるのか音が出なくなる場合があるのでコメントアウト
					this.settings.WebMIDIPortOutput.send([0xB0+t, 98, 0]);
					this.settings.WebMIDIPortOutput.send([0xB0+t, 99, 0]);
					//this.settings.WebMIDIPortOutput.send([0xB0+t, 121, 0]);
					this.settings.WebMIDIPortOutput.send([0xB0+t, 122, 0]);
				}
			}
		}
	};

	PicoAudio.prototype.stop = function(isSongLooping){
		var states = this.states;
		var that = this;
		if(states.isPlaying==false) return;
		states.isPlaying = false;
		states.playIndex -= this.settings.hashBuffer + 1;
		states.stopTime = this.context.currentTime;
		states.stopFuncs.forEach(function(n){
			n.stopFunc();
		});
		states.stopFuncs = [];
		if(this.settings.isWebMIDI){
			if(isSongLooping)
				return;
			if(this.settings.WebMIDIPortOutput==null)
				return;
			states.webMIDIStopTime = this.context.currentTime;
			setTimeout(function(){
				for(var t=0; t<16; t++){
					that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
					for(var i=0; i<128; i++){
						that.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
					}
				}
			}, 200);
		}
	};

	PicoAudio.prototype.play = function(isSongLooping){
		var context = this.context;
		var settings = this.settings;
		var trigger = this.trigger;
		var states = this.states;
		var hashedDataList = this.hashedDataList;
		var that = this;
		if(states.isPlaying==true) return;
		if(settings.isWebMIDI && !isSongLooping){
			// Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
			if(states.webMIDIWaitState != "completed"){
				if(states.webMIDIWaitState != "waiting"){ // play()連打の対策
					// stop()から800ms後にplay()を実行
					states.webMIDIWaitState = "waiting";
					var waitTime = 800 - (context.currentTime - states.webMIDIStopTime)*1000;
					if(states.webMIDIStopTime==0) waitTime = 800; // MIDI Portをopenして最初に呼び出すときも少し待つ
					setTimeout(function(){
						that.states.webMIDIWaitState = "completed";
						that.states.isPlaying = false;
						that.play();
					}, waitTime);
				}
				return;
			} else {
				states.webMIDIWaitState = null;
			}
		}
		var currentTime = this.context.currentTime;
		var prevStartTime = states.startTime;
		states.isPlaying = true;
		states.startTime = !states.startTime && !states.stopTime ? currentTime : (states.startTime + currentTime - states.stopTime);
		states.stopFuncs = [];
		// 先頭の無音の時間をスキップ
		var firstNoteOnTime = this.getTime(this.firstNoteOnTiming);
		if (-states.startTime + currentTime < firstNoteOnTime) {
			this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
		}
		// 曲終了コールバックを予約
		var reserveSongEnd;
		var reserveSongEndFunc = function(){
			that.clearFunc("rootTimeout", reserveSongEnd);
			var finishTime = (that.settings.isCC111 && that.cc111Time != -1) ? that.getTime(that.lastNoteOffTiming) : that.getTime(that.getTiming(Number.MAX_SAFE_INTEGER));
			if (finishTime - context.currentTime + states.startTime <= 0) {
				// 予定の時間以降に曲終了
				that.onSongEnd();
			} else {
				// 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
				reserveSongEnd = setTimeout(reserveSongEndFunc, 1);
				that.pushFunc({
					rootTimeout: reserveSongEnd,
					stopFunc: function(){ clearTimeout(reserveSongEnd); }
				});
			}
		};
		var finishTime = (this.settings.isCC111 && this.cc111Time != -1) ? this.getTime(this.lastNoteOffTiming) : this.getTime(this.getTiming(Number.MAX_SAFE_INTEGER));
		var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
		reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
		that.pushFunc({
			rootTimeout: reserveSongEnd,
			stopFunc: function(){ clearTimeout(reserveSongEnd); }
		});
		(function playHash(idx){
			states.playIndex = idx;
			if(hashedDataList && hashedDataList[idx]){		
				hashedDataList[idx].forEach(function(note){
					if(!settings.isWebMIDI) {
						that.pushFunc({
							note: note,
							stopFunc: note.channel!=9 ? that.createNote(note) : that.createPercussionNote(note)
						});
					}
					var noteOn = setTimeout(function(){
						that.clearFunc("timeout", noteOn);
						if(trigger.isNoteTrigger) trigger.noteOn(note);
						var noteOff = setTimeout(function(){
							that.clearFunc("timeout", noteOff);
							that.clearFunc("note", note);
							if(trigger.isNoteTrigger) trigger.noteOff(note);
						}, note.channel!=9 ? (that.getTime(note.stop) - that.getTime(note.start)) * 1000 : that.settings.dramMaxPlayLength * 1000);
						that.pushFunc({
							timeout: noteOff,
							stopFunc: function(){ clearTimeout(noteOff); }
						});
					}, (that.getTime(note.start) - context.currentTime + states.startTime) * 1000);
					that.pushFunc({
						timeout: noteOn,
						stopFunc: function(){ clearTimeout(noteOn); }
					});
				});
			}
			if(settings.isWebMIDI && that.hashedMessageList && that.hashedMessageList[idx]){	
				that.hashedMessageList[idx].forEach(function(message){
					if(settings.WebMIDIPortOutput!=null){
						if(message.message[0]!=0xff && (that.settings.WebMIDIPortSysEx || (message.message[0]!=0xf0 && message.message[0]!=0xf7))){
							try{
								settings.WebMIDIPortOutput.send(message.message,
									(that.getTime(message.timing) - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
							}catch(e){
								console.log(e, message.message);
							}
						}
					}
				});
			}
			if(idx < hashedDataList.length){
				if(idx - Math.floor((context.currentTime - states.startTime) * 1000 / settings.hashLength) <= settings.hashBuffer){
					playHash(idx + 1);
				} else {
					var reserve = setTimeout(function(){
						playHash(idx + 1);
						that.clearFunc("rootTimeout", reserve);
					}, settings.hashLength);
					that.pushFunc({
						rootTimeout: reserve,
						stopFunc: function(){ clearTimeout(reserve); }
					});
				}
			} else {
				trigger.songEnd();
			}
		})(states.playIndex || 0);
	};

	PicoAudio.prototype.setData = function(data){
		if(this.states.isPlaying) this.stop();
		this.settings.resolution = data.header.resolution;
		this.settings.tempo = data.tempo || 120; 
		this.tempoTrack = data.tempoTrack;
		this.cc111Time = data.cc111Time;
		this.firstNoteOnTiming = data.firstNoteOnTiming;
		this.lastNoteOffTiming = data.lastNoteOffTiming;
		var that = this;
		var hashedDataList = [];
		data.channels.forEach(function(channel){
			channel.notes.forEach(function(note){
				var option = note;
				var time = that.getTime(note.start) * (1000/that.settings.hashLength);
				if(!hashedDataList[Math.floor(time)])
					hashedDataList[Math.floor(time)] = [];
				hashedDataList[Math.floor(time)].push(note);
			});
		});
		if(this.settings.isWebMIDI){
			var hashedMessageList = [];
			data.messages.forEach(function(message){
				var time = that.getTime(message.timing) * (1000/that.settings.hashLength);
				if(!hashedMessageList[Math.floor(time)])
					hashedMessageList[Math.floor(time)] = [];
				hashedMessageList[Math.floor(time)].push(message);
			});
			this.hashedMessageList = hashedMessageList;
		}
		this.hashedDataList = hashedDataList;
		this.initStatus();
		return this;
	};

	PicoAudio.prototype.getMasterVolume = function(){
		return this.settings.masterVolume;
	};

	PicoAudio.prototype.setMasterVolume = function(volume){
		this.settings.masterVolume = volume;
		this.masterGainNode.gain.value = this.settings.masterVolume;
	};

	PicoAudio.prototype.isLoop = function(){
		return this.settings.loop;
	};

	PicoAudio.prototype.setLoop = function(loop){
		this.settings.loop = loop;
	};

	PicoAudio.prototype.isWebMIDI = function(){
		return this.settings.isWebMIDI;
	};

	PicoAudio.prototype.setWebMIDI = function(enable){
		this.settings.isWebMIDI = enable;
	};

	PicoAudio.prototype.isCC111 = function(){
		return this.settings.isCC111;
	};

	PicoAudio.prototype.setCC111 = function(enable){
		this.settings.isCC111 = enable;
	};

	PicoAudio.prototype.setStartTime = function(offset){
		this.states.startTime -= offset;
		this.states.playIndex = Math.floor(offset * 1000 / this.settings.hashLength);
	};

	PicoAudio.prototype.setOnSongEndListener = function(listener){
		this.onSongEndListener = listener;
	};

	PicoAudio.prototype.onSongEnd = function(){
		if(this.onSongEndListener){
			var isStopFunc = this.onSongEndListener();
			if(isStopFunc) return;
		}
		if(this.settings.loop){
			this.initStatus(true);
			if(this.settings.isCC111 && this.cc111Time != -1){
				this.setStartTime(this.getTime(this.cc111Time));
			}
			this.play(true);
		}
	};

	PicoAudio.prototype.isReverb = function(){
		return this.settings.isReverb;
	};

	PicoAudio.prototype.setReverb = function(enable){
		this.settings.isReverb = enable;
	};

	PicoAudio.prototype.getReverbVolume = function(){
		return this.settings.reverbVolume;
	};

	PicoAudio.prototype.setReverbVolume = function(volume){
		this.settings.reverbVolume = volume;
	};

	PicoAudio.prototype.isChorus = function(){
		return this.settings.isChorus;
	};

	PicoAudio.prototype.setChorus = function(enable){
		this.settings.isChorus = enable;
	};

	PicoAudio.prototype.getChorusVolume = function(){
		return this.settings.chorusVolume;
	};

	PicoAudio.prototype.setChorusVolume = function(volume){
		this.settings.chorusVolume = volume;
	};

	PicoAudio.prototype.isAndroid = function(){
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("android") != -1 && u.indexOf("windows") == -1;
	};

	PicoAudio.prototype.getTime = function(timing){
		var time = 0;
		var tempo = 120;
		var currentTiming = 0;
		var that = this;
		this.tempoTrack.some(function(tempoObj){
			if(timing < tempoObj.timing)
				return true;
			time += (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
			currentTiming = tempoObj.timing;
			tempo = tempoObj.value;
		});
		time += (60 / tempo / that.settings.resolution) * (timing - currentTiming);
		return time;
	};

	PicoAudio.prototype.getTiming = function(time){
		var totalTime = 0;
		var tempo = 120;
		var currentTiming = 0;
		var that = this;
		this.tempoTrack.some(function(tempoObj){
			totalTime += (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
			if(totalTime > time){
				totalTime -= (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
				currentTiming += (time - totalTime) / (60 / tempo / that.settings.resolution);
				return true;
			}
			currentTiming = tempoObj.timing;
			tempo = tempoObj.value;
		});
		return currentTiming;
	};

	PicoAudio.prototype.parseSMF = function(smf){
		if(smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
			return "Not Sandard MIDI File.";
		var data = new Object;
		var p = 4;
		var header = new Object();
		header.size = getInt(smf.subarray(4, 8));
		header.format = smf[9];
		header.trackcount = getInt(smf.subarray(10, 12));
		header.timemanage = smf[12];
		header.resolution = getInt(smf.subarray(12, 14));
		p += 4+header.size;
		//var tracks = new Array();
		var tempoTrack = new Array();
		var beatTrack = new Array();
		var channels = new Array();
		var cc111Time = -1;
		var firstNoteOnTiming = Number.MAX_SAFE_INTEGER; // 最初のノートオンのTick
		var lastNoteOffTiming = 0; // 最後のノートオフのTick
		for(var i=0; i<16; i++){
			var channel = new Object();
			channels.push(channel);
			channel.messages = [];
			channel.notes = [];
		}
		var songLength = 0;
		if(this.settings.isWebMIDI) var messages = [];
		for(var t=0; t<header.trackcount; t++){
			if(smf[p] != 77 || smf[p+1] != 84 || smf[p+2] != 114 || smf[p+3] != 107)
				return "Irregular SMF.";
			p += 4;
			var track = new Object();
			//tracks.push(track);
			//track.size = getInt(smf.subarray(p, p+4));
			//p += 4;
			//track.notes = [];
			var endPoint = p+4 + getInt(smf.subarray(p, p+4));
			p += 4;
			var time = 0;
			var lastState = 1;
			while(p<endPoint){
				// DeltaTime
				if(lastState!=null){
					var lengthAry = variableLengthToInt(smf.subarray(p, p+5));
					var dt = lengthAry[0];
					time += dt;
					if(time>100000000) time = 100000000; // 長すぎる曲は途中で打ち切る(PicotuneのCanvas生成で時間がかかるため)
					p += lengthAry[1];
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI) var cashP = p;
				// Events
				var mesIdx;
				var mesObj = {timing:time, mes:[]};
				switch(Math.floor(smf[p]/0x10)){
					case 0x8: // Note OFF - 8[ch], Pitch, Velocity
					case 0x9: // Note ON - 9[ch], Pitch, Velocity
					case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xB: // Control Change - B[ch],,
					case 0xE: // PitchBend Change - E[ch],,
						lastState = smf[p];
						// チャンネル毎に仕分けた後に解析する
						mesObj.mes.push(smf[p], smf[p+1], smf[p+2]);
						// デルタタイムの順番になるように配列に挿入
						var channelMessages = channels[lastState&0x0F].messages;
						for(mesIdx=channelMessages.length-1; mesIdx>=0; mesIdx--){
							var tempMesObj = channelMessages[mesIdx];
							if (time >= tempMesObj.timing) break;
						}
						mesIdx++;
						channelMessages.splice(mesIdx, 0, mesObj);
						p+=3;
						break;
					case 0xC: // Program Change - C[ch],
					case 0xD: // Channel Pre - D[ch],
						lastState = smf[p];
						// チャンネル毎に仕分けた後に解析する
						mesObj.mes.push(smf[p], smf[p+1]);
						// デルタタイムの順番になるように配列に挿入
						var channelMessages = channels[lastState&0x0F].messages;
						for(mesIdx=channelMessages.length-1; mesIdx>=0; mesIdx--){
							var tempMesObj = channelMessages[mesIdx];
							if (time >= tempMesObj.timing) break;
						}
						mesIdx++;
						channelMessages.splice(mesIdx, 0, mesObj);
						p+=2;
						break;
					// SysEx Events or Meta Events - F[ch], ...
					case 0xF:{
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
							case 0xF7:
								// SysEx Events
								var lengthAry = variableLengthToInt(smf.subarray(p+1, p+1+4));
								
								// Master Volume
								if(lengthAry[0]>=7 && smf[p+2]==0x7f && smf[p+3]==0x7f && smf[p+4]==0x04 && smf[p+5]==0x01){
									// 全チャンネルにMasterVolumeメッセージを挿入する
									for(var i=0; i<16; i++) {
										// 0xF0, 6(length), 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume
										mesObj.mes.push(smf[p], lengthAry[0]-1, smf[p+2], smf[p+3], smf[p+4], smf[p+5], smf[p+6], smf[p+7]);
										// デルタタイムの順番になるように配列に挿入
										var channelMessages = channels[i].messages;
										for(mesIdx=channelMessages.length-1; mesIdx>=0; mesIdx--){
											var tempMesObj = channelMessages[mesIdx];
											if(time >= tempMesObj.timing) break;
										}
										mesIdx++;
										channelMessages.splice(mesIdx, 0, mesObj);
									}
								}
								
								p+=1+lengthAry[1]+lengthAry[0];
								break;
							case 0xF1:
								p+=2;
								break;
							case 0xF2:
								p+=3;
								break;
							case 0xF3:
								p+=2;
								break;
							case 0xF6:
							case 0xF8:
							case 0xFA:
							case 0xFB:
							case 0xFC:
							case 0xFE:
								p+=1;
								break;
							case 0xFF:{
								// Meta Events
								switch(smf[p+1]){
									case 0x00:
									case 0x01:
									case 0x02:
									case 0x03:
									case 0x04:
									case 0x05:
									case 0x06:
									case 0x07:
									case 0x20:
										break;
									case 0x2F:
										time += header.resolution - dt;
										break;
									// Tempo
									case 0x51:
										data.tempo = 60*1000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
										tempoTrack.push({
											timing: time,
											value: 60*1000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5])
										});
										break;
									case 0x54:
										break;
									// Beat
									case 0x58:
										beatTrack.push({
											timing: time,
											value: [smf[p+3], Math.pow(2, smf[p+4])]
										});
										break;
									case 0x59:
									case 0x7F:
										break;
								}
								var lengthAry = variableLengthToInt(smf.subarray(p+2, p+2+4));
								p+=2+lengthAry[1]+lengthAry[0];
								break;
							}
						}
						break;
					}
					default: {
						if(lastState == null)
							return "Irregular SMF.";
						p--;
						smf[p] = lastState; // TODO 上書きしないようにしたい
						lastState = null;
					}
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					if(lastState!=null){
						var state = smf[cashP];
						if(state==0xF0 || state==0xF7){
							if(this.settings.WebMIDIPortSysEx){
								// 長さ情報を取り除いて純粋なSysExメッセージにする
								var lengthAry = variableLengthToInt(smf.subarray(cashP+1, cashP+1+4));
								var sysExStartP = cashP+1+lengthAry[1];
								var sysExEndP = sysExStartP+lengthAry[0];
								var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
								webMIDIMes[0] = state;
								var size = sysExEndP - sysExStartP;
								for (var i=0; i<size; i++)
									webMIDIMes[i+1] = smf[sysExStartP + i];
								messages.push({ message: webMIDIMes, timing: time });
							}
						} else {
							messages.push({ message: smf.subarray(cashP, p), timing: time });
						}
					}
				}
			}
			if(songLength<time) songLength = time;
		}
		tempoTrack.push({ timing:songLength, value:120 });
		
		// Midi Events (0x8n - 0xEn) parse
		for(var ch=0; ch<channels.length; ch++){
			var channel = channels[ch];
			var p = 0;
			var endPoint = channel.messages.length;
			var dataEntry = 2;
			var pitchBend = 0;
			var pan = 64;
			var expression = 127;
			var velocity = 100;
			var modulation = 0;
			var reverb = 0;
			var chorus = 0;
			var nrpnLsb = 127;
			var nrpnMsb = 127;
			var rpnLsb = 127;
			var rpnMsb = 127;
			var instrument = null;
			var masterVolume = 127;
			var nowNoteOnIdxAry = [];
			while(p<endPoint){
				var mesObj = channel.messages[p];
				// DeltaTime
				var time = mesObj.timing;
				// Events
				var mes = channel.messages[p].mes;
				switch(Math.floor(mes[0]/0x10)){
					// Note OFF - 8[ch], Pitch, Velocity
					case 0x8:
						var i=0;
						nowNoteOnIdxAry.some(function(idx){
							var note = channel.notes[idx];
							if(note.pitch==mes[1] && note.stop==null){
								note.stop = time;
								nowNoteOnIdxAry.splice(i, 1);
								if(time > lastNoteOffTiming){
									lastNoteOffTiming = time;
								}
								return true;
							}
							i++;
						});
						break;
					// Note ON - 9[ch], Pitch, Velocity
					case 0x9:
						if(mes[2]!=0){
							var note = {
								start: time,
								stop: null,
								pitch: mes[1],
								pitchBend: [{timing:time,value:pitchBend}],
								pan: [{timing:time,value:pan}],
								expression: [{timing:time,value:expression*(masterVolume/127)}],
								velocity: (mes[2]/127)*(velocity/127),
								modulation: [{timing:time,value:modulation}],
								reverb: [{timing:time,value:reverb}],
								chorus: [{timing:time,value:chorus}],
								instrument: instrument,
								channel: ch
							};
							nowNoteOnIdxAry.push(channel.notes.length);
							channel.notes.push(note);
							if(time < firstNoteOnTiming){
								firstNoteOnTiming = time;
							}
						} else {
							var i=0;
							nowNoteOnIdxAry.some(function(idx){
								var note = channel.notes[idx];
								if(note.pitch==mes[1] && note.stop==null){
									note.stop = time;
									nowNoteOnIdxAry.splice(i, 1);
									if(time > lastNoteOffTiming){
										lastNoteOffTiming = time;
									}
									return true;
								}
								i++;
							});
						}
						break;
					// Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xA:
						break;
					// Control Change - B[ch],,
					case 0xB:
						switch(mes[1]){
							case 1:
								modulation = mes[2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.modulation.push({
										timing: time,
										value: modulation
									});
								});
								break;
							case 6:
								if(rpnLsb==0 && rpnMsb==0){
									// RLSB=0 & RMSB=0 -> 6はピッチ
									dataEntry = mes[2];
									if(dataEntry > 24){
										dataEntry = 24;
									}
								}
								if(nrpnLsb==8 && nrpnMsb==1){
									// (保留)ビブラート・レイト(GM2/GS/XG)
									//console.log("CC  8 1 6 "+mes[2]+" time:"+time);
								} else if(nrpnLsb==9 && nrpnMsb==1){
									// (保留)ビブラート・デプス(GM2/GS/XG)
									//console.log("CC  9 1 6 "+mes[2]+" time:"+time);
								} else if(nrpnLsb==10 && nrpnMsb==1){
									// (保留)ビブラート・ディレイ(GM2/GS/XG)
									//console.log("CC 10 1 6 "+mes[2]+" time:"+time);
								}
								break;
							case 7:
								velocity = mes[2];
								break;
							case 10:
								//Pan
								pan = mes[2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.pan.push({
										timing: time,
										value: pan
									});
								});
								break;
							case 11:
								//Expression
								expression = mes[2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.expression.push({
										timing: time,
										value: expression*(masterVolume/127)
									});
								});
								break;
							case 91:
								reverb = mes[2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.reverb.push({
										timing: time,
										value: reverb
									});
								});
								break;
							case 93:
								chorus = mes[2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.chorus.push({
										timing: time,
										value: chorus
									});
								});
								break;
							case 98:
								nrpnLsb = mes[2];
								break;
							case 99:
								nrpnMsb = mes[2];
								break;
							case 100:
								rpnLsb = mes[2];
								break;
							case 101:
								rpnMsb = mes[2];
								break;
							case 111: // RPGツクール用ループ
								if(cc111Time == -1){
									cc111Time = time;
								}
								break;
						}
						break;
					// Program Change - C[ch],
					case 0xC:
						instrument = mes[1];
						break;
					// Channel Pre - D[ch],
					case 0xD:
						break;
					// PitchBend Change - E[ch],,
					case 0xE:
						pitchBend = ((mes[2]*128+mes[1])-8192)/8192*dataEntry;
						nowNoteOnIdxAry.forEach(function(idx){
							var note = channel.notes[idx];
							note.pitchBend.push({
								timing: time,
								value: pitchBend
							});
						});
						break;
					case 0xF:
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(mes[0]){
							case 0xF0:
							case 0xF7:
								// Master Volume
								if(mes[1]>=6 && mes[2]==0x7f && mes[3]==0x7f && mes[4]==0x04 && mes[5]==0x01){
									var vol = mes[7];
									if(vol > 127) vol = 127;
									masterVolume = vol;
									nowNoteOnIdxAry.forEach(function(idx){
										var note = channel.notes[idx];
										note.expression.push({
											timing: time,
											value: expression*(masterVolume/127)
										});
									});
								}
								break;
						}
						break;
					default: {
						return "Error parseSMF.";
					}
				}
				p++;
			}
			delete channel.messages;
		}
		
		data.header = header;
		data.tempoTrack = tempoTrack;
		data.beatTrack = beatTrack;
		data.channels = channels;
		data.songLength = songLength;
		data.cc111Time = cc111Time;
		data.firstNoteOnTiming = firstNoteOnTiming;
		data.lastNoteOffTiming = lastNoteOffTiming;
		if(this.settings.isWebMIDI) data.messages = messages;
		
		function getInt(arr){
			var value = 0;
			for (var  i=0;i<arr.length;i++){
				value = (value << 8) + arr[i];
			}
			return value;
		}
		function variableLengthToInt(arr) {
			var i = 0;
			var value = 0;
			while(i<arr.length-1 && arr[i]>=0x80){
				if (i < 4) value = (value<<7) + (arr[i]-0x80);
				i++;
			}
			value = (value<<7) + arr[i];
			i++;
			return [value, i];
		}
		return data;
	};

	PicoAudio.prototype.stopAudioNode = function(tar, time, gainNode){
		try{
			if(time > 0) {
				tar.stop(time);
			} else {
				tar.stop(this.context.currentTime+0.005);
				gainNode.gain.cancelScheduledValues(this.context.currentTime);
				gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime+0.005);
			}
		} catch(e) {
			// iOS
			gainNode.gain.cancelScheduledValues(time);
			if(time <= 0) {
				gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime+0.005);
			}
		}
	};

	PicoAudio.prototype.pushFunc = function(tar){
		if(!tar.note && !tar.rootTimeout && !this.trigger.isNoteTrigger) return;
		this.states.stopFuncs.push(tar);
	};

	PicoAudio.prototype.clearFunc = function(tar1, tar2){
		if(tar1!="note" && tar1!="rootTimeout" && !this.trigger.isNoteTrigger) return;
		var that = this;
		that.states.stopFuncs.some(function(n, i){
			if(n[tar1] == tar2){
				that.states.stopFuncs.splice(i, 1);
				return true;
			}
		});
	};

	return PicoAudio;
})();

requireSimulator.setName('T2MediaLib');
// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ
// T2MediaLib_BGMPlayer //

var T2MediaLib_BGMPlayer = function(arg_id) {
    this.id = arg_id;
    this.playingState = "stop";
    this.playingStatePending = null;
    this.playingBGM = null;
    this.playingBGMName = null;
    this.bgmPause = 0;
    this.bgmPauseTime = 0;
    this.bgmPauseCurrentTime = 0;
    this.bgmPauseTempo = 0;
    this.bgmPauseLoop = false;
    this.bgmPauseLoopStart = 0;
    this.bgmPauseLoopEnd = 0;
    this.bgmVolume = 1.0;
    this.bgmTempo = 1.0;
    this.bgmPan = 0.0;
    this.picoAudio = null;//new PicoAudio(T2MediaLib.context);
    this.picoAudioSetDataBGMName = null; // 前回のsetDataした曲を再び使う場合は、setDataを省略して軽量化する
    this.PICO_AUDIO_VOLUME_COEF = 1;//0.2;
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    this.stopBGM();

    var soundData = T2MediaLib.soundDataAry[idx];
    if (!soundData.isDecodeComplete()) {
        if (!soundData.isDecoding()) {
            var that = this;
            var callbacks = {};
            callbacks.succ = function() {
                var pending = that.playingStatePending; // 途中で値が変わるため保存
                that._setPlayingState("stop", true);
                if (pending != "stop") {
                    that.playBGM(idx, loop, offset, loopStart, loopEnd);
                }
                if (pending == "pause") {
                    that.pauseBGM();
                }
            };
            callbacks.err = function() {
                that._setPlayingState("stop", true);
            };
            this.playingBGMName = idx;
            this._setPlayingState("decoding", true);
            T2MediaLib.decodeSound(idx, callbacks);
        }
        return this;
    }
    
    var decodedData = soundData.decodedData;
    if (decodedData instanceof AudioBuffer) {
        // MP3, Ogg, AAC, WAV
        this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmPan, this.bgmTempo, offset, loop, loopStart, loopEnd);
    } else if (decodedData instanceof Object) {
        // Midi
        if (this.picoAudio == null) {
            this.picoAudio = new PicoAudio(T2MediaLib.context, T2MediaLib.picoAudio); // AudioContextオブジェクトがmax6つまで？なので使いまわす
        }
        if (idx != this.picoAudioSetDataBGMName) {
            this.picoAudio.setData(decodedData);
            this.picoAudioSetDataBGMName = idx;
        } else {
            this.picoAudio.initStatus();
        }
        this.picoAudio.setLoop(loop);
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
        if (!offset) {
            offset = 0;
        } else {
            var bgmLengthTime = this.picoAudio.getTime(this.picoAudio.getTiming(Number.MAX_SAFE_INTEGER));
            if      (offset > bgmLengthTime) offset = bgmLengthTime;
            else if (offset < 0.0) offset = 0.0;
        }
        this.picoAudio.setStartTime(offset);
        this.picoAudio.play();
        this.playingBGM = this.picoAudio;
    }
    this.playingBGMName = idx;
    this.bgmPause = 0;
    this._setPlayingState("play");
    return this;
};
T2MediaLib_BGMPlayer.prototype.stopBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.stop();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        bgm.stop(0);
    }
    this.playingBGM = null;
    this.playingBGMName = null;
    this._setPlayingState("stop");
    return this;
};
T2MediaLib_BGMPlayer.prototype.pauseBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        if (this.bgmPause === 0) {
            this.bgmPauseTime = this.getBGMCurrentTime();
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            bgm.stop();
            this.bgmPause = 1;
        }
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 0) {
            this.bgmPauseTime = this.getBGMCurrentTime();
            this.bgmPauseLoopStart = T2MediaLib.getSELoopStartTime(bgm);
            this.bgmPauseLoopEnd = T2MediaLib.getSELoopEndTime(bgm);
            this.bgmPauseLoop = T2MediaLib.isSELoop(bgm);
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            this.bgmPauseTempo = this.bgmTempo;
            bgm.stop(0);
            this.bgmPause = 1;
        }
    }
    if (this.playingState != "stop") {
        this._setPlayingState("pause");
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.resumeBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        if (this.bgmPause === 1) {
            bgm.play();
            this.bgmPause = 0;
        }
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            bgm = this.playBGM(this.playingBGMName, this.bgmPauseLoop, this.bgmPauseTime, this.bgmPauseLoopStart, this.bgmPauseLoopEnd);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.onChangeBGMMasterVolume = function() {
    this.setBGMVolume(this.getBGMVolume());
};
T2MediaLib_BGMPlayer.prototype.getBGMVolume = function() {
    return this.bgmVolume;
};
T2MediaLib_BGMPlayer.prototype.setBGMVolume = function(vol) {
    var bgm = this.playingBGM;
    this.bgmVolume = vol;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        bgm.gainNode.gain.value = vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume;
        //↓seMasterVolumeが音量に乗算されてしまう
        //T2MediaLib.setSEVolume(bgm, vol);
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMTempo = function() {
    return this.bgmTempo;
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    // MP3, Ogg, AAC, WAV
    var bgm = this.playingBGM;

    if (tempo <= 0) tempo = 1;
    if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMPan = function() {
    return this.bgmPan;
};
T2MediaLib_BGMPlayer.prototype.setBGMPan = function(pan) {
    var bgm = this.playingBGM;
    this.bgmPan = pan;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        T2MediaLib.setSEPan(bgm, pan);
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.isBGMLoop = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.picoAudio.isLoop();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoop;
        } else {
            return T2MediaLib.isSELoop(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoop = function(loop) {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.setLoop(loop);
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoop = loop;
        } else {
            T2MediaLib.setSELoop(bgm, loop);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMLoopStartTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return 0;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoopStart;
        } else {
            return T2MediaLib.getSELoopStartTime(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoopStartTime = function(loopStart) {
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoopStart = loopStart;
        } else {
            return T2MediaLib.setSELoopStartTime(bgm, loopStart);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMLoopEndTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.getBGMLength();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoopEnd;
        } else {
            return T2MediaLib.getSELoopEndTime(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoopEndTime = function(loopEnd) {
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoopEnd = loopEnd;
        } else {
            return T2MediaLib.setSELoopEndTime(bgm, loopEnd);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMCurrentTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        var time;
        if (this.bgmPause === 0) {
            time = this.picoAudio.getTime(this.picoAudio.getTiming(this.picoAudio.context.currentTime - this.picoAudio.states.startTime));
        } else {
            time = this.bgmPauseTime;
        }
        return time;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        var time, time2, currenTime, tempo, plusTime, minusTime, mod;

        if (this.bgmPause === 0) {
            currenTime = T2MediaLib.context.currentTime;
            tempo = this.bgmTempo;
        } else {
            currenTime = this.bgmPauseCurrentTime;
            tempo = this.bgmPauseTempo;
        }

        time2 = (currenTime - bgm.playStartTime) * tempo + bgm.plusTime;
        if (bgm.loop) {
            if (bgm.loopEnd - bgm.loopStart > 0) { // ループ範囲正常

                if (time2 < bgm.loopStart) { // ループ範囲前
                    plusTime  = 0;
                    minusTime = 0;
                    mod = bgm.buffer.duration;
                } else { // ループ範囲内
                    plusTime  = bgm.loopStart;
                    minusTime = bgm.loopStart;
                    mod = bgm.loopEnd - bgm.loopStart;
                }
            } else { // ループ範囲マイナス（ループ無効）
                mod = bgm.buffer.duration;
                plusTime = 0;
                minusTime = 0;
            }
        }

        if (bgm.loop) {
            time = ((time2 - minusTime) % mod) + plusTime;
        } else {
            time = time2;
            if (time > bgm.buffer.duration) time = bgm.buffer.duration;
        }
        return time;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.getBGMLength = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.picoAudio.getTime(this.picoAudio.getTiming(Number.MAX_SAFE_INTEGER));
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        return bgm.buffer.duration;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.getPlayingBGMName = function() {
    return this.playingBGMName;
};
T2MediaLib_BGMPlayer.prototype.setOnBGMEndListener = function(listener) {
    if (this.picoAudio == null) {
        this.picoAudio.setOnSongEndListener(listener);
    }
};
T2MediaLib_BGMPlayer.prototype.getPlayingState = function() {
    return this.playingState;
};
T2MediaLib_BGMPlayer.prototype._setPlayingState = function(state, force) {
    if (force || this.playingState != "decoding") {
        this.playingState = state;
        this.playingStatePending = null;
    } else {
        this.playingStatePending = state;
    }
};

// T2MediaLib_SoundData //

var T2MediaLib_SoundData = function(idx, url) {
    this.state = "none"; // "none":データなし, "loading":読み込み中, "loaded":読み込み完了, "decoding":デコード中, "decoded":デコード完了, "error":エラー
    this.errorID = null;
    this.url = null;
    this.fileData = null;
    this.decodedData = null;
};
T2MediaLib_SoundData.prototype.onLoad = function(url) {
    this.state = "loading";
    this.url = url;
};
T2MediaLib_SoundData.prototype.onLoadComplete = function(data) {
    this.state = "loaded";
    this.fileData = data;
};
T2MediaLib_SoundData.prototype.onDecode = function() {
    this.state = "decoding";
};
T2MediaLib_SoundData.prototype.onDecodeComplete = function(data) {
    this.state = "decoded";
    this.decodedData = data;
};
T2MediaLib_SoundData.prototype.onError = function(errorID) {
    this.state = "error";
    this.errorID = errorID;
};
T2MediaLib_SoundData.prototype.isLoadComplete = function() {
    switch(this.state) {
        case "loaded":
        case "decoding":
        case "decoded":
            return true;
    }
    return false;
};
T2MediaLib_SoundData.prototype.isDecoding = function() {
    return this.state == "decoding";
};
T2MediaLib_SoundData.prototype.isDecodeComplete = function() {
    return this.state == "decoded";
};
T2MediaLib_SoundData.prototype.getDecodedData = function() {
    return this.decodedData;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,
    picoAudio : null,

    soundDataAry : [], // T2MediaLib_SoundData

    bgmPlayerMax : 16,
    bgmPlayerAry : [], // T2MediaLib_BGMPlayer

    masterVolume : 1.0,
    seMasterVolume : 1.0,
    bgmMasterVolume : 1.0,

    playingAudio : null,
    audioVolume : 1.0,
    audioTempo : 1.0,
    audioDataAry : {
        data : []
    },

    // 初期化 //
    init : function() {
        if (this.inited) return;
        this.inited=true;
        if (this.disabled) return;
        if (window.AudioContext) {
            T2MediaLib.context = new AudioContext();
        } else if (window.webkitAudioContext) {
            T2MediaLib.context = new webkitAudioContext();
        } else {
            T2MediaLib.context = null;
            console.log('Your browser does not support yet Web Audio API');
        }

        // Web Audio API 起動成功
        if (T2MediaLib.context) {
            // BGMPlayer初期化 (16個生成)
            for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
                T2MediaLib.bgmPlayerAry[i] = new T2MediaLib_BGMPlayer(i);
            }
            // MIDIデコード用PicoAudio生成
            T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
        }
    },

    // CLEAR系関数 //
    allClearData : function() {
        var dataAry = T2MediaLib.soundDataAry;
        for (var data in dataAry) {
            delete dataAry[data];
        }
    },
    clearData : function(idx) {
        var dataAry = T2MediaLib.soundDataAry;
        delete dataAry[idx];
    },

    // SE&BGMの音量 //
    getMasterVolume : function() {
        return T2MediaLib.masterVolume;
    },
    setMasterVolume : function(vol) {
        T2MediaLib.masterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },

    // 配列データからサウンドを作成・登録
    loadSoundFromArray : function (idx, array1, array2) {
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();
        
        var ctx = T2MediaLib.context;
        var numOfChannels = array1 != null && array2 != null ? 2 : 1;
        var audioBuffer = ctx.createBuffer(numOfChannels, array.length, ctx.sampleRate);
        var buffer1 = audioBuffer.getChannelData(0);
        var buffer2 = array2 != null ? audioBuffer.getChannelData(1) : null;
        for (var i = 0; i < array.length ; i++) {
             buffer1[i] = array1[i];
        }
        if (buffer2) {
            for (var i = 0; i < array.length ; i++) {
                 buffer2[i] = array2[i];
            }
        }
        T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
    },
    // サウンドの受信・デコード・登録
    loadSound : function(idx, url, callbacks) { //@hoge1e3
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();
        
        if (!T2MediaLib.context || T2MediaLib.disabled) {
            T2MediaLib.soundDataAry[idx].onError("FUNC_DISABLED_ERROR");
            return null;
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3|mp4|m4a)$/,".ogg");
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    T2MediaLib.soundDataAry[idx].onLoadComplete(arrayBuffer);
                    if (callbacks && callbacks.succ) callbacks.succ(idx);
                } else {
                    T2MediaLib.soundDataAry[idx].onError("XHR_RESPONSE_ERROR");
                    if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
                }
            } else {
                T2MediaLib.soundDataAry[idx].onError("XHR_STATUS_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
            }
        };
        xhr.onerror=function (e) {//@hoge1e3
            T2MediaLib.soundDataAry[idx].onError("XHR_ERROR");
            if (callbacks && callbacks.err) callbacks.err(idx,e+"");
        };
        
        T2MediaLib.soundDataAry[idx].onLoad(url);
        if (url.match(/^data:/) && Util && Util.Base64_To_ArrayBuffer) {//@hoge1e3
            xhr={onload:xhr.onload};
            xhr.response=Util.Base64_To_ArrayBuffer( url.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/i,""));
            xhr.status=200;
            xhr.onload();
        } else {
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';  // XMLHttpRequest Level 2
            xhr.send(null);
        }
        //setTimeout(T2MediaLib.activate.bind(T2MediaLib),0);
    },
    decodeSound: function(idx, callbacks) {
        var soundData = T2MediaLib.soundDataAry[idx];
        if (soundData == null) return;
        
        var arrayBuffer = soundData.fileData;
        soundData.onDecode();
        if (soundData.url.match(/\.(midi?)$/) || soundData.url.match(/^data:audio\/mid/)) {
            // Midi
            // PicoAudio.jsにデコードしてもらう
            if (T2MediaLib.picoAudio == null) {
                T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
            }
            var smf = new Uint8Array(arrayBuffer);
            var data = T2MediaLib.picoAudio.parseSMF(smf);
            T2MediaLib.soundDataAry[idx].onDecodeComplete(data);
            if (callbacks && callbacks.succ) callbacks.succ(idx);
        } else {
            // MP3, Ogg, AAC, WAV
            var successCallback = function(audioBuffer) {
                T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
                if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
            };
            var errorCallback = function(error) {
                if (error instanceof Error) {
                    console.log('T2MediaLib: '+error.message, url);
                } else {
                    console.log('T2MediaLib: Error decodeAudioData()', url);
                }
                T2MediaLib.soundDataAry[idx].onError("DECODE_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx, T2MediaLib.soundDataAry[idx]);//@hoge1e3
            };
            T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
        }
    },
    activate: function () {
      // create empty buffer
        this.init();
        if (this.isActivated) return;
        this.isActivated=true;
        var myContext=T2MediaLib.context;
        var buffer = myContext.createBuffer(1, Math.floor(myContext.sampleRate/32), myContext.sampleRate);
        var ary = buffer.getChannelData(0);
        var lam = Math.floor(myContext.sampleRate/860);
        for (var i = 0; i < ary.length; i++) {
             //ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
             ary[i] = 0; // 無音化
        }
        //console.log(ary);
        var source = myContext.createBufferSource();
        source.buffer = buffer;
        // connect to output (your speakers)
        source.connect(myContext.destination);
        // play the file
        if (source.noteOn) source.noteOn(0);
        else if (source.start) source.start(0);
    },
    getSoundData : function(idx) {
        var soundDataObj = T2MediaLib.soundDataAry[idx];
        if (soundDataObj) {
            return soundDataObj.getDecodedData();
        } else {
            return null;
        }
    },

    // SEメソッド郡 //

    playSE : function(idx, vol, pan, rate, offset, loop, loopStart, loopEnd) {
        if (!T2MediaLib.context) return null;
        var soundData = T2MediaLib.soundDataAry[idx];
        if (!soundData.isDecodeComplete()) {
            var callbacks = {};
            callbacks.succ = function() {
                T2MediaLib.playSE(idx, vol, pan, rate, offset, loop, loopStart, loopEnd);
            };
            callbacks.err = function() {
            };
            T2MediaLib.decodeSound(idx, callbacks);
            return null;
        }
        
        var audioBuffer = soundData.decodedData;
        if (!(audioBuffer instanceof AudioBuffer)) return null;

        // 引数チェック
        if (vol == null) {
            vol = 1.0;
        }
        if (pan == null) {
            pan = 0.0;
        }
        if (!rate) rate = 1.0;
        if (!offset) {
            offset = 0;
        } else {
            if      (offset > audioBuffer.duration) offset = audioBuffer.duration;
            else if (offset < 0.0) offset = 0.0;
        }
        if (!loop) loop = false;
        if (!loopStart) {
            loopStart = 0.0;
        } else {
            if      (loopStart < 0.0) loopStart = 0.0;
            else if (loopStart > audioBuffer.duration) loopStart = audioBuffer.duration;
        }
        if (!loopEnd) {
            loopEnd = audioBuffer.duration;
        } else {
            if      (loopEnd < 0.0) loopEnd = 0.0;
            else if (loopEnd > audioBuffer.duration) loopEnd = audioBuffer.duration;
        }

        var source = T2MediaLib.context.createBufferSource();
        T2MediaLib.context.createGain = T2MediaLib.context.createGain || T2MediaLib.context.createGainNode;
        var gainNode = T2MediaLib.context.createGain();
        var panNode = T2MediaLib.context.createPanner();

        source.buffer = audioBuffer;
        source.loop = loop;
        source.loopStart = loopStart;
        source.loopEnd = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 音量＆パン設定
        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(T2MediaLib.context.destination);
        panNode.panningModel = "equalpower";
        if      (pan < -1.0) pan = -1.0;
        else if (pan >  1.0) pan =  1.0;
        var panAngle = pan * 90;
        var panX = Math.sin(panAngle * (Math.PI / 180));
        var panZ = -Math.cos(panAngle * (Math.PI / 180));
        if (pan === -1.0 || pan === 1.0) panZ = 0; // 6.123233995736766e-17となるので0にしておく
        if (panNode.positionX) {
            panNode.positionX.value = panX;
            panNode.positionY.value = 0;
            panNode.positionZ.value = panZ;
        } else {
            panNode.setPosition(panX, 0, panZ);
        }
        // 左右どちらかにパンがよると、音量が大きくなるので半減する
        //gainNode.gain.value = vol / (1 + Math.abs(pan));
        // ↑パンはそいうものらしいので、音量はそのままにする
        gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;

        // ループ開始位置修正
        var offset_adj;
        if (loop && loopEnd - loopStart > 0 && offset > loopEnd) {
            offset_adj = loopEnd;
        } else {
            offset_adj = offset;
        }

        // 変数追加
        source.gainNode = gainNode;
        source.volumeValue = vol;
        source.panNode = panNode;
        source.panValue = pan;
        source.playStartTime = T2MediaLib.context.currentTime;
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;

        if (offset) {
            if (loop) source.start(0, offset, 86400);
            else      source.start(0, offset);
        } else {
            source.start(0);
        }

        source.onended = function(event) { 
            source.disconnect();
            source.onended = null;
            delete source.gainNode;
            delete source.panNode;
        };

        return source;
    },
    stopSE : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    getSEMasterVolume : function() {
        return T2MediaLib.seMasterVolume;
    },
    setSEMasterVolume : function(vol) {
        T2MediaLib.seMasterVolume = vol;
    },
    getSEVolume : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return source.volumeValue;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;
        source.volumeValue = vol;
        return sourceObj;
    },
    getSERate : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.playbackRate.value;
    },
    setSERate : function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    },
    getSEPan : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.panValue;
    },
    setSEPan : function(sourceObj, pan) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        var panNode = sourceObj.panNode;
        if      (pan < -1.0) pan = -1.0;
        else if (pan >  1.0) pan =  1.0;
        var panAngle = pan * 90;
        var panX = Math.sin(panAngle * (Math.PI / 180));
        var panZ = Math.cos(panAngle * (Math.PI / 180));
        if (pan === -1.0 || pan === 1.0) panZ = 0; // 6.123233995736766e-17となるので0にしておく
        if (panNode.positionX) {
            panNode.positionX.value = panX;
            panNode.positionY.value = 0;
            panNode.positionZ.value = panZ;
        } else {
            panNode.setPosition(panX, 0, panZ);
        }
        sourceObj.panValue = pan;
    },
    isSELoop : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loop;
    },
    setSELoop : function(sourceObj, loop) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loop = loop;
    },
    getSELoopStartTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopStart;
    },
    setSELoopStartTime : function(sourceObj, loopStart) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopStart = loopStart;
    },
    getSELoopEndTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopEnd;
    },
    setSELoopEndTime : function(sourceObj, loopEnd) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopEnd = loopEnd;
    },

    // BGMメソッド郡 //

    playBGM : function(id, idx, loop, offset, loopStart, loopEnd) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.playBGM(idx, loop, offset, loopStart, loopEnd);
    },
    stopBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.stopBGM();
    },
    pauseBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.pauseBGM();
    },
    resumeBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.resumeBGM();
    },
    getBGMMasterVolume : function() {
        return T2MediaLib.bgmMasterVolume;
    },
    setBGMMasterVolume : function(vol) {
        T2MediaLib.bgmMasterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },
    getBGMVolume : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMVolume();
    },
    setBGMVolume : function(id, vol) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMVolume(vol);
    },
    getBGMTempo : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMTempo();
    },
    setBGMTempo : function(id, tempo) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMTempo(tempo);
    },
    getBGMPan : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMPan();
    },
    setBGMPan : function(id, pan) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMPan(pan);
    },
    isBGMLoop : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.isBGMLoop();
    },
    setBGMLoop : function(id, loop) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoop(loop);
    },
    getBGMLoopStartTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopStartTime();
    },
    setBGMLoopStartTime : function(id, loopStart) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopStartTime(loopStart);
    },
    getBGMLoopEndTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopEndTime();
    },
    setBGMLoopEndTime : function(id, loopEnd) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopEndTime(loopEnd);
    },
    getBGMCurrentTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMCurrentTime();
    },
    getBGMLength : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLength();
    },
    getPlayingBGMName : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getPlayingBGMName();
    },
    setOnBGMEndListener : function(id, listener) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setOnBGMEndListener(listener);
    },
    getBGMPlayerMax : function() {
        return T2MediaLib.bgmPlayerMax;
    },
    allStopBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
        }
    },
    allResetBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
            T2MediaLib.setBGMVolume(i, 1.0);
            T2MediaLib.setBGMTempo(i, 1.0);
            T2MediaLib.setBGMPan(i, 0.0);
        }
        T2MediaLib.setMasterVolume(1.0);
        T2MediaLib.setSEMasterVolume(1.0);
        T2MediaLib.setBGMMasterVolume(1.0);
    },

    // Audioメソッド郡 //

    loadAudio : function(idx, url) {
        var audio = new Audio(url);
        audio.play();

        T2MediaLib.audioDataAry.data[idx] = null;

        audio.addEventListener('loadstart', function() {
            if (!T2MediaLib.context) return null;
            var source = T2MediaLib.context.createMediaElementSource(audio);
            source.connect(T2MediaLib.context.destination);
        }, false);

        audio.addEventListener('canplay', function() {
            T2MediaLib.audioDataAry.data[idx] = audio;
        }, false);

        audio.load();

    },
    playAudio : function(idx, loop, startTime) {
        var audio = T2MediaLib.audioDataAry.data[idx];
        if (!audio) return null;
        if (!startTime) startTime = 0;

        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.pause();
            T2MediaLib.playingAudio.currentTime = 0;
        }
        T2MediaLib.playingAudio = audio;
        audio.loop = loop;
        audio.volume = T2MediaLib.audioVolume;
        audio.currentTime = startTime;
        audio.play();
        return audio;
    },
    stopAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!(audio instanceof Audio)) return null;
        audio.pause();
        audio.currentTime = 0;
        T2MediaLib.playingAudio = null;
        return audio;
    },
    pauseAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!audio) return null;
        audio.pause();
        return audio;
    },
    resumeAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!audio) return null;
        audio.play();
        return audio;
    },
    setAudioVolume : function(vol) {
        T2MediaLib.audioVolume = vol;
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.volume = vol;
        }
    },
    setAudioTempo : function(tempo) {
        T2MediaLib.audioTempo = tempo;
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.playbackRate = tempo;
        }
    },
    setAudioPosition : function(time) {
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.currentTime = time;
        }
    },
    getAudioData : function(idx) {
        return T2MediaLib.audioDataAry.data[idx];
    },
    getAudioCurrentTime : function() {
        if (!(T2MediaLib.playingAudio instanceof Audio)) return null;
        return T2MediaLib.playingAudio.currentTime;
    },
    getAudioLength : function() {
        if (!(T2MediaLib.playingAudio instanceof Audio)) return null;
        return T2MediaLib.playingAudio.duration;
    }
};

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
            $edits.validator.on.validate.call($edits.validator, $edits.model);
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
            setTimeout(F(l),50);
        }
        function l() {
            listeners.forEach(function (li) {
                li();
            });
            setTimeout(F(l),50);
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
                } else if (k=="css" && o[k]!=null) {//ADDJSL
                    jq.css(o[k]);
                } else if (!Util.startsWith(k,"$") && o[k]!=null) {//ADDJSL
                    jq.attr(k,o[k]);
                }
            }
            function on(eType, li) {
                if (!li) return; //ADDJSL
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

requireSimulator.setName('UIDiag');
define(["UI"],function (UI) {
    var UIDiag={};
    UIDiag.confirm=function (mesg) {
        var di=UI("div",{title:"確認"},["div",mesg],
                ["button",{on:{click:sendF(true)}},"OK"],
                ["button",{on:{click:sendF(false)}},"キャンセル"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    UIDiag.alert=function (mesg) {
        var di=UI("div",{title:"確認"},["div",mesg],
                ["button",{on:{click:sendF(true)}},"OK"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };

    UIDiag.prompt=function (mesg,value) {
        var di=UI("div",{title:"入力"},["div",mesg],
                ["input",{on:{enterkey:ok},$var:"val", value:value}],["br"],
                ["button",{on:{click:ok}},"OK"],
                ["button",{on:{click:cancel}},"キャンセル"]).dialog({width:"auto",close:function (){
                    di.dialog("close");
                    d.resolve();
                }});
        setTimeout(function () {
            di.$vars.val.focus();
            //console.log("FOcus");
        },10);
        var d=$.Deferred();
        function ok() {
            var r=di.$vars.val.val();
            d.resolve(r);
            di.dialog("close");
            di.remove();
        }
        function cancel() {
            di.dialog("close");
            di.remove();
            d.resolve();
        }
        return d.promise();

    };
    if (typeof window!="undefined") window.UIDiag=UIDiag;
    return UIDiag;
});
requireSimulator.setName('runtime');
requirejs(["ImageList","PicoAudio","T2MediaLib","Tonyu","UIDiag"], function () {

});
requireSimulator.setName('runScript2');
requirejs(["FS","compiledTonyuProject","Shell","runtime","WebSite","LSFS","Tonyu","NativeFS"],
        function (FS,  CPTR, sh,  rt,WebSite,LSFS,Tonyu) {
    $(function () {

        SplashScreen={
            hide: function () {$("#splash").hide();},
            show:function(){},
            progress:function(t) {$("#splash").text(t);}
        };

        function getMargin() {
            var u = navigator.userAgent.toLowerCase();
            if ((u.indexOf("iphone") != -1
                || u.indexOf("ipad") != -1
                || u.indexOf("ipod") != -1
                ) && window != window.parent) {
                return 40;
            }
            return 0;
        }

        var margin = getMargin();
        var w=$(window).width();
        var h=$(window).height();
        $("body").css({overflow:"hidden", margin:"0px"});
        var cv=$("<canvas>").attr({width: w-margin, height:h-margin}).appendTo("body");
        $(window).resize(onResize);
        function onResize() {
            var margin = getMargin();
            w=$(window).width();
            h=$(window).height();
            cv.attr({width: w-margin, height: h-margin});
        }

        var curProjectDir;
        if (WebSite.isNW) {
            var home=location.href.replace(/^file:\/\//,"");
            if (home.match(/^\/[a-z]:/i)) {
                home=home.replace(/^\//,"");
            }
            home=FS.get(home);
            if (!home.isDir()) home=home.up();
            curProjectDir=home.rel("data/");
        } else {
            var locs=location.href.replace(/\?.*/,"").split(/\//);
            var prj=locs.pop() || "runscript";
            var user=locs.pop() || "nobody";
            var home=FS.get(WebSite.tonyuHome);
            var ramHome=FS.get("/ram/");
            FS.mount(ramHome.path(), LSFS.ramDisk() );
            curProjectDir=ramHome;
            var actualFilesDir=home.rel(user+"/"+prj+"/");
            ramHome.rel("files/").link(actualFilesDir);
        }

        loadFiles(curProjectDir);
        sh.cd(curProjectDir);
        WebSite.compiledKernel="js/kernel.js";
        var curPrj=CPTR("user", "js/concat.js",curProjectDir);
        start();
        function start() {
            Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
            var o=curPrj.getOptions();
            curPrj.runScriptMode=true;
            curPrj.run(o.run.bootClass);
        }
    });
});

requireSimulator.setName();
