define(["FS","Tonyu","UI","ImageList","Blob","Auth","WebSite"
        ,"ImageDetailEditor","Util","OggConverter","Assets"],
        function (FS, Tonyu, UI,IL,Blob,Auth,WebSite,
                ImageDetailEditor,Util,OggConverter,Assets) {
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
                sound:{name:"音声",exts:["mp3","ogg","mp4","m4a","mid","wav"],path:"sounds/",key:"sounds",
                    extPattern:/\.(mp3|ogg|mp4|m4a|midi?|wav)$/i,contentType:/((audio\/(mp3|ogg|x-m4a|midi?|wav))|(video\/mp4))/,
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
        if (!rsrc) prj.setResource({images:[],sounds:[]});
        function convURL(u) {
            try {
                if (Util.endsWith(u,".ogg")) {
                    u=WebSite.urlAliases["images/sound_ogg.png"];
                } else if (Util.endsWith(u,".mp3")) {
                    u=WebSite.urlAliases["images/sound_mp3.png"];
                } else if (Util.endsWith(u,".mp4")) {
                    u=WebSite.urlAliases["images/sound_mp4.png"];
                } else if (Util.endsWith(u,".m4a")) {
                    u=WebSite.urlAliases["images/sound_m4a.png"];
                } else if (Util.endsWith(u,".mid") || Util.endsWith(u,".midi")) {
                    u=WebSite.urlAliases["images/sound_mid.png"];
                } else if (Util.endsWith(u,".wav")) {
                    u=WebSite.urlAliases["images/sound_wav.png"];
                }
                return Assets.resolve(u,prj);
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
            var tempFiles = items.slice();
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
                var eo=e.originalEvent;
                var files = eo.dataTransfer.files;
                var readFiles = new Array(files.length);
                var readFileSum = files.length;
                var notReadFiles = [];
                var existsFiles = [];
                for (var i=0; i<files.length; i++) {
                    var file = files[i];
                    var useBlob=WebSite.serverType=="GAE" && (file.size>1000*300);
                    if(!file.type.match(mediaInfo.contentType)) {
                        readFileSum--;
                        notReadFiles.push(file);
                        e.stopPropagation();
                        e.preventDefault();
                        continue;
                    }
                    var itemName=file.name.replace(mediaInfo.extPattern,"").replace(/\W/g,"_");
                    var itemExt="";
                    if (file.name.match(mediaInfo.extPattern)) {
                        itemExt=RegExp.lastMatch.toLowerCase();
                    }
                    var itemFile=rsrcDir.rel(itemName+itemExt);
                    var itemRelPath="ls:"+itemFile.relPath(prj.getDir());
                    var existsFile;
                    var fileExists=tempFiles.some(function(f){
                        existsFile=f;
                        return f.url==itemRelPath;
                    });
                    if (fileExists) {
                        readFileSum--;
                        file.existsFile=existsFile;
                        existsFiles.push(file);
                        e.stopPropagation();
                        e.preventDefault();
                        continue;
                    }

                    var v=mediaInfo.newItem(itemName);
                    renameUnique(v);
                    tempFiles.push(v);
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
                        var readCnt = 0;
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

                if (notReadFiles.length>0) {
                    var mes="このファイルは追加できません：\n";
                    notReadFiles.forEach(function(f){
                        if (f) mes+=f.name+"\n";
                    });
                    alert(mes);
                }
                if (existsFiles.length>0) {
                    var mes="この名前のファイルは既に登録されています：\n";
                    existsFiles.forEach(function(f){
                        if (f) mes+=f.name+" ("+f.existsFile.name+")\n";
                    });
                    alert(mes);
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
                    ImageDetailEditor.show(item, prj, item.name, {
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
                        ogg=a.fileName.replace(/\.(mp3|mp4|m4a)$/,".ogg");
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
            });
            var cleanFile={};
            if (rsrcDir.exists()) {
                rsrcDir.each(function (f) {
                    cleanFile["ls:"+f.relPath(prj.getDir())]=f;
                });
            }
            rsrc=prj.getResource();
            items.forEach(function (item){
                delete cleanFile[item.url];
                delete cleanFile[item.url.replace(/\.(mp3|mp4|m4a)$/,".ogg")];
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
        return d.dialog({
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
