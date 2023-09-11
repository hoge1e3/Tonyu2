function byts(a,b){
    return b.lastUpdate()-a.lastUpdate();
}
function createFind(dir){
    function top(){
        let s=editor.session.getSelection();
        s.moveCursorFileStart();
        s.clearSelection();
    }
    function bot(){
        let s=editor.session.getSelection();
        s.moveCursorFileEnd();
        s.clearSelection();
    }
    function onActivated(editor){
        bot();
    }
    function run(word,editor){
        editor.setValue("find: "+word+"\n");
        bot();
        for(let f of dir.listFiles().
        sort(byts)){
            let ln=1;
            //editor.onTextInput("{");
            for(let line of f.lines()){
                if(line.indexOf(word)>=0){
                    editor.onTextInput(
                        `${f.name()}(${ln}): ${line}\n`
                        );
                }
                ln++;
            }
            //editor.onTextInput("}");
        }
        top();
    }
    return createSession({
        type:"find",
        text:"find: ",
        name:"*find*",
        onActivated,
        onEnter(e){
            let line=
            e.line.replace(
                /^find: *(.*)/,
                (_,n)=>{
//            alert(n);
                    run(n,editor);
                });
        }
    });
}


function setLongtap(b,handlers){

    let artimer;
    let dolong=handlers.longtap||
    handlers.autorepeat;
    const clearAR=()=>{
        clearTimeout(artimer);
        clearInterval(artimer);
    };
    

    for(let k of [
        "start","end",
        "longtap"]){
        handlers[k]=handlers[k]||
        function (){};
    }
    if(handlers.autorepeat&&
    typeof handlers.autorepeat!="function"){
        handlers.autorepeat=handlers.start;
    }

    const start=(e)=>{
        handlers.start(e);
        e.preventDefault();
        clearAR();
        if(dolong){
        artimer=setTimeout(long,300);
        }
    };
    const long=(e)=>{
        handlers.longtap(e);
        clearAR();
        if(handlers.autorepeat)
        artimer=setInterval(()=>{
            handlers.autorepeat({
                currentTarget:b
            });
        },30);
    };
    const end=()=>{
        clearAR();
        handlers.end({
            currentTarget:b
        });
    };
    b.addEventListener("mousedown", start);
    b.addEventListener("touchstart", start);
    b.addEventListener("mouseup", end);
    b.addEventListener("mouseleave", end);
    b.addEventListener("touchend", end);

}

//keypad
function initKeypad(acepad){
    let editor=acepad.editor;
    $(".justify").each(function (){
        justify(this);
    });
    const k=document.getElementById('keypad');
    trimTextNode(k);
    for(let e of $(".chr")){
        let syms=e.innerText;
        if (syms[0].toLowerCase()!==syms[0].toUpperCase()) {
            syms=syms[0].toLowerCase()+syms[0].toUpperCase()+syms.substring(1);
            $(e).empty().append(
                $("<span>").addClass("mask").addClass("no-shift").text(syms[0])
            ).append(
                $("<span>").addClass("mask").addClass("shift").text(syms[1])
            );
            if (syms[2]) {
                $(e).find(".mask").addClass("no-sym");
                $(e).append(
                   $("<span>").addClass("mask").addClass("sym").text(syms[2])
                );
            }
        } else if (syms.length==2){
            $(e).empty().append(
                $("<span>").addClass("mask").addClass("no-sym").text(syms[0])
            ).append(
                $("<span>").addClass("mask").addClass("sym").text(syms[1])
            );
        }
    }   
    for(let b of document.querySelectorAll("#keypad button")) {
        setLongtap(b,{
            start(){
                doClickRender(b);
            },
            autorepeat:b.classList.contains("autorepeat")
        });
    }
}

function justify(row){
    let r=[...row.childNodes].filter(
        (node)=>
        node.nodeType === Node.ELEMENT_NODE
    );
    let len=r.length;
    //alert(len);
    let p=Math.floor(1000/len)/10;
    //alert(p);
    for(let e of r){
        $(e).css({width:p+"%"})
    }
}
function trimTextNode(container) {
    const nodes = [...container.childNodes];
    //console.log(container, nodes);
    for (const node of nodes) {
        //console.log("node",node);
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
            container.removeChild(node);
        } else trimTextNode(node);
    }
}
function isHidden(el) {
    return (el.offsetParent === null);
}
function ssToInt(e){
    return 0 | 
    (e.ctrl ? 1 : 0) | 
    (e.alt ? 2 : 0) | 
    (e.shift ? 4 : 0) | 
    (e.meta ? 8 : 0);
}
function clearUnlockedShifts(){
    for(let k in shiftState){
        if(shiftLock[k])continue;
        shiftState[k]=0;
    }
}
function renderShiftState() {
    for(let m of ["shift","ctrl","edit","sym"]){
        if(shiftState[m]){
            $("#keypad").addClass(m);
        }else{
            $("#keypad").removeClass(m);
        }
    }
}
function doClickRender(b) {
    doClick(b);
    renderShiftState();
}
function toggleSym(){
    shiftState.sym=!shiftState.sym;
    if (shiftState.sym) {
        shiftLock.sym=1;
        $("#keypad").addClass("sym");
    } else{
        $("#keypad").removeClass("sym");
    }
}




async function readClipboard() {
    try {
        return await navigator.clipboard.readText();
    }catch (e) {
        try{
            return await parent.navigator.clipboard.readText();
        }catch(e){
            alert(e);
        }
    }
}
async function writeClipboard(t) {
    try {
        await navigator.clipboard.writeText(t);
    } catch (e) {
        try{
            await parent.navigator.clipboard.writeText(t);
        }catch(e){
            alert(e);
        }
    }
}



function exec(c){
    let editor=this.editor;
    if(!c.replace(/^custom:(.*)/,
        (_,c)=>{
        this.customCommands[c](editor);    
    }))return ;
    switch(c){
        case "cut":
        case "copy":
        case "paste":
            return this[c]();
        default:
        let t=editor.execCommand(c);
        return t;
    }
}

async function cut(){
    let editor=this.editor;
    try{
        let t= editor.getSelectedText();
        await writeClipboard(t);
        editor.session.remove(
        editor.getSelectionRange());
    }catch(e){
        alert(e);
    }
}
async function copy(){
    let editor=this.editor;
    try{
        let t= editor.getSelectedText();
        await writeClipboard(t);
        editor.getSelection().clearSelection();
    }catch(e){
        alert(e);
    }
}
async function paste(){
    let editor=this.editor;
    try{
        let t=await readClipboard();
        editor.insert(t);
    }catch(e){
        alert(e);
    }
}

function openFile(fn){
    let f=file.file(fn);
    let s=ace.createEditSession(f.text());
    editor.setSession(s);
    if(f.ext()==".html"){
    s.setMode("ace/mode/html");
    }else{
    s.setMode("ace/mode/javascript");
    
    }
    sessions[fn]=s;
    sessionInfo(s,{
        file:f,
        type:"file",
        ts:f.lastUpdate(),
        val:s.getValue(),
    });
}

function changeSession(sn){
    let s=sessions[sn];
    if(!s)return alert(sn);
    editor.setSession(s);
    editor.focus();
    let si=sessionInfo(s);
    if(si.onActivated){
        si.onActivated(editor);
    }
}
function autoSync(){
    let session=editor.session;
    let si=sessionInfo(session);
    let f=si.file;
    if(!f)return;
    if(f.lastUpdate()>si.ts){
        session.setValue(
            f.text());
        si.ts=f.lastUpdate();
    }else if(si.val!=
        session.getValue()){
        f.text(session.getValue());
        si.val=session.getValue();
        si.ts=f.lastUpdate();
    }
}
function createDirList(dir){
    function onActivated(editor){
        editor.session.setValue(
        dir.listFiles().
        sort((a,b)=>
            b.lastUpdate()-
            a.lastUpdate()
        ).map((p)=>p.name())
        .join("\n")+"\nnew: ");
    }
    createSession({
        session:editor.session,
        type:"files",
        name:dir.name(),
        onActivated,
        onEnter(e){
            let line=
            e.line.replace(
                /^new: *(.*)/,
                (_,n)=>{
                    let f=dir.rel(n);
                    if(!f.exists())f.text("");
                    return n;
                });
            openFile(line);
        }
    });
    onActivated(editor);
}
function createSessionList(){
    createSession({
        type:"sessions",
        onActivated(editor){
            editor.session.setValue(
            Object.keys(sessions).map(
            (k)=>k    
            ).join("\n"));
        },
        onEnter(e){
            changeSession(e.line);
        }
    });
}
function createSession(data){
    data.session=data.session||
    ace.createEditSession(data.text||"");
    data.name=data.name||
    data.file&&data.file.name()||
    data.type&&`*${data.type}*`;
    data.type=data.type||"file";
    sessionInfo(data.session,data);
    return sessions[data.name]=data.session;
}
let symsi=Symbol();
function sessionInfo(s,data){
    if(data){
        return Object.assign(
            sessionInfo(s),data);
    }
    let r=s[symsi];
    if(r)return r;
    r=s[symsi]={};
    return r;
}


function isMobile(){
    return (
(a)=>(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.
test(a.substr(0,4)))
)(navigator.userAgent||navigator.vendor||window.opera);
}
//http://detectmobilebrowser.com/mobile

var acepad=window;
var editor;
var customCommands={
    foldall(){
        foldall();
    },
    fullscr(){
        toggleFullScreen();
    },
    sessions(){
        changeSession("*sessions*");
    },
    reload(){
        location.reload();
    },
    find(){
        createFind(file.file(""));
        changeSession("*find*");
    },
};
var followIdent={function:1,let:1,const:1,var:1,return:1,throw:1,new:1};
var shiftState={},shiftLock={
    sym:1
};
//initEditor(acepad);
initKeypad(acepad);
function doClick(b) {
    let dat=(n)=>b.
    getAttribute("data-"+n)
    let cmd=dat("command");
    let keyCode=dat("keycode")-0;
    let text=dat("text");
    let mod=dat("modifier");
    let ctrle=dat("ctrl");
    let cmdonsel=dat("edit");
    let selm=selMode();
    shiftState.edit=!!(selm);
    if (!cmd && !text && !mod && !keyCode) text=b.innerText;
    if (shiftState.ctrl && ctrle) {
        exec(ctrle);
        clearUnlockedShifts();
        return;
    }
    if (cmd) {
        exec(cmd);
        clearUnlockedShifts();
        return;
    }
    
    if (mod) {
        let lock=dat("lock")||"double";
        if(!shiftState[mod]){
            shiftState[mod]=1;
            if(lock=="single"){
                shiftLock[mod]=1;
            }
        }else if(lock!="none"&&
        !shiftLock[mod]){
            shiftLock[mod]=1;
        }else{
            shiftState[mod]=
            shiftLock[mod]=0;
        }
        return;
    }
    const comp=editor.completer && editor.completer.activated && editor.completer; 
    let session=editor.session;
    let si=sessionInfo(session);
    if (keyCode===13) {
        //alert(curbufn);
        if(si.onEnter){
            let r=editor.session.
            getSelection().
            getRange().start.row;
            let line=
            editor.session.doc.
            getLine(r);
            si.onEnter({line,editor});
            //alert(line);
            return;
        }
        if (comp) editor.onCommandKey(
            {},
            ssToInt(shiftState),
            keyCode);
        else editor.onTextInput("\n");
    } else if (keyCode===9) {
        if (comp||selMode()) editor.onCommandKey(
            {},
            ssToInt(shiftState),
            keyCode);
        else editor.onTextInput("\t");
    } else {
        if (text && !shiftState.ctrl) {
            editor.onTextInput(text);
        } else {
            if (!keyCode) keyCode=text.toUpperCase().charCodeAt(0); 
            editor.onCommandKey({},ssToInt(shiftState), keyCode);
        }
    }
    if (editor.completer) insertMatchHook(editor.completer);
    if(shiftState.shift &&
    keyCode>=37&&keyCode<=40){
        
    }else clearUnlockedShifts();
    selm=selMode();
    shiftState.edit=!!(selm);

}
function foldall(editor){
    editor.session.foldAll();
}
function selMode(){
    return editor.getSelectedText();
}
function insertMatchHook(completer) {
    if (completer.insertMatch.hoge) return;
    let old=completer.insertMatch;
    completer.insertMatch=function (...args) {
        let data=args[0]||this.popup.getData(this.popup.getRow());
        //console.log(data);
        let r=old.apply(this, args);
        //alert(r);
        if (data && !followIdent[data.value] ) {
            toggleSym();
        } else {
            editor.onTextInput(" ");
        }
        return r;
    };
    completer.insertMatch.hoge=true;
}
let sessions={}, cursesn;
function initEditor(){
    /*ace.require("ace/ext/language_tools");
    let editor = ace.edit("editor");
    editor.setOptions({
        enableLiveAutocompletion: true
    });
    editor.setFontSize(15);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");*/
    editor.textInput.getElement().setAttribute("readonly",true);
    //setInterval(autoSync,100);
    acepad.editor=editor;
    return editor;
}
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
function onFileReady(){
    createDirList(file.file(""));
    createSessionList();
}