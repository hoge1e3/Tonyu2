define(["Shell","FS"], function (sh,FS) {
    sh.copyToKernel=function (name) {
        var ker=FS.get("/Tonyu/Kernel/");
        return sh.cp( name, ker.rel(name));
    };
});