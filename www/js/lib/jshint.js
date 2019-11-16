define([],function () {
    var colon=":";
    return {
        Function: Function,
        use: function () {},
        scriptURL: function (url) {
            return "javascript"+colon+url;
        }
    };
});
