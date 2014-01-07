define([],function () {
     var res={};
     res=function () {
            var expr=[];
            for (var i=0 ; i<arguments.length ; i++) {
                expr[i]=arguments[i];
            }
            var ctx={subParts:{}};
            var res=parse(expr, ctx);
            /*for (var i in ctx.subParts) {
            	res[i]=ctx.subParts[i];
            }*/
            res.$vars=ctx.subParts;
            return res;
            function parse(expr, ctx) {
                if (expr instanceof Array) return parseArray(expr, ctx);
                else if (typeof expr=="string") return parseString(expr, ctx);
                else return expr;
            }
            function parseArray(a, ctx) {
                var tag=a[0];
                var i=1;
                var res=$("<"+tag+">");
                if (typeof a[i]=="object" && !(a[i] instanceof Array) ) {
                    var o=a[i];
                    if (o.$var) {
                        ctx.subParts[o.$var]=res;
                    }
                    for (var k in o) {
                        if (k=="on") {
                            for (var e in o.on) {
                                res.on(e, o.on[e]);
                            }
                        } else if (k!="$var"){
                            res.attr(k,o[k]);
                        }
                    }
                    i++;
                }
                while (i<a.length) {
                    res.append(parse(a[i],ctx));
                    i++;
                }
                return res;
            }
            function parseString(str) {
                return $("<span>").text(str);
            }
    };
    return res;
});
