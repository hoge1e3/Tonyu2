// Created at Wed Aug 23 2017 10:53:28 GMT+0900 (東京 (標準時))
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

requireSimulator.setName('assert');
define([],function () {
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
    };
    return assert;
});

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
				fb.steps();
			}).fail(function (e) {
				if (e instanceof Error) {
					fb.gotoCatch(e);
				} else {
					var re=new Error(e);
					re.original=e;
					fb.gotoCatch(re);
				}
				fb.steps();
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
		var th=thread();
		th.apply(boot,"main");
		var TPR;
		if (TPR=Tonyu.currentProject) {
			TPR.runningThread=th;
			TPR.runningObj=boot;
		}
		$LASTPOS=0;
		th.steps();
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
	setInterval(resetLoopCheck,16);
	return Tonyu={thread:thread, /*threadGroup:threadGroup,*/ klass:klass, bless:bless, extend:extend,
			globals:globals, classes:classes, classMetas:classMetas, setGlobal:setGlobal, getGlobal:getGlobal, getClass:getClass,
			timeout:timeout,animationFrame:animationFrame, /*asyncResult:asyncResult,*/
			bindFunc:bindFunc,not_a_tonyu_object:not_a_tonyu_object,
			hasKey:hasKey,invokeMethod:invokeMethod, callFunc:callFunc,checkNonNull:checkNonNull,
			run:run,iterator:IT,checkLoop:checkLoop,resetLoopCheck:resetLoopCheck,
			VERSION:1503453200013,//EMBED_VERSION
			A:A};
}();
});

requireSimulator.setName('extend');
define([],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
   };
});

requireSimulator.setName('PathUtil');
define(["assert"],function (assert) {
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
    fixSep: function (path) {
        assert.is(arguments,[String]);
        return assert.is( path.replace(/\\/g,"/"), Path);
    },
    directorify: function (path) {
        path=PathUtil.fixSep(path);
        if (PathUtil.isDir(path)) return path;
        return assert.is(path+SEP, Dir);
    },
    filify: function (path) {
        path=PathUtil.fixSep(path);
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
        path=PathUtil.fixSep(path);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
PathUtil.isAbsolute=PathUtil.isAbsolutePath;
PathUtil.isRelative=PathUtil.isRelativePath;
if (typeof window=="object") window.PathUtil=PathUtil;
return PathUtil;
});
requireSimulator.setName('MIMETypes');
define([], function () {
   return {
      ".png":"image/png",
      ".gif":"image/gif",
      ".jpeg":"image/jpeg",
      ".jpg":"image/jpeg",
      ".ico":"image/icon",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".mp4":"video/mp4",
      ".m4a":"audio/x-m4a",
      ".mid":"audio/mid",
      ".midi":"audio/mid",
      ".wav":"audio/wav",
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
      ".tonyu":"text/tonyu"
   };
});
requireSimulator.setName('FS2');
define(["extend","PathUtil","MIMETypes","assert"],function (extend, P, M,assert){
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
            return $.when(this.getContent.apply(this,arguments));
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        setContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("setContentAsync");
            return $.when(content).then(function (content) {
                return $.when(t.setContent(path,content,options));
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
            return M[e] || (options||{}).def || "text/plain";
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
        }//,
        /*get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }*/
    });
    return FS;
});

requireSimulator.setName('WebSite');
define(["PathUtil"], function (P) {
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
		WebSite.cwd=P.directorify(process.cwd());
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
	return window.WebSite=WebSite;
});

requireSimulator.setName('DataURL');
define(["extend","assert","Util"],function (extend,assert,Util) {
    var A=Util.hasNodeBuffer() ? Buffer :ArrayBuffer;
    var isNodeBuffer=Util.isNodeBuffer;
    var isBuffer=Util.isBuffer;
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
          this.binType=contentType || A;
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
      } else {
          console.log(arguments);
          assert.fail("Invalid args: ",arguments);
      }
   };
   DataURL.isBuffer=isBuffer;
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
	      var reg=/^data:([^;]+);base64,/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Base64_To_ArrayBuffer(dataURL.substring(r[0].length) , this.binType);
          return assert.is(this.buffer , this.binType);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

	function Base64_To_ArrayBuffer(base64, binType){
	    var A=binType;
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
	    var ary_u8 = (Util.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer ));
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
        //console.log("WOW!", ary_buffer[0],ary_u8[0], ary_buffer===ary_u8.buffer);
	    if (binType===Uint8Array) {
	        return ary_u8;
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
		var ary_u8 = Util.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer );
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
requireSimulator.setName('Content');
define(["DataURL","Util","assert"],function (DataURL,Util,assert) {
    var Content=function () {};
    var isNodeBuffer=Util.isNodeBuffer;
    var isBuffer=Util.isBuffer;

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
        if (Util.isBuffer(a)) {
            a=Array.prototype.slice.call(a);
            return assert.is(new Uint8Array(a).buffer,ArrayBuffer);//"n2a: buf is not set");
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
        if (bin && isBuffer(bin.buffer)) {
            b.arrayBuffer=bin.buffer;
        } else if (Util.isNodeBuffer(bin)) {
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.arrayBuffer=bin;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };

    var p=Content.prototype;
    p.toBin = function (binType) {
        binType=binType || (Util.hasNodeBuffer() ? Buffer: ArrayBuffer);
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
            return this.setBuffer( Util.str2utf8bytes(this.plain, binType) );
        }
        throw new Error("No data");
    };
    p.setBuffer=function (b) {
        assert(b,"b is not set");
        if (Util.isNodeBuffer(b)) {
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
                this.arrayBuffer=Util.str2utf8bytes(this.plain,ArrayBuffer);
            }
            if (this.arrayBuffer || this.nodeBuffer) {
                var d=new DataURL(this.arrayBuffer || this.nodeBuffer,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.plain!=null) {
            return this.plain;
        } else {
            if (this.url && !this.hasBin() ) {
                var d=new DataURL(this.url,ArrayBuffer);
                this.arrayBuffer=d.buffer;
            }
            if (this.hasBin()) {
                return this.plain=Util.utf8bytes2str(
                        this.nodeBuffer || new Uint8Array(this.arrayBuffer)
                );
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.nodeBuffer || this.arrayBuffer;};
    p.hasNodeBuffer= function () {return this.nodeBuffer;}
    p.hasArrayBuffer= function () {return this.arrayBuffer;}
    return Content;
});
/*
requirejs(["Content"], function (C) {
   var s="てすとabc";
   var c1=C.plainText(s);
   test(c1,[s]);

   function test(c,path) {
       var p=c.toPlainText();
       var u=c.toURL();
       var a=c.toArrayBuffer();
       var n=c.toNodeBuffer();
       console.log(path,"->",p,u,a,n);
       var c1=C.plainText(p);
       var c2=C.url(u);
       var c3=C.bin(a,"text/plain");
       var c4=C.bin(n,"text/plain");
       if (path.length<2) {
           test(c1, path.concat([p]));
           test(c2, path.concat([u]));
           test(c3, path.concat([a]));
           test(c4, path.concat([n]));
       }

   }

});
*/

requireSimulator.setName('NativeFS');
define(["FS2","assert","PathUtil","extend","MIMETypes","DataURL","Content"],
        function (FS,A,P,extend,MIME,DataURL,Content) {
    var available=(typeof process=="object" && (process.__node_webkit||process.__nwjs));
    if (!available) {
        return function () {
            throw new Error("This system not suppert native FS");
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
        return P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return a;
    };

    /*Pro.isText=function (path) {
        var e=P.ext(path);
        var m=MIME[e];
        return P.startsWith( m, "text");
    };*/
    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
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
            if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            }
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
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np).map(function (e) {
                var s=fs.statSync(ts+SEP+e);
                var ss=s.isDirectory()?SEP:"";
                return e+ss;
            });
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

requireSimulator.setName('LSFS');
define(["FS2","PathUtil","extend","assert","Util","Content"],
        function(FS,P,extend,assert,Util,Content) {
    var LSFS = function(storage,options) {
    	this.storage=storage;
    	this.options=options||{};
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
    LSFS.ramDisk=function () {
        var s={};
        s[P.SEP]="{}";
        return new LSFS(s);
    };
    FS.addFSType("localStorage",function (path, options) {
        return new LSFS(localStorage);
    });
    FS.addFSType("ram",function (path, options) {
        return LSFS.ramDisk();
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
        var dinfo = {};
        try {
            var dinfos = this.getItem(path);
            if (dinfos) {
                dinfo = JSON.parse(dinfos);
            }
        } catch (e) {
            console.log("dinfo err : " , path , dinfos);
        }
        return dinfo;
    };
    LSFS.prototype.putDirInfo=function putDirInfo(path, dinfo, trashed) {
  	    assert.is(arguments,[P.AbsDir, Object]);
  	    if (!isDir(path)) throw new Error("Not a directory : " + path);
  	    assert(this.inMyFS(path));
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
            if (this.isText(path)) {
                c=Content.plainText(this.getItem(path));
            } else {
                c=Content.url(this.getItem(path));
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            if (this.isText(path)) {
                this.setItem(path, content.toPlainText());
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
        }
    });
    return LSFS;

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
requireSimulator.setName('SFile');
define(["extend","assert","PathUtil","Util","Content","FS2"],
function (extend,A,P,Util,Content,FS2) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    //A(fs && fs.getReturnTypes, fs);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    this.act={};// path/fs after follwed symlink
    this.act.path=this.fs.resolveLink(path);
    this.act.fs=rootFS.resolveFS(this.act.path);
    A.is(this.act, {fs:FS2, path:P.Absolute});
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
    up:function () {
        var pathR=this.path();
        var pa=P.up(pathR);
        if (pa==null) return null;
        return this._resolve(pa);
    },
    sibling: function (relPath) {
        return this.up().rel(relPath);
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
        this.act.fs.touch(this.act.path);
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
    lastUpdate:function () {
        A(this.exists());
        return this.metaInfo().lastUpdate;
    },
    exists: function (options) {
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
        options=options||{};
        if (this.isLink()) {
            return this.fs.rm(this.path(),options);
        }
        /*if (!this.exists({noFollowLink:true})) {
            return this.act.fs.rm(this.act.path, options);
        }*/
        if (this.isDir() && (options.recursive||options.r)) {
            this.each(function (f) {
                f.rm(options);
            });
        }
        return this.act.fs.rm(this.act.path, options);
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
    text:function () {
        if (arguments.length>0) {
            this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        if (this.isText()) {
            this.act.fs.setContent(this.act.path, Content.plainText(t));
        } else {
            this.act.fs.setContent(this.act.path, Content.url(t));
        }
    },
    getContent: function (f) {
        if (typeof f=="function") {
            return this.act.fs.getContentAsync(this.act.path).then(f);
        }
        return this.act.fs.getContent(this.act.path);
    },
    setContent: function (c) {
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function () {
        if (this.isText()) {
            return this.act.fs.getContent(this.act.path).toPlainText();
        } else {
            return this.act.fs.getContent(this.act.path).toURL();
        }
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function () {
        return this.act.fs.getContentType(this.act.path);
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
            return res;
        } else {
            A(srcIsDir && dstIsDir);
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
        return res;
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
    }
};
return SFile;
});

requireSimulator.setName('RootFS');
define(["assert","FS2","PathUtil","SFile"], function (assert,FS,P,SFile) {
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
            }
    };
    for (var i in p) {
        dst[i]=p[i];
    }
    return RootFS;
});
requireSimulator.setName('FS');
define(["FS2","WebSite","NativeFS","LSFS", "PathUtil","Env","assert","SFile","RootFS"],
        function (FS,WebSite,NativeFS,LSFS, P,Env,A,SFile,RootFS) {
    var FS={};
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env(WebSite);
    if (WebSite.isNW) {
        rootFS=new RootFS(new NativeFS());
    } else {
        rootFS=new RootFS(new LSFS(localStorage));
    }
    FS.isFile=function (f) {
        return SFile.is(f);
    };
    FS.PathUtil=P;
    FS.getRootFS=function () {return rootFS;};
    FS.get=function () {
        return rootFS.get.apply(rootFS,arguments);
    };
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
    FS.mount=function () {
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        return rootFS.unmount.apply(rootFS,arguments);
    };
    return FS;
});

requireSimulator.setName('FileList');
function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    var _mod=false;
    var selbox=elem[0].tagName.toLowerCase()=="select";
    //console.log(elem);
    if (!options) options={};
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir,
    		setModified:setModified, isModified:isModified};
    var path=$("<div>");
    var items=$("<div>");
    if (!selbox) elem.append(path).append(items);
    else elem.change(function () {
        if(this.value) select(FS.get(this.value));
    });
    function item(f) {
    	var res=$();
    	if (!f) return res;
    	var fn=f.path();
    	items.find(selbox?"option":"span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==fn) {
    			res=t;
    		}
    	});
    	return res;
    }
    function select(f) {
        if (FL.on.select && FL.on.select(f)) return;
        if (!f) return;
        _mod=false;
        if (f.isDir()) {
            //_curFile=null;
            ls(f);
        } else {
            var nDir=f.up();
            if (_curDir.path()!=nDir.path() ) {
                _curFile=f;
                ls(nDir);
            } else {
                item(_curFile).removeClass("selected");
                _curFile=f;
                item(_curFile).addClass("selected");
            }
        }
    }
    function setModified(m) {
    	if (!_curFile) return;
    	_mod=m;
       	item(_curFile).text(itemText(_curFile,m));
    }
    function isModified() {
    	return _mod;
    }
    function ls(dir) {
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.name()).attr({title:dir.path()});
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        var wait=$("<div>").text("Wait..");
        items.append(wait);
        if (selbox) {
            elem.empty();
            elem.append($("<option>").text("Select..."));
        }
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            if (selbox) {
                elem.append($("<option>").
                        attr("value",p.path()).
                        text("[Up]")
                );
            } else {
                $(selbox?"<option>":"<li>").append(
                        $("<span>").addClass("fileItem").text("[Up]")
                ).appendTo(items).click(function () {
                    select(p);
                });
            }
        }
        if (_curFile && !_curFile.exists()) {
            _curFile=null;
        }
        var i=0;
        var dirs=_curDir.listFiles();
        setTimeout(lp,0);//_curDir.each(
        function lp() {
            if (i==0) wait.remove();
            var f=dirs[i++];
            if (i<dirs.length) setTimeout(lp,0);
            var n=displayName(f);
            if (!n) return;
            var isCur=_curFile && _curFile.path()==f.path();
            if (selbox) {
                elem.append($("<option>").
                        attr("value",f.path()).
                        text(itemText(f))
                );
            } else {
                var s=$("<span>").addClass("fileItem").text(itemText(f)).data("filename",f.path());
                if (isCur) { s.addClass("selected");}
                //console.log("Add file item ",f,selbox);
                $("<li>").append(s).appendTo(items).click(function () {
                    select(f);
                });
            }
        }
    }
    function itemText(f, mod) {
    	return (mod?"*":"")+(f.isReadOnly()?"[RO]":"")+displayName(f);
    }
    function displayName(f) {
        if (FL.on.displayName) return FL.on.displayName.apply(FL, arguments );
        return f.name();
    }
    function curFile() {
        return _curFile;
    }
    function curDir() {
        return _curDir;
    }
    return FL;
}
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

requireSimulator.setName('FileMenu');
define(["UI","FS","DeferredUtil"], function (UI,FS,DU) {
var FileMenu=function () {
    var FM={on:{}};
    FM.on.validateName=function (name,action) {
        if (!name) return {ok:false, reason:"ファイル名を入力してください"};
        // return {ok:true, file:File } || {ok: false, reason:String}
        var curDir=FM.on.getCurDir();
        var f=curDir.rel(name);
        return {ok: true, file: f};
    };
    FM.on.displayName=function (f) {
        return f.name();
    };
    FM.on.close=function () {};
    FM.on.open=function (f){
        if (typeof FM.fileList=="object") {
            FM.fileList.select(f);
        }
    };
    FM.on.ls=function () {
        if (typeof FM.fileList=="object") {
            FM.fileList.ls();
        }
    };
    FM.on.getCurFile=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curFile();
        }
        throw "on.getCurFile is missing";
    };
    FM.on.getCurDir=function () {
        if (typeof FM.fileList=="object") {
            return FM.fileList.curDir();
        }
        throw "on.getCurDir is missing";
    };
    FM.on.createContent=function (f) {
        return f.text("");
    };
    FM.onMenuStart=function (){};
    FM.dialog=function (title, name, onend) {
    	return FM.dialogOpt({title:title, name:name, onend:onend});
    };
    FM.dialogOpt=function (options) {
    	var title=options.title;
    	var name=options.name || "";
    	var onend=options.onend || function (){};
        //var t;
        if (!FM.d) FM.d=UI(["div"], {title: title},
             "ファイル名を入力してください",["br"],
             ["input", {
                 $var: "name",
                 on:{
                	 enterkey:function () {
                		 FM.d.$vars.done();
                	 },
                	 realtimechange: function (v) {
                		 FM.d.$vars.chg(v);
                	 }
                 }
             }],
             ["br"],
             ["div",{$var:"extra"}],
             ["div",{$var:"msg"}],
            ["button", {$var:"b", on:{click: function () {
            	FM.d.$vars.done();
       	 	}}}, "OK"]
        );
        FM.d.attr({title:title});
        var v=FM.d.$vars;
        //console.log(name);
        v.name.val(name);
        FM.d.dialog({title:title});
        var r=null;
        v.done=function() {
            if (!r || !r.ok) return;
            //clearInterval(t);
            onend(r.file);
            FM.d.dialog("close");
        };
        v.chg=function (s) {
            r=FM.on.validateName(s,options);
            if (r.ok && r.file.exists()) r={ok:false, reason:s+"は存在します"};
            if (!r.ok) {
                v.msg.css({"color":"red"});
                v.msg.text(r.reason);
                v.b.attr("disabled",true);
            } else {
                v.msg.css({"color":"blue"});
                v.msg.text(r.note || "");
                v.b.removeAttr("disabled");
            }
        };
        v.extra.empty();
        if (options.extraUI) {
            options.extraUI(v.extra);
        }
    };

    FM.create=function () {
        FM.onMenuStart("create");
        FM.dialogOpt({title:"新規作成", action:"create", onend:function (f) {
            if (!f.exists()) {
                FM.on.createContent(f); //f.text("");
                FM.on.ls();
                FM.on.open(f);
            }
        }});
    };
    FM.mv=function () {
        FM.onMenuStart("mv");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        var oldName=FM.on.displayName(curFile);
        /*var oldName,  mode;
        if (typeof oldNameD=="string") oldName=oldNameD;
        else { oldName=oldNameD.name; mode=oldNameD.mode;}*/
        FM.dialogOpt({title:"名前変更", name:oldName, action:"mv", extraUI:FM.on.mvExtraUI, onend:function (nf) {
            if (!nf) return;
            return DU.then(function () {
                /*if (FM.on.mv && FM.on.mv(curFile,nf)===false) {
                    return;
                }*/
                if (FM.on.mv) {
                    return FM.on.mv(curFile,nf);
                }
            }).then(function (r) {
                if (r===false) return;
                var t=curFile.text();
                curFile.rm();
                FM.on.close(curFile);
                curFile=nf;
                nf.text(t);
                FM.on.ls();
                FM.on.open(curFile);
            });
        }});
    };
    FM.rm=function (){
        FM.onMenuStart("rm");
        var curFile=FM.on.getCurFile();
        if (!curFile) return;
        if (!confirm(curFile.name()+"を削除しますか？")) return;
        curFile.rm();
        FM.on.ls();
        FM.on.close(curFile);
    };
    /*$(function () {
        $("#newFile").click(FM.create);
        $("#mvFile").click(FM.mv);
        $("#rmFile").click(FM.rm);
    });*/
    return FM;
};
return FileMenu;

});

requireSimulator.setName('Shell');
define(["FS","Util","WebSite","PathUtil","assert"],
        function (FS,Util,WebSite,PathUtil,assert) {
    var Shell={};
    Shell.cd=function (dir) {
        Shell.cwd=resolve(dir,true);
        return Shell.pwd();
    };
    function resolve(v, mustExist) {
        var r=resolve2(v);
        if (mustExist && !r.exists()) throw r+": no such file or directory";
        return r;
    }

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
            sh.echo(fs.fstype()+"\t"+(fs.mountPoint||""));
        });
    }
    Shell.resolve=resolve;
    function resolve2(v) {
        if (typeof v!="string") return v;
        if (PathUtil.isAbsolutePath(v)) return FS.get(v);
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
        if (varlog.exists() && varlog.fs.storage===localStorage) {
            varlog.removeWithoutTrash({r:true});
        }
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
requireSimulator.setName('showErrorPos');
define(["Log","FS"],function (Log,FS) {//MODJSL
return function showErrorPos(elem, err) {
    var mesg, src, pos;
    if (!err) {
        close();
        return;
    }
    var row,col;
    if (err.isTError) {
        mesg=err.mesg;
        src=err.src;
        pos=err.pos;
        row=err.row+1;
        col=err.col+1;
    } else {
        src={name:function (){return "不明";},text:function () {
            return null;
        }};
        pos=0;
        mesg=err;
    }
    function close(){
        elem.empty();
    }
    if(typeof pos=="object") {row=pos.row; col=pos.col;}
    close();
    var mesgd=$("<div>").text(mesg+" 場所："+src.name()+(typeof row=="number"?":"+row+":"+col:""));
    //mesgd.append($("<button>").text("閉じる").click(close));
    elem.append(mesgd);
    elem.append($("<div>").attr("class","quickFix"));
    console.log("src=",src);
    var str=src.text();
    if (str && typeof pos=="object") {
        var npos=0;
        var lines=str.split(/\n/);
        for (var i=0 ; i<lines.length && i+1<pos.row ; i++) {
            npos+=lines[i].length;
        }
        npos+=pos.col;
        pos=npos;
    }
    var srcd=$("<pre>");
    srcd.append($("<span>").text(str.substring(0,pos)));
    srcd.append($("<img>").attr("src",FS.expandPath("${sampleImg}/ecl.png")));//MODJSL
    srcd.append($("<span>").text(str.substring(pos)));
    elem.append(srcd);
    //elem.attr("title",mesg+" 場所："+src.name());
    elem.attr("title","エラー");
    var diag=elem.dialog({width:600,height:400});
    Log.d("error", mesg+"\nat "+src+":"+err.pos+"\n"+str.substring(0,err.pos)+"##HERE##"+str.substring(err.pos));
    return diag;
};
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
	stmt=g("stmt").ors("return", "if", "for", "while", "do","break", "continue", "switch","ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl");
	// ------- end of stmts
	g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
	var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
	var jsonElem=g("jsonElem").ands(
			symbol.or(literal),
			tk(":").or(tk("=")).and(expr).ret(function (c,v) {return v;}).opt()
	).ret("key","value");
	var objlit=g("objlit").ands(tk("{"), jsonElem.sep0(tk(","),true), tk(",").opt(), tk("}")).ret(null, "elems");
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
requireSimulator.setName('fixIndent');
function fixIndent(str, indentStr) {
	if (!indentStr) indentStr="    ";
	var incdec={"{":1, "}":-1};
	var linfo=[];
	try {
		var tokenRes=TT.parse(str);
	var tokens=tokenRes.result[0];
	tokens.forEach(function (token) {
		if (incdec[token.type]) {
		if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=token.type;
		}
	});
		/*var v=Visitor({
			"{": function (node) {
				var r=pos2RC(str, node.pos);
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=node.text;
			},
		"}": function (node) {
				var r=pos2RC(str, node.pos);
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=node.text;
			}
		});
		v.def=function (node) {
			if (!node || typeof node!="object") return;
			if (node[Grammar.SUBELEMENTS]) {
				node[Grammar.SUBELEMENTS].forEach(function (e) {
					v.visit(e);
				});
				return;
			}
			for (var i in node) {
				if (node.hasOwnProperty(i)) {
					v.visit(node[i]);
				}
			}
		};
		v.visit(node);*/
	}catch(e) {
		var r={row:0, col:0};
		var len=str.length;
		for (var i=0 ; i<len ;i++) {
			var c=str.substring(i,i+1);
			if (incdec[c]) {
				if (!linfo[r.row]) linfo[r.row]="";
				linfo[r.row]+=c;
			} else if (c=="\n") {
				r.row++;
				r.col=0;
			} else {
				r.col++;
			}
		}
	}
	//console.log(linfo);
	var res="";
	var lines=str.split("\n");
	var curDepth=0;
	var row=0;
	lines.forEach(function (line) {
	var opens=0, closes=0;
		line=line.replace(/^\s*/,"");
		if (linfo[row]!=null) {
			linfo[row].match(/^(\}*)/);
			closes=RegExp.$1.length;
			linfo[row].match(/(\{*)$/);
			opens=RegExp.$1.length;
	}
		curDepth-=closes;
		line=indStr()+line;
		curDepth+=opens;
		res+=line+"\n";
		row++;
	});
	res=res.replace(/\n$/,"");
	//console.log(res);
	return res;
	function indStr() {
		var res="";
		for (var i=0 ;i<curDepth ;i++) {
			res+=indentStr;
		}
		return res;
	}
	function pos2RC(str, pos) {
		var res={row:0, col:0};
		var len=Math.min(str.length,pos);
		for (var i=0 ; i<len ;i++) {
			if (str.substring(i,i+1)=="\n") {
				res.row++;
				res.col=0;
			} else {
				res.col++;
			}
		}
		return res;
	}
}

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
    W.encodeURL=function (name) {
        return encodeURI(name).replace(/%/g,"");
    };
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
                                    ahref=W.encodeURL(ahref);// encodeURI(ahref).replace(/%/g,"_");
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
			console.log("digestDecls",src);
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
var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
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
requireSimulator.setName('compiledProject');
define(["DeferredUtil","WebSite"], function (DU,WebSite) {
	var CPR=function (ns, url) {
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
	TPR.getNamespace=function () {
		var opt=TPR.getOptions();
		return A(opt.compiler.namespace,"namespace not specified opt="+JSON.stringify(opt));
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
			TPR.genJS(ord.filter(function (c) {
				return compilingClasses[c.fullName];
			}));
			return TPR.showProgress("concat");
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
		ord.forEach(function (c) {
			console.log("genJS :"+c.fullName);
			JSGenerator.genJS(c, env);
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
requireSimulator.setName('Assets');
define(["WebSite","Util","Tonyu","FS"],function (WebSite,Util,Tonyu,FS) {
    var Assets={};
    Assets.resolve=function (url, prj) {
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
        if (main && main.stop) main.stop();
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
    TPR.getDir=function () {return dir;};
    TPR.getName=function () { return dir.name().replace(/\/$/,""); };
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
            return $.when.apply($,arguments).then(function () {
                var a=[];
                for (var i=0; i<arguments.length; i++) {
                    a.push(arguments[i]);
                }
                if (a[0] instanceof $) {
                    out.append(a[0]);
                } else {
                    out.append(UI("span",a.join(" ")+"\n"));
                }
            });
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
                    } else {
                        if (options) args.push(options);
                        options=null;
                        args.push(ce);
                    }
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
    var oldcat=sh.cat;
    sh.cat=function (file,options) {
        file=sh.resolve(file, true);
        if (file.contentType().match(/^image\//)) {
            return file.getContent(function (c) {
                sh.echo(UI("img",{src:c.toURL()}));
            });
        } else {
            return oldcat.apply(sh,arguments);
        }
    };
    return res;
});
requireSimulator.setName('ProjectOptionsEditor');
define(["UI"], function (UI) {
    return function (TPR) {
        var opt=TPR.getOptions();
        //opt.id=Math.random();
        //console.log("Project got",opt);
        /*   Tonyu.defaultOptions={
                compiler: { defaultSuperClass: "Actor"},
                bootClass: "Boot",
                kernelEditable: false
             };
         */
        var FType={
                fromVal: function (val){
                    return val;
                },
                toVal: function (v){ return val;}
        };
        if (!TPR.odiag) {
            TPR.odiag=UI("div",{title:"プロジェクト オプション"},
                    ["h5","コンパイラ"],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.diagnose"}],
                     "診断モード(速度が落ちますが，プログラムの不具合を見つけやすくします)"],
                    ["div",
                     ["input", {type:"checkbox", $edit: "compiler.noLoopCheck"}],
                     "無限ループチェックをしない（チェックすると速度が速くなることがあります）"],
                    ["div", "デフォルトの親クラス",
                     ["input", {$edit: "compiler.defaultSuperClass"}]],
                     ["h5","実行"],
                     ["div", "Main クラス", ["input", {$edit: "run.mainClass"}] ],
                     ["div", "Boot クラス", ["input", {$edit: "run.bootClass"}] ],
                     ["h5","開発"],
                     ["div",
                      ["input", {type:"checkbox", $edit: "kernelEditable"}],
                      "Kernelの開発を行う"],
                      ["div", {$var:"validationMessage", css:{color:"red"}}]
            );
        }
        TPR.odiag.$edits.load(opt);
        TPR.odiag.dialog({
            width: 600,
            buttons: {
                OK: function () {
                    TPR.odiag.dialog("close");
                    //console.log("Project opt Saved ",JSON.stringify(opt));
                    TPR.setOptions();
                    //console.log("new opt ",JSON.stringify(TPR.getOptions()));
                }
            }
        });
    };
});

requireSimulator.setName('copyToKernel');
requirejs(["Shell","FS","WebSite"], function (sh,FS,WebSite) {
    sh.copyToKernel=function (name) {
        var home=FS.get(WebSite.tonyuHome);
        var ker=home.rel("Kernel/");
        if (name) {
            return sh.cp( name, ker.rel(name));
        } else {
            var cps=0;
            ker.each(function (f) {
                var src=sh.cwd.rel(f.name());
                if (src.exists()) {
                    cps+=sh.cp(src, ker);
                }
            });
            return cps;
        }
    };
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
requireSimulator.setName('IFrameDialog');
define([], function () {
    var WD={};
    WD.create=function (home, options) {
        options=options || {title:"help",topPage:"index"};
        if (!options.height) {
            options.height=$(window).height()*0.7;
        }
        if (!options.width) options.width=500;
        var ifrm=$("<iframe>").attr({
            "class":"wikiDialog",frameBorder:0,
            src:home//, width:options.width+100, height:options.height
        });
        var d=$("<div>").attr({"class":"wikiDialog",title:options.title}).append(ifrm);
        return {
            show: function () {
                d.dialog({
                    width:options.width, height:options.height,
                    resize:function (e,ui){
                        //ifrm.width(ui.size.width-50);
                        //ifrm.height(ui.size.height-50);
                    }
                });
            }
        };
    };
    return WD;
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
// T2MediaLib_BGMPlayer //

var T2MediaLib_BGMPlayer = function(arg_id) {
    this.id = arg_id;
    this.playingState = "stop";
    this.playingStatePending = null;
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
    this.picoAudio = null;//new PicoAudio(T2MediaLib.context);
    this.picoAudioSetDataBGMName = null; // 前回のsetDataした曲を再び使う場合は、setDataを省略して軽量化する
    this.PICO_AUDIO_VOLUME_COEF = 1;//0.2;
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    this.stopBGM();

    var soundData = T2MediaLib.soundDataAry[idx];
    if (soundData == null) return null;
    if (!soundData.isDecodeComplete()) {
        if (!soundData.isDecoding()) {
            var that = this;
            var callbacks = {};
            callbacks.succ = function() {
                var pending = that.playingStatePending; // 途中で値が変わるため保存
                that._setPlayingState("stop", true);
                if (pending != "stop") {
                    that.playBGM(idx, loop, offset, loopStart, loopEnd);
                }
                if (pending == "pause") {
                    that.pauseBGM();
                }
            };
            callbacks.err = function() {
                that._setPlayingState("stop", true);
            };
            this.playingBGMName = idx;
            this._setPlayingState("decoding", true);
            T2MediaLib.decodeSound(idx, callbacks);
        }
        return this;
    }

    var decodedData = soundData.decodedData;
    if (decodedData instanceof AudioBuffer) {
        // MP3, Ogg, AAC, WAV
        this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmPan, this.bgmTempo, offset, loop, loopStart, loopEnd);
    } else if (decodedData instanceof Object) {
        // Midi
        if (this.picoAudio == null) {
            this.picoAudio = new PicoAudio(T2MediaLib.context, T2MediaLib.picoAudio); // AudioContextオブジェクトがmax6つまで？なので使いまわす
        }
        if (idx != this.picoAudioSetDataBGMName) {
            this.picoAudio.setData(decodedData);
            this.picoAudioSetDataBGMName = idx;
        } else {
            this.picoAudio.initStatus();
        }
        this.picoAudio.setLoop(loop);
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
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
    this._setPlayingState("play");
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
    this._setPlayingState("stop");
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
            this.bgmPauseLoopStart = T2MediaLib.getSELoopStartTime(bgm);
            this.bgmPauseLoopEnd = T2MediaLib.getSELoopEndTime(bgm);
            this.bgmPauseLoop = T2MediaLib.isSELoop(bgm);
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            this.bgmPauseTempo = this.bgmTempo;
            bgm.stop(0);
            this.bgmPause = 1;
        }
    }
    if (this.playingState != "stop") {
        this._setPlayingState("pause");
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
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        bgm.gainNode.gain.value = vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume;
        //↓seMasterVolumeが音量に乗算されてしまう
        //T2MediaLib.setSEVolume(bgm, vol);
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMTempo = function() {
    return this.bgmTempo;
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    // MP3, Ogg, AAC, WAV
    var bgm = this.playingBGM;

    if (tempo <= 0) tempo = 1;
    if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
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
        T2MediaLib.setSEPan(bgm, pan);
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
            return T2MediaLib.isSELoop(bgm);
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
            T2MediaLib.setSELoop(bgm, loop);
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
            return T2MediaLib.getSELoopStartTime(bgm);
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
            return T2MediaLib.setSELoopStartTime(bgm, loopStart);
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
            return T2MediaLib.getSELoopEndTime(bgm);
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
            return T2MediaLib.setSELoopEndTime(bgm, loopEnd);
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
    if (this.picoAudio == null) {
        this.picoAudio.setOnSongEndListener(listener);
    }
};
T2MediaLib_BGMPlayer.prototype.getPlayingState = function() {
    return this.playingState;
};
T2MediaLib_BGMPlayer.prototype._setPlayingState = function(state, force) {
    if (force || this.playingState != "decoding") {
        this.playingState = state;
        this.playingStatePending = null;
    } else {
        this.playingStatePending = state;
    }
};

// T2MediaLib_SoundData //

var T2MediaLib_SoundData = function(idx, url) {
    this.state = "none"; // "none":データなし, "loading":読み込み中, "loaded":読み込み完了, "decoding":デコード中, "decoded":デコード完了, "error":エラー
    this.errorID = null;
    this.url = null;
    this.fileData = null;
    this.decodedData = null;
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
T2MediaLib_SoundData.prototype.getDecodedData = function() {
    return this.decodedData;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,
    picoAudio : null,

    soundDataAry : [], // T2MediaLib_SoundData

    bgmPlayerMax : 16,
    bgmPlayerAry : [], // T2MediaLib_BGMPlayer

    masterVolume : 1.0,
    seMasterVolume : 1.0,
    bgmMasterVolume : 1.0,

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
            // MIDIデコード用PicoAudio生成
            T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
        }
    },

    // CLEAR系関数 //
    allClearData : function() {
        var dataAry = T2MediaLib.soundDataAry;
        for (var data in dataAry) {
            delete dataAry[data];
        }
    },
    clearData : function(idx) {
        var dataAry = T2MediaLib.soundDataAry;
        delete dataAry[idx];
    },

    // SE&BGMの音量 //
    getMasterVolume : function() {
        return T2MediaLib.masterVolume;
    },
    setMasterVolume : function(vol) {
        T2MediaLib.masterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },

    // 配列データからサウンドを作成・登録
    loadSoundFromArray : function (idx, array1, array2) {
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();

        var ctx = T2MediaLib.context;
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
        T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
    },
    // サウンドの受信・デコード・登録
    loadSound : function(idx, url, callbacks) { //@hoge1e3
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();

        if (!T2MediaLib.context || T2MediaLib.disabled) {
            T2MediaLib.soundDataAry[idx].onError("FUNC_DISABLED_ERROR");
            return null;
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3|mp4|m4a)$/,".ogg");
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    T2MediaLib.soundDataAry[idx].onLoadComplete(arrayBuffer);
                    if (callbacks && callbacks.succ) callbacks.succ(idx);
                } else {
                    T2MediaLib.soundDataAry[idx].onError("XHR_RESPONSE_ERROR");
                    if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
                }
            } else {
                T2MediaLib.soundDataAry[idx].onError("XHR_STATUS_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
            }
        };
        xhr.onerror=function (e) {//@hoge1e3
            T2MediaLib.soundDataAry[idx].onError("XHR_ERROR");
            if (callbacks && callbacks.err) callbacks.err(idx,e+"");
        };

        T2MediaLib.soundDataAry[idx].onLoad(url);
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
    decodeSound: function(idx, callbacks) {
        var soundData = T2MediaLib.soundDataAry[idx];
        if (soundData == null) return;

        var arrayBuffer = soundData.fileData;
        soundData.onDecode();
        if (soundData.url.match(/\.(midi?)$/) || soundData.url.match(/^data:audio\/mid/)) {
            // Midi
            // PicoAudio.jsにデコードしてもらう
            if (T2MediaLib.picoAudio == null) {
                T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
            }
            var smf = new Uint8Array(arrayBuffer);
            var data = T2MediaLib.picoAudio.parseSMF(smf);
            T2MediaLib.soundDataAry[idx].onDecodeComplete(data);
            if (callbacks && callbacks.succ) callbacks.succ(idx);
        } else {
            // MP3, Ogg, AAC, WAV
            var successCallback = function(audioBuffer) {
                T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
                if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
            };
            var errorCallback = function(error) {
                if (error instanceof Error) {
                    console.log('T2MediaLib: '+error.message, soundData.url);//@hoge1e3
                } else {
                    console.log('T2MediaLib: Error decodeAudioData()', soundData.url);//@hoge1e3
                }
                T2MediaLib.soundDataAry[idx].onError("DECODE_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx, T2MediaLib.soundDataAry[idx]);//@hoge1e3
            };
            T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
        }
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
             //ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
             ary[i] = 0; // 無音化
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
    getSoundData : function(idx) {
        var soundDataObj = T2MediaLib.soundDataAry[idx];
        if (soundDataObj) {
            return soundDataObj.getDecodedData();
        } else {
            return null;
        }
    },

    // SEメソッド郡 //

    playSE : function(idx, vol, pan, rate, offset, loop, loopStart, loopEnd) {
        if (!T2MediaLib.context) return null;
        var soundData = T2MediaLib.soundDataAry[idx];
        if (soundData == null) return null;
        if (!soundData.isDecodeComplete()) {
            var callbacks = {};
            callbacks.succ = function() {
                T2MediaLib.playSE(idx, vol, pan, rate, offset, loop, loopStart, loopEnd);
            };
            callbacks.err = function() {
            };
            T2MediaLib.decodeSound(idx, callbacks);
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
        var panNode = T2MediaLib.context.createPanner();

        source.buffer = audioBuffer;
        source.loop = loop;
        source.loopStart = loopStart;
        source.loopEnd = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 音量＆パン設定
        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(T2MediaLib.context.destination);
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
        gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;

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
        source.playStartTime = T2MediaLib.context.currentTime;
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;

        if (offset) {
            if (loop) source.start(0, offset, 86400);
            else      source.start(0, offset);
        } else {
            source.start(0);
        }

        source.onended = function(event) {
            source.disconnect();
            source.onended = null;
            delete source.gainNode;
            delete source.panNode;
        };

        return source;
    },
    stopSE : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    getSEMasterVolume : function() {
        return T2MediaLib.seMasterVolume;
    },
    setSEMasterVolume : function(vol) {
        T2MediaLib.seMasterVolume = vol;
    },
    getSEVolume : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return source.volumeValue;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;
        source.volumeValue = vol;
        return sourceObj;
    },
    getSERate : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.playbackRate.value;
    },
    setSERate : function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    },
    getSEPan : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.panValue;
    },
    setSEPan : function(sourceObj, pan) {
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
    },
    isSELoop : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loop;
    },
    setSELoop : function(sourceObj, loop) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loop = loop;
    },
    getSELoopStartTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopStart;
    },
    setSELoopStartTime : function(sourceObj, loopStart) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopStart = loopStart;
    },
    getSELoopEndTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopEnd;
    },
    setSELoopEndTime : function(sourceObj, loopEnd) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopEnd = loopEnd;
    },

    // BGMメソッド郡 //

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
    getBGMMasterVolume : function() {
        return T2MediaLib.bgmMasterVolume;
    },
    setBGMMasterVolume : function(vol) {
        T2MediaLib.bgmMasterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },
    getBGMVolume : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMVolume();
    },
    setBGMVolume : function(id, vol) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMVolume(vol);
    },
    getBGMTempo : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMTempo();
    },
    setBGMTempo : function(id, tempo) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMTempo(tempo);
    },
    getBGMPan : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMPan();
    },
    setBGMPan : function(id, pan) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMPan(pan);
    },
    isBGMLoop : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.isBGMLoop();
    },
    setBGMLoop : function(id, loop) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoop(loop);
    },
    getBGMLoopStartTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopStartTime();
    },
    setBGMLoopStartTime : function(id, loopStart) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopStartTime(loopStart);
    },
    getBGMLoopEndTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopEndTime();
    },
    setBGMLoopEndTime : function(id, loopEnd) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopEndTime(loopEnd);
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
    getPlayingBGMName : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getPlayingBGMName();
    },
    setOnBGMEndListener : function(id, listener) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setOnBGMEndListener(listener);
    },
    getBGMPlayerMax : function() {
        return T2MediaLib.bgmPlayerMax;
    },
    allStopBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
        }
    },
    allResetBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
            T2MediaLib.setBGMVolume(i, 1.0);
            T2MediaLib.setBGMTempo(i, 1.0);
            T2MediaLib.setBGMPan(i, 0.0);
        }
        T2MediaLib.setMasterVolume(1.0);
        T2MediaLib.setSEMasterVolume(1.0);
        T2MediaLib.setBGMMasterVolume(1.0);
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
requireSimulator.setName('difflib');
/***
This is part of jsdifflib v1.0. <http://snowtide.com/jsdifflib>

Copyright (c) 2007, Snowtide Informatics Systems, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this
		list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
		this list of conditions and the following disclaimer in the documentation
		and/or other materials provided with the distribution.
	* Neither the name of the Snowtide Informatics Systems nor the names of its
		contributors may be used to endorse or promote products derived from this
		software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
***/
/* Author: Chas Emerick <cemerick@snowtide.com> */
__whitespace = {" ":true, "\t":true, "\n":true, "\f":true, "\r":true};

difflib = {
	defaultJunkFunction: function (c) {
		return __whitespace.hasOwnProperty(c);
	},
	
	stripLinebreaks: function (str) { return str.replace(/^[\n\r]*|[\n\r]*$/g, ""); },
	
	stringAsLines: function (str) {
		var lfpos = str.indexOf("\n");
		var crpos = str.indexOf("\r");
		var linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? "\n" : "\r";
		
		var lines = str.split(linebreak);
		for (var i = 0; i < lines.length; i++) {
			lines[i] = difflib.stripLinebreaks(lines[i]);
		}
		
		return lines;
	},
	
	// iteration-based reduce implementation
	__reduce: function (func, list, initial) {
		if (initial != null) {
			var value = initial;
			var idx = 0;
		} else if (list) {
			var value = list[0];
			var idx = 1;
		} else {
			return null;
		}
		
		for (; idx < list.length; idx++) {
			value = func(value, list[idx]);
		}
		
		return value;
	},
	
	// comparison function for sorting lists of numeric tuples
	__ntuplecomp: function (a, b) {
		var mlen = Math.max(a.length, b.length);
		for (var i = 0; i < mlen; i++) {
			if (a[i] < b[i]) return -1;
			if (a[i] > b[i]) return 1;
		}
		
		return a.length == b.length ? 0 : (a.length < b.length ? -1 : 1);
	},
	
	__calculate_ratio: function (matches, length) {
		return length ? 2.0 * matches / length : 1.0;
	},
	
	// returns a function that returns true if a key passed to the returned function
	// is in the dict (js object) provided to this function; replaces being able to
	// carry around dict.has_key in python...
	__isindict: function (dict) {
		return function (key) { return dict.hasOwnProperty(key); };
	},
	
	// replacement for python's dict.get function -- need easy default values
	__dictget: function (dict, key, defaultValue) {
		return dict.hasOwnProperty(key) ? dict[key] : defaultValue;
	},	
	
	SequenceMatcher: function (a, b, isjunk) {
		this.set_seqs = function (a, b) {
			this.set_seq1(a);
			this.set_seq2(b);
		}
		
		this.set_seq1 = function (a) {
			if (a == this.a) return;
			this.a = a;
			this.matching_blocks = this.opcodes = null;
		}
		
		this.set_seq2 = function (b) {
			if (b == this.b) return;
			this.b = b;
			this.matching_blocks = this.opcodes = this.fullbcount = null;
			this.__chain_b();
		}
		
		this.__chain_b = function () {
			var b = this.b;
			var n = b.length;
			var b2j = this.b2j = {};
			var populardict = {};
			for (var i = 0; i < b.length; i++) {
				var elt = b[i];
				if (b2j.hasOwnProperty(elt)) {
					var indices = b2j[elt];
					if (n >= 200 && indices.length * 100 > n) {
						populardict[elt] = 1;
						delete b2j[elt];
					} else {
						indices.push(i);
					}
				} else {
					b2j[elt] = [i];
				}
			}
	
			for (var elt in populardict) {
				if (populardict.hasOwnProperty(elt)) {
					delete b2j[elt];
				}
			}
			
			var isjunk = this.isjunk;
			var junkdict = {};
			if (isjunk) {
				for (var elt in populardict) {
					if (populardict.hasOwnProperty(elt) && isjunk(elt)) {
						junkdict[elt] = 1;
						delete populardict[elt];
					}
				}
				for (var elt in b2j) {
					if (b2j.hasOwnProperty(elt) && isjunk(elt)) {
						junkdict[elt] = 1;
						delete b2j[elt];
					}
				}
			}
	
			this.isbjunk = difflib.__isindict(junkdict);
			this.isbpopular = difflib.__isindict(populardict);
		}
		
		this.find_longest_match = function (alo, ahi, blo, bhi) {
			var a = this.a;
			var b = this.b;
			var b2j = this.b2j;
			var isbjunk = this.isbjunk;
			var besti = alo;
			var bestj = blo;
			var bestsize = 0;
			var j = null;
	
			var j2len = {};
			var nothing = [];
			for (var i = alo; i < ahi; i++) {
				var newj2len = {};
				var jdict = difflib.__dictget(b2j, a[i], nothing);
				for (var jkey in jdict) {
					if (jdict.hasOwnProperty(jkey)) {
						j = jdict[jkey];
						if (j < blo) continue;
						if (j >= bhi) break;
						newj2len[j] = k = difflib.__dictget(j2len, j - 1, 0) + 1;
						if (k > bestsize) {
							besti = i - k + 1;
							bestj = j - k + 1;
							bestsize = k;
						}
					}
				}
				j2len = newj2len;
			}
	
			while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]) {
				besti--;
				bestj--;
				bestsize++;
			}
				
			while (besti + bestsize < ahi && bestj + bestsize < bhi &&
					!isbjunk(b[bestj + bestsize]) &&
					a[besti + bestsize] == b[bestj + bestsize]) {
				bestsize++;
			}
	
			while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]) {
				besti--;
				bestj--;
				bestsize++;
			}
			
			while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) &&
					a[besti + bestsize] == b[bestj + bestsize]) {
				bestsize++;
			}
	
			return [besti, bestj, bestsize];
		}
		
		this.get_matching_blocks = function () {
			if (this.matching_blocks != null) return this.matching_blocks;
			var la = this.a.length;
			var lb = this.b.length;
	
			var queue = [[0, la, 0, lb]];
			var matching_blocks = [];
			var alo, ahi, blo, bhi, qi, i, j, k, x;
			while (queue.length) {
				qi = queue.pop();
				alo = qi[0];
				ahi = qi[1];
				blo = qi[2];
				bhi = qi[3];
				x = this.find_longest_match(alo, ahi, blo, bhi);
				i = x[0];
				j = x[1];
				k = x[2];
	
				if (k) {
					matching_blocks.push(x);
					if (alo < i && blo < j)
						queue.push([alo, i, blo, j]);
					if (i+k < ahi && j+k < bhi)
						queue.push([i + k, ahi, j + k, bhi]);
				}
			}
			
			matching_blocks.sort(difflib.__ntuplecomp);
	
			var i1 = j1 = k1 = block = 0;
			var non_adjacent = [];
			for (var idx in matching_blocks) {
				if (matching_blocks.hasOwnProperty(idx)) {
					block = matching_blocks[idx];
					i2 = block[0];
					j2 = block[1];
					k2 = block[2];
					if (i1 + k1 == i2 && j1 + k1 == j2) {
						k1 += k2;
					} else {
						if (k1) non_adjacent.push([i1, j1, k1]);
						i1 = i2;
						j1 = j2;
						k1 = k2;
					}
				}
			}
			
			if (k1) non_adjacent.push([i1, j1, k1]);
	
			non_adjacent.push([la, lb, 0]);
			this.matching_blocks = non_adjacent;
			return this.matching_blocks;
		}
		
		this.get_opcodes = function () {
			if (this.opcodes != null) return this.opcodes;
			var i = 0;
			var j = 0;
			var answer = [];
			this.opcodes = answer;
			var block, ai, bj, size, tag;
			var blocks = this.get_matching_blocks();
			for (var idx in blocks) {
				if (blocks.hasOwnProperty(idx)) {
					block = blocks[idx];
					ai = block[0];
					bj = block[1];
					size = block[2];
					tag = '';
					if (i < ai && j < bj) {
						tag = 'replace';
					} else if (i < ai) {
						tag = 'delete';
					} else if (j < bj) {
						tag = 'insert';
					}
					if (tag) answer.push([tag, i, ai, j, bj]);
					i = ai + size;
					j = bj + size;
					
					if (size) answer.push(['equal', ai, i, bj, j]);
				}
			}
			
			return answer;
		}
		
		// this is a generator function in the python lib, which of course is not supported in javascript
		// the reimplementation builds up the grouped opcodes into a list in their entirety and returns that.
		this.get_grouped_opcodes = function (n) {
			if (!n) n = 3;
			var codes = this.get_opcodes();
			if (!codes) codes = [["equal", 0, 1, 0, 1]];
			var code, tag, i1, i2, j1, j2;
			if (codes[0][0] == 'equal') {
				code = codes[0];
				tag = code[0];
				i1 = code[1];
				i2 = code[2];
				j1 = code[3];
				j2 = code[4];
				codes[0] = [tag, Math.max(i1, i2 - n), i2, Math.max(j1, j2 - n), j2];
			}
			if (codes[codes.length - 1][0] == 'equal') {
				code = codes[codes.length - 1];
				tag = code[0];
				i1 = code[1];
				i2 = code[2];
				j1 = code[3];
				j2 = code[4];
				codes[codes.length - 1] = [tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)];
			}
	
			var nn = n + n;
			var group = [];
			var groups = [];
			for (var idx in codes) {
				if (codes.hasOwnProperty(idx)) {
					code = codes[idx];
					tag = code[0];
					i1 = code[1];
					i2 = code[2];
					j1 = code[3];
					j2 = code[4];
					if (tag == 'equal' && i2 - i1 > nn) {
						group.push([tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n)]);
						groups.push(group);
						group = [];
						i1 = Math.max(i1, i2-n);
						j1 = Math.max(j1, j2-n);
					}
					
					group.push([tag, i1, i2, j1, j2]);
				}
			}
			
			if (group && !(group.length == 1 && group[0][0] == 'equal')) groups.push(group)
			
			return groups;
		}
		
		this.ratio = function () {
			matches = difflib.__reduce(
							function (sum, triple) { return sum + triple[triple.length - 1]; },
							this.get_matching_blocks(), 0);
			return difflib.__calculate_ratio(matches, this.a.length + this.b.length);
		}
		
		this.quick_ratio = function () {
			var fullbcount, elt;
			if (this.fullbcount == null) {
				this.fullbcount = fullbcount = {};
				for (var i = 0; i < this.b.length; i++) {
					elt = this.b[i];
					fullbcount[elt] = difflib.__dictget(fullbcount, elt, 0) + 1;
				}
			}
			fullbcount = this.fullbcount;
	
			var avail = {};
			var availhas = difflib.__isindict(avail);
			var matches = numb = 0;
			for (var i = 0; i < this.a.length; i++) {
				elt = this.a[i];
				if (availhas(elt)) {
					numb = avail[elt];
				} else {
					numb = difflib.__dictget(fullbcount, elt, 0);
				}
				avail[elt] = numb - 1;
				if (numb > 0) matches++;
			}
			
			return difflib.__calculate_ratio(matches, this.a.length + this.b.length);
		}
		
		this.real_quick_ratio = function () {
			var la = this.a.length;
			var lb = this.b.length;
			return _calculate_ratio(Math.min(la, lb), la + lb);
		}
		
		this.isjunk = isjunk ? isjunk : difflib.defaultJunkFunction;
		this.a = this.b = null;
		this.set_seqs(a, b);
	}
};


requireSimulator.setName('diffview');
/*
This is part of jsdifflib v1.0. <http://github.com/cemerick/jsdifflib>

Copyright 2007 - 2011 Chas Emerick <cemerick@snowtide.com>. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Chas Emerick ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Chas Emerick OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Chas Emerick.
*/
diffview = {
	/**
	 * Builds and returns a visual diff view.  The single parameter, `params', should contain
	 * the following values:
	 *
	 * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
	 * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
	 * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
	 * - baseTextName: the title to be displayed above the base text listing in the diff view; defaults
	 *	   to "Base Text"
	 * - newTextName: the title to be displayed above the new text listing in the diff view; defaults
	 *	   to "New Text"
	 * - contextSize: the number of lines of context to show around differences; by default, all lines
	 *	   are shown
	 * - viewType: if 0, a side-by-side diff view is generated (default); if 1, an inline diff view is
	 *	   generated
	 */
	buildView: function (params) {
		var baseTextLines = params.baseTextLines;
		var newTextLines = params.newTextLines;
		var opcodes = params.opcodes;
		var baseTextName = params.baseTextName ? params.baseTextName : "Base Text";
		var newTextName = params.newTextName ? params.newTextName : "New Text";
		var contextSize = params.contextSize;
		var inline = (params.viewType == 0 || params.viewType == 1) ? params.viewType : 0;

		if (baseTextLines == null)
			throw "Cannot build diff view; baseTextLines is not defined.";
		if (newTextLines == null)
			throw "Cannot build diff view; newTextLines is not defined.";
		if (!opcodes)
			throw "Canno build diff view; opcodes is not defined.";
		
		function celt (name, clazz) {
			var e = document.createElement(name);
			e.className = clazz;
			return e;
		}
		
		function telt (name, text) {
			var e = document.createElement(name);
			e.appendChild(document.createTextNode(text));
			return e;
		}
		
		function ctelt (name, clazz, text) {
			var e = document.createElement(name);
			e.className = clazz;
			e.appendChild(document.createTextNode(text));
			return e;
		}
	
		var tdata = document.createElement("thead");
		var node = document.createElement("tr");
		tdata.appendChild(node);
		if (inline) {
			node.appendChild(document.createElement("th"));
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", baseTextName + " vs. " + newTextName));
		} else {
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", baseTextName));
			node.appendChild(document.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", newTextName));
		}
		tdata = [tdata];
		
		var rows = [];
		var node2;
		
		/**
		 * Adds two cells to the given row; if the given row corresponds to a real
		 * line number (based on the line index tidx and the endpoint of the 
		 * range in question tend), then the cells will contain the line number
		 * and the line of text from textLines at position tidx (with the class of
		 * the second cell set to the name of the change represented), and tidx + 1 will
		 * be returned.	 Otherwise, tidx is returned, and two empty cells are added
		 * to the given row.
		 */
		function addCells (row, tidx, tend, textLines, change) {
			if (tidx < tend) {
				row.appendChild(telt("th", (tidx + 1).toString()));
				row.appendChild(ctelt("td", change, textLines[tidx].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")));
				return tidx + 1;
			} else {
				row.appendChild(document.createElement("th"));
				row.appendChild(celt("td", "empty"));
				return tidx;
			}
		}
		
		function addCellsInline (row, tidx, tidx2, textLines, change) {
			row.appendChild(telt("th", tidx == null ? "" : (tidx + 1).toString()));
			row.appendChild(telt("th", tidx2 == null ? "" : (tidx2 + 1).toString()));
			row.appendChild(ctelt("td", change, textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")));
		}
		
		for (var idx = 0; idx < opcodes.length; idx++) {
			code = opcodes[idx];
			change = code[0];
			var b = code[1];
			var be = code[2];
			var n = code[3];
			var ne = code[4];
			var rowcnt = Math.max(be - b, ne - n);
			var toprows = [];
			var botrows = [];
			for (var i = 0; i < rowcnt; i++) {
				// jump ahead if we've alredy provided leading context or if this is the first range
				if (contextSize && opcodes.length > 1 && ((idx > 0 && i == contextSize) || (idx == 0 && i == 0)) && change=="equal") {
					var jump = rowcnt - ((idx == 0 ? 1 : 2) * contextSize);
					if (jump > 1) {
						toprows.push(node = document.createElement("tr"));
						
						b += jump;
						n += jump;
						i += jump - 1;
						node.appendChild(telt("th", "..."));
						if (!inline) node.appendChild(ctelt("td", "skip", ""));
						node.appendChild(telt("th", "..."));
						node.appendChild(ctelt("td", "skip", ""));
						
						// skip last lines if they're all equal
						if (idx + 1 == opcodes.length) {
							break;
						} else {
							continue;
						}
					}
				}
				
				toprows.push(node = document.createElement("tr"));
				if (inline) {
					if (change == "insert") {
						addCellsInline(node, null, n++, newTextLines, change);
					} else if (change == "replace") {
						botrows.push(node2 = document.createElement("tr"));
						if (b < be) addCellsInline(node, b++, null, baseTextLines, "delete");
						if (n < ne) addCellsInline(node2, null, n++, newTextLines, "insert");
					} else if (change == "delete") {
						addCellsInline(node, b++, null, baseTextLines, change);
					} else {
						// equal
						addCellsInline(node, b++, n++, baseTextLines, change);
					}
				} else {
					b = addCells(node, b, be, baseTextLines, change);
					n = addCells(node, n, ne, newTextLines, change);
				}
			}

			for (var i = 0; i < toprows.length; i++) rows.push(toprows[i]);
			for (var i = 0; i < botrows.length; i++) rows.push(botrows[i]);
		}
		
		rows.push(node = ctelt("th", "author", "diff view generated by "));
		node.setAttribute("colspan", inline ? 3 : 4);
		node.appendChild(node2 = telt("a", "jsdifflib"));
		node2.setAttribute("href", "http://github.com/cemerick/jsdifflib");
		
		tdata.push(node = document.createElement("tbody"));
		for (var idx in rows) rows.hasOwnProperty(idx) && node.appendChild(rows[idx]);
		
		node = celt("table", "diff" + (inline ? " inlinediff" : ""));
		for (var idx in tdata) tdata.hasOwnProperty(idx) && node.appendChild(tdata[idx]);
		return node;
	}
};


requireSimulator.setName('DiffDialog');
define(["UI","difflib","diffview"], function (UI,difflib,diffview) {
    var res={};
	res.show=function (baseFile, newFile, options) {
    	var d=res.embed(baseFile, newFile, options);
    	d.dialog({width:600,height:500});
	};
	res.embed=function (baseFile, newFile, options) {
        if (!res.d) {
            var FType={
                    fromVal: function (val){
                        return val=="" ? null : FS.get(val);
                    },
                    toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"比較"},
        			["div",
        			 ["input",{style:"background-color: #f88;",
        			     $edit:{name:"baseFile",type:FType},size:60}],["br"],
                     ["input",{style:"background-color: #8f8;",
                         $var:"newFile",
                         $edit:{name:"newFile",type:FType},size:60}]
        			],
                    ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.done();
                 }}}, "比較"],
      			["div",{$var: "diffoutput", css:{height:"350px", overflow:"scroll"}}]
            );
        }
        var d=res.d;
        var model={baseFile:baseFile , newFile:newFile};
        d.$edits.load(model);
        function isValidFile(f) {
            return f && !f.isDir() && f.exists() ;
        }
    	d.$edits.validator.on.validate=function (model) {
    	    if (!isValidFile(model.newFile)  ) {
    	        this.addError("new",newFile+"は存在しないか，ディレクトリです");
    	    } else if (!isValidFile(model.baseFile)  ) {
                this.addError("base",baseFile+"は存在しないか，ディレクトリです");
    	    } else {
    	        this.allOK();
    	    }
    	    /*
    	    if ( isValidFile(model.baseFile) && !isValidFile(model.newFile)  ) {
    	        model.newFile=(model.newFile ? model.newFile.rel(model.baseFile.name()) : model.baseFile) ;
    	        d.$vars.newFile.val(model.newFile+"");
    	    }*/
    	};
    	res.done=function () {
    	    var base = difflib.stringAsLines(model.baseFile.text());
    	    var newtxt = difflib.stringAsLines(model.newFile.text());

    	    var sm = new difflib.SequenceMatcher(base, newtxt);

    	    // get the opcodes from the SequenceMatcher instance
    	    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    	    // in order to yield the new text
    	    var opcodes = sm.get_opcodes();
    	    var diffoutputdiv = d.$vars.diffoutput[0];
    	    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    	    //var contextSize = $("contextSize").value;
    	    contextSize = null; //contextSize ? contextSize : null;

    	    // build the diff view and add it to the current DOM
    	    diffoutputdiv.appendChild(diffview.buildView({
    	        baseTextLines: base,
    	        newTextLines: newtxt,
    	        opcodes: opcodes,
    	        // set the display titles for each resource
    	        baseTextName: model.baseFile+"",
    	        newTextName: model.newFile+"",
    	        contextSize: contextSize,
    	        viewType: 1 //$("inline").checked ? 1 : 0
    	    }));

    		//onOK();
    	};
    	if (isValidFile(model.baseFile) && isValidFile(model.newFile)) {
    		res.done();
    	}
    	return d;
    };
    return res;
});
requireSimulator.setName('KernelDiffDialog');
define(["UI","DiffDialog","Shell"], function (UI,dd,sh) {
    var res={};
	res.show=function (devDir, kernelDir , options) {
    	var d=res.embed(devDir, kernelDir, options);
    	d.dialog({width:250,height:400});
	};
	res.embed=function (devDir, kernelDir, options) {
        if (!res.d) {
        	res.d=UI("div",{title:"Kernel比較"},
        			["div", {$var:"out"}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.refresh();
                 }}}, "更新"]
            );
        }
        var d=res.d;
    	res.refresh=function () {
    		var out=d.$vars.out;
    		out.empty();
    		kernelDir.each(function (kerf) {
    			var devf=devDir.rel(kerf.relPath(kernelDir));
    			if (kerf.endsWith(".tonyu") && devf.exists()) {
    				if (kerf.text()==devf.text()) {
    					out.append(UI("div",kerf.name(),"(同一)"));
    				} else {
    					out.append(UI("div",
    							["a",{href:"javascript:;",on:{click:openDiagF(devf, kerf)}}, kerf.name()]
    					));
    				}
    			}
    		});
    	};
    	res.refresh();
    	return d;
    };
    function openDiagF(a,b) {
    	return function () {
    		dd.show(a,b);
    	};
    }
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
                var lcm=file.exists({includeTrashed:true}) && file.metaInfo();
                var rmm=data[rel];
                cmp(file,rel,lcm,rmm);
            }
            local.recursive(function (file) {
                var lcm=file.exists({includeTrashed:true}) && file.metaInfo();
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
        function cmp(f,rel,lcm,rmm) {// f:localFile
            if (visited[rel]) return ;
            visited[rel]=1;
            if (rmm && (!lcm || lcm.lastUpdate<rmm.lastUpdate)) {
                downloads.push(rel);
                if (options.v)
                    sh.echo((!lcm?"New":"")+
                            "Download "+f+
                            " trash="+!!rmm.trashed);
            } else if (lcm && (!rmm || lcm.lastUpdate>rmm.lastUpdate)) {
                var o=lcm.trashed ? {} : {text:f.text()};
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

requireSimulator.setName('searchDialog');
define(["UI","Shell"], function (UI,sh) {
    var res={};
    res.show=function (prjDir, onLineClick) {
        var d=res.embed(prjDir,onLineClick);
        d.dialog({width:600});
    };
    res.embed=function (prjDir, onLineClick) {
        if (!res.d) {
            res.d=UI("div",{title:"検索"},
                    ["div",
                     ["span","検索語"],
                     ["input",{$edit:"word",on:{enterkey:function () {
                         res.d.start();
                     }}}]],
                     ["div", {$var:"validationMessage", css:{color:"red"}}],
                     ["button", {$var:"OKButton", on:{click: function () {
                         res.d.start();
                     }}}, "検索"],
                     ["div",{style:"overflow-y:scroll; height:200px"},
                      ["table",{$var:"searchRes"}]]
            );
        }
        var d=res.d;
        var model={word:""};
        d.$edits.load(model);
        d.start=function () {
            d.$vars.searchRes.empty();
            var sres=sh.grep(model.word, prjDir);
            sres.forEach(function (l) {
                if (l.file.name()=="concat.js") {
                    return;
                }
                d.$vars.searchRes.append(
                        UI("tr",
                                ["td",{on:{click:doLineClick}},l.file.name()+"("+l.lineNo+")"],
                                ["td",{on:{click:doLineClick}},l.line]
                        ));
                function doLineClick() {
                    if (onLineClick) onLineClick(l);
                }
            });
        };
        return d;
    };
    return res;
});

requireSimulator.setName('syncWithKernel');
requirejs(["Shell","FS","WebSite"], function (sh,FS,WebSite) {
    sh.syncWithKernel=function (name) {
        var home=FS.get(WebSite.tonyuHome);
        var ker=home.rel("Kernel/");
        if (name) {
            var prj=sh.resolve(name);
            var inKer=ker.rel(name);
            if (prj.lastUpdate()>inKer.lastUpdate()) {
                sh.cp(prj, inKer,{v:1});
                return 1;
            }
            if (prj.lastUpdate()<inKer.lastUpdate()) {
                sh.cp(inKer,prj,{v:1});
                return 1;
            }
            return 0;
            //return sh.cp( name, ker.rel(name));
        } else {
            var cps=0;
            ker.each(function (f) {
                var src=sh.resolve(f.name());
                if (src.exists()) {
                    cps+= sh.syncWithKernel(f.name());
                }
            });
            return cps;
        }
    };
});
requireSimulator.setName('ImageDetailEditor');
define(["UI","ImageList","ImageRect","PatternParser","WebSite","Assets"],
        function (UI,ImageList,ImageRect,PP,WebSite,Assets) {
    var d=UI("div",{title:"画像詳細"},
            ["div",
             ["div","URL:",["input",{$var:"url",size:40,on:{change:setURL}}],
               ["a",{$var:"openImg",target:"img"},"画像を確認..."]],
             ["canvas",{$edit:"cv",width:500,height:250,on:{mousemove:cvMouse,mousedown:cvClick}}] ],
             ["form",{$var:"theForm"},
               ["div",radio("single"),"１枚絵"],
               ["div",radio("rc"),"分割数指定：",
                ["input",{$var:"cols",size:5,on:{realtimechange:setRC,focus:selRC}}],"x",
                ["input",{$var:"rows",size:5,on:{realtimechange:setRC,focus:selRC}}]],
               ["div",radio("wh"),"1パターンの大きさ指定：",
                ["input",{$var:"pwidth",size:5,on:{realtimechange:setWH,focus:selWH}}],"x",
                ["input",{$var:"pheight",size:5,on:{realtimechange:setWH,focus:selWH}}]],
               ["div",radio("t1"),"Tonyu1互換",
                 ["button",{on:{click:tonyu1}},"解析"]],
               ["div","パターン番号:",["input",{$var:"patName"}] ],
               ["button",{on:{click:close}},"OK"]]
    );
    function radio(v) {
        return UI("input",{type:"radio",name:"type",value:v,on:{
            click:function (){selval(v);}
        }});
    }
    function selval(v) {
        switch (v) {
        case "single":
            if (!item) return false;
            cols=1;//nNan( parseInt(v.cols.val()) ,cols);
            rows=1;//nNan( parseInt(v.rows.val()) ,rows);
            calcWH();
            redrawImage();
            return false;
        case "rc":
            return setRC();
        case "wh":
            return setWH();
        }
    }
    var v=d.$vars;
    var w,h,rows,cols;
    var IMD={};
    var item;
    var srcImg;
    var onclose;
    var canvasRect;
    var chipRects, curChipIndex=-1;
    var curItemName;
    function setURL() {
        if (item) item.url=v.url.val();
    }
    function selRC() {
        v.theForm[0].type.value="rc";
    }
    function selWH() {
        v.theForm[0].type.value="wh";
    }
    function selSingle() {
        v.theForm[0].type.value="single";
    }
    IMD.show=function (_item,prj, itemName, options) {
        if (!options) options={};
        onclose=options.onclose;
        item=_item;
        curItemName=itemName;
        d.dialog({width:600,height:520});
        v.url.val(item.url);
        var url=Assets.resolve(item.url,prj);
        v.openImg.attr("href",url);
        ImageRect(url, v.cv[0])(function (res) {
            canvasRect=res;
            console.log(res);
            srcImg=res.src;
            w=srcImg.width;
            h=srcImg.height;
            if (item.type=="single") {
                v.theForm[0].type.value="single";
            } else if (item.pwidth && item.pheight) {
                v.pwidth.val(item.pwidth);
                v.pheight.val(item.pheight);
                calcRC();
                v.theForm[0].type.value="wh";
            } else {
                v.theForm[0].type.value="t1";
            }
            drawFrame();
        });
    };
    function redrawImage() {
        var ctx=v.cv[0].getContext("2d");
        var r=canvasRect;
        if (!r) return;
        if (!srcImg) return;
        ctx.clearRect( r.left, r.top, r.width, r.height);
        ctx.drawImage(srcImg, 0,0,w,h, r.left, r.top, r.width, r.height);
        drawFrame();
    }
    function drawFrame() {
        var rects=ImageList.parse1(item, srcImg, {boundsInSrc:true});
//        console.log("drawFrame", rects);
        var ctx=v.cv[0].getContext("2d");
        rects.forEach(function (r) {
            rect(ctx,calcRect(r));
        });
        chipRects=rects;
    }
    function inRect(point,rect) {
        return rect.left<= point.x && point.x<= rect.left+rect.width &&
               rect.top<=point.y && point.y<=rect.top+rect.height ;
    }
    function calcRect(r) { // rect in srcImg:{x,y,width,height}
        var s={};  // returns rect in canvas(v.cv):{left,top,width,hegiht};
        var scaleX=canvasRect.width/w;
        var scaleY=canvasRect.height/h;
        s.left=canvasRect.left+r.x*scaleX;
        s.top=canvasRect.top+r.y*scaleY;
        s.width=r.width*scaleX;
        s.height=r.height*scaleY;
        return s;
    }
    function cvMouse(e) {
        var ctx=v.cv[0].getContext("2d");
        var o=v.cv.offset();
        var p={x:e.pageX-o.left, y:e.pageY-o.top};
        if (!chipRects) {
            console.log("cvMouse");
            return;
        }
        chipRects.forEach(function (r,i) {
            var cr=calcRect(r);
            //console.log(p.x, p.y, cr);
            if (inRect(p,cr )) {
                var pc=chipRects[curChipIndex];
                if (pc) {
                    var pcr=calcRect(pc);
                    rect(ctx,pcr);
                }
                curChipIndex=i;
                rect(ctx,cr,"#ff0");
            }
        })
    }
    function cvClick() {
        var pc=chipRects[curChipIndex];
        if (pc) {
            var pv=curItemName+"+"+curChipIndex;
            v.patName.val(pv);
            copyToClipboard(pv);
        }
    }
    function rect(ctx,rect,col) {
        ctx.strokeStyle=col || "#f0f";
        ctx.beginPath();
        ctx.moveTo(rect.left,rect.top);
        ctx.lineTo(rect.left+rect.width,rect.top);
        ctx.lineTo(rect.left+rect.width,rect.top+rect.height);
        ctx.lineTo(rect.left,rect.top+rect.height);
        ctx.closePath();
        ctx.stroke();
    }
    function nNan(val,def) {
        if (val===val) return val;
        return def;
    }
    function setRC() {
        if (v.theForm[0].type.value!="rc") return false;
        if (!item) return false;
        //console.log("setRC");
        cols=nNan( parseInt(v.cols.val()) ,cols);
        rows=nNan( parseInt(v.rows.val()) ,rows);
        calcWH();
        redrawImage();
        return false;
    }
    function calcWH() {
        if (!item) return false;
        item.type="wh";
        item.pwidth=nNan( Math.floor(w/cols), item.pwidth);
        item.pheight=nNan( Math.floor(h/rows), item.pheight);
        v.pwidth.val(item.pwidth);
        v.pheight.val(item.pheight);
    }
    function setWH() {
        if (v.theForm[0].type.value!="wh") return false;
        if (!item) return false;
        //console.log("setWH");
        item.pwidth=nNan( parseInt(v.pwidth.val()), item.pwidth);
        item.pheight=nNan( parseInt(v.pheight.val()), item.pheight);
        calcRC();
        redrawImage();
        return false;
    }
    function calcRC() {
        if (!item) return false;
        cols=nNan( Math.floor(w/item.pwidth),cols);
        rows=nNan( Math.floor(h/item.pheight),rows);
        v.rows.val(rows);
        v.cols.val(cols);
    }
    function tonyu1() {
        if (!item) return false;
        delete item.pwidth;
        delete item.pheight;
        item.type="t1";
        v.theForm[0].type.value="t1";
        try {
            redrawImage();
        } catch (e) {
            alert(e);
        }
        /*var p=new PP(srcImg);
        p.parse();
        */
        return false;
    }
    function close() {
        d.dialog("close");
        if (onclose) onclose();
        return false;
    }
    function copyToClipboard(value) {
        if (!WebSite.isNW) return;
        var gui = require('nw.gui');
        var clipboard = gui.Clipboard.get();
        clipboard.set(value, 'text');
    }

    return IMD;
});

requireSimulator.setName('OggConverter');
define(["FS","WebSite"], function (FS,WebSite) {
    var C={};
    var spawn;//=require("child_process").spawn;
    if (WebSite.isNW) {spawn=require("child_process").spawn;}
    C.convert=function (dir) {
        if (!WebSite.isNW) return;
        var ffmpeg=FS.get(WebSite.ffmpeg);
        if (!ffmpeg.exists()) return;
        console.log("Convert ogg->mp3 ",dir.path());
        dir.each(function (src) {
            if (src.endsWith(".mp3") || src.endsWith(".mp4") || src.endsWith(".m4a")) {
                var ext;
                if (src.endsWith(".mp3")) ext=".mp3";
                if (src.endsWith(".mp4")) ext=".mp4";
                if (src.endsWith(".m4a")) ext=".m4a";
                var dst=src.up().rel(src.truncExt(ext)+".ogg");
                if (!dst.exists()) {
                    console.log("running",ffmpeg.path(),"-i",src.path(),dst.path());
                    var proc=spawn(ffmpeg.path(),["-i",src.path(),dst.path()]);
                    proc.stdin.end();
                }
            }
        });
    };
    return C;
});

requireSimulator.setName('ResEditor');
define(["FS","Tonyu","UI","ImageList","Blob","Auth","WebSite"
        ,"ImageDetailEditor","Util","OggConverter","Assets"],
        function (FS, Tonyu, UI,IL,Blob,Auth,WebSite,
                ImageDetailEditor,Util,OggConverter,Assets) {
    var ResEditor=function (prj, mediaType) {
        var mediaInfos={
                image:{name:"画像",exts:["png","gif","jpg"],path:"images/",key:"images",
                    extPattern:/\.(png|gif|jpe?g)$/i,contentType:/image\/(png|gif|jpe?g)/,
                    newItem:function (name) {
                        var r={type:"single"};//pwidth:32,pheight:32};
                        if (name) r.name="$pat_"+name;
                        return r;
                    }
                },
                sound:{name:"音声",exts:["mp3","ogg","mp4","m4a","mid","wav"],path:"sounds/",key:"sounds",
                    extPattern:/\.(mp3|ogg|mp4|m4a|midi?|wav)$/i,contentType:/((audio\/(mp3|ogg|x-m4a|midi?|wav))|(video\/mp4))/,
                    newItem:function (name) {
                        var r={};
                        if (name) r.name="$se_"+name;
                        return r;
                    }
                }
        };
        var mediaInfo=mediaInfos[mediaType||"image"];
        var d=UI("div", {title:mediaInfo.name+"リスト"});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var rsrcDir=prj.getDir().rel(mediaInfo.path);
        var itemUIs=[];
        if (!rsrc) prj.setResource({images:[],sounds:[]});
        function convURL(u) {
            try {
                if (Util.endsWith(u,".ogg")) {
                    u=WebSite.urlAliases["images/sound_ogg.png"];
                } else if (Util.endsWith(u,".mp3")) {
                    u=WebSite.urlAliases["images/sound_mp3.png"];
                } else if (Util.endsWith(u,".mp4")) {
                    u=WebSite.urlAliases["images/sound_mp4.png"];
                } else if (Util.endsWith(u,".m4a")) {
                    u=WebSite.urlAliases["images/sound_m4a.png"];
                } else if (Util.endsWith(u,".mid") || Util.endsWith(u,".midi")) {
                    u=WebSite.urlAliases["images/sound_mid.png"];
                } else if (Util.endsWith(u,".wav")) {
                    u=WebSite.urlAliases["images/sound_wav.png"];
                }
                return Assets.resolve(u,prj);
            }catch(e) {
                return WebSite.urlAliases["images/ecl.png"];
            }
        }
        function reload() {
            d.empty();
            var dragMsg="ここに"+mediaInfo.name+"ファイル("+mediaInfo.exts.join("/")+")をドラッグ＆ドロップして追加";
            var dragPoint=UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
            ).appendTo(d);
            rsrc=prj.getResource();
            var items=rsrc[mediaInfo.key];
            itemUIs=[];
            var itemTbl=UI("div").appendTo(d);
            items.forEach(function (item){
                var itemUI=genItemUI(item);
                itemUIs.push(itemUI);
                itemUI.appendTo(itemTbl);
            });
            d.append(UI("div",{style:"clear:left;"},
                         ["button", {on:{click:function (){ add();}}}, "追加"],
                         ["button", {on:{click:function (){ d.dialog("close"); }}}, "完了"]
            ));
            function dropAdd(e) {
                eo=e.originalEvent;
                var file = eo.dataTransfer.files[0];
                var useBlob=WebSite.serverType=="GAE" && (file.size>1000*300);
                if(!file.type.match(mediaInfo.contentType)) {
                    alert("このファイルは追加できません："+(file.name));
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
                var itemName=file.name.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                var itemExt="";
                if (file.name.match(mediaInfo.extPattern)) {
                    itemExt=RegExp.lastMatch.toLowerCase();
                }
                var v=mediaInfo.newItem(itemName);
                if (useBlob) {
                    Auth.assertLogin({
                        showLoginLink:function (u) {
                            dragPoint.css("border","solid red 2px").empty().append(
                                    UI("div","大きい"+mediaInfo.name+"を追加するには，ログインが必要です：",
                                       ["a",{href:u,target:"login",style:"color: blue;"},"ログインする"])
                            );
                        },success:function (u) {
                            dragPoint.text("アップロード中...");
                            var prjN=prj.getName();
                            Blob.upload(u,prjN,file,{success:function (){
                                dragPoint.text(dragMsg);
                                v.url="${blobPath}/"+u+"/"+prjN+"/"+file.name;
                                add(v);
                            }});
                        }
                    });
                } else {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        var itemFile=rsrcDir.rel(itemName+itemExt);
                        itemFile.setBytes(fileContent);
                        v.url="ls:"+itemFile.relPath(prj.getDir());// fileContent;
                        add(v);
                    };
                    reader.readAsArrayBuffer(file);
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            function s(e) {
                e.stopPropagation();
                e.preventDefault();

            }
            function genItemUI(item) {
                function detail() {
                    if (mediaType=="sound") return;
                    ImageDetailEditor.show(item, prj, item.name, {
                        onclose: function () {
                            prj.setResource(rsrc);
                            reload();
                        }
                    });
                }
                function del() {
                    for (var i=items.length-1; i>=0 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            break;
                        }
                    }
                    update();
                }
                function up() {
                    for (var i=items.length-1; i>=1 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            items.splice(i-1,0,item);
                            break;
                        }
                    }
                    update();
                }
                function down() {
                    for (var i=items.length-2; i>=0 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            items.splice(i+1,0,item);
                            break;
                        }
                    }
                    update();
                }

                var res=UI("div",{style:"float:left;"},
                        ["canvas",{$var:"c",width:100,height:100,"class":"clickable",on:{click: detail}}],
                        ["div",{style:"float:right;"},
                        ["button",{on:{click:del}}, "×"],["br"],
                        ["button",{on:{click:up}}, "←"],["br"],
                        ["button",{on:{click:down}}, "→"]],
                        ["div",
                            ["input", {$var:"name", size:12,value:item.name}]
                            ]
                   );
                draw(convURL(item.url),res.$vars.c[0]);
                var v=res.$vars;
                v.data=item;
                return res;
            }
            function add(v) {
                items.push(v || mediaInfo.newItem());
                update();
            }
        }
        function update() {
            itemUIs.forEach(function (itemUI) {
                var v=itemUI.$vars;
                var item=v.data;
                item.name=v.name.val();
            });
            console.log(rsrc);
            prj.setResource(rsrc);
            reload();
        }
        function cleanFiles() {
            var items=rsrc[mediaInfo.key];
            Auth.currentUser(function (u,ct) {
                if (!u) return;
                var rtf=[];
                items.forEach(function (item) {
                    var a,ogg;
                    if (a=Blob.isBlobURL(item.url)) {
                        rtf.push(a.fileName);
                        ogg=a.fileName.replace(/\.(mp3|mp4|m4a)$/,".ogg");
                        if (ogg!=a.fileName) rtf.push(ogg);
                    }
                });
                var data={
                        user:u,
                        project:prj.getName(),
                        mediaType:mediaType,
                        csrfToken:ct,
                        retainFileNames:JSON.stringify(rtf)
                };
                console.log("retainBlobs",data);
                //TODO: urlchange!
                $.ajax({url:WebSite.serverTop+"/retainBlobs",type:"get",
                    data:data
                });
            })
            var cleanFile={};
            if (rsrcDir.exists()) {
                rsrcDir.each(function (f) {
                    cleanFile["ls:"+f.relPath(prj.getDir())]=f;
                });
            }
            rsrc=prj.getResource();
            items.forEach(function (item){
                delete cleanFile[item.url];
                delete cleanFile[item.url.replace(/\.(mp3|mp4|m4a)$/,".ogg")];
            });
            console.log(cleanFile);
            for (var ci in cleanFile) {
                var cf=cleanFile[ci];
                console.log(cf+" is removed");
                cf.rm();
            }
        }
        function toi(s) {
            if (!s || s=="") return undefined;
            return parseInt(s);
        }
        reload();
        d.dialog({
            modal:true,
            width: 800,
            height: 500,
            close: function () {
                update();
                cleanFiles();
                if (mediaType=="sound") {
                    OggConverter.convert(rsrcDir);
                }
            }
        });
    };
    function draw(img, canvas) {
        if (typeof img=="string") {
            var i=new Image();
            i.onload=function () {
                draw(i,canvas);
            };
            i.src=img;
            return i;
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
    }
    return ResEditor;
});

requireSimulator.setName('MainClassDialog');
define(["UI"],function (UI) {
    var res={};
    res.show=function (prj, options) {
        var d=res.embed(prj, options);
        d.dialog({width:600});
        return d;
    };
    res.embed=function (prj, options) {
        if (!options) options={};

        if (!res.d) {
            res.d=UI("div",{title:"実行するクラスを選択"},
                    ["div",
                          ["select",{$var:"mainClass"}],
                          ["div", {$var:"validationMessage", css:{color:"red"}}],
                          ["button", {$var:"OKButton", on:{click: function () {
                              res.d.done(false);
                          }}}, "OK"],
                          ["button", {$var:"RunButton", on:{click: function () {
                              res.d.done(true);
                          }}}, "実行"]
                    ]
            );
        }
        var d=res.d;
        var v=res.d.$vars;
        prj.getDir();

        var opt=prj.getOptions();

        d.done=function (run) {
            opt.run.mainClass=v.mainClass.val();
            prj.setOptions(opt);
            if (options.on && options.on.done) {
                options.on.done(v.mainClass.val(),run);
            }
            d.dialog("close");
        };

        return d;
    };
    return res;
});
requireSimulator.setName('NWMenu');
(function () {
    var ifrm;// <iframe> element in parent window
    if (typeof process!="object") return {};
    function Menu(cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui')
        , menu = new gui.Menu()

        , cut = new gui.MenuItem({
            label: cutLabel || "Cut"
            , click: function() {
                document.execCommand("cut");
                console.log('Menu:', 'cutted to clipboard');
            }
        })

        , copy = new gui.MenuItem({
            label: copyLabel || "Copy"
            , click: function() {
                document.execCommand("copy");
                console.log('Menu:', 'copied to clipboard');
            }
        })

        , paste = new gui.MenuItem({
            label: pasteLabel || "Paste"
            , click: function() {
                document.execCommand("paste");
                console.log('Menu:', 'pasted to textarea');
            }
        })
        ;

        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    var menu = new Menu(/* pass cut, copy, paste labels if you need i18n*/);
    $(document).on("contextmenu", function(e) {
        e.preventDefault();
        var p={left:0,top:0};
        if (ifrm) {
            p=parent.$(ifrm).offset();
            console.log(p);
        }
        menu.popup(e.originalEvent.x+ Math.floor(p.left), e.originalEvent.y+Math.floor(p.top));
    });

    try {
        var gui = require('nw.gui');
        win = gui.Window.get();
        var nativeMenuBar = new gui.Menu({ type: "menubar" });
        nativeMenuBar.createMacBuiltin("My App");
        win.menu = nativeMenuBar;
    } catch (ex) {
        console.log(ex.message);
    }
    if (parent) {
        parent.$("iframe").each(function () {
            var fDoc = this.contentDocument || this.contentWindow.document;
            if (fDoc===document) {
                ifrm=this;
            }
        });
    }
    return {};
})();
requireSimulator.setName('extLink');
define(["WebSite","UI","PathUtil","Util","assert"],
        function (WebSite,UI,PathUtil,Util,assert) {
    var exec = (WebSite.isNW? require('child_process').exec : function (){});
    function extLink(href,caption,options) {
        var opt=getOpt(href);
        if (options) for (var k in options) opt[k]=options[k];
        return UI("a",opt,caption);
    };
    function getOpt(href) {
        var p=WebSite.platform;
        var opt;
        if (p=="win32") {
            opt={href:"javascript:;", on:{click: ext("start",href)}};
        } else if (p=="darwin") {
            opt={href:"javascript:;", on:{click: ext("open",href)}};
        } else {
            opt={href:href, target:"_new"};
        }
        return opt;
    }
    function ext(cmd, href) {
        return function () {
            exec(cmd+" "+href);
        };
    }
    extLink.all=function () {
        if (!WebSite.isNW) return;
        $("a").each(function () {
            var head=location.protocol+"//"+location.host+"/";
            var a=$(this);
            var href=a.attr("href");
            //console.log("href",href);
            if (href.match(/^http/) ) {
                var opt=assert.is( getOpt(href),
                        {href:String,on:{click:Function}} );
                a.attr("href",opt.href);
                a.click(opt.on.click);
            }
        });
    };
    return extLink;
});
requireSimulator.setName('mkrun');
define(["FS","Util","WebSite","plugins","Shell","Tonyu"],
        function (FS,Util,WebSite,plugins,sh,Tonyu) {
    var MkRun={};
    sh.mkrun=function (dest) {
        return MkRun.run( Tonyu.currentProject, FS.get(dest));
    };
    MkRun.run=function (prj,dest,options) {
        options=options||{};
        var prjDir=prj.getDir();
        var resc=prj.getResource();
        var opt=prj.getOptions();
        var loadFilesBuf="function loadFiles(dir){\n";
        var wwwDir=FS.get(WebSite.wwwDir);
        var jsDir=wwwDir.rel("js/");
        //var sampleImgDir=wwwDir.rel("images/");
        if (options.copySrc) copySrc();
        return $.when(
                copySampleImages(),
                convertLSURL(resc.images),
                convertLSURL(resc.sounds),
                genFilesJS(),
                copyScripts(),
                copyPlugins(),
                copyLibs(),
                copyResources("images/"),
                copyResources("sounds/"),
                copyIndexHtml(),
                genReadme()
        );

        function genReadme() {
            dest.rel("Readme.txt").text(
                    "このフォルダは、Webサーバにアップロードしないと正常に動作しない可能性があります。\n"+
                    "詳しくは\nhttp://hoge1e3.sakura.ne.jp/tonyu/tonyu2/runtime.html\nを御覧ください。\n"
            );
        }
        function copyResources(dir) {
            var src=prjDir.rel(dir);
            if (src.exists()) src.copyTo(dest.rel(dir));
        }
        function genFilesJS(){
            addFileToLoadFiles("res.json",resc);
            addFileToLoadFiles("options.json",opt);
            var mapd=prjDir.rel("maps/");
            if (mapd.exists()) {
                mapd.recursive(function (mf) {
                    addFileToLoadFiles( mf.relPath(prjDir), mf.obj());
                });
            }
            dest.rel("js/files.js").text(loadFilesBuf+"}");
        }
        function copyIndexHtml() {
            return wwwDir.rel("html/runtimes/index.html").copyTo(dest);
        }
        function copyScripts() {
            var usrjs=prjDir.rel("js/concat.js");
            var usrjsmap=prjDir.rel("js/concat.js.map");
            //TODO async...
            //dest.rel("js/concat.js").text(usrjs.text()+"\n//# sourceMappingURL=concat.js.map");// js/ is needed??
            var kerjs=FS.get(WebSite.kernelDir).rel("js/concat.js");
            var runScr2=jsDir.rel("gen/runScript2_concat.js");
            return $.when(
                usrjsmap.copyTo(dest.rel("js/concat.js.map")),
                usrjs.copyTo(dest.rel("js/concat.js")),
                kerjs.copyTo(dest.rel("js/kernel.js")),
                runScr2.copyTo(dest.rel("js/runScript2_concat.js"))
            );
        }
        function copyPlugins() {
            var pluginDir=jsDir.rel("plugins/");
            if (!opt.plugins) return;
            // TODO opt.plugins is now hash, but array is preferrable....
            var args=[];
            for (var n in opt.plugins) {
                // TODO if src not found, do not copy and use src directory(maybe http://....)
                var pf=pluginDir.rel(plugins.installed[n].src);
                args.push( pf.copyTo(dest.rel("js/plugins/")) );
            }
            return $.when.apply($,args);
        }
        function copyLibs() {
            return $.when(
                    jsDir.rel("lib/jquery-1.10.1.js").copyTo(dest.rel("js/lib/")),
                    jsDir.rel("lib/require.js").copyTo(dest.rel("js/lib/"))
            );
        }
        function addFileToLoadFiles(name, data) {
            loadFilesBuf+="\tdir.rel('"+name+"').obj("+JSON.stringify(data)+");\n";
        }
        function convertLSURL(r) {
            for (var k in r) {
                var url=r[k].url;
                if (Util.startsWith(url,"ls:")) {
                    var rel=url.substring("ls:".length);
                    r[k].url=rel;
                }
            }
        }
        function copySampleImages() {
            var urlAliases= {
                "images/Ball.png":1,
                "images/base.png":1,
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
            };
            var args=[];
            for (var k in resc.images) {
                var u= resc.images[k].url;
                if (urlAliases[u] && !prjDir.rel(u).exists()) {
                    var imgf=wwwDir.rel(u);
                    if (imgf.exists()) {
                        args.push( imgf.copyTo(dest.rel(u)) );
                    } else {
                        sh.echo(imgf+" not exists!");
                    }
                }
            }
            return $.when.apply($,args);
        }
        function copySrc() {
            prjDir.copyTo(dest.rel("src/"));
        }
    };
    return MkRun;
});

requireSimulator.setName('zip');
define(["FS","Shell","Util"/*"JSZip","FileSaver"*/],function (FS,sh,Util/*,JSZip,fileSaver*/) {
    if (typeof JSZip=="undefined") return {};
    var zip={};
    zip.zip=function (base,options) {
        var zip = new JSZip();
        function loop(dst, dir) {
            dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name());
                    loop(sf, f);
                } else {
                    if (f.isText()) {
                        dst.file(f.name(),f.text());
                    } else {
                        dst.file(f.name(),f.getBytes({binType:ArrayBuffer}));
                    }
                }
            });
        }
        loop(zip, base);
        //zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        return zip.generateAsync({type:"blob"});
    };
    if (typeof saveAs!="undefined") {
        zip.dlzip=function (dir) {
            return zip.zip(dir).then(function (content) {
                return saveAs(content, dir.name().replace(/\/$/,"")+".zip");
            });
        };
        sh.dlzip=function (dir) {
            dir=sh.resolve(dir||".");
            return zip.dlzip(dir);
            //var content=zip.zip(dir);
            //saveAs(content, dir.name().replace(/\//g,"")+".zip");
        };
    }
    // same as SFileNW.js
    var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
            ".mp3":"audio/mp3", ".ogg":"audio/ogg", ".mp4":"video/mp4", ".m4a":"audio/x-m4a", ".mid":"audio/mid", ".midi":"audio/mid", ".wav":"audio/wav"};
    zip.unzip=function (arrayBuf,destDir) {
        return JSZip.loadAsync(arrayBuf).then(function (zip) {
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
        });//new JSZip(arrayBuf);
    };
    return zip;
});

requireSimulator.setName('mkrunDiag');
define(["UI","extLink","mkrun","Tonyu","zip"], function (UI,extLink,mkrun,Tonyu,zip) {
    var res={};
    res.show=function (prj,dest,options) {
        var d=res.embed(prj,dest,options);
        d.dialog({width:800,height:300});
    };
    res.embed=function (prj,dest,options) {
        options=options||{};
        if (!res.d) {
            res.d=UI("div",{title:"ランタイム作成"},
                   ["span", {$var:"hiddenFolder"},
                    ["div",
                         ["label",{"for":"dest"},"出力フォルダ"],["br"],
                         ["input", {id:"dest",$edit:"dest",size:60}]
                    ],
                    ["div",
                         ["input", {id:"src",$edit:"zip",type:"checkbox"}],
                         ["label",{"for":"zip"},"ZIP圧縮したものを保存する"]
                    ]],
                    ["div",
                       ["input", {id:"src",$edit:"src",type:"checkbox"}],
                       ["label",{"for":"src"},"ソースを添付する"]
                    ],
                    ["button", {$var:"OKButton", on:{click: function () {
                         res.run();
                    }}}, "作成"]
            );
        }
        res.d.$vars.OKButton.prop("disabled", false);
        if (options.hiddenFolder) {
            res.d.$vars.hiddenFolder.hide();
        } else {
            res.d.$vars.hiddenFolder.show();
        }
        var model={dest:dest.path(), src:true, zip:true};
        res.d.$edits.load(model);
        res.run=function () {
            res.d.$vars.OKButton.prop("disabled", true);
            return mkrun.run(prj, FS.get(model.dest), {copySrc:model.src}).then(function () {
                if (model.zip) {
                    zip.dlzip(FS.get(model.dest));
                }
                UIDiag.alert(UI("div",
                         ["p",(options.hiddenFolder?"":
                         ["a",{href:"javascript:;",style:"color: blue;",on:{click:openFolder}},model.dest+"に"]),
                         "ランタイムを作成しました。"],
                         ["p","次のいずれかの方法でWebアプリとして公開することができます。"],
                         ["ul",
                         ["li",(model.zip?"解凍した":"")+"フォルダをお手持ちのWebサーバにアップロードする"],
                         ["li",(model.zip?"保存したZIPファイルを":"上のフォルダをZIPで圧縮したものを"),
                          extLink("http://hoge1e3.sakura.ne.jp/tonyu/project/",
                                  "プロジェクトボード",{style:"color: blue;"}),
                          "にアップロードする"]]
                        ),{width:"auto"}
                );
                res.d.$vars.OKButton.prop("disabled", false);
                if (res.d.dialog) res.d.dialog("close");
                if (options.onEnd) options.onEnd();
            });
            function openFolder() {
                var f=FS.get(model.dest);
                var gui = require("nw.gui");//nwDispatcher.requireNwGui(); 
                gui.Shell.showItemInFolder(f.path().replace(/\//g,"\\"));
            }
        };
        return res.d;
    };
    return res;
});

requireSimulator.setName('jquery.binarytransport');
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
requireSimulator.setName('WebFS');
define(["FS2","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
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
            return DU.funcPromise(function (succ,err) {
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
requireSimulator.setName('DiagAdjuster');
define([],function () {
    var DiagAdjuster=function (diagElem) {
        this.diagElem=diagElem;
        this.rszt=null;
        this.margin=30;
        this.timeout=100;
    };
    DiagAdjuster.prototype.handleResize=function () {
        var self=this;
        if (this.rszt) clearTimeout(this.rszt);
        this.rszt=setTimeout(function () {
            var d=self.diagElem.closest(".ui-dialog");
            var t=d.find(".ui-dialog-titlebar");
            var dw=d.width(),dh=d.height(),th=t.height();
            var pad=self.margin;
            var sz={w:dw-pad, h:dh-th-pad};
            self.diagElem.css({width:sz.w,height:sz.h});
            self.afterResize(self.diagElem);
        },this.timeout);
    };
    DiagAdjuster.prototype.handleResizeF=function () {
        var self=this;
        return function () {
            self.handleResize();    
        };
    };
    DiagAdjuster.prototype.afterResize=function (){};
    return DiagAdjuster;
});

requireSimulator.setName('ide/editor');
requirejs(["Util", "Tonyu", "FS", "PathUtil","FileList", "FileMenu",
           "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project",
           /*"copySample",*/"Shell","Shell2","ProjectOptionsEditor","copyToKernel","KeyEventChecker",
           "IFrameDialog",/*"WikiDialog",*/"runtime", "KernelDiffDialog","Sync","searchDialog","StackTrace","syncWithKernel",
           "UI","ResEditor","WebSite","exceptionCatcher","Tonyu.TraceTbl",
           "Log","MainClassDialog","DeferredUtil","NWMenu",
           "ProjectCompiler","compiledProject","mkrunDiag","zip","LSFS","WebFS",
           "extLink","DiagAdjuster"
          ],
function (Util, Tonyu, FS, PathUtil, FileList, FileMenu,
          showErrorPos, fixIndent, Wiki, Tonyu_Project,
          /*copySample,*/sh,sh2, ProjectOptionsEditor, ctk, KeyEventChecker,
          IFrameDialog,/*WikiDialog,*/ rt , KDD,Sync,searchDialog,StackTrace,swk,
          UI,ResEditor,WebSite,EC,TTB,
          Log,MainClassDialog,DU,NWMenu,
          TPRC,CPPRJ,mkrunDiag,zip,LSFS,WebFS,
          extLink,DiagAdjuster
          ) {
$(function () {
    if (!WebSite.isNW) {
        FS.mount(location.protocol+"//"+location.host+"/", new WebFS);
    }
    /*
    location.href
"chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/index.html"
window.open("chrome-extension://olbcdbbkoeedndbghihgpljnlppogeia/Demo/Explode/index.html")
    */

    var F=EC.f;
    $LASTPOS=0;
    //copySample();
    var mobile=WebSite.mobile || FS.get(WebSite.tonyuHome).rel("mobile.txt").exists();
    if (mobile) {
        $("#fileViewer").hide();
        $("#runAreaParent").hide();
        $("#mainArea").attr("class","col-xs-12");
        $("#fileSel").show();
    }
    var home=FS.get(WebSite.tonyuHome);
    //if (!Tonyu.ide)  Tonyu.ide={};
    var kernelDir;
    if (WebSite.kernelDir && !PathUtil.isURL(WebSite.kernelDir)){
        kernelDir=FS.get(WebSite.kernelDir);//home.rel("Kernel/");
        if (kernelDir.exists()) {
            TPRC(kernelDir).loadClasses().fail(function (e) {
                console.log(e);
                alert("Kernel compile error!");
            });
        }
    }
    var dir=Util.getQueryString("dir", "/Tonyu/Projects/SandBox/");
    var curPrjDir=curProjectDir=FS.get(dir);
    var curPrj=Tonyu_Project(curProjectDir);//, kernelDir);
    Tonyu.globals.$currentProject=curPrj;
    Tonyu.currentProject=curPrj;
    var EXT=curPrj.EXT;
    var desktopEnv=loadDesktopEnv();
    var runMenuOrd=desktopEnv.runMenuOrd;
    function setDiagMode(d) {
        var opt=curPrj.getOptions();
        if (opt.compiler.diagnose!=d) {
            opt.compiler.diagnose=d;
            curPrj.setOptions(opt);
        }
    }
    Tonyu.defaultResource={
       images:[
          {name:"$pat_base", url: "images/base.png", pwidth:32, pheight:32},
          {name:"$pat_sample", url: "images/Sample.png"},
          {name:"$pat_neko", url: "images/neko.png", pwidth:32, pheight:32},
          {name:"$pat_mapchip", url: "images/mapchip.png", pwidth:32, pheight:32},
          {name:"$pat_inputPad", url: "images/inputPad.png"}
       ],
       sounds:[]
    };
    if (location.href.match(/^file/)) {
       Tonyu.defaultResource.images.splice(1,1);
    }
    Tonyu.defaultOptions={
        compiler: { defaultSuperClass: "Actor"},
        run: {mainClass: "Main", bootClass: "Boot"},
        kernelEditable: false
    };
    setDiagMode(false);
    //ImageList(Tonyu.defaultResource.images, Sprites.setImageList);

    var screenH;
    var runDialogMode,dialogClosed;
    function onResize() {
        //console.log($(window).height(), $("#navBar").height());
        var h=$(window).height()-$("#navBar").height();
        h-=20;
        screenH=h;
        if (!runDialogMode) resizeCanvas($("#runArea").width(),screenH);
        $("#progs pre").css("height",h+"px");
        $("#fileItemList").height(h);
    }
    function resizeCanvas(w,h) {
        console.log("canvas size",w,h);
        $("#cv").attr("height", h).attr("width",w);
        cv=$("#cv")[0].getContext("2d");
    }
    onResize();
    $("#runDialog").click(F(showRunDialog));
    //var rszt;
    /*var da=new DiagAdjuster($("#runArea"));
    da.afterResize=function (d) {
        //resizeCanvas(d.width(),d.height());
    };*/
    var dialogSize={};
    function showRunDialog() {
        runDialogMode=true;
        $("#mainArea").removeClass("col-xs-6").addClass("col-xs-11");
        var d=$("#runArea");
        //$("#runArea").css({height:screenH-100});
        dialogSize.w=dialogSize.w||$(window).width()-100;
        dialogSize.h=dialogSize.h||screenH;
        $("#runArea").dialog({
            width:dialogSize.w,
            height:dialogSize.h,
            resize:function () {
                dialogSize.w=d.width();
                dialogSize.h=d.height();
                resizeCanvas(d.width(),d.height());
            },//da.handleResizeF(),
            close:function () {dialogClosed=true;stop();}
        });
        resizeCanvas(d.width(),d.height());
        //da.handleResize();
        console.log("Diag",dialogSize);
        //resizeCanvas(w,screenH-100);
    }

    var editors={};

    KeyEventChecker.down(document,"F9",F(run));
    KeyEventChecker.down(document,"F2",F(stop));
    KeyEventChecker.down(document,"ctrl+s",F(function (e) {
    	save();
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
    }));
    $(window).resize(F(onResize));
    $("body")[0].spellcheck=false;
    sh.cd(curProjectDir);

    var fl=FileList($(mobile?"#fileSel":"#fileItemList"),{
        topDir: curProjectDir,
        on:{
            select: F(open),
            displayName: dispName
        }
    });
    var FM=FileMenu();
    FM.fileList=fl;
    $("#newFile").click(F(FM.create));
    $("#mvFile").click(F(FM.mv));
    $("#rmFile").click(F(FM.rm));
    FM.on.close=close;
    FM.on.ls=ls;
    FM.on.validateName=fixName;
    FM.on.createContent=function (f) {
        var k=curPrj.isKernel(f.truncExt(EXT));
        if (k) {
            f.text(k.text());
        } else {
            f.text("");
        }
    };
    FM.on.displayName=function (f) {
        var r=dispName(f);
        if (r) {
            return r;
        }
        return f.name();
    };
    var refactorUI;
    FM.on.mvExtraUI=function (d) {
        refactorUI=UI("div",["input",{type:"checkbox",$var:"chk",checked:"true",value:"chked"}],"プログラム中のクラス名も変更する");
        d.append(refactorUI);
    };
    FM.on.mv=function (old,_new) {
        if (!refactorUI) return;

        //alert(oldCN+"=>"+newCN);
        return $.when(save()).then(function () {
            if (refactorUI.$vars.chk.prop("checked")) {
                var oldCN=old.truncExt(EXT);
                var newCN=_new.truncExt(EXT);
                return curPrj.renameClassName(oldCN,newCN);
            }
        }).then(function () {
            refactorUI=null;
            return reloadFromFiles();
        }).fail(function (e) {
            alert("プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．");
            console.log(e);
            return false;
        });
        //close(old);  does in FileMenu
    };
    F(FM.on);
    fl.ls(curProjectDir);
    refreshRunMenu();
    /*KeyEventChecker.down(document,"Alt+Ctrl+D",function () {
        //var curFile=fl.curFile();
        //if (!curFile) return;
        KDD.show(curProjectDir, kernelDir);// DiffDialog.show(curFile,kernelDir.rel(curFile.name()));
    });
    sh.kernelDiff=function () {
        KDD.show(curProjectDir, kernelDir);
    };
    sh.kernelDiff.description="Compare Kernel file and this project.";*/
    function ls(){
        fl.ls(curProjectDir);
        refreshRunMenu();
    }
    function refreshRunMenu() {
        curProjectDir.each(function (f) {
            if (f.endsWith(EXT)) {
                var n=f.truncExt(EXT);
                if (runMenuOrd.indexOf(n)<0) {
                    runMenuOrd.push(n);
                }
            }
        });
        var i;
        for (i=runMenuOrd.length-1; i>=0 ; i--) {
            var f=curProjectDir.rel(runMenuOrd[i]+EXT);
            if (!f.exists()) {
                runMenuOrd.splice(i,1);
            }
        }
        $("#runMenu").empty();
        i=0;
        runMenuOrd.forEach(function(n) {
            var ii=i;
            if (typeof n!="string") {console.log(n); alert("not a string: "+n);}
            if (ii>=15) return;
            $("#runMenu").append(
                    $("<li>").append(
                            $("<a>").attr("href","#").text(n+"を実行"+(i==0?"(F9)":"")).click(F(function () {
                                if (typeof n!="string") {console.log(n); alert("not a string2: "+n);}
                                run(n);
                                if (ii>0) {
                                    runMenuOrd.splice(ii, 1);
                                    runMenuOrd.unshift(n);
                                    refreshRunMenu();
                                    saveDesktopEnv();
                                }
                            }))));
            i++;
        });
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("停止(F2)").click(F(function () {
                            stop();
                        }))));
        $("#runMenu").append(
                $("<li>").append(
                        $("<a>").attr("href","#").text("実行するファイルを選択...").click(F(function () {
                            var diag=MainClassDialog.show(curPrj,{on:{done:function (n,dorun) {
                                var ii=runMenuOrd.indexOf(n);
                                if (ii>0) {
                                    runMenuOrd.splice(ii, 1);
                                    runMenuOrd.unshift(n);
                                    refreshRunMenu();
                                    saveDesktopEnv();
                                }
                                if (dorun) run(n);
                            }}});
                            diag.$vars.mainClass.empty();
                            runMenuOrd.forEach(function (m) {
                                diag.$vars.mainClass.append(UI("option",{value:m},m));
                            });
                        }))));

        //saveDesktopEnv();
        $("#exportToJsdoit").attr("href", "exportToJsdoit.html?dir="+curProjectDir.path());//+"&main="+runMenuOrd[0]);
        $("#exportToExe").attr("href", "exportToExe.html?dir="+curProjectDir.path());//+"&main="+runMenuOrd[0]);
    }
    function dispName(f) {
        var name=f.name();
        if (f.isDir()) return name;
        if (f.endsWith(EXT)) return f.truncExt(EXT);
        return null;
    }
    function fixName(name, options) {
        var upcased=false;
        //if (name=="aaaa") throw new Error("iikagen name error "+EC.enter);
        if (name.match(/^[a-z]/)) {
            name= name.substring(0,1).toUpperCase()+name.substring(1);
            upcased=true;
        }
        if (name.match(/^[A-Z_][a-zA-Z0-9_]*$/)) {
            if (curPrj.isKernel(name)) {
                if (curPrj.getOptions().kernelEditable) {
                    return {ok:true, file: curProjectDir.rel(name+EXT),
                        note: options.action=="create"? "Kernelから"+name+"をコピーします" :""};
                } else {
                    return {ok:false, reason:name+"はシステムで利用されている名前なので使用できません"};
                }
            }
            if (upcased) {
                //name= name.substring(0,1).toUpperCase()+name.substring(1);
                return {ok:true, file: curProjectDir.rel(name+EXT), note: "先頭を大文字("+name+") にして作成します．"};
            }
            return {ok:true, file: curProjectDir.rel(name+EXT)};
        } else {
            return {ok:false, reason:"名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．"};
        }
    }
    function getCurrentEditorInfo() {
        var f=fl.curFile();
        if (!f) return null;
        return editors[f.path()];
    }
    function getCurrentEditor() {
        var i=getCurrentEditorInfo();
        if (i) return i.editor;
        return null;
    }
    function displayMode(mode, next) {
        // mode == run     compile_error     runtime_error    edit
        var prog=getCurrentEditor();
        switch(mode) {
        case "run":
            if (prog) prog.blur();
            showErrorPos($("#errorPos"));
            //$("#errorPos").hide();// (1000,next);
            //$("#runArea").slideDown(1000, next);
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").show().attr("class","col-xs-12");
                $("#mainArea").hide();//attr("class","col-xs-12");
                onResize();
            }
            if (runDialogMode && dialogClosed) {
                showRunDialog();
            }
            break;
        case "compile_error":
            //$("#errorPos").show();// slideDown(1000, next);
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "runtime_error":
            //$("#errorPos").slideDown(1000, next);
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
            break;
        case "edit":
            //$("#runArea").slideUp(1000);
            //$("#errorPos").slideUp(1000, next);
            if (mobile) {
                //$("#fileViewer").hide();
                $("#runAreaParent").hide();//.attr("class","col-xs-12");
                $("#mainArea").show();//attr("class","col-xs-12");
            }
            break;
        }
    }
    function stop() {
        curPrj.stop();
        displayMode("edit");
    }
    //\run
    function run(name) {
        curPrj.stop();
        if (typeof name!="string") {
            if (runMenuOrd.length==0) {
                alert("ファイルを作成してください");
                return;
            }
            name=runMenuOrd[0];// curFile.name().replace(/\.tonyu$/,"");
        }
        if (typeof name!="string") {console.log(name); alert("not a string3: "+name);}
        save();
        displayMode("run");
        Log.dumpProject(curProjectDir);
        if (typeof SplashScreen!="undefined") SplashScreen.show();
        var o=curPrj.getOptions();
        if (o.run.mainClass!=name) {
            o.run.mainClass=name;
            curPrj.setOptions();
        }
        curPrjDir.touch();
        curPrj.rawRun(o.run.bootClass).fail(function (e) {
            if (e.isTError) {
                console.log("showErr: run");

                showErrorPos($("#errorPos"),e);
                displayMode("compile_error");
            }else{
                Tonyu.onRuntimeError(e);
            }
        }).done(function () {
            if (typeof SplashScreen!="undefined") SplashScreen.hide();
        });
    }
    var alertOnce;
    alertOnce=function (e) {
        alert(e);
        alertOnce=function(){};
    };
    window.onerror=EC.handleException=Tonyu.onRuntimeError=function (e) {
        Tonyu.globals.$lastError=e;
        var t=curPrj.env.traceTbl;
        var te;
        var tid = t.find(e) || t.decode($LASTPOS); // user.Main:234
        if (tid) {
            te=curPrj.decodeTrace(tid);
        }
        console.log("onRunTimeError:stackTrace1",e.stack,te,$LASTPOS);
        /*var trc;//=StackTrace.get(e,t);
        var te=((trc && trc[0]) ? trc[0] : t.decode($LASTPOS));
        console.log("onRunTimeError:stackTrace1",e.stack,te,$LASTPOS);
        if (te) {
            te=curPrj.decodeTrace(te);
        }
        console.log("onRunTimeError:stackTrace2",te,$LASTPOS);*/
        if (te) {
            te.mesg=e;
            if (e.pluginName) {
                alert(e.message);
            } else {
                var diag=showErrorPos($("#errorPos"),te);
                displayMode("runtime_error");
                $("#errorPos").find(".quickFix").append(
                        UI("button",{on:{click: function () {
                            setDiagMode(true);
                            diag.dialog("close");
                            run();
                        }}},"診断モードで実行しなおす"));
            }
            stop();
            //var userAgent = window.navigator.userAgent.toLowerCase();
            //if(userAgent.indexOf('msie')<0) throw e;
        } else {
            UI("div",{title:"Error"},e+"",["pre",e.stack]).dialog({width:800});
            stop();
            //alertOnce(e);
            //throw e;
        }
    };
    $("#mapEditor").click(F(function () {
        console.log("run map");
        run("MapEditor");
    }));
    $("#search").click(F(function () {
        console.log("src diag");
        searchDialog.show(curProjectDir,function (info){
            fl.select(info.file);
            setTimeout(function () {
                var prog=getCurrentEditor();
                if (prog) prog.gotoLine(info.lineNo);
            },50);
        });
    }));
    function close(rm) { // rm or mv
        var i=editors[rm.path()]; //getCurrentEditorInfo();
        if (i) {
            i.editor.destroy();
            i.dom.remove();
            delete editors[rm.path()];
        }
    }
    function fixEditorIndent(prog) {
        var cur=prog.getCursorPosition();
        var orig=prog.getValue();
        var fixed=fixIndent( orig );
        if (orig!=fixed) {
            prog.setValue(fixed);
            prog.clearSelection();
            prog.moveCursorTo(cur.row, cur.column);
        }
    }
    function reloadFromFiles() {
        for (var path in editors) {
            var inf=editors[path];
            var curFile=inf.file; //fl.curFile();
            var prog=inf.editor; //getCurrentEditor();
            if (curFile.exists() && prog) {
                prog.setValue(curFile.text());
                prog.clearSelection();
            }
        }
    }
    function save() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        var curFile=inf.file; //fl.curFile();
        var prog=inf.editor; //getCurrentEditor();
        if (curFile && prog && !curFile.isReadOnly()) {
            fixEditorIndent(prog);
            var old=curFile.text();
            var nw=prog.getValue();
            if (old!=nw) {
                curFile.text(nw);
                inf.lastTimeStamp=curFile.lastUpdate();
            }
        }
        fl.setModified(false);
    }
    function watchModified() {
        var inf=getCurrentEditorInfo();
        if (!inf) return;
        if (!inf.file.exists()) return;
        if (inf.lastTimeStamp<inf.file.lastUpdate()) {
            inf.editor.setValue(inf.file.text());
            inf.editor.clearSelection();
            inf.lastTimeStamp=inf.file.lastUpdate();
        }
    	fl.setModified(inf.file.text()!=inf.editor.getValue());
    }
    setInterval(watchModified,1000);
    var curDOM;
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile
        if (f.isDir()) {
            return;
        }
        save();
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        if (!inf) {
            var progDOM=$("<pre>").css("height", screenH+"px").text(f.text()).appendTo("#progs");
            var prog=ace.edit(progDOM[0]);
            window.lastEditor=prog;
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
            prog.setTheme("ace/theme/eclipse");
            prog.getSession().setMode("ace/mode/tonyu");
            inf=editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(F(function () {
                displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            try {
                prog.commands.removeCommand("toggleFoldWidget");
                prog.setOptions({fixedWidthGutter:true});
            }catch(e){}// F2

            curDOM=progDOM;
        } else {
            if (inf.lastTimeStamp<inf.file.lastUpdate()) {
                inf.editor.setValue(inf.file.text());
                inf.editor.clearSelection();
                inf.lastTimeStamp=inf.file.lastUpdate();
            }
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
        }
        inf.lastTimeStamp=inf.file.lastUpdate();
    }
    d=function () {
        Tonyu.currentProject.dumpJS.apply(this,arguments);
    };

    function loadDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        var res;
        if (d.exists()) {
            res=d.obj();
        } else {
            res={};
        }
        if (!res.runMenuOrd) res.runMenuOrd=[];
        return desktopEnv=res;
    }
    function saveDesktopEnv() {
        var d=curProjectDir.rel(".desktop");
        d.obj(desktopEnv);
    }
    /*$("#restore").click(F(restore));
    function restore() {
        var n=curProjectDir.name();
        if (!copySample.available(curProjectDir)) {
            return alert("このプロジェクトは初期状態に戻せません");
        };
        if (confirm(curProjectDir+" を初期状態に戻しますか？")) {
            sh.rm(curProjectDir,{r:1});
            copySample(n);
            ls();
        }
    }*/
    $("#mkrun").click(F(function () {
        if (WebSite.isNW) {
            mkrunDiag.show(curPrj,
                    FS.get(WebSite.cwd).rel("Runtimes/").rel( curProjectDir.name()) );
        } else {
            var mkram=FS.get("/mkram/");
            if (mkram.exists()) mkram.rm({r:1});
            FS.mount(mkram.path(), LSFS.ramDisk() );
            mkrunDiag.show(curPrj, mkram.rel(curProjectDir.name()), {
                hiddenFolder:true,
                onEnd:function () {
                    FS.unmount(mkram.path());
                }
            });
        }
    }));
    $("#imgResEditor").click(F(function () {
        //ImgResEdit(curPrj);
        ResEditor(curPrj,"image");
    }));
    $("#soundResEditor").click(F(function () {
        ResEditor(curPrj,"sound");
    }));
    $("#prjOptEditor").click(F(function () {
        ProjectOptionsEditor(curPrj);
    }));
    var helpd=null;
    $("#refHelp").click(F(function () {
    	//if (!helpd) helpd=WikiDialog.create(home.rel("doc/tonyu2/"));
        if (!helpd) helpd=IFrameDialog.create(WebSite.top+"/doc/index.html");
    	helpd.show();
    }));
    if (typeof progBar=="object") {progBar.clear();}
    $("#rmPRJ").click(F(function () {
        if (prompt(curProjectDir+"内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．","")!="DELETE") {
            return;
        }
        sh.rm(curProjectDir,{r:1});
        document.location.href="index.html";
    }));
    $("#mvPRJ").click(F(function () {
        var np=prompt("新しいプロジェクトの名前を入れてください", curProjectDir.name().replace(/\//g,""));
        if (!np || np=="") return;
        if (!np.match(/\/$/)) np+="/";
        var npd=curProjectDir.up().rel(np);
        if (npd.exists()) {
            alert(npd+" はすでに存在します");
            return;
        }
        sh.cp(curProjectDir,npd);
        sh.rm(curProjectDir,{r:1});
        document.location.href="project.html?dir="+npd;
    }));
    $("#editorEditor").click(F(function () {
        var prog=getCurrentEditor();
        var s=prompt("エディタの文字の大きさ", desktopEnv.editorFontSize||12);
        desktopEnv.editorFontSize=parseInt(s);
        if (prog) prog.setFontSize(desktopEnv.editorFontSize||12);
        saveDesktopEnv();
    }));
    $("#openFolder").click(F(function () {
        var f=curPrjDir;
        var gui = require("nw.gui");//(global.nwDispatcher||global.nw).requireNwGui();
        gui.Shell.showItemInFolder(f.path().replace(/\//g,"\\"));
    }));
    sh.curFile=function () {
        return fl.curFile();
    };
    FM.onMenuStart=save;
    //curPrj.compileKernel();
    SplashScreen.hide();
    if (curPrj.getBlobInfos().length>0) {
        var ld=UI("div",{title:"ログイン"},["div","このプロジェクトを正常に動作させるにはログインが必要です"]);
        Auth.assertLogin({
            showLoginLink:function (u) {
                ld.append(UI("a",{href:u,target:"login",style:"font-size: 20px;"},"ログインする"));
            },
            success:function () {
                ld.dialog("close");
            }
        });
        ld.dialog({modal:true});
    }
    extLink.all();
});
});

requireSimulator.setName();
