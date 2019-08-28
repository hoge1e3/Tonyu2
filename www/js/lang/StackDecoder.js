define(function (require, exports, module) {
const S=require("source-map");
const StackTrace=require("stacktrace");
const SourceFiles=require("SourceFiles");
module.exports={
    decode(e) {
        StackTrace.fromError(e).then(tr=>{
            tr.forEach(t=>{
                //console.log(t);
                if (typeof t.functionName!=="string") return;
                if (!S) return;
                /*columnNumber: 17,
                lineNumber: 21,*/
                t.functionName.replace(/[\$_a-zA-Z0-9]+/g, s=> {
                    //console.log("!",s,this.functions[s]);
                    if (SourceFiles.functions[s]) {
                        const sf=SourceFiles.functions[s];
                        const opt={
                            line: t.lineNumber, column:t.columnNumber,
                            bias:S.SourceMapConsumer.GREATEST_LOWER_BOUND
                        };
                        const pos=this.originalPositionFor(sf,opt);
                        console.log("pos",opt,pos);
                    }
                });
            });
            //console.log("functions",this.functions);
        });
        //console.log(st);
    },
    originalPositionFor(sf,opt) {
        const s=sf.getSourceMapConsumer();
        if (!s) return opt;
        return s.originalPositionFor(opt);
    },
    getSourceMapConsumer(sf) {
        if (sf.sourceMapConsumer) return sf.sourceMapConsumer;
        sf.sourceMapConsumer=new S.SourceMapConsumer(JSON.parse(sf.sourceMap));
        //console.log(this.sourceMapConsumer);
        return sf.sourceMapConsumer;
    }
};
});
