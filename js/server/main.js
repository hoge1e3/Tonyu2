var express = require('express');
var app = express.createServer();
var SFile = require("./SFile");

var fsHome=SFile.get("fs");
app.configure(function () {
    app.use(express.static(__dirname+"/../../" ,{maxAge:864000000}));
    app.use(express.staticCache());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});
app.get('/File2LS', function(req, resp){
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
            ddata[f.name()+ (f.isDir()?"/":"")]=f.lastModified();
        });
        var pdatas=JSON.stringify(ddata);
        data[pp]=pdatas;
    }
    res={base:base, data:data};
	resp.send( res);
});
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
app.post('/LS2File', function(req, res){
    console.log(req.body);
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
});
function fromLSPath(path) {
    if (startsWith(path,"/")) path=path.substring(1);
    return fsHome.rel(path);
}


//app.use(express.bodyDecoder());
var http = require('http');
var server = http.createServer(app);
server.listen(3000);
