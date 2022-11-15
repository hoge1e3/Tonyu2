(function (root, factory) {
    root.Mezonet = factory();
}(this, function () {
var requirejs,require,define;(function(undef){var main,req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice,jsSuffixRegExp=/\.js$/;function hasProp(obj,prop){return hasOwn.call(obj,prop)}function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,lastIndex,foundI,foundStarMap,starI,i,j,part,normalizedBaseParts,baseParts=baseName&&baseName.split("/"),map=config.map,starMap=map&&map["*"]||{};if(name){name=name.split("/");lastIndex=name.length-1;if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,"")}if(name[0].charAt(0)==="."&&baseParts){normalizedBaseParts=baseParts.slice(0,baseParts.length-1);name=normalizedBaseParts.concat(name)}for(i=0;i<name.length;i++){part=name[i];if(part==="."){name.splice(i,1);i-=1}else if(part===".."){if(i===0||i===1&&name[2]===".."||name[i-1]===".."){continue}else if(i>0){name.splice(i-1,2);i-=2}}}name=name.join("/")}if((baseParts||starMap)&&map){nameParts=name.split("/");for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join("/");if(baseParts){for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join("/")];if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){foundMap=mapValue;foundI=i;break}}}}if(foundMap){break}if(!foundStarMap&&starMap&&starMap[nameSegment]){foundStarMap=starMap[nameSegment];starI=i}}if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI}if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join("/")}}return name}function makeRequire(relName,forceSync){return function(){var args=aps.call(arguments,0);if(typeof args[0]!=="string"&&args.length===1){args.push(null)}return req.apply(undef,args.concat([relName,forceSync]))}}function makeNormalize(relName){return function(name){return normalize(name,relName)}}function makeLoad(depName){return function(value){defined[depName]=value}}function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name]=true;main.apply(undef,args)}if(!hasProp(defined,name)&&!hasProp(defining,name)){throw new Error("No "+name)}return defined[name]}function splitPrefix(name){var prefix,index=name?name.indexOf("!"):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length)}return[prefix,name]}function makeRelParts(relName){return relName?splitPrefix(relName):[]}makeMap=function(name,relParts){var plugin,parts=splitPrefix(name),prefix=parts[0],relResourceName=relParts[1];name=parts[1];if(prefix){prefix=normalize(prefix,relResourceName);plugin=callDep(prefix)}if(prefix){if(plugin&&plugin.normalize){name=plugin.normalize(name,makeNormalize(relResourceName))}else{name=normalize(name,relResourceName)}}else{name=normalize(name,relResourceName);parts=splitPrefix(name);prefix=parts[0];name=parts[1];if(prefix){plugin=callDep(prefix)}}return{f:prefix?prefix+"!"+name:name,n:name,pr:prefix,p:plugin}};function makeConfig(name){return function(){return config&&config.config&&config.config[name]||{}}}handlers={require:function(name){return makeRequire(name)},exports:function(name){var e=defined[name];if(typeof e!=="undefined"){return e}else{return defined[name]={}}},module:function(name){return{id:name,uri:"",exports:defined[name],config:makeConfig(name)}}};main=function(name,deps,callback,relName){var cjsModule,depName,ret,map,i,relParts,args=[],callbackType=typeof callback,usingExports;relName=relName||name;relParts=makeRelParts(relName);if(callbackType==="undefined"||callbackType==="function"){deps=!deps.length&&callback.length?["require","exports","module"]:deps;for(i=0;i<deps.length;i+=1){map=makeMap(deps[i],relParts);depName=map.f;if(depName==="require"){args[i]=handlers.require(name)}else if(depName==="exports"){args[i]=handlers.exports(name);usingExports=true}else if(depName==="module"){cjsModule=args[i]=handlers.module(name)}else if(hasProp(defined,depName)||hasProp(waiting,depName)||hasProp(defining,depName)){args[i]=callDep(depName)}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i]=defined[depName]}else{throw new Error(name+" missing "+depName)}}ret=callback?callback.apply(defined[name],args):undefined;if(name){if(cjsModule&&cjsModule.exports!==undef&&cjsModule.exports!==defined[name]){defined[name]=cjsModule.exports}else if(ret!==undef||!usingExports){defined[name]=ret}}}else if(name){defined[name]=callback}};requirejs=require=req=function(deps,callback,relName,forceSync,alt){if(typeof deps==="string"){if(handlers[deps]){return handlers[deps](callback)}return callDep(makeMap(deps,makeRelParts(callback)).f)}else if(!deps.splice){config=deps;if(config.deps){req(config.deps,config.callback)}if(!callback){return}if(callback.splice){deps=callback;callback=relName;relName=null}else{deps=undef}}callback=callback||function(){};if(typeof relName==="function"){relName=forceSync;forceSync=alt}if(forceSync){main(undef,deps,callback,relName)}else{setTimeout(function(){main(undef,deps,callback,relName)},4)}return req};req.config=function(cfg){return req(cfg)};requirejs._defined=defined;define=function(name,deps,callback){if(typeof name!=="string"){throw new Error("See almond README: incorrect module build, no module name")}if(!deps.splice){callback=deps;deps=[]}if(!hasProp(defined,name)&&!hasProp(waiting,name)){waiting[name]=[name,deps,callback]}};define.amd={jQuery:true}})();

define("almond", function(){});

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
                    Object.defineProperty(p,name,wrap(pd[name], name));
                } else {
                    p[name]=wrap(pd[name], name);
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
        function wrap(m,mname) {
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
                    wrapCancelled=wrapCancelled||[];
                    wrapCancelled.push(mname);
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
                console.warn("Use python style in all methods and Use $this:true instead",wrapCancelled);
            }
            try {
                throw new Error("Stakku");
            } catch (e) {
                console.log(e.stack);
            }
            //console.warn(pd);
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

define('Tones.wdt',[],function () {
    return "data:application/octet-stream;base64,UFBQUFBQUFBQUFBQUFBQULm5ubm5ubm5ubm5ubm5ublnZ2dnZ6einUdETExBTHyao6OZnpNASWqZmJqZMENshm1LOjA6UFZOMys4RVBfZ3iHmKCvwMfUzLGpr8XPxbSSoGdnVUpBQD9BSUpKTlJjfK7BxL+xoHxiVkpPaIGToK1oYVZORkA5NDQ0NjpBSVZgbHuKlaOrrq6tq6Sfk4d8dopORUtVYGJobGdQRTw7RmF4jLO6uK+cmZmZmZqalY6MTkxOS0tLS0tLS0tLS0tLTH2uxc7SzruegVFQUE9PT05GSUdHRkZGRkZGz8/MzMzOz87Oz3dERUVFRUXOztDQSSdPa2xsa2tra2ttbW1ta4yx29rb3MGkim5WQSUlJScnR0lJSUlJSkpKSUlJSUlJSUlKvLy8u7y8u75GRkdHR0fs7OwPSqmfUEtJRTg4ODY2LysrKSkoKh4eHh4eHh4eH05OT09PT09PT09PT09PUFBQUFBQUFBQUFBPT0+4tra2Z2dbOTg7R2eIpK2kmIlsVUxHSlhwhJ+xq6OZmZmZjYiVioFsUS0iICo2TmCClaCzsaVrTEpccZGuurazsK+pop9cY1eRfGtfVUc/dZKecWhtomFjX3aBgXFgVUlAUYeY1ipFVWNseIKMkpmiqK2wubu+wMTFxcbGy8vQ0tHR0tR3iGBXbElAqKuOUk9Yk5OvuLm5ubSgcFZLTGpukpRma2dnZ2dnfpeZl4dwalBOZ2egtbOZeGVmcYKdrbWwrZmZZ2dnZ0c5MzMxMTEzNTk8Z5mZmZmZmcnJx8fGxsXDv7NKQUBUZW1tZV1dY3eUoKqrq5+cnai6xMXAtaWdk4p3YDA8TFZhZ3J8hI6fqrW/z9fs1rypnY2AcWFSRz80LSkgPEFGTlBWV1xdYmhscHN3eHyChoqRlZmeoKKlrbC1usHGv7WupaOak4+IiIR+eXhzbmtnYF1bxsZUUU5JQzs4NmBgYGBhwMC/v7/Dw8PExMPDw2NiZWVlZWVlZWVlYWFlV1dWVlRRVFJSUlTFxcXExMPDw8PDxFBQVFRUVldTVFfHx8fGxcS/v7u5tLCtp6Cal5KOhIB7cm5oYFdOPjgqxauxqZoXipOUZ2eTQ0GIlW2up6+VztDWSXKrpVCoTIOkyz5AQUFBQ0NBP0BGS1FdaHF3goePmaCps7u/xMXFxccjIChdZWBcRx8cGh0rRF11jaW80uBzs6ez29zOqY1qPmxmVjNBPmegtLy1u7iajYyUo6uqpJ+XkY2NjYyKiISZZ2dohIRYW4SEVleUq7q6sI1EREtlkZFbXJOrvr68sZeZmJhnZ2dnZ7a4QUNDP8vR0c/Oy8tFR0eZmZmZmZmZmShmg6q4qYqTpbq7uLWzq6igoJ6Xko2BdmNROC01SkMqAOH3/v/73wDh+v//+eoA6Pj+//nqAOj4///46gDk9vxnZ2dnqKqtgHl1gJSdnZV3cHOCjZyjoJyYl5SUmZmZmUNBRUdLVFhicHt+fn5+fn5+fn5+fn2BiJSns7/ExsbFcHBwcHBtbW1sbGxsbW1sbG1ubXzBw3M1HyApamxtbWzPz8/Oz8nBs5R7Zl1FOTw4RFJgc4mgvsXLy1dSUltix3FwcHBwc3V1dXV1dXNxcXFy1tYgIiJ2dnZ2dnZ1cXFxXDooNVowKDBcMCk1Q1BdeI2kvt3q4Ljd5tyx3+jcqH1mX19mZ2eZmYQ8PkZHSldddYKPlJmZmZmZmZmZmZmTjGdnZ3l4eHl5bFVMSklUgKSxsbawmqqzy76Yk7O+tLCtUTowLVKPsMHS1dHOzMfDtauZgWBFPDEzMTE+XICTjoFnZ2dnW09LXU5FVmNzhJOerrqnj4S/uJmZmZmZmZmZmb5RUElMTrXQ3N3cyYZwbHWOo8HV3dvBnZWOj5mgq7G4fX18gMG/e3h4eXl5fHx8gcG8gjAvLi4uLi4xMTAwL31HxMXGxsbFxcXFxURBPz8/QMPDxMTDw0ZDQ0FGRkdHR5q50OPcv62YhHV2j6u1qo5xVUpUcImKe2dSQCMcL0ZleGtcPDEuJygzYGNjZWZmZ567w8XAqaCOj4+SlJWUlIxlZWVHNjAkJTFQX2BgYGBfYp2qsbGwqJmRjoN8dXJubGdnZ2dUTEtQVFhfZWhxfI2vwMbJyb6qZ1pSRUaZmZmZgIePoLvQ29GwdrDQ3NS+nmFBKyMvT5JPLiQvRF9weH+uvsTEuqBYo7nAwL6vd2FQR0dHandqSklJSUlJSldshv8SfP8NaP7/DAz/B/0DA8T/yw/r++4PbfcSEvX4FBpaUWfJe7Cfqatnq2erqZ9KO5N952qZW4d2c3WGxlCZmdJnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZmenJR5d4KSlYRmVlBRUVJnr8fHwbSrpaKelHllZWVugWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnbmBfYmuOvsC5qJKHhIB+fXx8fXFnVVaan5mZmWdnZ2dnZ2dnZ2dnZ2dnZ2eZmZmZmZmZmZmZmZmZmZmZZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlnZ2dnZ2dnZ2dnZ2dnZ2dnmZmZmZmZmZmZmZmZmZmZmWdnZ2dhWoGRhltYZXyap6mfc3FmYXycqa6kj4J9fYGMZ2dnZ2dnZ2dnZ2dnZ2dnZ5mZmZmZmZmZmZmZmZmZmZlzdTw6Oz8/Pz9FR0pPV2Fqc36JjZqgqrC2vL+/vnd3c5pROjQxKycrKysuMDAxNj44ODtKk7zL0NS/jK/A0Mm4Z2dnZ2dnZ2dnZ2dnZ2dnZ5KtwdDMwamNZmdnZ2dnZ2eKg2dfaGt5eYS4mnBmY2VnZ2dna4+rq6t+bnZ2oKOnmLCwZ0k8Ozs7PEBLUltsj6q0ury6mX1RSpi5uFBKh6u5S05Ma2trampqTE5OTk5OecnJysvLra+urq60yc7OzspwcHJy1NbX2NjY1tR1cnV1c3Nzubm2tkNBQUNxcHJycaurq2dnZ2dmY2NqxsbExV9fX2HGycbGxkVEPkA8Ozs7Ii5L/+sAGi9FYXecvtXh7PX5/v7+/v7++/Dr3LAoDRMjIiUCIy8rPDRHUU9GHhMZIDUKCkQqGhoKCQwREy88PoSMnIynoLuoz7i8l6eCcnxXZjlOGE9BbmGCopfGp7iZQUNFTHagya6TcEVDQUFBW2iBmai5xc/Gua2VfWtWTkc7Ozs8tLS0trS0Ojo4ODk5uLi4tra2tbW2tra4tbW1tT5WaHFzbF1QODlLbp21w8/Rz8/Pz9DR0dHR0c65h1Y+coOgu8TDuZ13YEA0MDM/VG2Hmaq1wMXGxsO1p5SAc206c3NzlaeooIhYQzpAZnZ1dsPBwMDBwcHBwHV3dnM7O09wlMXav5d2XUs1IjtGXHWPorDF2MOtmYFxW0s6LygkZ2doMzMzMTNlZWhnlZWVlZWV0NDS0NDQ0NDPmJmZmWeYXC8tLS0tLispKTxlfJGcnaq1uriulJK4trWYlbq4qGdnZ2dnZ2dnZ2dnZ2dnZ2eZqL7Hyb+xnJSEfTEpQJyaZ2dnZ2evsLS5Tjw8RU5PZ5mZmZmZmWhdXF+ZmZmZmZlnZ2eAl56VaFJFQ0VKZ2dnmZmZmZmZmZmZmZmZmZmZmWJnZ2dnZ2dnZ2dnZ2dnZ2eZtb6+saOVh3x5cVQ/QUxfNEFOXWVrc36Hj5yjpaijeJejtsDFys/V1tfX1tXV1SuaUTpYVlZ5WlxdXDAwMWA+ODg7SpO5xtDOz6TQ0Mq8rspnUVFMS1ZztsbHvq+djU9PUGF2iZior7i+wMHDxsnKP1BmZWA4NCozO1eInrPBxYaGg7+/moJRQDAkIyMkKTNbWldXV2d2dmc4ODg5OnmvxcTExMSxV1hYWFiImZmZilqCipRyj5uHomxkmX19hY2giWeHZmSMg5RnmIGZpYFmDw4LCgoJCAcHBgYFBQQEAwMDAgICAgICAgICAgICAgAPDgsKCQkJCAgIBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwEODg4ODg4ODg0MDAwMDAwMDAwLCwsLCwsLCwoKCgoKAgUICgsNDg8PDw8PDw8ODg0NDAwLCwsKCgoJCQgICAcPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQ8PDw8ODg4ODg4ODg4ODg4ODg0NDAwLCgoJCAgGBQQCAQAAAAUHCQoLCwwMDA0NDQ0ODg4ODg0NDQ0NDAwMDAwMDAwBAQECAgIDAwMDBAQFBAQFBQYHBwgJCQoLCwwNDg4ODg8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgYGBgUFBQUFBAQDAwICAgIBAQEBAAAPDgwLCgkIBwcGBgYGBQUFBQUEBAMDAgICAgEBAQEAAA8ODAsKCQgHBwYGBgYFBQUFBQQEAwMCAgICAQEBAQAADw4MCwoJCAcHBgcGBgYGBQUFBQYHCAgHCAgBAQEBAAA=";
});

/* global requirejs,OfflineAudioContext */
define("SEnv", ["Klass", "assert","promise","Tones.wdt"], function(Klass, assert,_,WDT) {
    function now(){return new Date().getTime();}
    function WDT2Float(w) {return w/128-1;}
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
        MWrtWav2 =121,
        MSetLen=122, //   L cmd
        MLenMark=123, // after realsound/ not used in por
        MIni=124,

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
            return Math.floor(x/y);
            //return Math.trunc(chkn(x,"x") / chkn(y,"y") );
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
        log2=function (len) {
            let c=0;
            // 1->1   2->2    4->3
            while(len>0) {
                len>>=1;
                c++;
            }
            return c-1;
        },
        Integer = Number,
        sinMax_s = 5,
        sinMax = 65536 >> sinMax_s, //2048,
        SPS = 20160*2,
        SPS96 = 20160,
        //SPS_60 = div(44100, 60),
        DU_SEQ="DU_SEQ", DU_TRK="DU_TRK", DU_CTX="DU_CTX",// time delta units
        DivClock = 111860.78125,// See [1]
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
        ],//  From: Tbl5-1 of [1]
        //[1]  http://ngs.no.coocan.jp/doc/wiki.cgi/TechHan?page=1%BE%CF+PSG%A4%C8%B2%BB%C0%BC%BD%D0%CE%CF
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
        cnt=0; //:Integer;// debug
    function defaultBufferTime() {
        if (window.navigator.userAgent.match(/Android/)) {
            return 1/2;
        }
        return 1/30;
    }
    var defs;
    var TEnveloper = Klass.define(defs={ //class (TSoundGenerator)
        $this: true,
        $fields: {
            //BSize: Integer,
            Pos: Integer,
            PrevPos: Integer,
            RPos: Integer,
            WaveDat: Array, // [0..WvC-1,0..WvElC-1] of Byte;
            wdata2: Array,//array[0..wdataSize-1] of SmallInt;

            BeginPlay: Boolean,
            SeqTime: Integer,
            SeqTime120: Integer,

            wavoutContext: Boolean,
            //LFOsync=0:非同期、1:同期、2:ワンショット 3:鋸波形
            Fading: Integer,

            //L2WL: log 2 WaveLength
            PCMW: Array, // [0..PCMWavs-1] of TWavLoader,

            //Delay: Integer,

            Tempo: Integer,
            ComStr: String,
            WFilename: String,

            EnvDat: Array, // [0..Envs-1,0..EnvElC-1] of Byte,

            WriteMaxLen: Integer,
            //soundMode: Array // [0..chs-1] of Boolean,
        },
        load:function (t,d) {
            var ver=readLong(d);
            if (ver>1200) {
                t.useMLen=true;
            }
            console.log("Version ", ver);
            var chs=readByte(d);
            //var chdatas;
            //t.MPoint=chdatas=[];
            for (var i=0;i<chs;i++) {
                var chdata=[];
                //chdatas.push(chdata);
                var len=readLong(d);
                //console.log(len);
                //if(len>999999) throw new Error("LONG");
                for (var j=0;j<len;j++) {
                    chdata.push(readByte(d));
                }
                t.channels[i].MPoint=chdata;
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
        setNoiseWDT: function (t) {
            // Noise
            for (var j=0;j<1024;j++) {
                t.WaveDat[WvC-1][j]=WDT2Float( Math.floor(Math.random() * 78 + 90) );
            }
            t.WaveDat[WvC-1].lambda=32;
        },
        loadWDT: function (t,url) {
            return new Promise(function (succ,fail) {
            try{
                //console.log("LOading wdt...?");
                if (!url) {
                    /*requirejs(["Tones.wdt"],function (u) {
                        t.loadWDT(u).then(succ,fail);
                    });*/
                    url=WDT;
                }
                var oReq = new XMLHttpRequest();
                oReq.open("GET", url, true);
                oReq.responseType = "arraybuffer";
                oReq.onload = function (oEvent) {
                    var arrayBuffer = oReq.response,i,j;
                    if (arrayBuffer) {
                        var b = new Uint8Array(arrayBuffer);
                        //console.log("Loading wdt",b.length);
                        //WaveDat
                        var idx=0;
                        for (i = 0; i < WvC; i++) {
                            for (j=0;j<32;j++) {
                                t.WaveDat[i][j]=WDT2Float( b[idx++] );
                            }
                        }
                        t.setNoiseWDT();
                        //EnvDat
                        for (i=0 ;i<16;i++) {//Envs
                            for (j=0;j<32;j++) {
                                t.EnvDat[i][j]=b[idx++];
                            }
                        }
                        //console.log("Loading wdt done");
                        succ();
                    }
                };
                oReq.send(null);
            } catch(e) {fail(e);}
            });
        },
        /*getPlayPos: function (t) {
            var ti=this.context.currentTime- this. playStartTime;
            var tiSamples=Math.floor(ti*this.sampleRate);
            return tiSamples % wdataSize;
        },*/
        setSound: function(t, ch /*:Integer;*/ , typ /*:Integer;*/ , val /*:Integer*/ ) {
            var chn=t.channels[ch];
            chn.soundMode = True;
            switch (typ) {
                case stFreq:
                    chn.Steps = val;
                    break;
                case stVol:
                    chn.EVol = val;
                    break;
            }
        },
        InitSin: function(t) {
            var i; //:Integer;
            for (i = 0; i < sinMax; i++) {
                sinT[i] = Math.floor(Math.sin(3.1415926 * 2 * i / sinMax) * 127);
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
                m2tInt[i] = Math.floor(DivClock * 65536 / m2t[i] * 65536 / t.sampleRate);
            }
        },
        InitWave: function(t) {
            var i, j;
            t.WaveDat=[];
            for (i = 0; i < WvC; i++) {
                t.WaveDat[i]=[];
                for (j = 0; j < WvElC / 2; j++) {
                    t.WaveDat[i][j] = WDT2Float(103);
                    t.WaveDat[i][j + div(WvElC, 2)] = WDT2Float(153);
                }
            }
        },

        $: function(t,context,options) {
            var i, j; //:Integer;
            options=options||{};
            t.useScriptProcessor=options.useScriptProcessor;
            t.useFast=options.useFast;
            t.resolution=options.resolution||120;
            t.wavOutSpeed=options.wavOutSpeed||10;
            t.context=context;
            t.sampleRate = chkn(t.context.sampleRate,"t.context.sampleRate");
            //t.initNode({});
            //t.WavPlaying=false;
            // inherited Create (Handle);
            //t.Delay = 2000;
            t.Pos = t.PrevPos = t.RPos = /*t.WriteAd =*/ t.SeqTime =
            t.SeqTime120 = 0;
            t.BeginPlay=false;
            t.InitWave();
            t.waveBuffers={};
            t.InitEnv();
            t.InitSin();
            t.ConvM2T();
            t.wdata2=[];
            t.PCMW=[];
            for (i = 0; i < PCMWavs; i++) {
                t.PCMW[i] = nil;
            }
            t.channels=[];
            for (i = 0; i < Chs; i++) {
                t.channels.push({});
            }
            t.resetChannelStates();
            t.Fading = FadeMax;
            //t.timeLag = 2000;

            t.WriteMaxLen = 20000;
            t.wavoutContext = False;
            t.WFilename = '';
            /* {$ifdef ForM2}
            t.WavOutObj=nil;
             {$endif}*/
            t.ComStr = '';
            t.bufferTime=options.bufferTime || defaultBufferTime();
            t.performance={timeForChProc:0, timeForWrtSmpl:0};
            if (options.source) {
                for (i=0;i<Chs;i++) {
                    t.channels[i].MPoint=options.source.chdata[i];
                }
                t.version=options.source.version;
                console.log("Version", t.version);
                if (t.version>1200) {
                    t.useMLen=true;
                }
            }
            if (options.WaveDat) t.WaveDat=options.WaveDat;
            if (options.EnvDat) t.EnvDat=options.EnvDat;

            //t.loadWDT();
        },
        resetChannelStates: function (t) {
            for (var i = 0; i < Chs; i++) {
                var chn=t.channels[i];
                chn.LfoV=0;chn.LfoA=0;chn.LfoC=0;chn.LfoD=0;chn.LfoDC=0;chn.LfoSync=0;
                chn.Slur=chn.Sync=0;
                chn.PorStart=chn.PorEnd=chn.PorLen=0;
                chn.ECount=0;
                chn.MCount=0;
                chn.Resting=0;
                chn.Steps = 0;
                chn.CurWav=0;
                //chn.SccWave = t.WaveDat[chn.CurWav];
                //chn.SccCount = 0;
                chn.CurEnv=0;
                chn.EShape = t.EnvDat[chn.CurEnv];
                chn.EVol = 0;
                chn.EBaseVol = 128;
                chn.MPointC = 0;
                chn.ESpeed = 5;
                chn.PlayState = psStop;
                chn.Detune = 0;
                chn.LfoV = 0;
                t.SelWav(i, 0);
                chn.LfoD = 0;
                chn.LfoDC = 0;
                chn.Oct = 4;
                chn.DefLen = SPS/2;
                chn.soundMode = False;
            }
            t.Tempo = 120;// changed by MML t***
            t.rate = 1; // changed by setRate
        },
        setRate:function(t,r) {
            t.rate=r;
        },
        setVolume: function (t,v) {
            if (t.masterGain) t.masterGain.gain.value=v;
        },
        /*
        getBuffer: function (t) {
            var channel=1;
            if (this.buf) return this.buf;
            this.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);
            return this.buf;
        },*/
        playNode: function (t, options) {
            if (this.isSrcPlaying) return;
            options=options||{};
            t.masterGain=t.context.createGain();
            t.masterGain.connect(options.destination || t.context.destination);
            for (var i=0;i<Chs;i++) {
                var chn=t.channels[i];
                chn.gainNode=t.context.createGain();
                chn.gainNode.connect(t.masterGain);
            }
            if (typeof options.volume==="number") t.setVolume(options.volume);
            this.isSrcPlaying = true;
        },
        startRefreshLoop: function (t) {
            if (t.refreshTimer!=null) return;
            t.refreshPSG();
            t.refreshTimer=t.Mezonet.setInterval(t.refreshPSG.bind(t),5);
            /*var grid=t.resolution;
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
            t.refreshTimer=setInterval(refresh,16);*/
        },
        stopRefreshLoop: function (t) {
            if (t.refreshTimer==null) return;
            t.Mezonet.clearInterval(t.refreshTimer);
            delete t.refreshTimer;
        },
        stopNode : function (t) {
            if (!this.isSrcPlaying) return;
            //this.bufSrc.stop();
            for (var i=0;i<Chs;i++) {
                var chn=t.channels[i];
                if (chn.gainNode) chn.gainNode.disconnect();
            }
            t.masterGain.disconnect();
            this.isSrcPlaying = false;
        },
        getWaveBuffer: function (t,n) {
            if (t.waveBuffers[n]) return t.waveBuffers[n];
            var dat=t.WaveDat[n];
            if (!dat) return;
            var mult= 8-log2(dat.length);
            if (mult<0) mult=0;
            var buflen=dat.length << mult ;
            var res=t.context.createBuffer(1,buflen, t.sampleRate);
            var chd=res.getChannelData(0);
            for (var i=0;i<buflen;i++) {
                chd[i]=dat[i >> mult];
            }
            t.waveBuffers[n]=res;
            if (dat.lambda) res.lambda=dat.lambda << mult;
            return res;
        },
        setWaveDat(t, n, wd) {
            t.WaveDat[n]=wd;
            delete t.waveBuffers[n];
        },
        Play1Sound: function(t, c, n, iss, noteOnInCtx,noteOffInCtx,por) {
            // ESpeed == psX
            // ESpeed / 65536*SPS
            if (t.wavoutContext) return;
            var TP; //:Integer;
            var chn=t.channels[c];
            //if (chn.soundMode) return; // ) return;
            if (n == MRest) {
                chn.Resting = True;
                return;
            }
            if ((c < 0) || (c >= Chs) || (n < 0) || (n > 95)) return; // ) return;
            chn.Resting = False;
            var buf=t.getWaveBuffer(chn.CurWav);
            if (!buf) return;
            var buflen=buf.getChannelData(0).length;
            var lambda=buf.lambda||buflen;
            var steps=m2tInt[n] + chn.Detune * div(m2tInt[n], 2048);
            var SccCount_MAX=0x100000000;
            var source=chn.sourceNode;
            //console.log(buflen, lambda);
            if (!iss|| !source) {
                source=t.context.createBufferSource();
                source.buffer=buf;
                source.loop=true;
                source.start = source.start || source.noteOn;
                source.stop = source.stop || source.noteOff;
                source.playbackRate.value=(steps/SccCount_MAX)*lambda;
                source.connect(chn.gainNode);
                source.start(noteOnInCtx);
                source.stop(noteOffInCtx);
                chn.sourceNode=source;
            }
            //console.log(source.playbackRate.value, noteOnInCtx, noteOffInCtx);
            //source.playbackRate.value=freq*lambda/sampleRate;  in test.html
            //                         =freq/sampleRate*lambda
            //                         =steps/SccCount_MAX*lambda
            //  steps*sampleRate= SccCount_MAX*freq
            //  steps/SccCount_MAX= freq/sampleRate
            //   ^v^v^v^.....v^
            //    x100          in sampleRate
            if (!iss || !chn.envelopeState) {
                chn.envelopeState={
                    lengthInCtx:1/ (chn.ESpeed / 65536*SPS/2) ,
                    Shape:t.EnvDat[chn.CurEnv],
                    //console.log(env.length);
                    setTimeInCtx:noteOnInCtx,
                    idx:0
                };
            }
            var es=chn.envelopeState;
            for (;es.idx<es.Shape.length;es.idx++) {
                var i=es.idx;
                //if (i==0) console.log(env[i]/128, noteOnInCtx+i/env.length*envLenInCtx);
                if (es.setTimeInCtx>=noteOffInCtx) break;
                var value=es.Shape[i]/16*chn.EVol/128*chn.EBaseVol/128;
                if (value>=0 && value<=1 ) {
                    chn.gainNode.gain.setValueAtTime(value, es.setTimeInCtx);
                } else {
                    console.error(es, value, chn.EVol, chn.EBaseVol);//chn.EVol/128*chn.EBaseVol/128);
                }
                es.setTimeInCtx+=es.lengthInCtx/es.Shape.length;
            }
            var pitch=1/60;
            if (por) {
                var PorEnd=m2tInt[por]+chn.Detune*div(m2tInt[por] , 2048);
                var rateEnd=(PorEnd/SccCount_MAX)*lambda;
                var rateStart=source.playbackRate.value;
                for (var porTime=noteOnInCtx+pitch;porTime<noteOffInCtx;porTime+=pitch) {
                    var tt=(porTime-noteOnInCtx)/(noteOffInCtx-noteOnInCtx);
                    //console.log(rateStart,rateEnd, tt, rateStart*(1-tt)+rateEnd*tt, porTime);
                    source.playbackRate.setValueAtTime(
                        rateStart*(1-tt)+rateEnd*tt ,porTime);
                }
            } else if (!iss && chn.LfoV != 0) {
                var lfoTime=noteOnInCtx+chn.LfoD/t.Tempo;
                //console.log(lfoTime, chn.LfoA, chn.LfoV);
                var LfoC=0;
                var base=source.playbackRate.value;
                for (;lfoTime<noteOffInCtx;lfoTime+=pitch) {
                    /*console.log(LfoC,chn.LfoV,chn.LfoA,
                    1 + sinT[LfoC >>> (16 + sinMax_s)]/512*chn.LfoA/256);*/
                    source.playbackRate.setValueAtTime(
                        base*(1 + sinT[LfoC >>> (16 + sinMax_s)]/512*chn.LfoA/256),
                        lfoTime);
                    /*Steps += (sinT[chn.LfoC >>> (16 + sinMax_s)] *
                            (Steps >> 9 ) * chn.LfoA)  >> 8;*/
                    LfoC += chn.LfoV/2*pitch*SPS;
                }
            }

            /*
            if (!iss) {
                chn.ECount = 0;
                if (chn.Sync) chn.SccCount = 0;
                if (chn.LfoSync != LASync) chn.LfoC = 0;
            }
            if (chn.CurWav < WvC) {
                chn.Steps = m2tInt[n] + chn.Detune * div(m2tInt[n], 2048);
                if (chn.CurWav===WvC-1) {// Noise
                    chn.Steps >>>= 5;//  32->1024
                }
                // m2tInt*(1+Detune/xx)    (1+256/xx )^12 =2  1+256/xx=1.05946
                //    256/xx=0.05946   xx=256/0.05946  = 4096?
            } else {
                if (chn.L2WL >= 2) {
                    //Steps[c]:=($40000000 shr (L2WL[c]-2)) div (m2tInt[36] div 65536) * (m2tInt[n] div 65536);
                    chn.Steps = div(0x40000000 >>> (chn.L2WL - 2), div(m2tInt[36], 65536)) * div(m2tInt[n], 65536);
                }
            }
            chn.PorLen = -1;*/
        },
        //    procedure TEnveloper.Play1Por (c,f,t:Word;iss:Boolean);
        Play1Por: function (t,c,from,to,iss) {
            if (t.wavoutContext) return;
             var TP=0;
             var chn=t.channels[c];
             if ((c<0)  ||  (c>=Chs)  ||  (to<0)  ||  (to>95) ||
                (from<0)  ||  (from>95) ) return;
             chn.Resting=False;

             //TP=m2t[f];
             chn.PorStart=m2tInt[from]+chn.Detune*div(m2tInt[from] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             //TP=m2t[to];
             chn.PorEnd=m2tInt[to]+chn.Detune*div(m2tInt[to] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             // Noise
             if (chn.CurWav===WvC-1) {
                 chn.PorStart >>>= 5;//  32->1024
                 chn.PorEnd >>>= 5;//  32->1024
             }
             if  (!iss) chn.ECount=0;

        },
        StopMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return; // ) return;
            //MPoint[c]=nil;
            t.WaitMML(c);
            t.channels[c].PlayState = psStop;
            t.channels[c].MCount = t.SeqTime + 1;
        },
        allWaiting: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.channels[i].PlayState == psPlay) {
                    return false;
                }
            }
            return true;
        },
        handleAllState: function (t) {
            var allWait=true,allStop=true,i,endCtxTime=0;
            for(i=0;i<Chs;i++) {
                var c=t.channels[i];
                switch (c.PlayState) {
                case psPlay:
                    allWait=false;
                    allStop=false;
                    break;
                case psWait:
                    allStop=false;
                    break;
                case psStop:
                    if (typeof c.endCtxTime==="number") {
                        if (c.endCtxTime>endCtxTime) {
                            endCtxTime=c.endCtxTime;
                        }
                    }
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
                for(i=0;i<Chs;i++) {
                    t.RestartMML(i);
                }
            }
            return allStop ? {endCtxTime} : false;
        },
        allStopped: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.channels[i].PlayState != psStop) {
                    return false;
                }
            }
            return true;
        },
        RestartMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return;
            var chn=t.channels[c];
            if (chn.PlayState == psWait) {
                chn.PlayState = psPlay;
                chn.MCount = t.SeqTime + 1;
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
            var chn=t.channels[c];
            chn.PlayState = psWait;
            chn.MCount = t.SeqTime + 1;
        },
        //procedure TEnveloper.Start;
        Start: function(t, options) {
            t.Stop();
            t.Rewind();
            t.BeginPlay = True;
            t.playNode(options);
            t.playStartTime=t.context.currentTime;
            t.contextTime=t.playStartTime;
            t.startRefreshLoop();
        },
        start: function (t) {return t.Start();},
        Rewind: function (t) {
            var ch; //:Integer;
            t.resetChannelStates();
            t.SeqTime=0;
            t.trackTime=0;
            for (ch = 0; ch < Chs; ch++) {
                var chn=t.channels[ch];
                //chn.soundMode = False;
                //chn.MPointC = 0;
                chn.PlayState = psPlay;
                //chn.MCount = t.SeqTime;
            }
        },
        Stop: function (t) {
            if (!t.BeginPlay) return;
            t.stopNode();
            t.stopRefreshLoop();
            t.BeginPlay=false;
            //console.log("STOP");
        },
        stop: function (t) {return t.Stop();},
        resetWavOut: function (t) {
            t.wavoutContext=false;
        },
        measureLength: function (t) {
            var wctx={channels:[]};
            t.wavoutContext=wctx;
            for (var i=0;i<Chs;i++) {
                wctx.channels.push({PC2CtxTime:[], endCtxTime:-1, loopLengthInCtx:0} );
            }
            t.Rewind();
            t.contextTime=0;
            while(true) {
                t.procChannels(1/60);
                if (t.allStopped()) {
                    break;
                }
            }
            var endTime=0,loopLength=0;
            for (i=0;i<Chs;i++) {
                var wc=wctx.channels[i];
                if (wc.endCtxTime>endTime) endTime=wc.endCtxTime;
                if (wc.loopLengthInCtx>loopLength) loopLength=wc.loopLengthInCtx;
            }
            delete t.wavoutContext;
            //console.log(wctx);
            return {endTime:endTime, loopLength:loopLength};
        },
        wavOut: function (t,options) {
            var l=t.measureLength();
            console.log(l);
            var onLine=t.context;
            t.context=new OfflineAudioContext(1,Math.floor(SPS*l.endTime),SPS);
            t.Rewind();
            t.playNode(options);
            t.contextTime=0;
            while(true) {
                t.procChannels(1/60);
                if (t.contextTime>=l.endTime) {
                    break;
                }
            }
            console.log(t.context);
            return t.context.startRendering().then(function(renderedBuffer) {
                return {decodedData:renderedBuffer, endTime:l.endTime,  loopLength: l.loopLength};
            });
        },
        convertDeltaTime: function(t,delta, inputUnit, outputUnit) {
            // SeqTime     楽譜上の位置． 1/2小節 = SPS
            // trackTime   rate=1 で演奏したときの演奏開始からの経過時間
            //                      SeqTime*(120/t)/SPS
            //              t=60 のとき，SeqTime*2/SPS
            //              t=120 のとき，SeqTime/SPS
            //              t=240 のとき，SeqTime/2/SPS
            // contextTime     演奏開始時刻+trackTime/rate (rateが一定の場合)
            //              rate=1 のとき ， 演奏開始時刻+trackTime
            //              rate=2 のとき ， 演奏開始時刻+trackTime/2
            //dSeq    = dTrack*SPS*(Tempo/120)
            //dTrack  = dSeq*(120/Tempo)/SPS
            //dCtx    = dTrack/rate = dSeq*(120/Tempo)/SPS/rate
            if (inputUnit===outputUnit) return delta;
            switch(inputUnit+2+outputUnit) {
                case DU_SEQ+2+DU_TRK:
                return delta*(120/t.Tempo)/SPS;
                case DU_SEQ+2+DU_CTX:
                return delta*(120/t.Tempo)/SPS/t.rate;
                case DU_TRK+2+DU_CTX:
                return delta/t.rate;
                case DU_TRK+2+DU_SEQ:
                return delta*SPS*(t.Tempo/120);
                case DU_CTX+2+DU_SEQ:
                return delta*(t.Tempo/120)*SPS*t.rate;
                case DU_CTX+2+DU_TRK:
                return delta*t.rate;
                default:
                new Error("Invalid unit conversion:"+(inputUnit+2+outputUnit));
            }
        },
        /*toAudioBuffer: function (t) {
            return t.wavOut().then(function (arysrc) {
                var buffer = t.context.createBuffer(1, arysrc.length, t.sampleRate);
                var ary = buffer.getChannelData(0);
                for (var i = 0; i < ary.length; i++) {
                     ary[i] = arysrc[i];
                }
                var res={decodedData: buffer};
                if (t.loopStartFrac) res.loopStart=t.loopStartFrac[0]/t.loopStartFrac[1];
                return res;
            });
        },*/
        SelWav: function(t, ch, n) {
            var chn=t.channels[ch];
            chn.CurWav = n;
            /*if (n < WvC) {
                chn.SccWave = t.WaveDat[n];
                //chn.WL = chn.SccWave.length;// 5;
                // Noise
                //if (n===WvC-1) chn.L2WL=10;
                chn.Sync = False;
            } else {
                if (t.PCMW[n - WvC] != nil) {
                    chn.SccWave = t.PCMW[n - WvC].Start;
                    //chn.WL = t.PCMW[n - WvC].Len;
                    chn.Sync = True;
                }
            }*/
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
        refreshPSG: function(t) {
            var lengthInCtx= t.context.currentTime+t.bufferTime-t.contextTime;
            //console.log(lengthInCtx);
            if (lengthInCtx>0) t.procChannels(lengthInCtx);
            //t.writeSamples(data,WriteAd,length);
        },
        pause: function (t) {
            if (t.isPaused) return;
            t.isPaused=true;
            t.stopRefreshLoop();
        },
        resume: function (t) {
            if (!t.isPaused) return;
            t.isPaused=false;
            t.contextTime=t.context.currentTime;
            t.startRefreshLoop();
        },
        procChannels: function(t,lengthInCtx) {
            var i, ch, wdtmp,LParam, HParam, WParam, JmpSafe;
            cnt++;
            //var tempoK=SPS / t.sampleRate ;
            var startTime=new Date().getTime();
            /*if (t.allStopped()) {
                return;
            }*/
            var SeqTime=t.SeqTime,lpchk=0,chn;
            var nextSeqTime=SeqTime+t.convertDeltaTime(lengthInCtx, DU_CTX, DU_SEQ);
            var chPT=now();
            var wctx=t.wavoutContext;
            for (ch = 0; ch < Chs; ch++) {
                chn=t.channels[ch];
                if (chn.MPoint[chn.MPointC] == nil) t.StopMML(ch);
                if (chn.PlayState != psPlay) continue;


                JmpSafe = 0;
                while (chn.MCount <= nextSeqTime) {
                    if (chn.PlayState != psPlay) break;
                    var pc = chn.MPointC;
                    var curCtxTime=t.contextTime+
                        t.convertDeltaTime(chn.MCount-SeqTime, DU_SEQ, DU_CTX);
                    if (wctx) wctx.channels[ch].PC2CtxTime[pc]=curCtxTime;
                    LParam = chn.MPoint[pc + 1];
                    HParam = chn.MPoint[pc + 2];
                    var code = chn.MPoint[pc], lenInSeq,noteOnInCtx,noteOffInCtx;
                    //console.log(ch  , code);
                    if (code >= 0 && code < 96 || code === MRest) {
                        noteOnInCtx=curCtxTime;
                        let {lenInSeq, increment}=t.parseLen(chn, pc);
                        //console.log(lenInSeq, SPS96/lenInSeq, increment);
                        var slen=t.foresightSlurs(chn, pc+increment);
                        noteOffInCtx=noteOnInCtx+
                            t.convertDeltaTime(lenInSeq+slen, DU_SEQ,DU_CTX) ;
                        //if (slen>0) console.log("SL",slen);
                        t.Play1Sound(ch, code, chn.Slur, noteOnInCtx, noteOffInCtx);
                        if (!chn.Slur) chn.LfoDC = chn.LfoD;
                        chn.Slur = False;
                        chn.MCount +=lenInSeq ;
                        // SPS=22050の場合 *2 を *1 に。
                        // SPS=x の場合   * (x/22050)
                        chn.MPointC += increment;
                    } else switch (code) {
                        case MPor:
                            noteOnInCtx=curCtxTime;
                            lenInSeq=(chn.MPoint[pc + 3]+chn.MPoint[pc + 4]*256) * 2;
                            noteOffInCtx=noteOnInCtx+
                                t.convertDeltaTime(lenInSeq, DU_SEQ,DU_CTX) ;
                            //if (slen>0) console.log("SL",slen);
                            //console.log(ch, LParam, chn.Slur, noteOnInCtx, noteOffInCtx,HParam);
                            t.Play1Sound(ch, LParam, chn.Slur, noteOnInCtx, noteOffInCtx,HParam);
                            chn.MCount +=lenInSeq ;
                            /* t.Play1Por (ch,
                               LParam,
                               HParam,
                               chn.Slur
                            );*/
                            chn.Slur=False;
                            /* chn.MCount+=
                            ( chn.MPoint[pc + 3]+chn.MPoint[pc + 4]*256 )*2;
                            // SPS=22050の場合 *2 を *1 に。
                            chn.PorLen=chn.MCount-SeqTime;*/
                            chn.MPointC+=5;
                            break;
                        case MTempo:
                            t.Tempo = LParam + HParam * 256;
                            chn.MPointC += 3;
                            break;
                        case MVol:
                            chn.EVol = LParam;
                            chn.MPointC += 2;
                            break;
                        case MBaseVol:
                            chn.EBaseVol = LParam;
                            chn.MPointC += 2;
                            break;
                        case Mps:
                            chn.ESpeed = LParam;
                            chn.MPointC += 2;
                            break;
                        case MSelWav:
                            t.SelWav(ch, LParam);
                            chn.MPointC += 2;
                            break;
                        case MWrtWav:{
                            chn.MPointC += 34; // MWrtWav wavno data*32
                            const wd=[];
                            for (i = 0; i < 32; i++) {
                                wd.push(WDT2Float( chn.MPoint[pc + 2 + i] ));
                            }
                            t.setWaveDat(LParam, wd);
                            break;
                        }
                        case MWrtWav2:{
                            const lambda=HParam+chn.MPoint[pc+3]*256;
                            const mul=chn.MPoint[pc + 4];
                            const len=lambda*mul;
                            const wd=[];
                            for (i = 0; i < len; i++) {
                                wd.push(WDT2Float(chn.MPoint[pc+5+i]));
                            }
                            wd.lambda=lambda;
                            t.setWaveDat(LParam, wd);//t.WaveDat[LParam]=wd;
                            chn.MPointC += len+5; // MWrtWav2 wavno lenL lenH l data*len
                            break;
                        }
                        case MSelEnv:
                            chn.EShape = t.EnvDat[LParam];
                            chn.CurEnv=LParam;
                            chn.MPointC += 2;
                            break;
                        case MWrtEnv:
                            // MWrtEnv envno data*32
                            chn.MPointC += 34;
                            for (i = 0; i < 32; i++) {
                                wdtmp = chn.MPoint[pc + 2 + i];
                                if (wdtmp > 15) wdtmp = 15;
                                t.EnvDat[LParam][i] = wdtmp;
                            }
                            break;
                        case MJmp:
                            if (wctx) {
                                var wc=wctx.channels[ch];
                                var dstLabelPos=chn.MPointC + array2Int(chn.MPoint, pc+1);
                                var dstCtxTime=wc.PC2CtxTime[dstLabelPos];
                                //console.log("@jump", "ofs=",dstCtxTime,curCtxTime );
                                if (typeof dstCtxTime=="number" && dstCtxTime<curCtxTime) {
                                    wc.endCtxTime=curCtxTime;
                                    wc.loopLengthInCtx=(curCtxTime-dstCtxTime);
                                    t.StopMML(ch);
                                }
                                chn.MPointC += 5;
                            } else {
                                chn.MPointC += array2Int(chn.MPoint, pc+1);
                            }
                            JmpSafe++;
                            if (JmpSafe > 1) {
                                console.log("Jumpsafe!");
                                t.StopMML(ch);
                                chn.MCount = SeqTime + 1;
                            }
                            break;
                        case MLabel:
                            /*if (wctx && ch==0) {
                                wctx.label2Time[LParam]=[wctx.writtenSamples,t.sampleRate];
                                console.log("@label", LParam , chn.MPointC , wctx.writtenSamples+"/"+t.sampleRate );
                            }*/
                            chn.MPointC+=2;
                            break;
                        case MSlur:
                            chn.Slur = True;
                            chn.MPointC += 1;
                            break;
                        case MWait:
                            t.WaitMML(ch);
                            chn.MPointC += 1;
                            break;
                        case MCom:
                            t.ComStr = StrPas(chn.MPoint, pc + 1);
                            chn.MPointC += t.ComStr.length + 2; // opcode str \0
                            break;
                        case MWOut:
                            t.WFilename = StrPas(chn.MPoint, pc + 1);
                            chn.MPointC += t.WFilename.length + 2; // opcode str \0
                            break;
                        case MWEnd:
                            chn.MPointC += 1;
                            break;
                        case MDet:
                            chn.Detune = ShortInt(LParam);
                            chn.MPointC += 2;
                            break;
                        case MLfo:
                            chn.LfoSync = (LParam);
                            chn.LfoV = (HParam) * 65536;
                            chn.LfoA = (chn.MPoint[pc + 3]);
                            chn.LfoD = 0;
                            chn.MPointC += 4;
                            break;
                        case MLfoD:
                            chn.LfoD = LParam;// * t.sampleRate;
                            chn.MPointC += 2;
                            break;
                        case MSync:
                            chn.Sync = (LParam == 1);
                            chn.MPointC += 2;
                            break;
                        case MPCMReg:
                            var fn=StrPas(chn.MPoint, pc+1);
                            t.RegPCM (fn,chn.MPoint[pc+1+fn.length+1]);
                            chn.MPointC+=fn.length +3;
                            break;
                        case MSetLen:
                            chn.DefLen=(LParam + HParam * 256) * 2;
                            chn.MPointC+=3;                            
                            break;
                        case MIni:
                            //100, 120, 101, 5, 110, 0, 102, 0, 
                            //107, 0, 115, 0, 0, 0, 118, 0, 116, 0
                            chn.EVol=120;
                            chn.ESpeed=5;
                            chn.Detune=0;
                            t.SelWav(ch, 0);
                            chn.EShape = t.EnvDat[0];
                            chn.CurEnv=0;
                            chn.LfoSync = (0);
                            chn.LfoV = (0) * 65536;
                            chn.LfoA = (0);
                            chn.LfoD = 0;
                            chn.Sync = false;
                            chn.MPointC++;
                            break;
                        case Mend:
                            if (wctx) {
                                wctx.channels[ch].endCtxTime=curCtxTime;
                            }
                            chn.endCtxTime=curCtxTime;
                            t.StopMML(ch); //MPoint[ch]=nil;
                            break;
                        default:
                            t.StopMML(ch);
                            throw new Error("Invalid opcode" + code);
                            //chn.MPointC += 1;
                    }
                }
                // End Of MMLProc
            }
            const stopTiming=t.handleAllState();
            if (stopTiming) {
                if (t.context.currentTime>stopTiming.endCtxTime) t.Stop();
                //else console.log(t.context.currentTime,stopTiming);
            }
            t.SeqTime= nextSeqTime;// Math.floor( t.Tempo * (length/120) * tempoK*t.rate );
            t.trackTime += t.convertDeltaTime(lengthInCtx  , DU_CTX, DU_TRK);// length/t.sampleRate*t.rate;
            t.contextTime+= lengthInCtx;
            /*if (wctx) {
                wctx.writtenSamples+=length;
                wctx.trackTime=t.trackTime;
            }*/
            t.performance.timeForChProc+=now()-chPT;
        },
        parseLen(t,chn,pc) {
            //  0-95 <len>    
            //  ^pc
            // <len> := MLenMark <len16> | empty
            let LParam=chn.MPoint[pc+1];
            let HParam=chn.MPoint[pc+2];
            let lenInSeq, increment=3;
            if (t.useMLen) {
                if (LParam===MLenMark) {
                    lenInSeq=(HParam+chn.MPoint[pc + 3]*256) * 2;
                    increment=4;
                } else {
                    lenInSeq=chn.DefLen;
                    increment=1;
                }
            } else {
                lenInSeq=(LParam + HParam * 256) * 2;
            }
            return {lenInSeq, increment};
        },
        foresightSlurs:function (t,chn, pc) {
            // 0-95 <len> MSlur  0-95 <len>  MSlur  ...
            //            ^pc
            var res=0; // sum of <len>
            var LParam,HParam,lenInSeq;
            while(true) {
                if (chn.MPoint[pc]!==MSlur) break;
                pc++;
                var code = chn.MPoint[pc];
                if (!(code >= 0 && code < 96)) break;
                let {lenInSeq,increment}=t.parseLen(chn, pc);
                res+=lenInSeq;
                pc+=increment;
            }
            return res;
        },
        getTrackTime: function (t) {return t.trackTime;},
        /*writeSamples: function (t,data,WriteAd,length) {
            var i, ch, v=0, Tmporc=0,chn,ad;
            var WrtEnd=WriteAd+length;
            for (ad=WriteAd; ad<WrtEnd; ad++) {
                data[ad]=0;
            }
            if (t.allStopped()) {
                return;
            }
            var wrtsT=now();
            for (ch = 0; ch < Chs; ch++) {
                chn=t.channels[ch];
                if (chn.PlayState != psPlay) continue;

                if (chn.PorLen > 0) {
                    Tmporc = chn.MCount - t.SeqTime;
                    chn.Steps = (
                        div(chn.PorStart, chn.PorLen) * Tmporc +
                        div(chn.PorEnd, chn.PorLen * (chn.PorLen - Tmporc))
                    );
                }
                if ((chn.soundMode))
                    v = chn.EVol;
                else if ((chn.Resting))
                    v = 0;
                else
                    v = chn.EShape[chn.ECount >>> 11] * chn.EVol * chn.EBaseVol; // 16bit
                if (t.Fading < FadeMax) {
                    v = v * div(t.Fading, FadeMax); // 16bit
                }
                //vv[ch]=v;
                if (chn.ECount + chn.ESpeed*(length/2) < 65536 ) chn.ECount += chn.ESpeed*(length/2);

                //v=vv[ch]/ 0x80000;
                v/=0x80000;
                if (v<=0) continue;
                var SccCount=chn.SccCount,Steps=chn.Steps,SccWave=chn.SccWave,sh=(32-chn.L2WL);
                // Proc LFO here!
                if (chn.LfoV != 0) {
                    if (chn.LfoDC > 0) {
                        chn.LfoDC -= t.Tempo*length;
                    } else {
                        Steps += (sinT[chn.LfoC >>> (16 + sinMax_s)] *
                                (Steps >> 9 ) * chn.LfoA)  >> 8;
                        chn.LfoC += chn.LfoV/2*length;
                    }
                }
                // Sync(for PCM playback) is separeted?
                for (ad=WriteAd; ad<WrtEnd; ad++) {
                    data[ad] += v*SccWave[SccCount >>> sh];
                    SccCount += Steps;
                }
                chn.SccCount=SccCount >>> 0;
            }// of ch loop
            t.setNoiseWDT();// Longer?
            t.performance.timeForWrtSmpl+=now()-wrtsT;
            //t.performance.elapsedTime+=new Date().getTime()-startTime;
            //t.performance.writtenSamples+=length;
            //t.performance.writeRate=t.performance.writtenSamples/(t.performance.elapsedTime/1000*t.sampleRate);
            //--------------|---------------------------
            //             playpos  LS            LE
            //                       +-------------+

        }// of writeToArray*/
    }); // of Klass.define
    /*var undefs={};
    function replf(_,name) {
        //console.log(name);
        if (!defs.$fields[name]) {
            if (undefs[name]==null) undefs[name]=1;
            //console.error("Undefined ",name);
        }
    }
    for(var k in defs) {
        var fldreg=/\bt\s*\.\s*([a-zA-Z0-9]+)\b/g;
        if (typeof defs[k]==="function") {
            var src=defs[k]+"";
            var r=src.replace(fldreg, replf);
            undefs[k]=0;
        }
    }
    console.log(undefs);*/
    return TEnveloper;
}); // of requirejs.define
;
define('Tones2',[],function () {
    return (function dec(e) { var z=/^[0-9]+/; var pm=/^[0-9]+|([A-Za-z])([#$%&]?)/; var t,i,r=[],s; var A=function(s){return s.charCodeAt(0);}; while(e.length) { t=pm.exec(e); if (t[1]) { s=A(t[1])>=96?-1:1; r.push(s* ( A(t[1])-(80-16*s)+(t[2]?(A(t[2])-34)*26:0) )); } else for(i=t[0]-0;i>=0;i--)r.push(0); e=e.substring(t[0].length); } var rr=new Uint8Array(r.length+1); rr[0]=80; for (i=1;i<rr.length;i++) rr[i]=rr[i-1]+r[i-1]; return rr; })("14A&14d%3L$eeh%cH0kKV#D#I0jEke%IG#U#aBaa&SO#Zyh#qjJVFha#hMMKOHQOQHOQGMha#hFVJjqh#Ne$0rkiaaBHA0DDQYX#SCenqj#zllEYYRMMq$gkhhfge1BDGHMJLOOKNHC0abgellkfTh$iFJKBFDewkiaKA#WTM#Gbisc2A0egbj$bBc10AW#W#WIDdsc#c#v#a0a1ahCb0a4o&0c1BAa0Aj%y#A3o&0B0Q&h#N#B#A0a3B2bG#K#P#aAAa#c#zb#xub#1B0F#B3A1a6AJ&1aA0aCp&0A2m%1I#G$Q%ja%ebdm1b0gd0b0aBl6AU#0A10A9a1A&b1a%0lh#aCLF#G#B#Iiloc#wieCNXTA#Rfhj2leMkiua#j#kbJLXRH#SKSblf$e#bRUF#C#Ldccafgco$GlF$uqljnhB$C#Ls#iEA$m$BdWK0pqkliQB$QJ$F%A#PNILJJFGIFECIBCBDA0A0E0EBa0ABo%Qn#iUi#iZ%Cc#h$cIG$0B#IA1etv#zkAD#DJ#Bt#Ed3WYBbpwfzbY0E$Ubzg#sAKQA#PHect0x#2f#nf0b1BBDCQ#X#4V#0b0a0abdla&iaTQH0hh0FTC#LJA0lcAKRJAekphjiswv#LPJKFKJHJQKKJPHUvzslpmopokhkgdiB#EEHBFAEAEFDDCDADFDDGDDEBBCHCEEGEgjgibigdg0dfeaeecdgcbC&0j&ccefhcbP#2AQ%0a1D1A0a1r%aC7d0Dn0a0bcCb1BI&1a0a3Al&0D1BAdACH&1aaae0dbedcfgfcedjdeidfhiipfnw%zFhoU&K&IAs#0R#b%bS$Mn#M$gHzE$BFK&O#E$fg%J%n%C$G#M#K&BA1B0bbAFEFLKIFKEHJGIJHDEA1BN%cHA$Hedun#cbCNYYXXXWVNe&L$lLN#Ank#b#i#r#T#fpi#NcO#E$THgFcd#maHOHafehfd1abbdUx#0AB#0r#CO#0t#AI$WO0ji#u$0GZR#0b$AC$XS0bkzBa0w#3A%Bo&B0dl&F0bac0R&B0D%6i&J$C#M#Noe#IRUAccbhch0bgeelksrykHUgyp#e#VGAdb#G#e#YE0foVxPFAfoVxPG0gnVb#RFC&2M$BCs#gdKTI0hd#gCOKOGcddac0E2h%bDBDIDJNKC9aDGLSLLEB0ag%3c1a2A0a0AAaOQ$Bb%j$vAIM$BA0aU%1aAfhne#yuixlCdLNNSVWD#GF0l&e0IGW%h%a2CB4bb1AV%0V$B0F%4ad1uh#rMK#p#hHR#r#gLNMMA#UWZE#Mjn#K#Ijq#T#Ilz#q#wg0GA0X#0ut$BHACMFXMMEE8fgk#1Ra0A0mwibaKR#J#M0EfvPIXml#eF#Kjdcn%wjcK#I$G#QQCdcbednjrxg#a#ikBb0MD#J#Semz2lldRoiQMPQOKPLsxkG$ge#7K#e&agCBY%A#LAaso$vdIYUD#THbzj#hgAJGKFGg$0aDM$bp$c0A1C1EL$ef$d%aa3C0a0aZ$b$U&AA1a3W&cb1Au&0A0a0u&c0bE0A1E%E#WSgc#rutoAYB#Jkb#c#b#kJB#YAoturc#gSWE#Smof#kcgAKS#C0BA0AC$C#HBewirA0CBAa0hm#1d#qflALE#OA2aCG$MG0ahohckggcdbe2shaEDDGFCIKQH#QFC0kto$mhmAE%2yGHQA#UKjg#f$F$F#Lhvf#i$f#vhLF#O$o$g#jKUA#QHGU#PF0jzt$W$VG0bod$vqi1I#Mmf#a3AMUZQ&SB&u&NM%b&AM0mHjF0k$G$z#P$j#PmG#P%n&A#0c#CB#FL$iVT%z$A$qJBp$P$p$P$bjg%oJ%vB&u&U#j$R#qcBQL$n&U$0E$c&14X#14x#14X#14x#14X#14Ebha#bKPCqd#pfA0AUT$X0fmifcdja#t1ISz14X#14x#14X#14x#2GnaCII#V#Bgqvkcdbaa0AljrAP$Ef1x#14X#14x#14X#14x#14X#14x#2fgM#Pkq#cMWD#MBjr#bkeA#F#MEjume0DKk#14X#14l#Be$bAD2FBCEHJIIKKDMFJFFFC0as$0dM#u$wfcfdD1CB0AEHf0COU$O#OEDuy#I#QPgqc%14Q#A#TOdkxb#m#A5I#gb#hICN0KZ#d#p#jcBB2DJ#B#1s#pH0P#CDoX0u$d#ma1ADKGIQI#A#JFBbg#b#r#gZ$G#az%fI$J#Nf&CbE#1a1d#B3Q#B%0AA0d#Ba1FUE1dl%0B0T%BAA1bbq%cC0b1R$0c0k&b0BT#aB0aF$1p$2ac0GN%0bAx%1BW%Cc1W&afBda1yLC#x$tUZUVB#VK#H#WLKIDE4ckeor#P&a#FPaCi#G#LdQhSJbin#kFGUq#0F$zp0paCEBB#MBR$HPpA#gA#sM#wDk#Pk#pJk#Os#Ub$C$nS#mG#F#kU#e#Qe#j%BBGP#P#O#a#a#i#q#bb1ZMYXOQLJimlxxruhgl1AP&1Bb0r&0b0A0W&1b1a0A1Bc2o&XRIBgomxARI#U#XNLBb2AA3cux#w#xZ#QC#A#Iajb#l#wf#ldCLUYZRQKKEA0cnnstmfy#E$1H#RAhxv#uiFL#PaAY$ba0A2aw$Bacd$0TG#J#W#Ua#n#g#yrvsYKVYZSNUSuvtxpvpqkgdO$0Aa$1bBX#0CaT#4G$0Bb3ac$A1x#W#h$s#b2Acb0SO#WUKAMKEbjzbL#bac#cK#bpm$14X#OVIBjnuhpgx$hWN%by#3T$ADEc&r0IIAXX#4w#kaCF$4x#1YWGis#vmbBEC#1X#14c$E13X#B#I0mnnnkchc#uBKSq#MMOHFHKIHMGBCeq#E#LSJEEEFAA0aa1H%G&u$wD#b0I#e#BAar#0AU#h#f0COU$L#MJbAq#R#0fnnB#u%v0eaKC#O$PAiorpj$0AQUSOPGIFBABCCAM&QVaen#djIHB#W#VUNDk$0cH$0k#xw#qpla0AEJN#ac1PO0ou#1AAK$B$Va2sl%A2V#Q1ov#N#HJh#C#LtA#b$hA$b#0HHSwh#F#g#bN#iQs#W#wXLj#a#i%aca0aaa0a0a0a0a1a11bOacaa1a1a20fM6aa7a6a3hCCBABAA5a0a0a0a1a1a0a1aHabaaaaa0a2a3a0a0a2a1N2a12a0a0aa0aa0baabaa1EBBAA0A1A2A3a3a6k1A1A2A0Aa0A0AA0AA0AA0AAA2Aabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0a2a3a0a0a2a2a0Oabaaaaa0aAa2a2AAA0aA0g2a0");
});

define('Mezonet',["Klass","SEnv","Tones2","promise"],
function (Klass,SEnv,WDT2,_) {
    var Mezonet={};
    Mezonet.Source=Klass.define({
        $this:true,
        $:function (t,array) {
            t.chdata=[];
            t.Mezonet=Mezonet;
            t.load(array);
        },
        playback: function (t,context,options={}) {
            return new Mezonet.Playback(context, Object.assign(options,{
                source:t,
                //chdata:t.chdata,
                WaveDat:Mezonet.WDT.WaveDat,
                EnvDat: Mezonet.WDT.EnvDat
            }));
        },
        load:function (t,d) {
            var ver=readLong(d);
            var chs=readByte(d);
            t.version=ver;
            //var chdatas;
            //t.MPoint=chdatas=[];
            for (var i=0;i<chs;i++) {
                var chdata=[];
                //chdatas.push(chdata);
                var len=readLong(d);
                //console.log(len);
                //if(len>999999) throw new Error("LONG");
                for (var j=0;j<len;j++) {
                    chdata.push(readByte(d));
                }
                t.chdata[i]=chdata;
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
        }
    });
    Mezonet.Playback=SEnv;
    Mezonet.Playback.prototype.Mezonet=Mezonet;
    function WDT2Float(w) {return w/128-1;}
    var WvC=96;
    Mezonet.WDT={
        WaveDat:[],
        EnvDat:[],
        setNoiseWDT: function () {
            var t=this;
            // Noise
            for (var j=0;j<1024;j++) {
                t.WaveDat[WvC-1][j]=WDT2Float( Math.floor(Math.random() * 78 + 90) );
            }
            t.WaveDat[WvC-1].lambda=32;
        },
        load: function(){
            var t=this;
            if (t.loaded) return Promise.resolve();
            return new Promise(function (succ,fail) {
/*            try{
                var url=WDT;
                var oReq = new XMLHttpRequest();
                oReq.open("GET", url, true);
                oReq.responseType = "arraybuffer";
                oReq.onload = function (oEvent) {
                    var arrayBuffer = oReq.response,i,j;
                    if (arrayBuffer) {*/
                        var b = WDT2;//new Uint8Array(arrayBuffer);
                        //console.log("Loading wdt",b.length);
                        //WaveDat
                        var idx=0,i,j;
                        for (i = 0; i < WvC; i++) {
                            t.WaveDat[i]=[];
                            for (j=0;j<32;j++) {
                                t.WaveDat[i][j]=WDT2Float( b[idx++] );
                            }
                        }
                        t.setNoiseWDT();
                        //EnvDat
                        for (i=0 ;i<16;i++) {//Envs
                            t.EnvDat[i]=[];
                            for (j=0;j<32;j++) {
                                t.EnvDat[i][j]=b[idx++];
                            }
                        }
                        //console.log("Loading wdt done");
                        t.loaded=true;
                        succ();
/*                    }
                };
                oReq.send(null);
            } catch(e) {fail(e);}*/
        });
        }
    };
    Mezonet.init=function () {
        return Mezonet.WDT.load();
    };
    var timer=null, handles=[];
    Mezonet.setInterval=function (f) {
        if (timer==null) timer=setInterval(Mezonet.doRefresh,5);
        var handle={f:f};
        handles.push(handle);
        return handle;
    };
    Mezonet.clearInterval= function(h) {
        var idx=handles.indexOf(h);
        if (idx>=0) handles.splice(idx,1);
        if (handles.length==0) {
            clearInterval(timer);
            timer=null;
            //console.log("Timer off");
        }
    };
    Mezonet.doRefresh=function() {
        handles.forEach(function (h) {h.f();});
    };
    return Mezonet;
});

    return require("Mezonet");
}));
