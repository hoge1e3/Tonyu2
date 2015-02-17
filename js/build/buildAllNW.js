define(["genROM","dumpScript","Util","FS","Sync","Shell","WebSite"],
        function (genROM,dumpScript,Util,FS,Sync,sh,WebSite) {
    sh.build=doBuild;
    sh.build.description="Build files before commit.";
    function doBuild() {
        var home=FS.get(WebSite.tonyuHome);
        genROM(home.rel("Kernel/"),     home.rel("js/gen/ROM_k.js"));
        genROM(home.rel("doc/"),        home.rel("js/gen/ROM_d.js"));
        genROM(home.rel("SampleROM/"),  home.rel("js/gen/ROM_s.js"));
        sync(home, function () {
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
    	console.log("Syncing "+dir.path());
        Sync.sync(dir,onend);
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
