define(function (require,exports,module) {
const BuilderClient4Sys=require("BuilderClient4Sys");
const DebuggerCore=BuilderClient4Sys.DebuggerCore;//require("DebuggerCore");
const Tonyu=require("Tonyu");
/*const root=require("root");
const FS=require("FS");
Object.assign(BuilderClient4Sys,{
    Tonyu, root, FS
});*/
module.exports=DebuggerCore({Tonyu});
});
