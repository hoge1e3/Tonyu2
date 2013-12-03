function FileList(elem) {
    var curDir;
    var on={};
    var path=$("<div>");
    var items=$("<div>");
    elem.append(path).append(items);
    function open(f) {
        if (typeof f=="string") f=FS.get(f);
        if (on.open && on.open(f)) return;
        if (f.isDir()) {
            curDir=f;
            path.text(f.path());
            ls();
        }
    }
    function ls() {
        items.empty();
        if (!curDir) return;
        if (curDir.up()) {
            $("<li>").append(
                    $("<span>").addClass("fileItem").text("..")
                ).appendTo(items).click(function () {
                    open(curDir.up());
                });
        }

        curDir.each(function (f) {
            $("<li>").append(
                $("<span>").addClass("fileItem").text( (f.isReadOnly()?"[RO]":"")+displayName(f))
            ).appendTo(items).click(function () {
                open(f);
            });
        });
    }
    function displayName(f) {
        if (on.displayName) return on.displayName.apply(on, arguments );
        return f.name();
    }
    return {open:open, ls:ls, on:on};
}