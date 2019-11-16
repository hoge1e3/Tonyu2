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
        highlight1.update = customUpdateWithOverlay.call(
            highlight1,
            markerClass,
            range,
            mesg,
        );
        const marker1 = session.addDynamicMarker(highlight1);
        marker1.remove = () => session.removeMarker(marker1.id);
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
    function customUpdateWithOverlay(markerClass, markerRange, mesg) {
        return (html, markerLayer, session, config) => {
            //console.log(html, markerLayer, session, config);
            const markerElement = getMarkerHTML(html, markerLayer, session, config, markerRange, markerClass);
            //console.log(markerHTML);
            //const markerElement = markerLayer2.element;//$.parseHTML(markerHTML.join(''))[0];
            $(markerElement).css('pointer-events', 'auto');
            $(markerElement).mouseenter(() => {
                //console.log(mesg, markerElement);
                const o = $(markerElement).offset();
                //console.log(o);
                popup.show();
                popup.text(mesg).css({
                    left: o.left + "px",
                    top: (o.top - popup.height()) + "px"
                });
            });
            $(markerElement).mouseleave(() => popup.hide());
            //markerLayer.element.appendChild(markerElement);
        };
    }
});
