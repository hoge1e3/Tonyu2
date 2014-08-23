requirejs(["fs/ROMk","fs/ROMd","fs/ROMs", "FS","Wiki","Shell",
           "copySample","NewProjectDialog","UI","Sync","Auth"],
  function (romk, romd, roms,               FS, Wiki,   sh,
            copySample,  NPD,           UI, Sync, Auth) {
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
    if (WebSite.devMode) {
	Sync.sync(FS.get("/Tonyu/"),{v:1});
    }
    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    ls();
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    w.show("index");
    SplashScreen.hide();
});
});
