var fs=require("fs");
var SEP="/";
function SFile(path) {
	this._path=fs.realpathSync(path).replace(/\\/g,SEP);
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
extend(SFile.prototype,{
	text:function () {
		if (arguments.length==0) {
			return fs.readFileSync(this._path, {encoding:"utf8"});
		} else {
			fs.writeFileSync(this._path, arguments[0]);
		}
	},
	path: function () { return this._path; },
	name: function () {
		var p=this._path;
		if (endsWith(p,SEP)) {
			p=p.substring(0,p.length-1);
		}
		return p.split(SEP).pop();
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
	parent: function () {
		return this.up();
	},
	recursive:function (fun) {
        this.each(function (f) {
            if (f.isDir()) f.recursive(fun);
            else fun(f);
        });
    },
	toString: function () {
		return this._path;
	},
	rel: function (n) {
		if (!this.isDir()) throw this+" cannot rel. not a dir.";
		return new SFile(this._path+(endsWith(this._path,SEP)?"":SEP)+n);
	},
	relPath: function (base) {
		//console.log("relpath "+this+" - "+base);
		if ( this.equals(base)) {
			return ".";
		}
		if (this.parent() == null)
			throw this + " is not in " + base;
		return this.parent().relPath(base) + SEP + this.name();
	},
	equals: function (f) {
		return (f instanceof SFile) && f.path()==this.path();
	},
	lastModified: function () {
		return this.stat().mtime.getTime();
	},
	up: function () {
		var p=this._path;
		while (p.length>0) {
			p=p.substring(0,p.length-1);
			if (endsWith(p,SEP)) break;
		}
		if (p=="") return null;
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
