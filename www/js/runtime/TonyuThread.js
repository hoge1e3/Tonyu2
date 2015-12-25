define(["Class"],function (Class) {
    var cnts={enterC:{},exitC:0};
    try {window.cnts=cnts;}catch(e){}
    var TonyuThread=Class({
        initialize: function TonyuThread() {
            this.frame=null;
            this._isAlive=true;
            this.cnt=0;
            this._isWaiting=false;
            this.fSuspended=false;
            this.tryStack=[];
            this.preemptionTime=60;
        },
        isAlive:function isAlive() {
            return this.frame!=null && this._isAlive;
        },
        isWaiting:function isWaiting() {
            return this._isWaiting;
        },
        suspend:function suspend() {
            this.fSuspended=true;
            this.cnt=0;
        },
        enter:function enter(frameFunc) {
            //var n=frameFunc.name;
            //cnts.enterC[n]=(cnts.enterC[n]||0)+1;
            this.frame={prev:this.frame, func:frameFunc};
        },
        apply:function apply(obj, methodName, args) {
            if (!args) args=[];
            var method;
            if (typeof methodName=="string") {
                method=obj["fiber$"+methodName];
            }
            if (typeof methodName=="function") {
                method=methodName.fiber;
            }
            args=[this].concat(args);
            var pc=0;
            return this.enter(function () {
                switch (pc){
                case 0:
                    method.apply(obj,args);
                    pc=1;break;
                case 1:
                    args[0].exit();
                    pc=2;break;
                }
            });
        },
        step: function step() {
            if (this.frame) {
                try {
                    this.frame.func(this);
                } catch(e) {
                    this.gotoCatch(e);
                }
            }
        },
        gotoCatch: function gotoCatch(e) {
            var fb=this;
            if (fb.tryStack.length==0) {
                fb.kill();
                fb.handleEx(e);
                return;
            }
            fb.lastEx=e;
            var s=fb.tryStack.pop();
            while (fb.frame) {
                if (s.frame===fb.frame) {
                    fb.catchPC=s.catchPC;
                    break;
                } else {
                    fb.frame=fb.frame.prev;
                }
            }
        },
        startCatch: function startCatch() {
            var fb=this;
            var e=fb.lastEx;
            fb.lastEx=null;
            return e;
        },
        exit: function exit(res) {
            //cnts.exitC++;
            this.frame=(this.frame ? this.frame.prev:null);
            this.retVal=res;
        },
        enterTry: function enterTry(catchPC) {
            var fb=this;
            fb.tryStack.push({frame:fb.frame,catchPC:catchPC});
        },
        exitTry: function exitTry() {
            var fb=this;
            fb.tryStack.pop();
        },
        waitEvent: function waitEvent(obj,eventSpec) { // eventSpec=[EventType, arg1, arg2....]
            var fb=this;
            fb.suspend();
            if (!obj.on) return;
            var h;
            eventSpec=eventSpec.concat(function () {
                fb.lastEvent=arguments;
                fb.retVal=arguments[0];
                h.remove();
                fb.steps();
            });
            h=obj.on.apply(obj, eventSpec);
        },
        runAsync: function runAsync(f) {
            var fb=this;
            var succ=function () {
                fb.retVal=arguments;
                //console.log("succ",fb.retVal);
                fb.steps();
            };
            var err=function () {
                var msg="";
                for (var i=0; i<arguments.length; i++) {
                    msg+=arguments[i]+",";
                }
                if (msg.length==0) msg="Async fail";
                var e=new Error(msg);
                e.args=arguments;
                fb.gotoCatch(e);
                fb.steps();
            };
            fb.suspend();
            setTimeout(function () {
                f(succ,err);
            },0);
        },
        waitFor: function waitFor(j) {
            var fb=this;
            fb._isWaiting=true;
            fb.suspend();
            if (!j) return;
            /*if (j.addTerminatedListener) j.addTerminatedListener(function () {
                fb._isWaiting=false;
                if (fb.group) fb.group.notifyResume();
                else if (fb.isAlive()) {
                    try {
                        fb.steps();
                    }catch(e) {
                        fb.handleEx(e);
                    }
                }
            });
            else */if (j.then && j.fail) {
                j.then(function (r) {
                    fb.retVal=r;
                    fb.steps();
                });
                j.fail(function (e) {
                    if (e instanceof Error) {
                        fb.gotoCatch(e);
                    } else {
                        var re=new Error(e);
                        re.original=e;
                        fb.gotoCatch(re);
                    }
                    fb.steps();
                });
            }
        },
        setGroup: function setGroup(g) {
            var fb=this;
            fb.group=g;
            if (g) g.add(fb);
        },
        steps: function steps() {
            var fb=this;
            var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            fb.cnt=fb.preemptionTime;
            fb.preempted=false;
            fb.fSuspended=false;
            //while (new Date().getTime()<lim) {
            while (fb.cnt-->0 && fb.frame) {
                fb.step();
            }
            fb.preempted= (!fb.fSuspended) && fb.isAlive();
            Tonyu.currentThread=sv;
        },
        kill: function kill() {
            var fb=this;
            fb._isAlive=false;
            fb.frame=null;
        },
        clearFrame: function clearFrame() {
            this.frame=null;
            this.tryStack=[];
        }
    });
    return TonyuThread;
});