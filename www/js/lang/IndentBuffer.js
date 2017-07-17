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
