define(["SFile","PathUtil","assert"],function (SFile,P,A) {
    var create=function (sFile,policy) {
        function wrap(o) {
            return create(o,policy);
        }
        /*if (sFile instanceof Array) {
            return sFile.map(wrap2)
        }
        if (!(sFile instanceof SFile)) return sFile;*/
        A.is(sFile,SFile);
        A(!sFile.wrapper);
        sFile.wrapper={wrap:wrap};
        var path=sFile.path();
        if (!policy) policy={topDir:sFile.path()};
        if (policy.topDir && !P.startsWith(path, policy.topDir)) {
            throw new Error(path+": cannot access.");
        }
        //alert("OK! topdir="+policy.topDir+" path="+path);
        var res={};
        for (var n in sFile) {
            (function (n) {
                var m=sFile[n];
                if (P.startsWith(n,"_")) return;
                if (typeof m!="function") return;
                res[n]=function () {
                    var r=m.apply(sFile,arguments);
                    return r;
                };
            })(n);
        }
        res.inspect=function () {
            return JSON.stringify(policy)+"   "+sFile.wrapper;
        };
        return res;
    };
    return {create:create};
});