// TonyuソースファイルをJavascriptに変換する
var TH="_thread",FRM="_frame",THIZ="_this", FIBPRE="fiber$", LASTPOS="$LASTPOS";
var GET_THIS="this.isTonyuObject?this:'not_a_tonyu_object'";
var ScopeTypes={FIELD:"field", FIBER:"fiber", FUNC:"function", NATIVE:"native",
        LOCAL:"local", THVAR:"threadvar", PARAM:"param"};
function compile(klass, env) {
    initClassDecls(klass, env );
    return genJS(klass, env);
}
function initClassDecls(klass, env ) {
    var s=klass.src.tonyu; //file object
    var node=TonyuLang.parse(s);
    var MAIN={type:"fiber", name:"main",stmts:[]};
    // method := fiber | function
    var fields={}, fibers={main: MAIN}, funcs={}, natives={};
    klass.decls={fields:fields, funcs:funcs, fibers:fibers, natives: natives};
    klass.node=node;
    function nc(o, mesg) {
        if (!o) throw mesg+" is null";
        return o;
    }
    function initMethods(program) {
        if (program.ext) {
            var spcn=program.ext.superClassName.text;
            var spc=env.classes[spcn];
            if (!spc) throw "親クラス "+spc+"は定義されていません";
            klass.superClass=spc;
        }
        program.stmts.forEach(function (stmt) {
            if (stmt.type=="funcDecl") {
                var head=stmt.head;
                if (head.ftype.text=="function") {
                    funcs[head.name.text]={
                            type: "function",
                            name:  head.name.text,
                            head:  head,
                            stmts: stmt.body.stmts
                    };
                } else {
                    fibers[head.name.text]={
                            type: "fiber",
                            name:  head.name.text,
                            head:  head,
                            stmts: stmt.body.stmts
                    };
                }
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
    var className=klass.name;
    var traceTbl=env.traceTbl;
    // method := fiber | function
    var decls=klass.decls;
    var fields=decls.fields,
        fibers=decls.fibers,
        funcs=decls.funcs,
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

    function initTopLevelScope2(klass) {
        var s=topLevelScope;
        var decls=klass.decls;
        for (var i in decls.fields) {
            s[i]=ST.FIELD;
        }
        for (var i in decls.fibers) {
            s[i]=ST.FIBER;
        }
        for (var i in decls.funcs) {
            s[i]=ST.FUNC;
        }
        for (var i in decls.natives) {
            //console.log("itls2:"+klass.name+" natives "+i);
            s[i]=ST.NATIVE;
        }
    }
    function initTopLevelScope() {
        var s=topLevelScope;
        for (var k=klass ; k ; k=k.superClass) {
            //console.log(" itls "+klass.name+"/"+k.name);
            initTopLevelScope2(k);
        }
        for (var i in env.classes) {
            s[i]=ST.NATIVE;
        }
        //s[TH]=ST.NATIVE;
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
        if (!method.head) return [];
        var res=method.head.params.params;
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
            buf.printf("return %v;",node.value);
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
            if (ctx.method.type=="fiber") {
                buf.printf("%j;", [";",node.decls]);
            }else {
                buf.printf("var %j;", [",", node.decls]);
            }
        },
        varAccess: function (node) {
            var n=node.name.text;
            var t=ctx.scope[n];
            if (n.match(/^\$/)) t=ST.NATIVE;
            if (!t) {
                topLevelScope[n]=ST.FIELD;
                t=ST.FIELD;
            }
            if (t==ST.THVAR) {
                buf.printf("%s",TH);
            } else if (t==ST.FIELD || t==ST.FUNC) {
                buf.printf("%s.%s",THIZ, n);
            } else {
                buf.printf("%s",n);
            }
        },
        exprstmt: function (node) {
            /*
             * match(node, {
             *    expr: {
             *       type:"postfix",
             *       op:{type:"call"},
             *       left:{type:"varAccess", name: {text:TX}}
             *    }
             * });

            */
            if (node.expr.type=="postfix" &&
                node.expr.op.type=="call" &&
                node.expr.left.type=="varAccess" &&
                ctx.scope[ node.expr.left.name.text ]==ST.FIBER) {
                buf.printf(
                        "%s.enter( %s.%s%s%v );%n" +
                        "break;%n" +
                        "%}case %s:%{",
                            TH, THIZ, FIBPRE, node.expr.left.name.text, node.expr.op,

                            ctx.pc++
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
            buf.printf("%v%v", node.left, node.op);
        },
        "break": function (node) {
            if (nc(ctx.method,"cmeth-b").type=="fiber") {
                if (ctx.closestBrk) {
                    buf.printf("%s.pc=%z; break;%n", FRM, ctx.closestBrk);
                } else {
                    throw "break； は繰り返しの中で使います";
                }
            } else {
                buf.printf("break;%n");
            }
        },
        "while": function (node) {
            if (nc(ctx.method,"cmeth-w").type=="fiber") {
                var brkpos={};
                var pc=ctx.pc++;
                var isTrue= node.cond.type=="reservedConst" && node.cond.text=="true";
                buf.printf(
                        "break;%n" +
                        "%}case %s:%{" +
                        (isTrue?"%D%D%D":"if (!(%v)) { %s.pc=%z; break; }%n") +
                        "%f%n" +
                        "%s.pc=%s;break;%n" +
                        "%}case %f:%{",
                            //break
                            pc,
                            node.cond, FRM, brkpos,
                            enterV({closestBrk:brkpos}, node.loop),
                            FRM, pc,
                            function () { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("while (%v) { %v }", node.cond, node.loop);
            }
        },
        "for": function (node) {
            if (nc(ctx.method,"cmeth-f").type=="fiber") {
                var brkpos={};
                var pc=ctx.pc++;
                buf.printf(
                        "%v;%n"+
                        "break;%n" +
                        "%}case %s:%{" +
                        "if (!(%v)) { %s.pc=%z; break; }%n" +
                        "%v%n" +
                        "%v%n;" +
                        "%s.pc=%s;break;%n" +
                        "%}case %f:%{",
                            node.inFor.init ,
                            // break;
                            pc,
                            node.inFor.cond, FRM, brkpos,
                            node.loop,
                            node.inFor.next,
                            FRM, pc,
                            function (buf) { buf.print(brkpos.put(ctx.pc++)); }
                );
                //brkpos.put(ctx.pc++);
            } else {
                buf.printf("for (%s%v) { %v }",(node.isVar?"var ":""), node.inFor, node.loop);
            }
        },
        "if": function (node) {
            if (nc(ctx.method,"cmeth-w").type=="fiber") {
                var fipos={}, elpos={};
                if (node._else) {
                    buf.printf(
                            "if (!(%v)) { %s.pc=%z; break; }%n" +
                            "%v%n" +
                            "%s.pc=%z;%n" +
                            "break;%n" +
                            "%}case %f:%{" +
                            "%v%n" +
                            "break;%n"     +
                            "%}case %f:%{"   ,
                                node.cond, FRM, elpos,
                                node.then,
                                FRM, fipos,

                                function () { buf.print(elpos.put(ctx.pc++)); },
                                node._else,

                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );

                } else {
                    buf.printf(
                            "if (!(%v)) { %s.pc=%z; break; }%n" +
                            "%v%n" +
                            "break;%n" +
                            "%}case %f:%{",
                                node.cond, FRM, fipos,
                                node.then,
                                //break;
                                function () { buf.print(fipos.put(ctx.pc++)); }
                    );
                }
            } else {
                if (node._else) {
                    buf.printf("if (%v) { %v } else { %v }", node.cond, node.loop, node._else);
                } else {
                    buf.printf("if (%v) { %v }", node.cond, node.loop);
                }
            }
        },
        ifWait: function (node) {
            var ns=newScope(ctx.scope);
            ns[TH]=ST.THVAR;
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.then);
            });
        },
        useThread: function (node) {
            var ns=newScope(ctx.scope);
            ns[node.threadVarName.text]=ST.THVAR;
            ctx.enter({scope:ns}, function () {
                buf.printf("%v",node.stmt);
            });
        },
        call: function (node) {
            buf.printf("(%j)",[",",node.args]);
        },
        newExpr: function (node) {
            var p=node.params;
            buf.printf("new %v%v",node.name,p);
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
            if (nc(ctx.method,"cmeth-c").type=="fiber") {
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
            for (var name in funcs) {
                var method=funcs[name];
                genFunc(method);
            }
            for (var name in fibers) {
                var fiber=fibers[name];
                genFiber(fiber);
            }
            printf("%}});");
        });
    }
    function genFiber(fiber) {
        var locals={};
        printf(
               "%s%s :function (%j) {%{"+
                 "var %s=%s;%n"+
                 "%z%n"+
                 "return function (%s,%s) {%{"+
                   "switch (%s.pc++) {%{"+
                      "%}case 0:%{"+
                      "%f" +
                      "%s.exit(%s);%n"+
                   "%}};%n"+
                 "%}};%n"+
               "%}},%n"+
               "%s :function () {%{"+
                  "throw '%s is a fiber. cannot be called';%n"+
               "%}},%n",
               FIBPRE, fiber.name, [",",getParams(fiber)],
                   THIZ, GET_THIS,
                   locals,
                   TH,FRM,
                        FRM,
                      fbody,
                      TH,THIZ,
               fiber.name,
                  fiber.name
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
        printf("%s :function (%j) {%{"+
                  "var %s=%s;%n"+
                  "%f" +
               "%}},%n",
               func.name, [",",getParams(func)],
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
    initTopLevelScope();
    genSource();
    klass.src.js=buf.buf;
    return buf.buf;
}

