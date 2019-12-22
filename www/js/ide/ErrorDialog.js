define(function (require, exports, module) {
const R=require("R");
const FS=require("FS");
const UI=require("UI");
class ErrorDialog {
    constructor(ide) {//{restart,stop,displayMode,jump}
        this.ide=ide;
        this.pluginAdded={};
    }
    showErrorPos(elem, err) {
        function close(){
            if ($.data(elem,"opened")) {
                elem.dialog("close");
                $.data(elem,"opened",false);
            }
        }
        function jump() {
            ide.jump(src,row,col);
            close();
        }
        const ide=this.ide;
        //options=options||{};
        let message=err.message, src, pos, row, col;
        if (!err) {
            close();
            return;
        }
        if (err.isTError) {
            src=err.src;
            pos=err.pos;
            row=err.row;
            col=err.col;
        } else {
            src={name:function (){return R("unknown");},text:()=>null};
            pos=0;
        }
        if (err.stack && err.stack.length>0 && err.stack[0].fileName) {
            const compiler=ide.project.compiler;
            for (let {columnNumber, lineNumber, fileName} of err.stack) {
                console.log(columnNumber, lineNumber, fileName);
                if (!fileName) continue;
                if (typeof columnNumber!=="number") continue;
                if (typeof lineNumber!=="number") continue;
                fileName=compiler.convertFromWorkerPath(fileName);
                if (fileName.match(/^http/)) continue; // for concat.js
                try {
                    src=FS.get(fileName);
                    pos={row:lineNumber, col:columnNumber};
                    if (src.exists()) break;
                }catch(e){
                    //console.log("ErrorDialog","stack",e);
                }
            }
        }
        if(typeof pos=="object") {row=pos.row; col=pos.col;}
        elem.empty();
        const mesgd=$("<div>").text(message+" 場所："+src.name()+(typeof row=="number"?":"+row+":"+col:""));
        if(typeof row==="number" && typeof col==="number") {
            mesgd.append($("<button>").text(R("jumpToErrorPosition")).click(jump));
        }
        //mesgd.append($("<button>").text("閉じる").click(close));
        elem.append(mesgd);
        elem.append($("<div>").attr("class","quickFix"));
        //console.log("src=",src,err.stack, err.stack instanceof Array);
        console.log("src.name",src.name());
        const str=src.text();
        if (str && typeof pos=="object") {
            let npos=0;
            const lines=str.split("\n");
            for (let i=0 ; i<lines.length && i+1<pos.row ; i++) {
                npos+=lines[i].length+1;
            }
            npos+=pos.col;
            pos=npos;
        }
        if (str) {
            const srcd=$("<pre>");
            srcd.append($("<span>").text(str.substring(0,pos)));
            srcd.append($("<img>").attr("src",FS.expandPath("${sampleImg}/ecl.png")));//MODJSL
            srcd.append($("<span>").text(str.substring(pos)));
            elem.append(srcd);
        }
        elem.attr("title",R("error"));
        elem.dialog({width:600,height:400});
        $.data(elem,"opened",true);
        return elem;
    }
    show(e) {
        function showTrace() {
            const st=(typeof e.stack==="string" ? e.stack :
            typeof e.stack.join==="function" ? e.stack.join("\n") : e+"");
            const trcpre=UI("pre",st);
            const html=trcpre.html().replace(/_trc_([\w]*)/g,function (n) {
                return "<strong>"+n+"</strong>";
            });
            trcpre.html(html);
            $("#errorPos").find(".quickFix").append(trcpre);
        }
        window.shownError=e;
        console.log("ErrorDialog","show",e);
        console.error(e);
        const ide=this.ide;
        const pluginAdded=this.pluginAdded;
        const pluginName=e.pluginName || (e.error && e.error.pluginName);
        if (pluginName && !pluginAdded[pluginName]) {
            pluginAdded[pluginName]=true;
            ide.restart();
            return;
        }
        if (pluginName) {
            alert(e.message);
        } else {
            const diag=this.showErrorPos($("#errorPos"),e);
            ide.displayMode("runtime_error");
            $("#errorPos").find(".quickFix").append(
                UI("button",{on:{click:showTrace}},R("showTrace")));
        }
        ide.stop();
    }
}
module.exports=ErrorDialog;

});//--- end of define
