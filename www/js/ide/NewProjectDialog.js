define(["UI","R","ZipImporter"], function (UI,R,ZipImporter) {
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
			res.zipImporter=ZipImporter(()=>model.parentDir,null,{
				onFileSelect() {
					const va=res.d.$edits.validator;
					va.allOK();
				},
				onComplete(ctx){
					console.log("comp",ctx);
					const d=res.d;
					const va=d.$edits.validator;
					va.allOK();
					if (ctx.imported==0) {
						va.addError("file",R("DoesNotContainTonyuProjects"));
					} else {
						if (res.onOK) res.onOK({from:"fileInput"});
		                if (d.dialog) d.dialog("close");// not exists when embed
					}
				},
			});
        	res.d=UI("div",{title:(options.ren?R("renameProject"):R("newProject"))},
			["div",
				["label",["input",{$var:"type_new",name:"type",value:"new",type:"radio"}],
				R("CreateNewProject")], 
				["label",
				["input",{$var:"type_import",name:"type",value:"import",type:"radio"}],
				R("ImportFromZip")]],
        			["div",{$var:"prjName"},
        			 ["span",R("newProjectName")],
        			 ["input",{$edit:"name",value:options.defName||"",
        			     on:{enterkey:function () {
                		     res.d.done();
				 }}}]],
					 ["div", {$var:"zip",style:"display:none;"},res.zipImporter.fileButton()],
         			["div",
        			 ["span",R("parentFolder")],
        			 ["input",{$edit:{name:"parentDir",type:FType},size:50}]],
        			 ["div",
        			   ["span",R("willCreateAt")],
        			   ["span",{$var:"dstDir"}]
        			  ],
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
			const v=res.d.$vars;
			const va=res.d.$edits.validator;	
			v.type_new.on("input", ()=>{
				//console.log("NEW");
				v.prjName.show();
				v.zip.hide();
				va.allOK();
				va.on.validate.call(va, model);
			});
			v.type_import.on("input", ()=>{
				v.prjName.hide();
				v.zip.show();
				//console.log("ZIP");
				va.allOK();
				va.addError("file",R("SelectZipFile"));
			});
        }
        const d=res.d;
        var model={name:options.defName||"", parentDir:prjDir};
        d.$edits.load(model);
		d.$vars.type_new.prop({checked:true});
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
