define(["UI","FS"],function (UI,FS) {
	 var res={};
		res.show=function (prjDir, onOK) {
	    	var d=res.embed(prjDir,onOK);
	    	d.dialog({width:600});
		};
		res.embed=function (prjDir, onOK) {
	        if (!res.d) {
	            var FType={
	                    fromVal: function (val){
	                        return val=="" ? null : FS.get(val);
	                    },
	                    toVal: function (v){ return v ? v.path() : "";}
	            };
	        	res.d=UI("div",{title:"検索"},
	        			["div",
	        			 ["span","単語"],
	        			 ["input",{$edit:"word"}]],
	         			["div",
	        			 ["span","対象フォルダ"],
	        			 ["input",{$edit:{name:"dir",type:FType}}]],
	                 ["div", {$var:"validationMessage", css:{color:"red"}}],
	                 ["button", {$var:"OKButton", on:{click: function () {
	                	 res.d.done();
	                 }}}, "検索"],
	                 ["div",{$var:"res"}]
	            );
	        }
	        var d=res.d;
	        var model={name:"", dir:prjDir};
	        d.$edits.load(model);
	    	d.$edits.validator.on.validate=function (model) {
	    		if (model.word=="") {
	    			this.addError("word","単語を入力してください");
	    			return;
	    		} else {
	    			this.allOK();
	    		}
	    	};
	    	d.done=function () {
	    		model.word;

	    	};
	    	return d;
	    };
	    return res;
});