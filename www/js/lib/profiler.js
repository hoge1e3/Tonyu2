Profiler={
	tbl:{},
	report:function () {
		var a=[];
		var tbl=Profiler.tbl;
		for (var i in tbl) {
			var res=tbl[i];
			res.average=(res.count>0 ? res.time/res.count : 0);
			a.push(res);
		}
		a.sort(function (a,b) {
			return b.time-a.time;
		});
		var buf="";
		a.forEach(function (e) {
			buf+=[e.name, e.count, e.time, e.average].join("\t")+"\n";
		});
		return buf;
	},
	profile: function (o, name) {
		if (typeof o==="object") {
			var hash=o;
			if (!name) name="";
			for (var k in hash) {
				if (hash.hasOwnProperty(k) && typeof hash[k] == "function") {
					hash[k]=Profiler.profile(hash[k],name+"."+k);
				}
			}
			return hash;
		} else if (typeof o=="function") {
			var f=o;
			if (!name) name=f.name;
			var tbl=Profiler.tbl[name];
			if (!tbl) tbl=Profiler.tbl[name]={name: name, count:0, time:0};
			return function () {
				if (tbl.profiling) { return f.apply(this,arguments);}
				tbl.profiling=true;
				tbl.count++;
				var st=new Date().getTime();
				var res=f.apply(this,arguments);
				tbl.time+=new Date().getTime()-st;
				tbl.profiling=false;
				return res;
			};
		}
		return o;
	}
};
Function.prototype.profile=function (name) {
	return Profiler.profile(this,name);
};

Function.prototype.profileClass=function (prefix) {
	if (!prefix) prefix=this.name;
	Profiler.profile(this.prototype, prefix);
};
console.log("Profiler enabled");
