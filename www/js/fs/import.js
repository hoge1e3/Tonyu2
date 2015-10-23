$(function () {
    $("#import").click(function () {
        var exported=JSON.parse($("#text").val());
        exported.confirm=true;
        exported.base=$("#base").val();
        var files=FS.importDir(exported);
        var ul=$("<ul>");
        var wipec;
        var go=$("<button>").addClass("btn").addClass("btn-danger").text("OK").click(function () {
            exported.confirm=false;
            if (wipec.prop('checked')) {
                wipe(FS.get(exported.base));
            }
            FS.importDir(exported);
            $(this).text("Completed");
        });
        var wipet=$("<span>").append(  wipec=$("<input>").attr("type","checkbox") ) .append(
                $("<span>").text("Wipe existent data")
        );

        $("#confirm").empty().append(go).append(wipet).append(ul);
        files.forEach(function (f) {
            $("<li>").text(f).appendTo(ul);
        });
    });
    $("#importSrv").click(function () {
        $.ajax({
            type:"GET",
            url:"../../File2LS",
            data:{base: $("#base").val()},
            success: function (r) {
                $("#text").val(r);
                var exported=JSON.parse(r);
                $("#base").val(exported.base);
            }
        });
    });
    function wipe(dir) {
        dir.each(function (f) {
            if (!f.exists()) {
                f.text("");
            }
            if (f.isDir()) {
                wipe(f);
            } else {
                f.rm();
            }
        });
        dir.rm();
    }
});