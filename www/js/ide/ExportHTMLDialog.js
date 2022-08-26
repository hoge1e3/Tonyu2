define(["exportAsScriptTags","UI","Klass","root","R","WebSite","extLink"],
function (east,UI,Klass,root,R,WebSite,extLink) {
    root.ExportHTMLDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            //var dir=t.prj.getDir();
            t.options=options||{IE:false};
            t.options.IE=false;
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
            t.prog.val("");
            t.options.editButton=t.dom.$vars.editButton.prop("checked");
            setTimeout(function () {
                var buf=east(t.prj, t.options);
                t.prog.val(buf);
                t.resetUpload();
            },10);
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:R("generateSingleHTML")},
                ["div",R("thisIsExecutableInSingleHTML")],
                ["div",
                    ["input", {id:"ie",$var:"editButton",type:"checkbox"
                    }],
                    ["label",{"for":"ie"},R("showEditButton")],
                ],
                ["div",
                    ["div",R("uploadPath"),["br"],
                    "https://run.tonyu.jp/?USER/",["input", {$var:"preferredName"}]],
                    ["button",{$var:"upd",
                        on:{
                            click:()=>t.uploadTmp(t.prog.val(), t.preferredName.val())
                        }
                    },R("QuickUpload")],
                    ["span",{$var:"updURL"}],
                ],
                ["textarea",{$var:"prog",rows:10,cols:60,placeholder:"Please wait..."}],
            );
            t.dom.$edits.load(t.options);
            t.dom.$vars.editButton.on("change",()=> {
                t.write();
            });

            t.prog=t.dom.$vars.prog;
            t.preferredName=t.dom.$vars.preferredName;
            try {
                const projectName=t.prj.getOptions().social.prjName;
                if (projectName) t.preferredName.val(projectName);
            } catch(e){}
            return t.dom;
        },
        async uploadTmp(t, html, preferredName) {
            const f=new FormData();
            const url=WebSite.uploadTmpUrl;
            f.append( "content" , new Blob( [html], {type:"text/html"} ) , "index.html" );
            f.append( "extension", new Blob( [".html"], {type:"text/plain"} ) , "extension" );
            const prep=(preferredName ?
                `&preferredName=${
                    preferredName.replace(/[^a-zA-Z0-9_\-\.]/g,"_")
                }`:"");
            if (t.prj.api) {
                const a=JSON.stringify(t.prj.api.get());
                f.append( "api", new Blob( [a], {type:"text/json"} ) , "api" );
            }
            const upf=await $.ajax({url, method:"POST",data:f,processData: false, contentType: false});
            console.log(upf, html);
            const v=this.dom.$vars;
            v.upd.hide();
            v.updURL.empty();
            console.log("qupURL",`${WebSite.quickUploadURL}?name=${upf}${prep}`);
            v.updURL.append(extLink(`${WebSite.quickUploadURL}?name=${upf}${prep}`, R("ClickToCompleteQuickUpload")));
        },
    });

    return root.ExportHTMLDialog;
});
