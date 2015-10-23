/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
TextUtil = function () {

    var $ = {};
    var _top = {
        __ie: navigator.userAgent.indexOf("MSIE") != -1
    };


    function $conv(id) {
        if (typeof (id) == "string") return document.getElementById(id);
        return id;
    }

    function attachIndentAdaptor(_elem) {
        function addEventListener(elem, type, func) {
            if (_top.__ie) {
                elem.attachEvent("on" + type, func);
            } else {
                elem.addEventListener(type, func, false);
            }
        }
        var elem = $conv(_elem);
        if (!elem) throw "Element " + _elem + " Not found ";
        var nextInd = false;
        var indDepth = "";
        addEventListener(elem, "keydown", function (e) {
            //var t=document.getElementById("a");
            //document. addEventlistener("keydown",t);
            if (e.keyCode == 13) {
                nextInd = true;
                var pos = getCaretPos(elem);
                var spos=pos;
                var t = elem;
                pos--;
                while (pos > 0) {
                    if (t.value.charCodeAt(pos) == 10) break;
                    pos--;
                }
                pos++;
                var len = t.value.length;
                indDepth = "";
                while (pos < len) {
                    if (t.value.charCodeAt(pos) != 32) break;
                    pos++;
                    indDepth += " ";
                }
                if (!_top.__ie) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelText(elem, "\n" + indDepth);
                    nextInd = false;
                } else {
                    e.returnValue = false;
                    e.cancelBubble = true;
                    setSelText(elem, "\n" + indDepth);
                    //console.log(spos+","+(spos+ 1+ indDepth.length) );
                    setRange(elem, spos+ 1+ indDepth.length);
                    nextInd = false;
                }
            }
        });
        addEventListener(elem, "keyup", function (e) {
            if (nextInd) {
                //document.title=indDepth.length;
                setSelText(elem, indDepth);
                nextInd = false;
            }
        });
    }
    $.attachIndentAdaptor = attachIndentAdaptor;

    function indent(elem, instr) {
        var s = $conv(elem);
        var rng = getCaretRange(s);
        var st = caretPos2RowCol(s, rng.start);
        var en = caretPos2RowCol(s, rng.end);
        var lines = s.value.split(/\n/);
        var buf = "",
            lineNo = 1;
        lines.forEach(function (line) {
            if (lineNo >= st.row && lineNo <= en.row) {
                buf += instr;
            }
            buf += line + "\n";
            lineNo++;
        });
        s.value = buf;
    }
    $.indent = indent;

    function dedent(elem, len, spacePat) {
        var s = $conv(elem);
        if (!spacePat) spacePat = /^\s*/;
        var rng = getCaretRange(s);
        var st = caretPos2RowCol(s, rng.start);
        var en = caretPos2RowCol(s, rng.end);
        var lines = s.value.split(/\n/);
        var buf = "",
            lineNo = 1;
        lines.forEach(function (line) {
            if (lineNo >= st.row && lineNo <= en.row) {
                line.match(spacePat);
                var head = RegExp.lastMatch;
                var tail = RegExp.rightContext;
                head = head.substring(0, head.length - len);
                line = head + tail;
            }
            buf += line + "\n";
            lineNo++;
        });
        s.value = buf;
    }
    $.dedent = dedent;


    function caretPos2RowCol(elem, pos) {
        elem = $conv(elem);
        var str = elem.value;
        str = str.replace(/\r/g, "");
        var lines = str.split(/\n/);
        var i = 0;
        var res = {
            row: 1,
            col: 1
        };
        while (i < lines.length) {
            var len = lines[i].length + 1;
            pos -= len;
            if (pos >= 0) {
                res.row++;
                i++;
            } else {
                pos += len;
                res.col = pos;
                break;
            }
        }
        return res;
    }
    $.caretPos2RowCol = caretPos2RowCol;

    function lineCount(elem) {
        elem = $conv(elem);
        var str = elem.value;
        str = str.replace(/\r/g, "");
        var lines = str.split(/\n/);
        return lines.length;
    }

    function getCaretRange(elem) {
        var __self = this;
        elem = $conv(elem);
        if (_top.__ie) {
            var s = elem;
            if (document.selection) {
                var range = document.selection.createRange();
                var stored_range = range.duplicate();
                stored_range.moveToElementText(s);
                stored_range.setEndPoint('EndToEnd', range);
                var start = stored_range.text.length - range.text.length;
                var length = range.text.length;
                return {
                    start: start,
                    end: start + length,
                    length: length
                };
            }
        } else {
            var s = elem;
            if (s == undefined) alert("atextrange getcaretpos not found " + id);
            //s.setSelectionRange(s.value.length,s.value.length);
            var start = s.selectionStart;
            var length = s.selectionEnd - s.selectionStart;
            return {
                start: start,
                end: start + length,
                length: length
            };
        }
    }
    $.getCaretRange = getCaretRange;

    function getCaretPos(elem) {
        return getCaretRange(elem).start;
        var __self = this;
        elem = $conv(elem);
        if (_top.__ie) {
            var s = elem;
            if (document.selection) {
                var range = document.selection.createRange();
                var stored_range = range.duplicate();
                stored_range.moveToElementText(s);
                stored_range.setEndPoint('EndToEnd', range);
                var start = stored_range.text.length - range.text.length;
                var length = range.text.length;
                return start;
            }
        } else {
            var s = elem;
            if (s == undefined) alert("atextrange getcaretpos not found " + id);
            //s.setSelectionRange(s.value.length,s.value.length);
            this.start = s.selectionStart;
            this.length = s.selectionEnd - s.selectionStart;
            return this.start;
        }
    }
    $.getCaretPos = getCaretPos;

    function setSelText(elem, text) {
        if (_top.__ie) {
            var r = document.selection.createRange();
            r.text = text;
        } else {
            var s = $conv(elem);
            var scrollPos = s.scrollTop;
            var cont = s.value;
            var b = cont.substring(0, s.selectionStart) + text;
            s.value = b + cont.substring(s.selectionEnd);
            s.setSelectionRange(b.length, b.length);
            s.scrollTop = scrollPos;
            //alert("["+cont+"]");
        }
    }
    $.setSelText = setSelText;


    function setRange(elem, from, to) {
        var s = $conv(elem);
        if (s == undefined) throw elem + " not found";
        if (_top.__ie) {
            var r = s.createTextRange();
            //alert(r);
            r.move("character", from);
            r.select();
        } else {
            s.focus();
            s.setSelectionRange(from, to);
            s.focus(); //select();
            var rc = caretPos2RowCol(s, from);
            s.scrollTop = s.scrollHeight * rc.row / lineCount(s);
        }
    }
    $.setRange = setRange;
    return $;
}();