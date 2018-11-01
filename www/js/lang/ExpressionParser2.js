if (typeof define!=="function") {
	define=require("requirejs").define;
}

define(["Parser"], function (Parser) {
// parser.js の補助ライブラリ．式の解析を担当する
return ExpressionParser=function () {
	var $={};
	var EXPSTAT="EXPSTAT";
	//  first 10     *  +  <>  &&  ||  =     0  later
	function opType(type, prio) {
		var $={};
		$.eq=function (o) {return type==o.type() && prio==o.prio(); };
		$.type=function (t) { if (!t) return type; else return t==type;};
		$.prio=function () {return prio;};
		$.toString=function () {return "["+type+":"+prio+"]"; }
		return $;
	}
	function composite(a) {
		var $={};
		var e=a;
		$.add=function (a) {
			if (!e) {
				e=a;
			} else {
				e=e.or(a);
			}
		};
		$.get=function () {
			return e;
		};
		return $;
	}
	function typeComposite() {
		var built=composite();
		//var lastOP , isBuilt;
		var $={};
		$.reg=function (type, prio, a) {
			var opt=opType(type, prio);
			built.add(a.ret(Parser.create(function (r) {
				r.opType=opt;
				return r;
			})).setName("(opType "+opt+" "+a.name+")") );
		};
		$.get=function () {return built.get();};
		$.parse=function (st) {
			return $.get().parse(st);
		};
		return $;
	}
	var prefixOrElement=typeComposite(), postfixOrInfix=typeComposite();
	var element=composite();
	var trifixes=[];
	$.element=function (e) {
		prefixOrElement.reg("element", -1, e);
		element.add(e);
	};
	$.getElement=function () {return element.get();};
	$.prefix=function (prio, pre) {
		prefixOrElement.reg("prefix", prio, pre);
	};
	$.postfix=function (prio, post) {
		postfixOrInfix.reg("postfix", prio, post);
	};
	$.infixl =function (prio, inf) {
		postfixOrInfix.reg("infixl", prio, inf);
	};
	$.infixr =function (prio, inf) {
		postfixOrInfix.reg("infixr", prio, inf);
	};
	$.infix =function (prio, inf) {
		postfixOrInfix.reg("infix", prio, inf);
	};
	$.trifixr = function (prio, tf1, tf2) {
		postfixOrInfix.reg("trifixr", prio, tf1);
		//postfixOrInfix.reg("trifixr2", prio, tf2);
		trifixes[prio]=tf2;
	};
	$.custom = function (prio, func) {
		// func :: Elem(of next higher) -> Parser
	};
	$.mkInfix=function (f) {
		$.mkInfix.def=f;
	};
	$.mkInfix.def=function (left,op,right) {
		return Parser.setRange({type:"infix", op:op, left: left, right: right});
	}
	$.mkInfixl=function (f) {
		$.mkInfixl.def=f;
	};
	$.mkInfixl.def=function (left, op , right) {
		return Parser.setRange({type:"infixl",op:op ,left:left, right:right});
	};
	$.mkInfixr=function (f) {
		$.mkInfixr.def=f;
	};
	$.mkInfixr.def=function (left, op , right) {
		return Parser.setRange({type:"infixr",op:op ,left:left, right:right});
	};
	$.mkPrefix=function (f) {
		$.mkPrefix.def=f;
	};
	$.mkPrefix.def=function (op , right) {
		return Parser.setRange({type:"prefix", op:op, right:right});
	};
	$.mkPostfix=function (f) {
		$.mkPostfix.def=f;
	};
	$.mkPostfix.def=function (left, op) {
		return Parser.setRange({type:"postfix", left:left, op:op});
	};
	$.mkTrifixr=function(f) {
		$.mkTrifixr.def=f;
	};
	$.mkTrifixr.def=function (left, op1, mid, op2, right) {
		return Parser.setRange({type:"trifixr", left:left, op1:op1, mid:mid, op2:op2, right:right});
	};
	$.build= function () {
		//postfixOrInfix.build();
		//prefixOrElement.build();
		$.built= Parser.create(function (st) {
			return parse(0,st);
		}).setName("ExpBuilt");
		return $.built;
	};
	function dump(st, lbl) {
		return ;
		var s=st.src.str;
		console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
				" opType="+ st.opType+"  Succ = "+st.isSuccess()+" res="+st.result[0]);
	}
	function parse(minPrio, st) {
		var stat=0, res=st ,  opt;
		dump(st," start minprio= "+minPrio);
		st=prefixOrElement.parse(st);
		dump(st," prefixorelem "+minPrio);
		if (!st.isSuccess()) {
			return st;
		}
		//p2=st.result[0];
		opt=st.opType;
		if (opt.type("prefix") ) {
			// st = -^elem
			var pre=st.result[0];
			st=parse(opt.prio(), st);
			if (!st.isSuccess()) {
				return st;
			}
				// st: Expr    st.pos = -elem^
			var pex=$.mkPrefix.def(pre, st.result[0]);
			res=st.clone();  //  res:Expr
			res.result=[pex]; // res:prefixExpr  res.pos= -elem^
			if (!st.nextPostfixOrInfix) {
				return res;
			}
			// st.next =  -elem+^elem
			st=st.nextPostfixOrInfix;  // st: postfixOrInfix
		} else { //elem
			//p=p2;
			res=st.clone(); // res:elemExpr   res =  elem^
			st=postfixOrInfix.parse(st);
			if (!st.isSuccess()) {
				return res;
			}
		}
		// assert st:postfixOrInfix  res:Expr
		while (true) {
			dump(st,"st:pi"); dump(res,"res:ex");
			opt=st.opType;
			if (opt.prio()<minPrio) {
				res.nextPostfixOrInfix=st;
				return res;
			}
			// assert st:postfixOrInfix  res:Expr
			if (opt.type("postfix")) {
				// st:postfix
				var pex=$.mkPostfix.def(res.result[0],st.result[0]);
				res=st.clone();
				res.result=[pex]; // res.pos= expr++^
				dump(st, "185");
				st=postfixOrInfix.parse(st); // st. pos= expr++--^
				if (!st.isSuccess()) {
					return res;
				}
			} else if (opt.type("infixl")){  //x+y+z
				// st: infixl
				var inf=st.result[0];
				st=parse(opt.prio()+1, st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				var pex=$.mkInfixl.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixlExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("infixr")) { //a=^b=c
				// st: infixr
				var inf=st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  a=b=c^
				var pex=$.mkInfixr.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else if (opt.type("trifixr")) { //left?^mid:right
				// st: trifixr
				var left=res.result[0];
				var inf1=st.result[0];  // inf1 =  ?
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st= expr   st.pos=  left?mid^:right
				var mid=st.result[0];
				var st=trifixes[opt.prio()].parse(st);
				// st= :      st.pos= left?mid:^right;
				if (!st.isSuccess()) {
					return res;
				}
				var inf2= st.result[0];
				st=parse(opt.prio() ,st);
				if (!st.isSuccess()) {
					return res;
				}
				var right=st.result[0];
				// st=right      st.pos= left?mid:right^;
				var pex=$.mkTrifixr.def(left, inf1 , mid, inf2, right);
				res=st.clone();
				res.result=[pex]; //res:infixrExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
			} else { // infix
				// st: infixl
				var inf=st.result[0];
				st=parse(opt.prio()+1 ,st);
				if (!st.isSuccess()) {
					return res;
				}
				// st: expr   st.pos=  expr+expr^
				var pex=$.mkInfix.def(res.result[0], inf , st.result[0]);
				res=st.clone();
				res.result=[pex]; //res:infixExpr
				if (!st.nextPostfixOrInfix) {
					return res;
				}
				st=st.nextPostfixOrInfix;
				if (opt.prio()==st.opType.prio()) {
					res.success=false;
					return res;
				}
			}
			// assert st:postfixOrInfix  res:Expr
		}
	}
	$.lazy = function () {
		return Parser.create(function (st) {
			return $.built.parse(st);
		});
	};
	return $;
};

});
