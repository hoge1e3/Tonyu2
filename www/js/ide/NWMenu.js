(function () {
    var ifrm;// <iframe> element in parent window
    if (typeof process!="object") return {};
    function Menu(cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui')
        , menu = new gui.Menu()

        , cut = new gui.MenuItem({
            label: cutLabel || "Cut"
            , click: function() {
                document.execCommand("cut");
                console.log('Menu:', 'cutted to clipboard');
            }
        })

        , copy = new gui.MenuItem({
            label: copyLabel || "Copy"
            , click: function() {
                document.execCommand("copy");
                console.log('Menu:', 'copied to clipboard');
            }
        })

        , paste = new gui.MenuItem({
            label: pasteLabel || "Paste"
            , click: function() {
                document.execCommand("paste");
                console.log('Menu:', 'pasted to textarea');
            }
        })
        ;

        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    var menu = new Menu(/* pass cut, copy, paste labels if you need i18n*/);
    $(document).on("contextmenu", function(e) {
        e.preventDefault();
        var p={left:0,top:0};
        if (ifrm) {
            p=parent.$(ifrm).offset();
            console.log(p);
        }
        menu.popup(e.originalEvent.x+ Math.floor(p.left), e.originalEvent.y+Math.floor(p.top));
    });

    try {
        var gui = require('nw.gui');
        win = gui.Window.get();
        var nativeMenuBar = new gui.Menu({ type: "menubar" });
        nativeMenuBar.createMacBuiltin("My App");
        win.menu = nativeMenuBar;
    } catch (ex) {
        console.log(ex.message);
    }
    if (parent) {
        parent.$("iframe").each(function () {
            var fDoc = this.contentDocument || this.contentWindow.document;
            if (fDoc===document) {
                ifrm=this;
            }
        });
    }
    return {};
})();