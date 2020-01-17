/*global requirejs*/
requirejs(["FS","Wiki","Shell","Shell2",
           /*"copySample",*/"NewProjectDialog","UI","Sync","Auth",
           "zip","requestFragment","WebSite","extLink","DeferredUtil",
       "ZipImporter","ProjectItem","ImportHTMLDialog","Util","root","R"],
  function (FS, Wiki,   sh,sh2,
            /*copySample,  */NPD,           UI, Sync, Auth,
            zip,requestFragment,WebSite,extLink,DU,
        ZipImporter,ProjectItem,ImportHTMLDialog,Util,root,R) {
$(function () {
    var HNOP="javascript_:;".replace(/_/,"");
    //copySample();
    //var home=FS.get(WebSite.tonyuHome);
    //var projects=FS.get(WebSite.projects[0]);//home.rel("Projects/");
    if (!FS.NativeFS.available) {
        var capacity=FS.LSFS.getCapacity();
        $("#ls").text(R("storageUsage",Math.floor(capacity.max/1024), Math.floor(capacity.using/1024)));
    }

    $.get("https://edit.tonyu.jp/doc/welcome_sel.html").then(function (t) {
        $("#welcome").append(t);
    });
    $("#prjItemList").empty();
    var search, prevKW="",kw="";
    $("#prjItemList").append(search=UI("div",
            ["input",{$var:"kw",placeholder:"Search..",value:kw}]));
    setInterval(function () {
        kw=search.$vars.kw.val().toLowerCase();
        if (kw!=prevKW) {
            $(".project").each(function () {
                var p=$(this);
                var nd=p.find(".projectName");
                if (kw=="" || nd[0] && nd.text().toLowerCase().indexOf(kw)>=0 ) {
                    p.show();
                } else{
                    p.hide();
                }
            });
            prevKW=kw;
        }
    },1000);
    var prjDirs=WebSite.projects.map(function (e) {return FS.get(e);});
    prjDirs.forEach(ls);
    if (WebSite.isNW) {
        $("#loginGrp").hide();
    }
    function ls(curDir,i) {
        if (!curDir.exists()) {
            if (i==0) {
                curDir.mkdir();
                //console.log(curDir.path(), curDir.exists());
            } else return;
        }
        var prj1dirList=$("<section>");
        $("#prjItemList").append(prj1dirList);
        prj1dirList.append(UI("h2",{"class":"prjDirHeader"},curDir.path()));
        var u=UI("div", {"class":"project newprj"},
            ["a", {href:HNOP, on:{click:newDiag}},
            ["img",{$var:"t",src:WebSite.top+"/images/tonew.png"}],
            ["div", R("newProject")]
        ]);
        u.appendTo(prj1dirList);
        function newDiag() {
            NPD.show(curDir, function (prjDir) {
                prjDir.mkdir();
                // temporaly
                if (WebSite.version==2) {
                    location.href="project2.html?dir="+prjDir.path();
                } else {
                    location.href="project.html?dir="+prjDir.path();
                }
            });
        }
        var showAll;
        showAll=UI("div",{"style":"display: inline-block;"},
                //["div",{style:"height:120px;"}," "],
                ["button",{"class":"showAll",on:{
            click:function () {
                showAll.remove();
                dols(curDir,prj1dirList);
            }
        }},R("showAllProjects")]);
        prj1dirList.append(showAll);
        //$("#prjItemList").append(UI("div",["h2",{"class":"prjDirHeader"},"----"]));
    }
    var zipchecked;
    function dols(curDir,prj1dirList) {
        var zi=new ZipImporter(curDir,prj1dirList,{
            onComplete: refresh
        });
        if (!zipchecked) {
            zipchecked=true;
            zi.checkFromPrjB();
        }
        function refresh(e) {
            if (e.from==="prjB") {
                location.href=location.href.replace(/\?.*/,"");
            } else {
                prj1dirList.find(".existentproject").remove();
                dols2(curDir,prj1dirList);
            }
        }
        return dols2(curDir,prj1dirList);
    }
    function dols2(curDir,prj1dirList) {
        var d=[];
        curDir.each(function (f) {
            if (!f.isDir()) return;
            var l=f.lastUpdate();
            /*var r=f.rel("options.json");
            if (r.exists()) {
                l=r.lastUpdate();
            }*/
            d.push([f,l]);
        });
        d=d.sort(function (a,b) {
            return b[1]-a[1];
        });
        return DU.each(d,function (e) {
            var f=e[0];
            if (!f.isDir()) return;
            var it=new ProjectItem(f,prj1dirList);
            if (kw!="" && it.name.toLowerCase().indexOf(kw)<0) it.hide();
            return DU.timeout(10);
        });
    }
    var importHTMLDialog=new ImportHTMLDialog({
        onComplete: function ({dir}){
            //prjDirs.forEach(ls);
            if (dir) {
                location.href="project2.html?dir="+dir.path()+"&autoRun=1";
            } else {
                location.reload();
            }
        },
        prjDirs:prjDirs
    });
    window.importFromHTML=function () {
        importHTMLDialog.show();
    };
    if (Util.getQueryString("importFromHTML")) {
        importHTMLDialog.show();
    }
    window.addEventListener("message",function (e) {
        console.log(e);
        switch(e.data.type) {
        case "ping":
            e.source.postMessage({type:"pong"},e.origin);
            break;
        case "import":
            importHTMLDialog.show(e.data);
            break;
        }
    });
    sh.cd(FS.get(WebSite.projects[0]));
    extLink.all();
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
    $($("button.showAll").get(0)).click();
    root.SplashScreen.hide();
});
});
