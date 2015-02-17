requirejs(["Shell","Wiki","FS","requestFragment","WebSite"], function (sh,Wiki,FS,rf,WebSite) {
    sh.wiki2servSingle=function (path) {
        var h=$("<div>");
        var home=FS.get(WebSite.tonyuHome);
        var base=home.rel("doc/");
        var w=Wiki(h,base,{useAnchor:true});
        // path=/Tonyu/doc/index.txt
        var dst=base.rel("html/").rel(FS.get(path).relPath(base)).path().replace(
                /\.txt$/,".html"
        );
        if (dst!=path) {
            w.show(path);
            var src="<link rel='stylesheet' href='/css/bootstrap.css'/>\n";
            src+="<style>"+
            "body{padding-top:20px; margin-left: 20px; margin-right:20px;}"+
            "</style>\n";
            src+=h.html();
            var data={pathInfo:"/edit/LS2FileSync"};
            data[FS.get(dst).relPath(base)]=src;
            console.log(base.path(), data);
            rf.post(data.pathInfo,{
                base:base.path() ,
                data:JSON.stringify(data)
             });
            /*
            $.post("/edit/rsh",{
                args:JSON.stringify(["upload",src,dst])
            });*/
            sh.echo("generated ",path,"->",dst);
        } else {
            sh.echo(dst,":same path");
        }
        //alert(h.html());
    };
    sh.wiki2serv=function (dirPath) {
        var h=$("<div>");
        var base=FS.get(dirPath);
        var w=Wiki(h,base,{useAnchor:true});
        var data={};
        base.recursive(function (txtFile) {
            if (!txtFile.endsWith(".txt")) return;
            // base= file:/Tonyu/doc/
            // txtFile=file:/Tonyu/doc/index.txt
            var dst=base.rel("html/").   // file:/Tonyu/doc/html/
            rel(txtFile.relPath(base)).   //rel("index.txt") -> file:/Tonyu/doc/html/index.txt
            path().replace(
                    /\.txt$/,".html"
            );  // /Tonyu/doc/html/index.html
            if (dst!=txtFile.path()) {
                w.show(txtFile);
                var src="<link rel='stylesheet' href='/css/bootstrap.css'/>\n";
                src+="<style>"+
                "body{padding-top:20px; margin-left: 20px; margin-right:20px;}"+
                "</style>\n";
                src+="<title>"+txtFile.truncExt(".txt")+"</title>\n";
                src+=h.html();
                data[FS.get(dst).relPath(base)]=src;
                sh.echo("generated ",txtFile.relPath(base),"->",dst);
            } else {
                sh.echo(dst,":same path");
            }
        });

        console.log(base.path(), data);
        $.post("/edit/LS2FileSync",{
            base:base.path() ,
            data:JSON.stringify(data)
        });

    };
});