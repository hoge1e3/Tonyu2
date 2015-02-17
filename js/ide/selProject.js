requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki","Shell","Shell2",
           "copySample","NewProjectDialog","UI","Sync","Auth","zip","requestFragment","WebSite"],
  function (romk, romd, roms,               FS, Wiki,   sh,sh2,
            copySample,  NPD,           UI, Sync, Auth,zip,requestFragment,WebSite) {
$(function () {
    copySample();
    var home=FS.get(WebSite.tonyuHome);
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNewest).forEach(function (name) {
            var f=curDir.rel(name);
            if (!f.isDir()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"project.html?dir="+f.path()},
                     ["img",{$var:"t",src:"../../images/nowprint.png"}],
                     ["div", name]
                     ]);
            u.appendTo("#prjItemList");
            setTimeout(function () {
                var tn=f.rel("images/").rel("icon_thumbnail.png");
                //console.log(tn.path());
                if (tn.exists()) {
                    u.$vars.t.attr("src",tn.text());
                }
            },10);
            //$("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    Auth.currentUser(function (r){
        if (r) {
            $(".while-logged-out").hide();
            $("#login").text(r);
        } else {
            $(".while-logged-in").hide();
        }
    });
    var w=Wiki($("#wikiViewArea"), home.rel("doc/"));
    var syncDoc=false;
    if (WebSite.devMode) {
        Sync.sync(home,{v:1});
    } else if (WebSite.disableROM["ROM_d.js"]) {
        syncDoc=true;
        Sync.sync(home.rel("doc/"),{v:1, excludes:[home.rel("doc/html/").path()],
            onend:function () {
            if (home.rel("doc/index.txt").exists()) {
                w.show("index");
            }
        }});
    }
    if (!syncDoc) w.show("index");


    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    ls();
    SplashScreen.hide();
});
});
