define(["FS","Tonyu","UI","ImageList","Blob","Auth","WebSite"
        ,"ImageDetailEditor"],
        function (FS, Tonyu, UI,IL,Blob,Auth,WebSite,
                ImageDetailEditor) {
    var ImageResEditor=function (prj) {
        var d=UI("div", {title:"画像リスト"});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var imgDir=prj.getDir().rel("images/");
        var itemUIs=[];
        if (!rsrc) prj.setResource();
        function convURL(u) {
            try {
                return IL.convURL(u,prj.getDir());
            }catch(e) {
                return WebSite.urlAliases["images/ecl.png"];
            }//return ((typeof WebSite=="object") && WebSite.urlAliases[u]) || u;
        }
        function getSize(im) {
            if (typeof im.pwidth=="number" && typeof im.pheight=="number") {
                if (im.pwidth==im.pheight) return ""+im.pwidth;
                return im.pwidth+"x"+im.pheight;
            } else return "";
        }
        function setSize(im,str){
            if (!str || str=="") {
                delete im.pwidth;
                delete im.pheight;
            } else if (str.match(/([0-9]+)x([0-9]+)/)) {
                im.pwidth=parseInt(RegExp.$1);
                im.pheight=parseInt(RegExp.$2);
            } else if (str.match(/([0-9]+)/)) {
                im.pwidth=parseInt(RegExp.$1);
                im.pheight=im.pwidth;
            } else {
                delete im.pwidth;
                delete im.pheight;
            }
        }

        function reload() {
            d.empty();
            var dragMsg="ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加";
            var dragPoint=UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;",
                on:{dragover: s, dragenter: s, drop:dropAdd}},dragMsg
            ).appendTo(d);
            //UI("div","※「URL」欄に画像ファイル(png/gif)をドラッグ＆ドロップできます．").appendTo(d);
            rsrc=prj.getResource();
            var ims=rsrc.images;
            itemUIs=[];
            var itemTbl=UI("table",["tr",["th"],["th","名前"],["th","URL"],["th","1個の大きさ"],["th",""]]).appendTo(d);
            ims.forEach(function (im){
                var itemUI=imgItem(im);
                itemUIs.push(itemUI);
                itemUI.appendTo(itemTbl);
            });
            d.append(UI("button", {on:{click:function (){ add();}}}, "追加"));
            d.append(UI("button", {on:{click:function (){ d.dialog("close"); }}}, "完了"));
            function dropAdd(e) {
                eo=e.originalEvent;
                var file = eo.dataTransfer.files[0];
                var useBlob=WebSite.serverType=="GAE" && (file.size>1000*300);
                if(!file.type.match(/image\/(png|gif|jpe?g)/)[1]) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
                var imgName=file.name.replace(/\.(png|gif|jpe?g)$/,"").replace(/\W/g,"_");
                var imgExt="";
                if (file.name.match(/\.(png|gif|jpe?g)$/)) {
                    imgExt=RegExp.lastMatch;
                }
                var v={pwidth:32,pheight:32,name:"$pat_"+imgName};
                if (useBlob) {
                    Auth.assertLogin({
                        showLoginLink:function (u) {
                            dragPoint.css("border","solid red 2px").empty().append(
                                    UI("div","大きいイメージを追加するには，ログインが必要です：",
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
                        var imgFile=imgDir.rel(imgName+imgExt);
                        imgFile.text(fileContent);
                        v.url="ls:"+imgFile.relPath(prj.getDir());// fileContent;
                        add(v);
                    };
                    reader.readAsDataURL(file);
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            function s(e) {
                e.stopPropagation();
                e.preventDefault();

            }
            function imgItem(im) {
                var isFix=!!(im.pwidth && im.pheight);
                var res=UI("tr",
                        ["td", ["img", {src: convURL(im.url),width:16,height:16,
                            on:{click: detail, mouseenter: magOn, mouseout:magOff} }]],
                            ["td", ["input", {$var:"name", size:12,value:im.name}]],
                            ["td", ["input",{$var:"url", size:20,value:im.url}]],
                                ["td",
                                 ["select", {$var:"ptype",on:{change: ptypeChanged }},
                                  ["option",{value:"fix", selected:isFix}, "固定サイズ分割"],
                                  ["option",{value:"t1",  selected:!isFix}, "Tonyu1互換"],
                                  ["option",{value:"full",  selected:false}, "分割なし"]
                                  ],
                                  //["inpnt", {$var:"pwidth", size:3, value:im.pwidth}],"x",
                                  //["input", {$var:"pheight",size:3, value:im.pheight}],
                                  ["input",{$var:"size", size:6, value: getSize(im)}]
                                ],
                                ["td",["button",{on:{click:del}}, "削除"]]
                );
                var mag=UI("div",{style:"position:absolute; background: rgba(255,255,200,1);"},
                        //["img",{src: convURL(im.url)}]
                        "画像をクリックして詳細設定..."
                ).hide().appendTo(res);
                function magOn() {
                    var ofs=$(this).position();
                    //console.log(this);
                    //console.log(ofs);
                    mag.show().css({left: ofs.left+16, top:ofs.top});
                }
                function magOff() {
                    //console.log("Off");
                    mag.hide();
                }
                function detail() {
                    ImageDetailEditor.show(im,prj.getDir(), im.name, {
                        onclose: function () {
                            prj.setResource(rsrc);
                            reload();
                        }
                    });
                }
                var v=res.$vars;
                v.mag=mag;
                v.data=im;
                function ptypeChanged() {
                    var pt=$(this).val();
                    if (pt=="t1") {
                        v.size.val("");
                    }
                    if (pt=="full") {
                        magOn.apply(this,[]);
                        setTimeout(function () {
                            var w=mag.width();
                            var h=mag.height();
                            if (w && h) v.size.val(w+"x"+h);
                            magOff();
                        },100);
                    }
                }
                function del() {
                    for (var i=ims.length-1; i>=0 ; i--) {
                        if (ims[i]===im) {
                            ims.splice(i,1);
                            break;
                        }
                    }
                    update();
                }
                return res;
            }
            function add(v) {
                ims.push(v || {pwidth:32,pheight:32});
                update();
            }
        }
        function update() {
            itemUIs.forEach(function (itemUI) {
                var v=itemUI.$vars;
                var im=v.data;
                im.name=v.name.val();
                im.url=v.url.val();
                if (v.ptype.val()=="t1") {
                    setSize(im,"");
                } else {
                    setSize(im,v.size.val());
                }
                //im.pwidth=toi(v.pwidth.val());
                //im.pheight=toi(v.pheight.val());
            });
            console.log(rsrc);
            prj.setResource(rsrc);
            reload();
        }
        function cleanImgFiles() {
            var ims=rsrc.images;
            Auth.currentUser(function (u,ct) {
                if (!u) return;
                var rtf=[];
                ims.forEach(function (im) {
                    var a;
                    if (a=Blob.isBlobURL(im.url)) {
                        rtf.push(a.fileName);
                    }
                });
                //TODO: urlchange!
                $.ajax({url:WebSite.serverTop+"/retainBlobs",type:"get",
                    data:{
                        user:u,
                        project:prj.getName(),
                        csrfToken:ct,
                        retainFileNames:JSON.stringify(rtf)
                    }
                });
            })
            var cleanImg={};
            imgDir.each(function (f) {
                cleanImg["ls:"+f.relPath(prj.getDir())]=f;
            });
            rsrc=prj.getResource();
            ims.forEach(function (im){
                delete cleanImg[im.url];
            })
            console.log(cleanImg);
            for (var ci in cleanImg) {
                var cf=cleanImg[ci];
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
            width: 700,
            height: 400,
            close: function () {
                update();
                cleanImgFiles();
            }
        /*buttons: {
		OK: function(){
                    update();
                    $(this).dialog('close');
                }
            }*/
        });
        /*function close() {
	    update();
	    d.dialog("close");
	}*/
    };
    return ImageResEditor;
});
