var requirejs;
requirejs=function (reqs,func) {
    var m=requirejs.getModuleInfo(requirejs.curName);
    m.func=function () {
        //console.log("reqjs ",m.name);
        func.apply(this, requirejs.getObjs(reqs));
    };
};
define=function (reqs,func) {
    var m=requirejs.getModuleInfo(requirejs.curName);
    m.func=function () {
        //console.log("define ",m.name);
        m.obj=func.apply(this, requirejs.getObjs(reqs));
        return m.obj;
    };
};
requirejs.getModuleInfo=function (name) {
    var ms=requirejs.modules;
    if (!ms[name]) ms[name]={name:name};
    return ms[name];
};
requirejs.doLoad=function (name) {
    var m=requirejs.getModuleInfo(name);
    //console.log("doLoad ",name, m.loaded, m.func);
    if (m.loaded) return m.obj;
    m.loaded=true;
    if (m.func) return m.func();
};
requirejs.getObjs=function (ary) {
    var res=[];
    ary.forEach(function (n) {
        var cur=requirejs.doLoad(n);
        if (!cur) {
            var names=n.split(/\./);
            cur=(function () {return this;})();
            names.forEach(function (name) {
                if (cur) cur=cur[name];
            });
        }
        if (!cur) console.log("Warning no obj for "+n);
        res.push(cur);
    });
    return res;
};
requirejs.modules={};
requirejs.setName=function (n) {
    requirejs.curName=n;
};
requirejs.start=function () {
    var m=requirejs.modules;
    for (var k in m) {
        requirejs.doLoad(k);
    }
};
