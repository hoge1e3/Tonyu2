function fixIndent(str, indentStr) {
    if (!indentStr) indentStr="    ";
    var incdec={"{":1, "}":-1};
    var linfo=[];
    try {
        var node=TonyuLang.parse(str);
        var v=Visitor({
            token: function (node) {
                var r=pos2RC(str, node.pos);
                if (!linfo[r.row]) linfo[r.row]="";
                if (incdec[node.text]) {
                    if (incdec[node.text]) linfo[r.row]+=node.text;
                }
            }
        });
        v.def=function (node) {
            if (!node || typeof node!="object") return;
            if (node[Grammar.SUBELEMENTS]) {
                node[Grammar.SUBELEMENTS].forEach(function (e) {
                    v.visit(e);
                });
                return;
            }
            for (var i in node) {
                if (node.hasOwnProperty(i)) {
                    v.visit(node[i]);
                }
            }
        };
        v.visit(node);
    }catch(e) {
        var r={row:0, col:0};
        var len=str.length;
        for (var i=0 ; i<len ;i++) {
            var c=str.substring(i,i+1);
            if (incdec[c]) {
                if (!linfo[r.row]) linfo[r.row]="";
                if(incdec[c]) linfo[r.row]+=incdec[c];
            } else if (c=="\n") {
                r.row++;
                r.col=0;
            } else {
                r.col++;
            }
        }
    }
    var res="";
    var lines=str.split("\n");
    var curDepth=0;
    var row=0;
    lines.forEach(function (line) {
        if (linfo[row]!=null) {
            line=line.replace(/^\s*/,"");
            linfo[row].match(/^(\}*)/);
            var closes=RegExp.$1.length;
            linfo[row].match(/(\{*)$/);
            var opens=RegExp.$1.length;
            curDepth-=closes;
            line=indStr()+line;
            curDepth+=opens;
        }
        res+=line+"\n";
        row++;
    });
    res=res.replace(/\n$/,"");
    return res;
    function indStr() {
        var res="";
        for (var i=0 ;i<curDepth ;i++) {
            res+=indentStr;
        }
        return res;
    }
    function pos2RC(str, pos) {
        var res={row:0, col:0};
        var len=Math.min(str.length,pos);
        for (var i=0 ; i<len ;i++) {
            if (str.substring(i,i+1)=="\n") {
                res.row++;
                res.col=0;
            } else {
                res.col++;
            }
        }
        return res;
    }
}
