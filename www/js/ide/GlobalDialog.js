define(["UI","Klass","R"], function (UI,Klass,R) {
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
            t.dom=UI("div",{title:R("globalVariables")},
                ["ul",
                ["li",R("theseGlobalVariablesAreInitializedOnStart")],
                  ["li",R("variablesShouldBeStringOrJSON")]
                  //["li","JSONとして解釈できない場合は，前後にダブルクォーテーションを自動的に追加し，文字列とみなします．"]
                ],
                ["div",{$var:"editor",css:{height:"350px","overflow-y":"scroll"}}],
                ["div",["button",{on:{click:t.$bind.save}},R("save")]]
            );
            t.vars=$.data(t.dom,"vars");
            console.log(t.vars,t.dom.$vars);
            t.editor=t.vars.editor;
            var params = {
                placeHolderKey:R("varableName"),
                placeHolderValue:R("value"),
                toggleButton: null,
                deleteButton:'<img class="deleteButton" src="images/delete.png">'
            };
            t.editor.keyvalueeditor('init',params);
            t.editor.on('change', '.keyvalueeditor-key', function () {
                var val=this.value;
                if (!val.match(/^[a-zA-Z0-9_$]+$/)) {
                    alert(R("varableNameShouldBeAlphabetOrNumber"));
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
                        alert(R("cannotBeParsedAsValue")+
                        R("ifYouWantContainDoubleQuoteAsTheValue")+
                        R("ifYouWantContainBackslash")
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
