(function (WORKER_URL) {
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
    isChildOf: function(child, parent) {
        return this.startsWith( this.normalize(child), this.normalize(parent));
    },
    normalize: function (path) {
        return this.fixSep(path,"/").replace(/\/+$/,"/");
    },
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
        size: function (path) {
            var c=this.getContent(path,{type:ArrayBuffer});
            var l=c.toBin().byteLength;
            return l;
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

/*global process, global, Buffer*/
define('NativeFS',["FSClass","assert","PathUtil","extend","Content"],
        function (FS,A,P,extend,Content) {
    var assert=A,fs;
    try {
        fs=global.require("fs");
        fs.existsSync('test.txt');
    }catch(e){
        return function () {
            throw new Error("This system not support native FS");
        };
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
        size: function(path) {
            var np=this.toNativePath(path);
            var st=fs.statSync(np);
            return st.size;
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
                return this.act.fs.size(this.act.path);
                //return this.getBytes().byteLength;
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
                    if (P.isChildOf(path,ob.path)) {
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
            if (NativeFS.available) {
                fs=new NativeFS();
            } else if (typeof localStorage==="object") {
                fs=new LSFS(localStorage);
            } else if (typeof importScripts==="function") {
                // Worker
                /* global self*/
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

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    const Assertion=function(failMesg) {
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
                    let na=self.subAssertion("failed at ",value,"[",i,"]: ");
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
                    let na=this.subAssertion("failed at ",value,".",k,":");
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
    }
    module.exports=assert;

},{}],2:[function(require,module,exports){
/*global window,self,global*/
(function (deps, factory) {
    module.exports=factory();
})([],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

},{}],3:[function(require,module,exports){
//		function (assert,TT,IT,DU) {
var assert=require("../lib/assert");
var root=require("../lib/root");
var TonyuThreadF=require("./TonyuThread");
var IT=require("./tonyuIterator");
module.exports=function () {
	// old browser support
	if (!root.performance) {
		root.performance = {};
	}
	if (!root.performance.now) {
		root.performance.now = function now() {
			return Date.now();
		};
	}
	var preemptionTime=60;
	var klass={};
	var Tonyu,TT;
	function thread() {
		var t=new TT();
		t.handleEx=handleEx;
		return t;
	}
	function timeout(t) {
		return new Promise(function (s) {
			setTimeout(s,t);
		});
	}
	/*function animationFrame() {
		return new Promise( function (f) {
			requestAnimationFrame(f);
		});
	}*/

	function handleEx(e) {
		if (Tonyu.onRuntimeError) {
			Tonyu.onRuntimeError(e);
		} else {
			//if (typeof $LASTPOS=="undefined") $LASTPOS=0;
			if (root.alert) root.alert("エラー! メッセージ  : "+e);
			console.log(e.stack);
			throw e;
		}
	}
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
	/*Function.prototype.constructor=function () {
		throw new Error("This method should not be called");
	};*/
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
			/*if (typeof Profiler!=="undefined") {
				Profiler.profile(methods, fullName);
			}*/
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
			var props={};
			var propReg=klass.propReg;//^__([gs]et)ter__(.*)$/;
			var k;
			for (k in methods) {
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
			for (k in props) {
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
		//console.log("defined", fullName, Tonyu.classes,Tonyu.ID);
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
		var TPR=Tonyu.currentProject;
		if (TPR) {
			//TPR.runningThread=th;
			TPR.runningObj=boot;
		}
		//$LASTPOS=0;
		//th.steps();
	}
	var lastLoopCheck=root.performance.now();
	var prevCheckLoopCalled;
	function checkLoop() {
		var now=root.performance.now();
		if (now-lastLoopCheck>1000) {
			resetLoopCheck(10000);
			throw new Error("無限ループをストップしました。\n"+
				"   プロジェクト オプションで無限ループチェックの有無を設定できます。\n"+
				"   [参考]https://edit.tonyu.jp/doc/options.html\n");
		}
		prevCheckLoopCalled=now;
	}
	function resetLoopCheck(disableTime) {
		lastLoopCheck=root.performance.now()+(disableTime||0);
	}
	function is(obj,klass) {
		if (!obj) return false;
		if (obj instanceof klass) return true;
		if (typeof obj.getClassInfo==="function" && klass.meta) {
			return obj.getClassInfo().includesRec[klass.meta.fullName];
		}
		return false;
	}
	//setInterval(resetLoopCheck,16);
	Tonyu={thread:thread, /*threadGroup:threadGroup,*/
			klass:klass, bless:bless, extend:extend,
			globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
			timeout:timeout,//animationFrame:animationFrame, /*asyncResult:asyncResult,*/
			bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,is:is,
			hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
			iterator:IT,run:run,checkLoop:checkLoop,resetLoopCheck:resetLoopCheck,//DeferredUtil:DU,
			VERSION:1560828115159,//EMBED_VERSION
			A:A,ID:Math.random()};
	TT=TonyuThreadF(Tonyu);
	if (root.Tonyu) {
		console.error("Tonyu called twice!");
		throw new Error("Tonyu called twice!");
	}
	root.Tonyu=Tonyu;
	return Tonyu;
}();

},{"../lib/assert":1,"../lib/root":2,"./TonyuThread":4,"./tonyuIterator":5}],4:[function(require,module,exports){
//	var Klass=require("../lib/Klass");
module.exports=function (Tonyu) {
	var cnts={enterC:{},exitC:0};
	var idSeq=1;
	//try {window.cnts=cnts;}catch(e){}
	class TonyuThread {
		constructor() {
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
		}
		isAlive() {
			return !this.isDead();
			//return this.frame!=null && this._isAlive;
		}
		isDead() {
			this._isDead=this._isDead || (this.frame==null) ||
			(this._threadGroup && (
					this._threadGroup.objectPoolAge!=this.tGrpObjectPoolAge ||
					this._threadGroup.isDeadThreadGroup()
			));
			return this._isDead;
		}
		setThreadGroup(g) {// g:TonyuThread
			this._threadGroup=g;
			this.tGrpObjectPoolAge=g.objectPoolAge;
			//if (g) g.add(fb);
		}
		isWaiting() {
			return this._isWaiting;
		}
		suspend() {
			this.fSuspended=true;
			this.cnt=0;
		}
		enter(frameFunc) {
			//var n=frameFunc.name;
			//cnts.enterC[n]=(cnts.enterC[n]||0)+1;
			this.frame={prev:this.frame, func:frameFunc};
		}
		apply(obj, methodName, args) {
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
		}
		notifyEnd(r) {
			this.onEndHandlers.forEach(function (e) {
				e(r);
			});
			this.notifyTermination({status:"success",value:r});
		}
		notifyTermination(tst) {
			this.onTerminateHandlers.forEach(function (e) {
				e(tst);
			});
		}
		on(type,f) {
			if (type==="end"||type==="success") this.onEndHandlers.push(f);
			if (type==="terminate") {
				this.onTerminateHandlers.push(f);
				if (this.handleEx) delete this.handleEx;
			}
		}
		promise() {
			var fb=this;
			return new Promise(function (succ,err) {
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
		}
		then(succ,err) {
			if (err) return this.promise().then(succ,err);
			else return this.promise().then(succ);
		}
		fail(err) {
			return this.promise().then(e=>e, err);
		}
		gotoCatch(e) {
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
		}
		startCatch() {
			var fb=this;
			var e=fb.lastEx;
			fb.lastEx=null;
			return e;
		}
		exit(res) {
			//cnts.exitC++;
			this.frame=(this.frame ? this.frame.prev:null);
			this.retVal=res;
		}
		enterTry(catchPC) {
			var fb=this;
			fb.tryStack.push({frame:fb.frame,catchPC:catchPC});
		}
		exitTry() {
			var fb=this;
			fb.tryStack.pop();
		}
		waitEvent(obj,eventSpec) { // eventSpec=[EventType, arg1, arg2....]
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
		}
		runAsync(f) {
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
		}
		waitFor(j) {
			var fb=this;
			fb._isWaiting=true;
			fb.suspend();
			if (j instanceof TonyuThread) j=j.promise();
			return Promise.resolve(j).then(function (r) {
				fb.retVal=r;
				fb.stepsLoop();
			}).then(e=>e,function (e) {
				fb.gotoCatch(fb.wrapError(e));
				fb.stepsLoop();
			});
		}
		wrapError(e) {
			if (e instanceof Error) return e;
			var re=new Error(e);
			re.original=e;
			return re;
		}
		resume(retVal) {
			this.retVal=retVal;
			this.steps();
		}
		steps() {
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
		}
		stepsLoop() {
			var fb=this;
			fb.steps();
			if (fb.preempted) {
				setTimeout(function () {
					fb.stepsLoop();
				},0);
			}
		}
		kill() {
			var fb=this;
			//fb._isAlive=false;
			fb._isDead=true;
			fb.frame=null;
			if (!fb.termStatus) {
				fb.termStatus="killed";
				fb.notifyTermination({status:"killed"});
			}
		}
		clearFrame() {
			this.frame=null;
			this.tryStack=[];
		}
	}
	return TonyuThread;
};

},{}],5:[function(require,module,exports){
//define(["Klass"], function (Klass) {
	//var Klass=require("../lib/Klass");
	class ArrayValueIterator {
		constructor(set) {
			this.set=set;
			this.i=0;
		}
		next () {
			if (this.i>=this.set.length) return false;
			this[0]=this.set[this.i];
			this.i++;
			return true;
		}
	}
	class ArrayKeyValueIterator {
		constructor(set) {
			this.set=set;
			this.i=0;
		}
		next() {
			if (this.i>=this.set.length) return false;
			this[0]=this.i;
			this[1]=this.set[this.i];
			this.i++;
			return true;
		}
	}
	class ObjectKeyIterator {
		constructor(set) {
			this.elems=[];
			for (var k in set) {
				this.elems.push(k);
			}
			this.i=0;
		}
		next() {
			if (this.i>=this.elems.length) return false;
			this[0]=this.elems[this.i];
			this.i++;
			return true;
		}
	}
	class ObjectKeyValueIterator{
		constructor(set) {
			this.elems=[];
			for (var k in set) {
				this.elems.push([k,set[k]]);
			}
			this.i=0;
		}
		next() {
			if (this.i>=this.elems.length) return false;
			this[0]=this.elems[this.i][0];
			this[1]=this.elems[this.i][1];
			this.i++;
			return true;
		}
	}


	function IT(set, arity) {
		if (set.tonyuIterator) {
			// TODO: the prototype of class having tonyuIterator will iterate infinitively
			return set.tonyuIterator(arity);
		} else if (set instanceof Array) {
			if (arity==1) {
				return new ArrayValueIterator(set);
			} else {
				return new ArrayKeyValueIterator(set);
			}
		} else if (set instanceof Object){
			if (arity==1) {
				return new ObjectKeyIterator(set);
			} else {
				return new ObjectKeyValueIterator(set);
			}
		} else {
			console.log(set);
			throw new Error(set+" is not iterable");
		}
	}
	module.exports=IT;
//   Tonyu.iterator=IT;
//	return IT;
//});

},{}]},{},[3]);

define("Tonyu", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Tonyu;
    };
}(this)));

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('BuilderClient4Sys',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TonyuBuilderClient = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const root=require("../lib/root");
const Worker=root.Worker;
const WS=require("../lib/WorkerServiceB");
const SourceFiles=require("../lang/SourceFiles");
const FileMap=require("../lib/FileMap");
//const FS=(root.parent && root.parent.FS) || root.FS;
const FS=root.FS;// TODO

class BuilderClient {
    constructor(prj,config) {// dirBased
        this.prj=prj;
        let url=config.worker.url;
        if (!url.match(/^blob/)) url+="?"+Math.random();
        this.w=new WS.Wrapper(new Worker(url));
        this.config=config;
        this.fileMap=new FileMap();
    }
    getOutputFile(...f) {return this.prj.getOutputFile(...f);}
    getDir(){return this.prj.getDir();}
    setDebugger(t) {this.debugger=t;}// t:iframe.contentWindow.Debugger
    exec(srcraw) {
        if (this.debugger) return this.debugger.exec(srcraw);
    }
    convertFromWorkerPath(path) {
        return this.fileMap.convert(path,"remote","local");
    }
    async init() {
        if (this.inited) return;
        const fileMap=this.fileMap;
        const localPrjDir=this.getDir();
        const files=localPrjDir.exportAsObject({
            excludesF: f=>f.ext()!==".tonyu" && f.name()!=="options.json"
        });
        const ns2depspec=this.config.worker.ns2depspec;
        const {prjDir:remotePrjDir}=await this.w.run("compiler/init",{
            namespace:this.prj.getNamespace(),
            files, ns2depspec
        });
        fileMap.add({local:localPrjDir, remote: remotePrjDir});
        const deps=this.prj.getDependingProjects();//TODO recursive
        for (let dep of deps) {
            const ns=dep.getNamespace();
            if (!ns2depspec[ns]) {
                const localPrjDir=dep.getDir();
                const files=localPrjDir.exportAsObject({
                    excludesF: f=>f.ext()!==".tonyu" && f.name()!=="options.json"
                });
                const {prjDir:remotePrjDir}=await this.w.run("compiler/addDependingProject",{
                    namespace:ns, files
                });
                fileMap.add({local:localPrjDir, remote: remotePrjDir});
            }
        }
        this.inited=true;
    }
    async fullCompile() {
        try {
            await this.init();
            const compres=await this.w.run("compiler/fullCompile");
            console.log(compres);
            const sf=SourceFiles.add(compres);
            await sf.saveAs(this.getOutputFile());
            await this.exec(compres);
            return compres;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    async partialCompile(f) {
        try {
            const files={};files[f.relPath(this.getDir())]=f.text();
            await this.init();
            const compres=await this.w.run("compiler/postChange",{files});
            console.log(compres);
            await this.exec(compres);
            return compres;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    async renameClassName(from,to) {
        try {
            await this.init();
            let changed=await this.w.run("compiler/renameClassName",{from,to});
            for (let n in changed) {
                let val=changed[n];
                n=this.convertFromWorkerPath(n);
                if (val==null) {
                    FS.get(n).rm();
                } else {
                    FS.get(n).text(val);
                }
            }
            return changed;
        } catch(e) {
            throw this.convertError(e);
        }
    }
    convertError(e) {
        if (e.isTError) {
            e.src=FS.get(this.convertFromWorkerPath(e.src));
        }
        return e;
    }
    async run() {
        await this.init();
        await this.fullCompile();
        this.getDir().watch(async (e,f)=>{
            console.log(e,f.path());
            if (f.ext()===".tonyu") {
                const nsraw=await this.partialCompile(f);
                if (this.config.onCompiled) this.config.onCompiled(nsraw);

                //if (root.Tonyu.globals.$restart) root.Tonyu.globals.$restart();
            }
        });
    }
}
BuilderClient.SourceFiles=SourceFiles;
//root.TonyuBuilderClient=BuilderClient;
module.exports=BuilderClient;

},{"../lang/SourceFiles":3,"../lib/FileMap":8,"../lib/WorkerServiceB":9,"../lib/root":10}],2:[function(require,module,exports){
// Add extra libraries for Tonyu System IDE
//const root=require("../lib/root");
const BuilderClient=require("./BuilderClient");

const SourceFiles=require("../lang/SourceFiles");
const ProjectFactory=require("../project/ProjectFactory");
const CompiledProject=require("../project/CompiledProject");
const langMod=require("../lang/langMod");
const StackDecoder=require("../lang/StackDecoder");
const SourceMap=require("../lang/source-map");
BuilderClient.SourceFiles=SourceFiles;
BuilderClient.ProjectFactory=ProjectFactory;
BuilderClient.CompiledProject=CompiledProject;
BuilderClient.langMod=langMod;
BuilderClient.StackDecoder=StackDecoder;
BuilderClient.SourceMap=SourceMap;
module.exports=BuilderClient;
//root.TonyuBuilderClient=BuilderClient;

},{"../lang/SourceFiles":3,"../lang/StackDecoder":4,"../lang/langMod":5,"../lang/source-map":6,"../project/CompiledProject":11,"../project/ProjectFactory":12,"./BuilderClient":1}],3:[function(require,module,exports){
//define(function (require,exports,module) {
/*const root=require("root");*/
const root=require("../lib/root");
function timeout(t) {
    return new Promise(s=>setTimeout(s,t));
}
let vm;
/*global global*/
if (typeof global!=="undefined" && global.require) {
    vm=global.require("vm");
}
class SourceFile {
    // var text, sourceMap:S.Sourcemap;
    constructor(text, sourceMap) {
        if (typeof text==="object") {
            const params=text;
            sourceMap=params.sourceMap;
            //functions=params.functions;
            text=params.text;
            if (params.url) {
                this.url=params.url;
            }
        }
        this.text=text;
        this.sourceMap=sourceMap && sourceMap.toString();
        //this.functions=functions;
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
                this.parent.url2SourceFile[u]=this;
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
            } else if (root.importScripts && this.url){
                root.importScripts(this.url);
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
        this.url2SourceFile={};
    }
    add(text, sourceMap) {
        const sourceFile=new SourceFile(text, sourceMap);
        /*if (sourceFile.functions) for (let k in sourceFile.functions) {
            this.functions[k]=sourceFile;
        }*/
        sourceFile.parent=this;
        return sourceFile;
    }

}
module.exports=new SourceFiles();
//});/*--end of define--*/

},{"../lib/root":10}],4:[function(require,module,exports){
const S=require("./source-map");
const StackTrace=require("./stacktrace");
const SourceFiles=require("./SourceFiles");
module.exports={
    async decode(e) {
        try{
            const tr=await StackTrace.fromError(e,{offline:true});
            tr.forEach(t=>{
                try {
                    const sf=SourceFiles.url2SourceFile[t.fileName];
                    console.log("sf", t.fileName, sf, SourceFiles.url2SourceFile);
                    if (sf) {
                        const opt={
                            line: t.lineNumber, column:t.columnNumber,
                            bias:S.SourceMapConsumer.GREATEST_LOWER_BOUND
                        };
                        const pos=this.originalPositionFor(sf,opt);
                        console.log("pos",opt,pos);
                        if (pos.source) t.fileName=pos.source;
                        if (pos.line) t.lineNumber=pos.line;
                        if (pos.column) t.columnNumber=pos.column;
                    }
                }catch(ex) {
                    console.log("Sourcemap error",ex);
                }
            });
            console.log("Converted: ",tr);
            return tr;
        } catch(ex) {
            console.log("StackTrace error",ex);
            if (!e || !e.stack) {
                console.log("HennaError",e);
                return [];
            }
            return e.stack.split("\n");
        }
    },
    originalPositionFor(sf,opt) {
        const s=this.getSourceMapConsumer(sf);
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

},{"./SourceFiles":3,"./source-map":6,"./stacktrace":7}],5:[function(require,module,exports){
    module.exports={
        getNamespace: function () {//override
            var opt=this.getOptions();
            if (opt.compiler && opt.compiler.namespace) return opt.compiler.namespace;
            throw new Error("Namespace is not set");
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

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.StackTrace=e()}}(function(){var e;return function n(e,r,t){function o(a,s){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(n){var r=e[a][1][n];return o(r?r:n)},l,l.exports,n,e,r,t)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("error-stack-parser",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.ErrorStackParser=i(o.StackFrame)}(this,function(e){"use strict";var n=/(^|@)\S+\:\d+/,r=/^\s*at .*(\S+\:\d+|\(native\))/m,t=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(r))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var n=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,r=n.exec(e.replace(/[\(\)]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(n){var t=n.stack.split("\n").filter(function(e){return!!e.match(r)},this);return t.map(function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),t=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i=["eval","<anonymous>"].indexOf(t[0])>-1?void 0:t[0];return new e({functionName:o,fileName:i,lineNumber:t[1],columnNumber:t[2],source:n})},this)},parseFFOrSafari:function(n){var r=n.stack.split("\n").filter(function(e){return!e.match(t)},this);return r.map(function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),n.indexOf("@")===-1&&n.indexOf(":")===-1)return new e({functionName:n});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,t=n.match(r),o=t&&t[1]?t[1]:void 0,i=this.extractLocation(n.replace(r,""));return new e({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,t=n.message.split("\n"),o=[],i=2,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera10:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=n.stacktrace.split("\n"),o=[],i=0,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({functionName:s[3]||void 0,fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera11:function(r){var t=r.stack.split("\n").filter(function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t.map(function(n){var r,t=n.split("@"),o=this.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e({functionName:a,args:s,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:n})},this)}}})},{stackframe:3}],2:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stack-generator",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.StackGenerator=i(o.StackFrame)}(this,function(e){return{backtrace:function(n){var r=[],t=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(t=n.maxStackSize);for(var o=arguments.callee;o&&r.length<t&&o.arguments;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?r.push(new e({functionName:RegExp.$1||void 0,args:i})):r.push(new e({args:i}));try{o=o.caller}catch(s){break}}return r}}})},{stackframe:3}],3:[function(n,r,t){!function(n,o){"use strict";"function"==typeof e&&e.amd?e("stackframe",[],o):"object"==typeof t?r.exports=o():n.StackFrame=o()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e){return e.charAt(0).toUpperCase()+e.substring(1)}function r(e){return function(){return this[e]}}function t(e){if(e instanceof Object)for(var r=0;r<u.length;r++)e.hasOwnProperty(u[r])&&void 0!==e[u[r]]&&this["set"+n(u[r])](e[u[r]])}var o=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],a=["fileName","functionName","source"],s=["args"],u=o.concat(i,a,s);t.prototype={getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof t)this.evalOrigin=e;else{if(!(e instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new t(e)}},toString:function(){var n=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",t=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+r+t+o+i}};for(var c=0;c<o.length;c++)t.prototype["get"+n(o[c])]=r(o[c]),t.prototype["set"+n(o[c])]=function(e){return function(n){this[e]=Boolean(n)}}(o[c]);for(var l=0;l<i.length;l++)t.prototype["get"+n(i[l])]=r(i[l]),t.prototype["set"+n(i[l])]=function(n){return function(r){if(!e(r))throw new TypeError(n+" must be a Number");this[n]=Number(r)}}(i[l]);for(var f=0;f<a.length;f++)t.prototype["get"+n(a[f])]=r(a[f]),t.prototype["set"+n(a[f])]=function(e){return function(n){this[e]=String(n)}}(a[f]);return t})},{}],4:[function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=e("./util"),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),a=this._array.length;t&&!n||this._array.push(e),t||(this._set[r]=a)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},r.ArraySet=t},{"./util":10}],5:[function(e,n,r){function t(e){return e<0?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=e("./base64"),a=5,s=1<<a,u=s-1,c=s;r.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=a,o>0&&(n|=c),r+=i.encode(n);while(o>0);return r},r.decode=function(e,n,r){var t,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(s&c),s&=u,f+=s<<p,p+=a}while(t);r.value=o(f),r.rest=n}},{"./base64":6}],6:[function(e,n,r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");r.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},r.decode=function(e){var n=65,r=90,t=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return n<=e&&e<=r?e-n:t<=e&&e<=o?e-t+c:i<=e&&e<=a?e-i+l:e==s?62:e==u?63:-1}},{}],7:[function(e,n,r){function t(e,n,o,i,a,s){var u=Math.floor((n-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?n-u>1?t(u,n,o,i,a,s):s==r.LEAST_UPPER_BOUND?n<i.length?n:-1:u:u-e>1?t(e,u,o,i,a,s):s==r.LEAST_UPPER_BOUND?u:e<0?-1:e}r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.search=function(e,n,o,i){if(0===n.length)return-1;var a=t(-1,n.length,e,n,o,i||r.GREATEST_LOWER_BOUND);if(a<0)return-1;for(;a-1>=0&&0===o(n[a],n[a-1],!0);)--a;return a}},{}],8:[function(e,n,r){function t(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function o(e,n){return Math.round(e+Math.random()*(n-e))}function i(e,n,r,a){if(r<a){var s=o(r,a),u=r-1;t(e,s,a);for(var c=e[a],l=r;l<a;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;i(e,n,r,f-1),i(e,n,f+1,a)}}r.quickSort=function(e,n){i(e,n,0,e.length-1)}},{}],9:[function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),t=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),o=s.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),r=s.getArg(n,"line"),o=s.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(s.getArg(e,"map"))}})}var s=e("./util"),u=e("./binary-search"),c=e("./array-set").ArraySet,l=e("./base64-vlq"),f=e("./quick-sort").quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,a=r||t.GENERATED_ORDER;switch(a){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),r={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=s.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},r.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=c.fromArray(e._names.toArray(),!0),t=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;p<g;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],C=[];_<v;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(r=new i,r.generatedLine=c,a=_;a<v&&!this._charIsMappingSeparator(e,a);a++);if(t=e.slice(_,a),o=y[t])_+=t.length;else{for(o=[];_<a;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=g+o[2],g=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),C.push(r),"number"==typeof r.originalLine&&b.push(r)}f(C,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=s.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},r.BasicSourceMapConsumer=o,a.prototype=Object.create(t.prototype),a.prototype.constructor=t,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer.sources.indexOf(s.getArg(e,"source"))!==-1){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=t.consumer._sources.at(a.source);null!==t.consumer.sourceRoot&&(u=s.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=t.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(t.generatedOffset.generatedLine===a.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},r.IndexedSourceMapConsumer=a},{"./array-set":4,"./base64-vlq":5,"./binary-search":7,"./quick-sort":8,"./util":10}],10:[function(e,n,r){function t(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function o(e){var n=e.match(v);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function a(e){var n=e,t=o(e);if(t){if(!t.path)return e;n=t.path}for(var a,s=r.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return n=u.join("/"),""===n&&(n=s?"/":"."),t?(t.path=n,i(t)):n}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=o(n),t=o(e);if(t&&(e=t.path||"/"),r&&!r.scheme)return t&&(r.scheme=t.scheme),i(r);if(r||n.match(_))return n;if(t&&!t.host&&!t.path)return t.host=n,i(t);var s="/"===n.charAt(0)?n:a(e.replace(/\/+$/,"")+"/"+n);return t?(t.path=s,i(t)):s}function u(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function c(e){return e}function l(e){return p(e)?"$"+e:e}function f(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function g(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function h(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function m(e,n){return e===n?0:e>n?1:-1}function d(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=m(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:m(e.name,n.name)))))}r.getArg=t;var v=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;r.urlParse=o,r.urlGenerate=i,r.normalize=a,r.join=s,r.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(v)},r.relative=u;var y=function(){var e=Object.create(null);return!("__proto__"in e)}();r.toSetString=y?c:l,r.fromSetString=y?c:f,r.compareByOriginalPositions=g,r.compareByGeneratedPositionsDeflated=h,r.compareByGeneratedPositionsInflated=d},{}],11:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace-gps",["source-map","stackframe"],i):"object"==typeof t?r.exports=i(n("source-map/lib/source-map-consumer"),n("stackframe")):o.StackTraceGPS=i(o.SourceMap||o.sourceMap,o.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300||"file://"===e.substr(0,7)&&t.responseText?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r=[/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,/function\s+([^('"`]*?)\s*\(([^)]*)\)/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,/\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/],t=e.split("\n"),o="",i=Math.min(n,20),a=0;a<i;++a){var s=t[n-a-1],u=s.indexOf("//");if(u>=0&&(s=s.substr(0,u)),s){o=s+o;for(var c=r.length,l=0;l<c;l++){var f=r[l].exec(o);if(f&&f[1])return f[1]}}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){for(var n,r,t=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;r=t.exec(e);)n=r[1];if(n)return n;throw new Error("sourceMappingURL not found")}function c(e,r,t){return new Promise(function(o,i){var a=r.originalPositionFor({line:e.lineNumber,column:e.columnNumber});if(a.source){var s=r.sourceContentFor(a.source);s&&(t[a.source]=s),o(new n({functionName:a.name||e.functionName,args:e.args,fileName:a.source,lineNumber:a.line,columnNumber:a.column}))}else i(new Error("Could not get original source for given stackframe and source map"))})}return function l(f){return this instanceof l?(f=f||{},this.sourceCache=f.sourceCache||{},this.sourceMapConsumerCache=f.sourceMapConsumerCache||{},this.ajax=f.ajax||r,this._atob=f.atob||t,this._get=function(e){return new Promise(function(n,r){var t="data:"===e.substr(0,5);if(this.sourceCache[e])n(this.sourceCache[e]);else if(f.offline&&!t)r(new Error("Cannot make network requests in offline mode"));else if(t){var o=/^data:application\/json;([\w=:"-]+;)*base64,/,i=e.match(o);if(i){var a=i[0].length,s=e.substr(a),u=this._atob(s);this.sourceCache[e]=u,n(u)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(e,{method:"get"});this.sourceCache[e]=c,c.then(n,r)}}.bind(this))},this._getSourceMapConsumer=function(n,r){return new Promise(function(t,i){if(this.sourceMapConsumerCache[n])t(this.sourceMapConsumerCache[n]);else{var a=new Promise(function(t,i){return this._get(n).then(function(n){"string"==typeof n&&(n=o(n.replace(/^\)\]\}'/,""))),"undefined"==typeof n.sourceRoot&&(n.sourceRoot=r),t(new e.SourceMapConsumer(n))},i)}.bind(this));this.sourceMapConsumerCache[n]=a,t(a)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){s(e),this._get(e.fileName).then(function(t){var o=e.lineNumber,a=e.columnNumber,s=i(t,o,a);r(s?new n({functionName:s,args:e.args,fileName:e.fileName,lineNumber:o,columnNumber:a}):e)},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){a(),s(e);var t=this.sourceCache,o=e.fileName;this._get(o).then(function(r){var i=u(r),a="data:"===i.substr(0,5),s=o.substring(0,o.lastIndexOf("/")+1);return"/"===i[0]||a||/^https?:\/\/|^\/\//i.test(i)||(i=s+i),this._getSourceMapConsumer(i,s).then(function(r){return c(e,r,t).then(n)["catch"](function(){n(e)})})}.bind(this),r)["catch"](r)}.bind(this))})):new l(f)}})},{"source-map/lib/source-map-consumer":9,stackframe:3}],12:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],i):"object"==typeof t?r.exports=i(n("error-stack-parser"),n("stack-generator"),n("stacktrace-gps")):o.StackTrace=i(o.ErrorStackParser,o.StackGenerator,o.StackTraceGPS)}(this,function(e,n,r){function t(e,n){var r={};return[e,n].forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);return r}),r}function o(e){return e.stack||e["opera#sourceloc"]}function i(e,n){return"function"==typeof n?e.filter(n):e}var a={filter:function(e){return(e.functionName||"").indexOf("StackTrace$$")===-1&&(e.functionName||"").indexOf("ErrorStackParser$$")===-1&&(e.functionName||"").indexOf("StackTraceGPS$$")===-1&&(e.functionName||"").indexOf("StackGenerator$$")===-1},sourceCache:{}},s=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=s();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(r){r=t(a,r);var u=s(),c=o(u)?e.parse(u):n.backtrace(r);return i(c,r.filter)},fromError:function(n,o){o=t(a,o);var s=new r(o);return new Promise(function(r){var t=i(e.parse(n),o.filter);r(Promise.all(t.map(function(e){return new Promise(function(n){function r(){n(e)}s.pinpoint(e).then(n,r)["catch"](r)})})))}.bind(this))},generateArtificially:function(e){e=t(a,e);var r=n.backtrace(e);return"function"==typeof e.filter&&(r=r.filter(e.filter)),Promise.resolve(r)},instrument:function(e,n,r,t){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,r)["catch"](r),e.apply(t||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,r)["catch"](r),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,r,t){return new Promise(function(o,i){var a=new XMLHttpRequest;if(a.onerror=i,a.onreadystatechange=function(){4===a.readyState&&(a.status>=200&&a.status<400?o(a.responseText):i(new Error("POST to "+n+" failed with status: "+a.status)))},a.open("post",n),a.setRequestHeader("Content-Type","application/json"),t&&"object"==typeof t.headers){var s=t.headers;for(var u in s)s.hasOwnProperty(u)&&a.setRequestHeader(u,s[u])}var c={stack:e};void 0!==r&&null!==r&&(c.message=r),a.send(JSON.stringify(c))})}}})},{"error-stack-parser":1,"stack-generator":2,"stacktrace-gps":11}]},{},[12])(12)});


},{}],8:[function(require,module,exports){
class FileMap {
    constructor(){this.sidesList=[];}
    add(sides) {// {sideA:path, sideB:path}
        this.sidesList.push(sides);
    }
    convert(path, fromSide, toSide) {
        for (let sides of this.sidesList) {
            if (path.startsWith(sides[fromSide])) {
                return sides[toSide]+path.substring(sides[fromSide].length);
            }
        }
        return path;
    }
}
module.exports=FileMap;

},{}],9:[function(require,module,exports){
/*global Worker*/
// Browser Side
let idseq=0;
class Wrapper {
    constructor(worker) {
        const t=this;
        t.idseq=1;
        t.queue={};
        t.worker=worker;
        t.readyQueue=[];
        worker.addEventListener("message",function (e) {
            var d=e.data;
            if (d.reverse) {
                t.procReverse(e);
            } else if (d.ready) {
                t.ready();
            } else if (d.id) {
                t.queue[d.id](d);
                delete t.queue[d.id];
            }
        });
        t.run("WorkerService/isReady").then(function (r) {
            if (r) t.ready();
        });
    }
    procReverse(e) {
        const t=this;
        var d=e.data;
        var id=d.id;
        var path=d.path;
        var params=d.params;
        try {
            Promise.resolve(paths[path](params)).then(function (r) {
                t.worker.postMessage({
                    reverse:true,
                    status:"ok",
                    id:id,
                    result: r
                });
            },sendError);
        } catch(err) {
            sendError(err);
        }
        function sendError(e) {
            e=Object.assign({name:e.name, message:e.message, stack:e.stack},e||{});
            try {
                const j=JSON.stringify(e);
                e=JSON.parse(j);
            } catch(je) {
                e=e ? e.message || e+"" : "unknown";
                console.log("WorkerServiceW", je, e);
            }
            t.worker.postMessage({
                reverse: true,
                id:id, error:e, status:"error"
            });
        }
    }
    ready() {
        const t=this;
        if (t.isReady) return;
        t.isReady=true;
        console.log("Worker is ready!");
        t.readyQueue.forEach(function (f){ f();});
    }
    readyPromise() {
        const t=this;
        return new Promise(function (succ) {
            if (t.isReady) return succ();
            t.readyQueue.push(succ);
        });
    }
    run(path, params) {
        const t=this;
        return t.readyPromise().then(function() {
            return new Promise(function (succ,err) {
                var id=t.idseq++;
                t.queue[id]=function (e) {
                    //console.log("Status",e);
                    if (e.status=="ok") {
                        succ(e.result);
                    } else {
                        err(e.error);
                    }
                };
                t.worker.postMessage({
                    id: id,
                    path: path,
                    params: params
                });
            });
        });
    }
    terminate() {
        const t=this;
        t.worker.terminate();
    }
}
var paths={};
const WorkerService={
    Wrapper:Wrapper,
    load: function (src) {
        var w=new Worker(src);
        return new Wrapper(w);
    },
    install: function (path, func) {
        paths[path]=func;
    },
    serv: function (path,func) {
        this.install(path,func);
    }
};
WorkerService.serv("console/log", function (params){
    console.log.apply(console,params);
});
module.exports=WorkerService;

},{}],10:[function(require,module,exports){
/*global window,self,global*/
(function (deps, factory) {
    module.exports=factory();
})([],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

},{}],11:[function(require,module,exports){
/*define(function (require,exports,module) {
    const F=require("ProjectFactory");
    const root=require("root");
    const SourceFiles=require("SourceFiles");
    const langMod=require("langMod");
    */
    const F=require("./ProjectFactory");
    const root=require("../lib/root");
    const SourceFiles=require("../lang/SourceFiles");
    //const A=require("../lib/assert");
    const langMod=require("../lang/langMod");

    F.addType("compiled",params=> {
        if (params.namespace && params.url) return urlBased(params);
        if (params.dir) return dirBased(params);
        console.error("Invalid compiled project", params);
        throw new Error("Invalid compiled project");
    });
    function urlBased(params) {
        const ns=params.namespace;
        const url=params.url;
        const res=F.createCore();
        return res.include(langMod).include({
            getNamespace:function () {return ns;},
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes ns=",ns,"url=",url);
                await this.loadDependingClasses();
                const s=SourceFiles.add({url});
                await s.exec();
                console.log("Loaded compiled classes ns=",ns,"url=",url);
            },
        });
    }
    function dirBased(params) {
        const res=F.createDirBasedCore(params);
        return res.include(langMod).include({
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes params=",params);
                await this.loadDependingClasses();
                const outJS=this.getOutputFile();
                const map=outJS.sibling(outJS.name()+".map");
                const sf=SourceFiles.add({
                    text:outJS.text(),
                    sourceMap:map.exists() && map.text(),
                });
                await sf.exec();
                console.log("Loaded compiled classes params=",params);
            }
        });
    }
    exports.create=params=>F.create("compiled",params);
    F.addDependencyResolver((prj, spec)=> {
        if (spec.dir && prj.resolve) {
            return F.create("compiled",{dir:prj.resolve(spec.dir)});
        }
        if (spec.namespace && spec.url) {
            return F.create("compiled",spec);
        }
    });
//});/*--end of define--*/

},{"../lang/SourceFiles":3,"../lang/langMod":5,"../lib/root":10,"./ProjectFactory":12}],12:[function(require,module,exports){
//define(function (require,exports,module) {
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
    };
    class ProjectCore {
        getPublishedURL(){}//TODO
        getOptions(opt) {return {};}//stub
        getName() {
            return this.dir.name().replace(/\/$/,"");
        }
        getDependingProjects() {
            var opt=this.getOptions();
            var dp=(opt.compiler && opt.compiler.dependingProjects) || [];
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
                /*global FS*/ //TODO
                if (typeof FS!=="undefined") {
                    return FS.resolve(rdir, this.getDir().path());
                } else {
                    return this.getDir().rel(rdir);
                }
            }
            if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
            return rdir;
        },
        getOptions(opt) {
            return this.getOptionsFile().obj();
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
            var outF=this.resolve(opt.compiler.outputFile||"js/concat.js");
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
        }
    };
    exports.createDirBasedCore=function (params) {
        const res=this.createCore();
        res.dir=params.dir;
        return res.include(dirBasedMod);
    };
//});/*--end of define--*/

},{}]},{},[2])(2)
});

define('ProjectFactory',['require','exports','module','BuilderClient4Sys'],function (require,exports,module) {
    //--- stub
    const BuilderClient=require("BuilderClient4Sys");
    module.exports=BuilderClient.ProjectFactory;
});

define('BuilderClient',['require','exports','module','BuilderClient4Sys'],function (require,exports,module) {
    //--- stub
    const BuilderClient=require("BuilderClient4Sys");
    module.exports=BuilderClient;
});

/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
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

define('assert',["FS"],function (FS){return FS.assert;});

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

define('plugins',["WebSite","root"],function (WebSite,root){
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
        var reqj=root.requirejs;
        /*if (typeof requireSimulator==="undefined") {
            if (typeof requirejs==="function") reqj=requirejs;
        } else {
            if (requireSimulator.real) reqj=requireSimulator.real.requirejs;
        }*/
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

define('DeferredUtil',["FS"],function (FS){return FS.DeferredUtil;});

define('sysMod',["Tonyu", "FS", "ImageList",
        "Blob","thumbnail","WebSite","plugins",
        "DeferredUtil"],
        function (Tonyu, FS, ImageList,
                Blob,thumbnail,WebSite,plugins,
                DU) {
// (was TonyuProject)
return {
    /*stop:function () {
        var cur=this.runningThread; // Tonyu.getGlobal("$currentThreadGroup");
        if (cur) cur.kill();
        var main=this.runningObj;
        if (main && main.stop) return main.stop();
    },*/
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

define('CompiledProject',['require','exports','module','BuilderClient4Sys'],function (require,exports,module) {
    //--- stub
    const BuilderClient=require("BuilderClient4Sys");
    module.exports=BuilderClient.CompiledProject;
});

define('IDEProject',['require','exports','module','ProjectFactory','BuilderClient','root','sysMod','CompiledProject','WebSite'],function (require,exports,module) {
    const F=require("ProjectFactory");
    //const A=require("assert");
    const BuilderClient=require("BuilderClient");
    const root=require("root");
    const sysMod=require("sysMod");
    const CP=require("CompiledProject");
    const WebSite=require("WebSite");
    const langMod=BuilderClient.langMod;
    /*F.addDependencyResolver((prj,spec)=> {
        if (spec.namespace) {

        }
    });*/
    F.addType("IDE",params=>{
        const ide=params.ide;
        const res=F.createDirBasedCore(params);
        const ns2depspec= {
            kernel: {namespace:"kernel", url: WebSite.compiledKernel}
        };
        const c=new BuilderClient(res ,{
            worker: {ns2depspec, url: WORKER_URL}
        });
        F.addDependencyResolver((prj,spec)=>{
            if (ns2depspec[spec.namespace]) {
                return CP.create(ns2depspec[spec.namespace]);
            }
        });
        c.onCompiled=function (src) {
            console.log("Sending src",src);
            const rp=res.getIframeProject();
            if (rp) rp.exec(src).catch(e=>console.error(e));
        };
        let curDebugger;
        root.onTonyuDebuggerReady=d=>{
            d.on("runtimeError",e=>{
                console.log("runt",e.stack.map(s=>s+"").join("\n"));
                ide.showError(e);
            });
            curDebugger=d;
            c.setDebugger(d);
        };
        res.setDebugger=d=>c.setDebugger(d);
        res.compiler=c;
        res.getIframeProject=()=>{
            const ifrm=root.document.querySelector("iframe");
            if (ifrm) return ifrm.contentWindow.Project;
        };
        res.disconnectDebugger=()=>c.setDebugger();
        res.fullCompile=c.fullCompile.bind(c);
        res.partialCompile=c.partialCompile.bind(c);
        res.renameClassName=c.renameClassName.bind(c);
        res.include(sysMod).include(langMod);
        res.stop=()=>{
            try {
                if (curDebugger) curDebugger.stop();
            }catch(e) {
                //Edge: Can't execute code from a freed script
                console.error(e);
            }
        };
        /*res.getOutputFile=function () {
            // relative path in outputFile will fail old version
            var opt=this.getOptions();
            var o=opt.compiler.outputFile||"js/concat.js";
            var outF=this.resolve(opt.compiler.outputFile);
            return outF;
        };*/
        console.log("res.loadClasses", res.loadClasses) ;
        /*Object.assign(res,{
            async loadClasses() {
                await this.loadDependingClasses();

            }
        });*/
        return res;
    });
    exports.create=params=>F.create("IDE",params);

});

define('Shell',["FS","assert"],
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

define('ScriptTagFS',["Content"],function (Content) {
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
					var src=unescapeHTML(s.innerHTML);
	                if (w) {
	                    w=parseInt(w);
	                    res[fn]={lastUpdate:l, text:unwrap(src, w)};
	                } else {
	                    res[fn]={lastUpdate:l, text:src};
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
	function unescapeHTML(str) {
		var div = document.createElement("div");
		div.innerHTML = str.replace(/</g,"&lt;")
							 .replace(/>/g,"&gt;")
							 .replace(/ /g, "&#32;")
							 .replace(/\r/g, "&#13;")
							 .replace(/\n/g, "&#10;");
		return div.textContent || div.innerText;
	}
	return STF;
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
define('runtime',["ImageList","T2MediaLib","UIDiag"],
function (ImageList,T2MediaLib,UIDiag) {
    console.log("runtimes loaded",arguments);
    if (!window.T2MediaLib) window.T2MediaLib=T2MediaLib;
    return {ImageList,T2MediaLib,UIDiag};
});

define('runScript_common',[], function () {
    return {
        initCanvas: function (doResize) {
            function getMargin() {
                return 0;
            }

            var margin = getMargin();
            var w=$(window).width();
            var h=$(window).height();
            $("body").css({overflow:"hidden", margin:"0px"});
            var cv=$("<canvas>").attr({width: w-margin, height:h-margin, class:"tonyu-canvas"}).appendTo("body");

            var u = navigator.userAgent.toLowerCase();
            if (doResize==null) {
                doResize=(u.indexOf("iphone") == -1 &&
                    u.indexOf("ipad") == -1 &&
                    u.indexOf("ipod") == -1
                ) && (!window.parent || window === window.parent);
            }
            if (doResize) {
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

define('DebuggerCore',['require','exports','module'],function (require,exports,module) {
// module.exports:: DI_container -> Debugger
module.exports=function ({
    //-- Bundled in BuilderClient4Sys
    SourceFiles,
    ProjectFactory:F,
    CompiledProject:CP,
    langMod,
    StackDecoder,
    //--
    Tonyu,   root, FS,
}) {//------
if (root.Debugger) return root.Debugger;
const Events={
    handlers:{},
    getHandler(t) {
        this.handlers[t]=this.handlers[t]||[];
        return this.handlers[t];
    },
    fire(type,evt) {
        try {
            this.getHandler(type).forEach(f=>f(evt));
        } catch(e) {
            if (!evt || !evt.noCatch) Tonyu.onRuntimeError(e);
        }
    },
    on(type,...args) {
        const f=args.pop();
        this.getHandler(type).push(f);
    }
};
root.Debugger={
    ProjectFactory:F, FS,
    setErrorHandler: function () {
        Tonyu.onRuntimeError=async e=>{
            console.error(e);
            const stack=await StackDecoder.decode(e);
            const evt={error:e, message:e.message,stack,noCatch:true};
            Events.fire("runtimeError",evt);
        };
    },
    init: async function (prj,_Tonyu) {
        Tonyu=Tonyu||_Tonyu;
        this.setErrorHandler();
        Tonyu.globals.$currentProject=prj;
        Tonyu.currentProject=prj;
        Tonyu.globals.$debugger=root.Debugger;
        await prj.loadClasses();
        console.log("Loading classes COMPLETE",Tonyu.ID,Tonyu.classes);
    },
    exec: async function (srcraw) {
        await SourceFiles.add(srcraw).exec();
        Events.fire("classChanged");
    },
    create: function (className) {
        try {
            const klass=Tonyu.getClass(className);
            return new klass();
        }catch(e) {
            Tonyu.onRuntimeError(e);
            //console.error(e);
            //StackDecoder.decode(e);
        }
    },
    on:Events.on.bind(Events)
};
if (root.parent && root.parent.onTonyuDebuggerReady) {
    root.parent.onTonyuDebuggerReady(root.Debugger);
}
return root.Debugger;
};//--------
});//--- end of define
;
define('Debugger',['require','exports','module','DebuggerCore','BuilderClient4Sys','Tonyu','root','FS'],function (require,exports,module) {
const DebuggerCore=require("DebuggerCore");
const BuilderClient4Sys=require("BuilderClient4Sys");
const Tonyu=require("Tonyu");
const root=require("root");
const FS=require("FS");
Object.assign(BuilderClient4Sys,{
    Tonyu, root, FS
});
module.exports=DebuggerCore(BuilderClient4Sys);
});

define('SourceFiles',['require','exports','module','BuilderClient4Sys'],function (require,exports,module) {
    //--- stub
    const BuilderClient=require("BuilderClient4Sys");
    module.exports=BuilderClient.SourceFiles;
});

/*global requirejs*/
requirejs(["FS","Tonyu","IDEProject","Shell","ScriptTagFS",
			"runtime","WebSite","root","runScript_common",
			"Debugger","SourceFiles","sysMod"],
		function (FS,  Tonyu, IDEProject, sh, ScriptTagFS,
				rt,WebSite,root,com,
				Debugger,SourceFiles,sysMod) {
	$(function () {
		var home=FS.get(WebSite.tonyuHome);
		var ramHome=FS.get("/ram/");
		FS.mount(ramHome.path(), FS.LSFS.ramDisk() );
		Tonyu.defaultResource={
				images:[
						{name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
						{name:"$pat_sample", url: "images/Sample.png"},
						{name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
						],
						sounds:[]
		};
		root.SplashScreen={
			hide: function () {$("#splash").hide();},
			show:function(){},
			progress:function(t) {$("#splash .progress").text(t);}
		};

		var cv=com.initCanvas();


		var locs=location.href.replace(/\?.*/,"").split(/\//);
		var prjPath=locs.pop() || "runscript";
		var user=locs.pop() || "nobody";
		//if (prjloc.length<0) locs="runscript";
		var prjDir=ramHome;
		var actualFilesDir=home.rel(user+"/"+prjPath+"/");
		ramHome.rel("files/").link(actualFilesDir);
		//if (prjDir.exists()) sh.rm(prjDir,{r:1});
		var fo=ScriptTagFS.toObj();
		for (var fn in fo) {
			var f=prjDir.rel(fn);
			if (!f.isDir()) {
				var m=fo[fn];
				f.text(m.text);
				delete m.text;
				if (m.lastUpdate) f.metaInfo(m);
			}
		}
		sh.cd(prjDir);
		Tonyu.defaultOptions={
				compiler: { defaultSuperClass: "Actor"},
				run: {mainClass: "Main", bootClass: "Boot"},
				kernelEditable: false
		};
		const NOP=e=>e;
		const debuggerPrj=Debugger.ProjectFactory.create("compiled",{dir:prjDir});
		debuggerPrj.include(sysMod);
		debuggerPrj.initCanvas=function () {
			Tonyu.globals.$mainCanvas=cv;
		};
		Debugger.ProjectFactory.addDependencyResolver((prj,spec)=>{
			if (spec.namespace==="kernel" && !spec.url && WebSite.compiledKernel) {
				return Debugger.ProjectFactory.fromDependencySpec(prj, {
					url: WebSite.compiledKernel, namespace:spec.namespace
				});
			}
		});
		const ide={restart:NOP,stop:NOP,displayMode:NOP,jump:NOP};
		var idePrj=IDEProject.create({dir:prjDir,ide});//, kernelDir);
		Tonyu.animationFrame=()=>new Promise(requestAnimationFrame);// abolish

		start().then(NOP,e=>console.error(e));
		async function start() {
			//console.log("STA-TO");
			const r=await idePrj.fullCompile();// fullCompile exec compiled source when debugger is connected, but fails because kernel is not loaded yet
			idePrj.setDebugger(Debugger);
			//await SourceFiles.add(r).saveAs(idePrj.getOutputFile()); // does in fullCompile
			await Debugger.init(debuggerPrj, Tonyu);// does debuggerPrj.loadClaasses
			//console.log("RO-DO");
			Tonyu.globals.$debugger=Debugger;

			Tonyu.currentProject=Tonyu.globals.$currentProject=debuggerPrj;
			debuggerPrj.detectPlugins();
			var o=debuggerPrj.getOptions();
			if (o.compiler && o.compiler.diagnose) {
				o.compiler.diagnose=false;
				debuggerPrj.setOptions(o);
			}
			debuggerPrj.runScriptMode=true;// TODO
			Tonyu.runMode=true;//TODO
			console.log("RAWBoot");
			debuggerPrj.rawBoot(o.run.bootClass);
			prjDir.watch((type, file)=>{
				if (!file.endsWith(".tonyu")) return;
				console.log("modifai",type,file,arguments);
				idePrj.partialCompile(file).catch(e=>{
					console.error(e);
				});
			});
		}
	});
});

define("runScript", function(){});


			})((()=>{
				const b=new Blob(["!function(){return function t(e,n,r){function i(s,a){if(!n[s]){if(!e[s]){var u=\"function\"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error(\"Cannot find module '\"+s+\"'\");throw c.code=\"MODULE_NOT_FOUND\",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){return i(e[s][1][t]||t)},f,f.exports,t,e,n,r)}return n[s].exports}for(var o=\"function\"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}}()({1:[function(t,e,n){},{}],2:[function(t,e,n){t(\"../runtime/TonyuRuntime\");const r=t(\"../lang/Builder\"),i=t(\"../lib/root\"),o=(i.Worker,t(\"../lib/WorkerServiceW\")),s=t(\"../lib/FS\");i.FS=s;const a=t(\"../project/ProjectFactory\"),u=t(\"../project/CompiledProject\");t(\"../lang/langMod\");let c,f;const l={},p=s.get(\"/prj/\");function h(t){return t.isTError&&(t.src=t.src.path()),t}a.addDependencyResolver(function(t,e){if(console.log(\"RESOLV\",e,l),e.namespace&&l[e.namespace])return a.fromDependencySpec(t,l[e.namespace])}),o.serv(\"compiler/init\",t=>{Object.assign(l,t.ns2depspec||{});const e=t.files,n=p.rel((t.namespace||\"user\")+\"/\");return n.importFromObject(e),c=u.create({dir:n}),f=new r(c),{prjDir:n.path()}}),o.serv(\"compiler/addDependingProject\",t=>{const e=t.files,n=p.rel(t.namespace+\"/\");n.importFromObject(e);u.create({dir:n});return l[t.namespace]={dir:n.path()},{prjDir:n.path()}}),o.serv(\"compiler/fullCompile\",async t=>{try{return(await f.fullCompile({destinations:{memory:1}})).export()}catch(t){throw h(t)}}),o.serv(\"compiler/postChange\",async t=>{try{const e=t.files;let n;for(let t in e){n=t;break}const r=c.getDir().rel(n);return r.text(e[n]),(await f.postChange(r)).export()}catch(t){throw h(t)}}),o.serv(\"compiler/renameClassName\",async t=>{try{const e=await f.renameClassName(t.from,t.to),n={};for(let t of e)t.exists()?n[t.path()]=t.text():n[t.path()]=null;return n}catch(t){throw h(t)}}),o.ready()},{\"../lang/Builder\":3,\"../lang/langMod\":15,\"../lib/FS\":20,\"../lib/WorkerServiceW\":21,\"../lib/root\":23,\"../project/CompiledProject\":24,\"../project/ProjectFactory\":25,\"../runtime/TonyuRuntime\":27}],3:[function(t,e,n){const r=t(\"../runtime/TonyuRuntime\"),i=t(\"./JSGenerator\"),o=t(\"./Semantics\"),s=(t(\"../lib/FS\"),t(\"../lib/assert\"),t(\"./source-map\"),t(\"./TypeChecker\"),t(\"../runtime/TError\")),a=t(\"./IndentBuffer\"),u=t(\"./SourceFiles\");function c(t){var e={},n=[],i=0;for(var o in t)e[o]=!1,i++;for(;n.length<i;){var a=n.length;for(let r in t)if(!e[r]){var u=t[r];0==f(u).length&&(n.push(u),e[r]=!0)}if(n.length==a){var c=[];for(let n in t)if(!e[n]){c=l(t[n])||[];break}throw s(\"次のクラス間に循環参照があります: \"+c.join(\"->\"),\"不明\",0)}}function f(n){let i=r.klass.getDependingClasses(n);return i=i.filter(function(n){return n&&t[n.fullName]&&!n.builtin&&!e[n.fullName]})}function l(t){var e=[],n={};!function t(r){var i;!function(t){if(e.push(t.fullName),n[t.fullName])throw s(\"次のクラス間に循環参照があります: \"+e.join(\"->\"),\"不明\",0);n[t.fullName]=!0}(r),f(r).forEach(t),i=e.pop(),delete n[i]}(t)}return n}e.exports=class{constructor(t){this.prj=t}getOptions(){return this.prj.getOptions()}getOutputFile(...t){return this.prj.getOutputFile(...t)}getNamespace(){return this.prj.getNamespace()}getDir(){return this.prj.getDir()}getEXT(){return this.prj.getEXT()}sourceFiles(){return this.prj.sourceFiles()}loadDependingClasses(){return this.prj.loadDependingClasses()}getEnv(){return this.env=this.env||{},this.env.options=this.env.options||this.getOptions(),this.env}requestRebuild(){var t=this.getEnv();for(let e of this.getMyClasses())delete t.classes[e]}getMyClasses(){var t=this.getEnv(),e=this.getNamespace();const n=[];for(var r in t.classes){var i=t.classes[r];i.namespace==e&&n.push(i)}return n}initCtx(t){var e=this.getEnv();return t||(t={}),t.visited||(t={visited:{},classes:e.classes=e.classes||r.classMetas,options:t}),t}fileToClass(t){const e=t.truncExt(this.getEXT()),n=this.getEnv(),r=n.aliases[e];if(!r)return null;return n.classes[r]}postChange(t){const e=this.fileToClass(t);if(e)return console.log(\"Ex\",e),this.partialCompile(this.reverseDependingClasses(e));{const e=this.addMetaFromFile(t),n={};return n[e.fullName]=e,this.partialCompile(n)}}reverseDependingClasses(t){const e={};let n;e[t.fullName]=t;do{n=!1;for(let t of this.getMyClasses()){if(e[t.fullName])break;for(let i of r.klass.getDependingClasses(t))if(e[i.fullName]){e[t.fullName]=t,n=!0;break}}}while(n);return console.log(\"revdep\",e),e}addMetaFromFile(t){const e=this.getEnv(),n=t.truncExt(this.getEXT()),i=this.getNamespace(),o=i+\".\"+n;var s=r.klass.getMeta(o);return r.extend(s,{fullName:o,shortName:n,namespace:i}),s.src=s.src||{},s.src.tonyu=t,e.aliases[n]=o,s}fullCompile(t){const e=this.getDir();t=this.initCtx(t),r=t.options||{},this.showProgress(\"Compile: \"+e.name()),console.log(\"Compile: \"+e.path());var n,r,i,o,s,a,u=this.getNamespace();return r.destinations=r.destinations||{memory:!0,file:!0},this.loadDependingClasses(t).then(()=>{for(var e in n=t.classes,(i=this.getEnv()).aliases={},i.classes=n,n){var r=n[e];i.aliases[r.shortName]=r.fullName}return this.showProgress(\"scan sources\")}).then(()=>{for(var t in o={},s=this.sourceFiles(u),console.log(\"Sourcefiles\",s),s){var e=s[t];const r=this.addMetaFromFile(e);o[r.fullName]=n[r.fullName]=r}return this.showProgress(\"update check\")}).then(()=>(a=o,console.log(\"compilingClasses\",a),this.partialCompile(a,r)))}partialCompile(t,e){let n,r,i=this.getEnv();const s=(e=e||{}).destinations||{memory:!0};return Promise.resolve().then(()=>{for(var e in t)console.log(\"initClassDecl: \"+e),o.initClassDecls(t[e],i);return this.showProgress(\"order\")}).then(()=>(n=c(t),console.log(\"ORD\",n.map(t=>t.fullName)),n.forEach(e=>{t[e.fullName]&&(console.log(\"annotate :\"+e.fullName),o.annotate(e,i))}),this.showProgress(\"genJS\"))).then(()=>((r=a({fixLazyLength:6})).traceIndex={},this.genJS(n,{codeBuffer:r,traceIndex:r.traceIndex}))).then(()=>{const t=u.add(r.close(),r.srcmap,r.traceIndex);let e=Promise.resolve();if(s.file){const n=this.getOutputFile();e=t.saveAs(n)}return s.memory&&(e=e.then(e=>t)),e})}genJS(t,e){var n=this.getEnv();for(let r of t)i.genJS(r,n,e);return Promise.resolve()}showProgress(t){console.log(\"Progress:\",t)}setAMDPaths(t){this.getEnv().amdPaths=t}renameClassName(t,e){return this.fullCompile().then(()=>{const n=[];let r;var i=this.getEnv().classes;for(var o in i){var s=i[o],a=s.src?s.src.tonyu:null,u=s.annotation,c=[];if(u&&a&&a.exists()){if(s.node){if(s.node.ext){const e=s.node.ext.superclassName;console.log(\"SPCl\",e),e.text===t&&c.push({pos:e.pos,len:e.len})}if(s.node.incl){const e=s.node.incl.includeClassNames;console.log(\"incl\",e);for(let n of e)n.text===t&&c.push({pos:n.pos,len:n.len})}}for(var f in a.truncExt(\".tonyu\")===t&&(r=a),console.log(\"Check\",o),u)try{var l=u[f],p=l.scopeInfo;if(p&&\"class\"==p.type&&p.name==t){var h=l.node.pos,d=l.node.len;a.text().substring(h,h+d)==t&&(c.push({pos:h,len:d}),console.log(a.path(),h,d,a.text().substring(h-5,h+d+5),\"->\",e))}}catch(t){console.log(t)}c=c.sort(function(t,e){return e.pos-t.pos}),console.log(a.path(),c);var m=a.text(),g=m;for(let t of c)m=m.substring(0,t.pos)+e+m.substring(t.pos+t.len);g==m||a.isReadOnly()||(console.log(\"Refact:\",a.path(),m),a.text(m),n.push(a))}else console.log(\"No Check\",o)}if(r){const t=r.sibling(e+\".tonyu\");r.moveTo(t),n.push(r),n.push(t)}return n})}}},{\"../lib/FS\":20,\"../lib/assert\":22,\"../runtime/TError\":26,\"../runtime/TonyuRuntime\":27,\"./IndentBuffer\":6,\"./JSGenerator\":7,\"./Semantics\":9,\"./SourceFiles\":10,\"./TypeChecker\":11,\"./source-map\":18}],4:[function(t,e,n){e.exports=function(){const e=t(\"./parser\");var n={};function r(t){var e={},n=t;return e.add=function(t){n=n?n.or(t):t},e.get=function(){return n},e}function i(){var t=r(),n={reg:function(n,r,i){var o=function(t,e){var n={eq:function(n){return t==n.type()&&e==n.prio()},type:function(e){return e?e==t:t},prio:function(){return e},toString:function(){return\"[\"+t+\":\"+e+\"]\"}};return n}(n,r);t.add(i.ret(e.create(function(t){return t.opType=o,t})).setName(\"(opType \"+o+\" \"+i.name+\")\"))},get:function(){return t.get()},parse:function(t){return n.get().parse(t)}};return n}var o=i(),s=i(),a=r(),u=[];return n.element=function(t){o.reg(\"element\",-1,t),a.add(t)},n.getElement=function(){return a.get()},n.prefix=function(t,e){o.reg(\"prefix\",t,e)},n.postfix=function(t,e){s.reg(\"postfix\",t,e)},n.infixl=function(t,e){s.reg(\"infixl\",t,e)},n.infixr=function(t,e){s.reg(\"infixr\",t,e)},n.infix=function(t,e){s.reg(\"infix\",t,e)},n.trifixr=function(t,e,n){s.reg(\"trifixr\",t,e),u[t]=n},n.custom=function(t,e){},n.mkInfix=function(t){n.mkInfix.def=t},n.mkInfix.def=function(t,n,r){return e.setRange({type:\"infix\",op:n,left:t,right:r})},n.mkInfixl=function(t){n.mkInfixl.def=t},n.mkInfixl.def=function(t,n,r){return e.setRange({type:\"infixl\",op:n,left:t,right:r})},n.mkInfixr=function(t){n.mkInfixr.def=t},n.mkInfixr.def=function(t,n,r){return e.setRange({type:\"infixr\",op:n,left:t,right:r})},n.mkPrefix=function(t){n.mkPrefix.def=t},n.mkPrefix.def=function(t,n){return e.setRange({type:\"prefix\",op:t,right:n})},n.mkPostfix=function(t){n.mkPostfix.def=t},n.mkPostfix.def=function(t,n){return e.setRange({type:\"postfix\",left:t,op:n})},n.mkTrifixr=function(t){n.mkTrifixr.def=t},n.mkTrifixr.def=function(t,n,r,i,o){return e.setRange({type:\"trifixr\",left:t,op1:n,mid:r,op2:i,right:o})},n.build=function(){return n.built=e.create(function(t){return function t(e,r){var i,a=r;r=o.parse(r);if(!r.isSuccess())return r;i=r.opType;if(i.type(\"prefix\")){var c=r.result[0];if(!(r=t(i.prio(),r)).isSuccess())return r;var f=n.mkPrefix.def(c,r.result[0]);if((a=r.clone()).result=[f],!r.nextPostfixOrInfix)return a;r=r.nextPostfixOrInfix}else if(a=r.clone(),!(r=s.parse(r)).isSuccess())return a;for(;;){if((i=r.opType).prio()<e)return a.nextPostfixOrInfix=r,a;if(i.type(\"postfix\")){const t=n.mkPostfix.def(a.result[0],r.result[0]);if((a=r.clone()).result=[t],!(r=s.parse(r)).isSuccess())return a}else if(i.type(\"infixl\")){var l=r.result[0];if(!(r=t(i.prio()+1,r)).isSuccess())return a;const e=n.mkInfixl.def(a.result[0],l,r.result[0]);if((a=r.clone()).result=[e],!r.nextPostfixOrInfix)return a;r=r.nextPostfixOrInfix}else if(i.type(\"infixr\")){const e=r.result[0];if(!(r=t(i.prio(),r)).isSuccess())return a;const o=n.mkInfixr.def(a.result[0],e,r.result[0]);if((a=r.clone()).result=[o],!r.nextPostfixOrInfix)return a;r=r.nextPostfixOrInfix}else if(i.type(\"trifixr\")){var p=a.result[0],h=r.result[0];if(!(r=t(i.prio()+1,r)).isSuccess())return a;var d=r.result[0];if(!(r=u[i.prio()].parse(r)).isSuccess())return a;var m=r.result[0];if(!(r=t(i.prio(),r)).isSuccess())return a;var g=r.result[0];const e=n.mkTrifixr.def(p,h,d,m,g);if((a=r.clone()).result=[e],!r.nextPostfixOrInfix)return a;r=r.nextPostfixOrInfix}else{const e=r.result[0];if(!(r=t(i.prio()+1,r)).isSuccess())return a;const o=n.mkInfix.def(a.result[0],e,r.result[0]);if((a=r.clone()).result=[o],!r.nextPostfixOrInfix)return a;if(r=r.nextPostfixOrInfix,i.prio()==r.opType.prio())return a.success=!1,a}}}(0,t)}).setName(\"ExpBuilt\"),n.built},n.lazy=function(){return e.create(function(t){return n.built.parse(t)})},n}},{\"./parser\":17}],5:[function(t,e,n){const r=function(){const e=t(\"./parser\");var n=e,i=null;function o(t){return\"string\"==typeof t?i.get(t):t}return(i=function(t){var n={ands:function(){for(var n=o(arguments[0]),s=1;s<arguments.length;s++)n=n.and(o(arguments[s]));n=n.tap(t),i.defs[t]=n;var a={autoNode:function(){var r=n.ret(function(){for(var n={type:t},r=0;r<arguments.length;r++){var i=arguments[r],o=e.setRange(i);e.addRange(n,o),n[\"-element\"+r]=i}n.toString=function(){return\"(\"+this.type+\")\"}}).setName(t);return i.defs[t]=r,r},ret:function(o){if(0==arguments.length)return n;if(\"function\"==typeof o)return i.defs[t]=n.ret(o),i.defs[t];for(var s=[],a=function(t){return t},u=0;u<arguments.length;u++){if(\"function\"==typeof arguments[u]){a=arguments[u];break}s[u]=arguments[u]}var c=n.ret(function(){var n={type:t};n[r.SUBELEMENTS]=[];for(var i=0;i<arguments.length;i++){var o=arguments[i],u=e.setRange(o);e.addRange(n,u),s[i]&&(n[s[i]]=o),n[r.SUBELEMENTS].push(o)}return n.toString=function(){return\"(\"+this.type+\")\"},a(n)}).setName(t);return i.defs[t]=c,c}};return a},ors:function(){for(var e=o(arguments[0]),n=1;n<arguments.length;n++)e=e.or(o(arguments[n]));return i.defs[t]=e.setName(t),i.defs[t]}};return n}).defs={},i.get=function(t){return i.defs[t]?i.defs[t]:n.lazy(function(){var e=i.defs[t];if(!e)throw\"grammar named '\"+t+\"' is undefined\";return e}).setName(\"(Lazy of \"+t+\")\")},i};r.SUBELEMENTS=Symbol(\"[SUBELEMENTS]\"),e.exports=r},{\"./parser\":17}],6:[function(t,e,n){const r=t(\"../lib/assert\"),i=t(\"./source-map\");e.exports=function(t){t=t||{};var e=function(){var t=arguments,n=t[0],r=0;function i(e){var i=t[++r];if(null==i&&!e)throw console.log(t),new Error(r+\"th null param: fmt=\"+n);return i}for(;;){var o=n.indexOf(\"%\");if(o<0){e.print(n);break}e.print(n.substring(0,o)),o++;var s=n.charAt(o);if(\"s\"==s){var a=i();\"string\"==typeof a||\"number\"==typeof a||(null==a?a=\"null\":a.text&&(e.addMapping(a),a=a.text)),e.print(a),o++}else if(\"d\"==s){var u=i();if(\"number\"!=typeof u)throw new Error(u+\" is not a number: fmt=\"+n);e.print(u),o++}else if(\"n\"==s)e.ln(),o++;else if(\"{\"==s)e.indent(),o++;else if(\"}\"==s)e.dedent(),o++;else if(\"%\"==s)e.print(\"%\"),o++;else if(\"f\"==s)i()(e),o++;else if(\"l\"==s){var c=i();e.print(e.toLiteral(c)),o++}else if(\"v\"==s){var f=i();if(!f)throw new Error(\"Null %v\");if(\"object\"!=typeof f)throw new Error(\"nonobject %v:\"+f);e.addMapping(f),e.visitor.visit(f),o++}else if(\"z\"==s){var l=i();if(\"val\"in l)return void e.print(l.val);l.inited||e.lazy(l),l.print(),o++}else if(\"j\"==s){var p=i(),h=p[0],d=p[1],m=!1;if(!d||!d.forEach)throw console.log(d),new Error(d+\" is not array. cannot join fmt:\"+n);for(let t of d)m&&e.printf(h),m=!0,e.visitor.visit(t);o++}else\"D\"==s?(i(!0),o++):o+=2;n=n.substring(o)}};return e.addTraceIndex=function(t){this.traceIndex||(this.traceIndex={}),this.traceIndex[t]=1},e.addMapping=function(t){var n;e.srcFile&&(\"number\"==typeof t.row&&\"number\"==typeof t.col?n={row:t.row,col:t.col}:\"number\"==typeof t.pos&&(n=e.srcRCM.getRC(t.pos)),n&&e.srcmap.addMapping({generated:{line:e.bufRow,column:e.bufCol},source:e.srcFile+\"\",original:{line:n.row,column:n.col}}))},e.setSrcFile=function(t){e.srcFile=t,e.srcRCM=function(t){var e={},n=[],r=0,i=0;return t.split(\"\\n\").forEach(function(t){n.push(r),r+=t.length+1}),n.push(r),e.getRC=function(t){for(;;){if(i<0)return{row:1,col:1};if(i+1>=n.length)return{row:n.length,col:1};if(t<n[i])i--;else{if(!(n[i+1]<=t))return{row:i+1,col:t-n[i]+1};i++}}},e}(t.text()),e.srcmap.setSourceContent(t.path(),t.text())},e.print=function(t){e.buf+=t;var n=(t+\"\").split(\"\\n\");n.forEach(function(t,r){r<n.length-1?(e.bufCol+=t.length+1,e.bufRow++,e.bufCol=1):e.bufCol+=t.length})},e.dstFile=t.dstFile,e.mapFile=t.mapFile,e.printf=e,e.buf=\"\",e.bufRow=1,e.bufCol=1,e.srcmap=new i.SourceMapGenerator,e.lazy=function(n){return n||(n={}),t.fixLazyLength?(n.length=n.length||t.fixLazyLength,n.pad=n.pad||\" \",n.gen=function(){for(var t=\"\",e=0;e<n.length;e++)t+=n.pad;return t}(),n.puts=[],e.useLengthPlace=!0):(n.gen=(\"GENERETID\"+Math.random()+\"DITERENEG\").replace(/\\W/g,\"\"),n.reg=new RegExp(n.gen,\"g\"),r(!e.useLengthPlace,\"GENERETID cannot be used\")),n.inited=!0,n.put=function(t){if(this.val=t+\"\",this.puts){for(this.val.length>this.length&&(e.lazyOverflow=!0);this.val.length<this.length;)this.val+=this.pad;var n=this;this.puts.forEach(function(t){var i=e.buf.length;e.buf=e.buf.substring(0,t)+n.val+e.buf.substring(t+n.length),r.eq(i,e.buf.length)})}return this.reg&&(e.buf=e.buf.replace(this.reg,t)),this.val},n.print=function(){this.puts&&this.puts.push(e.buf.length),e.print(this.gen)},n},e.ln=function(){e.print(\"\\n\"+e.indentBuf)},e.indent=function(){e.indentBuf+=e.indentStr,e.print(\"\\n\"+e.indentBuf)},e.dedent=function(){var t=e.indentStr.length;if(!e.buf.substring(e.buf.length-t).match(/^\\s*$/))throw console.log(e.buf),new Error(\"Non-space truncated \");e.buf=e.buf.substring(0,e.buf.length-t),e.indentBuf=e.indentBuf.substring(0,e.indentBuf.length-t)},e.toLiteral=function(t,e){if(e||(e=\"'\"),\"string\"!=typeof t)throw console.log(\"no literal \",t),new Error(\"toLiteral:\"+t+\" is not a literal\");return t=(t=(t=t.replace(/\\\\/g,\"\\\\\\\\\")).replace(/\\r/g,\"\\\\r\")).replace(/\\n/g,\"\\\\n\"),e+(t=\"'\"==e?t.replace(/'/g,\"\\\\'\"):t.replace(/\"/g,'\\\\\"'))+e},e.indentBuf=\"\",e.indentStr=\"  \",e.close=function(){return e.mapStr=e.srcmap.toString(),e.mapFile&&e.dstFile&&(e.mapFile.text(e.mapStr),e.printf(\"%n//# sourceMappingURL=%s%n\",e.mapFile.relPath(e.dstFile.up()))),e.dstFile&&e.dstFile.text(e.buf),e.buf},e}},{\"../lib/assert\":22,\"./source-map\":18}],7:[function(t,e,n){t(\"../runtime/TonyuRuntime\");const r=t(\"./IndentBuffer\"),i=t(\"./ObjectMatcher\"),o=t(\"../runtime/TError\"),s=t(\"./context\"),a=t(\"./Visitor\"),u=t(\"./compiler\"),c=t(\"../lib/assert\");e.exports=u.JSGenerator=function(){var t=\"_thread\",e=\"_this\",n=\"_arguments\",f=\"fiber$\",l=\"__pc\",p=\"__cnt\",h=100,d=\"Tonyu.bindFunc\",m=\"Tonyu.invokeMethod\",g=\"Tonyu.callFunc\",v=\"Tonyu.checkNonNull\",y=\"Tonyu.classes.\",b=\"Tonyu.globals.\",x=\"this\",w='\"use strict\";%n',S=\"Tonyu.iterator\",E=\"__superClass\",_=u.ScopeTypes,C=u.getScopeType,T=u.annotation;u.getMethod,u.getDependingClasses,u.getParams;return{genJS:function(A,F,D){var L=A.src.tonyu,R=L.text();function k(t){return u.getSource(R,t)}var P=(D=D||{}).codeBuffer||F.codeBuffer||r({fixLazyLength:6}),O=D.traceIndex||{};P.setSrcFile(L);var M=P.printf,N=s(),B=!1,j=i,I=A.decls,U=(I.fields,I.methods),W=(I.natives,_),z=0,G=F.options.compiler.diagnose,q=F.options.compiler.genAMD,J=!F.options.compiler.noLoopCheck;function V(t,e){return T(A.annotation,t,e)}function $(t){return\"string\"==typeof t?y+(F.aliases[t]||t):t.builtin?t.fullName:y+t.fullName}function H(t,e){return function(n){N.enter(t,function(){K.visit(e)})}}function Q(n,r,i){var o=C(r);if(o==W.THVAR)P.printf(\"%s\",t);else if(o==W.FIELD||o==W.PROP)P.printf(\"%s.%s\",e,n);else if(o==W.METHOD)i&&i.noBind?P.printf(\"%s.%s\",e,n):P.printf(\"%s(%s,%s.%s)\",d,e,e,n);else if(o==W.CLASS)P.printf(\"%s\",$(n));else if(o==W.GLOBAL)P.printf(\"%s%s\",b,n);else{if(o!=W.PARAM&&o!=W.LOCAL&&o!=W.NATIVE&&o!=W.MODULE)throw console.log(\"Unknown scope type: \",o),new Error(\"Unknown scope type: \"+o);P.printf(\"%s\",n)}return r}function Z(t){return function(){(function(t){\"compound\"==t.type?N.enter({noWait:!0},function(){P.printf(\"%j%n\",[\"%n\",t.stmts])}):K.visit(t)}).apply(this,[t])}}var X={type:\"THNode\"};const K=P.visitor=a({THNode:function(e){P.printf(t)},dummy:function(t){P.printf(\"\",t)},literal:function(t){P.printf(\"%s\",t.text)},paramDecl:function(t){P.printf(\"%v\",t.name)},paramDecls:function(t){P.printf(\"(%j)\",[\", \",t.params])},funcDeclHead:function(t){P.printf(\"function %v %v\",t.name,t.params)},funcDecl:function(t){},return:function(n){if(N.inTry)throw o(\"現実装では、tryの中にreturnは書けません\",L,n.pos);if(N.noWait)N.threadAvail?n.value?P.printf(\"%s.retVal=%v;return;%n\",t,n.value):P.printf(\"%s.retVal=%s;return;%n\",t,e):n.value?P.printf(\"return %v;\",n.value):P.printf(\"return %s;\",e);else if(n.value){var r=V(n.value).fiberCall;r?P.printf(\"%s.%s%s(%j);%n%s=%s;return;%n%}case %d:%{%s.exit(%s.retVal);return;%n\",e,f,r.N,[\", \",[X].concat(r.A)],l,N.pc,N.pc++,t,t):P.printf(\"%s.exit(%v);return;\",t,n.value)}else P.printf(\"%s.exit(%s);return;\",t,e)},number:function(t){P.printf(\"%s\",t.value)},reservedConst:function(r){\"this\"==r.text?P.printf(\"%s\",e):\"arguments\"==r.text&&N.threadAvail?P.printf(\"%s\",n):r.text==t?P.printf(\"%s\",N.threadAvail?t:\"null\"):P.printf(\"%s\",r.text)},varDecl:function(n){var r=V(n).varInMain?e+\".\":\"\";if(n.value){var i=!N.noWait&&V(n).fiberCall;i?(c.is(N.pc,Number),P.printf(\"%s.%s%s(%j);%n%s=%s;return;%n%}case %d:%{%s%v=%s.retVal;%n\",e,f,i.N,[\", \",[X].concat(i.A)],l,N.pc,N.pc++,r,n.name,t)):P.printf(\"%s%v = %v;%n\",r,n.name,n.value)}},varsDecl:function(t){var e=t.decls.filter(function(t){return t.value});e.length>0&&e.forEach(function(t){P.printf(\"%v\",t)})},jsonElem:function(t){t.value?P.printf(\"%v: %v\",t.key,t.value):P.printf(\"%v: %f\",t.key,function(){Q(t.key.text,V(t).scopeInfo,V(t))})},objlit:function(t){P.printf(\"{%j}\",[\",\",t.elems])},arylit:function(t){P.printf(\"[%j]\",[\",\",t.elems])},funcExpr:function(t){!function(t){var e=V(t).info;P.printf(\"(function %s(%j) {%{%f%n%f%}})\",e.name,[\",\",e.params],et(e),function(){N.enter({noWait:!0,threadAvail:!1,finfo:e},function(){t.body.stmts.forEach(function(t){M(\"%v%n\",t)})})})}(t)},parenExpr:function(t){P.printf(\"(%v)\",t.expr)},varAccess:function(t){Q(t.name.text,V(t).scopeInfo,V(t))},exprstmt:function(n){var r={};if(N.noWait||(r=V(n).fiberCall||{}),\"noRet\"==r.type)P.printf(\"%s.%s%s(%j);%n%s=%s;return;%n%}case %d:%{\",e,f,r.N,[\", \",[X].concat(r.A)],l,N.pc,N.pc++);else if(\"ret\"==r.type)P.printf(\"%s.%s%s(%j);%n%s=%s;return;%n%}case %d:%{%v%v%s.retVal;%n\",e,f,r.N,[\", \",[X].concat(r.A)],l,N.pc,N.pc++,r.L,r.O,t);else if(\"noRetSuper\"==r.type){const t=E;P.printf(\"%s.prototype.%s%s.apply( %s, [%j]);%n%s=%s;return;%n%}case %d:%{\",t,f,r.S.name.text,e,[\", \",[X].concat(r.A)],l,N.pc,N.pc++)}else if(\"retSuper\"==r.type){const n=E;P.printf(\"%s.prototype.%s%s.apply( %s, [%j]);%n%s=%s;return;%n%}case %d:%{%v%v%s.retVal;%n\",n,f,r.S.name.text,e,[\", \",[X].concat(r.A)],l,N.pc,N.pc++,r.L,r.O,t)}else P.printf(\"%v;\",n.expr)},infix:function(t){var e=t.op.text;if(G){if(\"+\"==e||\"-\"==e||\"*\"==e||\"/\"==e||\"%\"==e)return void P.printf(\"%s(%v,%l)%v%s(%v,%l)\",v,t.left,k(t.left),t.op,v,t.right,k(t.right));if(\"+=\"==e||\"-=\"==e||\"*=\"==e||\"/=\"==e||\"%=\"==e)return void P.printf(\"%v%v%s(%v,%l)\",t.left,t.op,v,t.right,k(t.right))}\"is\"===t.op.type?P.printf(\"Tonyu.is(%v,%v)\",t.left,t.right):P.printf(\"%v%v%v\",t.left,t.op,t.right)},trifixr:function(t){P.printf(\"%v%v%v%v%v\",t.left,t.op1,t.mid,t.op2,t.right)},prefix:function(t){if(\"__typeof\"!==t.op.text)P.printf(\"%v %v\",t.op,t.right);else{var e=V(t.right);e.vtype?P.printf(\"%l\",e.vtype.name||e.vtype.fullName||\"No type name?\"):P.printf(\"%l\",\"Any\")}},postfix:function(t){var n=V(t);if(G){if(n.myMethodCall){const o=n.myMethodCall;var r=o.scopeInfo,i=C(r);return void(i==W.FIELD||i==W.PROP||i==W.METHOD?P.printf(\"%s(%s, %l, [%j], %l )\",m,e,o.name,[\",\",o.args],\"this\"):P.printf(\"%s(%v, [%j], %l)\",g,t.left,[\",\",o.args],k(t.left)))}if(n.othersMethodCall){var o=n.othersMethodCall;return void P.printf(\"%s(%v, %l, [%j], %l )\",m,o.target,o.name,[\",\",o.args],k(o.target))}if(n.memberAccess){var s=n.memberAccess;return void P.printf(\"%s(%v,%l).%s\",v,s.target,k(s.target),s.name)}}else if(n.myMethodCall){const t=n.myMethodCall,r=t.scopeInfo;if(C(r)==W.METHOD)return void P.printf(\"%s.%s(%j)\",e,t.name,[\",\",t.args])}P.printf(\"%v%v\",t.left,t.op)},break:function(t){if(N.noWait)P.printf(\"break;%n\");else{if(N.inTry&&N.exitTryOnJump)throw o(\"現実装では、tryの中にbreak;は書けません\",L,t.pos);if(!N.closestBrk)throw o(\"break； は繰り返しの中で使います\",L,t.pos);P.printf(\"%s=%z; break;%n\",l,N.closestBrk)}},continue:function(t){if(N.noWait)P.printf(\"continue;%n\");else{if(N.inTry&&N.exitTryOnJump)throw o(\"現実装では、tryの中にcontinue;は書けません\",L,t.pos);if(\"number\"==typeof N.closestCnt)P.printf(\"%s=%s; break;%n\",l,N.closestCnt);else{if(!N.closestCnt)throw o(\"continue； は繰り返しの中で使います\",L,t.pos);P.printf(\"%s=%z; break;%n\",l,N.closestCnt)}}},try:function(e){var n=V(e);if(!N.noWait&&(n.fiberCallRequired||n.hasJump||n.hasReturn)){if(1!=e.catches.length||\"catch\"!=e.catches[0].type)throw o(\"現実装では、catch節1個のみをサポートしています\",L,e.pos);var r=e.catches[0],i={},s={};P.printf(\"%s.enterTry(%z);%n\",t,i),P.printf(\"%f\",H({inTry:!0,exitTryOnJump:!0},e.stmt)),P.printf(\"%s.exitTry();%n\",t),P.printf(\"%s=%z;break;%n\",l,s),P.printf(\"%}case %f:%{\",function(){P.print(i.put(N.pc++))}),P.printf(\"%s=%s.startCatch();%n\",r.name.text,t),P.printf(\"%v%n\",r.stmt),P.printf(\"%}case %f:%{\",function(){P.print(s.put(N.pc++))})}else N.enter({noWait:!0},function(){P.printf(\"try {%{%f%n%}} \",Z(e.stmt)),e.catches.forEach(K.visit)})},catch:function(t){P.printf(\"catch (%s) {%{%f%n%}}\",t.name.text,Z(t.stmt))},throw:function(t){P.printf(\"throw %v;%n\",t.ex)},switch:function(t){if(N.noWait)P.printf(\"switch (%v) {%{%j\"+(t.defs?\"%n%v\":\"%D\")+\"%n%}}\",t.value,[\"%n\",t.cases],t.defs);else{var e=t.cases.map(function(t){return P.lazy()});t.defs&&e.push(P.lazy());var n=P.lazy();P.printf(\"switch (%v) {%{%f%n%}}%nbreak;%n\",t.value,function(){var r=0;t.cases.forEach(function(t){P.printf(\"%}case %v:%{%s=%z;break;%n\",t.value,l,e[r]),r++}),t.defs?P.printf(\"%}default:%{%s=%z;break;%n\",l,e[r]):P.printf(\"%}default:%{%s=%z;break;%n\",l,n)}),N.enter({closestBrk:n},function(){var r=0;t.cases.forEach(function(t){P.printf(\"%}case %f:%{%j%n\",function(){P.print(e[r].put(N.pc++))},[\"%n\",t.stmts]),r++}),t.defs&&P.printf(\"%}case %f:%{%j%n\",function(){P.print(e[r].put(N.pc++))},[\"%n\",t.defs.stmts]),P.printf(\"case %f:%n\",function(){P.print(n.put(N.pc++))})})}},case:function(t){P.printf(\"%}case %v:%{%j\",t.value,[\"%n\",t.stmts])},default:function(t){P.printf(\"%}default:%{%j\",[\"%n\",t.stmts])},while:function(t){var e=V(t);if(N.noWait||!e.fiberCallRequired&&!e.hasReturn)N.enter({noWait:!0},function(){P.printf(\"while (%v) {%{\"+(J?\"Tonyu.checkLoop();%n\":\"\")+\"%f%n%}}\",t.cond,Z(t.loop))});else{var n=P.lazy(),r=N.pc++,i=\"reservedConst\"==t.cond.type&&\"true\"==t.cond.text;P.printf(\"%}case %d:%{\"+(i?\"%D%D%D\":\"if (!(%v)) { %s=%z; break; }%n\")+\"%f%n%s=%s;break;%n%}case %f:%{\",r,t.cond,l,n,H({closestBrk:n,closestCnt:r,exitTryOnJump:!1},t.loop),l,r,function(){P.print(n.put(N.pc++))})}},do:function(t){var e=V(t);if(N.noWait||!e.fiberCallRequired&&!e.hasReturn)N.enter({noWait:!0},function(){P.printf(\"do {%{\"+(J?\"Tonyu.checkLoop();%n\":\"\")+\"%f%n%}} while (%v);%n\",Z(t.loop),t.cond)});else{var n=P.lazy(),r=P.lazy(),i=N.pc++;P.printf(\"%}case %d:%{%f%n%}case %f:%{if (%v) { %s=%s; break; }%n%}case %f:%{\",i,H({closestBrk:n,closestCnt:r,exitTryOnJump:!1},t.loop),function(){P.print(r.put(N.pc++))},t.cond,l,i,function(){P.print(n.put(N.pc++))})}},for:function(t){var e=V(t);if(\"forin\"==t.inFor.type){var n=V(t.inFor).iterName;if(N.noWait||!e.fiberCallRequired&&!e.hasReturn)N.enter({noWait:!0},function(){P.printf(\"%s=%s(%v,%s);%nwhile(%s.next()) {%{%f%n%f%n%}}\",n,S,t.inFor.set,t.inFor.vars.length,n,s(n,t.inFor.isVar,t.inFor.vars),Z(t.loop))});else{var r=P.lazy(),i=N.pc++;P.printf(\"%s=%s(%v,%s);%n%}case %d:%{if (!(%s.next())) { %s=%z; break; }%n%f%n%f%n%s=%s;break;%n%}case %f:%{\",n,S,t.inFor.set,t.inFor.vars.length,i,n,l,r,s(n,t.inFor.isVar,t.inFor.vars),H({closestBrk:r,closestCnt:i,exitTryOnJump:!1},t.loop),l,i,function(t){t.print(r.put(N.pc++))})}}else if(N.noWait||!e.fiberCallRequired&&!e.hasReturn)N.enter({noWait:!0},function(){\"varsDecl\"==t.inFor.init.type||\"exprstmt\"==t.inFor.init.type?P.printf(\"%vfor (; %v ; %v) {%{\"+(J?\"Tonyu.checkLoop();%n\":\"\")+\"%v%n%}}\",t.inFor.init,t.inFor.cond,t.inFor.next,t.loop):P.printf(\"%v%nwhile(%v) {%{\"+(J?\"Tonyu.checkLoop();%n\":\"\")+\"%v%n%v;%n%}}\",t.inFor.init,t.inFor.cond,t.loop,t.inFor.next)});else{const e=P.lazy();var o=P.lazy();const n=N.pc++;P.printf(\"%v%n%}case %d:%{if (!(%v)) { %s=%z; break; }%n%f%n%}case %f:%{%v;%n%s=%s;break;%n%}case %f:%{\",t.inFor.init,n,t.inFor.cond,l,e,H({closestBrk:e,closestCnt:o,exitTryOnJump:!1},t.loop),function(t){t.print(o.put(N.pc++))},t.inFor.next,l,n,function(t){t.print(e.put(N.pc++))})}function s(t,e,n){return function(){n.forEach(function(e,n){var r=V(e);Q(e.text,r.scopeInfo,r),P.printf(\"=%s[%s];%n\",t,n)})}}},if:function(t){var e=V(t);if(!N.noWait&&(e.fiberCallRequired||e.hasJump||e.hasReturn)){var n=P.lazy(),r=P.lazy();t._else?P.printf(\"if (!(%v)) { %s=%z; break; }%n%v%n%s=%z;break;%n%}case %f:%{%v%n%}case %f:%{\",t.cond,l,r,t.then,l,n,function(){P.print(r.put(N.pc++))},t._else,function(){P.print(n.put(N.pc++))}):P.printf(\"if (!(%v)) { %s=%z; break; }%n%v%n%}case %f:%{\",t.cond,l,n,t.then,function(){P.print(n.put(N.pc++))})}else N.enter({noWait:!0},function(){t._else?P.printf(\"if (%v) {%{%f%n%}} else {%{%f%n%}}\",t.cond,Z(t.then),Z(t._else)):P.printf(\"if (%v) {%{%f%n%}}\",t.cond,Z(t.then))})},ifWait:function(t){N.noWait?t._else&&P.printf(\"%v\",t._else):P.printf(\"%v\",t.then)},empty:function(t){P.printf(\";%n\")},call:function(t){P.printf(\"(%j)\",[\",\",t.args])},objlitArg:function(t){P.printf(\"%v\",t.obj)},argList:function(t){P.printf(\"%j\",[\",\",t.args])},newExpr:function(t){var e=t.params;e?P.printf(\"new %v%v\",t.klass,e):P.printf(\"new %v\",t.klass)},scall:function(t){P.printf(\"[%j]\",[\",\",t.args])},superExpr:function(t){var n;t.name?(n=t.name.text,P.printf(\"%s.prototype.%s.apply( %s, %v)\",E,n,e,t.params)):P.printf(\"%s.apply( %s, %v)\",E,e,t.params)},arrayElem:function(t){P.printf(\"[%v]\",t.subscript)},member:function(t){P.printf(\".%s\",t.name)},symbol:function(t){P.print(t.text)},normalFor:function(t){P.printf(\"%v; %v; %v\",t.init,t.cond,t.next)},compound:function(t){var e=V(t);!N.noWait&&(e.fiberCallRequired||e.hasJump||e.hasReturn)?P.printf(\"%j\",[\"%n\",t.stmts]):N.enter({noWait:!0},function(){P.printf(\"{%{%j%n%}}\",[\"%n\",t.stmts])})},typeof:function(t){P.printf(\"typeof \")},instanceof:function(t){P.printf(\" instanceof \")},is:function(t){P.printf(\" instanceof \")},regex:function(t){P.printf(\"%s\",t.text)}});function Y(t,e){e||(e=z+++\"\");let n=\"_trc_\"+A.shortName+\"_\"+e;return O[n]=1,n}function tt(t){var e=V(t).info;P.printf(\"function %s(%j) {%{%f%n%f%}}\",e.name,[\",\",e.params],et(e),function(){N.enter({noWait:!0,threadAvail:!1,finfo:e},function(){t.body.stmts.forEach(function(t){M(\"%v%n\",t)})})})}function et(t){return function(){N.enter({},function(){for(let e in t.locals.varDecls)P.printf(\"var %s;%n\",e);for(let e in t.locals.subFuncDecls)tt(t.locals.subFuncDecls[e])})}}function nt(t){return j.match(t,{ftype:\"constructor\"})||j.match(t,{name:\"new\"})}[\"++\",\"--\",\"!==\",\"===\",\"+=\",\"-=\",\"*=\",\"/=\",\"%=\",\">=\",\"<=\",\"!=\",\"==\",\">>>\",\">>\",\"<<\",\"&&\",\"||\",\">\",\"<\",\"+\",\"?\",\"=\",\"*\",\"%\",\"/\",\"^\",\"~\",\"\\\\\",\":\",\";\",\",\",\"!\",\"&\",\"|\",\"-\",\"delete\"].forEach(function(t){K.funcs[t]=function(e){P.printf(\"%s\",t)}}),K.def=function(t){throw console.log(\"Err node=\"),console.log(t),new Error(t.type+\" is not defined in visitor:compiler2\")},K.cnt=0,N.enter({},function(){if(q){M(\"define(function (require) {%{\");var r={Tonyu:1};for(var i in A.decls.amds)r[i]=1;if(A.superclass){const t=A.superclass.shortName;r[t]=1}(A.includes||[]).forEach(function(t){var e=t.shortName;r[e]=1});for(let t in A.decls.softRefClasses)r[t]=1;for(let t in r)M(\"var %s=require('%s');%n\",t,t)}var o,s;M((q?\"return \":\"\")+\"Tonyu.klass.define({%{\"),M(\"fullName: %l,%n\",A.fullName),M(\"shortName: %l,%n\",A.shortName),M(\"namespace: %l,%n\",A.namespace),A.superclass&&M(\"superclass: %s,%n\",$(A.superclass)),M(\"includes: [%s],%n\",(o=A.includes,s=[],o.forEach(function(t){s.push($(t))}),s).join(\",\")),M(\"methods: function (%s) {%{\",E),M(\"return {%{\");const a=r=>{B&&console.log(\"method1\",r);var i=U[r];i.params||console.log(\"MYSTERY2\",i.params,U,A,F),N.enter({noWait:!0,threadAvail:!1},function(){var t,n;n=nt(t=i)?\"initialize\":t.name,t.params||console.log(\"MYSTERY\",t.params),M(\"%s :function %s(%j) {%{\"+w+\"var %s=%s;%n%f%n%f%}},%n\",n,Y(t.pos,n),[\",\",t.params],e,x,et(t),function(){N.enter({method:t,finfo:t},function(){t.stmts.forEach(function(t){M(\"%v%n\",t)})})})}),B&&console.log(\"method2\",r),i.nowait||N.enter({noWait:!1,threadAvail:!0},function(){!function(r){if(!nt(r)){var i=r.stmts,o=[],s=[],a=o;i.forEach(function(t){V(t).fiberCallRequired&&(a=s),a.push(t)}),M(\"%s%s :function %s(%j) {%{\"+w+\"var %s=%s;%n%svar %s=%s;%nvar %s=0;%n%f%n%f%n\",f,r.name,Y(r.pos,\"f_\"+r.name),[\",\",[X].concat(r.params)],e,x,r.useArgs?\"\":\"//\",n,\"Tonyu.A(arguments)\",l,et(r),function(){N.enter({method:r,noWait:!0,threadAvail:!0},function(){o.forEach(function(t){M(\"%v%n\",t)})})}),s.length>0?M(\"%s.enter(function %s(%s) {%{if (%s.lastEx) %s=%s.catchPC;%nfor(var %s=%d ; %s--;) {%{switch (%s) {%{%}case 0:%{%f%s.exit(%s);return;%n%}}%n%}}%n%}});%n\",t,Y(r.pos,\"ent_\"+r.name),t,t,l,t,p,h,p,l,function(){N.enter({method:r,finfo:r,pc:1},function(){s.forEach(function(t){M(\"%v%n\",t)})})},t,e):M(\"%s.retVal=%s;return;%n\",t,e),M(\"%}},%n\")}}(i)}),B&&console.log(\"method3\",r)};for(var u in U)a(u);M(\"__dummy: false%n\"),M(\"%}};%n\"),M(\"%}},%n\"),M(\"decls: %s%n\",JSON.stringify(function(t){var e={methods:{},fields:{}};for(let n in t.decls.methods)e.methods[n]={nowait:!!t.decls.methods[n].nowait};for(let i in t.decls.fields){var n=t.decls.fields[i],r={};n.vtype&&(\"string\"==typeof n.vtype?r.vtype=n.vtype:r.vtype=n.vtype.fullName||n.vtype.name),e.fields[i]=r}return e}(A))),M(\"%}});\"),q&&M(\"%n%}});\")}),q?(A.src.js=A.src.tonyu.up().rel(A.src.tonyu.truncExt()+\".js\"),A.src.js.text(P.buf)):A.src.js=P.buf,delete A.jsNotUpToDate,B&&console.log(\"method4\",P.buf);var rt=P.close();return A.src.map=P.mapStr,rt}}}()},{\"../lib/assert\":22,\"../runtime/TError\":26,\"../runtime/TonyuRuntime\":27,\"./IndentBuffer\":6,\"./ObjectMatcher\":8,\"./Visitor\":12,\"./compiler\":13,\"./context\":14}],8:[function(t,e,n){e.exports=function(){var t={},e=\"$var\",n=\"$this\";function r(t,r){var i={};return i[e]=t,r&&(i[n]=r),i}t.v=r,t.isVar=function(t){return t&&t[e]};for(var i=\"ABCDEFGHIJKLMNOPQRSTUVWXYZ\",o=0;o<i.length;o++){var s=i.substring(o,o+1);t[s]=r(s)}return t.match=function(t,r){var i={};return function t(r,i,o){if(r===i)return!0;if(null==r)return!1;if(\"string\"==typeof r&&i instanceof RegExp)return r.match(i);if(\"function\"==typeof i)return i(r,o);if(\"object\"==typeof i){for(var s in i)if(s!=e){var a=s==n?r:r[s],u=i[s];if(!t(a,u,o))return!1}return i[e]&&(o[i[e]]=r),!0}return!1}(t,r,i)?i:null},t}()},{}],9:[function(t,e,n){const r=t(\"../runtime/TonyuRuntime\"),i=t(\"./parse_tonyu2\"),o=(t(\"./IndentBuffer\"),t(\"./ObjectMatcher\")),s=t(\"../runtime/TError\"),a=t(\"./context\"),u=t(\"./Visitor\"),c=t(\"./compiler\"),f=(t(\"../lib/assert\"),t(\"./Grammar\")),l=t(\"../lib/root\");e.exports=c.Semantics=function(){var t=c.ScopeTypes,e=c.newScopeType,n=c.getScopeType,p=c.newScope,h=c.genSym,d=c.annotation,m=c.getMethod,g=c.getDependingClasses,v=c.getParams,y={Array:1,String:1,Boolean:1,Number:1,Void:1,Object:1,RegExp:1,Error:1,Date:1};function b(t){var e=this;if(t&&\"object\"==typeof t){var n;if(!(n=t instanceof Array?t:t[f.SUBELEMENTS]))for(var r in n=[],t)n.push(t[r]);n.forEach(function(t){e.visit(t)})}}return{initClassDecls:function(t,e){var n,r=t.src.tonyu;t.hasSemanticError=!0,t.src&&t.src.js&&(t.jsNotUpToDate=!0),t.node&&t.nodeTimestamp==r.lastUpdate()&&(n=t.node),n||(console.log(\"Parse \"+r),n=i.parse(r),t.nodeTimestamp=r.lastUpdate());var a={name:\"main\",stmts:[],pos:0,isMain:!0},c={},f={main:a},l={};t.decls={fields:c,methods:f,natives:l,amds:{},softRefClasses:{}},t.node=n;var p=o;!function(n){var i=e.options.compiler.defaultSuperClass,o=0,h=p.match(n,{ext:{superclassName:{text:p.N,pos:p.P}}});if(h&&(i=h.N,o=h.P,\"null\"==i&&(i=null)),t.includes=[],(h=p.match(n,{incl:{includeClassNames:p.C}}))&&h.C.forEach(function(n){var i=n.text,o=n.pos,a=e.classes[e.aliases[i]||i];if(!a)throw s(\"クラス \"+i+\"は定義されていません\",r,o);t.includes.push(a)}),\"Array\"==i)t.superclass={name:\"Array\",fullName:\"Array\",builtin:!0};else if(i){var d=e.classes[e.aliases[i]||i];if(!d)throw s(\"親クラス \"+i+\"は定義されていません\",r,o);t.superclass=d}else delete t.superclass;function m(e,n){n=n||e,c[e+\"\"]={node:n,klass:t.fullName,name:e+\"\",pos:n.pos}}t.directives={};var g=u({varDecl:function(t){m(t.name,t)},nativeDecl:function(t){},funcDecl:function(t){},funcExpr:function(t){},catch:function(t){},exprstmt:function(e){\"literal\"===e.expr.type&&e.expr.text.match(/^.field strict.$/)&&(t.directives.field_strict=!0)},forin:function(t){t.isVar&&t.vars.forEach(function(t){m(t)})}});g.def=b,g.visit(n.stmts),n.stmts.forEach(function(e){if(\"funcDecl\"==e.type){var n=e.head,r=\"function\";n.ftype&&(r=n.ftype.text);var i=n.name.text,o=n.params?\"\":n.setter?\"__setter__\":\"__getter__\";f[i=o+i]={nowait:!!n.nowait||\"\"!==o,ftype:r,name:i,klass:t.fullName,head:n,pos:n.pos,stmts:e.body.stmts,node:e}}else\"nativeDecl\"==e.type?l[e.name.text]=e:a.stmts.push(e)})}(n)},annotate:function(i,f){i.hasSemanticError=!0;var x,w,S=i.src.tonyu,E=S.text(),_=o,C=i.decls,T=(C.fields,C.methods),A=(C.natives,C.amds,t),F={},D=a(),L=!1,R={type:\"postfix\",left:{type:\"postfix\",left:_.T,op:{type:\"member\",name:{text:_.N}}},op:{type:\"call\",args:_.A}},k={type:\"postfix\",left:_.T,op:{type:\"member\",name:{text:_.N}}};x=w={type:\"postfix\",left:{type:\"varAccess\",name:{text:_.N}},op:{type:\"call\",args:_.A}};var P={expr:w},O={expr:{type:\"infix\",op:_.O,left:_.L,right:w}},M={expr:{type:\"superExpr\",params:{args:_.A},$var:\"S\"}},N={expr:{type:\"infix\",op:_.O,left:_.L,right:{type:\"superExpr\",params:{args:_.A},$var:\"S\"}}};function B(t,e){return d(i.annotation,t,e)}function j(t){if(!t.builtin){var n,i=F,o=t.decls;for(n in o||console.log(\"DECLNUL\",t),o.fields){const r=o.fields[n];i[n]=e(A.FIELD,{klass:t.fullName,name:n,info:r}),r.node&&B(r.node,{info:r})}for(n in o.methods){const a=o.methods[n];var s=r.klass.propReg.exec(n);s?i[s[2]]=e(A.PROP,{klass:t.fullName,name:s[2],info:a}):i[n]=e(A.METHOD,{klass:t.fullName,name:n,info:a}),a.node&&B(a.node,{info:a})}}}function I(t){return m(i,t)}function U(t){return n(D.scope[t])==A.METHOD&&!I(t).nowait}function W(t){if(\"varAccess\"==t.type||\"postfix\"==t.type&&(\"member\"==t.op.type||\"arrayElem\"==t.op.type))return\"varAccess\"==t.type&&B(t,{noBind:!0}),!0;throw console.log(\"LVal\",t),s(\"'\"+function(t){return c.getSource(E,t)}(t)+\"'は左辺には書けません．\",S,t.pos)}function z(t){var r=t;t+=\"\";var o=D.scope[t],a=n(o);if(!a){if(f.amdPaths&&f.amdPaths[t])a=A.MODULE,i.decls.amds[t]=f.amdPaths[t];else{var u=t.match(/^\\$/);if((f.options.compiler.field_strict||i.directives.field_strict)&&!u)throw new s(t+\"は宣言されていません（フィールドの場合，明示的に宣言してください）．\",S,r.pos);a=u?A.GLOBAL:A.FIELD}var l={name:t};a==A.FIELD&&(l.klass=i.name,i.decls.fields[t]=i.decls.fields[t]||{},c.extend(i.decls.fields[t],{klass:i.fullName,name:t})),o=F[t]=e(a,l)}return a==A.CLASS&&(i.decls.softRefClasses[t]=o),o}i.annotation={};var G=u({varDecl:function(t){D.isMain?(B(t,{varInMain:!0}),B(t,{declaringClass:i})):(D.locals.varDecls[t.name.text]=t,B(t,{declaringFunc:D.finfo}))},funcDecl:function(t){D.locals.subFuncDecls[t.head.name.text]=t},funcExpr:function(t){},catch:function(t){D.locals.varDecls[t.name.text]=t},exprstmt:function(t){},forin:function(t){var e=t.isVar;t.vars.forEach(function(t){e&&(D.isMain?(B(t,{varInMain:!0}),B(t,{declaringClass:i})):(D.locals.varDecls[t.text]=t,B(t,{declaringFunc:D.finfo})))});var n=h(\"_it_\");B(t,{iterName:n}),D.locals.varDecls[n]=t}});function q(t){var e={varDecls:{},subFuncDecls:{}};return D.enter({locals:e},function(){G.visit(t)}),e}function J(t,e){t.forEach(function(t){B(t,e)})}function V(t){D.method&&(D.method.fiberCallRequired=!0),J(t,{fiberCallRequired:!0})}G.def=b;var $=u({varAccess:function(t){var e=z(t.name);n(e),B(t,{scopeInfo:e})},funcDecl:function(t){},funcExpr:function(t){Y(t)},objlit:function(t){var e=this,n={};t.elems.forEach(function(t){var r;if(r=\"literal\"==t.key.type?t.key.text.substring(1,t.key.text.length-1):t.key.text,n[r])throw s(\"オブジェクトリテラルのキー名'\"+r+\"'が重複しています\",S,t.pos);n[r]=1,e.visit(t)})},jsonElem:function(t){if(t.value)this.visit(t.value);else{if(\"literal\"==t.key.type)throw s(\"オブジェクトリテラルのパラメタに単独の文字列は使えません\",S,t.pos);B(t,{scopeInfo:z(t.key)})}},do:function(t){var e=this;D.enter({brkable:!0,contable:!0},function(){e.def(t)})},switch:function(t){var e=this;D.enter({brkable:!0},function(){e.def(t)})},while:function(t){var e=this;D.enter({brkable:!0,contable:!0},function(){e.def(t)}),V(this.path)},for:function(t){var e=this;D.enter({brkable:!0,contable:!0},function(){e.def(t)})},forin:function(t){t.vars.forEach(function(t){B(t,{scopeInfo:z(t)})}),this.visit(t.set)},ifWait:function(t){var n=this,r=p(D.scope);r._thread=e(A.THVAR),D.enter({scope:r},function(){n.visit(t.then)}),t._else&&n.visit(t._else),V(this.path)},try:function(t){D.finfo.useTry=!0,this.def(t)},return:function(t){var e;D.noWait||((e=_.match(t.value,w))&&U(e.N)&&(B(t.value,{fiberCall:e}),V(this.path)),J(this.path,{hasReturn:!0})),this.visit(t.value)},break:function(t){if(!D.brkable)throw s(\"break； は繰り返しまたはswitch文の中で使います.\",S,t.pos);D.noWait||J(this.path,{hasJump:!0})},continue:function(t){if(!D.contable)throw s(\"continue； は繰り返しの中で使います.\",S,t.pos);D.noWait||J(this.path,{hasJump:!0})},reservedConst:function(t){\"arguments\"==t.text&&(D.finfo.useArgs=!0)},postfix:function(t){var e;function n(t,n){return e=_.match(t,n)}if(this.visit(t.left),this.visit(t.op),n(t,x)){var r=B(t.left).scopeInfo;B(t,{myMethodCall:{name:e.N,args:e.A,scopeInfo:r}})}else n(t,R)?B(t,{othersMethodCall:{target:e.T,name:e.N,args:e.A}}):n(t,k)&&B(t,{memberAccess:{target:e.T,name:e.N}})},infix:function(t){var e=t.op.text;\"=\"!=e&&\"+=\"!=e&&\"-=\"!=e&&\"*=\"!=e&&\"/=\"!=e&&\"%=\"!=e||W(t.left),this.def(t)},exprstmt:function(t){var e,n;if(\"objlit\"===t.expr.type)throw s(\"オブジェクトリテラル単独の式文は書けません．\",S,t.pos);if(!D.noWait&&(e=_.match(t,P))&&U(e.N))e.type=\"noRet\",B(t,{fiberCall:e}),V(this.path);else if(!D.noWait&&(e=_.match(t,O))&&U(e.N))e.type=\"ret\",B(t,{fiberCall:e}),V(this.path);else if(!D.noWait&&(e=_.match(t,M))&&e.S.name){if(!(n=I(e.S.name.text)))throw new Error(\"メソッド\"+e.S.name.text+\" はありません。\");n.nowait||(e.type=\"noRetSuper\",e.superclass=i.superclass,B(t,{fiberCall:e}),V(this.path))}else if(!D.noWait&&(e=_.match(t,N))&&e.S.name){if(!(n=I(e.S.name.text)))throw new Error(\"メソッド\"+e.S.name.text+\" はありません。\");n.nowait||(e.type=\"retSuper\",e.superclass=i.superclass,B(t,{fiberCall:e}),V(this.path))}this.visit(t.expr)},varDecl:function(t){var e;!D.noWait&&(e=_.match(t.value,w))&&U(e.N)&&(e.type=\"varDecl\",B(t,{fiberCall:e}),V(this.path)),this.visit(t.value),this.visit(t.typeDecl)},typeExpr:function(t){H(t)}});function H(t){t.name;var e=z(t.name),r=n(e);r===A.NATIVE?B(t,{resolvedType:e.value}):r===A.CLASS&&B(t,{resolvedType:e.info})}function Q(t,e){D.enter({scope:e},function(){$.visit(t)})}function Z(t,n){var r=t.locals;for(var i in r.varDecls){var o=e(A.LOCAL,{declaringFunc:t});n[i]=o,B(r.varDecls[i],{scopeInfo:o})}for(let i in r.subFuncDecls){const o=e(A.LOCAL,{declaringFunc:t});n[i]=o,B(r.subFuncDecls[i],{scopeInfo:o})}}function X(t){t.forEach(function(t){t.typeDecl&&H(t.typeDecl.vtype)})}function K(t){D.enter({isMain:t.isMain,finfo:t},function(){t.locals=q(t.stmts),t.params=v(t)}),X(t.params)}function Y(t){var n,r,i=t.body,o=t.head.name?t.head.name.text:\"anonymous_\"+t.pos;n=_.match(t,{head:{params:{params:_.P}}}),r=n?n.P:[];var s={},a=p(D.scope);return D.enter({finfo:s},function(){r.forEach(function(t){var n=e(A.PARAM,{declaringFunc:s});B(t,{scopeInfo:n}),a[t.name.text]=n}),s.locals=q(i),Z(s,a),Q(i,a)}),s.scope=a,s.name=o,s.params=r,X(s.params),B(t,{info:s}),tt(s.locals,a),s}function tt(t,e){D.enter({scope:e},function(){for(var e in t.subFuncDecls)Y(t.subFuncDecls[e])})}function et(t){var n=p(D.scope);return t.params.forEach(function(r,o){var s=e(A.PARAM,{klass:i.name,name:t.name,no:o,declaringFunc:t});n[r.name.text]=s,B(r,{scopeInfo:s,declaringFunc:t})}),Z(t,n),D.enter({method:t,finfo:t,noWait:!1},function(){Q(t.stmts,n)}),t.scope=n,tt(t.locals,n),n}$.def=b,function(){var t=F;g(i).forEach(j);var n=i.decls;for(let r in n.natives)t[r]=e(A.NATIVE,{name:\"native::\"+r,value:l[r]});for(let n in y)t[n]=e(A.NATIVE,{name:\"native::\"+n,value:l[n]});for(let n in f.aliases){var r=f.aliases[n];t[n]=e(A.CLASS,{name:n,fullName:r,info:f.classes[r]})}}(),function(){var t=g(i);for(var e in i.decls.methods){var n=i.decls.methods[e];for(let i of t){var r=i.decls.methods[e];r&&r.nowait&&(n.nowait=!0)}}}(),D.enter({scope:F},function(){for(var t in T){L&&console.log(\"anon method1\",t);var e=T[t];K(e),et(e)}}),delete i.hasSemanticError}}}()},{\"../lib/assert\":22,\"../lib/root\":23,\"../runtime/TError\":26,\"../runtime/TonyuRuntime\":27,\"./Grammar\":5,\"./IndentBuffer\":6,\"./ObjectMatcher\":8,\"./Visitor\":12,\"./compiler\":13,\"./context\":14,\"./parse_tonyu2\":16}],10:[function(t,e,n){const r=t(\"../lib/root\");let i;\"undefined\"!=typeof global&&global.require&&(i=global.require(\"vm\"));class o{constructor(t,e){if(\"object\"==typeof t){const n=t;e=n.sourceMap,t=n.text,n.url&&(this.url=n.url)}this.text=t,this.sourceMap=e&&e.toString()}async saveAs(t){const e=t.sibling(t.name()+\".map\");let n=this.text;this.sourceMap&&(await e.text(this.sourceMap),n+=\"\\n//# sourceMappingURL=\"+e.name()),await t.text(n)}exec(e){return new Promise((n,o)=>{if(r.window){const t=r.document;let e;if(this.url)e=this.url;else{const t=new r.Blob([this.text],{type:\"text/plain\"});e=r.URL.createObjectURL(t)}const i=t.createElement(\"script\");console.log(\"load script\",e),i.setAttribute(\"src\",e),i.addEventListener(\"load\",t=>{n(t)}),this.parent.url2SourceFile[e]=this,t.body.appendChild(i)}else if(e&&e.tmpdir){const r=e.tmpdir.rel(Math.random()+\".js\"),i=r.sibling(r.name()+\".map\");let o=this.text;o+=\"\\n//# sourceMappingURL=\"+i.name(),r.text(o),i.text(this.sourceMap),t(r.path()),r.rm(),i.rm(),n()}else if(r.importScripts&&this.url)r.importScripts(this.url),n();else{const t=Function,e=i?i.compileFunction(this.text):new t(this.text);n(e())}})}export(){return{text:this.text,sourceMap:this.sourceMap,functions:this.functions}}}e.exports=new class{constructor(){this.url2SourceFile={}}add(t,e){const n=new o(t,e);return n.parent=this,n}}},{\"../lib/root\":23}],11:[function(t,e,n){const r=t(\"./Visitor\"),i=t(\"./Grammar\"),o=t(\"./compiler\"),s=t(\"./context\");var a=o.ScopeTypes,u=(o.newScopeType,o.getScopeType,o.newScope,o.genSym,o.annotation),c=(o.getMethod,o.getDependingClasses,o.getParams,{});function f(t){var e=this;if(t&&\"object\"==typeof t){var n;if(!(n=t instanceof Array?t:t[i.SUBELEMENTS]))for(var r in n=[],t)n.push(t[r]);n.forEach(function(t){e.visit(t)})}}c.checkTypeDecl=function(t,e){function n(e,n){return u(t.annotation,e,n)}var i=r({varDecl:function(t){if(t.value&&this.visit(t.value),t.name&&t.typeDecl){var e=n(t.typeDecl.vtype);console.log(\"var typeis\",t.name+\"\",t.typeDecl.vtype,e.resolvedType);var r=n(t),i=r.scopeInfo,o=r.info;i?(console.log(\"set var type\",t.name+\"\",e.resolvedType),i.vtype=e.resolvedType):o&&(console.log(\"set fld type\",t.name+\"\",e.resolvedType),o.vtype=e.resolvedType)}},paramDecl:function(t){if(t.name&&t.typeDecl){console.log(\"param typeis\",t.name+\"\",t.typeDecl.vtype+\"\");var e=n(t.typeDecl.vtype),r=n(t).scopeInfo;r&&e.resolvedType&&(console.log(\"set param type\",t.name+\"\",t.typeDecl.vtype+\"\"),r.vtype=e.resolvedType)}},funcDecl:function(t){var e=t.head,r=n(t).info;e.rtype&&(console.log(\"ret typeis\",e.name+\"\",e.rtype.vtype+\"\"),r.rtype=e.rtype.vtype),this.visit(e),this.visit(t.body)}});i.def=f,i.visit(t.node)},c.checkExpr=function(t,e){function n(e,n){return u(t.annotation,e,n)}var i=r({number:function(t){n(t,{vtype:Number})},literal:function(t){n(t,{vtype:String})},postfix:function(t){var e=n(t);if(e.memberAccess){var r=e.memberAccess,s=function(t){return i.visit(t),n(t).vtype}(r.target);if(s){var a=o.getField(s,r.name);console.log(\"GETF\",s,r.name,a),a&&a.vtype&&n(t,{vtype:a.vtype})}}else this.visit(t.left),this.visit(t.op)},varAccess:function(e){var r=n(e).scopeInfo;if(r)if(r.vtype)console.log(\"VA typeof\",e.name+\":\",r.vtype),n(e,{vtype:r.vtype});else if(r.type===a.FIELD){var i;if(!(i=t.decls.fields[e.name+\"\"]))return void console.log(\"TC Warning: fld not found\",t,e.name+\"\");var o=i.vtype;o?(n(e,{vtype:o}),console.log(\"VA typeof\",e.name+\":\",o)):console.log(\"VA vtype not found\",e.name+\":\",i)}else r.type,a.PROP}});s();i.def=f,i.visit(t.node)},e.exports=c},{\"./Grammar\":5,\"./Visitor\":12,\"./compiler\":13,\"./context\":14}],12:[function(t,e,n){e.exports=function(t){var e={funcs:t,path:[],visit:function(n){try{e.path.push(n),e.debug&&console.log(\"visit \",n.type,n.pos);var r=n?t[n.type]:null;if(r)return r.call(e,n);if(e.def)return e.def.call(e,n)}finally{e.path.pop()}},replace:function(t){return e.def||(e.def=function(t){if(\"object\"==typeof t)for(var n in t)t[n]&&\"object\"==typeof t[n]&&(t[n]=e.visit(t[n]));return t}),e.visit(t)}};return e}},{}],13:[function(t,e,n){const r=t(\"../runtime/TonyuRuntime\"),i=(t(\"./ObjectMatcher\"),t(\"../lib/root\"));var o={};r.Compiler=o;o.ScopeTypes={FIELD:\"field\",METHOD:\"method\",NATIVE:\"native\",LOCAL:\"local\",THVAR:\"threadvar\",PROP:\"property\",PARAM:\"param\",GLOBAL:\"global\",CLASS:\"class\",MODULE:\"module\"};var s=1,a=1;function u(t){return t+(a+++\"\").replace(/\\./g,\"\")}function c(t){var e={},n=[];return function r(i){if(!e[i.fullName]){if(e[i.fullName]=!0,i.isShim)throw console.log(t,\"contains shim \",i),new Error(\"Contains shim\");n.push(i),i.superclass&&r(i.superclass),i.includes&&i.includes.forEach(r)}}(t),n}o.newScopeType=function(t,e){var n={type:t};if(e)for(var r in e)n[r]=e[r];return n.name||(n.name=u(\"_\"+t+\"_\")),n},o.getScopeType=function(t){return t?t.type:null},o.newScope=function(t){var e=function(){};return e.prototype=t,new e},o.nullCheck=function(t,e){if(!t)throw e+\" is null\";return t},o.genSym=u,o.extend=function(t,e){for(var n in e)t[n]=e[n];return t},o.annotation=function(t,e,n){e._id||(e._id=++s);var r=t[e._id];if(r||(r=t[e._id]={node:e}),r.node!==e)throw console.log(\"NOMATCH\",r.node,e),new Error(\"annotation node not match!\");if(n)for(var i in n)r[i]=n[i];return r},o.getSource=function(t,e){return t.substring(e.pos,e.pos+e.len)},o.getField=function(t,e){if(t instanceof Function)return null;var n=null;return c(t).forEach(function(t){n||(n=t.decls.fields[e])}),\"string\"==typeof n.vtype&&(n.vtype=r.classMetas[n.vtype]||i[n.vtype]),n},o.getMethod=function(t,e){var n=null;return c(t).forEach(function(t){n||(n=t.decls.methods[e])}),n},o.getDependingClasses=c,o.getParams=function(t){var e=[];if(!t.head)return e;t.head.setter&&e.push(t.head.setter.value);var n=t.head.params?t.head.params.params:null;if(n&&!n.forEach)throw new Error(t+\" is not array \");return n&&(e=e.concat(n)),e},e.exports=o},{\"../lib/root\":23,\"../runtime/TonyuRuntime\":27,\"./ObjectMatcher\":8}],14:[function(t,e,n){e.exports=function(){var t={ovrFunc:function(t,e){return e.parent=t,e},enter:function(e,n){var r={};for(let n in e)n.match(/^\\$/)?(n=RegExp.rightContext,r[n]=t[n],t[n]=t.ovrFunc(t[n],e[n])):(r[n]=t[n],t[n]=e[n]);var i=n(t);for(let e in r)t[e]=r[e];return i}},e={};for(var n in t.clear=function(){for(var n in t)e[n]||delete t[n]},t)e[n]=!0;return t}},{}],15:[function(t,e,n){e.exports={getNamespace:function(){var t=this.getOptions();if(t.compiler&&t.compiler.namespace)return t.compiler.namespace;throw new Error(\"Namespace is not set\")},async loadDependingClasses(){const t=this.getNamespace();for(let e of this.getDependingProjects())e.getNamespace()!==t&&await e.loadClasses()},getEXT:()=>\".tonyu\"}},{}],16:[function(t,e,n){const r=t(\"./Grammar\"),i=(t(\"./IndentBuffer\"),t(\"./tonyu2_token\")),o=t(\"./parser\"),s=t(\"./ExpressionParser2\"),a=t(\"../runtime/TError\");e.exports=function(){var t=o,e={},n=r(),u=n.get,c=(t.StringParser,t.TokensParser.token);function f(t){return JSON.stringify(t)}var l=c(\"number\").ret(function(t){if(t.type=\"number\",\"string\"!=typeof t.text)throw\"No text for \"+f(t);if(t.value=t.text-0,isNaN(t.value))throw\"No value for \"+f(t);return t}),p=c(\"symbol\"),h=c(\"symbol\");for(var d in i.reserved){var m=c(d);m instanceof o.Parser&&\"constructor\"!==d&&(h=h.or(m))}var g=c(\"===\"),v=c(\"!==\"),y=c(\"==\"),b=c(\"!=\"),x=c(\">=\"),w=c(\"<=\"),S=c(\">\"),E=c(\"<\"),_=c(\"&&\"),C=c(\"||\"),T=c(\"&\"),A=c(\"|\"),F=c(\"^\"),D=c(\">>\"),L=c(\"<<\"),R=c(\">>>\"),k=c(\"-\"),P=c(\"+\"),O=c(\"*\"),M=c(\"/\"),N=c(\"%\"),B=c(\"=\"),j=c(\"literal\"),I=c(\"regex\");function U(t){return function(){return arguments[t]}}function W(t){return t.sep0(c(\",\"),!0).and(c(\",\").opt()).ret(function(t,e){return t})}var z=s(),G=n(\"arrayElem\").ands(c(\"[\"),z.lazy(),c(\"]\")).ret(null,\"subscript\"),q=n(\"argList\").ands(c(\"(\"),W(z.lazy()),c(\")\")).ret(null,\"args\"),J=n(\"member\").ands(c(\".\"),h).ret(null,\"name\"),V=n(\"parenExpr\").ands(c(\"(\"),z.lazy(),c(\")\")).ret(null,\"expr\"),$=n(\"varAccess\").ands(p).ret(\"name\"),H=u(\"funcExpr\").firstTokens([\"function\",\"\\\\\"]),Q=n(\"funcExprArg\").ands(H).ret(\"obj\"),Z=u(\"objlit\").firstTokens(\"{\"),X=n(\"objlitArg\").ands(Z).ret(\"obj\"),K=X.or(Q);function Y(t,e){var n=[];if(t&&!t.args)throw f(t);if(t){var r=o.getRange(t);o.addRange(n,r),t.args.forEach(function(t){n.push(t)})}return e.forEach(function(t){var e=o.getRange(t);o.addRange(n,e),n.push(t.obj)}),n}var tt=q.and(K.rep0()).ret(function(t,e){return Y(t,e)}).or(K.rep1().ret(function(t){return Y(null,t)})),et=(q.or(X),n(\"call\").ands(tt).ret(\"args\")),nt=n(\"scall\").ands(tt).ret(\"args\"),rt=n(\"newExpr\").ands(c(\"new\"),$,et.opt()).ret(null,\"klass\",\"params\"),it=n(\"superExpr\").ands(c(\"super\"),c(\".\").and(p).ret(U(1)).opt(),nt).ret(null,\"name\",\"params\"),ot=c(\"true\").or(c(\"false\")).or(c(\"null\")).or(c(\"undefined\")).or(c(\"_thread\")).or(c(\"this\")).or(c(\"arguments\")).ret(function(t){return t.type=\"reservedConst\",t});z.element(l),z.element(ot),z.element(I),z.element(j),z.element(V),z.element(rt),z.element(it),z.element(H),z.element(Z),z.element(u(\"arylit\").firstTokens(\"[\")),z.element($);var st=0;function at(t,e,n){var r={type:\"infix\",left:t,op:e,right:n};return o.setRange(r),r.toString=function(){return\"(\"+t+e+n+\")\"},r}z.infixr(st,B),z.infixr(st,c(\"+=\")),z.infixr(st,c(\"-=\")),z.infixr(st,c(\"*=\")),z.infixr(st,c(\"/=\")),z.infixr(st,c(\"%=\")),z.infixr(st,c(\"|=\")),z.infixr(st,c(\"&=\")),st++,z.trifixr(st,c(\"?\"),c(\":\")),st++,z.infixl(st,C),st++,z.infixl(st,_),st++,z.infixl(st,A),st++,z.infixl(st,F),st++,z.infixl(st,T),st++,z.infix(st,c(\"instanceof\")),z.infix(st,c(\"is\")),z.infix(st,g),z.infix(st,v),z.infix(st,y),z.infix(st,b),z.infix(st,x),z.infix(st,w),z.infix(st,S),z.infix(st,E),st++,z.infixl(st,R),z.infixl(st,L),z.infixl(st,D),st++,z.postfix(st+3,c(\"++\")),z.postfix(st+3,c(\"--\")),z.infixl(st,k),z.infixl(st,P),st++,z.infixl(st,O),z.infixl(st,M),z.infixl(st,N),st++,z.prefix(st,c(\"typeof\")),z.prefix(st,c(\"__typeof\")),z.prefix(st,c(\"delete\")),z.prefix(st,c(\"++\")),z.prefix(st,c(\"--\")),z.prefix(st,c(\"+\")),z.prefix(st,c(\"-\")),z.prefix(st,c(\"!\")),z.prefix(st,c(\"~\")),st++,st++,z.postfix(st,et),z.postfix(st,J),z.postfix(st,G),z.mkInfixl(at),z.mkInfixr(at);var ut=z.build().setName(\"expr\").profile(),ct=u(\"stmt\").firstTokens();n(\"exprstmt\").ands(ut,c(\";\")).ret(\"expr\");n(\"compound\").ands(c(\"{\"),ct.rep0(),c(\"}\")).ret(null,\"stmts\");var ft=c(\"else\").and(ct).ret(U(1)),lt=(n(\"return\").ands(c(\"return\"),ut.opt(),c(\";\")).ret(null,\"value\"),n(\"if\").ands(c(\"if\"),c(\"(\"),ut,c(\")\"),ct,ft.opt()).ret(null,null,\"cond\",null,\"then\",\"_else\"),n(\"forin\").ands(c(\"var\").opt(),p.sep1(c(\",\"),!0),c(\"in\").or(c(\"of\")),ut).ret(\"isVar\",\"vars\",\"inof\",\"set\")),pt=n(\"normalFor\").ands(ct,ut.opt(),c(\";\"),ut.opt()).ret(\"init\",\"cond\",null,\"next\").or(lt),ht=(n(\"for\").ands(c(\"for\"),c(\"(\"),pt,c(\")\"),\"stmt\").ret(null,null,\"inFor\",null,\"loop\"),n(\"while\").ands(c(\"while\"),c(\"(\"),ut,c(\")\"),\"stmt\").ret(null,null,\"cond\",null,\"loop\"),n(\"do\").ands(c(\"do\"),\"stmt\",c(\"while\"),c(\"(\"),ut,c(\")\"),c(\";\")).ret(null,\"loop\",null,null,\"cond\",null,null),n(\"case\").ands(c(\"case\"),ut,c(\":\"),ct.rep0()).ret(null,\"value\",null,\"stmts\")),dt=n(\"default\").ands(c(\"default\"),c(\":\"),ct.rep0()).ret(null,null,\"stmts\"),mt=(n(\"switch\").ands(c(\"switch\"),c(\"(\"),ut,c(\")\"),c(\"{\"),ht.rep1(),dt.opt(),c(\"}\")).ret(null,null,\"value\",null,null,\"cases\",\"defs\"),n(\"break\").ands(c(\"break\"),c(\";\")).ret(\"brk\"),n(\"continue\").ands(c(\"continue\"),c(\";\")).ret(\"cont\"),n(\"finally\").ands(c(\"finally\"),\"stmt\").ret(null,\"stmt\"),n(\"catch\").ands(c(\"catch\"),c(\"(\"),p,c(\")\"),\"stmt\").ret(null,null,\"name\",null,\"stmt\"),n(\"catches\").ors(\"catch\",\"finally\")),gt=(n(\"try\").ands(c(\"try\"),\"stmt\",mt.rep1()).ret(null,\"stmt\",\"catches\"),n(\"throw\").ands(c(\"throw\"),ut,c(\";\")).ret(null,\"ex\"),n(\"typeExpr\").ands(p).ret(\"name\")),vt=n(\"typeDecl\").ands(c(\":\"),gt).ret(null,\"vtype\"),yt=n(\"varDecl\").ands(p,vt.opt(),c(\"=\").and(ut).ret(U(1)).opt()).ret(\"name\",\"typeDecl\",\"value\"),bt=(n(\"varsDecl\").ands(c(\"var\"),yt.sep1(c(\",\"),!0),c(\";\")).ret(null,\"decls\"),n(\"paramDecl\").ands(p,vt.opt()).ret(\"name\",\"typeDecl\")),xt=n(\"paramDecls\").ands(c(\"(\"),W(bt),c(\")\")).ret(null,\"params\"),wt=n(\"setterDecl\").ands(c(\"=\"),bt).ret(null,\"value\");n(\"funcDeclHead\").ands(c(\"nowait\").opt(),c(\"function\").or(c(\"fiber\")).or(c(\"tk_constructor\")).or(c(\"\\\\\")).opt(),p.or(c(\"new\")),wt.opt(),xt.opt(),vt.opt()).ret(\"nowait\",\"ftype\",\"name\",\"setter\",\"params\",\"rtype\");n(\"funcDecl\").ands(\"funcDeclHead\",\"compound\").ret(\"head\",\"body\"),n(\"nativeDecl\").ands(c(\"native\"),p,c(\";\")).ret(null,\"name\"),n(\"ifWait\").ands(c(\"ifwait\"),\"stmt\",ft.opt()).ret(null,\"then\",\"_else\"),n(\"empty\").ands(c(\";\")).ret(null);ct=n(\"stmt\").ors(\"return\",\"if\",\"for\",\"while\",\"do\",\"break\",\"continue\",\"switch\",\"ifWait\",\"try\",\"throw\",\"nativeDecl\",\"funcDecl\",\"compound\",\"exprstmt\",\"varsDecl\",\"empty\"),n(\"funcExprHead\").ands(c(\"function\").or(c(\"\\\\\")),p.opt(),xt.opt()).ret(null,\"name\",\"params\");n(\"funcExpr\").ands(\"funcExprHead\",\"compound\").ret(\"head\",\"body\");var St=n(\"jsonElem\").ands(p.or(j),c(\":\").or(c(\"=\")).and(ut).ret(function(t,e){return e}).opt()).ret(\"key\",\"value\"),Et=(n(\"objlit\").ands(c(\"{\"),W(St),c(\"}\")).ret(null,\"elems\"),n(\"arylit\").ands(c(\"[\"),W(ut),c(\"]\")).ret(null,\"elems\"),n(\"extends\").ands(c(\"extends\"),p.or(c(\"null\")),c(\";\")).ret(null,\"superclassName\")),_t=n(\"includes\").ands(c(\"includes\"),p.sep1(c(\",\"),!0),c(\";\")).ret(null,\"includeClassNames\"),Ct=n(\"program\").ands(Et.opt(),_t.opt(),ct.rep0(),o.TokensParser.eof).ret(\"ext\",\"incl\",\"stmts\");for(var Tt in n.defs)n.defs[Tt].profile();return e.parse=function(e){let n;n=\"string\"==typeof e?e:e.text(),n+=\"\\n\";var r=i.parse(n);if(!r.isSuccess())throw a(\"文法エラー(Token)\",e,r.src.maxPos);var o=r.result[0],s=t.TokensParser.parse(Ct,o);if(s.isSuccess())return s.result[0];var u=o[s.src.maxPos],c=u?u.pos+u.len:n.length;throw a(\"文法エラー\",e,c)},e.extension=\"tonyu\",e}()},{\"../runtime/TError\":26,\"./ExpressionParser2\":4,\"./Grammar\":5,\"./IndentBuffer\":6,\"./parser\":17,\"./tonyu2_token\":19}],17:[function(t,e,n){e.exports=function(){function t(t,e){var n;for(n in e)t[n]=e[n];return t}var e={consoleBuffer:\"\",options:{traceTap:!1,optimizeFirst:!0,profile:!1,verboseFirst:!1,traceFirstTbl:!1},Parser:n,StringParser:o,nc:r};function n(t){e.options.traceTap?this.parse=function(e){console.log(\"tap: name=\"+this.name+\"  pos=\"+(e?e.pos:\"?\"));var n=t.apply(this,[e]),r=\"NOIMG\";return n.src&&n.src.str&&(r=n.src.str.substring(n.pos-3,n.pos)+\"^\"+n.src.str.substring(n.pos,n.pos+3)),n.src&&n.src.tokens&&(r=n.src.tokens[n.pos-1]+\"[\"+n.src.tokens[n.pos]+\"]\"+n.src.tokens[n.pos+1]),console.log(\"/tap: name=\"+this.name+\" pos=\"+(e?e.pos:\"?\")+\"->\"+(n?n.pos:\"?\")+\" \"+r+\" res=\"+(n?n.success:\"?\")),n}:this.parse=t}function r(t,e){if(null==t)throw e+\" is null!\";return t}function i(t,e){null!=t&&(this.src={maxPos:0,global:e},\"string\"==typeof t&&(this.src.str=t),t instanceof Array&&(this.src.tokens=t),this.pos=0,this.result=[],this.success=!0)}e.dispTbl=function(t){var e=\"\",n={};if(!t)return e;for(var r in t){const e=t[r].name;n[e]||(n[e]=\"\"),n[e]+=r}for(let t in n)e+=n[t]+\"->\"+t+\",\";return e},n.create=function(t){return new n(t)},e.create=n.create,t(n.prototype,{except:function(t){return this.ret(n.create(function(e){return t.apply({},e.result)&&(e.success=!1),e}).setName(\"(except \"+this.name+\")\"))},noFollow:function(t){return r(t,\"p\"),this.ret(n.create(function(e){var n=t.parse(e);return e.success=!n.success,e}).setName(\"(\"+this.name+\" noFollow \"+t.name+\")\"))},andNoUnify:function(t){r(t,\"next\");var e=this;return n.create(function(n){var r=e.parse(n);if(!r.success)return r;var i=t.parse(r);return i.success&&(i.result=r.result.concat(i.result)),i}).setName(\"(\"+this.name+\" \"+t.name+\")\")},and:function(t){var r=this.andNoUnify(t);if(!this._first)return r;var i=this._first.tbl,o={};for(var s in i)o[s]=i[s].andNoUnify(t);return(r=n.fromFirst(this._first.space,o)).setName(\"(\"+this.name+\" >> \"+t.name+\")\"),e.options.verboseFirst&&console.log(\"Created aunify name=\"+r.name+\" tbl=\"+e.dispTbl(o)),r},retNoUnify:function(t){var e,r=this;return e=\"function\"==typeof t?n.create(function(e){var n=e.clone();return n.result=[t.apply({},e.result)],n}).setName(\"retfunc\"):t,n.create(function(t){var n=r.parse(t);return n.success?e.parse(n):n}).setName(\"(\"+this.name+\" >= \"+e.name+\")\")},ret:function(t){if(!this._first)return this.retNoUnify(t);var r=this._first.tbl,i={};for(var o in r)i[o]=r[o].retNoUnify(t);const s=n.fromFirst(this._first.space,i);return s.setName(\"(\"+this.name+\" >>= \"+t.name+\")\"),e.options.verboseFirst&&console.log(\"Created runify name=\"+s.name+\" tbl=\"+e.dispTbl(i)),s},first:function(t,r){if(!e.options.optimizeFirst)return this;if(null==t)throw\"Space is null2!\";if(\"string\"==typeof r){for(var i={},o=0;o<r.length;o++)i[r.substring(o,o+1)]=this;return n.fromFirst(t,i).setName(\"(fst \"+this.name+\")\")}if(null==r)return n.fromFirst(t,{ALL:this}).setName(\"(fst \"+this.name+\")\");if(\"object\"==typeof r)throw\"this._first={space: space, tbl:ct}\";return this},firstTokens:function(t){if(!e.options.optimizeFirst)return this;\"string\"==typeof t&&(t=[t]);var r={};if(t){var i=this;t.forEach(function(t){r[t]=i})}else r.ALL=this;return n.fromFirstTokens(r).setName(\"(fstT \"+this.name+\")\")},unifyFirst:function(r){function i(t,e){return t?e?t.orNoUnify(e).checkTbl():t:e}var o={};this.checkTbl(),r.checkTbl(),t(o,this._first.tbl),function(){var t=r._first.tbl,e={};for(let t in o)e[t]=1;for(let n in t)e[n]=1;delete e.ALL,(o.ALL||t.ALL)&&(o.ALL=i(o.ALL,t.ALL));for(let n in e)o[n]&&t[n]?o[n]=i(o[n],t[n]):o[n]&&!t[n]?o[n]=i(o[n],t.ALL):!o[n]&&t[n]&&(o[n]=i(o.ALL,t[n]))}();var s=n.fromFirst(this._first.space,o).setName(\"(\"+this.name+\")U(\"+r.name+\")\");return e.options.verboseFirst&&console.log(\"Created unify name=\"+s.name+\" tbl=\"+e.dispTbl(o)),s},or:function(t){return r(t,\"other\"),this._first&&t._first&&this._first.space&&this._first.space===t._first.space?this.unifyFirst(t):(e.options.verboseFirst&&console.log(\"Cannot unify\"+this.name+\" || \"+t.name+\" \"+this._first+\" - \"+t._first),this.orNoUnify(t))},orNoUnify:function(t){var e=this,r=n.create(function(n){var r=e.parse(n);return r.success?r:t.parse(n)});return r.name=\"(\"+this.name+\")|(\"+t.name+\")\",r},setName:function(t){return this.name=t,this._first,this},profile:function(t){return e.options.profile&&(this.parse=this.parse.profile(t||this.name)),this},repN:function(t){var e=this;return t||(t=0),n.create(function(n){for(var r=n,i=[];;){var o,s=e.parse(r);if(!s.success)return i.length>=t?((o=r.clone()).result=[i],o.success=!0,o):((o=n.clone()).success=!1,o);i.push(s.result[0]),r=s}}).setName(\"(\"+e.name+\" * \"+t+\")\")},rep0:function(){return this.repN(0)},rep1:function(){return this.repN(1)},opt:function(){var t=this;return n.create(function(e){var n=t.parse(e);return n.success?n:((e=e.clone()).success=!0,e.result=[null],e)}).setName(\"(\"+t.name+\")?\")},sep1:function(t,e){r(this,\"value\"),r(t,\"sep\");var n=t.and(this).ret(function(t,n){return e?n:{sep:t,value:n}});return this.and(n.rep0()).ret(function(t,n){var r;if(e){var i=[t];for(r in n)i.push(n[r]);return i}return{head:t,tails:n}}).setName(\"(sep1 \"+this.name+\"~~\"+t.name+\")\")},sep0:function(t){return this.sep1(t,!0).opt().ret(function(t){return t||[]})},tap:function(t){return this},retN:function(t){return this.ret(function(){return arguments[t]})},parseStr:function(t,e){var n=new i(t,e);return this.parse(n)},checkTbl:function(){if(!this._first)return this;var t=this._first.tbl;for(var e in t)if(!t[e].parse)throw this.name+\": tbl.\"+e+\" is not a parser :\"+t[e];return this}}),t(i.prototype,{clone:function(){var t=new i;return t.src=this.src,t.pos=this.pos,t.result=this.result.slice(),t.success=this.success,t},updateMaxPos:function(t){t>this.src.maxPos&&(this.src.maxPos=t)},isSuccess:function(){return this.success},getGlobal:function(){return this.src.global||(this.src.global={}),this.src.global}}),n.fromFirst=function(t,r){if(\"TOKEN\"==t)return n.fromFirstTokens(r);var i=n.create(function(n){var i=t.parse(n),o=i.src.str.substring(i.pos,i.pos+1);return e.options.traceFirstTbl&&console.log(this.name+\": first=\"+o+\" tbl=\"+(r[o]?r[o].name:\"-\")),r[o]?r[o].parse(i):r.ALL?r.ALL.parse(i):(i.success=!1,i)});return i._first={space:t,tbl:r},i.checkTbl(),i},n.fromFirstTokens=function(t){var r=n.create(function(n){var r=n.src.tokens[n.pos],i=r?r.type:null;return e.options.traceFirstTbl&&console.log(this.name+\": firstT=\"+i+\" tbl=\"+(t[i]?t[i].name:\"-\")),null!=i&&t[i]?t[i].parse(n):t.ALL?t.ALL.parse(n):(n.success=!1,n)});return r._first={space:\"TOKEN\",tbl:t},r.checkTbl(),r};var o={empty:n.create(function(t){var e=t.clone();return e.success=!0,e.result=[null],e}).setName(\"E\"),fail:n.create(function(t){return t.success=!1,t}).setName(\"F\"),str:function(t){return this.strLike(function(e,n){return e.substring(n,n+t.length)===t?{len:t.length}:null}).setName(t)},reg:function(t){return(t+\"\").match(/^\\/\\^/)||console.log(\"Waring regex should have ^ at the head:\"+t),this.strLike(function(e,n){var r=t.exec(e.substring(n));return r?(r.len=r[0].length,r):null}).setName(t+\"\")},strLike:function(r){return n.create(function(n){var i=n.src.str;if(null==i)throw\"strLike: str is null!\";var o=n.pos,s=r(i,o,n);if(e.options.traceToken&&console.log(\"pos=\"+o+\" r=\"+s),s){e.options.traceToken&&console.log(\"str:succ\"),s.pos=o,s.src=n.src;var a=n.clone();return t(a,{pos:o+s.len,success:!0,result:[s]}),n.updateMaxPos(a.pos),a}return e.options.traceToken&&console.log(\"str:fail\"),n.success=!1,n}).setName(\"STRLIKE\")},parse:function(t,e,n){var r=new i(e,n);return t.parse(r)}};o.eof=o.strLike(function(t,e){return e==t.length?{len:0}:null}).setName(\"EOF\"),e.StringParser=o;var s={token:function(t){return n.create(function(e){var n=e.src.tokens[e.pos];return e.success=!1,n?(n.type==t&&((e=e.clone()).updateMaxPos(e.pos),e.pos++,e.success=!0,e.result=[n]),e):e}).setName(t).firstTokens(t)},parse:function(t,e,n){var r=new i(e,n);return t.parse(r)},eof:n.create(function(t){var e=t.pos>=t.src.tokens.length;return t.success=e,e&&((t=t.clone()).result=[{type:\"EOF\"}]),t}).setName(\"EOT\")};return e.TokensParser=s,e.lazy=function(t){var e=null;return n.create(function(n){if(e||(e=t()),!e)throw t+\" returned null!\";return this.name=t.name,e.parse(n)}).setName(\"LZ\")},e.addRange=function(t,e){if(null==e)return t;if(\"number\"!=typeof t.pos)return t.pos=e.pos,t.len=e.len,t;var n=e.pos+e.len,r=t.pos+t.len;return e.pos<t.pos&&(t.pos=e.pos),n>r&&(t.len=n-t.pos),t},e.setRange=function(t){if(null!=t&&\"string\"!=typeof t&&\"number\"!=typeof t&&\"boolean\"!=typeof t){if(null!=e.getRange(t))return t;for(var n in t)if(t.hasOwnProperty(n)){var r=e.setRange(t[n]);e.addRange(t,r)}return t}},e.getRange=function(t){return null==t?null:\"number\"!=typeof t.pos?null:\"number\"==typeof t.len?t:null},e}()},{}],18:[function(t,e,n){var r,i;r=this,i=function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}return n.m=t,n.c=e,n.p=\"\",n(0)}([function(t,e,n){e.SourceMapGenerator=n(1).SourceMapGenerator,e.SourceMapConsumer=n(7).SourceMapConsumer,e.SourceNode=n(10).SourceNode},function(t,e,n){var r=n(2),i=n(4),o=n(5).ArraySet,s=n(6).MappingList;function a(t){t||(t={}),this._file=i.getArg(t,\"file\",null),this._sourceRoot=i.getArg(t,\"sourceRoot\",null),this._skipValidation=i.getArg(t,\"skipValidation\",!1),this._sources=new o,this._names=new o,this._mappings=new s,this._sourcesContents=null}a.prototype._version=3,a.fromSourceMap=function(t){var e=t.sourceRoot,n=new a({file:t.file,sourceRoot:e});return t.eachMapping(function(t){var r={generated:{line:t.generatedLine,column:t.generatedColumn}};null!=t.source&&(r.source=t.source,null!=e&&(r.source=i.relative(e,r.source)),r.original={line:t.originalLine,column:t.originalColumn},null!=t.name&&(r.name=t.name)),n.addMapping(r)}),t.sources.forEach(function(e){var r=t.sourceContentFor(e);null!=r&&n.setSourceContent(e,r)}),n},a.prototype.addMapping=function(t){var e=i.getArg(t,\"generated\"),n=i.getArg(t,\"original\",null),r=i.getArg(t,\"source\",null),o=i.getArg(t,\"name\",null);this._skipValidation||this._validateMapping(e,n,r,o),null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=o&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:e.line,generatedColumn:e.column,originalLine:null!=n&&n.line,originalColumn:null!=n&&n.column,source:r,name:o})},a.prototype.setSourceContent=function(t,e){var n=t;null!=this._sourceRoot&&(n=i.relative(this._sourceRoot,n)),null!=e?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[i.toSetString(n)]=e):this._sourcesContents&&(delete this._sourcesContents[i.toSetString(n)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},a.prototype.applySourceMap=function(t,e,n){var r=e;if(null==e){if(null==t.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\\'s \"file\" property. Both were omitted.');r=t.file}var s=this._sourceRoot;null!=s&&(r=i.relative(s,r));var a=new o,u=new o;this._mappings.unsortedForEach(function(e){if(e.source===r&&null!=e.originalLine){var o=t.originalPositionFor({line:e.originalLine,column:e.originalColumn});null!=o.source&&(e.source=o.source,null!=n&&(e.source=i.join(n,e.source)),null!=s&&(e.source=i.relative(s,e.source)),e.originalLine=o.line,e.originalColumn=o.column,null!=o.name&&(e.name=o.name))}var c=e.source;null==c||a.has(c)||a.add(c);var f=e.name;null==f||u.has(f)||u.add(f)},this),this._sources=a,this._names=u,t.sources.forEach(function(e){var r=t.sourceContentFor(e);null!=r&&(null!=n&&(e=i.join(n,e)),null!=s&&(e=i.relative(s,e)),this.setSourceContent(e,r))},this)},a.prototype._validateMapping=function(t,e,n,r){if((!(t&&\"line\"in t&&\"column\"in t&&t.line>0&&t.column>=0)||e||n||r)&&!(t&&\"line\"in t&&\"column\"in t&&e&&\"line\"in e&&\"column\"in e&&t.line>0&&t.column>=0&&e.line>0&&e.column>=0&&n))throw new Error(\"Invalid mapping: \"+JSON.stringify({generated:t,source:n,original:e,name:r}))},a.prototype._serializeMappings=function(){for(var t,e,n,o,s=0,a=1,u=0,c=0,f=0,l=0,p=\"\",h=this._mappings.toArray(),d=0,m=h.length;d<m;d++){if(t=\"\",(e=h[d]).generatedLine!==a)for(s=0;e.generatedLine!==a;)t+=\";\",a++;else if(d>0){if(!i.compareByGeneratedPositionsInflated(e,h[d-1]))continue;t+=\",\"}t+=r.encode(e.generatedColumn-s),s=e.generatedColumn,null!=e.source&&(o=this._sources.indexOf(e.source),t+=r.encode(o-l),l=o,t+=r.encode(e.originalLine-1-c),c=e.originalLine-1,t+=r.encode(e.originalColumn-u),u=e.originalColumn,null!=e.name&&(n=this._names.indexOf(e.name),t+=r.encode(n-f),f=n)),p+=t}return p},a.prototype._generateSourcesContent=function(t,e){return t.map(function(t){if(!this._sourcesContents)return null;null!=e&&(t=i.relative(e,t));var n=i.toSetString(t);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},a.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return null!=this._file&&(t.file=this._file),null!=this._sourceRoot&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t},a.prototype.toString=function(){return JSON.stringify(this.toJSON())},e.SourceMapGenerator=a},function(t,e,n){var r=n(3);e.encode=function(t){var e,n=\"\",i=function(t){return t<0?1+(-t<<1):0+(t<<1)}(t);do{e=31&i,(i>>>=5)>0&&(e|=32),n+=r.encode(e)}while(i>0);return n},e.decode=function(t,e,n){var i,o,s,a,u=t.length,c=0,f=0;do{if(e>=u)throw new Error(\"Expected more digits in base 64 VLQ value.\");if(-1===(o=r.decode(t.charCodeAt(e++))))throw new Error(\"Invalid base64 digit: \"+t.charAt(e-1));i=!!(32&o),c+=(o&=31)<<f,f+=5}while(i);n.value=(a=(s=c)>>1,1==(1&s)?-a:a),n.rest=e}},function(t,e){var n=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\".split(\"\");e.encode=function(t){if(0<=t&&t<n.length)return n[t];throw new TypeError(\"Must be between 0 and 63: \"+t)},e.decode=function(t){return 65<=t&&t<=90?t-65:97<=t&&t<=122?t-97+26:48<=t&&t<=57?t-48+52:43==t?62:47==t?63:-1}},function(t,e){e.getArg=function(t,e,n){if(e in t)return t[e];if(3===arguments.length)return n;throw new Error('\"'+e+'\" is a required argument.')};var n=/^(?:([\\w+\\-.]+):)?\\/\\/(?:(\\w+:\\w+)@)?([\\w.]*)(?::(\\d+))?(\\S*)$/,r=/^data:.+\\,.+$/;function i(t){var e=t.match(n);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}function o(t){var e=\"\";return t.scheme&&(e+=t.scheme+\":\"),e+=\"//\",t.auth&&(e+=t.auth+\"@\"),t.host&&(e+=t.host),t.port&&(e+=\":\"+t.port),t.path&&(e+=t.path),e}function s(t){var n=t,r=i(t);if(r){if(!r.path)return t;n=r.path}for(var s,a=e.isAbsolute(n),u=n.split(/\\/+/),c=0,f=u.length-1;f>=0;f--)\".\"===(s=u[f])?u.splice(f,1):\"..\"===s?c++:c>0&&(\"\"===s?(u.splice(f+1,c),c=0):(u.splice(f,2),c--));return\"\"===(n=u.join(\"/\"))&&(n=a?\"/\":\".\"),r?(r.path=n,o(r)):n}e.urlParse=i,e.urlGenerate=o,e.normalize=s,e.join=function(t,e){\"\"===t&&(t=\".\"),\"\"===e&&(e=\".\");var n=i(e),a=i(t);if(a&&(t=a.path||\"/\"),n&&!n.scheme)return a&&(n.scheme=a.scheme),o(n);if(n||e.match(r))return e;if(a&&!a.host&&!a.path)return a.host=e,o(a);var u=\"/\"===e.charAt(0)?e:s(t.replace(/\\/+$/,\"\")+\"/\"+e);return a?(a.path=u,o(a)):u},e.isAbsolute=function(t){return\"/\"===t.charAt(0)||!!t.match(n)},e.relative=function(t,e){\"\"===t&&(t=\".\"),t=t.replace(/\\/$/,\"\");for(var n=0;0!==e.indexOf(t+\"/\");){var r=t.lastIndexOf(\"/\");if(r<0)return e;if((t=t.slice(0,r)).match(/^([^\\/]+:\\/)?\\/*$/))return e;++n}return Array(n+1).join(\"../\")+e.substr(t.length+1)};var a=!(\"__proto__\"in Object.create(null));function u(t){return t}function c(t){if(!t)return!1;var e=t.length;if(e<9)return!1;if(95!==t.charCodeAt(e-1)||95!==t.charCodeAt(e-2)||111!==t.charCodeAt(e-3)||116!==t.charCodeAt(e-4)||111!==t.charCodeAt(e-5)||114!==t.charCodeAt(e-6)||112!==t.charCodeAt(e-7)||95!==t.charCodeAt(e-8)||95!==t.charCodeAt(e-9))return!1;for(var n=e-10;n>=0;n--)if(36!==t.charCodeAt(n))return!1;return!0}function f(t,e){return t===e?0:t>e?1:-1}e.toSetString=a?u:function(t){return c(t)?\"$\"+t:t},e.fromSetString=a?u:function(t){return c(t)?t.slice(1):t},e.compareByOriginalPositions=function(t,e,n){var r=t.source-e.source;return 0!==r?r:0!=(r=t.originalLine-e.originalLine)?r:0!=(r=t.originalColumn-e.originalColumn)||n?r:0!=(r=t.generatedColumn-e.generatedColumn)?r:0!=(r=t.generatedLine-e.generatedLine)?r:t.name-e.name},e.compareByGeneratedPositionsDeflated=function(t,e,n){var r=t.generatedLine-e.generatedLine;return 0!==r?r:0!=(r=t.generatedColumn-e.generatedColumn)||n?r:0!=(r=t.source-e.source)?r:0!=(r=t.originalLine-e.originalLine)?r:0!=(r=t.originalColumn-e.originalColumn)?r:t.name-e.name},e.compareByGeneratedPositionsInflated=function(t,e){var n=t.generatedLine-e.generatedLine;return 0!==n?n:0!=(n=t.generatedColumn-e.generatedColumn)?n:0!==(n=f(t.source,e.source))?n:0!=(n=t.originalLine-e.originalLine)?n:0!=(n=t.originalColumn-e.originalColumn)?n:f(t.name,e.name)}},function(t,e,n){var r=n(4),i=Object.prototype.hasOwnProperty;function o(){this._array=[],this._set=Object.create(null)}o.fromArray=function(t,e){for(var n=new o,r=0,i=t.length;r<i;r++)n.add(t[r],e);return n},o.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},o.prototype.add=function(t,e){var n=r.toSetString(t),o=i.call(this._set,n),s=this._array.length;o&&!e||this._array.push(t),o||(this._set[n]=s)},o.prototype.has=function(t){var e=r.toSetString(t);return i.call(this._set,e)},o.prototype.indexOf=function(t){var e=r.toSetString(t);if(i.call(this._set,e))return this._set[e];throw new Error('\"'+t+'\" is not in the set.')},o.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error(\"No element indexed by \"+t)},o.prototype.toArray=function(){return this._array.slice()},e.ArraySet=o},function(t,e,n){var r=n(4);function i(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}i.prototype.unsortedForEach=function(t,e){this._array.forEach(t,e)},i.prototype.add=function(t){var e,n,i,o,s,a;e=this._last,n=t,i=e.generatedLine,o=n.generatedLine,s=e.generatedColumn,a=n.generatedColumn,o>i||o==i&&a>=s||r.compareByGeneratedPositionsInflated(e,n)<=0?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))},i.prototype.toArray=function(){return this._sorted||(this._array.sort(r.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},e.MappingList=i},function(t,e,n){var r=n(4),i=n(8),o=n(5).ArraySet,s=n(2),a=n(9).quickSort;function u(t){var e=t;return\"string\"==typeof t&&(e=JSON.parse(t.replace(/^\\)\\]\\}'/,\"\"))),null!=e.sections?new l(e):new c(e)}function c(t){var e=t;\"string\"==typeof t&&(e=JSON.parse(t.replace(/^\\)\\]\\}'/,\"\")));var n=r.getArg(e,\"version\"),i=r.getArg(e,\"sources\"),s=r.getArg(e,\"names\",[]),a=r.getArg(e,\"sourceRoot\",null),u=r.getArg(e,\"sourcesContent\",null),c=r.getArg(e,\"mappings\"),f=r.getArg(e,\"file\",null);if(n!=this._version)throw new Error(\"Unsupported version: \"+n);i=i.map(String).map(r.normalize).map(function(t){return a&&r.isAbsolute(a)&&r.isAbsolute(t)?r.relative(a,t):t}),this._names=o.fromArray(s.map(String),!0),this._sources=o.fromArray(i,!0),this.sourceRoot=a,this.sourcesContent=u,this._mappings=c,this.file=f}function f(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function l(t){var e=t;\"string\"==typeof t&&(e=JSON.parse(t.replace(/^\\)\\]\\}'/,\"\")));var n=r.getArg(e,\"version\"),i=r.getArg(e,\"sections\");if(n!=this._version)throw new Error(\"Unsupported version: \"+n);this._sources=new o,this._names=new o;var s={line:-1,column:0};this._sections=i.map(function(t){if(t.url)throw new Error(\"Support for url field in sections not implemented.\");var e=r.getArg(t,\"offset\"),n=r.getArg(e,\"line\"),i=r.getArg(e,\"column\");if(n<s.line||n===s.line&&i<s.column)throw new Error(\"Section offsets must be ordered and non-overlapping.\");return s=e,{generatedOffset:{generatedLine:n+1,generatedColumn:i+1},consumer:new u(r.getArg(t,\"map\"))}})}u.fromSourceMap=function(t){return c.fromSourceMap(t)},u.prototype._version=3,u.prototype.__generatedMappings=null,Object.defineProperty(u.prototype,\"_generatedMappings\",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),u.prototype.__originalMappings=null,Object.defineProperty(u.prototype,\"_originalMappings\",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),u.prototype._charIsMappingSeparator=function(t,e){var n=t.charAt(e);return\";\"===n||\",\"===n},u.prototype._parseMappings=function(t,e){throw new Error(\"Subclasses must implement _parseMappings\")},u.GENERATED_ORDER=1,u.ORIGINAL_ORDER=2,u.GREATEST_LOWER_BOUND=1,u.LEAST_UPPER_BOUND=2,u.prototype.eachMapping=function(t,e,n){var i,o=e||null;switch(n||u.GENERATED_ORDER){case u.GENERATED_ORDER:i=this._generatedMappings;break;case u.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error(\"Unknown order of iteration.\")}var s=this.sourceRoot;i.map(function(t){var e=null===t.source?null:this._sources.at(t.source);return null!=e&&null!=s&&(e=r.join(s,e)),{source:e,generatedLine:t.generatedLine,generatedColumn:t.generatedColumn,originalLine:t.originalLine,originalColumn:t.originalColumn,name:null===t.name?null:this._names.at(t.name)}},this).forEach(t,o)},u.prototype.allGeneratedPositionsFor=function(t){var e=r.getArg(t,\"line\"),n={source:r.getArg(t,\"source\"),originalLine:e,originalColumn:r.getArg(t,\"column\",0)};if(null!=this.sourceRoot&&(n.source=r.relative(this.sourceRoot,n.source)),!this._sources.has(n.source))return[];n.source=this._sources.indexOf(n.source);var o=[],s=this._findMapping(n,this._originalMappings,\"originalLine\",\"originalColumn\",r.compareByOriginalPositions,i.LEAST_UPPER_BOUND);if(s>=0){var a=this._originalMappings[s];if(void 0===t.column)for(var u=a.originalLine;a&&a.originalLine===u;)o.push({line:r.getArg(a,\"generatedLine\",null),column:r.getArg(a,\"generatedColumn\",null),lastColumn:r.getArg(a,\"lastGeneratedColumn\",null)}),a=this._originalMappings[++s];else for(var c=a.originalColumn;a&&a.originalLine===e&&a.originalColumn==c;)o.push({line:r.getArg(a,\"generatedLine\",null),column:r.getArg(a,\"generatedColumn\",null),lastColumn:r.getArg(a,\"lastGeneratedColumn\",null)}),a=this._originalMappings[++s]}return o},e.SourceMapConsumer=u,c.prototype=Object.create(u.prototype),c.prototype.consumer=u,c.fromSourceMap=function(t){var e=Object.create(c.prototype),n=e._names=o.fromArray(t._names.toArray(),!0),i=e._sources=o.fromArray(t._sources.toArray(),!0);e.sourceRoot=t._sourceRoot,e.sourcesContent=t._generateSourcesContent(e._sources.toArray(),e.sourceRoot),e.file=t._file;for(var s=t._mappings.toArray().slice(),u=e.__generatedMappings=[],l=e.__originalMappings=[],p=0,h=s.length;p<h;p++){var d=s[p],m=new f;m.generatedLine=d.generatedLine,m.generatedColumn=d.generatedColumn,d.source&&(m.source=i.indexOf(d.source),m.originalLine=d.originalLine,m.originalColumn=d.originalColumn,d.name&&(m.name=n.indexOf(d.name)),l.push(m)),u.push(m)}return a(e.__originalMappings,r.compareByOriginalPositions),e},c.prototype._version=3,Object.defineProperty(c.prototype,\"sources\",{get:function(){return this._sources.toArray().map(function(t){return null!=this.sourceRoot?r.join(this.sourceRoot,t):t},this)}}),c.prototype._parseMappings=function(t,e){for(var n,i,o,u,c,l=1,p=0,h=0,d=0,m=0,g=0,v=t.length,y=0,b={},x={},w=[],S=[];y<v;)if(\";\"===t.charAt(y))l++,y++,p=0;else if(\",\"===t.charAt(y))y++;else{for((n=new f).generatedLine=l,u=y;u<v&&!this._charIsMappingSeparator(t,u);u++);if(o=b[i=t.slice(y,u)])y+=i.length;else{for(o=[];y<u;)s.decode(t,y,x),c=x.value,y=x.rest,o.push(c);if(2===o.length)throw new Error(\"Found a source, but no line and column\");if(3===o.length)throw new Error(\"Found a source and line, but no column\");b[i]=o}n.generatedColumn=p+o[0],p=n.generatedColumn,o.length>1&&(n.source=m+o[1],m+=o[1],n.originalLine=h+o[2],h=n.originalLine,n.originalLine+=1,n.originalColumn=d+o[3],d=n.originalColumn,o.length>4&&(n.name=g+o[4],g+=o[4])),S.push(n),\"number\"==typeof n.originalLine&&w.push(n)}a(S,r.compareByGeneratedPositionsDeflated),this.__generatedMappings=S,a(w,r.compareByOriginalPositions),this.__originalMappings=w},c.prototype._findMapping=function(t,e,n,r,o,s){if(t[n]<=0)throw new TypeError(\"Line must be greater than or equal to 1, got \"+t[n]);if(t[r]<0)throw new TypeError(\"Column must be greater than or equal to 0, got \"+t[r]);return i.search(t,e,o,s)},c.prototype.computeColumnSpans=function(){for(var t=0;t<this._generatedMappings.length;++t){var e=this._generatedMappings[t];if(t+1<this._generatedMappings.length){var n=this._generatedMappings[t+1];if(e.generatedLine===n.generatedLine){e.lastGeneratedColumn=n.generatedColumn-1;continue}}e.lastGeneratedColumn=1/0}},c.prototype.originalPositionFor=function(t){var e={generatedLine:r.getArg(t,\"line\"),generatedColumn:r.getArg(t,\"column\")},n=this._findMapping(e,this._generatedMappings,\"generatedLine\",\"generatedColumn\",r.compareByGeneratedPositionsDeflated,r.getArg(t,\"bias\",u.GREATEST_LOWER_BOUND));if(n>=0){var i=this._generatedMappings[n];if(i.generatedLine===e.generatedLine){var o=r.getArg(i,\"source\",null);null!==o&&(o=this._sources.at(o),null!=this.sourceRoot&&(o=r.join(this.sourceRoot,o)));var s=r.getArg(i,\"name\",null);return null!==s&&(s=this._names.at(s)),{source:o,line:r.getArg(i,\"originalLine\",null),column:r.getArg(i,\"originalColumn\",null),name:s}}}return{source:null,line:null,column:null,name:null}},c.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(t){return null==t}))},c.prototype.sourceContentFor=function(t,e){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(t=r.relative(this.sourceRoot,t)),this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];var n;if(null!=this.sourceRoot&&(n=r.urlParse(this.sourceRoot))){var i=t.replace(/^file:\\/\\//,\"\");if(\"file\"==n.scheme&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!n.path||\"/\"==n.path)&&this._sources.has(\"/\"+t))return this.sourcesContent[this._sources.indexOf(\"/\"+t)]}if(e)return null;throw new Error('\"'+t+'\" is not in the SourceMap.')},c.prototype.generatedPositionFor=function(t){var e=r.getArg(t,\"source\");if(null!=this.sourceRoot&&(e=r.relative(this.sourceRoot,e)),!this._sources.has(e))return{line:null,column:null,lastColumn:null};var n={source:e=this._sources.indexOf(e),originalLine:r.getArg(t,\"line\"),originalColumn:r.getArg(t,\"column\")},i=this._findMapping(n,this._originalMappings,\"originalLine\",\"originalColumn\",r.compareByOriginalPositions,r.getArg(t,\"bias\",u.GREATEST_LOWER_BOUND));if(i>=0){var o=this._originalMappings[i];if(o.source===n.source)return{line:r.getArg(o,\"generatedLine\",null),column:r.getArg(o,\"generatedColumn\",null),lastColumn:r.getArg(o,\"lastGeneratedColumn\",null)}}return{line:null,column:null,lastColumn:null}},e.BasicSourceMapConsumer=c,l.prototype=Object.create(u.prototype),l.prototype.constructor=u,l.prototype._version=3,Object.defineProperty(l.prototype,\"sources\",{get:function(){for(var t=[],e=0;e<this._sections.length;e++)for(var n=0;n<this._sections[e].consumer.sources.length;n++)t.push(this._sections[e].consumer.sources[n]);return t}}),l.prototype.originalPositionFor=function(t){var e={generatedLine:r.getArg(t,\"line\"),generatedColumn:r.getArg(t,\"column\")},n=i.search(e,this._sections,function(t,e){var n=t.generatedLine-e.generatedOffset.generatedLine;return n||t.generatedColumn-e.generatedOffset.generatedColumn}),o=this._sections[n];return o?o.consumer.originalPositionFor({line:e.generatedLine-(o.generatedOffset.generatedLine-1),column:e.generatedColumn-(o.generatedOffset.generatedLine===e.generatedLine?o.generatedOffset.generatedColumn-1:0),bias:t.bias}):{source:null,line:null,column:null,name:null}},l.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(t){return t.consumer.hasContentsOfAllSources()})},l.prototype.sourceContentFor=function(t,e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n].consumer.sourceContentFor(t,!0);if(r)return r}if(e)return null;throw new Error('\"'+t+'\" is not in the SourceMap.')},l.prototype.generatedPositionFor=function(t){for(var e=0;e<this._sections.length;e++){var n=this._sections[e];if(-1!==n.consumer.sources.indexOf(r.getArg(t,\"source\"))){var i=n.consumer.generatedPositionFor(t);if(i)return{line:i.line+(n.generatedOffset.generatedLine-1),column:i.column+(n.generatedOffset.generatedLine===i.line?n.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},l.prototype._parseMappings=function(t,e){this.__generatedMappings=[],this.__originalMappings=[];for(var n=0;n<this._sections.length;n++)for(var i=this._sections[n],o=i.consumer._generatedMappings,s=0;s<o.length;s++){var u=o[s],c=i.consumer._sources.at(u.source);null!==i.consumer.sourceRoot&&(c=r.join(i.consumer.sourceRoot,c)),this._sources.add(c),c=this._sources.indexOf(c);var f=i.consumer._names.at(u.name);this._names.add(f),f=this._names.indexOf(f);var l={source:c,generatedLine:u.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:u.generatedColumn+(i.generatedOffset.generatedLine===u.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:u.originalLine,originalColumn:u.originalColumn,name:f};this.__generatedMappings.push(l),\"number\"==typeof l.originalLine&&this.__originalMappings.push(l)}a(this.__generatedMappings,r.compareByGeneratedPositionsDeflated),a(this.__originalMappings,r.compareByOriginalPositions)},e.IndexedSourceMapConsumer=l},function(t,e){e.GREATEST_LOWER_BOUND=1,e.LEAST_UPPER_BOUND=2,e.search=function(t,n,r,i){if(0===n.length)return-1;var o=function t(n,r,i,o,s,a){var u=Math.floor((r-n)/2)+n,c=s(i,o[u],!0);return 0===c?u:c>0?r-u>1?t(u,r,i,o,s,a):a==e.LEAST_UPPER_BOUND?r<o.length?r:-1:u:u-n>1?t(n,u,i,o,s,a):a==e.LEAST_UPPER_BOUND?u:n<0?-1:n}(-1,n.length,t,n,r,i||e.GREATEST_LOWER_BOUND);if(o<0)return-1;for(;o-1>=0&&0===r(n[o],n[o-1],!0);)--o;return o}},function(t,e){function n(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function r(t,e,i,o){if(i<o){var s=i-1;n(t,(f=i,l=o,Math.round(f+Math.random()*(l-f))),o);for(var a=t[o],u=i;u<o;u++)e(t[u],a)<=0&&n(t,s+=1,u);n(t,s+1,u);var c=s+1;r(t,e,i,c-1),r(t,e,c+1,o)}var f,l}e.quickSort=function(t,e){r(t,e,0,t.length-1)}},function(t,e,n){var r=n(1).SourceMapGenerator,i=n(4),o=/(\\r?\\n)/,s=\"$$$isSourceNode$$$\";function a(t,e,n,r,i){this.children=[],this.sourceContents={},this.line=null==t?null:t,this.column=null==e?null:e,this.source=null==n?null:n,this.name=null==i?null:i,this[s]=!0,null!=r&&this.add(r)}a.fromStringWithSourceMap=function(t,e,n){var r=new a,s=t.split(o),u=function(){return s.shift()+(s.shift()||\"\")},c=1,f=0,l=null;return e.eachMapping(function(t){if(null!==l){if(!(c<t.generatedLine)){var e=(n=s[0]).substr(0,t.generatedColumn-f);return s[0]=n.substr(t.generatedColumn-f),f=t.generatedColumn,p(l,e),void(l=t)}p(l,u()),c++,f=0}for(;c<t.generatedLine;)r.add(u()),c++;if(f<t.generatedColumn){var n=s[0];r.add(n.substr(0,t.generatedColumn)),s[0]=n.substr(t.generatedColumn),f=t.generatedColumn}l=t},this),s.length>0&&(l&&p(l,u()),r.add(s.join(\"\"))),e.sources.forEach(function(t){var o=e.sourceContentFor(t);null!=o&&(null!=n&&(t=i.join(n,t)),r.setSourceContent(t,o))}),r;function p(t,e){if(null===t||void 0===t.source)r.add(e);else{var o=n?i.join(n,t.source):t.source;r.add(new a(t.originalLine,t.originalColumn,o,e,t.name))}}},a.prototype.add=function(t){if(Array.isArray(t))t.forEach(function(t){this.add(t)},this);else{if(!t[s]&&\"string\"!=typeof t)throw new TypeError(\"Expected a SourceNode, string, or an array of SourceNodes and strings. Got \"+t);t&&this.children.push(t)}return this},a.prototype.prepend=function(t){if(Array.isArray(t))for(var e=t.length-1;e>=0;e--)this.prepend(t[e]);else{if(!t[s]&&\"string\"!=typeof t)throw new TypeError(\"Expected a SourceNode, string, or an array of SourceNodes and strings. Got \"+t);this.children.unshift(t)}return this},a.prototype.walk=function(t){for(var e,n=0,r=this.children.length;n<r;n++)(e=this.children[n])[s]?e.walk(t):\"\"!==e&&t(e,{source:this.source,line:this.line,column:this.column,name:this.name})},a.prototype.join=function(t){var e,n,r=this.children.length;if(r>0){for(e=[],n=0;n<r-1;n++)e.push(this.children[n]),e.push(t);e.push(this.children[n]),this.children=e}return this},a.prototype.replaceRight=function(t,e){var n=this.children[this.children.length-1];return n[s]?n.replaceRight(t,e):\"string\"==typeof n?this.children[this.children.length-1]=n.replace(t,e):this.children.push(\"\".replace(t,e)),this},a.prototype.setSourceContent=function(t,e){this.sourceContents[i.toSetString(t)]=e},a.prototype.walkSourceContents=function(t){for(var e=0,n=this.children.length;e<n;e++)this.children[e][s]&&this.children[e].walkSourceContents(t);var r=Object.keys(this.sourceContents);for(e=0,n=r.length;e<n;e++)t(i.fromSetString(r[e]),this.sourceContents[r[e]])},a.prototype.toString=function(){var t=\"\";return this.walk(function(e){t+=e}),t},a.prototype.toStringWithSourceMap=function(t){var e={code:\"\",line:1,column:0},n=new r(t),i=!1,o=null,s=null,a=null,u=null;return this.walk(function(t,r){e.code+=t,null!==r.source&&null!==r.line&&null!==r.column?(o===r.source&&s===r.line&&a===r.column&&u===r.name||n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:e.line,column:e.column},name:r.name}),o=r.source,s=r.line,a=r.column,u=r.name,i=!0):i&&(n.addMapping({generated:{line:e.line,column:e.column}}),o=null,i=!1);for(var c=0,f=t.length;c<f;c++)10===t.charCodeAt(c)?(e.line++,e.column=0,c+1===f?(o=null,i=!1):i&&n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:e.line,column:e.column},name:r.name})):e.column++}),this.walkSourceContents(function(t,e){n.setSourceContent(t,e)}),{code:e.code,map:n}},e.SourceNode=a}])},\"object\"==typeof n&&\"object\"==typeof e?e.exports=i():\"function\"==typeof define&&define.amd?define(\"source-map\",[],i):\"object\"==typeof n?n.sourceMap=i():r.sourceMap=i()},{}],19:[function(t,e,n){const r=t(\"./parser\");e.exports=function(){var t=r.StringParser,e=\"SAMENAME\",n=t.reg(/^(\\s*(\\/\\*\\/?([^\\/]|[^*]\\/|\\r|\\n)*\\*\\/)*(\\/\\/.*\\r?\\n)*)*/).setName(\"space\");function i(e,r){var i,o;\"string\"==typeof e?(i=t.str(e),e.length>0&&(o=e.substring(0,1)),r||(r=e)):(i=t.reg(e),r||(r=e+\"\"));var s=n.and(i).ret(function(t,e){var n={};if(n.pos=e.pos,\"number\"!=typeof n.pos)throw\"no pos for \"+r+\" \";if(n.len=e.len,n.text=e.src.str.substring(n.pos,n.pos+n.len),\"string\"!=typeof n.text)throw\"no text(\"+n.text+\") for \"+r+\" \";return n.toString=function(){return this.text},n.isToken=!0,n});return o&&(s=s.first(n,o)),s.setName(r)}var o={},s={};function a(t,e,n,r){\"string\"==typeof n&&(n=i(n)),o[t]=c(o[t],n.ret(function(t){return t.type=e,t}).setName(e))}function u(t,n,r,i){n==e&&(n=r);for(var o=1;o<=t;o*=2)0!=(t&o)&&a(t&o,n,r);s[n]=i}function c(t,e){return t?t.or(e):e}var f=r.create(function(t){for(var e=2,r=[];(t=o[e].parse(t)).success;){var i=t.result[0];e=s[i.type],r.push(i)}return(t=n.parse(t)).success=t.src.maxPos==t.src.str.length,t.result[0]=r,t}),l={function:!0,var:!0,return:!0,typeof:!0,if:!0,__typeof:!0,for:!0,else:!0,super:!0,while:!0,continue:!0,break:!0,do:!0,switch:!0,case:!0,default:!0,try:!0,catch:!0,finally:!0,throw:!0,of:!0,in:!0,fiber:!0,native:!0,instanceof:!0,new:!0,is:!0,true:!0,false:!0,null:!0,this:!0,undefined:!0,usethread:!0,constructor:!0,ifwait:!0,nowait:!0,_thread:!0,arguments:!0,delete:!0,extends:!0,includes:!0},p=i(/^[0-9][xb]?[0-9a-f\\.]*/i).ret(function(t){return t.type=\"number\",t.value=t.text-0,t}).first(n,\"0123456789\"),h=i({exec:function(t){var e=t.substring(0,1);if('\"'!==e&&\"'\"!==e)return!1;for(var n=1;n<t.length;n++){var r=t.substring(n,n+1);if(r===e)return[t.substring(0,n+1)];\"\\\\\"===r&&n++}return!1},toString:function(){return\"literal\"}}).first(n,\"\\\"'\"),d=i({exec:function(t){if(\"/\"!==t.substring(0,1))return!1;for(var e=1;e<t.length;e++){var n=t.substring(e,e+1);if(\"/\"===n){var r=/^[ig]*/.exec(t.substring(e+1));return[t.substring(0,e+1+r[0].length)]}if(\"\\n\"==n)return!1;\"\\\\\"===n&&e++}return!1},toString:function(){return\"regex\"}}).first(n,\"/\");u(3,\"number\",p,1),u(2,\"regex\",d,1),u(3,\"literal\",h,1),u(3,e,\"++\",1),u(3,e,\"--\",1),u(3,e,\"!==\",2),u(3,e,\"===\",2),u(3,e,\">>>\",2),u(3,e,\"+=\",2),u(3,e,\"-=\",2),u(3,e,\"*=\",2),u(3,e,\"/=\",2),u(3,e,\"%=\",2),u(3,e,\">=\",2),u(3,e,\"<=\",2),u(3,e,\"!=\",2),u(3,e,\"==\",2),u(3,e,\">>\",2),u(3,e,\"<<\",2),u(3,e,\"&&\",2),u(3,e,\"||\",2),u(3,e,\"(\",2),u(3,e,\")\",1),u(3,e,\"[\",2),u(3,e,\"]\",1),u(3,e,\"{\",2),u(3,e,\"}\",1),u(3,e,\">\",2),u(3,e,\"<\",2),u(3,e,\"^\",2),u(3,e,\"+\",2),u(3,e,\"-\",2),u(3,e,\".\",2),u(3,e,\"?\",2),u(3,e,\"=\",2),u(3,e,\"*\",2),u(3,e,\"%\",2),u(1,e,\"/\",2),u(3,e,\"^\",2),u(3,e,\"~\",2),u(3,e,\"\\\\\",2),u(3,e,\":\",2),u(3,e,\";\",2),u(3,e,\",\",2),u(3,e,\"!\",2),u(3,e,\"&\",2),u(3,e,\"|\",2);var m=i(/^[a-zA-Z_$][a-zA-Z0-9_$]*/,\"symresv_reg\").ret(function(t){return t.type=\"constructor\"==t.text?\"tk_constructor\":l.hasOwnProperty(t.text)?t.text:\"symbol\",t}).first(n);for(var g in l)s[g]=2;return s.tk_constructor=2,s.symbol=1,o[2]=c(o[2],m),o[1]=c(o[1],m),{parse:function(t){var e=r.StringParser.parse(f,t);return e.success||console.log(\"Stopped at \"+t.substring(e.src.maxPos-5,e.src.maxPos+5)),e},extension:\"js\",reserved:l}}()},{\"./parser\":17}],20:[function(t,e,n){var r,i,o,s,a;e.exports=(a=0,(s={}).def=function(t,e,n){var r=s.getModuleInfo(t);\"function\"==typeof e?(n=e,e=s.reqsFromFunc(n),s.setReqs(r,e),r.func=function(){var t={exports:{}};return n(s.doLoad,t,t.exports)||t.exports}):(s.setReqs(r,e),r.func=function(){return n.apply(this,s.getObjs(e))}),s.loadIfAvailable(r)},(r=function(t,e,n){s.def(t,e,n)}).amd={},i=function(t,e){s.def(\"REQJS_\"+a++,t,e)},s.setReqs=function(t,e){e.forEach(function(e){var n=s.getModuleInfo(e);n.loaded||(t.reqs[e]=n,n.revReqs[t.name]=t)})},s.getModuleInfo=function(t){var e=s.modules;return e[t]=e[t]||{name:t,reqs:{},revReqs:{}}},s.doLoad=function(t){var e=s.getModuleInfo(t);if(e.loaded)return e.obj;e.loaded=!0;var n=e.func();for(var r in null!=n||t.match(/^REQJS_/)||console.log(\"Warning: No obj for \"+t),e.obj=n,e.revReqs)s.notifyLoaded(e.revReqs[r],e.name);return n},s.notifyLoaded=function(t,e){delete t.reqs[e],s.loadIfAvailable(t)},s.loadIfAvailable=function(t){for(var e in t.reqs)return;s.doLoad(t.name)},s.getObjs=function(t){var e=[];return t.forEach(function(t){var n=s.doLoad(t);e.push(n)}),e},s.reqsFromFunc=function(t){var e=[];return(t+\"\").replace(/require\\s*\\(\\s*[\"']([^\"']+)[\"']\\s*\\)/g,function(t,n){e.push(n)}),e},s.modules={},r(\"extend\",[],function(){return function(t,e){for(var n in e)t[n]=e[n];return t}}),r(\"assert\",[],function(){var t,e=function(t){this.failMesg=i(t||\"Assertion failed: \")};e.prototype={_regedType:{},registerType:function(t,e){this._regedType[t]=e},MODE_STRICT:\"strict\",MODE_DEFENSIVE:\"defensive\",MODE_BOOL:\"bool\",fail:function(){var e=t(arguments),n=e.shift();if(e=i(e),e=this.failMesg.concat(n).concat(e),console.log.apply(console,e),this.isDefensive())return n;if(this.isBool())return!1;throw new Error(e.join(\" \"))},subAssertion:function(){var n=t(arguments);return n=i(n),new e(this.failMesg.concat(n))},assert:function(t,e){return t||this.fail(t,e)},eq:function(t,e){return t!==e?this.fail(t,\"!==\",e):!!this.isBool()||t},ne:function(t,e){return t===e?this.fail(t,\"===\",e):!!this.isBool()||t},isset:function(t,e){return null==t?this.fail(t,(e||\"\")+\" is null/undef\"):!!this.isBool()||t},is:function(t,e){var n=e,r=t;if(null==n)return this.fail(t,\"assert.is: type must be set\");if(n._assert_func)return n._assert_func.apply(this,[r]),!!this.isBool()||t;if(this.assert(null!=t,[t,\"should be \",n]),n instanceof Array||\"object\"==typeof global&&\"function\"==typeof global.Array&&n instanceof global.Array){if(!t||\"number\"!=typeof t.length)return this.fail(t,\"should be array:\");for(var i=0;i<n.length;i++){var o=this.subAssertion(\"failed at \",t,\"[\",i,\"]: \");null==n[i]&&console.log(\"WOW!7\",r[i],n[i]),o.is(r[i],n[i])}return!!this.isBool()||t}if(n===String||\"string\"==n)return this.assert(\"string\"==typeof r,[r,\"should be a string \"]),!!this.isBool()||t;if(n===Number||\"number\"==n)return this.assert(\"number\"==typeof r,[r,\"should be a number\"]),!!this.isBool()||t;if(n===Boolean||\"boolean\"==n)return this.assert(\"boolean\"==typeof r,[r,\"should be a boolean\"]),!!this.isBool()||t;if(n instanceof RegExp||\"object\"==typeof global&&\"function\"==typeof global.RegExp&&n instanceof global.RegExp)return this.is(r,String),this.assert(n.exec(r),[r,\"does not match to\",n]),!!this.isBool()||t;if(n===Function)return this.assert(\"function\"==typeof r,[r,\"should be a function\"]),!!this.isBool()||t;if(\"function\"==typeof n)return this.assert(r instanceof n,[r,\"should be \",n]),!!this.isBool()||t;if(n&&\"object\"==typeof n){for(var s in n)(o=this.subAssertion(\"failed at \",t,\".\",s,\":\")).is(t[s],n[s]);return!!this.isBool()||t}if(\"string\"==typeof n){var a=this._regedType[n];return a?this.is(t,a):!!this.isBool()||t}return this.fail(t,\"Invaild type: \",n)},ensureError:function(t,e){try{t()}catch(n){return\"string\"==typeof e&&r(n+\"\"===e,t+\" thrown an error \"+n+\" but expected:\"+e),void console.log(\"Error thrown successfully: \",n.message)}this.fail(t,\"should throw an error\",e)},setMode:function(t){this._mode=t},isDefensive:function(){return this._mode===this.MODE_DEFENSIVE},isBool:function(){return this._mode===this.MODE_BOOL},isStrict:function(){return!this.isDefensive()&&!this.isBool()}},t=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e};var n=new e,r=function(){try{return n.assert.apply(n,arguments)}catch(t){throw new Error(t.stack)}};function i(t){if(t instanceof Array){var e=[];return t.forEach(function(t){e=e.concat(i(t))}),e}return[t]}return[\"setMode\",\"isDefensive\",\"is\",\"isset\",\"ne\",\"eq\",\"ensureError\"].forEach(function(t){r[t]=function(){try{return n[t].apply(n,arguments)}catch(t){throw console.log(t.stack),new Error(t.message)}}}),r.fail=n.fail.bind(n),r.MODE_STRICT=n.MODE_STRICT,r.MODE_DEFENSIVE=n.MODE_DEFENSIVE,r.MODE_BOOL=n.MODE_BOOL,r.f=function(t){return{_assert_func:t}},r.opt=function(t){return r.f(function(e){return null==e||e instanceof t})},r.and=function(){var e=t(arguments);return r(e instanceof Array),r.f(function(t){for(var n=0;n<e.length;n++)this.is(t,e[n])})},r}),r(\"PathUtil\",[\"assert\"],function(t){function e(e,n){return t.is(arguments,[String,String]),e.substring(e.length-n.length)===n}var n,r=/^([a-zA-Z]):/,i=/^([a-z\\-]+):\\/\\/\\/?([^\\/]+)\\//,o=t.f(function(t){this.is(t,String),this.assert(n.isPath(t),[t,\" is not a path\"])}),s=t.f(function(t){this.is(t,String),this.assert(n.isAbsolutePath(t),[t,\" is not a absolute path\"])}),a=t.f(function(t){this.is(t,String),this.assert(!n.isAbsolutePath(t),[t,\" is not a relative path\"])}),u=t.f(function(t){this.is(t,o),this.assert(n.isDir(t),[t,\" is not a directory path\"])}),c=t.and(u,s),f=t.f(function(t){this.is(t,o),this.assert(!n.isDir(t),[t,\" is not a file path\"])});return n={Path:o,Absolute:s,Relative:a,Dir:u,File:f,AbsDir:c,SEP:\"/\",endsWith:e,startsWith:function(e,n){return t.is(arguments,[String,String]),e.substring(0,n.length)===n},isChildOf:function(t,e){return this.startsWith(this.normalize(t),this.normalize(e))},normalize:function(t){return this.fixSep(t,\"/\").replace(/\\/+$/,\"/\")},hasDriveLetter:function(t){return r.exec(t)},isURL:function(t){var e=i.exec(t);if(e)return{protocol:e[1],hostPort:e[2],path:\"/\"+t.substring(e[0].length)}},isPath:function(e){return t.is(arguments,[String]),!0},isRelativePath:function(e){return t.is(arguments,[String]),n.isPath(e)&&!n.isAbsolutePath(e)},isAbsolutePath:function(e){return t.is(arguments,[String]),n.isPath(e)&&(n.startsWith(e,\"/\")||n.hasDriveLetter(e)||n.isURL(e))},isDir:function(r){return r=n.fixSep(r),t.is(arguments,[o]),e(r,\"/\")},hasBackslashSep:function(t){return t.indexOf(\"\\\\\")>=0},fixSep:function(e,n){return n=n||\"/\",t.is(arguments,[String]),t.is(e.replace(/[\\\\\\/]/g,n),o)},directorify:function(e){return n.isDir(e)?e:t.is(e+\"/\",u)},filify:function(e){return n.isDir(e)?t.is(e.substring(0,e.length-1),f):e},splitPath:function(e){var n;if(t.is(arguments,[o]),n=this.isURL(e)){var r=this.splitPath(n.path);return r[0]=n.protocol+\"://\"+n.hostPort,r}var i=(e=e.replace(/\\/+/g,\"/\")).split(\"/\");return\"\"==i[i.length-1]&&(i[i.length-2]+=\"/\",i.pop()),i},name:function(e){return t.is(arguments,[String]),n.splitPath(e).pop()},ext:function(e){t.is(arguments,[String]);var r=n.name(e),i=/\\.[a-zA-Z0-9]+$/.exec(r);return i?i[0]:null},truncExt:function(e,r){t.is(e,String);var i=n.name(e);return r=r||n.ext(e),t.is(r,String),i.substring(0,i.length-r.length)},truncSEP:function(e){return t.is(arguments,[o]),n.isDir(e)?e.substring(0,e.length-1):e},endsWith:function(r,i){return t.is(arguments,[String,String]),e(n.name(r),i)},parent:function(e){return t.is(arguments,[String]),n.up(e)},rel:function(e,r){if(\"\"==r)return e;t.is(arguments,[c,a]);var i=n.splitPath(r),o=e;o=o.replace(/\\/$/,\"\");var s=n;return i.forEach(function(t){\"..\"==t||\"../\"==t?o=s.up(o):(o=o.replace(/\\/$/,\"\"),o+=\"/\"+(\".\"==t||\"./\"==t?\"\":t))}),o},relPath:function(e,r){return t.is(arguments,[s,s]),e.substring(0,r.length)!=r?\"../\"+n.relPath(e,this.up(r)):e.substring(r.length)},up:function(t){if(\"/\"==t)return null;var e=n.splitPath(t);return e.pop(),e.join(\"/\")+\"/\"}},[\"directorify\",\"filify\",\"splitPath\",\"name\",\"rel\",\"relPath\",\"up\"].forEach(function(t){var e=n[t];n[t]=function(){var t=!1,r=Array.prototype.slice.call(arguments).map(function(e){return n.hasBackslashSep(e)?(t=!0,n.fixSep(e)):e}),i=e.apply(n,r);return t?n.fixSep(i,\"\\\\\"):i}}),n.isAbsolute=n.isAbsolutePath,n.isRelative=n.isRelativePath,\"object\"==typeof window&&(window.PathUtil=n),n}),r(\"MIMETypes\",[],function(){return{\".png\":\"image/png\",\".gif\":\"image/gif\",\".jpeg\":\"image/jpeg\",\".jpg\":\"image/jpeg\",\".ico\":\"image/icon\",\".wav\":\"audio/x-wav\",\".mp3\":\"audio/mp3\",\".ogg\":\"audio/ogg\",\".midi\":\"audio/midi\",\".mid\":\"audio/midi\",\".mzo\":\"audio/mzo\",\".txt\":\"text/plain\",\".html\":\"text/html\",\".htm\":\"text/html\",\".css\":\"text/css\",\".js\":\"text/javascript\",\".json\":\"text/json\",\".zip\":\"application/zip\",\".swf\":\"application/x-shockwave-flash\",\".pdf\":\"application/pdf\",\".doc\":\"application/word\",\".xls\":\"application/excel\",\".ppt\":\"application/powerpoint\",\".docx\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\",\".docm\":\"application/vnd.ms-word.document.macroEnabled.12\",\".dotx\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.template\",\".dotm\":\"application/vnd.ms-word.template.macroEnabled.12\",\".xlsx\":\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\".xlsm\":\"application/vnd.ms-excel.sheet.macroEnabled.12\",\".xltx\":\"application/vnd.openxmlformats-officedocument.spreadsheetml.template\",\".xltm\":\"application/vnd.ms-excel.template.macroEnabled.12\",\".xlsb\":\"application/vnd.ms-excel.sheet.binary.macroEnabled.12\",\".xlam\":\"application/vnd.ms-excel.addin.macroEnabled.12\",\".pptx\":\"application/vnd.openxmlformats-officedocument.presentationml.presentation\",\".pptm\":\"application/vnd.ms-powerpoint.presentation.macroEnabled.12\",\".potx\":\"application/vnd.openxmlformats-officedocument.presentationml.template\",\".potm\":\"application/vnd.ms-powerpoint.template.macroEnabled.12\",\".ppsx\":\"application/vnd.openxmlformats-officedocument.presentationml.slideshow\",\".ppsm\":\"application/vnd.ms-powerpoint.slideshow.macroEnabled.12\",\".ppam\":\"application/vnd.ms-powerpoint.addin.macroEnabled.12\",\".tonyu\":\"text/tonyu\",\".c\":\"text/c\",\".dtl\":\"text/dolittle\"}}),r(\"DeferredUtil\",[],function(){var t,e=\"undefined\"!=typeof window?window:\"undefined\"!=typeof self?self:\"undefined\"!=typeof global?global:null,n=function(t){this.res=t};function r(t){return t}return(t={isNativePromise:function(t){return t&&\"function\"==typeof t.then&&\"function\"!=typeof t.promise&&\"function\"==typeof t.catch},isJQPromise:function(t){return t&&\"function\"==typeof t.then&&\"function\"==typeof t.promise&&\"function\"==typeof t.fail},isPromise:function(t){return t&&\"function\"==typeof t.then&&(\"function\"==typeof t.promise||\"function\"==typeof t.catch)},all:function(e){return t.promise(function(n,r){var i=[],o=e.length;e.forEach(function(e,s){t.resolve(e).then(function(t){i[s]=t,0==--o&&n(i)},r)})})},resolve:function(e){return t.config.useJQ&&t.isJQPromise(e)?e:!t.config.useJQ&&t.isNativePromise(e)?e:t.promise(function(n,r){t.isPromise(e)?e.then(n,r):n(e)})},throwNowIfRejected:function(e){var n,r,i=e.then(function(t){return n||(n=\"resolved\"),t},function(e){if(n)return t.reject(e);n=\"rejected\",r=e});if(n||(n=\"notyet\"),\"rejected\"===n)throw r;return i},assertResolved:function(t){var e,n;if(t.then(function(t){e=t,n=!0}),!n)throw new Error(\"Promise not resolved\");return e},ensureDefer:function(e){return t.promise(function(n,i){var o;t.resolve(e).then(function(t){o?n(t):setTimeout(function(){n(t)},0)}).then(r,function(t){o?i(t):setTimeout(function(){i(t)},0)}),o=!0})},directPromise:function(e){return t.timeout(e,0)},then:function(e){return t.directPromise().then(e)},timeout:function(e,n){return t.promise(function(t){setTimeout(function(){t(n)},e||0)})},funcPromise:function(e){if(t.config.useJQ){var n=new $.Deferred;try{e(function(t){n.resolve(t)},function(t){n.reject(t)})}catch(t){n.reject(t)}return n.promise()}if(t.external.Promise)return new t.external.Promise(function(t,n){try{e(t,n)}catch(t){n(t)}});throw new Error(\"promise is not found\")},reject:function(e){if(t.config.useJQ){var n=new $.Deferred;return n.reject(e),n.promise()}return new t.external.Promise(function(t,n){n(e)})},throwPromise:function(e){if(t.config.useJQ){var n=new $.Deferred;return setTimeout(function(){n.reject(e)},0),n.promise()}return new t.external.Promise(function(t,n){n(e)})},throwF:function(e){return function(){try{return e.apply(this,arguments)}catch(e){return console.log(e,e.stack),t.throwPromise(e)}}},each:function(e,n){if(e instanceof Array)return t.loop(function(r){return r>=e.length?t.brk():t.resolve(n(e[r],r)).then(function(){return r+1})},0);var r=[];for(var i in e)r.push({k:i,v:e[i]});return t.each(r,function(t){return n(t.k,t.v)})},loop:function(e,i){try{for(var o;;){if(i instanceof n)return t.when1(i.res);var s=!0,a=!1,u=e(i),c=t.resolve(u).then(function(r){return s=!1,(i=r)instanceof n?i.res:a?t.loop(e,i):void 0}).then(r,function(t){s=!1,o=t});if(o)throw o;if(a=!0,s)return c}}catch(e){return t.reject(e)}},brk:function(t){return new n(t)},tryLoop:function(e,n){return t.loop(t.tr(e),n)},tryEach:function(e,n){return t.loop(e,t.tr(n))},documentReady:function(){return t.callbackToPromise(function(t){$(t)})},requirejs:function(n){if(!e.requirejs)throw new Error(\"requirejs is not loaded\");return t.callbackToPromise(function(t){e.requirejs(n,t)})}}).NOP=function(t){return t},t.E=function(){console.log(\"DUE\",arguments),t.errorHandler.apply(t,arguments)},t.errorHandler=function(t){console.error.apply(console,arguments),alert(t)},t.setE=function(e){t.errorHandler=e},t.begin=t.try=t.tr=t.throwF,t.promise=t.callbackToPromise=t.funcPromise,t.when1=t.resolve,t.config={},e.$&&e.$.Deferred&&(t.config.useJQ=!0),t.external={Promise:e.Promise},e.DeferredUtil||(e.DeferredUtil=t),t}),r(\"FSClass\",[\"extend\",\"PathUtil\",\"MIMETypes\",\"assert\",\"DeferredUtil\"],function(t,e,n,r,i){var o=function(){},s={};function a(t){throw new Error(t+\" is STUB!\")}return o.addFSType=function(t,e){s[t]=e},o.availFSTypes=function(){return s},t(o.prototype,{err:function(t,e){throw new Error(t+\": \"+e)},fstype:function(){return\"Unknown\"},isReadOnly:function(t,e){a(\"isReadOnly\")},supportsSync:function(){return!0},resolveFS:function(t,e){return r(this.getRootFS()!==this),this.getRootFS().resolveFS(t)},mounted:function(t,e){this.rootFS=t,this.mountPoint=e},inMyFS:function(t){return!this.mountPoint||e.startsWith(t,this.mountPoint)},getRootFS:function(){return r(this.rootFS,\"rootFS is not set\")},getReturnTypes:function(t,e){a(\"\")},getContent:function(t,e){a(\"getContent\")},size:function(t){return this.getContent(t,{type:ArrayBuffer}).toBin().byteLength},getContentAsync:function(t,e){return this.supportsSync()||a(\"getContentAsync\"),i.resolve(this.getContent.apply(this,arguments))},setContent:function(t,e,n){a(\"\")},setContentAsync:function(t,e,n){var r=this;return r.supportsSync()||a(\"setContentAsync\"),i.resolve(e).then(function(e){return i.resolve(r.setContent(t,e,n))})},appendContent:function(t,e,n){a(\"\")},appendContentAsync:function(t,e,n){var r=this;return r.supportsSync()||a(\"appendContentAsync\"),i.resolve(e).then(function(e){return i.resolve(r.appendContent(t,e,n))})},getMetaInfo:function(t,e){a(\"\")},setMetaInfo:function(t,e,n){a(\"\")},mkdir:function(t,e){a(\"mkdir\")},touch:function(t){a(\"touch\")},exists:function(t,e){a(\"exists\")},opendir:function(t,e){a(\"opendir\")},opendirAsync:function(t,e){return this.supportsSync()||a(\"opendirAsync\"),i.resolve(this.opendir.apply(this,arguments))},cp:function(t,n,i){r.is(arguments,[e.Absolute,e.Absolute]),this.assertExist(t),i=i||{};var o=this.isDir(t),s=this.getRootFS().resolveFS(n),a=s.isDir(n);if(o||a)throw new Error(\"only file to file supports\");if(this.supportsSync()&&s.supportsSync()){var u=this.getContent(t),c=s.setContent(n,u);return i.a&&s.setMetaInfo(n,this.getMetaInfo(t)),c}return s.setContentAsync(n,this.getContentAsync(t)).then(function(e){return i.a?s.setMetaInfo(n,this.getMetaInfo(t)):e})},mv:function(t,e,n){return this.cp(t,e,n),this.rm(t,{r:!0})},rm:function(t,e){a(\"\")},link:function(t,e,n){throw new Error(\"ln \"+e+\" \"+t+\" : This FS not support link.\")},getURL:function(t){a(\"\")},onAddObserver:function(t){}}),o.delegateMethods=function(t,n){for(var i in n)!function(i){r.ne(i,\"inMyFS\"),t[i]=function(){var t=arguments[0];r.is(t,e.Absolute);var o=this.resolveFS(t);return o!==this?(console.log(\"Invoked for other fs\",this.mountPoint,o.mountPoint),o[i].apply(o,arguments)):n[i].apply(this,arguments)}}(i)},o.delegateMethods(o.prototype,{assertWriteable:function(t){this.isReadOnly(t)&&this.err(t,\"read only.\")},getContentType:function(t,r){var i=(e.ext(t)+\"\").toLowerCase();return n[i]||(r||{}).def||\"application/octet-stream\"},getBlob:function(t,e){var n=this.getContent(t);return(e=e||{}).blobType=e.blobType||Blob,e.binType=e.binType||ArrayBuffer,n.hasPlainText()?new e.blobType([n.toPlainText()],this.getContentType(t)):new e.blobType([n.toBin(e.binType)],this.getContentType(t))},isText:function(t){var n=this.getContentType(t);return e.startsWith(n,\"text\")},assertExist:function(t,n){this.exists(t,n)||this.err(t,\": No such \"+(e.isDir(t)?\"directory\":\"file\"))},isDir:function(t,n){return e.isDir(t)},find:function(t,n){r.is(arguments,[e.Absolute]);var i=this.opendir(t,n),o=this,s=[t];return i.forEach(function(r){var i=e.rel(t,r);if(e.isDir(i)){var a=o.resolveFS(i);s=s.concat(a.find(i,n))}else s.push(i)}),s},resolveLink:function(t){r.is(t,e.Absolute);for(var n=t;n;n=e.up(n)){r(!this.mountPoint||e.startsWith(n,this.mountPoint),n+\" is out of mountPoint. path=\"+t);var i=this.isLink(n);if(i){r(i!=n,\"l==p==\"+i);var o=e.rel(i,e.relPath(t,n));return r(o!=t,\"np==path==\"+o),r.is(this.getRootFS().resolveFS(o).resolveLink(o),e.Absolute)}if(this.exists(n))return t}return t},isLink:function(t){return null},opendirEx:function(t,n){r.is(t,e.AbsDir);var i=this,o={};return this.opendir(t).forEach(function(n){var r=e.rel(t,n);o[n]=i.getMetaInfo(r)}),o},getDirTree:function(t,n){var i=(n=n||{}).dest=n.dest||{};n.style=n.style||\"flat-absolute\",n.excludes=n.excludes||[],r.is(n.excludes,Array),n.base||(n.base=t),r.is(t,e.AbsDir);var o=this.opendirEx(t,n);if(\"no-recursive\"==n.style)return o;var s=this;for(var a in o){var u=o[a],c=e.rel(t,a),f=e.relPath(c,n.base);switch(n.style){case\"flat-relative\":case\"hierarchical\":if(n.excludes.indexOf(f)>=0)continue;break;case\"flat-absolute\":if(n.excludes.indexOf(c)>=0)continue}if(s.isDir(c))switch(n.style){case\"flat-absolute\":case\"flat-relative\":s.getDirTree(c,n);break;case\"hierarchical\":n.dest={},i[a]=s.getDirTree(c,n)}else switch(n.style){case\"flat-absolute\":i[c]=u;break;case\"flat-relative\":i[f]=u;break;case\"hierarchical\":i[a]=u}}return i}}),o}),r(\"Util\",[],function(){return{getQueryString:function(t,e){null==e&&(e=\"\"),t=t.replace(/[\\[]/,\"\\\\[\").replace(/[\\]]/,\"\\\\]\");var n,r=new RegExp(\"[\\\\?&]\"+t+\"=([^&#]*)\").exec(window.location.href);return null==r?e:(n=r[1],decodeURIComponent(n.replace(/\\+/g,\"%20\")))},endsWith:function(t,e){return t.substring(t.length-e.length)===e},startsWith:function(t,e){return t.substring(0,e.length)===e},privatize:function(t){if(t.__privatized)return t;var e={__privatized:!0};for(var n in t)!function(n){var r=t[n];n.match(/^_/)||\"function\"==typeof r&&(e[n]=function(){return r.apply(t,arguments)})}(n);return e},extend:function(t,e){for(var n in e||{})t[n]=e[n];return t}}}),r(\"FileSaver\",[],function(){var t=\"object\"==typeof window&&window.window===window?window:\"object\"==typeof self&&self.self===self?self:\"object\"==typeof global&&global.global===global?global:this;function n(t,e,n){var r=new XMLHttpRequest;r.open(\"GET\",t),r.responseType=\"blob\",r.onload=function(){o(r.response,e,n)},r.onerror=function(){console.error(\"could not download file\")},r.send()}function r(t){var e=new XMLHttpRequest;return e.open(\"HEAD\",t,!1),e.send(),e.status>=200&&e.status<=299}function i(t){try{t.dispatchEvent(new MouseEvent(\"click\"))}catch(n){var e=document.createEvent(\"MouseEvents\");e.initMouseEvent(\"click\",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var o=t.saveAs||\"object\"!=typeof window||window!==t?function(){}:\"download\"in HTMLAnchorElement.prototype?function(e,o,s){var a=t.URL||t.webkitURL,u=document.createElement(\"a\");o=o||e.name||\"download\",u.download=o,u.rel=\"noopener\",\"string\"==typeof e?(u.href=e,u.origin!==location.origin?r(u.href)?n(e,o,s):i(u,u.target=\"_blank\"):i(u)):(u.href=a.createObjectURL(e),setTimeout(function(){a.revokeObjectURL(u.href)},4e4),setTimeout(function(){i(u)},0))}:\"msSaveOrOpenBlob\"in navigator?function(t,e,o){if(e=e||t.name||\"download\",\"string\"==typeof t)if(r(t))n(t,e,o);else{var s=document.createElement(\"a\");s.href=t,s.target=\"_blank\",setTimeout(function(){i(s)})}else navigator.msSaveOrOpenBlob(function(t,e){return void 0===e?e={autoBom:!1}:\"object\"!=typeof e&&(console.warn(\"Depricated: Expected third argument to be a object\"),e={autoBom:!e}),e.autoBom&&/^\\s*(?:text\\/\\S*|application\\/xml|\\S*\\/\\S*\\+xml)\\s*;.*charset\\s*=\\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}(t,o),e)}:function(e,r,i,o){if((o=o||open(\"\",\"_blank\"))&&(o.document.title=o.document.body.innerText=\"downloading...\"),\"string\"==typeof e)return n(e,r,i);var s=\"application/octet-stream\"===e.type,a=/constructor/i.test(t.HTMLElement)||t.safari,u=/CriOS\\/[\\d]+/.test(navigator.userAgent);if((u||s&&a)&&\"object\"==typeof FileReader){var c=new FileReader;c.onloadend=function(){var t=c.result;t=u?t:t.replace(/^data:[^;]*;/,\"data:attachment/file;\"),o?o.location.href=t:location=t,o=null},c.readAsDataURL(e)}else{var f=t.URL||t.webkitURL,l=f.createObjectURL(e);o?o.location=l:location.href=l,o=null,setTimeout(function(){f.revokeObjectURL(l)},4e4)}};return t.saveAs=o.saveAs=o,void 0!==e&&(e.exports=o),o}),r(\"Content\",[\"assert\",\"Util\",\"FileSaver\"],function(t,e,n){var r=function(){},i=e.extend;r.plainText=function(t,e){var n=new r;return n.contentType=e||\"text/plain\",n.plain=t,n},r.url=function(t){var e=new r;return e.url=t,e},r.buffer2ArrayBuffer=function(e){if(r.isBuffer(e)){var n=new Uint8Array(e),i=n.buffer;if(i instanceof ArrayBuffer)return i;var o=Array.prototype.slice.call(n);return t(new Uint8Array(o).buffer,\"n2a: buf is not set\")}return t(e,\"n2a: a is not set\")},r.arrayBuffer2Buffer=function(e){return e instanceof ArrayBuffer?new Buffer(new Uint8Array(e)):t(e,\"a2n: a is not set\")},r.bin=function(e,n){t(n,\"contentType should be set\");var i=new r;if(r.isNodeBuffer(e))i.bufType=\"node\",i.nodeBuffer=e;else if(e instanceof ArrayBuffer)i.bufType=\"array2\",i.arrayBuffer=e;else{if(!e||!r.isBuffer(e.buffer))throw new Error(e+\" is not a bin\");i.bufType=\"array1\",i.arrayBuffer=e.buffer}return i.contentType=n,i},r.looksLikeDataURL=function(t){return t.match(/^data:/)},r.download=n;var o=r.prototype;o.toBin=function(t){if(t=t||(r.hasNodeBuffer()?Buffer:ArrayBuffer),this.nodeBuffer)return t===Buffer?this.nodeBuffer:this.arrayBuffer=r.buffer2ArrayBuffer(this.nodeBuffer);if(this.arrayBuffer)return t===ArrayBuffer?this.arrayBuffer:this.nodeBuffer=r.arrayBuffer2Buffer(this.arrayBuffer);if(this.url){var e=new a(this.url,t);return this.setBuffer(e.buffer)}if(null!=this.plain)return this.setBuffer(r.str2utf8bytes(this.plain,t));throw new Error(\"No data\")},o.setBuffer=function(e){return t(e,\"b is not set\"),r.isNodeBuffer(e)?this.nodeBuffer=e:this.arrayBuffer=e},o.toArrayBuffer=function(){return this.toBin(ArrayBuffer)},o.toNodeBuffer=function(){return this.toBin(Buffer)},o.toURL=function(){if(this.url)return this.url;if(this.arrayBuffer||null==this.plain||(this.arrayBuffer=r.str2utf8bytes(this.plain,ArrayBuffer)),this.arrayBuffer||this.nodeBuffer){var t=new a(this.arrayBuffer||this.nodeBuffer,this.contentType);return this.url=t.url}throw new Error(\"No data\")},o.toPlainText=function(){if(this.hasPlainText())return this.plain;if(this.url&&!this.hasBin()){var t=new a(this.url,ArrayBuffer);this.arrayBuffer=t.buffer}if(this.hasBin())return this.plain=r.utf8bytes2str(this.nodeBuffer||new Uint8Array(this.arrayBuffer));throw new Error(\"No data\")},o.hasURL=function(){return this.url},o.hasPlainText=function(){return null!=this.plain},o.hasBin=function(){return this.nodeBuffer||this.arrayBuffer},o.hasNodeBuffer=function(){return this.nodeBuffer},o.hasArrayBuffer=function(){return this.arrayBuffer},o.toBlob=function(){return new Blob([this.toBin(ArrayBuffer)],{type:this.contentType})},o.download=function(t){r.download(this.toBlob(),t)},r.Base64_To_ArrayBuffer=function(t,e){var n=e||ArrayBuffer;t=t.replace(/[\\n=]/g,\"\");var i=new Object;i[65]=0,i[66]=1,i[67]=2,i[68]=3,i[69]=4,i[70]=5,i[71]=6,i[72]=7,i[73]=8,i[74]=9,i[75]=10,i[76]=11,i[77]=12,i[78]=13,i[79]=14,i[80]=15,i[81]=16,i[82]=17,i[83]=18,i[84]=19,i[85]=20,i[86]=21,i[87]=22,i[88]=23,i[89]=24,i[90]=25,i[97]=26,i[98]=27,i[99]=28,i[100]=29,i[101]=30,i[102]=31,i[103]=32,i[104]=33,i[105]=34,i[106]=35,i[107]=36,i[108]=37,i[109]=38,i[110]=39,i[111]=40,i[112]=41,i[113]=42,i[114]=43,i[115]=44,i[116]=45,i[117]=46,i[118]=47,i[119]=48,i[120]=49,i[121]=50,i[122]=51,i[48]=52,i[49]=53,i[50]=54,i[51]=55,i[52]=56,i[53]=57,i[54]=58,i[55]=59,i[56]=60,i[57]=61,i[43]=62,i[47]=63;var o,s=t.length,a=0,u=0;if(!s)return new n(0);o=Math.floor(s/4*3),\"=\"==t.charAt(s-1)&&(o-=1),\"=\"==t.charAt(s-2)&&(o-=1);for(var c=new n(o),f=r.isNodeBuffer(c)?c:new Uint8Array(c),l=0,p=0;p<o&&(void 0===(u=i[t.charCodeAt(l)])&&h(\"Invalid letter: \"+t.charCodeAt(l)),a=u<<2,l++,void 0===(u=i[t.charCodeAt(l)])&&h(\"Invalid letter: \"+t.charCodeAt(l)),f[p]=a|u>>4&3,a=(15&u)<<4,l++,!(++p>=o))&&(void 0===(u=i[t.charCodeAt(l)])&&h(\"Invalid letter: \"+t.charCodeAt(l)),f[p]=a|u>>2&15,a=(3&u)<<6,l++,!(++p>=o));)void 0===(u=i[t.charCodeAt(l)])&&h(\"Invalid letter: \"+t.charCodeAt(l)),f[p]=a|u,l++,p++;function h(e){throw console.log(e),console.log(t,l),new Error(e)}return c},r.Base64_From_ArrayBuffer=function(t){for(var e=[\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\"a\",\"b\",\"c\",\"d\",\"e\",\"f\",\"g\",\"h\",\"i\",\"j\",\"k\",\"l\",\"m\",\"n\",\"o\",\"p\",\"q\",\"r\",\"s\",\"t\",\"u\",\"v\",\"w\",\"x\",\"y\",\"z\",\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"+\",\"/\"],n=\"\",r=new Uint8Array(t),i=r.length,o=0,s=0,a=0;a<i&&(n+=e[(s=r[a])>>2],o=(3&s)<<4,!(++a>=i))&&(n+=e[o|(s=r[a])>>4],o=(15&s)<<2,!(++a>=i));)n+=e[o|(s=r[a])>>6],n+=e[63&s],a++;var u=i%3;return u&&(n+=e[o]),1==u?n+=\"==\":2==u&&(n+=\"=\"),n},r.hasNodeBuffer=function(){return\"undefined\"!=typeof Buffer},r.isNodeBuffer=function(t){return r.hasNodeBuffer()&&t instanceof Buffer},r.isBuffer=function(t){return t instanceof ArrayBuffer||r.isNodeBuffer(t)},r.utf8bytes2str=function(t){for(var e=[],n=0;n<t.length;n++)e.push(\"%\"+(\"0\"+t[n].toString(16)).slice(-2));return decodeURIComponent(e.join(\"\"))},r.str2utf8bytes=function(t,e){for(var n=encodeURIComponent(t),r=/^%(..)/,i=[],o=0;o<n.length;o++){var s=r.exec(n.substring(o));s?(i.push(parseInt(\"0x\"+s[1])),o+=s[0].length-1):i.push(n.charCodeAt(o))}return\"undefined\"!=typeof Buffer&&e===Buffer?new Buffer(i):new Uint8Array(i).buffer};var s=r.hasNodeBuffer()?Buffer:ArrayBuffer,a=function(e,n){\"string\"==typeof e?(this.url=e,this.binType=n||s,this.dataURL2bin(e)):e&&r.isBuffer(e.buffer)?(this.buffer=e.buffer,t.is(n,String),this.contentType=n,this.bin2dataURL(this.buffer,this.contentType)):r.isBuffer(e)?(this.buffer=e,t.is(n,String),this.contentType=n,this.bin2dataURL(this.buffer,this.contentType)):(console.log(arguments),t.fail(\"Invalid args: \",arguments))};return r.DataURL=a,i(a.prototype,{bin2dataURL:function(e,n){t(r.isBuffer(e)),t.is(n,String);var i=this.dataHeader(n),o=r.Base64_From_ArrayBuffer(e);return t.is(o,String),this.url=i+o},dataURL2bin:function(e){t.is(arguments,[String]);var n=/^data:([^;]+);base64,/i.exec(e);return t(n,[\"malformed dataURL:\",e]),this.contentType=n[1],this.buffer=r.Base64_To_ArrayBuffer(e.substring(n[0].length),this.binType),t.is(this.buffer,this.binType)},dataHeader:function(e){return t.is(arguments,[String]),\"data:\"+e+\";base64,\"},toString:function(){return t.is(this.url,String)}}),r}),r(\"NativeFS\",[\"FSClass\",\"assert\",\"PathUtil\",\"extend\",\"Content\"],function(e,n,r,o,s){var a,u=n;const c=[()=>t(\"fs\"),()=>i.nodeRequire(\"fs\"),()=>global.require(\"fs\")];for(let t of c)try{(a=t()).existsSync(\"test.txt\"),process.cwd();break}catch(t){a=null}if(!a)return function(){throw new Error(\"This system not support native FS\")};var f=function(t){t&&(n.is(t,r.AbsDir),this.rootPoint=t)},l=r.hasDriveLetter(process.cwd());f.available=!0;var p=r.SEP,h=f.prototype=new e;function d(t){return t}return h.toNativePath=function(t){return this.rootPoint?(n.is(t,r.Absolute),n(this.inMyFS(t),t+\" is not fs of \"+this),r.rel(this.rootPoint,r.relPath(t,this.mountPoint||r.SEP))):t},h.arrayBuffer2Buffer=function(t){return t instanceof ArrayBuffer?new Buffer(new Uint8Array(t)):t},e.addFSType(\"NativeFS\",function(t,e){return new f(e.r)}),f.prototype.fstype=function(){return\"Native\"+(this.rootPoint?\"(\"+this.rootPoint+\")\":\"\")},f.prototype.inMyFS=function(t){return this.mountPoint?r.startsWith(t,this.mountPoint):!(!!l^!!r.hasDriveLetter(t))},e.delegateMethods(f.prototype,{getReturnTypes:function(t,e){return d(t),u.is(arguments,[String]),{getContent:ArrayBuffer,opendir:[String]}},getContent:function(t,e){e=e||{},n.is(t,r.Absolute);var i=this.toNativePath(t);return this.assertExist(t),s.bin(a.readFileSync(i),this.getContentType(t))},size:function(t){var e=this.toNativePath(t);return a.statSync(e).size},setContent:function(t,e){n.is(arguments,[r.Absolute,s]);var i=r.up(t);i&&this.getRootFS().resolveFS(i).mkdir(i);var o=this.toNativePath(t);e.hasBin()||!e.hasPlainText()?a.writeFileSync(o,e.toNodeBuffer()):a.writeFileSync(o,e.toPlainText())},appendContent:function(t,e){n.is(arguments,[r.Absolute,s]);var i=r.up(t);i&&this.getRootFS().resolveFS(i).mkdir(i);var o=this.toNativePath(t);e.hasBin()||!e.hasPlainText()?a.appendFileSync(o,e.toNodeBuffer()):a.appendFileSync(o,e.toPlainText())},getMetaInfo:function(t,e){this.assertExist(t,e);var n=this.stat(t);return n.lastUpdate=n.mtime.getTime(),n},setMetaInfo:function(t,e,n){d(t)},isReadOnly:function(t){return d(t),!1},stat:function(t){n.is(t,r.Absolute);var e=this.toNativePath(t);return a.statSync(e)},mkdir:function(t,e){if(e=e||{},u.is(arguments,[r.Absolute]),this.exists(t)){if(this.isDir(t))return;throw new Error(this+\" is a file. not a dir.\")}this.assertWriteable(t);var n=r.up(t);n&&this.getRootFS().resolveFS(n).mkdir(n);var i=this.toNativePath(t);return a.mkdirSync(i),this.assertExist(i)},opendir:function(t,e){u.is(arguments,[String]),e=e||{};var n=this.toNativePath(t),i=r.truncSEP(n),o=a.readdirSync(n);return e.nosep||(o=o.map(function(t){return t+(a.statSync(i+p+t).isDirectory()?p:\"\")})),u.is([].concat(o),Array)},rm:function(t,e){u.is(arguments,[r.Absolute]),e=e||{},this.assertExist(t);var n=this.toNativePath(t);return this.isDir(t)?a.rmdirSync(n):a.unlinkSync(n)},exists:function(t,e){e=e||{};var n=this.toNativePath(t);return a.existsSync(n)},isDir:function(t){return this.exists(t)?this.stat(t).isDirectory():r.isDir(t)},touch:function(t){!this.exists(t)&&this.isDir(t)?this.mkdir(t):this.exists(t)&&a.utimesSync(t,Date.now()/1e3,Date.now()/1e3)},getURL:function(t){return\"file:///\"+t.replace(/\\\\/g,\"/\")},onAddObserver:function(t,e){var n=this,i=n.getRootFS();e=e||{};var s=this.isDir(t),u=a.watch(t,e,function(e,a){var u,c=s?r.rel(t,a):t;u=n.exists(c)?o({eventType:e},n.getMetaInfo(c)):{eventType:e},i.notifyChanged(c,u)});return{remove:function(){u.close()}}}}),f}),r(\"LSFS\",[\"FSClass\",\"PathUtil\",\"extend\",\"assert\",\"Util\",\"Content\"],function(t,e,n,r,i,o){var s=function(t,e){r(t,\" new LSFS fail: no storage\"),this.storage=t,this.options=e||{},this.options.useDirCache&&(this.dirCache={})},a=e.isDir.bind(e),u=e.up.bind(e),c=e.endsWith.bind(e),f=e.Absolute,l=e.SEP;function p(){return(new Date).getTime()}return s.ramDisk=function(t){var n={};return n[e.SEP]=\"{}\",\"useDirCache\"in(t=t||{})||(t.useDirCache=!0),new s(n,t)},t.addFSType(\"localStorage\",function(t,e){return new s(localStorage,e)}),t.addFSType(\"ram\",function(t,e){return s.ramDisk(e)}),s.now=p,(s.prototype=new t).resolveKey=function(t){return r.is(t,e.Absolute),this.mountPoint?e.SEP+e.relPath(t,this.mountPoint):t},s.prototype.getItem=function(t){r.is(t,e.Absolute);var n=this.resolveKey(t);return this.storage[n]},s.prototype.setItem=function(t,n){r.is(t,e.Absolute);var i=this.resolveKey(t);r(i.indexOf(\"..\")<0),r(e.startsWith(i,e.SEP)),this.storage[i]=n},s.prototype.removeItem=function(t){r.is(t,e.Absolute);var n=this.resolveKey(t);delete this.storage[n]},s.prototype.itemExists=function(t){r.is(t,e.Absolute);var n=this.resolveKey(t);return r(this.storage,\"No storage\"),n in this.storage},s.prototype.getDirInfo=function(t){if(r.is(arguments,[e.AbsDir]),null==t)throw new Error(\"getDir: Null path\");if(c(t,l)||(t+=l),r(this.inMyFS(t)),this.dirCache&&this.dirCache[t])return this.dirCache[t];var n,i={};try{(n=this.getItem(t))&&(i=JSON.parse(n))}catch(e){console.log(\"dinfo err : \",t,n)}return this.dirCache&&(this.dirCache[t]=i),i},s.prototype.putDirInfo=function(t,n,i){if(r.is(arguments,[e.AbsDir,Object]),!a(t))throw new Error(\"Not a directory : \"+t);r(this.inMyFS(t)),this.dirCache&&(this.dirCache[t]=n),this.setItem(t,JSON.stringify(n));var o=u(t);if(null!=o&&this.inMyFS(o)){var s=this.getDirInfo(o);this._touch(s,o,e.name(t),i)}},s.prototype._touch=function(t,i,o,s){r.is(arguments,[Object,String,String]),r(this.inMyFS(i));var a=\"change\";t[o]||(a=\"create\",t[o]={},s&&(t[o].trashed=!0)),s||delete t[o].trashed,t[o].lastUpdate=p();var u=n({eventType:a},t[o]);this.getRootFS().notifyChanged(e.rel(i,o),u),this.putDirInfo(i,t,s)},s.prototype.removeEntry=function(t,n,i){r.is(arguments,[Object,String,String]),t[i]&&(t[i]={lastUpdate:p(),trashed:!0},this.getRootFS().notifyChanged(e.rel(n,i),{eventType:\"trash\"}),this.putDirInfo(n,t,!0))},s.prototype.removeEntryWithoutTrash=function(t,n,i){r.is(arguments,[Object,String,String]),t[i]&&(delete t[i],this.getRootFS().notifyChanged(e.rel(n,i),{eventType:\"delete\"}),this.putDirInfo(n,t,!0))},s.prototype.isRAM=function(){return this.storage!==localStorage},s.prototype.fstype=function(){return this.isRAM()?\"ramDisk\":\"localStorage\"},s.getUsage=function(){var t=0;for(var e in localStorage)\"string\"==typeof localStorage[e]&&(t+=localStorage[e].length);return t},s.getCapacity=function(){var t=0,e=\"a\",n=\"___checkls___\",r=0,i=Math.pow(2,25);try{for(var o=0;o<10;o++)e+=e;for(var o in localStorage)o.substring(0,n.length)==n?delete localStorage[o]:\"string\"==typeof localStorage[o]&&(r+=localStorage[o].length);for(var s=r;a()&&e.length<i;)e+=e;for(;e.length>1024;)e=e.substring(e.length/2),a();return{using:s,max:r}}finally{for(o=0;o<t;o++)delete localStorage[n+o]}function a(){try{return localStorage[n+t]=e,t++,r+=e.length,!0}catch(e){return delete localStorage[n+t],!1}}},t.delegateMethods(s.prototype,{isReadOnly:function(){return this.options.readOnly},getReturnTypes:function(t,e){return r.is(arguments,[String]),{getContent:String,opendir:[String]}},getContent:function(t,e){r.is(arguments,[f]),this.assertExist(t);var n=this.getItem(t);return o.looksLikeDataURL(n)?o.url(n):o.plainText(n)},setContent:function(t,e,n){r.is(arguments,[f,o]),this.assertWriteable(t);var i=null;e.hasPlainText()&&(i=e.toPlainText(),o.looksLikeDataURL(i)&&(i=null)),null!=i?this.setItem(t,i):this.setItem(t,e.toURL()),this.touch(t)},getMetaInfo:function(t,n){if(this.assertExist(t,{includeTrashed:!0}),r.is(arguments,[f]),t==e.SEP)return{};var i=r(e.up(t));if(!this.inMyFS(i))return{};var o=e.name(t);r.is(i,e.AbsDir);var s=this.getDirInfo(i);return r(s[o])},setMetaInfo:function(t,n,i){r.is(arguments,[String,Object]),this.assertWriteable(t);var o=r(e.up(t));if(this.inMyFS(o)){var s=this.getDirInfo(o),a=e.name(t);s[a]=n,this.putDirInfo(o,s,s[a].trashed)}},mkdir:function(t,e){r.is(arguments,[f]),this.assertWriteable(t),this.touch(t)},opendir:function(t,e){r.is(arguments,[String]),e=e||{};var n=this.getDirInfo(t),i=[];for(var o in n)r(n[o]),n[o].trashed&&!e.includeTrashed||i.push(o);return r.is(i,Array)},rm:function(t,n){r.is(arguments,[f]),n=n||{},this.assertWriteable(t);var i=e.up(t);if(null==i||!this.inMyFS(i))throw new Error(t+\": cannot remove. It is root of this FS.\");this.assertExist(t,{includeTrashed:n.noTrash}),e.isDir(t)?(this.opendir(t).length>0&&this.err(t,\"Directory not empty\"),n.noTrash&&this.removeItem(t)):this.removeItem(t);var o=this.getDirInfo(i);n.noTrash?this.removeEntryWithoutTrash(o,i,e.name(t)):this.removeEntry(o,i,e.name(t))},exists:function(t,n){r.is(arguments,[f]),n=n||{};var i=e.name(t),o=e.up(t);if(null==o||!this.inMyFS(o))return!0;var s=this.getDirInfo(o)[i];return s&&s.trashed&&this.itemExists(t)&&this.isDir(t),!s&&this.itemExists(t),s&&!s.trashed&&!s.link&&this.itemExists(t),s&&!n.includeTrashed&&(s=!s.trashed),!!s},link:function(t,n,i){r.is(arguments,[e.Absolute,e.Absolute]),this.assertWriteable(t),this.exists(t)&&this.err(t,\"file exists\"),e.isDir(t)&&!e.isDir(n)&&this.err(t,\" can not link to file \"+n),!e.isDir(t)&&e.isDir(n)&&this.err(t,\" can not link to directory \"+n);var o={};o.link=n,o.lastUpdate=p(),this.setMetaInfo(t,o),r(this.exists(t)),r(this.isLink(t))},isLink:function(t){return r.is(arguments,[e.Absolute]),this.exists(t)?r(this.getMetaInfo(t)).link:null},touch:function(t){r.is(arguments,[f]),this.assertWriteable(t),this.itemExists(t)||(e.isDir(t)?(this.dirCache&&(this.dirCache[t]={}),this.setItem(t,\"{}\")):this.setItem(t,\"\"));var n=u(t);if(null!=n)if(this.inMyFS(n)){var i=this.getDirInfo(n);this._touch(i,n,e.name(t),!1)}else r(this.getRootFS()!==this),this.getRootFS().resolveFS(n).touch(n)},getURL:function(t){return this.getContent(t).toURL()},opendirEx:function(t,n){r.is(t,e.AbsDir),n=n||{};var i={},o=this.getDirInfo(t);if(n.includeTrashed)return o;for(var s in o)o[s].trashed||(i[s]=o[s]);return i}}),s}),\"undefined\"!=typeof $&&$.ajaxTransport(\"+binary\",function(t,e,n){if(window.FormData&&(t.dataType&&\"binary\"==t.dataType||t.data&&(window.ArrayBuffer&&t.data instanceof ArrayBuffer||window.Blob&&t.data instanceof Blob)))return{send:function(e,n){var r=new XMLHttpRequest,i=t.url,o=t.type,s=t.async||!0,a=t.responseType||\"blob\",u=t.data||null,c=t.username||null,f=t.password||null;for(var l in r.addEventListener(\"load\",function(){var e={};e[t.dataType]=r.response,n(r.status,r.statusText,e,r.getAllResponseHeaders())}),r.open(o,i,s,c,f),e)r.setRequestHeader(l,e[l]);r.responseType=a,r.send(u)},abort:function(){n.abort()}}}),r(\"jquery.binarytransport\",function(){}),r(\"WebFS\",[\"FSClass\",\"jquery.binarytransport\",\"DeferredUtil\",\"Content\",\"PathUtil\"],function(t,e,n,r,i){var o=function(){},s=o.prototype=new t;return t.addFSType(\"web\",function(){return new o}),s.fstype=function(){return\"Web\"},s.supportsSync=function(){return!1},s.inMyFS=function(t){return i.isURL(t)},t.delegateMethods(s,{exists:function(){return!0},getContentAsync:function(t){var e=this;return n.promise(function(n,i){$.get(t,function(i){var o=new FileReader;o.addEventListener(\"loadend\",function(){n(r.bin(o.result,e.getContentType(t)))}),o.readAsArrayBuffer(i)},\"binary\").fail(i)})},getURL:function(t){return t}}),o}),r(\"Env\",[\"assert\",\"PathUtil\"],function(t,e){var n=function(t){this.value=t};return n.prototype={expand:function(e){t.is(e,String);var n=this;return e.replace(/\\$\\{([a-zA-Z0-9_]+)\\}/g,function(t,e){return n.get(e)})},expandPath:function(n){return t.is(n,String),n=(n=(n=this.expand(n)).replace(/\\/+/g,\"/\")).replace(/^[a-z][a-z]+:\\//,function(t){return t+\"/\"}),t.is(n,e.Path)},get:function(t){return this.value[t]},set:function(t,e){this.value[t]=e}},n}),r(\"SFile\",[\"extend\",\"assert\",\"PathUtil\",\"Util\",\"Content\",\"FSClass\",\"FileSaver\",\"DeferredUtil\"],function(t,e,n,r,i,o,s,a){var u=function(t,r){e.is(r,n.Absolute),this._path=r,this.rootFS=t,this.fs=t.resolveFS(r),this.isDir()&&!n.isDir(r)&&(this._path+=n.SEP)};return u.is=function(t){return t&&\"function\"==typeof t.isSFile&&t.isSFile()},u.prototype={isSFile:function(){return!0},setPolicy:function(t){if(this.policy)throw new Error(\"policy already set\");return this.policy=t,this._clone()},getPolicy:function(t){return this.policy},_clone:function(){return this._resolve(this.path())},_resolve:function(t,i){var o;if(i=i||{},u.is(t))o=t;else{var s;e.is(t,n.Absolute);var a=i.policy||this.policy;if(a&&(s=a.topDir)&&(s.path&&(s=s.path()),!n.startsWith(t,s)))throw new Error(t+\": cannot access. Restricted to \"+s);(o=new u(this.rootFS,t)).policy=a}return o.policy?r.privatize(o):o},contains:function(t){return e(u.is(t),t+\" shoud be a SFile object.\"),!!this.isDir()&&n.startsWith(t.path(),this.path())},path:function(){return this._path},name:function(){return n.name(this.path())},truncExt:function(t){return n.truncExt(this.path(),t)},ext:function(){return n.ext(this.path())},relPath:function(t){var r=t.path?t.path():t;return n.relPath(this.path(),e.is(r,n.Absolute))},up:function(){var t=this.path(),e=n.up(t);return null==e?null:this._resolve(e)},rel:function(t){e.is(t,n.Relative),this.assertDir();var r=this.path();return this._resolve(n.rel(r,t))},sibling:function(t){return this.up().rel(t)},startsWith:function(t){return n.startsWith(this.name(),t)},endsWith:function(t){return n.endsWith(this.name(),t)},equals:function(t){return t&&\"function\"==typeof t.path&&t.path()==this.path()},toString:function(){return this.path()},touch:function(){return this.act.fs.touch(this.act.path)},isReadOnly:function(){return this.act.fs.isReadOnly(this.act.path)},isTrashed:function(){var t=this.metaInfo();return!!t&&t.trashed},metaInfo:function(){return 0==arguments.length?this.getMetaInfo.apply(this,arguments):this.setMetaInfo.apply(this,arguments)},getMetaInfo:function(t){return this.act.fs.getMetaInfo(this.act.path,t)},setMetaInfo:function(t,e){return this.act.fs.setMetaInfo(this.act.path,t,e)},getDirTree:function(t){return this.act.fs.getDirTree(this.act.path,t)},assertExists:function(){e(this.exists(),this.path()+\" does not exist.\")},lastUpdate:function(){return this.assertExists(),this.metaInfo().lastUpdate},exists:function(t){var e=Array.prototype.slice.call(arguments);if(\"function\"==typeof e[0]){var n=e.shift();return a.resolve(this.exists.apply(this,e)).then(n)}t=t||{};var r=this.fs.exists(this.path(),t);return r||t.noFollowLink?r:this.act.fs.exists(this.act.path,{noFollowLink:!0})},rm:function(t){var e=this;return t=t||{},this.isLink()?a.resolve(this.fs.rm(this.path(),t)):(this.isDir()&&(t.recursive||t.r)?this.each(function(e){return e.rm(t)}):a.resolve()).then(function(){return e.act.fs.rm(e.act.path,t)})},removeWithoutTrash:function(t){(t=t||{}).noTrash=!0,this.rm(t)},isDir:function(){return this.act.fs.isDir(this.act.path)},text:function(t){return\"function\"==typeof t?this.getText(t):arguments.length>0?this.setText(arguments[0]):this.getText()},setText:function(t){if(e.is(t,String),this.isDir())throw new Error(\"Cannot write to directory: \"+this.path());var n=this.contentType({def:null});return null!==n&&!n.match(/^text/)&&i.looksLikeDataURL(t)?a.throwNowIfRejected(this.setContent(i.url(t))):a.throwNowIfRejected(this.setContent(i.plainText(t)))},appendText:function(t){return e.is(t,String),this.act.fs.appendContent(this.act.path,i.plainText(t))},getContent:function(t){return\"function\"==typeof t?this.act.fs.getContentAsync(this.act.path).then(t):this.act.fs.getContent(this.act.path)},setContent:function(t){if(this.isDir())throw new Error(\"Cannot write to directory: \"+this.path());return this.act.fs.setContentAsync(this.act.path,t)},getText:function(t){return\"function\"==typeof t?this.getContent(e).then(t):e(this.act.fs.getContent(this.act.path));function e(t){try{return t.toPlainText()}catch(e){return t.toURL()}}},getDataURL:function(t){return\"function\"==typeof t?this.getContent(function(t){return t.toURL()}):this.getContent().toURL()},setDataURL:function(t){return this.setContent(i.url(t))},dataURL:function(t){return\"string\"==typeof t?this.setDataURL(t):\"function\"==typeof t?this.getDataURL(t):this.getDataURL()},isText:function(){return this.act.fs.isText(this.act.path)},contentType:function(t){return this.act.fs.getContentType(this.act.path,t)},bytes:function(t){return i.isBuffer(t)?this.setBytes(t):this.getBytes()},setBytes:function(t){return this.act.fs.setContent(this.act.path,i.bin(t,this.contentType()))},getBytes:function(t){return t=t||{},this.act.fs.getContent(this.act.path).toBin(t.binType)},getURL:function(){return this.act.fs.getURL(this.act.path)},lines:function(t){return t instanceof Array?this.text(t.join(\"\\n\")):\"function\"==typeof t?this.text(function(e){return t(e.replace(/\\r/g,\"\").split(\"\\n\"))}):this.text().replace(/\\r/g,\"\").split(\"\\n\")},obj:function(){if(0==arguments.length){var t=this.text();return t?JSON.parse(t):null}this.text(JSON.stringify(e.is(arguments[0],Object)))},copyFrom:function(t,e){return t.copyTo(this,e)},copyTo:function(t,n){e(t&&t.isSFile(),t+\" is not a file\");var r=this,i=(n=n||{},r.isDir()),o=t.isDir();if(!i&&o&&(t=t.rel(r.name()),e(!t.isDir(),t+\" is a directory.\"),o=!1),!i||o){if(i||o)return e(i&&o,\"Both src and dst should be dir\"),r.each(function(e){var r,i=t.rel(e.name());return n.progress&&(r=n.progress(i,{src:e,dst:i})),a.resolve(r).then(function(){return i.copyFrom(e,n)})});n.echo&&n.echo(r+\" -> \"+t);var s=this.act.fs.cp(this.act.path,t.getResolvedLinkPath(),n);return s=a.resolve(s),n.a?s.then(function(){return t.setMetaInfo(r.getMetaInfo())}):s}this.err(\"Cannot move dir \"+r.path()+\" to file \"+t.path())},moveFrom:function(t,e){var n=this;return n.exists(function(r){return n.copyFrom(t,e).then(function(){return t.rm({recursive:!0})},function(t){if(!r)return n.exists(function(t){if(t)return n.rm({recursive:!0})}).then(function(){throw t});throw t})})},moveTo:function(t,e){return t.moveFrom(this,e)},assertDir:function(){return e.is(this.path(),n.Dir),this},each:function(t,e){return this.assertDir().listFilesAsync(e).then(function(e){return a.each(e,t)})},eachrev:function(t,e){return this.assertDir().listFilesAsync(e).then(function(e){return a.each(e.reverse(),t)})},recursive:function(t,e){var n=this.assertDir();return e=n.convertOptions(e),n.each(function(n){return n.isDir()?n.recursive(t,e):t(n)},e)},_listFiles:function(t,n){e(null==t||\"object\"==typeof t);var r,i=this.assertDir();return this.path(),t=i.convertOptions(t),r||(r=t.order),n?this.act.fs.opendirAsync(this.act.path,t).then(o):o(this.act.fs.opendir(this.act.path,t));function o(e){for(var n=[],o=0;o<e.length;o++){var s=e[o],a=i.rel(s);t.excludesF(a)||n.push(a)}return\"function\"==typeof r&&n.sort&&n.sort(r),n}},listFilesAsync:function(t){return this._listFiles(t,!0)},listFiles:function(t){return this._listFiles(t,!1)},ls:function(t){e(null==t||\"object\"==typeof t);var n=this.assertDir();return t?n.listFiles(t).map(function(t){return t.name()}):this.act.fs.opendir(this.act.path,t)},convertOptions:function(t){var i=r.extend({},t),o=(this.assertDir(),this.path()),s=i.excludes||{};if(\"function\"==typeof s)i.excludesF=s;else if(\"object\"==typeof s){if(s instanceof Array){var a={};s.forEach(function(t){n.startsWith(t,\"/\")?a[t]=1:a[o+t]=1}),s=a}i.excludesF=function(t){return s[t.path()]}}return e.is(i,{excludesF:Function})},mkdir:function(){return this.touch()},link:function(t,e){if(this.exists())throw new Error(this.path()+\": exists.\");return this.act.fs.link(this.act.path,t.path(),e)},resolveLink:function(){return this._resolve(this.act.path)},isLink:function(){return this.fs.isLink(this.path())},getResolvedLinkPath:function(){return this.act.path},getFS:function(){return this.act.fs},observe:function(t){return this.getFS().getRootFS().addObserver(this.path(),t)},getBlob:function(){return new Blob([this.bytes()],{type:this.contentType()})},setBlob:function(t){var e=this;return a.promise(function(n,r){var i=new FileReader;i.addEventListener(\"loadend\",function(){a.resolve(e.setBytes(i.result)).then(n)}),i.readAsArrayBuffer(t)})},size:function(t){if(!t){if(this.isDir()){var e=0;return this.each(function(t){e+=t.size()}),e}return this.act.fs.size(this.act.path)}},download:function(){if(this.isDir())throw new Error(this+\": Download dir is not support yet. Use 'zip' instead.\");s(this.getBlob(),this.name())},err:function(){var t=Array.prototype.slice.call(arguments);throw console.log.apply(console,t),new Error(t.join(\"\"))},exportAsObject:function(t){var e=this,n={};return this.recursive(function(t){n[t.relPath(e)]=t.text()},t),{base:e.path(),data:n}},importFromObject:function(t,e){for(var n in\"string\"==typeof t&&(t=JSON.parse(t)),t=t.data)this.rel(n).text(t[n])},watch:function(t,e){var n=function(){};\"function\"==typeof t&&(n=t),\"function\"==typeof e&&(n=e);var r=this.getFS().getRootFS();r.addObserver(this.path(),function(t,e){n(e.eventType,r.get(t),e)})}},Object.defineProperty(u.prototype,\"act\",{get:function(){return this._act?this._act:(this._act={},this._act.path=this.fs.resolveLink(this._path),this._act.fs=this.rootFS.resolveFS(this._act.path),e.is(this._act,{fs:o,path:n.Absolute}),this._act)}}),u}),r(\"RootFS\",[\"assert\",\"FSClass\",\"PathUtil\",\"SFile\"],function(t,e,n,r){var i=function(n){t.is(n,e),this.mount(null,n)},o=i.prototype,s={err:function(t,e){throw new Error(t+\": \"+e)},fstab:function(){return this._fstab=this._fstab||[]},unmount:function(e,r){t.is(arguments,[n.AbsDir]);var i=this.fstab();console.log(i);for(var o=0;o<i.length;o++)if(i[o].mountPoint==e)return i.splice(o,1),!0;return!1},availFSTypes:function(){return e.availFSTypes()},mount:function(n,r,i){\"string\"==typeof r&&(r=t(e.availFSTypes()[r],\"fstype \"+r+\" is undefined.\")(n,i||{})),t.is(r,e),r.mounted(this,n),this.fstab().unshift(r)},resolveFS:function(r,i){var o;return t.is(r,n.Absolute),this.fstab().forEach(function(t){o||t.inMyFS(r)&&(o=t)}),o||this.err(r,\"Cannot resolve\"),t.is(o,e)},get:function(e){return t.is(e,n.Absolute),new r(this.resolveFS(e),e)},addObserver:function(e,n,r){this.observers=this.observers||[];var i,o,s={};\"string\"==typeof e&&(i=e),\"string\"==typeof n&&(i=n),\"string\"==typeof r&&(i=r),\"object\"==typeof e&&(s=e),\"object\"==typeof n&&(s=n),\"object\"==typeof r&&(s=r),\"function\"==typeof e&&(o=e),\"function\"==typeof n&&(o=n),\"function\"==typeof r&&(o=r),t.is(i,String),t.is(o,Function);var a=this.resolveFS(i).onAddObserver(i,s),u=this.observers,c={path:i,handler:o,remove:function(){var t=u.indexOf(this);u.splice(t,1),a&&a.remove()}};return this.observers.push(c),c},notifyChanged:function(t,e){this.observers&&this.observers.forEach(function(r){n.isChildOf(t,r.path)&&r.handler(t,e)})},getRootFS:function(){return this}};for(var a in s)o[a]=s[a];return i}),r(\"zip\",[\"SFile\",\"FileSaver\",\"Util\",\"DeferredUtil\"],function(t,e,n,r){var i={setJSZip:function(t){i.JSZip=t,r.external.Promise||(r.external.Promise=t.external.Promise)}};return\"undefined\"!=typeof JSZip&&i.setJSZip(JSZip),i.zip=function(e,n,o){t.is(n)||(o=n),o=o||{};var s=new i.JSZip;return function t(e,n){return n.each(function(n){var i=r.resolve();return o.progress&&(i=o.progress(n)),i.then(function(){return n.isDir()?t(e.folder(n.name().replace(/[\\/\\\\]$/,\"\")),n):n.getContent(function(t){e.file(n.name(),t.toArrayBuffer())})})})}(s,e).then(function(){return r.resolve(s.generateAsync({type:\"arraybuffer\",compression:\"DEFLATE\"}))}).then(function(r){if(t.is(n))return n.setBytes(r);saveAs(new Blob([r],{type:\"application/zip\"}),e.name().replace(/[\\/\\\\]$/,\"\")+\".zip\")})},i.unzip=function(e,n,o){var s={};o=o||{},t.is(e)&&(e=e.getContent().toArrayBuffer()),o.onCheckFile||(o.onCheckFile=function(t){return o.overwrite?t:!t.exists()&&t});var a=new i.JSZip;return r.resolve(a.loadAsync(e)).then(function(){return r.each(a.files,function(e,i){var a,u;return r.resolve(i.async(\"arraybuffer\")).then(function(t){if(a=t,u=n.rel(i.name),o.progress)return r.resolve(o.progress(u))}).then(function(){if(console.log(\"Inflating\",i.name),!u.isDir()){var e={file:u,status:\"uploaded\"};s[u.path()]=e;var n=FS.Content.bin(a,u.contentType()),r=o.onCheckFile(u,n);return!1===r&&(e.status=\"cancelled\",u=null),t.is(r)&&(u.path()!==r.path()&&(e.redirectedTo=r),u=r),u?u.setContent(n):void 0}})})}).then(function(){return console.log(\"unzip done\",s),s})},i}),r(\"promise\",[],function(){function t(t){return Boolean(t&&void 0!==t.length)}function e(){}function n(t){if(!(this instanceof n))throw new TypeError(\"Promises must be constructed via new\");if(\"function\"!=typeof t)throw new TypeError(\"not a function\");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],a(t,this)}function r(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,n._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null!==n){var r;try{r=n(t._value)}catch(t){return void o(e.promise,t)}i(e.promise,r)}else(1===t._state?i:o)(e.promise,t._value)})):t._deferreds.push(e)}function i(t,e){try{if(e===t)throw new TypeError(\"A promise cannot be resolved with itself.\");if(e&&(\"object\"==typeof e||\"function\"==typeof e)){var r=e.then;if(e instanceof n)return t._state=3,t._value=e,void s(t);if(\"function\"==typeof r)return void a((i=r,u=e,function(){i.apply(u,arguments)}),t)}t._state=1,t._value=e,s(t)}catch(e){o(t,e)}var i,u}function o(t,e){t._state=2,t._value=e,s(t)}function s(t){2===t._state&&0===t._deferreds.length&&n._immediateFn(function(){t._handled||n._unhandledRejectionFn(t._value)});for(var e=0,i=t._deferreds.length;e<i;e++)r(t,t._deferreds[e]);t._deferreds=null}function a(t,e){var n=!1;try{t(function(t){n||(n=!0,i(e,t))},function(t){n||(n=!0,o(e,t))})}catch(t){if(n)return;n=!0,o(e,t)}}return setTimeout,n.prototype.catch=function(t){return this.then(null,t)},n.prototype.then=function(t,n){var i=new this.constructor(e);return r(this,new function(t,e,n){this.onFulfilled=\"function\"==typeof t?t:null,this.onRejected=\"function\"==typeof e?e:null,this.promise=n}(t,n,i)),i},n.prototype.finally=function(t){var e=this.constructor;return this.then(function(n){return e.resolve(t()).then(function(){return n})},function(n){return e.resolve(t()).then(function(){return e.reject(n)})})},n.all=function(e){return new n(function(n,r){if(!t(e))return r(new TypeError(\"Promise.all accepts an array\"));var i=Array.prototype.slice.call(e);if(0===i.length)return n([]);var o=i.length;function s(t,e){try{if(e&&(\"object\"==typeof e||\"function\"==typeof e)){var a=e.then;if(\"function\"==typeof a)return void a.call(e,function(e){s(t,e)},r)}i[t]=e,0==--o&&n(i)}catch(t){r(t)}}for(var a=0;a<i.length;a++)s(a,i[a])})},n.resolve=function(t){return t&&\"object\"==typeof t&&t.constructor===n?t:new n(function(e){e(t)})},n.reject=function(t){return new n(function(e,n){n(t)})},n.race=function(e){return new n(function(r,i){if(!t(e))return i(new TypeError(\"Promise.race accepts an array\"));for(var o=0,s=e.length;o<s;o++)n.resolve(e[o]).then(r,i)})},n._immediateFn=function(t){t()},n._unhandledRejectionFn=function(){\"undefined\"!=typeof console&&console},n}),r(\"FS\",[\"FSClass\",\"NativeFS\",\"LSFS\",\"WebFS\",\"PathUtil\",\"Env\",\"assert\",\"SFile\",\"RootFS\",\"Content\",\"zip\",\"DeferredUtil\",\"promise\"],function(t,e,n,r,i,o,s,a,u,c,f,l,p){var h,d={};d.assert=s,d.Content=c,d.Class=t,d.DeferredUtil=l,l.config.useJQ||(l.external.Promise=p),d.Env=o,d.LSFS=n,d.NativeFS=e,d.PathUtil=i,d.RootFS=u,d.SFile=a,d.WebFS=r,d.zip=f,\"object\"==typeof window&&(window.FS=d);var m=new o({});return d.addFSType=t.addFSType,d.availFSTypes=t.availFSTypes,d.setEnvProvider=function(t){m=t},d.getEnvProvider=function(){return m},d.setEnv=function(t,e){if(\"object\"==typeof t)for(var n in t)m.set(n,t[n]);else m.set(t,e)},d.getEnv=function(t){return\"string\"==typeof t?m.get(t):m.value},d.init=function(t){h||(t||(e.available?t=new e:\"object\"==typeof localStorage?t=new n(localStorage):\"function\"==typeof importScripts&&(self.addEventListener(\"message\",function(t){var e=t.data;switch(\"string\"==typeof e&&(e=JSON.parse(e)),e.type){case\"upload\":d.get(e.base).importFromObject(e.data);break;case\"observe\":h.observe(e.path,function(t,e){self.postMessage(JSON.stringify({type:\"changed\",path:t,content:d.get(t).text(),meta:e}))})}}),t=n.ramDisk())),h=new u(t))},d.getRootFS=function(){return d.init(),h},d.get=function(){return d.init(),h.get.apply(h,arguments)},d.expandPath=function(){return m.expandPath.apply(m,arguments)},d.resolve=function(t,e){return d.init(),a.is(t)?t:(t=m.expandPath(t),e&&!i.isAbsolutePath(t)?(e=m.expandPath(e),d.get(e).rel(t)):d.get(t))},d.mount=function(){return d.init(),h.mount.apply(h,arguments)},d.unmount=function(){return d.init(),h.unmount.apply(h,arguments)},d.isFile=function(t){return a.is(t)},d}),i([\"FS\"],function(t){o=t}),\"undefined\"!=typeof window&&void 0===window.FS&&(window.FS=o),void 0!==e&&(e=o),o)},{fs:1}],21:[function(t,e,n){var r=1,i={},o={},s=self;s.WorkerService={install:function(t,e){i[t]=e},serv:function(t,e){this.install(t,e)},ready:function(){s.WorkerService.isReady=!0,self.postMessage({ready:!0})},reverse:function(t,e){var n=r++;return new Promise(function(r,i){o[n]=function(t){\"ok\"==t.status?r(t.result):i(t.error)},self.postMessage({reverse:!0,id:n,path:t,params:e})})}},self.addEventListener(\"message\",function(t){var e=t.data,n=e.id,r={id:n};if(e.reverse)return o[e.id](e),void delete o[e.id];try{Promise.resolve(i[e.path](e.params,r)).then(function(t){self.postMessage({id:n,result:t,status:\"ok\"})},s)}catch(t){s(t)}function s(t){t=Object.assign({name:t.name,message:t.message,stack:t.stack},t||{});try{const e=JSON.stringify(t);t=JSON.parse(e)}catch(e){t=t?t.message||t+\"\":\"unknown\",console.log(\"WorkerServiceW\",e,t)}self.postMessage({id:n,error:t,status:\"error\"})}}),s.WorkerService.install(\"WorkerService/isReady\",function(){return s.WorkerService.isReady}),s.console||(s.console={log:function(){s.WorkerService.reverse(\"console/log\",Array.prototype.slice.call(arguments))}}),e.exports=self.WorkerService},{}],22:[function(t,e,n){const r=function(t){this.failMesg=a(t||\"Assertion failed: \")};var i;r.prototype={_regedType:{},registerType:function(t,e){this._regedType[t]=e},MODE_STRICT:\"strict\",MODE_DEFENSIVE:\"defensive\",MODE_BOOL:\"bool\",fail:function(){var t=i(arguments),e=t.shift();if(t=a(t),t=this.failMesg.concat(e).concat(t).concat([\"mode\",this._mode]),console.log.apply(console,t),this.isDefensive())return e;if(this.isBool())return!1;throw new Error(t.join(\" \"))},subAssertion:function(){var t=i(arguments);return t=a(t),new r(this.failMesg.concat(t))},assert:function(t,e){return t||this.fail(t,e)},eq:function(t,e){return t!==e?this.fail(t,\"!==\",e):!!this.isBool()||t},ne:function(t,e){return t===e?this.fail(t,\"===\",e):!!this.isBool()||t},isset:function(t,e){return null==t?this.fail(t,(e||\"\")+\" is null/undef\"):!!this.isBool()||t},is:function(t,e){var n=e,r=t;if(null==n)return this.fail(t,\"assert.is: type must be set\");if(n._assert_func)return n._assert_func.apply(this,[r]),!!this.isBool()||t;if(this.assert(null!=t,[t,\"should be \",n]),n instanceof Array||\"object\"==typeof global&&\"function\"==typeof global.Array&&n instanceof global.Array){if(!t||\"number\"!=typeof t.length)return this.fail(t,\"should be array:\");for(var i=0;i<n.length;i++){let e=this.subAssertion(\"failed at \",t,\"[\",i,\"]: \");null==n[i]&&console.log(\"WOW!7\",r[i],n[i]),e.is(r[i],n[i])}return!!this.isBool()||t}if(n===String||\"string\"==n)return this.assert(\"string\"==typeof r,[r,\"should be a string \"]),!!this.isBool()||t;if(n===Number||\"number\"==n)return this.assert(\"number\"==typeof r,[r,\"should be a number\"]),!!this.isBool()||t;if(n instanceof RegExp||\"object\"==typeof global&&\"function\"==typeof global.RegExp&&n instanceof global.RegExp)return this.is(r,String),this.assert(n.exec(r),[r,\"does not match to\",n]),!!this.isBool()||t;if(n===Function)return this.assert(\"function\"==typeof r,[r,\"should be a function\"]),!!this.isBool()||t;if(\"function\"==typeof n)return this.assert(r instanceof n,[r,\"should be \",n]),!!this.isBool()||t;if(n&&\"object\"==typeof n){for(var o in n){this.subAssertion(\"failed at \",t,\".\",o,\":\").is(t[o],n[o])}return!!this.isBool()||t}if(\"string\"==typeof n){var s=this._regedType[n];return s?this.is(t,s):!!this.isBool()||t}return this.fail(t,\"Invaild type: \",n)},ensureError:function(t,e){try{t()}catch(n){return\"string\"==typeof e&&s(n+\"\"===e,t+\" thrown an error \"+n+\" but expected:\"+e),void console.log(\"Error thrown successfully: \",n.message)}this.fail(t,\"should throw an error\",e)},setMode:function(t){this._mode=t},isDefensive:function(){return this._mode===this.MODE_DEFENSIVE},isBool:function(){return this._mode===this.MODE_BOOL},isStrict:function(){return!this.isDefensive()&&!this.isBool()}},i=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e};var o=new r,s=function(){try{return o.assert.apply(o,arguments)}catch(t){throw new Error(t.message)}};function a(t){if(t instanceof Array){var e=[];return t.forEach(function(t){e=e.concat(a(t))}),e}return[t]}[\"setMode\",\"isDefensive\",\"is\",\"isset\",\"ne\",\"eq\",\"ensureError\"].forEach(function(t){s[t]=function(){try{return o[t].apply(o,arguments)}catch(t){throw console.log(t.stack),new Error(t.message)}}}),s.fail=o.fail.bind(o),s.MODE_STRICT=o.MODE_STRICT,s.MODE_DEFENSIVE=o.MODE_DEFENSIVE,s.MODE_BOOL=o.MODE_BOOL,s.f=function(t){return{_assert_func:t}},s.opt=function(t){return s.f(function(e){return null==e||e instanceof t})},s.and=function(){var t=i(arguments);return s(t instanceof Array),s.f(function(e){for(var n=0;n<t.length;n++)this.is(e,t[n])})},e.exports=s},{}],23:[function(t,e,n){e.exports=\"undefined\"!=typeof window?window:\"undefined\"!=typeof self?self:\"undefined\"!=typeof global?global:function(){return this}()},{}],24:[function(t,e,n){const r=t(\"./ProjectFactory\"),i=(t(\"../lib/root\"),t(\"../lang/SourceFiles\")),o=t(\"../lang/langMod\");var s;r.addType(\"compiled\",t=>{if(t.namespace&&t.url)return function(t){const e=t.namespace,n=t.url;return r.createCore().include(o).include({getNamespace:function(){return e},loadClasses:async function(t){console.log(\"Loading compiled classes ns=\",e,\"url=\",n),await this.loadDependingClasses();const r=i.add({url:n});await r.exec(),console.log(\"Loaded compiled classes ns=\",e,\"url=\",n)}})}(t);if(t.dir)return t=t,r.createDirBasedCore(t).include(o).include({loadClasses:async function(e){console.log(\"Loading compiled classes params=\",t),await this.loadDependingClasses();const n=this.getOutputFile(),r=n.sibling(n.name()+\".map\"),o=i.add({text:n.text(),sourceMap:r.exists()&&r.text()});await o.exec(),console.log(\"Loaded compiled classes params=\",t)}});throw console.error(\"Invalid compiled project\",t),new Error(\"Invalid compiled project\")}),n.create=(t=>r.create(\"compiled\",t)),r.addDependencyResolver((t,e)=>e.dir&&t.resolve?r.create(\"compiled\",{dir:t.resolve(e.dir)}):e.namespace&&e.url?r.create(\"compiled\",e):void 0)},{\"../lang/SourceFiles\":10,\"../lang/langMod\":15,\"../lib/root\":23,\"./ProjectFactory\":25}],25:[function(t,e,n){const r=[],i={};n.addDependencyResolver=(t=>{r.push(t)}),n.addType=((t,e)=>{i[t]=e}),n.fromDependencySpec=function(t,e){if(\"string\"==typeof e){var n=t.resolve(e);return this.fromDir(n)}for(let n of r){const r=n(t,e);if(r)return r}throw console.error(\"Invalid dep spec\",e),new Error(\"Invalid dep spec\",e)},n.create=function(t,e){if(!i[t])throw new Error(`Invalid type ${t}`);return i[t](e)};class o{getPublishedURL(){}getOptions(t){return{}}getName(){return this.dir.name().replace(/\\/$/,\"\")}getDependingProjects(){var t=this.getOptions();return(t.compiler&&t.compiler.dependingProjects||[]).map(t=>o.factory.fromDependencySpec(this,t))}include(t){for(let e of Object.getOwnPropertyNames(t))\"function\"==typeof t[e]&&(this[e]=t[e]);return this}delegate(t){if(t.constructor.prototype){const e=e=>{\"function\"==typeof t[e]&&(this[e]=((...n)=>t[e](...n)))};for(let n of Object.getOwnPropertyNames(t.constructor.prototype))e(n)}return this}}o.factory=n,n.createCore=(()=>new o);const s={getDir(){return this.dir},resolve(t){if(t instanceof Array){var e=[];return t.forEach(function(t){e.push(this.resolve(t))}),e}if(\"string\"==typeof t)return\"undefined\"!=typeof FS?FS.resolve(t,this.getDir().path()):this.getDir().rel(t);if(!t||!t.isDir)throw new Error(\"Cannot TPR.resolve: \"+t);return t},getOptions(t){return this.getOptionsFile().obj()},getOptionsFile(){return this.dir.rel(\"options.json\")},setOptions(t){return this.getOptionsFile().obj(t)},getOutputFile(t){var e=this.getOptions(),n=this.resolve(e.compiler.outputFile||\"js/concat.js\");if(n.isDir())throw new Error(\"out: directory style not supported\");return n},removeOutputFile(){this.getOutputFile().rm()},path(){return this.dir.path()},getEXT(){throw new Error(\"getEXT must be overriden.\")},sourceFiles(){const t={},e=this.getEXT();return this.dir.recursive(function(n){if(n.endsWith(e)){var r=n.truncExt(e);t[r]=n}}),t}};n.createDirBasedCore=function(t){const e=this.createCore();return e.dir=t.dir,e.include(s)}},{}],26:[function(t,e,n){var r=function(t,e,n){let i;if(\"string\"==typeof e)return t+=\" at \"+(i=r.calcRowCol(e,n)).row+\":\"+i.col,a(new Error(t),{isTError:!0,src:{path:function(){return\"/\"},name:function(){return\"unknown\"},text:function(){return e}},pos:n,row:i.row,col:i.col,raise:function(){throw this}});var o=null;if(e&&e.src&&(e=(o=e).src.tonyu),\"function\"!=typeof e.name||\"function\"!=typeof e.text)throw new Error(\"src=\"+e+\" should be file object\");const s=e.text();function a(t,e){for(var n in e)t[n]=e[n];return t}return i=r.calcRowCol(s,n),t+=\" at \"+e.name()+\":\"+i.row+\":\"+i.col,a(new Error(t),{isTError:!0,src:e,pos:n,row:i.row,col:i.col,klass:o,raise:function(){throw this}})};r.calcRowCol=function(t,e){var n,r,i=t.split(\"\\n\"),o=0;for(n=0;n<i.length;n++)if((o+=i[n].length+1)>e){r=e-(o-i[n].length);break}return{row:n+1,col:r+1}},e.exports=r},{}],27:[function(t,e,n){var r=t(\"../lib/assert\"),i=t(\"../lib/root\"),o=t(\"./TonyuThread\"),s=t(\"./tonyuIterator\");e.exports=function(){i.performance||(i.performance={}),i.performance.now||(i.performance.now=function(){return Date.now()});var t,e,n={};function a(e){if(!t.onRuntimeError)throw i.alert&&i.alert(\"エラー! メッセージ  : \"+e),console.log(e.stack),e;t.onRuntimeError(e)}function u(t,e){return r.is(arguments,[String,Object]),f(n.getMeta(t),e)}function c(t,e){return f(t?Object.create(t.prototype):{},e)}function f(t,e){if(e&&\"object\"==typeof e)for(var n in e)t[n]=e[n];return t}n.addMeta=u,n.removeMeta=function(t){delete h[t]},n.getMeta=function(t){if(\"function\"==typeof t)return t.meta;if(\"string\"==typeof t){var e=h[t];return e||(h[t]=e={}),e}},n.ensureNamespace=function(t,e){var n,r=e.split(\".\"),i=t;for(n=0;n<r.length;n++){var o=r[n];i[o]||(i[o]={}),i=i[o]}return i},n.propReg=/^__([gs]et)ter__(.*)$/,n.define=function(e){var r=e.superclass,i=e.includes,o=e.fullName,s=e.shortName,a=e.namespace,l=e.methods,p=e.decls,h=n.ensureNamespace(t.classes,a);function d(t,e){if(!t.prototype.hasOwnProperty(\"getClassInfo\"))throw new Error(\"NO\");if(!t.meta)throw console.log(\"metanotfound\",t),new Error(\"meta not found\");return function t(e,n){if((n=n||{}).isShim)return e;if(n.path=n.path||[],n.path.push(e),e.isShim)throw console.log(\"chkmeta::ctx\",n),new Error(\"Shim found \"+e.extenderFullName);if(e.superclass&&t(e.superclass,n),!e.includes)throw console.log(\"chkmeta::ctx\",n),new Error(\"includes not found\");return e.includes.forEach(function(e){t(e,n)}),n.path.pop(),e}(t.meta,e),t}function g(t,e){var r=!e.init,h=e.includesRec;if(h[o])return t;h[o]=!0,i.forEach(function(n){t=n.extendFrom(t,f(e,{init:!1}))});var g,v=\"function\"==typeof l?l(t):l,y=v.initialize;delete v.initialize,(g=y?function(){this instanceof g||m(o),y.apply(this,arguments)}:t?function(){this instanceof g||m(o),t.apply(this,arguments)}:function(){this instanceof g||m(o)}).prototype=c(t,{constructor:g}),g.meta=r?{isShim:!0,extenderFullName:o}:u(o,{fullName:o,shortName:s,namespace:a,decls:p,superclass:e.nonShimParent?e.nonShimParent.meta:null,includesRec:h,includes:i.map(function(t){return t.meta})}),g.meta.func=g,g.methods=v;var b,x=g.prototype,w={},S=n.propReg;for(b in v)if(!b.match(/^fiber\\$/)){x[b]=v[b];var E=\"fiber$\"+b;if(v[E]&&(x[E]=v[E],x[E].methodInfo=x[E].methodInfo||{name:b,klass:g,fiber:!0},x[b].fiber=x[E]),\"__dummy\"!==b&&!x[b])throw console.log(\"WHY!\",x[b],x,b),new Error(\"WHY!\"+b);x[b].methodInfo=x[b].methodInfo||{name:b,klass:g};var _=S.exec(b);_&&(w[_[2]]=w[_[2]]||{},w[_[2]][_[1]]=x[b])}for(b in x.isTonyuObject=!0,w)Object.defineProperty(x,b,w[b]);return x.getClassInfo=function(){return g.meta},d(g,{isShim:r})}var v=g(r,{init:!0,initFullName:o,includesRec:r?f({},r.meta.includesRec):{},nonShimParent:r});return v.extendFrom=g,h[s]=v,v,d(v,{isShim:!1})},n.isSourceChanged=function(t){return!(!(t=t.meta||t).src||!t.src.tonyu)&&(!t.nodeTimestamp||t.src.tonyu.lastUpdate()>t.nodeTimestamp)},n.shouldCompile=function(t){if((t=t.meta||t).hasSemanticError)return!0;if(n.isSourceChanged(t))return!0;for(var e=n.getDependingClasses(t),r=0;r<e.length;r++)if(n.shouldCompile(e[r]))return!0},n.getDependingClasses=function(t){var e=[];return(t=t.meta||t).superclass&&(e=[t.superclass]),t.includes&&(e=e.concat(t.includes)),e};var l={},p={},h={};function d(t){var e,n=t.split(\".\"),r=p;if(n.forEach(function(t){r&&(r=r[t])}),!r&&1==n.length)for(var i in p){var o=p[i][t];if(o){if(r)throw new Error(\"曖昧なクラス名： \"+i+\".\"+t+\", \"+e);r=o,e=i+\".\"+t}}return r}function m(t){throw new Error(\"クラス名\"+t+\"はnewをつけて呼び出して下さい。\")}var g=i.performance.now();function v(t){g=i.performance.now()+(t||0)}if(t={thread:function(){var t=new e;return t.handleEx=a,t},klass:n,bless:c,extend:f,globals:l,classes:p,classMetas:h,setGlobal:function(t,e){l[t]=e},getGlobal:function(t){return l[t]},getClass:d,timeout:function(t){return new Promise(function(e){setTimeout(e,t)})},bindFunc:function(e,n){if(\"function\"!=typeof n)return n;var r=function(){return n.apply(e,arguments)};return r.methodInfo=t.extend({thiz:e},n.methodInfo||{}),n.fiber&&((r.fiber=function(){return n.fiber.apply(e,arguments)}).methodInfo=t.extend({thiz:e},n.fiber.methodInfo||{})),r},not_a_tonyu_object:function(t){throw console.log(\"Not a tonyu object: \",t),new Error(t+\" is not a tonyu object\")},is:function(t,e){return!!t&&(t instanceof e||!(\"function\"!=typeof t.getClassInfo||!e.meta)&&t.getClassInfo().includesRec[e.meta.fullName])},hasKey:function(t,e){return t in e},invokeMethod:function(t,e,n,r){if(!t)throw new Error(r+\"(=\"+t+\")のメソッド \"+e+\"を呼び出せません\");var i=t[e];if(\"function\"!=typeof i)throw new Error((\"this\"==r?\"\":r+\".\")+e+\"(=\"+i+\")はメソッドではありません\");return i.apply(t,n)},callFunc:function(t,e,n){if(\"function\"!=typeof t)throw new Error(n+\"は関数ではありません\");return t.apply({},e)},checkNonNull:function(t,e){if(t!=t||null==t)throw new Error(e+\"(=\"+t+\")は初期化されていません\");return t},iterator:s,run:function(e){var n=d(e);if(!n)throw new Error(e+\" というクラスはありません\");t.runMode=!0;var r=new n,i=t.currentProject;i&&(i.runningObj=r)},checkLoop:function(){var t=i.performance.now();if(t-g>1e3)throw v(1e4),new Error(\"無限ループをストップしました。\\n   プロジェクト オプションで無限ループチェックの有無を設定できます。\\n   [参考]https://edit.tonyu.jp/doc/options.html\\n\");t},resetLoopCheck:v,VERSION:1560828115159,A:function(t){for(var e=[],n=1;n<t.length;n++)e[n-1]=t[n];return e},ID:Math.random()},e=o(t),i.Tonyu)throw console.error(\"Tonyu called twice!\"),new Error(\"Tonyu called twice!\");return i.Tonyu=t,t}()},{\"../lib/assert\":22,\"../lib/root\":23,\"./TonyuThread\":28,\"./tonyuIterator\":29}],28:[function(t,e,n){e.exports=function(t){var e=1;class n{constructor(){this.frame=null,this._isDead=!1,this.cnt=0,this._isWaiting=!1,this.fSuspended=!1,this.tryStack=[],this.preemptionTime=60,this.onEndHandlers=[],this.onTerminateHandlers=[],this.id=e++,this.age=0}isAlive(){return!this.isDead()}isDead(){return this._isDead=this._isDead||null==this.frame||this._threadGroup&&(this._threadGroup.objectPoolAge!=this.tGrpObjectPoolAge||this._threadGroup.isDeadThreadGroup()),this._isDead}setThreadGroup(t){this._threadGroup=t,this.tGrpObjectPoolAge=t.objectPoolAge}isWaiting(){return this._isWaiting}suspend(){this.fSuspended=!0,this.cnt=0}enter(t){this.frame={prev:this.frame,func:t}}apply(t,e,n){var r;if(n||(n=[]),\"string\"==typeof e&&!(r=t[\"fiber$\"+e]))throw new Error(\"メソッド\"+e+\"が見つかりません\");if(\"function\"==typeof e&&!(r=e.fiber)){var i=e.methodInfo?e.methodInfo.name:e.name;throw new Error(\"メソッド\"+i+\"は待機可能メソッドではありません\")}n=[this].concat(n);var o=0;return this.enter(function(e){switch(o){case 0:r.apply(t,n),o=1;break;case 1:e.termStatus=\"success\",e.notifyEnd(e.retVal),n[0].exit(),o=2}})}notifyEnd(t){this.onEndHandlers.forEach(function(e){e(t)}),this.notifyTermination({status:\"success\",value:t})}notifyTermination(t){this.onTerminateHandlers.forEach(function(e){e(t)})}on(t,e){\"end\"!==t&&\"success\"!==t||this.onEndHandlers.push(e),\"terminate\"===t&&(this.onTerminateHandlers.push(e),this.handleEx&&delete this.handleEx)}promise(){var t=this;return new Promise(function(e,n){t.on(\"terminate\",function(t){\"success\"===t.status?e(t.value):\"exception\"===t.status?n(t.exception):n(new Error(t.status))})})}then(t,e){return e?this.promise().then(t,e):this.promise().then(t)}fail(t){return this.promise().then(t=>t,t)}gotoCatch(t){var e=this;if(0==e.tryStack.length)return e.termStatus=\"exception\",e.kill(),void(e.handleEx?e.handleEx(t):e.notifyTermination({status:\"exception\",exception:t}));e.lastEx=t;for(var n=e.tryStack.pop();e.frame;){if(n.frame===e.frame){e.catchPC=n.catchPC;break}e.frame=e.frame.prev}}startCatch(){var t=this.lastEx;return this.lastEx=null,t}exit(t){this.frame=this.frame?this.frame.prev:null,this.retVal=t}enterTry(t){this.tryStack.push({frame:this.frame,catchPC:t})}exitTry(){this.tryStack.pop()}waitEvent(t,e){var n,r=this;(r.suspend(),t.on)&&(e=e.concat(function(){r.lastEvent=arguments,r.retVal=arguments[0],n.remove(),r.steps()}),n=t.on.apply(t,e))}runAsync(t){var e=this,n=function(){e.retVal=arguments,e.steps()},r=function(){for(var t=\"\",n=0;n<arguments.length;n++)t+=arguments[n]+\",\";0==t.length&&(t=\"Async fail\");var r=new Error(t);r.args=arguments,e.gotoCatch(r),e.steps()};e.suspend(),setTimeout(function(){t(n,r)},0)}waitFor(t){var e=this;return e._isWaiting=!0,e.suspend(),t instanceof n&&(t=t.promise()),Promise.resolve(t).then(function(t){e.retVal=t,e.stepsLoop()}).then(t=>t,function(t){e.gotoCatch(e.wrapError(t)),e.stepsLoop()})}wrapError(t){if(t instanceof Error)return t;var e=new Error(t);return e.original=t,e}resume(t){this.retVal=t,this.steps()}steps(){var e=this;if(!e.isDead()){var n=t.currentThread;for(t.currentThread=e,e.cnt=e.preemptionTime,e.preempted=!1,e.fSuspended=!1;e.cnt>0&&e.frame;)try{for(;e.cnt-- >0&&e.frame;)e.frame.func(e);e.preempted=!e.fSuspended&&e.isAlive()}catch(t){e.gotoCatch(t)}t.currentThread=n}}stepsLoop(){var t=this;t.steps(),t.preempted&&setTimeout(function(){t.stepsLoop()},0)}kill(){var t=this;t._isDead=!0,t.frame=null,t.termStatus||(t.termStatus=\"killed\",t.notifyTermination({status:\"killed\"}))}clearFrame(){this.frame=null,this.tryStack=[]}}return n}},{}],29:[function(t,e,n){class r{constructor(t){this.set=t,this.i=0}next(){return!(this.i>=this.set.length)&&(this[0]=this.set[this.i],this.i++,!0)}}class i{constructor(t){this.set=t,this.i=0}next(){return!(this.i>=this.set.length)&&(this[0]=this.i,this[1]=this.set[this.i],this.i++,!0)}}class o{constructor(t){for(var e in this.elems=[],t)this.elems.push(e);this.i=0}next(){return!(this.i>=this.elems.length)&&(this[0]=this.elems[this.i],this.i++,!0)}}class s{constructor(t){for(var e in this.elems=[],t)this.elems.push([e,t[e]]);this.i=0}next(){return!(this.i>=this.elems.length)&&(this[0]=this.elems[this.i][0],this[1]=this.elems[this.i][1],this.i++,!0)}}e.exports=function(t,e){if(t.tonyuIterator)return t.tonyuIterator(e);if(t instanceof Array)return 1==e?new r(t):new i(t);if(t instanceof Object)return 1==e?new o(t):new s(t);throw console.log(t),new Error(t+\" is not iterable\")}},{}]},{},[2]);"],{type:"text/javscript"});
				return URL.createObjectURL(b);
			})());