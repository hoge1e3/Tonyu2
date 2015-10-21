var SFile = require("./SFile");
var fsHome=SFile.get("fs");
var DINFO=".dirinfo";
exports.File2LS=function(req, resp){
    //res.send(req.query.base);
    resp.setHeader("Content-Type", "text/plain;charset=utf8");
    var base=req.query.base;
    var basef;
    if (base==null) {
        basef=fsHome;
        base="/";
    } else {
        basef=fsHome.rel(base.substring(1));
    }
    var data={},dirs={};
    basef.recursive(function (f) {
	if (f.up().name()==DINFO) return;
        var p=toLSPath(basef, f);
        data[p]= f.text();
        dirs[f.parent().path()]=1;
    });
    for (var dirn in dirs) {
        var d=SFile.get(dirn);
        var pp=toLSPath(basef, d);
	var ddata=getMeta(d);
        var pdatas=JSON.stringify(ddata);
        data[pp]=pdatas;
    }
    res={base:base, data:data};
    resp.send( res);
};
function toLSPath(/*SFile*/ base, /*SFile*/ child) {
    var p=child.relPath(base);
    p=p.replace(/\\/g, "/");
    if (startsWith(p,"./")) {
        p=p.substring(2);
    }
    if (child.isDir() && !endsWith(p,"/")) {
        p=p+"/";
    }
    if (p==("./")) {
        p="";
    }
    return p;
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
exports.LS2File=function(req, res){
    //console.log(req.body);
    //console.log(req);
    var s=req.body.json;
    var m=JSON.parse(s);
    var bases = m.base;
    bases=bases.substring(1);
    var data=m.data;
    for (var fn in data) {
        var text=data[fn];
        var path=bases+fn;
        if (endsWith(path,"/")) continue;
        var dst=fromLSPath(path);
        console.log(path+"->"+dst);
        if (dst.isDir()) continue;
        dst.text(text);
    }
    res.send("OK!!");
}
function fromLSPath(path) {
    if (startsWith(path,"/")) path=path.substring(1);
    return fsHome.rel(path);
}
exports.getDirInfo=function(req, resp){
    //console.log("getDirInfo");
    var base=req.query.base;
    var basef;
    resp.setHeader("Content-Type", "text/plain;charset=utf8");
    if (base==null) {
        basef=fsHome;
        base="/";
    } else {
        basef=fsHome.rel(base.substring(1));
    }
    var data={},dirs={};
    function recDir(dir,f) {
	f(dir);
	dir.each(function (fi) {
	    if (fi.isDir()) recDir(fi, f);
	});
    }
    recDir(basef,function (dir) {
	if (dir.name()==DINFO) return;
	//console.log("getDirInfo "+dir);
        var o=dirInfoF(dir);
	o.each(function (o_f) {
	    var f=dir.rel(o_f.name());
	    if (f.isDir()) return; //continue;
	    var p=toLSPath(basef, f);
	    data[p]=o_f.obj(); //o[fn];
	});
    });
    var res={base:base, data:data};
    resp.send( res);
};
function dirInfoF(dir) {
    if (dir.name()==DINFO) return null;
    var res=dir.rel(DINFO);
    if (!res.exists()) {
	res.mkdir();
	dir.each(function (f) {
	    if (f.isDir()) return;
	    res.rel(f.name()).obj({lastUpdate:f.lastUpdate()});
	});
    } else if (!res.isDir()) {
	var data=res.obj();
	res.rm();
	res.mkdir();
	for (var n in data) {
	    if (!valid(n)) continue;
	    res.rel(n).obj(data[n]);
	}
    }
    return res;
}
function getMeta(f) {
    if (f.name()==DINFO) return null;
    if (f.isDir()) {
	var res={};
	var mf=dirInfoF(f);
	mf.each(function (mff) {
	    res[mff.name()]=mff.obj();
	});
	return res;
    } else {
	var mf=dirInfoF(f.up()).rel(f.name());
	var res;
	if (!mf.exists()) {
	    if (f.exists()) {
		res={lastUpdate:f.lastUpdate()};
	    } else {
		res={lastUpdate:0,trashed:true};
	    }
	    mf.obj(res);
	    return res;
	}
	return mf.obj();
    }
}
function valid(name) {
    return !name.match(/[\\\:\?\*\>\<\|\"]/);
}
function setMeta(f, meta) {
    if (f.isDir()) return;
    var o=dirInfoF(f.up()).rel(f.name()); //.obj();
    o.obj(meta);
}
exports.File2LSSync=function(req, resp){
    var paths=JSON.parse(req.body.paths);
    var base=req.body.base;
    resp.setHeader("Content-Type", "text/plain;charset=utf8");
    var basef;
    if (base==null) {
        basef=fsHome;
        base="/";
    } else {
        basef=fsHome.rel(base.substring(1));
    }
    var data={};
    paths.forEach(function (path) {
	var f=basef.rel(path);
	if (f.name()==DINFO) return;
	var m=getMeta(f);
	if (f.exists()) m.text=f.text();
	data[path]=m;
    });
    var res={base:base, data:data};
    resp.send( res);
};

exports.LS2FileSync=function(req, res){
    var base=req.body.base;
    var data=JSON.parse(req.body.data);
    var basef;
    if (base==null) {
        basef=fsHome;
        base="/";
    } else {
        basef=fsHome.rel(base.substring(1));
    }
    for (var path in data) {
        var o=data[path];
        if (endsWith(path,"/")) continue;
	if (!valid(path)) continue;
        var dst=basef.rel(path);
        console.log(path+"->"+dst);
        if (dst.isDir()) continue;
	if (o.trashed && dst.exists()) dst.rm();
	else {
	    if (!dst.exists() || dst.text()!==o.text) {
		dst.text(o.text);
	    }
	}
	delete o.text;
        setMeta(dst,o);
    }
    res.send("OK!!");
}

