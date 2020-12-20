define(function (require, exports) {
    const Util=require("Util");
    const root=require("root");
    const EventHandler=require("EventHandler");
    let origin;
	exports.init=()=>new Promise(succ=>{
		const p_getSelfOrigin=Math.random()+"";
		root.addEventListener("message", originHandler);
		root.postMessage({type:p_getSelfOrigin});
		function originHandler(e) {
			//console.log(e);
			switch (e.data.type) {
			case p_getSelfOrigin:
				origin=e.origin;
			    console.log("Origin set", origin);
				root.removeEventListener("message",originHandler);
				initInstance();
				succ(origin);
				break;
			}
		}
		function initInstance() {
			const senderOrigin=Util.getQueryString(PARAM_SENDER_ORIGIN);
            const senderID=Util.getQueryString(PARAM_SENDER_ID);
			if (senderOrigin && senderID) {
				exports.receiver=new MesgReceiver(senderOrigin, senderID);
			}
		}
	});
	const PARAM_SENDER_ORIGIN="sender_origin", SYM_USER_MESG="user_mesg",
    PARAM_SENDER_ID="sender_id",PARAM_SENDER_ID_POST="id", TYPE_RECEIVER_READY="sendRequest";
	class MesgSender {
		constructor(params) {
            params=params||{};
            if (params.peer==="window") {
                this.peerGenerator=url=>window.open(url);
            } else if (params.peer==="iframe") {
                this.peerGenerator=url=>{
                    const i=document.createElement("iframe");
                    i.setAttribute("src",url);
                    i.setAttribute("style","border: 0px;");
                    i.setAttribute("width",0);
                    i.setAttribute("height",0);
                    document.body.appendChild(i);
                    return i;
                };
            } else if (typeof this.peerGenerator==="function"){
                this.peerGenerator=params.peer;
            } else {
                this.peerGenerator=()=>null;
            }
            this.url=params.url;
            this.eventHandler=new EventHandler();
			this.init();
		}
        on(...args) {return this.eventHandler.on(...args);}
        fire(...args) {return this.eventHandler.fire(...args);}
		init() {
            return new Promise(s=>{
                this.id=Math.random()+"";
    			this.handler=e=>{
    				//console.log(e);
                    if (e.data[PARAM_SENDER_ID_POST]!==this.id) return;
                    switch (e.data.type) {
    				case TYPE_RECEIVER_READY:
    					this.receiver=e.source;
    					this.receiverOrigin=e.origin;
    					this.fire("ready");
                        s(this);
    					break;
                    default:
                        this.fire("message",e);
    				}
    			};
                root.addEventListener("message",this.handler);
                if(this.url) {
                    this.peer=this.peerGenerator(this.genURL(this.url));
                }
            });
		}
		waitForReceiver() {
			return new Promise((s)=> {
                this.on("ready",s);
			});
		}
		postMessage(mesg) {
			mesg[SYM_USER_MESG]=true;
			this.receiver.postMessage(mesg, this.receiverOrigin);
		}
		genURL(url) {
			if (url.match(/\?/)) url+="&"; else url+="?";
			url+=PARAM_SENDER_ORIGIN+"="+origin+"&"+PARAM_SENDER_ID+"="+this.id;
			return url;
		}
        dispose() {
            root.removeEventListener("message",this.handler);
        }
	}
	class MesgReceiver {
		constructor(o,senderID) {
			this.senderOrigin=o;
			this.senderID=senderID;
			this.init();
            this.eventHandler=new EventHandler();
		}
        on(...args) {return this.eventHandler.on(...args);}
        fire(...args) {return this.eventHandler.fire(...args);}
		init() {
			this.postMessage({type:TYPE_RECEIVER_READY});
			root.addEventListener("message", e=>{
				//console.log(e);
				const data=e.data;
				if (data[SYM_USER_MESG]) {
					this.eventHandler.fire("message",e);
				}
			});
		}
		waitForSender() {
			return new Promise((s)=> {
                const h=this.on("message", r=>{
                    h.remove();
                    s(r);
                });
			});
		}
		postMessage(message){
			message[PARAM_SENDER_ID_POST]=this.senderID;
			(root.opener||root.parent).postMessage(message, this.senderOrigin );
		}
	}
    exports.createSender=params=>new MesgSender(params);
});
