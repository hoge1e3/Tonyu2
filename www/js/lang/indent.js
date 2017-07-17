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
