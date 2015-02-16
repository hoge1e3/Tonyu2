define(["genROM","dumpScript","Util","FS","Sync","Shell","WebSite"],
        function (genROM,dumpScript,Util,FS,Sync,sh,WebSite) {
    var build=Util.getQueryString("build",0);
    if (build) {
        $(doBuild);
    }
    sh.build=doBuild;
    sh.build.description="Build files before commit.";
    function doBuild() {
        genROM(FS.get("/Tonyu/Kernel/"), FS.get("/Tonyu/js/gen/ROM_k.js"));
        genROM(FS.get("/Tonyu/doc/"), FS.get("/Tonyu/js/gen/ROM_d.js"));
        genROM(FS.get("/Tonyu/SampleROM/"), FS.get("/Tonyu/js/gen/ROM_s.js"));
        sync("/Tonyu/", function () {
            //next(".");
            concat({name: "ide/selProject", outfile:"index"},function (res) {
                sh.echo(res.mesg);
                concat({name: "ide/editor", outfile:"project"},function (res) {
                    sh.echo(res.mesg);
                    concat({name: "runScript", outfile:"runScript"},function (res) {
                        sh.echo(res.mesg);
                        sh.prompt();
                    });
                });
            });
        });
        return sh.ASYNC;
    }
    function concat(params ,onend) {
        console.log("uploading",params);
        $.ajax({
            type:"GET",
            url:"../../concat",
            data:params
        }).done(function (r) {
                console.log("uploaded",params,"res=",r);
                onend(r);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown)  {
                console.log(XMLHttpRequest, textStatus, errorThrown);
                alert("Error "+textStatus);
        });
    }
    function sync(dir, onend) {
    	console.log("Syncing "+dir);
        Sync.sync(FS.get(dir),onend);
    }
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
	function urlMatch(reg) {
		return document.location.href.match(reg);
	}
});
