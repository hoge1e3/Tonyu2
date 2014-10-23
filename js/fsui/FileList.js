function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    var _mod=false;
    if (!options) options={};
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir,
    		setModified:setModified, isModified:isModified};
    var path=$("<div>");
    var items=$("<div>");
    function item(f) {
    	var res=$();
    	if (!f) return res;
    	var fn=f.path();
    	items.find("span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==fn) {
    			res=t;
    		}
    	});
    	return res;
    }
    elem.append(path).append(items);
    function select(f) {
        if (FL.on.select && FL.on.select(f)) return;
        if (!f) return;
        _mod=false;
        if (f.isDir()) {
            //_curFile=null;
            ls(f);
        } else {
            var nDir=f.up();
            if (_curDir.path()!=nDir.path() ) {
                _curFile=f;
                ls(nDir);
            } else {
                item(_curFile).removeClass("selected");
                _curFile=f;
                item(_curFile).addClass("selected");
            }
        }
    }
    function setModified(m) {
    	if (!_curFile) return;
    	_mod=m;
       	item(_curFile).text(itemText(_curFile,m));
    }
    function isModified() {
    	return _mod;
    }
    function ls(dir) {
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.name()).attr({title:dir.path()});
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            $("<li>").append(
                    $("<span>").addClass("fileItem").text("[Up]")
            ).appendTo(items).click(function () {
                select(p);
            });
        }
        if (_curFile && !_curFile.exists()) {
            _curFile=null;
        }
        _curDir.each(function (f) {
            var n=displayName(f);
            if (!n) return;
            var isCur=_curFile && _curFile.path()==f.path();
            var s=$("<span>").addClass("fileItem").text(itemText(f)).data("filename",f.path());
            if (isCur) { s.addClass("selected");}
            $("<li>").append(s).appendTo(items).click(function () {
                select(f);
            });
        });
    }
    function itemText(f, mod) {
    	return (mod?"*":"")+(f.isReadOnly()?"[RO]":"")+displayName(f);
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