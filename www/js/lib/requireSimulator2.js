(function () {
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
	requireSimulator=R;
	return R;
})();
