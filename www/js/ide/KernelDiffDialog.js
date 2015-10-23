define(["UI","DiffDialog","Shell"], function (UI,dd,sh) {
    var res={};
	res.show=function (devDir, kernelDir , options) {
    	var d=res.embed(devDir, kernelDir, options);
    	d.dialog({width:250,height:400});
	};
	res.embed=function (devDir, kernelDir, options) {
        if (!res.d) {
        	res.d=UI("div",{title:"Kernel比較"},
        			["div", {$var:"out"}],
                 ["button", {$var:"OKButton", on:{click: function () {
                	 res.refresh();
                 }}}, "更新"]
            );
        }
        var d=res.d;
    	res.refresh=function () {
    		var out=d.$vars.out;
    		out.empty();
    		kernelDir.each(function (kerf) {
    			var devf=devDir.rel(kerf.relPath(kernelDir));
    			if (kerf.endsWith(".tonyu") && devf.exists()) {
    				if (kerf.text()==devf.text()) {
    					out.append(UI("div",kerf.name(),"(同一)"));
    				} else {
    					out.append(UI("div",
    							["a",{href:"javascript:;",on:{click:openDiagF(devf, kerf)}}, kerf.name()]
    					));
    				}
    			}
    		});
    	};
    	res.refresh();
    	return d;
    };
    function openDiagF(a,b) {
    	return function () {
    		dd.show(a,b);
    	};
    }
    return res;
});