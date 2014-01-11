define(["Util"],function (Util) {
     var res={};
     res=function () {
            var expr=[];
            for (var i=0 ; i<arguments.length ; i++) {
                expr[i]=arguments[i];
            }
            var ctx={subParts:{}};
            var listeners=[];
            var $edits=[];
            var res=parse(expr, ctx);
            /*for (var i in ctx.subParts) {
            	res[i]=ctx.subParts[i];
            }*/
            if ($edits.length>0) {
                res.$edits=$edits;
                $edits.load=function (model) {
                    $edits.model=model;
                    $edits.forEach(function (edit) {
                        var name= edit.params.$edit.name || edit.params.$edit;
                        var m=model;
                        var a=name.split(".");
                        console.log("Load ",edit.jq[0], edit.params, a);
                        for (var i=0 ; i<a.length ;i++) {
                            m=m[a[i]];
                        }
                        if (edit.params.type=="checkbox") {
                            edit.jq.prop("checked",!!m);
                        } else {
                            edit.jq.val(m);
                        }
                    });
                };
            }
            res.$vars=ctx.subParts;
            if (listeners.length>0) {
                setTimeout(l,10);
            }
            function l() {
                listeners.forEach(function (li) {
                    li();
                });
                setTimeout(l,10);
            }
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
                    if (o.$edit) {
                        if (!o.on) o.on={};
                        o.on.realtimechange=function (val) {
                            console.log("Set", o.$edit, val);
                            var m=$edits.model;
                            if (!m) return;
                            var name=o.$edit.name || o.$edit;
                            var a=name.split(".");
                            for (var i=0 ; i<a.length ;i++) {
                                if (i==a.length-1) m[a[i]]=val;
                                else m=m[a[i]];
                            }
                        };
                        $edits.push({jq:res,params:o});
                    }
                    for (var k in o) {
                        if (k=="on") {
                            for (var e in o.on) (function (li) {
                                if (e=="enterkey") {
                                    res.on("keypress",function (ev) {
                                        if (ev.which==13) li.apply(res,arguments);
                                    });
                                } else if (e=="realtimechange") {
                                    var first=true,prev;
                                    listeners.push(function () {
                                        var cur;
                                        if (o.type=="checkbox") {
                                            cur=!!res.prop("checked");
                                            //console.log("checkbox", cur);
                                        } else {
                                            cur=res.val();
                                        }
                                        if (first || prev!=cur) {
                                            li.apply(res,[cur,prev]);
                                            prev=cur;
                                        }
                                        first=false;
                                    });
                                } else {
                                    res.on(e, li);
                                }
                            })(o.on[e]);

                        } else if (k=="css") {
                            res.css(o[k]);
                        } else if (!Util.startsWith(k,"$")){
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
