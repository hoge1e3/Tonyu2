define(["UI"], function (UI) {
    var Menu={};
    Menu.make=function (title, hier) {
        /*
           [{label:"main1",id:"main1",sub:[{label:"sub1", id:"sub1", action:f}]]
         */
        var ul1=UI("ul", {"class":"nav navbar-nav"});
        hier.forEach(function (mainMenuItem) {
            var li=UI("li",
                    ["a",{
                        href:(mainMenuItem.href||"#"),
                        id:mainMenuItem.id,
                        "class":(mainMenuItem.sub?"dropdown-toggle":null),
                        "data-toggle":(mainMenuItem.sub?"dropdown":null)
                    }, mainMenuItem.label]
            );
            ul1.append(li);
            if (mainMenuItem.sub) {
                var ul2=UI("ul",{"class":"dropdown-menu"});
                mainMenuItem.sub.forEach(function (subMenuItem) {
                    ul2.append(UI("li",
                        ["a", {
                             id:subMenuItem.id,
                             href:subMenuItem.href||"#",
                             on:{
                                 click:subMenuItem.action
                             }
                        },subMenuItem.label]
                    ));
                });
                li.append(ul2);
            }
        });
        var menu=UI("div",{"class":"collapse navbar-collapse"},ul1);
        $("body").append(UI(
          "div",{"class":"navbar navbar-inverse navbar-fixed-top",id:"navBar"},
                ["div",{"class":"container"},
                    ["div", {"class":"navbar-header"}
                        ["button",{type:"button", "class":"navbar-toggle",
                            "data-toggle":"collapse",
                            "data-target":".navbar-collapse"},
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}],
                            ["span",{"class":"icon-bar"}]
                        ],
                        ["a", {"class":"navbar-brand" ,href:"#"},title]
                    ],
                    menu
                ]
        ));
    };
    return Menu;
});