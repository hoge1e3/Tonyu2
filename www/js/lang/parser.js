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