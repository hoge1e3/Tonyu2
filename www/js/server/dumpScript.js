var FS=require ("./SFile");
var js=FS.get("js");
exports.genShim=function (req,res) {
    var reqConf=require ("../reqConf").conf;
    /*js.recursive(function (s) {
        if (s.endsWith(".js")) {

        }
    });*/
    var revPath={};
    var shim={};
    for (var i in reqConf.shim) shim[i]=reqConf.shim[i];
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
        /*var appendConcat=null;
        if (src.match(/\/\/CONCAT:(\[[^\]]*\])/)) {
            appendConcat=eval(RegExp.$1);
        }*/
        src=src.replace(com,"");
        var isModule=src.match(/(\brequirejs\b)|(\brequire\b)|(\bdefine\b)/);
        if (name in shim) {
            if (isModule) {
                console.log(f+"("+name+") has both shim and require/define");
            }
            continue;
        }
        if (isModule) {
            if (src.match(/\[([^\]]*)\]/)) {
                var reqs=RegExp.lastMatch;

                try {
                    var reqa=eval(reqs);
                    /*if (appendConcat) {
                        reqa=reqa.concat(appendConcat);
                        console.log("AppendConcat", name, reqa);
                    }*/
                    shim[name]={deps:reqa, exports:name ,srcHead: src.substring(0,50) };
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
    var nrq={shim:shim,paths:reqConf.paths};
    if (res) res.send(nrq);
    return nrq;
};
var excludes={timbre:1, ace:1};
exports.concat=function (req,res) {
    var name=req.query.name;
    var names=req.query.names;
    if (name) names=[name];
    var outfile=req.query.outfile;
    var reqConf=exports.genShim();
    var progs=[];
    var visited={};
    for (var i in excludes) visited[i]=true;
    names.forEach(loop);
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
    console.log("Done generate ",names);
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