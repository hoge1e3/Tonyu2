requirejs(["Shell","Wiki","FS","requestFragment","WebSite"], function (sh,Wiki,FS,rf,WebSite) {
    /*sh.wiki2servSingle=function (path) {
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
            sh.echo("generated ",path,"->",dst);
        } else {
            sh.echo(dst,":same path");
        }
        //alert(h.html());
    };*/
    sh.wiki2serv=function (wikiDirPath,htmlDirPath) {
        var h=$("<div>");
        var wikiDir=sh.resolve(wikiDirPath);
        var htmlDir=sh.resolve(htmlDirPath);
        var w=Wiki(h,wikiDir,{useAnchor:true});
        //var data={};
        wikiDir.recursive(function (wikiFile) {
            if (!wikiFile.endsWith(".txt")) return;
            // wikiDir=/fs/Tonyu/doc/
            // wikiFile=/fs/Tonyu/doc/index.txt
            var htmlFilePath=htmlDir.   // /doc/
            rel(wikiFile.relPath(wikiDir)).   //rel("index.txt") -> /doc/index.txt
            path().replace(
                    /\.txt$/,".html"
            );  // /doc/index.html
            var htmlFile=FS.get(htmlFilePath);
            w.show(wikiFile);
            var src="";
            src+='<html><head>';
            src+='<meta charset="utf-8"/>';
            src+='<meta http-equiv="Content-type" content="text/html; charset=utf8"/>';
            src+='</head><body>';
            src+="<link rel='stylesheet' href='/css/bootstrap.css'/>\n";
            src+="<style>"+
            "body{padding-top:20px; margin-left: 20px; margin-right:20px;}"+
            "</style>\n";
            src+="<title>"+wikiFile.truncExt(".txt")+"</title>\n";
            src+=h.html();
            src+='</body></html>';
            //data[FS.get(htmlDir).relPath(wikiDir)]=src;
            htmlFile.text(src);
            var encFile=htmlFile.up().rel(encodeURI(htmlFile.name()).replace(/%/g,"_") );
            if (encFile.path()!=htmlFile.path()) encFile.text(src);
            sh.echo("generated ",wikiFile.path(),"->",htmlFile.path());

        });

        /*console.log(wikiDir.path(), data);
        $.post("/edit/LS2FileSync",{
            base:wikiDir.path() ,
            data:JSON.stringify(data)
        });*/

    };
    sh.wiki2serv.description="wiki2serv ../doc/ ../../../doc/";
});