var fs=require("fs");
function SFile(path) {
	this._path=path;
}
function extend(dst,src) {
	for (var i in src) dst[i]=src[i];
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
var SEP="/";
extend(SFile.prototype,{
	text:function () {
		if (arguments.length==0) {
			return fs.readFileSync(this._path);
		} else {
			fs.writeFileSync(this._path, arguments[0]);
		}
	},
	each:function (it) {
		if (!this.isDir()) throw this+" cannot each. not a dir.";
		var r=fs.readdirSync(this._path);
		var t=this;
		r.forEach(function (e) {
			var f=t.rel(e);
			it(f);
		});
	},
	toString: function () {
		return this._path;
	},
	rel: function (n) {
		if (!this.isDir()) throw this+" cannot rel. not a dir.";
		return new SFile(this._path+(endsWith(this._path,SEP)?"":SEP)+n);
	},
	up: function () {
		var p=this._path;
		while (p.length>0) {
			p=p.substring(0,p.length-1);
			if (endsWith(p,SEP)) break;
		}
		return new SFile(p);
	},
	isDir: function () {
		return this.stat().isDirectory();
	},
	stat: function () {
		return 	fs.statSync(this._path);
	},
});
exports.get=function (path) {
	return new SFile(path);
};
