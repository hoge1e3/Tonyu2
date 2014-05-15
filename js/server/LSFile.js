var SFile = require("./SFile");
var fsHome=SFile.get("fs");
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
        var p=toLSPath(basef, f);
        data[p]= f.text();
        dirs[f.parent().path()]=1;
    });
    for (var dirn in dirs) {
        var d=SFile.get(dirn);
        var pp=toLSPath(basef, d);
        var ddata={};
        d.each(function (f) {
            ddata[f.name()+ (f.isDir()?"/":"")]={lastUpdate:f.lastModified()};
        });
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
function dirInfoFile(dir) {
    return dir.rel(".dinfo");
}
exports.getDirInfo=function(req, resp){
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
    function recDir(dir,f) {
	f(dir);
	dir.each(function (fi) {
	    if (fi.isDir()) recDir(fi, f);
	});
    }
    recDir(basef,function (dir) {
        var p=toLSPath(basef, dir);
        data[p]= dirInfoFile(dir).text();
    });
    var res={base:base, data:data};
    resp.send( res);
};
exports.File2LSSync=function(req, resp){
    resp.setHeader("Content-Type", "text/plain;charset=utf8");
    var paths=req.query.paths;
    var base=req.query.base;
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
	data[path]={lastUpdate:f.lastUpdate(), text:f.text()};
    });
    var res={base:base, data:data};
    resp.send( res);
};


