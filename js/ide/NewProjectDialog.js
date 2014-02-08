define(["UI"], function (UI) {
    var res={};
	res.open=function (prjDir, onOK) {
        var FType={
                fromVal: function (val){
                    return val=="" ? null : FS.get(val);
                },
                toVal: function (v){ return v ? v.path() : "";}
        };
        if (!res.d) {
        	res.d=UI("div",{title:"新規プロジェクト"},
        			["div",
        			 ["span","プロジェクト名"],
        			 ["input",{$edit:"name"}]],
         			["div",
        			 ["span","親フォルダ"],
        			 ["input",{$edit:{name:"parentDir",type:FType}}]],
        			 ["div",
        			   ["span","作成先フォルダ："],
        			   ["span",{$var:"dstDir"}]
        			  ],
                 ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.d.done();
                 }}}, "OK"]
            );
        }
        var d=res.d;
        var model={name:"", parentDir:prjDir};
        d.$edits.load(model);
    	d.$edits.validator.on.validate=function (model) {
    		if (model.name=="") {
    			this.addError("name","名前を入力してください");
    			return;
    		} else {
    			this.allOK();
    		}
    		model.dstDir=model.parentDir.rel(model.name+"/");
    		d.$vars.dstDir.text(model.dstDir+"");
    	};
    	d.$edits.on.writeToModel();
    	d.done=function () {
    		onOK(model.dstDir);
    	};
        d.dialog({width:600});
    };
    return res;
});