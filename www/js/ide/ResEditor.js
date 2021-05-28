/*globals requirejs*/
define(["FS","Tonyu","UI","ImageList","Blob","Auth","WebSite",
"ImageDetailEditor","Util","Assets","root","jshint","R"],
        function (FS, Tonyu, UI,IL,Blob,Auth,WebSite,
                ImageDetailEditor,Util,Assets,root,jshint,R) {
    const HNOP=jshint.scriptURL("");
    var ResEditor=function (prj, mediaInfo) {
        var d=UI("div", {title:R("resouceList",mediaInfo.name)});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var items=rsrc[mediaInfo.key];
        var tempFiles = items.slice();
        var rsrcDir=prj.getDir().rel(mediaInfo.path);
        var itemUIs=[];
        var _dropAdd;
        let buttons;

        if (!rsrc) prj.setResource({images:[],sounds:[]});
        function convURL(u) {
            function cvs(u) {
                return WebSite.urlAliases[u] || u;
            }
            try {
                if (Util.endsWith(u,".ogg")) {
                    u=cvs("images/sound_ogg.png");
                } else if (Util.endsWith(u,".mp3")) {
                    u=cvs("images/sound_mp3.png");
                } else if (Util.endsWith(u,".mzo")) {
                    u=cvs("images/sound_mzo.png");
                } else if (Util.endsWith(u,".mp4")) {
                    u=cvs("images/sound_mp4.png");
                } else if (Util.endsWith(u,".m4a")) {
                    u=cvs("images/sound_m4a.png");
                } else if (Util.endsWith(u,".mid") || Util.endsWith(u,".midi")) {
                    u=cvs("images/sound_mid.png");
                } else if (Util.endsWith(u,".wav")) {
                    u=cvs("images/sound_wav.png");
                }
                return Assets.resolve(u,prj);
            }catch(e) {
                return WebSite.urlAliases["images/ecl.png"];
            }
        }
        function reload(action, args) {
            if (action=="del") { // 削除時（リスト数が多いとhtml生成に時間がかかるためremoveで消す）
                var delItem = $("#"+args);
                rsrc=prj.getResource();
                items=rsrc[mediaInfo.key];
                tempFiles = items.slice();
                itemUIs.some(function (itemUI, idx){
                    if (itemUI[0].id==args) {
                        itemUIs.splice(idx, 1);
                        return true;
                    }
                });
                delItem.removeAttr("id");
                delItem.remove();
            } else { // 通常reload（全更新。htmlを１から作成）
                d.empty();
                rsrc=prj.getResource();
                items=rsrc[mediaInfo.key];
                tempFiles = items.slice();
                itemUIs=[];
                if (action!="close") { // ウィンドウ閉じるとき（画面更新は要らない）
                    var dragMsg=R("dragFileHere",mediaInfo.name, mediaInfo.exts.join("/"));
                    var dragPoint=UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
                        on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
                    ).appendTo(d);
                    var itemTbl=UI("div").appendTo(d);
                    items.forEach(function (item){
                        var itemUI=genItemUI(item, items);
                        itemUIs.push(itemUI);
                        itemUI.appendTo(itemTbl);
                    });
                    buttons=UI("div",{style:"clear:left;"},
                        (mediaInfo.builtins?
                        ["span",{class:"dropdown"},
                            ["button",{
                                //href:HNOP,
                                class:"submenu",
                                on:{click:addBuiltin}},R("add")],
                            ["span",{$var:"addMenu",class:"dropdown-content"},
                                //["a",{href:HNOP,class:"submenu",on:{click:function(){}}},"名前変更"],
                            ]
                        ]:""),
                        //["button", {on:{click:function (){ addBuiltin(this);}}}, "追加"]:""),
                        ["button", {on:{click:function (){ d.dialog("close"); }}}, R("done")]
                    );
                    d.append(buttons);
                }
            }
            function addBuiltin() {
                //const menus=[];
                const addMenu=buttons.$vars.addMenu;
                addMenu.empty();
                const addF=item=>()=>{
                    addMenu.removeClass("show");
                    add(item);
                };
                for (let k in mediaInfo.builtins) {
                    const item=mediaInfo.builtins[k];
                    addMenu.append(
                        UI("a",{href:HNOP,class:"submenu",on:{click:addF(item)}},k)
                    );
                }
                if (WebSite.serverType==="BA") {
                    addMenu.append(
                        UI("a",{href:HNOP,class:"submenu",on:{click:addFromImageList}},"その他...")
                    );
                }
                addMenu.toggleClass("show");
                //const m=UI("ul",{class:"dropdown"},...menus).appendTo(d);
                //m.offset($(btn).position());
            }
            function addFromImageList() {
                // defined only in BA
                requirejs(["IframeDialog"], function (IframeDialog) {
                    root.onImageSelected=n=> {
                        const pn=n.replace(/\.(gif|png|jpg)$/,"");
                        add({
                            name:`$pat_${pn}`,type:"single",url:"${runtime}images/"+n
                        });
                        IframeDialog.close();
                    };
                    IframeDialog.show(WebSite.runtime+"images/index.php?fromTonyu=1");
                });
            }
            _dropAdd=dropAdd;
            function dropAdd(e) {
                e.stopPropagation();
                e.preventDefault();
                var eo=e.originalEvent;
                var files = eo.dataTransfer.files;
                var readFiles = new Array(files.length);
                var readFileSum = files.length;
                var notReadFiles = [];
                var existsFiles = [];
                var readCnt = 0;
                for (var i=0; i<files.length; i++) loop(i);
                function loop(i){
                    var file = files[i];
                    var filetype= file.type;
                    if (file.name.match(/\.mzo$/)) filetype="audio/mzo";
                    var useBlob=WebSite.serverType=="BA"||WebSite.serverType=="GAE" && (file.size>1000*300);
                    if(!filetype.match(mediaInfo.contentType)) {
                        readFileSum--;
                        notReadFiles.push(file);
                        return;//continue;
                    }
                    var itemName=file.name.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                    var itemExt="";
                    if (file.name.match(mediaInfo.extPattern)) {
                        itemExt=RegExp.lastMatch.toLowerCase();
                    }
                    var itemFile=rsrcDir.rel(itemName+itemExt);
                    var itemRelPath=(useBlob?"":"ls:")+itemFile.relPath(prj.getDir());
                    var existsFile;
                    var fileExists=tempFiles.some(function(f){
                        existsFile=f;
                        var fNameTemp=f.url.replace(mediaInfo.extPattern,"");
                        var fName=fNameTemp.substring(fNameTemp.lastIndexOf("/")+1,fNameTemp.length);
                        return fName==itemName;
                    });
                    if (fileExists) {
                        readFileSum--;
                        file.existsFile=existsFile;
                        existsFiles.push(file);
                        return;//continue;
                    }

                    var v=mediaInfo.newItem(itemName);
                    v.url=itemRelPath;
                    renameUnique(v);
                    tempFiles.push(v);
                    if (useBlob) {//TODO replace GAE with BA
                        Auth.assertLogin({
                            showLoginLink:function (u) {
                                dragPoint.css("border","solid red 2px").empty().append(
                                        UI("div","大きい"+mediaInfo.name+"を追加するには，ログインが必要です：",
                                           ["a",{href:u,target:"login",style:"color: blue;"},"ログインする"])
                                );
                            },success:async function (u) {
                                dragPoint.text("アップロード中...");
                                var prjN=prj.getName()+"/";
                                console.log("uploading", prjN, v.url,u);
                                const r=await Blob.upload(prjN, v.url ,file);/*,{success:function (){
                                    dragPoint.text(dragMsg);
                                    v.url="${blobPath}/"+u+"/"+prjN+"/"+file.name;
                                    add(v);
                                }});*/
                                console.log(r);
                                v.url="${pubURLOfPrj}"+v.url;
                                add(v);
                            }
                        });
                    } else {
                        var reader = new FileReader();
                        reader.temp_file=file;
                        reader.temp_itemName=itemName;
                        reader.temp_itemExt=itemExt;
                        reader.temp_v=v;
                        reader.onloadend = function(e) {
                            var target = e.target;
                            var fileContent = target.result;
                            if (target.error==null && fileContent!=null) {
                                var itemFile=rsrcDir.rel(target.temp_itemName+target.temp_itemExt);
                                itemFile.setBytes(fileContent);
                                target.temp_v.url="ls:"+itemFile.relPath(prj.getDir());// fileContent;
                                for (var i=0;i<files.length;i++) {
                                    if (files[i]==target.temp_file) {
                                        readFiles[i]=target.temp_v;
                                        break;
                                    }
                                }
                            }
                            readCnt++;
                            if (readCnt == readFileSum) {
                                addAry(readFiles);
                            }
                        };
                        reader.readAsArrayBuffer(file);
                    }
                }
                var mes;
                if (notReadFiles.length>0) {
                    mes=R("thisFileCannotBeAdded");
                    notReadFiles.forEach(function(f){
                        if (f) mes+=f.name+"\n";
                    });
                    alert(mes);
                }
                if (existsFiles.length>0) {
                    mes=R("resourceFileExists");
                    existsFiles.forEach(function(f){
                        if (f) {
                            var fNameTemp=f.existsFile.url;
                            var fName=fNameTemp.substring(fNameTemp.lastIndexOf("/")+1,fNameTemp.length);
                            mes+=R("duplicatedFiles",f.name, fName, f.existsFile.name);
                            //mes+=f.name+" ("+f.existsFile.name+")\n";
                        }
                    });
                    alert(mes);
                }
                return false;
            }
            function s(e) {
                e.stopPropagation();
                e.preventDefault();

            }
            function genItemUI(item) {
                function detail() {
                    if (mediaInfo.key=="sounds") return;
                    ImageDetailEditor.show(item, prj, item.name, {
                        onclose: function () {
                            prj.setResource(rsrc);
                            reload();
                        }
                    });
                }
                function del() {
                    for (var i=items.length-1; i>=0 ; i--) {
                        if (items[i].name==item.name) { // リソース削除時、itemsが更新されてobjectが変わり条件がtrueにならないので、item.nameで比較する
                            try {
                                var r=Assets.resolve( items[i].url, prj,{asFile:1});
                                if (FS.isFile(r) && rsrcDir.contains(r)) {
                                    console.log(r.path()," is removed.");
                                    r.rm();
                                }
                            } catch(e) {}
                            items.splice(i,1);
                            break;
                        }
                    }
                    update("del", item.name.substring(1));
                }
                function up() {
                    for (var i=items.length-1; i>=1 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            items.splice(i-1,0,item);
                            break;
                        }
                    }
                    update();
                }
                function down() {
                    for (var i=items.length-2; i>=0 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            items.splice(i+1,0,item);
                            break;
                        }
                    }
                    update();
                }

                var res=UI("div",{style:"float:left;", id:item.name.substring(1)}, // $se_bgmの$を除く
                        ["canvas",{$var:"c",width:100,height:100,"class":"clickable",on:{click: detail}}],
                        ["div",{style:"float:right;"},
                        ["button",{on:{click:del}}, "×"],["br"],
                        ["button",{on:{click:up}}, "←"],["br"],
                        ["button",{on:{click:down}}, "→"]],
                        ["div",
                            ["input", {$var:"name", size:12,value:item.name}]
                            ]
                   );
                draw(convURL(item.url),res.$vars.c[0]);
                var v=res.$vars;
                v.data=item;
                return res;
            }
            function add(v) {
                items.push(v || mediaInfo.newItem());
                update();
            }
            function addAry(vAry) {
                vAry.forEach(function(v){
                    if (v) items.push(v || mediaInfo.newItem());
                });
                update();
            }
            function renameUnique(v) {
                var name=v.name;
                var rename=name;
                var cnt=1;
                for (var i=tempFiles.length-1; i>=0 ; i--) {
                    var o=tempFiles[i];
                    if (o.name==rename) {
                        rename=name+"_"+cnt;
                        cnt++;
                        i=tempFiles.length;
                        continue;
                    }
                }
                v.name=rename;
            }
        }
        function update(action, args) {
            itemUIs.forEach(function (itemUI) {
                var v=itemUI.$vars;
                var item=v.data;
                item.name=v.name.val();
            });
            console.log(rsrc);
            prj.setResource(rsrc);
            reload(action, args);
        }
        return {
            dropAdd:function (e) {
                _dropAdd(e);
            },
            open: function () {
                reload();
                d.dialog({
                    modal:true,
                    width: 800,
                    height: 500,
                    close: function () {
                        update("close");
                        //cleanFiles();
                        if (typeof mediaInfo.close==="function") {
                            mediaInfo.close({
                                items:items,
                                resourceDir:rsrcDir,
                                project:prj
                            });
                        }
                    }
                });
            },
            close: function () {
                d.dialog("close");
            }
        };
    };
    function draw(img, canvas) {
        if (typeof img=="string") {
            var i=new Image();
            i.onload=function () {
                draw(i,canvas);
            };
            i.src=img;
            return i;
        }
        var cw=canvas.width;
        var ch=canvas.height;
        var cctx=canvas.getContext("2d");
        var width=img.width;
        var height=img.height;
        var calcw=ch/height*width; // calch=ch
        var calch=cw/width*height; // calcw=cw
        if (calch>ch) calch=ch;
        if (calcw>cw) calcw=cw;
        cctx.clearRect(0,0,cw,ch);
        var marginw=Math.floor((cw-calcw)/2);
        var marginh=Math.floor((ch-calch)/2);
        cctx.drawImage(img,
        0,0,width, height,
        marginw,marginh,calcw, calch );
    }
    return ResEditor;
});
