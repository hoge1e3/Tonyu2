define([],function (){
    var trc={};
    var pat=/_trc_func_([0-9]+)_.*[^0-9]([0-9]+):([0-9]+)[\s\)]*\r?$/;
    trc.isAvailable=function () {
        var scr=
            "({\n"+
            "    main :function _trc_func_17000000_0() {\n"+
            "      var a=(this.t.x);\n"+
            "    }\n"+
            "}).main();\n";
        var s;
        try {
            eval(scr);
        } catch (e) {
            s=e.stack;
            if (typeof s!="string") return false;
            var lines=s.split(/\n/);
            for (var i=0 ; i<lines.length; i++) {
                var p=pat.exec(lines[i]);
                if (p) return true;
            }
        }
        return false;
    };
    trc.get=function (e,ttb) {
        s=e.stack;
        if (typeof s!="string") return false;
        var lines=s.split(/\n/);
        var res=[];
        for (var i=0 ; i<lines.length; i++) {
            var p=pat.exec(lines[i]);
            if (!p) continue;
            var id=p[1];
            var row=p[2];
            var col=p[3];
            var tri=ttb.decode(id);
            if (tri && tri.klass) {
                var str=tri.klass.src.js;
                var slines=str.split(/\n/);
                var sid=null;
                for (var i=0 ; i<slines.length && i+1<row ; i++) {
                    var lp=/\$LASTPOS=([0-9]+)/.exec(slines[i]);
                    if (lp) sid=parseInt(lp[1]);
                }
                console.log("slines,row,sid",slines,row,sid);
                if (sid) {
                    var stri=ttb.decode(sid);
                    if (stri) res.push(stri);
                }
            }
        }
        console.log("ttc.get",lines,res);
        return res;
    };
    return trc;
});