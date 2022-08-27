define(["Tonyu","WebSite"],function (Tonyu,WebSite) {
    const NSP_USR="user",NSP_KER="kernel";
    const defaultOptions={
        compiler: {
            namespace:NSP_USR,
            defaultSuperClass: `${NSP_KER}.Actor`,
            // relative path in outputFile will fail old version
            //outputFile: "js/concat.js",
            dependingProjects: [{namespace:NSP_KER}],
        },
        run: {
            mainClass: `${NSP_USR}.Main`,
            bootClass: `${NSP_KER}.Boot`,
            globals:{
                $defaultFPS:60,
                $imageSmoothingDisabled:true,
                $soundLoadAndDecode:false
            }
        },
        plugins: {},
        kernelEditable: false,
        language:"tonyu",
        version: WebSite.sysVersion
    };
    Tonyu.defaultOptions=defaultOptions;
    return {
        fixFile: function (f) {
            if (!f.exists()) {
                f.obj(defaultOptions);
                return;
            }
            const t=f.text();
            const o=JSON.parse(t);
            if (o.dontFix) return;
            const fo=this.fixObject(o);
            const ft=JSON.stringify(fo);
            if(t!==ft) f.text(ft);
        },
        fixObject:function (o) {
            this.fixOptions(o);
            this.fixBootRunClasses(o);
            return o;
        },
        fixOptions: function (opt) {//override
            if (!opt.compiler) opt.compiler={};
            //opt.compiler.commentLastPos=TPR.runScriptMode || StackTrace.isAvailable();
            if (!opt.plugins) {
                opt.plugins={};
                /*dir.each(function (f) {
                    if (f.endsWith(TPR.EXT)) {
                        plugins.detectNeeded(  f.text(), opt.plugins);
                    }
                });*/
            }
            opt.compiler.dependingProjects=opt.compiler.dependingProjects||[{namespace:"kernel"}];
            opt.compiler.namespace=opt.compiler.namespace||NSP_USR;
            // relative path in outputFile will fail old version
            //opt.compiler.outputFile=opt.compiler.outputFile||"js/concat.js";
            opt.run=opt.run||{};
            opt.language="tonyu";
        },
        fixBootRunClasses: function (opt) {
            /*if (opt.run) {
                const ns=opt.compiler.namespace||NSP_USR;
                var mc=this.fixClassName(ns, opt.run.mainClass);
                var bc=this.fixClassName(ns, opt.run.bootClass);
                if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                    opt.run.mainClass=mc;
                    opt.run.bootClass=bc;
                }
            }*/
        },
        fixClassName: function (ns, cn) {
            //if (TPR.classExists(cn)) return cn;
            if (Tonyu.getClass(cn)) return cn;
            var cna=cn.split(".");
            var sn=cna.pop();
            var res;
            res=ns+"."+sn;
            if (Tonyu.getClass(res)) return res;
            //if (TPR.classExists(res)) return res;
            res=NSP_KER+"."+sn;
            if (Tonyu.getClass(res)) return res;
            //if (TPR.classExists(res)) return res;
            return cn;
        }
    };

});
