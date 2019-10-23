define(function(require,exports,module) {//----
const Tonyu=require("Tonyu");
const WebSite=require("WebSite");
const miniJSLoader=require("miniJSLoader");
miniJSLoader.load(WebSite.compiledKernel);// It takes several times...
exports.isKernel=name=>{
    if (!Tonyu.classes.kernel) {
        return false;
    }
    return Tonyu.classes.kernel[name];
};
});//----of define
