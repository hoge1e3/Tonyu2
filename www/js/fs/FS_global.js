define(function (require, exports ,module){
    const FS=require("FS_amd");
    const root=require("root");
    root.FS=root.FS||FS.default||FS;
    root.PathUtil=root.PathUtil||root.FS.PathUtil;
    root.DeferredUtil=root.DeferredUtil||root.FS.DeferredUtil;
    module.exports=root.FS;
});