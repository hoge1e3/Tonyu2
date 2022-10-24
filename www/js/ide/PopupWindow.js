define(function(require, exports, module) {
    function f2s(feature) {
        return "popup,"+Object.keys(feature).map((k)=>`${k}=${feature[k]}`).join(",");
    }
    let keys={
        "screenLeft": "left",
        "screenTop":"top",
        "innerWidth":"width", 
        "innerHeight":"height",
    };
    module.exports=class {
        constructor(url, feature={left:50, top:50, width:465,height:465}) {
            this.url=url;
            this.feature=feature;
            this.window=window.open(url,"_blank",f2s(feature));
            this.setHandlers();       
            setInterval(this.watch.bind(this), 100);
        }
        reopen() {
            if (!this.window.closed) {
                this.window.location.reload();
                return this.focus();
            }
            this.window=window.open(this.url,"_blank",f2s(this.feature));     
            this.setHandlers();       
        }
        setHandlers() {
            this.handleClose();
            this.wasOpened=this.window;
            /*this.window.addEventListener("load", ()=>{
                console.log("Onload handler start");
                this.window.addEventListener("unload", ()=>{
                    console.log("unload handler start", this.beforeClose);
                    if (this.beforeClose) this.beforeClose();
                });
            });*/
        }
        focus() {
            this.window.focus();
        }
        handleClose() {
            if (!this.wasOpened) return;
            if (this.beforeClose) this.beforeClose(this.wasOpened);
            this.wasOpened=null;
        }
        watch() {
            if (this.window.closed) {
                this.handleClose();
                return;
            }
            if (!this.state){ 
                this.state=this.getState();
            }
            let ns=this.getState();
            let changed=false;
            for (let k of Object.keys(keys) ) {
                let fk=keys[k];
                let dif=ns[k]-this.state[k];
                this.feature[fk]+=dif;
                if (dif!=0) changed=true;
            }
            if (changed) console.log("F", f2s(this.feature));
            this.state=ns;
        }
        getState() {
            let res={};
            for (let k of Object.keys(keys) ) {
                res[k]=this.window[k];
            }
            return res;
        }
    };
});