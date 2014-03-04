
define(["genROM","dumpScript","Util","FS"], function (genROM,dumpScript,Util,FS) {
    var build=Util.getQueryString("build",0);
    if (!build) return;
    build=parseInt(build);
    console.log("Build=", build);
    setTimeout(function () {
        console.log("Build start=", build);
     // start with index.html?build=1
        switch (build) {
        case 1:
            genROM(FS.get("/Tonyu/Kernel/"), FS.get("/Tonyu/js/gen/ROM_k.js"));
            genROM(FS.get("/Tonyu/doc/"), FS.get("/Tonyu/js/gen/ROM_d.js"));
            genROM(FS.get("/Tonyu/SampleROM/"), FS.get("/Tonyu/js/gen/ROM_s.js"));
            upload("/", function () {
                next(".");
            });
            break;
        case 2:
            dumpScript({onend:function (buf) {
                var rsc=FS.get("/Tonyu/js/gen/index_concat.js");
                rsc.text(buf);
                next("project.html?dir=/Tonyu/Projects/SandBox/");
            }});
            break;
        case 3:
            dumpScript({onend:function (buf) {
                var rsc=FS.get("/Tonyu/js/gen/project_concat.js");
                rsc.text(buf);
                console.log("project4!");
                next("runScript.html");
            }});
            break;
        case 4:
            dumpScript({onend:function (buf) {
                var rsc=FS.get("/Tonyu/js/gen/runScript_concat.js");
                rsc.text(buf);
                upload("/Tonyu/js/gen/", function () {
                    next("../build/index.html");
                });
            }});
            break;

        }
    },2000);
    function upload(dir, onend) {
    	console.log("Uploading "+dir);
        var json= JSON.stringify( FS.exportDir(dir) );
        $.ajax({
            type:"POST",
            url:"../../LS2File",
            data:{json: json},
            success: onend
        });
    }
	function next(url) {
		document.location.href=url+(url.indexOf("?")>=0?"&":"?")+"build="+(build+1);
	}
	function urlMatch(reg) {
		return document.location.href.match(reg);
	}
});