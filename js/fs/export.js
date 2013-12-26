$(function () {
    sh.cd("/Tonyu/Projects/");
    $("#export").click(function () {
        var t=FS.exportDir( $("#base").val() );
        $("#text").val(JSON.stringify(t));
    });
    $("#exportSrv").click(function () {
        $.ajax({
            type:"POST",
            url:"LS2File",
            data:{json: $("#text").val()},
            success: function () {
                alert("OK");
            }
        });
    });
});