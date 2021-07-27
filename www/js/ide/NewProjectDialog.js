define(["UI","R"], function (UI,R) {
    var res={};
	res.show=function (prjDir, onOK,options) {
    	var d=res.embed(prjDir,onOK,options);
    	d.dialog({width:600});
	};
	res.embed=function (prjDir, onOK, options) {
        res.onOK=onOK;
	    if (!options) options={};
        if (!res.d) {
            var FType={
                    fromVal: function (val){
                        return val=="" ? null : FS.get(val);
                    },
                    toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:(options.ren?R("renameProject"):R("newProject"))},
        			["div",
        			 ["span",R("newProjectName")],
        			 ["input",{$edit:"name",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
         			["div",
        			 ["span",R("parentFolder")],
        			 ["input",{$edit:{name:"parentDir",type:FType}}]],
        			 ["div",
        			   ["span",R("willCreateAt")],
        			   ["span",{$var:"dstDir"}]
        			  ],
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
        }
        var d=res.d;
        var model={name:options.defName||"", parentDir:prjDir};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name",R("inputProjectName"));
    			return;
    		}
    		model.dstDir=model.parentDir.rel(model.name+"/");
            if (model.dstDir.exists()) {
                this.addError("name",R("folderExists"));
                return;
            }
    		this.allOK();
    		d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.done=async function () {
    	    if (d.$edits.validator.isValid()) {
                await res.onOK(model.dstDir);
                if ($.data(d[0],"ui-dialog")) d.dialog("close");// not exists when embed
    	    }
    	};
    	return d;
    };
    return res;
});
