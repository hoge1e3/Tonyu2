define(["JSONCol","IndentBuffer"], function (jc,ib) {
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
            jc(FS.exportDir(dir),buf);
        }, file.name());
        file.text(buf.buf);
        console.log("GenROM  "+ dir + " -> " +file);
    }
    return genROM;
});
