if (typeof define!=="function") {//B
	define=require("requirejs").define;
}
define(["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer",
		"context", "Visitor","Tonyu.Compiler"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer,
		context, Visitor,cu) {
return cu.Semantics=(function () {
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
		LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes=cu.ScopeTypes;
var genSt=cu.newScopeType;
var stype=cu.getScopeType;
var newScope=cu.newScope;
//var nc=cu.nullCheck;
var genSym=cu.genSym;
var annotation3=cu.annotation;
var getMethod2=cu.getMethod;
var getDependingClasses=cu.getDependingClasses;
var getParams=cu.getParams;
var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1,Date:1};
function visitSub(node) {//S
	var t=this;
	if (!node || typeof node!="object") return;
	var es;
	if (node instanceof Array) es=node;
	else es=node[Grammar.SUBELEMENTS];
	if (!es) {
		es=[];
		for (var i in node) {
			es.push(node[i]);
		}
	}
	es.forEach(function (e) {
		t.visit(e);
	});
}
//-----------
function initClassDecls(klass, env ) {//S
	// The main task of initClassDecls is resolve 'dependency', it calls before orderByInheritance
	var s=klass.src.tonyu; //file object
	var node;
	klass.hasSemanticError=true;
	if (klass.src && klass.src.js) {
		// falsify on generateJS. if some class hasSemanticError, it remains true
		klass.jsNotUpToDate=true;
	}
	if (klass.node && klass.nodeTimestamp==s.lastUpdate()) {
		node=klass.node;
	}
	if (!node) {
		console.log("Parse "+s);
		node=TonyuLang.parse(s);
		klass.nodeTimestamp=s.lastUpdate();
	}
	//console.log(s+"",  !!klass.node, klass.nodeTimestamp, s.lastUpdate());
	//if (!klass.testid) klass.testid=Math.random();
	//console.log(klass.testid);
	var MAIN={name:"main",stmts:[],pos:0, isMain:true};
	// method := fiber | function
	var fields={}, methods={main: MAIN}, natives={}, amds={},softRefClasses={};
	klass.decls={fields:fields, methods:methods, natives: natives, amds:amds,
	softRefClasses:softRefClasses};
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，AMDモジュール変数
	//   extends/includes以外から参照してれるクラス の集まり．親クラスの宣言は含まない
	klass.node=node;
	/*function nc(o, mesg) {
		if (!o) throw mesg+" is null";
		return o;
	}*/
	var OM=ObjectMatcher;
	function initMethods(program) {
		var spcn=env.options.compiler.defaultSuperClass;
		var pos=0;
		var t;
		if (t=OM.match( program , {ext:{superclassName:{text:OM.N, pos:OM.P}}})) {
			spcn=t.N;
			pos=t.P;
			if (spcn=="null") spcn=null;
		}
		klass.includes=[];
		if (t=OM.match( program , {incl:{includeClassNames:OM.C}})) {
			t.C.forEach(function (i) {
				var n=i.text;/*ENVC*/
				var p=i.pos;
				var incc=env.classes[env.aliases[n] || n];/*ENVC*/ //CFN env.classes[env.aliases[n]]
				if (!incc) throw TError ( "クラス "+n+"は定義されていません", s, p);
				klass.includes.push(incc);
			});
		}
		if (spcn=="Array") {
			klass.superclass={name:"Array",fullName:"Array",builtin:true};
		} else if (spcn) {
			var spc=env.classes[env.aliases[spcn] || spcn];/*ENVC*/  //CFN env.classes[env.aliases[spcn]]
			if (!spc) {
				throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
			}
			klass.superclass=spc;
		} else {
			delete klass.superclass;
		}
		klass.directives={};
		//--
		function addField(name,node) {// name should be node
			node=node||name;
			fields[name+""]={
				node:node,
				klass:klass.fullName,
				name:name+"",
				pos:node.pos
			};
		}
		var fieldsCollector=Visitor({
			varDecl: function (node) {
				addField(node.name, node);
			},
			nativeDecl: function (node) {//-- Unify later
			},
			funcDecl: function (node) {//-- Unify later
			},
			funcExpr: function (node) {
			},
			"catch": function (node) {
			},
			exprstmt: function (node) {
				if (node.expr.type==="literal"
					&& node.expr.text.match(/^.field strict.$/)) {
					klass.directives.field_strict=true;
				}
			},
			"forin": function (node) {
				var isVar=node.isVar;
				if (isVar) {
					node.vars.forEach(function (v) {
						addField(v);
					});
				}
			}
		});
		fieldsCollector.def=visitSub;
		fieldsCollector.visit(program.stmts);
		//-- end of fieldsCollector
		program.stmts.forEach(function (stmt) {
			if (stmt.type=="funcDecl") {
				var head=stmt.head;
				var ftype="function";
				if (head.ftype) {
					ftype=head.ftype.text;
					//console.log("head.ftype:",stmt);
				}
				var name=head.name.text;
				var propHead=(head.params ? "" : head.setter ? "__setter__" : "__getter__");
				name=propHead+name;
				methods[name]={
						nowait: (!!head.nowait || propHead!==""),
						ftype:  ftype,
						name:  name,
						klass: klass.fullName,
						head:  head,
						pos: head.pos,
						stmts: stmt.body.stmts,
						node: stmt
				};
				//annotation(stmt,methods[name]);
				//annotation(stmt,{finfo:methods[name]});
			} else if (stmt.type=="nativeDecl") {
				natives[stmt.name.text]=stmt;
			} else {
				/*if (stmt.type=="varsDecl") {
					stmt.decls.forEach(function (d) {
						//console.log("varDecl", d.name.text);
						//fields[d.name.text]=d;
						fields[d.name.text]={
							node:d,
							klass:klass.fullName,
							name:d.name.text,
							pos:d.pos
						};
					});
				}*/
				MAIN.stmts.push(stmt);
			}
		});
	}
	initMethods(node);        // node=program
	//delete klass.hasSemanticError;
	// Why delete deleted? because decls.methods.params is still undef
}// of initClassDecls
function annotateSource2(klass, env) {//B
	// annotateSource2 is call after orderByInheritance
	klass.hasSemanticError=true;
	var srcFile=klass.src.tonyu; //file object  //S
	var srcCont=srcFile.text();
	function getSource(node) {
		return cu.getSource(srcCont,node);
	}
	var OM=ObjectMatcher;
	var traceTbl=env.traceTbl;
	// method := fiber | function
	var decls=klass.decls;
	var fields=decls.fields,
		methods=decls.methods,
		natives=decls.natives,
		amds=decls.amds;
	// ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，モジュール変数の集まり．親クラスの宣言は含まない
	var ST=ScopeTypes;
	var topLevelScope={};
	// ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
	//  キー： 変数名   値： ScopeTypesのいずれか
	var v=null;
	var ctx=context();
	var debug=false;
	var othersMethodCallTmpl={
			type:"postfix",
			left:{
				type:"postfix",
				left:OM.T,
				op:{type:"member",name:{text:OM.N}}
			},
			op:{type:"call", args:OM.A }
	};
	var memberAccessTmpl={
			type:"postfix",
			left: OM.T,
			op:{type:"member",name:{text:OM.N}}
	};
	// These has same value but different purposes:
	//  myMethodCallTmpl: avoid using bounded field for normal method(); call
	//  fiberCallTmpl: detect fiber call
	var myMethodCallTmpl=fiberCallTmpl={
			type:"postfix",
			left:{type:"varAccess", name: {text:OM.N}},
			op:{type:"call", args:OM.A }
	};
	var noRetFiberCallTmpl={
		expr: fiberCallTmpl
	};
	var retFiberCallTmpl={
		expr: {
			type: "infix",
			op: OM.O,
			left: OM.L,
			right: fiberCallTmpl
		}
	};
	var noRetSuperFiberCallTmpl={
		expr: {type:"superExpr", params:{args:OM.A}, $var:"S"}
	};
	var retSuperFiberCallTmpl={
			expr: {
				type: "infix",
				op: OM.O,
				left: OM.L,
				right: {type:"superExpr", params:{args:OM.A}, $var:"S"}
			}
		};
	klass.annotation={};
	function annotation(node, aobj) {//B
		return annotation3(klass.annotation,node,aobj);
	}
	/*function assertAnnotated(node, si) {//B
		var a=annotation(node);
		if (!a.scopeInfo) {
			console.log(srcCont.substring(node.pos-5,node.pos+20));
			console.log(node, si);
			throw "Scope info not set";
		}
		if (si.type!=a.scopeInfo.type){
			console.log(srcCont.substring(node.pos-5,node.pos+20));
			console.log(node, si , a.scopeInfo);
			throw "Scope info not match";
		}
	}*/
	function initTopLevelScope2(klass) {//S
		if (klass.builtin) return;
		var s=topLevelScope;
		var decls=klass.decls;
		if (!decls) {
			console.log("DECLNUL",klass);
		}
		var i;
		for (i in decls.fields) {
			var info=decls.fields[i];
			s[i]=genSt(ST.FIELD,{klass:klass.fullName,name:i,info:info});
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
		for (i in decls.methods) {
			var info=decls.methods[i];
			var r=Tonyu.klass.propReg.exec(i);
			if (r) {
				s[r[2]]=genSt(ST.PROP,{klass:klass.fullName,name:r[2],info:info});
			} else {
				s[i]=genSt(ST.METHOD,{klass:klass.fullName,name:i,info:info});
			}
			if (info.node) {
				annotation(info.node,{info:info});
			}
		}
	}
	function initTopLevelScope() {//S
		var s=topLevelScope;
		getDependingClasses(klass).forEach(initTopLevelScope2);
		var decls=klass.decls;// Do not inherit parents' natives
		for (var i in decls.natives) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in JSNATIVES) {
			s[i]=genSt(ST.NATIVE,{name:"native::"+i,value:window[i]});
		}
		for (var i in env.aliases) {/*ENVC*/ //CFN  env.classes->env.aliases
			var fullName=env.aliases[i];
			s[i]=genSt(ST.CLASS,{name:i,fullName:fullName,info:env.classes[fullName]});
		}
	}
	function inheritSuperMethod() {//S
		var d=getDependingClasses(klass);
		for (var n in klass.decls.methods) {
			var m2=klass.decls.methods[n];
			d.forEach(function (k) {
				var m=k.decls.methods[n];
				if (m && m.nowait) {
					m2.nowait=true;
				}
			});
		}
	}
	function getMethod(name) {//B
		return getMethod2(klass,name);
	}
	function isFiberMethod(name) {
		return stype(ctx.scope[name])==ST.METHOD &&
		!getMethod(name).nowait ;
	}
	function checkLVal(node) {//S
		if (node.type=="varAccess" ||
				node.type=="postfix" && (node.op.type=="member" || node.op.type=="arrayElem") ) {
			if (node.type=="varAccess") {
				annotation(node,{noBind:true});
			}
			return true;
		}
		console.log("LVal",node);
		throw TError( "'"+getSource(node)+"'は左辺には書けません．" , srcFile, node.pos);
	}
	function getScopeInfo(n) {//S
		var node=n;
		n=n+"";
		var si=ctx.scope[n];
		var t=stype(si);
		if (!t) {
			if (env.amdPaths && env.amdPaths[n]) {
				t=ST.MODULE;
				klass.decls.amds[n]=env.amdPaths[n];
				//console.log(n,"is module");
			} else {
				var isg=n.match(/^\$/);
				if (env.options.compiler.field_strict || klass.directives.field_strict) {
					if (!isg) throw new TError(n+"は宣言されていません（フィールドの場合，明示的に宣言してください）．",srcFile,node.pos);
				}
				t=isg?ST.GLOBAL:ST.FIELD;
			}
			var opt={name:n};
			if (t==ST.FIELD) {
				opt.klass=klass.name;
				klass.decls.fields[n]=klass.decls.fields[n]||{};
				cu.extend(klass.decls.fields[n],{
					klass:klass.fullName,
					name:n
				});//si;
			}
			si=topLevelScope[n]=genSt(t,opt);
		}
		if (t==ST.CLASS) {
			klass.decls.softRefClasses[n]=si;
		}
		return si;
	}
	var localsCollector=Visitor({
		varDecl: function (node) {
			if (ctx.isMain) {
				annotation(node,{varInMain:true});
				annotation(node,{declaringClass:klass});
				//console.log("var in main",node.name.text);
			} else {
				ctx.locals.varDecls[node.name.text]=node;
				//console.log("DeclaringFunc of ",node.name.text,ctx.finfo);
				annotation(node,{declaringFunc:ctx.finfo});
			}
		},
		funcDecl: function (node) {/*FDITSELFIGNORE*/
			ctx.locals.subFuncDecls[node.head.name.text]=node;
			//initParamsLocals(node);??
		},
		funcExpr: function (node) {/*FEIGNORE*/
			//initParamsLocals(node);??
		},
		"catch": function (node) {
			ctx.locals.varDecls[node.name.text]=node;
		},
		exprstmt: function (node) {
		},
		"forin": function (node) {
			var isVar=node.isVar;
			node.vars.forEach(function (v) {
				if (isVar) {
					if (ctx.isMain) {
						annotation(v,{varInMain:true});
						annotation(v,{declaringClass:klass});
					} else {
						ctx.locals.varDecls[v.text]=v;//node??;
						annotation(v,{declaringFunc:ctx.finfo});
					}
				}
			});
			var n=genSym("_it_");
			annotation(node, {iterName:n});
			ctx.locals.varDecls[n]=node;// ??
		}
	});
	localsCollector.def=visitSub;//S

	function collectLocals(node) {//S
		var locals={varDecls:{}, subFuncDecls:{}};
		ctx.enter({locals:locals},function () {
			localsCollector.visit(node);
		});
		return locals;
	}
	function annotateParents(path, data) {//S
		path.forEach(function (n) {
			annotation(n,data);
		});
	}
	function fiberCallRequired(path) {//S
		if (ctx.method) ctx.method.fiberCallRequired=true;
		annotateParents(path, {fiberCallRequired:true} );
	}
	var varAccessesAnnotator=Visitor({//S
		varAccess: function (node) {
			var si=getScopeInfo(node.name);
			var t=stype(si);
			annotation(node,{scopeInfo:si});
		},
		funcDecl: function (node) {/*FDITSELFIGNORE*/
		},
		funcExpr: function (node) {/*FEIGNORE*/
			annotateSubFuncExpr(node);
		},
		objlit:function (node) {
			var t=this;
			var dup={};
			node.elems.forEach(function (e) {
				var kn;
				if (e.key.type=="literal") {
					kn=e.key.text.substring(1,e.key.text.length-1);
				} else {
					kn=e.key.text;
				}
				if (dup[kn]) {
					throw TError( "オブジェクトリテラルのキー名'"+kn+"'が重複しています" , srcFile, e.pos);
				}
				dup[kn]=1;
				//console.log("objlit",e.key.text);
				t.visit(e);
			});
		},
		jsonElem: function (node) {
			if (node.value) {
				this.visit(node.value);
			} else {
				if (node.key.type=="literal") {
					throw TError( "オブジェクトリテラルのパラメタに単独の文字列は使えません" , srcFile, node.pos);
				}
				var si=getScopeInfo(node.key);
				annotation(node,{scopeInfo:si});
			}
		},
		"do": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
		},
		"switch": function (node) {
			var t=this;
			ctx.enter({brkable:true}, function () {
				t.def(node);
			});
		},
		"while": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
			fiberCallRequired(this.path);//option
		},
		"for": function (node) {
			var t=this;
			ctx.enter({brkable:true,contable:true}, function () {
				t.def(node);
			});
		},
		"forin": function (node) {
			node.vars.forEach(function (v) {
				var si=getScopeInfo(v);
				annotation(v,{scopeInfo:si});
			});
			this.visit(node.set);
		},
		ifWait: function (node) {
			var TH="_thread";
			var t=this;
			var ns=newScope(ctx.scope);
			ns[TH]=genSt(ST.THVAR);
			ctx.enter({scope:ns}, function () {
				t.visit(node.then);
			});
			if (node._else) {
				t.visit(node._else);
			}
			fiberCallRequired(this.path);
		},
		"try": function (node) {
			ctx.finfo.useTry=true;
			this.def(node);
		},
		"return": function (node) {
			var t;
			if (!ctx.noWait) {
				if ( (t=OM.match(node.value, fiberCallTmpl)) &&
				isFiberMethod(t.N)) {
					annotation(node.value, {fiberCall:t});
					fiberCallRequired(this.path);
				}
				annotateParents(this.path,{hasReturn:true});
			}
			this.visit(node.value);
		},
		"break": function (node) {
			if (!ctx.brkable) throw TError( "break； は繰り返しまたはswitch文の中で使います." , srcFile, node.pos);
			if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
		},
		"continue": function (node) {
			if (!ctx.contable) throw TError( "continue； は繰り返しの中で使います." , srcFile, node.pos);
			if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
		},
		"reservedConst": function (node) {
			if (node.text=="arguments") {
				ctx.finfo.useArgs=true;
			}
		},
		postfix: function (node) {
			var t;
			this.visit(node.left);
			this.visit(node.op);
			if (t=OM.match(node, myMethodCallTmpl)) {
				var si=annotation(node.left).scopeInfo;
				annotation(node, {myMethodCall:{name:t.N,args:t.A,scopeInfo:si}});
			} else if (t=OM.match(node, othersMethodCallTmpl)) {
				annotation(node, {othersMethodCall:{target:t.T,name:t.N,args:t.A} });
			} else if (t=OM.match(node, memberAccessTmpl)) {
				annotation(node, {memberAccess:{target:t.T,name:t.N} });
			}
		},
		infix: function (node) {
			var opn=node.op.text;
			if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
				checkLVal(node.left);
			}
			this.def(node);
		},
		exprstmt: function (node) {
			var t,m;
			if (node.expr.type==="objlit") {
				throw TError( "オブジェクトリテラル単独の式文は書けません．" , srcFile, node.pos);
			}
			if (!ctx.noWait &&
					(t=OM.match(node,noRetFiberCallTmpl)) &&
					isFiberMethod(t.N)) {
				t.type="noRet";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			} else if (!ctx.noWait &&
					(t=OM.match(node,retFiberCallTmpl)) &&
					isFiberMethod(t.N)) {
				t.type="ret";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			} else if (!ctx.noWait &&
					(t=OM.match(node,noRetSuperFiberCallTmpl)) &&
					t.S.name) {
				m=getMethod(t.S.name.text);
				if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
				if (!m.nowait) {
					t.type="noRetSuper";
					t.superclass=klass.superclass;
					annotation(node, {fiberCall:t});
					fiberCallRequired(this.path);
				}
			} else if (!ctx.noWait &&
					(t=OM.match(node,retSuperFiberCallTmpl)) &&
					t.S.name) {
				m=getMethod(t.S.name.text);
				if (!m) throw new Error("メソッド"+t.S.name.text+" はありません。");
				if (!m.nowait) {
					t.type="retSuper";
					t.superclass=klass.superclass;
					annotation(node, {fiberCall:t});
					fiberCallRequired(this.path);
				}
			}
			this.visit(node.expr);
		},
		varDecl: function (node) {
			var t;
			if (!ctx.noWait &&
					(t=OM.match(node.value,fiberCallTmpl)) &&
					isFiberMethod(t.N)) {
				t.type="varDecl";
				annotation(node, {fiberCall:t});
				fiberCallRequired(this.path);
			}
			this.visit(node.value);
			this.visit(node.typeDecl);
		},
		typeExpr: function (node) {
			resolveType(node);
		}
	});
	function resolveType(node) {//node:typeExpr
		var name=node.name+"";
		var si=getScopeInfo(node.name);
		var t=stype(si);
		//console.log("TExpr",name,si,t);
		if (t===ST.NATIVE) {
			annotation(node, {resolvedType: si.value});
		} else if (t===ST.CLASS){
			annotation(node, {resolvedType: si.info});
		}
	}
	varAccessesAnnotator.def=visitSub;//S
	function annotateVarAccesses(node,scope) {//S
		ctx.enter({scope:scope}, function () {
			varAccessesAnnotator.visit(node);
		});
	}
	function copyLocals(finfo, scope) {//S
		var locals=finfo.locals;
		for (var i in locals.varDecls) {
			//console.log("LocalVar ",i,"declared by ",finfo);
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.varDecls[i],{scopeInfo:si});
		}
		for (var i in locals.subFuncDecls) {
			var si=genSt(ST.LOCAL,{declaringFunc:finfo});
			scope[i]=si;
			annotation(locals.subFuncDecls[i],{scopeInfo:si});
		}
	}
	function resolveTypesOfParams(params) {
		params.forEach(function (param) {
			if (param.typeDecl) {
			//console.log("restype",param);
			resolveType(param.typeDecl.vtype);
			}
		});
	}
	function initParamsLocals(f) {//S
		//console.log("IS_MAIN", f.name, f.isMain);
		ctx.enter({isMain:f.isMain,finfo:f}, function () {
			f.locals=collectLocals(f.stmts);
			f.params=getParams(f);
		});
		resolveTypesOfParams(f.params);
	}
	function annotateSubFuncExpr(node) {// annotateSubFunc or FuncExpr
		var m,ps;
		var body=node.body;
		var name=(node.head.name ? node.head.name.text : "anonymous_"+node.pos );
		if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
			ps=m.P;
		} else {
			ps=[];
		}
		var finfo={};
		var ns=newScope(ctx.scope);
		//var locals;
		ctx.enter({finfo: finfo}, function () {
			ps.forEach(function (p) {
				var si=genSt(ST.PARAM,{declaringFunc:finfo});
				annotation(p,{scopeInfo:si});
				ns[p.name.text]=si;
			});
			finfo.locals=collectLocals(body);
			copyLocals(finfo, ns);
			annotateVarAccesses(body,ns);
		});
		finfo.scope=ns;
		finfo.name=name;
		finfo.params=ps;
		//var res={scope:ns, locals:finfo.locals, name:name, params:ps};
		resolveTypesOfParams(finfo.params);
		//annotation(node,res);
		annotation(node,{info:finfo});
		annotateSubFuncExprs(finfo.locals, ns);
		return finfo;
	}
	function annotateSubFuncExprs(locals, scope) {//S
		ctx.enter({scope:scope}, function () {
			for (var n in locals.subFuncDecls) {
				annotateSubFuncExpr(locals.subFuncDecls[n]);
			}
		});
	}
	function annotateMethodFiber(f) {//S
		//f:info  (of method)
		var ns=newScope(ctx.scope);
		f.params.forEach(function (p,cnt) {
			var si=genSt(ST.PARAM,{
				klass:klass.name, name:f.name, no:cnt, declaringFunc:f
			});
			ns[p.name.text]=si;
			annotation(p,{scopeInfo:si,declaringFunc:f});
		});
		copyLocals(f, ns);
		ctx.enter({method:f,finfo:f, noWait:false}, function () {
			annotateVarAccesses(f.stmts, ns);
		});
		f.scope=ns;
		annotateSubFuncExprs(f.locals, ns);
		return ns;
	}
	function annotateSource() {//S
		ctx.enter({scope:topLevelScope}, function () {
			for (var name in methods) {
				if (debug) console.log("anon method1", name);
				var method=methods[name];
				initParamsLocals(method);//MAINVAR
				annotateMethodFiber(method);
			}
		});
	}
	initTopLevelScope();//S
	inheritSuperMethod();//S
	annotateSource();
	delete klass.hasSemanticError;
}//B  end of annotateSource2
return {initClassDecls:initClassDecls, annotate:annotateSource2};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});
