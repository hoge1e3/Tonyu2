requirejs(["Shell","Wiki","FS","requestFragment","WebSite"], function (sh,Wiki,FS,rf,WebSite) {
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
    };
    sh.wiki2serv.description="wiki2serv ../doc/ ../../../doc/";
});