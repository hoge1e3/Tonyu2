(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ja={
    superClassIsUndefined:"親クラス {1}は定義されていません",
    classIsUndefined:"クラス {1}は定義されていません",
    invalidLeftValue:"'{1}'は左辺には書けません．",
    fieldDeclarationRequired: "{1}は宣言されていません（フィールドの場合，明示的に宣言してください）．",
    duplicateKeyInObjectLiteral:"オブジェクトリテラルのキー名'{1}'が重複しています",
    cannotUseStringLiteralAsAShorthandOfObjectValue:"オブジェクトリテラルのパラメタに単独の文字列は使えません",
    breakShouldBeUsedInIterationOrSwitchStatement:"break； は繰り返しまたはswitch文の中で使います." ,
    continueShouldBeUsedInIterationStatement:"continue； は繰り返しの中で使います.",
    cannotUseObjectLiteralAsTheExpressionOfStatement:"オブジェクトリテラル単独の式文は書けません．",
    undefinedMethod:"メソッド{1}はありません．",
    notAWaitableMethod: "メソッド{1}は待機可能メソッドではありません",
    circularDependencyDetected: "次のクラス間に循環参照があります: {1}",
    cannotWriteReturnInTryStatement: "現実装では、tryの中にreturnは書けません",
    cannotWriteBreakInTryStatement: "現実装では、tryの中にbreakは書けません",
    cannotWriteContinueInTryStatement: "現実装では、tryの中にcontinueは書けません",
    cannotWriteTwoOrMoreCatch: "現実装では、catch節1個のみをサポートしています",
    lexicalError:"文法エラー(Token)",
    parseError:"文法エラー",
    ambiguousClassName: "曖昧なクラス名： {1}.{2}, {3}",
    cannotInvokeMethod: "{1}(={2})のメソッド {3}を呼び出せません",
    notAMethod :"{1}{2}(={3})はメソッドではありません",
    notAFunction: "{1}は関数ではありません",
    uninitialized: "{1}(={2})は初期化されていなません",
    newIsRequiredOnInstanciate: "クラス名{1}はnewをつけて呼び出して下さい。",
    bootClassIsNotFound: "{1}というクラスはありません．",
    infiniteLoopDetected: "無限ループをストップしました。\n"+
        "   プロジェクト オプションで無限ループチェックの有無を設定できます。\n"+
        "   [参考]https://edit.tonyu.jp/doc/options.html\n",
};
const en={
    "superClassIsUndefined" : "Super Class {1} ss Undefined", //親クラス {1}は定義されていません
    "classIsUndefined" : "Class {1} is Undefined", //クラス {1}は定義されていません
    "invalidLeftValue" : "{1} is not a valid Left Value", //'{1}'は左辺には書けません．
    "fieldDeclarationRequired" : "'{1}' is not declared, If you have meant it is a Field, Declare Explicitly.", //{1}は宣言されていません（フィールドの場合，明示的に宣言してください）．
    "duplicateKeyInObjectLiteral" : "Duplicate Key In Object Literal: {1}", //オブジェクトリテラルのキー名'{1}'が重複しています
    "cannotUseStringLiteralAsAShorthandOfObjectValue" : "Cannot Use String Literal as a Shorthand of Object Value", //オブジェクトリテラルのパラメタに単独の文字列は使えません
    "breakShouldBeUsedInIterationOrSwitchStatement" : "break; Should be Used In Iteration or switch Statement", //break； は 繰り返しまたはswitch文の中で使います.
    "continueShouldBeUsedInIterationStatement" : "continue; Should be Used In Iteration Statement", //continue； は繰り返しの中で使います.
    "cannotUseObjectLiteralAsTheExpressionOfStatement" : "Cannot Use Object Literal As The Expression Of Statement", //オブ ジェクトリテラル単独の式文は書けません．
    "undefinedMethod" : "Undefined Method: '{1}'", //メソッド{1}はありません．
    "notAWaitableMethod" : "Not A Waitable Method: '{1}'", //メソッド{1}は待機可能メソッドではありません
    "circularDependencyDetected" : "Circular Dependency Detected: {1}", //次のクラス間に循環参照があります: {1}
    "cannotWriteReturnInTryStatement" : "Cannot Write Return In Try Statement", //現実装では、tryの中にreturnは書けません
    "cannotWriteBreakInTryStatement" : "Cannot Write Break In Try Statement", //現実装では、tryの中にbreakは書けません
    "cannotWriteContinueInTryStatement" : "Cannot Write Continue In Try Statement", //現実装では、tryの中にcontinueは書けま せん
    "cannotWriteTwoOrMoreCatch" : "Cannot Write Two Or More Catch", //現実装では、catch節1個のみをサポートしています
    "lexicalError" : "Lexical Error", //文法エラー(Token)
    "parseError" : "Parse Error", //文法エラー
    "ambiguousClassName" : "Ambiguous Class Name: {1}.{2} vs {3}", //曖昧なクラス名： {1}.{2}, {3}
    "cannotInvokeMethod" : "Cannot Invoke Method {1}(={2}).{3}", //{1}(={2})のメソッド {3}を呼び出せません
    "notAMethod" : "Not A Method: {1}{2}(={3})", //{1}{2}(={3})はメソッドではありません
    "notAFunction" : "Not A Function: {1}", //{1}は関数ではありません
    "uninitialized" : "Uninitialized: {1}(={2})", //{1}(={2})は初期化されていなません
    "newIsRequiredOnInstanciate" : "new is required to Instanciate {1}", //クラス名{1}はnewをつけて呼び出して下さい。
    "bootClassIsNotFound" : "Boot Class {1} Is Not Found", //{1}というクラスはありません．
    "infiniteLoopDetected" : "Infinite Loop Detected",
};
/*let buf="";
    for (let k of Object.keys(ja)) {
        buf+=`"${k}" : "${englishify(k)}", //${ja[k]}\n`;
    }
    console.log(buf);*/

let dict=en;
function R(name,...params) {
    let mesg=dict[name];
    if (!mesg) {
        return englishify(name)+(params.length?": "+params.join(","):"");
    }
    return buildMesg(mesg, ...params);//+"です！";
}
function buildMesg() {
    var a=Array.prototype.slice.call(arguments);
    var format=a.shift();
    if (a.length===1 && a[0] instanceof Array) a=a[0];
    var P="vroijvowe0r324";
    format=format.replace(/\{([0-9])\}/g,P+"$1"+P);
    format=format.replace(new RegExp(P+"([0-9])"+P,"g"),function (_,n) {
        return a[parseInt(n)-1]+"";
    });
    return format;
}
function englishify(name) {
    name=name.replace(/([A-Z])/g," $1");
    name=name[0].toUpperCase()+name.substring(1);
    return name;
}
R.setLocale=locale=>{
    if (locale==="ja") dict=ja;
    if (locale==="en") dict=en;
};
module.exports=R;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/*global window,self,global*/
(function (deps, factory) {
    module.exports=factory();
})([],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

},{}],4:[function(require,module,exports){
//		function (assert,TT,IT,DU) {
var assert=require("../lib/assert");
var root=require("../lib/root");
var TonyuThreadF=require("./TonyuThread");
var IT=require("./tonyuIterator");
const R=require("../lib/R");
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
			if (root.alert) root.alert("Error: "+e);
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
	klass.removeMetaAll=function (ns) {
		ns+=".";
		for (let n in classMetas) {
			if (n.substring(0,ns.length)===ns) delete classMetas[n];
		}
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
					else throw new Error(R("ambiguousClassName",nn,n,found));
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
		if (!t) throw new Error(R("cannotInvokeMethod",objName,t,name));
		var f=t[name];
		if (typeof f!="function") throw new Error(R("notAMethod", (objName=="this"? "": objName+"."),name,f));
		return f.apply(t,args);
	}
	function callFunc(f,args, fName) {
		if (typeof f!="function") throw new Error(R("notAFunction",fName));
		return f.apply({},args);
	}
	function checkNonNull(v, name) {
		if (v!=v || v==null) throw new Error(R("uninitialized",name,v));
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
		throw new Error(R("newIsRequiredOnInstanciate",c));
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
		if (!bootClass) throw new Error( R("bootClassIsNotFound",bootClassName));
		Tonyu.runMode=true;
		var boot=new bootClass();
		//var th=thread();
		//th.apply(boot,"main");
		var TPR=Tonyu.globals.$currentProject||Tonyu.currentProject;
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
			throw new Error(R("infiniteLoopDetected"));
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

},{"../lib/R":1,"../lib/assert":2,"../lib/root":3,"./TonyuThread":5,"./tonyuIterator":6}],5:[function(require,module,exports){
//	var Klass=require("../lib/Klass");
const R=require("../lib/R");
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
					throw new Error(R("undefinedMethod",methodName));
				}
			}
			if (typeof methodName=="function") {
				method=methodName.fiber;
				if (!method) {
					var n=methodName.methodInfo ? methodName.methodInfo.name : methodName.name;
					throw new Error(R("notAWaitableMethod",n));
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

},{"../lib/R":1}],6:[function(require,module,exports){
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

},{}]},{},[4]);
