define([],function () {
    var DiagAdjuster=function (diagElem) {
        this.diagElem=diagElem;
        this.rszt=null;
        this.margin=30;
        this.timeout=100;
    };
    DiagAdjuster.prototype.handleResize=function () {
        var self=this;
        if (this.rszt) clearTimeout(this.rszt);
        this.rszt=setTimeout(function () {
            var d=self.diagElem.closest(".ui-dialog");
            var t=d.find(".ui-dialog-titlebar");
            var dw=d.width(),dh=d.height(),th=t.height();
            var pad=self.margin;
            var sz={w:dw-pad, h:dh-th-pad};
            self.diagElem.css({width:sz.w,height:sz.h});
            self.afterResize(self.diagElem);
        },this.timeout);
    };
    DiagAdjuster.prototype.handleResizeF=function () {
        var self=this;
        return function () {
            self.handleResize();    
        };
    };
    DiagAdjuster.prototype.afterResize=function (){};
    return DiagAdjuster;
});
