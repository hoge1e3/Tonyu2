define([],function () {
    var auth={};
    auth.currentUser=function (onend) {
        $.get("../../edit/currentUser", function (res) {
            if (res=="null") res=null;
            onend(res);
        });
    };
    window.Auth=auth;
    return auth;
});