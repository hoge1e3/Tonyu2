Tonyu.klass.define({
  fullName: 'kernel.EventHandlerCaller',
  shortName: 'EventHandlerCaller',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_EventHandlerCaller_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_EventHandlerCaller_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    callEventHandler :function _trc_EventHandlerCaller_callEventHandler(h,args) {
      "use strict";
      var _this=this;
      var t;
      
      
      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218
        h.apply(_this.target,args);
        
      }
    },
    fiber$callEventHandler :function _trc_EventHandlerCaller_f_callEventHandler(_thread,h,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      
      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218
        h.apply(_this.target,args);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"callEventHandler":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventMod',
  shortName: 'EventMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_EventMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_EventMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initEventMod :function _trc_EventMod_initEventMod() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000063;//kernel.EventMod:63
      if (_this._eventHandlers) {
        return _this;
      }
      //$LASTPOS=2000156;//kernel.EventMod:156
      _this._eventHandlers={};
      //$LASTPOS=2000179;//kernel.EventMod:179
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
    },
    releaseEventMod :function _trc_EventMod_releaseEventMod() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_2;
      
      //$LASTPOS=2000243;//kernel.EventMod:243
      _it_2=Tonyu.iterator(_this._eventHandlers,2);
      while(_it_2.next()) {
        k=_it_2[0];
        v=_it_2[1];
        
        //$LASTPOS=2000285;//kernel.EventMod:285
        v.release();
        
      }
    },
    parseArgs :function _trc_EventMod_parseArgs(a) {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=2000335;//kernel.EventMod:335
      res = {type: a[0],args: []};
      
      //$LASTPOS=2000369;//kernel.EventMod:369
      //$LASTPOS=2000374;//kernel.EventMod:374
      i = 1;
      for (; i<a.length ; i++) {
        {
          //$LASTPOS=2000412;//kernel.EventMod:412
          res.args.push(a[i]);
        }
      }
      return res;
    },
    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
      "use strict";
      var _this=this;
      var cl;
      
      //$LASTPOS=2000535;//kernel.EventMod:535
      _this.initEventMod();
      //$LASTPOS=2000555;//kernel.EventMod:555
      if (typeof  type=="function") {
        //$LASTPOS=2000594;//kernel.EventMod:594
        obj=obj||new type({target: _this});
        //$LASTPOS=2000634;//kernel.EventMod:634
        type=obj.getClassInfo().fullName;
        
      } else {
        //$LASTPOS=2000689;//kernel.EventMod:689
        if (! obj) {
          //$LASTPOS=2000713;//kernel.EventMod:713
          cl = Tonyu.globals.$Boot.eventTypes[type]||Tonyu.classes.kernel.EventHandler;
          
          //$LASTPOS=2000772;//kernel.EventMod:772
          obj=new cl({target: _this});
          
        }
        
      }
      return _this._eventHandlers[type]=obj;
    },
    getEventHandler :function _trc_EventMod_getEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2000985;//kernel.EventMod:985
      _this.initEventMod();
      //$LASTPOS=2001005;//kernel.EventMod:1005
      if (typeof  type=="function") {
        //$LASTPOS=2001044;//kernel.EventMod:1044
        type=type.meta.fullName;
        
      }
      //$LASTPOS=2001079;//kernel.EventMod:1079
      res = _this._eventHandlers[type];
      
      return res;
    },
    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2001175;//kernel.EventMod:1175
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      
      return res;
    },
    on :function _trc_EventMod_on() {
      "use strict";
      var _this=this;
      var a;
      var h;
      
      //$LASTPOS=2001278;//kernel.EventMod:1278
      a = _this.parseArgs(arguments);
      
      //$LASTPOS=2001311;//kernel.EventMod:1311
      h = _this.getOrRegisterEventHandler(a.type);
      
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      "use strict";
      var _this=this;
      var h;
      
      //$LASTPOS=2001496;//kernel.EventMod:1496
      h = _this.getEventHandler(type);
      
      //$LASTPOS=2001530;//kernel.EventMod:1530
      if (h) {
        //$LASTPOS=2001537;//kernel.EventMod:1537
        h.fire([arg]);
      }
    },
    sendEvent :function _trc_EventMod_sendEvent(type,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001592;//kernel.EventMod:1592
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      "use strict";
      var _this=this;
      var args;
      var act;
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (null) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = new Tonyu.classes.kernel.ArgParser(arguments);
        
        //$LASTPOS=2001707;//kernel.EventMod:1707
        act = args.shift(Tonyu.classes.kernel.BaseActor)||_this;
        
        //$LASTPOS=2001755;//kernel.EventMod:1755
        args.trimUndefs();
        //$LASTPOS=2001934;//kernel.EventMod:1934
        null.waitEvent(act,args.toArray());
        
      }
    },
    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var args;
      var act;
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (_thread) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = new Tonyu.classes.kernel.ArgParser(_arguments);
        
        //$LASTPOS=2001707;//kernel.EventMod:1707
        act = args.shift(Tonyu.classes.kernel.BaseActor)||_this;
        
        //$LASTPOS=2001755;//kernel.EventMod:1755
        args.trimUndefs();
        //$LASTPOS=2001934;//kernel.EventMod:1934
        _thread.waitEvent(act,args.toArray());
        
      }
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_EventMod_waitFor(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (null) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_EventMod_f_waitFor(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (_thread) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        _thread.waitFor(f);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false},"waitFor":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.OneframeSpriteMod',
  shortName: 'OneframeSpriteMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_OneframeSpriteMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_OneframeSpriteMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_OneframeSpriteMod_drawText(x,y,text,col,size,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000067;//kernel.OneframeSpriteMod:67
      if (! size) {
        //$LASTPOS=3000078;//kernel.OneframeSpriteMod:78
        size=15;
      }
      //$LASTPOS=3000092;//kernel.OneframeSpriteMod:92
      if (! col) {
        //$LASTPOS=3000102;//kernel.OneframeSpriteMod:102
        col="white";
      }
      //$LASTPOS=3000120;//kernel.OneframeSpriteMod:120
      _this.appear(Tonyu.classes.kernel.T1Text,{x: x,y: y,text: text,col: col,size: size,zOrder: zOrder,owner: _this});
    },
    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000225;//kernel.OneframeSpriteMod:225
      if (! col) {
        //$LASTPOS=3000235;//kernel.OneframeSpriteMod:235
        col="white";
      }
      //$LASTPOS=3000253;//kernel.OneframeSpriteMod:253
      _this.appear(Tonyu.classes.kernel.T1Line,{x: x,y: y,tx: tx,ty: ty,col: col,zOrder: zOrder,owner: _this});
    },
    drawSprite :function _trc_OneframeSpriteMod_drawSprite(x,y,p,f,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000351;//kernel.OneframeSpriteMod:351
      _this.drawDxSprite(x,y,p,f,zOrder,0,255,1,1);
    },
    drawDxSprite :function _trc_OneframeSpriteMod_drawDxSprite(x,y,p,f,zOrder,angle,alpha,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000465;//kernel.OneframeSpriteMod:465
      _this.appear(Tonyu.classes.kernel.T1Sprite,{x: x,y: y,p: p,f: f,zOrder: zOrder,angle: angle,alpha: alpha,scaleX: scaleX,scaleY: scaleY,owner: _this});
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true},"drawSprite":{"nowait":true},"drawDxSprite":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TextRectMod',
  shortName: 'TextRectMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_TextRectMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TextRectMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawTextRect :function _trc_TextRectMod_drawTextRect(ctx,text,x,topY,h,align,type) {
      "use strict";
      var _this=this;
      var met;
      var res;
      var t;
      
      //$LASTPOS=4000092;//kernel.TextRectMod:92
      if (! align) {
        //$LASTPOS=4000104;//kernel.TextRectMod:104
        align="center";
      }
      //$LASTPOS=4000125;//kernel.TextRectMod:125
      ctx.textBaseline="top";
      //$LASTPOS=4000154;//kernel.TextRectMod:154
      _this.setFontSize(ctx,h);
      //$LASTPOS=4000180;//kernel.TextRectMod:180
      met = ctx.measureText(text);
      
      //$LASTPOS=4000216;//kernel.TextRectMod:216
      res = {y: topY,w: met.width,h: h};
      
      //$LASTPOS=4000258;//kernel.TextRectMod:258
      t = align.substring(0,1).toLowerCase();
      
      //$LASTPOS=4000305;//kernel.TextRectMod:305
      if (t=="l") {
        //$LASTPOS=4000317;//kernel.TextRectMod:317
        res.x=x;
      } else {
        //$LASTPOS=4000336;//kernel.TextRectMod:336
        if (t=="r") {
          //$LASTPOS=4000348;//kernel.TextRectMod:348
          res.x=x-met.width;
        } else {
          //$LASTPOS=4000377;//kernel.TextRectMod:377
          if (t=="c") {
            //$LASTPOS=4000389;//kernel.TextRectMod:389
            res.x=x-met.width/2;
          }
        }
      }
      //$LASTPOS=4000415;//kernel.TextRectMod:415
      if (type=="fill") {
        //$LASTPOS=4000433;//kernel.TextRectMod:433
        ctx.fillText(text,res.x,topY);
      }
      //$LASTPOS=4000470;//kernel.TextRectMod:470
      if (type=="stroke") {
        //$LASTPOS=4000490;//kernel.TextRectMod:490
        ctx.strokeText(text,res.x,topY);
      }
      return res;
    },
    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {
      "use strict";
      var _this=this;
      var post;
      
      //$LASTPOS=4000588;//kernel.TextRectMod:588
      post = ctx.font.replace(/^[0-9\.]+/,"");
      
      //$LASTPOS=4000636;//kernel.TextRectMod:636
      ctx.font=sz+post;
    },
    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {
      "use strict";
      var _this=this;
      var align;
      var theight;
      var margin;
      var r;
      var fs;
      
      //$LASTPOS=4000714;//kernel.TextRectMod:714
      align = "c";
      
      //$LASTPOS=4000734;//kernel.TextRectMod:734
      theight = 20;
      
      //$LASTPOS=4000755;//kernel.TextRectMod:755
      margin = 5;
      
      //$LASTPOS=4000774;//kernel.TextRectMod:774
      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
      
      //$LASTPOS=4000844;//kernel.TextRectMod:844
      ctx.beginPath();
      //$LASTPOS=4000866;//kernel.TextRectMod:866
      ctx.moveTo(x,y);
      //$LASTPOS=4000890;//kernel.TextRectMod:890
      ctx.lineTo(x+margin,y-theight);
      //$LASTPOS=4000929;//kernel.TextRectMod:929
      ctx.lineTo(x+r.w/2+margin,y-theight);
      //$LASTPOS=4000974;//kernel.TextRectMod:974
      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001032;//kernel.TextRectMod:1032
      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001090;//kernel.TextRectMod:1090
      ctx.lineTo(x-r.w/2-margin,y-theight);
      //$LASTPOS=4001135;//kernel.TextRectMod:1135
      ctx.lineTo(x-margin,y-theight);
      //$LASTPOS=4001174;//kernel.TextRectMod:1174
      ctx.closePath();
      //$LASTPOS=4001196;//kernel.TextRectMod:1196
      ctx.fill();
      //$LASTPOS=4001213;//kernel.TextRectMod:1213
      ctx.stroke();
      //$LASTPOS=4001238;//kernel.TextRectMod:1238
      fs = ctx.fillStyle;
      
      //$LASTPOS=4001265;//kernel.TextRectMod:1265
      ctx.fillStyle=ctx.strokeStyle;
      //$LASTPOS=4001301;//kernel.TextRectMod:1301
      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
      //$LASTPOS=4001374;//kernel.TextRectMod:1374
      ctx.fillStyle=fs;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Mod',
  shortName: 'T2Mod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_T2Mod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2Mod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    bvec :function _trc_T2Mod_bvec(tx,ty) {
      "use strict";
      var _this=this;
      var b2Vec2;
      
      //$LASTPOS=5000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=5000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
      
      
      _thread.retVal=_this;return;
    },
    defv :function _trc_T2Mod_defv(t,d) {
      "use strict";
      var _this=this;
      
      return (t===t&&(typeof  t)==="number")?t:d;
    },
    fiber$defv :function _trc_T2Mod_f_defv(_thread,t,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(t===t&&(typeof  t)==="number")?t:d;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"bvec":{"nowait":false},"defv":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MediaPlayer_play() {
      "use strict";
      var _this=this;
      
    },
    fiber$play :function _trc_MediaPlayer_f_play(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MediaPlayer_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_MediaPlayer_playSE() {
      "use strict";
      var _this=this;
      
    },
    fiber$playSE :function _trc_MediaPlayer_f_playSE(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setDelay :function _trc_MediaPlayer_setDelay() {
      "use strict";
      var _this=this;
      
    },
    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setVolume :function _trc_MediaPlayer_setVolume() {
      "use strict";
      var _this=this;
      
    },
    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ThreadGroupMod',
  shortName: 'ThreadGroupMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ThreadGroupMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ThreadGroupMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    isDeadThreadGroup :function _trc_ThreadGroupMod_isDeadThreadGroup() {
      "use strict";
      var _this=this;
      
      return _this._isDeadThreadGroup=_this._isDeadThreadGroup||(_this._threadGroup&&(_this._threadGroup.objectPoolAge!=_this.tGrpObjectPoolAge||_this._threadGroup.isDeadThreadGroup()));
    },
    fiber$isDeadThreadGroup :function _trc_ThreadGroupMod_f_isDeadThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this._isDeadThreadGroup=_this._isDeadThreadGroup||(_this._threadGroup&&(_this._threadGroup.objectPoolAge!=_this.tGrpObjectPoolAge||_this._threadGroup.isDeadThreadGroup()));return;
      
      
      _thread.retVal=_this;return;
    },
    setThreadGroup :function _trc_ThreadGroupMod_setThreadGroup(g) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=6000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
    },
    fiber$setThreadGroup :function _trc_ThreadGroupMod_f_setThreadGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=6000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"isDeadThreadGroup":{"nowait":false},"setThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.InputDevice',
  shortName: 'InputDevice',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_InputDevice_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_InputDevice_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_InputDevice_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=7000110;//kernel.InputDevice:110
      _this.touchEmu=true;
      //$LASTPOS=7000130;//kernel.InputDevice:130
      _this.defaultLayer=Tonyu.globals.$Screen;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=7000182;//kernel.InputDevice:182
      l = _this.listeners;
      
      //$LASTPOS=7000204;//kernel.InputDevice:204
      _this.listeners=[];
      //$LASTPOS=7000223;//kernel.InputDevice:223
      while (l.length>0) {
        //$LASTPOS=7000244;//kernel.InputDevice:244
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=7000182;//kernel.InputDevice:182
      l = _this.listeners;
      
      //$LASTPOS=7000204;//kernel.InputDevice:204
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000223;//kernel.InputDevice:223
          case 1:
            if (!(l.length>0)) { __pc=2; break; }
            {
              //$LASTPOS=7000244;//kernel.InputDevice:244
              (l.shift())();
            }
            __pc=1;break;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    addOnetimeListener :function _trc_InputDevice_addOnetimeListener(l) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000294;//kernel.InputDevice:294
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000294;//kernel.InputDevice:294
      _this.listeners.push(l);
      
      _thread.retVal=_this;return;
    },
    initCanvasEvents :function _trc_InputDevice_initCanvasEvents(cvj) {
      "use strict";
      var _this=this;
      var cv;
      var handleMouse;
      var handleTouch;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000347;//kernel.InputDevice:347
      cv = cvj[0];
      
      //$LASTPOS=7000367;//kernel.InputDevice:367
      Tonyu.globals.$handleMouse=(function anonymous_380(e) {
        var p;
        var mp;
        
        //$LASTPOS=7000396;//kernel.InputDevice:396
        p = cvj.offset();
        
        //$LASTPOS=7000425;//kernel.InputDevice:425
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7000502;//kernel.InputDevice:502
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7000574;//kernel.InputDevice:574
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7000597;//kernel.InputDevice:597
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7000620;//kernel.InputDevice:620
        if (_this.touchEmu) {
          //$LASTPOS=7000649;//kernel.InputDevice:649
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=7000682;//kernel.InputDevice:682
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=7000722;//kernel.InputDevice:722
        _this.handleListeners();
      });
      //$LASTPOS=7000754;//kernel.InputDevice:754
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=7000786;//kernel.InputDevice:786
      Tonyu.globals.$touches.findById=(function anonymous_804(id) {
        var j;
        
        //$LASTPOS=7000821;//kernel.InputDevice:821
        //$LASTPOS=7000826;//kernel.InputDevice:826
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7000876;//kernel.InputDevice:876
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7000986;//kernel.InputDevice:986
      Tonyu.globals.$handleTouch=(function anonymous_999(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=7001015;//kernel.InputDevice:1015
        _this.touchEmu=false;
        //$LASTPOS=7001040;//kernel.InputDevice:1040
        p = cvj.offset();
        
        //$LASTPOS=7001069;//kernel.InputDevice:1069
        e.preventDefault();
        //$LASTPOS=7001098;//kernel.InputDevice:1098
        ts = e.originalEvent.changedTouches;
        
        //$LASTPOS=7001146;//kernel.InputDevice:1146
        //$LASTPOS=7001151;//kernel.InputDevice:1151
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7001196;//kernel.InputDevice:1196
            src = ts[i];
            
            //$LASTPOS=7001224;//kernel.InputDevice:1224
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7001280;//kernel.InputDevice:1280
            if (! dst) {
              //$LASTPOS=7001309;//kernel.InputDevice:1309
              //$LASTPOS=7001314;//kernel.InputDevice:1314
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7001372;//kernel.InputDevice:1372
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=7001425;//kernel.InputDevice:1425
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=7001467;//kernel.InputDevice:1467
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
              }
              
            }
            //$LASTPOS=7001600;//kernel.InputDevice:1600
            if (dst) {
              //$LASTPOS=7001628;//kernel.InputDevice:1628
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7001709;//kernel.InputDevice:1709
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7001788;//kernel.InputDevice:1788
              dst.x=_this.mp.x;
              //$LASTPOS=7001817;//kernel.InputDevice:1817
              dst.y=_this.mp.y;
              //$LASTPOS=7001846;//kernel.InputDevice:1846
              if (! dst.touched) {
                //$LASTPOS=7001863;//kernel.InputDevice:1863
                dst.touched=1;
              }
              
            }
          }
        }
        //$LASTPOS=7001913;//kernel.InputDevice:1913
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7001945;//kernel.InputDevice:1945
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7001977;//kernel.InputDevice:1977
        _this.handleListeners();
      });
      //$LASTPOS=7002009;//kernel.InputDevice:2009
      Tonyu.globals.$handleTouchEnd=(function anonymous_2025(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=7002041;//kernel.InputDevice:2041
        T2MediaLib.activate();
        //$LASTPOS=7002073;//kernel.InputDevice:2073
        ts = e.originalEvent.changedTouches;
        
        //$LASTPOS=7002121;//kernel.InputDevice:2121
        //$LASTPOS=7002126;//kernel.InputDevice:2126
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7002171;//kernel.InputDevice:2171
            src = ts[i];
            
            //$LASTPOS=7002199;//kernel.InputDevice:2199
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7002255;//kernel.InputDevice:2255
            if (dst) {
              //$LASTPOS=7002283;//kernel.InputDevice:2283
              dst.touched=0;
              //$LASTPOS=7002315;//kernel.InputDevice:2315
              dst.identifier=- 1;
              
            }
          }
        }
        //$LASTPOS=7002369;//kernel.InputDevice:2369
        _this.handleListeners();
      });
      //$LASTPOS=7002401;//kernel.InputDevice:2401
      handleMouse = (function anonymous_2417(e) {
        
        //$LASTPOS=7002422;//kernel.InputDevice:2422
        Tonyu.globals.$handleMouse(e);
      });
      
      //$LASTPOS=7002446;//kernel.InputDevice:2446
      handleTouch = (function anonymous_2462(e) {
        
        //$LASTPOS=7002467;//kernel.InputDevice:2467
        Tonyu.globals.$handleTouch(e);
      });
      
      //$LASTPOS=7002491;//kernel.InputDevice:2491
      handleTouchEnd = (function anonymous_2510(e) {
        
        //$LASTPOS=7002515;//kernel.InputDevice:2515
        Tonyu.globals.$handleTouchEnd(e);
      });
      
      //$LASTPOS=7002542;//kernel.InputDevice:2542
      d = $.data(cv,"events");
      
      //$LASTPOS=7002574;//kernel.InputDevice:2574
      if (! d) {
        //$LASTPOS=7002593;//kernel.InputDevice:2593
        $.data(cv,"events","true");
        //$LASTPOS=7002630;//kernel.InputDevice:2630
        cvj.mousedown(handleMouse);
        //$LASTPOS=7002667;//kernel.InputDevice:2667
        cvj.mousemove(handleMouse);
        //$LASTPOS=7002704;//kernel.InputDevice:2704
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=7002747;//kernel.InputDevice:2747
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=7002789;//kernel.InputDevice:2789
        cvj.on("touchend",handleTouchEnd);
        
      }
    },
    fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      var handleMouse;
      var handleTouch;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000347;//kernel.InputDevice:347
      cv = cvj[0];
      
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000367;//kernel.InputDevice:367
            Tonyu.globals.$handleMouse=(function anonymous_380(e) {
              var p;
              var mp;
              
              //$LASTPOS=7000396;//kernel.InputDevice:396
              p = cvj.offset();
              
              //$LASTPOS=7000425;//kernel.InputDevice:425
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7000502;//kernel.InputDevice:502
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7000574;//kernel.InputDevice:574
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7000597;//kernel.InputDevice:597
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7000620;//kernel.InputDevice:620
              if (_this.touchEmu) {
                //$LASTPOS=7000649;//kernel.InputDevice:649
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=7000682;//kernel.InputDevice:682
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=7000722;//kernel.InputDevice:722
              _this.handleListeners();
            });
            //$LASTPOS=7000754;//kernel.InputDevice:754
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=7000786;//kernel.InputDevice:786
            Tonyu.globals.$touches.findById=(function anonymous_804(id) {
              var j;
              
              //$LASTPOS=7000821;//kernel.InputDevice:821
              //$LASTPOS=7000826;//kernel.InputDevice:826
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7000876;//kernel.InputDevice:876
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7000986;//kernel.InputDevice:986
            Tonyu.globals.$handleTouch=(function anonymous_999(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=7001015;//kernel.InputDevice:1015
              _this.touchEmu=false;
              //$LASTPOS=7001040;//kernel.InputDevice:1040
              p = cvj.offset();
              
              //$LASTPOS=7001069;//kernel.InputDevice:1069
              e.preventDefault();
              //$LASTPOS=7001098;//kernel.InputDevice:1098
              ts = e.originalEvent.changedTouches;
              
              //$LASTPOS=7001146;//kernel.InputDevice:1146
              //$LASTPOS=7001151;//kernel.InputDevice:1151
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7001196;//kernel.InputDevice:1196
                  src = ts[i];
                  
                  //$LASTPOS=7001224;//kernel.InputDevice:1224
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7001280;//kernel.InputDevice:1280
                  if (! dst) {
                    //$LASTPOS=7001309;//kernel.InputDevice:1309
                    //$LASTPOS=7001314;//kernel.InputDevice:1314
                    j = 0;
                    for (; j<Tonyu.globals.$touches.length ; j++) {
                      {
                        //$LASTPOS=7001372;//kernel.InputDevice:1372
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=7001425;//kernel.InputDevice:1425
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=7001467;//kernel.InputDevice:1467
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                    }
                    
                  }
                  //$LASTPOS=7001600;//kernel.InputDevice:1600
                  if (dst) {
                    //$LASTPOS=7001628;//kernel.InputDevice:1628
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7001709;//kernel.InputDevice:1709
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7001788;//kernel.InputDevice:1788
                    dst.x=_this.mp.x;
                    //$LASTPOS=7001817;//kernel.InputDevice:1817
                    dst.y=_this.mp.y;
                    //$LASTPOS=7001846;//kernel.InputDevice:1846
                    if (! dst.touched) {
                      //$LASTPOS=7001863;//kernel.InputDevice:1863
                      dst.touched=1;
                    }
                    
                  }
                }
              }
              //$LASTPOS=7001913;//kernel.InputDevice:1913
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7001945;//kernel.InputDevice:1945
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7001977;//kernel.InputDevice:1977
              _this.handleListeners();
            });
            //$LASTPOS=7002009;//kernel.InputDevice:2009
            Tonyu.globals.$handleTouchEnd=(function anonymous_2025(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=7002041;//kernel.InputDevice:2041
              T2MediaLib.activate();
              //$LASTPOS=7002073;//kernel.InputDevice:2073
              ts = e.originalEvent.changedTouches;
              
              //$LASTPOS=7002121;//kernel.InputDevice:2121
              //$LASTPOS=7002126;//kernel.InputDevice:2126
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7002171;//kernel.InputDevice:2171
                  src = ts[i];
                  
                  //$LASTPOS=7002199;//kernel.InputDevice:2199
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7002255;//kernel.InputDevice:2255
                  if (dst) {
                    //$LASTPOS=7002283;//kernel.InputDevice:2283
                    dst.touched=0;
                    //$LASTPOS=7002315;//kernel.InputDevice:2315
                    dst.identifier=- 1;
                    
                  }
                }
              }
              //$LASTPOS=7002369;//kernel.InputDevice:2369
              _this.handleListeners();
            });
            //$LASTPOS=7002401;//kernel.InputDevice:2401
            handleMouse = (function anonymous_2417(e) {
              
              //$LASTPOS=7002422;//kernel.InputDevice:2422
              Tonyu.globals.$handleMouse(e);
            });
            
            //$LASTPOS=7002446;//kernel.InputDevice:2446
            handleTouch = (function anonymous_2462(e) {
              
              //$LASTPOS=7002467;//kernel.InputDevice:2467
              Tonyu.globals.$handleTouch(e);
            });
            
            //$LASTPOS=7002491;//kernel.InputDevice:2491
            handleTouchEnd = (function anonymous_2510(e) {
              
              //$LASTPOS=7002515;//kernel.InputDevice:2515
              Tonyu.globals.$handleTouchEnd(e);
            });
            
            //$LASTPOS=7002542;//kernel.InputDevice:2542
            d = $.data(cv,"events");
            
            //$LASTPOS=7002574;//kernel.InputDevice:2574
            if (! d) {
              //$LASTPOS=7002593;//kernel.InputDevice:2593
              $.data(cv,"events","true");
              //$LASTPOS=7002630;//kernel.InputDevice:2630
              cvj.mousedown(handleMouse);
              //$LASTPOS=7002667;//kernel.InputDevice:2667
              cvj.mousemove(handleMouse);
              //$LASTPOS=7002704;//kernel.InputDevice:2704
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=7002747;//kernel.InputDevice:2747
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=7002789;//kernel.InputDevice:2789
              cvj.on("touchend",handleTouchEnd);
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    update :function _trc_InputDevice_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_52;
      
      //$LASTPOS=7002854;//kernel.InputDevice:2854
      _it_52=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_52.next()) {
        i=_it_52[0];
        
        //$LASTPOS=7002889;//kernel.InputDevice:2889
        if (i.touched>0) {
          //$LASTPOS=7002907;//kernel.InputDevice:2907
          i.touched++;
          
        }
        //$LASTPOS=7002930;//kernel.InputDevice:2930
        if (i.touched==- 1) {
          //$LASTPOS=7002949;//kernel.InputDevice:2949
          i.touched=1;
        }
        
      }
    },
    fiber$update :function _trc_InputDevice_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_52;
      
      //$LASTPOS=7002854;//kernel.InputDevice:2854
      _it_52=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_52.next()) {
        i=_it_52[0];
        
        //$LASTPOS=7002889;//kernel.InputDevice:2889
        if (i.touched>0) {
          //$LASTPOS=7002907;//kernel.InputDevice:2907
          i.touched++;
          
        }
        //$LASTPOS=7002930;//kernel.InputDevice:2930
        if (i.touched==- 1) {
          //$LASTPOS=7002949;//kernel.InputDevice:2949
          i.touched=1;
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ArgParser',
  shortName: 'ArgParser',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ArgParser_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ArgParser_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ArgParser_initialize(asrc) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=8000018;//kernel.ArgParser:18
      _this.length=0;
      //$LASTPOS=8000033;//kernel.ArgParser:33
      _this.a=_this;
      //$LASTPOS=8000046;//kernel.ArgParser:46
      //$LASTPOS=8000051;//kernel.ArgParser:51
      i = 0;
      for (; i<asrc.length ; i++) {
        //$LASTPOS=8000079;//kernel.ArgParser:79
        _this.push(asrc[i]);
      }
    },
    push :function _trc_ArgParser_push(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000114;//kernel.ArgParser:114
      _this.a[_this.length++]=v;
    },
    fiber$push :function _trc_ArgParser_f_push(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000114;//kernel.ArgParser:114
      _this.a[_this.length++]=v;
      
      _thread.retVal=_this;return;
    },
    trimUndefs :function _trc_ArgParser_trimUndefs() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000154;//kernel.ArgParser:154
      while (_this.length>0) {
        //$LASTPOS=8000181;//kernel.ArgParser:181
        if (_this.a[_this.length-1]!==_this._undef) {
          break;
          
        }
        //$LASTPOS=8000223;//kernel.ArgParser:223
        _this.length--;
        //$LASTPOS=8000242;//kernel.ArgParser:242
        delete _this.a[_this.length];
        
      }
    },
    fiber$trimUndefs :function _trc_ArgParser_f_trimUndefs(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ArgParser_ent_trimUndefs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000154;//kernel.ArgParser:154
          case 1:
            if (!(_this.length>0)) { __pc=3; break; }
            //$LASTPOS=8000181;//kernel.ArgParser:181
            if (!(_this.a[_this.length-1]!==_this._undef)) { __pc=2; break; }
            __pc=3; break;
            
          case 2:
            
            //$LASTPOS=8000223;//kernel.ArgParser:223
            _this.length--;
            //$LASTPOS=8000242;//kernel.ArgParser:242
            delete _this.a[_this.length];
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    shift :function _trc_ArgParser_shift(type) {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8000291;//kernel.ArgParser:291
      if (typeof  type=="number") {
        //$LASTPOS=8000329;//kernel.ArgParser:329
        res = [];
        
        //$LASTPOS=8000350;//kernel.ArgParser:350
        //$LASTPOS=8000355;//kernel.ArgParser:355
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000376;//kernel.ArgParser:376
          res.push(_this.shift());
        }
        return res;
        
      } else {
        //$LASTPOS=8000428;//kernel.ArgParser:428
        if (type) {
          //$LASTPOS=8000449;//kernel.ArgParser:449
          if (_this.a[0] instanceof type) {
            return _this.shift();
          }
          return _this._undef;
          
        }
      }
      //$LASTPOS=8000519;//kernel.ArgParser:519
      res = _this.a[0];
      
      //$LASTPOS=8000538;//kernel.ArgParser:538
      //$LASTPOS=8000543;//kernel.ArgParser:543
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000580;//kernel.ArgParser:580
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000605;//kernel.ArgParser:605
      _this.length--;
      //$LASTPOS=8000636;//kernel.ArgParser:636
      delete _this.a[_this.length];
      return res;
    },
    fiber$shift :function _trc_ArgParser_f_shift(_thread,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=8000291;//kernel.ArgParser:291
      if (typeof  type=="number") {
        //$LASTPOS=8000329;//kernel.ArgParser:329
        res = [];
        
        //$LASTPOS=8000350;//kernel.ArgParser:350
        //$LASTPOS=8000355;//kernel.ArgParser:355
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000376;//kernel.ArgParser:376
          res.push(_this.shift());
        }
        _thread.retVal=res;return;
        
        
      } else {
        //$LASTPOS=8000428;//kernel.ArgParser:428
        if (type) {
          //$LASTPOS=8000449;//kernel.ArgParser:449
          if (_this.a[0] instanceof type) {
            _thread.retVal=_this.shift();return;
            
          }
          _thread.retVal=_this._undef;return;
          
          
        }
      }
      //$LASTPOS=8000519;//kernel.ArgParser:519
      res = _this.a[0];
      
      //$LASTPOS=8000538;//kernel.ArgParser:538
      //$LASTPOS=8000543;//kernel.ArgParser:543
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000580;//kernel.ArgParser:580
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000605;//kernel.ArgParser:605
      _this.length--;
      //$LASTPOS=8000636;//kernel.ArgParser:636
      delete _this.a[_this.length];
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    toArray :function _trc_ArgParser_toArray() {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8000698;//kernel.ArgParser:698
      res = [];
      
      //$LASTPOS=8000715;//kernel.ArgParser:715
      //$LASTPOS=8000720;//kernel.ArgParser:720
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8000746;//kernel.ArgParser:746
        res.push(_this.a[i]);
      }
      return res;
    },
    fiber$toArray :function _trc_ArgParser_f_toArray(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=8000698;//kernel.ArgParser:698
      res = [];
      
      //$LASTPOS=8000715;//kernel.ArgParser:715
      //$LASTPOS=8000720;//kernel.ArgParser:720
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8000746;//kernel.ArgParser:746
        res.push(_this.a[i]);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"push":{"nowait":false},"trimUndefs":{"nowait":false},"shift":{"nowait":false},"toArray":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MathMod',
  shortName: 'MathMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_MathMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MathMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_MathMod_sin(d) {
      "use strict";
      var _this=this;
      
      return Math.sin(_this.rad(d));
    },
    cos :function _trc_MathMod_cos(d) {
      "use strict";
      var _this=this;
      
      return Math.cos(_this.rad(d));
    },
    rad :function _trc_MathMod_rad(d) {
      "use strict";
      var _this=this;
      
      return d/180*Math.PI;
    },
    deg :function _trc_MathMod_deg(d) {
      "use strict";
      var _this=this;
      
      return d/Math.PI*180;
    },
    abs :function _trc_MathMod_abs(v) {
      "use strict";
      var _this=this;
      
      return Math.abs(v);
    },
    atan2 :function _trc_MathMod_atan2(y,x) {
      "use strict";
      var _this=this;
      
      return _this.deg(Math.atan2(y,x));
    },
    atanxy :function _trc_MathMod_atanxy(x,y) {
      "use strict";
      var _this=this;
      
      return _this.atan2(y,x);
    },
    floor :function _trc_MathMod_floor(x) {
      "use strict";
      var _this=this;
      
      return Math.floor(x);
    },
    angleDiff :function _trc_MathMod_angleDiff(a,b) {
      "use strict";
      var _this=this;
      var c;
      
      
      //$LASTPOS=9000500;//kernel.MathMod:500
      a=_this.floor(a);
      //$LASTPOS=9000517;//kernel.MathMod:517
      b=_this.floor(b);
      //$LASTPOS=9000534;//kernel.MathMod:534
      if (a>=b) {
        //$LASTPOS=9000555;//kernel.MathMod:555
        c=(a-b)%360;
        //$LASTPOS=9000579;//kernel.MathMod:579
        if (c>=180) {
          //$LASTPOS=9000591;//kernel.MathMod:591
          c-=360;
        }
        
      } else {
        //$LASTPOS=9000622;//kernel.MathMod:622
        c=- ((b-a)%360);
        //$LASTPOS=9000649;//kernel.MathMod:649
        if (c<- 180) {
          //$LASTPOS=9000661;//kernel.MathMod:661
          c+=360;
        }
        
      }
      return c;
    },
    sqrt :function _trc_MathMod_sqrt(t) {
      "use strict";
      var _this=this;
      
      return Math.sqrt(t);
    },
    dist :function _trc_MathMod_dist(dx,dy) {
      "use strict";
      var _this=this;
      var t;
      
      //$LASTPOS=9000770;//kernel.MathMod:770
      if (typeof  dx=="object") {
        //$LASTPOS=9000806;//kernel.MathMod:806
        t = dx;
        
        //$LASTPOS=9000825;//kernel.MathMod:825
        dx=t.x-_this.x;
        //$LASTPOS=9000834;//kernel.MathMod:834
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000910;//kernel.MathMod:910
      if (f>=0) {
        return Math.floor(f);
      } else {
        return Math.ceil(f);
      }
    },
    ceil :function _trc_MathMod_ceil(f) {
      "use strict";
      var _this=this;
      
      return Math.ceil(f);
    },
    rnd :function _trc_MathMod_rnd(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9001047;//kernel.MathMod:1047
      if (typeof  r=="number") {
        return Math.floor(Math.random()*(r>0?r:0));
        
      }
      return Math.random();
    },
    parseFloat :function _trc_MathMod_parseFloat(s) {
      "use strict";
      var _this=this;
      
      return parseFloat(s);
    },
    clamp :function _trc_MathMod_clamp(v,min,max) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9001251;//kernel.MathMod:1251
      if (min>max) {
        return _this.clamp(v,max,min);
      }
      return v<min?min:v>max?max:v;
    },
    clamped :function _trc_MathMod_clamped(v,min,max) {
      "use strict";
      var _this=this;
      
      return _this.clamp(v,min,max)-v;
    },
    min :function _trc_MathMod_min() {
      "use strict";
      var _this=this;
      
      return Math.min.apply(Math,arguments);
    },
    max :function _trc_MathMod_max() {
      "use strict";
      var _this=this;
      
      return Math.max.apply(Math,arguments);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"atanxy":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true},"clamp":{"nowait":true},"clamped":{"nowait":true},"min":{"nowait":true},"max":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ObjectPool',
  shortName: 'ObjectPool',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ObjectPool_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ObjectPool_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    pool :function _trc_ObjectPool_pool(key,o) {
      "use strict";
      var _this=this;
      var list;
      
      //$LASTPOS=10000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      
      //$LASTPOS=10000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=10000159;//kernel.ObjectPool:159
      list.push(o);
    },
    fiber$pool :function _trc_ObjectPool_f_pool(_thread,key,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      
      _thread.enter(function _trc_ObjectPool_ent_pool(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000091;//kernel.ObjectPool:91
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            //$LASTPOS=10000117;//kernel.ObjectPool:117
            o.objectPoolAge=(o.objectPoolAge||0)+1;
            //$LASTPOS=10000159;//kernel.ObjectPool:159
            list.push(o);
            _thread.exit(_this);return;
          }
        }
      });
    },
    withdraw :function _trc_ObjectPool_withdraw(key) {
      "use strict";
      var _this=this;
      var list;
      
      //$LASTPOS=10000196;//kernel.ObjectPool:196
      list = _this.poolList(key);
      
      return list.shift();
    },
    fiber$withdraw :function _trc_ObjectPool_f_withdraw(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      
      _thread.enter(function _trc_ObjectPool_ent_withdraw(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000196;//kernel.ObjectPool:196
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            _thread.exit(list.shift());return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    poolList :function _trc_ObjectPool_poolList(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      return _this.lists[key]=_this.lists[key]||[];
    },
    fiber$poolList :function _trc_ObjectPool_f_poolList(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      _thread.retVal=_this.lists[key]=_this.lists[key]||[];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"pool":{"nowait":false},"withdraw":{"nowait":false},"poolList":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TObject',
  shortName: 'TObject',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_TObject_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TObject_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TObject_initialize(options) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=11000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=11000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=11000123;//kernel.TObject:123
        _this.main();
      }
    },
    extend :function _trc_TObject_extend(obj) {
      "use strict";
      var _this=this;
      
      return Tonyu.extend(_this,obj);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TQuery',
  shortName: 'TQuery',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_TQuery_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TQuery_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TQuery_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000052;//kernel.TQuery:52
      _this.length=0;
    },
    contains :function _trc_TQuery_contains(t) {
      "use strict";
      var _this=this;
      var o;
      var _it_64;
      
      //$LASTPOS=12000086;//kernel.TQuery:86
      _it_64=Tonyu.iterator(_this,1);
      while(_it_64.next()) {
        o=_it_64[0];
        
        //$LASTPOS=12000117;//kernel.TQuery:117
        if (o===t) {
          return true;
        }
        
      }
      return false;
    },
    fiber$contains :function _trc_TQuery_f_contains(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var _it_64;
      
      //$LASTPOS=12000086;//kernel.TQuery:86
      _it_64=Tonyu.iterator(_this,1);
      while(_it_64.next()) {
        o=_it_64[0];
        
        //$LASTPOS=12000117;//kernel.TQuery:117
        if (o===t) {
          _thread.retVal=true;return;
          
        }
        
      }
      _thread.retVal=false;return;
      
      
      _thread.retVal=_this;return;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=12000200;//kernel.TQuery:200
      res = {};
      
      //$LASTPOS=12000217;//kernel.TQuery:217
      res.i=0;
      //$LASTPOS=12000231;//kernel.TQuery:231
      if (arity==1) {
        //$LASTPOS=12000256;//kernel.TQuery:256
        res.next=(function anonymous_265() {
          
          //$LASTPOS=12000292;//kernel.TQuery:292
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=12000343;//kernel.TQuery:343
          res[0]=_this[res.i];
          //$LASTPOS=12000376;//kernel.TQuery:376
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=12000446;//kernel.TQuery:446
        res.next=(function anonymous_455() {
          
          //$LASTPOS=12000482;//kernel.TQuery:482
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=12000533;//kernel.TQuery:533
          res[0]=res.i;
          //$LASTPOS=12000560;//kernel.TQuery:560
          res[1]=_this[res.i];
          //$LASTPOS=12000593;//kernel.TQuery:593
          res.i++;
          return true;
        });
        
      }
      return res;
    },
    fiber$tonyuIterator :function _trc_TQuery_f_tonyuIterator(_thread,arity) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=12000200;//kernel.TQuery:200
      res = {};
      
      //$LASTPOS=12000217;//kernel.TQuery:217
      res.i=0;
      //$LASTPOS=12000231;//kernel.TQuery:231
      if (arity==1) {
        //$LASTPOS=12000256;//kernel.TQuery:256
        res.next=(function anonymous_265() {
          
          //$LASTPOS=12000292;//kernel.TQuery:292
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=12000343;//kernel.TQuery:343
          res[0]=_this[res.i];
          //$LASTPOS=12000376;//kernel.TQuery:376
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=12000446;//kernel.TQuery:446
        res.next=(function anonymous_455() {
          
          //$LASTPOS=12000482;//kernel.TQuery:482
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=12000533;//kernel.TQuery:533
          res[0]=res.i;
          //$LASTPOS=12000560;//kernel.TQuery:560
          res[1]=_this[res.i];
          //$LASTPOS=12000593;//kernel.TQuery:593
          res.i++;
          return true;
        });
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    attr :function _trc_TQuery_attr() {
      "use strict";
      var _this=this;
      var values;
      var i;
      var e;
      var _it_68;
      
      
      //$LASTPOS=12000700;//kernel.TQuery:700
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=12000728;//kernel.TQuery:728
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=12000839;//kernel.TQuery:839
      if (arguments.length>=2) {
        //$LASTPOS=12000875;//kernel.TQuery:875
        values={};
        //$LASTPOS=12000895;//kernel.TQuery:895
        //$LASTPOS=12000900;//kernel.TQuery:900
        i = 0;
        for (; i<arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=12000953;//kernel.TQuery:953
            values[arguments[i]]=arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=12001024;//kernel.TQuery:1024
        values=arguments[0];
        
      }
      //$LASTPOS=12001057;//kernel.TQuery:1057
      if (values) {
        //$LASTPOS=12001080;//kernel.TQuery:1080
        _it_68=Tonyu.iterator(_this,1);
        while(_it_68.next()) {
          e=_it_68[0];
          
          //$LASTPOS=12001115;//kernel.TQuery:1115
          e.extend(values);
          
        }
        
      }
    },
    fiber$attr :function _trc_TQuery_f_attr(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var values;
      var i;
      var e;
      var _it_68;
      
      
      //$LASTPOS=12000700;//kernel.TQuery:700
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=12000728;//kernel.TQuery:728
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=12000839;//kernel.TQuery:839
      if (_arguments.length>=2) {
        //$LASTPOS=12000875;//kernel.TQuery:875
        values={};
        //$LASTPOS=12000895;//kernel.TQuery:895
        //$LASTPOS=12000900;//kernel.TQuery:900
        i = 0;
        for (; i<_arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=12000953;//kernel.TQuery:953
            values[_arguments[i]]=_arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=12001024;//kernel.TQuery:1024
        values=_arguments[0];
        
      }
      //$LASTPOS=12001057;//kernel.TQuery:1057
      if (values) {
        //$LASTPOS=12001080;//kernel.TQuery:1080
        _it_68=Tonyu.iterator(_this,1);
        while(_it_68.next()) {
          e=_it_68[0];
          
          //$LASTPOS=12001115;//kernel.TQuery:1115
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12001180;//kernel.TQuery:1180
      if (typeof  key!="function") {
        return (function anonymous_1226(o) {
          
          return o[key];
        });
        
      } else {
        return key;
        
      }
    },
    fiber$genKeyfunc :function _trc_TQuery_f_genKeyfunc(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12001180;//kernel.TQuery:1180
      if (typeof  key!="function") {
        _thread.retVal=(function anonymous_1226(o) {
          
          return o[key];
        });return;
        
        
      } else {
        _thread.retVal=key;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    maxs :function _trc_TQuery_maxs(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_74;
      var v;
      
      //$LASTPOS=12001313;//kernel.TQuery:1313
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=12001341;//kernel.TQuery:1341
      reso = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=12001371;//kernel.TQuery:1371
      _it_74=Tonyu.iterator(_this,1);
      while(_it_74.next()) {
        o=_it_74[0];
        
        //$LASTPOS=12001402;//kernel.TQuery:1402
        v = f(o);
        
        //$LASTPOS=12001423;//kernel.TQuery:1423
        if (res==null||v>=res) {
          //$LASTPOS=12001463;//kernel.TQuery:1463
          if (v>res) {
            //$LASTPOS=12001474;//kernel.TQuery:1474
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=12001504;//kernel.TQuery:1504
          reso.push(o);
          //$LASTPOS=12001531;//kernel.TQuery:1531
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$maxs :function _trc_TQuery_f_maxs(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_74;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_maxs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12001313;//kernel.TQuery:1313
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=12001341;//kernel.TQuery:1341
            reso = new Tonyu.classes.kernel.TQuery;
            
            //$LASTPOS=12001371;//kernel.TQuery:1371
            _it_74=Tonyu.iterator(_this,1);
            while(_it_74.next()) {
              o=_it_74[0];
              
              //$LASTPOS=12001402;//kernel.TQuery:1402
              v = f(o);
              
              //$LASTPOS=12001423;//kernel.TQuery:1423
              if (res==null||v>=res) {
                //$LASTPOS=12001463;//kernel.TQuery:1463
                if (v>res) {
                  //$LASTPOS=12001474;//kernel.TQuery:1474
                  reso=new Tonyu.classes.kernel.TQuery;
                }
                //$LASTPOS=12001504;//kernel.TQuery:1504
                reso.push(o);
                //$LASTPOS=12001531;//kernel.TQuery:1531
                res=v;
                
              }
              
            }
            _thread.exit(reso);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    mins :function _trc_TQuery_mins(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_81;
      var v;
      
      //$LASTPOS=12001596;//kernel.TQuery:1596
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=12001624;//kernel.TQuery:1624
      reso = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=12001654;//kernel.TQuery:1654
      _it_81=Tonyu.iterator(_this,1);
      while(_it_81.next()) {
        o=_it_81[0];
        
        //$LASTPOS=12001685;//kernel.TQuery:1685
        v = f(o);
        
        //$LASTPOS=12001706;//kernel.TQuery:1706
        if (res==null||v<=res) {
          //$LASTPOS=12001746;//kernel.TQuery:1746
          if (v<res) {
            //$LASTPOS=12001757;//kernel.TQuery:1757
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=12001787;//kernel.TQuery:1787
          reso.push(o);
          //$LASTPOS=12001814;//kernel.TQuery:1814
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$mins :function _trc_TQuery_f_mins(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_81;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_mins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12001596;//kernel.TQuery:1596
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=12001624;//kernel.TQuery:1624
            reso = new Tonyu.classes.kernel.TQuery;
            
            //$LASTPOS=12001654;//kernel.TQuery:1654
            _it_81=Tonyu.iterator(_this,1);
            while(_it_81.next()) {
              o=_it_81[0];
              
              //$LASTPOS=12001685;//kernel.TQuery:1685
              v = f(o);
              
              //$LASTPOS=12001706;//kernel.TQuery:1706
              if (res==null||v<=res) {
                //$LASTPOS=12001746;//kernel.TQuery:1746
                if (v<res) {
                  //$LASTPOS=12001757;//kernel.TQuery:1757
                  reso=new Tonyu.classes.kernel.TQuery;
                }
                //$LASTPOS=12001787;//kernel.TQuery:1787
                reso.push(o);
                //$LASTPOS=12001814;//kernel.TQuery:1814
                res=v;
                
              }
              
            }
            _thread.exit(reso);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    minObj :function _trc_TQuery_minObj(key) {
      "use strict";
      var _this=this;
      
      return _this.mins(key)[0];
    },
    fiber$minObj :function _trc_TQuery_f_minObj(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mins(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    maxObj :function _trc_TQuery_maxObj(key) {
      "use strict";
      var _this=this;
      
      return _this.maxs(key)[0];
    },
    fiber$maxObj :function _trc_TQuery_f_maxObj(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.maxs(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    nearests :function _trc_TQuery_nearests(x,y) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12001973;//kernel.TQuery:1973
      if (typeof  x=="object") {
        //$LASTPOS=12001998;//kernel.TQuery:1998
        y=x.y;
        //$LASTPOS=12002004;//kernel.TQuery:2004
        x=x.x;
        
      }
      return _this.mins((function anonymous_2029(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));
    },
    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12001973;//kernel.TQuery:1973
      if (typeof  x=="object") {
        //$LASTPOS=12001998;//kernel.TQuery:1998
        y=x.y;
        //$LASTPOS=12002004;//kernel.TQuery:2004
        x=x.x;
        
      }
      _thread.retVal=_this.mins((function anonymous_2029(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    nearest :function _trc_TQuery_nearest(x,y) {
      "use strict";
      var _this=this;
      
      return _this.nearests(x,y)[0];
    },
    fiber$nearest :function _trc_TQuery_f_nearest(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.nearests(x,y)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    withins :function _trc_TQuery_withins(xo,yd,d) {
      "use strict";
      var _this=this;
      var x;
      var y;
      
      
      //$LASTPOS=12002172;//kernel.TQuery:2172
      if (typeof  xo=="object") {
        //$LASTPOS=12002208;//kernel.TQuery:2208
        x=xo.x;
        //$LASTPOS=12002215;//kernel.TQuery:2215
        y=xo.y;
        //$LASTPOS=12002222;//kernel.TQuery:2222
        d=yd;
        
      } else {
        //$LASTPOS=12002251;//kernel.TQuery:2251
        x=xo;
        //$LASTPOS=12002256;//kernel.TQuery:2256
        y=yd;
        
      }
      return _this.find((function anonymous_2286(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));
    },
    fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      
      
      //$LASTPOS=12002172;//kernel.TQuery:2172
      if (typeof  xo=="object") {
        //$LASTPOS=12002208;//kernel.TQuery:2208
        x=xo.x;
        //$LASTPOS=12002215;//kernel.TQuery:2215
        y=xo.y;
        //$LASTPOS=12002222;//kernel.TQuery:2222
        d=yd;
        
      } else {
        //$LASTPOS=12002251;//kernel.TQuery:2251
        x=xo;
        //$LASTPOS=12002256;//kernel.TQuery:2256
        y=yd;
        
      }
      _thread.retVal=_this.find((function anonymous_2286(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    within :function _trc_TQuery_within(xo,yd,d) {
      "use strict";
      var _this=this;
      
      return _this.withins(xo,yd,d).nearest();
    },
    fiber$within :function _trc_TQuery_f_within(_thread,xo,yd,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.withins(xo,yd,d).nearest();return;
      
      
      _thread.retVal=_this;return;
    },
    max :function _trc_TQuery_max(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var o;
      var _it_92;
      var v;
      
      //$LASTPOS=12002425;//kernel.TQuery:2425
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=12002467;//kernel.TQuery:2467
      _it_92=Tonyu.iterator(_this,1);
      while(_it_92.next()) {
        o=_it_92[0];
        
        //$LASTPOS=12002498;//kernel.TQuery:2498
        v = f(o);
        
        //$LASTPOS=12002519;//kernel.TQuery:2519
        if (res==null||v>res) {
          //$LASTPOS=12002543;//kernel.TQuery:2543
          res=v;
        }
        
      }
      return res;
    },
    min :function _trc_TQuery_min(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var o;
      var _it_98;
      var v;
      
      //$LASTPOS=12002595;//kernel.TQuery:2595
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=12002637;//kernel.TQuery:2637
      _it_98=Tonyu.iterator(_this,1);
      while(_it_98.next()) {
        o=_it_98[0];
        
        //$LASTPOS=12002668;//kernel.TQuery:2668
        v = f(o);
        
        //$LASTPOS=12002689;//kernel.TQuery:2689
        if (res==null||v<res) {
          //$LASTPOS=12002713;//kernel.TQuery:2713
          res=v;
        }
        
      }
      return res;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      var ee;
      var _it_104;
      
      //$LASTPOS=12002764;//kernel.TQuery:2764
      if (e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array) {
        //$LASTPOS=12002806;//kernel.TQuery:2806
        _it_104=Tonyu.iterator(e,1);
        while(_it_104.next()) {
          ee=_it_104[0];
          
          //$LASTPOS=12002824;//kernel.TQuery:2824
          _this.push(ee);
        }
        
      } else {
        //$LASTPOS=12002857;//kernel.TQuery:2857
        _this[_this.length]=e;
        //$LASTPOS=12002882;//kernel.TQuery:2882
        _this.length++;
        
      }
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ee;
      var _it_104;
      
      
      _thread.enter(function _trc_TQuery_ent_push(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12002764;//kernel.TQuery:2764
            if (!(e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array)) { __pc=4; break; }
            //$LASTPOS=12002806;//kernel.TQuery:2806
            _it_104=Tonyu.iterator(e,1);
          case 1:
            if (!(_it_104.next())) { __pc=3; break; }
            ee=_it_104[0];
            
            //$LASTPOS=12002824;//kernel.TQuery:2824
            _this.fiber$push(_thread, ee);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            __pc=5;break;
          case 4:
            {
              //$LASTPOS=12002857;//kernel.TQuery:2857
              _this[_this.length]=e;
              //$LASTPOS=12002882;//kernel.TQuery:2882
              _this.length++;
            }
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    size :function _trc_TQuery_size() {
      "use strict";
      var _this=this;
      
      return _this.length;
    },
    fiber$size :function _trc_TQuery_f_size(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.length;return;
      
      
      _thread.retVal=_this;return;
    },
    find :function _trc_TQuery_find(f) {
      "use strict";
      var _this=this;
      var no;
      var o;
      var _it_107;
      
      //$LASTPOS=12002945;//kernel.TQuery:2945
      no = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=12002969;//kernel.TQuery:2969
      _it_107=Tonyu.iterator(_this,1);
      while(_it_107.next()) {
        o=_it_107[0];
        
        //$LASTPOS=12003000;//kernel.TQuery:3000
        if (f(o)) {
          //$LASTPOS=12003010;//kernel.TQuery:3010
          no.push(o);
        }
        
      }
      return no;
    },
    fiber$find :function _trc_TQuery_f_find(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var no;
      var o;
      var _it_107;
      
      //$LASTPOS=12002945;//kernel.TQuery:2945
      no = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=12002969;//kernel.TQuery:2969
      _it_107=Tonyu.iterator(_this,1);
      while(_it_107.next()) {
        o=_it_107[0];
        
        //$LASTPOS=12003000;//kernel.TQuery:3000
        if (f(o)) {
          //$LASTPOS=12003010;//kernel.TQuery:3010
          no.push(o);
        }
        
      }
      _thread.retVal=no;return;
      
      
      _thread.retVal=_this;return;
    },
    find1 :function _trc_TQuery_find1(f) {
      "use strict";
      var _this=this;
      
      return _this.find(f)[0];
    },
    fiber$find1 :function _trc_TQuery_f_find1(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find(f)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    apply :function _trc_TQuery_apply(name,args) {
      "use strict";
      var _this=this;
      var res;
      var o;
      var _it_111;
      var f;
      
      
      //$LASTPOS=12003130;//kernel.TQuery:3130
      if (! args) {
        //$LASTPOS=12003141;//kernel.TQuery:3141
        args=[];
      }
      //$LASTPOS=12003155;//kernel.TQuery:3155
      _it_111=Tonyu.iterator(_this,1);
      while(_it_111.next()) {
        o=_it_111[0];
        
        //$LASTPOS=12003186;//kernel.TQuery:3186
        f = o[name];
        
        //$LASTPOS=12003210;//kernel.TQuery:3210
        if (typeof  f=="function") {
          //$LASTPOS=12003251;//kernel.TQuery:3251
          res=f.apply(o,args);
          
        }
        
      }
      return res;
    },
    fiber$apply :function _trc_TQuery_f_apply(_thread,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var o;
      var _it_111;
      var f;
      
      
      //$LASTPOS=12003130;//kernel.TQuery:3130
      if (! args) {
        //$LASTPOS=12003141;//kernel.TQuery:3141
        args=[];
      }
      //$LASTPOS=12003155;//kernel.TQuery:3155
      _it_111=Tonyu.iterator(_this,1);
      while(_it_111.next()) {
        o=_it_111[0];
        
        //$LASTPOS=12003186;//kernel.TQuery:3186
        f = o[name];
        
        //$LASTPOS=12003210;//kernel.TQuery:3210
        if (typeof  f=="function") {
          //$LASTPOS=12003251;//kernel.TQuery:3251
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_3396(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3396(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=12003458;//kernel.TQuery:3458
      a = _this.alive();
      
      //$LASTPOS=12003478;//kernel.TQuery:3478
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=12003514;//kernel.TQuery:3514
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      
      _thread.enter(function _trc_TQuery_ent_die(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12003458;//kernel.TQuery:3458
            _this.fiber$alive(_thread);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=12003478;//kernel.TQuery:3478
            if (!(a.length==0)) { __pc=2; break; }
            _thread.exit(false);return;
          case 2:
            
            //$LASTPOS=12003514;//kernel.TQuery:3514
            a.apply("die");
            _thread.exit(true);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    klass :function _trc_TQuery_klass(k) {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_3583(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3583(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"contains":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":true},"min":{"nowait":true},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventHandler',
  shortName: 'EventHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.EventHandlerCaller],
  methods: {
    main :function _trc_EventHandler_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=13000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=13000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    toListener :function _trc_EventHandler_toListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000132;//kernel.EventHandler:132
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=13000179;//kernel.EventHandler:179
        f=_this.target[f];
        
      }
      //$LASTPOS=13000204;//kernel.EventHandler:204
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      return f;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000341;//kernel.EventHandler:341
      _this.listeners.push(_this.toListener(f));
      return {remove: (function anonymous_403() {
        
        //$LASTPOS=13000418;//kernel.EventHandler:418
        _this.removeListener(f);
      })};
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=13000493;//kernel.EventHandler:493
      i = _this.listeners.indexOf(f);
      
      //$LASTPOS=13000526;//kernel.EventHandler:526
      _this.listeners.splice(i,1);
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_120;
      
      //$LASTPOS=13000572;//kernel.EventHandler:572
      if (_this.released) {
        return _this;
      }
      
      //$LASTPOS=13000611;//kernel.EventHandler:611
      _it_120=Tonyu.iterator(_this.listeners,1);
      while(_it_120.next()) {
        h=_it_120[0];
        
        //$LASTPOS=13000855;//kernel.EventHandler:855
        _this.callEventHandler(h,args);
        
      }
    },
    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var h;
      var _it_120;
      
      //$LASTPOS=13000572;//kernel.EventHandler:572
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000611;//kernel.EventHandler:611
            _it_120=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_120.next())) { __pc=3; break; }
            h=_it_120[0];
            
            //$LASTPOS=13000855;//kernel.EventHandler:855
            _this.fiber$callEventHandler(_thread, h, args);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    release :function _trc_EventHandler_release() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000918;//kernel.EventHandler:918
      _this.released=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"toListener":{"nowait":true},"addListener":{"nowait":true},"removeListener":{"nowait":true},"fire":{"nowait":false},"release":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ScreenOutHandler',
  shortName: 'ScreenOutHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_ScreenOutHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ScreenOutHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_ScreenOutHandler_addListener(d,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=14000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_147() {
        
        //$LASTPOS=14000163;//kernel.ScreenOutHandler:163
        retThread.kill();
      })};
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000222;//kernel.ScreenOutHandler:222
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=14000240;//kernel.ScreenOutHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.WithinHandler',
  shortName: 'WithinHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_WithinHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_WithinHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_WithinHandler_addListener(d,r,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=15000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,_this.toListener(f));
      
      return {remove: (function anonymous_149() {
        
        //$LASTPOS=15000165;//kernel.WithinHandler:165
        retThread.kill();
      })};
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000225;//kernel.WithinHandler:225
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=15000244;//kernel.WithinHandler:244
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.OneframeSprite',
  shortName: 'OneframeSprite',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_OneframeSprite_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_OneframeSprite_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_OneframeSprite_initialize(params) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000054;//kernel.OneframeSprite:54
      _this.extend(params);
      //$LASTPOS=16000075;//kernel.OneframeSprite:75
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=16000127;//kernel.OneframeSprite:127
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=16000165;//kernel.OneframeSprite:165
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    die :function _trc_OneframeSprite_die() {
      "use strict";
      var _this=this;
      
    },
    fiber$die :function _trc_OneframeSprite_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    isDead :function _trc_OneframeSprite_isDead() {
      "use strict";
      var _this=this;
      
    },
    fiber$isDead :function _trc_OneframeSprite_f_isDead(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":false},"isDead":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MML',
  shortName: 'MML',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_MML_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=17000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=17000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=17000134;//kernel.MML:134
            _this.fiber$playNext(_thread);
            __pc=1;return;
          case 1:
            
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playNext :function _trc_MML_playNext() {
      "use strict";
      var _this=this;
      var mml;
      
      //$LASTPOS=17000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=17000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=17000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=17000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=17000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=17000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=17000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=17000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=17000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=17000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=17000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=17000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=17000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=17000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=17000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=17000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=17000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=17000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=17000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=17000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=17000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=17000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=17000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=17000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=17000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=17000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=17000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=17000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      _thread.retVal=_this._id;return;
      
      
      _thread.retVal=_this;return;
    },
    bufferCount :function _trc_MML_bufferCount() {
      "use strict";
      var _this=this;
      
      return _this.mmlBuf.length;
    },
    fiber$bufferCount :function _trc_MML_f_bufferCount(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mmlBuf.length;return;
      
      
      _thread.retVal=_this;return;
    },
    isPlaying :function _trc_MML_isPlaying() {
      "use strict";
      var _this=this;
      
      return _this.m;
    },
    fiber$isPlaying :function _trc_MML_f_isPlaying(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.m;return;
      
      
      _thread.retVal=_this;return;
    },
    currentTime :function _trc_MML_currentTime() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000755;//kernel.MML:755
      if (_this.m) {
        return _this.m.currentTime+_this.cTimeBase;
      }
      return - 1;
    },
    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=17000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=17000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=17000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=17000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=17000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=17000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=17000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=17001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=17000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=17000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=17000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=17000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=17000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=17000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=17000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=17001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.WaveTable',
  shortName: 'WaveTable',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_WaveTable_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=18000040;//kernel.WaveTable:40
      _this.env={};
      //$LASTPOS=18000335;//kernel.WaveTable:335
      if (typeof  T!=="undefined") {
        //$LASTPOS=18000416;//kernel.WaveTable:416
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=18000485;//kernel.WaveTable:485
        _this.setEnv(0,_this.env);
        //$LASTPOS=18000506;//kernel.WaveTable:506
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=18000040;//kernel.WaveTable:40
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000335;//kernel.WaveTable:335
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
            //$LASTPOS=18000416;//kernel.WaveTable:416
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=18000485;//kernel.WaveTable:485
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=18000506;//kernel.WaveTable:506
            _this.fiber$setWav(_thread, 0, T("pulse"));
            __pc=2;return;
          case 2:
            
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setWav :function _trc_WaveTable_setWav(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000123;//kernel.WaveTable:123
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000123;//kernel.WaveTable:123
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      "use strict";
      var _this=this;
      var synth;
      
      //$LASTPOS=18000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=18000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      _thread.retVal=synth;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_WaveTable_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_WaveTable_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Line',
  shortName: 'T1Line',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Line_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Line_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Line_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=19000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=19000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=19000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=19000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=19000156;//kernel.T1Line:156
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Line_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=19000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=19000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=19000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=19000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=19000156;//kernel.T1Line:156
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Sprite',
  shortName: 'T1Sprite',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Sprite_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Sprite_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Sprite_draw(ctx) {
      "use strict";
      var _this=this;
      var sgn;
      
      //$LASTPOS=20000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=20000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=20000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=20000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=20000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=20000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=20000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=20000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=20000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=20000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=20000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=20000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=20000585;//kernel.T1Sprite:585
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Sprite_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sgn;
      
      //$LASTPOS=20000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=20000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=20000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=20000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=20000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=20000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=20000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=20000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=20000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=20000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=20000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=20000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=20000585;//kernel.T1Sprite:585
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Text',
  shortName: 'T1Text',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [Tonyu.classes.kernel.TextRectMod],
  methods: {
    main :function _trc_T1Text_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Text_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Text_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var drawY;
      var textCount;
      var rect;
      
      //$LASTPOS=21000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=21000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=21000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=21000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=21000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=21000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=21000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=21000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=21000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=21000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=21000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=21000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=21000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=21000343;//kernel.T1Text:343
      //$LASTPOS=21000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=21000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=21000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=21000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=21000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=21000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=21000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=21000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=21000646;//kernel.T1Text:646
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Text_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var splitsText;
      var drawY;
      var textCount;
      var rect;
      
      //$LASTPOS=21000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=21000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=21000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=21000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=21000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=21000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=21000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=21000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=21000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=21000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=21000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=21000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=21000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=21000343;//kernel.T1Text:343
      //$LASTPOS=21000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=21000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=21000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=21000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=21000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=21000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=21000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=21000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=21000646;//kernel.T1Text:646
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Scheduler',
  shortName: 'Scheduler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Scheduler_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=22000059;//kernel.Scheduler:59
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=22000059;//kernel.Scheduler:59
      _this.next=[];
      
      _thread.retVal=_this;return;
    },
    addObj :function _trc_Scheduler_addObj(obj,name,args) {
      "use strict";
      var _this=this;
      
      return _this.newThread(obj,name,args);
    },
    fiber$addObj :function _trc_Scheduler_f_addObj(_thread,obj,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.newThread(obj,name,args);return;
      
      
      _thread.retVal=_this;return;
    },
    newThread :function _trc_Scheduler_newThread(obj,name,args,options) {
      "use strict";
      var _this=this;
      var th;
      
      //$LASTPOS=22000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=22000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=22000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      
      //$LASTPOS=22000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      //$LASTPOS=22000316;//kernel.Scheduler:316
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=22000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=22000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=22000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      
      //$LASTPOS=22000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22000316;//kernel.Scheduler:316
            _this.fiber$addToCur(_thread, th);
            __pc=1;return;
          case 1:
            
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    addToCur :function _trc_Scheduler_addToCur(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000371;//kernel.Scheduler:371
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=22000402;//kernel.Scheduler:402
      _this.cur.push(th);
      //$LASTPOS=22000421;//kernel.Scheduler:421
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000371;//kernel.Scheduler:371
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=22000402;//kernel.Scheduler:402
      _this.cur.push(th);
      //$LASTPOS=22000421;//kernel.Scheduler:421
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000466;//kernel.Scheduler:466
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=22000497;//kernel.Scheduler:497
      _this.next.push(th);
      //$LASTPOS=22000517;//kernel.Scheduler:517
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000466;//kernel.Scheduler:466
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=22000497;//kernel.Scheduler:497
      _this.next.push(th);
      //$LASTPOS=22000517;//kernel.Scheduler:517
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    unschedule :function _trc_Scheduler_unschedule(th) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=22000563;//kernel.Scheduler:563
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=22000591;//kernel.Scheduler:591
      if (i>=0) {
        //$LASTPOS=22000612;//kernel.Scheduler:612
        _this.cur.splice(i,1);
        //$LASTPOS=22000638;//kernel.Scheduler:638
        delete th.scheduled;
        
      } else {
        //$LASTPOS=22000679;//kernel.Scheduler:679
        i=_this.next.indexOf(th);
        //$LASTPOS=22000705;//kernel.Scheduler:705
        if (i>=0) {
          //$LASTPOS=22000726;//kernel.Scheduler:726
          _this.next.splice(i,1);
          //$LASTPOS=22000756;//kernel.Scheduler:756
          delete th.scheduled;
          
        }
        
      }
    },
    fiber$unschedule :function _trc_Scheduler_f_unschedule(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=22000563;//kernel.Scheduler:563
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=22000591;//kernel.Scheduler:591
      if (i>=0) {
        //$LASTPOS=22000612;//kernel.Scheduler:612
        _this.cur.splice(i,1);
        //$LASTPOS=22000638;//kernel.Scheduler:638
        delete th.scheduled;
        
      } else {
        //$LASTPOS=22000679;//kernel.Scheduler:679
        i=_this.next.indexOf(th);
        //$LASTPOS=22000705;//kernel.Scheduler:705
        if (i>=0) {
          //$LASTPOS=22000726;//kernel.Scheduler:726
          _this.next.splice(i,1);
          //$LASTPOS=22000756;//kernel.Scheduler:756
          delete th.scheduled;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_135;
      
      //$LASTPOS=22000815;//kernel.Scheduler:815
      _it_135=Tonyu.iterator(_this.cur,1);
      while(_it_135.next()) {
        t=_it_135[0];
        
        //$LASTPOS=22000842;//kernel.Scheduler:842
        delete t.scheduled;
        //$LASTPOS=22000868;//kernel.Scheduler:868
        if (t.waitCount) {
          //$LASTPOS=22000897;//kernel.Scheduler:897
          t.waitCount--;
          //$LASTPOS=22000925;//kernel.Scheduler:925
          _this.addToNext(t);
          
        } else {
          //$LASTPOS=22000967;//kernel.Scheduler:967
          t.steps();
          //$LASTPOS=22000991;//kernel.Scheduler:991
          if (t.preempted) {
            //$LASTPOS=22001076;//kernel.Scheduler:1076
            _this.addToNext(t);
            
          }
          
        }
        
      }
      //$LASTPOS=22001128;//kernel.Scheduler:1128
      _this.cur=_this.next;
      //$LASTPOS=22001143;//kernel.Scheduler:1143
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_135;
      
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22000815;//kernel.Scheduler:815
            _it_135=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_135.next())) { __pc=7; break; }
            t=_it_135[0];
            
            //$LASTPOS=22000842;//kernel.Scheduler:842
            delete t.scheduled;
            //$LASTPOS=22000868;//kernel.Scheduler:868
            if (!(t.waitCount)) { __pc=3; break; }
            //$LASTPOS=22000897;//kernel.Scheduler:897
            t.waitCount--;
            //$LASTPOS=22000925;//kernel.Scheduler:925
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
            __pc=6;break;
          case 3:
            //$LASTPOS=22000967;//kernel.Scheduler:967
            t.steps();
            //$LASTPOS=22000991;//kernel.Scheduler:991
            if (!(t.preempted)) { __pc=5; break; }
            //$LASTPOS=22001076;//kernel.Scheduler:1076
            _this.fiber$addToNext(_thread, t);
            __pc=4;return;
          case 4:
            
          case 5:
            
          case 6:
            
            __pc=1;break;
          case 7:
            
            //$LASTPOS=22001128;//kernel.Scheduler:1128
            _this.cur=_this.next;
            //$LASTPOS=22001143;//kernel.Scheduler:1143
            _this.next=[];
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"unschedule":{"nowait":false},"stepsAll":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.DialogMod',
  shortName: 'DialogMod',
  namespace: 'kernel',
  includes: [Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_DialogMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_DialogMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    prompt :function _trc_DialogMod_prompt(mesg,val) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=23000078;//kernel.DialogMod:78
      r=_this.waitFor(UIDiag.prompt(mesg,val));
      return r;
    },
    fiber$prompt :function _trc_DialogMod_f_prompt(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_prompt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=23000078;//kernel.DialogMod:78
            _this.fiber$waitFor(_thread, UIDiag.prompt(mesg,val));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    promptNumber :function _trc_DialogMod_promptNumber(mesg,val) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=23000173;//kernel.DialogMod:173
      r=_this.prompt(mesg,val);
      return _this.parseFloat(r);
    },
    fiber$promptNumber :function _trc_DialogMod_f_promptNumber(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_promptNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=23000173;//kernel.DialogMod:173
            _this.fiber$prompt(_thread, mesg, val);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(_this.parseFloat(r));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    confirm :function _trc_DialogMod_confirm(mesg) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=23000255;//kernel.DialogMod:255
      r=_this.waitFor(UIDiag.confirm(mesg));
      return r;
    },
    fiber$confirm :function _trc_DialogMod_f_confirm(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_confirm(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=23000255;//kernel.DialogMod:255
            _this.fiber$waitFor(_thread, UIDiag.confirm(mesg));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    alert :function _trc_DialogMod_alert(mesg) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=23000333;//kernel.DialogMod:333
      r=_this.waitFor(UIDiag.alert(mesg));
      return r;
    },
    fiber$alert :function _trc_DialogMod_f_alert(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_alert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=23000333;//kernel.DialogMod:333
            _this.fiber$waitFor(_thread, UIDiag.alert(mesg));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"prompt":{"nowait":false},"promptNumber":{"nowait":false},"confirm":{"nowait":false},"alert":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Keys',
  shortName: 'Keys',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Keys_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=24000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=24000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=24000239;//kernel.Keys:239
      //$LASTPOS=24000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=24000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=24000327;//kernel.Keys:327
      //$LASTPOS=24000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=24000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=24000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=24000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=24000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=24000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=24000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=24000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=24000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=24000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=24000652;//kernel.Keys:652
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=24000694;//kernel.Keys:694
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=24000737;//kernel.Keys:737
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=24000776;//kernel.Keys:776
        $(document).mouseup((function anonymous_796(e) {
          var a;
          
          //$LASTPOS=24000812;//kernel.Keys:812
          a = (function anonymous_818() {
            
            //$LASTPOS=24000834;//kernel.Keys:834
            if (Tonyu.globals.$InputDevice.touchEmu) {
              //$LASTPOS=24000880;//kernel.Keys:880
              Tonyu.globals.$touches[0].touched=0;
              
            }
            //$LASTPOS=24000931;//kernel.Keys:931
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=24000976;//kernel.Keys:976
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=24001042;//kernel.Keys:1042
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=24001117;//kernel.Keys:1117
            a();
            
          }
        }));
        
      }
    },
    fiber$main :function _trc_Keys_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=24000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=24000239;//kernel.Keys:239
      //$LASTPOS=24000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=24000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=24000327;//kernel.Keys:327
      //$LASTPOS=24000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=24000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=24000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=24000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=24000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=24000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=24000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=24000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=24000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=24000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=24000652;//kernel.Keys:652
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=24000694;//kernel.Keys:694
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=24000737;//kernel.Keys:737
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=24000776;//kernel.Keys:776
        $(document).mouseup((function anonymous_796(e) {
          var a;
          
          //$LASTPOS=24000812;//kernel.Keys:812
          a = (function anonymous_818() {
            
            //$LASTPOS=24000834;//kernel.Keys:834
            if (Tonyu.globals.$InputDevice.touchEmu) {
              //$LASTPOS=24000880;//kernel.Keys:880
              Tonyu.globals.$touches[0].touched=0;
              
            }
            //$LASTPOS=24000931;//kernel.Keys:931
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=24000976;//kernel.Keys:976
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=24001042;//kernel.Keys:1042
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=24001117;//kernel.Keys:1117
            a();
            
          }
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=24001174;//kernel.Keys:1174
      if (typeof  code=="string") {
        //$LASTPOS=24001212;//kernel.Keys:1212
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=24001256;//kernel.Keys:1256
      if (! code) {
        return 0;
      }
      //$LASTPOS=24001282;//kernel.Keys:1282
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=24001318;//kernel.Keys:1318
      if (! _this.stats[code]) {
        //$LASTPOS=24001336;//kernel.Keys:1336
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24001174;//kernel.Keys:1174
      if (typeof  code=="string") {
        //$LASTPOS=24001212;//kernel.Keys:1212
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=24001256;//kernel.Keys:1256
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=24001282;//kernel.Keys:1282
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=24001318;//kernel.Keys:1318
      if (! _this.stats[code]) {
        //$LASTPOS=24001336;//kernel.Keys:1336
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_147;
      
      //$LASTPOS=24001405;//kernel.Keys:1405
      _it_147=Tonyu.iterator(_this.stats,1);
      while(_it_147.next()) {
        i=_it_147[0];
        
        //$LASTPOS=24001437;//kernel.Keys:1437
        if (_this.stats[i]>0) {
          //$LASTPOS=24001454;//kernel.Keys:1454
          _this.stats[i]++;
          
        }
        //$LASTPOS=24001476;//kernel.Keys:1476
        if (_this.stats[i]==- 1) {
          //$LASTPOS=24001494;//kernel.Keys:1494
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=24001518;//kernel.Keys:1518
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=24001583;//kernel.Keys:1583
        _this.reservedAction.action();
        //$LASTPOS=24001617;//kernel.Keys:1617
        _this.reservedAction=null;
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_147;
      
      //$LASTPOS=24001405;//kernel.Keys:1405
      _it_147=Tonyu.iterator(_this.stats,1);
      while(_it_147.next()) {
        i=_it_147[0];
        
        //$LASTPOS=24001437;//kernel.Keys:1437
        if (_this.stats[i]>0) {
          //$LASTPOS=24001454;//kernel.Keys:1454
          _this.stats[i]++;
          
        }
        //$LASTPOS=24001476;//kernel.Keys:1476
        if (_this.stats[i]==- 1) {
          //$LASTPOS=24001494;//kernel.Keys:1494
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=24001518;//kernel.Keys:1518
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=24001583;//kernel.Keys:1583
        _this.reservedAction.action();
        //$LASTPOS=24001617;//kernel.Keys:1617
        _this.reservedAction=null;
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=24001668;//kernel.Keys:1668
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=24001697;//kernel.Keys:1697
      if (! s) {
        //$LASTPOS=24001716;//kernel.Keys:1716
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=24001748;//kernel.Keys:1748
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=24001668;//kernel.Keys:1668
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=24001697;//kernel.Keys:1697
      if (! s) {
        //$LASTPOS=24001716;//kernel.Keys:1716
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=24001748;//kernel.Keys:1748
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=24001801;//kernel.Keys:1801
      _this.stats[e.keyCode]=0;
      //$LASTPOS=24001826;//kernel.Keys:1826
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24001801;//kernel.Keys:1801
      _this.stats[e.keyCode]=0;
      //$LASTPOS=24001826;//kernel.Keys:1826
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.BaseActor',
  shortName: 'BaseActor',
  namespace: 'kernel',
  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod,Tonyu.classes.kernel.EventHandlerCaller,Tonyu.classes.kernel.DialogMod],
  methods: {
    main :function _trc_BaseActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_BaseActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_BaseActor_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25000226;//kernel.BaseActor:226
      if (Tonyu.runMode) {
        //$LASTPOS=25000245;//kernel.BaseActor:245
        _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      }
      //$LASTPOS=25000286;//kernel.BaseActor:286
      if (typeof  x=="object") {
        //$LASTPOS=25000310;//kernel.BaseActor:310
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=25000342;//kernel.BaseActor:342
        if (typeof  x=="number") {
          //$LASTPOS=25000377;//kernel.BaseActor:377
          _this.x=x;
          //$LASTPOS=25000396;//kernel.BaseActor:396
          _this.y=y;
          //$LASTPOS=25000415;//kernel.BaseActor:415
          _this.p=p;
          
        }
      }
      //$LASTPOS=25000437;//kernel.BaseActor:437
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=25000467;//kernel.BaseActor:467
      if (_this.scaleX==null) {
        //$LASTPOS=25000485;//kernel.BaseActor:485
        _this.scaleX=1;
      }
      //$LASTPOS=25000500;//kernel.BaseActor:500
      if (_this.rotation==null) {
        //$LASTPOS=25000520;//kernel.BaseActor:520
        _this.rotation=0;
      }
      //$LASTPOS=25000537;//kernel.BaseActor:537
      if (_this.rotate==null) {
        //$LASTPOS=25000555;//kernel.BaseActor:555
        _this.rotate=0;
      }
      //$LASTPOS=25000570;//kernel.BaseActor:570
      if (_this.alpha==null) {
        //$LASTPOS=25000587;//kernel.BaseActor:587
        _this.alpha=255;
      }
      //$LASTPOS=25000603;//kernel.BaseActor:603
      if (_this.zOrder==null) {
        //$LASTPOS=25000621;//kernel.BaseActor:621
        _this.zOrder=0;
      }
      //$LASTPOS=25000636;//kernel.BaseActor:636
      if (_this.age==null) {
        //$LASTPOS=25000651;//kernel.BaseActor:651
        _this.age=0;
      }
      //$LASTPOS=25000663;//kernel.BaseActor:663
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=25000714;//kernel.BaseActor:714
        _this.animMode=true;
        //$LASTPOS=25000738;//kernel.BaseActor:738
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=25000772;//kernel.BaseActor:772
        _this.animMode=false;
        
      }
      //$LASTPOS=25000800;//kernel.BaseActor:800
      if (_this.animFps==null) {
        //$LASTPOS=25000819;//kernel.BaseActor:819
        _this.animFps=1;
      }
    },
    extend :function _trc_BaseActor_extend(obj) {
      "use strict";
      var _this=this;
      
      return Tonyu.extend(_this,obj);
    },
    print :function _trc_BaseActor_print(pt) {
      "use strict";
      var _this=this;
      var mergedArg;
      var argCount;
      var printCount;
      
      //$LASTPOS=25000923;//kernel.BaseActor:923
      console.log.apply(console,arguments);
      //$LASTPOS=25000966;//kernel.BaseActor:966
      mergedArg = "";
      
      //$LASTPOS=25000989;//kernel.BaseActor:989
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=25001017;//kernel.BaseActor:1017
        //$LASTPOS=25001021;//kernel.BaseActor:1021
        argCount = 0;
        for (; argCount<arguments.length ; argCount++) {
          {
            //$LASTPOS=25001088;//kernel.BaseActor:1088
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
        }
        //$LASTPOS=25001153;//kernel.BaseActor:1153
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=25001192;//kernel.BaseActor:1192
        //$LASTPOS=25001196;//kernel.BaseActor:1196
        printCount = 0;
        for (; printCount<_this.splits.length ; printCount++) {
          {
            //$LASTPOS=25001266;//kernel.BaseActor:1266
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=25001307;//kernel.BaseActor:1307
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=25001357;//kernel.BaseActor:1357
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001480;//kernel.BaseActor:1480
      _this.animFps=f;
      //$LASTPOS=25001501;//kernel.BaseActor:1501
      _this.animFrame=0;
      //$LASTPOS=25001524;//kernel.BaseActor:1524
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001574;//kernel.BaseActor:1574
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001623;//kernel.BaseActor:1623
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001665;//kernel.BaseActor:1665
      _this.onUpdate();
      //$LASTPOS=25001682;//kernel.BaseActor:1682
      if (null) {
        //$LASTPOS=25001705;//kernel.BaseActor:1705
        null.suspend();
        //$LASTPOS=25001733;//kernel.BaseActor:1733
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=25001749;//kernel.BaseActor:1749
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001665;//kernel.BaseActor:1665
      _this.onUpdate();
      //$LASTPOS=25001682;//kernel.BaseActor:1682
      if (_thread) {
        //$LASTPOS=25001705;//kernel.BaseActor:1705
        _thread.suspend();
        //$LASTPOS=25001733;//kernel.BaseActor:1733
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=25001749;//kernel.BaseActor:1749
          Tonyu.globals.$Scheduler.addToNext(_thread);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    onUpdate :function _trc_BaseActor_onUpdate() {
      "use strict";
      var _this=this;
      
    },
    updateEx :function _trc_BaseActor_updateEx(updateT) {
      "use strict";
      var _this=this;
      var updateCount;
      
      //$LASTPOS=25001843;//kernel.BaseActor:1843
      //$LASTPOS=25001847;//kernel.BaseActor:1847
      updateCount = 0;
      for (; updateCount<updateT ; updateCount++) {
        {
          //$LASTPOS=25001910;//kernel.BaseActor:1910
          _this.update();
        }
      }
    },
    fiber$updateEx :function _trc_BaseActor_f_updateEx(_thread,updateT) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var updateCount;
      
      
      _thread.enter(function _trc_BaseActor_ent_updateEx(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25001843;//kernel.BaseActor:1843
            //$LASTPOS=25001847;//kernel.BaseActor:1847
            updateCount = 0;
            
          case 1:
            if (!(updateCount<updateT)) { __pc=4; break; }
            //$LASTPOS=25001910;//kernel.BaseActor:1910
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3:
            updateCount++;
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getkey :function _trc_BaseActor_getkey(k) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$Keys.getkey(k);
    },
    hitTo :function _trc_BaseActor_hitTo(t) {
      "use strict";
      var _this=this;
      
      return _this.crashTo(t);
    },
    all :function _trc_BaseActor_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=25002121;//kernel.BaseActor:2121
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=25002146;//kernel.BaseActor:2146
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=25002229;//kernel.BaseActor:2229
      _this.layer.sprites.forEach((function anonymous_2251(s) {
        
        //$LASTPOS=25002267;//kernel.BaseActor:2267
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=25002298;//kernel.BaseActor:2298
        if (! c||s instanceof c) {
          //$LASTPOS=25002339;//kernel.BaseActor:2339
          res.push(s);
          
        }
      }));
      return res;
    },
    allCrash :function _trc_BaseActor_allCrash(t) {
      "use strict";
      var _this=this;
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=25002419;//kernel.BaseActor:2419
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=25002444;//kernel.BaseActor:2444
      sp = _this;
      
      //$LASTPOS=25002481;//kernel.BaseActor:2481
      t1 = _this.getCrashRect();
      
      //$LASTPOS=25002509;//kernel.BaseActor:2509
      if (! t1) {
        return res;
      }
      //$LASTPOS=25002535;//kernel.BaseActor:2535
      _this.layer.sprites.forEach((function anonymous_2557(s) {
        var t2;
        
        
        //$LASTPOS=25002590;//kernel.BaseActor:2590
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=25002816;//kernel.BaseActor:2816
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25002896;//kernel.BaseActor:2896
      if (! t) {
        return false;
      }
      //$LASTPOS=25002923;//kernel.BaseActor:2923
      if (typeof  t=="function") {
        return _this.allCrash(t)[0];
        
      }
      return _this.crashTo1(t);
    },
    crashTo1 :function _trc_BaseActor_crashTo1(t) {
      "use strict";
      var _this=this;
      var t1;
      var t2;
      
      //$LASTPOS=25003046;//kernel.BaseActor:3046
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=25003086;//kernel.BaseActor:3086
      t1 = _this.getCrashRect();
      
      //$LASTPOS=25003114;//kernel.BaseActor:3114
      t2 = t.getCrashRect();
      
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_164;
      
      //$LASTPOS=25003423;//kernel.BaseActor:3423
      while (true) {
        //$LASTPOS=25003445;//kernel.BaseActor:3445
        if (typeof  d=="function") {
          //$LASTPOS=25003484;//kernel.BaseActor:3484
          _it_164=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_164.next()) {
            obj=_it_164[0];
            
            //$LASTPOS=25003526;//kernel.BaseActor:3526
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=25003583;//kernel.BaseActor:3583
          if (_this.crashTo(d)) {
            //$LASTPOS=25003612;//kernel.BaseActor:3612
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=25003657;//kernel.BaseActor:3657
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_164;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25003423;//kernel.BaseActor:3423
          case 1:
            //$LASTPOS=25003445;//kernel.BaseActor:3445
            if (!(typeof  d=="function")) { __pc=5; break; }
            //$LASTPOS=25003484;//kernel.BaseActor:3484
            _it_164=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_164.next())) { __pc=4; break; }
            obj=_it_164[0];
            
            //$LASTPOS=25003526;//kernel.BaseActor:3526
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            __pc=8;break;
          case 5:
            //$LASTPOS=25003583;//kernel.BaseActor:3583
            if (!(_this.crashTo(d))) { __pc=7; break; }
            //$LASTPOS=25003612;//kernel.BaseActor:3612
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=25003657;//kernel.BaseActor:3657
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getCrashRect :function _trc_BaseActor_getCrashRect() {
      "use strict";
      var _this=this;
      var actWidth;
      var actHeight;
      
      //$LASTPOS=25003708;//kernel.BaseActor:3708
      actWidth = _this.width*_this.scaleX;
      
      //$LASTPOS=25003751;//kernel.BaseActor:3751
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=25003793;//kernel.BaseActor:3793
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=25003839;//kernel.BaseActor:3839
        actHeight=_this.height*_this.scaleY;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      "use strict";
      var _this=this;
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=25004100;//kernel.BaseActor:4100
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=25004125;//kernel.BaseActor:4125
      sp = _this;
      
      //$LASTPOS=25004162;//kernel.BaseActor:4162
      t1 = _this.getCrashRect();
      
      //$LASTPOS=25004190;//kernel.BaseActor:4190
      if (! t1) {
        return res;
      }
      //$LASTPOS=25004216;//kernel.BaseActor:4216
      _this.layer.sprites.forEach((function anonymous_4238(s) {
        var t2;
        
        
        //$LASTPOS=25004271;//kernel.BaseActor:4271
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=25004454;//kernel.BaseActor:4454
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25004541;//kernel.BaseActor:4541
      if (! t) {
        return false;
      }
      //$LASTPOS=25004567;//kernel.BaseActor:4567
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25004713;//kernel.BaseActor:4713
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=25004752;//kernel.BaseActor:4752
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_174;
      
      //$LASTPOS=25004922;//kernel.BaseActor:4922
      while (true) {
        //$LASTPOS=25004944;//kernel.BaseActor:4944
        if (typeof  d=="function") {
          //$LASTPOS=25004983;//kernel.BaseActor:4983
          _it_174=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_174.next()) {
            obj=_it_174[0];
            
            //$LASTPOS=25005057;//kernel.BaseActor:5057
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=25005095;//kernel.BaseActor:5095
          if (_this.within(d,r)) {
            //$LASTPOS=25005125;//kernel.BaseActor:5125
            f(d);
            
          }
        }
        //$LASTPOS=25005151;//kernel.BaseActor:5151
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_174;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25004922;//kernel.BaseActor:4922
          case 1:
            //$LASTPOS=25004944;//kernel.BaseActor:4944
            if (typeof  d=="function") {
              //$LASTPOS=25004983;//kernel.BaseActor:4983
              _it_174=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_174.next()) {
                obj=_it_174[0];
                
                //$LASTPOS=25005057;//kernel.BaseActor:5057
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=25005095;//kernel.BaseActor:5095
              if (_this.within(d,r)) {
                //$LASTPOS=25005125;//kernel.BaseActor:5125
                f(d);
                
              }
            }
            //$LASTPOS=25005151;//kernel.BaseActor:5151
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25005215;//kernel.BaseActor:5215
      _this.layer.watchHit(typeA,typeB,(function anonymous_5245(a,b) {
        
        //$LASTPOS=25005263;//kernel.BaseActor:5263
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$Scheduler;
    },
    die :function _trc_BaseActor_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25005417;//kernel.BaseActor:5417
      _this.killThreadGroup();
      //$LASTPOS=25005441;//kernel.BaseActor:5441
      _this.hide();
      //$LASTPOS=25005454;//kernel.BaseActor:5454
      _this.fireEvent("die");
      //$LASTPOS=25005477;//kernel.BaseActor:5477
      _this._isDead=true;
      //$LASTPOS=25005496;//kernel.BaseActor:5496
      if (_this._poolArray) {
        //$LASTPOS=25005523;//kernel.BaseActor:5523
        _this._poolArray.push(_this);
        //$LASTPOS=25005555;//kernel.BaseActor:5555
        _this.objectPoolAge=(_this.objectPoolAge||0)+1;
        
      }
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25005624;//kernel.BaseActor:5624
      _this.layer.remove(_this);
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25005675;//kernel.BaseActor:5675
      _this.layer.add(_this);
      //$LASTPOS=25005697;//kernel.BaseActor:5697
      if (x!=null) {
        //$LASTPOS=25005710;//kernel.BaseActor:5710
        _this.x=x;
      }
      //$LASTPOS=25005725;//kernel.BaseActor:5725
      if (y!=null) {
        //$LASTPOS=25005738;//kernel.BaseActor:5738
        _this.y=y;
      }
      //$LASTPOS=25005753;//kernel.BaseActor:5753
      if (p!=null) {
        //$LASTPOS=25005766;//kernel.BaseActor:5766
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25005811;//kernel.BaseActor:5811
      if (typeof  _this.p!="number") {
        //$LASTPOS=25005846;//kernel.BaseActor:5846
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=25005879;//kernel.BaseActor:5879
        _this.p=0;
        
      }
      //$LASTPOS=25005896;//kernel.BaseActor:5896
      _this.p=Math.floor(_this.p);
      //$LASTPOS=25005918;//kernel.BaseActor:5918
      _this.pImg=Tonyu.globals.$imageList[_this.p];
      //$LASTPOS=25005943;//kernel.BaseActor:5943
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=25005967;//kernel.BaseActor:5967
      _this.width=_this.pImg.width;
      //$LASTPOS=25005990;//kernel.BaseActor:5990
      _this.height=_this.pImg.height;
    },
    isDead :function _trc_BaseActor_isDead() {
      "use strict";
      var _this=this;
      
      return _this._isDead;
    },
    _animation :function _trc_BaseActor__animation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25006087;//kernel.BaseActor:6087
      _this.age++;
      //$LASTPOS=25006099;//kernel.BaseActor:6099
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=25006140;//kernel.BaseActor:6140
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=25006180;//kernel.BaseActor:6180
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=25006229;//kernel.BaseActor:6229
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=25006282;//kernel.BaseActor:6282
      _this.detectShape();
      //$LASTPOS=25006302;//kernel.BaseActor:6302
      if (_this.pImg) {
        //$LASTPOS=25006323;//kernel.BaseActor:6323
        ctx.save();
        //$LASTPOS=25006344;//kernel.BaseActor:6344
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=25006488;//kernel.BaseActor:6488
        _this._animation();
        //$LASTPOS=25006511;//kernel.BaseActor:6511
        if (_this.rotation!=0) {
          //$LASTPOS=25006546;//kernel.BaseActor:6546
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=25006614;//kernel.BaseActor:6614
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=25006671;//kernel.BaseActor:6671
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=25006723;//kernel.BaseActor:6723
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=25006788;//kernel.BaseActor:6788
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=25006844;//kernel.BaseActor:6844
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=25006885;//kernel.BaseActor:6885
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=25007017;//kernel.BaseActor:7017
        ctx.restore();
        
      } else {
        //$LASTPOS=25007044;//kernel.BaseActor:7044
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=25007092;//kernel.BaseActor:7092
          splitsText = (_this.text+"").split("\n");
          
          //$LASTPOS=25007139;//kernel.BaseActor:7139
          _this.drawY=_this.y;
          //$LASTPOS=25007157;//kernel.BaseActor:7157
          if (! _this.size) {
            //$LASTPOS=25007168;//kernel.BaseActor:7168
            _this.size=15;
          }
          //$LASTPOS=25007186;//kernel.BaseActor:7186
          if (! _this.align) {
            //$LASTPOS=25007198;//kernel.BaseActor:7198
            _this.align="center";
          }
          //$LASTPOS=25007223;//kernel.BaseActor:7223
          if (! _this.fillStyle) {
            //$LASTPOS=25007239;//kernel.BaseActor:7239
            _this.fillStyle="white";
          }
          //$LASTPOS=25007267;//kernel.BaseActor:7267
          if (_this.font) {
            //$LASTPOS=25007277;//kernel.BaseActor:7277
            ctx.font=_this.size+"px "+_this.font;
          }
          //$LASTPOS=25007312;//kernel.BaseActor:7312
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=25007346;//kernel.BaseActor:7346
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=25007387;//kernel.BaseActor:7387
          _this.height=0;
          //$LASTPOS=25007396;//kernel.BaseActor:7396
          _this.width=0;
          //$LASTPOS=25007414;//kernel.BaseActor:7414
          //$LASTPOS=25007418;//kernel.BaseActor:7418
          textCount = 0;
          for (; textCount<splitsText.length ; textCount++) {
            {
              //$LASTPOS=25007489;//kernel.BaseActor:7489
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              
              //$LASTPOS=25007585;//kernel.BaseActor:7585
              if (_this.width<rect.w) {
                //$LASTPOS=25007602;//kernel.BaseActor:7602
                _this.width=rect.w;
              }
              //$LASTPOS=25007629;//kernel.BaseActor:7629
              _this.height+=rect.h;
              //$LASTPOS=25007658;//kernel.BaseActor:7658
              _this.drawY+=_this.size;
            }
          }
          
        }
      }
      //$LASTPOS=25007694;//kernel.BaseActor:7694
      if (_this._fukidashi) {
        //$LASTPOS=25007721;//kernel.BaseActor:7721
        if (_this._fukidashi.c>0) {
          //$LASTPOS=25007756;//kernel.BaseActor:7756
          _this._fukidashi.c--;
          //$LASTPOS=25007785;//kernel.BaseActor:7785
          ctx.fillStyle="white";
          //$LASTPOS=25007821;//kernel.BaseActor:7821
          ctx.strokeStyle="black";
          //$LASTPOS=25007859;//kernel.BaseActor:7859
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25007987;//kernel.BaseActor:7987
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=25008059;//kernel.BaseActor:8059
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25007987;//kernel.BaseActor:7987
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=25008059;//kernel.BaseActor:8059
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var cp;
      
      //$LASTPOS=25008141;//kernel.BaseActor:8141
      if (! a) {
        //$LASTPOS=25008149;//kernel.BaseActor:8149
        a=0;
      }
      //$LASTPOS=25008175;//kernel.BaseActor:8175
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      return _this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cp;
      
      //$LASTPOS=25008141;//kernel.BaseActor:8141
      if (! a) {
        //$LASTPOS=25008149;//kernel.BaseActor:8149
        a=0;
      }
      //$LASTPOS=25008175;//kernel.BaseActor:8175
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      _thread.retVal=_this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25008633;//kernel.BaseActor:8633
      while (true) {
        //$LASTPOS=25008655;//kernel.BaseActor:8655
        while (true) {
          //$LASTPOS=25008681;//kernel.BaseActor:8681
          if (_this.screenOut()>d) {
            //$LASTPOS=25008717;//kernel.BaseActor:8717
            f();
            break;
            
            
          }
          //$LASTPOS=25008774;//kernel.BaseActor:8774
          _this.update();
          
        }
        //$LASTPOS=25008804;//kernel.BaseActor:8804
        while (true) {
          //$LASTPOS=25008830;//kernel.BaseActor:8830
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=25008902;//kernel.BaseActor:8902
          _this.update();
          
        }
        //$LASTPOS=25008932;//kernel.BaseActor:8932
        _this.update();
        
      }
    },
    fiber$screenOutChecker :function _trc_BaseActor_f_screenOutChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_screenOutChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25008633;//kernel.BaseActor:8633
          case 1:
            //$LASTPOS=25008655;//kernel.BaseActor:8655
          case 2:
            //$LASTPOS=25008681;//kernel.BaseActor:8681
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=25008717;//kernel.BaseActor:8717
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=25008774;//kernel.BaseActor:8774
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=25008804;//kernel.BaseActor:8804
          case 6:
            //$LASTPOS=25008830;//kernel.BaseActor:8830
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=25008902;//kernel.BaseActor:8902
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=25008932;//kernel.BaseActor:8932
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            __pc=1;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    file :function _trc_BaseActor_file(path) {
      "use strict";
      var _this=this;
      var d;
      var files;
      
      //$LASTPOS=25008972;//kernel.BaseActor:8972
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=25009014;//kernel.BaseActor:9014
      files = d.rel("files/");
      
      return files.rel(path).setPolicy({topDir: d});
    },
    fiber$file :function _trc_BaseActor_f_file(_thread,path) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=25008972;//kernel.BaseActor:8972
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=25009014;//kernel.BaseActor:9014
      files = d.rel("files/");
      
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25009123;//kernel.BaseActor:9123
      _this.runAsync((function anonymous_9132(f) {
        
        //$LASTPOS=25009147;//kernel.BaseActor:9147
        Tonyu.globals.$InputDevice.addOnetimeListener(f);
      }));
    },
    fiber$waitInputDevice :function _trc_BaseActor_f_waitInputDevice(_thread,fl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_waitInputDevice(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25009123;//kernel.BaseActor:9123
            _this.fiber$runAsync(_thread, (function anonymous_9132(f) {
              
              //$LASTPOS=25009147;//kernel.BaseActor:9147
              Tonyu.globals.$InputDevice.addOnetimeListener(f);
            }));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    color :function _trc_BaseActor_color(r,g,b) {
      "use strict";
      var _this=this;
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    loadPage :function _trc_BaseActor_loadPage() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25009393;//kernel.BaseActor:9393
      Tonyu.globals.$Boot.loadPage.apply(Tonyu.globals.$Boot,arguments);
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25009518;//kernel.BaseActor:9518
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25009518;//kernel.BaseActor:9518
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    __setter__useObjectPool :function _trc_BaseActor___setter__useObjectPool(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25009567;//kernel.BaseActor:9567
      if (value) {
        //$LASTPOS=25009589;//kernel.BaseActor:9589
        _this._poolArray=Tonyu.globals.$ObjectPool.poolList(_this.getClassInfo().fullName);
        
      }
    },
    appear :function _trc_BaseActor_appear(o,param) {
      "use strict";
      var _this=this;
      var p;
      var k;
      var _it_186;
      
      //$LASTPOS=25009682;//kernel.BaseActor:9682
      if (typeof  o=="function") {
        //$LASTPOS=25009719;//kernel.BaseActor:9719
        if (param) {
          //$LASTPOS=25009732;//kernel.BaseActor:9732
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=25009775;//kernel.BaseActor:9775
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=25009829;//kernel.BaseActor:9829
        if (p) {
          //$LASTPOS=25009848;//kernel.BaseActor:9848
          _it_186=Tonyu.iterator(Object.keys(p),1);
          while(_it_186.next()) {
            k=_it_186[0];
            
            //$LASTPOS=25009893;//kernel.BaseActor:9893
            if (k!="objectPoolAge") {
              //$LASTPOS=25009917;//kernel.BaseActor:9917
              delete p[k];
            }
            
          }
          //$LASTPOS=25009946;//kernel.BaseActor:9946
          o.call(p,param);
          return p;
          
        } else {
          return new o(param);
          
        }
        
      } else {
        return o;
        
      }
    },
    fiber$appear :function _trc_BaseActor_f_appear(_thread,o,param) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      var k;
      var _it_186;
      
      //$LASTPOS=25009682;//kernel.BaseActor:9682
      if (typeof  o=="function") {
        //$LASTPOS=25009719;//kernel.BaseActor:9719
        if (param) {
          //$LASTPOS=25009732;//kernel.BaseActor:9732
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=25009775;//kernel.BaseActor:9775
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=25009829;//kernel.BaseActor:9829
        if (p) {
          //$LASTPOS=25009848;//kernel.BaseActor:9848
          _it_186=Tonyu.iterator(Object.keys(p),1);
          while(_it_186.next()) {
            k=_it_186[0];
            
            //$LASTPOS=25009893;//kernel.BaseActor:9893
            if (k!="objectPoolAge") {
              //$LASTPOS=25009917;//kernel.BaseActor:9917
              delete p[k];
            }
            
          }
          //$LASTPOS=25009946;//kernel.BaseActor:9946
          o.call(p,param);
          _thread.retVal=p;return;
          
          
        } else {
          _thread.retVal=new o(param);return;
          
          
        }
        
      } else {
        _thread.retVal=o;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_BaseActor_wait(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25010097;//kernel.BaseActor:10097
      if (null) {
        //$LASTPOS=25010120;//kernel.BaseActor:10120
        null.suspend();
        //$LASTPOS=25010148;//kernel.BaseActor:10148
        if (t) {
          //$LASTPOS=25010170;//kernel.BaseActor:10170
          null.waitCount=t;
          //$LASTPOS=25010204;//kernel.BaseActor:10204
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=25010220;//kernel.BaseActor:10220
            Tonyu.globals.$Scheduler.addToNext(null);
          }
          
        }
        
      } else {
        //$LASTPOS=25010274;//kernel.BaseActor:10274
        if (_this._th) {
          //$LASTPOS=25010294;//kernel.BaseActor:10294
          if (t) {
            //$LASTPOS=25010316;//kernel.BaseActor:10316
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=25010364;//kernel.BaseActor:10364
            if (_this._th.scheduled) {
              //$LASTPOS=25010383;//kernel.BaseActor:10383
              _this._th.scheduled.unschedule(_this._th);
            }
            
          }
          
        }
      }
    },
    fiber$wait :function _trc_BaseActor_f_wait(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25010097;//kernel.BaseActor:10097
      if (_thread) {
        //$LASTPOS=25010120;//kernel.BaseActor:10120
        _thread.suspend();
        //$LASTPOS=25010148;//kernel.BaseActor:10148
        if (t) {
          //$LASTPOS=25010170;//kernel.BaseActor:10170
          _thread.waitCount=t;
          //$LASTPOS=25010204;//kernel.BaseActor:10204
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=25010220;//kernel.BaseActor:10220
            Tonyu.globals.$Scheduler.addToNext(_thread);
          }
          
        }
        
      } else {
        //$LASTPOS=25010274;//kernel.BaseActor:10274
        if (_this._th) {
          //$LASTPOS=25010294;//kernel.BaseActor:10294
          if (t) {
            //$LASTPOS=25010316;//kernel.BaseActor:10316
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=25010364;//kernel.BaseActor:10364
            if (_this._th.scheduled) {
              //$LASTPOS=25010383;//kernel.BaseActor:10383
              _this._th.scheduled.unschedule(_this._th);
            }
            
          }
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    notify :function _trc_BaseActor_notify() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25010460;//kernel.BaseActor:10460
      if (_this._th) {
        //$LASTPOS=25010480;//kernel.BaseActor:10480
        if (_this._th.scheduled) {
          //$LASTPOS=25010515;//kernel.BaseActor:10515
          _this._th.waitCount=0;
          
        } else {
          //$LASTPOS=25010563;//kernel.BaseActor:10563
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=25010579;//kernel.BaseActor:10579
            Tonyu.globals.$Scheduler.addToCur(_this._th);
          }
          
        }
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"_animation":{"nowait":true},"draw":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"color":{"nowait":true},"loadPage":{"nowait":true},"setVisible":{"nowait":false},"__setter__useObjectPool":{"nowait":true},"appear":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.CrashToHandler',
  shortName: 'CrashToHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_CrashToHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_CrashToHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_CrashToHandler_addListener(d,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=26000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_145() {
        
        //$LASTPOS=26000161;//kernel.CrashToHandler:161
        retThread.kill();
      })};
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26000221;//kernel.CrashToHandler:221
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=26000240;//kernel.CrashToHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.NoviceActor',
  shortName: 'NoviceActor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_NoviceActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_NoviceActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sleep :function _trc_NoviceActor_sleep(n) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=27000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=27000071;//kernel.NoviceActor:71
      //$LASTPOS=27000075;//kernel.NoviceActor:75
      n;for (; n>0 ; n--) {
        //$LASTPOS=27000086;//kernel.NoviceActor:86
        _this.update();
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=27000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000071;//kernel.NoviceActor:71
            //$LASTPOS=27000075;//kernel.NoviceActor:75
            n;
          case 1:
            if (!(n>0)) { __pc=4; break; }
            //$LASTPOS=27000086;//kernel.NoviceActor:86
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3:
            n--;
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprite :function _trc_NoviceActor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=27000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=27000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=27000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=27000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=27000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=27000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=27000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=27000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=27000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000390;//kernel.NoviceActor:390
      _this.go(x,y,p);
    },
    fiber$sprite :function _trc_NoviceActor_f_sprite(_thread,x,y,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_sprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000390;//kernel.NoviceActor:390
            _this.fiber$go(_thread, x, y, p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    show :function _trc_NoviceActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000465;//kernel.NoviceActor:465
      _this._sprite.draw(ctx);
    },
    getCrashRect :function _trc_NoviceActor_getCrashRect() {
      "use strict";
      var _this=this;
      
      return _this._sprite.getCrashRect();
    },
    go :function _trc_NoviceActor_go(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=27000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=27000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=27000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=27000632;//kernel.NoviceActor:632
        _this._sprite.p=p;
      }
    },
    fiber$go :function _trc_NoviceActor_f_go(_thread,x,y,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_go(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=27000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=27000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=27000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=27000632;//kernel.NoviceActor:632
              _this._sprite.p=p;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    change :function _trc_NoviceActor_change(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=27000703;//kernel.NoviceActor:703
      _this._sprite.p=p;
    },
    fiber$change :function _trc_NoviceActor_f_change(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_change(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=27000703;//kernel.NoviceActor:703
            _this._sprite.p=p;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.PlayMod',
  shortName: 'PlayMod',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_PlayMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_PlayMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initMML :function _trc_PlayMod_initMML() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=28000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=28000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=28000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=28000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=28000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=28000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=28000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=28000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_191;
      
      //$LASTPOS=28000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=28000343;//kernel.PlayMod:343
        _it_191=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_191.next()) {
          k=_it_191[0];
          v=_it_191[1];
          
          //$LASTPOS=28000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=28000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=28000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=28000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=28000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=28000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=28000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=28000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=28000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=28000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=28000647;//kernel.PlayMod:647
      //$LASTPOS=28000652;//kernel.PlayMod:652
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=28000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=28000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=28000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=28000796;//kernel.PlayMod:796
        _this.update();
        
      }
      return _this._mml;
    },
    fiber$play :function _trc_PlayMod_f_play(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mmls;
      var i;
      
      //$LASTPOS=28000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=28000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=28000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=28000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=28000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=28000647;//kernel.PlayMod:647
      //$LASTPOS=28000652;//kernel.PlayMod:652
      i = 0;
      for (; i<_arguments.length ; i++) {
        {
          //$LASTPOS=28000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
      }
      //$LASTPOS=28000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=28000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=28000796;//kernel.PlayMod:796
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this._mml);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    playSE :function _trc_PlayMod_playSE() {
      "use strict";
      var _this=this;
      var mml;
      var mmls;
      var i;
      
      //$LASTPOS=28000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=28000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      
      //$LASTPOS=28000897;//kernel.PlayMod:897
      mmls = [];
      
      //$LASTPOS=28000915;//kernel.PlayMod:915
      //$LASTPOS=28000920;//kernel.PlayMod:920
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=28000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=28001002;//kernel.PlayMod:1002
      mml.play(mmls);
      return mml;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ParallelMod',
  shortName: 'ParallelMod',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_ParallelMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ParallelMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_ParallelMod_parallel() {
      "use strict";
      var _this=this;
      var args;
      var i;
      var name;
      var th;
      
      //$LASTPOS=29000049;//kernel.ParallelMod:49
      args = [];
      
      //$LASTPOS=29000068;//kernel.ParallelMod:68
      //$LASTPOS=29000073;//kernel.ParallelMod:73
      i = 1;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=29000119;//kernel.ParallelMod:119
          args.push(arguments[i]);
        }
      }
      //$LASTPOS=29000158;//kernel.ParallelMod:158
      name = arguments[0];
      
      
      //$LASTPOS=29000201;//kernel.ParallelMod:201
      th=Tonyu.globals.$Boot.schedule(_this,name,args);
      return th;
    },
    call :function _trc_ParallelMod_call() {
      "use strict";
      var _this=this;
      var a;
      var t;
      var n;
      var f;
      var ag2;
      
      //$LASTPOS=29000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=29000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=29000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=29000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=29000379;//kernel.ParallelMod:379
      ag2 = a.toArray();
      
      //$LASTPOS=29000405;//kernel.ParallelMod:405
      ag2.unshift(null);
      return f.apply(t,ag2);
    },
    fiber$call :function _trc_ParallelMod_f_call(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var t;
      var n;
      var f;
      var ag2;
      
      //$LASTPOS=29000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=29000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=29000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=29000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=29000379;//kernel.ParallelMod:379
      ag2 = a.toArray();
      
      //$LASTPOS=29000405;//kernel.ParallelMod:405
      ag2.unshift(_thread);
      _thread.retVal=f.apply(t,ag2);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"parallel":{"nowait":true},"call":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Actor',
  shortName: 'Actor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],
  methods: {
    main :function _trc_Actor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Actor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Actor_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000088;//kernel.Actor:88
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=30000107;//kernel.Actor:107
      if (Tonyu.runMode) {
        //$LASTPOS=30000126;//kernel.Actor:126
        _this.initSprite();
      }
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=30000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=30000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=30000287;//kernel.Actor:287
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=30000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=30000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000287;//kernel.Actor:287
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Actor_onAppear() {
      "use strict";
      var _this=this;
      
    },
    fiber$onAppear :function _trc_Actor_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.GameScreen',
  shortName: 'GameScreen',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GameScreen_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GameScreen_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameScreen_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=31000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=31000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=31000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=31000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=31000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=31000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=31000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=31000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=31000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=31000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=31000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=31000655;//kernel.GameScreen:655
      b = _this.bounds;
      
      //$LASTPOS=31000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=31000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=31000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=31000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=31000878;//kernel.GameScreen:878
      if (! b) {
        return point;
      }
      return {x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};
    },
    fiber$canvas2buf :function _trc_GameScreen_f_canvas2buf(_thread,point) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      
      //$LASTPOS=31000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=31000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=31001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=31001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=31001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=31001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=31001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=31001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=31001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=31001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=31001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=31001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"setBounds":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Map',
  shortName: 'Map',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Map_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Map_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Map_initialize(param) {
      "use strict";
      var _this=this;
      var j;
      var i;
      
      //$LASTPOS=32000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=32000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=32000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=32000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=32000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=32000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=32000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=32000233;//kernel.Map:233
      //$LASTPOS=32000237;//kernel.Map:237
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=32000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=32000286;//kernel.Map:286
          //$LASTPOS=32000290;//kernel.Map:290
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=32000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=32000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
      }
      //$LASTPOS=32000391;//kernel.Map:391
      //$LASTPOS=32000395;//kernel.Map:395
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=32000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=32000444;//kernel.Map:444
          //$LASTPOS=32000448;//kernel.Map:448
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=32000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=32000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
      }
      //$LASTPOS=32000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=32000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=32000674;//kernel.Map:674
      //$LASTPOS=32000678;//kernel.Map:678
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=32000707;//kernel.Map:707
          //$LASTPOS=32000711;//kernel.Map:711
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=32000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
          }
        }
      }
      //$LASTPOS=32000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=32000819;//kernel.Map:819
      //$LASTPOS=32000823;//kernel.Map:823
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=32000852;//kernel.Map:852
          //$LASTPOS=32000856;//kernel.Map:856
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=32000889;//kernel.Map:889
              _this.setOn(j,i,_this.mapOnData[i][j]);
            }
          }
        }
      }
    },
    fiber$initMap :function _trc_Map_f_initMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=32000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32000674;//kernel.Map:674
            //$LASTPOS=32000678;//kernel.Map:678
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7; break; }
            //$LASTPOS=32000707;//kernel.Map:707
            //$LASTPOS=32000711;//kernel.Map:711
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5; break; }
            //$LASTPOS=32000744;//kernel.Map:744
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
          case 4:
            j++;
            __pc=2;break;
          case 5:
            
          case 6:
            i++;
            __pc=1;break;
          case 7:
            
            //$LASTPOS=32000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=8; break; }
            _thread.exit(_this);return;
          case 8:
            
            //$LASTPOS=32000819;//kernel.Map:819
            //$LASTPOS=32000823;//kernel.Map:823
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15; break; }
            //$LASTPOS=32000852;//kernel.Map:852
            //$LASTPOS=32000856;//kernel.Map:856
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13; break; }
            //$LASTPOS=32000889;//kernel.Map:889
            _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);
            __pc=11;return;
          case 11:
            
          case 12:
            j++;
            __pc=10;break;
          case 13:
            
          case 14:
            i++;
            __pc=9;break;
          case 15:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    redrawMap :function _trc_Map_redrawMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=32000958;//kernel.Map:958
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=32000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=32001057;//kernel.Map:1057
      //$LASTPOS=32001061;//kernel.Map:1061
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=32001090;//kernel.Map:1090
          //$LASTPOS=32001094;//kernel.Map:1094
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=32001127;//kernel.Map:1127
              _this.set(j,i,_this.mapTable[i][j]);
            }
          }
        }
      }
      //$LASTPOS=32001175;//kernel.Map:1175
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=32001204;//kernel.Map:1204
      //$LASTPOS=32001208;//kernel.Map:1208
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=32001237;//kernel.Map:1237
          //$LASTPOS=32001241;//kernel.Map:1241
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=32001274;//kernel.Map:1274
              _this.setOn(j,i,_this.mapOnTable[i][j]);
            }
          }
        }
      }
    },
    fiber$redrawMap :function _trc_Map_f_redrawMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=32000958;//kernel.Map:958
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32001057;//kernel.Map:1057
            //$LASTPOS=32001061;//kernel.Map:1061
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7; break; }
            //$LASTPOS=32001090;//kernel.Map:1090
            //$LASTPOS=32001094;//kernel.Map:1094
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5; break; }
            //$LASTPOS=32001127;//kernel.Map:1127
            _this.fiber$set(_thread, j, i, _this.mapTable[i][j]);
            __pc=3;return;
          case 3:
            
          case 4:
            j++;
            __pc=2;break;
          case 5:
            
          case 6:
            i++;
            __pc=1;break;
          case 7:
            
            //$LASTPOS=32001175;//kernel.Map:1175
            if (!(! _this.mapOnTable)) { __pc=8; break; }
            _thread.exit(_this);return;
          case 8:
            
            //$LASTPOS=32001204;//kernel.Map:1204
            //$LASTPOS=32001208;//kernel.Map:1208
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15; break; }
            //$LASTPOS=32001237;//kernel.Map:1237
            //$LASTPOS=32001241;//kernel.Map:1241
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13; break; }
            //$LASTPOS=32001274;//kernel.Map:1274
            _this.fiber$setOn(_thread, j, i, _this.mapOnTable[i][j]);
            __pc=11;return;
          case 11:
            
          case 12:
            j++;
            __pc=10;break;
          case 13:
            
          case 14:
            i++;
            __pc=9;break;
          case 15:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Map_load(dataFile) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=32001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=32001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=32001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=32001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=32001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=32001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=32001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=32001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=32001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=32001684;//kernel.Map:1684
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=32001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=32001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=32001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=32001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=32001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=32001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=32001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=32001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=32001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32001684;//kernel.Map:1684
            _this.fiber$initMap(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    set :function _trc_Map_set(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=32001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=32001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=32001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=32001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=32001947;//kernel.Map:1947
      if (! _this.pImg) {
        //$LASTPOS=32001969;//kernel.Map:1969
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=32002070;//kernel.Map:2070
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=32002147;//kernel.Map:2147
      _this.ctx.save();
      //$LASTPOS=32002164;//kernel.Map:2164
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=32002308;//kernel.Map:2308
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=32001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=32001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=32001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=32001947;//kernel.Map:1947
      if (! _this.pImg) {
        //$LASTPOS=32001969;//kernel.Map:1969
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=32002070;//kernel.Map:2070
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=32002147;//kernel.Map:2147
      _this.ctx.save();
      //$LASTPOS=32002164;//kernel.Map:2164
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=32002308;//kernel.Map:2308
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32002357;//kernel.Map:2357
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=32002425;//kernel.Map:2425
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=32002475;//kernel.Map:2475
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=32002510;//kernel.Map:2510
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=32002544;//kernel.Map:2544
      p=Math.floor(p);
      //$LASTPOS=32002566;//kernel.Map:2566
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=32002591;//kernel.Map:2591
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=32002615;//kernel.Map:2615
      _this.ctx.save();
      //$LASTPOS=32002632;//kernel.Map:2632
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=32002776;//kernel.Map:2776
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32002357;//kernel.Map:2357
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32002425;//kernel.Map:2425
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=32002475;//kernel.Map:2475
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=32002510;//kernel.Map:2510
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=32002544;//kernel.Map:2544
            p=Math.floor(p);
            //$LASTPOS=32002566;//kernel.Map:2566
            _this.pImg=Tonyu.globals.$imageList[p];
            //$LASTPOS=32002591;//kernel.Map:2591
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=32002615;//kernel.Map:2615
            _this.ctx.save();
            //$LASTPOS=32002632;//kernel.Map:2632
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=32002776;//kernel.Map:2776
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32002823;//kernel.Map:2823
      _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setOnAt :function _trc_Map_f_setOnAt(_thread,setX,setY,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setOnAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32002823;//kernel.Map:2823
            _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAt :function _trc_Map_setAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32002918;//kernel.Map:2918
      _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setAt :function _trc_Map_f_setAt(_thread,setX,setY,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32002918;//kernel.Map:2918
            _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    get :function _trc_Map_get(getCol,getRow) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32003011;//kernel.Map:3011
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32003011;//kernel.Map:3011
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getAt :function _trc_Map_getAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getAt :function _trc_Map_f_getAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    getOn :function _trc_Map_getOn(getCol,getRow) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32003243;//kernel.Map:3243
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapOnTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32003243;//kernel.Map:3243
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapOnTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getOnAt :function _trc_Map_getOnAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getOnAt :function _trc_Map_f_getOnAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Map_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32003486;//kernel.Map:3486
      _this.sx=- scrollX;
      //$LASTPOS=32003504;//kernel.Map:3504
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32003486;//kernel.Map:3486
      _this.sx=- scrollX;
      //$LASTPOS=32003504;//kernel.Map:3504
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32003539;//kernel.Map:3539
      _this.pImg=_this.buf[0];
      //$LASTPOS=32003557;//kernel.Map:3557
      ctx.save();
      //$LASTPOS=32003574;//kernel.Map:3574
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=32003686;//kernel.Map:3686
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"redrawMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Panel',
  shortName: 'Panel',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Panel_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Panel_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Panel_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000087;//kernel.Panel:87
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=33000156;//kernel.Panel:156
      if (_this.canvas) {
        //$LASTPOS=33000179;//kernel.Panel:179
        _this.width=_this.canvas.width;
        //$LASTPOS=33000208;//kernel.Panel:208
        _this.height=_this.canvas.height;
        //$LASTPOS=33000239;//kernel.Panel:239
        _this.parallel("watchResize");
        
      } else {
        //$LASTPOS=33000287;//kernel.Panel:287
        _this.setPanel(_this.width||Tonyu.globals.$screenWidth||465,_this.height||Tonyu.globals.$screenHeight||465);
        
      }
      //$LASTPOS=33000412;//kernel.Panel:412
      _this.x=_this.x||_this.width/2;
      //$LASTPOS=33000431;//kernel.Panel:431
      _this.y=_this.y||_this.height/2;
      //$LASTPOS=33000451;//kernel.Panel:451
      if (_this.align==null) {
        //$LASTPOS=33000467;//kernel.Panel:467
        _this.align="center";
      }
      //$LASTPOS=33000488;//kernel.Panel:488
      if (_this.alpha==null) {
        //$LASTPOS=33000504;//kernel.Panel:504
        _this.alpha=255;
      }
      //$LASTPOS=33000520;//kernel.Panel:520
      if (_this._drawn==null) {
        //$LASTPOS=33000537;//kernel.Panel:537
        _this._drawn=false;
      }
    },
    watchResize :function _trc_Panel_watchResize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000577;//kernel.Panel:577
      while (true) {
        //$LASTPOS=33000600;//kernel.Panel:600
        if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
          //$LASTPOS=33000665;//kernel.Panel:665
          _this.width=_this.canvas.width;
          //$LASTPOS=33000684;//kernel.Panel:684
          _this.height=_this.canvas.height;
          //$LASTPOS=33000719;//kernel.Panel:719
          _this.fireEvent("resize",{width: _this.width,height: _this.height});
          
        }
        //$LASTPOS=33000775;//kernel.Panel:775
        _this.update();
        
      }
    },
    fiber$watchResize :function _trc_Panel_f_watchResize(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_watchResize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000577;//kernel.Panel:577
          case 1:
            //$LASTPOS=33000600;//kernel.Panel:600
            if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
              //$LASTPOS=33000665;//kernel.Panel:665
              _this.width=_this.canvas.width;
              //$LASTPOS=33000684;//kernel.Panel:684
              _this.height=_this.canvas.height;
              //$LASTPOS=33000719;//kernel.Panel:719
              _this.fireEvent("resize",{width: _this.width,height: _this.height});
              
            }
            //$LASTPOS=33000775;//kernel.Panel:775
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000855;//kernel.Panel:855
      _this.width=width;
      //$LASTPOS=33000878;//kernel.Panel:878
      _this.height=height;
      //$LASTPOS=33000903;//kernel.Panel:903
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000946;//kernel.Panel:946
      _this.canvas=_this.buf[0];
      //$LASTPOS=33000966;//kernel.Panel:966
      _this.fireEvent("resize",{width: width,height: height,force: true});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000855;//kernel.Panel:855
      _this.width=width;
      //$LASTPOS=33000878;//kernel.Panel:878
      _this.height=height;
      //$LASTPOS=33000903;//kernel.Panel:903
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000946;//kernel.Panel:946
      _this.canvas=_this.buf[0];
      //$LASTPOS=33000966;//kernel.Panel:966
      _this.fireEvent("resize",{width: width,height: height,force: true});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001045;//kernel.Panel:1045
      if (_this.width==width&&_this.height==height) {
        return _this;
      }
      //$LASTPOS=33001104;//kernel.Panel:1104
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001045;//kernel.Panel:1045
      if (_this.width==width&&_this.height==height) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33001104;//kernel.Panel:1104
            _this.fiber$setPanel(_thread, width, height);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getContext :function _trc_Panel_getContext() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001152;//kernel.Panel:1152
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001152;//kernel.Panel:1152
      _this._drawn=true;
      _thread.retVal=_this.canvas.getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    __getter__context :function _trc_Panel___getter__context() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001222;//kernel.Panel:1222
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    __getter__image :function _trc_Panel___getter__image() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001290;//kernel.Panel:1290
      _this._drawn=true;
      return _this.canvas;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001354;//kernel.Panel:1354
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001354;//kernel.Panel:1354
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001422;//kernel.Panel:1422
      _this.ctx=_this.getContext();
      //$LASTPOS=33001445;//kernel.Panel:1445
      _this.ctx.save();
      //$LASTPOS=33001512;//kernel.Panel:1512
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=33001542;//kernel.Panel:1542
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=33001587;//kernel.Panel:1587
      _this.ctx.restore();
    },
    fiber$fillRect :function _trc_Panel_f_fillRect(_thread,x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_fillRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33001422;//kernel.Panel:1422
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=33001445;//kernel.Panel:1445
            _this.ctx.save();
            //$LASTPOS=33001512;//kernel.Panel:1512
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=33001542;//kernel.Panel:1542
            _this.ctx.fillRect(x,y,rectWidth,rectHeight);
            //$LASTPOS=33001587;//kernel.Panel:1587
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      "use strict";
      var _this=this;
      var splits;
      var colCount;
      
      //$LASTPOS=33001643;//kernel.Panel:1643
      _this.ctx=_this.getContext();
      //$LASTPOS=33001666;//kernel.Panel:1666
      _this.ctx.save();
      //$LASTPOS=33001683;//kernel.Panel:1683
      text=text+"";
      //$LASTPOS=33001702;//kernel.Panel:1702
      splits = text.split("\n");
      
      //$LASTPOS=33001788;//kernel.Panel:1788
      _this.ctx.textAlign=align;
      //$LASTPOS=33001816;//kernel.Panel:1816
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=33001846;//kernel.Panel:1846
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=33001885;//kernel.Panel:1885
      //$LASTPOS=33001889;//kernel.Panel:1889
      colCount = 0;
      for (; colCount<splits.length ; colCount++) {
        {
          //$LASTPOS=33001949;//kernel.Panel:1949
          _this.ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=33001994;//kernel.Panel:1994
          y+=size;
        }
      }
      //$LASTPOS=33002015;//kernel.Panel:2015
      _this.ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var splits;
      var colCount;
      
      
      _thread.enter(function _trc_Panel_ent_fillText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33001643;//kernel.Panel:1643
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=33001666;//kernel.Panel:1666
            _this.ctx.save();
            //$LASTPOS=33001683;//kernel.Panel:1683
            text=text+"";
            //$LASTPOS=33001702;//kernel.Panel:1702
            splits = text.split("\n");
            
            //$LASTPOS=33001788;//kernel.Panel:1788
            _this.ctx.textAlign=align;
            //$LASTPOS=33001816;//kernel.Panel:1816
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=33001846;//kernel.Panel:1846
            _this.ctx.font=size+"px 'Courier New'";
            //$LASTPOS=33001885;//kernel.Panel:1885
            //$LASTPOS=33001889;//kernel.Panel:1889
            colCount = 0;
            for (; colCount<splits.length ; colCount++) {
              {
                //$LASTPOS=33001949;//kernel.Panel:1949
                _this.ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=33001994;//kernel.Panel:1994
                y+=size;
              }
            }
            //$LASTPOS=33002015;//kernel.Panel:2015
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33002080;//kernel.Panel:2080
      _this.ctx=_this.getContext();
      //$LASTPOS=33002103;//kernel.Panel:2103
      _this.ctx.save();
      //$LASTPOS=33002120;//kernel.Panel:2120
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=33002169;//kernel.Panel:2169
      _this.ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_clearRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002080;//kernel.Panel:2080
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=33002103;//kernel.Panel:2103
            _this.ctx.save();
            //$LASTPOS=33002120;//kernel.Panel:2120
            _this.ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=33002169;//kernel.Panel:2169
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33002215;//kernel.Panel:2215
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=33002314;//kernel.Panel:2314
        _this.ctx=_this.getContext();
        //$LASTPOS=33002341;//kernel.Panel:2341
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=33002393;//kernel.Panel:2393
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=33002533;//kernel.Panel:2533
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_getPixel(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002215;//kernel.Panel:2215
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
            //$LASTPOS=33002314;//kernel.Panel:2314
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=33002341;//kernel.Panel:2341
            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=33002393;//kernel.Panel:2393
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=33002533;//kernel.Panel:2533
              _this.colordata=[0,0,0,0];
            }
          case 3:
            
            _thread.exit((_this.colordata));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    scroll :function _trc_Panel_scroll(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33002620;//kernel.Panel:2620
      _this.ctx=_this.getContext();
      //$LASTPOS=33002643;//kernel.Panel:2643
      _this.ctx.save();
      //$LASTPOS=33002660;//kernel.Panel:2660
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=33002721;//kernel.Panel:2721
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=33002755;//kernel.Panel:2755
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=33002807;//kernel.Panel:2807
      _this.ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002620;//kernel.Panel:2620
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=33002643;//kernel.Panel:2643
            _this.ctx.save();
            //$LASTPOS=33002660;//kernel.Panel:2660
            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=33002721;//kernel.Panel:2721
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=33002755;//kernel.Panel:2755
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=33002807;//kernel.Panel:2807
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      "use strict";
      var _this=this;
      var pImg;
      
      //$LASTPOS=33002843;//kernel.Panel:2843
      if (_this._drawn) {
        //$LASTPOS=33002864;//kernel.Panel:2864
        pImg = _this.canvas;
        
        //$LASTPOS=33002890;//kernel.Panel:2890
        ctx.save();
        //$LASTPOS=33002911;//kernel.Panel:2911
        if (_this.align=="left") {
          //$LASTPOS=33002943;//kernel.Panel:2943
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=33002995;//kernel.Panel:2995
          if (_this.align=="center") {
            //$LASTPOS=33003029;//kernel.Panel:3029
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=33003064;//kernel.Panel:3064
            if (_this.align=="right") {
              //$LASTPOS=33003097;//kernel.Panel:3097
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=33003154;//kernel.Panel:3154
        if (_this.rotation!=0) {
          //$LASTPOS=33003189;//kernel.Panel:3189
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=33003257;//kernel.Panel:3257
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=33003314;//kernel.Panel:3314
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=33003366;//kernel.Panel:3366
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=33003431;//kernel.Panel:3431
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=33003487;//kernel.Panel:3487
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=33003528;//kernel.Panel:3528
        ctx.drawImage(pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=33003632;//kernel.Panel:3632
        ctx.restore();
        
      }
    },
    copy :function _trc_Panel_copy() {
      "use strict";
      var _this=this;
      var sx;
      var sy;
      var sw;
      var sh;
      var dx;
      var dy;
      var dw;
      var dh;
      var a;
      var srcPanel;
      
      
      //$LASTPOS=33003877;//kernel.Panel:3877
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=33003914;//kernel.Panel:3914
      srcPanel = a.shift(Tonyu.classes.kernel.Panel)||_this;
      
      //$LASTPOS=33003956;//kernel.Panel:3956
      if (a.length<=4) {
        //$LASTPOS=33003984;//kernel.Panel:3984
        dx=a.shift();
        //$LASTPOS=33004007;//kernel.Panel:4007
        dy=a.shift();
        //$LASTPOS=33004030;//kernel.Panel:4030
        if (a.length==0) {
          //$LASTPOS=33004062;//kernel.Panel:4062
          _this.context.drawImage(srcPanel.image,dx,dy);
          
        } else {
          //$LASTPOS=33004135;//kernel.Panel:4135
          dw=a.shift();
          //$LASTPOS=33004162;//kernel.Panel:4162
          dh=a.shift();
          //$LASTPOS=33004189;//kernel.Panel:4189
          if (dw*dh!=0) {
            //$LASTPOS=33004222;//kernel.Panel:4222
            _this.context.drawImage(srcPanel.image,dx,dy,dw,dh);
            
          }
          
        }
        
      } else {
        //$LASTPOS=33004318;//kernel.Panel:4318
        sx=a.shift();
        //$LASTPOS=33004341;//kernel.Panel:4341
        sy=a.shift();
        //$LASTPOS=33004364;//kernel.Panel:4364
        sw=a.shift();
        //$LASTPOS=33004387;//kernel.Panel:4387
        sh=a.shift();
        //$LASTPOS=33004410;//kernel.Panel:4410
        dx=a.shift();
        //$LASTPOS=33004433;//kernel.Panel:4433
        dy=a.shift();
        //$LASTPOS=33004456;//kernel.Panel:4456
        dw=a.shift()||sw;
        //$LASTPOS=33004485;//kernel.Panel:4485
        dh=a.shift()||sh;
        //$LASTPOS=33004564;//kernel.Panel:4564
        if (sw*sh*dw*dh!=0) {
          //$LASTPOS=33004599;//kernel.Panel:4599
          _this.context.drawImage(srcPanel.image,sx,sy,sw,sh,dx,dy,dw,dh);
          
        }
        
      }
    },
    convert :function _trc_Panel_convert(obj,toLayer) {
      "use strict";
      var _this=this;
      var scaleY;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=33004717;//kernel.Panel:4717
      if (toLayer==null) {
        //$LASTPOS=33004736;//kernel.Panel:4736
        toLayer=_this;
      }
      //$LASTPOS=33004755;//kernel.Panel:4755
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=33004792;//kernel.Panel:4792
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=33004847;//kernel.Panel:4847
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=33004902;//kernel.Panel:4902
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=33004933;//kernel.Panel:4933
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=33004965;//kernel.Panel:4965
        rt = _this.rotation;
        
        //$LASTPOS=33005166;//kernel.Panel:5166
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=33005223;//kernel.Panel:5223
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};
        
      } else {
        //$LASTPOS=33005410;//kernel.Panel:5410
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=33005463;//kernel.Panel:5463
          rt = - _this.rotation;
          
          //$LASTPOS=33005490;//kernel.Panel:5490
          dx = obj.x-(_this.x);
          
          //$LASTPOS=33005522;//kernel.Panel:5522
          dy = obj.y-(_this.y);
          
          //$LASTPOS=33005781;//kernel.Panel:5781
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=33005841;//kernel.Panel:5841
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          return {x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};
          
        } else {
          //$LASTPOS=33006032;//kernel.Panel:6032
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
    },
    fiber$convert :function _trc_Panel_f_convert(_thread,obj,toLayer) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var scaleY;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=33004717;//kernel.Panel:4717
      if (toLayer==null) {
        //$LASTPOS=33004736;//kernel.Panel:4736
        toLayer=_this;
      }
      //$LASTPOS=33004755;//kernel.Panel:4755
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=33004792;//kernel.Panel:4792
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=33004847;//kernel.Panel:4847
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=33004902;//kernel.Panel:4902
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=33004933;//kernel.Panel:4933
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=33004965;//kernel.Panel:4965
        rt = _this.rotation;
        
        //$LASTPOS=33005166;//kernel.Panel:5166
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=33005223;//kernel.Panel:5223
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        _thread.retVal={x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};return;
        
        
      } else {
        //$LASTPOS=33005410;//kernel.Panel:5410
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=33005463;//kernel.Panel:5463
          rt = - _this.rotation;
          
          //$LASTPOS=33005490;//kernel.Panel:5490
          dx = obj.x-(_this.x);
          
          //$LASTPOS=33005522;//kernel.Panel:5522
          dy = obj.y-(_this.y);
          
          //$LASTPOS=33005781;//kernel.Panel:5781
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=33005841;//kernel.Panel:5841
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          _thread.retVal={x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};return;
          
          
        } else {
          //$LASTPOS=33006032;//kernel.Panel:6032
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"watchResize":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"__getter__context":{"nowait":true},"__getter__image":{"nowait":true},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true},"copy":{"nowait":true},"convert":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ScaledCanvas',
  shortName: 'ScaledCanvas',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_ScaledCanvas_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ScaledCanvas_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScaledCanvas_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=34000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=34000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=34000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=34000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=34000257;//kernel.ScaledCanvas:257
      _this._color="rgb(20,80,180)";
      //$LASTPOS=34000292;//kernel.ScaledCanvas:292
      _this.sx=0;
      //$LASTPOS=34000303;//kernel.ScaledCanvas:303
      _this.sy=0;
      //$LASTPOS=34000314;//kernel.ScaledCanvas:314
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=34000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=34000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=34000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=34000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=34000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=34000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=34000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=34000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=34000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=34000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=34000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=34000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=34000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=34000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=34000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=34000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=34000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=34000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=34000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=34000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=34000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=34000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=34000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=34000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=34000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=34000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=34000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=34000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=34000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=34001020;//kernel.ScaledCanvas:1020
      smaller = 5;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=34000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=34001020;//kernel.ScaledCanvas:1020
      smaller = 5;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_ScaledCanvas_draw() {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=34001155;//kernel.ScaledCanvas:1155
      _this.cw=_this.canvas.width();
      //$LASTPOS=34001179;//kernel.ScaledCanvas:1179
      _this.ch=_this.canvas.height();
      //$LASTPOS=34001204;//kernel.ScaledCanvas:1204
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=34001248;//kernel.ScaledCanvas:1248
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=34001292;//kernel.ScaledCanvas:1292
      if (calch>_this.ch) {
        //$LASTPOS=34001306;//kernel.ScaledCanvas:1306
        calch=_this.ch;
      }
      //$LASTPOS=34001321;//kernel.ScaledCanvas:1321
      if (calcw>_this.cw) {
        //$LASTPOS=34001335;//kernel.ScaledCanvas:1335
        calcw=_this.cw;
      }
      //$LASTPOS=34001350;//kernel.ScaledCanvas:1350
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=34001382;//kernel.ScaledCanvas:1382
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=34001438;//kernel.ScaledCanvas:1438
        calcw=_this.width;
        //$LASTPOS=34001450;//kernel.ScaledCanvas:1450
        calch=_this.height;
        
      }
      //$LASTPOS=34001476;//kernel.ScaledCanvas:1476
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=34001519;//kernel.ScaledCanvas:1519
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=34001562;//kernel.ScaledCanvas:1562
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=34001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=34001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=34001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=34001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=34001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=34001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=34001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=34001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=34001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=34001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=34001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=34002056;//kernel.ScaledCanvas:2056
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
    },
    fiber$canvas2buf :function _trc_ScaledCanvas_f_canvas2buf(_thread,point) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=34001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=34001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=34001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=34001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=34001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=34001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=34001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=34001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=34001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=34001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=34001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=34002056;//kernel.ScaledCanvas:2056
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34002229;//kernel.ScaledCanvas:2229
      _this._color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34002229;//kernel.ScaledCanvas:2229
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=34002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=34002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=34002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=34002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=34002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=34002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=34002430;//kernel.ScaledCanvas:2430
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=34002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=34002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=34002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=34002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=34002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=34002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=34002430;//kernel.ScaledCanvas:2430
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Screen',
  shortName: 'Screen',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Panel,
  includes: [],
  methods: {
    main :function _trc_Screen_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Screen_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Screen_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=35000049;//kernel.Screen:49
      _this._color="black";
    },
    fiber$onAppear :function _trc_Screen_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=35000049;//kernel.Screen:49
      _this._color="black";
      
      _thread.retVal=_this;return;
    },
    drawLayers :function _trc_Screen_drawLayers() {
      "use strict";
      var _this=this;
      var c;
      var i;
      var l;
      var group;
      var wpx;
      var wpy;
      var spx;
      var spy;
      var rt;
      var sc;
      var wpOnSX;
      var wpOnSY;
      
      //$LASTPOS=35000088;//kernel.Screen:88
      if (! _this._drawing) {
        //$LASTPOS=35000113;//kernel.Screen:113
        if (! _this.canvas) {
          throw new Error("canvas is null");
          
          
        }
        //$LASTPOS=35000193;//kernel.Screen:193
        _this._drawing=true;
        //$LASTPOS=35000216;//kernel.Screen:216
        _this.fillStyle=_this._color;
        //$LASTPOS=35000242;//kernel.Screen:242
        _this.fillRect(0,0,_this.width,_this.height);
        //$LASTPOS=35000278;//kernel.Screen:278
        c = _this.getContext();
        
        //$LASTPOS=35000306;//kernel.Screen:306
        //$LASTPOS=35000311;//kernel.Screen:311
        i = _this.layers.length-1;
        for (; i>=0 ; i--) {
          {
            //$LASTPOS=35000357;//kernel.Screen:357
            l = _this.layers[i];
            
            //$LASTPOS=35000386;//kernel.Screen:386
            group = l.group;
            
            //$LASTPOS=35000417;//kernel.Screen:417
            c.save();
            //$LASTPOS=35000439;//kernel.Screen:439
            wpx = l.wpx;
            wpy = l.wpy;
            
            //$LASTPOS=35000476;//kernel.Screen:476
            spx = l.spx;
            spy = l.spy;
            
            //$LASTPOS=35000513;//kernel.Screen:513
            rt = l.rotation;
            sc = l.scale;
            
            //$LASTPOS=35000639;//kernel.Screen:639
            wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
            
            //$LASTPOS=35000695;//kernel.Screen:695
            wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
            
            //$LASTPOS=35000793;//kernel.Screen:793
            c.translate(- wpOnSX+spx,- wpOnSY+spy);
            //$LASTPOS=35000843;//kernel.Screen:843
            c.rotate(_this.rad(rt));
            //$LASTPOS=35000874;//kernel.Screen:874
            c.scale(sc,sc);
            //$LASTPOS=35000902;//kernel.Screen:902
            group.draw(c);
            //$LASTPOS=35000929;//kernel.Screen:929
            c.restore();
          }
        }
        //$LASTPOS=35000960;//kernel.Screen:960
        _this._drawing=false;
        
      }
    },
    fiber$drawLayers :function _trc_Screen_f_drawLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var c;
      var i;
      var l;
      var group;
      var wpx;
      var wpy;
      var spx;
      var spy;
      var rt;
      var sc;
      var wpOnSX;
      var wpOnSY;
      
      
      _thread.enter(function _trc_Screen_ent_drawLayers(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35000088;//kernel.Screen:88
            if (!(! _this._drawing)) { __pc=3; break; }
            //$LASTPOS=35000113;//kernel.Screen:113
            if (! _this.canvas) {
              throw new Error("canvas is null");
              
              
            }
            //$LASTPOS=35000193;//kernel.Screen:193
            _this._drawing=true;
            //$LASTPOS=35000216;//kernel.Screen:216
            _this.fillStyle=_this._color;
            //$LASTPOS=35000242;//kernel.Screen:242
            _this.fiber$fillRect(_thread, 0, 0, _this.width, _this.height);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=35000278;//kernel.Screen:278
            _this.fiber$getContext(_thread);
            __pc=2;return;
          case 2:
            c=_thread.retVal;
            
            //$LASTPOS=35000306;//kernel.Screen:306
            //$LASTPOS=35000311;//kernel.Screen:311
            i = _this.layers.length-1;
            for (; i>=0 ; i--) {
              {
                //$LASTPOS=35000357;//kernel.Screen:357
                l = _this.layers[i];
                
                //$LASTPOS=35000386;//kernel.Screen:386
                group = l.group;
                
                //$LASTPOS=35000417;//kernel.Screen:417
                c.save();
                //$LASTPOS=35000439;//kernel.Screen:439
                wpx = l.wpx;
                wpy = l.wpy;
                
                //$LASTPOS=35000476;//kernel.Screen:476
                spx = l.spx;
                spy = l.spy;
                
                //$LASTPOS=35000513;//kernel.Screen:513
                rt = l.rotation;
                sc = l.scale;
                
                //$LASTPOS=35000639;//kernel.Screen:639
                wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
                
                //$LASTPOS=35000695;//kernel.Screen:695
                wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
                
                //$LASTPOS=35000793;//kernel.Screen:793
                c.translate(- wpOnSX+spx,- wpOnSY+spy);
                //$LASTPOS=35000843;//kernel.Screen:843
                c.rotate(_this.rad(rt));
                //$LASTPOS=35000874;//kernel.Screen:874
                c.scale(sc,sc);
                //$LASTPOS=35000902;//kernel.Screen:902
                group.draw(c);
                //$LASTPOS=35000929;//kernel.Screen:929
                c.restore();
              }
            }
            //$LASTPOS=35000960;//kernel.Screen:960
            _this._drawing=false;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Screen_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001001;//kernel.Screen:1001
      _this.drawLayers();
      //$LASTPOS=35001019;//kernel.Screen:1019
      Tonyu.classes.kernel.Panel.prototype.draw.apply( _this, [ctx]);
    },
    addLayer :function _trc_Screen_addLayer(group) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=35001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      return _this.layers.length-1;
    },
    fiber$addLayer :function _trc_Screen_f_addLayer(_thread,group) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=35001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      _thread.retVal=_this.layers.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    selectLayer :function _trc_Screen_selectLayer(i) {
      "use strict";
      var _this=this;
      var r;
      
      //$LASTPOS=35001252;//kernel.Screen:1252
      r = _this.findLayer(i);
      
      //$LASTPOS=35001276;//kernel.Screen:1276
      if (r!=null) {
        //$LASTPOS=35001289;//kernel.Screen:1289
        _this.index=r;
      }
    },
    fiber$selectLayer :function _trc_Screen_f_selectLayer(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      _thread.enter(function _trc_Screen_ent_selectLayer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35001252;//kernel.Screen:1252
            _this.fiber$findLayer(_thread, i);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=35001276;//kernel.Screen:1276
            if (r!=null) {
              //$LASTPOS=35001289;//kernel.Screen:1289
              _this.index=r;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    findLayer :function _trc_Screen_findLayer(i) {
      "use strict";
      var _this=this;
      var j;
      
      //$LASTPOS=35001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=35001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          return i;
        }
        
      } else {
        //$LASTPOS=35001400;//kernel.Screen:1400
        //$LASTPOS=35001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=35001449;//kernel.Screen:1449
            if (_this.layers[j]==i||_this.layers[j].group==i) {
              return j;
              
            }
          }
        }
        
      }
    },
    fiber$findLayer :function _trc_Screen_f_findLayer(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var j;
      
      //$LASTPOS=35001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=35001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          _thread.retVal=i;return;
          
        }
        
      } else {
        //$LASTPOS=35001400;//kernel.Screen:1400
        //$LASTPOS=35001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=35001449;//kernel.Screen:1449
            if (_this.layers[j]==i||_this.layers[j].group==i) {
              _thread.retVal=j;return;
              
              
            }
          }
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    setPivot :function _trc_Screen_setPivot(x,y) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=35001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
    },
    fiber$setPivot :function _trc_Screen_f_setPivot(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=35001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Screen_scrollTo(x,y,scl,rot) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=35001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=35001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=35001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=35001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=35001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
    },
    fiber$scrollTo :function _trc_Screen_f_scrollTo(_thread,x,y,scl,rot) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=35001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=35001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=35001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=35001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=35001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
      
      _thread.retVal=_this;return;
    },
    canvas2buf :function _trc_Screen_canvas2buf(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001853;//kernel.Screen:1853
      p.layer=_this.layer;
      return _this.convert(p,_this);
    },
    fiber$canvas2buf :function _trc_Screen_f_canvas2buf(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001853;//kernel.Screen:1853
      p.layer=_this.layer;
      _thread.retVal=_this.convert(p,_this);return;
      
      
      _thread.retVal=_this;return;
    },
    convert :function _trc_Screen_convert(obj,toLayer) {
      "use strict";
      var _this=this;
      var p;
      var l;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=35002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=35002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=35002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=35002156;//kernel.Screen:2156
      if (obj.layer!==_this&&toLayer!==_this) {
        //$LASTPOS=35002206;//kernel.Screen:2206
        p = _this.convert(obj,_this);
        
        return _this.convert(p,toLayer);
        
      } else {
        //$LASTPOS=35002277;//kernel.Screen:2277
        if (obj.layer!==_this&&toLayer===_this) {
          //$LASTPOS=35002327;//kernel.Screen:2327
          l = _this.findLayer(obj.layer);
          
          //$LASTPOS=35002363;//kernel.Screen:2363
          if (l!=null) {
            //$LASTPOS=35002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=35002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=35002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=35002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=35002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=35002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this};
            
          } else {
            return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]);
            
          }
          
        } else {
          //$LASTPOS=35003058;//kernel.Screen:3058
          if (obj.layer===_this&&toLayer!==_this) {
            //$LASTPOS=35003108;//kernel.Screen:3108
            l = _this.findLayer(toLayer);
            
            //$LASTPOS=35003142;//kernel.Screen:3142
            if (l!=null) {
              //$LASTPOS=35003200;//kernel.Screen:3200
              l=_this.layers[l];
              //$LASTPOS=35003238;//kernel.Screen:3238
              rt = - l.rotation;
              
              //$LASTPOS=35003270;//kernel.Screen:3270
              dx = obj.x-l.spx;
              
              //$LASTPOS=35003302;//kernel.Screen:3302
              dy = obj.y-l.spy;
              
              //$LASTPOS=35003518;//kernel.Screen:3518
              x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
              
              //$LASTPOS=35003580;//kernel.Screen:3580
              y = l.wpy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/l.scale;
              
              return {x: x,y: y,rotation: rt,scale: 1/l.scale,layer: toLayer};
              
            } else {
              return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,toLayer]);
              
            }
            
          } else {
            return obj;
          }
        }
      }
    },
    fiber$convert :function _trc_Screen_f_convert(_thread,obj,toLayer) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      var l;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=35002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=35002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=35002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      
      _thread.enter(function _trc_Screen_ent_convert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35002156;//kernel.Screen:2156
            if (!(obj.layer!==_this&&toLayer!==_this)) { __pc=2; break; }
            //$LASTPOS=35002206;//kernel.Screen:2206
            _this.fiber$convert(_thread, obj, _this);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            _thread.exit(_this.convert(p,toLayer));return;
            __pc=13;break;
          case 2:
            //$LASTPOS=35002277;//kernel.Screen:2277
            if (!(obj.layer!==_this&&toLayer===_this)) { __pc=6; break; }
            //$LASTPOS=35002327;//kernel.Screen:2327
            _this.fiber$findLayer(_thread, obj.layer);
            __pc=3;return;
          case 3:
            l=_thread.retVal;
            
            //$LASTPOS=35002363;//kernel.Screen:2363
            if (!(l!=null)) { __pc=4; break; }
            //$LASTPOS=35002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=35002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=35002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=35002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=35002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=35002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            _thread.exit({x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this});return;
            __pc=5;break;
          case 4:
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]));return;
          case 5:
            
            __pc=12;break;
          case 6:
            //$LASTPOS=35003058;//kernel.Screen:3058
            if (!(obj.layer===_this&&toLayer!==_this)) { __pc=10; break; }
            //$LASTPOS=35003108;//kernel.Screen:3108
            _this.fiber$findLayer(_thread, toLayer);
            __pc=7;return;
          case 7:
            l=_thread.retVal;
            
            //$LASTPOS=35003142;//kernel.Screen:3142
            if (!(l!=null)) { __pc=8; break; }
            //$LASTPOS=35003200;//kernel.Screen:3200
            l=_this.layers[l];
            //$LASTPOS=35003238;//kernel.Screen:3238
            rt = - l.rotation;
            
            //$LASTPOS=35003270;//kernel.Screen:3270
            dx = obj.x-l.spx;
            
            //$LASTPOS=35003302;//kernel.Screen:3302
            dy = obj.y-l.spy;
            
            //$LASTPOS=35003518;//kernel.Screen:3518
            x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
            
            //$LASTPOS=35003580;//kernel.Screen:3580
            y = l.wpy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/l.scale;
            
            _thread.exit({x: x,y: y,rotation: rt,scale: 1/l.scale,layer: toLayer});return;
            __pc=9;break;
          case 8:
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,toLayer]));return;
          case 9:
            
            __pc=11;break;
          case 10:
            _thread.exit(obj);return;
          case 11:
            
          case 12:
            
          case 13:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setBGColor :function _trc_Screen_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35003885;//kernel.Screen:3885
      _this._color=color;
    },
    fiber$setBGColor :function _trc_Screen_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35003885;//kernel.Screen:3885
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Screen_all() {
      "use strict";
      var _this=this;
      var res;
      var l;
      var _it_269;
      var q;
      
      //$LASTPOS=35003919;//kernel.Screen:3919
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=35003943;//kernel.Screen:3943
      _it_269=Tonyu.iterator(_this.layers,1);
      while(_it_269.next()) {
        l=_it_269[0];
        
        //$LASTPOS=35003975;//kernel.Screen:3975
        q = l.group.all.apply(l.group,arguments);
        
        //$LASTPOS=35004027;//kernel.Screen:4027
        res.push(q);
        
      }
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"drawLayers":{"nowait":false},"draw":{"nowait":true},"addLayer":{"nowait":false},"selectLayer":{"nowait":false},"findLayer":{"nowait":false},"setPivot":{"nowait":false},"scrollTo":{"nowait":false},"canvas2buf":{"nowait":false},"convert":{"nowait":false},"setBGColor":{"nowait":false},"all":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Sprites',
  shortName: 'Sprites',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Sprites_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Sprites_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Sprites_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=36000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=36000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=36000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=36000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=36000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=36000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=36000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=36000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=36000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=36000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        return _this;
        
      }
      //$LASTPOS=36000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=36000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=36000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=36000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=36000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=36000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=36000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=36000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=36000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=36000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=36000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=36000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=36000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=36000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=36000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=36000579;//kernel.Sprites:579
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=36000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=36000631;//kernel.Sprites:631
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=36000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=36000579;//kernel.Sprites:579
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=36000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=36000631;//kernel.Sprites:631
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes(drawn) {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      
      //$LASTPOS=36000765;//kernel.Sprites:765
      //$LASTPOS=36000770;//kernel.Sprites:770
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=36000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=36000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=36001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=36001086;//kernel.Sprites:1086
            _this.sprites.splice(i,1);
            
          }
        }
      }
    },
    fiber$removeOneframes :function _trc_Sprites_f_removeOneframes(_thread,drawn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var i;
      
      
      //$LASTPOS=36000765;//kernel.Sprites:765
      //$LASTPOS=36000770;//kernel.Sprites:770
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=36000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=36000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=36001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=36001086;//kernel.Sprites:1086
            _this.sprites.splice(i,1);
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=36001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=36001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=36001280;//kernel.Sprites:1280
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=36001326;//kernel.Sprites:1326
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=36001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=36001396;//kernel.Sprites:1396
            if (obj1.__genId>obj2.__genId) {
              return 1;
              
            } else {
              return - 1;
              
            }
            return 0;
            
          }
        }
      }
    },
    fiber$compOrder :function _trc_Sprites_f_compOrder(_thread,obj1,obj2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var val1;
      var val2;
      
      //$LASTPOS=36001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=36001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=36001280;//kernel.Sprites:1280
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=36001326;//kernel.Sprites:1326
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=36001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=36001396;//kernel.Sprites:1396
            if (obj1.__genId>obj2.__genId) {
              _thread.retVal=1;return;
              
              
            } else {
              _thread.retVal=- 1;return;
              
              
            }
            _thread.retVal=0;return;
            
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Sprites_draw(ctx) {
      "use strict";
      var _this=this;
      var orderArray;
      
      //$LASTPOS=36001593;//kernel.Sprites:1593
      ctx.save();
      //$LASTPOS=36001610;//kernel.Sprites:1610
      orderArray = [];
      
      //$LASTPOS=36001634;//kernel.Sprites:1634
      if (_this.t1Sprites) {
        //$LASTPOS=36001660;//kernel.Sprites:1660
        _this.sprites.forEach((function anonymous_1676(s) {
          
          //$LASTPOS=36001696;//kernel.Sprites:1696
          if (s instanceof Tonyu.classes.kernel.PlainChar) {
            //$LASTPOS=36001743;//kernel.Sprites:1743
            s.draw();
            
          } else {
            //$LASTPOS=36001773;//kernel.Sprites:1773
            orderArray.push(s);
          }
        }));
        
      } else {
        //$LASTPOS=36001828;//kernel.Sprites:1828
        orderArray=orderArray.concat(_this.sprites);
        
      }
      //$LASTPOS=36001879;//kernel.Sprites:1879
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=36001912;//kernel.Sprites:1912
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=36001941;//kernel.Sprites:1941
      _this.drawing=ctx;
      //$LASTPOS=36001959;//kernel.Sprites:1959
      orderArray.forEach((function anonymous_1978(s) {
        
        //$LASTPOS=36001993;//kernel.Sprites:1993
        s.draw(ctx);
      }));
      //$LASTPOS=36002020;//kernel.Sprites:2020
      _this.drawing=null;
      //$LASTPOS=36002039;//kernel.Sprites:2039
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36002085;//kernel.Sprites:2085
      _this.hitWatchers.forEach((function anonymous_2105(w) {
        
        //$LASTPOS=36002129;//kernel.Sprites:2129
        _this.sprites.forEach((function anonymous_2145(a) {
          var a_owner;
          
          //$LASTPOS=36002217;//kernel.Sprites:2217
          a_owner = a;
          
          //$LASTPOS=36002259;//kernel.Sprites:2259
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=36002312;//kernel.Sprites:2312
          _this.sprites.forEach((function anonymous_2328(b) {
            var b_owner;
            
            //$LASTPOS=36002360;//kernel.Sprites:2360
            b_owner = b;
            
            //$LASTPOS=36002406;//kernel.Sprites:2406
            if (a===b) {
              return _this;
            }
            //$LASTPOS=36002442;//kernel.Sprites:2442
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=36002547;//kernel.Sprites:2547
            if (a.crashTo1(b)) {
              //$LASTPOS=36002650;//kernel.Sprites:2650
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
    },
    fiber$checkHit :function _trc_Sprites_f_checkHit(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36002085;//kernel.Sprites:2085
      _this.hitWatchers.forEach((function anonymous_2105(w) {
        
        //$LASTPOS=36002129;//kernel.Sprites:2129
        _this.sprites.forEach((function anonymous_2145(a) {
          var a_owner;
          
          //$LASTPOS=36002217;//kernel.Sprites:2217
          a_owner = a;
          
          //$LASTPOS=36002259;//kernel.Sprites:2259
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=36002312;//kernel.Sprites:2312
          _this.sprites.forEach((function anonymous_2328(b) {
            var b_owner;
            
            //$LASTPOS=36002360;//kernel.Sprites:2360
            b_owner = b;
            
            //$LASTPOS=36002406;//kernel.Sprites:2406
            if (a===b) {
              return _this;
            }
            //$LASTPOS=36002442;//kernel.Sprites:2442
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=36002547;//kernel.Sprites:2547
            if (a.crashTo1(b)) {
              //$LASTPOS=36002650;//kernel.Sprites:2650
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
      
      _thread.retVal=_this;return;
    },
    watchHit :function _trc_Sprites_watchHit(typeA,typeB,onHit) {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=36002780;//kernel.Sprites:2780
      p = {A: typeA,B: typeB,h: onHit};
      
      //$LASTPOS=36002844;//kernel.Sprites:2844
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=36002897;//kernel.Sprites:2897
      ctx = c.getContext("2d");
      
      //$LASTPOS=36002930;//kernel.Sprites:2930
      ctx.textBaseline="top";
      //$LASTPOS=36002959;//kernel.Sprites:2959
      ctx.save();
      //$LASTPOS=36002976;//kernel.Sprites:2976
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=36003016;//kernel.Sprites:3016
      //$LASTPOS=36003021;//kernel.Sprites:3021
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=36003061;//kernel.Sprites:3061
          ctx.beginPath();
          //$LASTPOS=36003087;//kernel.Sprites:3087
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36003133;//kernel.Sprites:3133
          ctx.moveTo(i,0);
          //$LASTPOS=36003159;//kernel.Sprites:3159
          ctx.lineTo(i,c.height);
          //$LASTPOS=36003192;//kernel.Sprites:3192
          ctx.closePath();
          //$LASTPOS=36003218;//kernel.Sprites:3218
          ctx.stroke();
        }
      }
      //$LASTPOS=36003246;//kernel.Sprites:3246
      //$LASTPOS=36003251;//kernel.Sprites:3251
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=36003292;//kernel.Sprites:3292
          ctx.beginPath();
          //$LASTPOS=36003318;//kernel.Sprites:3318
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36003364;//kernel.Sprites:3364
          ctx.moveTo(0,i);
          //$LASTPOS=36003390;//kernel.Sprites:3390
          ctx.lineTo(c.width,i);
          //$LASTPOS=36003422;//kernel.Sprites:3422
          ctx.closePath();
          //$LASTPOS=36003448;//kernel.Sprites:3448
          ctx.stroke();
        }
      }
      //$LASTPOS=36003474;//kernel.Sprites:3474
      ctx.fillStyle="white";
      //$LASTPOS=36003502;//kernel.Sprites:3502
      ctx.font="15px monospaced";
      //$LASTPOS=36003535;//kernel.Sprites:3535
      //$LASTPOS=36003540;//kernel.Sprites:3540
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=36003583;//kernel.Sprites:3583
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=36003617;//kernel.Sprites:3617
      //$LASTPOS=36003622;//kernel.Sprites:3622
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=36003666;//kernel.Sprites:3666
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=36003700;//kernel.Sprites:3700
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=36002897;//kernel.Sprites:2897
      ctx = c.getContext("2d");
      
      //$LASTPOS=36002930;//kernel.Sprites:2930
      ctx.textBaseline="top";
      //$LASTPOS=36002959;//kernel.Sprites:2959
      ctx.save();
      //$LASTPOS=36002976;//kernel.Sprites:2976
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=36003016;//kernel.Sprites:3016
      //$LASTPOS=36003021;//kernel.Sprites:3021
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=36003061;//kernel.Sprites:3061
          ctx.beginPath();
          //$LASTPOS=36003087;//kernel.Sprites:3087
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36003133;//kernel.Sprites:3133
          ctx.moveTo(i,0);
          //$LASTPOS=36003159;//kernel.Sprites:3159
          ctx.lineTo(i,c.height);
          //$LASTPOS=36003192;//kernel.Sprites:3192
          ctx.closePath();
          //$LASTPOS=36003218;//kernel.Sprites:3218
          ctx.stroke();
        }
      }
      //$LASTPOS=36003246;//kernel.Sprites:3246
      //$LASTPOS=36003251;//kernel.Sprites:3251
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=36003292;//kernel.Sprites:3292
          ctx.beginPath();
          //$LASTPOS=36003318;//kernel.Sprites:3318
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36003364;//kernel.Sprites:3364
          ctx.moveTo(0,i);
          //$LASTPOS=36003390;//kernel.Sprites:3390
          ctx.lineTo(c.width,i);
          //$LASTPOS=36003422;//kernel.Sprites:3422
          ctx.closePath();
          //$LASTPOS=36003448;//kernel.Sprites:3448
          ctx.stroke();
        }
      }
      //$LASTPOS=36003474;//kernel.Sprites:3474
      ctx.fillStyle="white";
      //$LASTPOS=36003502;//kernel.Sprites:3502
      ctx.font="15px monospaced";
      //$LASTPOS=36003535;//kernel.Sprites:3535
      //$LASTPOS=36003540;//kernel.Sprites:3540
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=36003583;//kernel.Sprites:3583
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=36003617;//kernel.Sprites:3617
      //$LASTPOS=36003622;//kernel.Sprites:3622
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=36003666;//kernel.Sprites:3666
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=36003700;//kernel.Sprites:3700
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36003868;//kernel.Sprites:3868
      _this.sx=scrollX;
      //$LASTPOS=36003885;//kernel.Sprites:3885
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36003868;//kernel.Sprites:3868
      _this.sx=scrollX;
      //$LASTPOS=36003885;//kernel.Sprites:3885
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Sprites_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=36003925;//kernel.Sprites:3925
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=36003950;//kernel.Sprites:3950
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=36004033;//kernel.Sprites:4033
      _this.sprites.forEach((function anonymous_4049(s) {
        
        //$LASTPOS=36004065;//kernel.Sprites:4065
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=36004096;//kernel.Sprites:4096
        if (! c||s instanceof c) {
          //$LASTPOS=36004137;//kernel.Sprites:4137
          res.push(s);
          
        }
      }));
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"scrollTo":{"nowait":false},"all":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.BodyActor',
  shortName: 'BodyActor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2Mod],
  methods: {
    main :function _trc_BodyActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_BodyActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_BodyActor_initialize(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000065;//kernel.BodyActor:65
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=37000080;//kernel.BodyActor:80
      _this._th.on("end",Tonyu.bindFunc(_this,_this.initBody));
    },
    getWorld :function _trc_BodyActor_getWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=37000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=37000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_BodyActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000229;//kernel.BodyActor:229
      _this.initBody();
      //$LASTPOS=37000246;//kernel.BodyActor:246
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_BodyActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BodyActor_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000229;//kernel.BodyActor:229
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37000246;//kernel.BodyActor:246
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initBody :function _trc_BodyActor_initBody() {
      "use strict";
      var _this=this;
      var wworld;
      var b2Vec2;
      var b2BodyDef;
      var b2Body;
      var b2FixtureDef;
      var b2Fixture;
      var b2PolygonShape;
      var b2CircleShape;
      var fixDef;
      var bodyDef;
      var w;
      var h;
      var fps;
      var r;
      var ve;
      var vr;
      
      //$LASTPOS=37000285;//kernel.BodyActor:285
      if (_this.body) {
        return _this;
      }
      //$LASTPOS=37000308;//kernel.BodyActor:308
      wworld = _this.getWorld();
      
      //$LASTPOS=37000336;//kernel.BodyActor:336
      _this.world=wworld.world;
      //$LASTPOS=37000361;//kernel.BodyActor:361
      _this.scale=wworld.scale;
      //$LASTPOS=37000386;//kernel.BodyActor:386
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=37000430;//kernel.BodyActor:430
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=37000477;//kernel.BodyActor:477
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=37000518;//kernel.BodyActor:518
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      
      //$LASTPOS=37000571;//kernel.BodyActor:571
      b2Fixture = Box2D.Dynamics.b2Fixture;
      
      //$LASTPOS=37000618;//kernel.BodyActor:618
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      
      //$LASTPOS=37000683;//kernel.BodyActor:683
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      
      //$LASTPOS=37000752;//kernel.BodyActor:752
      fixDef = new b2FixtureDef;
      
      //$LASTPOS=37000788;//kernel.BodyActor:788
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=37000830;//kernel.BodyActor:830
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=37000874;//kernel.BodyActor:874
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=37000930;//kernel.BodyActor:930
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=37000964;//kernel.BodyActor:964
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=37001052;//kernel.BodyActor:1052
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=37001088;//kernel.BodyActor:1088
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=37001124;//kernel.BodyActor:1124
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=37001173;//kernel.BodyActor:1173
      w = _this.width;
      h = _this.height;
      
      //$LASTPOS=37001200;//kernel.BodyActor:1200
      if (! w) {
        //$LASTPOS=37001219;//kernel.BodyActor:1219
        _this.detectShape();
        //$LASTPOS=37001243;//kernel.BodyActor:1243
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=37001273;//kernel.BodyActor:1273
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=37001315;//kernel.BodyActor:1315
      if (_this.shape=="box") {
        //$LASTPOS=37001344;//kernel.BodyActor:1344
        if (! h) {
          //$LASTPOS=37001352;//kernel.BodyActor:1352
          h=w;
        }
        //$LASTPOS=37001366;//kernel.BodyActor:1366
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=37001410;//kernel.BodyActor:1410
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=37001514;//kernel.BodyActor:1514
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=37001551;//kernel.BodyActor:1551
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=37001628;//kernel.BodyActor:1628
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=37001664;//kernel.BodyActor:1664
      fps = wworld.fps;
      
      //$LASTPOS=37001689;//kernel.BodyActor:1689
      r = _this.rotation;
      ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));
      vr = _this.defv(_this.vrotation,0);
      
      //$LASTPOS=37001771;//kernel.BodyActor:1771
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=37001808;//kernel.BodyActor:1808
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=37001841;//kernel.BodyActor:1841
      _this.body.SetUserData(_this);
      //$LASTPOS=37001870;//kernel.BodyActor:1870
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=37001903;//kernel.BodyActor:1903
      _this.rotation=r;
      //$LASTPOS=37001920;//kernel.BodyActor:1920
      _this.vrotation=vr;
      //$LASTPOS=37001939;//kernel.BodyActor:1939
      _this.fireEvent("createBody");
    },
    fiber$initBody :function _trc_BodyActor_f_initBody(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wworld;
      var b2Vec2;
      var b2BodyDef;
      var b2Body;
      var b2FixtureDef;
      var b2Fixture;
      var b2PolygonShape;
      var b2CircleShape;
      var fixDef;
      var bodyDef;
      var w;
      var h;
      var fps;
      var r;
      var ve;
      var vr;
      
      //$LASTPOS=37000285;//kernel.BodyActor:285
      if (_this.body) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_BodyActor_ent_initBody(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000308;//kernel.BodyActor:308
            _this.fiber$getWorld(_thread);
            __pc=1;return;
          case 1:
            wworld=_thread.retVal;
            
            //$LASTPOS=37000336;//kernel.BodyActor:336
            _this.world=wworld.world;
            //$LASTPOS=37000361;//kernel.BodyActor:361
            _this.scale=wworld.scale;
            //$LASTPOS=37000386;//kernel.BodyActor:386
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=37000430;//kernel.BodyActor:430
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=37000477;//kernel.BodyActor:477
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=37000518;//kernel.BodyActor:518
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
            
            //$LASTPOS=37000571;//kernel.BodyActor:571
            b2Fixture = Box2D.Dynamics.b2Fixture;
            
            //$LASTPOS=37000618;//kernel.BodyActor:618
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            
            //$LASTPOS=37000683;//kernel.BodyActor:683
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
            
            //$LASTPOS=37000752;//kernel.BodyActor:752
            fixDef = new b2FixtureDef;
            
            //$LASTPOS=37000788;//kernel.BodyActor:788
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=2;return;
          case 2:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=37000830;//kernel.BodyActor:830
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=3;return;
          case 3:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=37000874;//kernel.BodyActor:874
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=4;return;
          case 4:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=37000930;//kernel.BodyActor:930
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=37000964;//kernel.BodyActor:964
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=37001052;//kernel.BodyActor:1052
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=37001088;//kernel.BodyActor:1088
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=37001124;//kernel.BodyActor:1124
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=37001173;//kernel.BodyActor:1173
            w = _this.width;
            h = _this.height;
            
            //$LASTPOS=37001200;//kernel.BodyActor:1200
            if (! w) {
              //$LASTPOS=37001219;//kernel.BodyActor:1219
              _this.detectShape();
              //$LASTPOS=37001243;//kernel.BodyActor:1243
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=37001273;//kernel.BodyActor:1273
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=37001315;//kernel.BodyActor:1315
            if (_this.shape=="box") {
              //$LASTPOS=37001344;//kernel.BodyActor:1344
              if (! h) {
                //$LASTPOS=37001352;//kernel.BodyActor:1352
                h=w;
              }
              //$LASTPOS=37001366;//kernel.BodyActor:1366
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=37001410;//kernel.BodyActor:1410
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=37001514;//kernel.BodyActor:1514
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=37001551;//kernel.BodyActor:1551
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=37001628;//kernel.BodyActor:1628
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=37001664;//kernel.BodyActor:1664
            fps = wworld.fps;
            
            //$LASTPOS=37001689;//kernel.BodyActor:1689
            r = _this.rotation;
            _this.fiber$bvec(_thread, _this.defv(_this.vx*fps,0), _this.defv(_this.vy*fps,0));
            __pc=5;return;
          case 5:
            ve=_thread.retVal;
            _this.fiber$defv(_thread, _this.vrotation, 0);
            __pc=6;return;
          case 6:
            vr=_thread.retVal;
            
            //$LASTPOS=37001771;//kernel.BodyActor:1771
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=37001808;//kernel.BodyActor:1808
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=37001841;//kernel.BodyActor:1841
            _this.body.SetUserData(_this);
            //$LASTPOS=37001870;//kernel.BodyActor:1870
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=37001903;//kernel.BodyActor:1903
            _this.rotation=r;
            //$LASTPOS=37001920;//kernel.BodyActor:1920
            _this.vrotation=vr;
            //$LASTPOS=37001939;//kernel.BodyActor:1939
            _this.fireEvent("createBody");
            _thread.exit(_this);return;
          }
        }
      });
    },
    allContactPoints :function _trc_BodyActor_allContactPoints(klass) {
      "use strict";
      var _this=this;
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37002000;//kernel.BodyActor:2000
      _this.initBody();
      //$LASTPOS=37002017;//kernel.BodyActor:2017
      res = [];
      
      //$LASTPOS=37002042;//kernel.BodyActor:2042
      w = _this.getWorld();
      
      //$LASTPOS=37002065;//kernel.BodyActor:2065
      //$LASTPOS=37002070;//kernel.BodyActor:2070
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=37002127;//kernel.BodyActor:2127
          if (c.IsTouching()) {
            //$LASTPOS=37002159;//kernel.BodyActor:2159
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=37002231;//kernel.BodyActor:2231
            if (m.m_points[0]) {
              //$LASTPOS=37002269;//kernel.BodyActor:2269
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=37002343;//kernel.BodyActor:2343
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=37002518;//kernel.BodyActor:2518
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=37002620;//kernel.BodyActor:2620
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=37002646;//kernel.BodyActor:2646
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=37002706;//kernel.BodyActor:2706
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=37002766;//kernel.BodyActor:2766
            if (a===_this) {
              //$LASTPOS=37002799;//kernel.BodyActor:2799
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37002869;//kernel.BodyActor:2869
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=37002962;//kernel.BodyActor:2962
              if (b===_this) {
                //$LASTPOS=37002995;//kernel.BodyActor:2995
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37003065;//kernel.BodyActor:3065
                  res.push({target: a,manifold: m,x: point.x,y: point.y});
                  
                }
                
              }
            }
            
          }
        }
      }
      return res;
    },
    fiber$allContactPoints :function _trc_BodyActor_f_allContactPoints(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      
      _thread.enter(function _trc_BodyActor_ent_allContactPoints(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37002000;//kernel.BodyActor:2000
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37002017;//kernel.BodyActor:2017
            res = [];
            
            //$LASTPOS=37002042;//kernel.BodyActor:2042
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            w=_thread.retVal;
            
            //$LASTPOS=37002065;//kernel.BodyActor:2065
            //$LASTPOS=37002070;//kernel.BodyActor:2070
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=37002127;//kernel.BodyActor:2127
                if (c.IsTouching()) {
                  //$LASTPOS=37002159;//kernel.BodyActor:2159
                  c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
                  //$LASTPOS=37002231;//kernel.BodyActor:2231
                  if (m.m_points[0]) {
                    //$LASTPOS=37002269;//kernel.BodyActor:2269
                    if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                      //$LASTPOS=37002343;//kernel.BodyActor:2343
                      point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                      
                    } else {
                      //$LASTPOS=37002518;//kernel.BodyActor:2518
                      point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                      
                    }
                    
                  } else {
                    //$LASTPOS=37002620;//kernel.BodyActor:2620
                    point={x: _this.x,y: _this.y};
                  }
                  //$LASTPOS=37002646;//kernel.BodyActor:2646
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=37002706;//kernel.BodyActor:2706
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=37002766;//kernel.BodyActor:2766
                  if (a===_this) {
                    //$LASTPOS=37002799;//kernel.BodyActor:2799
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=37002869;//kernel.BodyActor:2869
                      res.push({target: b,manifold: m,x: point.x,y: point.y});
                      
                    }
                    
                  } else {
                    //$LASTPOS=37002962;//kernel.BodyActor:2962
                    if (b===_this) {
                      //$LASTPOS=37002995;//kernel.BodyActor:2995
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=37003065;//kernel.BodyActor:3065
                        res.push({target: a,manifold: m,x: point.x,y: point.y});
                        
                      }
                      
                    }
                  }
                  
                }
              }
            }
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    contactPoint :function _trc_BodyActor_contactPoint(klass) {
      "use strict";
      var _this=this;
      
      return _this.allContactPoints(klass)[0];
    },
    fiber$contactPoint :function _trc_BodyActor_f_contactPoint(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContactPoints(klass)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    allContact :function _trc_BodyActor_allContact(klass) {
      "use strict";
      var _this=this;
      
      return _this.allContacts(klass);
    },
    fiber$allContact :function _trc_BodyActor_f_allContact(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContacts(klass);return;
      
      
      _thread.retVal=_this;return;
    },
    allContacts :function _trc_BodyActor_allContacts(klass) {
      "use strict";
      var _this=this;
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37003341;//kernel.BodyActor:3341
      _this.initBody();
      //$LASTPOS=37003358;//kernel.BodyActor:3358
      res = [];
      
      //$LASTPOS=37003375;//kernel.BodyActor:3375
      //$LASTPOS=37003380;//kernel.BodyActor:3380
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=37003437;//kernel.BodyActor:3437
          if (c.IsTouching()) {
            //$LASTPOS=37003472;//kernel.BodyActor:3472
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=37003532;//kernel.BodyActor:3532
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=37003592;//kernel.BodyActor:3592
            if (a===_this) {
              //$LASTPOS=37003625;//kernel.BodyActor:3625
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37003695;//kernel.BodyActor:3695
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=37003747;//kernel.BodyActor:3747
              if (b===_this) {
                //$LASTPOS=37003780;//kernel.BodyActor:3780
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37003850;//kernel.BodyActor:3850
                  res.push(a);
                  
                }
                
              }
            }
            
          }
        }
      }
      return res;
    },
    fiber$allContacts :function _trc_BodyActor_f_allContacts(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var c;
      var a;
      var b;
      
      
      _thread.enter(function _trc_BodyActor_ent_allContacts(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37003341;//kernel.BodyActor:3341
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37003358;//kernel.BodyActor:3358
            res = [];
            
            //$LASTPOS=37003375;//kernel.BodyActor:3375
            //$LASTPOS=37003380;//kernel.BodyActor:3380
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=37003437;//kernel.BodyActor:3437
                if (c.IsTouching()) {
                  //$LASTPOS=37003472;//kernel.BodyActor:3472
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=37003532;//kernel.BodyActor:3532
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=37003592;//kernel.BodyActor:3592
                  if (a===_this) {
                    //$LASTPOS=37003625;//kernel.BodyActor:3625
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=37003695;//kernel.BodyActor:3695
                      res.push(b);
                      
                    }
                    
                  } else {
                    //$LASTPOS=37003747;//kernel.BodyActor:3747
                    if (b===_this) {
                      //$LASTPOS=37003780;//kernel.BodyActor:3780
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=37003850;//kernel.BodyActor:3850
                        res.push(a);
                        
                      }
                      
                    }
                  }
                  
                }
              }
            }
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyForce :function _trc_BodyActor_applyForce(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37003968;//kernel.BodyActor:3968
      _this.initBody();
      //$LASTPOS=37003985;//kernel.BodyActor:3985
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=37004029;//kernel.BodyActor:4029
      scale = _this.getWorld().scale;
      
      //$LASTPOS=37004062;//kernel.BodyActor:4062
      fps = 60;
      
      //$LASTPOS=37004079;//kernel.BodyActor:4079
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyForce(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37003968;//kernel.BodyActor:3968
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37003985;//kernel.BodyActor:3985
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=37004029;//kernel.BodyActor:4029
            scale = _this.getWorld().scale;
            
            //$LASTPOS=37004062;//kernel.BodyActor:4062
            fps = 60;
            
            //$LASTPOS=37004079;//kernel.BodyActor:4079
            _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37004173;//kernel.BodyActor:4173
      _this.initBody();
      //$LASTPOS=37004190;//kernel.BodyActor:4190
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=37004234;//kernel.BodyActor:4234
      scale = _this.getWorld().scale;
      
      //$LASTPOS=37004267;//kernel.BodyActor:4267
      fps = 60;
      
      //$LASTPOS=37004284;//kernel.BodyActor:4284
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyImpulse(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37004173;//kernel.BodyActor:4173
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37004190;//kernel.BodyActor:4190
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=37004234;//kernel.BodyActor:4234
            scale = _this.getWorld().scale;
            
            //$LASTPOS=37004267;//kernel.BodyActor:4267
            fps = 60;
            
            //$LASTPOS=37004284;//kernel.BodyActor:4284
            _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37004371;//kernel.BodyActor:4371
      _this.initBody();
      //$LASTPOS=37004388;//kernel.BodyActor:4388
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyTorque(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37004371;//kernel.BodyActor:4371
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37004388;//kernel.BodyActor:4388
            _this.body.ApplyTorque(a);
            _thread.exit(_this);return;
          }
        }
      });
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=37004435;//kernel.BodyActor:4435
      _this.initBody();
      //$LASTPOS=37004452;//kernel.BodyActor:4452
      pos = _this.body.GetPosition();
      
      //$LASTPOS=37004485;//kernel.BodyActor:4485
      pos.x+=dx/_this.scale;
      //$LASTPOS=37004507;//kernel.BodyActor:4507
      pos.y+=dy/_this.scale;
      //$LASTPOS=37004529;//kernel.BodyActor:4529
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      
      _thread.enter(function _trc_BodyActor_ent_moveBy(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37004435;//kernel.BodyActor:4435
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37004452;//kernel.BodyActor:4452
            pos = _this.body.GetPosition();
            
            //$LASTPOS=37004485;//kernel.BodyActor:4485
            pos.x+=dx/_this.scale;
            //$LASTPOS=37004507;//kernel.BodyActor:4507
            pos.y+=dy/_this.scale;
            //$LASTPOS=37004529;//kernel.BodyActor:4529
            _this.body.SetPosition(pos);
            _thread.exit(_this);return;
          }
        }
      });
    },
    contactTo :function _trc_BodyActor_contactTo(t) {
      "use strict";
      var _this=this;
      
      return _this.allContact(t)[0];
    },
    fiber$contactTo :function _trc_BodyActor_f_contactTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContact(t)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_BodyActor_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37004620;//kernel.BodyActor:4620
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=37004638;//kernel.BodyActor:4638
      if (_this.world) {
        //$LASTPOS=37004649;//kernel.BodyActor:4649
        _this.world.DestroyBody(_this.body);
      }
    },
    addRevoluteJoint :function _trc_BodyActor_addRevoluteJoint(params) {
      "use strict";
      var _this=this;
      var px;
      var py;
      var wworld;
      var scale;
      var world;
      var b2BodyDef;
      var b2Body;
      var JDC;
      var jd;
      var bodyDef;
      var bodyB;
      var b2Vec2;
      
      //$LASTPOS=37004711;//kernel.BodyActor:4711
      _this.initBody();
      //$LASTPOS=37004758;//kernel.BodyActor:4758
      params=params||{};
      //$LASTPOS=37004782;//kernel.BodyActor:4782
      px = params.x||_this.x;
      
      //$LASTPOS=37004807;//kernel.BodyActor:4807
      py = params.y||_this.y;
      
      //$LASTPOS=37004832;//kernel.BodyActor:4832
      wworld = _this.getWorld();
      
      //$LASTPOS=37004874;//kernel.BodyActor:4874
      scale = wworld.scale;
      
      //$LASTPOS=37004903;//kernel.BodyActor:4903
      world = wworld.world;
      
      //$LASTPOS=37004932;//kernel.BodyActor:4932
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=37004979;//kernel.BodyActor:4979
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=37005020;//kernel.BodyActor:5020
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      
      //$LASTPOS=37005075;//kernel.BodyActor:5075
      jd = new JDC;
      
      //$LASTPOS=37005096;//kernel.BodyActor:5096
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=37005130;//kernel.BodyActor:5130
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=37005172;//kernel.BodyActor:5172
      bodyDef.position.x=px/scale;
      //$LASTPOS=37005209;//kernel.BodyActor:5209
      bodyDef.position.y=py/scale;
      //$LASTPOS=37005246;//kernel.BodyActor:5246
      bodyB = world.CreateBody(bodyDef);
      
      //$LASTPOS=37005288;//kernel.BodyActor:5288
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=37005332;//kernel.BodyActor:5332
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=37005395;//kernel.BodyActor:5395
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=37005449;//kernel.BodyActor:5449
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=37005497;//kernel.BodyActor:5497
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=37005545;//kernel.BodyActor:5545
        jd.enableLimit=true;
        
      }
      //$LASTPOS=37005580;//kernel.BodyActor:5580
      world.CreateJoint(jd);
    },
    fiber$addRevoluteJoint :function _trc_BodyActor_f_addRevoluteJoint(_thread,params) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var px;
      var py;
      var wworld;
      var scale;
      var world;
      var b2BodyDef;
      var b2Body;
      var JDC;
      var jd;
      var bodyDef;
      var bodyB;
      var b2Vec2;
      
      
      _thread.enter(function _trc_BodyActor_ent_addRevoluteJoint(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37004711;//kernel.BodyActor:4711
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37004758;//kernel.BodyActor:4758
            params=params||{};
            //$LASTPOS=37004782;//kernel.BodyActor:4782
            px = params.x||_this.x;
            
            //$LASTPOS=37004807;//kernel.BodyActor:4807
            py = params.y||_this.y;
            
            //$LASTPOS=37004832;//kernel.BodyActor:4832
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            wworld=_thread.retVal;
            
            //$LASTPOS=37004874;//kernel.BodyActor:4874
            scale = wworld.scale;
            
            //$LASTPOS=37004903;//kernel.BodyActor:4903
            world = wworld.world;
            
            //$LASTPOS=37004932;//kernel.BodyActor:4932
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=37004979;//kernel.BodyActor:4979
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=37005020;//kernel.BodyActor:5020
            JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
            
            //$LASTPOS=37005075;//kernel.BodyActor:5075
            jd = new JDC;
            
            //$LASTPOS=37005096;//kernel.BodyActor:5096
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=37005130;//kernel.BodyActor:5130
            bodyDef.type=b2Body.b2_staticBody;
            //$LASTPOS=37005172;//kernel.BodyActor:5172
            bodyDef.position.x=px/scale;
            //$LASTPOS=37005209;//kernel.BodyActor:5209
            bodyDef.position.y=py/scale;
            //$LASTPOS=37005246;//kernel.BodyActor:5246
            bodyB = world.CreateBody(bodyDef);
            
            //$LASTPOS=37005288;//kernel.BodyActor:5288
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=37005332;//kernel.BodyActor:5332
            jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
            //$LASTPOS=37005395;//kernel.BodyActor:5395
            if (params.lowerAngle&&params.upperAngle) {
              //$LASTPOS=37005449;//kernel.BodyActor:5449
              jd.lowerAngle=_this.rad(params.lowerAngle);
              //$LASTPOS=37005497;//kernel.BodyActor:5497
              jd.upperAngle=_this.rad(params.upperAngle);
              //$LASTPOS=37005545;//kernel.BodyActor:5545
              jd.enableLimit=true;
              
            }
            //$LASTPOS=37005580;//kernel.BodyActor:5580
            world.CreateJoint(jd);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37005628;//kernel.BodyActor:5628
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37005732;//kernel.BodyActor:5732
      r=r||0;
      //$LASTPOS=37005745;//kernel.BodyActor:5745
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=37005799;//kernel.BodyActor:5799
      _this.body.SetAngle(_this.rad(r));
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=37005839;//kernel.BodyActor:5839
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=37005866;//kernel.BodyActor:5866
      pos = _this.body.GetPosition();
      
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=37005935;//kernel.BodyActor:5935
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=37005964;//kernel.BodyActor:5964
      v=v||0;
      //$LASTPOS=37005977;//kernel.BodyActor:5977
      pos = _this.body.GetPosition();
      
      //$LASTPOS=37006010;//kernel.BodyActor:6010
      pos.x=v/_this.scale;
      //$LASTPOS=37006030;//kernel.BodyActor:6030
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=37006067;//kernel.BodyActor:6067
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=37006094;//kernel.BodyActor:6094
      pos = _this.body.GetPosition();
      
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=37006163;//kernel.BodyActor:6163
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=37006192;//kernel.BodyActor:6192
      v=v||0;
      //$LASTPOS=37006205;//kernel.BodyActor:6205
      pos = _this.body.GetPosition();
      
      //$LASTPOS=37006238;//kernel.BodyActor:6238
      pos.y=v/_this.scale;
      //$LASTPOS=37006258;//kernel.BodyActor:6258
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=37006298;//kernel.BodyActor:6298
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=37006326;//kernel.BodyActor:6326
      v = _this.body.GetLinearVelocity();
      
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=37006413;//kernel.BodyActor:6413
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=37006443;//kernel.BodyActor:6443
      v=v||0;
      //$LASTPOS=37006456;//kernel.BodyActor:6456
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=37006494;//kernel.BodyActor:6494
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=37006528;//kernel.BodyActor:6528
      if (v) {
        //$LASTPOS=37006535;//kernel.BodyActor:6535
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37006561;//kernel.BodyActor:6561
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=37006606;//kernel.BodyActor:6606
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=37006634;//kernel.BodyActor:6634
      v = _this.body.GetLinearVelocity();
      
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=37006721;//kernel.BodyActor:6721
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=37006751;//kernel.BodyActor:6751
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=37006789;//kernel.BodyActor:6789
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=37006823;//kernel.BodyActor:6823
      if (v) {
        //$LASTPOS=37006830;//kernel.BodyActor:6830
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37006856;//kernel.BodyActor:6856
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37006906;//kernel.BodyActor:6906
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37007012;//kernel.BodyActor:7012
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=37007042;//kernel.BodyActor:7042
      v=v||0;
      //$LASTPOS=37007055;//kernel.BodyActor:7055
      if (v) {
        //$LASTPOS=37007062;//kernel.BodyActor:7062
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37007088;//kernel.BodyActor:7088
      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"getWorld":{"nowait":false},"update":{"nowait":false},"initBody":{"nowait":false},"allContactPoints":{"nowait":false},"contactPoint":{"nowait":false},"allContact":{"nowait":false},"allContacts":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Body',
  shortName: 'T2Body',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_T2Body_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2Body_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2World',
  shortName: 'T2World',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2Mod],
  methods: {
    main :function _trc_T2World_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000150;//kernel.T2World:150
      _this.loop();
    },
    fiber$main :function _trc_T2World_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2World_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000150;//kernel.T2World:150
            _this.fiber$loop(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_T2World_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=38000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000133;//kernel.T2World:133
            _this.fiber$initWorld(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initWorld :function _trc_T2World_initWorld() {
      "use strict";
      var _this=this;
      var b2World;
      var b2Vec2;
      
      //$LASTPOS=38000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=38000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=38000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=38000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      
      //$LASTPOS=38000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=38000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=38000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=38000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=38000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=38000572;//kernel.T2World:572
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
    },
    fiber$initWorld :function _trc_T2World_f_initWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2World;
      var b2Vec2;
      
      
      _thread.enter(function _trc_T2World_ent_initWorld(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=38000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=38000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=38000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            
            //$LASTPOS=38000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=38000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=38000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=38000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=38000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=38000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=38000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=38000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=38000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=38000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=38000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=38000976;//kernel.T2World:976
        _this.update();
        
      }
    },
    fiber$loop :function _trc_T2World_f_loop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2World_ent_loop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=38000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=38000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=38000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=38000976;//kernel.T2World:976
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    updatePos :function _trc_T2World_updatePos() {
      "use strict";
      var _this=this;
      var b;
      var d;
      
      //$LASTPOS=38001017;//kernel.T2World:1017
      //$LASTPOS=38001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=38001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=38001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=38001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
      }
    },
    fiber$updatePos :function _trc_T2World_f_updatePos(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      var d;
      
      //$LASTPOS=38001017;//kernel.T2World:1017
      //$LASTPOS=38001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=38001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=38001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=38001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2MediaPlayer',
  shortName: 'T2MediaPlayer',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_T2MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_T2MediaPlayer_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=39000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=39000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=39000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=39000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=39000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=39000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=39000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000367;//kernel.T2MediaPlayer:367
      _this.clearSEData();
    },
    fiber$clearBGMData :function _trc_T2MediaPlayer_f_clearBGMData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_clearBGMData(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000367;//kernel.T2MediaPlayer:367
            _this.fiber$clearSEData(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    deleteSEData :function _trc_T2MediaPlayer_deleteSEData(idx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      "use strict";
      var _this=this;
      var data;
      
      //$LASTPOS=39000508;//kernel.T2MediaPlayer:508
      _this.runAsync((function anonymous_517(succ,err) {
        
        //$LASTPOS=39000567;//kernel.T2MediaPlayer:567
        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
      }));
      //$LASTPOS=39000620;//kernel.T2MediaPlayer:620
      data = T2MediaLib.getSEData(idx);
      
      return data;
    },
    fiber$loadSE :function _trc_T2MediaPlayer_f_loadSE(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var data;
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadSE(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000508;//kernel.T2MediaPlayer:508
            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {
              
              //$LASTPOS=39000567;//kernel.T2MediaPlayer:567
              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39000620;//kernel.T2MediaPlayer:620
            data = T2MediaLib.getSEData(idx);
            
            _thread.exit(data);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__available :function _trc_T2MediaPlayer___getter__available() {
      "use strict";
      var _this=this;
      
      return ! ! T2MediaLib.context;
    },
    loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {
      "use strict";
      var _this=this;
      var r;
      var s;
      var _it_353;
      var name;
      var url;
      var e;
      
      //$LASTPOS=39000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=39000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      
      //$LASTPOS=39000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=39000974;//kernel.T2MediaPlayer:974
      _it_353=Tonyu.iterator(r.sounds,1);
      while(_it_353.next()) {
        s=_it_353[0];
        
        //$LASTPOS=39001010;//kernel.T2MediaPlayer:1010
        name = s.name;
        url = Tonyu.Assets.resolve(s.url,prj.getDir());
        
        //$LASTPOS=39001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=39001189;//kernel.T2MediaPlayer:1189
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=39001244;//kernel.T2MediaPlayer:1244
          _this.print("Fail");
          //$LASTPOS=39001272;//kernel.T2MediaPlayer:1272
          Tonyu.setGlobal(name,"ERROR");
          
        }
        
      }
    },
    fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var s;
      var _it_353;
      var name;
      var url;
      var e;
      
      //$LASTPOS=39000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      
      //$LASTPOS=39000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000974;//kernel.T2MediaPlayer:974
            _it_353=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_353.next())) { __pc=5; break; }
            s=_it_353[0];
            
            //$LASTPOS=39001010;//kernel.T2MediaPlayer:1010
            name = s.name;
            url = Tonyu.Assets.resolve(s.url,prj.getDir());
            
            //$LASTPOS=39001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=39001189;//kernel.T2MediaPlayer:1189
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=39001244;//kernel.T2MediaPlayer:1244
              _this.print("Fail");
              //$LASTPOS=39001272;//kernel.T2MediaPlayer:1272
              Tonyu.setGlobal(name,"ERROR");
            }
          case 4:
            
            __pc=1;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playSE :function _trc_T2MediaPlayer_playSE(idx,vol,rate,offset,loop,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001410;//kernel.T2MediaPlayer:1410
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=39001469;//kernel.T2MediaPlayer:1469
      if (vol==null) {
        //$LASTPOS=39001486;//kernel.T2MediaPlayer:1486
        vol=128;
      }
      //$LASTPOS=39001575;//kernel.T2MediaPlayer:1575
      if (vol<0) {
        //$LASTPOS=39001595;//kernel.T2MediaPlayer:1595
        vol=0;
      } else {
        //$LASTPOS=39001616;//kernel.T2MediaPlayer:1616
        if (vol>128) {
          //$LASTPOS=39001631;//kernel.T2MediaPlayer:1631
          vol=128;
        }
      }
      return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);
    },
    stopSE :function _trc_T2MediaPlayer_stopSE(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.stopSE(sourceObj);
    },
    fiber$stopSE :function _trc_T2MediaPlayer_f_stopSE(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopSE(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEData :function _trc_T2MediaPlayer_getSEData(idx) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSEData(idx);
    },
    fiber$getSEData :function _trc_T2MediaPlayer_f_getSEData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSEData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    loadBGM :function _trc_T2MediaPlayer_loadBGM(idx,src) {
      "use strict";
      var _this=this;
      var data;
      
      //$LASTPOS=39001922;//kernel.T2MediaPlayer:1922
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=39001982;//kernel.T2MediaPlayer:1982
      data = T2MediaLib.getBGMData(idx);
      
      //$LASTPOS=39002026;//kernel.T2MediaPlayer:2026
      while (data==null) {
        //$LASTPOS=39002058;//kernel.T2MediaPlayer:2058
        _this.update();
        //$LASTPOS=39002077;//kernel.T2MediaPlayer:2077
        data=T2MediaLib.getBGMData(idx);
        
      }
      return data;
    },
    fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var data;
      
      //$LASTPOS=39001922;//kernel.T2MediaPlayer:1922
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=39001982;//kernel.T2MediaPlayer:1982
      data = T2MediaLib.getBGMData(idx);
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002026;//kernel.T2MediaPlayer:2026
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=39002058;//kernel.T2MediaPlayer:2058
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39002077;//kernel.T2MediaPlayer:2077
            data=T2MediaLib.getBGMData(idx);
            __pc=1;break;
          case 3:
            
            _thread.exit(data);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    playBGM :function _trc_T2MediaPlayer_playBGM(idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39002198;//kernel.T2MediaPlayer:2198
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=39002221;//kernel.T2MediaPlayer:2221
      if (loop===null) {
        //$LASTPOS=39002240;//kernel.T2MediaPlayer:2240
        loop=false;
      }
      //$LASTPOS=39002259;//kernel.T2MediaPlayer:2259
      if (offset===null) {
        //$LASTPOS=39002280;//kernel.T2MediaPlayer:2280
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002198;//kernel.T2MediaPlayer:2198
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39002221;//kernel.T2MediaPlayer:2221
      if (loop===null) {
        //$LASTPOS=39002240;//kernel.T2MediaPlayer:2240
        loop=false;
      }
      //$LASTPOS=39002259;//kernel.T2MediaPlayer:2259
      if (offset===null) {
        //$LASTPOS=39002280;//kernel.T2MediaPlayer:2280
        offset=0;
      }
      _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGM :function _trc_T2MediaPlayer_stopBGM() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.stopBGM(0);
    },
    fiber$stopBGM :function _trc_T2MediaPlayer_f_stopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGM :function _trc_T2MediaPlayer_pauseBGM() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.pauseBGM(0);
    },
    fiber$pauseBGM :function _trc_T2MediaPlayer_f_pauseBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGM :function _trc_T2MediaPlayer_resumeBGM() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.resumeBGM(0);
    },
    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39002566;//kernel.T2MediaPlayer:2566
      vol=vol/128;
      //$LASTPOS=39002661;//kernel.T2MediaPlayer:2661
      if (vol>1) {
        //$LASTPOS=39002681;//kernel.T2MediaPlayer:2681
        vol=1;
      } else {
        //$LASTPOS=39002702;//kernel.T2MediaPlayer:2702
        if (vol<0) {
          //$LASTPOS=39002717;//kernel.T2MediaPlayer:2717
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002566;//kernel.T2MediaPlayer:2566
      vol=vol/128;
      //$LASTPOS=39002661;//kernel.T2MediaPlayer:2661
      if (vol>1) {
        //$LASTPOS=39002681;//kernel.T2MediaPlayer:2681
        vol=1;
      } else {
        //$LASTPOS=39002702;//kernel.T2MediaPlayer:2702
        if (vol<0) {
          //$LASTPOS=39002717;//kernel.T2MediaPlayer:2717
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempo :function _trc_T2MediaPlayer_setBGMTempo(tempo) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMTempo(0,tempo);
    },
    fiber$setBGMTempo :function _trc_T2MediaPlayer_f_setBGMTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTime :function _trc_T2MediaPlayer_getBGMCurrentTime() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMCurrentTime(0);
    },
    fiber$getBGMCurrentTime :function _trc_T2MediaPlayer_f_getBGMCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLength :function _trc_T2MediaPlayer_getBGMLength() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLength(0);
    },
    fiber$getBGMLength :function _trc_T2MediaPlayer_f_getBGMLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLength(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMData :function _trc_T2MediaPlayer_getBGMData(idx) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMData(idx);
    },
    fiber$getBGMData :function _trc_T2MediaPlayer_f_getBGMData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    playBGMID :function _trc_T2MediaPlayer_playBGMID(id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003221;//kernel.T2MediaPlayer:3221
      if (loop===null) {
        //$LASTPOS=39003240;//kernel.T2MediaPlayer:3240
        loop=false;
      }
      //$LASTPOS=39003259;//kernel.T2MediaPlayer:3259
      if (offset===null) {
        //$LASTPOS=39003280;//kernel.T2MediaPlayer:3280
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39003221;//kernel.T2MediaPlayer:3221
      if (loop===null) {
        //$LASTPOS=39003240;//kernel.T2MediaPlayer:3240
        loop=false;
      }
      //$LASTPOS=39003259;//kernel.T2MediaPlayer:3259
      if (offset===null) {
        //$LASTPOS=39003280;//kernel.T2MediaPlayer:3280
        offset=0;
      }
      _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGMID :function _trc_T2MediaPlayer_stopBGMID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.stopBGM(id);
    },
    fiber$stopBGMID :function _trc_T2MediaPlayer_f_stopBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGMID :function _trc_T2MediaPlayer_pauseBGMID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.pauseBGM(id);
    },
    fiber$pauseBGMID :function _trc_T2MediaPlayer_f_pauseBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGMID :function _trc_T2MediaPlayer_resumeBGMID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.resumeBGM(id);
    },
    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003588;//kernel.T2MediaPlayer:3588
      vol=vol/128;
      //$LASTPOS=39003683;//kernel.T2MediaPlayer:3683
      if (vol>1) {
        //$LASTPOS=39003703;//kernel.T2MediaPlayer:3703
        vol=1;
      } else {
        //$LASTPOS=39003724;//kernel.T2MediaPlayer:3724
        if (vol<0) {
          //$LASTPOS=39003739;//kernel.T2MediaPlayer:3739
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39003588;//kernel.T2MediaPlayer:3588
      vol=vol/128;
      //$LASTPOS=39003683;//kernel.T2MediaPlayer:3683
      if (vol>1) {
        //$LASTPOS=39003703;//kernel.T2MediaPlayer:3703
        vol=1;
      } else {
        //$LASTPOS=39003724;//kernel.T2MediaPlayer:3724
        if (vol<0) {
          //$LASTPOS=39003739;//kernel.T2MediaPlayer:3739
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempoID :function _trc_T2MediaPlayer_setBGMTempoID(id,tempo) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMTempo(id,tempo);
    },
    fiber$setBGMTempoID :function _trc_T2MediaPlayer_f_setBGMTempoID(_thread,id,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTimeID :function _trc_T2MediaPlayer_getBGMCurrentTimeID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMCurrentTime(id);
    },
    fiber$getBGMCurrentTimeID :function _trc_T2MediaPlayer_f_getBGMCurrentTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLengthID :function _trc_T2MediaPlayer_getBGMLengthID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLength(id);
    },
    fiber$getBGMLengthID :function _trc_T2MediaPlayer_f_getBGMLengthID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLength(id);return;
      
      
      _thread.retVal=_this;return;
    },
    sizeBGMID :function _trc_T2MediaPlayer_sizeBGMID() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMPlayerMax();
    },
    fiber$sizeBGMID :function _trc_T2MediaPlayer_f_sizeBGMID(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMPlayerMax();return;
      
      
      _thread.retVal=_this;return;
    },
    allStopBGM :function _trc_T2MediaPlayer_allStopBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004199;//kernel.T2MediaPlayer:4199
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004199;//kernel.T2MediaPlayer:4199
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004278;//kernel.T2MediaPlayer:4278
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=39004340;//kernel.T2MediaPlayer:4340
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=39004385;//kernel.T2MediaPlayer:4385
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004278;//kernel.T2MediaPlayer:4278
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39004340;//kernel.T2MediaPlayer:4340
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=39004385;//kernel.T2MediaPlayer:4385
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playAudio :function _trc_T2MediaPlayer_playAudio(idx,loop,startTime) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004441;//kernel.T2MediaPlayer:4441
      if (loop===null) {
        //$LASTPOS=39004460;//kernel.T2MediaPlayer:4460
        loop=false;
      }
      //$LASTPOS=39004479;//kernel.T2MediaPlayer:4479
      if (startTime===null) {
        //$LASTPOS=39004503;//kernel.T2MediaPlayer:4503
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004441;//kernel.T2MediaPlayer:4441
      if (loop===null) {
        //$LASTPOS=39004460;//kernel.T2MediaPlayer:4460
        loop=false;
      }
      //$LASTPOS=39004479;//kernel.T2MediaPlayer:4479
      if (startTime===null) {
        //$LASTPOS=39004503;//kernel.T2MediaPlayer:4503
        startTime=0;
      }
      _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;
      
      
      _thread.retVal=_this;return;
    },
    stopAudio :function _trc_T2MediaPlayer_stopAudio() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.stopAudio();
    },
    fiber$stopAudio :function _trc_T2MediaPlayer_f_stopAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    pauseAudio :function _trc_T2MediaPlayer_pauseAudio() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.pauseAudio();
    },
    fiber$pauseAudio :function _trc_T2MediaPlayer_f_pauseAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    resumeAudio :function _trc_T2MediaPlayer_resumeAudio() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.resumeAudio();
    },
    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004785;//kernel.T2MediaPlayer:4785
      vol=vol/128;
      //$LASTPOS=39004807;//kernel.T2MediaPlayer:4807
      if (vol>1) {
        //$LASTPOS=39004827;//kernel.T2MediaPlayer:4827
        vol=1;
      } else {
        //$LASTPOS=39004848;//kernel.T2MediaPlayer:4848
        if (vol<0) {
          //$LASTPOS=39004863;//kernel.T2MediaPlayer:4863
          vol=0;
        }
      }
      return T2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004785;//kernel.T2MediaPlayer:4785
      vol=vol/128;
      //$LASTPOS=39004807;//kernel.T2MediaPlayer:4807
      if (vol>1) {
        //$LASTPOS=39004827;//kernel.T2MediaPlayer:4827
        vol=1;
      } else {
        //$LASTPOS=39004848;//kernel.T2MediaPlayer:4848
        if (vol<0) {
          //$LASTPOS=39004863;//kernel.T2MediaPlayer:4863
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004953;//kernel.T2MediaPlayer:4953
      if (tempo>4) {
        //$LASTPOS=39004975;//kernel.T2MediaPlayer:4975
        tempo=4;
      } else {
        //$LASTPOS=39004998;//kernel.T2MediaPlayer:4998
        if (tempo<0.5) {
          //$LASTPOS=39005015;//kernel.T2MediaPlayer:5015
          tempo=0.5;
        }
      }
      return T2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004953;//kernel.T2MediaPlayer:4953
      if (tempo>4) {
        //$LASTPOS=39004975;//kernel.T2MediaPlayer:4975
        tempo=4;
      } else {
        //$LASTPOS=39004998;//kernel.T2MediaPlayer:4998
        if (tempo<0.5) {
          //$LASTPOS=39005015;//kernel.T2MediaPlayer:5015
          tempo=0.5;
        }
      }
      _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioPosition :function _trc_T2MediaPlayer_setAudioPosition(time) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setAudioPosition(time);
    },
    fiber$setAudioPosition :function _trc_T2MediaPlayer_f_setAudioPosition(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setAudioPosition(time);return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioCurrentTime :function _trc_T2MediaPlayer_getAudioCurrentTime() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getAudioCurrentTime();
    },
    fiber$getAudioCurrentTime :function _trc_T2MediaPlayer_f_getAudioCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getAudioCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioLength :function _trc_T2MediaPlayer_getAudioLength() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getAudioLength();
    },
    fiber$getAudioLength :function _trc_T2MediaPlayer_f_getAudioLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getAudioLength();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioData :function _trc_T2MediaPlayer_getAudioData(idx) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getAudioData(idx);
    },
    fiber$getAudioData :function _trc_T2MediaPlayer_f_getAudioData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getAudioData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"loadSE":{"nowait":false},"__getter__available":{"nowait":true},"loadFromProject":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEData":{"nowait":false},"loadBGM":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"setBGMVolume":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"sizeBGMID":{"nowait":false},"allStopBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.PlainChar',
  shortName: 'PlainChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PlainChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_PlainChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_PlainChar_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=40000096;//kernel.PlainChar:96
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=40000142;//kernel.PlainChar:142
        _this.initSprite();
        
      }
      //$LASTPOS=40000168;//kernel.PlainChar:168
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=40000198;//kernel.PlainChar:198
      if (typeof  x=="object") {
        //$LASTPOS=40000222;//kernel.PlainChar:222
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=40000254;//kernel.PlainChar:254
        if (typeof  x=="number") {
          //$LASTPOS=40000289;//kernel.PlainChar:289
          _this.x=x;
          //$LASTPOS=40000308;//kernel.PlainChar:308
          _this.y=y;
          //$LASTPOS=40000327;//kernel.PlainChar:327
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000364;//kernel.PlainChar:364
      _this.onDraw();
      //$LASTPOS=40000379;//kernel.PlainChar:379
      if (_this._isInvisible) {
        return _this;
      }
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000453;//kernel.PlainChar:453
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000453;//kernel.PlainChar:453
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    onDraw :function _trc_PlainChar_onDraw() {
      "use strict";
      var _this=this;
      
    },
    fiber$onDraw :function _trc_PlainChar_f_onDraw(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_PlainChar_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000509;//kernel.PlainChar:509
      _this.onUpdate();
      //$LASTPOS=40000526;//kernel.PlainChar:526
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000509;//kernel.PlainChar:509
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000526;//kernel.PlainChar:526
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_PlainChar_onUpdate() {
      "use strict";
      var _this=this;
      
    },
    initSprite :function _trc_PlainChar_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=40000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=40000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=40000709;//kernel.PlainChar:709
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=40000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=40000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000709;//kernel.PlainChar:709
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tMain :function _trc_PlainChar_tMain() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000741;//kernel.PlainChar:741
      _this.main();
      //$LASTPOS=40000754;//kernel.PlainChar:754
      _this.die();
    },
    fiber$tMain :function _trc_PlainChar_f_tMain(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_PlainChar_ent_tMain(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000741;//kernel.PlainChar:741
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40000754;//kernel.PlainChar:754
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.SecretChar',
  shortName: 'SecretChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SecretChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SecretChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_SecretChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000038;//kernel.SecretChar:38
      _this.onDraw();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SpriteChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SpriteChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_SpriteChar_initialize(x,y,p,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=42000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=42000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=42000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=42000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=42000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=42000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=42000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=42000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=42000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000220;//kernel.SpriteChar:220
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=42000251;//kernel.SpriteChar:251
      _this.onDraw();
      //$LASTPOS=42000266;//kernel.SpriteChar:266
      _this.detectShape();
      //$LASTPOS=42000286;//kernel.SpriteChar:286
      _this.drawSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Map',
  shortName: 'T1Map',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Map,
  includes: [],
  methods: {
    main :function _trc_T1Map_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Map_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_T1Map_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=43000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=43000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=43000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=43000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=43000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=43000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=43000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=43000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=43000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=43000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=43000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=43000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=43000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=43000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=43000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=43000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=43000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=43000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=43000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=43000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=43000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=43000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=43000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=43000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=43000885;//kernel.T1Map:885
            _this.fiber$initMap(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    conv :function _trc_T1Map_conv(mat,tbl) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=43000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=43000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=43000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=43000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=43001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=43001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=43001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=43001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=43001165;//kernel.T1Map:1165
            rrow.push(dat[1]);
          }
        }));
      }));
      return res;
    },
    fiber$conv :function _trc_T1Map_f_conv(_thread,mat,tbl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=43000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=43000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=43000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=43000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=43001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=43001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=43001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=43001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=43001165;//kernel.T1Map:1165
            rrow.push(dat[1]);
          }
        }));
      }));
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Page',
  shortName: 'T1Page',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_T1Page_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Page_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initGlobals :function _trc_T1Page_initGlobals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=44000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=44000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=44000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=44000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=44000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=44000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=44000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=44000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=44000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=44000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=44000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=44000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=44000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=44000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=44000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=44000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=44000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=44000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=44000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=44000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TextChar',
  shortName: 'TextChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_TextChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TextChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TextChar_initialize(xx,yy,t,c,s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000072;//kernel.TextChar:72
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=45000091;//kernel.TextChar:91
      _this.text=_this.text||"";
      //$LASTPOS=45000111;//kernel.TextChar:111
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=45000130;//kernel.TextChar:130
      _this.size=20;
      //$LASTPOS=45000144;//kernel.TextChar:144
      if (! _this.x) {
        //$LASTPOS=45000157;//kernel.TextChar:157
        _this.x=0;
      }
      //$LASTPOS=45000172;//kernel.TextChar:172
      if (! _this.y) {
        //$LASTPOS=45000185;//kernel.TextChar:185
        _this.y=0;
      }
      //$LASTPOS=45000200;//kernel.TextChar:200
      if (t) {
        //$LASTPOS=45000207;//kernel.TextChar:207
        _this.text=t;
      }
      //$LASTPOS=45000220;//kernel.TextChar:220
      if (c) {
        //$LASTPOS=45000227;//kernel.TextChar:227
        _this.fillStyle=c;
      }
      //$LASTPOS=45000245;//kernel.TextChar:245
      if (s) {
        //$LASTPOS=45000252;//kernel.TextChar:252
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000282;//kernel.TextChar:282
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=45000313;//kernel.TextChar:313
      _this.onDraw();
      //$LASTPOS=45000328;//kernel.TextChar:328
      _this.drawText(_this.x,_this.y,_this.text,_this.col,_this.size);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.GameConsole',
  shortName: 'GameConsole',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GameConsole_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GameConsole_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameConsole_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=46000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=46000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=46000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=46000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=46000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=46000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=46000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=46000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=46000469;//kernel.GameConsole:469
      smaller = 5;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=46000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=46000469;//kernel.GameConsole:469
      smaller = 5;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    layout :function _trc_GameConsole_layout() {
      "use strict";
      var _this=this;
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=46000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=46000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=46000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=46000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=46000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=46000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=46000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=46000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=46000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=46000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=46000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=46000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=46000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=46000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=46001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=46001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
    },
    fiber$layout :function _trc_GameConsole_f_layout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=46000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=46000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=46000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=46000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=46000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=46000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=46000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=46000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=46000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=46000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=46000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=46000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=46000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=46000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=46001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=46001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=46001159;//kernel.GameConsole:1159
      _this.sprites.draw(_this.canvas[0]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"shouldDraw1x1":{"nowait":false},"layout":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditor',
  shortName: 'MapEditor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditor_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=47000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=47000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=47000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      //$LASTPOS=47000158;//kernel.MapEditor:158
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=47000186;//kernel.MapEditor:186
      if (_this.fileList.exists()) {
        //$LASTPOS=47000214;//kernel.MapEditor:214
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=47000257;//kernel.MapEditor:257
          f=f+"";
          //$LASTPOS=47000274;//kernel.MapEditor:274
          _this.fNames=f.split("/");
          //$LASTPOS=47000304;//kernel.MapEditor:304
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=47000345;//kernel.MapEditor:345
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=47000388;//kernel.MapEditor:388
      if (_this.fileExist) {
        //$LASTPOS=47000408;//kernel.MapEditor:408
        _this.print("Load Data?: Y or N");
        //$LASTPOS=47000442;//kernel.MapEditor:442
        while (true) {
          //$LASTPOS=47000464;//kernel.MapEditor:464
          if (_this.getkey("y")>0) {
            //$LASTPOS=47000496;//kernel.MapEditor:496
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=47000551;//kernel.MapEditor:551
          if (_this.getkey("n")>0) {
            //$LASTPOS=47000583;//kernel.MapEditor:583
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=47000639;//kernel.MapEditor:639
          _this.update();
          
        }
        //$LASTPOS=47000661;//kernel.MapEditor:661
        if (_this.loadMode) {
          //$LASTPOS=47000684;//kernel.MapEditor:684
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=47000749;//kernel.MapEditor:749
          if (_this.fileName) {
            //$LASTPOS=47000776;//kernel.MapEditor:776
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=47000840;//kernel.MapEditor:840
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=47000876;//kernel.MapEditor:876
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=47000917;//kernel.MapEditor:917
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=47000967;//kernel.MapEditor:967
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=47001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=47001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=47001149;//kernel.MapEditor:1149
          if (_this.baseData==undefined) {
            //$LASTPOS=47001187;//kernel.MapEditor:1187
            _this.print("Load failed");
            //$LASTPOS=47001222;//kernel.MapEditor:1222
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=47001253;//kernel.MapEditor:1253
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=47001298;//kernel.MapEditor:1298
              _this.mapData=_this.baseData[0];
              //$LASTPOS=47001332;//kernel.MapEditor:1332
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=47001368;//kernel.MapEditor:1368
              if (_this.baseData.length>2) {
                //$LASTPOS=47001408;//kernel.MapEditor:1408
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=47001464;//kernel.MapEditor:1464
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=47001541;//kernel.MapEditor:1541
      _this.update();
      //$LASTPOS=47001855;//kernel.MapEditor:1855
      if (! _this.loadMode) {
        //$LASTPOS=47001875;//kernel.MapEditor:1875
        _this.row=_this.prompt("input row");
        //$LASTPOS=47001905;//kernel.MapEditor:1905
        _this.col=_this.prompt("input col");
        //$LASTPOS=47001935;//kernel.MapEditor:1935
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=47001977;//kernel.MapEditor:1977
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=47002021;//kernel.MapEditor:2021
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=47002086;//kernel.MapEditor:2086
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=47002117;//kernel.MapEditor:2117
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=47002149;//kernel.MapEditor:2149
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=47002182;//kernel.MapEditor:2182
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=47002233;//kernel.MapEditor:2233
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=47002544;//kernel.MapEditor:2544
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=47002591;//kernel.MapEditor:2591
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=47002617;//kernel.MapEditor:2617
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=47002713;//kernel.MapEditor:2713
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=47002744;//kernel.MapEditor:2744
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=47002776;//kernel.MapEditor:2776
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=47002809;//kernel.MapEditor:2809
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=47002876;//kernel.MapEditor:2876
      _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=47002919;//kernel.MapEditor:2919
      _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=47002963;//kernel.MapEditor:2963
      _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=47003002;//kernel.MapEditor:3002
      _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=47003042;//kernel.MapEditor:3042
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=47003124;//kernel.MapEditor:3124
      _this.counter=0;
      //$LASTPOS=47003136;//kernel.MapEditor:3136
      //$LASTPOS=47003140;//kernel.MapEditor:3140
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=47003169;//kernel.MapEditor:3169
          //$LASTPOS=47003173;//kernel.MapEditor:3173
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=47003206;//kernel.MapEditor:3206
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=47003250;//kernel.MapEditor:3250
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=47003274;//kernel.MapEditor:3274
      Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=47003354;//kernel.MapEditor:3354
      _this.mode="get";
      //$LASTPOS=47003367;//kernel.MapEditor:3367
      _this.prevMode="set";
      //$LASTPOS=47003384;//kernel.MapEditor:3384
      _this.mapp=0;
      //$LASTPOS=47003393;//kernel.MapEditor:3393
      _this.maponp=- 1;
      //$LASTPOS=47003405;//kernel.MapEditor:3405
      _this.mx=- 40;
      //$LASTPOS=47003414;//kernel.MapEditor:3414
      _this.my=- 40;
      //$LASTPOS=47003423;//kernel.MapEditor:3423
      _this.chipX=- 40;
      //$LASTPOS=47003435;//kernel.MapEditor:3435
      _this.chipY=- 40;
      //$LASTPOS=47003447;//kernel.MapEditor:3447
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=47003476;//kernel.MapEditor:3476
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=47003507;//kernel.MapEditor:3507
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=47003532;//kernel.MapEditor:3532
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=47003562;//kernel.MapEditor:3562
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=47003594;//kernel.MapEditor:3594
      _this.layers=["base","on","all"];
      //$LASTPOS=47003623;//kernel.MapEditor:3623
      _this.lc=0;
      //$LASTPOS=47003630;//kernel.MapEditor:3630
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=47003657;//kernel.MapEditor:3657
      _this.drawPanel();
      //$LASTPOS=47003671;//kernel.MapEditor:3671
      _this.drawLetter(_this.mode);
      //$LASTPOS=47003692;//kernel.MapEditor:3692
      while (true) {
        //$LASTPOS=47003710;//kernel.MapEditor:3710
        _this.p=_this.mapp;
        //$LASTPOS=47003723;//kernel.MapEditor:3723
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=47003842;//kernel.MapEditor:3842
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47003876;//kernel.MapEditor:3876
          _this.mode="erase";
          //$LASTPOS=47003931;//kernel.MapEditor:3931
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=47003961;//kernel.MapEditor:3961
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47004080;//kernel.MapEditor:4080
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47004114;//kernel.MapEditor:4114
          _this.mode="set";
          //$LASTPOS=47004135;//kernel.MapEditor:4135
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=47004165;//kernel.MapEditor:4165
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47004286;//kernel.MapEditor:4286
          _this.lc++;
          //$LASTPOS=47004301;//kernel.MapEditor:4301
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=47004338;//kernel.MapEditor:4338
          _this.drawPanel();
          //$LASTPOS=47004392;//kernel.MapEditor:4392
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=47004515;//kernel.MapEditor:4515
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47004636;//kernel.MapEditor:4636
          if (_this.mode!="get") {
            //$LASTPOS=47004666;//kernel.MapEditor:4666
            _this.prevMode=_this.mode;
            //$LASTPOS=47004694;//kernel.MapEditor:4694
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=47004730;//kernel.MapEditor:4730
            _this.mode="get";
            //$LASTPOS=47004755;//kernel.MapEditor:4755
            _this.chipX=- 40;
            //$LASTPOS=47004779;//kernel.MapEditor:4779
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=47004819;//kernel.MapEditor:4819
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47004857;//kernel.MapEditor:4857
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=47004924;//kernel.MapEditor:4924
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=47004954;//kernel.MapEditor:4954
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47005090;//kernel.MapEditor:5090
          if (_this.loadedFile) {
            //$LASTPOS=47005119;//kernel.MapEditor:5119
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=47005207;//kernel.MapEditor:5207
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=47005301;//kernel.MapEditor:5301
          if (_this.saveFileName) {
            //$LASTPOS=47005332;//kernel.MapEditor:5332
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=47005394;//kernel.MapEditor:5394
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=47005556;//kernel.MapEditor:5556
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=47005593;//kernel.MapEditor:5593
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=47005646;//kernel.MapEditor:5646
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=47005767;//kernel.MapEditor:5767
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47005801;//kernel.MapEditor:5801
          _this.mode="copy";
          //$LASTPOS=47005855;//kernel.MapEditor:5855
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=47005885;//kernel.MapEditor:5885
        if (_this.mode!="get") {
          //$LASTPOS=47005911;//kernel.MapEditor:5911
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006017;//kernel.MapEditor:6017
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=47006035;//kernel.MapEditor:6035
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006166;//kernel.MapEditor:6166
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=47006184;//kernel.MapEditor:6184
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=47006297;//kernel.MapEditor:6297
            _this.my=_this.my-8;
          }
          //$LASTPOS=47006315;//kernel.MapEditor:6315
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=47006450;//kernel.MapEditor:6450
            _this.my=_this.my+8;
          }
          //$LASTPOS=47006468;//kernel.MapEditor:6468
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=47006511;//kernel.MapEditor:6511
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006617;//kernel.MapEditor:6617
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=47006641;//kernel.MapEditor:6641
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006772;//kernel.MapEditor:6772
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=47006796;//kernel.MapEditor:6796
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=47006909;//kernel.MapEditor:6909
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=47006933;//kernel.MapEditor:6933
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=47007068;//kernel.MapEditor:7068
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=47007092;//kernel.MapEditor:7092
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=47007165;//kernel.MapEditor:7165
        if (_this.getkey("i")==1) {
          //$LASTPOS=47007194;//kernel.MapEditor:7194
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=47007226;//kernel.MapEditor:7226
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=47007254;//kernel.MapEditor:7254
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=47007288;//kernel.MapEditor:7288
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=47007317;//kernel.MapEditor:7317
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=47007344;//kernel.MapEditor:7344
          _this.panel.die();
          //$LASTPOS=47007366;//kernel.MapEditor:7366
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=47007466;//kernel.MapEditor:7466
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=47007501;//kernel.MapEditor:7501
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=47007537;//kernel.MapEditor:7537
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=47007574;//kernel.MapEditor:7574
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=47007632;//kernel.MapEditor:7632
        if (_this.getkey("o")==1) {
          //$LASTPOS=47007661;//kernel.MapEditor:7661
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=47007682;//kernel.MapEditor:7682
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=47007710;//kernel.MapEditor:7710
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=47007732;//kernel.MapEditor:7732
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=47007761;//kernel.MapEditor:7761
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=47007788;//kernel.MapEditor:7788
          _this.panel.die();
          //$LASTPOS=47007810;//kernel.MapEditor:7810
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=47007910;//kernel.MapEditor:7910
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=47007945;//kernel.MapEditor:7945
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=47007981;//kernel.MapEditor:7981
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=47008018;//kernel.MapEditor:8018
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=47008110;//kernel.MapEditor:8110
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=47008141;//kernel.MapEditor:8141
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=47008173;//kernel.MapEditor:8173
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=47008226;//kernel.MapEditor:8226
          if (_this.selectedLayer=="base") {
            //$LASTPOS=47008266;//kernel.MapEditor:8266
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=47008322;//kernel.MapEditor:8322
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=47008375;//kernel.MapEditor:8375
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=47008433;//kernel.MapEditor:8433
            if (_this.selectedLayer=="on") {
              //$LASTPOS=47008471;//kernel.MapEditor:8471
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=47008542;//kernel.MapEditor:8542
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=47008595;//kernel.MapEditor:8595
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          
        } else {
          //$LASTPOS=47008661;//kernel.MapEditor:8661
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=47008716;//kernel.MapEditor:8716
            if (_this.selectedLayer=="base") {
              //$LASTPOS=47008756;//kernel.MapEditor:8756
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=47008812;//kernel.MapEditor:8812
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=47008863;//kernel.MapEditor:8863
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=47008921;//kernel.MapEditor:8921
              if (_this.selectedLayer=="on") {
                //$LASTPOS=47008959;//kernel.MapEditor:8959
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=47009028;//kernel.MapEditor:9028
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=47009079;//kernel.MapEditor:9079
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            
          } else {
            //$LASTPOS=47009141;//kernel.MapEditor:9141
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=47009194;//kernel.MapEditor:9194
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=47009274;//kernel.MapEditor:9274
              _this.mode="set";
              //$LASTPOS=47009295;//kernel.MapEditor:9295
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47009361;//kernel.MapEditor:9361
              _this.drawLetter(_this.mode);
              //$LASTPOS=47009388;//kernel.MapEditor:9388
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=47009413;//kernel.MapEditor:9413
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=47009468;//kernel.MapEditor:9468
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=47009521;//kernel.MapEditor:9521
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=47009575;//kernel.MapEditor:9575
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=47009615;//kernel.MapEditor:9615
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=47009668;//kernel.MapEditor:9668
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=47009694;//kernel.MapEditor:9694
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=47009732;//kernel.MapEditor:9732
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=47009803;//kernel.MapEditor:9803
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=47009856;//kernel.MapEditor:9856
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=47009981;//kernel.MapEditor:9981
                  _this.mode="set";
                  //$LASTPOS=47010034;//kernel.MapEditor:10034
                  _this.drawLetter(_this.mode);
                  //$LASTPOS=47010061;//kernel.MapEditor:10061
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=47010087;//kernel.MapEditor:10087
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=47000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=47000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=47000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000158;//kernel.MapEditor:158
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=47000186;//kernel.MapEditor:186
            if (_this.fileList.exists()) {
              //$LASTPOS=47000214;//kernel.MapEditor:214
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=47000257;//kernel.MapEditor:257
                f=f+"";
                //$LASTPOS=47000274;//kernel.MapEditor:274
                _this.fNames=f.split("/");
                //$LASTPOS=47000304;//kernel.MapEditor:304
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=47000345;//kernel.MapEditor:345
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=47000388;//kernel.MapEditor:388
            if (!(_this.fileExist)) { __pc=12; break; }
            //$LASTPOS=47000408;//kernel.MapEditor:408
            _this.print("Load Data?: Y or N");
            //$LASTPOS=47000442;//kernel.MapEditor:442
          case 2:
            //$LASTPOS=47000464;//kernel.MapEditor:464
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=47000496;//kernel.MapEditor:496
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=47000551;//kernel.MapEditor:551
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=47000583;//kernel.MapEditor:583
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=47000639;//kernel.MapEditor:639
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=47000661;//kernel.MapEditor:661
            if (!(_this.loadMode)) { __pc=11; break; }
            //$LASTPOS=47000684;//kernel.MapEditor:684
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=47000749;//kernel.MapEditor:749
            if (_this.fileName) {
              //$LASTPOS=47000776;//kernel.MapEditor:776
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=47000840;//kernel.MapEditor:840
            if (!(_this.mapDataFile.obj())) { __pc=8; break; }
            {
              //$LASTPOS=47000876;//kernel.MapEditor:876
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47000917;//kernel.MapEditor:917
              _this.loadedFile=_this.fileName;
            }
            __pc=10;break;
          case 8:
            //$LASTPOS=47000967;//kernel.MapEditor:967
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=47001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=47001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
          case 10:
            
            //$LASTPOS=47001149;//kernel.MapEditor:1149
            if (_this.baseData==undefined) {
              //$LASTPOS=47001187;//kernel.MapEditor:1187
              _this.print("Load failed");
              //$LASTPOS=47001222;//kernel.MapEditor:1222
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=47001253;//kernel.MapEditor:1253
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=47001298;//kernel.MapEditor:1298
                _this.mapData=_this.baseData[0];
                //$LASTPOS=47001332;//kernel.MapEditor:1332
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=47001368;//kernel.MapEditor:1368
                if (_this.baseData.length>2) {
                  //$LASTPOS=47001408;//kernel.MapEditor:1408
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=47001464;//kernel.MapEditor:1464
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11:
            
          case 12:
            
            //$LASTPOS=47001541;//kernel.MapEditor:1541
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=47001855;//kernel.MapEditor:1855
            if (!(! _this.loadMode)) { __pc=18; break; }
            //$LASTPOS=47001875;//kernel.MapEditor:1875
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=47001905;//kernel.MapEditor:1905
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=47001935;//kernel.MapEditor:1935
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=47001977;//kernel.MapEditor:1977
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=47002021;//kernel.MapEditor:2021
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=47002086;//kernel.MapEditor:2086
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=47002117;//kernel.MapEditor:2117
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=47002149;//kernel.MapEditor:2149
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=47002182;//kernel.MapEditor:2182
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=47002233;//kernel.MapEditor:2233
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19;break;
          case 18:
            {
              //$LASTPOS=47002544;//kernel.MapEditor:2544
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=47002591;//kernel.MapEditor:2591
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=47002617;//kernel.MapEditor:2617
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47002713;//kernel.MapEditor:2713
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47002744;//kernel.MapEditor:2744
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47002776;//kernel.MapEditor:2776
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47002809;//kernel.MapEditor:2809
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19:
            
            //$LASTPOS=47002876;//kernel.MapEditor:2876
            _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=47002919;//kernel.MapEditor:2919
            _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=47002963;//kernel.MapEditor:2963
            _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=47003002;//kernel.MapEditor:3002
            _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=47003042;//kernel.MapEditor:3042
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=47003124;//kernel.MapEditor:3124
            _this.counter=0;
            //$LASTPOS=47003136;//kernel.MapEditor:3136
            //$LASTPOS=47003140;//kernel.MapEditor:3140
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=47003169;//kernel.MapEditor:3169
                //$LASTPOS=47003173;//kernel.MapEditor:3173
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=47003206;//kernel.MapEditor:3206
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=47003250;//kernel.MapEditor:3250
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=47003274;//kernel.MapEditor:3274
            Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=47003354;//kernel.MapEditor:3354
            _this.mode="get";
            //$LASTPOS=47003367;//kernel.MapEditor:3367
            _this.prevMode="set";
            //$LASTPOS=47003384;//kernel.MapEditor:3384
            _this.mapp=0;
            //$LASTPOS=47003393;//kernel.MapEditor:3393
            _this.maponp=- 1;
            //$LASTPOS=47003405;//kernel.MapEditor:3405
            _this.mx=- 40;
            //$LASTPOS=47003414;//kernel.MapEditor:3414
            _this.my=- 40;
            //$LASTPOS=47003423;//kernel.MapEditor:3423
            _this.chipX=- 40;
            //$LASTPOS=47003435;//kernel.MapEditor:3435
            _this.chipY=- 40;
            //$LASTPOS=47003447;//kernel.MapEditor:3447
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=47003476;//kernel.MapEditor:3476
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=47003507;//kernel.MapEditor:3507
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=47003532;//kernel.MapEditor:3532
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=47003562;//kernel.MapEditor:3562
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=47003594;//kernel.MapEditor:3594
            _this.layers=["base","on","all"];
            //$LASTPOS=47003623;//kernel.MapEditor:3623
            _this.lc=0;
            //$LASTPOS=47003630;//kernel.MapEditor:3630
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=47003657;//kernel.MapEditor:3657
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=47003671;//kernel.MapEditor:3671
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=21;return;
          case 21:
            
            //$LASTPOS=47003692;//kernel.MapEditor:3692
          case 22:
            //$LASTPOS=47003710;//kernel.MapEditor:3710
            _this.p=_this.mapp;
            //$LASTPOS=47003723;//kernel.MapEditor:3723
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=24; break; }
            //$LASTPOS=47003842;//kernel.MapEditor:3842
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47003876;//kernel.MapEditor:3876
            _this.mode="erase";
            //$LASTPOS=47003931;//kernel.MapEditor:3931
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=23;return;
          case 23:
            
          case 24:
            
            //$LASTPOS=47003961;//kernel.MapEditor:3961
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=26; break; }
            //$LASTPOS=47004080;//kernel.MapEditor:4080
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47004114;//kernel.MapEditor:4114
            _this.mode="set";
            //$LASTPOS=47004135;//kernel.MapEditor:4135
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=25;return;
          case 25:
            
          case 26:
            
            //$LASTPOS=47004165;//kernel.MapEditor:4165
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=29; break; }
            //$LASTPOS=47004286;//kernel.MapEditor:4286
            _this.lc++;
            //$LASTPOS=47004301;//kernel.MapEditor:4301
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=47004338;//kernel.MapEditor:4338
            _this.fiber$drawPanel(_thread);
            __pc=27;return;
          case 27:
            
            //$LASTPOS=47004392;//kernel.MapEditor:4392
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=28;return;
          case 28:
            
          case 29:
            
            //$LASTPOS=47004515;//kernel.MapEditor:4515
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=31; break; }
            //$LASTPOS=47004636;//kernel.MapEditor:4636
            if (_this.mode!="get") {
              //$LASTPOS=47004666;//kernel.MapEditor:4666
              _this.prevMode=_this.mode;
              //$LASTPOS=47004694;//kernel.MapEditor:4694
              Tonyu.globals.$mp.scrollTo(- 40,- 40);
              //$LASTPOS=47004730;//kernel.MapEditor:4730
              _this.mode="get";
              //$LASTPOS=47004755;//kernel.MapEditor:4755
              _this.chipX=- 40;
              //$LASTPOS=47004779;//kernel.MapEditor:4779
              _this.chipY=- 40;
              
            } else {
              //$LASTPOS=47004819;//kernel.MapEditor:4819
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47004857;//kernel.MapEditor:4857
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=47004924;//kernel.MapEditor:4924
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=30;return;
          case 30:
            
          case 31:
            
            //$LASTPOS=47004954;//kernel.MapEditor:4954
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=36; break; }
            //$LASTPOS=47005090;//kernel.MapEditor:5090
            if (!(_this.loadedFile)) { __pc=33; break; }
            //$LASTPOS=47005119;//kernel.MapEditor:5119
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=32;return;
          case 32:
            _this.saveFileName=_thread.retVal;
            
            __pc=35;break;
          case 33:
            //$LASTPOS=47005207;//kernel.MapEditor:5207
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=34;return;
          case 34:
            _this.saveFileName=_thread.retVal;
            
          case 35:
            
            //$LASTPOS=47005301;//kernel.MapEditor:5301
            if (_this.saveFileName) {
              //$LASTPOS=47005332;//kernel.MapEditor:5332
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=47005394;//kernel.MapEditor:5394
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=47005556;//kernel.MapEditor:5556
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=47005593;//kernel.MapEditor:5593
              _this.print(_this.saveFileName+" Saved");
              
            }
          case 36:
            
            //$LASTPOS=47005646;//kernel.MapEditor:5646
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=38; break; }
            //$LASTPOS=47005767;//kernel.MapEditor:5767
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47005801;//kernel.MapEditor:5801
            _this.mode="copy";
            //$LASTPOS=47005855;//kernel.MapEditor:5855
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=37;return;
          case 37:
            
          case 38:
            
            //$LASTPOS=47005885;//kernel.MapEditor:5885
            if (_this.mode!="get") {
              //$LASTPOS=47005911;//kernel.MapEditor:5911
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006017;//kernel.MapEditor:6017
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=47006035;//kernel.MapEditor:6035
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006166;//kernel.MapEditor:6166
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=47006184;//kernel.MapEditor:6184
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=47006297;//kernel.MapEditor:6297
                _this.my=_this.my-8;
              }
              //$LASTPOS=47006315;//kernel.MapEditor:6315
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=47006450;//kernel.MapEditor:6450
                _this.my=_this.my+8;
              }
              //$LASTPOS=47006468;//kernel.MapEditor:6468
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=47006511;//kernel.MapEditor:6511
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006617;//kernel.MapEditor:6617
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=47006641;//kernel.MapEditor:6641
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006772;//kernel.MapEditor:6772
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=47006796;//kernel.MapEditor:6796
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=47006909;//kernel.MapEditor:6909
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=47006933;//kernel.MapEditor:6933
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=47007068;//kernel.MapEditor:7068
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=47007092;//kernel.MapEditor:7092
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=47007165;//kernel.MapEditor:7165
            if (_this.getkey("i")==1) {
              //$LASTPOS=47007194;//kernel.MapEditor:7194
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=47007226;//kernel.MapEditor:7226
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=47007254;//kernel.MapEditor:7254
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=47007288;//kernel.MapEditor:7288
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=47007317;//kernel.MapEditor:7317
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=47007344;//kernel.MapEditor:7344
              _this.panel.die();
              //$LASTPOS=47007366;//kernel.MapEditor:7366
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47007466;//kernel.MapEditor:7466
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47007501;//kernel.MapEditor:7501
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47007537;//kernel.MapEditor:7537
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47007574;//kernel.MapEditor:7574
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=47007632;//kernel.MapEditor:7632
            if (_this.getkey("o")==1) {
              //$LASTPOS=47007661;//kernel.MapEditor:7661
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=47007682;//kernel.MapEditor:7682
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=47007710;//kernel.MapEditor:7710
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=47007732;//kernel.MapEditor:7732
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=47007761;//kernel.MapEditor:7761
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=47007788;//kernel.MapEditor:7788
              _this.panel.die();
              //$LASTPOS=47007810;//kernel.MapEditor:7810
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47007910;//kernel.MapEditor:7910
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47007945;//kernel.MapEditor:7945
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47007981;//kernel.MapEditor:7981
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47008018;//kernel.MapEditor:8018
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=47008110;//kernel.MapEditor:8110
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=47008141;//kernel.MapEditor:8141
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=47008173;//kernel.MapEditor:8173
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=39; break; }
            {
              //$LASTPOS=47008226;//kernel.MapEditor:8226
              if (_this.selectedLayer=="base") {
                //$LASTPOS=47008266;//kernel.MapEditor:8266
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=47008322;//kernel.MapEditor:8322
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=47008375;//kernel.MapEditor:8375
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=47008433;//kernel.MapEditor:8433
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=47008471;//kernel.MapEditor:8471
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=47008542;//kernel.MapEditor:8542
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=47008595;//kernel.MapEditor:8595
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
            }
            __pc=51;break;
          case 39:
            //$LASTPOS=47008661;//kernel.MapEditor:8661
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=40; break; }
            {
              //$LASTPOS=47008716;//kernel.MapEditor:8716
              if (_this.selectedLayer=="base") {
                //$LASTPOS=47008756;//kernel.MapEditor:8756
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=47008812;//kernel.MapEditor:8812
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=47008863;//kernel.MapEditor:8863
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=47008921;//kernel.MapEditor:8921
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=47008959;//kernel.MapEditor:8959
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=47009028;//kernel.MapEditor:9028
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=47009079;//kernel.MapEditor:9079
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
            }
            __pc=50;break;
          case 40:
            //$LASTPOS=47009141;//kernel.MapEditor:9141
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=43; break; }
            //$LASTPOS=47009194;//kernel.MapEditor:9194
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=47009274;//kernel.MapEditor:9274
            _this.mode="set";
            //$LASTPOS=47009295;//kernel.MapEditor:9295
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47009361;//kernel.MapEditor:9361
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=41;return;
          case 41:
            
            //$LASTPOS=47009388;//kernel.MapEditor:9388
            _this.fiber$updateEx(_thread, 10);
            __pc=42;return;
          case 42:
            
            __pc=49;break;
          case 43:
            //$LASTPOS=47009413;//kernel.MapEditor:9413
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=44; break; }
            {
              //$LASTPOS=47009468;//kernel.MapEditor:9468
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=48;break;
          case 44:
            //$LASTPOS=47009521;//kernel.MapEditor:9521
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=47; break; }
            //$LASTPOS=47009575;//kernel.MapEditor:9575
            if (_this.selectedLayer=="base") {
              //$LASTPOS=47009615;//kernel.MapEditor:9615
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=47009668;//kernel.MapEditor:9668
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=47009694;//kernel.MapEditor:9694
              if (_this.selectedLayer=="on") {
                //$LASTPOS=47009732;//kernel.MapEditor:9732
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=47009803;//kernel.MapEditor:9803
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=47009856;//kernel.MapEditor:9856
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=47009981;//kernel.MapEditor:9981
            _this.mode="set";
            //$LASTPOS=47010034;//kernel.MapEditor:10034
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=45;return;
          case 45:
            
            //$LASTPOS=47010061;//kernel.MapEditor:10061
            _this.fiber$updateEx(_thread, 10);
            __pc=46;return;
          case 46:
            
          case 47:
            
          case 48:
            
          case 49:
            
          case 50:
            
          case 51:
            
            //$LASTPOS=47010087;//kernel.MapEditor:10087
            _this.fiber$update(_thread);
            __pc=52;return;
          case 52:
            
            __pc=22;break;
          case 53:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    inRect :function _trc_MapEditor_inRect() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;
    },
    fiber$inRect :function _trc_MapEditor_f_inRect(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;
      
      
      _thread.retVal=_this;return;
    },
    drawPanel :function _trc_MapEditor_drawPanel() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47010259;//kernel.MapEditor:10259
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=47010293;//kernel.MapEditor:10293
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=47010316;//kernel.MapEditor:10316
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47010359;//kernel.MapEditor:10359
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47010407;//kernel.MapEditor:10407
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47010469;//kernel.MapEditor:10469
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47010528;//kernel.MapEditor:10528
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=47010551;//kernel.MapEditor:10551
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47010605;//kernel.MapEditor:10605
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010655;//kernel.MapEditor:10655
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47010860;//kernel.MapEditor:10860
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47010911;//kernel.MapEditor:10911
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=47010946;//kernel.MapEditor:10946
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010997;//kernel.MapEditor:10997
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47011203;//kernel.MapEditor:11203
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47011254;//kernel.MapEditor:11254
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47011300;//kernel.MapEditor:11300
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=47011357;//kernel.MapEditor:11357
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47011421;//kernel.MapEditor:11421
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=47011496;//kernel.MapEditor:11496
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47011601;//kernel.MapEditor:11601
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011678;//kernel.MapEditor:11678
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47011763;//kernel.MapEditor:11763
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011840;//kernel.MapEditor:11840
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011916;//kernel.MapEditor:11916
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47011994;//kernel.MapEditor:11994
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47010259;//kernel.MapEditor:10259
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=47010293;//kernel.MapEditor:10293
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=47010316;//kernel.MapEditor:10316
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47010359;//kernel.MapEditor:10359
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47010407;//kernel.MapEditor:10407
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47010469;//kernel.MapEditor:10469
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47010528;//kernel.MapEditor:10528
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=47010551;//kernel.MapEditor:10551
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47010605;//kernel.MapEditor:10605
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010655;//kernel.MapEditor:10655
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47010860;//kernel.MapEditor:10860
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47010911;//kernel.MapEditor:10911
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=47010946;//kernel.MapEditor:10946
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010997;//kernel.MapEditor:10997
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47011203;//kernel.MapEditor:11203
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47011254;//kernel.MapEditor:11254
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47011300;//kernel.MapEditor:11300
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=47011357;//kernel.MapEditor:11357
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47011421;//kernel.MapEditor:11421
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=47011496;//kernel.MapEditor:11496
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47011601;//kernel.MapEditor:11601
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011678;//kernel.MapEditor:11678
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47011763;//kernel.MapEditor:11763
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011840;//kernel.MapEditor:11840
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47011916;//kernel.MapEditor:11916
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47011994;//kernel.MapEditor:11994
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    drawLetter :function _trc_MapEditor_drawLetter(mode) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47012102;//kernel.MapEditor:12102
      if (mode=="set") {
        //$LASTPOS=47012118;//kernel.MapEditor:12118
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012156;//kernel.MapEditor:12156
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012191;//kernel.MapEditor:12191
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47012268;//kernel.MapEditor:12268
      if (mode=="get") {
        //$LASTPOS=47012284;//kernel.MapEditor:12284
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012322;//kernel.MapEditor:12322
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012357;//kernel.MapEditor:12357
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47012434;//kernel.MapEditor:12434
      if (mode=="erase") {
        //$LASTPOS=47012452;//kernel.MapEditor:12452
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012490;//kernel.MapEditor:12490
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012525;//kernel.MapEditor:12525
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47012603;//kernel.MapEditor:12603
      if (mode=="copy") {
        //$LASTPOS=47012620;//kernel.MapEditor:12620
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012658;//kernel.MapEditor:12658
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012693;//kernel.MapEditor:12693
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47012805;//kernel.MapEditor:12805
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47012890;//kernel.MapEditor:12890
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
    },
    fiber$drawLetter :function _trc_MapEditor_f_drawLetter(_thread,mode) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47012102;//kernel.MapEditor:12102
      if (mode=="set") {
        //$LASTPOS=47012118;//kernel.MapEditor:12118
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012156;//kernel.MapEditor:12156
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012191;//kernel.MapEditor:12191
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47012268;//kernel.MapEditor:12268
      if (mode=="get") {
        //$LASTPOS=47012284;//kernel.MapEditor:12284
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012322;//kernel.MapEditor:12322
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012357;//kernel.MapEditor:12357
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47012434;//kernel.MapEditor:12434
      if (mode=="erase") {
        //$LASTPOS=47012452;//kernel.MapEditor:12452
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012490;//kernel.MapEditor:12490
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012525;//kernel.MapEditor:12525
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47012603;//kernel.MapEditor:12603
      if (mode=="copy") {
        //$LASTPOS=47012620;//kernel.MapEditor:12620
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=47012658;//kernel.MapEditor:12658
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=47012693;//kernel.MapEditor:12693
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47012805;//kernel.MapEditor:12805
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47012890;//kernel.MapEditor:12890
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false},"drawLetter":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditorOLD',
  shortName: 'MapEditorOLD',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditorOLD_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=48000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=48000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=48000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=48000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=48000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=48000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=48000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=48000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=48000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=48000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=48000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=48000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=48000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=48000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=48000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=48000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=48000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=48000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=48000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=48000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=48000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=48000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=48000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=48001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=48001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=48001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=48001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=48001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=48001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=48001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=48001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=48001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=48001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=48001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=48001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=48001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=48001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=48001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=48001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=48001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=48001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=48001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=48001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=48001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=48001977;//kernel.MapEditorOLD:1977
      _this.i = 0;
      for (; _this.i<16 ; _this.i++) {
        {
          //$LASTPOS=48002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=48002005;//kernel.MapEditorOLD:2005
          _this.j = 0;
          for (; _this.j<8 ; _this.j++) {
            {
              //$LASTPOS=48002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=48002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=48002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=48002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=48002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=48002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=48002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=48002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=48002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=48002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=48002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=48002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=48002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=48002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=48002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=48002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=48002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=48002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=48002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=48002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=48002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=48002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=48002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=48002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=48002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=48002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=48002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=48002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=48002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=48002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=48002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=48003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=48003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=48003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=48003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=48003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=48003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=48003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=48003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=48003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=48003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=48003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=48003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=48004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=48004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=48004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=48004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=48004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=48004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=48004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=48004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=48004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=48004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=48004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=48004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=48004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=48004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=48004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=48004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=48004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=48004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=48004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=48004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=48004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=48004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=48004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=48004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=48004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=48004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=48004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=48004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=48004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=48004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=48005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=48005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=48005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=48005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=48000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=48000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2; break; }
            //$LASTPOS=48000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5; break;
            
          case 2:
            
            //$LASTPOS=48000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3; break; }
            //$LASTPOS=48000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=48000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=48000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9; break; }
            //$LASTPOS=48000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=48000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=48000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=48000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6; break; }
            {
              //$LASTPOS=48000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8;break;
          case 6:
            //$LASTPOS=48000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=48000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=48000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8:
            
            //$LASTPOS=48000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=48000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=48000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=48000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=48000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=48000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9:
            
            //$LASTPOS=48000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=48001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12; break; }
            //$LASTPOS=48001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=48001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=48001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=48001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=48001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=48001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=48001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=48001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=48001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13;break;
          case 12:
            {
              //$LASTPOS=48001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=48001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=48001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=48001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=48001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=48001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=48001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=48001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13:
            
            //$LASTPOS=48001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=48001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=48001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=48001977;//kernel.MapEditorOLD:1977
            _this.i = 0;
            for (; _this.i<16 ; _this.i++) {
              {
                //$LASTPOS=48002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=48002005;//kernel.MapEditorOLD:2005
                _this.j = 0;
                for (; _this.j<8 ; _this.j++) {
                  {
                    //$LASTPOS=48002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=48002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=48002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=48002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=48002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=48002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=48002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=48002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=48002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=48002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=48002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=48002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=48002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=48002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=48002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=48002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=48002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=48002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=48002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=48002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=48002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=48002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=48002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=48002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=48002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=48002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=48002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=48002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=48002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=48002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=48002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=48003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=48003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=48003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=48003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=48003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=48003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=48003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=48003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=48003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=48003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=48003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=48003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=48004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=48004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=48004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=48004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=48004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=48004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=48004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=48004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=48004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=48004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=48004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=48004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=48004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=48004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=48004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=48004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=48004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
            {
              //$LASTPOS=48004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=48004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=48004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
            {
              //$LASTPOS=48004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=48004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
            //$LASTPOS=48004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=48004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=48004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=48004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=48004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=48004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
            {
              //$LASTPOS=48004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=48004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
            //$LASTPOS=48004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=48005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=48005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=48005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=48005123;//kernel.MapEditorOLD:5123
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditorOLD2',
  shortName: 'MapEditorOLD2',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditorOLD2_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=49000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=49000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=49000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=49000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=49000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=49000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=49000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=49000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=49000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=49000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=49000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=49000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=49000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=49000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=49000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=49000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=49000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=49000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=49000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=49000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=49000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=49000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=49000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=49000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=49000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=49000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=49000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=49000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=49001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=49001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=49001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=49001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=49001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=49001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=49001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=49001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=49001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=49001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=49001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=49001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=49001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=49001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=49001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=49001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=49001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=49001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=49002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=49002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=49002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=49002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=49002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=49002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=49002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=49002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=49002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=49002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=49002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=49002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=49002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=49002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=49002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=49002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=49003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=49003055;//kernel.MapEditorOLD2:3055
      //$LASTPOS=49003059;//kernel.MapEditorOLD2:3059
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=49003088;//kernel.MapEditorOLD2:3088
          //$LASTPOS=49003092;//kernel.MapEditorOLD2:3092
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=49003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=49003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=49003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=49003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=49003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=49003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=49003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=49003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=49003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=49003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=49003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=49003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=49003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=49003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=49003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=49003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=49003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=49003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=49003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=49003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=49003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=49003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=49003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=49004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=49004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=49004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=49004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=49004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=49004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=49004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=49004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=49004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=49004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=49004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=49004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=49004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=49004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=49005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=49005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=49005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=49005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=49005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=49005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=49005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=49006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=49006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=49006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=49006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=49006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=49006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=49006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=49006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=49006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=49006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=49006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=49006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=49006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=49006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=49007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=49007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=49007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=49007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=49007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=49007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=49007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=49007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=49007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=49007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=49007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=49007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=49007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=49007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=49007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=49007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=49007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=49007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=49007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=49007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=49007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=49007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=49008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=49008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=49008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=49008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=49008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=49008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=49008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=49008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=49008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=49008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=49008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=49008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=49008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=49008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=49008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=49008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=49008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=49008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=49008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=49008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=49009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=49009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=49009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=49009117;//kernel.MapEditorOLD2:9117
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=49000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=49000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=49000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=49000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=49000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=49000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=49000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=49000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=49000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=49000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11; break; }
            //$LASTPOS=49000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=49000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=49000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=49000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=49000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=49000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=49000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=49000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10; break; }
            //$LASTPOS=49000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=49000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=49000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=49000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7; break; }
            {
              //$LASTPOS=49000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=49000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9;break;
          case 7:
            //$LASTPOS=49000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=49000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=49000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=49001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9:
            
            //$LASTPOS=49001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=49001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=49001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=49001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=49001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=49001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=49001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=49001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=49001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10:
            
          case 11:
            
            //$LASTPOS=49001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=49001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=49001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=49001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=49001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=49001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=49001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=49001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=49002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=49002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=49002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=49002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=49002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=49002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=49002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=49002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=49002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=49002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=49002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=49002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=49002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=49002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=49002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=49002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=49003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=49003055;//kernel.MapEditorOLD2:3055
            //$LASTPOS=49003059;//kernel.MapEditorOLD2:3059
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=49003088;//kernel.MapEditorOLD2:3088
                //$LASTPOS=49003092;//kernel.MapEditorOLD2:3092
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=49003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=49003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=49003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=49003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=49003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=49003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=49003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=49003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=49003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=49003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=49003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=49003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=49003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=49003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=49003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=49003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=49003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=49003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=49003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=49003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=49003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=49003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=49003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=49004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=49004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=49004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=49004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=49004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=49004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=49004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=49004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=49004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=49004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=49004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=49004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=49004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=49004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=49005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=49005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=49005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=49005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=49005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=49005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=49005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=49006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=49006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=49006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=49006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=49006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=49006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=49006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=49006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=49006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=49006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=49006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=49006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=49006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=49006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=49007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=49007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=49007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=49007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=49007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=49007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=49007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=49007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=49007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=49007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=49007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=49007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=49007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=49007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=49007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=49007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=49007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=49007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=49007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=49007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=49007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=49007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=49008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=49008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=49008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=49008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=49008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=49008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=49008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }
            {
              //$LASTPOS=49008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=49008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=49008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }
            {
              //$LASTPOS=49008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=49008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }
            //$LASTPOS=49008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=49008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=49008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=49008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=49008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=49008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }
            {
              //$LASTPOS=49008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=49008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }
            //$LASTPOS=49008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=49009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=49009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=49009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=49009117;//kernel.MapEditorOLD2:9117
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    inRect :function _trc_MapEditorOLD2_inRect() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;
    },
    fiber$inRect :function _trc_MapEditorOLD2_f_inRect(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;
      
      
      _thread.retVal=_this;return;
    },
    drawPanel :function _trc_MapEditorOLD2_drawPanel() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=49009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=49009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=49009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=49009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=49009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=49009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=49009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=49009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=49009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=49009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=49009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=49010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=49010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=49010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=49010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=49010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=49010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=49010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=49010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=49011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=49009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=49009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=49009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=49009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=49009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=49009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=49009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=49009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=49009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=49009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=49009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=49009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=49010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=49010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=49010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=49010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=49010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=49010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=49010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=49010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=49010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=49010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=49011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Pad',
  shortName: 'Pad',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Pad_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=50003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=50003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=50003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=50001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=50003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=50003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=50003502;//kernel.Pad:3502
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Pad_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=50000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=50000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=50000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=50000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=50000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=50000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=50000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=50000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=50000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=50001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=50001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=50001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=50001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=50001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=50001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=50001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=50001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=50001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=50001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=50001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=50001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=50001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=50001383;//kernel.Pad:1383
      //$LASTPOS=50001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=50001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=50001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=50001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=50001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=50001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=50001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=50001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=50001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=50001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=50001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=50001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=50002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=50002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=50002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=50002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=50002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=50002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=50002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=50002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=50002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=50002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=50002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=50002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=50002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=50002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=50002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=50002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=50002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=50002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=50002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=50002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=50002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=50002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=50002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=50002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=50002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=50002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=50002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=50002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=50002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=50002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=50002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=50002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=50002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
    },
    fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      
      //$LASTPOS=50001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=50001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=50001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=50001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=50001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=50001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=50001383;//kernel.Pad:1383
      //$LASTPOS=50001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=50001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=50001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=50001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=50001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=50001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=50001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=50001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=50001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=50001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=50001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=50001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=50002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=50002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=50002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=50002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=50002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=50002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=50002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=50002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=50002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=50002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=50002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=50002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=50002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=50002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=50002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=50002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=50002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=50002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=50002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=50002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=50002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=50002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=50002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=50002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=50002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=50002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=50002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=50002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=50002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=50002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=50002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=50002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=50002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
      
      _thread.retVal=_this;return;
    },
    getPadUp :function _trc_Pad_getPadUp() {
      "use strict";
      var _this=this;
      
      return _this.keyCntU;
    },
    fiber$getPadUp :function _trc_Pad_f_getPadUp(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadDown :function _trc_Pad_getPadDown() {
      "use strict";
      var _this=this;
      
      return _this.keyCntD;
    },
    fiber$getPadDown :function _trc_Pad_f_getPadDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadLeft :function _trc_Pad_getPadLeft() {
      "use strict";
      var _this=this;
      
      return _this.keyCntL;
    },
    fiber$getPadLeft :function _trc_Pad_f_getPadLeft(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadRight :function _trc_Pad_getPadRight() {
      "use strict";
      var _this=this;
      
      return _this.keyCntR;
    },
    fiber$getPadRight :function _trc_Pad_f_getPadRight(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadButton :function _trc_Pad_getPadButton(i) {
      "use strict";
      var _this=this;
      var value;
      
      
      //$LASTPOS=50002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=50002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      
      //$LASTPOS=50002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=50002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    getUp :function _trc_Pad_getUp() {
      "use strict";
      var _this=this;
      
      return _this.keyCntU;
    },
    fiber$getUp :function _trc_Pad_f_getUp(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getDown :function _trc_Pad_getDown() {
      "use strict";
      var _this=this;
      
      return _this.keyCntD;
    },
    fiber$getDown :function _trc_Pad_f_getDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getLeft :function _trc_Pad_getLeft() {
      "use strict";
      var _this=this;
      
      return _this.keyCntL;
    },
    fiber$getLeft :function _trc_Pad_f_getLeft(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getRight :function _trc_Pad_getRight() {
      "use strict";
      var _this=this;
      
      return _this.keyCntR;
    },
    fiber$getRight :function _trc_Pad_f_getRight(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getButton :function _trc_Pad_getButton(i) {
      "use strict";
      var _this=this;
      var value;
      
      
      //$LASTPOS=50003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=50003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      
      //$LASTPOS=50003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=50003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRect :function _trc_Pad_isOnRect(mx,my,rx,ry,rx2,ry2) {
      "use strict";
      var _this=this;
      
      return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
    },
    fiber$isOnRect :function _trc_Pad_f_isOnRect(_thread,mx,my,rx,ry,rx2,ry2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRectWH :function _trc_Pad_isOnRectWH(mx,my,rx,ry,rw,rh) {
      "use strict";
      var _this=this;
      
      return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
    },
    fiber$isOnRectWH :function _trc_Pad_f_isOnRectWH(_thread,mx,my,rx,ry,rw,rh) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.UILayout',
  shortName: 'UILayout',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_UILayout_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=51000016;//kernel.UILayout:16
      _this.doLayout();
      //$LASTPOS=51000028;//kernel.UILayout:28
      Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
      //$LASTPOS=51000059;//kernel.UILayout:59
      Tonyu.globals.$uiScreen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
    },
    fiber$main :function _trc_UILayout_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_UILayout_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000016;//kernel.UILayout:16
            _this.fiber$doLayout(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51000028;//kernel.UILayout:28
            Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            //$LASTPOS=51000059;//kernel.UILayout:59
            Tonyu.globals.$uiScreen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            _thread.exit(_this);return;
          }
        }
      });
    },
    doLayout :function _trc_UILayout_doLayout() {
      "use strict";
      var _this=this;
      var cw;
      var ch;
      var width;
      var height;
      var calcw;
      var calch;
      var scl;
      
      //$LASTPOS=51000110;//kernel.UILayout:110
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=51000138;//kernel.UILayout:138
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=51000167;//kernel.UILayout:167
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=51000196;//kernel.UILayout:196
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=51000232;//kernel.UILayout:232
      calcw = ch/height*width;
      
      //$LASTPOS=51000283;//kernel.UILayout:283
      calch = cw/width*height;
      
      //$LASTPOS=51000334;//kernel.UILayout:334
      if (calch>ch) {
        //$LASTPOS=51000348;//kernel.UILayout:348
        calch=ch;
      }
      //$LASTPOS=51000362;//kernel.UILayout:362
      if (calcw>cw) {
        //$LASTPOS=51000376;//kernel.UILayout:376
        calcw=cw;
      }
      //$LASTPOS=51000390;//kernel.UILayout:390
      scl = 1;
      
      //$LASTPOS=51000405;//kernel.UILayout:405
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=51000460;//kernel.UILayout:460
        calcw=width;
        //$LASTPOS=51000472;//kernel.UILayout:472
        calch=height;
        //$LASTPOS=51000494;//kernel.UILayout:494
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=51000533;//kernel.UILayout:533
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=51000575;//kernel.UILayout:575
      Tonyu.globals.$Screen.x=cw/2;
      //$LASTPOS=51000595;//kernel.UILayout:595
      Tonyu.globals.$Screen.y=ch/2;
    },
    fiber$doLayout :function _trc_UILayout_f_doLayout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cw;
      var ch;
      var width;
      var height;
      var calcw;
      var calch;
      var scl;
      
      //$LASTPOS=51000110;//kernel.UILayout:110
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=51000138;//kernel.UILayout:138
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=51000167;//kernel.UILayout:167
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=51000196;//kernel.UILayout:196
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=51000232;//kernel.UILayout:232
      calcw = ch/height*width;
      
      //$LASTPOS=51000283;//kernel.UILayout:283
      calch = cw/width*height;
      
      //$LASTPOS=51000334;//kernel.UILayout:334
      if (calch>ch) {
        //$LASTPOS=51000348;//kernel.UILayout:348
        calch=ch;
      }
      //$LASTPOS=51000362;//kernel.UILayout:362
      if (calcw>cw) {
        //$LASTPOS=51000376;//kernel.UILayout:376
        calcw=cw;
      }
      //$LASTPOS=51000390;//kernel.UILayout:390
      scl = 1;
      
      //$LASTPOS=51000405;//kernel.UILayout:405
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=51000460;//kernel.UILayout:460
        calcw=width;
        //$LASTPOS=51000472;//kernel.UILayout:472
        calch=height;
        //$LASTPOS=51000494;//kernel.UILayout:494
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=51000533;//kernel.UILayout:533
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=51000575;//kernel.UILayout:575
      Tonyu.globals.$Screen.x=cw/2;
      //$LASTPOS=51000595;//kernel.UILayout:595
      Tonyu.globals.$Screen.y=ch/2;
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_UILayout_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=51000696;//kernel.UILayout:696
      larger = 200;
      
      //$LASTPOS=51000716;//kernel.UILayout:716
      smaller = 5;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_UILayout_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=51000696;//kernel.UILayout:696
      larger = 200;
      
      //$LASTPOS=51000716;//kernel.UILayout:716
      smaller = 5;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"doLayout":{"nowait":false},"shouldDraw1x1":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Boot',
  shortName: 'Boot',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2MediaPlayer],
  methods: {
    main :function _trc_Boot_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000219;//kernel.Boot:219
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=52000232;//kernel.Boot:232
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=52000269;//kernel.Boot:269
      _this.initEvents();
      //$LASTPOS=52000284;//kernel.Boot:284
      _this.initLayers();
      //$LASTPOS=52000299;//kernel.Boot:299
      _this.initPeripherals();
      //$LASTPOS=52000319;//kernel.Boot:319
      _this.loadPlugins();
      //$LASTPOS=52000335;//kernel.Boot:335
      _this.loadImages();
      //$LASTPOS=52000350;//kernel.Boot:350
      _this.loadSounds();
      //$LASTPOS=52000365;//kernel.Boot:365
      _this.createMainObject();
      //$LASTPOS=52000386;//kernel.Boot:386
      _this.progress();
      //$LASTPOS=52000399;//kernel.Boot:399
      _this.mainLoop();
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52000219;//kernel.Boot:219
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=52000232;//kernel.Boot:232
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52000269;//kernel.Boot:269
            _this.fiber$initEvents(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52000284;//kernel.Boot:284
            _this.fiber$initLayers(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=52000299;//kernel.Boot:299
            _this.fiber$initPeripherals(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=52000319;//kernel.Boot:319
            _this.fiber$loadPlugins(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=52000335;//kernel.Boot:335
            _this.fiber$loadImages(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=52000350;//kernel.Boot:350
            _this.fiber$loadSounds(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=52000365;//kernel.Boot:365
            _this.fiber$createMainObject(_thread);
            __pc=7;return;
          case 7:
            
            //$LASTPOS=52000386;//kernel.Boot:386
            _this.fiber$progress(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=52000399;//kernel.Boot:399
            _this.fiber$mainLoop(_thread);
            __pc=9;return;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Boot_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000433;//kernel.Boot:433
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000469;//kernel.Boot:469
      _this.waitFor(Tonyu.timeout(50));
    },
    fiber$update :function _trc_Boot_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52000469;//kernel.Boot:469
            _this.fiber$waitFor(_thread, Tonyu.timeout(50));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initEvents :function _trc_Boot_initEvents() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000574;//kernel.Boot:574
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
    },
    fiber$initEvents :function _trc_Boot_f_initEvents(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52000574;//kernel.Boot:574
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
      
      _thread.retVal=_this;return;
    },
    initPeripherals :function _trc_Boot_initPeripherals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000731;//kernel.Boot:731
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=52000766;//kernel.Boot:766
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=52000807;//kernel.Boot:807
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=52000840;//kernel.Boot:840
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=52000861;//kernel.Boot:861
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=52000882;//kernel.Boot:882
      Tonyu.globals.$Math=Math;
      //$LASTPOS=52000899;//kernel.Boot:899
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=52001013;//kernel.Boot:1013
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=52001041;//kernel.Boot:1041
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=52001185;//kernel.Boot:1185
      _this.initFPSParams();
      //$LASTPOS=52001207;//kernel.Boot:1207
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=52001232;//kernel.Boot:1232
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
    },
    fiber$initPeripherals :function _trc_Boot_f_initPeripherals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52000731;//kernel.Boot:731
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=52000766;//kernel.Boot:766
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=52000807;//kernel.Boot:807
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=52000840;//kernel.Boot:840
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=52000861;//kernel.Boot:861
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=52000882;//kernel.Boot:882
      Tonyu.globals.$Math=Math;
      //$LASTPOS=52000899;//kernel.Boot:899
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=52001013;//kernel.Boot:1013
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=52001041;//kernel.Boot:1041
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=52001185;//kernel.Boot:1185
      _this.initFPSParams();
      //$LASTPOS=52001207;//kernel.Boot:1207
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=52001232;//kernel.Boot:1232
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      
      _thread.retVal=_this;return;
    },
    initLayers :function _trc_Boot_initLayers() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52001277;//kernel.Boot:1277
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001317;//kernel.Boot:1317
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001363;//kernel.Boot:1363
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001394;//kernel.Boot:1394
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001423;//kernel.Boot:1423
      _this.cvj=$("canvas");
      //$LASTPOS=52001445;//kernel.Boot:1445
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=52001468;//kernel.Boot:1468
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=52001492;//kernel.Boot:1492
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=52001575;//kernel.Boot:1575
      Tonyu.globals.$Screen.on("resize",(function anonymous_1596() {
        
        //$LASTPOS=52001608;//kernel.Boot:1608
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=52001645;//kernel.Boot:1645
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=52001684;//kernel.Boot:1684
        if (Tonyu.globals.$panel) {
          //$LASTPOS=52001709;//kernel.Boot:1709
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=52001767;//kernel.Boot:1767
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=52001805;//kernel.Boot:1805
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=52001851;//kernel.Boot:1851
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=52001883;//kernel.Boot:1883
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=52001948;//kernel.Boot:1948
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=52001993;//kernel.Boot:1993
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=52002039;//kernel.Boot:2039
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=52002096;//kernel.Boot:2096
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=52002132;//kernel.Boot:2132
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=52002167;//kernel.Boot:2167
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=52002202;//kernel.Boot:2202
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=52002245;//kernel.Boot:2245
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=52002283;//kernel.Boot:2283
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52002314;//kernel.Boot:2314
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=52002385;//kernel.Boot:2385
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=52002420;//kernel.Boot:2420
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=52002455;//kernel.Boot:2455
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
    },
    fiber$initLayers :function _trc_Boot_f_initLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52001277;//kernel.Boot:1277
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001317;//kernel.Boot:1317
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001363;//kernel.Boot:1363
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001394;//kernel.Boot:1394
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52001423;//kernel.Boot:1423
      _this.cvj=$("canvas");
      //$LASTPOS=52001445;//kernel.Boot:1445
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=52001468;//kernel.Boot:1468
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=52001492;//kernel.Boot:1492
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=52001575;//kernel.Boot:1575
      Tonyu.globals.$Screen.on("resize",(function anonymous_1596() {
        
        //$LASTPOS=52001608;//kernel.Boot:1608
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=52001645;//kernel.Boot:1645
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=52001684;//kernel.Boot:1684
        if (Tonyu.globals.$panel) {
          //$LASTPOS=52001709;//kernel.Boot:1709
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=52001767;//kernel.Boot:1767
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=52001805;//kernel.Boot:1805
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=52001851;//kernel.Boot:1851
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=52001883;//kernel.Boot:1883
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=52001948;//kernel.Boot:1948
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=52001993;//kernel.Boot:1993
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=52002039;//kernel.Boot:2039
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=52002096;//kernel.Boot:2096
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=52002132;//kernel.Boot:2132
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=52002167;//kernel.Boot:2167
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=52002202;//kernel.Boot:2202
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=52002245;//kernel.Boot:2245
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=52002283;//kernel.Boot:2283
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=52002314;//kernel.Boot:2314
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=52002385;//kernel.Boot:2385
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=52002420;//kernel.Boot:2420
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=52002455;//kernel.Boot:2455
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
      
      _thread.retVal=_this;return;
    },
    loadPlugins :function _trc_Boot_loadPlugins() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52002831;//kernel.Boot:2831
      _this.progress("Loading plugins..");
      //$LASTPOS=52002867;//kernel.Boot:2867
      _this.runAsync((function anonymous_2876(r) {
        
        //$LASTPOS=52002892;//kernel.Boot:2892
        Tonyu.globals.$currentProject.loadPlugins(r);
      }));
      //$LASTPOS=52002937;//kernel.Boot:2937
      _this.progress("Loading plugins done");
    },
    fiber$loadPlugins :function _trc_Boot_f_loadPlugins(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_loadPlugins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52002831;//kernel.Boot:2831
            _this.fiber$progress(_thread, "Loading plugins..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52002867;//kernel.Boot:2867
            _this.fiber$runAsync(_thread, (function anonymous_2876(r) {
              
              //$LASTPOS=52002892;//kernel.Boot:2892
              Tonyu.globals.$currentProject.loadPlugins(r);
            }));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=52002937;//kernel.Boot:2937
            _this.fiber$progress(_thread, "Loading plugins done");
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadImages :function _trc_Boot_loadImages() {
      "use strict";
      var _this=this;
      var rs;
      var r;
      var name;
      var val;
      var _it_392;
      
      //$LASTPOS=52002996;//kernel.Boot:2996
      _this.progress("Loading pats..");
      //$LASTPOS=52003029;//kernel.Boot:3029
      rs = Tonyu.globals.$currentProject.getResource();
      
      
      //$LASTPOS=52003084;//kernel.Boot:3084
      r=_this.runAsync((function anonymous_3095(succ) {
        
        //$LASTPOS=52003114;//kernel.Boot:3114
        ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir()});
      }));
      //$LASTPOS=52003239;//kernel.Boot:3239
      Tonyu.globals.$imageList=r[0];
      //$LASTPOS=52003297;//kernel.Boot:3297
      _it_392=Tonyu.iterator(r[0].names,2);
      while(_it_392.next()) {
        name=_it_392[0];
        val=_it_392[1];
        
        //$LASTPOS=52003341;//kernel.Boot:3341
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=52003381;//kernel.Boot:3381
      _this.progress("Loading pats done.");
    },
    fiber$loadImages :function _trc_Boot_f_loadImages(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rs;
      var r;
      var name;
      var val;
      var _it_392;
      
      
      _thread.enter(function _trc_Boot_ent_loadImages(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52002996;//kernel.Boot:2996
            _this.fiber$progress(_thread, "Loading pats..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52003029;//kernel.Boot:3029
            rs = Tonyu.globals.$currentProject.getResource();
            
            
            //$LASTPOS=52003084;//kernel.Boot:3084
            _this.fiber$runAsync(_thread, (function anonymous_3095(succ) {
              
              //$LASTPOS=52003114;//kernel.Boot:3114
              ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir()});
            }));
            __pc=2;return;
          case 2:
            r=_thread.retVal;
            
            //$LASTPOS=52003239;//kernel.Boot:3239
            Tonyu.globals.$imageList=r[0];
            //$LASTPOS=52003297;//kernel.Boot:3297
            _it_392=Tonyu.iterator(r[0].names,2);
            while(_it_392.next()) {
              name=_it_392[0];
              val=_it_392[1];
              
              //$LASTPOS=52003341;//kernel.Boot:3341
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=52003381;//kernel.Boot:3381
            _this.fiber$progress(_thread, "Loading pats done.");
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadSounds :function _trc_Boot_loadSounds() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52003438;//kernel.Boot:3438
      _this.progress("Loading sounds...");
      //$LASTPOS=52003474;//kernel.Boot:3474
      _this.initT2MediaPlayer();
      //$LASTPOS=52003500;//kernel.Boot:3500
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=52003539;//kernel.Boot:3539
      _this.progress("Loading sounds done.");
      //$LASTPOS=52003578;//kernel.Boot:3578
      _this.on("stop",(function anonymous_3588() {
        
        //$LASTPOS=52003600;//kernel.Boot:3600
        _this.clearSEData();
      }));
      //$LASTPOS=52003628;//kernel.Boot:3628
      Tonyu.globals.$sound=_this;
    },
    fiber$loadSounds :function _trc_Boot_f_loadSounds(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_loadSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52003438;//kernel.Boot:3438
            _this.fiber$progress(_thread, "Loading sounds...");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52003474;//kernel.Boot:3474
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=52003500;//kernel.Boot:3500
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=52003539;//kernel.Boot:3539
            _this.fiber$progress(_thread, "Loading sounds done.");
            __pc=4;return;
          case 4:
            
            //$LASTPOS=52003578;//kernel.Boot:3578
            _this.on("stop",(function anonymous_3588() {
              
              //$LASTPOS=52003600;//kernel.Boot:3600
              _this.clearSEData();
            }));
            //$LASTPOS=52003628;//kernel.Boot:3628
            Tonyu.globals.$sound=_this;
            _thread.exit(_this);return;
          }
        }
      });
    },
    createMainObject :function _trc_Boot_createMainObject() {
      "use strict";
      var _this=this;
      var o;
      var mainClassName;
      
      //$LASTPOS=52003674;//kernel.Boot:3674
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=52003720;//kernel.Boot:3720
      mainClassName = o.run.mainClass;
      
      //$LASTPOS=52003760;//kernel.Boot:3760
      _this.progress("MainClass= "+mainClassName);
      //$LASTPOS=52003804;//kernel.Boot:3804
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=52003850;//kernel.Boot:3850
      if (! _this.mainClass) {
        throw new Error(mainClassName+" というクラスはありません");
        
        
      }
      //$LASTPOS=52003938;//kernel.Boot:3938
      Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
      //$LASTPOS=52003974;//kernel.Boot:3974
      new _this.mainClass();
    },
    fiber$createMainObject :function _trc_Boot_f_createMainObject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=52003674;//kernel.Boot:3674
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=52003720;//kernel.Boot:3720
      mainClassName = o.run.mainClass;
      
      
      _thread.enter(function _trc_Boot_ent_createMainObject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52003760;//kernel.Boot:3760
            _this.fiber$progress(_thread, "MainClass= "+mainClassName);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52003804;//kernel.Boot:3804
            _this.mainClass=Tonyu.getClass(mainClassName);
            //$LASTPOS=52003850;//kernel.Boot:3850
            if (! _this.mainClass) {
              throw new Error(mainClassName+" というクラスはありません");
              
              
            }
            //$LASTPOS=52003938;//kernel.Boot:3938
            Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
            //$LASTPOS=52003974;//kernel.Boot:3974
            new _this.mainClass();
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadPage :function _trc_Boot_loadPage(page,arg) {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=52004022;//kernel.Boot:4022
      a = Tonyu.globals.$Screen.all();
      
      //$LASTPOS=52004048;//kernel.Boot:4048
      a=a.find((function anonymous_4057(e) {
        
        return ! Tonyu.globals.$excludeFromAll.contains(e);
      }));
      //$LASTPOS=52004109;//kernel.Boot:4109
      a.die();
      //$LASTPOS=52004123;//kernel.Boot:4123
      new page(arg);
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52004157;//kernel.Boot:4157
      _this.fireEvent("stop");
      //$LASTPOS=52004181;//kernel.Boot:4181
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52004157;//kernel.Boot:4157
      _this.fireEvent("stop");
      //$LASTPOS=52004181;//kernel.Boot:4181
      _this.die();
      
      _thread.retVal=_this;return;
    },
    hide :function _trc_Boot_hide() {
      "use strict";
      var _this=this;
      
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      "use strict";
      var _this=this;
      var th;
      
      //$LASTPOS=52004240;//kernel.Boot:4240
      method=method||"main";
      //$LASTPOS=52004268;//kernel.Boot:4268
      args=args||[];
      //$LASTPOS=52004288;//kernel.Boot:4288
      th = _this.scheduler.newThread(obj,method,args);
      
      //$LASTPOS=52004340;//kernel.Boot:4340
      obj.setThreadGroup(_this);
      //$LASTPOS=52004371;//kernel.Boot:4371
      th.setThreadGroup(obj);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=52004240;//kernel.Boot:4240
      method=method||"main";
      //$LASTPOS=52004268;//kernel.Boot:4268
      args=args||[];
      //$LASTPOS=52004288;//kernel.Boot:4288
      th = _this.scheduler.newThread(obj,method,args);
      
      //$LASTPOS=52004340;//kernel.Boot:4340
      obj.setThreadGroup(_this);
      //$LASTPOS=52004371;//kernel.Boot:4371
      th.setThreadGroup(obj);
      _thread.retVal=th;return;
      
      
      _thread.retVal=_this;return;
    },
    progress :function _trc_Boot_progress(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52004435;//kernel.Boot:4435
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=52004486;//kernel.Boot:4486
      if (m) {
        //$LASTPOS=52004504;//kernel.Boot:4504
        console.log.apply(console,arguments);
        //$LASTPOS=52004551;//kernel.Boot:4551
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=52004589;//kernel.Boot:4589
        SplashScreen.hide();
      }
    },
    fiber$progress :function _trc_Boot_f_progress(_thread,m) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52004435;//kernel.Boot:4435
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=52004486;//kernel.Boot:4486
      if (m) {
        //$LASTPOS=52004504;//kernel.Boot:4504
        console.log.apply(console,_arguments);
        //$LASTPOS=52004551;//kernel.Boot:4551
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=52004589;//kernel.Boot:4589
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    mainLoop :function _trc_Boot_mainLoop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52004635;//kernel.Boot:4635
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=52004655;//kernel.Boot:4655
      while (true) {
        //$LASTPOS=52004676;//kernel.Boot:4676
        if (_this._useRAF) {
          //$LASTPOS=52004689;//kernel.Boot:4689
          _this.loopRAF();
        } else {
          //$LASTPOS=52004711;//kernel.Boot:4711
          _this.loopTimer();
        }
        //$LASTPOS=52004733;//kernel.Boot:4733
        _this.measureFps();
        //$LASTPOS=52004753;//kernel.Boot:4753
        _this.handlePause();
        //$LASTPOS=52004777;//kernel.Boot:4777
        Tonyu.globals.$frameCount++;
        
      }
    },
    fiber$mainLoop :function _trc_Boot_f_mainLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52004635;//kernel.Boot:4635
      Tonyu.globals.$frameCount=0;
      
      _thread.enter(function _trc_Boot_ent_mainLoop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52004655;//kernel.Boot:4655
          case 1:
            //$LASTPOS=52004676;//kernel.Boot:4676
            if (!(_this._useRAF)) { __pc=3; break; }
            //$LASTPOS=52004689;//kernel.Boot:4689
            _this.fiber$loopRAF(_thread);
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            //$LASTPOS=52004711;//kernel.Boot:4711
            _this.fiber$loopTimer(_thread);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=52004733;//kernel.Boot:4733
            _this.measureFps();
            //$LASTPOS=52004753;//kernel.Boot:4753
            _this.fiber$handlePause(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=52004777;//kernel.Boot:4777
            Tonyu.globals.$frameCount++;
            __pc=1;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopRAF :function _trc_Boot_loopRAF() {
      "use strict";
      var _this=this;
      var start;
      var elapsed;
      var time;
      var moves;
      var cnt;
      var rafResMS;
      var elapsedRAF;
      
      //$LASTPOS=52004818;//kernel.Boot:4818
      start = _this.now();
      
      //$LASTPOS=52004845;//kernel.Boot:4845
      time = 1000/_this._fps;
      
      //$LASTPOS=52004884;//kernel.Boot:4884
      moves = 0;
      
      //$LASTPOS=52004899;//kernel.Boot:4899
      while (moves<_this.frameSkip) {
        //$LASTPOS=52004927;//kernel.Boot:4927
        _this.moveFrame();
        //$LASTPOS=52004943;//kernel.Boot:4943
        moves++;
        //$LASTPOS=52004955;//kernel.Boot:4955
        if (moves<_this.frameSkip) {
          //$LASTPOS=52004976;//kernel.Boot:4976
          _this.afterDraw(false);
        }
        
      }
      //$LASTPOS=52005000;//kernel.Boot:5000
      _this.drawFrame();
      //$LASTPOS=52005015;//kernel.Boot:5015
      _this.afterDraw(true);
      //$LASTPOS=52005034;//kernel.Boot:5034
      _this.waitRAF();
      //$LASTPOS=52005053;//kernel.Boot:5053
      elapsed=_this.now()-start;
      //$LASTPOS=52005081;//kernel.Boot:5081
      cnt = _this.rafCount-1;
      
      //$LASTPOS=52005106;//kernel.Boot:5106
      if (_this.rafResolution) {
        //$LASTPOS=52005177;//kernel.Boot:5177
        rafResMS = time/_this.rafResolution;
        
        //$LASTPOS=52005255;//kernel.Boot:5255
        elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
        
        //$LASTPOS=52005315;//kernel.Boot:5315
        if (elapsedRAF>1) {
          //$LASTPOS=52005333;//kernel.Boot:5333
          cnt-=(elapsedRAF-1);
        }
        
      }
      //$LASTPOS=52005391;//kernel.Boot:5391
      _this.rafCntDebug=cnt;
      //$LASTPOS=52005410;//kernel.Boot:5410
      while (cnt>0) {
        //$LASTPOS=52005428;//kernel.Boot:5428
        _this.waitRAF();
        //$LASTPOS=52005442;//kernel.Boot:5442
        cnt--;
        
      }
    },
    fiber$loopRAF :function _trc_Boot_f_loopRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var start;
      var elapsed;
      var time;
      var moves;
      var cnt;
      var rafResMS;
      var elapsedRAF;
      
      //$LASTPOS=52004818;//kernel.Boot:4818
      start = _this.now();
      
      //$LASTPOS=52004845;//kernel.Boot:4845
      time = 1000/_this._fps;
      
      //$LASTPOS=52004884;//kernel.Boot:4884
      moves = 0;
      
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52004899;//kernel.Boot:4899
          case 1:
            if (!(moves<_this.frameSkip)) { __pc=2; break; }
            {
              //$LASTPOS=52004927;//kernel.Boot:4927
              _this.moveFrame();
              //$LASTPOS=52004943;//kernel.Boot:4943
              moves++;
              //$LASTPOS=52004955;//kernel.Boot:4955
              if (moves<_this.frameSkip) {
                //$LASTPOS=52004976;//kernel.Boot:4976
                _this.afterDraw(false);
              }
            }
            __pc=1;break;
          case 2:
            
            //$LASTPOS=52005000;//kernel.Boot:5000
            _this.drawFrame();
            //$LASTPOS=52005015;//kernel.Boot:5015
            _this.afterDraw(true);
            //$LASTPOS=52005034;//kernel.Boot:5034
            _this.fiber$waitRAF(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=52005053;//kernel.Boot:5053
            elapsed=_this.now()-start;
            //$LASTPOS=52005081;//kernel.Boot:5081
            cnt = _this.rafCount-1;
            
            //$LASTPOS=52005106;//kernel.Boot:5106
            if (_this.rafResolution) {
              //$LASTPOS=52005177;//kernel.Boot:5177
              rafResMS = time/_this.rafResolution;
              
              //$LASTPOS=52005255;//kernel.Boot:5255
              elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
              
              //$LASTPOS=52005315;//kernel.Boot:5315
              if (elapsedRAF>1) {
                //$LASTPOS=52005333;//kernel.Boot:5333
                cnt-=(elapsedRAF-1);
              }
              
            }
            //$LASTPOS=52005391;//kernel.Boot:5391
            _this.rafCntDebug=cnt;
            //$LASTPOS=52005410;//kernel.Boot:5410
          case 4:
            if (!(cnt>0)) { __pc=6; break; }
            //$LASTPOS=52005428;//kernel.Boot:5428
            _this.fiber$waitRAF(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=52005442;//kernel.Boot:5442
            cnt--;
            __pc=4;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    waitRAF :function _trc_Boot_waitRAF() {
      "use strict";
      var _this=this;
      var rafStart;
      
      //$LASTPOS=52005478;//kernel.Boot:5478
      _this.waitFor(Tonyu.animationFrame());
      //$LASTPOS=52005516;//kernel.Boot:5516
      rafStart = _this.now();
      
      //$LASTPOS=52005541;//kernel.Boot:5541
      if (_this.pRafStart) {
        //$LASTPOS=52005556;//kernel.Boot:5556
        _this.detectRAFResolution(rafStart-_this.pRafStart);
      }
      //$LASTPOS=52005602;//kernel.Boot:5602
      _this.pRafStart=rafStart;
    },
    fiber$waitRAF :function _trc_Boot_f_waitRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rafStart;
      
      
      _thread.enter(function _trc_Boot_ent_waitRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52005478;//kernel.Boot:5478
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52005516;//kernel.Boot:5516
            rafStart = _this.now();
            
            //$LASTPOS=52005541;//kernel.Boot:5541
            if (_this.pRafStart) {
              //$LASTPOS=52005556;//kernel.Boot:5556
              _this.detectRAFResolution(rafStart-_this.pRafStart);
            }
            //$LASTPOS=52005602;//kernel.Boot:5602
            _this.pRafStart=rafStart;
            _thread.exit(_this);return;
          }
        }
      });
    },
    detectRAFResolution :function _trc_Boot_detectRAFResolution(t) {
      "use strict";
      var _this=this;
      var time;
      var reso;
      
      //$LASTPOS=52005661;//kernel.Boot:5661
      if (_this.rafResolution) {
        return _this;
      }
      //$LASTPOS=52005744;//kernel.Boot:5744
      time = 1000/_this._fps;
      
      //$LASTPOS=52005766;//kernel.Boot:5766
      reso = time/t;
      
      //$LASTPOS=52005852;//kernel.Boot:5852
      if (reso>1) {
        //$LASTPOS=52005864;//kernel.Boot:5864
        reso=_this.floor(reso+0.5);
      } else {
        //$LASTPOS=52005905;//kernel.Boot:5905
        reso=1/_this.floor(1/reso+0.5);
      }
      //$LASTPOS=52005984;//kernel.Boot:5984
      _this.rafRess=_this.rafRess||{};
      //$LASTPOS=52006007;//kernel.Boot:6007
      if ((_this.rafRess[reso+""]=(_this.rafRess[reso+""]||0)+1)>10) {
        //$LASTPOS=52006069;//kernel.Boot:6069
        _this.rafResolution=reso;
        //$LASTPOS=52006092;//kernel.Boot:6092
        if (reso<1) {
          //$LASTPOS=52006110;//kernel.Boot:6110
          _this.frameSkip=_this.floor(1/reso+0.5);
          //$LASTPOS=52006143;//kernel.Boot:6143
          _this.rafCount=1;
          
        } else {
          //$LASTPOS=52006171;//kernel.Boot:6171
          _this.rafCount=reso;
          //$LASTPOS=52006190;//kernel.Boot:6190
          _this.frameSkip=1;
          
        }
        
      }
    },
    measureRAFInterval :function _trc_Boot_measureRAFInterval() {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      //$LASTPOS=52006244;//kernel.Boot:6244
      if (Tonyu.globals.$RAFInterval) {
        return _this;
      }
      //$LASTPOS=52006272;//kernel.Boot:6272
      s = _this.now();
      
      //$LASTPOS=52006287;//kernel.Boot:6287
      //$LASTPOS=52006292;//kernel.Boot:6292
      i = 0;
      for (; i<20 ; i++) {
        {
          //$LASTPOS=52006318;//kernel.Boot:6318
          _this.waitFor(Tonyu.animationFrame());
        }
      }
      //$LASTPOS=52006357;//kernel.Boot:6357
      Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
    },
    fiber$measureRAFInterval :function _trc_Boot_f_measureRAFInterval(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var i;
      
      //$LASTPOS=52006244;//kernel.Boot:6244
      if (Tonyu.globals.$RAFInterval) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=52006272;//kernel.Boot:6272
      s = _this.now();
      
      
      _thread.enter(function _trc_Boot_ent_measureRAFInterval(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52006287;//kernel.Boot:6287
            //$LASTPOS=52006292;//kernel.Boot:6292
            i = 0;
            
          case 1:
            if (!(i<20)) { __pc=4; break; }
            //$LASTPOS=52006318;//kernel.Boot:6318
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=2;return;
          case 2:
            
          case 3:
            i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=52006357;//kernel.Boot:6357
            Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopTimer :function _trc_Boot_loopTimer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52006408;//kernel.Boot:6408
      _this.moveFrame();
      //$LASTPOS=52006426;//kernel.Boot:6426
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=52006454;//kernel.Boot:6454
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=52006508;//kernel.Boot:6508
        _this.doDraw=true;
        //$LASTPOS=52006530;//kernel.Boot:6530
        _this.resetDeadLine();
        
      }
      //$LASTPOS=52006559;//kernel.Boot:6559
      if (_this.doDraw) {
        //$LASTPOS=52006596;//kernel.Boot:6596
        _this.drawFrame();
        //$LASTPOS=52006618;//kernel.Boot:6618
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=52006657;//kernel.Boot:6657
        _this.frameSkipped++;
        
      }
      //$LASTPOS=52006685;//kernel.Boot:6685
      _this.afterDraw(_this.doDraw);
      //$LASTPOS=52006709;//kernel.Boot:6709
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52006408;//kernel.Boot:6408
      _this.moveFrame();
      //$LASTPOS=52006426;//kernel.Boot:6426
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=52006454;//kernel.Boot:6454
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=52006508;//kernel.Boot:6508
        _this.doDraw=true;
        //$LASTPOS=52006530;//kernel.Boot:6530
        _this.resetDeadLine();
        
      }
      //$LASTPOS=52006559;//kernel.Boot:6559
      if (_this.doDraw) {
        //$LASTPOS=52006596;//kernel.Boot:6596
        _this.drawFrame();
        //$LASTPOS=52006618;//kernel.Boot:6618
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=52006657;//kernel.Boot:6657
        _this.frameSkipped++;
        
      }
      //$LASTPOS=52006685;//kernel.Boot:6685
      _this.afterDraw(_this.doDraw);
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52006709;//kernel.Boot:6709
            _this.fiber$waitFrame(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    handlePause :function _trc_Boot_handlePause() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52006757;//kernel.Boot:6757
      while (_this.paused) {
        //$LASTPOS=52006782;//kernel.Boot:6782
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=52006818;//kernel.Boot:6818
        if (! _this.paused) {
          //$LASTPOS=52006831;//kernel.Boot:6831
          _this.resetDeadLine();
        }
        
      }
    },
    fiber$handlePause :function _trc_Boot_f_handlePause(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_handlePause(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52006757;//kernel.Boot:6757
          case 1:
            if (!(_this.paused)) { __pc=3; break; }
            //$LASTPOS=52006782;//kernel.Boot:6782
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=52006818;//kernel.Boot:6818
            if (! _this.paused) {
              //$LASTPOS=52006831;//kernel.Boot:6831
              _this.resetDeadLine();
            }
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    drawFrame :function _trc_Boot_drawFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=52006886;//kernel.Boot:6886
      s = _this.now();
      
      //$LASTPOS=52006905;//kernel.Boot:6905
      Tonyu.globals.$uiScreen.drawLayers();
      //$LASTPOS=52006934;//kernel.Boot:6934
      _this.drawTime=_this.now()-s;
      //$LASTPOS=52006957;//kernel.Boot:6957
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=52007286;//kernel.Boot:7286
      s = _this.now();
      
      //$LASTPOS=52007304;//kernel.Boot:7304
      _this.scheduler.stepsAll();
      //$LASTPOS=52007331;//kernel.Boot:7331
      Tonyu.globals.$Keys.update();
      //$LASTPOS=52007352;//kernel.Boot:7352
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=52007380;//kernel.Boot:7380
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=52007413;//kernel.Boot:7413
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=52007448;//kernel.Boot:7448
      _this.moveTime=_this.now()-s;
      //$LASTPOS=52007471;//kernel.Boot:7471
      _this.fps_rpsCnt++;
    },
    afterDraw :function _trc_Boot_afterDraw(drawn) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52007574;//kernel.Boot:7574
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=52007600;//kernel.Boot:7600
      Tonyu.globals.$Sprites.removeOneframes(drawn);
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52007687;//kernel.Boot:7687
      _this._fps=30;
      //$LASTPOS=52007703;//kernel.Boot:7703
      _this.maxFrameSkip=5;
      //$LASTPOS=52007726;//kernel.Boot:7726
      _this.minFrameSkip=1;
      //$LASTPOS=52007776;//kernel.Boot:7776
      _this.frameCnt=0;
      //$LASTPOS=52007795;//kernel.Boot:7795
      _this.resetDeadLine();
      //$LASTPOS=52007817;//kernel.Boot:7817
      _this.lastMeasured=_this.now();
      //$LASTPOS=52007842;//kernel.Boot:7842
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=52007888;//kernel.Boot:7888
      _this.drawTime=5;
      //$LASTPOS=52007899;//kernel.Boot:7899
      _this.moveTime=5;
      //$LASTPOS=52007913;//kernel.Boot:7913
      _this.rafAccept=1.1;
      //$LASTPOS=52007930;//kernel.Boot:7930
      _this.rafInterval=1000/60;
      //$LASTPOS=52007953;//kernel.Boot:7953
      _this._useRAF=true;
      //$LASTPOS=52007969;//kernel.Boot:7969
      _this.rafCount=2;
      //$LASTPOS=52007983;//kernel.Boot:7983
      _this.frameSkip=1;
    },
    now :function _trc_Boot_now() {
      "use strict";
      var _this=this;
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52008085;//kernel.Boot:8085
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=52008116;//kernel.Boot:8116
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=52008160;//kernel.Boot:8160
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=52008188;//kernel.Boot:8188
      if (wt<1) {
        //$LASTPOS=52008209;//kernel.Boot:8209
        if (wt<- 1000) {
          //$LASTPOS=52008223;//kernel.Boot:8223
          _this.resetDeadLine();
        }
        //$LASTPOS=52008249;//kernel.Boot:8249
        wt=1;
        
      }
      //$LASTPOS=52008267;//kernel.Boot:8267
      wt=_this.floor(wt);
      //$LASTPOS=52008286;//kernel.Boot:8286
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=52008319;//kernel.Boot:8319
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=52008160;//kernel.Boot:8160
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=52008188;//kernel.Boot:8188
      if (wt<1) {
        //$LASTPOS=52008209;//kernel.Boot:8209
        if (wt<- 1000) {
          //$LASTPOS=52008223;//kernel.Boot:8223
          _this.resetDeadLine();
        }
        //$LASTPOS=52008249;//kernel.Boot:8249
        wt=1;
        
      }
      //$LASTPOS=52008267;//kernel.Boot:8267
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52008286;//kernel.Boot:8286
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=52008319;//kernel.Boot:8319
            _this.deadLine+=1000/_this._fps;
            _thread.exit(_this);return;
          }
        }
      });
    },
    getFrameRate :function _trc_Boot_getFrameRate() {
      "use strict";
      var _this=this;
      
      return _this._fps;
    },
    setFrameRate :function _trc_Boot_setFrameRate(fps,maxFrameSkip) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52008476;//kernel.Boot:8476
      if (_this._fps!=fps) {
        //$LASTPOS=52008496;//kernel.Boot:8496
        _this.rafRess={};
        //$LASTPOS=52008511;//kernel.Boot:8511
        _this.rafResolution=null;
        //$LASTPOS=52008534;//kernel.Boot:8534
        _this.frameSkip=1;
        //$LASTPOS=52008550;//kernel.Boot:8550
        _this.rafCnt=_this.floor(60/fps+0.5);
        
      }
      //$LASTPOS=52008585;//kernel.Boot:8585
      _this._fps=fps;
      //$LASTPOS=52008602;//kernel.Boot:8602
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=52008637;//kernel.Boot:8637
        maxFrameSkip=5;
      }
      //$LASTPOS=52008658;//kernel.Boot:8658
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=52008697;//kernel.Boot:8697
      _this.resetDeadLine();
    },
    __getter__useRAF :function _trc_Boot___getter__useRAF() {
      "use strict";
      var _this=this;
      
      return _this._useRAF;
    },
    __setter__useRAF :function _trc_Boot___setter__useRAF(v) {
      "use strict";
      var _this=this;
      
      return _this._useRAF=v;
    },
    getMeasuredFps :function _trc_Boot_getMeasuredFps() {
      "use strict";
      var _this=this;
      
      return _this.fps_fps;
    },
    getMeasuredRps :function _trc_Boot_getMeasuredRps() {
      "use strict";
      var _this=this;
      
      return _this.fps_rps;
    },
    measureFps :function _trc_Boot_measureFps() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52008976;//kernel.Boot:8976
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=52009016;//kernel.Boot:9016
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=52009045;//kernel.Boot:9045
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=52009074;//kernel.Boot:9074
        _this.fps_fpsCnt=0;
        //$LASTPOS=52009097;//kernel.Boot:9097
        _this.fps_rpsCnt=0;
        //$LASTPOS=52009120;//kernel.Boot:9120
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"initEvents":{"nowait":false},"initPeripherals":{"nowait":false},"initLayers":{"nowait":false},"loadPlugins":{"nowait":false},"loadImages":{"nowait":false},"loadSounds":{"nowait":false},"createMainObject":{"nowait":false},"loadPage":{"nowait":true},"stop":{"nowait":false},"hide":{"nowait":true},"schedule":{"nowait":false},"progress":{"nowait":false},"mainLoop":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"detectRAFResolution":{"nowait":true},"measureRAFInterval":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.DxChar',
  shortName: 'DxChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_DxChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_DxChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_DxChar_initialize(xx,yy,pp,ff,sz,rt,al) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=53000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=53000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=53000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=53000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=53000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=53000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=53000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=53000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=53000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000212;//kernel.DxChar:212
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=53000243;//kernel.DxChar:243
      _this.onDraw();
      //$LASTPOS=53000258;//kernel.DxChar:258
      _this.detectShape();
      //$LASTPOS=53000278;//kernel.DxChar:278
      _this.drawDxSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder,_this.angle,_this.alpha,_this.scaleX,_this.scaleY);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
