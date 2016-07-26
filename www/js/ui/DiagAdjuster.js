define([],function () {
    var DiagAdjuster=function (diagElem) {
        this.diagElem=diagElem;
        this.rszt=null;
        this.space=30;
        this.timeout=100;
    };
    DiagAdjuster.prototype.handleResize=function () {
        var d=this.diagElem.closest(".ui-dialog");
        var t=d.find(".ui-dialog-titlebar");
        var dw=d.width(),dh=d.height(),th=t.height();
        var pad=this.space;
        var sz={w:dw-pad, h:dh-th-pad};
        if (this.rszt) clearTimeout(this.rszt);
        var self=this;
        this.rszt=setTimeout(function () {
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
