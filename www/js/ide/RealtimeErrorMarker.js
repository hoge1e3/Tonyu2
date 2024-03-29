define(function (require,exports, module) {
    const EditorPopupMarker=require("EditorPopupMarker");
    const root= require("root");
    const Range = root.ace.require('ace/range').Range;
    module.exports=ide=>{
        const interval=200;
        setTimeout(checkLoop,interval);
        let charge=0;
        let prevInf;
        async function checkLoop() {
            const inf=ide.getCurrentEditorInfo();
            if (inf) {
                const curVal=inf.editor.getValue();
                if (inf.lastParsed===curVal) {
                    charge=0;
                } else if (inf.lastVal!==curVal) {
                    inf.lastVal=curVal;
                    charge=0;
                } else {
                    charge+=interval;
                }
                if (charge>500 || prevInf!==inf) {
                    charge=0;
                    check(inf);
                }
            }
            prevInf=inf;
            setTimeout(checkLoop,interval);
        }
        async function check(inf) {
            const curVal=inf.editor.getValue();
            //console.log("Parse");
            const c=ide.project.compiler;
            try {
                await c.parse(inf.file, curVal);
                console.log("rs",ide.project.readyState);
                if (ide.project.isReady()) {
                    const cres=await ide.project.partialCompile(inf.file, {content:curVal});
                    console.log(cres);
                }
                clearMark(inf);
            }catch (e) {
                if (typeof e.src==="string") {
                    c.convertError(e);
                }
                mark(inf, e);
            }
            console.log("Parse Done");
            inf.lastParsed=curVal;
        }
        function clearMark(inf) {
            if (inf.markers) {
                for (let marker of inf.markers) marker.remove();
            }
            inf.markers=[];
        }
        function mark(inf, e) {
            clearMark(inf);
            console.log("Mark!ERROR!",e, inf.markers.length);
            if (typeof e.row==="number" && typeof e.col==="number" &&
            inf.file && e.src && inf.file.path()===e.src.path()) {
                if (e.col==0) e.col=1;
                const len=e.len||1;
                const range=new Range(e.row-1,e.col-1,e.row-1,e.col-1+len);
                const marker=EditorPopupMarker.mark(inf.editor, range,"errorMarker",e.message);
                inf.markers.push(marker);
            }
        }
        return {
            check, clearMark, mark
        };
    };
});
