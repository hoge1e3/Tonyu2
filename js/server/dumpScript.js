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
        var isModule=src.match(/(\brequirejs\b)|(\brequire\b)|(\bdefine\b)/);
        if (name in shim) {
            if (isModule) {
                console.log(f+" has both shim and require/define");
            }
            continue;
        }
        if (isModule) {
            if (src.match(/\[([^\]]*)\]/)) {
                var reqs=RegExp.lastMatch;
                try {
                    shim[name]={deps:eval(reqs), exports:name ,srcHead: src.substring(0,50) };
                } catch(e) {
                    console.log("dumpScript:Error eval "+name+" src:\n"+reqs);
                    throw e;
                }
            } else {
                console.log(name+" does not have dependencty section / "+f);
            }
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
    var reqSim=FS.get("js/lib/requireSimulator.js").text().replace(/\r/g,"");
    buf+=reqSim+"\n";
    progs.forEach(function (name) {
        buf+="requireSimulator.setName('"+name+"');\n";
        var fn=reqConf.paths[name];
        if (!fn) console.log("dumpScript.js: file not found for module "+name);
        buf+=js.rel(fn+".js").text().replace(/\r/g,"")+"\n";
    });
    buf+="requireSimulator.setName();\n";
    console.log("Done generate "+name);
    if (outfile) {
        var ouf=FS.get("js/gen/"+outfile+"_concat.js");
        ouf.text(buf);

        var ugf=FS.get("js/gen/"+outfile+"_concat.min.js");
        uglify(ouf, ugf);

        res.send({mesg: "Wrote to "+ouf+" and "+ugf});

    } else {
        res.setHeader("Content-type","text/javascript;charset=utf-8");
        res.send(buf);
    }
};
function uglify(srcF, dstF) {
    try {
        var UglifyJS = require("uglify-js");
        var r=UglifyJS.minify(srcF.path());
        dstF.text(r.code);

    }catch(e) {
        console.log("Uglify fail "+e);
        dstF.text(srcF.text());
    }
}