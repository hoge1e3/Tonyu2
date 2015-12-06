define(["FS","Util","WebSite","plugins","Shell","Tonyu"],
        function (FS,Util,WebSite,plugins,sh,Tonyu) {
    var MkRun={};
    sh.mkrun=function (dest) {
        return MkRun.run( Tonyu.currentProject, FS.get(dest));
    };
    MkRun.run=function (prj,dest,options) {
        options=options||{};
        var prjDir=prj.getDir();
        var resc=prj.getResource();
        var opt=prj.getOptions();
        var loadFilesBuf="function loadFiles(dir){\n";
        var wwwDir=FS.get(WebSite.wwwDir);
        var jsDir=wwwDir.rel("js/");
        //var sampleImgDir=wwwDir.rel("images/");
        if (options.copySrc) copySrc();
        return $.when(
                copySampleImages(),
                convertLSURL(resc.images),
                convertLSURL(resc.sounds),
                genFilesJS(),
                copyScripts(),
                copyPlugins(),
                copyLibs(),
                copyResources("images/"),
                copyResources("sounds/"),
                copyIndexHtml(),
                genReadme()
        );

        function genReadme() {
            dest.rel("Readme.txt").text(
                    "このフォルダは、Webサーバにアップロードしないと正常に動作しない可能性があります。\n"+
                    "詳しくは\nhttp://hoge1e3.sakura.ne.jp/tonyu/tonyu2/runtime.html\nを御覧ください。\n"
            );
        }
        function copyResources(dir) {
            var src=prjDir.rel(dir);
            if (src.exists()) src.copyTo(dest.rel(dir));
        }
        function genFilesJS(){
            addFileToLoadFiles("res.json",resc);
            addFileToLoadFiles("options.json",opt);
            var mapd=prjDir.rel("maps/");
            if (mapd.exists()) {
                mapd.recursive(function (mf) {
                    addFileToLoadFiles( mf.relPath(prjDir), mf.obj());
                });
            }
            dest.rel("js/files.js").text(loadFilesBuf+"}");
        }
        function copyIndexHtml() {
            return wwwDir.rel("html/runtimes/index.html").copyTo(dest);
        }
        function copyScripts() {
            var usrjs=prjDir.rel("js/concat.js");
            var kerjs=FS.get(WebSite.kernelDir).rel("js/concat.js");
            var runScr2=jsDir.rel("gen/runScript2_concat.js");
            return $.when(
                usrjs.copyTo(dest.rel("js/concat.js")),
                kerjs.copyTo(dest.rel("js/kernel.js")),
                runScr2.copyTo(dest.rel("js/runScript2_concat.js"))
            );
        }
        function copyPlugins() {
            var pluginDir=jsDir.rel("plugins/");
            if (!opt.plugins) return;
            // TODO opt.plugins is now hash, but array is preferrable....
            var args=[];
            for (var n in opt.plugins) {
                // TODO if src not found, do not copy and use src directory(maybe http://....)
                var pf=pluginDir.rel(plugins.installed[n].src);
                args.push( pf.copyTo(dest.rel("js/plugins/")) );
            }
            return $.when.apply($,args);
        }
        function copyLibs() {
            return $.when(
                    jsDir.rel("lib/jquery-1.10.1.js").copyTo(dest.rel("js/lib/")),
                    jsDir.rel("lib/require.js").copyTo(dest.rel("js/lib/"))
            );
        }
        function addFileToLoadFiles(name, data) {
            loadFilesBuf+="\tdir.rel('"+name+"').obj("+JSON.stringify(data)+");\n";
        }
        function convertLSURL(r) {
            for (var k in r) {
                var url=r[k].url;
                if (Util.startsWith(url,"ls:")) {
                    var rel=url.substring("ls:".length);
                    r[k].url=rel;
                }
            }
        }
        function copySampleImages() {
            var urlAliases= {
                "images/Ball.png":1,
                "images/base.png":1,
                "images/Sample.png":"../../images/Sample.png",
                "images/neko.png":"../../images/neko.png",
                "images/inputPad.png":"../../images/inputPad.png",
                "images/mapchip.png":"../../images/mapchip.png",
                "images/sound.png":"../../images/sound.png",
                    "images/ecl.png":"../../images/ecl.png"
            };
            var args=[];
            for (var k in resc.images) {
                var u= resc.images[k].url;
                if (urlAliases[u] && !prjDir.rel(u).exists()) {
                    var imgf=wwwDir.rel(u);
                    if (imgf.exists()) {
                        args.push( imgf.copyTo(dest.rel(u)) );
                    } else {
                        sh.echo(imgf+" not exists!");
                    }
                }
            }
            return $.when.apply($,args);
        }
        function copySrc() {
            prjDir.copyTo(dest.rel("src/"));
        }
    };
    return MkRun;
});