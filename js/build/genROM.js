define([], function () {
    function genROM(dir, file) {
        var tmpl=[
        "if (!localStorage.norom) {",
        "    FS.mountROM(",
             JSON.stringify(FS.exportDir(dir),null, "  "),
        "    );",
        "}"].join("\n");
        file.text(tmpl);
    }
    return genROM;
});
