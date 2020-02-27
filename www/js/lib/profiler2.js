/*global define*/
define(function (require, exports,module) {
module.exports={
	idSeq: 1,
	MEASURED: Symbol("MEASURED"),
	measure(f,name) {
		if (f[this.MEASURED]) return f;
		const id=this.idSeq++;
		const r=function (...a) {
			const sid=id+":start", eid=id+":end";
			performance.mark(sid);
			const r=f.apply(this, a);
			performance.mark(eid);
			performance.measure(name, sid, eid);
			return r;
		};
		r[this.MEASURED]=true;
		return r;
	},
	profileTonyuClass(prot) {
		const s=prot;
		while(prot && prot.isTonyuObject) {
			const meta=prot.getClassInfo();
			const fn=meta.fullName||meta.extenderFullName;
			const methods=meta.decls?meta.decls.methods: window.Tonyu.classMetas[fn].decls.methods;
			for (let n in methods) {
				if (typeof prot[n]==="function") {
					//console.log(fn+"."+n);
					prot[n]=this.measure(prot[n],fn+"."+n);
				}
			}
			prot=Object.getPrototypeOf(prot);
		}
		return s;
	},
	profile(o, name) {
		if (arguments.length===0) {
			return this.profile(Tonyu.classes);
		}
		if (o && typeof o==="object") {
			const hash=o;
			if (!name) name="";
			for (const k in hash) {
				if (!hash.hasOwnProperty(k)) continue;
				hash[k]=this.profile(hash[k],name+"."+k);
			}
			return hash;
		} else if (typeof o=="function") {
			const f=o;
			if (f.prototype && f.prototype.isTonyuObject) {
				this.profileTonyuClass(f.prototype);
				return o;
			}
			if (!name) name=f.name;
			return this.measure(f,name);
		}
		return o;
	},
	report(sortKey) {// sum, avg, count
		const r=performance.getEntriesByType("measure");
		const ag={};
		for (let e of r) {
			ag[e.name]=ag[e.name]||{count:0, durationSum:0,name:e.name};
			ag[e.name].durationSum+=e.duration;
			ag[e.name].count++;
		}
		for (let n in ag) {
			ag[n].durationAvg=ag[n].durationSum/ag[n].count;
		}
		//console.log(r);
		const k={s:"durationSum", a:"durationAvg", c:"count"}[sortKey] ||"durationSum";
		let list=[];
		for (let n in ag) {
			list.push(ag[n]);
		}
		list=list.sort((a,b)=>b[k]-a[k]);
		return list;
	}
};
window.Profiler=module.exports;
});
