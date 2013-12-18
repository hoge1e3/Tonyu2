Tonyu.Compiler=function () {
// TonyuソースファイルをJavascriptに変換する
var TH="_thread",THIZ="_this", FIBPRE="fiber$", FRMPC="pc", LASTPOS="$LASTPOS";
var GET_THIS="this.isTonyuObject?this:'not_a_tonyu_object'";
var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param"};
/*function compile(klass, env) {
    initClassDecls(klass, env );
    return genJS(klass, env);
}*/
function initClassDecls(klass, env ) {
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={name:"main",stmts:[]};
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
            spcn=t.T; //program.ext.superClassName.text;
            pos=t.P;  //program.ext.superClassName.pos;
            //console.log("Match!  "+JSON.stringify(t));
            if (spcn=="null") spcn=null;
        }
        if (spcn) {
            var spc=env.classes[spcn];
            if (!spc) throw TError ( "親クラス "+spcn+"は定義されていません", s, pos);
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                methods[head.name.text]={
                        ftype:  head.ftype.text,
                        name:  head.name.text,
                        head:  head,
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


function genJS(klass, env,pass) {
    var srcFile=klass.src.tonyu; //file object

    var OM=ObjectMatcher;
    var className=klass.name;
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
    var printf=buf.printf;
    var v=null;
    var ctx=context();
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
    //console.log(JSON.stringify( retFiberCallTmpl));
    function initTopLevelScope2(klass) {
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=ST.FIELD;
        }
        for (var i in decls.methods) {
            s[i]=ST.METHOD;
        }
    }
    function initTopLevelScope() {
        var s=topLevelScope;
        for (var k=klass ; k ; k=k.superClass) {
            initTopLevelScope2(k);
        }
        var decls=klass.decls;// Do not inherit parents' natives
        for (var i in decls.natives) {
            s[i]=ST.NATIVE;
        }
        for (var i in env.classes) {
            s[i]=ST.NATIVE;
        }
    }
    function newScope(s) {
        var f=function (){};
        f.prototype=s;
        return new f();
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
    function genParamTbl(method) {
        var r=getParams(method);
        method.scope={};
        r.forEach(function (n) { method.scope[n.text]=ST.PARAM; });
    }
    function enterV(obj, node) {
        return function (buf) {
            ctx.enter(obj,function () {
                v.visit(node);
            });
        };
    }
    function varAccess(n) {
        var t=ctx.scope[n];
        if (n.match(/^\$/)) t=ST.NATIVE;
        if (!t) {
            topLevelScope[n]=ST.FIELD;
            t=ST.FIELD;
        }
        if (t==ST.THVAR) {
            buf.printf("%s",TH);
        } else if (t==ST.FIELD || t==ST.METHOD) {
            buf.printf("%s.%s",THIZ, n);
        } else {
            buf.printf("%s",n);
        }
    }
    v=buf.visitor=Visitor({
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
            this.inFunc=true;
            buf.printf("%v %v",node.head, node.body);
            this.inFunc=false;
        },
        "return": function (node) {
            if (!ctx.noWait) {
                buf.printf("%s.exit(%v);break;",TH,node.value);
            } else {
                buf.printf("return %v;",node.value);
            }
        },
        program: function (node) {
            genClass(node.stmts);
            //buf.printf("%j",["%n",node.stmts]);
        },
        number: function (node) {
            buf.printf("%s", node.value );
        },
        reservedConst: function (node) {
            if (node.text=="this") {
                buf.printf("%s",THIZ);
            } else {
                buf.printf("%s", node.text);
            }
        },
        varDecl: function (node) {
            ctx.scope[node.name.text]=ST.LOCAL;
            if (node.value) {
                buf.printf("%v = %v", node.name, node.value );
            } else {
                buf.printf("%v", node.name);
            }
        },
        varsDecl: function (node) {
            if (!ctx.noWait) {
                buf.printf("%j;", [";",node.decls]);
            }else {
                buf.printf("var %j;", [",", node.decls]);
            }
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            } else {
                buf.printf("%v: %f", node.key, function () {
                    varAccess( node.key.text) ;
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
            var m,ps;
            var body=node.body;
            if (m=OM.match( node, {head:{params:{params:OM.P}}})) {
                ps=m.P;
            } else {
                ps=[];
            }
            buf.printf("function (%j) {%{"+
                          "%f"+
                       "%}}"
                     ,
                          [",", ps],
                           fbody
            );
            function fbody() {
                var ns=newScope(ctx.scope);
                ps.forEach(function (p) {
                    ns[p.name.text]=ST.PARAM;
                });
                ctx.enter({scope: ns }, function () {
                    body.stmts.forEach(function (stmt) {
                        printf("%v%n", stmt);
                    });
                });
            }
        },
        parenExpr: function (node) {
            buf.printf("(%v)",node.expr);
        },
        varAccess: function (node) {
            var n=node.name.text;
            varAccess(n);
        },
        exprstmt: function (node) {
            var t;
            if (!ctx.noWait && (t=OM.match(node,noRetFiberCallTmpl)) && ctx.scope[t.T]==ST.METHOD) {
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "break;%n" +
                        "%}case %s:%{",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            // break;
                            ctx.pc++
                );
            } else if (!ctx.noWait && (t=OM.match(node,retFiberCallTmpl)) && ctx.scope[t.T]==ST.METHOD) {
                //console.log("match: ");
                //console.log(t);
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "break;%n" +
                        "%}case %s:%{"+
                        "%v%v%s.retVal();%n",
                            TH, THIZ, FIBPRE, t.T, t.A,
                            // break;
                            ctx.pc++,
                            t.L, t.O, TH
                );
            } else {
                buf.printf("%s=%s;%v;",  LASTPOS, traceTbl.add(klass.src.tonyu,node.pos ), node.expr );
            }
        },
        infix: function (node) {
            buf.printf("%v%v%v", node.left, node.op, node.right);
        },
        prefix: function (node) {
            buf.printf("%v%v", node.op, node.right);
        },
        postfix: function (node) {
            if (node.op.type=="objlit") {
                buf.printf("%v(%v)", node.left, node.op);
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
            if (!ctx.noWait) {
                var brkpos=buf.lazy();
                var pc=ctx.pc++;
                var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
                buf.printf(
                        "break;%n" +
                        "%}case %s:%{" +
                        (isTrue?"%D%D%D":"if (!(%v)) { %s=%z; break; }%n") +
                        "%f%n" +
                        "%s=%s;break;%n" +
                        "%}case %f:%{",
                            //break
                            pc,
                            node.cond, FRMPC, brkpos,
                            enterV({closestBrk:brkpos}, node.loop),
                            FRMPC, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("while (%v) { %v }", node.cond, node.loop);
            }
        },
        "for": function (node) {
            if (!ctx.noWait) {
                var brkpos={};
                var pc=ctx.pc++;
                buf.printf(
                        "%v;%n"+
                        "break;%n" +
                        "%}case %s:%{" +
                        "if (!(%v)) { %s=%z; break; }%n" +
                        "%v%n" +
                        "%v;%n" +
                        "%s=%s;break;%n" +
                        "%}case %f:%{",
                            node.inFor.init ,
                            // break;
                            pc,
                            node.inFor.cond, FRMPC, brkpos,
                            node.loop,
                            node.inFor.next,
                            FRMPC, pc,
                            function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("for (%s%v) { %v }",(node.isVar?"var ":""), node.inFor, node.loop);
            }
        },
        "if": function (node) {
            if (!ctx.noWait) {
                var fipos={}, elpos={};
                if (node._else) {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "%s=%z;%n" +
                            "break;%n" +
                            "%}case %f:%{" +
                            "%v%n" +
                            "break;%n"     +
                            "%}case %f:%{"   ,
                                node.cond, FRMPC, elpos,
                                node.then,
                                FRMPC, fipos,
                                // break;
                                function () { buf.print(elpos.put(ctx.pc++)); },
                                node._else,
                                // break;
                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );

                } else {
                    buf.printf(
                            "if (!(%v)) { %s=%z; break; }%n" +
                            "%v%n" +
                            "break;%n" +
                            "%}case %f:%{",
                                node.cond, FRMPC, fipos,
                                node.then,
                                //break;
                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );
                }
            } else {
                if (node._else) {
                    buf.printf("if (%v) { %v } else { %v }", node.cond, node.then, node._else);
                } else {
                    buf.printf("if (%v) { %v }", node.cond, node.then);
                }
            }
        },
        useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=ST.THVAR;
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                var ns=newScope(ctx.scope);
                ns[TH]=ST.THVAR;
                ctx.enter({scope:ns}, function () {
                    buf.printf("%v",node.then);
                });
            } else {
                if (node._else) {
                    buf.printf("%v",node._else);
                }
            }
        },
        objlitArg: function (node) {
            buf.printf("(%v)",node.obj);
        },
        call: function (node) {
            buf.printf("%v",node.args);
        },
        argList: function (node) {
            buf.printf("(%j)",[",",node.args]);
        },
        newExpr: function (node) {
            var p=node.params;
            if (p) {
                buf.printf("new %v%v",node.name,p);
            } else {
                buf.printf("new %v",node.name);
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
            if (!ctx.noWait) {
                buf.printf("%j", ["%n",node.stmts]);
            } else {
                buf.printf("{%{%j%n%}}", ["%n",node.stmts]);
            }
        },
        token: function (node) {
            buf.printf("%s",node.text);
        }
    });
    v.def=function (node) {
        if (!node) buf.printf("/*null*/");
        else buf.printf("DEF ! type=%s",node.type);
        console.log("Err node=");
        console.log(node);
        throw node.type+" is not defined in visitor:compiler2";
    };
    v.cnt=0;
    function genSource() {
        ctx.enter({scope:topLevelScope}, function () {
            if (klass.superClass) {
                printf("%s=Tonyu.klass(%s,{%{", className, klass.superClass.name);
            } else {
                printf("%s=Tonyu.klass({%{", className);
            }
            for (var name in methods) {
                var method=methods[name];
                ctx.enter({noWait:true}, function () {
                    genFunc(method);
                });
                ctx.enter({noWait:false}, function () {
                    genFiber(method);
                });
            }
            printf("%}});");
        });
    }
    function genFiber(fiber) {
        var locals={};
        //console.log("Gen fiber");
        printf(
               "%s%s :function (%j) {%{"+
                 "var %s=%s;%n"+
                 "var %s=0;%n"+
                 "%z%n"+
                 "return function (%s) {%{"+
                   "switch (%s++) {%{"+
                      "%}case 0:%{"+
                      "%f" +
                      "%s.exit(%s);%n"+
                   "%}};%n"+
                 "%}};%n"+
               "%}},%n",

               FIBPRE, fiber.name, [",",getParams(fiber)],
                   THIZ, GET_THIS,
                   FRMPC,
                   locals,
                   TH,
                        FRMPC,
                        // case 0:
                      fbody,
                      TH,THIZ
        );
        function fbody() {
            var ps=getParams(fiber);
            var ns=newScope(ctx.scope);
            ps.forEach(function (p) {
                ns[p.name.text]=ST.PARAM;
            });
            ctx.enter({method:fiber, scope: ns, pc:1}, function () {
                fiber.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });

                var lcl=[];
                for (var i in ctx.scope) {
                    //console.log("scp: "+i+"="+ctx.scope[i]);
                    if (ctx.scope[i]==ST.LOCAL) {
                        lcl.push(i);
                    }
                }
                if (lcl.length>0) {
                    locals.put("var "+lcl.join(", ")+";");
                } else {
                    locals.put("/*NOVAR*/");
                }
            });
        }
    }
    function genFunc(func) {
        var fname= isConstructor(func) ? "initialize" : func.name;
        printf("%s :function (%j) {%{"+
                  "var %s=%s;%n"+
                  "%f" +
               "%}},%n",
               fname, [",",getParams(func)],
               THIZ, GET_THIS,
                      fbody
        );
        function fbody() {
            var ps=getParams(func);
            var ns=newScope(ctx.scope);
            ps.forEach(function (p) {
                ns[p.name.text]=ST.PARAM;
            });
            ctx.enter({method:func, scope: ns }, function () {
                func.stmts.forEach(function (stmt) {
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
    return buf.buf;
}
return {initClassDecls:initClassDecls, genJS:genJS};
}();
if (typeof getReq=="function") getReq.exports("Tonyu.Compiler");