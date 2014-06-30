define(["FS","Tonyu","UI"], function (FS, Tonyu, UI) {
    var ImageResEditor=function (prj) {
        var d=UI("div", {title:"画像リスト"});
        d.css({height:200+"px", "overflow-v":"scroll"});
        var rsrc=prj.getResource();
        var itemUIs=[];
        if (!rsrc) prj.setResource();
        function reload() {
            d.empty();
	    d.append(UI("div", {style:"margin:10px; padding:10px; border:solid blue 2px;", on:{dragover: s, dragenter: s, drop:dropAdd}}, 
			"ここに画像ファイル(png/gif)をドラッグ＆ドロップして追加"
                       ));
            //UI("div","※「URL」欄に画像ファイル(png/gif)をドラッグ＆ドロップできます．").appendTo(d);
            rsrc=prj.getResource();
            var ims=rsrc.images;
	    itemUIs=[];
	    var itemTbl=UI("table",["tr",["th","名前"],["th","URL"],["th","1個の大きさ"],["th",""]]).appendTo(d);
            ims.forEach(function (im){
                var itemUI=imgItem(im);
                itemUIs.push(itemUI);
                itemUI.appendTo(itemTbl);
            });
            d.append(UI("button", {on:{click:function (){ add();}}}, "追加"));
            d.append(UI("button", {on:{click:close}}, "完了"));
	    function dropAdd(e) {
                eo=e.originalEvent;
                var file = eo.dataTransfer.files[0];
                if(!file.type.match(/image\/(png|gif)/)[1]) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
                var reader = new FileReader();
		var v={pwidth:32,pheight:32};
                reader.onload = function(e) {
                    var fileContent = reader.result;
                    v.url=fileContent;
		    add(v);
                };
                reader.readAsDataURL(file);
                e.stopPropagation();
                e.preventDefault();
                v.name=("$pat_"+file.name.replace(/\.(png|gif)$/,"").replace(/\W/g,"_"));
                return false;
            }
            function s(e) {
                e.stopPropagation();
                e.preventDefault();
	
            }

            function imgItem(im) {
                var isFix=!!(im.pwidth && im.pheight);
                var res=UI("tr",
                           ["td", ["input", {$var:"name", size:12,value:im.name}]],
                            ["td", ["input",{$var:"url", size:20,value:im.url,
                                    on:{dragover: s, dragenter: s, drop:drop}}]],
                            ["td", 
                             ["select", {$var:"ptype"},
                              ["option",{value:"fix", selected:isFix}, "固定サイズ"],
                              ["option",{value:"t1",  selected:!isFix}, "Tonyu1互換"]],
                             ["input", {$var:"pwidth", size:3, value:im.pwidth}],"x",
                             ["input", {$var:"pheight",size:3, value:im.pheight}],
			    ],
			     ["td",["button",{on:{click:del}}, "削除"]]
			  );
                var v=res.$vars;
                v.data=im;
                function drop(e) {
                    eo=e.originalEvent;
                    var file = eo.dataTransfer.files[0];
                    if(!file.type.match(/image\/(png|gif)/)[1]) {
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var fileContent = reader.result;
                        v.url.val(fileContent);
                    }
                    reader.readAsDataURL(file);
                    e.stopPropagation();
                    e.preventDefault();
                    if (!v.name.val()) v.name.val("$pat_"+file.name.replace(/\.(png|gif)$/,"").replace(/\W/g,"_"));
                    return false;
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
                im.pwidth=toi(v.pwidth.val());
                im.pheight=toi(v.pheight.val());
            });
	    console.log(rsrc);
            prj.setResource(rsrc);
            reload();
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
