(function (){
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());
define("js/almond", function(){});

// This is kowareta! because r.js does not generate module name:
//   define("FSLib",[], function () { ...
//(function (global) {
//var useGlobal=(typeof global.define!="function");
//var define=(useGlobal ? define=function(_,f){f();} : global.define);
define('FS',[],function () {
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
      return d;
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
    //   same is promise.then(S).then(same,F)
    var DU;
    var DUBRK=function(r){this.res=r;};
    function same(e){return e;}
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
                }).then(same,function (r) {
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
                    }).then(same,function (e) {
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
        },
        onAddObserver: function (path) {
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

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/
define('FileSaver',[],function (){

// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = typeof window === 'object' && window.window === window
  ? window : typeof self === 'object' && self.self === self
  ? self : typeof global === 'object' && global.global === global
  ? global
  : this

function bom (blob, opts) {
  if (typeof opts === 'undefined') opts = { autoBom: false }
  else if (typeof opts !== 'object') {
    console.warn('Depricated: Expected third argument to be a object')
    opts = { autoBom: !opts }
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
  }
  return blob
}

function download (url, name, opts) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, name, opts)
  }
  xhr.onerror = function () {
    console.error('could not download file')
  }
  xhr.send()
}

function corsEnabled (url) {
  var xhr = new XMLHttpRequest()
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false)
  xhr.send()
  return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                          20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
  }
}

var saveAs = _global.saveAs ||
// probably in some web worker
(typeof window !== 'object' || window !== _global)
  ? function saveAs () { /* noop */ }

// Use download attribute first if possible (#193 Lumia mobile)
: 'download' in HTMLAnchorElement.prototype
? function saveAs (blob, name, opts) {
  var URL = _global.URL || _global.webkitURL
  var a = document.createElement('a')
  name = name || blob.name || 'download'

  a.download = name
  a.rel = 'noopener' // tabnabbing

  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'

  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob
    if (a.origin !== location.origin) {
      corsEnabled(a.href)
        ? download(blob, name, opts)
        : click(a, a.target = '_blank')
    } else {
      click(a)
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
    setTimeout(function () { click(a) }, 0)
  }
}

// Use msSaveOrOpenBlob as a second approach
: 'msSaveOrOpenBlob' in navigator
? function saveAs (blob, name, opts) {
  name = name || blob.name || 'download'

  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts)
    } else {
      var a = document.createElement('a')
      a.href = blob
      a.target = '_blank'
      setTimeout(function () { click(a) })
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
  }
}

// Fallback to using FileReader and a popup
: function saveAs (blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only avalible on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank')
  if (popup) {
    popup.document.title =
    popup.document.body.innerText = 'downloading...'
  }

  if (typeof blob === 'string') return download(blob, name, opts)

  var force = blob.type === 'application/octet-stream'
  var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

  if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
    // Safari doesn't allow downloading of blob urls
    var reader = new FileReader()
    reader.onloadend = function () {
      var url = reader.result
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
      if (popup) popup.location.href = url
      else location = url
      popup = null // reverse-tabnabbing #460
    }
    reader.readAsDataURL(blob)
  } else {
    var URL = _global.URL || _global.webkitURL
    var url = URL.createObjectURL(blob)
    if (popup) popup.location = url
    else location.href = url
    popup = null // reverse-tabnabbing #460
    setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
  }
}

_global.saveAs = saveAs.saveAs = saveAs

if (typeof module !== 'undefined') {
  module.exports = saveAs;
}
return saveAs;
});

define('Content',["assert","Util","FileSaver"],function (assert,Util,saveAs) {
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
        if (Content.isNodeBuffer(bin)) {
            b.bufType="node";
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.bufType="array2";
            b.arrayBuffer=bin;
        } else if (bin && Content.isBuffer(bin.buffer)) {
            // in node.js v8.9.1 ,
            ///  bin is Buffer, bin.buffer is ArrayBuffer
            //   and bin.buffer is content of different file(memory leak?) 
            b.bufType="array1";
            b.arrayBuffer=bin.buffer;
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

/*global require, requirejs, process, Buffer*/
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
    if (!fs) {
        fs=requirejs.nodeRequire("fs");
    }
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    var hasDriveLetter=P.hasDriveLetter(process.cwd());
    NativeFS.available=true;
    var SEP=P.SEP;
    //var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS();
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
            return P.startsWith(path, this.mountPoint);
        } else {
//            console.log(path, hasDriveLetter , P.hasDriveLetter(path));
            return !( !!hasDriveLetter ^ !!P.hasDriveLetter(path));
        }
    };
    function E(r){return r;}
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
            E(path,options);
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
            E(path, info, options);
            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            E(path);
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
            options=options||{};
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
            options=options||{};
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
        },
        onAddObserver: function (apath,options) {
            var t=this;
            var rfs=t.getRootFS();
            options=options||{};
            var isDir=this.isDir(apath);
            //console.log("Invoke oao",options);
            var w=fs.watch(apath, options, function (evt,rpath) {
                //console.log(path);
                var fpath=isDir ? P.rel(apath,rpath) : apath;
                var meta;
                if (t.exists(fpath)) {
                    meta=extend({eventType:evt},t.getMetaInfo(fpath));
                } else {
                    meta={eventType:evt};
                }
                rfs.notifyChanged(fpath,meta);
            });
            return {
                remove: function () {
                    w.close();
                }
            };
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
    //var Path=P.Path;
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
    LSFS.prototype=new FS();
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
        var dinfo =  {},dinfos;
        try {
            dinfos = this.getItem(path);
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
        var eventType="change";
        if (!dinfo[name]) {
            eventType="create";
            dinfo[name] = {};
            if (trashed) dinfo[name].trashed = true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate = now();
        var meta=extend({eventType:eventType},dinfo[name]);
        this.getRootFS().notifyChanged(P.rel(path,name), meta);
        this.putDirInfo(path, dinfo, trashed);
    };
    LSFS.prototype.removeEntry=function removeEntry(dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            dinfo[name] = {
                lastUpdate: now(),
                trashed: true
            };
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"trash"});
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.removeEntryWithoutTrash=function (dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            delete dinfo[name];
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"delete"});
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
if (typeof $!=="undefined")
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
define('SFile',["extend","assert","PathUtil","Util","Content","FSClass","FileSaver","DeferredUtil"],
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
        // why setContentAsync? AsyncでもDU.resolveはsyncをサポートしていればsyncでやってくれる...はず，Promiseだと遅延するからだめ．今までJQばっかりだったから問題が起きていなかった．
        // なので，fs2/promise.jsを追加．
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
    _listFiles:function (options,async) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        var path=this.path();
        var ord;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        if (async) {
            return this.act.fs.opendirAsync(this.act.path, options).
            then(cvt);
        } else {
            return cvt( this.act.fs.opendir(this.act.path, options));
        }
        function cvt(di) {
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
        }
    },
    listFilesAsync:function (options) {
        return this._listFiles(options,true);
        /*
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
        });*/
    },
    listFiles:function (options) {
        return this._listFiles(options,false);
        /*var args=Array.prototype.slice.call(arguments);
        return DU.assertResolved(this.listFilesAsync.apply(this,args));*/
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
    size: function (f) {
        if (!f) {
            if (!this.isDir()) {
                return this.getBytes().byteLength;
            } else {
                var sum=0;
                this.each(function (f) {
                    sum+=f.size();
                });
                return sum;
            }
        } else {
            //TODO: async
        }
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
    },
    watch: function (_1,_2) {
        var options={},handler=function(){};
        if (typeof _1==="object") options=_1;
        if (typeof _2==="object") options=_2;
        if (typeof _1==="function") handler=_1;
        if (typeof _2==="function") handler=_2;
        var rfs=this.getFS().getRootFS();
        //var t=this;
        rfs.addObserver(this.path(),function (path, meta) {
            handler(meta.eventType, rfs.get(path),meta );
        });
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
            addObserver: function (_1,_2,_3) {
                this.observers=this.observers||[];
                var options={},path,f;
                if (typeof _1==="string") path=_1;
                if (typeof _2==="string") path=_2;
                if (typeof _3==="string") path=_3;
                if (typeof _1==="object") options=_1;
                if (typeof _2==="object") options=_2;
                if (typeof _3==="object") options=_3;
                if (typeof _1==="function") f=_1;
                if (typeof _2==="function") f=_2;
                if (typeof _3==="function") f=_3;
                assert.is(path,String);
                assert.is(f,Function);
                var fs=this.resolveFS(path);
                var remover=fs.onAddObserver(path,options);
                var observers=this.observers;
                var observer={
                    path:path,
                    handler:f,
                    remove: function () {
                        var i=observers.indexOf(this);
                        observers.splice(i,1);
                        if (remover) remover.remove();
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

define('zip',["SFile",/*"jszip",*/"FileSaver","Util","DeferredUtil"],
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

/*(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';*/
// modified from https://github.com/taylorhakes/promise-polyfill/blob/master/dist/polyfill.js
// if promise resolved immediately, it will run f of then(f)
// P.resolve(5).then(e=>console.log(e)); console.log(3)  ->  show 5 3, while original is 3 5
define('promise',[], function() {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = function (fn) {fn();};/*
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };
*/

Promise._unhandledRejectionFn = function _unhandledRejectionFn(/*err*/) {
  if (typeof console !== 'undefined' && console) {
    //console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};
/** @suppress {undefinedVars} */
/*
var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!('Promise' in globalNS)) {
  globalNS['Promise'] = Promise;
} else if (!globalNS.Promise.prototype['finally']) {
  globalNS.Promise.prototype['finally'] = finallyConstructor;
}*/
return Promise;
});

define('FS',["FSClass","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil","promise"],
        function (FSClass,NativeFS,LSFS,WebFS, P,Env,A,SFile,RootFS,Content,zip,DU,PR) {
    var FS={};
    FS.assert=A;
    FS.Content=Content;
    FS.Class=FSClass;
    FS.DeferredUtil=DU;
    if (!DU.config.useJQ) {
        DU.external.Promise=PR;
    }
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
	if (typeof window!=="undefined" && window.FS===undefined) window.FS=resMod;
	if (typeof module!=="undefined") module=resMod;
	return resMod;
});
//})(window);

define('assert',["FS"],function (FS){return FS.assert;});

define('DeferredUtil',["FS"],function (FS){return FS.DeferredUtil;});

define('Klass',["assert"],function (A) {
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
;
define('Tonyu.Thread',["DeferredUtil","Klass"],function (DU,Klass) {
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
			if (err) return this.promise().then(succ,err);
			else return this.promise().then(succ);
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

define('Tonyu.Iterator',["Klass"], function (Klass) {
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

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('Tonyu',["assert","Tonyu.Thread","Tonyu.Iterator","DeferredUtil"],
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
			VERSION:1567135785304,//EMBED_VERSION
			A:A};
}();
});

define('ProjectFactory',['require','exports','module','assert','FS'],function (require,exports,module) {
    const A=require("assert");
    const FS=require("FS");
    // This factory will be widely used, even BitArrow.


    let Compiler, SourceFiles,sysMod,run2Mod;
    const  resolvers=[],types={};
    exports.addDependencyResolver=(f)=>{
        //f: (prj, spec) => prj
        resolvers.push(f);
    };
    exports.addType=(n,f)=>{
        types[n]=f;
    };
    exports.fromDependencySpec=function (prj,spec) {
        if (typeof spec=="string") {
            var prjDir=prj.resolve(spec);
            return this.fromDir(prjDir);
        }
        for (let f of resolvers) {
            const res=f(prj,spec);
            if (res) return res;
        }
        console.error("Invalid dep spec", spec);
        throw new Error("Invalid dep spec", spec);
        /* else if (typeof dprj=="object") {
            return this.create("compiled", {
                namespace:dprj.namespace,
                url: FS.expandPath(dprj.compiledURL)
            });
        }*/
    };
    exports.create=function (type,params) {
        if (!types[type]) throw new Error(`Invalid type ${type}`);
        return types[type](params);
        /*for (let f of types) {
            res=f()
        }
        const res=new ProjectCore();
        switch(type){
            case "IDE":
            if (!Compiler || !sysMod) fail();
            const c=new Compiler(params.dir);
            Object.assign(res,c);
            Object.assign(res,sysMod);
            return res;
            case "run3":
            break;
            case "compiled":
            break;
            case "run2":
            case "CPTR":
            break;
            case "plugin":
            break;
        }
        function fail() {
            throw new Error(`Cannot create ${type}`);
        }*/
    };
    class ProjectCore {
        getPublishedURL(){}//TODO
        getOptions(opt) {
            return this.getOptionsFile().obj();
        }
        getName() {
            return this.dir.name().replace(/\/$/,"");
        }
        getDependingProjects() {
            var opt=this.getOptions();
            var dp=opt.compiler.dependingProjects || [];
            return dp.map(dprj=>
                ProjectCore.factory.fromDependencySpec(this,dprj)
            );
        }
        include(mod) {
            for (let k of Object.getOwnPropertyNames(mod)) {
                if (typeof mod[k]==="function") this[k]=mod[k];
            }
            return this;
        }
        delegate(obj) {
            if (obj.constructor.prototype) {
                const add=k=>{
                    if (typeof obj[k]==="function") this[k]=(...args)=>obj[k](...args);
                };
                for (let k of Object.getOwnPropertyNames(obj.constructor.prototype)) add(k);
            }
            return this;
        }
    }
    ProjectCore.factory=exports;
    exports.createCore=()=>new ProjectCore();
    const dirBasedMod={
        getDir() {return this.dir;},
        resolve(rdir){// not in compiledProject
            if (rdir instanceof Array) {
                var res=[];
                rdir.forEach(function (e) {
                    res.push(this.resolve(e));
                });
                return res;
            }
            if (typeof rdir=="string") {
                return FS.resolve(rdir, this.dir.path());
            }
            if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
            return rdir;
        },
        getOptionsFile() {// not in compiledProject
            var resFile=this.dir.rel("options.json");
            return resFile;
        },
        setOptions(opt) {// not in compiledProject
            return this.getOptionsFile().obj(opt);
        },
        getOutputFile(lang) {// not in compiledProject
            var opt=this.getOptions();
            var outF=this.resolve(A(opt.compiler.outputFile,"outputFile should be specified in options"));
            if (outF.isDir()) {
                throw new Error("out: directory style not supported");
            }
            return outF;
        },
        removeOutputFile() {// not in compiledProject
            this.getOutputFile().rm();
        },
        path(){return this.dir.path();},// not in compiledProject
        getEXT() {throw new Error("getEXT must be overriden.");},//stub
        sourceFiles() {
            const res={};
            const ext=this.getEXT();
    		this.dir.recursive(collect);
    		function collect(f) {
    			if (f.endsWith(ext)) {
    				var nb=f.truncExt(ext);
    				res[nb]=f;
    			}
    		}
    		return res;
        },
        sourceDir() {return this.getDir();}
    };
    exports.createDirBasedCore=function (params) {
        const res=this.createCore();
        res.dir=params.dir;
        return res.include(dirBasedMod);
    };
});

/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

define('Platform',[],function () {
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

define('WebSite',["FS","Platform"], function (FS,Platform) {
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

if (typeof define!=="function") {
	define=require("requirejs").define;
}
define('TError',[],function () {
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
define('StackTrace',[],function (){
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
define('Tonyu.TraceTbl',["Tonyu", "FS", "TError","StackTrace"],
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
define('PatternParser',["Tonyu"], function (Tonyu) {
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

define("Util", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Util;
    };
}(this)));

define('Assets',["WebSite","Util","Tonyu","FS"],function (WebSite,Util,Tonyu,FS) {
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

define('ImageList',["PatternParser","Util","Assets","assert"], function (PP,Util,Assets,assert) {
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

define('Auth',["WebSite"],function (WebSite) {
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
define('Blob',["Auth","WebSite","Util"],function (a,WebSite,Util) {
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
define('ImageRect',[],function () {
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
define('Content',["FS"],function (FS){return FS.Content;});

define('thumbnail',["ImageRect","Content"],function (IR,Content) {
    var TN={};
    var createThumbnail;
    var NAME="$icon_thumbnail";
    var WIDTH=200;HEIGHT=200;
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
            var cv=$("<canvas>").attr({width:WIDTH,height:HEIGHT});
            IR(img, cv[0]);
            var url=cv[0].toDataURL();
            var rsrc=prj.getResource();
            var prjdir=prj.getDir();
            var imfile=TN.file(prj);
            imfile.text( url );
            var item={
                name:NAME,
                pwidth:WIDTH,pheight:HEIGHT,
                url:"ls:"+imfile.relPath(prjdir)
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

define('plugins',["WebSite"],function (WebSite){
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

define('sysMod',["Tonyu", /*"ProjectCompiler",*/ "TError", "FS", "Tonyu.TraceTbl","ImageList","StackTrace",
        "Blob","thumbnail","WebSite","plugins", //"Tonyu.Compiler.Semantics", "Tonyu.Compiler.JSGenerator",
        "DeferredUtil"/*,"compiledProject"*/],
        function (Tonyu, /*ProjectCompiler,*/ TError, FS, Tonyu_TraceTbl, ImageList,StackTrace,
                Blob,thumbnail,WebSite,plugins,// Semantics, JSGenerator,
                DU) {
// (was TonyuProject)
return {
    /*var TPR=ProjectCompiler(dir);
    var _super=Tonyu.extend({},TPR);
    TPR.EXT=".tonyu";
    TPR.NSP_KER="kernel";
    TPR.NSP_USR="user";
    var kernelProject;
    if (!kernelDir) {
        kernelProject=CPRJ(TPR.NSP_KER, WebSite.compiledKernel);
    } else {
        kernelProject=ProjectCompiler(kernelDir);
    }
    var traceTbl=Tonyu.TraceTbl;//();
    var env={classes:Tonyu.classMetas, traceTbl:traceTbl, options:{compiler:{}} };
    TPR.env=env;*/
    stop:function () {
        var cur=this.runningThread; // Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=this.runningObj;
        if (main && main.stop) return main.stop();
    },
    rawRun:function (bootClassName) {
        if (WebSite.removeJSOutput) {
            var o=this.getOutputFile();
            if (o.exists()) o.rm();
        }
        return this.loadClasses().then(()=>{
            //TPR.compile();
            this.detectPlugins();
            this.fixBootRunClasses();
            if (!this.runScriptMode) thumbnail.set(this, 2000);
            this.rawBoot(bootClassName);
        });
    },
    getResourceFile: function () {
        return this.getDir().rel("res.json");
    },
    getResource: function () {
        var resFile=this.getResourceFile();
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
            if (chg) this.setResource(res);
            return res;
        }
        return Tonyu.defaultResource;
    },
    hasSoundResource: function () {
        var res=this.getResource();
        return res && res.sounds && res.sounds.length>0;
    },
    setResource: function (rsrc) {
        var resFile=this.getResourceFile();
        resFile.obj(rsrc);
    },
    getThumbnail: function () {
        return thumbnail.get(this);
    },
    convertBlobInfos: function (user) {
        var rsrc=this.getResource();
        var name=this.getName();
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a=Blob.isBlobURL(v);
                    if (a) {
                        o[k]=[Blob.BLOB_PATH_EXPR,user,name,a.fileName].join("/");
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        this.setResource(rsrc);
    },
    getBlobInfos: function () {
        var rsrc=this.getResource();
        var res=[];
        function loop(o) {
            if (typeof o!="object") return;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                var v=o[k];
                if (k=="url") {
                    var a=Blob.isBlobURL(v);
                    if (a) {
                        res.push(a);
                    }
                }
                loop(v);
            }
        }
        loop(rsrc);
        return res;
    },
    loadResource: function (next) {
        var r=this.getResource();
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
    },
    detectPlugins: function () {
        var opt=this.getOptions();
        var plugins=opt.plugins=opt.plugins||{};
        if (!plugins.Mezonet || !plugins.PicoAudio) {
            var res=this.getResource();
            var hasMZO=false,hasMIDI=false;
            if (res.sounds) res.sounds.forEach(function (item) {
                if (item.url.match(/\.mzo/)) hasMZO=true;
                if (item.url.match(/\.midi?/)) hasMIDI=true;
            });
            if (hasMZO) this.addPlugin("Mezonet");
            else this.removePlugin("Mezonet");
            if (hasMIDI) this.addPlugin("PicoAudio");
            else this.removePlugin("PicoAudio");
        }
    },
    addPlugin: function (name) {
        var opt=this.getOptions();
        if (!opt.plugins[name]) {
            opt.plugins[name]=1;
            this.setOptions(opt);
        }
    },
    removePlugin: function (name) {
        var opt=this.getOptions();
        if (opt.plugins[name]) {
            delete opt.plugins[name];
            this.setOptions(opt);
        }
    },
    requestPlugin: function (name) {
        this.addPlugin(name);
        if (plugins.loaded(name)) return;
        var req=new Error("必要なプラグイン"+name+"を追加しました。もう一度実行してください");
        req.pluginName=name;
        throw req;
    },
    loadPlugins: function (onload) {
        var opt=this.getOptions();
        return plugins.loadAll(opt.plugins,onload);
    },
    fixBootRunClasses: function () {
        var opt=this.getOptions();
        if (opt.run) {
            var mc=this.fixClassName(opt.run.mainClass);
            var bc=this.fixClassName(opt.run.bootClass);
            if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                opt.run.mainClass=mc;
                opt.run.bootClass=bc;
                this.setOptions(opt);
            }
        }
    },
    fixClassName: function (className) {
        if (Tonyu.classMetas[className]) return className;
        const ns=this.getNamespace();
        console.log("NS", ns);
        let res=Tonyu.classes[ns][className];
        if (res) return `${ns}.${className}`;
        for (var k in Tonyu.classes) {
            res=Tonyu.classes[k][className];
            if (res) return `${k}.${className}`;
        }
        throw new Error(`Cannot fix className ${className}`);
    },
    rawBoot: function (bootClassName) {
        this.showProgress("Running "+bootClassName);
        this.initCanvas();
        Tonyu.run(bootClassName);
    },
    initCanvas: function () {
        Tonyu.globals.$mainCanvas=$("canvas");
    },
    /*isKernelEditable: function () {
    	return env.options.kernelEditable;
    },*/
    //TPR.getDir=function () {return dir;};
    //TPR.getName=function () { return dir.name().replace(/\/$/,""); };

    showProgress: function (m) {
        console.log("PROGRESS",m);
        /*global SplashScreen*/
        if (typeof SplashScreen!="undefined") {
            SplashScreen.progress(m);
        }
        return DU.promise(function (succ) {
            setTimeout(succ,0);
        });
    }
};
});

define('langMod',['require','exports','module'],function (require,exports,module) {
    module.exports={
        getNamespace: function () {//override
            var opt=this.getOptions();
            if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
            throw new Error("Namespace is not set");
        },
        //TODO
        renameClassName: function (o,n) {// o: key of aliases
            throw new Error("Rename todo");
        },
        async loadDependingClasses() {
            const myNsp=this.getNamespace();
            for (let p of this.getDependingProjects()) {
                if (p.getNamespace()===myNsp) continue;
                await p.loadClasses();
            }
        },
        getEXT() {return ".tonyu";}
        // loadClasses: stub
    };
});

define('SourceFiles',['require','exports','module','root'],function (require, exports, module) {
//const S=require("source-map");
const root=require("root");
//const fs=require("fs").promises;
function timeout(t) {
    return new Promise(s=>setTimeout(s,t));
}
let vm;
/*if (root.process) {
    vm=require("vm");
}*/
class SourceFile {
    // var text, sourceMap:S.Sourcemap, functions;
    constructor(text, sourceMap, functions) {
        if (typeof text==="object") {
            const params=text;
            sourceMap=params.sourceMap;
            functions=params.functions;
            text=params.text;
            if (params.url) {
                this.url=params.url;
            }
        }
        this.text=text;
        this.sourceMap=sourceMap && sourceMap.toString();
        this.functions=functions;
    }
    async saveAs(outf) {
        const mapFile=outf.sibling(outf.name()+".map");
        let text=this.text;
        //text+="\n//# traceFunctions="+JSON.stringify(this.functions);
        if (this.sourceMap) {
            await mapFile.text(this.sourceMap);
            text+="\n//# sourceMappingURL="+mapFile.name();
        }
        await outf.text(text);
        //return Promise.resolve();
    }
    exec(options) {
        return new Promise((resolve, reject)=>{
            if (root.window) {
                const document=root.document;
                let u;
                if (this.url) {
                    u=this.url;
                } else {
                    const b=new root.Blob([this.text], {type: 'text/plain'});
                    u=root.URL.createObjectURL(b);
                }
                const s=document.createElement("script");
                console.log("load script",u);
                s.setAttribute("src",u);
                s.addEventListener("load",e=>{
                    resolve(e);
                });
                document.body.appendChild(s);
            } else if (options && options.tmpdir){
                const tmpdir=options.tmpdir;
                const uniqFile=tmpdir.rel(Math.random()+".js");
                const mapFile=uniqFile.sibling(uniqFile.name()+".map");
                let text=this.text;
                text+="\n//# sourceMappingURL="+mapFile.name();
                uniqFile.text(text);
                mapFile.text(this.sourceMap);
                //console.log("EX",uniqFile.exists());
                require(uniqFile.path());
                uniqFile.rm();
                mapFile.rm();
                resolve();

            } else {
                const F=Function;
                const f=(vm? vm.compileFunction(this.text) : new F(this.text));
                resolve(f());
            }
        });
    }
    export() {
        return {text:this.text, sourceMap:this.sourceMap, functions:this.functions};
    }
}
class SourceFiles {
    constructor() {
        this.functions={};
    }
    add(text, sourceMap, functions) {
        const sourceFile=new SourceFile(text, sourceMap, functions);
        if (sourceFile.functions) for (let k in sourceFile.functions) {
            this.functions[k]=sourceFile;
        }
        return sourceFile;
    }

}
module.exports=new SourceFiles();
});

define('CompiledProject',['require','exports','module','ProjectFactory','root','SourceFiles','assert','langMod'],function (require,exports,module) {
    const F=require("ProjectFactory");
    const root=require("root");
    const SourceFiles=require("SourceFiles");
    const A=require("assert");
    const langMod=require("langMod");
    F.addType("compiled",params=> {
        const ns=A.is(params.namespace,String,"ns");
        const url=A.is(params.url,String,"url");
        //A.is([ns,url],[String,String]);
        const res=F.createCore();
        return res.include(langMod).include({
			getNamespace:function () {return ns;},
			sourceDir: function () {return null;},
			getDependingProjects: function () {return [];},// virtual
			loadClasses: async function (ctx) {
				console.log("Loading compiled classes ns=",ns,"url=",url);
				var src = url+(root.WebSite && root.WebSite.serverType==="BA"?"?"+Math.random():"");
				//var u=window.navigator.userAgent.toLowerCase();
                const s=SourceFiles.add({url:src});
                await s.exec();
			},
        });
    });
    exports.create=params=>F.create("compiled",params);
});

define('Run3Project',['require','exports','module','ProjectFactory','root','WebSite','sysMod','langMod','SourceFiles','CompiledProject'],function (require,exports,module) {
    const F=require("ProjectFactory");
    //const Compiler=require("CompilerClient");
    const root=require("root");
    const WebSite=require("WebSite");
    const sysMod=require("sysMod");
    const langMod=require("langMod");
    const SourceFiles=require("SourceFiles");
    const CompiledProject=require("CompiledProject");
    F.addDependencyResolver((prj, spec)=>{
        if (spec.namespace==="kernel") {
            return CompiledProject.create({
                namespace:spec.namespace,
                url:WebSite.compiledKernel
            });
        }
    });
    F.addType("run3",params=> {
        const res=F.createDirBasedCore(params);
        res.include({
            async loadClasses () {
                await this.loadDependingClasses();
                const c=SourceFiles.add(this.getOutputFile().text());
                await c.exec();
            },
            async exec(srcraw) {
                console.log("Recving src",srcraw);
                await this.loadDependingClasses();
                const src=SourceFiles.add(srcraw);
                await src.exec();
            }
        }).include(langMod).include(sysMod);
        root.Project=res;
        return res;
    });
    exports.create=params=>F.create("run3",params);
});

/*global webkitAudioContext, AudioContext, AudioBuffer, AudioBufferSourceNode, PicoAudio, Mezonet, WebSite, Util*/
// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ

var T2MediaLib = (function(){
    function isPicoAudio(bgm) {
        return typeof PicoAudio!=="undefined" && bgm instanceof PicoAudio;
    }
    function isMezonetSource(bgm) {
        return typeof Mezonet!=="undefined" && bgm instanceof Mezonet.Source;
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
            var soundData = dataAry[idx];
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
        var audioBuffer = ctx.createBuffer(numOfChannels, array1.length, ctx.sampleRate);
        var buffer1 = audioBuffer.getChannelData(0);
        var buffer2 = array2 != null ? audioBuffer.getChannelData(1) : null;
        var i;
        for (i = 0; i < array1.length ; i++) {
             buffer1[i] = array1[i];
        }
        if (buffer2) {
            for (i = 0; i < array2.length ; i++) {
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
        if (url.match(/^data:/) && typeof Util!=="undefined" && Util.Base64_To_ArrayBuffer) {//@hoge1e3
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
        var that = this;
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
            //console.log("Loading mzo");
            // MZO
            Mezonet.init().then(function () {
                var a=Array.prototype.slice.call( new Uint8Array(arrayBuffer) );
                that.soundDataAry[idx].onDecodeComplete(new Mezonet.Source(a));
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.succ == "function") {
                        callbacks.succ(idx);
                    }
                });
                soundData.decodedCallbacksAry = null;
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
            });
            /*var m=new Mezonet(this.context,a);//,{wavOutSpeed:50});
            //m.load(a);
            m.init().then(function (res) {
                // デコード中にremoveDecodeSoundData()したらデータを捨てる
                switch(res.playbackMode.type) {
                case "Mezonet":
                that.soundDataAry[idx].onDecodeComplete(m);
                break;
                case "AudioBuffer":
                //console.log(idx, res.decodedData);
                that.soundDataAry[idx].onDecodeComplete(res.decodedData);
                break;
                }
                soundData.decodedCallbacksAry.forEach(function(callbacks) {
                    if (typeof callbacks.succ == "function") {
                        callbacks.succ(idx);
                    }
                });
                soundData.decodedCallbacksAry = null;
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
            });*/
        } else {
            // MP3, Ogg, AAC, WAV

            // Oggループタグ(LOOPSTART, LOOPLENGTH)をファイルから探す
            if (soundData.url.match(/\.(ogg?)$/) || soundData.url.match(/^data:audio\/ogg/)) {
                var retAry = this.searchOggLoop(arrayBuffer);
                soundData.tagLoopStart = retAry[0];
                soundData.tagLoopEnd = retAry[1];
            }

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
        if (isMezonetSource(soundData.decodedData)) {
            var playback=soundData.decodedData.playback(this.context);
            playback.Start();
            return playback;
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
        var durationStart = duration;
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
        return sourceObj.volumeValue;
    };
    T2MediaLib.prototype.setSEVolume = function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * this.seMasterVolume * this.masterVolume;
        sourceObj.volumeValue = vol;
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
    T2MediaLib.prototype.isTagLoop = function(id) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.isTagLoop();
    };
    T2MediaLib.prototype.setTagLoop = function(id, isTagLoop) {
        var bgmPlayer = this._getBgmPlayer(id);
        if (!bgmPlayer) return null;
        return bgmPlayer.setTagLoop(isTagLoop);
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
    };

    // Oggループタグ探す //
    T2MediaLib.prototype.searchOggLoop = function(arrayBuffer) {
        var buf = new Uint8Array(arrayBuffer.slice(0, 3000));
        var str = String.fromCharCode.apply(null, buf);
        var isVorbis = str.lastIndexOf("vorbis", 0x22);
        if (isVorbis == -1) return [0, 0]; // Vorbisではない場合、解析しない
        var startIdx = str.indexOf("LOOPSTART=");
        var lengthIdx = str.indexOf("LOOPLENGTH=");
        var loopStart = 0;
        var loopLength = 0;
        var sampleRate = buf[40] + (buf[41]<<8) + (buf[42]<<16) + (buf[43]<<24);
        var tagSize,i,c;
        if (startIdx != -1) {
            tagSize = buf[startIdx] + (buf[startIdx+1]<<8) + (buf[startIdx+2]<<16) + (buf[startIdx+3]<<24);
            for (i=startIdx+10; i<startIdx+tagSize; i++) {
                c = str[i];
                if (c < '0' || c > '9') break;
                loopStart = loopStart*10 + (c - '0');
            }
        }
        if (lengthIdx != -1) {
            tagSize = buf[lengthIdx] + (buf[lengthIdx+1]<<8) + (buf[lengthIdx+2]<<16) + (buf[lengthIdx+3]<<24);
            for (i=lengthIdx+11; i<lengthIdx+tagSize; i++) {
                c = str[i];
                if (c < '0' || c > '9') break;
                loopLength = loopLength*10 + (c - '0');
            }
        }
        // 秒に変換
        var loopEnd = (loopStart + loopLength) / sampleRate;
        loopStart /= sampleRate;
        return [loopStart, loopEnd];
    };

    return T2MediaLib;
})();



var T2MediaLib_BGMPlayer = (function(){
    function isPicoAudio(bgm) {
        return typeof PicoAudio!=="undefined" && bgm instanceof PicoAudio;
    }
    function isMezonetSource(bgm) {
        return typeof Mezonet!=="undefined" && bgm instanceof Mezonet.Source;
    }
    function isMezonetPlayback(bgm) {
        return typeof Mezonet!=="undefined" && bgm instanceof Mezonet.Playback;
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
        this.isTagLoop = true; // Ogg VorbisファイルにLOOPSTART,LOOPLENGTHのタグが入っている場合、再生時にそれを適用するか
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
                var succFunc = function() {
                    var pending = that.playingBGMStatePending; // 途中で値が変わるため保存
                    that._setPlayingBGMState("stop", true);
                    if (pending != "stop" && that.playingBGMName == idx) {
                        that.playBGM(idx, loop, offset, loopStart, loopEnd);
                    }
                    if (pending == "pause") {
                        that.pauseBGM();
                    }
                };
                var decodedData = soundData.decodedData;
                if (decodedData instanceof Object) { // MIDI
                    // MIDIの場合、デコード後はAudioContext.currenTimeの時間がとんで
                    // 再生直後、瞬間的に早送り再生みたいになるので、playBGMを一旦処理を後回しにする
                    setTimeout(function(){succFunc();}, 0);
                } else { // MP3, Ogg, AAC, WAV
                    succFunc();
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
        if (isMezonetSource(decodedData)) {
            var m=decodedData.playback(this.t2MediaLib.context);
            this.playingBGM = m;
            m.Start();
        } else if (decodedData instanceof AudioBuffer) {
            // MP3, Ogg, AAC, WAV
            if (this.isTagLoop) {
                loopStart = loopStart||soundData.tagLoopStart;
                loopEnd = loopEnd||soundData.tagLoopEnd;
            }
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
            this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume *
                 this.t2MediaLib.bgmMasterVolume * this.t2MediaLib.masterVolume);
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
        if (isMezonetPlayback(bgm)){
            bgm.Stop();
        } else if (isPicoAudio(bgm)) {
            // Midi
            this.picoAudio.stop();
        } else if (bgm instanceof AudioBufferSourceNode) {
            // MP3, Ogg, AAC, WAV
            try {
                bgm.stop(0);
            } catch(e) { // iOS対策
                // iOSではstopを２回以上呼ぶと、InvalidStateErrorが発生する
                if (bgm.gainNode) {
                    bgm.gainNode.gain.cancelScheduledValues(this.t2MediaLib.context.currentTime);
                    bgm.gainNode.gain.linearRampToValueAtTime(0, this.t2MediaLib.context.currentTime);
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
        if (isMezonetPlayback(bgm)){
            bgm.pause();
        } else if (isPicoAudio(bgm)) {
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
                        bgm.gainNode.gain.cancelScheduledValues(this.t2MediaLib.context.currentTime);
                        bgm.gainNode.gain.linearRampToValueAtTime(0, this.t2MediaLib.context.currentTime);
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
        if (isMezonetPlayback(bgm)){
            bgm.resume();
        } else if (isPicoAudio(bgm)) {
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
        if (isMezonetPlayback(bgm)){
            bgm.setVolume(vol);
        } else if (isPicoAudio(bgm)) {
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
        if (isMezonetPlayback(bgm)){
            bgm.setRate(tempo);
            return this;
        } else if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
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
        var time;
        if (isMezonetPlayback(bgm)){
            return bgm.getTrackTime();
        } else if (isPicoAudio(bgm)) {
            // Midi
            if (this.bgmPause === 0) {
                time = this.picoAudio.context.currentTime - this.picoAudio.states.startTime;
            } else {
                time = this.bgmPauseTime;
            }
            return time;
        } else if (bgm instanceof AudioBufferSourceNode) {
            // MP3, Ogg, AAC, WAV
            var time2, currenTime, tempo, plusTime, minusTime, mod;

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

    T2MediaLib_BGMPlayer.prototype.isTagLoop = function() {
        return this.isTagLoop;
    };

    T2MediaLib_BGMPlayer.prototype.setTagLoop = function(isTagLoop) {
        this.isTagLoop = isTagLoop;
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
        this.tagLoopStart = 0;
        this.tagLoopEnd = 0;
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
// r.jsで連結されたファイル全体がfunction(){...var T2Media...}() で閉じられている場合，グローバルに展開．
window.T2MediaLib=T2MediaLib;
window.T2MediaLib_BGMPlayer=T2MediaLib_BGMPlayer;
window.T2MediaLib_SoundData=T2MediaLib_SoundData;

define("T2MediaLib", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.T2MediaLib;
    };
}(this)));

define('exceptionCatcher',[], function () {
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
define('UI',["Util","exceptionCatcher"],function (Util, EC) {
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

define('UIDiag',["UI"],function (UI) {
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

/*global requirejs*/
requirejs(["ImageList","T2MediaLib","Tonyu","UIDiag"],
function (i,t,tn,u) {
    console.log("runtimes loaded",arguments);
    if (!window.T2MediaLib) window.T2MediaLib=t;
});

define("runtime", function(){});

define('runScript_common',[], function () {
    return {
        initCanvas: function () {
            function getMargin() {
                return 0;
            }

            var margin = getMargin();
            var w=$(window).width();
            var h=$(window).height();
            $("body").css({overflow:"hidden", margin:"0px"});
            var cv=$("<canvas>").attr({width: w-margin, height:h-margin, class:"tonyu-canvas"}).appendTo("body");

            var u = navigator.userAgent.toLowerCase();
            if ((u.indexOf("iphone") == -1 &&
                u.indexOf("ipad") == -1 &&
                u.indexOf("ipod") == -1
                ) && (!window.parent || window === window.parent)) {
                $(window).resize(onResize);
            }
            function onResize() {
                var margin = getMargin();
                w=$(window).width();
                h=$(window).height();
                cv.attr({width: w-margin, height: h-margin});
            }
            return cv;
        }
    };
});

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
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define('stacktrace',[],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.StackTrace=e()}}(function(){var e;return function n(e,r,t){function o(a,s){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(n){var r=e[a][1][n];return o(r?r:n)},l,l.exports,n,e,r,t)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("error-stack-parser",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.ErrorStackParser=i(o.StackFrame)}(this,function(e){"use strict";var n=/(^|@)\S+\:\d+/,r=/^\s*at .*(\S+\:\d+|\(native\))/m,t=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(r))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var n=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,r=n.exec(e.replace(/[\(\)]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(n){var t=n.stack.split("\n").filter(function(e){return!!e.match(r)},this);return t.map(function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),t=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i=["eval","<anonymous>"].indexOf(t[0])>-1?void 0:t[0];return new e({functionName:o,fileName:i,lineNumber:t[1],columnNumber:t[2],source:n})},this)},parseFFOrSafari:function(n){var r=n.stack.split("\n").filter(function(e){return!e.match(t)},this);return r.map(function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),n.indexOf("@")===-1&&n.indexOf(":")===-1)return new e({functionName:n});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,t=n.match(r),o=t&&t[1]?t[1]:void 0,i=this.extractLocation(n.replace(r,""));return new e({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,t=n.message.split("\n"),o=[],i=2,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera10:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=n.stacktrace.split("\n"),o=[],i=0,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({functionName:s[3]||void 0,fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera11:function(r){var t=r.stack.split("\n").filter(function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t.map(function(n){var r,t=n.split("@"),o=this.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e({functionName:a,args:s,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:n})},this)}}})},{stackframe:3}],2:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stack-generator",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.StackGenerator=i(o.StackFrame)}(this,function(e){return{backtrace:function(n){var r=[],t=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(t=n.maxStackSize);for(var o=arguments.callee;o&&r.length<t&&o.arguments;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?r.push(new e({functionName:RegExp.$1||void 0,args:i})):r.push(new e({args:i}));try{o=o.caller}catch(s){break}}return r}}})},{stackframe:3}],3:[function(n,r,t){!function(n,o){"use strict";"function"==typeof e&&e.amd?e("stackframe",[],o):"object"==typeof t?r.exports=o():n.StackFrame=o()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e){return e.charAt(0).toUpperCase()+e.substring(1)}function r(e){return function(){return this[e]}}function t(e){if(e instanceof Object)for(var r=0;r<u.length;r++)e.hasOwnProperty(u[r])&&void 0!==e[u[r]]&&this["set"+n(u[r])](e[u[r]])}var o=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],a=["fileName","functionName","source"],s=["args"],u=o.concat(i,a,s);t.prototype={getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof t)this.evalOrigin=e;else{if(!(e instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new t(e)}},toString:function(){var n=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",t=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+r+t+o+i}};for(var c=0;c<o.length;c++)t.prototype["get"+n(o[c])]=r(o[c]),t.prototype["set"+n(o[c])]=function(e){return function(n){this[e]=Boolean(n)}}(o[c]);for(var l=0;l<i.length;l++)t.prototype["get"+n(i[l])]=r(i[l]),t.prototype["set"+n(i[l])]=function(n){return function(r){if(!e(r))throw new TypeError(n+" must be a Number");this[n]=Number(r)}}(i[l]);for(var f=0;f<a.length;f++)t.prototype["get"+n(a[f])]=r(a[f]),t.prototype["set"+n(a[f])]=function(e){return function(n){this[e]=String(n)}}(a[f]);return t})},{}],4:[function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=e("./util"),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),a=this._array.length;t&&!n||this._array.push(e),t||(this._set[r]=a)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},r.ArraySet=t},{"./util":10}],5:[function(e,n,r){function t(e){return e<0?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=e("./base64"),a=5,s=1<<a,u=s-1,c=s;r.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=a,o>0&&(n|=c),r+=i.encode(n);while(o>0);return r},r.decode=function(e,n,r){var t,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(s&c),s&=u,f+=s<<p,p+=a}while(t);r.value=o(f),r.rest=n}},{"./base64":6}],6:[function(e,n,r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");r.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},r.decode=function(e){var n=65,r=90,t=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return n<=e&&e<=r?e-n:t<=e&&e<=o?e-t+c:i<=e&&e<=a?e-i+l:e==s?62:e==u?63:-1}},{}],7:[function(e,n,r){function t(e,n,o,i,a,s){var u=Math.floor((n-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?n-u>1?t(u,n,o,i,a,s):s==r.LEAST_UPPER_BOUND?n<i.length?n:-1:u:u-e>1?t(e,u,o,i,a,s):s==r.LEAST_UPPER_BOUND?u:e<0?-1:e}r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.search=function(e,n,o,i){if(0===n.length)return-1;var a=t(-1,n.length,e,n,o,i||r.GREATEST_LOWER_BOUND);if(a<0)return-1;for(;a-1>=0&&0===o(n[a],n[a-1],!0);)--a;return a}},{}],8:[function(e,n,r){function t(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function o(e,n){return Math.round(e+Math.random()*(n-e))}function i(e,n,r,a){if(r<a){var s=o(r,a),u=r-1;t(e,s,a);for(var c=e[a],l=r;l<a;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;i(e,n,r,f-1),i(e,n,f+1,a)}}r.quickSort=function(e,n){i(e,n,0,e.length-1)}},{}],9:[function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),t=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),o=s.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),r=s.getArg(n,"line"),o=s.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(s.getArg(e,"map"))}})}var s=e("./util"),u=e("./binary-search"),c=e("./array-set").ArraySet,l=e("./base64-vlq"),f=e("./quick-sort").quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,a=r||t.GENERATED_ORDER;switch(a){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),r={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=s.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},r.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=c.fromArray(e._names.toArray(),!0),t=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;p<g;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],C=[];_<v;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(r=new i,r.generatedLine=c,a=_;a<v&&!this._charIsMappingSeparator(e,a);a++);if(t=e.slice(_,a),o=y[t])_+=t.length;else{for(o=[];_<a;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=g+o[2],g=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),C.push(r),"number"==typeof r.originalLine&&b.push(r)}f(C,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=s.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},r.BasicSourceMapConsumer=o,a.prototype=Object.create(t.prototype),a.prototype.constructor=t,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer.sources.indexOf(s.getArg(e,"source"))!==-1){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=t.consumer._sources.at(a.source);null!==t.consumer.sourceRoot&&(u=s.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=t.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(t.generatedOffset.generatedLine===a.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},r.IndexedSourceMapConsumer=a},{"./array-set":4,"./base64-vlq":5,"./binary-search":7,"./quick-sort":8,"./util":10}],10:[function(e,n,r){function t(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function o(e){var n=e.match(v);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function a(e){var n=e,t=o(e);if(t){if(!t.path)return e;n=t.path}for(var a,s=r.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return n=u.join("/"),""===n&&(n=s?"/":"."),t?(t.path=n,i(t)):n}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=o(n),t=o(e);if(t&&(e=t.path||"/"),r&&!r.scheme)return t&&(r.scheme=t.scheme),i(r);if(r||n.match(_))return n;if(t&&!t.host&&!t.path)return t.host=n,i(t);var s="/"===n.charAt(0)?n:a(e.replace(/\/+$/,"")+"/"+n);return t?(t.path=s,i(t)):s}function u(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function c(e){return e}function l(e){return p(e)?"$"+e:e}function f(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function g(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function h(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function m(e,n){return e===n?0:e>n?1:-1}function d(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=m(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:m(e.name,n.name)))))}r.getArg=t;var v=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;r.urlParse=o,r.urlGenerate=i,r.normalize=a,r.join=s,r.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(v)},r.relative=u;var y=function(){var e=Object.create(null);return!("__proto__"in e)}();r.toSetString=y?c:l,r.fromSetString=y?c:f,r.compareByOriginalPositions=g,r.compareByGeneratedPositionsDeflated=h,r.compareByGeneratedPositionsInflated=d},{}],11:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace-gps",["source-map","stackframe"],i):"object"==typeof t?r.exports=i(n("source-map/lib/source-map-consumer"),n("stackframe")):o.StackTraceGPS=i(o.SourceMap||o.sourceMap,o.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300||"file://"===e.substr(0,7)&&t.responseText?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r=[/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,/function\s+([^('"`]*?)\s*\(([^)]*)\)/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,/\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/],t=e.split("\n"),o="",i=Math.min(n,20),a=0;a<i;++a){var s=t[n-a-1],u=s.indexOf("//");if(u>=0&&(s=s.substr(0,u)),s){o=s+o;for(var c=r.length,l=0;l<c;l++){var f=r[l].exec(o);if(f&&f[1])return f[1]}}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){for(var n,r,t=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;r=t.exec(e);)n=r[1];if(n)return n;throw new Error("sourceMappingURL not found")}function c(e,r,t){return new Promise(function(o,i){var a=r.originalPositionFor({line:e.lineNumber,column:e.columnNumber});if(a.source){var s=r.sourceContentFor(a.source);s&&(t[a.source]=s),o(new n({functionName:a.name||e.functionName,args:e.args,fileName:a.source,lineNumber:a.line,columnNumber:a.column}))}else i(new Error("Could not get original source for given stackframe and source map"))})}return function l(f){return this instanceof l?(f=f||{},this.sourceCache=f.sourceCache||{},this.sourceMapConsumerCache=f.sourceMapConsumerCache||{},this.ajax=f.ajax||r,this._atob=f.atob||t,this._get=function(e){return new Promise(function(n,r){var t="data:"===e.substr(0,5);if(this.sourceCache[e])n(this.sourceCache[e]);else if(f.offline&&!t)r(new Error("Cannot make network requests in offline mode"));else if(t){var o=/^data:application\/json;([\w=:"-]+;)*base64,/,i=e.match(o);if(i){var a=i[0].length,s=e.substr(a),u=this._atob(s);this.sourceCache[e]=u,n(u)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(e,{method:"get"});this.sourceCache[e]=c,c.then(n,r)}}.bind(this))},this._getSourceMapConsumer=function(n,r){return new Promise(function(t,i){if(this.sourceMapConsumerCache[n])t(this.sourceMapConsumerCache[n]);else{var a=new Promise(function(t,i){return this._get(n).then(function(n){"string"==typeof n&&(n=o(n.replace(/^\)\]\}'/,""))),"undefined"==typeof n.sourceRoot&&(n.sourceRoot=r),t(new e.SourceMapConsumer(n))},i)}.bind(this));this.sourceMapConsumerCache[n]=a,t(a)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){s(e),this._get(e.fileName).then(function(t){var o=e.lineNumber,a=e.columnNumber,s=i(t,o,a);r(s?new n({functionName:s,args:e.args,fileName:e.fileName,lineNumber:o,columnNumber:a}):e)},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){a(),s(e);var t=this.sourceCache,o=e.fileName;this._get(o).then(function(r){var i=u(r),a="data:"===i.substr(0,5),s=o.substring(0,o.lastIndexOf("/")+1);return"/"===i[0]||a||/^https?:\/\/|^\/\//i.test(i)||(i=s+i),this._getSourceMapConsumer(i,s).then(function(r){return c(e,r,t).then(n)["catch"](function(){n(e)})})}.bind(this),r)["catch"](r)}.bind(this))})):new l(f)}})},{"source-map/lib/source-map-consumer":9,stackframe:3}],12:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],i):"object"==typeof t?r.exports=i(n("error-stack-parser"),n("stack-generator"),n("stacktrace-gps")):o.StackTrace=i(o.ErrorStackParser,o.StackGenerator,o.StackTraceGPS)}(this,function(e,n,r){function t(e,n){var r={};return[e,n].forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);return r}),r}function o(e){return e.stack||e["opera#sourceloc"]}function i(e,n){return"function"==typeof n?e.filter(n):e}var a={filter:function(e){return(e.functionName||"").indexOf("StackTrace$$")===-1&&(e.functionName||"").indexOf("ErrorStackParser$$")===-1&&(e.functionName||"").indexOf("StackTraceGPS$$")===-1&&(e.functionName||"").indexOf("StackGenerator$$")===-1},sourceCache:{}},s=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=s();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(r){r=t(a,r);var u=s(),c=o(u)?e.parse(u):n.backtrace(r);return i(c,r.filter)},fromError:function(n,o){o=t(a,o);var s=new r(o);return new Promise(function(r){var t=i(e.parse(n),o.filter);r(Promise.all(t.map(function(e){return new Promise(function(n){function r(){n(e)}s.pinpoint(e).then(n,r)["catch"](r)})})))}.bind(this))},generateArtificially:function(e){e=t(a,e);var r=n.backtrace(e);return"function"==typeof e.filter&&(r=r.filter(e.filter)),Promise.resolve(r)},instrument:function(e,n,r,t){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,r)["catch"](r),e.apply(t||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,r)["catch"](r),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,r,t){return new Promise(function(o,i){var a=new XMLHttpRequest;if(a.onerror=i,a.onreadystatechange=function(){4===a.readyState&&(a.status>=200&&a.status<400?o(a.responseText):i(new Error("POST to "+n+" failed with status: "+a.status)))},a.open("post",n),a.setRequestHeader("Content-Type","application/json"),t&&"object"==typeof t.headers){var s=t.headers;for(var u in s)s.hasOwnProperty(u)&&a.setRequestHeader(u,s[u])}var c={stack:e};void 0!==r&&null!==r&&(c.message=r),a.send(JSON.stringify(c))})}}})},{"error-stack-parser":1,"stack-generator":2,"stacktrace-gps":11}]},{},[12])(12)});
//# sourceMappingURL=stacktrace.min.js.map
;
define('StackDecoder',['require','exports','module','source-map','stacktrace','SourceFiles'],function (require, exports, module) {
const S=require("source-map");
const StackTrace=require("stacktrace");
const SourceFiles=require("SourceFiles");
module.exports={
    decode(e) {
        StackTrace.fromError(e).then(tr=>{
            tr.forEach(t=>{
                //console.log(t);
                if (typeof t.functionName!=="string") return;
                if (!S) return;
                /*columnNumber: 17,
                lineNumber: 21,*/
                t.functionName.replace(/[\$_a-zA-Z0-9]+/g, s=> {
                    //console.log("!",s,this.functions[s]);
                    if (SourceFiles.functions[s]) {
                        const sf=SourceFiles.functions[s];
                        const opt={
                            line: t.lineNumber, column:t.columnNumber,
                            bias:S.SourceMapConsumer.GREATEST_LOWER_BOUND
                        };
                        const pos=this.originalPositionFor(sf,opt);
                        console.log("pos",opt,pos);
                    }
                });
            });
            //console.log("functions",this.functions);
        });
        //console.log(st);
    },
    originalPositionFor(sf,opt) {
        const s=sf.getSourceMapConsumer();
        if (!s) return opt;
        return s.originalPositionFor(opt);
    },
    getSourceMapConsumer(sf) {
        if (sf.sourceMapConsumer) return sf.sourceMapConsumer;
        sf.sourceMapConsumer=new S.SourceMapConsumer(JSON.parse(sf.sourceMap));
        //console.log(this.sourceMapConsumer);
        return sf.sourceMapConsumer;
    }
};
});

/*global requirejs*/
requirejs(["FS","Tonyu","Run3Project",
			"runtime","WebSite","root","runScript_common","Util","StackDecoder"],
		function (FS,  Tonyu, Run3Project,
				rt,WebSite,root,com,Util,StackDecoder) {
	$(function () {
		var prjPath=Util.getQueryString("prj");
		var cv=com.initCanvas();

		var curProjectDir=FS.resolve(prjPath);
		//sh.cd(curProjectDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		var curPrj=Run3Project.create({dir:curProjectDir});//, kernelDir);
		curPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		Tonyu.onRunTimeError=e=>{
			StackDecoder.decode(e);
		};
		start();
		function start() {
			Tonyu.currentProject=Tonyu.globals.$currentProject=curPrj;
			curPrj.detectPlugins();
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

define("runScript3", function(){});

})();
