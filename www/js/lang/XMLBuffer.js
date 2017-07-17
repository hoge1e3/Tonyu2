// var b=XMLBuffer(src);
// b(node);
// console.log(b.buf);
if (typeof define!=="function") {
	define=require("requirejs").define;
}
define(["Parser"],
function(Parser) {
XMLBuffer=function (src) {
	var $;
	$=function (node, attrName){
		//console.log("genX: "+node+ " typeof = "+typeof node+"  pos="+node.pos+" attrName="+attrName+" ary?="+(node instanceof Array));
		if (node==null || typeof node=="string" || typeof node=="number") return;
		var r=Parser.getRange(node);
		if (r) {
			while ($.srcLen < r.pos) {
				$.src(src.substring($.srcLen, r.pos));
			}
		}
		if (node==null) return;
		if (attrName) $.startTag("attr_"+attrName+"");
		if (node.type) {
			if (node.isToken) $.startTag("token_"+node.type+"");
			else $.startTag(node.type+"");
		}
		if (node.text) $.src(r.text);
		else {
			var n=$.orderByPos(node);
			n.forEach(function (subnode) {
				if (subnode.name && subnode.name.match(/^-/)) {
					$(subnode.value);
				} else {
					$(subnode.value, subnode.name);
				}
			});
		}
		if (r) {
			while ($.srcLen < r.pos+r.len) {
				$.src(src.substring($.srcLen, r.pos+r.len));
			}
		}
		if (node.type) {
			if (node.isToken) $.endTag("token_"+node.type+"");
			else $.endTag(""+node.type+"");
		}
		if (attrName) $.endTag("attr_"+attrName);
	};
	$.orderByPos=XMLBuffer.orderByPos;
	$.src=function (str) {
		$.buf+=str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
		$.srcLen+=str.length;
	};
	$.tag=function (str) {
		$.buf+=str;
	};
	$.startTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("<"+tagName+">");
		} else {
			$.tag("<token>");
			//$.tag("<operator name=\""+tagName+"\">");
		}
	};
	$.endTag=function (tagName) {
		if (tagName.match(/^[a-zA-Z_0-9]+$/)) {
			$.tag("</"+tagName+">");
		} else {
			$.tag("</token>");
			//$.tag("</operator>");
		}
	};

	$.buf="";
	$.srcLen=0;
	return $;
};
XMLBuffer.orderByPos=function (node) {
	var res=[];
	/*if (node[XMLBuffer.SUBELEMENTS]) {
		//console.log("subele",node);
		node[XMLBuffer.SUBELEMENTS].forEach(function (e,i) {
			if (e) {
				res.push({value:e});
			}
		});
	} else {*/
		for (var i in node) {
			if (!node.hasOwnProperty(i)) continue;
			if (node[i]==null || typeof node[i]=="string" || typeof node[i]=="number") continue;
			if (typeof(node[i].pos)!="number") continue;
			if (isNaN(parseInt(i)) && !(i+"").match(/^-/)) {
				res.push({name: i, value: node[i]}); 
			} else {
				res.push({value: node[i]}); 
			}
		}
	//}
	res=res.sort(function (a,b) {
		return a.value.pos-b.value.pos;
	});
	return res;
};
XMLBuffer.SUBELEMENTS="[SUBELEMENTS]";
return XMLBuffer;
});