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
	profileAll: function (hash, prefix) {
		if (!prefix) prefix="";
		for (var k in hash) {
			if (typeof hash[k] == "function") {
				hash[k].profile(k);
			}
		}
	}
};
Function.prototype.profile=function (name) {
	var f=this;
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
};

Function.prototype.profileClass=function (prefix) {
	if (!prefix) prefix=this.name;
	Profiler.profileAll(this.prototype, prefix);
};