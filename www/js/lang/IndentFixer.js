define(function(require,exports,module) {
module.exports=class IndentFixer {
    constructor(t) {
        this.tokenizer=t;
    }
    fix(str,indentStr="    ") {
    	//const incdec={"{":1, "}":-1};
    	const linfo=[];// ["{{}}","{","}"...]
        let tokens;
    	try {
    		const tokenRes=this.tokenizer.parse(str);
    		tokens=tokenRes;//.result[0];
    		tokens.forEach(token=>{
                linfo[token.row]=linfo[token.row]||"";
    			if (this.tokenizer.isOpen(token) ) {
    				linfo[token.row]+="{";
    			}
                if (this.tokenizer.isClose(token) ) {
    				linfo[token.row]+="}";
    			}
    		});
    	}catch(e) {
    		console.log("ERR",e);
    	}
    	//console.log(linfo);//Edge fails with error 'Could not complete the operation due to error 80020101.'
        //Issue: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/23660690/
    	const lines=str.split("\n");
    	let curDepth=0;
    	let row=0;
        const depths=[];
    	lines.forEach((line,i)=>{
    		let opens=0, closes=0;
    		line=line.replace(/^\s*/,"");
    		if (linfo[row]!=null) {
    			linfo[row].match(/^(\}*)/);
    			closes=RegExp.$1.length;
    			linfo[row].match(/(\{*)$/);
    			opens=RegExp.$1.length;
    		}
    		curDepth-=closes;
            depths[row]=curDepth;
    		curDepth+=opens;
    		row++;
    	});
        row=-1;
        const changeDepths=[];
        for (let token of tokens) {
            if (token.row>row) {
                changeDepths[row]=depths[row];
                row=token.row;
            }
        }
        //console.log(depths, changeDepths);
        return lines.map ((line,row)=>indStr(line, changeDepths[row])).join("\n");
    	function indStr(line, depth) {
            if (typeof depth!=="number") return line;
    		let res="";
    		for (let i=0 ;i<depth ;i++) {
    			res+=indentStr;
    		}
    		return res+line.replace(/^\s*/,"");
    	}
    }
};
});
