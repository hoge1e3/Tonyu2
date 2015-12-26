define(["Class"],function (Class) {
    var cnts={enterC:{},exitC:0};
    try {window.cnts=cnts;}catch(e){}
    var TonyuThread=Class({
        initialize: function TonyuThread() {
            this.frame=null;
            this._isDead=false;
            //this._isAlive=true;
            this.cnt=0;
            this._isWaiting=false;
            this.fSuspended=false;
            this.tryStack=[];
            this.preemptionTime=60;
            this.age=0; // inc if object pooled
        },
        isAlive:function isAlive() {
            return !this.isDead();
            //return this.frame!=null && this._isAlive;
        },
        isDead: function () {
            return this._isDead=this._isDead || (this.frame==null) ||
            (this._threadGroup && (
                    this._threadGroup.objectPoolAge!=this.tGrpObjectPoolAge ||
                    this._threadGroup.isDeadThreadGroup()
            ));
        },
        setThreadGroup: function setThreadGroup(g) {// g:TonyuThread
            this._threadGroup=g;
            this.tGrpObjectPoolAge=g.objectPoolAge;
            //if (g) g.add(fb);
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
        resume: function (retVal) {
            this.retVal=retVal;
            this.steps();
        },
        steps: function steps() {
            var fb=this;
            if (fb.isDead()) return;
            var sv=Tonyu.currentThread;
            Tonyu.currentThread=fb;
            fb.cnt=fb.preemptionTime;
            fb.preempted=false;
            fb.fSuspended=false;
            while (fb.cnt>0 && fb.frame) {
                try {
                    //while (new Date().getTime()<lim) {
                    while (fb.cnt-->0 && fb.frame) {
                        fb.frame.func(fb);
                    }
                    fb.preempted= (!fb.fSuspended) && fb.isAlive();
                } catch(e) {
                    fb.gotoCatch(e);
                }
            }
            Tonyu.currentThread=sv;
        },
        kill: function kill() {
            var fb=this;
            //fb._isAlive=false;
            fb._isDead=true;
            fb.frame=null;
        },
        clearFrame: function clearFrame() {
            this.frame=null;
            this.tryStack=[];
        }
    });
    return TonyuThread;
});