$(function () {
    try {
        var f=Function;
        var t=new f("return async function (){ const {a,b,c}={a:3}; await Promise.resolve(3);}");
        t();
    } catch(e) {
        $("#splash .unsupported").show();
    }
});
