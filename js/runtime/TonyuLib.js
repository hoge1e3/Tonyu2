Tonyu=function () {
    var preemptionTime=60;
    function thread() {
	//var stpd=0;
        var fb={enter:enter, exit:exit, steps:steps, step:step, isAlive:isAlive, isWaiting:isWaiting,
                suspend:suspend,retVal:retVal, kill:kill, waitFor: waitFor,setGroup:setGroup};
        var frame=null;
        var _isAlive=true;
        var cnt=0;
        var retVal;
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
        function step() {
            if (frame) frame.func(fb);
        }
        function exit(res) {
            frame=frame.prev;
            //if (frame) frame.res=res;
            retVal=res;
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
        function retVal() {
            return retVal;
        }
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
        function addObj(obj, methodName) {
            var th=thread();
            if (!methodName) methodName="main";
            th.enter(obj["fiber$"+methodName]());
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
        /*function run(interval, onStepsEnd) {
            if (interval!=null) _interval=interval;
            if (onStepsEnd!=null) _onStepsEnd=onStepsEnd;
            if (!_isAlive) return;
            try {
                steps();
                if (_onStepsEnd) _onStepsEnd();
                if (!_isWaiting) {
                    setTimeout(run,_interval);
                } else {
                    //console.log("all wait!");
                }
            } catch (e) {
                if (Tonyu.onRuntimeError) {
                    Tonyu.onRuntimeError(e);
                } else {
                    alert ("エラー! at "+$LASTPOS+" メッセージ  : "+e);
                }
            }
        }*/
        function notifyResume() {
            if (_isWaiting) {
                //console.log("resume!");
                //run();
            }
        }
        return thg={add:add, addObj:addObj,  steps:steps, kill:kill, notifyResume: notifyResume};
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
    	//A has methods in B,C,E,F. A does not have methods in D
    	//(B shoule be treated as modules. Modules should not extend)
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
    	return res;
    }
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
                    else throw "曖昧なクラス名： "+nn+"."+n+", "+found;
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
        for (var i=0 ; i<args.length; i++) {
            res[i]=args[i];
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
