$(function () {
    $("#export").click(function () {
        var t=FS.exportDir( $("#base").val() );
        $("#text").val(JSON.stringify(t));
    });
    $("#import").click(function () {
        var exported=JSON.parse($("#text").val());
        exported.confirm=true;
        var files=FS.importDir(exported);
        var ul=$("<ul>");
        var go=$("<button>").addClass("btn").addClass("btn-danger").text("OK").click(function () {
            exported.confirm=false;
            FS.importDir(exported);
            $(this).text("Completed");
        });
        $("#confirm").empty().append(go).append(ul);
        files.forEach(function (f) {
            $("<li>").text(f).appendTo(ul);
        });
    });
});