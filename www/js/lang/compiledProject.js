define(["DeferredUtil","WebSite","assert"], function (DU,WebSite,A) {
	var CPR=function (ns, url) {
		A.is(arguments,[String,String]);
		return {
			getNamespace:function () {return ns;},
			sourceDir: function () {return null;},
			getDependingProjects: function () {return [];},// virtual
			loadDependingClasses: function (ctx) {
				//Same as projectCompiler /TPR/this/ (XXXX)
				var task=DU.directPromise();
				var myNsp=this.getNamespace();
				this.getDependingProjects().forEach(function (p) {
					if (p.getNamespace()==myNsp) return;
					task=task.then(function () {
						return p.loadClasses(ctx);
					});
				});
				return task;
			},
			loadClasses: function (ctx) {
				console.log("Loading compiled classes ns=",ns,"url=",url);
				var src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
				var u=window.navigator.userAgent.toLowerCase();
				/*if (WebSite.isNW && u.indexOf("mac")!=-1) {
					//Resolved in WebSite
					src = "/www/Kernel/js/concat.js";
				}*/
				var t=this;
				return this.loadDependingClasses(ctx).then(function () {
					return t.requirejs(src);
				}).then(function () {
					console.log("Done Loading compiled classes ns=",ns,"url=",src,Tonyu.classes);
				});
			},
			requirejs: function (src) {
				return DU.promise(function (s) {
					var head = document.getElementsByTagName("head")[0] || document.documentElement;
					var script = document.createElement("script");
					if (typeof tonyu_app_version==="string") src+="?"+tonyu_app_version;
					script.src = src;
					var done = false;
					script.onload = script.onreadystatechange = function() {
						if ( !done && (!this.readyState ||
								this.readyState === "loaded" || this.readyState === "complete") ) {
							done = true;
							console.log("Done load ",src);
							script.onload = script.onreadystatechange = null;
							if ( head && script.parentNode ) {
								head.removeChild( script );
							}
							s();
						}
					};
					head.insertBefore( script, head.firstChild );
				});
			},
		};
	};
	return CPR;
});
