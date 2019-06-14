define(["FS","Util","WebSite"], function (FS,Util,WebSite) {
    var east=function (dir,options) {
        options=options||{};
        var excludes=options.excludes||{};
        var includeJSScript=options.includeJSScript;
        var buf="<!DOCTYPE html>\n<html><head>\n";
        buf+='<meta http-equiv="Content-type" content="text/html; charset=utf8"/>\n';
        buf+="<script>WebSite_runType='singleHTML';</script>\n";
        if (includeJSScript) {
            var resFile=dir.rel("res.json");
            var resObj=resFile.obj();
            var scriptServer="https://edit.tonyu.jp/";
            resObj.images.forEach(function (im) {
                if (WebSite.builtinAssetNames[im.url]) {
                    buf+='<script src="'+scriptServer+im.url+'.js"></script>\n';
                }
            });
            buf+='<script src="'+scriptServer+'js/lib/jquery-1.10.1.js" type="text/javascript"></script>\n';
            buf+='<script src="'+scriptServer+'js/gen/runScript_concat.min.js" type="text/javascript"></script>\n';
        }
        buf+="<div id='splash' style='position:relative; height: 100%;'>\n";
        buf+="<!--ここに，ロード中に表示する内容を記述できます。-->\n";
        buf+="<!--You can write here what you want to show while loading. -->\n";
        buf+="<div class='progress'>\n";
        buf+="<!-- ここにロード中の進捗が表示されます．表示したくない場合はこのdiv要素を削除してください。 -->\n";
        buf+="<!-- This shows progress. If you don't want to shot, remove this element -->\n";
        buf+="</div>\n";
        buf+="</div>\n";
        buf+="<!--\n";
        buf+="Open this site when editing this game:\n";
        buf+="https://edit.tonyu.jp/index.html?importFromHTML=1\n";
        buf+="-->\n";
        var binary=[],json=[];
        //dir=FS.get(dir);
        dir.recursive(function (f) {
            var rel=f.relPath(dir);
            if (excludes[rel]) return;
            if (f.endsWith(".json") && rel.indexOf("maps/")<0) {
                json.push(f);
                return;
            } else if (!f.endsWith(".tonyu")) {
                binary.push(f);
                return;
            }
            //var name=f.truncExt(".tonyu");
            var m="";//(name==main?" data-main='true'":"");
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"'"+lu+">";
            buf+=escapeLoosely(f.text());
            buf+="</script>\n\n";
        },{excludes:["files/"]});
        json.forEach(function (f) {
            var rel=f.relPath(dir);
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"'"+lu+">\n";
            buf+=beautifyJSON(f.text());
            buf+="</script>\n\n";
        });
        binary.forEach(function (f) {
            var rel=f.relPath(dir);
            var lu=" data-lastupdate='"+f.lastUpdate()+"' ";
            buf+="<script language='text/tonyu' type='text/tonyu' data-filename='"+rel+"' data-wrap='80'"+lu+">";
            buf+=wrap(f.text(),80);
            buf+="</script>\n\n";
        });
        buf+="</head><body></body></html>";
        return buf;
        function wrap(str, cols) {
            var lines=str.split("\n");
            var buf="";
            lines.forEach(function (line) {
                while (true) {
                    if (line.length>cols) {
                        buf+=line.substring(0,cols)+"\\\n";
                        line=line.substring(cols);
                    } else {
                        buf+=line+"\n";
                        break;
                    }
                }
                return buf;
            });
            return buf;
        }
        function beautifyJSON(str) {
            try {
                var o=JSON.parse(str);
                return JSON.stringify(o,null,4);
            }catch(e) {
                return str;
            }
        }
    };
    function escapeLoosely(text) {
        text=text.replace(/&(#?[\w\d]+;)/g, function (_,a){
            return "&amp;"+a;
        });
        text=text.replace(/<(\s*)\/(\s*)script(\s*)>/ig,function (_,s1,s2,s3) {
            return "&lt;"+s1+"/"+s2+"script"+s3+"&gt;" ;
        });
        return text;
    }
    return east;
});
