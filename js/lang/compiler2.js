Tonyu.Compiler=function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", ARGS="_arguments",FIBPRE="fiber$", FRMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100;
var BINDF="Tonyu.bindFunc";
var INVOKE_FUNC="Tonyu.invokeMethod";
var CALL_FUNC="Tonyu.callFunc";
var CHK_NN="Tonyu.checkNonNull";
var CLASS_HEAD="Tonyu.classes.", GLOBAL_HEAD="Tonyu.globals.";
var GET_THIS="this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var ITER="Tonyu.iterator";
var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};
function genSt(st, options) {
    var res={type:st};
    if (options) {
        for (var k in options) res[k]=options[k];
    }
    if (!res.name) res.name=genSym("_"+st+"_");
    return res;
}
function stype(st) {
    return st ? st.type : null;
}
/*function compile(klass, env) {
    initClassDecls(klass, env );
    return genJS(klass, env);
}*/
function initClassDecls(klass, env ) {
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={name:"main",stmts:[],pos:0};
    // method := fiber | function
    var fields={}, methods={main: MAIN}, natives={};
    klass.decls={fields:fields, methods:methods, natives: natives};
    klass.node=node;
    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    var OM=ObjectMatcher;
    function initMethods(program) {
        var spcn=env.options.compiler.defaultSuperClass;
        var pos=0;
        var t;
        if (t=OM.match( program , {ext:{superClassName:{text:OM.T, pos:OM.P}}})) {
            spcn=t.T;
            pos=t.P;
            if (spcn=="null") spcn=null;
        }
	klass.includes=[];
        if (t=OM.match( program , {incl:{includeClassNames:OM.C}})) {
	    t.C.forEach(function (i) {
		var n=i.text;
		var p=i.pos;
		var incc=env.classes[n];
		if (!incc) throw TError ( "クラス "+n+"は定義されていません", s, p);
		klass.includes.push(incc);
            });
	}
        if (spcn=="Array") {
            klass.superClass={name:"Array",builtin:true};
        } else if (spcn) {
            var spc=env.classes[spcn];
            if (!spc) throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                methods[head.name.text]={
                        nowait: !!head.nowait,
                        ftype:  head.ftype.text,
                        name:  head.name.text,
                        head:  head,
                        pos: head.pos,
                        stmts: stmt.body.stmts
                };
            } else if (stmt.type=="nativeDecl") {
                natives[stmt.name.text]=stmt;
            } else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    // if(pass==1)
    initMethods(node);        // node=program
}
function genSym(prefix) {
    return prefix+(Math.random()+"").replace(/\./g,"");
}
function describe(node, desc) {
    node.DESC=desc; //typeof desc=="object"?JSON.stringify(desc)+desc;
}
function addTypeHint(expr, type) {
    if (!window.typeHints) window.typeHints=[];
    window.typeHints.push({expr:expr, type:type});
}
function getDesc(node) {
    if (node.DESC) return node.DESC;
    return node;
}


function genJS(klass, env,pass) {
    var srcFile=klass.src.tonyu; //file object
    var srcCont=srcFile.text();
    var OM=ObjectMatcher;
    var className=getClassName(klass);
    var traceTbl=env.traceTbl;
    // method := fiber | function
    var decls=klass.decls;
    var fields=decls.fields,
        methods=decls.methods,
        natives=decls.natives;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
    var ST=ScopeTypes;
    var topLevelScope={};
    // ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
    //  キー： 変数名   値： ScopeTypesのいずれか
    var buf=IndentBuffer();
    var fnSeq=0;
    var printf=buf.printf;
    var v=null;
    var diagnose=env.options.compiler.diagnose;
    var ctx=context();
    var debug=false;
    var fiberCallTmpl={
            type:"postfix",
            op:{$var:"A",type:"call" },
            left:{type:"varAccess", name: {text:OM.T}}
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
        expr: {type:"superExpr", $var:"S"}
    };
    var retSuperFiberCallTmpl={
            expr: {
                type: "infix",
                op: OM.O,
                left: OM.L,
                right: {type:"superExpr", $var:"S"}
            }
        };
    function getSource(node) {
        return srcCont.substring(node.pos,node.pos+node.len);
    }
    function getClassName(klass){
        if (typeof klass=="string") return CLASS_HEAD+klass;
        if (klass.builtin) return klass.name;
        return CLASS_HEAD+klass.name;
    }
    function getDependingClasses(klass) {
        var visited={};
        var incls=[];
        var res=[];
        for (var k=klass ; k ; k=k.superClass) {
        	incls=incls.concat(k.includes);
        	visited[getClassName(k)]=true;
        	res.push(k);
        }
        while (incls.length>0) {
        	var k=incls.shift();
        	if (visited[getClassName(k)]) continue;
        	visited[getClassName(k)]=true;
        	res.push(k);
            incls=incls.concat(k.includes);
        }
    	return res;
    }
    //console.log(JSON.stringify( retFiberCallTmpl));
    function initTopLevelScope2(klass) {
    	if (klass.builtin) return;
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=genSt(ST.FIELD,{klass:klass.name,name:i});
        }
        for (var i in decls.methods) {
            s[i]=genSt(ST.METHOD,{klass:klass.name, name:i});
        }
    }
    function initTopLevelScope() {
        var s=topLevelScope;
        getDependingClasses(klass).forEach(initTopLevelScope2);
        /*
        var inclV={};
        for (var k=klass ; k ; k=k.superClass) {
            inclV[getClassName(k)]=true;
            initTopLevelScope2(k);
        }
        var incls=klass.includes.concat([]);
        while (incls.length>0) {
        	var k=incls.shift();
        	if (inclV[getClassName(k)]) continue;
        	inclV[getClassName(k)]=true;
            initTopLevelScope2(k);
            incls=incls.concat(k.includes);
        }*/
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=genSt(ST.NATIVE,{name:"native::"+i});
        }
        for (var i in env.classes) {
            s[i]=genSt(ST.CLASS,{name:i});
        }
    }
    function newScope(s) {
        var f=function (){};
        f.prototype=s;
        return new f();
    }
    function getMethod(name) {
    	var res=null;
    	getDependingClasses(klass).forEach(function (k) {
    		if (res) return;
            res=k.decls.methods[name];
    	});
    	return res; /*
    	for (var k=klass; k ; k=k.superClass) {
            if (k.decls.methods[name]) return k.decls.methods[name];
        }
        return null;*/
    }

    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    function getParams(method) {
        //console.log("genparam : name="+method.name);
        if (!method.head) return [];
        var res=method.head.params.params;
        if (!res.forEach) throw method+" is not array ";
        return res;
    }
    /*function genParamTbl(method) {
        var r=getParams(method);
        method.scope={};
        r.forEach(function (n) { method.scope[n.text]=genSt(ST.PARAM); });
    }*/
    function checkLVal(node) {
        if (node.type=="varAccess" ||
                node.type=="postfix" && (node.op.type=="member" || node.op.type=="arrayElem") ) {
            return true;
        }
        console.log("LVal",node);
        throw TError( "'"+getSource(node)+"'は左辺には書けません．" , srcFile, node.pos);
    }
    function enterV(obj, node) {
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function getScopeInfo(n) {
        var si=ctx.scope[n];
        var t=stype(si);
        if (!t) {
            var isg=n.match(/^\$/);
            t=isg?ST.GLOBAL:ST.FIELD;
            var opt={name:n};
            if (!isg) opt.klass=klass.name;
            si=topLevelScope[n]=genSt(t,opt);
        }
        return si;
    }
    function varAccess(n, postfixIsCall) {
        var si=getScopeInfo(n);
        var t=stype(si);
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD) {
            buf.printf("%s.%s",THIZ, n);
        } else if (t==ST.METHOD) {
        	if (postfixIsCall) {
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
            throw "Unknown scope type: "+t;
        }
        return si;
        //buf.printf("/*%s*/",si.name);
    }
    function lastPosF(node) {
        return function () {
            buf.printf("%s%s=%s;%n", (env.options.compiler.commentLastPos?"//":""),
                    LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ));
        };
    }
    v=buf.visitor=Visitor({
        dummy: function (node) {
            buf.printf("",node);
        },
        literal: function (node) {
            buf.printf("%s",node.text);
            //describe(node,"string");
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
        	//genSubFunc(node);
        },
        "return": function (node) {
            if (!ctx.noWait) {
                if (node.value) {
                    buf.printf("%s.exit(%v);return;",TH,node.value);
                } else {
                    buf.printf("%s.exit(%s);return;",TH,THIZ);
                }
            } else {
                if (node.value) {
                    buf.printf("return %v;",node.value);
                } else {
                    buf.printf("return %s;",THIZ);
                }
            }
        },
        program: function (node) {
            genClass(node.stmts);
            //buf.printf("%j",["%n",node.stmts]);
        },
        number: function (node) {
            buf.printf("%s", node.value );
            //describe(node,"number");
        },
        reservedConst: function (node) {
            if (node.text=="this") {
                buf.printf("%s",THIZ);
                //describe(node,klass.name);
            } else if (node.text=="arguments" && !ctx.noWait) {
                buf.printf("%s",ARGS);
            } else {
                buf.printf("%s", node.text);
            }
        },
        varDecl: function (node) {
            ctx.scope[node.name.text]=genSt(ST.LOCAL);
            if (node.value) {
                buf.printf("%v = %v", node.name, node.value );
            } else {
                buf.printf("%v", node.name);
            }
        },
        varsDecl: function (node) {
            lastPosF(node)();
            //if (!ctx.noWait) {
                buf.printf("%j;", [";",node.decls]);
            /*}else {
                buf.printf("var %j;", [",", node.decls]);
            }*/
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            } else {
                buf.printf("%v: %f", node.key, function () {
                    node.scopeInfo=varAccess( node.key.text,false) ;
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
            var si=varAccess(n,false);
            node.scopeInfo=si;
            //describe(node,si.name);
        },
        exprstmt: function (node) {//exprStmt
            var t;
            lastPosF(node)();
            if (!ctx.noWait && (t=OM.match(node,noRetFiberCallTmpl)) &&
                    stype(ctx.scope[t.T])==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++
                );
            } else if (!ctx.noWait && (t=OM.match(node,retFiberCallTmpl)) &&
                    stype(ctx.scope[t.T])==ST.METHOD &&
                    !getMethod(t.T).nowait) {
                //console.log("match: ");
                //console.log(t);
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "%s=%s;return;%n" +/*B*/
                        "%}case %d:%{"+
                        "%v%v%s.retVal();%n",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            FRMPC, ctx.pc,
                            ctx.pc++,
                            t.L, t.O, TH
                );
            } else if (!ctx.noWait && (t=OM.match(node,noRetSuperFiberCallTmpl)) ) {
                var p=getClassName(klass.superClass);
                if (t.S.name) {
                    buf.printf(
                            "%s.enter( %s.prototype.%s%s.apply( %s, %v) );%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{",
                                TH,   p,  FIBPRE, t.S.name.text,  THIZ,  t.S.params,
                                FRMPC, ctx.pc,
                                ctx.pc++
                    );
                }
            } else if (!ctx.noWait && (t=OM.match(node,retSuperFiberCallTmpl)) ) {
                var p=getClassName(klass.superClass);
                if (t.S.name) {
                    buf.printf(
                            "%s.enter( %s.prototype.%s%s.apply( %s, %v) );%n" +
                            "%s=%s;return;%n" +/*B*/
                            "%}case %d:%{"+
                            "%v%v%s.retVal();%n",
                                TH,   p,  FIBPRE, t.S.name.text,  THIZ,  t.S.params,
                                FRMPC, ctx.pc,
                                ctx.pc++,
                                t.L, t.O, TH
                    );
                }
            } else {
                buf.printf("%v;", node.expr );
                //buf.printf("%s=%s;%v;",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ), node.expr );
            }
        },
        infix: function (node) {
            var opn=node.op.text;
            if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
                checkLVal(node.left);
            }
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
            var mr;
            if (diagnose) {
                if (mr=OM.match(node, {left:{type:"varAccess",name:{text:OM.T}}, op:{type:"call"} })) {
                    // T()
                    var si=getScopeInfo(mr.T);
                    var st=stype(si);
                    if (st==ST.FIELD || st==ST.METHOD) {
                        buf.printf("%s(%s, %l, [%j], %l )", INVOKE_FUNC,THIZ, mr.T, [",",node.op.args],"this");
                    } else {
                        buf.printf("%s(%v, [%j], %l)", CALL_FUNC, node.left, [",",node.op.args], getSource(node.left));
                    }
                } else if (mr=OM.match(node, {
                    left:{
                        type:"postfix",left:OM.T,op:{type:"member",name:{text:OM.N}}
                    }, op:{type:"call"}
                })) {
                    buf.printf("%s(%v, %l, [%j], %l )", INVOKE_FUNC, mr.T, mr.N, [",",node.op.args],getSource(mr.T));
                } else if (mr=OM.match(node, {left: OM.L, op:{type:"member",name:{text:OM.N}} } )) {
                    buf.printf("%s(%v,%l).%s", CHK_NN, mr.L, getSource(mr.L), mr.N );
                } else {
                    buf.printf("%v%v", node.left, node.op);
                }
                return;
            }
            if (OM.match(node, {left:{type:"varAccess"}, op:{type:"call"} })) {
                node.left.scopeInfo=varAccess(node.left.name.text,true);
                buf.printf("%v", node.op);
            } else {
                buf.printf("%v%v", node.left, node.op);
            }
        },
        "break": function (node) {
            if (!ctx.noWait) {
                if (ctx.closestBrk) {
                    buf.printf("%s=%z; break;%n", FRMPC, ctx.closestBrk);
                } else {
                    throw TError( "break； は繰り返しの中で使います" , srcFile, node.pos);
                }
            } else {
                buf.printf("break;%n");
            }
        },
        "while": function (node) {
            lastPosF(node)();
            if (!ctx.noWait) {
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
                            enterV({closestBrk:brkpos}, node.loop),
                            FRMPC, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("while (%v) {%f}", node.cond, enterV({noSurroundBrace:true}, node.loop));
            }
        },
        "for": function (node) {
            lastPosF(node)();
            if (node.inFor.type=="forin") {
                var itn=genSym("_it_");
                ctx.scope[itn]=genSt(ST.LOCAL);
                if (!ctx.noWait) {
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
                                enterV({closestBrk:brkpos}, node.loop),//node.loop,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                } else {
                    buf.printf(
                            "var %s=%s(%v,%s);%n"+
                            "while(%s.next()) {%{" +
                               "%f%n"+
                               "%v%n" +
                            "%}}",
                            itn, ITER, node.inFor.set, node.inFor.vars.length,
                            itn,
                            getElemF(itn, node.inFor.isVar, node.inFor.vars),
                            node.loop
                    );
                }

            } else {
                if (!ctx.noWait) {
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
                                enterV({closestBrk:brkpos}, node.loop),//node.loop,
                                node.inFor.next,
                                FRMPC, pc,
                                function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                    );
                    //brkpos.put(ctx.pc++);
                } else {
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
                    //buf.printf("for (%s%v) { %v }",(node.isVar?"var ":""), node.inFor, node.loop);
                }
            }
            function getElemF(itn, isVar, vars) {
                return function () {
                    //var va=(isVar?"var ":"");
                    vars.forEach(function (v,i) {
                        /*if (isVar) */ctx.scope[v.text]=genSt(ST.LOCAL);
                        buf.printf("%s=%s[%s];%n", v.text, itn, i);
                    });
                };
            }
        },
        "if": function (node) {
            lastPosF(node)();
            if (!ctx.noWait) {
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
                if (node._else) {
                    buf.printf("if (%v) {%f} else {%f}", node.cond,
                            enterV({noSurroundBrace:true},node.then),
                            enterV({noSurroundBrace:true},node._else));
                } else {
                    buf.printf("if (%v) {%f}", node.cond,
                            enterV({noSurroundBrace:true},node.then));
                }
            }
        },
        useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=genSt(ST.THVAR);
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                var ns=newScope(ctx.scope);
                ns[TH]=genSt(ST.THVAR);
                ctx.enter({scope:ns}, function () {
                    buf.printf("%v",node.then);
                });
            } else {
                if (node._else) {
                    buf.printf("%v",node._else);
                }
            }
        },
        call: function (node) {
        	buf.printf("(%j)", [",",node.args]);
        	//buf.printf("(%v)",node.args);
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
        	//buf.printf("[%v]",node.args);
        },
        superExpr: function (node) {
            var name;
            if (node.name) {
                name=node.name.text;
                buf.printf("%s.prototype.%s.apply( %s, %v)",
                        getClassName(klass.superClass),  name, THIZ, node.params);
            } else {
                buf.printf("%s.apply( %s, %v)",
                        getClassName(klass.superClass), THIZ, node.params);
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
            //describe(node,node.text);
        },
        "normalFor": function (node) {
            buf.printf("%v; %v; %v", node.init, node.cond, node.next);
        },
        compound: function (node) {
            if (!ctx.noWait) {
                buf.printf("%j", ["%n",node.stmts]);
            } else {
                if (ctx.noSurroundBrace) {
                    ctx.enter({noSurroundBrace:false},function () {
                        buf.printf("%{%j%n%}", ["%n",node.stmts]);
                    });
                } else {
                    buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
                }
            }
        },
	"typeof": function (node) {
	    buf.printf("typeof ");
	},
	"instanceof": function (node) {
	    buf.printf(" instanceof ");
	},
	regex: function (node) {
	    buf.printf("%s",node.text);
	}
	/*,
        token: function (node) {
            if (node.text=="typeof") {
                buf.printf("%s ",node.text);
            } else if (node.text=="instanceof") {
                buf.printf(" %s ",node.text);
            } else {
                buf.printf("%s",node.text);
            }
        }*/
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
        //if (!node) buf.printf("/*null*/");
        //else buf.printf("DEF ! type=%s",node.type);
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    var scopeChecker=Visitor({
    	varDecl: function (node) {
    		ctx.locals.varDecls[node.name.text]=node;
    	},
    	funcDecl: function (node) {/*FDITSELFIGNORE*/
    		ctx.locals.subFuncDecls[node.head.name.text]=node;
    	},
        funcExpr: function (node) {/*FEIGNORE*/
        },
        exprstmt: function (node) {
        },
	"forin": function (node) {
            var isVar=node.isVar;
	    node.vars.forEach(function (v) {
		/* if (isVar) */ctx.locals.varDecls[v.text]=node;
	    });
	}
    });
    scopeChecker.def=function (node) {
    	var t=this;
    	if (!node) return;
    	var es;
    	if (node instanceof Array) es=node;
    	else es=node[Grammar.SUBELEMENTS];
    	if (!es) {
        	return;
    	}
    	es.forEach(function (e) {
    		t.visit(e);
    	});
    };
    function checkLocals(node, scope) {
    	var locals={varDecls:{}, subFuncDecls:{}};
    	ctx.enter({locals:locals},function () {
        	scopeChecker.visit(node);
    	});
    	//buf.print("/*");
    	for (var i in locals.varDecls) {
    		scope[i]=genSt(ST.LOCAL);
    		//buf.printf("%s,",i);
    	}
    	for (var i in locals.subFuncDecls) {
    		scope[i]=genSt(ST.LOCAL);
    		//buf.printf("%s,",i);
    	}
    	//buf.print("*/");
    	return locals;
    }
    function genLocalsF(locals,scope) {
    	return f;
    	function f() {
    		ctx.enter({scope:scope}, function (){
    			for (var i in locals.varDecls) {
    				buf.printf("var %s;%n",i);
    			}
    			for (var i in locals.subFuncDecls) {
    				genSubFunc(locals.subFuncDecls[i]);
    			}
    		});
    	};
    }
    /*function checkLocalsF(node) {
    	return function () {
    		return checkLocals(node);
    	};
    }*/
    function getClassNames(cs){
	var res=[];
	cs.forEach(function (c) { res.push(getClassName(c)); });
	return res;
    }
    function genSource() {
        ctx.enter({scope:topLevelScope}, function () {
            if (klass.superClass) {
                printf("%s=Tonyu.klass(%s,[%s],{%{",
		       getClassName(klass),
		       getClassName(klass.superClass),
		       getClassNames(klass.includes).join(","));
            } else {
                printf("%s=Tonyu.klass([%s],{%{",
		       getClassName(klass),
		       getClassNames(klass.includes).join(","));
            }
            for (var name in methods) {
                if (debug) console.log("method1", name);
                var method=methods[name];
                ctx.enter({noWait:true}, function () {
                    genFunc(method);
                });
                if (debug) console.log("method2", name);
                //v.debug=debug;
                ctx.enter({noWait:false}, function () {
                    genFiber(method);
                });
                if (debug) console.log("method3", name);
            }
            printf("%}});");
        });
    }
    function genFiber(fiber) {
    	//var locals={};
        //console.log("Gen fiber");
        var ps=getParams(fiber);
        var ns=newScope(ctx.scope);
        ps.forEach(function (p,cnt) {
            ns[p.name.text]=genSt(ST.PARAM,{klass:klass.name, name:fiber.name, no:cnt});
        });
        var locals=checkLocals(fiber.stmts , ns);
        printf(
               "%s%s :function (%j) {%{"+
                 "var %s=%s;%n"+
                 "var %s=%s;%n"+
                 "var %s=0;%n"+
                 "%f%n"+
//                 "%z%n"+
                 "return function %s(%s) {%{"+
                   "for(var %s=%d ; %s--;) {%{"+
                     "switch (%s) {%{"+
                        "%}case 0:%{"+
                        "%f" +
                        "%s.exit(%s);return;%n"+
                     "%}}%n"+
                   "%}}%n"+
                 "%}};%n"+
               "%}},%n",

               FIBPRE, fiber.name, [",",getParams(fiber)],
                   THIZ, GET_THIS,
                   ARGS, "arguments",
                   FRMPC,
                   genLocalsF(locals, ns),
//                   locals,
                   genFn(fiber.pos),TH,
                   CNTV, CNTC, CNTV,
                        FRMPC,
                        // case 0:
                      fbody,
                      TH,THIZ
        );
        function fbody() {
            ctx.enter({method:fiber, scope: ns, pc:1}, function () {
                fiber.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFunc(func) {
        var fname= isConstructor(func) ? "initialize" : func.name;
        var ps=getParams(func);
        var ns=newScope(ctx.scope);
        ps.forEach(function (p,cnt) {
            ns[p.name.text]=genSt(ST.PARAM,{klass:klass.name,name:func.name,no:cnt});
        });
        var locals=checkLocals(func.stmts,ns);
        printf("%s :function %s(%j) {%{"+
                  "var %s=%s;%n"+
                  "%f%n" +
                  "%f" +
               "%}},%n",
               fname, genFn(func.pos), [",",getParams(func)],
               THIZ, GET_THIS,
               	      genLocalsF(locals, ns),
                      fbody
        );
        function fbody() {
            ctx.enter({method:func, scope: ns }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFuncExpr(node) {
        var m,ps;
        var body=node.body;
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=genSt(ST.PARAM);
        });
        var locals=checkLocals(body, ns);
        buf.printf("function (%j) {%{"+
                       "%f%n"+
                       "%f"+
                   "%}}"
                 ,
                    [",", ps],
                 	genLocalsF(locals, ns),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, scope: ns }, function () {
                body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFn(pos) {
        return ("_trc_func_"+traceTbl.add(klass/*.src.tonyu*/,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
    }
    function genSubFunc(node) {
    	var m,ps;
        var body=node.body;
        var name=node.head.name.text;
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=genSt(ST.PARAM);
        });
        var locals=checkLocals(body, ns);
        buf.printf("function %s(%j) {%{"+
                      "%f%n"+
                      "%f"+
                   "%}}"
                 ,
                     name,[",", ps],
                  	genLocalsF(locals,ns),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, scope: ns }, function () {
                body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }

    function isConstructor(f) {
        return OM.match(f, {ftype:"constructor"}) || OM.match(f, {name:"new"});
    }
    initTopLevelScope();
    genSource();
    klass.src.js=buf.buf;
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }

    return buf.buf;
}
return {initClassDecls:initClassDecls, genJS:genJS};
}();
if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
