define(["Wiki"],function (W) {
	var WD={};
	WD.create=function (home, options) {
		options=options || {title:"help",topPage:"index"};
		var d=$("<div>").attr({title:options.title});
		var w=W(d,home, options);
		if (options.topPage) w.show(options.topPage);
		if (!options.height) {
			options.height=$(window).height()*0.7;
		}
		if (!options.width) options.width=500;
		return {
			show: function (name) {
				if (name) w.show(name);
				d.dialog({width:options.width, height:options.height});
			}
		};
	};
	return WD;
});