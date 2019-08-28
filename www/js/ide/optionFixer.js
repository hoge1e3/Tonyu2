define(["Tonyu"],function (Tonyu) {
    const NSP_USR="user",NSP_KER="kernel";
    return {
        fixFile: function (f) {
            const t=f.text();
            const o=JSON.parse(t);
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
            opt.compiler.namespace=opt.compiler.namespace||"user";
            opt.compiler.outputFile=opt.compiler.outputFile||"js/concat.js";
            opt.language="tonyu";
        },
        fixBootRunClasses: function (opt) {
            if (opt.run) {
                var mc=this.fixClassName(opt.run.mainClass);
                var bc=this.fixClassName(opt.run.bootClass);
                if (mc!=opt.run.mainClass  ||  bc!=opt.run.bootClass) {
                    opt.run.mainClass=mc;
                    opt.run.bootClass=bc;
                }
            }
        },
        fixClassName: function (cn) {
            //if (TPR.classExists(cn)) return cn;
            if (Tonyu.getClass(cn)) return cn;
            var cna=cn.split(".");
            var sn=cna.pop();
            var res;
            res=NSP_USR+"."+sn;
            if (Tonyu.getClass(res)) return res;
            //if (TPR.classExists(res)) return res;
            res=NSP_KER+"."+sn;
            if (Tonyu.getClass(res)) return res;
            //if (TPR.classExists(res)) return res;
            return cn;
        }
    };

});
