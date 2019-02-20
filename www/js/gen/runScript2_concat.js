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
	// Created at Wed Feb 20 2019 12:48:03 GMT+0900 (東京 (標準時))
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
			"images/neko.png":1,
			"images/mapchip.png":1,
			"images/inputPad.png":1
		};
		if (!WebSite.pluginTop) {
			WebSite.pluginTop=WebSite.top+"/js/plugins";
		}
		WebSite.sampleImg=WebSite.top+"/images";
		WebSite.isNW=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
		WebSite.mp3Disabled=WebSite.isNW;
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
		WebSite.mp3Disabled=WebSite.isNW;
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
				"images/mapchip.png":"http:"+"//jsrun.it/assets/f/u/N/v/fuNvz.png",
				"images/inputPad.png":"http:"+"//jsrun.it/assets/r/K/T/Y/rKTY9.png"
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
		"images/mapchip.png":1,
		"images/inputPad.png":1
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
	WebSite.mp3Disabled=WebSite.isNW;
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
        timbre: {src:"timbre.js",detection:/\bplay(SE)?\b/,symbol:"T" },
        gif: {src:"gif-concat.js",detection:/GIFWriter/,symbol:"GIF"},
        // single js is required for runScript1.js
        jquery_ui: {src:"jquery-ui.js", detection:/\$InputBox/,symbol:"$.ui"}
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
            var args=getArgs(m);
            if (args[0]!==thisName) return m;
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
    Klass.Function=function () {throw new Exception("Abstract");}
    Klass.opt=A.opt;
    Klass.Binder=Klass.define({
        $this:"t",
        $:function (t,target) {
            for (var k in target) (function (k){
                if (typeof target[k]!=="function") return;
                t[k]=function () {
                    var a=Array.prototype.slice.call(arguments);
                    //console.log(this, this.__target);
                    //A(this.__target,"target is not set");
                    return target[k].apply(target,a);
                };
            })(k);
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
			throw new Error("無限ループをストップしました"+(now-prevCheckLoopCalled));
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
			VERSION:1550634424863,//EMBED_VERSION
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
	window.ImageList=IL;
    return IL;
});

requireSimulator.setName('PicoAudio');
'use strict';
var PicoAudio = (function(){
	function PicoAudio(_audioContext, _picoAudio){
		this.debug = false;
		this.isStarted = false;
		this.isPlayed = false;
		this.isTonyu2 = true;
		this.settings = {
			masterVolume: 1,
			generateVolume: 0.15,
			tempo: 120,
			basePitch: 440,
			resolution: 480,
			isWebMIDI: false,
			WebMIDIPortOutputs: null,
			WebMIDIPortOutput: null,
			WebMIDIPort: -1, // -1:auto
			WebMIDIPortSysEx: true, // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない？)
			isReverb: true, // リバーブONにするか
			reverbVolume: 1.5,
			isChorus: true,
			chorusVolume: 0.5,
			isCC111: true,
			loop: false,
			isSkipBeginning: this.isTonyu2, // 冒頭の余白をスキップ(Tonyu2はtrue)
			isSkipEnding: true, // 末尾の空白をスキップ
			holdOnValue: 64,
			maxPoly: -1, // 同時発音数 -1:infinity
			maxPercPoly: -1, // 同時発音数(パーカッション) -1:infinity
			isOfflineRendering: false, // TODO 演奏データを作成してから演奏する
			isSameDrumSoundOverlap: false // 同じドラムの音が重なることを許容するか
		};
		this.trigger = { isNoteTrigger: true, noteOn: function(){}, noteOff: function(){}, songEnd: function(){} };
		this.states = { isPlaying: false, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0
			, playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:50, updateBufMaxTime:150, updateIntervalTime:0
		 	, latencyLimitTime:0 };
		this.hashedDataList = [];
		this.hashedMessageList = [];
		this.playData = null;
		this.channels = [];
		this.tempoTrack = [{ timing:0, value:120 },{ timing:0, value:120 }];
		this.cc111Time = -1;
		this.onSongEndListener = null;

		for(var i=0; i<17; i++)
			this.channels.push([0,0,1]);
		// AudioContextがある場合はそのまま初期化、なければAudioContextを用いる初期化をinit()で
		if(_audioContext){
			this.init(_audioContext, _picoAudio);
		}

		// Fallback
		// Unsupport performance.now()
		if (typeof performance==="undefined") {
			window.performance = {};
		}
		if (!performance.now) {
			performance.now = function now() {
				return Date.now();
			};
		}
		// Unsupport Number.MAX_SAFE_INTEGER
		if (!Number.MAX_SAFE_INTEGER) {
			Number.MAX_SAFE_INTEGER = 9007199254740991;
		}
	}

	PicoAudio.prototype.init = function(_audioContext, _picoAudio){
		this.isStarted = true;
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = _audioContext ? _audioContext : new AudioContext();
		if(_picoAudio && _picoAudio.whitenoise){ // 使いまわし
			this.whitenoise = _picoAudio.whitenoise;
		} else {
			this.whitenoise = this.context.createBuffer(2, this.context.sampleRate, this.context.sampleRate);
			// 乱数パターンを固定にする（Math.random()を使わない）
			// Xorshiftアルゴリズム
			var x = 123456789;
			var y = 362436069;
			var z = 521288629;
			var w = 8867512;
			for (var ch=0; ch<2; ch++){
				for (var i=0; i<this.context.sampleRate; i++){
					var t = x ^ (x << 11);
					x = y; y = z; z = w;
					var r = w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
					r = Math.abs(r) / 2147483648 % 2;
					this.whitenoise.getChannelData(ch)[i] = r * 2 - 1;
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
		// リバーブ用
		this.convolver = this.context.createConvolver();
		this.convolver.buffer = this.impulseResponse;
		this.convolver.normalize = true;
		this.convolverGainNode = this.context.createGain();
		this.convolverGainNode.gain.value = this.settings.reverbVolume;
		this.convolver.connect(this.convolverGainNode);
		this.convolverGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(this.context.destination);

		// コーラス用
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
		
		// リバーブON設定を引き継ぐ。未設定ならパフォーマンス計測する(Tonyu2用)
		if(this.isTonyu2){
			if(_picoAudio){
				this.settings.isReverb = _picoAudio.settings.isReverb;
			} else {
				this.settings.isReverb = this.measurePerformanceReverb();
			}
		}
	}

	PicoAudio.prototype.createNote = function(option){
		var note = this.createBaseNote(option, false, true, false, true); // oscillatorのstopはこちらで実行するよう指定
		if(note.isGainValueZero) return null;

		var oscillator = note.oscillator;
		var gainNode = note.gainNode;
		var stopGainNode = note.stopGainNode;
		var isPizzicato = false;
		var isNoiseCut = false;
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

		// 音の終わりのプチプチノイズが気になるので、音の終わりに5ms減衰してノイズ軽減
		if((oscillator.type == "sine" || oscillator.type == "triangle")
			&& !isPizzicato && note.stop - note.start > 0.01){
			isNoiseCut = true;
		}

		// 音色別の減衰　書き方ミスったなあ
		switch(this.channels[note.channel][1]/10 || option.instrument){
			// ピッチカート系減衰
			case 0.2:
			case 12: case 13: case 45: case 55:
			{
				isPizzicato = true;
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+0.2);
				that.stopAudioNode(oscillator, note.start+0.2, stopGainNode);
				break;
			}
			// ピアノ程度に伸ばす系
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  9: case 11: case 14: case 15:
			case 32: case 36: case 37: case 46: case 47:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				var decay = (128-option.pitch)/64;
				gainNode.gain.setTargetAtTime(0, note.start, 2.5*decay*decay);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				break;
			}
			// ギター系
			case 0.4:
			case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 34:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.0+note.velocity*4);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
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
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				break;
			}
			case 119: // Reverse Cymbal
			{
				gainNode.gain.value = 0;
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				var note2 = this.createBaseNote(option, true, true);
				if(note2.isGainValueZero) break;
				note2.oscillator.playbackRate.setValueAtTime((option.pitch+1)/128, note.start);
				note2.gainNode.gain.setValueAtTime(0, note.start);
				note2.gainNode.gain.linearRampToValueAtTime(1.3, note.start+2);
				that.stopAudioNode(note2.oscillator, note.stop, note2.stopGainNode);
				break;
			}
			default:{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
			}
		}

		return function(){
			that.stopAudioNode(oscillator, 0, stopGainNode, true);
			if (note2 && note2.oscillator) that.stopAudioNode(note2.oscillator, 0, note2.stopGainNode, true);
		};
	};

	PicoAudio.prototype.createPercussionNote = function(option){
		var note = this.createBaseNote(option, true, false);
		if(note.isGainValueZero) return null;

		var source = note.oscillator;
		var gainNode = note.gainNode;
		var stopGainNode = note.stopGainNode;
		var start = note.start;
		var velocity = 1; // ドラム全体の音量調整用
		var note2 = this.createBaseNote(option, false, false, true);
		var oscillator = note2.oscillator;
		var gainNode2 = note2.gainNode;
		var stopGainNode2 = note2.stopGainNode;
		var nextSameNoteOnInterval = option.nextSameNoteOnInterval;
		var that = this;

		// oscillator.frequency.setValueAtTime()がcurrentTimeより遅れると周波数設定がされないので対策
		if (start < this.context.currentTime) start = this.context.currentTime;
		var stopAudioTime = 0;
		var stopAudioTime2 = 0;
		switch(option.pitch){
			// Bass Drum
			case 35: // Acoustic Bass Drum
			case 36: // Bass Drum
				// w
				source.playbackRate.value = 0.25;
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.7, start+0.004);
				gainNode.gain.linearRampToValueAtTime(0, start+0.008);
				stopAudioTime = 0.008;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==35 ? 90 : 160, start);
				oscillator.frequency.linearRampToValueAtTime(40, start+0.08);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.02);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime2 = 0.08;
				break;
			// Snare Drum
			case 37: // Side Stick
				// w
				source.playbackRate.value = 0.26;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.041);
				stopAudioTime = 0.041;
				// s
				oscillator.frequency.setValueAtTime(330, start);
				oscillator.frequency.linearRampToValueAtTime(120, start+0.02);
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.02);
				stopAudioTime2 = 0.02;
				break;
			case 38: // Acoustic Snare
			case 40: // Electric Snare
				var len = option.pitch==38 ? 0.25 : 0.2;
				// w
				source.playbackRate.value = 0.7;
				gainNode.gain.setValueAtTime(velocity, start);
				gainNode.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime = len;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==38 ? 140 : 200, start);
				oscillator.frequency.linearRampToValueAtTime(option.pitch==38 ? 100 : 160, start+0.1);
				gainNode2.gain.setValueAtTime(velocity*2, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.1);
				stopAudioTime2 = 0.1;
				break;
			case 39: // Hand Clap
				// w
				source.playbackRate.value = 0.5;
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode.gain.setValueAtTime(velocity*1.3, start+0.0101);
				gainNode.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode.gain.setValueAtTime(velocity*1.3, start+0.0201);
				gainNode.gain.linearRampToValueAtTime(0, start+0.09);
				stopAudioTime = 0.09;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(180, start);
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode2.gain.setValueAtTime(velocity*0.8, start+0.0101);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode2.gain.setValueAtTime(velocity*0.8, start+0.0201);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.030);
				stopAudioTime2 = 0.11;
				break;
			// Toms
			case 41: // Low Floor Tom
			case 43: // High Floor Tom
			case 45: // Low Tom
			case 47: // Low-Mid Tom
			case 48: // High-Mid Tom
			case 50: // High Tom
				var len = (option.pitch-41+(option.pitch>=48 ? 1 : 0));
				// w
				source.playbackRate.value = 0.3+len/45;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.02);
				stopAudioTime = 0.02;
				// s
				oscillator.frequency.setValueAtTime(90+15*len, start);
				oscillator.frequency.linearRampToValueAtTime(30+7.5*len, start+0.5-len/35);
				gainNode2.gain.setValueAtTime(velocity*1.5, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.5-len/35);
				stopAudioTime2 = 0.5-len/35;
				break;
			// Hi-hat
			case 42: // Closed High-Hat
			case 44: // Pedal High-Hat
				// w
				source.playbackRate.value = 1;
				if(option.pitch==42){
					gainNode.gain.setValueAtTime(velocity*0.8, start);
				}else{
					gainNode.gain.setValueAtTime(0, start);
					gainNode.gain.linearRampToValueAtTime(velocity*0.8, start+0.014);
				}
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 46: // Open Hihat
				// w
				source.playbackRate.setValueAtTime(0.35, start);
				source.playbackRate.linearRampToValueAtTime(0.6, start+0.1);
				source.playbackRate.linearRampToValueAtTime(1, start+0.3);
				gainNode.gain.setValueAtTime(velocity*1.1, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 1.5;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			// Cymbal
			case 49: // Crash Cymbal 1
			case 57: // Crash Cymbal 2
				// w
				var r = option.pitch==49 ? 0.3 : 0.5;
				var r2 = option.pitch==49 ? 0.4 : 0.7;
				source.playbackRate.setValueAtTime(r, start);
				source.playbackRate.linearRampToValueAtTime(r2, start+0.15);
				source.playbackRate.linearRampToValueAtTime(0.9, start+0.4);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 51: // Ride Cymbal 1
			case 59: // Ride Cymbal 2
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				var f = option.pitch==51 ? 372 : 400;
				oscillator.frequency.setValueAtTime(f, start);
				gainNode2.gain.setValueAtTime(velocity*0.4, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 52: // Chinese Cymbal
				// w
				source.playbackRate.setValueAtTime(0.17, start);
				source.playbackRate.linearRampToValueAtTime(0.25, start+0.1);
				source.playbackRate.linearRampToValueAtTime(0.5, start+0.6);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(382, start);
				gainNode2.gain.setValueAtTime(velocity*0.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 53: // Ride Bell
				// w
				source.playbackRate.setValueAtTime(0.6, start);
				gainNode.gain.setValueAtTime(velocity, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(377, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 55: // Splash Cymbal
				// w
				source.playbackRate.setValueAtTime(0.5, start);
				source.playbackRate.linearRampToValueAtTime(0.8, start+0.1);
				source.playbackRate.linearRampToValueAtTime(1, start+0.6);
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 1.75;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			// Bell
			case 54: // Tambourine
			case 56: // Cowbell
				// w
				source.playbackRate.setValueAtTime(1, start);
				var v = option.pitch==54 ? 1 : 0.4;
				var len = option.pitch==54 ? 0.01 : 0;
				gainNode.gain.setValueAtTime(velocity*v/2, start);
				gainNode.gain.linearRampToValueAtTime(velocity*v, start+len);
				gainNode.gain.setTargetAtTime(0, start+len, 0.05);
				stopAudioTime = 0.3;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==54 ? 6000 : 495, start);
				var v = option.pitch==54 ? 1 : 2;
				gainNode2.gain.setValueAtTime(velocity*v/2, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*v, start+len);
				gainNode2.gain.setTargetAtTime(0, start+len, 0.05);
				stopAudioTime2 = 0.3;
				break;
			case 58: // Vibraslap
				// w s
				source.playbackRate.setValueAtTime(0.6, start);
				source.playbackRate.linearRampToValueAtTime(1, start+0.8);
				var len = 40;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				for(var i=0; i<len; i++){
					gainNode.gain.linearRampToValueAtTime(velocity*0.1*(len-i)/len, start+i/len*0.8);
					gainNode.gain.linearRampToValueAtTime(velocity*1.5*(len-(i+1))/len, start+(i+0.99)/len*0.8);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.025*(len-i)/len, start+i/len*0.8);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.25*(len-(i+1))/len, start+(i+0.99)/len*0.8);
				}
				gainNode.gain.linearRampToValueAtTime(0, start+0.8);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.8);
				stopAudioTime = 0.8;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(1000, start);
				stopAudioTime2 = 0.8;
				break;
			case 80: // Mute Triangle
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.015);
				stopAudioTime = 0.2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(6000, start);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.02);
				stopAudioTime2 = 0.3;
				break;
			case 81: // Open Triangle
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.08);
				stopAudioTime = 0.75;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(6000, start);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.18);
				stopAudioTime2 = 1;
				break;
			// Other Percussion
			case 60: // High Bongo
			case 61: // Low Bongo
			case 62: // Mute High Conga
			case 63: // Open High Conga
			case 64: // Low Conga
				var p = option.pitch;
				var r = p==60 ? 700　: p==61 ? 282 : p==62 ? 385 : p==63 ? 295 : 210;
				var len = p==60 ? 0.08 : p==61 ? 0.1 : p==62 ? 0.03 : p==63 ? 0.12 : 0.15;
				// w
				source.playbackRate.value = 0.03;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				stopAudioTime = 0.03;
				// s
				oscillator.frequency.setValueAtTime(r*0.97, start);
				oscillator.frequency.linearRampToValueAtTime(r, start+len);
				gainNode2.gain.setValueAtTime(velocity*1.8, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			case 65: // High Timbale
			case 66: // Low Timbale
				var len = option.pitch==65 ? 0.22 : 0.25;
				// w
				source.playbackRate.setValueAtTime(option.pitch==65 ? 0.25 : 0.22, start);
				source.playbackRate.linearRampToValueAtTime(option.pitch==65 ? 0.2 : 0.18, start+len);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.2, start+len/3.5);
				gainNode.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime = len;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==65 ? 190*1.07 : 136*1.07, start);
				oscillator.frequency.linearRampToValueAtTime(option.pitch==65 ? 190 : 136, start+0.1);
				gainNode2.gain.setValueAtTime(velocity*3.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.08);
				stopAudioTime2 = 1;
				break;
			case 67: // High Agogo
			case 68: // Low Agogo
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.1, start+0.02);
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==67 ? 1430 : 1055, start);
				gainNode2.gain.setValueAtTime(velocity*2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.06);
				stopAudioTime2 = 0.75;
				break;
			case 69: // Cabasa
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.3, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.8, start+0.03);
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 70: // Maracas
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.06);
				stopAudioTime = 0.06;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 71: // Short Whistle
			case 72: // Long Whistle
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				var len = option.pitch==71 ? 0.07 : 0.4;
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==71 ? 2408 : 2105, start);
				gainNode2.gain.setValueAtTime(0, start);
				for(var i=0; i<len*74; i++){
					gainNode2.gain.linearRampToValueAtTime(velocity*2.5, start+(i+0.2)/75);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.5, start+(i+0.9)/75);
				}
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			case 73: // Short Guiro
			case 74: // Long Guiro
				// w
				var len = option.pitch==73 ? 0.05 : 0.35;
				source.playbackRate.setValueAtTime(option.pitch==73 ? 0.2 : 0.2, start);
				source.playbackRate.linearRampToValueAtTime(option.pitch==73 ? 0.7 : 0.5, start+len);
				gainNode.gain.value = velocity*0.2;
				for(var i=0; i<len*100; i++){
					gainNode.gain.setValueAtTime(velocity*0.4, start+i/100);
					gainNode.gain.setValueAtTime(velocity*0.9, start+(i+0.7)/100);
				}
				stopAudioTime = len;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 75: // Claves
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				oscillator.frequency.setValueAtTime(2181, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.setValueAtTime(velocity*2, start+0.005);
				gainNode2.gain.linearRampToValueAtTime(velocity*1, start+0.015);
				gainNode2.gain.linearRampToValueAtTime(velocity*1.5, start+0.025);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime2 = 0.1;
				break;
			case 76: // High Wood Block
			case 77: // Low Wood Block
				// w
				source.playbackRate.value = 0.1;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.015);
				stopAudioTime = 0.015;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==76 ? 800 : 600, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.005);
				gainNode2.gain.setTargetAtTime(0, start+0.005, 0.02);
				stopAudioTime2 = 0.2;
				break;
			case 78: // Close Cuica
			case 79: // Open Cuica
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				var len = 0.18;
				var f = option.pitch==78 ? 750 : 270;
				oscillator.frequency.setValueAtTime(f, start);
				oscillator.frequency.linearRampToValueAtTime(f, start+len/3);
				if (option.pitch==78) oscillator.frequency.linearRampToValueAtTime(f*0.9, start+len);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*1.5, start+0.005);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.5, start+0.02);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.04);
				gainNode2.gain.linearRampToValueAtTime(velocity*2, start+len/4*3);
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			// GS, GM2
			case 27: // High Q
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.002);
				stopAudioTime = 0.002;
				// s
				oscillator.frequency.setValueAtTime(1500, start);
				oscillator.frequency.linearRampToValueAtTime(280, start+0.015);
				oscillator.frequency.linearRampToValueAtTime(0, start+0.07);
				gainNode2.gain.setValueAtTime(velocity*1.9, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.07);
				stopAudioTime2 = 0.07;
				break;
			case 28: // Slap
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode.gain.setValueAtTime(velocity*1.1, start+0.0101);
				gainNode.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode.gain.setValueAtTime(velocity*0.9, start+0.0201);
				gainNode.gain.setTargetAtTime(0, start+0.0201, 0.03);
				stopAudioTime = 0.2;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 29: // Scratch Push
			case 30: // Scratch Pull
				var t1 = option.pitch==29 ? 0.05 : 0.07;
				var t2 = option.pitch==29 ? 0.06 : 0.09;
				var t3 = option.pitch==29 ? 0.07 : 0.11;
				var t4 = option.pitch==29 ? 0.1 : 0.15;
				var t5 = option.pitch==29 ? 0.25 : 0.4;
				// w
				var r1 = option.pitch==29 ? 0.1 : 0.06;
				var r2 = option.pitch==29 ? 0.3 : 0.2;
				var r3 = option.pitch==29 ? 0.18 : 0.12;
				source.playbackRate.setValueAtTime(r1, start);
				source.playbackRate.linearRampToValueAtTime(r2, start+t1);
				source.playbackRate.linearRampToValueAtTime(0, start+t2);
				source.playbackRate.linearRampToValueAtTime(r2, start+t3);
				source.playbackRate.linearRampToValueAtTime(r3, start+t4);
				source.playbackRate.linearRampToValueAtTime(0, start+t5);
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.4, start+t1);
				gainNode.gain.linearRampToValueAtTime(velocity*0.1, start+t3);
				gainNode.gain.linearRampToValueAtTime(velocity*0.3, start+t4);
				gainNode.gain.linearRampToValueAtTime(0, start+t5);
				stopAudioTime = t5;
				// s
				var r4 = option.pitch==29 ? 500 : 400;
				var r5 = option.pitch==29 ? 1950 : 1200;
				var r6 = option.pitch==29 ? 430 : 250;
				oscillator.frequency.setValueAtTime(r4, start);
				oscillator.frequency.linearRampToValueAtTime(r5, start+t1);
				oscillator.frequency.linearRampToValueAtTime(0, start+t2);
				oscillator.frequency.linearRampToValueAtTime(r5, start+t3);
				oscillator.frequency.linearRampToValueAtTime(r6, start+t4);
				oscillator.frequency.linearRampToValueAtTime(0, start+t5);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.7, start+t1);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.2, start+t3);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.6, start+t4);
				gainNode2.gain.linearRampToValueAtTime(0, start+t5);
				stopAudioTime2 = t5;
				break;
			case 31: // Sticks
				// w
				source.playbackRate.setValueAtTime(0.4, start);
				source.playbackRate.linearRampToValueAtTime(0.5, start+0.015);
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.setTargetAtTime(0, start, 0.035);
				stopAudioTime = 0.3;
				// s
				oscillator.frequency.setValueAtTime(3140, start);
				gainNode2.gain.setValueAtTime(velocity*1.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.012);
				stopAudioTime2 = 0.3;
				break;
			case 32: // Square Click
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				oscillator.type = "square";
				oscillator.frequency.setValueAtTime(333, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*4, start+0.0016);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.0032);
				stopAudioTime2 = 0.0032;
				break;
			case 33: // Metronome Click
			case 34: // Metronome Bell
				// w
				source.playbackRate.setValueAtTime(0.17, start);
				source.playbackRate.linearRampToValueAtTime(0.22, start+0.01);
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.015);
				stopAudioTime = 0.3;
				// s
				if (option.pitch==34) {
					oscillator.frequency.setValueAtTime(2040, start);
					gainNode2.gain.setValueAtTime(velocity*1, start);
					gainNode2.gain.setTargetAtTime(0, start, 0.12);
					stopAudioTime2 = 1.1;
				} else {
					gainNode2.gain.value = 0;
					stopAudioTime2 = 0;
				}
				break;
			case 82: // Shaker
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(velocity, start+0.02);
				gainNode.gain.linearRampToValueAtTime(0, start+0.07);
				stopAudioTime = 0.07;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 83: // Jingle Bell
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*1.2, start+0.015);
				gainNode.gain.setTargetAtTime(0, start+0.015, 0.06);
				stopAudioTime = 0.5;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(2709, start);
				oscillator.frequency.linearRampToValueAtTime(2657, start+0.3);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.7, start+0.025);
				gainNode2.gain.setTargetAtTime(0, start+0.025, 0.07);
				stopAudioTime2 = 0.5;
				break;
			case 84: // Bell Tree
				// w s
				var invert = false;
				source.playbackRate.value = 1;
				for(var i=0; i<28; i++){
					gainNode.gain.setValueAtTime(velocity*0.1, start+i/24*0.45);
					gainNode.gain.setTargetAtTime(0, start+i/24*0.45, 0.01);
					oscillator.frequency.setValueAtTime(1380*(1+(invert ? (24-i)/24 : i/24)), start+i/24*0.45);
					gainNode2.gain.setValueAtTime(velocity*(0.2+i/24), start+i/24*0.45);
					gainNode2.gain.setTargetAtTime(0, start+i/24*0.45, i==27 ? 0.2 : 0.01);
				}
				stopAudioTime = 0.5;
				stopAudioTime2 = 1.5;
				break;
			case 85: // Castanets
				// w
				source.playbackRate.setValueAtTime(0.35, start);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.01);
				stopAudioTime = 0.1;
				// s
				oscillator.frequency.setValueAtTime(1730, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.01);
				stopAudioTime2 = 0.1;
				break;
			case 86: // Mute Surdo
			case 87: // Open Surdo
				// w
				source.playbackRate.setValueAtTime(0.020, start);
				source.playbackRate.linearRampToValueAtTime(0.015, start+0.5);
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*2, start+0.005);
				gainNode.gain.setTargetAtTime(0, start+0.005, option.pitch==86 ? 0.03 : 0.06);
				stopAudioTime = 0.5;
				// s
				oscillator.frequency.setValueAtTime(88, start);
				oscillator.frequency.linearRampToValueAtTime(86, start+0.3);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, option.pitch==86 ? 0.1 : 0.3);
				stopAudioTime2 = option.pitch==86 ? 0.5 : 1.5;
				break;
			default: 
				source.playbackRate.value = option.pitch/69*2;
				stopAudioTime = 0.05;
				stopAudioTime2 = 0;
				break;
		}
		// 同じドラムの音が重ならないようにする機能
		// 同じドラムが次すぐ鳴る場合、次が鳴る前に止めて音が重ならないようにする（同時発音数の増加を軽減する）
		if (!this.settings.isSameDrumSoundOverlap && nextSameNoteOnInterval != -1) {
			if (stopAudioTime > nextSameNoteOnInterval) {stopAudioTime = nextSameNoteOnInterval;}
			if (stopAudioTime2 > nextSameNoteOnInterval) {stopAudioTime2 = nextSameNoteOnInterval;}
		}
		// ドラム音停止時間を設定
		that.stopAudioNode(source, start+stopAudioTime, stopGainNode);
		that.stopAudioNode(oscillator, start+stopAudioTime2, stopGainNode2);
		// ドラム停止時間を設定
		option.drumStopTime = option.startTime + (stopAudioTime >= stopAudioTime2 ? stopAudioTime : stopAudioTime2);
		// 途中で曲停止する場合の処理を返す
		return function(){
			that.stopAudioNode(source, 0, stopGainNode, true);
			that.stopAudioNode(oscillator, 0, stopGainNode2, true);
		};
	};

	PicoAudio.prototype.createBaseNote = function(option, isDrum, isExpression, nonChannel, nonStop){
		var settings = this.settings;
		var context = this.context;
		var songStartTime = this.states.startTime;
		var that = this;
		var channel = nonChannel ? 0 : (option.channel || 0);
		var velocity = (option.velocity) * Number(nonChannel ? 1 : (this.channels[channel][2] != null ? this.channels[channel][2] : 1)) * settings.generateVolume;
		var isGainValueZero = true;

		if(velocity<=0) return {isGainValueZero: true};
		var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
		var expGainNode = context.createGain();
		expGainNode.gain.value = expGainValue;
		if(isExpression){
			option.expression ? option.expression.forEach(function(p){
				var v = velocity * (p.value / 127);
				if(v > 0) isGainValueZero = false;
				expGainNode.gain.setValueAtTime(
					v,
					p.time + songStartTime
				);
			}) : false;
		} else {
			if(expGainValue > 0){
				isGainValueZero = false;
			}
		}
		if(isGainValueZero){ // 音量が常に0なら音を鳴らさない
			return {isGainValueZero: true};
		}

		var start = option.startTime + songStartTime;
		var stop = option.stopTime + songStartTime;
		var pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
		var oscillator = !isDrum ? context.createOscillator() : context.createBufferSource();
		var panNode = context.createStereoPanner ? context.createStereoPanner() :
				context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
		var gainNode = context.createGain();
		var stopGainNode = context.createGain();

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

		if(!isDrum){
			oscillator.type = option.type || "sine";
			oscillator.detune.value = 0;
			oscillator.frequency.value = pitch;
			option.pitchBend ? option.pitchBend.forEach(function(p){
				oscillator.frequency.setValueAtTime(
					settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
					p.time + songStartTime
				);
			}) : false;
		} else {
			oscillator.loop = true;
			oscillator.buffer = this.whitenoise;
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
						p.time + songStartTime
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
						panNode.positionX.setValueAtTime(x, p.time + songStartTime);
						panNode.positionY.setValueAtTime(0, p.time + songStartTime);
						panNode.positionZ.setValueAtTime(z, p.time + songStartTime);
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
							that.clearFunc("pan", reservePan);
							var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
							if(v > 1.0) v = 1.0;
							var a = v * 90;
							var x = Math.sin(a * (Math.PI / 180));
							var z = -Math.cos(a * (Math.PI / 180));
							panNode.setPosition(x, 0, z);
						}, (p.time + songStartTime - context.currentTime) * 1000);
						that.pushFunc({
							pan: reservePan,
							stopFunc: function(){ clearTimeout(reservePan); }
						});
					}) : false;
				}
			}
			oscillator.connect(panNode);
			panNode.connect(expGainNode);
		} else {
			oscillator.connect(expGainNode);
		}
		expGainNode.connect(gainNode);
		gainNode.connect(stopGainNode);
		stopGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(context.destination);

		if(!isDrum && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)){
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
					p.time + songStartTime
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
					p.time + songStartTime
				);
			}) : false;
			var r = option.reverb ? option.reverb[0].value / 127 : 0;
			if(r > 1.0) r = 1.0;
			convolverGainNode.gain.value = r;
			gainNode.connect(stopGainNode);
			stopGainNode.connect(convolverGainNode);
			convolverGainNode.connect(convolver);
		}

		if(this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)){
			var chorusDelayNode = this.chorusDelayNode;
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
					p.time + songStartTime
				);
			}) : false;
			var c = option.chorus ? option.chorus[0].value / 127 : 0;
			if(c > 1.0) c = 1.0;
			chorusGainNode.gain.value = c;
			gainNode.connect(stopGainNode);
			stopGainNode.connect(chorusGainNode);
			chorusGainNode.connect(chorusDelayNode);
		}

		if(modulationOscillator){
			modulationOscillator.start(start);
			this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
		}

		oscillator.start(start);
		if(!isDrum && !nonChannel && !nonStop){
			this.stopAudioNode(oscillator, stop, stopGainNode);
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
			stopGainNode: stopGainNode,
			isGainValueZero: false
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
		this.states = { isPlaying: false, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0
			, playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:this.states.updateBufTime
			, updateBufMaxTime:this.states.updateBufMaxTime, updateIntervalTime:this.states.updateIntervalTime
		 	, latencyLimitTime:this.states.latencyLimitTime, noteOnAry:[], noteOffAry:[] };
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
		states.stopTime = this.context.currentTime;
		states.stopFuncs.forEach(function(n){
			n.stopFunc();
		});
		states.stopFuncs = [];
		states.playIndices.forEach(function(n, i, ary){
			ary[i] = 0;
		});
		states.noteOnAry = [];
		states.noteOffAry = [];
		if(this.settings.isWebMIDI){
			if(isSongLooping)
				return;
			if(this.settings.WebMIDIPortOutput==null)
				return;
			states.webMIDIStopTime = this.context.currentTime;
			setTimeout(function(){
				for(var t=0; t<16; t++){
					that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
				}
			}, 1000);
		}
	};

	PicoAudio.prototype.play = function(isSongLooping){
		var context = this.context;
		var settings = this.settings;
		var trigger = this.trigger;
		var states = this.states;
		var that = this;
		if(states.isPlaying==true) return;
		if(settings.isWebMIDI && !isSongLooping){
			// Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
			if(states.webMIDIWaitState != "completed"){
				if(states.webMIDIWaitState != "waiting"){ // play()連打の対策
					// stop()から800ms後にplay()を実行
					states.webMIDIWaitState = "waiting";
					var waitTime = 1000 - (context.currentTime - states.webMIDIStopTime)*1000;
					if(states.webMIDIStopTime==0) waitTime = 1000; // MIDI Portをopenして最初に呼び出すときも少し待つ
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
		this.isPlayed = true;
		states.isPlaying = true;
		states.startTime = !states.startTime && !states.stopTime ? currentTime : (states.startTime + currentTime - states.stopTime);
		states.stopFuncs = [];
		// 冒頭の余白をスキップ
		if (this.settings.isSkipBeginning) {
			var firstNoteOnTime = this.firstNoteOnTime;
			if (-states.startTime + currentTime < firstNoteOnTime) {
				this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
			}
		}
		// 曲終了コールバックを予約
		var reserveSongEnd;
		var reserveSongEndFunc = function(){
			that.clearFunc("rootTimeout", reserveSongEnd);
			var finishTime = (that.settings.isCC111 && that.cc111Time != -1) ? that.lastNoteOffTime : that.getTime(Number.MAX_SAFE_INTEGER);
			if (finishTime - context.currentTime + states.startTime <= 0) {
				// 予定の時間以降に曲終了
				trigger.songEnd();
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
		var finishTime = (this.settings.isCC111 && this.cc111Time != -1) ? this.lastNoteOffTime : this.getTime(Number.MAX_SAFE_INTEGER);
		var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
		reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
		that.pushFunc({
			rootTimeout: reserveSongEnd,
			stopFunc: function(){ clearTimeout(reserveSongEnd); }
		});

		var updateNowTime = performance.now();
		var pPreTime = performance.now(); // previous performance.now()
		var cPreTime = context.currentTime * 1000; // previous AudioContext.currentTime
		var pTimeSum = 0;
		var cTimeSum = 0;
		var cnt=0;
		(function updateNote(updatePreTime){
			var updateNowTime = performance.now();
			var updateBufTime = updateNowTime - updatePreTime;

			// サウンドが重くないか監視（フリーズ対策）
			var pTime = updateNowTime;
			var cTime = context.currentTime * 1000;
			pTimeSum += pTime - pPreTime;
			cTimeSum += cTime - cPreTime;
			pPreTime = pTime;
			cPreTime = cTime;
			var latencyTime = pTimeSum - cTimeSum;
			that.states.latencyTime = latencyTime;
			if(latencyTime >= 100){ // currentTimeが遅い（サウンドが重い）
				that.states.latencyLimitTime += latencyTime;
				cTimeSum += 100;
			} else if(latencyTime <= -100){ // currentTimeが速い（誤差）
				cTimeSum = pTimeSum;
			} else {
				if(that.states.latencyLimitTime>0){ // currentTimeが丁度いい
					that.states.latencyLimitTime -= updateBufTime*0.04;
					if(that.states.latencyLimitTime < 0) that.states.latencyLimitTime = 0;
				}
			}

			// ノートを先読み度合いを自動調整（予約しすぎると重くなる）
			that.states.updateIntervalTime = updateBufTime;
			updateBufTime += (that.isFirefox() && !that.isAndroid() ? 12 : 8);
			if(that.states.updateBufTime < updateBufTime){
				that.states.updateBufTime = updateBufTime;
			} else { // 先読み量を少しずつ減らす
				that.states.updateBufTime -= that.states.updateBufTime*0.001;
				if(that.states.updateBufTime > 100){
					that.states.updateBufTime -= that.states.updateBufTime*0.01;
				}
				if(that.states.updateBufMaxTime > 150){
					that.states.updateBufMaxTime -= that.states.updateBufMaxTime*0.002;
				}
				if(that.states.updateBufMaxTime > 10 && that.states.updateBufMaxTime < 140){
					that.states.updateBufMaxTime += that.states.updateBufMaxTime*0.003;
				}
			}
			if(that.states.updateBufTime > that.states.updateBufMaxTime){
				if(updateBufTime >= 900 && that.states.latencyLimitTime <= 150){
					// バックグラウンドっぽくて重くない場合、バックグラウンド再生
					that.states.updateBufMaxTime += updateBufTime;
				} else { // 通常
					var tempTime = updateBufTime - that.states.updateBufMaxTime;
					that.states.updateBufTime = that.states.updateBufMaxTime;
					if(that.states.updateBufMaxTime<10){
						that.states.updateBufTime = that.states.updateBufMaxTime;
						that.states.updateBufMaxTime *= 1.25;
					} else {
						that.states.updateBufMaxTime += tempTime / 2;
					}
				}
				if(that.states.updateBufMaxTime > 1100) that.states.updateBufMaxTime = 1100;
			}

			// サウンドが重すぎる
			if(that.states.latencyLimitTime > 200){
				cTimeSum = pTimeSum;
				that.states.latencyLimitTime -= 5;
				if(that.states.latencyLimitTime > 1000) that.states.latencyLimitTime = 1000;
				// ノート先読みをかなり小さくする（フリーズ対策）
				that.states.updateBufMaxTime = 1;
				that.states.updateBufTime = 1;
				updateBufTime = 1;
			}

			// 再生処理
			for(var ch=0; ch<16; ch++){
				var notes = that.playData.channels[ch].notes;
				var idx = that.states.playIndices[ch];
				for(; idx<notes.length; idx++){
					var note = notes[idx];
					var curTime = context.currentTime - states.startTime;
					// 終わったノートは演奏せずにスキップ
					if(curTime >= note.stopTime) continue;
					if(cnt == 0 && curTime > note.startTime+0.05) continue; // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
					// AudioParam.setValueAtTime()等でマイナスが入るとエラーになるので対策
					if(curTime + note.startTime < 0) continue;
					// 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
					if(curTime < note.startTime - that.states.updateBufTime/1000) break;
					if(!settings.isWebMIDI){ 
						// 予約ノート数が急激に増えそうな時、先読み量を小さくしておく
						if(that.states.stopFuncs.length>=350 && that.states.updateBufTime<1000){
							that.states.updateBufTime = (that.isFirefox() && !that.isAndroid() ? 12 : 8);
							that.states.updateBufMaxTime = that.states.updateBufTime;
						}
						// Retro Mode
						if(that.settings.maxPoly!=-1||that.settings.maxPercPoly!=-1){
							var polyCnt=0, percCnt=0;
							that.states.stopFuncs.forEach(function(tar){
								if(!tar.note) return;
								if(tar.note.channel!=9){
									if(note.start>=tar.note.start&&note.start<tar.note.stop){
										polyCnt++;
									}
								} else {
									if(note.start==tar.note.start){
										percCnt++;
									}
								}
							});
							if((note.channel!=9&&polyCnt>=that.settings.maxPoly)
								||(note.channel==9&&percCnt>=that.settings.maxPercPoly)){
								continue;
							}
						}
						// Create Note
						var stopFunc = note.channel!=9 ? that.createNote(note) : that.createPercussionNote(note);
						if(!stopFunc) continue; // 無音などの場合
						that.pushFunc({
							note: note,
							stopFunc: stopFunc
						});
					}
					that.states.noteOnAry.push(note);
				}
				that.states.playIndices[ch] = idx;
			}
			var noteOnAry = that.states.noteOnAry;
			var noteOffAry = that.states.noteOffAry;
			// noteOnの時間になったか監視
			for(var i=0; i<noteOnAry.length; i++){
				var tempNote = noteOnAry[i];
				var nowTime = context.currentTime - states.startTime;
				if(tempNote.startTime - nowTime <= 0){
					// noteOnAry.splice(i, 1); の高速化
					if(i == 0) noteOnAry.shift();
					else if(i == noteOnAry.length-1) noteOnAry.pop();
					else noteOnAry.splice(i, 1);
					noteOffAry.push(tempNote);
					// noteOn
					if(trigger.isNoteTrigger) trigger.noteOn(tempNote);
					i--;
				}
			}
			// noteOffの時間になったか監視
			for(var i=0; i<noteOffAry.length; i++){
				var tempNote = noteOffAry[i];
				var nowTime = context.currentTime - states.startTime;
				if((tempNote.channel!=9 && tempNote.stopTime - nowTime <= 0)
					|| (tempNote.channel==9 && tempNote.drumStopTime - nowTime <= 0)){
					// noteOffAry.splice(i, 1); の高速化
					if(i == 0) noteOffAry.shift();
					else if(i == noteOffAry.length-1) noteOffAry.pop();
					else noteOffAry.splice(i, 1);
					that.clearFunc("note", tempNote);
					// noteOff
					if(trigger.isNoteTrigger) trigger.noteOff(tempNote);
					i--;
				}
			}

			if(settings.isWebMIDI && settings.WebMIDIPortOutput!=null){
				var messages = that.playData.messages;
				var smfData = that.playData.smfData;
				var idx = that.states.playIndices[16];
				for(; idx<messages.length; idx++){
					var message = messages[idx];
					var curTime = context.currentTime - states.startTime;
					// 終わったノートは演奏せずにスキップ
					if(curTime > message.time + 1) continue;
					// 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
					if(curTime < message.time - 1) break;

					var pLen = message.smfPtrLen;
					var p = message.smfPtr;
					var time = message.time;
					var state = smfData[p];
					if(state!=0xff){
						try{
							if(state==0xF0 || state==0xF7){
								if(settings.WebMIDIPortSysEx){
									// 長さ情報を取り除いて純粋なSysExメッセージにする
									var lengthAry = that.variableLengthToInt(smfData, p+1, p+1+4);
									var sysExStartP = p+1+lengthAry[1];
									var sysExEndP = sysExStartP+lengthAry[0];
									var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
									webMIDIMes[0] = state;
									var size = sysExEndP - sysExStartP;
									for (var i=0; i<size; i++)
										webMIDIMes[i+1] = smfData[sysExStartP + i];
									settings.WebMIDIPortOutput.send(webMIDIMes,
										(time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
								}
							} else {
								var sendMes = [];
								for(var i=0; i<pLen; i++) sendMes.push(smfData[p+i]);
								settings.WebMIDIPortOutput.send(sendMes,
									(time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
							}
						}catch(e){
							console.log(e, p, pLen, time, state);
						}
					}
				}
				that.states.playIndices[16] = idx;
			}

			if(cnt==0){
				var reserve = setInterval(function(){
					updateNowTime = updateNote(updateNowTime);
				}, 1);
				(function(reserve){
					that.pushFunc({
						rootTimeout: reserve,
						stopFunc: function(){ clearInterval(reserve); }
					});
				})(reserve);
			}
			cnt++;
			return updateNowTime;
		})(updateNowTime);
	};

	PicoAudio.prototype.setData = function(data){
		if (this.debug) {
			var syoriTimeS = performance.now();
		}
		if(this.states.isPlaying) this.stop();
		this.playData = data;
		this.settings.resolution = data.header.resolution;
		this.settings.tempo = data.tempo || 120;
		this.tempoTrack = data.tempoTrack;
		this.cc111Time = data.cc111Time;
		this.firstNoteOnTiming = data.firstNoteOnTiming;
		this.lastNoteOffTiming = data.lastNoteOffTiming;
		this.firstNoteOnTime = data.firstNoteOnTime;
		this.lastNoteOffTime = data.lastNoteOffTime;
		this.initStatus();
		if (this.debug) {
			var syoriTimeE = performance.now();
			console.log("setData time", syoriTimeE - syoriTimeS);
		}
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
				this.setStartTime(this.cc111Time);
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

	PicoAudio.prototype.isFirefox = function(){
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("firefox") != -1;
	};

	PicoAudio.prototype.isArmv7l = function(){ // Raspberry Pi
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("armv7l") != -1;
	};

	PicoAudio.prototype.measurePerformanceReverb = function(){
		// 0.5秒パフォーマンス計測して、リバーブONにするか判断する
		var max = 500000; // 0.5秒以内にここまで計算できればリバーブON
		var startTime = performance.now();
		for (var i=0;i<max;i++) {
			if (performance.now()-startTime>=500) break;
		}
		if (this.debug) {
			console.log("measurePerformanceReverb", i, performance.now()-startTime);
		}
		if (i < max) return false;
		return true;
	};

	PicoAudio.prototype.getTime = function(timing){
		var imin = 0;
		var imax = this.tempoTrack.length - 1;
		var imid = -1;
		if(this.tempoTrack && this.tempoTrack.length >= 1){
			if(timing>=this.tempoTrack[this.tempoTrack.length-1].timing){
				return this.tempoTrack[this.tempoTrack.length-1].time;
			}
			while(true){
				imid = Math.floor(imin + (imax - imin) / 2);
				var tempTiming = this.tempoTrack[imid].timing;
				if(timing < tempTiming){
					imax = imid - 1;
				} else if(timing > tempTiming){
					imin = imid + 1;
				} else {
					break;
				}
				if(imin > imax){
					if(timing < tempTiming) imid--;
					break;
				}
			}
		}
		if(imid>=0){
			var tempoObj = this.tempoTrack[imid];
			var time = tempoObj.time;
			var baseTiming = tempoObj.timing;
			var tempo = tempoObj.value;
		} else {
			var time = 0;
			var baseTiming = 0;
			var tempo = 120;
		}
		time += (60 / tempo / this.settings.resolution) * (timing - baseTiming);
		return time;
	};

	PicoAudio.prototype.getTiming = function(time){
		var imin = 0;
		var imax = this.tempoTrack.length - 1;
		var imid = -1;
		if(this.tempoTrack && this.tempoTrack.length >= 1){
			if(time>=this.tempoTrack[this.tempoTrack.length-1].time){
				return this.tempoTrack[this.tempoTrack.length-1].timing;
			}
			while(true){
				imid = Math.floor(imin + (imax - imin) / 2);
				var tempTime = this.tempoTrack[imid].time;
				if(time < tempTime){
					imax = imid - 1;
				} else if(time > tempTime){
					imin = imid + 1;
				} else {
					break;
				}
				if(imin > imax){
					if(time < tempTime) imid--;
					break;
				}
			}
		}
		if(imid>=0){
			var tempoObj = this.tempoTrack[imid];
			var baseTime = tempoObj.time;
			var timing = tempoObj.timing;
			var tempo = tempoObj.value;
		} else {
			var baseTime = 0;
			var timing = 0;
			var tempo = 120;
		}
		timing += (time - baseTime) / (60 / tempo / this.settings.resolution);
		return timing;
	};

	PicoAudio.prototype.parseSMF = function(_smf){
		if (this.debug) {
			console.log(_smf);
			var syoriTimeS = performance.now();
		}
		var that = this;
		var smf = new Uint8Array(_smf); // smf配列はデータ上書きするので_smfをディープコピーする
		if(smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
			return "Not Sandard MIDI File.";
		var data = new Object;
		var p = 4;
		var header = new Object();
		header.size = this.getInt(smf, 4, 8);
		header.format = smf[9];
		header.trackcount = this.getInt(smf, 10, 12);
		header.timemanage = smf[12];
		header.resolution = this.getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack
		p += 4+header.size;
		var tempoTrack = new Array();
		var beatTrack = new Array();
		var channels = new Array();
		var cc111Tick = -1;
		var cc111Time = -1;
		var firstNoteOnTiming = Number.MAX_SAFE_INTEGER; // 最初のノートオンのTick
		var firstNoteOnTime = Number.MAX_SAFE_INTEGER;
		var lastNoteOffTiming = 0; // 最後のノートオフのTick
		var lastNoteOffTime = 0;
		var chSize = this.settings.isWebMIDI ? 17 : 16;
		for(var i=0; i<chSize; i++){
			var channel = new Object();
			channels.push(channel);
			// smfを読む順番を記録した索引配列を作る
			// 型付き配列をリスト構造のように使う（リスト構造にすることで挿入処理を高速化する）
			// [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]
			channel.indices = new Int32Array(Math.floor(smf.length/8));
			channel.indicesLength = 0;
			channel.indicesHead = -1; // 先頭のポインタ
			channel.indicesFoot = 0; // 末尾のポインタ
			channel.indicesCur = 0; // 現在のinsert用ポインタ
			channel.indicesPre = 0; // 前回のinsert用ポインタ
			channel.notes = [];
		}
		if (this.debug) {
			var syoriTimeS1_1 = performance.now();
		}
		var songLength = 0;
		if(this.settings.isWebMIDI) var messages = [];
		for(var t=0; t<header.trackcount; t++){
			if(smf[p] != 77 || smf[p+1] != 84 || smf[p+2] != 114 || smf[p+3] != 107)
				return "Irregular SMF.";
			p += 4;
			var endPoint = p+4 + this.getInt(smf, p, p+4);
			p += 4;
			var tick = 0;
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var lastState = 1;
			while(p<endPoint){
				// DeltaTime
				if(lastState!=null){
					var lengthAry = this.variableLengthToInt(smf, p, p+5);
					var dt = lengthAry[0];
					tick += dt;
					p += lengthAry[1];
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					var cashP = p;
					var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				}
				// Events
				switch(Math.floor(smf[p]/0x10)){
					case 0x8: // Note OFF - 8[ch], Pitch, Velocity
					case 0x9: // Note ON - 9[ch], Pitch, Velocity
					case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xB: // Control Change - B[ch],,
					case 0xE: // PitchBend Change - E[ch],,
						// チャンネル毎に仕分けた後に解析する
						lastState = smf[p];
						var ch = channels[lastState&0x0F];
						this.chIndicesSplice(ch, tick, p, 3); // デルタタイムの順番になるようにリスト配列に挿入
						p+=3;
						break;
					case 0xC: // Program Change - C[ch],
					case 0xD: // Channel Pre - D[ch],
						// チャンネル毎に仕分けた後に解析する
						lastState = smf[p];
						var ch = channels[lastState&0x0F];
						this.chIndicesSplice(ch, tick, p, 2); // デルタタイムの順番になるようにリスト配列に挿入
						p+=2;
						break;
					// SysEx Events or Meta Events - F[ch], ...
					case 0xF:{
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
							case 0xF7:
								// SysEx Events
								var lengthAry = this.variableLengthToInt(smf, p+1, p+1+4);

								// Master Volume
								// 0xF0, size, 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume, 0xF7
								if(lengthAry[0]>=7 && smf[p+2]==0x7f && smf[p+3]==0x7f && smf[p+4]==0x04 && smf[p+5]==0x01){
									// 全チャンネルにMasterVolumeメッセージを挿入する
									for(var i=0; i<16; i++) {
										var ch = channels[i];
										this.chIndicesSplice(ch, tick, p, lengthAry[0]); // デルタタイムの順番になるように配列に挿入
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
										tick += (this.settings.isSkipEnding ? 0 : header.resolution) - dt;
										break;
									// Tempo
									case 0x51:
										// 全チャンネルにTempoメッセージを挿入する
										for(var i=0; i<16; i++) {
											var ch = channels[i];
											this.chIndicesSplice(ch, tick, p, 6); // デルタタイムの順番になるように配列に挿入
										}
										tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
										tempoCurTick = tick;
										tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
										tempoTrack.push({
											timing: tick,
											time: tempoCurTime,
											value: tempo
										});
										break;
									case 0x54:
										break;
									// Beat
									case 0x58:
										beatTrack.push({
											timing: tick,
											value: [smf[p+3], Math.pow(2, smf[p+4])]
										});
										break;
									case 0x59:
									case 0x7F:
										break;
								}
								var lengthAry = this.variableLengthToInt(smf, p+2, p+2+4);
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
						smf[p] = lastState; // 上書き
						lastState = null;
					}
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					if(lastState!=null){
						this.chIndicesSplice(channels[16], tick, cashP, p-cashP);
					}
				}
			}
			if(!this.settings.isSkipEnding && songLength<tick) songLength = tick;
			// リスト配列のポインタを初期化
			for(var i=0; i<channels.length; i++){
				channels[i].indicesCur = channels[i].indicesHead;
				channels[i].indicesPre = channels[i].indicesHead;
			}
		}

		if (this.debug) {
			var syoriTimeS2 = performance.now();
		}
		// Midi Events (0x8n - 0xEn) parse
		for(var ch=0; ch<16; ch++){
			var channel = channels[ch];
			var dataEntry = 2;
			var pitchBend = 0;
			var pan = 64;
			var expression = 127;
			var velocity = 100;
			var modulation = 0;
			var hold = 0;
			var reverb = this.isTonyu2 ? 0 : 10;
			var chorus = 0;
			var nrpnLsb = 127;
			var nrpnMsb = 127;
			var rpnLsb = 127;
			var rpnMsb = 127;
			var instrument = 0;
			var masterVolume = 127;
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var nowNoteOnIdxAry = [];
			var indIdx = channel.indicesHead;
			var indices = channel.indices;
			var nextNoteOnAry = new Array(128);
			while(indIdx!=-1){
				var tick = indices[indIdx];
				var p = indices[indIdx+2];
				var nextIdx = indices[indIdx+3];
				var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				// Events
				switch(Math.floor(smf[p]/0x10)){
					// Note OFF - 8[ch], Pitch, Velocity
					case 0x8:
						nowNoteOnIdxAry.some(function(idx,i){
							var note = channel.notes[idx];
							if(note.pitch==smf[p+1] && note.stop==null){
								if(hold>=that.settings.holdOnValue){
									if (note.holdBeforeStop==null){
										note.holdBeforeStop = [{
											timing: tick,
											time: time,
											value: hold
										}];
									}
								} else {
									note.stop = tick;
									note.stopTime = time;
									// nowNoteOnIdxAry.splice(i, 1); を軽量化
									if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
									else if(i == 0) nowNoteOnIdxAry.shift();
									else nowNoteOnIdxAry.splice(i, 1);
								}
								if(tick > lastNoteOffTiming){
									lastNoteOffTiming = tick;
									lastNoteOffTime = time;
								}
								return true;
							}
						});
						break;
					// Note ON - 9[ch], Pitch, Velocity
					case 0x9:
						if(smf[p+2]!=0){that.settings.resolution = header.resolution;
							var note = {
								start: tick,
								stop: null,
								startTime: time,
								stopTime: null,
								pitch: smf[p+1],
								pitchBend: [{timing:tick,time:time,value:pitchBend}],
								pan: [{timing:tick,time:time,value:pan}],
								expression: [{timing:tick,time:time,value:expression*(masterVolume/127)}],
								velocity: (smf[p+2]/127)*(velocity/127),
								modulation: [{timing:tick,time:time,value:modulation}],
								holdBeforeStop: null,
								reverb: [{timing:tick,time:time,value:reverb}],
								chorus: [{timing:tick,time:time,value:chorus}],
								instrument: instrument,
								channel: ch,
								nextSameNoteOnInterval: -1,
								drumStopTime: 2 // 再生時に使う
							};
							// 前回鳴っていた同音ノートに次のノートオン時間を入れる
							var prevNote = nextNoteOnAry[smf[p+1]];
							if(prevNote){
								prevNote.nextSameNoteOnInterval = time - prevNote.startTime;
							}
							nextNoteOnAry[smf[p+1]] = note;
							// If this note is NoteOn, change to NoteOFF.
							nowNoteOnIdxAry.some(function(idx,i){
								var note = channel.notes[idx];
								if(note.pitch == smf[p+1] && note.stop==null){
									note.stop = tick;
									note.stopTime = time;
									// nowNoteOnIdxAry.splice(i, 1); を軽量化
									if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
									else if(i == 0) nowNoteOnIdxAry.shift();
									else nowNoteOnIdxAry.splice(i, 1);
								}
							});
							nowNoteOnIdxAry.push(channel.notes.length);
							channel.notes.push(note);
							if(tick < firstNoteOnTiming){
								firstNoteOnTiming = tick;
								firstNoteOnTime = time;
							}
						} else {
							nowNoteOnIdxAry.some(function(idx,i){
								var note = channel.notes[idx];
								if(note.pitch==smf[p+1] && note.stop==null){
									if(hold>=that.settings.holdOnValue){
										if (note.holdBeforeStop==null){
											note.holdBeforeStop = [{
												timing: tick,
												time: time,
												value: hold
											}];
										}
									} else {
										note.stop = tick;
										note.stopTime = time;
										// nowNoteOnIdxAry.splice(i, 1); を軽量化
										if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
										else if(i == 0) nowNoteOnIdxAry.shift();
										else nowNoteOnIdxAry.splice(i, 1);
									}
									if(tick > lastNoteOffTiming){
										lastNoteOffTiming = tick;
										lastNoteOffTime = time;
									}
									return true;
								}
							});
						}
						break;
					// Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xA:
						break;
					// Control Change - B[ch],,
					case 0xB:
						switch(smf[p+1]){
							case 1:
								modulation = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.modulation.push({
										timing: tick,
										time: time,
										value: modulation
									});
								});
								break;
							case 6:
								if(rpnLsb==0 && rpnMsb==0){
									// RLSB=0 & RMSB=0 -> 6はピッチ
									dataEntry = smf[p+2];
									if(dataEntry > 24){
										dataEntry = 24;
									}
								}
								if(nrpnLsb==8 && nrpnMsb==1){
									// (保留)ビブラート・レイト(GM2/GS/XG)
									//console.log("CC  8 1 6 "+smf[p+2]+" tick:"+tick);
								} else if(nrpnLsb==9 && nrpnMsb==1){
									// (保留)ビブラート・デプス(GM2/GS/XG)
									//console.log("CC  9 1 6 "+smf[p+2]+" tick:"+tick);
								} else if(nrpnLsb==10 && nrpnMsb==1){
									// (保留)ビブラート・ディレイ(GM2/GS/XG)
									//console.log("CC 10 1 6 "+smf[p+2]+" tick:"+tick);
								}
								break;
							case 7:
								velocity = smf[p+2];
								break;
							case 10:
								//Pan
								pan = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.pan.push({
										timing: tick,
										time: time,
										value: pan
									});
								});
								break;
							case 11:
								//Expression
								expression = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.expression.push({
										timing: tick,
										time: time,
										value: expression*(masterVolume/127)
									});
								});
								break;
							case 64:
								//Hold1
								hold = smf[p+2];
								if(hold<this.settings.holdOnValue){
									for(var i=nowNoteOnIdxAry.length-1; i>=0; i--){
										var idx = nowNoteOnIdxAry[i];
										var note = channel.notes[idx];
										if(note.stop==null && note.holdBeforeStop!=null){
											note.stop = tick;
											note.stopTime = time;
											// nowNoteOnIdxAry.splice(i, 1); を軽量化
											if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
											else if(i == 0) nowNoteOnIdxAry.shift();
											else nowNoteOnIdxAry.splice(i, 1);
										}
									}
								}
								break;
							case 91:
								reverb = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.reverb.push({
										timing: tick,
										time: time,
										value: reverb
									});
								});
								break;
							case 93:
								chorus = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.chorus.push({
										timing: tick,
										time: time,
										value: chorus
									});
								});
								break;
							case 98:
								nrpnLsb = smf[p+2];
								break;
							case 99:
								nrpnMsb = smf[p+2];
								break;
							case 100:
								rpnLsb = smf[p+2];
								break;
							case 101:
								rpnMsb = smf[p+2];
								break;
							case 111: // RPGツクール用ループ
								if(cc111Tick == -1){
									cc111Tick = tick;
									cc111Time = time;
								}
								break;
						}
						break;
					// Program Change - C[ch],
					case 0xC:
						instrument = smf[p+1];
						break;
					// Channel Pre - D[ch],
					case 0xD:
						break;
					// PitchBend Change - E[ch],,
					case 0xE:
						pitchBend = ((smf[p+2]*128+smf[p+1])-8192)/8192*dataEntry;
						nowNoteOnIdxAry.forEach(function(idx){
							var note = channel.notes[idx];
							note.pitchBend.push({
								timing: tick,
								time: time,
								value: pitchBend
							});
						});
						break;
					case 0xF:
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
							case 0xF7:
								// Master Volume
								if(smf[p+1]==0x7f && smf[p+2]==0x7f && smf[p+3]==0x04 && smf[p+4]==0x01){
									var vol = smf[p+6];
									if(vol > 127) vol = 127;
									masterVolume = vol;
									nowNoteOnIdxAry.forEach(function(idx){
										var note = channel.notes[idx];
										note.expression.push({
											timing: tick,
											time: time,
											value: expression*(masterVolume/127)
										});
									});
								}
								break;
							case 0xFF:
								// Meta Events
								switch(smf[p+1]){
									case 0x51:
										// Tempo
										tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
										tempoCurTick = tick;
										tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
										break;
								}
						}
						break;
					default: {
						return "Error parseSMF.";
					}
				}
				indIdx = nextIdx;
			}
			channel.nowNoteOnIdxAry = nowNoteOnIdxAry;
			if (!this.debug) {
				delete channel.indices;
			}
		}

		// hold note off
		for(var ch=0; ch<16; ch++){
			var channel = channels[ch];
			var nowNoteOnIdxAry = channels[ch].nowNoteOnIdxAry;
			for(var i=nowNoteOnIdxAry.length-1; i>=0; i--){
				var note = channel.notes[nowNoteOnIdxAry[i]];
				if(note.stop==null){
					note.stop = lastNoteOffTiming;
					note.stopTime = lastNoteOffTime;
					// If (note.cc[x].timing > lastNoteOffTiming), delete note.cc[x]
					var nameAry = ["pitchBend", "pan", "expression", "modulation", "reverb", "chorus"];
					nameAry.forEach(function(name){
						var ccAry = note[name]
						for(var i2=ccAry.length-1; i2>=1; i2--){
							var obj = ccAry[i2];
							if(obj.timing>lastNoteOffTiming){
								// ccAry.splice(i2, 1); を軽量化
								if(i2 == ccAry.length-1) ccAry.pop();
								else if(i2 == 0) ccAry.shift();
								else ccAry.splice(i2, 1);
							}
						}
					});
					// nowNoteOnIdxAry.splice(i, 1); を軽量化
					if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
					else if(i == 0) nowNoteOnIdxAry.shift();
					else nowNoteOnIdxAry.splice(i, 1);
				}
			}
			delete channel.nowNoteOnIdxAry;
		}
		if(this.settings.isSkipEnding) songLength = lastNoteOffTiming;
		tempoTrack.push({ timing:songLength, time:(60 / tempo / header.resolution) * (songLength - tempoCurTick) + tempoCurTime, value:120 });

		if(this.settings.isWebMIDI){
			var channel = channels[16];
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var indIdx = channel.indicesHead;
			var indices = channel.indices;
			while(indIdx!=-1){
				var tick = indices[indIdx];
				var pLen = indices[indIdx+1];
				var p = indices[indIdx+2];
				var nextIdx = indices[indIdx+3];
				var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				// Events
				switch(smf[p]){
					case 0xFF:
					// Meta Events
					switch(smf[p+1]){
						case 0x51:
							// Tempo
							tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
							tempoCurTick = tick;
							tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
							break;
					}
				}
				messages.push({time:time, tick:tick, smfPtr:p, smfPtrLen:pLen});
				indIdx = nextIdx;
			}
		}

		data.header = header;
		data.tempoTrack = tempoTrack;
		data.beatTrack = beatTrack;
		data.channels = channels;
		data.songLength = songLength;
		data.cc111Tick = cc111Tick;
		data.cc111Time = cc111Time;
		data.firstNoteOnTiming = firstNoteOnTiming;
		data.firstNoteOnTime = firstNoteOnTime;
		data.lastNoteOffTiming = lastNoteOffTiming;
		data.lastNoteOffTime = lastNoteOffTime;
		if(this.settings.isWebMIDI){
			data.messages = messages;
			data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
		}

		if (this.debug) {
			var syoriTimeE = performance.now();
			console.log("parseSMF time", syoriTimeE - syoriTimeS);
			console.log("parseSMF(0/2) time", syoriTimeS1_1 - syoriTimeS);
			console.log("parseSMF(1/2) time", syoriTimeS2 - syoriTimeS);
			console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS2);
			console.log(data);
		}
		return data;
	};

	PicoAudio.prototype.getInt = function(arr, s, e){
		var value = 0;
		for (var i=s; i<e; i++){
			value = (value << 8) + arr[i];
		}
		return value;
	};

	PicoAudio.prototype.variableLengthToInt = function(arr, s, e){
		var i = s;
		var value = 0;
		while(i<e-1 && arr[i]>=0x80){
			if (i < s+4) value = (value<<7) + (arr[i]-0x80);
			i++;
		}
		value = (value<<7) + arr[i];
		i++;
		return [value, i-s];
	};

	PicoAudio.prototype.chIndicesSplice = function(ch, time, p, len){
		var indices = ch.indices;
		// メモリー足りなくなったら拡張
		if(indices.length <= ch.indicesLength+4){
			if(this.debug){
				var ts1 = performance.now();
			}
			var temp = new Int32Array(Math.floor(indices.length*2));
			for(var i=indices.length-1; i>=0; i--){
				temp[i] = indices[i];
			}
			ch.indices = indices = temp;
			if(this.debug){
				console.log("malloc", performance.now() - ts1, temp.length);
			}
		}
		// デルタタイムの順番になるようにリスト配列に挿入
		if(ch.indicesLength>=4 && time<indices[ch.indicesFoot]){
			// Insert
			while(ch.indicesCur != -1){
				if(time<indices[ch.indicesCur]){
					if(ch.indicesCur==ch.indicesHead){
						ch.indicesHead = ch.indicesLength;
					} else {
						indices[ch.indicesPre+3] = ch.indicesLength;
					}
					indices[ch.indicesLength] = time;
					indices[ch.indicesLength+1] = len;
					indices[ch.indicesLength+2] = p;
					indices[ch.indicesLength+3] = ch.indicesCur;
					ch.indicesPre = ch.indicesLength;
					ch.indicesLength += 4;
					break;
				}
				ch.indicesPre = ch.indicesCur;
				ch.indicesCur = indices[ch.indicesCur+3];
			}
		} else {
			// Push
			if(ch.indicesLength>=4){
				indices[ch.indicesFoot+3] = ch.indicesLength;
			} else {
				ch.indicesHead = 0;
			}
			ch.indicesFoot = ch.indicesLength;
			indices[ch.indicesLength] = time;
			indices[ch.indicesLength+1] = len;
			indices[ch.indicesLength+2] = p;
			indices[ch.indicesLength+3] = -1;
			ch.indicesLength += 4;
		}
	};

	PicoAudio.prototype.stopAudioNode = function(tar, time, stopGainNode, isNoiseCut){
		var isImmed = time <= this.context.currentTime; // 即時ストップか？
		// 時間設定
		if(!isImmed){ // 予約ストップ
			var vol1Time = time-0.005;
			var stopTime = time;
		} else { // 即時ストップ
			if(!isNoiseCut){
				var stopTime = this.context.currentTime;
			} else {
				var vol1Time = this.context.currentTime;
				var stopTime = this.context.currentTime+0.005;
			}
		}
		// 音の停止
		try{
			if(!isNoiseCut){
				tar.stop(stopTime);
			} else {
				tar.stop(stopTime);
				stopGainNode.gain.cancelScheduledValues(0);
				stopGainNode.gain.setValueAtTime(1, vol1Time);
				stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
			}
		} catch(e) { // iOS (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
			stopGainNode.gain.cancelScheduledValues(0);
			if(!isNoiseCut){
				stopGainNode.gain.setValueAtTime(0, stopTime);
			} else {
				stopGainNode.gain.setValueAtTime(1, vol1Time);
				stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
			}
		}
	};

	PicoAudio.prototype.pushFunc = function(tar){
		if(!tar.note && !tar.rootTimeout && !tar.pan && !this.trigger.isNoteTrigger) return;
		this.states.stopFuncs.push(tar);
	};

	PicoAudio.prototype.clearFunc = function(tar1, tar2){
		if(tar1!="note" && tar1!="rootTimeout" && tar1!="pan" && !this.trigger.isNoteTrigger) return;
		var that = this;
		that.states.stopFuncs.some(function(n, i, ary){
			if(n[tar1] == tar2){
				// ary.splice(i, 1); を軽量化
				if(i == 0) ary.shift();
				else if(i == ary.length-1) ary.pop();
				else ary.splice(i, 1);
				return true;
			}
		});
	};

	return PicoAudio;
})();

define('PicoAudio',[],function (){ return PicoAudio; });
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
            }
        }
        //setTimeout(this.activate.bind(this),0);
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
        } else if (soundData.url.match(/\.mzo$/) || soundData.url.match(/^data:audio\/mzo/)) {
            console.log("Loading mzo");
            // MZO
            var that = this;
            var m=new Mezonet(this.context);
            var a=Array.prototype.slice.call( new Uint8Array(arrayBuffer) );
            m.load(a);
            m.toAudioBuffer().then(function (data) {
                // デコード中にremoveDecodeSoundData()したらデータを捨てる
                console.log("MZO loaded",data);
                if (that.soundDataAry[idx].isDecoding()) {
                    that.soundDataAry[idx].onDecodeComplete(data.decodedData);
                    that.soundDataAry[idx].loopStart=data.loopStart;
                    //if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
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
                //if (callbacks && callbacks.err) callbacks.err(idx, that.soundDataAry[idx].errorID);
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.err == "function") {
                        callbacks.err(idx, that.soundDataAry[idx].errorID);
                    }
                });
                soundData.decodedCallbacksAry = null;
            });
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
            //source.disconnect();
            source.onended = null;
            var idx=t.seSources.indexOf(source);
            if (idx>=0) t.seSources.splice(idx,1);
            //delete source.gainNode;
            //delete source.panNode;
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
        if (bgm instanceof PicoAudio) {
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
        if (bgm instanceof PicoAudio) {
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
    function parseMesg(mesg,defTitle) {
        if (typeof mesg==="string" ||
        typeof mesg==="number" ||
        typeof mesg==="boolean" ||
        ( (typeof $!=="undefined") && mesg instanceof $)) return {
            title:mesg.title||defTitle,
            body:mesg
        };
        return mesg;
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
    UIDiag.getText=function () {return UIDiag.resultValue;};
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

requireSimulator.setName('SEnv');
define("SEnv", ["Klass", "assert"], function(Klass, assert) {
    //--- Also in M2Parser
    var Ses = 10,
        Chs = 10,
        Regs = Chs * 3,
        WvElC = 32,
        EnvElC = 32,
        WvC = 96,
        wdataSize = 48000,  // should be dividable by 120
        //   99=r 100=vol 101=ps (x*128)  255=end
        MRest = 99,
        MVol = 100,
        Mps = 101,
        MSelWav = 102,
        MTempo = 103,
        MJmp = 104,
        MSlur = 105,
        MPor = 106,
        MSelEnv = 107,
        MWait = 108,
        MCom = 109,
        MDet = 110,
        MWOut = 111,
        MWEnd = 112,
        MWrtWav = 113,
        MWrtEnv = 114,
        MLfo = 115,
        MSync = 116,
        MPCMReg = 117,
        MLfoD = 118,
        MBaseVol = 119,
        MLabel = 120,

        Mend = 255,

        //sync=0:非同期、1:同期、2:ワンショット 3:鋸波形
        LASync = 0,
        LSync = 1,
        LOneShot = 2,
        LSaw = 3,

        Envs = 16,
        PCMWavs = 16, // 96-111
        FadeMax = 256,

        div = function(x, y) {
            return Math.trunc(chkn(x,"x") / chkn(y,"y") );
        },
        chkn = function (x,mesg) {
            if (x!==x) throw new Error(mesg+": Not a number!");
            if (typeof x!=="number") {console.error(x);throw new Error(mesg+": Not a not a number but not a number!");}
            return x;
        },
        abs = Math.abs.bind(Math),
        ShortInt = function(b) {
            return b >= 128 ? b - 256 : b;
        },
        StrPas=function (ary,idx) {
            var a=[];
            for (var i=idx;ary[i];i++) {
                a.push(ary[i]);
            }
            return a;
        },
        array2Int= function (ary,idx) {
            var r=ary[idx];
            r+=ary[idx+1]*0x100;
            r+=ary[idx+2]*0x10000;
            r+=ary[idx+3]*0x1000000;
            if (r>=0x80000000) r-=0x100000000;
            return r;
        },
        Integer = Number,
        sinMax_s = 5,
        sinMax = 65536 >> sinMax_s, //2048,
        /*SPS = 44100,
        SPS96 = 22080,
        SPS_60 = div(44100, 60),*/
        DivClock = 111860.78125,
        Loops = 163840,
//---------End include
        m2t = [0xd5d, 0xc9c, 0xbe7, 0xb3c, 0xa9b, 0xa02, 0x973, 0x8eb, 0x86b, 0x7f2, 0x780, 0x714,
            0x6af, 0x64e, 0x5f4, 0x59e, 0x54e, 0x501, 0x4ba, 0x476, 0x436, 0x3f9, 0x3c0, 0x38a,
            0x357, 0x327, 0x2fa, 0x2cf, 0x2a7, 0x281, 0x25d, 0x23b, 0x21b, 0x1fd, 0x1e0, 0x1c5,
            0x1ac, 0x194, 0x17d, 0x168, 0x153, 0x140, 0x12e, 0x11d, 0x10d, 0xfe, 0xf0, 0xe3,
            0xd6, 0xca, 0xbe, 0xb4, 0xaa, 0xa0, 0x97, 0x8f, 0x87, 0x7f, 0x78, 0x71,
            0x6b, 0x65, 0x5f, 0x5a, 0x55, 0x50, 0x4c, 0x47, 0x43, 0x40, 0x3c, 0x39,
            0x35, 0x32, 0x30, 0x2d, 0x2a, 0x28, 0x26, 0x24, 0x22, 0x20, 0x1e, 0x1c,
            0x1b, 0x19, 0x18, 0x16, 0x15, 0x14, 0x13, 0x12, 0x11, 0x10, 0xf, 0xe
        ],
        //Trunc = Math.trunc.bind(),
        stEmpty = -1,
        stFreq = 1,
        stVol = 2,
        stWave = 3,
        sndElemCount = 64,
        //type
        /*TSoundElem = Klass.define({
            $fields: {
                time: Integer,
                typ: Integer,
                val: Integer
            }
        }),*/
        nil = null,
        False = false,
        True = true,
        //TPlayState = (psPlay,psStop,psWait,psPause);
        psPlay = "psPlay",
        psStop = "psStop",
        psWait = "psWait",
        psPause = "psPause",
        m2tInt=[], //:array[0..95] of Integer;
        sinT = [], //:array [0..sinMAX-1] of ShortInt;
        TTL, //:Integer;
        cnt; //:Integer;// debug
    var defs;
    var TEnveloper = Klass.define(defs={ //class (TSoundGenerator)
        $this: "t",
        $fields: {
            //BSize: Integer,
            Pos: Integer,
            PrevPos: Integer,
            RPos: Integer,
            //WriteAd: Integer,
            SccCount: Array, // [0..Chs-1] of Integer;
            Steps: Array, // [0..Chs-1] of integer;
            SccWave: Array, // [0..Chs-1] of PChar;
            WaveDat: Array, // [0..WvC-1,0..WvElC-1] of Byte;
            //RefreshRate: Number, //longint,//;
            //RRPlus: Integer,
            //PosPlus: Integer, //;
            wdata2: Array,//array[0..wdataSize-1] of SmallInt;

            BeginPlay: Boolean,
            SeqTime: Integer,
            SeqTime120: Integer,

            WavOutMode: Boolean,
            //WavPlaying: Boolean,
            /*{$ifdef ForM2}
            WavOutObj:TWaveSaver,
            {$endif}*/
            EShape: Array, // [0..Chs-1] of PChar,
            EVol: Array,
            EBaseVol: Array,
            ESpeed: Array,
            ECount: Array, // [0..Chs-1] of Word,
            Oct: Array, // [0..Chs-1] of Byte,
            MCount: Array, // [0..Chs-1] of Integer,
            MPoint: Array, // [0..Chs-1] of PChar,
            MPointC: Array, // [0..Chs-1] of Integer,
            Resting: Array, // [0..Chs-1] of Boolean,
            PlayState: Array, // [0..Chs-1] of TPlayState,
            Slur: Array,
            Sync: Array, // [0..Chs-1] of Boolean,
            Detune: Array, // [0..Chs-1] of Integer,
            PorStart: Array,
            PorEnd: Array,
            PorLen: Array, // [0..Chs-1] of Integer,
            LfoV: Array,
            LfoA: Array,
            LfoC: Array,
            LfoD: Array,
            LfoDC: Array,
            LfoSync: Array, // [0..Chs-1] of Integer,
            //sync=0:非同期、1:同期、2:ワンショット 3:鋸波形
            Fading: Integer,

            CurWav: Array, // [0..Chs-1] of Integer,
            L2WL: Array, // [0..Chs-1] of Integer,
            // log 2 WaveLength
            PCMW: Array, // [0..PCMWavs-1] of TWavLoader,

            Delay: Integer,

            Tempo: Integer,
            ComStr: String,
            WFilename: String,

            EnvDat: Array, // [0..Envs-1,0..EnvElC-1] of Byte,

            WriteMaxLen: Integer,
            soundMode: Array // [0..chs-1] of Boolean,
        },
        load:function (t,d) {
            var ver=readLong(d);
            var chs=readByte(d);
            t.MPoint=chdatas=[];
            for (var i=0;i<chs;i++) {
                var chdata=[];
                chdatas.push(chdata);
                var len=readLong(d);
                //console.log(len);
                //if(len>999999) throw new Error("LONG");
                for (var j=0;j<len;j++) {
                    chdata.push(readByte(d));
                }
            }
            function readByte(a) {
                if (a.length==0) throw new Error("Out of data");
                return a.shift();
            }
            function readLong(a) {
                if (a.length<4) throw new Error("Out of data");
                var r=a.shift(),e=1;
                e<<=8;
                r+=a.shift()*e;
                e<<=8;
                r+=a.shift()*e;
                e<<=8;
                r+=a.shift()*e;
                return r;
            }
        },
        loadWDT: function (t,url) {
            if (!url) {
                return requirejs(["Tones.wdt"],function (u) {
                    t.loadWDT(u);
                });
            }
            var oReq = new XMLHttpRequest();
            oReq.open("GET", url, true);
            oReq.responseType = "arraybuffer";
            oReq.onload = function (oEvent) {
                var arrayBuffer = oReq.response;
                if (arrayBuffer) {
                    var b = new Uint8Array(arrayBuffer);
                    console.log("Loading wdt",b.length);
                    //WaveDat
                    var idx=0;
                    for (var i = 0; i < 96; i++) {//WvC
                        for (var j=0;j<32;j++) {
                            t.WaveDat[i][j]=b[idx++];
                        }
                    }
                    //EnvDat
                    for (var i=0 ;i<16;i++) {//Envs
                        for (var j=0;j<32;j++) {
                            t.EnvDat[i][j]=b[idx++];
                        }
                    }
                    console.log("Loading wdt done");
                }
            };
            oReq.send(null);
        },
        getPlayPos: function () {
            var ti=this.context.currentTime- this. playStartTime;
            var tiSamples=Math.floor(ti*this.sampleRate);
            return tiSamples % wdataSize;
        },
        setSound: function(t, ch /*:Integer;*/ , typ /*:Integer;*/ , val /*:Integer*/ ) {
            t.soundMode[ch] = True;
            switch (typ) {
                case stFreq:
                    t.Steps[ch] = val;
                    break;
                case stVol:
                    t.EVol[ch] = val;
                    break;
            }
        },
        // all interger
        /*setSoundTime: function(t, ch, typ, val, time) {
            var e; //:^TSoundElem;
            t.soundMode[ch] = True; // TODO: ほんとはまずい(t が遠い未来のばあい）
            e = t.sndElems[ch][t.nextPokeElemIdx[ch]];
            e.time = time;
            e.typ = typ;
            e.val = val;
            t.nextPokeElemIdx[ch] = (t.nextPokeElemIdx[ch] + 1) % sndElemCount;
        },*/
        InitSin: function(t) {
            var i; //:Integer;
            for (i = 0; i < sinMax; i++) {
                sinT[i] = Math.trunc(Math.sin(3.1415926 * 2 * i / sinMax) * 127);
            }
        },
        InitEnv: function(t) {
            var i, j; //:Integer;
            t.EnvDat=[];
            for (i = 0; i < Envs; i++) {
                t.EnvDat[i]=[];
                for (j = 0; j < EnvElC; j++) {
                    t.EnvDat[i][j] = Math.floor((EnvElC - 1 - j) / 2);
                }
            }
        },
        ConvM2T: function(t) {
            var i; //:Integer;
            m2tInt=[];
            for (i = 0; i < 96; i++) {
                m2tInt[i] = Math.trunc(DivClock * 65536 / m2t[i] * 65536 / t.sampleRate);
            }
        },
        InitWave: function(t) {
            var i, j;
            t.WaveDat=[];
            for (i = 0; i < WvC; i++) {
                t.WaveDat[i]=[];
                for (j = 0; j < WvElC / 2; j++) {
                    t.WaveDat[i][j] = 103;
                    t.WaveDat[i][j + div(WvElC, 2)] = 153;
                }
            }
        },

        $: function(t,context,options) {
            var i, j; //:Integer;
            options=options||{};
            t.useScriptProcessor=options.useScriptProcessor;
            t.useFast=options.useFast;
            t.resolution=options.resolution||120;
            t.context=context;
            t.sampleRate = t.context.sampleRate;
            //t.initNode({});
            //t.WavPlaying=false;
            // inherited Create (Handle);
            t.Delay = 2000;
            t.Pos = t.PrevPos = t.RPos = /*t.WriteAd =*/ t.SeqTime =
            t.SeqTime120 = 0;
            t.BeginPlay=false;
            t.InitWave();
            t.InitEnv();
            t.InitSin();
            t.ConvM2T();
            t.wdata2=[];
            t.PCMW=[];
            t.L2WL=[];
            t.Sync=[];
            t.ECount=[];
            t.MCount=[];
            for (i = 0; i < PCMWavs; i++) {
                t.PCMW[i] = nil;
            }
            t.Steps = [];
            t.SccWave = [];
            t.SccCount = [];
            t.EShape = []; //=t.EnvDat[0];
            t.EVol = [];
            t.EBaseVol = [];
            t.MPoint = [];
            t.MPointC = [];
            t.ESpeed = [];
            t.PlayState = [];
            t.Detune = [];
            t.LfoV = [];
            t.LfoD = [];
            t.LfoDC = [];
            t.PorStart=[];
            t.PorEnd=[];
            t.PorLen=[];
            //t.nextPokeElemIdx = [];
            //t.nextPeekElemIdx = [];
            t.soundMode = [];
            t.CurWav=[];
            t.Oct=[];
            t.Resting=[];
            t.Slur=[];
            t.Sync=[];
            t.LfoV=[];t.LfoA=[];t.LfoC=[];t.LfoD=[];t.LfoDC=[];t.LfoSync=[];
            for (i = 0; i < Chs; i++) {
                t.LfoV[i]=0;t.LfoA[i]=0;t.LfoC[i]=0;t.LfoD[i]=0;t.LfoDC[i]=0;t.LfoSync[i]=0;
                t.Slur[i]=t.Sync[i]=0;
                t.PorStart[i]=t.PorEnd[i]=t.PorLen[i]=0;
                t.ECount[i]=0;
                t.MCount[i]=0;
                t.Resting[i]=0;
                t.Steps[i] = 0;
                t.SccWave[i] = t.WaveDat[0];
                t.SccCount[i] = 0;
                t.EShape[i] = t.EnvDat[0];
                t.EVol[i] = 0;
                t.EBaseVol[i] = 128;
                t.MPoint[i] = nil;
                t.MPointC[i] = 0;
                t.ESpeed[i] = 5;
                t.PlayState[i] = psStop;
                t.Detune[i] = 0;
                t.LfoV[i] = 0;
                t.SelWav(i, 0);
                t.LfoD[i] = 0;
                t.LfoDC[i] = 0;
                t.Oct[i] = 4;
                //t.nextPokeElemIdx[i] = 0;
                //t.nextPeekElemIdx[i] = 0;
                t.soundMode[i] = False;
            }
            /*for i=0 to Ses-1 ) {
                 SeLen[i]=0;
             end;*/
            t.Fading = FadeMax;
            t.timeLag = 2000;

            t.WriteMaxLen = 20000;
            t.WavOutMode = False;
            t.label2Time=[];
            t.PC2Time=[];// only ch:0
            t.WFilename = '';
            /* {$ifdef ForM2}
            t.WavOutObj=nil;
             {$endif}*/
            t.Tempo = 120;
            t.ComStr = '';
            t.performance={writtenSamples:0, elapsedTime:0};
            t.loadWDT();
        },
        /*initNode: function (t,options) {
            var channel=1;
            options=options||{};
            for (var i in options) this[i]=options[i];
            if (typeof (webkitAudioContext) !== "undefined") {
                this.context = new webkitAudioContext();
            } else if (typeof (AudioContext) !== "undefined") {
                this.context = new AudioContext();
            }
            this.sampleRate = this.context.sampleRate;
            this.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);
        },*/
        getBuffer: function (t) {
            var channel=1;
            if (this.buf) return this.buf;
            this.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);
            return this.buf;
        },
        playNode: function (t) {
            if (this.isSrcPlaying) return;
            var source = this.context.createBufferSource();
            // AudioBufferSourceNodeにバッファを設定する
            source.buffer = this.getBuffer();
            // AudioBufferSourceNodeを出力先に接続すると音声が聞こえるようになる
            if (typeof source.noteOn=="function") {
                source.noteOn(0);
                //source.connect(this.node);
            }
            source.connect(this.context.destination);
            // 音源の再生を始める
            source.start();
            source.loop = true;
            source.playStartTime = this.playStartTime = this.context.currentTime;
            this.bufSrc=source;
            this.isSrcPlaying = true;
        },
        startRefreshLoop: function (t) {
            if (t.refreshTimer!=null) return;
            var grid=t.resolution;
            var data=t.getBuffer().getChannelData(0);
            var WriteAd=0;
            for (var i=0;i<wdataSize;i+=grid) {
                t.refreshPSG(data,i,grid);
            }
            function refresh() {
                if (!t.isSrcPlaying) return;
                var cnt=0;
                var playPosZone=Math.floor(t.getPlayPos()/grid);
                while (true) {
                    if (cnt++>wdataSize/grid) throw new Error("Mugen "+playPosZone);
                    var writeAdZone=Math.floor(WriteAd/grid);
                    if (playPosZone===writeAdZone) break;
                    t.refreshPSG(data,WriteAd,grid);
                    WriteAd=(WriteAd+grid)%wdataSize;
                }
            }
            t.refreshTimer=setInterval(refresh,16);
        },
        stopRefreshLoop: function (t) {
            if (t.refreshTimer==null) return;
            clearInterval(t.refreshTimer);
            delete t.refreshTimer;
        },
        stopNode : function (t) {
            if (!this.isSrcPlaying) return;
            this.bufSrc.stop();
            this.isSrcPlaying = false;
        },
        //PutEnv (c,t,v,sp:Word;s:PChar);
        /*PutEnv: function(t, c, time, v, sp, s) {
            t.Sound[c * 2] = time & 255;
            t.Sound[c * 2 + 1] = div(time, 256);
            t.EVol[c] = v;
            t.ESpeed[c] = sp;
            t.ECount[c] = 0;
            t.EShape[c] = s;
        },*/
        //procedure TEnveloper.Play1Sound (c,n:Word;iss:Boolean);
        Play1Sound: function(t, c, n, iss) {
            var TP; //:Integer;
            if (t.soundMode[c]) return; // ) return;
            if (n == MRest) {
                t.Resting[c] = True;
                return;
            }
            if ((c < 0) || (c >= Chs) || (n < 0) || (n > 95)) return; // ) return;
            t.Resting[c] = False;
            if (!iss) {
                t.ECount[c] = 0;
                if (t.Sync[c]) t.SccCount[c] = 0;
                if (t.LfoSync[c] != LASync) t.LfoC[c] = 0;
            }
            if (t.CurWav[c] < WvC) {
                t.Steps[c] = m2tInt[n] + t.Detune[c] * div(m2tInt[n], 2048);
                // m2tInt*(1+Detune/xx)    (1+256/xx )^12 =2  1+256/xx=1.05946
                //    256/xx=0.05946   xx=256/0.05946  = 4096?
            } else {
                if (t.L2WL[c] >= 2) {
                    //Steps[c]:=($40000000 shr (L2WL[c]-2)) div (m2tInt[36] div 65536) * (m2tInt[n] div 65536);
                    t.Steps[c] = div(0x40000000 >>> (t.L2WL[c] - 2), div(m2tInt[36], 65536)) * div(m2tInt[n], 65536);
                }
            }
            t.PorLen[c] = -1;
        },
        //    procedure TEnveloper.Play1Por (c,f,t:Word;iss:Boolean);
        Play1Por: function (t,c,from,to,iss) {
             var TP=0//:Intege;
             if ((c<0)  ||  (c>=Chs)  ||  (to<0)  ||  (to>95) ||
                (from<0)  ||  (from>95) ) return;
             t.Resting[c]=False;

             //TP=m2t[f];
             t.PorStart[c]=m2tInt[from]+t.Detune[c]*div(m2tInt[from] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             //TP=m2t[to];
             t.PorEnd[c]=m2tInt[to]+t.Detune[c]*div(m2tInt[to] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             if  (!iss) t.ECount[c]=0;

        },
        //procedure TEnveloper.PlayMML (c:Word;s:PChar);
        /*PlayMML: function(t, c, s) { // s array of compiled mml (bytearray)
            if ((c < 0) || (c >= Chs)) return; // ) return;
            t.MPoint[c] = s;
            t.MPointC[c] = 0;
            t.PlayState[c] = psPlay;
            t.MCount[c] = t.SeqTime;
            //t.LoopCount = Loops + 1;
        },*/
        //procedure TEnveloper.StopMML (c:Integer);
        StopMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return; // ) return;
            //MPoint[c]=nil;
            t.WaitMML(c);
            t.PlayState[c] = psStop;
            t.MCount[c] = t.SeqTime + 1;
        },
        allWaiting: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.PlayState[i] == psPlay) {
                    return false;
                }
            }
            return true;
        },
        handleAllState: function (t) {
            var allWait=true,allStop=true;
            for(var i=0;i<Chs;i++) {
                switch (t.PlayState[i]) {
                case psPlay:
                    allWait=false;
                case psWait:
                    allStop=false;
                    break;
                }
            }
            //          alw     als
            // P        F       F
            // W        T       F
            // S        T       T
            // P,W      F       F
            // W,S      T       F
            // S,P      F       F
            // P,W,S    F       F
            if (allWait && !allStop) {
                for(var i=0;i<Chs;i++) {
                    t.RestartMML(i);
                }
            }
            return allStop;
        },
        allStopped: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.PlayState[i] != psStop) {
                    return false;
                }
            }
            return true;
        },
        //procedure TEnveloper.RestartMML (c:Integer);
        RestartMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return;
            if (t.PlayState[c] == psWait) {
                t.PlayState[c] = psPlay;
                t.MCount[c] = t.SeqTime + 1;
            }
        },
        restartIfAllWaiting: function (t) {
            if (t.allWaiting()) {
                for(var i=0;i<Chs;i++) {
                    t.RestartMML(i);
                }
            }
        },
        //procedure TEnveloper.WaitMML (c:Integer);
        WaitMML: function(t, c) {
            var i; //:Integer;
            if ((c < 0) || (c >= Chs)) return;
            //MPoint[c]=nil;
            t.PlayState[c] = psWait;
            t.MCount[c] = t.SeqTime + 1;
        },
        //procedure TEnveloper.Start;
        Start: function(t) {
            t.Stop();
            t.Rewind();
            t.BeginPlay = True;
            t.startRefreshLoop();
            t.playNode();
        },
        Rewind: function (t) {
            var ch; //:Integer;
            t.SeqTime=0;
            for (ch = 0; ch < Chs; ch++) {
                t.soundMode[ch] = False;
                t.MPointC[ch] = 0;
                t.PlayState[ch] = psPlay;
                t.MCount[ch] = t.SeqTime;
            }
        },
        Stop: function (t) {
            if (!t.BeginPlay) return;
            t.stopNode();
            t.stopRefreshLoop();
        },
        wavOut: function (t) {
            t.Stop();
            t.Rewind();
            var buf=[];
            var grid=t.resolution;
            for (var i=0;i<grid;i++) buf.push(0);
            var allbuf=[];
            t.writtenSamples=0;
            t.WavOutMode=true;
            t.label2Time=[];
            t.loopStart=null;
            t.PC2Time=[];// only ch:0
            var sec=-1;
            var efficiency=t.wavOutSpeed||10;
            return new Promise(function (succ) {
                setTimeout(refresh,0);
                function refresh() {
                    var ti=new Date().getTime()+efficiency;
                    while (new Date().getTime()<=ti) {
                        for (var i=0;i<grid;i++) allbuf.push(0);
                        t.refreshPSG(allbuf,allbuf.length-grid,grid);
                        t.writtenSamples+=grid;
                        var ss=Math.floor(t.writtenSamples/t.sampleRate);
                        if (ss>sec) {
                            //console.log("Written ",ss,"sec");
                            sec=ss;
                        }
                        //allbuf=allbuf.concat(buf.slice());
                        if (t.allStopped()) {
                            t.WavOutMode=false;
                            succ(allbuf);
                            return;
                        }
                    }
                    setTimeout(refresh,0);
                }
            });
        },
        toAudioBuffer: function (t) {
            return t.wavOut().then(function (arysrc) {
                var buffer = t.context.createBuffer(1, arysrc.length, t.sampleRate);
                var ary = buffer.getChannelData(0);
                for (var i = 0; i < ary.length; i++) {
                     ary[i] = arysrc[i];
                }
                var res={decodedData: buffer};
                if (t.loopStart) res.loopStart=t.loopStart[0]/t.loopStart[1];
                return res;
            });
        },
        //procedure TEnveloper.SelWav (ch,n:Integer);
        SelWav: function(t, ch, n) {
            t.CurWav[ch] = n;
            if (n < WvC) {
                t.SccWave[ch] = t.WaveDat[n];
                t.L2WL[ch] = 5;
                t.Sync[ch] = False;
            } else {
                if (t.PCMW[n - WvC] != nil) {
                    t.SccWave[ch] = t.PCMW[n - WvC].Start;
                    t.L2WL[ch] = t.PCMW[n - WvC].Log2Len;
                    t.Sync[ch] = True;
                }
            }
        },
        RegPCM: function (t,fn, n) {
            console.log("[STUB]regpcm",fn.map(function (e) {return String.fromCharCode(e);}),n);
        },
        /*
        procedure TEnveloper.RegPCM (fn:string;n:Integer);
        var i:Integer;
            wl,wl2:TWavLoader;
        {
             if ( ! FileExists(fn) ) {
                fn=ExtractFilePath (ParamStr(0))+'\\'+fn;
                if ( ! FileExists(fn) ) return;
             }
             for ( i=0 to Chs-1 )
                 if ( CurWav[i]==n ) SelWav(i,0);
             wl=TWavLoader.Create (fn);IncGar;
             if ( ! wl.isError ) {
                if ( PCMW[n-WvC]!=nil ) {
                   PCMW[n-WvC].Free; DecGar;
                }
                wl2=TWavLoader.Clone (TObject(wl));  IncGar;
                PCMW[n-WvC]=wl2;
             }
             wl.Free;   DecGar;

        }
        */
        refreshPSG: function(t,data,WriteAd,length) {
            var i, ch, WaveMod, WriteBytes, wdtmp, inext, mid, w1, w2, //:integer;
                TP = [],
                vCenter = [], //:array [0..Chs-1] of Integer;
                //Steps:array [0..Chs-1] of Integer;
                Lambda, NewLambda, //:Real;
                res, //:MMRESULT;
                WriteTwice, LfoInc, //:Boolean;
                WriteMax, //:integer;
                nowt, //:longint;
                // AllVCenter:Integer;
                Wf=0, Wt=0, WMid=0, WRes=0, WSum=0, v=0, NoiseP=0, Tmporc=0, //:Integer;
                LParam, HParam, WParam, //:Byte;
                JmpSafe, EnvFlag, //:Integer;
                se; //:^TSoundElem;

            EnvFlag = 0;
            LfoInc = True;
            cnt++; //inc(cnt);

            var mcountK=t.sampleRate / 22050;
            var tempoK=44100 / t.sampleRate ;
            //var alstp=false;
            var startTime=new Date().getTime();
            //var startSamples=bufferState.writtenSamples;
            //console.log(bufferState.WriteAd, WriteMax);
            if (t.allStopped()) {
                for (var i=WriteAd; i<=WriteAd+length; i++) {
                    data[i]=0;
                }
                return;
            }
            var vv=[],SeqTime=t.SeqTime,lpchk=0;
            for (ch = 0; ch < Chs; ch++) {
                if (t.MPoint[ch][t.MPointC[ch]] == nil) t.StopMML(ch);
                if (t.PlayState[ch] != psPlay) continue;
                if (t.PorLen[ch] > 0) {
                    Tmporc = t.MCount[ch] - SeqTime;
                    t.Steps[ch] = (
                        div(t.PorStart[ch], t.PorLen[ch]) * Tmporc +
                        div(t.PorEnd[ch], t.PorLen[ch] * (t.PorLen[ch] - Tmporc))
                    );
                }
                if ((t.soundMode[ch]))
                    v = t.EVol[ch];
                else if ((t.Resting[ch]))
                    v = 0;
                else
                    v = t.EShape[ch][t.ECount[ch] >>> 11] * t.EVol[ch] * t.EBaseVol[ch]; // 16bit
                if (t.Fading < FadeMax) {
                    v = v * div(t.Fading, FadeMax); // 16bit
                }
                vv[ch]=v;
                if (t.ECount[ch] + t.ESpeed[ch]*(length/2) < 65536 ) t.ECount[ch] += t.ESpeed[ch]*(length/2);

                //####MMLProc (ch);
                JmpSafe = 0;
                //dec (MCount[ch]);

                //if (ch==0) console.log("ch",ch,"Code",t.MCount[ch],t.SeqTime);

                while (t.MCount[ch] <= SeqTime) {
                    //if (lpchk++>1000) throw new Error("Mugen2");
                    //MCount[ch]=0;
                    var pc = t.MPointC[ch];
                    if (ch==0) t.PC2Time[pc]=t.writtenSamples;
                    LParam = t.MPoint[ch][pc + 1];
                    HParam = t.MPoint[ch][pc + 2];
                    var code = t.MPoint[ch][pc];
                    //console.log("ch",ch,"Code",code)
                    if (code >= 0 && code < 96 || code === MRest) {
                        //console.log(ch, t.MCount[ch], SeqTime,(LParam + HParam * 256) * 2);
                        t.Play1Sound(ch, code, t.Slur[ch]);
                        if (!t.Slur[ch]) t.LfoDC[ch] = t.LfoD[ch];
                        t.Slur[ch] = False;
                        //MCount[ch]=SPS div LParam;
                        t.MCount[ch] +=
                            (LParam + HParam * 256) * 2;
                        // SPS=22050の場合 *2 を *1 に。
                        // SPS=x の場合   * (x/22050)
                        t.MPointC[ch] += 3;
                    } else switch (code) {
                        case MPor:{
                             t.Play1Por (ch,
                               LParam,
                               HParam,
                               t.Slur[ch]
                             );
                             t.Slur[ch]=False;
                             t.MCount[ch]+=
                             ( t.MPoint[ch][pc + 3]+t.MPoint[ch][pc + 4]*256 )*2;
                            // SPS=22050の場合 *2 を *1 に。
                             t.PorLen[ch]=t.MCount[ch]-SeqTime;
                             t.MPointC[ch]+=5;
                        }break;
                        case MTempo:
                            {
                                t.Tempo = LParam + HParam * 256;
                                t.MPointC[ch] += 3;
                            }
                            break;
                        case MVol:
                            {
                                t.EVol[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MBaseVol:
                            {
                                t.EBaseVol[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case Mps:
                            {
                                t.ESpeed[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MSelWav:
                            {
                                //SccWave[ch]=@t.WaveDat[LParam,0];
                                t.SelWav(ch, LParam);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MWrtWav:
                            {
                                t.MPointC[ch] += 34; // MWrtWav wavno data*32
                                for (i = 0; i < 32; i++) {
                                    t.WaveDat[LParam][i] = t.MPoint[ch][pc + 2 + i];
                                }
                            }
                            break;
                        case MSelEnv:
                            {
                                t.EShape[ch] = t.EnvDat[LParam];
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MWrtEnv:
                            { // MWrtEnv envno data*32
                                t.MPointC[ch] += 34;
                                for (i = 0; i < 32; i++) {
                                    wdtmp = t.MPoint[ch][pc + 2 + i];
                                    if (wdtmp > 15) wdtmp = 15;
                                    t.EnvDat[LParam][i] = wdtmp;
                                }
                            }
                            break;
                        case MJmp:
                            {
                                if (t.WavOutMode) {
                                    if (ch==0) {
                                        var dstLabelPos=t.MPointC[ch] + array2Int(t.MPoint[ch], pc+1);
                                        //var dstLabelNum=t.MPoint[ch][dstLabelPos+1];
                                        var dstTime=t.PC2Time[dstLabelPos];// t.label2Time[dstLabelNum-0];
                                        if (typeof dstTime=="number" && dstTime<t.writtenSamples) {
                                            t.loopStart=[dstTime, t.sampleRate];
                                            console.log("@jump", "ofs=",t.loopStart );
                                        }
                                    }
                                    t.MPointC[ch] += 5;
                                } else {
                                    /*console.log("old mpointc ",t.MPointC[ch],LParam,HParam,t.MPoint[ch][pc + 3],t.MPoint[ch][pc + 4],LParam << 0 +
                                    HParam << 8 +
                                    t.MPoint[ch][pc + 3] << 16 +
                                    t.MPoint[ch][pc + 4] << 24);*/
                                    t.MPointC[ch] += array2Int(t.MPoint[ch], pc+1);
                                    /*LParam << 0 +
                                    HParam << 8 +
                                    t.MPoint[ch][pc + 3] << 16 +
                                    t.MPoint[ch][pc + 4] << 24;*/
                                    //console.log("new mpointc ",t.MPointC[ch]);
                                }
                                JmpSafe++;
                                if (JmpSafe > 1) {
                                    console.log("Jumpsafe!");
                                    t.StopMML(ch);
                                    t.MCount[ch] = SeqTime + 1;
                                }
                            }
                            break;
                        case MLabel:
                            if (t.WavOutMode && ch==0) {
                                t.label2Time[LParam]=[t.writtenSamples,t.sampleRate];
                                console.log("@label", LParam , t.MPointC[ch] , t.writtenSamples+"/"+t.sampleRate );
                            }
                            t.MPointC[ch]+=2;
                            break;
                        case MSlur:
                            {
                                t.Slur[ch] = True;
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MWait:
                            {
                                t.WaitMML(ch);
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MCom:
                            {
                                t.ComStr = StrPas(t.MPoint[ch], pc + 1);
                                t.MPointC[ch] += t.ComStr.length + 2; // opcode str \0
                                //inc (MPoint[ch],length(comstr)+2);
                            }
                            break;
                        case MWOut:
                            {
                                t.WFilename = StrPas(t.MPoint[ch], pc + 1);
                                t.MPointC[ch] += t.WFilename.length + 2; // opcode str \0
                                //inc (MPoint[ch],length(WFilename)+2);
                            }
                            break;
                        case MWEnd:
                            {
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MDet:
                            {
                                t.Detune[ch] = ShortInt(LParam);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MLfo:
                            {
                                t.LfoSync[ch] = (LParam);
                                t.LfoV[ch] = (HParam) * 65536;
                                t.LfoA[ch] = (t.MPoint[ch][pc + 3]);
                                t.LfoD[ch] = 0;
                                t.MPointC[ch] += 4;
                            }
                            break;
                        case MLfoD:
                            {
                                t.LfoD[ch] = LParam * t.sampleRate;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MSync:
                            {
                                t.Sync[ch] = (LParam == 1);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MPCMReg:{
                            var fn=StrPas(t.MPoint[ch], pc+1);
                            t.RegPCM (fn,t.MPoint[ch][pc+1+fn.length+1]);
                            t.MPointC[ch]+=fn.length +3;
                        }break;
                        case Mend:
                            t.StopMML(ch); //MPoint[ch]=nil;
                            break;
                        default:
                            throw new Error("Invalid opcode" + code); //ShowMessage ('???'+IntToSTr(Byte(MPoint[ch]^)));
                            t.StopMML(ch);
                            t.MPointC[ch] += 1;
                    }
                }
                // End Of MMLProc
            }
            t.handleAllState();
            t.SeqTime+= Math.floor( t.Tempo * (length/120) * tempoK );
            for (var ad=WriteAd; ad<WriteAd+length; ad++) {
                data[ad]=0;
            }
            for (ch = 0; ch < Chs; ch++) {
                if (t.PlayState[ch] != psPlay) continue;
                for (var ad=WriteAd; ad<WriteAd+length; ad++) {
                    //if (lpchk++>100000) throw new Error("Mugen3 "+WriteAd+"  "+length);

                    LfoInc = !LfoInc;
                    //EnvFlag++;
                    //if (EnvFlag > 1) EnvFlag = 0;

                    WSum = data[ad];
                    v=vv[ch];
                    if (v > 0) {
                        i = chkn(t.SccCount[ch] >>> (32 - t.L2WL[ch]));
                        //inext=(i+1) & ((1 << L2WL[ch])-1);

                        //mid=(SccCount[ch] >> (24-L2WL[ch])) & 255;

                        // *****000 00000000 00000000 00000000
                        //                      ***** 00000000

                        w1 = chkn(t.SccWave[ch][i]);
                        chkn(v);
                        //w2=Byte((SccWave[ch]+inext)^) ;

                        /*WSum += ((
                            div((w1 * v), (16 * 128))
                        ) - div(v, 16))/32768;*/
                        WSum += (
                            (w1 * v)/ 0x4000000
                        ) - (v / 0x80000);


                        if (!t.Sync[ch]) {
                            (t.SccCount[ch] += t.Steps[ch]);
                        } else {
                            if ((t.SccCount[ch] < -t.Steps[ch] * 2) || (t.SccCount[ch] >= 0))(t.SccCount[ch] += t.Steps[ch]);
                        }
                        if ((t.LfoV[ch] != 0)) {
                            if ((t.LfoDC[ch] > 0)) {
                                (t.LfoDC[ch] -= t.Tempo);
                            } else {
                                (t.SccCount[ch] +=
                                    sinT[t.LfoC[ch] >>> (16 + sinMax_s)] *
                                    div(t.Steps[ch], 512) *
                                    div(t.LfoA[ch], 256)
                                );
                                if (LfoInc) t.LfoC[ch] += t.LfoV[ch];
                            }

                        }
                    }

                    if (WSum > 1) WSum = 1; //16bit
                    if (WSum < -1) WSum = -1; //16bit
                    data[ad]=WSum;
                    if (ch==0) t.WaveDat[95][NoiseP & 31] = Math.floor(Math.random() * 78 + 90);
                    NoiseP++;
                }//of for (var i=WriteAd; i<=WriteAd+length; i++
                //bufferState.writtenSamples+=length;


            }// of ch loop
            t.performance.elapsedTime+=new Date().getTime()-startTime;
            t.performance.writtenSamples+=length;
            t.performance.writeRate=t.performance.writtenSamples/(t.performance.elapsedTime/1000*t.sampleRate);
            //WTime=GetTickCount-WTime;
            //BufferUnderRun= getPlayPos - LastWriteStartPos;

            //--------------|---------------------------
            //             playpos  LS            LE
            //                       +-------------+

        }// of refreshPSG
    }); // of Klass.define
    var undefs={};
    for(var k in defs) {
        var fldreg=/\bt\s*\.\s*([a-zA-Z0-9]+)\b/g;
        if (typeof defs[k]==="function") {
            var src=defs[k]+"";
            var r=src.replace(fldreg, function (_,name) {
                //console.log(name);
                if (!defs.$fields[name]) {
                    if (undefs[name]==null) undefs[name]=1;
                    //console.error("Undefined ",name);
                }
            });
            undefs[k]=0;
        }
    }
    console.log(undefs);
    return TEnveloper;
}); // of requirejs.define

/*
procedure TEnveloper.PlayKeyBd (n,WaveSel:Integer);
var i,ch,WaveMod,WriteBytes,wdtmp:integer;
    TP,vCenter:array [0..Chs-1] of Integer;
    Lambda,NewLambda:Real;
    res:MMRESULT;
    WriteMax:integer;
    nowt:longint;
    AllVCenter:Integer;
    Wf,Wt,WMid,WRes,WSum,v,NoiseP:Integer;
    LParam,WParam:Byte;
    JmpSafe:Integer;
{
     Start;
     ch=Chs-1;
     Play1Sound (ch,n,False);
     EVol[ch]=127;
     SccWave[ch]=@WaveDat[WaveSel,0];

     mmt.wType=TIME_SAMPLES;
     WaveOutGetPosition (hwo, @mmt, SizeOf(MMTIME));

     Pos=mmt.Sample mod Bsize;
     WriteAd=(Pos+Delay) mod BSize;
     WriteMax=(Pos+BSize-1) mod BSize;

     while ( WriteAd!=WriteMax ) {
           WSum=0;//wdata2[WriteAd];
           v=(( Byte(( EShape[ch]+(ECount[ch] >> 11) )^) )*EVol[ch]*EBaseVol[ch]);
           if ( v>0 ) {
                  i=SccCount[ch] >> 27;
                  inc (WSum,(
                            ( Byte((SccWave[ch]+i)^)*v ) div (16*128)
                         )-v div 16
                  );
                  inc (SccCount[ch],Steps[ch]);
           }
           if ( ECount[ch]+ESpeed[ch]<65536 ) inc (ECount[ch],ESpeed[ch]);


           //WSum=(PrevWSum+WSum) div 2;

           WRes=WSum+wdata2[WriteAd];

           if ( WRes>32767 ) WRes=32767;     //16bit
           if ( WRes<-32768 ) WRes=-32768;         //16bit

           wdata2[WriteAd]=WRes;

           //PrevWSum=WSum;

           inc (WriteAd);
           WriteAd=WriteAd mod BSize;
     }

}

procedure TEnveloper.calibration;
var l,p,i:Integer;
{
     p=(Pos+timeLag+BSize) mod BSize;
     for ( i=0 to BSize-1 ) {
          l=i-p;
          if ( l<-BSize div 2 ) inc(l,BSize);
          if ( l>=BSize div 2 ) dec(l,BSize);
          if ( ((i mod 100)<50) &&
              (abs(l)<calibrationLen)  ) {
                wdata2[i]=20000*(calibrationLen-abs(l)) div calibrationLen  ;

          } else wdata2[i]=0;
     }
}

end.
MZO format
1[c]
       Version    Chs ch0.length   ch0 data
000000 b0 04 00 00|0a|1b 00 00 00{64 78 65 05 6e 00 66
000010 00 6b 00 73 00 00 00 76 00 74 00 67 78 00 24 22
                   ch1.length   ch1 data...
000020 56 ff ff ff}15 00 00 00 64 78 65 05 6e 00 66 00
000030 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00
000040 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76
000050 00 74 00 ff ff ff 15 00 00 00 64 78 65 05 6e 00
000060 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15
000070 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00
000080 00 76 00 74 00 ff ff ff 15 00 00 00 64 78 65 05
000090 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff
0000a0 ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73
0000b0 00 00 00 76 00 74 00 ff ff ff 15 00 00 00 64 78
0000c0 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00
0000d0 ff ff ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b
0000e0 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00 00
0000f0 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00
000100 74 00 ff ff ff
000105

       1b 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00
       00 00 76 00 74 00 67 78 00 24 22 56 ff ff ff}


       15 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00
       00 00 76 00 74 00 ff ff ff}

*/

requireSimulator.setName('Tones.wdt');
define([],function () {
    return "data:application/octet-stream;base64,UFBQUFBQUFBQUFBQUFBQULm5ubm5ubm5ubm5ubm5ublnZ2dnZ6einUdETExBTHyao6OZnpNASWqZmJqZMENshm1LOjA6UFZOMys4RVBfZ3iHmKCvwMfUzLGpr8XPxbSSoGdnVUpBQD9BSUpKTlJjfK7BxL+xoHxiVkpPaIGToK1oYVZORkA5NDQ0NjpBSVZgbHuKlaOrrq6tq6Sfk4d8dopORUtVYGJobGdQRTw7RmF4jLO6uK+cmZmZmZqalY6MTkxOS0tLS0tLS0tLS0tLTH2uxc7SzruegVFQUE9PT05GSUdHRkZGRkZGz8/MzMzOz87Oz3dERUVFRUXOztDQSSdPa2xsa2tra2ttbW1ta4yx29rb3MGkim5WQSUlJScnR0lJSUlJSkpKSUlJSUlJSUlKvLy8u7y8u75GRkdHR0fs7OwPSqmfUEtJRTg4ODY2LysrKSkoKh4eHh4eHh4eH05OT09PT09PT09PT09PUFBQUFBQUFBQUFBPT0+4tra2Z2dbOTg7R2eIpK2kmIlsVUxHSlhwhJ+xq6OZmZmZjYiVioFsUS0iICo2TmCClaCzsaVrTEpccZGuurazsK+pop9cY1eRfGtfVUc/dZKecWhtomFjX3aBgXFgVUlAUYeY1ipFVWNseIKMkpmiqK2wubu+wMTFxcbGy8vQ0tHR0tR3iGBXbElAqKuOUk9Yk5OvuLm5ubSgcFZLTGpukpRma2dnZ2dnfpeZl4dwalBOZ2egtbOZeGVmcYKdrbWwrZmZZ2dnZ0c5MzMxMTEzNTk8Z5mZmZmZmcnJx8fGxsXDv7NKQUBUZW1tZV1dY3eUoKqrq5+cnai6xMXAtaWdk4p3YDA8TFZhZ3J8hI6fqrW/z9fs1rypnY2AcWFSRz80LSkgPEFGTlBWV1xdYmhscHN3eHyChoqRlZmeoKKlrbC1usHGv7WupaOak4+IiIR+eXhzbmtnYF1bxsZUUU5JQzs4NmBgYGBhwMC/v7/Dw8PExMPDw2NiZWVlZWVlZWVlYWFlV1dWVlRRVFJSUlTFxcXExMPDw8PDxFBQVFRUVldTVFfHx8fGxcS/v7u5tLCtp6Cal5KOhIB7cm5oYFdOPjgqxauxqZoXipOUZ2eTQ0GIlW2up6+VztDWSXKrpVCoTIOkyz5AQUFBQ0NBP0BGS1FdaHF3goePmaCps7u/xMXFxccjIChdZWBcRx8cGh0rRF11jaW80uBzs6ez29zOqY1qPmxmVjNBPmegtLy1u7iajYyUo6uqpJ+XkY2NjYyKiISZZ2dohIRYW4SEVleUq7q6sI1EREtlkZFbXJOrvr68sZeZmJhnZ2dnZ7a4QUNDP8vR0c/Oy8tFR0eZmZmZmZmZmShmg6q4qYqTpbq7uLWzq6igoJ6Xko2BdmNROC01SkMqAOH3/v/73wDh+v//+eoA6Pj+//nqAOj4///46gDk9vxnZ2dnqKqtgHl1gJSdnZV3cHOCjZyjoJyYl5SUmZmZmUNBRUdLVFhicHt+fn5+fn5+fn5+fn2BiJSns7/ExsbFcHBwcHBtbW1sbGxsbW1sbG1ubXzBw3M1HyApamxtbWzPz8/Oz8nBs5R7Zl1FOTw4RFJgc4mgvsXLy1dSUltix3FwcHBwc3V1dXV1dXNxcXFy1tYgIiJ2dnZ2dnZ1cXFxXDooNVowKDBcMCk1Q1BdeI2kvt3q4Ljd5tyx3+jcqH1mX19mZ2eZmYQ8PkZHSldddYKPlJmZmZmZmZmZmZmTjGdnZ3l4eHl5bFVMSklUgKSxsbawmqqzy76Yk7O+tLCtUTowLVKPsMHS1dHOzMfDtauZgWBFPDEzMTE+XICTjoFnZ2dnW09LXU5FVmNzhJOerrqnj4S/uJmZmZmZmZmZmb5RUElMTrXQ3N3cyYZwbHWOo8HV3dvBnZWOj5mgq7G4fX18gMG/e3h4eXl5fHx8gcG8gjAvLi4uLi4xMTAwL31HxMXGxsbFxcXFxURBPz8/QMPDxMTDw0ZDQ0FGRkdHR5q50OPcv62YhHV2j6u1qo5xVUpUcImKe2dSQCMcL0ZleGtcPDEuJygzYGNjZWZmZ567w8XAqaCOj4+SlJWUlIxlZWVHNjAkJTFQX2BgYGBfYp2qsbGwqJmRjoN8dXJubGdnZ2dUTEtQVFhfZWhxfI2vwMbJyb6qZ1pSRUaZmZmZgIePoLvQ29GwdrDQ3NS+nmFBKyMvT5JPLiQvRF9weH+uvsTEuqBYo7nAwL6vd2FQR0dHandqSklJSUlJSldshv8SfP8NaP7/DAz/B/0DA8T/yw/r++4PbfcSEvX4FBpaUWfJe7Cfqatnq2erqZ9KO5N952qZW4d2c3WGxlCZmdJnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZmenJR5d4KSlYRmVlBRUVJnr8fHwbSrpaKelHllZWVugWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnbmBfYmuOvsC5qJKHhIB+fXx8fXFnVVaan5mZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dhWoGRhltYZXyap6mfc3FmYXycqa6kj4J9fYGMZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlzdTw6Oz8/Pz9FR0pPV2Fqc36JjZqgqrC2vL+/vnd3c5pROjQxKycrKysuMDAxNj44ODtKk7zL0NS/jK/A0Mm4Z2dnZ2dnZ2dnZ2dnZ2dnZ5KtwdDMwamNZmdnZ2dnZ2eKg2dfaGt5eYS4mnBmY2VnZ2dna4+rq6t+bnZ2oKOnmLCwZ0k8Ozs7PEBLUltsj6q0ury6mX1RSpi5uFBKh6u5S05Ma2trampqTE5OTk5OecnJysvLra+urq60yc7OzspwcHJy1NbX2NjY1tR1cnV1c3Nzubm2tkNBQUNxcHJycaurq2dnZ2dmY2NqxsbExV9fX2HGycbGxkVEPkA8Ozs7Ii5L/+sAGi9FYXecvtXh7PX5/v7+/v7++/Dr3LAoDRMjIiUCIy8rPDRHUU9GHhMZIDUKCkQqGhoKCQwREy88PoSMnIynoLuoz7i8l6eCcnxXZjlOGE9BbmGCopfGp7iZQUNFTHagya6TcEVDQUFBW2iBmai5xc/Gua2VfWtWTkc7Ozs8tLS0trS0Ojo4ODk5uLi4tra2tbW2tra4tbW1tT5WaHFzbF1QODlLbp21w8/Rz8/Pz9DR0dHR0c65h1Y+coOgu8TDuZ13YEA0MDM/VG2Hmaq1wMXGxsO1p5SAc206c3NzlaeooIhYQzpAZnZ1dsPBwMDBwcHBwHV3dnM7O09wlMXav5d2XUs1IjtGXHWPorDF2MOtmYFxW0s6LygkZ2doMzMzMTNlZWhnlZWVlZWV0NDS0NDQ0NDPmJmZmWeYXC8tLS0tLispKTxlfJGcnaq1uriulJK4trWYlbq4qGdnZ2dnZ2dnZ2dnZ2dnZ2eZqL7Hyb+xnJSEfTEpQJyaZ2dnZ2evsLS5Tjw8RU5PZ5mZmZmZmWhdXF+ZmZmZmZlnZ2eAl56VaFJFQ0VKZ2dnmZmZmZmZmZmZmZmZmZmZmWJnZ2dnZ2dnZ2dnZ2dnZ2eZtb6+saOVh3x5cVQ/QUxfNEFOXWVrc36Hj5yjpaijeJejtsDFys/V1tfX1tXV1SuaUTpYVlZ5WlxdXDAwMWA+ODg7SpO5xtDOz6TQ0Mq8rspnUVFMS1ZztsbHvq+djU9PUGF2iZior7i+wMHDxsnKP1BmZWA4NCozO1eInrPBxYaGg7+/moJRQDAkIyMkKTNbWldXV2d2dmc4ODg5OnmvxcTExMSxV1hYWFiImZmZilqCipRyj5uHomxkmX19hY2giWeHZmSMg5RnmIGZpYFmDw4LCgoJCAcHBgYFBQQEAwMDAgICAgICAgICAgICAgAPDgsKCQkJCAgIBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwEODg4ODg4ODg0MDAwMDAwMDAwLCwsLCwsLCwoKCgoKAgUICgsNDg8PDw8PDw8ODg0NDAwLCwsKCgoJCQgICAcPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQ8PDw8ODg4ODg4ODg4ODg4ODg0NDAwLCgoJCAgGBQQCAQAAAAUHCQoLCwwMDA0NDQ0ODg4ODg0NDQ0NDAwMDAwMDAwBAQECAgIDAwMDBAQFBAQFBQYHBwgJCQoLCwwNDg4ODg8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgcGBgYGBQUFBQYHCAgHCAgBAQEBAAA=";
});

requireSimulator.setName('runtime');
requirejs(["ImageList","PicoAudio","T2MediaLib","Tonyu","UIDiag","SEnv","Tones.wdt"],
function (i,p,t,tn,u,mz,wdt) {
    console.log("runtimes loaded",arguments);
    if (!window.PicoAudio) window.PicoAudio=p;
    if (!window.T2MediaLib) window.T2MediaLib=t;
    if (!window.Mezonet) window.Mezonet=mz;
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
