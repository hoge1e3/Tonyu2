function FileList(elem, options) {
    var _curDir;
    var _curFile;
    if (!options) options={};
    var FL={open:open, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir};
    var path=$("<div>");
    var items=$("<div>");
    elem.append(path).append(items);
    function select(f) {
        if (FL.on.select && FL.on.select(f)) return;
        if (f.isDir()) {
            ls(f);
        } else {
            _curFile=f;
        }
    }
    function ls(dir) {
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.path());
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            $("<li>").append(
                    $("<span>").addClass("fileItem").text("..")
            ).appendTo(items).click(function () {
                select(p);
            });
        }

        _curDir.each(function (f) {
            var n=displayName(f);
            if (!n) return;
            $("<li>").append(
                $("<span>").addClass("fileItem").text( (f.isReadOnly()?"[RO]":"")+n)
            ).appendTo(items).click(function () {
                select(f);
            });
        });
    }
    function displayName(f) {
        if (FL.on.displayName) return FL.on.displayName.apply(FL, arguments );
        return f.name();
    }
    function curFile() {
        return _curFile;
    }
    function curDir() {
        return _curDir;
    }
    return FL;
}