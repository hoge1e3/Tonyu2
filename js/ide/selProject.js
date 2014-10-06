requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki","Shell","Shell2",
           "copySample","NewProjectDialog","UI","Sync","Auth","zip","requestFragment"],
  function (romk, romd, roms,               FS, Wiki,   sh,sh2,
            copySample,  NPD,           UI, Sync, Auth,zip,requestFragment) {
$(function () {
    copySample();
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNumberedName).forEach(function (name) {
            var f=curDir.rel(name);
            UI("li", {"class":"file"}, ["a", {href:"project.html?dir="+f.path()}, name]).appendTo("#prjItemList");
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
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    var syncDoc=false;
    if (WebSite.devMode) {
        Sync.sync(FS.get("/Tonyu/"),{v:1});
    } else if (WebSite.disableROM["ROM_d.js"]) {
        syncDoc=true;
        Sync.sync(FS.get("/Tonyu/doc/"),{v:1, onend:function () {
            if (FS.get("/Tonyu/doc/index.txt").exists()) {
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
    /*requestFragment.ajax({
        url:"../../edit/testSync",
        data:{pathInfo:"/testSync",a:"testuto",b:"desukane"},
        success: function (res) { console.log("succ",res); },
        error: function (res) { console.log("err",res); }
        });*/
    ls();
    SplashScreen.hide();
});
});
