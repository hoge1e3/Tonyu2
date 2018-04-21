// https://github.com/hoge1e3/jQuery-KeyValue-Editor
// Forked from: https://github.com/a85/jQuery-KeyValue-Editor
(function ($) {

    var methods = {
        //Not sure if this is needed
        settings:function () {
        },

        //Initialization
        init:function (options) {
            methods.settings = $.extend({}, $.fn.keyvalueeditor.defaults, options);

            return this.each(function () {
                var $this = $(this);
                var data = $this.data('keyvalueeditor');

                //Not already initialized
                if (!data) {
                    data = {
                        settings:methods.settings,
                        editor:$this
                    };

                    if (data.settings.editableKeys) {
                        var toggleA = methods.getToggleLink(data);
                        var textareaDiv="<div id='keyvalueeditor-textarea-div' style='display:none'><textarea id='keyvalueeditor-textarea' rows='6' cols='55'></textarea></div>";
                        var h = "<div id='keyvalueeditor-form-div'>" + methods.getLastRow(data); + "</div>";
                        $this.append(toggleA);
                        $this.append(textareaDiv);
                        $this.append(h);
                    }

                    $this.on("focus.keyvalueeditor", '.keyvalueeditor-last', data, methods.focusEventHandler);
                    $this.on("focus.keyvalueeditor", '.keyvalueeditor-row input', data, methods.rowFocusEventHandler);
                    $this.on("blur.keyvalueeditor", '.keyvalueeditor-row input', data, methods.blurEventHandler);
                    $this.on("blur.keyvalueeditor", '#keyvalueeditor-textarea', data, methods.blurEventHandlerTextArea);
                    $this.on("change.keyvalueeditor", '.keyvalueeditor-valueTypeSelector ', data, methods.valueTypeSelectEventHandler);
                    $this.on("click.keyvalueeditor", '.keyvalueeditor-delete', data, methods.deleteRowHandler);
                    $this.on("click.keyvalueeditor", '.keyvalueeditor-toggle', data, methods.toggleRowHandler);

                    $(this).data('keyvalueeditor', data);
                }
            });
        },

        getLastRow:function (state) {
            var settings = state.settings;
            var pKey = settings.placeHolderKey;
            var pValue = settings.placeHolderValue;
            var valueTypes = settings.valueTypes;

            var key = "";
            var value = "";

            var h;
            h = '<div class="keyvalueeditor-row keyvalueeditor-last">';
            h += '<input tabindex="-1" type="checkbox" class="keyvalueeditor-rowcheck" checked="checked">  ';
            h += '<input type="text" class="keyvalueeditor-key" placeHolder="' + pKey
                + '" name="keyvalueeditor-key"'
                + '"/>';
            h += '<input type="text" class="keyvalueeditor-value keyvalueeditor-value-text" placeHolder="' + pValue
                + '" name="keyvalueeditor-value"'
                + '"/>';

            if ($.inArray("file", valueTypes) >= 0) {
                h += '<input type="file" multiple class="keyvalueeditor-value keyvalueeditor-value-file" placeHolder="' + pValue
                    + '" name="keyvalueeditor-value'
                    + '" value="' + value
                    + '" style="display: none;"/>';

                h += '<select class="keyvalueeditor-valueTypeSelector"><option value="text" selected>Text</option>' +
                    '<option value="file">File</option></select>';
            }

            h += '</div>';
            return h;
        },

        getNewRow:function (key, value, type, state) {
            var settings = state.settings;
            var pKey = settings.placeHolderKey;
            var pValue = settings.placeHolderValue;
            var valueTypes = settings.valueTypes;

            key = key ? key : "";
            value = value ? value : "";

            key = key.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            value = value.replace(/'/g, "&apos;").replace(/"/g, "&quot;");

            var h;

            h = '<div class="keyvalueeditor-row">';
            h += '<input tabindex="-1" type="checkbox" class="keyvalueeditor-rowcheck" checked="checked">  ';
            h += '<input type="text" class="keyvalueeditor-key" placeHolder="' + pKey
                + '" name="keyvalueeditor-' + key
                + '" value="' + key + '"';

            if (!settings.editableKeys) {
                h += ' data-editable="false"';
                h += ' readonly="readonly"';
                h += '/>';
            }
            else {
                h += '"/>';
            }

            if ($.inArray("file", valueTypes) >= 0) {
                if (type === "file") {
                    h += '<input type="text" class="keyvalueeditor-value keyvalueeditor-value-text" placeHolder="' + pValue
                        + '" name="keyvalueeditor-' + value
                        + '" value="' + value
                        + '" style="display: none;"/>';

                    h += '<input type="file" multiple class="keyvalueeditor-value keyvalueeditor-value-file" placeHolder="' + pValue
                        + '" name="keyvalueeditor-' + value
                        + '" value="' + value
                        + '"/>';

                    h += '<select class="keyvalueeditor-valueTypeSelector"><option value="text">Text</option>' +
                        '<option value="file" selected>File</option></select>';
                }
                else {
                    h += '<input type="text" class="keyvalueeditor-value keyvalueeditor-value-text" placeHolder="' + pValue
                        + '" name="keyvalueeditor-' + value
                        + '" value="' + value
                        + '"/>';

                    h += '<input type="file" multiple class="keyvalueeditor-value keyvalueeditor-value-file" placeHolder="' + pValue
                        + '" name="keyvalueeditor-' + value
                        + '" value="' + value
                        + '" style="display: none;"/>';

                    h += '<select class="keyvalueeditor-valueTypeSelector"><option value="text" selected>Text</option>' +
                        '<option value="file">File</option></select>';
                }
            }
            else {
                h += '<input type="text" class="keyvalueeditor-value keyvalueeditor-value-text" placeHolder="' + pValue
                        + '" name="keyvalueeditor-' + value
                        + '" value="' + value
                        + '"/>';
            }

            h += methods.getDeleteLink(state);
            h += '</div>';
            return h;
        },

        getDeleteLink:function (state) {
            if (state.settings.editableKeys) {
                return '<a tabindex="-1" class="keyvalueeditor-delete">' + state.settings.deleteButton + '</a>';
            }
            else {
                return "";
            }
        },

        deleteRowHandler:function (event) {
            var parentDiv = $(this).parent().parent();

            var target = event.currentTarget;
            $(target).parent().remove();
            var data = event.data;
            data.settings.onDeleteRow();

            var currentFormFields = methods.getValues(parentDiv);
            $("#keyvalueeditor-textarea").val( methods.settings.formToTextFunction(currentFormFields) );
        },

        getToggleLink:function(state) {
          if (!state.settings.toggleButton) return "";
            return '<a tabindex="-1" class="keyvalueeditor-toggle">' + state.settings.toggleButton + '</a>';
        },

        toggleRowHandler:function (event) {
            $("#keyvalueeditor-textarea-div").toggle();
            $("#keyvalueeditor-form-div").toggle();
        },

        valueTypeSelectEventHandler:function (event) {
            var target = event.currentTarget;
            var valueType = $(target).val();
            var valueTypes = event.data.settings.valueTypes;
            for (var i = 0; i < valueTypes.length; i++) {
                $(target).parent().find('.keyvalueeditor-value').css("display", "none");
            }
            $(target).parent().find('input[type="' + valueType + '"]').css("display", "inline-block");
        },

        focusEventHandler:function (event) {
            var editableKeys = event.data.settings.editableKeys;

            if (!editableKeys) {
                return;
            }

            var params = {key:"", value:""};
            var editor = event.data.editor;
            $(this).removeClass('keyvalueeditor-last');
            var row = methods.getLastRow(event.data);
            if (event.data.settings.valueTypes.length > 1) {
                $(this).find('select:last').after(methods.getDeleteLink(event.data));
            }
            else {
                $(this).find('input:last').after(methods.getDeleteLink(event.data));
            }

            $(this).after(row);
        },

        rowFocusEventHandler:function (event) {
            var data = event.data;
            data.settings.onFocusElement(event);
        },

        blurEventHandler:function (event) {
            var data = event.data;
            data.settings.onBlurElement();

            var parentDiv = $(this).parent().parent();
            var currentFormFields = methods.getValues(parentDiv);
            $("#keyvalueeditor-textarea").val( methods.settings.formToTextFunction(currentFormFields) );

        },


        blurEventHandlerTextArea:function (event) {
            var data = event.data;

            var text = $(this).val();
            var newFields = data.settings.textToFormFunction(text);
            data.editor.keyvalueeditor('reset',newFields)

        },

        //For external use
        addParam:function (param, state) {
            if (typeof param === "object") {
                if(!("type" in param)) {
                    param.type = "text";
                }

                if (state.settings.editableKeys) {
                    $(state.editor).find('#keyvalueeditor-form-div .keyvalueeditor-last').before(methods.getNewRow(param.key, param.value, param.type, state));
                }
                else {
                    $(state.editor).find('#keyvalueeditor-form-div').append(methods.getNewRow(param.key, param.value, param.type, state));
                }

            }
        },

        //Check for duplicates here
        addParams:function (params, state) {
            if (!state) {
                state = $(this).data('keyvalueeditor');
            }

            var count = params.length;
            for (var i = 0; i < count; i++) {
                var param = params[i];
                methods.addParam(param, state);
            }
        },

        getValues:function (parentDiv) {
            if(parentDiv==null) {
                parentDiv=$(this);
            }
            var pairs = [];
            parentDiv.find('.keyvalueeditor-row').each(function () {
                var isEnabled = $(this).find('.keyvalueeditor-rowcheck').is(':checked');
                if(!isEnabled) {
                    return true;
                }
                var key = $(this).find('.keyvalueeditor-key').val();
                var value = $(this).find('.keyvalueeditor-value').val();
                var type = $(this).find('.keyvalueeditor-valueTypeSelector').val();

                if (type === undefined) {
                    type = "text";
                }

                if (key) {
                    var pair = {
                        key:key.trim(),
                        value:value.trim(),
                        type:type,
                        name: key
                    };

                    pairs.push(pair);
                }
            });

            return pairs;
        },

        getElements:function () {
            var rows = [];
            var state = $(this).data('keyvalueeditor');
            var valueTypes = state.settings.valueTypes;
            $(this).find('.keyvalueeditor-row').each(function () {
                var keyElement = $(this).find('.keyvalueeditor-key');
                var valueElement;
                var type = "text";
                if ($.inArray("file", valueTypes)) {
                    type = $(this).find('.keyvalueeditor-valueTypeSelector').val();
                    if (type === "file") {
                        valueElement = $(this).find('.keyvalueeditor-value-file');
                    }
                    else {
                        valueElement = $(this).find('.keyvalueeditor-value-text');
                    }
                }
                else {
                    valueElement = $(this).find('.keyvalueeditor-value-text');
                }


                if (keyElement.val()) {
                    var row = {
                        keyElement:keyElement,
                        valueElement:valueElement,
                        valueType:type
                    };

                    rows.push(row);
                }
            });
            return rows;
        },

        clear:function (state) {
            $(state.editor).find('.keyvalueeditor-row').each(function () {
                $(this).remove();
            });
            $("#keyvalueeditor-form-div").val("");
            if (state.settings.editableKeys) {
                var h = methods.getLastRow(state);
                $(state.editor).find("#keyvalueeditor-form-div").append(h);
            }

        },

        reset:function (params, state) {
            if(state==null) {
                state = $(this).data('keyvalueeditor');
            }
            methods.clear(state);
            if (params) {
                methods.addParams(params, state);
            }

            state.settings.onReset();
        },

        add:function (params) {
            var state = $(this).data('keyvalueeditor');
            methods.clear(state);
            if (params) {
                methods.addParams(params, state);
            }
        },

        destroy:function () {
            return this.each(function () {
                //unbind listeners if needed
            });
        }
    };

    $.fn.keyvalueeditor = function (method) {
        //Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.keyvalueeditor');
        }
    };

    $.fn.keyvalueeditor.defaults = {
        type:"normal",
        fields:2,
        deleteButton:"Delete",
        toggleButton:"Toggle view",
        placeHolderKey:"Key",
        placeHolderValue:"Value",
        valueTypes:["text"],
        editableKeys:true,
        onInit:function () {
        },
        onReset:function () {
        },
        onFocusElement:function () {
        },
        onBlurElement:function () {
        },
        onDeleteRow:function () {
        },
        onAddedParam:function () {
        },
        textToFormFunction:function(text) {
            var lines = text.split("\n");
            var numLines = lines.length;
            var newHeaders=[];
            var i;
            for(i=0;i<numLines;i++) {
                var newHeader={};
                var thisPair = lines[i].split(":");
                if(thisPair.length!=2) {
                    console.log("Incorrect format for " + lines[i]);
                    continue;
                }
                newHeader["key"]=newHeader["name"]=thisPair[0].trim();
                newHeader["type"]="text";
                newHeader["value"]=thisPair[1].trim();
                newHeaders.push(newHeader);
            }
            return newHeaders;
        },
        formToTextFunction:function(arr) {
            var text="";
            var len = arr.length;
            var i=0;
            for(i=0;i<len;i++) {
                text+=arr[i]["key"]+": "+arr[i]["value"]+"\n";
            }
            return text;
        }
    };

})(jQuery);
