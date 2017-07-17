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