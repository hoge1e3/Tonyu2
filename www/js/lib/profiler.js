Profiler={
	tbl:{},
	rootTree:{},
	curTree:null,
	enter: function (name) {
		var p=Profiler;
		if (!p.curTree) p.curTree=p.rootTree;
		var st={start:new Date().getTime(), prev:p.curTree};
		var nTree=p.curTree[name];
		if (!nTree) {
			nTree={name: name, count:0, time:0};
			p.curTree[name]=nTree;
		}
		p.curTree=nTree;
		return st;
	},
	exit: function(st) {
		var p=Profiler;
		var time=new Date().getTime()-st.start;
		p.curTree.count++;
		p.curTree.time+=time;
		p.curTree=st.prev;
	},
	report: function (options) {
		options=options||{};
		var rate=options.r||1;
		var depth=options.d||100;
		var pathPre=options.p||"";
		var best=options.b||100;
		var min=options.m||0;
		var p=Profiler;
		var r=p.rootTree;
		r.time=r.count=0;
		sort(r).forEach(function (st) {
			r.time+=st.time;
			r.count+=st.count;
		});
		if (pathPre) {
			pathPre.split("/").forEach(function (p) {
				if (!p) return;
				r=r[p];
				if (!r) throw new Error("Path "+pathPre+" not found");
			});
		}
		return doit(r,depth);
		function doit(t,depth) {
			var subs=sort(t);
			var res=[t.name+" c="+t.count+" t="+t.time+" a="+t.time/t.count];
			if (depth<=0) return;
			var all=t.time,sum=0;
			subs.forEach(function (st) {
				if (sum<all*rate && st.time>=min) {
					res.push(doit(st,depth-1));
				}
				sum+=st.time;
			});
			return res;
		}
		function sort(t) {
			var subs=[];
			for (var k in t) {
				if (typeof t[k].time==="number" && t[k].count) {
					subs.push(t[k]);
				}
			}
			subs.sort(function (a,b) {
				return b.time-a.time;
			});
			return subs;
		}
	},
	reportOLD:function () {
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
				/*if (tbl.profiling) { return f.apply(this,arguments);}
				tbl.profiling=true;
				tbl.count++;
				var st=new Date().getTime();*/
				var st=Profiler.enter(name);
				var res=f.apply(this,arguments);
				Profiler.exit(st);
				/*tbl.time+=new Date().getTime()-st;
				tbl.profiling=false;*/
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
