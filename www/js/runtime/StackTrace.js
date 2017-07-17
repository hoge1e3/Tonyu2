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