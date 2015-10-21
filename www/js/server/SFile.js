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
function truncSep(path) {
    if (endsWith(path,SEP)) return path.substring(0,path.length-1);
    return path;
}
var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
        ".mp3":"audio/mps", ".ogg":"audio/ogg"};
function toCanonicalPath(path) {
    path=path.replace(/\\/g,SEP);
    if (startsWith(path,SEP)) {
        var c=process.cwd();
        var d=driveLetter.exec(c);
        if (d) {
            path=d[0]+path;
        }
    } else if (!isAbsolute(path)) path=truncSep(process.cwd().replace(/\\/g,SEP))+SEP+path;
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
    var res=built.join(SEP);
    if (!isAbsolute(res)) throw new Error(path+": is not absolute.");
    res=truncSep(res);
    if (endsWith(path,SEP)) res+=SEP;
    return res;
}
extend(SFile.prototype,{
    isSFile: function (){return true;},
    text:function () {
        if (arguments.length==0) {
            if (this.isDir()) {
                return JSON.stringify(this.metaInfo());
            }
            if (this.isBinary()) {
                return this.readDataURLFromBin();
            } else {
                return fs.readFileSync(this.path(), {encoding:"utf8"});
            }
        } else {
            var p=this.up();
            if (p) p.mkdir();
            if (this.isBinary()) {
                this.writeBinFromDataURL(arguments[0]);
            } else {
                fs.writeFileSync(this.path(), arguments[0]);
            }
        }
    },
    lines: function () {
        return this.text().split("\n");
    },
    readDataURLFromBin: function () {
        var head=this.dataHeader();
        b=fs.readFileSync(this.path());
        if (b[0]==head.charCodeAt(0)// d
         && b[1]==head.charCodeAt(1)// a
         && b[2]==head.charCodeAt(2)// t
         && b[3]==head.charCodeAt(3)// a
         && b[4]==head.charCodeAt(4)// :
         ) {
            // file content is dataurl.
            return b.toString("utf8");
        }
        var base64=b.toString("base64");
        return head+base64;
    },
    writeBinFromDataURL: function (dataURL) {
        var head=this.dataHeader();
        var base64=dataURL.substring(head.length);
        var buf=new Buffer(base64,"base64");
        var wstream = fs.createWriteStream(this.path());
        wstream.write(buf);
        wstream.end();
    },
    isBinary: function () {
        return binMap[this.ext()];
    },
    dataHeader: function () {
        // data:image/png;base64,AAAAA
        // "data:"+ctype+";base64,"
        var ctype=this.isBinary();
        return "data:"+ctype+";base64,";
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
        if (this.isDir()) {
            return fs.rmdirSync(this.path());
        } else {
            return fs.unlinkSync(this.path());
        }
    },
    path: function () { return this._path; },
    pathTS: function () { return truncSep(this.path()); },
    name: function () {
        var p=this.pathTS();
        var t="";
        if (endsWith(this.path(),SEP)) {
            t=SEP;
        }
        return p.split(SEP).pop()+t;
    },
    ext: function () {
        var n=this.name();
        var r=(/\.[a-zA-Z0-9]+$/).exec(n);
        if (r) return r[0];
        return null;
    },
    truncExt: function (ext) {
        var name=this.name();
        return name.substring(0,name.length-ext.length);
    },
    endsWith: function (postfix) {
        return endsWith(this.name(), postfix);
    },
    exists: function () {
        return fs.existsSync(this.path());
    },
    each:function (it) {
        if (!this.isDir()) throw new Error(this+" cannot each. not a dir.");
        var ts=this.pathTS();
        var r=fs.readdirSync(this.path());
        var t=this;
        r.forEach(function (e) {
            if (e==".dirinfo") return;
            var s=fs.statSync(ts+SEP+e);
            var ss=s.isDirectory()?SEP:"";
            var f=t.rel(e+ss);
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
        return this.path();
    },
    rel: function (n) {
        //if (!this.isDir()) throw new Error(this+" cannot rel. not a dir.");
        return new SFile(this.pathTS()+SEP+n);
    },
    mkdir: function () {
        if (this.exists()){
            if (this.isDir()) {
                return;
            } else {
                throw new Error(this+" is a file. not a dir.");
            }
        }
        var p=this.up();
        if (p) p.mkdir();
        fs.mkdirSync(this.path());
    },
    relPath: function (base) {
        var bp=(base.path ? base.path() : base);
        if (bp.substring(bp.length-1)!=SEP) {
            throw  new Error(bp+" is not a directory.");
        }
        if (this.path().substring(0,bp.length)!=bp) {
            return "../"+this.relPath(base.up());
            //throw path+" is not in "+bp;
        }
        return this.path().substring(bp.length);

        /*if (!origin) origin=this;
        //console.log("relpath "+this+" - "+base);
        if ( this.equals(base)) {
            return ".";
        }
        if (this.parent() == null)
            throw new Error(origin + " is not in " + base);
        var pp=this.parent().relPath(base, origin);
        if (pp==".") return this.name();
        return pp + SEP + this.name();*/
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
        var p=this.pathTS();
        var pp=p.split(SEP);
        pp.pop();
        p=pp.join(SEP);
        if (p=="") return null;
        return new SFile(p+SEP);
    },
    isDir: function () {
        if (!this.exists()) return false;
        return this.stat().isDirectory();
    },
    stat: function () {
        return  fs.statSync(this.path());
    },
    metaInfo: function () {
        if (this.isDir()) {
            var res={};
            this.each(function (f) {
                res[f.name()]=f.metaInfo();
            });
            return res;
        } else {
            return {lastUpdate:this.lastUpdate()};
        }
    }
});
exports.get=function (path) {
    if (path==null) throw new Error("FS.get: null path");
    if (path instanceof SFile) return path;
    return new SFile(path);
};
var DONOTEXPORT="DONOTEXPORT";
exports.exportDir=function (dir,options) {
    if (!options) options={};
    if (typeof dir=="string") dir=exports.get(dir);
    var res={base: dir.path()};
    var data=res.data={};
    e(dir);
    return res;
    function e(cfd) {
        var rp=cfd.relPath(dir);
        data[rp]=cfd.text();
        if (!options.keepCR) data[rp]=data[rp].replace(/\r/g,"");
        if (cfd.isDir()) {
            if (cfd.rel(DONOTEXPORT).exists()) return;
            cfd.each(e);
        }
    }
};
