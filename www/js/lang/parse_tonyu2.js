if (typeof define!=="function") {
	define=require("requirejs").define;
}

/*
* Tonyu2 の構文解析を行う．
* TonyuLang.parse(src);
*   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
*/
define(["Grammar", "XMLBuffer", "IndentBuffer", "TT",
		"disp", "Parser", "ExpressionParser", "TError"],
function (Grammar, XMLBuffer, IndentBuffer, TT,
		disp, Parser, ExpressionParser, TError) {
return TonyuLang=function () {
	var p=Parser;
	var $={};
	var g=Grammar();
	var G=g.get;

	var sp=p.StringParser;//(str);
	var tk=p.TokensParser.token;
	var num=tk("number").ret(function (n) {
		n.type="number";
		if (typeof n.text!="string") throw "No text for "+disp(n);
		n.value=(n.text-0);
		if (isNaN(n.value)) throw "No value for "+disp(n);
		return n;
	});
	var symbol=tk("symbol");
	var symresv=tk("symbol");
	for (var resvk in TT.reserved) {
		var resvp=tk(resvk);
		//console.log(resvk,resvp, resvp instanceof Parser.Parser);
		if (resvp instanceof Parser.Parser && resvk!=="constructor") {
			/*if (resvk==="constructor") {
				console.log("c");
			}*/
			symresv=symresv.or(resvp);
		}
	}
	var eqq=tk("===");
	var nee=tk("!==");
	var eq=tk("==");
	var ne=tk("!=");
	var ge=tk(">=");
	var le=tk("<=");
	var gt=tk(">");
	var lt=tk("<");
	var andand=tk("&&");
	var oror=tk("||");
	var bitand=tk("&");
	var bitor=tk("|");
	var bitxor=tk("^");
	var shr=tk(">>");
	var shl=tk("<<");
	var ushr=tk(">>>");

	var minus=tk("-");//.first(space,"-");
	var plus=tk("+");//.first(space,"+");
	var mul=tk("*");
	var div=tk("/");
	var mod=tk("%");
	var assign=tk("=");
	var literal=tk("literal");
	var regex=tk("regex");
	function retF(n) {
		return function () {
			return arguments[n];
		};
	}
	function comLastOpt(p) {
		return p.sep0(tk(","),true).and(tk(",").opt()).ret(function (list,opt) {
			return list;
		});
	};
	var e=ExpressionParser() ;
	var arrayElem=g("arrayElem").ands(tk("["), e.lazy() , tk("]")).ret(null,"subscript");
	var argList=g("argList").ands(tk("("), comLastOpt(e.lazy()) , tk(")")).ret(null,"args");
	var member=g("member").ands(tk(".") , symresv ).ret(null,     "name" );
	var parenExpr = g("parenExpr").ands(tk("("), e.lazy() , tk(")")).ret(null,"expr");
	var varAccess = g("varAccess").ands(symbol).ret("name");
	var funcExpr_l=G("funcExpr").firstTokens(["function","\\"]);
	var funcExprArg=g("funcExprArg").ands(funcExpr_l).ret("obj");
	var objlit_l=G("objlit").firstTokens("{");
	var objlitArg=g("objlitArg").ands(objlit_l).ret("obj");
	var objOrFuncArg=objlitArg.or(funcExprArg);
	function genCallBody(argList, oof) {
		var res=[];
		if (argList && !argList.args) {
			throw disp(argList);
		}
		if (argList) {
			var rg=Parser.getRange(argList);
			Parser.addRange(res,rg);
			argList.args.forEach(function (arg) {
				res.push(arg);
			});
		}
		oof.forEach(function (o) {
			var rg=Parser.getRange(o);
			Parser.addRange(res,rg);
			res.push(o.obj);
		});
		return res;
	}
	var callBody=argList.and(objOrFuncArg.rep0()).ret(function(a,oof) {
		return genCallBody(a,oof);
	}).or(objOrFuncArg.rep1().ret(function (oof) {
		return genCallBody(null,oof);
	}));
	var callBodyOld=argList.or(objlitArg);
	var call=g("call").ands( callBody ).ret("args");
	var scall=g("scall").ands( callBody ).ret("args");//supercall
	var newExpr = g("newExpr").ands(tk("new"),varAccess, call.opt()).ret(null, "klass","params");
	var superExpr =g("superExpr").ands(
			tk("super"), tk(".").and(symbol).ret(retF(1)).opt() , scall).ret(
			null,                 "name",                       "params");
	var reservedConst = tk("true").or(tk("false")).
	or(tk("null")).
	or(tk("undefined")).
	or(tk("_thread")).
	or(tk("this")).
	or(tk("arguments")).ret(function (t) {
		t.type="reservedConst";
		return t;
	});
	e.element(num);
	e.element(reservedConst);
	e.element(regex);
	e.element(literal);
	e.element(parenExpr);
	e.element(newExpr);
	e.element(superExpr);
	e.element(funcExpr_l);
	e.element(objlit_l);
	e.element(G("arylit").firstTokens("["));
	e.element(varAccess);
	var prio=0;
	e.infixr(prio,assign);
	e.infixr(prio,tk("+="));
	e.infixr(prio,tk("-="));
	e.infixr(prio,tk("*="));
	e.infixr(prio,tk("/="));
	e.infixr(prio,tk("%="));
	e.infixr(prio,tk("|="));
	e.infixr(prio,tk("&="));
	prio++;
	e.trifixr(prio,tk("?"), tk(":"));
	prio++;
	e.infixl(prio,oror);
	prio++;
	e.infixl(prio,andand);
	prio++;
	e.infixl(prio,bitor);
	prio++;
	e.infixl(prio,bitxor);
	prio++;
	e.infixl(prio,bitand);
	prio++;
	e.infix(prio,tk("instanceof"));
	e.infix(prio,tk("is"));
	//e.infix(prio,tk("in"));
	e.infix(prio,eqq);
	e.infix(prio,nee);
	e.infix(prio,eq);
	e.infix(prio,ne);
	e.infix(prio,ge);
	e.infix(prio,le);
	e.infix(prio,gt);
	e.infix(prio,lt);
	prio++;
	e.infixl(prio,ushr);
	e.infixl(prio,shl);
	e.infixl(prio,shr);
	prio++;
	e.postfix(prio+3,tk("++"));
	e.postfix(prio+3,tk("--"));
	e.infixl(prio,minus);
	e.infixl(prio,plus);
	prio++;
	e.infixl(prio,mul);
	e.infixl(prio,div);
	e.infixl(prio,mod);
	prio++;
	e.prefix(prio,tk("typeof"));
	e.prefix(prio,tk("__typeof"));
	e.prefix(prio,tk("delete"));
	e.prefix(prio,tk("++"));
	e.prefix(prio,tk("--"));
	e.prefix(prio,tk("+"));
	e.prefix(prio,tk("-"));
	e.prefix(prio,tk("!"));
	e.prefix(prio,tk("~"));
	prio++;
//    e.postfix(prio,tk("++"));
//    e.postfix(prio,tk("--"));

	prio++;
	e.postfix(prio,call);
	e.postfix(prio,member);
	e.postfix(prio,arrayElem);
	function mki(left, op ,right) {
		var res={type:"infix",left:left,op:op,right:right};
		Parser.setRange(res);
		res.toString=function () {
			return "("+left+op+right+")";
		};
		return res;
	}
	e.mkInfixl(mki);
	e.mkInfixr(mki);
	/*e.mkPostfix(function (p) {
		return {type:"postfix", expr:p};
	});*/
	var expr=e.build().setName("expr").profile();
	var retF=function (i) { return function (){ return arguments[i];}; };

	var stmt=G("stmt").firstTokens();
	var exprstmt=g("exprstmt").ands(expr,tk(";")).ret("expr");
	g("compound").ands(tk("{"), stmt.rep0(),tk("}")).ret(null,"stmts") ;
	var elseP=tk("else").and(stmt).ret(retF(1));
	var returns=g("return").ands(tk("return"),expr.opt(),tk(";") ).ret(null,"value");
	var ifs=g("if").ands(tk("if"), tk("("), expr, tk(")"), stmt, elseP.opt() ).ret(null, null,"cond",null,"then","_else");
	/*var trailFor=tk(";").and(expr.opt()).and(tk(";")).and(expr.opt()).ret(function (s, cond, s2, next) {
		return {cond: cond, next:next  };
	});*/
	var forin=g("forin").ands(tk("var").opt(), symbol.sep1(tk(","),true), tk("in").or(tk("of")), expr).ret(
										"isVar", "vars","inof", "set" );
	var normalFor=g("normalFor").ands(stmt, expr.opt() , tk(";") , expr.opt()).ret(
									"init", "cond",     null, "next");
	/*var infor=expr.and(trailFor.opt()).ret(function (a,b) {
		if (b==null) return {type:"forin", expr: a};
		return {type:"normalFor", init:a, cond: b.cond, next:b.next  };
	});*/
	var infor=normalFor.or(forin);
	var fors=g("for").ands(tk("for"),tk("("), infor , tk(")"),"stmt" ).ret(
								null,null,    "inFor", null   ,"loop");
	//var fors=g("for").ands(tk("for"),tk("("), tk("var").opt() , infor , tk(")"),"stmt" ).ret(null,null,"isVar", "inFor",null, "loop");
	var whiles=g("while").ands(tk("while"), tk("("), expr, tk(")"), "stmt").ret(null,null,"cond",null,"loop");
	var dos=g("do").ands(tk("do"), "stmt" , tk("while"), tk("("), expr, tk(")"), tk(";")).ret(null,"loop",null,null,"cond",null,null);
	var cases=g("case").ands(tk("case"),expr,tk(":"), stmt.rep0() ).ret(null, "value", null,"stmts");
	var defaults=g("default").ands(tk("default"),tk(":"), stmt.rep0() ).ret(null, null,"stmts");
	var switchs=g("switch").ands(tk("switch"), tk("("), expr, tk(")"),tk("{"), cases.rep1(), defaults.opt(), tk("}")).ret(null,null,"value",null,null,"cases","defs");
	var breaks=g("break").ands(tk("break"), tk(";")).ret("brk");
	var continues=g("continue").ands(tk("continue"), tk(";")).ret("cont");
	var fins=g("finally").ands(tk("finally"), "stmt" ).ret(null, "stmt");
	var catchs=g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt" ).ret(null,null,"name",null, "stmt");
	var catches=g("catches").ors("catch","finally");
	var trys=g("try").ands(tk("try"),"stmt",catches.rep1() ).ret(null, "stmt","catches");
	var throwSt=g("throw").ands(tk("throw"),expr,tk(";")).ret(null,"ex");
	var typeExpr=g("typeExpr").ands(symbol).ret("name");
	var typeDecl=g("typeDecl").ands(tk(":"),typeExpr).ret(null,"vtype");
	var varDecl=g("varDecl").ands(symbol, typeDecl.opt(), tk("=").and(expr).ret(retF(1)).opt() ).ret("name","typeDecl","value");
	var varsDecl= g("varsDecl").ands(tk("var"), varDecl.sep1(tk(","),true), tk(";") ).ret(null ,"decls");
	var paramDecl= g("paramDecl").ands(symbol,typeDecl.opt() ).ret("name","typeDecl");
	var paramDecls=g("paramDecls").ands(tk("("), comLastOpt(paramDecl), tk(")")  ).ret(null, "params");
	var setterDecl= g("setterDecl").ands(tk("="), paramDecl).ret(null,"value");
	g("funcDeclHead").ands(
			tk("nowait").opt(),
			tk("function").or(tk("fiber")).or(tk("tk_constructor")).or(tk("\\")).opt(),
			symbol.or(tk("new")) , setterDecl.opt(), paramDecls.opt(),typeDecl.opt()   // if opt this it is getter
	).ret("nowait","ftype","name","setter", "params","rtype");
	var funcDecl=g("funcDecl").ands("funcDeclHead","compound").ret("head","body");
	var nativeDecl=g("nativeDecl").ands(tk("native"),symbol,tk(";")).ret(null, "name");
	var ifwait=g("ifWait").ands(tk("ifwait"),"stmt",elseP.opt()).ret(null, "then","_else");
	//var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
	var empty=g("empty").ands(tk(";")).ret(null);
	stmt=g("stmt").ors("return", "if", "for", "while", "do","break", "continue", "switch","ifWait","try", "throw","nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl","empty");
	// ------- end of stmts
	g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt() ,paramDecls.opt() ).ret(null,"name","params");
	var funcExpr=g("funcExpr").ands("funcExprHead","compound").ret("head","body");
	var jsonElem=g("jsonElem").ands(
			symbol.or(literal),
			tk(":").or(tk("=")).and(expr).ret(function (c,v) {return v;}).opt()
	).ret("key","value");
	var objlit=g("objlit").ands(tk("{"), comLastOpt( jsonElem ), tk("}")).ret(null, "elems");
	var arylit=g("arylit").ands(tk("["), comLastOpt( expr ),  tk("]")).ret(null, "elems");
	var ext=g("extends").ands(tk("extends"),symbol.or(tk("null")), tk(";")).
	ret(null, "superclassName");
	var incl=g("includes").ands(tk("includes"), symbol.sep1(tk(","),true),tk(";")).
	ret(null, "includeClassNames");
	var program=g("program").
	ands(ext.opt(),incl.opt(),stmt.rep0(), Parser.TokensParser.eof).
	ret("ext","incl","stmts");

	for (var i in g.defs) {
		g.defs[i].profile();
	}
	$.parse = function (file) {
		if (typeof file=="string") {
			str=file;
		} else {
			str=file.text();
		}
		str+="\n"; // For end with // comment with no \n
		var tokenRes=TT.parse(str);
		if (!tokenRes.isSuccess() ) {
			//return "ERROR\nToken error at "+tokenRes.src.maxPos+"\n"+
			//	str.substring(0,tokenRes.src.maxPos)+"!!HERE!!"+str.substring(tokenRes.src.maxPos);
			throw TError("文法エラー(Token)", file ,  tokenRes.src.maxPos);
		}
		var tokens=tokenRes.result[0];
		//console.log("Tokens: "+tokens.join(","));
		var res=p.TokensParser.parse(program, tokens);
		//console.log("POS="+res.src.maxPos);
		if (res.isSuccess() ) {
			var node=res.result[0];
			//console.log(disp(node));
			return node;
			//var xmlsrc=$.genXML(str, node);
			//return "<program>"+xmlsrc+"</program>";

		}
		var lt=tokens[res.src.maxPos];
		var mp=(lt?lt.pos+lt.len: str.length);
		throw TError("文法エラー", file ,  mp );
		/*return "ERROR\nSyntax error at "+mp+"\n"+
		str.substring(0,mp)+"!!HERE!!"+str.substring(mp);*/
	};
	$.genXML= function (src, node) {
		var x=XMLBuffer(src) ;
		x(node);
		return x.buf;
	};
	$.extension="tonyu";
	return $;
}();

});
