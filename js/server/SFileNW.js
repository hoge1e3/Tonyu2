define(["WebSite"],function (WebSite) {
var exports={};
if (!WebSite.isNW) return null;
//--------begin of SFile.js
var fs=require("fs");
var SEP="/";
function SFile(path) {
    this._path=toCanonicalPath(path);
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
var driveLetter=/^([a-zA-Z]):/;
function isAbsolute(path) {
    return startsWith(path,SEP) || path.match(driveLetter);
}
function toCanonicalPath(path) {
    if (startsWith(path,SEP)) {
        var c=process.cwd();
        var d=driveLetter.exec(c);
        if (d) {
            path=d[0]+path;
        }
    } else if (!isAbsolute(path)) path=process.cwd().replace(/\\/g,SEP)+SEP+path.replace(/\\/g,SEP);
    var paths=path.split(SEP);
    var built=[];
    paths.forEach(function (p) {
        if (p=="") return;
        if (p==".") return;
        if (p=="..") {
            built.pop();
            return;
        }
        built.push(p);
    });
    return built.join(SEP);
}
extend(SFile.prototype,{
	text:function () {
		if (arguments.length==0) {
			return fs.readFileSync(this._path, {encoding:"utf8"});
		} else {
			var p=this.up();
			if (p) p.mkdir();
			fs.writeFileSync(this._path, arguments[0]);
		}
	},
	obj:function () {
		if (arguments.length==0) {
			return JSON.parse(this.text());
		} else {
			this.text(JSON.stringify(arguments[0]));
		}
	},
	isReadOnly: function () {
	    return false; // TODO
	},
    rm: function () {
	return fs.unlinkSync(this._path);
    },
	path: function () { return this._path; },
	name: function () {
		var p=this._path;
		/*if (endsWith(p,SEP)) {
			p=p.substring(0,p.length-1);
		}*/
		return p.split(SEP).pop();
	},
	truncExt: function (ext) {
        var name=this.name();
        return name.substring(0,name.length-ext.length);
	},
	endsWith: function (postfix) {
	    return endsWith(this.name(), postfix);
	},
    exists: function () {
        return fs.existsSync(this._path);
    },
	each:function (it) {
		if (!this.isDir()) throw this+" cannot each. not a dir.";
		var r=fs.readdirSync(this._path);
		var t=this;
		r.forEach(function (e) {
		    if (e==".dirinfo") return;
			var f=t.rel(e);
			it(f);
		});
	},
	ls: function () {
	    var res=[];
	    this.each(function (f) {
            res.push(f.name());
        });
        return res;
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
		//if (!this.isDir()) throw new Error(this+" cannot rel. not a dir.");
		return new SFile(this._path+SEP+n);
	},
	mkdir: function () {
		if (this.exists()){
			if (this.isDir()) {
				return;
			} else {
				throw this+" is a file. not a dir.";
			}
		}
		var p=this.up();
		if (p) p.mkdir();
		fs.mkdirSync(this.path());
	},
	relPath: function (base) {
		//console.log("relpath "+this+" - "+base);
		if ( this.equals(base)) {
			return ".";
		}
		if (this.parent() == null)
			throw this + " is not in " + base;
		var pp=this.parent().relPath(base);
		if (pp==".") return this.name();
		return pp + SEP + this.name();
	},
	equals: function (f) {
		return (f instanceof SFile) && f.path()==this.path();
	},
	lastModified: function () {
		return this.stat().mtime.getTime();
	},
	lastUpdate: function () {
		return this.lastModified();
	},
	up: function () {
	    var p=this._path;
		/*while (p.length>0) {
			p=p.substring(0,p.length-1);
			if (endsWith(p,SEP)) break;
		}*/
	    var pp=p.split(SEP);
	    pp.pop();
	    p=pp.join(SEP);
        if (p=="") return null;
		return new SFile(p);
		//return this.rel(".."); //new SFile(p+SEP+"..");
	},
	isDir: function () {
		if (!this.exists()) return false;
		return this.stat().isDirectory();
	},
	stat: function () {
		return 	fs.statSync(this._path);
	},
});
exports.get=function (path) {
	return new SFile(path);
};
//-------end of SFile.js
return exports;
});