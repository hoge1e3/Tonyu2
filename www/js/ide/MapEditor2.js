define(function (require, exports) {
    //const WebSite=require("WebSite");
    //const ns2depspec=WebSite.ns2depspec;
    const ns_m="mapEditor2";
    const ns_k="kernel";
    const starter={
        name: "StartMapEditor.tonyu",
        content:
`//「実行」→「StartMapEditorを実行」で起動

$editorConfig={
    //レイヤー名，レイヤーで使えるパターン
    layers:[
    //奥のレイヤー
    {name:"base", pats:[-1,
        $pat_mapchip+88, $pat_mapchip+89, $pat_mapchip+90,
        $pat_mapchip+91, $pat_mapchip+124, $pat_mapchip+62,
        $pat_mapchip+78,
    ]},
    //手前のレイヤー
    {name:"on", pats:[-1,
        $pat_mapchip+1, $pat_mapchip+2, $pat_mapchip+3,
        $pat_mapchip+4, $pat_neko, $pat_neko+50,
        $pat_neko+49,
    ]},
    ],

    // 編集対象のマップファイルのあるフォルダ
    mapDir: file("../maps/"),

    // オプション：「Play」ボタンで読み込まれるページ
    //mainPage: Stage,

    // オプション：「Title」ボタンで読み込まれるページ
    //titlePage: Title,

    showHelp: true,//ヘルプの表示
};
loadPage(MapFiles);
`};
    exports.prepare=async ide=>{
        const prj=ide.project;
        const opt=prj.getOptions();
        const deps=opt.compiler.dependingProjects;
        const md=deps.filter(s=>s.namespace===ns_m)[0];
        if (!md) {
            for (let i=0; i<deps.length; i++) {
                if (deps[i].namespace===ns_k) {
                    deps.splice(i+1,0, {namespace: ns_m});
                    break;
                }
            }
            prj.setOptions(opt);
            await prj.clean();
        }
        const starterFile=prj.getDir().rel(starter.name);
        if (!starterFile.exists()) {
            starterFile.text(starter.content);
            ide.refreshRunMenu();
        }
        ide.jump(starterFile);
    };
});
