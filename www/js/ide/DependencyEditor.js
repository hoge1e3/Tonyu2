define(function (require, exports, module) {
    const UI=require("UI");
    const R=require("R");
    const IDEProject=require("IDEProject");
    const plugins=require("plugins");
    const FS=require("FS");
    const WebSite=require("WebSite");
    const jshint=require("jshint");
    const ns2depspec=IDEProject.ns2depspec;
    module.exports=class {
        constructor(optEditor) {
            this.optEditor=optEditor;
            this.prj=optEditor.prj;
        }
        createElem() {
            const self=this;
            this.elem=this.elem||UI("div",{title:R("dependencyEditor")},
                ["div",R("namespace"),
                    ["input",{$var:"ns", on:{change:()=>this.optEditor.requestReload()}}]],
                ["h1",R("dependingProjects")],
                    ["div", {$var:"deps"},
                        ...ns2depspec.map(s=>{
                            const n=s.namespace;
                            return ["span",
                                ["input", {
                                    type:"checkbox",$var:`ns_${n}`,
                                    on:{change:function () {
                                        if ($(this).prop("checked")) {
                                            self.addBuiltinProject(n);
                                        } else {
                                            self.removeDependingProject(n);
                                        }
                                    }}
                                }], n, " "];
                        })
                    ],
                    ["div",
                        ["div",{$var:"depList"}],
                        R("addDependingProject"),
                        ["input",{$var:"addingName",placeholder:R("depProejctPlaceholder"),
                        on:{enterkey:this.searchDependingProject.bind(this)}}],
                        ["button",{on:{click:this.searchDependingProject.bind(this)}},"Search"],
                        ["div",{$var:"searchResult"}],
                    ],
                ["h1",R("plugins")],
                ["div", {$var:"plugins"},
                    ...Object.keys(plugins.installed).map(n=>{
                        return ["span",
                            ["input", {type:"checkbox",$var:`plugin_${n}`}],n," "];
                    })
                ],
            );
            return this.elem;
        }
        load(options) {
            this.createElem();
            this.options=options||{};
            this.compiler=options.compiler||{};
            const compiler=this.compiler;
            compiler.dependingProjects=compiler.dependingProjects||[];
            const deps=compiler.dependingProjects;
            const deph={};
            for (let d of deps) {
                deph[d.namespace]=d;
            }
            const v=this.elem.$vars;
            v.ns.val( compiler.namespace);
            for (let s of ns2depspec) {
                const n=s.namespace;
                v[`ns_${n}`].prop("checked", !!deph[n]);
            }
            const pl=options.plugins||{};
            for (let n of Object.keys(plugins.installed)) {
                v[`plugin_${n}`].prop("checked", !!pl[n]);
            }
            const depList=v.depList;
            depList.empty();
            for (let d of deps) {
                const {dir,namespace}=d;
                if (!dir) continue;
                depList.append(UI("div",
                    dir, `(${namespace})`,
                    ["a", {
                        href: jshint.scriptURL(";"),
                        on:{click:()=>this.removeDependingProject(namespace)}
                    },"Remove"]
                ));
            }
        }
        show() {
            const e=this.createElem();
            e.dialog({width:600,height:400,close:this.update.bind(this)});
        }
        update() {
            console.log("update");
            const pl=this.options.plugins||{};
            for (let n of Object.keys(plugins.installed)) {
                if (this.elem.$vars[`plugin_${n}`].prop("checked")) {
                    pl[n]=1;
                } else {
                    delete pl[n];
                }
            }
            this.compiler.namespace=this.elem.$vars.ns.val();
        }
        getNamespace() {
            return this.options.compiler.namespace;
        }
        removeDependingProject(namespace) {
            const deps=this.compiler.dependingProjects;
            for (let i=0;i<deps.length;i++) {
                if (deps[i].namespace===namespace) {
                    deps.splice(i,1);
                    this.load(this.options);
                    this.optEditor.requestReload();
                    return;
                }
            }
        }
        openLink(dir){
            return UI("a",{
                href: jshint.scriptURL(";"),
                on:{click:()=>window.open(WebSite.projectEditorURL+"?dir="+dir.path())},
            },`Open ${dir.name()}...`);
        }
        addBuiltinProject(namespace) {
            const deps=this.compiler.dependingProjects;
            if (deps.filter(s=>s.namespace===namespace).length) {
                return;
            }
            deps.push({namespace});
            this.sortDeps(deps);
            this.load(this.options);
            this.optEditor.requestReload();
        }
        addDependingProject({dir,namespace}) {
            const ns=this.getNamespace();
            if (!namespace) {
                alert(UI(
                    "div",R("namespaceIsNotSet", dir.name(), ns),
                    ["div",this.openLink(dir)]
                ));
                return;
            }
            if (ns===namespace) {
                alert(UI(
                    "div",R("namespaceIsSame", dir.name(), ns),
                    ["div",this.openLink(dir)]
                ));
                return;
            }
            const deps=this.compiler.dependingProjects;
            if (deps.filter(s=>s.namespace===namespace).length) {
                alert(UI(
                    "div",R("alreadyHaveSameNamespace", ns),
                    ["div",this.openLink(dir)]
                ));
                return;
            }
            deps.push({
                namespace, dir:this.relPath(dir)
            });
            this.sortDeps(deps);
            this.load(this.options);
            this.optEditor.requestReload();
        }
        searchDependingProject() {
            const v=this.elem.$vars;
            const {searchResult}=v;
            const word=v.addingName.val();
            const prjs=this.searchUserProjects(word);
            console.log(prjs);
            searchResult.empty();
            if (prjs.length===0) {
                searchResult.append(R("projectNotFound",word));
                return;
            }
            if (prjs.length===1) {
                this.addDependingProject(prjs[0]);
                return;
            }
            for (let _prj of prjs) {
                const prj=_prj;
                searchResult.append(UI("a",{
                    href:jshint.scriptURL(";"),
                    on:{click:()=>{
                        this.addDependingProject(prj);
                    }}},
                this.relPath(prj.dir)));
            }
        }
        relPath(dir) {
            return dir.relPath(this.prj.getDir());
        }
        searchUserProjects(name) {
            const res=[];
            const prjDirs=WebSite.projects.map(FS.get.bind(FS));
            for (let prjDir of prjDirs) {
                const dir=prjDir.rel(name+"/");
                if (!dir.exists()) continue;
                const optf=dir.rel("options.json");
                if (!optf.exists()) continue;
                try {
                    const options=optf.obj();
                    const namespace=options.compiler.namespace;
                    //if (!namespace) continue;
                    res.push({dir, options, namespace});
                }catch(e) {
                    console.error(e);
                }
            }
            return res;
        }
        sortDeps(deps) {
            let seq=0;
            const ord={};
            for (let s of ns2depspec) {
                ord[s.namespace]=seq++;
            }
            for (let d of deps) {
                ord[d.namespace]=seq++;
            }
            deps.sort((a,b)=>ord[a.namespace]-ord[b.namespace]);
        }
    };
    function alert(body) {
        var di=UI("div",{title:"Notice"},body,
                ["button",{on:{click:sendF(true)}},"OK"]).dialog({width:600,close:sendF()});
        function sendF() {
            return function () { di.dialog("close"); di.remove(); };
        }
    }
});
