define([],function () {
    return function (pwidth, pheight, width, height,ary,mapFile,mem) {
        var i=0;
        var table=[];
        var mat=[],matOn=[];
        skipLine();// TONYU_ACCESSIBLE_FILE
        skipLine();// READABLE_WRITEABLE
        skipLine();// MEMORYCARD_0001
        readVersion();
        readTable();
        readMatrix();
        mem[mapFile.path()]=JSON.stringify(
                {chipWidth:pwidth, chipHeight:pheight,
                    pTable:table,baseData:[mat,matOn]}
                );
        var buf="";
        buf+="$map=new T1Map{zOrder:1000};\n";
        buf+="$map.load(\""+mapFile.name()+"\");"
        return buf;
        function readVersion() {
            readInt();
        }
        function readTable() {
            var cnt=readInt();
            for (var j=0 ; j<cnt ; j++) {
                var name=readString();
                var p=readInt();
                table.push({name:name,p:p});
            }
        }
        function readMatrix() {
            for (var r=0; r<height ; r++) {
                var row=[],rowOn=[];
                mat.push(row);
                matOn.push(rowOn);
                for (var c=0; c<width ; c++) {
                    var p=readInt();
                    var e=[];
                    var added=false;
                    for (var idx=0; idx<table.length; idx++) {
                        var o=table[idx].p;
                        if (p>=o) {
                            row.push([idx,p-o]);
                            added=true;
                            break;
                        }
                    }
                    if (!added) {
                        row.push([-1,p]);
                    }
                    rowOn.push([-1,-1]);
                }
            }
        }
        function skipLine() {
            for (; i<ary.length ; i++) {
                if (ary[i]==10) {
                    i++;
                    break;
                }
            }
        }
        function readInt() {
            var res=0,k=1;
            if (i>=ary.length) throw "intEOF: "+i;
            for (var j=0 ; j<4 ; j++) {
                res+=ary[i++]*k;
                k<<=8;
            }
            console.log("Rdint",i,res);
            return res;
        }
        function readString() {
            var len=readInt();
            var buf="";
            for (var j=0 ; j<len ; j++) {
                if (i>=ary.length) throw "strEOF: "+i;
                buf+=String.fromCharCode(ary[i++]);
            }
            console.log("Rdstr",i,buf);
            return buf;
        }
    };
});