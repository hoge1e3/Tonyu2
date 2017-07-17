if (typeof define!=="function") {//B
	define=require("requirejs").define;
}
define(["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
		"context", "Visitor","Tonyu.Compiler"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
		context, Visitor,cu) {
return cu.JSGenerator=(function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;//G
var BINDF="Tonyu.bindFunc";
var INVOKE_FUNC="Tonyu.invokeMethod";
var CALL_FUNC="Tonyu.callFunc";
var CHK_NN="Tonyu.checkNonNull";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var ITER="Tonyu.iterator";
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
		LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype=cu.getScopeType;
//var newScope=cu.newScope;
//var nc=cu.nullCheck;
//var genSym=cu.genSym;
var annotation3=cu.annotation;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;

//-----------
function genJS(klass, env) {//B
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var buf=IndentBuffer();
	var printf=buf.printf;
	var ctx=context();
	var debug=false;
	var OM=ObjectMatcher;
	var traceTbl=env.traceTbl;
	// method := fiber | function
	var decls=klass.decls;
	var fields=decls.fields,
		methods=decls.methods,
		natives=decls.natives;
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
	var ST=ScopeTypes;
	var fnSeq=0;
	var diagnose=env.options.compiler.diagnose;

	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	function getMethod(name) {//B
		return getMethod2(klass,name);
	}
	function getClassName(klass){// should be object or short name //G
		if (typeof klass=="string") return CLASS_HEAD+(env.aliases[klass] || klass);//CFN  CLASS_HEAD+env.aliases[klass](null check)
		if (klass.builtin) return klass.fullName;// CFN klass.fullName
		return CLASS_HEAD+klass.fullName;// CFN  klass.fullName
	}
	function getClassNames(cs){//G
		var res=[];
		cs.forEach(function (c) { res.push(getClassName(c)); });
		return res;
	}
	function enterV(obj, node) {//G
		return function (buf) {
			ctx.enter(obj,function () {
				v.visit(node);
			});
		};
	}
	function varAccess(n, si, an) {//G
		var t=stype(si);
		if (t==ST.THVAR) {
			buf.printf("%s",TH);
		} else if (t==ST.FIELD) {
			buf.printf("%s.%s",THIZ, n);
		} else if (t==ST.METHOD) {
			if (an && an.noBind) {
				buf.printf("%s.%s",THIZ, n);
			} else {
				buf.printf("%s(%s,%s.%s)",BINDF, THIZ, THIZ, n);
			}
		} else if (t==ST.CLASS) {
			buf.printf("%s",getClassName(n));
		} else if (t==ST.GLOBAL) {
			buf.printf("%s%s",GLOBAL_HEAD, n);
		} else if (t==ST.PARAM || t==ST.LOCAL || t==ST.NATIVE) {
			buf.printf("%s",n);
		} else {
			console.log("Unknown scope type: ",t);
			throw new Error("Unknown scope type: "+t);
		}
		return si;
	}
	function noSurroundCompoundF(node) {//G
		return function () {
			noSurroundCompound.apply(this, [node]);
		};
	}
	function noSurroundCompound(node) {//G
		if (node.type=="compound") {
			ctx.enter({noWait:true},function () {
				buf.printf("%j%n", ["%n",node.stmts]);
				// buf.printf("%{%j%n%}", ["%n",node.stmts]);
			});
		} else {
			v.visit(node);
		}
	}
	function lastPosF(node) {//G
		return function () {
			buf.printf("%s%s=%s;//%s%n", (env.options.compiler.commentLastPos?"//":""),
					LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ), klass.fullName+":"+node.pos);
		};
	}
	var THNode={type:"THNode"};//G
	v=buf.visitor=Visitor({//G
		THNode: function (node) {
			buf.printf(TH);
		},
		dummy: function (node) {
			buf.printf("",node);
		},
		literal: function (node) {
			buf.printf("%s",node.text);
		},
		paramDecl: function (node) {
			buf.printf("%v",node.name);
		},
		paramDecls: function (node) {
			buf.printf("(%j)",[", ",node.params]);
		},
		funcDeclHead: function (node) {
			buf.printf("function %v %v",node.name, node.params);
		},
		funcDecl: function (node) {
		},
		"return": function (node) {
			if (ctx.inTry) throw TError("現実装では、tryの中にreturnは書けません",srcFile,node.pos);
			if (!ctx.noWait) {
				if (node.value) {
					buf.printf("%s.exit(%v);return;",TH,node.value);
				} else {
					buf.printf("%s.exit(%s);return;",TH,THIZ);
				}
			} else {
				if (ctx.threadAvail) {
					if (node.value) {
						buf.printf("%s.retVal=%v;return;%n",TH, node.value);
					} else {
						buf.printf("%s.retVal=%s;return;%n",TH, THIZ);
					}
				} else {
					if (node.value) {
						buf.printf("return %v;",node.value);
					} else {
						buf.printf("return %s;",THIZ);
					}

				}
			}
		},
		program: function (node) {
			genClass(node.stmts);
		},
		number: function (node) {
			buf.printf("%s", node.value );
		},
		reservedConst: function (node) {
			if (node.text=="this") {
				buf.printf("%s",THIZ);
			} else if (node.text=="arguments" && ctx.threadAvail) {
				buf.printf("%s",ARGS);
			} else if (node.text==TH) {
				buf.printf("%s", (ctx.threadAvail)?TH:"null");
			} else {
				buf.printf("%s", node.text);
			}
		},
		varDecl: function (node) {
			if (node.value) {
				buf.printf("%v = %v", node.name, node.value );
			} else {
				buf.printf("%v", node.name);
			}
		},
		varsDecl: function (node) {
			lastPosF(node)();
			buf.printf("%j;", [";",node.decls]);
		},
		jsonElem: function (node) {
			if (node.value) {
				buf.printf("%v: %v", node.key, node.value);
			} else {
				buf.printf("%v: %f", node.key, function () {
					var si=varAccess( node.key.text, annotation(node).scopeInfo, annotation(node));
				});
			}
		},
		objlit: function (node) {
			buf.printf("{%j}", [",", node.elems]);
		},
		arylit: function (node) {
			buf.printf("[%j]", [",", node.elems]);
		},
		funcExpr: function (node) {
			genFuncExpr(node);
		},
		parenExpr: function (node) {
			buf.printf("(%v)",node.expr);
		},
		varAccess: function (node) {
			var n=node.name.text;
			var si=varAccess(n,annotation(node).scopeInfo, annotation(node));
		},
		exprstmt: function (node) {//exprStmt
			var t={};
			lastPosF(node)();
			if (!ctx.noWait) {
				t=annotation(node).fiberCall || {};
			}
			if (t.type=="noRet") {
				buf.printf(
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{",
							THIZ, FIBPRE, t.N,  [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++
				);
			} else if (t.type=="ret") {
				buf.printf(
						"%s.%s%s(%j);%n" +
						"%s=%s;return;%n" +/*B*/
						"%}case %d:%{"+
						"%v%v%s.retVal;%n",
							THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
							FRMPC, ctx.pc,
							ctx.pc++,
							t.L, t.O, TH
				);
			} else if (t.type=="noRetSuper") {
				var p=getClassName(klass.superclass);
					buf.printf(
							"%s.prototype.%s%s.apply( %s, [%j]);%n" +
							"%s=%s;return;%n" +/*B*/
							"%}case %d:%{",
							p,  FIBPRE, t.S.name.text,  THIZ,  [", ",[THNode].concat(t.A)],
								FRMPC, ctx.pc,
								ctx.pc++
					);
			} else if (t.type=="retSuper") {
					buf.printf(
							"%s.prototype.%s%s.apply( %s, [%j]);%n" +
							"%s=%s;return;%n" +/*B*/
							"%}case %d:%{"+
							"%v%v%s.retVal;%n",
								p,  FIBPRE, t.S.name.text,  THIZ, [", ",[THNode].concat(t.A)],
								FRMPC, ctx.pc,
								ctx.pc++,
								t.L, t.O, TH
					);
			} else {
				buf.printf("%v;", node.expr );
			}
		},
		infix: function (node) {
			var opn=node.op.text;
			/*if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
				checkLVal(node.left);
			}*/
			if (diagnose) {
				if (opn=="+" || opn=="-" || opn=="*" ||  opn=="/" || opn=="%" ) {
					buf.printf("%s(%v,%l)%v%s(%v,%l)", CHK_NN, node.left, getSource(node.left), node.op,
							CHK_NN, node.right, getSource(node.right));
					return;
				}
				if (opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
					buf.printf("%v%v%s(%v,%l)", node.left, node.op,
							CHK_NN, node.right, getSource(node.right));
					return;
				}
			}
			buf.printf("%v%v%v", node.left, node.op, node.right);
		},
		trifixr:function (node) {
			buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
		},
		prefix: function (node) {
			buf.printf("%v %v", node.op, node.right);
		},
		postfix: function (node) {
			var a=annotation(node);
			if (diagnose) {
				if (a.myMethodCall) {
					var mc=a.myMethodCall;
					var si=mc.scopeInfo;
					var st=stype(si);
					if (st==ST.FIELD || st==ST.METHOD) {
						buf.printf("%s(%s, %l, [%j], %l )", INVOKE_FUNC,THIZ, mc.name, [",",mc.args],"this");
					} else {
						buf.printf("%s(%v, [%j], %l)", CALL_FUNC, node.left, [",",mc.args], getSource(node.left));
					}
					return;
				} else if (a.othersMethodCall) {
					var oc=a.othersMethodCall;
					buf.printf("%s(%v, %l, [%j], %l )", INVOKE_FUNC, oc.target, oc.name, [",",oc.args],getSource(oc.target));
					return;
				} else if (a.memberAccess) {
					var ma=a.memberAccess;
					buf.printf("%s(%v,%l).%s", CHK_NN, ma.target, getSource(ma.target), ma.name );
					return;
				}
			} else if (a.myMethodCall) {
				var mc=a.myMethodCall;
				var si=mc.scopeInfo;
				var st=stype(si);
				if (st==ST.METHOD) {
					buf.printf("%s.%s(%j)",THIZ, mc.name, [",",mc.args]);
					return;
				}
			}
			buf.printf("%v%v", node.left, node.op);
		},
		"break": function (node) {
			if (!ctx.noWait) {
				if (ctx.inTry && ctx.exitTryOnJump) throw TError("現実装では、tryの中にbreak;は書けません",srcFile,node.pos);
				if (ctx.closestBrk) {
					buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
				} else {
					throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
				}
			} else {
				buf.printf("break;%n");
			}
		},
		"try": function (node) {
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn)) {
				//buf.printf("/*try catch in wait mode is not yet supported*/%n");
				if (node.catches.length!=1 || node.catches[0].type!="catch") {
					throw TError("現実装では、catch節1個のみをサポートしています",srcFile,node.pos);
				}
				var ct=node.catches[0];
				var catchPos={},finPos={};
				buf.printf("%s.enterTry(%z);%n",TH,catchPos);
				buf.printf("%f", enterV({inTry:true, exitTryOnJump:true},node.stmt) );
				buf.printf("%s.exitTry();%n",TH);
				buf.printf("%s=%z;break;%n",FRMPC,finPos);
				buf.printf("%}case %f:%{",function (){
						buf.print(catchPos.put(ctx.pc++));
				});
				buf.printf("%s=%s.startCatch();%n",ct.name.text, TH);
				buf.printf("%s.exitTry();%n",TH);
				buf.printf("%v%n", ct.stmt);
				buf.printf("%}case %f:%{",function (){
					buf.print(finPos.put(ctx.pc++));
				});
			} else {
				ctx.enter({noWait:true}, function () {
					buf.printf("try {%{%f%n%}} ",
							noSurroundCompoundF(node.stmt));
					node.catches.forEach(v.visit);
				});
			}
		},
		"catch": function (node) {
			buf.printf("catch (%s) {%{%f%n%}}",node.name.text, noSurroundCompoundF(node.stmt));
		},
		"throw": function (node) {
			buf.printf("throw %v;%n",node.ex);
		},
		"while": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasReturn)) {
				var brkpos=buf.lazy();
				var pc=ctx.pc++;
				var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
				buf.printf(
						/*B*/
						"%}case %d:%{" +
						(isTrue?"%D%D%D":"if (!(%v)) { %s=%z; break; }%n") +
						"%f%n" +
						"%s=%s;break;%n" +
						"%}case %f:%{",
							pc,
							node.cond, FRMPC, brkpos,
							enterV({closestBrk:brkpos, exitTryOnJump:false}, node.loop),
							FRMPC, pc,
							function () { buf.print(brkpos.put(ctx.pc++)); }
				);
			} else {
				ctx.enter({noWait:true},function () {
					buf.printf("while (%v) {%{%f%n%}}", node.cond, noSurroundCompoundF(node.loop));
				});
			}
		},
		"for": function (node) {
			lastPosF(node)();
			var an=annotation(node);
			if (node.inFor.type=="forin") {
				var itn=annotation(node.inFor).iterName;
				if (!ctx.noWait &&
						(an.fiberCallRequired || an.hasReturn)) {
					var brkpos=buf.lazy();
					var pc=ctx.pc++;
					buf.printf(
							"%s=%s(%v,%s);%n"+
							"%}case %d:%{" +
							"if (!(%s.next())) { %s=%z; break; }%n" +
							"%f%n" +
							"%f%n" +
							"%s=%s;break;%n" +
							"%}case %f:%{",
								itn, ITER, node.inFor.set, node.inFor.vars.length,
								pc,
								itn, FRMPC, brkpos,
								getElemF(itn, node.inFor.isVar, node.inFor.vars),
								enterV({closestBrk:brkpos, exitTryOnJump:false}, node.loop),//node.loop,
								FRMPC, pc,
								function (buf) { buf.print(brkpos.put(ctx.pc++)); }
					);
				} else {
					ctx.enter({noWait:true},function() {
						buf.printf(
							"%s=%s(%v,%s);%n"+
							"while(%s.next()) {%{" +
							"%f%n"+
							"%f%n" +
							"%}}",
							itn, ITER, node.inFor.set, node.inFor.vars.length,
							itn,
							getElemF(itn, node.inFor.isVar, node.inFor.vars),
							noSurroundCompoundF(node.loop)
						);
					});
				}
			} else {
				if (!ctx.noWait&&
						(an.fiberCallRequired || an.hasReturn)) {
					var brkpos=buf.lazy();
					var pc=ctx.pc++;
					buf.printf(
							"%v;%n"+
							"%}case %d:%{" +
							"if (!(%v)) { %s=%z; break; }%n" +
							"%f%n" +
							"%v;%n" +
							"%s=%s;break;%n" +
							"%}case %f:%{",
								node.inFor.init ,
								pc,
								node.inFor.cond, FRMPC, brkpos,
								enterV({closestBrk:brkpos,exitTryOnJump:false}, node.loop),//node.loop,
								node.inFor.next,
								FRMPC, pc,
								function (buf) { buf.print(brkpos.put(ctx.pc++)); }
					);
				} else {
					ctx.enter({noWait:true},function() {
						buf.printf(
							"%v%n"+
							"while(%v) {%{" +
								"%v%n" +
								"%v;%n" +
							"%}}",
							node.inFor.init ,
							node.inFor.cond,
								node.loop,
								node.inFor.next
						);
					});
				}
			}
			function getElemF(itn, isVar, vars) {
				return function () {
					vars.forEach(function (v,i) {
						buf.printf("%s=%s[%s];%n", v.text, itn, i);
					});
				};
			}
		},
		"if": function (node) {
			lastPosF(node)();
			//buf.printf("/*FBR=%s*/",!!annotation(node).fiberCallRequired);
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn)) {
				var fipos={}, elpos={};
				if (node._else) {
					buf.printf(
							"if (!(%v)) { %s=%z; break; }%n" +
							"%v%n" +
							"%s=%z;break;%n" +
							"%}case %f:%{" +
							"%v%n" +
							/*B*/
							"%}case %f:%{"   ,
								node.cond, FRMPC, elpos,
								node.then,
								FRMPC, fipos,
								function () { buf.print(elpos.put(ctx.pc++)); },
								node._else,

								function () { buf.print(fipos.put(ctx.pc++)); }
					);

				} else {
					buf.printf(
							"if (!(%v)) { %s=%z; break; }%n" +
							"%v%n" +
							/*B*/
							"%}case %f:%{",
								node.cond, FRMPC, fipos,
								node.then,

								function () { buf.print(fipos.put(ctx.pc++)); }
					);
				}
			} else {
				ctx.enter({noWait:true}, function () {
					if (node._else) {
						buf.printf("if (%v) {%{%f%n%}} else {%{%f%n%}}", node.cond,
								noSurroundCompoundF(node.then),
								noSurroundCompoundF(node._else));
					} else {
						buf.printf("if (%v) {%{%f%n%}}", node.cond,
								noSurroundCompoundF(node.then));
					}
				});
			}
		},
		ifWait: function (node) {
			if (!ctx.noWait) {
				buf.printf("%v",node.then);
			} else {
				if (node._else) {
					buf.printf("%v",node._else);
				}
			}
		},
		call: function (node) {
			buf.printf("(%j)", [",",node.args]);
		},
		objlitArg: function (node) {
			buf.printf("%v",node.obj);
		},
		argList: function (node) {
			buf.printf("%j",[",",node.args]);
		},
		newExpr: function (node) {
			var p=node.params;
			if (p) {
				buf.printf("new %v%v",node.klass,p);
			} else {
				buf.printf("new %v",node.klass);
			}
		},
		scall: function (node) {
			buf.printf("[%j]", [",",node.args]);
		},
		superExpr: function (node) {
			var name;
			if (!klass.superclass) throw new Error(klass.fullName+"には親クラスがありません");
			if (node.name) {
				name=node.name.text;
				buf.printf("%s.prototype.%s.apply( %s, %v)",
						getClassName(klass.superclass),  name, THIZ, node.params);
			} else {
				buf.printf("%s.apply( %s, %v)",
						getClassName(klass.superclass), THIZ, node.params);
			}
		},
		arrayElem: function (node) {
			buf.printf("[%v]",node.subscript);
		},
		member: function (node) {
			buf.printf(".%v",node.name);
		},
		symbol: function (node) {
			buf.print(node.text);
		},
		"normalFor": function (node) {
			buf.printf("%v; %v; %v", node.init, node.cond, node.next);
		},
		compound: function (node) {
			var an=annotation(node);
			if (!ctx.noWait &&
					(an.fiberCallRequired || an.hasJump || an.hasReturn) ) {
				buf.printf("%j", ["%n",node.stmts]);
			} else {
				/*if (ctx.noSurroundBrace) {
					ctx.enter({noSurroundBrace:false,noWait:true},function () {
						buf.printf("%{%j%n%}", ["%n",node.stmts]);
					});
				} else {*/
					ctx.enter({noWait:true},function () {
						buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
					});
				//}
			}
		},
	"typeof": function (node) {
		buf.printf("typeof ");
	},
	"instanceof": function (node) {
		buf.printf(" instanceof ");
	},
	"is": function (node) {
		buf.printf(" instanceof ");
	},
	regex: function (node) {
		buf.printf("%s",node.text);
	}
	});
	var opTokens=["++", "--", "!==", "===", "+=", "-=", "*=", "/=",
			"%=", ">=", "<=",
	"!=", "==", ">>", "<<", "&&", "||", ">", "<", "+", "?", "=", "*",
	"%", "/", "^", "~", "\\", ":", ";", ",", "!", "&", "|", "-"
	,"delete"	 ];
	opTokens.forEach(function (opt) {
	v.funcs[opt]=function (node) {
		buf.printf("%s",opt);
	};
	});
	//v.debug=debug;
	v.def=function (node) {
		console.log("Err node=");
		console.log(node);
		throw node.type+" is not defined in visitor:compiler2";
	};
	v.cnt=0;
	function genSource() {//G
		/*if (env.options.compiler.asModule) {
			klass.moduleName=getClassName(klass);
			printf("if (typeof requireSimulator=='object') requireSimulator.setName(%l);%n",klass.moduleName);
			printf("//requirejs(['Tonyu'%f],function (Tonyu) {%{", function (){
				getDependingClasses(klass).forEach(function (k) {
					printf(",%l",k.moduleName);
				});
			});
		}*/
		ctx.enter({}, function () {
			/*var nspObj=CLASS_HEAD+klass.namespace;
			printf("Tonyu.klass.ensureNamespace(%s,%l);%n",CLASS_HEAD.replace(/\.$/,""), klass.namespace);
			if (klass.superclass) {
				printf("%s=Tonyu.klass(%s,[%s],{%{",
						getClassName(klass),
						getClassName(klass.superclass),
						getClassNames(klass.includes).join(","));
			} else {
				printf("%s=Tonyu.klass([%s],{%{",
						getClassName(klass),
						getClassNames(klass.includes).join(","));
			}*/
			printf("Tonyu.klass.define({%{");
			printf("fullName: %l,%n", klass.fullName);
			printf("shortName: %l,%n", klass.shortName);
			printf("namespace: %l,%n", klass.namespace);
			if (klass.superclass) printf("superclass: %s,%n", getClassName(klass.superclass));
			printf("includes: [%s],%n", getClassNames(klass.includes).join(","));
			printf("methods: {%{");
			for (var name in methods) {
				if (debug) console.log("method1", name);
				var method=methods[name];
				ctx.enter({noWait:true, threadAvail:false}, function () {
					genFunc(method);
				});
				if (debug) console.log("method2", name);
				if (!method.nowait ) {
					ctx.enter({noWait:false,threadAvail:true}, function () {
						genFiber(method);
					});
				}
				if (debug) console.log("method3", name);
			}
			printf("__dummy: false%n");
			printf("%}},%n");
			printf("decls: %s%n", JSON.stringify(digestDecls(klass)));
			printf("%}});");
			//printf("%}});%n");
		});
		//printf("Tonyu.klass.addMeta(%s,%s);%n",
		//        getClassName(klass),JSON.stringify(digestMeta(klass)));
		//if (env.options.compiler.asModule) {
		//    printf("//%}});");
		//}
	}
	function digestDecls(klass) {
		var res={methods:{}};
		for (var i in klass.decls.methods) {
			res.methods[i]=
			{nowait:!!klass.decls.methods[i].nowait};
		}
		return res;
	}
	function digestMeta(klass) {//G
		var res={
				fullName: klass.fullName,
				namespace: klass.namespace,
				shortName: klass.shortName,
				decls:{methods:{}}
		};
		for (var i in klass.decls.methods) {
			res.decls.methods[i]=
			{nowait:!!klass.decls.methods[i].nowait};
		}
		return res;
	}
	function genFiber(fiber) {//G
		if (isConstructor(fiber)) return;
		var stmts=fiber.stmts;
		var noWaitStmts=[], waitStmts=[], curStmts=noWaitStmts;
		var opt=true;
		if (opt) {
			stmts.forEach(function (s) {
				if (annotation(s).fiberCallRequired) {
					curStmts=waitStmts;
				}
				curStmts.push(s);
			});
		} else {
			waitStmts=stmts;
		}
		printf(
				"%s%s :function %s(%j) {%{"+
				"var %s=%s;%n"+
				"%svar %s=%s;%n"+
				"var %s=0;%n"+
				"%f%n"+
				"%f%n",
				FIBPRE, fiber.name, genFn(fiber.pos,"f_"+fiber.name), [",",[THNode].concat(fiber.params)],
				THIZ, GET_THIS,
				(fiber.useArgs?"":"//"), ARGS, "Tonyu.A(arguments)",
				FRMPC,
				genLocalsF(fiber),
				nfbody
		);
		if (waitStmts.length>0) {
			printf(
				"%s.enter(function %s(%s) {%{"+
					"if (%s.lastEx) %s=%s.catchPC;%n"+
					"for(var %s=%d ; %s--;) {%{"+
						"switch (%s) {%{"+
						"%}case 0:%{"+
						"%f" +
						"%s.exit(%s);return;%n"+
						"%}}%n"+
					"%}}%n"+
				"%}});%n",
				TH,genFn(fiber.pos,"ent_"+fiber.name),TH,
					TH,FRMPC,TH,
					CNTV, CNTC, CNTV,
						FRMPC,
						// case 0:
						fbody,
						TH,THIZ
			);
		} else {
			printf("%s.retVal=%s;return;%n",TH,THIZ);
		}
		printf("%}},%n");
		function nfbody() {
			ctx.enter({method:fiber, /*scope: fiber.scope,*/ noWait:true, threadAvail:true }, function () {
				noWaitStmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
		function fbody() {
			ctx.enter({method:fiber, /*scope: fiber.scope,*/
				finfo:fiber, pc:1}, function () {
				waitStmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFunc(func) {//G
		var fname= isConstructor(func) ? "initialize" : func.name;
		printf("%s :function %s(%j) {%{"+
					"var %s=%s;%n"+
					"%f%n" +
					"%f" +
				"%}},%n",
				fname, genFn(func.pos,fname), [",",func.params],
				THIZ, GET_THIS,
						genLocalsF(func),
						fbody
		);
		function fbody() {
			ctx.enter({method:func, finfo:func,
				/*scope: func.scope*/ }, function () {
				func.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFuncExpr(node) {//G
		var finfo=annotation(node);// annotateSubFuncExpr(node);

		buf.printf("(function %s(%j) {%{"+
						"%f%n"+
						"%f"+
					"%}})"
				,
					finfo.name, [",", finfo.params],
					genLocalsF(finfo),
						fbody
		);
		function fbody() {
			ctx.enter({noWait: true, threadAvail:false,
				finfo:finfo, /*scope: finfo.scope*/ }, function () {
				node.body.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genFn(pos,name) {//G
		if (!name) name=(fnSeq++)+"";
		return ("_trc_"+klass.shortName+"_"+name)
//        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
	}
	function genSubFunc(node) {//G
		var finfo=annotation(node);// annotateSubFuncExpr(node);
		buf.printf("TFunction %s=new TFunction() {%{"+
					"Object %j;"+
					"public Object apply() {%{"
					"%f%n"+
						"%f"+
					"%}}"
				,
					finfo.name,
					[",", finfo.params],
					genParamsF(finfo),
						genLocalsF(finfo),
						fbody
		);
		function fbody() {
			ctx.enter({noWait: true, threadAvail:false,
				finfo:finfo, /*scope: finfo.scope*/ }, function () {
				node.body.stmts.forEach(function (stmt) {
					printf("%v%n", stmt);
				});
			});
		}
	}
	function genLocalsF(finfo) {//G
		return f;
		function f() {
			ctx.enter({/*scope:finfo.scope*/}, function (){
				for (var i in finfo.locals.varDecls) {
					buf.printf("Object %s;%n",i);
				}
				for (var i in finfo.locals.subFuncDecls) {
					genSubFunc(finfo.locals.subFuncDecls[i]);
				}
			});
		};
	}
	function isConstructor(f) {//G
		return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
	}
	genSource();//G
	klass.src.js=buf.buf;//G
	if (debug) {
		console.log("method4", buf.buf);
		//throw "ERR";
	}
	return buf.buf;
}//B
return {genJava:genJava};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});