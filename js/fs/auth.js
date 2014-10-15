define(["WebSite"],function (WebSite) {
    var auth={};
    auth.currentUser=function (onend) {
        $.get(WebSite.serverTop+"currentUser", function (res) {
            if (res=="null") res=null;
            onend(res);
        });
    };
    auth.assertLogin=function (options) {
        /*if (typeof options=="function") options={complete:options};
        if (!options.confirm) options.confirm="この操作を行なうためにはログインが必要です．ログインしますか？";
        if (typeof options.confirm=="string") {
            var mesg=options.confirm;
            options.confirm=function () {
                return confirm(mesg);
            };
        }*/
        auth.currentUser(function (user) {
            if (user) {
                return options.success(user);
            }
            window.onLoggedIn=options.success;
            options.showLoginLink(WebSite.serverTop+"login");
        });
    };
    window.Auth=auth;
    return auth;
});