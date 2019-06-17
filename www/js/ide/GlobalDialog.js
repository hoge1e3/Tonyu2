define(["UI","Klass"], function (UI,Klass) {
    GlobalDialog=Klass.define({
        $this:true,
        $:["prj"],
        show: function (t,options) {
            t.opt=t.prj.getOptions();
            t.createDOM();
            t.load();
            t.dom.dialog({width:800,height:500});
        },
        load: function (t) {
            if (!t.opt.run) t.opt.run={};
            if (!t.opt.run.globals) t.opt.run.globals={};
            var g=t.opt.run.globals;
            var params=[];
            for (var k in g) {
                params.push({key:k,value:JSON.stringify(g[k])});
            }
            t.editor.keyvalueeditor("reset",params);
        },
        createDOM:function (t) {
            if (t.dom) return t.dom;
            t.dom=UI("div",{title:"グローバル変数設定"},
                ["ul",
                ["li","実行時に，これらのグローバル変数が指定した値に初期化されます．"],
                  ["li","「値」欄には文字列またはJSON形式で記入してください．"]
                  //["li","JSONとして解釈できない場合は，前後にダブルクォーテーションを自動的に追加し，文字列とみなします．"]
                ],
                ["div",{$var:"editor",css:{height:"350px","overflow-y":"scroll"}}],
                ["div",["button",{on:{click:t.$bind.save}},"保存"]]
            );
            t.vars=$.data(t.dom,"vars");
            console.log(t.vars,t.dom.$vars);
            t.editor=t.vars.editor;
            var params = {
                placeHolderKey:"グローバル変数名",
                placeHolderValue:"値",
                toggleButton: null,
                deleteButton:'<img class="deleteButton" src="images/delete.png">'
            };
            t.editor.keyvalueeditor('init',params);
            t.editor.on('change', '.keyvalueeditor-key', function () {
                var val=this.value;
                if (!val.match(/^[a-zA-Z0-9_$]+$/)) {
                    alert("変数名には半角英数字を使ってください");
                    return;
                }
                if (!val.match(/^\$/)) {
                    this.value="$"+this.value;
                }
                t.getValuesA();
            });
            t.editor.on('change', '.keyvalueeditor-value', function (e) {
                var val=this.value;
                try {
                    var o=JSON.parse(val);
                    this.value=JSON.stringify(o);
                } catch (ex) {
                    var qval=JSON.stringify(val);
                    if (qval==='"'+val+'"') this.value=qval;
                    else {
                        alert("解釈できない値です．この値をそのまま文字列として登録したい場合，前後をダブルクォーテーションで囲ってください．\n"+
                        "ダブルクォーテーション自身を文字列に含める場合は \\\" と書いてください．\n"+
                        "\\自身を文字列に含める場合は \\\\ と書いてください．\n"
                        );
                        e.stopPropagation();
                    }
                }
                t.getValuesA();
            });
            return t.dom;
        },
        save: function (t) {
            var res=t.getValuesA();
            if (res) {
                t.opt.run.globals=res;
                t.prj.setOptions(t.opt);
                t.dom.dialog("close");
            }
        },
        getValuesA: function (t) {
            try {
                return t.getValues();
            } catch(e) {
                console.error(e.stack);
                alert(e);
            }
        },
        getValues: function (t) {
            var vs=t.editor.keyvalueeditor("getValues");
            var res={};
            vs.forEach(function (v) {
                if (v.key in res) throw new Error("変数名'"+v.key+"'が重複しています．");
                if (!v.key.match(/^\$[a-zA-Z0-9_$]*$/)) {
                    throw new Error("変数名'"+v.key+"'はグローバル変数名として使えません．");
                }
                try {
                    res[v.key]=JSON.parse(v.value);
                } catch (e) {
                    res[v.key]=v.value;
                }
            });
            return res;
        }
    });
    return GlobalDialog;
});
