define(function (require,exports,module) {
const DebuggerCore=require("DebuggerCore");
const BuilderClient4Sys=require("BuilderClient4Sys");
const Tonyu=require("Tonyu");
const root=require("root");
const FS=require("FS");
Object.assign(BuilderClient4Sys,{
    Tonyu, root, FS
});
module.exports=DebuggerCore(BuilderClient4Sys);
});
