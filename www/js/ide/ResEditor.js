define(["FS","Tonyu","UI","ImageList","Blob","Auth","WebSite"
        ,"ImageDetailEditor","Util","OggConverter"],
        function (FS, Tonyu, UI,IL,Blob,Auth,WebSite,
                ImageDetailEditor,Util,OggConverter) {
    var ResEditor=function (prj, mediaType) {
        var mediaInfos={
                image:{name:"画像",exts:["png","gif","jpg"],path:"images/",key:"images",
                    extPattern:/\.(png|gif|jpe?g)$/i,contentType:/image\/(png|gif|jpe?g)/,
                    newItem:function (name) {
                        var r={type:"single"};//pwidth:32,pheight:32};
                        if (name) r.name="$pat_"+name;
                        return r;
                    }
                },
                sound:{name:"音声",exts:["mp3","ogg"],path:"sounds/",key:"sounds",
                    extPattern:/\.(mp3|ogg)$/i,contentType:/audio\/(mp3|ogg)/,
                    newItem:function (name) {
                        var r={};
                        if (name) r.name="$se_"+name;
                        return r;
                    }
                }
        };
        var mediaInfo=mediaInfos[mediaType||"image"];
        var d=UI("div", {title:mediaInfo.name+"リスト"});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var rsrcDir=prj.getDir().rel(mediaInfo.path);
        var itemUIs=[];
        if (!rsrc) prj.setResource();
        function convURL(u) {
            try {
                if (Util.endsWith(u,".ogg") || Util.endsWith(u,".mp3") ) {
                    u=WebSite.urlAliases["images/sound.png"];
                }
                return IL.convURL(u,prj.getDir());
            }catch(e) {
                return WebSite.urlAliases["images/ecl.png"];
            }
        }
        function reload() {
            d.empty();
            var dragMsg="ここに"+mediaInfo.name+"ファイル("+mediaInfo.exts.join("/")+")をドラッグ＆ドロップして追加";
            var dragPoint=UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
            ).appendTo(d);
            rsrc=prj.getResource();
            var items=rsrc[mediaInfo.key];
            itemUIs=[];
            var itemTbl=UI("div").appendTo(d);
            items.forEach(function (item){
                var itemUI=genItemUI(item);
                itemUIs.push(itemUI);
                itemUI.appendTo(itemTbl);
            });
            d.append(UI("div",{style:"clear:left;"},
                         ["button", {on:{click:function (){ add();}}}, "追加"],
                         ["button", {on:{click:function (){ d.dialog("close"); }}}, "完了"]
            ));
            function dropAdd(e) {
                eo=e.originalEvent;
                var file = eo.dataTransfer.files[0];
                var useBlob=WebSite.serverType=="GAE" && (file.size>1000*300);
                if(!file.type.match(mediaInfo.contentType)[1]) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
                var itemName=file.name.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                var itemExt="";
                if (file.name.match(mediaInfo.extPattern)) {
                    itemExt=RegExp.lastMatch.toLowerCase();
                }
                var v=mediaInfo.newItem(itemName);
                if (useBlob) {
                    Auth.assertLogin({
                        showLoginLink:function (u) {
                            dragPoint.css("border","solid red 2px").empty().append(
                                    UI("div","大きい"+mediaInfo.name+"を追加するには，ログインが必要です：",
                                       ["a",{href:u,target:"login",style:"color: blue;"},"ログインする"])
                            );
                        },success:function (u) {
                            dragPoint.text("アップロード中...");
                            var prjN=prj.getName();
                            Blob.upload(u,prjN,file,{success:function (){
                                dragPoint.text(dragMsg);
                                v.url="${blobPath}/"+u+"/"+prjN+"/"+file.name;
                                add(v);
                            }});
                        }
                    });
                } else {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        var itemFile=rsrcDir.rel(itemName+itemExt);
                        itemFile.setBytes(fileContent);
                        v.url="ls:"+itemFile.relPath(prj.getDir());// fileContent;
                        add(v);
                    };
                    reader.readAsArrayBuffer(file);
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            function s(e) {
                e.stopPropagation();
                e.preventDefault();

            }
            function genItemUI(item) {
                function detail() {
                    if (mediaType=="sound") return;
                    ImageDetailEditor.show(item,prj.getDir(), item.name, {
                        onclose: function () {
                            prj.setResource(rsrc);
                            reload();
                        }
                    });
                }
                function del() {
                    for (var i=items.length-1; i>=0 ; i--) {
                        if (items[i]===item) {
                            items.splice(i,1);
                            break;
                        }
                    }
                    update();
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

                var res=UI("div",{style:"float:left;"},
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
        }
        function update() {
            itemUIs.forEach(function (itemUI) {
                var v=itemUI.$vars;
                var item=v.data;
                item.name=v.name.val();
            });
            console.log(rsrc);
            prj.setResource(rsrc);
            reload();
        }
        function cleanFiles() {
            var items=rsrc[mediaInfo.key];
            Auth.currentUser(function (u,ct) {
                if (!u) return;
                var rtf=[];
                items.forEach(function (item) {
                    var a,ogg;
                    if (a=Blob.isBlobURL(item.url)) {
                        rtf.push(a.fileName);
                        ogg=a.fileName.replace(/\.mp3$/,".ogg");
                        if (ogg!=a.fileName) rtf.push(ogg);
                    }
                });
                var data={
                        user:u,
                        project:prj.getName(),
                        mediaType:mediaType,
                        csrfToken:ct,
                        retainFileNames:JSON.stringify(rtf)
                };
                console.log("retainBlobs",data);
                //TODO: urlchange!
                $.ajax({url:WebSite.serverTop+"/retainBlobs",type:"get",
                    data:data
                });
            })
            var cleanFile={};
            if (rsrcDir.exists()) {
                rsrcDir.each(function (f) {
                    cleanFile["ls:"+f.relPath(prj.getDir())]=f;
                });
            }
            rsrc=prj.getResource();
            items.forEach(function (item){
                delete cleanFile[item.url];
                delete cleanFile[item.url.replace(/\.mp3$/,".ogg")];
            });
            console.log(cleanFile);
            for (var ci in cleanFile) {
                var cf=cleanFile[ci];
                console.log(cf+" is removed");
                cf.rm();
            }
        }
        function toi(s) {
            if (!s || s=="") return undefined;
            return parseInt(s);
        }
        reload();
        d.dialog({
            modal:true,
            width: 800,
            height: 500,
            close: function () {
                update();
                cleanFiles();
                if (mediaType=="sound") {
                    OggConverter.convert(rsrcDir);
                }
            }
        });
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
