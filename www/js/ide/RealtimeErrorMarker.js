define(function (require,exports, module) {
    const EditorPopupMarker=require("EditorPopupMarker");
    const root= require("root");
    const Range = root.ace.require('ace/range').Range;
    module.exports=ide=>{
        setTimeout(check,1000);
        async function check() {
            const inf=ide.getCurrentEditorInfo();
            if (inf) {
                const curVal=inf.editor.getValue();
                if (inf.lastParsed!==curVal) {
                    if (inf.markers) {
                        for (let marker of inf.markers) marker.remove();
                    }
                    inf.markers=[];
                    //console.log("Parse");
                    try {
                        await ide.project.compiler.parse(inf.file, curVal);
                    }catch (e) {
                        if (typeof e.row==="number" && typeof e.col==="number") {
                            const range=new Range(e.row-1,e.col-1,e.row-1,e.col-0);
                            const marker=EditorPopupMarker.mark(inf.editor, range,"errorMarker",e.message);
                            inf.markers.push(marker);
                        }
                        //console.log("Mark!ERROR!",e);
                    }
                    //console.log("Parse Done");
                    inf.lastParsed=curVal;
                }
            }
            setTimeout(check,200);
        }
    };
});