define(["fs/ROMk","fs/ROMd","fs/ROMs", "Shell","FS","Wiki","UI"],
        function (romk, romd, roms,     sh, FS, Wiki, UI) {
$(function () {
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNumberedName).forEach(function (name) {
            var f=curDir.rel(name);
            UI("li", {"class":"file"}, ["a", {href:"noviceProject.html?dir="+f.path()}, name]).appendTo("#prjItemList");
            //$("#fileItem").tmpl({name: name, href:"noviceProject.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    $("#newPrj").click(function (){
        var n=prompt("新しいプロジェクトの名前","");
        if (!n) return;
        n+="/";
        var prjDir=projects.rel(n);
        prjDir.mkdir();
        document.location.href="noviceProject.html?dir="+prjDir.path();
    });
    ls();
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/novice/"));
    w.show("index");
});
});