define(function(require,exports,module) {
const TT=require("tonyu2_token");
const IndentFixer=require("IndentFixer");
const f=new IndentFixer({
	parse(str) {
		try {
			const tokenRes=TT.parse(str);
			const tokens=tokenRes.result[0];
			//console.log(tokens);
			const p2r=new Pos2RC(str);
			return tokens.map(t=>Object.assign(t,p2r.get(t.pos)));
		} catch(e) {
			console.log(e);
		}
	},
	isOpen(token) {return token.type==="{";},
	isClose(token) {return token.type==="}";},
	isBQOpen(token) {return token.type==="backquoteHead";},
	isBQClose(token) {return token.type==="backquoteTail";},
});

module.exports=function (str,indentStr) {
	return f.fix(str,indentStr);
};
class Pos2RC{
	constructor(str) {
		this.str=str;
		this.row=0;
		this.col=0;
		this.lastPos=0;
	}
	get(pos) {
		if (this.lastPos>pos) throw new Error("tokens Must be ordered.");
		const proc=this.str.substring(this.lastPos,pos);
		const lines=proc.split("\n");
		const lastLine=lines.pop();
		if (lines.length===0) this.col+=lastLine.length;
		else {
			this.row+=lines.length;
			this.col=lastLine.length;
		}
		this.lastPos=pos;
		return {row:this.row, col:this.col};
	}
}
/*
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
}*/
/*module.exports=function fixIndent(str, indentStr) {
	if (!indentStr) indentStr="    ";
	var incdec={"{":1, "}":-1};
	var linfo=[];
	try {
		throw "koware";
		var tokenRes=TT.parse(str);
		var tokens=tokenRes.result[0];
		tokens.forEach(function (token) {
			if (incdec[token.type]) {
				if (!linfo[token.row]) linfo[token.row]="";
				linfo[token.row]+=token.type;
			}
		});
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
		line=line.replace(/^\s* ?/,"");
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
};*/
});
