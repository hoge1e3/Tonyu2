define(function (require, exports) {
    const Util=require("Util");
    const root=require("root");
	let origin;
	exports.init=()=>new Promise(succ=>{
		const p_getSelfOrigin=Math.random()+"";
		root.addEventListener("message", originHandler);
		root.postMessage({type:p_getSelfOrigin});
		function originHandler(e) {
			console.log(e);
			switch (e.data.type) {
			case p_getSelfOrigin:
				origin=e.origin;
				root.removeEventListener("message",originHandler);
				initInstance();
				succ(origin);
				break;
			}
		}
		function initInstance() {
			const senderOrigin=Util.getQueryString(PARAM_SENDER_ORIGIN);
            const senderID=Util.getQueryString(PARAM_SENDER_ID);
			if (senderOrigin) {
				exports.receiver=new MesgReceiver(senderOrigin, senderID);
			}
		}
	});
	const PARAM_SENDER_ORIGIN="sender_origin", SYM_USER_MESG="user_mesg",PARAM_SENDER_ID="sender_id";
	class MesgSender {
		constructor() {
			this.init();
		}
		init() {
			this.id=Math.random()+"";
			this.handler=e=>{
				console.log(e);
				switch (e.data.type) {
				case "sendRequest":
					if (e.data.id===this.id) {
						this.receiver=e.source;
						this.receiverOrigin=e.origin;
						this.waitForReceiverSucc();
					}
					break;
				}
			};
            root.addEventListener("message",this.handler);
		}
		waitForReceiver() {
			return new Promise((s)=> {
				this.waitForReceiverSucc=s;
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
		constructor(o,id) {
			this.senderOrigin=o;
			this.senderID=id;
			this.init();
		}
		init() {
			this.postMessage({type:"sendRequest"});
			root.addEventListener("message", e=>{
				console.log(e);
				const data=e.data;
				if (data[SYM_USER_MESG]) {
					this.waitForSenderSucc(e);
				}
			});
		}
		waitForSender() {
			return new Promise((s)=> {
				this.waitForSenderSucc=s;
			});
		}
		postMessage(message){
			message.id=this.senderID;
			root.opener.postMessage(message, this.senderOrigin );
		}
	}
    exports.createSender=()=>new MesgSender();
});
