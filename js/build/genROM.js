define(["JSONCol","IndentBuffer"], function (jc,ib) {
    function genROM(dir, file) {
    	var buf=ib();
        var tmpl=
        	"(function () {%{"+
	    		"var rom=%f;%n"+
		        "if (WebSite.devMode) {%{"+
		        	"rom.base='/ROM'+rom.base;%n"+
		        "%}}%n"+
		        "FS.mountROM(rom);%n"+
		    "%}})();";
        buf.printf(tmpl, function () {
            jc(FS.exportDir(dir),buf);
        });
        file.text(buf.buf);
        console.log("GenROM  "+ dir + " -> " +file);
    }
    return genROM;
});
