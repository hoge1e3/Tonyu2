getReq=function () {
    var g=getReq.globals;
    var scr=getReq.scripts;
    if (!g) {
        g=getReq.globals={};
        for (var i in window) {
            g[i]=true;
        }
    } else {
        var src=$("script");
        var name=src[src.length-2].src;
        scr[name]={exports:[]};
        for (var i in window) {
            if (!g[i]) {
                scr[name].exports.push(i);
                g[i]=true;
                getReq.symbols[i]=true;
            }
        }
        getReq.exportBuf.forEach(function (e) {
            scr[name].exports.push(e);
            getReq.symbols[e]=true;
        });
        getReq.exportBuf=[];
    }
};
getReq.scripts={};
getReq.symbols={};
getReq.prefix="";
getReq.genConf=function (options) {
    var base=options.base?options.base:"";
    var res={};
    res.shim={};
    res.paths={};
    if (options.baseUrl) res.baseUrl=options.baseUrl;
    for (var n in getReq.scripts) {
        var scr=getReq.scripts[n];
        var rel=n.substring(base.length).replace(/\.js$/,"");
        var scre={};
        if (scr.deps.length>0) scre.deps=scr.deps;
        var key;
        if (scr.exports.length>0) {
            key=scre.exports=scr.exports[0];
        } else {
            key=rel;
        }
        res.shim[key]=scre;
        res.paths[key]=rel;
    }
    return res;
};
getReq.analyzeSrc=function () {
    var scrs=getReq.scripts;
    for (var i in scrs) {
        (function () {
            var scrn=i;
            var scr=scrs[scrn];
            scr.deps=[];
            $.get(scrn, function (str) {
                //console.log("loaded : "+scrn);
                str.replace(/[a-zA-Z$0-9_]+/g, reg);
                str.replace(/[a-zA-Z$0-9_\.]+/g, reg);
                function reg(n) {
                    if (getReq.symbols[n]===true && scr.deps.indexOf(n)<0 && n!=scr.exports) {
                        console.log(scrn+" reqs "+n);
                        scr.deps.push(n);
                    }
                }
            });
        })();
    }
};
getReq.checkMultiExports=function () {
    var scr=getReq.scripts;
    for (var i in scr) {
        if (scr[i].exports.length>=2) {
            console.log(i, scr[i].exports.join(", "));
        }
    }
};
getReq.exports=function (e) {
    getReq.exportBuf.push(e);
};
getReq.exportBuf=[];
