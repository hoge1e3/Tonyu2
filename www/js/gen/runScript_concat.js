// Created at Sat Dec 16 2017 17:54:39 GMT+0900 (東京 (標準時))
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

requireSimulator.setName('FS');
// This is kowareta! because r.js does not generate module name:
//   define("FSLib",[], function () { ...
//(function (global) {
//var useGlobal=(typeof global.define!="function");
//var define=(useGlobal ? define=function(_,f){f();} : global.define);
define([],function () {
    var define,requirejs;
	var R={};
	var REQJS="REQJS_";
	var reqjsSeq=0;
	R.def=function (name, reqs,func) {
		var m=R.getModuleInfo(name);
		if (typeof reqs=="function") {
		    func=reqs;
		    reqs=R.reqsFromFunc(func);
    		R.setReqs( m, reqs);
    		m.func=function () {
    		    var module={exports:{}};
    			var res=func(R.doLoad,module,module.exports);
    			return res || module.exports;
    		};
		} else {
    		R.setReqs( m, reqs);
    		m.func=function () {
    			return func.apply(this, R.getObjs(reqs));
    		};
		}
		R.loadIfAvailable(m);
	};
	define=function (name,reqs,func) {
		R.def(name, reqs,func);
	};
	define.amd={};
	requirejs=function (reqs,func) {
		R.def(REQJS+(reqjsSeq++),reqs,func);
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
		return ms[name]=ms[name]||{name:name,reqs:{},revReqs:{}};
	};
	R.doLoad=function (name) {
		var m=R.getModuleInfo(name);
		if (m.loaded) return m.obj;
		m.loaded=true;
		var res=m.func();
	    if ( res==null && !name.match(/^REQJS_/)) console.log("Warning: No obj for "+name);
		m.obj=res;
		for (var i in m.revReqs) {
			R.notifyLoaded(m.revReqs[i], m.name);
		}
		return res;
	};
	R.notifyLoaded=function (dependingMod, loadedModuleName) {
	    // depengindMod depends on loadedModule
		delete dependingMod.reqs[loadedModuleName];
		R.loadIfAvailable(dependingMod);
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
	R.reqsFromFunc=function (f) {
	    var str=f+"";
	    var res=[];
	    str.replace(/require\s*\(\s*["']([^"']+)["']\s*\)/g,function (m,a) {
	       res.push(a);
	    });
	    return res;
	};
	R.modules={};
	//requireSimulator=R;
//----------
define('extend',[],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
   };
});

define('assert',[],function () {
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
            throw new Error(e.stack);
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

define('PathUtil',["assert"],function (assert) {
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
    hasBackslashSep:function (path) {
        return path.indexOf("\\")>=0;   
    },
    fixSep: function (path,to) {
        to=to||"/";
        assert.is(arguments,[String]);
        return assert.is( path.replace(/[\\\/]/g,to), Path);
    },
    directorify: function (path) {
        //path=PathUtil.fixSep(path);
        if (PathUtil.isDir(path)) return path;
        return assert.is(path+SEP, Dir);
    },
    filify: function (path) {
        //path=PathUtil.fixSep(path);
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
        //path=PathUtil.fixSep(path);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
["directorify", "filify", "splitPath", "name", "rel", "relPath", "up"].forEach(function (k) {
    var old=PathUtil[k];
    PathUtil[k]=function () {
        var backslashifyAfter=false;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (PathUtil.hasBackslashSep(e)) {
                backslashifyAfter=true; 
                return PathUtil.fixSep(e);
            } else {
                return e;
            }
        });
        var res=old.apply(PathUtil,a);
        if (backslashifyAfter) {
            return PathUtil.fixSep(res,"\\");
        } else {
            return res;
        }
    };
});

PathUtil.isAbsolute=PathUtil.isAbsolutePath;
PathUtil.isRelative=PathUtil.isRelativePath;
if (typeof window=="object") window.PathUtil=PathUtil;
return PathUtil;
});
define('MIMETypes',[], function () {
   return {
      ".png":"image/png",
      ".gif":"image/gif",
      ".jpeg":"image/jpeg",
      ".jpg":"image/jpeg",
      ".ico":"image/icon",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".midi":"audio/midi",
      ".mid":"audio/midi",
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
      ".tonyu":"text/tonyu",
      ".c":"text/c",
      ".dtl":"text/dolittle"
   };
});

define('DeferredUtil',[], function () {
    //  promise.then(S,F)  and promise.then(S).fail(F) is not same!
    //  ->  when fail on S,  F is executed?
    var DU;
    var DUBRK=function(r){this.res=r;};
    DU={
        isNativePromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise!=="function") && (typeof p.catch==="function") ;
        },
        isJQPromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise==="function") &&(typeof p.fail==="function") ;
        },
        isPromise: function (p) {
            return p && (typeof p.then==="function") &&
            ((typeof p.promise==="function") || (typeof p.catch==="function")) ;
        },
        all: function (a) {
            //var a=Array.prototype.slice.call(arguments);
            return DU.promise(function (succ,fail) {
                var res=[],rest=a.length;
                a.forEach(function (p, i) {
                    DU.resolve(p).then(function (r) {
                        res[i]=r;
                        rest--;
                        if (rest===0) {
                            succ(res);
                        }
                    },fail);
                });
            });
        },
        resolve: function (p) {
            if (DU.config.useJQ && DU.isJQPromise(p)) return p;
            if (!DU.config.useJQ && DU.isNativePromise(p)) return p;
            return DU.promise(function (succ,fail) {
                if (DU.isPromise(p)) {
                    p.then(succ,fail);
                } else {
                    succ(p);
                }
            });
            /*if (DU.isPromise(p)) { // NO! it returns Promise when using JQPromise and vise versa.
                return f;
            }
            if (DU.confing.useJQ) {
                return $.when(p);
            }*/
        },
        throwNowIfRejected: function (p) {
            // If Promise p has already rejected, throws the rejeceted reason immediately.
            var state;
            var err;
            var res=p.then(function (r) {
                if (!state) {
                    state="resolved";
                }
                return r;
            },function (e) {
                if (!state) {
                    state="rejected";
                    err=e;
                } else {
                    return DU.reject(e);
                }
            });
            if (!state) state="notyet";
            if (state==="rejected") throw err;
            return res;
        },
        assertResolved: function (p) {
            var res,resolved;
            p.then(function (r) {
                res=r;
                resolved=true;
            });
            if (!resolved) {
                console.log(r);
                throw new Error("Promise not resolved");
            }
            return res;
        },
        /*toJQPromise: function (p) {// From native Promise
            if (!p) return $.when(p);
            if ($.isFunction(p.promise)) return p;
            if (!$.isFunction(p.then) || !$.isFunction(p.catch)) return $.when(p);
            var d=new $.Deferred();
            p.then(function (r) {
                d.resolve(r);
            }).catch(function (r) {
                d.reject(r);
            });
            return d.promise();
        },*/
        ensureDefer: function (v) {
            return DU.promise(function (resolve,reject) {
                var isDeferred;
                DU.resolve(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            resolve(r);
                        },0);
                    } else {
                        resolve(r);
                    }
                }).fail(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            reject(r);
                        },0);
                    } else {
                        reject(r);
                    }
                });
                isDeferred=true;
            });
        },
        directPromise:function (v) {
            return DU.timeout(v,0);
        },
        then: function (f) {
            return DU.directPromise().then(f);
        },
        timeout:function (timeout,value) {
            return DU.promise(function (resolve) {
                setTimeout(function () {resolve(value);},timeout||0);
            });
        },
        funcPromise:function (f) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                try {
                    f(function (v) {
                        d.resolve(v);
                    },function (e) {
                        d.reject(e);
                    });
                }catch(e) {
                    d.reject(e);
                }
                return d.promise();
            } else if (DU.external.Promise) {
                return new DU.external.Promise(function (resolve,reject) {
                    try {
                        f(resolve,reject);
                    }catch(e) {
                        reject(e);
                    }
                });
            } else {
                throw new Error("promise is not found");
            }
        },
        reject: function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                d.reject(e);
                return d.promise();
            } else {
                return new JQ.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
        },
        throwPromise:function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                setTimeout(function () {
                    d.reject(e);
                }, 0);
                return d.promise();
            } else {
                return new JQ.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
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
                    return DU.resolve(f(set[i],i)).then(function () {
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
            try {
                var err;
                while(true) {
                    if (r instanceof DUBRK) return DU.when1(r.res);
                    var deff1=true, deff2=false;
                    // ★ not deffered  ☆  deferred
                    var r1=f(r);
                    var dr=DU.resolve(r1).then(function (r2) {
                        r=r2;
                        deff1=false;
                        if (r instanceof DUBRK) return r.res;
                        if (deff2) return DU.loop(f,r); //☆
                    }).fail(function (e) {
                        deff1=false;
                        err=e;
                    });
                    if (err) throw err;
                    deff2=true;
                    if (deff1) return dr;//☆
                    //★
                }
            }catch (e) {
                return DU.reject(e);
            }
        },
        brk: function (res) {
            return new DUBRK(res);
        },
        tryLoop: function (f,r) {
            return DU.loop(DU.tr(f),r);
        },
        tryEach: function (s,f) {
            return DU.loop(s,DU.tr(f));
        },
        documentReady:function () {
            return DU.callbackToPromise(function (s) {$(s);});
        },
        requirejs:function (modules) {
            if (!window.requirejs) throw new Error("requirejs is not loaded");
            return DU.callbackToPromise(function (s) {
                window.requirejs(modules,s);
            });
        }
    };
    DU.NOP=function (r) {return r;};
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (window.$ && window.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:window.Promise};
    if (!window.DeferredUtil) window.DeferredUtil=DU;
    return DU;
});

define('FS2',["extend","PathUtil","MIMETypes","assert","DeferredUtil"],
function (extend, P, M,assert,DU){
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
            return DU.resolve(this.getContent.apply(this,arguments));
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        setContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("setContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.setContent(path,content,options));
            });
        },
        appendContent: function (path, content, options) {
            //var nc=this.getContent(path,options).toPlainText()+content.toPlainText();
            //return this.setContent(path, Content.fromPlainText(nc) , options);
            stub("");
        },
        appendContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("appendContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.appendContent(path,content,options));
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
        opendirAsync: function (path, options) {
            if (!this.supportsSync()) stub("opendirAsync");
            return DU.resolve(this.opendir.apply(this,arguments));
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
                        console.log("Invoked for other fs",this.mountPoint, fs.mountPoint)
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
            return M[e] || (options||{}).def || "application/octet-stream";
        },
        getBlob: function (path, options) {
            var c=this.getContent(path);
            options=options||{};
            options.blobType=options.blobType||Blob;
            options.binType=options.binType||ArrayBuffer;
            if (c.hasPlainText()) {
                return new options.blobType([c.toPlainText()],this.getContentType(path));
            } else {
                return new options.blobType([c.toBin(options.binType)],this.getContentType(path));
            }
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
        },
        opendirEx: function (path, options) {
            assert.is(path, P.AbsDir);
            var ls=this.opendir(path);
            var t=this;
            var dest={};
            ls.forEach(function (f) {
                var p=P.rel(path,f);
                dest[f]=t.getMetaInfo(p);
            });
            return dest;
        },
        getDirTree: function (path, options) {
            options=options||{};
            var dest=options.dest=options.dest||{};
            options.style=options.style||"flat-absolute";
            options.excludes=options.excludes||[];
            assert.is(options.excludes,Array);
            if (!options.base) {
                options.base=path;
            }
            assert.is(path, P.AbsDir);
            var tr=this.opendirEx(path,options);
            if (options.style=="no-recursive") return tr;
            var t=this;
            for (var f in tr) {
                var meta=tr[f];
                var p=P.rel(path,f);
                var relP=P.relPath(p,options.base);
                switch(options.style) {
                    case "flat-relative":
                    case "hierarchical":
                        if (options.excludes.indexOf(relP)>=0) {
                            continue;
                        }
                        break;
                    case "flat-absolute":
                        if (options.excludes.indexOf(p)>=0) {
                            continue;
                        }
                        break;
                }
                if (t.isDir(p)) {
                    switch(options.style) {
                    case "flat-absolute":
                    case "flat-relative":
                        t.getDirTree(p,options);
                        break;
                    case "hierarchical":
                        options.dest={};
                        dest[f]=t.getDirTree(p,options);
                        break;
                    }
                } else {
                    switch(options.style) {
                    case "flat-absolute":
                        dest[p]=meta;
                        break;
                    case "flat-relative":
                        dest[relP]=meta;
                        break;
                    case "hierarchical":
                        dest[f]=meta;
                        break;
                    }
                }
            }
            return dest;
        }
        /*get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }*/

    });
    return FS;
});

define('Util',[],function () {
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
function extend(d,s) {
    for (var i in (s||{})) {d[i]=s[i];} 
    return d;
}
return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    privatize: privatize,extend:extend
};
});

define('Content',["assert","Util"],function (assert,Util) {
    var Content=function () {};
    var extend=Util.extend;
    // ------ constructor
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
        if (Content.isBuffer(a)) {
            var u=new Uint8Array(a);
            var r=u.buffer;
            if (r instanceof ArrayBuffer) return r;
            var ary=Array.prototype.slice.call(u);
            return assert(new Uint8Array(ary).buffer,"n2a: buf is not set");
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
        if (bin && Content.isBuffer(bin.buffer)) {
            b.arrayBuffer=bin.buffer;
        } else if (Content.isNodeBuffer(bin)) {
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.arrayBuffer=bin;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };
    Content.looksLikeDataURL=function (text) {
        return text.match(/^data:/);
    };
    //------- methods
    var p=Content.prototype;
    p.toBin = function (binType) {
        binType=binType || (Content.hasNodeBuffer() ? Buffer: ArrayBuffer);
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
            return this.setBuffer( Content.str2utf8bytes(this.plain, binType) );
        }
        throw new Error("No data");
    };
    p.setBuffer=function (b) {
        assert(b,"b is not set");
        if (Content.isNodeBuffer(b)) {
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
                this.arrayBuffer=Content.str2utf8bytes(this.plain,ArrayBuffer);
            }
            if (this.arrayBuffer || this.nodeBuffer) {
                var d=new DataURL(this.arrayBuffer || this.nodeBuffer,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.hasPlainText()) {
            return this.plain;
        } else {
            if (this.url && !this.hasBin() ) {
                var d=new DataURL(this.url,ArrayBuffer);
                this.arrayBuffer=d.buffer;
            }
            if (this.hasBin()) {
                return this.plain=Content.utf8bytes2str(
                        this.nodeBuffer || new Uint8Array(this.arrayBuffer)
                );
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.nodeBuffer || this.arrayBuffer;};
    p.hasNodeBuffer= function () {return this.nodeBuffer;};
    p.hasArrayBuffer= function () {return this.arrayBuffer;};
    //--------Util funcs
    // From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
    Content.Base64_To_ArrayBuffer=function (base64,binType){
	    var A=binType||ArrayBuffer;
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
        var ary_u8 = (Content.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer ));//new Uint8Array( ary_buffer );
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
    };

    Content.Base64_From_ArrayBuffer=function (ary_buffer){
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
    };

    Content.hasNodeBuffer=function () {
        return typeof Buffer!="undefined";
    };
    Content.isNodeBuffer=function (data) {
        return (Content.hasNodeBuffer() && data instanceof Buffer);
    };
    Content.isBuffer=function (data) {
        return data instanceof ArrayBuffer || Content.isNodeBuffer(data);
    };
    Content.utf8bytes2str=function (bytes) {
        var e=[];
        for (var i=0 ; i<bytes.length ; i++) {
             e.push("%"+("0"+bytes[i].toString(16)).slice(-2));
        }
        //try {
            return decodeURIComponent(e.join(""));
        /*} catch (er) {
            console.log(e.join(""));
            throw er;
        }*/
    };
    Content.str2utf8bytes=function (str, binType) {
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
    };
    //-------- DataURL
    var A=Content.hasNodeBuffer() ? Buffer :ArrayBuffer;
    //var isBuffer=Util.isBuffer;
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
          this.binType=contentType || A;
          this.dataURL2bin(data);
      } else if (data && Content.isBuffer(data.buffer)) {
          this.buffer=data.buffer;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else if (Content.isBuffer(data)) {
          this.buffer=data;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else {
          console.log(arguments);
          assert.fail("Invalid args: ",arguments);
      }
   };
   Content.DataURL=DataURL;
   extend(DataURL.prototype,{
      bin2dataURL: function (b, contentType) {
          assert(Content.isBuffer(b));
          assert.is(contentType,String);
  	     var head=this.dataHeader(contentType);
	     var base64=Content.Base64_From_ArrayBuffer(b);
	     assert.is(base64,String);
	     return this.url=head+base64;
	  },
	  dataURL2bin: function (dataURL) {
          assert.is(arguments,[String]);
	      var reg=/^data:([^;]+);base64,/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Content.Base64_To_ArrayBuffer(dataURL.substring(r[0].length) , this.binType);
          return assert.is(this.buffer , this.binType);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

    return Content;
});

define('NativeFS',["FS2","assert","PathUtil","extend","Content"],
        function (FS,A,P,extend,Content) {
    var available=(typeof process=="object"/* && process.__node_webkit*/);
    if (!available) {
        return function () {
            throw new Error("This system not support native FS");
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
        //console.log("tonat:MP",P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP)));
        return P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return a;
    };

    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
        //console.log("inmyfs",path);
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
            /*if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {*/
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            //}
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
        appendContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.appendFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.appendFileSync(np, content.toPlainText());
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
            options=options||{};
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np);
            if (!options.nosep) {
                r=r.map(function (e) {
                    var s=fs.statSync(ts+SEP+e);
                    var ss=s.isDirectory()?SEP:"";
                    return e+ss;
                });
            }
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
        // mv: is Difficult, should check dst.fs==src.fs
        //     and both have not subFileSystems
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

define('LSFS',["FS2","PathUtil","extend","assert","Util","Content"],
        function(FS,P,extend,assert,Util,Content) {
    var LSFS = function(storage,options) {
        assert(storage," new LSFS fail: no storage");
    	this.storage=storage;
    	this.options=options||{};
    	if (this.options.useDirCache) this.dirCache={};
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
    LSFS.ramDisk=function (options) {
        var s={};
        s[P.SEP]="{}";
        options=options||{};
        if (!("useDirCache" in options)) options.useDirCache=true;
        return new LSFS(s,options);
    };
    FS.addFSType("localStorage",function (path, options) {
        return new LSFS(localStorage,options);
    });
    FS.addFSType("ram",function (path, options) {
        return LSFS.ramDisk(options);
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
        assert(this.storage,"No storage");
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
        if (this.dirCache && this.dirCache[path]) return this.dirCache[path];
        var dinfo =  {};
        try {
            var dinfos = this.getItem(path);
            if (dinfos) {
                dinfo = JSON.parse(dinfos);
            }
        } catch (e) {
            console.log("dinfo err : " , path , dinfos);
        }
        if (this.dirCache) this.dirCache[path]=dinfo;
        return dinfo;
    };
    LSFS.prototype.putDirInfo=function putDirInfo(path, dinfo, trashed) {
  	    assert.is(arguments,[P.AbsDir, Object]);
  	    if (!isDir(path)) throw new Error("Not a directory : " + path);
  	    assert(this.inMyFS(path));
  	    if (this.dirCache) this.dirCache[path] = dinfo;
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
        this.getRootFS().notifyChanged(P.rel(path,name), dinfo[name]);
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
            var cs=this.getItem(path);
            if (Content.looksLikeDataURL(cs)) {
                c=Content.url(cs);
            } else {
                c=Content.plainText(cs);
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            var t=null;
            if (content.hasPlainText()) {
                t=content.toPlainText();
                if (Content.looksLikeDataURL(t)) t=null;
            }
            if (t!=null) {
                this.setItem(path, t);
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
                    if (this.dirCache) this.dirCache[path]={};
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
        },
        opendirEx: function (path,options) {
            assert.is(path,P.AbsDir);
            options=options||{};
            var res={};
            var d=this.getDirInfo(path);
            if (options.includeTrashed) {
                //console.log("INCLTR",d);
                return d;
            }
            for (var k in d) {
                if (d[k].trashed) continue;
                res[k]=d[k];
            }
            return res;
        }
    });
    return LSFS;

});

/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
                // setup all variables
                var xhr = new XMLHttpRequest(),
                url = options.url,
                type = options.type,
                async = options.async || true,
                // blob or arraybuffer. Default is blob
                dataType = options.responseType || "blob",
                data = options.data || null,
                username = options.username || null,
                password = options.password || null;

                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
define("jquery.binarytransport", function(){});

define('WebFS',["FS2","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
        function (FS,j,DU,Content,P) {
    // FS.mount(location.protocol+"//"+location.host+"/", "web");
    var WebFS=function (){};
    var p=WebFS.prototype=new FS;
    FS.addFSType("web", function () {
        return new WebFS;
    });
    p.fstype=function () {return "Web";};
    p.supportsSync=function () {return false;};
    p.inMyFS=function (path) {
        return P.isURL(path);
    };
    FS.delegateMethods(p, {
        exists: function () {return true;},
        getContentAsync: function (path){
            var t=this;
            return DU.promise(function (succ,err) {
                $.get(path,function (blob) {
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function() {
                        succ(Content.bin(reader.result, t.getContentType(path)));
                    });
                    reader.readAsArrayBuffer(blob);
                },"binary").fail(err);
            });
        },
        /*setContentAsync: function (path){

        },*/
        getURL: function (path) {
            return path;
        }
    });

    return WebFS;

});
define('Env',["assert","PathUtil"],function (A,P) {
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
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define('FileSaver.min',[],function(){return saveAs});
define('SFile',["extend","assert","PathUtil","Util","Content","FS2","FileSaver.min","DeferredUtil"],
function (extend,A,P,Util,Content,FS2,sv,DU) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    //A(fs && fs.getReturnTypes, fs);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    /*this.act={};// path/fs after follwed symlink
    this.act.path=this.fs.resolveLink(path);
    this.act.fs=rootFS.resolveFS(this.act.path);
    A.is(this.act, {fs:FS2, path:P.Absolute});*/
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
    up: function () {
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
    sibling: function (n) {
        return this.up().rel(n);
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
        return this.act.fs.touch(this.act.path);
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
    getDirTree: function (options) {
        return this.act.fs.getDirTree(this.act.path, options);
    },
    assertExists: function () {
        A(this.exists(),this.path()+" does not exist.");
    },
    lastUpdate:function () {
        this.assertExists();
        return this.metaInfo().lastUpdate;
    },
    exists: function (options) {
        var args=Array.prototype.slice.call(arguments);
        if (typeof args[0]==="function") {
            var f=args.shift();
            return DU.resolve(this.exists.apply(this,args)).then(f);
        }
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
        var t=this;
        options=options||{};
        if (this.isLink()) {
            return DU.resolve(this.fs.rm(this.path(),options));
        }
        /*if (!this.exists({noFollowLink:true})) {
            return this.act.fs.rm(this.act.path, options);
        }*/
        var a;
        if (this.isDir() && (options.recursive||options.r)) {
            a=this.each(function (f) {
                return f.rm(options);
            });
        } else {
            a=DU.resolve();
        }
        return a.then(function () {
            return t.act.fs.rm(t.act.path, options);
        });
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
    text:function (f) {
    	if (typeof f==="function") {
			return this.getText(f);
		}
        if (arguments.length>0) {
            return this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        var ct=this.contentType({def:null});
        //if (this.isText()) {
        if (ct!==null && !ct.match(/^text/) && Content.looksLikeDataURL(t)) {
            // bad knowhow: if this is a binary file apparently, convert to URL
            return DU.throwNowIfRejected(this.setContent(Content.url(t)));
            return DU.resolve(this.act.fs.setContent(this.act.path, Content.url(t)));
        } else {
            // if use fs.setContentAsync, the error should be handled by .fail
            // setText should throw error immediately (Why? maybe old style of text("foo") did it so...)
            return DU.throwNowIfRejected(this.setContent(Content.plainText(t)));
            return DU.resolve(this.act.fs.setContent(this.act.path, Content.plainText(t)));
        }
    },
    appendText:function (t) {
        A.is(t,String);
        //if (this.isText()) {
        return this.act.fs.appendContent(this.act.path, Content.plainText(t));
        /*} else {
            throw new Error("append only for text file");
        }*/
    },
    getContent: function (f) {
        if (typeof f=="function") {
            return this.act.fs.getContentAsync(this.act.path).then(f);
        }
        return this.act.fs.getContent(this.act.path);
    },
    setContent: function (c) {
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function (f) {
    	if (typeof f==="function") {
    		var t=this;
    	    return this.getContent(forceText).then(f);
    	}
        return forceText(this.act.fs.getContent(this.act.path));
        /*if (this.isText()) {
            return this.act.fs.getContent(this.act.path).toPlainText();
        } else {
            return this.act.fs.getContent(this.act.path).toURL();
        }*/
        function forceText(c) {
	    	//if (t.isText()) {
            try {
                return c.toPlainText();
            } catch(e) {
    	    	return c.toURL();
    	    }
        }
    },
    getDataURL: function (f) {
        if (typeof f==="function") {
            return this.getContent(function (c) {
                return c.toURL();
            });
        }
        return this.getContent().toURL();
    },
    setDataURL: function (u) {
        return this.setContent(Content.url(u));
    },
    dataURL:function (d) {
        if (typeof d==="string") return this.setDataURL(d);
        if (typeof d==="function") return this.getDataURL(d);
        return this.getDataURL();
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function (options) {
        return this.act.fs.getContentType(this.act.path,options);
    },
    bytes: function (b) {
        if (Content.isBuffer(b)) return this.setBytes(b);
        return this.getBytes();
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
            return DU.resolve(res);
        } else {
            A(srcIsDir && dstIsDir,"Both src and dst should be dir");
            return src.each(function (s) {
                dst.rel(s.name()).copyFrom(s, options);
            });
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        return this.copyFrom(src,options).then(function () {
            return src.rm({recursive:true});
        });
    },
    moveTo: function (dst, options) {
        return dst.moveFrom(this,options);
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
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls,f);// ls.forEach(f)
        });
    },
    eachrev:function (f,options) {
        var dir=this.assertDir();
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls.reverse(),f);// ls.forEach(f)
        });
    },
    recursive:function (fun,options) {
        var dir=this.assertDir();
        return dir.each(function (f) {
            if (f.isDir()) return f.recursive(fun);
            else return fun(f);
        },options);
    },
    listFilesAsync:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var path=this.path();
        var ord;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        return this.act.fs.opendirAsync(this.act.path, options).
        then(function (di) {
            var res=[];
            for (var i=0;i<di.length; i++) {
                var name=di[i];
                //if (!options.includeTrashed && dinfo[i].trashed) continue;
                if (options.excludes[path+name] ) continue;
                res.push(dir.rel(name));
            }
            if (typeof ord=="function" && res.sort) res.sort(ord);
            return res;
        });
    },
    listFiles:function (options) {
        var args=Array.prototype.slice.call(arguments);
        return DU.assertResolved(this.listFilesAsync.apply(this,args));
        //----------ABOLISHED
        if (typeof args[0]==="function") {
            var f=args.shift();
            return this.listFilesAsync.apply(this,args).then(f);
        }
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
        if (!options) {
            return this.act.fs.opendir(this.act.path, options);
        }
        var res=dir.listFiles(options);
        return res.map(function (f) {
            return f.name();
        });
    },
    convertOptions:function(o) {
        var options=Util.extend({},o);
        var dir=this.assertDir();
        var pathR=this.path();
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
        return this.touch();
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
    },
    getFS:function () {
        return this.act.fs;
    },
    observe: function (h) {
        return this.getFS().getRootFS().addObserver(this.path(),h);
    },
    getBlob: function () {
        return new Blob([this.bytes()],{type:this.contentType()});
    },
    download: function () {
        if (this.isDir()) throw new Error(this+": Download dir is not support yet. Use 'zip' instead.");
        saveAs(this.getBlob(),this.name());;
    }
};
Object.defineProperty(SFile.prototype,"act",{
    get: function () {
        if (this._act) return this._act;
        this._act={};// path/fs after follwed symlink
        this._act.path=this.fs.resolveLink(this._path);
        this._act.fs=this.rootFS.resolveFS(this._act.path);
        A.is(this._act, {fs:FS2, path:P.Absolute});
        return this._act;
    }
});

return SFile;
});

define('RootFS',["assert","FS2","PathUtil","SFile"], function (assert,FS,P,SFile) {
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
            },   
            addObserver: function () {
                this.observers=this.observers||[];
                var path,f;
                if (arguments.length==2) {
                    path=arguments[0];
                    f=arguments[1];
                } else if (arguments.length==1) {
                    path="";
                    f=arguments[0];
                } else {
                    throw new Error("Invalid argument spec");
                }
                assert.is(path,String);
                assert.is(f,Function);
                var observers=this.observers;
                var observer={
                    path:path,
                    handler:f,
                    remove: function () {
                        var i=observers.indexOf(this);
                        observers.splice(i,1);
                    }
                };
                this.observers.push(observer);
                return observer;
            },
            notifyChanged: function (path,metaInfo) {
                if (!this.observers) return;
                this.observers.forEach(function (ob) {
                    if (P.startsWith(path,ob.path)) {
                        ob.handler(path,metaInfo);
                    }
                });
            },
            getRootFS:function () {
                return this;
            }
    };
    for (var i in p) {
        dst[i]=p[i];
    }
    return RootFS;
});
/*!

JSZip v3.1.5 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('jszip',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSZip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var support = require('./support');
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;

    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
        remainingBytes = len - i;

        if (!isArray) {
            chr1 = input.charCodeAt(i++);
            chr2 = i < len ? input.charCodeAt(i++) : 0;
            chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
            chr1 = input[i++];
            chr2 = i < len ? input[i++] : 0;
            chr3 = i < len ? input[i++] : 0;
        }

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

    }

    return output.join("");
};

// public method for decoding
exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;

    var dataUrlPrefix = "data:";

    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        // This is a common error: people give a data url
        // (data:image/png;base64,iVBOR...) with a {base64: true} and
        // wonders why things don't work.
        // We can detect that the string input looks like a data url but we
        // *can't* be sure it is one: removing everything up to the comma would
        // be too dangerous.
        throw new Error("Invalid base64 input, it looks like a data url.");
    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    var totalLength = input.length * 3 / 4;
    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if (totalLength % 1 !== 0) {
        // totalLength is not an integer, the length does not match a valid
        // base64 content. That can happen if:
        // - the input is not a base64 content
        // - the input is *almost* a base64 content, with a extra chars at the
        //   beginning or at the end
        // - the input uses a base64 variant (base64url for example)
        throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
        output = new Uint8Array(totalLength|0);
    } else {
        output = new Array(totalLength|0);
    }

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[resultIndex++] = chr1;

        if (enc3 !== 64) {
            output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
            output[resultIndex++] = chr3;
        }

    }

    return output;
};

},{"./support":30,"./utils":32}],2:[function(require,module,exports){
'use strict';

var external = require("./external");
var DataWorker = require('./stream/DataWorker');
var DataLengthProbe = require('./stream/DataLengthProbe');
var Crc32Probe = require('./stream/Crc32Probe');
var DataLengthProbe = require('./stream/DataLengthProbe');

/**
 * Represent a compressed object, with everything needed to decompress it.
 * @constructor
 * @param {number} compressedSize the size of the data compressed.
 * @param {number} uncompressedSize the size of the data after decompression.
 * @param {number} crc32 the crc32 of the decompressed file.
 * @param {object} compression the type of compression, see lib/compressions.js.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
 */
function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
}

CompressedObject.prototype = {
    /**
     * Create a worker to get the uncompressed content.
     * @return {GenericWorker} the worker.
     */
    getContentWorker : function () {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
        .pipe(this.compression.uncompressWorker())
        .pipe(new DataLengthProbe("data_length"));

        var that = this;
        worker.on("end", function () {
            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }
        });
        return worker;
    },
    /**
     * Create a worker to get the compressed content.
     * @return {GenericWorker} the worker.
     */
    getCompressedWorker : function () {
        return new DataWorker(external.Promise.resolve(this.compressedContent))
        .withStreamInfo("compressedSize", this.compressedSize)
        .withStreamInfo("uncompressedSize", this.uncompressedSize)
        .withStreamInfo("crc32", this.crc32)
        .withStreamInfo("compression", this.compression)
        ;
    }
};

/**
 * Chain the given worker with other workers to compress the content with the
 * given compresion.
 * @param {GenericWorker} uncompressedWorker the worker to pipe.
 * @param {Object} compression the compression object.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {GenericWorker} the new worker compressing the content.
 */
CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker
    .pipe(new Crc32Probe())
    .pipe(new DataLengthProbe("uncompressedSize"))
    .pipe(compression.compressWorker(compressionOptions))
    .pipe(new DataLengthProbe("compressedSize"))
    .withStreamInfo("compression", compression);
};

module.exports = CompressedObject;

},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){
'use strict';

var GenericWorker = require("./stream/GenericWorker");

exports.STORE = {
    magic: "\x00\x00",
    compressWorker : function (compressionOptions) {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
exports.DEFLATE = require('./flate');

},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * The following functions come from pako, from pako/lib/zlib/crc32.js
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Use ordinary array, since untyped makes no boost here
function makeTable() {
    var c, table = [];

    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }

    return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

// That's all for the pako functions.

/**
 * Compute the crc32 of a string.
 * This is almost the same as the function crc32, but for strings. Using the
 * same function for the two use cases leads to horrible performances.
 * @param {Number} crc the starting value of the crc.
 * @param {String} str the string to use.
 * @param {Number} len the length of the string.
 * @param {Number} pos the starting position for the crc32 computation.
 * @return {Number} the computed crc32.
 */
function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if(isArray) {
        return crc32(crc|0, input, input.length, 0);
    } else {
        return crc32str(crc|0, input, input.length, 0);
    }
};

},{"./utils":32}],5:[function(require,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = true;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

},{}],6:[function(require,module,exports){
/* global Promise */


// load the global object first:
// - it should be better integrated in the system (unhandledRejection in node)
// - the environment may have a custom Promise implementation (see zone.js)
var ES6Promise = null;
if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
} else {
    ES6Promise = require("lie");
}

/**
 * Let the user use/change some implementations.
 */
module.exports = {
    Promise: ES6Promise
};

},{"lie":58}],7:[function(require,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = require("pako");
var utils = require("./utils");
var GenericWorker = require("./stream/GenericWorker");

var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";

/**
 * Create a worker that uses pako to inflate/deflate.
 * @constructor
 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
 * @param {Object} options the options to use when (de)compressing.
 */
function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);

    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    // the `meta` object from the last chunk received
    // this allow this worker to pass around metadata
    this.meta = {};
}

utils.inherits(FlateWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
FlateWorker.prototype.processChunk = function (chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
};

/**
 * @see GenericWorker.flush
 */
FlateWorker.prototype.flush = function () {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push([], true);
};
/**
 * @see GenericWorker.cleanUp
 */
FlateWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
};

/**
 * Create the _pako object.
 * TODO: lazy-loading this object isn't the best solution but it's the
 * quickest. The best solution is to lazy-load the worker list. See also the
 * issue #446.
 */
FlateWorker.prototype._createPako = function () {
    this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1 // default compression
    });
    var self = this;
    this._pako.onData = function(data) {
        self.push({
            data : data,
            meta : self.meta
        });
    };
};

exports.compressWorker = function (compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
};
exports.uncompressWorker = function () {
    return new FlateWorker("Inflate", {});
};

},{"./stream/GenericWorker":28,"./utils":32,"pako":59}],8:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');
var utf8 = require('../utf8');
var crc32 = require('../crc32');
var signature = require('../signature');

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }
    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility
    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {Object} streamInfo the hash with informations about the compressed file.
 * @param {Boolean} streamedContent is the content streamed ?
 * @param {Boolean} streamingEnded is the stream finished ?
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {Object} the zip parts.
 */
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo['file'],
    compression = streamInfo['compression'],
    useCustomEncoding = encodeFileName !== utf8.utf8encode,
    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
    comment = file.comment,
    encodedComment = utils.transformTo("string", encodeFileName(comment)),
    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
    useUTF8ForComment = utfEncodedComment.length !== comment.length,
    dosTime,
    dosDate,
    extraFields = "",
    unicodePathExtraField = "",
    unicodeCommentExtraField = "",
    dir = file.dir,
    date = file.date;


    var dataInfo = {
        crc32 : 0,
        compressedSize : 0,
        uncompressedSize : 0
    };

    // if the content is streamed, the sizes/crc32 are only available AFTER
    // the end of the stream.
    if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo['crc32'];
        dataInfo.compressedSize = streamInfo['compressedSize'];
        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
    }

    var bitflag = 0;
    if (streamedContent) {
        // Bit 3: the sizes/crc32 are set to zero in the local header.
        // The correct values are put in the data descriptor immediately
        // following the compressed data.
        bitflag |= 0x0008;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        // Bit 11: Language encoding flag (EFS).
        bitflag |= 0x0800;
    }


    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;

    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getUTCMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(encodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(crc32(encodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    header += decToHex(bitflag, 2);
    // compression method
    header += compression.magic;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(dataInfo.crc32, 4);
    // compressed size
    header += decToHex(dataInfo.compressedSize, 4);
    // uncompressed size
    header += decToHex(dataInfo.uncompressedSize, 4);
    // file name length
    header += decToHex(encodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
        // version made by (00: DOS)
        decToHex(versionMadeBy, 2) +
        // file header (common to file and central directory)
        header +
        // file comment length
        decToHex(encodedComment.length, 2) +
        // disk number start
        "\x00\x00" +
        // internal file attributes TODO
        "\x00\x00" +
        // external file attributes
        decToHex(extFileAttr, 4) +
        // relative offset of local header
        decToHex(offset, 4) +
        // file name
        encodedFileName +
        // extra field
        extraFields +
        // file comment
        encodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord
    };
};

/**
 * Generate the EOCD record.
 * @param {Number} entriesCount the number of entries in the zip file.
 * @param {Number} centralDirLength the length (in bytes) of the central dir.
 * @param {Number} localDirLength the length (in bytes) of the local dir.
 * @param {String} comment the zip file comment as a binary string.
 * @param {Function} encodeFileName the function to encode the comment.
 * @return {String} the EOCD record.
 */
var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));

    // end of central dir signature
    dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(entriesCount, 2) +
        // total number of entries in the central directory
        decToHex(entriesCount, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(encodedComment.length, 2) +
        // .ZIP file comment
        encodedComment;

    return dirEnd;
};

/**
 * Generate data descriptors for a file entry.
 * @param {Object} streamInfo the hash generated by a worker, containing informations
 * on the file entry.
 * @return {String} the data descriptors.
 */
var generateDataDescriptors = function (streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR +
        // crc-32                          4 bytes
        decToHex(streamInfo['crc32'], 4) +
        // compressed size                 4 bytes
        decToHex(streamInfo['compressedSize'], 4) +
        // uncompressed size               4 bytes
        decToHex(streamInfo['uncompressedSize'], 4);

    return descriptor;
};


/**
 * A worker to concatenate other workers to create a zip file.
 * @param {Boolean} streamFiles `true` to stream the content of the files,
 * `false` to accumulate it.
 * @param {String} comment the comment to use.
 * @param {String} platform the platform to use, "UNIX" or "DOS".
 * @param {Function} encodeFileName the function to encode file names and comments.
 */
function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    // The number of bytes written so far. This doesn't count accumulated chunks.
    this.bytesWritten = 0;
    // The comment of the zip file
    this.zipComment = comment;
    // The platform "generating" the zip file.
    this.zipPlatform = platform;
    // the function to encode file names and comments.
    this.encodeFileName = encodeFileName;
    // Should we stream the content of the files ?
    this.streamFiles = streamFiles;
    // If `streamFiles` is false, we will need to accumulate the content of the
    // files to calculate sizes / crc32 (and write them *before* the content).
    // This boolean indicates if we are accumulating chunks (it will change a lot
    // during the lifetime of this worker).
    this.accumulate = false;
    // The buffer receiving chunks when accumulating content.
    this.contentBuffer = [];
    // The list of generated directory records.
    this.dirRecords = [];
    // The offset (in bytes) from the beginning of the zip file for the current source.
    this.currentSourceOffset = 0;
    // The total number of entries in this zip file.
    this.entriesCount = 0;
    // the name of the file currently being added, null when handling the end of the zip file.
    // Used for the emited metadata.
    this.currentFile = null;



    this._sources = [];
}
utils.inherits(ZipFileWorker, GenericWorker);

/**
 * @see GenericWorker.push
 */
ZipFileWorker.prototype.push = function (chunk) {

    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;

    if(this.accumulate) {
        this.contentBuffer.push(chunk);
    } else {
        this.bytesWritten += chunk.data.length;

        GenericWorker.prototype.push.call(this, {
            data : chunk.data,
            meta : {
                currentFile : this.currentFile,
                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
            }
        });
    }
};

/**
 * The worker started a new source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the new source.
 */
ZipFileWorker.prototype.openedSource = function (streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo['file'].name;

    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

    // don't stream folders (because they don't have any content)
    if(streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
    } else {
        // we need to wait for the whole file before pushing anything
        this.accumulate = true;
    }
};

/**
 * The worker finished a source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the finished source.
 */
ZipFileWorker.prototype.closedSource = function (streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

    this.dirRecords.push(record.dirRecord);
    if(streamedContent) {
        // after the streamed file, we put data descriptors
        this.push({
            data : generateDataDescriptors(streamInfo),
            meta : {percent:100}
        });
    } else {
        // the content wasn't streamed, we need to push everything now
        // first the file record, then the content
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
        while(this.contentBuffer.length) {
            this.push(this.contentBuffer.shift());
        }
    }
    this.currentFile = null;
};

/**
 * @see GenericWorker.flush
 */
ZipFileWorker.prototype.flush = function () {

    var localDirLength = this.bytesWritten;
    for(var i = 0; i < this.dirRecords.length; i++) {
        this.push({
            data : this.dirRecords[i],
            meta : {percent:100}
        });
    }
    var centralDirLength = this.bytesWritten - localDirLength;

    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

    this.push({
        data : dirEnd,
        meta : {percent:100}
    });
};

/**
 * Prepare the next source to be read.
 */
ZipFileWorker.prototype.prepareNextSource = function () {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
        this.previous.pause();
    } else {
        this.previous.resume();
    }
};

/**
 * @see GenericWorker.registerPrevious
 */
ZipFileWorker.prototype.registerPrevious = function (previous) {
    this._sources.push(previous);
    var self = this;

    previous.on('data', function (chunk) {
        self.processChunk(chunk);
    });
    previous.on('end', function () {
        self.closedSource(self.previous.streamInfo);
        if(self._sources.length) {
            self.prepareNextSource();
        } else {
            self.end();
        }
    });
    previous.on('error', function (e) {
        self.error(e);
    });
    return this;
};

/**
 * @see GenericWorker.resume
 */
ZipFileWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
    }
};

/**
 * @see GenericWorker.error
 */
ZipFileWorker.prototype.error = function (e) {
    var sources = this._sources;
    if(!GenericWorker.prototype.error.call(this, e)) {
        return false;
    }
    for(var i = 0; i < sources.length; i++) {
        try {
            sources[i].error(e);
        } catch(e) {
            // the `error` exploded, nothing to do
        }
    }
    return true;
};

/**
 * @see GenericWorker.lock
 */
ZipFileWorker.prototype.lock = function () {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for(var i = 0; i < sources.length; i++) {
        sources[i].lock();
    }
};

module.exports = ZipFileWorker;

},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){
'use strict';

var compressions = require('../compressions');
var ZipFileWorker = require('./ZipFileWorker');

/**
 * Find the compression to use.
 * @param {String} fileCompression the compression defined at the file level, if any.
 * @param {String} zipCompression the compression defined at the load() level.
 * @return {Object} the compression object to use.
 */
var getCompression = function (fileCompression, zipCompression) {

    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
};

/**
 * Create a worker to generate a zip file.
 * @param {JSZip} zip the JSZip instance at the right root level.
 * @param {Object} options to generate the zip file.
 * @param {String} comment the comment to use.
 */
exports.generateWorker = function (zip, options, comment) {

    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {

        zip.forEach(function (relativePath, file) {
            entriesCount++;
            var compression = getCompression(file.options.compression, options.compression);
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var dir = file.dir, date = file.date;

            file._compressWorker(compression, compressionOptions)
            .withStreamInfo("file", {
                name : relativePath,
                dir : dir,
                date : date,
                comment : file.comment || "",
                unixPermissions : file.unixPermissions,
                dosPermissions : file.dosPermissions
            })
            .pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
        zipFileWorker.error(e);
    }

    return zipFileWorker;
};

},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){
'use strict';

/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip() {
    // if this constructor is?used without?`new`, it?adds `new` before?itself:
    if(!(this instanceof JSZip)) {
        return new JSZip();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = require('./object');
JSZip.prototype.loadAsync = require('./load');
JSZip.support = require('./support');
JSZip.defaults = require('./defaults');

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip.version = "3.1.5";

JSZip.loadAsync = function (content, options) {
    return new JSZip().loadAsync(content, options);
};

JSZip.external = require("./external");
module.exports = JSZip;

},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var external = require("./external");
var utf8 = require('./utf8');
var utils = require('./utils');
var ZipEntries = require('./zipEntries');
var Crc32Probe = require('./stream/Crc32Probe');
var nodejsUtils = require("./nodejsUtils");

/**
 * Check the CRC32 of an entry.
 * @param {ZipEntry} zipEntry the zip entry to check.
 * @return {Promise} the result.
 */
function checkEntryCRC32(zipEntry) {
    return new external.Promise(function (resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function (e) {
            reject(e);
        })
        .on("end", function () {
            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                reject(new Error("Corrupted zip : CRC32 mismatch"));
            } else {
                resolve();
            }
        })
        .resume();
    });
}

module.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
    });

    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }

    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
    .then(function(data) {
        var zipEntries = new ZipEntries(options);
        zipEntries.load(data);
        return zipEntries;
    }).then(function checkCRC32(zipEntries) {
        var promises = [external.Promise.resolve(zipEntries)];
        var files = zipEntries.files;
        if (options.checkCRC32) {
            for (var i = 0; i < files.length; i++) {
                promises.push(checkEntryCRC32(files[i]));
            }
        }
        return external.Promise.all(promises);
    }).then(function addFiles(results) {
        var zipEntries = results.shift();
        var files = zipEntries.files;
        for (var i = 0; i < files.length; i++) {
            var input = files[i];
            zip.file(input.fileNameStr, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
                unixPermissions : input.unixPermissions,
                dosPermissions : input.dosPermissions,
                createFolders: options.createFolders
            });
        }
        if (zipEntries.zipComment.length) {
            zip.comment = zipEntries.zipComment;
        }

        return zip;
    });
};

},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){
"use strict";

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');

/**
 * A worker that use a nodejs stream as source.
 * @constructor
 * @param {String} filename the name of the file entry for this stream.
 * @param {Readable} stream the nodejs stream.
 */
function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
}

utils.inherits(NodejsStreamInputAdapter, GenericWorker);

/**
 * Prepare the stream and bind the callbacks on it.
 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
 * @param {Stream} stream the nodejs stream to use.
 */
NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
    var self = this;
    this._stream = stream;
    stream.pause();
    stream
    .on("data", function (chunk) {
        self.push({
            data: chunk,
            meta : {
                percent : 0
            }
        });
    })
    .on("error", function (e) {
        if(self.isPaused) {
            this.generatedError = e;
        } else {
            self.error(e);
        }
    })
    .on("end", function () {
        if(self.isPaused) {
            self._upstreamEnded = true;
        } else {
            self.end();
        }
    });
};
NodejsStreamInputAdapter.prototype.pause = function () {
    if(!GenericWorker.prototype.pause.call(this)) {
        return false;
    }
    this._stream.pause();
    return true;
};
NodejsStreamInputAdapter.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if(this._upstreamEnded) {
        this.end();
    } else {
        this._stream.resume();
    }

    return true;
};

module.exports = NodejsStreamInputAdapter;

},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){
'use strict';

var Readable = require('readable-stream').Readable;

var utils = require('../utils');
utils.inherits(NodejsStreamOutputAdapter, Readable);

/**
* A nodejs stream using a worker as source.
* @see the SourceWrapper in http://nodejs.org/api/stream.html
* @constructor
* @param {StreamHelper} helper the helper wrapping the worker
* @param {Object} options the nodejs stream options
* @param {Function} updateCb the update callback.
*/
function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;

    var self = this;
    helper.on("data", function (data, meta) {
        if (!self.push(data)) {
            self._helper.pause();
        }
        if(updateCb) {
            updateCb(meta);
        }
    })
    .on("error", function(e) {
        self.emit('error', e);
    })
    .on("end", function () {
        self.push(null);
    });
}


NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
};

module.exports = NodejsStreamOutputAdapter;

},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){
'use strict';

module.exports = {
    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    isNode : typeof Buffer !== "undefined",
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {Object} data the data to pass to the constructor.
     * @param {String} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    newBufferFrom: function(data, encoding) {
        // XXX We can't use `Buffer.from` which comes from `Uint8Array.from`
        // in nodejs v4 (< v.4.5). It's not the expected implementation (and
        // has a different signature).
        // see https://github.com/nodejs/node/issues/8053
        // A condition on nodejs' version won't solve the issue as we don't
        // control the Buffer polyfills that may or may not be used.
        return new Buffer(data, encoding);
    },
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {Integer} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    allocBuffer: function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            return new Buffer(size);
        }
    },
    /**
     * Find out if an object is a Buffer.
     * @param {Object} b the object to test.
     * @return {Boolean} true if the object is a Buffer, false otherwise.
     */
    isBuffer : function(b){
        return Buffer.isBuffer(b);
    },

    isStream : function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    }
};

},{}],15:[function(require,module,exports){
'use strict';
var utf8 = require('./utf8');
var utils = require('./utils');
var GenericWorker = require('./stream/GenericWorker');
var StreamHelper = require('./stream/StreamHelper');
var defaults = require('./defaults');
var CompressedObject = require('./compressedObject');
var ZipObject = require('./zipObject');
var generate = require("./generate");
var nodejsUtils = require("./nodejsUtils");
var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} originalOptions the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, originalOptions) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;


    /*
     * Correct options.
     */

    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
    }

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
    }


    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
    }

    /*
     * Convert content to fit.
     */

    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }

    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
    /*
    TODO: we can't throw an exception because we have async promises
    (we can have a promise of a Date() for example) but returning a
    promise is useless because file(name, data) returns the JSZip
    object for chaining. Should we break that to allow the user
    to catch the error ?

    return external.Promise.resolve(zipObjectContent)
    .then(function () {
        return object;
    });
    */
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) === '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) !== "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

// return the actual prototype of JSZip
var out = {
    /**
     * @see loadAsync
     */
    load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },


    /**
     * Call a callback function for each entry at this folder level.
     * @param {Function} cb the callback function:
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     */
    forEach: function(cb) {
        var filename, relativePath, file;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            relativePath = filename.slice(this.root.length, filename.length);
            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
            }
        }
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [];
        this.forEach(function (relativePath, entry) {
            if (search(relativePath, entry)) { // the file matches the function
                result.push(entry);
            }

        });
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                var obj = this.files[this.root + name];
                if (obj && !obj.dir) {
                    return obj;
                } else {
                    return null;
                }
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) !== "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },

    /**
     * Generate the complete zip file as an internal stream.
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {StreamHelper} the streamed zip file.
     */
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
          opts = utils.extend(options || {}, {
              streamFiles: false,
              compression: "STORE",
              compressionOptions : null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: utf8.utf8encode
          });

          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();

          // "binarystring" is prefered but the internals use "string".
          if(opts.type === "binarystring") {
            opts.type = "string";
          }

          if (!opts.type) {
            throw new Error("No output type specified.");
          }

          utils.checkSupport(opts.type);

          // accept nodejs `process.platform`
          if(
              opts.platform === 'darwin' ||
              opts.platform === 'freebsd' ||
              opts.platform === 'linux' ||
              opts.platform === 'sunos'
          ) {
              opts.platform = "UNIX";
          }
          if (opts.platform === 'win32') {
              opts.platform = "DOS";
          }

          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
            options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
};
module.exports = out;

},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
/*
 * This file is used by module bundlers (browserify/webpack/etc) when
 * including a stream implementation. We use "readable-stream" to get a
 * consistent behavior between nodejs versions but bundlers often have a shim
 * for "stream". Using this shim greatly improve the compatibility and greatly
 * reduce the final size of the bundle (only one stream implementation, not
 * two).
 */
module.exports = require("stream");

},{"stream":undefined}],17:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function ArrayReader(data) {
    DataReader.call(this, data);
	for(var i = 0; i < this.data.length; i++) {
		data[i] = data[i] & 0xFF;
	}
}
utils.inherits(ArrayReader, DataReader);
/**
 * @see DataReader.byteAt
 */
ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
        }
    }

    return -1;
};
/**
 * @see DataReader.readAndCheckSignature
 */
ArrayReader.prototype.readAndCheckSignature = function (sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3),
        data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
};
/**
 * @see DataReader.readData
 */
ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = ArrayReader;

},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
'use strict';
var utils = require('../utils');

function DataReader(data) {
    this.data = data; // type : see implementation
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specified index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Read the signature (4 bytes) at the current position and compare it with sig.
     * @param {string} sig the expected signature
     * @return {boolean} true if the signature matches, false otherwise.
     */
    readAndCheckSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1)); // second
    }
};
module.exports = DataReader;

},{"../utils":32}],19:[function(require,module,exports){
'use strict';
var Uint8ArrayReader = require('./Uint8ArrayReader');
var utils = require('../utils');

function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
}
utils.inherits(NodeBufferReader, Uint8ArrayReader);

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function StringReader(data) {
    DataReader.call(this, data);
}
utils.inherits(StringReader, DataReader);
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readAndCheckSignature
 */
StringReader.prototype.readAndCheckSignature = function (sig) {
    var data = this.readData(4);
    return sig === data;
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
'use strict';
var ArrayReader = require('./ArrayReader');
var utils = require('../utils');

function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
}
utils.inherits(Uint8ArrayReader, ArrayReader);
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var support = require('../support');
var ArrayReader = require('./ArrayReader');
var StringReader = require('./StringReader');
var NodeBufferReader = require('./NodeBufferReader');
var Uint8ArrayReader = require('./Uint8ArrayReader');

/**
 * Create a reader adapted to the data.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
 * @return {DataReader} the data reader.
 */
module.exports = function (data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
        return new StringReader(data);
    }
    if (type === "nodebuffer") {
        return new NodeBufferReader(data);
    }
    if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
};

},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],24:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var utils = require('../utils');

/**
 * A worker which convert chunks to a specified type.
 * @constructor
 * @param {String} destType the destination type.
 */
function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
}
utils.inherits(ConvertWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
ConvertWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : utils.transformTo(this.destType, chunk.data),
        meta : chunk.meta
    });
};
module.exports = ConvertWorker;

},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var crc32 = require('../crc32');
var utils = require('../utils');

/**
 * A worker which calculate the crc32 of the data flowing through.
 * @constructor
 */
function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
}
utils.inherits(Crc32Probe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Crc32Probe.prototype.processChunk = function (chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
};
module.exports = Crc32Probe;

},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

/**
 * A worker which calculate the total length of the data flowing through.
 * @constructor
 * @param {String} propName the name used to expose the length
 */
function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
}
utils.inherits(DataLengthProbe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
DataLengthProbe.prototype.processChunk = function (chunk) {
    if(chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
};
module.exports = DataLengthProbe;


},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

// the size of the generated chunks
// TODO expose this as a public variable
var DEFAULT_BLOCK_SIZE = 16 * 1024;

/**
 * A worker that reads a content and emits chunks.
 * @constructor
 * @param {Promise} dataP the promise of the data to split
 */
function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";

    this._tickScheduled = false;

    dataP.then(function (data) {
        self.dataIsReady = true;
        self.data = data;
        self.max = data && data.length || 0;
        self.type = utils.getTypeOf(data);
        if(!self.isPaused) {
            self._tickAndRepeat();
        }
    }, function (e) {
        self.error(e);
    });
}

utils.inherits(DataWorker, GenericWorker);

/**
 * @see GenericWorker.cleanUp
 */
DataWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
};

/**
 * @see GenericWorker.resume
 */
DataWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
};

/**
 * Trigger a tick a schedule an other call to this function.
 */
DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if(this.isPaused || this.isFinished) {
        return;
    }
    this._tick();
    if(!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
    }
};

/**
 * Read and push a chunk.
 */
DataWorker.prototype._tick = function() {

    if(this.isPaused || this.isFinished) {
        return false;
    }

    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
        // EOF
        return this.end();
    } else {
        switch(this.type) {
            case "string":
                data = this.data.substring(this.index, nextIndex);
            break;
            case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
            break;
            case "array":
            case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
            data : data,
            meta : {
                percent : this.max ? this.index / this.max * 100 : 0
            }
        });
    }
};

module.exports = DataWorker;

},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){
'use strict';

/**
 * A worker that does nothing but passing chunks to the next one. This is like
 * a nodejs stream but with some differences. On the good side :
 * - it works on IE 6-9 without any issue / polyfill
 * - it weights less than the full dependencies bundled with browserify
 * - it forwards errors (no need to declare an error handler EVERYWHERE)
 *
 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
 * object containing anything (`percent` for example), see each worker for more
 * details. The latter is the real data (String, Uint8Array, etc).
 *
 * @constructor
 * @param {String} name the name of the stream (mainly used for debugging purposes)
 */
function GenericWorker(name) {
    // the name of the worker
    this.name = name || "default";
    // an object containing metadata about the workers chain
    this.streamInfo = {};
    // an error which happened when the worker was paused
    this.generatedError = null;
    // an object containing metadata to be merged by this worker into the general metadata
    this.extraStreamInfo = {};
    // true if the stream is paused (and should not do anything), false otherwise
    this.isPaused = true;
    // true if the stream is finished (and should not do anything), false otherwise
    this.isFinished = false;
    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
    this.isLocked = false;
    // the event listeners
    this._listeners = {
        'data':[],
        'end':[],
        'error':[]
    };
    // the previous worker, if any
    this.previous = null;
}

GenericWorker.prototype = {
    /**
     * Push a chunk to the next workers.
     * @param {Object} chunk the chunk to push
     */
    push : function (chunk) {
        this.emit("data", chunk);
    },
    /**
     * End the stream.
     * @return {Boolean} true if this call ended the worker, false otherwise.
     */
    end : function () {
        if (this.isFinished) {
            return false;
        }

        this.flush();
        try {
            this.emit("end");
            this.cleanUp();
            this.isFinished = true;
        } catch (e) {
            this.emit("error", e);
        }
        return true;
    },
    /**
     * End the stream with an error.
     * @param {Error} e the error which caused the premature end.
     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
     */
    error : function (e) {
        if (this.isFinished) {
            return false;
        }

        if(this.isPaused) {
            this.generatedError = e;
        } else {
            this.isFinished = true;

            this.emit("error", e);

            // in the workers chain exploded in the middle of the chain,
            // the error event will go downward but we also need to notify
            // workers upward that there has been an error.
            if(this.previous) {
                this.previous.error(e);
            }

            this.cleanUp();
        }
        return true;
    },
    /**
     * Add a callback on an event.
     * @param {String} name the name of the event (data, end, error)
     * @param {Function} listener the function to call when the event is triggered
     * @return {GenericWorker} the current object for chainability
     */
    on : function (name, listener) {
        this._listeners[name].push(listener);
        return this;
    },
    /**
     * Clean any references when a worker is ending.
     */
    cleanUp : function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
    },
    /**
     * Trigger an event. This will call registered callback with the provided arg.
     * @param {String} name the name of the event (data, end, error)
     * @param {Object} arg the argument to call the callback with.
     */
    emit : function (name, arg) {
        if (this._listeners[name]) {
            for(var i = 0; i < this._listeners[name].length; i++) {
                this._listeners[name][i].call(this, arg);
            }
        }
    },
    /**
     * Chain a worker with an other.
     * @param {Worker} next the worker receiving events from the current one.
     * @return {worker} the next worker for chainability
     */
    pipe : function (next) {
        return next.registerPrevious(this);
    },
    /**
     * Same as `pipe` in the other direction.
     * Using an API with `pipe(next)` is very easy.
     * Implementing the API with the point of view of the next one registering
     * a source is easier, see the ZipFileWorker.
     * @param {Worker} previous the previous worker, sending events to this one
     * @return {Worker} the current worker for chainability
     */
    registerPrevious : function (previous) {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }

        // sharing the streamInfo...
        this.streamInfo = previous.streamInfo;
        // ... and adding our own bits
        this.mergeStreamInfo();
        this.previous =  previous;
        var self = this;
        previous.on('data', function (chunk) {
            self.processChunk(chunk);
        });
        previous.on('end', function () {
            self.end();
        });
        previous.on('error', function (e) {
            self.error(e);
        });
        return this;
    },
    /**
     * Pause the stream so it doesn't send events anymore.
     * @return {Boolean} true if this call paused the worker, false otherwise.
     */
    pause : function () {
        if(this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = true;

        if(this.previous) {
            this.previous.pause();
        }
        return true;
    },
    /**
     * Resume a paused stream.
     * @return {Boolean} true if this call resumed the worker, false otherwise.
     */
    resume : function () {
        if(!this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = false;

        // if true, the worker tried to resume but failed
        var withError = false;
        if(this.generatedError) {
            this.error(this.generatedError);
            withError = true;
        }
        if(this.previous) {
            this.previous.resume();
        }

        return !withError;
    },
    /**
     * Flush any remaining bytes as the stream is ending.
     */
    flush : function () {},
    /**
     * Process a chunk. This is usually the method overridden.
     * @param {Object} chunk the chunk to process.
     */
    processChunk : function(chunk) {
        this.push(chunk);
    },
    /**
     * Add a key/value to be added in the workers chain streamInfo once activated.
     * @param {String} key the key to use
     * @param {Object} value the associated value
     * @return {Worker} the current worker for chainability
     */
    withStreamInfo : function (key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
    },
    /**
     * Merge this worker's streamInfo into the chain's streamInfo.
     */
    mergeStreamInfo : function () {
        for(var key in this.extraStreamInfo) {
            if (!this.extraStreamInfo.hasOwnProperty(key)) {
                continue;
            }
            this.streamInfo[key] = this.extraStreamInfo[key];
        }
    },

    /**
     * Lock the stream to prevent further updates on the workers chain.
     * After calling this method, all calls to pipe will fail.
     */
    lock: function () {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
            this.previous.lock();
        }
    },

    /**
     *
     * Pretty print the workers chain.
     */
    toString : function () {
        var me = "Worker " + this.name;
        if (this.previous) {
            return this.previous + " -> " + me;
        } else {
            return me;
        }
    }
};

module.exports = GenericWorker;

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var ConvertWorker = require('./ConvertWorker');
var GenericWorker = require('./GenericWorker');
var base64 = require('../base64');
var support = require("../support");
var external = require("../external");

var NodejsStreamOutputAdapter = null;
if (support.nodestream) {
    try {
        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
    } catch(e) {}
}

/**
 * Apply the final transformation of the data. If the user wants a Blob for
 * example, it's easier to work with an U8intArray and finally do the
 * ArrayBuffer/Blob conversion.
 * @param {String} type the name of the final type
 * @param {String|Uint8Array|Buffer} content the content to transform
 * @param {String} mimeType the mime type of the content, if applicable.
 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
 */
function transformZipOutput(type, content, mimeType) {
    switch(type) {
        case "blob" :
            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64" :
            return base64.encode(content);
        default :
            return utils.transformTo(type, content);
    }
}

/**
 * Concatenate an array of data of the given type.
 * @param {String} type the type of the data in the given array.
 * @param {Array} dataArray the array containing the data chunks to concatenate
 * @return {String|Uint8Array|Buffer} the concatenated data
 * @throws Error if the asked type is unsupported
 */
function concat (type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for(i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
    }
    switch(type) {
        case "string":
            return dataArray.join("");
          case "array":
            return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
            res = new Uint8Array(totalLength);
            for(i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
            }
            return res;
        case "nodebuffer":
            return Buffer.concat(dataArray);
        default:
            throw new Error("concat : unsupported type '"  + type + "'");
    }
}

/**
 * Listen a StreamHelper, accumulate its content and concatenate it into a
 * complete block.
 * @param {StreamHelper} helper the helper to use.
 * @param {Function} updateCallback a callback called on each update. Called
 * with one arg :
 * - the metadata linked to the update received.
 * @return Promise the promise for the accumulation.
 */
function accumulate(helper, updateCallback) {
    return new external.Promise(function (resolve, reject){
        var dataArray = [];
        var chunkType = helper._internalType,
            resultType = helper._outputType,
            mimeType = helper._mimeType;
        helper
        .on('data', function (data, meta) {
            dataArray.push(data);
            if(updateCallback) {
                updateCallback(meta);
            }
        })
        .on('error', function(err) {
            dataArray = [];
            reject(err);
        })
        .on('end', function (){
            try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            dataArray = [];
        })
        .resume();
    });
}

/**
 * An helper to easily use workers outside of JSZip.
 * @constructor
 * @param {Worker} worker the worker to wrap
 * @param {String} outputType the type of data expected by the use
 * @param {String} mimeType the mime type of the content, if applicable.
 */
function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch(outputType) {
        case "blob":
        case "arraybuffer":
            internalType = "uint8array";
        break;
        case "base64":
            internalType = "string";
        break;
    }

    try {
        // the type used internally
        this._internalType = internalType;
        // the type used to output results
        this._outputType = outputType;
        // the mime type
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        // the last workers can be rewired without issues but we need to
        // prevent any updates on previous workers.
        worker.lock();
    } catch(e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
    }
}

StreamHelper.prototype = {
    /**
     * Listen a StreamHelper, accumulate its content and concatenate it into a
     * complete block.
     * @param {Function} updateCb the update callback.
     * @return Promise the promise for the accumulation.
     */
    accumulate : function (updateCb) {
        return accumulate(this, updateCb);
    },
    /**
     * Add a listener on an event triggered on a stream.
     * @param {String} evt the name of the event
     * @param {Function} fn the listener
     * @return {StreamHelper} the current helper.
     */
    on : function (evt, fn) {
        var self = this;

        if(evt === "data") {
            this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
            });
        } else {
            this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
            });
        }
        return this;
    },
    /**
     * Resume the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    resume : function () {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
    },
    /**
     * Pause the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    pause : function () {
        this._worker.pause();
        return this;
    },
    /**
     * Return a nodejs stream for this helper.
     * @param {Function} updateCb the update callback.
     * @return {NodejsStreamOutputAdapter} the nodejs stream.
     */
    toNodejsStream : function (updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
            // an object stream containing blob/arraybuffer/uint8array/string
            // is strange and I don't know if it would be useful.
            // I you find this comment and have a good usecase, please open a
            // bug report !
            throw new Error(this._outputType + " is not supported by this method");
        }

        return new NodejsStreamOutputAdapter(this, {
            objectMode : this._outputType !== "nodebuffer"
        }, updateCb);
    }
};


module.exports = StreamHelper;

},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){
'use strict';

exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

try {
    exports.nodestream = !!require('readable-stream').Readable;
} catch(e) {
    exports.nodestream = false;
}

},{"readable-stream":16}],31:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var support = require('./support');
var nodejsUtils = require('./nodejsUtils');
var GenericWorker = require('./stream/GenericWorker');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    return buf2string(buf);
};

/**
 * A worker to decode utf8 encoded binary chunks into string chunks.
 * @constructor
 */
function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    // the last bytes if a chunk didn't end with a complete codepoint.
    this.leftOver = null;
}
utils.inherits(Utf8DecodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8DecodeWorker.prototype.processChunk = function (chunk) {

    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

    // 1st step, re-use what's left of the previous chunk
    if (this.leftOver && this.leftOver.length) {
        if(support.uint8array) {
            var previousData = data;
            data = new Uint8Array(previousData.length + this.leftOver.length);
            data.set(this.leftOver, 0);
            data.set(previousData, this.leftOver.length);
        } else {
            data = this.leftOver.concat(data);
        }
        this.leftOver = null;
    }

    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
        if (support.uint8array) {
            usableData = data.subarray(0, nextBoundary);
            this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
            usableData = data.slice(0, nextBoundary);
            this.leftOver = data.slice(nextBoundary, data.length);
        }
    }

    this.push({
        data : exports.utf8decode(usableData),
        meta : chunk.meta
    });
};

/**
 * @see GenericWorker.flush
 */
Utf8DecodeWorker.prototype.flush = function () {
    if(this.leftOver && this.leftOver.length) {
        this.push({
            data : exports.utf8decode(this.leftOver),
            meta : {}
        });
        this.leftOver = null;
    }
};
exports.Utf8DecodeWorker = Utf8DecodeWorker;

/**
 * A worker to endcode string chunks into utf8 encoded binary chunks.
 * @constructor
 */
function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
}
utils.inherits(Utf8EncodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8EncodeWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : exports.utf8encode(chunk.data),
        meta : chunk.meta
    });
};
exports.Utf8EncodeWorker = Utf8EncodeWorker;

},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){
'use strict';

var support = require('./support');
var base64 = require('./base64');
var nodejsUtils = require('./nodejsUtils');
var setImmediate = require('core-js/library/fn/set-immediate');
var external = require("./external");


/**
 * Convert a string that pass as a "binary string": it should represent a byte
 * array but may have > 255 char codes. Be sure to take only the first byte
 * and returns the byte array.
 * @param {String} str the string to transform.
 * @return {Array|Uint8Array} the string in a binary format.
 */
function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
}

/**
 * Create a new blob with the given content and the given type.
 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
 * an Uint8Array because the stock browser of android 4 won't accept it (it
 * will be silently converted to a string, "[object Uint8Array]").
 *
 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
 * when a large amount of Array is used to create the Blob, the amount of
 * memory consumed is nearly 100 times the original data amount.
 *
 * @param {String} type the mime type of the blob.
 * @return {Blob} the created blob.
 */
exports.newBlob = function(part, type) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([part], {
            type: type
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(part);
            return builder.getBlob(type);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * An helper for the function arrayLikeToString.
 * This contains static informations and functions that
 * can be optimized by the browser JIT compiler.
 */
var arrayToStringHelper = {
    /**
     * Transform an array of int into a string, chunk by chunk.
     * See the performances notes on arrayLikeToString.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @param {String} type the type of the array.
     * @param {Integer} chunk the chunk size.
     * @return {String} the resulting string.
     * @throws Error if the chunk is too big for the stack.
     */
    stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        // shortcut
        if (len <= chunk) {
            return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        return result.join("");
    },
    /**
     * Call String.fromCharCode on every item in the array.
     * This is the naive implementation, which generate A LOT of intermediate string.
     * This should be used when everything else fail.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @return {String} the result.
     */
    stringifyByChar: function(array){
        var resultStr = "";
        for(var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
    },
    applyCanBeUsed : {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array : (function () {
            try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (e) {
                return false;
            }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer : (function () {
            try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
            } catch (e) {
                return false;
            }
        })()
    }
};

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    // TODO : we now have workers that split the work. Do we still need that ?
    var chunk = 65536,
        type = exports.getTypeOf(array),
        canUseApply = true;
    if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }

    if (canUseApply) {
        while (chunk > 1) {
            try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
            } catch (e) {
                chunk = Math.floor(chunk / 2);
            }
        }
    }

    // no apply or chunk error : slow and painful algorithm
    // default browser on android 4.*
    return arrayToStringHelper.stringifyByChar(array);
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this platform");
    }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Defer the call of a function.
 * @param {Function} callback the function to call asynchronously.
 * @param {Array} args the arguments to give to the callback.
 */
exports.delay = function(callback, args, self) {
    setImmediate(function () {
        callback.apply(self || null, args || []);
    });
};

/**
 * Extends a prototype with an other, without calling a constructor with
 * side effects. Inspired by nodejs' `utils.inherits`
 * @param {Function} ctor the constructor to augment
 * @param {Function} superCtor the parent constructor to use
 */
exports.inherits = function (ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj();
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transform arbitrary content into a Promise.
 * @param {String} name a name for the content being processed.
 * @param {Object} inputData the content to process.
 * @param {Boolean} isBinary true if the content is not an unicode string
 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
 * @param {Boolean} isBase64 true if the string content is encoded with base64.
 * @return {Promise} a promise in a format usable by JSZip.
 */
exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

    // if inputData is already a promise, this flatten it.
    var promise = external.Promise.resolve(inputData).then(function(data) {
        
        
        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

        if (isBlob && typeof FileReader !== "undefined") {
            return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    reject(e.target.error);
                };
                reader.readAsArrayBuffer(data);
            });
        } else {
            return data;
        }
    });

    return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);

        if (!dataType) {
            return external.Promise.reject(
                new Error("Can't read the data of '" + name + "'. Is it " +
                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
            );
        }
        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
            if (isBase64) {
                data = base64.decode(data);
            }
            else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                    // this is a string, not in a base64 format.
                    // Be sure that this is a correct "binary string"
                    data = string2binary(data);
                }
            }
        }
        return data;
    });
};

},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var sig = require('./signature');
var ZipEntry = require('./zipEntry');
var utf8 = require('./utf8');
var support = require('./support');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the specified signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
            this.reader.index -= 4;
            var signature = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Check if the given signature is at the given index.
     * @param {number} askedIndex the index to check.
     * @param {string} expectedSignature the signature to expect.
     * @return {boolean} true if the signature is here, false otherwise.
     */
    isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded unless specified otherwise.
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        // this.versionMadeBy = this.reader.readString(2);
        // this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readData(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }

        if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
            }
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip: can't find end of central directory");
            }

        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }

        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
        }

        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

        if (extraBytes > 0) {
            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
            } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes;
            }
        } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
    },
    prepareReader: function(data) {
        this.reader = readerFor(data);
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var CompressedObject = require('./compressedObject');
var crc32fn = require('./crc32');
var utf8 = require('./utf8');
var compressions = require('./compressions');
var support = require('./support');

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
var findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
        }

        compression = findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        // this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        // will be read in the local part, see the comments there
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = readerFor(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        if (!this.extraFields) {
            this.extraFields = {};
        }

        while (reader.index < end) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readData(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
            this.fileNameStr = utf8.utf8decode(this.fileName);
            this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileNameStr = upath;
            } else {
                // ASCII text or unsupported code page
                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }

            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileCommentStr = ucomment;
            } else {
                // ASCII text or unsupported code page
                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = readerFor(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = readerFor(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){
'use strict';

var StreamHelper = require('./stream/StreamHelper');
var DataWorker = require('./stream/DataWorker');
var utf8 = require('./utf8');
var CompressedObject = require('./compressedObject');
var GenericWorker = require('./stream/GenericWorker');

/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this._dataBinary = options.binary;
    // keep only the compression
    this.options = {
        compression : options.compression,
        compressionOptions : options.compressionOptions
    };
};

ZipObject.prototype = {
    /**
     * Create an internal stream for the content of this object.
     * @param {String} type the type of each chunk.
     * @return StreamHelper the stream.
     */
    internalStream: function (type) {
        var result = null, outputType = "string";
        try {
            if (!type) {
                throw new Error("No output type specified.");
            }
            outputType = type.toLowerCase();
            var askUnicodeString = outputType === "string" || outputType === "text";
            if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
            }
            result = this._decompressWorker();

            var isUnicodeString = !this._dataBinary;

            if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
            }
        } catch (e) {
            result = new GenericWorker("error");
            result.error(e);
        }

        return new StreamHelper(result, outputType, "");
    },

    /**
     * Prepare the content in the asked type.
     * @param {String} type the type of the result.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Promise the promise of the result.
     */
    async: function (type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
    },

    /**
     * Prepare the content as a nodejs stream.
     * @param {String} type the type of each chunk.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Stream the stream.
     */
    nodeStream: function (type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },

    /**
     * Return a worker for the compressed content.
     * @private
     * @param {Object} compression the compression object to use.
     * @param {Object} compressionOptions the options to use when compressing.
     * @return Worker the worker.
     */
    _compressWorker: function (compression, compressionOptions) {
        if (
            this._data instanceof CompressedObject &&
            this._data.compression.magic === compression.magic
        ) {
            return this._data.getCompressedWorker();
        } else {
            var result = this._decompressWorker();
            if(!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
    },
    /**
     * Return a worker for the decompressed content.
     * @private
     * @return Worker the worker.
     */
    _decompressWorker : function () {
        if (this._data instanceof CompressedObject) {
            return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
            return this._data;
        } else {
            return new DataWorker(this._data);
        }
    }
};

var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};

for(var i = 0; i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
}
module.exports = ZipObject;

},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
require('../modules/web.immediate');
module.exports = require('../modules/_core').setImmediate;
},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],38:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":51}],39:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],40:[function(require,module,exports){
var core = module.exports = {version: '2.3.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],41:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":37}],42:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":45}],43:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":46,"./_is-object":51}],44:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],46:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],47:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":46}],49:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],51:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],52:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],54:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":51}],56:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":44,"./_task":54}],57:[function(require,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],58:[function(require,module,exports){
'use strict';
var immediate = require('immediate');

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"immediate":57}],59:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants


var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var c            = require('./zlib/constants');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');
var GZheader     = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],63:[function(require,module,exports){
// String encode/decode helpers



var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":62}],64:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],65:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],66:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],67:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg     = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],69:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],70:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = require('../utils/common');
var adler32       = require('./adler32');
var crc32         = require('./crc32');
var inflate_fast  = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = zswap32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = { bits: state.lenbits };
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = { bits: state.lenbits };
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = { bits: state.distbits };
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":62}],72:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],73:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":62}],74:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}]},{},[10])(10)
});
define('zip',["SFile","jszip","FileSaver.min","Util","DeferredUtil"],
function (SFile,JSZip,fsv,Util,DU) {
    var zip={};
    zip.zip=function (dir,dstZip,options) {
        if (!SFile.is(dstZip)) options=dstZip;
        options=options||{};
        var zip = new JSZip();
        function loop(dst, dir) {
            return dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name().replace(/[\/\\]$/,""));
                    return loop(sf, f);
                } else {
                    return f.getContent(function (c) {
                        dst.file(f.name(),c.toArrayBuffer());
                    });
                }
            });
        }
        return loop(zip, dir).then(function () {
            return DU.resolve(zip.generateAsync({
                type:"arraybuffer",
                compression:"DEFLATE"
            }));
        }).then(function (content) {
            //console.log("zip.con",content);
            if (SFile.is(dstZip)) {
                return dstZip.setBytes(content);
            } else {
                saveAs(
                    new Blob([content],{type:"application/zip"}),
                    dir.name().replace(/[\/\\]$/,"")+".zip"
                );
            }
        });
    };
    zip.unzip=function (arrayBuf,destDir,options) {
        var c;
        var status={};
        options=options||{};
        if (SFile.is(arrayBuf)) {
        	c=arrayBuf.getContent();
        	arrayBuf=c.toArrayBuffer();
        }
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) {
                        return false;
                    }
                    return f;
                }
            };
        }
        var zip=new JSZip();
        return DU.resolve(zip.loadAsync(arrayBuf)).then(function () {
            return DU.each(zip.files,function (key,zipEntry) {
                //var zipEntry=zip.files[i];
                return DU.resolve(zipEntry.async("arraybuffer")).then(function (buf) {
                    var dest=destDir.rel(zipEntry.name);
                    console.log("Inflating",zipEntry.name);
                    if (dest.isDir()) return;
                    var s={
                        file:dest,
                        status:"uploaded"
                    };
                    status[dest.path()]=s;
                    var c=FS.Content.bin( buf, dest.contentType() );
                    var res=options.onCheckFile(dest,c);
                    if (res===false) {
                        s.status="cancelled";
                        dest=null;
                    }
                    if (SFile.is(res)) {
                        if (dest.path()!==res.path()) s.redirectedTo=res;
                        dest=res;
                    }
                    if (dest) return dest.setContent(c);
                });
            });
        }).then(function () {
            console.log("unzip done",status);
            return status;
        });
    };
    zip.JSZip=JSZip;
    return zip;
});

define('FS',["FS2","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil"],
        function (FSClass,NativeFS,LSFS,WebFS, P,Env,A,SFile,RootFS,Content,zip,DU) {
    var FS={};
    FS.assert=A;
    FS.Content=Content;
    FS.Class=FSClass;
    FS.DeferredUtil=DU;
    FS.Env=Env;
    FS.LSFS=LSFS;
    FS.NativeFS=NativeFS;
    FS.PathUtil=P;
    FS.RootFS=RootFS;
    FS.SFile=SFile;
    FS.WebFS=WebFS;
    FS.zip=zip;
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env({});
    DU.external.Promise=zip.JSZip.external.Promise;
    FS.addFSType=FSClass.addFSType;
    FS.availFSTypes=FSClass.availFSTypes;

    FS.setEnvProvider=function (e) {
        env=e;
    };
    FS.getEnvProvider=function () {
        return env;
    };
    FS.setEnv=function (key, value) {
        if (typeof key=="object") {
            for (var k in key) {
                env.set(k,key[k]);
            }
        }else {
            env.set(key,value);
        }
    };
    FS.getEnv=function (key) {
        if (typeof key=="string") {
            return env.get(key);
        }else {
            return env.value;
        }
    };
    FS.init=function (fs) {
        if (rootFS) return;
        if (!fs) {
            if (typeof process=="object") {
                fs=new NativeFS();
            } else {
                fs=new LSFS(localStorage);
            }
        }
        rootFS=new RootFS(fs);
    };
    FS.getRootFS=function () {
        FS.init();
        return rootFS;
    };
    FS.get=function () {
        FS.init();
        return rootFS.get.apply(rootFS,arguments);
    };
    FS.expandPath=function () {
        return env.expandPath.apply(env,arguments);
    };
    FS.resolve=function (path, base) {
        FS.init();
        if (SFile.is(path)) return path;
        path=env.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expandPath(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };
    FS.mount=function () {
        FS.init();
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        FS.init();
        return rootFS.unmount.apply(rootFS,arguments);
    };
    FS.isFile=function (f) {
        return SFile.is(f);
    };
    return FS;
});

//-----------
	var resMod;
	requirejs(["FS"], function (r) {
	  resMod=r;
	});
	if (window.FS===undefined) window.FS=resMod;
	return resMod;
});
//})(window);

requireSimulator.setName('assert');
define(["FS"],function (FS){return FS.assert;});

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
            },
            tryLoop: function (f,r) {
                return DU.loop(DU.tr(f),r);
            },
            tryEach: function (s,f) {
                return DU.loop(s,DU.tr(f));
            },
            documentReady:function () {
                return DU.callbackToPromise(function (s) {$(s);});
            },
            requirejs:function (modules) {
                if (!window.requirejs) throw new Error("requirejs is not loaded");
                return DU.callbackToPromise(function (s) {
                    window.requirejs(modules,s);
                });
            }
    };
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;

    return DU;
});

requireSimulator.setName('Klass');
define(["assert"],function (A) {
    var Klass={};
    Klass.define=function (pd) {
        var p,parent;
        if (pd.$parent) {
            parent=pd.$parent;
            p=Object.create(parent.prototype);
            p.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var n=a.shift();
                return parent.prototype[n].apply(this,a);
            };
        } else {
            p={};
        }
        var init=pd.$ || function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        };
        var fldinit;
        var check;
        if (init instanceof Array) {
            fldinit=init;
            init=function () {
                var a=Array.prototype.slice.call(arguments);
                for (var i=0;i<fldinit.length;i++) {
                    if (a.length>0) this[fldinit[i]]=a.shift();
                }
            };
        }
        var klass;
        function checkSchema(self) {
            if (pd.$fields) {
                //console.log("Checking schema",self,pd.$fields);
                A.is(self,pd.$fields);
            }
        }
        klass=function () {
            if (! (this instanceof klass)) {
                var res=Object.create(p);
                init.apply(res,arguments);
                checkSchema(res);
                return res;
            }
            init.apply(this,arguments);
            checkSchema(this);
        };
        if (parent) {
            klass.super=function () {
                var a=Array.prototype.slice.call(arguments);
                var t=a.shift();
                var n=a.shift();
                return parent.prototype[n].apply(t,a);
            };
        }
        klass.inherit=function (pd) {
            pd.$parent=klass;
            return Klass.define(pd);
        };
        klass.prototype=p;
        for (var name in pd) {
            if (name[0]=="$") continue;
            if (name.substring(0,7)=="static$") {
                klass[name.substring(7)]=pd[name];
            } else {
                if (isPropDesc(pd[name])) {
                    Object.defineProperty(p,name,pd[name]);
                } else {
                    p[name]=pd[name];
                }
            }
        }
        p.$=init;
        return klass;
    };
    function isPropDesc(o) {
        if (typeof o!=="object") return false;
        if (!o) return false;
        var pk={configurable:1,enumerable:1,value:1,writable:1,get:1,set:1};
        var c=0;
        for (var k in o) {
            if (!pk[k]) return false;
            c+=pk[k];
        }
        return c;
    }
    Klass.Function=function () {throw new Exception("Abstract");}
    Klass.opt=A.opt;
    return Klass;
});
/*
requirejs(["Klass"],function (k) {
  P=k.define ({
     $:["x","y"]
  });    
  p=P(2,3);
  console.log(p.x,p.y);
});
*/
requireSimulator.setName('Tonyu.Thread');
define(["DeferredUtil","Klass"],function (DU,Klass) {
	var cnts={enterC:{},exitC:0};
	try {window.cnts=cnts;}catch(e){}
	var TonyuThread=Klass.define({
		$: function TonyuThread() {
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
				fb.stepsLoop();
			}).fail(function (e) {
				if (e instanceof Error) {
					fb.gotoCatch(e);
				} else {
					var re=new Error(e);
					re.original=e;
					fb.gotoCatch(re);
				}
				fb.stepsLoop();
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
		stepsLoop: function () {
			var fb=this;
			fb.steps();
			if (fb.preempted) {
				setTimeout(function () {
					fb.stepsLoop();
				},0);
			}
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
define(["Klass"], function (Klass) {
	var ArrayValueIterator=Klass.define({
		$: function ArrayValueIterator(set) {
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
	var ArrayKeyValueIterator=Klass.define({
		$: function ArrayKeyValueIterator(set) {
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
	var ObjectKeyIterator=Klass.define({
		$: function ObjectKeyIterator(set) {
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
	var ObjectKeyValueIterator=Klass.define({
		$: function ObjectKeyValueIterator(set) {
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
		//var th=thread();
		//th.apply(boot,"main");
		var TPR;
		if (TPR=Tonyu.currentProject) {
			//TPR.runningThread=th;
			TPR.runningObj=boot;
		}
		$LASTPOS=0;
		//th.steps();
	}
	var lastLoopCheck=new Date().getTime();
	var prevCheckLoopCalled;
	function checkLoop() {
		var now=new Date().getTime();
		if (now-lastLoopCheck>1000) {
			resetLoopCheck(10000);
			throw new Error("無限ループをストップしました"+(now-prevCheckLoopCalled));
		}
		prevCheckLoopCalled=now;
	}
	function resetLoopCheck(disableTime) {
		lastLoopCheck=new Date().getTime()+(disableTime||0);
	}
	function is(obj,klass) {
		if (klass===Number) {
			return typeof obj==="number";
		}
		if (klass===String) {
			return typeof obj==="string";
		}
		if (klass===Boolean) {
			return typeof obj==="boolean";
		}
		//Functi.... never mind.
	}
	setInterval(resetLoopCheck,16);
	return Tonyu={thread:thread, /*threadGroup:threadGroup,*/ klass:klass, bless:bless, extend:extend,
			globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
			timeout:timeout,animationFrame:animationFrame, /*asyncResult:asyncResult,*/
			bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,
			hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
			run:run,iterator:IT,checkLoop:checkLoop,resetLoopCheck:resetLoopCheck,
			VERSION:1513414431368,//EMBED_VERSION
			A:A};
}();
});

requireSimulator.setName('source-map');
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("source-map",[], factory);
	else if(typeof exports === 'object')
		exports["sourceMap"] = factory();
	else
		root["sourceMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* Copyright 2009-2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE.txt or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/
	exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(10).SourceNode;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var base64VLQ = __webpack_require__(2);
	var util = __webpack_require__(4);
	var ArraySet = __webpack_require__(5).ArraySet;
	var MappingList = __webpack_require__(6).MappingList;

	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) {
		aArgs = {};
		}
		this._file = util.getArg(aArgs, 'file', null);
		this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap =
		function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot: sourceRoot
		});
		aSourceMapConsumer.eachMapping(function (mapping) {
			var newMapping = {
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			}
			};

			if (mapping.source != null) {
			newMapping.source = mapping.source;
			if (sourceRoot != null) {
				newMapping.source = util.relative(sourceRoot, newMapping.source);
			}

			newMapping.original = {
				line: mapping.originalLine,
				column: mapping.originalColumn
			};

			if (mapping.name != null) {
				newMapping.name = mapping.name;
			}
			}

			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			generator.setSourceContent(sourceFile, content);
			}
		});
		return generator;
		};

	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping =
		function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, 'generated');
		var original = util.getArg(aArgs, 'original', null);
		var source = util.getArg(aArgs, 'source', null);
		var name = util.getArg(aArgs, 'name', null);

		if (!this._skipValidation) {
			this._validateMapping(generated, original, source, name);
		}

		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) {
			this._sources.add(source);
			}
		}

		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) {
			this._names.add(name);
			}
		}

		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source: source,
			name: name
		});
		};

	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent =
		function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) {
			source = util.relative(this._sourceRoot, source);
		}

		if (aSourceContent != null) {
			// Add the source content to the _sourcesContents map.
			// Create a new _sourcesContents map if the property is null.
			if (!this._sourcesContents) {
			this._sourcesContents = Object.create(null);
			}
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			// Remove the source file from the _sourcesContents map.
			// If the _sourcesContents map is empty, set the property to null.
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) {
			this._sourcesContents = null;
			}
		}
		};

	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap =
		function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		// If aSourceFile is omitted, we will use the file property of the SourceMap
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) {
			throw new Error(
				'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
				'or the source map\'s "file" property. Both were omitted.'
			);
			}
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		// Make "sourceFile" relative if an absolute Url is passed.
		if (sourceRoot != null) {
			sourceFile = util.relative(sourceRoot, sourceFile);
		}
		// Applying the SourceMap can add and remove items from the sources and
		// the names array.
		var newSources = new ArraySet();
		var newNames = new ArraySet();

		// Find mappings for the "sourceFile"
		this._mappings.unsortedForEach(function (mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
			// Check if it can be mapped by the source map, then update the mapping.
			var original = aSourceMapConsumer.originalPositionFor({
				line: mapping.originalLine,
				column: mapping.originalColumn
			});
			if (original.source != null) {
				// Copy mapping
				mapping.source = original.source;
				if (aSourceMapPath != null) {
				mapping.source = util.join(aSourceMapPath, mapping.source)
				}
				if (sourceRoot != null) {
				mapping.source = util.relative(sourceRoot, mapping.source);
				}
				mapping.originalLine = original.line;
				mapping.originalColumn = original.column;
				if (original.name != null) {
				mapping.name = original.name;
				}
			}
			}

			var source = mapping.source;
			if (source != null && !newSources.has(source)) {
			newSources.add(source);
			}

			var name = mapping.name;
			if (name != null && !newNames.has(name)) {
			newNames.add(name);
			}

		}, this);
		this._sources = newSources;
		this._names = newNames;

		// Copy sourcesContents of applied map.
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aSourceMapPath != null) {
				sourceFile = util.join(aSourceMapPath, sourceFile);
			}
			if (sourceRoot != null) {
				sourceFile = util.relative(sourceRoot, sourceFile);
			}
			this.setSourceContent(sourceFile, content);
			}
		}, this);
		};

	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping =
		function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
													aName) {
		if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
			&& aGenerated.line > 0 && aGenerated.column >= 0
			&& !aOriginal && !aSource && !aName) {
			// Case 1.
			return;
		}
		else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
				&& aOriginal && 'line' in aOriginal && 'column' in aOriginal
				&& aGenerated.line > 0 && aGenerated.column >= 0
				&& aOriginal.line > 0 && aOriginal.column >= 0
				&& aSource) {
			// Cases 2 and 3.
			return;
		}
		else {
			throw new Error('Invalid mapping: ' + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
			}));
		}
		};

	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings =
		function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = '';
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;

		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = ''

			if (mapping.generatedLine !== previousGeneratedLine) {
			previousGeneratedColumn = 0;
			while (mapping.generatedLine !== previousGeneratedLine) {
				next += ';';
				previousGeneratedLine++;
			}
			}
			else {
			if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
				continue;
				}
				next += ',';
			}
			}

			next += base64VLQ.encode(mapping.generatedColumn
									- previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;

			if (mapping.source != null) {
			sourceIdx = this._sources.indexOf(mapping.source);
			next += base64VLQ.encode(sourceIdx - previousSource);
			previousSource = sourceIdx;

			// lines are stored 0-based in SourceMap spec version 3
			next += base64VLQ.encode(mapping.originalLine - 1
										- previousOriginalLine);
			previousOriginalLine = mapping.originalLine - 1;

			next += base64VLQ.encode(mapping.originalColumn
										- previousOriginalColumn);
			previousOriginalColumn = mapping.originalColumn;

			if (mapping.name != null) {
				nameIdx = this._names.indexOf(mapping.name);
				next += base64VLQ.encode(nameIdx - previousName);
				previousName = nameIdx;
			}
			}

			result += next;
		}

		return result;
		};

	SourceMapGenerator.prototype._generateSourcesContent =
		function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function (source) {
			if (!this._sourcesContents) {
			return null;
			}
			if (aSourceRoot != null) {
			source = util.relative(aSourceRoot, source);
			}
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
			? this._sourcesContents[key]
			: null;
		}, this);
		};

	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON =
		function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) {
			map.file = this._file;
		}
		if (this._sourceRoot != null) {
			map.sourceRoot = this._sourceRoot;
		}
		if (this._sourcesContents) {
			map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		}

		return map;
		};

	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString =
		function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
		};

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*
	* Based on the Base 64 VLQ implementation in Closure Compiler:
	* https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	*
	* Copyright 2011 The Closure Compiler Authors. All rights reserved.
	* Redistribution and use in source and binary forms, with or without
	* modification, are permitted provided that the following conditions are
	* met:
	*
	*  * Redistributions of source code must retain the above copyright
	*    notice, this list of conditions and the following disclaimer.
	*  * Redistributions in binary form must reproduce the above
	*    copyright notice, this list of conditions and the following
	*    disclaimer in the documentation and/or other materials provided
	*    with the distribution.
	*  * Neither the name of Google Inc. nor the names of its
	*    contributors may be used to endorse or promote products derived
	*    from this software without specific prior written permission.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var base64 = __webpack_require__(3);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0
		? ((-aValue) << 1) + 1
		: (aValue << 1) + 0;
	}

	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative
		? -shifted
		: shifted;
	}

	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;

		var vlq = toVLQSigned(aValue);

		do {
		digit = vlq & VLQ_BASE_MASK;
		vlq >>>= VLQ_BASE_SHIFT;
		if (vlq > 0) {
			// There are still more digits in this value, so we must make sure the
			// continuation bit is marked.
			digit |= VLQ_CONTINUATION_BIT;
		}
		encoded += base64.encode(digit);
		} while (vlq > 0);

		return encoded;
	};

	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;

		do {
		if (aIndex >= strLen) {
			throw new Error("Expected more digits in base 64 VLQ value.");
		}

		digit = base64.decode(aStr.charCodeAt(aIndex++));
		if (digit === -1) {
			throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		}

		continuation = !!(digit & VLQ_CONTINUATION_BIT);
		digit &= VLQ_BASE_MASK;
		result = result + (digit << shift);
		shift += VLQ_BASE_SHIFT;
		} while (continuation);

		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function (number) {
		if (0 <= number && number < intToCharMap.length) {
		return intToCharMap[number];
		}
		throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function (charCode) {
		var bigA = 65;     // 'A'
		var bigZ = 90;     // 'Z'

		var littleA = 97;  // 'a'
		var littleZ = 122; // 'z'

		var zero = 48;     // '0'
		var nine = 57;     // '9'

		var plus = 43;     // '+'
		var slash = 47;    // '/'

		var littleOffset = 26;
		var numberOffset = 52;

		// 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		if (bigA <= charCode && charCode <= bigZ) {
		return (charCode - bigA);
		}

		// 26 - 51: abcdefghijklmnopqrstuvwxyz
		if (littleA <= charCode && charCode <= littleZ) {
		return (charCode - littleA + littleOffset);
		}

		// 52 - 61: 0123456789
		if (zero <= charCode && charCode <= nine) {
		return (charCode - zero + numberOffset);
		}

		// 62: +
		if (charCode == plus) {
		return 62;
		}

		// 63: /
		if (charCode == slash) {
		return 63;
		}

		// Invalid base64 digit.
		return -1;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) {
		return aArgs[aName];
		} else if (arguments.length === 3) {
		return aDefaultValue;
		} else {
		throw new Error('"' + aName + '" is a required argument.');
		}
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) {
		return null;
		}
		return {
		scheme: match[1],
		auth: match[2],
		host: match[3],
		port: match[4],
		path: match[5]
		};
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
		url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
		url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
		url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
		url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
		url += aParsedUrl.path;
		}
		return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consequtive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
		if (!url.path) {
			return aPath;
		}
		path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);

		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		part = parts[i];
		if (part === '.') {
			parts.splice(i, 1);
		} else if (part === '..') {
			up++;
		} else if (up > 0) {
			if (part === '') {
			// The first part is blank if the path is absolute. Trying to go
			// above the root is a no-op. Therefore we can remove all '..' parts
			// directly after the root.
			parts.splice(i + 1, up);
			up = 0;
			} else {
			parts.splice(i, 2);
			up--;
			}
		}
		}
		path = parts.join('/');

		if (path === '') {
		path = isAbsolute ? '/' : '.';
		}

		if (url) {
		url.path = path;
		return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;

	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}
		if (aPath === "") {
		aPath = ".";
		}
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) {
		aRoot = aRootUrl.path || '/';
		}

		// `join(foo, '//www.example.org')`
		if (aPathUrl && !aPathUrl.scheme) {
		if (aRootUrl) {
			aPathUrl.scheme = aRootUrl.scheme;
		}
		return urlGenerate(aPathUrl);
		}

		if (aPathUrl || aPath.match(dataUrlRegexp)) {
		return aPath;
		}

		// `join('http://', 'www.example.com')`
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		aRootUrl.host = aPath;
		return urlGenerate(aRootUrl);
		}

		var joined = aPath.charAt(0) === '/'
		? aPath
		: normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		if (aRootUrl) {
		aRootUrl.path = joined;
		return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
		return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}

		aRoot = aRoot.replace(/\/$/, '');

		// It is possible for the path to be above the root. In this case, simply
		// checking whether the root is a prefix of the path won't work. Instead, we
		// need to remove components from the root one by one, until either we find
		// a prefix that fits, or we run out of components to remove.
		var level = 0;
		while (aPath.indexOf(aRoot + '/') !== 0) {
		var index = aRoot.lastIndexOf("/");
		if (index < 0) {
			return aPath;
		}

		// If the only part of the root that is left is the scheme (i.e. http://,
		// file:///, etc.), one or more slashes (/), or simply nothing at all, we
		// have exhausted all components, so the path is not relative to the root.
		aRoot = aRoot.slice(0, index);
		if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			return aPath;
		}

		++level;
		}

		// Make sure we add a "../" for each component we removed from the root.
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
		var obj = Object.create(null);
		return !('__proto__' in obj);
	}());

	function identity (s) {
		return s;
	}

	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) {
		return '$' + aStr;
		}

		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
		if (isProtoString(aStr)) {
		return aStr.slice(1);
		}

		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
		if (!s) {
		return false;
		}

		var length = s.length;

		if (length < 9 /* "__proto__".length */) {
		return false;
		}

		if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			s.charCodeAt(length - 9) !== 95  /* '_' */) {
		return false;
		}

		for (var i = length - 10; i >= 0; i--) {
		if (s.charCodeAt(i) !== 36 /* '$' */) {
			return false;
		}
		}

		return true;
	}

	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) {
		return cmp;
		}

		cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) {
		return 0;
		}

		if (aStr1 > aStr2) {
		return 1;
		}

		return -1;
	}

	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var has = Object.prototype.hasOwnProperty;

	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = Object.create(null);
	}

	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) {
		set.add(aArray[i], aAllowDuplicates);
		}
		return set;
	};

	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = util.toSetString(aStr);
		var isDuplicate = has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) {
		this._array.push(aStr);
		}
		if (!isDuplicate) {
		this._set[sStr] = idx;
		}
	};

	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		var sStr = util.toSetString(aStr);
		return has.call(this._set, sStr);
	};

	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		var sStr = util.toSetString(aStr);
		if (has.call(this._set, sStr)) {
		return this._set[sStr];
		}
		throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) {
		return this._array[aIdx];
		}
		throw new Error('No element indexed by ' + aIdx);
	};

	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2014 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);

	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		// Optimized for most common case
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA ||
			util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		// Serves as infimum
		this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach =
		function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
		};

	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
		this._last = aMapping;
		this._array.push(aMapping);
		} else {
		this._sorted = false;
		this._array.push(aMapping);
		}
	};

	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
		this._array.sort(util.compareByGeneratedPositionsInflated);
		this._sorted = true;
		}
		return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var binarySearch = __webpack_require__(8);
	var ArraySet = __webpack_require__(5).ArraySet;
	var base64VLQ = __webpack_require__(2);
	var quickSort = __webpack_require__(9).quickSort;

	function SourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		return sourceMap.sections != null
		? new IndexedSourceMapConsumer(sourceMap)
		: new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		get: function () {
		if (!this.__generatedMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__generatedMappings;
		}
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		get: function () {
		if (!this.__originalMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__originalMappings;
		}
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
		function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
		};

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping =
		function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		var mappings;
		switch (order) {
		case SourceMapConsumer.GENERATED_ORDER:
			mappings = this._generatedMappings;
			break;
		case SourceMapConsumer.ORIGINAL_ORDER:
			mappings = this._originalMappings;
			break;
		default:
			throw new Error("Unknown order of iteration.");
		}

		var sourceRoot = this.sourceRoot;
		mappings.map(function (mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			if (source != null && sourceRoot != null) {
			source = util.join(sourceRoot, source);
			}
			return {
			source: source,
			generatedLine: mapping.generatedLine,
			generatedColumn: mapping.generatedColumn,
			originalLine: mapping.originalLine,
			originalColumn: mapping.originalColumn,
			name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
		};

	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: Optional. the column number in the original source.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
		function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, 'line');

		// When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		// returns the index of the closest mapping less than the needle. By
		// setting needle.originalColumn to 0, we thus find the last mapping for
		// the given line, provided such a mapping exists.
		var needle = {
			source: util.getArg(aArgs, 'source'),
			originalLine: line,
			originalColumn: util.getArg(aArgs, 'column', 0)
		};

		if (this.sourceRoot != null) {
			needle.source = util.relative(this.sourceRoot, needle.source);
		}
		if (!this._sources.has(needle.source)) {
			return [];
		}
		needle.source = this._sources.indexOf(needle.source);

		var mappings = [];

		var index = this._findMapping(needle,
										this._originalMappings,
										"originalLine",
										"originalColumn",
										util.compareByOriginalPositions,
										binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (aArgs.column === undefined) {
			var originalLine = mapping.originalLine;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we found. Since
			// mappings are sorted, this is guaranteed to find all mappings for
			// the line we found.
			while (mapping && mapping.originalLine === originalLine) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			} else {
			var originalColumn = mapping.originalColumn;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we were searching for.
			// Since mappings are sorted, this is guaranteed to find all mappings for
			// the line we are searching for.
			while (mapping &&
					mapping.originalLine === line &&
					mapping.originalColumn == originalColumn) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			}
		}

		return mappings;
		};

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The only parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sources = util.getArg(sourceMap, 'sources');
		// Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		// requires the array) to play nice here.
		var names = util.getArg(sourceMap, 'names', []);
		var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		var mappings = util.getArg(sourceMap, 'mappings');
		var file = util.getArg(sourceMap, 'file', null);

		// Once again, Sass deviates from the spec and supplies the version as a
		// string rather than a number, so we use loose equality checking here.
		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		sources = sources
		.map(String)
		// Some source maps produce relative source paths like "./foo.js" instead of
		// "foo.js".  Normalize these first so that future comparisons will succeed.
		// See bugzil.la/1090768.
		.map(util.normalize)
		// Always ensure that absolute sources are internally stored relative to
		// the source root, if the source root is absolute. Not doing this would
		// be particularly problematic when the source root is a prefix of the
		// source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		.map(function (source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
			? util.relative(sourceRoot, source)
			: source;
		});

		// Pass `true` below to allow duplicate names and sources. While source maps
		// are intended to be compressed and deduplicated, the TypeScript compiler
		// sometimes generates source maps with duplicates in them. See Github issue
		// #72 and bugzil.la/889492.
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);

		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap =
		function SourceMapConsumer_fromSourceMap(aSourceMap) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);

		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
																smc.sourceRoot);
		smc.file = aSourceMap._file;

		// Because we are modifying the entries (by converting string sources and
		// names to indices into the sources and names ArraySets), we have to make
		// a copy of the entry or else bad things happen. Shared mutable state
		// strikes again! See github issue #191.

		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];

		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping;
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;

			if (srcMapping.source) {
			destMapping.source = sources.indexOf(srcMapping.source);
			destMapping.originalLine = srcMapping.originalLine;
			destMapping.originalColumn = srcMapping.originalColumn;

			if (srcMapping.name) {
				destMapping.name = names.indexOf(srcMapping.name);
			}

			destOriginalMappings.push(destMapping);
			}

			destGeneratedMappings.push(destMapping);
		}

		quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		return smc;
		};

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		get: function () {
		return this._sources.toArray().map(function (s) {
			return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
		}, this);
		}
	});

	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;

		while (index < length) {
			if (aStr.charAt(index) === ';') {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			}
			else if (aStr.charAt(index) === ',') {
			index++;
			}
			else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;

			// Because each offset is encoded relative to the previous one,
			// many segments often have the same encoding. We can exploit this
			// fact by caching the parsed variable length fields of each segment,
			// allowing us to avoid a second parse if we encounter the same
			// segment again.
			for (end = index; end < length; end++) {
				if (this._charIsMappingSeparator(aStr, end)) {
				break;
				}
			}
			str = aStr.slice(index, end);

			segment = cachedSegments[str];
			if (segment) {
				index += str.length;
			} else {
				segment = [];
				while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
				}

				if (segment.length === 2) {
				throw new Error('Found a source, but no line and column');
				}

				if (segment.length === 3) {
				throw new Error('Found a source and line, but no column');
				}

				cachedSegments[str] = segment;
			}

			// Generated column.
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;

			if (segment.length > 1) {
				// Original source.
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];

				// Original line.
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				// Lines are stored 0-based
				mapping.originalLine += 1;

				// Original column.
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;

				if (segment.length > 4) {
				// Original name.
				mapping.name = previousName + segment[4];
				previousName += segment[4];
				}
			}

			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === 'number') {
				originalMappings.push(mapping);
			}
			}
		}

		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;

		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
		};

	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping =
		function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
											aColumnName, aComparator, aBias) {
		// To return the position we are searching for, we must first find the
		// mapping for the given position and then return the opposite position it
		// points to. Because the mappings are sorted, we can use binary search to
		// find the best mapping.

		if (aNeedle[aLineName] <= 0) {
			throw new TypeError('Line must be greater than or equal to 1, got '
								+ aNeedle[aLineName]);
		}
		if (aNeedle[aColumnName] < 0) {
			throw new TypeError('Column must be greater than or equal to 0, got '
								+ aNeedle[aColumnName]);
		}

		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		};

	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans =
		function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];

			// Mappings do not contain a field for the last generated columnt. We
			// can come up with an optimistic estimate, however, by assuming that
			// mappings are contiguous (i.e. given two consecutive mappings, the
			// first mapping ends where the second one starts).
			if (index + 1 < this._generatedMappings.length) {
			var nextMapping = this._generatedMappings[index + 1];

			if (mapping.generatedLine === nextMapping.generatedLine) {
				mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
				continue;
			}
			}

			// The last mapping for each line spans the entire line.
			mapping.lastGeneratedColumn = Infinity;
		}
		};

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor =
		function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._generatedMappings,
			"generatedLine",
			"generatedColumn",
			util.compareByGeneratedPositionsDeflated,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._generatedMappings[index];

			if (mapping.generatedLine === needle.generatedLine) {
			var source = util.getArg(mapping, 'source', null);
			if (source !== null) {
				source = this._sources.at(source);
				if (this.sourceRoot != null) {
				source = util.join(this.sourceRoot, source);
				}
			}
			var name = util.getArg(mapping, 'name', null);
			if (name !== null) {
				name = this._names.at(name);
			}
			return {
				source: source,
				line: util.getArg(mapping, 'originalLine', null),
				column: util.getArg(mapping, 'originalColumn', null),
				name: name
			};
			}
		}

		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) {
			return false;
		}
		return this.sourcesContent.length >= this._sources.size() &&
			!this.sourcesContent.some(function (sc) { return sc == null; });
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor =
		function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) {
			return null;
		}

		if (this.sourceRoot != null) {
			aSource = util.relative(this.sourceRoot, aSource);
		}

		if (this._sources.has(aSource)) {
			return this.sourcesContent[this._sources.indexOf(aSource)];
		}

		var url;
		if (this.sourceRoot != null
			&& (url = util.urlParse(this.sourceRoot))) {
			// XXX: file:// URIs and absolute paths lead to unexpected behavior for
			// many users. We can help them out when they expect file:// URIs to
			// behave like it would if they were running a local HTTP server. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
			var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
			if (url.scheme == "file"
				&& this._sources.has(fileUriAbsPath)) {
			return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
			}

			if ((!url.path || url.path == "/")
				&& this._sources.has("/" + aSource)) {
			return this.sourcesContent[this._sources.indexOf("/" + aSource)];
			}
		}

		// This function is used recursively from
		// IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		// don't want to throw if we can't find the source - we just want to
		// return null, so we provide a flag to exit gracefully.
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor =
		function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, 'source');
		if (this.sourceRoot != null) {
			source = util.relative(this.sourceRoot, source);
		}
		if (!this._sources.has(source)) {
			return {
			line: null,
			column: null,
			lastColumn: null
			};
		}
		source = this._sources.indexOf(source);

		var needle = {
			source: source,
			originalLine: util.getArg(aArgs, 'line'),
			originalColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._originalMappings,
			"originalLine",
			"originalColumn",
			util.compareByOriginalPositions,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (mapping.source === needle.source) {
			return {
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
			};
			}
		}

		return {
			line: null,
			column: null,
			lastColumn: null
		};
		};

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The only parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sections = util.getArg(sourceMap, 'sections');

		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		this._sources = new ArraySet();
		this._names = new ArraySet();

		var lastOffset = {
		line: -1,
		column: 0
		};
		this._sections = sections.map(function (s) {
		if (s.url) {
			// The url field will require support for asynchronicity.
			// See https://github.com/mozilla/source-map/issues/16
			throw new Error('Support for url field in sections not implemented.');
		}
		var offset = util.getArg(s, 'offset');
		var offsetLine = util.getArg(offset, 'line');
		var offsetColumn = util.getArg(offset, 'column');

		if (offsetLine < lastOffset.line ||
			(offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
			throw new Error('Section offsets must be ordered and non-overlapping.');
		}
		lastOffset = offset;

		return {
			generatedOffset: {
			// The offset fields are 0-based, but we use 1-based indices when
			// encoding/decoding from VLQ.
			generatedLine: offsetLine + 1,
			generatedColumn: offsetColumn + 1
			},
			consumer: new SourceMapConsumer(util.getArg(s, 'map'))
		}
		});
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		get: function () {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
			sources.push(this._sections[i].consumer.sources[j]);
			}
		}
		return sources;
		}
	});

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor =
		function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		// Find the section containing the generated position we're trying to map
		// to an original position.
		var sectionIndex = binarySearch.search(needle, this._sections,
			function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) {
				return cmp;
			}

			return (needle.generatedColumn -
					section.generatedOffset.generatedColumn);
			});
		var section = this._sections[sectionIndex];

		if (!section) {
			return {
			source: null,
			line: null,
			column: null,
			name: null
			};
		}

		return section.consumer.originalPositionFor({
			line: needle.generatedLine -
			(section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn -
			(section.generatedOffset.generatedLine === needle.generatedLine
			? section.generatedOffset.generatedColumn - 1
			: 0),
			bias: aArgs.bias
		});
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function (s) {
			return s.consumer.hasContentsOfAllSources();
		});
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor =
		function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			var content = section.consumer.sourceContentFor(aSource, true);
			if (content) {
			return content;
			}
		}
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
		function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			// Only consider this section if the requested source is in the list of
			// sources of the consumer.
			if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
			continue;
			}
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) {
			var ret = {
				line: generatedPosition.line +
				(section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column +
				(section.generatedOffset.generatedLine === generatedPosition.line
				? section.generatedOffset.generatedColumn - 1
				: 0)
			};
			return ret;
			}
		}

		return {
			line: null,
			column: null
		};
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings =
		function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
			var mapping = sectionMappings[j];

			var source = section.consumer._sources.at(mapping.source);
			if (section.consumer.sourceRoot !== null) {
				source = util.join(section.consumer.sourceRoot, source);
			}
			this._sources.add(source);
			source = this._sources.indexOf(source);

			var name = section.consumer._names.at(mapping.name);
			this._names.add(name);
			name = this._names.indexOf(name);

			// The mappings coming from the consumer for the section have
			// generated positions relative to the start of the section, so we
			// need to offset them to be relative to the start of the concatenated
			// generated file.
			var adjustedMapping = {
				source: source,
				generatedLine: mapping.generatedLine +
				(section.generatedOffset.generatedLine - 1),
				generatedColumn: mapping.generatedColumn +
				(section.generatedOffset.generatedLine === mapping.generatedLine
				? section.generatedOffset.generatedColumn - 1
				: 0),
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: name
			};

			this.__generatedMappings.push(adjustedMapping);
			if (typeof adjustedMapping.originalLine === 'number') {
				this.__originalMappings.push(adjustedMapping);
			}
			}
		}

		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
		};

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		// This function terminates when one of the following is true:
		//
		//   1. We find the exact element we are looking for.
		//
		//   2. We did not find the exact element, but we can return the index of
		//      the next-closest element.
		//
		//   3. We did not find the exact element, and there is no next-closest
		//      element than the one we are searching for, so we return -1.
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) {
		// Found the element we are looking for.
		return mid;
		}
		else if (cmp > 0) {
		// Our needle is greater than aHaystack[mid].
		if (aHigh - mid > 1) {
			// The element is in the upper half.
			return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		}

		// The exact needle element was not found in this haystack. Determine if
		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return aHigh < aHaystack.length ? aHigh : -1;
		} else {
			return mid;
		}
		}
		else {
		// Our needle is less than aHaystack[mid].
		if (mid - aLow > 1) {
			// The element is in the lower half.
			return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		}

		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return mid;
		} else {
			return aLow < 0 ? -1 : aLow;
		}
		}
	}

	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) {
		return -1;
		}

		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
									aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) {
		return -1;
		}

		// We have found either the exact element, or the next-closest element than
		// the one we are searching for. However, there may be more than one such
		// element. Make sure we always return the smallest of these.
		while (index - 1 >= 0) {
		if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			break;
		}
		--index;
		}

		return index;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}

	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		// If our lower bound is less than our upper bound, we (1) partition the
		// array into two pieces and (2) recurse on each half. If it is not, this is
		// the empty array and our base case.

		if (p < r) {
		// (1) Partitioning.
		//
		// The partitioning chooses a pivot between `p` and `r` and moves all
		// elements that are less than or equal to the pivot to the before it, and
		// all the elements that are greater than it after it. The effect is that
		// once partition is done, the pivot is in the exact place it will be when
		// the array is put in sorted order, and it will not need to be moved
		// again. This runs in O(n) time.

		// Always choose a random pivot so that an input array which is reverse
		// sorted does not cause O(n^2) running time.
		var pivotIndex = randomIntInRange(p, r);
		var i = p - 1;

		swap(ary, pivotIndex, r);
		var pivot = ary[r];

		// Immediately after `j` is incremented in this loop, the following hold
		// true:
		//
		//   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		//
		//   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		for (var j = p; j < r; j++) {
			if (comparator(ary[j], pivot) <= 0) {
			i += 1;
			swap(ary, i, j);
			}
		}

		swap(ary, i + 1, j);
		var q = i + 1;

		// (2) Recurse on each half.

		doQuickSort(ary, comparator, p, q - 1);
		doQuickSort(ary, comparator, q + 1, r);
		}
	}

	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function (ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	var util = __webpack_require__(4);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}

	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap =
		function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		// The SourceNode we want to fill with the generated code
		// and the SourceMap
		var node = new SourceNode();

		// All even indices of this array are one line of the generated code,
		// while all odd indices are the newlines between two adjacent lines
		// (since `REGEX_NEWLINE` captures its match).
		// Processed fragments are removed from this array, by calling `shiftNextLine`.
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var shiftNextLine = function() {
			var lineContents = remainingLines.shift();
			// The last line of a file might not have a newline.
			var newLine = remainingLines.shift() || "";
			return lineContents + newLine;
		};

		// We need to remember the position of "remainingLines"
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		// The generate SourceNodes we need a code range.
		// To extract it current and last mapping is used.
		// Here we store the last mapping.
		var lastMapping = null;

		aSourceMapConsumer.eachMapping(function (mapping) {
			if (lastMapping !== null) {
			// We add the code from "lastMapping" to "mapping":
			// First check if there is a new line in between.
			if (lastGeneratedLine < mapping.generatedLine) {
				// Associate first line with "lastMapping"
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
				// The remaining code is added without mapping
			} else {
				// There is no new line in between.
				// Associate the code between "lastGeneratedColumn" and
				// "mapping.generatedColumn" with "lastMapping"
				var nextLine = remainingLines[0];
				var code = nextLine.substr(0, mapping.generatedColumn -
											lastGeneratedColumn);
				remainingLines[0] = nextLine.substr(mapping.generatedColumn -
													lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				// No more remaining code, continue
				lastMapping = mapping;
				return;
			}
			}
			// We add the generated code until the first mapping
			// to the SourceNode without any mapping.
			// Each line is added as separate string.
			while (lastGeneratedLine < mapping.generatedLine) {
			node.add(shiftNextLine());
			lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
			var nextLine = remainingLines[0];
			node.add(nextLine.substr(0, mapping.generatedColumn));
			remainingLines[0] = nextLine.substr(mapping.generatedColumn);
			lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		// We have processed all mappings.
		if (remainingLines.length > 0) {
			if (lastMapping) {
			// Associate the remaining code in the current line with "lastMapping"
			addMappingWithCode(lastMapping, shiftNextLine());
			}
			// and add the remaining lines without any mapping
			node.add(remainingLines.join(""));
		}

		// Copy sourcesContent into SourceNode
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aRelativePath != null) {
				sourceFile = util.join(aRelativePath, sourceFile);
			}
			node.setSourceContent(sourceFile, content);
			}
		});

		return node;

		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === undefined) {
			node.add(code);
			} else {
			var source = aRelativePath
				? util.join(aRelativePath, mapping.source)
				: mapping.source;
			node.add(new SourceNode(mapping.originalLine,
									mapping.originalColumn,
									source,
									code,
									mapping.name));
			}
		}
		};

	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) {
		aChunk.forEach(function (chunk) {
			this.add(chunk);
		}, this);
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		if (aChunk) {
			this.children.push(aChunk);
		}
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) {
		for (var i = aChunk.length-1; i >= 0; i--) {
			this.prepend(aChunk[i]);
		}
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		this.children.unshift(aChunk);
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
		chunk = this.children[i];
		if (chunk[isSourceNode]) {
			chunk.walk(aFn);
		}
		else {
			if (chunk !== '') {
			aFn(chunk, { source: this.source,
						line: this.line,
						column: this.column,
						name: this.name });
			}
		}
		}
	};

	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
		newChildren = [];
		for (i = 0; i < len-1; i++) {
			newChildren.push(this.children[i]);
			newChildren.push(aSep);
		}
		newChildren.push(this.children[i]);
		this.children = newChildren;
		}
		return this;
	};

	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) {
		lastChild.replaceRight(aPattern, aReplacement);
		}
		else if (typeof lastChild === 'string') {
		this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		}
		else {
		this.children.push(''.replace(aPattern, aReplacement));
		}
		return this;
	};

	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent =
		function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		};

	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents =
		function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) {
			if (this.children[i][isSourceNode]) {
			this.children[i].walkSourceContents(aFn);
			}
		}

		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) {
			aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		}
		};

	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function (chunk) {
		str += chunk;
		});
		return str;
	};

	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
		code: "",
		line: 1,
		column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function (chunk, original) {
		generated.code += chunk;
		if (original.source !== null
			&& original.line !== null
			&& original.column !== null) {
			if(lastOriginalSource !== original.source
			|| lastOriginalLine !== original.line
			|| lastOriginalColumn !== original.column
			|| lastOriginalName !== original.name) {
			map.addMapping({
				source: original.source,
				original: {
				line: original.line,
				column: original.column
				},
				generated: {
				line: generated.line,
				column: generated.column
				},
				name: original.name
			});
			}
			lastOriginalSource = original.source;
			lastOriginalLine = original.line;
			lastOriginalColumn = original.column;
			lastOriginalName = original.name;
			sourceMappingActive = true;
		} else if (sourceMappingActive) {
			map.addMapping({
			generated: {
				line: generated.line,
				column: generated.column
			}
			});
			lastOriginalSource = null;
			sourceMappingActive = false;
		}
		for (var idx = 0, length = chunk.length; idx < length; idx++) {
			if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
			generated.line++;
			generated.column = 0;
			// Mappings end at eol
			if (idx + 1 === length) {
				lastOriginalSource = null;
				sourceMappingActive = false;
			} else if (sourceMappingActive) {
				map.addMapping({
				source: original.source,
				original: {
					line: original.line,
					column: original.column
				},
				generated: {
					line: generated.line,
					column: generated.column
				},
				name: original.name
				});
			}
			} else {
			generated.column++;
			}
		}
		});
		this.walkSourceContents(function (sourceFile, sourceContent) {
		map.setSourceContent(sourceFile, sourceContent);
		});

		return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ])
});
;
requireSimulator.setName('IndentBuffer');
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define(["assert","source-map"],function (A, S) {
var Pos2RC=function (src) {
	var $={};
	var map=[];
	var pos=0;
	var lastRow=0;
	src.split("\n").forEach(function (line) {
		map.push(pos);
		pos+=line.length+1;
	});
	map.push(pos);
	$.getRC=function (pos) {
		while(true) {
			if (lastRow<0) {
				return {row:1, col:1};
			}
			if (lastRow+1>=map.length) {
				return {row:map.length, col:1};
			}
			//A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
			//A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
			if (pos<map[lastRow]) {
				lastRow--;
			} else if (map[lastRow+1]<=pos) {
				lastRow++;
			} else {
				return {row:lastRow+1, col:pos-map[lastRow]+1};
			}
		}
	};
	return $;
};
return IndentBuffer=function (options) {
	options=options||{};
	var $=function () {
		var args=arguments;
		var fmt=args[0];
		//console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
		var ai=0;
		function shiftArg(nullable) {
			ai++;
			var res=args[ai];
			if (res==null && !nullable) {
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
			if (i<0) {$.print(fmt); break;}
			$.print(fmt.substring(0,i));
			i++;
			var fstr=fmt.charAt(i);
			if (fstr=="s") {
				var str=shiftArg();
				if (typeof str == "string" || typeof str =="number") {}
				else if (str==null) str="null";
				else if (str.text) {
					$.addMapping(str);
					str=str.text;
				}
				$.print(str);
				i++;
			} else if (fstr=="d") {
				var n=shiftArg();
				if (typeof n!="number") throw new Error (n+" is not a number: fmt="+fmt);
				$.print(n);
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
				$.print("%");
				i++;
			} else if (fstr=="f") {
				shiftArg()($);
				i++;
			} else if (fstr=="l") {
				var lit=shiftArg();
				$.print($.toLiteral(lit));
				i++;
			} else if (fstr=="v") {
				var a=shiftArg();
				if (!a) throw new Error ("Null %v");
				if (typeof a!="object") throw new Error("nonobject %v:"+a);
				$.addMapping(a);
				$.visitor.visit(a);
				i++;
			} else if (fstr=="z") {
				var place=shiftArg();
				if ("val" in place) {
					$.print(place.val);
					return;
				}
				if (!place.inited) {
					$.lazy(place);
				}
				place.print();
				//$.print(place.gen);
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
				shiftArg(true);
				i++;
			} else {
				i+=2;
			}
			fmt=fmt.substring(i);
		}
	};
	$.addMapping=function (token) {
		//console.log("Token",token,$.srcFile+"");
		if (!$.srcFile) return ;
		// token:extend({text:String},{pos:Number}|{row:Number,col:Number})
		var rc;
		if (typeof token.row=="number" && typeof token.col=="number") {
			rc={row:token.row, col:token.col};
		} else if (typeof token.pos=="number") {
			rc=$.srcRCM.getRC(token.pos);
		}
		if (rc) {
			//console.log("Map",{src:{file:$.srcFile+"",row:rc.row,col:rc.col},
			//dst:{row:$.bufRow,col:$.bufCol}  });
			$.srcmap.addMapping({
				generated: {
					line: $.bufRow,
					column: $.bufCol
				},
				source: $.srcFile+"",
				original: {
					line: rc.row,
					column: rc.col
				}
				//name: "christopher"
			});
		}
	};
	$.setSrcFile=function (f) {
		$.srcFile=f;
		$.srcRCM=Pos2RC(f.text());
		$.srcmap.setSourceContent(f.path(),f.text());
	};
	$.print=function (v) {
		$.buf+=v;
		var a=(v+"").split("\n");
		a.forEach(function (line,i) {
			if (i<a.length-1) {// has \n
				$.bufCol+=line.length+1;
				$.bufRow++;
				$.bufCol=1;
			} else {
				$.bufCol+=line.length;
			}
		});
	};
	$.dstFile=options.dstFile;
	$.mapFile=options.mapFile;
	$.printf=$;
	$.buf="";
	$.bufRow=1;
	$.bufCol=1;
	$.srcmap=new S.SourceMapGenerator();
	$.lazy=function (place) {
		if (!place) place={};
		if (options.fixLazyLength) {
			place.length=place.length||options.fixLazyLength;
			place.pad=place.pad||" ";
			place.gen=(function () {
				var r="";
				for(var i=0;i<place.length;i++) r+=place.pad;
				return r;
			})();
			place.puts=[];
			$.useLengthPlace=true;
		} else {
			//cannot use with sourcemap
			place.gen=("GENERETID"+Math.random()+"DITERENEG").replace(/\W/g,"");
			place.reg=new RegExp(place.gen,"g");
			A(!$.useLengthPlace,"GENERETID cannot be used");
		}
		place.inited=true;
		//place.src=place.gen;
		place.put=function (val) {
			this.val=val+"";
			if (this.puts) {
				if (this.val.length>this.length) {
					$.lazyOverflow=true;
				}
				while (this.val.length<this.length) {
					this.val+=this.pad;
				}
				var place=this;
				this.puts.forEach(function (i) {
					var pl=$.buf.length;
					$.buf=$.buf.substring(0,i)+place.val+$.buf.substring(i+place.length);
					A.eq(pl,$.buf.length);
				});
			}
			if (this.reg) {
				$.buf=$.buf.replace(this.reg, val);
			}
			return this.val;
		};
		place.print=function () {
			if (this.puts) this.puts.push($.buf.length);
			$.print(this.gen);
		};
		return place;
		//return {put: function () {} };
	};
	$.ln=function () {
		$.print("\n"+$.indentBuf);
	};
	$.indent=function () {
		$.indentBuf+=$.indentStr;
		$.print("\n"+$.indentBuf);
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
	if (typeof s!=="string") {
		console.log("no literal ",s);
		throw new Error("toLiteral:"+s+" is not a literal");
	}
		s = s.replace(/\\/g, "\\\\");
		s = s.replace(/\r/g, "\\r");
		s = s.replace(/\n/g, "\\n");
		if (quote=="'") s = s.replace(/'/g, "\\'");
		else s = s.replace(/"/g, '\\"');
		return quote + s + quote;
	};
	$.indentBuf="";
	$.indentStr="  ";
	$.close=function () {
		$.mapStr=$.srcmap.toString();
		if ($.mapFile && $.dstFile) {
			$.mapFile.text($.mapStr);
			$.printf("%n//# sourceMappingURL=%s%n",$.mapFile.relPath($.dstFile.up()));
		}
		if ($.dstFile) {
			$.dstFile.text($.buf);
		}
		return $.buf;
	};
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
		if (attrName) $.startTag("attr_"+attrName+"");
		if (node.type) {
			if (node.isToken) $.startTag("token_"+node.type+"");
			else $.startTag(node.type+"");
		}
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
		if (node.type) {
			if (node.isToken) $.endTag("token_"+node.type+"");
			else $.endTag(""+node.type+"");
		}
		if (attrName) $.endTag("attr_"+attrName);
	};
	$.orderByPos=XMLBuffer.orderByPos;
	$.src=function (str) {
		$.buf+=str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
		$.srcLen+=str.length;
	};
	$.tag=function (str) {
		$.buf+=str;
	};
	$.startTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("<"+tagName+">");
		} else {
			$.tag("<token>");
			//$.tag("<operator name=\""+tagName+"\">");
		}
	};
	$.endTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("</"+tagName+">");
		} else {
			$.tag("</token>");
			//$.tag("</operator>");
		}
	};

	$.buf="";
	$.srcLen=0;
	return $;
};
XMLBuffer.orderByPos=function (node) {
	var res=[];
	/*if (node[XMLBuffer.SUBELEMENTS]) {
		//console.log("subele",node);
		node[XMLBuffer.SUBELEMENTS].forEach(function (e,i) {
			if (e) {
				res.push({value:e});
			}
		});
	} else {*/
		for (var i in node) {
			if (!node.hasOwnProperty(i)) continue;
			if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
			if (typeof(node[i].pos)!="number") continue;
			if (isNaN(parseInt(i)) && !(i+"").match(/^-/)) {
				res.push({name: i, value: node[i]}); 
			} else {
				res.push({value: node[i]}); 
			}
		}
	//}
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
			res.isToken=true;
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
			"__typeof": true,
			"for":true,
			"else": true,
			"super": true,
			"while":true,
			"continue":true,
			"break":true,
			"do":true,
			"switch":true,
			"case":true,
			"default":true,
			"try": true,
			"catch": true,
			"finally": true,
			"throw": true,
			"of": true,
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

	var num=tk(/^[0-9][xb]?[0-9a-f\.]*/i).ret(function (n) {
		n.type="number";
		n.value=n.text-0;//parseInt(n.text);
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
		/*if (typeof WebSite=="object" && WebSite.devMode) {//DELJSL
			window.tokenStat=window.tokenStat||{};
			res.result[0].forEach(function (r) {
				window.tokenStat[ r.text ]= window.tokenStat[ r.text ] || 0;
				window.tokenStat[ r.text ]++;
			});
			//buf=""; for (var k in tokenStat) {  buf+=k+"\t"+tokenStat[k]+"\n"; }; buf;
			//console.log(res);
		}*/
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
		n.value=(n.text-0);
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
	function comLastOpt(p) {
		return p.sep0(tk(","),true).and(tk(",").opt()).ret(function (list,opt) {
			return list;
		});
	};
	var e=ExpressionParser() ;
	var arrayElem=g("arrayElem").ands(tk("["), e.lazy() , tk("]")).ret(null,"subscript");
	var argList=g("argList").ands(tk("("), comLastOpt(e.lazy()) , tk(")")).ret(null,"args");
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
	e.prefix(prio,tk("__typeof"));
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
	var forin=g("forin").ands(tk("var").opt(), symbol.sep1(tk(","),true), tk("in").or(tk("of")), expr).ret(
										"isVar", "vars","inof", "set" );
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
	var dos=g("do").ands(tk("do"), "stmt" , tk("while"), tk("("), expr, tk(")"), tk(";")).ret(null,"loop",null,null,"cond",null,null);
	var cases=g("case").ands(tk("case"),expr,tk(":"), stmt.rep0() ).ret(null, "value", null,"stmts");
	var defaults=g("default").ands(tk("default"),tk(":"), stmt.rep0() ).ret(null, null,"stmts");
	var switchs=g("switch").ands(tk("switch"), tk("("), expr, tk(")"),tk("{"), cases.rep1(), defaults.opt(), tk("}")).ret(null,null,"value",null,null,"cases","defs");
	var breaks=g("break").ands(tk("break"), tk(";")).ret("brk");
	var continues=g("continue").ands(tk("continue"), tk(";")).ret("cont");
	var fins=g("finally").ands(tk("finally"), "stmt" ).ret(null, "stmt");
	var catchs=g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt" ).ret(null,null,"name",null, "stmt");
	var catches=g("catches").ors("catch","finally");
	var trys=g("try").ands(tk("try"),"stmt",catches.rep1() ).ret(null, "stmt","catches");
	var throwSt=g("throw").ands(tk("throw"),expr,tk(";")).ret(null,"ex");
	var typeExpr=g("typeExpr").ands(symbol).ret("name");
	var typeDecl=g("typeDecl").ands(tk(":"),typeExpr).ret(null,"vtype");
	var varDecl=g("varDecl").ands(symbol, typeDecl.opt(), tk("=").and(expr).ret(retF(1)).opt() ).ret("name","typeDecl","value");
	var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
	var paramDecl= g("paramDecl").ands(symbol,typeDecl.opt() ).ret("name","typeDecl");
	var paramDecls=g("paramDecls").ands(tk("("), comLastOpt(paramDecl), tk(")")  ).ret(null, "params");
	var setterDecl= g("setterDecl").ands(tk("="), paramDecl).ret(null,"value");
	g("funcDeclHead").ands(
			tk("nowait").opt(),
			tk("function").or(tk("fiber")).or(tk("tk_constructor")).or(tk("\\")).opt(),
			symbol.or(tk("new")) , setterDecl.opt(), paramDecls.opt(),typeDecl.opt()   // if opt this it is getter
	).ret("nowait","ftype","name","setter", "params","rtype");
	var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
	var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
	var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
	//var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
	var empty=g("empty").ands(tk(";")).ret(null);
	stmt=g("stmt").ors("return", "if", "for", "while", "do","break", "continue", "switch","ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl","empty");
	// ------- end of stmts
	g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
	var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
	var jsonElem=g("jsonElem").ands(
			symbol.or(literal),
			tk(":").or(tk("=")).and(expr).ret(function (c,v) {return v;}).opt()
	).ret("key","value");
	var objlit=g("objlit").ands(tk("{"), comLastOpt( jsonElem ), tk("}")).ret(null, "elems");
	var arylit=g("arylit").ands(tk("["), comLastOpt( expr ),  tk("]")).ret(null, "elems");
	var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).
	ret(null, "superclassName");
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
	var builtins={};
	c.clear=function () {
		for (var k in c) {
			if (!builtins[k]) delete c[k];
		}
	};
	for (var k in c) { builtins[k]=true; }
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
		var res=act(c);
		for (var k in sv) {
			c[k]=sv[k];
		}
		return res;
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
			CLASS:"class", MODULE:"module"
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
	cu.extend=function (res,aobj) {
		for (var i in aobj) res[i]=aobj[i];
		return res;
	};
	cu.annotation=annotation3;
	function getSource(srcCont,node) {//B
		return srcCont.substring(node.pos,node.pos+node.len);
	}
	cu.getSource=getSource;
	cu.getField=function(klass,name){
		if (klass instanceof Function) return null;
		var res=null;
		getDependingClasses(klass).forEach(function (k) {
			if (res) return;
			res=k.decls.fields[name];
		});
		if (typeof (res.vtype)==="string") {
			res.vtype=Tonyu.classMetas[res.vtype] || window[res.vtype];
		}
		return res;
	};
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
		var res=[];
		function loop(k) {
			if (visited[k.fullName]) return;
			visited[k.fullName]=true;
			res.push(k);
			if (k.superclass) loop(k.superclass);
			if (k.includes) k.includes.forEach(loop);
		}
		loop(klass);
		return res;
	}
	cu.getDependingClasses=getDependingClasses;
	function getParams(method) {//B
		var res=[];
		if (!method.head) return res;
		if (method.head.setter) res.push(method.head.setter.value);
		var ps=method.head.params ? method.head.params.params : null;
		if (ps && !ps.forEach) throw new Error(method+" is not array ");
		if (ps) res=res.concat(ps);
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
		"context", "Visitor","Tonyu.Compiler","assert"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
		context, Visitor,cu,A) {
return cu.JSGenerator=(function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;//G
var BINDF="Tonyu.bindFunc";
var INVOKE_FUNC="Tonyu.invokeMethod";
var CALL_FUNC="Tonyu.callFunc";
var CHK_NN="Tonyu.checkNonNull";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this";//"this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var USE_STRICT='"use strict";%n';
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
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;

//-----------
function genJS(klass, env) {//B
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var buf=env.codeBuffer || IndentBuffer({fixLazyLength:6});
	buf.setSrcFile(srcFile);
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
	var genMod=env.options.compiler.genAMD;
	var doLoopCheck=!env.options.compiler.noLoopCheck;

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
		} else if (t==ST.PARAM || t==ST.LOCAL || t==ST.NATIVE || t==ST.MODULE) {
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
			if (ctx.noLastPos) return;
			buf.printf("%s%s=%s;//%s%n", (env.options.compiler.commentLastPos?"//":""),
					LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ), klass.fullName+":"+node.pos);
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
			var a=annotation(node);
			var thisForVIM=a.varInMain? THIZ+"." :"";
			if (node.value) {
				var t=(!ctx.noWait) && annotation(node).fiberCall;
				if (t) {
					A.is(ctx.pc,Number);
					buf.printf(//VDC
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{"+
						"%s%v=%s.retVal;%n",
							THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++,
							thisForVIM, node.name, TH
					);
				} else {
					buf.printf("%s%v = %v;%n", thisForVIM, node.name, node.value);
				}
			} else {
				//buf.printf("%v", node.name);
			}
		},
		varsDecl: function (node) {
			var decls=node.decls.filter(function (n) { return n.value; });
			if (decls.length>0) {
				lastPosF(node)();
				decls.forEach(function (decl) {
					buf.printf("%v",decl);
				});
			}
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
				buf.printf(//VDC
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
				var p=getClassName(klass.superclass);
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
			if (node.op.text==="__typeof") {
				var a=annotation(node.right);
				if (a.vtype) {
					buf.printf("%l",a.vtype.name||a.vtype.fullName||"No type name?");
				} else {
					buf.printf("%l","Any");
				}
				return;
			}
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
		"continue": function (node) {
			if (!ctx.noWait) {
				if (ctx.inTry && ctx.exitTryOnJump) throw TError("現実装では、tryの中にcontinue;は書けません",srcFile,node.pos);
				if ( typeof (ctx.closestCnt)=="number" ) {
					buf.printf("%s=%s; break;%n", FRMPC, ctx.closestCnt);
				} else if (ctx.closestCnt) {
					buf.printf("%s=%z; break;%n", FRMPC, ctx.closestCnt);
				} else {
					throw TError( "continue； は繰り返しの中で使います" , srcFile, node.pos);
				}
			} else {
				buf.printf("continue;%n");
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
		"switch": function (node) {
			if (!ctx.noWait) {
				var labels=node.cases.map(function (c) {
					return buf.lazy();
				});
				if (node.defs) labels.push(buf.lazy());
				buf.printf(
						"switch (%v) {%{"+
						"%f"+
						"%n%}}%n"+
						"break;%n"
						,
						node.value,
						function setpc() {
							var i=0;
							node.cases.forEach(function (c) {
								buf.printf("%}case %v:%{%s=%z;break;%n", c.value, FRMPC,labels[i]);
								i++;
							});
							if (node.defs) {
								buf.printf("%}default:%{%s=%z;break;%n", FRMPC, labels[i]);
							}
						});
				var brkpos=buf.lazy();
				ctx.enter({closestBrk:brkpos}, function () {
					var i=0;
					node.cases.forEach(function (c) {
						buf.printf(
								"%}case %f:%{"+
								"%j%n"
								,
								function () { buf.print(labels[i].put(ctx.pc++)); },
								["%n",c.stmts]);
						i++;
					});
					if (node.defs) {
						buf.printf(
								"%}case %f:%{"+
								"%j%n"
								,
								function () { buf.print(labels[i].put(ctx.pc++)); },
								["%n",node.defs.stmts]);
					}
					buf.printf("case %f:%n",
					function () { buf.print(brkpos.put(ctx.pc++)); });
				});
			} else {
				buf.printf(
						"switch (%v) {%{"+
						"%j"+
						(node.defs?"%v":"%D")+
						"%n%}}"
						,
						node.value,
						["%n",node.cases],
						node.defs
						);
			}
		},
		"case": function (node) {
			buf.printf("%}case %v:%{%j",node.value, ["%n",node.stmts]);
		},
		"default": function (node) {
			buf.printf("%}default:%{%j", ["%n",node.stmts]);
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
							enterV({closestBrk:brkpos, closestCnt:pc, exitTryOnJump:false}, node.loop),
							FRMPC, pc,
							function () { buf.print(brkpos.put(ctx.pc++)); }
				);
			} else {
				ctx.enter({noWait:true},function () {
					buf.printf("while (%v) {%{"+
						(doLoopCheck?"Tonyu.checkLoop();%n":"")+
						"%f%n"+
					"%}}", node.cond, noSurroundCompoundF(node.loop));
				});
			}
		},
		"do": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasReturn)) {
				var brkpos=buf.lazy();
				var cntpos=buf.lazy();
				var pc=ctx.pc++;
				buf.printf(
						"%}case %d:%{" +
						"%f%n" +
						"%}case %f:%{" +
						"if (%v) { %s=%s; break; }%n"+
						"%}case %f:%{",
							pc,
							enterV({closestBrk:brkpos, closestCnt:cntpos, exitTryOnJump:false}, node.loop),
							function () { buf.print(cntpos.put(ctx.pc++)); },
							node.cond, FRMPC, pc,
							function () { buf.print(brkpos.put(ctx.pc++)); }
				);
			} else {
				ctx.enter({noWait:true},function () {
					buf.printf("do {%{"+
						(doLoopCheck?"Tonyu.checkLoop();%n":"")+
						"%f%n"+
					"%}} while (%v);%n",
						noSurroundCompoundF(node.loop), node.cond );
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
								enterV({closestBrk:brkpos, closestCnt: pc, exitTryOnJump:false}, node.loop),//node.loop,
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
					var cntpos=buf.lazy();
					var pc=ctx.pc++;
					buf.printf(
							"%v%n"+
							"%}case %d:%{" +
							"if (!(%v)) { %s=%z; break; }%n" +
							"%f%n" +
							"%}case %f:%{"+
							"%v;%n" +
							"%s=%s;break;%n" +
							"%}case %f:%{",
								node.inFor.init ,
								pc,
								node.inFor.cond, FRMPC, brkpos,
								enterV({closestBrk:brkpos,closestCnt:cntpos,exitTryOnJump:false}, node.loop),//node.loop,
								function (buf) { buf.print(cntpos.put(ctx.pc++)); },
								node.inFor.next,
								FRMPC, pc,
								function (buf) { buf.print(brkpos.put(ctx.pc++)); }
					);
				} else {
					ctx.enter({noWait:true},function() {
						if (node.inFor.init.type=="varsDecl" || node.inFor.init.type=="exprstmt") {
							buf.printf(
									"%v"+
									"for (; %v ; %v) {%{"+
										(doLoopCheck?"Tonyu.checkLoop();%n":"")+
										"%v%n" +
									"%}}"
										,
									/*enterV({noLastPos:true},*/ node.inFor.init,
									node.inFor.cond, node.inFor.next,
									node.loop
								);
						} else {
							buf.printf(
									"%v%n"+
									"while(%v) {%{" +
										(doLoopCheck?"Tonyu.checkLoop();%n":"")+
										"%v%n" +
										"%v;%n" +
									"%}}",
									node.inFor.init ,
									node.inFor.cond,
										node.loop,
										node.inFor.next
								);
						}
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
				var fipos=buf.lazy(), elpos=buf.lazy();
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
		empty: function (node) {
			buf.printf(";%n");
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
			if (!klass.superclass) throw new Error(klass.fullName+"には親クラスがありません");
			if (node.name) {
				name=node.name.text;
				buf.printf("%s.prototype.%s.apply( %s, %v)",
						getClassName(klass.superclass),  name, THIZ, node.params);
			} else {
				buf.printf("%s.apply( %s, %v)",
						getClassName(klass.superclass), THIZ, node.params);
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
		throw new Error(node.type+" is not defined in visitor:compiler2");
	};
	v.cnt=0;
	function genSource() {//G
		ctx.enter({}, function () {
			if (genMod) {
				printf("define(function (require) {%{");
				var reqs={Tonyu:1};
				for (var mod in klass.decls.amds) {
					reqs[mod]=1;
				}
				if (klass.superclass) {
					var mod=klass.superclass.shortName;
					reqs[mod]=1;
				}
				(klass.includes||[]).forEach(function (klass) {
					var mod=klass.shortName;
					reqs[mod]=1;
				});
				for (var mod in klass.decls.softRefClasses) {
					reqs[mod]=1;
				}
				for (var mod in reqs) {
					printf("var %s=require('%s');%n",mod,mod);
				}
			}
			printf((genMod?"return ":"")+"Tonyu.klass.define({%{");
			printf("fullName: %l,%n", klass.fullName);
			printf("shortName: %l,%n", klass.shortName);
			printf("namespace: %l,%n", klass.namespace);
			if (klass.superclass) printf("superclass: %s,%n", getClassName(klass.superclass));
			printf("includes: [%s],%n", getClassNames(klass.includes).join(","));
			printf("methods: {%{");
			for (var name in methods) {
				if (debug) console.log("method1", name);
				var method=methods[name];
				ctx.enter({noWait:true, threadAvail:false}, function () {
					genFunc(method);
				});
				if (debug) console.log("method2", name);
				if (!method.nowait ) {
					ctx.enter({noWait:false,threadAvail:true}, function () {
						genFiber(method);
					});
				}
				if (debug) console.log("method3", name);
			}
			printf("__dummy: false%n");
			printf("%}},%n");
			printf("decls: %s%n", JSON.stringify(digestDecls(klass)));
			printf("%}});");
			if (genMod) printf("%n%}});");
			//printf("%}});%n");
		});
		//printf("Tonyu.klass.addMeta(%s,%s);%n",
		//        getClassName(klass),JSON.stringify(digestMeta(klass)));
		//if (env.options.compiler.asModule) {
		//    printf("//%}});");
		//}
	}
	function digestDecls(klass) {
		var res={methods:{},fields:{}};
		for (var i in klass.decls.methods) {
			res.methods[i]=
			{nowait:!!klass.decls.methods[i].nowait};
		}
		for (var i in klass.decls.fields) {
			var src=klass.decls.fields[i];
			var dst={};
			//console.log("digestDecls",src);
			if (src.vtype) {
			if (typeof (src.vtype)==="string") {
				dst.vtype=src.vtype;
			} else {
				dst.vtype=src.vtype.fullName || src.vtype.name;
			}
			}
			res.fields[i]=dst;
		}
		return res;
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
				USE_STRICT+
				"var %s=%s;%n"+
				"%svar %s=%s;%n"+
				"var %s=0;%n"+
				"%f%n"+
				"%f%n",
				FIBPRE, fiber.name, genFn(fiber.pos,"f_"+fiber.name), [",",[THNode].concat(fiber.params)],
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
				TH,genFn(fiber.pos,"ent_"+fiber.name),TH,
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
					USE_STRICT+
					"var %s=%s;%n"+
					"%f%n" +
					"%f" +
				"%}},%n",
				fname, genFn(func.pos,fname), [",",func.params],
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
		var finfo=annotation(node).info;// annotateSubFuncExpr(node);

		buf.printf("(function %s(%j) {%{"+
						"%f%n"+
						"%f"+
					"%}})"
				,
					finfo.name, [",", finfo.params],
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
	function genFn(pos,name) {//G
		if (!name) name=(fnSeq++)+"";
		return ("_trc_"+klass.shortName+"_"+name)
//        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
	}
	function genSubFunc(node) {//G
		var finfo=annotation(node).info;// annotateSubFuncExpr(node);
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
	if (genMod) {
		klass.src.js=klass.src.tonyu.up().rel(klass.src.tonyu.truncExt()+".js");
		klass.src.js.text(buf.buf);
	} else {
		klass.src.js=buf.buf;//G
	}
	if (debug) {
		console.log("method4", buf.buf);
		//throw "ERR";
	}
	var bufres=buf.close();
	klass.src.map=buf.mapStr;
	return bufres;
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
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;
var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1,Date:1};
//-----------
function initClassDecls(klass, env ) {//S
	var s=klass.src.tonyu; //file object
	var node;
	if (klass.node && klass.nodeTimestamp==s.lastUpdate()) {
		node=klass.node;
	}
	if (!node) {
		console.log("Parse "+s);
		node=TonyuLang.parse(s);
		klass.nodeTimestamp=s.lastUpdate();
	}
	//console.log(s+"",  !!klass.node, klass.nodeTimestamp, s.lastUpdate());
	//if (!klass.testid) klass.testid=Math.random();
	//console.log(klass.testid);
	var MAIN={name:"main",stmts:[],pos:0, isMain:true};
	// method := fiber | function
	var fields={}, methods={main: MAIN}, natives={}, amds={},softRefClasses={};
	klass.decls={fields:fields, methods:methods, natives: natives, amds:amds,
	softRefClasses:softRefClasses};
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，AMDモジュール変数
	//   extends/includes以外から参照してれるクラス の集まり．親クラスの宣言は含まない
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
		if (t=OM.match( program , {ext:{superclassName:{text:OM.N, pos:OM.P}}})) {
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
			klass.superclass={name:"Array",fullName:"Array",builtin:true};
		} else if (spcn) {
			var spc=env.classes[env.aliases[spcn] || spcn];/*ENVC*/  //CFN env.classes[env.aliases[spcn]]
			if (!spc) {
				throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
			}
			klass.superclass=spc;
		} else {
			delete klass.superclass;
		}
		program.stmts.forEach(function (stmt) {
			if (stmt.type=="funcDecl") {
				var head=stmt.head;
				var ftype="function";
				if (head.ftype) {
					ftype=head.ftype.text;
					//console.log("head.ftype:",stmt);
				}
				var name=head.name.text;
				var propHead=(head.params ? "" : head.setter ? "__setter__" : "__getter__");
				name=propHead+name;
				methods[name]={
						nowait: (!!head.nowait || propHead!==""),
						ftype:  ftype,
						name:  name,
						klass: klass.fullName,
						head:  head,
						pos: head.pos,
						stmts: stmt.body.stmts,
						node: stmt
				};
				//annotation(stmt,methods[name]);
				//annotation(stmt,{finfo:methods[name]});
			} else if (stmt.type=="nativeDecl") {
				natives[stmt.name.text]=stmt;
			} else {
				if (stmt.type=="varsDecl") {
					stmt.decls.forEach(function (d) {
						//console.log("varDecl", d.name.text);
						//fields[d.name.text]=d;
						fields[d.name.text]={
							node:d,
							klass:klass.fullName,
							name:d.name.text,
							pos:d.pos
						};
					});
				}
				MAIN.stmts.push(stmt);
			}
		});
	}
	initMethods(node);        // node=program
}// of initClassDecls
function annotateSource2(klass, env) {//B
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var OM=ObjectMatcher;
	var traceTbl=env.traceTbl;
	// method := fiber | function
	var decls=klass.decls;
	var fields=decls.fields,
		methods=decls.methods,
		natives=decls.natives,
		amds=decls.amds;
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，モジュール変数の集まり．親クラスの宣言は含まない
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
	// These has same value but different purposes:
	//  myMethodCallTmpl: avoid using bounded field for normal method(); call
	//  fiberCallTmpl: detect fiber call
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
		var i;
		for (i in decls.fields) {
			var info=decls.fields[i];
			s[i]=genSt(ST.FIELD,{klass:klass.fullName,name:i,info:info});
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
		for (i in decls.methods) {
			var info=decls.methods[i];
			s[i]=genSt(ST.METHOD,{klass:klass.fullName,name:i,info:info});
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
	}
	function initTopLevelScope() {//S
		var s=topLevelScope;
		getDependingClasses(klass).forEach(initTopLevelScope2);
		var decls=klass.decls;// Do not inherit parents' natives
		for (var i in decls.natives) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in JSNATIVES) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in env.aliases) {/*ENVC*/ //CFN  env.classes->env.aliases
			var fullName=env.aliases[i];
			s[i]=genSt(ST.CLASS,{name:i,fullName:fullName,info:env.classes[fullName]});
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
			if (env.amdPaths && env.amdPaths[n]) {
				t=ST.MODULE;
				klass.decls.amds[n]=env.amdPaths[n];
				//console.log(n,"is module");
			} else {
				var isg=n.match(/^\$/);
				t=isg?ST.GLOBAL:ST.FIELD;
			}
			var opt={name:n};
			if (t==ST.FIELD) {
				opt.klass=klass.name;
				klass.decls.fields[n]=klass.decls.fields[n]||{};
				cu.extend(klass.decls.fields[n],{
					klass:klass.fullName,
					name:n
				});//si;
			}
			si=topLevelScope[n]=genSt(t,opt);
		}
		if (t==ST.CLASS) {
			klass.decls.softRefClasses[n]=si;
		}
		return si;
	}
	var localsCollector=Visitor({
		varDecl: function (node) {
			if (ctx.isMain) {
				annotation(node,{varInMain:true});
				annotation(node,{declaringClass:klass});
				//console.log("var in main",node.name.text);
			} else {
				ctx.locals.varDecls[node.name.text]=node;
				//console.log("DeclaringFunc of ",node.name.text,ctx.finfo);
				annotation(node,{declaringFunc:ctx.finfo});
			}
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
			var t=stype(si);
			annotation(node,{scopeInfo:si});
		},
		funcDecl: function (node) {/*FDITSELFIGNORE*/
		},
		funcExpr: function (node) {/*FEIGNORE*/
			annotateSubFuncExpr(node);
		},
		objlit:function (node) {
			var t=this;
			var dup={};
			node.elems.forEach(function (e) {
				var kn;
				if (e.key.type=="literal") {
					kn=e.key.text.substring(1,e.key.text.length-1);
				} else {
					kn=e.key.text;
				}
				if (dup[kn]) {
					throw TError( "オブジェクトリテラルのキー名'"+kn+"'が重複しています" , srcFile, e.pos);
				}
				dup[kn]=1;
				//console.log("objlit",e.key.text);
				t.visit(e);
			});
		},
		jsonElem: function (node) {
			if (node.value) {
				this.visit(node.value);
			} else {
				if (node.key.type=="literal") {
					throw TError( "オブジェクトリテラルのパラメタに単独の文字列は使えません" , srcFile, node.pos);
				}
				var si=getScopeInfo(node.key.text);
				annotation(node,{scopeInfo:si});
			}
		},
		"do": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
		},
		"switch": function (node) {
			var t=this;
			ctx.enter({brkable:true}, function () {
				t.def(node);
			});
		},
		"while": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
			fiberCallRequired(this.path);//option
		},
		"for": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
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
			if (!ctx.brkable) throw TError( "break； は繰り返しまたはswitch文の中で使います." , srcFile, node.pos);
			if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
		},
		"continue": function (node) {
			if (!ctx.contable) throw TError( "continue； は繰り返しの中で使います." , srcFile, node.pos);
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
					t.superclass=klass.superclass;
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
					t.superclass=klass.superclass;
					annotation(node, {fiberCall:t});
					fiberCallRequired(this.path);
				}
			}
			this.visit(node.expr);
		},
		varDecl: function (node) {
			var t;
			if (!ctx.noWait &&
					(t=OM.match(node.value,fiberCallTmpl)) &&
					stype(ctx.scope[t.N])==ST.METHOD &&
					!getMethod(t.N).nowait) {
				t.type="varDecl";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			}
			this.visit(node.value);
			this.visit(node.typeDecl);
		},
		typeExpr: function (node) {
			resolveType(node);
		}
	});
	function resolveType(node) {//node:typeExpr
		var name=node.name+"";
		var si=getScopeInfo(name);
		var t=stype(si);
		console.log("TExpr",name,si,t);
		if (t===ST.NATIVE) {
			annotation(node, {resolvedType: si.value});
		} else if (t===ST.CLASS){
			annotation(node, {resolvedType: si.info});
		}
	}
	varAccessesAnnotator.def=visitSub;//S
	function annotateVarAccesses(node,scope) {//S
		ctx.enter({scope:scope}, function () {
			varAccessesAnnotator.visit(node);
		});
	}
	function copyLocals(finfo, scope) {//S
		var locals=finfo.locals;
		for (var i in locals.varDecls) {
			//console.log("LocalVar ",i,"declared by ",finfo);
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.varDecls[i],{scopeInfo:si});
		}
		for (var i in locals.subFuncDecls) {
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.subFuncDecls[i],{scopeInfo:si});
		}
	}
	function resolveTypesOfParams(params) {
		params.forEach(function (param) {
			if (param.typeDecl) {
			console.log("restype",param);
			resolveType(param.typeDecl.vtype);
			}
		});
	}
	function initParamsLocals(f) {//S
		//console.log("IS_MAIN", f.name, f.isMain);
		ctx.enter({isMain:f.isMain,finfo:f}, function () {
			f.locals=collectLocals(f.stmts);
			f.params=getParams(f);
		});
		resolveTypesOfParams(f.params);
	}
	function annotateSubFuncExpr(node) {// annotateSubFunc or FuncExpr
		var m,ps;
		var body=node.body;
		var name=(node.head.name ? node.head.name.text : "anonymous_"+node.pos );
		if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
			ps=m.P;
		} else {
			ps=[];
		}
		var finfo={};
		var ns=newScope(ctx.scope);
		//var locals;
		ctx.enter({finfo: finfo}, function () {
			ps.forEach(function (p) {
				var si=genSt(ST.PARAM,{declaringFunc:finfo});
				annotation(p,{scopeInfo:si});
				ns[p.name.text]=si;
			});
			finfo.locals=collectLocals(body);
			copyLocals(finfo, ns);
			annotateVarAccesses(body,ns);
		});
		finfo.scope=ns;
		finfo.name=name;
		finfo.params=ps;
		//var res={scope:ns, locals:finfo.locals, name:name, params:ps};
		resolveTypesOfParams(finfo.params);
		//annotation(node,res);
		annotation(node,{info:finfo});
		annotateSubFuncExprs(finfo.locals, ns);
		return finfo;
	}
	function annotateSubFuncExprs(locals, scope) {//S
		ctx.enter({scope:scope}, function () {
			for (var n in locals.subFuncDecls) {
				annotateSubFuncExpr(locals.subFuncDecls[n]);
			}
		});
	}
	function annotateMethodFiber(f) {//S
		//f:info  (of method)
		var ns=newScope(ctx.scope);
		f.params.forEach(function (p,cnt) {
			var si=genSt(ST.PARAM,{
				klass:klass.name, name:f.name, no:cnt, declaringFunc:f
			});
			ns[p.name.text]=si;
			annotation(p,{scopeInfo:si,declaringFunc:f});
		});
		copyLocals(f, ns);
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
				initParamsLocals(method);//MAINVAR
				annotateMethodFiber(method);
			}
		});
	}
	initTopLevelScope();//S
	inheritSuperMethod();//S
	annotateSource();
}//B  end of annotateSource2
return {initClassDecls:initClassDecls, annotate:annotateSource2};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});

requireSimulator.setName('StackTrace');
define([],function (){
	var trc={};
	var pat=/(_trc_[A-Za-z0-9_]*).*[^0-9]([0-9]+):([0-9]+)[\s\)]*\r?$/;
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
	trc.get=function (e) {
		var s=e.stack;
		if (typeof s!="string") return false;
		var lines=s.split(/\n/);
		var res=[];
		for (var i=0 ; i<lines.length; i++) {
			var p=pat.exec(lines[i]);
			if (!p) continue;
			//var id=p[1];
			var fname=p[1];
			var row=p[2];
			var col=p[3];
			res.push({fname:fname, row:row,col:col});
			//var tri=ttb.decode(id);
			/*if (tri && tri.klass) {
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
			}*/
		}
		/*$lastStackTrace=res;
		$showLastStackTrace=function () {
			console.log("StackTrace.get",res);
			//console.log("StackTrace.get",lines,res);
		};*/
		console.log("StackTrace.get",res);
		return res;
	};


	return trc;
});
requireSimulator.setName('Tonyu.TraceTbl');
define(["Tonyu", "FS", "TError","StackTrace"],
function(Tonyu, FS, TError,trc) {
return Tonyu.TraceTbl=(function () {
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
	var srcMap={};
	TTB.decodeOLD=function (id) {
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
	TTB.srcMap=srcMap;
	TTB.decode=function (id) {
		var pat=new RegExp("LASTPOS="+id+";//(.*)\r?\n");
		console.log("pat=",pat);
		for (var k in srcMap) {
			var r=pat.exec( srcMap[k] );
			if (r) {
				// user.Main:335
				//alert(r[1]);
				return r[1];
			} else {
				console.log("pat=",pat,"Not found in ",k);

			}
		}
	};
	TTB.find=function (e) {
		var trcs=trc.get(e);
		var trc1=trcs[0];
		if (!trc1) return null;
		var pat=new RegExp("LASTPOS=[0-9]+;//(.*)\r?");
		for (var k in srcMap) {
			console.log("Finding ", trc1.fname, " in ",k);
			var r=srcMap[k].indexOf(trc1.fname);
			if (r>=0) {
				console.log("fname found at ",r);
				var slines=srcMap[k].split(/\n/);
				var sid=null;
				var row=trc1.row-1;
				console.log("Scan from row=",row);
				for (var j=row ; j>=0 ; j--) {
					console.log("row ",j, slines[j]);
					if (slines[j]==null) break;
					var lp=pat.exec(slines[j]);
					if (lp) return lp[1];
				}
				console.log("Not found LASTPOS pat");
			} else {
				console.log("Not found in ",k);
			}
		}
	};

	TTB.addSource=function (key,src) {
		srcMap[key]=src;
	};
	return TTB;
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
});
requireSimulator.setName('WebSite');
define(["FS"], function (FS) {
	var P=FS.PathUtil;
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
	} else if (
		loc.match(/bitarrow/) ||
		loc.match(/localhost.*pub/))  {
		WebSite={};
		var WS=WebSite;
		WebSite.serverType="BA";
		WS.runtime="../../../runtime/";
		WS.urlAliases= {
				"images/base.png":WS.runtime+"images/base.png",
				"images/Sample.png":WS.runtime+"images/Sample.png",
				"images/neko.png":WS.runtime+"images/neko.png",
				"images/inputPad.png":WS.runtime+"images/inputPad.png",
				"images/mapchip.png":WS.runtime+"images/mapchip.png",
				"images/sound.png":WS.runtime+"images/sound.png",
				"images/sound_ogg.png":WS.runtime+"images/sound_ogg.png",
				"images/sound_mp3.png":WS.runtime+"images/sound_mp3.png",
				"images/sound_mp4.png":WS.runtime+"images/sound_mp4.png",
				"images/sound_m4a.png":WS.runtime+"images/sound_m4a.png",
				"images/sound_mid.png":WS.runtime+"images/sound_mid.png",
				"images/sound_wav.png":WS.runtime+"images/sound_wav.png",
				"images/ecl.png":WS.runtime+"images/ecl.png"
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
	WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
	WebSite.mp3Disabled=WebSite.isNW;
	WebSite.tonyuHome="/Tonyu/";
	WebSite.url={
		getDirInfo:WebSite.serverTop+"/getDirInfo",
		getFiles:WebSite.serverTop+"/File2LSSync",
		putFiles:WebSite.serverTop+"/LS2FileSync"
	};
	if (WebSite.isNW) {
		WebSite.cwd=P.directorify(process.cwd().replace(/\\/g,"/"));
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
	} else if (WebSite.serverType==="BA") {
		WebSite.compiledKernel=WebSite.runtime+"lib/tonyu/kernel.js";
	} else {
		WebSite.compiledKernel="http://tonyuexe.appspot.com/Kernel/js/concat.js";
	}
	FS.setEnvProvider(new FS.Env(WebSite));
	return window.WebSite=WebSite;
});

requireSimulator.setName('compiledProject');
define(["DeferredUtil","WebSite","assert"], function (DU,WebSite,A) {
	var CPR=function (ns, url) {
		A.is(arguments,[String,String]);
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
				console.log("Loading compiled classes ns=",ns,"url=",url);
				var src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
				var t=this;
				return this.loadDependingClasses(ctx).then(function () {
					return t.requirejs(src);
				}).then(function () {
					console.log("Done Loading compiled classes ns=",ns,"url=",src,Tonyu.classes);
				});
			},
			requirejs: function (src) {
				return DU.promise(function (s) {
					var head = document.getElementsByTagName("head")[0] || document.documentElement;
					var script = document.createElement("script");
					script.src = src;
					var done = false;
					script.onload = script.onreadystatechange = function() {
						if ( !done && (!this.readyState ||
								this.readyState === "loaded" || this.readyState === "complete") ) {
							done = true;
							console.log("Done load ",src);
							script.onload = script.onreadystatechange = null;
							if ( head && script.parentNode ) {
								head.removeChild( script );
							}
							s();
						}
					};
					head.insertBefore( script, head.firstChild );
				});
			},
			loadClassesOLD: function (ctx) {
				console.log("Load compiled classes ns=",ns,"url=",url);
				var d=new $.Deferred;
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var script = document.createElement("script");
				script.src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
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

requireSimulator.setName('TypeChecker');
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define(["Visitor","Tonyu.Compiler","context"],function (Visitor,cu,context) {
	var ex={"[SUBELEMENTS]":1,pos:1,len:1};
	var ScopeTypes=cu.ScopeTypes;
	var genSt=cu.newScopeType;
	var stype=cu.getScopeType;
	var newScope=cu.newScope;
	//var nc=cu.nullCheck;
	var genSym=cu.genSym;
	var annotation3=cu.annotation;
	var getMethod2=cu.getMethod;
	var getDependingClasses=cu.getDependingClasses;
	var getParams=cu.getParams;
	var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
var TypeChecker={};
function visitSub(node) {//S
	var t=this;
	if (!node || typeof node!="object") return;
	//console.log("TCV",node.type,node);
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

TypeChecker.checkTypeDecl=function (klass,env) {
	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	var typeDeclVisitor=Visitor({
		varDecl: function (node) {
			//console.log("TCV","varDecl",node);
			if (node.value) this.visit(node.value);
			if (node.name && node.typeDecl) {
				var va=annotation(node.typeDecl.vtype);
				console.log("var typeis",node.name+"", node.typeDecl.vtype, va.resolvedType);
				var a=annotation(node);
				var si=a.scopeInfo;// for local
				var info=a.info;// for field
				if (si) {
					console.log("set var type",node.name+"", va.resolvedType );
					si.vtype=va.resolvedType;
				} else if (info) {
					console.log("set fld type",node.name+"", va.resolvedType );
					info.vtype=va.resolvedType;
				}
				/*} else if (a.declaringClass) {
					//console.log("set fld type",a.declaringClass,a.declaringClass.decls.fields[node.name+""],node.name+"", node.typeDecl.vtype+"");
					a.declaringClass.decls.fields[node.name+""].vtype=node.typeDecl.vtype;
				}*/
			}
		},
		paramDecl: function (node) {
			if (node.name && node.typeDecl) {
				console.log("param typeis",node.name+"", node.typeDecl.vtype+"");
				var va=annotation(node.typeDecl.vtype);
				var a=annotation(node);
				var si=a.scopeInfo;
				if (si && va.resolvedType) {
					console.log("set param type",node.name+"", node.typeDecl.vtype+"");
					si.vtype=va.resolvedType;
				}
			}
		},
		funcDecl: function (node) {
			//console.log("Visit funcDecl",node);
			var head=node.head;
			var finfo=annotation(node).info;
			if (head.rtype) {
				console.log("ret typeis",head.name+"", head.rtype.vtype+"");
				finfo.rtype=head.rtype.vtype;
			}
			this.visit(head);
			this.visit(node.body);
		}
	});
	typeDeclVisitor.def=visitSub;//S
	typeDeclVisitor.visit(klass.node);
};
TypeChecker.checkExpr=function (klass,env) {
		function annotation(node, aobj) {//B
			return annotation3(klass.annotation,node,aobj);
		}
		var typeAnnotationVisitor=Visitor({
			number: function (node) {
				annotation(node,{vtype:Number});
			},
			literal: function (node) {
				annotation(node,{vtype:String});
			},
			postfix:function (node) {
			var a=annotation(node);
			if (a.memberAccess) {
				var m=a.memberAccess;
				var vtype=visitExpr(m.target);
				if (vtype) {
				var f=cu.getField(vtype,m.name);
				console.log("GETF",vtype,m.name,f);
				if (f && f.vtype) {
					annotation(node,{vtype:f.vtype});
				}
				}
			} else {
				this.visit(node.left);
				this.visit(node.op);
			}
			},
			varAccess: function (node) {
				var a=annotation(node);
				var si=a.scopeInfo;
				if (si) {
					if (si.vtype) {
						console.log("VA typeof",node.name+":",si.vtype);
						annotation(node,{vtype:si.vtype});
					} else if (si.type===ScopeTypes.FIELD) {
						var fld;
						fld=klass.decls.fields[node.name+""];
						if (!fld) {
							// because parent field does not contain...
							console.log("TC Warning: fld not found",klass,node.name+"");
							return;
						}
						var vtype=fld.vtype;
						if (!vtype) {
							console.log("VA vtype not found",node.name+":",fld);
						} else {
							annotation(node,{vtype:vtype});
							console.log("VA typeof",node.name+":",vtype);
						}
					}
				}
			}
		});

	var ctx=context();
	typeAnnotationVisitor.def=visitSub;
	typeAnnotationVisitor.visit(klass.node);
	function visitExpr(node) {
		typeAnnotationVisitor.visit(node);
		var va=annotation(node);
		return va.vtype;
	}
};
return TypeChecker;
});

requireSimulator.setName('ProjectCompiler');
define(["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics",
		"Tonyu.TraceTbl","FS","assert","DeferredUtil","compiledProject",
		"source-map","TypeChecker"],
		function (Tonyu,JSGenerator,Semantics,
				ttb,FS,A,DU,CPR,
				S,TypeChecker) {
var TPRC=function (dir) {
	A(FS.isFile(dir) && dir.isDir(), "projectCompiler: "+dir+" is not dir obj");
	var TPR={env:{}};
	var traceTbl=Tonyu.TraceTbl;//();
	var F=DU.throwF;
	TPR.env.traceTbl=traceTbl;
	TPR.EXT=".tonyu";
	TPR.getDir=function () {return dir;};
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
	TPR.getEXT=function(){
		var opt=TPR.getOptions();
		if(!opt.language || opt.language=="js") TPR.EXT=".tonyu";
		else TPR.EXT="."+opt.language;
		return TPR.EXT;
	};
	TPR.setOptions=function (opt) {
		TPR.getOptionsFile().obj(opt);
	}; // ADDJSL
	TPR.fixOptions=function (opt) {
		if (!opt.compiler) opt.compiler={};
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
		if (outLast<Tonyu.VERSION) {
			console.log("Should compile: ", outF.name()+" last="+new Date(outLast)+" < Tonyu.ver="+new Date(Tonyu.VERSION));
			return true;
		}
		//console.log("Outf last="+new Date(outLast));
		var sf=TPR.sourceFiles(TPR.getNamespace());
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
	TPR.getClassName=function (file) {//ADDJSL
		A(FS.isFile(file));
		if (dir.contains(file)) {
			return TPR.getNamespace()+"."+file.truncExt(TPR.EXT);
		}
		var res;
		TPR.getDependingProjects().forEach(function (dp) {
			if (!res) res=dp.getClassName(file);
		});
		return res;
	};
	TPR.getName=function () { return dir.name().replace(/\/$/,""); };
	TPR.getNamespace=function () {
		var opt=TPR.getOptions();
		return A(opt.compiler.namespace,"namespace not specified opt="+JSON.stringify(opt));
	};
	TPR.getPublishedURL=function () {//ADDBA
		if (TPR._publishedURL) return TPR._publishedURL;
		return DU.requirejs(["Auth"]).then(function (Auth) {
			return Auth.publishedURL(TPR.getName()+"/");
		}).then(function (r) {
			TPR._publishedURL=r;
			return r;
		});
	};
	TPR.getOutputFile=function (lang) {
		var opt=TPR.getOptions();
		var outF=TPR.resolve(A(opt.compiler.outputFile,"outputFile should be specified in options"));
		if (outF.isDir()) {
			throw new Error("out: directory style not supported");
		}
		return outF;
	};
	TPR.loadDependingClasses=function (ctx) {
		var task=DU.directPromise();
		var myNsp=TPR.getNamespace();
		TPR.getDependingProjects().forEach(function (p) {
			if (p.getNamespace()==myNsp) return;
			task=task.then(function () {
				return p.loadClasses(ctx);
			});
		});
		return task;
	};
	// Difference of ctx and env:  env is of THIS project. ctx is of cross-project
	TPR.loadClasses=function (ctx/*or options(For external call)*/) {
		Tonyu.runMode=false;
		TPR.showProgress("LoadClasses: "+dir.name());
		console.log("LoadClasses: "+dir.path());
		ctx=initCtx(ctx);
		var visited=ctx.visited||{};
		if (visited[TPR.path()]) return DU.directPromise();
		visited[TPR.path()]=true;
		return TPR.loadDependingClasses(ctx).then(function () {
			return TPR.shouldCompile();
		}).then(function (sc) {
			if (sc) {
				return TPR.compile(ctx);
			} else {
				var outF=TPR.getOutputFile("js");
				TPR.showProgress("Eval "+outF.name());
				return evalFile(outF);//.then(F(copyToClasses));
			}
		});
	};
	function initCtx(ctx) {
		//どうしてclassMetasとclassesをわけるのか？
		// metaはFunctionより先に作られるから
		var env=TPR.env;
		if (!ctx) ctx={};
		if (!ctx.visited) {
			ctx={visited:{}, classes:(env.classes=env.classes||Tonyu.classMetas),options:ctx};
		}
		return ctx;
	}
	TPR.compile=function (ctx/*or options(For external call)*/) {
		Tonyu.runMode=false;
		TPR.showProgress("Compile: "+dir.name());
		console.log("Compile: "+dir.path());
		ctx=initCtx(ctx);
		var myNsp=TPR.getNamespace();
		var baseClasses,ctxOpt,env,myClasses,fileAddedOrRemoved,sf,ord;
		var compilingClasses;
		return TPR.loadDependingClasses(ctx).then(F(function () {
			baseClasses=ctx.classes;
			ctxOpt=ctx.options;
			env=TPR.env;
			env.aliases={};
			env.parsedNode=env.parsedNode||{};
			env.classes=baseClasses;
			for (var n in baseClasses) {
				var cl=baseClasses[n];
				env.aliases[ cl.shortName] = cl.fullName;
			}
			return TPR.showProgress("scan sources");
		})).then(F(function () {
			myClasses={};
			fileAddedOrRemoved=!!ctxOpt.noIncremental;
			sf=TPR.sourceFiles(myNsp);
			for (var shortCn in sf) {
				var f=sf[shortCn];
				var fullCn=myNsp+"."+shortCn;
				if (!baseClasses[fullCn]) {
					console.log("Class",fullCn,"is added.");
					fileAddedOrRemoved=true;
				}
				var m=Tonyu.klass.getMeta(fullCn);
				myClasses[fullCn]=baseClasses[fullCn]=m;
				Tonyu.extend(m,{
					fullName:  fullCn,
					shortName: shortCn,
					namespace: myNsp
				});
				m.src=m.src||{};
				m.src.tonyu=f;
				env.aliases[shortCn]=fullCn;
			}
			return TPR.showProgress("update check");
		})).then(F(function () {
			for (var n in baseClasses) {
				if (myClasses[n] && myClasses[n].src && !myClasses[n].src.js) {
					//前回コンパイルエラーだとここにくるかも
					console.log("Class",n,"has no js src");
					fileAddedOrRemoved=true;
				}
				if (!myClasses[n] && baseClasses[n].namespace==myNsp) {
					console.log("Class",n,"is removed");
					Tonyu.klass.removeMeta(n);
					fileAddedOrRemoved=true;
				}
			}
			if (!fileAddedOrRemoved) {
				compilingClasses={};
				for (var n in myClasses) {
					if (Tonyu.klass.shouldCompile(myClasses[n])) {
						compilingClasses[n]=myClasses[n];
					}
				}
			} else {
				compilingClasses=myClasses;
			}
			return TPR.showProgress("initClassDecl");
		})).then(F(function () {
			for (var n in compilingClasses) {
				console.log("initClassDecl: "+n);
				Semantics.initClassDecls(compilingClasses[n], env);/*ENVC*/
			}
			return TPR.showProgress("order");
		})).then(F(function () {
			ord=orderByInheritance(myClasses);/*ENVC*/
			ord.forEach(function (c) {
				if (compilingClasses[c.fullName]) {
					console.log("annotate :"+c.fullName);
					Semantics.annotate(c, env);
				}
			});
			try {
				/*for (var n in compilingClasses) {
					TypeChecker.checkTypeDecl(compilingClasses[n],env);
				}
				for (var n in compilingClasses) {
					TypeChecker.checkExpr(compilingClasses[n],env);
				}*/
			} catch(e) {
				console.log("Error in Typecheck(It doesnt matter because Experimental)",e.stack);
			}
			return TPR.showProgress("genJS");
		})).then(F(function () {
			//throw "test break";
			return TPR.genJS(ord.filter(function (c) {
				return compilingClasses[c.fullName];
			}));
			//return TPR.showProgress("concat");
		})).then(F(function () {
			var copt=TPR.getOptions().compiler;
			if (!copt.genAMD) {
				return TPR.concatJS(ord);
			}
		}));
	};
	TPR.genJS=function (ord) {
		// 途中でコンパイルエラーを起こすと。。。
		var env=TPR.env;
		return DU.each(ord,function (c) {
			console.log("genJS :"+c.fullName);
			JSGenerator.genJS(c, env);
			return TPR.showProgress("genJS :"+c.fullName);
		});
	};
	TPR.concatJS=function (ord) {
		//var cbuf="";
		var outf=TPR.getOutputFile();
		TPR.showProgress("generate :"+outf.name());
		console.log("generate :"+outf);
		var mapNode=new S.SourceNode(null,null,outf.path());
		ord.forEach(function (c) {
			var cbuf2,fn=null;
			if (typeof (c.src.js)=="string") {
				cbuf2=c.src.js+"\n";
			} else if (FS.isFile(c.src.js)) {
				fn=c.src.js.path();
				cbuf2=c.src.js.text()+"\n";
			} else {
				throw new Error("Src for "+c.fullName+" not generated ");
			}
			var snd;
			if (c.src.map) {
				snd=S.SourceNode.fromStringWithSourceMap(cbuf2,new S.SourceMapConsumer(c.src.map));
			} else {
				snd=new S.SourceNode(null,null,fn,cbuf2);
			}
			mapNode.add(snd);
		});
		var mapFile=outf.sibling(outf.name()+".map");
		var gc=mapNode.toStringWithSourceMap();
		outf.text(gc.code+"\n//# sourceMappingURL="+mapFile.name());
		mapFile.text(gc.map+"");
		return evalFile(outf);
	};
	TPR.getDependingProjects=function () {
		var opt=TPR.getOptions();
		var dp=opt.compiler.dependingProjects || [];
		return dp.map(function (dprj) {
			if (typeof dprj=="string") {
				var prjDir=TPR.resolve(dprj);
				return TPRC(prjDir);
			} else if (typeof dprj=="object") {
				return CPR(dprj.namespace, FS.expandPath(dprj.compiledURL) );
			}
		});
	};
	TPR.dir=dir;
	TPR.path=function () {return dir.path();};
	TPR.sourceFiles=function (nsp) {// nsp==null => all
		//nsp=nsp || TPR.getNamespace();//DELJSL
		var dirs=TPR.sourceDirs(nsp);// ADDJSL
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
	TPR.sourceDir=function () {
		return dir;
	};
	TPR.sourceDirs=function (myNsp) {//ADDJSL  myNsp==null => All
		var dp=TPR.getDependingProjects();
		//var myNsp||TPR.getNamespace();//DELJSL
		var dirs=[dir];
		dp.forEach(function (dprj) {
			var nsp=dprj.getNamespace();
			if (!myNsp || nsp==myNsp) {
				var d=dprj.sourceDir();
				if (d) dirs.push(d);
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
			var spc=c.superclass;
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
		console.log("evalFile: "+f.path());
		var lastEvaled=new Function(f.text());
		traceTbl.addSource(f.path(),lastEvaled+"");
		return DU.directPromise( lastEvaled() );
	}
	TPR.decodeTrace=function (desc) { // user.Test:123
		var a=desc.split(":");
		var cl=a[0],pos=parseInt(a[1]);
		var cls=cl.split(".");
		var sn=cls.pop();
		var nsp=cls.join(".");
		if (nsp==TPR.getNamespace()) {
			var sf=TPR.sourceFiles(nsp);
			for (var i in sf) {
				if (sn==i) {
					return TError("Trace info", sf[i], pos);
				}
			}
		}
	};
	TPR.showProgress=function (m) {
	};
	TPR.setAMDPaths=function (paths) {
		TPR.env.amdPaths=paths;
	};
	TPR.genXML=function (cname) {//"user.Main"
		requirejs(["XMLBuffer"],function (x) {
			var c=TPR.env.classes[cname];
			if (!c) throw new Error("Class "+cname+" not found");
			if (!c.node) throw new Error("Node not found compile it");
			var b=x(c.src.tonyu.text());
			b(c.node);
			console.log(b.buf);
		});
	};
	return TPR;
}
if (typeof sh=="object") {
	sh.tonyuc=function (dir) {
		var pr=TPRC(sh.resolve(dir));
		return pr.compile();
	};
}
return TPRC;
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

requireSimulator.setName('Assets');
define(["WebSite","Util","Tonyu","FS"],function (WebSite,Util,Tonyu,FS) {
    var Assets={};
    Assets.resolve=function (url, prj, options) {
        options=options||{};
        var baseDir=FS.isFile(prj)?prj:prj.getDir();
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
            if (options.asFile) return f;
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
            url=Assets.resolve(url,options.prj||options.baseDir);
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
	/*IL.convURL=function (url, prj) {

	    return Assets.resolve(url, prj);
	};*/
	window.ImageList=IL;
    return IL;
});

requireSimulator.setName('Auth');
define(["WebSite"],function (WebSite) {
    var auth={};
    auth.currentUser=function (onend) {
        //TODO: urlchange!
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
            //TODO: urlchange!
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
      //TODO: urlchange!
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
                url: WebSite.serverTop+"/uploadBlobToExe",   //TODO: urlchange!
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
requireSimulator.setName('Content');
define(["FS"],function (FS){return FS.Content;});

requireSimulator.setName('thumbnail');
define(["ImageRect","Content"],function (IR,Content) {
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
            var rsrc=prj.getResource();
            var prjdir=prj.getDir();
            var imfile=TN.file(prj);
            imfile.text( url );
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
            console.log(e.stack);
        }
    };
    return TN;
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
requireSimulator.setName('Tonyu.Project');
define(["Tonyu", "ProjectCompiler", "TError", "FS", "Tonyu.TraceTbl","ImageList","StackTrace",
        "Blob","thumbnail","WebSite","plugins", "Tonyu.Compiler.Semantics", "Tonyu.Compiler.JSGenerator",
        "DeferredUtil","compiledProject"],
        function (Tonyu, ProjectCompiler, TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                Blob,thumbnail,WebSite,plugins, Semantics, JSGenerator,
                DU,CPRJ) {
return Tonyu.Project=function (dir, kernelDir) {
    var TPR=ProjectCompiler(dir);
    var _super=Tonyu.extend({},TPR);
    var home=FS.get(WebSite.tonyuHome);
    TPR.EXT=".tonyu";
    TPR.NSP_KER="kernel";
    TPR.NSP_USR="user";
    var kernelProject;
    if (!kernelDir) {
        kernelProject=CPRJ(TPR.NSP_KER, WebSite.compiledKernel);
        //kernelDir=home.rel("Kernel/");
    } else {
        kernelProject=ProjectCompiler(kernelDir);
    }
    var traceTbl=Tonyu.TraceTbl;//();
    var env={classes:Tonyu.classMetas, traceTbl:traceTbl, options:{compiler:{}} };
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
                var spc=c.superclass;
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
        if (main && main.stop) return main.stop();
    };
    TPR.rawRun=function (bootClassName) {
        if (WebSite.removeJSOutput) {
            var o=TPR.getOutputFile();
            if (o.exists()) o.rm();
        }
        return TPR.loadClasses().then(DU.throwF(function () {
            //TPR.compile();
            TPR.fixBootRunClasses();
            if (!TPR.runScriptMode) thumbnail.set(TPR, 2000);
            TPR.rawBoot(bootClassName);
        }));
    };
    TPR.getResource=function () {
        var resFile=dir.rel("res.json");
        if (resFile.exists()) {
            var res=resFile.obj();
            var chg=false;
            for (var imgSnd in res) {
                var ary=res[imgSnd];
                for (var i=ary.length-1; i>=0 ;i--) {
                    if (!ary[i].url) {
                        ary.splice(i,1);
                        chg=true;
                    }
                }
            }
            if (chg) TPR.setResource(res);
            return res;
        }
        return Tonyu.defaultResource;
    };
    TPR.hasSoundResource=function () {
        var res=TPR.getResource();
        return res && res.sounds && res.sounds.length>0;
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
        return plugins.loadAll(opt.plugins,onload);
    };
    TPR.fixBootRunClasses=function () {
        var opt=TPR.getOptions();
        if (opt.run) {
            var mc=TPR.fixClassName(opt.run.mainClass);
            var bc=TPR.fixClassName(opt.run.bootClass);
            if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                opt.run.mainClass=mc;
                opt.run.bootClass=bc;
                TPR.setOptions(opt);
            }
        }
    };
    TPR.fixClassName=function (cn) {
        //if (TPR.classExists(cn)) return cn;
        if (Tonyu.getClass(cn)) return cn;
        var cna=cn.split(".");
        var sn=cna.pop();
        var res;
        res=TPR.NSP_USR+"."+sn;
        if (Tonyu.getClass(res)) return res;
        //if (TPR.classExists(res)) return res;
        res=TPR.NSP_KER+"."+sn;
        if (Tonyu.getClass(res)) return res;
        //if (TPR.classExists(res)) return res;
        return cn;
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
    TPR.rawBoot=function (bootClassName) {
        TPR.showProgress("Running "+bootClassName)
        Tonyu.run(bootClassName);
    };

    TPR.srcExists=function (className, dir) {
        var r=null;
        dir.recursive(function (e) {
            if (e.truncExt(TPR.EXT)===className) {
                r=e;
            }
        });
        return r;
    };
    TPR.isKernel=function (className) {
        if (kernelDir) return TPR.srcExists(className, kernelDir);
        return env.classes[TPR.NSP_KER+"."+className] ||
            Tonyu.getClass(TPR.NSP_KER+"."+className);
    };
    TPR.isKernelEditable=function () {
    	return env.options.kernelEditable;
    };
    //TPR.getDir=function () {return dir;};
    //TPR.getName=function () { return dir.name().replace(/\/$/,""); };
    TPR.renameClassName=function (o,n) {// o: key of aliases
        return TPR.compile({noIncremental:true}).then(function () {
            var cls=TPR.env.classes;/*ENVC*/
            for (var cln in cls) {/*ENVC*/
                var klass=cls[cln];/*ENVC*/
                var f=klass.src ? klass.src.tonyu : null;
                var a=klass.annotation;
                var changes=[];
                if (a && f) {
                    console.log("Check", cln);
                    for (var id in a) {
                        try {
                            var an=a[id];
                            var si=an.scopeInfo;
                            if (si && si.type=="class") {
                                //console.log("si.type==class",an,si);
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
                } else {
                    console.log("No Check", cln);
                }
            }
        });
    };
    TPR.showProgress=function (m) {
        console.log("PROGRESS",m);
        if (typeof SplashScreen!="undefined") {
            SplashScreen.progress(m);
        }
        return DU.promise(function (succ) {
            setTimeout(succ,0);
        });
    };
    return TPR;
};
if (typeof getReq=="function") getReq.exports("Tonyu.Project");
});

requireSimulator.setName('Shell');
define(["FS","assert"],
        function (FS,assert) {
    var Shell={};
    var PathUtil=assert(FS.PathUtil);
    Shell.newCommand=function (name,func) {
        this[name]=func;
    };
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir,true);
        return Shell.pwd();
    };
    Shell.vars=Object.create(FS.getEnv());
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
            sh.echo(fs.fstype()+"\t"+(fs.mountPoint||"<Default>"));
        });
    }
    Shell.resolve=resolve;
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (!FS.SFile.is(r)) {console.log(r," is not file");}
        if (mustExist && !r.exists()) throw new Error(r+": no such file or directory");
        return r;
    }
    function resolve2(v) {
        if (typeof v!="string") return v;
        var c=Shell.cwd;
        if (PathUtil.isAbsolutePath(v)) return FS.resolve(v,c);
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
    Shell.mkdir=function (file,options) {
        file=resolve(file, false);
        if (file.exists()) throw new Error(file+" : exists");
        return file.mkdir();

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
        return $.when.apply($,arguments).then(function () {
            console.log.apply(console,arguments);
            if (Shell.outUI && Shell.outUI.log) Shell.outUI.log.apply(Shell.outUI,arguments);
        });
    };
    Shell.err=function (e) {
        console.log.apply(console,arguments);
        if (e && e.stack) console.log(e.stack);
        if (Shell.outUI && Shell.outUI.err) Shell.outUI.err.apply(Shell.outUI,arguments);
    };
    Shell.clone= function () {
        var r=Object.create(this);
        r.vars=Object.create(this.vars);
        return r;
    };
    Shell.getvar=function (k) {
        return this.vars[k] || (process && process.env[k]);
    };
    Shell.get=Shell.getvar;
    Shell.set=function (k,v) {
        return this.vars[k]=v;
    };
    Shell.strcat=function () {
        if (arguments.length==1) return arguments[0];
        var s="";
        for (var i=0;i<arguments.length;i++) s+=arguments[i];
        return s;
    };
    Shell.exists=function (f) {
        f=this.resolve(f);
        return f.exists();
    };
    Shell.dl=function (f) {
        f=this.resolve(f||".");
        return f.download();
    };
    Shell.zip=function () {
        var t=this;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (typeof e==="string") return t.resolve(e);
            return e;
        });
        return FS.zip.zip.apply(FS.zip,a);
    };
    Shell.unzip=function () {
        var t=this;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (typeof e==="string") return t.resolve(e);
            return e;
        });
        return FS.zip.unzip.apply(FS.zip,a);
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
    if (!window.sh) window.sh=Shell;
    if (typeof process=="object") {
        sh.devtool=function () { require('nw.gui').Window.get().showDevTools();}
        sh.cd(process.cwd().replace(/\\/g,"/"));
    } else {
        sh.cd("/");
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
define(["Content"],function (Content) {
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
	STF.copyTo=function (dir) {
	    var o=STF.toObj();
	    for (var fn in o) {
            var f=dir.rel(fn);
            if (f.isText()) {
                f.text(o[fn].text);
            } else {
                f.setBytes(Content.url(o[fn].text).toByteArray() );
            }
        }
	};
	return STF;
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
										time += /*header.resolution*/ - dt; //@hoge1e3
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

var T2MediaLib = (function(){
    var T2MediaLib = function(_context) {
        this.context = null;
        this.picoAudio = null;
        this.soundDataAry = []; // T2MediaLib_SoundData
        this.bgmPlayerMax = 16;
        this.bgmPlayerAry = []; // T2MediaLib_BGMPlayer

        this.masterVolume = 1.0;
        this.seMasterVolume = 1.0;
        this.bgmMasterVolume = 1.0;

        this.playingAudio = null;
        this.audioVolume = 1.0;
        this.audioTempo = 1.0;
        this.audioDataAry = {
            data : []
        };
        
        this.init(_context);
    };

    // 初期化 //
    T2MediaLib.prototype.init = function(_context) {
        if (this.inited) return;
        this.inited=true;
        if (this.disabled) return;
        if (!_context) {
            if (window.AudioContext) {
                this.context = new AudioContext();
            } else if (window.webkitAudioContext) {
                this.context = new webkitAudioContext();
            } else {
                this.context = null;
                console.log('Your browser does not support yet Web Audio API');
            }
        } else {
            this.context = _context;
        }

        // Web Audio API 起動成功
        if (this.context) {
            // BGMPlayer初期化 (16個生成)
            for (var i=0; i<this.bgmPlayerMax; i++) {
                this.bgmPlayerAry[i] = new T2MediaLib_BGMPlayer(this, i);
            }
            // MIDIデコード用PicoAudio生成
            //this.picoAudio = new PicoAudio(this.context); // 作成が少し重いので必要なときのみ作成する
        }
    };

    // CLEAR系関数 //
    T2MediaLib.prototype.allClearSoundData = function() {
        var dataAry = this.soundDataAry;
        for (var idx in dataAry) {
            delete dataAry[idx];
        }
    };
    T2MediaLib.prototype.clearSoundData = function(idx) {
        var dataAry = this.soundDataAry;
        delete dataAry[idx];
    };
    T2MediaLib.prototype.allRemoveDecodedSoundData = function() {
        var dataAry = this.soundDataAry;
        for (var idx in dataAry) {
            var soundData = dataAry[idx]
            if (soundData == null) continue;
            if (!soundData.isDecodeComplete() && !soundData.isDecoding()) continue;
            soundData.removeDecodedData();
        }
    };
    T2MediaLib.prototype.removeDecodedSoundData = function(idx) {
        var soundData = this.soundDataAry[idx];
        if (soundData == null) return;
        if (!soundData.isDecodeComplete() && !soundData.isDecoding()) return;
        soundData.removeDecodedData();
    };


    // SE&BGMの音量 //
    T2MediaLib.prototype.getMasterVolume = function() {
        return this.masterVolume;
    };
    T2MediaLib.prototype.setMasterVolume = function(vol) {
        this.masterVolume = vol;
        for (var i=0; i<this.bgmPlayerMax; i++) {
            var bgmPlayer = this.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    };

    // 配列データからサウンドを作成・登録
    T2MediaLib.prototype.createSoundFromArray = function(idx, array1, array2) {
        this.soundDataAry[idx] = new T2MediaLib_SoundData();

        var ctx = this.context;
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
        this.soundDataAry[idx].onDecodeComplete(audioBuffer);
    };
    // サウンドの読み込み・登録
    T2MediaLib.prototype.loadSound = function(idx, url, callbacks) { //@hoge1e3
        this.soundDataAry[idx] = new T2MediaLib_SoundData();

        if (!this.context || this.disabled) {
            this.soundDataAry[idx].onError("FUNC_DISABLED_ERROR");
            return null;
        }
        // midiがあったらpicoAudioを準備しておく
        if (url.match(/\.(midi?)$/) || url.match(/^data:audio\/mid/)) {
            if (this.picoAudio == null) {
                this.picoAudio = new PicoAudio(this.context);
            }
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3|mp4|m4a)$/,".ogg");
        }
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    that.soundDataAry[idx].onLoadComplete(arrayBuffer);
                    if (callbacks && callbacks.succ) callbacks.succ(idx);
                } else {
                    that.soundDataAry[idx].onError("XHR_RESPONSE_ERROR");
                    if (callbacks && callbacks.err) callbacks.err(idx,that.soundDataAry[idx].errorID);
                }
            } else {
                that.soundDataAry[idx].onError("XHR_STATUS_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx,that.soundDataAry[idx].errorID);
            }
        };
        xhr.onerror=function (e) {
            console.log(e+"");
            that.soundDataAry[idx].onError("XHR_ERROR");
            if (callbacks && callbacks.err) callbacks.err(idx,that.soundDataAry[idx].errorID);
        };

        this.soundDataAry[idx].onLoad(url);
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
        //setTimeout(this.activate.bind(this),0);
    };
    // サウンドのデコード
    T2MediaLib.prototype.decodeSound = function(idx, callbacks) {
        var soundData = this.soundDataAry[idx];
        if (soundData == null) return;
        if (soundData.isDecodeComplete()) return;

        // Adding Callback
        if (soundData.decodedCallbacksAry == null) {
            soundData.decodedCallbacksAry = []; // 複数コールバックを呼べるようにする
        }
        if (callbacks) {
            if (callbacks.bgmPlayerId != null) { // 同じbgmPlayerIdのcallbacksがあれば上書きする(処理軽量化)
                var exists = soundData.decodedCallbacksAry.some(function(c, i) {
                    if (callbacks.bgmPlayerId == c.bgmPlayerId) {
                        soundData.decodedCallbacksAry[i] = callbacks;
                        return true;
                    }
                    return false;
                });
                if (!exists) {
                    soundData.decodedCallbacksAry.push(callbacks);
                }
            } else {
                soundData.decodedCallbacksAry.push(callbacks);
            }
        }

        if (soundData.isDecoding()) return;
        soundData.onDecode();
        var arrayBuffer = soundData.fileData.slice(0);
        if (soundData.url.match(/\.(midi?)$/) || soundData.url.match(/^data:audio\/mid/)) {
            // Midi
            // PicoAudio.jsにデコードしてもらう
            if (this.picoAudio == null) {
                this.picoAudio = new PicoAudio(this.context);
            }
            var smf = new Uint8Array(arrayBuffer);
            var data = this.picoAudio.parseSMF(smf);
            if (typeof data == "string") { // parseSMF Error
                console.log('T2MediaLib: Error parseSMF()', data);
                this.soundDataAry[idx].onError("DECODE_ERROR");
                //if (callbacks && callbacks.err) callbacks.err(idx, this.soundDataAry[idx].errorID);
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.err == "function") {
                        callbacks.err(idx, this.soundDataAry[idx].errorID);
                    }
                });
                soundData.decodedCallbacksAry = null;
            } else {
                this.soundDataAry[idx].onDecodeComplete(data);
                //if (callbacks && callbacks.succ) callbacks.succ(idx);
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.succ == "function") {
                        callbacks.succ(idx);
                    }
                });
                soundData.decodedCallbacksAry = null;
            }
        } else {
            // MP3, Ogg, AAC, WAV
            var that = this;
            var successCallback = function(audioBuffer) {
                // デコード中にremoveDecodeSoundData()したらデータを捨てる
                if (that.soundDataAry[idx].isDecoding()) {
                    that.soundDataAry[idx].onDecodeComplete(audioBuffer);
                    //if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
                    soundData.decodedCallbacksAry.forEach(function(callbacks) {
                        if (typeof callbacks.succ == "function") {
                            callbacks.succ(idx);
                        }
                    });
                    soundData.decodedCallbacksAry = null;
                }
            };
            var errorCallback = function(error) {
                if (error instanceof Error) {
                    console.log('T2MediaLib: '+error.message, soundData.url);//@hoge1e3
                } else {
                    console.log('T2MediaLib: Error decodeAudioData()', soundData.url);//@hoge1e3
                }
                that.soundDataAry[idx].onError("DECODE_ERROR");
                //if (callbacks && callbacks.err) callbacks.err(idx, that.soundDataAry[idx].errorID);
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.err == "function") {
                        callbacks.err(idx, that.soundDataAry[idx].errorID);
                    }
                });
                soundData.decodedCallbacksAry = null;
            };
            this.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
        }
    };
    // 無音サウンドを鳴らしWeb Audio APIを使えるようにする(iOS対策)
    T2MediaLib.prototype.activate = function () {
        this.init();
        if (this.isActivated) return;
        this.isActivated=true;
        var myContext=this.context;
        var buffer = myContext.createBuffer(1, Math.floor(myContext.sampleRate/32), myContext.sampleRate);
        var ary = buffer.getChannelData(0);
        var lam = Math.floor(myContext.sampleRate/860);
        for (var i = 0; i < ary.length; i++) {
             //ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
             ary[i] = 0; // 無音化
        }
        var source = myContext.createBufferSource();
        source.buffer = buffer;
        source.connect(myContext.destination);
        source.start = source.start || source.noteOn;
        source.start(0);
    };
    // 指定したサウンドのファイルデータを返す
    T2MediaLib.prototype.getSoundFileData = function(idx) {
        var soundDataObj = this.soundDataAry[idx];
        if (soundDataObj) {
            return soundDataObj.fileData;
        } else {
            return null;
        }
    };
    // 指定したサウンドのデコード済みデータを返す
    T2MediaLib.prototype.getSoundDecodedData = function(idx) {
        var soundDataObj = this.soundDataAry[idx];
        if (soundDataObj) {
            return soundDataObj.decodedData;
        } else {
            return null;
        }
    };
    // AudioContextのcurrentTimeを返す
    T2MediaLib.prototype.getCurrentTime = function () {//@hoge1e3
        if (!this.context) return null;
        return this.context.currentTime;
    };

    // SEメソッド郡 //

    T2MediaLib.prototype.playSE = function(idx, vol, pan, rate, offset, loop, loopStart, loopEnd,start,duration) {//add start,duration by @hoge1e3
        if (!this.context) return null;
        var soundData = this.soundDataAry[idx];
        if (soundData == null) return null;
        if (!soundData.isDecodeComplete()) {
            var that = this;
            var callbacks = {};
            callbacks.succ = function(idx) {
                that.playSE(idx, vol, pan, rate, offset, loop, loopStart, loopEnd,start,duration);//@hoge1e3
            };
            callbacks.err = function() {
            };
            this.decodeSound(idx, callbacks);
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
        if (!duration) {//@hoge1e3
            duration=undefined;
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
        start=start||0;//@hoge1e3

        var source = this.context.createBufferSource();
        this.context.createGain = this.context.createGain || this.context.createGainNode;
        var gainNode = this.context.createGain();
        var panNode = this.context.createPanner();

        source.buffer = audioBuffer;
        source.loop = loop;
        source.loopStart = loopStart;
        source.loopEnd = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 音量＆パン設定
        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(this.context.destination);
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
        gainNode.gain.value = vol * this.seMasterVolume * this.masterVolume;

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
        source.playStartTime = this.context.currentTime+start;//@hoge1e3
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;
        source.start(start, offset, duration);
        if (loop && duration != null) source.stop(start + duration); // iOS, Firefoxではloopがtrueのときdurationを指定しても止まらない

        source.onended = function(event) {
            //source.disconnect();
            source.onended = null;
            //delete source.gainNode;
            //delete source.panNode;
        };

        return source;
    };
    T2MediaLib.prototype.stopSE = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    };
    T2MediaLib.prototype.getSEMasterVolume = function() {
        return this.seMasterVolume;
    };
    T2MediaLib.prototype.setSEMasterVolume = function(vol) {
        this.seMasterVolume = vol;
    };
    T2MediaLib.prototype.getSEVolume = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return source.volumeValue;
    };
    T2MediaLib.prototype.setSEVolume = function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * this.seMasterVolume * this.masterVolume;
        source.volumeValue = vol;
        return sourceObj;
    };
    T2MediaLib.prototype.getSERate = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.playbackRate.value;
    };
    T2MediaLib.prototype.setSERate = function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    };
    T2MediaLib.prototype.getSEPan = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.panValue;
    };
    T2MediaLib.prototype.setSEPan = function(sourceObj, pan) {
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
    };
    T2MediaLib.prototype.isSELoop = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loop;
    };
    T2MediaLib.prototype.setSELoop = function(sourceObj, loop) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loop = loop;
    };
    T2MediaLib.prototype.getSELoopStartTime = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopStart;
    };
    T2MediaLib.prototype.setSELoopStartTime = function(sourceObj, loopStart) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopStart = loopStart;
    };
    T2MediaLib.prototype.getSELoopEndTime = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopEnd;
    };
    T2MediaLib.prototype.setSELoopEndTime = function(sourceObj, loopEnd) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopEnd = loopEnd;
    };

    // BGMメソッド郡 //

    T2MediaLib.prototype.playBGM = function(id, idx, loop, offset, loopStart, loopEnd) {
        if (!this.context) return null;
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.playBGM(idx, loop, offset, loopStart, loopEnd);
    };
    T2MediaLib.prototype.stopBGM = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.stopBGM();
    };
    T2MediaLib.prototype.pauseBGM = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.pauseBGM();
    };
    T2MediaLib.prototype.resumeBGM = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.resumeBGM();
    };
    T2MediaLib.prototype.getBGMMasterVolume = function() {
        return this.bgmMasterVolume;
    };
    T2MediaLib.prototype.setBGMMasterVolume = function(vol) {
        this.bgmMasterVolume = vol;
        for (var i=0; i<this.bgmPlayerMax; i++) {
            var bgmPlayer = this.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    };
    T2MediaLib.prototype.getBGMVolume = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMVolume();
    };
    T2MediaLib.prototype.setBGMVolume = function(id, vol) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMVolume(vol);
    };
    T2MediaLib.prototype.getBGMTempo = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMTempo();
    };
    T2MediaLib.prototype.setBGMTempo = function(id, tempo) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMTempo(tempo);
    };
    T2MediaLib.prototype.getBGMPan = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMPan();
    };
    T2MediaLib.prototype.setBGMPan = function(id, pan) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMPan(pan);
    };
    T2MediaLib.prototype.isBGMLoop = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.isBGMLoop();
    };
    T2MediaLib.prototype.setBGMLoop = function(id, loop) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMLoop(loop);
    };
    T2MediaLib.prototype.getBGMLoopStartTime = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMLoopStartTime();
    };
    T2MediaLib.prototype.setBGMLoopStartTime = function(id, loopStart) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMLoopStartTime(loopStart);
    };
    T2MediaLib.prototype.getBGMLoopEndTime = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMLoopEndTime();
    };
    T2MediaLib.prototype.setBGMLoopEndTime = function(id, loopEnd) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setBGMLoopEndTime(loopEnd);
    };
    T2MediaLib.prototype.getBGMCurrentTime = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMCurrentTime();
    };
    T2MediaLib.prototype.getBGMLength = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMLength();
    };
    T2MediaLib.prototype.getPlayingBGMName = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getPlayingBGMName();
    };
    T2MediaLib.prototype.setOnBGMEndListener = function(id, listener) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setOnBGMEndListener(listener);
    };
    T2MediaLib.prototype.getPlayingBGMState = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getPlayingBGMState();
    };
    T2MediaLib.prototype.getBGMPicoAudio = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.getBGMPicoAudio();
    };
    T2MediaLib.prototype.getBGMPlayerMax = function() {
        return this.bgmPlayerMax;
    };
    T2MediaLib.prototype.allStopBGM = function() {
        for (var i=0; i<this.bgmPlayerMax; i++) {
            this.stopBGM(i);
        }
    };
    T2MediaLib.prototype.allResetBGM = function() {
        for (var i=0; i<this.bgmPlayerMax; i++) {
            this.stopBGM(i);
            this.setBGMVolume(i, 1.0);
            this.setBGMTempo(i, 1.0);
            this.setBGMPan(i, 0.0);
        }
        this.setMasterVolume(1.0);
        this.setSEMasterVolume(1.0);
        this.setBGMMasterVolume(1.0);
    };
    T2MediaLib.prototype._getBgmPlayer = function(id) {
        if (id < 0 || this.bgmPlayerMax <= id) return null;
        var bgmPlayer = this.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer;
    };

    // Audioメソッド郡 //

    T2MediaLib.prototype.loadAudio = function(idx, url) {
        var audio = new Audio(url);
        audio.play();

        this.audioDataAry.data[idx] = null;

        var that = this;
        audio.addEventListener('loadstart', function() {
            if (!that.context) return null;
            var source = that.context.createMediaElementSource(audio);
            source.connect(that.context.destination);
        }, false);

        audio.addEventListener('canplay', function() {
            this.audioDataAry.data[idx] = audio;
        }, false);

        audio.load();

    };
    T2MediaLib.prototype.playAudio = function(idx, loop, startTime) {
        var audio = this.audioDataAry.data[idx];
        if (!audio) return null;
        if (!startTime) startTime = 0;

        if (this.playingAudio instanceof Audio) {
            this.playingAudio.pause();
            this.playingAudio.currentTime = 0;
        }
        this.playingAudio = audio;
        audio.loop = loop;
        audio.volume = this.audioVolume;
        audio.currentTime = startTime;
        audio.play();
        return audio;
    };
    T2MediaLib.prototype.stopAudio = function() {
        var audio = this.playingAudio;
        if (!(audio instanceof Audio)) return null;
        audio.pause();
        audio.currentTime = 0;
        this.playingAudio = null;
        return audio;
    };
    T2MediaLib.prototype.pauseAudio = function() {
        var audio = this.playingAudio;
        if (!audio) return null;
        audio.pause();
        return audio;
    };
    T2MediaLib.prototype.resumeAudio = function() {
        var audio = this.playingAudio;
        if (!audio) return null;
        audio.play();
        return audio;
    };
    T2MediaLib.prototype.setAudioVolume = function(vol) {
        this.audioVolume = vol;
        if (this.playingAudio instanceof Audio) {
            this.playingAudio.volume = vol;
        }
    };
    T2MediaLib.prototype.setAudioTempo = function(tempo) {
        this.audioTempo = tempo;
        if (this.playingAudio instanceof Audio) {
            this.playingAudio.playbackRate = tempo;
        }
    };
    T2MediaLib.prototype.setAudioPosition = function(time) {
        if (this.playingAudio instanceof Audio) {
            this.playingAudio.currentTime = time;
        }
    };
    T2MediaLib.prototype.getAudioData = function(idx) {
        return this.audioDataAry.data[idx];
    };
    T2MediaLib.prototype.getAudioCurrentTime = function() {
        if (!(this.playingAudio instanceof Audio)) return null;
        return this.playingAudio.currentTime;
    };
    T2MediaLib.prototype.getAudioLength = function() {
        if (!(this.playingAudio instanceof Audio)) return null;
        return this.playingAudio.duration;
    }

    return T2MediaLib;
})();



var T2MediaLib_BGMPlayer = (function(){
    var T2MediaLib_BGMPlayer = function(t2MediaLib, arg_id) {
        this.t2MediaLib = t2MediaLib;
        this.id = arg_id;
        this.playingBGMState = "stop";
        this.playingBGMStatePending = null;
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
        this.picoAudio = null;//new PicoAudio(this.context);
        this.picoAudioSetDataBGMName = null; // 前回のsetDataした曲を再び使う場合は、setDataを省略して軽量化する
        this.PICO_AUDIO_VOLUME_COEF = 1;//0.2;
    };

    // BGM関数郡 //

    T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
        this.stopBGM();

        var soundData = this.t2MediaLib.soundDataAry[idx];
        if (soundData == null) return null;
        if (!soundData.isDecodeComplete()) {
            var that = this;
            var callbacks = {};
            callbacks.bgmPlayerId = this.id;
            callbacks.succ = function() {
                var pending = that.playingBGMStatePending; // 途中で値が変わるため保存
                that._setPlayingBGMState("stop", true);
                if (pending != "stop" && that.playingBGMName == idx) {
                    that.playBGM(idx, loop, offset, loopStart, loopEnd);
                }
                if (pending == "pause") {
                    that.pauseBGM();
                }
            };
            callbacks.err = function() {
                that._setPlayingBGMState("stop", true);
            };
            this.playingBGMName = idx;
            this._setPlayingBGMState("decoding", true);
            this._setPlayingBGMState("play");
            this.t2MediaLib.decodeSound(idx, callbacks);
            return this;
        }

        var decodedData = soundData.decodedData;
        if (decodedData instanceof AudioBuffer) {
            // MP3, Ogg, AAC, WAV
            this.playingBGM = this.t2MediaLib.playSE(idx, this.bgmVolume, this.bgmPan, this.bgmTempo, offset, loop, loopStart, loopEnd);
        } else if (decodedData instanceof Object) {
            // Midi
            this._initPicoAudio();
            if (idx != this.picoAudioSetDataBGMName) {
                this.picoAudio.setData(decodedData);
                this.picoAudioSetDataBGMName = idx;
            } else {
                this.picoAudio.initStatus();
            }
            this.picoAudio.setLoop(loop);
            this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume
                * this.t2MediaLib.bgmMasterVolume * this.t2MediaLib.masterVolume);
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
        this._setPlayingBGMState("play");
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
        this._setPlayingBGMState("stop");
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
                this.bgmPauseLoopStart = this.t2MediaLib.getSELoopStartTime(bgm);
                this.bgmPauseLoopEnd = this.t2MediaLib.getSELoopEndTime(bgm);
                this.bgmPauseLoop = this.t2MediaLib.isSELoop(bgm);
                this.bgmPauseCurrentTime = bgm.context.currentTime;
                this.bgmPauseTempo = this.bgmTempo;
                bgm.stop(0);
                this.bgmPause = 1;
            }
        }
        if (this.playingBGMState != "stop") {
            this._setPlayingBGMState("pause");
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
            this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * vol * this.t2MediaLib.bgmMasterVolume * this.t2MediaLib.masterVolume);
        } else if (bgm instanceof AudioBufferSourceNode) {
            // MP3, Ogg, AAC, WAV
            bgm.gainNode.gain.value = vol * this.t2MediaLib.bgmMasterVolume * this.t2MediaLib.masterVolume;
            //↓seMasterVolumeが音量に乗算されてしまう
            //this.t2MediaLib.setSEVolume(bgm, vol);
        }
        return this;
    };

    T2MediaLib_BGMPlayer.prototype.getBGMTempo = function() {
        return this.bgmTempo;
    };

    T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
        // MP3, Ogg, AAC, WAV
        var bgm = this.playingBGM;

        if (tempo <= 0 || isNaN(tempo)) tempo = 1;
        if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
            bgm.plusTime -= (this.t2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
        }
        this.bgmTempo = tempo;
        this.t2MediaLib.setSERate(bgm, tempo);
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
            this.t2MediaLib.setSEPan(bgm, pan);
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
                return this.t2MediaLib.isSELoop(bgm);
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
                this.t2MediaLib.setSELoop(bgm, loop);
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
                return this.t2MediaLib.getSELoopStartTime(bgm);
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
                return this.t2MediaLib.setSELoopStartTime(bgm, loopStart);
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
                return this.t2MediaLib.getSELoopEndTime(bgm);
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
                return this.t2MediaLib.setSELoopEndTime(bgm, loopEnd);
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
                currenTime = this.t2MediaLib.context.currentTime;
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
        if (this.picoAudio != null) {
            this.picoAudio.setOnSongEndListener(listener);
        }
    };

    T2MediaLib_BGMPlayer.prototype.getPlayingBGMState = function() {
        return this.playingBGMState;
    };

    T2MediaLib_BGMPlayer.prototype.getBGMPicoAudio = function() {
        this._initPicoAudio();
        return this.picoAudio;
    };

    T2MediaLib_BGMPlayer.prototype._setPlayingBGMState = function(state, force) {
        if (force || this.playingBGMState != "decoding") {
            this.playingBGMState = state;
            this.playingBGMStatePending = null;
        } else {
            this.playingBGMStatePending = state;
        }
    };

    T2MediaLib_BGMPlayer.prototype._initPicoAudio = function() {
        if (this.picoAudio == null) {
            if (this.id == 0) {
                this.picoAudio = this.t2MediaLib.picoAudio; // 0番目はT2MediaLib.picoAudioを使いまわす（初期化に時間がかかるため）
            }
            if (this.picoAudio == null) {
                this.picoAudio = new PicoAudio(this.t2MediaLib.context, this.t2MediaLib.picoAudio); // AudioContextオブジェクトがmax6つまで？なので使いまわす
            }
        }
    };

    return T2MediaLib_BGMPlayer;
})();



var T2MediaLib_SoundData = (function(){
    var T2MediaLib_SoundData = function(idx, url) {
        // "none"    :データなし
        // "loading" :読み込み中
        // "loaded"  :読み込み完了
        // "decoding":デコード中
        // "decoded" :デコード完了
        // "error"   :エラー
        this.state = "none";
        this.errorID = null;
        this.url = null;
        this.fileData = null;
        this.decodedData = null;
        this.decodedCallbacksAry = null;
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

    T2MediaLib_SoundData.prototype.removeDecodedData = function() {
        this.state = "loaded";
        this.decodedData = null;
    };

    return T2MediaLib_SoundData;
})();

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
requireSimulator.setName('LSFS');
define(["FS"],function (FS){return FS.LSFS;});

requireSimulator.setName('runScript');
requirejs(["FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS",
			"runtime","WebSite","LSFS"],
		function (FS,  Tonyu_Project, sh,      KeyEventChecker, ScriptTagFS,
				rt,WebSite,LSFS) {
	$(function () {
		var home=FS.get(WebSite.tonyuHome);
		var ramHome=FS.get("/ram/");
		FS.mount(ramHome.path(), LSFS.ramDisk() );
		Tonyu.defaultResource={
				images:[
						{name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
						{name:"$pat_sample", url: "images/Sample.png"},
						{name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
						],
						sounds:[]
		};
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
		var cv=$("<canvas>").attr({width: w-margin, height: h-margin}).appendTo("body");
		$(window).resize(onResize);
		function onResize() {
			var margin = getMargin();
			w=$(window).width();
			h=$(window).height();
			cv.attr({width: w-margin, height: h-margin});
		}
		var locs=location.href.replace(/\?.*/,"").split(/\//);
		var prj=locs.pop() || "runscript";
		var user=locs.pop() || "nobody";
		//if (prjloc.length<0) locs="runscript";
		var curProjectDir=ramHome;
		var actualFilesDir=home.rel(user+"/"+prj+"/");
		ramHome.rel("files/").link(actualFilesDir);
		//if (curProjectDir.exists()) sh.rm(curProjectDir,{r:1});
		var fo=ScriptTagFS.toObj();
		for (var fn in fo) {
			var f=curProjectDir.rel(fn);
			if (!f.isDir()) {
				var m=fo[fn];
				f.text(m.text);
				delete m.text;
				if (m.lastUpdate) f.metaInfo(m);
			}
		}
		sh.cd(curProjectDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		var curPrj=Tonyu_Project(curProjectDir);//, kernelDir);
		start();
		function start() {
			Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
			var o=curPrj.getOptions();
			if (o.compiler && o.compiler.diagnose) {
				o.compiler.diagnose=false;
				curPrj.setOptions(o);
			}
			curPrj.runScriptMode=true;
			curPrj.rawRun(o.run.bootClass);
		}
	});
});

requireSimulator.setName();
