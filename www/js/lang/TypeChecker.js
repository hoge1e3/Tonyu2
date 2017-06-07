if (typeof define!=="function") {
   define=require("requirejs").define;
}
define(["Visitor","Tonyu.Compiler","context"],function (Visitor,cu,context) {
    var ex={"[SUBELEMENTS]":1,pos:1,len:1};
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
    var JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
var TypeChecker={};
TypeChecker.check=function (klass,env) {
    function annotation(node, aobj) {//B
        return annotation3(klass.annotation,node,aobj);
    }
    function visitSub(node) {//S
        var t=this;
        if (!node || typeof node!="object") return;
        //console.log("TCV",node.type,node);
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

    var checker=Visitor({
        number: function (node) {
            annotation(node,{vtype:Number});
        },
        literal: function (node) {
            annotation(node,{vtype:String});
        },
        varAccess: function (node) {
            var a=annotation(node);
            var si=a.scopeInfo;
            if (si) {
                if (si.vtype) {
                    console.log("VA typeof",node.name+":",si.vtype);
                    annotation(node,{vtype:si.vtype});
                } else if (si.type===ScopeTypes.FIELD) {
                    var fld=klass.decls.fields[node.name+""];
                    if (!fld) {
                        // because parent field does not contain...
                        console.log("TC Warning: fld not found",klass,node.name+"");
                        return;
                    }
                    var vtype=fld.vtype;
                    if (!vtype) {
                        //console.log("VA vtype not found",node.name+":",fld);
                    } else {
                        annotation(node,{vtype:vtype});
                        //console.log("VA typeof",node.name+":",vtype);
                    }
                }
            }
        },
        varDecl: function (node) {
            //console.log("TCV","varDecl",node);
            if (node.value) checker.visit(node.value);
            if (node.name && node.typeDecl) {
                console.log("var typeis",node.name+"", node.typeDecl.vtype+"");
                var a=annotation(node);
                var si=a.scopeInfo;
                if (si) {
                    console.log("set var type",node.name+"", node.typeDecl.vtype+"");
                    si.vtype=node.typeDecl.vtype;
                } else if (a.declaringClass) {
                    //console.log("set fld type",a.declaringClass,a.declaringClass.decls.fields[node.name+""],node.name+"", node.typeDecl.vtype+"");
                    a.declaringClass.decls.fields[node.name+""].vtype=node.typeDecl.vtype;
                }
            }
        },
        paramDecl: function (node) {
            if (node.name && node.typeDecl) {
                console.log("param typeis",node.name+"", node.typeDecl.vtype+"");
                var a=annotation(node);
                var si=a.scopeInfo;
                if (si) {
                    //console.log("set param type",node.name+"", node.typeDecl.vtype+"");
                    si.vtype=node.typeDecl.vtype;
                }
            }
        },
        funcDeclHead: function (node) {
            if (node.name && node.rtype) {
                console.log("ret typeis",node.name+"", node.rtype.vtype+"");
            }
        }
    });
    var ctx=context();
    checker.def=visitSub;//S
    checker.visit(klass.node);
    function lit(s) {
        return "'"+s+"'";
    }
    function str(o) {
        if (!o || typeof o=="number" || typeof o=="boolean") return o;
        if (typeof o=="string") return lit(o);
        if (o.DESC) return str(o.DESC);
        var keys=[];
        for (var i in o) {
            if (ex[i]) continue;
            keys.push(i);
        }
        keys=keys.sort();
        var buf="{";
        var com="";
        keys.forEach(function (key) {
            buf+=com+key+":"+str(o[key]);
            com=",";
        });
        buf+="}";
        return buf;
    }
};
return TypeChecker;
});