define(["WebSite"],function (WebSite) {
    var auth={};
    auth.currentUser=function (onend) {
        $.get(WebSite.serverTop+"currentUser", function (res) {
            if (res=="null") res=null;
            onend(res);
        });
    };
    window.Auth=auth;
    return auth;
});