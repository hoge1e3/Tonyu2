(function (root, factory) {
    root.Mezonet = factory();
}(this, function () {
var requirejs,require,define;(function(undef){var main,req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice,jsSuffixRegExp=/\.js$/;function hasProp(obj,prop){return hasOwn.call(obj,prop)}function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,lastIndex,foundI,foundStarMap,starI,i,j,part,normalizedBaseParts,baseParts=baseName&&baseName.split("/"),map=config.map,starMap=map&&map["*"]||{};if(name){name=name.split("/");lastIndex=name.length-1;if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,"")}if(name[0].charAt(0)==="."&&baseParts){normalizedBaseParts=baseParts.slice(0,baseParts.length-1);name=normalizedBaseParts.concat(name)}for(i=0;i<name.length;i++){part=name[i];if(part==="."){name.splice(i,1);i-=1}else if(part===".."){if(i===0||i===1&&name[2]===".."||name[i-1]===".."){continue}else if(i>0){name.splice(i-1,2);i-=2}}}name=name.join("/")}if((baseParts||starMap)&&map){nameParts=name.split("/");for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join("/");if(baseParts){for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join("/")];if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){foundMap=mapValue;foundI=i;break}}}}if(foundMap){break}if(!foundStarMap&&starMap&&starMap[nameSegment]){foundStarMap=starMap[nameSegment];starI=i}}if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI}if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join("/")}}return name}function makeRequire(relName,forceSync){return function(){var args=aps.call(arguments,0);if(typeof args[0]!=="string"&&args.length===1){args.push(null)}return req.apply(undef,args.concat([relName,forceSync]))}}function makeNormalize(relName){return function(name){return normalize(name,relName)}}function makeLoad(depName){return function(value){defined[depName]=value}}function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name]=true;main.apply(undef,args)}if(!hasProp(defined,name)&&!hasProp(defining,name)){throw new Error("No "+name)}return defined[name]}function splitPrefix(name){var prefix,index=name?name.indexOf("!"):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length)}return[prefix,name]}function makeRelParts(relName){return relName?splitPrefix(relName):[]}makeMap=function(name,relParts){var plugin,parts=splitPrefix(name),prefix=parts[0],relResourceName=relParts[1];name=parts[1];if(prefix){prefix=normalize(prefix,relResourceName);plugin=callDep(prefix)}if(prefix){if(plugin&&plugin.normalize){name=plugin.normalize(name,makeNormalize(relResourceName))}else{name=normalize(name,relResourceName)}}else{name=normalize(name,relResourceName);parts=splitPrefix(name);prefix=parts[0];name=parts[1];if(prefix){plugin=callDep(prefix)}}return{f:prefix?prefix+"!"+name:name,n:name,pr:prefix,p:plugin}};function makeConfig(name){return function(){return config&&config.config&&config.config[name]||{}}}handlers={require:function(name){return makeRequire(name)},exports:function(name){var e=defined[name];if(typeof e!=="undefined"){return e}else{return defined[name]={}}},module:function(name){return{id:name,uri:"",exports:defined[name],config:makeConfig(name)}}};main=function(name,deps,callback,relName){var cjsModule,depName,ret,map,i,relParts,args=[],callbackType=typeof callback,usingExports;relName=relName||name;relParts=makeRelParts(relName);if(callbackType==="undefined"||callbackType==="function"){deps=!deps.length&&callback.length?["require","exports","module"]:deps;for(i=0;i<deps.length;i+=1){map=makeMap(deps[i],relParts);depName=map.f;if(depName==="require"){args[i]=handlers.require(name)}else if(depName==="exports"){args[i]=handlers.exports(name);usingExports=true}else if(depName==="module"){cjsModule=args[i]=handlers.module(name)}else if(hasProp(defined,depName)||hasProp(waiting,depName)||hasProp(defining,depName)){args[i]=callDep(depName)}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i]=defined[depName]}else{throw new Error(name+" missing "+depName)}}ret=callback?callback.apply(defined[name],args):undefined;if(name){if(cjsModule&&cjsModule.exports!==undef&&cjsModule.exports!==defined[name]){defined[name]=cjsModule.exports}else if(ret!==undef||!usingExports){defined[name]=ret}}}else if(name){defined[name]=callback}};requirejs=require=req=function(deps,callback,relName,forceSync,alt){if(typeof deps==="string"){if(handlers[deps]){return handlers[deps](callback)}return callDep(makeMap(deps,makeRelParts(callback)).f)}else if(!deps.splice){config=deps;if(config.deps){req(config.deps,config.callback)}if(!callback){return}if(callback.splice){deps=callback;callback=relName;relName=null}else{deps=undef}}callback=callback||function(){};if(typeof relName==="function"){relName=forceSync;forceSync=alt}if(forceSync){main(undef,deps,callback,relName)}else{setTimeout(function(){main(undef,deps,callback,relName)},4)}return req};req.config=function(cfg){return req(cfg)};requirejs._defined=defined;define=function(name,deps,callback){if(typeof name!=="string"){throw new Error("See almond README: incorrect module build, no module name")}if(!deps.splice){callback=deps;deps=[]}if(!hasProp(defined,name)&&!hasProp(waiting,name)){waiting[name]=[name,deps,callback]}};define.amd={jQuery:true}})();

define("almond", function(){});

define('WorkerFactory',[],function () {
    var WorkerFactory={
        extractSrcFromFunction: function (f,startMark,endMark) {
            startMark=startMark||/(.|\s)*WORKER[_]SRC[_]BEGIN\*\//;
            endMark=endMark||/\/\*WORKER[_]SRC[_]END(.|\s)*/;
            var src=(""+f).replace(startMark,"").replace(endMark,"");
            return src;
        },
        createFromFunction: function (f,startMark,endMark) {
            var src=this.extractSrcFromFunction(f,startMark,endMark);
            return this.createFromString(src);
        },
        createFromString: function (src) {
            var url=URL.createObjectURL( new Blob([src] ,{type:"text/javascript"} ));
            return new Worker(url);
        },
        require: function (name) {
            return new Worker("worker.js?main="+name);
        },
        create: function (src) {
            if (typeof src==="string") {
                return this.require(src);
            } else if (typeof src==="function") {
                return this.createFromFunction(src);
            }
            throw new Error("Invaluid src type "+src);
        }
    };

    return WorkerFactory;
});

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})({
  1: [ function(require, module, exports) {
    var process = module.exports = {};
    process.nextTick = function() {
      var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
      var canPost = typeof window !== "undefined" && window.postMessage && window.addEventListener;
      if (canSetImmediate) {
        return function(f) {
          return window.setImmediate(f);
        };
      }
      if (canPost) {
        var queue = [];
        window.addEventListener("message", function(ev) {
          var source = ev.source;
          if ((source === window || source === null) && ev.data === "process-tick") {
            ev.stopPropagation();
            if (queue.length > 0) {
              var fn = queue.shift();
              fn();
            }
          }
        }, true);
        return function nextTick(fn) {
          queue.push(fn);
          window.postMessage("process-tick", "*");
        };
      }
      return function nextTick(fn) {
        setTimeout(fn, 0);
      };
    }();
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
  }, {} ],
  2: [ function(require, module, exports) {
    "use strict";
    var asap = require("asap");
    module.exports = Promise;
    function Promise(fn) {
      if (typeof this !== "object") throw new TypeError("Promises must be constructed via new");
      if (typeof fn !== "function") throw new TypeError("not a function");
      var state = null;
      var value = null;
      var deferreds = [];
      var self = this;
      this.then = function(onFulfilled, onRejected) {
        return new self.constructor(function(resolve, reject) {
          handle(new Handler(onFulfilled, onRejected, resolve, reject));
        });
      };
      function handle(deferred) {
        if (state === null) {
          deferreds.push(deferred);
          return;
        }
        asap(function() {
          var cb = state ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (state ? deferred.resolve : deferred.reject)(value);
            return;
          }
          var ret;
          try {
            ret = cb(value);
          } catch (e) {
            deferred.reject(e);
            return;
          }
          deferred.resolve(ret);
        });
      }
      function resolve(newValue) {
        try {
          if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
          if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
            var then = newValue.then;
            if (typeof then === "function") {
              doResolve(then.bind(newValue), resolve, reject);
              return;
            }
          }
          state = true;
          value = newValue;
          finale();
        } catch (e) {
          reject(e);
        }
      }
      function reject(newValue) {
        state = false;
        value = newValue;
        finale();
      }
      function finale() {
        for (var i = 0, len = deferreds.length; i < len; i++) handle(deferreds[i]);
        deferreds = null;
      }
      doResolve(fn, resolve, reject);
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
      this.onRejected = typeof onRejected === "function" ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function(value) {
          if (done) return;
          done = true;
          onFulfilled(value);
        }, function(reason) {
          if (done) return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        onRejected(ex);
      }
    }
  }, {
    asap: 4
  } ],
  3: [ function(require, module, exports) {
    "use strict";
    var Promise = require("./core.js");
    var asap = require("asap");
    module.exports = Promise;
    function ValuePromise(value) {
      this.then = function(onFulfilled) {
        if (typeof onFulfilled !== "function") return this;
        return new Promise(function(resolve, reject) {
          asap(function() {
            try {
              resolve(onFulfilled(value));
            } catch (ex) {
              reject(ex);
            }
          });
        });
      };
    }
    ValuePromise.prototype = Promise.prototype;
    var TRUE = new ValuePromise(true);
    var FALSE = new ValuePromise(false);
    var NULL = new ValuePromise(null);
    var UNDEFINED = new ValuePromise(undefined);
    var ZERO = new ValuePromise(0);
    var EMPTYSTRING = new ValuePromise("");
    Promise.resolve = function(value) {
      if (value instanceof Promise) return value;
      if (value === null) return NULL;
      if (value === undefined) return UNDEFINED;
      if (value === true) return TRUE;
      if (value === false) return FALSE;
      if (value === 0) return ZERO;
      if (value === "") return EMPTYSTRING;
      if (typeof value === "object" || typeof value === "function") {
        try {
          var then = value.then;
          if (typeof then === "function") {
            return new Promise(then.bind(value));
          }
        } catch (ex) {
          return new Promise(function(resolve, reject) {
            reject(ex);
          });
        }
      }
      return new ValuePromise(value);
    };
    Promise.all = function(arr) {
      var args = Array.prototype.slice.call(arr);
      return new Promise(function(resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === "object" || typeof val === "function")) {
              var then = val.then;
              if (typeof then === "function") {
                then.call(val, function(val) {
                  res(i, val);
                }, reject);
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
    Promise.reject = function(value) {
      return new Promise(function(resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function(values) {
      return new Promise(function(resolve, reject) {
        values.forEach(function(value) {
          Promise.resolve(value).then(resolve, reject);
        });
      });
    };
    Promise.prototype["catch"] = function(onRejected) {
      return this.then(null, onRejected);
    };
  }, {
    "./core.js": 2,
    asap: 4
  } ],
  4: [ function(require, module, exports) {
    (function(process) {
      var head = {
        task: void 0,
        next: null
      };
      var tail = head;
      var flushing = false;
      var requestFlush = void 0;
      var isNodeJS = false;
      function flush() {
        while (head.next) {
          head = head.next;
          var task = head.task;
          head.task = void 0;
          var domain = head.domain;
          if (domain) {
            head.domain = void 0;
            domain.enter();
          }
          try {
            task();
          } catch (e) {
            if (isNodeJS) {
              if (domain) {
                domain.exit();
              }
              setTimeout(flush, 0);
              if (domain) {
                domain.enter();
              }
              throw e;
            } else {
              setTimeout(function() {
                throw e;
              }, 0);
            }
          }
          if (domain) {
            domain.exit();
          }
        }
        flushing = false;
      }
      if (typeof process !== "undefined" && process.nextTick) {
        isNodeJS = true;
        requestFlush = function() {
          process.nextTick(flush);
        };
      } else if (typeof setImmediate === "function") {
        if (typeof window !== "undefined") {
          requestFlush = setImmediate.bind(window, flush);
        } else {
          requestFlush = function() {
            setImmediate(flush);
          };
        }
      } else if (typeof MessageChannel !== "undefined") {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        requestFlush = function() {
          channel.port2.postMessage(0);
        };
      } else {
        requestFlush = function() {
          setTimeout(flush, 0);
        };
      }
      function asap(task) {
        tail = tail.next = {
          task: task,
          domain: isNodeJS && process.domain,
          next: null
        };
        if (!flushing) {
          flushing = true;
          requestFlush();
        }
      }
      module.exports = asap;
    }).call(this, require("_process"));
  }, {
    _process: 1
  } ],
  5: [ function(require, module, exports) {
    if (typeof Promise.prototype.done !== "function") {
      Promise.prototype.done = function(onFulfilled, onRejected) {
        var self = arguments.length ? this.then.apply(this, arguments) : this;
        self.then(null, function(err) {
          setTimeout(function() {
            throw err;
          }, 0);
        });
      };
    }
  }, {} ],
  6: [ function(require, module, exports) {
    var asap = require("asap");
    if (typeof Promise === "undefined") {
      Promise = require("./lib/core.js");
      require("./lib/es6-extensions.js");
    }
    require("./polyfill-done.js");
  }, {
    "./lib/core.js": 2,
    "./lib/es6-extensions.js": 3,
    "./polyfill-done.js": 5,
    asap: 4
  } ]
}, {}, [ 6 ]);
//# sourceMappingURL=/polyfills/promise-6.1.0.js.map
;
define("promise", function(){});

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

define('FuncUtil',[], function () {
    var FuncUtil={};
    FuncUtil.getParams=FuncUtil.getArgs=function getParams(f) {
        var fpat=/function[^\(]*\(([^\)]*)\)/;
        var r=fpat.exec(f+"");
        if (r) {
            return r[1].replace(/\s/g,"").split(",");
        }
        return [];
    };
    FuncUtil.wrap=function (f, wrapper,opt) {
        if (typeof of==="string") opt={name:opt};
        opt=opt||{};
        opt.name=opt.name||"FuncUtil.wrap";
        var res=wrapper;//(f,opt);
        var str=f.toString();
        str=str.replace(/\}\s*$/,"/*Wrapped by "+opt.name+"*/\n}");
        res.toString=function () {
            return str;
        };
        return res;
    };
    FuncUtil.withBindings=function (src,bindings) {
        var n=[],v=[];
        for (var k in bindings) {
            n.push(k);v.push(bindings[k]);
        }
        n.push("return "+src+";");
        try {
            var f=Function.apply(null,n);
            return f.apply(this, v);
        } catch(e) {
            console.log("FuncUtil.withBindings ERR",src);
            throw e;
        }
    };
    FuncUtil.multiArg=function (f) {
        var len=FuncUtil.getParams(f).length;
        var lastidx=len-1;
        return (function () {
            var a=Array.prototype.slice.call(arguments);
            if (a.length>lastidx) {
                // a=[1,3,5,7]   f=(a,b,rest)
                // lastidx=2
                // a=[1,3,[5,7]]
                var va=a.splice(lastidx);
                a.push(va);
            } else {
                a[lastidx]=[];
            }
            return f.apply(this,a);
        });//,"FuncUtil::multiArg");
    };
    FuncUtil.macro=function (f,options) {
        options=options||{};
        options.stripfunc=false;
        var s=FuncUtil.heredoc(f,options);
        return FuncUtil.withBindings(s,options.bindings);
    };
    FuncUtil.heredoc=function (f,options) {
        options=options||{};
        var body=(f+"");
        if (options.stripfunc!==false) {
            body=body.replace(/^\s*function[^\{]*\{/,"").replace(/\}\s*$/,"");
        }
        if (options.stripcomment) {
            body=body.replace(/^\s*\/\*/,"");
            body=body.replace(/^\*\/\s*$/,"");
        }
        if (options.replace) {
            for (var k in options.replace) {
                body=body.replace(new RegExp(k,"g"),options.replace[k]);
            }
        }
        return body;
    };

    return FuncUtil;
});

define('Klass',["assert","FuncUtil"],function (A,FuncUtil) {
    var Klass={};
    var F=FuncUtil;
    Klass.define=function (pd) {
        var p,parent;
        var SYM_GETP="_"+Math.random(),presult,className="AnonClass";
        if (pd.$parent) {
            parent=pd.$parent;
            p=Object.create(parent.prototype);
            /*p.super=F.multiArg(function (a) {
                var n=a.shift();
                return parent.prototype[n].apply(this,a);
            });*/
        } else {
            p={};
        }
        var specialParams={"super":"$super","rest":"$rest"};
        if (pd.$super) {
            specialParams.super=pd.$super;
        }
        if (pd.$this) {
            specialParams.self=pd.$this;
        }
        if (pd.$singleton) {
            specialParams.singleton=pd.$singleton;
        }
        if (pd.$privates) {
            specialParams.privates=pd.$privates;
        }
        if (pd.$rest) {
            specialParams.rest=pd.$rest;
        }
        if (pd.$name) className=pd.$name;
        var klass=(function () {
            if (! (this instanceof klass)) {
                return klass.apply(Object.create(klass.prototype),arguments);
            }
            addGetPrivates(this);
            //A.eq(typeof this[SYM_GETP],"function");
            init.apply(this,arguments);
            checkSchema(this);
            return this;
        });
        var init=wrap("$") || (parent?  parent : function (e) {
            if (e && typeof e=="object") {
                for (var k in e) {
                    this[k]=e[k];
                }
            }
        });
        var fldinit;
        var check;
        if (init instanceof Array) {
            fldinit=init;
            init=(function () {
                var a=Array.prototype.slice.call(arguments);
                for (var i=0;i<fldinit.length;i++) {
                    if (a.length>0) this[fldinit[i]]=a.shift();
                }
            });
        }
        function getPrivates(o) {
            //console.log(name,o,SYM_GETP,o[SYM_GETP]);
            o[SYM_GETP]();
            return presult;
        }
        function addGetPrivates(o) {
            var _p={};
            Object.defineProperty(o,SYM_GETP,{
                value: function () {return presult=_p;},
                enumerable: false
            });
        }
        function checkSchema(self) {
            if (pd.$fields) {
                //console.log("Checking schema",self,pd.$fields);
                A.is(self,pd.$fields);
            }
        }
        if (parent) {
            klass.super=FuncUtil.multiArg(function (t,n,a) {
                return parent.prototype[n].apply(t,a);
            });
        }
        klass.inherit=function (pd) {
            pd.$parent=klass;
            return Klass.define(pd);
        };
        klass.prototype=p;
        if (parent) klass.superClass=parent;
        var staticPrefix="static$";
        var staticPrefixLen=staticPrefix.length;
        for (var name in pd) {
            if (name[0]=="$") continue;
            if (name.substring(0,staticPrefixLen)==staticPrefix) {
                klass[name.substring(staticPrefixLen)]=wrap(name);
            } else {
                if (isPropDesc(pd[name])) {
                    Object.defineProperty(p,name,wrap(name));
                } else {
                    p[name]=wrap(name);
                }
            }
        }
        function wrap(name,obj) {
            obj=obj||pd;
            //if (!thisName) return m;
            var m=obj[name];
            if (isPropDesc(m)) {
                for (var k in m) {
                    m[k]=wrap(k,m);
                }
                return m;
            }
            if (typeof m!=="function") return m;
            var params=FuncUtil.getParams(m);
            if (params[params.length-1]===specialParams.rest) {
                m=FuncUtil.multiArg(m);
            }
            var argparse=[];
            while (params.length) {
                var n=params.shift();
                if (n===specialParams.super) {
                    argparse.unshift(function () {
                        return superMethod.bind(this);
                    });
                } else if (n===specialParams.self) {
                    argparse.unshift(function () {
                        return this;
                    });
                } else if (n===specialParams.singleton) {
                    argparse.unshift(function () {
                        return (klass);
                    });
                } else if (n===specialParams.privates) {
                    argparse.unshift(function () {
                        return getPrivates(this);
                    });
                } else {
                    params.unshift(n);
                    break;
                }
            }
            if (argparse.length===0) return m;
            var superMethod=parent ? (
                name==="$" ? parent: (
                    parent.prototype[name] ||
                    function (){
                        throw new Error("method (Super class of "+className+")::"+name+" not found.");
                    }
                )
            ):function (){
                 throw new Error("Class "+className+" does not have superclass");
            };

            return (function () {
                var a=Array.prototype.slice.call(arguments);
                var self=this;
                argparse.forEach(function (f) {
                    a.unshift(f.call(self));
                });
                return m.apply(this,a);
            });

            //console.log("PARAMS",className,name,params);
            var code="";
            while (params.length) {
                var n=params.shift();
                if (n===specialParams.super) {
                    code=F.heredoc(function () {
                        var self=this;
                        args.unshift(function () {
                            return superMethod.apply(self,arguments);
                        });
                    })+code;
                } else if (n===specialParams.self) {
                    code=F.heredoc(function () {
                        args.unshift(this);
                    })+code;
                } else if (n===specialParams.singleton) {
                    code=F.heredoc(function () {
                        args.unshift(klass);
                    })+code;
                } else if (n===specialParams.privates) {
                    code=F.heredoc(function () {
                        /*console.log("klass",name,klass);
                        A.is(this,klass);
                        A.eq(typeof this[SYM_GETP],"function");*/
                        args.unshift(getPrivates(this));
                    })+code;
                } else {
                    params.unshift(n);
                    break;
                }
            }
            return F.macro(function NAME(P) {
                var args=Array.prototype.slice.call(arguments);
                //CODE
                return m.apply(this,args);
            },{
                replace:{P: params.join(","),"//CODE":code,NAME:name},
                bindings:{
                    m: m,
                    name: name,
                    klass:klass,
                    superMethod: parent ? (
                        name==="$" ? parent: (
                            parent.prototype[name] ||
                            function (){ throw new Error("method (Super class of "+className+")::"+name+" not found.");  }
                        )
                    ):function (){ throw new Error("Class "+className+" does not have superclass");  },
                    getPrivates: getPrivates,
                    A: A,
                    SYM_GETP: SYM_GETP,
                    console: console
                }
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
    Klass.assert=A;
    Klass.FuncUtil=FuncUtil;
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
/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

// Browser Side
var idseq=0;
define('WorkerServiceB',["promise","Klass","root"], function (_,Klass,root) {
    var Wrapper=Klass.define({
        $this:"t",
        $: function (t,worker) {
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
        },
        procReverse: function (t,e) {
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
                t.worker.postMessage({
                    reverse: true,
                    id:id, error:e?(e.stack||e+""):"unknown", status:"error"
                });
            }
        },
        ready: function (t) {
            if (t.isReady) return;
            t.isReady=true;
            console.log("Worker is ready!");
            t.readyQueue.forEach(function (f){ f();});
        },
        readyPromise: function (t) {
            return new Promise(function (succ) {
                if (t.isReady) return succ();
                t.readyQueue.push(succ);
            });
        },
        run: function (t, path, params) {
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
    });
    var paths={};
    root.WorkerService={
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
    root.WorkerService.serv("console/log", function (params){
        console.log.apply(console,params);
    });
    return root.WorkerService;
});

/*global requirejs*/
define('SEnvClient',["WorkerFactory","WorkerServiceB","Klass"],function (WorkerFactory,WS,Klass) {
    var w;
    return Klass.define({
        $this:"t",
        $:function (t,context) {
            w=w||new WS.Wrapper(WorkerFactory.createFromString("var requirejs,require,define;(function(undef){var main,req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice,jsSuffixRegExp=/\\.js$/;function hasProp(obj,prop){return hasOwn.call(obj,prop)}function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,lastIndex,foundI,foundStarMap,starI,i,j,part,normalizedBaseParts,baseParts=baseName&&baseName.split(\"/\"),map=config.map,starMap=map&&map[\"*\"]||{};if(name){name=name.split(\"/\");lastIndex=name.length-1;if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,\"\")}if(name[0].charAt(0)===\".\"&&baseParts){normalizedBaseParts=baseParts.slice(0,baseParts.length-1);name=normalizedBaseParts.concat(name)}for(i=0;i<name.length;i++){part=name[i];if(part===\".\"){name.splice(i,1);i-=1}else if(part===\"..\"){if(i===0||i===1&&name[2]===\"..\"||name[i-1]===\"..\"){continue}else if(i>0){name.splice(i-1,2);i-=2}}}name=name.join(\"/\")}if((baseParts||starMap)&&map){nameParts=name.split(\"/\");for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join(\"/\");if(baseParts){for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join(\"/\")];if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){foundMap=mapValue;foundI=i;break}}}}if(foundMap){break}if(!foundStarMap&&starMap&&starMap[nameSegment]){foundStarMap=starMap[nameSegment];starI=i}}if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI}if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join(\"/\")}}return name}function makeRequire(relName,forceSync){return function(){var args=aps.call(arguments,0);if(typeof args[0]!==\"string\"&&args.length===1){args.push(null)}return req.apply(undef,args.concat([relName,forceSync]))}}function makeNormalize(relName){return function(name){return normalize(name,relName)}}function makeLoad(depName){return function(value){defined[depName]=value}}function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name]=true;main.apply(undef,args)}if(!hasProp(defined,name)&&!hasProp(defining,name)){throw new Error(\"No \"+name)}return defined[name]}function splitPrefix(name){var prefix,index=name?name.indexOf(\"!\"):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length)}return[prefix,name]}function makeRelParts(relName){return relName?splitPrefix(relName):[]}makeMap=function(name,relParts){var plugin,parts=splitPrefix(name),prefix=parts[0],relResourceName=relParts[1];name=parts[1];if(prefix){prefix=normalize(prefix,relResourceName);plugin=callDep(prefix)}if(prefix){if(plugin&&plugin.normalize){name=plugin.normalize(name,makeNormalize(relResourceName))}else{name=normalize(name,relResourceName)}}else{name=normalize(name,relResourceName);parts=splitPrefix(name);prefix=parts[0];name=parts[1];if(prefix){plugin=callDep(prefix)}}return{f:prefix?prefix+\"!\"+name:name,n:name,pr:prefix,p:plugin}};function makeConfig(name){return function(){return config&&config.config&&config.config[name]||{}}}handlers={require:function(name){return makeRequire(name)},exports:function(name){var e=defined[name];if(typeof e!==\"undefined\"){return e}else{return defined[name]={}}},module:function(name){return{id:name,uri:\"\",exports:defined[name],config:makeConfig(name)}}};main=function(name,deps,callback,relName){var cjsModule,depName,ret,map,i,relParts,args=[],callbackType=typeof callback,usingExports;relName=relName||name;relParts=makeRelParts(relName);if(callbackType===\"undefined\"||callbackType===\"function\"){deps=!deps.length&&callback.length?[\"require\",\"exports\",\"module\"]:deps;for(i=0;i<deps.length;i+=1){map=makeMap(deps[i],relParts);depName=map.f;if(depName===\"require\"){args[i]=handlers.require(name)}else if(depName===\"exports\"){args[i]=handlers.exports(name);usingExports=true}else if(depName===\"module\"){cjsModule=args[i]=handlers.module(name)}else if(hasProp(defined,depName)||hasProp(waiting,depName)||hasProp(defining,depName)){args[i]=callDep(depName)}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i]=defined[depName]}else{throw new Error(name+\" missing \"+depName)}}ret=callback?callback.apply(defined[name],args):undefined;if(name){if(cjsModule&&cjsModule.exports!==undef&&cjsModule.exports!==defined[name]){defined[name]=cjsModule.exports}else if(ret!==undef||!usingExports){defined[name]=ret}}}else if(name){defined[name]=callback}};requirejs=require=req=function(deps,callback,relName,forceSync,alt){if(typeof deps===\"string\"){if(handlers[deps]){return handlers[deps](callback)}return callDep(makeMap(deps,makeRelParts(callback)).f)}else if(!deps.splice){config=deps;if(config.deps){req(config.deps,config.callback)}if(!callback){return}if(callback.splice){deps=callback;callback=relName;relName=null}else{deps=undef}}callback=callback||function(){};if(typeof relName===\"function\"){relName=forceSync;forceSync=alt}if(forceSync){main(undef,deps,callback,relName)}else{setTimeout(function(){main(undef,deps,callback,relName)},4)}return req};req.config=function(cfg){return req(cfg)};requirejs._defined=defined;define=function(name,deps,callback){if(typeof name!==\"string\"){throw new Error(\"See almond README: incorrect module build, no module name\")}if(!deps.splice){callback=deps;deps=[]}if(!hasProp(defined,name)&&!hasProp(waiting,name)){waiting[name]=[name,deps,callback]}};define.amd={jQuery:true}})();\ndefine(\"almond\", function(){});\ndefine('assert',[],function () {\nvar Assertion=function(failMesg) {\nthis.failMesg=flatten(failMesg || \"Assertion failed: \");\n};\nvar $a;\nAssertion.prototype={\n_regedType:{},\nregisterType: function (name,t) {\nthis._regedType[name]=t;\n},\nMODE_STRICT:\"strict\",\nMODE_DEFENSIVE:\"defensive\",\nMODE_BOOL:\"bool\",\nfail:function () {\nvar a=$a(arguments);\nvar value=a.shift();\na=flatten(a);\na=this.failMesg.concat(value).concat(a);//.concat([\"(mode:\",this._mode,\")\"]);\nconsole.log.apply(console,a);\nif (this.isDefensive()) return value;\nif (this.isBool()) return false;\nthrow new Error(a.join(\" \"));\n},\nsubAssertion: function () {\nvar a=$a(arguments);\na=flatten(a);\nreturn new Assertion(this.failMesg.concat(a));\n},\nassert: function (t,failMesg) {\nif (!t) return this.fail(t,failMesg);\nreturn t;\n},\neq: function (a,b) {\nif (a!==b) return this.fail(a,\"!==\",b);\nreturn this.isBool()?true:a;\n},\nne: function (a,b) {\nif (a===b) return this.fail(a,\"===\",b);\nreturn this.isBool()?true:a;\n},\nisset: function (a, n) {\nif (a==null) return this.fail(a, (n||\"\")+\" is null/undef\");\nreturn this.isBool()?true:a;\n},\nis: function (value,type) {\nvar t=type,v=value;\nif (t==null) {\nreturn this.fail(value, \"assert.is: type must be set\");\n// return t; Why!!!!???? because is(args,[String,Number])\n}\nif (t._assert_func) {\nt._assert_func.apply(this,[v]);\nreturn this.isBool()?true:value;\n}\nthis.assert(value!=null,[value, \"should be \",t]);\nif (t instanceof Array || (typeof global==\"object\" && typeof global.Array==\"function\" && t instanceof global.Array) ) {\nif (!value || typeof value.length!=\"number\") {\nreturn this.fail(value, \"should be array:\");\n}\nvar self=this;\nfor (var i=0 ;i<t.length; i++) {\nvar na=self.subAssertion(\"failed at \",value,\"[\",i,\"]: \");\nif (t[i]==null) {\nconsole.log(\"WOW!7\", v[i],t[i]);\n}\nna.is(v[i],t[i]);\n}\nreturn this.isBool()?true:value;\n}\nif (t===String || t==\"string\") {\nthis.assert(typeof(v)==\"string\",[v,\"should be a string \"]);\nreturn this.isBool()?true:value;\n}\nif (t===Number || t==\"number\") {\nthis.assert(typeof(v)==\"number\",[v,\"should be a number\"]);\nreturn this.isBool()?true:value;\n}\nif (t===Boolean || t==\"boolean\") {\nthis.assert(typeof(v)==\"boolean\",[v,\"should be a boolean\"]);\nreturn this.isBool()?true:value;\n}\nif (t instanceof RegExp || (typeof global==\"object\" && typeof global.RegExp==\"function\" && t instanceof global.RegExp)) {\nthis.is(v,String);\nthis.assert(t.exec(v),[v,\"does not match to\",t]);\nreturn this.isBool()?true:value;\n}\nif (t===Function) {\nthis.assert(typeof v==\"function\",[v,\"should be a function\"]);\nreturn this.isBool()?true:value;\n}\nif (typeof t==\"function\") {\nthis.assert((v instanceof t),[v, \"should be \",t]);\nreturn this.isBool()?true:value;\n}\nif (t && typeof t==\"object\") {\nfor (var k in t) {\nvar na=this.subAssertion(\"failed at \",value,\".\",k,\":\");\nna.is(value[k],t[k]);\n}\nreturn this.isBool()?true:value;\n}\nif (typeof t==\"string\") {\nvar ty=this._regedType[t];\nif (ty) return this.is(value,ty);\n//console.log(\"assertion Warning:\",\"unregistered type:\", t, \"value:\",value);\nreturn this.isBool()?true:value;\n}\nreturn this.fail(value, \"Invaild type: \",t);\n},\nensureError: function (action, err) {\ntry {\naction();\n} catch(e) {\nif(typeof err==\"string\") {\nassert(e+\"\"===err,action+\" thrown an error \"+e+\" but expected:\"+err);\n}\nconsole.log(\"Error thrown successfully: \",e.message);\nreturn;\n}\nthis.fail(action,\"should throw an error\",err);\n},\nsetMode:function (mode) {\nthis._mode=mode;\n},\nisDefensive:function () {\nreturn this._mode===this.MODE_DEFENSIVE;\n},\nisBool:function () {\nreturn this._mode===this.MODE_BOOL;\n},\nisStrict:function () {\nreturn !this.isDefensive() && !this.isBool();\n}\n};\n$a=function (args) {\nvar a=[];\nfor (var i=0; i<args.length ;i++) a.push(args[i]);\nreturn a;\n};\nvar top=new Assertion();\nvar assert=function () {\ntry {\nreturn top.assert.apply(top,arguments);\n} catch(e) {\nthrow new Error(e.stack);\n}\n};\n[\"setMode\",\"isDefensive\",\"is\",\"isset\",\"ne\",\"eq\",\"ensureError\"].forEach(function (m) {\nassert[m]=function () {\ntry {\nreturn top[m].apply(top,arguments);\n} catch(e) {\nconsole.log(e.stack);\n//if (top.isDefensive()) return arguments[0];\n//if (top.isBool()) return false;\nthrow new Error(e.message);\n}\n};\n});\nassert.fail=top.fail.bind(top);\nassert.MODE_STRICT=top.MODE_STRICT;\nassert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;\nassert.MODE_BOOL=top.MODE_BOOL;\nassert.f=function (f) {\nreturn {\n_assert_func: f\n};\n};\nassert.opt=function (t) {\nreturn assert.f(function (v) {\nreturn v==null || v instanceof t;\n});\n};\nassert.and=function () {\nvar types=$a(arguments);\nassert(types instanceof Array);\nreturn assert.f(function (value) {\nvar t=this;\nfor (var i=0; i<types.length; i++) {\nt.is(value,types[i]);\n}\n});\n};\nfunction flatten(a) {\nif (a instanceof Array) {\nvar res=[];\na.forEach(function (e) {\nres=res.concat(flatten(e));\n});\nreturn res;\n}\nreturn [a];\n}\nfunction isArg(a) {\nreturn \"length\" in a && \"caller\" in a && \"callee\" in a;\n};\nreturn assert;\n});\ndefine('FuncUtil',[], function () {\nvar FuncUtil={};\nFuncUtil.getParams=FuncUtil.getArgs=function getParams(f) {\nvar fpat=/function[^\\(]*\\(([^\\)]*)\\)/;\nvar r=fpat.exec(f+\"\");\nif (r) {\nreturn r[1].replace(/\\s/g,\"\").split(\",\");\n}\nreturn [];\n};\nFuncUtil.wrap=function (f, wrapper,opt) {\nif (typeof of===\"string\") opt={name:opt};\nopt=opt||{};\nopt.name=opt.name||\"FuncUtil.wrap\";\nvar res=wrapper;//(f,opt);\nvar str=f.toString();\nstr=str.replace(/\\}\\s*$/,\"/*Wrapped by \"+opt.name+\"*/\\n}\");\nres.toString=function () {\nreturn str;\n};\nreturn res;\n};\nFuncUtil.withBindings=function (src,bindings) {\nvar n=[],v=[];\nfor (var k in bindings) {\nn.push(k);v.push(bindings[k]);\n}\nn.push(\"return \"+src+\";\");\ntry {\nvar f=Function.apply(null,n);\nreturn f.apply(this, v);\n} catch(e) {\nconsole.log(\"FuncUtil.withBindings ERR\",src);\nthrow e;\n}\n};\nFuncUtil.multiArg=function (f) {\nvar len=FuncUtil.getParams(f).length;\nvar lastidx=len-1;\nreturn (function () {\nvar a=Array.prototype.slice.call(arguments);\nif (a.length>lastidx) {\n// a=[1,3,5,7] f=(a,b,rest)\n// lastidx=2\n// a=[1,3,[5,7]]\nvar va=a.splice(lastidx);\na.push(va);\n} else {\na[lastidx]=[];\n}\nreturn f.apply(this,a);\n});//,\"FuncUtil::multiArg\");\n};\nFuncUtil.macro=function (f,options) {\noptions=options||{};\noptions.stripfunc=false;\nvar s=FuncUtil.heredoc(f,options);\nreturn FuncUtil.withBindings(s,options.bindings);\n};\nFuncUtil.heredoc=function (f,options) {\noptions=options||{};\nvar body=(f+\"\");\nif (options.stripfunc!==false) {\nbody=body.replace(/^\\s*function[^\\{]*\\{/,\"\").replace(/\\}\\s*$/,\"\");\n}\nif (options.stripcomment) {\nbody=body.replace(/^\\s*\\/\\*/,\"\");\nbody=body.replace(/^\\*\\/\\s*$/,\"\");\n}\nif (options.replace) {\nfor (var k in options.replace) {\nbody=body.replace(new RegExp(k,\"g\"),options.replace[k]);\n}\n}\nreturn body;\n};\nreturn FuncUtil;\n});\ndefine('Klass',[\"assert\",\"FuncUtil\"],function (A,FuncUtil) {\nvar Klass={};\nvar F=FuncUtil;\nKlass.define=function (pd) {\nvar p,parent;\nvar SYM_GETP=\"_\"+Math.random(),presult,className=\"AnonClass\";\nif (pd.$parent) {\nparent=pd.$parent;\np=Object.create(parent.prototype);\n/*p.super=F.multiArg(function (a) {\nvar n=a.shift();\nreturn parent.prototype[n].apply(this,a);\n});*/\n} else {\np={};\n}\nvar specialParams={\"super\":\"$super\",\"rest\":\"$rest\"};\nif (pd.$super) {\nspecialParams.super=pd.$super;\n}\nif (pd.$this) {\nspecialParams.self=pd.$this;\n}\nif (pd.$singleton) {\nspecialParams.singleton=pd.$singleton;\n}\nif (pd.$privates) {\nspecialParams.privates=pd.$privates;\n}\nif (pd.$rest) {\nspecialParams.rest=pd.$rest;\n}\nif (pd.$name) className=pd.$name;\nvar klass=(function () {\nif (! (this instanceof klass)) {\nreturn klass.apply(Object.create(klass.prototype),arguments);\n}\naddGetPrivates(this);\n//A.eq(typeof this[SYM_GETP],\"function\");\ninit.apply(this,arguments);\ncheckSchema(this);\nreturn this;\n});\nvar init=wrap(\"$\") || (parent? parent : function (e) {\nif (e && typeof e==\"object\") {\nfor (var k in e) {\nthis[k]=e[k];\n}\n}\n});\nvar fldinit;\nvar check;\nif (init instanceof Array) {\nfldinit=init;\ninit=(function () {\nvar a=Array.prototype.slice.call(arguments);\nfor (var i=0;i<fldinit.length;i++) {\nif (a.length>0) this[fldinit[i]]=a.shift();\n}\n});\n}\nfunction getPrivates(o) {\n//console.log(name,o,SYM_GETP,o[SYM_GETP]);\no[SYM_GETP]();\nreturn presult;\n}\nfunction addGetPrivates(o) {\nvar _p={};\nObject.defineProperty(o,SYM_GETP,{\nvalue: function () {return presult=_p;},\nenumerable: false\n});\n}\nfunction checkSchema(self) {\nif (pd.$fields) {\n//console.log(\"Checking schema\",self,pd.$fields);\nA.is(self,pd.$fields);\n}\n}\nif (parent) {\nklass.super=FuncUtil.multiArg(function (t,n,a) {\nreturn parent.prototype[n].apply(t,a);\n});\n}\nklass.inherit=function (pd) {\npd.$parent=klass;\nreturn Klass.define(pd);\n};\nklass.prototype=p;\nif (parent) klass.superClass=parent;\nvar staticPrefix=\"static$\";\nvar staticPrefixLen=staticPrefix.length;\nfor (var name in pd) {\nif (name[0]==\"$\") continue;\nif (name.substring(0,staticPrefixLen)==staticPrefix) {\nklass[name.substring(staticPrefixLen)]=wrap(name);\n} else {\nif (isPropDesc(pd[name])) {\nObject.defineProperty(p,name,wrap(name));\n} else {\np[name]=wrap(name);\n}\n}\n}\nfunction wrap(name,obj) {\nobj=obj||pd;\n//if (!thisName) return m;\nvar m=obj[name];\nif (isPropDesc(m)) {\nfor (var k in m) {\nm[k]=wrap(k,m);\n}\nreturn m;\n}\nif (typeof m!==\"function\") return m;\nvar params=FuncUtil.getParams(m);\nif (params[params.length-1]===specialParams.rest) {\nm=FuncUtil.multiArg(m);\n}\nvar argparse=[];\nwhile (params.length) {\nvar n=params.shift();\nif (n===specialParams.super) {\nargparse.unshift(function () {\nreturn superMethod.bind(this);\n});\n} else if (n===specialParams.self) {\nargparse.unshift(function () {\nreturn this;\n});\n} else if (n===specialParams.singleton) {\nargparse.unshift(function () {\nreturn (klass);\n});\n} else if (n===specialParams.privates) {\nargparse.unshift(function () {\nreturn getPrivates(this);\n});\n} else {\nparams.unshift(n);\nbreak;\n}\n}\nif (argparse.length===0) return m;\nvar superMethod=parent ? (\nname===\"$\" ? parent: (\nparent.prototype[name] ||\nfunction (){\nthrow new Error(\"method (Super class of \"+className+\")::\"+name+\" not found.\");\n}\n)\n):function (){\nthrow new Error(\"Class \"+className+\" does not have superclass\");\n};\nreturn (function () {\nvar a=Array.prototype.slice.call(arguments);\nvar self=this;\nargparse.forEach(function (f) {\na.unshift(f.call(self));\n});\nreturn m.apply(this,a);\n});\n//console.log(\"PARAMS\",className,name,params);\nvar code=\"\";\nwhile (params.length) {\nvar n=params.shift();\nif (n===specialParams.super) {\ncode=F.heredoc(function () {\nvar self=this;\nargs.unshift(function () {\nreturn superMethod.apply(self,arguments);\n});\n})+code;\n} else if (n===specialParams.self) {\ncode=F.heredoc(function () {\nargs.unshift(this);\n})+code;\n} else if (n===specialParams.singleton) {\ncode=F.heredoc(function () {\nargs.unshift(klass);\n})+code;\n} else if (n===specialParams.privates) {\ncode=F.heredoc(function () {\n/*console.log(\"klass\",name,klass);\nA.is(this,klass);\nA.eq(typeof this[SYM_GETP],\"function\");*/\nargs.unshift(getPrivates(this));\n})+code;\n} else {\nparams.unshift(n);\nbreak;\n}\n}\nreturn F.macro(function NAME(P) {\nvar args=Array.prototype.slice.call(arguments);\n//CODE\nreturn m.apply(this,args);\n},{\nreplace:{P: params.join(\",\"),\"//CODE\":code,NAME:name},\nbindings:{\nm: m,\nname: name,\nklass:klass,\nsuperMethod: parent ? (\nname===\"$\" ? parent: (\nparent.prototype[name] ||\nfunction (){ throw new Error(\"method (Super class of \"+className+\")::\"+name+\" not found.\"); }\n)\n):function (){ throw new Error(\"Class \"+className+\" does not have superclass\"); },\ngetPrivates: getPrivates,\nA: A,\nSYM_GETP: SYM_GETP,\nconsole: console\n}\n});\n}\np.$=init;\nObject.defineProperty(p,\"$bind\",{\nget: function () {\nif (!this.__bounded) {\nthis.__bounded=new Klass.Binder(this);\n}\nreturn this.__bounded;\n}\n});\nreturn klass;\n};\nfunction isPropDesc(o) {\nif (typeof o!==\"object\") return false;\nif (!o) return false;\nvar pk={configurable:1,enumerable:1,value:1,writable:1,get:1,set:1};\nvar c=0;\nfor (var k in o) {\nif (!pk[k]) return false;\nc+=pk[k];\n}\nreturn c;\n}\nKlass.Function=function () {throw new Exception(\"Abstract\");}\nKlass.opt=A.opt;\nKlass.Binder=Klass.define({\n$this:\"t\",\n$:function (t,target) {\nfor (var k in target) (function (k){\nif (typeof target[k]!==\"function\") return;\nt[k]=function () {\nvar a=Array.prototype.slice.call(arguments);\n//console.log(this, this.__target);\n//A(this.__target,\"target is not set\");\nreturn target[k].apply(target,a);\n};\n})(k);\n}\n});\nKlass.assert=A;\nKlass.FuncUtil=FuncUtil;\nreturn Klass;\n});\n/*\nrequirejs([\"Klass\"],function (k) {\nP=k.define ({\n$:[\"x\",\"y\"]\n});\np=P(2,3);\nconsole.log(p.x,p.y);\n});\n*/\n;\n/* global requirejs */\ndefine(\"SEnv\", [\"Klass\", \"assert\"], function(Klass, assert) {\n//--- Also in M2Parser\nvar Ses = 10,\nChs = 10,\nRegs = Chs * 3,\nWvElC = 32,\nEnvElC = 32,\nWvC = 96,\nwdataSize = 48000, // should be dividable by 120\n// 99=r 100=vol 101=ps (x*128) 255=end\nMRest = 99,\nMVol = 100,\nMps = 101,\nMSelWav = 102,\nMTempo = 103,\nMJmp = 104,\nMSlur = 105,\nMPor = 106,\nMSelEnv = 107,\nMWait = 108,\nMCom = 109,\nMDet = 110,\nMWOut = 111,\nMWEnd = 112,\nMWrtWav = 113,\nMWrtEnv = 114,\nMLfo = 115,\nMSync = 116,\nMPCMReg = 117,\nMLfoD = 118,\nMBaseVol = 119,\nMLabel = 120,\nMend = 255,\n//sync=0:非同期、1:同期、2:ワンショット 3:鋸波形\nLASync = 0,\nLSync = 1,\nLOneShot = 2,\nLSaw = 3,\nEnvs = 16,\nPCMWavs = 16, // 96-111\nFadeMax = 256,\ndiv = function(x, y) {\nreturn Math.trunc(x/y);\n//return Math.trunc(chkn(x,\"x\") / chkn(y,\"y\") );\n},\nchkn = function (x,mesg) {\nif (x!==x) throw new Error(mesg+\": Not a number!\");\nif (typeof x!==\"number\") {console.error(x);throw new Error(mesg+\": Not a not a number but not a number!\");}\nreturn x;\n},\nabs = Math.abs.bind(Math),\nShortInt = function(b) {\nreturn b >= 128 ? b - 256 : b;\n},\nStrPas=function (ary,idx) {\nvar a=[];\nfor (var i=idx;ary[i];i++) {\na.push(ary[i]);\n}\nreturn a;\n},\narray2Int= function (ary,idx) {\nvar r=ary[idx];\nr+=ary[idx+1]*0x100;\nr+=ary[idx+2]*0x10000;\nr+=ary[idx+3]*0x1000000;\nif (r>=0x80000000) r-=0x100000000;\nreturn r;\n},\nInteger = Number,\nsinMax_s = 5,\nsinMax = 65536 >> sinMax_s, //2048,\n/*SPS = 44100,\nSPS96 = 22080,\nSPS_60 = div(44100, 60),*/\nDivClock = 111860.78125,\nLoops = 163840,\n//---------End include\nm2t = [0xd5d, 0xc9c, 0xbe7, 0xb3c, 0xa9b, 0xa02, 0x973, 0x8eb, 0x86b, 0x7f2, 0x780, 0x714,\n0x6af, 0x64e, 0x5f4, 0x59e, 0x54e, 0x501, 0x4ba, 0x476, 0x436, 0x3f9, 0x3c0, 0x38a,\n0x357, 0x327, 0x2fa, 0x2cf, 0x2a7, 0x281, 0x25d, 0x23b, 0x21b, 0x1fd, 0x1e0, 0x1c5,\n0x1ac, 0x194, 0x17d, 0x168, 0x153, 0x140, 0x12e, 0x11d, 0x10d, 0xfe, 0xf0, 0xe3,\n0xd6, 0xca, 0xbe, 0xb4, 0xaa, 0xa0, 0x97, 0x8f, 0x87, 0x7f, 0x78, 0x71,\n0x6b, 0x65, 0x5f, 0x5a, 0x55, 0x50, 0x4c, 0x47, 0x43, 0x40, 0x3c, 0x39,\n0x35, 0x32, 0x30, 0x2d, 0x2a, 0x28, 0x26, 0x24, 0x22, 0x20, 0x1e, 0x1c,\n0x1b, 0x19, 0x18, 0x16, 0x15, 0x14, 0x13, 0x12, 0x11, 0x10, 0xf, 0xe\n],\nTrunc = Math.trunc.bind(),\nstEmpty = -1,\nstFreq = 1,\nstVol = 2,\nstWave = 3,\nsndElemCount = 64,\n//type\n/*TSoundElem = Klass.define({\n$fields: {\ntime: Integer,\ntyp: Integer,\nval: Integer\n}\n}),*/\nnil = null,\nFalse = false,\nTrue = true,\n//TPlayState = (psPlay,psStop,psWait,psPause);\npsPlay = \"psPlay\",\npsStop = \"psStop\",\npsWait = \"psWait\",\npsPause = \"psPause\",\nm2tInt=[], //:array[0..95] of Integer;\nsinT = [], //:array [0..sinMAX-1] of ShortInt;\nTTL, //:Integer;\ncnt; //:Integer;// debug\nvar defs;\nvar TEnveloper = Klass.define(defs={ //class (TSoundGenerator)\n$this: \"t\",\n$fields: {\n//BSize: Integer,\nPos: Integer,\nPrevPos: Integer,\nRPos: Integer,\n//WriteAd: Integer,\n//SccCount: Array, // [0..Chs-1] of Integer;\n//Steps: Array, // [0..Chs-1] of integer;\n//SccWave: Array, // [0..Chs-1] of PChar;\nWaveDat: Array, // [0..WvC-1,0..WvElC-1] of Byte;\n//RefreshRate: Number, //longint,//;\n//RRPlus: Integer,\n//PosPlus: Integer, //;\nwdata2: Array,//array[0..wdataSize-1] of SmallInt;\nBeginPlay: Boolean,\nSeqTime: Integer,\nSeqTime120: Integer,\nWavOutMode: Boolean,\n//WavPlaying: Boolean,\n/*{$ifdef ForM2}\nWavOutObj:TWaveSaver,\n{$endif}*/\n//EShape: Array, // [0..Chs-1] of PChar,\n//EVol: Array,\n//EBaseVol: Array,\n//ESpeed: Array,\n//ECount: Array, // [0..Chs-1] of Word,\n//Oct: Array, // [0..Chs-1] of Byte,\n//MCount: Array, // [0..Chs-1] of Integer,\n//MPoint: Array, // [0..Chs-1] of PChar,\n//MPointC: Array, // [0..Chs-1] of Integer,\n//Resting: Array, // [0..Chs-1] of Boolean,\n//PlayState: Array, // [0..Chs-1] of TPlayState,\n//Slur: Array,\n//Sync: Array, // [0..Chs-1] of Boolean,\n//Detune: Array, // [0..Chs-1] of Integer,\n//PorStart: Array,\n//PorEnd: Array,\n//PorLen: Array, // [0..Chs-1] of Integer,\n//LfoV: Array,\n//LfoA: Array,\n//LfoC: Array,\n//LfoD: Array,\n//LfoDC: Array,\n//LfoSync: Array, // [0..Chs-1] of Integer,\n//sync=0:非同期、1:同期、2:ワンショット 3:鋸波形\nFading: Integer,\n//CurWav: Array, // [0..Chs-1] of Integer,\n//L2WL: Array, // [0..Chs-1] of Integer,\n// log 2 WaveLength\nPCMW: Array, // [0..PCMWavs-1] of TWavLoader,\nDelay: Integer,\nTempo: Integer,\nComStr: String,\nWFilename: String,\nEnvDat: Array, // [0..Envs-1,0..EnvElC-1] of Byte,\nWriteMaxLen: Integer,\n//soundMode: Array // [0..chs-1] of Boolean,\n},\nload:function (t,d) {\nvar ver=readLong(d);\nvar chs=readByte(d);\n//var chdatas;\n//t.MPoint=chdatas=[];\nfor (var i=0;i<chs;i++) {\nvar chdata=[];\n//chdatas.push(chdata);\nvar len=readLong(d);\n//console.log(len);\n//if(len>999999) throw new Error(\"LONG\");\nfor (var j=0;j<len;j++) {\nchdata.push(readByte(d));\n}\nt.channels[i].MPoint=chdata;\n}\nfunction readByte(a) {\nif (a.length==0) throw new Error(\"Out of data\");\nreturn a.shift();\n}\nfunction readLong(a) {\nif (a.length<4) throw new Error(\"Out of data\");\nvar r=a.shift(),e=1;\ne<<=8;\nr+=a.shift()*e;\ne<<=8;\nr+=a.shift()*e;\ne<<=8;\nr+=a.shift()*e;\nreturn r;\n}\n},\nloadWDT: function (t,url) {\ntry {\nconsole.log(\"LOading wdt...?\");\nif (!url) {\nreturn requirejs([\"Tones.wdt\"],function (u) {\nt.loadWDT(u);\n});\n}\nvar oReq = new XMLHttpRequest();\noReq.open(\"GET\", url, true);\noReq.responseType = \"arraybuffer\";\noReq.onload = function (oEvent) {\nvar arrayBuffer = oReq.response,i,j;\nif (arrayBuffer) {\nvar b = new Uint8Array(arrayBuffer);\nconsole.log(\"Loading wdt\",b.length);\n//WaveDat\nvar idx=0;\nfor (i = 0; i < 96; i++) {//WvC\nfor (j=0;j<32;j++) {\nt.WaveDat[i][j]=b[idx++];\n}\n}\n//EnvDat\nfor (i=0 ;i<16;i++) {//Envs\nfor (j=0;j<32;j++) {\nt.EnvDat[i][j]=b[idx++];\n}\n}\nconsole.log(\"Loading wdt done\");\n}\n};\noReq.send(null);\n} catch (e) {console.log(\"LOADWDTFAIL\",e);}\n},\ngetPlayPos: function () {\nvar ti=this.context.currentTime- this. playStartTime;\nvar tiSamples=Math.floor(ti*this.sampleRate);\nreturn tiSamples % wdataSize;\n},\nsetSound: function(t, ch /*:Integer;*/ , typ /*:Integer;*/ , val /*:Integer*/ ) {\nvar chn=t.channels[ch];\nchn.soundMode = True;\nswitch (typ) {\ncase stFreq:\nchn.Steps = val;\nbreak;\ncase stVol:\nchn.EVol = val;\nbreak;\n}\n},\nInitSin: function(t) {\nvar i; //:Integer;\nfor (i = 0; i < sinMax; i++) {\nsinT[i] = Math.trunc(Math.sin(3.1415926 * 2 * i / sinMax) * 127);\n}\n},\nInitEnv: function(t) {\nvar i, j; //:Integer;\nt.EnvDat=[];\nfor (i = 0; i < Envs; i++) {\nt.EnvDat[i]=[];\nfor (j = 0; j < EnvElC; j++) {\nt.EnvDat[i][j] = Math.floor((EnvElC - 1 - j) / 2);\n}\n}\n},\nConvM2T: function(t) {\nvar i; //:Integer;\nm2tInt=[];\nfor (i = 0; i < 96; i++) {\nm2tInt[i] = Math.trunc(DivClock * 65536 / m2t[i] * 65536 / t.sampleRate);\n}\n},\nInitWave: function(t) {\nvar i, j;\nt.WaveDat=[];\nfor (i = 0; i < WvC; i++) {\nt.WaveDat[i]=[];\nfor (j = 0; j < WvElC / 2; j++) {\nt.WaveDat[i][j] = 103;\nt.WaveDat[i][j + div(WvElC, 2)] = 153;\n}\n}\n},\n$: function(t,context,options) {\nvar i, j; //:Integer;\noptions=options||{};\nt.useScriptProcessor=options.useScriptProcessor;\nt.useFast=options.useFast;\nt.resolution=options.resolution||120;\nt.wavOutSpeed=options.wavOutSpeed||10;\nt.context=context;\nt.sampleRate = t.context.sampleRate;\n//t.initNode({});\n//t.WavPlaying=false;\n// inherited Create (Handle);\nt.Delay = 2000;\nt.Pos = t.PrevPos = t.RPos = /*t.WriteAd =*/ t.SeqTime =\nt.SeqTime120 = 0;\nt.BeginPlay=false;\nt.InitWave();\nt.InitEnv();\nt.InitSin();\nt.ConvM2T();\nt.wdata2=[];\nt.PCMW=[];\n//t.L2WL=[];\n//t.Sync=[];\n//t.ECount=[];\n//t.MCount=[];\nfor (i = 0; i < PCMWavs; i++) {\nt.PCMW[i] = nil;\n}\n//t.Steps = [];\n//t.SccWave = [];\n//t.SccCount = [];\n//t.EShape = []; //=t.EnvDat[0];\n//t.EVol = [];\n//t.EBaseVol = [];\n//t.MPoint = [];\n//t.MPointC = [];\n//t.ESpeed = [];\n//t.PlayState = [];\n//t.Detune = [];\n//t.LfoV = [];\n//t.LfoD = [];\n//t.LfoDC = [];\n//t.PorStart=[];\n//t.PorEnd=[];\n//t.PorLen=[];\n//t.soundMode = [];\n//t.CurWav=[];\n//t.Oct=[];\n//t.Resting=[];\n//t.Slur=[];\n//t.Sync=[];\n//t.LfoV=[];t.LfoA=[];t.LfoC=[];t.LfoD=[];t.LfoDC=[];t.LfoSync=[];\nt.channels=[];\nfor (i = 0; i < Chs; i++) {\nt.channels.push({});\nt.channels[i].LfoV=0;t.channels[i].LfoA=0;t.channels[i].LfoC=0;t.channels[i].LfoD=0;t.channels[i].LfoDC=0;t.channels[i].LfoSync=0;\nt.channels[i].Slur=t.channels[i].Sync=0;\nt.channels[i].PorStart=t.channels[i].PorEnd=t.channels[i].PorLen=0;\nt.channels[i].ECount=0;\nt.channels[i].MCount=0;\nt.channels[i].Resting=0;\nt.channels[i].Steps = 0;\nt.channels[i].SccWave = t.WaveDat[0];\nt.channels[i].SccCount = 0;\nt.channels[i].EShape = t.EnvDat[0];\nt.channels[i].EVol = 0;\nt.channels[i].EBaseVol = 128;\nt.channels[i].MPoint = nil;\nt.channels[i].MPointC = 0;\nt.channels[i].ESpeed = 5;\nt.channels[i].PlayState = psStop;\nt.channels[i].Detune = 0;\nt.channels[i].LfoV = 0;\nt.SelWav(i, 0);\nt.channels[i].LfoD = 0;\nt.channels[i].LfoDC = 0;\nt.channels[i].Oct = 4;\nt.channels[i].soundMode = False;\n}\nt.Fading = FadeMax;\nt.timeLag = 2000;\nt.WriteMaxLen = 20000;\nt.WavOutMode = False;\nt.label2Time=[];\nt.PC2Time=[];// only ch:0\nt.WFilename = '';\n/* {$ifdef ForM2}\nt.WavOutObj=nil;\n{$endif}*/\nt.Tempo = 120;\nt.ComStr = '';\nt.performance={writtenSamples:0, elapsedTime:0};\nt.loadWDT();\n},\ngetBuffer: function (t) {\nvar channel=1;\nif (this.buf) return this.buf;\nthis.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);\nreturn this.buf;\n},\nplayNode: function (t) {\nif (this.isSrcPlaying) return;\nvar source = this.context.createBufferSource();\n// AudioBufferSourceNodeにバッファを設定する\nsource.buffer = this.getBuffer();\n// AudioBufferSourceNodeを出力先に接続すると音声が聞こえるようになる\nif (typeof source.noteOn==\"function\") {\nsource.noteOn(0);\n//source.connect(this.node);\n}\nsource.connect(this.context.destination);\n// 音源の再生を始める\nsource.start();\nsource.loop = true;\nsource.playStartTime = this.playStartTime = this.context.currentTime;\nthis.bufSrc=source;\nthis.isSrcPlaying = true;\n},\nstartRefreshLoop: function (t) {\nif (t.refreshTimer!=null) return;\nvar grid=t.resolution;\nvar data=t.getBuffer().getChannelData(0);\nvar WriteAd=0;\nfor (var i=0;i<wdataSize;i+=grid) {\nt.refreshPSG(data,i,grid);\n}\nfunction refresh() {\nif (!t.isSrcPlaying) return;\nvar cnt=0;\nvar playPosZone=Math.floor(t.getPlayPos()/grid);\nwhile (true) {\nif (cnt++>wdataSize/grid) throw new Error(\"Mugen \"+playPosZone);\nvar writeAdZone=Math.floor(WriteAd/grid);\nif (playPosZone===writeAdZone) break;\nt.refreshPSG(data,WriteAd,grid);\nWriteAd=(WriteAd+grid)%wdataSize;\n}\n}\nt.refreshTimer=setInterval(refresh,16);\n},\nstopRefreshLoop: function (t) {\nif (t.refreshTimer==null) return;\nclearInterval(t.refreshTimer);\ndelete t.refreshTimer;\n},\nstopNode : function (t) {\nif (!this.isSrcPlaying) return;\nthis.bufSrc.stop();\nthis.isSrcPlaying = false;\n},\nPlay1Sound: function(t, c, n, iss) {\nvar TP; //:Integer;\nvar chn=t.channels[c];\nif (chn.soundMode) return; // ) return;\nif (n == MRest) {\nchn.Resting = True;\nreturn;\n}\nif ((c < 0) || (c >= Chs) || (n < 0) || (n > 95)) return; // ) return;\nchn.Resting = False;\nif (!iss) {\nchn.ECount = 0;\nif (chn.Sync) chn.SccCount = 0;\nif (chn.LfoSync != LASync) chn.LfoC = 0;\n}\nif (chn.CurWav < WvC) {\nchn.Steps = m2tInt[n] + chn.Detune * div(m2tInt[n], 2048);\n// m2tInt*(1+Detune/xx) (1+256/xx )^12 =2 1+256/xx=1.05946\n// 256/xx=0.05946 xx=256/0.05946 = 4096?\n} else {\nif (chn.L2WL >= 2) {\n//Steps[c]:=($40000000 shr (L2WL[c]-2)) div (m2tInt[36] div 65536) * (m2tInt[n] div 65536);\nchn.Steps = div(0x40000000 >>> (chn.L2WL - 2), div(m2tInt[36], 65536)) * div(m2tInt[n], 65536);\n}\n}\nchn.PorLen = -1;\n},\n// procedure TEnveloper.Play1Por (c,f,t:Word;iss:Boolean);\nPlay1Por: function (t,c,from,to,iss) {\nvar TP=0;\nvar chn=t.channels[c];\nif ((c<0) || (c>=Chs) || (to<0) || (to>95) ||\n(from<0) || (from>95) ) return;\nchn.Resting=False;\n//TP=m2t[f];\nchn.PorStart=m2tInt[from]+chn.Detune*div(m2tInt[from] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];\n//TP=m2t[to];\nchn.PorEnd=m2tInt[to]+chn.Detune*div(m2tInt[to] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];\nif (!iss) chn.ECount=0;\n},\nStopMML: function(t, c) {\nif ((c < 0) || (c >= Chs)) return; // ) return;\n//MPoint[c]=nil;\nt.WaitMML(c);\nt.channels[c].PlayState = psStop;\nt.channels[c].MCount = t.SeqTime + 1;\n},\nallWaiting: function (t) {\nfor(var i=0;i<Chs;i++) {\nif (t.channels[i].PlayState == psPlay) {\nreturn false;\n}\n}\nreturn true;\n},\nhandleAllState: function (t) {\nvar allWait=true,allStop=true,i;\nfor(i=0;i<Chs;i++) {\nswitch (t.channels[i].PlayState) {\ncase psPlay:\nallWait=false;\nallStop=false;\nbreak;\ncase psWait:\nallStop=false;\nbreak;\n}\n}\n// alw als\n// P F F\n// W T F\n// S T T\n// P,W F F\n// W,S T F\n// S,P F F\n// P,W,S F F\nif (allWait && !allStop) {\nfor(i=0;i<Chs;i++) {\nt.RestartMML(i);\n}\n}\nreturn allStop;\n},\nallStopped: function (t) {\nfor(var i=0;i<Chs;i++) {\nif (t.channels[i].PlayState != psStop) {\nreturn false;\n}\n}\nreturn true;\n},\nRestartMML: function(t, c) {\nif ((c < 0) || (c >= Chs)) return;\nvar chn=t.channels[c];\nif (chn.PlayState == psWait) {\nchn.PlayState = psPlay;\nchn.MCount = t.SeqTime + 1;\n}\n},\nrestartIfAllWaiting: function (t) {\nif (t.allWaiting()) {\nfor(var i=0;i<Chs;i++) {\nt.RestartMML(i);\n}\n}\n},\n//procedure TEnveloper.WaitMML (c:Integer);\nWaitMML: function(t, c) {\nvar i; //:Integer;\nif ((c < 0) || (c >= Chs)) return;\n//MPoint[c]=nil;\nvar chn=t.channels[c];\nchn.PlayState = psWait;\nchn.MCount = t.SeqTime + 1;\n},\n//procedure TEnveloper.Start;\nStart: function(t) {\nt.Stop();\nt.Rewind();\nt.BeginPlay = True;\nt.startRefreshLoop();\nt.playNode();\n},\nRewind: function (t) {\nvar ch; //:Integer;\nt.SeqTime=0;\nfor (ch = 0; ch < Chs; ch++) {\nvar chn=t.channels[ch];\nchn.soundMode = False;\nchn.MPointC = 0;\nchn.PlayState = psPlay;\nchn.MCount = t.SeqTime;\n}\n},\nStop: function (t) {\nif (!t.BeginPlay) return;\nt.stopNode();\nt.stopRefreshLoop();\n},\nwavOut: function (t) {\nt.Stop();\nt.Rewind();\nvar buf=[];\nvar grid=t.resolution;\nfor (var i=0;i<grid;i++) buf.push(0);\nvar allbuf=[];\nt.writtenSamples=0;\nt.WavOutMode=true;\nt.label2Time=[];\nt.loopStart=null;\nt.loopStartFrac=null;\nt.PC2Time=[];// only ch:0\nvar sec=-1;\nvar efficiency=t.wavOutSpeed||10;\nvar setT=0;\nreturn new Promise(function (succ) {\nsetTimeout(refresh,0);\nfunction refresh() {\nsetT++;\nvar ti=new Date().getTime()+efficiency;\nwhile (new Date().getTime()<=ti) {\nfor (var i=0;i<grid;i++) allbuf.push(0);\nt.refreshPSG(allbuf,allbuf.length-grid,grid);\nt.writtenSamples+=grid;\nvar ss=Math.floor(t.writtenSamples/t.sampleRate);\nif (ss>sec) {\n//console.log(\"Written \",ss,\"sec\");\nsec=ss;\n}\n//allbuf=allbuf.concat(buf.slice());\nif (t.allStopped()) {\nt.WavOutMode=false;\nsucc(allbuf);\nconsole.log(\"setT\",setT);\nreturn;\n}\n}\nsetTimeout(refresh,0);\n}\n});\n},\ntoAudioBuffer: function (t) {\nreturn t.wavOut().then(function (arysrc) {\nvar buffer = t.context.createBuffer(1, arysrc.length, t.sampleRate);\nvar ary = buffer.getChannelData(0);\nfor (var i = 0; i < ary.length; i++) {\nary[i] = arysrc[i];\n}\nvar res={decodedData: buffer};\nif (t.loopStartFrac) res.loopStart=t.loopStartFrac[0]/t.loopStartFrac[1];\nreturn res;\n});\n},\n//procedure TEnveloper.SelWav (ch,n:Integer);\nSelWav: function(t, ch, n) {\nvar chn=t.channels[ch];\nchn.CurWav = n;\nif (n < WvC) {\nchn.SccWave = t.WaveDat[n];\nchn.L2WL = 5;\nchn.Sync = False;\n} else {\nif (t.PCMW[n - WvC] != nil) {\nchn.SccWave = t.PCMW[n - WvC].Start;\nchn.L2WL = t.PCMW[n - WvC].Log2Len;\nchn.Sync = True;\n}\n}\n},\nRegPCM: function (t,fn, n) {\nconsole.log(\"[STUB]regpcm\",fn.map(function (e) {return String.fromCharCode(e);}),n);\n},\n/*\nprocedure TEnveloper.RegPCM (fn:string;n:Integer);\nvar i:Integer;\nwl,wl2:TWavLoader;\n{\nif ( ! FileExists(fn) ) {\nfn=ExtractFilePath (ParamStr(0))+'\\\\'+fn;\nif ( ! FileExists(fn) ) return;\n}\nfor ( i=0 to Chs-1 )\nif ( CurWav[i]==n ) SelWav(i,0);\nwl=TWavLoader.Create (fn);IncGar;\nif ( ! wl.isError ) {\nif ( PCMW[n-WvC]!=nil ) {\nPCMW[n-WvC].Free; DecGar;\n}\nwl2=TWavLoader.Clone (TObject(wl)); IncGar;\nPCMW[n-WvC]=wl2;\n}\nwl.Free; DecGar;\n}\n*/\nrefreshPSG: function(t,data,WriteAd,length) {\nvar i, ch, WaveMod, WriteBytes, wdtmp, inext, mid, w1, w2, //:integer;\nTP = [],\nvCenter = [], //:array [0..Chs-1] of Integer;\n//Steps:array [0..Chs-1] of Integer;\nLambda, NewLambda, //:Real;\nres, //:MMRESULT;\nWriteTwice, LfoInc, //:Boolean;\nWriteMax, //:integer;\nnowt, //:longint;\n// AllVCenter:Integer;\nWf=0, Wt=0, WMid=0, WRes=0, WSum=0, v=0, NoiseP=0, Tmporc=0, //:Integer;\nLParam, HParam, WParam, //:Byte;\nJmpSafe, EnvFlag, //:Integer;\nse; //:^TSoundElem;\nEnvFlag = 0;\nLfoInc = True;\ncnt++;\nvar mcountK=t.sampleRate / 22050;\nvar tempoK=44100 / t.sampleRate ;\nvar startTime=new Date().getTime();\nif (t.allStopped()) {\nfor (i=WriteAd; i<=WriteAd+length; i++) {\ndata[i]=0;\n}\nreturn;\n}\nvar vv=[],SeqTime=t.SeqTime,lpchk=0,chn;\nfor (ch = 0; ch < Chs; ch++) {\nchn=t.channels[ch];\nif (chn.MPoint[chn.MPointC] == nil) t.StopMML(ch);\nif (chn.PlayState != psPlay) continue;\nif (chn.PorLen > 0) {\nTmporc = chn.MCount - SeqTime;\nchn.Steps = (\ndiv(chn.PorStart, chn.PorLen) * Tmporc +\ndiv(chn.PorEnd, chn.PorLen * (chn.PorLen - Tmporc))\n);\n}\nif ((chn.soundMode))\nv = chn.EVol;\nelse if ((chn.Resting))\nv = 0;\nelse\nv = chn.EShape[chn.ECount >>> 11] * chn.EVol * chn.EBaseVol; // 16bit\nif (t.Fading < FadeMax) {\nv = v * div(t.Fading, FadeMax); // 16bit\n}\nvv[ch]=v;\nif (chn.ECount + chn.ESpeed*(length/2) < 65536 ) chn.ECount += chn.ESpeed*(length/2);\nJmpSafe = 0;\nwhile (chn.MCount <= SeqTime) {\n//if (lpchk++>1000) throw new Error(\"Mugen2\");\n//MCount[ch]=0;\nvar pc = chn.MPointC;\nif (ch==0) t.PC2Time[pc]=t.writtenSamples;\nLParam = chn.MPoint[pc + 1];\nHParam = chn.MPoint[pc + 2];\nvar code = chn.MPoint[pc];\n//console.log(\"ch\",ch,\"Code\",code)\nif (code >= 0 && code < 96 || code === MRest) {\n//console.log(ch, chn.MCount, SeqTime,(LParam + HParam * 256) * 2);\nt.Play1Sound(ch, code, chn.Slur);\nif (!chn.Slur) chn.LfoDC = chn.LfoD;\nchn.Slur = False;\n//MCount[ch]=SPS div LParam;\nchn.MCount +=\n(LParam + HParam * 256) * 2;\n// SPS=22050の場合 *2 を *1 に。\n// SPS=x の場合 * (x/22050)\nchn.MPointC += 3;\n} else switch (code) {\ncase MPor:{\nt.Play1Por (ch,\nLParam,\nHParam,\nchn.Slur\n);\nchn.Slur=False;\nchn.MCount+=\n( chn.MPoint[pc + 3]+chn.MPoint[pc + 4]*256 )*2;\n// SPS=22050の場合 *2 を *1 に。\nchn.PorLen=chn.MCount-SeqTime;\nchn.MPointC+=5;\n}break;\ncase MTempo:\n{\nt.Tempo = LParam + HParam * 256;\nchn.MPointC += 3;\n}\nbreak;\ncase MVol:\n{\nchn.EVol = LParam;\nchn.MPointC += 2;\n}\nbreak;\ncase MBaseVol:\n{\nchn.EBaseVol = LParam;\nchn.MPointC += 2;\n}\nbreak;\ncase Mps:\n{\nchn.ESpeed = LParam;\nchn.MPointC += 2;\n}\nbreak;\ncase MSelWav:\n{\n//SccWave[ch]=@t.WaveDat[LParam,0];\nt.SelWav(ch, LParam);\nchn.MPointC += 2;\n}\nbreak;\ncase MWrtWav:\n{\nchn.MPointC += 34; // MWrtWav wavno data*32\nfor (i = 0; i < 32; i++) {\nt.WaveDat[LParam][i] = chn.MPoint[pc + 2 + i];\n}\n}\nbreak;\ncase MSelEnv:\n{\nchn.EShape = t.EnvDat[LParam];\nchn.MPointC += 2;\n}\nbreak;\ncase MWrtEnv:\n{ // MWrtEnv envno data*32\nchn.MPointC += 34;\nfor (i = 0; i < 32; i++) {\nwdtmp = chn.MPoint[pc + 2 + i];\nif (wdtmp > 15) wdtmp = 15;\nt.EnvDat[LParam][i] = wdtmp;\n}\n}\nbreak;\ncase MJmp:\n{\nif (t.WavOutMode) {\nif (ch==0) {\nvar dstLabelPos=chn.MPointC + array2Int(chn.MPoint, pc+1);\n//var dstLabelNum=chn.MPoint[dstLabelPos+1];\nvar dstTime=t.PC2Time[dstLabelPos];// t.label2Time[dstLabelNum-0];\nif (typeof dstTime==\"number\" && dstTime<t.writtenSamples) {\nt.loopStartFrac=[dstTime, t.sampleRate];\nconsole.log(\"@jump\", \"ofs=\",t.loopStartFrac );\n}\n}\nchn.MPointC += 5;\n} else {\n/*console.log(\"old mpointc \",chn.MPointC,LParam,HParam,chn.MPoint[pc + 3],chn.MPoint[pc + 4],LParam << 0 +\nHParam << 8 +\nchn.MPoint[pc + 3] << 16 +\nchn.MPoint[pc + 4] << 24);*/\nchn.MPointC += array2Int(chn.MPoint, pc+1);\n/*LParam << 0 +\nHParam << 8 +\nchn.MPoint[pc + 3] << 16 +\nchn.MPoint[pc + 4] << 24;*/\n//console.log(\"new mpointc \",chn.MPointC);\n}\nJmpSafe++;\nif (JmpSafe > 1) {\nconsole.log(\"Jumpsafe!\");\nt.StopMML(ch);\nchn.MCount = SeqTime + 1;\n}\n}\nbreak;\ncase MLabel:\nif (t.WavOutMode && ch==0) {\nt.label2Time[LParam]=[t.writtenSamples,t.sampleRate];\nconsole.log(\"@label\", LParam , chn.MPointC , t.writtenSamples+\"/\"+t.sampleRate );\n}\nchn.MPointC+=2;\nbreak;\ncase MSlur:\n{\nchn.Slur = True;\nchn.MPointC += 1;\n}\nbreak;\ncase MWait:\n{\nt.WaitMML(ch);\nchn.MPointC += 1;\n}\nbreak;\ncase MCom:\n{\nt.ComStr = StrPas(chn.MPoint, pc + 1);\nchn.MPointC += t.ComStr.length + 2; // opcode str \\0\n//inc (MPoint[ch],length(comstr)+2);\n}\nbreak;\ncase MWOut:\n{\nt.WFilename = StrPas(chn.MPoint, pc + 1);\nchn.MPointC += t.WFilename.length + 2; // opcode str \\0\n//inc (MPoint[ch],length(WFilename)+2);\n}\nbreak;\ncase MWEnd:\n{\nchn.MPointC += 1;\n}\nbreak;\ncase MDet:\n{\nchn.Detune = ShortInt(LParam);\nchn.MPointC += 2;\n}\nbreak;\ncase MLfo:\n{\nchn.LfoSync = (LParam);\nchn.LfoV = (HParam) * 65536;\nchn.LfoA = (chn.MPoint[pc + 3]);\nchn.LfoD = 0;\nchn.MPointC += 4;\n}\nbreak;\ncase MLfoD:\n{\nchn.LfoD = LParam * t.sampleRate;\nchn.MPointC += 2;\n}\nbreak;\ncase MSync:\n{\nchn.Sync = (LParam == 1);\nchn.MPointC += 2;\n}\nbreak;\ncase MPCMReg:{\nvar fn=StrPas(chn.MPoint, pc+1);\nt.RegPCM (fn,chn.MPoint[pc+1+fn.length+1]);\nchn.MPointC+=fn.length +3;\n}break;\ncase Mend:\nt.StopMML(ch); //MPoint[ch]=nil;\nbreak;\ndefault:\nt.StopMML(ch);\nthrow new Error(\"Invalid opcode\" + code); //ShowMessage ('???'+IntToSTr(Byte(MPoint[ch]^)));\n//chn.MPointC += 1;\n}\n}\n// End Of MMLProc\n}\nt.handleAllState();\nt.SeqTime+= Math.floor( t.Tempo * (length/120) * tempoK );\nfor (var ad=WriteAd; ad<WriteAd+length; ad++) {\ndata[ad]=0;\n}\nfor (ch = 0; ch < Chs; ch++) {\nchn=t.channels[ch];\nif (chn.PlayState != psPlay) continue;\nv=vv[ch];\nif (v<=0) continue;\nfor (ad=WriteAd; ad<WriteAd+length; ad++) {\n//if (lpchk++>100000) throw new Error(\"Mugen3 \"+WriteAd+\" \"+length);\nLfoInc = !LfoInc;\n//EnvFlag++;\n//if (EnvFlag > 1) EnvFlag = 0;\nWSum = data[ad];\ni = /*chkn*/(chn.SccCount >>> (32 - chn.L2WL));\n//inext=(i+1) & ((1 << L2WL[ch])-1);\n//mid=(SccCount[ch] >> (24-L2WL[ch])) & 255;\n// *****000 00000000 00000000 00000000\n// ***** 00000000\nw1 = /*chkn*/(chn.SccWave[i]);\n//chkn(v);\n//w2=Byte((SccWave[ch]+inext)^) ;\n/*WSum += ((\ndiv((w1 * v), (16 * 128))\n) - div(v, 16))/32768;*/\nWSum += (\n(w1 * v)/ 0x4000000\n) - (v / 0x80000);\nif (!chn.Sync) {\n(chn.SccCount += chn.Steps);\n} else {\nif ((chn.SccCount < -chn.Steps * 2) || (chn.SccCount >= 0))(chn.SccCount += chn.Steps);\n}\nif ((chn.LfoV != 0)) {\nif ((chn.LfoDC > 0)) {\n(chn.LfoDC -= t.Tempo);\n} else {\n(chn.SccCount +=\nsinT[chn.LfoC >>> (16 + sinMax_s)] *\ndiv(chn.Steps, 512) *\ndiv(chn.LfoA, 256)\n);\nif (LfoInc) chn.LfoC += chn.LfoV;\n}\n}\nif (WSum > 1) WSum = 1; //16bit\nif (WSum < -1) WSum = -1; //16bit\ndata[ad]=WSum;\nif (ch==0) t.WaveDat[95][NoiseP & 31] = Math.floor(Math.random() * 78 + 90);\nNoiseP++;\n}//of for (var i=WriteAd; i<=WriteAd+length; i++\n//bufferState.writtenSamples+=length;\n}// of ch loop\nt.performance.elapsedTime+=new Date().getTime()-startTime;\nt.performance.writtenSamples+=length;\nt.performance.writeRate=t.performance.writtenSamples/(t.performance.elapsedTime/1000*t.sampleRate);\n//WTime=GetTickCount-WTime;\n//BufferUnderRun= getPlayPos - LastWriteStartPos;\n//--------------|---------------------------\n// playpos LS LE\n// +-------------+\n}// of refreshPSG\n}); // of Klass.define\nvar undefs={};\nfunction replf(_,name) {\n//console.log(name);\nif (!defs.$fields[name]) {\nif (undefs[name]==null) undefs[name]=1;\n//console.error(\"Undefined \",name);\n}\n}\nfor(var k in defs) {\nvar fldreg=/\\bt\\s*\\.\\s*([a-zA-Z0-9]+)\\b/g;\nif (typeof defs[k]===\"function\") {\nvar src=defs[k]+\"\";\nvar r=src.replace(fldreg, replf);\nundefs[k]=0;\n}\n}\nconsole.log(undefs);\nreturn TEnveloper;\n}); // of requirejs.define\n/*\nprocedure TEnveloper.PlayKeyBd (n,WaveSel:Integer);\nvar i,ch,WaveMod,WriteBytes,wdtmp:integer;\nTP,vCenter:array [0..Chs-1] of Integer;\nLambda,NewLambda:Real;\nres:MMRESULT;\nWriteMax:integer;\nnowt:longint;\nAllVCenter:Integer;\nWf,Wt,WMid,WRes,WSum,v,NoiseP:Integer;\nLParam,WParam:Byte;\nJmpSafe:Integer;\n{\nStart;\nch=Chs-1;\nPlay1Sound (ch,n,False);\nEVol[ch]=127;\nSccWave[ch]=@WaveDat[WaveSel,0];\nmmt.wType=TIME_SAMPLES;\nWaveOutGetPosition (hwo, @mmt, SizeOf(MMTIME));\nPos=mmt.Sample mod Bsize;\nWriteAd=(Pos+Delay) mod BSize;\nWriteMax=(Pos+BSize-1) mod BSize;\nwhile ( WriteAd!=WriteMax ) {\nWSum=0;//wdata2[WriteAd];\nv=(( Byte(( EShape[ch]+(ECount[ch] >> 11) )^) )*EVol[ch]*EBaseVol[ch]);\nif ( v>0 ) {\ni=SccCount[ch] >> 27;\ninc (WSum,(\n( Byte((SccWave[ch]+i)^)*v ) div (16*128)\n)-v div 16\n);\ninc (SccCount[ch],Steps[ch]);\n}\nif ( ECount[ch]+ESpeed[ch]<65536 ) inc (ECount[ch],ESpeed[ch]);\n//WSum=(PrevWSum+WSum) div 2;\nWRes=WSum+wdata2[WriteAd];\nif ( WRes>32767 ) WRes=32767; //16bit\nif ( WRes<-32768 ) WRes=-32768; //16bit\nwdata2[WriteAd]=WRes;\n//PrevWSum=WSum;\ninc (WriteAd);\nWriteAd=WriteAd mod BSize;\n}\n}\nprocedure TEnveloper.calibration;\nvar l,p,i:Integer;\n{\np=(Pos+timeLag+BSize) mod BSize;\nfor ( i=0 to BSize-1 ) {\nl=i-p;\nif ( l<-BSize div 2 ) inc(l,BSize);\nif ( l>=BSize div 2 ) dec(l,BSize);\nif ( ((i mod 100)<50) &&\n(abs(l)<calibrationLen) ) {\nwdata2[i]=20000*(calibrationLen-abs(l)) div calibrationLen ;\n} else wdata2[i]=0;\n}\n}\nend.\nMZO format\n1[c]\nVersion Chs ch0.length ch0 data\n000000 b0 04 00 00|0a|1b 00 00 00{64 78 65 05 6e 00 66\n000010 00 6b 00 73 00 00 00 76 00 74 00 67 78 00 24 22\nch1.length ch1 data...\n000020 56 ff ff ff}15 00 00 00 64 78 65 05 6e 00 66 00\n000030 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00\n000040 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76\n000050 00 74 00 ff ff ff 15 00 00 00 64 78 65 05 6e 00\n000060 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15\n000070 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00\n000080 00 76 00 74 00 ff ff ff 15 00 00 00 64 78 65 05\n000090 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff\n0000a0 ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73\n0000b0 00 00 00 76 00 74 00 ff ff ff 15 00 00 00 64 78\n0000c0 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00\n0000d0 ff ff ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b\n0000e0 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00 00\n0000f0 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00\n000100 74 00 ff ff ff\n000105\n1b 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00\n00 00 76 00 74 00 67 78 00 24 22 56 ff ff ff}\n15 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00\n00 00 76 00 74 00 ff ff ff}\n*/\n;\n(function e(t, n, r) {\nfunction s(o, u) {\nif (!n[o]) {\nif (!t[o]) {\nvar a = typeof require == \"function\" && require;\nif (!u && a) return a(o, !0);\nif (i) return i(o, !0);\nvar f = new Error(\"Cannot find module '\" + o + \"'\");\nthrow f.code = \"MODULE_NOT_FOUND\", f;\n}\nvar l = n[o] = {\nexports: {}\n};\nt[o][0].call(l.exports, function(e) {\nvar n = t[o][1][e];\nreturn s(n ? n : e);\n}, l, l.exports, e, t, n, r);\n}\nreturn n[o].exports;\n}\nvar i = typeof require == \"function\" && require;\nfor (var o = 0; o < r.length; o++) s(r[o]);\nreturn s;\n})({\n1: [ function(require, module, exports) {\nvar process = module.exports = {};\nprocess.nextTick = function() {\nvar canSetImmediate = typeof window !== \"undefined\" && window.setImmediate;\nvar canPost = typeof window !== \"undefined\" && window.postMessage && window.addEventListener;\nif (canSetImmediate) {\nreturn function(f) {\nreturn window.setImmediate(f);\n};\n}\nif (canPost) {\nvar queue = [];\nwindow.addEventListener(\"message\", function(ev) {\nvar source = ev.source;\nif ((source === window || source === null) && ev.data === \"process-tick\") {\nev.stopPropagation();\nif (queue.length > 0) {\nvar fn = queue.shift();\nfn();\n}\n}\n}, true);\nreturn function nextTick(fn) {\nqueue.push(fn);\nwindow.postMessage(\"process-tick\", \"*\");\n};\n}\nreturn function nextTick(fn) {\nsetTimeout(fn, 0);\n};\n}();\nprocess.title = \"browser\";\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nfunction noop() {}\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.binding = function(name) {\nthrow new Error(\"process.binding is not supported\");\n};\nprocess.cwd = function() {\nreturn \"/\";\n};\nprocess.chdir = function(dir) {\nthrow new Error(\"process.chdir is not supported\");\n};\n}, {} ],\n2: [ function(require, module, exports) {\n\"use strict\";\nvar asap = require(\"asap\");\nmodule.exports = Promise;\nfunction Promise(fn) {\nif (typeof this !== \"object\") throw new TypeError(\"Promises must be constructed via new\");\nif (typeof fn !== \"function\") throw new TypeError(\"not a function\");\nvar state = null;\nvar value = null;\nvar deferreds = [];\nvar self = this;\nthis.then = function(onFulfilled, onRejected) {\nreturn new self.constructor(function(resolve, reject) {\nhandle(new Handler(onFulfilled, onRejected, resolve, reject));\n});\n};\nfunction handle(deferred) {\nif (state === null) {\ndeferreds.push(deferred);\nreturn;\n}\nasap(function() {\nvar cb = state ? deferred.onFulfilled : deferred.onRejected;\nif (cb === null) {\n(state ? deferred.resolve : deferred.reject)(value);\nreturn;\n}\nvar ret;\ntry {\nret = cb(value);\n} catch (e) {\ndeferred.reject(e);\nreturn;\n}\ndeferred.resolve(ret);\n});\n}\nfunction resolve(newValue) {\ntry {\nif (newValue === self) throw new TypeError(\"A promise cannot be resolved with itself.\");\nif (newValue && (typeof newValue === \"object\" || typeof newValue === \"function\")) {\nvar then = newValue.then;\nif (typeof then === \"function\") {\ndoResolve(then.bind(newValue), resolve, reject);\nreturn;\n}\n}\nstate = true;\nvalue = newValue;\nfinale();\n} catch (e) {\nreject(e);\n}\n}\nfunction reject(newValue) {\nstate = false;\nvalue = newValue;\nfinale();\n}\nfunction finale() {\nfor (var i = 0, len = deferreds.length; i < len; i++) handle(deferreds[i]);\ndeferreds = null;\n}\ndoResolve(fn, resolve, reject);\n}\nfunction Handler(onFulfilled, onRejected, resolve, reject) {\nthis.onFulfilled = typeof onFulfilled === \"function\" ? onFulfilled : null;\nthis.onRejected = typeof onRejected === \"function\" ? onRejected : null;\nthis.resolve = resolve;\nthis.reject = reject;\n}\nfunction doResolve(fn, onFulfilled, onRejected) {\nvar done = false;\ntry {\nfn(function(value) {\nif (done) return;\ndone = true;\nonFulfilled(value);\n}, function(reason) {\nif (done) return;\ndone = true;\nonRejected(reason);\n});\n} catch (ex) {\nif (done) return;\ndone = true;\nonRejected(ex);\n}\n}\n}, {\nasap: 4\n} ],\n3: [ function(require, module, exports) {\n\"use strict\";\nvar Promise = require(\"./core.js\");\nvar asap = require(\"asap\");\nmodule.exports = Promise;\nfunction ValuePromise(value) {\nthis.then = function(onFulfilled) {\nif (typeof onFulfilled !== \"function\") return this;\nreturn new Promise(function(resolve, reject) {\nasap(function() {\ntry {\nresolve(onFulfilled(value));\n} catch (ex) {\nreject(ex);\n}\n});\n});\n};\n}\nValuePromise.prototype = Promise.prototype;\nvar TRUE = new ValuePromise(true);\nvar FALSE = new ValuePromise(false);\nvar NULL = new ValuePromise(null);\nvar UNDEFINED = new ValuePromise(undefined);\nvar ZERO = new ValuePromise(0);\nvar EMPTYSTRING = new ValuePromise(\"\");\nPromise.resolve = function(value) {\nif (value instanceof Promise) return value;\nif (value === null) return NULL;\nif (value === undefined) return UNDEFINED;\nif (value === true) return TRUE;\nif (value === false) return FALSE;\nif (value === 0) return ZERO;\nif (value === \"\") return EMPTYSTRING;\nif (typeof value === \"object\" || typeof value === \"function\") {\ntry {\nvar then = value.then;\nif (typeof then === \"function\") {\nreturn new Promise(then.bind(value));\n}\n} catch (ex) {\nreturn new Promise(function(resolve, reject) {\nreject(ex);\n});\n}\n}\nreturn new ValuePromise(value);\n};\nPromise.all = function(arr) {\nvar args = Array.prototype.slice.call(arr);\nreturn new Promise(function(resolve, reject) {\nif (args.length === 0) return resolve([]);\nvar remaining = args.length;\nfunction res(i, val) {\ntry {\nif (val && (typeof val === \"object\" || typeof val === \"function\")) {\nvar then = val.then;\nif (typeof then === \"function\") {\nthen.call(val, function(val) {\nres(i, val);\n}, reject);\nreturn;\n}\n}\nargs[i] = val;\nif (--remaining === 0) {\nresolve(args);\n}\n} catch (ex) {\nreject(ex);\n}\n}\nfor (var i = 0; i < args.length; i++) {\nres(i, args[i]);\n}\n});\n};\nPromise.reject = function(value) {\nreturn new Promise(function(resolve, reject) {\nreject(value);\n});\n};\nPromise.race = function(values) {\nreturn new Promise(function(resolve, reject) {\nvalues.forEach(function(value) {\nPromise.resolve(value).then(resolve, reject);\n});\n});\n};\nPromise.prototype[\"catch\"] = function(onRejected) {\nreturn this.then(null, onRejected);\n};\n}, {\n\"./core.js\": 2,\nasap: 4\n} ],\n4: [ function(require, module, exports) {\n(function(process) {\nvar head = {\ntask: void 0,\nnext: null\n};\nvar tail = head;\nvar flushing = false;\nvar requestFlush = void 0;\nvar isNodeJS = false;\nfunction flush() {\nwhile (head.next) {\nhead = head.next;\nvar task = head.task;\nhead.task = void 0;\nvar domain = head.domain;\nif (domain) {\nhead.domain = void 0;\ndomain.enter();\n}\ntry {\ntask();\n} catch (e) {\nif (isNodeJS) {\nif (domain) {\ndomain.exit();\n}\nsetTimeout(flush, 0);\nif (domain) {\ndomain.enter();\n}\nthrow e;\n} else {\nsetTimeout(function() {\nthrow e;\n}, 0);\n}\n}\nif (domain) {\ndomain.exit();\n}\n}\nflushing = false;\n}\nif (typeof process !== \"undefined\" && process.nextTick) {\nisNodeJS = true;\nrequestFlush = function() {\nprocess.nextTick(flush);\n};\n} else if (typeof setImmediate === \"function\") {\nif (typeof window !== \"undefined\") {\nrequestFlush = setImmediate.bind(window, flush);\n} else {\nrequestFlush = function() {\nsetImmediate(flush);\n};\n}\n} else if (typeof MessageChannel !== \"undefined\") {\nvar channel = new MessageChannel();\nchannel.port1.onmessage = flush;\nrequestFlush = function() {\nchannel.port2.postMessage(0);\n};\n} else {\nrequestFlush = function() {\nsetTimeout(flush, 0);\n};\n}\nfunction asap(task) {\ntail = tail.next = {\ntask: task,\ndomain: isNodeJS && process.domain,\nnext: null\n};\nif (!flushing) {\nflushing = true;\nrequestFlush();\n}\n}\nmodule.exports = asap;\n}).call(this, require(\"_process\"));\n}, {\n_process: 1\n} ],\n5: [ function(require, module, exports) {\nif (typeof Promise.prototype.done !== \"function\") {\nPromise.prototype.done = function(onFulfilled, onRejected) {\nvar self = arguments.length ? this.then.apply(this, arguments) : this;\nself.then(null, function(err) {\nsetTimeout(function() {\nthrow err;\n}, 0);\n});\n};\n}\n}, {} ],\n6: [ function(require, module, exports) {\nvar asap = require(\"asap\");\nif (typeof Promise === \"undefined\") {\nPromise = require(\"./lib/core.js\");\nrequire(\"./lib/es6-extensions.js\");\n}\nrequire(\"./polyfill-done.js\");\n}, {\n\"./lib/core.js\": 2,\n\"./lib/es6-extensions.js\": 3,\n\"./polyfill-done.js\": 5,\nasap: 4\n} ]\n}, {}, [ 6 ]);\n//# sourceMappingURL=/polyfills/promise-6.1.0.js.map\n;\ndefine(\"promise\", function(){});\n/*global window,self,global*/\ndefine('root',[],function (){\nif (typeof window!==\"undefined\") return window;\nif (typeof self!==\"undefined\") return self;\nif (typeof global!==\"undefined\") return global;\nreturn (function (){return this;})();\n});\n// Worker Side\ndefine('WorkerServiceW',[\"promise\",\"root\"], function (_,root) {\nvar idseq=1;\nvar paths={},queue={},self=root;\nroot.WorkerService={\ninstall: function (path, func) {\npaths[path]=func;\n},\nserv: function (path,func) {\nthis.install(path,func);\n},\nready: function () {\nroot.WorkerService.isReady=true;\nself.postMessage({ready:true});\n},\nreverse: function (path, params) {\nvar id=idseq++;\nreturn new Promise(function (succ,err) {\nqueue[id]=function (e) {\nif (e.status==\"ok\") {\nsucc(e.result);\n} else {\nerr(e.error);\n}\n};\nself.postMessage({\nreverse: true,\nid: id,\npath: path,\nparams: params\n});\n});\n}\n};\nself.addEventListener(\"message\", function (e) {\nvar d=e.data;\nvar id=d.id;\nvar context={id:id};\nif (d.reverse) {\nqueue[d.id](d);\ndelete queue[d.id];\nreturn;\n}\ntry {\nPromise.resolve( paths[d.path](d.params,context) ).then(function (r) {\nself.postMessage({\nid:id, result:r, status:\"ok\"\n});\n},sendError);\n} catch (ex) {\nsendError(ex);\n}\nfunction sendError(e) {\nself.postMessage({\nid:id, error:e?(e.stack||e+\"\"):\"unknown\", status:\"error\"\n});\n}\n});\nroot.WorkerService.install(\"WorkerService/isReady\",function (){\nreturn root.WorkerService.isReady;\n});\nif (!root.console) {\nroot.console={\nlog: function () {\nroot.WorkerService.reverse(\"console/log\",Array.prototype.slice.call(arguments));\n}\n};\n}\nreturn root.WorkerService;\n});\ndefine('Tones.wdt',[],function () {\nreturn \"data:application/octet-stream;base64,UFBQUFBQUFBQUFBQUFBQULm5ubm5ubm5ubm5ubm5ublnZ2dnZ6einUdETExBTHyao6OZnpNASWqZmJqZMENshm1LOjA6UFZOMys4RVBfZ3iHmKCvwMfUzLGpr8XPxbSSoGdnVUpBQD9BSUpKTlJjfK7BxL+xoHxiVkpPaIGToK1oYVZORkA5NDQ0NjpBSVZgbHuKlaOrrq6tq6Sfk4d8dopORUtVYGJobGdQRTw7RmF4jLO6uK+cmZmZmZqalY6MTkxOS0tLS0tLS0tLS0tLTH2uxc7SzruegVFQUE9PT05GSUdHRkZGRkZGz8/MzMzOz87Oz3dERUVFRUXOztDQSSdPa2xsa2tra2ttbW1ta4yx29rb3MGkim5WQSUlJScnR0lJSUlJSkpKSUlJSUlJSUlKvLy8u7y8u75GRkdHR0fs7OwPSqmfUEtJRTg4ODY2LysrKSkoKh4eHh4eHh4eH05OT09PT09PT09PT09PUFBQUFBQUFBQUFBPT0+4tra2Z2dbOTg7R2eIpK2kmIlsVUxHSlhwhJ+xq6OZmZmZjYiVioFsUS0iICo2TmCClaCzsaVrTEpccZGuurazsK+pop9cY1eRfGtfVUc/dZKecWhtomFjX3aBgXFgVUlAUYeY1ipFVWNseIKMkpmiqK2wubu+wMTFxcbGy8vQ0tHR0tR3iGBXbElAqKuOUk9Yk5OvuLm5ubSgcFZLTGpukpRma2dnZ2dnfpeZl4dwalBOZ2egtbOZeGVmcYKdrbWwrZmZZ2dnZ0c5MzMxMTEzNTk8Z5mZmZmZmcnJx8fGxsXDv7NKQUBUZW1tZV1dY3eUoKqrq5+cnai6xMXAtaWdk4p3YDA8TFZhZ3J8hI6fqrW/z9fs1rypnY2AcWFSRz80LSkgPEFGTlBWV1xdYmhscHN3eHyChoqRlZmeoKKlrbC1usHGv7WupaOak4+IiIR+eXhzbmtnYF1bxsZUUU5JQzs4NmBgYGBhwMC/v7/Dw8PExMPDw2NiZWVlZWVlZWVlYWFlV1dWVlRRVFJSUlTFxcXExMPDw8PDxFBQVFRUVldTVFfHx8fGxcS/v7u5tLCtp6Cal5KOhIB7cm5oYFdOPjgqxauxqZoXipOUZ2eTQ0GIlW2up6+VztDWSXKrpVCoTIOkyz5AQUFBQ0NBP0BGS1FdaHF3goePmaCps7u/xMXFxccjIChdZWBcRx8cGh0rRF11jaW80uBzs6ez29zOqY1qPmxmVjNBPmegtLy1u7iajYyUo6uqpJ+XkY2NjYyKiISZZ2dohIRYW4SEVleUq7q6sI1EREtlkZFbXJOrvr68sZeZmJhnZ2dnZ7a4QUNDP8vR0c/Oy8tFR0eZmZmZmZmZmShmg6q4qYqTpbq7uLWzq6igoJ6Xko2BdmNROC01SkMqAOH3/v/73wDh+v//+eoA6Pj+//nqAOj4///46gDk9vxnZ2dnqKqtgHl1gJSdnZV3cHOCjZyjoJyYl5SUmZmZmUNBRUdLVFhicHt+fn5+fn5+fn5+fn2BiJSns7/ExsbFcHBwcHBtbW1sbGxsbW1sbG1ubXzBw3M1HyApamxtbWzPz8/Oz8nBs5R7Zl1FOTw4RFJgc4mgvsXLy1dSUltix3FwcHBwc3V1dXV1dXNxcXFy1tYgIiJ2dnZ2dnZ1cXFxXDooNVowKDBcMCk1Q1BdeI2kvt3q4Ljd5tyx3+jcqH1mX19mZ2eZmYQ8PkZHSldddYKPlJmZmZmZmZmZmZmTjGdnZ3l4eHl5bFVMSklUgKSxsbawmqqzy76Yk7O+tLCtUTowLVKPsMHS1dHOzMfDtauZgWBFPDEzMTE+XICTjoFnZ2dnW09LXU5FVmNzhJOerrqnj4S/uJmZmZmZmZmZmb5RUElMTrXQ3N3cyYZwbHWOo8HV3dvBnZWOj5mgq7G4fX18gMG/e3h4eXl5fHx8gcG8gjAvLi4uLi4xMTAwL31HxMXGxsbFxcXFxURBPz8/QMPDxMTDw0ZDQ0FGRkdHR5q50OPcv62YhHV2j6u1qo5xVUpUcImKe2dSQCMcL0ZleGtcPDEuJygzYGNjZWZmZ567w8XAqaCOj4+SlJWUlIxlZWVHNjAkJTFQX2BgYGBfYp2qsbGwqJmRjoN8dXJubGdnZ2dUTEtQVFhfZWhxfI2vwMbJyb6qZ1pSRUaZmZmZgIePoLvQ29GwdrDQ3NS+nmFBKyMvT5JPLiQvRF9weH+uvsTEuqBYo7nAwL6vd2FQR0dHandqSklJSUlJSldshv8SfP8NaP7/DAz/B/0DA8T/yw/r++4PbfcSEvX4FBpaUWfJe7Cfqatnq2erqZ9KO5N952qZW4d2c3WGxlCZmdJnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZmenJR5d4KSlYRmVlBRUVJnr8fHwbSrpaKelHllZWVugWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnbmBfYmuOvsC5qJKHhIB+fXx8fXFnVVaan5mZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dhWoGRhltYZXyap6mfc3FmYXycqa6kj4J9fYGMZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlzdTw6Oz8/Pz9FR0pPV2Fqc36JjZqgqrC2vL+/vnd3c5pROjQxKycrKysuMDAxNj44ODtKk7zL0NS/jK/A0Mm4Z2dnZ2dnZ2dnZ2dnZ2dnZ5KtwdDMwamNZmdnZ2dnZ2eKg2dfaGt5eYS4mnBmY2VnZ2dna4+rq6t+bnZ2oKOnmLCwZ0k8Ozs7PEBLUltsj6q0ury6mX1RSpi5uFBKh6u5S05Ma2trampqTE5OTk5OecnJysvLra+urq60yc7OzspwcHJy1NbX2NjY1tR1cnV1c3Nzubm2tkNBQUNxcHJycaurq2dnZ2dmY2NqxsbExV9fX2HGycbGxkVEPkA8Ozs7Ii5L/+sAGi9FYXecvtXh7PX5/v7+/v7++/Dr3LAoDRMjIiUCIy8rPDRHUU9GHhMZIDUKCkQqGhoKCQwREy88PoSMnIynoLuoz7i8l6eCcnxXZjlOGE9BbmGCopfGp7iZQUNFTHagya6TcEVDQUFBW2iBmai5xc/Gua2VfWtWTkc7Ozs8tLS0trS0Ojo4ODk5uLi4tra2tbW2tra4tbW1tT5WaHFzbF1QODlLbp21w8/Rz8/Pz9DR0dHR0c65h1Y+coOgu8TDuZ13YEA0MDM/VG2Hmaq1wMXGxsO1p5SAc206c3NzlaeooIhYQzpAZnZ1dsPBwMDBwcHBwHV3dnM7O09wlMXav5d2XUs1IjtGXHWPorDF2MOtmYFxW0s6LygkZ2doMzMzMTNlZWhnlZWVlZWV0NDS0NDQ0NDPmJmZmWeYXC8tLS0tLispKTxlfJGcnaq1uriulJK4trWYlbq4qGdnZ2dnZ2dnZ2dnZ2dnZ2eZqL7Hyb+xnJSEfTEpQJyaZ2dnZ2evsLS5Tjw8RU5PZ5mZmZmZmWhdXF+ZmZmZmZlnZ2eAl56VaFJFQ0VKZ2dnmZmZmZmZmZmZmZmZmZmZmWJnZ2dnZ2dnZ2dnZ2dnZ2eZtb6+saOVh3x5cVQ/QUxfNEFOXWVrc36Hj5yjpaijeJejtsDFys/V1tfX1tXV1SuaUTpYVlZ5WlxdXDAwMWA+ODg7SpO5xtDOz6TQ0Mq8rspnUVFMS1ZztsbHvq+djU9PUGF2iZior7i+wMHDxsnKP1BmZWA4NCozO1eInrPBxYaGg7+/moJRQDAkIyMkKTNbWldXV2d2dmc4ODg5OnmvxcTExMSxV1hYWFiImZmZilqCipRyj5uHomxkmX19hY2giWeHZmSMg5RnmIGZpYFmDw4LCgoJCAcHBgYFBQQEAwMDAgICAgICAgICAgICAgAPDgsKCQkJCAgIBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwEODg4ODg4ODg0MDAwMDAwMDAwLCwsLCwsLCwoKCgoKAgUICgsNDg8PDw8PDw8ODg0NDAwLCwsKCgoJCQgICAcPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQ8PDw8ODg4ODg4ODg4ODg4ODg0NDAwLCgoJCAgGBQQCAQAAAAUHCQoLCwwMDA0NDQ0ODg4ODg0NDQ0NDAwMDAwMDAwBAQECAgIDAwMDBAQFBAQFBQYHBwgJCQoLCwwNDg4ODg8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgcGBgYGBQUFBQYHCAgHCAgBAQEBAAA=\";\n});\n/*global requirejs*/\ndefine('SEnvWorker',[\"SEnv\",\"WorkerServiceW\",\"Tones.wdt\"],function (SEnv, WS,wdt) {\nvar e;\nWS.serv(\"MezonetJS/wavOut\",function (params) {\nif (!e) {\nvar ctx={sampleRate:params.sampleRate};\ne=new SEnv(ctx,{wavOutSpeed:10000});\ne.loadWDT(wdt);\n}\ne.load(params.mzo);\nreturn e.wavOut().then(function (arysrc) {\nreturn {arysrc:arysrc, loopStartFrac:e.loopStartFrac};\n});\n});\nWS.serv(\"test\", function () {\nconsole.log(\"TEST!!\");\nreturn \"OK\";\n});\nWS.ready();\n});\nrequire([\"SEnvWorker\"]);\n"));
            t.context=context;
            t.sampleRate=t.context.sampleRate;
        },
        toAudioBuffer: function (t,mzo) {
            return w.run("MezonetJS/wavOut",{mzo:mzo,sampleRate:t.sampleRate}).then(function (res) {
                console.log(res);
                return t.wavToAudioBuffer(res.arysrc, res.loopStartFrac);
            });
        },
        wavToAudioBuffer: function (t,arysrc, loopStartFrac) {
            var buffer = t.context.createBuffer(1, arysrc.length, t.sampleRate);
            var ary = buffer.getChannelData(0);
            for (var i = 0; i < ary.length; i++) {
                 ary[i] = arysrc[i];
            }
            var res={decodedData: buffer};
            if (loopStartFrac) {
                res.loopStart=loopStartFrac[0]/loopStartFrac[1];
            }
            return res;
        }
    });
});

    return require("SEnvClient");
}));
