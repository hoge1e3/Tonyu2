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