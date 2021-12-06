define(["exportAsScriptTags","UI","Klass","root","R","WebSite","extLink"],
function (east,UI,Klass,root,R,WebSite,extLink) {
    root.ExportHTMLDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            //var dir=t.prj.getDir();
            t.options=options||{IE:false};
            t.prj.removeThumbnail();
            t.createDOM();
            t.resetUpload();
            t.dom.dialog({width:800,height:500});
            t.write();
        },
        resetUpload(t) {
            t.dom.$vars.upd.show();
            t.dom.$vars.updURL.empty();
        },
        write: function (t) {
            var dir=t.prj.getDir();
            t.prog.val("");
            t.options.editButton=t.dom.$vars.editButton.prop("checked");
            setTimeout(function () {
                var buf=east(dir,t.options);
                t.prog.val(buf);
                t.resetUpload();
            },10);
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:R("generateSingleHTML")},
                ["div",R("thisIsExecutableInSingleHTML")],
                ["div",
                    ["input", {id:"ie",$var:"IE",$edit:"IE",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},R("runnableInIE11")],
                ],
                ["div",
                    ["input", {id:"ie",$var:"editButton",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},R("showEditButton")],
                ],
                ["div",
                    ["button",{$var:"upd",on:{click:()=>t.uploadTmp(t.prog.val())}},R("QuickUpload")],
                    ["span",{$var:"updURL"}],
                ],
                ["textarea",{$var:"prog",rows:20,cols:60,placeholder:"Please wait..."}],
            );
            t.dom.$edits.load(t.options);
            t.dom.$vars.IE.on("change",()=> {
                t.options.IE=t.dom.$vars.IE.prop("checked");
                t.write();
            });
            t.dom.$vars.editButton.on("change",()=> {
                t.write();
            });

            t.prog=t.dom.$vars.prog;
            return t.dom;
        },
        async uploadTmp(t, html) {
            const f=new FormData();
            const url=WebSite.uploadTmpUrl;
            f.append( "content" , new Blob( [html], {type:"text/html"} ) , "index.html" );
            f.append( "extension", new Blob( [".html"], {type:"text/plain"} ) , "extension" );
            if (t.prj.api) {
                const a=JSON.stringify(t.prj.api.get());
                f.append( "api", new Blob( [a], {type:"text/json"} ) , "api" );
            }
            const upf=await $.ajax({url, method:"POST",data:f,processData: false, contentType: false});
            console.log(upf, html);
            const v=this.dom.$vars;
            v.upd.hide();
            v.updURL.empty();
            v.updURL.append(extLink(`${WebSite.quickUploadURL}?name=${upf}`, R("ClickToCompleteQuickUpload")));
        },
    });

    return root.ExportHTMLDialog;
});
