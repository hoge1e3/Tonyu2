define(["genROM","dumpScript","Util","FS","Sync","Shell","WebSite"],
        function (genROM,dumpScript,Util,FS,Sync,sh,WebSite) {
    var build=Util.getQueryString("build",0);
    if (build) {
        $(doBuild);
    }
    sh.build=WebSite.isNW?doBuildNW:doBuild;
    sh.build.description="Build files before commit.";
    function doBuildNW() {
        var home=FS.get(WebSite.tonyuHome);
        var genHome=FS.get(".");
        embedVersion(genHome.rel("js/runtime/TonyuLib.js"));
        genROM(home.rel("Kernel/"),     genHome.rel("js/gen/ROM_k.js"));
        genROM(home.rel("doc/"),        genHome.rel("js/gen/ROM_d.js"));
        genROM(home.rel("SampleROM/"),  genHome.rel("js/gen/ROM_s.js"));
        var ds=require("dumpScript");
        var reqConf=ds.genShim();
        window.generatedShim=reqConf;
        ds.concat({names:["fs/ROMk","fs/ROMd","fs/ROMs","ide/selProject"], outFile:"index",reqConf:reqConf});
        ds.concat({names: ["fs/ROMk","fs/ROMd","fs/ROMs","ide/editor"], outFile:"project",reqConf:reqConf});
        ds.concat({names: ["fs/ROMk","runScript"], outFile:"runScript",reqConf:reqConf});
        sh.echo("To compile documents, type:");
        sh.echo("wiki2serv ../doc/ ../../../doc/");
    }
    function embedVersion(f) {
        var r=f.text().replace(/(VERSION:)([0-9]+)(,\/\/EMBED_VERSION)/, function (t,a,b,c) {
            return a+new Date().getTime()+c;
        });
        f.text(r);
    }
    function doBuild() {
        var home=FS.get(WebSite.tonyuHome);
        genROM(home.rel("Kernel/"),     home.rel("js/gen/ROM_k.js"));
        genROM(home.rel("doc/"),        home.rel("js/gen/ROM_d.js"));
        genROM(home.rel("SampleROM/"),  home.rel("js/gen/ROM_s.js"));
        sync(home, function () {
            //next(".");
            concat({names:["fs/ROMk","fs/ROMd","fs/ROMs","ide/selProject"], outfile:"index"},function (res) {
                sh.echo(res.mesg);
                concat({names: ["fs/ROMk","fs/ROMd","fs/ROMs","ide/editor"], outfile:"project"},function (res) {
                    sh.echo(res.mesg);
                    concat({names: ["fs/ROMk","runScript"], outfile:"runScript"},function (res) {
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
