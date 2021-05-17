define(function (require, exports) {
    const WebSite=require("WebSite");
    const Tonyu=require("Tonyu");
    Tonyu.urlTrailer=exports;
    exports.put=function(url) {
        if (!WebSite.tonyu_app_version) return url;
        if (url.match(/^data:/)) return url;
        const sep=url.match(/[&\?]$/) ? "" : (url.match(/\?/) ? "&" :"?");
        return `${url}${sep}${WebSite.tonyu_app_version||""}`;
    };
});
