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
            var webtop=wikiDir.up().relPath(wikiFile.up());
            var htmlFile=FS.get(htmlFilePath);
            w.show(wikiFile);
            var src="";
            src+='<html><head>';
            src+='<meta charset="utf-8"/>\n';
            src+='<meta http-equiv="Content-type" content="text/html; charset=utf8"/>\n';
            src+="<title>"+wikiFile.truncExt(".txt")+"</title>\n";
            src+='</head><body>';
            src+="<link rel='stylesheet' href='"+webtop+"css/bootstrap.css'/>\n";
            src+="<link rel='stylesheet' href='"+webtop+"css/tonyu.css'/>\n";
            src+="<script src='"+webtop+"js/lib/jquery-1.10.1.js'/></script>\n";
            src+="<script src='"+webtop+"js/ide/NWMenu.js'/></script>\n";
            src+="<style>"+
            "body{padding-top:20px; margin-left: 20px; margin-right:20px; font-family:\"MS UI Gothic\",sans-serif;}"+
            "</style>\n";
            src+="<button onclick='javascript:history.back();'>←Back</button><br/>\n";
            src+=h.html();
            src+="<br/><button onclick='javascript:history.back();'>←Back</button>\n";
            src+='</body></html>';
            //data[FS.get(htmlDir).relPath(wikiDir)]=src;
            //htmlFile.text(src);
            var encFile=htmlFile.up().rel(w.encodeURL(htmlFile.name()) );
            /*if (encFile.path()!=htmlFile.path()) */encFile.text(src);
            sh.echo("generated ",wikiFile.path(),"->",encFile.path());

        });
    };
    sh.wiki2serv.description="wiki2serv ../doc/ ../../../doc/";
});