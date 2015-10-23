define(["UI","difflib","diffview"], function (UI,difflib,diffview) {
    var res={};
	res.show=function (baseFile, newFile, options) {
    	var d=res.embed(baseFile, newFile, options);
    	d.dialog({width:600,height:500});
	};
	res.embed=function (baseFile, newFile, options) {
        if (!res.d) {
            var FType={
                    fromVal: function (val){
                        return val=="" ? null : FS.get(val);
                    },
                    toVal: function (v){ return v ? v.path() : "";}
            };
        	res.d=UI("div",{title:"比較"},
        			["div",
        			 ["input",{style:"background-color: #f88;",
        			     $edit:{name:"baseFile",type:FType},size:60}],["br"],
                     ["input",{style:"background-color: #8f8;",
                         $var:"newFile",
                         $edit:{name:"newFile",type:FType},size:60}]
        			],
                    ["div", {$var:"validationMessage", css:{color:"red"}}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.done();
                 }}}, "比較"],
      			["div",{$var: "diffoutput", css:{height:"350px", overflow:"scroll"}}]
            );
        }
        var d=res.d;
        var model={baseFile:baseFile , newFile:newFile};
        d.$edits.load(model);
        function isValidFile(f) {
            return f && !f.isDir() && f.exists() ;
        }
    	d.$edits.validator.on.validate=function (model) {
    	    if (!isValidFile(model.newFile)  ) {
    	        this.addError("new",newFile+"は存在しないか，ディレクトリです");
    	    } else if (!isValidFile(model.baseFile)  ) {
                this.addError("base",baseFile+"は存在しないか，ディレクトリです");
    	    } else {
    	        this.allOK();
    	    }
    	    /*
    	    if ( isValidFile(model.baseFile) && !isValidFile(model.newFile)  ) {
    	        model.newFile=(model.newFile ? model.newFile.rel(model.baseFile.name()) : model.baseFile) ;
    	        d.$vars.newFile.val(model.newFile+"");
    	    }*/
    	};
    	res.done=function () {
    	    var base = difflib.stringAsLines(model.baseFile.text());
    	    var newtxt = difflib.stringAsLines(model.newFile.text());

    	    var sm = new difflib.SequenceMatcher(base, newtxt);

    	    // get the opcodes from the SequenceMatcher instance
    	    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    	    // in order to yield the new text
    	    var opcodes = sm.get_opcodes();
    	    var diffoutputdiv = d.$vars.diffoutput[0];
    	    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    	    //var contextSize = $("contextSize").value;
    	    contextSize = null; //contextSize ? contextSize : null;

    	    // build the diff view and add it to the current DOM
    	    diffoutputdiv.appendChild(diffview.buildView({
    	        baseTextLines: base,
    	        newTextLines: newtxt,
    	        opcodes: opcodes,
    	        // set the display titles for each resource
    	        baseTextName: model.baseFile+"",
    	        newTextName: model.newFile+"",
    	        contextSize: contextSize,
    	        viewType: 1 //$("inline").checked ? 1 : 0
    	    }));

    		//onOK();
    	};
    	if (isValidFile(model.baseFile) && isValidFile(model.newFile)) {
    		res.done();
    	}
    	return d;
    };
    return res;
});