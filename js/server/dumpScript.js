var FS=require ("./SFile");
var js=FS.get("js");
exports.genShim=function (req,res) {
    var reqConf=require ("../reqConf").conf;
    /*js.recursive(function (s) {
        if (s.endsWith(".js")) {

        }
    });*/
    var revPath={};
    var shim=reqConf.shim;
    var com=/^((\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/g;
    for (var name in reqConf.paths) {
        //console.log(name);
        var fn=reqConf.paths[name]+".js";
        revPath[fn]=name;
        //console.log(fn);
        var f=js.rel(fn);
        if (!f.exists()) {
            console.log(f+" not exists");
            continue;
        }
        var src=f.text();
        src=src.replace(com,"");
        if (name in shim) {
            if (src.match(/(\brequire\b)|(\bdefine\b)/)) {
                console.log(f+" has both shim and require/define");
            }
            continue;
        }
        if (src.match(/\[([^\]]*)\]/)) {
            var reqs=RegExp.lastMatch;
            shim[name]={deps:eval(reqs), exports:name ,srcHead: src.substring(0,50) };
        } else {
            console.log(name+" does not match / "+f);
        }
    }
    var excludes=/(ace-noconflict)|(^server)/;
    js.recursive(function (s) {
        if (s.relPath(js).match(excludes)) return;
        if (s.endsWith(".js")) {
            var r=s.relPath(js);
            if (!revPath[r] ) console.log(r+" is not scanned");
        }
    });
    if (res) res.send(reqConf);
    return reqConf;
};
var excludes={timbre:1, ace:1};
exports.concat=function (req,res) {
    var name=req.query.name;
    var outfile=req.query.outfile;
    var reqConf=exports.genShim();
    var progs=[];
    var visited={};
    for (var i in excludes) visited[i]=true;
    loop(name);
    function loop(name) {
        if (visited[name]) return;
        var s=reqConf.shim[name];
        visited[name]=true;
        if (s && s.deps) {
            s.deps.forEach(loop);
        }
        progs.push(name);
    }
    var buf="";
    buf+="// Created at "+new Date()+"\n";
    var reqSim=FS.get("js/lib/requireSimulator.js").text();
    buf+=reqSim+"\n";
    progs.forEach(function (name) {
        buf+="requireSimulator.setName('"+name+"');\n";
        buf+=js.rel(reqConf.paths[name]+".js").text()+"\n";
    });
    buf+="requireSimulator.setName();\n";
    console.log("Done generate "+name);
    if (outfile) {
        var ouf=FS.get("js/gen/"+outfile+"_concat.js");
        ouf.text(buf);
        res.send({mesg: "Wrote to "+ouf});
    } else {
        res.setHeader("Content-type","text/javascript;charset=utf-8");
        res.send(buf);
    }
};