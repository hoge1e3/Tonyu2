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
                kill:kill, waitFor: waitFor,setGroup:setGroup};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        //var retVal;
        var _isWaiting=false;
        function isAlive() {
            return frame!=null && _isAlive;
        }
        function isWaiting() {
            return _isWaiting;
        }
        function suspend() {
            cnt=0;
        }
        function enter(frameFunc) {
            frame={prev:frame, func:frameFunc};
        }
        function apply(obj, methodName, args) {
            if (!args) args=[];
            args=[fb].concat(args);
            var pc=0;
            enter(function () {
                switch (pc){
                case 0:
                    obj["fiber$"+methodName].apply(obj,args);
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
            if (fb.tryStack.length==0) throw e;
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
            frame=frame.prev;
            //if (frame) frame.res=res;
            fb.retVal=res;
        }
        function enterTry(catchPC) {
            fb.tryStack.push({frame:frame,catchPC:catchPC});
        }
        function exitTry() {
            fb.tryStack.pop();
        }
        function waitFor(j) {
            _isWaiting=true;
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
            //while (new Date().getTime()<lim) {
            while (cnt-->0) {
                step();
            }
	    //stpd--;
            Tonyu.currentThread=sv;
        }
        function kill() {
            _isAlive=false;
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
    function threadGroup() {
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
    		if (!parent) throw "No parent class";
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
    	//A has methods in B,C,E,F. [Mod] A should extend D.(Thus, E should extend D(or E==D))
    	//( B shoule be treated as modules.
    	//  Module's extension indicates that includer class should also exetend the module's parent )
    	// 2015-02-27 this check is not implemented.
    	// Known examples:
    	// Actor extends BaseActor, includes PlayMod.
    	// PlayMod extends BaseActor(because use update() in play())
    	includes.forEach(function (m) {
    		if (!m.methods) throw m+" Does not have methods";
    		for (var n in m.methods) {
    			if (!(n in prot)) {
    				prot[n]=m.methods[n];
    			}
    		}
    	});
    	res.methods=prot;
    	res.prototype=bless(parent, prot);
    	res.prototype.isTonyuObject=true;
    	addMeta(res,{
    	    superClass:parent ? parent.meta : null,
    	    includes:includes.map(function(c){return c.meta;})
    	});
    	return res;
    }
    klass.addMeta=addMeta;
    function addMeta(k,m) {
        k.meta=k.meta||{};
        extend(k.meta, m);
    }
    klass.ensureNamespace=function (top,nsp) {
        var keys=nsp.split(".");
        var o=top;
        var i;
        for (i=0; i<keys.length; i++) {
            var k=keys[i];
            if (!o[k]) o[k]={};
            o=o[k];
        }
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
    	return function () {
    		return meth.apply(t,arguments);
    	};
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
            A:A};
}();

});