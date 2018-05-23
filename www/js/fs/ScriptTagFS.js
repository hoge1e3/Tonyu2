define(["Content"],function (Content) {
	var STF={};
	STF.toObj=function () {
	    var scrs=$("script");
	    var res={};
	    scrs.each(function (){
	        var s=this;
	        if (s.type=="text/tonyu") {
	            var fn=$(s).data("filename");
	            if (fn) {
	                var l=parseInt($(s).data("lastupdate"));
	                var w=$(s).data("wrap");
					var src=unescapeHTML(s.innerHTML);
	                if (w) {
	                    w=parseInt(w);
	                    res[fn]={lastUpdate:l, text:unwrap(src, w)};
	                } else {
	                    res[fn]={lastUpdate:l, text:src};
	                }
	            }
	        }
	    });
	    return res;
	    function unwrap(str, cols) {
	        var lines=str.split("\n");
	        var buf="";
	        lines.forEach(function (line) {
	            if (line.length>cols) {
	                buf+=line.substring(0,cols);
	            } else {
	                buf+=line+"\n";
	            }
	        });
	        return buf;
	    }
	};
	STF.copyTo=function (dir) {
	    var o=STF.toObj();
	    for (var fn in o) {
            var f=dir.rel(fn);
            if (f.isText()) {
                f.text(o[fn].text);
            } else {
                f.setBytes(Content.url(o[fn].text).toByteArray() );
            }
        }
	};
	function unescapeHTML(str) {
		var div = document.createElement("div");
		div.innerHTML = str.replace(/</g,"&lt;")
							 .replace(/>/g,"&gt;")
							 .replace(/ /g, "&#32;")
							 .replace(/\r/g, "&#13;")
							 .replace(/\n/g, "&#10;");
		return div.textContent || div.innerText;
	}
	return STF;
});
