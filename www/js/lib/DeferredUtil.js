define([], function () {
    var DU;
    DU={
            ensureDefer: function (v) {
                var d=new $.Deferred;
                var isDeferred;
                $.when(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            d.resolve(r);
                        },0);
                    } else {
                        d.resolve(r);
                    }
                }).fail(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            d.reject(r);
                        },0);
                    } else {
                        d.reject(r);
                    }
                });
                isDeferred=true;
                return d.promise();
            },
            directPromise:function (v) {
                var d=new $.Deferred;
                setTimeout(function () {d.resolve(v);},0);
                return d.promise();
            },
            then: function (f) {
                return DU.directPromise().then(f);
            },
            timeout:function (timeout) {
                var d=new $.Deferred;
                setTimeout(function () {d.resolve();},timeout);
                return d.promise();
            },
            funcPromise:function (f) {
                var d=new $.Deferred;
                f(function (v) {
                    d.resolve(v);
                },function (e) {
                    d.reject(e);
                });
                return d.promise();
            },
            throwPromise:function (e) {
                var d=new $.Deferred;
                setTimeout(function () {
                    d.reject(e);
                }, 0);
                return d.promise();
            },
            throwF: function (f) {
                return function () {
                    try {
                        return f.apply(this,arguments);
                    } catch(e) {
                        console.log(e,e.stack);
                        return DU.throwPromise(e);
                    }
                };
            },
            each: function (set,f) {
                if (set instanceof Array) {
                    return DU.loop(function (i) {
                        if (i>=set.length) return DU.brk();
                        return $.when(f(set[i],i)).then(function () {
                            return i+1;
                        });
                    },0);
                } else {
                    var objs=[];
                    for (var i in set) {
                        objs.push({k:i,v:set[i]});
                    }
                    return DU.each(objs,function (e) {
                        return f(e.k, e.v);
                    });
                }
            },
            loop: function (f,r) {
                return DU.directPromise(r).then(DU.throwF(function () {
                    var r=f.apply(this,arguments);
                    if (r.DU_BRK) return r.res;
                    return $.when(r).then(function (r) {
                        return DU.loop(f,r);
                    });
                }));
            },
            brk: function (res) {
                return {DU_BRK:true,res:res};
            }
    };
    return DU;
});