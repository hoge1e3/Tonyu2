define(["FS2"], function (FS) {
    var WebFS=function (){};
    var p=WebFS.prototype=new FS;
    p.fstype=function () {return "Web";};
    FS.delegateMethods(p, {
        getContent: function (){

        },
        getURL: function (path) {
            return path;
        }
    });
});