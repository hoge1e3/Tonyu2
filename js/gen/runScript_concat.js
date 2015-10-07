// Created at Wed Oct 07 2015 10:52:51 GMT+0900 (東京 (標準時))
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
    if (window.WebSite.isNW) {
        if (process.env.TONYU_HOME) {
            window.WebSite.tonyuHome=process.env.TONYU_HOME.replace(/\\/g,"/");
        } else {
            window.WebSite.tonyuHome=process.cwd().replace(/\\/g,"/").replace(/\/$/,"")+"/fs/Tonyu/";
        }
        window.WebSite.logdir="/var/log/Tonyu/";
    }
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

requireSimulator.setName('fs/ROMk');
(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{".desktop":{"lastUpdate":1424849946377},"Actor.tonyu":{"lastUpdate":1434071249242},"BaseActor.tonyu":{"lastUpdate":1438472078845},"Boot.tonyu":{"lastUpdate":1433999039438},"event/":{"CrashToHandler.tonyu":{"lastUpdate":1434522849000},"EventHandler.tonyu":{"lastUpdate":1435635604374},"EventHandlerCaller.tonyu":{"lastUpdate":1437027652881},"EventMod.tonyu":{"lastUpdate":1433997727418},"ScreenOutHandler.tonyu":{"lastUpdate":1433996873036},"WithinHandler.tonyu":{"lastUpdate":1434522887000}},"graphics/":{"GameScreen.tonyu":{"lastUpdate":1430361716021},"Map.tonyu":{"lastUpdate":1421122943495},"OneframeSpriteMod.tonyu":{"lastUpdate":1430110560296},"Panel.tonyu":{"lastUpdate":1433924256000},"ScaledCanvas.tonyu":{"lastUpdate":1438753481229},"Sprites.tonyu":{"lastUpdate":1429581265216},"TextRectMod.tonyu":{"lastUpdate":1427702468448}},"js/":{"concat.js":{"lastUpdate":1443680343807},"index.html":{"lastUpdate":1430107873565}},"MathMod.tonyu":{"lastUpdate":1424849946395},"NoviceActor.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1428228309742},"physics/":{"BodyActor.tonyu":{"lastUpdate":1437628346060},"T2Body.tonyu":{"lastUpdate":1425264703379},"T2Mod.tonyu":{"lastUpdate":1431610155789},"T2World.tonyu":{"lastUpdate":1431611371521}},"sound/":{"MediaPlayer.tonyu":{"lastUpdate":1421384204625},"MML.tonyu":{"lastUpdate":1424849946399},"PlayMod.tonyu":{"lastUpdate":1425018365373},"T2MediaPlayer.tonyu":{"lastUpdate":1432611755126},"WaveTable.tonyu":{"lastUpdate":1412697666000}},"t1/":{"DxChar.tonyu":{"lastUpdate":1421384204610},"PlainChar.tonyu":{"lastUpdate":1429593897129},"SecretChar.tonyu":{"lastUpdate":1421384204695},"SpriteChar.tonyu":{"lastUpdate":1421384204710},"T1Line.tonyu":{"lastUpdate":1427965036844},"T1Map.tonyu":{"lastUpdate":1421384204728},"T1Page.tonyu":{"lastUpdate":1421384204737},"T1Text.tonyu":{"lastUpdate":1427965019581},"TextChar.tonyu":{"lastUpdate":1429503038967}},"thread/":{"ParallelMod.tonyu":{"lastUpdate":1435654079714},"Scheduler.tonyu":{"lastUpdate":1434441149517},"ThreadGroupMod.tonyu":{"lastUpdate":1430106770277}},"TObject.tonyu":{"lastUpdate":1433999102451},"TQuery.tonyu":{"lastUpdate":1438409693675},"ui/":{"GameConsole.tonyu":{"lastUpdate":1430361767671},"InputDevice.tonyu":{"lastUpdate":1437999921036},"Keys.tonyu":{"lastUpdate":1412697666000},"MapEditor.tonyu":{"lastUpdate":1437453536000},"MapEditorOLD.tonyu":{"lastUpdate":1421122943503},"Pad.tonyu":{"lastUpdate":1421122943510}}}',
      '.desktop': '{"runMenuOrd":["Main0121","Main1023","TouchedTestMain","Main2","MapLoad","Main","AcTestM","NObjTest","NObjTest2","AcTest","AltBoot","Ball","Bar","Bounce","MapTest","MapTest2nd","SetBGCTest","Label","PanelTest","BaseActor","Panel","MathMod"]}',
      'Actor.tonyu': 'extends BaseActor;\nincludes PlayMod, ParallelMod;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    /*if (Tonyu.runMode)*/ initSprite();\n}\n\\initSprite() {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    onAppear();\n}\n\\onAppear() {\n}\n',
      'BaseActor.tonyu': 'extends null;\nincludes MathMod,EventMod,TextRectMod,OneframeSpriteMod,\nThreadGroupMod,EventHandlerCaller;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\nnative FS;\nnative Array;\n\n\\new(x,y,p) {\n    //if (Tonyu.runMode) {\n        _th=$Boot.schedule(this,"main",[]);\n        registerEventHandler("screenOut",new ScreenOutHandler);\n        registerEventHandler("crashTo",new CrashToHandler);\n        registerEventHandler("within",new WithinHandler);\n    //}\n    if (typeof x=="object") Tonyu.extend(this,x);\n    else if (typeof x=="number") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n    if (scaleX==null) scaleX=1;\n    if (rotation==null) rotation=0;\n    if (rotate==null) rotate=0;\n    if (alpha==null) alpha=255;\n    if (zOrder==null) zOrder=0;\n    if (age==null) age=0;\n    if (anim!=null && typeof anim=="object"){\n        animMode=true;\n        animFrame=0;\n    }else{\n        animMode=false;\n    }\n    if (animFps==null) animFps=1;\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}\n\nnowait \\print(pt) {\n    console.log.apply(console,arguments);\n    var mergedArg="";\n    if($consolePanel){\n        for(var argCount=0;argCount<arguments.length;argCount++){\n            mergedArg=mergedArg+arguments[argCount]+" ";\n        }\n        splits=mergedArg.split("\\n");\n        for(var printCount=0;printCount<splits.length;printCount++){\n            $consolePanel.scroll(0,20);\n            $consolePanel.setFillStyle("white");\n            $consolePanel.fillText(splits[printCount],0,$consolePrintY,20,"left");\n        }\n    }\n}\n\nnowait \\setAnimFps(f){\n    this.animFps=f;\n    this.animFrame=0;\n    this.animMode=true;\n}\nnowait \\startAnim(){\n    this.animMode=true;\n}\nnowait \\stopAnim(){\n    this.animMode=false;\n}\n\\update() {\n    onUpdate();\n    if(_thread) {\n        _thread.suspend();\n        if ($Scheduler) $Scheduler.addToNext(_thread);\n    }\n}\nnowait \\onUpdate() {\n\n}\n\\updateEx(updateT){\n    for(var updateCount=0;updateCount<updateT;updateCount++){\n        update();\n    }\n}\nnowait \\getkey(k) {\n    return $Keys.getkey(k);\n}\nnowait \\hitTo(t) {\n    return crashTo(t);\n}\nnowait \\all(c) {\n    var res=new TQuery;\n    if (arguments.length>0 && typeof c!="function") {\n        return res;\n    }\n    $Sprites.sprites.forEach \\(s) {\n        if (s===this) return;\n        if (!c || s instanceof c) {\n            res.push(s);\n        }\n    };\n    return res;// new TQuery{objects:res};\n}\nnowait \\allCrash(t) {\n    var res=new TQuery;\n    var sp=this; //_sprite || this;\n    var t1=getCrashRect();\n    if (!t1) return res;\n    $Sprites.sprites.forEach(\\(s) {\n        var t2;\n        if (s!==this &&\n        !s.excludeFromAll &&\n        s instanceof t &&\n        (t2=s.getCrashRect()) &&\n        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n            res.push(s);\n        }\n    });\n    return res;\n}\nnowait \\crashTo(t) {\n    if (!t) return false;\n    if (typeof t=="function") {\n        return allCrash(t)[0];\n    }\n    return crashTo1(t);\n}\nnowait \\crashTo1(t) {\n    if (!t || t._isDead) return false;\n    /*if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n    }*/\n    var t1=getCrashRect();\n    var t2=t.getCrashRect();\n    return\n    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\n    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\n    t1 && t2 &&\n    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n}\n\\crashToChecker(d,f){\n    while(true){\n        if(typeof d=="function"){\n            for(obj in allCrash(d)){\n                callEventHandler(f,[obj]);\n            }\n        }else if(crashTo(d)){\n            callEventHandler(f,[d]);\n        }\n        update();\n    }\n}\nnowait \\getCrashRect() {\n    var actWidth=width*scaleX, actHeight;\n    if(typeof scaleY==="undefined"){\n        actHeight=height*scaleX;\n    }else{\n        actHeight=height*scaleY;\n    }\n    return typeof x=="number" &&\n    typeof y=="number" &&\n    typeof width=="number" &&\n    typeof height=="number" &&\n    {x,y,width:Math.abs(actWidth),height:Math.abs(actHeight)};\n}\nnowait \\allWithin(t,distance) {\n    var res=new TQuery;\n    var sp=this; //_sprite || this;\n    var t1=getCrashRect();\n    if (!t1) return res;\n    $Sprites.sprites.forEach(\\(s) {\n        var t2;\n        if (s!==this && \n        !s.excludeFromAll &&\n        s instanceof t && \n        Math.sqrt(Math.abs(x-s.x)*Math.abs(x-s.x)+ Math.abs(y-s.y)*Math.abs(y-s.y))<distance) {\n            res.push(s);    \n        }\n    });\n    return res;\n}\nnowait \\within(t,distance){\n    if(!t) return false;\n    if(typeof t=="function"){\n        return allWithin(t,distance)[0];\n    }\n    return within1(t,distance);\n}\nnowait \\within1(t,distance){\n    if(!t || t._isDead) return false;\n    if(Math.sqrt(Math.abs(x-t.x)*Math.abs(x-t.x)+ Math.abs(y-t.y)*Math.abs(y-t.y))<distance){\n        return true;\n    }\n    return false;\n}\n\\withinChecker(d,r,f){\n    while(true){\n        if(typeof d=="function"){\n            for(obj in allWithin(d,r)){\n                print(r);\n                f(obj);\n            }\n        }else if(within(d,r)){\n            f(d);\n        }\n        update();\n    }\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {//@deprecated\n    return $Scheduler; //$currentThreadGroup;\n}\nnowait \\die() {\n    killThreadGroup();\n    /*if (_th) {\n        _th.kill();\n    }*/\n    hide();\n    fireEvent("die");\n    _isDead=true;\n}\nnowait \\hide() {\n    /*if (_sprite) {\n        $Sprites.remove(_sprite);\n        _sprite=null;\n    } else {*/\n        //$Sprites.remove(this);\n    //}\n    if(layer && typeof layer.remove=="function"){\n        layer.remove(this);\n    }else{\n        $Sprites.remove(this);\n    }\n}\nnowait \\show(x,y,p) {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    if (x!=null) this.x=x;\n    if (y!=null) this.y=y;\n    if (p!=null) this.p=p;\n}\n\nnowait \\detectShape() {\n    if (typeof p!="number") {\n        if (text!=null) return;\n        p=0;\n    }\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    width=pImg.width;\n    height=pImg.height;\n}\n\\waitFor(f) {\n    if (_thread) {\n        _thread.waitFor(f);\n    }\n    //update();\n}\nnowait \\isDead() {\n    return _isDead;\n}\n\nnowait \\animation(){\n    age++;\n    if(animMode && age%animFps==0){\n        p=anim[animFrame%anim.length];\n        animFrame++;\n    }\n}\nnowait \\draw(ctx) {\n    if (x==null || y==null || _isInvisible) return;\n    detectShape();\n    if (pImg) {\n        ctx.save();\n        ctx.translate(x,y);\n        //if (typeof rotate=="number" ) rotation=rotate;// 削除予定\n        //ctx.rotate(this.rotation/180*Math.PI);\n        animation();\n        if(this.rotation!=0){\n            ctx.rotate(this.rotation/180*Math.PI);\n        }else{\n            ctx.rotate(this.rotate/180*Math.PI);\n        }\n        if(typeof this.scaleY==="undefined") {\n            ctx.scale(this.scaleX,this.scaleX);\n        }else{\n            ctx.scale(this.scaleX,this.scaleY);\n        }\n        ctx.globalAlpha=this.alpha/255;\n        ctx.drawImage(\n        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n        -width/2, -height/2, width, height);\n        ctx.restore();\n    } else if (text!==null && text!==undefined) {\n        var splitsText=(text+"").split("\\n");\n        drawY=y;\n        if (!size) size=15;\n        if (!align) align="center";\n        if (!fillStyle) fillStyle="white";\n        ctx.fillStyle=fillStyle;\n        ctx.globalAlpha=this.alpha/255;\n        height=0;width=0;\n        for(var textCount=0;textCount<splitsText.length;textCount++){\n            var rect=drawTextRect(ctx, splitsText[textCount], x, drawY, size, align , "fill");\n            if(width<rect.w) width=rect.w;\n            height+=rect.h;\n            drawY+=size;\n        }\n    }\n    if (_fukidashi) {\n        if (_fukidashi.c>0) {\n            _fukidashi.c--;\n            ctx.fillStyle="white";\n            ctx.strokeStyle="black";\n            fukidashi ( ctx , _fukidashi.text,\n            x, y-height/2-10, _fukidashi.size);\n        }\n    }\n}\nnowait \\asyncResult() {//@deperecated\n    return Tonyu.asyncResult();\n}\n\n\\runAsync(f) {\n    if (!_thread) throw new Error("runAsync should run in wait mode");\n    _thread.runAsync(f);\n}\n\n\n\\screenOut(a) {\n    //オブジェクトが画面外に出たかどうかを判定します。\n    if (!a) a=0;\n    var r=0;\n    var viewX=$Sprites.sx,viewY=$Sprites.sy;\n    if (x<viewX+a)               r+=viewX+a-x;\n    if (y<viewY+a)               r+=viewY+a-y;\n    if (x>$screenWidth +viewX-a) r+=x-($screenWidth +viewX-a);\n    if (y>$screenHeight+viewY-a) r+=y-($screenHeight+viewY-a);\n    return r;\n}\n\\screenOutChecker(d,f){\n    //print("yobareta!", getClassInfo().fullName);\n    while(true){\n        while(true){\n            if(screenOut()>d){\n                f();\n                break;\n            }\n            update();\n        }\n        while(true){\n            if(screenOut()<=d){\n                break;\n            }\n            update();\n        }\n        update();\n    }\n}\n\\file(path) {\n    var d=Tonyu.currentProject.getDir();\n    var files=d.rel("files/");\n    return FS.get(files.rel(path)) {topDir:d};\n}\n\\waitInputDevice(fl) {\n    if (fl!==false) {\n        if (!origTG) {\n            ifwait {\n                origTG=_thread.group;\n                _thread.setGroup(null);\n            }\n        }\n        a=asyncResult();\n        $InputDevice.addOnetimeListener(a.receiver);\n        waitFor(a);\n    } else {\n        if (origTG) {\n            ifwait {\n                _thread.setGroup(origTG);\n                origTG=null;\n            }\n        }\n    }\n}\n\\redrawScreen() {\n    $Sprites.draw($Screen.buf[0]);\n    $Screen.draw();\n}\n\n// from PlainChar\n\\color(r,g,b) {\n    return "rgb("+[r,g,b].join(",")+")";\n}\n/*\n\\drawText(x,y,text,col,size) {\n    if ($debug) return;\n    if (!size) size=15;\n    if (!col) col="cyan";\n    var tp=all(T1Text).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n    }else {\n        new T1Text{x,y,text,fillStyle:col, size};\n    }\n}\n\\drawLine(x,y,tx,ty,col) {\n    if (!col) col="white";\n    var tp=all(T1Line).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,tx,ty,col, hidden:false};\n    }else {\n        new T1Line{x,y,tx,ty,col};\n    }\n}\n*/\n\\loadPage(page,arg){\n    all().die();\n    new page(arg);\n    die();\n}\n\n\\setVisible(v) {\n    _isInvisible=!v;\n}\n\\appear(o) {\n    return o;\n}\n',
      'Boot.tonyu': 'extends Actor;\nincludes T2MediaPlayer;\n\nnative $;\nnative TError;\nnative $LASTPOS;\nnative Key;\nnative Date;\nnative ImageList;\nnative Tonyu;\nnative SplashScreen;\nnative Math;\n\n\\new(param) {\n    extend(param);\n}\n\\update() {\n    waitFor(Tonyu.timeout(50)); // waitFor calls update...\n}\n\\initSprites() {\n    $Sprites=new Sprites();\n    $FrontSprites=new Sprites();\n    print ("Loading plugins..");\n    var a=asyncResult();\n    $currentProject.loadPlugins(a.receiver);\n    waitFor(a);\n    print ("Loading pats..");\n    var rs=$currentProject.getResource();\n    a=asyncResult();\n    ImageList.load( rs.images, a.receiver)\n    {baseDir:$currentProject.getDir()};\n    waitFor(a);\n    var r=a[0];\n    $Sprites.setImageList(r);\n    for (var name,val in r.names) {\n        Tonyu.setGlobal(name, val);\n    }\n    print ("Loading pats done.");\n    cvj=$("canvas");\n    if (Tonyu.noviceMode) {\n        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\n    } else {\n        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\n    }\n}\n\\initSounds() {\n    print ("Loading sounds...");\n    initT2MediaPlayer();\n    loadFromProject($currentProject);\n    print ("Loading sounds done.");\n    on("stop")\\{\n        clearSEData();\n    };\n    $sound=this;\n}\n\\hide() {\n}\n\n\\initThread() {\n    //$mainThreadGroup=thg=Tonyu.threadGroup();\n    var o=Tonyu.currentProject.getOptions();\n    var mainClassName=o.run.mainClass;\n    print("MainClass= "+mainClassName);\n    mainClass=Tonyu.getClass(mainClassName);\n    if (!mainClass) {\n        TError( mainClassName+" というクラスはありません",\n        "不明" ,0).raise();\n    }\n    //Tonyu.runMode=true;\n    //$currentThreadGroup=thg;\n    scheduler=$Scheduler=new Scheduler;\n    new mainClass();\n}\n\\stop() {\n    fireEvent("stop");\n    die();\n}\n\\schedule(obj,method,args) {\n    method=method||"main";\n    args=args||[];\n    var th=scheduler.newThread(obj, method, args);\n    addThreadGroup(obj);\n    obj.addThread(th);\n    return th;\n}\n$Boot=this;\ninitSounds();\ninitSprites();\n$InputDevice=new InputDevice;\n$InputDevice.initCanvasEvents(cvj);\ninitThread();\n\n$pat_fruits=30;\n$Keys=new Keys;\n$Math=Math;\n$consolePanel=new Panel{align:"center",x:465/2,y:465/2,width:465,height:465,zOrder:-10,layer:$FrontSprites};\n$consolePrintY=465-15;\n$panel=new Panel{align:"center",x:$screenWidth/2,y:$screenHeight/2,width:$screenWidth,height:$screenHeight,zOrder:-1,layer:$FrontSprites};\nif (typeof SplashScreen!="undefined") SplashScreen.hide();\ninitFPSParams();\n\n$mouseX=$mouseX||0;\n$mouseY=$mouseY||0;\nwhile (true) {\n    //thg.steps();\n    scheduler.stepsAll();\n    $Keys.update();\n    $InputDevice.update();\n    $screenWidth=$Screen.width;\n    $screenHeight=$Screen.height;\n    doDraw=now()<deadLine;\n    if (!doDraw && frameSkipped>=maxFrameSkip) {\n        doDraw=true;\n        resetDeadLine();\n    }\n    if (doDraw) { // フレームスキップの時は描画しない\n        $Screen.fillCanvas($Screen.buf[0]);\n        $Sprites.draw($Screen.buf[0]);\n        $FrontSprites.draw($Screen.buf[0]);\n        $Screen.draw();\n        fps_fpsCnt ++;\n        frameSkipped=0;\n    } else {\n        frameSkipped++;\n    }\n    $Sprites.checkHit();\n    $Sprites.removeOneframes();\n    fps_rpsCnt ++;\n    measureFps();\n    waitFrame(); // FPS制御\n    while(paused) {\n        waitFor(Tonyu.timeout(1));\n        if (!paused) resetDeadLine();\n    }\n}\n\nnowait \\initFPSParams() {\n    // フレームレートの設定\n    _fps = 30;\n    maxframeSkip = 5;\n    // フレームレート制御でつかう変数 //\n    frameCnt = 0;\n    resetDeadLine();\n    lastMeasured=now();\n    fps_fps=fps_rps=fps_fpsCnt=fps_rpsCnt=0;\n}\nnowait \\now() {\n    return new Date().getTime();\n}\nnowait \\resetDeadLine() {\n    deadLine=now()+1000/_fps;\n    frameSkipped = 0;\n}\n\n\\waitFrame() {\n    var wt=deadLine-now();\n    if (wt<1) {\n        if (wt<-1000) resetDeadLine();\n        wt=1;\n    }\n    wt=floor(wt);\n    waitFor(Tonyu.timeout(wt));\n    deadLine+=1000/_fps;\n}\n\nnowait \\getFrameRate() {\n    return _fps;\n}\n\n// Tonyu1の$System.setFrameRate() //\nnowait \\setFrameRate(fps, maxFrameSkip) {\n    _fps = fps;\n    if (typeof maxFrameSkip!="number") maxFrameSkip=5;\n    this.maxFrameSkip = maxFrameSkip;\n    resetDeadLine();\n}\n\n// FPS（計測したフレームレート）を返す //\nnowait \\getMeasuredFps() {\n    return fps_fps;\n}\n\n// RPS（計測した実行レート）を返す //\nnowait \\getMeasuredRps() {\n    return fps_rps;\n}\n\nnowait \\measureFps() {\n    if (now()>lastMeasured+1000) {\n        fps_fps=fps_fpsCnt;\n        fps_rps=fps_rpsCnt;\n        fps_fpsCnt=0;\n        fps_rpsCnt=0;\n        lastMeasured=now();\n    }\n}\n\n',
      'MathMod.tonyu': 'extends null;\nnative Math;\n\nnowait \\sin(d) {\n    return Math.sin(rad(d));\n}\nnowait \\cos(d) {\n    return Math.cos(rad(d));\n}\nnowait \\rad(d) {\n    return d/180*Math.PI;\n}\nnowait \\deg(d) {\n    return d/Math.PI*180;\n}\n\nnowait \\abs(v) {\n    return Math.abs(v);\n}\nnowait \\atan2(x,y) {\n    return deg(Math.atan2(x,y));\n}\nnowait \\floor(x) {\n    return Math.floor(x);\n}\nnowait \\angleDiff(a,b) {\n    var c;\n    a=floor(a);\n    b=floor(b);\n    if (a>=b) {\n        c=(a-b) % 360;\n        if (c>=180) c-=360;\n    } else {\n        c=-((b-a) % 360);\n        if (c<-180) c+=360;\n    }\n    return c;\n}\nnowait \\sqrt(t) {\n    return Math.sqrt(t);\n}\nnowait \\dist(dx,dy) {\n    if (typeof dx=="object") {\n        var t=dx;\n        dx=t.x-x;dy=t.y-y;\n    }\n    return sqrt(dx*dx+dy*dy);\n}\nnowait \\trunc(f) {\n    if(f>=0) return Math.floor(f);\n    else return Math.ceil(f);\n}\nnowait \\ceil(f){\n    return Math.ceil(f);\n}\n\nnowait \\rnd(r) {\n    if (typeof r=="number") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}',
      'NoviceActor.tonyu': 'extends BaseActor;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n        $Sprites.add(this);\n    }\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite._fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\nnowait \\draw(ctx) {\n    _sprite.draw(ctx);\n}\n\\getCrashRect() {\n    return _sprite.getCrashRect();\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}',
      'TObject.tonyu': 'extends null;\nnative Tonyu;\n\\new (options) {\n    if (typeof options=="object") extend(options);\n    if (Tonyu.runMode) this.main();\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}',
      'TQuery.tonyu': 'extends TObject;\nincludes MathMod;\n\\new () {\n    length=0;\n}\n\\tonyuIterator(arity) {\n    var res={};\n    res.i=0;\n    if (arity==1) {\n        res.next=function () {\n            if (res.i>=this.length) return false;\n            res[0]=this[res.i];\n            res.i++;\n            return true;\n        };\n    } else {\n        res.next=function () {\n            if (res.i>=this.length) return false;\n            res[0]=res.i;\n            res[1]=this[res.i];\n            res.i++;\n            return true;\n        };\n    }\n    return res;\n}\n\\attr() {\n    var values;\n    if (length==0) return;\n    if (arguments.length==1 && typeof arguments[0]=="string") {\n        return this[0][arguments[0]];\n    }\n    if (arguments.length>=2) {\n        values={};\n        for (var i=0 ; i<arguments.length-1 ;i+=2) {\n            values[arguments[i]]=arguments[i+1];\n        }\n    } else {\n        values=arguments[0];\n    }\n    if (values) {\n        for (var e in this) {\n            e.extend( values);\n        }\n    }\n}\n\\genKeyfunc(key) {\n    if (typeof key!="function") {\n        return \\(o) {return o[key];};\n    } else {\n        return key;\n    }\n}\n\\maxs(key) {\n    var f=genKeyfunc(key);\n    var res,reso=new TQuery;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v>=res) {\n            if (v>res) reso=new TQuery;\n            reso.push(o);\n            res=v;\n        }\n    }\n    return reso;\n}\n\\mins(key) {\n    var f=genKeyfunc(key);\n    var res,reso=new TQuery;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v<=res) {\n            if (v<res) reso=new TQuery;\n            reso.push(o);\n            res=v;\n        }\n    }\n    return reso;\n}\n\\minObj(key) {\n    return mins(key)[0];\n}\n\\maxObj(key) {\n    return maxs(key)[0];\n}\n\\nearests(x,y) {\n    if (typeof x=="object") {y=x.y;x=x.x;}\n    return mins \\(o) {\n        return dist(o.x-x,o.y-y);\n    };\n}\n\\nearest(x,y) {\n    return nearests(x,y)[0];\n}\n\\withins(xo,yd,d) {\n    var x,y;\n    if (typeof xo=="object") {\n        x=xo.x;y=xo.y;d=yd;\n    } else {\n        x=xo;y=yd;\n    }\n    return find \\(o) {\n        return dist(o.x-x,o.y-y)<=d;\n    };\n}\n\\within(xo,yd,d) {\n    return withins(xo,yd,d).nearest();\n}\n\n\\max(key) {\n    var f=genKeyfunc(key);\n    var res;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v>res) res=v;\n    }\n    return res;\n}\n\\min(key) {\n    var f=genKeyfunc(key);\n    var res;\n    for (var o in this) {\n        var v=f(o);\n        if (res==null || v<res) res=v;\n    }\n    return res;\n}\n\\push(e) {\n    this[length]=e;\n    length++;\n}\n\\size() {return length;}\n\\find(f) {\n    var no=new TQuery;\n    for (var o in this) {\n        if (f(o)) no.push(o);\n    }\n    return no;\n}\n\\find1(f) {\n    return find(f)[0];\n} \n\\apply(name, args) {\n    var res;\n    if (!args) args=[];\n    for (var o in this) {\n        var f=o[name];\n        if (typeof f=="function") {\n            res=f.apply(o, args);\n        }\n    }\n    return res;\n}\n// \\alive => find \\(o) => !o.isDead()  //  (in future)\n\\alive() {\n    return find \\(o) {\n        return !o.isDead();\n    };\n}\n\\die() {\n    var a=alive();\n    if (a.length==0) return false;\n    a.apply("die");\n    return true;\n}\n\n\\klass(k) {\n    return find \\(o) { return o instanceof k; };\n}',
      'event/': '{"CrashToHandler.tonyu":{"lastUpdate":1434522849000},"EventHandler.tonyu":{"lastUpdate":1435635604374},"EventHandlerCaller.tonyu":{"lastUpdate":1437027652881},"EventMod.tonyu":{"lastUpdate":1433997727418},"ScreenOutHandler.tonyu":{"lastUpdate":1433996873036},"WithinHandler.tonyu":{"lastUpdate":1434522887000}}',
      'event/CrashToHandler.tonyu': 'extends EventHandler;\n\\addListener(d, f) {\n    var retThread=target.parallel("crashToChecker",d,f);\n    return {\n        remove: \\{\n            retThread.kill();\n        }\n    };\n}\n\\new(param) {\n    super(param);\n    id=($idseq=($idseq||0)+1);\n}\n',
      'event/EventHandler.tonyu': 'extends TObject;\nincludes EventHandlerCaller;\nnative Tonyu;\n\n\nif (Tonyu.runMode) listeners=[];\n\n\\addListener(f) {\n    if (target && (typeof f)=="string") {\n        f=target[f];\n    }\n    if (typeof f!="function") throw new Error("Not a event listener: "+target+" / "+f);\n    listeners.push(f);\n    return {\n        remove: \\{\n           removeListener(f);\n        }\n    };\n}\n\\removeListener(f) {\n    var i=listeners.indexOf(f);\n    listeners.splice(i,1);\n}\n\\fire(args) {\n    if (released) return;\n    var t;\n    for (var h in listeners) {\n        /*if (h["fiber"]) {\n            t=Tonyu.thread();\n            h["fiber"].apply(target, [t].concat(args) );\n            t.steps();\n        } else {\n            h.apply(target,args);\n        }*/\n        callEventHandler(h, args);\n    }\n}\n\\release() {\n    released=true;\n}\n',
      'event/EventHandlerCaller.tonyu': 'extends null;\nnative Tonyu;\n\\callEventHandler(h, args) {\n    var t;\n    if (h["fiber"]) {\n        t=Tonyu.thread();\n        h["fiber"].apply(target, [t].concat(args) );\n        t.steps();\n    } else {\n        h.apply(target,args);\n    }\n}\n',
      'event/EventMod.tonyu': 'extends null;\nnative console;\n\nnowait \\initEventMod() {\n   if (_eventHandlers) return;\n   //console.log("initEventMod" , getClassInfo().fullName);\n   _eventHandlers={};\n   on ("die",releaseEventMod);\n}\nnowait \\releaseEventMod() {\n   for (var k,v in _eventHandlers) {\n       v.release();\n   }\n}\nnowait \\parseArgs(a) {\n   var res={type:a[0], args:[]};\n   for (var i=1 ; i<a.length ; i++) {\n       res.args.push(a[i]);\n   }\n   return res;\n}\n\nnowait \\registerEventHandler(type, obj) {\n   // obj:{ attach, fire }\n   initEventMod();\n   if (typeof type=="function") {\n       obj=obj||new type{target:this};\n       type=obj.getClassInfo().fullName;\n   }  else {\n       obj=obj || new EventHandler{target:this};\n       obj.target=this;\n       //print("regEvt", type, getClassInfo().fullName, obj.id);\n   }\n   return _eventHandlers[type]=obj;\n}\n\nnowait \\getEventHandler(type) {\n   initEventMod();\n   if (typeof type=="function") {\n       type=type.meta.fullName;\n   }\n   var res=_eventHandlers[type];\n   return res;\n}\nnowait \\getOrRegisterEventHandler(type) {\n   var res=getEventHandler(type) || registerEventHandler(type);\n   return res;\n}\n\nnowait \\on() {\n    var a=parseArgs(arguments);\n    var h=getOrRegisterEventHandler(a.type);\n    //print("on", a.type, getClassInfo().fullName, h.id);\n    return h.addListener.apply(h,a.args);\n}\n\nnowait \\fireEvent(type, arg) {\n    var h=getEventHandler(type);\n    if (h) h.fire([arg]);\n}\nnowait \\sendEvent(type, arg) {\n    fireEvent(type,arg);\n}\n\n\\waitEvent() {\n    if (_thread) {\n        var args=[];\n        for (var i=0;i<arguments.length;i++) {\n            if (arguments[i]===undefined) break;\n            args.push(arguments[i]);\n        }\n        _thread.waitEvent(this, args);\n    }\n}\n/*\n\\waitEvent(type, a1,a2,a3,a4,a5) {\n    if (_thread) {\n        waitEventRaw(type,a1,a2,a3,a4,a5); // TODO: cannot apply with thread.enter\n        return _thread.lastEvent[0];\n    }\n}*/\n/*\n\\waitEvent2() {\n    if (_thread) {\n        t=obj.pararell.apply(obj, ["waitEventRaw"].concat(arguments) );\n        t.on("terminate") \\{ _thread.steps(); }\n\n    }\n}\n*/',
      'event/ScreenOutHandler.tonyu': 'extends EventHandler;\n\\addListener(d, f) {\n    var retThread=target.parallel("screenOutChecker",d,f);\n    return {\n        remove: \\{\n            retThread.kill();\n        }\n    };\n}\n\\new(param) {\n   super(param);\n   id=($idseq=($idseq||0)+1);\n}\n',
      'event/WithinHandler.tonyu': 'extends EventHandler;\n\\addListener(d, r, f) {\n    var retThread=target.parallel("withinChecker",d,r,f);\n    return {\n        remove: \\{\n            retThread.kill();\n        }\n    };\n}\n\\new(param) {\n    super(param);\n    id=($idseq=($idseq||0)+1);\n}\n',
      'graphics/': '{"GameScreen.tonyu":{"lastUpdate":1430361716021},"Map.tonyu":{"lastUpdate":1421122943495},"OneframeSpriteMod.tonyu":{"lastUpdate":1430110560296},"Panel.tonyu":{"lastUpdate":1433924256000},"ScaledCanvas.tonyu":{"lastUpdate":1438753481229},"Sprites.tonyu":{"lastUpdate":1429581265216},"TextRectMod.tonyu":{"lastUpdate":1427702468448}}',
      'graphics/GameScreen.tonyu': 'extends Actor;\nnative $;\nnative Math;\n\n// buf: logical\n\\new (opt) {\n    // opt:{width,height,sprites}\n    extend(opt);\n    resize(width, height);\n    this.bgColor="rgb(20,80,180)";\n    isDrawGrid=$Sprites.isDrawGrid;\n}\n\\resize(width,height) {\n    this.width=width;\n    this.height=height;\n    buf=$("<canvas>").attr{width,height};\n    ctx=buf[0].getContext("2d");  \n    fireEvent("resize", width, height);\n    /*$screenWidth=width;\n    $screenHeight=height;\n    if($panel){\n        $panel.setPanel($screenWidth,$screenHeight);\n    }*/\n}\n\\setBounds(b) { //left,top,width,height in game console\n    bounds=b;\n}\n\\draw(cctx) {\n    var b=bounds;\n    fillCanvas();\n    sprites.draw(buf[0]);\n    cctx.drawImage(buf[0],\n    0,0,width, height, \n    b.left, b.top, b.width, b.height);\n}\n\\canvas2buf(point) {// canvas=gameConsole\n    var b=bounds;\n    if (!b) return point;\n    return {x: (point.x-b.left)/b.width*width, \n    y: (point.y-b.top)/b.height*height};\n}\n\\setBGColor(c){\n    this.bgColor=c;\n}\n\\fillCanvas(){\n    var ctx=buf[0].getContext("2d");\n    ctx.save();\n    ctx.fillStyle=bgColor;\n    ctx.fillRect(0,0,width,height);\n    //if (isDrawGrid) drawGrid(cv);\n    ctx.restore();\n}\n\\scrollTo(scrollX,scrollY){\n    sprites.scrollTo(scrollX,scrollY);\n}\n\n',
      'graphics/Map.tonyu': 'extends Actor;\nnative Math;\nnative $;\n\\new (param){\n    sx=0;\n    sy=0;\n    super(param);\n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    mapObj=true;\n    mapTable = [];\n    mapOnTable = [];\n    for(var j=0;j<row;j++){\n        rows = [];\n        for(var i=0;i<col;i++){\n            rows.push(-1);\n        }\n        mapTable.push(rows);\n    }\n    for(var j=0;j<row;j++){\n        rows = [];\n        for(var i=0;i<col;i++){\n            rows.push(-1);\n        }\n        mapOnTable.push(rows);\n    }\n    /*for(var i=0;i<col;i++){\n        mapTable[i]=[];\n    }*/\n    initMap();\n}\n\\initMap(){\n    if(!mapData) return;\n    for(var i=0;i<row;i++){\n        for(var j=0;j<col;j++){\n            set(j,i,mapData[i][j]);\n        }\n    }\n    if(!mapOnData) return;\n    for(var i=0;i<row;i++){\n        for(var j=0;j<col;j++){\n            setOn(j,i,mapOnData[i][j]);\n        }\n    }\n}\n\\load(dataFile){\n    baseData=file("../maps/").rel(dataFile).obj();\n    if(!baseData) baseData=file(dataFile).obj();\n    mapTable=baseData[0];\n    mapData=mapTable;\n    row=mapTable.length;\n    col=mapTable[0].length;\n    mapOnTable=baseData[1];\n    mapOnData=mapOnTable;\n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    initMap();\n}\n\\set(setCol,setRow,p){\n    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n    mapTable[setRow][setCol]=p;\n    //mapOnTable[setRow][setCol]=-1;\n    ctx=buf[0].getContext("2d");\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) {\n        ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n        return;\n    }\n    ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\n    ctx.save();\n    ctx.drawImage(\n    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n    ctx.restore();\n}\n\\setOn(setCol,setRow,p){\n    if(setCol>=col || setRow>=row || setCol<0 || setRow<0) return;\n    set(setCol,setRow,mapTable[setRow][setCol]);\n    mapOnTable[setRow][setCol]=p;\n    ctx=buf[0].getContext("2d");\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    ctx.save();\n    ctx.drawImage(\n    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\n    ctx.restore();\n}\n\\setOnAt(setX,setY,p){\n    setOn(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n}\n\\setAt(setX,setY,p){\n    set(Math.floor(setX/chipWidth),Math.floor(setY/chipHeight),p);\n}\n\\get(getCol,getRow){\n    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapTable[getRow][getCol];\n    return -1;\n}\n\\getAt(getX,getY){\n    return get(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n}\n\\getOn(getCol,getRow){\n    if(getCol<col && getRow<row && getCol>=0 && getRow>=0) return mapOnTable[getRow][getCol];\n    return -1;\n}\n\\getOnAt(getX,getY){\n    return getOn(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\n}\n\\scrollTo(scrollX,scrollY){\n    sx=-scrollX;\n    sy=-scrollY;\n}\n\\draw(ctx) {\n    pImg=buf[0];\n    ctx.save();\n    ctx.drawImage(\n    pImg, 0, 0,col*chipWidth, row*chipHeight,\n    sx, sy, col*chipWidth, row*chipHeight);\n    ctx.restore();\n}\n',
      'graphics/OneframeSpriteMod.tonyu': 'extends null;\n\nnowait \\drawText(x,y,text,col,size) {\n    if (!size) size=15;\n    if (!col) col="cyan";\n    new T1Text{x,y,text,fillStyle:col, size,oneframeSprite:true};\n}\nnowait \\drawLine(x,y,tx,ty,col) {\n    if (!col) col="white";\n    new T1Line{x,y,tx,ty,col,oneframeSprite:true};\n}\n\n',
      'graphics/Panel.tonyu': 'extends Actor;\nnative $;\nnative Math;\nnative isNaN;\n\\new(opt){\n    super(opt);\n    this.width=width;\n    this.height=height;\n    if(align==null) align="center";\n    if(alpha==null) alpha=255;\n    if(_drawn==null) _drawn=false;\n    buf=$("<canvas>").attr{width,height};\n}\n\\setPanel(width,height){\n    this.width=width;\n    this.height=height;\n    buf=$("<canvas>").attr{width,height};\n}\n\\resize(width,height){\n    setPanel(width,height);\n}\n\\getContext(){\n    _drawn=true;\n    return buf[0].getContext("2d");\n}\n\\setFillStyle(color){\n    this.fillStyle=color;\n}\n\\fillRect(x,y,rectWidth,rectHeight){\n    ctx=getContext();\n    ctx.save();\n    //ctx.clearRect(0,0,this.width,this.height);\n    ctx.fillStyle=fillStyle;\n    ctx.fillRect(x,y,rectWidth,rectHeight);\n    ctx.restore();\n}\n\\fillText(text,x,y,size,align){\n    ctx=getContext();\n    ctx.save();\n    text=text+"";\n    var splits = text.split("\\n");\n    //ctx.clearRect(0,0,this.width,this.height);\n    ctx.textAlign = align;\n    ctx.fillStyle=fillStyle;\n    ctx.font=size+"px \'Courier New\'";\n    for(var colCount=0;colCount<splits.length;colCount++){\n        ctx.fillText(splits[colCount],x,y);\n        y+=size;\n    }\n    ctx.restore();\n}\n\\clearRect(clearX,clearY,clearW,clearH){\n    ctx=getContext();\n    ctx.save();\n    ctx.clearRect(clearX,clearY,clearW,clearH);\n    ctx.restore();\n}\n\\getPixel(getX,getY){\n    if(typeof getX=="number" && !isNaN(getX) && \n    typeof getY=="number" && !isNaN(getY)){\n        ctx=getContext();\n        imagedata=ctx.getImageData(getX,getY,1,1);\n        colordata=[imagedata.data[0],imagedata.data[1],imagedata.data[2],imagedata.data[3]];\n        //print(imagedata.data);\n    }else{\n        colordata=[0,0,0,0];\n    }\n    return(colordata);\n}\n\\scroll(scrollX,scrollY){\n    ctx=getContext();\n    ctx.save();\n    imagedata=ctx.getImageData(0,0,this.width,this.height);\n    clearRect(0,0,width,height);\n    ctx.putImageData(imagedata,-scrollX,-scrollY);\n    ctx.restore();\n}\n\\draw(ctx){\n    if(_drawn){\n        pImg=buf[0];\n        ctx.save();\n        if(align=="left"){\n            ctx.translate(x+width/2,y+height/2);\n        }else if(align=="center"){\n            ctx.translate(x,y);\n        }else if(align=="right"){\n            ctx.translate(x-width/2,y-height/2);\n        }\n        if(this.rotation!=0){\n            ctx.rotate(this.rotation/180*Math.PI);\n        }else{\n            ctx.rotate(this.rotate/180*Math.PI);\n        }\n        ctx.globalAlpha=this.alpha/255;\n        ctx.drawImage(\n        pImg, 0, 0,width,height,\n        -width/2, -height/2, width ,height);\n        ctx.restore();\n    }\n}',
      'graphics/ScaledCanvas.tonyu': 'extends Actor;\nnative $;\nnative Math;\n\n// canvas:phisical  buf: logical\n\\new (opt) {\n    extend(opt);\n    // canvas/ width,height\n    resize(width, height);\n    cw=canvas.width();\n    ch=canvas.height();\n    cctx=canvas[0].getContext("2d");\n    this.color="rgb(20,80,180)";\n    sx=0;\n    sy=0;\n    isDrawGrid=$Sprites.isDrawGrid;\n}\n\\resize(width,height) {\n    this.width=width;\n    this.height=height;\n    buf=$("<canvas>").attr{width,height};\n    ctx=buf[0].getContext("2d");  \n    $screenWidth=width;\n    $screenHeight=height;\n    if($panel){\n        $panel.setPanel($screenWidth,$screenHeight);\n        $panel.x=$screenWidth/2;\n        $panel.y=$screenHeight/2;\n    }\n    if($consolePanel){\n        $consolePanel.setPanel($screenWidth,$screenHeight);\n        $consolePanel.x=$screenWidth/2;\n        $consolePanel.y=$screenHeight/2;\n        $consolePrintY=$screenHeight-15;\n    }\n}\n\\shouldDraw1x1(srcw,srch,dstw,dsth) {\n    // srcw=465 -> dstw=460...665\n    var larger=200;\n    var smaller=5;\n    return srcw-smaller<=dstw && dstw<=srcw+larger &&\n    srch-smaller<=dsth && dsth<=srch+larger;\n}\n\\draw() {\n    cw=canvas.width();\n    ch=canvas.height();\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    cctx.clearRect(0,0,cw,ch);\n    if (shouldDraw1x1(width,height,calcw,calch)) {\n        calcw=width;calch=height;\n    }\n    var marginw=Math.floor((cw-calcw)/2);\n    var marginh=Math.floor((ch-calch)/2);\n    cctx.drawImage(buf[0],\n    0,0,width, height, \n    marginw,marginh,calcw, calch );\n}\n\\canvas2buf(point) {\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    if (shouldDraw1x1(width,height,calcw,calch)) {\n        calcw=width;calch=height;\n    }\n    var marginw=Math.floor((cw-calcw)/2);\n    var marginh=Math.floor((ch-calch)/2);\n    //For mysterious bug of Chrome on Android 5....\n    _ret="("+point.x+"-"+marginw+")/"+calcw+"*"+width+",";\n    return {x: (point.x-marginw)/calcw*width, \n    y: (point.y-marginh)/calch*height};\n}\n\\setBGColor(color){\n    this.color=color;\n}\n\\fillCanvas(cv){\n    var ctx=cv.getContext("2d");\n    ctx.save();\n    ctx.fillStyle=$Screen.color;\n    ctx.fillStyle=color;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    ctx.restore();\n}\n\\scrollTo(scrollX,scrollY){\n    /*for(o in all()){\n        //print(o.mapObj);\n        if(o.mapObj){\n            o.scrollTo(o.sx+scrollX,o.sy+scrollY);\n        }else if(o.x!=undefined && o.y!=undefined){\n            o.x+=scrollX;\n            o.y+=scrollY;\n        }\n    }*/\n    //sx=scrollX;\n    //sy=scrollY;\n    $Sprites.scrollTo(scrollX,scrollY);\n}',
      'graphics/Sprites.tonyu': 'extends Actor;\nnative Tonyu;\n\\new() {\n    sprites=[];\n    imageList=[];\n    hitWatchers=[];\n    isDrawGrid=Tonyu.noviceMode;\n    sx=0;\n    sy=0;\n    objId=0;\n}\nfunction add(s) {\n    if (s.__addedToSprites) return;\n    sprites.push(s);\n    if(s.__genId==null){\n        s.__genId=objId;\n        objId++;\n    }\n    s.__addedToSprites=this;\n    return s;\n}\nfunction remove(s) {\n    var idx=sprites.indexOf(s);\n    if (idx<0) return;\n    sprites.splice(idx,1);\n    delete s.__addedToSprites;\n}\n\\removeOneframes() {\n    for (var i=sprites.length-1 ; i>=0 ; i--) {\n        if (sprites[i].oneframeSprite) {\n            sprites.splice(i,1);\n        }\n    }\n}\nfunction clear() {sprites.splice(0,sprites.length);}\nfunction compOrder(obj1, obj2){\n    var val1=obj1.zOrder;\n    var val2=obj2.zOrder;\n    if(val1>val2){\n        return -1;\n    }else if(val1<val2){\n        return 1;\n    }else if(val1==val2){\n        if(obj1.__genId>obj2.__genId){\n            return 1;\n        }else{\n            return -1;\n        }\n        return 0;\n    }\n}\nfunction draw(cv) {\n    var ctx=cv.getContext("2d");\n    ctx.save();\n    /*\n    ctx.fillStyle=$Screen.color;\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    */\n    var orderArray=[];\n    orderArray=orderArray.concat(sprites);\n    orderArray.sort(compOrder);\n    ctx.translate(-sx,-sy);\n    orderArray.forEach(\\(s){\n        s.draw(ctx);\n    });\n    ctx.restore();\n}\nfunction checkHit() {\n    hitWatchers.forEach(function (w) {\n        sprites.forEach(function (a) {\n            //console.log("a:",  a.owner);\n            var a_owner=a;//a.owner|| a;\n            if (! (a_owner instanceof w.A)) return;\n            sprites.forEach(function (b) {\n                var b_owner=b;//b.owner|| b;\n                if (a===b) return;\n                if (! (b_owner instanceof w.B)) return;\n                //console.log("b:",  b.owner);\n                if (a.crashTo1(b)) {\n                    //console.log("hit", a.owner, b.owner);\n                    w.h(a_owner,b_owner);\n                }\n            });\n        });\n    });\n}\nfunction watchHit(typeA, typeB, onHit) {\n    var p={A: typeA, B:typeB, h:onHit};\n    //console.log(p);\n    hitWatchers.push(p);\n}\nfunction drawGrid(c) {\n    var ctx=c.getContext("2d");\n    ctx.textBaseline="top";\n    ctx.save();\n    ctx.strokeStyle="rgb(40,100,200)";\n    for (var i=0 ; i<c.width ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(i,0);\n        ctx.lineTo(i,c.height);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    \n    for (var i=0 ; i<c.height ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(0,i);\n        ctx.lineTo(c.width,i);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    ctx.fillStyle="white";\n    ctx.font="15px monospaced";\n    for (var i=100 ; i<c.width ; i+=100) {\n        ctx.fillText(i, i,0);\n    }\n    for (var i=100 ; i<c.height ; i+=100) {\n        ctx.fillText(i, 0,i);\n    }\n    ctx.restore();\n}\nfunction setImageList(il) {\n    imageList=il;\n}\nfunction getImageList() {\n    return imageList;\n}\nfunction scrollTo(scrollX,scrollY){\n    sx=scrollX;\n    sy=scrollY;\n}',
      'graphics/TextRectMod.tonyu': 'extends null;\n\nnowait function drawTextRect(ctx, text, x, topY, h, align , type) {\n    if (!align) align="center";\n    ctx.textBaseline="top";\n    setFontSize(ctx, h);\n    var met=ctx.measureText(text);\n    var res={y:topY, w: met.width, h:h};\n    var t=align.substring(0,1).toLowerCase();\n    if (t=="l") res.x=x;\n    else if (t=="r") res.x=x-met.width;\n    else if (t=="c") res.x=x-met.width/2;\n    if (type=="fill") ctx.fillText(text, res.x,topY);\n    if (type=="stroke") ctx.strokeText(text, res.x,topY);\n    return res;\n}\nnowait function setFontSize(ctx,sz) {\n    var post=ctx.font.replace(/^[0-9\\.]+/,"");\n    ctx.font=sz+post;\n}\n\nnowait function fukidashi(ctx, text, x, y, sz) {\n    var align="c";\n    var theight=20;\n    var margin=5;\n    var r=drawTextRect(ctx, text, x,y-theight-margin-sz, sz, align);\n    ctx.beginPath();\n    ctx.moveTo(x , y);\n    ctx.lineTo(x+margin , y-theight);\n    ctx.lineTo(x+r.w/2+margin , y-theight);\n    ctx.lineTo(x+r.w/2+margin , y-theight-r.h-margin*2);\n    ctx.lineTo(x-r.w/2-margin , y-theight-r.h-margin*2);\n    ctx.lineTo(x-r.w/2-margin , y-theight);\n    ctx.lineTo(x-margin , y-theight);\n    ctx.closePath();\n    ctx.fill();\n    ctx.stroke();\n    \n    var fs=ctx.fillStyle;\n    ctx.fillStyle=ctx.strokeStyle;\n    drawTextRect(ctx, text, x, y-theight-margin-sz, sz, align, "fill");\n    ctx.fillStyle=fs;\n}\n\n',
      'js/': '{"concat.js":{"lastUpdate":1443680343807},"index.html":{"lastUpdate":1430107873565}}',
      'js/concat.js': 'Tonyu.klass.define({\n  fullName: \'kernel.EventHandlerCaller\',\n  shortName: \'EventHandlerCaller\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_EventHandlerCaller_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_EventHandlerCaller_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    callEventHandler :function _trc_EventHandlerCaller_callEventHandler(h,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var t;\n      \n      //$LASTPOS=1000064;//kernel.EventHandlerCaller:64\n      t;\n      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76\n      if (h["fiber"]) {\n        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103\n        t=Tonyu.thread();\n        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130\n        h["fiber"].apply(_this.target,[t].concat(args));\n        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184\n        t.steps();\n        \n      } else {\n        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218\n        h.apply(_this.target,args);\n        \n      }\n    },\n    fiber$callEventHandler :function _trc_EventHandlerCaller_f_callEventHandler(_thread,h,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var t;\n      \n      //$LASTPOS=1000064;//kernel.EventHandlerCaller:64\n      t;\n      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76\n      if (h["fiber"]) {\n        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103\n        t=Tonyu.thread();\n        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130\n        h["fiber"].apply(_this.target,[t].concat(args));\n        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184\n        t.steps();\n        \n      } else {\n        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218\n        h.apply(_this.target,args);\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"callEventHandler":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.EventMod\',\n  shortName: \'EventMod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_EventMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_EventMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initEventMod :function _trc_EventMod_initEventMod() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=2000063;//kernel.EventMod:63\n      if (_this._eventHandlers) {\n        return _this;\n      }\n      //$LASTPOS=2000156;//kernel.EventMod:156\n      _this._eventHandlers={};\n      //$LASTPOS=2000179;//kernel.EventMod:179\n      _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));\n    },\n    releaseEventMod :function _trc_EventMod_releaseEventMod() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var k;\n      var v;\n      var _it_2;\n      \n      //$LASTPOS=2000243;//kernel.EventMod:243\n      _it_2=Tonyu.iterator(_this._eventHandlers,2);\n      while(_it_2.next()) {\n        k=_it_2[0];\n        v=_it_2[1];\n        \n        //$LASTPOS=2000285;//kernel.EventMod:285\n        v.release();\n        \n      }\n    },\n    parseArgs :function _trc_EventMod_parseArgs(a) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var i;\n      \n      //$LASTPOS=2000335;//kernel.EventMod:335\n      res = {type: a[0],args: []};\n      //$LASTPOS=2000369;//kernel.EventMod:369\n      //$LASTPOS=2000374;//kernel.EventMod:374\n      i = 1;\n      while(i<a.length) {\n        {\n          //$LASTPOS=2000412;//kernel.EventMod:412\n          res.args.push(a[i]);\n        }\n        i++;\n      }\n      return res;\n    },\n    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=2000535;//kernel.EventMod:535\n      _this.initEventMod();\n      //$LASTPOS=2000555;//kernel.EventMod:555\n      if (typeof  type=="function") {\n        //$LASTPOS=2000594;//kernel.EventMod:594\n        obj=obj||new type({target: _this});\n        //$LASTPOS=2000634;//kernel.EventMod:634\n        type=obj.getClassInfo().fullName;\n        \n      } else {\n        //$LASTPOS=2000690;//kernel.EventMod:690\n        obj=obj||new Tonyu.classes.kernel.EventHandler({target: _this});\n        //$LASTPOS=2000740;//kernel.EventMod:740\n        obj.target=_this;\n        \n      }\n      return _this._eventHandlers[type]=obj;\n    },\n    getEventHandler :function _trc_EventMod_getEventHandler(type) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      \n      //$LASTPOS=2000908;//kernel.EventMod:908\n      _this.initEventMod();\n      //$LASTPOS=2000928;//kernel.EventMod:928\n      if (typeof  type=="function") {\n        //$LASTPOS=2000967;//kernel.EventMod:967\n        type=type.meta.fullName;\n        \n      }\n      //$LASTPOS=2001002;//kernel.EventMod:1002\n      res = _this._eventHandlers[type];\n      return res;\n    },\n    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      \n      //$LASTPOS=2001098;//kernel.EventMod:1098\n      res = _this.getEventHandler(type)||_this.registerEventHandler(type);\n      return res;\n    },\n    on :function _trc_EventMod_on() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var a;\n      var h;\n      \n      //$LASTPOS=2001201;//kernel.EventMod:1201\n      a = _this.parseArgs(arguments);\n      //$LASTPOS=2001234;//kernel.EventMod:1234\n      h = _this.getOrRegisterEventHandler(a.type);\n      return h.addListener.apply(h,a.args);\n    },\n    fireEvent :function _trc_EventMod_fireEvent(type,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var h;\n      \n      //$LASTPOS=2001419;//kernel.EventMod:1419\n      h = _this.getEventHandler(type);\n      //$LASTPOS=2001453;//kernel.EventMod:1453\n      if (h) {\n        //$LASTPOS=2001460;//kernel.EventMod:1460\n        h.fire([arg]);\n      }\n    },\n    sendEvent :function _trc_EventMod_sendEvent(type,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=2001515;//kernel.EventMod:1515\n      _this.fireEvent(type,arg);\n    },\n    waitEvent :function _trc_EventMod_waitEvent() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var args;\n      var i;\n      \n      //$LASTPOS=2001562;//kernel.EventMod:1562\n      if (null) {\n        //$LASTPOS=2001586;//kernel.EventMod:1586\n        args = [];\n        //$LASTPOS=2001608;//kernel.EventMod:1608\n        //$LASTPOS=2001613;//kernel.EventMod:1613\n        i = 0;\n        while(i<arguments.length) {\n          {\n            //$LASTPOS=2001660;//kernel.EventMod:1660\n            if (arguments[i]===undefined) {\n              break;\n              \n            }\n            //$LASTPOS=2001710;//kernel.EventMod:1710\n            args.push(arguments[i]);\n          }\n          i++;\n        }\n        //$LASTPOS=2001755;//kernel.EventMod:1755\n        null.waitEvent(_this,args);\n        \n      }\n    },\n    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var args;\n      var i;\n      \n      //$LASTPOS=2001562;//kernel.EventMod:1562\n      if (_thread) {\n        //$LASTPOS=2001586;//kernel.EventMod:1586\n        args = [];\n        //$LASTPOS=2001608;//kernel.EventMod:1608\n        //$LASTPOS=2001613;//kernel.EventMod:1613\n        i = 0;\n        while(i<_arguments.length) {\n          {\n            //$LASTPOS=2001660;//kernel.EventMod:1660\n            if (_arguments[i]===undefined) {\n              break;\n              \n            }\n            //$LASTPOS=2001710;//kernel.EventMod:1710\n            args.push(_arguments[i]);\n          }\n          i++;\n        }\n        //$LASTPOS=2001755;//kernel.EventMod:1755\n        _thread.waitEvent(_this,args);\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.OneframeSpriteMod\',\n  shortName: \'OneframeSpriteMod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_OneframeSpriteMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_OneframeSpriteMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    drawText :function _trc_OneframeSpriteMod_drawText(x,y,text,col,size) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=3000060;//kernel.OneframeSpriteMod:60\n      if (! size) {\n        //$LASTPOS=3000071;//kernel.OneframeSpriteMod:71\n        size=15;\n      }\n      //$LASTPOS=3000085;//kernel.OneframeSpriteMod:85\n      if (! col) {\n        //$LASTPOS=3000095;//kernel.OneframeSpriteMod:95\n        col="cyan";\n      }\n      //$LASTPOS=3000112;//kernel.OneframeSpriteMod:112\n      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});\n    },\n    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=3000217;//kernel.OneframeSpriteMod:217\n      if (! col) {\n        //$LASTPOS=3000227;//kernel.OneframeSpriteMod:227\n        col="white";\n      }\n      //$LASTPOS=3000245;//kernel.OneframeSpriteMod:245\n      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col,oneframeSprite: true});\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.TextRectMod\',\n  shortName: \'TextRectMod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_TextRectMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_TextRectMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    drawTextRect :function _trc_TextRectMod_drawTextRect(ctx,text,x,topY,h,align,type) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var met;\n      var res;\n      var t;\n      \n      //$LASTPOS=4000090;//kernel.TextRectMod:90\n      if (! align) {\n        //$LASTPOS=4000102;//kernel.TextRectMod:102\n        align="center";\n      }\n      //$LASTPOS=4000123;//kernel.TextRectMod:123\n      ctx.textBaseline="top";\n      //$LASTPOS=4000152;//kernel.TextRectMod:152\n      _this.setFontSize(ctx,h);\n      //$LASTPOS=4000178;//kernel.TextRectMod:178\n      met = ctx.measureText(text);\n      //$LASTPOS=4000214;//kernel.TextRectMod:214\n      res = {y: topY,w: met.width,h: h};\n      //$LASTPOS=4000256;//kernel.TextRectMod:256\n      t = align.substring(0,1).toLowerCase();\n      //$LASTPOS=4000303;//kernel.TextRectMod:303\n      if (t=="l") {\n        //$LASTPOS=4000315;//kernel.TextRectMod:315\n        res.x=x;\n      } else {\n        //$LASTPOS=4000334;//kernel.TextRectMod:334\n        if (t=="r") {\n          //$LASTPOS=4000346;//kernel.TextRectMod:346\n          res.x=x-met.width;\n        } else {\n          //$LASTPOS=4000375;//kernel.TextRectMod:375\n          if (t=="c") {\n            //$LASTPOS=4000387;//kernel.TextRectMod:387\n            res.x=x-met.width/2;\n          }\n        }\n      }\n      //$LASTPOS=4000413;//kernel.TextRectMod:413\n      if (type=="fill") {\n        //$LASTPOS=4000431;//kernel.TextRectMod:431\n        ctx.fillText(text,res.x,topY);\n      }\n      //$LASTPOS=4000468;//kernel.TextRectMod:468\n      if (type=="stroke") {\n        //$LASTPOS=4000488;//kernel.TextRectMod:488\n        ctx.strokeText(text,res.x,topY);\n      }\n      return res;\n    },\n    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var post;\n      \n      //$LASTPOS=4000586;//kernel.TextRectMod:586\n      post = ctx.font.replace(/^[0-9\\.]+/,"");\n      //$LASTPOS=4000634;//kernel.TextRectMod:634\n      ctx.font=sz+post;\n    },\n    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var align;\n      var theight;\n      var margin;\n      var r;\n      var fs;\n      \n      //$LASTPOS=4000712;//kernel.TextRectMod:712\n      align = "c";\n      //$LASTPOS=4000732;//kernel.TextRectMod:732\n      theight = 20;\n      //$LASTPOS=4000753;//kernel.TextRectMod:753\n      margin = 5;\n      //$LASTPOS=4000772;//kernel.TextRectMod:772\n      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);\n      //$LASTPOS=4000842;//kernel.TextRectMod:842\n      ctx.beginPath();\n      //$LASTPOS=4000864;//kernel.TextRectMod:864\n      ctx.moveTo(x,y);\n      //$LASTPOS=4000888;//kernel.TextRectMod:888\n      ctx.lineTo(x+margin,y-theight);\n      //$LASTPOS=4000927;//kernel.TextRectMod:927\n      ctx.lineTo(x+r.w/2+margin,y-theight);\n      //$LASTPOS=4000972;//kernel.TextRectMod:972\n      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);\n      //$LASTPOS=4001030;//kernel.TextRectMod:1030\n      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);\n      //$LASTPOS=4001088;//kernel.TextRectMod:1088\n      ctx.lineTo(x-r.w/2-margin,y-theight);\n      //$LASTPOS=4001133;//kernel.TextRectMod:1133\n      ctx.lineTo(x-margin,y-theight);\n      //$LASTPOS=4001172;//kernel.TextRectMod:1172\n      ctx.closePath();\n      //$LASTPOS=4001194;//kernel.TextRectMod:1194\n      ctx.fill();\n      //$LASTPOS=4001211;//kernel.TextRectMod:1211\n      ctx.stroke();\n      //$LASTPOS=4001236;//kernel.TextRectMod:1236\n      fs = ctx.fillStyle;\n      //$LASTPOS=4001263;//kernel.TextRectMod:1263\n      ctx.fillStyle=ctx.strokeStyle;\n      //$LASTPOS=4001299;//kernel.TextRectMod:1299\n      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");\n      //$LASTPOS=4001372;//kernel.TextRectMod:1372\n      ctx.fillStyle=fs;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.MathMod\',\n  shortName: \'MathMod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_MathMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_MathMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    sin :function _trc_MathMod_sin(d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.sin(_this.rad(d));\n    },\n    cos :function _trc_MathMod_cos(d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.cos(_this.rad(d));\n    },\n    rad :function _trc_MathMod_rad(d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return d/180*Math.PI;\n    },\n    deg :function _trc_MathMod_deg(d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return d/Math.PI*180;\n    },\n    abs :function _trc_MathMod_abs(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.abs(v);\n    },\n    atan2 :function _trc_MathMod_atan2(x,y) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.deg(Math.atan2(x,y));\n    },\n    floor :function _trc_MathMod_floor(x) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.floor(x);\n    },\n    angleDiff :function _trc_MathMod_angleDiff(a,b) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var c;\n      \n      //$LASTPOS=5000416;//kernel.MathMod:416\n      c;\n      //$LASTPOS=5000428;//kernel.MathMod:428\n      a=_this.floor(a);\n      //$LASTPOS=5000445;//kernel.MathMod:445\n      b=_this.floor(b);\n      //$LASTPOS=5000462;//kernel.MathMod:462\n      if (a>=b) {\n        //$LASTPOS=5000483;//kernel.MathMod:483\n        c=(a-b)%360;\n        //$LASTPOS=5000507;//kernel.MathMod:507\n        if (c>=180) {\n          //$LASTPOS=5000519;//kernel.MathMod:519\n          c-=360;\n        }\n        \n      } else {\n        //$LASTPOS=5000550;//kernel.MathMod:550\n        c=- ((b-a)%360);\n        //$LASTPOS=5000577;//kernel.MathMod:577\n        if (c<- 180) {\n          //$LASTPOS=5000589;//kernel.MathMod:589\n          c+=360;\n        }\n        \n      }\n      return c;\n    },\n    sqrt :function _trc_MathMod_sqrt(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.sqrt(t);\n    },\n    dist :function _trc_MathMod_dist(dx,dy) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var t;\n      \n      //$LASTPOS=5000698;//kernel.MathMod:698\n      if (typeof  dx=="object") {\n        //$LASTPOS=5000734;//kernel.MathMod:734\n        t = dx;\n        //$LASTPOS=5000753;//kernel.MathMod:753\n        dx=t.x-_this.x;\n        //$LASTPOS=5000762;//kernel.MathMod:762\n        dy=t.y-_this.y;\n        \n      }\n      return _this.sqrt(dx*dx+dy*dy);\n    },\n    trunc :function _trc_MathMod_trunc(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=5000838;//kernel.MathMod:838\n      if (f>=0) {\n        return Math.floor(f);\n      } else {\n        return Math.ceil(f);\n      }\n    },\n    ceil :function _trc_MathMod_ceil(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.ceil(f);\n    },\n    rnd :function _trc_MathMod_rnd(r) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=5000975;//kernel.MathMod:975\n      if (typeof  r=="number") {\n        return Math.floor(Math.random()*r);\n        \n      }\n      return Math.random();\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T2Mod\',\n  shortName: \'T2Mod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_T2Mod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T2Mod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    bvec :function _trc_T2Mod_bvec(tx,ty) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b2Vec2;\n      \n      //$LASTPOS=6000034;//kernel.T2Mod:34\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      return new b2Vec2(tx/_this.scale,ty/_this.scale);\n    },\n    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b2Vec2;\n      \n      //$LASTPOS=6000034;//kernel.T2Mod:34\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    defv :function _trc_T2Mod_defv(t,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return (t===t&&(typeof  t)==="number")?t:d;\n    },\n    fiber$defv :function _trc_T2Mod_f_defv(_thread,t,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=(t===t&&(typeof  t)==="number")?t:d;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"bvec":{"nowait":false},"defv":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.MediaPlayer\',\n  shortName: \'MediaPlayer\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_MediaPlayer_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_MediaPlayer_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    play :function _trc_MediaPlayer_play() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$play :function _trc_MediaPlayer_f_play(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stop :function _trc_MediaPlayer_stop() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    playSE :function _trc_MediaPlayer_playSE() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$playSE :function _trc_MediaPlayer_f_playSE(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setDelay :function _trc_MediaPlayer_setDelay() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setVolume :function _trc_MediaPlayer_setVolume() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.ThreadGroupMod\',\n  shortName: \'ThreadGroupMod\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_ThreadGroupMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_ThreadGroupMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    addThread :function _trc_ThreadGroupMod_addThread(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=7000038;//kernel.ThreadGroupMod:38\n      _this.threads=_this.threads||[];\n      //$LASTPOS=7000064;//kernel.ThreadGroupMod:64\n      _this.threads.push(t);\n    },\n    fiber$addThread :function _trc_ThreadGroupMod_f_addThread(_thread,t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=7000038;//kernel.ThreadGroupMod:38\n      _this.threads=_this.threads||[];\n      //$LASTPOS=7000064;//kernel.ThreadGroupMod:64\n      _this.threads.push(t);\n      \n      _thread.retVal=_this;return;\n    },\n    addThreadGroup :function _trc_ThreadGroupMod_addThreadGroup(tg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=7000112;//kernel.ThreadGroupMod:112\n      _this.threadGroups=_this.threadGroups||[];\n      //$LASTPOS=7000148;//kernel.ThreadGroupMod:148\n      _this.threadGroups.push(tg);\n    },\n    fiber$addThreadGroup :function _trc_ThreadGroupMod_f_addThreadGroup(_thread,tg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=7000112;//kernel.ThreadGroupMod:112\n      _this.threadGroups=_this.threadGroups||[];\n      //$LASTPOS=7000148;//kernel.ThreadGroupMod:148\n      _this.threadGroups.push(tg);\n      \n      _thread.retVal=_this;return;\n    },\n    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var thread;\n      var _it_27;\n      var threadGroup;\n      var _it_28;\n      \n      //$LASTPOS=7000201;//kernel.ThreadGroupMod:201\n      if (_this.threads) {\n        //$LASTPOS=7000225;//kernel.ThreadGroupMod:225\n        _it_27=Tonyu.iterator(_this.threads,1);\n        while(_it_27.next()) {\n          thread=_it_27[0];\n          \n          //$LASTPOS=7000268;//kernel.ThreadGroupMod:268\n          thread.kill();\n          \n        }\n        \n      }\n      //$LASTPOS=7000306;//kernel.ThreadGroupMod:306\n      if (_this.threadGroups) {\n        //$LASTPOS=7000335;//kernel.ThreadGroupMod:335\n        _it_28=Tonyu.iterator(_this.threadGroups,1);\n        while(_it_28.next()) {\n          threadGroup=_it_28[0];\n          \n          //$LASTPOS=7000388;//kernel.ThreadGroupMod:388\n          threadGroup.killThreadGroup();\n          \n        }\n        \n      }\n    },\n    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var thread;\n      var _it_27;\n      var threadGroup;\n      var _it_28;\n      \n      //$LASTPOS=7000201;//kernel.ThreadGroupMod:201\n      if (_this.threads) {\n        //$LASTPOS=7000225;//kernel.ThreadGroupMod:225\n        _it_27=Tonyu.iterator(_this.threads,1);\n        while(_it_27.next()) {\n          thread=_it_27[0];\n          \n          //$LASTPOS=7000268;//kernel.ThreadGroupMod:268\n          thread.kill();\n          \n        }\n        \n      }\n      //$LASTPOS=7000306;//kernel.ThreadGroupMod:306\n      if (_this.threadGroups) {\n        //$LASTPOS=7000335;//kernel.ThreadGroupMod:335\n        _it_28=Tonyu.iterator(_this.threadGroups,1);\n        while(_it_28.next()) {\n          threadGroup=_it_28[0];\n          \n          //$LASTPOS=7000388;//kernel.ThreadGroupMod:388\n          threadGroup.killThreadGroup();\n          \n        }\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addThread":{"nowait":false},"addThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.TObject\',\n  shortName: \'TObject\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_TObject_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_TObject_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_TObject_initialize(options) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=8000052;//kernel.TObject:52\n      if (typeof  options=="object") {\n        //$LASTPOS=8000082;//kernel.TObject:82\n        _this.extend(options);\n      }\n      //$LASTPOS=8000104;//kernel.TObject:104\n      if (Tonyu.runMode) {\n        //$LASTPOS=8000123;//kernel.TObject:123\n        _this.main();\n      }\n    },\n    extend :function _trc_TObject_extend(obj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.extend(_this,obj);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.TQuery\',\n  shortName: \'TQuery\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [Tonyu.classes.kernel.MathMod],\n  methods: {\n    main :function _trc_TQuery_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_TQuery_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_TQuery_initialize() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=9000049;//kernel.TQuery:49\n      _this.length=0;\n    },\n    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      \n      //$LASTPOS=9000089;//kernel.TQuery:89\n      res = {};\n      //$LASTPOS=9000105;//kernel.TQuery:105\n      res.i=0;\n      //$LASTPOS=9000118;//kernel.TQuery:118\n      if (arity==1) {\n        //$LASTPOS=9000142;//kernel.TQuery:142\n        res.next=(function anonymous_151() {\n          \n          //$LASTPOS=9000177;//kernel.TQuery:177\n          if (res.i>=_this.length) {\n            return false;\n          }\n          //$LASTPOS=9000227;//kernel.TQuery:227\n          res[0]=_this[res.i];\n          //$LASTPOS=9000259;//kernel.TQuery:259\n          res.i++;\n          return true;\n        });\n        \n      } else {\n        //$LASTPOS=9000325;//kernel.TQuery:325\n        res.next=(function anonymous_334() {\n          \n          //$LASTPOS=9000360;//kernel.TQuery:360\n          if (res.i>=_this.length) {\n            return false;\n          }\n          //$LASTPOS=9000410;//kernel.TQuery:410\n          res[0]=res.i;\n          //$LASTPOS=9000436;//kernel.TQuery:436\n          res[1]=_this[res.i];\n          //$LASTPOS=9000468;//kernel.TQuery:468\n          res.i++;\n          return true;\n        });\n        \n      }\n      return res;\n    },\n    fiber$tonyuIterator :function _trc_TQuery_f_tonyuIterator(_thread,arity) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var res;\n      \n      //$LASTPOS=9000089;//kernel.TQuery:89\n      res = {};\n      //$LASTPOS=9000105;//kernel.TQuery:105\n      res.i=0;\n      //$LASTPOS=9000118;//kernel.TQuery:118\n      if (arity==1) {\n        //$LASTPOS=9000142;//kernel.TQuery:142\n        res.next=(function anonymous_151() {\n          \n          //$LASTPOS=9000177;//kernel.TQuery:177\n          if (res.i>=_this.length) {\n            return false;\n          }\n          //$LASTPOS=9000227;//kernel.TQuery:227\n          res[0]=_this[res.i];\n          //$LASTPOS=9000259;//kernel.TQuery:259\n          res.i++;\n          return true;\n        });\n        \n      } else {\n        //$LASTPOS=9000325;//kernel.TQuery:325\n        res.next=(function anonymous_334() {\n          \n          //$LASTPOS=9000360;//kernel.TQuery:360\n          if (res.i>=_this.length) {\n            return false;\n          }\n          //$LASTPOS=9000410;//kernel.TQuery:410\n          res[0]=res.i;\n          //$LASTPOS=9000436;//kernel.TQuery:436\n          res[1]=_this[res.i];\n          //$LASTPOS=9000468;//kernel.TQuery:468\n          res.i++;\n          return true;\n        });\n        \n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    attr :function _trc_TQuery_attr() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var values;\n      var i;\n      var e;\n      var _it_34;\n      \n      //$LASTPOS=9000551;//kernel.TQuery:551\n      values;\n      //$LASTPOS=9000567;//kernel.TQuery:567\n      if (_this.length==0) {\n        return _this;\n      }\n      //$LASTPOS=9000594;//kernel.TQuery:594\n      if (arguments.length==1&&typeof  arguments[0]=="string") {\n        return _this[0][arguments[0]];\n        \n      }\n      //$LASTPOS=9000702;//kernel.TQuery:702\n      if (arguments.length>=2) {\n        //$LASTPOS=9000737;//kernel.TQuery:737\n        values={};\n        //$LASTPOS=9000756;//kernel.TQuery:756\n        //$LASTPOS=9000761;//kernel.TQuery:761\n        i = 0;\n        while(i<arguments.length-1) {\n          {\n            //$LASTPOS=9000813;//kernel.TQuery:813\n            values[arguments[i]]=arguments[i+1];\n          }\n          i+=2;\n        }\n        \n      } else {\n        //$LASTPOS=9000881;//kernel.TQuery:881\n        values=arguments[0];\n        \n      }\n      //$LASTPOS=9000912;//kernel.TQuery:912\n      if (values) {\n        //$LASTPOS=9000934;//kernel.TQuery:934\n        _it_34=Tonyu.iterator(_this,1);\n        while(_it_34.next()) {\n          e=_it_34[0];\n          \n          //$LASTPOS=9000968;//kernel.TQuery:968\n          e.extend(values);\n          \n        }\n        \n      }\n    },\n    fiber$attr :function _trc_TQuery_f_attr(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var values;\n      var i;\n      var e;\n      var _it_34;\n      \n      //$LASTPOS=9000551;//kernel.TQuery:551\n      values;\n      //$LASTPOS=9000567;//kernel.TQuery:567\n      if (_this.length==0) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=9000594;//kernel.TQuery:594\n      if (_arguments.length==1&&typeof  _arguments[0]=="string") {\n        _thread.retVal=_this[0][_arguments[0]];return;\n        \n        \n      }\n      //$LASTPOS=9000702;//kernel.TQuery:702\n      if (_arguments.length>=2) {\n        //$LASTPOS=9000737;//kernel.TQuery:737\n        values={};\n        //$LASTPOS=9000756;//kernel.TQuery:756\n        //$LASTPOS=9000761;//kernel.TQuery:761\n        i = 0;\n        while(i<_arguments.length-1) {\n          {\n            //$LASTPOS=9000813;//kernel.TQuery:813\n            values[_arguments[i]]=_arguments[i+1];\n          }\n          i+=2;\n        }\n        \n      } else {\n        //$LASTPOS=9000881;//kernel.TQuery:881\n        values=_arguments[0];\n        \n      }\n      //$LASTPOS=9000912;//kernel.TQuery:912\n      if (values) {\n        //$LASTPOS=9000934;//kernel.TQuery:934\n        _it_34=Tonyu.iterator(_this,1);\n        while(_it_34.next()) {\n          e=_it_34[0];\n          \n          //$LASTPOS=9000968;//kernel.TQuery:968\n          e.extend(values);\n          \n        }\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=9001028;//kernel.TQuery:1028\n      if (typeof  key!="function") {\n        return (function anonymous_1073(o) {\n          \n          return o[key];\n        });\n        \n      } else {\n        return key;\n        \n      }\n    },\n    fiber$genKeyfunc :function _trc_TQuery_f_genKeyfunc(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=9001028;//kernel.TQuery:1028\n      if (typeof  key!="function") {\n        _thread.retVal=(function anonymous_1073(o) {\n          \n          return o[key];\n        });return;\n        \n        \n      } else {\n        _thread.retVal=key;return;\n        \n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    maxs :function _trc_TQuery_maxs(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var f;\n      var res;\n      var reso;\n      var o;\n      var _it_40;\n      var v;\n      \n      //$LASTPOS=9001154;//kernel.TQuery:1154\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9001181;//kernel.TQuery:1181\n      res;reso = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9001210;//kernel.TQuery:1210\n      _it_40=Tonyu.iterator(_this,1);\n      while(_it_40.next()) {\n        o=_it_40[0];\n        \n        //$LASTPOS=9001240;//kernel.TQuery:1240\n        v = f(o);\n        //$LASTPOS=9001260;//kernel.TQuery:1260\n        if (res==null||v>=res) {\n          //$LASTPOS=9001299;//kernel.TQuery:1299\n          if (v>res) {\n            //$LASTPOS=9001310;//kernel.TQuery:1310\n            reso=new Tonyu.classes.kernel.TQuery;\n          }\n          //$LASTPOS=9001339;//kernel.TQuery:1339\n          reso.push(o);\n          //$LASTPOS=9001365;//kernel.TQuery:1365\n          res=v;\n          \n        }\n        \n      }\n      return reso;\n    },\n    fiber$maxs :function _trc_TQuery_f_maxs(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var f;\n      var res;\n      var reso;\n      var o;\n      var _it_40;\n      var v;\n      \n      //$LASTPOS=9001154;//kernel.TQuery:1154\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9001181;//kernel.TQuery:1181\n      res;reso = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9001210;//kernel.TQuery:1210\n      _it_40=Tonyu.iterator(_this,1);\n      while(_it_40.next()) {\n        o=_it_40[0];\n        \n        //$LASTPOS=9001240;//kernel.TQuery:1240\n        v = f(o);\n        //$LASTPOS=9001260;//kernel.TQuery:1260\n        if (res==null||v>=res) {\n          //$LASTPOS=9001299;//kernel.TQuery:1299\n          if (v>res) {\n            //$LASTPOS=9001310;//kernel.TQuery:1310\n            reso=new Tonyu.classes.kernel.TQuery;\n          }\n          //$LASTPOS=9001339;//kernel.TQuery:1339\n          reso.push(o);\n          //$LASTPOS=9001365;//kernel.TQuery:1365\n          res=v;\n          \n        }\n        \n      }\n      _thread.retVal=reso;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    mins :function _trc_TQuery_mins(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var f;\n      var res;\n      var reso;\n      var o;\n      var _it_47;\n      var v;\n      \n      //$LASTPOS=9001424;//kernel.TQuery:1424\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9001451;//kernel.TQuery:1451\n      res;reso = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9001480;//kernel.TQuery:1480\n      _it_47=Tonyu.iterator(_this,1);\n      while(_it_47.next()) {\n        o=_it_47[0];\n        \n        //$LASTPOS=9001510;//kernel.TQuery:1510\n        v = f(o);\n        //$LASTPOS=9001530;//kernel.TQuery:1530\n        if (res==null||v<=res) {\n          //$LASTPOS=9001569;//kernel.TQuery:1569\n          if (v<res) {\n            //$LASTPOS=9001580;//kernel.TQuery:1580\n            reso=new Tonyu.classes.kernel.TQuery;\n          }\n          //$LASTPOS=9001609;//kernel.TQuery:1609\n          reso.push(o);\n          //$LASTPOS=9001635;//kernel.TQuery:1635\n          res=v;\n          \n        }\n        \n      }\n      return reso;\n    },\n    fiber$mins :function _trc_TQuery_f_mins(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var f;\n      var res;\n      var reso;\n      var o;\n      var _it_47;\n      var v;\n      \n      //$LASTPOS=9001424;//kernel.TQuery:1424\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9001451;//kernel.TQuery:1451\n      res;reso = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9001480;//kernel.TQuery:1480\n      _it_47=Tonyu.iterator(_this,1);\n      while(_it_47.next()) {\n        o=_it_47[0];\n        \n        //$LASTPOS=9001510;//kernel.TQuery:1510\n        v = f(o);\n        //$LASTPOS=9001530;//kernel.TQuery:1530\n        if (res==null||v<=res) {\n          //$LASTPOS=9001569;//kernel.TQuery:1569\n          if (v<res) {\n            //$LASTPOS=9001580;//kernel.TQuery:1580\n            reso=new Tonyu.classes.kernel.TQuery;\n          }\n          //$LASTPOS=9001609;//kernel.TQuery:1609\n          reso.push(o);\n          //$LASTPOS=9001635;//kernel.TQuery:1635\n          res=v;\n          \n        }\n        \n      }\n      _thread.retVal=reso;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    minObj :function _trc_TQuery_minObj(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.mins(key)[0];\n    },\n    fiber$minObj :function _trc_TQuery_f_minObj(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.mins(key)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    maxObj :function _trc_TQuery_maxObj(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.maxs(key)[0];\n    },\n    fiber$maxObj :function _trc_TQuery_f_maxObj(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.maxs(key)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    nearests :function _trc_TQuery_nearests(x,y) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=9001782;//kernel.TQuery:1782\n      if (typeof  x=="object") {\n        //$LASTPOS=9001807;//kernel.TQuery:1807\n        y=x.y;\n        //$LASTPOS=9001813;//kernel.TQuery:1813\n        x=x.x;\n        \n      }\n      return _this.mins((function anonymous_1837(o) {\n        \n        return _this.dist(o.x-x,o.y-y);\n      }));\n    },\n    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=9001782;//kernel.TQuery:1782\n      if (typeof  x=="object") {\n        //$LASTPOS=9001807;//kernel.TQuery:1807\n        y=x.y;\n        //$LASTPOS=9001813;//kernel.TQuery:1813\n        x=x.x;\n        \n      }\n      _thread.retVal=_this.mins((function anonymous_1837(o) {\n        \n        return _this.dist(o.x-x,o.y-y);\n      }));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    nearest :function _trc_TQuery_nearest(x,y) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.nearests(x,y)[0];\n    },\n    fiber$nearest :function _trc_TQuery_f_nearest(_thread,x,y) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.nearests(x,y)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    withins :function _trc_TQuery_withins(xo,yd,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var x;\n      var y;\n      \n      //$LASTPOS=9001958;//kernel.TQuery:1958\n      x;y;\n      //$LASTPOS=9001971;//kernel.TQuery:1971\n      if (typeof  xo=="object") {\n        //$LASTPOS=9002006;//kernel.TQuery:2006\n        x=xo.x;\n        //$LASTPOS=9002013;//kernel.TQuery:2013\n        y=xo.y;\n        //$LASTPOS=9002020;//kernel.TQuery:2020\n        d=yd;\n        \n      } else {\n        //$LASTPOS=9002047;//kernel.TQuery:2047\n        x=xo;\n        //$LASTPOS=9002052;//kernel.TQuery:2052\n        y=yd;\n        \n      }\n      return _this.find((function anonymous_2080(o) {\n        \n        return _this.dist(o.x-x,o.y-y)<=d;\n      }));\n    },\n    fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var x;\n      var y;\n      \n      //$LASTPOS=9001958;//kernel.TQuery:1958\n      x;y;\n      //$LASTPOS=9001971;//kernel.TQuery:1971\n      if (typeof  xo=="object") {\n        //$LASTPOS=9002006;//kernel.TQuery:2006\n        x=xo.x;\n        //$LASTPOS=9002013;//kernel.TQuery:2013\n        y=xo.y;\n        //$LASTPOS=9002020;//kernel.TQuery:2020\n        d=yd;\n        \n      } else {\n        //$LASTPOS=9002047;//kernel.TQuery:2047\n        x=xo;\n        //$LASTPOS=9002052;//kernel.TQuery:2052\n        y=yd;\n        \n      }\n      _thread.retVal=_this.find((function anonymous_2080(o) {\n        \n        return _this.dist(o.x-x,o.y-y)<=d;\n      }));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    within :function _trc_TQuery_within(xo,yd,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.withins(xo,yd,d).nearest();\n    },\n    fiber$within :function _trc_TQuery_f_within(_thread,xo,yd,d) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.withins(xo,yd,d).nearest();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    max :function _trc_TQuery_max(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var f;\n      var res;\n      var o;\n      var _it_58;\n      var v;\n      \n      //$LASTPOS=9002210;//kernel.TQuery:2210\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9002237;//kernel.TQuery:2237\n      res;\n      //$LASTPOS=9002250;//kernel.TQuery:2250\n      _it_58=Tonyu.iterator(_this,1);\n      while(_it_58.next()) {\n        o=_it_58[0];\n        \n        //$LASTPOS=9002280;//kernel.TQuery:2280\n        v = f(o);\n        //$LASTPOS=9002300;//kernel.TQuery:2300\n        if (res==null||v>res) {\n          //$LASTPOS=9002324;//kernel.TQuery:2324\n          res=v;\n        }\n        \n      }\n      return res;\n    },\n    fiber$max :function _trc_TQuery_f_max(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var f;\n      var res;\n      var o;\n      var _it_58;\n      var v;\n      \n      //$LASTPOS=9002210;//kernel.TQuery:2210\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9002237;//kernel.TQuery:2237\n      res;\n      //$LASTPOS=9002250;//kernel.TQuery:2250\n      _it_58=Tonyu.iterator(_this,1);\n      while(_it_58.next()) {\n        o=_it_58[0];\n        \n        //$LASTPOS=9002280;//kernel.TQuery:2280\n        v = f(o);\n        //$LASTPOS=9002300;//kernel.TQuery:2300\n        if (res==null||v>res) {\n          //$LASTPOS=9002324;//kernel.TQuery:2324\n          res=v;\n        }\n        \n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    min :function _trc_TQuery_min(key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var f;\n      var res;\n      var o;\n      var _it_64;\n      var v;\n      \n      //$LASTPOS=9002371;//kernel.TQuery:2371\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9002398;//kernel.TQuery:2398\n      res;\n      //$LASTPOS=9002411;//kernel.TQuery:2411\n      _it_64=Tonyu.iterator(_this,1);\n      while(_it_64.next()) {\n        o=_it_64[0];\n        \n        //$LASTPOS=9002441;//kernel.TQuery:2441\n        v = f(o);\n        //$LASTPOS=9002461;//kernel.TQuery:2461\n        if (res==null||v<res) {\n          //$LASTPOS=9002485;//kernel.TQuery:2485\n          res=v;\n        }\n        \n      }\n      return res;\n    },\n    fiber$min :function _trc_TQuery_f_min(_thread,key) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var f;\n      var res;\n      var o;\n      var _it_64;\n      var v;\n      \n      //$LASTPOS=9002371;//kernel.TQuery:2371\n      f = _this.genKeyfunc(key);\n      //$LASTPOS=9002398;//kernel.TQuery:2398\n      res;\n      //$LASTPOS=9002411;//kernel.TQuery:2411\n      _it_64=Tonyu.iterator(_this,1);\n      while(_it_64.next()) {\n        o=_it_64[0];\n        \n        //$LASTPOS=9002441;//kernel.TQuery:2441\n        v = f(o);\n        //$LASTPOS=9002461;//kernel.TQuery:2461\n        if (res==null||v<res) {\n          //$LASTPOS=9002485;//kernel.TQuery:2485\n          res=v;\n        }\n        \n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    push :function _trc_TQuery_push(e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=9002531;//kernel.TQuery:2531\n      _this[_this.length]=e;\n      //$LASTPOS=9002551;//kernel.TQuery:2551\n      _this.length++;\n    },\n    fiber$push :function _trc_TQuery_f_push(_thread,e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=9002531;//kernel.TQuery:2531\n      _this[_this.length]=e;\n      //$LASTPOS=9002551;//kernel.TQuery:2551\n      _this.length++;\n      \n      _thread.retVal=_this;return;\n    },\n    size :function _trc_TQuery_size() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.length;\n    },\n    fiber$size :function _trc_TQuery_f_size(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.length;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    find :function _trc_TQuery_find(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var no;\n      var o;\n      var _it_70;\n      \n      //$LASTPOS=9002603;//kernel.TQuery:2603\n      no = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9002626;//kernel.TQuery:2626\n      _it_70=Tonyu.iterator(_this,1);\n      while(_it_70.next()) {\n        o=_it_70[0];\n        \n        //$LASTPOS=9002656;//kernel.TQuery:2656\n        if (f(o)) {\n          //$LASTPOS=9002666;//kernel.TQuery:2666\n          no.push(o);\n        }\n        \n      }\n      return no;\n    },\n    fiber$find :function _trc_TQuery_f_find(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var no;\n      var o;\n      var _it_70;\n      \n      //$LASTPOS=9002603;//kernel.TQuery:2603\n      no = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=9002626;//kernel.TQuery:2626\n      _it_70=Tonyu.iterator(_this,1);\n      while(_it_70.next()) {\n        o=_it_70[0];\n        \n        //$LASTPOS=9002656;//kernel.TQuery:2656\n        if (f(o)) {\n          //$LASTPOS=9002666;//kernel.TQuery:2666\n          no.push(o);\n        }\n        \n      }\n      _thread.retVal=no;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    find1 :function _trc_TQuery_find1(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.find(f)[0];\n    },\n    fiber$find1 :function _trc_TQuery_f_find1(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.find(f)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    apply :function _trc_TQuery_apply(name,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var o;\n      var _it_74;\n      var f;\n      \n      //$LASTPOS=9002764;//kernel.TQuery:2764\n      res;\n      //$LASTPOS=9002777;//kernel.TQuery:2777\n      if (! args) {\n        //$LASTPOS=9002788;//kernel.TQuery:2788\n        args=[];\n      }\n      //$LASTPOS=9002801;//kernel.TQuery:2801\n      _it_74=Tonyu.iterator(_this,1);\n      while(_it_74.next()) {\n        o=_it_74[0];\n        \n        //$LASTPOS=9002831;//kernel.TQuery:2831\n        f = o[name];\n        //$LASTPOS=9002854;//kernel.TQuery:2854\n        if (typeof  f=="function") {\n          //$LASTPOS=9002894;//kernel.TQuery:2894\n          res=f.apply(o,args);\n          \n        }\n        \n      }\n      return res;\n    },\n    fiber$apply :function _trc_TQuery_f_apply(_thread,name,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var res;\n      var o;\n      var _it_74;\n      var f;\n      \n      //$LASTPOS=9002764;//kernel.TQuery:2764\n      res;\n      //$LASTPOS=9002777;//kernel.TQuery:2777\n      if (! args) {\n        //$LASTPOS=9002788;//kernel.TQuery:2788\n        args=[];\n      }\n      //$LASTPOS=9002801;//kernel.TQuery:2801\n      _it_74=Tonyu.iterator(_this,1);\n      while(_it_74.next()) {\n        o=_it_74[0];\n        \n        //$LASTPOS=9002831;//kernel.TQuery:2831\n        f = o[name];\n        //$LASTPOS=9002854;//kernel.TQuery:2854\n        if (typeof  f=="function") {\n          //$LASTPOS=9002894;//kernel.TQuery:2894\n          res=f.apply(o,args);\n          \n        }\n        \n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    alive :function _trc_TQuery_alive() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.find((function anonymous_3032(o) {\n        \n        return ! o.isDead();\n      }));\n    },\n    fiber$alive :function _trc_TQuery_f_alive(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.find((function anonymous_3032(o) {\n        \n        return ! o.isDead();\n      }));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    die :function _trc_TQuery_die() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var a;\n      \n      //$LASTPOS=9003089;//kernel.TQuery:3089\n      a = _this.alive();\n      //$LASTPOS=9003108;//kernel.TQuery:3108\n      if (a.length==0) {\n        return false;\n      }\n      //$LASTPOS=9003143;//kernel.TQuery:3143\n      a.apply("die");\n      return true;\n    },\n    fiber$die :function _trc_TQuery_f_die(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var a;\n      \n      //$LASTPOS=9003089;//kernel.TQuery:3089\n      a = _this.alive();\n      //$LASTPOS=9003108;//kernel.TQuery:3108\n      if (a.length==0) {\n        _thread.retVal=false;return;\n        \n      }\n      //$LASTPOS=9003143;//kernel.TQuery:3143\n      a.apply("die");\n      _thread.retVal=true;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    klass :function _trc_TQuery_klass(k) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.find((function anonymous_3207(o) {\n        \n        return o instanceof k;\n      }));\n    },\n    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.find((function anonymous_3207(o) {\n        \n        return o instanceof k;\n      }));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.InputDevice\',\n  shortName: \'InputDevice\',\n  namespace: \'kernel\',\n  includes: [],\n  methods: {\n    main :function _trc_InputDevice_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_InputDevice_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_InputDevice_initialize() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=10000091;//kernel.InputDevice:91\n      _this.listeners=[];\n      //$LASTPOS=10000110;//kernel.InputDevice:110\n      _this.touchEmu=true;\n    },\n    handleListeners :function _trc_InputDevice_handleListeners() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var l;\n      \n      //$LASTPOS=10000155;//kernel.InputDevice:155\n      l = _this.listeners;\n      //$LASTPOS=10000177;//kernel.InputDevice:177\n      _this.listeners=[];\n      //$LASTPOS=10000196;//kernel.InputDevice:196\n      while (l.length>0) {\n        //$LASTPOS=10000217;//kernel.InputDevice:217\n        (l.shift())();\n        \n      }\n    },\n    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var l;\n      \n      //$LASTPOS=10000155;//kernel.InputDevice:155\n      l = _this.listeners;\n      //$LASTPOS=10000177;//kernel.InputDevice:177\n      _this.listeners=[];\n      \n      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=10000196;//kernel.InputDevice:196\n          case 1:\n            if (!(l.length>0)) { __pc=2; break; }\n            {\n              //$LASTPOS=10000217;//kernel.InputDevice:217\n              (l.shift())();\n            }\n            __pc=1;break;\n          case 2:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    addOnetimeListener :function _trc_InputDevice_addOnetimeListener(l) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=10000267;//kernel.InputDevice:267\n      _this.listeners.push(l);\n    },\n    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=10000267;//kernel.InputDevice:267\n      _this.listeners.push(l);\n      \n      _thread.retVal=_this;return;\n    },\n    initCanvasEvents :function _trc_InputDevice_initCanvasEvents(cvj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var cv;\n      var handleMouse;\n      var handleTouch;\n      var handleTouchEnd;\n      var d;\n      \n      //$LASTPOS=10000320;//kernel.InputDevice:320\n      cv = cvj[0];\n      //$LASTPOS=10000340;//kernel.InputDevice:340\n      Tonyu.globals.$handleMouse=(function anonymous_353(e) {\n        var p;\n        var mp;\n        \n        //$LASTPOS=10000369;//kernel.InputDevice:369\n        p = cvj.offset();\n        //$LASTPOS=10000398;//kernel.InputDevice:398\n        mp = {x: e.clientX-p.left,y: e.clientY-p.top};\n        //$LASTPOS=10000455;//kernel.InputDevice:455\n        mp=Tonyu.globals.$Screen.canvas2buf(mp);\n        //$LASTPOS=10000491;//kernel.InputDevice:491\n        Tonyu.globals.$mouseX=mp.x;\n        //$LASTPOS=10000514;//kernel.InputDevice:514\n        Tonyu.globals.$mouseY=mp.y;\n        //$LASTPOS=10000537;//kernel.InputDevice:537\n        if (_this.touchEmu) {\n          //$LASTPOS=10000566;//kernel.InputDevice:566\n          Tonyu.globals.$touches[0].x=mp.x;\n          //$LASTPOS=10000599;//kernel.InputDevice:599\n          Tonyu.globals.$touches[0].y=mp.y;\n          \n        }\n        //$LASTPOS=10000639;//kernel.InputDevice:639\n        _this.handleListeners();\n      });\n      //$LASTPOS=10000671;//kernel.InputDevice:671\n      Tonyu.globals.$touches=[{},{},{},{},{}];\n      //$LASTPOS=10000703;//kernel.InputDevice:703\n      Tonyu.globals.$touches.findById=(function anonymous_721(id) {\n        var j;\n        \n        //$LASTPOS=10000738;//kernel.InputDevice:738\n        //$LASTPOS=10000743;//kernel.InputDevice:743\n        j = 0;\n        while(j<Tonyu.globals.$touches.length) {\n          {\n            //$LASTPOS=10000793;//kernel.InputDevice:793\n            if (Tonyu.globals.$touches[j].identifier==id) {\n              return Tonyu.globals.$touches[j];\n              \n            }\n          }\n          j++;\n        }\n      });\n      //$LASTPOS=10000903;//kernel.InputDevice:903\n      Tonyu.globals.$handleTouch=(function anonymous_916(e) {\n        var p;\n        var ts;\n        var i;\n        var src;\n        var dst;\n        var j;\n        \n        //$LASTPOS=10000932;//kernel.InputDevice:932\n        T2MediaLib.activate();\n        //$LASTPOS=10000964;//kernel.InputDevice:964\n        _this.touchEmu=false;\n        //$LASTPOS=10000989;//kernel.InputDevice:989\n        p = cvj.offset();\n        //$LASTPOS=10001018;//kernel.InputDevice:1018\n        e.preventDefault();\n        //$LASTPOS=10001047;//kernel.InputDevice:1047\n        ts = e.originalEvent.changedTouches;\n        //$LASTPOS=10001095;//kernel.InputDevice:1095\n        //$LASTPOS=10001100;//kernel.InputDevice:1100\n        i = 0;\n        while(i<ts.length) {\n          {\n            //$LASTPOS=10001145;//kernel.InputDevice:1145\n            src = ts[i];\n            //$LASTPOS=10001173;//kernel.InputDevice:1173\n            dst = Tonyu.globals.$touches.findById(src.identifier);\n            //$LASTPOS=10001229;//kernel.InputDevice:1229\n            if (! dst) {\n              //$LASTPOS=10001258;//kernel.InputDevice:1258\n              //$LASTPOS=10001263;//kernel.InputDevice:1263\n              j = 0;\n              while(j<Tonyu.globals.$touches.length) {\n                {\n                  //$LASTPOS=10001321;//kernel.InputDevice:1321\n                  if (! Tonyu.globals.$touches[j].touched) {\n                    //$LASTPOS=10001374;//kernel.InputDevice:1374\n                    dst=Tonyu.globals.$touches[j];\n                    //$LASTPOS=10001416;//kernel.InputDevice:1416\n                    dst.identifier=src.identifier;\n                    break;\n                    \n                    \n                  }\n                }\n                j++;\n              }\n              \n            }\n            //$LASTPOS=10001549;//kernel.InputDevice:1549\n            if (dst) {\n              //$LASTPOS=10001577;//kernel.InputDevice:1577\n              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};\n              //$LASTPOS=10001638;//kernel.InputDevice:1638\n              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);\n              //$LASTPOS=10001682;//kernel.InputDevice:1682\n              dst.x=_this.mp.x;\n              //$LASTPOS=10001711;//kernel.InputDevice:1711\n              dst.y=_this.mp.y;\n              //$LASTPOS=10001740;//kernel.InputDevice:1740\n              if (! dst.touched) {\n                //$LASTPOS=10001757;//kernel.InputDevice:1757\n                dst.touched=1;\n              }\n              \n            }\n          }\n          i++;\n        }\n        //$LASTPOS=10001807;//kernel.InputDevice:1807\n        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;\n        //$LASTPOS=10001839;//kernel.InputDevice:1839\n        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;\n        //$LASTPOS=10001871;//kernel.InputDevice:1871\n        _this.handleListeners();\n      });\n      //$LASTPOS=10001903;//kernel.InputDevice:1903\n      Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {\n        var ts;\n        var i;\n        var src;\n        var dst;\n        \n        //$LASTPOS=10001935;//kernel.InputDevice:1935\n        ts = e.originalEvent.changedTouches;\n        //$LASTPOS=10001983;//kernel.InputDevice:1983\n        //$LASTPOS=10001988;//kernel.InputDevice:1988\n        i = 0;\n        while(i<ts.length) {\n          {\n            //$LASTPOS=10002033;//kernel.InputDevice:2033\n            src = ts[i];\n            //$LASTPOS=10002061;//kernel.InputDevice:2061\n            dst = Tonyu.globals.$touches.findById(src.identifier);\n            //$LASTPOS=10002117;//kernel.InputDevice:2117\n            if (dst) {\n              //$LASTPOS=10002145;//kernel.InputDevice:2145\n              dst.touched=0;\n              //$LASTPOS=10002177;//kernel.InputDevice:2177\n              dst.identifier=- 1;\n              \n            }\n          }\n          i++;\n        }\n        //$LASTPOS=10002231;//kernel.InputDevice:2231\n        _this.handleListeners();\n      });\n      //$LASTPOS=10002263;//kernel.InputDevice:2263\n      handleMouse = (function anonymous_2279(e) {\n        \n        //$LASTPOS=10002284;//kernel.InputDevice:2284\n        Tonyu.globals.$handleMouse(e);\n      });\n      //$LASTPOS=10002308;//kernel.InputDevice:2308\n      handleTouch = (function anonymous_2324(e) {\n        \n        //$LASTPOS=10002329;//kernel.InputDevice:2329\n        Tonyu.globals.$handleTouch(e);\n      });\n      //$LASTPOS=10002353;//kernel.InputDevice:2353\n      handleTouchEnd = (function anonymous_2372(e) {\n        \n        //$LASTPOS=10002377;//kernel.InputDevice:2377\n        Tonyu.globals.$handleTouchEnd(e);\n      });\n      //$LASTPOS=10002404;//kernel.InputDevice:2404\n      d = $.data(cv,"events");\n      //$LASTPOS=10002436;//kernel.InputDevice:2436\n      if (! d) {\n        //$LASTPOS=10002455;//kernel.InputDevice:2455\n        $.data(cv,"events","true");\n        //$LASTPOS=10002492;//kernel.InputDevice:2492\n        cvj.mousedown(handleMouse);\n        //$LASTPOS=10002529;//kernel.InputDevice:2529\n        cvj.mousemove(handleMouse);\n        //$LASTPOS=10002566;//kernel.InputDevice:2566\n        cvj.on("touchstart",handleTouch);\n        //$LASTPOS=10002609;//kernel.InputDevice:2609\n        cvj.on("touchmove",handleTouch);\n        //$LASTPOS=10002651;//kernel.InputDevice:2651\n        cvj.on("touchend",handleTouchEnd);\n        \n      }\n    },\n    fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var cv;\n      var handleMouse;\n      var handleTouch;\n      var handleTouchEnd;\n      var d;\n      \n      //$LASTPOS=10000320;//kernel.InputDevice:320\n      cv = cvj[0];\n      \n      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=10000340;//kernel.InputDevice:340\n            Tonyu.globals.$handleMouse=(function anonymous_353(e) {\n              var p;\n              var mp;\n              \n              //$LASTPOS=10000369;//kernel.InputDevice:369\n              p = cvj.offset();\n              //$LASTPOS=10000398;//kernel.InputDevice:398\n              mp = {x: e.clientX-p.left,y: e.clientY-p.top};\n              //$LASTPOS=10000455;//kernel.InputDevice:455\n              mp=Tonyu.globals.$Screen.canvas2buf(mp);\n              //$LASTPOS=10000491;//kernel.InputDevice:491\n              Tonyu.globals.$mouseX=mp.x;\n              //$LASTPOS=10000514;//kernel.InputDevice:514\n              Tonyu.globals.$mouseY=mp.y;\n              //$LASTPOS=10000537;//kernel.InputDevice:537\n              if (_this.touchEmu) {\n                //$LASTPOS=10000566;//kernel.InputDevice:566\n                Tonyu.globals.$touches[0].x=mp.x;\n                //$LASTPOS=10000599;//kernel.InputDevice:599\n                Tonyu.globals.$touches[0].y=mp.y;\n                \n              }\n              //$LASTPOS=10000639;//kernel.InputDevice:639\n              _this.handleListeners();\n            });\n            //$LASTPOS=10000671;//kernel.InputDevice:671\n            Tonyu.globals.$touches=[{},{},{},{},{}];\n            //$LASTPOS=10000703;//kernel.InputDevice:703\n            Tonyu.globals.$touches.findById=(function anonymous_721(id) {\n              var j;\n              \n              //$LASTPOS=10000738;//kernel.InputDevice:738\n              //$LASTPOS=10000743;//kernel.InputDevice:743\n              j = 0;\n              while(j<Tonyu.globals.$touches.length) {\n                {\n                  //$LASTPOS=10000793;//kernel.InputDevice:793\n                  if (Tonyu.globals.$touches[j].identifier==id) {\n                    return Tonyu.globals.$touches[j];\n                    \n                  }\n                }\n                j++;\n              }\n            });\n            //$LASTPOS=10000903;//kernel.InputDevice:903\n            Tonyu.globals.$handleTouch=(function anonymous_916(e) {\n              var p;\n              var ts;\n              var i;\n              var src;\n              var dst;\n              var j;\n              \n              //$LASTPOS=10000932;//kernel.InputDevice:932\n              T2MediaLib.activate();\n              //$LASTPOS=10000964;//kernel.InputDevice:964\n              _this.touchEmu=false;\n              //$LASTPOS=10000989;//kernel.InputDevice:989\n              p = cvj.offset();\n              //$LASTPOS=10001018;//kernel.InputDevice:1018\n              e.preventDefault();\n              //$LASTPOS=10001047;//kernel.InputDevice:1047\n              ts = e.originalEvent.changedTouches;\n              //$LASTPOS=10001095;//kernel.InputDevice:1095\n              //$LASTPOS=10001100;//kernel.InputDevice:1100\n              i = 0;\n              while(i<ts.length) {\n                {\n                  //$LASTPOS=10001145;//kernel.InputDevice:1145\n                  src = ts[i];\n                  //$LASTPOS=10001173;//kernel.InputDevice:1173\n                  dst = Tonyu.globals.$touches.findById(src.identifier);\n                  //$LASTPOS=10001229;//kernel.InputDevice:1229\n                  if (! dst) {\n                    //$LASTPOS=10001258;//kernel.InputDevice:1258\n                    //$LASTPOS=10001263;//kernel.InputDevice:1263\n                    j = 0;\n                    while(j<Tonyu.globals.$touches.length) {\n                      {\n                        //$LASTPOS=10001321;//kernel.InputDevice:1321\n                        if (! Tonyu.globals.$touches[j].touched) {\n                          //$LASTPOS=10001374;//kernel.InputDevice:1374\n                          dst=Tonyu.globals.$touches[j];\n                          //$LASTPOS=10001416;//kernel.InputDevice:1416\n                          dst.identifier=src.identifier;\n                          break;\n                          \n                          \n                        }\n                      }\n                      j++;\n                    }\n                    \n                  }\n                  //$LASTPOS=10001549;//kernel.InputDevice:1549\n                  if (dst) {\n                    //$LASTPOS=10001577;//kernel.InputDevice:1577\n                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};\n                    //$LASTPOS=10001638;//kernel.InputDevice:1638\n                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);\n                    //$LASTPOS=10001682;//kernel.InputDevice:1682\n                    dst.x=_this.mp.x;\n                    //$LASTPOS=10001711;//kernel.InputDevice:1711\n                    dst.y=_this.mp.y;\n                    //$LASTPOS=10001740;//kernel.InputDevice:1740\n                    if (! dst.touched) {\n                      //$LASTPOS=10001757;//kernel.InputDevice:1757\n                      dst.touched=1;\n                    }\n                    \n                  }\n                }\n                i++;\n              }\n              //$LASTPOS=10001807;//kernel.InputDevice:1807\n              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;\n              //$LASTPOS=10001839;//kernel.InputDevice:1839\n              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;\n              //$LASTPOS=10001871;//kernel.InputDevice:1871\n              _this.handleListeners();\n            });\n            //$LASTPOS=10001903;//kernel.InputDevice:1903\n            Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {\n              var ts;\n              var i;\n              var src;\n              var dst;\n              \n              //$LASTPOS=10001935;//kernel.InputDevice:1935\n              ts = e.originalEvent.changedTouches;\n              //$LASTPOS=10001983;//kernel.InputDevice:1983\n              //$LASTPOS=10001988;//kernel.InputDevice:1988\n              i = 0;\n              while(i<ts.length) {\n                {\n                  //$LASTPOS=10002033;//kernel.InputDevice:2033\n                  src = ts[i];\n                  //$LASTPOS=10002061;//kernel.InputDevice:2061\n                  dst = Tonyu.globals.$touches.findById(src.identifier);\n                  //$LASTPOS=10002117;//kernel.InputDevice:2117\n                  if (dst) {\n                    //$LASTPOS=10002145;//kernel.InputDevice:2145\n                    dst.touched=0;\n                    //$LASTPOS=10002177;//kernel.InputDevice:2177\n                    dst.identifier=- 1;\n                    \n                  }\n                }\n                i++;\n              }\n              //$LASTPOS=10002231;//kernel.InputDevice:2231\n              _this.handleListeners();\n            });\n            //$LASTPOS=10002263;//kernel.InputDevice:2263\n            handleMouse = (function anonymous_2279(e) {\n              \n              //$LASTPOS=10002284;//kernel.InputDevice:2284\n              Tonyu.globals.$handleMouse(e);\n            });\n            //$LASTPOS=10002308;//kernel.InputDevice:2308\n            handleTouch = (function anonymous_2324(e) {\n              \n              //$LASTPOS=10002329;//kernel.InputDevice:2329\n              Tonyu.globals.$handleTouch(e);\n            });\n            //$LASTPOS=10002353;//kernel.InputDevice:2353\n            handleTouchEnd = (function anonymous_2372(e) {\n              \n              //$LASTPOS=10002377;//kernel.InputDevice:2377\n              Tonyu.globals.$handleTouchEnd(e);\n            });\n            //$LASTPOS=10002404;//kernel.InputDevice:2404\n            d = $.data(cv,"events");\n            //$LASTPOS=10002436;//kernel.InputDevice:2436\n            if (! d) {\n              //$LASTPOS=10002455;//kernel.InputDevice:2455\n              $.data(cv,"events","true");\n              //$LASTPOS=10002492;//kernel.InputDevice:2492\n              cvj.mousedown(handleMouse);\n              //$LASTPOS=10002529;//kernel.InputDevice:2529\n              cvj.mousemove(handleMouse);\n              //$LASTPOS=10002566;//kernel.InputDevice:2566\n              cvj.on("touchstart",handleTouch);\n              //$LASTPOS=10002609;//kernel.InputDevice:2609\n              cvj.on("touchmove",handleTouch);\n              //$LASTPOS=10002651;//kernel.InputDevice:2651\n              cvj.on("touchend",handleTouchEnd);\n              \n            }\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    update :function _trc_InputDevice_update() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var _it_108;\n      \n      //$LASTPOS=10002716;//kernel.InputDevice:2716\n      _it_108=Tonyu.iterator(Tonyu.globals.$touches,1);\n      while(_it_108.next()) {\n        i=_it_108[0];\n        \n        //$LASTPOS=10002751;//kernel.InputDevice:2751\n        if (i.touched>0) {\n          //$LASTPOS=10002769;//kernel.InputDevice:2769\n          i.touched++;\n          \n        }\n        //$LASTPOS=10002792;//kernel.InputDevice:2792\n        if (i.touched==- 1) {\n          //$LASTPOS=10002811;//kernel.InputDevice:2811\n          i.touched=1;\n        }\n        \n      }\n    },\n    fiber$update :function _trc_InputDevice_f_update(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var _it_108;\n      \n      //$LASTPOS=10002716;//kernel.InputDevice:2716\n      _it_108=Tonyu.iterator(Tonyu.globals.$touches,1);\n      while(_it_108.next()) {\n        i=_it_108[0];\n        \n        //$LASTPOS=10002751;//kernel.InputDevice:2751\n        if (i.touched>0) {\n          //$LASTPOS=10002769;//kernel.InputDevice:2769\n          i.touched++;\n          \n        }\n        //$LASTPOS=10002792;//kernel.InputDevice:2792\n        if (i.touched==- 1) {\n          //$LASTPOS=10002811;//kernel.InputDevice:2811\n          i.touched=1;\n        }\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Keys\',\n  shortName: \'Keys\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [],\n  methods: {\n    main :function _trc_Keys_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      \n      //$LASTPOS=11000084;//kernel.Keys:84\n      _this.stats={};\n      //$LASTPOS=11000094;//kernel.Keys:94\n      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};\n      //$LASTPOS=11000212;//kernel.Keys:212\n      //$LASTPOS=11000217;//kernel.Keys:217\n      i = 65;\n      while(i<65+26) {\n        {\n          //$LASTPOS=11000248;//kernel.Keys:248\n          _this.codes[String.fromCharCode(i).toLowerCase()]=i;\n        }\n        i++;\n      }\n      //$LASTPOS=11000297;//kernel.Keys:297\n      //$LASTPOS=11000302;//kernel.Keys:302\n      i = 48;\n      while(i<58) {\n        {\n          //$LASTPOS=11000330;//kernel.Keys:330\n          _this.codes[String.fromCharCode(i)]=i;\n        }\n        i++;\n      }\n      //$LASTPOS=11000365;//kernel.Keys:365\n      if (! $.data(document,"key_event")) {\n        //$LASTPOS=11000406;//kernel.Keys:406\n        $.data(document,"key_event",true);\n        //$LASTPOS=11000445;//kernel.Keys:445\n        $(document).keydown((function anonymous_465(e) {\n          \n          //$LASTPOS=11000471;//kernel.Keys:471\n          Tonyu.globals.$Keys.keydown(e);\n        }));\n        //$LASTPOS=11000495;//kernel.Keys:495\n        $(document).keyup((function anonymous_513(e) {\n          \n          //$LASTPOS=11000519;//kernel.Keys:519\n          Tonyu.globals.$Keys.keyup(e);\n        }));\n        //$LASTPOS=11000541;//kernel.Keys:541\n        $(document).mousedown((function anonymous_563(e) {\n          \n          //$LASTPOS=11000578;//kernel.Keys:578\n          if (Tonyu.globals.$InputDevice.touchEmu) {\n            //$LASTPOS=11000619;//kernel.Keys:619\n            Tonyu.globals.$touches[0].touched=1;\n            \n          }\n          //$LASTPOS=11000660;//kernel.Keys:660\n          Tonyu.globals.$Keys.keydown({keyCode: 1});\n        }));\n        //$LASTPOS=11000697;//kernel.Keys:697\n        $(document).mouseup((function anonymous_717(e) {\n          \n          //$LASTPOS=11000732;//kernel.Keys:732\n          if (Tonyu.globals.$InputDevice.touchEmu) {\n            //$LASTPOS=11000773;//kernel.Keys:773\n            Tonyu.globals.$touches[0].touched=0;\n            \n          }\n          //$LASTPOS=11000814;//kernel.Keys:814\n          Tonyu.globals.$Keys.keyup({keyCode: 1});\n        }));\n        \n      }\n    },\n    fiber$main :function _trc_Keys_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      \n      //$LASTPOS=11000084;//kernel.Keys:84\n      _this.stats={};\n      //$LASTPOS=11000094;//kernel.Keys:94\n      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};\n      //$LASTPOS=11000212;//kernel.Keys:212\n      //$LASTPOS=11000217;//kernel.Keys:217\n      i = 65;\n      while(i<65+26) {\n        {\n          //$LASTPOS=11000248;//kernel.Keys:248\n          _this.codes[String.fromCharCode(i).toLowerCase()]=i;\n        }\n        i++;\n      }\n      //$LASTPOS=11000297;//kernel.Keys:297\n      //$LASTPOS=11000302;//kernel.Keys:302\n      i = 48;\n      while(i<58) {\n        {\n          //$LASTPOS=11000330;//kernel.Keys:330\n          _this.codes[String.fromCharCode(i)]=i;\n        }\n        i++;\n      }\n      //$LASTPOS=11000365;//kernel.Keys:365\n      if (! $.data(document,"key_event")) {\n        //$LASTPOS=11000406;//kernel.Keys:406\n        $.data(document,"key_event",true);\n        //$LASTPOS=11000445;//kernel.Keys:445\n        $(document).keydown((function anonymous_465(e) {\n          \n          //$LASTPOS=11000471;//kernel.Keys:471\n          Tonyu.globals.$Keys.keydown(e);\n        }));\n        //$LASTPOS=11000495;//kernel.Keys:495\n        $(document).keyup((function anonymous_513(e) {\n          \n          //$LASTPOS=11000519;//kernel.Keys:519\n          Tonyu.globals.$Keys.keyup(e);\n        }));\n        //$LASTPOS=11000541;//kernel.Keys:541\n        $(document).mousedown((function anonymous_563(e) {\n          \n          //$LASTPOS=11000578;//kernel.Keys:578\n          if (Tonyu.globals.$InputDevice.touchEmu) {\n            //$LASTPOS=11000619;//kernel.Keys:619\n            Tonyu.globals.$touches[0].touched=1;\n            \n          }\n          //$LASTPOS=11000660;//kernel.Keys:660\n          Tonyu.globals.$Keys.keydown({keyCode: 1});\n        }));\n        //$LASTPOS=11000697;//kernel.Keys:697\n        $(document).mouseup((function anonymous_717(e) {\n          \n          //$LASTPOS=11000732;//kernel.Keys:732\n          if (Tonyu.globals.$InputDevice.touchEmu) {\n            //$LASTPOS=11000773;//kernel.Keys:773\n            Tonyu.globals.$touches[0].touched=0;\n            \n          }\n          //$LASTPOS=11000814;//kernel.Keys:814\n          Tonyu.globals.$Keys.keyup({keyCode: 1});\n        }));\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    getkey :function _trc_Keys_getkey(code) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=11000875;//kernel.Keys:875\n      if (typeof  code=="string") {\n        //$LASTPOS=11000912;//kernel.Keys:912\n        code=_this.codes[code.toLowerCase()];\n        \n      }\n      //$LASTPOS=11000954;//kernel.Keys:954\n      if (! code) {\n        return 0;\n      }\n      //$LASTPOS=11000979;//kernel.Keys:979\n      if (_this.stats[code]==- 1) {\n        return 0;\n      }\n      //$LASTPOS=11001014;//kernel.Keys:1014\n      if (! _this.stats[code]) {\n        //$LASTPOS=11001032;//kernel.Keys:1032\n        _this.stats[code]=0;\n      }\n      return _this.stats[code];\n    },\n    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=11000875;//kernel.Keys:875\n      if (typeof  code=="string") {\n        //$LASTPOS=11000912;//kernel.Keys:912\n        code=_this.codes[code.toLowerCase()];\n        \n      }\n      //$LASTPOS=11000954;//kernel.Keys:954\n      if (! code) {\n        _thread.retVal=0;return;\n        \n      }\n      //$LASTPOS=11000979;//kernel.Keys:979\n      if (_this.stats[code]==- 1) {\n        _thread.retVal=0;return;\n        \n      }\n      //$LASTPOS=11001014;//kernel.Keys:1014\n      if (! _this.stats[code]) {\n        //$LASTPOS=11001032;//kernel.Keys:1032\n        _this.stats[code]=0;\n      }\n      _thread.retVal=_this.stats[code];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    update :function _trc_Keys_update() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var _it_116;\n      \n      //$LASTPOS=11001097;//kernel.Keys:1097\n      _it_116=Tonyu.iterator(_this.stats,1);\n      while(_it_116.next()) {\n        i=_it_116[0];\n        \n        //$LASTPOS=11001128;//kernel.Keys:1128\n        if (_this.stats[i]>0) {\n          //$LASTPOS=11001145;//kernel.Keys:1145\n          _this.stats[i]++;\n          \n        }\n        //$LASTPOS=11001166;//kernel.Keys:1166\n        if (_this.stats[i]==- 1) {\n          //$LASTPOS=11001184;//kernel.Keys:1184\n          _this.stats[i]=1;\n        }\n        \n      }\n    },\n    fiber$update :function _trc_Keys_f_update(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var _it_116;\n      \n      //$LASTPOS=11001097;//kernel.Keys:1097\n      _it_116=Tonyu.iterator(_this.stats,1);\n      while(_it_116.next()) {\n        i=_it_116[0];\n        \n        //$LASTPOS=11001128;//kernel.Keys:1128\n        if (_this.stats[i]>0) {\n          //$LASTPOS=11001145;//kernel.Keys:1145\n          _this.stats[i]++;\n          \n        }\n        //$LASTPOS=11001166;//kernel.Keys:1166\n        if (_this.stats[i]==- 1) {\n          //$LASTPOS=11001184;//kernel.Keys:1184\n          _this.stats[i]=1;\n        }\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    keydown :function _trc_Keys_keydown(e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var s;\n      \n      //$LASTPOS=11001222;//kernel.Keys:1222\n      s = _this.stats[e.keyCode];\n      //$LASTPOS=11001250;//kernel.Keys:1250\n      if (! s) {\n        //$LASTPOS=11001268;//kernel.Keys:1268\n        _this.stats[e.keyCode]=1;\n        \n      }\n      //$LASTPOS=11001298;//kernel.Keys:1298\n      Tonyu.globals.$InputDevice.handleListeners();\n    },\n    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var s;\n      \n      //$LASTPOS=11001222;//kernel.Keys:1222\n      s = _this.stats[e.keyCode];\n      //$LASTPOS=11001250;//kernel.Keys:1250\n      if (! s) {\n        //$LASTPOS=11001268;//kernel.Keys:1268\n        _this.stats[e.keyCode]=1;\n        \n      }\n      //$LASTPOS=11001298;//kernel.Keys:1298\n      Tonyu.globals.$InputDevice.handleListeners();\n      \n      _thread.retVal=_this;return;\n    },\n    keyup :function _trc_Keys_keyup(e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=11001348;//kernel.Keys:1348\n      _this.stats[e.keyCode]=0;\n      //$LASTPOS=11001372;//kernel.Keys:1372\n      Tonyu.globals.$InputDevice.handleListeners();\n    },\n    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=11001348;//kernel.Keys:1348\n      _this.stats[e.keyCode]=0;\n      //$LASTPOS=11001372;//kernel.Keys:1372\n      Tonyu.globals.$InputDevice.handleListeners();\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.BaseActor\',\n  shortName: \'BaseActor\',\n  namespace: \'kernel\',\n  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod,Tonyu.classes.kernel.EventHandlerCaller],\n  methods: {\n    main :function _trc_BaseActor_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_BaseActor_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_BaseActor_initialize(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12000248;//kernel.BaseActor:248\n      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);\n      //$LASTPOS=12000293;//kernel.BaseActor:293\n      _this.registerEventHandler("screenOut",new Tonyu.classes.kernel.ScreenOutHandler);\n      //$LASTPOS=12000358;//kernel.BaseActor:358\n      _this.registerEventHandler("crashTo",new Tonyu.classes.kernel.CrashToHandler);\n      //$LASTPOS=12000419;//kernel.BaseActor:419\n      _this.registerEventHandler("within",new Tonyu.classes.kernel.WithinHandler);\n      //$LASTPOS=12000483;//kernel.BaseActor:483\n      if (typeof  x=="object") {\n        //$LASTPOS=12000507;//kernel.BaseActor:507\n        Tonyu.extend(_this,x);\n      } else {\n        //$LASTPOS=12000539;//kernel.BaseActor:539\n        if (typeof  x=="number") {\n          //$LASTPOS=12000574;//kernel.BaseActor:574\n          _this.x=x;\n          //$LASTPOS=12000593;//kernel.BaseActor:593\n          _this.y=y;\n          //$LASTPOS=12000612;//kernel.BaseActor:612\n          _this.p=p;\n          \n        }\n      }\n      //$LASTPOS=12000634;//kernel.BaseActor:634\n      if (_this.scaleX==null) {\n        //$LASTPOS=12000652;//kernel.BaseActor:652\n        _this.scaleX=1;\n      }\n      //$LASTPOS=12000667;//kernel.BaseActor:667\n      if (_this.rotation==null) {\n        //$LASTPOS=12000687;//kernel.BaseActor:687\n        _this.rotation=0;\n      }\n      //$LASTPOS=12000704;//kernel.BaseActor:704\n      if (_this.rotate==null) {\n        //$LASTPOS=12000722;//kernel.BaseActor:722\n        _this.rotate=0;\n      }\n      //$LASTPOS=12000737;//kernel.BaseActor:737\n      if (_this.alpha==null) {\n        //$LASTPOS=12000754;//kernel.BaseActor:754\n        _this.alpha=255;\n      }\n      //$LASTPOS=12000770;//kernel.BaseActor:770\n      if (_this.zOrder==null) {\n        //$LASTPOS=12000788;//kernel.BaseActor:788\n        _this.zOrder=0;\n      }\n      //$LASTPOS=12000803;//kernel.BaseActor:803\n      if (_this.age==null) {\n        //$LASTPOS=12000818;//kernel.BaseActor:818\n        _this.age=0;\n      }\n      //$LASTPOS=12000830;//kernel.BaseActor:830\n      if (_this.anim!=null&&typeof  _this.anim=="object") {\n        //$LASTPOS=12000881;//kernel.BaseActor:881\n        _this.animMode=true;\n        //$LASTPOS=12000905;//kernel.BaseActor:905\n        _this.animFrame=0;\n        \n      } else {\n        //$LASTPOS=12000939;//kernel.BaseActor:939\n        _this.animMode=false;\n        \n      }\n      //$LASTPOS=12000967;//kernel.BaseActor:967\n      if (_this.animFps==null) {\n        //$LASTPOS=12000986;//kernel.BaseActor:986\n        _this.animFps=1;\n      }\n    },\n    extend :function _trc_BaseActor_extend(obj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.extend(_this,obj);\n    },\n    print :function _trc_BaseActor_print(pt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var mergedArg;\n      var argCount;\n      var printCount;\n      \n      //$LASTPOS=12001090;//kernel.BaseActor:1090\n      console.log.apply(console,arguments);\n      //$LASTPOS=12001133;//kernel.BaseActor:1133\n      mergedArg = "";\n      //$LASTPOS=12001156;//kernel.BaseActor:1156\n      if (Tonyu.globals.$consolePanel) {\n        //$LASTPOS=12001184;//kernel.BaseActor:1184\n        //$LASTPOS=12001188;//kernel.BaseActor:1188\n        argCount = 0;\n        while(argCount<arguments.length) {\n          {\n            //$LASTPOS=12001255;//kernel.BaseActor:1255\n            mergedArg=mergedArg+arguments[argCount]+" ";\n          }\n          argCount++;\n        }\n        //$LASTPOS=12001320;//kernel.BaseActor:1320\n        _this.splits=mergedArg.split("\\n");\n        //$LASTPOS=12001359;//kernel.BaseActor:1359\n        //$LASTPOS=12001363;//kernel.BaseActor:1363\n        printCount = 0;\n        while(printCount<_this.splits.length) {\n          {\n            //$LASTPOS=12001433;//kernel.BaseActor:1433\n            Tonyu.globals.$consolePanel.scroll(0,20);\n            //$LASTPOS=12001474;//kernel.BaseActor:1474\n            Tonyu.globals.$consolePanel.setFillStyle("white");\n            //$LASTPOS=12001524;//kernel.BaseActor:1524\n            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");\n          }\n          printCount++;\n        }\n        \n      }\n    },\n    setAnimFps :function _trc_BaseActor_setAnimFps(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12001647;//kernel.BaseActor:1647\n      _this.animFps=f;\n      //$LASTPOS=12001668;//kernel.BaseActor:1668\n      _this.animFrame=0;\n      //$LASTPOS=12001691;//kernel.BaseActor:1691\n      _this.animMode=true;\n    },\n    startAnim :function _trc_BaseActor_startAnim() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12001741;//kernel.BaseActor:1741\n      _this.animMode=true;\n    },\n    stopAnim :function _trc_BaseActor_stopAnim() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12001790;//kernel.BaseActor:1790\n      _this.animMode=false;\n    },\n    update :function _trc_BaseActor_update() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12001832;//kernel.BaseActor:1832\n      _this.onUpdate();\n      //$LASTPOS=12001849;//kernel.BaseActor:1849\n      if (null) {\n        //$LASTPOS=12001872;//kernel.BaseActor:1872\n        null.suspend();\n        //$LASTPOS=12001900;//kernel.BaseActor:1900\n        if (Tonyu.globals.$Scheduler) {\n          //$LASTPOS=12001916;//kernel.BaseActor:1916\n          Tonyu.globals.$Scheduler.addToNext(null);\n        }\n        \n      }\n    },\n    fiber$update :function _trc_BaseActor_f_update(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12001832;//kernel.BaseActor:1832\n      _this.onUpdate();\n      //$LASTPOS=12001849;//kernel.BaseActor:1849\n      if (_thread) {\n        //$LASTPOS=12001872;//kernel.BaseActor:1872\n        _thread.suspend();\n        //$LASTPOS=12001900;//kernel.BaseActor:1900\n        if (Tonyu.globals.$Scheduler) {\n          //$LASTPOS=12001916;//kernel.BaseActor:1916\n          Tonyu.globals.$Scheduler.addToNext(_thread);\n        }\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    onUpdate :function _trc_BaseActor_onUpdate() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    updateEx :function _trc_BaseActor_updateEx(updateT) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var updateCount;\n      \n      //$LASTPOS=12002010;//kernel.BaseActor:2010\n      //$LASTPOS=12002014;//kernel.BaseActor:2014\n      updateCount = 0;\n      while(updateCount<updateT) {\n        {\n          //$LASTPOS=12002077;//kernel.BaseActor:2077\n          _this.update();\n        }\n        updateCount++;\n      }\n    },\n    fiber$updateEx :function _trc_BaseActor_f_updateEx(_thread,updateT) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var updateCount;\n      \n      \n      _thread.enter(function _trc_BaseActor_ent_updateEx(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=12002010;//kernel.BaseActor:2010\n            //$LASTPOS=12002014;//kernel.BaseActor:2014\n            updateCount = 0;;\n          case 1:\n            if (!(updateCount<updateT)) { __pc=3; break; }\n            //$LASTPOS=12002077;//kernel.BaseActor:2077\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            updateCount++;\n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    getkey :function _trc_BaseActor_getkey(k) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.globals.$Keys.getkey(k);\n    },\n    hitTo :function _trc_BaseActor_hitTo(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.crashTo(t);\n    },\n    all :function _trc_BaseActor_all(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      \n      //$LASTPOS=12002220;//kernel.BaseActor:2220\n      res = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=12002245;//kernel.BaseActor:2245\n      if (arguments.length>0&&typeof  c!="function") {\n        return res;\n        \n      }\n      //$LASTPOS=12002328;//kernel.BaseActor:2328\n      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2353(s) {\n        \n        //$LASTPOS=12002369;//kernel.BaseActor:2369\n        if (s===_this) {\n          return _this;\n        }\n        //$LASTPOS=12002400;//kernel.BaseActor:2400\n        if (! c||s instanceof c) {\n          //$LASTPOS=12002441;//kernel.BaseActor:2441\n          res.push(s);\n          \n        }\n      }));\n      return res;\n    },\n    allCrash :function _trc_BaseActor_allCrash(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var sp;\n      var t1;\n      \n      //$LASTPOS=12002548;//kernel.BaseActor:2548\n      res = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=12002573;//kernel.BaseActor:2573\n      sp = _this;\n      //$LASTPOS=12002610;//kernel.BaseActor:2610\n      t1 = _this.getCrashRect();\n      //$LASTPOS=12002638;//kernel.BaseActor:2638\n      if (! t1) {\n        return res;\n      }\n      //$LASTPOS=12002664;//kernel.BaseActor:2664\n      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2689(s) {\n        var t2;\n        \n        //$LASTPOS=12002705;//kernel.BaseActor:2705\n        t2;\n        //$LASTPOS=12002722;//kernel.BaseActor:2722\n        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n          //$LASTPOS=12002948;//kernel.BaseActor:2948\n          res.push(s);\n          \n        }\n      }));\n      return res;\n    },\n    crashTo :function _trc_BaseActor_crashTo(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12003028;//kernel.BaseActor:3028\n      if (! t) {\n        return false;\n      }\n      //$LASTPOS=12003055;//kernel.BaseActor:3055\n      if (typeof  t=="function") {\n        return _this.allCrash(t)[0];\n        \n      }\n      return _this.crashTo1(t);\n    },\n    crashTo1 :function _trc_BaseActor_crashTo1(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var t1;\n      var t2;\n      \n      //$LASTPOS=12003178;//kernel.BaseActor:3178\n      if (! t||t._isDead) {\n        return false;\n      }\n      //$LASTPOS=12003306;//kernel.BaseActor:3306\n      t1 = _this.getCrashRect();\n      //$LASTPOS=12003334;//kernel.BaseActor:3334\n      t2 = t.getCrashRect();\n      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\n    },\n    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var obj;\n      var _it_133;\n      \n      //$LASTPOS=12003643;//kernel.BaseActor:3643\n      while (true) {\n        //$LASTPOS=12003665;//kernel.BaseActor:3665\n        if (typeof  d=="function") {\n          //$LASTPOS=12003704;//kernel.BaseActor:3704\n          _it_133=Tonyu.iterator(_this.allCrash(d),1);\n          while(_it_133.next()) {\n            obj=_it_133[0];\n            \n            //$LASTPOS=12003746;//kernel.BaseActor:3746\n            _this.callEventHandler(f,[obj]);\n            \n          }\n          \n        } else {\n          //$LASTPOS=12003803;//kernel.BaseActor:3803\n          if (_this.crashTo(d)) {\n            //$LASTPOS=12003832;//kernel.BaseActor:3832\n            _this.callEventHandler(f,[d]);\n            \n          }\n        }\n        //$LASTPOS=12003877;//kernel.BaseActor:3877\n        _this.update();\n        \n      }\n    },\n    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var obj;\n      var _it_133;\n      \n      \n      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=12003643;//kernel.BaseActor:3643\n          case 1:\n            //$LASTPOS=12003665;//kernel.BaseActor:3665\n            if (!(typeof  d=="function")) { __pc=5; break; }\n            //$LASTPOS=12003704;//kernel.BaseActor:3704\n            _it_133=Tonyu.iterator(_this.allCrash(d),1);\n          case 2:\n            if (!(_it_133.next())) { __pc=4; break; }\n            obj=_it_133[0];\n            \n            //$LASTPOS=12003746;//kernel.BaseActor:3746\n            _this.fiber$callEventHandler(_thread, f, [obj]);\n            __pc=3;return;\n          case 3:\n            \n            __pc=2;break;\n          case 4:\n            \n            __pc=8;break;\n          case 5:\n            //$LASTPOS=12003803;//kernel.BaseActor:3803\n            if (!(_this.crashTo(d))) { __pc=7; break; }\n            //$LASTPOS=12003832;//kernel.BaseActor:3832\n            _this.fiber$callEventHandler(_thread, f, [d]);\n            __pc=6;return;\n          case 6:\n            \n          case 7:\n            \n          case 8:\n            \n            //$LASTPOS=12003877;//kernel.BaseActor:3877\n            _this.fiber$update(_thread);\n            __pc=9;return;\n          case 9:\n            \n            __pc=1;break;\n          case 10:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    getCrashRect :function _trc_BaseActor_getCrashRect() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var actWidth;\n      var actHeight;\n      \n      //$LASTPOS=12003928;//kernel.BaseActor:3928\n      actWidth = _this.width*_this.scaleX;actHeight;\n      //$LASTPOS=12003971;//kernel.BaseActor:3971\n      if (typeof  _this.scaleY==="undefined") {\n        //$LASTPOS=12004013;//kernel.BaseActor:4013\n        actHeight=_this.height*_this.scaleX;\n        \n      } else {\n        //$LASTPOS=12004059;//kernel.BaseActor:4059\n        actHeight=_this.height*_this.scaleY;\n        \n      }\n      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};\n    },\n    allWithin :function _trc_BaseActor_allWithin(t,distance) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var sp;\n      var t1;\n      \n      //$LASTPOS=12004320;//kernel.BaseActor:4320\n      res = new Tonyu.classes.kernel.TQuery;\n      //$LASTPOS=12004345;//kernel.BaseActor:4345\n      sp = _this;\n      //$LASTPOS=12004382;//kernel.BaseActor:4382\n      t1 = _this.getCrashRect();\n      //$LASTPOS=12004410;//kernel.BaseActor:4410\n      if (! t1) {\n        return res;\n      }\n      //$LASTPOS=12004436;//kernel.BaseActor:4436\n      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_4461(s) {\n        var t2;\n        \n        //$LASTPOS=12004477;//kernel.BaseActor:4477\n        t2;\n        //$LASTPOS=12004494;//kernel.BaseActor:4494\n        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {\n          //$LASTPOS=12004679;//kernel.BaseActor:4679\n          res.push(s);\n          \n        }\n      }));\n      return res;\n    },\n    within :function _trc_BaseActor_within(t,distance) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12004770;//kernel.BaseActor:4770\n      if (! t) {\n        return false;\n      }\n      //$LASTPOS=12004796;//kernel.BaseActor:4796\n      if (typeof  t=="function") {\n        return _this.allWithin(t,distance)[0];\n        \n      }\n      return _this.within1(t,distance);\n    },\n    within1 :function _trc_BaseActor_within1(t,distance) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12004942;//kernel.BaseActor:4942\n      if (! t||t._isDead) {\n        return false;\n      }\n      //$LASTPOS=12004981;//kernel.BaseActor:4981\n      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {\n        return true;\n        \n      }\n      return false;\n    },\n    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var obj;\n      var _it_143;\n      \n      //$LASTPOS=12005151;//kernel.BaseActor:5151\n      while (true) {\n        //$LASTPOS=12005173;//kernel.BaseActor:5173\n        if (typeof  d=="function") {\n          //$LASTPOS=12005212;//kernel.BaseActor:5212\n          _it_143=Tonyu.iterator(_this.allWithin(d,r),1);\n          while(_it_143.next()) {\n            obj=_it_143[0];\n            \n            //$LASTPOS=12005257;//kernel.BaseActor:5257\n            _this.print(r);\n            //$LASTPOS=12005284;//kernel.BaseActor:5284\n            f(obj);\n            \n          }\n          \n        } else {\n          //$LASTPOS=12005322;//kernel.BaseActor:5322\n          if (_this.within(d,r)) {\n            //$LASTPOS=12005352;//kernel.BaseActor:5352\n            f(d);\n            \n          }\n        }\n        //$LASTPOS=12005378;//kernel.BaseActor:5378\n        _this.update();\n        \n      }\n    },\n    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var obj;\n      var _it_143;\n      \n      \n      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=12005151;//kernel.BaseActor:5151\n          case 1:\n            //$LASTPOS=12005173;//kernel.BaseActor:5173\n            if (typeof  d=="function") {\n              //$LASTPOS=12005212;//kernel.BaseActor:5212\n              _it_143=Tonyu.iterator(_this.allWithin(d,r),1);\n              while(_it_143.next()) {\n                obj=_it_143[0];\n                \n                //$LASTPOS=12005257;//kernel.BaseActor:5257\n                _this.print(r);\n                //$LASTPOS=12005284;//kernel.BaseActor:5284\n                f(obj);\n                \n              }\n              \n            } else {\n              //$LASTPOS=12005322;//kernel.BaseActor:5322\n              if (_this.within(d,r)) {\n                //$LASTPOS=12005352;//kernel.BaseActor:5352\n                f(d);\n                \n              }\n            }\n            //$LASTPOS=12005378;//kernel.BaseActor:5378\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12005442;//kernel.BaseActor:5442\n      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_5475(a,b) {\n        \n        //$LASTPOS=12005493;//kernel.BaseActor:5493\n        onHit.apply(_this,[a,b]);\n      }));\n    },\n    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.globals.$Scheduler;\n    },\n    die :function _trc_BaseActor_die() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12005647;//kernel.BaseActor:5647\n      _this.killThreadGroup();\n      //$LASTPOS=12005719;//kernel.BaseActor:5719\n      _this.hide();\n      //$LASTPOS=12005732;//kernel.BaseActor:5732\n      _this.fireEvent("die");\n      //$LASTPOS=12005755;//kernel.BaseActor:5755\n      _this._isDead=true;\n    },\n    hide :function _trc_BaseActor_hide() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12005934;//kernel.BaseActor:5934\n      if (_this.layer&&typeof  _this.layer.remove=="function") {\n        //$LASTPOS=12005989;//kernel.BaseActor:5989\n        _this.layer.remove(_this);\n        \n      } else {\n        //$LASTPOS=12006030;//kernel.BaseActor:6030\n        Tonyu.globals.$Sprites.remove(_this);\n        \n      }\n    },\n    show :function _trc_BaseActor_show(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12006091;//kernel.BaseActor:6091\n      if (_this.layer&&typeof  _this.layer.add=="function") {\n        //$LASTPOS=12006143;//kernel.BaseActor:6143\n        _this.layer.add(_this);\n        \n      } else {\n        //$LASTPOS=12006181;//kernel.BaseActor:6181\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      //$LASTPOS=12006213;//kernel.BaseActor:6213\n      if (x!=null) {\n        //$LASTPOS=12006226;//kernel.BaseActor:6226\n        _this.x=x;\n      }\n      //$LASTPOS=12006241;//kernel.BaseActor:6241\n      if (y!=null) {\n        //$LASTPOS=12006254;//kernel.BaseActor:6254\n        _this.y=y;\n      }\n      //$LASTPOS=12006269;//kernel.BaseActor:6269\n      if (p!=null) {\n        //$LASTPOS=12006282;//kernel.BaseActor:6282\n        _this.p=p;\n      }\n    },\n    detectShape :function _trc_BaseActor_detectShape() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12006327;//kernel.BaseActor:6327\n      if (typeof  _this.p!="number") {\n        //$LASTPOS=12006362;//kernel.BaseActor:6362\n        if (_this.text!=null) {\n          return _this;\n        }\n        //$LASTPOS=12006395;//kernel.BaseActor:6395\n        _this.p=0;\n        \n      }\n      //$LASTPOS=12006412;//kernel.BaseActor:6412\n      _this.p=Math.floor(_this.p);\n      //$LASTPOS=12006434;//kernel.BaseActor:6434\n      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];\n      //$LASTPOS=12006472;//kernel.BaseActor:6472\n      if (! _this.pImg) {\n        return _this;\n      }\n      //$LASTPOS=12006496;//kernel.BaseActor:6496\n      _this.width=_this.pImg.width;\n      //$LASTPOS=12006519;//kernel.BaseActor:6519\n      _this.height=_this.pImg.height;\n    },\n    waitFor :function _trc_BaseActor_waitFor(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12006562;//kernel.BaseActor:6562\n      if (null) {\n        //$LASTPOS=12006586;//kernel.BaseActor:6586\n        null.waitFor(f);\n        \n      }\n    },\n    fiber$waitFor :function _trc_BaseActor_f_waitFor(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12006562;//kernel.BaseActor:6562\n      if (_thread) {\n        //$LASTPOS=12006586;//kernel.BaseActor:6586\n        _thread.waitFor(f);\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    isDead :function _trc_BaseActor_isDead() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this._isDead;\n    },\n    animation :function _trc_BaseActor_animation() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12006706;//kernel.BaseActor:6706\n      _this.age++;\n      //$LASTPOS=12006718;//kernel.BaseActor:6718\n      if (_this.animMode&&_this.age%_this.animFps==0) {\n        //$LASTPOS=12006759;//kernel.BaseActor:6759\n        _this.p=_this.anim[_this.animFrame%_this.anim.length];\n        //$LASTPOS=12006799;//kernel.BaseActor:6799\n        _this.animFrame++;\n        \n      }\n    },\n    draw :function _trc_BaseActor_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var splitsText;\n      var textCount;\n      var rect;\n      \n      //$LASTPOS=12006848;//kernel.BaseActor:6848\n      if (_this.x==null||_this.y==null||_this._isInvisible) {\n        return _this;\n      }\n      //$LASTPOS=12006901;//kernel.BaseActor:6901\n      _this.detectShape();\n      //$LASTPOS=12006921;//kernel.BaseActor:6921\n      if (_this.pImg) {\n        //$LASTPOS=12006942;//kernel.BaseActor:6942\n        ctx.save();\n        //$LASTPOS=12006963;//kernel.BaseActor:6963\n        ctx.translate(_this.x,_this.y);\n        //$LASTPOS=12007107;//kernel.BaseActor:7107\n        _this.animation();\n        //$LASTPOS=12007129;//kernel.BaseActor:7129\n        if (_this.rotation!=0) {\n          //$LASTPOS=12007164;//kernel.BaseActor:7164\n          ctx.rotate(_this.rotation/180*Math.PI);\n          \n        } else {\n          //$LASTPOS=12007232;//kernel.BaseActor:7232\n          ctx.rotate(_this.rotate/180*Math.PI);\n          \n        }\n        //$LASTPOS=12007289;//kernel.BaseActor:7289\n        if (typeof  _this.scaleY==="undefined") {\n          //$LASTPOS=12007341;//kernel.BaseActor:7341\n          ctx.scale(_this.scaleX,_this.scaleX);\n          \n        } else {\n          //$LASTPOS=12007406;//kernel.BaseActor:7406\n          ctx.scale(_this.scaleX,_this.scaleY);\n          \n        }\n        //$LASTPOS=12007462;//kernel.BaseActor:7462\n        ctx.globalAlpha=_this.alpha/255;\n        //$LASTPOS=12007503;//kernel.BaseActor:7503\n        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);\n        //$LASTPOS=12007635;//kernel.BaseActor:7635\n        ctx.restore();\n        \n      } else {\n        //$LASTPOS=12007662;//kernel.BaseActor:7662\n        if (_this.text!==null&&_this.text!==undefined) {\n          //$LASTPOS=12007710;//kernel.BaseActor:7710\n          splitsText = (_this.text+"").split("\\n");\n          //$LASTPOS=12007757;//kernel.BaseActor:7757\n          _this.drawY=_this.y;\n          //$LASTPOS=12007775;//kernel.BaseActor:7775\n          if (! _this.size) {\n            //$LASTPOS=12007786;//kernel.BaseActor:7786\n            _this.size=15;\n          }\n          //$LASTPOS=12007804;//kernel.BaseActor:7804\n          if (! _this.align) {\n            //$LASTPOS=12007816;//kernel.BaseActor:7816\n            _this.align="center";\n          }\n          //$LASTPOS=12007841;//kernel.BaseActor:7841\n          if (! _this.fillStyle) {\n            //$LASTPOS=12007857;//kernel.BaseActor:7857\n            _this.fillStyle="white";\n          }\n          //$LASTPOS=12007885;//kernel.BaseActor:7885\n          ctx.fillStyle=_this.fillStyle;\n          //$LASTPOS=12007919;//kernel.BaseActor:7919\n          ctx.globalAlpha=_this.alpha/255;\n          //$LASTPOS=12007960;//kernel.BaseActor:7960\n          _this.height=0;\n          //$LASTPOS=12007969;//kernel.BaseActor:7969\n          _this.width=0;\n          //$LASTPOS=12007987;//kernel.BaseActor:7987\n          //$LASTPOS=12007991;//kernel.BaseActor:7991\n          textCount = 0;\n          while(textCount<splitsText.length) {\n            {\n              //$LASTPOS=12008062;//kernel.BaseActor:8062\n              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");\n              //$LASTPOS=12008158;//kernel.BaseActor:8158\n              if (_this.width<rect.w) {\n                //$LASTPOS=12008175;//kernel.BaseActor:8175\n                _this.width=rect.w;\n              }\n              //$LASTPOS=12008202;//kernel.BaseActor:8202\n              _this.height+=rect.h;\n              //$LASTPOS=12008231;//kernel.BaseActor:8231\n              _this.drawY+=_this.size;\n            }\n            textCount++;\n          }\n          \n        }\n      }\n      //$LASTPOS=12008267;//kernel.BaseActor:8267\n      if (_this._fukidashi) {\n        //$LASTPOS=12008294;//kernel.BaseActor:8294\n        if (_this._fukidashi.c>0) {\n          //$LASTPOS=12008329;//kernel.BaseActor:8329\n          _this._fukidashi.c--;\n          //$LASTPOS=12008358;//kernel.BaseActor:8358\n          ctx.fillStyle="white";\n          //$LASTPOS=12008394;//kernel.BaseActor:8394\n          ctx.strokeStyle="black";\n          //$LASTPOS=12008432;//kernel.BaseActor:8432\n          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);\n          \n        }\n        \n      }\n    },\n    asyncResult :function _trc_BaseActor_asyncResult() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.asyncResult();\n    },\n    runAsync :function _trc_BaseActor_runAsync(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12008635;//kernel.BaseActor:8635\n      if (! null) {\n        throw new Error("runAsync should run in wait mode");\n        \n      }\n      //$LASTPOS=12008707;//kernel.BaseActor:8707\n      null.runAsync(f);\n    },\n    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12008635;//kernel.BaseActor:8635\n      if (! _thread) {\n        throw new Error("runAsync should run in wait mode");\n        \n      }\n      //$LASTPOS=12008707;//kernel.BaseActor:8707\n      _thread.runAsync(f);\n      \n      _thread.retVal=_this;return;\n    },\n    screenOut :function _trc_BaseActor_screenOut(a) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var r;\n      var viewX;\n      var viewY;\n      \n      //$LASTPOS=12008789;//kernel.BaseActor:8789\n      if (! a) {\n        //$LASTPOS=12008797;//kernel.BaseActor:8797\n        a=0;\n      }\n      //$LASTPOS=12008807;//kernel.BaseActor:8807\n      r = 0;\n      //$LASTPOS=12008821;//kernel.BaseActor:8821\n      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;\n      //$LASTPOS=12008867;//kernel.BaseActor:8867\n      if (_this.x<viewX+a) {\n        //$LASTPOS=12008896;//kernel.BaseActor:8896\n        r+=viewX+a-_this.x;\n      }\n      //$LASTPOS=12008915;//kernel.BaseActor:8915\n      if (_this.y<viewY+a) {\n        //$LASTPOS=12008944;//kernel.BaseActor:8944\n        r+=viewY+a-_this.y;\n      }\n      //$LASTPOS=12008963;//kernel.BaseActor:8963\n      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {\n        //$LASTPOS=12008992;//kernel.BaseActor:8992\n        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);\n      }\n      //$LASTPOS=12009027;//kernel.BaseActor:9027\n      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {\n        //$LASTPOS=12009056;//kernel.BaseActor:9056\n        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);\n      }\n      return r;\n    },\n    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var r;\n      var viewX;\n      var viewY;\n      \n      //$LASTPOS=12008789;//kernel.BaseActor:8789\n      if (! a) {\n        //$LASTPOS=12008797;//kernel.BaseActor:8797\n        a=0;\n      }\n      //$LASTPOS=12008807;//kernel.BaseActor:8807\n      r = 0;\n      //$LASTPOS=12008821;//kernel.BaseActor:8821\n      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;\n      //$LASTPOS=12008867;//kernel.BaseActor:8867\n      if (_this.x<viewX+a) {\n        //$LASTPOS=12008896;//kernel.BaseActor:8896\n        r+=viewX+a-_this.x;\n      }\n      //$LASTPOS=12008915;//kernel.BaseActor:8915\n      if (_this.y<viewY+a) {\n        //$LASTPOS=12008944;//kernel.BaseActor:8944\n        r+=viewY+a-_this.y;\n      }\n      //$LASTPOS=12008963;//kernel.BaseActor:8963\n      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {\n        //$LASTPOS=12008992;//kernel.BaseActor:8992\n        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);\n      }\n      //$LASTPOS=12009027;//kernel.BaseActor:9027\n      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {\n        //$LASTPOS=12009056;//kernel.BaseActor:9056\n        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);\n      }\n      _thread.retVal=r;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12009186;//kernel.BaseActor:9186\n      while (true) {\n        //$LASTPOS=12009208;//kernel.BaseActor:9208\n        while (true) {\n          //$LASTPOS=12009234;//kernel.BaseActor:9234\n          if (_this.screenOut()>d) {\n            //$LASTPOS=12009270;//kernel.BaseActor:9270\n            f();\n            break;\n            \n            \n          }\n          //$LASTPOS=12009327;//kernel.BaseActor:9327\n          _this.update();\n          \n        }\n        //$LASTPOS=12009357;//kernel.BaseActor:9357\n        while (true) {\n          //$LASTPOS=12009383;//kernel.BaseActor:9383\n          if (_this.screenOut()<=d) {\n            break;\n            \n            \n          }\n          //$LASTPOS=12009455;//kernel.BaseActor:9455\n          _this.update();\n          \n        }\n        //$LASTPOS=12009485;//kernel.BaseActor:9485\n        _this.update();\n        \n      }\n    },\n    fiber$screenOutChecker :function _trc_BaseActor_f_screenOutChecker(_thread,d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_BaseActor_ent_screenOutChecker(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=12009186;//kernel.BaseActor:9186\n          case 1:\n            //$LASTPOS=12009208;//kernel.BaseActor:9208\n          case 2:\n            //$LASTPOS=12009234;//kernel.BaseActor:9234\n            if (!(_this.screenOut()>d)) { __pc=3; break; }\n            //$LASTPOS=12009270;//kernel.BaseActor:9270\n            f();\n            __pc=5; break;\n            \n          case 3:\n            \n            //$LASTPOS=12009327;//kernel.BaseActor:9327\n            _this.fiber$update(_thread);\n            __pc=4;return;\n          case 4:\n            \n            __pc=2;break;\n          case 5:\n            \n            //$LASTPOS=12009357;//kernel.BaseActor:9357\n          case 6:\n            //$LASTPOS=12009383;//kernel.BaseActor:9383\n            if (!(_this.screenOut()<=d)) { __pc=7; break; }\n            __pc=9; break;\n            \n          case 7:\n            \n            //$LASTPOS=12009455;//kernel.BaseActor:9455\n            _this.fiber$update(_thread);\n            __pc=8;return;\n          case 8:\n            \n            __pc=6;break;\n          case 9:\n            \n            //$LASTPOS=12009485;//kernel.BaseActor:9485\n            _this.fiber$update(_thread);\n            __pc=10;return;\n          case 10:\n            \n            __pc=1;break;\n          case 11:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    file :function _trc_BaseActor_file(path) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var d;\n      var files;\n      \n      //$LASTPOS=12009525;//kernel.BaseActor:9525\n      d = Tonyu.currentProject.getDir();\n      //$LASTPOS=12009567;//kernel.BaseActor:9567\n      files = d.rel("files/");\n      return FS.get(files.rel(path),{topDir: d});\n    },\n    fiber$file :function _trc_BaseActor_f_file(_thread,path) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var d;\n      var files;\n      \n      //$LASTPOS=12009525;//kernel.BaseActor:9525\n      d = Tonyu.currentProject.getDir();\n      //$LASTPOS=12009567;//kernel.BaseActor:9567\n      files = d.rel("files/");\n      _thread.retVal=FS.get(files.rel(path),{topDir: d});return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12009674;//kernel.BaseActor:9674\n      if (fl!==false) {\n        //$LASTPOS=12009701;//kernel.BaseActor:9701\n        if (! _this.origTG) {\n          \n          \n        }\n        //$LASTPOS=12009853;//kernel.BaseActor:9853\n        _this.a=_this.asyncResult();\n        //$LASTPOS=12009879;//kernel.BaseActor:9879\n        Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);\n        //$LASTPOS=12009933;//kernel.BaseActor:9933\n        _this.waitFor(_this.a);\n        \n      } else {\n        //$LASTPOS=12009968;//kernel.BaseActor:9968\n        if (_this.origTG) {\n          \n          \n        }\n        \n      }\n    },\n    fiber$waitInputDevice :function _trc_BaseActor_f_waitInputDevice(_thread,fl) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_BaseActor_ent_waitInputDevice(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=12009674;//kernel.BaseActor:9674\n            if (!(fl!==false)) { __pc=3; break; }\n            //$LASTPOS=12009701;//kernel.BaseActor:9701\n            if (!(! _this.origTG)) { __pc=1; break; }\n            {\n              //$LASTPOS=12009755;//kernel.BaseActor:9755\n              _this.origTG=_thread.group;\n              //$LASTPOS=12009794;//kernel.BaseActor:9794\n              _thread.setGroup(null);\n            }\n          case 1:\n            \n            //$LASTPOS=12009853;//kernel.BaseActor:9853\n            _this.a=_this.asyncResult();\n            //$LASTPOS=12009879;//kernel.BaseActor:9879\n            Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);\n            //$LASTPOS=12009933;//kernel.BaseActor:9933\n            _this.fiber$waitFor(_thread, _this.a);\n            __pc=2;return;\n          case 2:\n            \n            __pc=5;break;\n          case 3:\n            //$LASTPOS=12009968;//kernel.BaseActor:9968\n            if (!(_this.origTG)) { __pc=4; break; }\n            {\n              //$LASTPOS=12010021;//kernel.BaseActor:10021\n              _thread.setGroup(_this.origTG);\n              //$LASTPOS=12010064;//kernel.BaseActor:10064\n              _this.origTG=null;\n            }\n          case 4:\n            \n          case 5:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    redrawScreen :function _trc_BaseActor_redrawScreen() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12010137;//kernel.BaseActor:10137\n      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n      //$LASTPOS=12010173;//kernel.BaseActor:10173\n      Tonyu.globals.$Screen.draw();\n    },\n    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12010137;//kernel.BaseActor:10137\n      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n      //$LASTPOS=12010173;//kernel.BaseActor:10173\n      Tonyu.globals.$Screen.draw();\n      \n      _thread.retVal=_this;return;\n    },\n    color :function _trc_BaseActor_color(r,g,b) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return "rgb("+[r,g,b].join(",")+")";\n    },\n    fiber$color :function _trc_BaseActor_f_color(_thread,r,g,b) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    loadPage :function _trc_BaseActor_loadPage(page,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12010882;//kernel.BaseActor:10882\n      _this.all().die();\n      //$LASTPOS=12010900;//kernel.BaseActor:10900\n      new page(arg);\n      //$LASTPOS=12010920;//kernel.BaseActor:10920\n      _this.die();\n    },\n    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12010882;//kernel.BaseActor:10882\n      _this.all().die();\n      //$LASTPOS=12010900;//kernel.BaseActor:10900\n      new page(arg);\n      //$LASTPOS=12010920;//kernel.BaseActor:10920\n      _this.die();\n      \n      _thread.retVal=_this;return;\n    },\n    setVisible :function _trc_BaseActor_setVisible(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=12010955;//kernel.BaseActor:10955\n      _this._isInvisible=! v;\n    },\n    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=12010955;//kernel.BaseActor:10955\n      _this._isInvisible=! v;\n      \n      _thread.retVal=_this;return;\n    },\n    appear :function _trc_BaseActor_appear(o) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return o;\n    },\n    fiber$appear :function _trc_BaseActor_f_appear(_thread,o) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=o;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false},"appear":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.EventHandler\',\n  shortName: \'EventHandler\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [Tonyu.classes.kernel.EventHandlerCaller],\n  methods: {\n    main :function _trc_EventHandler_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=13000067;//kernel.EventHandler:67\n      if (Tonyu.runMode) {\n        //$LASTPOS=13000086;//kernel.EventHandler:86\n        _this.listeners=[];\n      }\n    },\n    fiber$main :function _trc_EventHandler_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=13000067;//kernel.EventHandler:67\n      if (Tonyu.runMode) {\n        //$LASTPOS=13000086;//kernel.EventHandler:86\n        _this.listeners=[];\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    addListener :function _trc_EventHandler_addListener(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=13000126;//kernel.EventHandler:126\n      if (_this.target&&(typeof  f)=="string") {\n        //$LASTPOS=13000173;//kernel.EventHandler:173\n        f=_this.target[f];\n        \n      }\n      //$LASTPOS=13000198;//kernel.EventHandler:198\n      if (typeof  f!="function") {\n        throw new Error("Not a event listener: "+_this.target+" / "+f);\n        \n      }\n      //$LASTPOS=13000287;//kernel.EventHandler:287\n      _this.listeners.push(f);\n      return {remove: (function anonymous_337() {\n        \n        //$LASTPOS=13000352;//kernel.EventHandler:352\n        _this.removeListener(f);\n      })};\n    },\n    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=13000126;//kernel.EventHandler:126\n      if (_this.target&&(typeof  f)=="string") {\n        //$LASTPOS=13000173;//kernel.EventHandler:173\n        f=_this.target[f];\n        \n      }\n      //$LASTPOS=13000198;//kernel.EventHandler:198\n      if (typeof  f!="function") {\n        throw new Error("Not a event listener: "+_this.target+" / "+f);\n        \n      }\n      //$LASTPOS=13000287;//kernel.EventHandler:287\n      _this.listeners.push(f);\n      \n      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            _thread.exit({remove: (function anonymous_337() {\n              \n              //$LASTPOS=13000352;//kernel.EventHandler:352\n              _this.removeListener(f);\n            })});return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    removeListener :function _trc_EventHandler_removeListener(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      \n      //$LASTPOS=13000420;//kernel.EventHandler:420\n      i = _this.listeners.indexOf(f);\n      //$LASTPOS=13000453;//kernel.EventHandler:453\n      _this.listeners.splice(i,1);\n    },\n    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      \n      //$LASTPOS=13000420;//kernel.EventHandler:420\n      i = _this.listeners.indexOf(f);\n      //$LASTPOS=13000453;//kernel.EventHandler:453\n      _this.listeners.splice(i,1);\n      \n      _thread.retVal=_this;return;\n    },\n    fire :function _trc_EventHandler_fire(args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var t;\n      var h;\n      var _it_159;\n      \n      //$LASTPOS=13000499;//kernel.EventHandler:499\n      if (_this.released) {\n        return _this;\n      }\n      //$LASTPOS=13000526;//kernel.EventHandler:526\n      t;\n      //$LASTPOS=13000538;//kernel.EventHandler:538\n      _it_159=Tonyu.iterator(_this.listeners,1);\n      while(_it_159.next()) {\n        h=_it_159[0];\n        \n        //$LASTPOS=13000782;//kernel.EventHandler:782\n        _this.callEventHandler(h,args);\n        \n      }\n    },\n    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var t;\n      var h;\n      var _it_159;\n      \n      //$LASTPOS=13000499;//kernel.EventHandler:499\n      if (_this.released) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=13000526;//kernel.EventHandler:526\n      t;\n      \n      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=13000538;//kernel.EventHandler:538\n            _it_159=Tonyu.iterator(_this.listeners,1);\n          case 1:\n            if (!(_it_159.next())) { __pc=3; break; }\n            h=_it_159[0];\n            \n            //$LASTPOS=13000782;//kernel.EventHandler:782\n            _this.fiber$callEventHandler(_thread, h, args);\n            __pc=2;return;\n          case 2:\n            \n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    release :function _trc_EventHandler_release() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=13000838;//kernel.EventHandler:838\n      _this.released=true;\n    },\n    fiber$release :function _trc_EventHandler_f_release(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=13000838;//kernel.EventHandler:838\n      _this.released=true;\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"removeListener":{"nowait":false},"fire":{"nowait":false},"release":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.ScreenOutHandler\',\n  shortName: \'ScreenOutHandler\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.EventHandler,\n  includes: [],\n  methods: {\n    main :function _trc_ScreenOutHandler_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_ScreenOutHandler_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    addListener :function _trc_ScreenOutHandler_addListener(d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var retThread;\n      \n      //$LASTPOS=14000049;//kernel.ScreenOutHandler:49\n      retThread = _this.target.parallel("screenOutChecker",d,f);\n      return {remove: (function anonymous_135() {\n        \n        //$LASTPOS=14000151;//kernel.ScreenOutHandler:151\n        retThread.kill();\n      })};\n    },\n    fiber$addListener :function _trc_ScreenOutHandler_f_addListener(_thread,d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var retThread;\n      \n      //$LASTPOS=14000049;//kernel.ScreenOutHandler:49\n      retThread = _this.target.parallel("screenOutChecker",d,f);\n      _thread.retVal={remove: (function anonymous_135() {\n        \n        //$LASTPOS=14000151;//kernel.ScreenOutHandler:151\n        retThread.kill();\n      })};return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_ScreenOutHandler_initialize(param) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=14000210;//kernel.ScreenOutHandler:210\n      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);\n      //$LASTPOS=14000228;//kernel.ScreenOutHandler:228\n      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.WithinHandler\',\n  shortName: \'WithinHandler\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.EventHandler,\n  includes: [],\n  methods: {\n    main :function _trc_WithinHandler_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_WithinHandler_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    addListener :function _trc_WithinHandler_addListener(d,r,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var retThread;\n      \n      //$LASTPOS=15000052;//kernel.WithinHandler:52\n      retThread = _this.target.parallel("withinChecker",d,r,f);\n      return {remove: (function anonymous_137() {\n        \n        //$LASTPOS=15000153;//kernel.WithinHandler:153\n        retThread.kill();\n      })};\n    },\n    fiber$addListener :function _trc_WithinHandler_f_addListener(_thread,d,r,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var retThread;\n      \n      //$LASTPOS=15000052;//kernel.WithinHandler:52\n      retThread = _this.target.parallel("withinChecker",d,r,f);\n      _thread.retVal={remove: (function anonymous_137() {\n        \n        //$LASTPOS=15000153;//kernel.WithinHandler:153\n        retThread.kill();\n      })};return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_WithinHandler_initialize(param) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=15000213;//kernel.WithinHandler:213\n      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);\n      //$LASTPOS=15000232;//kernel.WithinHandler:232\n      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.NoviceActor\',\n  shortName: \'NoviceActor\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.BaseActor,\n  includes: [],\n  methods: {\n    main :function _trc_NoviceActor_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_NoviceActor_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    sleep :function _trc_NoviceActor_sleep(n) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000050;//kernel.NoviceActor:50\n      if (! n) {\n        //$LASTPOS=16000057;//kernel.NoviceActor:57\n        n=1;\n      }\n      //$LASTPOS=16000066;//kernel.NoviceActor:66\n      //$LASTPOS=16000070;//kernel.NoviceActor:70\n      n;\n      while(n>0) {\n        //$LASTPOS=16000081;//kernel.NoviceActor:81\n        _this.update();\n        n--;\n      }\n    },\n    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=16000050;//kernel.NoviceActor:50\n      if (! n) {\n        //$LASTPOS=16000057;//kernel.NoviceActor:57\n        n=1;\n      }\n      \n      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=16000066;//kernel.NoviceActor:66\n            //$LASTPOS=16000070;//kernel.NoviceActor:70\n            n;;\n          case 1:\n            if (!(n>0)) { __pc=3; break; }\n            //$LASTPOS=16000081;//kernel.NoviceActor:81\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            n--;\n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initSprite :function _trc_NoviceActor_initSprite() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000113;//kernel.NoviceActor:113\n      if (! _this._sprite) {\n        //$LASTPOS=16000137;//kernel.NoviceActor:137\n        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});\n        //$LASTPOS=16000207;//kernel.NoviceActor:207\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n    },\n    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=16000113;//kernel.NoviceActor:113\n      if (! _this._sprite) {\n        //$LASTPOS=16000137;//kernel.NoviceActor:137\n        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});\n        //$LASTPOS=16000207;//kernel.NoviceActor:207\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    say :function _trc_NoviceActor_say(text,size) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000257;//kernel.NoviceActor:257\n      if (! size) {\n        //$LASTPOS=16000268;//kernel.NoviceActor:268\n        size=15;\n      }\n      //$LASTPOS=16000281;//kernel.NoviceActor:281\n      _this.initSprite();\n      //$LASTPOS=16000299;//kernel.NoviceActor:299\n      _this._sprite._fukidashi={text: text,size: size,c: 30};\n    },\n    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=16000257;//kernel.NoviceActor:257\n      if (! size) {\n        //$LASTPOS=16000268;//kernel.NoviceActor:268\n        size=15;\n      }\n      \n      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=16000281;//kernel.NoviceActor:281\n            _this.fiber$initSprite(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=16000299;//kernel.NoviceActor:299\n            _this._sprite._fukidashi={text: text,size: size,c: 30};\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    sprite :function _trc_NoviceActor_sprite(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000371;//kernel.NoviceActor:371\n      _this.go(x,y,p);\n    },\n    fiber$sprite :function _trc_NoviceActor_f_sprite(_thread,x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_NoviceActor_ent_sprite(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=16000371;//kernel.NoviceActor:371\n            _this.fiber$go(_thread, x, y, p);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    show :function _trc_NoviceActor_show(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000403;//kernel.NoviceActor:403\n      _this.go(x,y,p);\n    },\n    draw :function _trc_NoviceActor_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000440;//kernel.NoviceActor:440\n      _this._sprite.draw(ctx);\n    },\n    getCrashRect :function _trc_NoviceActor_getCrashRect() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this._sprite.getCrashRect();\n    },\n    go :function _trc_NoviceActor_go(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000533;//kernel.NoviceActor:533\n      _this.initSprite();\n      //$LASTPOS=16000551;//kernel.NoviceActor:551\n      _this._sprite.x=x;\n      //$LASTPOS=16000568;//kernel.NoviceActor:568\n      _this._sprite.y=y;\n      //$LASTPOS=16000585;//kernel.NoviceActor:585\n      if (p!=null) {\n        //$LASTPOS=16000598;//kernel.NoviceActor:598\n        _this._sprite.p=p;\n      }\n    },\n    fiber$go :function _trc_NoviceActor_f_go(_thread,x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_NoviceActor_ent_go(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=16000533;//kernel.NoviceActor:533\n            _this.fiber$initSprite(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=16000551;//kernel.NoviceActor:551\n            _this._sprite.x=x;\n            //$LASTPOS=16000568;//kernel.NoviceActor:568\n            _this._sprite.y=y;\n            //$LASTPOS=16000585;//kernel.NoviceActor:585\n            if (p!=null) {\n              //$LASTPOS=16000598;//kernel.NoviceActor:598\n              _this._sprite.p=p;\n            }\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    change :function _trc_NoviceActor_change(p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=16000646;//kernel.NoviceActor:646\n      _this.initSprite();\n      //$LASTPOS=16000664;//kernel.NoviceActor:664\n      _this._sprite.p=p;\n    },\n    fiber$change :function _trc_NoviceActor_f_change(_thread,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_NoviceActor_ent_change(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=16000646;//kernel.NoviceActor:646\n            _this.fiber$initSprite(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=16000664;//kernel.NoviceActor:664\n            _this._sprite.p=p;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.MML\',\n  shortName: \'MML\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [Tonyu.classes.kernel.MathMod],\n  methods: {\n    main :function _trc_MML_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=17000050;//kernel.MML:50\n      _this.mmlBuf=[];\n    },\n    fiber$main :function _trc_MML_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=17000050;//kernel.MML:50\n      _this.mmlBuf=[];\n      \n      _thread.retVal=_this;return;\n    },\n    play :function _trc_MML_play(mmls) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=17000081;//kernel.MML:81\n      _this.mmlBuf.push(mmls);\n      //$LASTPOS=17000105;//kernel.MML:105\n      if (! _this.isPlaying()) {\n        //$LASTPOS=17000134;//kernel.MML:134\n        _this.playNext();\n        \n      }\n    },\n    fiber$play :function _trc_MML_f_play(_thread,mmls) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=17000081;//kernel.MML:81\n      _this.mmlBuf.push(mmls);\n      \n      _thread.enter(function _trc_MML_ent_play(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=17000105;//kernel.MML:105\n            if (!(! _this.isPlaying())) { __pc=2; break; }\n            //$LASTPOS=17000134;//kernel.MML:134\n            _this.fiber$playNext(_thread);\n            __pc=1;return;\n          case 1:\n            \n          case 2:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    playNext :function _trc_MML_playNext() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var mml;\n      \n      //$LASTPOS=17000220;//kernel.MML:220\n      if (_this.cTimeBase==null) {\n        //$LASTPOS=17000241;//kernel.MML:241\n        _this.cTimeBase=0;\n      }\n      //$LASTPOS=17000259;//kernel.MML:259\n      if (_this.m) {\n        //$LASTPOS=17000277;//kernel.MML:277\n        _this.cTimeBase+=_this.m.currentTime;\n        \n      }\n      //$LASTPOS=17000348;//kernel.MML:348\n      mml = _this.mmlBuf.shift();\n      //$LASTPOS=17000377;//kernel.MML:377\n      if (! mml) {\n        //$LASTPOS=17000398;//kernel.MML:398\n        _this.m=null;\n        //$LASTPOS=17000415;//kernel.MML:415\n        _this.cTimeBase=0;\n        return _this;\n        \n      }\n      //$LASTPOS=17000457;//kernel.MML:457\n      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();\n      //$LASTPOS=17000495;//kernel.MML:495\n      _this.m=T("mml",{mml: mml},_this.mwav);\n      //$LASTPOS=17000525;//kernel.MML:525\n      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));\n      //$LASTPOS=17000555;//kernel.MML:555\n      _this.m.start();\n      //$LASTPOS=17000571;//kernel.MML:571\n      Tonyu.globals.$MMLS[_this.id()]=_this;\n    },\n    fiber$playNext :function _trc_MML_f_playNext(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var mml;\n      \n      //$LASTPOS=17000220;//kernel.MML:220\n      if (_this.cTimeBase==null) {\n        //$LASTPOS=17000241;//kernel.MML:241\n        _this.cTimeBase=0;\n      }\n      //$LASTPOS=17000259;//kernel.MML:259\n      if (_this.m) {\n        //$LASTPOS=17000277;//kernel.MML:277\n        _this.cTimeBase+=_this.m.currentTime;\n        \n      }\n      //$LASTPOS=17000348;//kernel.MML:348\n      mml = _this.mmlBuf.shift();\n      //$LASTPOS=17000377;//kernel.MML:377\n      if (! mml) {\n        //$LASTPOS=17000398;//kernel.MML:398\n        _this.m=null;\n        //$LASTPOS=17000415;//kernel.MML:415\n        _this.cTimeBase=0;\n        _thread.retVal=_this;return;\n        \n        \n      }\n      //$LASTPOS=17000457;//kernel.MML:457\n      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();\n      //$LASTPOS=17000495;//kernel.MML:495\n      _this.m=T("mml",{mml: mml},_this.mwav);\n      //$LASTPOS=17000525;//kernel.MML:525\n      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));\n      //$LASTPOS=17000555;//kernel.MML:555\n      _this.m.start();\n      //$LASTPOS=17000571;//kernel.MML:571\n      Tonyu.globals.$MMLS[_this.id()]=_this;\n      \n      _thread.retVal=_this;return;\n    },\n    id :function _trc_MML_id() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=17000606;//kernel.MML:606\n      if (! _this._id) {\n        //$LASTPOS=17000616;//kernel.MML:616\n        _this._id=_this.rnd()+"";\n      }\n      return _this._id;\n    },\n    fiber$id :function _trc_MML_f_id(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=17000606;//kernel.MML:606\n      if (! _this._id) {\n        //$LASTPOS=17000616;//kernel.MML:616\n        _this._id=_this.rnd()+"";\n      }\n      _thread.retVal=_this._id;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    bufferCount :function _trc_MML_bufferCount() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.mmlBuf.length;\n    },\n    fiber$bufferCount :function _trc_MML_f_bufferCount(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.mmlBuf.length;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    isPlaying :function _trc_MML_isPlaying() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.m;\n    },\n    fiber$isPlaying :function _trc_MML_f_isPlaying(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.m;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    currentTime :function _trc_MML_currentTime() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=17000755;//kernel.MML:755\n      if (_this.m) {\n        return _this.m.currentTime+_this.cTimeBase;\n      }\n      return - 1;\n    },\n    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=17000755;//kernel.MML:755\n      if (_this.m) {\n        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;\n        \n      }\n      _thread.retVal=- 1;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stop :function _trc_MML_stop() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=17000829;//kernel.MML:829\n      if (_this.m) {\n        //$LASTPOS=17000847;//kernel.MML:847\n        if (_this.mwav) {\n          //$LASTPOS=17000872;//kernel.MML:872\n          _this.mwav.pause();\n          //$LASTPOS=17000899;//kernel.MML:899\n          _this.mwav.stop();\n          \n        }\n        //$LASTPOS=17000932;//kernel.MML:932\n        _this.m.pause();\n        //$LASTPOS=17000952;//kernel.MML:952\n        _this.m.stop();\n        //$LASTPOS=17000971;//kernel.MML:971\n        _this.m=null;\n        //$LASTPOS=17000988;//kernel.MML:988\n        _this.mmlBuf=[];\n        //$LASTPOS=17001056;//kernel.MML:1056\n        delete Tonyu.globals.$MMLS[_this.id()];\n        \n      }\n    },\n    fiber$stop :function _trc_MML_f_stop(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=17000829;//kernel.MML:829\n      if (_this.m) {\n        //$LASTPOS=17000847;//kernel.MML:847\n        if (_this.mwav) {\n          //$LASTPOS=17000872;//kernel.MML:872\n          _this.mwav.pause();\n          //$LASTPOS=17000899;//kernel.MML:899\n          _this.mwav.stop();\n          \n        }\n        //$LASTPOS=17000932;//kernel.MML:932\n        _this.m.pause();\n        //$LASTPOS=17000952;//kernel.MML:952\n        _this.m.stop();\n        //$LASTPOS=17000971;//kernel.MML:971\n        _this.m=null;\n        //$LASTPOS=17000988;//kernel.MML:988\n        _this.mmlBuf=[];\n        //$LASTPOS=17001056;//kernel.MML:1056\n        delete Tonyu.globals.$MMLS[_this.id()];\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.PlayMod\',\n  shortName: \'PlayMod\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.BaseActor,\n  includes: [],\n  methods: {\n    main :function _trc_PlayMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_PlayMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initMML :function _trc_PlayMod_initMML() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=18000045;//kernel.PlayMod:45\n      if (_this.mmlInited) {\n        return _this;\n      }\n      //$LASTPOS=18000073;//kernel.PlayMod:73\n      _this.mmlInited=true;\n      //$LASTPOS=18000094;//kernel.PlayMod:94\n      Tonyu.globals.$currentProject.requestPlugin("timbre");\n      //$LASTPOS=18000140;//kernel.PlayMod:140\n      if (! Tonyu.globals.$MMLS) {\n        //$LASTPOS=18000162;//kernel.PlayMod:162\n        Tonyu.globals.$MMLS={};\n        //$LASTPOS=18000180;//kernel.PlayMod:180\n        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;\n        //$LASTPOS=18000214;//kernel.PlayMod:214\n        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));\n        \n      }\n      //$LASTPOS=18000256;//kernel.PlayMod:256\n      _this.on("die",(function anonymous_266() {\n        \n        //$LASTPOS=18000272;//kernel.PlayMod:272\n        _this.play().stop();\n      }));\n    },\n    releaseMML :function _trc_PlayMod_releaseMML() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var k;\n      var v;\n      var _it_166;\n      \n      //$LASTPOS=18000322;//kernel.PlayMod:322\n      if (Tonyu.globals.$MMLS) {\n        //$LASTPOS=18000343;//kernel.PlayMod:343\n        _it_166=Tonyu.iterator(Tonyu.globals.$MMLS,2);\n        while(_it_166.next()) {\n          k=_it_166[0];\n          v=_it_166[1];\n          \n          //$LASTPOS=18000379;//kernel.PlayMod:379\n          v.stop();\n          \n        }\n        //$LASTPOS=18000407;//kernel.PlayMod:407\n        Tonyu.globals.$MMLS=null;\n        \n      }\n      //$LASTPOS=18000432;//kernel.PlayMod:432\n      if (Tonyu.globals.$WaveTable) {\n        //$LASTPOS=18000458;//kernel.PlayMod:458\n        Tonyu.globals.$WaveTable.stop();\n        //$LASTPOS=18000485;//kernel.PlayMod:485\n        Tonyu.globals.$WaveTable=null;\n        \n      }\n    },\n    play :function _trc_PlayMod_play() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var mmls;\n      var i;\n      \n      //$LASTPOS=18000528;//kernel.PlayMod:528\n      _this.initMML();\n      //$LASTPOS=18000544;//kernel.PlayMod:544\n      if (! _this._mml) {\n        //$LASTPOS=18000555;//kernel.PlayMod:555\n        _this._mml=new Tonyu.classes.kernel.MML;\n      }\n      //$LASTPOS=18000574;//kernel.PlayMod:574\n      if (_this.isDead()||arguments.length==0) {\n        return _this._mml;\n      }\n      //$LASTPOS=18000629;//kernel.PlayMod:629\n      mmls = [];\n      //$LASTPOS=18000647;//kernel.PlayMod:647\n      //$LASTPOS=18000652;//kernel.PlayMod:652\n      i = 0;\n      while(i<arguments.length) {\n        {\n          //$LASTPOS=18000697;//kernel.PlayMod:697\n          mmls.push(arguments[i]);\n        }\n        i++;\n      }\n      //$LASTPOS=18000734;//kernel.PlayMod:734\n      _this._mml.play(mmls);\n      //$LASTPOS=18000756;//kernel.PlayMod:756\n      while (_this._mml.bufferCount()>2) {\n        //$LASTPOS=18000796;//kernel.PlayMod:796\n        _this.update();\n        \n      }\n      return _this._mml;\n    },\n    fiber$play :function _trc_PlayMod_f_play(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var mmls;\n      var i;\n      \n      //$LASTPOS=18000528;//kernel.PlayMod:528\n      _this.initMML();\n      //$LASTPOS=18000544;//kernel.PlayMod:544\n      if (! _this._mml) {\n        //$LASTPOS=18000555;//kernel.PlayMod:555\n        _this._mml=new Tonyu.classes.kernel.MML;\n      }\n      //$LASTPOS=18000574;//kernel.PlayMod:574\n      if (_this.isDead()||_arguments.length==0) {\n        _thread.retVal=_this._mml;return;\n        \n      }\n      //$LASTPOS=18000629;//kernel.PlayMod:629\n      mmls = [];\n      //$LASTPOS=18000647;//kernel.PlayMod:647\n      //$LASTPOS=18000652;//kernel.PlayMod:652\n      i = 0;\n      while(i<_arguments.length) {\n        {\n          //$LASTPOS=18000697;//kernel.PlayMod:697\n          mmls.push(_arguments[i]);\n        }\n        i++;\n      }\n      //$LASTPOS=18000734;//kernel.PlayMod:734\n      _this._mml.play(mmls);\n      \n      _thread.enter(function _trc_PlayMod_ent_play(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=18000756;//kernel.PlayMod:756\n          case 1:\n            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }\n            //$LASTPOS=18000796;//kernel.PlayMod:796\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this._mml);return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    playSE :function _trc_PlayMod_playSE() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var mml;\n      var mmls;\n      var i;\n      \n      //$LASTPOS=18000859;//kernel.PlayMod:859\n      _this.initMML();\n      //$LASTPOS=18000875;//kernel.PlayMod:875\n      mml = new Tonyu.classes.kernel.MML;\n      //$LASTPOS=18000897;//kernel.PlayMod:897\n      mmls = [];\n      //$LASTPOS=18000915;//kernel.PlayMod:915\n      //$LASTPOS=18000920;//kernel.PlayMod:920\n      i = 0;\n      while(i<arguments.length) {\n        {\n          //$LASTPOS=18000965;//kernel.PlayMod:965\n          mmls.push(arguments[i]);\n        }\n        i++;\n      }\n      //$LASTPOS=18001002;//kernel.PlayMod:1002\n      mml.play(mmls);\n      return mml;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.WaveTable\',\n  shortName: \'WaveTable\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [],\n  methods: {\n    main :function _trc_WaveTable_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=19000028;//kernel.WaveTable:28\n      _this.wav={};\n      //$LASTPOS=19000036;//kernel.WaveTable:36\n      _this.env={};\n      //$LASTPOS=19000313;//kernel.WaveTable:313\n      if (typeof  T!=="undefined") {\n        //$LASTPOS=19000392;//kernel.WaveTable:392\n        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});\n        //$LASTPOS=19000460;//kernel.WaveTable:460\n        _this.setEnv(0,_this.env);\n        //$LASTPOS=19000480;//kernel.WaveTable:480\n        _this.setWav(0,T("pulse"));\n        \n      }\n    },\n    fiber$main :function _trc_WaveTable_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=19000028;//kernel.WaveTable:28\n      _this.wav={};\n      //$LASTPOS=19000036;//kernel.WaveTable:36\n      _this.env={};\n      \n      _thread.enter(function _trc_WaveTable_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=19000313;//kernel.WaveTable:313\n            if (!(typeof  T!=="undefined")) { __pc=3; break; }\n            //$LASTPOS=19000392;//kernel.WaveTable:392\n            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});\n            //$LASTPOS=19000460;//kernel.WaveTable:460\n            _this.fiber$setEnv(_thread, 0, _this.env);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=19000480;//kernel.WaveTable:480\n            _this.fiber$setWav(_thread, 0, T("pulse"));\n            __pc=2;return;\n          case 2:\n            \n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    setWav :function _trc_WaveTable_setWav(num,synth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=19000070;//kernel.WaveTable:70\n      _this.wav[num]=synth;\n    },\n    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=19000070;//kernel.WaveTable:70\n      _this.wav[num]=synth;\n      \n      _thread.retVal=_this;return;\n    },\n    setEnv :function _trc_WaveTable_setEnv(num,synth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=19000114;//kernel.WaveTable:114\n      _this.env[num]=synth;\n    },\n    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=19000114;//kernel.WaveTable:114\n      _this.env[num]=synth;\n      \n      _thread.retVal=_this;return;\n    },\n    get :function _trc_WaveTable_get(w,e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var synth;\n      \n      //$LASTPOS=19000148;//kernel.WaveTable:148\n      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});\n      return synth;\n    },\n    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var synth;\n      \n      //$LASTPOS=19000148;//kernel.WaveTable:148\n      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});\n      _thread.retVal=synth;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stop :function _trc_WaveTable_stop() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$stop :function _trc_WaveTable_f_stop(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.ParallelMod\',\n  shortName: \'ParallelMod\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.BaseActor,\n  includes: [],\n  methods: {\n    main :function _trc_ParallelMod_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_ParallelMod_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    parallel :function _trc_ParallelMod_parallel() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var args;\n      var i;\n      var name;\n      var th;\n      \n      //$LASTPOS=20000064;//kernel.ParallelMod:64\n      args = [];\n      //$LASTPOS=20000083;//kernel.ParallelMod:83\n      //$LASTPOS=20000088;//kernel.ParallelMod:88\n      i = 1;\n      while(i<arguments.length) {\n        {\n          //$LASTPOS=20000134;//kernel.ParallelMod:134\n          args.push(arguments[i]);\n        }\n        i++;\n      }\n      //$LASTPOS=20000173;//kernel.ParallelMod:173\n      name = arguments[0];\n      //$LASTPOS=20000202;//kernel.ParallelMod:202\n      th;\n      //$LASTPOS=20000216;//kernel.ParallelMod:216\n      th=Tonyu.globals.$Boot.schedule(_this,name,args);\n      return th;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Scheduler\',\n  shortName: \'Scheduler\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.TObject,\n  includes: [],\n  methods: {\n    main :function _trc_Scheduler_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=21000050;//kernel.Scheduler:50\n      _this.cur=[];\n      //$LASTPOS=21000059;//kernel.Scheduler:59\n      _this.next=[];\n    },\n    fiber$main :function _trc_Scheduler_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=21000050;//kernel.Scheduler:50\n      _this.cur=[];\n      //$LASTPOS=21000059;//kernel.Scheduler:59\n      _this.next=[];\n      \n      _thread.retVal=_this;return;\n    },\n    addObj :function _trc_Scheduler_addObj(obj,name,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.newThread(obj,name,args);\n    },\n    fiber$addObj :function _trc_Scheduler_f_addObj(_thread,obj,name,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.newThread(obj,name,args);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    newThread :function _trc_Scheduler_newThread(obj,name,args,options) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var th;\n      \n      //$LASTPOS=21000214;//kernel.Scheduler:214\n      name=name||"main";\n      //$LASTPOS=21000238;//kernel.Scheduler:238\n      args=args||[];\n      //$LASTPOS=21000258;//kernel.Scheduler:258\n      th = Tonyu.thread();\n      //$LASTPOS=21000286;//kernel.Scheduler:286\n      th.apply(obj,name,args);\n      //$LASTPOS=21000316;//kernel.Scheduler:316\n      _this.addToCur(th);\n      return th;\n    },\n    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var th;\n      \n      //$LASTPOS=21000214;//kernel.Scheduler:214\n      name=name||"main";\n      //$LASTPOS=21000238;//kernel.Scheduler:238\n      args=args||[];\n      //$LASTPOS=21000258;//kernel.Scheduler:258\n      th = Tonyu.thread();\n      //$LASTPOS=21000286;//kernel.Scheduler:286\n      th.apply(obj,name,args);\n      \n      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=21000316;//kernel.Scheduler:316\n            _this.fiber$addToCur(_thread, th);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(th);return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    addToCur :function _trc_Scheduler_addToCur(th) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=21000371;//kernel.Scheduler:371\n      _this.cur.push(th);\n      //$LASTPOS=21000390;//kernel.Scheduler:390\n      th.scheduled=_this;\n    },\n    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=21000371;//kernel.Scheduler:371\n      _this.cur.push(th);\n      //$LASTPOS=21000390;//kernel.Scheduler:390\n      th.scheduled=_this;\n      \n      _thread.retVal=_this;return;\n    },\n    addToNext :function _trc_Scheduler_addToNext(th) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=21000435;//kernel.Scheduler:435\n      _this.next.push(th);\n      //$LASTPOS=21000455;//kernel.Scheduler:455\n      th.scheduled=_this;\n    },\n    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=21000435;//kernel.Scheduler:435\n      _this.next.push(th);\n      //$LASTPOS=21000455;//kernel.Scheduler:455\n      th.scheduled=_this;\n      \n      _thread.retVal=_this;return;\n    },\n    stepsAll :function _trc_Scheduler_stepsAll() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var t;\n      var _it_181;\n      \n      //$LASTPOS=21000497;//kernel.Scheduler:497\n      _it_181=Tonyu.iterator(_this.cur,1);\n      while(_it_181.next()) {\n        t=_it_181[0];\n        \n        //$LASTPOS=21000524;//kernel.Scheduler:524\n        delete t.scheduled;\n        //$LASTPOS=21000553;//kernel.Scheduler:553\n        t.steps();\n        //$LASTPOS=21000573;//kernel.Scheduler:573\n        if (t.preempted) {\n          //$LASTPOS=21000650;//kernel.Scheduler:650\n          _this.addToNext(t);\n          \n        }\n        \n      }\n      //$LASTPOS=21000687;//kernel.Scheduler:687\n      _this.cur=_this.next;\n      //$LASTPOS=21000702;//kernel.Scheduler:702\n      _this.next=[];\n    },\n    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var t;\n      var _it_181;\n      \n      \n      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=21000497;//kernel.Scheduler:497\n            _it_181=Tonyu.iterator(_this.cur,1);\n          case 1:\n            if (!(_it_181.next())) { __pc=4; break; }\n            t=_it_181[0];\n            \n            //$LASTPOS=21000524;//kernel.Scheduler:524\n            delete t.scheduled;\n            //$LASTPOS=21000553;//kernel.Scheduler:553\n            t.steps();\n            //$LASTPOS=21000573;//kernel.Scheduler:573\n            if (!(t.preempted)) { __pc=3; break; }\n            //$LASTPOS=21000650;//kernel.Scheduler:650\n            _this.fiber$addToNext(_thread, t);\n            __pc=2;return;\n          case 2:\n            \n          case 3:\n            \n            __pc=1;break;\n          case 4:\n            \n            //$LASTPOS=21000687;//kernel.Scheduler:687\n            _this.cur=_this.next;\n            //$LASTPOS=21000702;//kernel.Scheduler:702\n            _this.next=[];\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"stepsAll":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Actor\',\n  shortName: \'Actor\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.BaseActor,\n  includes: [Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],\n  methods: {\n    main :function _trc_Actor_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_Actor_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_Actor_initialize(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=22000105;//kernel.Actor:105\n      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);\n      //$LASTPOS=22000147;//kernel.Actor:147\n      _this.initSprite();\n    },\n    initSprite :function _trc_Actor_initSprite() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=22000186;//kernel.Actor:186\n      if (_this.layer&&typeof  _this.layer.add=="function") {\n        //$LASTPOS=22000238;//kernel.Actor:238\n        _this.layer.add(_this);\n        \n      } else {\n        //$LASTPOS=22000276;//kernel.Actor:276\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      //$LASTPOS=22000308;//kernel.Actor:308\n      _this.onAppear();\n    },\n    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=22000186;//kernel.Actor:186\n      if (_this.layer&&typeof  _this.layer.add=="function") {\n        //$LASTPOS=22000238;//kernel.Actor:238\n        _this.layer.add(_this);\n        \n      } else {\n        //$LASTPOS=22000276;//kernel.Actor:276\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      \n      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=22000308;//kernel.Actor:308\n            _this.fiber$onAppear(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    onAppear :function _trc_Actor_onAppear() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$onAppear :function _trc_Actor_f_onAppear(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.CrashToHandler\',\n  shortName: \'CrashToHandler\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.EventHandler,\n  includes: [],\n  methods: {\n    main :function _trc_CrashToHandler_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_CrashToHandler_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    addListener :function _trc_CrashToHandler_addListener(d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var retThread;\n      \n      //$LASTPOS=23000049;//kernel.CrashToHandler:49\n      retThread = _this.target.parallel("crashToChecker",d,f);\n      return {remove: (function anonymous_133() {\n        \n        //$LASTPOS=23000149;//kernel.CrashToHandler:149\n        retThread.kill();\n      })};\n    },\n    fiber$addListener :function _trc_CrashToHandler_f_addListener(_thread,d,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var retThread;\n      \n      //$LASTPOS=23000049;//kernel.CrashToHandler:49\n      retThread = _this.target.parallel("crashToChecker",d,f);\n      _thread.retVal={remove: (function anonymous_133() {\n        \n        //$LASTPOS=23000149;//kernel.CrashToHandler:149\n        retThread.kill();\n      })};return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_CrashToHandler_initialize(param) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=23000209;//kernel.CrashToHandler:209\n      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);\n      //$LASTPOS=23000228;//kernel.CrashToHandler:228\n      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.GameScreen\',\n  shortName: \'GameScreen\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_GameScreen_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_GameScreen_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_GameScreen_initialize(opt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=24000113;//kernel.GameScreen:113\n      _this.extend(opt);\n      //$LASTPOS=24000131;//kernel.GameScreen:131\n      _this.resize(_this.width,_this.height);\n      //$LASTPOS=24000159;//kernel.GameScreen:159\n      _this.bgColor="rgb(20,80,180)";\n      //$LASTPOS=24000195;//kernel.GameScreen:195\n      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;\n    },\n    resize :function _trc_GameScreen_resize(width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=24000260;//kernel.GameScreen:260\n      _this.width=width;\n      //$LASTPOS=24000283;//kernel.GameScreen:283\n      _this.height=height;\n      //$LASTPOS=24000308;//kernel.GameScreen:308\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n      //$LASTPOS=24000351;//kernel.GameScreen:351\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=24000387;//kernel.GameScreen:387\n      _this.fireEvent("resize",width,height);\n    },\n    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=24000260;//kernel.GameScreen:260\n      _this.width=width;\n      //$LASTPOS=24000283;//kernel.GameScreen:283\n      _this.height=height;\n      //$LASTPOS=24000308;//kernel.GameScreen:308\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n      //$LASTPOS=24000351;//kernel.GameScreen:351\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=24000387;//kernel.GameScreen:387\n      _this.fireEvent("resize",width,height);\n      \n      _thread.retVal=_this;return;\n    },\n    setBounds :function _trc_GameScreen_setBounds(b) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=24000622;//kernel.GameScreen:622\n      _this.bounds=b;\n    },\n    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=24000622;//kernel.GameScreen:622\n      _this.bounds=b;\n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_GameScreen_draw(cctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b;\n      \n      //$LASTPOS=24000655;//kernel.GameScreen:655\n      b = _this.bounds;\n      //$LASTPOS=24000674;//kernel.GameScreen:674\n      _this.fillCanvas();\n      //$LASTPOS=24000693;//kernel.GameScreen:693\n      _this.sprites.draw(_this.buf[0]);\n      //$LASTPOS=24000720;//kernel.GameScreen:720\n      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);\n    },\n    canvas2buf :function _trc_GameScreen_canvas2buf(point) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b;\n      \n      //$LASTPOS=24000859;//kernel.GameScreen:859\n      b = _this.bounds;\n      //$LASTPOS=24000878;//kernel.GameScreen:878\n      if (! b) {\n        return point;\n      }\n      return {x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};\n    },\n    fiber$canvas2buf :function _trc_GameScreen_f_canvas2buf(_thread,point) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b;\n      \n      //$LASTPOS=24000859;//kernel.GameScreen:859\n      b = _this.bounds;\n      //$LASTPOS=24000878;//kernel.GameScreen:878\n      if (! b) {\n        _thread.retVal=point;return;\n        \n      }\n      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGColor :function _trc_GameScreen_setBGColor(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=24001016;//kernel.GameScreen:1016\n      _this.bgColor=c;\n    },\n    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=24001016;//kernel.GameScreen:1016\n      _this.bgColor=c;\n      \n      _thread.retVal=_this;return;\n    },\n    fillCanvas :function _trc_GameScreen_fillCanvas() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ctx;\n      \n      //$LASTPOS=24001056;//kernel.GameScreen:1056\n      ctx = _this.buf[0].getContext("2d");\n      //$LASTPOS=24001094;//kernel.GameScreen:1094\n      ctx.save();\n      //$LASTPOS=24001111;//kernel.GameScreen:1111\n      ctx.fillStyle=_this.bgColor;\n      //$LASTPOS=24001139;//kernel.GameScreen:1139\n      ctx.fillRect(0,0,_this.width,_this.height);\n      //$LASTPOS=24001213;//kernel.GameScreen:1213\n      ctx.restore();\n    },\n    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var ctx;\n      \n      //$LASTPOS=24001056;//kernel.GameScreen:1056\n      ctx = _this.buf[0].getContext("2d");\n      //$LASTPOS=24001094;//kernel.GameScreen:1094\n      ctx.save();\n      //$LASTPOS=24001111;//kernel.GameScreen:1111\n      ctx.fillStyle=_this.bgColor;\n      //$LASTPOS=24001139;//kernel.GameScreen:1139\n      ctx.fillRect(0,0,_this.width,_this.height);\n      //$LASTPOS=24001213;//kernel.GameScreen:1213\n      ctx.restore();\n      \n      _thread.retVal=_this;return;\n    },\n    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=24001265;//kernel.GameScreen:1265\n      _this.sprites.scrollTo(scrollX,scrollY);\n    },\n    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=24001265;//kernel.GameScreen:1265\n      _this.sprites.scrollTo(scrollX,scrollY);\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"setBounds":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Map\',\n  shortName: \'Map\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_Map_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_Map_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_Map_initialize(param) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var j;\n      var i;\n      \n      //$LASTPOS=25000060;//kernel.Map:60\n      _this.sx=0;\n      //$LASTPOS=25000071;//kernel.Map:71\n      _this.sy=0;\n      //$LASTPOS=25000082;//kernel.Map:82\n      Tonyu.classes.kernel.Actor.apply( _this, [param]);\n      //$LASTPOS=25000101;//kernel.Map:101\n      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n      //$LASTPOS=25000173;//kernel.Map:173\n      _this.mapObj=true;\n      //$LASTPOS=25000191;//kernel.Map:191\n      _this.mapTable=[];\n      //$LASTPOS=25000211;//kernel.Map:211\n      _this.mapOnTable=[];\n      //$LASTPOS=25000233;//kernel.Map:233\n      //$LASTPOS=25000237;//kernel.Map:237\n      j = 0;\n      while(j<_this.row) {\n        {\n          //$LASTPOS=25000266;//kernel.Map:266\n          _this.rows=[];\n          //$LASTPOS=25000286;//kernel.Map:286\n          //$LASTPOS=25000290;//kernel.Map:290\n          i = 0;\n          while(i<_this.col) {\n            {\n              //$LASTPOS=25000323;//kernel.Map:323\n              _this.rows.push(- 1);\n            }\n            i++;\n          }\n          //$LASTPOS=25000358;//kernel.Map:358\n          _this.mapTable.push(_this.rows);\n        }\n        j++;\n      }\n      //$LASTPOS=25000391;//kernel.Map:391\n      //$LASTPOS=25000395;//kernel.Map:395\n      j = 0;\n      while(j<_this.row) {\n        {\n          //$LASTPOS=25000424;//kernel.Map:424\n          _this.rows=[];\n          //$LASTPOS=25000444;//kernel.Map:444\n          //$LASTPOS=25000448;//kernel.Map:448\n          i = 0;\n          while(i<_this.col) {\n            {\n              //$LASTPOS=25000481;//kernel.Map:481\n              _this.rows.push(- 1);\n            }\n            i++;\n          }\n          //$LASTPOS=25000516;//kernel.Map:516\n          _this.mapOnTable.push(_this.rows);\n        }\n        j++;\n      }\n      //$LASTPOS=25000616;//kernel.Map:616\n      _this.initMap();\n    },\n    initMap :function _trc_Map_initMap() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var j;\n      \n      //$LASTPOS=25000648;//kernel.Map:648\n      if (! _this.mapData) {\n        return _this;\n      }\n      //$LASTPOS=25000674;//kernel.Map:674\n      //$LASTPOS=25000678;//kernel.Map:678\n      i = 0;\n      while(i<_this.row) {\n        {\n          //$LASTPOS=25000707;//kernel.Map:707\n          //$LASTPOS=25000711;//kernel.Map:711\n          j = 0;\n          while(j<_this.col) {\n            {\n              //$LASTPOS=25000744;//kernel.Map:744\n              _this.set(j,i,_this.mapData[i][j]);\n            }\n            j++;\n          }\n        }\n        i++;\n      }\n      //$LASTPOS=25000791;//kernel.Map:791\n      if (! _this.mapOnData) {\n        return _this;\n      }\n      //$LASTPOS=25000819;//kernel.Map:819\n      //$LASTPOS=25000823;//kernel.Map:823\n      i = 0;\n      while(i<_this.row) {\n        {\n          //$LASTPOS=25000852;//kernel.Map:852\n          //$LASTPOS=25000856;//kernel.Map:856\n          j = 0;\n          while(j<_this.col) {\n            {\n              //$LASTPOS=25000889;//kernel.Map:889\n              _this.setOn(j,i,_this.mapOnData[i][j]);\n            }\n            j++;\n          }\n        }\n        i++;\n      }\n    },\n    fiber$initMap :function _trc_Map_f_initMap(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var j;\n      \n      //$LASTPOS=25000648;//kernel.Map:648\n      if (! _this.mapData) {\n        _thread.retVal=_this;return;\n        \n      }\n      \n      _thread.enter(function _trc_Map_ent_initMap(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=25000674;//kernel.Map:674\n            //$LASTPOS=25000678;//kernel.Map:678\n            i = 0;;\n          case 1:\n            if (!(i<_this.row)) { __pc=5; break; }\n            //$LASTPOS=25000707;//kernel.Map:707\n            //$LASTPOS=25000711;//kernel.Map:711\n            j = 0;;\n          case 2:\n            if (!(j<_this.col)) { __pc=4; break; }\n            //$LASTPOS=25000744;//kernel.Map:744\n            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);\n            __pc=3;return;\n          case 3:\n            \n            j++;\n            __pc=2;break;\n          case 4:\n            \n            i++;\n            __pc=1;break;\n          case 5:\n            \n            //$LASTPOS=25000791;//kernel.Map:791\n            if (!(! _this.mapOnData)) { __pc=6; break; }\n            _thread.exit(_this);return;\n          case 6:\n            \n            //$LASTPOS=25000819;//kernel.Map:819\n            //$LASTPOS=25000823;//kernel.Map:823\n            i = 0;;\n          case 7:\n            if (!(i<_this.row)) { __pc=11; break; }\n            //$LASTPOS=25000852;//kernel.Map:852\n            //$LASTPOS=25000856;//kernel.Map:856\n            j = 0;;\n          case 8:\n            if (!(j<_this.col)) { __pc=10; break; }\n            //$LASTPOS=25000889;//kernel.Map:889\n            _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);\n            __pc=9;return;\n          case 9:\n            \n            j++;\n            __pc=8;break;\n          case 10:\n            \n            i++;\n            __pc=7;break;\n          case 11:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    load :function _trc_Map_load(dataFile) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25000961;//kernel.Map:961\n      _this.baseData=_this.file("../maps/").rel(dataFile).obj();\n      //$LASTPOS=25001013;//kernel.Map:1013\n      if (! _this.baseData) {\n        //$LASTPOS=25001027;//kernel.Map:1027\n        _this.baseData=_this.file(dataFile).obj();\n      }\n      //$LASTPOS=25001063;//kernel.Map:1063\n      _this.mapTable=_this.baseData[0];\n      //$LASTPOS=25001090;//kernel.Map:1090\n      _this.mapData=_this.mapTable;\n      //$LASTPOS=25001113;//kernel.Map:1113\n      _this.row=_this.mapTable.length;\n      //$LASTPOS=25001139;//kernel.Map:1139\n      _this.col=_this.mapTable[0].length;\n      //$LASTPOS=25001168;//kernel.Map:1168\n      _this.mapOnTable=_this.baseData[1];\n      //$LASTPOS=25001197;//kernel.Map:1197\n      _this.mapOnData=_this.mapOnTable;\n      //$LASTPOS=25001224;//kernel.Map:1224\n      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n      //$LASTPOS=25001296;//kernel.Map:1296\n      _this.initMap();\n    },\n    fiber$load :function _trc_Map_f_load(_thread,dataFile) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25000961;//kernel.Map:961\n      _this.baseData=_this.file("../maps/").rel(dataFile).obj();\n      //$LASTPOS=25001013;//kernel.Map:1013\n      if (! _this.baseData) {\n        //$LASTPOS=25001027;//kernel.Map:1027\n        _this.baseData=_this.file(dataFile).obj();\n      }\n      //$LASTPOS=25001063;//kernel.Map:1063\n      _this.mapTable=_this.baseData[0];\n      //$LASTPOS=25001090;//kernel.Map:1090\n      _this.mapData=_this.mapTable;\n      //$LASTPOS=25001113;//kernel.Map:1113\n      _this.row=_this.mapTable.length;\n      //$LASTPOS=25001139;//kernel.Map:1139\n      _this.col=_this.mapTable[0].length;\n      //$LASTPOS=25001168;//kernel.Map:1168\n      _this.mapOnTable=_this.baseData[1];\n      //$LASTPOS=25001197;//kernel.Map:1197\n      _this.mapOnData=_this.mapOnTable;\n      //$LASTPOS=25001224;//kernel.Map:1224\n      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n      \n      _thread.enter(function _trc_Map_ent_load(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=25001296;//kernel.Map:1296\n            _this.fiber$initMap(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    set :function _trc_Map_set(setCol,setRow,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25001339;//kernel.Map:1339\n      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n        return _this;\n      }\n      //$LASTPOS=25001407;//kernel.Map:1407\n      _this.mapTable[setRow][setCol]=p;\n      //$LASTPOS=25001478;//kernel.Map:1478\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=25001512;//kernel.Map:1512\n      p=Math.floor(p);\n      //$LASTPOS=25001534;//kernel.Map:1534\n      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n      //$LASTPOS=25001572;//kernel.Map:1572\n      if (! _this.pImg) {\n        //$LASTPOS=25001594;//kernel.Map:1594\n        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n        return _this;\n        \n      }\n      //$LASTPOS=25001695;//kernel.Map:1695\n      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      //$LASTPOS=25001772;//kernel.Map:1772\n      _this.ctx.save();\n      //$LASTPOS=25001789;//kernel.Map:1789\n      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      //$LASTPOS=25001933;//kernel.Map:1933\n      _this.ctx.restore();\n    },\n    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25001339;//kernel.Map:1339\n      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=25001407;//kernel.Map:1407\n      _this.mapTable[setRow][setCol]=p;\n      //$LASTPOS=25001478;//kernel.Map:1478\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=25001512;//kernel.Map:1512\n      p=Math.floor(p);\n      //$LASTPOS=25001534;//kernel.Map:1534\n      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n      //$LASTPOS=25001572;//kernel.Map:1572\n      if (! _this.pImg) {\n        //$LASTPOS=25001594;//kernel.Map:1594\n        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n        _thread.retVal=_this;return;\n        \n        \n      }\n      //$LASTPOS=25001695;//kernel.Map:1695\n      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      //$LASTPOS=25001772;//kernel.Map:1772\n      _this.ctx.save();\n      //$LASTPOS=25001789;//kernel.Map:1789\n      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      //$LASTPOS=25001933;//kernel.Map:1933\n      _this.ctx.restore();\n      \n      _thread.retVal=_this;return;\n    },\n    setOn :function _trc_Map_setOn(setCol,setRow,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25001982;//kernel.Map:1982\n      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n        return _this;\n      }\n      //$LASTPOS=25002050;//kernel.Map:2050\n      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);\n      //$LASTPOS=25002100;//kernel.Map:2100\n      _this.mapOnTable[setRow][setCol]=p;\n      //$LASTPOS=25002135;//kernel.Map:2135\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=25002169;//kernel.Map:2169\n      p=Math.floor(p);\n      //$LASTPOS=25002191;//kernel.Map:2191\n      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n      //$LASTPOS=25002229;//kernel.Map:2229\n      if (! _this.pImg) {\n        return _this;\n      }\n      //$LASTPOS=25002253;//kernel.Map:2253\n      _this.ctx.save();\n      //$LASTPOS=25002270;//kernel.Map:2270\n      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n      //$LASTPOS=25002414;//kernel.Map:2414\n      _this.ctx.restore();\n    },\n    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25001982;//kernel.Map:1982\n      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {\n        _thread.retVal=_this;return;\n        \n      }\n      \n      _thread.enter(function _trc_Map_ent_setOn(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=25002050;//kernel.Map:2050\n            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=25002100;//kernel.Map:2100\n            _this.mapOnTable[setRow][setCol]=p;\n            //$LASTPOS=25002135;//kernel.Map:2135\n            _this.ctx=_this.buf[0].getContext("2d");\n            //$LASTPOS=25002169;//kernel.Map:2169\n            p=Math.floor(p);\n            //$LASTPOS=25002191;//kernel.Map:2191\n            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];\n            //$LASTPOS=25002229;//kernel.Map:2229\n            if (!(! _this.pImg)) { __pc=2; break; }\n            _thread.exit(_this);return;\n          case 2:\n            \n            //$LASTPOS=25002253;//kernel.Map:2253\n            _this.ctx.save();\n            //$LASTPOS=25002270;//kernel.Map:2270\n            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);\n            //$LASTPOS=25002414;//kernel.Map:2414\n            _this.ctx.restore();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25002461;//kernel.Map:2461\n      _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);\n    },\n    fiber$setOnAt :function _trc_Map_f_setOnAt(_thread,setX,setY,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Map_ent_setOnAt(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=25002461;//kernel.Map:2461\n            _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    setAt :function _trc_Map_setAt(setX,setY,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25002556;//kernel.Map:2556\n      _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);\n    },\n    fiber$setAt :function _trc_Map_f_setAt(_thread,setX,setY,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Map_ent_setAt(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=25002556;//kernel.Map:2556\n            _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    get :function _trc_Map_get(getCol,getRow) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25002649;//kernel.Map:2649\n      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n        return _this.mapTable[getRow][getCol];\n      }\n      return - 1;\n    },\n    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25002649;//kernel.Map:2649\n      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n        _thread.retVal=_this.mapTable[getRow][getCol];return;\n        \n      }\n      _thread.retVal=- 1;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getAt :function _trc_Map_getAt(getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));\n    },\n    fiber$getAt :function _trc_Map_f_getAt(_thread,getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getOn :function _trc_Map_getOn(getCol,getRow) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25002881;//kernel.Map:2881\n      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n        return _this.mapOnTable[getRow][getCol];\n      }\n      return - 1;\n    },\n    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25002881;//kernel.Map:2881\n      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {\n        _thread.retVal=_this.mapOnTable[getRow][getCol];return;\n        \n      }\n      _thread.retVal=- 1;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getOnAt :function _trc_Map_getOnAt(getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));\n    },\n    fiber$getOnAt :function _trc_Map_f_getOnAt(_thread,getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    scrollTo :function _trc_Map_scrollTo(scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25003124;//kernel.Map:3124\n      _this.sx=- scrollX;\n      //$LASTPOS=25003142;//kernel.Map:3142\n      _this.sy=- scrollY;\n    },\n    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=25003124;//kernel.Map:3124\n      _this.sx=- scrollX;\n      //$LASTPOS=25003142;//kernel.Map:3142\n      _this.sy=- scrollY;\n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_Map_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=25003177;//kernel.Map:3177\n      _this.pImg=_this.buf[0];\n      //$LASTPOS=25003195;//kernel.Map:3195\n      ctx.save();\n      //$LASTPOS=25003212;//kernel.Map:3212\n      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);\n      //$LASTPOS=25003324;//kernel.Map:3324\n      ctx.restore();\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Panel\',\n  shortName: \'Panel\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_Panel_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_Panel_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_Panel_initialize(opt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000072;//kernel.Panel:72\n      Tonyu.classes.kernel.Actor.apply( _this, [opt]);\n      //$LASTPOS=26000089;//kernel.Panel:89\n      _this.width=_this.width;\n      //$LASTPOS=26000112;//kernel.Panel:112\n      _this.height=_this.height;\n      //$LASTPOS=26000137;//kernel.Panel:137\n      if (_this.align==null) {\n        //$LASTPOS=26000153;//kernel.Panel:153\n        _this.align="center";\n      }\n      //$LASTPOS=26000174;//kernel.Panel:174\n      if (_this.alpha==null) {\n        //$LASTPOS=26000190;//kernel.Panel:190\n        _this.alpha=255;\n      }\n      //$LASTPOS=26000206;//kernel.Panel:206\n      if (_this._drawn==null) {\n        //$LASTPOS=26000223;//kernel.Panel:223\n        _this._drawn=false;\n      }\n      //$LASTPOS=26000242;//kernel.Panel:242\n      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});\n    },\n    setPanel :function _trc_Panel_setPanel(width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000314;//kernel.Panel:314\n      _this.width=width;\n      //$LASTPOS=26000337;//kernel.Panel:337\n      _this.height=height;\n      //$LASTPOS=26000362;//kernel.Panel:362\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n    },\n    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=26000314;//kernel.Panel:314\n      _this.width=width;\n      //$LASTPOS=26000337;//kernel.Panel:337\n      _this.height=height;\n      //$LASTPOS=26000362;//kernel.Panel:362\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n      \n      _thread.retVal=_this;return;\n    },\n    resize :function _trc_Panel_resize(width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000432;//kernel.Panel:432\n      _this.setPanel(width,height);\n    },\n    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Panel_ent_resize(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26000432;//kernel.Panel:432\n            _this.fiber$setPanel(_thread, width, height);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    getContext :function _trc_Panel_getContext() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000480;//kernel.Panel:480\n      _this._drawn=true;\n      return _this.buf[0].getContext("2d");\n    },\n    fiber$getContext :function _trc_Panel_f_getContext(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=26000480;//kernel.Panel:480\n      _this._drawn=true;\n      _thread.retVal=_this.buf[0].getContext("2d");return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setFillStyle :function _trc_Panel_setFillStyle(color) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000561;//kernel.Panel:561\n      _this.fillStyle=color;\n    },\n    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=26000561;//kernel.Panel:561\n      _this.fillStyle=color;\n      \n      _thread.retVal=_this;return;\n    },\n    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26000629;//kernel.Panel:629\n      _this.ctx=_this.getContext();\n      //$LASTPOS=26000652;//kernel.Panel:652\n      _this.ctx.save();\n      //$LASTPOS=26000719;//kernel.Panel:719\n      _this.ctx.fillStyle=_this.fillStyle;\n      //$LASTPOS=26000749;//kernel.Panel:749\n      _this.ctx.fillRect(x,y,rectWidth,rectHeight);\n      //$LASTPOS=26000794;//kernel.Panel:794\n      _this.ctx.restore();\n    },\n    fiber$fillRect :function _trc_Panel_f_fillRect(_thread,x,y,rectWidth,rectHeight) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Panel_ent_fillRect(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26000629;//kernel.Panel:629\n            _this.fiber$getContext(_thread);\n            __pc=1;return;\n          case 1:\n            _this.ctx=_thread.retVal;\n            \n            //$LASTPOS=26000652;//kernel.Panel:652\n            _this.ctx.save();\n            //$LASTPOS=26000719;//kernel.Panel:719\n            _this.ctx.fillStyle=_this.fillStyle;\n            //$LASTPOS=26000749;//kernel.Panel:749\n            _this.ctx.fillRect(x,y,rectWidth,rectHeight);\n            //$LASTPOS=26000794;//kernel.Panel:794\n            _this.ctx.restore();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    fillText :function _trc_Panel_fillText(text,x,y,size,align) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var splits;\n      var colCount;\n      \n      //$LASTPOS=26000850;//kernel.Panel:850\n      _this.ctx=_this.getContext();\n      //$LASTPOS=26000873;//kernel.Panel:873\n      _this.ctx.save();\n      //$LASTPOS=26000890;//kernel.Panel:890\n      text=text+"";\n      //$LASTPOS=26000909;//kernel.Panel:909\n      splits = text.split("\\n");\n      //$LASTPOS=26000995;//kernel.Panel:995\n      _this.ctx.textAlign=align;\n      //$LASTPOS=26001023;//kernel.Panel:1023\n      _this.ctx.fillStyle=_this.fillStyle;\n      //$LASTPOS=26001053;//kernel.Panel:1053\n      _this.ctx.font=size+"px \'Courier New\'";\n      //$LASTPOS=26001092;//kernel.Panel:1092\n      //$LASTPOS=26001096;//kernel.Panel:1096\n      colCount = 0;\n      while(colCount<splits.length) {\n        {\n          //$LASTPOS=26001156;//kernel.Panel:1156\n          _this.ctx.fillText(splits[colCount],x,y);\n          //$LASTPOS=26001201;//kernel.Panel:1201\n          y+=size;\n        }\n        colCount++;\n      }\n      //$LASTPOS=26001222;//kernel.Panel:1222\n      _this.ctx.restore();\n    },\n    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var splits;\n      var colCount;\n      \n      \n      _thread.enter(function _trc_Panel_ent_fillText(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26000850;//kernel.Panel:850\n            _this.fiber$getContext(_thread);\n            __pc=1;return;\n          case 1:\n            _this.ctx=_thread.retVal;\n            \n            //$LASTPOS=26000873;//kernel.Panel:873\n            _this.ctx.save();\n            //$LASTPOS=26000890;//kernel.Panel:890\n            text=text+"";\n            //$LASTPOS=26000909;//kernel.Panel:909\n            splits = text.split("\\n");\n            //$LASTPOS=26000995;//kernel.Panel:995\n            _this.ctx.textAlign=align;\n            //$LASTPOS=26001023;//kernel.Panel:1023\n            _this.ctx.fillStyle=_this.fillStyle;\n            //$LASTPOS=26001053;//kernel.Panel:1053\n            _this.ctx.font=size+"px \'Courier New\'";\n            //$LASTPOS=26001092;//kernel.Panel:1092\n            //$LASTPOS=26001096;//kernel.Panel:1096\n            colCount = 0;\n            while(colCount<splits.length) {\n              {\n                //$LASTPOS=26001156;//kernel.Panel:1156\n                _this.ctx.fillText(splits[colCount],x,y);\n                //$LASTPOS=26001201;//kernel.Panel:1201\n                y+=size;\n              }\n              colCount++;\n            }\n            //$LASTPOS=26001222;//kernel.Panel:1222\n            _this.ctx.restore();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26001287;//kernel.Panel:1287\n      _this.ctx=_this.getContext();\n      //$LASTPOS=26001310;//kernel.Panel:1310\n      _this.ctx.save();\n      //$LASTPOS=26001327;//kernel.Panel:1327\n      _this.ctx.clearRect(clearX,clearY,clearW,clearH);\n      //$LASTPOS=26001376;//kernel.Panel:1376\n      _this.ctx.restore();\n    },\n    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Panel_ent_clearRect(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26001287;//kernel.Panel:1287\n            _this.fiber$getContext(_thread);\n            __pc=1;return;\n          case 1:\n            _this.ctx=_thread.retVal;\n            \n            //$LASTPOS=26001310;//kernel.Panel:1310\n            _this.ctx.save();\n            //$LASTPOS=26001327;//kernel.Panel:1327\n            _this.ctx.clearRect(clearX,clearY,clearW,clearH);\n            //$LASTPOS=26001376;//kernel.Panel:1376\n            _this.ctx.restore();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    getPixel :function _trc_Panel_getPixel(getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26001422;//kernel.Panel:1422\n      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {\n        //$LASTPOS=26001521;//kernel.Panel:1521\n        _this.ctx=_this.getContext();\n        //$LASTPOS=26001548;//kernel.Panel:1548\n        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);\n        //$LASTPOS=26001600;//kernel.Panel:1600\n        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];\n        \n      } else {\n        //$LASTPOS=26001740;//kernel.Panel:1740\n        _this.colordata=[0,0,0,0];\n        \n      }\n      return (_this.colordata);\n    },\n    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Panel_ent_getPixel(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26001422;//kernel.Panel:1422\n            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }\n            //$LASTPOS=26001521;//kernel.Panel:1521\n            _this.fiber$getContext(_thread);\n            __pc=1;return;\n          case 1:\n            _this.ctx=_thread.retVal;\n            \n            //$LASTPOS=26001548;//kernel.Panel:1548\n            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);\n            //$LASTPOS=26001600;//kernel.Panel:1600\n            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];\n            __pc=3;break;\n          case 2:\n            {\n              //$LASTPOS=26001740;//kernel.Panel:1740\n              _this.colordata=[0,0,0,0];\n            }\n          case 3:\n            \n            _thread.exit((_this.colordata));return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    scroll :function _trc_Panel_scroll(scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26001827;//kernel.Panel:1827\n      _this.ctx=_this.getContext();\n      //$LASTPOS=26001850;//kernel.Panel:1850\n      _this.ctx.save();\n      //$LASTPOS=26001867;//kernel.Panel:1867\n      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);\n      //$LASTPOS=26001928;//kernel.Panel:1928\n      _this.clearRect(0,0,_this.width,_this.height);\n      //$LASTPOS=26001962;//kernel.Panel:1962\n      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);\n      //$LASTPOS=26002014;//kernel.Panel:2014\n      _this.ctx.restore();\n    },\n    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Panel_ent_scroll(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=26001827;//kernel.Panel:1827\n            _this.fiber$getContext(_thread);\n            __pc=1;return;\n          case 1:\n            _this.ctx=_thread.retVal;\n            \n            //$LASTPOS=26001850;//kernel.Panel:1850\n            _this.ctx.save();\n            //$LASTPOS=26001867;//kernel.Panel:1867\n            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);\n            //$LASTPOS=26001928;//kernel.Panel:1928\n            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=26001962;//kernel.Panel:1962\n            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);\n            //$LASTPOS=26002014;//kernel.Panel:2014\n            _this.ctx.restore();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    draw :function _trc_Panel_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=26002050;//kernel.Panel:2050\n      if (_this._drawn) {\n        //$LASTPOS=26002071;//kernel.Panel:2071\n        _this.pImg=_this.buf[0];\n        //$LASTPOS=26002093;//kernel.Panel:2093\n        ctx.save();\n        //$LASTPOS=26002114;//kernel.Panel:2114\n        if (_this.align=="left") {\n          //$LASTPOS=26002146;//kernel.Panel:2146\n          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);\n          \n        } else {\n          //$LASTPOS=26002198;//kernel.Panel:2198\n          if (_this.align=="center") {\n            //$LASTPOS=26002232;//kernel.Panel:2232\n            ctx.translate(_this.x,_this.y);\n            \n          } else {\n            //$LASTPOS=26002267;//kernel.Panel:2267\n            if (_this.align=="right") {\n              //$LASTPOS=26002300;//kernel.Panel:2300\n              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);\n              \n            }\n          }\n        }\n        //$LASTPOS=26002357;//kernel.Panel:2357\n        if (_this.rotation!=0) {\n          //$LASTPOS=26002392;//kernel.Panel:2392\n          ctx.rotate(_this.rotation/180*Math.PI);\n          \n        } else {\n          //$LASTPOS=26002460;//kernel.Panel:2460\n          ctx.rotate(_this.rotate/180*Math.PI);\n          \n        }\n        //$LASTPOS=26002517;//kernel.Panel:2517\n        ctx.globalAlpha=_this.alpha/255;\n        //$LASTPOS=26002558;//kernel.Panel:2558\n        ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);\n        //$LASTPOS=26002662;//kernel.Panel:2662\n        ctx.restore();\n        \n      }\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.ScaledCanvas\',\n  shortName: \'ScaledCanvas\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_ScaledCanvas_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_ScaledCanvas_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_ScaledCanvas_initialize(opt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=27000095;//kernel.ScaledCanvas:95\n      _this.extend(opt);\n      //$LASTPOS=27000142;//kernel.ScaledCanvas:142\n      _this.resize(_this.width,_this.height);\n      //$LASTPOS=27000170;//kernel.ScaledCanvas:170\n      _this.cw=_this.canvas.width();\n      //$LASTPOS=27000194;//kernel.ScaledCanvas:194\n      _this.ch=_this.canvas.height();\n      //$LASTPOS=27000219;//kernel.ScaledCanvas:219\n      _this.cctx=_this.canvas[0].getContext("2d");\n      //$LASTPOS=27000257;//kernel.ScaledCanvas:257\n      _this.color="rgb(20,80,180)";\n      //$LASTPOS=27000291;//kernel.ScaledCanvas:291\n      _this.sx=0;\n      //$LASTPOS=27000302;//kernel.ScaledCanvas:302\n      _this.sy=0;\n      //$LASTPOS=27000313;//kernel.ScaledCanvas:313\n      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;\n    },\n    resize :function _trc_ScaledCanvas_resize(width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=27000378;//kernel.ScaledCanvas:378\n      _this.width=width;\n      //$LASTPOS=27000401;//kernel.ScaledCanvas:401\n      _this.height=height;\n      //$LASTPOS=27000426;//kernel.ScaledCanvas:426\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n      //$LASTPOS=27000469;//kernel.ScaledCanvas:469\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=27000505;//kernel.ScaledCanvas:505\n      Tonyu.globals.$screenWidth=width;\n      //$LASTPOS=27000530;//kernel.ScaledCanvas:530\n      Tonyu.globals.$screenHeight=height;\n      //$LASTPOS=27000557;//kernel.ScaledCanvas:557\n      if (Tonyu.globals.$panel) {\n        //$LASTPOS=27000578;//kernel.ScaledCanvas:578\n        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n        //$LASTPOS=27000632;//kernel.ScaledCanvas:632\n        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;\n        //$LASTPOS=27000666;//kernel.ScaledCanvas:666\n        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;\n        \n      }\n      //$LASTPOS=27000704;//kernel.ScaledCanvas:704\n      if (Tonyu.globals.$consolePanel) {\n        //$LASTPOS=27000732;//kernel.ScaledCanvas:732\n        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n        //$LASTPOS=27000793;//kernel.ScaledCanvas:793\n        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;\n        //$LASTPOS=27000834;//kernel.ScaledCanvas:834\n        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;\n        //$LASTPOS=27000876;//kernel.ScaledCanvas:876\n        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;\n        \n      }\n    },\n    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=27000378;//kernel.ScaledCanvas:378\n      _this.width=width;\n      //$LASTPOS=27000401;//kernel.ScaledCanvas:401\n      _this.height=height;\n      //$LASTPOS=27000426;//kernel.ScaledCanvas:426\n      _this.buf=$("<canvas>").attr({width: width,height: height});\n      //$LASTPOS=27000469;//kernel.ScaledCanvas:469\n      _this.ctx=_this.buf[0].getContext("2d");\n      //$LASTPOS=27000505;//kernel.ScaledCanvas:505\n      Tonyu.globals.$screenWidth=width;\n      //$LASTPOS=27000530;//kernel.ScaledCanvas:530\n      Tonyu.globals.$screenHeight=height;\n      //$LASTPOS=27000557;//kernel.ScaledCanvas:557\n      if (Tonyu.globals.$panel) {\n        //$LASTPOS=27000578;//kernel.ScaledCanvas:578\n        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n        //$LASTPOS=27000632;//kernel.ScaledCanvas:632\n        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;\n        //$LASTPOS=27000666;//kernel.ScaledCanvas:666\n        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;\n        \n      }\n      //$LASTPOS=27000704;//kernel.ScaledCanvas:704\n      if (Tonyu.globals.$consolePanel) {\n        //$LASTPOS=27000732;//kernel.ScaledCanvas:732\n        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);\n        //$LASTPOS=27000793;//kernel.ScaledCanvas:793\n        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;\n        //$LASTPOS=27000834;//kernel.ScaledCanvas:834\n        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;\n        //$LASTPOS=27000876;//kernel.ScaledCanvas:876\n        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;\n        \n      }\n      \n      _thread.retVal=_this;return;\n    },\n    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var larger;\n      var smaller;\n      \n      //$LASTPOS=27000998;//kernel.ScaledCanvas:998\n      larger = 200;\n      //$LASTPOS=27001019;//kernel.ScaledCanvas:1019\n      smaller = 5;\n      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;\n    },\n    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var larger;\n      var smaller;\n      \n      //$LASTPOS=27000998;//kernel.ScaledCanvas:998\n      larger = 200;\n      //$LASTPOS=27001019;//kernel.ScaledCanvas:1019\n      smaller = 5;\n      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_ScaledCanvas_draw() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var calcw;\n      var calch;\n      var marginw;\n      var marginh;\n      \n      //$LASTPOS=27001154;//kernel.ScaledCanvas:1154\n      _this.cw=_this.canvas.width();\n      //$LASTPOS=27001178;//kernel.ScaledCanvas:1178\n      _this.ch=_this.canvas.height();\n      //$LASTPOS=27001203;//kernel.ScaledCanvas:1203\n      calcw = _this.ch/_this.height*_this.width;\n      //$LASTPOS=27001247;//kernel.ScaledCanvas:1247\n      calch = _this.cw/_this.width*_this.height;\n      //$LASTPOS=27001291;//kernel.ScaledCanvas:1291\n      if (calch>_this.ch) {\n        //$LASTPOS=27001305;//kernel.ScaledCanvas:1305\n        calch=_this.ch;\n      }\n      //$LASTPOS=27001320;//kernel.ScaledCanvas:1320\n      if (calcw>_this.cw) {\n        //$LASTPOS=27001334;//kernel.ScaledCanvas:1334\n        calcw=_this.cw;\n      }\n      //$LASTPOS=27001349;//kernel.ScaledCanvas:1349\n      _this.cctx.clearRect(0,0,_this.cw,_this.ch);\n      //$LASTPOS=27001381;//kernel.ScaledCanvas:1381\n      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n        //$LASTPOS=27001437;//kernel.ScaledCanvas:1437\n        calcw=_this.width;\n        //$LASTPOS=27001449;//kernel.ScaledCanvas:1449\n        calch=_this.height;\n        \n      }\n      //$LASTPOS=27001475;//kernel.ScaledCanvas:1475\n      marginw = Math.floor((_this.cw-calcw)/2);\n      //$LASTPOS=27001518;//kernel.ScaledCanvas:1518\n      marginh = Math.floor((_this.ch-calch)/2);\n      //$LASTPOS=27001561;//kernel.ScaledCanvas:1561\n      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);\n    },\n    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var calcw;\n      var calch;\n      var marginw;\n      var marginh;\n      \n      //$LASTPOS=27001676;//kernel.ScaledCanvas:1676\n      calcw = _this.ch/_this.height*_this.width;\n      //$LASTPOS=27001720;//kernel.ScaledCanvas:1720\n      calch = _this.cw/_this.width*_this.height;\n      //$LASTPOS=27001764;//kernel.ScaledCanvas:1764\n      if (calch>_this.ch) {\n        //$LASTPOS=27001778;//kernel.ScaledCanvas:1778\n        calch=_this.ch;\n      }\n      //$LASTPOS=27001793;//kernel.ScaledCanvas:1793\n      if (calcw>_this.cw) {\n        //$LASTPOS=27001807;//kernel.ScaledCanvas:1807\n        calcw=_this.cw;\n      }\n      //$LASTPOS=27001822;//kernel.ScaledCanvas:1822\n      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n        //$LASTPOS=27001878;//kernel.ScaledCanvas:1878\n        calcw=_this.width;\n        //$LASTPOS=27001890;//kernel.ScaledCanvas:1890\n        calch=_this.height;\n        \n      }\n      //$LASTPOS=27001916;//kernel.ScaledCanvas:1916\n      marginw = Math.floor((_this.cw-calcw)/2);\n      //$LASTPOS=27001959;//kernel.ScaledCanvas:1959\n      marginh = Math.floor((_this.ch-calch)/2);\n      //$LASTPOS=27002055;//kernel.ScaledCanvas:2055\n      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";\n      return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};\n    },\n    fiber$canvas2buf :function _trc_ScaledCanvas_f_canvas2buf(_thread,point) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var calcw;\n      var calch;\n      var marginw;\n      var marginh;\n      \n      //$LASTPOS=27001676;//kernel.ScaledCanvas:1676\n      calcw = _this.ch/_this.height*_this.width;\n      //$LASTPOS=27001720;//kernel.ScaledCanvas:1720\n      calch = _this.cw/_this.width*_this.height;\n      //$LASTPOS=27001764;//kernel.ScaledCanvas:1764\n      if (calch>_this.ch) {\n        //$LASTPOS=27001778;//kernel.ScaledCanvas:1778\n        calch=_this.ch;\n      }\n      //$LASTPOS=27001793;//kernel.ScaledCanvas:1793\n      if (calcw>_this.cw) {\n        //$LASTPOS=27001807;//kernel.ScaledCanvas:1807\n        calcw=_this.cw;\n      }\n      //$LASTPOS=27001822;//kernel.ScaledCanvas:1822\n      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {\n        //$LASTPOS=27001878;//kernel.ScaledCanvas:1878\n        calcw=_this.width;\n        //$LASTPOS=27001890;//kernel.ScaledCanvas:1890\n        calch=_this.height;\n        \n      }\n      //$LASTPOS=27001916;//kernel.ScaledCanvas:1916\n      marginw = Math.floor((_this.cw-calcw)/2);\n      //$LASTPOS=27001959;//kernel.ScaledCanvas:1959\n      marginh = Math.floor((_this.ch-calch)/2);\n      //$LASTPOS=27002055;//kernel.ScaledCanvas:2055\n      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";\n      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=27002228;//kernel.ScaledCanvas:2228\n      _this.color=color;\n    },\n    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=27002228;//kernel.ScaledCanvas:2228\n      _this.color=color;\n      \n      _thread.retVal=_this;return;\n    },\n    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ctx;\n      \n      //$LASTPOS=27002272;//kernel.ScaledCanvas:2272\n      ctx = cv.getContext("2d");\n      //$LASTPOS=27002306;//kernel.ScaledCanvas:2306\n      ctx.save();\n      //$LASTPOS=27002323;//kernel.ScaledCanvas:2323\n      ctx.fillStyle=Tonyu.globals.$Screen.color;\n      //$LASTPOS=27002357;//kernel.ScaledCanvas:2357\n      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);\n      //$LASTPOS=27002383;//kernel.ScaledCanvas:2383\n      ctx.fillRect(0,0,cv.width,cv.height);\n      //$LASTPOS=27002426;//kernel.ScaledCanvas:2426\n      if (_this.isDrawGrid) {\n        //$LASTPOS=27002442;//kernel.ScaledCanvas:2442\n        _this.drawGrid(cv);\n      }\n      //$LASTPOS=27002461;//kernel.ScaledCanvas:2461\n      ctx.restore();\n    },\n    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var ctx;\n      \n      //$LASTPOS=27002272;//kernel.ScaledCanvas:2272\n      ctx = cv.getContext("2d");\n      //$LASTPOS=27002306;//kernel.ScaledCanvas:2306\n      ctx.save();\n      //$LASTPOS=27002323;//kernel.ScaledCanvas:2323\n      ctx.fillStyle=Tonyu.globals.$Screen.color;\n      //$LASTPOS=27002357;//kernel.ScaledCanvas:2357\n      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);\n      //$LASTPOS=27002383;//kernel.ScaledCanvas:2383\n      ctx.fillRect(0,0,cv.width,cv.height);\n      //$LASTPOS=27002426;//kernel.ScaledCanvas:2426\n      if (_this.isDrawGrid) {\n        //$LASTPOS=27002442;//kernel.ScaledCanvas:2442\n        _this.drawGrid(cv);\n      }\n      //$LASTPOS=27002461;//kernel.ScaledCanvas:2461\n      ctx.restore();\n      \n      _thread.retVal=_this;return;\n    },\n    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=27002805;//kernel.ScaledCanvas:2805\n      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);\n    },\n    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=27002805;//kernel.ScaledCanvas:2805\n      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Sprites\',\n  shortName: \'Sprites\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_Sprites_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_Sprites_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_Sprites_initialize() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28000045;//kernel.Sprites:45\n      _this.sprites=[];\n      //$LASTPOS=28000062;//kernel.Sprites:62\n      _this.imageList=[];\n      //$LASTPOS=28000081;//kernel.Sprites:81\n      _this.hitWatchers=[];\n      //$LASTPOS=28000102;//kernel.Sprites:102\n      _this.isDrawGrid=Tonyu.noviceMode;\n      //$LASTPOS=28000136;//kernel.Sprites:136\n      _this.sx=0;\n      //$LASTPOS=28000147;//kernel.Sprites:147\n      _this.sy=0;\n      //$LASTPOS=28000158;//kernel.Sprites:158\n      _this.objId=0;\n    },\n    add :function _trc_Sprites_add(s) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28000194;//kernel.Sprites:194\n      if (s.__addedToSprites) {\n        return _this;\n      }\n      //$LASTPOS=28000231;//kernel.Sprites:231\n      _this.sprites.push(s);\n      //$LASTPOS=28000253;//kernel.Sprites:253\n      if (s.__genId==null) {\n        //$LASTPOS=28000283;//kernel.Sprites:283\n        s.__genId=_this.objId;\n        //$LASTPOS=28000309;//kernel.Sprites:309\n        _this.objId++;\n        \n      }\n      //$LASTPOS=28000330;//kernel.Sprites:330\n      s.__addedToSprites=_this;\n      return s;\n    },\n    fiber$add :function _trc_Sprites_f_add(_thread,s) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=28000194;//kernel.Sprites:194\n      if (s.__addedToSprites) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=28000231;//kernel.Sprites:231\n      _this.sprites.push(s);\n      //$LASTPOS=28000253;//kernel.Sprites:253\n      if (s.__genId==null) {\n        //$LASTPOS=28000283;//kernel.Sprites:283\n        s.__genId=_this.objId;\n        //$LASTPOS=28000309;//kernel.Sprites:309\n        _this.objId++;\n        \n      }\n      //$LASTPOS=28000330;//kernel.Sprites:330\n      s.__addedToSprites=_this;\n      _thread.retVal=s;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    remove :function _trc_Sprites_remove(s) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var idx;\n      \n      //$LASTPOS=28000400;//kernel.Sprites:400\n      idx = _this.sprites.indexOf(s);\n      //$LASTPOS=28000433;//kernel.Sprites:433\n      if (idx<0) {\n        return _this;\n      }\n      //$LASTPOS=28000457;//kernel.Sprites:457\n      _this.sprites.splice(idx,1);\n      //$LASTPOS=28000485;//kernel.Sprites:485\n      delete s.__addedToSprites;\n    },\n    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var idx;\n      \n      //$LASTPOS=28000400;//kernel.Sprites:400\n      idx = _this.sprites.indexOf(s);\n      //$LASTPOS=28000433;//kernel.Sprites:433\n      if (idx<0) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=28000457;//kernel.Sprites:457\n      _this.sprites.splice(idx,1);\n      //$LASTPOS=28000485;//kernel.Sprites:485\n      delete s.__addedToSprites;\n      \n      _thread.retVal=_this;return;\n    },\n    removeOneframes :function _trc_Sprites_removeOneframes() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      \n      //$LASTPOS=28000542;//kernel.Sprites:542\n      //$LASTPOS=28000547;//kernel.Sprites:547\n      i = _this.sprites.length-1;\n      while(i>=0) {\n        {\n          //$LASTPOS=28000595;//kernel.Sprites:595\n          if (_this.sprites[i].oneframeSprite) {\n            //$LASTPOS=28000641;//kernel.Sprites:641\n            _this.sprites.splice(i,1);\n            \n          }\n        }\n        i--;\n      }\n    },\n    fiber$removeOneframes :function _trc_Sprites_f_removeOneframes(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      \n      //$LASTPOS=28000542;//kernel.Sprites:542\n      //$LASTPOS=28000547;//kernel.Sprites:547\n      i = _this.sprites.length-1;\n      while(i>=0) {\n        {\n          //$LASTPOS=28000595;//kernel.Sprites:595\n          if (_this.sprites[i].oneframeSprite) {\n            //$LASTPOS=28000641;//kernel.Sprites:641\n            _this.sprites.splice(i,1);\n            \n          }\n        }\n        i--;\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    clear :function _trc_Sprites_clear() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28000702;//kernel.Sprites:702\n      _this.sprites.splice(0,_this.sprites.length);\n    },\n    fiber$clear :function _trc_Sprites_f_clear(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=28000702;//kernel.Sprites:702\n      _this.sprites.splice(0,_this.sprites.length);\n      \n      _thread.retVal=_this;return;\n    },\n    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var val1;\n      var val2;\n      \n      //$LASTPOS=28000775;//kernel.Sprites:775\n      val1 = obj1.zOrder;\n      //$LASTPOS=28000802;//kernel.Sprites:802\n      val2 = obj2.zOrder;\n      //$LASTPOS=28000829;//kernel.Sprites:829\n      if (val1>val2) {\n        return - 1;\n        \n      } else {\n        //$LASTPOS=28000875;//kernel.Sprites:875\n        if (val1<val2) {\n          return 1;\n          \n        } else {\n          //$LASTPOS=28000920;//kernel.Sprites:920\n          if (val1==val2) {\n            //$LASTPOS=28000945;//kernel.Sprites:945\n            if (obj1.__genId>obj2.__genId) {\n              return 1;\n              \n            } else {\n              return - 1;\n              \n            }\n            return 0;\n            \n          }\n        }\n      }\n    },\n    fiber$compOrder :function _trc_Sprites_f_compOrder(_thread,obj1,obj2) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var val1;\n      var val2;\n      \n      //$LASTPOS=28000775;//kernel.Sprites:775\n      val1 = obj1.zOrder;\n      //$LASTPOS=28000802;//kernel.Sprites:802\n      val2 = obj2.zOrder;\n      //$LASTPOS=28000829;//kernel.Sprites:829\n      if (val1>val2) {\n        _thread.retVal=- 1;return;\n        \n        \n      } else {\n        //$LASTPOS=28000875;//kernel.Sprites:875\n        if (val1<val2) {\n          _thread.retVal=1;return;\n          \n          \n        } else {\n          //$LASTPOS=28000920;//kernel.Sprites:920\n          if (val1==val2) {\n            //$LASTPOS=28000945;//kernel.Sprites:945\n            if (obj1.__genId>obj2.__genId) {\n              _thread.retVal=1;return;\n              \n              \n            } else {\n              _thread.retVal=- 1;return;\n              \n              \n            }\n            _thread.retVal=0;return;\n            \n            \n          }\n        }\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_Sprites_draw(cv) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ctx;\n      var orderArray;\n      \n      //$LASTPOS=28001105;//kernel.Sprites:1105\n      ctx = cv.getContext("2d");\n      //$LASTPOS=28001139;//kernel.Sprites:1139\n      ctx.save();\n      //$LASTPOS=28001284;//kernel.Sprites:1284\n      orderArray = [];\n      //$LASTPOS=28001308;//kernel.Sprites:1308\n      orderArray=orderArray.concat(_this.sprites);\n      //$LASTPOS=28001352;//kernel.Sprites:1352\n      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));\n      //$LASTPOS=28001385;//kernel.Sprites:1385\n      ctx.translate(- _this.sx,- _this.sy);\n      //$LASTPOS=28001414;//kernel.Sprites:1414\n      orderArray.forEach((function anonymous_1433(s) {\n        \n        //$LASTPOS=28001448;//kernel.Sprites:1448\n        s.draw(ctx);\n      }));\n      //$LASTPOS=28001475;//kernel.Sprites:1475\n      ctx.restore();\n    },\n    checkHit :function _trc_Sprites_checkHit() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28001521;//kernel.Sprites:1521\n      _this.hitWatchers.forEach((function anonymous_1541(w) {\n        \n        //$LASTPOS=28001565;//kernel.Sprites:1565\n        _this.sprites.forEach((function anonymous_1581(a) {\n          var a_owner;\n          \n          //$LASTPOS=28001653;//kernel.Sprites:1653\n          a_owner = a;\n          //$LASTPOS=28001695;//kernel.Sprites:1695\n          if (! (a_owner instanceof w.A)) {\n            return _this;\n          }\n          //$LASTPOS=28001748;//kernel.Sprites:1748\n          _this.sprites.forEach((function anonymous_1764(b) {\n            var b_owner;\n            \n            //$LASTPOS=28001796;//kernel.Sprites:1796\n            b_owner = b;\n            //$LASTPOS=28001842;//kernel.Sprites:1842\n            if (a===b) {\n              return _this;\n            }\n            //$LASTPOS=28001878;//kernel.Sprites:1878\n            if (! (b_owner instanceof w.B)) {\n              return _this;\n            }\n            //$LASTPOS=28001983;//kernel.Sprites:1983\n            if (a.crashTo1(b)) {\n              //$LASTPOS=28002086;//kernel.Sprites:2086\n              w.h(a_owner,b_owner);\n              \n            }\n          }));\n        }));\n      }));\n    },\n    fiber$checkHit :function _trc_Sprites_f_checkHit(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=28001521;//kernel.Sprites:1521\n      _this.hitWatchers.forEach((function anonymous_1541(w) {\n        \n        //$LASTPOS=28001565;//kernel.Sprites:1565\n        _this.sprites.forEach((function anonymous_1581(a) {\n          var a_owner;\n          \n          //$LASTPOS=28001653;//kernel.Sprites:1653\n          a_owner = a;\n          //$LASTPOS=28001695;//kernel.Sprites:1695\n          if (! (a_owner instanceof w.A)) {\n            return _this;\n          }\n          //$LASTPOS=28001748;//kernel.Sprites:1748\n          _this.sprites.forEach((function anonymous_1764(b) {\n            var b_owner;\n            \n            //$LASTPOS=28001796;//kernel.Sprites:1796\n            b_owner = b;\n            //$LASTPOS=28001842;//kernel.Sprites:1842\n            if (a===b) {\n              return _this;\n            }\n            //$LASTPOS=28001878;//kernel.Sprites:1878\n            if (! (b_owner instanceof w.B)) {\n              return _this;\n            }\n            //$LASTPOS=28001983;//kernel.Sprites:1983\n            if (a.crashTo1(b)) {\n              //$LASTPOS=28002086;//kernel.Sprites:2086\n              w.h(a_owner,b_owner);\n              \n            }\n          }));\n        }));\n      }));\n      \n      _thread.retVal=_this;return;\n    },\n    watchHit :function _trc_Sprites_watchHit(typeA,typeB,onHit) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var p;\n      \n      //$LASTPOS=28002216;//kernel.Sprites:2216\n      p = {A: typeA,B: typeB,h: onHit};\n      //$LASTPOS=28002280;//kernel.Sprites:2280\n      _this.hitWatchers.push(p);\n    },\n    drawGrid :function _trc_Sprites_drawGrid(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ctx;\n      var i;\n      \n      //$LASTPOS=28002333;//kernel.Sprites:2333\n      ctx = c.getContext("2d");\n      //$LASTPOS=28002366;//kernel.Sprites:2366\n      ctx.textBaseline="top";\n      //$LASTPOS=28002395;//kernel.Sprites:2395\n      ctx.save();\n      //$LASTPOS=28002412;//kernel.Sprites:2412\n      ctx.strokeStyle="rgb(40,100,200)";\n      //$LASTPOS=28002452;//kernel.Sprites:2452\n      //$LASTPOS=28002457;//kernel.Sprites:2457\n      i = 0;\n      while(i<c.width) {\n        {\n          //$LASTPOS=28002497;//kernel.Sprites:2497\n          ctx.beginPath();\n          //$LASTPOS=28002523;//kernel.Sprites:2523\n          ctx.lineWidth=(i%100==0?4:1);\n          //$LASTPOS=28002569;//kernel.Sprites:2569\n          ctx.moveTo(i,0);\n          //$LASTPOS=28002595;//kernel.Sprites:2595\n          ctx.lineTo(i,c.height);\n          //$LASTPOS=28002628;//kernel.Sprites:2628\n          ctx.closePath();\n          //$LASTPOS=28002654;//kernel.Sprites:2654\n          ctx.stroke();\n        }\n        i+=10;\n      }\n      //$LASTPOS=28002686;//kernel.Sprites:2686\n      //$LASTPOS=28002691;//kernel.Sprites:2691\n      i = 0;\n      while(i<c.height) {\n        {\n          //$LASTPOS=28002732;//kernel.Sprites:2732\n          ctx.beginPath();\n          //$LASTPOS=28002758;//kernel.Sprites:2758\n          ctx.lineWidth=(i%100==0?4:1);\n          //$LASTPOS=28002804;//kernel.Sprites:2804\n          ctx.moveTo(0,i);\n          //$LASTPOS=28002830;//kernel.Sprites:2830\n          ctx.lineTo(c.width,i);\n          //$LASTPOS=28002862;//kernel.Sprites:2862\n          ctx.closePath();\n          //$LASTPOS=28002888;//kernel.Sprites:2888\n          ctx.stroke();\n        }\n        i+=10;\n      }\n      //$LASTPOS=28002914;//kernel.Sprites:2914\n      ctx.fillStyle="white";\n      //$LASTPOS=28002942;//kernel.Sprites:2942\n      ctx.font="15px monospaced";\n      //$LASTPOS=28002975;//kernel.Sprites:2975\n      //$LASTPOS=28002980;//kernel.Sprites:2980\n      i = 100;\n      while(i<c.width) {\n        {\n          //$LASTPOS=28003023;//kernel.Sprites:3023\n          ctx.fillText(i,i,0);\n        }\n        i+=100;\n      }\n      //$LASTPOS=28003057;//kernel.Sprites:3057\n      //$LASTPOS=28003062;//kernel.Sprites:3062\n      i = 100;\n      while(i<c.height) {\n        {\n          //$LASTPOS=28003106;//kernel.Sprites:3106\n          ctx.fillText(i,0,i);\n        }\n        i+=100;\n      }\n      //$LASTPOS=28003140;//kernel.Sprites:3140\n      ctx.restore();\n    },\n    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var ctx;\n      var i;\n      \n      //$LASTPOS=28002333;//kernel.Sprites:2333\n      ctx = c.getContext("2d");\n      //$LASTPOS=28002366;//kernel.Sprites:2366\n      ctx.textBaseline="top";\n      //$LASTPOS=28002395;//kernel.Sprites:2395\n      ctx.save();\n      //$LASTPOS=28002412;//kernel.Sprites:2412\n      ctx.strokeStyle="rgb(40,100,200)";\n      //$LASTPOS=28002452;//kernel.Sprites:2452\n      //$LASTPOS=28002457;//kernel.Sprites:2457\n      i = 0;\n      while(i<c.width) {\n        {\n          //$LASTPOS=28002497;//kernel.Sprites:2497\n          ctx.beginPath();\n          //$LASTPOS=28002523;//kernel.Sprites:2523\n          ctx.lineWidth=(i%100==0?4:1);\n          //$LASTPOS=28002569;//kernel.Sprites:2569\n          ctx.moveTo(i,0);\n          //$LASTPOS=28002595;//kernel.Sprites:2595\n          ctx.lineTo(i,c.height);\n          //$LASTPOS=28002628;//kernel.Sprites:2628\n          ctx.closePath();\n          //$LASTPOS=28002654;//kernel.Sprites:2654\n          ctx.stroke();\n        }\n        i+=10;\n      }\n      //$LASTPOS=28002686;//kernel.Sprites:2686\n      //$LASTPOS=28002691;//kernel.Sprites:2691\n      i = 0;\n      while(i<c.height) {\n        {\n          //$LASTPOS=28002732;//kernel.Sprites:2732\n          ctx.beginPath();\n          //$LASTPOS=28002758;//kernel.Sprites:2758\n          ctx.lineWidth=(i%100==0?4:1);\n          //$LASTPOS=28002804;//kernel.Sprites:2804\n          ctx.moveTo(0,i);\n          //$LASTPOS=28002830;//kernel.Sprites:2830\n          ctx.lineTo(c.width,i);\n          //$LASTPOS=28002862;//kernel.Sprites:2862\n          ctx.closePath();\n          //$LASTPOS=28002888;//kernel.Sprites:2888\n          ctx.stroke();\n        }\n        i+=10;\n      }\n      //$LASTPOS=28002914;//kernel.Sprites:2914\n      ctx.fillStyle="white";\n      //$LASTPOS=28002942;//kernel.Sprites:2942\n      ctx.font="15px monospaced";\n      //$LASTPOS=28002975;//kernel.Sprites:2975\n      //$LASTPOS=28002980;//kernel.Sprites:2980\n      i = 100;\n      while(i<c.width) {\n        {\n          //$LASTPOS=28003023;//kernel.Sprites:3023\n          ctx.fillText(i,i,0);\n        }\n        i+=100;\n      }\n      //$LASTPOS=28003057;//kernel.Sprites:3057\n      //$LASTPOS=28003062;//kernel.Sprites:3062\n      i = 100;\n      while(i<c.height) {\n        {\n          //$LASTPOS=28003106;//kernel.Sprites:3106\n          ctx.fillText(i,0,i);\n        }\n        i+=100;\n      }\n      //$LASTPOS=28003140;//kernel.Sprites:3140\n      ctx.restore();\n      \n      _thread.retVal=_this;return;\n    },\n    setImageList :function _trc_Sprites_setImageList(il) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28003192;//kernel.Sprites:3192\n      _this.imageList=il;\n    },\n    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=28003192;//kernel.Sprites:3192\n      _this.imageList=il;\n      \n      _thread.retVal=_this;return;\n    },\n    getImageList :function _trc_Sprites_getImageList() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.imageList;\n    },\n    fiber$getImageList :function _trc_Sprites_f_getImageList(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.imageList;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=28003304;//kernel.Sprites:3304\n      _this.sx=scrollX;\n      //$LASTPOS=28003321;//kernel.Sprites:3321\n      _this.sy=scrollY;\n    },\n    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=28003304;//kernel.Sprites:3304\n      _this.sx=scrollX;\n      //$LASTPOS=28003321;//kernel.Sprites:3321\n      _this.sy=scrollY;\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.BodyActor\',\n  shortName: \'BodyActor\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [Tonyu.classes.kernel.T2Mod],\n  methods: {\n    main :function _trc_BodyActor_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_BodyActor_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getWorld :function _trc_BodyActor_getWorld() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29000064;//kernel.BodyActor:64\n      if (Tonyu.globals.$t2World) {\n        return Tonyu.globals.$t2World;\n      }\n      //$LASTPOS=29000099;//kernel.BodyActor:99\n      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;\n      return Tonyu.globals.$t2World;\n    },\n    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=29000064;//kernel.BodyActor:64\n      if (Tonyu.globals.$t2World) {\n        _thread.retVal=Tonyu.globals.$t2World;return;\n        \n      }\n      //$LASTPOS=29000099;//kernel.BodyActor:99\n      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;\n      _thread.retVal=Tonyu.globals.$t2World;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    onAppear :function _trc_BodyActor_onAppear() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var wworld;\n      var b2Vec2;\n      var b2BodyDef;\n      var b2Body;\n      var b2FixtureDef;\n      var b2Fixture;\n      var b2PolygonShape;\n      var b2CircleShape;\n      var fixDef;\n      var bodyDef;\n      var w;\n      var h;\n      var fps;\n      var r;\n      var ve;\n      var vr;\n      \n      //$LASTPOS=29000162;//kernel.BodyActor:162\n      wworld = _this.getWorld();\n      //$LASTPOS=29000189;//kernel.BodyActor:189\n      _this.world=wworld.world;\n      //$LASTPOS=29000213;//kernel.BodyActor:213\n      _this.scale=wworld.scale;\n      //$LASTPOS=29000237;//kernel.BodyActor:237\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29000280;//kernel.BodyActor:280\n      b2BodyDef = Box2D.Dynamics.b2BodyDef;\n      //$LASTPOS=29000326;//kernel.BodyActor:326\n      b2Body = Box2D.Dynamics.b2Body;\n      //$LASTPOS=29000366;//kernel.BodyActor:366\n      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n      //$LASTPOS=29000418;//kernel.BodyActor:418\n      b2Fixture = Box2D.Dynamics.b2Fixture;\n      //$LASTPOS=29000464;//kernel.BodyActor:464\n      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n      //$LASTPOS=29000528;//kernel.BodyActor:528\n      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n      //$LASTPOS=29000595;//kernel.BodyActor:595\n      fixDef = new b2FixtureDef;\n      //$LASTPOS=29000630;//kernel.BodyActor:630\n      fixDef.density=_this.defv(_this.density,1);\n      //$LASTPOS=29000671;//kernel.BodyActor:671\n      fixDef.friction=_this.defv(_this.friction,0.5);\n      //$LASTPOS=29000714;//kernel.BodyActor:714\n      fixDef.restitution=_this.defv(_this.restitution,0.2);\n      //$LASTPOS=29000768;//kernel.BodyActor:768\n      bodyDef = new b2BodyDef;\n      //$LASTPOS=29000801;//kernel.BodyActor:801\n      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;\n      //$LASTPOS=29000886;//kernel.BodyActor:886\n      bodyDef.position.x=_this.x/_this.scale;\n      //$LASTPOS=29000921;//kernel.BodyActor:921\n      bodyDef.position.y=_this.y/_this.scale;\n      //$LASTPOS=29000956;//kernel.BodyActor:956\n      _this.shape=_this.shape||(_this.radius?"circle":"box");\n      //$LASTPOS=29001004;//kernel.BodyActor:1004\n      w = _this.width;h = _this.height;\n      //$LASTPOS=29001030;//kernel.BodyActor:1030\n      if (! w) {\n        //$LASTPOS=29001048;//kernel.BodyActor:1048\n        _this.detectShape();\n        //$LASTPOS=29001071;//kernel.BodyActor:1071\n        w=_this.width*(_this.scaleX||1);\n        //$LASTPOS=29001100;//kernel.BodyActor:1100\n        h=_this.height*(_this.scaleY||_this.scaleX||1);\n        \n      }\n      //$LASTPOS=29001140;//kernel.BodyActor:1140\n      if (_this.shape=="box") {\n        //$LASTPOS=29001168;//kernel.BodyActor:1168\n        if (! h) {\n          //$LASTPOS=29001176;//kernel.BodyActor:1176\n          h=w;\n        }\n        //$LASTPOS=29001189;//kernel.BodyActor:1189\n        fixDef.shape=new b2PolygonShape;\n        //$LASTPOS=29001232;//kernel.BodyActor:1232\n        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);\n        \n      } else {\n        //$LASTPOS=29001333;//kernel.BodyActor:1333\n        _this.radius=_this.radius||w/2||16;\n        //$LASTPOS=29001369;//kernel.BodyActor:1369\n        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);\n        //$LASTPOS=29001443;//kernel.BodyActor:1443\n        _this.width=_this.height=_this.radius*2;\n        \n      }\n      //$LASTPOS=29001477;//kernel.BodyActor:1477\n      fps = wworld.fps;\n      //$LASTPOS=29001501;//kernel.BodyActor:1501\n      r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);\n      //$LASTPOS=29001582;//kernel.BodyActor:1582\n      _this.body=_this.world.CreateBody(bodyDef);\n      //$LASTPOS=29001618;//kernel.BodyActor:1618\n      _this.body.CreateFixture(fixDef);\n      //$LASTPOS=29001650;//kernel.BodyActor:1650\n      _this.body.SetUserData(_this);\n      //$LASTPOS=29001678;//kernel.BodyActor:1678\n      _this.body.SetLinearVelocity(ve);\n      //$LASTPOS=29001710;//kernel.BodyActor:1710\n      _this.rotation=r;\n      //$LASTPOS=29001726;//kernel.BodyActor:1726\n      _this.vrotation=vr;\n    },\n    fiber$onAppear :function _trc_BodyActor_f_onAppear(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var wworld;\n      var b2Vec2;\n      var b2BodyDef;\n      var b2Body;\n      var b2FixtureDef;\n      var b2Fixture;\n      var b2PolygonShape;\n      var b2CircleShape;\n      var fixDef;\n      var bodyDef;\n      var w;\n      var h;\n      var fps;\n      var r;\n      var ve;\n      var vr;\n      \n      //$LASTPOS=29000162;//kernel.BodyActor:162\n      wworld = _this.getWorld();\n      //$LASTPOS=29000189;//kernel.BodyActor:189\n      _this.world=wworld.world;\n      //$LASTPOS=29000213;//kernel.BodyActor:213\n      _this.scale=wworld.scale;\n      //$LASTPOS=29000237;//kernel.BodyActor:237\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29000280;//kernel.BodyActor:280\n      b2BodyDef = Box2D.Dynamics.b2BodyDef;\n      //$LASTPOS=29000326;//kernel.BodyActor:326\n      b2Body = Box2D.Dynamics.b2Body;\n      //$LASTPOS=29000366;//kernel.BodyActor:366\n      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n      //$LASTPOS=29000418;//kernel.BodyActor:418\n      b2Fixture = Box2D.Dynamics.b2Fixture;\n      //$LASTPOS=29000464;//kernel.BodyActor:464\n      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n      //$LASTPOS=29000528;//kernel.BodyActor:528\n      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n      //$LASTPOS=29000595;//kernel.BodyActor:595\n      fixDef = new b2FixtureDef;\n      \n      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=29000630;//kernel.BodyActor:630\n            _this.fiber$defv(_thread, _this.density, 1);\n            __pc=1;return;\n          case 1:\n            fixDef.density=_thread.retVal;\n            \n            //$LASTPOS=29000671;//kernel.BodyActor:671\n            _this.fiber$defv(_thread, _this.friction, 0.5);\n            __pc=2;return;\n          case 2:\n            fixDef.friction=_thread.retVal;\n            \n            //$LASTPOS=29000714;//kernel.BodyActor:714\n            _this.fiber$defv(_thread, _this.restitution, 0.2);\n            __pc=3;return;\n          case 3:\n            fixDef.restitution=_thread.retVal;\n            \n            //$LASTPOS=29000768;//kernel.BodyActor:768\n            bodyDef = new b2BodyDef;\n            //$LASTPOS=29000801;//kernel.BodyActor:801\n            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;\n            //$LASTPOS=29000886;//kernel.BodyActor:886\n            bodyDef.position.x=_this.x/_this.scale;\n            //$LASTPOS=29000921;//kernel.BodyActor:921\n            bodyDef.position.y=_this.y/_this.scale;\n            //$LASTPOS=29000956;//kernel.BodyActor:956\n            _this.shape=_this.shape||(_this.radius?"circle":"box");\n            //$LASTPOS=29001004;//kernel.BodyActor:1004\n            w = _this.width;h = _this.height;\n            //$LASTPOS=29001030;//kernel.BodyActor:1030\n            if (! w) {\n              //$LASTPOS=29001048;//kernel.BodyActor:1048\n              _this.detectShape();\n              //$LASTPOS=29001071;//kernel.BodyActor:1071\n              w=_this.width*(_this.scaleX||1);\n              //$LASTPOS=29001100;//kernel.BodyActor:1100\n              h=_this.height*(_this.scaleY||_this.scaleX||1);\n              \n            }\n            //$LASTPOS=29001140;//kernel.BodyActor:1140\n            if (_this.shape=="box") {\n              //$LASTPOS=29001168;//kernel.BodyActor:1168\n              if (! h) {\n                //$LASTPOS=29001176;//kernel.BodyActor:1176\n                h=w;\n              }\n              //$LASTPOS=29001189;//kernel.BodyActor:1189\n              fixDef.shape=new b2PolygonShape;\n              //$LASTPOS=29001232;//kernel.BodyActor:1232\n              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);\n              \n            } else {\n              //$LASTPOS=29001333;//kernel.BodyActor:1333\n              _this.radius=_this.radius||w/2||16;\n              //$LASTPOS=29001369;//kernel.BodyActor:1369\n              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);\n              //$LASTPOS=29001443;//kernel.BodyActor:1443\n              _this.width=_this.height=_this.radius*2;\n              \n            }\n            //$LASTPOS=29001477;//kernel.BodyActor:1477\n            fps = wworld.fps;\n            //$LASTPOS=29001501;//kernel.BodyActor:1501\n            r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);\n            //$LASTPOS=29001582;//kernel.BodyActor:1582\n            _this.body=_this.world.CreateBody(bodyDef);\n            //$LASTPOS=29001618;//kernel.BodyActor:1618\n            _this.body.CreateFixture(fixDef);\n            //$LASTPOS=29001650;//kernel.BodyActor:1650\n            _this.body.SetUserData(_this);\n            //$LASTPOS=29001678;//kernel.BodyActor:1678\n            _this.body.SetLinearVelocity(ve);\n            //$LASTPOS=29001710;//kernel.BodyActor:1710\n            _this.rotation=r;\n            //$LASTPOS=29001726;//kernel.BodyActor:1726\n            _this.vrotation=vr;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    allContactPoints :function _trc_BodyActor_allContactPoints(klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var m;\n      var point;\n      var w;\n      var c;\n      var a;\n      var b;\n      \n      //$LASTPOS=29001773;//kernel.BodyActor:1773\n      res = [];m;point;\n      //$LASTPOS=29001797;//kernel.BodyActor:1797\n      w = _this.getWorld();\n      //$LASTPOS=29001819;//kernel.BodyActor:1819\n      //$LASTPOS=29001824;//kernel.BodyActor:1824\n      c = _this.world.GetContactList();\n      while(c) {\n        {\n          //$LASTPOS=29001880;//kernel.BodyActor:1880\n          if (c.IsTouching()) {\n            //$LASTPOS=29001911;//kernel.BodyActor:1911\n            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);\n            //$LASTPOS=29001982;//kernel.BodyActor:1982\n            if (m.m_points[0]) {\n              //$LASTPOS=29002019;//kernel.BodyActor:2019\n              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {\n                //$LASTPOS=29002092;//kernel.BodyActor:2092\n                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};\n                \n              } else {\n                //$LASTPOS=29002263;//kernel.BodyActor:2263\n                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};\n                \n              }\n              \n            } else {\n              //$LASTPOS=29002363;//kernel.BodyActor:2363\n              point={x: _this.x,y: _this.y};\n            }\n            //$LASTPOS=29002388;//kernel.BodyActor:2388\n            a = c.GetFixtureA().GetBody().GetUserData();\n            //$LASTPOS=29002447;//kernel.BodyActor:2447\n            b = c.GetFixtureB().GetBody().GetUserData();\n            //$LASTPOS=29002506;//kernel.BodyActor:2506\n            if (a===_this) {\n              //$LASTPOS=29002538;//kernel.BodyActor:2538\n              if (! klass||b===klass||b instanceof klass) {\n                //$LASTPOS=29002607;//kernel.BodyActor:2607\n                res.push({target: b,manifold: m,x: point.x,y: point.y});\n                \n              }\n              \n            } else {\n              //$LASTPOS=29002698;//kernel.BodyActor:2698\n              if (b===_this) {\n                //$LASTPOS=29002730;//kernel.BodyActor:2730\n                if (! klass||a===klass||a instanceof klass) {\n                  //$LASTPOS=29002799;//kernel.BodyActor:2799\n                  res.push({target: a,manifold: m,x: point.x,y: point.y});\n                  \n                }\n                \n              }\n            }\n            \n          }\n        }\n        c=c.GetNext();\n      }\n      return res;\n    },\n    fiber$allContactPoints :function _trc_BodyActor_f_allContactPoints(_thread,klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var res;\n      var m;\n      var point;\n      var w;\n      var c;\n      var a;\n      var b;\n      \n      //$LASTPOS=29001773;//kernel.BodyActor:1773\n      res = [];m;point;\n      //$LASTPOS=29001797;//kernel.BodyActor:1797\n      w = _this.getWorld();\n      //$LASTPOS=29001819;//kernel.BodyActor:1819\n      //$LASTPOS=29001824;//kernel.BodyActor:1824\n      c = _this.world.GetContactList();\n      while(c) {\n        {\n          //$LASTPOS=29001880;//kernel.BodyActor:1880\n          if (c.IsTouching()) {\n            //$LASTPOS=29001911;//kernel.BodyActor:1911\n            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);\n            //$LASTPOS=29001982;//kernel.BodyActor:1982\n            if (m.m_points[0]) {\n              //$LASTPOS=29002019;//kernel.BodyActor:2019\n              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {\n                //$LASTPOS=29002092;//kernel.BodyActor:2092\n                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};\n                \n              } else {\n                //$LASTPOS=29002263;//kernel.BodyActor:2263\n                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};\n                \n              }\n              \n            } else {\n              //$LASTPOS=29002363;//kernel.BodyActor:2363\n              point={x: _this.x,y: _this.y};\n            }\n            //$LASTPOS=29002388;//kernel.BodyActor:2388\n            a = c.GetFixtureA().GetBody().GetUserData();\n            //$LASTPOS=29002447;//kernel.BodyActor:2447\n            b = c.GetFixtureB().GetBody().GetUserData();\n            //$LASTPOS=29002506;//kernel.BodyActor:2506\n            if (a===_this) {\n              //$LASTPOS=29002538;//kernel.BodyActor:2538\n              if (! klass||b===klass||b instanceof klass) {\n                //$LASTPOS=29002607;//kernel.BodyActor:2607\n                res.push({target: b,manifold: m,x: point.x,y: point.y});\n                \n              }\n              \n            } else {\n              //$LASTPOS=29002698;//kernel.BodyActor:2698\n              if (b===_this) {\n                //$LASTPOS=29002730;//kernel.BodyActor:2730\n                if (! klass||a===klass||a instanceof klass) {\n                  //$LASTPOS=29002799;//kernel.BodyActor:2799\n                  res.push({target: a,manifold: m,x: point.x,y: point.y});\n                  \n                }\n                \n              }\n            }\n            \n          }\n        }\n        c=c.GetNext();\n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    contactPoint :function _trc_BodyActor_contactPoint(klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.allContactPoints(klass)[0];\n    },\n    fiber$contactPoint :function _trc_BodyActor_f_contactPoint(_thread,klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.allContactPoints(klass)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    allContact :function _trc_BodyActor_allContact(klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.allContacts(klass);\n    },\n    fiber$allContact :function _trc_BodyActor_f_allContact(_thread,klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.allContacts(klass);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    allContacts :function _trc_BodyActor_allContacts(klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      var c;\n      var a;\n      var b;\n      \n      //$LASTPOS=29003061;//kernel.BodyActor:3061\n      res = [];\n      //$LASTPOS=29003077;//kernel.BodyActor:3077\n      //$LASTPOS=29003082;//kernel.BodyActor:3082\n      c = _this.world.GetContactList();\n      while(c) {\n        {\n          //$LASTPOS=29003138;//kernel.BodyActor:3138\n          if (c.IsTouching()) {\n            //$LASTPOS=29003172;//kernel.BodyActor:3172\n            a = c.GetFixtureA().GetBody().GetUserData();\n            //$LASTPOS=29003231;//kernel.BodyActor:3231\n            b = c.GetFixtureB().GetBody().GetUserData();\n            //$LASTPOS=29003290;//kernel.BodyActor:3290\n            if (a===_this) {\n              //$LASTPOS=29003322;//kernel.BodyActor:3322\n              if (! klass||b===klass||b instanceof klass) {\n                //$LASTPOS=29003391;//kernel.BodyActor:3391\n                res.push(b);\n                \n              }\n              \n            } else {\n              //$LASTPOS=29003441;//kernel.BodyActor:3441\n              if (b===_this) {\n                //$LASTPOS=29003473;//kernel.BodyActor:3473\n                if (! klass||a===klass||a instanceof klass) {\n                  //$LASTPOS=29003542;//kernel.BodyActor:3542\n                  res.push(a);\n                  \n                }\n                \n              }\n            }\n            \n          }\n        }\n        c=c.GetNext();\n      }\n      return res;\n    },\n    fiber$allContacts :function _trc_BodyActor_f_allContacts(_thread,klass) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var res;\n      var c;\n      var a;\n      var b;\n      \n      //$LASTPOS=29003061;//kernel.BodyActor:3061\n      res = [];\n      //$LASTPOS=29003077;//kernel.BodyActor:3077\n      //$LASTPOS=29003082;//kernel.BodyActor:3082\n      c = _this.world.GetContactList();\n      while(c) {\n        {\n          //$LASTPOS=29003138;//kernel.BodyActor:3138\n          if (c.IsTouching()) {\n            //$LASTPOS=29003172;//kernel.BodyActor:3172\n            a = c.GetFixtureA().GetBody().GetUserData();\n            //$LASTPOS=29003231;//kernel.BodyActor:3231\n            b = c.GetFixtureB().GetBody().GetUserData();\n            //$LASTPOS=29003290;//kernel.BodyActor:3290\n            if (a===_this) {\n              //$LASTPOS=29003322;//kernel.BodyActor:3322\n              if (! klass||b===klass||b instanceof klass) {\n                //$LASTPOS=29003391;//kernel.BodyActor:3391\n                res.push(b);\n                \n              }\n              \n            } else {\n              //$LASTPOS=29003441;//kernel.BodyActor:3441\n              if (b===_this) {\n                //$LASTPOS=29003473;//kernel.BodyActor:3473\n                if (! klass||a===klass||a instanceof klass) {\n                  //$LASTPOS=29003542;//kernel.BodyActor:3542\n                  res.push(a);\n                  \n                }\n                \n              }\n            }\n            \n          }\n        }\n        c=c.GetNext();\n      }\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    applyForce :function _trc_BodyActor_applyForce(fx,fy,px,py) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b2Vec2;\n      var scale;\n      var fps;\n      \n      //$LASTPOS=29003652;//kernel.BodyActor:3652\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29003695;//kernel.BodyActor:3695\n      scale = _this.getWorld().scale;\n      //$LASTPOS=29003727;//kernel.BodyActor:3727\n      fps = 60;\n      //$LASTPOS=29003743;//kernel.BodyActor:3743\n      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());\n    },\n    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b2Vec2;\n      var scale;\n      var fps;\n      \n      //$LASTPOS=29003652;//kernel.BodyActor:3652\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29003695;//kernel.BodyActor:3695\n      scale = _this.getWorld().scale;\n      //$LASTPOS=29003727;//kernel.BodyActor:3727\n      fps = 60;\n      //$LASTPOS=29003743;//kernel.BodyActor:3743\n      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());\n      \n      _thread.retVal=_this;return;\n    },\n    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b2Vec2;\n      var scale;\n      var fps;\n      \n      //$LASTPOS=29003834;//kernel.BodyActor:3834\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29003877;//kernel.BodyActor:3877\n      scale = _this.getWorld().scale;\n      //$LASTPOS=29003909;//kernel.BodyActor:3909\n      fps = 60;\n      //$LASTPOS=29003925;//kernel.BodyActor:3925\n      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());\n    },\n    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b2Vec2;\n      var scale;\n      var fps;\n      \n      //$LASTPOS=29003834;//kernel.BodyActor:3834\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29003877;//kernel.BodyActor:3877\n      scale = _this.getWorld().scale;\n      //$LASTPOS=29003909;//kernel.BodyActor:3909\n      fps = 60;\n      //$LASTPOS=29003925;//kernel.BodyActor:3925\n      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());\n      \n      _thread.retVal=_this;return;\n    },\n    applyTorque :function _trc_BodyActor_applyTorque(a) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29004008;//kernel.BodyActor:4008\n      _this.body.ApplyTorque(a);\n    },\n    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=29004008;//kernel.BodyActor:4008\n      _this.body.ApplyTorque(a);\n      \n      _thread.retVal=_this;return;\n    },\n    moveBy :function _trc_BodyActor_moveBy(dx,dy) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var pos;\n      \n      //$LASTPOS=29004052;//kernel.BodyActor:4052\n      pos = _this.body.GetPosition();\n      //$LASTPOS=29004084;//kernel.BodyActor:4084\n      pos.x+=dx/_this.scale;\n      //$LASTPOS=29004105;//kernel.BodyActor:4105\n      pos.y+=dy/_this.scale;\n      //$LASTPOS=29004126;//kernel.BodyActor:4126\n      _this.body.SetPosition(pos);\n    },\n    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var pos;\n      \n      //$LASTPOS=29004052;//kernel.BodyActor:4052\n      pos = _this.body.GetPosition();\n      //$LASTPOS=29004084;//kernel.BodyActor:4084\n      pos.x+=dx/_this.scale;\n      //$LASTPOS=29004105;//kernel.BodyActor:4105\n      pos.y+=dy/_this.scale;\n      //$LASTPOS=29004126;//kernel.BodyActor:4126\n      _this.body.SetPosition(pos);\n      \n      _thread.retVal=_this;return;\n    },\n    contactTo :function _trc_BodyActor_contactTo(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.allContact(t)[0];\n    },\n    fiber$contactTo :function _trc_BodyActor_f_contactTo(_thread,t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.allContact(t)[0];return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    die :function _trc_BodyActor_die() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29004211;//kernel.BodyActor:4211\n      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);\n      //$LASTPOS=29004228;//kernel.BodyActor:4228\n      _this.world.DestroyBody(_this.body);\n    },\n    addRevoluteJoint :function _trc_BodyActor_addRevoluteJoint(params) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var px;\n      var py;\n      var wworld;\n      var scale;\n      var world;\n      var b2BodyDef;\n      var b2Body;\n      var JDC;\n      var jd;\n      var bodyDef;\n      var bodyB;\n      var b2Vec2;\n      \n      //$LASTPOS=29004316;//kernel.BodyActor:4316\n      params=params||{};\n      //$LASTPOS=29004339;//kernel.BodyActor:4339\n      px = params.x||_this.x;\n      //$LASTPOS=29004363;//kernel.BodyActor:4363\n      py = params.y||_this.y;\n      //$LASTPOS=29004387;//kernel.BodyActor:4387\n      wworld = _this.getWorld();\n      //$LASTPOS=29004428;//kernel.BodyActor:4428\n      scale = wworld.scale;\n      //$LASTPOS=29004456;//kernel.BodyActor:4456\n      world = wworld.world;\n      //$LASTPOS=29004484;//kernel.BodyActor:4484\n      b2BodyDef = Box2D.Dynamics.b2BodyDef;\n      //$LASTPOS=29004530;//kernel.BodyActor:4530\n      b2Body = Box2D.Dynamics.b2Body;\n      //$LASTPOS=29004570;//kernel.BodyActor:4570\n      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;\n      //$LASTPOS=29004624;//kernel.BodyActor:4624\n      jd = new JDC;\n      //$LASTPOS=29004644;//kernel.BodyActor:4644\n      bodyDef = new b2BodyDef;\n      //$LASTPOS=29004677;//kernel.BodyActor:4677\n      bodyDef.type=b2Body.b2_staticBody;\n      //$LASTPOS=29004718;//kernel.BodyActor:4718\n      bodyDef.position.x=px/scale;\n      //$LASTPOS=29004754;//kernel.BodyActor:4754\n      bodyDef.position.y=py/scale;\n      //$LASTPOS=29004790;//kernel.BodyActor:4790\n      bodyB = world.CreateBody(bodyDef);\n      //$LASTPOS=29004831;//kernel.BodyActor:4831\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29004874;//kernel.BodyActor:4874\n      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));\n      //$LASTPOS=29004936;//kernel.BodyActor:4936\n      if (params.lowerAngle&&params.upperAngle) {\n        //$LASTPOS=29004989;//kernel.BodyActor:4989\n        jd.lowerAngle=_this.rad(params.lowerAngle);\n        //$LASTPOS=29005036;//kernel.BodyActor:5036\n        jd.upperAngle=_this.rad(params.upperAngle);\n        //$LASTPOS=29005083;//kernel.BodyActor:5083\n        jd.enableLimit=true;\n        \n      }\n      //$LASTPOS=29005116;//kernel.BodyActor:5116\n      world.CreateJoint(jd);\n    },\n    fiber$addRevoluteJoint :function _trc_BodyActor_f_addRevoluteJoint(_thread,params) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var px;\n      var py;\n      var wworld;\n      var scale;\n      var world;\n      var b2BodyDef;\n      var b2Body;\n      var JDC;\n      var jd;\n      var bodyDef;\n      var bodyB;\n      var b2Vec2;\n      \n      //$LASTPOS=29004316;//kernel.BodyActor:4316\n      params=params||{};\n      //$LASTPOS=29004339;//kernel.BodyActor:4339\n      px = params.x||_this.x;\n      //$LASTPOS=29004363;//kernel.BodyActor:4363\n      py = params.y||_this.y;\n      //$LASTPOS=29004387;//kernel.BodyActor:4387\n      wworld = _this.getWorld();\n      //$LASTPOS=29004428;//kernel.BodyActor:4428\n      scale = wworld.scale;\n      //$LASTPOS=29004456;//kernel.BodyActor:4456\n      world = wworld.world;\n      //$LASTPOS=29004484;//kernel.BodyActor:4484\n      b2BodyDef = Box2D.Dynamics.b2BodyDef;\n      //$LASTPOS=29004530;//kernel.BodyActor:4530\n      b2Body = Box2D.Dynamics.b2Body;\n      //$LASTPOS=29004570;//kernel.BodyActor:4570\n      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;\n      //$LASTPOS=29004624;//kernel.BodyActor:4624\n      jd = new JDC;\n      //$LASTPOS=29004644;//kernel.BodyActor:4644\n      bodyDef = new b2BodyDef;\n      //$LASTPOS=29004677;//kernel.BodyActor:4677\n      bodyDef.type=b2Body.b2_staticBody;\n      //$LASTPOS=29004718;//kernel.BodyActor:4718\n      bodyDef.position.x=px/scale;\n      //$LASTPOS=29004754;//kernel.BodyActor:4754\n      bodyDef.position.y=py/scale;\n      //$LASTPOS=29004790;//kernel.BodyActor:4790\n      bodyB = world.CreateBody(bodyDef);\n      //$LASTPOS=29004831;//kernel.BodyActor:4831\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=29004874;//kernel.BodyActor:4874\n      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));\n      //$LASTPOS=29004936;//kernel.BodyActor:4936\n      if (params.lowerAngle&&params.upperAngle) {\n        //$LASTPOS=29004989;//kernel.BodyActor:4989\n        jd.lowerAngle=_this.rad(params.lowerAngle);\n        //$LASTPOS=29005036;//kernel.BodyActor:5036\n        jd.upperAngle=_this.rad(params.upperAngle);\n        //$LASTPOS=29005083;//kernel.BodyActor:5083\n        jd.enableLimit=true;\n        \n      }\n      //$LASTPOS=29005116;//kernel.BodyActor:5116\n      world.CreateJoint(jd);\n      \n      _thread.retVal=_this;return;\n    },\n    __getter__rotation :function _trc_BodyActor___getter__rotation() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29005161;//kernel.BodyActor:5161\n      if (! _this.body||_this.manualRotation) {\n        return _this._rotation;\n      }\n      return _this.deg(_this.body.GetAngle());\n    },\n    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29005261;//kernel.BodyActor:5261\n      r=r||0;\n      //$LASTPOS=29005273;//kernel.BodyActor:5273\n      if (! _this.body||_this.manualRotation) {\n        return _this._rotation=r;\n      }\n      //$LASTPOS=29005326;//kernel.BodyActor:5326\n      _this.body.SetAngle(_this.rad(r));\n    },\n    updatePos :function _trc_BodyActor_updatePos() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$updatePos :function _trc_BodyActor_f_updatePos(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __getter__x :function _trc_BodyActor___getter__x() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var pos;\n      \n      //$LASTPOS=29005509;//kernel.BodyActor:5509\n      if (! _this.body) {\n        return _this._x;\n      }\n      //$LASTPOS=29005535;//kernel.BodyActor:5535\n      pos = _this.body.GetPosition();\n      return pos.x*_this.scale;\n    },\n    __setter__x :function _trc_BodyActor___setter__x(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var pos;\n      \n      //$LASTPOS=29005600;//kernel.BodyActor:5600\n      if (! _this.body) {\n        return _this._x=v;\n      }\n      //$LASTPOS=29005628;//kernel.BodyActor:5628\n      v=v||0;\n      //$LASTPOS=29005640;//kernel.BodyActor:5640\n      pos = _this.body.GetPosition();\n      //$LASTPOS=29005672;//kernel.BodyActor:5672\n      pos.x=v/_this.scale;\n      //$LASTPOS=29005691;//kernel.BodyActor:5691\n      _this.body.SetPosition(pos);\n    },\n    __getter__y :function _trc_BodyActor___getter__y() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var pos;\n      \n      //$LASTPOS=29005725;//kernel.BodyActor:5725\n      if (! _this.body) {\n        return _this._y;\n      }\n      //$LASTPOS=29005751;//kernel.BodyActor:5751\n      pos = _this.body.GetPosition();\n      return pos.y*_this.scale;\n    },\n    __setter__y :function _trc_BodyActor___setter__y(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var pos;\n      \n      //$LASTPOS=29005816;//kernel.BodyActor:5816\n      if (! _this.body) {\n        return _this._y=v;\n      }\n      //$LASTPOS=29005844;//kernel.BodyActor:5844\n      v=v||0;\n      //$LASTPOS=29005856;//kernel.BodyActor:5856\n      pos = _this.body.GetPosition();\n      //$LASTPOS=29005888;//kernel.BodyActor:5888\n      pos.y=v/_this.scale;\n      //$LASTPOS=29005907;//kernel.BodyActor:5907\n      _this.body.SetPosition(pos);\n    },\n    __getter__vx :function _trc_BodyActor___getter__vx() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var v;\n      \n      //$LASTPOS=29005943;//kernel.BodyActor:5943\n      if (! _this.body) {\n        return _this._vx;\n      }\n      //$LASTPOS=29005970;//kernel.BodyActor:5970\n      v = _this.body.GetLinearVelocity();\n      return v.x*_this.scale/_this.getWorld().fps;\n    },\n    __setter__vx :function _trc_BodyActor___setter__vx(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ve;\n      \n      //$LASTPOS=29006053;//kernel.BodyActor:6053\n      if (! _this.body) {\n        return _this._vx=v;\n      }\n      //$LASTPOS=29006082;//kernel.BodyActor:6082\n      v=v||0;\n      //$LASTPOS=29006094;//kernel.BodyActor:6094\n      ve = _this.body.GetLinearVelocity();\n      //$LASTPOS=29006131;//kernel.BodyActor:6131\n      ve.x=v/_this.scale*_this.getWorld().fps;\n      //$LASTPOS=29006164;//kernel.BodyActor:6164\n      if (v) {\n        //$LASTPOS=29006171;//kernel.BodyActor:6171\n        _this.body.SetAwake(true);\n      }\n      //$LASTPOS=29006196;//kernel.BodyActor:6196\n      _this.body.SetLinearVelocity(ve);\n    },\n    __getter__vy :function _trc_BodyActor___getter__vy() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var v;\n      \n      //$LASTPOS=29006237;//kernel.BodyActor:6237\n      if (! _this.body) {\n        return _this._vy;\n      }\n      //$LASTPOS=29006264;//kernel.BodyActor:6264\n      v = _this.body.GetLinearVelocity();\n      return v.y*_this.scale/_this.getWorld().fps;\n    },\n    __setter__vy :function _trc_BodyActor___setter__vy(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var ve;\n      \n      //$LASTPOS=29006347;//kernel.BodyActor:6347\n      if (! _this.body) {\n        return _this._vy=v;\n      }\n      //$LASTPOS=29006376;//kernel.BodyActor:6376\n      ve = _this.body.GetLinearVelocity();\n      //$LASTPOS=29006413;//kernel.BodyActor:6413\n      ve.y=v/_this.scale*_this.getWorld().fps;\n      //$LASTPOS=29006446;//kernel.BodyActor:6446\n      if (v) {\n        //$LASTPOS=29006453;//kernel.BodyActor:6453\n        _this.body.SetAwake(true);\n      }\n      //$LASTPOS=29006478;//kernel.BodyActor:6478\n      _this.body.SetLinearVelocity(ve);\n    },\n    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29006525;//kernel.BodyActor:6525\n      if (! _this.body) {\n        return _this._vr;\n      }\n      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);\n    },\n    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=29006627;//kernel.BodyActor:6627\n      if (! _this.body) {\n        return _this._vr=v;\n      }\n      //$LASTPOS=29006656;//kernel.BodyActor:6656\n      v=v||0;\n      //$LASTPOS=29006668;//kernel.BodyActor:6668\n      if (v) {\n        //$LASTPOS=29006675;//kernel.BodyActor:6675\n        _this.body.SetAwake(true);\n      }\n      //$LASTPOS=29006700;//kernel.BodyActor:6700\n      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContactPoints":{"nowait":false},"contactPoint":{"nowait":false},"allContact":{"nowait":false},"allContacts":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"updatePos":{"nowait":false},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T2Body\',\n  shortName: \'T2Body\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.BodyActor,\n  includes: [],\n  methods: {\n    main :function _trc_T2Body_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T2Body_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T2World\',\n  shortName: \'T2World\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [Tonyu.classes.kernel.T2Mod],\n  methods: {\n    main :function _trc_T2World_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=30000150;//kernel.T2World:150\n      _this.loop();\n    },\n    fiber$main :function _trc_T2World_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_T2World_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=30000150;//kernel.T2World:150\n            _this.fiber$loop(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    onAppear :function _trc_T2World_onAppear() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=30000086;//kernel.T2World:86\n      Tonyu.globals.$currentProject.requestPlugin("box2d");\n      //$LASTPOS=30000133;//kernel.T2World:133\n      _this.initWorld();\n    },\n    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=30000086;//kernel.T2World:86\n      Tonyu.globals.$currentProject.requestPlugin("box2d");\n      \n      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=30000133;//kernel.T2World:133\n            _this.fiber$initWorld(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initWorld :function _trc_T2World_initWorld() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b2World;\n      var b2Vec2;\n      \n      //$LASTPOS=30000183;//kernel.T2World:183\n      _this.gravity=_this.defv(_this.gravity,9.8);\n      //$LASTPOS=30000216;//kernel.T2World:216\n      _this.gravityX=_this.defv(_this.gravityX,0);\n      //$LASTPOS=30000249;//kernel.T2World:249\n      _this.fps=Tonyu.globals.$Boot.getFrameRate();\n      //$LASTPOS=30000280;//kernel.T2World:280\n      b2World = Box2D.Dynamics.b2World;\n      //$LASTPOS=30000323;//kernel.T2World:323\n      b2Vec2 = Box2D.Common.Math.b2Vec2;\n      //$LASTPOS=30000367;//kernel.T2World:367\n      _this.scale=_this.scale||32;\n      //$LASTPOS=30000391;//kernel.T2World:391\n      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);\n      //$LASTPOS=30000516;//kernel.T2World:516\n      Tonyu.globals.$t2World=_this;\n      //$LASTPOS=30000536;//kernel.T2World:536\n      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));\n      //$LASTPOS=30000572;//kernel.T2World:572\n      _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));\n    },\n    fiber$initWorld :function _trc_T2World_f_initWorld(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b2World;\n      var b2Vec2;\n      \n      \n      _thread.enter(function _trc_T2World_ent_initWorld(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=30000183;//kernel.T2World:183\n            _this.fiber$defv(_thread, _this.gravity, 9.8);\n            __pc=1;return;\n          case 1:\n            _this.gravity=_thread.retVal;\n            \n            //$LASTPOS=30000216;//kernel.T2World:216\n            _this.fiber$defv(_thread, _this.gravityX, 0);\n            __pc=2;return;\n          case 2:\n            _this.gravityX=_thread.retVal;\n            \n            //$LASTPOS=30000249;//kernel.T2World:249\n            _this.fps=Tonyu.globals.$Boot.getFrameRate();\n            //$LASTPOS=30000280;//kernel.T2World:280\n            b2World = Box2D.Dynamics.b2World;\n            //$LASTPOS=30000323;//kernel.T2World:323\n            b2Vec2 = Box2D.Common.Math.b2Vec2;\n            //$LASTPOS=30000367;//kernel.T2World:367\n            _this.scale=_this.scale||32;\n            //$LASTPOS=30000391;//kernel.T2World:391\n            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);\n            //$LASTPOS=30000516;//kernel.T2World:516\n            Tonyu.globals.$t2World=_this;\n            //$LASTPOS=30000536;//kernel.T2World:536\n            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));\n            //$LASTPOS=30000572;//kernel.T2World:572\n            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    releaseWorld :function _trc_T2World_releaseWorld() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=30000623;//kernel.T2World:623\n      if (Tonyu.globals.$t2World===_this) {\n        //$LASTPOS=30000644;//kernel.T2World:644\n        Tonyu.globals.$t2World=null;\n      }\n    },\n    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=30000623;//kernel.T2World:623\n      if (Tonyu.globals.$t2World===_this) {\n        //$LASTPOS=30000644;//kernel.T2World:644\n        Tonyu.globals.$t2World=null;\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    loop :function _trc_T2World_loop() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=30000680;//kernel.T2World:680\n      while (true) {\n        //$LASTPOS=30000703;//kernel.T2World:703\n        _this.fps=Tonyu.globals.$Boot.getFrameRate();\n        //$LASTPOS=30000738;//kernel.T2World:738\n        _this.world.Step(1/_this.fps,10,10);\n        //$LASTPOS=30000922;//kernel.T2World:922\n        _this.world.ClearForces();\n        //$LASTPOS=30000976;//kernel.T2World:976\n        _this.update();\n        \n      }\n    },\n    fiber$loop :function _trc_T2World_f_loop(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_T2World_ent_loop(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=30000680;//kernel.T2World:680\n          case 1:\n            //$LASTPOS=30000703;//kernel.T2World:703\n            _this.fps=Tonyu.globals.$Boot.getFrameRate();\n            //$LASTPOS=30000738;//kernel.T2World:738\n            _this.world.Step(1/_this.fps,10,10);\n            //$LASTPOS=30000922;//kernel.T2World:922\n            _this.world.ClearForces();\n            //$LASTPOS=30000976;//kernel.T2World:976\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    updatePos :function _trc_T2World_updatePos() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var b;\n      var d;\n      \n      //$LASTPOS=30001017;//kernel.T2World:1017\n      //$LASTPOS=30001022;//kernel.T2World:1022\n      b = _this.world.GetBodyList();\n      while(b) {\n        {\n          //$LASTPOS=30001076;//kernel.T2World:1076\n          d = b.GetUserData();\n          //$LASTPOS=30001108;//kernel.T2World:1108\n          if (d) {\n            //$LASTPOS=30001114;//kernel.T2World:1114\n            d.updatePos();\n          }\n        }\n        b=b.GetNext();\n      }\n    },\n    fiber$updatePos :function _trc_T2World_f_updatePos(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var b;\n      var d;\n      \n      //$LASTPOS=30001017;//kernel.T2World:1017\n      //$LASTPOS=30001022;//kernel.T2World:1022\n      b = _this.world.GetBodyList();\n      while(b) {\n        {\n          //$LASTPOS=30001076;//kernel.T2World:1076\n          d = b.GetUserData();\n          //$LASTPOS=30001108;//kernel.T2World:1108\n          if (d) {\n            //$LASTPOS=30001114;//kernel.T2World:1114\n            d.updatePos();\n          }\n        }\n        b=b.GetNext();\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T2MediaPlayer\',\n  shortName: \'T2MediaPlayer\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_T2MediaPlayer_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T2MediaPlayer_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_T2MediaPlayer_initialize() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31000069;//kernel.T2MediaPlayer:69\n      _this.initT2MediaPlayer();\n    },\n    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31000124;//kernel.T2MediaPlayer:124\n      if (T2MediaLib.inited) {\n        return _this;\n      }\n      //$LASTPOS=31000160;//kernel.T2MediaPlayer:160\n      T2MediaLib.init();\n      //$LASTPOS=31000184;//kernel.T2MediaPlayer:184\n      T2MediaLib.inited=true;\n      //$LASTPOS=31000213;//kernel.T2MediaPlayer:213\n      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;\n    },\n    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31000124;//kernel.T2MediaPlayer:124\n      if (T2MediaLib.inited) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=31000160;//kernel.T2MediaPlayer:160\n      T2MediaLib.init();\n      //$LASTPOS=31000184;//kernel.T2MediaPlayer:184\n      T2MediaLib.inited=true;\n      //$LASTPOS=31000213;//kernel.T2MediaPlayer:213\n      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;\n      \n      _thread.retVal=_this;return;\n    },\n    clearSEData :function _trc_T2MediaPlayer_clearSEData() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31000281;//kernel.T2MediaPlayer:281\n      T2MediaLib.allStopBGM();\n      //$LASTPOS=31000311;//kernel.T2MediaPlayer:311\n      T2MediaLib.allClearData();\n    },\n    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31000281;//kernel.T2MediaPlayer:281\n      T2MediaLib.allStopBGM();\n      //$LASTPOS=31000311;//kernel.T2MediaPlayer:311\n      T2MediaLib.allClearData();\n      \n      _thread.retVal=_this;return;\n    },\n    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31000367;//kernel.T2MediaPlayer:367\n      _this.clearSEData();\n    },\n    fiber$clearBGMData :function _trc_T2MediaPlayer_f_clearBGMData(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_T2MediaPlayer_ent_clearBGMData(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=31000367;//kernel.T2MediaPlayer:367\n            _this.fiber$clearSEData(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    deleteSEData :function _trc_T2MediaPlayer_deleteSEData(idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31000414;//kernel.T2MediaPlayer:414\n      T2MediaLib.clearData(idx);\n    },\n    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31000414;//kernel.T2MediaPlayer:414\n      T2MediaLib.clearData(idx);\n      \n      _thread.retVal=_this;return;\n    },\n    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var data;\n      \n      //$LASTPOS=31000508;//kernel.T2MediaPlayer:508\n      _this.runAsync((function anonymous_517(succ,err) {\n        \n        //$LASTPOS=31000567;//kernel.T2MediaPlayer:567\n        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});\n      }));\n      //$LASTPOS=31000620;//kernel.T2MediaPlayer:620\n      data = T2MediaLib.getSEData(idx);\n      return data;\n    },\n    fiber$loadSE :function _trc_T2MediaPlayer_f_loadSE(_thread,idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var data;\n      \n      \n      _thread.enter(function _trc_T2MediaPlayer_ent_loadSE(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=31000508;//kernel.T2MediaPlayer:508\n            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {\n              \n              //$LASTPOS=31000567;//kernel.T2MediaPlayer:567\n              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});\n            }));\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=31000620;//kernel.T2MediaPlayer:620\n            data = T2MediaLib.getSEData(idx);\n            _thread.exit(data);return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    __getter__available :function _trc_T2MediaPlayer___getter__available() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return ! ! T2MediaLib.context;\n    },\n    loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var r;\n      var s;\n      var _it_281;\n      var name;\n      var url;\n      var e;\n      \n      //$LASTPOS=31000881;//kernel.T2MediaPlayer:881\n      if (! _this.available) {\n        return _this;\n      }\n      //$LASTPOS=31000910;//kernel.T2MediaPlayer:910\n      r = prj.getResource();\n      //$LASTPOS=31000940;//kernel.T2MediaPlayer:940\n      if (! r||! r.sounds) {\n        return _this;\n      }\n      //$LASTPOS=31000974;//kernel.T2MediaPlayer:974\n      _it_281=Tonyu.iterator(r.sounds,1);\n      while(_it_281.next()) {\n        s=_it_281[0];\n        \n        //$LASTPOS=31001010;//kernel.T2MediaPlayer:1010\n        name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());\n        //$LASTPOS=31001084;//kernel.T2MediaPlayer:1084\n        Tonyu.setGlobal(name,name);\n        try {\n          //$LASTPOS=31001142;//kernel.T2MediaPlayer:1142\n          _this.print("Loading Sound2: "+name);\n          //$LASTPOS=31001187;//kernel.T2MediaPlayer:1187\n          _this.loadSE(name,url);\n          \n        } catch (e) {\n          //$LASTPOS=31001242;//kernel.T2MediaPlayer:1242\n          _this.print("Fail");\n          //$LASTPOS=31001270;//kernel.T2MediaPlayer:1270\n          Tonyu.setGlobal(name,"ERROR");\n          \n        }\n        \n      }\n    },\n    fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var r;\n      var s;\n      var _it_281;\n      var name;\n      var url;\n      var e;\n      \n      //$LASTPOS=31000881;//kernel.T2MediaPlayer:881\n      if (! _this.available) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=31000910;//kernel.T2MediaPlayer:910\n      r = prj.getResource();\n      //$LASTPOS=31000940;//kernel.T2MediaPlayer:940\n      if (! r||! r.sounds) {\n        _thread.retVal=_this;return;\n        \n      }\n      \n      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=31000974;//kernel.T2MediaPlayer:974\n            _it_281=Tonyu.iterator(r.sounds,1);\n          case 1:\n            if (!(_it_281.next())) { __pc=5; break; }\n            s=_it_281[0];\n            \n            //$LASTPOS=31001010;//kernel.T2MediaPlayer:1010\n            name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());\n            //$LASTPOS=31001084;//kernel.T2MediaPlayer:1084\n            Tonyu.setGlobal(name,name);\n            _thread.enterTry(3);\n            //$LASTPOS=31001142;//kernel.T2MediaPlayer:1142\n            _this.print("Loading Sound2: "+name);\n            //$LASTPOS=31001187;//kernel.T2MediaPlayer:1187\n            _this.fiber$loadSE(_thread, name, url);\n            __pc=2;return;\n          case 2:\n            _thread.exitTry();\n            __pc=4;break;\n          case 3:\n            e=_thread.startCatch();\n            _thread.exitTry();\n            {\n              //$LASTPOS=31001242;//kernel.T2MediaPlayer:1242\n              _this.print("Fail");\n              //$LASTPOS=31001270;//kernel.T2MediaPlayer:1270\n              Tonyu.setGlobal(name,"ERROR");\n            }\n          case 4:\n            \n            __pc=1;break;\n          case 5:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    playSE :function _trc_T2MediaPlayer_playSE(idx,vol,rate,offset,loop,loopStart,loopEnd) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31001408;//kernel.T2MediaPlayer:1408\n      if (_this.mute) {\n        return _this;\n      }\n      //$LASTPOS=31001467;//kernel.T2MediaPlayer:1467\n      if (vol==null) {\n        //$LASTPOS=31001484;//kernel.T2MediaPlayer:1484\n        vol=128;\n      }\n      //$LASTPOS=31001573;//kernel.T2MediaPlayer:1573\n      if (vol<0) {\n        //$LASTPOS=31001593;//kernel.T2MediaPlayer:1593\n        vol=0;\n      } else {\n        //$LASTPOS=31001614;//kernel.T2MediaPlayer:1614\n        if (vol>128) {\n          //$LASTPOS=31001629;//kernel.T2MediaPlayer:1629\n          vol=128;\n        }\n      }\n      return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);\n    },\n    stopSE :function _trc_T2MediaPlayer_stopSE(sourceObj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.stopSE(sourceObj);\n    },\n    fiber$stopSE :function _trc_T2MediaPlayer_f_stopSE(_thread,sourceObj) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.stopSE(sourceObj);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getSEData :function _trc_T2MediaPlayer_getSEData(idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getSEData(idx);\n    },\n    fiber$getSEData :function _trc_T2MediaPlayer_f_getSEData(_thread,idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getSEData(idx);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    loadBGM :function _trc_T2MediaPlayer_loadBGM(idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var data;\n      \n      //$LASTPOS=31001920;//kernel.T2MediaPlayer:1920\n      T2MediaLib.loadBGM(idx,src);\n      //$LASTPOS=31001980;//kernel.T2MediaPlayer:1980\n      data = T2MediaLib.getBGMData(idx);\n      //$LASTPOS=31002024;//kernel.T2MediaPlayer:2024\n      while (data==null) {\n        //$LASTPOS=31002056;//kernel.T2MediaPlayer:2056\n        _this.update();\n        //$LASTPOS=31002075;//kernel.T2MediaPlayer:2075\n        data=T2MediaLib.getBGMData(idx);\n        \n      }\n      return data;\n    },\n    fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var data;\n      \n      //$LASTPOS=31001920;//kernel.T2MediaPlayer:1920\n      T2MediaLib.loadBGM(idx,src);\n      //$LASTPOS=31001980;//kernel.T2MediaPlayer:1980\n      data = T2MediaLib.getBGMData(idx);\n      \n      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=31002024;//kernel.T2MediaPlayer:2024\n          case 1:\n            if (!(data==null)) { __pc=3; break; }\n            //$LASTPOS=31002056;//kernel.T2MediaPlayer:2056\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=31002075;//kernel.T2MediaPlayer:2075\n            data=T2MediaLib.getBGMData(idx);\n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(data);return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    playBGM :function _trc_T2MediaPlayer_playBGM(idx,loop,offset,loopStart,loopEnd) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31002196;//kernel.T2MediaPlayer:2196\n      if (_this.mute) {\n        return _this;\n      }\n      //$LASTPOS=31002219;//kernel.T2MediaPlayer:2219\n      if (loop===null) {\n        //$LASTPOS=31002238;//kernel.T2MediaPlayer:2238\n        loop=false;\n      }\n      //$LASTPOS=31002257;//kernel.T2MediaPlayer:2257\n      if (offset===null) {\n        //$LASTPOS=31002278;//kernel.T2MediaPlayer:2278\n        offset=0;\n      }\n      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);\n    },\n    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31002196;//kernel.T2MediaPlayer:2196\n      if (_this.mute) {\n        _thread.retVal=_this;return;\n        \n      }\n      //$LASTPOS=31002219;//kernel.T2MediaPlayer:2219\n      if (loop===null) {\n        //$LASTPOS=31002238;//kernel.T2MediaPlayer:2238\n        loop=false;\n      }\n      //$LASTPOS=31002257;//kernel.T2MediaPlayer:2257\n      if (offset===null) {\n        //$LASTPOS=31002278;//kernel.T2MediaPlayer:2278\n        offset=0;\n      }\n      _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stopBGM :function _trc_T2MediaPlayer_stopBGM() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.stopBGM(0);\n    },\n    fiber$stopBGM :function _trc_T2MediaPlayer_f_stopBGM(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.stopBGM(0);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    pauseBGM :function _trc_T2MediaPlayer_pauseBGM() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.pauseBGM(0);\n    },\n    fiber$pauseBGM :function _trc_T2MediaPlayer_f_pauseBGM(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.pauseBGM(0);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    resumeBGM :function _trc_T2MediaPlayer_resumeBGM() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.resumeBGM(0);\n    },\n    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.resumeBGM(0);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31002564;//kernel.T2MediaPlayer:2564\n      vol=vol/128;\n      //$LASTPOS=31002659;//kernel.T2MediaPlayer:2659\n      if (vol>1) {\n        //$LASTPOS=31002679;//kernel.T2MediaPlayer:2679\n        vol=1;\n      } else {\n        //$LASTPOS=31002700;//kernel.T2MediaPlayer:2700\n        if (vol<0) {\n          //$LASTPOS=31002715;//kernel.T2MediaPlayer:2715\n          vol=0;\n        }\n      }\n      return T2MediaLib.setBGMVolume(0,vol);\n    },\n    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31002564;//kernel.T2MediaPlayer:2564\n      vol=vol/128;\n      //$LASTPOS=31002659;//kernel.T2MediaPlayer:2659\n      if (vol>1) {\n        //$LASTPOS=31002679;//kernel.T2MediaPlayer:2679\n        vol=1;\n      } else {\n        //$LASTPOS=31002700;//kernel.T2MediaPlayer:2700\n        if (vol<0) {\n          //$LASTPOS=31002715;//kernel.T2MediaPlayer:2715\n          vol=0;\n        }\n      }\n      _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGMTempo :function _trc_T2MediaPlayer_setBGMTempo(tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.setBGMTempo(0,tempo);\n    },\n    fiber$setBGMTempo :function _trc_T2MediaPlayer_f_setBGMTempo(_thread,tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getBGMCurrentTime :function _trc_T2MediaPlayer_getBGMCurrentTime() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMCurrentTime(0);\n    },\n    fiber$getBGMCurrentTime :function _trc_T2MediaPlayer_f_getBGMCurrentTime(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getBGMLength :function _trc_T2MediaPlayer_getBGMLength() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMLength(0);\n    },\n    fiber$getBGMLength :function _trc_T2MediaPlayer_f_getBGMLength(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMLength(0);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getBGMData :function _trc_T2MediaPlayer_getBGMData(idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMData(idx);\n    },\n    fiber$getBGMData :function _trc_T2MediaPlayer_f_getBGMData(_thread,idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMData(idx);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    playBGMID :function _trc_T2MediaPlayer_playBGMID(id,idx,loop,offset,loopStart,loopEnd) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31003219;//kernel.T2MediaPlayer:3219\n      if (loop===null) {\n        //$LASTPOS=31003238;//kernel.T2MediaPlayer:3238\n        loop=false;\n      }\n      //$LASTPOS=31003257;//kernel.T2MediaPlayer:3257\n      if (offset===null) {\n        //$LASTPOS=31003278;//kernel.T2MediaPlayer:3278\n        offset=0;\n      }\n      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);\n    },\n    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31003219;//kernel.T2MediaPlayer:3219\n      if (loop===null) {\n        //$LASTPOS=31003238;//kernel.T2MediaPlayer:3238\n        loop=false;\n      }\n      //$LASTPOS=31003257;//kernel.T2MediaPlayer:3257\n      if (offset===null) {\n        //$LASTPOS=31003278;//kernel.T2MediaPlayer:3278\n        offset=0;\n      }\n      _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stopBGMID :function _trc_T2MediaPlayer_stopBGMID(id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.stopBGM(id);\n    },\n    fiber$stopBGMID :function _trc_T2MediaPlayer_f_stopBGMID(_thread,id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.stopBGM(id);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    pauseBGMID :function _trc_T2MediaPlayer_pauseBGMID(id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.pauseBGM(id);\n    },\n    fiber$pauseBGMID :function _trc_T2MediaPlayer_f_pauseBGMID(_thread,id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.pauseBGM(id);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    resumeBGMID :function _trc_T2MediaPlayer_resumeBGMID(id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.resumeBGM(id);\n    },\n    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.resumeBGM(id);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31003586;//kernel.T2MediaPlayer:3586\n      vol=vol/128;\n      //$LASTPOS=31003681;//kernel.T2MediaPlayer:3681\n      if (vol>1) {\n        //$LASTPOS=31003701;//kernel.T2MediaPlayer:3701\n        vol=1;\n      } else {\n        //$LASTPOS=31003722;//kernel.T2MediaPlayer:3722\n        if (vol<0) {\n          //$LASTPOS=31003737;//kernel.T2MediaPlayer:3737\n          vol=0;\n        }\n      }\n      return T2MediaLib.setBGMVolume(id,vol);\n    },\n    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31003586;//kernel.T2MediaPlayer:3586\n      vol=vol/128;\n      //$LASTPOS=31003681;//kernel.T2MediaPlayer:3681\n      if (vol>1) {\n        //$LASTPOS=31003701;//kernel.T2MediaPlayer:3701\n        vol=1;\n      } else {\n        //$LASTPOS=31003722;//kernel.T2MediaPlayer:3722\n        if (vol<0) {\n          //$LASTPOS=31003737;//kernel.T2MediaPlayer:3737\n          vol=0;\n        }\n      }\n      _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGMTempoID :function _trc_T2MediaPlayer_setBGMTempoID(id,tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.setBGMTempo(id,tempo);\n    },\n    fiber$setBGMTempoID :function _trc_T2MediaPlayer_f_setBGMTempoID(_thread,id,tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getBGMCurrentTimeID :function _trc_T2MediaPlayer_getBGMCurrentTimeID(id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMCurrentTime(id);\n    },\n    fiber$getBGMCurrentTimeID :function _trc_T2MediaPlayer_f_getBGMCurrentTimeID(_thread,id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getBGMLengthID :function _trc_T2MediaPlayer_getBGMLengthID(id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMLength(id);\n    },\n    fiber$getBGMLengthID :function _trc_T2MediaPlayer_f_getBGMLengthID(_thread,id) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMLength(id);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    sizeBGMID :function _trc_T2MediaPlayer_sizeBGMID() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getBGMPlayerMax();\n    },\n    fiber$sizeBGMID :function _trc_T2MediaPlayer_f_sizeBGMID(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getBGMPlayerMax();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    allStopBGM :function _trc_T2MediaPlayer_allStopBGM() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31004197;//kernel.T2MediaPlayer:4197\n      T2MediaLib.allStopBGM();\n    },\n    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31004197;//kernel.T2MediaPlayer:4197\n      T2MediaLib.allStopBGM();\n      \n      _thread.retVal=_this;return;\n    },\n    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31004276;//kernel.T2MediaPlayer:4276\n      T2MediaLib.loadAudio(idx,src);\n      //$LASTPOS=31004338;//kernel.T2MediaPlayer:4338\n      while (T2MediaLib.getAudioData(idx)==null) {\n        //$LASTPOS=31004383;//kernel.T2MediaPlayer:4383\n        _this.update();\n      }\n    },\n    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31004276;//kernel.T2MediaPlayer:4276\n      T2MediaLib.loadAudio(idx,src);\n      \n      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=31004338;//kernel.T2MediaPlayer:4338\n          case 1:\n            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }\n            //$LASTPOS=31004383;//kernel.T2MediaPlayer:4383\n            _this.fiber$update(_thread);\n            __pc=2;return;\n          case 2:\n            \n            __pc=1;break;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    playAudio :function _trc_T2MediaPlayer_playAudio(idx,loop,startTime) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31004439;//kernel.T2MediaPlayer:4439\n      if (loop===null) {\n        //$LASTPOS=31004458;//kernel.T2MediaPlayer:4458\n        loop=false;\n      }\n      //$LASTPOS=31004477;//kernel.T2MediaPlayer:4477\n      if (startTime===null) {\n        //$LASTPOS=31004501;//kernel.T2MediaPlayer:4501\n        startTime=0;\n      }\n      return T2MediaLib.playAudio(idx,loop,startTime);\n    },\n    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31004439;//kernel.T2MediaPlayer:4439\n      if (loop===null) {\n        //$LASTPOS=31004458;//kernel.T2MediaPlayer:4458\n        loop=false;\n      }\n      //$LASTPOS=31004477;//kernel.T2MediaPlayer:4477\n      if (startTime===null) {\n        //$LASTPOS=31004501;//kernel.T2MediaPlayer:4501\n        startTime=0;\n      }\n      _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    stopAudio :function _trc_T2MediaPlayer_stopAudio() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.stopAudio();\n    },\n    fiber$stopAudio :function _trc_T2MediaPlayer_f_stopAudio(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.stopAudio();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    pauseAudio :function _trc_T2MediaPlayer_pauseAudio() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.pauseAudio();\n    },\n    fiber$pauseAudio :function _trc_T2MediaPlayer_f_pauseAudio(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.pauseAudio();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    resumeAudio :function _trc_T2MediaPlayer_resumeAudio() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.resumeAudio();\n    },\n    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.resumeAudio();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31004783;//kernel.T2MediaPlayer:4783\n      vol=vol/128;\n      //$LASTPOS=31004805;//kernel.T2MediaPlayer:4805\n      if (vol>1) {\n        //$LASTPOS=31004825;//kernel.T2MediaPlayer:4825\n        vol=1;\n      } else {\n        //$LASTPOS=31004846;//kernel.T2MediaPlayer:4846\n        if (vol<0) {\n          //$LASTPOS=31004861;//kernel.T2MediaPlayer:4861\n          vol=0;\n        }\n      }\n      return T2MediaLib.setAudioVolume(vol);\n    },\n    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31004783;//kernel.T2MediaPlayer:4783\n      vol=vol/128;\n      //$LASTPOS=31004805;//kernel.T2MediaPlayer:4805\n      if (vol>1) {\n        //$LASTPOS=31004825;//kernel.T2MediaPlayer:4825\n        vol=1;\n      } else {\n        //$LASTPOS=31004846;//kernel.T2MediaPlayer:4846\n        if (vol<0) {\n          //$LASTPOS=31004861;//kernel.T2MediaPlayer:4861\n          vol=0;\n        }\n      }\n      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=31004951;//kernel.T2MediaPlayer:4951\n      if (tempo>4) {\n        //$LASTPOS=31004973;//kernel.T2MediaPlayer:4973\n        tempo=4;\n      } else {\n        //$LASTPOS=31004996;//kernel.T2MediaPlayer:4996\n        if (tempo<0.5) {\n          //$LASTPOS=31005013;//kernel.T2MediaPlayer:5013\n          tempo=0.5;\n        }\n      }\n      return T2MediaLib.setAudioTempo(tempo);\n    },\n    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=31004951;//kernel.T2MediaPlayer:4951\n      if (tempo>4) {\n        //$LASTPOS=31004973;//kernel.T2MediaPlayer:4973\n        tempo=4;\n      } else {\n        //$LASTPOS=31004996;//kernel.T2MediaPlayer:4996\n        if (tempo<0.5) {\n          //$LASTPOS=31005013;//kernel.T2MediaPlayer:5013\n          tempo=0.5;\n        }\n      }\n      _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setAudioPosition :function _trc_T2MediaPlayer_setAudioPosition(time) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.setAudioPosition(time);\n    },\n    fiber$setAudioPosition :function _trc_T2MediaPlayer_f_setAudioPosition(_thread,time) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.setAudioPosition(time);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getAudioCurrentTime :function _trc_T2MediaPlayer_getAudioCurrentTime() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getAudioCurrentTime();\n    },\n    fiber$getAudioCurrentTime :function _trc_T2MediaPlayer_f_getAudioCurrentTime(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getAudioCurrentTime();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getAudioLength :function _trc_T2MediaPlayer_getAudioLength() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getAudioLength();\n    },\n    fiber$getAudioLength :function _trc_T2MediaPlayer_f_getAudioLength(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getAudioLength();return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getAudioData :function _trc_T2MediaPlayer_getAudioData(idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return T2MediaLib.getAudioData(idx);\n    },\n    fiber$getAudioData :function _trc_T2MediaPlayer_f_getAudioData(_thread,idx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=T2MediaLib.getAudioData(idx);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"loadSE":{"nowait":false},"__getter__available":{"nowait":true},"loadFromProject":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEData":{"nowait":false},"loadBGM":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"setBGMVolume":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"sizeBGMID":{"nowait":false},"allStopBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.PlainChar\',\n  shortName: \'PlainChar\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_PlainChar_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_PlainChar_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_PlainChar_initialize(x,y,p) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000066;//kernel.PlainChar:66\n      if (Tonyu.runMode) {\n        //$LASTPOS=32000309;//kernel.PlainChar:309\n        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);\n        //$LASTPOS=32000355;//kernel.PlainChar:355\n        _this.initSprite();\n        \n      }\n      //$LASTPOS=32000381;//kernel.PlainChar:381\n      if (typeof  x=="object") {\n        //$LASTPOS=32000405;//kernel.PlainChar:405\n        Tonyu.extend(_this,x);\n      } else {\n        //$LASTPOS=32000437;//kernel.PlainChar:437\n        if (typeof  x=="number") {\n          //$LASTPOS=32000472;//kernel.PlainChar:472\n          _this.x=x;\n          //$LASTPOS=32000491;//kernel.PlainChar:491\n          _this.y=y;\n          //$LASTPOS=32000510;//kernel.PlainChar:510\n          _this.p=p;\n          \n        }\n      }\n    },\n    draw :function _trc_PlainChar_draw(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000547;//kernel.PlainChar:547\n      _this.onDraw();\n      //$LASTPOS=32000562;//kernel.PlainChar:562\n      if (_this._isInvisible) {\n        return _this;\n      }\n      //$LASTPOS=32000593;//kernel.PlainChar:593\n      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);\n    },\n    setVisible :function _trc_PlainChar_setVisible(v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000634;//kernel.PlainChar:634\n      _this._isInvisible=! v;\n    },\n    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=32000634;//kernel.PlainChar:634\n      _this._isInvisible=! v;\n      \n      _thread.retVal=_this;return;\n    },\n    onDraw :function _trc_PlainChar_onDraw() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$onDraw :function _trc_PlainChar_f_onDraw(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    update :function _trc_PlainChar_update() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000690;//kernel.PlainChar:690\n      _this.onUpdate();\n      //$LASTPOS=32000707;//kernel.PlainChar:707\n      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);\n    },\n    fiber$update :function _trc_PlainChar_f_update(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=32000690;//kernel.PlainChar:690\n      _this.onUpdate();\n      \n      _thread.enter(function _trc_PlainChar_ent_update(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=32000707;//kernel.PlainChar:707\n            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    onUpdate :function _trc_PlainChar_onUpdate() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    initSprite :function _trc_PlainChar_initSprite() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000768;//kernel.PlainChar:768\n      if (_this.layer&&typeof  _this.layer.add=="function") {\n        //$LASTPOS=32000820;//kernel.PlainChar:820\n        _this.layer.add(_this);\n        \n      } else {\n        //$LASTPOS=32000858;//kernel.PlainChar:858\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      //$LASTPOS=32000890;//kernel.PlainChar:890\n      _this.onAppear();\n    },\n    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=32000768;//kernel.PlainChar:768\n      if (_this.layer&&typeof  _this.layer.add=="function") {\n        //$LASTPOS=32000820;//kernel.PlainChar:820\n        _this.layer.add(_this);\n        \n      } else {\n        //$LASTPOS=32000858;//kernel.PlainChar:858\n        Tonyu.globals.$Sprites.add(_this);\n        \n      }\n      \n      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=32000890;//kernel.PlainChar:890\n            _this.fiber$onAppear(_thread);\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    tMain :function _trc_PlainChar_tMain() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32000922;//kernel.PlainChar:922\n      _this.main();\n      //$LASTPOS=32000935;//kernel.PlainChar:935\n      _this.die();\n    },\n    fiber$tMain :function _trc_PlainChar_f_tMain(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_PlainChar_ent_tMain(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=32000922;//kernel.PlainChar:922\n            _this.fiber$main(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=32000935;//kernel.PlainChar:935\n            _this.die();\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    appear :function _trc_PlainChar_appear(t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return t;\n    },\n    fiber$appear :function _trc_PlainChar_f_appear(_thread,t) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=t;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    trunc :function _trc_PlainChar_trunc(f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Math.trunc(f);\n    },\n    loadPage :function _trc_PlainChar_loadPage(page,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=32001673;//kernel.PlainChar:1673\n      _this.all().die();\n      //$LASTPOS=32001691;//kernel.PlainChar:1691\n      new page(arg);\n      //$LASTPOS=32001711;//kernel.PlainChar:1711\n      _this.die();\n    },\n    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=32001673;//kernel.PlainChar:1673\n      _this.all().die();\n      //$LASTPOS=32001691;//kernel.PlainChar:1691\n      new page(arg);\n      //$LASTPOS=32001711;//kernel.PlainChar:1711\n      _this.die();\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.SecretChar\',\n  shortName: \'SecretChar\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.PlainChar,\n  includes: [],\n  methods: {\n    main :function _trc_SecretChar_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_SecretChar_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_SecretChar_draw(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.SpriteChar\',\n  shortName: \'SpriteChar\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.PlainChar,\n  includes: [],\n  methods: {\n    main :function _trc_SpriteChar_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_SpriteChar_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_SpriteChar_initialize(x,y,p,f) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=33000043;//kernel.SpriteChar:43\n      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);\n      //$LASTPOS=33000062;//kernel.SpriteChar:62\n      _this.f=f;\n      //$LASTPOS=33000077;//kernel.SpriteChar:77\n      if (! _this.x) {\n        //$LASTPOS=33000090;//kernel.SpriteChar:90\n        _this.x=0;\n      }\n      //$LASTPOS=33000105;//kernel.SpriteChar:105\n      if (! _this.y) {\n        //$LASTPOS=33000118;//kernel.SpriteChar:118\n        _this.y=0;\n      }\n      //$LASTPOS=33000133;//kernel.SpriteChar:133\n      if (! _this.p) {\n        //$LASTPOS=33000146;//kernel.SpriteChar:146\n        _this.p=0;\n      }\n    },\n    draw :function _trc_SpriteChar_draw(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=33000176;//kernel.SpriteChar:176\n      if (_this.f) {\n        //$LASTPOS=33000194;//kernel.SpriteChar:194\n        if (! _this.scaleY) {\n          //$LASTPOS=33000207;//kernel.SpriteChar:207\n          _this.scaleY=_this.scaleX;\n        }\n        //$LASTPOS=33000231;//kernel.SpriteChar:231\n        _this.scaleX*=- 1;\n        \n      }\n      //$LASTPOS=33000255;//kernel.SpriteChar:255\n      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);\n      //$LASTPOS=33000275;//kernel.SpriteChar:275\n      if (_this.f) {\n        //$LASTPOS=33000282;//kernel.SpriteChar:282\n        _this.scaleX*=- 1;\n      }\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T1Line\',\n  shortName: \'T1Line\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_T1Line_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T1Line_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_T1Line_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=34000034;//kernel.T1Line:34\n      if (_this.hidden) {\n        return _this;\n      }\n      //$LASTPOS=34000065;//kernel.T1Line:65\n      ctx.strokeStyle=_this.col;\n      //$LASTPOS=34000091;//kernel.T1Line:91\n      ctx.beginPath();\n      //$LASTPOS=34000113;//kernel.T1Line:113\n      ctx.moveTo(_this.x,_this.y);\n      //$LASTPOS=34000135;//kernel.T1Line:135\n      ctx.lineTo(_this.tx,_this.ty);\n      //$LASTPOS=34000159;//kernel.T1Line:159\n      ctx.stroke();\n      //$LASTPOS=34000178;//kernel.T1Line:178\n      _this.hidden=true;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T1Map\',\n  shortName: \'T1Map\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Map,\n  includes: [],\n  methods: {\n    main :function _trc_T1Map_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T1Map_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    setBGColor :function _trc_T1Map_setBGColor(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=35000064;//kernel.T1Map:64\n      Tonyu.globals.$Screen.setBGColor(c);\n    },\n    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=35000064;//kernel.T1Map:64\n      Tonyu.globals.$Screen.setBGColor(c);\n      \n      _thread.retVal=_this;return;\n    },\n    load :function _trc_T1Map_load(fileName) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var f;\n      var o;\n      \n      //$LASTPOS=35000469;//kernel.T1Map:469\n      f = _this.file("../maps/").rel(fileName);\n      //$LASTPOS=35000512;//kernel.T1Map:512\n      o = f.obj();\n      //$LASTPOS=35000532;//kernel.T1Map:532\n      _this.chipWidth=o.chipWidth;\n      //$LASTPOS=35000560;//kernel.T1Map:560\n      _this.chipHeight=o.chipHeight;\n      //$LASTPOS=35000590;//kernel.T1Map:590\n      _this.baseData=o.baseData;\n      //$LASTPOS=35000616;//kernel.T1Map:616\n      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);\n      //$LASTPOS=35000658;//kernel.T1Map:658\n      _this.mapData=_this.mapTable;\n      //$LASTPOS=35000681;//kernel.T1Map:681\n      _this.row=_this.mapTable.length;\n      //$LASTPOS=35000707;//kernel.T1Map:707\n      _this.col=_this.mapTable[0].length;\n      //$LASTPOS=35000736;//kernel.T1Map:736\n      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);\n      //$LASTPOS=35000780;//kernel.T1Map:780\n      _this.mapOnData=_this.mapOnTable;\n      //$LASTPOS=35000813;//kernel.T1Map:813\n      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n      //$LASTPOS=35000885;//kernel.T1Map:885\n      _this.initMap();\n    },\n    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var f;\n      var o;\n      \n      //$LASTPOS=35000469;//kernel.T1Map:469\n      f = _this.file("../maps/").rel(fileName);\n      //$LASTPOS=35000512;//kernel.T1Map:512\n      o = f.obj();\n      //$LASTPOS=35000532;//kernel.T1Map:532\n      _this.chipWidth=o.chipWidth;\n      //$LASTPOS=35000560;//kernel.T1Map:560\n      _this.chipHeight=o.chipHeight;\n      //$LASTPOS=35000590;//kernel.T1Map:590\n      _this.baseData=o.baseData;\n      \n      _thread.enter(function _trc_T1Map_ent_load(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=35000616;//kernel.T1Map:616\n            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);\n            __pc=1;return;\n          case 1:\n            _this.mapTable=_thread.retVal;\n            \n            //$LASTPOS=35000658;//kernel.T1Map:658\n            _this.mapData=_this.mapTable;\n            //$LASTPOS=35000681;//kernel.T1Map:681\n            _this.row=_this.mapTable.length;\n            //$LASTPOS=35000707;//kernel.T1Map:707\n            _this.col=_this.mapTable[0].length;\n            //$LASTPOS=35000736;//kernel.T1Map:736\n            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);\n            __pc=2;return;\n          case 2:\n            _this.mapOnTable=_thread.retVal;\n            \n            //$LASTPOS=35000780;//kernel.T1Map:780\n            _this.mapOnData=_this.mapOnTable;\n            //$LASTPOS=35000813;//kernel.T1Map:813\n            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n            //$LASTPOS=35000885;//kernel.T1Map:885\n            _this.fiber$initMap(_thread);\n            __pc=3;return;\n          case 3:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    conv :function _trc_T1Map_conv(mat,tbl) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var res;\n      \n      //$LASTPOS=35000926;//kernel.T1Map:926\n      res = [];\n      //$LASTPOS=35000943;//kernel.T1Map:943\n      mat.forEach((function anonymous_955(row) {\n        var rrow;\n        \n        //$LASTPOS=35000973;//kernel.T1Map:973\n        rrow = [];\n        //$LASTPOS=35000995;//kernel.T1Map:995\n        res.push(rrow);\n        //$LASTPOS=35001020;//kernel.T1Map:1020\n        row.forEach((function anonymous_1032(dat) {\n          var t;\n          \n          //$LASTPOS=35001067;//kernel.T1Map:1067\n          t = tbl[dat[0]];\n          //$LASTPOS=35001099;//kernel.T1Map:1099\n          if (t) {\n            //$LASTPOS=35001106;//kernel.T1Map:1106\n            rrow.push(Tonyu.globals[t.name]+dat[1]);\n          } else {\n            //$LASTPOS=35001165;//kernel.T1Map:1165\n            rrow.push(dat[1]);\n          }\n        }));\n      }));\n      return res;\n    },\n    fiber$conv :function _trc_T1Map_f_conv(_thread,mat,tbl) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var res;\n      \n      //$LASTPOS=35000926;//kernel.T1Map:926\n      res = [];\n      //$LASTPOS=35000943;//kernel.T1Map:943\n      mat.forEach((function anonymous_955(row) {\n        var rrow;\n        \n        //$LASTPOS=35000973;//kernel.T1Map:973\n        rrow = [];\n        //$LASTPOS=35000995;//kernel.T1Map:995\n        res.push(rrow);\n        //$LASTPOS=35001020;//kernel.T1Map:1020\n        row.forEach((function anonymous_1032(dat) {\n          var t;\n          \n          //$LASTPOS=35001067;//kernel.T1Map:1067\n          t = tbl[dat[0]];\n          //$LASTPOS=35001099;//kernel.T1Map:1099\n          if (t) {\n            //$LASTPOS=35001106;//kernel.T1Map:1106\n            rrow.push(Tonyu.globals[t.name]+dat[1]);\n          } else {\n            //$LASTPOS=35001165;//kernel.T1Map:1165\n            rrow.push(dat[1]);\n          }\n        }));\n      }));\n      _thread.retVal=res;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T1Page\',\n  shortName: \'T1Page\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.PlainChar,\n  includes: [],\n  methods: {\n    main :function _trc_T1Page_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T1Page_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initGlobals :function _trc_T1Page_initGlobals() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=36000044;//kernel.T1Page:44\n      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;\n      //$LASTPOS=36000074;//kernel.T1Page:74\n      Tonyu.globals.$Boot.setFrameRate(60);\n      //$LASTPOS=36000103;//kernel.T1Page:103\n      Tonyu.globals.$clBlack=_this.color(0,0,0);\n      //$LASTPOS=36000131;//kernel.T1Page:131\n      Tonyu.globals.$clRed=_this.color(255,0,0);\n      //$LASTPOS=36000159;//kernel.T1Page:159\n      Tonyu.globals.$clGreen=_this.color(0,255,0);\n      //$LASTPOS=36000189;//kernel.T1Page:189\n      Tonyu.globals.$clYellow=_this.color(255,255,0);\n      //$LASTPOS=36000222;//kernel.T1Page:222\n      Tonyu.globals.$clBlue=_this.color(0,0,255);\n      //$LASTPOS=36000251;//kernel.T1Page:251\n      Tonyu.globals.$clPink=_this.color(255,0,255);\n      //$LASTPOS=36000282;//kernel.T1Page:282\n      Tonyu.globals.$clAqua=_this.color(0,255,255);\n      //$LASTPOS=36000313;//kernel.T1Page:313\n      Tonyu.globals.$clWhite=_this.color(255,255,255);\n      //$LASTPOS=36000347;//kernel.T1Page:347\n      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;\n    },\n    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=36000044;//kernel.T1Page:44\n      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;\n      //$LASTPOS=36000074;//kernel.T1Page:74\n      Tonyu.globals.$Boot.setFrameRate(60);\n      \n      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=36000103;//kernel.T1Page:103\n            _this.fiber$color(_thread, 0, 0, 0);\n            __pc=1;return;\n          case 1:\n            Tonyu.globals.$clBlack=_thread.retVal;\n            \n            //$LASTPOS=36000131;//kernel.T1Page:131\n            _this.fiber$color(_thread, 255, 0, 0);\n            __pc=2;return;\n          case 2:\n            Tonyu.globals.$clRed=_thread.retVal;\n            \n            //$LASTPOS=36000159;//kernel.T1Page:159\n            _this.fiber$color(_thread, 0, 255, 0);\n            __pc=3;return;\n          case 3:\n            Tonyu.globals.$clGreen=_thread.retVal;\n            \n            //$LASTPOS=36000189;//kernel.T1Page:189\n            _this.fiber$color(_thread, 255, 255, 0);\n            __pc=4;return;\n          case 4:\n            Tonyu.globals.$clYellow=_thread.retVal;\n            \n            //$LASTPOS=36000222;//kernel.T1Page:222\n            _this.fiber$color(_thread, 0, 0, 255);\n            __pc=5;return;\n          case 5:\n            Tonyu.globals.$clBlue=_thread.retVal;\n            \n            //$LASTPOS=36000251;//kernel.T1Page:251\n            _this.fiber$color(_thread, 255, 0, 255);\n            __pc=6;return;\n          case 6:\n            Tonyu.globals.$clPink=_thread.retVal;\n            \n            //$LASTPOS=36000282;//kernel.T1Page:282\n            _this.fiber$color(_thread, 0, 255, 255);\n            __pc=7;return;\n          case 7:\n            Tonyu.globals.$clAqua=_thread.retVal;\n            \n            //$LASTPOS=36000313;//kernel.T1Page:313\n            _this.fiber$color(_thread, 255, 255, 255);\n            __pc=8;return;\n          case 8:\n            Tonyu.globals.$clWhite=_thread.retVal;\n            \n            //$LASTPOS=36000347;//kernel.T1Page:347\n            Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.T1Text\',\n  shortName: \'T1Text\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_T1Text_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_T1Text_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_T1Text_draw(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=37000032;//kernel.T1Text:32\n      if (_this.hidden) {\n        return _this;\n      }\n      //$LASTPOS=37000057;//kernel.T1Text:57\n      c.font=_this.size+"px \'ＭＳ Ｐゴシック\'";\n      //$LASTPOS=37000097;//kernel.T1Text:97\n      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);\n      //$LASTPOS=37000117;//kernel.T1Text:117\n      _this.hidden=true;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.TextChar\',\n  shortName: \'TextChar\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.PlainChar,\n  includes: [Tonyu.classes.kernel.TextRectMod],\n  methods: {\n    main :function _trc_TextChar_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_TextChar_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_TextChar_initialize(xx,yy,t,c,s) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=38000070;//kernel.TextChar:70\n      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);\n      //$LASTPOS=38000089;//kernel.TextChar:89\n      _this.text="";\n      //$LASTPOS=38000103;//kernel.TextChar:103\n      _this.col=Tonyu.globals.$clWhite;\n      //$LASTPOS=38000122;//kernel.TextChar:122\n      _this.size=20;\n      //$LASTPOS=38000136;//kernel.TextChar:136\n      if (! _this.x) {\n        //$LASTPOS=38000149;//kernel.TextChar:149\n        _this.x=0;\n      }\n      //$LASTPOS=38000164;//kernel.TextChar:164\n      if (! _this.y) {\n        //$LASTPOS=38000177;//kernel.TextChar:177\n        _this.y=0;\n      }\n      //$LASTPOS=38000192;//kernel.TextChar:192\n      if (t) {\n        //$LASTPOS=38000199;//kernel.TextChar:199\n        _this.text=t;\n      }\n      //$LASTPOS=38000212;//kernel.TextChar:212\n      if (c) {\n        //$LASTPOS=38000219;//kernel.TextChar:219\n        _this.fillStyle=c;\n      }\n      //$LASTPOS=38000237;//kernel.TextChar:237\n      if (s) {\n        //$LASTPOS=38000244;//kernel.TextChar:244\n        _this.size=s;\n      }\n    },\n    draw :function _trc_TextChar_draw(ctx) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var rect;\n      \n      //$LASTPOS=38000274;//kernel.TextChar:274\n      if (! _this.size) {\n        //$LASTPOS=38000285;//kernel.TextChar:285\n        _this.size=15;\n      }\n      //$LASTPOS=38000299;//kernel.TextChar:299\n      if (! _this.align) {\n        //$LASTPOS=38000311;//kernel.TextChar:311\n        _this.align="left";\n      }\n      //$LASTPOS=38000330;//kernel.TextChar:330\n      if (! _this.fillStyle) {\n        //$LASTPOS=38000346;//kernel.TextChar:346\n        _this.fillStyle="white";\n      }\n      //$LASTPOS=38000370;//kernel.TextChar:370\n      ctx.fillStyle=_this.fillStyle;\n      //$LASTPOS=38000400;//kernel.TextChar:400\n      ctx.globalAlpha=_this.alpha/255;\n      //$LASTPOS=38000437;//kernel.TextChar:437\n      ctx.font=_this.size+"px \'ＭＳ Ｐゴシック\'";\n      //$LASTPOS=38000473;//kernel.TextChar:473\n      rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");\n      //$LASTPOS=38000540;//kernel.TextChar:540\n      _this.width=rect.w;\n      //$LASTPOS=38000559;//kernel.TextChar:559\n      _this.height=rect.h;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.GameConsole\',\n  shortName: \'GameConsole\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_GameConsole_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_GameConsole_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_GameConsole_initialize(opt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=39000084;//kernel.GameConsole:84\n      _this.extend(opt);\n      //$LASTPOS=39000102;//kernel.GameConsole:102\n      _this.cw=_this.canvas.width();\n      //$LASTPOS=39000126;//kernel.GameConsole:126\n      _this.ch=_this.canvas.height();\n      //$LASTPOS=39000151;//kernel.GameConsole:151\n      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;\n      //$LASTPOS=39000178;//kernel.GameConsole:178\n      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});\n      //$LASTPOS=39000259;//kernel.GameConsole:259\n      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;\n      //$LASTPOS=39000299;//kernel.GameConsole:299\n      _this.sprites.add(_this.gameScreen);\n      //$LASTPOS=39000329;//kernel.GameConsole:329\n      _this.cctx=_this.canvas[0].getContext("2d");\n    },\n    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var larger;\n      var smaller;\n      \n      //$LASTPOS=39000448;//kernel.GameConsole:448\n      larger = 200;\n      //$LASTPOS=39000469;//kernel.GameConsole:469\n      smaller = 5;\n      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;\n    },\n    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var larger;\n      var smaller;\n      \n      //$LASTPOS=39000448;//kernel.GameConsole:448\n      larger = 200;\n      //$LASTPOS=39000469;//kernel.GameConsole:469\n      smaller = 5;\n      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    layout :function _trc_GameConsole_layout() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var width;\n      var height;\n      var calcw;\n      var calch;\n      var marginw;\n      var marginh;\n      \n      //$LASTPOS=39000606;//kernel.GameConsole:606\n      _this.cw=_this.canvas.width();\n      //$LASTPOS=39000630;//kernel.GameConsole:630\n      _this.ch=_this.canvas.height();\n      //$LASTPOS=39000655;//kernel.GameConsole:655\n      width = _this.gameScreen.width;\n      //$LASTPOS=39000688;//kernel.GameConsole:688\n      height = _this.gameScreen.height;\n      //$LASTPOS=39000723;//kernel.GameConsole:723\n      calcw = _this.ch/height*width;\n      //$LASTPOS=39000767;//kernel.GameConsole:767\n      calch = _this.cw/width*height;\n      //$LASTPOS=39000811;//kernel.GameConsole:811\n      if (calch>_this.ch) {\n        //$LASTPOS=39000825;//kernel.GameConsole:825\n        calch=_this.ch;\n      }\n      //$LASTPOS=39000840;//kernel.GameConsole:840\n      if (calcw>_this.cw) {\n        //$LASTPOS=39000854;//kernel.GameConsole:854\n        calcw=_this.cw;\n      }\n      //$LASTPOS=39000869;//kernel.GameConsole:869\n      if (_this.shouldDraw1x1(width,height,calcw,calch)) {\n        //$LASTPOS=39000925;//kernel.GameConsole:925\n        calcw=width;\n        //$LASTPOS=39000937;//kernel.GameConsole:937\n        calch=height;\n        \n      }\n      //$LASTPOS=39000963;//kernel.GameConsole:963\n      marginw = Math.floor((_this.cw-calcw)/2);\n      //$LASTPOS=39001006;//kernel.GameConsole:1006\n      marginh = Math.floor((_this.ch-calch)/2);\n      //$LASTPOS=39001049;//kernel.GameConsole:1049\n      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});\n    },\n    fiber$layout :function _trc_GameConsole_f_layout(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var width;\n      var height;\n      var calcw;\n      var calch;\n      var marginw;\n      var marginh;\n      \n      //$LASTPOS=39000606;//kernel.GameConsole:606\n      _this.cw=_this.canvas.width();\n      //$LASTPOS=39000630;//kernel.GameConsole:630\n      _this.ch=_this.canvas.height();\n      //$LASTPOS=39000655;//kernel.GameConsole:655\n      width = _this.gameScreen.width;\n      //$LASTPOS=39000688;//kernel.GameConsole:688\n      height = _this.gameScreen.height;\n      //$LASTPOS=39000723;//kernel.GameConsole:723\n      calcw = _this.ch/height*width;\n      //$LASTPOS=39000767;//kernel.GameConsole:767\n      calch = _this.cw/width*height;\n      //$LASTPOS=39000811;//kernel.GameConsole:811\n      if (calch>_this.ch) {\n        //$LASTPOS=39000825;//kernel.GameConsole:825\n        calch=_this.ch;\n      }\n      //$LASTPOS=39000840;//kernel.GameConsole:840\n      if (calcw>_this.cw) {\n        //$LASTPOS=39000854;//kernel.GameConsole:854\n        calcw=_this.cw;\n      }\n      //$LASTPOS=39000869;//kernel.GameConsole:869\n      if (_this.shouldDraw1x1(width,height,calcw,calch)) {\n        //$LASTPOS=39000925;//kernel.GameConsole:925\n        calcw=width;\n        //$LASTPOS=39000937;//kernel.GameConsole:937\n        calch=height;\n        \n      }\n      //$LASTPOS=39000963;//kernel.GameConsole:963\n      marginw = Math.floor((_this.cw-calcw)/2);\n      //$LASTPOS=39001006;//kernel.GameConsole:1006\n      marginh = Math.floor((_this.ch-calch)/2);\n      //$LASTPOS=39001049;//kernel.GameConsole:1049\n      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});\n      \n      _thread.retVal=_this;return;\n    },\n    draw :function _trc_GameConsole_draw() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=39001144;//kernel.GameConsole:1144\n      _this.layout();\n      //$LASTPOS=39001159;//kernel.GameConsole:1159\n      _this.sprites.draw(_this.canvas[0]);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"shouldDraw1x1":{"nowait":false},"layout":{"nowait":false},"draw":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.MapEditor\',\n  shortName: \'MapEditor\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_MapEditor_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var j;\n      \n      //$LASTPOS=40000030;//kernel.MapEditor:30\n      Tonyu.globals.$Screen.resize(480,640);\n      //$LASTPOS=40000055;//kernel.MapEditor:55\n      _this.loadMode=false;\n      //$LASTPOS=40000071;//kernel.MapEditor:71\n      _this.fileExist=false;\n      //$LASTPOS=40000088;//kernel.MapEditor:88\n      _this.print("map file(s)");\n      //$LASTPOS=40000110;//kernel.MapEditor:110\n      _this.fileList=_this.file("../maps/");\n      //$LASTPOS=40000137;//kernel.MapEditor:137\n      _this.fileList.recursive((function a(f) {\n        \n        //$LASTPOS=40000175;//kernel.MapEditor:175\n        f=f+"";\n        //$LASTPOS=40000187;//kernel.MapEditor:187\n        _this.fNames=f.split("/");\n        //$LASTPOS=40000212;//kernel.MapEditor:212\n        _this.print(_this.fNames[_this.fNames.length-1]);\n        //$LASTPOS=40000248;//kernel.MapEditor:248\n        _this.fileExist=true;\n      }));\n      //$LASTPOS=40000268;//kernel.MapEditor:268\n      if (_this.fileExist) {\n        //$LASTPOS=40000287;//kernel.MapEditor:287\n        _this.print("Load Data?: Y or N");\n        //$LASTPOS=40000320;//kernel.MapEditor:320\n        while (true) {\n          //$LASTPOS=40000341;//kernel.MapEditor:341\n          if (_this.getkey("y")>0) {\n            //$LASTPOS=40000372;//kernel.MapEditor:372\n            _this.loadMode=true;\n            break;\n            \n            \n          }\n          //$LASTPOS=40000424;//kernel.MapEditor:424\n          if (_this.getkey("n")>0) {\n            //$LASTPOS=40000455;//kernel.MapEditor:455\n            _this.loadMode=false;\n            break;\n            \n            \n          }\n          //$LASTPOS=40000508;//kernel.MapEditor:508\n          _this.update();\n          \n        }\n        //$LASTPOS=40000528;//kernel.MapEditor:528\n        if (_this.loadMode) {\n          //$LASTPOS=40000550;//kernel.MapEditor:550\n          _this.fileName=prompt("Input json file (*.json)","map.json");\n          //$LASTPOS=40000614;//kernel.MapEditor:614\n          if (_this.fileName) {\n            //$LASTPOS=40000640;//kernel.MapEditor:640\n            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n            \n          }\n          //$LASTPOS=40000702;//kernel.MapEditor:702\n          if (_this.mapDataFile.obj()) {\n            //$LASTPOS=40000737;//kernel.MapEditor:737\n            _this.baseData=_this.mapDataFile.obj();\n            \n          } else {\n            //$LASTPOS=40000792;//kernel.MapEditor:792\n            _this.mapDataFile=_this.file(_this.fileName);\n            //$LASTPOS=40000832;//kernel.MapEditor:832\n            if (_this.mapDataFile.obj()) {\n              //$LASTPOS=40000871;//kernel.MapEditor:871\n              _this.baseData=_this.mapDataFile.obj();\n              \n            }\n            \n          }\n          //$LASTPOS=40000931;//kernel.MapEditor:931\n          if (_this.baseData==undefined) {\n            //$LASTPOS=40000968;//kernel.MapEditor:968\n            _this.print("Load failed");\n            //$LASTPOS=40001002;//kernel.MapEditor:1002\n            _this.loadMode=false;\n            \n          } else {\n            //$LASTPOS=40001032;//kernel.MapEditor:1032\n            if (_this.baseData[0]&&_this.baseData[1]) {\n              //$LASTPOS=40001076;//kernel.MapEditor:1076\n              _this.mapData=_this.baseData[0];\n              //$LASTPOS=40001109;//kernel.MapEditor:1109\n              _this.mapOnData=_this.baseData[1];\n              //$LASTPOS=40001144;//kernel.MapEditor:1144\n              if (_this.baseData.length>2) {\n                //$LASTPOS=40001183;//kernel.MapEditor:1183\n                _this.chipWidth=_this.baseData[_this.baseData.length-2];\n                //$LASTPOS=40001238;//kernel.MapEditor:1238\n                _this.chipHeight=_this.baseData[_this.baseData.length-1];\n                \n              }\n              \n            }\n          }\n          \n        }\n        \n      }\n      //$LASTPOS=40001310;//kernel.MapEditor:1310\n      _this.update();\n      //$LASTPOS=40001573;//kernel.MapEditor:1573\n      if (! _this.loadMode) {\n        //$LASTPOS=40001592;//kernel.MapEditor:1592\n        _this.row=prompt("input row");\n        //$LASTPOS=40001621;//kernel.MapEditor:1621\n        _this.col=prompt("input col");\n        //$LASTPOS=40001650;//kernel.MapEditor:1650\n        _this.chipWidth=prompt("input chipWidth");\n        //$LASTPOS=40001691;//kernel.MapEditor:1691\n        _this.chipHeight=prompt("input chipHeight");\n        //$LASTPOS=40001734;//kernel.MapEditor:1734\n        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n        //$LASTPOS=40001798;//kernel.MapEditor:1798\n        _this.panel.x=_this.panel.width/2+40;\n        //$LASTPOS=40001828;//kernel.MapEditor:1828\n        _this.panel.y=_this.panel.height/2+40;\n        //$LASTPOS=40001859;//kernel.MapEditor:1859\n        _this.panel.setFillStyle("cyan");\n        //$LASTPOS=40001891;//kernel.MapEditor:1891\n        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n        //$LASTPOS=40001941;//kernel.MapEditor:1941\n        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});\n        \n      } else {\n        //$LASTPOS=40002245;//kernel.MapEditor:2245\n        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});\n        //$LASTPOS=40002291;//kernel.MapEditor:2291\n        Tonyu.globals.$map.load(_this.fileName);\n        //$LASTPOS=40002316;//kernel.MapEditor:2316\n        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});\n        //$LASTPOS=40002411;//kernel.MapEditor:2411\n        _this.panel.x=_this.panel.width/2+40;\n        //$LASTPOS=40002441;//kernel.MapEditor:2441\n        _this.panel.y=_this.panel.height/2+40;\n        //$LASTPOS=40002472;//kernel.MapEditor:2472\n        _this.panel.setFillStyle("cyan");\n        //$LASTPOS=40002504;//kernel.MapEditor:2504\n        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n        \n      }\n      //$LASTPOS=40002552;//kernel.MapEditor:2552\n      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n      //$LASTPOS=40002606;//kernel.MapEditor:2606\n      _this.counter=0;\n      //$LASTPOS=40002617;//kernel.MapEditor:2617\n      //$LASTPOS=40002621;//kernel.MapEditor:2621\n      i = 0;\n      while(i<16) {\n        {\n          //$LASTPOS=40002644;//kernel.MapEditor:2644\n          //$LASTPOS=40002648;//kernel.MapEditor:2648\n          j = 0;\n          while(j<8) {\n            {\n              //$LASTPOS=40002674;//kernel.MapEditor:2674\n              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n              //$LASTPOS=40002717;//kernel.MapEditor:2717\n              _this.counter++;\n            }\n            j++;\n          }\n        }\n        i++;\n      }\n      //$LASTPOS=40002736;//kernel.MapEditor:2736\n      _this.drawPanel();\n      //$LASTPOS=40002749;//kernel.MapEditor:2749\n      _this.mode="get";\n      //$LASTPOS=40002761;//kernel.MapEditor:2761\n      _this.prevMode="set";\n      //$LASTPOS=40002777;//kernel.MapEditor:2777\n      _this.mapp=0;\n      //$LASTPOS=40002785;//kernel.MapEditor:2785\n      _this.mx=- 40;\n      //$LASTPOS=40002793;//kernel.MapEditor:2793\n      _this.my=- 40;\n      //$LASTPOS=40002801;//kernel.MapEditor:2801\n      _this.chipX=- 40;\n      //$LASTPOS=40002812;//kernel.MapEditor:2812\n      _this.chipY=- 40;\n      //$LASTPOS=40002823;//kernel.MapEditor:2823\n      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;\n      //$LASTPOS=40002851;//kernel.MapEditor:2851\n      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;\n      //$LASTPOS=40002881;//kernel.MapEditor:2881\n      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n      //$LASTPOS=40002903;//kernel.MapEditor:2903\n      while (true) {\n        //$LASTPOS=40002920;//kernel.MapEditor:2920\n        _this.p=_this.mapp;\n        //$LASTPOS=40002932;//kernel.MapEditor:2932\n        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {\n          //$LASTPOS=40003070;//kernel.MapEditor:3070\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40003103;//kernel.MapEditor:3103\n          _this.mode="erase";\n          //$LASTPOS=40003125;//kernel.MapEditor:3125\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40003156;//kernel.MapEditor:3156\n        if (_this.getkey("s")==1) {\n          //$LASTPOS=40003184;//kernel.MapEditor:3184\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40003217;//kernel.MapEditor:3217\n          if (_this.mode=="set") {\n            //$LASTPOS=40003246;//kernel.MapEditor:3246\n            _this.mode="setOn";\n            \n          } else {\n            //$LASTPOS=40003287;//kernel.MapEditor:3287\n            _this.mode="set";\n            \n          }\n          //$LASTPOS=40003317;//kernel.MapEditor:3317\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40003348;//kernel.MapEditor:3348\n        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {\n          //$LASTPOS=40003466;//kernel.MapEditor:3466\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40003499;//kernel.MapEditor:3499\n          _this.mode="set";\n          //$LASTPOS=40003519;//kernel.MapEditor:3519\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40003550;//kernel.MapEditor:3550\n        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {\n          //$LASTPOS=40003670;//kernel.MapEditor:3670\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40003703;//kernel.MapEditor:3703\n          _this.mode="setOn";\n          //$LASTPOS=40003725;//kernel.MapEditor:3725\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40003756;//kernel.MapEditor:3756\n        if (_this.getkey("o")==1) {\n          //$LASTPOS=40003784;//kernel.MapEditor:3784\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40003817;//kernel.MapEditor:3817\n          _this.mode="setOn";\n          \n        }\n        //$LASTPOS=40003841;//kernel.MapEditor:3841\n        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {\n          //$LASTPOS=40003981;//kernel.MapEditor:3981\n          if (_this.mode!="get") {\n            //$LASTPOS=40004010;//kernel.MapEditor:4010\n            _this.prevMode=_this.mode;\n            //$LASTPOS=40004037;//kernel.MapEditor:4037\n            Tonyu.globals.$mp.scrollTo(- 40,- 40);\n            //$LASTPOS=40004072;//kernel.MapEditor:4072\n            _this.mode="get";\n            //$LASTPOS=40004096;//kernel.MapEditor:4096\n            _this.chipX=- 40;\n            //$LASTPOS=40004119;//kernel.MapEditor:4119\n            _this.chipY=- 40;\n            \n          } else {\n            //$LASTPOS=40004157;//kernel.MapEditor:4157\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=40004194;//kernel.MapEditor:4194\n            _this.mode=_this.prevMode;\n            \n          }\n          //$LASTPOS=40004227;//kernel.MapEditor:4227\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40004258;//kernel.MapEditor:4258\n        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {\n          //$LASTPOS=40004412;//kernel.MapEditor:4412\n          _this.saveFileName=prompt("input json file(*.json)","map.json");\n          //$LASTPOS=40004885;//kernel.MapEditor:4885\n          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n          //$LASTPOS=40004942;//kernel.MapEditor:4942\n          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];\n          //$LASTPOS=40005084;//kernel.MapEditor:5084\n          _this.saveDataFile.obj(_this.data);\n          //$LASTPOS=40005116;//kernel.MapEditor:5116\n          _this.print(_this.saveFileName+" Saved");\n          \n        }\n        //$LASTPOS=40005205;//kernel.MapEditor:5205\n        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {\n          //$LASTPOS=40005345;//kernel.MapEditor:5345\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=40005378;//kernel.MapEditor:5378\n          _this.mode="copy";\n          //$LASTPOS=40005399;//kernel.MapEditor:5399\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=40005430;//kernel.MapEditor:5430\n        if (_this.mode!="get") {\n          //$LASTPOS=40005455;//kernel.MapEditor:5455\n          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {\n            //$LASTPOS=40005561;//kernel.MapEditor:5561\n            _this.mx=_this.mx+8;\n          }\n          //$LASTPOS=40005578;//kernel.MapEditor:5578\n          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {\n            //$LASTPOS=40005709;//kernel.MapEditor:5709\n            _this.mx=_this.mx-8;\n          }\n          //$LASTPOS=40005726;//kernel.MapEditor:5726\n          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {\n            //$LASTPOS=40005839;//kernel.MapEditor:5839\n            _this.my=_this.my+8;\n          }\n          //$LASTPOS=40005856;//kernel.MapEditor:5856\n          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {\n            //$LASTPOS=40005991;//kernel.MapEditor:5991\n            _this.my=_this.my-8;\n          }\n          //$LASTPOS=40006008;//kernel.MapEditor:6008\n          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n          \n        } else {\n          //$LASTPOS=40006049;//kernel.MapEditor:6049\n          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {\n            //$LASTPOS=40006155;//kernel.MapEditor:6155\n            _this.chipX=_this.chipX+8;\n          }\n          //$LASTPOS=40006178;//kernel.MapEditor:6178\n          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {\n            //$LASTPOS=40006309;//kernel.MapEditor:6309\n            _this.chipX=_this.chipX-8;\n          }\n          //$LASTPOS=40006332;//kernel.MapEditor:6332\n          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {\n            //$LASTPOS=40006445;//kernel.MapEditor:6445\n            _this.chipY=_this.chipY+8;\n          }\n          //$LASTPOS=40006468;//kernel.MapEditor:6468\n          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {\n            //$LASTPOS=40006603;//kernel.MapEditor:6603\n            _this.chipY=_this.chipY-8;\n          }\n          //$LASTPOS=40006626;//kernel.MapEditor:6626\n          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n          \n        }\n        //$LASTPOS=40006663;//kernel.MapEditor:6663\n        _this.panel.x=_this.panel.width/2-_this.mx;\n        //$LASTPOS=40006693;//kernel.MapEditor:6693\n        _this.panel.y=_this.panel.height/2-_this.my;\n        //$LASTPOS=40006724;//kernel.MapEditor:6724\n        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {\n          //$LASTPOS=40006776;//kernel.MapEditor:6776\n          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n          //$LASTPOS=40006824;//kernel.MapEditor:6824\n          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n          \n        } else {\n          //$LASTPOS=40006874;//kernel.MapEditor:6874\n          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {\n            //$LASTPOS=40006928;//kernel.MapEditor:6928\n            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            \n          } else {\n            //$LASTPOS=40006976;//kernel.MapEditor:6976\n            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {\n              //$LASTPOS=40007028;//kernel.MapEditor:7028\n              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n              //$LASTPOS=40007081;//kernel.MapEditor:7081\n              _this.mode=_this.prevMode;\n              //$LASTPOS=40007104;//kernel.MapEditor:7104\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40007137;//kernel.MapEditor:7137\n              _this.print(_this.mode+" mode");\n              //$LASTPOS=40007166;//kernel.MapEditor:7166\n              _this.updateEx(10);\n              \n            } else {\n              //$LASTPOS=40007190;//kernel.MapEditor:7190\n              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {\n                //$LASTPOS=40007244;//kernel.MapEditor:7244\n                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n                \n              } else {\n                //$LASTPOS=40007296;//kernel.MapEditor:7296\n                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {\n                  //$LASTPOS=40007349;//kernel.MapEditor:7349\n                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n                  //$LASTPOS=40007397;//kernel.MapEditor:7397\n                  _this.mode="set";\n                  //$LASTPOS=40007417;//kernel.MapEditor:7417\n                  _this.print(_this.mode+" mode");\n                  //$LASTPOS=40007446;//kernel.MapEditor:7446\n                  _this.updateEx(10);\n                  \n                }\n              }\n            }\n          }\n        }\n        //$LASTPOS=40007470;//kernel.MapEditor:7470\n        _this.update();\n        \n      }\n    },\n    fiber$main :function _trc_MapEditor_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var j;\n      \n      //$LASTPOS=40000030;//kernel.MapEditor:30\n      Tonyu.globals.$Screen.resize(480,640);\n      //$LASTPOS=40000055;//kernel.MapEditor:55\n      _this.loadMode=false;\n      //$LASTPOS=40000071;//kernel.MapEditor:71\n      _this.fileExist=false;\n      //$LASTPOS=40000088;//kernel.MapEditor:88\n      _this.print("map file(s)");\n      \n      _thread.enter(function _trc_MapEditor_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=40000110;//kernel.MapEditor:110\n            _this.fiber$file(_thread, "../maps/");\n            __pc=1;return;\n          case 1:\n            _this.fileList=_thread.retVal;\n            \n            //$LASTPOS=40000137;//kernel.MapEditor:137\n            _this.fileList.recursive((function a(f) {\n              \n              //$LASTPOS=40000175;//kernel.MapEditor:175\n              f=f+"";\n              //$LASTPOS=40000187;//kernel.MapEditor:187\n              _this.fNames=f.split("/");\n              //$LASTPOS=40000212;//kernel.MapEditor:212\n              _this.print(_this.fNames[_this.fNames.length-1]);\n              //$LASTPOS=40000248;//kernel.MapEditor:248\n              _this.fileExist=true;\n            }));\n            //$LASTPOS=40000268;//kernel.MapEditor:268\n            if (!(_this.fileExist)) { __pc=11; break; }\n            //$LASTPOS=40000287;//kernel.MapEditor:287\n            _this.print("Load Data?: Y or N");\n            //$LASTPOS=40000320;//kernel.MapEditor:320\n          case 2:\n            //$LASTPOS=40000341;//kernel.MapEditor:341\n            if (!(_this.getkey("y")>0)) { __pc=3; break; }\n            //$LASTPOS=40000372;//kernel.MapEditor:372\n            _this.loadMode=true;\n            __pc=6; break;\n            \n          case 3:\n            \n            //$LASTPOS=40000424;//kernel.MapEditor:424\n            if (!(_this.getkey("n")>0)) { __pc=4; break; }\n            //$LASTPOS=40000455;//kernel.MapEditor:455\n            _this.loadMode=false;\n            __pc=6; break;\n            \n          case 4:\n            \n            //$LASTPOS=40000508;//kernel.MapEditor:508\n            _this.fiber$update(_thread);\n            __pc=5;return;\n          case 5:\n            \n            __pc=2;break;\n          case 6:\n            \n            //$LASTPOS=40000528;//kernel.MapEditor:528\n            if (!(_this.loadMode)) { __pc=10; break; }\n            //$LASTPOS=40000550;//kernel.MapEditor:550\n            _this.fileName=prompt("Input json file (*.json)","map.json");\n            //$LASTPOS=40000614;//kernel.MapEditor:614\n            if (_this.fileName) {\n              //$LASTPOS=40000640;//kernel.MapEditor:640\n              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n              \n            }\n            //$LASTPOS=40000702;//kernel.MapEditor:702\n            if (!(_this.mapDataFile.obj())) { __pc=7; break; }\n            {\n              //$LASTPOS=40000737;//kernel.MapEditor:737\n              _this.baseData=_this.mapDataFile.obj();\n            }\n            __pc=9;break;\n          case 7:\n            //$LASTPOS=40000792;//kernel.MapEditor:792\n            _this.fiber$file(_thread, _this.fileName);\n            __pc=8;return;\n          case 8:\n            _this.mapDataFile=_thread.retVal;\n            \n            //$LASTPOS=40000832;//kernel.MapEditor:832\n            if (_this.mapDataFile.obj()) {\n              //$LASTPOS=40000871;//kernel.MapEditor:871\n              _this.baseData=_this.mapDataFile.obj();\n              \n            }\n          case 9:\n            \n            //$LASTPOS=40000931;//kernel.MapEditor:931\n            if (_this.baseData==undefined) {\n              //$LASTPOS=40000968;//kernel.MapEditor:968\n              _this.print("Load failed");\n              //$LASTPOS=40001002;//kernel.MapEditor:1002\n              _this.loadMode=false;\n              \n            } else {\n              //$LASTPOS=40001032;//kernel.MapEditor:1032\n              if (_this.baseData[0]&&_this.baseData[1]) {\n                //$LASTPOS=40001076;//kernel.MapEditor:1076\n                _this.mapData=_this.baseData[0];\n                //$LASTPOS=40001109;//kernel.MapEditor:1109\n                _this.mapOnData=_this.baseData[1];\n                //$LASTPOS=40001144;//kernel.MapEditor:1144\n                if (_this.baseData.length>2) {\n                  //$LASTPOS=40001183;//kernel.MapEditor:1183\n                  _this.chipWidth=_this.baseData[_this.baseData.length-2];\n                  //$LASTPOS=40001238;//kernel.MapEditor:1238\n                  _this.chipHeight=_this.baseData[_this.baseData.length-1];\n                  \n                }\n                \n              }\n            }\n          case 10:\n            \n          case 11:\n            \n            //$LASTPOS=40001310;//kernel.MapEditor:1310\n            _this.fiber$update(_thread);\n            __pc=12;return;\n          case 12:\n            \n            //$LASTPOS=40001573;//kernel.MapEditor:1573\n            if (! _this.loadMode) {\n              //$LASTPOS=40001592;//kernel.MapEditor:1592\n              _this.row=prompt("input row");\n              //$LASTPOS=40001621;//kernel.MapEditor:1621\n              _this.col=prompt("input col");\n              //$LASTPOS=40001650;//kernel.MapEditor:1650\n              _this.chipWidth=prompt("input chipWidth");\n              //$LASTPOS=40001691;//kernel.MapEditor:1691\n              _this.chipHeight=prompt("input chipHeight");\n              //$LASTPOS=40001734;//kernel.MapEditor:1734\n              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});\n              //$LASTPOS=40001798;//kernel.MapEditor:1798\n              _this.panel.x=_this.panel.width/2+40;\n              //$LASTPOS=40001828;//kernel.MapEditor:1828\n              _this.panel.y=_this.panel.height/2+40;\n              //$LASTPOS=40001859;//kernel.MapEditor:1859\n              _this.panel.setFillStyle("cyan");\n              //$LASTPOS=40001891;//kernel.MapEditor:1891\n              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n              //$LASTPOS=40001941;//kernel.MapEditor:1941\n              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});\n              \n            } else {\n              //$LASTPOS=40002245;//kernel.MapEditor:2245\n              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});\n              //$LASTPOS=40002291;//kernel.MapEditor:2291\n              Tonyu.globals.$map.load(_this.fileName);\n              //$LASTPOS=40002316;//kernel.MapEditor:2316\n              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});\n              //$LASTPOS=40002411;//kernel.MapEditor:2411\n              _this.panel.x=_this.panel.width/2+40;\n              //$LASTPOS=40002441;//kernel.MapEditor:2441\n              _this.panel.y=_this.panel.height/2+40;\n              //$LASTPOS=40002472;//kernel.MapEditor:2472\n              _this.panel.setFillStyle("cyan");\n              //$LASTPOS=40002504;//kernel.MapEditor:2504\n              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n              \n            }\n            //$LASTPOS=40002552;//kernel.MapEditor:2552\n            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n            //$LASTPOS=40002606;//kernel.MapEditor:2606\n            _this.counter=0;\n            //$LASTPOS=40002617;//kernel.MapEditor:2617\n            //$LASTPOS=40002621;//kernel.MapEditor:2621\n            i = 0;\n            while(i<16) {\n              {\n                //$LASTPOS=40002644;//kernel.MapEditor:2644\n                //$LASTPOS=40002648;//kernel.MapEditor:2648\n                j = 0;\n                while(j<8) {\n                  {\n                    //$LASTPOS=40002674;//kernel.MapEditor:2674\n                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n                    //$LASTPOS=40002717;//kernel.MapEditor:2717\n                    _this.counter++;\n                  }\n                  j++;\n                }\n              }\n              i++;\n            }\n            //$LASTPOS=40002736;//kernel.MapEditor:2736\n            _this.fiber$drawPanel(_thread);\n            __pc=13;return;\n          case 13:\n            \n            //$LASTPOS=40002749;//kernel.MapEditor:2749\n            _this.mode="get";\n            //$LASTPOS=40002761;//kernel.MapEditor:2761\n            _this.prevMode="set";\n            //$LASTPOS=40002777;//kernel.MapEditor:2777\n            _this.mapp=0;\n            //$LASTPOS=40002785;//kernel.MapEditor:2785\n            _this.mx=- 40;\n            //$LASTPOS=40002793;//kernel.MapEditor:2793\n            _this.my=- 40;\n            //$LASTPOS=40002801;//kernel.MapEditor:2801\n            _this.chipX=- 40;\n            //$LASTPOS=40002812;//kernel.MapEditor:2812\n            _this.chipY=- 40;\n            //$LASTPOS=40002823;//kernel.MapEditor:2823\n            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;\n            //$LASTPOS=40002851;//kernel.MapEditor:2851\n            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;\n            //$LASTPOS=40002881;//kernel.MapEditor:2881\n            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n            //$LASTPOS=40002903;//kernel.MapEditor:2903\n          case 14:\n            //$LASTPOS=40002920;//kernel.MapEditor:2920\n            _this.p=_this.mapp;\n            //$LASTPOS=40002932;//kernel.MapEditor:2932\n            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {\n              //$LASTPOS=40003070;//kernel.MapEditor:3070\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40003103;//kernel.MapEditor:3103\n              _this.mode="erase";\n              //$LASTPOS=40003125;//kernel.MapEditor:3125\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40003156;//kernel.MapEditor:3156\n            if (_this.getkey("s")==1) {\n              //$LASTPOS=40003184;//kernel.MapEditor:3184\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40003217;//kernel.MapEditor:3217\n              if (_this.mode=="set") {\n                //$LASTPOS=40003246;//kernel.MapEditor:3246\n                _this.mode="setOn";\n                \n              } else {\n                //$LASTPOS=40003287;//kernel.MapEditor:3287\n                _this.mode="set";\n                \n              }\n              //$LASTPOS=40003317;//kernel.MapEditor:3317\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40003348;//kernel.MapEditor:3348\n            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {\n              //$LASTPOS=40003466;//kernel.MapEditor:3466\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40003499;//kernel.MapEditor:3499\n              _this.mode="set";\n              //$LASTPOS=40003519;//kernel.MapEditor:3519\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40003550;//kernel.MapEditor:3550\n            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {\n              //$LASTPOS=40003670;//kernel.MapEditor:3670\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40003703;//kernel.MapEditor:3703\n              _this.mode="setOn";\n              //$LASTPOS=40003725;//kernel.MapEditor:3725\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40003756;//kernel.MapEditor:3756\n            if (_this.getkey("o")==1) {\n              //$LASTPOS=40003784;//kernel.MapEditor:3784\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40003817;//kernel.MapEditor:3817\n              _this.mode="setOn";\n              \n            }\n            //$LASTPOS=40003841;//kernel.MapEditor:3841\n            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {\n              //$LASTPOS=40003981;//kernel.MapEditor:3981\n              if (_this.mode!="get") {\n                //$LASTPOS=40004010;//kernel.MapEditor:4010\n                _this.prevMode=_this.mode;\n                //$LASTPOS=40004037;//kernel.MapEditor:4037\n                Tonyu.globals.$mp.scrollTo(- 40,- 40);\n                //$LASTPOS=40004072;//kernel.MapEditor:4072\n                _this.mode="get";\n                //$LASTPOS=40004096;//kernel.MapEditor:4096\n                _this.chipX=- 40;\n                //$LASTPOS=40004119;//kernel.MapEditor:4119\n                _this.chipY=- 40;\n                \n              } else {\n                //$LASTPOS=40004157;//kernel.MapEditor:4157\n                Tonyu.globals.$mp.scrollTo(1000,1000);\n                //$LASTPOS=40004194;//kernel.MapEditor:4194\n                _this.mode=_this.prevMode;\n                \n              }\n              //$LASTPOS=40004227;//kernel.MapEditor:4227\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40004258;//kernel.MapEditor:4258\n            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {\n              //$LASTPOS=40004412;//kernel.MapEditor:4412\n              _this.saveFileName=prompt("input json file(*.json)","map.json");\n              //$LASTPOS=40004885;//kernel.MapEditor:4885\n              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n              //$LASTPOS=40004942;//kernel.MapEditor:4942\n              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];\n              //$LASTPOS=40005084;//kernel.MapEditor:5084\n              _this.saveDataFile.obj(_this.data);\n              //$LASTPOS=40005116;//kernel.MapEditor:5116\n              _this.print(_this.saveFileName+" Saved");\n              \n            }\n            //$LASTPOS=40005205;//kernel.MapEditor:5205\n            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {\n              //$LASTPOS=40005345;//kernel.MapEditor:5345\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=40005378;//kernel.MapEditor:5378\n              _this.mode="copy";\n              //$LASTPOS=40005399;//kernel.MapEditor:5399\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=40005430;//kernel.MapEditor:5430\n            if (_this.mode!="get") {\n              //$LASTPOS=40005455;//kernel.MapEditor:5455\n              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {\n                //$LASTPOS=40005561;//kernel.MapEditor:5561\n                _this.mx=_this.mx+8;\n              }\n              //$LASTPOS=40005578;//kernel.MapEditor:5578\n              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {\n                //$LASTPOS=40005709;//kernel.MapEditor:5709\n                _this.mx=_this.mx-8;\n              }\n              //$LASTPOS=40005726;//kernel.MapEditor:5726\n              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {\n                //$LASTPOS=40005839;//kernel.MapEditor:5839\n                _this.my=_this.my+8;\n              }\n              //$LASTPOS=40005856;//kernel.MapEditor:5856\n              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {\n                //$LASTPOS=40005991;//kernel.MapEditor:5991\n                _this.my=_this.my-8;\n              }\n              //$LASTPOS=40006008;//kernel.MapEditor:6008\n              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n              \n            } else {\n              //$LASTPOS=40006049;//kernel.MapEditor:6049\n              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {\n                //$LASTPOS=40006155;//kernel.MapEditor:6155\n                _this.chipX=_this.chipX+8;\n              }\n              //$LASTPOS=40006178;//kernel.MapEditor:6178\n              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {\n                //$LASTPOS=40006309;//kernel.MapEditor:6309\n                _this.chipX=_this.chipX-8;\n              }\n              //$LASTPOS=40006332;//kernel.MapEditor:6332\n              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {\n                //$LASTPOS=40006445;//kernel.MapEditor:6445\n                _this.chipY=_this.chipY+8;\n              }\n              //$LASTPOS=40006468;//kernel.MapEditor:6468\n              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {\n                //$LASTPOS=40006603;//kernel.MapEditor:6603\n                _this.chipY=_this.chipY-8;\n              }\n              //$LASTPOS=40006626;//kernel.MapEditor:6626\n              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n              \n            }\n            //$LASTPOS=40006663;//kernel.MapEditor:6663\n            _this.panel.x=_this.panel.width/2-_this.mx;\n            //$LASTPOS=40006693;//kernel.MapEditor:6693\n            _this.panel.y=_this.panel.height/2-_this.my;\n            //$LASTPOS=40006724;//kernel.MapEditor:6724\n            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }\n            {\n              //$LASTPOS=40006776;//kernel.MapEditor:6776\n              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n              //$LASTPOS=40006824;//kernel.MapEditor:6824\n              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            }\n            __pc=25;break;\n          case 15:\n            //$LASTPOS=40006874;//kernel.MapEditor:6874\n            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }\n            {\n              //$LASTPOS=40006928;//kernel.MapEditor:6928\n              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            }\n            __pc=24;break;\n          case 16:\n            //$LASTPOS=40006976;//kernel.MapEditor:6976\n            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }\n            //$LASTPOS=40007028;//kernel.MapEditor:7028\n            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n            //$LASTPOS=40007081;//kernel.MapEditor:7081\n            _this.mode=_this.prevMode;\n            //$LASTPOS=40007104;//kernel.MapEditor:7104\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=40007137;//kernel.MapEditor:7137\n            _this.print(_this.mode+" mode");\n            //$LASTPOS=40007166;//kernel.MapEditor:7166\n            _this.fiber$updateEx(_thread, 10);\n            __pc=17;return;\n          case 17:\n            \n            __pc=23;break;\n          case 18:\n            //$LASTPOS=40007190;//kernel.MapEditor:7190\n            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }\n            {\n              //$LASTPOS=40007244;//kernel.MapEditor:7244\n              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n            }\n            __pc=22;break;\n          case 19:\n            //$LASTPOS=40007296;//kernel.MapEditor:7296\n            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }\n            //$LASTPOS=40007349;//kernel.MapEditor:7349\n            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n            //$LASTPOS=40007397;//kernel.MapEditor:7397\n            _this.mode="set";\n            //$LASTPOS=40007417;//kernel.MapEditor:7417\n            _this.print(_this.mode+" mode");\n            //$LASTPOS=40007446;//kernel.MapEditor:7446\n            _this.fiber$updateEx(_thread, 10);\n            __pc=20;return;\n          case 20:\n            \n          case 21:\n            \n          case 22:\n            \n          case 23:\n            \n          case 24:\n            \n          case 25:\n            \n            //$LASTPOS=40007470;//kernel.MapEditor:7470\n            _this.fiber$update(_thread);\n            __pc=26;return;\n          case 26:\n            \n            __pc=14;break;\n          case 27:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    inRect :function _trc_MapEditor_inRect() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;\n    },\n    fiber$inRect :function _trc_MapEditor_f_inRect(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    drawPanel :function _trc_MapEditor_drawPanel() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=40007635;//kernel.MapEditor:7635\n      Tonyu.globals.$panel.setFillStyle("gray");\n      //$LASTPOS=40007668;//kernel.MapEditor:7668\n      Tonyu.globals.$panel.alpha=128;\n      //$LASTPOS=40007690;//kernel.MapEditor:7690\n      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);\n      //$LASTPOS=40007732;//kernel.MapEditor:7732\n      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);\n      //$LASTPOS=40007779;//kernel.MapEditor:7779\n      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);\n      //$LASTPOS=40007840;//kernel.MapEditor:7840\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);\n      //$LASTPOS=40007898;//kernel.MapEditor:7898\n      Tonyu.globals.$panel.alpha=255;\n      //$LASTPOS=40007920;//kernel.MapEditor:7920\n      Tonyu.globals.$panel.setFillStyle("black");\n      //$LASTPOS=40007972;//kernel.MapEditor:7972\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008021;//kernel.MapEditor:8021\n      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008072;//kernel.MapEditor:8072\n      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008123;//kernel.MapEditor:8123\n      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008174;//kernel.MapEditor:8174\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);\n      //$LASTPOS=40008222;//kernel.MapEditor:8222\n      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);\n      //$LASTPOS=40008272;//kernel.MapEditor:8272\n      Tonyu.globals.$panel.setFillStyle("white");\n      //$LASTPOS=40008306;//kernel.MapEditor:8306\n      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008356;//kernel.MapEditor:8356\n      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008407;//kernel.MapEditor:8407\n      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008458;//kernel.MapEditor:8458\n      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008509;//kernel.MapEditor:8509\n      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);\n      //$LASTPOS=40008558;//kernel.MapEditor:8558\n      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);\n      //$LASTPOS=40008608;//kernel.MapEditor:8608\n      Tonyu.globals.$panel.setFillStyle("black");\n      //$LASTPOS=40008652;//kernel.MapEditor:8652\n      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");\n      //$LASTPOS=40008708;//kernel.MapEditor:8708\n      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");\n      //$LASTPOS=40008771;//kernel.MapEditor:8771\n      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");\n      //$LASTPOS=40008845;//kernel.MapEditor:8845\n      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");\n      //$LASTPOS=40008948;//kernel.MapEditor:8948\n      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009024;//kernel.MapEditor:9024\n      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");\n      //$LASTPOS=40009102;//kernel.MapEditor:9102\n      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009178;//kernel.MapEditor:9178\n      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009253;//kernel.MapEditor:9253\n      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");\n      //$LASTPOS=40009330;//kernel.MapEditor:9330\n      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");\n    },\n    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=40007635;//kernel.MapEditor:7635\n      Tonyu.globals.$panel.setFillStyle("gray");\n      //$LASTPOS=40007668;//kernel.MapEditor:7668\n      Tonyu.globals.$panel.alpha=128;\n      //$LASTPOS=40007690;//kernel.MapEditor:7690\n      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);\n      //$LASTPOS=40007732;//kernel.MapEditor:7732\n      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);\n      //$LASTPOS=40007779;//kernel.MapEditor:7779\n      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);\n      //$LASTPOS=40007840;//kernel.MapEditor:7840\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);\n      //$LASTPOS=40007898;//kernel.MapEditor:7898\n      Tonyu.globals.$panel.alpha=255;\n      //$LASTPOS=40007920;//kernel.MapEditor:7920\n      Tonyu.globals.$panel.setFillStyle("black");\n      //$LASTPOS=40007972;//kernel.MapEditor:7972\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008021;//kernel.MapEditor:8021\n      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008072;//kernel.MapEditor:8072\n      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008123;//kernel.MapEditor:8123\n      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);\n      //$LASTPOS=40008174;//kernel.MapEditor:8174\n      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);\n      //$LASTPOS=40008222;//kernel.MapEditor:8222\n      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);\n      //$LASTPOS=40008272;//kernel.MapEditor:8272\n      Tonyu.globals.$panel.setFillStyle("white");\n      //$LASTPOS=40008306;//kernel.MapEditor:8306\n      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008356;//kernel.MapEditor:8356\n      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008407;//kernel.MapEditor:8407\n      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008458;//kernel.MapEditor:8458\n      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);\n      //$LASTPOS=40008509;//kernel.MapEditor:8509\n      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);\n      //$LASTPOS=40008558;//kernel.MapEditor:8558\n      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);\n      //$LASTPOS=40008608;//kernel.MapEditor:8608\n      Tonyu.globals.$panel.setFillStyle("black");\n      //$LASTPOS=40008652;//kernel.MapEditor:8652\n      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");\n      //$LASTPOS=40008708;//kernel.MapEditor:8708\n      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");\n      //$LASTPOS=40008771;//kernel.MapEditor:8771\n      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");\n      //$LASTPOS=40008845;//kernel.MapEditor:8845\n      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");\n      //$LASTPOS=40008948;//kernel.MapEditor:8948\n      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009024;//kernel.MapEditor:9024\n      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");\n      //$LASTPOS=40009102;//kernel.MapEditor:9102\n      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009178;//kernel.MapEditor:9178\n      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");\n      //$LASTPOS=40009253;//kernel.MapEditor:9253\n      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");\n      //$LASTPOS=40009330;//kernel.MapEditor:9330\n      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");\n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.MapEditorOLD\',\n  shortName: \'MapEditorOLD\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_MapEditorOLD_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var j;\n      \n      //$LASTPOS=41000032;//kernel.MapEditorOLD:32\n      _this.loadMode=false;\n      //$LASTPOS=41000049;//kernel.MapEditorOLD:49\n      _this.print("Load Data?: Y or N");\n      //$LASTPOS=41000079;//kernel.MapEditorOLD:79\n      while (true) {\n        //$LASTPOS=41000097;//kernel.MapEditorOLD:97\n        if (_this.getkey("y")>0) {\n          //$LASTPOS=41000125;//kernel.MapEditorOLD:125\n          _this.loadMode=true;\n          break;\n          \n          \n        }\n        //$LASTPOS=41000168;//kernel.MapEditorOLD:168\n        if (_this.getkey("n")>0) {\n          //$LASTPOS=41000196;//kernel.MapEditorOLD:196\n          _this.loadMode=false;\n          break;\n          \n          \n        }\n        //$LASTPOS=41000240;//kernel.MapEditorOLD:240\n        _this.update();\n        \n      }\n      //$LASTPOS=41000254;//kernel.MapEditorOLD:254\n      if (_this.loadMode) {\n        //$LASTPOS=41000273;//kernel.MapEditorOLD:273\n        _this.fileName=prompt("Input json file (*.json)","map.json");\n        //$LASTPOS=41000334;//kernel.MapEditorOLD:334\n        if (_this.fileName) {\n          //$LASTPOS=41000357;//kernel.MapEditorOLD:357\n          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n          \n        }\n        //$LASTPOS=41000413;//kernel.MapEditorOLD:413\n        if (_this.mapDataFile.obj()) {\n          //$LASTPOS=41000445;//kernel.MapEditorOLD:445\n          _this.baseData=_this.mapDataFile.obj();\n          \n        } else {\n          //$LASTPOS=41000494;//kernel.MapEditorOLD:494\n          _this.mapDataFile=_this.file(_this.fileName);\n          //$LASTPOS=41000531;//kernel.MapEditorOLD:531\n          if (_this.mapDataFile.obj()) {\n            //$LASTPOS=41000567;//kernel.MapEditorOLD:567\n            _this.baseData=_this.mapDataFile.obj();\n            \n          }\n          \n        }\n        //$LASTPOS=41000618;//kernel.MapEditorOLD:618\n        if (_this.baseData==undefined) {\n          //$LASTPOS=41000652;//kernel.MapEditorOLD:652\n          _this.print("Load failed");\n          //$LASTPOS=41000683;//kernel.MapEditorOLD:683\n          _this.loadMode=false;\n          \n        } else {\n          //$LASTPOS=41000710;//kernel.MapEditorOLD:710\n          if (_this.baseData[0]&&_this.baseData[1]) {\n            //$LASTPOS=41000751;//kernel.MapEditorOLD:751\n            _this.mapData=_this.baseData[0];\n            //$LASTPOS=41000781;//kernel.MapEditorOLD:781\n            _this.mapOnData=_this.baseData[1];\n            \n          }\n        }\n        \n      }\n      //$LASTPOS=41000815;//kernel.MapEditorOLD:815\n      _this.update();\n      //$LASTPOS=41001093;//kernel.MapEditorOLD:1093\n      if (! _this.loadMode) {\n        //$LASTPOS=41001113;//kernel.MapEditorOLD:1113\n        _this.row=prompt("input row");\n        //$LASTPOS=41001143;//kernel.MapEditorOLD:1143\n        _this.update();\n        //$LASTPOS=41001158;//kernel.MapEditorOLD:1158\n        _this.col=prompt("input col");\n        //$LASTPOS=41001188;//kernel.MapEditorOLD:1188\n        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});\n        //$LASTPOS=41001238;//kernel.MapEditorOLD:1238\n        _this.panel.x=_this.panel.width/2+10;\n        //$LASTPOS=41001269;//kernel.MapEditorOLD:1269\n        _this.panel.y=_this.panel.height/2;\n        //$LASTPOS=41001298;//kernel.MapEditorOLD:1298\n        _this.panel.setFillStyle("cyan");\n        //$LASTPOS=41001331;//kernel.MapEditorOLD:1331\n        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n        //$LASTPOS=41001382;//kernel.MapEditorOLD:1382\n        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});\n        \n      } else {\n        //$LASTPOS=41001445;//kernel.MapEditorOLD:1445\n        if (! _this.mapOnData) {\n          //$LASTPOS=41001470;//kernel.MapEditorOLD:1470\n          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});\n          \n        } else {\n          //$LASTPOS=41001582;//kernel.MapEditorOLD:1582\n          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});\n          \n        }\n        //$LASTPOS=41001695;//kernel.MapEditorOLD:1695\n        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});\n        //$LASTPOS=41001766;//kernel.MapEditorOLD:1766\n        _this.panel.x=_this.panel.width/2;\n        //$LASTPOS=41001794;//kernel.MapEditorOLD:1794\n        _this.panel.y=_this.panel.height/2;\n        //$LASTPOS=41001823;//kernel.MapEditorOLD:1823\n        _this.panel.setFillStyle("cyan");\n        //$LASTPOS=41001856;//kernel.MapEditorOLD:1856\n        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n        \n      }\n      //$LASTPOS=41001906;//kernel.MapEditorOLD:1906\n      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n      //$LASTPOS=41001961;//kernel.MapEditorOLD:1961\n      _this.counter=0;\n      //$LASTPOS=41001973;//kernel.MapEditorOLD:1973\n      //$LASTPOS=41001977;//kernel.MapEditorOLD:1977\n      i = 0;\n      while(i<16) {\n        {\n          //$LASTPOS=41002001;//kernel.MapEditorOLD:2001\n          //$LASTPOS=41002005;//kernel.MapEditorOLD:2005\n          j = 0;\n          while(j<8) {\n            {\n              //$LASTPOS=41002032;//kernel.MapEditorOLD:2032\n              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n              //$LASTPOS=41002076;//kernel.MapEditorOLD:2076\n              _this.counter++;\n            }\n            j++;\n          }\n        }\n        i++;\n      }\n      //$LASTPOS=41002098;//kernel.MapEditorOLD:2098\n      _this.mode="get";\n      //$LASTPOS=41002111;//kernel.MapEditorOLD:2111\n      _this.prevMode="set";\n      //$LASTPOS=41002128;//kernel.MapEditorOLD:2128\n      _this.mapp=0;\n      //$LASTPOS=41002137;//kernel.MapEditorOLD:2137\n      _this.mx=0;\n      //$LASTPOS=41002144;//kernel.MapEditorOLD:2144\n      _this.my=0;\n      //$LASTPOS=41002151;//kernel.MapEditorOLD:2151\n      _this.chipX=0;\n      //$LASTPOS=41002161;//kernel.MapEditorOLD:2161\n      _this.chipY=0;\n      //$LASTPOS=41002171;//kernel.MapEditorOLD:2171\n      _this.x=Tonyu.globals.$screenWidth-16;\n      //$LASTPOS=41002191;//kernel.MapEditorOLD:2191\n      _this.y=Tonyu.globals.$screenHeight-16;\n      //$LASTPOS=41002212;//kernel.MapEditorOLD:2212\n      while (true) {\n        //$LASTPOS=41002230;//kernel.MapEditorOLD:2230\n        _this.p=_this.mapp;\n        //$LASTPOS=41002243;//kernel.MapEditorOLD:2243\n        if (_this.getkey("e")==1) {\n          //$LASTPOS=41002272;//kernel.MapEditorOLD:2272\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=41002306;//kernel.MapEditorOLD:2306\n          _this.mode="erase";\n          //$LASTPOS=41002329;//kernel.MapEditorOLD:2329\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=41002362;//kernel.MapEditorOLD:2362\n        if (_this.getkey("s")==1) {\n          //$LASTPOS=41002391;//kernel.MapEditorOLD:2391\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=41002425;//kernel.MapEditorOLD:2425\n          if (_this.mode=="set") {\n            //$LASTPOS=41002455;//kernel.MapEditorOLD:2455\n            _this.mode="setOn";\n            \n          } else {\n            //$LASTPOS=41002498;//kernel.MapEditorOLD:2498\n            _this.mode="set";\n            \n          }\n          //$LASTPOS=41002530;//kernel.MapEditorOLD:2530\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=41002563;//kernel.MapEditorOLD:2563\n        if (_this.getkey("o")==1) {\n          //$LASTPOS=41002592;//kernel.MapEditorOLD:2592\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=41002626;//kernel.MapEditorOLD:2626\n          _this.mode="setOn";\n          \n        }\n        //$LASTPOS=41002652;//kernel.MapEditorOLD:2652\n        if (_this.getkey("g")==1) {\n          //$LASTPOS=41002681;//kernel.MapEditorOLD:2681\n          if (_this.mode!="get") {\n            //$LASTPOS=41002711;//kernel.MapEditorOLD:2711\n            _this.prevMode=_this.mode;\n            //$LASTPOS=41002739;//kernel.MapEditorOLD:2739\n            Tonyu.globals.$mp.scrollTo(0,0);\n            //$LASTPOS=41002771;//kernel.MapEditorOLD:2771\n            _this.mode="get";\n            //$LASTPOS=41002796;//kernel.MapEditorOLD:2796\n            _this.chipX=0;\n            //$LASTPOS=41002818;//kernel.MapEditorOLD:2818\n            _this.chipY=0;\n            \n          } else {\n            //$LASTPOS=41002856;//kernel.MapEditorOLD:2856\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=41002894;//kernel.MapEditorOLD:2894\n            _this.mode=_this.prevMode;\n            \n          }\n          //$LASTPOS=41002929;//kernel.MapEditorOLD:2929\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=41002962;//kernel.MapEditorOLD:2962\n        if (_this.getkey("p")==1) {\n          //$LASTPOS=41003006;//kernel.MapEditorOLD:3006\n          _this.saveFileName=prompt("input json file(*.json)","map.json");\n          //$LASTPOS=41003495;//kernel.MapEditorOLD:3495\n          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n          //$LASTPOS=41003553;//kernel.MapEditorOLD:3553\n          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];\n          //$LASTPOS=41003668;//kernel.MapEditorOLD:3668\n          _this.saveDataFile.obj(_this.data);\n          //$LASTPOS=41003701;//kernel.MapEditorOLD:3701\n          _this.print(_this.saveFileName+" Saved");\n          \n        }\n        //$LASTPOS=41003793;//kernel.MapEditorOLD:3793\n        if (_this.getkey("c")==1) {\n          //$LASTPOS=41003822;//kernel.MapEditorOLD:3822\n          Tonyu.globals.$mp.scrollTo(1000,1000);\n          //$LASTPOS=41003856;//kernel.MapEditorOLD:3856\n          _this.mode="spuit";\n          //$LASTPOS=41003879;//kernel.MapEditorOLD:3879\n          _this.print(_this.mode+" mode");\n          \n        }\n        //$LASTPOS=41003912;//kernel.MapEditorOLD:3912\n        if (_this.mode!="get") {\n          //$LASTPOS=41003938;//kernel.MapEditorOLD:3938\n          if (_this.getkey("left")>0) {\n            //$LASTPOS=41003959;//kernel.MapEditorOLD:3959\n            _this.mx=_this.mx+8;\n          }\n          //$LASTPOS=41003977;//kernel.MapEditorOLD:3977\n          if (_this.getkey("right")>0) {\n            //$LASTPOS=41003999;//kernel.MapEditorOLD:3999\n            _this.mx=_this.mx-8;\n          }\n          //$LASTPOS=41004017;//kernel.MapEditorOLD:4017\n          if (_this.getkey("up")>0) {\n            //$LASTPOS=41004036;//kernel.MapEditorOLD:4036\n            _this.my=_this.my+8;\n          }\n          //$LASTPOS=41004054;//kernel.MapEditorOLD:4054\n          if (_this.getkey("down")>0) {\n            //$LASTPOS=41004075;//kernel.MapEditorOLD:4075\n            _this.my=_this.my-8;\n          }\n          //$LASTPOS=41004093;//kernel.MapEditorOLD:4093\n          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n          \n        } else {\n          //$LASTPOS=41004136;//kernel.MapEditorOLD:4136\n          if (_this.getkey("left")>0) {\n            //$LASTPOS=41004157;//kernel.MapEditorOLD:4157\n            _this.chipX=_this.chipX+8;\n          }\n          //$LASTPOS=41004181;//kernel.MapEditorOLD:4181\n          if (_this.getkey("right")>0) {\n            //$LASTPOS=41004203;//kernel.MapEditorOLD:4203\n            _this.chipX=_this.chipX-8;\n          }\n          //$LASTPOS=41004227;//kernel.MapEditorOLD:4227\n          if (_this.getkey("up")>0) {\n            //$LASTPOS=41004246;//kernel.MapEditorOLD:4246\n            _this.chipY=_this.chipY+8;\n          }\n          //$LASTPOS=41004270;//kernel.MapEditorOLD:4270\n          if (_this.getkey("down")>0) {\n            //$LASTPOS=41004291;//kernel.MapEditorOLD:4291\n            _this.chipY=_this.chipY-8;\n          }\n          //$LASTPOS=41004315;//kernel.MapEditorOLD:4315\n          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n          \n        }\n        //$LASTPOS=41004354;//kernel.MapEditorOLD:4354\n        _this.panel.x=_this.panel.width/2-_this.mx;\n        //$LASTPOS=41004385;//kernel.MapEditorOLD:4385\n        _this.panel.y=_this.panel.height/2-_this.my;\n        //$LASTPOS=41004417;//kernel.MapEditorOLD:4417\n        if (_this.mode=="set"&&_this.getkey(1)>0) {\n          //$LASTPOS=41004458;//kernel.MapEditorOLD:4458\n          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n          //$LASTPOS=41004507;//kernel.MapEditorOLD:4507\n          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n          \n        } else {\n          //$LASTPOS=41004558;//kernel.MapEditorOLD:4558\n          if (_this.mode=="erase"&&_this.getkey(1)>0) {\n            //$LASTPOS=41004601;//kernel.MapEditorOLD:4601\n            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            \n          } else {\n            //$LASTPOS=41004650;//kernel.MapEditorOLD:4650\n            if (_this.mode=="get"&&_this.getkey(1)>0) {\n              //$LASTPOS=41004691;//kernel.MapEditorOLD:4691\n              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n              //$LASTPOS=41004745;//kernel.MapEditorOLD:4745\n              _this.mode=_this.prevMode;\n              //$LASTPOS=41004769;//kernel.MapEditorOLD:4769\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=41004803;//kernel.MapEditorOLD:4803\n              _this.print(_this.mode+" mode");\n              //$LASTPOS=41004833;//kernel.MapEditorOLD:4833\n              _this.updateEx(10);\n              \n            } else {\n              //$LASTPOS=41004858;//kernel.MapEditorOLD:4858\n              if (_this.mode=="setOn"&&_this.getkey(1)>0) {\n                //$LASTPOS=41004901;//kernel.MapEditorOLD:4901\n                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n                \n              } else {\n                //$LASTPOS=41004954;//kernel.MapEditorOLD:4954\n                if (_this.mode=="spuit"&&_this.getkey(1)>0) {\n                  //$LASTPOS=41004997;//kernel.MapEditorOLD:4997\n                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n                  //$LASTPOS=41005046;//kernel.MapEditorOLD:5046\n                  _this.mode="set";\n                  //$LASTPOS=41005067;//kernel.MapEditorOLD:5067\n                  _this.print(_this.mode+" mode");\n                  //$LASTPOS=41005097;//kernel.MapEditorOLD:5097\n                  _this.updateEx(10);\n                  \n                }\n              }\n            }\n          }\n        }\n        //$LASTPOS=41005123;//kernel.MapEditorOLD:5123\n        _this.update();\n        \n      }\n    },\n    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var j;\n      \n      //$LASTPOS=41000032;//kernel.MapEditorOLD:32\n      _this.loadMode=false;\n      //$LASTPOS=41000049;//kernel.MapEditorOLD:49\n      _this.print("Load Data?: Y or N");\n      \n      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=41000079;//kernel.MapEditorOLD:79\n          case 1:\n            //$LASTPOS=41000097;//kernel.MapEditorOLD:97\n            if (!(_this.getkey("y")>0)) { __pc=2; break; }\n            //$LASTPOS=41000125;//kernel.MapEditorOLD:125\n            _this.loadMode=true;\n            __pc=5; break;\n            \n          case 2:\n            \n            //$LASTPOS=41000168;//kernel.MapEditorOLD:168\n            if (!(_this.getkey("n")>0)) { __pc=3; break; }\n            //$LASTPOS=41000196;//kernel.MapEditorOLD:196\n            _this.loadMode=false;\n            __pc=5; break;\n            \n          case 3:\n            \n            //$LASTPOS=41000240;//kernel.MapEditorOLD:240\n            _this.fiber$update(_thread);\n            __pc=4;return;\n          case 4:\n            \n            __pc=1;break;\n          case 5:\n            \n            //$LASTPOS=41000254;//kernel.MapEditorOLD:254\n            if (!(_this.loadMode)) { __pc=9; break; }\n            //$LASTPOS=41000273;//kernel.MapEditorOLD:273\n            _this.fileName=prompt("Input json file (*.json)","map.json");\n            //$LASTPOS=41000334;//kernel.MapEditorOLD:334\n            if (_this.fileName) {\n              //$LASTPOS=41000357;//kernel.MapEditorOLD:357\n              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);\n              \n            }\n            //$LASTPOS=41000413;//kernel.MapEditorOLD:413\n            if (!(_this.mapDataFile.obj())) { __pc=6; break; }\n            {\n              //$LASTPOS=41000445;//kernel.MapEditorOLD:445\n              _this.baseData=_this.mapDataFile.obj();\n            }\n            __pc=8;break;\n          case 6:\n            //$LASTPOS=41000494;//kernel.MapEditorOLD:494\n            _this.fiber$file(_thread, _this.fileName);\n            __pc=7;return;\n          case 7:\n            _this.mapDataFile=_thread.retVal;\n            \n            //$LASTPOS=41000531;//kernel.MapEditorOLD:531\n            if (_this.mapDataFile.obj()) {\n              //$LASTPOS=41000567;//kernel.MapEditorOLD:567\n              _this.baseData=_this.mapDataFile.obj();\n              \n            }\n          case 8:\n            \n            //$LASTPOS=41000618;//kernel.MapEditorOLD:618\n            if (_this.baseData==undefined) {\n              //$LASTPOS=41000652;//kernel.MapEditorOLD:652\n              _this.print("Load failed");\n              //$LASTPOS=41000683;//kernel.MapEditorOLD:683\n              _this.loadMode=false;\n              \n            } else {\n              //$LASTPOS=41000710;//kernel.MapEditorOLD:710\n              if (_this.baseData[0]&&_this.baseData[1]) {\n                //$LASTPOS=41000751;//kernel.MapEditorOLD:751\n                _this.mapData=_this.baseData[0];\n                //$LASTPOS=41000781;//kernel.MapEditorOLD:781\n                _this.mapOnData=_this.baseData[1];\n                \n              }\n            }\n          case 9:\n            \n            //$LASTPOS=41000815;//kernel.MapEditorOLD:815\n            _this.fiber$update(_thread);\n            __pc=10;return;\n          case 10:\n            \n            //$LASTPOS=41001093;//kernel.MapEditorOLD:1093\n            if (!(! _this.loadMode)) { __pc=12; break; }\n            //$LASTPOS=41001113;//kernel.MapEditorOLD:1113\n            _this.row=prompt("input row");\n            //$LASTPOS=41001143;//kernel.MapEditorOLD:1143\n            _this.fiber$update(_thread);\n            __pc=11;return;\n          case 11:\n            \n            //$LASTPOS=41001158;//kernel.MapEditorOLD:1158\n            _this.col=prompt("input col");\n            //$LASTPOS=41001188;//kernel.MapEditorOLD:1188\n            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});\n            //$LASTPOS=41001238;//kernel.MapEditorOLD:1238\n            _this.panel.x=_this.panel.width/2+10;\n            //$LASTPOS=41001269;//kernel.MapEditorOLD:1269\n            _this.panel.y=_this.panel.height/2;\n            //$LASTPOS=41001298;//kernel.MapEditorOLD:1298\n            _this.panel.setFillStyle("cyan");\n            //$LASTPOS=41001331;//kernel.MapEditorOLD:1331\n            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n            //$LASTPOS=41001382;//kernel.MapEditorOLD:1382\n            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});\n            __pc=13;break;\n          case 12:\n            {\n              //$LASTPOS=41001445;//kernel.MapEditorOLD:1445\n              if (! _this.mapOnData) {\n                //$LASTPOS=41001470;//kernel.MapEditorOLD:1470\n                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});\n                \n              } else {\n                //$LASTPOS=41001582;//kernel.MapEditorOLD:1582\n                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});\n                \n              }\n              //$LASTPOS=41001695;//kernel.MapEditorOLD:1695\n              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});\n              //$LASTPOS=41001766;//kernel.MapEditorOLD:1766\n              _this.panel.x=_this.panel.width/2;\n              //$LASTPOS=41001794;//kernel.MapEditorOLD:1794\n              _this.panel.y=_this.panel.height/2;\n              //$LASTPOS=41001823;//kernel.MapEditorOLD:1823\n              _this.panel.setFillStyle("cyan");\n              //$LASTPOS=41001856;//kernel.MapEditorOLD:1856\n              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);\n            }\n          case 13:\n            \n            //$LASTPOS=41001906;//kernel.MapEditorOLD:1906\n            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});\n            //$LASTPOS=41001961;//kernel.MapEditorOLD:1961\n            _this.counter=0;\n            //$LASTPOS=41001973;//kernel.MapEditorOLD:1973\n            //$LASTPOS=41001977;//kernel.MapEditorOLD:1977\n            i = 0;\n            while(i<16) {\n              {\n                //$LASTPOS=41002001;//kernel.MapEditorOLD:2001\n                //$LASTPOS=41002005;//kernel.MapEditorOLD:2005\n                j = 0;\n                while(j<8) {\n                  {\n                    //$LASTPOS=41002032;//kernel.MapEditorOLD:2032\n                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);\n                    //$LASTPOS=41002076;//kernel.MapEditorOLD:2076\n                    _this.counter++;\n                  }\n                  j++;\n                }\n              }\n              i++;\n            }\n            //$LASTPOS=41002098;//kernel.MapEditorOLD:2098\n            _this.mode="get";\n            //$LASTPOS=41002111;//kernel.MapEditorOLD:2111\n            _this.prevMode="set";\n            //$LASTPOS=41002128;//kernel.MapEditorOLD:2128\n            _this.mapp=0;\n            //$LASTPOS=41002137;//kernel.MapEditorOLD:2137\n            _this.mx=0;\n            //$LASTPOS=41002144;//kernel.MapEditorOLD:2144\n            _this.my=0;\n            //$LASTPOS=41002151;//kernel.MapEditorOLD:2151\n            _this.chipX=0;\n            //$LASTPOS=41002161;//kernel.MapEditorOLD:2161\n            _this.chipY=0;\n            //$LASTPOS=41002171;//kernel.MapEditorOLD:2171\n            _this.x=Tonyu.globals.$screenWidth-16;\n            //$LASTPOS=41002191;//kernel.MapEditorOLD:2191\n            _this.y=Tonyu.globals.$screenHeight-16;\n            //$LASTPOS=41002212;//kernel.MapEditorOLD:2212\n          case 14:\n            //$LASTPOS=41002230;//kernel.MapEditorOLD:2230\n            _this.p=_this.mapp;\n            //$LASTPOS=41002243;//kernel.MapEditorOLD:2243\n            if (_this.getkey("e")==1) {\n              //$LASTPOS=41002272;//kernel.MapEditorOLD:2272\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=41002306;//kernel.MapEditorOLD:2306\n              _this.mode="erase";\n              //$LASTPOS=41002329;//kernel.MapEditorOLD:2329\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=41002362;//kernel.MapEditorOLD:2362\n            if (_this.getkey("s")==1) {\n              //$LASTPOS=41002391;//kernel.MapEditorOLD:2391\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=41002425;//kernel.MapEditorOLD:2425\n              if (_this.mode=="set") {\n                //$LASTPOS=41002455;//kernel.MapEditorOLD:2455\n                _this.mode="setOn";\n                \n              } else {\n                //$LASTPOS=41002498;//kernel.MapEditorOLD:2498\n                _this.mode="set";\n                \n              }\n              //$LASTPOS=41002530;//kernel.MapEditorOLD:2530\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=41002563;//kernel.MapEditorOLD:2563\n            if (_this.getkey("o")==1) {\n              //$LASTPOS=41002592;//kernel.MapEditorOLD:2592\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=41002626;//kernel.MapEditorOLD:2626\n              _this.mode="setOn";\n              \n            }\n            //$LASTPOS=41002652;//kernel.MapEditorOLD:2652\n            if (_this.getkey("g")==1) {\n              //$LASTPOS=41002681;//kernel.MapEditorOLD:2681\n              if (_this.mode!="get") {\n                //$LASTPOS=41002711;//kernel.MapEditorOLD:2711\n                _this.prevMode=_this.mode;\n                //$LASTPOS=41002739;//kernel.MapEditorOLD:2739\n                Tonyu.globals.$mp.scrollTo(0,0);\n                //$LASTPOS=41002771;//kernel.MapEditorOLD:2771\n                _this.mode="get";\n                //$LASTPOS=41002796;//kernel.MapEditorOLD:2796\n                _this.chipX=0;\n                //$LASTPOS=41002818;//kernel.MapEditorOLD:2818\n                _this.chipY=0;\n                \n              } else {\n                //$LASTPOS=41002856;//kernel.MapEditorOLD:2856\n                Tonyu.globals.$mp.scrollTo(1000,1000);\n                //$LASTPOS=41002894;//kernel.MapEditorOLD:2894\n                _this.mode=_this.prevMode;\n                \n              }\n              //$LASTPOS=41002929;//kernel.MapEditorOLD:2929\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=41002962;//kernel.MapEditorOLD:2962\n            if (_this.getkey("p")==1) {\n              //$LASTPOS=41003006;//kernel.MapEditorOLD:3006\n              _this.saveFileName=prompt("input json file(*.json)","map.json");\n              //$LASTPOS=41003495;//kernel.MapEditorOLD:3495\n              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);\n              //$LASTPOS=41003553;//kernel.MapEditorOLD:3553\n              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];\n              //$LASTPOS=41003668;//kernel.MapEditorOLD:3668\n              _this.saveDataFile.obj(_this.data);\n              //$LASTPOS=41003701;//kernel.MapEditorOLD:3701\n              _this.print(_this.saveFileName+" Saved");\n              \n            }\n            //$LASTPOS=41003793;//kernel.MapEditorOLD:3793\n            if (_this.getkey("c")==1) {\n              //$LASTPOS=41003822;//kernel.MapEditorOLD:3822\n              Tonyu.globals.$mp.scrollTo(1000,1000);\n              //$LASTPOS=41003856;//kernel.MapEditorOLD:3856\n              _this.mode="spuit";\n              //$LASTPOS=41003879;//kernel.MapEditorOLD:3879\n              _this.print(_this.mode+" mode");\n              \n            }\n            //$LASTPOS=41003912;//kernel.MapEditorOLD:3912\n            if (_this.mode!="get") {\n              //$LASTPOS=41003938;//kernel.MapEditorOLD:3938\n              if (_this.getkey("left")>0) {\n                //$LASTPOS=41003959;//kernel.MapEditorOLD:3959\n                _this.mx=_this.mx+8;\n              }\n              //$LASTPOS=41003977;//kernel.MapEditorOLD:3977\n              if (_this.getkey("right")>0) {\n                //$LASTPOS=41003999;//kernel.MapEditorOLD:3999\n                _this.mx=_this.mx-8;\n              }\n              //$LASTPOS=41004017;//kernel.MapEditorOLD:4017\n              if (_this.getkey("up")>0) {\n                //$LASTPOS=41004036;//kernel.MapEditorOLD:4036\n                _this.my=_this.my+8;\n              }\n              //$LASTPOS=41004054;//kernel.MapEditorOLD:4054\n              if (_this.getkey("down")>0) {\n                //$LASTPOS=41004075;//kernel.MapEditorOLD:4075\n                _this.my=_this.my-8;\n              }\n              //$LASTPOS=41004093;//kernel.MapEditorOLD:4093\n              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);\n              \n            } else {\n              //$LASTPOS=41004136;//kernel.MapEditorOLD:4136\n              if (_this.getkey("left")>0) {\n                //$LASTPOS=41004157;//kernel.MapEditorOLD:4157\n                _this.chipX=_this.chipX+8;\n              }\n              //$LASTPOS=41004181;//kernel.MapEditorOLD:4181\n              if (_this.getkey("right")>0) {\n                //$LASTPOS=41004203;//kernel.MapEditorOLD:4203\n                _this.chipX=_this.chipX-8;\n              }\n              //$LASTPOS=41004227;//kernel.MapEditorOLD:4227\n              if (_this.getkey("up")>0) {\n                //$LASTPOS=41004246;//kernel.MapEditorOLD:4246\n                _this.chipY=_this.chipY+8;\n              }\n              //$LASTPOS=41004270;//kernel.MapEditorOLD:4270\n              if (_this.getkey("down")>0) {\n                //$LASTPOS=41004291;//kernel.MapEditorOLD:4291\n                _this.chipY=_this.chipY-8;\n              }\n              //$LASTPOS=41004315;//kernel.MapEditorOLD:4315\n              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);\n              \n            }\n            //$LASTPOS=41004354;//kernel.MapEditorOLD:4354\n            _this.panel.x=_this.panel.width/2-_this.mx;\n            //$LASTPOS=41004385;//kernel.MapEditorOLD:4385\n            _this.panel.y=_this.panel.height/2-_this.my;\n            //$LASTPOS=41004417;//kernel.MapEditorOLD:4417\n            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }\n            {\n              //$LASTPOS=41004458;//kernel.MapEditorOLD:4458\n              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n              //$LASTPOS=41004507;//kernel.MapEditorOLD:4507\n              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            }\n            __pc=25;break;\n          case 15:\n            //$LASTPOS=41004558;//kernel.MapEditorOLD:4558\n            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }\n            {\n              //$LASTPOS=41004601;//kernel.MapEditorOLD:4601\n              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);\n            }\n            __pc=24;break;\n          case 16:\n            //$LASTPOS=41004650;//kernel.MapEditorOLD:4650\n            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }\n            //$LASTPOS=41004691;//kernel.MapEditorOLD:4691\n            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);\n            //$LASTPOS=41004745;//kernel.MapEditorOLD:4745\n            _this.mode=_this.prevMode;\n            //$LASTPOS=41004769;//kernel.MapEditorOLD:4769\n            Tonyu.globals.$mp.scrollTo(1000,1000);\n            //$LASTPOS=41004803;//kernel.MapEditorOLD:4803\n            _this.print(_this.mode+" mode");\n            //$LASTPOS=41004833;//kernel.MapEditorOLD:4833\n            _this.fiber$updateEx(_thread, 10);\n            __pc=17;return;\n          case 17:\n            \n            __pc=23;break;\n          case 18:\n            //$LASTPOS=41004858;//kernel.MapEditorOLD:4858\n            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }\n            {\n              //$LASTPOS=41004901;//kernel.MapEditorOLD:4901\n              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);\n            }\n            __pc=22;break;\n          case 19:\n            //$LASTPOS=41004954;//kernel.MapEditorOLD:4954\n            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }\n            //$LASTPOS=41004997;//kernel.MapEditorOLD:4997\n            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);\n            //$LASTPOS=41005046;//kernel.MapEditorOLD:5046\n            _this.mode="set";\n            //$LASTPOS=41005067;//kernel.MapEditorOLD:5067\n            _this.print(_this.mode+" mode");\n            //$LASTPOS=41005097;//kernel.MapEditorOLD:5097\n            _this.fiber$updateEx(_thread, 10);\n            __pc=20;return;\n          case 20:\n            \n          case 21:\n            \n          case 22:\n            \n          case 23:\n            \n          case 24:\n            \n          case 25:\n            \n            //$LASTPOS=41005123;//kernel.MapEditorOLD:5123\n            _this.fiber$update(_thread);\n            __pc=26;return;\n          case 26:\n            \n            __pc=14;break;\n          case 27:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Pad\',\n  shortName: \'Pad\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [],\n  methods: {\n    main :function _trc_Pad_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=42001202;//kernel.Pad:1202\n      _this.APAD_DIAG_SIZE=96;\n      //$LASTPOS=42003465;//kernel.Pad:3465\n      while (true) {\n        //$LASTPOS=42003484;//kernel.Pad:3484\n        _this.padUpdate();\n        //$LASTPOS=42003502;//kernel.Pad:3502\n        _this.update();\n        \n      }\n    },\n    fiber$main :function _trc_Pad_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=42001202;//kernel.Pad:1202\n      _this.APAD_DIAG_SIZE=96;\n      \n      _thread.enter(function _trc_Pad_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=42003465;//kernel.Pad:3465\n          case 1:\n            //$LASTPOS=42003484;//kernel.Pad:3484\n            _this.fiber$padUpdate(_thread);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=42003502;//kernel.Pad:3502\n            _this.fiber$update(_thread);\n            __pc=3;return;\n          case 3:\n            \n            __pc=1;break;\n          case 4:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initialize :function _trc_Pad_initialize(opt) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=42000033;//kernel.Pad:33\n      Tonyu.classes.kernel.Actor.apply( _this, [opt]);\n      //$LASTPOS=42000050;//kernel.Pad:50\n      _this.padImageP=Tonyu.globals.$pat_inputPad;\n      //$LASTPOS=42000082;//kernel.Pad:82\n      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000183;//kernel.Pad:183\n      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000292;//kernel.Pad:292\n      _this.jujiKey.show();\n      //$LASTPOS=42000313;//kernel.Pad:313\n      _this.no1Key.show();\n      //$LASTPOS=42000339;//kernel.Pad:339\n      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000446;//kernel.Pad:446\n      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000553;//kernel.Pad:553\n      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000660;//kernel.Pad:660\n      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000767;//kernel.Pad:767\n      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=42000879;//kernel.Pad:879\n      _this.jujiKeyPushU.hide();\n      //$LASTPOS=42000905;//kernel.Pad:905\n      _this.jujiKeyPushL.hide();\n      //$LASTPOS=42000931;//kernel.Pad:931\n      _this.jujiKeyPushR.hide();\n      //$LASTPOS=42000957;//kernel.Pad:957\n      _this.jujiKeyPushD.hide();\n      //$LASTPOS=42000983;//kernel.Pad:983\n      _this.jujiKeyPush1.hide();\n    },\n    die :function _trc_Pad_die() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=42001021;//kernel.Pad:1021\n      _this.jujiKey.die();\n      //$LASTPOS=42001041;//kernel.Pad:1041\n      _this.no1Key.die();\n      //$LASTPOS=42001060;//kernel.Pad:1060\n      _this.jujiKeyPushU.die();\n      //$LASTPOS=42001085;//kernel.Pad:1085\n      _this.jujiKeyPushL.die();\n      //$LASTPOS=42001110;//kernel.Pad:1110\n      _this.jujiKeyPushR.die();\n      //$LASTPOS=42001135;//kernel.Pad:1135\n      _this.jujiKeyPushD.die();\n      //$LASTPOS=42001160;//kernel.Pad:1160\n      _this.jujiKeyPush1.die();\n      //$LASTPOS=42001185;//kernel.Pad:1185\n      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);\n    },\n    padUpdate :function _trc_Pad_padUpdate() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var i;\n      var t;\n      \n      //$LASTPOS=42001258;//kernel.Pad:1258\n      _this.keyPushL=0;\n      //$LASTPOS=42001277;//kernel.Pad:1277\n      _this.keyPushR=0;\n      //$LASTPOS=42001296;//kernel.Pad:1296\n      _this.keyPushU=0;\n      //$LASTPOS=42001315;//kernel.Pad:1315\n      _this.keyPushD=0;\n      //$LASTPOS=42001334;//kernel.Pad:1334\n      _this.keyPush1=0;\n      //$LASTPOS=42001359;//kernel.Pad:1359\n      _this.padKeyNotapCnt++;\n      //$LASTPOS=42001383;//kernel.Pad:1383\n      //$LASTPOS=42001388;//kernel.Pad:1388\n      i = 0;\n      while(i<5) {\n        {\n          //$LASTPOS=42001436;//kernel.Pad:1436\n          t = Tonyu.globals.$touches[i];\n          //$LASTPOS=42001466;//kernel.Pad:1466\n          if (t.touched) {\n            //$LASTPOS=42001496;//kernel.Pad:1496\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {\n              //$LASTPOS=42001593;//kernel.Pad:1593\n              _this.keyPushU=1;\n            }\n            //$LASTPOS=42001620;//kernel.Pad:1620\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {\n              //$LASTPOS=42001717;//kernel.Pad:1717\n              _this.keyPushD=1;\n            }\n            //$LASTPOS=42001744;//kernel.Pad:1744\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n              //$LASTPOS=42001841;//kernel.Pad:1841\n              _this.keyPushL=1;\n            }\n            //$LASTPOS=42001868;//kernel.Pad:1868\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n              //$LASTPOS=42001965;//kernel.Pad:1965\n              _this.keyPushR=1;\n            }\n            //$LASTPOS=42001992;//kernel.Pad:1992\n            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {\n              //$LASTPOS=42002054;//kernel.Pad:2054\n              _this.keyPush1=1;\n            }\n            //$LASTPOS=42002081;//kernel.Pad:2081\n            _this.padKeySW=1;\n            //$LASTPOS=42002108;//kernel.Pad:2108\n            _this.padKeyNotapCnt=0;\n            \n          }\n        }\n        i++;\n      }\n      //$LASTPOS=42002173;//kernel.Pad:2173\n      if (_this.keyPushL) {\n        //$LASTPOS=42002187;//kernel.Pad:2187\n        _this.keyCntL++;\n      } else {\n        //$LASTPOS=42002204;//kernel.Pad:2204\n        _this.keyCntL=0;\n      }\n      //$LASTPOS=42002222;//kernel.Pad:2222\n      if (_this.keyPushR) {\n        //$LASTPOS=42002236;//kernel.Pad:2236\n        _this.keyCntR++;\n      } else {\n        //$LASTPOS=42002253;//kernel.Pad:2253\n        _this.keyCntR=0;\n      }\n      //$LASTPOS=42002271;//kernel.Pad:2271\n      if (_this.keyPushU) {\n        //$LASTPOS=42002285;//kernel.Pad:2285\n        _this.keyCntU++;\n      } else {\n        //$LASTPOS=42002302;//kernel.Pad:2302\n        _this.keyCntU=0;\n      }\n      //$LASTPOS=42002320;//kernel.Pad:2320\n      if (_this.keyPushD) {\n        //$LASTPOS=42002334;//kernel.Pad:2334\n        _this.keyCntD++;\n      } else {\n        //$LASTPOS=42002351;//kernel.Pad:2351\n        _this.keyCntD=0;\n      }\n      //$LASTPOS=42002369;//kernel.Pad:2369\n      if (_this.keyPush1) {\n        //$LASTPOS=42002383;//kernel.Pad:2383\n        _this.keyCnt1++;\n      } else {\n        //$LASTPOS=42002400;//kernel.Pad:2400\n        _this.keyCnt1=0;\n      }\n      //$LASTPOS=42002435;//kernel.Pad:2435\n      if (_this.keyPushL) {\n        //$LASTPOS=42002449;//kernel.Pad:2449\n        _this.jujiKeyPushL.show();\n      } else {\n        //$LASTPOS=42002475;//kernel.Pad:2475\n        _this.jujiKeyPushL.hide();\n      }\n      //$LASTPOS=42002501;//kernel.Pad:2501\n      if (_this.keyPushR) {\n        //$LASTPOS=42002515;//kernel.Pad:2515\n        _this.jujiKeyPushR.show();\n      } else {\n        //$LASTPOS=42002541;//kernel.Pad:2541\n        _this.jujiKeyPushR.hide();\n      }\n      //$LASTPOS=42002567;//kernel.Pad:2567\n      if (_this.keyPushU) {\n        //$LASTPOS=42002581;//kernel.Pad:2581\n        _this.jujiKeyPushU.show();\n      } else {\n        //$LASTPOS=42002607;//kernel.Pad:2607\n        _this.jujiKeyPushU.hide();\n      }\n      //$LASTPOS=42002633;//kernel.Pad:2633\n      if (_this.keyPushD) {\n        //$LASTPOS=42002647;//kernel.Pad:2647\n        _this.jujiKeyPushD.show();\n      } else {\n        //$LASTPOS=42002673;//kernel.Pad:2673\n        _this.jujiKeyPushD.hide();\n      }\n      //$LASTPOS=42002699;//kernel.Pad:2699\n      if (_this.keyPush1) {\n        //$LASTPOS=42002713;//kernel.Pad:2713\n        _this.jujiKeyPush1.show();\n      } else {\n        //$LASTPOS=42002739;//kernel.Pad:2739\n        _this.jujiKeyPush1.hide();\n      }\n    },\n    fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var i;\n      var t;\n      \n      //$LASTPOS=42001258;//kernel.Pad:1258\n      _this.keyPushL=0;\n      //$LASTPOS=42001277;//kernel.Pad:1277\n      _this.keyPushR=0;\n      //$LASTPOS=42001296;//kernel.Pad:1296\n      _this.keyPushU=0;\n      //$LASTPOS=42001315;//kernel.Pad:1315\n      _this.keyPushD=0;\n      //$LASTPOS=42001334;//kernel.Pad:1334\n      _this.keyPush1=0;\n      //$LASTPOS=42001359;//kernel.Pad:1359\n      _this.padKeyNotapCnt++;\n      //$LASTPOS=42001383;//kernel.Pad:1383\n      //$LASTPOS=42001388;//kernel.Pad:1388\n      i = 0;\n      while(i<5) {\n        {\n          //$LASTPOS=42001436;//kernel.Pad:1436\n          t = Tonyu.globals.$touches[i];\n          //$LASTPOS=42001466;//kernel.Pad:1466\n          if (t.touched) {\n            //$LASTPOS=42001496;//kernel.Pad:1496\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {\n              //$LASTPOS=42001593;//kernel.Pad:1593\n              _this.keyPushU=1;\n            }\n            //$LASTPOS=42001620;//kernel.Pad:1620\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {\n              //$LASTPOS=42001717;//kernel.Pad:1717\n              _this.keyPushD=1;\n            }\n            //$LASTPOS=42001744;//kernel.Pad:1744\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n              //$LASTPOS=42001841;//kernel.Pad:1841\n              _this.keyPushL=1;\n            }\n            //$LASTPOS=42001868;//kernel.Pad:1868\n            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {\n              //$LASTPOS=42001965;//kernel.Pad:1965\n              _this.keyPushR=1;\n            }\n            //$LASTPOS=42001992;//kernel.Pad:1992\n            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {\n              //$LASTPOS=42002054;//kernel.Pad:2054\n              _this.keyPush1=1;\n            }\n            //$LASTPOS=42002081;//kernel.Pad:2081\n            _this.padKeySW=1;\n            //$LASTPOS=42002108;//kernel.Pad:2108\n            _this.padKeyNotapCnt=0;\n            \n          }\n        }\n        i++;\n      }\n      //$LASTPOS=42002173;//kernel.Pad:2173\n      if (_this.keyPushL) {\n        //$LASTPOS=42002187;//kernel.Pad:2187\n        _this.keyCntL++;\n      } else {\n        //$LASTPOS=42002204;//kernel.Pad:2204\n        _this.keyCntL=0;\n      }\n      //$LASTPOS=42002222;//kernel.Pad:2222\n      if (_this.keyPushR) {\n        //$LASTPOS=42002236;//kernel.Pad:2236\n        _this.keyCntR++;\n      } else {\n        //$LASTPOS=42002253;//kernel.Pad:2253\n        _this.keyCntR=0;\n      }\n      //$LASTPOS=42002271;//kernel.Pad:2271\n      if (_this.keyPushU) {\n        //$LASTPOS=42002285;//kernel.Pad:2285\n        _this.keyCntU++;\n      } else {\n        //$LASTPOS=42002302;//kernel.Pad:2302\n        _this.keyCntU=0;\n      }\n      //$LASTPOS=42002320;//kernel.Pad:2320\n      if (_this.keyPushD) {\n        //$LASTPOS=42002334;//kernel.Pad:2334\n        _this.keyCntD++;\n      } else {\n        //$LASTPOS=42002351;//kernel.Pad:2351\n        _this.keyCntD=0;\n      }\n      //$LASTPOS=42002369;//kernel.Pad:2369\n      if (_this.keyPush1) {\n        //$LASTPOS=42002383;//kernel.Pad:2383\n        _this.keyCnt1++;\n      } else {\n        //$LASTPOS=42002400;//kernel.Pad:2400\n        _this.keyCnt1=0;\n      }\n      //$LASTPOS=42002435;//kernel.Pad:2435\n      if (_this.keyPushL) {\n        //$LASTPOS=42002449;//kernel.Pad:2449\n        _this.jujiKeyPushL.show();\n      } else {\n        //$LASTPOS=42002475;//kernel.Pad:2475\n        _this.jujiKeyPushL.hide();\n      }\n      //$LASTPOS=42002501;//kernel.Pad:2501\n      if (_this.keyPushR) {\n        //$LASTPOS=42002515;//kernel.Pad:2515\n        _this.jujiKeyPushR.show();\n      } else {\n        //$LASTPOS=42002541;//kernel.Pad:2541\n        _this.jujiKeyPushR.hide();\n      }\n      //$LASTPOS=42002567;//kernel.Pad:2567\n      if (_this.keyPushU) {\n        //$LASTPOS=42002581;//kernel.Pad:2581\n        _this.jujiKeyPushU.show();\n      } else {\n        //$LASTPOS=42002607;//kernel.Pad:2607\n        _this.jujiKeyPushU.hide();\n      }\n      //$LASTPOS=42002633;//kernel.Pad:2633\n      if (_this.keyPushD) {\n        //$LASTPOS=42002647;//kernel.Pad:2647\n        _this.jujiKeyPushD.show();\n      } else {\n        //$LASTPOS=42002673;//kernel.Pad:2673\n        _this.jujiKeyPushD.hide();\n      }\n      //$LASTPOS=42002699;//kernel.Pad:2699\n      if (_this.keyPush1) {\n        //$LASTPOS=42002713;//kernel.Pad:2713\n        _this.jujiKeyPush1.show();\n      } else {\n        //$LASTPOS=42002739;//kernel.Pad:2739\n        _this.jujiKeyPush1.hide();\n      }\n      \n      _thread.retVal=_this;return;\n    },\n    getPadUp :function _trc_Pad_getPadUp() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntU;\n    },\n    fiber$getPadUp :function _trc_Pad_f_getPadUp(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntU;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getPadDown :function _trc_Pad_getPadDown() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntD;\n    },\n    fiber$getPadDown :function _trc_Pad_f_getPadDown(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntD;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getPadLeft :function _trc_Pad_getPadLeft() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntL;\n    },\n    fiber$getPadLeft :function _trc_Pad_f_getPadLeft(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntL;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getPadRight :function _trc_Pad_getPadRight() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntR;\n    },\n    fiber$getPadRight :function _trc_Pad_f_getPadRight(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntR;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getPadButton :function _trc_Pad_getPadButton(i) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var value;\n      \n      //$LASTPOS=42002940;//kernel.Pad:2940\n      value;\n      //$LASTPOS=42002956;//kernel.Pad:2956\n      if (i==0) {\n        //$LASTPOS=42002968;//kernel.Pad:2968\n        value=_this.keyCnt1;\n      }\n      return value;\n    },\n    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var value;\n      \n      //$LASTPOS=42002940;//kernel.Pad:2940\n      value;\n      //$LASTPOS=42002956;//kernel.Pad:2956\n      if (i==0) {\n        //$LASTPOS=42002968;//kernel.Pad:2968\n        value=_this.keyCnt1;\n      }\n      _thread.retVal=value;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getUp :function _trc_Pad_getUp() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntU;\n    },\n    fiber$getUp :function _trc_Pad_f_getUp(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntU;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getDown :function _trc_Pad_getDown() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntD;\n    },\n    fiber$getDown :function _trc_Pad_f_getDown(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntD;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getLeft :function _trc_Pad_getLeft() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntL;\n    },\n    fiber$getLeft :function _trc_Pad_f_getLeft(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntL;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getRight :function _trc_Pad_getRight() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.keyCntR;\n    },\n    fiber$getRight :function _trc_Pad_f_getRight(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=_this.keyCntR;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    getButton :function _trc_Pad_getButton(i) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var value;\n      \n      //$LASTPOS=42003163;//kernel.Pad:3163\n      value;\n      //$LASTPOS=42003179;//kernel.Pad:3179\n      if (i==0) {\n        //$LASTPOS=42003191;//kernel.Pad:3191\n        value=_this.keyCnt1;\n      }\n      return value;\n    },\n    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var value;\n      \n      //$LASTPOS=42003163;//kernel.Pad:3163\n      value;\n      //$LASTPOS=42003179;//kernel.Pad:3179\n      if (i==0) {\n        //$LASTPOS=42003191;//kernel.Pad:3191\n        value=_this.keyCnt1;\n      }\n      _thread.retVal=value;return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    isOnRect :function _trc_Pad_isOnRect(mx,my,rx,ry,rx2,ry2) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);\n    },\n    fiber$isOnRect :function _trc_Pad_f_isOnRect(_thread,mx,my,rx,ry,rx2,ry2) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    isOnRectWH :function _trc_Pad_isOnRectWH(mx,my,rx,ry,rw,rh) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);\n    },\n    fiber$isOnRectWH :function _trc_Pad_f_isOnRectWH(_thread,mx,my,rx,ry,rw,rh) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.Boot\',\n  shortName: \'Boot\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.Actor,\n  includes: [Tonyu.classes.kernel.T2MediaPlayer],\n  methods: {\n    main :function _trc_Boot_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43002040;//kernel.Boot:2040\n      Tonyu.globals.$Boot=_this;\n      //$LASTPOS=43002053;//kernel.Boot:2053\n      _this.initSounds();\n      //$LASTPOS=43002068;//kernel.Boot:2068\n      _this.initSprites();\n      //$LASTPOS=43002084;//kernel.Boot:2084\n      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;\n      //$LASTPOS=43002115;//kernel.Boot:2115\n      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);\n      //$LASTPOS=43002152;//kernel.Boot:2152\n      _this.initThread();\n      //$LASTPOS=43002169;//kernel.Boot:2169\n      Tonyu.globals.$pat_fruits=30;\n      //$LASTPOS=43002186;//kernel.Boot:2186\n      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;\n      //$LASTPOS=43002203;//kernel.Boot:2203\n      Tonyu.globals.$Math=Math;\n      //$LASTPOS=43002216;//kernel.Boot:2216\n      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=43002326;//kernel.Boot:2326\n      Tonyu.globals.$consolePrintY=465-15;\n      //$LASTPOS=43002350;//kernel.Boot:2350\n      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});\n      //$LASTPOS=43002490;//kernel.Boot:2490\n      if (typeof  SplashScreen!="undefined") {\n        //$LASTPOS=43002528;//kernel.Boot:2528\n        SplashScreen.hide();\n      }\n      //$LASTPOS=43002550;//kernel.Boot:2550\n      _this.initFPSParams();\n      //$LASTPOS=43002570;//kernel.Boot:2570\n      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;\n      //$LASTPOS=43002591;//kernel.Boot:2591\n      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;\n      //$LASTPOS=43002612;//kernel.Boot:2612\n      while (true) {\n        //$LASTPOS=43002652;//kernel.Boot:2652\n        _this.scheduler.stepsAll();\n        //$LASTPOS=43002679;//kernel.Boot:2679\n        Tonyu.globals.$Keys.update();\n        //$LASTPOS=43002700;//kernel.Boot:2700\n        Tonyu.globals.$InputDevice.update();\n        //$LASTPOS=43002728;//kernel.Boot:2728\n        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;\n        //$LASTPOS=43002761;//kernel.Boot:2761\n        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;\n        //$LASTPOS=43002796;//kernel.Boot:2796\n        _this.doDraw=_this.now()<_this.deadLine;\n        //$LASTPOS=43002824;//kernel.Boot:2824\n        if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {\n          //$LASTPOS=43002878;//kernel.Boot:2878\n          _this.doDraw=true;\n          //$LASTPOS=43002900;//kernel.Boot:2900\n          _this.resetDeadLine();\n          \n        }\n        //$LASTPOS=43002929;//kernel.Boot:2929\n        if (_this.doDraw) {\n          //$LASTPOS=43002972;//kernel.Boot:2972\n          Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);\n          //$LASTPOS=43003017;//kernel.Boot:3017\n          Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n          //$LASTPOS=43003057;//kernel.Boot:3057\n          Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);\n          //$LASTPOS=43003102;//kernel.Boot:3102\n          Tonyu.globals.$Screen.draw();\n          //$LASTPOS=43003127;//kernel.Boot:3127\n          _this.fps_fpsCnt++;\n          //$LASTPOS=43003151;//kernel.Boot:3151\n          _this.frameSkipped=0;\n          \n        } else {\n          //$LASTPOS=43003190;//kernel.Boot:3190\n          _this.frameSkipped++;\n          \n        }\n        //$LASTPOS=43003218;//kernel.Boot:3218\n        Tonyu.globals.$Sprites.checkHit();\n        //$LASTPOS=43003244;//kernel.Boot:3244\n        Tonyu.globals.$Sprites.removeOneframes();\n        //$LASTPOS=43003277;//kernel.Boot:3277\n        _this.fps_rpsCnt++;\n        //$LASTPOS=43003297;//kernel.Boot:3297\n        _this.measureFps();\n        //$LASTPOS=43003316;//kernel.Boot:3316\n        _this.waitFrame();\n        //$LASTPOS=43003343;//kernel.Boot:3343\n        while (_this.paused) {\n          //$LASTPOS=43003368;//kernel.Boot:3368\n          _this.waitFor(Tonyu.timeout(1));\n          //$LASTPOS=43003404;//kernel.Boot:3404\n          if (! _this.paused) {\n            //$LASTPOS=43003417;//kernel.Boot:3417\n            _this.resetDeadLine();\n          }\n          \n        }\n        \n      }\n    },\n    fiber$main :function _trc_Boot_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=43002040;//kernel.Boot:2040\n      Tonyu.globals.$Boot=_this;\n      \n      _thread.enter(function _trc_Boot_ent_main(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43002053;//kernel.Boot:2053\n            _this.fiber$initSounds(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=43002068;//kernel.Boot:2068\n            _this.fiber$initSprites(_thread);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=43002084;//kernel.Boot:2084\n            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;\n            //$LASTPOS=43002115;//kernel.Boot:2115\n            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);\n            //$LASTPOS=43002152;//kernel.Boot:2152\n            _this.fiber$initThread(_thread);\n            __pc=3;return;\n          case 3:\n            \n            //$LASTPOS=43002169;//kernel.Boot:2169\n            Tonyu.globals.$pat_fruits=30;\n            //$LASTPOS=43002186;//kernel.Boot:2186\n            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;\n            //$LASTPOS=43002203;//kernel.Boot:2203\n            Tonyu.globals.$Math=Math;\n            //$LASTPOS=43002216;//kernel.Boot:2216\n            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});\n            //$LASTPOS=43002326;//kernel.Boot:2326\n            Tonyu.globals.$consolePrintY=465-15;\n            //$LASTPOS=43002350;//kernel.Boot:2350\n            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});\n            //$LASTPOS=43002490;//kernel.Boot:2490\n            if (typeof  SplashScreen!="undefined") {\n              //$LASTPOS=43002528;//kernel.Boot:2528\n              SplashScreen.hide();\n            }\n            //$LASTPOS=43002550;//kernel.Boot:2550\n            _this.initFPSParams();\n            //$LASTPOS=43002570;//kernel.Boot:2570\n            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;\n            //$LASTPOS=43002591;//kernel.Boot:2591\n            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;\n            //$LASTPOS=43002612;//kernel.Boot:2612\n          case 4:\n            //$LASTPOS=43002652;//kernel.Boot:2652\n            _this.scheduler.stepsAll();\n            //$LASTPOS=43002679;//kernel.Boot:2679\n            Tonyu.globals.$Keys.update();\n            //$LASTPOS=43002700;//kernel.Boot:2700\n            Tonyu.globals.$InputDevice.update();\n            //$LASTPOS=43002728;//kernel.Boot:2728\n            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;\n            //$LASTPOS=43002761;//kernel.Boot:2761\n            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;\n            //$LASTPOS=43002796;//kernel.Boot:2796\n            _this.doDraw=_this.now()<_this.deadLine;\n            //$LASTPOS=43002824;//kernel.Boot:2824\n            if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {\n              //$LASTPOS=43002878;//kernel.Boot:2878\n              _this.doDraw=true;\n              //$LASTPOS=43002900;//kernel.Boot:2900\n              _this.resetDeadLine();\n              \n            }\n            //$LASTPOS=43002929;//kernel.Boot:2929\n            if (_this.doDraw) {\n              //$LASTPOS=43002972;//kernel.Boot:2972\n              Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);\n              //$LASTPOS=43003017;//kernel.Boot:3017\n              Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);\n              //$LASTPOS=43003057;//kernel.Boot:3057\n              Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);\n              //$LASTPOS=43003102;//kernel.Boot:3102\n              Tonyu.globals.$Screen.draw();\n              //$LASTPOS=43003127;//kernel.Boot:3127\n              _this.fps_fpsCnt++;\n              //$LASTPOS=43003151;//kernel.Boot:3151\n              _this.frameSkipped=0;\n              \n            } else {\n              //$LASTPOS=43003190;//kernel.Boot:3190\n              _this.frameSkipped++;\n              \n            }\n            //$LASTPOS=43003218;//kernel.Boot:3218\n            Tonyu.globals.$Sprites.checkHit();\n            //$LASTPOS=43003244;//kernel.Boot:3244\n            Tonyu.globals.$Sprites.removeOneframes();\n            //$LASTPOS=43003277;//kernel.Boot:3277\n            _this.fps_rpsCnt++;\n            //$LASTPOS=43003297;//kernel.Boot:3297\n            _this.measureFps();\n            //$LASTPOS=43003316;//kernel.Boot:3316\n            _this.fiber$waitFrame(_thread);\n            __pc=5;return;\n          case 5:\n            \n            //$LASTPOS=43003343;//kernel.Boot:3343\n          case 6:\n            if (!(_this.paused)) { __pc=8; break; }\n            //$LASTPOS=43003368;//kernel.Boot:3368\n            _this.fiber$waitFor(_thread, Tonyu.timeout(1));\n            __pc=7;return;\n          case 7:\n            \n            //$LASTPOS=43003404;//kernel.Boot:3404\n            if (! _this.paused) {\n              //$LASTPOS=43003417;//kernel.Boot:3417\n              _this.resetDeadLine();\n            }\n            __pc=6;break;\n          case 8:\n            \n            __pc=4;break;\n          case 9:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initialize :function _trc_Boot_initialize(param) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43000206;//kernel.Boot:206\n      _this.extend(param);\n    },\n    update :function _trc_Boot_update() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43000242;//kernel.Boot:242\n      _this.waitFor(Tonyu.timeout(50));\n    },\n    fiber$update :function _trc_Boot_f_update(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.enter(function _trc_Boot_ent_update(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43000242;//kernel.Boot:242\n            _this.fiber$waitFor(_thread, Tonyu.timeout(50));\n            __pc=1;return;\n          case 1:\n            \n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initSprites :function _trc_Boot_initSprites() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var a;\n      var rs;\n      var r;\n      var name;\n      var val;\n      var _it_314;\n      \n      //$LASTPOS=43000323;//kernel.Boot:323\n      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();\n      //$LASTPOS=43000352;//kernel.Boot:352\n      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();\n      //$LASTPOS=43000386;//kernel.Boot:386\n      _this.print("Loading plugins..");\n      //$LASTPOS=43000420;//kernel.Boot:420\n      a = _this.asyncResult();\n      //$LASTPOS=43000446;//kernel.Boot:446\n      Tonyu.globals.$currentProject.loadPlugins(a.receiver);\n      //$LASTPOS=43000492;//kernel.Boot:492\n      _this.waitFor(a);\n      //$LASTPOS=43000509;//kernel.Boot:509\n      _this.print("Loading pats..");\n      //$LASTPOS=43000540;//kernel.Boot:540\n      rs = Tonyu.globals.$currentProject.getResource();\n      //$LASTPOS=43000583;//kernel.Boot:583\n      a=_this.asyncResult();\n      //$LASTPOS=43000605;//kernel.Boot:605\n      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});\n      //$LASTPOS=43000690;//kernel.Boot:690\n      _this.waitFor(a);\n      //$LASTPOS=43000707;//kernel.Boot:707\n      r = a[0];\n      //$LASTPOS=43000724;//kernel.Boot:724\n      Tonyu.globals.$Sprites.setImageList(r);\n      //$LASTPOS=43000755;//kernel.Boot:755\n      _it_314=Tonyu.iterator(r.names,2);\n      while(_it_314.next()) {\n        name=_it_314[0];\n        val=_it_314[1];\n        \n        //$LASTPOS=43000796;//kernel.Boot:796\n        Tonyu.setGlobal(name,val);\n        \n      }\n      //$LASTPOS=43000836;//kernel.Boot:836\n      _this.print("Loading pats done.");\n      //$LASTPOS=43000871;//kernel.Boot:871\n      _this.cvj=$("canvas");\n      //$LASTPOS=43000893;//kernel.Boot:893\n      if (Tonyu.noviceMode) {\n        //$LASTPOS=43000926;//kernel.Boot:926\n        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});\n        \n      } else {\n        //$LASTPOS=43001010;//kernel.Boot:1010\n        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});\n        \n      }\n    },\n    fiber$initSprites :function _trc_Boot_f_initSprites(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var a;\n      var rs;\n      var r;\n      var name;\n      var val;\n      var _it_314;\n      \n      //$LASTPOS=43000323;//kernel.Boot:323\n      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();\n      //$LASTPOS=43000352;//kernel.Boot:352\n      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();\n      //$LASTPOS=43000386;//kernel.Boot:386\n      _this.print("Loading plugins..");\n      //$LASTPOS=43000420;//kernel.Boot:420\n      a = _this.asyncResult();\n      //$LASTPOS=43000446;//kernel.Boot:446\n      Tonyu.globals.$currentProject.loadPlugins(a.receiver);\n      \n      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43000492;//kernel.Boot:492\n            _this.fiber$waitFor(_thread, a);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=43000509;//kernel.Boot:509\n            _this.print("Loading pats..");\n            //$LASTPOS=43000540;//kernel.Boot:540\n            rs = Tonyu.globals.$currentProject.getResource();\n            //$LASTPOS=43000583;//kernel.Boot:583\n            a=_this.asyncResult();\n            //$LASTPOS=43000605;//kernel.Boot:605\n            ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});\n            //$LASTPOS=43000690;//kernel.Boot:690\n            _this.fiber$waitFor(_thread, a);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=43000707;//kernel.Boot:707\n            r = a[0];\n            //$LASTPOS=43000724;//kernel.Boot:724\n            Tonyu.globals.$Sprites.setImageList(r);\n            //$LASTPOS=43000755;//kernel.Boot:755\n            _it_314=Tonyu.iterator(r.names,2);\n            while(_it_314.next()) {\n              name=_it_314[0];\n              val=_it_314[1];\n              \n              //$LASTPOS=43000796;//kernel.Boot:796\n              Tonyu.setGlobal(name,val);\n              \n            }\n            //$LASTPOS=43000836;//kernel.Boot:836\n            _this.print("Loading pats done.");\n            //$LASTPOS=43000871;//kernel.Boot:871\n            _this.cvj=$("canvas");\n            //$LASTPOS=43000893;//kernel.Boot:893\n            if (Tonyu.noviceMode) {\n              //$LASTPOS=43000926;//kernel.Boot:926\n              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});\n              \n            } else {\n              //$LASTPOS=43001010;//kernel.Boot:1010\n              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});\n              \n            }\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initSounds :function _trc_Boot_initSounds() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43001103;//kernel.Boot:1103\n      _this.print("Loading sounds...");\n      //$LASTPOS=43001137;//kernel.Boot:1137\n      _this.initT2MediaPlayer();\n      //$LASTPOS=43001163;//kernel.Boot:1163\n      _this.loadFromProject(Tonyu.globals.$currentProject);\n      //$LASTPOS=43001202;//kernel.Boot:1202\n      _this.print("Loading sounds done.");\n      //$LASTPOS=43001239;//kernel.Boot:1239\n      _this.on("stop",(function anonymous_1249() {\n        \n        //$LASTPOS=43001261;//kernel.Boot:1261\n        _this.clearSEData();\n      }));\n      //$LASTPOS=43001289;//kernel.Boot:1289\n      Tonyu.globals.$sound=_this;\n    },\n    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=43001103;//kernel.Boot:1103\n      _this.print("Loading sounds...");\n      \n      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43001137;//kernel.Boot:1137\n            _this.fiber$initT2MediaPlayer(_thread);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=43001163;//kernel.Boot:1163\n            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);\n            __pc=2;return;\n          case 2:\n            \n            //$LASTPOS=43001202;//kernel.Boot:1202\n            _this.print("Loading sounds done.");\n            //$LASTPOS=43001239;//kernel.Boot:1239\n            _this.on("stop",(function anonymous_1249() {\n              \n              //$LASTPOS=43001261;//kernel.Boot:1261\n              _this.clearSEData();\n            }));\n            //$LASTPOS=43001289;//kernel.Boot:1289\n            Tonyu.globals.$sound=_this;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    hide :function _trc_Boot_hide() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    initThread :function _trc_Boot_initThread() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var o;\n      var mainClassName;\n      \n      //$LASTPOS=43001392;//kernel.Boot:1392\n      o = Tonyu.currentProject.getOptions();\n      //$LASTPOS=43001438;//kernel.Boot:1438\n      mainClassName = o.run.mainClass;\n      //$LASTPOS=43001478;//kernel.Boot:1478\n      _this.print("MainClass= "+mainClassName);\n      //$LASTPOS=43001519;//kernel.Boot:1519\n      _this.mainClass=Tonyu.getClass(mainClassName);\n      //$LASTPOS=43001565;//kernel.Boot:1565\n      if (! _this.mainClass) {\n        //$LASTPOS=43001592;//kernel.Boot:1592\n        TError(mainClassName+" というクラスはありません","不明",0).raise();\n        \n      }\n      //$LASTPOS=43001729;//kernel.Boot:1729\n      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;\n      //$LASTPOS=43001770;//kernel.Boot:1770\n      new _this.mainClass();\n    },\n    fiber$initThread :function _trc_Boot_f_initThread(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var o;\n      var mainClassName;\n      \n      //$LASTPOS=43001392;//kernel.Boot:1392\n      o = Tonyu.currentProject.getOptions();\n      //$LASTPOS=43001438;//kernel.Boot:1438\n      mainClassName = o.run.mainClass;\n      //$LASTPOS=43001478;//kernel.Boot:1478\n      _this.print("MainClass= "+mainClassName);\n      //$LASTPOS=43001519;//kernel.Boot:1519\n      _this.mainClass=Tonyu.getClass(mainClassName);\n      //$LASTPOS=43001565;//kernel.Boot:1565\n      if (! _this.mainClass) {\n        //$LASTPOS=43001592;//kernel.Boot:1592\n        TError(mainClassName+" というクラスはありません","不明",0).raise();\n        \n      }\n      //$LASTPOS=43001729;//kernel.Boot:1729\n      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;\n      //$LASTPOS=43001770;//kernel.Boot:1770\n      new _this.mainClass();\n      \n      _thread.retVal=_this;return;\n    },\n    stop :function _trc_Boot_stop() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43001806;//kernel.Boot:1806\n      _this.fireEvent("stop");\n      //$LASTPOS=43001830;//kernel.Boot:1830\n      _this.die();\n    },\n    fiber$stop :function _trc_Boot_f_stop(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      //$LASTPOS=43001806;//kernel.Boot:1806\n      _this.fireEvent("stop");\n      //$LASTPOS=43001830;//kernel.Boot:1830\n      _this.die();\n      \n      _thread.retVal=_this;return;\n    },\n    schedule :function _trc_Boot_schedule(obj,method,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var th;\n      \n      //$LASTPOS=43001875;//kernel.Boot:1875\n      method=method||"main";\n      //$LASTPOS=43001903;//kernel.Boot:1903\n      args=args||[];\n      //$LASTPOS=43001923;//kernel.Boot:1923\n      th = _this.scheduler.newThread(obj,method,args);\n      //$LASTPOS=43001975;//kernel.Boot:1975\n      _this.addThreadGroup(obj);\n      //$LASTPOS=43002001;//kernel.Boot:2001\n      obj.addThread(th);\n      return th;\n    },\n    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var th;\n      \n      //$LASTPOS=43001875;//kernel.Boot:1875\n      method=method||"main";\n      //$LASTPOS=43001903;//kernel.Boot:1903\n      args=args||[];\n      //$LASTPOS=43001923;//kernel.Boot:1923\n      th = _this.scheduler.newThread(obj,method,args);\n      \n      _thread.enter(function _trc_Boot_ent_schedule(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43001975;//kernel.Boot:1975\n            _this.fiber$addThreadGroup(_thread, obj);\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=43002001;//kernel.Boot:2001\n            obj.addThread(th);\n            _thread.exit(th);return;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    initFPSParams :function _trc_Boot_initFPSParams() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43003497;//kernel.Boot:3497\n      _this._fps=30;\n      //$LASTPOS=43003513;//kernel.Boot:3513\n      _this.maxframeSkip=5;\n      //$LASTPOS=43003563;//kernel.Boot:3563\n      _this.frameCnt=0;\n      //$LASTPOS=43003582;//kernel.Boot:3582\n      _this.resetDeadLine();\n      //$LASTPOS=43003604;//kernel.Boot:3604\n      _this.lastMeasured=_this.now();\n      //$LASTPOS=43003629;//kernel.Boot:3629\n      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;\n    },\n    now :function _trc_Boot_now() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return new Date().getTime();\n    },\n    resetDeadLine :function _trc_Boot_resetDeadLine() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43003759;//kernel.Boot:3759\n      _this.deadLine=_this.now()+1000/_this._fps;\n      //$LASTPOS=43003790;//kernel.Boot:3790\n      _this.frameSkipped=0;\n    },\n    waitFrame :function _trc_Boot_waitFrame() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      var wt;\n      \n      //$LASTPOS=43003834;//kernel.Boot:3834\n      wt = _this.deadLine-_this.now();\n      //$LASTPOS=43003862;//kernel.Boot:3862\n      if (wt<1) {\n        //$LASTPOS=43003883;//kernel.Boot:3883\n        if (wt<- 1000) {\n          //$LASTPOS=43003897;//kernel.Boot:3897\n          _this.resetDeadLine();\n        }\n        //$LASTPOS=43003923;//kernel.Boot:3923\n        wt=1;\n        \n      }\n      //$LASTPOS=43003941;//kernel.Boot:3941\n      wt=_this.floor(wt);\n      //$LASTPOS=43003960;//kernel.Boot:3960\n      _this.waitFor(Tonyu.timeout(wt));\n      //$LASTPOS=43003993;//kernel.Boot:3993\n      _this.deadLine+=1000/_this._fps;\n    },\n    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      var wt;\n      \n      //$LASTPOS=43003834;//kernel.Boot:3834\n      wt = _this.deadLine-_this.now();\n      //$LASTPOS=43003862;//kernel.Boot:3862\n      if (wt<1) {\n        //$LASTPOS=43003883;//kernel.Boot:3883\n        if (wt<- 1000) {\n          //$LASTPOS=43003897;//kernel.Boot:3897\n          _this.resetDeadLine();\n        }\n        //$LASTPOS=43003923;//kernel.Boot:3923\n        wt=1;\n        \n      }\n      //$LASTPOS=43003941;//kernel.Boot:3941\n      wt=_this.floor(wt);\n      \n      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {\n        if (_thread.lastEx) __pc=_thread.catchPC;\n        for(var __cnt=100 ; __cnt--;) {\n          switch (__pc) {\n          case 0:\n            //$LASTPOS=43003960;//kernel.Boot:3960\n            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));\n            __pc=1;return;\n          case 1:\n            \n            //$LASTPOS=43003993;//kernel.Boot:3993\n            _this.deadLine+=1000/_this._fps;\n            _thread.exit(_this);return;\n          }\n        }\n      });\n    },\n    getFrameRate :function _trc_Boot_getFrameRate() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this._fps;\n    },\n    setFrameRate :function _trc_Boot_setFrameRate(fps,maxFrameSkip) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43004153;//kernel.Boot:4153\n      _this._fps=fps;\n      //$LASTPOS=43004170;//kernel.Boot:4170\n      if (typeof  maxFrameSkip!="number") {\n        //$LASTPOS=43004205;//kernel.Boot:4205\n        maxFrameSkip=5;\n      }\n      //$LASTPOS=43004226;//kernel.Boot:4226\n      _this.maxFrameSkip=maxFrameSkip;\n      //$LASTPOS=43004265;//kernel.Boot:4265\n      _this.resetDeadLine();\n    },\n    getMeasuredFps :function _trc_Boot_getMeasuredFps() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.fps_fps;\n    },\n    getMeasuredRps :function _trc_Boot_getMeasuredRps() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      return _this.fps_rps;\n    },\n    measureFps :function _trc_Boot_measureFps() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=43004476;//kernel.Boot:4476\n      if (_this.now()>_this.lastMeasured+1000) {\n        //$LASTPOS=43004516;//kernel.Boot:4516\n        _this.fps_fps=_this.fps_fpsCnt;\n        //$LASTPOS=43004545;//kernel.Boot:4545\n        _this.fps_rps=_this.fps_rpsCnt;\n        //$LASTPOS=43004574;//kernel.Boot:4574\n        _this.fps_fpsCnt=0;\n        //$LASTPOS=43004597;//kernel.Boot:4597\n        _this.fps_rpsCnt=0;\n        //$LASTPOS=43004620;//kernel.Boot:4620\n        _this.lastMeasured=_this.now();\n        \n      }\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"hide":{"nowait":true},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}\n});\nTonyu.klass.define({\n  fullName: \'kernel.DxChar\',\n  shortName: \'DxChar\',\n  namespace: \'kernel\',\n  superclass: Tonyu.classes.kernel.SpriteChar,\n  includes: [],\n  methods: {\n    main :function _trc_DxChar_main() {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n    },\n    fiber$main :function _trc_DxChar_f_main(_thread) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      //var _arguments=Tonyu.A(arguments);\n      var __pc=0;\n      \n      \n      _thread.retVal=_this;return;\n    },\n    initialize :function _trc_DxChar_initialize(xx,yy,pp,ff,sz,rt,al) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=44000057;//kernel.DxChar:57\n      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);\n      //$LASTPOS=44000082;//kernel.DxChar:82\n      _this.scaleX=1;\n      //$LASTPOS=44000097;//kernel.DxChar:97\n      if (sz) {\n        //$LASTPOS=44000105;//kernel.DxChar:105\n        _this.scaleX=sz;\n      }\n      //$LASTPOS=44000121;//kernel.DxChar:121\n      _this.angle=0;\n      //$LASTPOS=44000135;//kernel.DxChar:135\n      if (rt) {\n        //$LASTPOS=44000143;//kernel.DxChar:143\n        _this.angle=rt;\n      }\n      //$LASTPOS=44000158;//kernel.DxChar:158\n      _this.alpha=255;\n      //$LASTPOS=44000174;//kernel.DxChar:174\n      if (al) {\n        //$LASTPOS=44000182;//kernel.DxChar:182\n        _this.alpha=al;\n      }\n    },\n    draw :function _trc_DxChar_draw(c) {\n      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);\n      \n      //$LASTPOS=44000212;//kernel.DxChar:212\n      _this.rotation=_this.angle;\n      //$LASTPOS=44000233;//kernel.DxChar:233\n      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);\n    },\n    __dummy: false\n  },\n  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}\n});\n',
      'js/index.html': '<script src="concat.js"></script>\n',
      'options.json': '{\n    "compiler":{\n        "namespace": "kernel",\n        "commentLastPos": true,\n        "outputFile": "js/concat.js"\n    }\n}\n',
      'physics/': '{"BodyActor.tonyu":{"lastUpdate":1437628346060},"T2Body.tonyu":{"lastUpdate":1425264703379},"T2Mod.tonyu":{"lastUpdate":1431610155789},"T2World.tonyu":{"lastUpdate":1431611371521}}',
      'physics/BodyActor.tonyu': 'extends Actor;\nincludes T2Mod;\nnative Box2D;\n\n\\getWorld() {\n    if ($t2World) return $t2World;\n    $t2World=new T2World;\n    return $t2World;\n}\n\\onAppear() {\n    var wworld=getWorld();\n    world=wworld.world;\n    scale=wworld.scale;\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var b2BodyDef = Box2D.Dynamics.b2BodyDef;\n    var b2Body = Box2D.Dynamics.b2Body;\n    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;\n    var b2Fixture = Box2D.Dynamics.b2Fixture;\n    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;\n    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;\n    \n    var fixDef = new b2FixtureDef;\n    fixDef.density = defv(density, 1.0);\n    fixDef.friction = defv(friction, 0.5);\n    fixDef.restitution = defv(restitution, 0.2);\n    \n    var bodyDef = new b2BodyDef;\n    bodyDef.type = isStatic ? b2Body.b2_staticBody :\n    b2Body.b2_dynamicBody;\n    \n    bodyDef.position.x = x /scale;\n    bodyDef.position.y = y /scale;\n    shape=shape || (radius ? "circle" : "box");\n    var w=width,h=height;\n    if (!w) {\n        detectShape();\n        w=width*(scaleX||1);\n        h=height*(scaleY||scaleX||1);\n    }\n    if (shape=="box") {\n        if (!h) h=w;\n        fixDef.shape = new b2PolygonShape;\n        fixDef.shape.SetAsOrientedBox(w/2/scale, h/2/scale,\n        new b2Vec2(0,0),0);\n    } else {\n        radius=radius || w/2 || 16;\n        fixDef.shape = new b2CircleShape(\n        radius/scale\n        );\n        width=height=radius*2;\n    } \n    var fps=wworld.fps;\n    var r=rotation,ve=bvec(defv(vx*fps ,0),defv(vy*fps,0)),vr=defv(vrotation,0);\n    body=world.CreateBody(bodyDef);\n    body.CreateFixture(fixDef);\n    body.SetUserData(this);\n    body.SetLinearVelocity(ve);\n    rotation=r;\n    vrotation=vr;\n}\n\\allContactPoints(klass) {\n    var res=[],m,point;\n    var w=getWorld();\n    for (var c=world.GetContactList();c;c=c.GetNext()) {\n        if (c.IsTouching()) {\n	        c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);\n            if (m.m_points[0]) {\n                if (m.m_points[1] && m.m_points[1].x && m.m_points[1].y) {\n	            	point={\n	            	x:(m.m_points[0].x+m.m_points[1].x)/2*w.scale, \n	            	y:(m.m_points[0].y+m.m_points[1].y)/2*w.scale};\n                } else {\n    	        	point={x:m.m_points[0].x*w.scale, y:m.m_points[0].y*w.scale};\n                } \n            } else point={x,y};\n            var a=c.GetFixtureA().GetBody().GetUserData();\n            var b=c.GetFixtureB().GetBody().GetUserData();\n            if (a===this) {\n                if (!klass || b===klass || b instanceof klass) {\n                    res.push{target:b, manifold:m, x:point.x,y:point.y };\n                }\n            } else if (b===this) {\n                if (!klass || a===klass || a instanceof klass) {\n                    res.push{target:a, manifold:m, x:point.x,y:point.y };\n                }\n            }\n        }\n    }\n    return res;\n}\n\\contactPoint(klass) {\n   return allContactPoints(klass)[0];\n}\n\\allContact(klass) {\n   return allContacts(klass);\n}\n\\allContacts(klass) {\n    var res=[];\n    for (var c=world.GetContactList();c;c=c.GetNext()) {\n        if (c.IsTouching()) {\n            var a=c.GetFixtureA().GetBody().GetUserData();\n            var b=c.GetFixtureB().GetBody().GetUserData();\n            if (a===this) {\n                if (!klass || b===klass || b instanceof klass) {\n                    res.push(b);\n                }\n            } else if (b===this) {\n                if (!klass || a===klass || a instanceof klass) {\n                    res.push(a);\n                }\n            }\n        }\n    }\n    return res;\n}\n\\applyForce(fx,fy,px,py) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var scale=getWorld().scale;\n    var fps=60;\n    body.ApplyForce(new b2Vec2(fx ,fy),body.GetPosition());\n}\n\\applyImpulse(fx,fy,px,py) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    var scale=getWorld().scale;\n    var fps=60;\n    body.ApplyImpulse(new b2Vec2(fx ,fy),body.GetPosition());\n}\n\n\\applyTorque(a) {\n    body.ApplyTorque(a);\n}\n\\moveBy(dx,dy) {\n    var pos=body.GetPosition();\n    pos.x+=dx/scale;\n    pos.y+=dy/scale;\n    body.SetPosition(pos);\n}\n\\contactTo(t) {\n    return allContact(t)[0];\n}\n\\die() {\n    super.die();\n    world.DestroyBody(body);\n}\n\\addRevoluteJoint(params) {\n    // params:{x?,y?,other?}\n    params=params||{};\n    var px=params.x||x;\n    var py=params.y||y;\n    var wworld=getWorld();//wraped_world\n    var scale=wworld.scale;\n    var world=wworld.world;\n    var b2BodyDef = Box2D.Dynamics.b2BodyDef;\n    var b2Body = Box2D.Dynamics.b2Body;\n    var JDC=Box2D.Dynamics.Joints.b2RevoluteJointDef;\n    var jd=new JDC;\n    var bodyDef = new b2BodyDef;\n    bodyDef.type = b2Body.b2_staticBody;\n    bodyDef.position.x = px /scale;\n    bodyDef.position.y = py /scale;\n    var bodyB=world.CreateBody(bodyDef);\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    jd.Initialize(body,bodyB,new b2Vec2(px/scale, py/scale));\n    if (params.lowerAngle && params.upperAngle) {\n       jd.lowerAngle = rad(params.lowerAngle);\n       jd.upperAngle = rad(params.upperAngle);\n       jd.enableLimit = true;\n    }\n    world.CreateJoint(jd);    \n}\n\\rotation {\n    if (!body || manualRotation) return _rotation;\n    return deg(body.GetAngle());\n}\n\\rotation=r {\n    r=r||0;\n    if (!body || manualRotation) return _rotation=r;\n    body.SetAngle(rad(r));\n} \n\n\\updatePos() {\n/*    if (!body) return;\n    var scale=getWorld().scale;\n    var pos=body.GetPosition();\n    x=pos.x*scale;\n    y=pos.y*scale;*/\n}\n\n\\x {\n    if (!body) return _x;\n    var pos=body.GetPosition();\n    return pos.x*scale;\n}\n\\x=v {\n    if (!body) return _x=v;\n    v=v||0;\n    var pos=body.GetPosition();\n    pos.x=v/scale;\n    body.SetPosition(pos);\n}\n\\y {\n    if (!body) return _y;\n    var pos=body.GetPosition();\n    return pos.y*scale;\n}\n\\y=v {\n    if (!body) return _y=v;\n    v=v||0;\n    var pos=body.GetPosition();\n    pos.y=v/scale;\n    body.SetPosition(pos);\n}\n\n\\vx {\n    if (!body) return _vx;\n    var v=body.GetLinearVelocity();\n    return v.x*scale/getWorld().fps;\n}\n\\vx=v {\n    if (!body) return _vx=v;\n    v=v||0;\n    var ve=body.GetLinearVelocity();\n    ve.x=v/scale*getWorld().fps;\n    if (v) body.SetAwake(true);\n    body.SetLinearVelocity(ve);\n}\n\n\\vy {\n    if (!body) return _vy;\n    var v=body.GetLinearVelocity();\n    return v.y*scale/getWorld().fps;\n}\n\\vy=v {\n    if (!body) return _vy=v;\n    var ve=body.GetLinearVelocity();\n    ve.y=v/scale*getWorld().fps;\n    if (v) body.SetAwake(true);\n    body.SetLinearVelocity(ve);\n}\n\\vrotation {\n    if (!body) return _vr;\n    return deg(body.GetAngularVelocity()/getWorld().fps);\n}\n\\vrotation=v {\n    if (!body) return _vr=v;\n    v=v||0;\n    if (v) body.SetAwake(true);\n    body.SetAngularVelocity(rad(v*getWorld().fps));\n}\n\n',
      'physics/T2Body.tonyu': 'extends BodyActor;\n',
      'physics/T2Mod.tonyu': 'native Box2D;\n\n\\bvec(tx,ty) {\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    return new b2Vec2(tx/scale,ty/scale);  \n}\n\n\\defv(t,d) {\n    return ( t===t && (typeof t)==="number") ? t : d;\n}\n\n',
      'physics/T2World.tonyu': 'extends Actor;\n\nincludes T2Mod;\n\nnative Box2D;\nnative Tonyu;\n\\onAppear() {\n    $currentProject.requestPlugin("box2d");  \n    initWorld();\n}\nloop();\n\n\n\\initWorld() {\n    gravity=defv(gravity, 9.8);\n    gravityX=defv(gravityX, 0);\n    fps=$Boot.getFrameRate();\n    var b2World = Box2D.Dynamics.b2World;\n    var b2Vec2 = Box2D.Common.Math.b2Vec2;\n    scale=scale || 32;\n    world = new b2World(\n    new b2Vec2(gravityX, gravity)    //gravity\n    ,  true                 //allow sleep\n    );\n    $t2World=this;\n    $Boot.on("stop",releaseWorld);\n    on("die",releaseWorld);\n}\n\\releaseWorld() {\n    if ($t2World===this) $t2World=null;\n}\n\n\\loop() {\n    while(true) {\n        fps=$Boot.getFrameRate();\n        world.Step(\n        1 / fps  //frame-rate\n        ,  10       //velocity iterations\n        ,  10       //position iterations\n        );\n        //world.DrawDebugData();\n        world.ClearForces();\n        //updatePos();\n        update();\n    }\n}\n\\updatePos() {\n    for (var b=world.GetBodyList();b;b=b.GetNext()) {\n        var d=b.GetUserData();\n        if(d) d.updatePos();\n    }\n}\n',
      'sound/': '{"MediaPlayer.tonyu":{"lastUpdate":1421384204625},"MML.tonyu":{"lastUpdate":1424849946399},"PlayMod.tonyu":{"lastUpdate":1425018365373},"T2MediaPlayer.tonyu":{"lastUpdate":1432611755126},"WaveTable.tonyu":{"lastUpdate":1412697666000}}',
      'sound/MML.tonyu': 'extends TObject;\nincludes MathMod;\nnative T;\n\nmmlBuf=[];\n\\play(mmls) {\n    mmlBuf.push(mmls);\n    if (!isPlaying()) {\n        playNext();\n    }\n}\n\\playNext() {\n    //print("play!", id(), bufferCount());\n    if (cTimeBase==null) cTimeBase=0;\n    if (m) {\n        cTimeBase+=m.currentTime;\n        //print(m.currentTime);\n    }\n    var mml=mmlBuf.shift();\n    if (!mml) {\n        m=null;\n        cTimeBase=0;\n        return;\n    }\n    mwav=$WaveTable.get(0,0).play();\n    m=T("mml", {mml}, mwav);\n    m.on("ended", playNext);\n    m.start();\n    $MMLS[id()]=this;\n}\n\\id() {\n    if (!_id) _id=rnd()+"";\n    return _id;\n}\n\\bufferCount() {\n    return mmlBuf.length;\n}\n\\isPlaying() {\n    return m;\n}\n\\currentTime() {\n    if (m) return m.currentTime+cTimeBase;\n    return -1;\n}\n\\stop() {\n    if (m) {\n        if (mwav) {\n            mwav.pause();\n            mwav.stop();\n        }\n        m.pause();\n        m.stop();\n        m=null;\n        mmlBuf=[];\n        //print("stop!", id(), bufferCount());\n        delete $MMLS[id()];\n    }\n}\n',
      'sound/MediaPlayer.tonyu': '\n\\play() {\n    \n}\n\\stop() {\n    \n}\n\\playSE() {\n    \n}\n\\setDelay(){\n    \n}\n\\setVolume(){\n    \n}',
      'sound/PlayMod.tonyu': 'extends BaseActor;\nnowait \\initMML() {\n    if (mmlInited) return;\n    mmlInited=true;\n    $currentProject.requestPlugin("timbre");\n    if (!$MMLS) {\n       $MMLS={};\n       $WaveTable=new WaveTable;\n       $Boot.on("stop", releaseMML);\n    }\n    on("die") \\() { play().stop(); };\n}\nnowait \\releaseMML() {\n    if ($MMLS) {\n       for (var k,v in $MMLS) {\n          v.stop();\n       }\n       $MMLS=null;\n    } \n    if ($WaveTable) {\n       $WaveTable.stop();\n       $WaveTable=null;\n    }\n}\n\\play() {\n    initMML();\n    if (!_mml) _mml=new MML;\n    if (isDead() || arguments.length==0) return _mml;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    _mml.play(mmls);\n    while (_mml.bufferCount()>2) {\n        update();\n    }\n    return _mml;\n}\nnowait \\playSE() {\n    initMML();\n    var mml=new MML;\n    var mmls=[];\n    for (var i=0; i<arguments.length; i++) {\n        mmls.push(arguments[i]);\n    }\n    mml.play(mmls);\n    return mml;\n}\n',
      'sound/T2MediaPlayer.tonyu': 'extends Actor;\n\nnative T2MediaLib;\nnative Tonyu;\n\n\\new() {\n    initT2MediaPlayer();\n}\n\n\\initT2MediaPlayer() {\n    if (T2MediaLib.inited) return;\n    T2MediaLib.init();\n    T2MediaLib.inited=true;\n    bgmPlayerMax = T2MediaLib.bgmPlayerMax;\n}\n\n\\clearSEData() {\n    T2MediaLib.allStopBGM();\n    T2MediaLib.allClearData();\n}\n\n\\clearBGMData() {\n    clearSEData();\n}\n\n\\deleteSEData(idx) {\n    T2MediaLib.clearData(idx);\n}\n\n// SE //\n\\loadSE(idx, src) {//@hoge1e3\n    // 非同期呼び出し\n    runAsync \\(succ,err) {\n       // 読み込み完了するまでブロッキング\n       T2MediaLib.loadSE(idx, src) {succ,err};\n    };\n    var data = T2MediaLib.getSEData(idx);\n    /*\n    while (data == null) {\n        update();\n        data = T2MediaLib.getSEData(idx);\n    }*/\n    return data;\n}\n\n\\available {\n    return !!T2MediaLib.context;\n}\n//@hoge1e3\n\\loadFromProject(prj) {\n    if (!available) return;\n    var r=prj.getResource();\n    if (!r || !r.sounds) return;\n    for (var s in r.sounds) {\n         var name=s.name, url=Tonyu.Assets.resolve(s.url, prj.getDir());\n         Tonyu.setGlobal(name, name);\n         try {\n            print("Loading Sound2: "+name);\n            loadSE(name, url);\n         } catch(e) {\n            print("Fail");\n            Tonyu.setGlobal(name, "ERROR");\n         }\n    }\n}\n\n\n// vol:0-128\n\\playSE(idx, vol, rate, offset, loop, loopStart, loopEnd) {\n    if (mute) return;\n    // vol : Tonyu1のように0～128の範囲にする\n    if (vol == null) vol = 128;\n    // vol はgainで実装しているため絶対値の大きい値を入れると危険\n    // そのため0.0～1.0の範囲になるようにする\n    if      (vol <   0) vol =   0;\n    else if (vol > 128) vol = 128;\n    return T2MediaLib.playSE(idx, vol / 128, rate, offset, loop, loopStart, loopEnd);\n}\n\n\\stopSE(sourceObj) {\n    return T2MediaLib.stopSE(sourceObj);\n}\n\n\\getSEData(idx) {\n    return T2MediaLib.getSEData(idx);\n}\n\n\n// BGM //\n\\loadBGM(idx, src) {\n    // 非同期呼び出し\n    T2MediaLib.loadBGM(idx, src);\n    // 読み込み完了するまでブロッキング\n    var data = T2MediaLib.getBGMData(idx);\n    while (data == null) {\n        update();\n        data = T2MediaLib.getBGMData(idx);\n    }\n    return data;\n}\n\n\\playBGM(idx, loop, offset, loopStart, loopEnd) {\n    if (mute) return;\n    if (loop === null) loop = false;\n    if (offset === null) offset = 0;\n    return T2MediaLib.playBGM(0, idx, loop, offset, loopStart, loopEnd);\n}\n\n\\stopBGM() {\n    return T2MediaLib.stopBGM(0);\n}\n\n\\pauseBGM() {\n    return T2MediaLib.pauseBGM(0);\n}\n\n\\resumeBGM() {\n    return T2MediaLib.resumeBGM(0);\n}\n\n\\setBGMVolume(vol) {\n    vol = vol / 128;\n    // vol はgainで実装しているため絶対値の大きい値を入れると危険\n    // そのため0.0～1.0の範囲になるようにする\n    if      (vol > 1.0) vol = 1.0;\n    else if (vol < 0.0) vol = 0.0;\n    return T2MediaLib.setBGMVolume(0, vol);\n}\n\n\\setBGMTempo(tempo) {\n    //if      (tempo > 4.0) tempo = 4.0;\n    //else if (tempo < 0.5) tempo = 0.5;\n    return T2MediaLib.setBGMTempo(0, tempo);\n}\n\n\\getBGMCurrentTime() {\n    return T2MediaLib.getBGMCurrentTime(0);\n}\n\n\\getBGMLength() {\n    return T2MediaLib.getBGMLength(0);\n}\n\n\\getBGMData(idx) {\n    return T2MediaLib.getBGMData(idx);\n}\n\n\n\n// BGM ID指定 //\n\\playBGMID(id, idx, loop, offset, loopStart, loopEnd) {\n    if (loop === null) loop = false;\n    if (offset === null) offset = 0;\n    return T2MediaLib.playBGM(id, idx, loop, offset, loopStart, loopEnd);\n}\n\n\\stopBGMID(id) {\n    return T2MediaLib.stopBGM(id);\n}\n\n\\pauseBGMID(id) {\n    return T2MediaLib.pauseBGM(id);\n}\n\n\\resumeBGMID(id) {\n    return T2MediaLib.resumeBGM(id);\n}\n\n\\setBGMVolumeID(id, vol) {\n    vol = vol / 128;\n    // vol はgainで実装しているため絶対値の大きい値を入れると危険\n    // そのため0.0～1.0の範囲になるようにする\n    if      (vol > 1.0) vol = 1.0;\n    else if (vol < 0.0) vol = 0.0;\n    return T2MediaLib.setBGMVolume(id, vol);\n}\n\n\\setBGMTempoID(id, tempo) {\n    //if      (tempo > 4.0) tempo = 4.0;\n    //else if (tempo < 0.5) tempo = 0.5;\n    return T2MediaLib.setBGMTempo(id, tempo);\n}\n\n\\getBGMCurrentTimeID(id) {\n    return T2MediaLib.getBGMCurrentTime(id);\n}\n\n\\getBGMLengthID(id) {\n    return T2MediaLib.getBGMLength(id);\n}\n\n\\sizeBGMID() {\n    return T2MediaLib.getBGMPlayerMax();\n}\n\n\\allStopBGM() {\n    T2MediaLib.allStopBGM();\n}\n\n\n\n\\loadAudio(idx, src) {\n    // 非同期呼び出し\n    T2MediaLib.loadAudio(idx, src);\n    // 読み込み完了するまでブロッキング\n    while (T2MediaLib.getAudioData(idx) == null) update();\n}\n\n\\playAudio(idx, loop, startTime) {\n    if (loop === null) loop = false;\n    if (startTime === null) startTime = 0;\n    return T2MediaLib.playAudio(idx, loop, startTime);\n}\n\n\\stopAudio() {\n    return T2MediaLib.stopAudio();\n}\n\n\\pauseAudio() {\n    return T2MediaLib.pauseAudio();\n}\n\n\\resumeAudio() {\n    return T2MediaLib.resumeAudio();\n}\n\n\\setAudioVolume(vol) {\n    vol = vol / 128;\n    if      (vol > 1.0) vol = 1.0;\n    else if (vol < 0.0) vol = 0.0;\n    return T2MediaLib.setAudioVolume(vol);\n}\n\n\\setAudioTempo(tempo) {\n    if      (tempo > 4.0) tempo = 4.0;\n    else if (tempo < 0.5) tempo = 0.5;\n    return T2MediaLib.setAudioTempo(tempo);\n}\n\n\\setAudioPosition(time) {\n    return T2MediaLib.setAudioPosition(time);\n}\n\n\\getAudioCurrentTime() {\n    return T2MediaLib.getAudioCurrentTime();\n}\n\n\\getAudioLength() {\n    return T2MediaLib.getAudioLength();\n}\n\n\\getAudioData(idx) {\n    return T2MediaLib.getAudioData(idx);\n}\n',
      'sound/WaveTable.tonyu': 'extends TObject;\nnative T;\n\nwav={};\nenv={};\n\\setWav(num, synth) {\n    wav[num]=synth;\n}\n\\setEnv(num, synth) {\n    env[num]=synth;\n}\n\\get(w,e) {\n    var synth=T("OscGen") {osc:wav[w], env:env[e], mul:0.25};\n    return synth;\n}\n\\stop() {\n    /*for (var k,v in tbl) {\n        v.pause();\n        v.stop();\n    }*/\n}\n\nif (typeof T!=="undefined") {\n    //env=T("adsr", {a:0,d:200,s:0.5,r:10});\n    env = T("env",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\n    setEnv(0, env);\n    setWav(0, T("pulse"));\n    //    synth=T("OscGen") {wave:"pulse", env, mul:0.25};\n    //set(0,synth);    \n}\n',
      't1/': '{"DxChar.tonyu":{"lastUpdate":1421384204610},"PlainChar.tonyu":{"lastUpdate":1429593897129},"SecretChar.tonyu":{"lastUpdate":1421384204695},"SpriteChar.tonyu":{"lastUpdate":1421384204710},"T1Line.tonyu":{"lastUpdate":1427965036844},"T1Map.tonyu":{"lastUpdate":1421384204728},"T1Page.tonyu":{"lastUpdate":1421384204737},"T1Text.tonyu":{"lastUpdate":1427965019581},"TextChar.tonyu":{"lastUpdate":1429503038967}}',
      't1/DxChar.tonyu': 'extends SpriteChar;\n\n\\new (xx,yy,pp,ff,sz,rt,al){\n    super(xx,yy,pp,ff);\n    scaleX=1;\n    if (sz) scaleX=sz;\n    angle=0;\n    if (rt) angle=rt;\n    alpha=255;\n    if (al) alpha=al;\n}\n\\draw(c) {\n    rotation=angle;\n    super.draw(c);\n}\n',
      't1/PlainChar.tonyu': 'extends Actor;\n\nnative Tonyu;\nnative Math;\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        /*if ($Scheduler) {\n            _th=$Scheduler.newThread(this, "tMain", []);\n        } else {\n            var thg=currentThreadGroup();\n            if (thg) _th=thg.addObj(this,"tMain");\n        }*/\n        _th=$Boot.schedule(this,"tMain",[]);\n        initSprite();\n    }\n    if (typeof x=="object") Tonyu.extend(this,x);\n    else if (typeof x=="number") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n}\n\\draw(c) {\n    onDraw();\n    if (_isInvisible) return;\n    super.draw(c);\n}\n\\setVisible(v) {\n    _isInvisible=!v;\n}\n\\onDraw() {\n\n}\n\\update() {\n    onUpdate();\n    super.update();\n}\n\\onUpdate() {\n\n}\n\\initSprite() {\n    if(layer && typeof layer.add=="function"){\n        layer.add(this);\n    }else{\n        $Sprites.add(this);\n    }\n    onAppear();\n}\n\\tMain() {\n    main();\n    die();\n}\n/*\\color(r,g,b) {\n    return "rgb("+[r,g,b].join(",")+")";\n}\n\n\\drawText(x,y,text,col,size) {\n    if ($debug) return;\n    if (!size) size=15;\n    if (!col) col="cyan";\n    var tp=all(T1Text).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,text,fillStyle:col, size,hidden:false};\n    }else {\n        new T1Text{x,y,text,fillStyle:col, size};\n    }\n}\n\\drawLine(x,y,tx,ty,col) {\n    if (!col) col="white";\n    var tp=all(T1Line).find \\(t) {return t.hidden;};\n    if (tp.length>0) {\n        tp[0].extend{x,y,tx,ty,col};\n    }else {\n        new T1Line{x,y,tx,ty,col};\n    }\n}*/\n\\appear(t) {\n    return t;\n}\n\\trunc(f) {\n    return Math.trunc(f);\n}\n\\loadPage(page,arg){\n    all().die();\n    new page(arg);\n    die();\n}',
      't1/SecretChar.tonyu': 'extends PlainChar;\n\n\\draw(c) {\n    \n}',
      't1/SpriteChar.tonyu': 'extends PlainChar;\n\n\\new(x,y,p,f) {\n    super(x,y,p);\n    this.f=f;\n    if (!this.x) this.x=0;\n    if (!this.y) this.y=0;\n    if (!this.p) this.p=0;\n}\n\\draw(c) {\n    if (f) {\n        if (!scaleY) scaleY=scaleX;\n        scaleX*=-1;\n    }\n    super.draw(c);\n    if (f) scaleX*=-1;\n}',
      't1/T1Line.tonyu': 'extends Actor;\n\\draw(ctx) {\n    if (hidden) return;\n    \n    ctx.strokeStyle=col;\n    ctx.beginPath();\n    ctx.moveTo(x,y);\n    ctx.lineTo(tx,ty);\n    ctx.stroke();\n    hidden=true;\n}\n',
      't1/T1Map.tonyu': 'extends Map;\nnative Tonyu;\nnative $;\n\n\\setBGColor(c) {\n    $Screen.setBGColor(c);\n}\n\\load(fileName) {\n    /*\n    o={\n        "chipWidth":"32","chipHeight":"32",\n        "pTable":[{name:"$pat_aaa", p:10}, {name:"$pat_bbb","p":25} ],\n        "baseData":[\n        [//map\n        [0,6],[0,5],[1,3],\n        [1,3],[1,2],[0,5]\n        ],\n        [//mapOn\n        [-1,-1],[1,4],[0,2],\n        [-1,-1],[-1,-1],[1,8]\n        ]\n        ]\n    }\n    */\n    var f=file("../maps/").rel(fileName);\n    var o=f.obj();\n    chipWidth=o.chipWidth;\n    chipHeight=o.chipHeight;\n    baseData=o.baseData;\n    mapTable=conv(baseData[0],o.pTable);\n    mapData=mapTable;\n    row=mapTable.length;\n    col=mapTable[0].length;\n    mapOnTable=conv(baseData[1],o.pTable);\n    mapOnData=mapOnTable;\n    \n    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\n    initMap();   \n}\n\\conv(mat, tbl) {\n    var res=[];\n    mat.forEach \\(row) {\n        var rrow=[];\n        res.push(rrow);\n        row.forEach \\(dat) {// dat:[0,20]\n            var t=tbl[dat[0]];\n            if (t) rrow.push(Tonyu.globals[t.name]+dat[1]);\n            else rrow.push(dat[1]);\n        };\n    };\n    return res;\n}',
      't1/T1Page.tonyu': 'extends PlainChar;\n\n\\initGlobals() {\n    $chars=$Sprites.sprites;\n    $Boot.setFrameRate(60);\n    $clBlack=color(0,0,0);\n    $clRed=color(255,0,0);\n    $clGreen=color(0,255,0);\n    $clYellow=color(255,255,0);\n    $clBlue=color(0,0,255);\n    $clPink=color(255,0,255);\n    $clAqua=color(0,255,255);\n    $clWhite=color(255,255,255);\n    $mplayer=new MediaPlayer;\n}',
      't1/T1Text.tonyu': 'extends Actor;\n\\draw(c) {\n    if (hidden) return;\n    c.font=size+"px \'ＭＳ Ｐゴシック\'";\n    \n    super.draw(c);\n    hidden=true;\n}\n',
      't1/TextChar.tonyu': 'extends PlainChar;\nincludes TextRectMod;\n\n\\new (xx,yy,t,c,s){\n    super(xx,yy);\n    text="";\n    col=$clWhite;\n    size=20;\n    if (!this.x) this.x=0;\n    if (!this.y) this.y=0;\n    if (t) text=t;\n    if (c) fillStyle=c;\n    if (s) size=s;\n}\n\\draw(ctx) {\n    if (!size) size=15;\n    if (!align) align="left";\n    if (!fillStyle) fillStyle="white";\n    ctx.fillStyle=fillStyle;\n    ctx.globalAlpha=this.alpha/255;\n    ctx.font=size+"px \'ＭＳ Ｐゴシック\'";\n    var rect=drawTextRect(ctx, text, x, y, size, align , "fill");\n    width=rect.w;\n    height=rect.h;\n    \n    //    fillStyle=col;\n    //super.draw(ctx);\n}',
      'thread/': '{"ParallelMod.tonyu":{"lastUpdate":1435654079714},"Scheduler.tonyu":{"lastUpdate":1434441149517},"ThreadGroupMod.tonyu":{"lastUpdate":1430106770277}}',
      'thread/ParallelMod.tonyu': 'extends BaseActor;\nnative Tonyu;\n\nnowait \\parallel() {\n     var args=[];\n     for (var i=1; i<arguments.length; i++) {\n         args.push(arguments[i]);\n     }\n     var name=arguments[0];\n     var th;\n     th=$Boot.schedule(this,name,args);\n     return th;\n}\n\n',
      'thread/Scheduler.tonyu': 'extends TObject;\nnative Tonyu;\nnative console;\ncur=[];\nnext=[];\n\\addObj(obj,name,args) {\n    return newThread(obj, name, args);\n}\n\\newThread(obj, name, args, options) { //options:{pOrder, threadGroup}\n    name=name||"main";\n    args=args||[];\n    var th=Tonyu.thread();\n    th.apply(obj,name,args);\n    addToCur(th);\n    return th;\n}\n\\addToCur(th) {\n    cur.push(th);\n    th.scheduled=this;\n}\n\\addToNext(th) {\n    next.push(th);\n    th.scheduled=this;\n}\n\\stepsAll() {\n    for (var t in cur) {\n    	delete t.scheduled;\n        t.steps();\n        if (t.preempted) {\n            //console.log("Preempted: ",t);\n            addToNext(t);\n        }\n    }\n    cur=next;\n    next=[];\n}',
      'thread/ThreadGroupMod.tonyu': 'extends null;\n\n\\addThread(t) {\n    threads=threads||[];\n    threads.push(t);\n}\n\\addThreadGroup(tg) {\n    threadGroups=threadGroups||[];\n    threadGroups.push(tg);\n}\n\\killThreadGroup() {\n    if (threads) {\n        for (var thread in threads) {\n            thread.kill();\n        }\n    }\n    if (threadGroups) {\n        for (var threadGroup in threadGroups) {\n            threadGroup.killThreadGroup();\n        }\n    }\n}',
      'ui/': '{"GameConsole.tonyu":{"lastUpdate":1430361767671},"InputDevice.tonyu":{"lastUpdate":1437999921036},"Keys.tonyu":{"lastUpdate":1412697666000},"MapEditor.tonyu":{"lastUpdate":1437453536000},"MapEditorOLD.tonyu":{"lastUpdate":1421122943503},"Pad.tonyu":{"lastUpdate":1421122943510}}',
      'ui/GameConsole.tonyu': 'extends Actor;\nnative Math;\n\n\\new (opt) {\n    //opt{ canvas:$("canvas")  }\n    extend(opt);\n    cw=canvas.width();\n    ch=canvas.height();\n    $Sprites=new Sprites;\n    $Screen=gameScreen=new GameScreen{width:465, height:465, sprites:$Sprites};\n    $FrontSprites=sprites=new Sprites;\n    sprites.add(gameScreen);\n    cctx=canvas[0].getContext("2d");    \n}\n\\shouldDraw1x1(srcw,srch,dstw,dsth) {\n    // srcw=465 -> dstw=460...665\n    var larger=200;\n    var smaller=5;\n    return srcw-smaller<=dstw && dstw<=srcw+larger &&\n    srch-smaller<=dsth && dsth<=srch+larger;\n}\n\\layout() {\n    cw=canvas.width();\n    ch=canvas.height();\n    var width=gameScreen.width;\n    var height=gameScreen.height;\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    if (shouldDraw1x1(width,height,calcw,calch)) {\n        calcw=width;calch=height;\n    }\n    var marginw=Math.floor((cw-calcw)/2);\n    var marginh=Math.floor((ch-calch)/2);\n    gameScreen.setBounds{left:marginw,top:marginh, width: calcw, height:calch};\n}\n\\draw() {\n    layout();\n    sprites.draw(canvas[0]);\n}\n',
      'ui/InputDevice.tonyu': 'extends null;\nnative $;\nnative window;\nnative Tonyu;\nnative T2MediaLib;\n\\new() {\n    listeners=[];\n    touchEmu=true;\n}\n\\handleListeners() {\n    var l=listeners;\n    listeners=[];\n    while (l.length>0) { (l.shift())(); }\n}\n\\addOnetimeListener(l){\n    listeners.push(l);\n}\n\\initCanvasEvents(cvj) {\n    var cv=cvj[0];\n    $handleMouse=\\(e) {\n        var p=cvj.offset();\n        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\n        mp=$Screen.canvas2buf(mp);\n        $mouseX=mp.x;\n        $mouseY=mp.y;\n        if (touchEmu) {\n            $touches[0].x=mp.x;\n            $touches[0].y=mp.y;\n        }\n        handleListeners();\n    };\n    $touches=[{},{},{},{},{}];\n    $touches.findById=\\(id) {\n        for (var j=0 ; j<$touches.length ; j++) {\n            if ($touches[j].identifier==id) {\n                return $touches[j];\n            }\n        }\n    };\n    $handleTouch=\\(e) {\n        T2MediaLib.activate();\n        touchEmu=false;\n        var p=cvj.offset();\n        e.preventDefault();\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (!dst) {\n                for (var j=0 ; j<$touches.length ; j++) {\n                    if (!$touches[j].touched) {\n                        dst=$touches[j];\n                        dst.identifier=src.identifier;\n                        break;\n                    }\n                }\n            }\n            if (dst) {\n                mp={x:src.pageX-p.left, y:src.pageY-p.top};\n                mp=$Screen.canvas2buf(mp);\n                dst.x=mp.x;\n                dst.y=mp.y;\n                if(!dst.touched) dst.touched=1;\n            }\n        }\n        $mouseX=$touches[0].x;\n        $mouseY=$touches[0].y;\n        handleListeners();\n    };\n    $handleTouchEnd=\\(e) {\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (dst) {\n                dst.touched=0;\n                dst.identifier=-1;\n            }\n        }\n        handleListeners();\n    };\n    var handleMouse=\\(e){$handleMouse(e);};\n    var handleTouch=\\(e){$handleTouch(e);};\n    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\n    var d=$.data(cv,"events");\n    if (!d) {\n        $.data(cv,"events","true");\n        cvj.mousedown(handleMouse);\n        cvj.mousemove(handleMouse);\n        cvj.on("touchstart",handleTouch);\n        cvj.on("touchmove",handleTouch);\n        cvj.on("touchend",handleTouchEnd);\n    }\n}\n\n\\update() {\n    for (var i in $touches) {\n        if (i.touched>0) {i.touched++;}\n        if (i.touched==-1) i.touched=1;\n    }\n}',
      'ui/Keys.tonyu': 'extends TObject;\nnative String;\nnative $;\nnative document;\n//\\new () {this.main();}\nstats={};\ncodes={\n    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\n    shift:16, ctrl:17, alt:18, mouseleft: 1\n};\nfor (var i=65 ; i<65+26; i++) {\n    codes[String.fromCharCode(i).toLowerCase()]=i;\n}\nfor (var i=48 ; i<58; i++) {\n    codes[String.fromCharCode(i)]=i;\n}\nif (!$.data(document,"key_event")) {\n    $.data(document,"key_event",true);\n    $(document).keydown \\(e) {$Keys.keydown(e);};\n    $(document).keyup \\(e) {$Keys.keyup(e);};\n    $(document).mousedown \\(e) {\n        if ($InputDevice.touchEmu) {\n            $touches[0].touched=1;\n        }\n        $Keys.keydown{keyCode:1};\n    };\n    $(document).mouseup \\(e) {\n        if ($InputDevice.touchEmu) {\n            $touches[0].touched=0;\n        }\n        $Keys.keyup{keyCode:1};\n    };\n}\nfunction getkey(code) {\n    if (typeof code=="string") {\n        code=codes[code.toLowerCase()];\n    }\n    if (!code) return 0;\n    if (stats[code]==-1) return 0;\n    if (!stats[code]) stats[code]=0;\n    return stats[code];\n}\nfunction update() {\n    for (var i in stats) {\n        if (stats[i]>0) {stats[i]++;}\n        if (stats[i]==-1) stats[i]=1;\n    }\n}\n\\keydown(e) {\n    var s=stats[e.keyCode];\n    if (!s) {\n        stats[e.keyCode]=1;\n    }\n    $InputDevice.handleListeners();\n}\n\\keyup(e) {\n    stats[e.keyCode]=0;\n    $InputDevice.handleListeners();\n}',
      'ui/MapEditor.tonyu': 'extends Actor;\nnative prompt;\n$Screen.resize(480,640);\nloadMode=false;\nfileExist=false;\nprint("map file(s)");\nfileList=file("../maps/");\nfileList.recursive(function a(f){\n    f=f+"";\n    fNames=f.split("/");\n    print(fNames[fNames.length-1]);\n    fileExist=true;\n});\nif(fileExist){\n    print("Load Data?: Y or N");\n    while(true){\n        if(getkey("y")>0){\n            loadMode=true;\n            break;\n        }\n        if(getkey("n")>0){\n            loadMode=false;\n            break;\n        }\n        update();\n    }\n    if(loadMode){\n        fileName=prompt("Input json file (*.json)","map.json");\n        if(fileName){\n            mapDataFile=file("../maps/").rel(fileName);\n        }\n        if(mapDataFile.obj()){\n            baseData=mapDataFile.obj();\n        }else{\n            mapDataFile=file(fileName);\n            if(mapDataFile.obj()){\n                baseData=mapDataFile.obj();\n            }\n        }\n        if(baseData==undefined){\n            print("Load failed");\n            loadMode=false;\n        }else if(baseData[0] && baseData[1]){\n            mapData=baseData[0];\n            mapOnData=baseData[1];\n            if(baseData.length>2){\n                chipWidth=baseData[baseData.length-2];\n                chipHeight=baseData[baseData.length-1];\n            }\n        }\n    }\n}\nupdate();\n//if(mapData){\n    /*\n    print("Load Data?: Y or N");\n    while(true){\n        if(getkey("y")==1){\n            loadMode=true;\n            break;\n        }\n        if(getkey("n")==1){\n            loadMode=false;\n            break;\n        }\n    }*/\n//}\nif(!loadMode){\n    row=prompt("input row");\n    col=prompt("input col");\n    chipWidth=prompt("input chipWidth");\n    chipHeight=prompt("input chipHeight");\n    panel=new Panel{width:col*chipWidth,height:row*chipHeight};\n    panel.x=panel.width/2+40;\n    panel.y=panel.height/2+40;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n    $map=new Map{row,col,chipWidth,chipHeight};\n}else{\n    /*if(!mapOnData){\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData};\n    }else{\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData,mapOnData};\n    }*/\n    $map=new Map{chipWidth:32,chipHeight:32};\n    $map.load(fileName);\n    panel=new Panel{width:$map.col*$map.chipWidth,height:$map.row*$map.chipHeight,zOrder:100};\n    panel.x=panel.width/2+40;\n    panel.y=panel.height/2+40;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n}\n$mp=new Map{row:16,col:8,chipWidth:32,chipHeight:32};\ncounter=0;\nfor(var i=0;i<16;i++){\n    for(var j=0;j<8;j++){\n        $mp.set(j,i,$pat_mapchip+counter);\n        counter++;\n    }\n}\ndrawPanel();\nmode="get";\nprevMode="set";\nmapp=0;\nmx=-40;\nmy=-40;\nchipX=-40;\nchipY=-40;\nx=$screenWidth-chipWidth/2;\ny=$screenHeight-chipHeight/2;\n$map.scrollTo(mx,my);\nwhile(true){\n    p=mapp;\n    if(getkey("e")==1 || ($touches[0].touched==1 && $touches[0].x>0 && $touches[0].x<120 && $touches[0].y>560 && $touches[0].y<640)){\n        $mp.scrollTo(1000,1000);\n        mode="erase";\n        print(mode+" mode");\n    }\n    if(getkey("s")==1){\n        $mp.scrollTo(1000,1000);\n        if(mode=="set"){\n            mode="setOn";\n        }else{\n            mode="set";\n        }\n        print(mode+" mode");\n    }\n    if($touches[0].touched==1 && $touches[0].x>0 && $touches[0].x<120 && $touches[0].y>480 && $touches[0].y<560){\n        $mp.scrollTo(1000,1000);\n        mode="set";\n        print(mode+" mode");\n    }\n    if($touches[0].touched==1 && $touches[0].x>120 && $touches[0].x<240 && $touches[0].y>480 && $touches[0].y<560){\n        $mp.scrollTo(1000,1000);\n        mode="setOn";\n        print(mode+" mode");\n    }\n    if(getkey("o")==1){\n        $mp.scrollTo(1000,1000);\n        mode="setOn";\n    }\n    if(getkey("g")==1 || ($touches[0].touched==1 && $touches[0].x>240 && $touches[0].x<360 && $touches[0].y>480 && $touches[0].y<560)){\n        if(mode!="get"){\n            prevMode=mode;\n            $mp.scrollTo(-40,-40);\n            mode="get";\n            chipX=-40;\n            chipY=-40;\n        }else{\n            $mp.scrollTo(1000,1000);\n            mode=prevMode;\n        }\n        print(mode+" mode");\n    }\n    if(getkey("p")==1 || ($touches[0].touched==1 && $touches[0].x>360 && $touches[0].x<480 && $touches[0].y>480 && $touches[0].y<560)){\n        //add\n        saveFileName=prompt("input json file(*.json)","map.json");\n        /*print("mapTable=[");\n        data="[";\n        for(var i=0;i<$map.row-1;i++){\n            var tmp=[];\n            tmp=$map.mapTable[i].concat(tmp);\n            print("["+tmp+"],");\n            data+="["+tmp+"],";\n        }\n        var tmp=[];\n        tmp=$map.mapTable[i].concat(tmp);\n        print("["+tmp+"]");\n        data+="["+tmp+"]";\n        print("];");\n        data+="]";*/\n        //add\n        saveDataFile=file("../maps/").rel(saveFileName);\n        data=[$map.mapTable,$map.mapOnTable,$map.chipWidth,$map.chipHeight];\n        //comment\n        //mapDataFile.obj(data);\n        //add\n        saveDataFile.obj(data);\n        print(saveFileName+" Saved");\n        //mapDataFile.obj.push($map.mapOnTable);\n    }\n    if(getkey("c")==1 || ($touches[0].touched==1 && $touches[0].x>120 && $touches[0].x<240 && $touches[0].y>560 && $touches[0].y<640)){\n        $mp.scrollTo(1000,1000);\n        mode="copy";\n        print(mode+" mode");\n    }\n    if(mode!="get"){\n        if(getkey("left")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<40 && $touches[0].y<480)) mx=mx+8;\n        if(getkey("right")>0 || ($touches[0].touched && $touches[0].x>$screenWidth-40 && $touches[0].x<$screenWidth && $touches[0].y<480)) mx=mx-8;\n        if(getkey("up")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<$screenWidth && $touches[0].y<40)) my=my+8;\n        if(getkey("down")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<$screenWidth && $touches[0].y<480&&$touches[0].y>440)) my=my-8;\n        $map.scrollTo(mx,my);\n    }else{\n        if(getkey("left")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<40 && $touches[0].y<480)) chipX=chipX+8;\n        if(getkey("right")>0 || ($touches[0].touched && $touches[0].x>$screenWidth-40 && $touches[0].x<$screenWidth && $touches[0].y<480)) chipX=chipX-8;\n        if(getkey("up")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<$screenWidth && $touches[0].y<40)) chipY=chipY+8;\n        if(getkey("down")>0 || ($touches[0].touched && $touches[0].x>0 && $touches[0].x<$screenWidth && $touches[0].y<480&&$touches[0].y>440)) chipY=chipY-8;\n        $mp.scrollTo(chipX,chipY);\n    }\n    panel.x=panel.width/2-mx;\n    panel.y=panel.height/2-my;\n    if(mode=="set" && getkey(1)>0 && inRect()){\n        $map.setAt($mouseX+mx,$mouseY+my,mapp);\n        $map.setOnAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="erase" && getkey(1)>0 && inRect()){\n        $map.setAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="get" && getkey(1)>0 && inRect()){\n        mapp=$mp.getAt($mouseX+chipX,$mouseY+chipY);\n        mode=prevMode;\n        $mp.scrollTo(1000,1000);\n        print(mode+" mode");\n        updateEx(10);\n    }else if(mode=="setOn" && getkey(1)>0 && inRect()){\n        $map.setOnAt($mouseX+mx,$mouseY+my,mapp);\n    }else if(mode=="copy" && getkey(1)>0 && inRect()){\n        mapp=$map.getAt($mouseX+mx,$mouseY+my);\n        mode="set";\n        print(mode+" mode");\n        updateEx(10);\n    }\n    update();\n}\nfunction inRect(){\n    return $mouseX > 40 && $mouseX < $screenWidth-40 && \n    $mouseY > 40 && $mouseY < $screenHeight-200;\n}\nfunction drawPanel(){\n    $panel.setFillStyle("gray");\n    $panel.alpha=128;\n    $panel.fillRect(0,0,$screenWidth,40);\n    $panel.fillRect(0,0,40,$screenHeight-160);\n    $panel.fillRect($screenWidth-40,0,40,$screenHeight-160);\n    $panel.fillRect(0,$screenHeight-200,$screenWidth,40);\n    $panel.alpha=255;\n    $panel.setFillStyle("black");\n    //lower panel\n    $panel.fillRect(0,$screenHeight-160,120,80);\n    $panel.fillRect(120,$screenHeight-160,120,80);\n    $panel.fillRect(240,$screenHeight-160,120,80);\n    $panel.fillRect(360,$screenHeight-160,120,80);\n    $panel.fillRect(0,$screenHeight-80,120,80);\n    $panel.fillRect(120,$screenHeight-80,120,80);\n    $panel.setFillStyle("white");\n    $panel.fillRect(10,$screenHeight-150,100,60);\n    $panel.fillRect(130,$screenHeight-150,100,60);\n    $panel.fillRect(250,$screenHeight-150,100,60);\n    $panel.fillRect(370,$screenHeight-150,100,60);\n    $panel.fillRect(10,$screenHeight-70,100,60);\n    $panel.fillRect(130,$screenHeight-70,100,60);\n    $panel.setFillStyle("black");\n    //dir\n    $panel.fillText("▲",$screenWidth/2,30,40,"center");\n    $panel.fillText("◀",20,($screenHeight-200)/2,40,"center");\n    $panel.fillText("▼",$screenWidth/2,$screenHeight-160-10,40,"center");\n    $panel.fillText("▶",$screenWidth-20,($screenHeight-200)/2,40,"center");\n    //set setOn letter etc\n    $panel.fillText("set",$screenWidth/4-60,$screenHeight-110,40,"center");\n    $panel.fillText("setOn",$screenWidth/4+60,$screenHeight-110,35,"center");\n    $panel.fillText("get",$screenWidth/2+60,$screenHeight-110,40,"center");\n    $panel.fillText("save",$screenWidth-60,$screenHeight-110,40,"center");\n    $panel.fillText("erase",$screenWidth/4-60,$screenHeight-30,35,"center");\n    $panel.fillText("copy",$screenWidth/4+60,$screenHeight-30,35,"center");\n}',
      'ui/MapEditorOLD.tonyu': 'extends Actor;\nnative prompt;\nloadMode=false;\nprint("Load Data?: Y or N");\nwhile(true){\n    if(getkey("y")>0){\n        loadMode=true;\n        break;\n    }\n    if(getkey("n")>0){\n        loadMode=false;\n        break;\n    }\n    update();\n}\nif(loadMode){\n    fileName=prompt("Input json file (*.json)","map.json");\n    if(fileName){\n        mapDataFile=file("../maps/").rel(fileName);\n    }\n    if(mapDataFile.obj()){\n        baseData=mapDataFile.obj();\n    }else{\n        mapDataFile=file(fileName);\n        if(mapDataFile.obj()){\n            baseData=mapDataFile.obj();\n        }\n    }\n    if(baseData==undefined){\n        print("Load failed");\n        loadMode=false;\n    }else if(baseData[0] && baseData[1]){\n        mapData=baseData[0];\n        mapOnData=baseData[1];\n    }\n}\nupdate();\n//if(mapData){\n    /*\n    print("Load Data?: Y or N");\n    while(true){\n        if(getkey("y")==1){\n            loadMode=true;\n            break;\n        }\n        if(getkey("n")==1){\n            loadMode=false;\n            break;\n        }\n    }*/\n//}\nif(!loadMode){\n    row=prompt("input row");\n    update();\n    col=prompt("input col");\n    panel=new Panel{width:col*32,height:row*32};\n    panel.x=panel.width/2+10;\n    panel.y=panel.height/2;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n    $map=new Map{row,col,chipWidth:32,chipHeight:32};\n}else{\n    if(!mapOnData){\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData};\n    }else{\n        $map=new Map{row:mapData.length,col:mapData[0].length,chipWidth:32,chipHeight:32,mapData,mapOnData};\n    }\n    panel=new Panel{width:$map.col*32,height:$map.row*32,zOrder:100};\n    panel.x=panel.width/2;\n    panel.y=panel.height/2;\n    panel.setFillStyle("cyan");\n    panel.fillRect(0,0,panel.width,panel.height);\n}\n$mp=new Map{row:16,col:8,chipWidth:32,chipHeight:32};\ncounter=0;\nfor(var i=0;i<16;i++){\n    for(var j=0;j<8;j++){\n        $mp.set(j,i,$pat_mapchip+counter);\n        counter++;\n    }\n}\nmode="get";\nprevMode="set";\nmapp=0;\nmx=0;\nmy=0;\nchipX=0;\nchipY=0;\nx=$screenWidth-16;\ny=$screenHeight-16;\nwhile(true){\n    p=mapp;\n    if(getkey("e")==1){\n        $mp.scrollTo(1000,1000);\n        mode="erase";\n        print(mode+" mode");\n    }\n    if(getkey("s")==1){\n        $mp.scrollTo(1000,1000);\n        if(mode=="set"){\n            mode="setOn";\n        }else{\n            mode="set";\n        }\n        print(mode+" mode");\n    }\n    if(getkey("o")==1){\n        $mp.scrollTo(1000,1000);\n        mode="setOn";\n    }\n    if(getkey("g")==1){\n        if(mode!="get"){\n            prevMode=mode;\n            $mp.scrollTo(0,0);\n            mode="get";\n            chipX=0;\n            chipY=0;\n        }else{\n            $mp.scrollTo(1000,1000);\n            mode=prevMode;\n        }\n        print(mode+" mode");\n    }\n    if(getkey("p")==1){\n        //add\n        saveFileName=prompt("input json file(*.json)","map.json");\n        /*print("mapTable=[");\n        data="[";\n        for(var i=0;i<$map.row-1;i++){\n            var tmp=[];\n            tmp=$map.mapTable[i].concat(tmp);\n            print("["+tmp+"],");\n            data+="["+tmp+"],";\n        }\n        var tmp=[];\n        tmp=$map.mapTable[i].concat(tmp);\n        print("["+tmp+"]");\n        data+="["+tmp+"]";\n        print("];");\n        data+="]";*/\n        //add\n        saveDataFile=file("../maps/").rel(saveFileName);\n        data=[$map.mapTable,$map.mapOnTable];\n        //comment\n        //mapDataFile.obj(data);\n        //add\n        saveDataFile.obj(data);\n        print(saveFileName+" Saved");\n        //mapDataFile.obj.push($map.mapOnTable);\n    }\n    if(getkey("c")==1){\n        $mp.scrollTo(1000,1000);\n        mode="spuit";\n        print(mode+" mode");\n    }\n    if(mode!="get"){\n        if(getkey("left")>0) mx=mx+8;\n        if(getkey("right")>0) mx=mx-8;\n        if(getkey("up")>0) my=my+8;\n        if(getkey("down")>0) my=my-8;\n        $map.scrollTo(mx,my);\n    }else{\n        if(getkey("left")>0) chipX=chipX+8;\n        if(getkey("right")>0) chipX=chipX-8;\n        if(getkey("up")>0) chipY=chipY+8;\n        if(getkey("down")>0) chipY=chipY-8;\n        $mp.scrollTo(chipX,chipY);\n    }\n    panel.x=panel.width/2-mx;\n    panel.y=panel.height/2-my;\n    if(mode=="set" && getkey(1)>0){\n        $map.setAt($mouseX+mx,$mouseY+my,mapp);\n        $map.setOnAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="erase" && getkey(1)>0){\n        $map.setAt($mouseX+mx,$mouseY+my,-1);\n    }else if(mode=="get" && getkey(1)>0){\n        mapp=$mp.getAt($mouseX+chipX,$mouseY+chipY);\n        mode=prevMode;\n        $mp.scrollTo(1000,1000);\n        print(mode+" mode");\n        updateEx(10);\n    }else if(mode=="setOn" && getkey(1)>0){\n        $map.setOnAt($mouseX+mx,$mouseY+my,mapp);\n    }else if(mode=="spuit" && getkey(1)>0){\n        mapp=$map.getAt($mouseX+mx,$mouseY+my);\n        mode="set";\n        print(mode+" mode");\n        updateEx(10);\n    }\n    update();\n}',
      'ui/Pad.tonyu': 'extends Actor;\n\\new(opt) {\n    super(opt);\n    padImageP = $pat_inputPad;\n    jujiKey = new Actor{x:96+1, y:$screenHeight-96-1, p:padImageP+0,zOrder:-9,layer:$FrontSprites};\n    no1Key = new Actor{x:$screenWidth-96, y:$screenHeight-96, p:padImageP+1,zOrder:-9,layer:$FrontSprites};\n    jujiKey.show();\n    no1Key.show();\n    \n    jujiKeyPushU = new Actor{x:jujiKey.x, y:jujiKey.y-60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushL = new Actor{x:jujiKey.x-60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushR = new Actor{x:jujiKey.x+60, y:jujiKey.y, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushD = new Actor{x:jujiKey.x, y:jujiKey.y+60, p:padImageP+2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPush1 = new Actor{x:no1Key.x, y:no1Key.y, p:padImageP+2, scaleX:2, zOrder:-10,layer:$FrontSprites};\n    jujiKeyPushU.hide();\n    jujiKeyPushL.hide();\n    jujiKeyPushR.hide();\n    jujiKeyPushD.hide();\n    jujiKeyPush1.hide();\n}\n\\die(){\n    jujiKey.die();\n    no1Key.die();\n    jujiKeyPushU.die();\n    jujiKeyPushL.die();\n    jujiKeyPushR.die();\n    jujiKeyPushD.die();\n    jujiKeyPush1.die();\n    super.die();\n}\nAPAD_DIAG_SIZE = 96;\n\\padUpdate() {\n    // 操作 //\n    keyPushL = 0;\n    keyPushR = 0;\n    keyPushU = 0;\n    keyPushD = 0;\n    keyPush1 = 0;\n    \n    padKeyNotapCnt ++;\n    for (var i=0; i<5; i++) { // タップ判定・マウス判定 //\n        var t = $touches[i];\n        if (t.touched) {\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32-64, 64+APAD_DIAG_SIZE, 64)) keyPushU = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-APAD_DIAG_SIZE/2, jujiKey.y-32+64, 64+APAD_DIAG_SIZE, 64)) keyPushD = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32-64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushL = 1;\n            if (isOnRectWH(t.x, t.y, jujiKey.x-32+64, jujiKey.y-32-APAD_DIAG_SIZE/2, 64, 64+APAD_DIAG_SIZE)) keyPushR = 1;\n            if (isOnRectWH(t.x, t.y, no1Key.x-64, no1Key.y-64, 128, 128)) keyPush1 = 1;\n            padKeySW = 1;\n            padKeyNotapCnt = 0;\n        }\n    }\n    \n    // カウントアップ\n    if (keyPushL) keyCntL ++; else keyCntL = 0;\n    if (keyPushR) keyCntR ++; else keyCntR = 0;\n    if (keyPushU) keyCntU ++; else keyCntU = 0;\n    if (keyPushD) keyCntD ++; else keyCntD = 0;\n    if (keyPush1) keyCnt1 ++; else keyCnt1 = 0;\n    \n    // 表示\n    if (keyPushL) jujiKeyPushL.show(); else jujiKeyPushL.hide();\n    if (keyPushR) jujiKeyPushR.show(); else jujiKeyPushR.hide();\n    if (keyPushU) jujiKeyPushU.show(); else jujiKeyPushU.hide();\n    if (keyPushD) jujiKeyPushD.show(); else jujiKeyPushD.hide();\n    if (keyPush1) jujiKeyPush1.show(); else jujiKeyPush1.hide();\n    \n}\n\n\\getPadUp()    { return keyCntU; }\n\\getPadDown()  { return keyCntD; }\n\\getPadLeft()  { return keyCntL; }\n\\getPadRight() { return keyCntR; }\n\\getPadButton(i) {\n    var value;\n    if (i == 0) value = keyCnt1;\n    return value;\n}\n\n\\getUp()    { return keyCntU; }\n\\getDown()  { return keyCntD; }\n\\getLeft()  { return keyCntL; }\n\\getRight() { return keyCntR; }\n\\getButton(i) {\n    var value;\n    if (i == 0) value = keyCnt1;\n    return value;\n}\n\n// 範囲 //\n\\isOnRect(mx, my, rx, ry, rx2, ry2) {\n    return (rx <= mx && mx < rx2 && ry <= my && my < ry2);\n}\n\n// 範囲 //\n\\isOnRectWH(mx, my, rx, ry, rw, rh) {\n    return (rx <= mx && mx < rx+rw && ry <= my && my < ry+rh);\n}\n\nwhile(true) {\n    padUpdate();\n    update();\n}'
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
                enterTry:enterTry,exitTry:exitTry,startCatch:startCatch,
                waitEvent:waitEvent,runAsync:runAsync,clearFrame:clearFrame};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        //var retVal;
        var _isWaiting=false;
        var fSuspended=false;
        function isAlive() {
            return frame!=null && _isAlive;
        }
        function isWaiting() {
            return _isWaiting;
        }
        function suspend() {
            //throw new Error("Suspend call");
            fSuspended=true;
            cnt=0;
        }
        function enter(frameFunc) {
            frame={prev:frame, func:frameFunc};
        }
        function apply(obj, methodName, args) {
            if (!args) args=[];
            var method;
            if (typeof methodName=="string") {
                method=obj["fiber$"+methodName];
            }
            if (typeof methodName=="function") {
                method=methodName.fiber;
            }
            args=[fb].concat(args);
            var pc=0;
            enter(function () {
                switch (pc){
                case 0:
                    method.apply(obj,args);
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
            if (fb.tryStack.length==0) {
                kill();
                handleEx(e);
                return;
            }
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
            frame=(frame ? frame.prev:null);
            //if (frame) frame.res=res;
            fb.retVal=res;
        }
        function enterTry(catchPC) {
            fb.tryStack.push({frame:frame,catchPC:catchPC});
        }
        function exitTry() {
            fb.tryStack.pop();
        }
        function waitEvent(obj,eventSpec) { // eventSpec=[EventType, arg1, arg2....]
            suspend();
            if (!obj.on) return;
            var h;
            eventSpec=eventSpec.concat(function () {
                fb.lastEvent=arguments;
                fb.retVal=arguments[0];
                h.remove();
                steps();
            });
            h=obj.on.apply(obj, eventSpec);
        }
        function runAsync(f) {
            var succ=function () {
                fb.retVal=arguments;
                steps();
            };
            var err=function () {
                var msg="";
                for (var i=0; i<arguments.length; i++) {
                    msg+=arguments[i]+",";
                }
                if (msg.length==0) msg="Async fail";
                var e=new Error(msg);
                e.args=arguments;
                gotoCatch(e);
                steps();
            };
            f(succ,err);
            suspend();
        }
        function waitFor(j) {
            _isWaiting=true;
            suspend();
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
            fb.preempted=false;
            fSuspended=false;
            //while (new Date().getTime()<lim) {
            while (cnt-->0 && frame) {
                step();
            }
            fb.preempted= (!fSuspended) && isAlive();
            //stpd--;
            Tonyu.currentThread=sv;
        }
        function kill() {
            _isAlive=false;
            frame=null;
        }
        function clearFrame() {
            frame=null;
            tryStack=[];
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
    function threadGroup() {//@deprecated
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
            if (!parent) {
                console.log(arguments[2]);
                throw new Error("No parent class ");
            }
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
        //A has methods in B,C,E,F. [Mod] A extends D.
        // Known examples:
        // Actor extends BaseActor, includes PlayMod.
        // PlayMod extends BaseActor(because use update() in play())
        res.methods=prot;
        //prot=bless(parent, prot);
        includes.forEach(function (m) {
            if (!m.methods) throw m+" Does not have methods";
            for (var n in m.methods) {
                if (!(n in prot)) {
                    prot[n]=m.methods[n];
                }
            }
            /*for (var n in m.prototype) {
                if (!(n in prot)) {  //-> cannot override color in ColorMod(MetaClicker/FlickEdit)
                //if ((typeof m.prototype[n])=="function") { //-> BodyActor::onAppear is overriden by Actor::onAppear(nop)
                    prot[n]=m.prototype[n];
                }
            }*/
        });
        res.prototype=bless(parent, prot);
        res.prototype.isTonyuObject=true;
        addMeta(res,{
            superclass:parent ? parent.meta : null,
                    includes:includes.map(function(c){return c.meta;})
        });
        var m=klass.getMeta(res);
        res.prototype.getClassInfo=function () {
            return m;
        };
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
        return o;
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
        var prot=defunct(methods);
        var init=prot.initialize;
        delete prot.initialize;
        var res=(init?
            (parent? function () {
                if (Tonyu.runMode) init.apply(this,arguments);
                else parent.apply(this,arguments);
            }:function () {
                if (Tonyu.runMode) init.apply(this,arguments);
            }):
            (parent? function () {
                parent.apply(this,arguments);
            }:function (){
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
        addMeta(res,{
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
            VERSION:1444182757003,//EMBED_VERSION
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
           throw new Error(set+" is not iterable");
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
    var typeExpr=symbol;
    var typeDecl=g("typeDecl").ands(tk(":"),typeExpr).ret(null,"vtype");
    var varDecl=g("varDecl").ands(symbol, typeDecl.opt(), tk("=").and(expr).ret(retF(1)).opt() ).ret("name","vtype","value");
    var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
    var paramDecl= g("paramDecl").ands(symbol,typeDecl.opt() ).ret("name","vtype");
    var paramDecls=g("paramDecls").ands(tk("("), paramDecl.sep0(tk(","),true), tk(")")  ).ret(null, "params");
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
    stmt=g("stmt").ors("return", "if", "for", "while", "break", "ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
    // ------- end of stmts
    g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
    var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
    var jsonElem=g("jsonElem").ands(
            symbol.or(literal),
            tk(":").and(expr).ret(function (c,v) {return v;}).opt()
    ).ret("key","value");
    var objlit=g("objlit").ands(tk("{"), jsonElem.sep0(tk(","),true),  tk("}")).ret(null, "elems");
    var arylit=g("arylit").ands(tk("["), expr.sep0(tk(","),true),  tk("]")).ret(null, "elems");
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
    function getSource(srcCont,node) {//B
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
        if (ps && !ps.forEach) throw method+" is not array ";
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
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    function genSource() {//G
        /*if (env.options.compiler.asModule) {
            klass.moduleName=getClassName(klass);
            printf("if (typeof requireSimulator=='object') requireSimulator.setName(%l);%n",klass.moduleName);
            printf("//requirejs(['Tonyu'%f],function (Tonyu) {%{", function (){
                getDependingClasses(klass).forEach(function (k) {
                    printf(",%l",k.moduleName);
                });
            });
        }*/
        ctx.enter({}, function () {
            /*var nspObj=CLASS_HEAD+klass.namespace;
            printf("Tonyu.klass.ensureNamespace(%s,%l);%n",CLASS_HEAD.replace(/\.$/,""), klass.namespace);
            if (klass.superclass) {
                printf("%s=Tonyu.klass(%s,[%s],{%{",
                        getClassName(klass),
                        getClassName(klass.superclass),
                        getClassNames(klass.includes).join(","));
            } else {
                printf("%s=Tonyu.klass([%s],{%{",
                        getClassName(klass),
                        getClassNames(klass.includes).join(","));
            }*/
            printf("Tonyu.klass.define({%{");
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
            //printf("%}});%n");
        });
        //printf("Tonyu.klass.addMeta(%s,%s);%n",
        //        getClassName(klass),JSON.stringify(digestMeta(klass)));
        //if (env.options.compiler.asModule) {
        //    printf("//%}});");
        //}
    }
    function digestDecls(klass) {
        var res={methods:{}};
        for (var i in klass.decls.methods) {
            res.methods[i]=
            {nowait:!!klass.decls.methods[i].nowait};
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
        var finfo=annotation(node);// annotateSubFuncExpr(node);

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
                        nowait: (!!head.nowait || propHead!=""),
                        ftype:  ftype,
                        name:  name,
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
    function getSource(node) {
        return cu.getSource(srcCont,node);
    }
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
            fiberCallRequired(this.path);//option
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
    function annotateSubFuncExpr(node) {// annotateSubFunc or FuncExpr
        var m,ps;
        var body=node.body;
        var name=(node.head.name ? node.head.name.text : "anonymous_"+node.pos );
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
requireSimulator.setName('DeferredUtil');
define([], function () {
    var DU;
    DU={
            directPromise:function (v) {
                var d=new $.Deferred;
                setTimeout(function () {d.resolve(v);},0);
                return d.promise();
            },
            throwPromise:function (e) {
                d=new $.Deferred;
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
                        return DU.throwPromise(e);
                    }
                };
            }
    };
    return DU;
});
requireSimulator.setName('compiledProject');
define([], function () {
    var CPR=function (ns, url) {
        return {
            getNamespace:function () {return ns;},
            sourceDir: function () {return null;},
            getDependingProjects: function () {return [];},
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
                        var cls=Tonyu.classes;
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
                        }
                        //------------------XXXX
                        d.resolve();
                    }
                };
                head.insertBefore( script, head.firstChild );
                return d.promise();
            }
        }
    };
    return CPR;
});
requireSimulator.setName('ProjectCompiler');
define(["Tonyu","Tonyu.Compiler.JSGenerator","Tonyu.Compiler.Semantics",
        "Tonyu.TraceTbl","FS","assert","SFile","DeferredUtil","compiledProject"],
        function (Tonyu,JSGenerator,Semantics,
                ttb,FS,A,SFile,DU,CPR) {
var TPRC=function (dir) {
     A(SFile.is(dir) && dir.isDir(), "projectCompiler: "+dir+" is not dir obj");
     var TPR={env:{}};
     var traceTbl=Tonyu.TraceTbl;//();
     var F=DU.throwF;
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
         A(SFile.is(file));
         if (dir.contains(file)) {
             return TPR.getNamespace()+"."+file.truncExt(TPR.EXT);
         }
         var res;
         TPR.getDependingProjects().forEach(function (dp) {
             if (!res) res=dp.getClassName(file);
         });
         return res;
     };
     TPR.getNamespace=function () {
         var opt=TPR.getOptions();
         return A(opt.compiler.namespace,"namespace not specified opt="+JSON.stringify(opt));
     };
     TPR.getOutputFile=function (lang) {
         var opt=TPR.getOptions();
         var outF=TPR.resolve(A(opt.compiler.outputFile,"output file should be specified in options"));
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
         console.log("LoadClasses: "+dir.path());
         ctx=initCtx(ctx);
         var visited=ctx.visited||{};
         //var classes=ctx.classes||{};
         if (visited[TPR.path()]) return DU.directPromise();
         visited[TPR.path()]=true;
         /*TPR.getDependingProjects().forEach(function (p) {
             if (p.getNamespace()==myNsp) return;
             task=task.then(function () {
                 return p.loadClasses(ctx);
             });
         });*/
         return TPR.loadDependingClasses(ctx).then(function () {
             return TPR.shouldCompile();
         }).then(function (sc) {
             if (sc) {
                 return TPR.compile(ctx);
             } else {
                 var outF=TPR.getOutputFile("js");
                 return evalFile(outF).then(F(copyToClasses));
             }
         });
         function copyToClasses() {
             var ns=TPR.getNamespace();
            //same as compiledProject (XXXX)
             var cls=Tonyu.classes;
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
             }
             //------------------XXXX
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
         //var dp=TPR.getDependingProjects();
         var myNsp=TPR.getNamespace();
         /*var task=DU.directPromise();
         dp.forEach(function (dprj) {
             var nsp=dprj.getNamespace();
             if (nsp!=myNsp) {
                 task=task.then(F(function () {
                     dprj.loadClasses(ctx);
                 }));
             }
         });*/
         return TPR.loadDependingClasses(ctx).then(F(function () {
             var baseClasses=ctx.classes;
             console.log("baseClasses", baseClasses);
             var ctxOpt=ctx.options;
             var env=TPR.env;
             env.aliases={};
             env.classes=baseClasses;
             for (var n in baseClasses) {
                 var cl=baseClasses[n];
                 env.aliases[ cl.shortName] = cl.fullName;
             }
             var newClasses={};
             var sf=TPR.sourceFiles(myNsp);
             for (var shortCn in sf) {
                 var f=sf[shortCn];
                 var fullCn=myNsp+"."+shortCn;
                 newClasses[fullCn]=baseClasses[fullCn]={
                         fullName:  fullCn,
                         shortName: shortCn,
                         namespace: myNsp,
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
         }));
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
                //var ready=true;
                /*deps.forEach(function (cl) {
                    ready=ready && (
                       !cl || !classes[cl.fullName] || cl.builtin || added[cl.fullName]
                    );
                });*/
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
        console.log("loading: "+f.path());
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
            if (!f.exists()) throw "ImageList file not found: "+f;
            url=f.text();
        }
        return url;
    };
    Tonyu.Assets=Assets;
    return Assets;
});
requireSimulator.setName('ImageList');
define(["PatternParser","Util","Assets"], function (PP,Util,Assets) {
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
        "typeCheck","Blob","thumbnail","WebSite","plugins", "Tonyu.Compiler.Semantics", "Tonyu.Compiler.JSGenerator",
        "DeferredUtil"],
        function (Tonyu, ProjectCompiler, TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                tc,Blob,thumbnail,WebSite,plugins, Semantics, JSGenerator,DU) {
return Tonyu.Project=function (dir, kernelDir) {
    var TPR=ProjectCompiler(dir);
    var kernelProject=ProjectCompiler(kernelDir);
    var _super=Tonyu.extend({},TPR);
    var home=FS.get(WebSite.tonyuHome);
    if (!kernelDir) kernelDir=home.rel("Kernel/");
    var traceTbl=Tonyu.TraceTbl;//();
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
        if (main && main.stop) main.stop();
    };
    TPR.rawRun=function (bootClassName) {
        if (WebSite.removeJSOutput) {
            var o=TPR.getOutputFile();
            if (o.exists()) o.rm();
        }
        return TPR.loadClasses().then(DU.throwF(function () {
            //TPR.compile();
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
    TPR.rawBoot=function (bootClassName) {
        //var thg=Tonyu.threadGroup();
        var bootClass=Tonyu.getClass(bootClassName);
        if (!bootClass) throw TError( bootClassName+" というクラスはありません", "不明" ,0);
        Tonyu.runMode=true;
        var boot=new bootClass();
        var th=Tonyu.thread();
        th.apply(boot,"main");

        TPR.runningThread=th; //thg.addObj(main);
        TPR.runningObj=boot;
        $LASTPOS=0;
        th.steps();
        //thg.run(0);
    };

    TPR.isKernel=function (className) {
        var r=null;
        kernelDir.recursive(function (e) {
            if (e.truncExt(TPR.EXT)===className) {
                r=e;
            }
        });
        return r;
        /*var r=kernelDir.rel(className+TPR.EXT);
        if (r.exists()) return r;
        return null;*/
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
            var f=klass.src ? klass.src.tonyu : null;
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
    Shell.mv=function (from ,to ,options) {
        var f=resolve(from, true);
        var t=resolve(to);
        t.moveFrom(f);
    };
    Shell.cp=function (from ,to ,options) {
        if (!options) options={};
        if (options.v) {
            Shell.echo("cp", from ,to);
        }
        var f=resolve(from, true);
        var t=resolve(to);
        return t.copyFrom(f,options);
        /*
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
        }*/
    };
    Shell.rm=function (file, options) {
        if (!options) options={};
        if (options.notrash) {
            file=resolve(file, false);
            file.removeWithoutTrash();
            return 1;
        }
        file=resolve(file, true);
        file.rm(options);
        /*if (file.isDir() && options.r) {
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
        }*/
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
	STF.copyTo=function (dir) {
	    var o=STF.toObj();
	    for (var fn in o) {
            var f=dir.rel(fn);
            f.text(o[fn].text);
        }
	};
	return STF;
});
requireSimulator.setName('T2MediaLib');
// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ
// T2MediaLib_BGMPlayer //

var T2MediaLib_BGMPlayer = function(arg_id) {
    this.id = arg_id;
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
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) bgm.stop(0);
    this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmTempo, offset, loop, loopStart, loopEnd);
    this.playingBGMName = idx;
    this.bgmPause = 0;
    return this.playingBGM;
};
T2MediaLib_BGMPlayer.prototype.stopBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    bgm.stop(0);
    this.playingBGM = null;
    return bgm;
};
T2MediaLib_BGMPlayer.prototype.pauseBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    if (this.bgmPause === 0) {
        this.bgmPauseTime = this.getBGMCurrentTime();
        this.bgmPauseLoopStart = bgm.loopStart;
        this.bgmPauseLoopEnd = bgm.loopEnd;
        this.bgmPauseLoop = bgm.loop;
        this.bgmPauseCurrentTime = bgm.context.currentTime;
        this.bgmPauseTempo = T2MediaLib.bgmTempo;
        bgm.stop(0);
        this.bgmPause = 1;
    }
    return bgm;
};
T2MediaLib_BGMPlayer.prototype.resumeBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    if (this.bgmPause === 1) {
        bgm = this.playBGM(this.playingBGMName, this.bgmPauseLoop, this.bgmPauseTime, this.bgmPauseLoopStart, this.bgmPauseLoopEnd);
        this.bgmPause = 0;
    }
    return bgm;
};
T2MediaLib_BGMPlayer.prototype.setBGMVolume = function(vol) {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    this.bgmVolume = vol;
    T2MediaLib.setSEVolume(bgm, vol);
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;

    if (this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
};
T2MediaLib_BGMPlayer.prototype.getBGMCurrentTime = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
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
};
T2MediaLib_BGMPlayer.prototype.getBGMLength = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    return bgm.buffer.duration;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,

    seDataAry : {
        data : []
    },

    bgmPlayerMax : 16,
    bgmPlayerAry : [],
    playingBGM : null,
    playingBGMName : null,
    bgmPause : 0,
    bgmPauseTime : 0,
    bgmPauseCurrentTime : 0,
    bgmPauseTempo : 0,
    bgmPauseLoop : false,
    bgmPauseLoopStart : 0,
    bgmPauseLoopEnd : 0,
    bgmVolume : 1.0,
    bgmTempo : 1.0,

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
        }
    },

    // CLEAR系関数 //
    allClearData : function() {
        var dataAry = T2MediaLib.seDataAry.data;
        for (var data in dataAry) {
            delete dataAry[data];
        }
    },
    clearData : function(idx) {
        var dataAry = T2MediaLib.seDataAry.data;
        delete dataAry[idx];
    },


    // SEメソッド郡 //
    loadSEFromArray: function (idx, array) {
        var ctx=T2MediaLib.context;
        var myArrayBuffer = ctx.createBuffer(
            1, array.length, ctx.sampleRate);
        var nowBuffering = myArrayBuffer.getChannelData(0);
        for (var i = 0; i < array.length ; i++) {
             nowBuffering[i] = array[i];
        }
        //var source = ctx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        //source.buffer = myArrayBuffer;
        T2MediaLib.seDataAry.data[idx]=myArrayBuffer;//source;
    },
    loadSE : function(idx, url, callbacks) { //@hoge1e3
        if (!T2MediaLib.context || T2MediaLib.disabled) {
            T2MediaLib.seDataAry.data[idx] = -1;
            return null;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status=== 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    var successCallback = function(audioBuffer) {
                        /*
                        window.alert('Success : ' +
                                     'sampleRate:' + audioBuffer.sampleRate + '\n' +
                                     'length:' + audioBuffer.length + '\n' +
                                     'duration:' + audioBuffer.duration + '\n' +
                                     'numberOfChannels:' + audioBuffer.numberOfChannels + '\n');
                        */
                        T2MediaLib.seDataAry.data[idx] = audioBuffer;
                        if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
                    };
                    var errorCallback = function(error) {
                        if (error instanceof Error) {
                            console.log('T2MediaLib: '+error.message);
                        } else {
                            console.log('T2MediaLib: Error decodeAudioData()');
                        }
                        T2MediaLib.seDataAry.data[idx] = -4;
                        if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
                    };
                    T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
                } else {
                    T2MediaLib.seDataAry.data[idx] = -3;
                    if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
                }
            } else {
                T2MediaLib.seDataAry.data[idx] = -2;
                if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
            }
        };
        xhr.onerror=function (e) {//@hoge1e3
            if (callbacks && callbacks.err) callbacks.err(idx,e+"");
        };
        T2MediaLib.seDataAry.data[idx] = null;
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
    	     ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
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
    playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
        if (!T2MediaLib.context) return null;
        var audioBuffer = T2MediaLib.seDataAry.data[idx];
        if (!(audioBuffer instanceof AudioBuffer)) return null;

        // 引数チェック
        if (vol === null) {
            vol = 1;
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

        source.buffer = audioBuffer;

        source.loop               = loop;
        source.loopStart          = loopStart;
        source.loopEnd            = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 通常ノード接続
        //source.connect(T2MediaLib.context.destination);

        // 音量変更できるようノード接続
        source.connect(gainNode);
        gainNode.connect(T2MediaLib.context.destination);

        // ループ開始位置修正
        var offset_adj;
        if (loop && loopEnd - loopStart > 0 && offset > loopEnd) {
            offset_adj = loopEnd;
        } else {
            offset_adj = offset;
        }

        // 変数追加
        source.gainNode = gainNode;
        source.playStartTime = T2MediaLib.context.currentTime;
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;

        gainNode.gain.value = vol * vol;

        if (offset) {
            if (loop) source.start(0, offset, 86400);
            else      source.start(0, offset);
        } else {
            source.start(0);
        }

        source.onended = function(event) {
            //console.log('"on' + event.type + '" event handler !!');
            //source.stop(0);

            delete source.gainNode;
            //delete source.playStartTime;
            //delete source.playOffset;
            //delete source.plusTime;

            source.onended = null;
        };
        //console.log(source);
        return source;
    },
    stopSE : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * vol;
    },
    setSERate : function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    },
    getSEData : function(idx) {
        return T2MediaLib.seDataAry.data[idx];
    },


    // BGMメソッド郡 //

    loadBGM : function(idx, url, callbacks) {
        return T2MediaLib.loadSE(idx, url, callbacks);
    },
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
    setBGMVolume : function(id, vol) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMVolume(vol);
    },
    setBGMTempo : function(id, tempo) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMTempo(tempo);
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
    getBGMData : function(idx) {
        return T2MediaLib.getSEData(idx);
    },
    getBGMPlayerMax : function() {
        return T2MediaLib.bgmPlayerMax;
    },
    allStopBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
        }
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

// 旧名。そのうち消す
//T2SoundLib = T2MediaLib;



// テスト
//'http://jsrun.it/assets/c/X/4/S/cX4S7.ogg'
//'http://jsrun.it/assets/5/Z/s/x/5ZsxE.ogg'

//alert((!window.hasOwnProperty('webkitAudioContext'))+" "+(window.webkitAudioContext.prototype.createGain===undefined));

//T2MediaLib.init();


//playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
//T2MediaLib.loadSE('test','http://jsrun.it/assets/5/Z/s/x/5ZsxE.ogg');
//setTimeout(function(){ bgm1 = T2MediaLib.playSE('test', 1.0, 1.0, 0, true, 0, 0); }, 500);
//setTimeout(function(){ T2MediaLib.stopSE(bgm1); }, 5000);

/*
//playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
T2MediaLib.loadSE('test','http://jsrun.it/assets/c/X/4/S/cX4S7.ogg');
setTimeout(function(){ bgm1 = T2MediaLib.playSE('test', 1.0, 1.1, 8, true, 12, 19); }, 500);
setTimeout(function(){ bgm1.playbackRate.value = 1.2; }, 5000);
setTimeout(function(){ bgm1.stop(); }, 6000);
setTimeout(function(){ T2MediaLib.playSE('test'); }, 7000);
//setTimeout(function(){ T2MediaLib.stopSE(bgm1); }, 5000);
*/
/*
T2MediaLib.loadAudio('test','http://jsrun.it/assets/c/X/4/S/cX4S7.ogg');
T2MediaLib.loadAudio('test2','http://jsrun.it/assets/q/S/1/C/qS1Ch.ogg');
setTimeout(function(){ T2MediaLib.playAudio('test'); }, 5000);
setTimeout(function(){ T2MediaLib.playAudio('test2'); }, 1000);
setTimeout(function(){ T2MediaLib.playAudio('test', true, 11.5); console.log(T2MediaLib.getAudioCurrentTime()); console.log(T2MediaLib.getAudioLength());}, 1050);
setTimeout(function(){ T2MediaLib.setAudioTempo(1.5); }, 3000);
setTimeout(function(){ T2MediaLib.setAudioVolume(0.5); }, 6000);
setTimeout(function(){ T2MediaLib.setAudioPosition(20); }, 7000);
setTimeout(function(){ T2MediaLib.stopAudio(); }, 10000);
*/



requireSimulator.setName('runtime');
requirejs(["ImageList","T2MediaLib"], function () {

});
requireSimulator.setName('SoundDiag');
define(["T2MediaLib"],function (T2MediaLib) {
    SoundDiag={};
    SoundDiag.show=function (/*cv,*/ onSelect) {
        var bsty={fontSize:"2em"};
        onSelect=onSelect||function (){};
        var d=$("<div>").css({position:"absolute", left:100,top:100}).append(
                $("<button>").css(bsty).text("Sound on").click(soundOn)
        ).append(
                $("<button>").css(bsty).text("Sound off").click(soundOff)
        ).appendTo("body");
        function soundOn() {
            T2MediaLib.init();
            T2MediaLib.disabled=false;
            T2MediaLib.activate();
            console.log("Sound ON");
            d.remove();
            onSelect();
        }
        function soundOff() {
            T2MediaLib.disabled=true;
            console.log("Sound OFF");
            d.remove();
            onSelect();
        }
        /*var ctx=cv[0].getContext("2d");
        var w=cv.width(),h=cv.height();
        var size=30;
        ctx.fillStyle="black";
        ctx.font=size+"px monospace";
        drawCenter("Sound on",h/3);
        drawCenter("Sound off",h/3*2);
        cv.on("click", func);
        function func(e) {
            if (e.originalEvent.y<h/2) {

            } else {

            }
        }
        function drawCenter(text,y) {
            var t=ctx.measureText(text);
            ctx.fillText(text, w/2-t.width/2, y+size/2);
        }*/
    };
    return SoundDiag;
});
requireSimulator.setName('runScript');
requirejs(["FS","Tonyu.Project","Shell","KeyEventChecker","ScriptTagFS","runtime","WebSite","SoundDiag"],
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
                var m=fo[fn];
                if (fn=="js/concat.js") {
                    if (f.exists() && f.lastUpdate()>m.lastUpdate) {
                        continue;
                    }
                } else {
                    f.useRAMDisk();
                }
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
        /*cv[0].addEventListener('touchstart', mediaIni);
        window.addEventListener('touchstart', mediaIni);
        function mediaIni() {
            T2MediaLib.init();
            T2MediaLib.activate();
            cv[0].removeEventListener('touchstart', mediaIni);
            window.removeEventListener('touchstart',mediaIni);
        }*/
        /*if (curPrj.hasSoundResource()) {
            SoundDiag.show(start);
        } else {*/
            start();
        //}
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
