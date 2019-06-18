(function (f) {
	if (typeof define==="function" && define.amd &&
		typeof requirejs==="function") {
		f({requirejs:requirejs,define:define});
	} else f({});
})(function (real) {
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
	var define=function () {
		var a=Array.prototype.slice.call(arguments);
		if (typeof a[0]==="string") R.curName=a.shift();
		var reqs=a.shift();
		var func=a.shift();
		R.def(reqs,func,"define");
	};
	define.amd={jQuery:true};
	var /*require=*/requirejs=function (reqs,func) {
		R.def(reqs,func,"require");
	};
	requirejs.isRequireSimulator=true;
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
	R.real=real;
	var requireSimulator=R;
	// Created at Tue Jun 18 2019 12:22:15 GMT+0900 (日本標準時)
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
            a=this.failMesg.concat(value).concat(a);//.concat(["(mode:",this._mode,")"]);
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
            if (t===Boolean || t=="boolean") {
                this.assert(typeof(v)=="boolean",[v,"should be a boolean"]);
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
// hyphen on protocol -> chrome-extension://....
var url=/^([a-z\-]+):\/\/\/?([^\/]+)\//;
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
      ".wav":"audio/x-wav",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".midi":"audio/midi",
      ".mid":"audio/midi",
      ".mzo":"audio/mzo",
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
    var root=(
        typeof window!=="undefined" ? window :
        typeof self!=="undefined" ? self :
        typeof global!=="undefined" ? global : null
    );
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
                return new DU.external.Promise(function (s,rej) {
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
                return new DU.external.Promise(function (s,rej) {
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
            if (!root.requirejs) throw new Error("requirejs is not loaded");
            return DU.callbackToPromise(function (s) {
                root.requirejs(modules,s);
            });
        }
    };
    DU.NOP=function (r) {return r;};
    DU.E=function () {
        console.log("DUE",arguments);
        DU.errorHandler.apply(DU,arguments);
    };
    DU.errorHandler=function (e) {
        console.error.apply(console,arguments);
        alert(e);
    };
    DU.setE=function (f) {
        DU.errorHandler=f;
    };
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (root.$ && root.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:root.Promise};
    if (!root.DeferredUtil) root.DeferredUtil=DU;
    return DU;
});

define('FSClass',["extend","PathUtil","MIMETypes","assert","DeferredUtil"],
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

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define('FileSaver.min',[],function(){return saveAs});
define('Content',["assert","Util","FileSaver.min"],function (assert,Util,saveAs) {
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
    Content.download=saveAs;
    // why blob is not here... because blob content requires FileReader (cannot read instantly!)
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
    p.toBlob=function () {
        return new Blob([this.toBin(ArrayBuffer)],{type:this.contentType});
    };
    p.download=function (name) {
        Content.download(this.toBlob(),name);
    };
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

define('NativeFS',["FSClass","assert","PathUtil","extend","Content"],
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

define('LSFS',["FSClass","PathUtil","extend","assert","Util","Content"],
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
    LSFS.getUsage=function () {
        var using=0;
        for (var i in localStorage) {
            if (typeof localStorage[i]=="string"){
                using+=localStorage[i].length;
            }
        }
        return using;
    };
    LSFS.getCapacity=function () {
        var seq=0;
        var str="a";
        var KEY="___checkls___";
        var using=0;
        var lim=Math.pow(2,25);//32MB?
        try {
            // make 1KB str
            for (var i=0; i<10 ;i++) {
                str+=str;
            }
            for (var i in localStorage) {
                if (i.substring(0,KEY.length)==KEY) delete localStorage[i];
                else if (typeof localStorage[i]=="string"){
                    using+=localStorage[i].length;
                }
            }
            var ru=using;
            while (add()) {
                if (str.length<lim) {
                    str+=str;
                } else break;
            }
            while(str.length>1024) {
                str=str.substring(str.length/2);
                add();
            }
            return {using:ru, max:using};
        } finally {
            for (var i=0; i<seq; i++) {
                 delete localStorage[KEY+i];
            }
        }
        function add() {
            try {
                localStorage[KEY+seq]=str;
                seq++;
                using+=str.length;
                //console.log("Added "+str.length, str.length, using);
                return true;
            } catch(e) {
                delete localStorage[KEY+seq];
                //console.log("Add Fail "+str.length);
                return false;
            }
        }
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

define('WebFS',["FSClass","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
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
define('SFile',["extend","assert","PathUtil","Util","Content","FSClass","FileSaver.min","DeferredUtil"],
function (extend,A,P,Util,Content,FSClass,saveAs,DU) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    //A(fs && fs.getReturnTypes, fs);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    /*this.act={};// path/fs after follwed symlink
    this.act.path=this.fs.resolveLink(path);
    this.act.fs=rootFS.resolveFS(this.act.path);
    A.is(this.act, {fs:FSClass, path:P.Absolute});*/
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
    lines:function (lines) {
        if (lines instanceof Array) {//WRITE
            return this.text(lines.join("\n"));
        } else if (typeof lines==="function") {//READ async
            return this.text(function (r) {
                return lines(r.replace(/\r/g,"").split("\n"));
            });
        }
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
           this.err("Cannot move dir "+src.path()+" to file "+dst.path());
        } else if (!srcIsDir && !dstIsDir) {
            if (options.echo) options.echo(src+" -> "+dst);
            var res=this.act.fs.cp(this.act.path, dst.getResolvedLinkPath(),options);
            res=DU.resolve(res);
            if (options.a) {
                return res.then(function () {
                    return dst.setMetaInfo(src.getMetaInfo());
                });
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir,"Both src and dst should be dir");
            return src.each(function (s) {
                var r;
                var dstf=dst.rel(s.name());
                if (options.progress) {
                    r=options.progress(dstf,{src:s,dst:dstf});
                }
                return DU.resolve(r).then(function () {
                    return dstf.copyFrom(s, options);
                });
            });
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        var t=this;
        return t.exists(function (ex) {
            return t.copyFrom(src,options).then(function () {
                return src.rm({recursive:true});
            },function (e) {
                // rollback
                if (!ex) return t.exists(function (ex) {
                    if (ex) return t.rm({recursive:true});
                }).then(function () {throw e;});
                throw e;
            });
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
        options=dir.convertOptions(options);
        return dir.each(function (f) {
            if (f.isDir()) return f.recursive(fun,options);
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
                var f=dir.rel(name);
                if (options.excludesF(f) ) continue;
                res.push(f);
            }
            if (typeof ord=="function" && res.sort) res.sort(ord);
            return res;
        });
    },
    listFiles:function (options) {
        var args=Array.prototype.slice.call(arguments);
        return DU.assertResolved(this.listFilesAsync.apply(this,args));
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
        var excludes=options.excludes || {};
        if (typeof excludes==="function") {
            options.excludesF=excludes;
        } else if (typeof excludes==="object") {
            if (excludes instanceof Array) {
                var nex={};
                excludes.forEach(function (e) {
                    if (P.startsWith(e,"/")) {
                        nex[e]=1;
                    } else {
                        nex[pathR+e]=1;
                    }
                });
                excludes=nex;
            }
            options.excludesF=function (f) {
                return excludes[f.path()];
            };
        }
        return A.is(options,{excludesF:Function});
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
    setBlob: function (blob) {
        var t=this;
        return DU.promise(function (succ,err) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // reader.result contains the contents of blob as a typed array
                DU.resolve(t.setBytes(reader.result)).then(succ);
            });
            reader.readAsArrayBuffer(blob);
        });
    },
    download: function () {
        if (this.isDir()) throw new Error(this+": Download dir is not support yet. Use 'zip' instead.");
        saveAs(this.getBlob(),this.name());;
    },
    err: function () {
        var a=Array.prototype.slice.call(arguments);
        console.log.apply(console,a);
        throw new Error(a.join(""));
    },
    exportAsObject: function (options) {
        var base=this;
        var data={};
        this.recursive(function (f) {
            data[f.relPath(base)]=f.text();
        },options);
        var req={base:base.path(),data:data};
        return req;
    },
    importFromObject: function (data, options) {
        if (typeof data==="string") data=JSON.parse(data);
        var data=data.data;
        for (var k in data) {
            this.rel(k).text(data[k]);
        }
    }
};
Object.defineProperty(SFile.prototype,"act",{
    get: function () {
        if (this._act) return this._act;
        this._act={};// path/fs after follwed symlink
        this._act.path=this.fs.resolveLink(this._path);
        this._act.fs=this.rootFS.resolveFS(this._act.path);
        A.is(this._act, {fs:FSClass, path:P.Absolute});
        return this._act;
    }
});

return SFile;
});

define('RootFS',["assert","FSClass","PathUtil","SFile"], function (assert,FS,P,SFile) {
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
define('zip',["SFile",/*"jszip",*/"FileSaver.min","Util","DeferredUtil"],
function (SFile,/*JSZip,*/fsv,Util,DU) {
    var zip={};
    zip.setJSZip=function (JSZip) {
        zip.JSZip=JSZip;
        if (!DU.external.Promise) {
            DU.external.Promise=JSZip.external.Promise;
        }
    };
    if (typeof JSZip!=="undefined") zip.setJSZip(JSZip);
    zip.zip=function (dir,dstZip,options) {
        if (!SFile.is(dstZip)) options=dstZip;
        options=options||{};
        var jszip = new zip.JSZip();
        function loop(dst, dir) {
            return dir.each(function (f) {
                var r=DU.resolve();
                if (options.progress) {
                    r=options.progress(f);
                }
                return r.then(function () {
                    if (f.isDir()) {
                        var sf=dst.folder(f.name().replace(/[\/\\]$/,""));
                        return loop(sf, f);
                    } else {
                        return f.getContent(function (c) {
                            dst.file(f.name(),c.toArrayBuffer());
                        });
                    }
                });
            });
        }
        return loop(jszip, dir).then(function () {
            return DU.resolve(jszip.generateAsync({
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
        var jszip=new zip.JSZip();
        return DU.resolve(jszip.loadAsync(arrayBuf)).then(function () {
            return DU.each(jszip.files,function (key,zipEntry) {
                //var zipEntry=jszip.files[i];
                var buf,dest;
                return DU.resolve(zipEntry.async("arraybuffer")).then(function (_buf) {
                    buf=_buf;
                    dest=destDir.rel(zipEntry.name);
                    if (options.progress) {
                        return DU.resolve(options.progress(dest));
                    }
                }).then(function () {
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
    return zip;
});

define('FS',["FSClass","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil"],
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
    //if (zip.JSZip) DU.external.Promise=zip.JSZip.external.Promise;
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env({});
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
            } else if (typeof localStorage==="object") {
                fs=new LSFS(localStorage);
            } else if (typeof importScripts==="function") {
                // Worker
                self.addEventListener("message", function (e) {
                    var data=e.data;
                    if (typeof data==="string") {
                        data=JSON.parse(data);
                    }
                    switch(data.type) {
                    case "upload":
                        FS.get(data.base).importFromObject(data.data);
                        break;
                    case "observe":
                        rootFS.observe(data.path, function (path,meta) {
                            self.postMessage(JSON.stringify({
                                type: "changed",
                                path: path,
                                content: FS.get(path).text(),
                                meta: meta
                            }));
                        });
                        break;
                    }
                });
                fs=LSFS.ramDisk();
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

requireSimulator.setName('Platform');
define([],function () {
    var WebSite={};
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
    return WebSite;
});

requireSimulator.setName('WebSite');
define(["FS","Platform"], function (FS,Platform) {
	var P=FS.PathUtil;
	var loc=document.location.href;
	var devMode=!!loc.match(/html\/dev\//) && !!loc.match(/localhost:3/);
	var WebSite;
	var prot=location.protocol;
	if (!prot.match(/^http/)) prot="https:";
	switch(window.WebSite_runType) {
	case "IDE":
		WebSite={
			urlAliases: {}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		};
		WebSite.builtinAssetNames={
			"images/Ball.png":1,
			"images/base.png":1,
			"images/Sample.png":1,
			"images/inputPad.png":1,
			"images/neko.png":1,
			"images/mapchip.png":1
		};
		if (!WebSite.pluginTop) {
			WebSite.pluginTop=WebSite.top+"/js/plugins";
		}
		WebSite.sampleImg=WebSite.top+"/images";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.mp4Disabled=WebSite.isNW;
		WebSite.tonyuHome="/Tonyu/";
		WebSite.PathSep="/";
		if (WebSite.isNW) {
			WebSite.noconcat=true;
			WebSite.PathSep=require("path").sep;
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
			if (loc.match(/edit\.tonyu\.jp\/n\//)) {
				WebSite.wwwDir=prot+"//"+location.host+"/n/";
			} else {
				// Why?
				WebSite.wwwDir=prot+"//"+location.host+"/";
			}
			WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
		}
		//WebSite.kernelDir=WebSite.top+"/Kernel/";
		// kernelDir must be absolute
		WebSite.kernelDir=P.rel(WebSite.wwwDir,"Kernel/");
		// compiledKernel is URL , not file path.
		// It is correct as long as the html pages in www/ (not html/build|dev )
		WebSite.compiledKernel="Kernel/js/concat.js";   //P.rel(WebSite.kernelDir,"js/concat.js");
		if (loc.match(/localhost\/tonyu2/)) {
			WebSite.wwwDir=prot+"//"+location.host+"/tonyu2/";
			WebSite.kernelDir=WebSite.wwwDir+"Kernel/";
			WebSite.compiledKernel=WebSite.kernelDir+"js/concat.js";
			WebSite.uploadTmpUrl=prot+"//localhost/tsite/tonyu/e/cgi-bin/uploadTmp.cgi";
			WebSite.newVersionUrl=prot+"//localhost/tsite/tonyu/project/newVersion.cgi";
		} else {
			WebSite.uploadTmpUrl=prot+"//edit.tonyu.jp/cgi-bin/uploadTmp.cgi";
			WebSite.newVersionUrl=prot+"//www.tonyu.jp/project/newVersion.cgi";
		}
		WebSite.version=2;
		WebSite.hoge="fuga";
		FS.setEnvProvider(new FS.Env(WebSite));
		return window.WebSite=WebSite;
	case "singleHTML":
		WebSite={
			urlAliases: {}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		};
		if (typeof BuiltinAssets==="object") {
			for (var k in BuiltinAssets) {
				WebSite.urlAliases[k]=BuiltinAssets[k];
			}
		}

		WebSite.tonyuHome="/Tonyu/";
		WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
		if (loc.match(/localhost\/tonyu2/)) {
			WebSite.scriptServer="http://localhost/tonyu2/";
		} else {
			WebSite.scriptServer="https://edit.tonyu.jp/";
		}
		WebSite.pluginTop=WebSite.scriptServer+"js/plugins";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.PathSep="/";
		WebSite.compiledKernel=WebSite.scriptServer+"Kernel/js/concat.js";
		FS.setEnvProvider(new FS.Env(WebSite));
		return window.WebSite=WebSite;
	case "multiHTML":
		WebSite={
			urlAliases: {}, top: ".",
			tablet:Platform.tablet,
			mobile:Platform.mobile
		};
		WebSite.tonyuHome="/Tonyu/";
		WebSite.pluginTop=WebSite.top+"/js/plugins";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.PathSep="/";
		WebSite.mp4Disabled=WebSite.isNW;
		if (WebSite.isNW) {
			WebSite.PathSep=require("path").sep;
			WebSite.cwd=P.directorify(process.cwd().replace(/\\/g,"/"));
			WebSite.platform=process.platform;
		}
		// this sets at runScript2.js
		//WebSite.compiledKernel=WebSite.top+"/js/kernel.js";
		//-------------
		FS.setEnvProvider(new FS.Env(WebSite));
		return window.WebSite=WebSite;
	}

	if (loc.match(/jsrun\.it/)) {
		WebSite={
			urlAliases: {
				"images/Ball.png":"http:"+"//jsrun.it/assets/9/X/T/b/9XTbt.png",
				"images/base.png":"http:"+"//jsrun.it/assets/6/F/y/3/6Fy3B.png",
				"images/Sample.png":"http:"+"//jsrun.it/assets/s/V/S/l/sVSlZ.png",
				"images/neko.png":"http:"+"//jsrun.it/assets/f/D/z/z/fDzze.png",
				"images/mapchip.png":"http:"+"//jsrun.it/assets/f/u/N/v/fuNvz.png"
			},top:"",devMode:devMode,
			pluginTop: "https://edit.tonyu.jp/js/plugins",
			removeJSOutput:true
		};
	} else if (
		loc.match(/tonyuexe\.appspot\.com/) ||
		loc.match(/localhost:8887/) ||
		(
		/*(
			loc.match(/^chrome-extension:/) ||
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
	if (typeof BuiltinAssets==="object") {
		for (var k in BuiltinAssets) {
			WebSite.urlAliases[k]=BuiltinAssets[k];
		}
	}
	WebSite.builtinAssetNames={
		"images/Ball.png":1,
		"images/base.png":1,
		"images/Sample.png":1,
		"images/neko.png":1,
		"images/mapchip.png":1
	};
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
	/*if (loc.match(/tonyuedit\.appspot\.com/) || loc.match(/localhost:8888/) ) {
		//WebSite.disableROM={"ROM_d.js":true};
	}*/
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
	WebSite.mp4Disabled=WebSite.isNW;
	WebSite.tonyuHome="/Tonyu/";
	WebSite.url={
		getDirInfo:WebSite.serverTop+"/getDirInfo",
		getFiles:WebSite.serverTop+"/File2LSSync",
		putFiles:WebSite.serverTop+"/LS2FileSync"
	};
	WebSite.PathSep="/";
	if (WebSite.isNW) {
		WebSite.PathSep=require("path").sep;
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
		WebSite.wwwDir=prot+"//"+location.host+"/";
		WebSite.projects=[P.rel(WebSite.tonyuHome,"Projects/")];
	}
	if (loc.match(/edit\.tonyu\.jp/) ||
		loc.match(/tonyuedit\.appspot\.com/) ||
		loc.match(/localhost:888/)) {
		//WebSite.kernelDir=WebSite.top+"/Kernel/";
		// kernelDir must be absolute
		WebSite.kernelDir=prot+"//"+location.host+"/Kernel/";
	}
	if (loc.match(/edit\.tonyu\.jp/) ||
		loc.match(/tonyuedit\.appspot\.com/) ||
		loc.match(/localhost:888/) ||
		WebSite.isNW) {
		WebSite.compiledKernel=WebSite.kernelDir+"js/concat.js";
	} else if (WebSite.serverType==="BA") {
		WebSite.compiledKernel=WebSite.runtime+"lib/tonyu/kernel.js";
	} else {
		WebSite.compiledKernel="https://edit.tonyu.jp/Kernel/js/concat.js";
		//WebSite.compiledKernel=prot+"//tonyuexe.appspot.com/Kernel/js/concat.js";
	}
	if (loc.match(/localhost\/tonyu2/)) {
		WebSite.wwwDir=prot+"//"+location.host+"/tonyu2/";
		WebSite.kernelDir=WebSite.wwwDir+"Kernel/";
		WebSite.compiledKernel=WebSite.kernelDir+"js/concat.js";
		WebSite.uploadTmpUrl=prot+"//localhost/tsite/tonyu/e/cgi-bin/uploadTmp.cgi";
		WebSite.newVersionUrl=prot+"//localhost/tsite/tonyu/project/newVersion.cgi";
	} else {
		WebSite.uploadTmpUrl=prot+"//edit.tonyu.jp/cgi-bin/uploadTmp.cgi";
		WebSite.newVersionUrl=prot+"//www.tonyu.jp/project/newVersion.cgi";
	}

	if (loc.match(/((index)|(project))2/)) {
		WebSite.version=2;
		if (WebSite.isNW) {
			WebSite.devMode=true;
		} else {
			WebSite.devMode=false;
		}
	}
	FS.setEnvProvider(new FS.Env(WebSite));
	return window.WebSite=WebSite;
});

requireSimulator.setName('plugins');
define(["WebSite"],function (WebSite){
    var plugins={};
    var installed= {
        box2d:{src: "Box2dWeb-2.1.a.3.min.js",detection:/BodyActor/,symbol:"Box2D" },
        timbre: {src:"timbre.js",symbol:"T" },
        gif: {src:"gif-concat.js",detection:/GIFWriter/,symbol:"GIF"},
        Mezonet: {src:"Mezonet.js", symbol: "Mezonet"},
        PicoAudio: {src:"PicoAudio.min.js", symbol:"PicoAudio"},
        // single js is required for runScript1.js
        jquery_ui: {src:"jquery-ui.js", detection:/\$InputBox/,symbol:"$.ui"}
    };
    plugins.installed=installed;
    plugins.detectNeeded=function (src,res) {
        for (var name in installed) {
            var d=installed[name].detection;
            if (d) {
                var r=d.exec(src);
                if (r) res[name]=1;
            }
        }
        return res;
    };
    plugins.loaded=function (name) {
        var i=installed[name];
        if (!i) throw new Error("plugin not found: "+name);
        return hasInGlobal(i.symbol);
    };
    function hasInGlobal(name) {
        // name: dot ok
        var g=window;
        name.split(".").forEach(function (e) {
            if (!g) return;
            g=g[e];
        });
        return g;
    }
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
        var reqj;
        if (typeof requireSimulator==="undefined") {
            if (typeof requirejs==="function") reqj=requirejs;
        } else {
            if (requireSimulator.real) reqj=requireSimulator.real.requirejs;
        }
        if (reqj) {
            src=src.replace(/\.js$/,"");
            console.log("Loading plugin via requirejs",src);
            reqj([src], function (res) {
                if (!window[i.symbol] && res) window[i.symbol]=res;
                options.onload(res);
            });
        } else {
            console.log("Loading plugin via <script>",src);
            var s=document.createElement("script");
            s.src=src;
            s.onload=options.onload;
            document.body.appendChild(s);
            //$("<script>").on("load",options.onload).attr("src",src).appendTo("body");
        }
        //setTimeout(options.onload,500);

    };
    plugins.request=function (name) {
        if (plugins.loaded(name)) return;
        var req=new Error("Plugin "+name+" required");
        req.pluginName=name;
    };
    return plugins;
});

requireSimulator.setName('DeferredUtil');
define(["FS"],function (FS){return FS.DeferredUtil;});

requireSimulator.setName('assert');
define(["FS"],function (FS){return FS.assert;});

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
				var u=window.navigator.userAgent.toLowerCase();
				/*if (WebSite.isNW && u.indexOf("mac")!=-1) {
					//Resolved in WebSite
					src = "/www/Kernel/js/concat.js";
				}*/
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
					if (typeof tonyu_app_version==="string") src+="?"+tonyu_app_version;
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
				var d=new $.Deferred();
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
		};
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
        var thisName,singletonName;
        if (pd.$this) {
            thisName=pd.$this;
        }
        if (pd.$singleton) {
            singletonName=pd.$singleton;
        }
        var init=wrap(pd.$) || function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        };
        var fldinit;
        var warn,wrapped,wrapCancelled;
        //var check;
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
                klass[name.substring(7)]=wrapStatic(pd[name]);
            } else {
                if (isPropDesc(pd[name])) {
                    Object.defineProperty(p,name,wrap(pd[name]));
                } else {
                    p[name]=wrap(pd[name]);
                }
            }
        }
        function wrapStatic(m) {
            if (!singletonName) return m;
            var args=getArgs(m);
            if (args[0]!==singletonName) return m;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(klass);
                return m.apply(klass,a);
            });
        }
        function wrap(m) {
            if (!thisName) return m;
            if (isPropDesc(m)) {
                for (var k in m) {
                    m[k]=wrap(m[k]);
                }
                return m;
            }
            if (typeof m!=="function") return m;
            if (thisName!==true) {
                var args=getArgs(m);
                if (args[0]!==thisName) {
                    wrapCancelled=true;
                    return m;
                }
                warn=true;
            }
            wrapped=true;
            return (function () {
                var a=Array.prototype.slice.call(arguments);
                a.unshift(this);
                return m.apply(this,a);
            });
        }
        p.$=init;
        Object.defineProperty(p,"$bind",{
            get: function () {
                if (!this.__bounded) {
                    this.__bounded=new Klass.Binder(this);
                }
                return this.__bounded;
            }
        });
        if (warn) {
            //console.warn("This declaration style may malfunction when minified");
            if (!wrapCancelled) {
                console.warn("Use $this:true instead");
            } else {
                console.warn("Use python style in all methods and Use $this:true instead");
            }
            try{throw new Error("Trace");}
            catch(e) {console.log(e.stack);}
        }
        return klass;
    };
    function getArgs(f) {
        var fpat=/function[^\(]*\(([^\)]*)\)/;
        var r=fpat.exec(f+"");
        if (r) {
            return r[1].replace(/\s/g,"").split(",");
        }
        return [];
    }
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
    Klass.Function=function () {throw new Error("Abstract");};
    Klass.opt=A.opt;
    Klass.Binder=Klass.define({
        $this:true,
        $:function (t,target) {
            function addMethod(k){
                if (typeof target[k]!=="function") return;
                t[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    //console.log(this, this.__target);
                    //A(this.__target,"target is not set");
                    return target[k].apply(target,a);
                };
            }
            for (var k in target) addMethod(k);
        }
    });
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
	var idSeq=1;
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
			this.id=idSeq++;
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
				if (!method) {
					var n=methodName.methodInfo ? methodName.methodInfo.name : methodName.name;
					throw new Error("メソッド"+n+"は待機可能メソッドではありません");
				}
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
				fb.gotoCatch(fb.wrapError(e));
				fb.stepsLoop();
			});
		},
		wrapError: function (e) {
			if (e instanceof Error) return e;
			var re=new Error(e);
			re.original=e;
			return re;
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
			// TODO: the prototype of class having tonyuIterator will iterate infinitively
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
	// old browser support
	if (typeof performance==="undefined") {
		window.performance = {};
	}
	if (!performance.now) {
		performance.now = function now() {
			return Date.now();
		};
	}

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
		// why use addMeta?
		// because when compiled from source, additional info(src file) is contained.
		// k.meta={...} erases these info
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
	klass.propReg=/^__([gs]et)ter__(.*)$/;
	klass.define=function (params) {
		// fullName, shortName,namspace, superclass, includes, methods:{name/fiber$name: func}, decls
		var parent=params.superclass;
		var includes=params.includes;
		var fullName=params.fullName;
		var shortName=params.shortName;
		var namespace=params.namespace;
		var methodsF=params.methods;
		var decls=params.decls;
		var nso=klass.ensureNamespace(Tonyu.classes, namespace);
		var outerRes;
		function chkmeta(m,ctx) {
			ctx=ctx||{};
			if (ctx.isShim) return m;
			ctx.path=ctx.path||[];
			ctx.path.push(m);
			if (m.isShim) {
				console.log("chkmeta::ctx",ctx);
				throw new Error("Shim found "+m.extenderFullName);
			}
			if (m.superclass) chkmeta(m.superclass,ctx);
			if (!m.includes) {
				console.log("chkmeta::ctx",ctx);
				throw new Error("includes not found");
			}
			m.includes.forEach(function (mod) {
				chkmeta(mod,ctx);
			});
			ctx.path.pop();
			return m;
		}
		function chkclass(c,ctx) {
			if (!c.prototype.hasOwnProperty("getClassInfo")) throw new Error("NO");
			if (!c.meta) {
				console.log("metanotfound",c);
				throw new Error("meta not found");
			}
			chkmeta(c.meta,ctx);
			return c;
		}
		function extender(parent,ctx) {
			var isShim=!ctx.init;
			var includesRec=ctx.includesRec;
			if (includesRec[fullName]) return parent;
			includesRec[fullName]=true;
			//console.log(ctx.initFullName, fullName);//,  includesRec[fullName],JSON.stringify(ctx));
			includes.forEach(function (m) {
				parent=m.extendFrom(parent,extend(ctx,{init:false}));
			});
			var methods=typeof methodsF==="function"? methodsF(parent):methodsF;
			if (typeof Profiler!=="undefined") {
				Profiler.profile(methods, fullName);
			}
			var init=methods.initialize;
			delete methods.initialize;
			var res;
			res=(init?
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
			res.prototype=bless(parent,{constructor:res});
			if (isShim) {
				res.meta={isShim:true,extenderFullName:fullName};
			} else {
				res.meta=addMeta(fullName,{
					fullName:fullName,shortName:shortName,namespace:namespace,decls:decls,
					superclass:ctx.nonShimParent ? ctx.nonShimParent.meta : null,
					includesRec:includesRec,
					includes:includes.map(function(c){return c.meta;})
				});
			}
			res.meta.func=res;
			// methods: res's own methods(no superclass/modules)
			res.methods=methods;
			var prot=res.prototype;
			/*includes.forEach(function (m) {
				if (!m.methods) throw m+" Does not have methods";
				for (var n in m.methods) {
					if (!(n in prot)) {
						prot[n]=m.methods[n];
						if (n!=="__dummy" && !prot[n]) {
							console.log("WHY2!",prot[n],prot,n);
							throw new Error("WHY2!"+n);
						}
					} else {
						if (prot[n]!==m.methods[n] && n!=="main" && n!=="fiber$main") {
						}
					}
				}
			});*/
			var props={};
			var propReg=klass.propReg;//^__([gs]et)ter__(.*)$/;
			for (var k in methods) {
				if (k.match(/^fiber\$/)) continue;
				prot[k]=methods[k];
				var fbk="fiber$"+k;
				if (methods[fbk]) {
					prot[fbk]=methods[fbk];
					prot[fbk].methodInfo=prot[fbk].methodInfo||{name:k,klass:res,fiber:true};
					prot[k].fiber=prot[fbk];
				}
				if (k!=="__dummy" && !prot[k]) {
					console.log("WHY!",prot[k],prot,k);
					throw new Error("WHY!"+k);
				}
				prot[k].methodInfo=prot[k].methodInfo||{name:k,klass:res};
				// if profile...
				var r=propReg.exec(k);
				if (r) {
					// __(r[1]g/setter)__r[2]
					props[r[2]]=props[r[2]]||{};
					props[r[2]][r[1]]=prot[k];
				}
			}
			prot.isTonyuObject=true;
			for (var k in props) {
				Object.defineProperty(prot, k , props[k]);
			}
			prot.getClassInfo=function () {
				return res.meta;
			};
			return chkclass(res,{isShim:isShim});
		}
		var res=extender(parent,{
			init:true,
			initFullName:fullName,
			includesRec:(parent?extend({},parent.meta.includesRec):{}),
			nonShimParent:parent
		});
		res.extendFrom=extender;
		//addMeta(fullName, res.meta);
		nso[shortName]=res;
		outerRes=res;
		return chkclass(res,{isShim:false});
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
		if (k.hasSemanticError) return true;
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
		if (!klass) return extend({},val);
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
	var lastLoopCheck=performance.now();
	var prevCheckLoopCalled;
	function checkLoop() {
		var now=performance.now();
		if (now-lastLoopCheck>1000) {
			resetLoopCheck(10000);
			throw new Error("無限ループをストップしました。\n"
				+"   プロジェクト オプションで無限ループチェックの有無を設定できます。\n"
				+"   [参考]https://edit.tonyu.jp/doc/options.html\n");
		}
		prevCheckLoopCalled=now;
	}
	function resetLoopCheck(disableTime) {
		lastLoopCheck=performance.now()+(disableTime||0);
	}
	function is(obj,klass) {
		if (!obj) return false;
		if (obj instanceof klass) return true;
		if (typeof obj.getClassInfo==="function" && klass.meta) {
			return obj.getClassInfo().includesRec[klass.meta.fullName];
		}
		return false;
	}
	setInterval(resetLoopCheck,16);
	return Tonyu={thread:thread, /*threadGroup:threadGroup,*/ klass:klass, bless:bless, extend:extend,
			globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
			timeout:timeout,animationFrame:animationFrame, /*asyncResult:asyncResult,*/
			bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,is:is,
			hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
			run:run,iterator:IT,checkLoop:checkLoop,resetLoopCheck:resetLoopCheck,DeferredUtil:DU,
			VERSION:1560828115159,//EMBED_VERSION
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
            //console.log("PP",sx,sy,w,h,dx,dy);
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

define('Util',[],function (){ return Util; });
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
            if (
                (WebSite.mp3Disabled && rel.match(/\.(mp3)$/)) ||
                (WebSite.mp4Disabled && rel.match(/\.(mp4|m4a)$/))
            ) {
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
	window.ImageList=IL;
    return IL;
});

requireSimulator.setName('T2MediaLib');
// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ

var T2MediaLib = (function(){
    function isPicoAudio(bgm) {
        return typeof PicoAudio!=="undefined" && bgm instanceof PicoAudio;
    }
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
        this.seSources=[];
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
        if (!this.context || this.disabled) {
            return null;
        }
        this.soundDataAry[idx] = new T2MediaLib_SoundData(idx);

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
    T2MediaLib.prototype.loadSound = function(idx, url, callbacks, isLoadAndDecode) { //@hoge1e3
        if (!this.context || this.disabled) {
            return null;
        }

        this.soundDataAry[idx] = new T2MediaLib_SoundData(idx);

        // midiがあったらpicoAudioを準備しておく
        if (url.match(/\.(midi?)$/) || url.match(/^data:audio\/mid/)) {
            if (this.picoAudio == null) {
                this.picoAudio = new PicoAudio(this.context);
            }
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3)$/,".ogg");
        }
        if (typeof WebSite=="object" && WebSite.mp4Disabled) {
            url=url.replace(/\.(mp4|m4a)$/,".ogg");
        }
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    that.soundDataAry[idx].onLoadComplete(arrayBuffer);
                    if (isLoadAndDecode) { // ロードとデコードをする
                        that.decodeSound(idx, callbacks);
                    } else { // ロードのみ
                        if (callbacks && callbacks.succ) callbacks.succ(idx);
                    }
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
            xhr.response=Util.Base64_To_ArrayBuffer( url.replace(/^data:audio\/[a-zA-Z0-9\-]+;base64,/i,""));
            xhr.status=200;
            xhr.onload();
        } else {
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            try {
                xhr.send(null);
            } catch(e) {
                this.soundDataAry[idx].onError("FILE_NOT_FOUND");
                if (callbacks && callbacks.err) callbacks.err(idx,that.soundDataAry[idx].errorID);
            }
        }
    };
    // サウンドのデコード
    T2MediaLib.prototype.decodeSound = function(idx, callbacks) {
        var soundData = this.soundDataAry[idx];
        if (soundData == null) return;
        if (soundData.fileData == null) return;
        if (!soundData.isLoadComplete()) return;
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
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.err == "function") {
                        callbacks.err(idx, this.soundDataAry[idx].errorID);
                    }
                });
                soundData.decodedCallbacksAry = null;
            } else {
                this.soundDataAry[idx].onDecodeComplete(data);
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.succ == "function") {
                        callbacks.succ(idx);
                    }
                });
                soundData.decodedCallbacksAry = null;
            }
        } else if (soundData.url.match(/\.mzo$/) || soundData.url.match(/^data:audio\/mzo/)) {
            console.log("Loading mzo");
            // MZO
            var that = this;
            var m=new Mezonet(this.context);//,{wavOutSpeed:50});
            var a=Array.prototype.slice.call( new Uint8Array(arrayBuffer) );
            //m.load(a);
            m.toAudioBuffer(a).then(function (data) {
                // デコード中にremoveDecodeSoundData()したらデータを捨てる
                console.log("MZO loaded",data);
                if (that.soundDataAry[idx].isDecoding()) {
                    that.soundDataAry[idx].onDecodeComplete(data.decodedData);
                    that.soundDataAry[idx].loopStart=data.loopStart;
                    soundData.decodedCallbacksAry.forEach(function(callbacks) {
                        if (typeof callbacks.succ == "function") {
                            callbacks.succ(idx);
                        }
                    });
                    soundData.decodedCallbacksAry = null;
                }
            },function (error) {
                if (error instanceof Error) {
                    console.log('T2MediaLib: '+error.message, soundData.url);//@hoge1e3
                } else {
                    console.log('T2MediaLib: Error decodeMZO()', soundData.url);//@hoge1e3
                }
                that.soundDataAry[idx].onError("DECODE_ERROR");
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.err == "function") {
                        callbacks.err(idx, that.soundDataAry[idx].errorID);
                    }
                });
                soundData.decodedCallbacksAry = null;
            }).finally(function () {
                m.terminate();
            });
        } else {
            // MP3, Ogg, AAC, WAV
            var that = this;
            var successCallback = function(audioBuffer) {
                // デコード中にremoveDecodeSoundData()したらデータを捨てる
                if (that.soundDataAry[idx].isDecoding()) {
                    that.soundDataAry[idx].onDecodeComplete(audioBuffer);
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
    // Chrome Autoplay Policy 対策
    T2MediaLib.prototype.activate = function () {
        this.init();
        if (!this.context) return;
        if (!this.isContextResumed && this.context.resume) { // fix Autoplay Policy in Chrome
            var that = this;
            this.context.resume().then(function () {
                that.isContextResumed = true;
            });
        }
        if (this.isActivated) return;
        this.isActivated=true;
        var buffer = this.context.createBuffer(1, Math.floor(this.context.sampleRate/32), this.context.sampleRate);
        var ary = buffer.getChannelData(0);
        for (var i = 0; i < ary.length; i++) {
             ary[i] = 0; // 無音化
        }
        var source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
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
        durationStart = duration;
        if (!duration) {
            //duration=undefined; // iOS9でduration==undefinedだとsource.start(start, offset, duration);でエラー発生する
            durationStart = 86400; // Number.MAX_SAFE_INTEGERを入れてもiOS9ではエラー起きないけど、昔なんかの環境で数値大き過ぎるとエラーになって86400(24時間)に設定した気がする
        }
        if (!loop) loop = false;
        if (!loopStart) {
            loopStart = soundData.loopStart||0.0;
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
        source.start(start, offset, durationStart);
        // iOS, Firefoxではloopがtrueのときdurationを指定しても止まらない
        // iOSではstopを２回以上呼ぶと、InvalidStateErrorが発生するので注意
        if (loop && duration != null) source.stop(start + duration);
        var t=this;
        t.seSources.push(source);
        source.onended = function(event) {
            source.onended = null;
            var idx=t.seSources.indexOf(source);
            if (idx>=0) t.seSources.splice(idx,1);
        };
        return source;
    };
    T2MediaLib.prototype.stopSE = function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        try {
            sourceObj.stop(0);
        } catch(e) { // iOS対策
            // iOSではstopを２回以上呼ぶと、InvalidStateErrorが発生する
            if (sourceObj.gainNode) {
                sourceObj.gainNode.gain.cancelScheduledValues(this.context.currentTime);
                sourceObj.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime);
            }
        }
        return sourceObj;
    };
    T2MediaLib.prototype.stopAllSE = function(sourceObj) {
        var t=this;
        this.seSources.forEach(function (s) {
            t.stopSE(s);
        });
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
    function isPicoAudio(bgm) {
        return typeof PicoAudio!=="undefined" && bgm instanceof PicoAudio;
    }
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
                var bgmLengthTime = this.picoAudio.getTime(Number.MAX_SAFE_INTEGER);
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
        if (isPicoAudio(bgm)) {
            // Midi
            this.picoAudio.stop();
        } else if (bgm instanceof AudioBufferSourceNode) {
            // MP3, Ogg, AAC, WAV
            try {
                bgm.stop(0);
            } catch(e) { // iOS対策
                // iOSではstopを２回以上呼ぶと、InvalidStateErrorが発生する
                if (bgm.gainNode) {
                    bgm.gainNode.gain.cancelScheduledValues(this.context.currentTime);
                    bgm.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime);
                }
            }
        }
        this.playingBGM = null;
        this.playingBGMName = null;
        this._setPlayingBGMState("stop");
        return this;
    };

    T2MediaLib_BGMPlayer.prototype.pauseBGM = function() {
        var bgm = this.playingBGM;
        if (isPicoAudio(bgm)) {
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
                try {
                    bgm.stop(0);
                } catch(e) { // iOS対策
                    // iOSではstopを２回以上呼ぶと、InvalidStateErrorが発生する
                    if (bgm.gainNode) {
                        bgm.gainNode.gain.cancelScheduledValues(this.context.currentTime);
                        bgm.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime);
                    }
                }
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
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
        if (isPicoAudio(bgm)) {
            // Midi
            var time;
            if (this.bgmPause === 0) {
                time = this.picoAudio.context.currentTime - this.picoAudio.states.startTime;
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
        if (isPicoAudio(bgm)) {
            // Midi
            return this.picoAudio.getTime(Number.MAX_SAFE_INTEGER);
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
        this.idx = idx;
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

    T2MediaLib_SoundData.prototype.isNone = function() {
        return this.state == "none";
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

define('T2MediaLib',[],function (){ return T2MediaLib; });
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
        $.data(res,"edits",$edits);
        $.data(res,"vars",$vars);
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
            return $(document.createTextNode(str));
            //return $("<span>").text(str);
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
    function isPrimitive(mesg) {
        return (typeof mesg==="string" ||
        typeof mesg==="number" ||
        typeof mesg==="boolean");
    }
    function parseMesg(mesg,defTitle) {
        if (mesg==null) mesg="";
        if (isPrimitive(mesg)) {
            return {title:defTitle,body:multiLine(mesg)};
        } else if ( (typeof $!=="undefined") && mesg instanceof $) {
            return {
                title:mesg.title||defTitle,
                body:mesg
            };
        } else {
            if (isPrimitive(mesg.body)) mesg.body=multiLine(mesg.body);
            return mesg;
        }
    }
    function multiLine(mesg) {
        var lines=(mesg+"").split("\n");
        if (lines.length==1) return lines[0];
        return UI.apply(this,["div"].concat(lines.map(function (e) {
            return ["div",e];
        })));
    }
    UIDiag.confirm=function (mesg) {
        mesg=parseMesg(mesg,"確認");
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["button",{on:{click:sendF(true)}},"OK"],
                ["button",{on:{click:sendF(false)}},"キャンセル"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    UIDiag.alert=function (mesg) {
        mesg=parseMesg(mesg,"確認");
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["button",{on:{click:sendF(true)}},"OK"]).dialog({width:"auto",close:sendF(false)});
        var d=$.Deferred();
        function sendF(r) {
            return function () { d.resolve(r); di.dialog("close"); di.remove(); };
        }
        return d.promise();
    };
    // Compat with $InputBox
    UIDiag.open=function(title,prompt,_default, left, top, width, height) {
        return UIDiag.prompt({title:title,body:prompt},_default,{
            left:left, top:top, width:width, height:height
        });
    };
    UIDiag.getStatus=function () {return UIDiag.status;};
    UIDiag.getText=function () {return UIDiag.val? UIDiag.val.val():"";};
    //---
    UIDiag.prompt=function (mesg,value,geom) {
        mesg=parseMesg(mesg,"入力");
        geom=geom||{};
        if (typeof geom.left==="number" && typeof geom.top==="number") {
            position={my:"left top",at:"left+"+geom.left+" top+"+geom.top, of:"body"};
        } else {
            position={of:"body",at:"center",my:"center"};
        }
        var di=UI("div",{title:mesg.title},["div",mesg.body],
                ["input",{on:{enterkey:ok},$var:"val", value:value}],["br"],
                ["button",{on:{click:ok}},"OK"],
                ["button",{on:{click:cancel}},"キャンセル"]).dialog({
                    width:geom.width||"auto",
                    height:geom.height||"auto",
                    position:position,
                    close:function (){
                        di.dialog("close");
                        d.resolve();
                    }
                });
        setTimeout(function () {
            di.$vars.val.focus();
            //console.log("FOcus");
        },10);
        UIDiag.status=0;
        UIDiag.val=di.$vars.val;
        var d=$.Deferred();
        function ok() {
            UIDiag.status=1;
            var r=di.$vars.val.val();
            UIDiag.resultValue=r;
            d.resolve(r);
            di.dialog("close");
            di.remove();
        }
        function cancel() {
            UIDiag.status=2;
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
/*global requirejs*/
requirejs(["ImageList","T2MediaLib","Tonyu","UIDiag"],
function (i,t,tn,u) {
    console.log("runtimes loaded",arguments);
    if (!window.T2MediaLib) window.T2MediaLib=t;
});

requireSimulator.setName('LSFS');
define(["FS"],function (FS){return FS.LSFS;});

requireSimulator.setName('NativeFS');
define(["FS"],function (FS){return FS.NativeFS;});

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
			return 0;
		}

		var margin = getMargin();
		var w=$(window).width();
		var h=$(window).height();
		$("body").css({overflow:"hidden", margin:"0px"});
		var cv=$("<canvas>").attr({width: w-margin, height:h-margin, class:"tonyu-canvas"}).appendTo("body");
		Tonyu.globals.$mainCanvas=cv;

		var u = navigator.userAgent.toLowerCase();
		if ((u.indexOf("iphone") == -1
			&& u.indexOf("ipad") == -1
			&& u.indexOf("ipod") == -1
			) && (!window.parent || window === window.parent)) {
			$(window).resize(onResize);
			function onResize() {
				var margin = getMargin();
				w=$(window).width();
				h=$(window).height();
				cv.attr({width: w-margin, height: h-margin});
			}
		}

		var curProjectDir;
		if (WebSite.isNW) {
			var cur=process.cwd().replace(/\\/g,"/");
			var prj=location.href.replace(/^chrome-extension:\/\/\w*/,"");
			home=FS.get(cur+prj);
			if (!home.isDir()) home=home.up();
			curProjectDir=home;
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
		if (WebSite.serverType==="BA" && window.runtimePath) {//ADDBA
			WebSite.compiledKernel=window.runtimePath+"lib/tonyu/kernel.js";
		}
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

});
