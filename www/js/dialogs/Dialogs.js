define(function (require, exports, module) {
    const IFrameDialog=require("IFrameDialog");
    const searchDialog=require("searchDialog");
    const MainClassDialog=require("MainClassDialog");
    const ExportHTMLDialog=require("ExportHTMLDialog");
    const mkrunDiag=require("mkrunDiag");
    const UI=require("UI");
    const WebSite=require("WebSite");
    const FS=require("FS");
    const root=require("root");
    const R=require("R");
    module.exports=ide=>{
        let helpd;
        const project=ide.project;
        const curPrjDir=project.getDir();
        const exportHTMLDialog=new ExportHTMLDialog(project);
        function getCurrentEditor() {
            var i=ide.getCurrentEditorInfo();
            if (i) return i.editor;
            return null;
        }
        return {
            selectMain () {
                const curPrj=ide.project;
                const desktopEnv=ide.desktopEnv;
                const runMenuOrd=desktopEnv.runMenuOrd;
                var diag=MainClassDialog.show(curPrj,{on:{done:function (n,dorun) {
                    var ii=runMenuOrd.indexOf(n);
                    if (ii>0) {
                        runMenuOrd.splice(ii, 1);
                        runMenuOrd.unshift(n);
                        ide.refreshRunMenu();
                        ide.saveDesktopEnv();
                    }
                    if (dorun) ide.run(n);
                }}});
                diag.$vars.mainClass.empty();
                runMenuOrd.forEach(function (m) {
                    diag.$vars.mainClass.append(UI("option",{value:m},m));
                });
            },
            exportHTML() {
                exportHTMLDialog.show({
                    excludes:{"js/concat.js":1,"js/concat.js.map":1},
                    includeJSScript:true
                });
            },
            search() {
                console.log("src diag");
                searchDialog.show(curPrjDir,function (info){
                    ide.fileList.select(info.file);
                    setTimeout(function () {
                        var prog=getCurrentEditor();
                        if (prog) prog.gotoLine(info.lineNo);
                    },50);
                });
            },
            mkrun() {
                const desktopEnv=ide.desktopEnv;
                var dest;
                if (WebSite.isNW) {
                    if (desktopEnv && desktopEnv.runtimeConfig) {
                        dest=desktopEnv.runtimeConfig.dest;
                    } else {
                        dest=FS.get(WebSite.cwd).rel("Runtimes/").rel( curPrjDir.name());
                    }
                    mkrunDiag.show(project,{
                        dest: dest,
                        onComplete: function (e) {
                            if (e.type==="dir" && desktopEnv) {
                                desktopEnv.runtimeConfig=e.config;
                                ide.saveDesktopEnv();
                            }
                        }
                    });
                } else {
                    mkrunDiag.show(project, {
                        hiddenFolder:true,
                        onEnd:function () {}
                    });
                }
            },
            helpDialog(){
                //if (!helpd) helpd=WikiDialog.create(home.rel("doc/tonyu2/"));
                if (!helpd) helpd=IFrameDialog.create(WebSite.top+"/doc/index.html");
                helpd.show();
            },
            startTutorial() {
                if (!helpd) helpd=IFrameDialog.create(WebSite.top+"/doc/tutorial.html");
                helpd.show();
            },
            editorEditor() {
                var prog=getCurrentEditor();
                const desktopEnv=ide.desktopEnv;
                var s=prompt(R("editorFontSize"), desktopEnv.editorFontSize||16);
                desktopEnv.editorFontSize=parseInt(s);
                if (prog) prog.setFontSize(desktopEnv.editorFontSize||16);
                ide.saveDesktopEnv();
            },
            openFolder() {
                var f=curPrjDir;
                var gui = root.require("nw.gui");//(global.nwDispatcher||global.nw).requireNwGui();
                gui.Shell.showItemInFolder(f.path().replace(/\//g,root.require("path").sep));
            }
        };
    };
});
