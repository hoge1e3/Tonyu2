define(["JSONCol","IndentBuffer","WebSite"], function (jc,ib,WebSite) {
    function genROM(dir, file) {
    	var buf=ib();
        var tmpl=
        	"(function () {%{"+
	    		"var rom=%f;%n"+
		        "if (WebSite.devMode || WebSite.disableROM['%s'] || WebSite.isNW) {%{"+
		        	"rom.base='/ROM'+rom.base;%n"+
		        "%}} else {%{"+
		            "FS.mountROM(rom);%n"+
		        "%}}%n"+
		    "%}})();";
        buf.printf(tmpl, function () {
            var ex=FS.exportDir(dir);
            var p=FS.get(dir).relPath(FS.get(WebSite.tonyuHome));
            ex.base="/Tonyu/"+p;
            jc(ex,buf,{singleLine:true});
        }, file.name());
        file.text(buf.buf);
        console.log("GenROM  "+ dir + " -> " +file);
    }
    return genROM;
});
