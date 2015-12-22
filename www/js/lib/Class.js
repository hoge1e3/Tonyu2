define(["assert"],function (A) {
    function Class() {
        var superClass,defs;
        if (arguments.length==2) {
            superClass=A.is(arguments[0],Function);
            defs=A.is(arguments[1],Object);
        } else if (arguments.length==1) {
            superClass=Object;
            defs=A.is(arguments[0],Object);
        }
        var c=defs.initialize || function (){};
        var p=c.prototype;
        for (var m in defs) {
            p[m]=defs[m];
        }
        p.callSuper=function () {
            var a=[];
            for (var i=0; arguments.length;i++) {
                a.push(arguments[i]);
            }
            var n=A.is(a.shift(),String);
            var f=A.is(superClass.prototype[n], Function);
            return f.apply(this,a);
        };
        return c;
    }
    return Class;
});