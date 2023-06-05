define(function(require,exports,module) {
const FS=require("FS");
const root=require("root");
const EC=require("exceptionCatcher");
const F=EC.f;
module.exports=function FileList(elem, options) {
    var _curDir=null;
    var _curFile=null;
    var _mod=false;
    var selbox=elem[0].tagName.toLowerCase()=="select";
    //console.log(elem);
    if (!options) options={};
    const ide=options.ide;
    const runDialogParam=options.runDialogParam;
    const desktopEnv=runDialogParam.desktopEnv;
    var FL={select:select, ls:ls, on:(options.on?options.on:{}), curFile:curFile, curDir: curDir,
    		setModified:setModified, isModified:isModified};
    var path=$("<div>");
    var items=$("<div>");
    if (!selbox) elem.append(path).append(items);
    else elem.change(function () {
        if(this.value) select(FS.get(this.value));
    });
    function item(f) {
    	var res=$();
    	if (!f) return res;
    	var fn=f.path();
    	items.find(selbox?"option":"span").each(function () {
    		var t=$(this);
    		if ( t.data("filename")==fn) {
    			res=t;
    		}
    	});
    	return res;
    }
    function select(f) {
        if (open(f)) return;
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
                let it=item(_curFile);
                if (it.length===0) {
                    ls();
                    it=item(_curFile);
                }
                it.addClass("selected");
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
    let curT;
    function ls(dir) {
        if (curT!=null) clearTimeout(curT);
        //console.log("LS!",dir.path());
        if (typeof dir=="string") dir=FS.get(dir);
        if (dir) {
            _curDir=dir;
            path.text(dir.name()).attr({title:dir.path()});
        }
        if (!_curDir) return;
        if (!_curDir.isDir()) return;
        items.empty();
        var wait=$("<div>").text("Wait..");
        items.append(wait);
        if (selbox) {
            elem.empty();
            elem.append($("<option>").text("Select..."));
        }
        var p=_curDir.up();
        if (p && !_curDir.equals(options.topDir)) {
            if (selbox) {
                elem.append($("<option>").
                        attr("value",p.path()).
                        text("[Up]")
                );
            } else {
                $(selbox?"<option>":"<li>").append(
                        $("<span>").addClass("fileItem").text("[Up]")
                ).appendTo(items).click(function () {
                    select(p);
                });
            }
        }
        if (_curFile && !_curFile.exists()) {
            _curFile=null;
        }
        var i=0;
        var dirs=_curDir.listFiles();
        if (dirs.length>0) curT=setTimeout(lp,0);
        else wait.remove();
        function lp() {
            curT=null;
            if (i==0) wait.remove();
            var f=dirs[i++];
            if (i<dirs.length) curT=setTimeout(lp,0);
            var n=displayName(f);
            if (!n) return;
            var isCur=_curFile && _curFile.path()==f.path();
            if (selbox) {
                elem.append($("<option>").
                        attr("value",f.path()).
                        text(itemText(f))
                );
            } else {
                var s=$("<span>").addClass("fileItem").text(itemText(f)).data("filename",f.path());
                if (isCur) { s.addClass("selected");}
                //console.log("Add file item ",f,selbox);
                $("<li>").append(s).appendTo(items).click(function () {
                    select(f);
                });
            }
        }
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
    let curDOM;
    function open(f) {
	// do not call directly !!  it doesnt change fl.curFile
        if (f.isDir()) {
            return;
        }
        $("#welcome").hide();
        ide.save();
        const editors=ide.editors;
        if (curDOM) curDOM.hide();
        var inf=editors[f.path()];
        if (!inf) {
            let h=ide.layouts.editor.height;
            var progDOM=$("<pre>").css("margin","0px").css("height", h+"px").text(f.text()).appendTo("#progs");
            var prog=root.ace.edit(progDOM[0]);
            window.lastEditor=prog;
            if (typeof desktopEnv.editorFontSize=="number") prog.setFontSize(desktopEnv.editorFontSize);
            else prog.setFontSize(16);
            prog.setTheme("ace/theme/eclipse");
            prog.getSession().setMode("ace/mode/tonyu");
            inf=editors[f.path()]={file:f , editor: prog, dom:progDOM};
            progDOM.click(F(function () {
                ide.displayMode("edit");
            }));
            prog.setReadOnly(false);
            prog.clearSelection();
            prog.focus();
            try {
                prog.commands.removeCommand("toggleFoldWidget");
                prog.setOptions({fixedWidthGutter:true});
            }catch(e){}// F2

            curDOM=progDOM;
        } else {
            if (inf.lastTimeStamp<inf.file.lastUpdate()) {
                inf.editor.setValue(inf.file.text());
                inf.editor.clearSelection();
                inf.lastTimeStamp=inf.file.lastUpdate();
            }
            inf.dom.show();
            inf.editor.focus();
            curDOM=inf.dom;
        }
        tabs.select(f);
        window.curEditor=inf.editor;
        inf.lastTimeStamp=inf.file.lastUpdate();
    }
    const tabs={
        list: {},// {path: {last: dom:} }
        get(f) {
            const list=this.list;
            if (!list[f.path()]) {
                list[f.path()]={
                    dom:$("<span>").addClass("tab").text(f.truncExt()).click(
                        ()=>select(f)
                    ).appendTo("#fileTabs")
                };
                $("#dummytab").hide();
            }
            list[f.path()].last=new Date().getTime();
            if (Object.keys(list).length>10) this.closeLRU();
            return list[f.path()];
        },
        select(f) {
            if (this.cur) this.cur.dom.removeClass("selected");
            const t=this.get(f);
            this.cur=t;
            t.dom.addClass("selected");
        },
        closeLRU() {
            const list=this.list;
            let min=new Date().getTime();
            let cand;
            for (let u of Object.keys(list)) {
                let v=list[u];
                if (v.last<min) {min=v.last; cand=u;}
            }
            if (cand) this.close(cand);
        },
        close(f) {
            if (typeof f.path==="function") f=f.path();
            const list=this.list;
            if (list[f]) {
                list[f].dom.remove();
                delete list[f];
            }
        },
        cur: null,
    };
    FL.tabs=tabs;

    return FL;
};
});
