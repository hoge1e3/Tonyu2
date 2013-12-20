$(function () {
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls().forEach(function (name) {
            var f=curDir.rel(name);
            $("#fileItem").tmpl({name: name, href:"noviceProject.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    $("#newPrj").click(function (){
        var n=prompt("新しいプロジェクトの名前","");
        if (!n) return;
        n+="/";
        var prjDir=projects.rel(n);
        prjDir.mkdir();
        document.location.href="project.html?dir="+prjDir.path();
    });
    ls();
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    w.show("index");
});