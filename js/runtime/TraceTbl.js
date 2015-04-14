define(["Tonyu", "FS", "TError"],
function(Tonyu, FS, TError) {
return Tonyu.TraceTbl=(function () {
    var TTB={};
    var POSMAX=1000000;
    var pathIdSeq=1;
    var PATHIDMAX=10000;
    var path2Id={}, id2Path=[];
    var path2Class={};
    TTB.add=function (klass, pos){
        var file=klass.src.tonyu;
        var path=file.path();
        var pathId=path2Id[path];
        if (pathId==undefined) {
            pathId=pathIdSeq++;
            if (pathIdSeq>PATHIDMAX) pathIdSeq=0;
            path2Id[path]=pathId;
            id2Path[pathId]=path;
        }
        path2Class[path]=klass;
        if (pos>=POSMAX) pos=POSMAX-1;
        var id=pathId*POSMAX+pos;
        return id;
    };
    var srcMap={};
    TTB.decodeOLD=function (id) {
        var pos=id%POSMAX;
        var pathId=(id-pos)/POSMAX;
        var path=id2Path[pathId];
        if (path) {
            var f=FS.get(path);
            var klass=path2Class[path];
            return TError("Trace info", klass || f, pos);
        } else {
            return null;
            //return TError("Trace info", "unknown src id="+id, pos);
        }
    };
    TTB.srcMap=srcMap;
    TTB.decode=function (id) {
        var pat=new RegExp("LASTPOS="+id+";//(.*)\r?\n");
        console.log("pat=",pat);
        for (var k in srcMap) {
            var r=pat.exec( srcMap[k] );
            if (r) {
                // user.Main:335
                //alert(r[1]);
                return r[1];
            } else {
                console.log("pat=",pat,"Not found in ",k);

            }
        }
    };
    TTB.addSource=function (key,src) {
        srcMap[key]=src;
    };
    return TTB;
})();
//if (typeof getReq=="function") getReq.exports("Tonyu.TraceTbl");
});