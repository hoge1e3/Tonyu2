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
				console.log("Load compiled classes ns=",ns,"url=",url);
				var d=new $.Deferred;
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var script = document.createElement("script");
				script.src = url+(WebSite.serverType==="BA"?"?"+Math.random():"");
				var done = false;
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
						console.log("Done Load compiled classes ns=",ns,"url=",url,Tonyu.classes);
						//same as projectCompiler (XXXX)
						/*var cls=Tonyu.classes;
						ns.split(".").forEach(function (c) {
							if (cls) cls=cls[c];
							// comment out : when empty concat.js
							//if (!cls) throw new Error("namespace Not found :"+ns);
						});
						if (cls) {
							for (var cln in cls) {
								var cl=cls[cln];
								var m=Tonyu.klass.getMeta(cl);
								ctx.classes[m.fullName]=m;
							}
						}*/
						//------------------XXXX
						d.resolve();
					}
				};
				this.loadDependingClasses(ctx).then(function () {
					head.insertBefore( script, head.firstChild );
				});
				return d.promise();
			}
		}
	};
	return CPR;
});
