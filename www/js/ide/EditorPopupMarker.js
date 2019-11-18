define(function(require, exports) {
    //const root=require("root");
    //const ace=root.ace;
    const popup = $("<div>").attr({class: "errorTip"}).css({
        position: "absolute",
        left: "0px",
        top: "0px",
    }).appendTo("body").hide();
    //const Range = ace.require('ace/range').Range;
    exports.mark = (editor, range, markerClass, mesg) => {
        const session=editor.getSession();
        const doc=session.doc;
        range.start = doc.createAnchor(range.start);
        range.end = doc.createAnchor(range.end);
        const highlight1 = {};
        highlight1.update = (html, markerLayer, session, config) => {
            const markerElement = getMarkerHTML(html, markerLayer, session, config, range, markerClass);
            $(markerElement).css('pointer-events', 'auto');
            $(markerElement).mouseenter(() => {
                const o = $(markerElement).offset();
                popup.show();
                popup.$showing=highlight1;
                popup.text(mesg).css({
                    left: o.left + "px",
                    top: (o.top - popup.height()) + "px"
                });
            });
            //console.log(range.start);
            //const p=session.documentToScreenPosition(range.start.row, range.start.column);
            //console.log(p);
            //session.addGutterDecoration(range.start.row,"errorGutter");
            $(markerElement).mouseleave(() => popup.hide());
        };
        const marker1 = session.addDynamicMarker(highlight1, true);
        marker1.remove = () => {
            session.removeMarker(marker1.id);
            if (popup.$showing===highlight1) popup.hide();
        };
        return marker1;
    };

    function getMarkerHTML(html, markerLayer, session, config, range, markerClass) {
        const stringBuilder = [];
        let marked;
        if (range.isMultiLine()) {
            marked=markerLayer.drawTextMarker(stringBuilder, range, markerClass, config);
        } else {
            marked=markerLayer.drawSingleLineMarker(stringBuilder, range, `${markerClass} ace_start ace_br15`, config);
        }
        //console.log("ML",marked);
        return marked;
        //return stringBuilder;
    }
});
