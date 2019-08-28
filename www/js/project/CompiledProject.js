define(function (require,exports,module) {
    const F=require("ProjectFactory");
    const Compiler=require("CompilerClient");
    const root=require("root");
    const WebSite=require("WebSite");
    const sysMod=require("sysMod");
    const SourceFiles=require("SourceFiles");
    const A=require("assert");
    const langMod=require("langMod");
    F.addType("compiled",params=> {
        const ns=A.is(params.namespace,String,"ns");
        const url=A.is(params.url,String,"url");
        //A.is([ns,url],[String,String]);
        const res=F.createCore();
        Object.assign(res,langMod);
        return Object.assign(res,{
			getNamespace:function () {return ns;},
			sourceDir: function () {return null;},
			getDependingProjects: function () {return [];},// virtual
			loadClasses: async function (ctx) {
				console.log("Loading compiled classes ns=",ns,"url=",url);
				var src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
				//var u=window.navigator.userAgent.toLowerCase();
                const s=SourceFiles.add({url:src});
                await s.exec();
			},
        });
    });
    exports.create=params=>F.create("compiled",params);
});
