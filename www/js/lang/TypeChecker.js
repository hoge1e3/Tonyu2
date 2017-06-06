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
        varDecl: function (node) {
            //console.log("TCV","varDecl",node);
            if (node.name && node.typeDecl) {
                console.log("var typeis",node.name+"", node.typeDecl.vtype+"");
            }
        },
        paramDecl: function (node) {
            if (node.name && node.typeDecl) {
                console.log("param typeis",node.name+"", node.typeDecl.vtype+"");
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
    ctx.enter({scope:{}}, function () {
        checker.visit(klass.node);
        
    });
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