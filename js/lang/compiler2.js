if (typeof define!=="function") {//B
   define=require("requirejs").define;
}
define(["Tonyu", "Tonyu.Iterator", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer", "context", "Visitor","compilerUtil"],
function(Tonyu, Tonyu_iterator, TonyuLang, ObjectMatcher, TError, IndentBuffer, context, Visitor,cu) {
return Tonyu.Compiler=(function () {
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
/*var symSeq=1;//B
function genSt(st, options) {//B
    var res={type:st};
    if (options) {
        for (var k in options) res[k]=options[k];
    }
    if (!res.name) res.name=genSym("_"+st+"_");
    return res;
}*/
var genSt=cu.newScopeType;
/*function stype(st) {//B
    return st ? st.type : null;
}*/
var stype=cu.getScopeType;
/*function newScope(s) {//B
    var f=function (){};
    f.prototype=s;
    return new f();
}*/
var newScope=cu.newScope;
/*function nc(o, mesg) {//B
    if (!o) throw mesg+" is null";
    return o;
}*/
var nc=cu.nullCheck;
/*function genSym(prefix) {//B
    return prefix+((symSeq++)+"").replace(/\./g,"");
}*/
var genSym=cu.genSym;
/*function annotation3(aobjs, node, aobj) {//B
    if (!node._id) {
        if (!aobjs._idseq) aobjs._idseq=0;
        node._id=++aobjs._idseq;
    }
    var res=aobjs[node._id];
    if (!res) res=aobjs[node._id]={node:node};
    if (aobj) {
        for (var i in aobj) res[i]=aobj[i];
    }
    return res;
}*/
var annotation3=cu.annotation;
/*function getSource(node) {//B
    return srcCont.substring(node.pos,node.pos+node.len);
}*/
var getSource=cu.getSource;
/*function getMethod2(klass,name) {//B
    var res=null;
    getDependingClasses(klass).forEach(function (k) {
        if (res) return;
        res=k.decls.methods[name];
    });
    return res;
}*/
var getMethod2=cu.getMethod;
/*function getDependingClasses(klass) {//B
    var visited={};
    var incls=[];
    var res=[];
    for (var k=klass ; k ; k=k.superClass) {
        incls=incls.concat(k.includes);
        visited[k.fullName]=true;
        res.push(k);
    }
    while (incls.length>0) {
        var k=incls.shift();
        if (visited[k.fullName]) continue;
        visited[k.fullName]=true;
        res.push(k);
        incls=incls.concat(k.includes);
    }
    return res;
}*/
var getDependingClasses=cu.getDependingClasses;
/*function getParams(method) {//B
    if (!method.head) return [];
    var res=method.head.params.params;
    if (!res.forEach) throw method+" is not array ";
    return res;
}*/
var getParams=cu.getParams;

//-----------
function initClassDecls(klass, env ) {//S
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
        if (t=OM.match( program , {ext:{superClassName:{text:OM.N, pos:OM.P}}})) {
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
            klass.superClass={name:"Array",fullName:"Array",builtin:true};
        } else if (spcn) {
            var spc=env.classes[env.aliases[spcn] || spcn];/*ENVC*/  //CFN env.classes[env.aliases[spcn]]
            if (!spc) {
                throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            }
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                var ftype="function";
                if (head.ftype) {
                    ftype=head.ftype.text;
                    //console.log("head.ftype:",stmt);
                }
                methods[head.name.text]={
                        nowait: (!!head.nowait),
                        ftype:  ftype,
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
function genJS(klass, env,pass) {//B
    var srcFile=klass.src.tonyu; //file object  //S
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
    function initTopLevelScope2(klass) {//S
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
    function initTopLevelScope() {//S
        var s=topLevelScope;
        getDependingClasses(klass).forEach(initTopLevelScope2);
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=genSt(ST.NATIVE,{name:"native::"+i});
        }
        for (var i in env.aliases) {/*ENVC*/ //CFN  env.classes->env.aliases
            s[i]=genSt(ST.CLASS,{name:i});
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
    function enterV(obj, node) {//G
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function getScopeInfo(n) {//S
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
            throw "Unknown scope type: "+t;
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
            buf.printf("%s%s=%s;%n", (env.options.compiler.commentLastPos?"//":""),
                    LASTPOS, traceTbl.add(klass/*.src.tonyu*/,node.pos ));
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
            /*if ( stype( ctx.scope[node.name.text])!=ST.LOCAL  ) {
                console.log(node);throw "Not localled";// in funcexpr/subfunc
            }
            ctx.scope[node.name.text]=genSt(ST.LOCAL);*/
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
                var p=getClassName(klass.superClass);
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
                            enterV({closestBrk:brkpos}, node.loop),
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
                /*if ( stype(ctx.scope[itn])!=ST.LOCAL) {
                    console.log(node);throw "Not localled";// in funcexpr/subfunc
                }*/
                //ctx.scope[itn]=genSt(ST.LOCAL);
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
                                enterV({closestBrk:brkpos}, node.loop),//node.loop,
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
                                enterV({closestBrk:brkpos}, node.loop),//node.loop,
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
                    //var va=(isVar?"var ":"");
                    vars.forEach(function (v,i) {
                        /*if ( stype(ctx.scope[v.text])!=ST.LOCAL) {
                            console.log(itn,v,i);throw "Not localled";// in funcexpr/subfunc
                        }*/
                        /*if (isVar) *///ctx.scope[v.text]=genSt(ST.LOCAL);
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
        /*useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=genSt(ST.THVAR);
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },*/
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
    var localsCollector=Visitor({
        varDecl: function (node) {
            ctx.locals.varDecls[node.name.text]=node;
        },
        funcDecl: function (node) {/*FDITSELFIGNORE*/
            ctx.locals.subFuncDecls[node.head.name.text]=node;
            //initParamsLocals(node);??
        },
        funcExpr: function (node) {/*FEIGNORE*/
            //initParamsLocals(node);??
        },
        exprstmt: function (node) {
        },
        "forin": function (node) {
            var isVar=node.isVar;
            node.vars.forEach(function (v) {
                /* if (isVar) */ctx.locals.varDecls[v.text]=node;
            });
            var n=genSym("_it_");
            annotation(node, {iterName:n});
            ctx.locals.varDecls[n]=node;// ??
        }
    });
    localsCollector.def=visitSub;//S
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
            var si=getScopeInfo(node.name.text);
            annotation(node,{scopeInfo:si});
        },
        funcDecl: function (node) {/*FDITSELFIGNORE*/
        },
        funcExpr: function (node) {/*FEIGNORE*/
            annotateSubFuncExpr(node);
        },
        jsonElem: function (node) {
            if (node.value) {
                this.visit(node.value);
            } else {
                var si=getScopeInfo(node.key.text);
                annotation(node,{scopeInfo:si});
            }
        },
        "do": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "switch": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "while": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "for": function (node) {
            var t=this;
            ctx.enter({jumpable:true}, function () {
                t.def(node);
            });
        },
        "forin": function (node) {
            node.vars.forEach(function (v) {
                var si=getScopeInfo(v.text);
                annotation(v,{scopeInfo:si});
            });
            this.visit(node.set);
        },
        ifWait: function (node) {
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
        "return": function (node) {
            if (!ctx.noWait) annotateParents(this.path,{hasReturn:true});
            this.visit(node.value);
        },
        "break": function (node) {
            if (!ctx.jumpable) throw TError( "break； は繰り返しの中で使います." , srcFile, node.pos);
            if (!ctx.noWait) annotateParents(this.path,{hasJump:true});
        },
        "continue": function (node) {
            if (!ctx.jumpable) throw TError( "continue； は繰り返しの中で使います." , srcFile, node.pos);
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
            if (!ctx.noWait &&
                    (t=OM.match(node,noRetFiberCallTmpl)) &&
                    stype(ctx.scope[t.N])==ST.METHOD &&
                    !getMethod(t.N).nowait) {
                t.type="noRet";
                annotation(node, {fiberCall:t});
                fiberCallRequired(this.path);
            } else if (!ctx.noWait &&
                    (t=OM.match(node,retFiberCallTmpl)) &&
                    stype(ctx.scope[t.N])==ST.METHOD &&
                    !getMethod(t.N).nowait) {
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
                    t.superClass=klass.superClass;
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
                    t.superClass=klass.superClass;
                    annotation(node, {fiberCall:t});
                    fiberCallRequired(this.path);
                }
            }
            this.visit(node.expr);
        }
    });
    varAccessesAnnotator.def=visitSub;//S
    function annotateVarAccesses(node,scope) {//S
        ctx.enter({scope:scope}, function () {
            varAccessesAnnotator.visit(node);
        });
    }
    function copyLocals(locals, scope) {//S
        for (var i in locals.varDecls) {
            scope[i]=genSt(ST.LOCAL);
        }
        for (var i in locals.subFuncDecls) {
            scope[i]=genSt(ST.LOCAL);
        }
    }
    function initParamsLocals(f) {//S
        f.locals=collectLocals(f.stmts);
        f.params=getParams(f);
    }
    function annotateMethodFiber(f) {//S
        var ns=newScope(ctx.scope);
        f.params.forEach(function (p,cnt) {
            ns[p.name.text]=genSt(ST.PARAM,{
                klass:klass.name, name:f.name, no:cnt
            });
        });
        copyLocals(f.locals, ns);
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
                initParamsLocals(method);
                annotateMethodFiber(method);
            }
        });
    }
    function genSource() {//G
        //annotateSource();
        /*if (env.options.compiler.asModule) {
            klass.moduleName=getClassName(klass);
            printf("if (typeof requireSimulator=='object') requireSimulator.setName(%l);%n",klass.moduleName);
            printf("//requirejs(['Tonyu'%f],function (Tonyu) {%{", function (){
                getDependingClasses(klass).forEach(function (k) {
                    printf(",%l",k.moduleName);
                });
            });
        }*/
        ctx.enter({scope:topLevelScope}, function () {
            var nspObj=CLASS_HEAD+klass.namespace;
            printf("Tonyu.klass.ensureNamespace(%s,%l);%n",CLASS_HEAD.replace(/\.$/,""), klass.namespace);
            //printf(nspObj+"="+nspObj+"||{};%n");
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
                //initParamsLocals(method);
                //annotateMethodFiber(method);
                ctx.enter({noWait:true, threadAvail:false}, function () {
                    genFunc(method);
                });
                if (debug) console.log("method2", name);
                //v.debug=debug;
                if (!method.nowait ) {
                    ctx.enter({noWait:false,threadAvail:true}, function () {
                        genFiber(method);
                    });
                }
                if (debug) console.log("method3", name);
            }
            printf("__dummy: false%n");
            printf("%}});%n");
        });
        printf("Tonyu.klass.addMeta(%s,%s);%n",
                getClassName(klass),JSON.stringify(digestMeta(klass)));
        //if (env.options.compiler.asModule) {
        //    printf("//%}});");
        //}
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
               FIBPRE, fiber.name, genFn(fiber.pos), [",",[THNode].concat(fiber.params)],
                 THIZ, GET_THIS,
                 (fiber.useArgs?"":"//"), ARGS, "Tonyu.A(arguments)",
                 FRMPC,
                 genLocalsF(fiber),
                 nfbody
        );
        if (waitStmts.length>0) {
            printf(
                 "%s.enter(function %s(%s) {%{"+
                    "for(var %s=%d ; %s--;) {%{"+
                      "switch (%s) {%{"+
                        "%}case 0:%{"+
                        "%f" +
                        "%s.exit(%s);return;%n"+
                      "%}}%n"+
                    "%}}%n"+
                 "%}});%n",
                 TH,genFn(fiber.pos),TH,
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
            ctx.enter({method:fiber, scope: fiber.scope, noWait:true, threadAvail:true }, function () {
                noWaitStmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
        function fbody() {
            ctx.enter({method:fiber, scope: fiber.scope,
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
               fname, genFn(func.pos), [",",func.params],
               THIZ, GET_THIS,
               	      genLocalsF(func),
                      fbody
        );
        function fbody() {
            ctx.enter({method:func, finfo:func,
                scope: func.scope }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFuncExpr(node) {//G
        var finfo=annotation(node);// annotateSubFuncExpr(node);

        buf.printf("function (%j) {%{"+
                       "%f%n"+
                       "%f"+
                   "%}}"
                 ,
                    [",", finfo.params],
                 	genLocalsF(finfo),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, threadAvail:false,
                finfo:finfo, scope: finfo.scope }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFn(pos) {//G
        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
    }
    function genSubFunc(node) {//G
        var finfo=annotation(node);// annotateSubFuncExpr(node);
        buf.printf("function %s(%j) {%{"+
                      "%f%n"+
                      "%f"+
                   "%}}"
                 ,
                     finfo.name,[",", finfo.params],
                  	genLocalsF(finfo),
                       fbody
        );
        function fbody() {
            ctx.enter({noWait: true, threadAvail:false,
                finfo:finfo, scope: finfo.scope }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function annotateSubFuncExpr(node) {//S
        var m,ps;
        var body=node.body;
        var name=(node.head.name ? node.head.name.text : "anonymous" );
        if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
            ps=m.P;
        } else {
            ps=[];
        }
        var ns=newScope(ctx.scope);
        ps.forEach(function (p) {
            ns[p.name.text]=genSt(ST.PARAM);
        });
        var locals=collectLocals(body, ns);
        copyLocals(locals,ns);
        var finfo=annotation(node);
        ctx.enter({finfo: finfo}, function () {
            annotateVarAccesses(body,ns);
        });
        var res={scope:ns, locals:locals, name:name, params:ps};
        annotation(node,res);
        annotation(node,finfo);
        annotateSubFuncExprs(locals, ns);
        return res;
    }
    function annotateSubFuncExprs(locals, scope) {//S
        ctx.enter({scope:scope}, function () {
            for (var n in locals.subFuncDecls) {
                annotateSubFuncExpr(locals.subFuncDecls[n]);
            }
        });
    }
    function genLocalsF(finfo) {//G
        return f;
        function f() {
            ctx.enter({scope:finfo.scope}, function (){
                for (var i in finfo.locals.varDecls) {
                    buf.printf("var %s;%n",i);
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
    initTopLevelScope();//S
    inheritSuperMethod();//S
    annotateSource();//S
    genSource();//G
    klass.src.js=buf.buf;//G
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }

    return buf.buf;
}//B
return {initClassDecls:initClassDecls, genJS:genJS};
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");
});