// Created at Wed Oct 28 2015 10:17:24 GMT+0900 (東京 (標準時))
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
        window.WebSite={
            urlAliases: {
                "images/Ball.png":"../../images/Ball.png",
                "images/base.png":"../../images/base.png",
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                "images/sound.png":"../../images/sound.png",
                    "images/ecl.png":"../../images/ecl.png"
            },top:"../..",devMode:devMode
        };
    } else {
        window.WebSite={
           urlAliases: {}, top: "../..",devMode:devMode
        };
    }
    // from https://w3g.jp/blog/js_browser_sniffing2015
    var u=window.navigator.userAgent.toLowerCase();
    window.WebSite.tablet=(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
    || u.indexOf("ipad") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
    || u.indexOf("kindle") != -1
    || u.indexOf("silk") != -1
    || u.indexOf("playbook") != -1;
    window.WebSite.mobile=(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
    || u.indexOf("iphone") != -1
    || u.indexOf("ipod") != -1
    || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
    || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
    || u.indexOf("blackberry") != -1;

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
    window.WebSite.blobPath=window.WebSite.serverTop+"/serveBlob";        //TODO: urlchange!
    window.WebSite.isNW=(typeof process=="object" && process.__node_webkit);
    window.WebSite.tonyuHome="/Tonyu/";
    window.WebSite.url={
        getDirInfo:WebSite.serverTop+"/getDirInfo",
        getFiles:WebSite.serverTop+"/File2LSSync",
        putFiles:WebSite.serverTop+"/LS2FileSync"
    };
    if (window.WebSite.isNW) {
        window.WebSite.cwd=process.cwd().replace(/\\/g,"/").replace(/\/?$/,"/");
        if (process.env.TONYU_HOME) {
            window.WebSite.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/").replace(/\/?$/,"/");
        } else {
            window.WebSite.tonyuHome=window.WebSite.cwd+"fs/Tonyu/";
        }
        window.WebSite.logdir="/var/log/Tonyu/";
        window.WebSite.kernelDir=window.WebSite.cwd+"www/Kernel/";
    }
    window.WebSite.compiledKernel=window.WebSite.top+"/Kernel/js/concat.js"
    return window.WebSite;
});

requireSimulator.setName('assert');
define([],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    Assertion.prototype={
        fail:function () {
            var a=$a(arguments);
            a=flatten(a);
            a=this.failMesg.concat(a);
            console.log.apply(console,a);
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) this.fail(failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) this.fail(a,"!==",b);
            return a;
        },
        is: function (value,type) {
            var t=type,v=value;
            if (t==null) return t;
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    var na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    na.is(v[i],t[i]);
                }
                return value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    var na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return value;
            }
            this.fail("Invaild type: ",t);
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
        }
    };
    /*var assert=function () {
      var a=assert.a(arguments);
      var t=a.shift();
      if (!t) assert.fail(a);
      return true;
   };*/
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion;
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.is=function () {
        try {
            return top.is.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.eq=function () {
        try {
            return top.eq.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.ensureError=function () {
        try {
            return top.ensureError.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.fail=top.fail.bind(top);
    /*
   assert.fail=function () {
      var a=assert.a(arguments);
      a=flatten(a);
      a.unshift("Assertion failed: ");
      console.log.apply(console,a);
      throw new Error(a.join(" "));
   };
   assert.is=function (value, type, mesg) {
      var t=type,v=value;
      mesg=mesg||[];
      if (t==null) return true;
      assert(value!=null,mesg.concat([value, "should not be null/undef"]));
      if (t instanceof Array) {
          if (!value || typeof value.length!="number") {
              assert.fail(mesg.concat([value, "should be array:", type]));
          }
          t.forEach(function (te,i) {
              assert.is(value[i],te,mesg.concat(["failed at ",value,"[",i,"]: "]));
          });
          return;
      }
      if (t===String || t=="string") {
          return assert(typeof(v)=="string",
          mesg.concat([v,"should be string "]));
      }
      if (t===Number || t=="number") {
          return assert(typeof(v)=="number",
          mesg.concat([v,"should be number"]));
      }
      if (t instanceof Object) {
          for (var k in t) {
              assert.is(value[k],t[k],mesg.concat(["failed at ",value,".",k,":"]));
          }
          return true;
      }
      if (t._assert_func) {
          return t._assert_func(v,mesg);
      }
      return assert(v instanceof t,
      mesg.concat([v, "should be ",t]));
   };*/
    assert.f=function (f) {
        return {
            _assert_func: f
        };
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
    return str.substring(0, prefix.length)===prefix;
}
var driveLetter=/^([a-zA-Z]):/;
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
var AbsDir=assert.and(Dir,Absolute);

var Dir=assert.f(function (s) {
    this.is(s,Path);
    this.assert( PathUtil.isDir(s) , [s, " is not a directory path"]);
});
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
    isPath: function (path) {
    	assert.is(arguments,[String]);
		return !path.match(/\/\//);
    },
    isRelativePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) && !PathUtil.isAbsolutePath(path);
    },
    isAbsolutePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) &&
		(PathUtil.startsWith(path,SEP) || PathUtil.hasDriveLetter(path));
    },
    isDir: function (path) {
		assert.is(arguments,[Path]);
        return endsWith(path,SEP);
    },
	splitPath: function (path) {
		assert.is(arguments,[Path]);
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
		assert.is(arguments,[AbsDir,AbsDir]);
        if (path.substring(0,base.length)!=base) {
            return "../"+PathUtil.relPath(path, this.up(base));
        }
        return path.substring(base.length);
    },
    up: function(path) {
		assert.is(arguments,[Path]);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
return PathUtil;
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
requireSimulator.setName('SFileNW');
define(["WebSite","Env"],function (WebSite,Env) {
var exports={};
if (!WebSite.isNW) return {};
//--------begin of SFile.js
var fs=require("fs");
var env=new Env(WebSite);
var SEP="/";
var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
function SFile(path) {
    this._path=toCanonicalPath(path);
}
function extend(dst,src) {
	for (var i in src) dst[i]=src[i];
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
var driveLetter=/^([a-zA-Z]):/;
var hasDriveLetter=driveLetter.exec(process.cwd());
function isAbsolute(path) {
    return !hasDriveLetter && startsWith(path,SEP) ||
            hasDriveLetter && path.match(driveLetter);
}
function truncSep(path) {
    if (endsWith(path,SEP)) return path.substring(0,path.length-1);
    return path;
}
// same as zip.js
var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
        ".mp3":"audio/mp3", ".ogg":"audio/ogg"};
exports.resolve=function (path, base) {
    path=env.expandPath(path);
    return exports.get(toCanonicalPath(path, base));
};
exports.expandPath=function () {
    return env.expandPath.apply(env,arguments);
};

function toCanonicalPath(path, base) {
    base=base || process.cwd();
    base=base.replace(/\\/g,SEP);
    path=path.replace(/\\/g,SEP);
    if (hasDriveLetter && startsWith(path,SEP)) {
        var c=base;
        var d=driveLetter.exec(c);
        if (d) {
            path=d[0]+path;
        } else {
            throw new Error(base+" : should have drive letter");
        }
    } else if (!isAbsolute(path)) path=truncSep(base)+SEP+path;
    var paths=path.split(SEP);
    var built=[];
    paths.forEach(function (p) {
        if (p=="") return;
        if (p==".") return;
        if (p=="..") {
            built.pop();
            return;
        }
        built.push(p);
    });
    var res=built.join(SEP);
    if (!hasDriveLetter) res=SEP+res;
    if (!isAbsolute(res)) throw new Error(res+": is not absolute. hasDriverLetter="+hasDriveLetter);
    res=truncSep(res);
    if (endsWith(path,SEP)) res+=SEP;
    return res;
}
extend(SFile.prototype,{
    isSFile: function (){return true;},
	text:function () {
		if (arguments.length==0) {
		    if (this.isDir()) {
		        return json.stringify(this.metaInfo());
		    }
            if (this.isBinary()) {
                return this.readDataURLFromBin();
            } else {
                return fs.readFileSync(this.path(), {encoding:"utf8"});
            }
		} else {
			var p=this.up();
			if (p) p.mkdir();
			if (this.isBinary()) {
                this.writeBinFromDataURL(arguments[0]);
			} else {
                fs.writeFileSync(this.path(), arguments[0]);
			}
		}
	},
	lines: function () {
	    return this.text().split("\n");
	},
	readDataURLFromBin: function () {
	    var head=this.dataHeader();
	    b=fs.readFileSync(this.path());
	    if (b[0]==head.charCodeAt(0)// d
	     && b[1]==head.charCodeAt(1)// a
	     && b[2]==head.charCodeAt(2)// t
	     && b[3]==head.charCodeAt(3)// a
	     && b[4]==head.charCodeAt(4)// :
	     ) {
	        // file content is dataurl.
	        return b.toString("utf8");
	    }
	    var base64=b.toString("base64");
	    return head+base64;
	},
	writeBinFromDataURL: function (dataURL) {
	    var head=this.dataHeader();
	    var base64=dataURL.substring(head.length);
	    var buf=new Buffer(base64,"base64");
	    var wstream = fs.createWriteStream(this.path());
	    wstream.write(buf);
	    wstream.end();
	},
	isBinary: function () {
	    return binMap[this.ext()];
	},
	dataHeader: function () {
        // data:image/png;base64,AAAAA
        // "data:"+ctype+";base64,"
	    var ctype=this.isBinary();
	    return "data:"+ctype+";base64,";
	},
	obj:function () {
		if (arguments.length==0) {
			return json.parse(this.text());
		} else {
			this.text(json.stringify(arguments[0]));
		}
	},
	isReadOnly: function () {
	    return false; // TODO
	},
    rm: function () {
        if (this.isDir()) {
            return fs.rmdirSync(this.path());
        } else {
            return fs.unlinkSync(this.path());
        }
    },
	path: function () { return this._path; },
    pathTS: function () { return truncSep(this.path()); },
	name: function () {
		var p=this.pathTS();
		var t="";
		if (endsWith(this.path(),SEP)) {
			t=SEP;
		}
		return p.split(SEP).pop()+t;
	},
	ext: function () {
	    var n=this.name();
	    var r=(/\.[a-zA-Z0-9]+$/).exec(n);
	    if (r) return r[0];
	    return null;
	},
	truncExt: function (ext) {
        var name=this.name();
        return name.substring(0,name.length-ext.length);
	},
	endsWith: function (postfix) {
	    return endsWith(this.name(), postfix);
	},
    exists: function () {
        return fs.existsSync(this.path());
    },
	each:function (it, options) {
	    if (!options) options={};
		if (!this.isDir()) throw new Error(this+" cannot each. not a dir.");
		if (!this.exists()) return;
		var ts=this.pathTS();
		var r=fs.readdirSync(this.path());
		var t=this;
		r.forEach(function (e) {
		    if (e==".dirinfo" && !options.includeDirInfo) return;
		    var s=fs.statSync(ts+SEP+e);
		    var ss=s.isDirectory()?SEP:"";
			var f=t.rel(e+ss);
			it(f);
		});
	},
	ls: function () {
	    var res=[];
	    this.each(function (f) {
            res.push(f.name());
        });
        return res;
	},
	parent: function () {
		return this.up();
	},
	recursive:function (fun) {
        this.each(function (f) {
            if (f.isDir()) f.recursive(fun);
            else fun(f);
        });
    },
	toString: function () {
		return this.path();
	},
	rel: function (n) {
		//if (!this.isDir()) throw new Error(this+" cannot rel. not a dir.");
		return new SFile(this.pathTS()+SEP+n);
	},
	mkdir: function () {
		if (this.exists()){
			if (this.isDir()) {
				return;
			} else {
				throw new Error(this+" is a file. not a dir.");
			}
		}
		var p=this.up();
		if (p) p.mkdir();
		fs.mkdirSync(this.path());
	},
	relPath: function (base) {
	    var bp=(base.path ? base.path() : base);
        if (bp.substring(bp.length-1)!=SEP) {
            throw  new Error(bp+" is not a directory.");
        }
        if (this.path().substring(0,bp.length)!=bp) {
            return "../"+this.relPath(base.up());
            //throw path+" is not in "+bp;
        }
        return this.path().substring(bp.length);

	    /*if (!origin) origin=this;
		//console.log("relpath "+this+" - "+base);
		if ( this.equals(base)) {
			return ".";
		}
		if (this.parent() == null)
			throw new Error(origin + " is not in " + base);
		var pp=this.parent().relPath(base, origin);
		if (pp==".") return this.name();
		return pp + SEP + this.name();*/
	},
	equals: function (f) {
		return (f instanceof SFile) && f.path()==this.path();
	},
	lastModified: function () {
		return this.stat().mtime.getTime();
	},
	lastUpdate: function () {
		return this.lastModified();
	},
	up: function () {
	    var p=this.pathTS();
	    var pp=p.split(SEP);
	    pp.pop();
	    p=pp.join(SEP);
        if (p=="") return null;
		return new SFile(p+SEP);
	},
	copyFrom: function (src,options) {
	    if (this.isDir()) {

	    } else {
	        this.text(src.text());
	        if (options.a) file.metaInfo(src.metaInfo());
	    }
	},
	isDir: function () {
		if (!this.exists()) return endsWith(this.path(),SEP);
		return this.stat().isDirectory();
	},
	stat: function () {
		return 	fs.statSync(this.path());
	},
	metaInfo: function () {
	    if (this.isDir()) {
	        var res={};
	        this.each(function (f) {
	            res[f.name()]=f.metaInfo();
	        });
	        return res;
	    } else {
            return {lastUpdate:this.lastUpdate()};
	    }
	}
});
exports.get=function (path) {
    if (path==null) throw new Error("FS.get: null path");
	if (path instanceof SFile) return path;
    return new SFile(path);
};
var DONOTEXPORT="DONOTEXPORT";
exports.exportDir=function (dir,options) {
    if (!options) options={};
    if (typeof dir=="string") dir=exports.get(dir);
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
//-------end of SFile.js
return exports;
});
requireSimulator.setName('extend');
define([],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
   };
});

requireSimulator.setName('DataURL');
define(["extend","assert"],function (extend,assert) {
    var A=(typeof Buffer!="undefined") ? Buffer :ArrayBuffer;
    function isBuffer(data) {
        return data instanceof ArrayBuffer ||
        (typeof Buffer!="undefined" && data instanceof Buffer);
    }
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
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
      } else assert.fail("Invalid args: ",arguments);
   };
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
	      var reg=/data:([^;]+);base64,(.*)$/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Base64_To_ArrayBuffer(r[2]);
          return assert.is(this.buffer , A);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

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
	    var ary_u8 = (typeof Buffer!="undefined" ? ary_buffer : new Uint8Array( ary_buffer ));
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
        //console.log("WOW!", ary_buffer[0],ary_u8[0]);
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
    return DataURL;
});
requireSimulator.setName('Contents');
define(["DataURL"],function (DataURL){
   var Contents={
      convert: function (src, destType, options) {
         // options:{encoding: , contentType: }
         // src: String|DataURL|ArrayBuffer|OutputStream|Writer
         // destType: String|DataURL|ArrayBuffer|InputStream|Reader
         var srcType;
         if (typeof src=="string") srcType=String;
         if (src instanceof DataURL) srcType=DataURL;
         if (src instanceof ArrayBuffer) srcType=ArrayBuffer;
         if (srcType==destType) return src;
         throw new Error("Cannot convert from "+srcType+" to "+destType);
      }
   };
   return Contents;
});
requireSimulator.setName('SFile');
define(["Contents","extend","assert","PathUtil"],
function (C,extend,A,P) {

var SFile=function (fs, path) {
    A.is(path, P.Absolute);
    A(fs && fs.getReturnTypes);
    this._path=path;
    this.fs=fs;
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
    _clone: function (){
        return this.fs.getRootFS().get(this.path());
    },
    _resolve: function (path) {
        var res;
        if (SFile.is(path)) {
            res=path;
        } else {
            A.is(path,P.Absolute);
            res=this.fs.getRootFS().get(path);
        }
        if (this.wrapper) {
            return this.wrapper.wrap(res);
        } else {
            return res;
        }
    },
    contains: function (file) {
        A(SFile.is(file),file+" shoud be a SFile object.");
        if (!this.isDir()) return false;
        return P.startsWith( file.path(), this.path());
    },
    // Path from Root
    path: function () {
        return this._path;//this.fs.getPathFromRootFS(this.pathT);
    },
    // Path from This fs
    /*pathInThisFS: function () {
        return this.pathT;
    },*/
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
        this.fs.touch(this.path());
    },
    isReadOnly: function () {
        this.fs.isReadOnly(this.path());
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
        return this.fs.getMetaInfo(this.path(),options);
    },
    setMetaInfo: function (info, options) {
        return this.fs.setMetaInfo(this.path(),info, options);
    },
    lastUpdate:function () {
        A(this.exists());
        return this.metaInfo().lastUpdate;
    },
    /*rootFS: function () {
        return this.fs.getRootFS();
    },*/
    exists: function (options) {
        options=options||{};
        var p=this.fs.exists(this.path(),options);
        if (p || options.noFollowLink) {
            return p;
        } else {
            return this.resolveLink().exists({noFollowLink:true});
        }
    },
    /*copyTo: function (dst, options) {
        this.fs.cp(this.path(),getPath(dst),options);
    },*/
    rm: function (options) {
        options=options||{};
        if (!this.exists({noFollowLink:true})) {
            var l=this.resolveLink();
            if (!this.equals(l)) return l.rm(options);
        }
        if (this.isDir() && (options.recursive||options.r)) {
            this.each(function (f) {
                f.rm(options);
            });
        }
        var pathT=this.path();
        this.fs.rm(pathT, options);
    },
    removeWithoutTrash: function (options) {
        options=options||{};
        options.noTrash=true;
        this.rm(options);
    },
    isDir: function () {
        return this.fs.isDir(this.path());
    },
    // File
    text:function () {
        var l=this.resolveLink();
        if (!this.equals(l)) return l.text.apply(l,arguments);
        if (arguments.length>0) {
            this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        this.fs.setContent(this.path(), t);
    },
    getText:function (t) {
        return this.fs.getContent(this.path(), {type:String});
    },
    lines:function () {
        return this.text().split("\n");
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
        var dst=this;
        var options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            assert(!dst.isDir(), dst+" exists as an directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir to file");
        } else if (!srcIsDir && !dstIsDir) {
            //this.fs.cp(A.is(src.path(), P.Absolute), this.path(),options);
            var srcc=src.getText(); // TODO
            var res=dst.setText(srcc);
            if (options.a) {
                dst.setMetaInfo(src.getMetaInfo());
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir);
            var t=this;
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
        return res;//this.fs.mv(getPath(src),this.path(),options);
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
        var l=this.resolveLink();
        if (!this.equals(l)) return l.listFiles.apply(l,arguments);
        var path=this.path();
        var ord;
        if (typeof options=="function") ord=options;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        var di=this.fs.opendir(path, options);
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
        to=this._resolve(A(to));
        this.fs.link(this.path(),to.path(),options);
    },
    resolveLink: function () {
        var l=this.fs.resolveLink(this.path());
        A.is(l,P.Absolute);
        return this._resolve(l);
    },
    isLink: function () {
        return this.fs.isLink(this.path());
    }
};
return SFile;
});

requireSimulator.setName('FS');
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



return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    Base64_To_ArrayBuffer:Base64_To_ArrayBuffer,
    Base64_From_ArrayBuffer:Base64_From_ArrayBuffer
};
})();

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

requireSimulator.setName('Log');
define(["FS","WebSite","Shell"], function (FS,WebSite,sh) {
    var Log={};
    var logHome=WebSite.logdir ? FS.resolve("${logdir}") : null;
    var doLog=logHome && logHome.exists();
    Log.todayDir=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return logHome.rel(y+"/").rel(m+"/").rel(da+"/");
    };
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return Log.todayDir().rel(y+"-"+m+"-"+da+".log");
    };
    Log.curProject=function () {
        var d=new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        var s=d.getSeconds();
        return Log.todayDir().rel("Project/").rel(digit(h,2)+"_"+digit(m,2)+"_"+digit(s,2)+"/");
    };
    function digit(n,zs) {
        n="00000000000000"+n;
        return n.substring(n.length-zs);
    }
    Log.dumpProject=function (dir) {
        if (!doLog) return;
        var out=Log.curProject();
        sh.cp(dir, out);
        Log.append("Dumped project to "+out.path());
    };
    if (!WebSite.logging && !WebSite.isNW) {
        var varlog=FS.get("/var/log/");
        if (varlog.exists()) varlog.removeWithoutTrash();
    }
    Log.append=function (line) {
        if (!doLog) return;
        //if (WebSite.isNW) return;
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

requireSimulator.setName('Wiki');
define(["HttpHelper", "Arrow", "Util","WebSite","Log","UI","FS"],
function (HttpHelper, Arrow, Util, WebSite,Log,UI,FS) {
return Wiki=function (placeHolder, home, options, plugins) {
    var W={};
    var refers={figures:"図", plists: "リスト"};
    var SEQ="__seq__";
    var LINEMARK="line_marker_";//+Math.floor(Math.random()*100000);
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
                    		        var ahref=f.relPath(file.up()).replace(/\.txt$/,".html");
                                    ahref=encodeURI(ahref).replace(/%/g,"_");
                                    a=$("<a>").attr({href:ahref}).text(caption);
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
        	res.d=UI("div",{title:(options.ren?"プロジェクト名の変更":"新規プロジェクト")},
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
    		}
    		model.dstDir=model.parentDir.rel(model.name+"/");
            if (model.dstDir.exists()) {
                this.addError("name","このフォルダはすでに存在します");
                return;
            }
    		this.allOK();
    		d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=function () {
    	    if (d.$edits.validator.isValid()) {
                onOK(model.dstDir);
                if (d.dialog) d.dialog("close");// not exists when embed
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
          //TODO: urlchange!
            $.ajax({type:"post",url:WebSite.serverTop+"/sendFragment",data:addRedir({
                id:id, seq:i, len:len, content:frag
            }),success: function (res) {
                console.log("sendFrag",res,i);//,frag);
                sent++;
                if (sent>=len) setTimeout(runFrag,waitTime);
            }, error: options.error
            });
        });
        function runFrag() {
          //TODO: urlchange!
            $.ajax({type:"post",url:WebSite.serverTop+"/runFragments",data:addRedir({id:id}),
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
          //TODO: urlchange!
            $.ajax({
                type:"get",
                url:WebSite.serverTop+"/getDirInfo",
                data:req,
                success:n1,
                error:onError
            });
        }
        function n1(info) {
            //info=JSON.parse(info);
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
          //TODO: urlchange!
            $.ajax({
                type:"post",
                url:WebSite.serverTop+"/File2LSSync",
                data:req,
                success:n2,
                error:onError
            });
        }
        function n2(dlData) {
            sh.echo("dlData=",dlData);
            //dlData=JSON.parse(dlData);
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
            req.pathInfo="/LS2FileSync";//TODO: urlchange!
            status("LS2FileSync", req);
          //TODO: urlchange!
            rf.ajax({
                type:"post",
                url:WebSite.serverTop+"/LS2FileSync",
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
      //TODO: urlchange!
        $.ajax({
            url:WebSite.serverTop+"/rsh",
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
requireSimulator.setName('zip');
define(["FS","Shell","Util"],function (FS,sh,Util) {
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
    // same as SFileNW.js
    var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
            ".mp3":"audio/mp3", ".ogg":"audio/ogg"};
    zip.unzip=function (arrayBuf,destDir) {
        var zip=new JSZip(arrayBuf);
        for (var i in zip.files) {
            var zipEntry=zip.files[i];
            var dest=destDir.rel(zipEntry.name);
            for (var ext in binMap) {
                var text;
                if (dest.endsWith(ext)) {
                    var ct=binMap[ext];
                    text="data:"+ct+";base64,"+Util.Base64_From_ArrayBuffer(zipEntry.asArrayBuffer());
                } else {
                    text=zipEntry.asText();
                }
                dest.text(text);
            }
            console.log(zipEntry.name);
        }
    };
    return zip;
});
requireSimulator.setName('ide/selProject');
requirejs(["FS","Wiki","Shell","Shell2",
           /*"copySample",*/"NewProjectDialog","UI","Sync","Auth","zip","requestFragment","WebSite"],
  function (FS, Wiki,   sh,sh2,
            /*copySample,  */NPD,           UI, Sync, Auth,zip,requestFragment,WebSite) {
$(function () {

    //copySample();
    var home=FS.get(WebSite.tonyuHome);
    var projects=home.rel("Projects/");
    if (!projects.exists()) projects.mkdir();
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
    /*var w=Wiki($("#wikiViewArea"), home.rel("doc/"));
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
    if (!syncDoc) w.show("index");*/
    var help=$("<iframe>").attr("src",WebSite.top+"/doc/index.html");
    help.height($(window).height()-$("#navBar").height());
    $("#wikiViewArea").append(help);



    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    ls();
    SplashScreen.hide();
    $("body").on("keydown",function (e) {
        if (e.keyCode==77 && WebSite.devMode) {
            WebSite.mobile=!WebSite.mobile;
            console.log("Mobile mode", WebSite.mobile);
            if (WebSite.mobile) {
                home.rel("mobile.txt").text("true");
            } else {
                home.rel("mobile.txt").rm();
            }
            /*$("a").each(function () {
                var t=$(this);
                var hr=t.attr("href");
                if (hr) t.attr("href", hr.replace("project.html","m.html"));
            });*/

        }
    });
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
});
});

requireSimulator.setName();
